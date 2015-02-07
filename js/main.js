define([
    './src/sprite',
    './src/media-manager',
    './src/draw',
    './src/engine',
    './src/pool',
    './lib/radio',
    './lib/preloader'
], function(Sprite, mediaManager, draw, engine, Pool, radio, Preloader) {

    return function() {
        radio.tuneIn('preloadcomplete', function() {
            var pool = new Pool();

            pool.add({
                type: Sprite,
                x: 200,
                y: 200,
                rotation: 45,
                width: 200,
                height: 200,
                scaleY: -1,
                scaleX: 2,
                opacity: 0.5,
                image: mediaManager.images.sun_set
            });

            radio.tuneIn('newframe', function() {
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
    };
});