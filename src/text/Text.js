import Sprite from '../Sprite';

/**
 * @class    Text
 * @memberof text
 * @desc     Renders canvas text
 * @extends  Sprite
 * @author   Chris Peters
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

    /**
     * Returns current text value
     * 
     * @memberof text
     * @method   Text#getValue
     * @returns  {String}
     */
    getValue() {
        return this._value;
    }

    /*getTextWidth() {
    	return
    }*/

    /**
     * [setFill description]
     *
     * @memberof text
     * @method   Text#setFill
     * @param    {String} val The fill color hex, rgb, rgba, etc.
     */
    setFill(val) {
        this._fill = val;
    }

    /**
     * [setStroke description]
     *
     * @memberof text
     * @method   Text#setStroke
     * @param    {String} val The stroke color hex, rgb, rgba, etc.
     */
    setStroke(val) {
        this._stroke = val;
    }

    /**
     *
     * @memberof text
     * @method   Text#setValue
     * @param    {String} val The desired string value
     */
    setValue(val) {
        this._value = val;
    }

    /**
     *
     * @memberof text
     * @method Text#render
     * @param  {Object}  context The CanvasRenderingContext2D object
     * @param  {Integer} factor  The 0-1-based model of elapsed time
     * @param  {Integer} ticks   Total elapsed ticks
     */
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
