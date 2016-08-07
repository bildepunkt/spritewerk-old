import Sprite from "../Sprite";

/**
 * Renders canvas text
 * @class    Text
 * @memberof text
 * @extends  Sprite
 * @param  {String} value="" The text value
 * @param  {Number} x=0      The x position
 * @param  {Number} y=0      The y position
 */
export default class Text extends Sprite {
    constructor (value="", x=0, y=0) {
        super(x, y);

        this._value = value;
        this._size = 16;
        this._font = "sans-serif";
        this._baseline = "top";
        this._fill = "#000";
        this._stroke = "";
        this._metrics = null;

        this._callWhenMetricsAvailable = [];
    }

    centerPivot () {
        if (this._metrics) {
            this._pivotX = (this._metrics.width / 2) * this._sx;
            this._pivotY = (this._size / 2) * this._sy;
        } else {
            this._callWhenMetricsAvailable.push("centerPivot");
        }
    }

    getBoundingBox () {
        if (this._metrics) {
            return {
                minX: this._x,
                minY: this._y,
                maxX: (this._x + this._metrics.width) * this._sx,
                maxY: (this._y + this._size) * this._sy
            };
        } else {
            this._callWhenMetricsAvailable.push("getBoundingBox");
        }
    }

    /**
     * @memberof text
     * @method Text#render
     * @param  {Object}  context The CanvasRenderingContext2D object
     */
    render (context, xform) {
        super.render(context, xform);

        if (this._dirty) {
            this._metrics = context.measureText(this._value);

            for (let fn of this._callWhenMetricsAvailable) {
                this[fn]();
            }

            // reset!
            this._callWhenMetricsAvailable = [];
        }

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

    get value () { return this._value; }

    get size () { return this._size; }

    get font () { return this._font; }

    get baseline () { return this._baseline; }

    get fill () { return this._fill; }

    get stroke () { return this._stroke; }

    set value (val) {
        this._value = val;
        this._dirty = true;
    }

    set size (val) {
        this._size = val;
        this._dirty = true;
    }

    set font (val) {
        this._font = val;
        this._dirty = true;
    }

    set baseline (val) {
        this._baseline = val;
        this._dirty = true;
    }

    set fill (val) {
        this._fill = val;
        this._dirty = true;
    }

    set stroke (val) {
        this._stroke = val;
        this._dirty = true;
    }
}
