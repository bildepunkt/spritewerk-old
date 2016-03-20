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

var _TextInput = require('./src/text/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Group = require('./src/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Ticker = require('./src/Ticker');

var _Ticker2 = _interopRequireDefault(_Ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = true;

var camera = new _Camera2.default();
var stage = new _Stage2.default(800, 600, {
  bgColor: '#222',
  fill: true
});
var canvas = new _Canvas2.default(stage.getCanvas(), camera);
var input = new _Input2.default(stage.getCanvas());
var group = new _Group2.default();
var textInput = new _TextInput2.default(32, 32, { debug: debug });
var ticker = new _Ticker2.default(true, { debug: debug });

textInput.focus();
textInput.setPivotX(32).setPivotY(24);
group.addItem(textInput);

input.addListener('click', function () {
  if (textInput.isFocused()) {
    textInput.blur();
  } else {
    textInput.focus();
  }
});

var r = 0;

ticker.onTick = function (factor, ticks) {
  canvas.clear('#DDD');

  r += 2;
  textInput.setRotation(r);

  canvas.render(group, factor, ticks);
};

},{"./src/Camera":2,"./src/Canvas":3,"./src/Group":5,"./src/Input":6,"./src/Stage":8,"./src/Ticker":9,"./src/shapes/Rectangle":11,"./src/text/TextInput":13}],2:[function(require,module,exports){
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
        value: function render(entity, factor, ticks) {
            this._context.save();

            this._context.translate(-this._camera.getX(), -this._camera.getY());
            entity.render(this._context, factor, ticks);

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
            var item = undefined;

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
            var item = undefined;

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
            var index = undefined;

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
            var item = undefined;
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
        value: function render(context, factor, ticks) {
            context.save();

            this.each(function (item) {
                item.render(context, factor, ticks);
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
}();

exports.default = Input;

},{"./lib/keycodes":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('./util/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Sprite);

        this._x = x;
        this._y = y;
        this._pivotX = 1;
        this._pivotY = 1;
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

        this._debug = opts.debug;
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
         * @method Sprite#getPivotX
         * @return {Integer}
         */

    }, {
        key: 'getPivotX',
        value: function getPivotX() {
            return this._pivotX;
        }

        /**
         * @method Sprite#getPivotY
         * @return {Integer}
         */

    }, {
        key: 'getPivotY',
        value: function getPivotY() {
            return this._pivotY;
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
            if (this._debug) {
                _debug2.default.render(_debug2.default.types.XHAIR, context, this);
            }

            context.translate(this._x, this._y);
            context.scale(this._scaleX, this._scaleY);

            if (this._rotation !== 0) {
                context.translate(this._pivotX, this._pivotY);
                context.rotate(this._rotation);
                context.translate(-this._pivotX, -this._pivotY);
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
         * @method Sprite#setPivotX
         * @param  {Float} val The opacity value
         * @return {Sprite}
         */

    }, {
        key: 'setPivotX',
        value: function setPivotX(val) {
            this._pivotX = val;

            return this;
        }

        /**
         * @method Sprite#setPivotY
         * @param  {Float} val The opacity value
         * @return {Sprite}
         */

    }, {
        key: 'setPivotY',
        value: function setPivotY(val) {
            this._pivotY = val;

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

},{"./util/debug":15}],8:[function(require,module,exports){
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

            this._video = this._document.createElement('video');
            this._video.id = 'video';
            this._video.style.position = 'absolute';
            this._stage.appendChild(this._video);

            this._canvas = this._document.createElement('canvas');
            this._canvas.width = this._width;
            this._canvas.height = this._height;
            this._canvas.style.position = 'absolute';
            this._stage.appendChild(this._canvas);

            this._textfield = this._document.createElement('input');
            this._textfield.type = 'text';
            this._textfield.style.position = 'absolute';
            this._textfield.style.top = '-999px';
            // TODO verify value 'none'
            this._textfield.autocapitalize = 'none';
            this._textfield.id = 'textfield';
            this._stage.appendChild(this._textfield);
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

            if (this._debug) {
                console.log('delta:', delta, 'ticks:', this._ticks);
            }

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
 * @class   Text
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
        var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, x, y, opts));

        _this._value = value;
        _this._size = 16;
        _this._font = 'sans-serif';
        _this._baseline = 'top';
        _this._fill = '#000';
        _this._stroke = '';
        return _this;
    }

    _createClass(Text, [{
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }

        /*getTextWidth() {
        	return
        }*/

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
            _get(Object.getPrototypeOf(Text.prototype), 'render', this).call(this, context);

            context.font = this._size + 'px ' + this._font;
            context.textBaseline = this._baseline;

            if (this._fill) {
                context.fillStyle = this._fill;
                context.fillText(this._value, 0, 0);
            }

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeText(this._value, 0, 0);
            }
        }
    }]);

    return Text;
}(_Sprite3.default);

exports.default = Text;

},{"../Sprite":7}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Text2 = require('./Text');

var _Text3 = _interopRequireDefault(_Text2);

var _Rectangle = require('../shapes/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class   TextInput
 * @desc    Renders an html textfield element
 * @extends Text
 * @author  Chris Peters
 */

var TextInput = function (_Text) {
    _inherits(TextInput, _Text);

    function TextInput() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, TextInput);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).call(this, '', x, y, opts));

        _this._document = opts.document || document;
        _this._debug = opts.debug;

        _this._lastTick = 0;
        _this._blinkFrames = 30;
        _this._karetShow = true;
        _this._focused = false;

        _this._rect = new _Rectangle2.default();

        _this._textfield = _this._document.getElementById('textfield');
        _this._onChange = _this._onChange.bind(_this);
        _this._textfield.addEventListener('keyup', _this._onChange, false);

        if (_this._debug) {
            _this._textfield.style.top = '16px';
        }
        return _this;
    }

    _createClass(TextInput, [{
        key: '_onChange',
        value: function _onChange(e) {
            this._value = e.target.value;
        }
    }, {
        key: 'blur',
        value: function blur() {
            this._textfield.blur();
            this._focused = false;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._textfield.removeEventListener('keyup', this._onChange, false);
        }
    }, {
        key: 'focus',
        value: function focus() {
            this._textfield.focus();
            this._focused = true;
        }
    }, {
        key: 'isFocused',
        value: function isFocused() {
            return this._focused;
        }
    }, {
        key: 'render',
        value: function render(context, factor, tick) {
            _get(Object.getPrototypeOf(TextInput.prototype), 'render', this).call(this, context);

            if (tick - this._lastTick >= this._blinkFrames) {
                this._lastTick = tick;
                this._karetShow = !this._karetShow;
            }

            var textMeasurement = context.measureText(this._value);

            if (this._karetShow && this._focused) {
                context.save();
                this._rect.setX(textMeasurement.width + 1);
                this._rect.setHeight(this._size).setWidth(this._size / 4);
                this._rect.render(context);
                context.restore();
            }
        }
    }]);

    return TextInput;
}(_Text3.default);

