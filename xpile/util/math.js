"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.degToRad = degToRad;
/**
 * Convert degrees to radians
 * @method degToRad
 * @param  {Integer} deg
 * @return {Integer}
 */
function degToRad(deg) {
  return deg * Math.PI / 180;
}