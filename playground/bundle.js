(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Canvas = require('./src/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Draw = require('./src/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _Input = require('./src/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Ticker = require('./src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(e) {
    console.log(e);
}

var canvas = new _Canvas2.default(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222'
});
var draw = new _Draw2.default(canvas.getEl());
var input = new _Input2.default(canvas.getEl());
var ticker = new _Ticker2.default();

ticker.onTick = function (delta, ticks) {
    console.log(delta, ticks);
};

input.addListener('click', function () {
    if (ticker.isPaused()) {
        ticker.resume();
    } else {
        ticker.pause();
    }
});

},{"./src/Canvas":2,"./src/Draw":4,"./src/Input":5,"./src/Ticker":6}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Cinemize = require('./Cinemize');

var _Cinemize2 = _interopRequireDefault(_Cinemize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Canvas
 * @description Creates and handles the canvas element. included in the options
 *              parameter is optional dependency injection used for testing against
 *              a virtual dom.
 * @requires    Cinemize
 * @author      Chris Peters
 *
 * @param {Integer}     width                  The width of the canvas
 * @param {Integer}     height                 The height of the canvas
 * @param {Object}      [opts]                 Canvas options
 * @param {HTMLElement} [opts.parentEl]        The element with which to attach the canvas.
 *                                             If none given the body is used.
 * @param {String}      [opts.canvasBgColor]   The canvas element's bg color
 * @param {String}      [opts.parentElBgColor] The parent element's bg color
 * @param {Object}      [opts.document]        For testing
 * @param {Object}      [opts.window]          For testing
 */

var Canvas = (function () {
    function Canvas() {
        var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
        var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Canvas);

        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;

        this._parentEl = opts.parentEl || this._document.body;

        this._canvas = this._document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = opts.canvasBgColor;

        this._parentEl.style.backgroundColor = opts.parentElBgColor;
        this._parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * Adjust canvas Cinemize to fit canvas to resized window
     *
     * @method Canvas#_handleResize
     * @private
     */

    _createClass(Canvas, [{
        key: '_handleResize',
        value: function _handleResize() {
            var _Cinemize$fit = _Cinemize2.default.fit(this._width, this._height, this._window);

            var top = _Cinemize$fit.top;
            var left = _Cinemize$fit.left;
            var width = _Cinemize$fit.width;
            var height = _Cinemize$fit.height;

            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';

            this.onResize();
        }

        /**
         * []
         *
         * @method Canvas#getEl
         * @return {HTMLElement} canvas
         */

    }, {
        key: 'getEl',
        value: function getEl() {
            return this._canvas;
        }

        /**
         * The window resize callback
         *
         * @method Canvas#onResize
         */

    }, {
        key: 'onResize',
        value: function onResize() {}
    }]);

    return Canvas;
})();

exports.default = Canvas;

},{"./Cinemize":3}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Cinemize
 * @description Helpers for keeping the canvas nicely positioned in the viewport
 * @author      Chris Peters
 */

var Cinemize = (function () {
    function Cinemize() {
        _classCallCheck(this, Cinemize);
    }

    _createClass(Cinemize, null, [{
        key: "fit",

        /**
         * Keeps canvas element centered and (with aspect ratio intact) in the viewport
         *
         * @param  {Integer} width         The element's original width attribute
         * @param  {Integer} height        The element's original height attribute
         * @param  {OBject}  [opts]        Optional parameters
         * @param  {Object}  [opts.window] The DOM window object for testing
         * @return {Object}                The new top, left, width, & height
         */
        value: function fit(width, height) {
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            this._window = opts.window || window;

            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

            var winWidth = this._window.innerWidth;
            var winHeight = this._window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }
    }]);

    return Cinemize;
})();

exports.default = Cinemize;

},{}],4:[function(require,module,exports){
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
 */

var Draw = (function () {
    function Draw(canvas) {
        _classCallCheck(this, Draw);

        this._originalContext = canvas.getContext('2d');
        this._canvasXform = new _CanvasTransform2.default(this._originalContext);

        this._context = this._originalContext;

        for (var method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
    }

    /**
     * []
     *
     * @method Draw#getContext
     * @return {Object} The context object
     */

    _createClass(Draw, [{
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }

        /**
         * [render description]
         *
         * @method Draw#render
         * @param  {Object} entity [description]
         */

    }, {
        key: 'render',
        value: function render(entity) {
            entity.render(this._context);
        }
    }]);

    return Draw;
})();

exports.default = Draw;

},{"./lib/CanvasTransform":7}],5:[function(require,module,exports){
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
 * @param {Object}     [options]
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
        this._userGetBoundingBoxMethodName = null;

        if (this._listenForKeyboard) {
            this._addKeyboardListeners();
        }

        if (this._listenForMouse) {
            this._addMouseListeners();
        }

        if (this._listenForTouch) {
            this._addTouchListeners();
        }
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
    }, {
        key: '_hitTest',
        value: function _hitTest(x, y, boundingBox) {
            return x >= boundingBox.minX && x <= boundingBox.maxX && y >= boundingBox.minY && y <= boundingBox.maxY;
        }
    }, {
        key: '_extendEvent',
        value: function _extendEvent(event, options) {
            return Object.assign({}, event, options);
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
                keysDown: this.getKeysDown(),
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

            this._triggerHandlers(event);
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
            var events = [];

            events.push(event);

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

                        events.push(this._extendEvent(event, {
                            type: this._uiEvents.DRAG_END
                        }));
                    }

                    break;

                case this._uiEvents.MOUSE_MOVE:
                case this._uiEvents.TOUCH_MOVE:

                    if (this._canDrag) {
                        if (!this._isDragging) {
                            this._isDragging = true;

                            events.push(this._extendEvent(event, {
                                type: this._uiEvents.DRAG_START
                            }));
                        }

                        events.push(this._extendEvent(event, {
                            type: this._uiEvents.DRAG
                        }));
                    }

                    break;
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = events[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _event = _step4.value;

                    this._triggerHandlers(_event);
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

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = handlerObjects[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var handlerObject = _step5.value;

                    if (handler === handlerObject.handler) {
                        dup = true;
                        break;
                    }
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

            return dup;
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
                        var getBoundingBoxMethodName = this._userGetBoundingBoxMethodName || 'getBoundingBox';

                        if (hitTest(event.x, event.y, handlerObject.target[getBoundingBoxMethodName]())) {

                            event.target = handlerObject.target;
                        }
                    }

                    handlerObject.handler(event);
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
         * eg: { LEFT_ARROW: 37, UP_ARROW: 38 }
         *
         * @method Input#getKeysDown
         * @return {object}
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

        /**
         * ALlows user to set their target's get bounding box name.
         * This method must return  minX maxX minY & maxY
         *
         * @method Input#setBoundingBoxMethodName
         * @param {string} name The get bounding box method name
         */

    }, {
        key: 'setBoundingBoxMethodName',
        value: function setBoundingBoxMethodName(name) {
            this._userGetBoundingBoxMethodName = name;
        }
    }]);

    return Input;
})();

