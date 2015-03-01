SW.Display.Scene = (function() {
    'use strict';

    /**
     * manages layers and their entities
     *
     * @class SW.Display.Scene
     * @requires SW.Common.Collection
     * @requires SW.Display.Layer
     * @belongsto SW
     */
    var Scene = function() {
        /**
         * @member {SW.Common.Collection} SW.Display.Scene.prototype._layers - the collection of layers
         * @private
         */
        this._layers = new SW.Common.Collection();
        /**
         * @member {SW.Common.Collection} SW.Display.Scene.prototype._bgColor
         * @private
         */
        this._bgColor = null;
    };

    /**
     * creates a new layer ({@link SW.Display.Layer})
     *
     * @method SW.Display.Scene.prototype.addLayer
     * @param {string} name
     */
    Scene.prototype.addLayer = function(name) {
        this._layers.addItem(name, new SW.Display.Layer());
    };

    /**
     * creates a new layer ({@link SW.Display.Layer}) at a given index
     *
     * @method SW.Display.Scene.prototype.addLayerAt
     * @param {string} name
     * @param {integer} index
     */
    Scene.prototype.addLayerAt = function(name, index) {
        this._layers.addItemAt(name, new SW.Display.Layer(), index);
    };

    /**
     * @method SW.Display.Scene.prototype.getLayers
     * @return {SW.Common.Collection}
     */
    Scene.prototype.getLayers = function() {
        return this._layers;
    };

    return Scene; 
}());