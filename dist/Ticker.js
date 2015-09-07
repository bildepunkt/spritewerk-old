/**
 * Executes a given function at specified intervals
 *
 * @class Ticker
 * @requires config
 * @requires global
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = (function () {
    /**
     *
     */

    function Ticker(deps) {
        _classCallCheck(this, Ticker);

        this._deps = deps;

        this._paused = false;
        this._now = null;
        this._then = Date.now();
        this._delta = null;
        this._ticks = 0;
        this._interval = 1000 / this._deps.config.fps;

        this._update = this._update.bind(this);

        this._start();
    }

    /**
     *
     */

    _createClass(Ticker, [{
        key: "_start",
        value: function _start() {
            requestAnimationFrame(this._update);
        }

        /**
         *
         */
    }, {
        key: "_update",
        value: function _update() {
            if (this._paused) {
                return;
            }

            this._now = Date.now();
            this._delta = this._now - this._then;

            if (this._delta > this._interval) {
                // trim @then if it's more than @interval
                this._then = this._now - this._delta % this._interval;
                this._ticks += 1;

                requestAnimationFrame(this._update);

                this.onTick();
            }
        }

        /**
         *
         */
    }, {
        key: "pause",
        value: function pause() {
            this._paused = true;
        }

        /**
         *
         */
    }, {
        key: "resume",
        value: function resume() {
            this.paused = false;
        }
    }]);

    return Ticker;
})();

module.exports = Ticker;