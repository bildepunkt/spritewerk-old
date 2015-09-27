/**
 * @class Sprite
 */
import Point from './Point';

export default class Sprite extends Point {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */
    constructor() {
        this._width = 0;
        this._height = 0;
        this._rotation = 0;
    }

    /**
     * [getWidth description]
     * @return {[type]} [description]
     */
    getWidth() {
        return this._width;
    }

    /**
     * [getHeight description]
     * @return {[type]} [description]
     */
    getHeight() {
        return this._height;
    }

    /**
     * [getRotation description]
     * @return {[type]} [description]
     */
    getRotation() {
        return this._rotation;
    }

    /**
     * [setWidth description]
     * @param {[type]} val [description]
     */
    setWidth(val) {
        this._dirty = true;
        this._width = val;

        return this;
    }

    /**
     * [setHeight description]
     * @param {[type]} val [description]
     */
    setHeight(val) {
        this._dirty = true;
        this._height = val;

        return this;
    }

    /**
     * [setRotation description]
     * @param {[type]} val [description]
     */
    setRotation(val) {
        this._dirty = true;
        this._rotation = val;

        return this;
    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        if (!this._dirty) {
            return;
        }
    }
}
