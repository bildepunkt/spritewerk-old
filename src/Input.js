import keycodes from "./lib/keycodes";
import { tuneIn } from "./util/radio";
import { pointRectCollide } from "./physics/collision";

/**
 * @class       Input
 * @description A module for handling keyboard, mouse, and touch events on the canvas
 * @author      Chris Peters
 * @requires    util/radio
 * @requires    lib/keycodes
 *
 * @param {HTMLEntity} canvas The canvas element to interact with
 * @param {Object}     [opts]
 * @param {Boolean}    [opts.fitToWindow]       Whether or not to calculate offsets for resized canvas
 * @param {Boolean}    [opts.listenForMouse]    Whether or not to listen for mouse events
 * @param {Boolean}    [opts.listenForTouch]    Whether or not to listen for touch events
 * @param {Boolean}    [opts.listenForKeyboard] Whether or not to listen for keyboard events
 * @param {Boolean}    [opts.combineMouseAndTouch] Combines mouse and touch events
 *                                                 eg: `click` triggers `tap` and visa-versa
 * @param {Function}   [opts.hitTest] User defined hitTest method
 * @param {Object}     [opts.window] window object for testing
 * @param {Object}     [opts.document] document object for testing
 */
export default class Input {
    constructor(canvas, opts={}) {
        this._canvas = canvas;
        // options
        this._canvasFit = opts.fitToWindow !== undefined ? opts.fitToWindow : false;
        this._listenForMouse = opts.listenForMouse !== undefined ? opts.listenForMouse : true;
        this._listenForTouch = opts.listenForTouch !== undefined ? opts.listenForTouch : true;
        this._listenForKeyboard = opts.listenForKeyboard !== undefined ? opts.listenForKeyboard : true;
        this._combineMouseAndTouch = opts.combineMouseAndTouch !== undefined ? opts.combineMouseAndTouch : false;
        this._hitTest = opts.hitTest !== undefined ? opts.hitTest : pointRectCollide;
        this._window = opts.window || window;
        this._document = opts.document || document;

        this._uiEvents = {
            DBL_CLICK: "dblclick",
            DBL_TAP: "dbltap",

            DRAG: "drag",
            DRAG_END: "dragend",
            DRAG_START: "dragstart",

            CLICK: "click",
            TAP: "tap",

            MOUSE_DOWN: "mousedown",
            MOUSE_UP: "mouseup",
            TOUCH_START: "touchstart",
            TOUCH_END: "touchend",

            MOUSE_MOVE: "mousemove",
            TOUCH_MOVE: "touchmove",

            KEY_UP: "keyup",
            KEY_DOWN: "keydown"
        };

        // listeners values are arrays of objects containing handlers and (optional) targets
        // eg: this._listeners.keyup = [{
        //         handler: function () {...},
        //         target: { name: "foo", x: 32, y: 64, ...}
        //     }];
        this._listeners = {};

        for (let key in this._uiEvents) {
            this._listeners[this._uiEvents[key]] = [];
        }

        this.keysDown = {};

        this._keycodes = keycodes;
        this._canDrag = false;
        this._isDragging = false;
        this._userHitTestMethod = null;
        this._queuedEvents = [];
        this._draggableHandlers = [];

        if (this._listenForKeyboard) {
            this._addKeyboardListeners();
        }

        if (this._listenForMouse) {
            this._enqueuePointerEvents = this._enqueuePointerEvents.bind(this);
            this._addMouseListeners();
        }

        if (this._listenForTouch) {
            this._addTouchListeners();
        }

        this._onTick = this._onTick.bind(this);
        tuneIn(this._document, "pretick", this._onTick);
    }

    /**
     * Adds keyboard listeners
     *
     * @method Input#_addKeyboardListeners
     * @private
     */
    _addKeyboardListeners() {
        let events = ["keyup", "keydown"];
        this._enqueueKeyboardEvents = this._enqueueKeyboardEvents.bind(this);

        for (let event of events) {
            tuneIn(this._canvas, event, this._enqueueKeyboardEvents);
        }
    }

    /**
     * Adds mouse listeners
     *
     * @method Input#_addMouseListeners
     * @private
     */
    _addMouseListeners() {
        let events = ["click", "dblclick", "mousedown", "mouseup", "mousemove"];

        for (let event of events) {
            tuneIn(this._canvas, event, this._enqueuePointerEvents);
        }
    }

