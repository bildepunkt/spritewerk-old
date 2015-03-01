function loadHandler() {
    SW.Events.Signal.removeListener(window, 'load', loadHandler);

    SW.Display.Canvas = new SW.Display.Canvas({
        id: 'spritewerk',
        width: 600,
        height: 400
    });

    SW.Events.Signal.addListener(SW.Display.Canvas.getCanvasEl(), 'click', function(e) {
        console.log(e);
    });
}

SW.Events.Signal.addListener(window, 'load', loadHandler);