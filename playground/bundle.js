(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Stage = require('./src/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Draw = require('./src/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _Input = require('./src/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Rectangle = require('./src/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Ticker = require('./src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new _Stage2.default(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222'
});
var draw = new _Draw2.default(stage.getCanvas());
var input = new _Input2.default(stage.getCanvas());
var ticker = new _Ticker2.default();
var rect = new _Rectangle2.default();

rect.setFill('#48C');
ticker.onTick = function () {
    draw.clear();
    draw.render(rect);
};

input.addListener('click', function (e) {
    rect.setX(Math.random() * 800);
    rect.setY(Math.random() * 600);
}, rect);

},{"./src/Draw":2,"./src/Input":3,"./src/Rectangle":4,"./src/Stage":6,"./src/Ticker":7}],2:[function(require,module,exports){
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

        this._canvas = canvas;
        this._originalContext = this._canvas.getContext('2d');
        this._canvasXform = new _CanvasTransform2.default(this._originalContext);

        this._context = this._originalContext;

        for (var method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
    }

    _createClass(Draw, [{
        key: 'clear',
        value: function clear() {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }

        /**
         * []
         *
         * @method Draw#getContext
         * @return {Object} The context object
         */

    }, {
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

},{"./lib/CanvasTransform":8}],3:[function(require,module,exports){
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

},{"./lib/keycodes":9}],4:[function(require,module,exports){
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
            context.fillStyle = this._fill;
            context.fillRect(this._x, this._y, this._width, this._height);

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(this._x, this._y, this._width, this._height);
            }
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

},{"./Sprite":5}],5:[function(require,module,exports){
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
        this._width = 32;
        this._height = 32;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

    _createClass(Sprite, [{
        key: 'getBoundingBox',

        /**
         * @return {Object}
         */
        value: function getBoundingBox() {
            return {
                maxX: this._x + this._width,
                maxY: this._y + this._height,
                minX: this._x,
                minY: this._y
            };
        }

        /**
         * @return {String}
         */

    }, {
        key: 'getComposite',
        value: function getComposite() {
            return this._composite;
        }

        /**
         * @return {String}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }

        /**
         * @return {Float}
         */

    }, {
        key: 'getOpacity',
        value: function getOpacity() {
            return this._opacity;
        }

        /**
         * @return {Float}
         */

    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this._rotation;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getScaleX',
        value: function getScaleX() {
            return this._scaleX;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getScaleY',
        value: function getScaleY() {
            return this._scaleY;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getSrcX',
        value: function getSrcX() {
            return this._srcX;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getSrcY',
        value: function getSrcY() {
            return this._srcY;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getX',
        value: function getX() {
            return this._x;
        }

        /**
         * @return {Integer}
         */

    }, {
        key: 'getY',
        value: function getY() {
            return this._y;
        }
    }, {
        key: 'setComposite',
        value: function setComposite(val) {
            this._composite = val;

            return this;
        }
    }, {
        key: 'setHeight',
        value: function setHeight(val) {
            this._height = val;

            return this;
        }
    }, {
        key: 'setOpacity',
        value: function setOpacity(val) {
            this._opacity = val;

            return this;
        }
    }, {
        key: 'setRotation',
        value: function setRotation(val) {
            this._rotation = val;

            return this;
        }
    }, {
        key: 'setScaleX',
        value: function setScaleX(val) {
            this._scaleX = val;

            return this;
        }
    }, {
        key: 'setScaleY',
        value: function setScaleY(val) {
            this._scaleY = val;

            return this;
        }
    }, {
        key: 'setSrcX',
        value: function setSrcX(val) {
            this._srcX = val;

            return this;
        }
    }, {
        key: 'setSrcY',
        value: function setSrcY(val) {
            this._srcY = val;

            return this;
        }
    }, {
        key: 'setWidth',
        value: function setWidth(val) {
            this._width = val;

            return this;
        }
    }, {
        key: 'setX',
        value: function setX(val) {
            this._x = val;

            return this;
        }
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
 * @type {String}
 * @static
 */

Sprite._compositeDefault = 'source-over';

exports.default = Sprite;

},{}],6:[function(require,module,exports){
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
 * @requires    Stage
 * @author      Chris Peters
 *
 * @param {Integer}     width                  The width of the canvas
 * @param {Integer}     height                 The height of the canvas
 * @param {Object}      [opts]                 Stage options
 * @param {HTMLElement} [opts.parentEl]        The element with which to attach the canvas.
 *                                             If none given the body is used.
 * @param {String}      [opts.canvasBgColor]   The canvas element's bg color
 * @param {String}      [opts.parentElBgColor] The parent element's bg color
 * @param {Object}      [opts.document]        For testing
 * @param {Object}      [opts.window]          For testing
 * @param {Boolean}     [fill]                 Set to false to not maximally fill viewport.
 *                                             Default is true.
 */

var Stage = (function () {
    function Stage() {
        var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
        var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Stage);

        this._fit = opts.fill === undefined ? true : opts.fill;
        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;
        this._parentEl = opts.parentEl || this._document.body;

        this._createStageElements();

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    _createClass(Stage, [{
        key: '_createStageElements',
        value: function _createStageElements() {
            this._canvas = this._document.createElement('canvas');
            this._canvas.width = this._width;
            this._canvas.height = this._height;
            this._canvas.style.position = 'absolute';
            this._canvas.style.backgroundColor = opts.canvasBgColor;

            this._parentEl.style.backgroundColor = opts.parentElBgColor;
            this._parentEl.appendChild(this._canvas);
        }

        /**
         * Decides how to handle resize based on options
         *
         * @method Stage#_handleResize
         * @private
         */

    }, {
        key: '_handleResize',
        value: function _handleResize() {
            if (this._fit) {
                var _Stage$fill = Stage.fill(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$fill.top;
                var left = _Stage$fill.left;
                var width = _Stage$fill.width;
                var height = _Stage$fill.height;

                this._canvas.style.top = Math.round(top) + 'px';
                this._canvas.style.left = Math.round(left) + 'px';
                this._canvas.style.width = Math.round(width) + 'px';
                this._canvas.style.height = Math.round(height) + 'px';
            } else {
                var _Stage$center = Stage.center(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$center.top;
                var left = _Stage$center.left;

                this._canvas.style.top = Math.round(top) + 'px';
                this._canvas.style.left = Math.round(left) + 'px';
            }

            this.onResize(this._canvas);
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvUmVjdGFuZ2xlLmpzIiwic3JjL1Nwcml0ZS5qcyIsInNyYy9TdGFnZS5qcyIsInNyYy9UaWNrZXIuanMiLCJzcmMvbGliL0NhbnZhc1RyYW5zZm9ybS5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNNQSxJQUFJLEtBQUssR0FBRyxvQkFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzVCLGlCQUFhLEVBQUUsTUFBTTtBQUNyQixtQkFBZSxFQUFFLE1BQU07Q0FDMUIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxJQUFJLEdBQUcsbUJBQVMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDdkMsSUFBSSxLQUFLLEdBQUcsb0JBQVUsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsc0JBQVksQ0FBQztBQUMxQixJQUFJLElBQUksR0FBRyx5QkFBZSxDQUFDOztBQUUzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWTtBQUN4QixRQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYixRQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JCLENBQUM7O0FBRUYsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDcEMsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0IsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdB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Q3RCLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDOztBQUVyQixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7OEJBRUssRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNWLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFckIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7Ozs7Ozs7c0NBS2EsR0FBRyxFQUFFO0FBQ2YsZ0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUM5QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjs7O29DQUVXLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25CLGdCQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7OzsyQ0FFa0IsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDMUIsZ0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7O21DQUVVO0FBQ1AsZ0JBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7OztpQ0FFUSxNQUFNLEVBQUU7QUFDYixnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEUsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRFLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEYsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FB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RSxjQUFjO0FBQ25CLE9BQUcsRUFBRSxlQUFlO0FBQ3BCLE9BQUcsRUFBRSxzQkFBc0I7QUFDM0IsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLEtBQUs7QUFDVixPQUFHLEVBQUUsS0FBSztBQUNWLE9BQUcsRUFBRSxLQUFLO0FBQ1YsT0FBRyxFQUFFLFVBQVU7QUFDZixPQUFHLEVBQUUsYUFBYTtBQUNsQixPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUM7QUFDZixPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQztDQUNsQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3RhZ2UgZnJvbSAnLi9zcmMvU3RhZ2UnO1xuaW1wb3J0IERyYXcgZnJvbSAnLi9zcmMvRHJhdyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9zcmMvSW5wdXQnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuL3NyYy9SZWN0YW5nbGUnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgc3RhZ2UgPSBuZXcgU3RhZ2UoODAwLCA2MDAsIHtcbiAgICBjYW52YXNCZ0NvbG9yOiAnI0VFRScsXG4gICAgcGFyZW50RWxCZ0NvbG9yOiAnIzIyMidcbn0pO1xubGV0IGRyYXcgPSBuZXcgRHJhdyhzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgaW5wdXQgPSBuZXcgSW5wdXQoc3RhZ2UuZ2V0Q2FudmFzKCkpO1xubGV0IHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcbmxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSgpO1xuXG5yZWN0LnNldEZpbGwoJyM0OEMnKTtcbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgZHJhdy5jbGVhcigpO1xuICAgIGRyYXcucmVuZGVyKHJlY3QpO1xufTtcblxuaW5wdXQuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICByZWN0LnNldFgoTWF0aC5yYW5kb20oKSAqIDgwMCk7XG4gICAgcmVjdC5zZXRZKE1hdGgucmFuZG9tKCkgKiA2MDApO1xufSwgcmVjdCk7XG4iLCJpbXBvcnQgQ2FudmFzVHJhbnNmb3JtIGZyb20gJy4vbGliL0NhbnZhc1RyYW5zZm9ybSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIERyYXdcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC4gTWVyZ2VzIGNvbnRleHRcbiAqICAgICAgICAgICAgICBvYmplY3Qgd2l0aCBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICogQHJlcXVpcmVzICAgIENhbnZhc1RyYW5zZm9ybVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhcyBUaGUgYWN0aXZlIGNhbnZhcyBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsQ29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jYW52YXNYZm9ybSA9IG5ldyBDYW52YXNUcmFuc2Zvcm0odGhpcy5fb3JpZ2luYWxDb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fb3JpZ2luYWxDb250ZXh0O1xuXG4gICAgICAgIGZvciAobGV0IG1ldGhvZCBpbiB0aGlzLl9jYW52YXNYZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFttZXRob2RdID0gdGhpcy5fY2FudmFzWGZvcm1bbWV0aG9kXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtdXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3JlbmRlciBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSkge1xuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdHMgPSB7fSkge1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0cy5jYW52YXNGaXQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yTW91c2UgPSBvcHRzLmxpc3RlbkZvck1vdXNlIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvclRvdWNoID0gb3B0cy5saXN0ZW5Gb3JUb3VjaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQgPSBvcHRzLmxpc3RlbkZvcktleWJvYXJkIHx8IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcblxuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSB7fTtcblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3VzZXJHZXRCb3VuZGluZ0JveE1ldGhvZE5hbWUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRLZXlib2FyZExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZEtleWJvYXJkTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydrZXl1cCcsICdrZXlkb3duJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBtb3VzZSBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZE1vdXNlTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZFRvdWNoTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgc2NhbGUgcmF0aW8gb2YgdGhlIGNhbnZhcyBiYXNlZCBvbiB3aXRoL2hlZ2h0IGF0dHJzIGFuZCBjc3Mgd2lkdGgvaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19nZXRTY2FsZUZhY3RvclxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTAwIC8gZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIF9leHRlbmRFdmVudChldmVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlzRG93bjogdGhpcy5nZXRLZXlzRG93bigpLFxuICAgICAgICAgICAga2V5Q29kZTogaW5wdXRFdmVudC5rZXlDb2RlLFxuICAgICAgICAgICAga2V5TmFtZTogdHlwZW9mIGtleU5hbWUgPT09ICdvYmplY3QnICYmIGtleU5hbWUubGVuZ3RoID9cbiAgICAgICAgICAgICAgICBrZXlOYW1lWzBdIDpcbiAgICAgICAgICAgICAgICBrZXlOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNEb3duW2tleU5hbWVdID0gaW5wdXRFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfVVA6XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tleXNEb3duW2tleU5hbWVdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudC54ID0gTWF0aC5yb3VuZChldmVudC5hYnNYICogc2NhbGVGYWN0b3IpO1xuICAgICAgICBldmVudC55ID0gTWF0aC5yb3VuZChldmVudC5hYnNZICogc2NhbGVGYWN0b3IpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9ET1dOOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9TVEFSVDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfVVA6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX0VORDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCh0aGlzLl9leHRlbmRFdmVudChldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19FTkRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX01PVkU6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX01PVkU6XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCh0aGlzLl9leHRlbmRFdmVudChldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfU1RBUlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHRoaXMuX2V4dGVuZEV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgZHVwbGljYXRlIGhhbmRsZXIgaW4gdGhlIGxpc3RlbmVyIHR5b2UgYmVpbmcgYWRkZWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2lzRHVwbGljYXRlSGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgaGFuZGxlciB0byBjaGVja1xuICAgICAqIEBwYXJhbSAge0FycmF5fSAgICBoYW5kbGVycyBUaGUgaGFuZGxlcnMgb2YgdGhlIGxpc3RlbmVyIHR5cGUgYmVpbmcgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICBsZXQgZHVwID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGhhbmRsZXJPYmplY3QuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHVwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG4gICAgICAgICAgICAgICAgbGV0IGdldEJvdW5kaW5nQm94TWV0aG9kTmFtZSA9IHRoaXMuX3VzZXJHZXRCb3VuZGluZ0JveE1ldGhvZE5hbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgJ2dldEJvdW5kaW5nQm94JztcblxuICAgICAgICAgICAgICAgIGlmIChoaXRUZXN0KGV2ZW50LngsIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QudGFyZ2V0W2dldEJvdW5kaW5nQm94TWV0aG9kTmFtZV0oKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiB7IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNnZXRLZXlzRG93blxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRLZXlzRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNEb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1c2VyIHRvIHNldCBhIGN1c3RvbSBoaXQgdGVzdCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0SGl0VGVzdE1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSB1c2VyJ3MgaGl0IHRlc3QgbWV0aG9kXG4gICAgICovXG4gICAgc2V0SGl0VGVzdE1ldGhvZChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCNzZXRIaXRUZXN0TWV0aG9kIHBhcmFtZXRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUxsb3dzIHVzZXIgdG8gc2V0IHRoZWlyIHRhcmdldCdzIGdldCBib3VuZGluZyBib3ggbmFtZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBtdXN0IHJldHVybiAgbWluWCBtYXhYIG1pblkgJiBtYXhZXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEJvdW5kaW5nQm94TWV0aG9kTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBnZXQgYm91bmRpbmcgYm94IG1ldGhvZCBuYW1lXG4gICAgICovXG4gICAgc2V0Qm91bmRpbmdCb3hNZXRob2ROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fdXNlckdldEJvdW5kaW5nQm94TWV0aG9kTmFtZSA9IG5hbWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgUmVjdGFuZ2xlXG4gKiBAZXh0ZW5kcyB7QGxpbmsgU3ByaXRlfVxuICogQGRlc2MgICAgQSBzcHJpdGUgdGhhdCByZW5kZXJzIGFzIGEgcmVjdGFuZ2xlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5feCwgdGhpcy5feSwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbXBvc2l0ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQm94KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5feCArIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5feSArIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U3JjWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAc3RhdGljXG4gKi9cblNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdCA9ICdzb3VyY2Utb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFN0YWdlXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIGVsZW1lbnQuIGluY2x1ZGVkIGluIHRoZSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHVzZWQgZm9yIHRlc3RpbmcgYWdhaW5zdFxuICogICAgICAgICAgICAgIGEgdmlydHVhbCBkb20uXG4gKiBAcmVxdWlyZXMgICAgU3RhZ2VcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICB3aWR0aCAgICAgICAgICAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBoZWlnaHQgICAgICAgICAgICAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHNdICAgICAgICAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gICAgICAgIFRoZSBlbGVtZW50IHdpdGggd2hpY2ggdG8gYXR0YWNoIHRoZSBjYW52YXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vbmUgZ2l2ZW4gdGhlIGJvZHkgaXMgdXNlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLmNhbnZhc0JnQ29sb3JdICAgVGhlIGNhbnZhcyBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLnBhcmVudEVsQmdDb2xvcl0gVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIFtmaWxsXSAgICAgICAgICAgICAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyB0cnVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Iod2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2ZpdCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhZ2VFbGVtZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlU3RhZ2VFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0cy5jYW52YXNCZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX3BhcmVudEVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMucGFyZW50RWxCZ0NvbG9yO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfaGFuZGxlUmVzaXplXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5fZml0KSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0KX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IFN0YWdlLmNlbnRlcihcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplKHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0Q2FudmFzXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1heGltaXplcyBhbiBlbGVtZW50ICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydCB2aWEgQ1NTLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5maWxsXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpbGwod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgIGNvbnN0IFBPUlRSQUlUX1JBVElPICA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBJU19MQU5EU0NBUEUgICAgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB2aWV3cG9ydEhlaWdodCAvIHZpZXdwb3J0V2lkdGg7XG4gICAgICAgIGxldCB3aW5Qb3J0cmFpdFJhdGlvICA9IHZpZXdwb3J0V2lkdGggLyB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyBzdGFnZSBlbGVtZW50IGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5jZW50ZXJcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSB0b3AgYW5kIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgY2VudGVyKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAodmlld3BvcnRXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICAgICAgICB0b3A6ICh2aWV3cG9ydEhlaWdodCAtIGhlaWdodCkgLyAyXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgVGlja2VyXG4gKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgY2FsbGJhY2sgYmFzZWQgb24gZ2l2ZW4gZnBzIGFuZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gIFtmcHNdICAgVGhlIGRlc2lyZWQgZnJhbWVzIHBlciBzZWNvbmQuIERlZmF1bHQgaXMgMzBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0YXJ0XSBXaGV0aGVyIHRvIHN0YXJ0IG9uIGluc3RhbnRpYXRlLiBEZWZhdWx0IGlzIHRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihmcHMgPSAzMCwgc3RhcnQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwMCAvIHRoaXMuX2ZwcztcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24gX2Zwc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuXG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgICAgICAvLyB0cmltIEB0aGVuIGlmIGl0J3MgbW9yZSB0aGFuIEBpbnRlcnZhbFxuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMub25UaWNrKGRlbHRhIC8gdGhpcy5faW50ZXJ2YWwsIHRoaXMuX3RpY2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBmYWN0b3IgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNUcmFuc2Zvcm1cbiAqIEBkZXNjcmlwdGlvbiBSZXRhaW5zIGNhbnZhcyB0cmFuc2Zvcm1hdGlvbiBzdGFjay5cbiAqICAgICAgICAgICAgICBCYXNpY2FsbHkgYSBmb3JrIGZyb20gU2ltb24gU2FycmlzIC0gd3d3LnNpbW9uc2FycmlzLmNvbSAtIHNhcnJpc0BhY20ub3JnXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1RyYW5zZm9ybSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFsxLDAsMCwxLDAsMF07IC8vaW5pdGlhbGl6ZSB3aXRoIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIH1cblxuICAgIHNldENvbnRleHQoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGdldE1hdHJpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICAgIH1cblxuICAgIHNldE1hdHJpeChtKSB7XG4gICAgICAgIHRoaXMubWF0cml4ID0gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBjbG9uZU1hdHJpeChtKSB7XG4gICAgICAgIHJldHVybiBbbVswXSxtWzFdLG1bMl0sbVszXSxtWzRdLG1bNV1dO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhY2tcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBtYXRyaXggPSB0aGlzLmNsb25lTWF0cml4KHRoaXMuZ2V0TWF0cml4KCkpO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobWF0cml4KTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgIH1cblxuICAgIHJlc3RvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBtYXRyaXggPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXRyaXgobWF0cml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXhcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFswXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsxXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsyXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFszXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs1XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMubWF0cml4WzRdICs9IHRoaXMubWF0cml4WzBdICogeCArIHRoaXMubWF0cml4WzJdICogeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gKz0gdGhpcy5tYXRyaXhbMV0gKiB4ICsgdGhpcy5tYXRyaXhbM10gKiB5O1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlKHJhZCkge1xuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogYyArIHRoaXMubWF0cml4WzJdICogcztcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogYyArIHRoaXMubWF0cml4WzNdICogcztcbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogLXMgKyB0aGlzLm1hdHJpeFsyXSAqIGM7XG4gICAgICAgIGxldCBtMjIgPSB0aGlzLm1hdHJpeFsxXSAqIC1zICsgdGhpcy5tYXRyaXhbM10gKiBjO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHNjYWxlKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1hdHJpeFszXSAqPSBzeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4IGV4dGVuc2lvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHJvdGF0ZURlZ3JlZXMoZGVnKSB7XG4gICAgICAgIGxldCByYWQgPSBkZWcgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB0aGlzLnJvdGF0ZShyYWQpO1xuICAgIH1cblxuICAgIHJvdGF0ZUFib3V0KHJhZCwgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByb3RhdGVEZWdyZWVzQWJvdXQoZGVnLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLnJvdGF0ZURlZ3JlZXMoZGVnKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdGhpcy5tID0gWzEsMCwwLDEsMCwwXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseShtYXRyaXgpIHtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICBsZXQgbTEyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVswXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bMV07XG5cbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVsyXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bM107XG5cbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs0XTtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs1XTtcblxuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gPSBkeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gPSBkeTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIGxldCBkID0gMSAvICh0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzNdIC0gdGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFsyXSk7XG4gICAgICAgIGxldCBtMCA9IHRoaXMubWF0cml4WzNdICogZDtcbiAgICAgICAgbGV0IG0xID0gLXRoaXMubWF0cml4WzFdICogZDtcbiAgICAgICAgbGV0IG0yID0gLXRoaXMubWF0cml4WzJdICogZDtcbiAgICAgICAgbGV0IG0zID0gdGhpcy5tYXRyaXhbMF0gKiBkO1xuICAgICAgICBsZXQgbTQgPSBkICogKHRoaXMubWF0cml4WzJdICogdGhpcy5tYXRyaXhbNV0gLSB0aGlzLm1hdHJpeFszXSAqIHRoaXMubWF0cml4WzRdKTtcbiAgICAgICAgbGV0IG01ID0gZCAqICh0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzRdIC0gdGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFs1XSk7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTA7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTE7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTI7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTM7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gbTQ7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gbTU7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBIZWxwZXJzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0cmFuc2Zvcm1Qb2ludCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4ICogdGhpcy5tYXRyaXhbMF0gKyB5ICogdGhpcy5tYXRyaXhbMl0gKyB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgIHk6IHggKiB0aGlzLm1hdHJpeFsxXSArIHkgKiB0aGlzLm1hdHJpeFszXSArIHRoaXMubWF0cml4WzVdXG4gICAgICAgIH07XG4gICAgfVxufSIsIi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIDg6ICdCQUNLU1BBQ0UnLFxuICAgIDk6ICdUQUInLFxuICAgIDEzOiAnRU5URVInLFxuICAgIDE2OiAnU0hJRlQnLFxuICAgIDE3OiAnQ1RSTCcsXG4gICAgMTg6ICdBTFQnLFxuICAgIDE5OiAnUEFVU0VfQlJFQUsnLFxuICAgIDIwOiAnQ0FQU19MT0NLJyxcbiAgICAyNzogJ0VTQ0FQRScsXG4gICAgMzM6ICdQQUdFX1VQJyxcbiAgICAzNDogJ1BBR0VfRE9XTicsXG4gICAgMzU6ICdFTkQnLFxuICAgIDM2OiAnSE9NRScsXG4gICAgMzc6ICdMRUZUX0FSUk9XJyxcbiAgICAzODogJ1VQX0FSUk9XJyxcbiAgICAzOTogJ1JJR0hUX0FSUk9XJyxcbiAgICA0MDogJ0RPV05fQVJST1cnLFxuICAgIDQ1OiAnSU5TRVJUJyxcbiAgICA0NjogJ0RFTEVURScsXG4gICAgNDg6IFswLCcpJ10sXG4gICAgNDk6IFsxLCchJ10sXG4gICAgNTA6IFsyLCdAJ10sXG4gICAgNTE6IFszLCcjJ10sXG4gICAgNTI6IFs0LCckJ10sXG4gICAgNTM6IFs1LCclJ10sXG4gICAgNTQ6IFs2LCdeJ10sXG4gICAgNTU6IFs3LCcmJ10sXG4gICAgNTY6IFs4LCcqJ10sXG4gICAgNTc6IFs5LCcoJ10sXG4gICAgNjU6ICdBJyxcbiAgICA2NjogJ0InLFxuICAgIDY3OiAnQycsXG4gICAgNjg6ICdEJyxcbiAgICA2OTogJ0UnLFxuICAgIDcwOiAnRicsXG4gICAgNzE6ICdHJyxcbiAgICA3MjogJ0gnLFxuICAgIDczOiAnSScsXG4gICAgNzQ6ICdKJyxcbiAgICA3NTogJ0snLFxuICAgIDc2OiAnTCcsXG4gICAgNzc6ICdNJyxcbiAgICA3ODogJ04nLFxuICAgIDc5OiAnTycsXG4gICAgODA6ICdQJyxcbiAgICA4MTogJ1EnLFxuICAgIDgyOiAnUicsXG4gICAgODM6ICdTJyxcbiAgICA4NDogJ1QnLFxuICAgIDg1OiAnVScsXG4gICAgODY6ICdWJyxcbiAgICA4NzogJ1cnLFxuICAgIDg4OiAnWCcsXG4gICAgODk6ICdZJyxcbiAgICA5MDogJ1onLFxuICAgIDkxOiAnTEVGVF9XSU5ET1dfS0VZJyxcbiAgICA5MjogJ1JJR0hUX1dJTkRPV19LRVknLFxuICAgIDkzOiAnU0VMRUNUX0tFWScsXG4gICAgOTY6ICdOVU1fUEFEXzAnLFxuICAgIDk3OiAnTlVNX1BBRF8xJyxcbiAgICA5ODogJ05VTV9QQURfMicsXG4gICAgOTk6ICdOVU1fUEFEXzMnLFxuICAgIDEwMDogJ05VTV9QQURfNCcsXG4gICAgMTAxOiAnTlVNX1BBRF81JyxcbiAgICAxMDI6ICdOVU1fUEFEXzYnLFxuICAgIDEwMzogJ05VTV9QQURfNycsXG4gICAgMTA0OiAnTlVNX1BBRF84JyxcbiAgICAxMDU6ICdOVU1fUEFEXzknLFxuICAgIDEwNjogJ05VTV9QQURfQVNURVJJU0snLFxuICAgIDEwNzogJ05VTV9QQURfUExVUycsXG4gICAgMTA5OiAnTlVNX1BBRF9NSU5VUycsXG4gICAgMTExOiAnTlVNX1BBRF9GT1dBUkRfU0xBU0gnLFxuICAgIDExMjogJ0YxJyxcbiAgICAxMTM6ICdGMicsXG4gICAgMTE0OiAnRjMnLFxuICAgIDExNTogJ0Y0JyxcbiAgICAxMTY6ICdGNScsXG4gICAgMTE3OiAnRjYnLFxuICAgIDExODogJ0Y3JyxcbiAgICAxMTk6ICdGOCcsXG4gICAgMTIwOiAnRjknLFxuICAgIDEyMTogJ0YxMCcsXG4gICAgMTIyOiAnRjExJyxcbiAgICAxMjM6ICdGMTInLFxuICAgIDE0NDogJ05VTV9MT0NLJyxcbiAgICAxNDU6ICdTQ1JPTExfTE9DSycsXG4gICAgMTg2OiBbJzsnLCc6J10sXG4gICAgMTg3OiBbJz0nLCcrJ10sXG4gICAgMTg4OiBbJywnLCc8J10sXG4gICAgMTg5OiBbJy0nLCdfJ10sXG4gICAgMTkwOiBbJy4nLCc+J10sXG4gICAgMTkxOiBbJy8nLCc/J10sXG4gICAgMTkyOiBbJ2AnLCd+J10sXG4gICAgMjE5OiBbJ1snLCd7J10sXG4gICAgMjIwOiBbJ1xcXFwnLCd8J10sXG4gICAgMjIxOiBbJ10nLCd9J10sXG4gICAgMjIyOiBbJ1xcJycsJ1wiJ11cbn07XG4iXX0=
