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
            var foo;

            pool.add({
                type: Sprite,
                name: 'foo',
                x: 100,
                y: 100,
                rotationOffsetX: 100,
                rotationOffsetY: 100,
                width: 200,
                height: 200,
                opacity: 0.5,
                image: mediaManager.images.sun_set
            });

            foo = pool.entities.foo;

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
    };
});