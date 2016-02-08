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
    update: function (factor, ticks) {
        // do stuff on every tick
    },
    destroy: function () {
        // remove event listeners
    }
}</pre>
 * @author      Chris Peters
 * @requires    {@link Preloader}
 *
 * @param {Object} [state] The initial state
 */
export default class States {
    constructor(state) {
        this._onTick = this._onTick.bind(this);
        document.addEventListener('tick', this._onTick, false);

        if (state) {
            this.load(state);
        }
    }

    /**
     * Calls the current state's update function. Passes the factor and ticks from {@link Ticker}
     *
     * @method States#_onTick
     * @param  {Object} e The event object
     */
    _onTick(e) {
        if (this._state) {
            this._state.update(e.detail.factor, e.detail.ticks);
        }
    }

    /**
     * Set up (and preload if necessary) a state
     *
     * @method States#load
     * @return {State} The state to load
     */
    load(state) {
        if (this._state) {
            this._state.destroy();
        }

        this._state = state;

        if (this._state.preload) {
            Preload.complete = function () {
                this._state.init();
            };

            Preloader.load(this._state.preload);
        }
    }

    /**
     * Remove event listeners
     *
     * @method State#destroy
     */
    destroy() {
        document.removeEventListener('tick', this._onTick, false);
    }
}
