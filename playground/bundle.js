(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Mobile = require('./src/Mobile');

var _Mobile2 = _interopRequireDefault(_Mobile);

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

_Mobile2.default.addMetaTags();

var stage = new _Stage2.default(800, 600, {
  bgColor: '#222',
  fill: true
});
var draw = new _Draw2.default(stage.getCanvas());
var input = new _Input2.default(stage.getCanvas());
var ticker = new _Ticker2.default();
var rect = new _Rectangle2.default();
var fullscreen = new _Rectangle2.default();
fullscreen.setX(764);

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

rect.setFill('#48C');
ticker.onTick = function () {
  draw.clear('#EEE');
  draw.render(fullscreen);
  draw.render(rect);
};

input.addListener('click', toggleFullScreen, fullscreen);

input.addListener('click', function (e) {
  rect.setX(Math.random() * 800);
  rect.setY(Math.random() * 600);
}, rect);

},{"./src/Draw":2,"./src/Input":3,"./src/Mobile":4,"./src/Rectangle":5,"./src/Stage":7,"./src/Ticker":8}],2:[function(require,module,exports){
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
        this._imageSmoothingEnabled = true;

        this._context = this._originalContext;

        for (var method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
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
         * Calls an entity's render method passing the context
         *
         * @method Draw#render
         * @param  {Object} entity [description]
         */

    }, {
        key: 'render',
        value: function render(entity) {
            entity.render(this._context);
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

            return this;
        }
    }]);

    return Draw;
})();

exports.default = Draw;

},{"./lib/CanvasTransform":9}],3:[function(require,module,exports){
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
        this._document.addEventListener('tick', this._onTick, false);
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

                        this._queuedEvents.push(this._extendEvent(event, {
                            type: this._uiEvents.DRAG_END
                        }));
                    }

                    break;

                case this._uiEvents.MOUSE_MOVE:
                case this._uiEvents.TOUCH_MOVE:

                    if (this._canDrag) {
                        if (!this._isDragging) {
                            this._isDragging = true;

                            this._queuedEvents.push(this._extendEvent(event, {
                                type: this._uiEvents.DRAG_START
                            }));
                        }

                        this._queuedEvents.push(this._extendEvent(event, {
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
    }]);

    return Input;
})();

exports.default = Input;

},{"./lib/keycodes":10}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./Sprite":6}],6:[function(require,module,exports){
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
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

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

},{}],7:[function(require,module,exports){
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
         * @private
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

},{}],8:[function(require,module,exports){
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
            var delta = now - this._then;

            if (delta > this._interval) {
                // trim @then if it's more than @interval
                this._then = now - delta % this._interval;
                this._ticks += 1;

                this.onTick(delta / this._interval, this._ticks);

                // create and fire tick events
                var tickEvent = new CustomEvent('tick', {
                    detail: {
                        factor: delta / this._interval,
                        ticks: this._ticks
                    }
                });

                document.dispatchEvent(tickEvent);
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
         * @param {Integer} ticks  The amount of ticks that have accumulated
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
            requestAnimationFrame(this._update);
        }
    }]);

    return Ticker;
})();

