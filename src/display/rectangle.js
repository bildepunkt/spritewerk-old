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
        SW.Renderable.call(this);

        /**
         * @member {String} SW.Rectangle.prototype._fillColor
         * @private
         */
        this._fillColor = '#000';

        /**
         * @member {String} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Rectangle.prototype.gsFillColor
     * @param {String} value
     * @return {String|SW.Rectangle}
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