/**
 * @class       Sprite
 * @description Base class for position based objects
 * @author      Chris Peters
 *
 * @param {Integer} [x] The initial x position. Default is 0
 * @param {Integer} [y] The initial y position. Default is 0
 */
class Sprite {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this._srcX = 0;
        this._srcY = 0;
        this._srcWidth = 32;
        this._srcHeight = 32;
        this._width = 32;
        this._height = 32;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = Sprite._compositeDefault;
        this._opacity = 1;
    }

    /**
     * @method Sprite.getCompositeDefault
     * @return {String}
     */
    static getCompositeDefault() {
        return Sprite._compositeDefault;
    }

    /**
     * @return {Object} The bounding area
     */
    getBoundingArea() {
        return {
            maxX: this._x + this._width,
            maxY: this._y + this._height,
            minX: this._x,
            minY: this._y
        };
    }

    /**
     * @method Sprite#getComposite
     * @return {String}
     */
    getComposite() {
        return this._composite;
    }

    /**
     * @method Sprite#getHeight
     * @return {Integer}
     */
    getHeight() {
        return this._height;
    }

    /**
     * @method Sprite#getOpacity
     * @return {Float}
     */
    getOpacity() {
        return this._opacity;
    }

    /**
     * @method Sprite#getRotation
     * @return {Float}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     * @method Sprite#getScaleX
     * @return {Integer}
     */
    getScaleX() {
        return this._scaleX;
    }

    /**
     * @method Sprite#getScaleY
     * @return {Integer}
     */
    getScaleY() {
        return this._scaleY;
    }

    /**
     * @method Sprite#getSrcX
     * @return {Integer}
     */
    getSrcX() {
        return this._srcX;
    }

    /**
     * @method Sprite#getSrcY
     * @return {Integer}
     */
    getSrcY() {
        return this._srcY;
    }

    /**
     * @method Sprite#getWidth
     * @return {Integer}
     */
    getWidth() {
        return this._width;
    }

    /**
     * @method Sprite#getX
     * @return {Integer}
     */
    getX() {
        return this._x;
    }

    /**
     * @method Sprite#getY
     * @return {Integer}
     */
    getY() {
        return this._y;
    }

    /**
     *
     * @method Sprite#setComposite
     * @param  {Integer} val The composite value
     * @return {Sprite}
     */
    setComposite(val) {
        this._composite = val;

        return this;
    }

    /**
     *
     * @method Sprite#setHeight
     * @param  {Integer} val The height value
     * @return {Sprite}
     */
    setHeight(val) {
        this._height = val;

        return this;
    }

    /**
     *
     * @method Sprite#setOpacity
     * @param  {Float} val The opacity value
     * @return {Sprite}
     */
    setOpacity(val) {
        this._opacity = val;

        return this;
    }

    /**
     *
     * @method Sprite#setRotation
     * @param  {Integer} val The rotation value
     * @return {Sprite}
     */
    setRotation(val) {
        this._rotation = val;

        return this;
    }

    /**
     *
     * @method Sprite#setScaleX
     * @param  {Integer} val The scaleX value
     * @return {Sprite}
     */
    setScaleX(val) {
        this._scaleX = val;

        return this;
    }

    /**
     *
     * @method Sprite#setScaleY
     * @param  {Integer} val The scaleY value
     * @return {Sprite}
     */
    setScaleY(val) {
        this._scaleY = val;

        return this;
    }

    /**
     *
     * @method Sprite#setSrcX
     * @param  {Integer} val The srcX value
     * @return {Sprite}
     */
    setSrcX(val) {
        this._srcX = val;

        return this;
    }

    /**
     *
     * @method Sprite#setSrcY
     * @param  {Integer} val The srcY value
     * @return {Sprite}
     */
    setSrcY(val) {
        this._srcY = val;

        return this;
    }

    /**
     *
     * @method Sprite#setWidth
     * @param  {Integer} val The width value
     * @return {Sprite}
     */
    setWidth(val) {
        this._width = val;

        return this;
    }

    /**
     *
     * @method Sprite#setComposite
     * @param  {Integer} val The x value
     * @return {Sprite}
     */
    setX(val) {
        this._x = val;

        return this;
    }

    /**
     *
     * @method Sprite#setY
     * @param  {Integer} val The y value
     * @return {Sprite}
     */
    setY(val) {
        this._y = val;

        return this;
    }
}

/**
 * @member Sprite._compositeDefault
 * @type {String}
 */
Sprite._compositeDefault = 'source-over';

export default Sprite;
