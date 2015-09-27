(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Provides configuration properties
 *
 * @class Config
 * @param {object} [options]
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config =
/**
 * [constructor description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.pixelSize = 4;
    this.width = 120;
    this.height = 100;

    for (var option in options) {
        this[option] = options[option];
    }
};

module.exports = Config;
},{}],2:[function(require,module,exports){
/**
 * @class Sprite
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = (function () {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */

    function Sprite() {
        _classCallCheck(this, Sprite);

        this._x = 0;
        this._y = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._rotation = 0;
        this._dirty = true;
    }

    /**
     * [getX description]
     * @return {[type]} [description]
     */

    _createClass(Sprite, [{
        key: "getX",
        value: function getX() {
            return this._x;
        }

        /**
         * [getY description]
         * @return {[type]} [description]
         */
    }, {
        key: "getY",
        value: function getY() {
            return this._y;
        }

        /**
         * [getOffsetX description]
         * @return {[type]} [description]
         */
    }, {
        key: "getOffsetX",
        value: function getOffsetX() {
            return this._offsetX;
        }

        /**
         * [getOffsetY description]
         * @return {[type]} [description]
         */
    }, {
        key: "getOffsetY",
        value: function getOffsetY() {
            return this._offsetY;
        }

        /**
         * [getRotation description]
         * @return {[type]} [description]
         */
    }, {
        key: "getRotation",
        value: function getRotation() {
            return this._rotation;
        }

        /**
         * [setX description]
         * @param {[type]} val [description]
         */
    }, {
        key: "setX",
        value: function setX(val) {
            this._dirty = true;
            this._x = val;

            return this;
        }

        /**
         * [setY description]
         * @param {[type]} val [description]
         */
    }, {
        key: "setY",
        value: function setY(val) {
            this._dirty = true;
            this._y = val;

            return this;
        }

        /**
         * [setOffsetX description]
         * @param {[type]} val [description]
         */
    }, {
        key: "setOffsetX",
        value: function setOffsetX(val) {
            this._dirty = true;
            this._offsetX = val;

            return this;
        }

        /**
         * [setOffsetY description]
         * @param {[type]} val [description]
         */
    }, {
        key: "setOffsetY",
        value: function setOffsetY(val) {
            this._dirty = true;
            this._offsetY = val;

            return this;
        }

        /**
         * [setRotation description]
         * @param {[type]} val [description]
         */
    }, {
        key: "setRotation",
        value: function setRotation(val) {
            this._dirty = true;
            this._rotation = val;

            return this;
        }

        /**
         * [render description]
         * @return {[type]} [description]
         */
    }, {
        key: "render",
        value: function render() {
            if (!this._dirty) {
                return;
            }
        }
    }]);

    return Sprite;
})();

module.exports = Sprite;
},{}],3:[function(require,module,exports){
/**
 * create 2D point
 *
 * @class Vector
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector =
/**
 * [constructor description]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @return {[type]}   [description]
 */
function Vector(x, y) {
  _classCallCheck(this, Vector);

  this.x = x || 0;
  this.y = y || 0;
};

module.exports = Vector;
},{}],4:[function(require,module,exports){
/**
 * Creates a canvas element and provides the context's api
 *
 * @class Viewport
 * @requires config
 * @requires document
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Viewport = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Viewport(deps) {
        _classCallCheck(this, Viewport);

        this._deps = deps;

        this._canvas = this._deps.document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        var size = this._deps.config.pixelSize;
        this._canvas.width = this._deps.config.width * size;
        this._canvas.height = this._deps.config.height * size;

        this._deps.document.body.appendChild(this._canvas);
    }

    /**
     * [getPointOffset description]
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     * @return {[type]}   [description]
     */

    _createClass(Viewport, [{
        key: 'getPointOffset',
        value: function getPointOffset(x, y) {
            var size = this._deps.config.pixelSize;

            return {
                x: Math.round(x) * size - size / 2,
                y: Math.round(y) * size - size / 2
            };
        }

        /**
         * [drawPoint description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
    }, {
        key: 'drawPoint',
        value: function drawPoint(x, y) {
            var size = this._deps.config.pixelSize;
            var pointOffset = this.getPointOffset(x, y);

            this._context.fillRect(pointOffset.x, pointOffset.y, size, size);
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: 'saveContext',
        value: function saveContext(entity) {
            this._context.save();

            this._context.translate(entity.getX(), entity.getY());
            //this._context.fillStyle = entity.getFill();
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: 'restoreContext',
        value: function restoreContext() {
            this._context.restore();
        }

        /**
         * [clear description]
         * @return {[type]} [description]
         */
    }, {
        key: 'clear',
        value: function clear() {
            var size = this._deps.config.pixelSize;
            var width = this._deps.config.width;
            var height = this._deps.config.height;
            this._context.clearRect(0, 0, width * size, height * size);
        }
    }]);

    return Viewport;
})();

