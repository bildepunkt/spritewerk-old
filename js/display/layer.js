SW.Display.Layer = (function() {
    'use strict';

    /**
     * holds display configurations and entities 
     *
     * @class SW.Display.Layer
     * @extends SW.Common.Collection
     * @belongsto SW
     */
    var Layer = function() {
        SW.Common.Util.inherit(this, SW.Common.Collection);

        /**
         * if scrolling employed, describes the factor
         * this property is not used on the layer but is passed to its entities
         * @member {float} SW.Display.Scene.prototype._scrollFactor
         * @default 1
         * @private
         */
        this._scrollFactor = 1;
    };

    /**
     * adds properties to item and then calls {@link SW.Common.Collection#addItem}
     *
     * @method SW.Display.Layer.prototype.addItem
     * @param {string} name
     * @param {object} item
     */
    Layer.prototype.addItem = function(name, item) {
        //item.scrollFactor(this._scrollFactor);

        SW.Common.Collection.prototype.addItem.call(this, name, item);
    };

    return Layer;
}());