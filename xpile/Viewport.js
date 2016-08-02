"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Viewport
 */

var Viewport = function Viewport(parent, width, height) {
    _classCallCheck(this, Viewport);

    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    parent.appendChild(this.canvas);
};

exports.default = Viewport;