module.exports = Viewport;
},{}],5:[function(require,module,exports){
/**
 * A line made up of two 2d vectors
 *
 * @class Line
 * @requires {Viewport} viewport
 * @requires {Trig} Trig
 * @extends {Sprite}
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = require('../Sprite');
var Bresenham = require('../lib/Bresenham');
var Trig = require('../lib/Trig');

var Line = (function (_Sprite) {
    _inherits(Line, _Sprite);

    /**
     * [constructor description]
     * @return {[type]} [description]
     */

    function Line(deps) {
        _classCallCheck(this, Line);

        _get(Object.getPrototypeOf(Line.prototype), 'constructor', this).call(this, deps);

        this._deps = deps;

        this._points = [];
    }

    /**
     * [setPoints description]
     * @param {[type]} ptA [description]
     * @param {[type]} ptB [description]
     */

    _createClass(Line, [{
        key: 'setPoints',
        value: function setPoints(ptA, ptB) {
            this._points = [ptA === null ? this._ptA : ptA, ptB === null ? this._ptB : ptB];

            return this;
        }

        /**
         * [getPoints description]
         * @return {[type]} [description]
         */
    }, {
        key: 'getPoints',
        value: function getPoints() {
            return [this._ptA, this._ptB];
        }

        /**
         * [render description]
         * @return {[type]} [description]
         */
    }, {
        key: 'render',
        value: function render() {
            _get(Object.getPrototypeOf(Line.prototype), 'render', this).call(this);

            this._deps.viewport.saveContext(this);

            var pt = undefined;
            var nextPt = undefined;

            this._points.forEach((function (val, i) {
                nextPt = this._points[i + 1];

                if (nextPt) {
                    pt = Object.assign({}, val);
                    nextPt = Object.assign({}, nextPt);

                    if (this._rotation !== 0) {
                        pt = Trig.rotatePoint(0, 0, pt.x, pt.y, this._rotation);
                    }

                    Bresenham.calculate(pt, nextPt, this._deps.viewport.drawPoint.bind(this._deps.viewport));
                }
            }).bind(this));

            this._deps.viewport.restoreContext();
        }
    }]);

    return Line;
})(Sprite);

module.exports = Line;
},{"../Sprite":2,"../lib/Bresenham":7,"../lib/Trig":8}],6:[function(require,module,exports){
/**
 * A renderable point the same size as Config.pixelSize
 *
 * @class Point
 * @requires {Viewport} viewport
 * @extends {Sprite}
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = require('../Sprite');

var Point = (function (_Sprite) {
  _inherits(Point, _Sprite);

  /**
   * [constructor description]
   * @return {[type]} [description]
   */

  function Point(deps) {
    _classCallCheck(this, Point);

    _get(Object.getPrototypeOf(Point.prototype), 'constructor', this).call(this, deps);

    this._deps = deps;
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */

  _createClass(Point, [{
    key: 'render',
    value: function render() {
      this._deps.viewport.drawPoint(this._x, this._y);
    }
  }]);

  return Point;
})(Sprite);

module.exports = Point;
},{"../Sprite":2}],7:[function(require,module,exports){
/**
 * Use Bresenham's formula to calculate the points between points
 *
 * @class Bresenham
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bresenham = (function () {
    function Bresenham() {
        _classCallCheck(this, Bresenham);
    }

    _createClass(Bresenham, null, [{
        key: "calculate",

        /**
         * [calculate description]
         * @param  {[type]} ptA [description]
         * @param  {[type]} ptB [description]
         * @return {[type]}     [description]
         */
        value: function calculate(ptA, ptB, callback) {
            var dx = Math.abs(ptB.x - ptA.x);
            var sx = ptA.x < ptB.x ? 1 : -1;
            var dy = Math.abs(ptB.y - ptA.y);
            var sy = ptA.y < ptB.y ? 1 : -1;
            var err = (dx > dy ? dx : -dy) / 2;
            var e2 = undefined;

            var xTotal = Math.abs(ptB.x - ptA.x);
            var yTotal = Math.abs(ptB.y - ptA.y);

            while (xTotal >= 0 || yTotal >= 0) {
                callback(ptA.x, ptA.y);

                e2 = err;

                if (e2 > -dx) {
                    err -= dy;
                    ptA.x += sx;
                }

                if (e2 < dy) {
                    err += dx;
                    ptA.y += sy;
                }

                xTotal--;
                yTotal--;
            }
        }
    }]);

    return Bresenham;
})();

