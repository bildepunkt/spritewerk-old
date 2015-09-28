/**
 * Executes a given function at specified intervals
 *
 * @class Ticker
 * @requires {Config} config
 * @requires {object} window
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Ticker(deps) {
        _classCallCheck(this, Ticker);

        this._deps = deps;

        this._paused = false;
        this._update = this._update.bind(this);
    }

    /**
     * [_update description]
     * @return {[type]} [description]
     */

    _createClass(Ticker, [{
        key: "_update",
        value: function _update() {
            if (this._paused) {
                return;
            }

            this.onTick();

            this._deps.window.requestAnimationFrame(this._update);
        }

        /**
         * [pause description]
         * @return {[type]} [description]
         */
    }, {
        key: "pause",
        value: function pause() {
            this._paused = true;
        }

        /**
         * [resume description]
         * @return {[type]} [description]
         */
    }, {
        key: "resume",
        value: function resume() {
            this._paused = false;
            this._update();
        }

        /**
         * [start description]
         * @return {[type]} [description]
         */
    }, {
        key: "start",
        value: function start() {
            this._update();
        }
    }]);

    return Ticker;
})();

exports["default"] = Ticker;
module.exports = exports["default"];