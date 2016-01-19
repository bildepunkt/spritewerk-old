/**
 * @class       Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author      Chris Peters
 */
export default class Ticker {
    /**
     * @param {Number}  [fps]   The desired frames per second
     * @param {Boolean} [start] Whether to start on instantiate
     */
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
     *
     */
    _update() {
        if (this._paused) {
            return;
        }

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
     *
     */
    onTick() {}

    /**
     *
     */
    pause() {
        this._paused = true;
    }

    /**
     *
     */
    resume() {
        this.paused = false;
    }

    /**
     *
     */
    start() {
        requestAnimationFrame(this._update);
    }
}