exports.default = Input;

},{"./lib/keycodes":8}],6:[function(require,module,exports){
"use strict";

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
 * @param {Number}  [fps]   The desired frames per second. Default is 30
 * @param {Boolean} [start] Whether to start on instantiate. Default is true
 */

var Ticker = (function () {
    function Ticker() {
        var fps = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];
        var start = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, Ticker);

        this._fps = fps;
        this._paused = false;
        this._then = Date.now();
        this._ticks = 0;
        this._interval = 1000 / this._fps;

        this._update = this._update.bind(this);

        if (start) {
            this.start();
        }
    }

    /**
     * Calculates whether or not to call {@link Ticker#onTick} based on _fps
     *
     * @method Ticker#_update
     */

    _createClass(Ticker, [{
        key: "_update",
        value: function _update() {
            var now = Date.now();
            var delta = now - this._then;

            if (delta > this._interval) {
                // trim @then if it's more than @interval
                this._then = now - delta % this._interval;
                this._ticks += 1;

                this.onTick(delta / this._interval, this._ticks);
            }

            requestAnimationFrame(this._update);
        }

        /**
         * A callback executed on each tick.
         *
         * @method Ticker#onTick
         * @param {Integer} factor The time elapsed between ticks.
         *                         Multiply against gameplay elements for consistent
         *                         movement.
         * @param {Integer} ticks The amount of ticks that have accumulated
         */

    }, {
        key: "onTick",
        value: function onTick() {}

        /**
         * Starts the ticker
         *
         * @method Ticker#start
         */

    }, {
        key: "start",
        value: function start() {
            requestAnimationFrame(this._update);
        }
    }]);

    return Ticker;
})();

