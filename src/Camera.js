/**
 * Display various areas of the {@link Stage}
 * @class Camera
 */
export default class Camera {
    constructor(x=0, y=0, width=0, height=0) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    translate(x, y) {
        this._x += x;
        this._y += y;
    }

    get x() { this._x; }

    get y() { this._y; }

    get width() { this._width; }

    get height() { this._height; }

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
}