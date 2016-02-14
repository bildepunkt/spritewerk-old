import Sprite from './Sprite';

/**
 * @class   Rectangle
 * @extends {@link Sprite}
 * @desc    A sprite that renders as a rectangle
 * @author  Chris Peters
 */
export default class Rectangle extends Sprite {
    constructor() {
        super();

        this._fill = '#000';
        this._stroke = '';
    }

    render(context) {
        context.save();
        context.fillStyle = this._fill;
        context.fillRect(this._x, this._y, this._width, this._height);

        if (this._stroke) {
            context.strokeStyle = this._stroke;
            context.strokeRect(this._x, this._y, this._width, this._height);
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
