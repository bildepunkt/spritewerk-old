import Text from './Text';

/**
 * @class   TextInput
 * @desc    Renders an html textfield element
 * @extends Text
 * @author  Chris Peters
 */
default exports class TextInput extends Text {
    constructor(size, font, x, y, opts = {}) {
        super();

        this._document = opts.document || document;

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
}
