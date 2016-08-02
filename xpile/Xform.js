"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require("./util/math");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Xform
 */

var Xform = function () {
    function Xform() {
        _classCallCheck(this, Xform);

        this.matrix = this.getIdentity();
    }

    _createClass(Xform, [{
        key: "clone",
        value: function clone() {
            var m = this.matrix;
            return [m[0], m[1], m[2], m[3], m[4], m[5]];
        }
    }, {
        key: "getIdentity",
        value: function getIdentity() {
            return [1, 0, 0, 1, 0, 0];
        }
    }, {
        key: "getMatrix",
        value: function getMatrix() {
            return this.matrix;
        }
    }, {
        key: "rotate",
        value: function rotate(deg) {
            var rad = (0, _math.degToRad)(deg);
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
        }
    }, {
        key: "scale",
        value: function scale(sx, sy) {
            this.matrix[0] *= sx;
            this.matrix[1] *= sx;
            this.matrix[2] *= sy;
            this.matrix[3] *= sy;
        }
    }, {
        key: "setMatrix",
        value: function setMatrix(matrix) {
            this.matrix = matrix;
        }
    }, {
        key: "translate",
        value: function translate(x, y) {
            this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
            this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
        }
    }]);

    return Xform;
}();

exports.default = Xform;