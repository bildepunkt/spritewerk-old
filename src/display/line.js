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
     * @method SW.Line.prototype.getCoordinates
     * @return {Array}
     */
    Line.prototype.getCoordinates = function() {
        return this._coordinates;
    };

    /**
     * @method SW.Line.prototype.setCoordinates
     * @param {Array} coordinates - n amount of coordinates
     * @return {SW.Line}
     * @chainable
     */
    Line.prototype.setCoordinates = function() {
        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    /**
     * @method SW.Line.prototype.getCap
     * @return {String}
     * @chainable
     */
    Line.prototype.getCap = function() {
        return this._cap;
    };

    /**
     * @method SW.Line.prototype.setCap
     * @param {String} value - values can be 'butt', 'round', or 'square'
     * @return {SW.Line}
     * @chainable
     */
    Line.prototype.setCap = function(value) {
        this._cap = value;

        return this;
    };

    return Line;
}());