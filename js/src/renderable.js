SW.Renderable = (function() {
    /**
     * the renderable object
     *
     * @class SW.Renderable
     * @extends SW.Movable
     * @belongsto SW
     */
    var Renderable = function() {
        /**
         * @member {integer} SW.Renderable.prototype.width
         * @default null
         * @private
         */
        this.width = null;

        /**
         * @member {integer} SW.Renderable.prototype.height
         * @default null
         * @private
         */
        this.height = null;

        /**
         * @member {integer} SW.Renderable.prototype.scaleX
         * @default 1
         * @private
         */
        this.scaleX = 1;

        /**
         * @member {integer} SW.Renderable.prototype.scaleY
         * @default 1
         * @private
         */
        this.scaleY = 1;

        /**
         * @member {integer} SW.Renderable.prototype.rotationOffsetX
         * @default 0
         * @private
         */
        this.rotationOffsetX = 0;

        /**
         * @member {integer} SW.Renderable.prototype.rotationOffsetY
         * @default 0
         * @private
         */
        this.rotationOffsetY = 0;

        /**
         * @member {integer} SW.Renderable.prototype.scaleOffsetX
         * @default 0
         * @private
         */
        this.scaleOffsetX = 0;

        /**
         * @member {integer} SW.Renderable.prototype.scaleOffsetY
         * @default 0
         * @private
         */
        this.scaleOffsetY = 0;

        /**
         * @member {integer} SW.Renderable.prototype.rotation
         * @default 0
         * @private
         */
        this.rotation = 0;

        /**
         * @member {integer} SW.Renderable.prototype.opacity
         * @default 1
         * @private
         */
        this.opacity = 1;

        /**
         * @member {boolean} SW.Renderable.prototype.visible
         * @default true
         * @private
         */
        this.visible = true;

        /**
         * used internally, not for api
         *
         * @member {boolean} SW.Renderable.prototype._inView
         * @default true
         * @private
         */
        this._inView = true;

        /**
         * @member {string} SW.Renderable.prototype.composite
         * @default 'source-over'
         * @private
         */
        this.composite = 'source-over';

        /**
         * @member {boolean} SW.Renderable.prototype.tracked
         * @default false
         * @private
         */
        this.tracked = false;

        /**
         * @member {boolean} SW.Renderable.prototype.visible
         * @default false
         * @private
         */
        this.containable = false;

        /**
         * @member {boolean} SW.Renderable.prototype.blockable
         * @default false
         * @private
         */
        this.blockable = false;
    };

    Renderable.prototype = new SW.Movable();

    /**
     * get the object's right-most position
     * @method SW.Renderable.prototype.getRight
     */
    Renderable.prototype.getRight = function() {
        return this.x + this.width;
    };

    /**
     * get the object's bottom-most
     * @method SW.Renderable.prototype.getBottom
     */
    Renderable.prototype.getBottom = function() {
        return this.y + this.height;
    };

    /**
     * get the object's center x position
     * @method SW.Renderable.prototype.getCenterX
     */
    Renderable.prototype.getCenterX = function() {
        return this.x + this.halfWidth();
    };

    /**
     * get the object's center y position
     * @method SW.Renderable.prototype.getCenterY
     */
    Renderable.prototype.getCenterY = function() {
        return this.y + this.halfHeight();
    };

    /**
     * get the object's half width
     * @method SW.Renderable.prototype.getHalfWidth
     */
    Renderable.prototype.getHalfWidth = function() {
        return this.width / 2;
    };

    /**
     * get the object's half height
     * @method SW.Renderable.prototype.getHalfHeight
     */
    Renderable.prototype.getHalfHeight = function() {
        return this.height / 2;
    };

    return Renderable;
}());