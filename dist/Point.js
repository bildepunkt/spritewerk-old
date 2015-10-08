/**
 * a 2d transform
 *
 * @class Point
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libTrig = require('./lib/Trig');

var _libTrig2 = _interopRequireDefault(_libTrig);

var Point = (function () {
  /**
   * [constructor description]
   * @return {[type]} [description]
   */

  function Point() {
    _classCallCheck(this, Point);

    this._x = 0;
    this._y = 0;
    this._parentX = 0;
    this._parentY = 0;
    this._rotation = 0;
    this._rotatedX = 0;
    this._rotatedY = 0;
  }

  /**
   * [getGlobalX description]
   * @return {[type]} [description]
   */

  _createClass(Point, [{
    key: 'getGlobalX',
    value: function getGlobalX() {
      return this._x + this._parentX + this._rotatedX;
    }

    /**
     * [getGlobalY description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getGlobalY',
    value: function getGlobalY() {
      return this._y + this._parentY + this._rotatedY;
    }

    /**
     * [getX description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getX',
    value: function getX() {
      return this._x;
    }

    /**
     * [getY description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getY',
    value: function getY() {
      return this._y;
    }

    /**
     * [setParentX description]
     * @return {[type]} [description]
     */
  }, {
    key: 'setParentX',
    value: function setParentX(val) {
      this._parentX = val;

      return this;
    }

    /**
     * [getParentY description]
     * @return {[type]} [description]
     */
  }, {
    key: 'setParentY',
    value: function setParentY(val) {
      this._parentY = val;

      return this;
    }

    /**
     * [ description]
     * @return {[type]} [description]
     */
  }, {
    key: 'setRotation',
    value: function setRotation(val) {
      this._rotationY = val;

      var rotatedPt = _libTrig2['default'].rotatePoint(0, 0, this._x, this._y, val);

      this._rotatedX = rotatedPt.x - this._x;
      this._rotatedY = rotatedPt.y - this._y;

      return this;
    }

    /**
     * [setX description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setX',
    value: function setX(val) {
      this._x = val;

      return this;
    }

    /**
     * [setY description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setY',
    value: function setY(val) {
      this._y = val;

      return this;
    }
  }]);

  return Point;
})();

exports['default'] = Point;
module.exports = exports['default'];