(function() {
    function init() {
        SW.Events.Signal.removeListener(window, 'load', init);
        SW.Events.Signal.addListener('preload/complete', onPreloadComplete);

        SW.Display.Canvas = new SW.Display.Canvas({
            id: 'spritewerk',
            width: 600,
            height: 400
        });

        SW.Media.MediaManager.preload({
            ghost: 'img/Ghost.png'
        });

        function onPreloadComplete() {
            SW.Events.Signal.removeListener('preload/complete', onPreloadComplete);

            var sprite = new SW.Display.Sprite();
            sprite.image(SW.Media.MediaManager.getImage('ghost'));

            SW.Display.Canvas.render(sprite);
        }
    }

    SW.Events.Signal.addListener(window, 'load', init);
}());