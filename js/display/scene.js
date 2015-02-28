SW.Scene = (function() {
    'use strict';

    /**
     * manages layers and their entities
     *
     * @class SW.Scene
     * @requires SW.Collection
     * @requires SW.Layer
     * @belongsto SW
     */
    var Scene = function() {
        /**
         * @member {SW.Collection} SW.Scene.prototype._layers - the collection of layers
         * @private
         */
        this._layers = new SW.Collection();
        /**
         * @member {SW.Collection} SW.Scene.prototype._bgColor
         * @private
         */
        this._bgColor = null;
    };

    /**
     * creates a new layer ({@link SW.Layer})
     *
     * @method SW.Scene.prototype.addLayer
     * @param {string} name
     */
    Scene.prototype.addLayer = function(name) {
        this._layers.addItem(name, new SW.Layer());
    };

    /**
     * creates a new layer ({@link SW.Layer}) at a given index
     *
     * @method SW.Scene.prototype.addLayerAt
     * @param {string} name
     * @param {integer} index
     */
    Scene.prototype.addLayerAt = function(name, index) {
        this._layers.addItemAt(name, new SW.Layer(), index);
    };

    /**
     * @method SW.Scene.prototype.getLayers
     * @return {SW.Collection}
     */
    Scene.prototype.getLayers = function() {
        return this._layers;
    };

    return Scene; 
}());