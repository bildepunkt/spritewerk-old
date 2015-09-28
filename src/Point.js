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
        this._parentX = 0;
        this._parentY = 0;
    }

    /**
     * [getGlobalX description]
     * @return {[type]} [description]
     */
    getGlobalX() {
        return this._x + this._parentX;
    }

    /**
     * [getGlobalY description]
     * @return {[type]} [description]
     */
    getGlobalY() {
        return this._y + this._parentY;
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
     * [getParentX description]
     * @return {[type]} [description]
     */
    getParentX() {
        return this._parentX;
    }

    /**
     * [getParentY description]
     * @return {[type]} [description]
     */
    getParentY() {
        return this._parentY;
    }

    /**
     * [getParentX description]
     * @return {[type]} [description]
     */
    setParentX(val) {
        this._parentX = val;

        return this;
    }

    /**
     * [getParentY description]
     * @return {[type]} [description]
     */
    setParentY(val) {
        this._parentY = val;

        return this;
    }

    /**
     * [setX description]
     * @param {[type]} val [description]
     */
    setX(val) {
        this._x = val;

        return this;
    }

    /**
     * [setY description]
     * @param {[type]} val [description]
     */
    setY(val) {
        this._y = val;

        return this;
    }
}
