import CanvasTransform from './lib/CanvasTransform';

/**
 * @class       Draw
 * @description Handles rendering entities onto the canvas element. Merges context
 *              object with CanvasTransform instance in the constructor.
 * @author      Chris Peters
 * @requires    CanvasTransform
 *
 * @param {HTMLElement} canvas The active canvas element
 */
export default class Draw {
    constructor(canvas) {
        this._canvas = canvas;
        this._originalContext = this._canvas.getContext('2d');
        this._canvasXform = new CanvasTransform(this._originalContext);

        this._context = this._originalContext;

        for (let method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
    }

    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * []
     *
     * @method Draw#getContext
     * @return {Object} The context object
     */
    getContext() {
        return this._context;
    }

    /**
     * [render description]
     *
     * @method Draw#render
     * @param  {Object} entity [description]
     */
    render(entity) {
        entity.render(this._context);
    }
}
