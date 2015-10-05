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
        this._deps = deps || {};

        this._paused = false;
        this._update = this._update.bind(this);

        this.raf = this._deps.window ?
            this._deps.window.requestAnimationFrame.bind(this._deps.window) :
            window.requestAnimationFrame.bind(window);
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

        this.raf(this._update);
    }

    /**
     * [onTick description]
     * @return {[type]} [description]
     */
    onTick() {
        // do awesome stuff!
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
