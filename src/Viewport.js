/**
 * Creates and handles the canvas DOM element
 *
 * @class Viewport
 * @requires {Config} config
 * @requires {object} document
 */
export default class Viewport {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */
    constructor(deps) {
        this._deps = deps;

        this._canvas = this._deps.document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._deps.config.gameWidth;
        this._canvas.height = this._deps.config.gameHeight;
        this._canvas.style.position = 'absolute';

        this._deps.document.body.appendChild(this._canvas);
    }

    fit(left, top, width, height) {
        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;
    }

    getContext() {
        return this._context;
    }
}
