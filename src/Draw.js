import CanvasTransform from './lib/CanvasTransform';

/**
 * @class       Draw
 * @description Handles rendering entities onto the canvas element. Merges context
 *              object with CanvasTransform instance in the constructor.
 * @author      Chris Peters
 * @requires    CanvasTransform
 *
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera
 */
export default class Draw {
    constructor(canvas, camera) {
        this._canvas = canvas;
        this._camera = camera;
        this._context = this._canvas.getContext('2d');
        this._xform = new CanvasTransform(this._context);
        this._imageSmoothingEnabled = true;


        this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
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
     * Returns the context xform object
     *
     * @method Draw#getXform
     * @return {Object} The context xform object
     */
    getXform() {
        return this._xform;
    }

    /**
     * Offsets canvas based on camera and calls an entity's render method passing the context.
     * Saves and restores context and beginning and end of operation.
     *
     * @method Draw#render
     * @param  {Object} entity [description]
     */
    render(entity) {
        this._xform.save();
        this._xform.translate(-this._camera.getX(), -this._camera.getY());

        entity.render(this._context, this._xform);

        this._xform.restore();
    }

    /**
     * Set the context image smoothing
     *
     * @method Draw#setImageSmoothing
     * @param  {Boolean} val The image smoothing value
     */
    setImageSmoothing(val) {
        this._imageSmoothingEnabled = val;
        this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
        this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;

        return this;
    }
}
