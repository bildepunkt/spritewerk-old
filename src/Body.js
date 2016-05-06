/**
 * A physical, observable body with coordinates and size
 * @class Body
 */
export default class Body {
    constructor(x=0, y=0, width=0, height=0) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._sx = 1;
        this._sy = 1;
        this._rotation = 0;
    }

    getBoundingBox() {
        return {
            minX: this._x,
            minY: this._y,
            maxX: (this._x + this._width) * this._sx,
            maxY: (this._y + this._height) * this._sy
        };
    }

    translate(x, y) {
        this._x += x;
        this._y += y;
    }

    get x() { this._x; }

    get y() { this._y; }

    get width() { this._width; }

    get height() { this._height; }

    get sx() { this._sx; }

    get sy() { this._sy; }

    get rotation() { this._rotation; }

    set x(val) {
        this._x = val;
        return this;
    }

    set y(val) {
        this._y = val;
        return this;
    }

    set width(val) {
        this._width = val;
        return this;
    }

    set height(val) {
        this._height = val;
        return this;
    }

    set sx(val) {
        this._sx = val;
        return this;
    }

    set sy(val) {
        this._sy = val;
        return this;
    }

    set rotation(val) {
        this._rotation = val;
        return this;
    }
}