import Preloader from './Preloader';

/**
 * A Finite State Manager (or possibly Flying Spaghetti Monster) that preloads, updates, and cleans up the various game states.
 * Accepts an object of the following schema:
<pre>{
    // optional property of paths to assets to preload
    preload: [
        'path/to/assets',
        ...
    ],
    init: function () {
        // initialize entities etc.
    },
    update: function (factor) {
        // do stuff pre tick
    },
    render: function (factor) {
        // render everything on the state's stage
    },
    destroy: function () {
        // remove event listeners
    }
}</pre>
 * @class FSM
 * @requires Preloader
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
     * Calls the current state's update function. Passes the factor from {@link Ticker}
     *
     * @method States#_onTick
     * @param  {Object} e The event object
     */
    _onPreTick(factor) {
        if (!this._loading && this._state) {
            this._canvas.update(this._state._stage, factor);
        }
    }

    /**
     * Calls the current state's render function. Passes the factor from {@link Ticker}
     *
     * @method States#_onTick
     * @param  {Object} e The event object
     */
    _onTick(factor) {
        if (!this._loading && this._state) {
            this._canvas.clear(this._state.bgColor);
            this._canvas.render(this._state._stage, factor);
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