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
        this._imageSmoothingEnabled = true;

        this._context = this._originalContext;

        for (let method in this._canvasXform) {
            this._context[method] = this._canvasXform[method];
        }
    }

    /**
     * Clears the entire canvas and optionally fills with a color
     *
     * @method Draw#clear
     * @param  {String} [color] If passed, will fill the canvas with the color value
     */
    clear(color) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (color) {
            this._context.save();
            this._context.fillStyle = color;
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.restore();
        }
    }

    /**
     * Returns the context object
     *
     * @method Draw#getContext
     * @return {Object} The 2D context object
     */
    getContext() {
        return this._context;
    }

    /**
     * Calls an entity's render method passing the context
     *
     * @method Draw#render
     * @param  {Object} entity [description]
     */
    render(entity) {
        entity.render(this._context);
    }

    /**
     * Set the context image smoothing
     *
     * @method Draw#setImageSmoothing
     * @param  {Boolean} val The image smoothing value
     */
    setImageSmoothing(val) {
        this._imageSmoothingEnabled = val;

        return this;
    }
}
