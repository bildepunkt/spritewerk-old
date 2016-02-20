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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9Db2xsZWN0aW9uLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvR3JvdXAuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvUmVjdGFuZ2xlLmpzIiwic3JjL1Nwcml0ZS5qcyIsInNyYy9TdGFnZS5qcyIsInNyYy9UaWNrZXIuanMiLCJzcmMvbGliL0NhbnZhc1RyYW5zZm9ybS5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBLElBQUksU0FBUyxzQkFBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUM1QixhQUFTLE1BQVQ7QUFDQSxVQUFNLElBQU47Q0FGUSxDQUFSO0FBSUosSUFBSSxPQUFPLG1CQUFTLE1BQU0sU0FBTixFQUFULEVBQTRCLE1BQTVCLENBQVA7QUFDSixJQUFJLFFBQVEsb0JBQVUsTUFBTSxTQUFOLEVBQVYsQ0FBUjtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixJQUFJLFNBQVMsb0JBQVUsRUFBVixFQUFjLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsQ0FBc0MsR0FBdEMsQ0FBVDtBQUNKLElBQUksU0FBUyxvQkFBVSxDQUFWLEVBQWEsRUFBYixDQUFUO0FBQ0osSUFBSSxPQUFPLHlCQUFQOztBQUVKLE9BQU8sT0FBUCxDQUFlLElBQWYsRUFBcUIsTUFBckI7QUFDQSxPQUFPLE9BQVAsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCOztBQUVBLE9BQU8sU0FBUCxHQUFtQixZQUFZO0FBQzNCLFNBQUssTUFBTCxDQUFZLE1BQVosRUFEMkI7Q0FBWjs7QUFJbkIsT0FBTyxNQUFQLEdBQWdCLFVBQVUsTUFBVixFQUFrQjtBQUM5QixT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QUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksaUJBQUo7QUFDQSxRQUFJLGtCQUFKO0FBQ0EsUUFBSSxZQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssZUFBTDtBQUNBLFNBQUssc0JBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLFVBQUw7QUFDQSxTQUFLLGFBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxJQUFELEVBQU0sR0FBTixDQUFMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBEcmF3IGZyb20gJy4vc3JjL0RyYXcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vc3JjL1JlY3RhbmdsZSc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9zcmMvR3JvdXAnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGRyYXcgPSBuZXcgRHJhdyhzdGFnZS5nZXRDYW52YXMoKSwgY2FtZXJhKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG5sZXQgZ3JvdXBBID0gbmV3IEdyb3VwKDMyKS5zZXRTY2FsZVgoMikuc2V0T3BhY2l0eSgwLjUpO1xubGV0IGdyb3VwQiA9IG5ldyBHcm91cCgwLCAzMik7XG5sZXQgcmVjdCA9IG5ldyBSZWN0YW5nbGUoKTtcblxuZ3JvdXBCLmFkZEl0ZW0ocmVjdCwgJ3JlY3QnKTtcbmdyb3VwQS5hZGRJdGVtKGdyb3VwQiwgJ2dycCcpO1xuXG50aWNrZXIub25QcmVUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGRyYXcudXBkYXRlKGdyb3VwQSk7XG59O1xuXG50aWNrZXIub25UaWNrID0gZnVuY3Rpb24gKGZhY3Rvcikge1xuICAgIGRyYXcuY2xlYXIoJyNEREQnKTtcblxuICAgIGRyYXcucmVuZGVyKGdyb3VwQSk7XG59O1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gRGVjaWRlcyB3aGF0IGdldHMgcmVuZGVyZWRcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ29sbGVjdGlvblxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIHRoZSBzb3J0YWJsZSwgaXRlcmFibGUgc3RvcmFnZSBvZiBlbnRpdGllcyB0aGF0IGFyZVxuICogICAgICAgICAgICAgIGdldHRhYmxlLCBzZXR0YWJsZSwgc29ydGFibGUsIHJlbW92YWJsZSwgZXRjZXJhKGJsZSkgYnkgbmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBUaGUgc29ydGVkIGxpc3RcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaXRlbSB7IG5hbWUsIGl0ZW0gfSBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRSYXdJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5fcmF3RWFjaChmdW5jdGlvbihpdGVySXRlbSwgaSwgaXRlck5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSByYXcgaXRlbSwgaW5kZXgsIG5hbWUsIGFuZCB0aGVcbiAgICAgKiBsaXN0IGJlaW5nIGl0ZXJhdGVkIGFyZSBzdXBwbGllZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmF3RWFjaChmbikge1xuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9pdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGZuKHRoaXMuX2l0ZW1zW2ldLCBpLCB0aGlzLl9pdGVtc1tpXS5uYW1lLCB0aGlzLl9pdGVtcykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gaXRlbSB3aXRoIG9wdGlvbmFsIG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0FueX0gICAgICAgIGl0ZW0gICBUaGUgaXRlbSB0byBhZGRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbbmFtZV0gVGhlIG9wdGlvbmFsIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbSwgbmFtZSkge1xuICAgICAgICBuYW1lID0gbmFtZSB8fCAnJztcblxuICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGl0ZW0sIG5hbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG11bHRpcGxlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLk9iamVjdH0gaXRlbXMgQ2FuIGJlIHRoZSBvYmplY3QgaXRzZWxmIG9yIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBlbnRpdHkgYW5kIGl0J3MgbmFtZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICBlZzogPGNvZGU+eyBpdGVtOiBFbnRpdHksIG5hbWU6ICdlbnRpdHlOYW1lJyB9PC9jb2RlPlxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbXMoLi4uaXRlbXMpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLml0ZW0gPT09ICdvYmplY3QnICYmIHR5cGVvZiBpdGVtLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaXRlbSBoYXMgaXRlbS9uYW1lIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtLml0ZW0sIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZvciBjb252ZW5pZW5jZSBhbGxvdyB1c2VyIHRvIGFkZCBqdXN0IGl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIGl0ZW0sIGluZGV4LCBhbmQgbmFtZSBhcmUgc3VwcGxpZWRcbiAgICAgKiB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuICAgICAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdGhlIGl0ZXJhYmxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgW3Njb3BlXSBUaGUgc2NvcGUgd2l0aCB3aGljaCB0byBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgICAqL1xuICAgIGVhY2goZm4sIHNjb3BlKSB7XG4gICAgICAgIGZuID0gc2NvcGUgPyBmbi5iaW5kKHNjb3BlKSA6IGZuO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9pdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9pdGVtc1tpXTtcblxuICAgICAgICAgICAgaWYgKGZuKGl0ZW0uaXRlbSwgaSwgaXRlbS5uYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGl0ZXJhdGVzIGl0ZW1zIGFuZCByZXR1cm4gdGhlIG9uZXMgdGhhdCBtZWV0IGNyaXRlcmlhXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgICBUcnV0aCBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW3Njb3BlXSBUaGUgc2NvcGUgd2l0aCB3aGljaCB0byBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZpbHRlcihmbiwgc2NvcGUpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXMgPSBbXTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0sIGksIG5hbWUpPT4ge1xuICAgICAgICAgICAgbGV0IHByZWRpY2F0ZSA9IGZuKGl0ZW0sIGksIG5hbWUpO1xuXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzY29wZSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkSXRlbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YganVzdCB0aGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGdldEl0ZW1BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLm1hcCgoaXRlbSk9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pdGVtO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgbmFtZSwgb3IgdW5kZWZpbmVkIGlmIHRoZSBuYW1lIGlzIG5vdCBmb3VuZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbUF0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1tpbmRleF0uaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb3VudCBvZiBpdGVtcyBpbiBjb2xsZWN0aW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEl0ZW1Db3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGl0ZW0ncyBjdXJyZW50IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEl0ZW1JbmRleChuYW1lKSB7XG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIGNvbGxlY3Rpb25cbiAgICAgKi9cbiAgICByZW1vdmVBbGxJdGVtcygpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIG9iamVjdCBieSBuYW1lXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNXLkNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUl0ZW1cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGl0ZW0gcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgcmVtb3ZlSXRlbShuYW1lKSB7XG4gICAgICAgIHZhciByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lLCBpdGVtcyk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVySXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgYSBuZXcgdmFsdWUgdG8gYW4gZXhpc3RpbmcgaXRlbVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgdG8gbW9kaWZ5XG4gICAgICogQHBhcmFtIHtBbnl9ICAgIHZhbHVlIFRoZSBuZXcgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJdGVtKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSk9PiB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVySXRlbS5pdGVtID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgaXRlbSB0byBuZXcgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCBiZWluZyBtb3ZlZFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggVGhlIGl0ZW0ncyBuZXcgaW5kZXhcbiAgICAgKi9cbiAgICBzZXRJdGVtSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChuYW1lKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbSA9IHRoaXMuX2dldFJhd0l0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5faXRlbXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FudmFzVHJhbnNmb3JtIGZyb20gJy4vbGliL0NhbnZhc1RyYW5zZm9ybSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIERyYXdcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC4gTWVyZ2VzIGNvbnRleHRcbiAqICAgICAgICAgICAgICBvYmplY3Qgd2l0aCBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICogQHJlcXVpcmVzICAgIHtAbGluayBDYW52YXNUcmFuc2Zvcm19XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzIFRoZSBhY3RpdmUgY2FudmFzIGVsZW1lbnRcbiAqIEBwYXJhbSB7Q2FtZXJhfSAgICAgIGNhbWVyYSBUaGUgY2FtZXJhIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX3hmb3JtID0gbmV3IENhbnZhc1RyYW5zZm9ybSh0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZW50aXJlIGNhbnZhcyBhbmQgb3B0aW9uYWxseSBmaWxscyB3aXRoIGEgY29sb3JcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNnZXRDb250ZXh0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgMkQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IHhmb3JtIG9iamVjdFxuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I2dldFhmb3JtXG4gICAgICogQHJldHVybiB7Q2FudmFzVHJhbnNmb3JtfSBUaGUgY29udGV4dCB4Zm9ybSBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRYZm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3hmb3JtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9mZnNldHMgY2FudmFzIGJhc2VkIG9uIGNhbWVyYSBhbmQgY2FsbHMgYW4gZW50aXR5J3MgcmVuZGVyIG1ldGhvZCBwYXNzaW5nIHRoZSBjb250ZXh0LlxuICAgICAqIFNhdmVzIGFuZCByZXN0b3JlcyBjb250ZXh0IGFuZCBiZWdpbm5pbmcgYW5kIGVuZCBvZiBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlbnRpdHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihlbnRpdHkpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgZW50aXR5LnJlbmRlcih0aGlzLl9jb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbnRleHQgaW1hZ2Ugc21vb3RoaW5nXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjc2V0SW1hZ2VTbW9vdGhpbmdcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSB2YWwgVGhlIGltYWdlIHNtb290aGluZyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEltYWdlU21vb3RoaW5nKHZhbCkge1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKGVudGl0eSkge1xuICAgICAgICB0aGlzLl94Zm9ybS5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5feGZvcm0udHJhbnNsYXRlKC10aGlzLl9jYW1lcmEuZ2V0WCgpLCAtdGhpcy5fY2FtZXJhLmdldFkoKSk7XG4gICAgICAgIGVudGl0eS51cGRhdGUodGhpcy5feGZvcm0pO1xuXG4gICAgICAgIHRoaXMuX3hmb3JtLnJlc3RvcmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL0NvbGxlY3Rpb24nO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIEdyb3VwXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgYSB0cmFuc2Zvcm1hdGlvbiBoaWVyYXJjaHkgZm9yIHtAbGluayBDb2xsZWN0aW9ufXNcbiAqIEBleHRlbmRzICAgICBDb2xsZWN0aW9uXG4gKiBAcmVxdWlyZXMgICAgU3ByaXRlXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwLlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cCBleHRlbmRzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgYWxsIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IG9uIHRvcCBvZiBvd24gdHJhbnNmb3JtYXRpb24gc3RhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjdXBkYXRlXG4gICAgICogQHJldHVybiB7Q2FudmFzVHJhbnNmb3JtfSB4Zm9ybSBUaGUgQ2FudmFzVHJhbnNmb3JtIGluc3RhbmNlXG4gICAgICovXG4gICAgdXBkYXRlKHhmb3JtKSB7XG4gICAgICAgIHhmb3JtLnNhdmUoKTtcblxuICAgICAgICB4Zm9ybS50cmFuc2xhdGUodGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgIHhmb3JtLnNjYWxlKHRoaXMuX3NjYWxlWCwgdGhpcy5fc2NhbGVZKTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoeGZvcm0pO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB4Zm9ybS5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHQgVGhlIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSAqPSB0aGlzLl9vcGFjaXR5O1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHRoaXMuX2NvbXBvc2l0ZTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW5kZXIoY29udGV4dCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0U2NhbGVYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IGtleWNvZGVzIGZyb20gJy4vbGliL2tleWNvZGVzJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgSW5wdXRcbiAqIEBkZXNjcmlwdGlvbiBBIG1vZHVsZSBmb3IgaGFuZGxpbmcga2V5Ym9hcmQsIG1vdXNlLCBhbmQgdG91Y2ggZXZlbnRzIG9uIHRoZSBjYW52YXNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbnRpdHl9IGNhbnZhcyAgICAgICAgICAgICAgICAgICBUaGUgY2FudmFzIGVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aFxuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0c11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMuY2FudmFzRml0XSAgICAgICAgIFNldCB0byB0cnVlIGlmIHVzaW5nIGNzcyB0byBmaXQgdGhlIGNhbnZhcyBpbiB0aGUgdmlld3BvcnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yTW91c2VdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvclRvdWNoXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIHRvdWNoIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JLZXlib2FyZF0gV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBrZXlib2FyZCBldmVudHNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMud2luZG93XSAgICAgICAgICAgIHdpbmRvdyBvYmplY3QgZm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMuZG9jdW1lbnRdICAgICAgICAgIGRvY3VtZW50IG9iamVjdCBmb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdHMuY2FudmFzRml0IHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvck1vdXNlID0gb3B0cy5saXN0ZW5Gb3JNb3VzZSB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JUb3VjaCA9IG9wdHMubGlzdGVuRm9yVG91Y2ggfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvcktleWJvYXJkID0gb3B0cy5saXN0ZW5Gb3JLZXlib2FyZCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICB0aGlzLl91aUV2ZW50cyA9IHtcbiAgICAgICAgICAgIERCTF9DTElDSzogJ2RibGNsaWNrJyxcbiAgICAgICAgICAgIERCTF9UQVA6ICdkYmx0YXAnLFxuXG4gICAgICAgICAgICBEUkFHOiAnZHJhZycsXG4gICAgICAgICAgICBEUkFHX0VORDogJ2RyYWdlbmQnLFxuICAgICAgICAgICAgRFJBR19TVEFSVDogJ2RyYWdzdGFydCcsXG5cbiAgICAgICAgICAgIENMSUNLOiAnY2xpY2snLFxuICAgICAgICAgICAgVEFQOiAndGFwJyxcblxuICAgICAgICAgICAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gICAgICAgICAgICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICAgICAgICAgICAgVE9VQ0hfU1RBUlQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAgIFRPVUNIX0VORDogJ3RvdWNoZW5kJyxcblxuICAgICAgICAgICAgTU9VU0VfTU9WRTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICBUT1VDSF9NT1ZFOiAndG91Y2htb3ZlJyxcblxuICAgICAgICAgICAgS0VZX1VQOiAna2V5dXAnLFxuICAgICAgICAgICAgS0VZX0RPV046ICdrZXlkb3duJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGxpc3RlbmVycyB2YWx1ZXMgYXJlIGFycmF5cyBvZiBvYmplY3RzIGNvbnRhaW5pbmcgaGFuZGxlcnMgYW5kIChvcHRpb25hbCkgdGFyZ2V0c1xuICAgICAgICAvLyBlZzogdGhpcy5fbGlzdGVuZXJzLmtleXVwID0gW3tcbiAgICAgICAgLy8gICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7Li4ufSxcbiAgICAgICAgLy8gICAgICAgICB0YXJnZXQ6IHsgbmFtZTogJ2ZvbycsIHg6IDMyLCB5OiA2NCwgLi4ufVxuICAgICAgICAvLyAgICAgfV07XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl91aUV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3RoaXMuX3VpRXZlbnRzW2tleV1dID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9rZXljb2RlcyA9IGtleWNvZGVzO1xuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSB7fTtcbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEtleWJvYXJkTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yTW91c2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yVG91Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vblRpY2sgPSB0aGlzLl9vblRpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIHRoaXMuX29uVGljaywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRLZXlib2FyZExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZEtleWJvYXJkTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydrZXl1cCcsICdrZXlkb3duJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBtb3VzZSBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZE1vdXNlTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZFRvdWNoTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgc2NhbGUgcmF0aW8gb2YgdGhlIGNhbnZhcyBiYXNlZCBvbiB3aXRoL2hlZ2h0IGF0dHJzIGFuZCBjc3Mgd2lkdGgvaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19nZXRTY2FsZUZhY3RvclxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTAwIC8gZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBwb2ludCBpcyBpbnNpZGUgcmVjdGFuZ2xlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oaXRUZXN0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geCAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geSAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib3VuZGluZ0JveCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBfaGl0VGVzdCh4LCB5LCBib3VuZGluZ0JveCkge1xuICAgICAgICByZXR1cm4geCA+PSBib3VuZGluZ0JveC5taW5YICYmIHggPD0gYm91bmRpbmdCb3gubWF4WCAmJlxuICAgICAgICAgICAgeSA+PSBib3VuZGluZ0JveC5taW5ZICYmIHkgPD0gYm91bmRpbmdCb3gubWF4WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hhbmRsZUtleWJvYXJkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgdGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9oYW5kbGVLZXlib2FyZChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQga2V5TmFtZSA9IHRoaXMuX2tleWNvZGVzW2lucHV0RXZlbnQua2V5Q29kZV07XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlLFxuICAgICAgICAgICAga2V5Q29kZTogaW5wdXRFdmVudC5rZXlDb2RlLFxuICAgICAgICAgICAga2V5TmFtZTogdHlwZW9mIGtleU5hbWUgPT09ICdvYmplY3QnICYmIGtleU5hbWUubGVuZ3RoID9cbiAgICAgICAgICAgICAgICBrZXlOYW1lWzBdIDpcbiAgICAgICAgICAgICAgICBrZXlOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNEb3duW2tleU5hbWVdID0gaW5wdXRFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfVVA6XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tleXNEb3duW2tleU5hbWVdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQua2V5c0Rvd24gPSB0aGlzLmdldEtleXNEb3duKCk7XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqIENyZWF0ZXMgZXZlbnQgb2JqZWN0cyB3aXRoIHgveSBjb29yZGluYXRlcyBiYXNlZCBvbiBzY2FsaW5nIGFuZCBhYnNYL2Fic1kgZm9yXG4gICAgICogYWJzb2x1dGUgeC95IHJlZ2FyZGxlc3Mgb2Ygc2NhbGUgb2Zmc2V0XG4gICAgICogT25seSB1c2VzIGZpcnN0IHRvdWNoIGV2ZW50LCB0aHVzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGluZyBtdWx0aS10b3VjaFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCBUaGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9oYW5kbGVNb3VzZUFuZFRvdWNoKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBzY2FsZUZhY3RvciA9IHRoaXMuX2NhbnZhc0ZpdCA/IHRoaXMuX2dldFNjYWxlRmFjdG9yKCkgOiAxO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudC54ID0gTWF0aC5yb3VuZChldmVudC5hYnNYICogc2NhbGVGYWN0b3IpO1xuICAgICAgICBldmVudC55ID0gTWF0aC5yb3VuZChldmVudC5hYnNZICogc2NhbGVGYWN0b3IpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9ET1dOOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9TVEFSVDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfVVA6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX0VORDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19FTkRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX01PVkU6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX01PVkU6XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfU1RBUlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgZHVwbGljYXRlIGhhbmRsZXIgaW4gdGhlIGxpc3RlbmVyIHR5b2UgYmVpbmcgYWRkZWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2lzRHVwbGljYXRlSGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgaGFuZGxlciB0byBjaGVja1xuICAgICAqIEBwYXJhbSAge0FycmF5fSAgICBoYW5kbGVycyBUaGUgaGFuZGxlcnMgb2YgdGhlIGxpc3RlbmVyIHR5cGUgYmVpbmcgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICBsZXQgZHVwID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGhhbmRsZXJPYmplY3QuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHVwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFsbCBxdWV1ZWQgZXZlbnRzLiBQYXNzZXMgdGhlIGZhY3RvciBhbmQgdGlja3MgZnJvbSB7QGxpbmsgVGlja2VyfVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfb25UaWNrXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlIFRoZSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfb25UaWNrKGUpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgdGhpcy5fcXVldWVkRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VySGFuZGxlcnMoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZXhlY3V0ZXMgaGFuZGxlcnMgb2YgdGhlIGdpdmVuIGV2ZW50J3MgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfdHJpZ2dlckhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJpZ2dlckhhbmRsZXJzKGV2ZW50KSB7XG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgdGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdKSB7XG5cbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRUZXN0ID0gdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgfHwgdGhpcy5faGl0VGVzdDtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRUZXN0KGV2ZW50LngsIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QudGFyZ2V0LmdldEJvdW5kaW5nQXJlYSgpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IGhhbmRsZXJPYmplY3QudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGV2ZW50IHdhcyBib3VuZCB3aXRoIGEgdGFyZ2V0IHRyaWdnZXIgaGFuZGxlciBPTkxZIGlmIHRhcmdldCBoaXRcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgaGFuZGxlciBmb3IgYSBjZXJ0YWluIGV2ZW50IHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjYWRkTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICAgVGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCB0cmlnZ2VyZWRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgW3RhcmdldF0gVGhlIHRhcmdldCB0byBjaGVjayBldmVudCB0cmlnZ2VyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgUmV0dXJucyB0cnVlIGlmIGFkZGVkIGFuZCBmYWxzZSBpZiBjYWxsYmFjayBhbHJlYWR5IGV4aXN0c1xuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHRhcmdldCkge1xuICAgICAgICBsZXQgaGFuZGxlck9iamVjdHMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCBkdXA7XG5cblxuICAgICAgICBpZiAoISBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVyT2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGR1cCA9IHRoaXMuX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWR1cCkge1xuICAgICAgICAgICAgaGFuZGxlck9iamVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaGFuZGxlciwgdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbWF0Y2hpbmcgaGFuZGxlciBpZiBmb3VuZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNyZW1vdmVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gIHJlbW92ZWQgUmV0dXJucyB0cnVlIGlmIHJlbW92ZWQgYW5kIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlck9iamVjdCA9IGhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QuaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBrZXlzIGN1cnJlbnRseSBiZWluZyBwcmVzc2VkXG4gICAgICogZWc6IDxjb2RlPnsgTEVGVF9BUlJPVzogMzcsIFVQX0FSUk9XOiAzOCB9PC9jb2RlPlxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNnZXRLZXlzRG93blxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRLZXlzRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNEb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1c2VyIHRvIHNldCBhIGN1c3RvbSBoaXQgdGVzdCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0SGl0VGVzdE1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSB1c2VyJ3MgaGl0IHRlc3QgbWV0aG9kXG4gICAgICovXG4gICAgc2V0SGl0VGVzdE1ldGhvZChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCNzZXRIaXRUZXN0TWV0aG9kIHBhcmFtZXRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gZm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgUmVjdGFuZ2xlXG4gKiBAZXh0ZW5kcyB7QGxpbmsgU3ByaXRlfVxuICogQGRlc2MgICAgQSBzcHJpdGUgdGhhdCByZW5kZXJzIGFzIGEgcmVjdGFuZ2xlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9maWxsID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9zdHJva2UgPSAnJztcbiAgICB9XG5cbiAgICB1cGRhdGUoeGZvcm0pIHtcbiAgICAgICAgY29uc3QgbWF0cml4ID0geGZvcm0uZ2V0TWF0cml4KCk7XG5cbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IG1hdHJpeFs0XTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWSA9IG1hdHJpeFs1XTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU2NhbGVYID0gbWF0cml4WzBdO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVkgPSBtYXRyaXhbM107XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgICAgdGhpcy5fZ2V0QWN0dWFsWCgpLCB0aGlzLl9nZXRBY3R1YWxZKCksXG4gICAgICAgICAgICB0aGlzLl93aWR0aCAgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVgoKSxcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRBY3R1YWxYKCksIHRoaXMuX2dldEFjdHVhbFkoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCAgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVgoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9nbG9iYWxYID0gdGhpcy5feDtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWSA9IHRoaXMuX3k7XG4gICAgICAgIHRoaXMuX3NyY1ggPSAwO1xuICAgICAgICB0aGlzLl9zcmNZID0gMDtcbiAgICAgICAgdGhpcy5fc3JjV2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5fc3JjSGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVggPSB0aGlzLl9zY2FsZVg7XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWSA9IHRoaXMuX3NjYWxlWTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvc2l0ZSBvcGVyYXRpb24gdHlwZS4gQ2FuIGJlIHNvdXJjZS1hdG9wfHNvdXJjZS1pbnxzb3VyY2Utb3V0fHNvdXJjZS1vdmVyfGRlc3RpbmF0aW9uLWF0b3B8ZGVzdGluYXRpb24taW58ZGVzdGluYXRpb24tb3V0fGRlc3RpbmF0aW9uLW92ZXJ8bGlnaHRlcnx4b3J8Y29weVxuICAgICAgICAgKiBEZWZhdWx0IGlzICdzb3VyY2Utb3ZlcidcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlciBTcHJpdGUjX2NvbXBvc2l0ZVxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21wb3NpdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCBzY2FsZVhcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVggKiB0aGlzLl9nbG9iYWxTY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHNjYWxlWVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjX2dldEFjdHVhbFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgX2dldEFjdHVhbFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWSAqIHRoaXMuX2dsb2JhbFNjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvbWJpbmVkIGxvY2FsIGFuZCBnbG9iYWwgeFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjX2dldEFjdHVhbFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feCArIHRoaXMuX2dsb2JhbFg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3kgKyB0aGlzLl9nbG9iYWxZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGJvdW5kaW5nIGFyZWFcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0FyZWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXhYOiB0aGlzLl9nZXRBY3R1YWxYKCkgKyAodGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCkpLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5fZ2V0QWN0dWFsWSgpICsgKHRoaXMuX2hlaWdodCAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWSgpKSxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX2dldEFjdHVhbFgoKSxcbiAgICAgICAgICAgIG1pblk6IHRoaXMuX2dldEFjdHVhbFkoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldENvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0SGVpZ2h0XG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRXaWR0aFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgY29tcG9zaXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldENvbXBvc2l0ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0SGVpZ2h0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBoZWlnaHQgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1godmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1kodmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRXaWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgd2lkdGggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0V2lkdGgodmFsKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG4vKipcbiAqIEBtZW1iZXIgU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTdGFnZVxuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBlbGVtZW50LiBpbmNsdWRlZCBpbiB0aGUgb3B0aW9uc1xuICogICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBvcHRpb25hbCBkZXBlbmRlbmN5IGluamVjdGlvbiB1c2VkIGZvciB0ZXN0aW5nIGFnYWluc3RcbiAqICAgICAgICAgICAgICBhIHZpcnR1YWwgZG9tLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFt3aWR0aF0gICAgICAgICBUaGUgd2lkdGggb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW2hlaWdodF0gICAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHNdICAgICAgICAgIFN0YWdlIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRzLnBhcmVudEVsXSBUaGUgZWxlbWVudCB3aXRoIHdoaWNoIHRvIGF0dGFjaCB0aGUgY2FudmFzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vbmUgZ2l2ZW4gdGhlIGJvZHkgaXMgdXNlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLmJnQ29sb3JdICBUaGUgcGFyZW50IGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMuZG9jdW1lbnRdIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy53aW5kb3ddICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIFtvcHRzLmZpbGxdICAgICBTZXQgdG8gZmFsc2UgdG8gbm90IG1heGltYWxseSBmaWxsIHZpZXdwb3J0LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl9maWxsID0gb3B0cy5maWxsID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5maWxsO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IG9wdHMucGFyZW50RWwgfHwgdGhpcy5fZG9jdW1lbnQuYm9keTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0cy5iZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVN0YWdlRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVN0YWdlRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuX3N0YWdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX3N0YWdlKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdmlkZW8pO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBfcmVzaXplRWxlbWVudCBmb3Igc3RhZ2UgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX2hhbmRsZVJlc2l6ZVxuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl92aWRlbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgdG8gaGFuZGxlIHJlc2l6ZSBiYXNlZCBvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19yZXNpemVFbGVtZW50XG4gICAgICogQHBhcmFtICB7SFRNTEVudGl0eX0gZWwgVGhlIGVsZW1lbnQgdG8gcmVzaXplXG4gICAgICovXG4gICAgX3Jlc2l6ZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gU3RhZ2UuZmlsbChcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBTdGFnZS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldENhbnZhc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldFZpZGVvXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbWl6ZXMgYW4gZWxlbWVudCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnQgdmlhIENTUy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuZmlsbFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWxsKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gdmlld3BvcnRIZWlnaHQgLyB2aWV3cG9ydFdpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB2aWV3cG9ydFdpZHRoIC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2VlcHMgc3RhZ2UgZWxlbWVudCBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuY2VudGVyXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgdG9wIGFuZCBsZWZ0XG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogKHZpZXdwb3J0V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgdG9wOiAodmlld3BvcnRIZWlnaHQgLSBoZWlnaHQpIC8gMlxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGJhc2VkIG9uIGdpdmVuIGZwcyBhbmQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdICAgICAgICAgV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzXSAgICAgICAgICBPcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLndpbmRvd10gICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLmRvY3VtZW50XSBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydCA9IHRydWUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAobm93IC0gdGhpcy5fdGhlbikgLyAxMDAwO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgY29uc3QgZXZ0T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB0aGlzLl90aWNrc1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50cyBhbmQgZXhlY3V0ZSBjYWxsYmFja3NcbiAgICAgICAgbGV0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncHJldGljaycsIGV2dE9iamVjdCk7XG4gICAgICAgIHRoaXMub25QcmVUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblBvc3RUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBwcmUgZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25QcmVUaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25QcmVUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcG9zdCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25Qb3N0VGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUG9zdFRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNUcmFuc2Zvcm1cbiAqIEBkZXNjcmlwdGlvbiBSZXRhaW5zIGNhbnZhcyB0cmFuc2Zvcm1hdGlvbiBzdGFjay5cbiAqICAgICAgICAgICAgICBCYXNpY2FsbHkgZXMyMDE1IGZvcmsgZnJvbSB7QGxpbmsgaHR0cDovL3d3dy5zaW1vbnNhcnJpcy5jb218U2ltb24gU2FycmlzfSAtIHNhcnJpc0BhY20ub3JnXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1RyYW5zZm9ybSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSBjYW52YXMnIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFsxLDAsMCwxLDAsMF07IC8vaW5pdGlhbGl6ZSB3aXRoIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIH1cblxuICAgIHNldENvbnRleHQoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGdldE1hdHJpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICAgIH1cblxuICAgIHNldE1hdHJpeChtKSB7XG4gICAgICAgIHRoaXMubWF0cml4ID0gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBjbG9uZU1hdHJpeChtKSB7XG4gICAgICAgIHJldHVybiBbbVswXSxtWzFdLG1bMl0sbVszXSxtWzRdLG1bNV1dO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhY2tcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBtYXRyaXggPSB0aGlzLmNsb25lTWF0cml4KHRoaXMuZ2V0TWF0cml4KCkpO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobWF0cml4KTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgIH1cblxuICAgIHJlc3RvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBtYXRyaXggPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXRyaXgobWF0cml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXhcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFswXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsxXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFsyXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFszXSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFs1XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMubWF0cml4WzRdICs9IHRoaXMubWF0cml4WzBdICogeCArIHRoaXMubWF0cml4WzJdICogeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gKz0gdGhpcy5tYXRyaXhbMV0gKiB4ICsgdGhpcy5tYXRyaXhbM10gKiB5O1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlKHJhZCkge1xuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogYyArIHRoaXMubWF0cml4WzJdICogcztcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogYyArIHRoaXMubWF0cml4WzNdICogcztcbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogLXMgKyB0aGlzLm1hdHJpeFsyXSAqIGM7XG4gICAgICAgIGxldCBtMjIgPSB0aGlzLm1hdHJpeFsxXSAqIC1zICsgdGhpcy5tYXRyaXhbM10gKiBjO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHNjYWxlKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1hdHJpeFszXSAqPSBzeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4IGV4dGVuc2lvbnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHJvdGF0ZURlZ3JlZXMoZGVnKSB7XG4gICAgICAgIGxldCByYWQgPSBkZWcgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB0aGlzLnJvdGF0ZShyYWQpO1xuICAgIH1cblxuICAgIHJvdGF0ZUFib3V0KHJhZCwgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByb3RhdGVEZWdyZWVzQWJvdXQoZGVnLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLnJvdGF0ZURlZ3JlZXMoZGVnKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdGhpcy5tID0gWzEsMCwwLDEsMCwwXTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseShtYXRyaXgpIHtcbiAgICAgICAgbGV0IG0xMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICBsZXQgbTEyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVswXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bMV07XG5cbiAgICAgICAgbGV0IG0yMSA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVsyXSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bM107XG5cbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs0XTtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXRyaXhbMV0gKiBtYXRyaXgubVs0XSArIHRoaXMubWF0cml4WzNdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1hdHJpeFs1XTtcblxuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0yMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gPSBkeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gPSBkeTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIGxldCBkID0gMSAvICh0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzNdIC0gdGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFsyXSk7XG4gICAgICAgIGxldCBtMCA9IHRoaXMubWF0cml4WzNdICogZDtcbiAgICAgICAgbGV0IG0xID0gLXRoaXMubWF0cml4WzFdICogZDtcbiAgICAgICAgbGV0IG0yID0gLXRoaXMubWF0cml4WzJdICogZDtcbiAgICAgICAgbGV0IG0zID0gdGhpcy5tYXRyaXhbMF0gKiBkO1xuICAgICAgICBsZXQgbTQgPSBkICogKHRoaXMubWF0cml4WzJdICogdGhpcy5tYXRyaXhbNV0gLSB0aGlzLm1hdHJpeFszXSAqIHRoaXMubWF0cml4WzRdKTtcbiAgICAgICAgbGV0IG01ID0gZCAqICh0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzRdIC0gdGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFs1XSk7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTA7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTE7XG4gICAgICAgIHRoaXMubWF0cml4WzJdID0gbTI7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTM7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gbTQ7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gbTU7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBIZWxwZXJzXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0cmFuc2Zvcm1Qb2ludCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4ICogdGhpcy5tYXRyaXhbMF0gKyB5ICogdGhpcy5tYXRyaXhbMl0gKyB0aGlzLm1hdHJpeFs0XSxcbiAgICAgICAgICAgIHk6IHggKiB0aGlzLm1hdHJpeFsxXSArIHkgKiB0aGlzLm1hdHJpeFszXSArIHRoaXMubWF0cml4WzVdXG4gICAgICAgIH07XG4gICAgfVxufSIsIi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIDg6ICdCQUNLU1BBQ0UnLFxuICAgIDk6ICdUQUInLFxuICAgIDEzOiAnRU5URVInLFxuICAgIDE2OiAnU0hJRlQnLFxuICAgIDE3OiAnQ1RSTCcsXG4gICAgMTg6ICdBTFQnLFxuICAgIDE5OiAnUEFVU0VfQlJFQUsnLFxuICAgIDIwOiAnQ0FQU19MT0NLJyxcbiAgICAyNzogJ0VTQ0FQRScsXG4gICAgMzM6ICdQQUdFX1VQJyxcbiAgICAzNDogJ1BBR0VfRE9XTicsXG4gICAgMzU6ICdFTkQnLFxuICAgIDM2OiAnSE9NRScsXG4gICAgMzc6ICdMRUZUX0FSUk9XJyxcbiAgICAzODogJ1VQX0FSUk9XJyxcbiAgICAzOTogJ1JJR0hUX0FSUk9XJyxcbiAgICA0MDogJ0RPV05fQVJST1cnLFxuICAgIDQ1OiAnSU5TRVJUJyxcbiAgICA0NjogJ0RFTEVURScsXG4gICAgNDg6IFswLCcpJ10sXG4gICAgNDk6IFsxLCchJ10sXG4gICAgNTA6IFsyLCdAJ10sXG4gICAgNTE6IFszLCcjJ10sXG4gICAgNTI6IFs0LCckJ10sXG4gICAgNTM6IFs1LCclJ10sXG4gICAgNTQ6IFs2LCdeJ10sXG4gICAgNTU6IFs3LCcmJ10sXG4gICAgNTY6IFs4LCcqJ10sXG4gICAgNTc6IFs5LCcoJ10sXG4gICAgNjU6ICdBJyxcbiAgICA2NjogJ0InLFxuICAgIDY3OiAnQycsXG4gICAgNjg6ICdEJyxcbiAgICA2OTogJ0UnLFxuICAgIDcwOiAnRicsXG4gICAgNzE6ICdHJyxcbiAgICA3MjogJ0gnLFxuICAgIDczOiAnSScsXG4gICAgNzQ6ICdKJyxcbiAgICA3NTogJ0snLFxuICAgIDc2OiAnTCcsXG4gICAgNzc6ICdNJyxcbiAgICA3ODogJ04nLFxuICAgIDc5OiAnTycsXG4gICAgODA6ICdQJyxcbiAgICA4MTogJ1EnLFxuICAgIDgyOiAnUicsXG4gICAgODM6ICdTJyxcbiAgICA4NDogJ1QnLFxuICAgIDg1OiAnVScsXG4gICAgODY6ICdWJyxcbiAgICA4NzogJ1cnLFxuICAgIDg4OiAnWCcsXG4gICAgODk6ICdZJyxcbiAgICA5MDogJ1onLFxuICAgIDkxOiAnTEVGVF9XSU5ET1dfS0VZJyxcbiAgICA5MjogJ1JJR0hUX1dJTkRPV19LRVknLFxuICAgIDkzOiAnU0VMRUNUX0tFWScsXG4gICAgOTY6ICdOVU1fUEFEXzAnLFxuICAgIDk3OiAnTlVNX1BBRF8xJyxcbiAgICA5ODogJ05VTV9QQURfMicsXG4gICAgOTk6ICdOVU1fUEFEXzMnLFxuICAgIDEwMDogJ05VTV9QQURfNCcsXG4gICAgMTAxOiAnTlVNX1BBRF81JyxcbiAgICAxMDI6ICdOVU1fUEFEXzYnLFxuICAgIDEwMzogJ05VTV9QQURfNycsXG4gICAgMTA0OiAnTlVNX1BBRF84JyxcbiAgICAxMDU6ICdOVU1fUEFEXzknLFxuICAgIDEwNjogJ05VTV9QQURfQVNURVJJU0snLFxuICAgIDEwNzogJ05VTV9QQURfUExVUycsXG4gICAgMTA5OiAnTlVNX1BBRF9NSU5VUycsXG4gICAgMTExOiAnTlVNX1BBRF9GT1dBUkRfU0xBU0gnLFxuICAgIDExMjogJ0YxJyxcbiAgICAxMTM6ICdGMicsXG4gICAgMTE0OiAnRjMnLFxuICAgIDExNTogJ0Y0JyxcbiAgICAxMTY6ICdGNScsXG4gICAgMTE3OiAnRjYnLFxuICAgIDExODogJ0Y3JyxcbiAgICAxMTk6ICdGOCcsXG4gICAgMTIwOiAnRjknLFxuICAgIDEyMTogJ0YxMCcsXG4gICAgMTIyOiAnRjExJyxcbiAgICAxMjM6ICdGMTInLFxuICAgIDE0NDogJ05VTV9MT0NLJyxcbiAgICAxNDU6ICdTQ1JPTExfTE9DSycsXG4gICAgMTg2OiBbJzsnLCc6J10sXG4gICAgMTg3OiBbJz0nLCcrJ10sXG4gICAgMTg4OiBbJywnLCc8J10sXG4gICAgMTg5OiBbJy0nLCdfJ10sXG4gICAgMTkwOiBbJy4nLCc+J10sXG4gICAgMTkxOiBbJy8nLCc/J10sXG4gICAgMTkyOiBbJ2AnLCd+J10sXG4gICAgMjE5OiBbJ1snLCd7J10sXG4gICAgMjIwOiBbJ1xcXFwnLCd8J10sXG4gICAgMjIxOiBbJ10nLCd9J10sXG4gICAgMjIyOiBbJ1xcJycsJ1wiJ11cbn07XG4iXX0=
