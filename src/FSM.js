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
export default class FSM {
    constructor(canvas, ticker) {
        this._canvas = canvas;
        this._ticker = ticker;
        this._loading = false;
        this._states = [];

        this._ticker.onTick = this._onTick.bind(this);
    }

    /**
     * Calls the current state's update function. Passes the factor from {@link Ticker}
     *
     * @method FSM#_onTick
     * @param  {Object} e The event object
     */
    _onPreTick(factor) {
        if (!this._loading && this._state) {
            this._canvas.update(this._state.stage, factor);
        }
    }

    /**
     * Calls the current state's render function. Passes the factor from {@link Ticker}
     *
     * @method FSM#_onTick
     * @param  {Object} e The event object
     */
    _onTick(factor) {
        if (!this._loading && this._state) {
            this._canvas.clear(this._state.bgColor);
            this._canvas.render(this._state.stage, factor);
        }
    }

    /**
     * Add a state to the states list
     * @method FSM#add
     * @param  {State}  state The added state
     * @param  {String} name  The state name
     * @param  {...Any} args  Arguments to pass to the state constructor
     */
    add(State, name, ...args) {
        this._states[name] = new State(args);
    }

    /**
     * If another state is loaded, destroy it, then set up (and preload if necessary) the named state
     *
     * @method FSM#load
     * @param {String} name The name of the state to load
     */
    load(name) {
        this._loading = true;

        if (this._state) {
            this._state.destroy();
        }

        if (this._states[name]) {
            this._state = this._states[name];
        } else {
            throw new Error(`No state found with the name "${name}"`);
        }

        if (this._state.preload) {
            Preloader.complete = ()=> {
                this._state.init();
                this._loading = false;
            }

            Preloader.load(this._state.preload);
        }
    }
}