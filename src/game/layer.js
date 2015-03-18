SW.Layer = (function() {
    'use strict';

    /**
     * holds display configurations and entities 
     *
     * @class SW.Layer
     * @extends SW.Collection
     * @belongsto SW
     */
    var Layer = function() {
        SW.Collection.call(this);

        /**
         * if scrolling employed, describes the factor
         * this property is not used on the layer but is passed to its entities
         *
         * @member {Float} SW.Scene.prototype._scrollFactor
         * @default 1
         * @private
         */
        this._scrollFactor = 1;
    };

    Layer.prototype = SW.Util.clone(SW.Collection.prototype);

    return Layer;
}());