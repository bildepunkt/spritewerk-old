SW.Display.Line = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Display.Line
     * @extends SW.Display.Renderable
     * @belongsto SW
     */
    var Line = function() {
        SW.Common.Util.inherit(this, SW.Display.Renderable);

        /**
         * @member {array} SW.Display.Line.prototype._coordinates
         * @private
         */
        this._coordinates = [];
        /**
         * @member {string} SW.Display.Line.prototype._color
         * @private
         */
        this._color = '#000';
        /**
         * @member {float} SW.Display.Line.prototype._width
         * @default 1
         * @private
         */
        this._width = 1;
        /**
         * @member {string} SW.Display.Line.prototype._cap
         * @default 'butt'
         * @private
         */
        this._cap = 'butt';

        /**
         * @member {string} SW.Display.Line.prototype._displayType
         * @default 'line'
         * @private
         * @readonly
         */
        this._displayType = 'line';
    };

    /**
     * @method SW.Display.Line.prototype.coordinates
     * @param {SW.Display.Vector} [arguments] - n amount of coordinates
     * @return {array|SW.Display.Line}
     * @chainable
     */
    Line.prototype.coordinates = function() {
        if (!arguments.length) {
            return this._coordinates;
        }

        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    /**
     * @method SW.Display.Line.prototype.color
     * @param {string} value
     * @return {string|SW.Display.Line}
     * @chainable
     */
    Line.prototype.color = function(value) {
        if (value === undefined) {
            return this._color;
        }

        if (typeof value === 'string') {
            this._color = value;
        }

        return this;
    };

    return Line;
}());