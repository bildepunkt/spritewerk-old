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
         * @private
         * @readonly
         */
        this._displayType = 'sprite';
    };

    Sprite.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Sprite.prototype.getSrcPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getSrcPosition = function(x, y) {
        return this._srcPosition;
    };

    /**
     * @method SW.Sprite.prototype.setSrcPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setSrcPosition = function(x, y) {
        if (typeof x === 'number') {
            this._srcPosition.x = x;
        }

        if (typeof y === 'number') {
            this._srcPosition.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getSrcDimensions
     * @return {SW.Vector}
     */
    Sprite.prototype.getSrcDimensions = function(x, y) {
        return this._srcDimensions;
    };

    /**
     * @method SW.Sprite.prototype.setSrcDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setSrcDimensions = function(x, y) {
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
     * @method SW.Sprite.prototype.setImage
     * @param {HTMLEntity} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setImage = function(value) {
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

    return Sprite;
}());