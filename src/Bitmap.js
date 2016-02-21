import Sprite from './Sprite';

/**
 * @class   Bitmap
 * @extends Sprite
 * @desc    A sprite that renders an image asset
 * @author  Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor(x = 0, y = 0) {
        super(x, y);

        this._image = null;
        this._tiling = 'no-repeat';
    }

    /**
     * Render the entity via context's drawImage
     *
     * @method Bitmap#render
     * @param  {Object} context The context object
     */
    render(context) {
        context.save();

        if (this._tiling != 'no-repeat') {
            const pattern = context.createPattern(this._image, this._tiling);
            context.rect(
                this._getActualX(), this._getActualY(),
                this._width  * this._getActualScaleX(),
                this._height * this._getActualScaleY()
            );
            context.fillStyle = pattern;
            context.fill();
        } else {
            context.drawImage(
                this._image,
                this._srcX,
                this._srcY,
                this._srcWidth,
                this._srcHeight,
                this._getGlobalX(),
                this._getGlobalY(),
                this._width * this._getActualScaleX(),
                this._height * this._getActualScaleY()
            );
        }

        context.restore();
    }

    /**
     * Set the iamge to render and sets dimensions if not set
     *
     * @method Bitmap#setImage
     * @param  {String} path The image path
     * @return {Bitmap}
     */
    setImage(path) {
        this._image = new Image();
        this._image.src = path;

        if (!this._srcWidth && !this._srcWidth) {
            this._srcWidth = this._image.width;
            this._srcHeight = this._image.height;
        }

        if (!this._width && !this._height) {
            this._width = this._image.width;
            this._height = this._image.height;
        }

        return this
    }

    /**
     * Choose how to tile the image. Can be <code>repeat</code>, <code>repeat-x</code>
     * <code>repeat-y</code> or <code>no-repeat</code>. Default is <code>no-repeat</code>.
     *
     * @method Bitmap#setTiling
     * @param  {String} val The tiling value
     * @return {Bitmap}
     */
    setTiling(val) {
        this._tiling = val;

        return this;
    }
}
