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
        SW.Display.Renderable.call(this);

        /**
         * @member {String} SW.Display.Rectangle.prototype._fillColor
         * @private
         */
        this._fillColor = '#000';

        /**
         * @member {String} SW.Display.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Display.Renderable.prototype;

    /**
     * @method SW.Display.Rectangle.prototype.gsFillColor
     * @param {String} value
     * @return {String|SW.Display.Rectangle}
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