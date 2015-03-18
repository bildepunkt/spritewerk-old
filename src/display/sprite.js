SW.Sprite = (function() {
    'use strict';

    /**
     * a image display entity
     *
     * @class SW.Sprite
     * @extends SW.Renderable
     * @requires SW.Vector
     * @belongsto SW
     */
    var Sprite = function() {
        SW.Renderable.call(this);

        /**
         * @member {String} SW.Sprite.prototype._image
         * @private
         */
        this._image = null;

        /**
         * @member {SW.Vector} SW.Sprite.prototype._srcPosition
         * @private
         */
        this._srcPosition = new SW.Vector();
        
        /**
         * @member {SW.Vector} SW.Sprite.prototype._srcSize
         * @private
         */
        this._srcDimensions = new SW.Vector();

        /**
         * @member {String} SW.Sprite.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'sprite';
    };

    Sprite.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Sprite.prototype.srcPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Sprite}
     * @chainable
     */
    Sprite.prototype.srcPosition = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._srcPosition;
        }

        if (typeof x === 'number') {
            this._srcPosition.x = x;
        }

        if (typeof y === 'number') {
            this._srcPosition.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.srcDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Sprite}
     * @chainable
     */
    Sprite.prototype.srcDimensions = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._srcDimensions;
        }

        if (typeof x === 'number') {
            this._srcDimension.x = x;
        }

        if (typeof y === 'number') {
            this._srcDimension.y = y;
        }

        return this;
    };

    /**
     * get/set image property; if not already set, sets dimension/srcDimension to image size
     *
     * @method SW.Sprite.prototype.image
     * @param {HTMLEntity} value
     * @return {HTMLEntity|SW.Sprite}
     * @chainable
     */
    Sprite.prototype.image = function(value) {
        if (value === undefined) {
            return this._image;
        }

        if (typeof value === 'object') {
            this._image = value;

            if (!this._srcDimensions.x && !this._srcDimensions.y) {
                this._srcDimensions.x = this._image.width;
                this._srcDimensions.y = this._image.height;
            }

            if (!this._dimension.x && !this._dimension.y) {
                this._dimension.x = this._image.width;
                this._dimension.y = this._image.height;
            }
        }

        return this;
    };

    return Sprite;
}());