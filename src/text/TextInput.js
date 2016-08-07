import Text from "./Text";
import Rectangle from "../shape/Rectangle";

/**
 * Renders strings from off-screen html textfield element into a {@link text.Text} object
 * @class    TextInput
 * @memberof text
 * @extends  Text
 * @requires Rectangle
 */
export default class TextInput extends Text {
    constructor(x = 0, y = 0, opts = {}) {
        super("", x ,y);

        this._document = opts.document || document;
        this._debug = opts.debug;

        this._lastTick = 0;
        this._blinkFrames = 30;
        this._caretShow = true;
        this._focused = false;

        this._rect = new Rectangle();

        this._textfield = this._document.getElementById("textfield");
        this._onChange = this._onChange.bind(this);
        this._textfield.addEventListener("keyup", this._onChange, false);

        if (this._debug) {
            this._textfield.style.top = "16px";
        }
    }

    /**
     *
     * @memberof text
     * @method   TextInput#_onChange
     * @param    {Object} e The event object
     * @private
     */
    _onChange(e) {
        this._value = e.target.value;
    }

    /**
     * Blurs the textfield element
     *
     * @memberof text
     * @method TextInput#blur
     */
    blur() {
        this._textfield.blur();
        this._focused = false;
    }

    /**
     *
     * @memberof text
     * @method TextInput#destroy
     */
    destroy() {
        this._textfield.removeEventListener("keyup", this._onChange, false);
    }

    /**
     * Focuses the textfield element
     *
     * @memberof text
     * @method TextInput#focus
     */
    focus() {
        this._textfield.focus();
        this._focused = true;
    }

    /**
     *
     * @memberof text
     * @method TextInput#isFocused
     * @returns {Boolean}
     */
    isFocused() {
        return this._focused;
    }

    /**
     *
     * @memberof text
     * @method TextInput#render
     * @param  {Object}  context The CanvasRenderingContext2D object
     */
    render(context, xform) {
        super.render(context, xform);

        if (tick - this._lastTick >= this._blinkFrames) {
            this._lastTick = tick;
            this._caretShow = !this._caretShow;
        }

        let textMeasurement = context.measureText(this._value);

        if (this._caretShow && this._focused) {
            context.save();
            this._rect.x = textMeasurement.width;
            this._rect.height = this._size
            this._rect.width = this._size / 4;
            this._rect.render(context);
            context.restore();
        }
    }
}
