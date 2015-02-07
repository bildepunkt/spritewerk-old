function init() {
    window.removeEventListener('load', init, false);

    require([
        './src/canvas',
        './src/draw',
        './src/engine',
        './src/media-manager',
        './main'
    ], function(Canvas, Draw, Engine, MediaManager, main) {
        main();
    });
}

window.addEventListener('load', init, false);