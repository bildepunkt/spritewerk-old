function init() {
    window.removeEventListener('load', init, false);

    require([
        // relative path in ./index.html
        './js/src/canvas',
        './js/src/draw',
        './js/src/engine',
        './js/src/media-manager',
        './js/main'
    ], function(Canvas, Draw, Engine, MediaManager, main) {
        main();
    });
}

window.addEventListener('load', init, false);