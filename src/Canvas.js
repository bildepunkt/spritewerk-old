/**
 * @class Canvas
 * @requires {Viewport} viewport
 */
export default class Canvas {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */
    constructor(deps) {
        this._deps = deps;

        this._context = this._deps.viewport.getContext();
    }

    /**
     * [clear description]
     * @return {[type]} [description]
     */
    clear() {
        let width = this._deps.config.gameWidth;
        let height = this._deps.config.gameHeight;
        this._context.clearRect(0, 0, width, height);
    }

    drawRect(x, y, w, h) {
        this._context.fillRect(x, y, w, h);
    }

    /**
     * [saveContext description]
     * @return {[type]} [description]
     */
    restoreContext() {
        this._context.restore();
    }

    /**
     * [saveContext description]
     * @return {[type]} [description]
     */
    saveContext() {
        this._context.save();
    }

    /**
     * [translateContext description]
     * @return {[type]} [description]
     */
    translateContext(x, y) {
        this._context.translate(x, y);
    }
}
