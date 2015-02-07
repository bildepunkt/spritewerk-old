var canvas;
var draw;
var pool;
var engine;
var mediaManager;

function init() {
    radio.tuneOut(window, 'load', init);

    canvas = new Canvas();
    draw = new Draw();
    pool = new Pool();
    engine = new Engine();
    mediaManager = new MediaManager();

    radio.tuneIn('newframe', function() {
        draw.clear();
        pool.each(function(entity) {
            draw.render(entity);
        });
    });

    radio.tuneIn('preloadcomplete', function() {
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
        }, {
            type: Sprite,
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            composite: 'destination-out'
        });

        engine.start();

        new Tween({
            entity: pool.entities[0],
            from: {rotation: 45},
            to: {rotation: 360},
            ms: 1024,
            easing: 'easeOutOvershoot'
        });
    });

    new Preloader({
        paths: [
            'img/sun-set.jpg'
        ],
        mediaManager: mediaManager
    });
}

radio.tuneIn(window, 'load', init);