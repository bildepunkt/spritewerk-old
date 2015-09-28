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

        this._deps.document.body.appendChild(this._canvas);
    }

    getContext() {
        return this._context;
    }
}
