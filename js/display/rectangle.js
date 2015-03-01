SW.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Rectangle
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Util.inherit(this, SW.Renderable);

        /**
         * @member {string} SW.Rectangle.prototype._fillColor
         * @private
         */
        this._fillColor = '#000';

        /**
         * @member {string} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    /**
     * @method SW.Rectangle.prototype.gsFillColor
     * @param {string} value
     * @return {string|SW.Rectangle}
     * @chainable
     */
    Rectangle.prototype.fillColor = function(value) {
        if (value === undefined) {
            return this._fill;
        }

        if (typeof value === 'string') {
            this._fill = value;
        }

        return this;
    };

    return Rectangle;
}());