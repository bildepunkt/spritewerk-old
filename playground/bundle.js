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
 * @requires    CanvasTransform
 *
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera
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
         * @return {Object} The context xform object
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
            this._xform.save();
            this._xform.translate(-this._camera.getX(), -this._camera.getY());

            entity.render(this._context, this._xform);

            this._xform.restore();
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
         * Renders all children recursively on top of own transformation stack
         *
         * @method Group#render
         * @param  {[type]} context [description]
         * @return {[type]}         [description]
         */

    }, {
        key: 'render',
        value: function render(context, xform) {
            xform.save();
            context.save();

            xform.translate(this._x, this._y);
            xform.scale(this._scaleX, this._scaleY);

            context.globalAlpha *= this._opacity;
            context.globalCompositeOperation = this._composite;

            this.each(function (item) {
                item.render(context, xform);
            }, this);

            context.restore();
            xform.restore();
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
        key: 'render',
        value: function render(context, xform) {
            xform.save();
            context.save();

            xform.translate(this._x, this._y);

            context.fillStyle = this._fill;
            context.fillRect(0, 0, this._width, this._height);

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(0, 0, this._width, this._height);
            }

            context.restore();
            xform.restore();
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
        maxX: this._x + this._width,
        maxY: this._y + this._height,
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

            this.onTick(delta, this._ticks);

            // create and fire tick events
            var tickEvent = new CustomEvent('tick', {
                detail: {
                    delta: delta,
                    ticks: this._ticks
                }
            });

            document.dispatchEvent(tickEvent);

            requestAnimationFrame(this._update);
        }

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
 *              Basically a fork from Simon Sarris - www.simonsarris.com - sarris@acm.org
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9Db2xsZWN0aW9uLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvR3JvdXAuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvUmVjdGFuZ2xlLmpzIiwic3JjL1Nwcml0ZS5qcyIsInNyYy9TdGFnZS5qcyIsInNyYy9UaWNrZXIuanMiLCJzcmMvbGliL0NhbnZhc1RyYW5zZm9ybS5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBLElBQUksU0FBUyxzQkFBVDtBQUNKLElBQUksUUFBUSxvQkFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUM1QixhQUFTLE1BQVQ7QUFDQSxVQUFNLElBQU47Q0FGUSxDQUFSO0FBSUosSUFBSSxPQUFPLG1CQUFTLE1BQU0sU0FBTixFQUFULEVBQTRCLE1BQTVCLENBQVA7QUFDSixJQUFJLFFBQVEsb0JBQVUsTUFBTSxTQUFOLEVBQVYsQ0FBUjtBQUNKLElBQUksU0FBUyxzQkFBVDs7QUFFSixJQUFJLFNBQVMsb0JBQVUsRUFBVixFQUFjLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsQ0FBc0MsR0FBdEMsQ0FBVDtBQUNKLElBQUksU0FBUyxvQkFBVSxDQUFWLEVBQWEsRUFBYixDQUFUO0FBQ0osSUFBSSxPQUFPLHlCQUFQOztBQUVKLE9BQU8sT0FBUCxDQUFlLElBQWYsRUFBcUIsTUFBckI7QUFDQSxPQUFPLE9BQVAsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCOztBQUVBLE9BQU8sTUFBUCxHQUFnQixVQUFVLE1BQVYsRUFBa0I7QUFDOUIsU0FBSyxLQUFMLENBQVcsTUFBWCxFQUQ4Qjs7QUFHOUIsU0FBSyxNQUFMLENBQVksTUFBWixFQUg4QjtDQUFsQjs7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QUksS0FBSjtBQUNBLFFBQUksTUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksVUFBSjtBQUNBLFFBQUksYUFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksUUFBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxHQUFKO0FBQ0EsUUFBSSxpQkFBSjtBQUNBLFFBQUksa0JBQUo7QUFDQSxRQUFJLFlBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxRQUFJLFdBQUo7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsU0FBSyxzQkFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssSUFBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssS0FBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLElBQUQsRUFBTSxHQUFOLENBQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbWVyYSBmcm9tICcuL3NyYy9DYW1lcmEnO1xuaW1wb3J0IERyYXcgZnJvbSAnLi9zcmMvRHJhdyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9zcmMvSW5wdXQnO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3JjL1N0YWdlJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9zcmMvUmVjdGFuZ2xlJztcbmltcG9ydCBHcm91cCBmcm9tICcuL3NyYy9Hcm91cCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbmxldCBjYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5sZXQgc3RhZ2UgPSBuZXcgU3RhZ2UoODAwLCA2MDAsIHtcbiAgICBiZ0NvbG9yOiAnIzIyMicsXG4gICAgZmlsbDogdHJ1ZVxufSk7XG5sZXQgZHJhdyA9IG5ldyBEcmF3KHN0YWdlLmdldENhbnZhcygpLCBjYW1lcmEpO1xubGV0IGlucHV0ID0gbmV3IElucHV0KHN0YWdlLmdldENhbnZhcygpKTtcbmxldCB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG5cbmxldCBncm91cEEgPSBuZXcgR3JvdXAoMzIpLnNldFNjYWxlWCgyKS5zZXRPcGFjaXR5KDAuNSk7XG5sZXQgZ3JvdXBCID0gbmV3IEdyb3VwKDAsIDMyKTtcbmxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSgpO1xuXG5ncm91cEIuYWRkSXRlbShyZWN0LCAncmVjdCcpO1xuZ3JvdXBBLmFkZEl0ZW0oZ3JvdXBCLCAnZ3JwJyk7XG5cbnRpY2tlci5vblRpY2sgPSBmdW5jdGlvbiAoZmFjdG9yKSB7XG4gICAgZHJhdy5jbGVhcignI0RERCcpO1xuXG4gICAgZHJhdy5yZW5kZXIoZ3JvdXBBKTtcbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbWVyYVxuICogQGRlc2NyaXB0aW9uIERlY2lkZXMgd2hhdCBnZXRzIHJlbmRlcmVkXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxlY3Rpb25cbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyB0aGUgc29ydGFibGUsIGl0ZXJhYmxlIHN0b3JhZ2Ugb2YgZW50aXRpZXMgdGhhdCBhcmVcbiAqICAgICAgICAgICAgICBnZXR0YWJsZSwgc2V0dGFibGUsIHNvcnRhYmxlLCByZW1vdmFibGUsIGV0Y2VyYShibGUpIGJ5IG5hbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gVGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGl0ZW0geyBuYW1lLCBpdGVtIH0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0UmF3SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goZnVuY3Rpb24oaXRlckl0ZW0sIGksIGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgcmF3IGl0ZW0sIGluZGV4LCBuYW1lLCBhbmQgdGhlXG4gICAgICogbGlzdCBiZWluZyBpdGVyYXRlZCBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jhd0VhY2goZm4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChmbih0aGlzLl9pdGVtc1tpXSwgaSwgdGhpcy5faXRlbXNbaV0ubmFtZSwgdGhpcy5faXRlbXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gd2l0aCBvcHRpb25hbCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtBbnl9ICAgICAgICBpdGVtICAgVGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG5cbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtLCBuYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBtdWx0aXBsZSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5PYmplY3R9IGl0ZW1zIENhbiBiZSB0aGUgb2JqZWN0IGl0c2VsZiBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGFuZCBpdCdzIG5hbWVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZWc6IDxjb2RlPnsgaXRlbTogRW50aXR5LCBuYW1lOiAnZW50aXR5TmFtZScgfTwvY29kZT5cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSBpdGVtLCBpbmRleCwgYW5kIG5hbWUgYXJlIHN1cHBsaWVkXG4gICAgICogdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHRoZSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyBpdGVtcyBhbmQgcmV0dXJuIHRoZSBvbmVzIHRoYXQgbWVldCBjcml0ZXJpYVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVHJ1dGggcHJlZGljYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtLCBpLCBuYW1lKT0+IHtcbiAgICAgICAgICAgIGxldCBwcmVkaWNhdGUgPSBmbihpdGVtLCBpLCBuYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2NvcGUpO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGp1c3QgdGhlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW1BdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbaW5kZXhdLml0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY291bnQgb2YgaXRlbXMgaW4gY29sbGVjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVtJ3MgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtSW5kZXgobmFtZSkge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSBjb2xsZWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBvYmplY3QgYnkgbmFtZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTVy5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBpdGVtIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0obmFtZSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSwgaXRlbXMpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgbmV3IHZhbHVlIHRvIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIG1vZGlmeVxuICAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZSBUaGUgbmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0uaXRlbSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGl0ZW0gdG8gbmV3IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgYmVpbmcgbW92ZWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IFRoZSBpdGVtJ3MgbmV3IGluZGV4XG4gICAgICovXG4gICAgc2V0SXRlbUluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgobmFtZSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLl9nZXRSYXdJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhbnZhc1RyYW5zZm9ybSBmcm9tICcuL2xpYi9DYW52YXNUcmFuc2Zvcm0nO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBEcmF3XG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyByZW5kZXJpbmcgZW50aXRpZXMgb250byB0aGUgY2FudmFzIGVsZW1lbnQuIE1lcmdlcyBjb250ZXh0XG4gKiAgICAgICAgICAgICAgb2JqZWN0IHdpdGggQ2FudmFzVHJhbnNmb3JtIGluc3RhbmNlIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqIEByZXF1aXJlcyAgICBDYW52YXNUcmFuc2Zvcm1cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXMgVGhlIGFjdGl2ZSBjYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtDYW1lcmF9ICAgICAgY2FtZXJhIFRoZSBjYW1lcmFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5feGZvcm0gPSBuZXcgQ2FudmFzVHJhbnNmb3JtKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuXG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMgYW5kIG9wdGlvbmFsbHkgZmlsbHMgd2l0aCBhIGNvbG9yXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjY2xlYXJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjb2xvcl0gSWYgcGFzc2VkLCB3aWxsIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIGNsZWFyKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIERyYXcjZ2V0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIDJEIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCB4Zm9ybSBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNnZXRYZm9ybVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNvbnRleHQgeGZvcm0gb2JqZWN0XG4gICAgICovXG4gICAgZ2V0WGZvcm0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94Zm9ybTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPZmZzZXRzIGNhbnZhcyBiYXNlZCBvbiBjYW1lcmEgYW5kIGNhbGxzIGFuIGVudGl0eSdzIHJlbmRlciBtZXRob2QgcGFzc2luZyB0aGUgY29udGV4dC5cbiAgICAgKiBTYXZlcyBhbmQgcmVzdG9yZXMgY29udGV4dCBhbmQgYmVnaW5uaW5nIGFuZCBlbmQgb2Ygb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZW50aXR5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX3hmb3JtLnNhdmUoKTtcbiAgICAgICAgdGhpcy5feGZvcm0udHJhbnNsYXRlKC10aGlzLl9jYW1lcmEuZ2V0WCgpLCAtdGhpcy5fY2FtZXJhLmdldFkoKSk7XG5cbiAgICAgICAgZW50aXR5LnJlbmRlcih0aGlzLl9jb250ZXh0LCB0aGlzLl94Zm9ybSk7XG5cbiAgICAgICAgdGhpcy5feGZvcm0ucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGV4dCBpbWFnZSBzbW9vdGhpbmdcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL0NvbGxlY3Rpb24nO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIEdyb3VwXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgYSB0cmFuc2Zvcm1hdGlvbiBoaWVyYXJjaHkgZm9yIHtAbGluayBDb2xsZWN0aW9ufXNcbiAqIEBleHRlbmRzICAgICBDb2xsZWN0aW9uXG4gKiBAcmVxdWlyZXMgICAgU3ByaXRlXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwLlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cCBleHRlbmRzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IG9uIHRvcCBvZiBvd24gdHJhbnNmb3JtYXRpb24gc3RhY2tcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjcmVuZGVyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBjb250ZXh0IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihjb250ZXh0LCB4Zm9ybSkge1xuICAgICAgICB4Zm9ybS5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIHhmb3JtLnRyYW5zbGF0ZSh0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgeGZvcm0uc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgKj0gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSB0aGlzLl9jb21wb3NpdGU7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtKT0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVuZGVyKGNvbnRleHQsIHhmb3JtKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHhmb3JtLnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgcm90YXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBrZXljb2RlcyBmcm9tICcuL2xpYi9rZXljb2Rlcyc7XG5cbi8qKlxuICogQGNsYXNzICAgICAgIElucHV0XG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIGhhbmRsaW5nIGtleWJvYXJkLCBtb3VzZSwgYW5kIHRvdWNoIGV2ZW50cyBvbiB0aGUgY2FudmFzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtIVE1MRW50aXR5fSBjYW52YXMgICAgICAgICAgICAgICAgICAgVGhlIGNhbnZhcyBlbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmNhbnZhc0ZpdF0gICAgICAgICBTZXQgdG8gdHJ1ZSBpZiB1c2luZyBjc3MgdG8gZml0IHRoZSBjYW52YXMgaW4gdGhlIHZpZXdwb3J0XG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvck1vdXNlXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JUb3VjaF0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciB0b3VjaCBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yS2V5Ym9hcmRdIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLndpbmRvd10gICAgICAgICAgICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzLmRvY3VtZW50XSAgICAgICAgICBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0cyA9IHt9KSB7XG4gICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jYW52YXNGaXQgPSBvcHRzLmNhbnZhc0ZpdCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JNb3VzZSA9IG9wdHMubGlzdGVuRm9yTW91c2UgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yVG91Y2ggPSBvcHRzLmxpc3RlbkZvclRvdWNoIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCA9IG9wdHMubGlzdGVuRm9yS2V5Ym9hcmQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fdWlFdmVudHMgPSB7XG4gICAgICAgICAgICBEQkxfQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgICAgICAgICBEQkxfVEFQOiAnZGJsdGFwJyxcblxuICAgICAgICAgICAgRFJBRzogJ2RyYWcnLFxuICAgICAgICAgICAgRFJBR19FTkQ6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgIERSQUdfU1RBUlQ6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICBDTElDSzogJ2NsaWNrJyxcbiAgICAgICAgICAgIFRBUDogJ3RhcCcsXG5cbiAgICAgICAgICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIFRPVUNIX1NUQVJUOiAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG5cbiAgICAgICAgICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgVE9VQ0hfTU9WRTogJ3RvdWNobW92ZScsXG5cbiAgICAgICAgICAgIEtFWV9VUDogJ2tleXVwJyxcbiAgICAgICAgICAgIEtFWV9ET1dOOiAna2V5ZG93bidcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBsaXN0ZW5lcnMgdmFsdWVzIGFyZSBhcnJheXMgb2Ygb2JqZWN0cyBjb250YWluaW5nIGhhbmRsZXJzIGFuZCAob3B0aW9uYWwpIHRhcmdldHNcbiAgICAgICAgLy8gZWc6IHRoaXMuX2xpc3RlbmVycy5rZXl1cCA9IFt7XG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgey4uLn0sXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB7IG5hbWU6ICdmb28nLCB4OiAzMiwgeTogNjQsIC4uLn1cbiAgICAgICAgLy8gICAgIH1dO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdWlFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0aGlzLl91aUV2ZW50c1trZXldXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fa2V5Y29kZXMgPSBrZXljb2RlcztcbiAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0ge307XG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvcktleWJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRLZXlib2FyZExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvck1vdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbkZvclRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25UaWNrID0gdGhpcy5fb25UaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aGlzLl9vblRpY2ssIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkS2V5Ym9hcmRMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRLZXlib2FyZExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsna2V5dXAnLCAna2V5ZG93biddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbW91c2UgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRNb3VzZUxpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG91Y2ggbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRUb3VjaExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWyd0YXAnLCAnZGJsdGFwJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHNjYWxlIHJhdGlvIG9mIHRoZSBjYW52YXMgYmFzZWQgb24gd2l0aC9oZWdodCBhdHRycyBhbmQgY3NzIHdpZHRoL2hlaWdodFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfZ2V0U2NhbGVGYWN0b3JcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBfZ2V0U2NhbGVGYWN0b3IoKSB7XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgY2FudmFzV2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCkge1xuICAgICAgICAgICAgY2FudmFzV2lkdGggPSBwYXJzZUludCh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgICAgIGZhY3RvciA9IGNhbnZhc1dpZHRoIC8gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDEwMCAvIGZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcG9pbnQgaXMgaW5zaWRlIHJlY3RhbmdsZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGl0VGVzdFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHggICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHkgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm91bmRpbmdCb3ggW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgX2hpdFRlc3QoeCwgeSwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gYm91bmRpbmdCb3gubWluWCAmJiB4IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcbiAgICAgICAgICAgIHkgPj0gYm91bmRpbmdCb3gubWluWSAmJiB5IDw9IGJvdW5kaW5nQm94Lm1heFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oYW5kbGVLZXlib2FyZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IHRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlS2V5Ym9hcmQoaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGtleU5hbWUgPSB0aGlzLl9rZXljb2Rlc1tpbnB1dEV2ZW50LmtleUNvZGVdO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZSxcbiAgICAgICAgICAgIGtleUNvZGU6IGlucHV0RXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgIGtleU5hbWU6IHR5cGVvZiBrZXlOYW1lID09PSAnb2JqZWN0JyAmJiBrZXlOYW1lLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAga2V5TmFtZVswXSA6XG4gICAgICAgICAgICAgICAga2V5TmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzRG93bltrZXlOYW1lXSA9IGlucHV0RXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX1VQOlxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXlzRG93bltrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmtleXNEb3duID0gdGhpcy5nZXRLZXlzRG93bigpO1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKiBDcmVhdGVzIGV2ZW50IG9iamVjdHMgd2l0aCB4L3kgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2NhbGluZyBhbmQgYWJzWC9hYnNZIGZvclxuICAgICAqIGFic29sdXRlIHgveSByZWdhcmRsZXNzIG9mIHNjYWxlIG9mZnNldFxuICAgICAqIE9ubHkgdXNlcyBmaXJzdCB0b3VjaCBldmVudCwgdGh1cyBub3QgY3VycmVudGx5IHN1cHBvcnRpbmcgbXVsdGktdG91Y2hcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgVGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfaGFuZGxlTW91c2VBbmRUb3VjaChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSB0aGlzLl9jYW52YXNGaXQgPyB0aGlzLl9nZXRTY2FsZUZhY3RvcigpIDogMTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgICAgaWYgKGlucHV0RXZlbnQuaGFzT3duUHJvcGVydHkoJ3RvdWNoZXMnKSkge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC5wYWdlWCAtIHRoaXMuX2NhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgZXZlbnQuYWJzWSA9IGlucHV0RXZlbnQucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29vcmRpbmF0ZSBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gY2FudmFzIHNjYWxpbmdcbiAgICAgICAgZXZlbnQueCA9IE1hdGgucm91bmQoZXZlbnQuYWJzWCAqIHNjYWxlRmFjdG9yKTtcbiAgICAgICAgZXZlbnQueSA9IE1hdGgucm91bmQoZXZlbnQuYWJzWSAqIHNjYWxlRmFjdG9yKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfRE9XTjpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfU1RBUlQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX1VQOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9FTkQ6XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfRU5EXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9NT1ZFOlxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX1NUQVJUXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGR1cGxpY2F0ZSBoYW5kbGVyIGluIHRoZSBsaXN0ZW5lciB0eW9lIGJlaW5nIGFkZGVkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19pc0R1cGxpY2F0ZUhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlciAgVGhlIGhhbmRsZXIgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gICAgaGFuZGxlcnMgVGhlIGhhbmRsZXJzIG9mIHRoZSBsaXN0ZW5lciB0eXBlIGJlaW5nIGFkZGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgbGV0IGR1cCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBoYW5kbGVyT2JqZWN0LmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR1cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbGwgcXVldWVkIGV2ZW50cy4gUGFzc2VzIHRoZSBmYWN0b3IgYW5kIHRpY2tzIGZyb20ge0BsaW5rIFRpY2tlcn1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX29uVGlja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX29uVGljayhlKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIHRoaXMuX3F1ZXVlZEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckhhbmRsZXJzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4ZWN1dGVzIGhhbmRsZXJzIG9mIHRoZSBnaXZlbiBldmVudCdzIHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX3RyaWdnZXJIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJIYW5kbGVycyhldmVudCkge1xuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXSkge1xuXG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0VGVzdCA9IHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kIHx8IHRoaXMuX2hpdFRlc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGl0VGVzdChldmVudC54LCBldmVudC55LFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LnRhcmdldC5nZXRCb3VuZGluZ0FyZWEoKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBoYW5kbGVyT2JqZWN0LnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBldmVudCB3YXMgYm91bmQgd2l0aCBhIHRhcmdldCB0cmlnZ2VyIGhhbmRsZXIgT05MWSBpZiB0YXJnZXQgaGl0XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGhhbmRsZXIgZm9yIGEgY2VydGFpbiBldmVudCB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2FkZExpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgIFRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gZXZlbnQgdHJpZ2dlcmVkXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgIFt0YXJnZXRdIFRoZSB0YXJnZXQgdG8gY2hlY2sgZXZlbnQgdHJpZ2dlciBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhZGRlZCBhbmQgZmFsc2UgaWYgY2FsbGJhY2sgYWxyZWFkeSBleGlzdHNcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJPYmplY3RzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgZHVwO1xuXG5cbiAgICAgICAgaWYgKCEgaGFuZGxlck9iamVjdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlck9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkdXAgPSB0aGlzLl9pc0R1cGxpY2F0ZUhhbmRsZXIoaGFuZGxlciwgaGFuZGxlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkdXApIHtcbiAgICAgICAgICAgIGhhbmRsZXJPYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGhhbmRsZXIsIHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG1hdGNoaW5nIGhhbmRsZXIgaWYgZm91bmRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICByZW1vdmVkIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkIGFuZCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoISBoYW5kbGVycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJPYmplY3QgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUga2V5cyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZFxuICAgICAqIGVnOiA8Y29kZT57IExFRlRfQVJST1c6IDM3LCBVUF9BUlJPVzogMzggfTwvY29kZT5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjZ2V0S2V5c0Rvd25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0S2V5c0Rvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzRG93bjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdXNlciB0byBzZXQgYSBjdXN0b20gaGl0IHRlc3QgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3NldEhpdFRlc3RNZXRob2RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgdXNlcidzIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqL1xuICAgIHNldEhpdFRlc3RNZXRob2QoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQjc2V0SGl0VGVzdE1ldGhvZCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IGZuO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgIFJlY3RhbmdsZVxuICogQGV4dGVuZHMge0BsaW5rIFNwcml0ZX1cbiAqIEBkZXNjICAgIEEgc3ByaXRlIHRoYXQgcmVuZGVycyBhcyBhIHJlY3RhbmdsZVxuICogQGF1dGhvciAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZmlsbCA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQsIHhmb3JtKSB7XG4gICAgICAgIHhmb3JtLnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgeGZvcm0udHJhbnNsYXRlKHRoaXMuX3gsIHRoaXMuX3kpO1xuXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcblxuICAgICAgICBpZiAodGhpcy5fc3Ryb2tlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fc3Ryb2tlO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHhmb3JtLnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0RmlsbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldEZpbGxcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCBUaGUgZmlsbCBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldEZpbGwodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFN0cm9rZSBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgUmVjdGFuZ2xlI3NldFN0cm9rZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBzdHJva2UgY29sb3IgaGV4LCByZ2IsIHJnYmEsIGV0Yy5cbiAgICAgKi9cbiAgICBzZXRTdHJva2UodmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSB2YWw7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3ByaXRlXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBjbGFzcyBmb3IgcG9zaXRpb24gYmFzZWQgb2JqZWN0c1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMFxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeV0gVGhlIGluaXRpYWwgeSBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5fc3JjWCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1kgPSAwO1xuICAgICAgICB0aGlzLl9zcmNXaWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHR5cGUuIENhbiBiZSBzb3VyY2UtYXRvcHxzb3VyY2UtaW58c291cmNlLW91dHxzb3VyY2Utb3ZlcnxkZXN0aW5hdGlvbi1hdG9wfGRlc3RpbmF0aW9uLWlufGRlc3RpbmF0aW9uLW91dHxkZXN0aW5hdGlvbi1vdmVyfGxpZ2h0ZXJ8eG9yfGNvcHlcbiAgICAgICAgICogRGVmYXVsdCBpcyAnc291cmNlLW92ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXIgU3ByaXRlI19jb21wb3NpdGVcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUuZ2V0Q29tcG9zaXRlRGVmYXVsdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tcG9zaXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBib3VuZGluZyBhcmVhXG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdBcmVhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWF4WDogdGhpcy5feCArIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5feSArIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX3gsXG4gICAgICAgICAgICBtaW5ZOiB0aGlzLl95XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Q29tcG9zaXRlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbXBvc2l0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvc2l0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRIZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1hcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFNyY1lcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNyY1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFdpZHRoXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBjb21wb3NpdGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Q29tcG9zaXRlKHZhbCkge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGUgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRIZWlnaHRcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGhlaWdodCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRIZWlnaHQodmFsKSB7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgcm90YXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0Um90YXRpb24odmFsKSB7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVYKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1hcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1ggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNyY1lcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNyY1kgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U3JjWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc3JjWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB3aWR0aCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRXaWR0aCh2YWwpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbi8qKlxuICogQG1lbWJlciBTcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHRcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdCA9ICdzb3VyY2Utb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFN0YWdlXG4gKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbmQgaGFuZGxlcyB0aGUgY2FudmFzIGVsZW1lbnQuIGluY2x1ZGVkIGluIHRoZSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHVzZWQgZm9yIHRlc3RpbmcgYWdhaW5zdFxuICogICAgICAgICAgICAgIGEgdmlydHVhbCBkb20uXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW3dpZHRoXSAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbaGVpZ2h0XSAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0c10gICAgICAgICAgU3RhZ2Ugb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdHMucGFyZW50RWxdIFRoZSBlbGVtZW50IHdpdGggd2hpY2ggdG8gYXR0YWNoIHRoZSBjYW52YXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm9uZSBnaXZlbiB0aGUgYm9keSBpcyB1c2VkLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgW29wdHMuYmdDb2xvcl0gIFRoZSBwYXJlbnQgZWxlbWVudCdzIGJnIGNvbG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy5kb2N1bWVudF0gRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLndpbmRvd10gICBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtCb29sZWFufSAgICAgW29wdHMuZmlsbF0gICAgIFNldCB0byBmYWxzZSB0byBub3QgbWF4aW1hbGx5IGZpbGwgdmlld3BvcnQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyB0cnVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Iod2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2ZpbGwgPSBvcHRzLmZpbGwgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLmZpbGw7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gb3B0cy5wYXJlbnRFbCB8fCB0aGlzLl9kb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRzLmJnQ29sb3I7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlU3RhZ2VFbGVtZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlU3RhZ2VFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5fc3RhZ2UgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fcGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5fc3RhZ2UpO1xuXG4gICAgICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdGhpcy5fdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl92aWRlbyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9zdGFnZS5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIF9yZXNpemVFbGVtZW50IGZvciBzdGFnZSBlbGVtZW50c1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfaGFuZGxlUmVzaXplXG4gICAgICovXG4gICAgX2hhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX3ZpZGVvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIGhvdyB0byBoYW5kbGUgcmVzaXplIGJhc2VkIG9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX3Jlc2l6ZUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gIHtIVE1MRW50aXR5fSBlbCBUaGUgZWxlbWVudCB0byByZXNpemVcbiAgICAgKi9cbiAgICBfcmVzaXplRWxlbWVudChlbCkge1xuICAgICAgICBpZiAodGhpcy5fZmlsbCkge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSBTdGFnZS5maWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGgpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0KX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IFN0YWdlLmNlbnRlcihcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0Q2FudmFzXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpZGVvIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjZ2V0VmlkZW9cbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRWaWRlbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1heGltaXplcyBhbiBlbGVtZW50ICh3aXRoIGFzcGVjdCByYXRpbyBpbnRhY3QpIGluIHRoZSB2aWV3cG9ydCB2aWEgQ1NTLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5maWxsXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgbmV3IHRvcCwgbGVmdCwgd2lkdGgsICYgaGVpZ2h0XG4gICAgICovXG4gICAgc3RhdGljIGZpbGwod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgTEFORFNDQVBFX1JBVElPID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgICAgIGNvbnN0IFBPUlRSQUlUX1JBVElPICA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBJU19MQU5EU0NBUEUgICAgPSBMQU5EU0NBUEVfUkFUSU8gPCBQT1JUUkFJVF9SQVRJTyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBsZXQgd2luTGFuZHNjYXBlUmF0aW8gPSB2aWV3cG9ydEhlaWdodCAvIHZpZXdwb3J0V2lkdGg7XG4gICAgICAgIGxldCB3aW5Qb3J0cmFpdFJhdGlvICA9IHZpZXdwb3J0V2lkdGggLyB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgbGV0IG9mZnNldExlZnQgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wICA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAoSVNfTEFORFNDQVBFKSB7XG4gICAgICAgICAgICBpZiAoTEFORFNDQVBFX1JBVElPIDwgd2luTGFuZHNjYXBlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBPUlRSQUlUX1JBVElPIDwgd2luUG9ydHJhaXRSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRIZWlnaHQgKiBQT1JUUkFJVF9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gKHZpZXdwb3J0V2lkdGggLSBvZmZzZXRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gb2Zmc2V0V2lkdGggKiBMQU5EU0NBUEVfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKHZpZXdwb3J0SGVpZ2h0IC0gb2Zmc2V0SGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyBzdGFnZSBlbGVtZW50IGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZS5jZW50ZXJcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSB0b3AgYW5kIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgY2VudGVyKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAodmlld3BvcnRXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICAgICAgICB0b3A6ICh2aWV3cG9ydEhlaWdodCAtIGhlaWdodCkgLyAyXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgVGlja2VyXG4gKiBAZGVzY3JpcHRpb24gRXhlY3V0ZXMgY2FsbGJhY2sgYmFzZWQgb24gZ2l2ZW4gZnBzIGFuZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzdGFydF0gICAgICAgICBXaGV0aGVyIHRvIHN0YXJ0IG9uIGluc3RhbnRpYXRlLiBEZWZhdWx0IGlzIHRydWVcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHNdICAgICAgICAgIE9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHMud2luZG93XSAgIHdpbmRvdyBvYmplY3QgZm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW29wdHMuZG9jdW1lbnRdIGRvY3VtZW50IG9iamVjdCBmb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0ID0gdHJ1ZSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fdGlja3MgPSAwO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHdoZXRoZXIgb3Igbm90IHRvIGNhbGwge0BsaW5rIFRpY2tlciNvblRpY2t9IGJhc2VkIG9uIHtAbGluayBUaWNrZXIjX2Zwc30uXG4gICAgICogSWYgdGhlIGNvcnJlY3QgYW1vdW50IG9mIHRpbWUgaGFzIHBhc3NlZCB0aGUge0BsaW5rIFRpY2tlciNvblRpY2t9IGNhbGxiYWNrIHdpbGwgZmlyZSBhbmRcbiAgICAgKiB0aGUgPGNvZGU+dGljazwvY29kZT4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIHZpYSB0aGUgPGNvZGU+ZG9jdW1lbnQ8L2NvZGU+IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI191cGRhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IChub3cgLSB0aGlzLl90aGVuKSAvIDEwMDA7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgdGhpcy5fdGlja3MgKz0gMTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50c1xuICAgICAgICBjb25zdCB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgICAgICAgICAgdGlja3M6IHRoaXMuX3RpY2tzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI29uVGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uVGljaygpIHt9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIHRpY2tlclxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjc3RhcnRcbiAgICAgKi9cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1RyYW5zZm9ybVxuICogQGRlc2NyaXB0aW9uIFJldGFpbnMgY2FudmFzIHRyYW5zZm9ybWF0aW9uIHN0YWNrLlxuICogICAgICAgICAgICAgIEJhc2ljYWxseSBhIGZvcmsgZnJvbSBTaW1vbiBTYXJyaXMgLSB3d3cuc2ltb25zYXJyaXMuY29tIC0gc2FycmlzQGFjbS5vcmdcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzVHJhbnNmb3JtIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHQgVGhlIGNhbnZhcycgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMubWF0cml4ID0gWzEsMCwwLDEsMCwwXTsgLy9pbml0aWFsaXplIHdpdGggdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgfVxuXG4gICAgc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgZ2V0TWF0cml4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRyaXg7XG4gICAgfVxuXG4gICAgc2V0TWF0cml4KG0pIHtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbbVswXSxtWzFdLG1bMl0sbVszXSxtWzRdLG1bNV1dO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGNsb25lTWF0cml4KG0pIHtcbiAgICAgICAgcmV0dXJuIFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBTdGFja1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgc2F2ZSgpIHtcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMuY2xvbmVNYXRyaXgodGhpcy5nZXRNYXRyaXgoKSk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChtYXRyaXgpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgfVxuXG4gICAgcmVzdG9yZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hdHJpeChtYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgc2V0VHJhbnNmb3JtKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzBdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzFdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzJdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzNdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzRdLFxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4WzVdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gKz0gdGhpcy5tYXRyaXhbMF0gKiB4ICsgdGhpcy5tYXRyaXhbMl0gKiB5O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSArPSB0aGlzLm1hdHJpeFsxXSAqIHggKyB0aGlzLm1hdHJpeFszXSAqIHk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByb3RhdGUocmFkKSB7XG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgbGV0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBsZXQgbTExID0gdGhpcy5tYXRyaXhbMF0gKiBjICsgdGhpcy5tYXRyaXhbMl0gKiBzO1xuICAgICAgICBsZXQgbTEyID0gdGhpcy5tYXRyaXhbMV0gKiBjICsgdGhpcy5tYXRyaXhbM10gKiBzO1xuICAgICAgICBsZXQgbTIxID0gdGhpcy5tYXRyaXhbMF0gKiAtcyArIHRoaXMubWF0cml4WzJdICogYztcbiAgICAgICAgbGV0IG0yMiA9IHRoaXMubWF0cml4WzFdICogLXMgKyB0aGlzLm1hdHJpeFszXSAqIGM7XG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTExO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTIyO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgc2NhbGUoc3gsIHN5KSB7XG4gICAgICAgIHRoaXMubWF0cml4WzBdICo9IHN4O1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gKj0gc3k7XG4gICAgICAgIHRoaXMubWF0cml4WzNdICo9IHN5O1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNYXRyaXggZXh0ZW5zaW9uc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcm90YXRlRGVncmVlcyhkZWcpIHtcbiAgICAgICAgbGV0IHJhZCA9IGRlZyAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHRoaXMucm90YXRlKHJhZCk7XG4gICAgfVxuXG4gICAgcm90YXRlQWJvdXQocmFkLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB0aGlzLnJvdGF0ZShyYWQpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZURlZ3JlZXNBYm91dChkZWcsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMucm90YXRlRGVncmVlcyhkZWcpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGlkZW50aXR5KCkge1xuICAgICAgICB0aGlzLm0gPSBbMSwwLDAsMSwwLDBdO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIG11bHRpcGx5KG1hdHJpeCkge1xuICAgICAgICBsZXQgbTExID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVswXSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bMV07XG4gICAgICAgIGxldCBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVsxXTtcblxuICAgICAgICBsZXQgbTIxID0gdGhpcy5tYXRyaXhbMF0gKiBtYXRyaXgubVsyXSArIHRoaXMubWF0cml4WzJdICogbWF0cml4Lm1bM107XG4gICAgICAgIGxldCBtMjIgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVszXTtcblxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVs1XSArIHRoaXMubWF0cml4WzRdO1xuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hdHJpeFsxXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tYXRyaXhbM10gKiBtYXRyaXgubVs1XSArIHRoaXMubWF0cml4WzVdO1xuXG4gICAgICAgIHRoaXMubWF0cml4WzBdID0gbTExO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubWF0cml4WzNdID0gbTIyO1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSA9IGR4O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSA9IGR5O1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIGludmVydCgpIHtcbiAgICAgICAgbGV0IGQgPSAxIC8gKHRoaXMubWF0cml4WzBdICogdGhpcy5tYXRyaXhbM10gLSB0aGlzLm1hdHJpeFsxXSAqIHRoaXMubWF0cml4WzJdKTtcbiAgICAgICAgbGV0IG0wID0gdGhpcy5tYXRyaXhbM10gKiBkO1xuICAgICAgICBsZXQgbTEgPSAtdGhpcy5tYXRyaXhbMV0gKiBkO1xuICAgICAgICBsZXQgbTIgPSAtdGhpcy5tYXRyaXhbMl0gKiBkO1xuICAgICAgICBsZXQgbTMgPSB0aGlzLm1hdHJpeFswXSAqIGQ7XG4gICAgICAgIGxldCBtNCA9IGQgKiAodGhpcy5tYXRyaXhbMl0gKiB0aGlzLm1hdHJpeFs1XSAtIHRoaXMubWF0cml4WzNdICogdGhpcy5tYXRyaXhbNF0pO1xuICAgICAgICBsZXQgbTUgPSBkICogKHRoaXMubWF0cml4WzFdICogdGhpcy5tYXRyaXhbNF0gLSB0aGlzLm1hdHJpeFswXSAqIHRoaXMubWF0cml4WzVdKTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMDtcbiAgICAgICAgdGhpcy5tYXRyaXhbMV0gPSBtMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbMl0gPSBtMjtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMztcbiAgICAgICAgdGhpcy5tYXRyaXhbNF0gPSBtNDtcbiAgICAgICAgdGhpcy5tYXRyaXhbNV0gPSBtNTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEhlbHBlcnNcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRyYW5zZm9ybVBvaW50KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHggKiB0aGlzLm1hdHJpeFswXSArIHkgKiB0aGlzLm1hdHJpeFsyXSArIHRoaXMubWF0cml4WzRdLFxuICAgICAgICAgICAgeTogeCAqIHRoaXMubWF0cml4WzFdICsgeSAqIHRoaXMubWF0cml4WzNdICsgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgfTtcbiAgICB9XG59IiwiLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgODogJ0JBQ0tTUEFDRScsXG4gICAgOTogJ1RBQicsXG4gICAgMTM6ICdFTlRFUicsXG4gICAgMTY6ICdTSElGVCcsXG4gICAgMTc6ICdDVFJMJyxcbiAgICAxODogJ0FMVCcsXG4gICAgMTk6ICdQQVVTRV9CUkVBSycsXG4gICAgMjA6ICdDQVBTX0xPQ0snLFxuICAgIDI3OiAnRVNDQVBFJyxcbiAgICAzMzogJ1BBR0VfVVAnLFxuICAgIDM0OiAnUEFHRV9ET1dOJyxcbiAgICAzNTogJ0VORCcsXG4gICAgMzY6ICdIT01FJyxcbiAgICAzNzogJ0xFRlRfQVJST1cnLFxuICAgIDM4OiAnVVBfQVJST1cnLFxuICAgIDM5OiAnUklHSFRfQVJST1cnLFxuICAgIDQwOiAnRE9XTl9BUlJPVycsXG4gICAgNDU6ICdJTlNFUlQnLFxuICAgIDQ2OiAnREVMRVRFJyxcbiAgICA0ODogWzAsJyknXSxcbiAgICA0OTogWzEsJyEnXSxcbiAgICA1MDogWzIsJ0AnXSxcbiAgICA1MTogWzMsJyMnXSxcbiAgICA1MjogWzQsJyQnXSxcbiAgICA1MzogWzUsJyUnXSxcbiAgICA1NDogWzYsJ14nXSxcbiAgICA1NTogWzcsJyYnXSxcbiAgICA1NjogWzgsJyonXSxcbiAgICA1NzogWzksJygnXSxcbiAgICA2NTogJ0EnLFxuICAgIDY2OiAnQicsXG4gICAgNjc6ICdDJyxcbiAgICA2ODogJ0QnLFxuICAgIDY5OiAnRScsXG4gICAgNzA6ICdGJyxcbiAgICA3MTogJ0cnLFxuICAgIDcyOiAnSCcsXG4gICAgNzM6ICdJJyxcbiAgICA3NDogJ0onLFxuICAgIDc1OiAnSycsXG4gICAgNzY6ICdMJyxcbiAgICA3NzogJ00nLFxuICAgIDc4OiAnTicsXG4gICAgNzk6ICdPJyxcbiAgICA4MDogJ1AnLFxuICAgIDgxOiAnUScsXG4gICAgODI6ICdSJyxcbiAgICA4MzogJ1MnLFxuICAgIDg0OiAnVCcsXG4gICAgODU6ICdVJyxcbiAgICA4NjogJ1YnLFxuICAgIDg3OiAnVycsXG4gICAgODg6ICdYJyxcbiAgICA4OTogJ1knLFxuICAgIDkwOiAnWicsXG4gICAgOTE6ICdMRUZUX1dJTkRPV19LRVknLFxuICAgIDkyOiAnUklHSFRfV0lORE9XX0tFWScsXG4gICAgOTM6ICdTRUxFQ1RfS0VZJyxcbiAgICA5NjogJ05VTV9QQURfMCcsXG4gICAgOTc6ICdOVU1fUEFEXzEnLFxuICAgIDk4OiAnTlVNX1BBRF8yJyxcbiAgICA5OTogJ05VTV9QQURfMycsXG4gICAgMTAwOiAnTlVNX1BBRF80JyxcbiAgICAxMDE6ICdOVU1fUEFEXzUnLFxuICAgIDEwMjogJ05VTV9QQURfNicsXG4gICAgMTAzOiAnTlVNX1BBRF83JyxcbiAgICAxMDQ6ICdOVU1fUEFEXzgnLFxuICAgIDEwNTogJ05VTV9QQURfOScsXG4gICAgMTA2OiAnTlVNX1BBRF9BU1RFUklTSycsXG4gICAgMTA3OiAnTlVNX1BBRF9QTFVTJyxcbiAgICAxMDk6ICdOVU1fUEFEX01JTlVTJyxcbiAgICAxMTE6ICdOVU1fUEFEX0ZPV0FSRF9TTEFTSCcsXG4gICAgMTEyOiAnRjEnLFxuICAgIDExMzogJ0YyJyxcbiAgICAxMTQ6ICdGMycsXG4gICAgMTE1OiAnRjQnLFxuICAgIDExNjogJ0Y1JyxcbiAgICAxMTc6ICdGNicsXG4gICAgMTE4OiAnRjcnLFxuICAgIDExOTogJ0Y4JyxcbiAgICAxMjA6ICdGOScsXG4gICAgMTIxOiAnRjEwJyxcbiAgICAxMjI6ICdGMTEnLFxuICAgIDEyMzogJ0YxMicsXG4gICAgMTQ0OiAnTlVNX0xPQ0snLFxuICAgIDE0NTogJ1NDUk9MTF9MT0NLJyxcbiAgICAxODY6IFsnOycsJzonXSxcbiAgICAxODc6IFsnPScsJysnXSxcbiAgICAxODg6IFsnLCcsJzwnXSxcbiAgICAxODk6IFsnLScsJ18nXSxcbiAgICAxOTA6IFsnLicsJz4nXSxcbiAgICAxOTE6IFsnLycsJz8nXSxcbiAgICAxOTI6IFsnYCcsJ34nXSxcbiAgICAyMTk6IFsnWycsJ3snXSxcbiAgICAyMjA6IFsnXFxcXCcsJ3wnXSxcbiAgICAyMjE6IFsnXScsJ30nXSxcbiAgICAyMjI6IFsnXFwnJywnXCInXVxufTtcbiJdfQ==
