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
    render(context, xform) {
        xform.save();
        context.save();

        xform.translate(this._x, this._y);

        if (this._tiling != 'no-repeat') {
            const pattern = context.createPattern(this._image, this._tiling);
            context.rect(0, 0, this._width, this._height);
            context.fillStyle = pattern;
            context.fill();
        } else {
            context.drawImage(
                this._image,
                this._srcX,
                this._srcY,
                this._srcWidth,
                this._srcHeight,
                0, 0,
                this._width,
                this._height
            );
        }

        context.restore();
        xform.restore();
    }

    /**
     * Set the iamge to render and sets dimensions if not set
     *
     * @method Bitmap#setImage
     * @param  {String} path The image path
     * @return {Bitmap}
     */
    setImage(path) {
        let img = new Image();
        img.src = path;
        this._image = img;

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
