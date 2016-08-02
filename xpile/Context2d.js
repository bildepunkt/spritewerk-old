"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Context2d
 * @param {Object} context The canvas 2d context
 * @param {Xform} xform
 */

var Context2d = function () {
    function Context2d(context, xform) {
        _classCallCheck(this, Context2d);

        this.context = context;
        this.xform = xform;
        this.stack = [];
    }

    _createClass(Context2d, [{
        key: "getStack",
        value: function getStack() {
            return this.stack;
        }
    }, {
        key: "restore",
        value: function restore() {
            if (this.stack.length) {
                var matrix = this.stack.pop();
                this.xform.setMatrix(matrix);
            }

            this.context.restore();
        }
    }, {
        key: "rotate",
        value: function rotate(degrees) {
            this.xform.rotate(degrees);
            this.setTransform();
        }
    }, {
        key: "save",
        value: function save() {
            this.stack.push(this.xform.clone());
            this.context.save();
        }
    }, {
        key: "scale",
        value: function scale(sx, sy) {
            this.xform.scale(sx, sy);
            this.setTransform();
        }
    }, {
        key: "setTransform",
        value: function setTransform() {
            var m = this.xform.getMatrix();
            this.context.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
    }, {
        key: "translate",
        value: function translate(x, y) {
            this.xform.translate(x, y);
            this.setTransform();
        }
    }]);

    return Context2d;
}();

exports.default = Context2d;