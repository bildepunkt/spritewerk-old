import Preloader from './Preloader';

/**
 * @class       States
 * @description Preloads, updates, and cleans up the various game states
 * @author      Chris Peters
 * @requires    {@link Preloader}
 */
export default class States {
    constructor() {
        this._state;

        this._onTick = this._onTick.bind(this);
        document.addEventListener('tick', this._onTick, false);
    }

    _onTick(e) {
        if (this._state) {
            this._state.update(e.detail.factor, e.detail.ticks);
        }
    }

    /**
     * Load (and preload if necessary) a state
     * @method States#load
     * @return {State} The state to load
     */
    load(state) {
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
