SW.Canvas = (function() {
    'use strict';

    /**
     * displays entities
     *
     * @class SW.Canvas
     * @requires SW.Collection
     * @belongsto SW
     * @singleton
     */
    var Canvas = function(options) {
        /**
         * @member {HTMLEntity} SW.Canvas.prototype.canvasEl - the canvas element
         */
        this.canvasEl = document.getElementById(options.id);
        /**
         * @member {integer} width - the canvas element's width
         */
        this.width = options.width;
        /**
         * @member {integer} height - the canvas element's height
         */
        this.height = options.height;
        /**
         * @member {SW.Collection} layers - the collection of layers
         */
        this.layers = new SW.Collection();
    };

    /**
     * create a new collection
     *
     * @method
     * @param {string} name
     * @param {object} [items] - a hash of items to add to the new layer
     */
    Canvas.prototype.createLayer = function(name, items) {
        this.layers.addItem(name, new SW.Collection(items));
    };

    /**
     * create a new collection at a given index
     *
     * @method
     * @param {string} name
     * @param {integer} index
     * @param {object} [items] - a hash of items to add to the new layer
     */
    Canvas.prototype.createLayerAt = function(name, index, items) {
        this.layers.addItemAt(name, new SW.Collection(items), index);
    };

    return Canvas;
}());