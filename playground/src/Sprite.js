/**
 * @class       Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 */
class Sprite {
    /**
     *
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this._srcX = 0;
        this._srcY = 0;
        this._width = 32;
        this._height = 32;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

    static getCompositeDefault() {
        return Sprite._compositeDefault;
    }

    /**
     * @return {Object}
     */
    getBoundingBox() {
        return {
            maxX: this._x + this._width,
            maxY: this._y + this._height,
            minX: this._x,
            minY: this._y
        };
    }

    /**
     * @return {String}
     */
    getComposite() {
        return this._composite;
    }

    /**
     * @return {String}
     */
    getHeight() {
        return this._height;
    }

    /**
     * @return {Float}
     */
    getOpacity() {
        return this._opacity;
    }

    /**
     * @return {Float}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     * @return {Integer}
     */
    getScaleX() {
        return this._scaleX;
    }

    /**
     * @return {Integer}
     */
    getScaleY() {
        return this._scaleY;
    }

    /**
     * @return {Integer}
     */
    getSrcX() {
        return this._srcX;
    }

    /**
     * @return {Integer}
     */
    getSrcY() {
        return this._srcY;
    }

    /**
     * @return {Integer}
     */
    getWidth() {
        return this._width;
    }

    /**
     * @return {Integer}
     */
    getX() {
        return this._x;
    }

    /**
     * @return {Integer}
     */
    getY() {
        return this._y;
    }

    setComposite(val) {
        this._composite = val;

        return this;
    }

    setHeight(val) {
        this._height = val;

        return this;
    }

    setOpacity(val) {
        this._opacity = val;

        return this;
    }

    setRotation(val) {
        this._rotation = val;

        return this;
    }

    setScaleX(val) {
        this._scaleX = val;

        return this;
    }

    setScaleY(val) {
        this._scaleY = val;

        return this;
    }

    setSrcX(val) {
        this._srcX = val;

        return this;
    }

    setSrcY(val) {
        this._srcY = val;

        return this;
    }

    setWidth(val) {
        this._width = val;

        return this;
    }

    setX(val) {
        this._x = val;

        return this;
    }

    setY(val) {
        this._y = val;

        return this;
    }
}

/**
 * @type {String}
 * @static
 */
Sprite._compositeDefault = 'source-over';

export default Sprite;
