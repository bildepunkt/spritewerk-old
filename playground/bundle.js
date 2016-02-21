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

var _Rectangle = require('./src/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

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
var ticker = new _Ticker2.default();

var groupA = new _Group2.default().setScaleX(2).setOpacity(0.4);
var rect = new _Rectangle2.default(128);
var r = 0;

groupA.addItem(rect, 'rect');

ticker.onPreTick = function () {
    r += 0.5;
    groupA.setRotation(r);
    canvas.update(groupA);
};

ticker.onTick = function (factor) {
    canvas.clear('#DDD');

    canvas.render(groupA);
};

},{"./src/Camera":2,"./src/Canvas":3,"./src/Group":5,"./src/Input":6,"./src/Rectangle":7,"./src/Stage":9,"./src/Ticker":10}],2:[function(require,module,exports){
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

var _CanvasTransform = require('./lib/CanvasTransform');

var _CanvasTransform2 = _interopRequireDefault(_CanvasTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Canvas
 * @description Handles rendering entities onto the canvas element. Merges context
 *              object with CanvasTransform instance in the constructor.
 * @author      Chris Peters
 * @requires    {@link CanvasTransform}
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
        this._xform = new _CanvasTransform2.default(this._context);
        this._imageSmoothingEnabled = true;

        this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
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
         * Returns the context xform object
         *
         * @method Canvas#getXform
         * @return {CanvasTransform} The context xform object
         */

    }, {
        key: 'getXform',
        value: function getXform() {
            return this._xform;
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
    }, {
        key: 'update',
        value: function update(entity) {
            this._xform.save();

            this._xform.translate(-this._camera.getX(), -this._camera.getY());
            entity.update(this._xform);

            this._xform.restore();
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;

},{"./lib/CanvasTransform":11}],4:[function(require,module,exports){
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
 * @param {Integer} [x] The initial x position. Default is 0.
 * @param {Integer} [y] The initial y position. Default is 0.
 */

var Group = function (_Collection) {
    _inherits(Group, _Collection);

    function Group() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Group);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this));

        _this._x = x;
        _this._y = y;
        _this._scaleX = 1;
        _this._scaleY = 1;
        _this._rotation = 0;
        _this._composite = _Sprite2.default.getCompositeDefault();
        _this._opacity = 1;
        return _this;
    }

    /**
     * @method Group#getOpacity
     * @return {Float}
     */


    _createClass(Group, [{
        key: 'getOpacity',
        value: function getOpacity() {
            return this._opacity;
        }

        /**
         * @method Group#getRotation
         * @return {Float}
         */

    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this._rotation;
        }

        /**
         * @method Group#getScaleX
         * @return {Integer}
         */

    }, {
        key: 'getScaleX',
        value: function getScaleX() {
            return this._scaleX;
        }

        /**
         * @method Group#getScaleY
         * @return {Integer}
         */

    }, {
        key: 'getScaleY',
        value: function getScaleY() {
            return this._scaleY;
        }

        /**
         * @method Group#getX
         * @return {Integer}
         */

    }, {
        key: 'getX',
        value: function getX() {
            return this._x;
        }

        /**
         * @method Group#getY
         * @return {Integer}
         */

    }, {
        key: 'getY',
        value: function getY() {
            return this._y;
        }

        /**
         * Updates all children recursively on top of own transformation stack
         *
         * @method Group#update
         * @return {CanvasTransform} xform The CanvasTransform instance
         */

    }, {
        key: 'update',
        value: function update(xform) {
            xform.save();

            xform.translate(this._x, this._y);
            xform.scale(this._scaleX, this._scaleY);

            this.each(function (item) {
                item.update(xform);
            }, this);

            xform.restore();
        }

        /**
         * Renders all children recursively on top of own transformation stack
         *
         * @method Group#render
         * @param  {Object} context The 2d context object
         */

    }, {
        key: 'render',
        value: function render(context) {
            context.save();

            context.globalAlpha *= this._opacity;
            context.globalCompositeOperation = this._composite;

            this.each(function (item) {
                item.render(context);
            }, this);

            context.restore();
        }

        /**
         *
         * @method Group#setOpacity
         * @param  {Float} val The opacity value
         * @return {Group}
         */

    }, {
        key: 'setOpacity',
        value: function setOpacity(val) {
            this._opacity = val;

            return this;
        }

        /**
         *
         * @method Group#setRotation
         * @param  {Integer} val The rotation value
         * @return {Group}
         */

    }, {
        key: 'setRotation',
        value: function setRotation(val) {
            this._rotation = val;

            return this;
        }

        /**
         *
         * @method Group#setScaleX
         * @param  {Integer} val The scaleX value
         * @return {Group}
         */

    }, {
        key: 'setScaleX',
        value: function setScaleX(val) {
            this._scaleX = val;

            return this;
        }

        /**
         * @method Group#setScaleY
         * @param  {Integer} val The scaleY value
         * @return {Group}
         */

    }, {
        key: 'setScaleY',
        value: function setScaleY(val) {
            this._scaleY = val;

            return this;
        }

        /**
         * @method Group#setComposite
         * @param  {Integer} val The x value
         * @return {Group}
         */

    }, {
        key: 'setX',
        value: function setX(val) {
            this._x = val;

            return this;
        }

        /**
         * @method Group#setY
         * @param  {Integer} val The y value
         * @return {Group}
         */

    }, {
        key: 'setY',
        value: function setY(val) {
            this._y = val;

            return this;
        }
    }]);

    return Group;
}(_Collection3.default);

