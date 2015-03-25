SW.Polygon = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Polygon
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Polygon = function() {
        SW.Renderable.call(this);

        /**
         * @member {Array} SW.Polygon.prototype._coordinates
         * @private
         */
        this._coordinates = [];

        /**
         * @member {String} SW.Polygon.prototype._displayType
         * @default 'polygon'
         * @private
         * @readonly
         */
        this._displayType = 'polygon';
    };

    Polygon.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Polygon.prototype.coordinates
     * @param {SW.Vector} [arguments] - n amount of coordinates
     * @return {array|SW.Polygon}
     * @chainable
     */
    Polygon.prototype.coordinates = function() {
        if (!arguments.length) {
            return this._coordinates;
        }

        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    return Polygon;
}());