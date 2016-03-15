(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Camera = require('./src/Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Canvas = require('./src/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Input = require('./src/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Stage = require('./src/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Rectangle = require('./src/shapes/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Text = require('./src/text/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Group = require('./src/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Ticker = require('./src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var camera = new _Camera2.default();
var stage = new _Stage2.default(800, 600, {
    bgColor: '#222',
    fill: true
});
var canvas = new _Canvas2.default(stage.getCanvas(), camera);
var input = new _Input2.default(stage.getCanvas());
var group = new _Group2.default();
var rect = new _Rectangle2.default().setFill('#999');
var text = new _Text2.default();
var ticker = new _Ticker2.default();

rect.setWidth(64);
rect.setHeight(64);
rect.setRotation(45);

text.setValue('foobar');
//text.setRotation(90);

group.addItem(rect);
group.addItem(text);

ticker.onTick = function (factor) {
    canvas.clear('#DDD');
    canvas.render(group);
};

},{"./src/Camera":2,"./src/Canvas":3,"./src/Group":5,"./src/Input":6,"./src/Stage":8,"./src/Ticker":9,"./src/shapes/Rectangle":11,"./src/text/Text":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Camera
 * @description Decides what gets rendered
 * @author      Chris Peters
 */

var Camera = function () {
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
}();

exports.default = Camera;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Canvas
 * @description Handles rendering entities onto the canvas element.
 * @author      Chris Peters
 *
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera instance
 */

var Canvas = function () {
    function Canvas(canvas, camera) {
        _classCallCheck(this, Canvas);

        this._canvas = canvas;
        this._camera = camera;
        this._context = this._canvas.getContext('2d');

        this.setImageSmoothing(true);
    }

    /**
     * Clears the entire canvas and optionally fills with a color
     *
     * @method Canvas#clear
     * @param  {String} [color] If passed, will fill the canvas with the color value
     */


    _createClass(Canvas, [{
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
         * @method Canvas#getContext
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
         * @method Canvas#render
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
         * @method Canvas#setImageSmoothing
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

    return Canvas;
}();

exports.default = Canvas;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Collection
 * @description Provides the sortable, iterable storage of entities that are
 *              gettable, settable, sortable, removable, etcera(ble) by name
 * @author      Chris Peters
 */

var Collection = function () {
    function Collection() {
        _classCallCheck(this, Collection);

        /**
         * @member {Array} The sorted list
         * @private
         */
        this._items = [];
    }

    /**
     * Returns the item { name, item } object
     *
     * @param  {String} name
     * @return {Object}
     * @private
     */


    _createClass(Collection, [{
        key: '_getRawItem',
        value: function _getRawItem(name) {
            var item = void 0;

            this._rawEach(function (iterItem, i, iterName) {
                if (name === iterName) {
                    item = iterItem;

                    return false;
                }
            });

            return item;
        }

        /**
         * Iterates the collection's sorted items. The raw item, index, name, and the
         * list being iterated are supplied to the provided function
         *
         * @param {Function} fn
         * @private
         */

    }, {
        key: '_rawEach',
        value: function _rawEach(fn) {
            for (var i = 0, len = this._items.length; i < len; i += 1) {
                if (fn(this._items[i], i, this._items[i].name, this._items) === false) {
                    break;
                }
            }
        }

        /**
         * Add an item with optional name
         *
         * @param  {Any}        item   The item to add
         * @param  {String}     [name] The optional name of the item
         * @return {Collection}
         */

    }, {
        key: 'addItem',
        value: function addItem(item, name) {
            name = name || '';

            this._items.push({
                item: item, name: name
            });

            return this;
        }

        /**
         * Add multiple items
         *
         * @param {...Object} items Can be the object itself or an object containing the entity and it's name
         *                          eg: <code>{ item: Entity, name: 'entityName' }</code>
         * @return {Collection}
         */

    }, {
        key: 'addItems',
        value: function addItems() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (_typeof(item.item) === 'object' && typeof item.name === 'string') {
                        // if item has item/name structure
                        this.addItem(item.item, item.name);
                    } else {
                        // for convenience allow user to add just item
                        this.addItem(item);
                    }
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

            return this;
        }

        /**
         * Iterates the collection's sorted items. The item, index, and name are supplied
         * to the provided function
         *
         * @param {Function} fn      The function to execute on the iterable
         * @param {Object}   [scope] The scope with which to execute the function
         */

    }, {
        key: 'each',
        value: function each(fn, scope) {
            fn = scope ? fn.bind(scope) : fn;

            for (var i = 0, len = this._items.length; i < len; i++) {
                var item = this._items[i];

                if (fn(item.item, i, item.name) === false) {
                    break;
                }
            }
        }

        /**
         * iterates items and return the ones that meet criteria
         *
         * @param  {Function} fn      Truth predicate
         * @param  {Object}   [scope] The scope with which to execute the function
         * @return {Array}
         */

    }, {
        key: 'filter',
        value: function filter(fn, scope) {
            var filteredItems = [];

            this.each(function (item, i, name) {
                var predicate = fn(item, i, name);

                if (predicate) {
                    filteredItems.push(item);
                }
            }, scope);

            return filteredItems;
        }

        /**
         * Returns a list of just the items
         *
         * @return {Array}
         */

    }, {
        key: 'getItemArray',
        value: function getItemArray() {
            return this._items.map(function (item) {
                return item.item;
            });
        }

        /**
         * Returns an existing item by name, or undefined if the name is not found
         *
         * @param  {String} name The name of the item
         * @return {Any}
         */

    }, {
        key: 'getItem',
        value: function getItem(name) {
            var item = void 0;

            this.each(function (iterItem, i, iterName) {
                if (name === iterName) {
                    item = iterItem;

                    return false;
                }
            });

            return item;
        }

        /**
         * Returns an existing item by index
         *
         * @param  {Integer} index
         * @return {Any}
         */

    }, {
        key: 'getItemAt',
        value: function getItemAt(index) {
            return this._items[index].item;
        }

        /**
         * Returns the count of items in collection
         *
         * @return {Integer}
         */

    }, {
        key: 'getItemCount',
        value: function getItemCount() {
            return this._items.length;
        }

        /**
         * Returns an item's current index
         *
         * @param  {String} name
         * @return {Integer}
         */

    }, {
        key: 'getItemIndex',
        value: function getItemIndex(name) {
            var index = void 0;

            this.each(function (iterItem, i, iterName) {
                if (name === iterName) {
                    index = i;

                    return false;
                }
            });

            return index;
        }

        /**
         * Removes all items from collection
         */

    }, {
        key: 'removeAllItems',
        value: function removeAllItems() {
            this._items = [];
        }

        /**
         * Removes an object by name
         *
         * @method SW.Collection.prototype.removeItem
         * @param  {String}  name
         * @return {Boolean} Returns true if item removed, false if not
         */

    }, {
        key: 'removeItem',
        value: function removeItem(name) {
            var removed = false;

            this._rawEach(function (iterItem, i, iterName, items) {
                if (name === iterName) {
                    iterItem = null;
                    items.splice(i, 1);
                    removed = true;

                    // break out of loop
                    return false;
                }
            });

            return removed;
        }

        /**
         * Assigns a new value to an existing item
         *
         * @param {String} name  The name of the object to modify
         * @param {Any}    value The new value
         */

    }, {
        key: 'setItem',
        value: function setItem(name, value) {
            this._rawEach(function (iterItem, i, iterName) {
                if (name === iterName) {
                    iterItem.item = value;

                    // break out of loop
                    return false;
                }
            });
        }

        /**
         * Moves item to new index
         *
         * @param {String}  name  The name of the object being moved
         * @param {Integer} index The item's new index
         */

    }, {
        key: 'setItemIndex',
        value: function setItemIndex(name, index) {
            var item = void 0;
            var currentIndex = this.getItemIndex(name);

            if (index === currentIndex) {
                return;
            }

            item = this._getRawItem(name);
            this.removeItem(name);
            this._items.splice(index, 0, item);
        }
    }]);

    return Collection;
}();

exports.default = Collection;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class       Group
 * @description Provides a transformation hierarchy for {@link Collection}s
 * @extends     Collection
 * @requires    Sprite
 * @author      Chris Peters
 *
 */

var Group = function (_Collection) {
    _inherits(Group, _Collection);

    function Group() {
        _classCallCheck(this, Group);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this));
    }

    /**
     * Renders all children recursively on top of own transformation stack
     *
     * @method Group#render
     * @param  {Object} context The 2d context object
     */


    _createClass(Group, [{
        key: 'render',
        value: function render(context) {
            context.save();

            this.each(function (item) {
                item.render(context);
            }, this);

            context.restore();
        }
    }]);

    return Group;
}(_Collection3.default);

exports.default = Group;

},{"./Collection":4,"./Sprite":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keycodes = require('./lib/keycodes');

var _keycodes2 = _interopRequireDefault(_keycodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @param {Object}     [opts.window]            window object for testing
 * @param {Object}     [opts.document]          document object for testing
 */

var Input = function () {
    function Input(canvas) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Input);

        // options
        this._canvas = canvas;
        this._canvasFit = opts.canvasFit || true;
        this._listenForMouse = opts.listenForMouse || true;
        this._listenForTouch = opts.listenForTouch || false;
        this._listenForKeyboard = opts.listenForKeyboard || true;
        this._window = opts.window || window;
        this._document = opts.document || document;

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
            var canvasWidth = void 0;

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
            var dup = void 0;

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
}();

exports.default = Input;

},{"./lib/keycodes":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 *
 * @param {Integer} [x] The initial x position. Default is 0
 * @param {Integer} [y] The initial y position. Default is 0
 */

var Sprite = function () {
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
                maxX: this._x + this._width * this._scaleX,
                maxY: this._y + this._height * this._scaleY,
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
            return this._rotation * Math.PI / 180;
        }

        /**
         * @method Sprite#getRotation
         * @return {Float}
         */

    }, {
        key: 'getRotationRadians',
        value: function getRotationRadians() {
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
         * [render description]
         * @method render
         * @param  {[type]} context [description]
         * @return {[type]}         [description]
         */

    }, {
        key: 'render',
        value: function render(context) {
            context.translate(this._x - this._width / 2, this._y - this._height / 2);
            context.scale(this._scaleX, this._scaleY);

            if (this._rotation !== 0) {
                context.translate(this._width / 2, this._height / 2);
                context.rotate(this._rotation);
                context.translate(-(this._width / 2), -(this._height / 2));
            }
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
            this._rotation = val * Math.PI / 180;

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
}();

/**
 * @member Sprite._compositeDefault
 * @type {String}
 */


Sprite._compositeDefault = 'source-over';

exports.default = Sprite;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Stage = function () {
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

            this._textfield = this._document.createElement('input');
            this._textfield.type = 'text';
            this._textfield.style.display = 'none';
            // TODO verify value 'none'
            this._textfield.autocapitalize = 'none';
            this._textfield.id = 'textfield';
            this._stage.appendChild(this._textfield);

            this._video = this._document.createElement('video');
            this._video.id = 'video';
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

                var _top = _Stage$center.top;
                var _left = _Stage$center.left;


                el.style.top = Math.round(_top) + 'px';
                el.style.left = Math.round(_left) + 'px';
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
            var offsetWidth = void 0;
            var offsetHeight = void 0;

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
}();

exports.default = Stage;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author      Chris Peters
 *
 * @param {Boolean} [start]         Whether to start on instantiate. Default is true
 * @param {Object}  [opts]          Options
 * @param {Object}  [opts.window]   window object for testing
 * @param {Object}  [opts.document] document object for testing
 */

var Ticker = function () {
    function Ticker() {
        var start = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Ticker);

        this._window = opts.window || window;
        this._document = opts.document || document;
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

            var evtObject = {
                detail: {
                    delta: delta,
                    ticks: this._ticks
                }
            };

            // create and fire tick events and execute callbacks
            var tickEvent = new CustomEvent('pretick', evtObject);
            this.onPreTick(delta, this._ticks);
            this._document.dispatchEvent(tickEvent);

            this.onTick(delta, this._ticks);
            tickEvent = new CustomEvent('tick', evtObject);
            this._document.dispatchEvent(tickEvent);

            this.onPostTick(delta, this._ticks);
            tickEvent = new CustomEvent('posttick', evtObject);
            this._document.dispatchEvent(tickEvent);

            requestAnimationFrame(this._update);
        }

        /**
         * A callback executed pre each tick.
         *
         * @method Ticker#onPreTick
         * @param {Integer} delta The time elapsed between ticks.
         *                        Multiply against gameplay elements for consistent
         *                        movement.
         * @param {Integer} ticks The amount of ticks that have accumulated
         */

    }, {
        key: 'onPreTick',
        value: function onPreTick() {}

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
         * A callback executed post tick.
         *
         * @method Ticker#onPostTick
         * @param {Integer} delta The time elapsed between ticks.
         *                        Multiply against gameplay elements for consistent
         *                        movement.
         * @param {Integer} ticks The amount of ticks that have accumulated
         */

    }, {
        key: 'onPostTick',
        value: function onPostTick() {}

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
}();

exports.default = Ticker;

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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = require('../Sprite');

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

var Rectangle = function (_Sprite) {
    _inherits(Rectangle, _Sprite);

    function Rectangle() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Rectangle);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this, x, y));

        _this._fill = '#000';
        _this._stroke = '';
        return _this;
    }

    _createClass(Rectangle, [{
        key: 'render',
        value: function render(context) {
            context.save();
            _get(Object.getPrototypeOf(Rectangle.prototype), 'render', this).call(this, context);

            if (this._fill) {
                context.fillStyle = this._fill;
                context.fillRect(0, 0, this._width, this._height);
            }

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(0, 0, this._width, this._height);
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

            return this;
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
            this._stroke = val;

            return this;
        }
    }]);

    return Rectangle;
}(_Sprite3.default);

exports.default = Rectangle;

},{"../Sprite":7}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = require('../Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class   TextInput
 * @desc    Renders an html textfield element
 * @extends Sprite
 * @author  Chris Peters
 */

var Text = function (_Sprite) {
    _inherits(Text, _Sprite);

    function Text() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, x, y));

        _this._value = value;
        _this._size = 16;
        _this._font = 'sans-serif';
        _this._fill = '#000';
        _this._stroke = '';
        return _this;
    }

    _createClass(Text, [{
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }

        /**
         * [setFill description]
         *
         * @method Text#setFill
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
         * @method Text#setStroke
         * @param  {String} val The stroke color hex, rgb, rgba, etc.
         */

    }, {
        key: 'setStroke',
        value: function setStroke(val) {
            this._stroke = val;
        }
    }, {
        key: 'setValue',
        value: function setValue(val) {
            this._value = val;
        }
    }, {
        key: 'render',
        value: function render(context) {
            context.save();
            _get(Object.getPrototypeOf(Text.prototype), 'render', this).call(this, context);

            context.font = this._size + 'px ' + this._font;

            if (this._fill) {
                context.fillStyle = this._fill;
                context.fillText(this._value, 0, 0);
            }

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeText(this._value, 0, 0);
            }

            context.restore();
        }
    }]);

    return Text;
}(_Sprite3.default);