exports.default = Ticker;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvTW9iaWxlLmpzIiwic3JjL1JlY3RhbmdsZS5qcyIsInNyYy9TcHJpdGUuanMiLCJzcmMvU3RhZ2UuanMiLCJzcmMvVGlja2VyLmpzIiwic3JjL2xpYi9DYW52YXNUcmFuc2Zvcm0uanMiLCJzcmMvbGliL2tleWNvZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ09BLGlCQUFPLFdBQVcsRUFBRSxDQUFDOztBQUVyQixJQUFJLEtBQUssR0FBRyxvQkFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzVCLFNBQU8sRUFBRSxNQUFNO0FBQ2YsTUFBSSxFQUFFLElBQUk7Q0FDYixDQUFDLENBQUM7QUFDSCxJQUFJLElBQUksR0FBRyxtQkFBUyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN2QyxJQUFJLEtBQUssR0FBRyxvQkFBVSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN6QyxJQUFJLE1BQU0sR0FBRyxzQkFBWSxDQUFDO0FBQzFCLElBQUksSUFBSSxHQUFHLHlCQUFlLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUcseUJBQWUsQ0FBQztBQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVyQixTQUFTLGdCQUFnQixHQUFHO0FBQzFCLE1BQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDMUIsTUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7QUFFaEMsTUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLG9CQUFvQixJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxLQUFLLENB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QUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRFLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RSxnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRGLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7OztpQ0FFUTtBQUNMLGdCQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUM7QUFDaEYsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLGdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLGdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixnQkFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENB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QUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxLQUFLO0FBQ1YsT0FBRyxFQUFFLEtBQUs7QUFDVixPQUFHLEVBQUUsS0FBSztBQUNWLE9BQUcsRUFBRSxVQUFVO0FBQ2YsT0FBRyxFQUFFLGFBQWE7QUFDbEIsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO0FBQ2YsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUM7Q0FDbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1vYmlsZSBmcm9tICcuL3NyYy9Nb2JpbGUnO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3JjL1N0YWdlJztcbmltcG9ydCBEcmF3IGZyb20gJy4vc3JjL0RyYXcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9zcmMvUmVjdGFuZ2xlJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi9zcmMvVGlja2VyJztcblxuTW9iaWxlLmFkZE1ldGFUYWdzKCk7XG5cbmxldCBzdGFnZSA9IG5ldyBTdGFnZSg4MDAsIDYwMCwge1xuICAgIGJnQ29sb3I6ICcjMjIyJyxcbiAgICBmaWxsOiB0cnVlXG59KTtcbmxldCBkcmF3ID0gbmV3IERyYXcoc3RhZ2UuZ2V0Q2FudmFzKCkpO1xubGV0IGlucHV0ID0gbmV3IElucHV0KHN0YWdlLmdldENhbnZhcygpKTtcbmxldCB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG5sZXQgcmVjdCA9IG5ldyBSZWN0YW5nbGUoKTtcbmxldCBmdWxsc2NyZWVuID0gbmV3IFJlY3RhbmdsZSgpO1xuZnVsbHNjcmVlbi5zZXRYKDc2NCk7XG5cbmZ1bmN0aW9uIHRvZ2dsZUZ1bGxTY3JlZW4oKSB7XG4gIHZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuID0gZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4gfHwgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbjtcbiAgdmFyIGNhbmNlbEZ1bGxTY3JlZW4gPSBkb2MuZXhpdEZ1bGxzY3JlZW4gfHwgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHwgZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuIHx8IGRvYy5tc0V4aXRGdWxsc2NyZWVuO1xuXG4gIGlmKCFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2MubXNGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgIHJlcXVlc3RGdWxsU2NyZWVuLmNhbGwoZG9jRWwpO1xuICB9XG4gIGVsc2Uge1xuICAgIGNhbmNlbEZ1bGxTY3JlZW4uY2FsbChkb2MpO1xuICB9XG59XG5cbnJlY3Quc2V0RmlsbCgnIzQ4QycpO1xudGlja2VyLm9uVGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBkcmF3LmNsZWFyKCcjRUVFJyk7XG4gICAgZHJhdy5yZW5kZXIoZnVsbHNjcmVlbik7XG4gICAgZHJhdy5yZW5kZXIocmVjdCk7XG59O1xuXG5pbnB1dC5hZGRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVGdWxsU2NyZWVuLCBmdWxsc2NyZWVuKTtcblxuaW5wdXQuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICByZWN0LnNldFgoTWF0aC5yYW5kb20oKSAqIDgwMCk7XG4gICAgcmVjdC5zZXRZKE1hdGgucmFuZG9tKCkgKiA2MDApO1xufSwgcmVjdCk7XG4iLCJpbXBvcnQgQ2FudmFzVHJhbnNmb3JtIGZyb20gJy4vbGliL0NhbnZhc1RyYW5zZm9ybSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIERyYXdcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC4gTWVyZ2VzIGNvbnRleHRcbiAqICAgICAgICAgICAgICBvYmplY3Qgd2l0aCBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICogQHJlcXVpcmVzICAgIENhbnZhc1RyYW5zZm9ybVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhcyBUaGUgYWN0aXZlIGNhbnZhcyBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsQ29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jYW52YXNYZm9ybSA9IG5ldyBDYW52YXNUcmFuc2Zvcm0odGhpcy5fb3JpZ2luYWxDb250ZXh0KTtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fb3JpZ2luYWxDb250ZXh0O1xuXG4gICAgICAgIGZvciAobGV0IG1ldGhvZCBpbiB0aGlzLl9jYW52YXNYZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFttZXRob2RdID0gdGhpcy5fY2FudmFzWGZvcm1bbWV0aG9kXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZW50aXJlIGNhbnZhcyBhbmQgb3B0aW9uYWxseSBmaWxscyB3aXRoIGEgY29sb3JcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNnZXRDb250ZXh0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgMkQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBhbiBlbnRpdHkncyByZW5kZXIgbWV0aG9kIHBhc3NpbmcgdGhlIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSkge1xuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQga2V5Y29kZXMgZnJvbSAnLi9saWIva2V5Y29kZXMnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBJbnB1dFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlIGNhbnZhc1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVudGl0eX0gY2FudmFzICAgICAgICAgICAgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzXVxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5jYW52YXNGaXRdICAgICAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JNb3VzZV0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yVG91Y2hdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvcktleWJvYXJkXSBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIGtleWJvYXJkIGV2ZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdHMuY2FudmFzRml0IHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvck1vdXNlID0gb3B0cy5saXN0ZW5Gb3JNb3VzZSB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JUb3VjaCA9IG9wdHMubGlzdGVuRm9yVG91Y2ggfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvcktleWJvYXJkID0gb3B0cy5saXN0ZW5Gb3JLZXlib2FyZCB8fCB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3VpRXZlbnRzID0ge1xuICAgICAgICAgICAgREJMX0NMSUNLOiAnZGJsY2xpY2snLFxuICAgICAgICAgICAgREJMX1RBUDogJ2RibHRhcCcsXG5cbiAgICAgICAgICAgIERSQUc6ICdkcmFnJyxcbiAgICAgICAgICAgIERSQUdfRU5EOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICBEUkFHX1NUQVJUOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICAgICAgICBUQVA6ICd0YXAnLFxuXG4gICAgICAgICAgICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgICAgICAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgVE9VQ0hfRU5EOiAndG91Y2hlbmQnLFxuXG4gICAgICAgICAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuXG4gICAgICAgICAgICBLRVlfVVA6ICdrZXl1cCcsXG4gICAgICAgICAgICBLRVlfRE9XTjogJ2tleWRvd24nXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGlzdGVuZXJzIHZhbHVlcyBhcmUgYXJyYXlzIG9mIG9iamVjdHMgY29udGFpbmluZyBoYW5kbGVycyBhbmQgKG9wdGlvbmFsKSB0YXJnZXRzXG4gICAgICAgIC8vIGVnOiB0aGlzLl9saXN0ZW5lcnMua2V5dXAgPSBbe1xuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsuLi59LFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogeyBuYW1lOiAnZm9vJywgeDogMzIsIHk6IDY0LCAuLi59XG4gICAgICAgIC8vICAgICB9XTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3VpRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdGhpcy5fdWlFdmVudHNba2V5XV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleWNvZGVzID0ga2V5Y29kZXM7XG5cbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uVGljayA9IHRoaXMuX29uVGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgdGhpcy5fb25UaWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZEtleWJvYXJkTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2tleXVwJywgJ2tleWRvd24nXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG1vdXNlIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkTW91c2VMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdWNoIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkVG91Y2hMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsndGFwJywgJ2RibHRhcCcsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSByYXRpbyBvZiB0aGUgY2FudmFzIGJhc2VkIG9uIHdpdGgvaGVnaHQgYXR0cnMgYW5kIGNzcyB3aWR0aC9oZWlnaHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2dldFNjYWxlRmFjdG9yXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgX2dldFNjYWxlRmFjdG9yKCkge1xuICAgICAgICBsZXQgZmFjdG9yID0gMTtcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gcGFyc2VJbnQodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgICAgICBmYWN0b3IgPSBjYW52YXNXaWR0aCAvIHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxMDAgLyBmYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgX2V4dGVuZEV2ZW50KGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBldmVudCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2godGhpcy5fZXh0ZW5kRXZlbnQoZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2godGhpcy5fZXh0ZW5kRXZlbnQoZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaCh0aGlzLl9leHRlbmRFdmVudChldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiB7IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNnZXRLZXlzRG93blxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRLZXlzRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNEb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1c2VyIHRvIHNldCBhIGN1c3RvbSBoaXQgdGVzdCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0SGl0VGVzdE1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSB1c2VyJ3MgaGl0IHRlc3QgbWV0aG9kXG4gICAgICovXG4gICAgc2V0SGl0VGVzdE1ldGhvZChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCNzZXRIaXRUZXN0TWV0aG9kIHBhcmFtZXRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gZm47XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgTW9iaWxlXG4gKiBAZGVzY3JpcHRpb24gQSBjbGFzcyB3aXRoIGhlbHBlcnMgZm9yIG1ha2luZyB0aGUgYXBwbGljYXRpb24gcGxheSBuaWNlIHdpdGggbW9iaWxlIGJyb3dzZXJzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYmlsZSB7XG4gICAgLyoqXG4gICAgICogW2FkZE1ldGFUYWdzIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgTW9iaWxlLmFkZE1ldGFUYWdzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkb2MgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRNZXRhVGFncyhkb2MgPSBkb2N1bWVudCkge1xuICAgICAgICB2YXIgaGVhZCA9IGRvYy5oZWFkO1xuICAgICAgICB2YXIgbWV0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGEubmFtZSA9ICd2aWV3cG9ydCc7XG4gICAgICAgIG1ldGEuY29udGVudCA9ICd3aWR0aD1kZXZpY2Utd2lkdGgsIHVzZXItc2NhbGFibGU9bm8sICcgK1xuICAgICAgICAgICAgJ2luaXRpYWwtc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPTAnO1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuXG4gICAgICAgIG1ldGEgPSBkb2MuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBtZXRhLm5hbWUgPSAnYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZSc7XG4gICAgICAgIG1ldGEuY29udGVudCA9ICd5ZXMnO1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuXG4gICAgICAgIG1ldGEgPSBkb2MuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBtZXRhLm5hbWUgPSAnbW9iaWxlLXdlYi1hcHAtY2FwYWJsZSc7XG4gICAgICAgIG1ldGEuY29udGVudCA9ICd5ZXMnO1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFJlY3RhbmdsZVxuICogQGV4dGVuZHMge0BsaW5rIFNwcml0ZX1cbiAqIEBkZXNjICAgIEEgc3ByaXRlIHRoYXQgcmVuZGVycyBhcyBhIHJlY3RhbmdsZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZmlsbCA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QodGhpcy5feCwgdGhpcy5feSwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fc3JjWCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1kgPSAwO1xuICAgICAgICB0aGlzLl9zcmNXaWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5feCArIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5feSArIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U3JjWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAc3RhdGljXG4gKi9cblNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdCA9ICdzb3VyY2Utb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFN0YWdlXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIGVsZW1lbnQuIGluY2x1ZGVkIGluIHRoZSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHVzZWQgZm9yIHRlc3RpbmcgYWdhaW5zdFxuICogICAgICAgICAgICAgIGEgdmlydHVhbCBkb20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW3dpZHRoXSAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbaGVpZ2h0XSAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0c10gICAgICAgICAgU3RhZ2Ugb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdHMucGFyZW50RWxdIFRoZSBlbGVtZW50IHdpdGggd2hpY2ggdG8gYXR0YWNoIHRoZSBjYW52YXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm9uZSBnaXZlbiB0aGUgYm9keSBpcyB1c2VkLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMuYmdDb2xvcl0gIFRoZSBwYXJlbnQgZWxlbWVudCdzIGJnIGNvbG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy5kb2N1bWVudF0gRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLndpbmRvd10gICBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtCb29sZWFufSAgICAgW29wdHMuZmlsbF0gICAgIFNldCB0byBmYWxzZSB0byBub3QgbWF4aW1hbGx5IGZpbGwgdmlld3BvcnQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyB0cnVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Iod2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSBvcHRzLmZpbGwgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLmZpbGw7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gb3B0cy5wYXJlbnRFbCB8fCB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRzLmJnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhZ2VFbGVtZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlU3RhZ2VFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5fc3RhZ2UgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fcGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fc3RhZ2UpO1xuXG4gICAgICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdGhpcy5fdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl92aWRlbyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIF9yZXNpemVFbGVtZW50IGZvciBzdGFnZSBlbGVtZW50c1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfaGFuZGxlUmVzaXplXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fdmlkZW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfcmVzaXplRWxlbWVudFxuICAgICAqIEBwYXJhbSAge0hUTUxFbnRpdHl9IGVsIFRoZSBlbGVtZW50IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIF9yZXNpemVFbGVtZW50KGVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gU3RhZ2UuY2VudGVyKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRDYW52YXNcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWF4aW1pemVzIGFuIGVsZW1lbnQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0IHZpYSBDU1MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmZpbGxcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZmlsbCh3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHZpZXdwb3J0SGVpZ2h0IC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gdmlld3BvcnRXaWR0aCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtlZXBzIHN0YWdlIGVsZW1lbnQgY2VudGVyZWQgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmNlbnRlclxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIHRvcCBhbmQgbGVmdFxuICAgICAqL1xuICAgIHN0YXRpYyBjZW50ZXIod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6ICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgICAgICAgIHRvcDogKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSAgW2Zwc10gICBUaGUgZGVzaXJlZCBmcmFtZXMgcGVyIHNlY29uZC4gRGVmYXVsdCBpcyAzMFxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKGZwcyA9IDMwLCBzdGFydCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fZnBzID0gZnBzO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDAwIC8gdGhpcy5fZnBzO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuXG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgICAgICAvLyB0cmltIEB0aGVuIGlmIGl0J3MgbW9yZSB0aGFuIEBpbnRlcnZhbFxuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMub25UaWNrKGRlbHRhIC8gdGhpcy5faW50ZXJ2YWwsIHRoaXMuX3RpY2tzKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBmaXJlIHRpY2sgZXZlbnRzXG4gICAgICAgICAgICBjb25zdCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcjogZGVsdGEgLyB0aGlzLl9pbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHRoaXMuX3RpY2tzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBmYWN0b3IgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzICBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIHRpY2tlclxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjc3RhcnRcbiAgICAgKi9cbiAgICBzdGFydCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FudmFzVHJhbnNmb3JtXG4gKiBAZGVzY3JpcHRpb24gUmV0YWlucyBjYW52YXMgdHJhbnNmb3JtYXRpb24gc3RhY2suXG4gKiAgICAgICAgICAgICAgQmFzaWNhbGx5IGEgZm9yayBmcm9tIFNpbW9uIFNhcnJpcyAtIHd3dy5zaW1vbnNhcnJpcy5jb20gLSBzYXJyaXNAYWNtLm9yZ1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgY2FudmFzJyBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbMSwwLDAsMSwwLDBdOyAvL2luaXRpYWxpemUgd2l0aCB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXRNYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdHJpeDtcbiAgICB9XG5cbiAgICBzZXRNYXRyaXgobSkge1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgY2xvbmVNYXRyaXgobSkge1xuICAgICAgICByZXR1cm4gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YWNrXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5jbG9uZU1hdHJpeCh0aGlzLmdldE1hdHJpeCgpKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG1hdHJpeCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICB9XG5cbiAgICByZXN0b3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF0cml4KG1hdHJpeCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzZXRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMl0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbM10sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSArPSB0aGlzLm1hdHJpeFswXSAqIHggKyB0aGlzLm1hdHJpeFsyXSAqIHk7XG4gICAgICAgIHRoaXMubWF0cml4WzVdICs9IHRoaXMubWF0cml4WzFdICogeCArIHRoaXMubWF0cml4WzNdICogeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZShyYWQpIHtcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIGMgKyB0aGlzLm1hdHJpeFsyXSAqIHM7XG4gICAgICAgIGxldCBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIGMgKyB0aGlzLm1hdHJpeFszXSAqIHM7XG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIC1zICsgdGhpcy5tYXRyaXhbMl0gKiBjO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiAtcyArIHRoaXMubWF0cml4WzNdICogYztcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzY2FsZShzeCwgc3kpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzFdICo9IHN4O1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSAqPSBzeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gKj0gc3k7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeCBleHRlbnNpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICByb3RhdGVEZWdyZWVzKGRlZykge1xuICAgICAgICBsZXQgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICB9XG5cbiAgICByb3RhdGVBYm91dChyYWQsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMucm90YXRlKHJhZCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlRGVncmVlc0Fib3V0KGRlZywgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGVEZWdyZWVzKGRlZyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIHRoaXMubSA9IFsxLDAsMCwxLDAsMF07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkobWF0cml4KSB7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzFdO1xuXG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgbGV0IG0yMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzNdO1xuXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNF07XG4gICAgICAgIGxldCBkeSA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNV07XG5cbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gZHg7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gZHk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICBsZXQgZCA9IDEgLyAodGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFszXSAtIHRoaXMubWF0cml4WzFdICogdGhpcy5tYXRyaXhbMl0pO1xuICAgICAgICBsZXQgbTAgPSB0aGlzLm1hdHJpeFszXSAqIGQ7XG4gICAgICAgIGxldCBtMSA9IC10aGlzLm1hdHJpeFsxXSAqIGQ7XG4gICAgICAgIGxldCBtMiA9IC10aGlzLm1hdHJpeFsyXSAqIGQ7XG4gICAgICAgIGxldCBtMyA9IHRoaXMubWF0cml4WzBdICogZDtcbiAgICAgICAgbGV0IG00ID0gZCAqICh0aGlzLm1hdHJpeFsyXSAqIHRoaXMubWF0cml4WzVdIC0gdGhpcy5tYXRyaXhbM10gKiB0aGlzLm1hdHJpeFs0XSk7XG4gICAgICAgIGxldCBtNSA9IGQgKiAodGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFs0XSAtIHRoaXMubWF0cml4WzBdICogdGhpcy5tYXRyaXhbNV0pO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0wO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0zO1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSA9IG00O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSA9IG01O1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSGVscGVyc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdHJhbnNmb3JtUG9pbnQoeCwgeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCAqIHRoaXMubWF0cml4WzBdICsgeSAqIHRoaXMubWF0cml4WzJdICsgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICB5OiB4ICogdGhpcy5tYXRyaXhbMV0gKyB5ICogdGhpcy5tYXRyaXhbM10gKyB0aGlzLm1hdHJpeFs1XVxuICAgICAgICB9O1xuICAgIH1cbn0iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICA4OiAnQkFDS1NQQUNFJyxcbiAgICA5OiAnVEFCJyxcbiAgICAxMzogJ0VOVEVSJyxcbiAgICAxNjogJ1NISUZUJyxcbiAgICAxNzogJ0NUUkwnLFxuICAgIDE4OiAnQUxUJyxcbiAgICAxOTogJ1BBVVNFX0JSRUFLJyxcbiAgICAyMDogJ0NBUFNfTE9DSycsXG4gICAgMjc6ICdFU0NBUEUnLFxuICAgIDMzOiAnUEFHRV9VUCcsXG4gICAgMzQ6ICdQQUdFX0RPV04nLFxuICAgIDM1OiAnRU5EJyxcbiAgICAzNjogJ0hPTUUnLFxuICAgIDM3OiAnTEVGVF9BUlJPVycsXG4gICAgMzg6ICdVUF9BUlJPVycsXG4gICAgMzk6ICdSSUdIVF9BUlJPVycsXG4gICAgNDA6ICdET1dOX0FSUk9XJyxcbiAgICA0NTogJ0lOU0VSVCcsXG4gICAgNDY6ICdERUxFVEUnLFxuICAgIDQ4OiBbMCwnKSddLFxuICAgIDQ5OiBbMSwnISddLFxuICAgIDUwOiBbMiwnQCddLFxuICAgIDUxOiBbMywnIyddLFxuICAgIDUyOiBbNCwnJCddLFxuICAgIDUzOiBbNSwnJSddLFxuICAgIDU0OiBbNiwnXiddLFxuICAgIDU1OiBbNywnJiddLFxuICAgIDU2OiBbOCwnKiddLFxuICAgIDU3OiBbOSwnKCddLFxuICAgIDY1OiAnQScsXG4gICAgNjY6ICdCJyxcbiAgICA2NzogJ0MnLFxuICAgIDY4OiAnRCcsXG4gICAgNjk6ICdFJyxcbiAgICA3MDogJ0YnLFxuICAgIDcxOiAnRycsXG4gICAgNzI6ICdIJyxcbiAgICA3MzogJ0knLFxuICAgIDc0OiAnSicsXG4gICAgNzU6ICdLJyxcbiAgICA3NjogJ0wnLFxuICAgIDc3OiAnTScsXG4gICAgNzg6ICdOJyxcbiAgICA3OTogJ08nLFxuICAgIDgwOiAnUCcsXG4gICAgODE6ICdRJyxcbiAgICA4MjogJ1InLFxuICAgIDgzOiAnUycsXG4gICAgODQ6ICdUJyxcbiAgICA4NTogJ1UnLFxuICAgIDg2OiAnVicsXG4gICAgODc6ICdXJyxcbiAgICA4ODogJ1gnLFxuICAgIDg5OiAnWScsXG4gICAgOTA6ICdaJyxcbiAgICA5MTogJ0xFRlRfV0lORE9XX0tFWScsXG4gICAgOTI6ICdSSUdIVF9XSU5ET1dfS0VZJyxcbiAgICA5MzogJ1NFTEVDVF9LRVknLFxuICAgIDk2OiAnTlVNX1BBRF8wJyxcbiAgICA5NzogJ05VTV9QQURfMScsXG4gICAgOTg6ICdOVU1fUEFEXzInLFxuICAgIDk5OiAnTlVNX1BBRF8zJyxcbiAgICAxMDA6ICdOVU1fUEFEXzQnLFxuICAgIDEwMTogJ05VTV9QQURfNScsXG4gICAgMTAyOiAnTlVNX1BBRF82JyxcbiAgICAxMDM6ICdOVU1fUEFEXzcnLFxuICAgIDEwNDogJ05VTV9QQURfOCcsXG4gICAgMTA1OiAnTlVNX1BBRF85JyxcbiAgICAxMDY6ICdOVU1fUEFEX0FTVEVSSVNLJyxcbiAgICAxMDc6ICdOVU1fUEFEX1BMVVMnLFxuICAgIDEwOTogJ05VTV9QQURfTUlOVVMnLFxuICAgIDExMTogJ05VTV9QQURfRk9XQVJEX1NMQVNIJyxcbiAgICAxMTI6ICdGMScsXG4gICAgMTEzOiAnRjInLFxuICAgIDExNDogJ0YzJyxcbiAgICAxMTU6ICdGNCcsXG4gICAgMTE2OiAnRjUnLFxuICAgIDExNzogJ0Y2JyxcbiAgICAxMTg6ICdGNycsXG4gICAgMTE5OiAnRjgnLFxuICAgIDEyMDogJ0Y5JyxcbiAgICAxMjE6ICdGMTAnLFxuICAgIDEyMjogJ0YxMScsXG4gICAgMTIzOiAnRjEyJyxcbiAgICAxNDQ6ICdOVU1fTE9DSycsXG4gICAgMTQ1OiAnU0NST0xMX0xPQ0snLFxuICAgIDE4NjogWyc7JywnOiddLFxuICAgIDE4NzogWyc9JywnKyddLFxuICAgIDE4ODogWycsJywnPCddLFxuICAgIDE4OTogWyctJywnXyddLFxuICAgIDE5MDogWycuJywnPiddLFxuICAgIDE5MTogWycvJywnPyddLFxuICAgIDE5MjogWydgJywnfiddLFxuICAgIDIxOTogWydbJywneyddLFxuICAgIDIyMDogWydcXFxcJywnfCddLFxuICAgIDIyMTogWyddJywnfSddLFxuICAgIDIyMjogWydcXCcnLCdcIiddXG59O1xuIl19
