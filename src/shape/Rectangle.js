import Sprite from '../Sprite';

/**
 * @class    Rectangle
 * @memberof shape
 * @extends  Sprite
 * @desc     A sprite that renders as a rectangle
 * @author   Chris Peters
 */
export default class Rectangle extends Sprite {
    constructor(x = 0, y = 0) {
        super(x, y);

        this._fill = '#000';
        this._stroke = '';
    }

    /**
     *
     * @memberof shape
     * @method Rectangle#render
     * @param  {Object}  context The CanvasRenderingContext2D object
     * @param  {Integer} factor  The 0-1-based model of elapsed time
     * @param  {Integer} ticks   Total elapsed ticks
     */
    render(context, factor, ticks) {
        context.save();
        super.render(context, factor, ticks);

        if (this._fill) {
            context.fillStyle = this._fill;
            context.fillRect(0, 0, this._width, this._height);
        }

        if (this._stroke) {
            context.strokeStyle = this._stroke;
            context.strokeRect(0, 0, this._width, this._height);
        }

        context.restore();
    }

    /**
     * [setFill description]
     *
     * @memberof shape
     * @method Rectangle#setFill
     * @param  {String} val The fill color hex, rgb, rgba, etc.
     */
    setFill(val) {
        this._fill = val;

        return this;
    }

    /**
     * [setStroke description]
     *
     * @memberof shape
     * @method Rectangle#setStroke
     * @param  {String} val The stroke color hex, rgb, rgba, etc.
     */
    setStroke(val) {
        this._stroke = val;

        return this;
    }
}
