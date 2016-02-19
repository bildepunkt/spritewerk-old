(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Camera = require('./src/Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Draw = require('./src/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

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
var draw = new _Draw2.default(stage.getCanvas(), camera);
var input = new _Input2.default(stage.getCanvas());
var ticker = new _Ticker2.default();

var groupA = new _Group2.default(32).setScaleX(2).setOpacity(0.5);
var groupB = new _Group2.default(0, 32);
var rect = new _Rectangle2.default();

groupB.addItem(rect, 'rect');
groupA.addItem(groupB, 'grp');

ticker.onPreTick = function () {
    draw.update(groupA);
};

ticker.onTick = function (factor) {
    draw.clear('#DDD');

    draw.render(groupA);
};

},{"./src/Camera":2,"./src/Draw":4,"./src/Group":5,"./src/Input":6,"./src/Rectangle":7,"./src/Stage":9,"./src/Ticker":10}],2:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
 * @class       Draw
 * @description Handles rendering entities onto the canvas element. Merges context
 *              object with CanvasTransform instance in the constructor.
 * @author      Chris Peters
 * @requires    {@link CanvasTransform}
 *
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera instance
 */

var Draw = function () {
    function Draw(canvas, camera) {
        _classCallCheck(this, Draw);

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
         * Returns the context xform object
         *
         * @method Draw#getXform
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
         * @method Draw#render
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
    }, {
        key: 'update',
        value: function update(entity) {
            this._xform.save();

            this._xform.translate(-this._camera.getX(), -this._camera.getY());
            entity.update(this._xform);

            this._xform.restore();
        }
    }]);

    return Draw;
}();

