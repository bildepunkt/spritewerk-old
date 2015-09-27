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
     * [translateContext description]
     * @return {[type]} [description]
     */
    translateContext(x, y) {
        this._context.translate(x, y);
    }

    /**
     * [saveContext description]
     * @return {[type]} [description]
     */
    saveContext() {
        this._context.save();
    }

    /**
     * [saveContext description]
     * @return {[type]} [description]
     */
    restoreContext() {
        this._context.restore();
    }

    /**
     * [clear description]
     * @return {[type]} [description]
     */
    clear() {
        let width = this._deps.config.width;
        let height = this._deps.config.height;
        this._context.clearRect(0, 0, width, height);
    }
}