exports.default = Text;

},{"../Sprite":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9TcHJpdGUuanMiLCJzcmMvU3RhZ2UuanMiLCJzcmMvVGlja2VyLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyIsInNyYy9zaGFwZXMvUmVjdGFuZ2xlLmpzIiwic3JjL3RleHQvVGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLHNCQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQzVCLGFBQVMsTUFBVDtBQUNBLFVBQU0sSUFBTjtDQUZRLENBQVI7QUFJSixJQUFJLFNBQVMscUJBQVcsTUFBTSxTQUFOLEVBQVgsRUFBOEIsTUFBOUIsQ0FBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxNQUFNLFNBQU4sRUFBVixDQUFSO0FBQ0osSUFBSSxRQUFRLHFCQUFSO0FBQ0osSUFBSSxPQUFPLDBCQUFXLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBUDtBQUNKLElBQUksT0FBTyxvQkFBUDtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixLQUFLLFFBQUwsQ0FBYyxFQUFkO0FBQ0EsS0FBSyxTQUFMLENBQWUsRUFBZjtBQUNBLEtBQUssV0FBTCxDQUFpQixFQUFqQjs7QUFFQSxLQUFLLFFBQUwsQ0FBYyxRQUFkOzs7QUFHQSxNQUFNLE9BQU4sQ0FBYyxJQUFkO0FBQ0EsTUFBTSxPQUFOLENBQWMsSUFBZDs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsVUFBVSxNQUFWLEVBQWtCO0FBQzlCLFdBQU8sS0FBUCxDQUFhLE1BQWIsRUFEOEI7QUFF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QUksYUFBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksU0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksTUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksVUFBSjtBQUNBLFFBQUksYUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxpQkFBSjtBQUNBLFFBQUksa0JBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUw7Ozs7Ozs7Ozs7Ozs7O0FDcEdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCOzs7QUFDakIsYUFEaUIsU0FDakIsR0FBMEI7WUFBZCwwREFBSSxpQkFBVTtZQUFQLDBEQUFJLGlCQUFHOzs4QkFEVCxXQUNTOzsyRUFEVCxzQkFFUCxHQUFHLElBRGE7O0FBR3RCLGNBQUssS0FBTCxHQUFhLE1BQWIsQ0FIc0I7QUFJdEIsY0FBSyxPQUFMLEdBQWUsRUFBZixDQUpzQjs7S0FBMUI7O2lCQURpQjs7K0JBUVYsU0FBUztBQUNaLG9CQUFRLElBQVIsR0FEWTtBQUVaLHVDQVZhLGlEQVVBLFFBQWIsQ0FGWTs7QUFJWixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNaLHdCQUFRLFNBQVIsR0FBb0IsS0FBSyxLQUFMLENBRFI7QUFFWix3QkFBUSxRQUFSLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLEtBQUssTUFBTCxFQUFhLEtBQUssT0FBTCxDQUFwQyxDQUZZO2FBQWhCOztBQUtBLGdCQUFJLEtBQUssT0FBTCxFQUFjO0FBQ2Qsd0JBQVEsV0FBUixHQUFzQixLQUFLLE9BQUwsQ0FEUjtBQUVkLHdCQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsS0FBSyxNQUFMLEVBQWEsS0FBSyxPQUFMLENBQXRDLENBRmM7YUFBbEI7O0FBS0Esb0JBQVEsT0FBUixHQWRZOzs7Ozs7Ozs7Ozs7Z0NBdUJSLEtBQUs7QUFDVCxpQkFBSyxLQUFMLEdBQWEsR0FBYixDQURTOztBQUdULG1CQUFPLElBQVAsQ0FIUzs7Ozs7Ozs7Ozs7O2tDQVlILEtBQUs7QUFDWCxpQkFBSyxPQUFMLEdBQWUsR0FBZixDQURXOztBQUdYLG1CQUFPLElBQVAsQ0FIVzs7OztXQTNDRTs7Ozs7Ozs7Ozs7Ozs7OztBQ1JyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFxQjs7O0FBQ2pCLGFBRGlCLElBQ2pCLEdBQXNDO1lBQTFCLDhEQUFRLGtCQUFrQjtZQUFkLDBEQUFJLGlCQUFVO1lBQVAsMERBQUksaUJBQUc7OzhCQURyQixNQUNxQjs7MkVBRHJCLGlCQUVWLEdBQUcsSUFENEI7O0FBR2xDLGNBQUssTUFBTCxHQUFjLEtBQWQsQ0FIa0M7QUFJbEMsY0FBSyxLQUFMLEdBQWEsRUFBYixDQUprQztBQUtsQyxjQUFLLEtBQUwsR0FBYSxZQUFiLENBTGtDO0FBTWxDLGNBQUssS0FBTCxHQUFhLE1BQWIsQ0FOa0M7QUFPbEMsY0FBSyxPQUFMLEdBQWUsRUFBZixDQVBrQzs7S0FBdEM7O2lCQURpQjs7bUNBV047QUFDUCxtQkFBTyxLQUFLLE1BQUwsQ0FEQTs7Ozs7Ozs7Ozs7O2dDQVVILEtBQUs7QUFDVCxpQkFBSyxLQUFMLEdBQWEsR0FBYixDQURTOzs7Ozs7Ozs7Ozs7a0NBVUgsS0FBSztBQUNYLGlCQUFLLE9BQUwsR0FBZSxHQUFmLENBRFc7Ozs7aUNBSU4sS0FBSztBQUNWLGlCQUFLLE1BQUwsR0FBYyxHQUFkLENBRFU7Ozs7K0JBSVAsU0FBUztBQUNmLG9CQUFRLElBQVIsR0FEZTtBQUVaLHVDQXpDYSw0Q0F5Q0EsUUFBYixDQUZZOztBQUlaLG9CQUFRLElBQVIsR0FBa0IsS0FBSyxLQUFMLFdBQWdCLEtBQUssS0FBTCxDQUp0Qjs7QUFNWixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNaLHdCQUFRLFNBQVIsR0FBb0IsS0FBSyxLQUFMLENBRFI7QUFFWix3QkFBUSxRQUFSLENBQWlCLEtBQUssTUFBTCxFQUFhLENBQTlCLEVBQWlDLENBQWpDLEVBRlk7YUFBaEI7O0FBS0EsZ0JBQUksS0FBSyxPQUFMLEVBQWM7QUFDZCx3QkFBUSxXQUFSLEdBQXNCLEtBQUssT0FBTCxDQURSO0FBRWQsd0JBQVEsVUFBUixDQUFtQixLQUFLLE1BQUwsRUFBYSxDQUFoQyxFQUFtQyxDQUFuQyxFQUZjO2FBQWxCOztBQUtBLG9CQUFRLE9BQVIsR0FoQlk7Ozs7V0F2Q0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbWVyYSBmcm9tICcuL3NyYy9DYW1lcmEnO1xuaW1wb3J0IENhbnZhcyBmcm9tICcuL3NyYy9DYW52YXMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdCBmcm9tICcuL3NyYy9zaGFwZXMvUmVjdGFuZ2xlJztcbmltcG9ydCBUZXh0IGZyb20gJy4vc3JjL3RleHQvVGV4dCc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9zcmMvR3JvdXAnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGNhbnZhcyA9IG5ldyBDYW52YXMoc3RhZ2UuZ2V0Q2FudmFzKCksIGNhbWVyYSk7XG5sZXQgaW5wdXQgPSBuZXcgSW5wdXQoc3RhZ2UuZ2V0Q2FudmFzKCkpO1xubGV0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG5sZXQgcmVjdCA9IG5ldyBSZWN0KCkuc2V0RmlsbCgnIzk5OScpO1xubGV0IHRleHQgPSBuZXcgVGV4dCgpO1xubGV0IHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcblxucmVjdC5zZXRXaWR0aCg2NCk7XG5yZWN0LnNldEhlaWdodCg2NCk7XG5yZWN0LnNldFJvdGF0aW9uKDQ1KTtcblxudGV4dC5zZXRWYWx1ZSgnZm9vYmFyJyk7XG4vL3RleHQuc2V0Um90YXRpb24oOTApO1xuXG5ncm91cC5hZGRJdGVtKHJlY3QpO1xuZ3JvdXAuYWRkSXRlbSh0ZXh0KTtcblxudGlja2VyLm9uVGljayA9IGZ1bmN0aW9uIChmYWN0b3IpIHtcbiAgICBjYW52YXMuY2xlYXIoJyNEREQnKTtcbiAgICBjYW52YXMucmVuZGVyKGdyb3VwKTtcbn07XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBEZWNpZGVzIHdoYXQgZ2V0cyByZW5kZXJlZFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXMgVGhlIGFjdGl2ZSBjYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtDYW1lcmF9ICAgICAgY2FtZXJhIFRoZSBjYW1lcmEgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIHRoaXMuc2V0SW1hZ2VTbW9vdGhpbmcodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBlbnRpcmUgY2FudmFzIGFuZCBvcHRpb25hbGx5IGZpbGxzIHdpdGggYSBjb2xvclxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjY2xlYXJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjb2xvcl0gSWYgcGFzc2VkLCB3aWxsIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIGNsZWFyKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNnZXRDb250ZXh0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgMkQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPZmZzZXRzIGNhbnZhcyBiYXNlZCBvbiBjYW1lcmEgYW5kIGNhbGxzIGFuIGVudGl0eSdzIHJlbmRlciBtZXRob2QgcGFzc2luZyB0aGUgY29udGV4dC5cbiAgICAgKiBTYXZlcyBhbmQgcmVzdG9yZXMgY29udGV4dCBhbmQgYmVnaW5uaW5nIGFuZCBlbmQgb2Ygb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlbnRpdHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihlbnRpdHkpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX2NhbWVyYS5nZXRYKCksIC10aGlzLl9jYW1lcmEuZ2V0WSgpKTtcbiAgICAgICAgZW50aXR5LnJlbmRlcih0aGlzLl9jb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbnRleHQgaW1hZ2Ugc21vb3RoaW5nXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb2xsZWN0aW9uXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgdGhlIHNvcnRhYmxlLCBpdGVyYWJsZSBzdG9yYWdlIG9mIGVudGl0aWVzIHRoYXQgYXJlXG4gKiAgICAgICAgICAgICAgZ2V0dGFibGUsIHNldHRhYmxlLCBzb3J0YWJsZSwgcmVtb3ZhYmxlLCBldGNlcmEoYmxlKSBieSBuYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IFRoZSBzb3J0ZWQgbGlzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtIHsgbmFtZSwgaXRlbSB9IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFJhd0l0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKGZ1bmN0aW9uKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIHJhdyBpdGVtLCBpbmRleCwgbmFtZSwgYW5kIHRoZVxuICAgICAqIGxpc3QgYmVpbmcgaXRlcmF0ZWQgYXJlIHN1cHBsaWVkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yYXdFYWNoKGZuKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZm4odGhpcy5faXRlbXNbaV0sIGksIHRoaXMuX2l0ZW1zW2ldLm5hbWUsIHRoaXMuX2l0ZW1zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBpdGVtIHdpdGggb3B0aW9uYWwgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7QW55fSAgICAgICAgaXRlbSAgIFRoZSBpdGVtIHRvIGFkZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFtuYW1lXSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbShpdGVtLCBuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgaXRlbSwgbmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbXVsdGlwbGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBpdGVtcyBDYW4gYmUgdGhlIG9iamVjdCBpdHNlbGYgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBhbmQgaXQncyBuYW1lXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGVnOiA8Y29kZT57IGl0ZW06IEVudGl0eSwgbmFtZTogJ2VudGl0eU5hbWUnIH08L2NvZGU+XG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtcyguLi5pdGVtcykge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uaXRlbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdGVtIGhhcyBpdGVtL25hbWUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0uaXRlbSwgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGNvbnZlbmllbmNlIGFsbG93IHVzZXIgdG8gYWRkIGp1c3QgaXRlbVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgaXRlbSwgaW5kZXgsIGFuZCBuYW1lIGFyZSBzdXBwbGllZFxuICAgICAqIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gICAgICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB0aGUgaXRlcmFibGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZWFjaChmbiwgc2NvcGUpIHtcbiAgICAgICAgZm4gPSBzY29wZSA/IGZuLmJpbmQoc2NvcGUpIDogZm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBpZiAoZm4oaXRlbS5pdGVtLCBpLCBpdGVtLm5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZXMgaXRlbXMgYW5kIHJldHVybiB0aGUgb25lcyB0aGF0IG1lZXQgY3JpdGVyaWFcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRydXRoIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZmlsdGVyKGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSwgaSwgbmFtZSk9PiB7XG4gICAgICAgICAgICBsZXQgcHJlZGljYXRlID0gZm4oaXRlbSwgaSwgbmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNjb3BlKTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBqdXN0IHRoZSBpdGVtc1xuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SXRlbUFycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubWFwKChpdGVtKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLml0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBuYW1lLCBvciB1bmRlZmluZWQgaWYgdGhlIG5hbWUgaXMgbm90IGZvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBpbmRleFxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2luZGV4XS5pdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvdW50IG9mIGl0ZW1zIGluIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlbSdzIGN1cnJlbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUluZGV4KG5hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gY29sbGVjdGlvblxuICAgICAqL1xuICAgIHJlbW92ZUFsbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gb2JqZWN0IGJ5IG5hbWVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU1cuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgaXRlbSByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKG5hbWUpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUsIGl0ZW1zKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIG5ldyB2YWx1ZSB0byBhbiBleGlzdGluZyBpdGVtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBtb2RpZnlcbiAgICAgKiBAcGFyYW0ge0FueX0gICAgdmFsdWUgVGhlIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEl0ZW0obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtLml0ZW0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBpdGVtIHRvIG5ldyBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IGJlaW5nIG1vdmVkXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBUaGUgaXRlbSdzIG5ldyBpbmRleFxuICAgICAqL1xuICAgIHNldEl0ZW1JbmRleChuYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG5hbWUpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtID0gdGhpcy5fZ2V0UmF3SXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbic7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgR3JvdXBcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBhIHRyYW5zZm9ybWF0aW9uIGhpZXJhcmNoeSBmb3Ige0BsaW5rIENvbGxlY3Rpb259c1xuICogQGV4dGVuZHMgICAgIENvbGxlY3Rpb25cbiAqIEByZXF1aXJlcyAgICBTcHJpdGVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHQgVGhlIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVuZGVyKGNvbnRleHQpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQga2V5Y29kZXMgZnJvbSAnLi9saWIva2V5Y29kZXMnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBJbnB1dFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlIGNhbnZhc1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVudGl0eX0gY2FudmFzICAgICAgICAgICAgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzXVxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5jYW52YXNGaXRdICAgICAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JNb3VzZV0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yVG91Y2hdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvcktleWJvYXJkXSBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIGtleWJvYXJkIGV2ZW50c1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy53aW5kb3ddICAgICAgICAgICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy5kb2N1bWVudF0gICAgICAgICAgZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdHMgPSB7fSkge1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0cy5jYW52YXNGaXQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yTW91c2UgPSBvcHRzLmxpc3RlbkZvck1vdXNlIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvclRvdWNoID0gb3B0cy5saXN0ZW5Gb3JUb3VjaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQgPSBvcHRzLmxpc3RlbkZvcktleWJvYXJkIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIHRoaXMuX3VpRXZlbnRzID0ge1xuICAgICAgICAgICAgREJMX0NMSUNLOiAnZGJsY2xpY2snLFxuICAgICAgICAgICAgREJMX1RBUDogJ2RibHRhcCcsXG5cbiAgICAgICAgICAgIERSQUc6ICdkcmFnJyxcbiAgICAgICAgICAgIERSQUdfRU5EOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICBEUkFHX1NUQVJUOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICAgICAgICBUQVA6ICd0YXAnLFxuXG4gICAgICAgICAgICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgICAgICAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgVE9VQ0hfRU5EOiAndG91Y2hlbmQnLFxuXG4gICAgICAgICAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuXG4gICAgICAgICAgICBLRVlfVVA6ICdrZXl1cCcsXG4gICAgICAgICAgICBLRVlfRE9XTjogJ2tleWRvd24nXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGlzdGVuZXJzIHZhbHVlcyBhcmUgYXJyYXlzIG9mIG9iamVjdHMgY29udGFpbmluZyBoYW5kbGVycyBhbmQgKG9wdGlvbmFsKSB0YXJnZXRzXG4gICAgICAgIC8vIGVnOiB0aGlzLl9saXN0ZW5lcnMua2V5dXAgPSBbe1xuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsuLi59LFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogeyBuYW1lOiAnZm9vJywgeDogMzIsIHk6IDY0LCAuLi59XG4gICAgICAgIC8vICAgICB9XTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3VpRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdGhpcy5fdWlFdmVudHNba2V5XV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleWNvZGVzID0ga2V5Y29kZXM7XG4gICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IHt9O1xuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uVGljayA9IHRoaXMuX29uVGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgdGhpcy5fb25UaWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZEtleWJvYXJkTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2tleXVwJywgJ2tleWRvd24nXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG1vdXNlIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkTW91c2VMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdWNoIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkVG91Y2hMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsndGFwJywgJ2RibHRhcCcsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSByYXRpbyBvZiB0aGUgY2FudmFzIGJhc2VkIG9uIHdpdGgvaGVnaHQgYXR0cnMgYW5kIGNzcyB3aWR0aC9oZWlnaHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2dldFNjYWxlRmFjdG9yXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgX2dldFNjYWxlRmFjdG9yKCkge1xuICAgICAgICBsZXQgZmFjdG9yID0gMTtcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gcGFyc2VJbnQodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgICAgICBmYWN0b3IgPSBjYW52YXNXaWR0aCAvIHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxMDAgLyBmYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBvaW50IGlzIGluc2lkZSByZWN0YW5nbGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hpdFRlc3RcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvdW5kaW5nQm94IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlDb2RlOiBpbnB1dEV2ZW50LmtleUNvZGUsXG4gICAgICAgICAgICBrZXlOYW1lOiB0eXBlb2Yga2V5TmFtZSA9PT0gJ29iamVjdCcgJiYga2V5TmFtZS5sZW5ndGggP1xuICAgICAgICAgICAgICAgIGtleU5hbWVbMF0gOlxuICAgICAgICAgICAgICAgIGtleU5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX0RPV046XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV0gPSBpbnB1dEV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9VUDpcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5rZXlzRG93biA9IHRoaXMuZ2V0S2V5c0Rvd24oKTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICogQ3JlYXRlcyBldmVudCBvYmplY3RzIHdpdGggeC95IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNjYWxpbmcgYW5kIGFic1gvYWJzWSBmb3JcbiAgICAgKiBhYnNvbHV0ZSB4L3kgcmVnYXJkbGVzcyBvZiBzY2FsZSBvZmZzZXRcbiAgICAgKiBPbmx5IHVzZXMgZmlyc3QgdG91Y2ggZXZlbnQsIHRodXMgbm90IGN1cnJlbnRseSBzdXBwb3J0aW5nIG11bHRpLXRvdWNoXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IFRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX2hhbmRsZU1vdXNlQW5kVG91Y2goaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gdGhpcy5fY2FudmFzRml0ID8gdGhpcy5fZ2V0U2NhbGVGYWN0b3IoKSA6IDE7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgIGlmIChpbnB1dEV2ZW50Lmhhc093blByb3BlcnR5KCd0b3VjaGVzJykpIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvb3JkaW5hdGUgcG9zaXRpb25zIHJlbGF0aXZlIHRvIGNhbnZhcyBzY2FsaW5nXG4gICAgICAgIGV2ZW50LnggPSBNYXRoLnJvdW5kKGV2ZW50LmFic1ggKiBzY2FsZUZhY3Rvcik7XG4gICAgICAgIGV2ZW50LnkgPSBNYXRoLnJvdW5kKGV2ZW50LmFic1kgKiBzY2FsZUZhY3Rvcik7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX0RPV046XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX1NUQVJUOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9VUDpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfRU5EOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX0VORFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfTU9WRTpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfTU9WRTpcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19TVEFSVFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBkdXBsaWNhdGUgaGFuZGxlciBpbiB0aGUgbGlzdGVuZXIgdHlvZSBiZWluZyBhZGRlZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaXNEdXBsaWNhdGVIYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXIgIFRoZSBoYW5kbGVyIHRvIGNoZWNrXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgIGhhbmRsZXJzIFRoZSBoYW5kbGVycyBvZiB0aGUgbGlzdGVuZXIgdHlwZSBiZWluZyBhZGRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgIGxldCBkdXAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gaGFuZGxlck9iamVjdC5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYWxsIHF1ZXVlZCBldmVudHMuIFBhc3NlcyB0aGUgZmFjdG9yIGFuZCB0aWNrcyBmcm9tIHtAbGluayBUaWNrZXJ9XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19vblRpY2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGUgVGhlIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9vblRpY2soZSkge1xuICAgICAgICBmb3IgKGxldCBldmVudCBvZiB0aGlzLl9xdWV1ZWRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJIYW5kbGVycyhldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleGVjdXRlcyBoYW5kbGVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQncyB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I190cmlnZ2VySGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmlnZ2VySGFuZGxlcnMoZXZlbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0pIHtcblxuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdFRlc3QgPSB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCB8fCB0aGlzLl9oaXRUZXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdFRlc3QoZXZlbnQueCwgZXZlbnQueSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC50YXJnZXQuZ2V0Qm91bmRpbmdBcmVhKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gaGFuZGxlck9iamVjdC50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgd2FzIGJvdW5kIHdpdGggYSB0YXJnZXQgdHJpZ2dlciBoYW5kbGVyIE9OTFkgaWYgdGFyZ2V0IGhpdFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBoYW5kbGVyIGZvciBhIGNlcnRhaW4gZXZlbnQgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNhZGRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgICBUaGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSAge29iamVjdH0gICBbdGFyZ2V0XSBUaGUgdGFyZ2V0IHRvIGNoZWNrIGV2ZW50IHRyaWdnZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICBSZXR1cm5zIHRydWUgaWYgYWRkZWQgYW5kIGZhbHNlIGlmIGNhbGxiYWNrIGFscmVhZHkgZXhpc3RzXG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBoYW5kbGVyT2JqZWN0cyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IGR1cDtcblxuXG4gICAgICAgIGlmICghIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJPYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgZHVwID0gdGhpcy5faXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZHVwKSB7XG4gICAgICAgICAgICBoYW5kbGVyT2JqZWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLCB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBtYXRjaGluZyBoYW5kbGVyIGlmIGZvdW5kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3JlbW92ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgdGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciB0aGUgaGFuZGxlciB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgcmVtb3ZlZCBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCBhbmQgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCEgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyT2JqZWN0ID0gaGFuZGxlcnNbaV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIGtleXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWRcbiAgICAgKiBlZzogPGNvZGU+eyBMRUZUX0FSUk9XOiAzNywgVVBfQVJST1c6IDM4IH08L2NvZGU+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2dldEtleXNEb3duXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEtleXNEb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c0Rvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVzZXIgdG8gc2V0IGEgY3VzdG9tIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNzZXRIaXRUZXN0TWV0aG9kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHVzZXIncyBoaXQgdGVzdCBtZXRob2RcbiAgICAgKi9cbiAgICBzZXRIaXRUZXN0TWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0I3NldEhpdFRlc3RNZXRob2QgcGFyYW1ldGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBmbjtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX3NyY0hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvc2l0ZSBvcGVyYXRpb24gdHlwZS4gQ2FuIGJlIHNvdXJjZS1hdG9wfHNvdXJjZS1pbnxzb3VyY2Utb3V0fHNvdXJjZS1vdmVyfGRlc3RpbmF0aW9uLWF0b3B8ZGVzdGluYXRpb24taW58ZGVzdGluYXRpb24tb3V0fGRlc3RpbmF0aW9uLW92ZXJ8bGlnaHRlcnx4b3J8Y29weVxuICAgICAgICAgKiBEZWZhdWx0IGlzICdzb3VyY2Utb3ZlcidcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlciBTcHJpdGUjX2NvbXBvc2l0ZVxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21wb3NpdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGJvdW5kaW5nIGFyZWFcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0FyZWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXhYOiB0aGlzLl94ICsgKHRoaXMuX3dpZHRoICAqIHRoaXMuX3NjYWxlWCksXG4gICAgICAgICAgICBtYXhZOiB0aGlzLl95ICsgKHRoaXMuX2hlaWdodCAqIHRoaXMuX3NjYWxlWSksXG4gICAgICAgICAgICBtaW5YOiB0aGlzLl94LFxuICAgICAgICAgICAgbWluWTogdGhpcy5feVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldENvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0SGVpZ2h0XG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvblJhZGlhbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRXaWR0aFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbcmVuZGVyIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgcmVuZGVyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBjb250ZXh0IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKFxuICAgICAgICAgICAgdGhpcy5feCAtIHRoaXMuX3dpZHRoIC8gMixcbiAgICAgICAgICAgIHRoaXMuX3kgLSB0aGlzLl9oZWlnaHQgLyAyXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRleHQuc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUodGhpcy5fd2lkdGggLyAyLCB0aGlzLl9oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGNvbnRleHQucm90YXRlKHRoaXMuX3JvdGF0aW9uKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC0odGhpcy5fd2lkdGggLyAyKSwgLSh0aGlzLl9oZWlnaHQgLyAyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgY29tcG9zaXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldENvbXBvc2l0ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0SGVpZ2h0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBoZWlnaHQgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbCAqIE1hdGguUEkgLyAxODA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbWVtYmVyIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdFxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0ID0gJ3NvdXJjZS1vdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3RhZ2VcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgZWxlbWVudC4gaW5jbHVkZWQgaW4gdGhlIG9wdGlvbnNcbiAqICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgZGVwZW5kZW5jeSBpbmplY3Rpb24gdXNlZCBmb3IgdGVzdGluZyBhZ2FpbnN0XG4gKiAgICAgICAgICAgICAgYSB2aXJ0dWFsIGRvbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbd2lkdGhdICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFtoZWlnaHRdICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub25lIGdpdmVuIHRoZSBib2R5IGlzIHVzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICBbb3B0cy5iZ0NvbG9yXSAgVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBbb3B0cy5maWxsXSAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuYmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTdGFnZUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVTdGFnZUVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLl9zdGFnZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAvLyBUT0RPIHZlcmlmeSB2YWx1ZSAnbm9uZSdcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLmF1dG9jYXBpdGFsaXplID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuaWQgPSAndGV4dGZpZWxkJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dGZpZWxkKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLmlkID0ndmlkZW8nO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX3ZpZGVvKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgX3Jlc2l6ZUVsZW1lbnQgZm9yIHN0YWdlIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19oYW5kbGVSZXNpemVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fdmlkZW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfcmVzaXplRWxlbWVudFxuICAgICAqIEBwYXJhbSAge0hUTUxFbnRpdHl9IGVsIFRoZSBlbGVtZW50IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIF9yZXNpemVFbGVtZW50KGVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gU3RhZ2UuY2VudGVyKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRDYW52YXNcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRWaWRlb1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWF4aW1pemVzIGFuIGVsZW1lbnQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0IHZpYSBDU1MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmZpbGxcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZmlsbCh3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHZpZXdwb3J0SGVpZ2h0IC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gdmlld3BvcnRXaWR0aCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtlZXBzIHN0YWdlIGVsZW1lbnQgY2VudGVyZWQgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmNlbnRlclxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIHRvcCBhbmQgbGVmdFxuICAgICAqL1xuICAgIHN0YXRpYyBjZW50ZXIod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6ICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgICAgICAgIHRvcDogKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0YXJ0XSAgICAgICAgIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0c10gICAgICAgICAgT3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy53aW5kb3ddICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy5kb2N1bWVudF0gZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQgPSB0cnVlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24ge0BsaW5rIFRpY2tlciNfZnBzfS5cbiAgICAgKiBJZiB0aGUgY29ycmVjdCBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIHRoZSB7QGxpbmsgVGlja2VyI29uVGlja30gY2FsbGJhY2sgd2lsbCBmaXJlIGFuZFxuICAgICAqIHRoZSA8Y29kZT50aWNrPC9jb2RlPiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSA8Y29kZT5kb2N1bWVudDwvY29kZT4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKG5vdyAtIHRoaXMuX3RoZW4pIC8gMTAwMDtcblxuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB0aGlzLl90aWNrcyArPSAxO1xuXG4gICAgICAgIGNvbnN0IGV2dE9iamVjdCA9IHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICB0aWNrczogdGhpcy5fdGlja3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGZpcmUgdGljayBldmVudHMgYW5kIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAgICAgIGxldCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3ByZXRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLm9uUHJlVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblRpY2soZGVsdGEsIHRoaXMuX3RpY2tzKTtcbiAgICAgICAgdGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Qb3N0VGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3R0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcHJlIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUHJlVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUHJlVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHBvc3QgdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUG9zdFRpY2tcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRlbHRhIFRoZSB0aW1lIGVsYXBzZWQgYmV0d2VlbiB0aWNrcy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGlja3MgVGhlIGFtb3VudCBvZiB0aWNrcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWRcbiAgICAgKi9cbiAgICBvblBvc3RUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBSZWN0YW5nbGVcbiAqIEBleHRlbmRzIHtAbGluayBTcHJpdGV9XG4gKiBAZGVzYyAgICBBIHNwcml0ZSB0aGF0IHJlbmRlcnMgYXMgYSByZWN0YW5nbGVcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBUZXh0SW5wdXRcbiAqIEBkZXNjICAgIFJlbmRlcnMgYW4gaHRtbCB0ZXh0ZmllbGQgZWxlbWVudFxuICogQGV4dGVuZHMgU3ByaXRlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUgPSAnJywgeCA9IDAsIHkgPSAwKSB7XG4gICAgXHRzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9zaXplID0gMTY7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSAnc2Fucy1zZXJpZic7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldEZpbGwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRleHQjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBUZXh0I3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9IHZhbDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBcdGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gYCR7dGhpcy5fc2l6ZX1weCAke3RoaXMuX2ZvbnR9YDtcblxuICAgICAgICBpZiAodGhpcy5fZmlsbCkge1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0aGlzLl92YWx1ZSwgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3Ryb2tlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fc3Ryb2tlO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VUZXh0KHRoaXMuX3ZhbHVlLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn1cbiJdfQ==
