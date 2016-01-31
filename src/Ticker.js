/**
 * @class       Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author      Chris Peters
 *
 * @param {Number}  [fps]   The desired frames per second. Default is 30
 * @param {Boolean} [start] Whether to start on instantiate. Default is true
 */
export default class Ticker {
    constructor(fps = 30, start = true) {
        this._fps = fps;
        this._paused = false;
        this._then = Date.now();
        this._ticks = 0;
        this._interval = 1000 / this._fps;

        this._update = this._update.bind(this);

        if (start) {
            this.start();
        }
    }

    /**
     * Calculates whether or not to call {@link Ticker#onTick} based on _fps
     *
     * @method Ticker#_update
     */
    _update() {
        let now = Date.now();
        let delta = now - this._then;

        if (delta > this._interval) {
            // trim @then if it's more than @interval
            this._then = now - (delta % this._interval);
            this._ticks += 1;

            this.onTick(delta / this._interval, this._ticks);
        }

        requestAnimationFrame(this._update);
    }

    /**
     * A callback executed on each tick.
     *
     * @method Ticker#onTick
     * @param {Integer} factor The time elapsed between ticks.
     *                         Multiply against gameplay elements for consistent
     *                         movement.
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onTick() {}

    /**
     * Starts the ticker
     *
     * @method Ticker#start
     */
    start() {
        requestAnimationFrame(this._update);
    }
}
