import Collection from './Collection';
import Sprite from './Sprite';

/**
 * @class       Group
 * @description Provides a transformation hierarchy for {@link Collection}s
 * @extends     Collection
 * @requires    Sprite
 * @author      Chris Peters
 *
 * @param {Integer} [x] The initial x position. Default is 0.
 * @param {Integer} [y] The initial y position. Default is 0.
 */
export default class Group extends Collection {
    constructor(x = 0, y = 0) {
        super();

        this._x = x;
        this._y = y;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._composite = Sprite.getCompositeDefault();
        this._opacity = 1;
    }

    /**
     * @method Group#getOpacity
     * @return {Float}
     */
    getOpacity() {
        return this._opacity;
    }

    /**
     * @method Group#getRotation
     * @return {Float}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     * @method Group#getScaleX
     * @return {Integer}
     */
    getScaleX() {
        return this._scaleX;
    }

    /**
     * @method Group#getScaleY
     * @return {Integer}
     */
    getScaleY() {
        return this._scaleY;
    }

    /**
     * @method Group#getX
     * @return {Integer}
     */
    getX() {
        return this._x;
    }

    /**
     * @method Group#getY
     * @return {Integer}
     */
    getY() {
        return this._y;
    }

    /**
     * Updates all children recursively on top of own transformation stack
     *
     * @method Group#update
     * @return {CanvasTransform} xform The CanvasTransform instance
     */
    update(xform) {
        xform.scale(this._scaleX, this._scaleY);
        xform.translate(this._x, this._y);

        this.each((item)=> {
            xform.rotateAbout(item.getRotation(), xform.x-item.getX(), xform.y-item.getY());
            item.update(xform);
        }, this);
    }

    /**
     * Renders all children recursively on top of own transformation stack
     *
     * @method Group#render
     * @param  {Object} context The 2d context object
     */
    render(context) {
        context.save();

        context.globalAlpha *= this._opacity;
        context.globalCompositeOperation = this._composite;

        this.each((item)=> {
            item.render(context);
        }, this);

        context.restore();
    }

    /**
     *
     * @method Group#setOpacity
     * @param  {Float} val The opacity value
     * @return {Group}
     */
    setOpacity(val) {
        this._opacity = val;

        return this;
    }

    /**
     *
     * @method Group#setRotation
     * @param  {Integer} val The rotation value
     * @return {Group}
     */
    setRotation(val) {
        this._rotation = val;

        return this;
    }

    /**
     *
     * @method Group#setScaleX
     * @param  {Integer} val The scaleX value
     * @return {Group}
     */
    setScaleX(val) {
        this._scaleX = val;

        return this;
    }

    /**
     * @method Group#setScaleY
     * @param  {Integer} val The scaleY value
     * @return {Group}
     */
    setScaleY(val) {
        this._scaleY = val;

        return this;
    }

    /**
     * @method Group#setComposite
     * @param  {Integer} val The x value
     * @return {Group}
     */
    setX(val) {
        this._x = val;

        return this;
    }

    /**
     * @method Group#setY
     * @param  {Integer} val The y value
     * @return {Group}
     */
    setY(val) {
        this._y = val;

        return this;
    }
}
