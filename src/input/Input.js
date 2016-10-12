import { tuneIn } from "../util/radio";
import keycodes from "./keycodes";
import eventConstants from "./eventConstants";
import { addMouseListeners, addTouchListeners, handlePointerEvents } from "./pointerInput";
import { addKeyboardListeners, handleKeyboardEvents } from "./keyboardInput";

const defaults = {
    fitToWindow: true,
    listenForMouse: true,
    listenForTouch: true,
    listenForKeyboard: true,
    combineMouseAndTouch: true
};

/**
 * @class       input/Input
 * @description A module for handling user input events on the canvas
 * @requires    util/radio
 * @requires    input/keycodes
 * @requires    physics/collision
 *
 * @param {HTMLEntity} canvas The canvas element to interact with
 * @param {Object}     [opts]
 * @param {Boolean}    [opts.fitToWindow=true] Whether or not to calculate offsets for resized canvas
 * @param {Boolean}    [opts.listenForMouse=true] Whether or not to listen for mouse events
 * @param {Boolean}    [opts.listenForTouch=true] Whether or not to listen for touch events
 * @param {Boolean}    [opts.listenForKeyboard=true] Whether or not to listen for keyboard events
 */
export default class Input {
    constructor(canvas, opts=defaults) {
        this.canvas = canvas;

        // options
        this.canvasFit = opts.fitToWindow === undefined ? defaults.fitToWindow : opts.fitToWindow;
        this.listenForMouse = opts.listenForMouse === undefined ? defaults.listenForMouse : opts.listenForMouse;
        this.listenForTouch = opts.listenForTouch === undefined ? defaults.listenForTouch : opts.listenForTouch;
        this.listenForKeyboard = opts.listenForKeyboard === undefined ? defaults.listenForKeyboard : opts.listenForKeyboard;

        // listeners values are arrays of objects containing handlers and (optional) targets
        // eg: this.listeners.keyup = [{
        //         handler: {Function},
        //         target: {Sprite}
        //     }];
        this.pointerListeners = {
            [eventConstants.DBL_CLICK]: [],
            [eventConstants.DBL_TAB]: [],
            [eventConstants.DRAG]: [],
            [eventConstants.DRAG_END]: [],
            [eventConstants.DRAG_START]: [],
            [eventConstants.CLICK]: [],
            [eventConstants.TAP]: [],
            [eventConstants.MOUSE_DOWN]: [],
            [eventConstants.MOUSE_UP]: [],
            [eventConstants.TOUCH_START]: [],
            [eventConstants.TOUCH_END]: [],
            [eventConstants.MOUSE_MOVE]: [],
            [eventConstants.TOUCH_MOVE]: []
        };
        this.keyboardListeners = {
            [eventConstants.KEY_DOWN]: [],
            [eventConstants.KEY_UP]: []
        };

        if (this.listenForKeyboard) {
            addKeyboardListeners(canvas);
        }

        if (this.listenForMouse) {
            addMouseListeners(canvas);
        }

        if (this.listenForTouch) {
            addTouchListeners(canvas);
        }

        this._onTick = this._onTick.bind(this);
        tuneIn(this.canvas, "tick", this._onTick);
    }

    /**
     * Checks for duplicate handler in the listener tyoe being added
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
     * @method Input#_onTick
     * @param  {Object} e The event object
     */
    _onTick() {
        for (let event of queuedEvents) {
            switch (event.type) {
            case eventConstants.KEY_UP:
            case eventConstants.KEY_DOWN:
                handleKeyboardEvents(event, this.keyboardListeners);
                break;
            default:
                handlePointerEvents(event, this.pointerListeners);
                break;
            }
        }
    }

    _getHandlerObjects (type) {
        switch (type) {
        case eventConstants.KEY_UP:
        case eventConstants.KEY_DOWN:
            return this.keyboardListeners[type];
        default:
            return this.pointerListeners[type];
        }
    }

    /**
     * Adds a handler for the given event type
     * @method Input#addListener
     * @param  {Sprite|null} target  The target to check event trigger against, assign `null` to listen for all
     * @param  {string}      type    The event type
     * @param  {function}    handler The function to execute when event triggered
     * @param  {Object}      [scope] The optional scope to assign the handler
     * @return {boolean}             Returns true if added and false if callback already exists
     */
    addListener(target, type, handler, scope) {
        let handlerObjects = this._getHandlerObjects(type);
        let dup;

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
     * @method Input#removeListener
     * @param  {string}   type    the event type
     * @param  {function} handler the handler to remove
     * @return {boolean}  removed Returns true if removed and otherwise false
     */
    removeListener(type, handler) {
        let handlers = this._getHandlerObjects(type);
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
