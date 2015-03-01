SW.Display.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Display.Rectangle
     * @extends SW.Display.Renderable
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Common.Util.inherit(this, SW.Display.Renderable);

        /**
         * @member {string} SW.Display.Rectangle.prototype._fillColor
         * @private
         */
        this._fillColor = '#000';

        /**
         * @member {string} SW.Display.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    /**
     * @method SW.Display.Rectangle.prototype.gsFillColor
     * @param {string} value
     * @return {string|SW.Display.Rectangle}
     * @chainable
     */
    Rectangle.prototype.fillColor = function(value) {
        if (value === undefined) {
            return this._fillColor;
        }

        if (typeof value === 'string') {
            this._fillColor = value;
        }

        return this;
    };

    return Rectangle;
}());