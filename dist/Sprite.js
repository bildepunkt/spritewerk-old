/**
 * @class Sprite
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Point2 = require('./Point');

var _Point3 = _interopRequireDefault(_Point2);

var Sprite = (function (_Point) {
  _inherits(Sprite, _Point);

  /**
   * [constructor description]
   * @return {[type]} [description]
   */

  function Sprite() {
    _classCallCheck(this, Sprite);

    _get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).call(this);

    this._width = 0;
    this._height = 0;
    this._rotation = 0;
  }

  /**
   * [getHeight description]
   * @return {[type]} [description]
   */

  _createClass(Sprite, [{
    key: 'getHeight',
    value: function getHeight() {
      return this._height;
    }

    /**
     * [getWidth description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this._width;
    }

    /**
     * [getRotation description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this._rotation;
    }

    /**
     * [setWidth description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setWidth',
    value: function setWidth(val) {
      this._width = val;

      return this;
    }

    /**
     * [setHeight description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setHeight',
    value: function setHeight(val) {
      this._height = val;

      return this;
    }

    /**
     * [setRotation description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setRotation',
    value: function setRotation(val) {
      this._rotation = val;

      return this;
    }
  }]);

  return Sprite;
})(_Point3['default']);

exports['default'] = Sprite;
module.exports = exports['default'];