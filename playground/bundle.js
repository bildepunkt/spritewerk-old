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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Camera
 * @description Decides what gets rendered
 * @author      Chris Peters
 */

var Camera = (function () {
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
})();

exports.default = Camera;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Collection
 * @description Provides the sortable, iterable storage of entities that are
 *              gettable, settable, sortable, removable, etcera(ble) by name
 * @author      Chris Peters
 */

var Collection = (function () {
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
})();

exports.default = Collection;

},{}],4:[function(require,module,exports){
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
 * @param {Camera}      camera The camera
 */

var Draw = (function () {
    function Draw(canvas, camera) {
        _classCallCheck(this, Draw);

        this._canvas = canvas;
        this._camera = camera;
        this._originalContext = this._canvas.getContext('2d');
        this._canvasXform = new _CanvasTransform2.default(this._originalContext);
        this._imageSmoothingEnabled = true;

        this._context = this._originalContext;

        for (var method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }

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
            this._context.translate(-this._camera.getX(), -this._camera.getY());

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
    }]);

    return Draw;
})();

exports.default = Draw;

},{"./lib/CanvasTransform":11}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var Group = (function (_Collection) {
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
        value: function render(context) {
            context.save();

            context.translate(this._x, this._y);
            context.scale(this._scaleX, this._scaleY);
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
})(_Collection3.default);

exports.default = Group;

},{"./Collection":3,"./Sprite":8}],6:[function(require,module,exports){
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
 * @param {Object}     [opts.window]            window object for testing
 * @param {Object}     [opts.document]          document object for testing
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
})();

exports.default = Input;

},{"./lib/keycodes":12}],7:[function(require,module,exports){
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
            context.save();
            context.fillStyle = this._fill;
            context.fillRect(this._x, this._y, this._width, this._height);

            if (this._stroke) {
                context.strokeStyle = this._stroke;
                context.strokeRect(this._x, this._y, this._width, this._height);
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
})(_Sprite3.default);

exports.default = Rectangle;

},{"./Sprite":8}],8:[function(require,module,exports){
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
})();

/**
 * @member Sprite._compositeDefault
 * @type {String}
 */

Sprite._compositeDefault = 'source-over';

exports.default = Sprite;

},{}],9:[function(require,module,exports){
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
})();

