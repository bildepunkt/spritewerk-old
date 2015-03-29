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
     * @method SW.Polygon.prototype.getCoordinates
     * @return {Array}
     */
    Polygon.prototype.getCoordinates = function() {
        return this._coordinates;
    };

    /**
     * @method SW.Polygon.prototype.setCoordinates
     * @param {Array} coordinates - n amount of coordinates
     * @return {SW.Polygon}
     * @chainable
     */
    Polygon.prototype.setCoordinates = function() {
        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    return Polygon;
}());