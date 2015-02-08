define([
    './config',
    './media-manager',
    './layer',
    './sprite',
    '../lib/preloader',
    '../lib/protos',
    '../lib/radio'
], function(config, mediaManager, Layer, Sprite, Preloader, Protos, radio) {
     /*
        radio.tuneIn('preloadcomplete', function() {
            var pool = new Pool();
            var foo;

            pool.add({
                type: Sprite,
                name: 'foo',
                x: 100,
                y: 100,
                rotationOffsetX: 100,
                rotationOffsetY: 100,
                scaleOffsetX: 100,
                scaleOffsetY: 100,
                width: 200,
                height: 200,
                opacity: 0.5,
                image: mediaManager.images.sun_set
            });

            foo = pool.entities.foo;

            new Tween({
                entity: foo,
                from: {rotation: 0},
                to: {rotation: 360},
                ms: 1000,
                easing: 'easeOutOvershoot'
            })

            radio.tuneIn('newframe', function(e) {
                if (e.detail.frame % 60 === 0) {
                    pool.entities.foo.rotation += 45;
                    pool.entities.foo.scaleY += 0.5;
                }

                draw.clear();
                pool.sortedEach(function(entity) {
                    draw.render(entity);
                });
            });

            engine.start();
        });

        new Preloader({
            paths: [
                'img/sun-set.jpg'
            ],
            mediaManager: mediaManager
        });
    */
    return Protos.extend({
        protosName: 'state',

        /**
         * @member {array} assets - array of string urls
         */
        assets: null,

        /**
         * @member {object} layers - refrence to layers by name
         */
        layers: null,

        /**
         * @member {array} sortedLayers - refrence to sorted layers
         */
        sortedLayers: null,

        init: function() {
            radio.tuneIn('preloadcomplete', this.setup, this);

            new Preloader({
                paths: this.assets,
                mediaManager: mediaManager
            });
        },

        setup: function() {
            var tmpLayers = {};
            var tmpSortedLayers = [];
            var tmpLayer;

            for(var i = 0, len = this.layers.length; i < len; i += 1) {
                if (!this.layers[i].name) {
                    throw new Error('Each layer needs a name!');
                }

                tmpLayer = new Layer();
                tmpLayer.add(this.layers[i].entities);

                tmpLayers[this.layers[i].name] = tmpLayer;
                tmpSortedLayers.push(tmpLayer);
            }

            this.layers = tmpLayers;
            this.sortedLayers = tmpSortedLayers;

            delete this.assets;
        },

        destroy: function() {
            radio.tuneOut('preloadcomplete', this.setup);
        }
    });
});