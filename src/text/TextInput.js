import Sprite from '../Sprite';

/**
 * @class   TextInput
 * @desc    Renders an html textfield element
 * @extends Sprite
 * @author  Chris Peters
 */
default exports class TextInput extends Sprite {
    constructor(size, font, x, y, opts = {}) {
        super(x, y);

        this._document = opts.document || document;

        this._value = '';
        this._size = 12;
        this._font = 'sans';
        this._fill = '#000';
        this._stroke = '';
        this._textfield = this._document.getElementById('textfield');
        this._onChange = this._onChange.bind(this);
        this._textfield.addEventListener('change', this._onChange, false);
    }

    _onChange(e) {
        this._value = e.target.value;
    }

    blur() {
        this._textfield.blur();
    }

    destroy() {
        this._textfield.removeEventListener('change', this._onChange, false);
    }

    focus() {
        this._textfield.focus();
    }

    getValue() {
        return this._value;
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
        this._stroke = val;
    }

    setValue(val) {
        this._value = val;
    }

    render(context) {
        context.save();
        super.render(context);

        context.font = `{this._size}px {this._font}`;

        if (this._fill) {
            context.fillStyle = this._fill;
            context.fillText(this._value, 0, 0);
        }

        if (this._stroke) {
            context.strokeStyle = this._stroke;
            context.strokeText(this._value, 0, 0);
        }

        context.restore();
    }
}