exports.default = Group;

},{"./Collection":4,"./Sprite":8}],6:[function(require,module,exports){
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

},{"./lib/keycodes":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

            context.fillStyle = this._fill;
            context.fillRect(this._getActualX(), this._getActualY(), this._width * this._getActualScaleX(), this._height * this._getActualScaleY());

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(this._getActualX(), this._getActualY(), this._width * this._getActualScaleX(), this._height * this._getActualScaleY());
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
}(_Sprite3.default);

exports.default = Rectangle;

},{"./Sprite":8}],8:[function(require,module,exports){
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
        this._globalX = this._x;
        this._globalY = this._y;
        this._srcX = 0;
        this._srcY = 0;
        this._srcWidth = 32;
        this._srcHeight = 32;
        this._width = 32;
        this._height = 32;
        this._scaleX = 1;
        this._scaleY = 1;
        this._globalScaleX = this._scaleX;
        this._globalScaleY = this._scaleY;
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
        key: '_getActualScaleX',


        /**
         * Returns combined local and global scaleX
         *
         * @method Sprite#_getActualScaleX
         * @return {Integer}
         */
        value: function _getActualScaleX() {
            return this._scaleX * this._globalScaleX;
        }

        /**
         * Returns combined local and global scaleY
         *
         * @method Sprite#_getActualScaleY
         * @return {Integer}
         */

    }, {
        key: '_getActualScaleY',
        value: function _getActualScaleY() {
            return this._scaleY * this._globalScaleY;
        }

        /**
         * Returns combined local and global x
         *
         * @method Sprite#_getActualX
         * @return {Integer}
         */

    }, {
        key: '_getActualX',
        value: function _getActualX() {
            return this._x + this._globalX;
        }

        /**
         * Returns combined local and global y
         *
         * @method Sprite#_getActualY
         * @return {Integer}
         */

    }, {
        key: '_getActualY',
        value: function _getActualY() {
            return this._y + this._globalY;
        }

        /**
         * @return {Object} The bounding area
         */

    }, {
        key: 'getBoundingArea',
        value: function getBoundingArea() {
            return {
                maxX: this._getActualX() + this._width * this._getActualScaleX(),
                maxY: this._getActualY() + this._height * this._getActualScaleY(),
                minX: this._getActualX(),
                minY: this._getActualY()
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
    }, {
        key: 'update',
        value: function update(xform) {
            var matrix = xform.getMatrix();

            this._globalScaleX = matrix[0];
            this._globalScaleY = matrix[3];
            this._globalX = matrix[4];
            this._globalY = matrix[5];

            xform.restore();
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

},{}],9:[function(require,module,exports){
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
}();

exports.default = Stage;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
/*
 * Transform tracker
 *
 * @author Kevin Moot <kevin.moot@gmail.com>
 * Based on a class created by Simon Sarris - www.simonsarris.com - sarris@acm.org
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Transform;
function Transform(context) {
    this.context = context;
    this.matrix = [1, 0, 0, 1, 0, 0]; //initialize with the identity matrix
    this.stack = [];

    //==========================================
    // Constructor, getter/setter
    //==========================================

    this.setContext = function (context) {
        this.context = context;
    };

    this.getMatrix = function () {
        return this.matrix;
    };

    this.setMatrix = function (m) {
        this.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
        this.setTransform();
    };

    this.cloneMatrix = function (m) {
        return [m[0], m[1], m[2], m[3], m[4], m[5]];
    };

    //==========================================
    // Stack
    //==========================================

    this.save = function () {
        var matrix = this.cloneMatrix(this.getMatrix());
        this.stack.push(matrix);

        if (this.context) this.context.save();
    };

    this.restore = function () {
        if (this.stack.length > 0) {
            var matrix = this.stack.pop();
            this.setMatrix(matrix);
        }

        if (this.context) this.context.restore();
    };

    //==========================================
    // Matrix
    //==========================================

    this.setTransform = function () {
        if (this.context) {
            this.context.setTransform(this.matrix[0], this.matrix[1], this.matrix[2], this.matrix[3], this.matrix[4], this.matrix[5]);
        }
    };

    this.translate = function (x, y) {
        this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
        this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;

        this.setTransform();
    };

    this.rotate = function (rad) {
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
    };

    this.scale = function (sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;

        this.setTransform();
    };

    //==========================================
    // Matrix extensions
    //==========================================

    this.rotateDegrees = function (deg) {
        var rad = deg * Math.PI / 180;
        this.rotate(rad);
    };

    this.rotateAbout = function (rad, x, y) {
        this.translate(x, y);
        this.rotate(rad);
        this.translate(-x, -y);
        this.setTransform();
    };

    this.rotateDegreesAbout = function (deg, x, y) {
        this.translate(x, y);
        this.rotateDegrees(deg);
        this.translate(-x, -y);
        this.setTransform();
    };

    this.identity = function () {
        this.m = [1, 0, 0, 1, 0, 0];
        this.setTransform();
    };

    this.multiply = function (matrix) {
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
    };

    this.invert = function () {
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
    };

    //==========================================
    // Helpers
    //==========================================

    this.transformPoint = function (x, y) {
        return {
            x: x * this.matrix[0] + y * this.matrix[2] + this.matrix[4],
            y: x * this.matrix[1] + y * this.matrix[3] + this.matrix[5]
        };
    };
}

},{}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9SZWN0YW5nbGUuanMiLCJzcmMvU3ByaXRlLmpzIiwic3JjL1N0YWdlLmpzIiwic3JjL1RpY2tlci5qcyIsInNyYy9saWIvQ2FudmFzVHJhbnNmb3JtLmpzIiwic3JjL2xpYi9rZXljb2Rlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUUEsSUFBSSxTQUFTLHNCQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQzVCLGFBQVMsTUFBVDtBQUNBLFVBQU0sSUFBTjtDQUZRLENBQVI7QUFJSixJQUFJLFNBQVMscUJBQVcsTUFBTSxTQUFOLEVBQVgsRUFBOEIsTUFBOUIsQ0FBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxNQUFNLFNBQU4sRUFBVixDQUFSO0FBQ0osSUFBSSxTQUFTLHNCQUFUOztBQUVKLElBQUksU0FBUyxzQkFBWSxTQUFaLENBQXNCLENBQXRCLEVBQXlCLFVBQXpCLENBQW9DLEdBQXBDLENBQVQ7QUFDSixJQUFJLE9BQU8sd0JBQWMsR0FBZCxDQUFQO0FBQ0osSUFBSSxJQUFJLENBQUo7O0FBRUosT0FBTyxPQUFQLENBQWUsSUFBZixFQUFxQixNQUFyQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsWUFBWTtBQUMzQixTQUFLLEdBQUwsQ0FEMkI7QUFFM0IsV0FBTyxXQUFQLENBQW1CLENBQW5CLEVBRjJCO0FBRzNCLFdBQU8sTUFBUCxDQUFjLE1BQWQsRUFIMkI7Q0FBWjs7QUFNbkIsT0FBTyxNQUFQLEdBQWdCLFVBQVUsTUFBVixFQUFrQjtBQUM5QixX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UUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxpQkFBSjtBQUNBLFFBQUksa0JBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbWVyYSBmcm9tICcuL3NyYy9DYW1lcmEnO1xuaW1wb3J0IENhbnZhcyBmcm9tICcuL3NyYy9DYW52YXMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vc3JjL1JlY3RhbmdsZSc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9zcmMvR3JvdXAnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGNhbnZhcyA9IG5ldyBDYW52YXMoc3RhZ2UuZ2V0Q2FudmFzKCksIGNhbWVyYSk7XG5sZXQgaW5wdXQgPSBuZXcgSW5wdXQoc3RhZ2UuZ2V0Q2FudmFzKCkpO1xubGV0IHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcblxubGV0IGdyb3VwQSA9IG5ldyBHcm91cCgpLnNldFNjYWxlWCgyKS5zZXRPcGFjaXR5KDAuNCk7XG5sZXQgcmVjdCA9IG5ldyBSZWN0YW5nbGUoMTI4KTtcbmxldCByID0gMDtcblxuZ3JvdXBBLmFkZEl0ZW0ocmVjdCwgJ3JlY3QnKTtcblxudGlja2VyLm9uUHJlVGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByICs9IDAuNTtcbiAgICBncm91cEEuc2V0Um90YXRpb24ocik7XG4gICAgY2FudmFzLnVwZGF0ZShncm91cEEpO1xufTtcblxudGlja2VyLm9uVGljayA9IGZ1bmN0aW9uIChmYWN0b3IpIHtcbiAgICBjYW52YXMuY2xlYXIoJyNEREQnKTtcblxuICAgIGNhbnZhcy5yZW5kZXIoZ3JvdXBBKTtcbn07XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBEZWNpZGVzIHdoYXQgZ2V0cyByZW5kZXJlZFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FudmFzVHJhbnNmb3JtIGZyb20gJy4vbGliL0NhbnZhc1RyYW5zZm9ybSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LiBNZXJnZXMgY29udGV4dFxuICogICAgICAgICAgICAgIG9iamVjdCB3aXRoIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3IuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVxdWlyZXMgICAge0BsaW5rIENhbnZhc1RyYW5zZm9ybX1cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXMgVGhlIGFjdGl2ZSBjYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtDYW1lcmF9ICAgICAgY2FtZXJhIFRoZSBjYW1lcmEgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl94Zm9ybSA9IG5ldyBDYW52YXNUcmFuc2Zvcm0odGhpcy5fY29udGV4dCk7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMgYW5kIG9wdGlvbmFsbHkgZmlsbHMgd2l0aCBhIGNvbG9yXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI2dldENvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSAyRCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgeGZvcm0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNnZXRYZm9ybVxuICAgICAqIEByZXR1cm4ge0NhbnZhc1RyYW5zZm9ybX0gVGhlIGNvbnRleHQgeGZvcm0gb2JqZWN0XG4gICAgICovXG4gICAgZ2V0WGZvcm0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94Zm9ybTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPZmZzZXRzIGNhbnZhcyBiYXNlZCBvbiBjYW1lcmEgYW5kIGNhbGxzIGFuIGVudGl0eSdzIHJlbmRlciBtZXRob2QgcGFzc2luZyB0aGUgY29udGV4dC5cbiAgICAgKiBTYXZlcyBhbmQgcmVzdG9yZXMgY29udGV4dCBhbmQgYmVnaW5uaW5nIGFuZCBlbmQgb2Ygb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlbnRpdHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihlbnRpdHkpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgZW50aXR5LnJlbmRlcih0aGlzLl9jb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbnRleHQgaW1hZ2Ugc21vb3RoaW5nXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGUoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX3hmb3JtLnNhdmUoKTtcblxuICAgICAgICB0aGlzLl94Zm9ybS50cmFuc2xhdGUoLXRoaXMuX2NhbWVyYS5nZXRYKCksIC10aGlzLl9jYW1lcmEuZ2V0WSgpKTtcbiAgICAgICAgZW50aXR5LnVwZGF0ZSh0aGlzLl94Zm9ybSk7XG5cbiAgICAgICAgdGhpcy5feGZvcm0ucmVzdG9yZSgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxlY3Rpb25cbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyB0aGUgc29ydGFibGUsIGl0ZXJhYmxlIHN0b3JhZ2Ugb2YgZW50aXRpZXMgdGhhdCBhcmVcbiAqICAgICAgICAgICAgICBnZXR0YWJsZSwgc2V0dGFibGUsIHNvcnRhYmxlLCByZW1vdmFibGUsIGV0Y2VyYShibGUpIGJ5IG5hbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gVGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGl0ZW0geyBuYW1lLCBpdGVtIH0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0UmF3SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goZnVuY3Rpb24oaXRlckl0ZW0sIGksIGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgcmF3IGl0ZW0sIGluZGV4LCBuYW1lLCBhbmQgdGhlXG4gICAgICogbGlzdCBiZWluZyBpdGVyYXRlZCBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jhd0VhY2goZm4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChmbih0aGlzLl9pdGVtc1tpXSwgaSwgdGhpcy5faXRlbXNbaV0ubmFtZSwgdGhpcy5faXRlbXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gd2l0aCBvcHRpb25hbCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtBbnl9ICAgICAgICBpdGVtICAgVGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG5cbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtLCBuYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBtdWx0aXBsZSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5PYmplY3R9IGl0ZW1zIENhbiBiZSB0aGUgb2JqZWN0IGl0c2VsZiBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGFuZCBpdCdzIG5hbWVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZWc6IDxjb2RlPnsgaXRlbTogRW50aXR5LCBuYW1lOiAnZW50aXR5TmFtZScgfTwvY29kZT5cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSBpdGVtLCBpbmRleCwgYW5kIG5hbWUgYXJlIHN1cHBsaWVkXG4gICAgICogdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHRoZSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyBpdGVtcyBhbmQgcmV0dXJuIHRoZSBvbmVzIHRoYXQgbWVldCBjcml0ZXJpYVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVHJ1dGggcHJlZGljYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtLCBpLCBuYW1lKT0+IHtcbiAgICAgICAgICAgIGxldCBwcmVkaWNhdGUgPSBmbihpdGVtLCBpLCBuYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2NvcGUpO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGp1c3QgdGhlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW1BdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbaW5kZXhdLml0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY291bnQgb2YgaXRlbXMgaW4gY29sbGVjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVtJ3MgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtSW5kZXgobmFtZSkge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSBjb2xsZWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBvYmplY3QgYnkgbmFtZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTVy5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBpdGVtIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0obmFtZSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSwgaXRlbXMpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgbmV3IHZhbHVlIHRvIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIG1vZGlmeVxuICAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZSBUaGUgbmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0uaXRlbSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGl0ZW0gdG8gbmV3IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgYmVpbmcgbW92ZWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IFRoZSBpdGVtJ3MgbmV3IGluZGV4XG4gICAgICovXG4gICAgc2V0SXRlbUluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgobmFtZSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLl9nZXRSYXdJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBHcm91cFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gaGllcmFyY2h5IGZvciB7QGxpbmsgQ29sbGVjdGlvbn1zXG4gKiBAZXh0ZW5kcyAgICAgQ29sbGVjdGlvblxuICogQHJlcXVpcmVzICAgIFNwcml0ZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMC5cbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3ldIFRoZSBpbml0aWFsIHkgcG9zaXRpb24uIERlZmF1bHQgaXMgMC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGFsbCBjaGlsZHJlbiByZWN1cnNpdmVseSBvbiB0b3Agb2Ygb3duIHRyYW5zZm9ybWF0aW9uIHN0YWNrXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3VwZGF0ZVxuICAgICAqIEByZXR1cm4ge0NhbnZhc1RyYW5zZm9ybX0geGZvcm0gVGhlIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZSh4Zm9ybSkge1xuICAgICAgICB4Zm9ybS5zYXZlKCk7XG5cbiAgICAgICAgeGZvcm0udHJhbnNsYXRlKHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgICAgICB4Zm9ybS5zY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIGl0ZW0udXBkYXRlKHhmb3JtKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgeGZvcm0ucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IG9uIHRvcCBvZiBvd24gdHJhbnNmb3JtYXRpb24gc3RhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSAyZCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgKj0gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSB0aGlzLl9jb21wb3NpdGU7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVuZGVyKGNvbnRleHQpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgcm90YXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgICBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0cyA9IHt9KSB7XG4gICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW52YXNGaXQgPSBvcHRzLmNhbnZhc0ZpdCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JNb3VzZSA9IG9wdHMubGlzdGVuRm9yTW91c2UgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yVG91Y2ggPSBvcHRzLmxpc3RlbkZvclRvdWNoIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCA9IG9wdHMubGlzdGVuRm9yS2V5Ym9hcmQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvcktleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvck1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvclRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25UaWNrID0gdGhpcy5fb25UaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aGlzLl9vblRpY2ssIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkS2V5Ym9hcmRMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsna2V5dXAnLCAna2V5ZG93biddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbW91c2UgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRNb3VzZUxpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG91Y2ggbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRUb3VjaExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHNjYWxlIHJhdGlvIG9mIHRoZSBjYW52YXMgYmFzZWQgb24gd2l0aC9oZWdodCBhdHRycyBhbmQgY3NzIHdpZHRoL2hlaWdodFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfZ2V0U2NhbGVGYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBfZ2V0U2NhbGVGYWN0b3IoKSB7XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgY2FudmFzV2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCkge1xuICAgICAgICAgICAgY2FudmFzV2lkdGggPSBwYXJzZUludCh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgICAgIGZhY3RvciA9IGNhbnZhc1dpZHRoIC8gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDEwMCAvIGZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcG9pbnQgaXMgaW5zaWRlIHJlY3RhbmdsZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGl0VGVzdFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm91bmRpbmdCb3ggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiA8Y29kZT57IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfTwvY29kZT5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjZ2V0S2V5c0Rvd25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0S2V5c0Rvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzRG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdXNlciB0byBzZXQgYSBjdXN0b20gaGl0IHRlc3QgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEhpdFRlc3RNZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgdXNlcidzIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqL1xuICAgIHNldEhpdFRlc3RNZXRob2QoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQjc2V0SGl0VGVzdE1ldGhvZCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IGZuO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFJlY3RhbmdsZVxuICogQGV4dGVuZHMge0BsaW5rIFNwcml0ZX1cbiAqIEBkZXNjICAgIEEgc3ByaXRlIHRoYXQgcmVuZGVycyBhcyBhIHJlY3RhbmdsZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgIHRoaXMuX2dldEFjdHVhbFgoKSwgdGhpcy5fZ2V0QWN0dWFsWSgpLFxuICAgICAgICAgICAgdGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCksXG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0QWN0dWFsWCgpLCB0aGlzLl9nZXRBY3R1YWxZKCksXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCksXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVZKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IHRoaXMuX3g7XG4gICAgICAgIHRoaXMuX2dsb2JhbFkgPSB0aGlzLl95O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX3NyY0hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU2NhbGVYID0gdGhpcy5fc2NhbGVYO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVkgPSB0aGlzLl9zY2FsZVk7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvbWJpbmVkIGxvY2FsIGFuZCBnbG9iYWwgc2NhbGVYXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNfZ2V0QWN0dWFsU2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsU2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYICogdGhpcy5fZ2xvYmFsU2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCBzY2FsZVlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVkgKiB0aGlzLl9nbG9iYWxTY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHhcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKyB0aGlzLl9nbG9iYWxYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCB5XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNfZ2V0QWN0dWFsWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgX2dldEFjdHVhbFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95ICsgdGhpcy5fZ2xvYmFsWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5fZ2V0QWN0dWFsWCgpICsgKHRoaXMuX3dpZHRoICAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWCgpKSxcbiAgICAgICAgICAgIG1heFk6IHRoaXMuX2dldEFjdHVhbFkoKSArICh0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKSksXG4gICAgICAgICAgICBtaW5YOiB0aGlzLl9nZXRBY3R1YWxYKCksXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl9nZXRBY3R1YWxZKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRDb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tcG9zaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9zaXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldEhlaWdodFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0V2lkdGhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGNvbXBvc2l0ZSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldEhlaWdodFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgaGVpZ2h0IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldEhlaWdodCh2YWwpIHtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4Zm9ybSkge1xuICAgICAgICBjb25zdCBtYXRyaXggPSB4Zm9ybS5nZXRNYXRyaXgoKTtcblxuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVggPSBtYXRyaXhbMF07XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWSA9IG1hdHJpeFszXTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IG1hdHJpeFs0XTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWSA9IG1hdHJpeFs1XTtcblxuICAgICAgICB4Zm9ybS5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBtZW1iZXIgU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTdGFnZVxuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBlbGVtZW50LiBpbmNsdWRlZCBpbiB0aGUgb3B0aW9uc1xuICogICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBvcHRpb25hbCBkZXBlbmRlbmN5IGluamVjdGlvbiB1c2VkIGZvciB0ZXN0aW5nIGFnYWluc3RcbiAqICAgICAgICAgICAgICBhIHZpcnR1YWwgZG9tLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFt3aWR0aF0gICAgICAgICBUaGUgd2lkdGggb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW2hlaWdodF0gICAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHNdICAgICAgICAgIFN0YWdlIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRzLnBhcmVudEVsXSBUaGUgZWxlbWVudCB3aXRoIHdoaWNoIHRvIGF0dGFjaCB0aGUgY2FudmFzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vbmUgZ2l2ZW4gdGhlIGJvZHkgaXMgdXNlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLmJnQ29sb3JdICBUaGUgcGFyZW50IGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMuZG9jdW1lbnRdIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy53aW5kb3ddICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIFtvcHRzLmZpbGxdICAgICBTZXQgdG8gZmFsc2UgdG8gbm90IG1heGltYWxseSBmaWxsIHZpZXdwb3J0LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl9maWxsID0gb3B0cy5maWxsID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5maWxsO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IG9wdHMucGFyZW50RWwgfHwgdGhpcy5fZG9jdW1lbnQuYm9keTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0cy5iZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVN0YWdlRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVN0YWdlRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuX3N0YWdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX3N0YWdlKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdmlkZW8pO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBfcmVzaXplRWxlbWVudCBmb3Igc3RhZ2UgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX2hhbmRsZVJlc2l6ZVxuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl92aWRlbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgdG8gaGFuZGxlIHJlc2l6ZSBiYXNlZCBvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19yZXNpemVFbGVtZW50XG4gICAgICogQHBhcmFtICB7SFRNTEVudGl0eX0gZWwgVGhlIGVsZW1lbnQgdG8gcmVzaXplXG4gICAgICovXG4gICAgX3Jlc2l6ZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gU3RhZ2UuZmlsbChcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBTdGFnZS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldENhbnZhc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldFZpZGVvXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbWl6ZXMgYW4gZWxlbWVudCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnQgdmlhIENTUy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuZmlsbFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWxsKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gdmlld3BvcnRIZWlnaHQgLyB2aWV3cG9ydFdpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB2aWV3cG9ydFdpZHRoIC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2VlcHMgc3RhZ2UgZWxlbWVudCBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuY2VudGVyXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgdG9wIGFuZCBsZWZ0XG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogKHZpZXdwb3J0V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgdG9wOiAodmlld3BvcnRIZWlnaHQgLSBoZWlnaHQpIC8gMlxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGJhc2VkIG9uIGdpdmVuIGZwcyBhbmQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdICAgICAgICAgV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzXSAgICAgICAgICBPcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLndpbmRvd10gICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLmRvY3VtZW50XSBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydCA9IHRydWUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAobm93IC0gdGhpcy5fdGhlbikgLyAxMDAwO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgY29uc3QgZXZ0T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB0aGlzLl90aWNrc1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50cyBhbmQgZXhlY3V0ZSBjYWxsYmFja3NcbiAgICAgICAgbGV0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncHJldGljaycsIGV2dE9iamVjdCk7XG4gICAgICAgIHRoaXMub25QcmVUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblBvc3RUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBwcmUgZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25QcmVUaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25QcmVUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcG9zdCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25Qb3N0VGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUG9zdFRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKlxuICogVHJhbnNmb3JtIHRyYWNrZXJcbiAqXG4gKiBAYXV0aG9yIEtldmluIE1vb3QgPGtldmluLm1vb3RAZ21haWwuY29tPlxuICogQmFzZWQgb24gYSBjbGFzcyBjcmVhdGVkIGJ5IFNpbW9uIFNhcnJpcyAtIHd3dy5zaW1vbnNhcnJpcy5jb20gLSBzYXJyaXNAYWNtLm9yZ1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUcmFuc2Zvcm0oY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5tYXRyaXggPSBbMSwwLDAsMSwwLDBdOyAvL2luaXRpYWxpemUgd2l0aCB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBDb25zdHJ1Y3RvciwgZ2V0dGVyL3NldHRlclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICB0aGlzLnNldENvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TWF0cml4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdHJpeDtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRNYXRyaXggPSBmdW5jdGlvbihtKSB7XG4gICAgICAgIHRoaXMubWF0cml4ID0gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jbG9uZU1hdHJpeCA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgcmV0dXJuIFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgfTtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhY2tcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdGhpcy5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYXRyaXggPSB0aGlzLmNsb25lTWF0cml4KHRoaXMuZ2V0TWF0cml4KCkpO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobWF0cml4KTtcblxuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1hdHJpeCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hdHJpeChtYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXhcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdGhpcy5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFswXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsxXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsyXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFszXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs1XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gKz0gdGhpcy5tYXRyaXhbMF0gKiB4ICsgdGhpcy5tYXRyaXhbMl0gKiB5O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSArPSB0aGlzLm1hdHJpeFsxXSAqIHggKyB0aGlzLm1hdHJpeFszXSAqIHk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGUgPSBmdW5jdGlvbihyYWQpIHtcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIGMgKyB0aGlzLm1hdHJpeFsyXSAqIHM7XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIGMgKyB0aGlzLm1hdHJpeFszXSAqIHM7XG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIC1zICsgdGhpcy5tYXRyaXhbMl0gKiBjO1xuICAgICAgICB2YXIgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiAtcyArIHRoaXMubWF0cml4WzNdICogYztcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zY2FsZSA9IGZ1bmN0aW9uKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1hdHJpeFszXSAqPSBzeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH07XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeCBleHRlbnNpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHRoaXMucm90YXRlRGVncmVlcyA9IGZ1bmN0aW9uKGRlZykge1xuICAgICAgICB2YXIgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGVBYm91dCA9IGZ1bmN0aW9uKHJhZCwgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvdGF0ZURlZ3JlZXNBYm91dCA9IGZ1bmN0aW9uKGRlZywgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGVEZWdyZWVzKGRlZyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pZGVudGl0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm0gPSBbMSwwLDAsMSwwLDBdO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH07XG5cbiAgICB0aGlzLm11bHRpcGx5ID0gZnVuY3Rpb24obWF0cml4KSB7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzFdO1xuXG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzNdO1xuXG4gICAgICAgIHZhciBkeCA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNF07XG4gICAgICAgIHZhciBkeSA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNV07XG5cbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gZHg7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gZHk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfTtcblxuICAgIHRoaXMuaW52ZXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkID0gMSAvICh0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzNdIC0gdGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFsyXSk7XG4gICAgICAgIHZhciBtMCA9IHRoaXMubWF0cml4WzNdICogZDtcbiAgICAgICAgdmFyIG0xID0gLXRoaXMubWF0cml4WzFdICogZDtcbiAgICAgICAgdmFyIG0yID0gLXRoaXMubWF0cml4WzJdICogZDtcbiAgICAgICAgdmFyIG0zID0gdGhpcy5tYXRyaXhbMF0gKiBkO1xuICAgICAgICB2YXIgbTQgPSBkICogKHRoaXMubWF0cml4WzJdICogdGhpcy5tYXRyaXhbNV0gLSB0aGlzLm1hdHJpeFszXSAqIHRoaXMubWF0cml4WzRdKTtcbiAgICAgICAgdmFyIG01ID0gZCAqICh0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzRdIC0gdGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFs1XSk7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTA7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTE7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTI7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTM7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gbTQ7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gbTU7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfTtcblxuICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEhlbHBlcnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdGhpcy50cmFuc2Zvcm1Qb2ludCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHggKiB0aGlzLm1hdHJpeFswXSArIHkgKiB0aGlzLm1hdHJpeFsyXSArIHRoaXMubWF0cml4WzRdLFxuICAgICAgICAgICAgeTogeCAqIHRoaXMubWF0cml4WzFdICsgeSAqIHRoaXMubWF0cml4WzNdICsgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgfTtcbiAgICB9O1xufSIsIi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIDg6ICdCQUNLU1BBQ0UnLFxuICAgIDk6ICdUQUInLFxuICAgIDEzOiAnRU5URVInLFxuICAgIDE2OiAnU0hJRlQnLFxuICAgIDE3OiAnQ1RSTCcsXG4gICAgMTg6ICdBTFQnLFxuICAgIDE5OiAnUEFVU0VfQlJFQUsnLFxuICAgIDIwOiAnQ0FQU19MT0NLJyxcbiAgICAyNzogJ0VTQ0FQRScsXG4gICAgMzM6ICdQQUdFX1VQJyxcbiAgICAzNDogJ1BBR0VfRE9XTicsXG4gICAgMzU6ICdFTkQnLFxuICAgIDM2OiAnSE9NRScsXG4gICAgMzc6ICdMRUZUX0FSUk9XJyxcbiAgICAzODogJ1VQX0FSUk9XJyxcbiAgICAzOTogJ1JJR0hUX0FSUk9XJyxcbiAgICA0MDogJ0RPV05fQVJST1cnLFxuICAgIDQ1OiAnSU5TRVJUJyxcbiAgICA0NjogJ0RFTEVURScsXG4gICAgNDg6IFswLCcpJ10sXG4gICAgNDk6IFsxLCchJ10sXG4gICAgNTA6IFsyLCdAJ10sXG4gICAgNTE6IFszLCcjJ10sXG4gICAgNTI6IFs0LCckJ10sXG4gICAgNTM6IFs1LCclJ10sXG4gICAgNTQ6IFs2LCdeJ10sXG4gICAgNTU6IFs3LCcmJ10sXG4gICAgNTY6IFs4LCcqJ10sXG4gICAgNTc6IFs5LCcoJ10sXG4gICAgNjU6ICdBJyxcbiAgICA2NjogJ0InLFxuICAgIDY3OiAnQycsXG4gICAgNjg6ICdEJyxcbiAgICA2OTogJ0UnLFxuICAgIDcwOiAnRicsXG4gICAgNzE6ICdHJyxcbiAgICA3MjogJ0gnLFxuICAgIDczOiAnSScsXG4gICAgNzQ6ICdKJyxcbiAgICA3NTogJ0snLFxuICAgIDc2OiAnTCcsXG4gICAgNzc6ICdNJyxcbiAgICA3ODogJ04nLFxuICAgIDc5OiAnTycsXG4gICAgODA6ICdQJyxcbiAgICA4MTogJ1EnLFxuICAgIDgyOiAnUicsXG4gICAgODM6ICdTJyxcbiAgICA4NDogJ1QnLFxuICAgIDg1OiAnVScsXG4gICAgODY6ICdWJyxcbiAgICA4NzogJ1cnLFxuICAgIDg4OiAnWCcsXG4gICAgODk6ICdZJyxcbiAgICA5MDogJ1onLFxuICAgIDkxOiAnTEVGVF9XSU5ET1dfS0VZJyxcbiAgICA5MjogJ1JJR0hUX1dJTkRPV19LRVknLFxuICAgIDkzOiAnU0VMRUNUX0tFWScsXG4gICAgOTY6ICdOVU1fUEFEXzAnLFxuICAgIDk3OiAnTlVNX1BBRF8xJyxcbiAgICA5ODogJ05VTV9QQURfMicsXG4gICAgOTk6ICdOVU1fUEFEXzMnLFxuICAgIDEwMDogJ05VTV9QQURfNCcsXG4gICAgMTAxOiAnTlVNX1BBRF81JyxcbiAgICAxMDI6ICdOVU1fUEFEXzYnLFxuICAgIDEwMzogJ05VTV9QQURfNycsXG4gICAgMTA0OiAnTlVNX1BBRF84JyxcbiAgICAxMDU6ICdOVU1fUEFEXzknLFxuICAgIDEwNjogJ05VTV9QQURfQVNURVJJU0snLFxuICAgIDEwNzogJ05VTV9QQURfUExVUycsXG4gICAgMTA5OiAnTlVNX1BBRF9NSU5VUycsXG4gICAgMTExOiAnTlVNX1BBRF9GT1dBUkRfU0xBU0gnLFxuICAgIDExMjogJ0YxJyxcbiAgICAxMTM6ICdGMicsXG4gICAgMTE0OiAnRjMnLFxuICAgIDExNTogJ0Y0JyxcbiAgICAxMTY6ICdGNScsXG4gICAgMTE3OiAnRjYnLFxuICAgIDExODogJ0Y3JyxcbiAgICAxMTk6ICdGOCcsXG4gICAgMTIwOiAnRjknLFxuICAgIDEyMTogJ0YxMCcsXG4gICAgMTIyOiAnRjExJyxcbiAgICAxMjM6ICdGMTInLFxuICAgIDE0NDogJ05VTV9MT0NLJyxcbiAgICAxNDU6ICdTQ1JPTExfTE9DSycsXG4gICAgMTg2OiBbJzsnLCc6J10sXG4gICAgMTg3OiBbJz0nLCcrJ10sXG4gICAgMTg4OiBbJywnLCc8J10sXG4gICAgMTg5OiBbJy0nLCdfJ10sXG4gICAgMTkwOiBbJy4nLCc+J10sXG4gICAgMTkxOiBbJy8nLCc/J10sXG4gICAgMTkyOiBbJ2AnLCd+J10sXG4gICAgMjE5OiBbJ1snLCd7J10sXG4gICAgMjIwOiBbJ1xcXFwnLCd8J10sXG4gICAgMjIxOiBbJ10nLCd9J10sXG4gICAgMjIyOiBbJ1xcJycsJ1wiJ11cbn07XG4iXX0=
