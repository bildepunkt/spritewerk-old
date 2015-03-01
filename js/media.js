(function() {
    SW.Signal.addListener('preload/complete', onPreloadComplete);

    SW.MediaManager.preload({
        ghost: 'img/Ghost.png'
    });

    function onPreloadComplete() {
        SW.Signal.removeListener('preload/complete', onPreloadComplete);

        console.log(SW.MediaManager.getImage('ghost'));
    }
}());