import Radio from './Radio';

/**
 * Executes callback based on requestAnimationFrame
 * @class    Ticker
 * @requires Radio
 * @param {Boolean} [start]            Whether to start on instantiate. Default is true
 * @param {Object}  [options]          Options
 * @param {Object}  [options.window]   window object for testing
 * @param {Object}  [options.document] document object for testing
 */
export default class Ticker {
    constructor(start=true, options={}) {
        this._window = options.window || window;
        this._document = options.document || document;
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
     * @method Ticker#_update
     */
    _update() {
        const now = Date.now();
        const delta = (now - this._then) / 1000;

        this._then = now;
        this._ticks += 1;

        const evtObject = {
            delta: delta,
            ticks: this._ticks
        };

        // fire tick events and execute callbacks
        this.onPreTick(delta, this._ticks);
        Radio.broadcast(this._document, 'pretick', evtObject);

        this.onTick(delta, this._ticks);
        Radio.broadcast(this._document, 'tick', evtObject);

        this.onPostTick(delta, this._ticks);
        Radio.broadcast(this._document, 'posttick', evtObject);

        this._window.requestAnimationFrame(this._update);
    }

    /**
     * A callback executed pre tick.
     * @method Ticker#onPreTick
     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
     *                        elements for consistent movement.
     */
    onPreTick() {}

    /**
     * A callback executed on each tick.
     * @method Ticker#onTick
     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
     *                        elements for consistent movement.
     */
    onTick() {}

    /**
     * A callback executed post tick.
     * @method Ticker#onPostTick
     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
     *                        elements for consistent movement.
     */
    onPostTick() {}

    /**
     * Starts the ticker
     * @method Ticker#start
     */
    start() {
        this._then = Date.now();
        this._window.requestAnimationFrame(this._update);
    }
}