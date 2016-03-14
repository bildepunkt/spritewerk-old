import Sprite from '../Sprite';

/**
 * @class   Rectangle
 * @extends {@link Sprite}
 * @desc    A sprite that renders as a rectangle
 * @author  Chris Peters
 */
export default class Rectangle extends Sprite {
    constructor(x = 0, y = 0) {
        super(x, y);

        this._fill = '#000';
        this._stroke = '';
    }

    render(context) {
        context.save();
        super.render(context);

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
     * @method Rectangle#setFill
     * @param  {String} val The fill color hex, rgb, rgba, etc.
     */
    setFill(val) {
        this._fill = val;
    }

    /**
     * [setStroke description]
     *
     * @method Rectangle#setStroke
     * @param  {String} val The stroke color hex, rgb, rgba, etc.
     */
    setStroke(val) {
        this._fill = val;
    }
}
