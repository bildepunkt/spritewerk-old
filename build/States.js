'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Preloader = require('./Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       States
 * @description Preloads, updates, and cleans up the various game states
 *              Accepts an object of the following schema:
 <pre>{
    // optional property of paths to assets to preload
    preload: [
        'path/to/assets',
        ...
    ],
    init: function () {
        // initialize entities etc.
    },
    render: function (factor, ticks) {
        // do stuff on every tick
    },
    destroy: function () {
        // remove event listeners
    }
}</pre>
 * @author      Chris Peters
 * @requires    {@link Preloader}
 *
 * @param {Canvas} canvas A Canvas instance
 * @param {Ticker} ticker A ticker instance
 */

var States = function () {
    function States(canvas, ticker) {
        _classCallCheck(this, States);

        this._canvas = canvas;
        this._ticker = ticker;
        this._loading = false;

        this._ticker.onTick = this._onTick.bind(this);
    }

    /**
     * Calls the current state's update function. Passes the factor and ticks from {@link Ticker}
     *
     * @method States#_onTick
     * @param  {Object} e The event object
     */


    _createClass(States, [{
        key: '_onTick',
        value: function _onTick(factor, ticks) {
            if (!this._loading && this._state) {
                this._canvas.clear(this._state.bgColor);
                this._canvas.render(this._state, factor, ticks);
            }
        }

        /**
         * Set up (and preload if necessary) a state
         *
         * @method States#load
         * @return {State} The state to load
         */

    }, {
        key: 'load',
        value: function load(state) {
            var _this = this;

            this._loading = true;

            if (this._state) {
                this._state.destroy();
            }

            this._state = state;

            if (this._state.preload) {
                _Preloader2.default.complete = function () {
                    _this._state.init();
                    _this._loading = false;
                };

                _Preloader2.default.load(this._state.preload);
            }
        }

        /**
         * Remove event listeners
         *
         * @method State#destroy
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            document.removeEventListener('tick', this._onTick, false);
        }
    }]);

    return States;
}();

exports.default = States;