exports.default = Draw;

},{"./lib/CanvasTransform":11}],5:[function(require,module,exports){
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

},{"./Collection":3,"./Sprite":8}],6:[function(require,module,exports){
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
        _classCallCheck(this, Rectangle);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this));

        _this._fill = '#000';
        _this._stroke = '';
        return _this;
    }

    _createClass(Rectangle, [{
        key: 'update',
        value: function update(xform) {
            var matrix = xform.getMatrix();

            this._globalX = matrix[4];
            this._globalY = matrix[5];
            this._globalScaleX = matrix[0];
            this._globalScaleY = matrix[3];
        }
    }, {
        key: 'render',
        value: function render(context) {
            context.save();

            context.fillStyle = this._fill;
            context.fillRect(this._globalX, this._globalY, this._width * this._globalScaleX, this._height * this._globalScaleY);

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(this._globalX, this._globalY, this._width * this._globalScaleX, this._height * this._globalScaleY);
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
    key: 'getBoundingArea',


    /**
     * @return {Object} The bounding area
     */
    value: function getBoundingArea() {
      return {
        maxX: this._globalScaleX * (this._globalX + this._width),
        maxY: this._globalScaleY * (this._globalY + this._height),
        minX: this._globalScaleX * this._globalX,
        minY: this._globalScaleY * this._globalY
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       CanvasTransform
 * @description Retains canvas transformation stack.
 *              Basically es2015 fork from {@link http://www.simonsarris.com|Simon Sarris} - sarris@acm.org
 * @author      Chris Peters
 */

var CanvasTransform = function () {
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
}();

exports.default = CanvasTransform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9Db2xsZWN0aW9uLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvR3JvdXAuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvUmVjdGFuZ2xlLmpzIiwic3JjL1Nwcml0ZS5qcyIsInNyYy9TdGFnZS5qcyIsInNyYy9UaWNrZXIuanMiLCJzcmMvbGliL0NhbnZhc1RyYW5zZm9ybS5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBLElBQUksU0FBUyxzQkFBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUM1QixhQUFTLE1BQVQ7QUFDQSxVQUFNLElBQU47Q0FGUSxDQUFSO0FBSUosSUFBSSxPQUFPLG1CQUFTLE1BQU0sU0FBTixFQUFULEVBQTRCLE1BQTVCLENBQVA7QUFDSixJQUFJLFFBQVEsb0JBQVUsTUFBTSxTQUFOLEVBQVYsQ0FBUjtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixJQUFJLFNBQVMsb0JBQVUsRUFBVixFQUFjLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsQ0FBc0MsR0FBdEMsQ0FBVDtBQUNKLElBQUksU0FBUyxvQkFBVSxDQUFWLEVBQWEsRUFBYixDQUFUO0FBQ0osSUFBSSxPQUFPLHlCQUFQOztBQUVKLE9BQU8sT0FBUCxDQUFlLElBQWYsRUFBcUIsTUFBckI7QUFDQSxPQUFPLE9BQVAsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCOztBQUVBLE9BQU8sU0FBUCxHQUFtQixZQUFZO0FBQzNCLFNBQUssTUFBTCxDQUFZLE1BQVosRUFEMkI7Q0FBWjs7QUFJbkIsT0FBTyxNQUFQLEdBQWdCLFVBQVUsTUFBVixFQUFrQjtBQUM5QixT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QUNBLFFBQUksT0FBSjtBQUNBLFFBQUksT0FBSjtBQUNBLFFBQUksTUFBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksYUFBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksU0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksTUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksVUFBSjtBQUNBLFFBQUksYUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxpQkFBSjtBQUNBLFFBQUksa0JBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbWVyYSBmcm9tICcuL3NyYy9DYW1lcmEnO1xuaW1wb3J0IERyYXcgZnJvbSAnLi9zcmMvRHJhdyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9zcmMvSW5wdXQnO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3JjL1N0YWdlJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9zcmMvUmVjdGFuZ2xlJztcbmltcG9ydCBHcm91cCBmcm9tICcuL3NyYy9Hcm91cCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbmxldCBjYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5sZXQgc3RhZ2UgPSBuZXcgU3RhZ2UoODAwLCA2MDAsIHtcbiAgICBiZ0NvbG9yOiAnIzIyMicsXG4gICAgZmlsbDogdHJ1ZVxufSk7XG5sZXQgZHJhdyA9IG5ldyBEcmF3KHN0YWdlLmdldENhbnZhcygpLCBjYW1lcmEpO1xubGV0IGlucHV0ID0gbmV3IElucHV0KHN0YWdlLmdldENhbnZhcygpKTtcbmxldCB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG5cbmxldCBncm91cEEgPSBuZXcgR3JvdXAoMzIpLnNldFNjYWxlWCgyKS5zZXRPcGFjaXR5KDAuNSk7XG5sZXQgZ3JvdXBCID0gbmV3IEdyb3VwKDAsIDMyKTtcbmxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSgpO1xuXG5ncm91cEIuYWRkSXRlbShyZWN0LCAncmVjdCcpO1xuZ3JvdXBBLmFkZEl0ZW0oZ3JvdXBCLCAnZ3JwJyk7XG5cbnRpY2tlci5vblByZVRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgZHJhdy51cGRhdGUoZ3JvdXBBKTtcbn07XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yKSB7XG4gICAgZHJhdy5jbGVhcignI0RERCcpO1xuXG4gICAgZHJhdy5yZW5kZXIoZ3JvdXBBKTtcbn07XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBEZWNpZGVzIHdoYXQgZ2V0cyByZW5kZXJlZFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb2xsZWN0aW9uXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgdGhlIHNvcnRhYmxlLCBpdGVyYWJsZSBzdG9yYWdlIG9mIGVudGl0aWVzIHRoYXQgYXJlXG4gKiAgICAgICAgICAgICAgZ2V0dGFibGUsIHNldHRhYmxlLCBzb3J0YWJsZSwgcmVtb3ZhYmxlLCBldGNlcmEoYmxlKSBieSBuYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IFRoZSBzb3J0ZWQgbGlzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtIHsgbmFtZSwgaXRlbSB9IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFJhd0l0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKGZ1bmN0aW9uKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIHJhdyBpdGVtLCBpbmRleCwgbmFtZSwgYW5kIHRoZVxuICAgICAqIGxpc3QgYmVpbmcgaXRlcmF0ZWQgYXJlIHN1cHBsaWVkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yYXdFYWNoKGZuKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZm4odGhpcy5faXRlbXNbaV0sIGksIHRoaXMuX2l0ZW1zW2ldLm5hbWUsIHRoaXMuX2l0ZW1zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBpdGVtIHdpdGggb3B0aW9uYWwgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7QW55fSAgICAgICAgaXRlbSAgIFRoZSBpdGVtIHRvIGFkZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFtuYW1lXSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbShpdGVtLCBuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgaXRlbSwgbmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbXVsdGlwbGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBpdGVtcyBDYW4gYmUgdGhlIG9iamVjdCBpdHNlbGYgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBhbmQgaXQncyBuYW1lXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGVnOiA8Y29kZT57IGl0ZW06IEVudGl0eSwgbmFtZTogJ2VudGl0eU5hbWUnIH08L2NvZGU+XG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtcyguLi5pdGVtcykge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uaXRlbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdGVtIGhhcyBpdGVtL25hbWUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0uaXRlbSwgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGNvbnZlbmllbmNlIGFsbG93IHVzZXIgdG8gYWRkIGp1c3QgaXRlbVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgaXRlbSwgaW5kZXgsIGFuZCBuYW1lIGFyZSBzdXBwbGllZFxuICAgICAqIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gICAgICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB0aGUgaXRlcmFibGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZWFjaChmbiwgc2NvcGUpIHtcbiAgICAgICAgZm4gPSBzY29wZSA/IGZuLmJpbmQoc2NvcGUpIDogZm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBpZiAoZm4oaXRlbS5pdGVtLCBpLCBpdGVtLm5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZXMgaXRlbXMgYW5kIHJldHVybiB0aGUgb25lcyB0aGF0IG1lZXQgY3JpdGVyaWFcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRydXRoIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZmlsdGVyKGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSwgaSwgbmFtZSk9PiB7XG4gICAgICAgICAgICBsZXQgcHJlZGljYXRlID0gZm4oaXRlbSwgaSwgbmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNjb3BlKTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBqdXN0IHRoZSBpdGVtc1xuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SXRlbUFycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubWFwKChpdGVtKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLml0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBuYW1lLCBvciB1bmRlZmluZWQgaWYgdGhlIG5hbWUgaXMgbm90IGZvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBpbmRleFxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2luZGV4XS5pdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvdW50IG9mIGl0ZW1zIGluIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlbSdzIGN1cnJlbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUluZGV4KG5hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gY29sbGVjdGlvblxuICAgICAqL1xuICAgIHJlbW92ZUFsbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gb2JqZWN0IGJ5IG5hbWVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU1cuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgaXRlbSByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKG5hbWUpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUsIGl0ZW1zKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIG5ldyB2YWx1ZSB0byBhbiBleGlzdGluZyBpdGVtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBtb2RpZnlcbiAgICAgKiBAcGFyYW0ge0FueX0gICAgdmFsdWUgVGhlIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEl0ZW0obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtLml0ZW0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBpdGVtIHRvIG5ldyBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IGJlaW5nIG1vdmVkXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBUaGUgaXRlbSdzIG5ldyBpbmRleFxuICAgICAqL1xuICAgIHNldEl0ZW1JbmRleChuYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG5hbWUpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtID0gdGhpcy5fZ2V0UmF3SXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYW52YXNUcmFuc2Zvcm0gZnJvbSAnLi9saWIvQ2FudmFzVHJhbnNmb3JtJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgRHJhd1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LiBNZXJnZXMgY29udGV4dFxuICogICAgICAgICAgICAgIG9iamVjdCB3aXRoIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3IuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVxdWlyZXMgICAge0BsaW5rIENhbnZhc1RyYW5zZm9ybX1cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXMgVGhlIGFjdGl2ZSBjYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtDYW1lcmF9ICAgICAgY2FtZXJhIFRoZSBjYW1lcmEgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5feGZvcm0gPSBuZXcgQ2FudmFzVHJhbnNmb3JtKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBlbnRpcmUgY2FudmFzIGFuZCBvcHRpb25hbGx5IGZpbGxzIHdpdGggYSBjb2xvclxuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I2NsZWFyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY29sb3JdIElmIHBhc3NlZCwgd2lsbCBmaWxsIHRoZSBjYW52YXMgd2l0aCB0aGUgY29sb3IgdmFsdWVcbiAgICAgKi9cbiAgICBjbGVhcihjb2xvcikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I2dldENvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSAyRCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgeGZvcm0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjZ2V0WGZvcm1cbiAgICAgKiBAcmV0dXJuIHtDYW52YXNUcmFuc2Zvcm19IFRoZSBjb250ZXh0IHhmb3JtIG9iamVjdFxuICAgICAqL1xuICAgIGdldFhmb3JtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feGZvcm07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2Zmc2V0cyBjYW52YXMgYmFzZWQgb24gY2FtZXJhIGFuZCBjYWxscyBhbiBlbnRpdHkncyByZW5kZXIgbWV0aG9kIHBhc3NpbmcgdGhlIGNvbnRleHQuXG4gICAgICogU2F2ZXMgYW5kIHJlc3RvcmVzIGNvbnRleHQgYW5kIGJlZ2lubmluZyBhbmQgZW5kIG9mIG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGVudGl0eSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGVudGl0eSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBlbnRpdHkucmVuZGVyKHRoaXMuX2NvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGUoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX3hmb3JtLnNhdmUoKTtcblxuICAgICAgICB0aGlzLl94Zm9ybS50cmFuc2xhdGUoLXRoaXMuX2NhbWVyYS5nZXRYKCksIC10aGlzLl9jYW1lcmEuZ2V0WSgpKTtcbiAgICAgICAgZW50aXR5LnVwZGF0ZSh0aGlzLl94Zm9ybSk7XG5cbiAgICAgICAgdGhpcy5feGZvcm0ucmVzdG9yZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbic7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgR3JvdXBcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBhIHRyYW5zZm9ybWF0aW9uIGhpZXJhcmNoeSBmb3Ige0BsaW5rIENvbGxlY3Rpb259c1xuICogQGV4dGVuZHMgICAgIENvbGxlY3Rpb25cbiAqIEByZXF1aXJlcyAgICBTcHJpdGVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSBUaGUgaW5pdGlhbCB4IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCN1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtDYW52YXNUcmFuc2Zvcm19IHhmb3JtIFRoZSBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGUoeGZvcm0pIHtcbiAgICAgICAgeGZvcm0uc2F2ZSgpO1xuXG4gICAgICAgIHhmb3JtLnRyYW5zbGF0ZSh0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgeGZvcm0uc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSk9PiB7XG4gICAgICAgICAgICBpdGVtLnVwZGF0ZSh4Zm9ybSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHhmb3JtLnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFsbCBjaGlsZHJlbiByZWN1cnNpdmVseSBvbiB0b3Agb2Ygb3duIHRyYW5zZm9ybWF0aW9uIHN0YWNrXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgMmQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhICo9IHRoaXMuX29wYWNpdHk7XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gdGhpcy5fY29tcG9zaXRlO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSk9PiB7XG4gICAgICAgICAgICBpdGVtLnJlbmRlcihjb250ZXh0KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0Um90YXRpb24odmFsKSB7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFNjYWxlWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0U2NhbGVZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQga2V5Y29kZXMgZnJvbSAnLi9saWIva2V5Y29kZXMnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBJbnB1dFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlIGNhbnZhc1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVudGl0eX0gY2FudmFzICAgICAgICAgICAgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzXVxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5jYW52YXNGaXRdICAgICAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JNb3VzZV0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yVG91Y2hdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvcktleWJvYXJkXSBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIGtleWJvYXJkIGV2ZW50c1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy53aW5kb3ddICAgICAgICAgICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy5kb2N1bWVudF0gICAgICAgICAgZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdHMgPSB7fSkge1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0cy5jYW52YXNGaXQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yTW91c2UgPSBvcHRzLmxpc3RlbkZvck1vdXNlIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvclRvdWNoID0gb3B0cy5saXN0ZW5Gb3JUb3VjaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQgPSBvcHRzLmxpc3RlbkZvcktleWJvYXJkIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIHRoaXMuX3VpRXZlbnRzID0ge1xuICAgICAgICAgICAgREJMX0NMSUNLOiAnZGJsY2xpY2snLFxuICAgICAgICAgICAgREJMX1RBUDogJ2RibHRhcCcsXG5cbiAgICAgICAgICAgIERSQUc6ICdkcmFnJyxcbiAgICAgICAgICAgIERSQUdfRU5EOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICBEUkFHX1NUQVJUOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICAgICAgICBUQVA6ICd0YXAnLFxuXG4gICAgICAgICAgICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgICAgICAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgVE9VQ0hfRU5EOiAndG91Y2hlbmQnLFxuXG4gICAgICAgICAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuXG4gICAgICAgICAgICBLRVlfVVA6ICdrZXl1cCcsXG4gICAgICAgICAgICBLRVlfRE9XTjogJ2tleWRvd24nXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGlzdGVuZXJzIHZhbHVlcyBhcmUgYXJyYXlzIG9mIG9iamVjdHMgY29udGFpbmluZyBoYW5kbGVycyBhbmQgKG9wdGlvbmFsKSB0YXJnZXRzXG4gICAgICAgIC8vIGVnOiB0aGlzLl9saXN0ZW5lcnMua2V5dXAgPSBbe1xuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsuLi59LFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogeyBuYW1lOiAnZm9vJywgeDogMzIsIHk6IDY0LCAuLi59XG4gICAgICAgIC8vICAgICB9XTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3VpRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdGhpcy5fdWlFdmVudHNba2V5XV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleWNvZGVzID0ga2V5Y29kZXM7XG4gICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IHt9O1xuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uVGljayA9IHRoaXMuX29uVGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgdGhpcy5fb25UaWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZEtleWJvYXJkTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2tleXVwJywgJ2tleWRvd24nXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG1vdXNlIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkTW91c2VMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdWNoIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkVG91Y2hMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsndGFwJywgJ2RibHRhcCcsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSByYXRpbyBvZiB0aGUgY2FudmFzIGJhc2VkIG9uIHdpdGgvaGVnaHQgYXR0cnMgYW5kIGNzcyB3aWR0aC9oZWlnaHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2dldFNjYWxlRmFjdG9yXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgX2dldFNjYWxlRmFjdG9yKCkge1xuICAgICAgICBsZXQgZmFjdG9yID0gMTtcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gcGFyc2VJbnQodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgICAgICBmYWN0b3IgPSBjYW52YXNXaWR0aCAvIHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxMDAgLyBmYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBvaW50IGlzIGluc2lkZSByZWN0YW5nbGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hpdFRlc3RcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvdW5kaW5nQm94IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlDb2RlOiBpbnB1dEV2ZW50LmtleUNvZGUsXG4gICAgICAgICAgICBrZXlOYW1lOiB0eXBlb2Yga2V5TmFtZSA9PT0gJ29iamVjdCcgJiYga2V5TmFtZS5sZW5ndGggP1xuICAgICAgICAgICAgICAgIGtleU5hbWVbMF0gOlxuICAgICAgICAgICAgICAgIGtleU5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX0RPV046XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV0gPSBpbnB1dEV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9VUDpcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5rZXlzRG93biA9IHRoaXMuZ2V0S2V5c0Rvd24oKTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICogQ3JlYXRlcyBldmVudCBvYmplY3RzIHdpdGggeC95IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNjYWxpbmcgYW5kIGFic1gvYWJzWSBmb3JcbiAgICAgKiBhYnNvbHV0ZSB4L3kgcmVnYXJkbGVzcyBvZiBzY2FsZSBvZmZzZXRcbiAgICAgKiBPbmx5IHVzZXMgZmlyc3QgdG91Y2ggZXZlbnQsIHRodXMgbm90IGN1cnJlbnRseSBzdXBwb3J0aW5nIG11bHRpLXRvdWNoXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IFRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX2hhbmRsZU1vdXNlQW5kVG91Y2goaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gdGhpcy5fY2FudmFzRml0ID8gdGhpcy5fZ2V0U2NhbGVGYWN0b3IoKSA6IDE7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgIGlmIChpbnB1dEV2ZW50Lmhhc093blByb3BlcnR5KCd0b3VjaGVzJykpIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvb3JkaW5hdGUgcG9zaXRpb25zIHJlbGF0aXZlIHRvIGNhbnZhcyBzY2FsaW5nXG4gICAgICAgIGV2ZW50LnggPSBNYXRoLnJvdW5kKGV2ZW50LmFic1ggKiBzY2FsZUZhY3Rvcik7XG4gICAgICAgIGV2ZW50LnkgPSBNYXRoLnJvdW5kKGV2ZW50LmFic1kgKiBzY2FsZUZhY3Rvcik7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX0RPV046XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX1NUQVJUOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9VUDpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfRU5EOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX0VORFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfTU9WRTpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfTU9WRTpcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19TVEFSVFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBkdXBsaWNhdGUgaGFuZGxlciBpbiB0aGUgbGlzdGVuZXIgdHlvZSBiZWluZyBhZGRlZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaXNEdXBsaWNhdGVIYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXIgIFRoZSBoYW5kbGVyIHRvIGNoZWNrXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgIGhhbmRsZXJzIFRoZSBoYW5kbGVycyBvZiB0aGUgbGlzdGVuZXIgdHlwZSBiZWluZyBhZGRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgIGxldCBkdXAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gaGFuZGxlck9iamVjdC5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYWxsIHF1ZXVlZCBldmVudHMuIFBhc3NlcyB0aGUgZmFjdG9yIGFuZCB0aWNrcyBmcm9tIHtAbGluayBUaWNrZXJ9XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19vblRpY2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGUgVGhlIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9vblRpY2soZSkge1xuICAgICAgICBmb3IgKGxldCBldmVudCBvZiB0aGlzLl9xdWV1ZWRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJIYW5kbGVycyhldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleGVjdXRlcyBoYW5kbGVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQncyB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I190cmlnZ2VySGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmlnZ2VySGFuZGxlcnMoZXZlbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0pIHtcblxuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdFRlc3QgPSB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCB8fCB0aGlzLl9oaXRUZXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdFRlc3QoZXZlbnQueCwgZXZlbnQueSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC50YXJnZXQuZ2V0Qm91bmRpbmdBcmVhKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gaGFuZGxlck9iamVjdC50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgd2FzIGJvdW5kIHdpdGggYSB0YXJnZXQgdHJpZ2dlciBoYW5kbGVyIE9OTFkgaWYgdGFyZ2V0IGhpdFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBoYW5kbGVyIGZvciBhIGNlcnRhaW4gZXZlbnQgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNhZGRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgICBUaGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSAge29iamVjdH0gICBbdGFyZ2V0XSBUaGUgdGFyZ2V0IHRvIGNoZWNrIGV2ZW50IHRyaWdnZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICBSZXR1cm5zIHRydWUgaWYgYWRkZWQgYW5kIGZhbHNlIGlmIGNhbGxiYWNrIGFscmVhZHkgZXhpc3RzXG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBoYW5kbGVyT2JqZWN0cyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IGR1cDtcblxuXG4gICAgICAgIGlmICghIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJPYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgZHVwID0gdGhpcy5faXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZHVwKSB7XG4gICAgICAgICAgICBoYW5kbGVyT2JqZWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLCB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBtYXRjaGluZyBoYW5kbGVyIGlmIGZvdW5kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3JlbW92ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgdGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciB0aGUgaGFuZGxlciB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgcmVtb3ZlZCBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCBhbmQgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCEgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyT2JqZWN0ID0gaGFuZGxlcnNbaV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIGtleXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWRcbiAgICAgKiBlZzogPGNvZGU+eyBMRUZUX0FSUk9XOiAzNywgVVBfQVJST1c6IDM4IH08L2NvZGU+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2dldEtleXNEb3duXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEtleXNEb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c0Rvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVzZXIgdG8gc2V0IGEgY3VzdG9tIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNzZXRIaXRUZXN0TWV0aG9kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHVzZXIncyBoaXQgdGVzdCBtZXRob2RcbiAgICAgKi9cbiAgICBzZXRIaXRUZXN0TWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0I3NldEhpdFRlc3RNZXRob2QgcGFyYW1ldGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBmbjtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBSZWN0YW5nbGVcbiAqIEBleHRlbmRzIHtAbGluayBTcHJpdGV9XG4gKiBAZGVzYyAgICBBIHNwcml0ZSB0aGF0IHJlbmRlcnMgYXMgYSByZWN0YW5nbGVcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4Zm9ybSkge1xuICAgICAgICBjb25zdCBtYXRyaXggPSB4Zm9ybS5nZXRNYXRyaXgoKTtcblxuICAgICAgICB0aGlzLl9nbG9iYWxYID0gbWF0cml4WzRdO1xuICAgICAgICB0aGlzLl9nbG9iYWxZID0gbWF0cml4WzVdO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVggPSBtYXRyaXhbMF07XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWSA9IG1hdHJpeFszXTtcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxYLCB0aGlzLl9nbG9iYWxZLFxuICAgICAgICAgICAgdGhpcy5fd2lkdGggICogdGhpcy5fZ2xvYmFsU2NhbGVYLFxuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ICogdGhpcy5fZ2xvYmFsU2NhbGVZXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxYLCB0aGlzLl9nbG9iYWxZLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoICAqIHRoaXMuX2dsb2JhbFNjYWxlWCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgKiB0aGlzLl9nbG9iYWxTY2FsZVlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IHRoaXMuX3g7XG4gICAgICAgIHRoaXMuX2dsb2JhbFkgPSB0aGlzLl95O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX3NyY0hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU2NhbGVYID0gdGhpcy5fc2NhbGVYO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVkgPSB0aGlzLl9zY2FsZVk7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5fZ2xvYmFsU2NhbGVYICogKHRoaXMuX2dsb2JhbFggKyB0aGlzLl93aWR0aCksXG4gICAgICAgICAgICBtYXhZOiB0aGlzLl9nbG9iYWxTY2FsZVkgKiAodGhpcy5fZ2xvYmFsWSArIHRoaXMuX2hlaWdodCksXG4gICAgICAgICAgICBtaW5YOiB0aGlzLl9nbG9iYWxTY2FsZVggKiB0aGlzLl9nbG9iYWxYLFxuICAgICAgICAgICAgbWluWTogdGhpcy5fZ2xvYmFsU2NhbGVZICogdGhpcy5fZ2xvYmFsWVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldENvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0SGVpZ2h0XG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRXaWR0aFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgY29tcG9zaXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldENvbXBvc2l0ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0SGVpZ2h0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBoZWlnaHQgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1godmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1kodmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRXaWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgd2lkdGggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0V2lkdGgodmFsKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG4vKipcbiAqIEBtZW1iZXIgU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTdGFnZVxuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBlbGVtZW50LiBpbmNsdWRlZCBpbiB0aGUgb3B0aW9uc1xuICogICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBvcHRpb25hbCBkZXBlbmRlbmN5IGluamVjdGlvbiB1c2VkIGZvciB0ZXN0aW5nIGFnYWluc3RcbiAqICAgICAgICAgICAgICBhIHZpcnR1YWwgZG9tLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFt3aWR0aF0gICAgICAgICBUaGUgd2lkdGggb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW2hlaWdodF0gICAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHNdICAgICAgICAgIFN0YWdlIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRzLnBhcmVudEVsXSBUaGUgZWxlbWVudCB3aXRoIHdoaWNoIHRvIGF0dGFjaCB0aGUgY2FudmFzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vbmUgZ2l2ZW4gdGhlIGJvZHkgaXMgdXNlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLmJnQ29sb3JdICBUaGUgcGFyZW50IGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMuZG9jdW1lbnRdIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy53aW5kb3ddICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIFtvcHRzLmZpbGxdICAgICBTZXQgdG8gZmFsc2UgdG8gbm90IG1heGltYWxseSBmaWxsIHZpZXdwb3J0LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl9maWxsID0gb3B0cy5maWxsID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5maWxsO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IG9wdHMucGFyZW50RWwgfHwgdGhpcy5fZG9jdW1lbnQuYm9keTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0cy5iZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVN0YWdlRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVN0YWdlRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuX3N0YWdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX3N0YWdlKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdmlkZW8pO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBfcmVzaXplRWxlbWVudCBmb3Igc3RhZ2UgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX2hhbmRsZVJlc2l6ZVxuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl92aWRlbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgdG8gaGFuZGxlIHJlc2l6ZSBiYXNlZCBvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19yZXNpemVFbGVtZW50XG4gICAgICogQHBhcmFtICB7SFRNTEVudGl0eX0gZWwgVGhlIGVsZW1lbnQgdG8gcmVzaXplXG4gICAgICovXG4gICAgX3Jlc2l6ZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gU3RhZ2UuZmlsbChcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBTdGFnZS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldENhbnZhc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldFZpZGVvXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbWl6ZXMgYW4gZWxlbWVudCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnQgdmlhIENTUy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuZmlsbFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWxsKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gdmlld3BvcnRIZWlnaHQgLyB2aWV3cG9ydFdpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB2aWV3cG9ydFdpZHRoIC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2VlcHMgc3RhZ2UgZWxlbWVudCBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuY2VudGVyXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgdG9wIGFuZCBsZWZ0XG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogKHZpZXdwb3J0V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgdG9wOiAodmlld3BvcnRIZWlnaHQgLSBoZWlnaHQpIC8gMlxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGJhc2VkIG9uIGdpdmVuIGZwcyBhbmQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdICAgICAgICAgV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzXSAgICAgICAgICBPcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLndpbmRvd10gICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLmRvY3VtZW50XSBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydCA9IHRydWUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAobm93IC0gdGhpcy5fdGhlbikgLyAxMDAwO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgY29uc3QgZXZ0T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB0aGlzLl90aWNrc1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50cyBhbmQgZXhlY3V0ZSBjYWxsYmFja3NcbiAgICAgICAgbGV0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncHJldGljaycsIGV2dE9iamVjdCk7XG4gICAgICAgIHRoaXMub25QcmVUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblBvc3RUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBwcmUgZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25QcmVUaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25QcmVUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcG9zdCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25Qb3N0VGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUG9zdFRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNUcmFuc2Zvcm1cbiAqIEBkZXNjcmlwdGlvbiBSZXRhaW5zIGNhbnZhcyB0cmFuc2Zvcm1hdGlvbiBzdGFjay5cbiAqICAgICAgICAgICAgICBCYXNpY2FsbHkgZXMyMDE1IGZvcmsgZnJvbSB7QGxpbmsgaHR0cDovL3d3dy5zaW1vbnNhcnJpcy5jb218U2ltb24gU2FycmlzfSAtIHNhcnJpc0BhY20ub3JnXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1RyYW5zZm9ybSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFsxLDAsMCwxLDAsMF07IC8vaW5pdGlhbGl6ZSB3aXRoIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIH1cblxuICAgIHNldENvbnRleHQoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGdldE1hdHJpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICAgIH1cblxuICAgIHNldE1hdHJpeChtKSB7XG4gICAgICAgIHRoaXMubWF0cml4ID0gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBjbG9uZU1hdHJpeChtKSB7XG4gICAgICAgIHJldHVybiBbbVswXSxtWzFdLG1bMl0sbVszXSxtWzRdLG1bNV1dO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhY2tcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBtYXRyaXggPSB0aGlzLmNsb25lTWF0cml4KHRoaXMuZ2V0TWF0cml4KCkpO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobWF0cml4KTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgIH1cblxuICAgIHJlc3RvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBtYXRyaXggPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXRyaXgobWF0cml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXhcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFswXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsxXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsyXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFszXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs1XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMubWF0cml4WzRdICs9IHRoaXMubWF0cml4WzBdICogeCArIHRoaXMubWF0cml4WzJdICogeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gKz0gdGhpcy5tYXRyaXhbMV0gKiB4ICsgdGhpcy5tYXRyaXhbM10gKiB5O1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlKHJhZCkge1xuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogYyArIHRoaXMubWF0cml4WzJdICogcztcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogYyArIHRoaXMubWF0cml4WzNdICogcztcbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogLXMgKyB0aGlzLm1hdHJpeFsyXSAqIGM7XG4gICAgICAgIGxldCBtMjIgPSB0aGlzLm1hdHJpeFsxXSAqIC1zICsgdGhpcy5tYXRyaXhbM10gKiBjO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHNjYWxlKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1hdHJpeFszXSAqPSBzeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4IGV4dGVuc2lvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHJvdGF0ZURlZ3JlZXMoZGVnKSB7XG4gICAgICAgIGxldCByYWQgPSBkZWcgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB0aGlzLnJvdGF0ZShyYWQpO1xuICAgIH1cblxuICAgIHJvdGF0ZUFib3V0KHJhZCwgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByb3RhdGVEZWdyZWVzQWJvdXQoZGVnLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLnJvdGF0ZURlZ3JlZXMoZGVnKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdGhpcy5tID0gWzEsMCwwLDEsMCwwXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseShtYXRyaXgpIHtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICBsZXQgbTEyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVswXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bMV07XG5cbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVsyXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bM107XG5cbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs0XTtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs1XTtcblxuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gPSBkeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gPSBkeTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIGxldCBkID0gMSAvICh0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzNdIC0gdGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFsyXSk7XG4gICAgICAgIGxldCBtMCA9IHRoaXMubWF0cml4WzNdICogZDtcbiAgICAgICAgbGV0IG0xID0gLXRoaXMubWF0cml4WzFdICogZDtcbiAgICAgICAgbGV0IG0yID0gLXRoaXMubWF0cml4WzJdICogZDtcbiAgICAgICAgbGV0IG0zID0gdGhpcy5tYXRyaXhbMF0gKiBkO1xuICAgICAgICBsZXQgbTQgPSBkICogKHRoaXMubWF0cml4WzJdICogdGhpcy5tYXRyaXhbNV0gLSB0aGlzLm1hdHJpeFszXSAqIHRoaXMubWF0cml4WzRdKTtcbiAgICAgICAgbGV0IG01ID0gZCAqICh0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzRdIC0gdGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFs1XSk7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTA7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTE7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTI7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTM7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gbTQ7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gbTU7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBIZWxwZXJzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0cmFuc2Zvcm1Qb2ludCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4ICogdGhpcy5tYXRyaXhbMF0gKyB5ICogdGhpcy5tYXRyaXhbMl0gKyB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgIHk6IHggKiB0aGlzLm1hdHJpeFsxXSArIHkgKiB0aGlzLm1hdHJpeFszXSArIHRoaXMubWF0cml4WzVdXG4gICAgICAgIH07XG4gICAgfVxufSIsIi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIDg6ICdCQUNLU1BBQ0UnLFxuICAgIDk6ICdUQUInLFxuICAgIDEzOiAnRU5URVInLFxuICAgIDE2OiAnU0hJRlQnLFxuICAgIDE3OiAnQ1RSTCcsXG4gICAgMTg6ICdBTFQnLFxuICAgIDE5OiAnUEFVU0VfQlJFQUsnLFxuICAgIDIwOiAnQ0FQU19MT0NLJyxcbiAgICAyNzogJ0VTQ0FQRScsXG4gICAgMzM6ICdQQUdFX1VQJyxcbiAgICAzNDogJ1BBR0VfRE9XTicsXG4gICAgMzU6ICdFTkQnLFxuICAgIDM2OiAnSE9NRScsXG4gICAgMzc6ICdMRUZUX0FSUk9XJyxcbiAgICAzODogJ1VQX0FSUk9XJyxcbiAgICAzOTogJ1JJR0hUX0FSUk9XJyxcbiAgICA0MDogJ0RPV05fQVJST1cnLFxuICAgIDQ1OiAnSU5TRVJUJyxcbiAgICA0NjogJ0RFTEVURScsXG4gICAgNDg6IFswLCcpJ10sXG4gICAgNDk6IFsxLCchJ10sXG4gICAgNTA6IFsyLCdAJ10sXG4gICAgNTE6IFszLCcjJ10sXG4gICAgNTI6IFs0LCckJ10sXG4gICAgNTM6IFs1LCclJ10sXG4gICAgNTQ6IFs2LCdeJ10sXG4gICAgNTU6IFs3LCcmJ10sXG4gICAgNTY6IFs4LCcqJ10sXG4gICAgNTc6IFs5LCcoJ10sXG4gICAgNjU6ICdBJyxcbiAgICA2NjogJ0InLFxuICAgIDY3OiAnQycsXG4gICAgNjg6ICdEJyxcbiAgICA2OTogJ0UnLFxuICAgIDcwOiAnRicsXG4gICAgNzE6ICdHJyxcbiAgICA3MjogJ0gnLFxuICAgIDczOiAnSScsXG4gICAgNzQ6ICdKJyxcbiAgICA3NTogJ0snLFxuICAgIDc2OiAnTCcsXG4gICAgNzc6ICdNJyxcbiAgICA3ODogJ04nLFxuICAgIDc5OiAnTycsXG4gICAgODA6ICdQJyxcbiAgICA4MTogJ1EnLFxuICAgIDgyOiAnUicsXG4gICAgODM6ICdTJyxcbiAgICA4NDogJ1QnLFxuICAgIDg1OiAnVScsXG4gICAgODY6ICdWJyxcbiAgICA4NzogJ1cnLFxuICAgIDg4OiAnWCcsXG4gICAgODk6ICdZJyxcbiAgICA5MDogJ1onLFxuICAgIDkxOiAnTEVGVF9XSU5ET1dfS0VZJyxcbiAgICA5MjogJ1JJR0hUX1dJTkRPV19LRVknLFxuICAgIDkzOiAnU0VMRUNUX0tFWScsXG4gICAgOTY6ICdOVU1fUEFEXzAnLFxuICAgIDk3OiAnTlVNX1BBRF8xJyxcbiAgICA5ODogJ05VTV9QQURfMicsXG4gICAgOTk6ICdOVU1fUEFEXzMnLFxuICAgIDEwMDogJ05VTV9QQURfNCcsXG4gICAgMTAxOiAnTlVNX1BBRF81JyxcbiAgICAxMDI6ICdOVU1fUEFEXzYnLFxuICAgIDEwMzogJ05VTV9QQURfNycsXG4gICAgMTA0OiAnTlVNX1BBRF84JyxcbiAgICAxMDU6ICdOVU1fUEFEXzknLFxuICAgIDEwNjogJ05VTV9QQURfQVNURVJJU0snLFxuICAgIDEwNzogJ05VTV9QQURfUExVUycsXG4gICAgMTA5OiAnTlVNX1BBRF9NSU5VUycsXG4gICAgMTExOiAnTlVNX1BBRF9GT1dBUkRfU0xBU0gnLFxuICAgIDExMjogJ0YxJyxcbiAgICAxMTM6ICdGMicsXG4gICAgMTE0OiAnRjMnLFxuICAgIDExNTogJ0Y0JyxcbiAgICAxMTY6ICdGNScsXG4gICAgMTE3OiAnRjYnLFxuICAgIDExODogJ0Y3JyxcbiAgICAxMTk6ICdGOCcsXG4gICAgMTIwOiAnRjknLFxuICAgIDEyMTogJ0YxMCcsXG4gICAgMTIyOiAnRjExJyxcbiAgICAxMjM6ICdGMTInLFxuICAgIDE0NDogJ05VTV9MT0NLJyxcbiAgICAxNDU6ICdTQ1JPTExfTE9DSycsXG4gICAgMTg2OiBbJzsnLCc6J10sXG4gICAgMTg3OiBbJz0nLCcrJ10sXG4gICAgMTg4OiBbJywnLCc8J10sXG4gICAgMTg5OiBbJy0nLCdfJ10sXG4gICAgMTkwOiBbJy4nLCc+J10sXG4gICAgMTkxOiBbJy8nLCc/J10sXG4gICAgMTkyOiBbJ2AnLCd+J10sXG4gICAgMjE5OiBbJ1snLCd7J10sXG4gICAgMjIwOiBbJ1xcXFwnLCd8J10sXG4gICAgMjIxOiBbJ10nLCd9J10sXG4gICAgMjIyOiBbJ1xcJycsJ1wiJ11cbn07XG4iXX0=
