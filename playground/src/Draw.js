import CanvasTransform from './lib/CanvasTransform';

/**
 * @class       Draw
 * @description Handles rendering entities onto the canvas element
 * @author      Chris Peters
 * @requires    CanvasTransform
 */
export default class Draw {
    /**
     * Merges context object with CanvasTransform instance
     *
     * @param {HTMLElement} canvas The active canvas element
     */
    constructor(canvas) {
        this._originalContext = canvas.getContext('2d');
        this._canvasXform = new CanvasTransform(this._originalContext);

        this._context = this._originalContext;

        for (let method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
    }

    /**
     * @return {Object} The context object
     */
    getContext() {
        return this._context;
    }

    /**
     * [render description]
     */
    render(entity) {
        entity.render(this._context);
    }
}
