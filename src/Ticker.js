/**
 * Executes a given function at specified intervals
 *
 * @class Ticker
 * @requires {Config} config
 * @requires {object} window
 */
export default class Ticker {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */
    constructor(deps) {
        this._deps = deps;

        this._paused = false;
        this._update = this._update.bind(this);
    }

    /**
     * [_update description]
     * @return {[type]} [description]
     */
    _update() {
        if (this._paused) {
            return;
        }

        this.onTick();

        this._deps.window.requestAnimationFrame(this._update);
    }

    /**
     * [pause description]
     * @return {[type]} [description]
     */
    pause() {
        this._paused = true;
    }

    /**
     * [resume description]
     * @return {[type]} [description]
     */
    resume() {
        this._paused = false;
        this._update();
    }

    /**
     * [start description]
     * @return {[type]} [description]
     */
    start() {
        this._update();
    }
}
