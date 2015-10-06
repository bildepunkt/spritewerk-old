/**
 * @class Canvas
 * @requires {Viewport} viewport
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        this._deps = deps;

        this._context = this._deps.viewport.getContext();
    }

    /**
     * [clear description]
     * @return {[type]} [description]
     */

    _createClass(Canvas, [{
        key: "clear",
        value: function clear() {
            var width = this._deps.config.gameWidth;
            var height = this._deps.config.gameHeight;
            this._context.clearRect(0, 0, width, height);
        }
    }, {
        key: "drawRect",
        value: function drawRect(x, y, w, h) {
            this._context.fillRect(x, y, w, h);
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "restoreContext",
        value: function restoreContext() {
            this._context.restore();
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "saveContext",
        value: function saveContext() {
            this._context.save();
        }

        /**
         * [translateContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "translateContext",
        value: function translateContext(x, y) {
            this._context.translate(x, y);
        }
    }]);

    return Canvas;
})();

exports["default"] = Canvas;
module.exports = exports["default"];