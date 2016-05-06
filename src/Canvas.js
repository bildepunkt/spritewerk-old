/**
 * Handles rendering entities onto the canvas element
 * @class Canvas
 * @param {HTMLElement} canvas The active canvas element
 * @param {Camera}      camera The camera instance
 */
export default class Canvas {
    constructor(canvas, camera) {
        this._canvas = canvas;
        this._camera = camera;
        this._context = this._canvas.getContext("2d");

        this.setImageSmoothing(true);
    }

    /**
     * Clears the entire canvas and optionally fills with a color
     *
     * @method Canvas#clear
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
     * Offsets canvas based on camera and calls an entity's render method passing the context.
     * Saves and restores context and beginning and end of operation.
     *
     * @method Canvas#render
     * @param  {Body} entity  Any renderable entity
     * @param  {Float} factor 
     */
    render(entity, factor) {
        this._context.save();

        this._context.translate(-this._camera.x, -this._camera.y);
        entity.render(this._context, factor);

        this._context.restore();
    }

    /**
     * Set the context image smoothing
     *
     * @method Canvas#setImageSmoothing
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