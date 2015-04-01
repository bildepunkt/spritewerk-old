SW.Bitmap = (function() {
    'use strict';

    /**
     * a image display entity
     *
     * @class SW.Bitmap
     * @extends SW.Sprite
     * @requires SW.Vector
     * @belongsto SW
     */
    var Bitmap = function() {
        SW.Sprite.call(this);

        /**
         * @member {String} SW.Bitmap.prototype._image
         * @private
         */
        this._image = null;

        /**
         * @member {SW.Vector} SW.Bitmap.prototype._srcPosition
         * @private
         */
        this._srcPosition = new SW.Vector();
        
        /**
         * @member {SW.Vector} SW.Bitmap.prototype._srcSize
         * @private
         */
        this._srcDimensions = new SW.Vector();

        /**
         * @member {String} SW.Bitmap.prototype._displayType
         * @private
         * @readonly
         */
        this._displayType = 'bitmap';
    };

    Bitmap.prototype = SW.Util.clone(SW.Sprite.prototype);

    /**
     * @method SW.Bitmap.prototype.getSrcPosition
     * @return {SW.Vector}
     */
    Bitmap.prototype.getSrcPosition = function(x, y) {
        return this._srcPosition;
    };

    /**
     * @method SW.Bitmap.prototype.setSrcPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setSrcPosition = function(x, y) {
        if (typeof x === 'number') {
            this._srcPosition.x = x;
        }

        if (typeof y === 'number') {
            this._srcPosition.y = y;
        }

        return this;
    };

    /**
     * @method SW.Bitmap.prototype.getSrcDimensions
     * @return {SW.Vector}
     */
    Bitmap.prototype.getSrcDimensions = function(x, y) {
        return this._srcDimensions;
    };

    /**
     * @method SW.Bitmap.prototype.setSrcDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setSrcDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._srcDimensions.x = x;
        }

        if (typeof y === 'number') {
            this._srcDimensions.y = y;
        }

        return this;
    };

    /**
     * set image property; if not already set, sets dimension/srcDimensions to image size
     *
     * @method SW.Bitmap.prototype.setImage
     * @param {HTMLEntity} value
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setImage = function(value) {
        if (typeof value === 'object') {
            this._image = value;

            if (!this._srcDimensions.x && !this._srcDimensions.y) {
                this._srcDimensions.x = this._image.width;
                this._srcDimensions.y = this._image.height;
            }

            if (!this._dimensions.x && !this._dimensions.y) {
                this._dimensions.x = this._image.width;
                this._dimensions.y = this._image.height;
            }
        }

        return this;
    };

    return Bitmap;
}());