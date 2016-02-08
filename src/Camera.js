/**
 * @class       Camera
 * @description Decides what gets rendered
 * @author      Chris Peters
 */
export default class Camera {
    constructor(x = 0, y = 0) {
        this._x = 0;
        this._y = 0;
    }

    /**
     * @method Camera#getX
     * @return {Integer}
     */
    getX() {
        return this._x;
    }

    /**
     * @method Camera#getY
     * @return {Integer}
     */
    getY() {
        return this._y;
    }

    /**
     * @method Camera#setX
     * @param  {Integer} val The x value
     * @return {Camera}
     */
    setX(val) {
        this._x = val;

        return this;
    }

    /**
     * @method Camera#setY
     * @param  {Integer} val The y value
     * @return {Camera}
     */
    setY(val) {
        this._y = val;

        return this;
    }
}
