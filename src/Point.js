/**
 * a 2d transform
 *
 * @class Point
 */
import Trig from './lib/Trig';

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
        this._rotation = 0;
        this._rotatedX = 0;
        this._rotatedY = 0;
    }

    /**
     * [getGlobalX description]
     * @return {[type]} [description]
     */
    getGlobalX() {
        return this._x + this._parentX + this._rotatedX;
    }

    /**
     * [getGlobalY description]
     * @return {[type]} [description]
     */
    getGlobalY() {
        return this._y + this._parentY + this._rotatedY;
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
     * [setParentX description]
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
     * [ description]
     * @return {[type]} [description]
     */
    setRotation(val) {
        this._rotationY = val;

        let rotatedPt = Trig.rotatePoint(0, 0, this._x, this._y, val);

        this._rotatedX = rotatedPt.x - this._x;
        this._rotatedY = rotatedPt.y - this._y;

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
