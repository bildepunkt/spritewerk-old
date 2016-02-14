(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Camera = require('./src/Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Draw = require('./src/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _Input = require('./src/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Mobile = require('./src/Mobile');

var _Mobile2 = _interopRequireDefault(_Mobile);

var _Stage = require('./src/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Rectangle = require('./src/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Ticker = require('./src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Mobile2.default.addMetaTags();

var camera = new _Camera2.default();
var stage = new _Stage2.default(800, 600, {
    bgColor: '#222',
    fill: true
});
var draw = new _Draw2.default(stage.getCanvas(), camera);
var input = new _Input2.default(stage.getCanvas());
var ticker = new _Ticker2.default();
var rect = new _Rectangle2.default();

ticker.onTick = function (factor) {
    draw.clear('#DDD');
    console.log(factor);

    var speed = 800 * factor;
    rect.setX(rect.getX() + speed);

    draw.render(rect);
};

},{"./src/Camera":2,"./src/Draw":3,"./src/Input":4,"./src/Mobile":5,"./src/Rectangle":6,"./src/Stage":8,"./src/Ticker":9}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Camera
 * @description Decides what gets rendered
 * @author      Chris Peters
 */

var Camera = (function () {
    function Camera() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Camera);

        this._x = 0;
        this._y = 0;
    }

    /**
     * @method Camera#getX
     * @return {Integer}
     */

    _createClass(Camera, [{
        key: "getX",
        value: function getX() {
            return this._x;
        }

        /**
         * @method Camera#getY
         * @return {Integer}
         */

    }, {
        key: "getY",
        value: function getY() {
            return this._y;
        }

        /**
         * @method Camera#setX
         * @param  {Integer} val The x value
         * @return {Camera}
         */

    }, {
        key: "setX",
        value: function setX(val) {
            this._x = val;

            return this;
        }

        /**
         * @method Camera#setY
         * @param  {Integer} val The y value
         * @return {Camera}
         */

    }, {
        key: "setY",
        value: function setY(val) {
            this._y = val;

            return this;
        }
    }]);

    return Camera;
})();

exports.default = Camera;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CanvasTransform = require('./lib/CanvasTransform');

var _CanvasTransform2 = _interopRequireDefault(_CanvasTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Draw
 * @description Handles rendering entities onto the canvas element. Merges context
 *              object with CanvasTransform instance in the constructor.
 * @author      Chris Peters
 * @requires    CanvasTransform
 *
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera
 */

var Draw = (function () {
    function Draw(canvas, camera) {
        _classCallCheck(this, Draw);

        this._canvas = canvas;
        this._camera = camera;
        this._originalContext = this._canvas.getContext('2d');
        this._canvasXform = new _CanvasTransform2.default(this._originalContext);
        this._imageSmoothingEnabled = true;

        this._context = this._originalContext;

        for (var method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }

        this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
    }

    /**
     * Clears the entire canvas and optionally fills with a color
     *
     * @method Draw#clear
     * @param  {String} [color] If passed, will fill the canvas with the color value
     */

    _createClass(Draw, [{
        key: 'clear',
        value: function clear(color) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if (color) {
                this._context.save();
                this._context.fillStyle = color;
                this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                this._context.restore();
            }
        }

        /**
         * Returns the context object
         *
         * @method Draw#getContext
         * @return {Object} The 2D context object
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }

        /**
         * Offsets canvas based on camera and calls an entity's render method passing the context.
         * Saves and restores context and beginning and end of operation.
         *
         * @method Draw#render
         * @param  {Object} entity [description]
         */

    }, {
        key: 'render',
        value: function render(entity) {
            this._context.save();
            this._context.translate(-this._camera.getX(), -this._camera.getY());

            entity.render(this._context);

            this._context.restore();
        }

        /**
         * Set the context image smoothing
         *
         * @method Draw#setImageSmoothing
         * @param  {Boolean} val The image smoothing value
         */

    }, {
        key: 'setImageSmoothing',
        value: function setImageSmoothing(val) {
            this._imageSmoothingEnabled = val;
            this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
            this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
            this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
            this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;

            return this;
        }
    }]);

    return Draw;
})();

exports.default = Draw;

},{"./lib/CanvasTransform":10}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keycodes = require('./lib/keycodes');

var _keycodes2 = _interopRequireDefault(_keycodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Input
 * @description A module for handling keyboard, mouse, and touch events on the canvas
 * @author      Chris Peters
 *
 * @param {HTMLEntity} canvas                   The canvas element to interact with
 * @param {Object}     [opts]
 * @param {Boolean}    [opts.canvasFit]         Set to true if using css to fit the canvas in the viewport
 * @param {Boolean}    [opts.listenForMouse]    Whether or not to listen for mouse events
 * @param {Boolean}    [opts.listenForTouch]    Whether or not to listen for touch events
 * @param {Boolean}    [opts.listenForKeyboard] Whether or not to listen for keyboard events
 */

var Input = (function () {
    function Input(canvas) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Input);

        // options
        this._canvas = canvas;
        this._canvasFit = opts.canvasFit || true;
        this._listenForMouse = opts.listenForMouse || true;
        this._listenForTouch = opts.listenForTouch || false;
        this._listenForKeyboard = opts.listenForKeyboard || true;

        this._uiEvents = {
            DBL_CLICK: 'dblclick',
            DBL_TAP: 'dbltap',

            DRAG: 'drag',
            DRAG_END: 'dragend',
            DRAG_START: 'dragstart',

            CLICK: 'click',
            TAP: 'tap',

            MOUSE_DOWN: 'mousedown',
            MOUSE_UP: 'mouseup',
            TOUCH_START: 'touchstart',
            TOUCH_END: 'touchend',

            MOUSE_MOVE: 'mousemove',
            TOUCH_MOVE: 'touchmove',

            KEY_UP: 'keyup',
            KEY_DOWN: 'keydown'
        };

        // listeners values are arrays of objects containing handlers and (optional) targets
        // eg: this._listeners.keyup = [{
        //         handler: function () {...},
        //         target: { name: 'foo', x: 32, y: 64, ...}
        //     }];
        this._listeners = {};

        for (var key in this._uiEvents) {
            this._listeners[this._uiEvents[key]] = [];
        }

        this._keycodes = _keycodes2.default;
        this._canDrag = false;
        this._isDragging = false;
        this._keysDown = {};
        this._userHitTestMethod = null;
        this._queuedEvents = [];

        if (this._listenForKeyboard) {
            this._addKeyboardListeners();
        }

        if (this._listenForMouse) {
            this._addMouseListeners();
        }

        if (this._listenForTouch) {
            this._addTouchListeners();
        }

        this._onTick = this._onTick.bind(this);
        document.addEventListener('tick', this._onTick, false);
    }

    /**
     * Adds keyboard listeners
     *
     * @method Input#_addKeyboardListeners
     * @private
     */

    _createClass(Input, [{
        key: '_addKeyboardListeners',
        value: function _addKeyboardListeners() {
            var events = ['keyup', 'keydown'];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;

                    this._canvas.addEventListener(event, this._handleKeyboard.bind(this), false);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Adds mouse listeners
         *
         * @method Input#_addMouseListeners
         * @private
         */

    }, {
        key: '_addMouseListeners',
        value: function _addMouseListeners() {
            var events = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var event = _step2.value;

                    this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * Adds touch listeners
         *
         * @method Input#_addTouchListeners
         * @private
         */

    }, {
        key: '_addTouchListeners',
        value: function _addTouchListeners() {
            var events = ['tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'];

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var event = _step3.value;

                    this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         * get the scale ratio of the canvas based on with/heght attrs and css width/height
         *
         * @method Input#_getScaleFactor
         * @return {Float}
         */

    }, {
        key: '_getScaleFactor',
        value: function _getScaleFactor() {
            var factor = 1;
            var canvasWidth = undefined;

            if (this._canvas.style.width) {
                canvasWidth = parseInt(this._canvas.style.width, 10);
                factor = canvasWidth / this._canvas.width;
            }

            return 100 / factor / 100;
        }

        /**
         * Checks if point is inside rectangle
         *
         * @method Input#_hitTest
         * @param  {Integer} x          [description]
         * @param  {Integer} y          [description]
         * @param  {Object} boundingBox [description]
         * @return {Boolean}
         */

    }, {
        key: '_hitTest',
        value: function _hitTest(x, y, boundingBox) {
            return x >= boundingBox.minX && x <= boundingBox.maxX && y >= boundingBox.minY && y <= boundingBox.maxY;
        }

        /**
         * Handler for DOM events. Creates custom event object with helpful properties
         *
         * @method Input#_handleKeyboard
         * @param {object} inputEvent the DOM input event object
         * @private
         */

    }, {
        key: '_handleKeyboard',
        value: function _handleKeyboard(inputEvent) {
            inputEvent.preventDefault();

            var keyName = this._keycodes[inputEvent.keyCode];
            var event = {
                domEvent: inputEvent,
                type: inputEvent.type,
                keyCode: inputEvent.keyCode,
                keyName: (typeof keyName === 'undefined' ? 'undefined' : _typeof(keyName)) === 'object' && keyName.length ? keyName[0] : keyName
            };

            switch (event.type) {
                case this._uiEvents.KEY_DOWN:
                    this._keysDown[keyName] = inputEvent.keyCode;
                    break;
                case this._uiEvents.KEY_UP:
                    delete this._keysDown[keyName];
                    break;
            }

            event.keysDown = this.getKeysDown();

            this._queuedEvents.push(event);
        }

        /**
         * Handler for DOM events. Creates custom event object with helpful properties
         * Creates event objects with x/y coordinates based on scaling and absX/absY for
         * absolute x/y regardless of scale offset
         * Only uses first touch event, thus not currently supporting multi-touch
         *
         * @method Input#
         * @param {object} inputEvent The DOM input event object
         */

    }, {
        key: '_handleMouseAndTouch',
        value: function _handleMouseAndTouch(inputEvent) {
            inputEvent.preventDefault();

            var scaleFactor = this._canvasFit ? this._getScaleFactor() : 1;
            var event = {
                domEvent: inputEvent,
                type: inputEvent.type
            };

            this._queuedEvents.push(event);

            if (inputEvent.hasOwnProperty('touches')) {
                event.absX = inputEvent.touches[0].pageX - this._canvas.offsetLeft;
                event.absY = inputEvent.touches[0].pageY - this._canvas.offsetTop;
            } else {
                event.absX = inputEvent.pageX - this._canvas.offsetLeft;
                event.absY = inputEvent.pageY - this._canvas.offsetTop;
            }

            // coordinate positions relative to canvas scaling
            event.x = Math.round(event.absX * scaleFactor);
            event.y = Math.round(event.absY * scaleFactor);

            switch (event.type) {
                case this._uiEvents.MOUSE_DOWN:
                case this._uiEvents.TOUCH_START:

                    this._canDrag = true;

                    break;

                case this._uiEvents.MOUSE_UP:
                case this._uiEvents.TOUCH_END:

                    this._canDrag = false;

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
         * Checks for duplicate handler in the listener tyoe being added
         *
         * @method Input#_isDuplicateHandler
         * @param  {Function} handler  The handler to check
         * @param  {Array}    handlers The handlers of the listener type being added
         * @return {Boolean}
         * @private
         */

    }, {
        key: '_isDuplicateHandler',
        value: function _isDuplicateHandler(handler, handlerObjects) {
            var dup = false;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = handlerObjects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var handlerObject = _step4.value;

                    if (handler === handlerObject.handler) {
                        dup = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
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

    }, {
        key: '_onTick',
        value: function _onTick(e) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this._queuedEvents[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var event = _step5.value;

                    this._triggerHandlers(event);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
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

    }, {
        key: '_triggerHandlers',
        value: function _triggerHandlers(event) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this._listeners[event.type][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var handlerObject = _step6.value;

                    if (handlerObject.target) {
                        var hitTest = this._userHitTestMethod || this._hitTest;

                        if (hitTest(event.x, event.y, handlerObject.target.getBoundingArea())) {

                            event.target = handlerObject.target;

                            // if event was bound with a target trigger handler ONLY if target hit
                            handlerObject.handler(event);
                        }
                    } else {
                        handlerObject.handler(event);
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }

        /**
         * Adds a handler for a certain event type
         *
         * @method Input#addListener
         * @param  {string}   type     The event type
         * @param  {function} handler  The function to execute when event triggered
         * @param  {object}   [target] The target to check event trigger against
         * @return {boolean}           Returns true if added and false if callback already exists
         */

    }, {
        key: 'addListener',
        value: function addListener(type, handler, target) {
            var handlerObjects = this._listeners[type];
            var dup = undefined;

            if (!handlerObjects) {
                throw new TypeError('Event type "' + type + '" does not exist.');
            }

            if (handlerObjects.length) {
                dup = this._isDuplicateHandler(handler, handlerObjects);
            }

            if (!dup) {
                handlerObjects.push({
                    handler: handler, target: target
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

    }, {
        key: 'removeListener',
        value: function removeListener(type, handler) {
            var handlers = this._listeners[type];
            var removed = false;

            if (!handlers) {
                throw new TypeError('Event type "' + type + '" does not exist.');
            }

            for (var i = 0, len = handlers.length; i < len; i++) {
                var handlerObject = handlers[i];
                if (handlerObject.handler === handler) {
                    handlers.splice(i, 1);
                    removed = true;
                    break;
                }
            }

            return removed;
        }

        /**
         * returns an object of the keys currently being pressed
         * eg: <code>{ LEFT_ARROW: 37, UP_ARROW: 38 }</code>
         *
         * @method Input#getKeysDown
         * @return {Object}
         */

    }, {
        key: 'getKeysDown',
        value: function getKeysDown() {
            return this._keysDown;
        }

        /**
         * Allows user to set a custom hit test method
         *
         * @method Input#setHitTestMethod
         * @param {Function} fn The user's hit test method
         */

    }, {
        key: 'setHitTestMethod',
        value: function setHitTestMethod(fn) {
            if (typeof fn !== 'function') {
                throw new TypeError('Input#setHitTestMethod parameter must be a function');
            }

            this._userHitTestMethod = fn;
        }
    }]);

    return Input;
})();

exports.default = Input;

},{"./lib/keycodes":11}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Mobile
 * @description A class with helpers for making the application play nice with mobile browsers
 * @author      Chris Peters
 */

var Mobile = (function () {
    function Mobile() {
        _classCallCheck(this, Mobile);
    }

    _createClass(Mobile, null, [{
        key: 'addMetaTags',

        /**
         * [addMetaTags description]
         * @method Mobile.addMetaTags
         * @param  {Object} doc [description]
         */
        value: function addMetaTags() {
            var doc = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

            var head = doc.head;
            var meta = doc.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, user-scalable=no, ' + 'initial-scale=1, maximum-scale=1, user-scalable=0';
            head.appendChild(meta);

            meta = doc.createElement('meta');
            meta.name = 'apple-mobile-web-app-capable';
            meta.content = 'yes';
            head.appendChild(meta);

            meta = doc.createElement('meta');
            meta.name = 'mobile-web-app-capable';
            meta.content = 'yes';
            head.appendChild(meta);
        }
    }]);

    return Mobile;
})();

exports.default = Mobile;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class   Rectangle
 * @extends {@link Sprite}
 * @desc    A sprite that renders as a rectangle
 * @author  Chris Peters
 */

var Rectangle = (function (_Sprite) {
    _inherits(Rectangle, _Sprite);

    function Rectangle() {
        _classCallCheck(this, Rectangle);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this));

        _this._fill = '#000';
        _this._stroke = '';
        return _this;
    }

    _createClass(Rectangle, [{
        key: 'render',
        value: function render(context) {
            context.save();
            context.fillStyle = this._fill;
            context.fillRect(this._x, this._y, this._width, this._height);

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(this._x, this._y, this._width, this._height);
            }

            context.restore();
        }

        /**
         * [setFill description]
         *
         * @method Rectangle#setFill
         * @param  {String} val The fill color hex, rgb, rgba, etc.
         */

    }, {
        key: 'setFill',
        value: function setFill(val) {
            this._fill = val;
        }

        /**
         * [setStroke description]
         *
         * @method Rectangle#setStroke
         * @param  {String} val The stroke color hex, rgb, rgba, etc.
         */

    }, {
        key: 'setStroke',
        value: function setStroke(val) {
            this._fill = val;
        }
    }]);

    return Rectangle;
})(_Sprite3.default);

exports.default = Rectangle;

},{"./Sprite":7}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 *
 * @param {Integer} [x] The initial x position. Default is 0
 * @param {Integer} [y] The initial y position. Default is 0
 */

var Sprite = (function () {
  function Sprite() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Sprite);

    this._x = x;
    this._y = y;
    this._srcX = 0;
    this._srcY = 0;
    this._srcWidth = 32;
    this._srcHeight = 32;
    this._width = 32;
    this._height = 32;
    this._scaleX = 1;
    this._scaleY = 1;
    this._rotation = 0;
    /**
     * The composite operation type. Can be source-atop|source-in|source-out|source-over|destination-atop|destination-in|destination-out|destination-over|lighter|xor|copy
     * Default is 'source-over'
     *
     * @member Sprite#_composite
     * @type {String}
     */
    this._composite = Sprite._compositeDefault;
    this._opacity = 1;
  }

  /**
   * @method Sprite.getCompositeDefault
   * @return {String}
   */

  _createClass(Sprite, [{
    key: 'getBoundingArea',

    /**
     * @return {Object} The bounding area
     */
    value: function getBoundingArea() {
      return {
        maxX: this._x + this._width,
        maxY: this._y + this._height,
        minX: this._x,
        minY: this._y
      };
    }

    /**
     * @method Sprite#getComposite
     * @return {String}
     */

  }, {
    key: 'getComposite',
    value: function getComposite() {
      return this._composite;
    }

    /**
     * @method Sprite#getHeight
     * @return {Integer}
     */

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this._height;
    }

    /**
     * @method Sprite#getOpacity
     * @return {Float}
     */

  }, {
    key: 'getOpacity',
    value: function getOpacity() {
      return this._opacity;
    }

    /**
     * @method Sprite#getRotation
     * @return {Float}
     */

  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this._rotation;
    }

    /**
     * @method Sprite#getScaleX
     * @return {Integer}
     */

  }, {
    key: 'getScaleX',
    value: function getScaleX() {
      return this._scaleX;
    }

    /**
     * @method Sprite#getScaleY
     * @return {Integer}
     */

  }, {
    key: 'getScaleY',
    value: function getScaleY() {
      return this._scaleY;
    }

    /**
     * @method Sprite#getSrcX
     * @return {Integer}
     */

  }, {
    key: 'getSrcX',
    value: function getSrcX() {
      return this._srcX;
    }

    /**
     * @method Sprite#getSrcY
     * @return {Integer}
     */

  }, {
    key: 'getSrcY',
    value: function getSrcY() {
      return this._srcY;
    }

    /**
     * @method Sprite#getWidth
     * @return {Integer}
     */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this._width;
    }

    /**
     * @method Sprite#getX
     * @return {Integer}
     */

  }, {
    key: 'getX',
    value: function getX() {
      return this._x;
    }

    /**
     * @method Sprite#getY
     * @return {Integer}
     */

  }, {
    key: 'getY',
    value: function getY() {
      return this._y;
    }

    /**
     *
     * @method Sprite#setComposite
     * @param  {Integer} val The composite value
     * @return {Sprite}
     */

  }, {
    key: 'setComposite',
    value: function setComposite(val) {
      this._composite = val;

      return this;
    }

    /**
     *
     * @method Sprite#setHeight
     * @param  {Integer} val The height value
     * @return {Sprite}
     */

  }, {
    key: 'setHeight',
    value: function setHeight(val) {
      this._height = val;

      return this;
    }

    /**
     *
     * @method Sprite#setOpacity
     * @param  {Float} val The opacity value
     * @return {Sprite}
     */

  }, {
    key: 'setOpacity',
    value: function setOpacity(val) {
      this._opacity = val;

      return this;
    }

    /**
     *
     * @method Sprite#setRotation
     * @param  {Integer} val The rotation value
     * @return {Sprite}
     */

  }, {
    key: 'setRotation',
    value: function setRotation(val) {
      this._rotation = val;

      return this;
    }

    /**
     *
     * @method Sprite#setScaleX
     * @param  {Integer} val The scaleX value
     * @return {Sprite}
     */

  }, {
    key: 'setScaleX',
    value: function setScaleX(val) {
      this._scaleX = val;

      return this;
    }

    /**
     *
     * @method Sprite#setScaleY
     * @param  {Integer} val The scaleY value
     * @return {Sprite}
     */

  }, {
    key: 'setScaleY',
    value: function setScaleY(val) {
      this._scaleY = val;

      return this;
    }

    /**
     *
     * @method Sprite#setSrcX
     * @param  {Integer} val The srcX value
     * @return {Sprite}
     */

  }, {
    key: 'setSrcX',
    value: function setSrcX(val) {
      this._srcX = val;

      return this;
    }

    /**
     *
     * @method Sprite#setSrcY
     * @param  {Integer} val The srcY value
     * @return {Sprite}
     */

  }, {
    key: 'setSrcY',
    value: function setSrcY(val) {
      this._srcY = val;

      return this;
    }

    /**
     *
     * @method Sprite#setWidth
     * @param  {Integer} val The width value
     * @return {Sprite}
     */

  }, {
    key: 'setWidth',
    value: function setWidth(val) {
      this._width = val;

      return this;
    }

    /**
     *
     * @method Sprite#setComposite
     * @param  {Integer} val The x value
     * @return {Sprite}
     */

  }, {
    key: 'setX',
    value: function setX(val) {
      this._x = val;

      return this;
    }

    /**
     *
     * @method Sprite#setY
     * @param  {Integer} val The y value
     * @return {Sprite}
     */

  }, {
    key: 'setY',
    value: function setY(val) {
      this._y = val;

      return this;
    }
  }], [{
    key: 'getCompositeDefault',
    value: function getCompositeDefault() {
      return Sprite._compositeDefault;
    }
  }]);

  return Sprite;
})();

/**
 * @member Sprite._compositeDefault
 * @type {String}
 */

Sprite._compositeDefault = 'source-over';

exports.default = Sprite;

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Stage
 * @description Creates and handles the canvas element. included in the options
 *              parameter is optional dependency injection used for testing against
 *              a virtual dom.
 * @author      Chris Peters
 *
 * @param {Integer}     [width]         The width of the canvas
 * @param {Integer}     [height]        The height of the canvas
 * @param {Object}      [opts]          Stage options
 * @param {HTMLElement} [opts.parentEl] The element with which to attach the canvas.
 *                                      If none given the body is used.
 * @param {String}      [opts.bgColor]  The parent element's bg color
 * @param {Object}      [opts.document] For testing
 * @param {Object}      [opts.window]   For testing
 * @param {Boolean}     [opts.fill]     Set to false to not maximally fill viewport.
 *                                      Default is true.
 */

var Stage = (function () {
    function Stage() {
        var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
        var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Stage);

        this._fill = opts.fill === undefined ? true : opts.fill;
        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;
        this._parentEl = opts.parentEl || this._document.body;

        this._document.documentElement.style.backgroundColor = opts.bgColor;

        this._createStageElements();

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    _createClass(Stage, [{
        key: '_createStageElements',
        value: function _createStageElements() {
            this._stage = this._document.createElement('div');
            this._parentEl.appendChild(this._stage);

            this._video = this._document.createElement('video');
            this._video.style.position = 'absolute';
            this._stage.appendChild(this._video);

            this._canvas = this._document.createElement('canvas');
            this._canvas.width = this._width;
            this._canvas.height = this._height;
            this._canvas.style.position = 'absolute';
            this._stage.appendChild(this._canvas);
        }

        /**
         * Calls _resizeElement for stage elements
         *
         * @method Stage#_handleResize
         */

    }, {
        key: '_handleResize',
        value: function _handleResize() {
            this._resizeElement(this._canvas);
            this._resizeElement(this._video);
        }

        /**
         * Decides how to handle resize based on options
         *
         * @method Stage#_resizeElement
         * @param  {HTMLEntity} el The element to resize
         */

    }, {
        key: '_resizeElement',
        value: function _resizeElement(el) {
            if (this._fill) {
                var _Stage$fill = Stage.fill(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$fill.top;
                var left = _Stage$fill.left;
                var width = _Stage$fill.width;
                var height = _Stage$fill.height;

                el.style.top = Math.round(top) + 'px';
                el.style.left = Math.round(left) + 'px';
                el.style.width = Math.round(width) + 'px';
                el.style.height = Math.round(height) + 'px';
            } else {
                var _Stage$center = Stage.center(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$center.top;
                var left = _Stage$center.left;

                el.style.top = Math.round(top) + 'px';
                el.style.left = Math.round(left) + 'px';
            }
        }

        /**
         * Returns the canvas element
         *
         * @method Stage#getCanvas
         * @return {HTMLElement}
         */

    }, {
        key: 'getCanvas',
        value: function getCanvas() {
            return this._canvas;
        }

        /**
         * Returns the video element
         *
         * @method Stage#getVideo
         * @return {HTMLElement}
         */

    }, {
        key: 'getVideo',
        value: function getVideo() {
            return this._video;
        }

        /**
         * Maximizes an element (with aspect ratio intact) in the viewport via CSS.
         *
         * @method Stage.fill
         * @param  {Integer} width          The element's original width attribute
         * @param  {Integer} height         The element's original height attribute
         * @param  {Integer} viewportWidth  The viewport's current width
         * @param  {Integer} viewportHeight The viewport's current height
         * @return {Object}                 The new top, left, width, & height
         */

    }], [{
        key: 'fill',
        value: function fill(width, height, viewportWidth, viewportHeight) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

            var winLandscapeRatio = viewportHeight / viewportWidth;
            var winPortraitRatio = viewportWidth / viewportHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = viewportWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (viewportHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = viewportHeight;
                    offsetWidth = viewportHeight * PORTRAIT_RATIO;
                    offsetLeft = (viewportWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = viewportHeight;
                    offsetWidth = viewportHeight * PORTRAIT_RATIO;
                    offsetLeft = (viewportWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = viewportWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (viewportHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }

        /**
         * Keeps stage element centered in the viewport
         *
         * @method Stage.center
         * @param  {Integer} width          The element's original width attribute
         * @param  {Integer} height         The element's original height attribute
         * @param  {Integer} viewportWidth  The viewport's current width
         * @param  {Integer} viewportHeight The viewport's current height
         * @return {Object}                 The top and left
         */

    }, {
        key: 'center',
        value: function center(width, height, viewportWidth, viewportHeight) {
            return {
                left: (viewportWidth - width) / 2,
                top: (viewportHeight - height) / 2
            };
        }
    }]);

    return Stage;
})();

exports.default = Stage;

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author      Chris Peters
 *
 * @param {Boolean} [start] Whether to start on instantiate. Default is true
 */

var Ticker = (function () {
    function Ticker() {
        var start = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        _classCallCheck(this, Ticker);

        this._then = Date.now();
        this._ticks = 0;

        this._update = this._update.bind(this);

        if (start) {
            this._then = Date.now();
            this.start();
        }
    }

    /**
     * Calculates whether or not to call {@link Ticker#onTick} based on {@link Ticker#_fps}.
     * If the correct amount of time has passed the {@link Ticker#onTick} callback will fire and
     * the <code>tick</code> event will be dispatched via the <code>document</code> object.
     *
     * @method Ticker#_update
     */

    _createClass(Ticker, [{
        key: '_update',
        value: function _update() {
            var now = Date.now();
            var delta = (now - this._then) / 1000;
            this._then = now;

            this._ticks += 1;

            this.onTick(delta, this._ticks);

            // create and fire tick events
            var tickEvent = new CustomEvent('tick', {
                detail: {
                    delta: delta,
                    ticks: this._ticks
                }
            });

            document.dispatchEvent(tickEvent);

            requestAnimationFrame(this._update);
        }

        /**
         * A callback executed on each tick.
         *
         * @method Ticker#onTick
         * @param {Integer} delta The time elapsed between ticks.
         *                        Multiply against gameplay elements for consistent
         *                        movement.
         * @param {Integer} ticks The amount of ticks that have accumulated
         */

    }, {
        key: 'onTick',
        value: function onTick() {}

        /**
         * Starts the ticker
         *
         * @method Ticker#start
         */

    }, {
        key: 'start',
        value: function start() {
            this._then = Date.now();
            requestAnimationFrame(this._update);
        }
    }]);

    return Ticker;
})();

exports.default = Ticker;

},{}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       CanvasTransform
 * @description Retains canvas transformation stack.
 *              Basically a fork from Simon Sarris - www.simonsarris.com - sarris@acm.org
 * @author      Chris Peters
 */

var CanvasTransform = (function () {
    /**
     * @param  {Object} context The canvas' context object
     */

    function CanvasTransform(context) {
        _classCallCheck(this, CanvasTransform);

        this.context = context;
        this.matrix = [1, 0, 0, 1, 0, 0]; //initialize with the identity matrix
        this.stack = [];
    }

    _createClass(CanvasTransform, [{
        key: "setContext",
        value: function setContext(context) {
            this.context = context;
        }
    }, {
        key: "getMatrix",
        value: function getMatrix() {
            return this.matrix;
        }
    }, {
        key: "setMatrix",
        value: function setMatrix(m) {
            this.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
            this.setTransform();
        }
    }, {
        key: "cloneMatrix",
        value: function cloneMatrix(m) {
            return [m[0], m[1], m[2], m[3], m[4], m[5]];
        }

        //==========================================
        // Stack
        //==========================================

    }, {
        key: "save",
        value: function save() {
            var matrix = this.cloneMatrix(this.getMatrix());
            this.stack.push(matrix);

            this.context.save();
        }
    }, {
        key: "restore",
        value: function restore() {
            if (this.stack.length > 0) {
                var matrix = this.stack.pop();
                this.setMatrix(matrix);
            }

            this.context.restore();
        }

        //==========================================
        // Matrix
        //==========================================

    }, {
        key: "setTransform",
        value: function setTransform() {
            if (this.context) {
                this.context.setTransform(this.matrix[0], this.matrix[1], this.matrix[2], this.matrix[3], this.matrix[4], this.matrix[5]);
            }
        }
    }, {
        key: "translate",
        value: function translate(x, y) {
            this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
            this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;

            this.setTransform();
        }
    }, {
        key: "rotate",
        value: function rotate(rad) {
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var m11 = this.matrix[0] * c + this.matrix[2] * s;
            var m12 = this.matrix[1] * c + this.matrix[3] * s;
            var m21 = this.matrix[0] * -s + this.matrix[2] * c;
            var m22 = this.matrix[1] * -s + this.matrix[3] * c;
            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;

            this.setTransform();
        }
    }, {
        key: "scale",
        value: function scale(sx, sy) {
            this.matrix[0] *= sx;
            this.matrix[1] *= sx;
            this.matrix[2] *= sy;
            this.matrix[3] *= sy;

            this.setTransform();
        }

        //==========================================
        // Matrix extensions
        //==========================================

    }, {
        key: "rotateDegrees",
        value: function rotateDegrees(deg) {
            var rad = deg * Math.PI / 180;
            this.rotate(rad);
        }
    }, {
        key: "rotateAbout",
        value: function rotateAbout(rad, x, y) {
            this.translate(x, y);
            this.rotate(rad);
            this.translate(-x, -y);
            this.setTransform();
        }
    }, {
        key: "rotateDegreesAbout",
        value: function rotateDegreesAbout(deg, x, y) {
            this.translate(x, y);
            this.rotateDegrees(deg);
            this.translate(-x, -y);
            this.setTransform();
        }
    }, {
        key: "identity",
        value: function identity() {
            this.m = [1, 0, 0, 1, 0, 0];
            this.setTransform();
        }
    }, {
        key: "multiply",
        value: function multiply(matrix) {
            var m11 = this.matrix[0] * matrix.m[0] + this.matrix[2] * matrix.m[1];
            var m12 = this.matrix[1] * matrix.m[0] + this.matrix[3] * matrix.m[1];

            var m21 = this.matrix[0] * matrix.m[2] + this.matrix[2] * matrix.m[3];
            var m22 = this.matrix[1] * matrix.m[2] + this.matrix[3] * matrix.m[3];

            var dx = this.matrix[0] * matrix.m[4] + this.matrix[2] * matrix.m[5] + this.matrix[4];
            var dy = this.matrix[1] * matrix.m[4] + this.matrix[3] * matrix.m[5] + this.matrix[5];

            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;
            this.matrix[4] = dx;
            this.matrix[5] = dy;
            this.setTransform();
        }
    }, {
        key: "invert",
        value: function invert() {
            var d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
            var m0 = this.matrix[3] * d;
            var m1 = -this.matrix[1] * d;
            var m2 = -this.matrix[2] * d;
            var m3 = this.matrix[0] * d;
            var m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
            var m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
            this.matrix[0] = m0;
            this.matrix[1] = m1;
            this.matrix[2] = m2;
            this.matrix[3] = m3;
            this.matrix[4] = m4;
            this.matrix[5] = m5;
            this.setTransform();
        }

        //==========================================
        // Helpers
        //==========================================

    }, {
        key: "transformPoint",
        value: function transformPoint(x, y) {
            return {
                x: x * this.matrix[0] + y * this.matrix[2] + this.matrix[4],
                y: x * this.matrix[1] + y * this.matrix[3] + this.matrix[5]
            };
        }
    }]);

    return CanvasTransform;
})();

exports.default = CanvasTransform;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 */
exports.default = {
    8: 'BACKSPACE',
    9: 'TAB',
    13: 'ENTER',
    16: 'SHIFT',
    17: 'CTRL',
    18: 'ALT',
    19: 'PAUSE_BREAK',
    20: 'CAPS_LOCK',
    27: 'ESCAPE',
    33: 'PAGE_UP',
    34: 'PAGE_DOWN',
    35: 'END',
    36: 'HOME',
    37: 'LEFT_ARROW',
    38: 'UP_ARROW',
    39: 'RIGHT_ARROW',
    40: 'DOWN_ARROW',
    45: 'INSERT',
    46: 'DELETE',
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    91: 'LEFT_WINDOW_KEY',
    92: 'RIGHT_WINDOW_KEY',
    93: 'SELECT_KEY',
    96: 'NUM_PAD_0',
    97: 'NUM_PAD_1',
    98: 'NUM_PAD_2',
    99: 'NUM_PAD_3',
    100: 'NUM_PAD_4',
    101: 'NUM_PAD_5',
    102: 'NUM_PAD_6',
    103: 'NUM_PAD_7',
    104: 'NUM_PAD_8',
    105: 'NUM_PAD_9',
    106: 'NUM_PAD_ASTERISK',
    107: 'NUM_PAD_PLUS',
    109: 'NUM_PAD_MINUS',
    111: 'NUM_PAD_FOWARD_SLASH',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NUM_LOCK',
    145: 'SCROLL_LOCK',
    186: [';', ':'],
    187: ['=', '+'],
    188: [',', '<'],
    189: ['-', '_'],
    190: ['.', '>'],
    191: ['/', '?'],
    192: ['`', '~'],
    219: ['[', '{'],
    220: ['\\', '|'],
    221: [']', '}'],
    222: ['\'', '"']
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9EcmF3LmpzIiwic3JjL0lucHV0LmpzIiwic3JjL01vYmlsZS5qcyIsInNyYy9SZWN0YW5nbGUuanMiLCJzcmMvU3ByaXRlLmpzIiwic3JjL1N0YWdlLmpzIiwic3JjL1RpY2tlci5qcyIsInNyYy9saWIvQ2FudmFzVHJhbnNmb3JtLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUUEsaUJBQU8sV0FBVyxFQUFFLENBQUM7O0FBRXJCLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxLQUFLLEdBQUcsb0JBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM1QixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxJQUFJLEdBQUcsbUJBQVMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLElBQUksS0FBSyxHQUFHLG9CQUFVLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxJQUFJLEdBQUcseUJBQWUsQ0FBQzs7QUFFM0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUM5QixRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25CLFdBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXBCLFFBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDekIsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7O0FBRS9CLFFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDckIsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3ZCb0IsTUFBTTtBQUN2QixhQURpQixNQUFNLEdBQ0c7WUFBZCxDQUFDLHlEQUFHLENBQUM7WUFBRSxDQUFDLHlEQUFHLENBQUM7OzhCQURQLE1BQU07O0FBRW5CLFlBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1osWUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDZjs7Ozs7O0FBQUE7aUJBSmdCLE1BQU07OytCQVVoQjtBQUNILG1CQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEI7Ozs7Ozs7OzsrQkFNTTtBQUNILG1CQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEI7Ozs7Ozs7Ozs7NkJBT0ksR0FBRyxFQUFFO0FBQ04sZ0JBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDOztBQUVkLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7Ozs7Ozs7OzZCQU9JLEdBQUcsRUFBRTtBQUNOLGdCQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQzs7QUFFZCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7O1dBMUNnQixNQUFNOzs7a0JBQU4sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDT04sSUFBSTtBQUNyQixhQURpQixJQUFJLENBQ1QsTUFBTSxFQUFFLE1BQU0sRUFBRTs4QkFEWCxJQUFJOztBQUVqQixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixZQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEQsWUFBSSxDQUFDLFlBQVksR0FBRyw4QkFBb0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsWUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzs7QUFFbkMsWUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7O0FBRXRDLGFBQUssSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNsQyxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEOztBQUVELFlBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0FBQ2xFLFlBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0FBQ3JFLFlBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0FBQ3hFLFlBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0tBQ3ZFOzs7Ozs7OztBQUFBO2lCQWxCZ0IsSUFBSTs7OEJBMEJmLEtBQUssRUFBRTtBQUNULGdCQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXZFLGdCQUFJLEtBQUssRUFBRTtBQUNQLG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLG9CQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDaEMsb0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0RSxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMzQjtTQUNKOzs7Ozs7Ozs7OztxQ0FRWTtBQUNULG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7Ozs7Ozs7OzsrQkFTTSxNQUFNLEVBQUU7QUFDWCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDOztBQUVwRSxrQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLGdCQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCOzs7Ozs7Ozs7OzswQ0FRaUIsR0FBRyxFQUFFO0FBQ25CLGdCQUFJLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBQ2xDLGdCQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztBQUNsRSxnQkFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7QUFDckUsZ0JBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0FBQ3hFLGdCQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQzs7QUFFcEUsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7OztXQTdFZ0IsSUFBSTs7O2tCQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFSixLQUFLO0FBQ3RCLGFBRGlCLEtBQUssQ0FDVixNQUFNLEVBQWE7WUFBWCxJQUFJLHlEQUFHLEVBQUU7OzhCQURaLEtBQUs7OztBQUdsQixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ3pDLFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUM7QUFDbkQsWUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQztBQUNwRCxZQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQzs7QUFFekQsWUFBSSxDQUFDLFNBQVMsR0FBRztBQUNiLHFCQUFTLEVBQUUsVUFBVTtBQUNyQixtQkFBTyxFQUFFLFFBQVE7O0FBRWpCLGdCQUFJLEVBQUUsTUFBTTtBQUNaLG9CQUFRLEVBQUUsU0FBUztBQUNuQixzQkFBVSxFQUFFLFdBQVc7O0FBRXZCLGlCQUFLLEVBQUUsT0FBTztBQUNkLGVBQUcsRUFBRSxLQUFLOztBQUVWLHNCQUFVLEVBQUUsV0FBVztBQUN2QixvQkFBUSxFQUFFLFNBQVM7QUFDbkIsdUJBQVcsRUFBRSxZQUFZO0FBQ3pCLHFCQUFTLEVBQUUsVUFBVTs7QUFFckIsc0JBQVUsRUFBRSxXQUFXO0FBQ3ZCLHNCQUFVLEVBQUUsV0FBVzs7QUFFdkIsa0JBQU0sRUFBRSxPQUFPO0FBQ2Ysb0JBQVEsRUFBRSxTQUFTO1NBQ3RCOzs7Ozs7O0FBQUMsQUFPRixZQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsYUFBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzVCLGdCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDN0M7O0FBRUQsWUFBSSxDQUFDLFNBQVMscUJBQVcsQ0FBQztBQUMxQixZQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN0QixZQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN6QixZQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixZQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLFlBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDOztBQUV4QixZQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUN6QixnQkFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDaEM7O0FBRUQsWUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3RCLGdCQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3Qjs7QUFFRCxZQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDdEIsZ0JBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCOztBQUVELFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsZ0JBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMxRDs7Ozs7Ozs7QUFBQTtpQkFoRWdCLEtBQUs7O2dEQXdFRTtBQUNwQixnQkFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7QUFFbEMscUNBQWtCLE1BQU0sOEhBQUU7d0JBQWpCLEtBQUs7O0FBQ1Ysd0JBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNoRjs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7Ozs7Ozs7Ozs7OzZDQVFvQjtBQUNqQixnQkFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7QUFFeEUsc0NBQWtCLE1BQU0sbUlBQUU7d0JBQWpCLEtBQUs7O0FBQ1Ysd0JBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3JGOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7Ozs7Ozs7Ozs7NkNBUW9CO0FBQ2pCLGdCQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs7OztBQUV0RSxzQ0FBa0IsTUFBTSxtSUFBRTt3QkFBakIsS0FBSzs7QUFDVix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDckY7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7Ozs7Ozs7OzswQ0FRaUI7QUFDZCxnQkFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsZ0JBQUksV0FBVyxZQUFBLENBQUM7O0FBRWhCLGdCQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUMxQiwyQkFBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckQsc0JBQU0sR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDN0M7O0FBRUQsbUJBQU8sR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDN0I7Ozs7Ozs7Ozs7Ozs7O2lDQVdRLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFO0FBQ3hCLG1CQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUNqRCxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztTQUN0RDs7Ozs7Ozs7Ozs7O3dDQVNlLFVBQVUsRUFBRTtBQUN4QixzQkFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUU1QixnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsZ0JBQUksS0FBSyxHQUFHO0FBQ1Isd0JBQVEsRUFBRSxVQUFVO0FBQ3BCLG9CQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7QUFDckIsdUJBQU8sRUFBRSxVQUFVLENBQUMsT0FBTztBQUMzQix1QkFBTyxFQUFFLFFBQU8sT0FBTyx5Q0FBUCxPQUFPLE9BQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FDVixPQUFPO2FBQ2QsQ0FBQzs7QUFFRixvQkFBUSxLQUFLLENBQUMsSUFBSTtBQUNkLHFCQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtBQUN4Qix3QkFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO0FBQzdDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDdEIsMkJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQiwwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsaUJBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUVwQyxnQkFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7Ozs7Ozs7Ozs7Ozs7OzZDQVdvQixVQUFVLEVBQUU7QUFDN0Isc0JBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFNUIsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMvRCxnQkFBSSxLQUFLLEdBQUc7QUFDUix3QkFBUSxFQUFFLFVBQVU7QUFDcEIsb0JBQUksRUFBRSxVQUFVLENBQUMsSUFBSTthQUN4QixDQUFDOztBQUVGLGdCQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFL0IsZ0JBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUN0QyxxQkFBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNuRSxxQkFBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNyRSxNQUFNO0FBQ0gscUJBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUN4RCxxQkFBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQzFEOzs7QUFBQSxBQUdELGlCQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztBQUMvQyxpQkFBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUM7O0FBRS9DLG9CQUFRLEtBQUssQ0FBQyxJQUFJO0FBQ2QscUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFDL0IscUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXOztBQUUzQix3QkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O0FBRXJCLDBCQUFNOztBQUFBLEFBRVYscUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDN0IscUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTOztBQUV6Qix3QkFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXRCLHdCQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbEIsNEJBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztBQUV6Qiw0QkFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQzdDLGdDQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO3lCQUNoQyxDQUFDLENBQUMsQ0FBQztxQkFDUDs7QUFFRCwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQy9CLHFCQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTs7QUFFMUIsd0JBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNmLDRCQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixnQ0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7O0FBRXhCLGdDQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7QUFDN0Msb0NBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVU7NkJBQ2xDLENBQUMsQ0FBQyxDQUFDO3lCQUNQOztBQUVELDRCQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7QUFDN0MsZ0NBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7eUJBQzVCLENBQUMsQ0FBQyxDQUFDO3FCQUNQOztBQUVELDBCQUFNO0FBQUEsYUFDYjtTQUNKOzs7Ozs7Ozs7Ozs7Ozs0Q0FXbUIsT0FBTyxFQUFFLGNBQWMsRUFBRTtBQUN6QyxnQkFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0FBRWhCLHNDQUEwQixjQUFjLG1JQUFFO3dCQUFqQyxhQUFhOztBQUNsQix3QkFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLE9BQU8sRUFBRTtBQUNuQywyQkFBRyxHQUFHLElBQUksQ0FBQztBQUNYLDhCQUFNO3FCQUNUO2lCQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsbUJBQU8sR0FBRyxDQUFDO1NBQ2Q7Ozs7Ozs7Ozs7O2dDQVFPLENBQUMsRUFBRTs7Ozs7O0FBQ1Asc0NBQWtCLElBQUksQ0FBQyxhQUFhLG1JQUFFO3dCQUE3QixLQUFLOztBQUNWLHdCQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1NBQzNCOzs7Ozs7Ozs7Ozs7eUNBU2dCLEtBQUssRUFBRTs7Ozs7O0FBQ3BCLHNDQUEwQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUlBQUU7d0JBQTlDLGFBQWE7O0FBRWxCLHdCQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDdEIsNEJBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDOztBQUV2RCw0QkFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUN4QixhQUFhLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUU7O0FBRXpDLGlDQUFLLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNOzs7QUFBQyxBQUdwQyx5Q0FBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDaEM7cUJBQ0osTUFBTTtBQUNILHFDQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoQztpQkFDSjs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7Ozs7Ozs7Ozs7Ozs7O29DQVdXLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9CLGdCQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLGdCQUFJLEdBQUcsWUFBQSxDQUFDOztBQUdSLGdCQUFJLENBQUUsY0FBYyxFQUFFO0FBQ2xCLHNCQUFNLElBQUksU0FBUyxrQkFBZ0IsSUFBSSx1QkFBb0IsQ0FBQzthQUMvRDs7QUFFRCxnQkFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLG1CQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQzthQUMzRDs7QUFFRCxnQkFBSSxDQUFDLEdBQUcsRUFBRTtBQUNOLDhCQUFjLENBQUMsSUFBSSxDQUFDO0FBQ2hCLDJCQUFPLEVBQVAsT0FBTyxFQUFFLE1BQU0sRUFBTixNQUFNO2lCQUNsQixDQUFDLENBQUM7QUFDSCx1QkFBTyxJQUFJLENBQUM7YUFDZjs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7Ozs7Ozs7Ozs7Ozs7dUNBVWMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUMxQixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxnQkFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDOztBQUVwQixnQkFBSSxDQUFFLFFBQVEsRUFBRTtBQUNaLHNCQUFNLElBQUksU0FBUyxrQkFBZ0IsSUFBSSx1QkFBb0IsQ0FBQzthQUMvRDs7QUFFRCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNqRCxvQkFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLG9CQUFJLGFBQWEsQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO0FBQ25DLDRCQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0QiwyQkFBTyxHQUFHLElBQUksQ0FBQztBQUNmLDBCQUFNO2lCQUNUO2FBQ0o7O0FBRUQsbUJBQU8sT0FBTyxDQUFDO1NBQ2xCOzs7Ozs7Ozs7Ozs7c0NBU2E7QUFDVixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7Ozs7Ozs7Ozt5Q0FRZ0IsRUFBRSxFQUFFO0FBQ2pCLGdCQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtBQUMxQixzQkFBTSxJQUFJLFNBQVMsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2FBQzlFOztBQUVELGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1NBQ2hDOzs7V0E1WWdCLEtBQUs7OztrQkFBTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVEwsTUFBTTthQUFOLE1BQU07OEJBQU4sTUFBTTs7O2lCQUFOLE1BQU07Ozs7Ozs7O3NDQU1ZO2dCQUFoQixHQUFHLHlEQUFHLFFBQVE7O0FBQzdCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUN2QixnQkFBSSxDQUFDLE9BQU8sR0FBRyx3Q0FBd0MsR0FDbkQsbURBQW1ELENBQUM7QUFDeEQsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXZCLGdCQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLElBQUksR0FBRyw4QkFBOEIsQ0FBQztBQUMzQyxnQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXZCLGdCQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQztBQUNyQyxnQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7OztXQXZCZ0IsTUFBTTs7O2tCQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0dOLFNBQVM7Y0FBVCxTQUFTOztBQUMxQixhQURpQixTQUFTLEdBQ1o7OEJBREcsU0FBUzs7MkVBQVQsU0FBUzs7QUFJdEIsY0FBSyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLGNBQUssT0FBTyxHQUFHLEVBQUUsQ0FBQzs7S0FDckI7O2lCQU5nQixTQUFTOzsrQkFRbkIsT0FBTyxFQUFFO0FBQ1osbUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNmLG1CQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDL0IsbUJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU5RCxnQkFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2QsdUJBQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNuQyx1QkFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkU7O0FBRUQsbUJBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjs7Ozs7Ozs7Ozs7Z0NBUU8sR0FBRyxFQUFFO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3BCOzs7Ozs7Ozs7OztrQ0FRUyxHQUFHLEVBQUU7QUFDWCxnQkFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDcEI7OztXQXZDZ0IsU0FBUzs7O2tCQUFULFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBeEIsTUFBTTtBQUNSLFdBREUsTUFBTSxHQUNrQjtRQUFkLENBQUMseURBQUcsQ0FBQztRQUFFLENBQUMseURBQUcsQ0FBQzs7MEJBRHRCLE1BQU07O0FBRUosUUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixRQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLFFBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsUUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixRQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixRQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixRQUFJLENBQUMsU0FBUyxHQUFHLENBQUM7Ozs7Ozs7O0FBQUMsQUFRbkIsUUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsUUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7R0FDckI7Ozs7OztBQUFBO2VBdEJDLE1BQU07Ozs7OztzQ0FtQ1U7QUFDZCxhQUFPO0FBQ0gsWUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU07QUFDM0IsWUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU87QUFDNUIsWUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ2IsWUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO09BQ2hCLENBQUM7S0FDTDs7Ozs7Ozs7O21DQU1jO0FBQ1gsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQzFCOzs7Ozs7Ozs7Z0NBTVc7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkI7Ozs7Ozs7OztpQ0FNWTtBQUNULGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Ozs7Ozs7O2tDQU1hO0FBQ1YsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCOzs7Ozs7Ozs7Z0NBTVc7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkI7Ozs7Ozs7OztnQ0FNVztBQUNSLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7Ozs7Ozs7OzhCQU1TO0FBQ04sYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3JCOzs7Ozs7Ozs7OEJBTVM7QUFDTixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7Ozs7OzsrQkFNVTtBQUNQLGFBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7Ozs7OzJCQU1NO0FBQ0gsYUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7Ozs7MkJBTU07QUFDSCxhQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEI7Ozs7Ozs7Ozs7O2lDQVFZLEdBQUcsRUFBRTtBQUNkLFVBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDOztBQUV0QixhQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs4QkFRUyxHQUFHLEVBQUU7QUFDWCxVQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7QUFFbkIsYUFBTyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7Ozs7K0JBUVUsR0FBRyxFQUFFO0FBQ1osVUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7O0FBRXBCLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7Ozs7O2dDQVFXLEdBQUcsRUFBRTtBQUNiLFVBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOztBQUVyQixhQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs4QkFRUyxHQUFHLEVBQUU7QUFDWCxVQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7QUFFbkIsYUFBTyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7Ozs7OEJBUVMsR0FBRyxFQUFFO0FBQ1gsVUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7O0FBRW5CLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7Ozs7OzRCQVFPLEdBQUcsRUFBRTtBQUNULFVBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOztBQUVqQixhQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs0QkFRTyxHQUFHLEVBQUU7QUFDVCxVQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7QUFFakIsYUFBTyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7Ozs7NkJBUVEsR0FBRyxFQUFFO0FBQ1YsVUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRWxCLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7Ozs7O3lCQVFJLEdBQUcsRUFBRTtBQUNOLFVBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDOztBQUVkLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7Ozs7O3lCQVFJLEdBQUcsRUFBRTtBQUNOLFVBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDOztBQUVkLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OzswQ0ExTzRCO0FBQ3pCLGFBQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDO0tBQ25DOzs7U0E5QkMsTUFBTTs7Ozs7Ozs7QUE2UVosTUFBTSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQzs7a0JBRTFCLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDclFBLEtBQUs7QUFDdEIsYUFEaUIsS0FBSyxHQUM0QjtZQUF0QyxLQUFLLHlEQUFHLEdBQUc7WUFBRSxNQUFNLHlEQUFHLEdBQUc7WUFBRSxJQUFJLHlEQUFHLEVBQUU7OzhCQUQvQixLQUFLOztBQUVsQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hELFlBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7QUFDM0MsWUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUNyQyxZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7O0FBRXRELFlBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7QUFFcEUsWUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7O0FBRTVCLFlBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkUsWUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVsRixZQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDeEI7O2lCQWpCZ0IsS0FBSzs7K0NBbUJDO0FBQ25CLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELGdCQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3hDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXJDLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELGdCQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2pDLGdCQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ25DLGdCQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7Ozs7Ozs7Ozs7d0NBT2U7QUFDWixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDOzs7Ozs7Ozs7Ozt1Q0FRYyxFQUFFLEVBQUU7QUFDZixnQkFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2tDQUN1QixLQUFLLENBQUMsSUFBSSxDQUN6QyxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQjs7b0JBTEssR0FBRyxlQUFILEdBQUc7b0JBQUUsSUFBSSxlQUFKLElBQUk7b0JBQUUsS0FBSyxlQUFMLEtBQUs7b0JBQUUsTUFBTSxlQUFOLE1BQU07O0FBTzlCLGtCQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFJLENBQUM7QUFDdEMsa0JBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQUksQ0FBQztBQUN4QyxrQkFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBSSxDQUFDO0FBQzFDLGtCQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFJLENBQUM7YUFDL0MsTUFBTTtvQ0FDaUIsS0FBSyxDQUFDLE1BQU0sQ0FDNUIsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDM0I7O29CQUxLLEdBQUcsaUJBQUgsR0FBRztvQkFBRSxJQUFJLGlCQUFKLElBQUk7O0FBT2Ysa0JBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQUksQ0FBQztBQUN0QyxrQkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBSSxDQUFDO2FBQzNDO1NBQ0o7Ozs7Ozs7Ozs7O29DQVFXO0FBQ1IsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2Qjs7Ozs7Ozs7Ozs7bUNBUVU7QUFDUCxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7NkJBWVcsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFO0FBQ3RELGdCQUFNLGVBQWUsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3ZDLGdCQUFNLGNBQWMsR0FBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ3ZDLGdCQUFNLFlBQVksR0FBTSxlQUFlLEdBQUcsY0FBYyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7O0FBRXhFLGdCQUFJLGlCQUFpQixHQUFHLGNBQWMsR0FBRyxhQUFhLENBQUM7QUFDdkQsZ0JBQUksZ0JBQWdCLEdBQUksYUFBYSxHQUFHLGNBQWMsQ0FBQztBQUN2RCxnQkFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLGdCQUFJLFNBQVMsR0FBSSxDQUFDLENBQUM7QUFDbkIsZ0JBQUksV0FBVyxZQUFBLENBQUM7QUFDaEIsZ0JBQUksWUFBWSxZQUFBLENBQUM7O0FBRWpCLGdCQUFJLFlBQVksRUFBRTtBQUNkLG9CQUFJLGVBQWUsR0FBRyxpQkFBaUIsRUFBRTtBQUNyQywrQkFBVyxHQUFHLGFBQWEsQ0FBQztBQUM1QixnQ0FBWSxHQUFHLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDN0MsNkJBQVMsR0FBRyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQ25ELE1BQU07QUFDSCxnQ0FBWSxHQUFHLGNBQWMsQ0FBQztBQUM5QiwrQkFBVyxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDOUMsOEJBQVUsR0FBRyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQ2xEO2FBQ0osTUFBTTtBQUNILG9CQUFJLGNBQWMsR0FBRyxnQkFBZ0IsRUFBRTtBQUNuQyxnQ0FBWSxHQUFHLGNBQWMsQ0FBQztBQUM5QiwrQkFBVyxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDOUMsOEJBQVUsR0FBRyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQ2xELE1BQU07QUFDSCwrQkFBVyxHQUFHLGFBQWEsQ0FBQztBQUM1QixnQ0FBWSxHQUFHLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDN0MsNkJBQVMsR0FBRyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUEsR0FBSSxDQUFDLENBQUM7aUJBQ25EO2FBQ0o7O0FBRUQsbUJBQU87QUFDSCxxQkFBSyxFQUFFLFdBQVc7QUFDbEIsc0JBQU0sRUFBRSxZQUFZO0FBQ3BCLG9CQUFJLEVBQUUsVUFBVTtBQUNoQixtQkFBRyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNMOzs7Ozs7Ozs7Ozs7Ozs7K0JBWWEsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFO0FBQ3hELG1CQUFPO0FBQ0gsb0JBQUksRUFBRSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUEsR0FBSSxDQUFDO0FBQ2pDLG1CQUFHLEVBQUUsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFBLEdBQUksQ0FBQzthQUNyQyxDQUFDO1NBQ0w7OztXQW5LZ0IsS0FBSzs7O2tCQUFMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1hMLE1BQU07QUFDdkIsYUFEaUIsTUFBTSxHQUNHO1lBQWQsS0FBSyx5REFBRyxJQUFJOzs4QkFEUCxNQUFNOztBQUVuQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4QixZQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFaEIsWUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdkMsWUFBSSxLQUFLLEVBQUU7QUFDUCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtLQUNKOzs7Ozs7Ozs7QUFBQTtpQkFYZ0IsTUFBTTs7a0NBb0JiO0FBQ04sZ0JBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixnQkFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQSxHQUFJLElBQUksQ0FBQztBQUN4QyxnQkFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O0FBRWpCLGdCQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzs7QUFFakIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7OztBQUFDLEFBR2hDLGdCQUFNLFNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDdEMsc0JBQU0sRUFBRTtBQUNKLHlCQUFLLEVBQUUsS0FBSztBQUNaLHlCQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDOztBQUVILG9CQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyxpQ0FBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7Ozs7Ozs7Ozs7Ozs7O2lDQVdRLEVBQUU7Ozs7Ozs7Ozs7Z0NBT0g7QUFDSixnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEIsaUNBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDOzs7V0E3RGdCLE1BQU07OztrQkFBTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0ROLGVBQWU7Ozs7O0FBSWhDLGFBSmlCLGVBQWUsQ0FJcEIsT0FBTyxFQUFFOzhCQUpKLGVBQWU7O0FBSzVCLFlBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFlBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFDLEFBQzVCLFlBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ25COztpQkFSZ0IsZUFBZTs7bUNBVXJCLE9BQU8sRUFBRTtBQUNoQixnQkFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDMUI7OztvQ0FFVztBQUNSLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7OztrQ0FFUyxDQUFDLEVBQUU7QUFDVCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7O29DQUVXLENBQUMsRUFBRTtBQUNYLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzs7Ozs7Ozs7K0JBS007QUFDSCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUNoRCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXhCLGdCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3ZCOzs7a0NBRVM7QUFDTixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdkIsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDOUIsb0JBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUI7O0FBRUQsZ0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7Ozs7Ozs7O3VDQUtjO0FBQ1gsZ0JBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLG9CQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2pCLENBQUM7YUFDTDtTQUNKOzs7a0NBRVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNaLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7K0JBRU0sR0FBRyxFQUFFO0FBQ1IsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7O0FBRXJCLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7Ozs4QkFFSyxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVyQixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7Ozs7OztzQ0FLYSxHQUFHLEVBQUU7QUFDZixnQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQzlCLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCOzs7b0NBRVcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkIsZ0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGdCQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7OzJDQUVrQixHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMxQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7bUNBRVU7QUFDUCxnQkFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7O2lDQUVRLE1BQU0sRUFBRTtBQUNiLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RixnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7aUNBRVE7QUFDTCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENB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O0FBQ2hCLE1BQUUsRUFBRSxRQUFRO0FBQ1osTUFBRSxFQUFFLFFBQVE7QUFDWixNQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO0FBQ1gsTUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQztBQUNYLE1BQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7QUFDWCxNQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO0FBQ1gsTUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQztBQUNYLE1BQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7QUFDWCxNQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO0FBQ1gsTUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQztBQUNYLE1BQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7QUFDWCxNQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO0FBQ1gsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsTUFBRSxFQUFFLEdBQUc7QUFDUCxNQUFFLEVBQUUsR0FBRztBQUNQLE1BQUUsRUFBRSxpQkFBaUI7QUFDckIsTUFBRSxFQUFFLGtCQUFrQjtBQUN0QixNQUFFLEVBQUUsWUFBWTtBQUNoQixNQUFFLEVBQUUsV0FBVztBQUNmLE1BQUUsRUFBRSxXQUFXO0FBQ2YsTUFBRSxFQUFFLFdBQVc7QUFDZixNQUFFLEVBQUUsV0FBVztBQUNmLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxXQUFXO0FBQ2hCLE9BQUcsRUFBRSxrQkFBa0I7QUFDdkIsT0FBRyxFQUFFLGNBQWM7QUFDbkIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsT0FBRyxFQUFFLHNCQUFzQjtBQUMzQixPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsS0FBSztBQUNWLE9BQUcsRUFBRSxLQUFLO0FBQ1YsT0FBRyxFQUFFLEtBQUs7QUFDVixPQUFHLEVBQUUsVUFBVTtBQUNmLE9BQUcsRUFBRSxhQUFhO0FBQ2xCLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQztBQUNmLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO0NBQ2xCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBEcmF3IGZyb20gJy4vc3JjL0RyYXcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBNb2JpbGUgZnJvbSAnLi9zcmMvTW9iaWxlJztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vc3JjL1JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbk1vYmlsZS5hZGRNZXRhVGFncygpO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGRyYXcgPSBuZXcgRHJhdyhzdGFnZS5nZXRDYW52YXMoKSwgY2FtZXJhKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xubGV0IHJlY3QgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yKSB7XG4gICAgZHJhdy5jbGVhcignI0RERCcpO1xuICAgIGNvbnNvbGUubG9nKGZhY3Rvcik7XG5cbiAgICBsZXQgc3BlZWQgPSA4MDAgKiBmYWN0b3I7XG4gICAgcmVjdC5zZXRYKHJlY3QuZ2V0WCgpICsgc3BlZWQpO1xuXG4gICAgZHJhdy5yZW5kZXIocmVjdCk7XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBEZWNpZGVzIHdoYXQgZ2V0cyByZW5kZXJlZFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FudmFzVHJhbnNmb3JtIGZyb20gJy4vbGliL0NhbnZhc1RyYW5zZm9ybSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIERyYXdcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC4gTWVyZ2VzIGNvbnRleHRcbiAqICAgICAgICAgICAgICBvYmplY3Qgd2l0aCBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICogQHJlcXVpcmVzICAgIENhbnZhc1RyYW5zZm9ybVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhcyBUaGUgYWN0aXZlIGNhbnZhcyBlbGVtZW50XG4gKiBAcGFyYW0ge0NhbWVyYX0gICAgICBjYW1lcmEgVGhlIGNhbWVyYVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxDb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhc1hmb3JtID0gbmV3IENhbnZhc1RyYW5zZm9ybSh0aGlzLl9vcmlnaW5hbENvbnRleHQpO1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9vcmlnaW5hbENvbnRleHQ7XG5cbiAgICAgICAgZm9yIChsZXQgbWV0aG9kIGluIHRoaXMuX2NhbnZhc1hmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0W21ldGhvZF0gPSB0aGlzLl9jYW52YXNYZm9ybVttZXRob2RdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMgYW5kIG9wdGlvbmFsbHkgZmlsbHMgd2l0aCBhIGNvbG9yXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjY2xlYXJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjb2xvcl0gSWYgcGFzc2VkLCB3aWxsIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIGNsZWFyKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIDJEIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2Zmc2V0cyBjYW52YXMgYmFzZWQgb24gY2FtZXJhIGFuZCBjYWxscyBhbiBlbnRpdHkncyByZW5kZXIgbWV0aG9kIHBhc3NpbmcgdGhlIGNvbnRleHQuXG4gICAgICogU2F2ZXMgYW5kIHJlc3RvcmVzIGNvbnRleHQgYW5kIGJlZ2lubmluZyBhbmQgZW5kIG9mIG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX2NhbWVyYS5nZXRYKCksIC10aGlzLl9jYW1lcmEuZ2V0WSgpKTtcblxuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQga2V5Y29kZXMgZnJvbSAnLi9saWIva2V5Y29kZXMnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBJbnB1dFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlIGNhbnZhc1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVudGl0eX0gY2FudmFzICAgICAgICAgICAgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzXVxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5jYW52YXNGaXRdICAgICAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JNb3VzZV0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yVG91Y2hdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvcktleWJvYXJkXSBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIGtleWJvYXJkIGV2ZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdHMuY2FudmFzRml0IHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvck1vdXNlID0gb3B0cy5saXN0ZW5Gb3JNb3VzZSB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JUb3VjaCA9IG9wdHMubGlzdGVuRm9yVG91Y2ggfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvcktleWJvYXJkID0gb3B0cy5saXN0ZW5Gb3JLZXlib2FyZCB8fCB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3VpRXZlbnRzID0ge1xuICAgICAgICAgICAgREJMX0NMSUNLOiAnZGJsY2xpY2snLFxuICAgICAgICAgICAgREJMX1RBUDogJ2RibHRhcCcsXG5cbiAgICAgICAgICAgIERSQUc6ICdkcmFnJyxcbiAgICAgICAgICAgIERSQUdfRU5EOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICBEUkFHX1NUQVJUOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICAgICAgICBUQVA6ICd0YXAnLFxuXG4gICAgICAgICAgICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgICAgICAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgVE9VQ0hfRU5EOiAndG91Y2hlbmQnLFxuXG4gICAgICAgICAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuXG4gICAgICAgICAgICBLRVlfVVA6ICdrZXl1cCcsXG4gICAgICAgICAgICBLRVlfRE9XTjogJ2tleWRvd24nXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGlzdGVuZXJzIHZhbHVlcyBhcmUgYXJyYXlzIG9mIG9iamVjdHMgY29udGFpbmluZyBoYW5kbGVycyBhbmQgKG9wdGlvbmFsKSB0YXJnZXRzXG4gICAgICAgIC8vIGVnOiB0aGlzLl9saXN0ZW5lcnMua2V5dXAgPSBbe1xuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsuLi59LFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogeyBuYW1lOiAnZm9vJywgeDogMzIsIHk6IDY0LCAuLi59XG4gICAgICAgIC8vICAgICB9XTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3VpRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdGhpcy5fdWlFdmVudHNba2V5XV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleWNvZGVzID0ga2V5Y29kZXM7XG4gICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IHt9O1xuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uVGljayA9IHRoaXMuX29uVGljay5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgdGhpcy5fb25UaWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZEtleWJvYXJkTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2tleXVwJywgJ2tleWRvd24nXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG1vdXNlIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkTW91c2VMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdWNoIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkVG91Y2hMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsndGFwJywgJ2RibHRhcCcsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSByYXRpbyBvZiB0aGUgY2FudmFzIGJhc2VkIG9uIHdpdGgvaGVnaHQgYXR0cnMgYW5kIGNzcyB3aWR0aC9oZWlnaHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2dldFNjYWxlRmFjdG9yXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgX2dldFNjYWxlRmFjdG9yKCkge1xuICAgICAgICBsZXQgZmFjdG9yID0gMTtcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gcGFyc2VJbnQodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgICAgICBmYWN0b3IgPSBjYW52YXNXaWR0aCAvIHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxMDAgLyBmYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBvaW50IGlzIGluc2lkZSByZWN0YW5nbGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hpdFRlc3RcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvdW5kaW5nQm94IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlDb2RlOiBpbnB1dEV2ZW50LmtleUNvZGUsXG4gICAgICAgICAgICBrZXlOYW1lOiB0eXBlb2Yga2V5TmFtZSA9PT0gJ29iamVjdCcgJiYga2V5TmFtZS5sZW5ndGggP1xuICAgICAgICAgICAgICAgIGtleU5hbWVbMF0gOlxuICAgICAgICAgICAgICAgIGtleU5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX0RPV046XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV0gPSBpbnB1dEV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9VUDpcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5rZXlzRG93biA9IHRoaXMuZ2V0S2V5c0Rvd24oKTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICogQ3JlYXRlcyBldmVudCBvYmplY3RzIHdpdGggeC95IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNjYWxpbmcgYW5kIGFic1gvYWJzWSBmb3JcbiAgICAgKiBhYnNvbHV0ZSB4L3kgcmVnYXJkbGVzcyBvZiBzY2FsZSBvZmZzZXRcbiAgICAgKiBPbmx5IHVzZXMgZmlyc3QgdG91Y2ggZXZlbnQsIHRodXMgbm90IGN1cnJlbnRseSBzdXBwb3J0aW5nIG11bHRpLXRvdWNoXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IFRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX2hhbmRsZU1vdXNlQW5kVG91Y2goaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gdGhpcy5fY2FudmFzRml0ID8gdGhpcy5fZ2V0U2NhbGVGYWN0b3IoKSA6IDE7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgIGlmIChpbnB1dEV2ZW50Lmhhc093blByb3BlcnR5KCd0b3VjaGVzJykpIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvb3JkaW5hdGUgcG9zaXRpb25zIHJlbGF0aXZlIHRvIGNhbnZhcyBzY2FsaW5nXG4gICAgICAgIGV2ZW50LnggPSBNYXRoLnJvdW5kKGV2ZW50LmFic1ggKiBzY2FsZUZhY3Rvcik7XG4gICAgICAgIGV2ZW50LnkgPSBNYXRoLnJvdW5kKGV2ZW50LmFic1kgKiBzY2FsZUZhY3Rvcik7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX0RPV046XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX1NUQVJUOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9VUDpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfRU5EOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX0VORFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfTU9WRTpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfTU9WRTpcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19TVEFSVFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBkdXBsaWNhdGUgaGFuZGxlciBpbiB0aGUgbGlzdGVuZXIgdHlvZSBiZWluZyBhZGRlZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaXNEdXBsaWNhdGVIYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXIgIFRoZSBoYW5kbGVyIHRvIGNoZWNrXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgIGhhbmRsZXJzIFRoZSBoYW5kbGVycyBvZiB0aGUgbGlzdGVuZXIgdHlwZSBiZWluZyBhZGRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgIGxldCBkdXAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gaGFuZGxlck9iamVjdC5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYWxsIHF1ZXVlZCBldmVudHMuIFBhc3NlcyB0aGUgZmFjdG9yIGFuZCB0aWNrcyBmcm9tIHtAbGluayBUaWNrZXJ9XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19vblRpY2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGUgVGhlIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9vblRpY2soZSkge1xuICAgICAgICBmb3IgKGxldCBldmVudCBvZiB0aGlzLl9xdWV1ZWRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJIYW5kbGVycyhldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleGVjdXRlcyBoYW5kbGVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQncyB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I190cmlnZ2VySGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmlnZ2VySGFuZGxlcnMoZXZlbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0pIHtcblxuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdFRlc3QgPSB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCB8fCB0aGlzLl9oaXRUZXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdFRlc3QoZXZlbnQueCwgZXZlbnQueSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC50YXJnZXQuZ2V0Qm91bmRpbmdBcmVhKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gaGFuZGxlck9iamVjdC50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgd2FzIGJvdW5kIHdpdGggYSB0YXJnZXQgdHJpZ2dlciBoYW5kbGVyIE9OTFkgaWYgdGFyZ2V0IGhpdFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBoYW5kbGVyIGZvciBhIGNlcnRhaW4gZXZlbnQgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNhZGRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgICBUaGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSAge29iamVjdH0gICBbdGFyZ2V0XSBUaGUgdGFyZ2V0IHRvIGNoZWNrIGV2ZW50IHRyaWdnZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICBSZXR1cm5zIHRydWUgaWYgYWRkZWQgYW5kIGZhbHNlIGlmIGNhbGxiYWNrIGFscmVhZHkgZXhpc3RzXG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBoYW5kbGVyT2JqZWN0cyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IGR1cDtcblxuXG4gICAgICAgIGlmICghIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJPYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgZHVwID0gdGhpcy5faXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZHVwKSB7XG4gICAgICAgICAgICBoYW5kbGVyT2JqZWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLCB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBtYXRjaGluZyBoYW5kbGVyIGlmIGZvdW5kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3JlbW92ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgdGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciB0aGUgaGFuZGxlciB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgcmVtb3ZlZCBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCBhbmQgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCEgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyT2JqZWN0ID0gaGFuZGxlcnNbaV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIGtleXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWRcbiAgICAgKiBlZzogPGNvZGU+eyBMRUZUX0FSUk9XOiAzNywgVVBfQVJST1c6IDM4IH08L2NvZGU+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2dldEtleXNEb3duXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEtleXNEb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c0Rvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVzZXIgdG8gc2V0IGEgY3VzdG9tIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNzZXRIaXRUZXN0TWV0aG9kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHVzZXIncyBoaXQgdGVzdCBtZXRob2RcbiAgICAgKi9cbiAgICBzZXRIaXRUZXN0TWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0I3NldEhpdFRlc3RNZXRob2QgcGFyYW1ldGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBmbjtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBNb2JpbGVcbiAqIEBkZXNjcmlwdGlvbiBBIGNsYXNzIHdpdGggaGVscGVycyBmb3IgbWFraW5nIHRoZSBhcHBsaWNhdGlvbiBwbGF5IG5pY2Ugd2l0aCBtb2JpbGUgYnJvd3NlcnNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9iaWxlIHtcbiAgICAvKipcbiAgICAgKiBbYWRkTWV0YVRhZ3MgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBNb2JpbGUuYWRkTWV0YVRhZ3NcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRvYyBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgc3RhdGljIGFkZE1ldGFUYWdzKGRvYyA9IGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBoZWFkID0gZG9jLmhlYWQ7XG4gICAgICAgIHZhciBtZXRhID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgbWV0YS5uYW1lID0gJ3ZpZXdwb3J0JztcbiAgICAgICAgbWV0YS5jb250ZW50ID0gJ3dpZHRoPWRldmljZS13aWR0aCwgdXNlci1zY2FsYWJsZT1ubywgJyArXG4gICAgICAgICAgICAnaW5pdGlhbC1zY2FsZT0xLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9MCc7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG5cbiAgICAgICAgbWV0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGEubmFtZSA9ICdhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlJztcbiAgICAgICAgbWV0YS5jb250ZW50ID0gJ3llcyc7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG5cbiAgICAgICAgbWV0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGEubmFtZSA9ICdtb2JpbGUtd2ViLWFwcC1jYXBhYmxlJztcbiAgICAgICAgbWV0YS5jb250ZW50ID0gJ3llcyc7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgUmVjdGFuZ2xlXG4gKiBAZXh0ZW5kcyB7QGxpbmsgU3ByaXRlfVxuICogQGRlc2MgICAgQSBzcHJpdGUgdGhhdCByZW5kZXJzIGFzIGEgcmVjdGFuZ2xlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QodGhpcy5feCwgdGhpcy5feSwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fc3JjWCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1kgPSAwO1xuICAgICAgICB0aGlzLl9zcmNXaWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5feCArIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5feSArIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Q29tcG9zaXRlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRIZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1hcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1lcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFdpZHRoXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBjb21wb3NpdGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRIZWlnaHRcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGhlaWdodCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRIZWlnaHQodmFsKSB7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgcm90YXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Um90YXRpb24odmFsKSB7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1hcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1ggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1lcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1kgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB3aWR0aCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRXaWR0aCh2YWwpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbi8qKlxuICogQG1lbWJlciBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHRcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdCA9ICdzb3VyY2Utb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFN0YWdlXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIGVsZW1lbnQuIGluY2x1ZGVkIGluIHRoZSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHVzZWQgZm9yIHRlc3RpbmcgYWdhaW5zdFxuICogICAgICAgICAgICAgIGEgdmlydHVhbCBkb20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW3dpZHRoXSAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbaGVpZ2h0XSAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0c10gICAgICAgICAgU3RhZ2Ugb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdHMucGFyZW50RWxdIFRoZSBlbGVtZW50IHdpdGggd2hpY2ggdG8gYXR0YWNoIHRoZSBjYW52YXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm9uZSBnaXZlbiB0aGUgYm9keSBpcyB1c2VkLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMuYmdDb2xvcl0gIFRoZSBwYXJlbnQgZWxlbWVudCdzIGJnIGNvbG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy5kb2N1bWVudF0gRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLndpbmRvd10gICBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtCb29sZWFufSAgICAgW29wdHMuZmlsbF0gICAgIFNldCB0byBmYWxzZSB0byBub3QgbWF4aW1hbGx5IGZpbGwgdmlld3BvcnQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyB0cnVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Iod2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSBvcHRzLmZpbGwgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLmZpbGw7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gb3B0cy5wYXJlbnRFbCB8fCB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRzLmJnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhZ2VFbGVtZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlU3RhZ2VFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5fc3RhZ2UgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fcGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fc3RhZ2UpO1xuXG4gICAgICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdGhpcy5fdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl92aWRlbyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIF9yZXNpemVFbGVtZW50IGZvciBzdGFnZSBlbGVtZW50c1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfaGFuZGxlUmVzaXplXG4gICAgICovXG4gICAgX2hhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX3ZpZGVvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIGhvdyB0byBoYW5kbGUgcmVzaXplIGJhc2VkIG9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX3Jlc2l6ZUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gIHtIVE1MRW50aXR5fSBlbCBUaGUgZWxlbWVudCB0byByZXNpemVcbiAgICAgKi9cbiAgICBfcmVzaXplRWxlbWVudChlbCkge1xuICAgICAgICBpZiAodGhpcy5fZmlsbCkge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSBTdGFnZS5maWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGgpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0KX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IFN0YWdlLmNlbnRlcihcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0Q2FudmFzXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpZGVvIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0VmlkZW9cbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRWaWRlbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1heGltaXplcyBhbiBlbGVtZW50ICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydCB2aWEgQ1NTLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5maWxsXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpbGwod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgIGNvbnN0IFBPUlRSQUlUX1JBVElPICA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBJU19MQU5EU0NBUEUgICAgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB2aWV3cG9ydEhlaWdodCAvIHZpZXdwb3J0V2lkdGg7XG4gICAgICAgIGxldCB3aW5Qb3J0cmFpdFJhdGlvICA9IHZpZXdwb3J0V2lkdGggLyB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyBzdGFnZSBlbGVtZW50IGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5jZW50ZXJcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSB0b3AgYW5kIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgY2VudGVyKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAodmlld3BvcnRXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICAgICAgICB0b3A6ICh2aWV3cG9ydEhlaWdodCAtIGhlaWdodCkgLyAyXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgVGlja2VyXG4gKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgY2FsbGJhY2sgYmFzZWQgb24gZ2l2ZW4gZnBzIGFuZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzdGFydF0gV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24ge0BsaW5rIFRpY2tlciNfZnBzfS5cbiAgICAgKiBJZiB0aGUgY29ycmVjdCBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIHRoZSB7QGxpbmsgVGlja2VyI29uVGlja30gY2FsbGJhY2sgd2lsbCBmaXJlIGFuZFxuICAgICAqIHRoZSA8Y29kZT50aWNrPC9jb2RlPiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSA8Y29kZT5kb2N1bWVudDwvY29kZT4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKG5vdyAtIHRoaXMuX3RoZW4pIC8gMTAwMDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICB0aGlzLl90aWNrcyArPSAxO1xuXG4gICAgICAgIHRoaXMub25UaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuZCBmaXJlIHRpY2sgZXZlbnRzXG4gICAgICAgIGNvbnN0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndGljaycsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICB0aWNrczogdGhpcy5fdGlja3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FudmFzVHJhbnNmb3JtXG4gKiBAZGVzY3JpcHRpb24gUmV0YWlucyBjYW52YXMgdHJhbnNmb3JtYXRpb24gc3RhY2suXG4gKiAgICAgICAgICAgICAgQmFzaWNhbGx5IGEgZm9yayBmcm9tIFNpbW9uIFNhcnJpcyAtIHd3dy5zaW1vbnNhcnJpcy5jb20gLSBzYXJyaXNAYWNtLm9yZ1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgY2FudmFzJyBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbMSwwLDAsMSwwLDBdOyAvL2luaXRpYWxpemUgd2l0aCB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXRNYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdHJpeDtcbiAgICB9XG5cbiAgICBzZXRNYXRyaXgobSkge1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgY2xvbmVNYXRyaXgobSkge1xuICAgICAgICByZXR1cm4gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YWNrXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5jbG9uZU1hdHJpeCh0aGlzLmdldE1hdHJpeCgpKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG1hdHJpeCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICB9XG5cbiAgICByZXN0b3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF0cml4KG1hdHJpeCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzZXRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMl0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbM10sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSArPSB0aGlzLm1hdHJpeFswXSAqIHggKyB0aGlzLm1hdHJpeFsyXSAqIHk7XG4gICAgICAgIHRoaXMubWF0cml4WzVdICs9IHRoaXMubWF0cml4WzFdICogeCArIHRoaXMubWF0cml4WzNdICogeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZShyYWQpIHtcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIGMgKyB0aGlzLm1hdHJpeFsyXSAqIHM7XG4gICAgICAgIGxldCBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIGMgKyB0aGlzLm1hdHJpeFszXSAqIHM7XG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIC1zICsgdGhpcy5tYXRyaXhbMl0gKiBjO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiAtcyArIHRoaXMubWF0cml4WzNdICogYztcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzY2FsZShzeCwgc3kpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzFdICo9IHN4O1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSAqPSBzeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gKj0gc3k7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeCBleHRlbnNpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICByb3RhdGVEZWdyZWVzKGRlZykge1xuICAgICAgICBsZXQgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICB9XG5cbiAgICByb3RhdGVBYm91dChyYWQsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMucm90YXRlKHJhZCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlRGVncmVlc0Fib3V0KGRlZywgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGVEZWdyZWVzKGRlZyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIHRoaXMubSA9IFsxLDAsMCwxLDAsMF07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkobWF0cml4KSB7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzFdO1xuXG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgbGV0IG0yMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzNdO1xuXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNF07XG4gICAgICAgIGxldCBkeSA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNV07XG5cbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gZHg7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gZHk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICBsZXQgZCA9IDEgLyAodGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFszXSAtIHRoaXMubWF0cml4WzFdICogdGhpcy5tYXRyaXhbMl0pO1xuICAgICAgICBsZXQgbTAgPSB0aGlzLm1hdHJpeFszXSAqIGQ7XG4gICAgICAgIGxldCBtMSA9IC10aGlzLm1hdHJpeFsxXSAqIGQ7XG4gICAgICAgIGxldCBtMiA9IC10aGlzLm1hdHJpeFsyXSAqIGQ7XG4gICAgICAgIGxldCBtMyA9IHRoaXMubWF0cml4WzBdICogZDtcbiAgICAgICAgbGV0IG00ID0gZCAqICh0aGlzLm1hdHJpeFsyXSAqIHRoaXMubWF0cml4WzVdIC0gdGhpcy5tYXRyaXhbM10gKiB0aGlzLm1hdHJpeFs0XSk7XG4gICAgICAgIGxldCBtNSA9IGQgKiAodGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFs0XSAtIHRoaXMubWF0cml4WzBdICogdGhpcy5tYXRyaXhbNV0pO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0wO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0zO1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSA9IG00O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSA9IG01O1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSGVscGVyc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdHJhbnNmb3JtUG9pbnQoeCwgeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCAqIHRoaXMubWF0cml4WzBdICsgeSAqIHRoaXMubWF0cml4WzJdICsgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICB5OiB4ICogdGhpcy5tYXRyaXhbMV0gKyB5ICogdGhpcy5tYXRyaXhbM10gKyB0aGlzLm1hdHJpeFs1XVxuICAgICAgICB9O1xuICAgIH1cbn0iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICA4OiAnQkFDS1NQQUNFJyxcbiAgICA5OiAnVEFCJyxcbiAgICAxMzogJ0VOVEVSJyxcbiAgICAxNjogJ1NISUZUJyxcbiAgICAxNzogJ0NUUkwnLFxuICAgIDE4OiAnQUxUJyxcbiAgICAxOTogJ1BBVVNFX0JSRUFLJyxcbiAgICAyMDogJ0NBUFNfTE9DSycsXG4gICAgMjc6ICdFU0NBUEUnLFxuICAgIDMzOiAnUEFHRV9VUCcsXG4gICAgMzQ6ICdQQUdFX0RPV04nLFxuICAgIDM1OiAnRU5EJyxcbiAgICAzNjogJ0hPTUUnLFxuICAgIDM3OiAnTEVGVF9BUlJPVycsXG4gICAgMzg6ICdVUF9BUlJPVycsXG4gICAgMzk6ICdSSUdIVF9BUlJPVycsXG4gICAgNDA6ICdET1dOX0FSUk9XJyxcbiAgICA0NTogJ0lOU0VSVCcsXG4gICAgNDY6ICdERUxFVEUnLFxuICAgIDQ4OiBbMCwnKSddLFxuICAgIDQ5OiBbMSwnISddLFxuICAgIDUwOiBbMiwnQCddLFxuICAgIDUxOiBbMywnIyddLFxuICAgIDUyOiBbNCwnJCddLFxuICAgIDUzOiBbNSwnJSddLFxuICAgIDU0OiBbNiwnXiddLFxuICAgIDU1OiBbNywnJiddLFxuICAgIDU2OiBbOCwnKiddLFxuICAgIDU3OiBbOSwnKCddLFxuICAgIDY1OiAnQScsXG4gICAgNjY6ICdCJyxcbiAgICA2NzogJ0MnLFxuICAgIDY4OiAnRCcsXG4gICAgNjk6ICdFJyxcbiAgICA3MDogJ0YnLFxuICAgIDcxOiAnRycsXG4gICAgNzI6ICdIJyxcbiAgICA3MzogJ0knLFxuICAgIDc0OiAnSicsXG4gICAgNzU6ICdLJyxcbiAgICA3NjogJ0wnLFxuICAgIDc3OiAnTScsXG4gICAgNzg6ICdOJyxcbiAgICA3OTogJ08nLFxuICAgIDgwOiAnUCcsXG4gICAgODE6ICdRJyxcbiAgICA4MjogJ1InLFxuICAgIDgzOiAnUycsXG4gICAgODQ6ICdUJyxcbiAgICA4NTogJ1UnLFxuICAgIDg2OiAnVicsXG4gICAgODc6ICdXJyxcbiAgICA4ODogJ1gnLFxuICAgIDg5OiAnWScsXG4gICAgOTA6ICdaJyxcbiAgICA5MTogJ0xFRlRfV0lORE9XX0tFWScsXG4gICAgOTI6ICdSSUdIVF9XSU5ET1dfS0VZJyxcbiAgICA5MzogJ1NFTEVDVF9LRVknLFxuICAgIDk2OiAnTlVNX1BBRF8wJyxcbiAgICA5NzogJ05VTV9QQURfMScsXG4gICAgOTg6ICdOVU1fUEFEXzInLFxuICAgIDk5OiAnTlVNX1BBRF8zJyxcbiAgICAxMDA6ICdOVU1fUEFEXzQnLFxuICAgIDEwMTogJ05VTV9QQURfNScsXG4gICAgMTAyOiAnTlVNX1BBRF82JyxcbiAgICAxMDM6ICdOVU1fUEFEXzcnLFxuICAgIDEwNDogJ05VTV9QQURfOCcsXG4gICAgMTA1OiAnTlVNX1BBRF85JyxcbiAgICAxMDY6ICdOVU1fUEFEX0FTVEVSSVNLJyxcbiAgICAxMDc6ICdOVU1fUEFEX1BMVVMnLFxuICAgIDEwOTogJ05VTV9QQURfTUlOVVMnLFxuICAgIDExMTogJ05VTV9QQURfRk9XQVJEX1NMQVNIJyxcbiAgICAxMTI6ICdGMScsXG4gICAgMTEzOiAnRjInLFxuICAgIDExNDogJ0YzJyxcbiAgICAxMTU6ICdGNCcsXG4gICAgMTE2OiAnRjUnLFxuICAgIDExNzogJ0Y2JyxcbiAgICAxMTg6ICdGNycsXG4gICAgMTE5OiAnRjgnLFxuICAgIDEyMDogJ0Y5JyxcbiAgICAxMjE6ICdGMTAnLFxuICAgIDEyMjogJ0YxMScsXG4gICAgMTIzOiAnRjEyJyxcbiAgICAxNDQ6ICdOVU1fTE9DSycsXG4gICAgMTQ1OiAnU0NST0xMX0xPQ0snLFxuICAgIDE4NjogWyc7JywnOiddLFxuICAgIDE4NzogWyc9JywnKyddLFxuICAgIDE4ODogWycsJywnPCddLFxuICAgIDE4OTogWyctJywnXyddLFxuICAgIDE5MDogWycuJywnPiddLFxuICAgIDE5MTogWycvJywnPyddLFxuICAgIDE5MjogWydgJywnfiddLFxuICAgIDIxOTogWydbJywneyddLFxuICAgIDIyMDogWydcXFxcJywnfCddLFxuICAgIDIyMTogWyddJywnfSddLFxuICAgIDIyMjogWydcXCcnLCdcIiddXG59O1xuIl19
