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
        SW.Util.inherit(this, SW.Collection);

        /**
         * if scrolling employed, describes the factor
         * this property is not used on the layer but is passed to its entities
         * @member {float} SW.Scene.prototype._scrollFactor
         * @default 1
         * @private
         */
        this._scrollFactor = 1;
    };

    /**
     * adds properties to item and then calls {@link SW.Collection#addItem}
     *
     * @method SW.Layer.prototype.addItem
     * @param {string} name
     * @param {object} item
     */
    Layer.prototype.addItem = function(name, item) {
        //item.scrollFactor(this._scrollFactor);

        SW.Collection.prototype.addItem.call(this, name, item);
    };

    return Layer;
}());