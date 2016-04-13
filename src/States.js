import Preloader from './Preloader';

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
export default class States {
    constructor(canvas, ticker) {
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
    _onTick(factor, ticks) {
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
    load(state) {
        this._loading = true;

        if (this._state) {
            this._state.destroy();
        }

        this._state = state;

        if (this._state.preload) {
            Preloader.complete = ()=> {
                this._state.init();
                this._loading = false;
            }

            Preloader.load(this._state.preload);
        }
    }
}
