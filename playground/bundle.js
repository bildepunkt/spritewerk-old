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

var groupA = new _Group2.default(128, 128).setOpacity(0.4);
var groupB = new _Group2.default(64, 64);
var rect = new _Rectangle2.default(16);
var r = 0;

groupA.addItem(groupB);
groupB.addItem(rect, 'rect');

ticker.onPreTick = function () {
    r += 2;
    groupB.setRotation(r);
    rect.setRotation(-r * 8);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Xform = function () {
    function Xform() {
        _classCallCheck(this, Xform);

        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }

    _createClass(Xform, [{
        key: 'translate',
        value: function translate(x, y) {
            this.x += x;
            this.y += y;
        }
    }, {
        key: 'scale',
        value: function scale(scaleX, scaleY) {
            this.scaleX *= scaleX;
            this.scaleY *= scaleY;
        }
    }, {
        key: 'rotateAbout',
        value: function rotateAbout(deg, cx, cy) {
            var rad = deg * Math.PI / 180;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            var x = (this.x - cx) * cos - (this.y - cy) * sin;
            var y = (this.x - cx) * sin + (this.y - cy) * cos;

            this.x = x + cx;
            this.y = y + cy;
        }
    }]);

    return Xform;
}();

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
            var xform = new Xform();

            xform.translate(-this._camera.getX(), -this._camera.getY());

            entity.update(xform);
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
            xform.scale(this._scaleX, this._scaleY);
            xform.translate(this._x, this._y);

            this.each(function (item) {
                xform.rotateAbout(item.getRotation(), xform.x - item.getX(), xform.y - item.getY());
                item.update(xform);
            }, this);
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

},{"./lib/keycodes":11}],7:[function(require,module,exports){
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
            this._globalScaleX = xform.scaleX;
            this._globalScaleY = xform.scaleY;
            this._globalX = xform.x;
            this._globalY = xform.y;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9SZWN0YW5nbGUuanMiLCJzcmMvU3ByaXRlLmpzIiwic3JjL1N0YWdlLmpzIiwic3JjL1RpY2tlci5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBLElBQUksU0FBUyxzQkFBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUM1QixhQUFTLE1BQVQ7QUFDQSxVQUFNLElBQU47Q0FGUSxDQUFSO0FBSUosSUFBSSxTQUFTLHFCQUFXLE1BQU0sU0FBTixFQUFYLEVBQThCLE1BQTlCLENBQVQ7QUFDSixJQUFJLFFBQVEsb0JBQVUsTUFBTSxTQUFOLEVBQVYsQ0FBUjtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixJQUFJLFNBQVMsb0JBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsVUFBcEIsQ0FBK0IsR0FBL0IsQ0FBVDtBQUNKLElBQUksU0FBUyxvQkFBVSxFQUFWLEVBQWMsRUFBZCxDQUFUO0FBQ0osSUFBSSxPQUFPLHdCQUFjLEVBQWQsQ0FBUDtBQUNKLElBQUksSUFBSSxDQUFKOztBQUVKLE9BQU8sT0FBUCxDQUFlLE1BQWY7QUFDQSxPQUFPLE9BQVAsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCOztBQUVBLE9BQU8sU0FBUCxHQUFtQixZQUFZO0FBQzNCLFNBQUssQ0FBTCxDQUQyQjtBQUUzQixXQUFPLFdBQVAsQ0FBbUIsQ0FBbkIsRUFGMkI7QUFHM0IsU0FBSyxXQUFMLENBQWlCLENBQUMsQ0FBRCxHQUFHLENBQUgsQ0FBakIs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SjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksR0FBSjtBQUNBLFFBQUksaUJBQUo7QUFDQSxRQUFJLGtCQUFKO0FBQ0EsUUFBSSxZQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsUUFBSSxXQUFKO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssZUFBTDtBQUNBLFNBQUssc0JBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLEtBQUw7QUFDQSxTQUFLLFVBQUw7QUFDQSxTQUFLLGFBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxJQUFELEVBQU0sR0FBTixDQUFMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBDYW52YXMgZnJvbSAnLi9zcmMvQ2FudmFzJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL3NyYy9JbnB1dCc7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zcmMvU3RhZ2UnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuL3NyYy9SZWN0YW5nbGUnO1xuaW1wb3J0IEdyb3VwIGZyb20gJy4vc3JjL0dyb3VwJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi9zcmMvVGlja2VyJztcblxubGV0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcbmxldCBzdGFnZSA9IG5ldyBTdGFnZSg4MDAsIDYwMCwge1xuICAgIGJnQ29sb3I6ICcjMjIyJyxcbiAgICBmaWxsOiB0cnVlXG59KTtcbmxldCBjYW52YXMgPSBuZXcgQ2FudmFzKHN0YWdlLmdldENhbnZhcygpLCBjYW1lcmEpO1xubGV0IGlucHV0ID0gbmV3IElucHV0KHN0YWdlLmdldENhbnZhcygpKTtcbmxldCB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG5cbmxldCBncm91cEEgPSBuZXcgR3JvdXAoMTI4LCAxMjgpLnNldE9wYWNpdHkoMC40KTtcbmxldCBncm91cEIgPSBuZXcgR3JvdXAoNjQsIDY0KTtcbmxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSgxNik7XG5sZXQgciA9IDA7XG5cbmdyb3VwQS5hZGRJdGVtKGdyb3VwQik7XG5ncm91cEIuYWRkSXRlbShyZWN0LCAncmVjdCcpO1xuXG50aWNrZXIub25QcmVUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHIgKz0gMjtcbiAgICBncm91cEIuc2V0Um90YXRpb24ocik7XG4gICAgcmVjdC5zZXRSb3RhdGlvbigtcio4KTtcbiAgICBjYW52YXMudXBkYXRlKGdyb3VwQSk7XG59O1xuXG50aWNrZXIub25UaWNrID0gZnVuY3Rpb24gKGZhY3Rvcikge1xuICAgIGNhbnZhcy5jbGVhcignI0RERCcpO1xuXG4gICAgY2FudmFzLnJlbmRlcihncm91cEEpO1xufTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbWVyYVxuICogQGRlc2NyaXB0aW9uIERlY2lkZXMgd2hhdCBnZXRzIHJlbmRlcmVkXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImNsYXNzIFhmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5zY2FsZVkgPSAxO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMueCArPSB4O1xuICAgICAgICB0aGlzLnkgKz0geTtcbiAgICB9XG5cbiAgICBzY2FsZShzY2FsZVgsIHNjYWxlWSkge1xuICAgICAgICB0aGlzLnNjYWxlWCAqPSBzY2FsZVg7XG4gICAgICAgIHRoaXMuc2NhbGVZICo9IHNjYWxlWTtcbiAgICB9XG5cbiAgICByb3RhdGVBYm91dChkZWcsIGN4LCBjeSkge1xuICAgICAgICBsZXQgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgbGV0IGNvcyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGxldCBzaW4gPSBNYXRoLnNpbihyYWQpO1xuXG4gICAgICAgIGxldCB4ID0gKHRoaXMueCAtIGN4KSAqIGNvcyAtICh0aGlzLnkgLSBjeSkgKiBzaW47XG4gICAgICAgIGxldCB5ID0gKHRoaXMueCAtIGN4KSAqIHNpbiArICh0aGlzLnkgLSBjeSkgKiBjb3M7XG5cbiAgICAgICAgdGhpcy54ID0geCArIGN4O1xuICAgICAgICB0aGlzLnkgPSB5ICsgY3k7XG4gICAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyAgICAgICBDYW52YXNcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHJlbmRlcmluZyBlbnRpdGllcyBvbnRvIHRoZSBjYW52YXMgZWxlbWVudC4gTWVyZ2VzIGNvbnRleHRcbiAqICAgICAgICAgICAgICBvYmplY3Qgd2l0aCBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICogQHJlcXVpcmVzICAgIHtAbGluayBDYW52YXNUcmFuc2Zvcm19XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzIFRoZSBhY3RpdmUgY2FudmFzIGVsZW1lbnRcbiAqIEBwYXJhbSB7Q2FtZXJhfSAgICAgIGNhbWVyYSBUaGUgY2FtZXJhIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZW50aXJlIGNhbnZhcyBhbmQgb3B0aW9uYWxseSBmaWxscyB3aXRoIGEgY29sb3JcbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI2NsZWFyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY29sb3JdIElmIHBhc3NlZCwgd2lsbCBmaWxsIHRoZSBjYW52YXMgd2l0aCB0aGUgY29sb3IgdmFsdWVcbiAgICAgKi9cbiAgICBjbGVhcihjb2xvcikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIDJEIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2Zmc2V0cyBjYW52YXMgYmFzZWQgb24gY2FtZXJhIGFuZCBjYWxscyBhbiBlbnRpdHkncyByZW5kZXIgbWV0aG9kIHBhc3NpbmcgdGhlIGNvbnRleHQuXG4gICAgICogU2F2ZXMgYW5kIHJlc3RvcmVzIGNvbnRleHQgYW5kIGJlZ2lubmluZyBhbmQgZW5kIG9mIG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgQ2FudmFzI3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZW50aXR5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGVudGl0eS5yZW5kZXIodGhpcy5fY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb250ZXh0IGltYWdlIHNtb290aGluZ1xuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjc2V0SW1hZ2VTbW9vdGhpbmdcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSB2YWwgVGhlIGltYWdlIHNtb290aGluZyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEltYWdlU21vb3RoaW5nKHZhbCkge1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKGVudGl0eSkge1xuICAgICAgICBsZXQgeGZvcm0gPSBuZXcgWGZvcm0oKTtcblxuICAgICAgICB4Zm9ybS50cmFuc2xhdGUoLXRoaXMuX2NhbWVyYS5nZXRYKCksIC10aGlzLl9jYW1lcmEuZ2V0WSgpKTtcblxuICAgICAgICBlbnRpdHkudXBkYXRlKHhmb3JtKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb2xsZWN0aW9uXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgdGhlIHNvcnRhYmxlLCBpdGVyYWJsZSBzdG9yYWdlIG9mIGVudGl0aWVzIHRoYXQgYXJlXG4gKiAgICAgICAgICAgICAgZ2V0dGFibGUsIHNldHRhYmxlLCBzb3J0YWJsZSwgcmVtb3ZhYmxlLCBldGNlcmEoYmxlKSBieSBuYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IFRoZSBzb3J0ZWQgbGlzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtIHsgbmFtZSwgaXRlbSB9IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFJhd0l0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKGZ1bmN0aW9uKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIHJhdyBpdGVtLCBpbmRleCwgbmFtZSwgYW5kIHRoZVxuICAgICAqIGxpc3QgYmVpbmcgaXRlcmF0ZWQgYXJlIHN1cHBsaWVkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yYXdFYWNoKGZuKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZm4odGhpcy5faXRlbXNbaV0sIGksIHRoaXMuX2l0ZW1zW2ldLm5hbWUsIHRoaXMuX2l0ZW1zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBpdGVtIHdpdGggb3B0aW9uYWwgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7QW55fSAgICAgICAgaXRlbSAgIFRoZSBpdGVtIHRvIGFkZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFtuYW1lXSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbShpdGVtLCBuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgaXRlbSwgbmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbXVsdGlwbGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBpdGVtcyBDYW4gYmUgdGhlIG9iamVjdCBpdHNlbGYgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBhbmQgaXQncyBuYW1lXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGVnOiA8Y29kZT57IGl0ZW06IEVudGl0eSwgbmFtZTogJ2VudGl0eU5hbWUnIH08L2NvZGU+XG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtcyguLi5pdGVtcykge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uaXRlbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdGVtIGhhcyBpdGVtL25hbWUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0uaXRlbSwgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGNvbnZlbmllbmNlIGFsbG93IHVzZXIgdG8gYWRkIGp1c3QgaXRlbVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgaXRlbSwgaW5kZXgsIGFuZCBuYW1lIGFyZSBzdXBwbGllZFxuICAgICAqIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gICAgICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB0aGUgaXRlcmFibGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZWFjaChmbiwgc2NvcGUpIHtcbiAgICAgICAgZm4gPSBzY29wZSA/IGZuLmJpbmQoc2NvcGUpIDogZm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBpZiAoZm4oaXRlbS5pdGVtLCBpLCBpdGVtLm5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZXMgaXRlbXMgYW5kIHJldHVybiB0aGUgb25lcyB0aGF0IG1lZXQgY3JpdGVyaWFcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRydXRoIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZmlsdGVyKGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSwgaSwgbmFtZSk9PiB7XG4gICAgICAgICAgICBsZXQgcHJlZGljYXRlID0gZm4oaXRlbSwgaSwgbmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNjb3BlKTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBqdXN0IHRoZSBpdGVtc1xuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SXRlbUFycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubWFwKChpdGVtKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLml0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBuYW1lLCBvciB1bmRlZmluZWQgaWYgdGhlIG5hbWUgaXMgbm90IGZvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBpbmRleFxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2luZGV4XS5pdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvdW50IG9mIGl0ZW1zIGluIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlbSdzIGN1cnJlbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUluZGV4KG5hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gY29sbGVjdGlvblxuICAgICAqL1xuICAgIHJlbW92ZUFsbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gb2JqZWN0IGJ5IG5hbWVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU1cuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgaXRlbSByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKG5hbWUpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUsIGl0ZW1zKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIG5ldyB2YWx1ZSB0byBhbiBleGlzdGluZyBpdGVtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBtb2RpZnlcbiAgICAgKiBAcGFyYW0ge0FueX0gICAgdmFsdWUgVGhlIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEl0ZW0obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtLml0ZW0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBpdGVtIHRvIG5ldyBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IGJlaW5nIG1vdmVkXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBUaGUgaXRlbSdzIG5ldyBpbmRleFxuICAgICAqL1xuICAgIHNldEl0ZW1JbmRleChuYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG5hbWUpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtID0gdGhpcy5fZ2V0UmF3SXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbic7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgR3JvdXBcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBhIHRyYW5zZm9ybWF0aW9uIGhpZXJhcmNoeSBmb3Ige0BsaW5rIENvbGxlY3Rpb259c1xuICogQGV4dGVuZHMgICAgIENvbGxlY3Rpb25cbiAqIEByZXF1aXJlcyAgICBTcHJpdGVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSBUaGUgaW5pdGlhbCB4IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCN1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtDYW52YXNUcmFuc2Zvcm19IHhmb3JtIFRoZSBDYW52YXNUcmFuc2Zvcm0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGUoeGZvcm0pIHtcbiAgICAgICAgeGZvcm0uc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuICAgICAgICB4Zm9ybS50cmFuc2xhdGUodGhpcy5feCwgdGhpcy5feSk7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIHhmb3JtLnJvdGF0ZUFib3V0KGl0ZW0uZ2V0Um90YXRpb24oKSwgeGZvcm0ueC1pdGVtLmdldFgoKSwgeGZvcm0ueS1pdGVtLmdldFkoKSk7XG4gICAgICAgICAgICBpdGVtLnVwZGF0ZSh4Zm9ybSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IG9uIHRvcCBvZiBvd24gdHJhbnNmb3JtYXRpb24gc3RhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb250ZXh0IFRoZSAyZCBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgKj0gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSB0aGlzLl9jb21wb3NpdGU7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVuZGVyKGNvbnRleHQpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgcm90YXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgICBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0cyA9IHt9KSB7XG4gICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW52YXNGaXQgPSBvcHRzLmNhbnZhc0ZpdCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JNb3VzZSA9IG9wdHMubGlzdGVuRm9yTW91c2UgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yVG91Y2ggPSBvcHRzLmxpc3RlbkZvclRvdWNoIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCA9IG9wdHMubGlzdGVuRm9yS2V5Ym9hcmQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvcktleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvck1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvclRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25UaWNrID0gdGhpcy5fb25UaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aGlzLl9vblRpY2ssIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkS2V5Ym9hcmRMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsna2V5dXAnLCAna2V5ZG93biddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbW91c2UgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRNb3VzZUxpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG91Y2ggbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRUb3VjaExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHNjYWxlIHJhdGlvIG9mIHRoZSBjYW52YXMgYmFzZWQgb24gd2l0aC9oZWdodCBhdHRycyBhbmQgY3NzIHdpZHRoL2hlaWdodFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfZ2V0U2NhbGVGYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBfZ2V0U2NhbGVGYWN0b3IoKSB7XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgY2FudmFzV2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCkge1xuICAgICAgICAgICAgY2FudmFzV2lkdGggPSBwYXJzZUludCh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgICAgIGZhY3RvciA9IGNhbnZhc1dpZHRoIC8gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDEwMCAvIGZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcG9pbnQgaXMgaW5zaWRlIHJlY3RhbmdsZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGl0VGVzdFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm91bmRpbmdCb3ggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiA8Y29kZT57IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfTwvY29kZT5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjZ2V0S2V5c0Rvd25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0S2V5c0Rvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzRG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdXNlciB0byBzZXQgYSBjdXN0b20gaGl0IHRlc3QgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEhpdFRlc3RNZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgdXNlcidzIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqL1xuICAgIHNldEhpdFRlc3RNZXRob2QoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQjc2V0SGl0VGVzdE1ldGhvZCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IGZuO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFJlY3RhbmdsZVxuICogQGV4dGVuZHMge0BsaW5rIFNwcml0ZX1cbiAqIEBkZXNjICAgIEEgc3ByaXRlIHRoYXQgcmVuZGVycyBhcyBhIHJlY3RhbmdsZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgIHRoaXMuX2dldEFjdHVhbFgoKSwgdGhpcy5fZ2V0QWN0dWFsWSgpLFxuICAgICAgICAgICAgdGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCksXG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2UpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0QWN0dWFsWCgpLCB0aGlzLl9nZXRBY3R1YWxZKCksXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCksXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVZKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IHRoaXMuX3g7XG4gICAgICAgIHRoaXMuX2dsb2JhbFkgPSB0aGlzLl95O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX3NyY0hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU2NhbGVYID0gdGhpcy5fc2NhbGVYO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVkgPSB0aGlzLl9zY2FsZVk7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvbWJpbmVkIGxvY2FsIGFuZCBnbG9iYWwgc2NhbGVYXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNfZ2V0QWN0dWFsU2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsU2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYICogdGhpcy5fZ2xvYmFsU2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCBzY2FsZVlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVkgKiB0aGlzLl9nbG9iYWxTY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHhcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKyB0aGlzLl9nbG9iYWxYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCB5XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNfZ2V0QWN0dWFsWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgX2dldEFjdHVhbFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95ICsgdGhpcy5fZ2xvYmFsWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5fZ2V0QWN0dWFsWCgpICsgKHRoaXMuX3dpZHRoICAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWCgpKSxcbiAgICAgICAgICAgIG1heFk6IHRoaXMuX2dldEFjdHVhbFkoKSArICh0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKSksXG4gICAgICAgICAgICBtaW5YOiB0aGlzLl9nZXRBY3R1YWxYKCksXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl9nZXRBY3R1YWxZKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRDb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tcG9zaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9zaXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldEhlaWdodFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0V2lkdGhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGNvbXBvc2l0ZSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldEhlaWdodFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgaGVpZ2h0IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldEhlaWdodCh2YWwpIHtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4Zm9ybSkge1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVggPSB4Zm9ybS5zY2FsZVg7XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWSA9IHhmb3JtLnNjYWxlWTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWCA9IHhmb3JtLng7XG4gICAgICAgIHRoaXMuX2dsb2JhbFkgPSB4Zm9ybS55O1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbWVtYmVyIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdFxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0ID0gJ3NvdXJjZS1vdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3RhZ2VcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgZWxlbWVudC4gaW5jbHVkZWQgaW4gdGhlIG9wdGlvbnNcbiAqICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgZGVwZW5kZW5jeSBpbmplY3Rpb24gdXNlZCBmb3IgdGVzdGluZyBhZ2FpbnN0XG4gKiAgICAgICAgICAgICAgYSB2aXJ0dWFsIGRvbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbd2lkdGhdICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFtoZWlnaHRdICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub25lIGdpdmVuIHRoZSBib2R5IGlzIHVzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICBbb3B0cy5iZ0NvbG9yXSAgVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBbb3B0cy5maWxsXSAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuYmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTdGFnZUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVTdGFnZUVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLl9zdGFnZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX3ZpZGVvKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgX3Jlc2l6ZUVsZW1lbnQgZm9yIHN0YWdlIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19oYW5kbGVSZXNpemVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fdmlkZW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfcmVzaXplRWxlbWVudFxuICAgICAqIEBwYXJhbSAge0hUTUxFbnRpdHl9IGVsIFRoZSBlbGVtZW50IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIF9yZXNpemVFbGVtZW50KGVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gU3RhZ2UuY2VudGVyKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRDYW52YXNcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRWaWRlb1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWF4aW1pemVzIGFuIGVsZW1lbnQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0IHZpYSBDU1MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmZpbGxcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZmlsbCh3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHZpZXdwb3J0SGVpZ2h0IC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gdmlld3BvcnRXaWR0aCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtlZXBzIHN0YWdlIGVsZW1lbnQgY2VudGVyZWQgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmNlbnRlclxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIHRvcCBhbmQgbGVmdFxuICAgICAqL1xuICAgIHN0YXRpYyBjZW50ZXIod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6ICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgICAgICAgIHRvcDogKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0YXJ0XSAgICAgICAgIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0c10gICAgICAgICAgT3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy53aW5kb3ddICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy5kb2N1bWVudF0gZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQgPSB0cnVlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24ge0BsaW5rIFRpY2tlciNfZnBzfS5cbiAgICAgKiBJZiB0aGUgY29ycmVjdCBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIHRoZSB7QGxpbmsgVGlja2VyI29uVGlja30gY2FsbGJhY2sgd2lsbCBmaXJlIGFuZFxuICAgICAqIHRoZSA8Y29kZT50aWNrPC9jb2RlPiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSA8Y29kZT5kb2N1bWVudDwvY29kZT4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKG5vdyAtIHRoaXMuX3RoZW4pIC8gMTAwMDtcblxuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB0aGlzLl90aWNrcyArPSAxO1xuXG4gICAgICAgIGNvbnN0IGV2dE9iamVjdCA9IHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICB0aWNrczogdGhpcy5fdGlja3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjcmVhdGUgYW5kIGZpcmUgdGljayBldmVudHMgYW5kIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAgICAgIGxldCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3ByZXRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLm9uUHJlVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblRpY2soZGVsdGEsIHRoaXMuX3RpY2tzKTtcbiAgICAgICAgdGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Qb3N0VGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3R0aWNrJywgZXZ0T2JqZWN0KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcHJlIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUHJlVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUHJlVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHBvc3QgdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uUG9zdFRpY2tcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRlbHRhIFRoZSB0aW1lIGVsYXBzZWQgYmV0d2VlbiB0aWNrcy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGx5IGFnYWluc3QgZ2FtZXBsYXkgZWxlbWVudHMgZm9yIGNvbnNpc3RlbnRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGlja3MgVGhlIGFtb3VudCBvZiB0aWNrcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWRcbiAgICAgKi9cbiAgICBvblBvc3RUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiJdfQ==
