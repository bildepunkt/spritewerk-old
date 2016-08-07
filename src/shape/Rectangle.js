import Sprite from "../Sprite";

/**
 * A sprite that renders as a rectangle
 * @class    Rectangle
 * @memberof shape
 * @extends  Sprite
 * @param {Integer} x      [description]
 * @param {Integer} y      [description]
 * @param {Integer} width  [description]
 * @param {Integer} height [description]
 */
export default class Rectangle extends Sprite {
    constructor (x, y, width, height) {
        super(x, y, width, height);

        this._fill = "#000";
        this._stroke = "";
    }

    /**
     *
     * @memberof shape
     * @method Rectangle#render
     * @param  {Object}  context The CanvasRenderingContext2D object
     */
    render (context, xform) {
        super.render(context, xform);

        if (this._fill) {
            context.fillStyle = this._fill;
            context.fillRect(0, 0, this._width, this._height);
        }

        if (this._stroke) {
            context.strokeStyle = this._stroke;
            context.strokeRect(0, 0, this._width, this._height);
        }
    }

    /**
     * @memberof shape
     * @method Rectangle#setFill
     * @param  {String} val The fill color hex, rgb, rgba, etc.
     */
    set fill(val) {
        this._fill = val;
        this._dirty = true;
    }

    /**
     * @memberof shape
     * @method Rectangle#setStroke
     * @param  {String} val The stroke color hex, rgb, rgba, etc.
     */
    set stroke(val) {
        this._stroke = val;
        this._dirty = true;
    }
}
