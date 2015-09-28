/**
 * create 2D point
 *
 * @class Vector
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports["default"] = Vector;
module.exports = exports["default"];