import Sprite from '../Sprite';

/**
 * @class   Text
 * @desc    Renders an html textfield element
 * @extends Sprite
 * @author  Chris Peters
 */
export default class Text extends Sprite {
    constructor(value = '', x = 0, y = 0) {
    	super(x, y);

        this._value = value;
        this._size = 16;
        this._font = 'sans-serif';
        this._baseline = 'top';
        this._fill = '#000';
        this._stroke = '';
    }

    getValue() {
        return this._value;
    }

    /*getTextWidth() {
    	return
    }*/

    /**
     * [setFill description]
     *
     * @method Text#setFill
     * @param  {String} val The fill color hex, rgb, rgba, etc.
     */
    setFill(val) {
        this._fill = val;
    }

    /**
     * [setStroke description]
     *
     * @method Text#setStroke
     * @param  {String} val The stroke color hex, rgb, rgba, etc.
     */
    setStroke(val) {
        this._stroke = val;
    }

    setValue(val) {
        this._value = val;
    }

    render(context) {
        super.render(context);

        context.font = `${this._size}px ${this._font}`;
        context.textBaseline = this._baseline;

        if (this._fill) {
            context.fillStyle = this._fill;
            context.fillText(this._value, 0, 0);
        }

        if (this._stroke) {
            context.strokeStyle = this._stroke;
            context.strokeText(this._value, 0, 0);
        }
    }
}
