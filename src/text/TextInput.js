import Text from './Text';
import Rectangle from '../shape/Rectangle';

/**
 * @class   TextInput
 * @memberof text
 * @desc    Renders an html textfield element
 * @extends Text
 * @author  Chris Peters
 */
export default class TextInput extends Text {
    constructor(x = 0, y = 0, opts = {}) {
        super('', x ,y);

        this._document = opts.document || document;
        this._debug = opts.debug;

        this._lastTick = 0;
        this._blinkFrames = 30;
        this._karetShow = true;
        this._focused = false;

        this._rect = new Rectangle();

        this._textfield = this._document.getElementById('textfield');
        this._onChange = this._onChange.bind(this);
        this._textfield.addEventListener('keyup', this._onChange, false);

        if (this._debug) {
            this._textfield.style.top = '16px';
        }
    }

    _onChange(e) {
        this._value = e.target.value;
    }

    blur() {
        this._textfield.blur();
        this._focused = false;
    }

    destroy() {
        this._textfield.removeEventListener('keyup', this._onChange, false);
    }

    focus() {
        this._textfield.focus();
        this._focused = true;
    }

    isFocused() {
        return this._focused;
    }

    render(context, factor, tick) {
        super.render(context);

        if (tick - this._lastTick >= this._blinkFrames) {
            this._lastTick = tick;
            this._karetShow = !this._karetShow;
        }

        let textMeasurement = context.measureText(this._value);

        if (this._karetShow && this._focused) {
            context.save();
            this._rect.setX(textMeasurement.width + 1);
            this._rect.setHeight(this._size).setWidth(this._size / 4);
            this._rect.render(context);
            context.restore();
        }
    }
}
