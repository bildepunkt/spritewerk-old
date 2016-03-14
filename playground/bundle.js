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

// or this is how to do it...
/*
const can = document.querySelector('canvas');
const ctx = can.getContext('2d');

class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Group extends Point {
  constructor(item) {
    super();
    this.r = 0;
    this.item = item;
  }

  update() {
    ctx.rotate(this.r * Math.PI / 180);
    ctx.translate(this.x, this.y);
    this.item.update();
  }
}

class Sprite extends Point {
  update() {
    ctx.rotate(this.r * Math.PI / 180);
    ctx.translate(this.x, this.y);
    const size = 16;
    ctx.fillRect(-size / 2,-size / 2, size, size);
  }
}

let sprt = new Sprite();
let grp = new Group(sprt);
grp.x = 96;
grp.r = 15;

function getRotatedCoords(x, y, cx, cy, deg) {
  let rad = deg * Math.PI / 180;
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);

  let newx = (x - cx) * cos - (y - cy) * sin;
  let newy = (x - cx) * sin + (y - cy) * cos;

  return {
    x: newx + cx,
    y: newy + cy
  };
}

function update() {
  ctx.save();
  grp.update();
  ctx.restore();

  console.log(getRotatedCoords(, 0, 96, 0, 15));

  //window.requestAnimationFrame(update);
}

update();
*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvQ29sbGVjdGlvbi5qcyIsInNyYy9Hcm91cC5qcyIsInNyYy9JbnB1dC5qcyIsInNyYy9SZWN0YW5nbGUuanMiLCJzcmMvU3ByaXRlLmpzIiwic3JjL1N0YWdlLmpzIiwic3JjL1RpY2tlci5qcyIsInNyYy9saWIva2V5Y29kZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFNBQVMsc0JBQVQ7QUFDSixJQUFJLFFBQVEsb0JBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7QUFDNUIsV0FBUyxNQUFUO0FBQ0EsUUFBTSxJQUFOO0NBRlEsQ0FBUjtBQUlKLElBQUksU0FBUyxxQkFBVyxNQUFNLFNBQU4sRUFBWCxFQUE4QixNQUE5QixDQUFUO0FBQ0osSUFBSSxRQUFRLG9CQUFVLE1BQU0sU0FBTixFQUFWLENBQVI7QUFDSixJQUFJLFNBQVMsc0JBQVQ7O0FBRUosSUFBSSxTQUFTLG9CQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLFVBQXBCLENBQStCLEdBQS9CLENBQVQ7QUFDSixJQUFJLFNBQVMsb0JBQVUsRUFBVixFQUFjLEVBQWQsQ0FBVDtBQUNKLElBQUksT0FBTyx3QkFBYyxFQUFkLENBQVA7QUFDSixJQUFJLElBQUksQ0FBSjs7QUFFSixPQUFPLE9BQVAsQ0FBZSxNQUFmO0FBQ0EsT0FBTyxPQUFQLENBQWUsSUFBZixFQUFxQixNQUFyQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsWUFBWTtBQUMzQixPQUFLLENBQUwsQ0FEMkI7QUFFM0IsU0FBTyxXQUFQLENBQW1CLENBQW5CLEVBRjJCO0FBRzNCLE9BQUssV0FBTCxDQUFpQixDQUFDLENBQUQsR0FBRyxDQUFILENB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QUgsQ0FBSjtBQUNBLFFBQUksQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFKO0FBQ0EsUUFBSSxDQUFDLENBQUQsRUFBRyxHQUFILENBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLEdBQUo7QUFDQSxRQUFJLGlCQUFKO0FBQ0EsUUFBSSxrQkFBSjtBQUNBLFFBQUksWUFBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFFBQUksV0FBSjtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssV0FBTDtBQUNBLFNBQUssa0JBQUw7QUFDQSxTQUFLLGNBQUw7QUFDQSxTQUFLLGVBQUw7QUFDQSxTQUFLLHNCQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxJQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsU0FBSyxVQUFMO0FBQ0EsU0FBSyxhQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBTDtBQUNBLFNBQUssQ0FBQyxJQUFELEVBQU0sR0FBTixDQUFMO0FBQ0EsU0FBSyxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQUw7QUFDQSxTQUFLLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FBTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ2FtZXJhIGZyb20gJy4vc3JjL0NhbWVyYSc7XG5pbXBvcnQgQ2FudmFzIGZyb20gJy4vc3JjL0NhbnZhcyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9zcmMvSW5wdXQnO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3JjL1N0YWdlJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9zcmMvUmVjdGFuZ2xlJztcbmltcG9ydCBHcm91cCBmcm9tICcuL3NyYy9Hcm91cCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vc3JjL1RpY2tlcic7XG5cbmxldCBjYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5sZXQgc3RhZ2UgPSBuZXcgU3RhZ2UoODAwLCA2MDAsIHtcbiAgICBiZ0NvbG9yOiAnIzIyMicsXG4gICAgZmlsbDogdHJ1ZVxufSk7XG5sZXQgY2FudmFzID0gbmV3IENhbnZhcyhzdGFnZS5nZXRDYW52YXMoKSwgY2FtZXJhKTtcbmxldCBpbnB1dCA9IG5ldyBJbnB1dChzdGFnZS5nZXRDYW52YXMoKSk7XG5sZXQgdGlja2VyID0gbmV3IFRpY2tlcigpO1xuXG5sZXQgZ3JvdXBBID0gbmV3IEdyb3VwKDEyOCwgMTI4KS5zZXRPcGFjaXR5KDAuNCk7XG5sZXQgZ3JvdXBCID0gbmV3IEdyb3VwKDY0LCA2NCk7XG5sZXQgcmVjdCA9IG5ldyBSZWN0YW5nbGUoMTYpO1xubGV0IHIgPSAwO1xuXG5ncm91cEEuYWRkSXRlbShncm91cEIpO1xuZ3JvdXBCLmFkZEl0ZW0ocmVjdCwgJ3JlY3QnKTtcblxudGlja2VyLm9uUHJlVGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByICs9IDI7XG4gICAgZ3JvdXBCLnNldFJvdGF0aW9uKHIpO1xuICAgIHJlY3Quc2V0Um90YXRpb24oLXIqOCk7XG4gICAgY2FudmFzLnVwZGF0ZShncm91cEEpO1xufTtcblxudGlja2VyLm9uVGljayA9IGZ1bmN0aW9uIChmYWN0b3IpIHtcbiAgICBjYW52YXMuY2xlYXIoJyNEREQnKTtcblxuICAgIGNhbnZhcy5yZW5kZXIoZ3JvdXBBKTtcbn07XG5cbi8vIG9yIHRoaXMgaXMgaG93IHRvIGRvIGl0Li4uXG4vKlxuY29uc3QgY2FuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW4uZ2V0Q29udGV4dCgnMmQnKTtcblxuY2xhc3MgUG9pbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gIH1cbn1cblxuY2xhc3MgR3JvdXAgZXh0ZW5kcyBQb2ludCB7XG4gIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuciA9IDA7XG4gICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjdHgucm90YXRlKHRoaXMuciAqIE1hdGguUEkgLyAxODApO1xuICAgIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgIHRoaXMuaXRlbS51cGRhdGUoKTtcbiAgfVxufVxuXG5jbGFzcyBTcHJpdGUgZXh0ZW5kcyBQb2ludCB7XG4gIHVwZGF0ZSgpIHtcbiAgICBjdHgucm90YXRlKHRoaXMuciAqIE1hdGguUEkgLyAxODApO1xuICAgIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgIGNvbnN0IHNpemUgPSAxNjtcbiAgICBjdHguZmlsbFJlY3QoLXNpemUgLyAyLC1zaXplIC8gMiwgc2l6ZSwgc2l6ZSk7XG4gIH1cbn1cblxubGV0IHNwcnQgPSBuZXcgU3ByaXRlKCk7XG5sZXQgZ3JwID0gbmV3IEdyb3VwKHNwcnQpO1xuZ3JwLnggPSA5NjtcbmdycC5yID0gMTU7XG5cbmZ1bmN0aW9uIGdldFJvdGF0ZWRDb29yZHMoeCwgeSwgY3gsIGN5LCBkZWcpIHtcbiAgbGV0IHJhZCA9IGRlZyAqIE1hdGguUEkgLyAxODA7XG4gIGxldCBjb3MgPSBNYXRoLmNvcyhyYWQpO1xuICBsZXQgc2luID0gTWF0aC5zaW4ocmFkKTtcblxuICBsZXQgbmV3eCA9ICh4IC0gY3gpICogY29zIC0gKHkgLSBjeSkgKiBzaW47XG4gIGxldCBuZXd5ID0gKHggLSBjeCkgKiBzaW4gKyAoeSAtIGN5KSAqIGNvcztcblxuICByZXR1cm4ge1xuICAgIHg6IG5ld3ggKyBjeCxcbiAgICB5OiBuZXd5ICsgY3lcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICBjdHguc2F2ZSgpO1xuICBncnAudXBkYXRlKCk7XG4gIGN0eC5yZXN0b3JlKCk7XG5cbiAgY29uc29sZS5sb2coZ2V0Um90YXRlZENvb3JkcygsIDAsIDk2LCAwLCAxNSkpO1xuXG4gIC8vd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xufVxuXG51cGRhdGUoKTtcbiovIiwiLyoqXG4gKiBAY2xhc3MgICAgICAgQ2FtZXJhXG4gKiBAZGVzY3JpcHRpb24gRGVjaWRlcyB3aGF0IGdldHMgcmVuZGVyZWRcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI2dldFlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgQ2FtZXJhI3NldFhcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtDYW1lcmF9XG4gICAgICovXG4gICAgc2V0WCh2YWwpIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIENhbWVyYSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7Q2FtZXJhfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiY2xhc3MgWGZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ICs9IHg7XG4gICAgICAgIHRoaXMueSArPSB5O1xuICAgIH1cblxuICAgIHNjYWxlKHNjYWxlWCwgc2NhbGVZKSB7XG4gICAgICAgIHRoaXMuc2NhbGVYICo9IHNjYWxlWDtcbiAgICAgICAgdGhpcy5zY2FsZVkgKj0gc2NhbGVZO1xuICAgIH1cblxuICAgIHJvdGF0ZUFib3V0KGRlZywgY3gsIGN5KSB7XG4gICAgICAgIGxldCByYWQgPSBkZWcgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBsZXQgY29zID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgbGV0IHNpbiA9IE1hdGguc2luKHJhZCk7XG5cbiAgICAgICAgbGV0IHggPSAodGhpcy54IC0gY3gpICogY29zIC0gKHRoaXMueSAtIGN5KSAqIHNpbjtcbiAgICAgICAgbGV0IHkgPSAodGhpcy54IC0gY3gpICogc2luICsgKHRoaXMueSAtIGN5KSAqIGNvcztcblxuICAgICAgICB0aGlzLnggPSB4ICsgY3g7XG4gICAgICAgIHRoaXMueSA9IHkgKyBjeTtcbiAgICB9XG59XG5cbi8qKlxuICogQGNsYXNzICAgICAgIENhbnZhc1xuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgcmVuZGVyaW5nIGVudGl0aWVzIG9udG8gdGhlIGNhbnZhcyBlbGVtZW50LiBNZXJnZXMgY29udGV4dFxuICogICAgICAgICAgICAgIG9iamVjdCB3aXRoIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3IuXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKiBAcmVxdWlyZXMgICAge0BsaW5rIENhbnZhc1RyYW5zZm9ybX1cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXMgVGhlIGFjdGl2ZSBjYW52YXMgZWxlbWVudFxuICogQHBhcmFtIHtDYW1lcmF9ICAgICAgY2FtZXJhIFRoZSBjYW1lcmEgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBlbnRpcmUgY2FudmFzIGFuZCBvcHRpb25hbGx5IGZpbGxzIHdpdGggYSBjb2xvclxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjY2xlYXJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjb2xvcl0gSWYgcGFzc2VkLCB3aWxsIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIGNsZWFyKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNnZXRDb250ZXh0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgMkQgY29udGV4dCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPZmZzZXRzIGNhbnZhcyBiYXNlZCBvbiBjYW1lcmEgYW5kIGNhbGxzIGFuIGVudGl0eSdzIHJlbmRlciBtZXRob2QgcGFzc2luZyB0aGUgY29udGV4dC5cbiAgICAgKiBTYXZlcyBhbmQgcmVzdG9yZXMgY29udGV4dCBhbmQgYmVnaW5uaW5nIGFuZCBlbmQgb2Ygb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBDYW52YXMjcmVuZGVyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlbnRpdHkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHJlbmRlcihlbnRpdHkpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgZW50aXR5LnJlbmRlcih0aGlzLl9jb250ZXh0KTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbnRleHQgaW1hZ2Ugc21vb3RoaW5nXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIENhbnZhcyNzZXRJbWFnZVNtb290aGluZ1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHZhbCBUaGUgaW1hZ2Ugc21vb3RoaW5nIHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VTbW9vdGhpbmcodmFsKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLl9pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5faW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuX2ltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGUoZW50aXR5KSB7XG4gICAgICAgIGxldCB4Zm9ybSA9IG5ldyBYZm9ybSgpO1xuXG4gICAgICAgIHhmb3JtLnRyYW5zbGF0ZSgtdGhpcy5fY2FtZXJhLmdldFgoKSwgLXRoaXMuX2NhbWVyYS5nZXRZKCkpO1xuXG4gICAgICAgIGVudGl0eS51cGRhdGUoeGZvcm0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIENvbGxlY3Rpb25cbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyB0aGUgc29ydGFibGUsIGl0ZXJhYmxlIHN0b3JhZ2Ugb2YgZW50aXRpZXMgdGhhdCBhcmVcbiAqICAgICAgICAgICAgICBnZXR0YWJsZSwgc2V0dGFibGUsIHNvcnRhYmxlLCByZW1vdmFibGUsIGV0Y2VyYShibGUpIGJ5IG5hbWVcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gVGhlIHNvcnRlZCBsaXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGl0ZW0geyBuYW1lLCBpdGVtIH0gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0UmF3SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goZnVuY3Rpb24oaXRlckl0ZW0sIGksIGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gaXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBjb2xsZWN0aW9uJ3Mgc29ydGVkIGl0ZW1zLiBUaGUgcmF3IGl0ZW0sIGluZGV4LCBuYW1lLCBhbmQgdGhlXG4gICAgICogbGlzdCBiZWluZyBpdGVyYXRlZCBhcmUgc3VwcGxpZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jhd0VhY2goZm4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChmbih0aGlzLl9pdGVtc1tpXSwgaSwgdGhpcy5faXRlbXNbaV0ubmFtZSwgdGhpcy5faXRlbXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gd2l0aCBvcHRpb25hbCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtBbnl9ICAgICAgICBpdGVtICAgVGhlIGl0ZW0gdG8gYWRkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW25hbWVdIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW0sIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG5cbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtLCBuYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBtdWx0aXBsZSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5PYmplY3R9IGl0ZW1zIENhbiBiZSB0aGUgb2JqZWN0IGl0c2VsZiBvciBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGFuZCBpdCdzIG5hbWVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgZWc6IDxjb2RlPnsgaXRlbTogRW50aXR5LCBuYW1lOiAnZW50aXR5TmFtZScgfTwvY29kZT5cbiAgICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGFkZEl0ZW1zKC4uLml0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pdGVtID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaXRlbS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaGFzIGl0ZW0vbmFtZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oaXRlbS5pdGVtLCBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgY29udmVuaWVuY2UgYWxsb3cgdXNlciB0byBhZGQganVzdCBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGNvbGxlY3Rpb24ncyBzb3J0ZWQgaXRlbXMuIFRoZSBpdGVtLCBpbmRleCwgYW5kIG5hbWUgYXJlIHN1cHBsaWVkXG4gICAgICogdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHRoZSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBlYWNoKGZuLCBzY29wZSkge1xuICAgICAgICBmbiA9IHNjb3BlID8gZm4uYmluZChzY29wZSkgOiBmbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faXRlbXNbaV07XG5cbiAgICAgICAgICAgIGlmIChmbihpdGVtLml0ZW0sIGksIGl0ZW0ubmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlcyBpdGVtcyBhbmQgcmV0dXJuIHRoZSBvbmVzIHRoYXQgbWVldCBjcml0ZXJpYVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVHJ1dGggcHJlZGljYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtzY29wZV0gVGhlIHNjb3BlIHdpdGggd2hpY2ggdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVtLCBpLCBuYW1lKT0+IHtcbiAgICAgICAgICAgIGxldCBwcmVkaWNhdGUgPSBmbihpdGVtLCBpLCBuYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2NvcGUpO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGp1c3QgdGhlIGl0ZW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRJdGVtQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleGlzdGluZyBpdGVtIGJ5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0FueX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKG5hbWUpIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZXJJdGVtO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4aXN0aW5nIGl0ZW0gYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHJldHVybiB7QW55fVxuICAgICAqL1xuICAgIGdldEl0ZW1BdChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbaW5kZXhdLml0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY291bnQgb2YgaXRlbXMgaW4gY29sbGVjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVtJ3MgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRJdGVtSW5kZXgobmFtZSkge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgdGhpcy5lYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSBjb2xsZWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBvYmplY3QgYnkgbmFtZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTVy5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBpdGVtIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0obmFtZSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Jhd0VhY2goKGl0ZXJJdGVtLCBpLCBpdGVyTmFtZSwgaXRlbXMpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBvZiBsb29wXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgbmV3IHZhbHVlIHRvIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIG1vZGlmeVxuICAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZSBUaGUgbmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdFYWNoKChpdGVySXRlbSwgaSwgaXRlck5hbWUpPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlckl0ZW0uaXRlbSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IG9mIGxvb3BcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGl0ZW0gdG8gbmV3IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QgYmVpbmcgbW92ZWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IFRoZSBpdGVtJ3MgbmV3IGluZGV4XG4gICAgICovXG4gICAgc2V0SXRlbUluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgobmFtZSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLl9nZXRSYXdJdGVtKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9TcHJpdGUnO1xuXG4vKipcbiAqIEBjbGFzcyAgICAgICBHcm91cFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gaGllcmFyY2h5IGZvciB7QGxpbmsgQ29sbGVjdGlvbn1zXG4gKiBAZXh0ZW5kcyAgICAgQ29sbGVjdGlvblxuICogQHJlcXVpcmVzICAgIFNwcml0ZVxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3hdIFRoZSBpbml0aWFsIHggcG9zaXRpb24uIERlZmF1bHQgaXMgMC5cbiAqIEBwYXJhbSB7SW50ZWdlcn0gW3ldIFRoZSBpbml0aWFsIHkgcG9zaXRpb24uIERlZmF1bHQgaXMgMC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLmdldENvbXBvc2l0ZURlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRPcGFjaXR5XG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0T3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRSb3RhdGlvblxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI2dldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0U2NhbGVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjZ2V0WFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGFsbCBjaGlsZHJlbiByZWN1cnNpdmVseSBvbiB0b3Agb2Ygb3duIHRyYW5zZm9ybWF0aW9uIHN0YWNrXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3VwZGF0ZVxuICAgICAqIEByZXR1cm4ge0NhbnZhc1RyYW5zZm9ybX0geGZvcm0gVGhlIENhbnZhc1RyYW5zZm9ybSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZSh4Zm9ybSkge1xuICAgICAgICB4Zm9ybS5zY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG4gICAgICAgIHhmb3JtLnRyYW5zbGF0ZSh0aGlzLl94LCB0aGlzLl95KTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgeGZvcm0ucm90YXRlQWJvdXQoaXRlbS5nZXRSb3RhdGlvbigpLCB4Zm9ybS54LWl0ZW0uZ2V0WCgpLCB4Zm9ybS55LWl0ZW0uZ2V0WSgpKTtcbiAgICAgICAgICAgIGl0ZW0udXBkYXRlKHhmb3JtKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhbGwgY2hpbGRyZW4gcmVjdXJzaXZlbHkgb24gdG9wIG9mIG93biB0cmFuc2Zvcm1hdGlvbiBzdGFja1xuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNyZW5kZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHQgVGhlIDJkIGNvbnRleHQgb2JqZWN0XG4gICAgICovXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSAqPSB0aGlzLl9vcGFjaXR5O1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHRoaXMuX2NvbXBvc2l0ZTtcblxuICAgICAgICB0aGlzLmVhY2goKGl0ZW0pPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW5kZXIoY29udGV4dCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFJvdGF0aW9uXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSByb3RhdGlvbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0U2NhbGVYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRTY2FsZVgodmFsKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIEdyb3VwI3NldFNjYWxlWVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVZIHZhbHVlXG4gICAgICogQHJldHVybiB7R3JvdXB9XG4gICAgICovXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBHcm91cCNzZXRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtHcm91cH1cbiAgICAgKi9cbiAgICBzZXRYKHZhbCkge1xuICAgICAgICB0aGlzLl94ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgR3JvdXAjc2V0WVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgeSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0dyb3VwfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IGtleWNvZGVzIGZyb20gJy4vbGliL2tleWNvZGVzJztcblxuLyoqXG4gKiBAY2xhc3MgICAgICAgSW5wdXRcbiAqIEBkZXNjcmlwdGlvbiBBIG1vZHVsZSBmb3IgaGFuZGxpbmcga2V5Ym9hcmQsIG1vdXNlLCBhbmQgdG91Y2ggZXZlbnRzIG9uIHRoZSBjYW52YXNcbiAqIEBhdXRob3IgICAgICBDaHJpcyBQZXRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbnRpdHl9IGNhbnZhcyAgICAgICAgICAgICAgICAgICBUaGUgY2FudmFzIGVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aFxuICogQHBhcmFtIHtPYmplY3R9ICAgICBbb3B0c11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMuY2FudmFzRml0XSAgICAgICAgIFNldCB0byB0cnVlIGlmIHVzaW5nIGNzcyB0byBmaXQgdGhlIGNhbnZhcyBpbiB0aGUgdmlld3BvcnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgW29wdHMubGlzdGVuRm9yTW91c2VdICAgIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59ICAgIFtvcHRzLmxpc3RlbkZvclRvdWNoXSAgICBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gZm9yIHRvdWNoIGV2ZW50c1xuICogQHBhcmFtIHtCb29sZWFufSAgICBbb3B0cy5saXN0ZW5Gb3JLZXlib2FyZF0gV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGZvciBrZXlib2FyZCBldmVudHNcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMud2luZG93XSAgICAgICAgICAgIHdpbmRvdyBvYmplY3QgZm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgW29wdHMuZG9jdW1lbnRdICAgICAgICAgIGRvY3VtZW50IG9iamVjdCBmb3IgdGVzdGluZ1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NhbnZhc0ZpdCA9IG9wdHMuY2FudmFzRml0IHx8IHRydWU7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvck1vdXNlID0gb3B0cy5saXN0ZW5Gb3JNb3VzZSB8fCB0cnVlO1xuICAgICAgICB0aGlzLl9saXN0ZW5Gb3JUb3VjaCA9IG9wdHMubGlzdGVuRm9yVG91Y2ggfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvcktleWJvYXJkID0gb3B0cy5saXN0ZW5Gb3JLZXlib2FyZCB8fCB0cnVlO1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICB0aGlzLl91aUV2ZW50cyA9IHtcbiAgICAgICAgICAgIERCTF9DTElDSzogJ2RibGNsaWNrJyxcbiAgICAgICAgICAgIERCTF9UQVA6ICdkYmx0YXAnLFxuXG4gICAgICAgICAgICBEUkFHOiAnZHJhZycsXG4gICAgICAgICAgICBEUkFHX0VORDogJ2RyYWdlbmQnLFxuICAgICAgICAgICAgRFJBR19TVEFSVDogJ2RyYWdzdGFydCcsXG5cbiAgICAgICAgICAgIENMSUNLOiAnY2xpY2snLFxuICAgICAgICAgICAgVEFQOiAndGFwJyxcblxuICAgICAgICAgICAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gICAgICAgICAgICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICAgICAgICAgICAgVE9VQ0hfU1RBUlQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAgIFRPVUNIX0VORDogJ3RvdWNoZW5kJyxcblxuICAgICAgICAgICAgTU9VU0VfTU9WRTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICBUT1VDSF9NT1ZFOiAndG91Y2htb3ZlJyxcblxuICAgICAgICAgICAgS0VZX1VQOiAna2V5dXAnLFxuICAgICAgICAgICAgS0VZX0RPV046ICdrZXlkb3duJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGxpc3RlbmVycyB2YWx1ZXMgYXJlIGFycmF5cyBvZiBvYmplY3RzIGNvbnRhaW5pbmcgaGFuZGxlcnMgYW5kIChvcHRpb25hbCkgdGFyZ2V0c1xuICAgICAgICAvLyBlZzogdGhpcy5fbGlzdGVuZXJzLmtleXVwID0gW3tcbiAgICAgICAgLy8gICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7Li4ufSxcbiAgICAgICAgLy8gICAgICAgICB0YXJnZXQ6IHsgbmFtZTogJ2ZvbycsIHg6IDMyLCB5OiA2NCwgLi4ufVxuICAgICAgICAvLyAgICAgfV07XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl91aUV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3RoaXMuX3VpRXZlbnRzW2tleV1dID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9rZXljb2RlcyA9IGtleWNvZGVzO1xuICAgICAgICB0aGlzLl9jYW5EcmFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSB7fTtcbiAgICAgICAgdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEtleWJvYXJkTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yTW91c2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuRm9yVG91Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vblRpY2sgPSB0aGlzLl9vblRpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIHRoaXMuX29uVGljaywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19hZGRLZXlib2FyZExpc3RlbmVyc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZEtleWJvYXJkTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgZXZlbnRzID0gWydrZXl1cCcsICdrZXlkb3duJ107XG5cbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBtb3VzZSBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZE1vdXNlTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlbW92ZSddO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuX2hhbmRsZU1vdXNlQW5kVG91Y2guYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2FkZFRvdWNoTGlzdGVuZXJzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBbJ3RhcCcsICdkYmx0YXAnLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuICAgICAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLl9oYW5kbGVNb3VzZUFuZFRvdWNoLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgc2NhbGUgcmF0aW8gb2YgdGhlIGNhbnZhcyBiYXNlZCBvbiB3aXRoL2hlZ2h0IGF0dHJzIGFuZCBjc3Mgd2lkdGgvaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19nZXRTY2FsZUZhY3RvclxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIF9nZXRTY2FsZUZhY3RvcigpIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIGxldCBjYW52YXNXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnN0eWxlLndpZHRoKSB7XG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IHBhcnNlSW50KHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCwgMTApO1xuICAgICAgICAgICAgZmFjdG9yID0gY2FudmFzV2lkdGggLyB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTAwIC8gZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBwb2ludCBpcyBpbnNpZGUgcmVjdGFuZ2xlXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIElucHV0I19oaXRUZXN0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geCAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0geSAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib3VuZGluZ0JveCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBfaGl0VGVzdCh4LCB5LCBib3VuZGluZ0JveCkge1xuICAgICAgICByZXR1cm4geCA+PSBib3VuZGluZ0JveC5taW5YICYmIHggPD0gYm91bmRpbmdCb3gubWF4WCAmJlxuICAgICAgICAgICAgeSA+PSBib3VuZGluZ0JveC5taW5ZICYmIHkgPD0gYm91bmRpbmdCb3gubWF4WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBET00gZXZlbnRzLiBDcmVhdGVzIGN1c3RvbSBldmVudCBvYmplY3Qgd2l0aCBoZWxwZnVsIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2hhbmRsZUtleWJvYXJkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0RXZlbnQgdGhlIERPTSBpbnB1dCBldmVudCBvYmplY3RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9oYW5kbGVLZXlib2FyZChpbnB1dEV2ZW50KSB7XG4gICAgICAgIGlucHV0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQga2V5TmFtZSA9IHRoaXMuX2tleWNvZGVzW2lucHV0RXZlbnQua2V5Q29kZV07XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIGRvbUV2ZW50OiBpbnB1dEV2ZW50LFxuICAgICAgICAgICAgdHlwZTogaW5wdXRFdmVudC50eXBlLFxuICAgICAgICAgICAga2V5Q29kZTogaW5wdXRFdmVudC5rZXlDb2RlLFxuICAgICAgICAgICAga2V5TmFtZTogdHlwZW9mIGtleU5hbWUgPT09ICdvYmplY3QnICYmIGtleU5hbWUubGVuZ3RoID9cbiAgICAgICAgICAgICAgICBrZXlOYW1lWzBdIDpcbiAgICAgICAgICAgICAgICBrZXlOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLktFWV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNEb3duW2tleU5hbWVdID0gaW5wdXRFdmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5LRVlfVVA6XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2tleXNEb3duW2tleU5hbWVdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQua2V5c0Rvd24gPSB0aGlzLmdldEtleXNEb3duKCk7XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIERPTSBldmVudHMuIENyZWF0ZXMgY3VzdG9tIGV2ZW50IG9iamVjdCB3aXRoIGhlbHBmdWwgcHJvcGVydGllc1xuICAgICAqIENyZWF0ZXMgZXZlbnQgb2JqZWN0cyB3aXRoIHgveSBjb29yZGluYXRlcyBiYXNlZCBvbiBzY2FsaW5nIGFuZCBhYnNYL2Fic1kgZm9yXG4gICAgICogYWJzb2x1dGUgeC95IHJlZ2FyZGxlc3Mgb2Ygc2NhbGUgb2Zmc2V0XG4gICAgICogT25seSB1c2VzIGZpcnN0IHRvdWNoIGV2ZW50LCB0aHVzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGluZyBtdWx0aS10b3VjaFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5wdXRFdmVudCBUaGUgRE9NIGlucHV0IGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIF9oYW5kbGVNb3VzZUFuZFRvdWNoKGlucHV0RXZlbnQpIHtcbiAgICAgICAgaW5wdXRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBzY2FsZUZhY3RvciA9IHRoaXMuX2NhbnZhc0ZpdCA/IHRoaXMuX2dldFNjYWxlRmFjdG9yKCkgOiAxO1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICBkb21FdmVudDogaW5wdXRFdmVudCxcbiAgICAgICAgICAgIHR5cGU6IGlucHV0RXZlbnQudHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgICBpZiAoaW5wdXRFdmVudC5oYXNPd25Qcm9wZXJ0eSgndG91Y2hlcycpKSB7XG4gICAgICAgICAgICBldmVudC5hYnNYID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5fY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmFic1ggPSBpbnB1dEV2ZW50LnBhZ2VYIC0gdGhpcy5fY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBldmVudC5hYnNZID0gaW5wdXRFdmVudC5wYWdlWSAtIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb29yZGluYXRlIHBvc2l0aW9ucyByZWxhdGl2ZSB0byBjYW52YXMgc2NhbGluZ1xuICAgICAgICBldmVudC54ID0gTWF0aC5yb3VuZChldmVudC5hYnNYICogc2NhbGVGYWN0b3IpO1xuICAgICAgICBldmVudC55ID0gTWF0aC5yb3VuZChldmVudC5hYnNZICogc2NhbGVGYWN0b3IpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5NT1VTRV9ET1dOOlxuICAgICAgICAgICAgY2FzZSB0aGlzLl91aUV2ZW50cy5UT1VDSF9TVEFSVDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5fdWlFdmVudHMuTU9VU0VfVVA6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX0VORDpcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbkRyYWcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5fdWlFdmVudHMuRFJBR19FTkRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLk1PVVNFX01PVkU6XG4gICAgICAgICAgICBjYXNlIHRoaXMuX3VpRXZlbnRzLlRPVUNIX01PVkU6XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZWRFdmVudHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBldmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3VpRXZlbnRzLkRSQUdfU1RBUlRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlZEV2ZW50cy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl91aUV2ZW50cy5EUkFHXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgZHVwbGljYXRlIGhhbmRsZXIgaW4gdGhlIGxpc3RlbmVyIHR5b2UgYmVpbmcgYWRkZWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjX2lzRHVwbGljYXRlSGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyICBUaGUgaGFuZGxlciB0byBjaGVja1xuICAgICAqIEBwYXJhbSAge0FycmF5fSAgICBoYW5kbGVycyBUaGUgaGFuZGxlcnMgb2YgdGhlIGxpc3RlbmVyIHR5cGUgYmVpbmcgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICBsZXQgZHVwID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaGFuZGxlck9iamVjdCBvZiBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGhhbmRsZXJPYmplY3QuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHVwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFsbCBxdWV1ZWQgZXZlbnRzLiBQYXNzZXMgdGhlIGZhY3RvciBhbmQgdGlja3MgZnJvbSB7QGxpbmsgVGlja2VyfVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfb25UaWNrXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBlIFRoZSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBfb25UaWNrKGUpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgdGhpcy5fcXVldWVkRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VySGFuZGxlcnMoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcXVldWVkRXZlbnRzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZXhlY3V0ZXMgaGFuZGxlcnMgb2YgdGhlIGdpdmVuIGV2ZW50J3MgdHlwZVxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNfdHJpZ2dlckhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJpZ2dlckhhbmRsZXJzKGV2ZW50KSB7XG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJPYmplY3Qgb2YgdGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdKSB7XG5cbiAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGxldCBoaXRUZXN0ID0gdGhpcy5fdXNlckhpdFRlc3RNZXRob2QgfHwgdGhpcy5faGl0VGVzdDtcblxuICAgICAgICAgICAgICAgIGlmIChoaXRUZXN0KGV2ZW50LngsIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QudGFyZ2V0LmdldEJvdW5kaW5nQXJlYSgpKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IGhhbmRsZXJPYmplY3QudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGV2ZW50IHdhcyBib3VuZCB3aXRoIGEgdGFyZ2V0IHRyaWdnZXIgaGFuZGxlciBPTkxZIGlmIHRhcmdldCBoaXRcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlck9iamVjdC5oYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgaGFuZGxlciBmb3IgYSBjZXJ0YWluIGV2ZW50IHR5cGVcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjYWRkTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZSAgICAgVGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gaGFuZGxlciAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCB0cmlnZ2VyZWRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgW3RhcmdldF0gVGhlIHRhcmdldCB0byBjaGVjayBldmVudCB0cmlnZ2VyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgUmV0dXJucyB0cnVlIGlmIGFkZGVkIGFuZCBmYWxzZSBpZiBjYWxsYmFjayBhbHJlYWR5IGV4aXN0c1xuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHRhcmdldCkge1xuICAgICAgICBsZXQgaGFuZGxlck9iamVjdHMgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGxldCBkdXA7XG5cblxuICAgICAgICBpZiAoISBoYW5kbGVyT2JqZWN0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXZlbnQgdHlwZSBcIiR7dHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVyT2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGR1cCA9IHRoaXMuX2lzRHVwbGljYXRlSGFuZGxlcihoYW5kbGVyLCBoYW5kbGVyT2JqZWN0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWR1cCkge1xuICAgICAgICAgICAgaGFuZGxlck9iamVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaGFuZGxlciwgdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbWF0Y2hpbmcgaGFuZGxlciBpZiBmb3VuZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNyZW1vdmVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB0eXBlICAgIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gIHJlbW92ZWQgUmV0dXJucyB0cnVlIGlmIHJlbW92ZWQgYW5kIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFdmVudCB0eXBlIFwiJHt0eXBlfVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlck9iamVjdCA9IGhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJPYmplY3QuaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBrZXlzIGN1cnJlbnRseSBiZWluZyBwcmVzc2VkXG4gICAgICogZWc6IDxjb2RlPnsgTEVGVF9BUlJPVzogMzcsIFVQX0FSUk9XOiAzOCB9PC9jb2RlPlxuICAgICAqXG4gICAgICogQG1ldGhvZCBJbnB1dCNnZXRLZXlzRG93blxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRLZXlzRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNEb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB1c2VyIHRvIHNldCBhIGN1c3RvbSBoaXQgdGVzdCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgSW5wdXQjc2V0SGl0VGVzdE1ldGhvZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSB1c2VyJ3MgaGl0IHRlc3QgbWV0aG9kXG4gICAgICovXG4gICAgc2V0SGl0VGVzdE1ldGhvZChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCNzZXRIaXRUZXN0TWV0aG9kIHBhcmFtZXRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJIaXRUZXN0TWV0aG9kID0gZm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZSc7XG5cbi8qKlxuICogQGNsYXNzICAgUmVjdGFuZ2xlXG4gKiBAZXh0ZW5kcyB7QGxpbmsgU3ByaXRlfVxuICogQGRlc2MgICAgQSBzcHJpdGUgdGhhdCByZW5kZXJzIGFzIGEgcmVjdGFuZ2xlXG4gKiBAYXV0aG9yICBDaHJpcyBQZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5fZmlsbCA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5fc3Ryb2tlID0gJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9maWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgICAgdGhpcy5fZ2V0QWN0dWFsWCgpLCB0aGlzLl9nZXRBY3R1YWxZKCksXG4gICAgICAgICAgICB0aGlzLl93aWR0aCAgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVgoKSxcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0cm9rZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRBY3R1YWxYKCksIHRoaXMuX2dldEFjdHVhbFkoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCAgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVgoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgKiB0aGlzLl9nZXRBY3R1YWxTY2FsZVkoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtzZXRGaWxsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0RmlsbFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsIFRoZSBmaWxsIGNvbG9yIGhleCwgcmdiLCByZ2JhLCBldGMuXG4gICAgICovXG4gICAgc2V0RmlsbCh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2V0U3Ryb2tlIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQG1ldGhvZCBSZWN0YW5nbGUjc2V0U3Ryb2tlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWwgVGhlIHN0cm9rZSBjb2xvciBoZXgsIHJnYiwgcmdiYSwgZXRjLlxuICAgICAqL1xuICAgIHNldFN0cm9rZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fZmlsbCA9IHZhbDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTcHJpdGVcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIGNsYXNzIGZvciBwb3NpdGlvbiBiYXNlZCBvYmplY3RzXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBbeF0gVGhlIGluaXRpYWwgeCBwb3NpdGlvbi4gRGVmYXVsdCBpcyAwXG4gKiBAcGFyYW0ge0ludGVnZXJ9IFt5XSBUaGUgaW5pdGlhbCB5IHBvc2l0aW9uLiBEZWZhdWx0IGlzIDBcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl9nbG9iYWxYID0gdGhpcy5feDtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWSA9IHRoaXMuX3k7XG4gICAgICAgIHRoaXMuX3NyY1ggPSAwO1xuICAgICAgICB0aGlzLl9zcmNZID0gMDtcbiAgICAgICAgdGhpcy5fc3JjV2lkdGggPSAzMjtcbiAgICAgICAgdGhpcy5fc3JjSGVpZ2h0ID0gMzI7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gMzI7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDMyO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9nbG9iYWxTY2FsZVggPSB0aGlzLl9zY2FsZVg7XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWSA9IHRoaXMuX3NjYWxlWTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvc2l0ZSBvcGVyYXRpb24gdHlwZS4gQ2FuIGJlIHNvdXJjZS1hdG9wfHNvdXJjZS1pbnxzb3VyY2Utb3V0fHNvdXJjZS1vdmVyfGRlc3RpbmF0aW9uLWF0b3B8ZGVzdGluYXRpb24taW58ZGVzdGluYXRpb24tb3V0fGRlc3RpbmF0aW9uLW92ZXJ8bGlnaHRlcnx4b3J8Y29weVxuICAgICAgICAgKiBEZWZhdWx0IGlzICdzb3VyY2Utb3ZlcidcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlciBTcHJpdGUjX2NvbXBvc2l0ZVxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZS5nZXRDb21wb3NpdGVEZWZhdWx0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21wb3NpdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29tYmluZWQgbG9jYWwgYW5kIGdsb2JhbCBzY2FsZVhcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxTY2FsZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVggKiB0aGlzLl9nbG9iYWxTY2FsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHNjYWxlWVxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjX2dldEFjdHVhbFNjYWxlWVxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgX2dldEFjdHVhbFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWSAqIHRoaXMuX2dsb2JhbFNjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNvbWJpbmVkIGxvY2FsIGFuZCBnbG9iYWwgeFxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjX2dldEFjdHVhbFhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIF9nZXRBY3R1YWxYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feCArIHRoaXMuX2dsb2JhbFg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb21iaW5lZCBsb2NhbCBhbmQgZ2xvYmFsIHlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI19nZXRBY3R1YWxZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBfZ2V0QWN0dWFsWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3kgKyB0aGlzLl9nbG9iYWxZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGJvdW5kaW5nIGFyZWFcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0FyZWEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXhYOiB0aGlzLl9nZXRBY3R1YWxYKCkgKyAodGhpcy5fd2lkdGggICogdGhpcy5fZ2V0QWN0dWFsU2NhbGVYKCkpLFxuICAgICAgICAgICAgbWF4WTogdGhpcy5fZ2V0QWN0dWFsWSgpICsgKHRoaXMuX2hlaWdodCAqIHRoaXMuX2dldEFjdHVhbFNjYWxlWSgpKSxcbiAgICAgICAgICAgIG1pblg6IHRoaXMuX2dldEFjdHVhbFgoKSxcbiAgICAgICAgICAgIG1pblk6IHRoaXMuX2dldEFjdHVhbFkoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldENvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb3NpdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0SGVpZ2h0XG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjZ2V0T3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Zsb2F0fVxuICAgICAqL1xuICAgIGdldE9wYWNpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI2dldFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7RmxvYXR9XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVhcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTY2FsZVlcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRTcmNZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRTcmNZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3JjWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRXaWR0aFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAgICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRYXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNnZXRZXG4gICAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICAgKi9cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldENvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgY29tcG9zaXRlIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldENvbXBvc2l0ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0SGVpZ2h0XG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBoZWlnaHQgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0SGVpZ2h0KHZhbCkge1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRPcGFjaXR5XG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZhbCBUaGUgb3BhY2l0eSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZX1cbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5KHZhbCkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWwgVGhlIHJvdGF0aW9uIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3ByaXRlI3NldFNjYWxlWFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgc2NhbGVYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNjYWxlWCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0U2NhbGVZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzY2FsZVkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0U2NhbGVZKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNYXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNYIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1godmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRTcmNZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSBzcmNZIHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFNyY1kodmFsKSB7XG4gICAgICAgIHRoaXMuX3NyY1kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRXaWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbCBUaGUgd2lkdGggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGV9XG4gICAgICovXG4gICAgc2V0V2lkdGgodmFsKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQG1ldGhvZCBTcHJpdGUjc2V0Q29tcG9zaXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB4IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFgodmFsKSB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFNwcml0ZSNzZXRZXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmFsIFRoZSB5IHZhbHVlXG4gICAgICogQHJldHVybiB7U3ByaXRlfVxuICAgICAqL1xuICAgIHNldFkodmFsKSB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKHhmb3JtKSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbFNjYWxlWCA9IHhmb3JtLnNjYWxlWDtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU2NhbGVZID0geGZvcm0uc2NhbGVZO1xuICAgICAgICB0aGlzLl9nbG9iYWxYID0geGZvcm0ueDtcbiAgICAgICAgdGhpcy5fZ2xvYmFsWSA9IHhmb3JtLnk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBtZW1iZXIgU3ByaXRlLl9jb21wb3NpdGVEZWZhdWx0XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5TcHJpdGUuX2NvbXBvc2l0ZURlZmF1bHQgPSAnc291cmNlLW92ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG4iLCIvKipcbiAqIEBjbGFzcyAgICAgICBTdGFnZVxuICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW5kIGhhbmRsZXMgdGhlIGNhbnZhcyBlbGVtZW50LiBpbmNsdWRlZCBpbiB0aGUgb3B0aW9uc1xuICogICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBvcHRpb25hbCBkZXBlbmRlbmN5IGluamVjdGlvbiB1c2VkIGZvciB0ZXN0aW5nIGFnYWluc3RcbiAqICAgICAgICAgICAgICBhIHZpcnR1YWwgZG9tLlxuICogQGF1dGhvciAgICAgIENocmlzIFBldGVyc1xuICpcbiAqIEBwYXJhbSB7SW50ZWdlcn0gICAgIFt3aWR0aF0gICAgICAgICBUaGUgd2lkdGggb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgW2hlaWdodF0gICAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHNdICAgICAgICAgIFN0YWdlIG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRzLnBhcmVudEVsXSBUaGUgZWxlbWVudCB3aXRoIHdoaWNoIHRvIGF0dGFjaCB0aGUgY2FudmFzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vbmUgZ2l2ZW4gdGhlIGJvZHkgaXMgdXNlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIFtvcHRzLmJnQ29sb3JdICBUaGUgcGFyZW50IGVsZW1lbnQncyBiZyBjb2xvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdHMuZG9jdW1lbnRdIEZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0cy53aW5kb3ddICAgRm9yIHRlc3RpbmdcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIFtvcHRzLmZpbGxdICAgICBTZXQgdG8gZmFsc2UgdG8gbm90IG1heGltYWxseSBmaWxsIHZpZXdwb3J0LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl9maWxsID0gb3B0cy5maWxsID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5maWxsO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fd2luZG93ID0gb3B0cy53aW5kb3cgfHwgd2luZG93O1xuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IG9wdHMucGFyZW50RWwgfHwgdGhpcy5fZG9jdW1lbnQuYm9keTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0cy5iZ0NvbG9yO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVN0YWdlRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVN0YWdlRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuX3N0YWdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3BhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuX3N0YWdlKTtcblxuICAgICAgICB0aGlzLl92aWRlbyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fdmlkZW8pO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fc3RhZ2UuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBfcmVzaXplRWxlbWVudCBmb3Igc3RhZ2UgZWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UjX2hhbmRsZVJlc2l6ZVxuICAgICAqL1xuICAgIF9oYW5kbGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fcmVzaXplRWxlbWVudCh0aGlzLl92aWRlbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgdG8gaGFuZGxlIHJlc2l6ZSBiYXNlZCBvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI19yZXNpemVFbGVtZW50XG4gICAgICogQHBhcmFtICB7SFRNTEVudGl0eX0gZWwgVGhlIGVsZW1lbnQgdG8gcmVzaXplXG4gICAgICovXG4gICAgX3Jlc2l6ZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGwpIHtcbiAgICAgICAgICAgIGxldCB7IHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gU3RhZ2UuZmlsbChcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQobGVmdCl9cHhgO1xuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoKX1weGA7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCl9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSBTdGFnZS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldENhbnZhc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFN0YWdlI2dldFZpZGVvXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbWl6ZXMgYW4gZWxlbWVudCAod2l0aCBhc3BlY3QgcmF0aW8gaW50YWN0KSBpbiB0aGUgdmlld3BvcnQgdmlhIENTUy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuZmlsbFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHdpZHRoICAgICAgICAgIFRoZSBlbGVtZW50J3Mgb3JpZ2luYWwgd2lkdGggYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gaGVpZ2h0ICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQgYXR0cmlidXRlXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRXaWR0aCAgVGhlIHZpZXdwb3J0J3MgY3VycmVudCB3aWR0aFxuICAgICAqIEBwYXJhbSAge0ludGVnZXJ9IHZpZXdwb3J0SGVpZ2h0IFRoZSB2aWV3cG9ydCdzIGN1cnJlbnQgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgVGhlIG5ldyB0b3AsIGxlZnQsIHdpZHRoLCAmIGhlaWdodFxuICAgICAqL1xuICAgIHN0YXRpYyBmaWxsKHdpZHRoLCBoZWlnaHQsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IExBTkRTQ0FQRV9SQVRJTyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBjb25zdCBQT1JUUkFJVF9SQVRJTyAgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgSVNfTEFORFNDQVBFICAgID0gTEFORFNDQVBFX1JBVElPIDwgUE9SVFJBSVRfUkFUSU8gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHdpbkxhbmRzY2FwZVJhdGlvID0gdmlld3BvcnRIZWlnaHQgLyB2aWV3cG9ydFdpZHRoO1xuICAgICAgICBsZXQgd2luUG9ydHJhaXRSYXRpbyAgPSB2aWV3cG9ydFdpZHRoIC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFRvcCAgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKElTX0xBTkRTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKExBTkRTQ0FQRV9SQVRJTyA8IHdpbkxhbmRzY2FwZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQT1JUUkFJVF9SQVRJTyA8IHdpblBvcnRyYWl0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHZpZXdwb3J0SGVpZ2h0ICogUE9SVFJBSVRfUkFUSU87XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9ICh2aWV3cG9ydFdpZHRoIC0gb2Zmc2V0V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IG9mZnNldFdpZHRoICogTEFORFNDQVBFX1JBVElPO1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICh2aWV3cG9ydEhlaWdodCAtIG9mZnNldEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2VlcHMgc3RhZ2UgZWxlbWVudCBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgU3RhZ2UuY2VudGVyXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gd2lkdGggICAgICAgICAgVGhlIGVsZW1lbnQncyBvcmlnaW5hbCB3aWR0aCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWlnaHQgICAgICAgICBUaGUgZWxlbWVudCdzIG9yaWdpbmFsIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2aWV3cG9ydFdpZHRoICBUaGUgdmlld3BvcnQncyBjdXJyZW50IHdpZHRoXG4gICAgICogQHBhcmFtICB7SW50ZWdlcn0gdmlld3BvcnRIZWlnaHQgVGhlIHZpZXdwb3J0J3MgY3VycmVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBUaGUgdG9wIGFuZCBsZWZ0XG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih3aWR0aCwgaGVpZ2h0LCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogKHZpZXdwb3J0V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgdG9wOiAodmlld3BvcnRIZWlnaHQgLSBoZWlnaHQpIC8gMlxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzICAgICAgIFRpY2tlclxuICogQGRlc2NyaXB0aW9uIEV4ZWN1dGVzIGNhbGxiYWNrIGJhc2VkIG9uIGdpdmVuIGZwcyBhbmQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKiBAYXV0aG9yICAgICAgQ2hyaXMgUGV0ZXJzXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbc3RhcnRdICAgICAgICAgV2hldGhlciB0byBzdGFydCBvbiBpbnN0YW50aWF0ZS4gRGVmYXVsdCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzXSAgICAgICAgICBPcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLndpbmRvd10gICB3aW5kb3cgb2JqZWN0IGZvciB0ZXN0aW5nXG4gKiBAcGFyYW0ge09iamVjdH0gIFtvcHRzLmRvY3VtZW50XSBkb2N1bWVudCBvYmplY3QgZm9yIHRlc3RpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydCA9IHRydWUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl93aW5kb3cgPSBvcHRzLndpbmRvdyB8fCB3aW5kb3c7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3RpY2tzID0gMDtcblxuICAgICAgICB0aGlzLl91cGRhdGUgPSB0aGlzLl91cGRhdGUuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBjYWxsIHtAbGluayBUaWNrZXIjb25UaWNrfSBiYXNlZCBvbiB7QGxpbmsgVGlja2VyI19mcHN9LlxuICAgICAqIElmIHRoZSBjb3JyZWN0IGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgdGhlIHtAbGluayBUaWNrZXIjb25UaWNrfSBjYWxsYmFjayB3aWxsIGZpcmUgYW5kXG4gICAgICogdGhlIDxjb2RlPnRpY2s8L2NvZGU+IGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB2aWEgdGhlIDxjb2RlPmRvY3VtZW50PC9jb2RlPiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIFRpY2tlciNfdXBkYXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAobm93IC0gdGhpcy5fdGhlbikgLyAxMDAwO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIHRoaXMuX3RpY2tzICs9IDE7XG5cbiAgICAgICAgY29uc3QgZXZ0T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB0aGlzLl90aWNrc1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgZmlyZSB0aWNrIGV2ZW50cyBhbmQgZXhlY3V0ZSBjYWxsYmFja3NcbiAgICAgICAgbGV0IHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncHJldGljaycsIGV2dE9iamVjdCk7XG4gICAgICAgIHRoaXMub25QcmVUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmRpc3BhdGNoRXZlbnQodGlja0V2ZW50KTtcblxuICAgICAgICB0aGlzLm9uVGljayhkZWx0YSwgdGhpcy5fdGlja3MpO1xuICAgICAgICB0aWNrRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgdGhpcy5vblBvc3RUaWNrKGRlbHRhLCB0aGlzLl90aWNrcyk7XG4gICAgICAgIHRpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHRpY2snLCBldnRPYmplY3QpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRpY2tFdmVudCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBleGVjdXRlZCBwcmUgZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25QcmVUaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25QcmVUaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25UaWNrXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBkZWx0YSBUaGUgdGltZSBlbGFwc2VkIGJldHdlZW4gdGlja3MuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBseSBhZ2FpbnN0IGdhbWVwbGF5IGVsZW1lbnRzIGZvciBjb25zaXN0ZW50XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRpY2tzIFRoZSBhbW91bnQgb2YgdGlja3MgdGhhdCBoYXZlIGFjY3VtdWxhdGVkXG4gICAgICovXG4gICAgb25UaWNrKCkge31cblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgcG9zdCB0aWNrLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBUaWNrZXIjb25Qb3N0VGlja1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGVsdGEgVGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHRpY2tzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbHkgYWdhaW5zdCBnYW1lcGxheSBlbGVtZW50cyBmb3IgY29uc2lzdGVudFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB0aWNrcyBUaGUgYW1vdW50IG9mIHRpY2tzIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZFxuICAgICAqL1xuICAgIG9uUG9zdFRpY2soKSB7fVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSB0aWNrZXJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgVGlja2VyI3N0YXJ0XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICA4OiAnQkFDS1NQQUNFJyxcbiAgICA5OiAnVEFCJyxcbiAgICAxMzogJ0VOVEVSJyxcbiAgICAxNjogJ1NISUZUJyxcbiAgICAxNzogJ0NUUkwnLFxuICAgIDE4OiAnQUxUJyxcbiAgICAxOTogJ1BBVVNFX0JSRUFLJyxcbiAgICAyMDogJ0NBUFNfTE9DSycsXG4gICAgMjc6ICdFU0NBUEUnLFxuICAgIDMzOiAnUEFHRV9VUCcsXG4gICAgMzQ6ICdQQUdFX0RPV04nLFxuICAgIDM1OiAnRU5EJyxcbiAgICAzNjogJ0hPTUUnLFxuICAgIDM3OiAnTEVGVF9BUlJPVycsXG4gICAgMzg6ICdVUF9BUlJPVycsXG4gICAgMzk6ICdSSUdIVF9BUlJPVycsXG4gICAgNDA6ICdET1dOX0FSUk9XJyxcbiAgICA0NTogJ0lOU0VSVCcsXG4gICAgNDY6ICdERUxFVEUnLFxuICAgIDQ4OiBbMCwnKSddLFxuICAgIDQ5OiBbMSwnISddLFxuICAgIDUwOiBbMiwnQCddLFxuICAgIDUxOiBbMywnIyddLFxuICAgIDUyOiBbNCwnJCddLFxuICAgIDUzOiBbNSwnJSddLFxuICAgIDU0OiBbNiwnXiddLFxuICAgIDU1OiBbNywnJiddLFxuICAgIDU2OiBbOCwnKiddLFxuICAgIDU3OiBbOSwnKCddLFxuICAgIDY1OiAnQScsXG4gICAgNjY6ICdCJyxcbiAgICA2NzogJ0MnLFxuICAgIDY4OiAnRCcsXG4gICAgNjk6ICdFJyxcbiAgICA3MDogJ0YnLFxuICAgIDcxOiAnRycsXG4gICAgNzI6ICdIJyxcbiAgICA3MzogJ0knLFxuICAgIDc0OiAnSicsXG4gICAgNzU6ICdLJyxcbiAgICA3NjogJ0wnLFxuICAgIDc3OiAnTScsXG4gICAgNzg6ICdOJyxcbiAgICA3OTogJ08nLFxuICAgIDgwOiAnUCcsXG4gICAgODE6ICdRJyxcbiAgICA4MjogJ1InLFxuICAgIDgzOiAnUycsXG4gICAgODQ6ICdUJyxcbiAgICA4NTogJ1UnLFxuICAgIDg2OiAnVicsXG4gICAgODc6ICdXJyxcbiAgICA4ODogJ1gnLFxuICAgIDg5OiAnWScsXG4gICAgOTA6ICdaJyxcbiAgICA5MTogJ0xFRlRfV0lORE9XX0tFWScsXG4gICAgOTI6ICdSSUdIVF9XSU5ET1dfS0VZJyxcbiAgICA5MzogJ1NFTEVDVF9LRVknLFxuICAgIDk2OiAnTlVNX1BBRF8wJyxcbiAgICA5NzogJ05VTV9QQURfMScsXG4gICAgOTg6ICdOVU1fUEFEXzInLFxuICAgIDk5OiAnTlVNX1BBRF8zJyxcbiAgICAxMDA6ICdOVU1fUEFEXzQnLFxuICAgIDEwMTogJ05VTV9QQURfNScsXG4gICAgMTAyOiAnTlVNX1BBRF82JyxcbiAgICAxMDM6ICdOVU1fUEFEXzcnLFxuICAgIDEwNDogJ05VTV9QQURfOCcsXG4gICAgMTA1OiAnTlVNX1BBRF85JyxcbiAgICAxMDY6ICdOVU1fUEFEX0FTVEVSSVNLJyxcbiAgICAxMDc6ICdOVU1fUEFEX1BMVVMnLFxuICAgIDEwOTogJ05VTV9QQURfTUlOVVMnLFxuICAgIDExMTogJ05VTV9QQURfRk9XQVJEX1NMQVNIJyxcbiAgICAxMTI6ICdGMScsXG4gICAgMTEzOiAnRjInLFxuICAgIDExNDogJ0YzJyxcbiAgICAxMTU6ICdGNCcsXG4gICAgMTE2OiAnRjUnLFxuICAgIDExNzogJ0Y2JyxcbiAgICAxMTg6ICdGNycsXG4gICAgMTE5OiAnRjgnLFxuICAgIDEyMDogJ0Y5JyxcbiAgICAxMjE6ICdGMTAnLFxuICAgIDEyMjogJ0YxMScsXG4gICAgMTIzOiAnRjEyJyxcbiAgICAxNDQ6ICdOVU1fTE9DSycsXG4gICAgMTQ1OiAnU0NST0xMX0xPQ0snLFxuICAgIDE4NjogWyc7JywnOiddLFxuICAgIDE4NzogWyc9JywnKyddLFxuICAgIDE4ODogWycsJywnPCddLFxuICAgIDE4OTogWyctJywnXyddLFxuICAgIDE5MDogWycuJywnPiddLFxuICAgIDE5MTogWycvJywnPyddLFxuICAgIDE5MjogWydgJywnfiddLFxuICAgIDIxOTogWydbJywneyddLFxuICAgIDIyMDogWydcXFxcJywnfCddLFxuICAgIDIyMTogWyddJywnfSddLFxuICAgIDIyMjogWydcXCcnLCdcIiddXG59O1xuIl19
