import Sprite from './Sprite';

/**
 * @class   Bitmap
 * @extends {@link Sprite}
 * @desc    A sprite that renders an image asset
 * @author  Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor(x = 0, y = 0) {
        super(x, y);

        this._image = null;
    }

    /**
     * Render the entity via context's drawImage
     *
     * @method Bitmap#render
     * @param  {Object} context The context object
     */
    render(context) {
        context.drawImage(
            this._image,
            this._srcX,
            this._srcY,
            this._srcWidth,
            this._srcHeight,
            this._x,
            this._y,
            this._width,
            this._height
        );
    }

    /**
     * Set the iamge to render and sets dimensions if not set
     *
     * @method Bitmap#setImage
     * @param  {String} path The image path
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
}
