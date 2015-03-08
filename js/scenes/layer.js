SW.Scenes.Layer = (function() {
    'use strict';

    /**
     * holds display configurations and entities 
     *
     * @class SW.Scenes.Layer
     * @extends SW.Common.Collection
     * @belongsto SW
     */
    var Layer = function() {
        SW.Common.Util.inherit(this, SW.Common.Collection);

        /**
         * if scrolling employed, describes the factor
         * this property is not used on the layer but is passed to its entities
         *
         * @member {Float} SW.Scenes.Scene.prototype._scrollFactor
         * @default 1
         * @private
         */
        this._scrollFactor = 1;
    };

    return Layer;
}());