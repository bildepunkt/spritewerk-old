import Sprite from './../Sprite';

/**
 * @class   Bitmap
 * @memberof bitmap
 * @extends Sprite
 * @desc    A sprite that renders an image asset
 * @author  Chris Peters
 */
export default class Bitmap extends Sprite {
    constructor(x = 0, y = 0) {
        super(x, y);

        this._imageLoaded = false;
        this._image = null;
        this._tiling = 'no-repeat';
        this._animations = {};
    }

    /**
     * @method Bitmap#addAnimation
     * @param {String}    name      The animation reference name
     * @param {Animation} animation The animation instance
     */
    addAnimation(name, animation) {
        this._animations[name] = animation;
    }

    /**
     * @method Bitmap#playAnimation
     * @param {String} name The name of the animation to play
     */
    playAnimation(name) {
        this._playingAnimation = name;
        this._animations[name].play();
    }

    /**
     * @method Bitmap#stopAnimation
     */
    stopAnimation() {
        this._playingAnimation = undefined;
        this._animations[name].stop();
    }

    /**
     * Render the entity via context's drawImage
     *
     * @method Bitmap#render
     * @param  {Object}  context The context object
     * @param  {Integer} factor  The 0-1-based model of elapsed time
     * @param  {Integer} ticks   Total elapsed ticks
     */
    render(context, factor, ticks) {
        if (!this._imageLoaded) {
            return;
        }

        if (this._playingAnimation) {
            const { srcX, srcY } = this._animations[this._playingAnimation].update(ticks);
            this._srcX = srcX;
            this._srcY = srcY;
        }
        
        context.save();
        super.render(context);

        if (this._tiling != 'no-repeat') {
            // TODO cache pattern object
            const pattern = context.createPattern(this._image, this._tiling);
            context.rect(
                0, 0,
                this._width  * this._scaleX,
                this._height * this._scaleY
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
                0, 0,
                this._width * this._scaleX,
                this._height * this._scaleY
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
        var image = new Image();

        image.onload = ()=> {
            this._image = image;

            if (!this._srcWidth && !this._srcHeight) {
                this._srcWidth = this._image.width;
                this._srcHeight = this._image.height;
            }

            if (!this._width && !this._height) {
                this._width = this._image.width;
                this._height = this._image.height;
            }

            this._imageLoaded = true;
        };

        image.src = path;

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
