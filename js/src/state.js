define([
    './config',
    './media-manager',
    './layer',
    './sprite',
    '../lib/preloader',
    '../lib/protos',
    '../lib/radio'
], function(config, mediaManager, Layer, Sprite, Preloader, Protos, radio) {
    
    /**
     *
     */
    return Protos.extend({
        protosName: 'state',

        /**
         * @member {array} assets - array of string urls
         */
        assets: null,

        /**
         * @member {array} sortedLayers - refrence to sorted layers
         * @private
         */
        sortedLayers: [],

        init: function() {
            radio.tuneIn('preloadcomplete', this.setup, this);

            new Preloader({
                paths: this.assets,
                mediaManager: mediaManager
            });
        },

        setup: function() {
            var layer;

            radio.tuneOut('preloadcomplete', this.setup);

            for(var i = 0, len = this.layers.length; i < len; i += 1) {
                if (!this.layers[i].name) {
                    throw new Error('Each layer needs a name!');
                }

                layer = new Layer();
                layer.add(this.layers[i].entities);

                this[this.layers[i].name] = layer;

                this.sortedLayers.push(layer);
            }

            delete this.assets;

            radio.broadcast('stateready');
        }
    });
});