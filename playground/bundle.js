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

var camera = new _Camera2.default();
var stage = new _Stage2.default(800, 600, {
	bgColor: '#222',
	fill: true
});
var canvas = new _Canvas2.default(stage.getCanvas(), camera);
var input = new _Input2.default(stage.getCanvas());
var group = new _Group2.default();
var textInput = new _TextInput2.default(32, 32, { debug: true });
var ticker = new _Ticker2.default();

textInput.focus();
group.addItem(textInput);

input.addListener('click', function () {
	if (textInput.isFocused()) {
		textInput.blur();
	} else {
		textInput.focus();
	}
});

ticker.onTick = function (factor, ticks) {
	canvas.clear('#DDD');
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
            context.translate(this._x + this._pivotX, this._y + this._pivotY);
            context.scale(this._scaleX, this._scaleY);

            if (this._rotation !== 0) {
                context.translate(-this._pivotX, -this._pivotY);
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
            this._textfield.style.position = 'absolute';
            this._textfield.style.top = '-999px';
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

        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, x, y));

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

var _Rectangle = require('../shape/Rectangle');

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).call(this, '', x, y));

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

},{"../shapes/Rectangle":11,"./Text":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9TcHJpdGUuanMiLCJzcmMvU3RhZ2UuanMiLCJzcmMvVGlja2VyLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyIsInNyYy9zaGFwZXMvUmVjdGFuZ2xlLmpzIiwic3JjL3RleHQvVGV4dC5qcyIsInNyYy90ZXh0L1RleHRJbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLHNCQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQzVCLFVBQVMsTUFBVDtBQUNBLE9BQU0sSUFBTjtDQUZRLENBQVI7QUFJSixJQUFJLFNBQVMscUJBQVcsTUFBTSxTQUFOLEVBQVgsRUFBOEIsTUFBOUIsQ0FBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxNQUFNLFNBQU4sRUFBVixDQUFSO0FBQ0osSUFBSSxRQUFRLHFCQUFSO0FBQ0osSUFBSSxZQUFZLHdCQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBQyxPQUFPLElBQVAsRUFBdkIsQ0FBWjtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixVQUFVLEtBQVY7QUFDQSxNQUFNLE9BQU4sQ0FBYyxTQUFkOztBQUVBLE1BQU0sV0FBTixDQUFrQixPQUFsQixFQUEyQixZQUFZO0FBQ3RDLEtBQUksVUFBVSxTQUFWLEVBQUosRUFBMkI7QUFDMUIsWUFBVSxJQUFWLEdBRDBCO0VBQTNCLE1BRU87QUFDTixZQUFVLEtBQVYsR0FETTtFQUZQO0NBRDBCLENBQTNCOztBQVFBLE9BQU8sTUFBUCxH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QUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLGlCQUFKO0FBQ0EsUUFBSSxrQkFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssa0JBQUw7QUFDQSxTQUFLLGNBQUw7QUFDQSxTQUFLLGVBQUw7QUFDQSxTQUFLLHNCQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxVQUFMO0FBQ0EsU0FBSyxhQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxJQUFELEVBQU0sR0FBTixDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTDs7Ozs7Ozs7Ozs7Ozs7QUNwR0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRcUI7OztBQUNqQixhQURpQixTQUNqQixHQUEwQjtZQUFkLDBEQUFJLGlCQUFVO1lBQVAsMERBQUksaUJBQUc7OzhCQURULFdBQ1M7OzJFQURULHNCQUVQLEdBQUcsSUFEYTs7QUFHdEIsY0FBSyxLQUFMLEdBQWEsTUFBYixDQUhzQjtBQUl0QixjQUFLLE9BQUwsR0FBZSxFQUFmLENBSnNCOztLQUExQjs7aUJBRGlCOzsrQkFRVixTQUFTO0FBQ1osb0JBQVEsSUFBUixHQURZO0FBRVosdUNBVmEsaURBVUEsUUFBYixDQUZZOztBQUlaLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ1osd0JBQVEsU0FBUixHQUFvQixLQUFLLEtBQUwsQ0FEUjtBQUVaLHdCQUFRLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsS0FBSyxNQUFMLEVBQWEsS0FBSyxPQUFMLENBQXBDLENBRlk7YUFBaEI7O0FBS0EsZ0JBQUksS0FBSyxPQUFMLEVBQWM7QUFDZCx3QkFBUSxXQUFSLEdBQXNCLEtBQUssT0FBTCxDQURSO0FBRWQsd0JBQVEsVUFBUixDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixLQUFLLE1BQUwsRUFBYSxLQUFLLE9BQUwsQ0FBdEMsQ0FGYzthQUFsQjs7QUFLQSxvQkFBUSxPQUFSLEdBZFk7Ozs7Ozs7Ozs7OztnQ0F1QlIsS0FBSztBQUNULGlCQUFLLEtBQUwsR0FBYSxHQUFiLENBRFM7O0FBR1QsbUJBQU8sSUFBUCxDQUhTOzs7Ozs7Ozs7Ozs7a0NBWUgsS0FBSztBQUNYLGlCQUFLLE9BQUwsR0FBZSxHQUFmLENBRFc7O0FBR1gsbUJBQU8sSUFBUCxDQUhXOzs7O1dBM0NFOzs7Ozs7Ozs7Ozs7Ozs7O0FDUnJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCOzs7QUFDakIsYUFEaUIsSUFDakIsR0FBc0M7WUFBMUIsOERBQVEsa0JBQWtCO1lBQWQsMERBQUksaUJBQVU7WUFBUCwwREFBSSxpQkFBRzs7OEJBRHJCLE1BQ3FCOzsyRUFEckIsaUJBRVYsR0FBRyxJQUQ0Qjs7QUFHbEMsY0FBSyxNQUFMLEdBQWMsS0FBZCxDQUhrQztBQUlsQyxjQUFLLEtBQUwsR0FBYSxFQUFiLENBSmtDO0FBS2xDLGNBQUssS0FBTCxHQUFhLFlBQWIsQ0FMa0M7QUFNbEMsY0FBSyxTQUFMLEdBQWlCLEtBQWpCLENBTmtDO0FBT2xDLGNBQUssS0FBTCxHQUFhLE1BQWIsQ0FQa0M7QUFRbEMsY0FBSyxPQUFMLEdBQWUsRUFBZixDQVJrQzs7S0FBdEM7O2lCQURpQjs7bUNBWU47QUFDUCxtQkFBTyxLQUFLLE1BQUwsQ0FEQTs7Ozs7Ozs7Ozs7Ozs7OztnQ0FjSCxLQUFLO0FBQ1QsaUJBQUssS0FBTCxHQUFhLEdBQWIsQ0FEUzs7Ozs7Ozs7Ozs7O2tDQVVILEtBQUs7QUFDWCxpQkFBSyxPQUFMLEdBQWUsR0FBZixDQURXOzs7O2lDQUlOLEtBQUs7QUFDVixpQkFBSyxNQUFMLEdBQWMsR0FBZCxDQURVOzs7OytCQUlQLFNBQVM7QUFDWix1Q0E3Q2EsNENBNkNBLFFBQWIsQ0FEWTs7QUFHWixvQkFBUSxJQUFSLEdBQWtCLEtBQUssS0FBTCxXQUFnQixLQUFLLEtBQUwsQ0FIdEI7QUFJWixvQkFBUSxZQUFSLEdBQXVCLEtBQUssU0FBTCxDQUpYOztBQU1aLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ1osd0JBQVEsU0FBUixHQUFvQixLQUFLLEtBQUwsQ0FEUjtBQUVaLHdCQUFRLFFBQVIsQ0FBaUIsS0FBSyxNQUFMLEVBQWEsQ0FBOUIsRUFBaUMsQ0FBakMsRUFGWTthQUFoQjs7QUFLQSxnQkFBSSxLQUFLLE9BQUwsRUFBYztBQUNkLHdCQUFRLFdBQVIsR0FBc0IsS0FBSyxPQUFMLENBRFI7QUFFZCx3QkFBUSxVQUFSLENBQW1CLEtBQUssTUFBTCxFQUFhLENBQWhDLEVBQW1DLENBQW5DLEVBRmM7YUFBbEI7Ozs7V0F2RGE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSckI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLEdBQXFDO1lBQXpCLDBEQUFJLGlCQUFxQjtZQUFsQiwwREFBSSxpQkFBYztZQUFYLDZEQUFPLGtCQUFJOzs4QkFEcEIsV0FDb0I7OzJFQURwQixzQkFFUCxJQUFJLEdBQUcsSUFEb0I7O0FBR2pDLGNBQUssU0FBTCxHQUFpQixLQUFLLFFBQUwsSUFBaUIsUUFBakIsQ0FIZ0I7QUFJakMsY0FBSyxNQUFMLEdBQWMsS0FBSyxLQUFMLENBSm1COztBQU1qQyxjQUFLLFNBQUwsR0FBaUIsQ0FBakIsQ0FOaUM7QUFPakMsY0FBSyxZQUFMLEdBQW9CLEVBQXBCLENBUGlDO0FBUWpDLGNBQUssVUFBTCxHQUFrQixJQUFsQixDQVJpQztBQVNqQyxjQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FUaUM7O0FBV2pDLGNBQUssS0FBTCxHQUFhLHlCQUFiLENBWGlDOztBQWFqQyxjQUFLLFVBQUwsR0FBa0IsTUFBSyxTQUFMLENBQWUsY0FBZixDQUE4QixXQUE5QixDQUFsQixDQWJpQztBQWNqQyxjQUFLLFNBQUwsR0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQixDQWRpQztBQWVqQyxjQUFLLFVBQUwsQ0FBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLE1BQUssU0FBTCxFQUFnQixLQUExRCxFQWZpQzs7QUFpQmpDLFlBQUksTUFBSyxNQUFMLEVBQWE7QUFDYixrQkFBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEdBQTRCLE1BQTVCLENBRGE7U0FBakI7cUJBakJpQztLQUFyQzs7aUJBRGlCOztrQ0F1QlAsR0FBRztBQUNULGlCQUFLLE1BQUwsR0FBYyxFQUFFLE1BQUYsQ0FBUyxLQUFULENBREw7Ozs7K0JBSU47QUFDSCxpQkFBSyxVQUFMLENBQWdCLElBQWhCLEdBREc7QUFFSCxpQkFBSyxRQUFMLEdBQWdCLEtBQWhCLENBRkc7Ozs7a0NBS0c7QUFDTixpQkFBSyxVQUFMLENBQWdCLG1CQUFoQixDQUFvQyxPQUFwQyxFQUE2QyxLQUFLLFNBQUwsRUFBZ0IsS0FBN0QsRUFETTs7OztnQ0FJRjtBQUNKLGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0FESTtBQUVKLGlCQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FGSTs7OzsrQkFLRCxTQUFTLFFBQVEsTUFBTTtBQUMxQix1Q0ExQ2EsaURBMENBLFFBQWIsQ0FEMEI7O0FBRzFCLGdCQUFJLE9BQU8sS0FBSyxTQUFMLElBQWtCLEtBQUssWUFBTCxFQUFtQjtBQUM1QyxxQkFBSyxTQUFMLEdBQWlCLElBQWpCLENBRDRDO0FBRTVDLHFCQUFLLFVBQUwsR0FBa0IsQ0FBQyxLQUFLLFVBQUwsQ0FGeUI7YUFBaEQ7O0FBS0EsZ0JBQUksa0JBQWtCLFFBQVEsV0FBUixDQUFvQixLQUFLLE1BQUwsQ0FBdEMsQ0FSc0I7O0FBVTFCLGdCQUFJLEtBQUssVUFBTCxJQUFtQixLQUFLLFFBQUwsRUFBZTtBQUNsQyx3QkFBUSxJQUFSLEdBRGtDO0FBRWxDLHFCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLGdCQUFnQixLQUFoQixHQUF3QixDQUF4QixDQUFoQixDQUZrQztBQUdsQyxxQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFLLEtBQUwsQ0FBckIsQ0FBaUMsUUFBakMsQ0FBMEMsS0FBSyxLQUFMLEdBQWEsQ0FBYixDQUExQyxDQUhrQztBQUlsQyxxQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixPQUFsQixFQUprQztBQUtsQyx3QkFBUSxPQUFSLEdBTGtDO2FBQXRDOzs7O1dBbkRhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBDYW52YXMgZnJvbSAnLi9zcmMvQ2FudmFzJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL3NyYy9JbnB1dCc7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zcmMvU3RhZ2UnO1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9zcmMvc2hhcGVzL1JlY3RhbmdsZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJy4vc3JjL3RleHQvVGV4dElucHV0JztcbmltcG9ydCBHcm91cCBmcm9tICcuL3NyYy9Hcm91cCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbmxldCBjYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5sZXQgc3RhZ2UgPSBuZXcgU3RhZ2UoODAwLCA2MDAsIHtcbiAgICBiZ0NvbG9yOiAnIzIyMicsXG4gICAgZmlsbDogdHJ1ZVxufSk7XG5sZXQgY2FudmFzID0gbmV3IENhbnZhcyhzdGFnZS5nZXRDYW52YXMoKSwgY2FtZXJhKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbmxldCB0ZXh0SW5wdXQgPSBuZXcgVGV4dElucHV0KDMyLCAzMiwge2RlYnVnOiB0cnVlfSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG50ZXh0SW5wdXQuZm9jdXMoKTtcbmdyb3VwLmFkZEl0ZW0odGV4dElucHV0KTtcblxuaW5wdXQuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRpZiAodGV4dElucHV0LmlzRm9jdXNlZCgpKSB7XG5cdFx0dGV4dElucHV0LmJsdXIoKTtcblx0fSBlbHNlIHtcblx0XHR0ZXh0SW5wdXQuZm9jdXMoKTtcblx0fVxufSk7XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yLCB0aWNrcykge1xuICAgIGNhbnZhcy5jbGVhcignI0RERCcpO1xuICAgIGNhbnZhcy5yZW5kZXIoZ3JvdXAsIGZhY3RvciwgdGlja3MpO1xufTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbWVyYVxuICogQGRlc2NyaXB0aW9uIERlY2lkZXMgd2hhdCBnZXRzIHJlbmRlcmVkXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhcyBUaGUgYWN0aXZlIGNhbnZhcyBlbGVtZW50XG4gKiBAcGFyYW0ge0NhbWVyYX0gICAgICBjYW1lcmEgVGhlIGNhbWVyYSBpbnN0YW5jZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5zZXRJbWFnZVNtb290aGluZyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMgYW5kIG9wdGlvbmFsbHkgZmlsbHMgd2l0aCBhIGNvbG9yXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI2dldENvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSAyRCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9mZnNldHMgY2FudmFzIGJhc2VkIG9uIGNhbWVyYSBhbmQgY2FsbHMgYW4gZW50aXR5J3MgcmVuZGVyIG1ldGhvZCBwYXNzaW5nIHRoZSBjb250ZXh0LlxuICAgICAqIFNhdmVzIGFuZCByZXN0b3JlcyBjb250ZXh0IGFuZCBiZWdpbm5pbmcgYW5kIGVuZCBvZiBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSwgZmFjdG9yLCB0aWNrcykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fY2FtZXJhLmdldFgoKSwgLXRoaXMuX2NhbWVyYS5nZXRZKCkpO1xuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQsIGZhY3RvciwgdGlja3MpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI3NldEltYWdlU21vb3RoaW5nXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gdmFsIFRoZSBpbWFnZSBzbW9vdGhpbmcgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJbWFnZVNtb290aGluZyh2YWwpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdmFsO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxlY3Rpb25cbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyB0aGUgc29ydGFibGUsIGl0ZXJhYmxlIHN0b3JhZ2Ugb2YgZW50aXRpZXMgdGhhdCBhcmVcbiAqICAgICAgICAgICAgICBnZXR0YWJsZSwgc2V0dGFibGUsIHNvcnRhYmxlLCByZW1vdmFibGUsIGV0Y2VyYShibGUpIGJ5IG5hbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gVGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGl0ZW0geyBuYW1lLCBpdGVtIH0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0UmF3SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goZnVuY3Rpb24oaXRlckl0ZW0sIGksIGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgcmF3IGl0ZW0sIGluZGV4LCBuYW1lLCBhbmQgdGhlXG4gICAgICogbGlzdCBiZWluZyBpdGVyYXRlZCBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jhd0VhY2goZm4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChmbih0aGlzLl9pdGVtc1tpXSwgaSwgdGhpcy5faXRlbXNbaV0ubmFtZSwgdGhpcy5faXRlbXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gd2l0aCBvcHRpb25hbCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtBbnl9ICAgICAgICBpdGVtICAgVGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG5cbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtLCBuYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBtdWx0aXBsZSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5PYmplY3R9IGl0ZW1zIENhbiBiZSB0aGUgb2JqZWN0IGl0c2VsZiBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGFuZCBpdCdzIG5hbWVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZWc6IDxjb2RlPnsgaXRlbTogRW50aXR5LCBuYW1lOiAnZW50aXR5TmFtZScgfTwvY29kZT5cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSBpdGVtLCBpbmRleCwgYW5kIG5hbWUgYXJlIHN1cHBsaWVkXG4gICAgICogdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHRoZSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyBpdGVtcyBhbmQgcmV0dXJuIHRoZSBvbmVzIHRoYXQgbWVldCBjcml0ZXJpYVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVHJ1dGggcHJlZGljYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtLCBpLCBuYW1lKT0+IHtcbiAgICAgICAgICAgIGxldCBwcmVkaWNhdGUgPSBmbihpdGVtLCBpLCBuYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2NvcGUpO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGp1c3QgdGhlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW1BdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbaW5kZXhdLml0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY291bnQgb2YgaXRlbXMgaW4gY29sbGVjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVtJ3MgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtSW5kZXgobmFtZSkge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSBjb2xsZWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBvYmplY3QgYnkgbmFtZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTVy5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBpdGVtIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0obmFtZSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSwgaXRlbXMpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgbmV3IHZhbHVlIHRvIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIG1vZGlmeVxuICAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZSBUaGUgbmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0uaXRlbSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGl0ZW0gdG8gbmV3IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgYmVpbmcgbW92ZWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IFRoZSBpdGVtJ3MgbmV3IGluZGV4XG4gICAgICovXG4gICAgc2V0SXRlbUluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgobmFtZSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLl9nZXRSYXdJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBHcm91cFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gaGllcmFyY2h5IGZvciB7QGxpbmsgQ29sbGVjdGlvbn1zXG4gKiBAZXh0ZW5kcyAgICAgQ29sbGVjdGlvblxuICogQHJlcXVpcmVzICAgIFNwcml0ZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFsbCBjaGlsZHJlbiByZWN1cnNpdmVseSBvbiB0b3Agb2Ygb3duIHRyYW5zZm9ybWF0aW9uIHN0YWNrXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgMmQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICByZW5kZXIoY29udGV4dCwgZmFjdG9yLCB0aWNrcykge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW5kZXIoY29udGV4dCwgZmFjdG9yLCB0aWNrcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgICBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0cyA9IHt9KSB7XG4gICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW52YXNGaXQgPSBvcHRzLmNhbnZhc0ZpdCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JNb3VzZSA9IG9wdHMubGlzdGVuRm9yTW91c2UgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yVG91Y2ggPSBvcHRzLmxpc3RlbkZvclRvdWNoIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCA9IG9wdHMubGlzdGVuRm9yS2V5Ym9hcmQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvcktleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvck1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvclRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25UaWNrID0gdGhpcy5fb25UaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aGlzLl9vblRpY2ssIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkS2V5Ym9hcmRMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsna2V5dXAnLCAna2V5ZG93biddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbW91c2UgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRNb3VzZUxpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG91Y2ggbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRUb3VjaExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHNjYWxlIHJhdGlvIG9mIHRoZSBjYW52YXMgYmFzZWQgb24gd2l0aC9oZWdodCBhdHRycyBhbmQgY3NzIHdpZHRoL2hlaWdodFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfZ2V0U2NhbGVGYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBfZ2V0U2NhbGVGYWN0b3IoKSB7XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgY2FudmFzV2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCkge1xuICAgICAgICAgICAgY2FudmFzV2lkdGggPSBwYXJzZUludCh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgICAgIGZhY3RvciA9IGNhbnZhc1dpZHRoIC8gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDEwMCAvIGZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcG9pbnQgaXMgaW5zaWRlIHJlY3RhbmdsZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGl0VGVzdFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm91bmRpbmdCb3ggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiA8Y29kZT57IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfTwvY29kZT5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjZ2V0S2V5c0Rvd25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0S2V5c0Rvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzRG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdXNlciB0byBzZXQgYSBjdXN0b20gaGl0IHRlc3QgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEhpdFRlc3RNZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgdXNlcidzIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqL1xuICAgIHNldEhpdFRlc3RNZXRob2QoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQjc2V0SGl0VGVzdE1ldGhvZCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IGZuO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFNwcml0ZVxuICogQGRlc2NyaXB0aW9uIEJhc2UgY2xhc3MgZm9yIHBvc2l0aW9uIGJhc2VkIG9iamVjdHNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSBUaGUgaW5pdGlhbCB4IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3ldIFRoZSBpbml0aWFsIHkgcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICovXG5jbGFzcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuX3Bpdm90WCA9IDE7XG4gICAgICAgIHRoaXMuX3Bpdm90WSA9IDE7XG4gICAgICAgIHRoaXMuX3NyY1ggPSAwO1xuICAgICAgICB0aGlzLl9zcmNZID0gMDtcbiAgICAgICAgdGhpcy5fc3JjV2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5fc3JjSGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY29tcG9zaXRlIG9wZXJhdGlvbiB0eXBlLiBDYW4gYmUgc291cmNlLWF0b3B8c291cmNlLWlufHNvdXJjZS1vdXR8c291cmNlLW92ZXJ8ZGVzdGluYXRpb24tYXRvcHxkZXN0aW5hdGlvbi1pbnxkZXN0aW5hdGlvbi1vdXR8ZGVzdGluYXRpb24tb3ZlcnxsaWdodGVyfHhvcnxjb3B5XG4gICAgICAgICAqIERlZmF1bHQgaXMgJ3NvdXJjZS1vdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBAbWVtYmVyIFNwcml0ZSNfY29tcG9zaXRlXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbXBvc2l0ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgYm91bmRpbmcgYXJlYVxuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1heFg6IHRoaXMuX3ggKyAodGhpcy5fd2lkdGggICogdGhpcy5fc2NhbGVYKSxcbiAgICAgICAgICAgIG1heFk6IHRoaXMuX3kgKyAodGhpcy5faGVpZ2h0ICogdGhpcy5fc2NhbGVZKSxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Q29tcG9zaXRlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRIZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0UGl2b3RYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaXZvdFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXZvdFg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0UGl2b3RZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaXZvdFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXZvdFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uUmFkaWFucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1hcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1lcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFdpZHRoXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtyZW5kZXIgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCByZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGNvbnRleHQgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUoXG4gICAgICAgICAgICB0aGlzLl94ICsgdGhpcy5fcGl2b3RYLFxuICAgICAgICAgICAgdGhpcy5feSArIHRoaXMuX3Bpdm90WVxuICAgICAgICApO1xuICAgICAgICBjb250ZXh0LnNjYWxlKHRoaXMuX3NjYWxlWCwgdGhpcy5fc2NhbGVZKTtcblxuICAgICAgICBpZiAodGhpcy5fcm90YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC10aGlzLl9waXZvdFgsIC10aGlzLl9waXZvdFkpO1xuICAgICAgICAgICAgY29udGV4dC5yb3RhdGUodGhpcy5fcm90YXRpb24pO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX3Bpdm90WCwgLXRoaXMuX3Bpdm90WSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgY29tcG9zaXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldENvbXBvc2l0ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0SGVpZ2h0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBoZWlnaHQgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFBpdm90WFxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0UGl2b3RYKHZhbCkge1xuICAgICAgICB0aGlzLl9waXZvdFggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0UGl2b3RZXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRQaXZvdFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3Bpdm90WSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWwgKiBNYXRoLlBJIC8gMTgwO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1hcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1ggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1lcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1kgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB3aWR0aCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRXaWR0aCh2YWwpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbi8qKlxuICogQG1lbWJlciBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHRcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdCA9ICdzb3VyY2Utb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFN0YWdlXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIGVsZW1lbnQuIGluY2x1ZGVkIGluIHRoZSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHVzZWQgZm9yIHRlc3RpbmcgYWdhaW5zdFxuICogICAgICAgICAgICAgIGEgdmlydHVhbCBkb20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW3dpZHRoXSAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbaGVpZ2h0XSAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0c10gICAgICAgICAgU3RhZ2Ugb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdHMucGFyZW50RWxdIFRoZSBlbGVtZW50IHdpdGggd2hpY2ggdG8gYXR0YWNoIHRoZSBjYW52YXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm9uZSBnaXZlbiB0aGUgYm9keSBpcyB1c2VkLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMuYmdDb2xvcl0gIFRoZSBwYXJlbnQgZWxlbWVudCdzIGJnIGNvbG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy5kb2N1bWVudF0gRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLndpbmRvd10gICBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtCb29sZWFufSAgICAgW29wdHMuZmlsbF0gICAgIFNldCB0byBmYWxzZSB0byBub3QgbWF4aW1hbGx5IGZpbGwgdmlld3BvcnQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyB0cnVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Iod2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSBvcHRzLmZpbGwgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLmZpbGw7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gb3B0cy5wYXJlbnRFbCB8fCB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRzLmJnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhZ2VFbGVtZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlU3RhZ2VFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5fc3RhZ2UgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fcGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fc3RhZ2UpO1xuXG4gICAgICAgIHRoaXMuX3RleHRmaWVsZCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuc3R5bGUudG9wID0gJy05OTlweCc7XG4gICAgICAgIC8vIFRPRE8gdmVyaWZ5IHZhbHVlICdub25lJ1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuYXV0b2NhcGl0YWxpemUgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5pZCA9ICd0ZXh0ZmllbGQnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl90ZXh0ZmllbGQpO1xuXG4gICAgICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdGhpcy5fdmlkZW8uaWQgPSd2aWRlbyc7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdmlkZW8pO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBfcmVzaXplRWxlbWVudCBmb3Igc3RhZ2UgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX2hhbmRsZVJlc2l6ZVxuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl92aWRlbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgdG8gaGFuZGxlIHJlc2l6ZSBiYXNlZCBvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19yZXNpemVFbGVtZW50XG4gICAgICogQHBhcmFtICB7SFRNTEVudGl0eX0gZWwgVGhlIGVsZW1lbnQgdG8gcmVzaXplXG4gICAgICovXG4gICAgX3Jlc2l6ZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gU3RhZ2UuZmlsbChcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBTdGFnZS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldENhbnZhc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldFZpZGVvXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbWl6ZXMgYW4gZWxlbWVudCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnQgdmlhIENTUy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuZmlsbFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWxsKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gdmlld3BvcnRIZWlnaHQgLyB2aWV3cG9ydFdpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB2aWV3cG9ydFdpZHRoIC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2VlcHMgc3RhZ2UgZWxlbWVudCBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuY2VudGVyXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgdG9wIGFuZCBsZWZ0XG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogKHZpZXdwb3J0V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgdG9wOiAodmlld3BvcnRIZWlnaHQgLSBoZWlnaHQpIC8gMlxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGJhc2VkIG9uIGdpdmVuIGZwcyBhbmQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdICAgICAgICAgV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzXSAgICAgICAgICBPcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLndpbmRvd10gICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLmRvY3VtZW50XSBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydCA9IHRydWUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAobm93IC0gdGhpcy5fdGhlbikgLyAxMDAwO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgY29uc3QgZXZ0T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB0aGlzLl90aWNrc1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50cyBhbmQgZXhlY3V0ZSBjYWxsYmFja3NcbiAgICAgICAgbGV0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncHJldGljaycsIGV2dE9iamVjdCk7XG4gICAgICAgIHRoaXMub25QcmVUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblBvc3RUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBwcmUgZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25QcmVUaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25QcmVUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcG9zdCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25Qb3N0VGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUG9zdFRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICA4OiAnQkFDS1NQQUNFJyxcbiAgICA5OiAnVEFCJyxcbiAgICAxMzogJ0VOVEVSJyxcbiAgICAxNjogJ1NISUZUJyxcbiAgICAxNzogJ0NUUkwnLFxuICAgIDE4OiAnQUxUJyxcbiAgICAxOTogJ1BBVVNFX0JSRUFLJyxcbiAgICAyMDogJ0NBUFNfTE9DSycsXG4gICAgMjc6ICdFU0NBUEUnLFxuICAgIDMzOiAnUEFHRV9VUCcsXG4gICAgMzQ6ICdQQUdFX0RPV04nLFxuICAgIDM1OiAnRU5EJyxcbiAgICAzNjogJ0hPTUUnLFxuICAgIDM3OiAnTEVGVF9BUlJPVycsXG4gICAgMzg6ICdVUF9BUlJPVycsXG4gICAgMzk6ICdSSUdIVF9BUlJPVycsXG4gICAgNDA6ICdET1dOX0FSUk9XJyxcbiAgICA0NTogJ0lOU0VSVCcsXG4gICAgNDY6ICdERUxFVEUnLFxuICAgIDQ4OiBbMCwnKSddLFxuICAgIDQ5OiBbMSwnISddLFxuICAgIDUwOiBbMiwnQCddLFxuICAgIDUxOiBbMywnIyddLFxuICAgIDUyOiBbNCwnJCddLFxuICAgIDUzOiBbNSwnJSddLFxuICAgIDU0OiBbNiwnXiddLFxuICAgIDU1OiBbNywnJiddLFxuICAgIDU2OiBbOCwnKiddLFxuICAgIDU3OiBbOSwnKCddLFxuICAgIDY1OiAnQScsXG4gICAgNjY6ICdCJyxcbiAgICA2NzogJ0MnLFxuICAgIDY4OiAnRCcsXG4gICAgNjk6ICdFJyxcbiAgICA3MDogJ0YnLFxuICAgIDcxOiAnRycsXG4gICAgNzI6ICdIJyxcbiAgICA3MzogJ0knLFxuICAgIDc0OiAnSicsXG4gICAgNzU6ICdLJyxcbiAgICA3NjogJ0wnLFxuICAgIDc3OiAnTScsXG4gICAgNzg6ICdOJyxcbiAgICA3OTogJ08nLFxuICAgIDgwOiAnUCcsXG4gICAgODE6ICdRJyxcbiAgICA4MjogJ1InLFxuICAgIDgzOiAnUycsXG4gICAgODQ6ICdUJyxcbiAgICA4NTogJ1UnLFxuICAgIDg2OiAnVicsXG4gICAgODc6ICdXJyxcbiAgICA4ODogJ1gnLFxuICAgIDg5OiAnWScsXG4gICAgOTA6ICdaJyxcbiAgICA5MTogJ0xFRlRfV0lORE9XX0tFWScsXG4gICAgOTI6ICdSSUdIVF9XSU5ET1dfS0VZJyxcbiAgICA5MzogJ1NFTEVDVF9LRVknLFxuICAgIDk2OiAnTlVNX1BBRF8wJyxcbiAgICA5NzogJ05VTV9QQURfMScsXG4gICAgOTg6ICdOVU1fUEFEXzInLFxuICAgIDk5OiAnTlVNX1BBRF8zJyxcbiAgICAxMDA6ICdOVU1fUEFEXzQnLFxuICAgIDEwMTogJ05VTV9QQURfNScsXG4gICAgMTAyOiAnTlVNX1BBRF82JyxcbiAgICAxMDM6ICdOVU1fUEFEXzcnLFxuICAgIDEwNDogJ05VTV9QQURfOCcsXG4gICAgMTA1OiAnTlVNX1BBRF85JyxcbiAgICAxMDY6ICdOVU1fUEFEX0FTVEVSSVNLJyxcbiAgICAxMDc6ICdOVU1fUEFEX1BMVVMnLFxuICAgIDEwOTogJ05VTV9QQURfTUlOVVMnLFxuICAgIDExMTogJ05VTV9QQURfRk9XQVJEX1NMQVNIJyxcbiAgICAxMTI6ICdGMScsXG4gICAgMTEzOiAnRjInLFxuICAgIDExNDogJ0YzJyxcbiAgICAxMTU6ICdGNCcsXG4gICAgMTE2OiAnRjUnLFxuICAgIDExNzogJ0Y2JyxcbiAgICAxMTg6ICdGNycsXG4gICAgMTE5OiAnRjgnLFxuICAgIDEyMDogJ0Y5JyxcbiAgICAxMjE6ICdGMTAnLFxuICAgIDEyMjogJ0YxMScsXG4gICAgMTIzOiAnRjEyJyxcbiAgICAxNDQ6ICdOVU1fTE9DSycsXG4gICAgMTQ1OiAnU0NST0xMX0xPQ0snLFxuICAgIDE4NjogWyc7JywnOiddLFxuICAgIDE4NzogWyc9JywnKyddLFxuICAgIDE4ODogWycsJywnPCddLFxuICAgIDE4OTogWyctJywnXyddLFxuICAgIDE5MDogWycuJywnPiddLFxuICAgIDE5MTogWycvJywnPyddLFxuICAgIDE5MjogWydgJywnfiddLFxuICAgIDIxOTogWydbJywneyddLFxuICAgIDIyMDogWydcXFxcJywnfCddLFxuICAgIDIyMTogWyddJywnfSddLFxuICAgIDIyMjogWydcXCcnLCdcIiddXG59O1xuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFJlY3RhbmdsZVxuICogQGV4dGVuZHMge0BsaW5rIFNwcml0ZX1cbiAqIEBkZXNjICAgIEEgc3ByaXRlIHRoYXQgcmVuZGVycyBhcyBhIHJlY3RhbmdsZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fZmlsbDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3Ryb2tlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fc3Ryb2tlO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldEZpbGwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFJlY3RhbmdsZSNzZXRGaWxsXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIGZpbGwgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRGaWxsKHZhbCkge1xuICAgICAgICB0aGlzLl9maWxsID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRTdHJva2UgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFJlY3RhbmdsZSNzZXRTdHJva2VcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgc3Ryb2tlIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0U3Ryb2tlKHZhbCkge1xuICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFRleHRcbiAqIEBkZXNjICAgIFJlbmRlcnMgYW4gaHRtbCB0ZXh0ZmllbGQgZWxlbWVudFxuICogQGV4dGVuZHMgU3ByaXRlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUgPSAnJywgeCA9IDAsIHkgPSAwKSB7XG4gICAgXHRzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9zaXplID0gMTY7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSAnc2Fucy1zZXJpZic7XG4gICAgICAgIHRoaXMuX2Jhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgLypnZXRUZXh0V2lkdGgoKSB7XG4gICAgXHRyZXR1cm5cbiAgICB9Ki9cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBUZXh0I3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGV4dCNzZXRTdHJva2VcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgc3Ryb2tlIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0U3Ryb2tlKHZhbCkge1xuICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWw7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBgJHt0aGlzLl9zaXplfXB4ICR7dGhpcy5fZm9udH1gO1xuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IHRoaXMuX2Jhc2VsaW5lO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMuX3ZhbHVlLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVRleHQodGhpcy5fdmFsdWUsIDAsIDApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vc2hhcGVzL1JlY3RhbmdsZSc7XG5cbi8qKlxuICogQGNsYXNzICAgVGV4dElucHV0XG4gKiBAZGVzYyAgICBSZW5kZXJzIGFuIGh0bWwgdGV4dGZpZWxkIGVsZW1lbnRcbiAqIEBleHRlbmRzIFRleHRcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcignJywgeCAseSk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl9kZWJ1ZyA9IG9wdHMuZGVidWc7XG5cbiAgICAgICAgdGhpcy5fbGFzdFRpY2sgPSAwO1xuICAgICAgICB0aGlzLl9ibGlua0ZyYW1lcyA9IDMwO1xuICAgICAgICB0aGlzLl9rYXJldFNob3cgPSB0cnVlO1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcmVjdCA9IG5ldyBSZWN0YW5nbGUoKTtcblxuICAgICAgICB0aGlzLl90ZXh0ZmllbGQgPSB0aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dGZpZWxkJyk7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlID0gdGhpcy5fb25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25DaGFuZ2UsIGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRmaWVsZC5zdHlsZS50b3AgPSAnMTZweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25DaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5ibHVyKCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbkNoYW5nZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQsIGZhY3RvciwgdGljaykge1xuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHRpY2sgLSB0aGlzLl9sYXN0VGljayA+PSB0aGlzLl9ibGlua0ZyYW1lcykge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFRpY2sgPSB0aWNrO1xuICAgICAgICAgICAgdGhpcy5fa2FyZXRTaG93ID0gIXRoaXMuX2thcmV0U2hvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0ZXh0TWVhc3VyZW1lbnQgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMuX3ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fa2FyZXRTaG93ICYmIHRoaXMuX2ZvY3VzZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fcmVjdC5zZXRYKHRleHRNZWFzdXJlbWVudC53aWR0aCArIDEpO1xuICAgICAgICAgICAgdGhpcy5fcmVjdC5zZXRIZWlnaHQodGhpcy5fc2l6ZSkuc2V0V2lkdGgodGhpcy5fc2l6ZSAvIDQpO1xuICAgICAgICAgICAgdGhpcy5fcmVjdC5yZW5kZXIoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
