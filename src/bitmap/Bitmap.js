import Sprite from "../Sprite";

/**
 * A sprite that renders an image asset
 * @class    Bitmap
 * @memberof bitmap
 * @extends  Sprite
 */
export default class Bitmap extends Sprite {
    constructor (x, y, width, height, image) {
        super(x, y, width, height);

        this._srcX = 0;
        this._srcY = 0;
        this._srcWidth = 0;
        this._srcHeight = 0;
        this._imageLoaded = false;
        this._image = null;
        this._tiling = "no-repeat";
        this._animations = {};

        if (image) {
            this.image = image;
        }
    }

    /**
     * @method Bitmap#addAnimation
     * @param {String}    name      The animation reference name
     * @param {Animation} animation The animation instance
     */
    addAnimation (name, animation) {
        this._animations[name] = animation;
    }

    /**
     * image onload callback
     * @method Bitmap#onLoaded
     */
    onLoaded () {}

    /**
     * @method Bitmap#playAnimation
     * @param {String} name The name of the animation to play
     */
    playAnimation (name, loop) {
        this._playingAnimation = name;
        this._animations[name].play(loop);
    }

    /**
     * @method Bitmap#stopAnimation
     */
    stopAnimation () {
        this._playingAnimation = undefined;
        this._animations[name].stop();
    }

    /**
     * Render the entity via context's drawImage
     * @method Bitmap#render
     * @param {Object} context The context object
     */
    render (context, xform) {
        if (!this._imageLoaded) {
            return;
        }

        super.render(context, xform);

        if (this._tiling !== "no-repeat") {
            if (this._dirty) {
                this._pattern = context.createPattern(this._image, this._tiling);
            }

            context.rect(
                0, 0,
                this._width  * this._sx,
                this._height * this._sy
            );
            context.fillStyle = this._pattern;
            context.fill();
        } else {
            context.drawImage(
                this._image,
                this._srcX,
                this._srcY,
                this._srcWidth,
                this._srcHeight,
                0, 0,
                this._width * this._sx,
                this._height * this._sy
            );
        }
    }

    update (factor) {
        if (this._playingAnimation) {
            const { srcX, srcY } = this._animations[this._playingAnimation].update();
            this._srcX = srcX;
            this._srcY = srcY;
        }
    }

    /**
     * Set the iamge to render and sets dimensions if not set
     *
     * @method Bitmap#setImage
     * @param  {String} path The image path
     * @return {Bitmap}
     */
    set image(path) {
        let self = this;

        this._imageLoaded = false;
        this._image = new Image();

        this._image.onload = ()=> {
            if (!self._srcWidth && !self._srcHeight) {
                self._srcWidth = self._image.width;
                self._srcHeight = self._image.height;
            }

            if (!self._width && !self._height) {
                self._width = self._image.width;
                self._height = self._image.height;
            }

            self._imageLoaded = true;
            self.onLoaded();
        };

        this._image.src = path;

        this._dirty = true;
    }

    /**
     * Choose how to tile the image. Can be <code>repeat</code>, <code>repeat-x</code>
     * <code>repeat-y</code> or <code>no-repeat</code>. Default is <code>no-repeat</code>.
     *
     * @method Bitmap#setTiling
     * @param  {String} val The tiling value
     */
    set tiling(val) {
        switch (val) {
            case "repeat":
            case "repeat-x":
            case "repeat-y":
            case "no-repeat":
                this._tiling = val;
                break;
            default:
                throw new Error(
                    "Bitmap#setTiling: argument must be either \"repeat\", \"repeat-x\", \"repeat-y\", or \"no-repeat\"."
                );
        }

        this._dirty = true;
    }

    get srcX () { return this._srcX; }

    get srcY () { return this._srcY; }

    get srcWidth () { return this._srcWidth; }

    get srcHeight () { return this._srcHeight; }

    set srcX (val) {
        this._srcX = val;
        this._dirty = true;
    }

    set srcY (val) {
        this._srcY = val;
        this._dirty = true;
    }

    set srcWidth (val) {
        this._srcWidth = val;
        this._dirty = true;
    }

    set srcHeight (val) {
        this._srcHeight = val;
        this._dirty = true;
    }
}
