import Sprite from './Sprite';

/**
 * @class   Bitmap
 * @extends {@link Sprite}
 * @desc    A sprite that renders an image asset
 * @author  Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor() {
        super();

        this._image = null;
    }

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
            this._height,
        );
    }

    /**
     * [setImage description]
     *
     * @method Bitmap#setFill
     * @param  {String} val The fill color hex, rgb, rgba, etc.
     */
    setImage(val) {
        this._image = val;

        return this
    }
}