module.exports = Bresenham;
},{}],8:[function(require,module,exports){
/**
 * A util for calculating trigonometric equations
 *
 * @class Trig
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trig = (function () {
    function Trig() {
        _classCallCheck(this, Trig);
    }

    _createClass(Trig, [{
        key: "_translatePointByAngle",

        /**
         * [_translatePointByAngle description]
         * @param  {[type]} originX [description]
         * @param  {[type]} originY [description]
         * @param  {[type]} pointX  [description]
         * @param  {[type]} pointY  [description]
         * @param  {[type]} angle   [description]
         * @return {[type]}         [description]
         */
        value: function _translatePointByAngle(originX, originY, pointX, pointY, angle) {
            return {
                x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
                y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
            };
        }

        /**
         * [rotatePointByRadius description]
         * @param  {[type]} originX [description]
         * @param  {[type]} originY [description]
         * @param  {[type]} radius  [description]
         * @param  {[type]} angle   [description]
         * @return {[type]}         [description]
         */
    }], [{
        key: "getPointByRadius",
        value: function getPointByRadius(originX, originY, radius, angle) {
            var pointX = originX;
            // start @radius units up from origin
            var pointY = originY - radius;

            angle = this.getRadiansFromDegrees(angle);

            return this._translatePointByAngle(originX, originY, pointX, pointY, angle);
        }

        /**
         * [rotatePoint description]
         * @param  {[type]} originX [description]
         * @param  {[type]} originY [description]
         * @param  {[type]} pointX  [description]
         * @param  {[type]} pointY  [description]
         * @param  {[type]} angle   [description]
         * @return {[type]}         [description]
         */
    }, {
        key: "rotatePoint",
        value: function rotatePoint(originX, originY, pointX, pointY, angle) {
            angle = this.getRadiansFromDegrees(angle);

            return this._translatePointByAngle(originX, originY, pointX, pointY, angle);
        }

        /**
         * [getRadiansFromDegrees description]
         * @param  {[type]} deg [description]
         * @return {[type]}     [description]
         */
    }, {
        key: "getRadiansFromDegrees",
        value: function getRadiansFromDegrees(deg) {
            return deg * Math.PI / 180;
        }
    }]);

    return Trig;
})();

module.exports = Trig;
},{}],9:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Viewport = require('../../dist/Viewport');
var Config = require('../../dist/Config');
var Line = require('../../dist/geometry/Line');
var Point = require('../../dist/geometry/Point');
var Vector = require('../../dist/Vector');

var Main = function Main() {
    _classCallCheck(this, Main);

    var config = new Config();
    var viewport = new Viewport({
        config: config,
        document: document
    });

    var pt = new Point({
        viewport: viewport
    });
    pt.render();

    var line = new Line({
        viewport: viewport
    });
    line.setPoints(new Vector(4, 4), new Vector(6, 6));
    line.render();
};

new Main();

},{"../../dist/Config":1,"../../dist/Vector":3,"../../dist/Viewport":4,"../../dist/geometry/Line":5,"../../dist/geometry/Point":6}]},{},[9]);
