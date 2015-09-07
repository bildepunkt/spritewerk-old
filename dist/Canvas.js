/**
 * Creates a canvas element and provides the context's api
 *
 * @class Canvas
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
    /**
     *
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        this._deps = deps;

        this._canvas = document.createElement('canvas');
        this._canvas.width = this._deps.config.width;
        this._canvas.height = this._deps.config.height;

        this._canvas.style.position = 'absolute';

        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);
    }

    /**
     *
     */

    _createClass(Canvas, [{
        key: 'drawPt',
        value: function drawPt(x, y) {
            this._context.fillRect(x, y, 4, 4);
        }

        /**
         *
         */
    }, {
        key: 'getElement',
        value: function getElement() {
            return this._canvas;
        }
    }]);

    return Canvas;
})();

module.exports = Canvas;