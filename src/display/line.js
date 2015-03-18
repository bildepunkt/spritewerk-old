SW.Line = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Line
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Line = function() {
        SW.Renderable.call(this);

        /**
         * @member {Array} SW.Line.prototype._coordinates
         * @private
         */
        this._coordinates = [];
        /**
         * @member {String} SW.Line.prototype._color
         * @private
         */
        this._color = '#000';
        /**
         * @member {Float} SW.Line.prototype._width
         * @default 1
         * @private
         */
        this._width = 1;
        /**
         * @member {String} SW.Line.prototype._cap
         * @default 'butt'
         * @private
         */
        this._cap = 'butt';

        /**
         * @member {String} SW.Line.prototype._displayType
         * @default 'line'
         * @private
         * @readonly
         */
        this._displayType = 'line';
    };

    Line.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Line.prototype.coordinates
     * @param {SW.Vector} [arguments] - n amount of coordinates
     * @return {array|SW.Line}
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
     * @method SW.Line.prototype.color
     * @param {String} value
     * @return {string|SW.Line}
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