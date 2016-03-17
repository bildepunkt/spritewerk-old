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
var rect = new _Rectangle2.default().setFill('#999').setWidth(64).setHeight(64).setRotation(45).setPivotX(32).setPivotY(32);
var text = new _Text2.default();
var ticker = new _Ticker2.default();

//text.setValue('foobar');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9TcHJpdGUuanMiLCJzcmMvU3RhZ2UuanMiLCJzcmMvVGlja2VyLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyIsInNyYy9zaGFwZXMvUmVjdGFuZ2xlLmpzIiwic3JjL3RleHQvVGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLHNCQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQzVCLGFBQVMsTUFBVDtBQUNBLFVBQU0sSUFBTjtDQUZRLENBQVI7QUFJSixJQUFJLFNBQVMscUJBQVcsTUFBTSxTQUFOLEVBQVgsRUFBOEIsTUFBOUIsQ0FBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxNQUFNLFNBQU4sRUFBVixDQUFSO0FBQ0osSUFBSSxRQUFRLHFCQUFSO0FBQ0osSUFBSSxPQUFPLDBCQUNULE9BRFMsQ0FDRCxNQURDLEVBRVQsUUFGUyxDQUVBLEVBRkEsRUFHVCxTQUhTLENBR0MsRUFIRCxFQUlULFdBSlMsQ0FJRyxFQUpILEVBS1QsU0FMUyxDQUtDLEVBTEQsRUFNVCxTQU5TLENBTUMsRUFORCxDQUFQO0FBT0osSUFBSSxPQUFPLG9CQUFQO0FBQ0osSUFBSSxTQUFTLHNCQUFUOzs7OztBQUtKLE1BQU0sT0FBTixDQUFjLElBQWQ7QUFDQSxNQUFNLE9BQU4sQ0FBYyxJQUFkOztBQUVBLE9BQU8sTUFBUCxHQUFnQixVQUFVLE1BQVYsRUFBa0I7QUFDOUIsV0FBTyxLQUFQLENBQWEsTUFBYixFQUQ4QjtBQUU5QixX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O0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxpQkFBSjtBQUNBLFFBQUksa0JBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7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T0FBTCxDQURSO0FBRWQsd0JBQVEsVUFBUixDQUFtQixLQUFLLE1BQUwsRUFBYSxDQUFoQyxFQUFtQyxDQUFuQyxFQUZjO2FBQWxCOztBQUtBLG9CQUFRLE9BQVIsR0FoQlk7Ozs7V0F2Q0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbWVyYSBmcm9tICcuL3NyYy9DYW1lcmEnO1xuaW1wb3J0IENhbnZhcyBmcm9tICcuL3NyYy9DYW52YXMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdCBmcm9tICcuL3NyYy9zaGFwZXMvUmVjdGFuZ2xlJztcbmltcG9ydCBUZXh0IGZyb20gJy4vc3JjL3RleHQvVGV4dCc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9zcmMvR3JvdXAnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGNhbnZhcyA9IG5ldyBDYW52YXMoc3RhZ2UuZ2V0Q2FudmFzKCksIGNhbWVyYSk7XG5sZXQgaW5wdXQgPSBuZXcgSW5wdXQoc3RhZ2UuZ2V0Q2FudmFzKCkpO1xubGV0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG5sZXQgcmVjdCA9IG5ldyBSZWN0KClcblx0LnNldEZpbGwoJyM5OTknKVxuXHQuc2V0V2lkdGgoNjQpXG5cdC5zZXRIZWlnaHQoNjQpXG5cdC5zZXRSb3RhdGlvbig0NSlcblx0LnNldFBpdm90WCgzMilcblx0LnNldFBpdm90WSgzMik7XG5sZXQgdGV4dCA9IG5ldyBUZXh0KCk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG4vL3RleHQuc2V0VmFsdWUoJ2Zvb2JhcicpO1xuLy90ZXh0LnNldFJvdGF0aW9uKDkwKTtcblxuZ3JvdXAuYWRkSXRlbShyZWN0KTtcbmdyb3VwLmFkZEl0ZW0odGV4dCk7XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yKSB7XG4gICAgY2FudmFzLmNsZWFyKCcjREREJyk7XG4gICAgY2FudmFzLnJlbmRlcihncm91cCk7XG59O1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gRGVjaWRlcyB3aGF0IGdldHMgcmVuZGVyZWRcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FudmFzXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyByZW5kZXJpbmcgZW50aXRpZXMgb250byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzIFRoZSBhY3RpdmUgY2FudmFzIGVsZW1lbnRcbiAqIEBwYXJhbSB7Q2FtZXJhfSAgICAgIGNhbWVyYSBUaGUgY2FtZXJhIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLnNldEltYWdlU21vb3RoaW5nKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZW50aXJlIGNhbnZhcyBhbmQgb3B0aW9uYWxseSBmaWxscyB3aXRoIGEgY29sb3JcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI2NsZWFyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY29sb3JdIElmIHBhc3NlZCwgd2lsbCBmaWxsIHRoZSBjYW52YXMgd2l0aCB0aGUgY29sb3IgdmFsdWVcbiAgICAgKi9cbiAgICBjbGVhcihjb2xvcikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIDJEIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2Zmc2V0cyBjYW52YXMgYmFzZWQgb24gY2FtZXJhIGFuZCBjYWxscyBhbiBlbnRpdHkncyByZW5kZXIgbWV0aG9kIHBhc3NpbmcgdGhlIGNvbnRleHQuXG4gICAgICogU2F2ZXMgYW5kIHJlc3RvcmVzIGNvbnRleHQgYW5kIGJlZ2lubmluZyBhbmQgZW5kIG9mIG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZW50aXR5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNsYXRlKC10aGlzLl9jYW1lcmEuZ2V0WCgpLCAtdGhpcy5fY2FtZXJhLmdldFkoKSk7XG4gICAgICAgIGVudGl0eS5yZW5kZXIodGhpcy5fY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb250ZXh0IGltYWdlIHNtb290aGluZ1xuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjc2V0SW1hZ2VTbW9vdGhpbmdcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSB2YWwgVGhlIGltYWdlIHNtb290aGluZyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEltYWdlU21vb3RoaW5nKHZhbCkge1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ29sbGVjdGlvblxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIHRoZSBzb3J0YWJsZSwgaXRlcmFibGUgc3RvcmFnZSBvZiBlbnRpdGllcyB0aGF0IGFyZVxuICogICAgICAgICAgICAgIGdldHRhYmxlLCBzZXR0YWJsZSwgc29ydGFibGUsIHJlbW92YWJsZSwgZXRjZXJhKGJsZSkgYnkgbmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBUaGUgc29ydGVkIGxpc3RcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaXRlbSB7IG5hbWUsIGl0ZW0gfSBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRSYXdJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5fcmF3RWFjaChmdW5jdGlvbihpdGVySXRlbSwgaSwgaXRlck5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSByYXcgaXRlbSwgaW5kZXgsIG5hbWUsIGFuZCB0aGVcbiAgICAgKiBsaXN0IGJlaW5nIGl0ZXJhdGVkIGFyZSBzdXBwbGllZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmF3RWFjaChmbikge1xuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9pdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGZuKHRoaXMuX2l0ZW1zW2ldLCBpLCB0aGlzLl9pdGVtc1tpXS5uYW1lLCB0aGlzLl9pdGVtcykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gaXRlbSB3aXRoIG9wdGlvbmFsIG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0FueX0gICAgICAgIGl0ZW0gICBUaGUgaXRlbSB0byBhZGRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbbmFtZV0gVGhlIG9wdGlvbmFsIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbSwgbmFtZSkge1xuICAgICAgICBuYW1lID0gbmFtZSB8fCAnJztcblxuICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGl0ZW0sIG5hbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG11bHRpcGxlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLk9iamVjdH0gaXRlbXMgQ2FuIGJlIHRoZSBvYmplY3QgaXRzZWxmIG9yIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBlbnRpdHkgYW5kIGl0J3MgbmFtZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICBlZzogPGNvZGU+eyBpdGVtOiBFbnRpdHksIG5hbWU6ICdlbnRpdHlOYW1lJyB9PC9jb2RlPlxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbXMoLi4uaXRlbXMpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLml0ZW0gPT09ICdvYmplY3QnICYmIHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaXRlbSBoYXMgaXRlbS9uYW1lIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtLml0ZW0sIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZvciBjb252ZW5pZW5jZSBhbGxvdyB1c2VyIHRvIGFkZCBqdXN0IGl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIGl0ZW0sIGluZGV4LCBhbmQgbmFtZSBhcmUgc3VwcGxpZWRcbiAgICAgKiB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuICAgICAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdGhlIGl0ZXJhYmxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgW3Njb3BlXSBUaGUgc2NvcGUgd2l0aCB3aGljaCB0byBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgICAqL1xuICAgIGVhY2goZm4sIHNjb3BlKSB7XG4gICAgICAgIGZuID0gc2NvcGUgPyBmbi5iaW5kKHNjb3BlKSA6IGZuO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9pdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9pdGVtc1tpXTtcblxuICAgICAgICAgICAgaWYgKGZuKGl0ZW0uaXRlbSwgaSwgaXRlbS5uYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGl0ZXJhdGVzIGl0ZW1zIGFuZCByZXR1cm4gdGhlIG9uZXMgdGhhdCBtZWV0IGNyaXRlcmlhXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgICBUcnV0aCBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW3Njb3BlXSBUaGUgc2NvcGUgd2l0aCB3aGljaCB0byBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZpbHRlcihmbiwgc2NvcGUpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXMgPSBbXTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0sIGksIG5hbWUpPT4ge1xuICAgICAgICAgICAgbGV0IHByZWRpY2F0ZSA9IGZuKGl0ZW0sIGksIG5hbWUpO1xuXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzY29wZSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkSXRlbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YganVzdCB0aGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGdldEl0ZW1BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLm1hcCgoaXRlbSk9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pdGVtO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgbmFtZSwgb3IgdW5kZWZpbmVkIGlmIHRoZSBuYW1lIGlzIG5vdCBmb3VuZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbUF0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1tpbmRleF0uaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb3VudCBvZiBpdGVtcyBpbiBjb2xsZWN0aW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEl0ZW1Db3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGl0ZW0ncyBjdXJyZW50IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEl0ZW1JbmRleChuYW1lKSB7XG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIGNvbGxlY3Rpb25cbiAgICAgKi9cbiAgICByZW1vdmVBbGxJdGVtcygpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIG9iamVjdCBieSBuYW1lXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNXLkNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUl0ZW1cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGl0ZW0gcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgcmVtb3ZlSXRlbShuYW1lKSB7XG4gICAgICAgIHZhciByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lLCBpdGVtcyk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVySXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgYSBuZXcgdmFsdWUgdG8gYW4gZXhpc3RpbmcgaXRlbVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgdG8gbW9kaWZ5XG4gICAgICogQHBhcmFtIHtBbnl9ICAgIHZhbHVlIFRoZSBuZXcgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVySXRlbS5pdGVtID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgaXRlbSB0byBuZXcgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCBiZWluZyBtb3ZlZFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggVGhlIGl0ZW0ncyBuZXcgaW5kZXhcbiAgICAgKi9cbiAgICBzZXRJdGVtSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChuYW1lKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbSA9IHRoaXMuX2dldFJhd0l0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5faXRlbXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL0NvbGxlY3Rpb24nO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIEdyb3VwXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgYSB0cmFuc2Zvcm1hdGlvbiBoaWVyYXJjaHkgZm9yIHtAbGluayBDb2xsZWN0aW9ufXNcbiAqIEBleHRlbmRzICAgICBDb2xsZWN0aW9uXG4gKiBAcmVxdWlyZXMgICAgU3ByaXRlXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cCBleHRlbmRzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IG9uIHRvcCBvZiBvd24gdHJhbnNmb3JtYXRpb24gc3RhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSAyZCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSk9PiB7XG4gICAgICAgICAgICBpdGVtLnJlbmRlcihjb250ZXh0KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGtleWNvZGVzIGZyb20gJy4vbGliL2tleWNvZGVzJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgSW5wdXRcbiAqIEBkZXNjcmlwdGlvbiBBIG1vZHVsZSBmb3IgaGFuZGxpbmcga2V5Ym9hcmQsIG1vdXNlLCBhbmQgdG91Y2ggZXZlbnRzIG9uIHRoZSBjYW52YXNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbnRpdHl9IGNhbnZhcyAgICAgICAgICAgICAgICAgICBUaGUgY2FudmFzIGVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aFxuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0c11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMuY2FudmFzRml0XSAgICAgICAgIFNldCB0byB0cnVlIGlmIHVzaW5nIGNzcyB0byBmaXQgdGhlIGNhbnZhcyBpbiB0aGUgdmlld3BvcnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yTW91c2VdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvclRvdWNoXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIHRvdWNoIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JLZXlib2FyZF0gV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBrZXlib2FyZCBldmVudHNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMud2luZG93XSAgICAgICAgICAgIHdpbmRvdyBvYmplY3QgZm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMuZG9jdW1lbnRdICAgICAgICAgIGRvY3VtZW50IG9iamVjdCBmb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdHMuY2FudmFzRml0IHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvck1vdXNlID0gb3B0cy5saXN0ZW5Gb3JNb3VzZSB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JUb3VjaCA9IG9wdHMubGlzdGVuRm9yVG91Y2ggfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvcktleWJvYXJkID0gb3B0cy5saXN0ZW5Gb3JLZXlib2FyZCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICB0aGlzLl91aUV2ZW50cyA9IHtcbiAgICAgICAgICAgIERCTF9DTElDSzogJ2RibGNsaWNrJyxcbiAgICAgICAgICAgIERCTF9UQVA6ICdkYmx0YXAnLFxuXG4gICAgICAgICAgICBEUkFHOiAnZHJhZycsXG4gICAgICAgICAgICBEUkFHX0VORDogJ2RyYWdlbmQnLFxuICAgICAgICAgICAgRFJBR19TVEFSVDogJ2RyYWdzdGFydCcsXG5cbiAgICAgICAgICAgIENMSUNLOiAnY2xpY2snLFxuICAgICAgICAgICAgVEFQOiAndGFwJyxcblxuICAgICAgICAgICAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gICAgICAgICAgICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICAgICAgICAgICAgVE9VQ0hfU1RBUlQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAgIFRPVUNIX0VORDogJ3RvdWNoZW5kJyxcblxuICAgICAgICAgICAgTU9VU0VfTU9WRTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICBUT1VDSF9NT1ZFOiAndG91Y2htb3ZlJyxcblxuICAgICAgICAgICAgS0VZX1VQOiAna2V5dXAnLFxuICAgICAgICAgICAgS0VZX0RPV046ICdrZXlkb3duJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGxpc3RlbmVycyB2YWx1ZXMgYXJlIGFycmF5cyBvZiBvYmplY3RzIGNvbnRhaW5pbmcgaGFuZGxlcnMgYW5kIChvcHRpb25hbCkgdGFyZ2V0c1xuICAgICAgICAvLyBlZzogdGhpcy5fbGlzdGVuZXJzLmtleXVwID0gW3tcbiAgICAgICAgLy8gICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7Li4ufSxcbiAgICAgICAgLy8gICAgICAgICB0YXJnZXQ6IHsgbmFtZTogJ2ZvbycsIHg6IDMyLCB5OiA2NCwgLi4ufVxuICAgICAgICAvLyAgICAgfV07XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl91aUV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3RoaXMuX3VpRXZlbnRzW2tleV1dID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9rZXljb2RlcyA9IGtleWNvZGVzO1xuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSB7fTtcbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEtleWJvYXJkTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yTW91c2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yVG91Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vblRpY2sgPSB0aGlzLl9vblRpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIHRoaXMuX29uVGljaywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRLZXlib2FyZExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZEtleWJvYXJkTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydrZXl1cCcsICdrZXlkb3duJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBtb3VzZSBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZE1vdXNlTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZFRvdWNoTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgc2NhbGUgcmF0aW8gb2YgdGhlIGNhbnZhcyBiYXNlZCBvbiB3aXRoL2hlZ2h0IGF0dHJzIGFuZCBjc3Mgd2lkdGgvaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19nZXRTY2FsZUZhY3RvclxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTAwIC8gZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBwb2ludCBpcyBpbnNpZGUgcmVjdGFuZ2xlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oaXRUZXN0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geCAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geSAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib3VuZGluZ0JveCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBfaGl0VGVzdCh4LCB5LCBib3VuZGluZ0JveCkge1xuICAgICAgICByZXR1cm4geCA+PSBib3VuZGluZ0JveC5taW5YICYmIHggPD0gYm91bmRpbmdCb3gubWF4WCAmJlxuICAgICAgICAgICAgeSA+PSBib3VuZGluZ0JveC5taW5ZICYmIHkgPD0gYm91bmRpbmdCb3gubWF4WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hhbmRsZUtleWJvYXJkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgdGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9oYW5kbGVLZXlib2FyZChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQga2V5TmFtZSA9IHRoaXMuX2tleWNvZGVzW2lucHV0RXZlbnQua2V5Q29kZV07XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlLFxuICAgICAgICAgICAga2V5Q29kZTogaW5wdXRFdmVudC5rZXlDb2RlLFxuICAgICAgICAgICAga2V5TmFtZTogdHlwZW9mIGtleU5hbWUgPT09ICdvYmplY3QnICYmIGtleU5hbWUubGVuZ3RoID9cbiAgICAgICAgICAgICAgICBrZXlOYW1lWzBdIDpcbiAgICAgICAgICAgICAgICBrZXlOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNEb3duW2tleU5hbWVdID0gaW5wdXRFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfVVA6XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tleXNEb3duW2tleU5hbWVdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQua2V5c0Rvd24gPSB0aGlzLmdldEtleXNEb3duKCk7XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqIENyZWF0ZXMgZXZlbnQgb2JqZWN0cyB3aXRoIHgveSBjb29yZGluYXRlcyBiYXNlZCBvbiBzY2FsaW5nIGFuZCBhYnNYL2Fic1kgZm9yXG4gICAgICogYWJzb2x1dGUgeC95IHJlZ2FyZGxlc3Mgb2Ygc2NhbGUgb2Zmc2V0XG4gICAgICogT25seSB1c2VzIGZpcnN0IHRvdWNoIGV2ZW50LCB0aHVzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGluZyBtdWx0aS10b3VjaFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCBUaGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9oYW5kbGVNb3VzZUFuZFRvdWNoKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBzY2FsZUZhY3RvciA9IHRoaXMuX2NhbnZhc0ZpdCA/IHRoaXMuX2dldFNjYWxlRmFjdG9yKCkgOiAxO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudC54ID0gTWF0aC5yb3VuZChldmVudC5hYnNYICogc2NhbGVGYWN0b3IpO1xuICAgICAgICBldmVudC55ID0gTWF0aC5yb3VuZChldmVudC5hYnNZICogc2NhbGVGYWN0b3IpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9ET1dOOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9TVEFSVDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfVVA6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX0VORDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19FTkRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX01PVkU6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX01PVkU6XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfU1RBUlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgZHVwbGljYXRlIGhhbmRsZXIgaW4gdGhlIGxpc3RlbmVyIHR5b2UgYmVpbmcgYWRkZWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2lzRHVwbGljYXRlSGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgaGFuZGxlciB0byBjaGVja1xuICAgICAqIEBwYXJhbSAge0FycmF5fSAgICBoYW5kbGVycyBUaGUgaGFuZGxlcnMgb2YgdGhlIGxpc3RlbmVyIHR5cGUgYmVpbmcgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICBsZXQgZHVwID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGhhbmRsZXJPYmplY3QuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHVwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFsbCBxdWV1ZWQgZXZlbnRzLiBQYXNzZXMgdGhlIGZhY3RvciBhbmQgdGlja3MgZnJvbSB7QGxpbmsgVGlja2VyfVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfb25UaWNrXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlIFRoZSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfb25UaWNrKGUpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgdGhpcy5fcXVldWVkRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VySGFuZGxlcnMoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZXhlY3V0ZXMgaGFuZGxlcnMgb2YgdGhlIGdpdmVuIGV2ZW50J3MgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfdHJpZ2dlckhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJpZ2dlckhhbmRsZXJzKGV2ZW50KSB7XG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgdGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdKSB7XG5cbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRUZXN0ID0gdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgfHwgdGhpcy5faGl0VGVzdDtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRUZXN0KGV2ZW50LngsIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QudGFyZ2V0LmdldEJvdW5kaW5nQXJlYSgpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IGhhbmRsZXJPYmplY3QudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGV2ZW50IHdhcyBib3VuZCB3aXRoIGEgdGFyZ2V0IHRyaWdnZXIgaGFuZGxlciBPTkxZIGlmIHRhcmdldCBoaXRcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgaGFuZGxlciBmb3IgYSBjZXJ0YWluIGV2ZW50IHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjYWRkTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICAgVGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCB0cmlnZ2VyZWRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgW3RhcmdldF0gVGhlIHRhcmdldCB0byBjaGVjayBldmVudCB0cmlnZ2VyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgUmV0dXJucyB0cnVlIGlmIGFkZGVkIGFuZCBmYWxzZSBpZiBjYWxsYmFjayBhbHJlYWR5IGV4aXN0c1xuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHRhcmdldCkge1xuICAgICAgICBsZXQgaGFuZGxlck9iamVjdHMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCBkdXA7XG5cblxuICAgICAgICBpZiAoISBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVyT2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGR1cCA9IHRoaXMuX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWR1cCkge1xuICAgICAgICAgICAgaGFuZGxlck9iamVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaGFuZGxlciwgdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbWF0Y2hpbmcgaGFuZGxlciBpZiBmb3VuZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNyZW1vdmVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gIHJlbW92ZWQgUmV0dXJucyB0cnVlIGlmIHJlbW92ZWQgYW5kIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlck9iamVjdCA9IGhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QuaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBrZXlzIGN1cnJlbnRseSBiZWluZyBwcmVzc2VkXG4gICAgICogZWc6IDxjb2RlPnsgTEVGVF9BUlJPVzogMzcsIFVQX0FSUk9XOiAzOCB9PC9jb2RlPlxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNnZXRLZXlzRG93blxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRLZXlzRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNEb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1c2VyIHRvIHNldCBhIGN1c3RvbSBoaXQgdGVzdCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0SGl0VGVzdE1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSB1c2VyJ3MgaGl0IHRlc3QgbWV0aG9kXG4gICAgICovXG4gICAgc2V0SGl0VGVzdE1ldGhvZChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCNzZXRIaXRUZXN0TWV0aG9kIHBhcmFtZXRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gZm47XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fcGl2b3RYID0gMTtcbiAgICAgICAgdGhpcy5fcGl2b3RZID0gMTtcbiAgICAgICAgdGhpcy5fc3JjWCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1kgPSAwO1xuICAgICAgICB0aGlzLl9zcmNXaWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5feCArICh0aGlzLl93aWR0aCAgKiB0aGlzLl9zY2FsZVgpLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5feSArICh0aGlzLl9oZWlnaHQgKiB0aGlzLl9zY2FsZVkpLFxuICAgICAgICAgICAgbWluWDogdGhpcy5feCxcbiAgICAgICAgICAgIG1pblk6IHRoaXMuX3lcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRDb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tcG9zaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9zaXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldEhlaWdodFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRQaXZvdFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFBpdm90WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bpdm90WDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRQaXZvdFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFBpdm90WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bpdm90WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb25SYWRpYW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0V2lkdGhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3JlbmRlciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIHJlbmRlclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gY29udGV4dCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShcbiAgICAgICAgICAgIHRoaXMuX3ggKyB0aGlzLl9waXZvdFgsXG4gICAgICAgICAgICB0aGlzLl95ICsgdGhpcy5fcGl2b3RZXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRleHQuc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX3Bpdm90WCwgLXRoaXMuX3Bpdm90WSk7XG4gICAgICAgICAgICBjb250ZXh0LnJvdGF0ZSh0aGlzLl9yb3RhdGlvbik7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fcGl2b3RYLCAtdGhpcy5fcGl2b3RZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBjb21wb3NpdGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRIZWlnaHRcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGhlaWdodCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRIZWlnaHQodmFsKSB7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0UGl2b3RYXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRQaXZvdFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3Bpdm90WCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRQaXZvdFlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFBpdm90WSh2YWwpIHtcbiAgICAgICAgdGhpcy5fcGl2b3RZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbCAqIE1hdGguUEkgLyAxODA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbWVtYmVyIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdFxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0ID0gJ3NvdXJjZS1vdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3RhZ2VcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgZWxlbWVudC4gaW5jbHVkZWQgaW4gdGhlIG9wdGlvbnNcbiAqICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgZGVwZW5kZW5jeSBpbmplY3Rpb24gdXNlZCBmb3IgdGVzdGluZyBhZ2FpbnN0XG4gKiAgICAgICAgICAgICAgYSB2aXJ0dWFsIGRvbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbd2lkdGhdICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFtoZWlnaHRdICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub25lIGdpdmVuIHRoZSBib2R5IGlzIHVzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICBbb3B0cy5iZ0NvbG9yXSAgVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBbb3B0cy5maWxsXSAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuYmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTdGFnZUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVTdGFnZUVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLl9zdGFnZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRoaXMuX3RleHRmaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAvLyBUT0RPIHZlcmlmeSB2YWx1ZSAnbm9uZSdcbiAgICAgICAgdGhpcy5fdGV4dGZpZWxkLmF1dG9jYXBpdGFsaXplID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl90ZXh0ZmllbGQuaWQgPSAndGV4dGZpZWxkJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dGZpZWxkKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLmlkID0ndmlkZW8nO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX3ZpZGVvKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgX3Jlc2l6ZUVsZW1lbnQgZm9yIHN0YWdlIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19oYW5kbGVSZXNpemVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fdmlkZW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfcmVzaXplRWxlbWVudFxuICAgICAqIEBwYXJhbSAge0hUTUxFbnRpdHl9IGVsIFRoZSBlbGVtZW50IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIF9yZXNpemVFbGVtZW50KGVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gU3RhZ2UuY2VudGVyKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRDYW52YXNcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRWaWRlb1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWF4aW1pemVzIGFuIGVsZW1lbnQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0IHZpYSBDU1MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmZpbGxcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZmlsbCh3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHZpZXdwb3J0SGVpZ2h0IC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gdmlld3BvcnRXaWR0aCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtlZXBzIHN0YWdlIGVsZW1lbnQgY2VudGVyZWQgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmNlbnRlclxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIHRvcCBhbmQgbGVmdFxuICAgICAqL1xuICAgIHN0YXRpYyBjZW50ZXIod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6ICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgICAgICAgIHRvcDogKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0YXJ0XSAgICAgICAgIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0c10gICAgICAgICAgT3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy53aW5kb3ddICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy5kb2N1bWVudF0gZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQgPSB0cnVlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24ge0BsaW5rIFRpY2tlciNfZnBzfS5cbiAgICAgKiBJZiB0aGUgY29ycmVjdCBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIHRoZSB7QGxpbmsgVGlja2VyI29uVGlja30gY2FsbGJhY2sgd2lsbCBmaXJlIGFuZFxuICAgICAqIHRoZSA8Y29kZT50aWNrPC9jb2RlPiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSA8Y29kZT5kb2N1bWVudDwvY29kZT4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKG5vdyAtIHRoaXMuX3RoZW4pIC8gMTAwMDtcblxuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB0aGlzLl90aWNrcyArPSAxO1xuXG4gICAgICAgIGNvbnN0IGV2dE9iamVjdCA9IHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICB0aWNrczogdGhpcy5fdGlja3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGZpcmUgdGljayBldmVudHMgYW5kIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAgICAgIGxldCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3ByZXRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLm9uUHJlVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblRpY2soZGVsdGEsIHRoaXMuX3RpY2tzKTtcbiAgICAgICAgdGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Qb3N0VGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3R0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcHJlIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUHJlVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUHJlVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHBvc3QgdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUG9zdFRpY2tcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRlbHRhIFRoZSB0aW1lIGVsYXBzZWQgYmV0d2VlbiB0aWNrcy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGlja3MgVGhlIGFtb3VudCBvZiB0aWNrcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWRcbiAgICAgKi9cbiAgICBvblBvc3RUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBSZWN0YW5nbGVcbiAqIEBleHRlbmRzIHtAbGluayBTcHJpdGV9XG4gKiBAZGVzYyAgICBBIHNwcml0ZSB0aGF0IHJlbmRlcnMgYXMgYSByZWN0YW5nbGVcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBUZXh0SW5wdXRcbiAqIEBkZXNjICAgIFJlbmRlcnMgYW4gaHRtbCB0ZXh0ZmllbGQgZWxlbWVudFxuICogQGV4dGVuZHMgU3ByaXRlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUgPSAnJywgeCA9IDAsIHkgPSAwKSB7XG4gICAgXHRzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9zaXplID0gMTY7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSAnc2Fucy1zZXJpZic7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldEZpbGwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRleHQjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBUZXh0I3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9IHZhbDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBcdGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gYCR7dGhpcy5fc2l6ZX1weCAke3RoaXMuX2ZvbnR9YDtcblxuICAgICAgICBpZiAodGhpcy5fZmlsbCkge1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0aGlzLl92YWx1ZSwgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3Ryb2tlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fc3Ryb2tlO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VUZXh0KHRoaXMuX3ZhbHVlLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn1cbiJdfQ==