exports.default = TextInput;

},{"../shapes/Rectangle":11,"./Text":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @class color
 */
var color = {
    options: {},

    getRandRGB: function getRandRGB() {
        var low = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var high = arguments.length <= 1 || arguments[1] === undefined ? 255 : arguments[1];

        var r = low + Math.round(Math.random() * (high - low));
        var g = low + Math.round(Math.random() * (high - low));
        var b = low + Math.round(Math.random() * (high - low));
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
};

exports.default = color;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class debug
 */
var debug = {
    options: {
        xhairSize: 16
    },

    types: {
        XHAIR: 'XHAIR'
    },

    render: function render(type, context, entity) {
        context.save();

        switch (type) {
            case this.types.XHAIR:
                var size = this.options.xhairSize;
                context.fillStyle = _color2.default.getRandRGB();
                context.translate(entity.getX() + entity.getPivotX(), entity.getY() + entity.getPivotY());
                context.fillRect(-(size / 2), 0, size, 1);
                context.fillRect(0, -(size / 2), 1, size);
                break;
            default:
                break;
        }

        context.restore();
    }
};

exports.default = debug;

},{"./color":14}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9TcHJpdGUuanMiLCJzcmMvU3RhZ2UuanMiLCJzcmMvVGlja2VyLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyIsInNyYy9zaGFwZXMvUmVjdGFuZ2xlLmpzIiwic3JjL3RleHQvVGV4dC5qcyIsInNyYy90ZXh0L1RleHRJbnB1dC5qcyIsInNyYy91dGlsL2NvbG9yLmpzIiwic3JjL3V0aWwvZGVidWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNTQSxJQUFNLFFBQVEsSUFBUjs7QUFFTixJQUFJLFNBQVMsc0JBQVQ7QUFDSixJQUFJLFFBQVEsb0JBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7QUFDNUIsV0FBUyxNQUFUO0FBQ0EsUUFBTSxJQUFOO0NBRlEsQ0FBUjtBQUlKLElBQUksU0FBUyxxQkFBVyxNQUFNLFNBQU4sRUFBWCxFQUE4QixNQUE5QixDQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLE1BQU0sU0FBTixFQUFWLENBQVI7QUFDSixJQUFJLFFBQVEscUJBQVI7QUFDSixJQUFJLFlBQVksd0JBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQixFQUFDLFlBQUQsRUFBdEIsQ0FBWjtBQUNKLElBQUksU0FBUyxxQkFBVyxJQUFYLEVBQWlCLEVBQUMsWUFBRCxFQUFqQixDQUFUOztBQUVKLFVBQVUsS0FBVjtBQUNBLFVBQVUsU0FBVixDQUFvQixFQUFwQixFQUF3QixTQUF4QixDQUFrQyxFQUFsQztBQUNBLE1BQU0sT0FBTixDQUFjLFNBQWQ7O0FBRUEsTUFBTSxXQUFOLENBQWtCLE9BQWxC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QUo7QUFDQSxRQUFJLFFBQUo7QUFDQSxRQUFJLFNBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLEtBQUo7QUFDQSxRQUFJLE1BQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFVBQUo7QUFDQSxRQUFJLGFBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFFBQUo7QUFDQSxRQUFJLFFBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFB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R3ZDLFlBQU0sSUFBSSxNQUFNLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxNQUFpQixPQUFPLEdBQVAsQ0FBakIsQ0FBakIsQ0FINkI7QUFJdkMsd0JBQWMsV0FBTSxXQUFNLE9BQTFCLENBSnVDO0tBQS9CO0NBSFY7O2tCQVdTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUZixJQUFNLFFBQVE7QUFDVixhQUFTO0FBQ0wsbUJBQVcsRUFBWDtLQURKOztBQUlBLFdBQU87QUFDSCxlQUFPLE9BQVA7S0FESjs7QUFJQSxZQUFRLGdCQUFVLElBQVYsRUFBZ0IsT0FBaEIsRUFBeUIsTUFBekIsRUFBaUM7QUFDckMsZ0JBQVEsSUFBUixHQURxQzs7QUFHckMsZ0JBQVEsSUFBUjtBQUNJLGlCQUFLLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDTCxvQkFBTSxPQUFPLEtBQUssT0FBTCxDQUFhLFNBQWIsQ0FEYjtBQUVBLHdCQUFRLFNBQVIsR0FBb0IsZ0JBQU0sVUFBTixFQUFwQixDQUZBO0FBR0Esd0JBQVEsU0FBUixDQUFrQixPQUFPLElBQVAsS0FBZ0IsT0FBTyxTQUFQLEVBQWhCLEVBQW9DLE9BQU8sSUFBUCxLQUFnQixPQUFPLFNBQVAsRUFBaEIsQ0FBdEQsQ0FIQTtBQUlBLHdCQUFRLFFBQVIsQ0FBaUIsRUFBRSxPQUFPLENBQVAsQ0FBRixFQUFhLENBQTlCLEVBQWlDLElBQWpDLEVBQXVDLENBQXZDLEVBSkE7QUFLQSx3QkFBUSxRQUFSLENBQWlCLENBQWpCLEVBQW9CLEVBQUUsT0FBTyxDQUFQLENBQUYsRUFBYSxDQUFqQyxFQUFvQyxJQUFwQyxFQUxBO0FBTUEsc0JBTkE7QUFESjtBQVFhLHNCQUFUO0FBUkosU0FIcUM7O0FBY3JDLGdCQUFRLE9BQVIsR0FkcUM7S0FBakM7Q0FUTjs7a0JBMkJTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBDYW52YXMgZnJvbSAnLi9zcmMvQ2FudmFzJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL3NyYy9JbnB1dCc7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zcmMvU3RhZ2UnO1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9zcmMvc2hhcGVzL1JlY3RhbmdsZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vc3JjL3RleHQvVGV4dElucHV0JztcbmltcG9ydCBHcm91cCBmcm9tICcuL3NyYy9Hcm91cCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbmNvbnN0IGRlYnVnID0gdHJ1ZTtcblxubGV0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcbmxldCBzdGFnZSA9IG5ldyBTdGFnZSg4MDAsIDYwMCwge1xuICAgIGJnQ29sb3I6ICcjMjIyJyxcbiAgICBmaWxsOiB0cnVlXG59KTtcbmxldCBjYW52YXMgPSBuZXcgQ2FudmFzKHN0YWdlLmdldENhbnZhcygpLCBjYW1lcmEpO1xubGV0IGlucHV0ID0gbmV3IElucHV0KHN0YWdlLmdldENhbnZhcygpKTtcbmxldCBncm91cCA9IG5ldyBHcm91cCgpO1xubGV0IHRleHRJbnB1dCA9IG5ldyBUZXh0SW5wdXQoMzIsIDMyLCB7ZGVidWd9KTtcbmxldCB0aWNrZXIgPSBuZXcgVGlja2VyKHRydWUsIHtkZWJ1Z30pO1xuXG50ZXh0SW5wdXQuZm9jdXMoKTtcbnRleHRJbnB1dC5zZXRQaXZvdFgoMzIpLnNldFBpdm90WSgyNCk7XG5ncm91cC5hZGRJdGVtKHRleHRJbnB1dCk7XG5cbmlucHV0LmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0aWYgKHRleHRJbnB1dC5pc0ZvY3VzZWQoKSkge1xuXHRcdHRleHRJbnB1dC5ibHVyKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGV4dElucHV0LmZvY3VzKCk7XG5cdH1cbn0pO1xuXG5sZXQgciA9IDA7XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yLCB0aWNrcykge1xuICAgIGNhbnZhcy5jbGVhcignI0RERCcpO1xuXG4gICAgciArPSAyO1xuICAgIHRleHRJbnB1dC5zZXRSb3RhdGlvbihyKTtcblxuICAgIGNhbnZhcy5yZW5kZXIoZ3JvdXAsIGZhY3RvciwgdGlja3MpO1xufTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbWVyYVxuICogQGRlc2NyaXB0aW9uIERlY2lkZXMgd2hhdCBnZXRzIHJlbmRlcmVkXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhcyBUaGUgYWN0aXZlIGNhbnZhcyBlbGVtZW50XG4gKiBAcGFyYW0ge0NhbWVyYX0gICAgICBjYW1lcmEgVGhlIGNhbWVyYSBpbnN0YW5jZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5zZXRJbWFnZVNtb290aGluZyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMgYW5kIG9wdGlvbmFsbHkgZmlsbHMgd2l0aCBhIGNvbG9yXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI2dldENvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSAyRCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9mZnNldHMgY2FudmFzIGJhc2VkIG9uIGNhbWVyYSBhbmQgY2FsbHMgYW4gZW50aXR5J3MgcmVuZGVyIG1ldGhvZCBwYXNzaW5nIHRoZSBjb250ZXh0LlxuICAgICAqIFNhdmVzIGFuZCByZXN0b3JlcyBjb250ZXh0IGFuZCBiZWdpbm5pbmcgYW5kIGVuZCBvZiBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSwgZmFjdG9yLCB0aWNrcykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fY2FtZXJhLmdldFgoKSwgLXRoaXMuX2NhbWVyYS5nZXRZKCkpO1xuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQsIGZhY3RvciwgdGlja3MpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI3NldEltYWdlU21vb3RoaW5nXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gdmFsIFRoZSBpbWFnZSBzbW9vdGhpbmcgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJbWFnZVNtb290aGluZyh2YWwpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdmFsO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxlY3Rpb25cbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyB0aGUgc29ydGFibGUsIGl0ZXJhYmxlIHN0b3JhZ2Ugb2YgZW50aXRpZXMgdGhhdCBhcmVcbiAqICAgICAgICAgICAgICBnZXR0YWJsZSwgc2V0dGFibGUsIHNvcnRhYmxlLCByZW1vdmFibGUsIGV0Y2VyYShibGUpIGJ5IG5hbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gVGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGl0ZW0geyBuYW1lLCBpdGVtIH0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0UmF3SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goZnVuY3Rpb24oaXRlckl0ZW0sIGksIGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgcmF3IGl0ZW0sIGluZGV4LCBuYW1lLCBhbmQgdGhlXG4gICAgICogbGlzdCBiZWluZyBpdGVyYXRlZCBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jhd0VhY2goZm4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChmbih0aGlzLl9pdGVtc1tpXSwgaSwgdGhpcy5faXRlbXNbaV0ubmFtZSwgdGhpcy5faXRlbXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gd2l0aCBvcHRpb25hbCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtBbnl9ICAgICAgICBpdGVtICAgVGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG5cbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtLCBuYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBtdWx0aXBsZSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5PYmplY3R9IGl0ZW1zIENhbiBiZSB0aGUgb2JqZWN0IGl0c2VsZiBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGFuZCBpdCdzIG5hbWVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZWc6IDxjb2RlPnsgaXRlbTogRW50aXR5LCBuYW1lOiAnZW50aXR5TmFtZScgfTwvY29kZT5cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSBpdGVtLCBpbmRleCwgYW5kIG5hbWUgYXJlIHN1cHBsaWVkXG4gICAgICogdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHRoZSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyBpdGVtcyBhbmQgcmV0dXJuIHRoZSBvbmVzIHRoYXQgbWVldCBjcml0ZXJpYVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVHJ1dGggcHJlZGljYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtLCBpLCBuYW1lKT0+IHtcbiAgICAgICAgICAgIGxldCBwcmVkaWNhdGUgPSBmbihpdGVtLCBpLCBuYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2NvcGUpO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGp1c3QgdGhlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW1BdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbaW5kZXhdLml0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY291bnQgb2YgaXRlbXMgaW4gY29sbGVjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVtJ3MgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtSW5kZXgobmFtZSkge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSBjb2xsZWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBvYmplY3QgYnkgbmFtZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTVy5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBpdGVtIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0obmFtZSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSwgaXRlbXMpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgbmV3IHZhbHVlIHRvIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIG1vZGlmeVxuICAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZSBUaGUgbmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0uaXRlbSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGl0ZW0gdG8gbmV3IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgYmVpbmcgbW92ZWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IFRoZSBpdGVtJ3MgbmV3IGluZGV4XG4gICAgICovXG4gICAgc2V0SXRlbUluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgobmFtZSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLl9nZXRSYXdJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBHcm91cFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gaGllcmFyY2h5IGZvciB7QGxpbmsgQ29sbGVjdGlvbn1zXG4gKiBAZXh0ZW5kcyAgICAgQ29sbGVjdGlvblxuICogQHJlcXVpcmVzICAgIFNwcml0ZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFsbCBjaGlsZHJlbiByZWN1cnNpdmVseSBvbiB0b3Agb2Ygb3duIHRyYW5zZm9ybWF0aW9uIHN0YWNrXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgMmQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICByZW5kZXIoY29udGV4dCwgZmFjdG9yLCB0aWNrcykge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW5kZXIoY29udGV4dCwgZmFjdG9yLCB0aWNrcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgICBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0cyA9IHt9KSB7XG4gICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW52YXNGaXQgPSBvcHRzLmNhbnZhc0ZpdCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JNb3VzZSA9IG9wdHMubGlzdGVuRm9yTW91c2UgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yVG91Y2ggPSBvcHRzLmxpc3RlbkZvclRvdWNoIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCA9IG9wdHMubGlzdGVuRm9yS2V5Ym9hcmQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvcktleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvck1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvclRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25UaWNrID0gdGhpcy5fb25UaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aGlzLl9vblRpY2ssIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkS2V5Ym9hcmRMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsna2V5dXAnLCAna2V5ZG93biddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbW91c2UgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRNb3VzZUxpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG91Y2ggbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRUb3VjaExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHNjYWxlIHJhdGlvIG9mIHRoZSBjYW52YXMgYmFzZWQgb24gd2l0aC9oZWdodCBhdHRycyBhbmQgY3NzIHdpZHRoL2hlaWdodFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfZ2V0U2NhbGVGYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBfZ2V0U2NhbGVGYWN0b3IoKSB7XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgY2FudmFzV2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCkge1xuICAgICAgICAgICAgY2FudmFzV2lkdGggPSBwYXJzZUludCh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgICAgIGZhY3RvciA9IGNhbnZhc1dpZHRoIC8gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDEwMCAvIGZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcG9pbnQgaXMgaW5zaWRlIHJlY3RhbmdsZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGl0VGVzdFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm91bmRpbmdCb3ggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiA8Y29kZT57IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfTwvY29kZT5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjZ2V0S2V5c0Rvd25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0S2V5c0Rvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzRG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdXNlciB0byBzZXQgYSBjdXN0b20gaGl0IHRlc3QgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEhpdFRlc3RNZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgdXNlcidzIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqL1xuICAgIHNldEhpdFRlc3RNZXRob2QoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQjc2V0SGl0VGVzdE1ldGhvZCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IGZuO1xuICAgIH1cbn1cbiIsImltcG9ydCBkZWJ1ZyBmcm9tICcuL3V0aWwvZGVidWcnO1xuXG5cbi8qKlxuICogQGNsYXNzICAgICAgIFNwcml0ZVxuICogQGRlc2NyaXB0aW9uIEJhc2UgY2xhc3MgZm9yIHBvc2l0aW9uIGJhc2VkIG9iamVjdHNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSBUaGUgaW5pdGlhbCB4IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3ldIFRoZSBpbml0aWFsIHkgcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICovXG5jbGFzcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fcGl2b3RYID0gMTtcbiAgICAgICAgdGhpcy5fcGl2b3RZID0gMTtcbiAgICAgICAgdGhpcy5fc3JjWCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1kgPSAwO1xuICAgICAgICB0aGlzLl9zcmNXaWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG5cbiAgICAgICAgdGhpcy5fZGVidWcgPSBvcHRzLmRlYnVnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbXBvc2l0ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgYm91bmRpbmcgYXJlYVxuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1heFg6IHRoaXMuX3ggKyAodGhpcy5fd2lkdGggICogdGhpcy5fc2NhbGVYKSxcbiAgICAgICAgICAgIG1heFk6IHRoaXMuX3kgKyAodGhpcy5faGVpZ2h0ICogdGhpcy5fc2NhbGVZKSxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Q29tcG9zaXRlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRIZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0UGl2b3RYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaXZvdFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXZvdFg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0UGl2b3RZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaXZvdFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXZvdFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb25SYWRpYW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0V2lkdGhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3JlbmRlciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIHJlbmRlclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gY29udGV4dCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgICAgICAgIGRlYnVnLnJlbmRlcihkZWJ1Zy50eXBlcy5YSEFJUiwgY29udGV4dCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLl9waXZvdFgsIHRoaXMuX3Bpdm90WSk7XG4gICAgICAgICAgICBjb250ZXh0LnJvdGF0ZSh0aGlzLl9yb3RhdGlvbik7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fcGl2b3RYLCAtdGhpcy5fcGl2b3RZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBjb21wb3NpdGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRIZWlnaHRcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGhlaWdodCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRIZWlnaHQodmFsKSB7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0UGl2b3RYXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRQaXZvdFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3Bpdm90WCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRQaXZvdFlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFBpdm90WSh2YWwpIHtcbiAgICAgICAgdGhpcy5fcGl2b3RZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbCAqIE1hdGguUEkgLyAxODA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbWVtYmVyIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdFxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0ID0gJ3NvdXJjZS1vdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3RhZ2VcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgZWxlbWVudC4gaW5jbHVkZWQgaW4gdGhlIG9wdGlvbnNcbiAqICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgZGVwZW5kZW5jeSBpbmplY3Rpb24gdXNlZCBmb3IgdGVzdGluZyBhZ2FpbnN0XG4gKiAgICAgICAgICAgICAgYSB2aXJ0dWFsIGRvbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbd2lkdGhdICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFtoZWlnaHRdICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub25lIGdpdmVuIHRoZSBib2R5IGlzIHVzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICBbb3B0cy5iZ0NvbG9yXSAgVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBbb3B0cy5maWxsXSAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuYmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTdGFnZUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVTdGFnZUVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLl9zdGFnZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB0aGlzLl92aWRlby5pZCA9J3ZpZGVvJztcbiAgICAgICAgdGhpcy5fdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl92aWRlbyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuXG4gICAgICAgIHRoaXMuX3RleHRmaWVsZCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuc3R5bGUudG9wID0gJy05OTlweCc7XG4gICAgICAgIC8vIFRPRE8gdmVyaWZ5IHZhbHVlICdub25lJ1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuYXV0b2NhcGl0YWxpemUgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5pZCA9ICd0ZXh0ZmllbGQnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl90ZXh0ZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIF9yZXNpemVFbGVtZW50IGZvciBzdGFnZSBlbGVtZW50c1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfaGFuZGxlUmVzaXplXG4gICAgICovXG4gICAgX2hhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX3ZpZGVvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIGhvdyB0byBoYW5kbGUgcmVzaXplIGJhc2VkIG9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX3Jlc2l6ZUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gIHtIVE1MRW50aXR5fSBlbCBUaGUgZWxlbWVudCB0byByZXNpemVcbiAgICAgKi9cbiAgICBfcmVzaXplRWxlbWVudChlbCkge1xuICAgICAgICBpZiAodGhpcy5fZmlsbCkge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSBTdGFnZS5maWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGgpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0KX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IFN0YWdlLmNlbnRlcihcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0Q2FudmFzXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpZGVvIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0VmlkZW9cbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRWaWRlbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1heGltaXplcyBhbiBlbGVtZW50ICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydCB2aWEgQ1NTLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5maWxsXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpbGwod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgIGNvbnN0IFBPUlRSQUlUX1JBVElPICA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBJU19MQU5EU0NBUEUgICAgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB2aWV3cG9ydEhlaWdodCAvIHZpZXdwb3J0V2lkdGg7XG4gICAgICAgIGxldCB3aW5Qb3J0cmFpdFJhdGlvICA9IHZpZXdwb3J0V2lkdGggLyB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyBzdGFnZSBlbGVtZW50IGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5jZW50ZXJcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSB0b3AgYW5kIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgY2VudGVyKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAodmlld3BvcnRXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICAgICAgICB0b3A6ICh2aWV3cG9ydEhlaWdodCAtIGhlaWdodCkgLyAyXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgVGlja2VyXG4gKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgY2FsbGJhY2sgYmFzZWQgb24gZ2l2ZW4gZnBzIGFuZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzdGFydF0gICAgICAgICBXaGV0aGVyIHRvIHN0YXJ0IG9uIGluc3RhbnRpYXRlLiBEZWZhdWx0IGlzIHRydWVcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHNdICAgICAgICAgIE9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHMud2luZG93XSAgIHdpbmRvdyBvYmplY3QgZm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHMuZG9jdW1lbnRdIGRvY3VtZW50IG9iamVjdCBmb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0ID0gdHJ1ZSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fdGlja3MgPSAwO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHdoZXRoZXIgb3Igbm90IHRvIGNhbGwge0BsaW5rIFRpY2tlciNvblRpY2t9IGJhc2VkIG9uIHtAbGluayBUaWNrZXIjX2Zwc30uXG4gICAgICogSWYgdGhlIGNvcnJlY3QgYW1vdW50IG9mIHRpbWUgaGFzIHBhc3NlZCB0aGUge0BsaW5rIFRpY2tlciNvblRpY2t9IGNhbGxiYWNrIHdpbGwgZmlyZSBhbmRcbiAgICAgKiB0aGUgPGNvZGU+dGljazwvY29kZT4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIHZpYSB0aGUgPGNvZGU+ZG9jdW1lbnQ8L2NvZGU+IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI191cGRhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IChub3cgLSB0aGlzLl90aGVuKSAvIDEwMDA7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgdGhpcy5fdGlja3MgKz0gMTtcblxuICAgICAgICBjb25zdCBldnRPYmplY3QgPSB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgICAgICAgICAgdGlja3M6IHRoaXMuX3RpY2tzXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6JywgZGVsdGEsICd0aWNrczonLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGZpcmUgdGljayBldmVudHMgYW5kIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAgICAgIGxldCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3ByZXRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLm9uUHJlVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblRpY2soZGVsdGEsIHRoaXMuX3RpY2tzKTtcbiAgICAgICAgdGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Qb3N0VGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3R0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcHJlIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUHJlVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUHJlVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHBvc3QgdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUG9zdFRpY2tcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRlbHRhIFRoZSB0aW1lIGVsYXBzZWQgYmV0d2VlbiB0aWNrcy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGlja3MgVGhlIGFtb3VudCBvZiB0aWNrcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWRcbiAgICAgKi9cbiAgICBvblBvc3RUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBSZWN0YW5nbGVcbiAqIEBleHRlbmRzIHtAbGluayBTcHJpdGV9XG4gKiBAZGVzYyAgICBBIHNwcml0ZSB0aGF0IHJlbmRlcnMgYXMgYSByZWN0YW5nbGVcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBUZXh0XG4gKiBAZGVzYyAgICBSZW5kZXJzIGFuIGh0bWwgdGV4dGZpZWxkIGVsZW1lbnRcbiAqIEBleHRlbmRzIFNwcml0ZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlID0gJycsIHggPSAwLCB5ID0gMCwgb3B0cyA9IHt9KSB7XG4gICAgXHRzdXBlcih4LCB5LCBvcHRzKTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9zaXplID0gMTY7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSAnc2Fucy1zZXJpZic7XG4gICAgICAgIHRoaXMuX2Jhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgLypnZXRUZXh0V2lkdGgoKSB7XG4gICAgXHRyZXR1cm5cbiAgICB9Ki9cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBUZXh0I3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGV4dCNzZXRTdHJva2VcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgc3Ryb2tlIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0U3Ryb2tlKHZhbCkge1xuICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWw7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBgJHt0aGlzLl9zaXplfXB4ICR7dGhpcy5fZm9udH1gO1xuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IHRoaXMuX2Jhc2VsaW5lO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMuX3ZhbHVlLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVRleHQodGhpcy5fdmFsdWUsIDAsIDApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vc2hhcGVzL1JlY3RhbmdsZSc7XG5cbi8qKlxuICogQGNsYXNzICAgVGV4dElucHV0XG4gKiBAZGVzYyAgICBSZW5kZXJzIGFuIGh0bWwgdGV4dGZpZWxkIGVsZW1lbnRcbiAqIEBleHRlbmRzIFRleHRcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcignJywgeCAseSwgb3B0cyk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl9kZWJ1ZyA9IG9wdHMuZGVidWc7XG5cbiAgICAgICAgdGhpcy5fbGFzdFRpY2sgPSAwO1xuICAgICAgICB0aGlzLl9ibGlua0ZyYW1lcyA9IDMwO1xuICAgICAgICB0aGlzLl9rYXJldFNob3cgPSB0cnVlO1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcmVjdCA9IG5ldyBSZWN0YW5nbGUoKTtcblxuICAgICAgICB0aGlzLl90ZXh0ZmllbGQgPSB0aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dGZpZWxkJyk7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlID0gdGhpcy5fb25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25DaGFuZ2UsIGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRmaWVsZC5zdHlsZS50b3AgPSAnMTZweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25DaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5ibHVyKCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbkNoYW5nZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCwgZmFjdG9yLCB0aWNrKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcblxuICAgICAgICBpZiAodGljayAtIHRoaXMuX2xhc3RUaWNrID49IHRoaXMuX2JsaW5rRnJhbWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0VGljayA9IHRpY2s7XG4gICAgICAgICAgICB0aGlzLl9rYXJldFNob3cgPSAhdGhpcy5fa2FyZXRTaG93O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRleHRNZWFzdXJlbWVudCA9IGNvbnRleHQubWVhc3VyZVRleHQodGhpcy5fdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9rYXJldFNob3cgJiYgdGhpcy5fZm9jdXNlZCkge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWN0LnNldFgodGV4dE1lYXN1cmVtZW50LndpZHRoICsgMSk7XG4gICAgICAgICAgICB0aGlzLl9yZWN0LnNldEhlaWdodCh0aGlzLl9zaXplKS5zZXRXaWR0aCh0aGlzLl9zaXplIC8gNCk7XG4gICAgICAgICAgICB0aGlzLl9yZWN0LnJlbmRlcihjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgY29sb3JcbiAqL1xuY29uc3QgY29sb3IgPSB7XG4gICAgb3B0aW9uczoge30sXG5cbiAgICBnZXRSYW5kUkdCOiBmdW5jdGlvbiAobG93ID0gMCwgaGlnaCA9IDI1NSkge1xuICAgICAgICBjb25zdCByID0gbG93ICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cpKTtcbiAgICAgICAgY29uc3QgZyA9IGxvdyArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChoaWdoIC0gbG93KSk7XG4gICAgICAgIGNvbnN0IGIgPSBsb3cgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdykpO1xuICAgICAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3I7XG4iLCJpbXBvcnQgY29sb3IgZnJvbSAnLi9jb2xvcic7XG5cbi8qKlxuICogQGNsYXNzIGRlYnVnXG4gKi9cbmNvbnN0IGRlYnVnID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgeGhhaXJTaXplOiAxNlxuICAgIH0sXG5cbiAgICB0eXBlczoge1xuICAgICAgICBYSEFJUjogJ1hIQUlSJ1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICh0eXBlLCBjb250ZXh0LCBlbnRpdHkpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudHlwZXMuWEhBSVI6XG4gICAgICAgICAgICBjb25zdCBzaXplID0gdGhpcy5vcHRpb25zLnhoYWlyU2l6ZTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3IuZ2V0UmFuZFJHQigpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoZW50aXR5LmdldFgoKSArIGVudGl0eS5nZXRQaXZvdFgoKSwgZW50aXR5LmdldFkoKSArIGVudGl0eS5nZXRQaXZvdFkoKSk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KC0oc2l6ZSAvIDIpLCAwLCBzaXplLCAxKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgLShzaXplIC8gMiksIDEsIHNpemUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlYnVnO1xuIl19