exports.default = Stage;

},{}],10:[function(require,module,exports){
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
 * @param {Boolean} [start]         Whether to start on instantiate. Default is true
 * @param {Object}  [opts]          Options
 * @param {Object}  [opts.window]   window object for testing
 * @param {Object}  [opts.document] document object for testing
 */

var Ticker = (function () {
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
})();

exports.default = Ticker;

},{}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9Db2xsZWN0aW9uLmpzIiwic3JjL0RyYXcuanMiLCJzcmMvR3JvdXAuanMiLCJzcmMvSW5wdXQuanMiLCJzcmMvUmVjdGFuZ2xlLmpzIiwic3JjL1Nwcml0ZS5qcyIsInNyYy9TdGFnZS5qcyIsInNyYy9UaWNrZXIuanMiLCJzcmMvbGliL0NhbnZhc1RyYW5zZm9ybS5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7QUFDMUIsSUFBSSxLQUFLLEdBQUcsb0JBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM1QixXQUFPLEVBQUUsTUFBTTtBQUNmLFFBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxJQUFJLEdBQUcsbUJBQVMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLElBQUksS0FBSyxHQUFHLG9CQUFVLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLElBQUksTUFBTSxHQUFHLHNCQUFZLENBQUM7O0FBRTFCLElBQUksTUFBTSxHQUFHLG9CQUFVLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsSUFBSSxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLElBQUksSUFBSSxHQUFHLHlCQUFlLENBQUM7O0FBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMs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QUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RixnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0RixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7aUNBRVE7QUFDTCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDO0FBQ2hGLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixnQkFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixnQkFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENB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RSxrQkFBa0I7QUFDdkIsT0FBRyxFQUFFLGNBQWM7QUFDbkIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsT0FBRyxFQUFFLHNCQUFzQjtBQUMzQixPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxJQUFJO0FBQ1QsT0FBRyxFQUFFLElBQUk7QUFDVCxPQUFHLEVBQUUsS0FBSztBQUNWLE9BQUcsRUFBRSxLQUFLO0FBQ1YsT0FBRyxFQUFFLEtBQUs7QUFDVixPQUFHLEVBQUUsVUFBVTtBQUNmLE9BQUcsRUFBRSxhQUFhO0FBQ2xCLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNkLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2QsT0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQztBQUNmLE9BQUcsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDZCxPQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO0NBQ2xCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDYW1lcmEgZnJvbSAnLi9zcmMvQ2FtZXJhJztcbmltcG9ydCBEcmF3IGZyb20gJy4vc3JjL0RyYXcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL0lucHV0JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3NyYy9TdGFnZSc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vc3JjL1JlY3RhbmdsZSc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9zcmMvR3JvdXAnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3NyYy9UaWNrZXInO1xuXG5sZXQgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xubGV0IHN0YWdlID0gbmV3IFN0YWdlKDgwMCwgNjAwLCB7XG4gICAgYmdDb2xvcjogJyMyMjInLFxuICAgIGZpbGw6IHRydWVcbn0pO1xubGV0IGRyYXcgPSBuZXcgRHJhdyhzdGFnZS5nZXRDYW52YXMoKSwgY2FtZXJhKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG5sZXQgZ3JvdXBBID0gbmV3IEdyb3VwKDMyKS5zZXRTY2FsZVgoMikuc2V0T3BhY2l0eSgwLjUpO1xubGV0IGdyb3VwQiA9IG5ldyBHcm91cCgwLCAzMik7XG5sZXQgcmVjdCA9IG5ldyBSZWN0YW5nbGUoKTtcblxuZ3JvdXBCLmFkZEl0ZW0ocmVjdCwgJ3JlY3QnKTtcbmdyb3VwQS5hZGRJdGVtKGdyb3VwQiwgJ2dycCcpO1xuXG50aWNrZXIub25UaWNrID0gZnVuY3Rpb24gKGZhY3Rvcikge1xuICAgIGRyYXcuY2xlYXIoJyNEREQnKTtcblxuICAgIGRyYXcucmVuZGVyKGdyb3VwQSk7XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDYW1lcmFcbiAqIEBkZXNjcmlwdGlvbiBEZWNpZGVzIHdoYXQgZ2V0cyByZW5kZXJlZFxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBDYW1lcmEjc2V0WFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFlcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBDb2xsZWN0aW9uXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgdGhlIHNvcnRhYmxlLCBpdGVyYWJsZSBzdG9yYWdlIG9mIGVudGl0aWVzIHRoYXQgYXJlXG4gKiAgICAgICAgICAgICAgZ2V0dGFibGUsIHNldHRhYmxlLCBzb3J0YWJsZSwgcmVtb3ZhYmxlLCBldGNlcmEoYmxlKSBieSBuYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IFRoZSBzb3J0ZWQgbGlzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtIHsgbmFtZSwgaXRlbSB9IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFJhd0l0ZW0obmFtZSkge1xuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKGZ1bmN0aW9uKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aGUgY29sbGVjdGlvbidzIHNvcnRlZCBpdGVtcy4gVGhlIHJhdyBpdGVtLCBpbmRleCwgbmFtZSwgYW5kIHRoZVxuICAgICAqIGxpc3QgYmVpbmcgaXRlcmF0ZWQgYXJlIHN1cHBsaWVkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yYXdFYWNoKGZuKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZm4odGhpcy5faXRlbXNbaV0sIGksIHRoaXMuX2l0ZW1zW2ldLm5hbWUsIHRoaXMuX2l0ZW1zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBpdGVtIHdpdGggb3B0aW9uYWwgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7QW55fSAgICAgICAgaXRlbSAgIFRoZSBpdGVtIHRvIGFkZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFtuYW1lXSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgYWRkSXRlbShpdGVtLCBuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgaXRlbSwgbmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbXVsdGlwbGUgaXRlbXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBpdGVtcyBDYW4gYmUgdGhlIG9iamVjdCBpdHNlbGYgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBhbmQgaXQncyBuYW1lXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGVnOiA8Y29kZT57IGl0ZW06IEVudGl0eSwgbmFtZTogJ2VudGl0eU5hbWUnIH08L2NvZGU+XG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtcyguLi5pdGVtcykge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uaXRlbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGl0ZW0ubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdGVtIGhhcyBpdGVtL25hbWUgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0uaXRlbSwgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGNvbnZlbmllbmNlIGFsbG93IHVzZXIgdG8gYWRkIGp1c3QgaXRlbVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgaXRlbSwgaW5kZXgsIGFuZCBuYW1lIGFyZSBzdXBwbGllZFxuICAgICAqIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gICAgICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB0aGUgaXRlcmFibGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZWFjaChmbiwgc2NvcGUpIHtcbiAgICAgICAgZm4gPSBzY29wZSA/IGZuLmJpbmQoc2NvcGUpIDogZm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBpZiAoZm4oaXRlbS5pdGVtLCBpLCBpdGVtLm5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZXMgaXRlbXMgYW5kIHJldHVybiB0aGUgb25lcyB0aGF0IG1lZXQgY3JpdGVyaWFcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRydXRoIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICBbc2NvcGVdIFRoZSBzY29wZSB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZmlsdGVyKGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSwgaSwgbmFtZSk9PiB7XG4gICAgICAgICAgICBsZXQgcHJlZGljYXRlID0gZm4oaXRlbSwgaSwgbmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNjb3BlKTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBqdXN0IHRoZSBpdGVtc1xuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SXRlbUFycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubWFwKChpdGVtKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLml0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhpc3RpbmcgaXRlbSBieSBuYW1lLCBvciB1bmRlZmluZWQgaWYgdGhlIG5hbWUgaXMgbm90IGZvdW5kXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtBbnl9XG4gICAgICovXG4gICAgZ2V0SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVySXRlbTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBpbmRleFxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2luZGV4XS5pdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvdW50IG9mIGl0ZW1zIGluIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlbSdzIGN1cnJlbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SXRlbUluZGV4KG5hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gY29sbGVjdGlvblxuICAgICAqL1xuICAgIHJlbW92ZUFsbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gb2JqZWN0IGJ5IG5hbWVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU1cuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgaXRlbSByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKG5hbWUpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUsIGl0ZW1zKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgb2YgbG9vcFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIG5ldyB2YWx1ZSB0byBhbiBleGlzdGluZyBpdGVtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgVGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0byBtb2RpZnlcbiAgICAgKiBAcGFyYW0ge0FueX0gICAgdmFsdWUgVGhlIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIHNldEl0ZW0obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmF3RWFjaCgoaXRlckl0ZW0sIGksIGl0ZXJOYW1lKT0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZXJJdGVtLml0ZW0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBpdGVtIHRvIG5ldyBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IGJlaW5nIG1vdmVkXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCBUaGUgaXRlbSdzIG5ldyBpbmRleFxuICAgICAqL1xuICAgIHNldEl0ZW1JbmRleChuYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG5hbWUpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtID0gdGhpcy5fZ2V0UmF3SXRlbShuYW1lKTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYW52YXNUcmFuc2Zvcm0gZnJvbSAnLi9saWIvQ2FudmFzVHJhbnNmb3JtJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgRHJhd1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LiBNZXJnZXMgY29udGV4dFxuICogICAgICAgICAgICAgIG9iamVjdCB3aXRoIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3IuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVxdWlyZXMgICAgQ2FudmFzVHJhbnNmb3JtXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzIFRoZSBhY3RpdmUgY2FudmFzIGVsZW1lbnRcbiAqIEBwYXJhbSB7Q2FtZXJhfSAgICAgIGNhbWVyYSBUaGUgY2FtZXJhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbENvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY2FudmFzWGZvcm0gPSBuZXcgQ2FudmFzVHJhbnNmb3JtKHRoaXMuX29yaWdpbmFsQ29udGV4dCk7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX29yaWdpbmFsQ29udGV4dDtcblxuICAgICAgICBmb3IgKGxldCBtZXRob2QgaW4gdGhpcy5fY2FudmFzWGZvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbbWV0aG9kXSA9IHRoaXMuX2NhbnZhc1hmb3JtW21ldGhvZF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZW50aXJlIGNhbnZhcyBhbmQgb3B0aW9uYWxseSBmaWxscyB3aXRoIGEgY29sb3JcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNjbGVhclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NvbG9yXSBJZiBwYXNzZWQsIHdpbGwgZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY2xlYXIoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgRHJhdyNnZXRDb250ZXh0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgMkQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPZmZzZXRzIGNhbnZhcyBiYXNlZCBvbiBjYW1lcmEgYW5kIGNhbGxzIGFuIGVudGl0eSdzIHJlbmRlciBtZXRob2QgcGFzc2luZyB0aGUgY29udGV4dC5cbiAgICAgKiBTYXZlcyBhbmQgcmVzdG9yZXMgY29udGV4dCBhbmQgYmVnaW5uaW5nIGFuZCBlbmQgb2Ygb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I3JlbmRlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZW50aXR5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICByZW5kZXIoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fY2FtZXJhLmdldFgoKSwgLXRoaXMuX2NhbWVyYS5nZXRZKCkpO1xuXG4gICAgICAgIGVudGl0eS5yZW5kZXIodGhpcy5fY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb250ZXh0IGltYWdlIHNtb290aGluZ1xuICAgICAqXG4gICAgICogQG1ldGhvZCBEcmF3I3NldEltYWdlU21vb3RoaW5nXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gdmFsIFRoZSBpbWFnZSBzbW9vdGhpbmcgdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJbWFnZVNtb290aGluZyh2YWwpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdmFsO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbic7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgR3JvdXBcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBhIHRyYW5zZm9ybWF0aW9uIGhpZXJhcmNoeSBmb3Ige0BsaW5rIENvbGxlY3Rpb259c1xuICogQGV4dGVuZHMgICAgIENvbGxlY3Rpb25cbiAqIEByZXF1aXJlcyAgICBTcHJpdGVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt4XSBUaGUgaW5pdGlhbCB4IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0Um90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGNvbnRleHQgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUodGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgIGNvbnRleHQuc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhICo9IHRoaXMuX29wYWNpdHk7XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gdGhpcy5fY29tcG9zaXRlO1xuXG4gICAgICAgIHRoaXMuZWFjaCgoaXRlbSk9PiB7XG4gICAgICAgICAgICBpdGVtLnJlbmRlcihjb250ZXh0KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldE9wYWNpdHlcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdmFsIFRoZSBvcGFjaXR5IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0Um90YXRpb24odmFsKSB7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFNjYWxlWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0U2NhbGVZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVkodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0WSh2YWwpIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQga2V5Y29kZXMgZnJvbSAnLi9saWIva2V5Y29kZXMnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBJbnB1dFxuICogQGRlc2NyaXB0aW9uIEEgbW9kdWxlIGZvciBoYW5kbGluZyBrZXlib2FyZCwgbW91c2UsIGFuZCB0b3VjaCBldmVudHMgb24gdGhlIGNhbnZhc1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTEVudGl0eX0gY2FudmFzICAgICAgICAgICAgICAgICAgIFRoZSBjYW52YXMgZWxlbWVudCB0byBpbnRlcmFjdCB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gICAgIFtvcHRzXVxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5jYW52YXNGaXRdICAgICAgICAgU2V0IHRvIHRydWUgaWYgdXNpbmcgY3NzIHRvIGZpdCB0aGUgY2FudmFzIGluIHRoZSB2aWV3cG9ydFxuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JNb3VzZV0gICAgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBtb3VzZSBldmVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yVG91Y2hdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgdG91Y2ggZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvcktleWJvYXJkXSBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIGtleWJvYXJkIGV2ZW50c1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy53aW5kb3ddICAgICAgICAgICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0cy5kb2N1bWVudF0gICAgICAgICAgZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdHMgPSB7fSkge1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY2FudmFzRml0ID0gb3B0cy5jYW52YXNGaXQgfHwgdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yTW91c2UgPSBvcHRzLmxpc3RlbkZvck1vdXNlIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvclRvdWNoID0gb3B0cy5saXN0ZW5Gb3JUb3VjaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQgPSBvcHRzLmxpc3RlbkZvcktleWJvYXJkIHx8IHRydWU7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIHRoaXMuX3VpRXZlbnRzID0ge1xuICAgICAgICAgICAgREJMX0NMSUNLOiAnZGJsY2xpY2snLFxuICAgICAgICAgICAgREJMX1RBUDogJ2RibHRhcCcsXG5cbiAgICAgICAgICAgIERSQUc6ICdkcmFnJyxcbiAgICAgICAgICAgIERSQUdfRU5EOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICBEUkFHX1NUQVJUOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICAgICAgICBUQVA6ICd0YXAnLFxuXG4gICAgICAgICAgICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgICAgICAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgVE9VQ0hfRU5EOiAndG91Y2hlbmQnLFxuXG4gICAgICAgICAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuXG4gICAgICAgICAgICBLRVlfVVA6ICdrZXl1cCcsXG4gICAgICAgICAgICBLRVlfRE9XTjogJ2tleWRvd24nXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbGlzdGVuZXJzIHZhbHVlcyBhcmUgYXJyYXlzIG9mIG9iamVjdHMgY29udGFpbmluZyBoYW5kbGVycyBhbmQgKG9wdGlvbmFsKSB0YXJnZXRzXG4gICAgICAgIC8vIGVnOiB0aGlzLl9saXN0ZW5lcnMua2V5dXAgPSBbe1xuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsuLi59LFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogeyBuYW1lOiAnZm9vJywgeDogMzIsIHk6IDY0LCAuLi59XG4gICAgICAgIC8vICAgICB9XTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3VpRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdGhpcy5fdWlFdmVudHNba2V5XV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleWNvZGVzID0ga2V5Y29kZXM7XG4gICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IHt9O1xuICAgICAgICB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JLZXlib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JNb3VzZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5Gb3JUb3VjaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uVGljayA9IHRoaXMuX29uVGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgdGhpcy5fb25UaWNrLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZEtleWJvYXJkTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkS2V5Ym9hcmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2tleXVwJywgJ2tleWRvd24nXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG1vdXNlIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkTW91c2VMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAnbW91c2Vtb3ZlJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlTW91c2VBbmRUb3VjaC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdWNoIGxpc3RlbmVyc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfYWRkVG91Y2hMaXN0ZW5lcnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IFsndGFwJywgJ2RibHRhcCcsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBzY2FsZSByYXRpbyBvZiB0aGUgY2FudmFzIGJhc2VkIG9uIHdpdGgvaGVnaHQgYXR0cnMgYW5kIGNzcyB3aWR0aC9oZWlnaHRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2dldFNjYWxlRmFjdG9yXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgX2dldFNjYWxlRmFjdG9yKCkge1xuICAgICAgICBsZXQgZmFjdG9yID0gMTtcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gcGFyc2VJbnQodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgICAgICBmYWN0b3IgPSBjYW52YXNXaWR0aCAvIHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxMDAgLyBmYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBvaW50IGlzIGluc2lkZSByZWN0YW5nbGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hpdFRlc3RcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB4ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB5ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvdW5kaW5nQm94IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIF9oaXRUZXN0KHgsIHksIGJvdW5kaW5nQm94KSB7XG4gICAgICAgIHJldHVybiB4ID49IGJvdW5kaW5nQm94Lm1pblggJiYgeCA8PSBib3VuZGluZ0JveC5tYXhYICYmXG4gICAgICAgICAgICB5ID49IGJvdW5kaW5nQm94Lm1pblkgJiYgeSA8PSBib3VuZGluZ0JveC5tYXhZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaGFuZGxlS2V5Ym9hcmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCB0aGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUtleWJvYXJkKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBrZXlOYW1lID0gdGhpcy5fa2V5Y29kZXNbaW5wdXRFdmVudC5rZXlDb2RlXTtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgZG9tRXZlbnQ6IGlucHV0RXZlbnQsXG4gICAgICAgICAgICB0eXBlOiBpbnB1dEV2ZW50LnR5cGUsXG4gICAgICAgICAgICBrZXlDb2RlOiBpbnB1dEV2ZW50LmtleUNvZGUsXG4gICAgICAgICAgICBrZXlOYW1lOiB0eXBlb2Yga2V5TmFtZSA9PT0gJ29iamVjdCcgJiYga2V5TmFtZS5sZW5ndGggP1xuICAgICAgICAgICAgICAgIGtleU5hbWVbMF0gOlxuICAgICAgICAgICAgICAgIGtleU5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuS0VZX0RPV046XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV0gPSBpbnB1dEV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9VUDpcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5c0Rvd25ba2V5TmFtZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5rZXlzRG93biA9IHRoaXMuZ2V0S2V5c0Rvd24oKTtcblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgRE9NIGV2ZW50cy4gQ3JlYXRlcyBjdXN0b20gZXZlbnQgb2JqZWN0IHdpdGggaGVscGZ1bCBwcm9wZXJ0aWVzXG4gICAgICogQ3JlYXRlcyBldmVudCBvYmplY3RzIHdpdGggeC95IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNjYWxpbmcgYW5kIGFic1gvYWJzWSBmb3JcbiAgICAgKiBhYnNvbHV0ZSB4L3kgcmVnYXJkbGVzcyBvZiBzY2FsZSBvZmZzZXRcbiAgICAgKiBPbmx5IHVzZXMgZmlyc3QgdG91Y2ggZXZlbnQsIHRodXMgbm90IGN1cnJlbnRseSBzdXBwb3J0aW5nIG11bHRpLXRvdWNoXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dEV2ZW50IFRoZSBET00gaW5wdXQgZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgX2hhbmRsZU1vdXNlQW5kVG91Y2goaW5wdXRFdmVudCkge1xuICAgICAgICBpbnB1dEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gdGhpcy5fY2FudmFzRml0ID8gdGhpcy5fZ2V0U2NhbGVGYWN0b3IoKSA6IDE7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgIGlmIChpbnB1dEV2ZW50Lmhhc093blByb3BlcnR5KCd0b3VjaGVzJykpIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl9jYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuYWJzWCA9IGlucHV0RXZlbnQucGFnZVggLSB0aGlzLl9jYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGV2ZW50LmFic1kgPSBpbnB1dEV2ZW50LnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvb3JkaW5hdGUgcG9zaXRpb25zIHJlbGF0aXZlIHRvIGNhbnZhcyBzY2FsaW5nXG4gICAgICAgIGV2ZW50LnggPSBNYXRoLnJvdW5kKGV2ZW50LmFic1ggKiBzY2FsZUZhY3Rvcik7XG4gICAgICAgIGV2ZW50LnkgPSBNYXRoLnJvdW5kKGV2ZW50LmFic1kgKiBzY2FsZUZhY3Rvcik7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX0RPV046XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX1NUQVJUOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9VUDpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfRU5EOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuRHJhZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHX0VORFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfTU9WRTpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuVE9VQ0hfTU9WRTpcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19TVEFSVFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBkdXBsaWNhdGUgaGFuZGxlciBpbiB0aGUgbGlzdGVuZXIgdHlvZSBiZWluZyBhZGRlZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfaXNEdXBsaWNhdGVIYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXIgIFRoZSBoYW5kbGVyIHRvIGNoZWNrXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgIGhhbmRsZXJzIFRoZSBoYW5kbGVycyBvZiB0aGUgbGlzdGVuZXIgdHlwZSBiZWluZyBhZGRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgIGxldCBkdXAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBoYW5kbGVyT2JqZWN0IG9mIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gaGFuZGxlck9iamVjdC5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYWxsIHF1ZXVlZCBldmVudHMuIFBhc3NlcyB0aGUgZmFjdG9yIGFuZCB0aWNrcyBmcm9tIHtAbGluayBUaWNrZXJ9XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19vblRpY2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGUgVGhlIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9vblRpY2soZSkge1xuICAgICAgICBmb3IgKGxldCBldmVudCBvZiB0aGlzLl9xdWV1ZWRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJIYW5kbGVycyhldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleGVjdXRlcyBoYW5kbGVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQncyB0eXBlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I190cmlnZ2VySGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmlnZ2VySGFuZGxlcnMoZXZlbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0pIHtcblxuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGhpdFRlc3QgPSB0aGlzLl91c2VySGl0VGVzdE1ldGhvZCB8fCB0aGlzLl9oaXRUZXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpdFRlc3QoZXZlbnQueCwgZXZlbnQueSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC50YXJnZXQuZ2V0Qm91bmRpbmdBcmVhKCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gaGFuZGxlck9iamVjdC50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgd2FzIGJvdW5kIHdpdGggYSB0YXJnZXQgdHJpZ2dlciBoYW5kbGVyIE9OTFkgaWYgdGFyZ2V0IGhpdFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBoYW5kbGVyIGZvciBhIGNlcnRhaW4gZXZlbnQgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNhZGRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgICBUaGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSAge29iamVjdH0gICBbdGFyZ2V0XSBUaGUgdGFyZ2V0IHRvIGNoZWNrIGV2ZW50IHRyaWdnZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICBSZXR1cm5zIHRydWUgaWYgYWRkZWQgYW5kIGZhbHNlIGlmIGNhbGxiYWNrIGFscmVhZHkgZXhpc3RzXG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBoYW5kbGVyT2JqZWN0cyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgbGV0IGR1cDtcblxuXG4gICAgICAgIGlmICghIGhhbmRsZXJPYmplY3RzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJPYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgZHVwID0gdGhpcy5faXNEdXBsaWNhdGVIYW5kbGVyKGhhbmRsZXIsIGhhbmRsZXJPYmplY3RzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZHVwKSB7XG4gICAgICAgICAgICBoYW5kbGVyT2JqZWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLCB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBtYXRjaGluZyBoYW5kbGVyIGlmIGZvdW5kXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I3JlbW92ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGUgICAgdGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciB0aGUgaGFuZGxlciB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgcmVtb3ZlZCBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCBhbmQgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCByZW1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCEgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV2ZW50IHR5cGUgXCIke3R5cGV9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyT2JqZWN0ID0gaGFuZGxlcnNbaV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIGtleXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWRcbiAgICAgKiBlZzogPGNvZGU+eyBMRUZUX0FSUk9XOiAzNywgVVBfQVJST1c6IDM4IH08L2NvZGU+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I2dldEtleXNEb3duXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEtleXNEb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c0Rvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHVzZXIgdG8gc2V0IGEgY3VzdG9tIGhpdCB0ZXN0IG1ldGhvZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNzZXRIaXRUZXN0TWV0aG9kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHVzZXIncyBoaXQgdGVzdCBtZXRob2RcbiAgICAgKi9cbiAgICBzZXRIaXRUZXN0TWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0I3NldEhpdFRlc3RNZXRob2QgcGFyYW1ldGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBmbjtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcblxuLyoqXG4gKiBAY2xhc3MgICBSZWN0YW5nbGVcbiAqIEBleHRlbmRzIHtAbGluayBTcHJpdGV9XG4gKiBAZGVzYyAgICBBIHNwcml0ZSB0aGF0IHJlbmRlcnMgYXMgYSByZWN0YW5nbGVcbiAqIEBhdXRob3IgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3N0cm9rZSA9ICcnO1xuICAgIH1cblxuICAgIHJlbmRlcihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5feCwgdGhpcy5feSwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX3NyY0hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvc2l0ZSBvcGVyYXRpb24gdHlwZS4gQ2FuIGJlIHNvdXJjZS1hdG9wfHNvdXJjZS1pbnxzb3VyY2Utb3V0fHNvdXJjZS1vdmVyfGRlc3RpbmF0aW9uLWF0b3B8ZGVzdGluYXRpb24taW58ZGVzdGluYXRpb24tb3V0fGRlc3RpbmF0aW9uLW92ZXJ8bGlnaHRlcnx4b3J8Y29weVxuICAgICAgICAgKiBEZWZhdWx0IGlzICdzb3VyY2Utb3ZlcidcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlciBTcHJpdGUjX2NvbXBvc2l0ZVxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21wb3NpdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGJvdW5kaW5nIGFyZWFcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0FyZWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXhYOiB0aGlzLl94ICsgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICBtYXhZOiB0aGlzLl95ICsgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgbWluWDogdGhpcy5feCxcbiAgICAgICAgICAgIG1pblk6IHRoaXMuX3lcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRDb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tcG9zaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9zaXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldEhlaWdodFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldE9wYWNpdHlcbiAgICAgKiBAcmV0dXJuIHtGbG9hdH1cbiAgICAgKi9cbiAgICBnZXRPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0U3JjWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U3JjWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY1k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0V2lkdGhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0WVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIGNvbXBvc2l0ZSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRDb21wb3NpdGUodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldEhlaWdodFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgaGVpZ2h0IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldEhlaWdodCh2YWwpIHtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0T3BhY2l0eVxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2YWwgVGhlIG9wYWNpdHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0T3BhY2l0eSh2YWwpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRSb3RhdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTY2FsZVhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHNjYWxlWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWSh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNYKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U3JjWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc3JjWSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRTcmNZKHZhbCkge1xuICAgICAgICB0aGlzLl9zcmNZID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0V2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHdpZHRoIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFdpZHRoKHZhbCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRZKHZhbCkge1xuICAgICAgICB0aGlzLl95ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbWVtYmVyIFNwcml0ZS5fY29tcG9zaXRlRGVmYXVsdFxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0ID0gJ3NvdXJjZS1vdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgU3RhZ2VcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGFuZCBoYW5kbGVzIHRoZSBjYW52YXMgZWxlbWVudC4gaW5jbHVkZWQgaW4gdGhlIG9wdGlvbnNcbiAqICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgZGVwZW5kZW5jeSBpbmplY3Rpb24gdXNlZCBmb3IgdGVzdGluZyBhZ2FpbnN0XG4gKiAgICAgICAgICAgICAgYSB2aXJ0dWFsIGRvbS5cbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICBbd2lkdGhdICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFtoZWlnaHRdICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzXSAgICAgICAgICBTdGFnZSBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0cy5wYXJlbnRFbF0gVGhlIGVsZW1lbnQgd2l0aCB3aGljaCB0byBhdHRhY2ggdGhlIGNhbnZhcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub25lIGdpdmVuIHRoZSBib2R5IGlzIHVzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICBbb3B0cy5iZ0NvbG9yXSAgVGhlIHBhcmVudCBlbGVtZW50J3MgYmcgY29sb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIFtvcHRzLmRvY3VtZW50XSBGb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMud2luZG93XSAgIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBbb3B0cy5maWxsXSAgICAgU2V0IHRvIGZhbHNlIHRvIG5vdCBtYXhpbWFsbHkgZmlsbCB2aWV3cG9ydC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IG9wdHMuZmlsbCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMuZmlsbDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IG9wdHMud2luZG93IHx8IHdpbmRvdztcbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBvcHRzLnBhcmVudEVsIHx8IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdHMuYmdDb2xvcjtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTdGFnZUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVTdGFnZUVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLl9zdGFnZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLl9zdGFnZSk7XG5cbiAgICAgICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX3ZpZGVvKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX3N0YWdlLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgX3Jlc2l6ZUVsZW1lbnQgZm9yIHN0YWdlIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19oYW5kbGVSZXNpemVcbiAgICAgKi9cbiAgICBfaGFuZGxlUmVzaXplKCkge1xuICAgICAgICB0aGlzLl9yZXNpemVFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fdmlkZW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IHRvIGhhbmRsZSByZXNpemUgYmFzZWQgb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNfcmVzaXplRWxlbWVudFxuICAgICAqIEBwYXJhbSAge0hUTUxFbnRpdHl9IGVsIFRoZSBlbGVtZW50IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIF9yZXNpemVFbGVtZW50KGVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxsKSB7XG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSA9IFN0YWdlLmZpbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQpfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gU3RhZ2UuY2VudGVyKFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChsZWZ0KX1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRDYW52YXNcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTdGFnZSNnZXRWaWRlb1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWF4aW1pemVzIGFuIGVsZW1lbnQgKHdpdGggYXNwZWN0IHJhdGlvIGludGFjdCkgaW4gdGhlIHZpZXdwb3J0IHZpYSBDU1MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmZpbGxcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB3aWR0aCAgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIHdpZHRoIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGhlaWdodCAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgaGVpZ2h0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0V2lkdGggIFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgd2lkdGhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydEhlaWdodCBUaGUgdmlld3BvcnQncyBjdXJyZW50IGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIFRoZSBuZXcgdG9wLCBsZWZ0LCB3aWR0aCwgJiBoZWlnaHRcbiAgICAgKi9cbiAgICBzdGF0aWMgZmlsbCh3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICBjb25zdCBMQU5EU0NBUEVfUkFUSU8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgY29uc3QgUE9SVFJBSVRfUkFUSU8gID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGNvbnN0IElTX0xBTkRTQ0FQRSAgICA9IExBTkRTQ0FQRV9SQVRJTyA8IFBPUlRSQUlUX1JBVElPID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGxldCB3aW5MYW5kc2NhcGVSYXRpbyA9IHZpZXdwb3J0SGVpZ2h0IC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgbGV0IHdpblBvcnRyYWl0UmF0aW8gID0gdmlld3BvcnRXaWR0aCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRUb3AgID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChJU19MQU5EU0NBUEUpIHtcbiAgICAgICAgICAgIGlmIChMQU5EU0NBUEVfUkFUSU8gPCB3aW5MYW5kc2NhcGVSYXRpbykge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUE9SVFJBSVRfUkFUSU8gPCB3aW5Qb3J0cmFpdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydEhlaWdodCAqIFBPUlRSQUlUX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAodmlld3BvcnRXaWR0aCAtIG9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoID0gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBvZmZzZXRXaWR0aCAqIExBTkRTQ0FQRV9SQVRJTztcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAodmlld3BvcnRIZWlnaHQgLSBvZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICAgICAgICB0b3A6IG9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtlZXBzIHN0YWdlIGVsZW1lbnQgY2VudGVyZWQgaW4gdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlLmNlbnRlclxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIHRvcCBhbmQgbGVmdFxuICAgICAqL1xuICAgIHN0YXRpYyBjZW50ZXIod2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6ICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgICAgICAgIHRvcDogKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBUaWNrZXJcbiAqIEBkZXNjcmlwdGlvbiBFeGVjdXRlcyBjYWxsYmFjayBiYXNlZCBvbiBnaXZlbiBmcHMgYW5kIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0YXJ0XSAgICAgICAgIFdoZXRoZXIgdG8gc3RhcnQgb24gaW5zdGFudGlhdGUuIERlZmF1bHQgaXMgdHJ1ZVxuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0c10gICAgICAgICAgT3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy53aW5kb3ddICAgd2luZG93IG9iamVjdCBmb3IgdGVzdGluZ1xuICogQHBhcmFtIHtPYmplY3R9ICBbb3B0cy5kb2N1bWVudF0gZG9jdW1lbnQgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQgPSB0cnVlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IG9wdHMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl90aWNrcyA9IDA7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgd2hldGhlciBvciBub3QgdG8gY2FsbCB7QGxpbmsgVGlja2VyI29uVGlja30gYmFzZWQgb24ge0BsaW5rIFRpY2tlciNfZnBzfS5cbiAgICAgKiBJZiB0aGUgY29ycmVjdCBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIHRoZSB7QGxpbmsgVGlja2VyI29uVGlja30gY2FsbGJhY2sgd2lsbCBmaXJlIGFuZFxuICAgICAqIHRoZSA8Y29kZT50aWNrPC9jb2RlPiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSA8Y29kZT5kb2N1bWVudDwvY29kZT4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjX3VwZGF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKG5vdyAtIHRoaXMuX3RoZW4pIC8gMTAwMDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICB0aGlzLl90aWNrcyArPSAxO1xuXG4gICAgICAgIHRoaXMub25UaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuZCBmaXJlIHRpY2sgZXZlbnRzXG4gICAgICAgIGNvbnN0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndGljaycsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICB0aWNrczogdGhpcy5fdGlja3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aWNrRXZlbnQpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgdGlja2VyXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNzdGFydFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FudmFzVHJhbnNmb3JtXG4gKiBAZGVzY3JpcHRpb24gUmV0YWlucyBjYW52YXMgdHJhbnNmb3JtYXRpb24gc3RhY2suXG4gKiAgICAgICAgICAgICAgQmFzaWNhbGx5IGEgZm9yayBmcm9tIFNpbW9uIFNhcnJpcyAtIHd3dy5zaW1vbnNhcnJpcy5jb20gLSBzYXJyaXNAYWNtLm9yZ1xuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dCBUaGUgY2FudmFzJyBjb250ZXh0IG9iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBbMSwwLDAsMSwwLDBdOyAvL2luaXRpYWxpemUgd2l0aCB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXRNYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdHJpeDtcbiAgICB9XG5cbiAgICBzZXRNYXRyaXgobSkge1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFttWzBdLG1bMV0sbVsyXSxtWzNdLG1bNF0sbVs1XV07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgY2xvbmVNYXRyaXgobSkge1xuICAgICAgICByZXR1cm4gW21bMF0sbVsxXSxtWzJdLG1bM10sbVs0XSxtWzVdXTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YWNrXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5jbG9uZU1hdHJpeCh0aGlzLmdldE1hdHJpeCgpKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG1hdHJpeCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICB9XG5cbiAgICByZXN0b3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF0cml4KG1hdHJpeCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWF0cml4XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBzZXRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbMl0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbM10sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbNV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSArPSB0aGlzLm1hdHJpeFswXSAqIHggKyB0aGlzLm1hdHJpeFsyXSAqIHk7XG4gICAgICAgIHRoaXMubWF0cml4WzVdICs9IHRoaXMubWF0cml4WzFdICogeCArIHRoaXMubWF0cml4WzNdICogeTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZShyYWQpIHtcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIGMgKyB0aGlzLm1hdHJpeFsyXSAqIHM7XG4gICAgICAgIGxldCBtMTIgPSB0aGlzLm1hdHJpeFsxXSAqIGMgKyB0aGlzLm1hdHJpeFszXSAqIHM7XG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIC1zICsgdGhpcy5tYXRyaXhbMl0gKiBjO1xuICAgICAgICBsZXQgbTIyID0gdGhpcy5tYXRyaXhbMV0gKiAtcyArIHRoaXMubWF0cml4WzNdICogYztcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzY2FsZShzeCwgc3kpIHtcbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gKj0gc3g7XG4gICAgICAgIHRoaXMubWF0cml4WzFdICo9IHN4O1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSAqPSBzeTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gKj0gc3k7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hdHJpeCBleHRlbnNpb25zXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICByb3RhdGVEZWdyZWVzKGRlZykge1xuICAgICAgICBsZXQgcmFkID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5yb3RhdGUocmFkKTtcbiAgICB9XG5cbiAgICByb3RhdGVBYm91dChyYWQsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIHRoaXMucm90YXRlKHJhZCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgcm90YXRlRGVncmVlc0Fib3V0KGRlZywgeCwgeSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgdGhpcy5yb3RhdGVEZWdyZWVzKGRlZyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIHRoaXMubSA9IFsxLDAsMCwxLDAsMF07XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkobWF0cml4KSB7XG4gICAgICAgIGxldCBtMTEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgbGV0IG0xMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzFdO1xuXG4gICAgICAgIGxldCBtMjEgPSB0aGlzLm1hdHJpeFswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tYXRyaXhbMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgbGV0IG0yMiA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzNdO1xuXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWF0cml4WzBdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNF07XG4gICAgICAgIGxldCBkeSA9IHRoaXMubWF0cml4WzFdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1hdHJpeFszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tYXRyaXhbNV07XG5cbiAgICAgICAgdGhpcy5tYXRyaXhbMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubWF0cml4WzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tYXRyaXhbM10gPSBtMjI7XG4gICAgICAgIHRoaXMubWF0cml4WzRdID0gZHg7XG4gICAgICAgIHRoaXMubWF0cml4WzVdID0gZHk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICBsZXQgZCA9IDEgLyAodGhpcy5tYXRyaXhbMF0gKiB0aGlzLm1hdHJpeFszXSAtIHRoaXMubWF0cml4WzFdICogdGhpcy5tYXRyaXhbMl0pO1xuICAgICAgICBsZXQgbTAgPSB0aGlzLm1hdHJpeFszXSAqIGQ7XG4gICAgICAgIGxldCBtMSA9IC10aGlzLm1hdHJpeFsxXSAqIGQ7XG4gICAgICAgIGxldCBtMiA9IC10aGlzLm1hdHJpeFsyXSAqIGQ7XG4gICAgICAgIGxldCBtMyA9IHRoaXMubWF0cml4WzBdICogZDtcbiAgICAgICAgbGV0IG00ID0gZCAqICh0aGlzLm1hdHJpeFsyXSAqIHRoaXMubWF0cml4WzVdIC0gdGhpcy5tYXRyaXhbM10gKiB0aGlzLm1hdHJpeFs0XSk7XG4gICAgICAgIGxldCBtNSA9IGQgKiAodGhpcy5tYXRyaXhbMV0gKiB0aGlzLm1hdHJpeFs0XSAtIHRoaXMubWF0cml4WzBdICogdGhpcy5tYXRyaXhbNV0pO1xuICAgICAgICB0aGlzLm1hdHJpeFswXSA9IG0wO1xuICAgICAgICB0aGlzLm1hdHJpeFsxXSA9IG0xO1xuICAgICAgICB0aGlzLm1hdHJpeFsyXSA9IG0yO1xuICAgICAgICB0aGlzLm1hdHJpeFszXSA9IG0zO1xuICAgICAgICB0aGlzLm1hdHJpeFs0XSA9IG00O1xuICAgICAgICB0aGlzLm1hdHJpeFs1XSA9IG01O1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSGVscGVyc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdHJhbnNmb3JtUG9pbnQoeCwgeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCAqIHRoaXMubWF0cml4WzBdICsgeSAqIHRoaXMubWF0cml4WzJdICsgdGhpcy5tYXRyaXhbNF0sXG4gICAgICAgICAgICB5OiB4ICogdGhpcy5tYXRyaXhbMV0gKyB5ICogdGhpcy5tYXRyaXhbM10gKyB0aGlzLm1hdHJpeFs1XVxuICAgICAgICB9O1xuICAgIH1cbn0iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICA4OiAnQkFDS1NQQUNFJyxcbiAgICA5OiAnVEFCJyxcbiAgICAxMzogJ0VOVEVSJyxcbiAgICAxNjogJ1NISUZUJyxcbiAgICAxNzogJ0NUUkwnLFxuICAgIDE4OiAnQUxUJyxcbiAgICAxOTogJ1BBVVNFX0JSRUFLJyxcbiAgICAyMDogJ0NBUFNfTE9DSycsXG4gICAgMjc6ICdFU0NBUEUnLFxuICAgIDMzOiAnUEFHRV9VUCcsXG4gICAgMzQ6ICdQQUdFX0RPV04nLFxuICAgIDM1OiAnRU5EJyxcbiAgICAzNjogJ0hPTUUnLFxuICAgIDM3OiAnTEVGVF9BUlJPVycsXG4gICAgMzg6ICdVUF9BUlJPVycsXG4gICAgMzk6ICdSSUdIVF9BUlJPVycsXG4gICAgNDA6ICdET1dOX0FSUk9XJyxcbiAgICA0NTogJ0lOU0VSVCcsXG4gICAgNDY6ICdERUxFVEUnLFxuICAgIDQ4OiBbMCwnKSddLFxuICAgIDQ5OiBbMSwnISddLFxuICAgIDUwOiBbMiwnQCddLFxuICAgIDUxOiBbMywnIyddLFxuICAgIDUyOiBbNCwnJCddLFxuICAgIDUzOiBbNSwnJSddLFxuICAgIDU0OiBbNiwnXiddLFxuICAgIDU1OiBbNywnJiddLFxuICAgIDU2OiBbOCwnKiddLFxuICAgIDU3OiBbOSwnKCddLFxuICAgIDY1OiAnQScsXG4gICAgNjY6ICdCJyxcbiAgICA2NzogJ0MnLFxuICAgIDY4OiAnRCcsXG4gICAgNjk6ICdFJyxcbiAgICA3MDogJ0YnLFxuICAgIDcxOiAnRycsXG4gICAgNzI6ICdIJyxcbiAgICA3MzogJ0knLFxuICAgIDc0OiAnSicsXG4gICAgNzU6ICdLJyxcbiAgICA3NjogJ0wnLFxuICAgIDc3OiAnTScsXG4gICAgNzg6ICdOJyxcbiAgICA3OTogJ08nLFxuICAgIDgwOiAnUCcsXG4gICAgODE6ICdRJyxcbiAgICA4MjogJ1InLFxuICAgIDgzOiAnUycsXG4gICAgODQ6ICdUJyxcbiAgICA4NTogJ1UnLFxuICAgIDg2OiAnVicsXG4gICAgODc6ICdXJyxcbiAgICA4ODogJ1gnLFxuICAgIDg5OiAnWScsXG4gICAgOTA6ICdaJyxcbiAgICA5MTogJ0xFRlRfV0lORE9XX0tFWScsXG4gICAgOTI6ICdSSUdIVF9XSU5ET1dfS0VZJyxcbiAgICA5MzogJ1NFTEVDVF9LRVknLFxuICAgIDk2OiAnTlVNX1BBRF8wJyxcbiAgICA5NzogJ05VTV9QQURfMScsXG4gICAgOTg6ICdOVU1fUEFEXzInLFxuICAgIDk5OiAnTlVNX1BBRF8zJyxcbiAgICAxMDA6ICdOVU1fUEFEXzQnLFxuICAgIDEwMTogJ05VTV9QQURfNScsXG4gICAgMTAyOiAnTlVNX1BBRF82JyxcbiAgICAxMDM6ICdOVU1fUEFEXzcnLFxuICAgIDEwNDogJ05VTV9QQURfOCcsXG4gICAgMTA1OiAnTlVNX1BBRF85JyxcbiAgICAxMDY6ICdOVU1fUEFEX0FTVEVSSVNLJyxcbiAgICAxMDc6ICdOVU1fUEFEX1BMVVMnLFxuICAgIDEwOTogJ05VTV9QQURfTUlOVVMnLFxuICAgIDExMTogJ05VTV9QQURfRk9XQVJEX1NMQVNIJyxcbiAgICAxMTI6ICdGMScsXG4gICAgMTEzOiAnRjInLFxuICAgIDExNDogJ0YzJyxcbiAgICAxMTU6ICdGNCcsXG4gICAgMTE2OiAnRjUnLFxuICAgIDExNzogJ0Y2JyxcbiAgICAxMTg6ICdGNycsXG4gICAgMTE5OiAnRjgnLFxuICAgIDEyMDogJ0Y5JyxcbiAgICAxMjE6ICdGMTAnLFxuICAgIDEyMjogJ0YxMScsXG4gICAgMTIzOiAnRjEyJyxcbiAgICAxNDQ6ICdOVU1fTE9DSycsXG4gICAgMTQ1OiAnU0NST0xMX0xPQ0snLFxuICAgIDE4NjogWyc7JywnOiddLFxuICAgIDE4NzogWyc9JywnKyddLFxuICAgIDE4ODogWycsJywnPCddLFxuICAgIDE4OTogWyctJywnXyddLFxuICAgIDE5MDogWycuJywnPiddLFxuICAgIDE5MTogWycvJywnPyddLFxuICAgIDE5MjogWydgJywnfiddLFxuICAgIDIxOTogWydbJywneyddLFxuICAgIDIyMDogWydcXFxcJywnfCddLFxuICAgIDIyMTogWyddJywnfSddLFxuICAgIDIyMjogWydcXCcnLCdcIiddXG59O1xuIl19
