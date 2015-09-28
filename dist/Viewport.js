/**
 * Creates and handles the canvas DOM element
 *
 * @class Viewport
 * @requires {Config} config
 * @requires {object} document
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

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

        this._canvas.width = this._deps.config.gameWidth;
        this._canvas.height = this._deps.config.gameHeight;
        this._canvas.style.position = 'absolute';

        this._deps.document.body.appendChild(this._canvas);
    }

    _createClass(Viewport, [{
        key: 'fit',
        value: function fit(left, top, width, height) {
            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports['default'] = Viewport;
module.exports = exports['default'];