(function() {
    function init() {
        SW.Signal.removeListener(window, 'load', init);
        SW.Signal.addListener('preload/complete', onPreloadComplete);

        SW.Canvas = new SW.Canvas({
            id: 'spritewerk',
            width: 600,
            height: 400
        });

        SW.MediaManager.preload({
            ghost: 'img/Ghost.png'
        });

        function onPreloadComplete() {
            SW.Signal.removeListener('preload/complete', onPreloadComplete);

            var sprite = new SW.Sprite();
            sprite.image(SW.MediaManager.getImage('ghost'));

            SW.Canvas.render(sprite);
        }
    }

    SW.Signal.addListener(window, 'load', init);
}());