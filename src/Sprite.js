const SOURCE_OVER = "source-over";
const SOURCE_IN = "source-in";
const SOURCE_OUT = "source-out";
const SOURCE_ATOP = "source-atop";
const DESTINATION_OVER = "destination-over";
const DESTINATION_IN = "destination-in";
const DESTINATION_OUT = "destination-out";
const DESTINATION_ATOP = "destination-atop";
const LIGHTER = "lighter";
const COPY = "copy";
const XOR = "xor";
const MULTIPLY = "multiply";
const SCREEN = "screen";
const OVERLAY = "overlay";
const DARKEN = "darken";
const LIGHTEN = "lighten";
const COLOR_DODGE = "color-dodge";
const COLOR_BURN = "color-burn";
const HARD_LIGHT = "hard-light";
const SOFT_LIGHT = "soft-light";
const DIFFERENCE = "difference";
const EXCLUSION = "exclusion";
const HUE = "hue";
const SATURATION = "saturation";
const COLOR = "color";
const LUMINOSITY = "luminosity";

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
        this._composite = "source-over";
        this._visible = true;
        this._tweens = [];
        this._hitBox = null;
        // used to safely cache expensive operations. Set to true on each `set` and cleared after each `render`
        this._dirty = true;

        // set hitBox to BB initially
        this.setHitBox(0, 0, this._width, this._height);

        this._uuid = Sprite.uuidCount++;
    }

    /**
     * @method Sprite#addTween
     * @param  {Tween} tween A new tween instance
     */
    addTween (tween) {
        this._tweens.push(tween);
    }

    centerPivot () {
        this._pivotX = (this._width / 2) * this._sx;
        this._pivotY = (this._height / 2) * this._sy;
    }

    getBoundingBox () {
        return {
            minX: this._x,
            minY: this._y,
            maxX: (this._x + this._width) * Math.abs(this._sx),
            maxY: (this._y + this._height) * Math.abs(this._sy)
        };
    }

    getHitBox () {
        const hb = this._hitBox;
        hb.width = hb.width !== 0 ? hb.width : this._width;
        hb.height = hb.height !== 0 ? hb.height : this._height;

        return {
            minX: this._x + hb.x,
            minY: this._y + hb.y,
            maxX: (this._x + hb.x + hb.width) * Math.abs(this._sx),
            maxY: (this._y + hb.y + hb.height) * Math.abs(this._sy)
        };
    }

    setHitBox (x, y, width, height) {
        this._hitBox = { x, y, width, height };
    }

    translate (x, y) {
        this._x += (typeof x === "number") ? x : 0;
        this._y += (typeof y === "number") ? y : 0;
    }

    render (context, xform) {
        if (this.opacity !== 1) {
            context.globalAlpha = this.opacity;
        }

        if (this.composite !== "source-over") {
            context.globalCompositeOperation = this.composite;
        }

        let px = Math.floor(this._pivotX);
        let py = Math.floor(this._pivotY);

        xform.translate(Math.floor(this._x), Math.floor(this._y));
        xform.translate(px, py);

        if (this.rotation !== 0) {
            xform.rotate(this.rotation);
        }

        if (this.sx !== 1 || this.sy !== 1) {
            xform.scale(this.sx, this.sy);
        }

        xform.translate(-px, -py);
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
            case SOURCE_OVER:
            case SOURCE_IN:
            case SOURCE_OUT:
            case SOURCE_ATOP:
            case DESTINATION_OVER:
            case DESTINATION_IN:
            case DESTINATION_OUT:
            case DESTINATION_ATOP:
            case LIGHTER:
            case COPY:
            case XOR:
            case MULTIPLY:
            case SCREEN:
            case OVERLAY:
            case DARKEN:
            case LIGHTEN:
            case COLOR_DODGE:
            case COLOR_BURN:
            case HARD_LIGHT:
            case SOFT_LIGHT:
            case DIFFERENCE:
            case EXCLUSION:
            case HUE:
            case SATURATION:
            case COLOR:
            case LUMINOSITY:
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

export default Sprite;