    /**
     * Adds touch listeners
     *
     * @method Input#_addTouchListeners
     * @private
     */
    _addTouchListeners() {
        let events = ["tap", "dbltap", "touchstart", "touchend", "touchmove"];

        for (let event of events) {
            tuneIn(this._canvas, event, this._enqueuePointerEvents);
        }
    }

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     *
     * @method Input#_enqueueKeyboardEvents
     * @param {object} inputEvent the DOM input event object
     * @private
     */
    _enqueueKeyboardEvents(inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let keyName = this._keycodes[inputEvent.keyCode];
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            keyCode: inputEvent.keyCode,
            // only pass the default character not the `Shift` alternate
            keyName: typeof keyName === "object" && keyName.length ?
                keyName[0] :
                keyName
        };

        switch (event.type) {
            case this._uiEvents.KEY_DOWN:
                this.keysDown[keyName] = inputEvent.keyCode;
                break;
            case this._uiEvents.KEY_UP:
                delete this.keysDown[keyName];
                break;
        }

        event.keysDown = this.getKeysDown();

        this._queuedEvents.push(event);
    }

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     * Creates event objects with x/y coordinates
     * Not currently supporting multi-touch
     *
     * @method Input#_enqueueEvents
     * @param {object} inputEvent The DOM input event object
     */
    _enqueuePointerEvents(inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let scaleFactor = this._canvasFit ? this._getScaleFactor() : 1;
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type
        };

        if (inputEvent.touches && inputEvent.touches.length) {
            event.x = inputEvent.touches[0].pageX;
            event.y = inputEvent.touches[0].pageY;
        } else if (inputEvent.changedTouches && inputEvent.changedTouches.length) {
            event.x = inputEvent.changedTouches[0].pageX;
            event.y = inputEvent.changedTouches[0].pageY;
        } else {
            event.x = inputEvent.pageX;
            event.y = inputEvent.pageY;
        }

        // coordinate positions relative to canvas scaling
        event.x = Math.round((event.x - this._canvas.offsetLeft) * scaleFactor);
        event.y = Math.round((event.y - this._canvas.offsetTop) * scaleFactor);

        // push the event regardless of type
        this._queuedEvents.push(event);

        if (this._combineMouseAndTouch) {
            switch (event.type) {
                case this._uiEvents.MOUSE_DOWN:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.TOUCH_START
                    }));
                break;
                case this._uiEvents.MOUSE_UP:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.TOUCH_END
                    }));
                break;
                case this._uiEvents.CLICK:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.TAP
                    }));
                break;
                case this._uiEvents.TOUCH_START:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.MOUSE_DOWN
                    }));
                break;
                case this._uiEvents.TOUCH_END:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.MOUSE_UP
                    }));
                break;
                case this._uiEvents.TAP:
                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.CLICK
                    }));
                break;
            }
        }

        // check for drag simulation
        switch (event.type) {
            case this._uiEvents.MOUSE_DOWN:
            case this._uiEvents.TOUCH_START:
                this._canDrag = true;

                for (let handlerObject of this._listeners.drag) {
                    // if handlerObj has a target make sure it is hit first; if not, add it and trigger regardless
                    if (handlerObject.target) {
                        if (this._hitTest(event.x, event.y, handlerObject.target.getBoundingBox())) {
                            handlerObject.offsetX = event.x - handlerObject.target.x;
                            handlerObject.offsetY = event.y - handlerObject.target.y;
                            
                            this._draggableHandlers.push(handlerObject);
                        }
                    } else {
                        this._draggableHandlers.push(handlerObject);
                    }
                }
                break;
            case this._uiEvents.MOUSE_UP:
            case this._uiEvents.TOUCH_END:
                this._canDrag = false;
                this._draggableHandlers = [];

                if (this._isDragging) {
                    this._isDragging = false;

                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.DRAG_END
                    }));
                }
                break;
            case this._uiEvents.MOUSE_MOVE:
            case this._uiEvents.TOUCH_MOVE:
                if (this._canDrag) {
                    if (!this._isDragging) {
                        this._isDragging = true;

                        this._queuedEvents.push(Object.assign({}, event, {
                            type: this._uiEvents.DRAG_START
                        }));
                    }

                    this._queuedEvents.push(Object.assign({}, event, {
                        type: this._uiEvents.DRAG
                    }));
                }
                break;
        }
    }

    /**
     * get the scale ratio of the canvas based on with/heght attrs and css width/height
     *
     * @method Input#_getScaleFactor
     * @return {Float}
     */
    _getScaleFactor() {
        let factor = 1;
        let canvasWidth = this._canvas.width;
        let cssWidth;

        // check if canvas has been scaled via CSS
        if (this._canvas.style.width) {
            cssWidth = parseInt(this._canvas.style.width, 10);

            factor = cssWidth < canvasWidth
                ? cssWidth / canvasWidth
                : canvasWidth / cssWidth;
        }

        return factor;
    }

    /**
     * Checks for duplicate handler in the listener tyoe being added
     *
     * @method Input#_isDuplicateHandler
     * @param  {Function} handler  The handler to check
     * @param  {Array}    handlers The handlers of the listener type being added
     * @return {Boolean}
     * @private
     */
    _isDuplicateHandler(handler, handlerObjects) {
        let dup = false;

        for (let handlerObject of handlerObjects) {
            if (handler === handlerObject.handler) {
                dup = true;
                break;
            }
        }

        return dup;
    }

    /**
     * Triggers all queued events. Passes the factor and ticks from {@link Ticker}
     *
     * @method Input#_onTick
     * @param  {Object} e The event object
     */
    _onTick(e) {
        for (let event of this._queuedEvents) {
            this._triggerHandlers(event);
        }

        this._queuedEvents = [];
    }

    /**
     * executes handlers of the given event's type
     *
     * @method Input#_triggerHandlers
     * @param {object} event
     * @private
     */
    _triggerHandlers(event) {
        switch (event.type) {
            case this._uiEvents.DRAG:
                for (let handlerObject of this._draggableHandlers) {
                    event.offsetX = handlerObject.offsetX;
                    event.offsetY = handlerObject.offsetY;

                    handlerObject.handler(event);
                }
                break;
            default:
                for (let handlerObject of this._listeners[event.type]) {
                    if (handlerObject.target) {

                        // if event was bound with a target, trigger handler ONLY if target hit
                        if (this._hitTest(event.x, event.y, handlerObject.target.getBoundingBox())) {
                            // add to the event obj
                            event.target = handlerObject.target;

                            if (event.type)

                            handlerObject.handler(event);
                        }
                    } else {
                        handlerObject.handler(event);
                    }
                }
                break;
        }
    }

    /**
     * Adds a handler to a {@link Sprite} for the given event type
     *
     * @method Input#addListener
     * @param  {Sprite|null} target  The target to check event trigger against, assign `null` to listen for all
     * @param  {string}      type    The event type
     * @param  {function}    handler The function to execute when event triggered
     * @param  {Object}      [scope] The optional scope to assign the handler
     * @return {boolean}             Returns true if added and false if callback already exists
     */
    addListener(target, type, handler, scope) {
        let handlerObjects = this._listeners[type],
            dup;

        if (!handlerObjects) {
            throw new TypeError(`Event type "${type}" does not exist.`);
        }

        if (handlerObjects.length) {
            dup = this._isDuplicateHandler(handler, handlerObjects);
        }

        if (!dup) {
            handlerObjects.push({
                handler: scope ? handler.bind(scope) : handler,
                original: handler,
                target
            });
            return true;
        }

        return false;
    }

    /**
     * Removes matching handler if found
     *
     * @method Input#removeListener
     * @param  {string}   type    the event type
     * @param  {function} handler the handler to remove
     * @return {boolean}  removed Returns true if removed and otherwise false
     */
    removeListener(type, handler) {
        let handlers = this._listeners[type];
        let removed = false;

        if (! handlers) {
            throw new TypeError(`Event type "${type}" does not exist.`);
        }

        for (let i = 0, len = handlers.length; i < len; i++) {
            let handlerObject = handlers[i];
            if (handlerObject.original === handler) {
                handlers.splice(i, 1);
                removed = true;
                break;
            }
        }

        return removed;
    }
}
