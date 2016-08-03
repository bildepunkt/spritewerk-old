/**
 * The base class for display objects. Sprite is an observable, physical body with coordinates and size
 * @class Sprite
 * @param {Number} x=0      [description]
 * @param {Number} y=0      [description]
 * @param {Number} width=0  [description]
 * @param {Number} height=0 [description]
 */
class Sprite {
    constructor (x=0, y=0, width=0, height=0) {
        this._x = x;
        this._y = y;
        this._pivotX = 0;
        this._pivotY = 0;
        this._width = width;
        this._height = height;
        this._sx = 1;
        this._sy = 1;
        this._rotation = 0;
        this._opacity = 1;
        this._composite = Sprite.SOURCE_OVER;
        this._visible = true;
        this._tweens = [];
        this._hitBox = null;
        // used to safely cache expensive operations.
        // Set to true on each `set` and cleared after each Scene render
        this._dirty = true;
        // aquired from ./Scene#render
        this.parentTransforms = null;

        this._uuid = Sprite.uuidCount++;
    }

    /**
     * @method Sprite#addTween
     * @param  {Tween} tween A new tween instance
     */
    addTween (tween) {
        this._tweens.push(tween);
    }

    render (context, xform) {
        context.globalAlpha *= this.opacity;

        if (this.composite !== "source-over") {
            context.globalCompositeOperation = this.composite;
        }
    }

    update () {
        for (let i = 0, len = this._tweens.length; i < len; i++) {
            let tween = this._tweens[i];
            tween.update(this);

            if (tween.isComplete()) {
                this._tweens.splice(i, 1);
            }
        }
    }

    get composite() { return this._composite; }

    get opacity() { return this._opacity; }

    get x() { return this._x; }

    get y() { return this._y; }

    get width() { return this._width; }

    get height() { return this._height; }

    get sx() { return this._sx; }

    get sy() { return this._sy; }

    get rotation() { return this._rotation; }

    get visible() { return this._visible; }

    get uuid() { return this._uuid; }

    set composite(val) {
        switch (val) {
            case Sprite.SOURCE_OVER:
            case Sprite.SOURCE_IN:
            case Sprite.SOURCE_OUT:
            case Sprite.SOURCE_ATOP:
            case Sprite.DESTINATION_OVER:
            case Sprite.DESTINATION_IN:
            case Sprite.DESTINATION_OUT:
            case Sprite.DESTINATION_ATOP:
            case Sprite.LIGHTER:
            case Sprite.COPY:
            case Sprite.XOR:
            case Sprite.MULTIPLY:
            case Sprite.SCREEN:
            case Sprite.OVERLAY:
            case Sprite.DARKEN:
            case Sprite.LIGHTEN:
            case Sprite.COLOR_DODGE:
            case Sprite.COLOR_BURN:
            case Sprite.HARD_LIGHT:
            case Sprite.SOFT_LIGHT:
            case Sprite.DIFFERENCE:
            case Sprite.EXCLUSION:
            case Sprite.HUE:
            case Sprite.SATURATION:
            case Sprite.COLOR:
            case Sprite.LUMINOSITY:
                this._composite = val;
                break;
            default:
                throw new Error("Sprite#composite: value must be one of globalCompositeOperation enum.");
        }

        this._dirty = true;
    }

    set opacity(val) {
        this._opacity = val;
        this._dirty = true;
    }

    set x(val) {
        this._x = val;
        this._dirty = true;
    }

    set y(val) {
        this._y = val;
        this._dirty = true;
    }

    set pivotX(val) {
        this._pivotX = val;
        this._dirty = true;
    }

    set pivotY(val) {
        this._pivotY = val;
        this._dirty = true;
    }

    set width(val) {
        this._width = val;
        this._dirty = true;
    }

    set height(val) {
        this._height = val;
        this._dirty = true;
    }

    set sx(val) {
        this._sx = val;
        this._dirty = true;
    }

    set sy(val) {
        this._sy = val;
        this._dirty = true;
    }

    set rotation(val) {
        this._rotation = val;
        this._dirty = true;
    }

    set visible(val) {
        this._visible = val;
        this._dirty = true;
    }
}

Sprite.uuidCount = 0;
Sprite.SOURCE_OVER = "source-over";
Sprite.SOURCE_IN = "source-in";
Sprite.SOURCE_OUT = "source-out";
Sprite.SOURCE_ATOP = "source-atop";
Sprite.DESTINATION_OVER = "destination-over";
Sprite.DESTINATION_IN = "destination-in";
Sprite.DESTINATION_OUT = "destination-out";
Sprite.DESTINATION_ATOP = "destination-atop";
Sprite.LIGHTER = "lighter";
Sprite.COPY = "copy";
Sprite.XOR = "xor";
Sprite.MULTIPLY = "multiply";
Sprite.SCREEN = "screen";
Sprite.OVERLAY = "overlay";
Sprite.DARKEN = "darken";
Sprite.LIGHTEN = "lighten";
Sprite.COLOR_DODGE = "color-dodge";
Sprite.COLOR_BURN = "color-burn";
Sprite.HARD_LIGHT = "hard-light";
Sprite.SOFT_LIGHT = "soft-light";
Sprite.DIFFERENCE = "difference";
Sprite.EXCLUSION = "exclusion";
Sprite.HUE = "hue";
Sprite.SATURATION = "saturation";
Sprite.COLOR = "color";
Sprite.LUMINOSITY = "luminosity";

export default Sprite;
