/**
 * @class       Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author      Chris Peters
 *
 * @param {Boolean} [start]         Whether to start on instantiate. Default is true
 * @param {Object}  [opts]          Options
 * @param {Object}  [opts.window]   window object for testing
 * @param {Object}  [opts.document] document object for testing
 */
export default class Ticker {
    constructor(start = true, opts = {}) {
        this._window = opts.window || window;
        this._document = opts.document || document;
        this._then = Date.now();
        this._ticks = 0;

        this._update = this._update.bind(this);

        if (start) {
            this._then = Date.now();
            this.start();
        }
    }

    /**
     * Calculates whether or not to call {@link Ticker#onTick} based on {@link Ticker#_fps}.
     * If the correct amount of time has passed the {@link Ticker#onTick} callback will fire and
     * the <code>tick</code> event will be dispatched via the <code>document</code> object.
     *
     * @method Ticker#_update
     */
    _update() {
        const now = Date.now();
        const delta = (now - this._then) / 1000;

        this._then = now;
        this._ticks += 1;

        const evtObject = {
            detail: {
                delta: delta,
                ticks: this._ticks
            }
        };

        // create and fire tick events and execute callbacks
        let tickEvent = new CustomEvent('pretick', evtObject);
        this.onPreTick(delta, this._ticks);
        this._document.dispatchEvent(tickEvent);

        this.onTick(delta, this._ticks);
        tickEvent = new CustomEvent('tick', evtObject);
        this._document.dispatchEvent(tickEvent);

        this.onPostTick(delta, this._ticks);
        tickEvent = new CustomEvent('posttick', evtObject);
        this._document.dispatchEvent(tickEvent);

        requestAnimationFrame(this._update);
    }

    /**
     * A callback executed pre each tick.
     *
     * @method Ticker#onPreTick
     * @param {Integer} delta The time elapsed between ticks.
     *                        Multiply against gameplay elements for consistent
     *                        movement.
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onPreTick() {}

    /**
     * A callback executed on each tick.
     *
     * @method Ticker#onTick
     * @param {Integer} delta The time elapsed between ticks.
     *                        Multiply against gameplay elements for consistent
     *                        movement.
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onTick() {}

    /**
     * A callback executed post tick.
     *
     * @method Ticker#onPostTick
     * @param {Integer} delta The time elapsed between ticks.
     *                        Multiply against gameplay elements for consistent
     *                        movement.
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onPostTick() {}

    /**
     * Starts the ticker
     *
     * @method Ticker#start
     */
    start() {
        this._then = Date.now();
        requestAnimationFrame(this._update);
    }
}
