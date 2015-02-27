SW.Scene = (function() {
    'use strict';

    var Scene = function() {
        /**
         * @member {SW.Collection} SW.Scene.prototype.layers - the collection of layers
         */
        this.layers = new SW.Collection();
    };

    /**
     * creates a new layer ({@link SW.Collection})
     *
     * @method SW.Scene.prototype.createLayer
     * @param {string} name
     * @param {object} [items] - a hash of items to add to the new layer
     */
    Scene.prototype.createLayer = function(name, items) {
        this.layers.addItem(name, new SW.Collection(items));
    };

    /**
     * creates a new layer ({@link SW.Collection}) at a given index
     *
     * @method SW.Scene.prototype.createLayerAt
     * @param {string} name
     * @param {integer} index
     * @param {object} [items] - a hash of items to add to the new layer
     */
    Scene.prototype.createLayerAt = function(name, index, items) {
        this.layers.addItemAt(name, new SW.Collection(items), index);
    };

    return Scene; 
}());