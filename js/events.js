function loadHandler() {
    SW.Signal.removeListener(window, 'load', loadHandler);

    SW.Canvas = new SW.Canvas({
        id: 'spritewerk',
        width: 600,
        height: 400
    });

    SW.Signal.addListener(SW.Canvas.getCanvasEl(), 'click', function(e) {
        console.log(e);
    });
}

SW.Signal.addListener(window, 'load', loadHandler);