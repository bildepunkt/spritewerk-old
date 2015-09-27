/**
 * a 2d transform
 *
 * @class Point
 */
export default class Point {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */
    constructor() {
        this._x = 0;
        this._y = 0;
        this._dirty = true;
    }

    /**
     * [getX description]
     * @return {[type]} [description]
     */
    getX() {
        return this._x;
    }

    /**
     * [getY description]
     * @return {[type]} [description]
     */
    getY() {
        return this._y;
    }

    /**
     * [setX description]
     * @param {[type]} val [description]
     */
    setX(val) {
        this._dirty = true;
        this._x = val;

        return this;
    }

    /**
     * [setY description]
     * @param {[type]} val [description]
     */
    setY(val) {
        this._dirty = true;
        this._y = val;

        return this;
    }
}
