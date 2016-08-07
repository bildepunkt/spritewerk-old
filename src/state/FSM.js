import Preloader from "../Preloader";

/**
 * A Finite State Manager (or possibly Flying Spaghetti Monster) that preloads, updates, and cleans up the various game states.
 * Accepts an object of the following schema:
<code>{
    // optional property of paths to assets to preload
    preload: [
        "path/to/assets",
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
}</code>
 * @class FSM
 * @param {Canvas}    canvas    A Canvas instance
 * @param {Ticker}    ticker    A Ticker instance
 * @param {Spritewerk} spritewerk The spritewerk instance
 */
export default class FSM {
    constructor(canvas, ticker, spritewerk) {
        this._canvas = canvas;
        this._ticker = ticker;
        this._spritewerk = spritewerk;
        this._loading = false;
        this._states = [];

        this._ticker.onPreTick = this._onPreTick.bind(this);
        this._ticker.onTick = this._onTick.bind(this);
    }

    /**
     * Calls the current state's update function. Passes the factor from {@link Ticker}
     *
     * @method FSM#_onTick
     * @param  {Float} factor The time delta
     */
    _onPreTick(factor) {
        if (!this._loading && this._mounted) {
            this._mounted.state.update(factor);
        }
    }

    /**
     * Calls the current state's render function.
     * @method FSM#_onTick
     */
    _onTick() {
        if (!this._loading && this._mounted) {
            this._canvas.clear(this._mounted.state.bgColor);
            this._canvas.render(this._mounted.state.stage);
        }
    }

    /**
     * Add a state to the states list
     * @method FSM#add
     * @param  {State}  state  The new state instance
     * @param  {String} name   The state name
     * @param  {...Any} [args] The arguments for the constructor
     */
    add(State, name, ...args) {
        this._states[name] = {
            state: new State(this._spritewerk, args),
            args
        };
    }

    /**
     * If another state is loaded, destroy it, then set up (and preload if necessary) the named state
     * @method FSM#load
     * @param {String} name The name of the state to load
     */
    load(name) {
        this._loading = true;

        if (this._mounted) {
            this._mounted.state.destroy(this._spritewerk);
        }

        if (this._states[name]) {
            this._mounted = this._states[name];
        } else {
            throw new Error(`No state found with the name "${name}"`);
        }

        if (this._mounted.state.preload.length) {
            Preloader.complete = ()=> {
                this._mounted.state.init(this._spritewerk);
                this._loading = false;
            }

            Preloader.load(this._mounted.state.preload);
        } else {
            this._loading = false;
            this._mounted.state.init(this._spritewerk);
        }
    }
}
