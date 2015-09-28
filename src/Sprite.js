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
        super();

        this._width = 0;
        this._height = 0;
        this._rotation = 0;
    }

    /**
     * [getHeight description]
     * @return {[type]} [description]
     */
    getHeight() {
        return this._height;
    }

    /**
     * [getWidth description]
     * @return {[type]} [description]
     */
    getWidth() {
        return this._width;
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
        this._width = val;

        return this;
    }

    /**
     * [setHeight description]
     * @param {[type]} val [description]
     */
    setHeight(val) {
        this._height = val;

        return this;
    }

    /**
     * [setRotation description]
     * @param {[type]} val [description]
     */
    setRotation(val) {
        this._rotation = val;

        return this;
    }
}
