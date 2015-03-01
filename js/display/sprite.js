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
        SW.Util.inherit(this, SW.Renderable);

        /**
         * @member {string} SW.Sprite.prototype._image
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
        this._srcDimension = new SW.Vector();

        /**
         * @member {string} SW.Sprite.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'sprite';
    };

    /**
     * @method SW.Sprite.prototype.srcPosition
     * @param {float} [x]
     * @param {float} [y]
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
     * @method SW.Sprite.prototype.srcDimension
     * @param {float} [x]
     * @param {float} [y]
     * @return {SW.Vector|SW.Sprite}
     * @chainable
     */
    Sprite.prototype.srcDimension = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._srcDimension;
        }

        if (typeof x === 'number') {
            this._scrDimension.x = x;
        }

        if (typeof y === 'number') {
            this._scrDimension.y = y;
        }

        return this;
    };

    /**
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

            if (!this._srcDimension.x && !this._srcDimension.y) {
                this._srcDimension.x = this._image.width;
                this._srcDimension.y = this._image.height;
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