exports.default = Ticker;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbnZhcy5qcyIsInNyYy9DaW5lbWl6ZS5qcyIsInNyYy9EcmF3LmpzIiwic3JjL0lucHV0LmpzIiwic3JjL1RpY2tlci5qcyIsInNyYy9saWIvQ2FudmFzVHJhbnNmb3JtLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUEsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ1osV0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQjs7QUFFRCxJQUFJLE1BQU0sR0FBRyxxQkFBVyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzlCLGlCQUFhLEVBQUUsTUFBTTtBQUNyQixtQkFBZSxFQUFFLE1BQU07Q0FDMUIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxJQUFJLEdBQUcsbUJBQVMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDcEMsSUFBSSxLQUFLLEdBQUcsb0JBQVUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDdEMsSUFBSSxNQUFNLEdBQUcsc0JBQVksQ0FBQzs7QUFFMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUk7QUFDN0IsV0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDN0IsQ0FBQzs7QUFFRixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxZQUFLO0FBQzVCLFFBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ25CLGNBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNuQixNQUFNO0FBQ0gsY0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2xCO0NBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7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LE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2pCLENBQUM7YUFDTDtTQUNKOzs7a0NBRVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNaLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7K0JBRU0sR0FBRyxFQUFFO0FBQ1IsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FB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RyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RixnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxH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RyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsS0FBSztBQUNWLE9BQUcsRUFBRSxLQUFLO0FBQ1YsT0FBRyxFQUFFLEtBQUs7QUFDVixPQUFHLEVBQUUsVUFBVTtBQUNmLE9BQUcsRUFBRSxhQUFhO0FBQ2xCLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQztBQUNmLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO0NBQ2xCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW52YXMgZnJvbSAnLi9zcmMvQ2FudmFzJztcbmltcG9ydCBEcmF3IGZyb20gJy4vc3JjL0RyYXcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi9zcmMvVGlja2VyJztcblxuXG5mdW5jdGlvbiBsb2coZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufVxuXG5sZXQgY2FudmFzID0gbmV3IENhbnZhcyg4MDAsIDYwMCwge1xuICAgIGNhbnZhc0JnQ29sb3I6ICcjRUVFJyxcbiAgICBwYXJlbnRFbEJnQ29sb3I6ICcjMjIyJ1xufSk7XG5sZXQgZHJhdyA9IG5ldyBEcmF3KGNhbnZhcy5nZXRFbCgpKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChjYW52YXMuZ2V0RWwoKSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG50aWNrZXIub25UaWNrID0gKGRlbHRhLCB0aWNrcyk9PiB7XG4gICAgY29uc29sZS5sb2coZGVsdGEsIHRpY2tzKTtcbn07XG5cbmlucHV0LmFkZExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICAgIGlmICh0aWNrZXIuaXNQYXVzZWQoKSkge1xuICAgICAgICB0aWNrZXIucmVzdW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGlja2VyLnBhdXNlKCk7XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgQ2luZW1pemUgZnJvbSAnLi9DaW5lbWl6ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBlbGVtZW50LiBpbmNsdWRlZCBpbiB0aGUgb3B0aW9uc1xuICogICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBvcHRpb25hbCBkZXBlbmRlbmN5IGluamVjdGlvbiB1c2VkIGZvciB0ZXN0aW5nIGFnYWluc3RcbiAqICAgICAgICAgICAgICBhIHZpcnR1YWwgZG9tLlxuICogQHJlcXVpcmVzICAgIENpbmVtaXplXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgd2lkdGggICAgICAgICAgICAgICAgICBUaGUgd2lkdGggb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgaGVpZ2h0ICAgICAgICAgICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICAgICAgICAgQ2FudmFzIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRzLnBhcmVudEVsXSAgICAgICAgVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm9uZSBnaXZlbiB0aGUgYm9keSBpcyB1c2VkLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMuY2FudmFzQmdDb2xvcl0gICBUaGUgY2FudmFzIGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMucGFyZW50RWxCZ0NvbG9yXSBUaGUgcGFyZW50IGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMuZG9jdW1lbnRdICAgICAgICBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgICAgICAgICBGb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuXG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gb3B0cy5wYXJlbnRFbCB8fCB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuY2FudmFzQmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9wYXJlbnRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRzLnBhcmVudEVsQmdDb2xvcjtcbiAgICAgICAgdGhpcy5fcGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRqdXN0IGNhbnZhcyBDaW5lbWl6ZSB0byBmaXQgY2FudmFzIHRvIHJlc2l6ZWQgd2luZG93XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNfaGFuZGxlUmVzaXplXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IENpbmVtaXplLmZpdChcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQsIHRoaXMuX3dpbmRvd1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuXG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjZ2V0RWxcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gY2FudmFzXG4gICAgICovXG4gICAgZ2V0RWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHdpbmRvdyByZXNpemUgY2FsbGJhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI29uUmVzaXplXG4gICAgICovXG4gICAgb25SZXNpemUoKSB7fVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2luZW1pemVcbiAqIEBkZXNjcmlwdGlvbiBIZWxwZXJzIGZvciBrZWVwaW5nIHRoZSBjYW52YXMgbmljZWx5IHBvc2l0aW9uZWQgaW4gdGhlIHZpZXdwb3J0XG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpbmVtaXplIHtcbiAgICAvKipcbiAgICAgKiBLZWVwcyBjYW52YXMgZWxlbWVudCBjZW50ZXJlZCBhbmQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtPQmplY3R9ICBbb3B0c10gICAgICAgIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0cy53aW5kb3ddIFRoZSBET00gd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaXQod2lkdGgsIGhlaWdodCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcblxuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5XaWR0aCA9IHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgd2luSGVpZ2h0ID0gdGhpcy5fd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB3aW5IZWlnaHQgLyB3aW5XaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gd2luV2lkdGggLyB3aW5IZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB3aW5XaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAod2luSGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAod2luV2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbkhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAod2luV2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHdpbldpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh3aW5IZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBDYW52YXNUcmFuc2Zvcm0gZnJvbSAnLi9saWIvQ2FudmFzVHJhbnNmb3JtJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgRHJhd1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LiBNZXJnZXMgY29udGV4dFxuICogICAgICAgICAgICAgIG9iamVjdCB3aXRoIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3IuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVxdWlyZXMgICAgQ2FudmFzVHJhbnNmb3JtXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzIFRoZSBhY3RpdmUgY2FudmFzIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jYW52YXNYZm9ybSA9IG5ldyBDYW52YXNUcmFuc2Zvcm0odGhpcy5fb3JpZ2luYWxDb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fb3JpZ2luYWxDb250ZXh0O1xuXG4gICAgICAgIGZvciAobGV0IG1ldGhvZCBpbiB0aGlzLl9jYW52YXNYZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFttZXRob2RdID0gdGhpcy5fY2FudmFzWGZvcm1bbWV0aG9kXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtdXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3JlbmRlciBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSkge1xuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdHMgPSB7fSkge1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0cy5jYW52YXNGaXQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yTW91c2UgPSBvcHRzLmxpc3RlbkZvck1vdXNlIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvclRvdWNoID0gb3B0cy5saXN0ZW5Gb3JUb3VjaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQgPSBvcHRzLmxpc3RlbkZvcktleWJvYXJkIHx8IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcblxuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSB7fTtcblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3VzZXJHZXRCb3VuZGluZ0JveE1ldGhvZE5hbWUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRLZXlib2FyZExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZEtleWJvYXJkTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydrZXl1cCcsICdrZXlkb3duJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBtb3VzZSBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZE1vdXNlTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZFRvdWNoTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgc2NhbGUgcmF0aW8gb2YgdGhlIGNhbnZhcyBiYXNlZCBvbiB3aXRoL2hlZ2h0IGF0dHJzIGFuZCBjc3Mgd2lkdGgvaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19nZXRTY2FsZUZhY3RvclxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTAwIC8gZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIF9leHRlbmRFdmVudChldmVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlzRG93bjogdGhpcy5nZXRLZXlzRG93bigpLFxuICAgICAgICAgICAga2V5Q29kZTogaW5wdXRFdmVudC5rZXlDb2RlLFxuICAgICAgICAgICAga2V5TmFtZTogdHlwZW9mIGtleU5hbWUgPT09ICdvYmplY3QnICYmIGtleU5hbWUubGVuZ3RoID9cbiAgICAgICAgICAgICAgICBrZXlOYW1lWzBdIDpcbiAgICAgICAgICAgICAgICBrZXlOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNEb3duW2tleU5hbWVdID0gaW5wdXRFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfVVA6XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tleXNEb3duW2tleU5hbWVdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudC54ID0gTWF0aC5yb3VuZChldmVudC5hYnNYICogc2NhbGVGYWN0b3IpO1xuICAgICAgICBldmVudC55ID0gTWF0aC5yb3VuZChldmVudC5hYnNZICogc2NhbGVGYWN0b3IpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9ET1dOOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9TVEFSVDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfVVA6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX0VORDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCh0aGlzLl9leHRlbmRFdmVudChldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19FTkRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX01PVkU6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX01PVkU6XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCh0aGlzLl9leHRlbmRFdmVudChldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfU1RBUlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHRoaXMuX2V4dGVuZEV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgZHVwbGljYXRlIGhhbmRsZXIgaW4gdGhlIGxpc3RlbmVyIHR5b2UgYmVpbmcgYWRkZWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2lzRHVwbGljYXRlSGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgaGFuZGxlciB0byBjaGVja1xuICAgICAqIEBwYXJhbSAge0FycmF5fSAgICBoYW5kbGVycyBUaGUgaGFuZGxlcnMgb2YgdGhlIGxpc3RlbmVyIHR5cGUgYmVpbmcgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICBsZXQgZHVwID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGhhbmRsZXJPYmplY3QuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHVwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG4gICAgICAgICAgICAgICAgbGV0IGdldEJvdW5kaW5nQm94TWV0aG9kTmFtZSA9IHRoaXMuX3VzZXJHZXRCb3VuZGluZ0JveE1ldGhvZE5hbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgJ2dldEJvdW5kaW5nQm94JztcblxuICAgICAgICAgICAgICAgIGlmIChoaXRUZXN0KGV2ZW50LngsIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QudGFyZ2V0W2dldEJvdW5kaW5nQm94TWV0aG9kTmFtZV0oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgaGFuZGxlciBmb3IgYSBjZXJ0YWluIGV2ZW50IHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjYWRkTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICAgVGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCB0cmlnZ2VyZWRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgW3RhcmdldF0gVGhlIHRhcmdldCB0byBjaGVjayBldmVudCB0cmlnZ2VyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgUmV0dXJucyB0cnVlIGlmIGFkZGVkIGFuZCBmYWxzZSBpZiBjYWxsYmFjayBhbHJlYWR5IGV4aXN0c1xuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHRhcmdldCkge1xuICAgICAgICBsZXQgaGFuZGxlck9iamVjdHMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCBkdXA7XG5cblxuICAgICAgICBpZiAoISBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVyT2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGR1cCA9IHRoaXMuX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWR1cCkge1xuICAgICAgICAgICAgaGFuZGxlck9iamVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaGFuZGxlciwgdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbWF0Y2hpbmcgaGFuZGxlciBpZiBmb3VuZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNyZW1vdmVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gIHJlbW92ZWQgUmV0dXJucyB0cnVlIGlmIHJlbW92ZWQgYW5kIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlck9iamVjdCA9IGhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QuaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBrZXlzIGN1cnJlbnRseSBiZWluZyBwcmVzc2VkXG4gICAgICogZWc6IHsgTEVGVF9BUlJPVzogMzcsIFVQX0FSUk9XOiAzOCB9XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2dldEtleXNEb3duXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIGdldEtleXNEb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c0Rvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVzZXIgdG8gc2V0IGEgY3VzdG9tIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNzZXRIaXRUZXN0TWV0aG9kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHVzZXIncyBoaXQgdGVzdCBtZXRob2RcbiAgICAgKi9cbiAgICBzZXRIaXRUZXN0TWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0I3NldEhpdFRlc3RNZXRob2QgcGFyYW1ldGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBTGxvd3MgdXNlciB0byBzZXQgdGhlaXIgdGFyZ2V0J3MgZ2V0IGJvdW5kaW5nIGJveCBuYW1lLlxuICAgICAqIFRoaXMgbWV0aG9kIG11c3QgcmV0dXJuICBtaW5YIG1heFggbWluWSAmIG1heFlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0Qm91bmRpbmdCb3hNZXRob2ROYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGdldCBib3VuZGluZyBib3ggbWV0aG9kIG5hbWVcbiAgICAgKi9cbiAgICBzZXRCb3VuZGluZ0JveE1ldGhvZE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLl91c2VyR2V0Qm91bmRpbmdCb3hNZXRob2ROYW1lID0gbmFtZTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSAgW2Zwc10gICBUaGUgZGVzaXJlZCBmcmFtZXMgcGVyIHNlY29uZC4gRGVmYXVsdCBpcyAzMFxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKGZwcyA9IDMwLCBzdGFydCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fZnBzID0gZnBzO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDAwIC8gdGhpcy5fZnBzO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiBfZnBzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMuX3RoZW47XG5cbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIHRyaW0gQHRoZW4gaWYgaXQncyBtb3JlIHRoYW4gQGludGVydmFsXG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5fdGlja3MgKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5vblRpY2soZGVsdGEgLyB0aGlzLl9pbnRlcnZhbCwgdGhpcy5fdGlja3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBvbiBlYWNoIHRpY2suXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNvblRpY2tcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGZhY3RvciBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGlja3MgVGhlIGFtb3VudCBvZiB0aWNrcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWRcbiAgICAgKi9cbiAgICBvblRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1RyYW5zZm9ybVxuICogQGRlc2NyaXB0aW9uIFJldGFpbnMgY2FudmFzIHRyYW5zZm9ybWF0aW9uIHN0YWNrLlxuICogICAgICAgICAgICAgIEJhc2ljYWxseSBhIGZvcmsgZnJvbSBTaW1vbiBTYXJyaXMgLSB3d3cuc2ltb25zYXJyaXMuY29tIC0gc2FycmlzQGFjbS5vcmdcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzVHJhbnNmb3JtIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHQgVGhlIGNhbnZhcycgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMubWF0cml4ID0gWzEsMCwwLDEsMCwwXTsgLy9pbml0aWFsaXplIHdpdGggdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgfVxuXG4gICAgc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgZ2V0TWF0cml4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRyaXg7XG4gICAgfVxuXG4gICAgc2V0TWF0cml4KG0pIHtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbbVswXSxtWzFdLG1bMl0sbVszXSxtWzRdLG1bNV1dO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGNsb25lTWF0cml4KG0pIHtcbiAgICAgICAgcmV0dXJuIFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBTdGFja1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgc2F2ZSgpIHtcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMuY2xvbmVNYXRyaXgodGhpcy5nZXRNYXRyaXgoKSk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChtYXRyaXgpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgfVxuXG4gICAgcmVzdG9yZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hdHJpeChtYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgc2V0VHJhbnNmb3JtKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzBdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzFdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzJdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzNdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzRdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzVdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gKz0gdGhpcy5tYXRyaXhbMF0gKiB4ICsgdGhpcy5tYXRyaXhbMl0gKiB5O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSArPSB0aGlzLm1hdHJpeFsxXSAqIHggKyB0aGlzLm1hdHJpeFszXSAqIHk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByb3RhdGUocmFkKSB7XG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgbGV0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBsZXQgbTExID0gdGhpcy5tYXRyaXhbMF0gKiBjICsgdGhpcy5tYXRyaXhbMl0gKiBzO1xuICAgICAgICBsZXQgbTEyID0gdGhpcy5tYXRyaXhbMV0gKiBjICsgdGhpcy5tYXRyaXhbM10gKiBzO1xuICAgICAgICBsZXQgbTIxID0gdGhpcy5tYXRyaXhbMF0gKiAtcyArIHRoaXMubWF0cml4WzJdICogYztcbiAgICAgICAgbGV0IG0yMiA9IHRoaXMubWF0cml4WzFdICogLXMgKyB0aGlzLm1hdHJpeFszXSAqIGM7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTExO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTIyO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgc2NhbGUoc3gsIHN5KSB7XG4gICAgICAgIHRoaXMubWF0cml4WzBdICo9IHN4O1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gKj0gc3k7XG4gICAgICAgIHRoaXMubWF0cml4WzNdICo9IHN5O1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXggZXh0ZW5zaW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcm90YXRlRGVncmVlcyhkZWcpIHtcbiAgICAgICAgbGV0IHJhZCA9IGRlZyAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHRoaXMucm90YXRlKHJhZCk7XG4gICAgfVxuXG4gICAgcm90YXRlQWJvdXQocmFkLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLnJvdGF0ZShyYWQpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZURlZ3JlZXNBYm91dChkZWcsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMucm90YXRlRGVncmVlcyhkZWcpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGlkZW50aXR5KCkge1xuICAgICAgICB0aGlzLm0gPSBbMSwwLDAsMSwwLDBdO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIG11bHRpcGx5KG1hdHJpeCkge1xuICAgICAgICBsZXQgbTExID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVswXSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bMV07XG4gICAgICAgIGxldCBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVsxXTtcblxuICAgICAgICBsZXQgbTIxID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVsyXSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bM107XG4gICAgICAgIGxldCBtMjIgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVszXTtcblxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVs1XSArIHRoaXMubWF0cml4WzRdO1xuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVs1XSArIHRoaXMubWF0cml4WzVdO1xuXG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTExO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTIyO1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSA9IGR4O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSA9IGR5O1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGludmVydCgpIHtcbiAgICAgICAgbGV0IGQgPSAxIC8gKHRoaXMubWF0cml4WzBdICogdGhpcy5tYXRyaXhbM10gLSB0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzJdKTtcbiAgICAgICAgbGV0IG0wID0gdGhpcy5tYXRyaXhbM10gKiBkO1xuICAgICAgICBsZXQgbTEgPSAtdGhpcy5tYXRyaXhbMV0gKiBkO1xuICAgICAgICBsZXQgbTIgPSAtdGhpcy5tYXRyaXhbMl0gKiBkO1xuICAgICAgICBsZXQgbTMgPSB0aGlzLm1hdHJpeFswXSAqIGQ7XG4gICAgICAgIGxldCBtNCA9IGQgKiAodGhpcy5tYXRyaXhbMl0gKiB0aGlzLm1hdHJpeFs1XSAtIHRoaXMubWF0cml4WzNdICogdGhpcy5tYXRyaXhbNF0pO1xuICAgICAgICBsZXQgbTUgPSBkICogKHRoaXMubWF0cml4WzFdICogdGhpcy5tYXRyaXhbNF0gLSB0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzVdKTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMztcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gPSBtNDtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gPSBtNTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEhlbHBlcnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRyYW5zZm9ybVBvaW50KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHggKiB0aGlzLm1hdHJpeFswXSArIHkgKiB0aGlzLm1hdHJpeFsyXSArIHRoaXMubWF0cml4WzRdLFxuICAgICAgICAgICAgeTogeCAqIHRoaXMubWF0cml4WzFdICsgeSAqIHRoaXMubWF0cml4WzNdICsgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgfTtcbiAgICB9XG59IiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiJdfQ==
