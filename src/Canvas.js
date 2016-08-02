/**
 * Handles rendering entities onto the canvas element
 * @class Canvas
 * @param {HTMLElement} canvas The active canvas element
 */
export default class Canvas {
    constructor (canvasEl, xform, context) {
        this.canvasEl = canvasEl;
        this.xform = xform;
        this.context = context;
    }
    
    _isVisible (entity) {
        const bb = entity.getBoundingBox();
        return (
            bb.maxX > 0 && bb.minX < this.canvasEl.width &&
            bb.maxY > 0 && bb.minY < this.canvasEl.height
        );
    }

    /**
     * Clears the entire canvas and optionally fills with a color
     * @method Canvas#clear
     * @param  {String} [color] If passed, will fill the canvas with the color value
     */
    clear(color) {
        this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

        if (color) {
            this.xform.save();
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.xform.restore();
        }
    }

    /**
     * Offsets canvas based on camera and calls an entity's render method passing the context.
     * Saves and restores context and beginning and end of operation. Resets `dirty` on entities.
     * @method Canvas#render
     * @param  {Stage} stage The base renderable group
     */
    render(stage) {
        this.xform.save();

        stage.render(this.context, this.xform);

        this.xform.restore();
    }
    
    /**
     * Set the context image smoothing
     * @method Canvas#setImageSmoothing
     * @param  {Boolean} val The image smoothing value
     */
    set imageSmoothing (val) {
        this._imageSmoothing = val;
        this.context.imageSmoothingEnabled = this._imageSmoothingEnabled;
        this.context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
        this.context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
        this.context.msImageSmoothingEnabled = this._imageSmoothingEnabled;

        return this;
    }
}
