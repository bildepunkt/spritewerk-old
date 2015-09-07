/**
 * Executes a given function at specified intervals
 *
 * @class Ticker
 * @requires config
 * @requires global
 */
class Ticker {
    /**
     *
     */
    constructor(deps) {
        this._deps = deps;

        this._paused = false;
        this._now = null;
        this._then = Date.now();
        this._delta = null;
        this._ticks = 0;
        this._interval = 1000 / this._deps.config.fps;

        this._update = this._update.bind(this);

        this._start();
    }

    /**
     *
     */
    _start() {
        requestAnimationFrame(this._update);
    }

    /**
     *
     */
    _update() {
        if (this._paused) {
            return;
        }

        this._now = Date.now();
        this._delta = this._now - this._then;
        
        if (this._delta > this._interval) {
            // trim @then if it's more than @interval
            this._then = this._now - (this._delta % this._interval);
            this._ticks += 1;

            requestAnimationFrame(this._update);

            this.onTick();
        }
    }

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
}

module.exports = Ticker;
