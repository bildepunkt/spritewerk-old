function init() {
    window.removeEventListener('load', init, false);

    require([
        // paths relative to index.html
        './js/src/canvas',
        './js/src/draw',
        './js/src/engine',
        './js/src/media-manager',
        './js/main'
    ], function(Canvas, Draw, Engine, MediaManager, main) {
        // first: initialize singletons, then run main
        main();
    });
}

window.addEventListener('load', init, false);