function loadHandler() {
    var scene;
    var layer;
    var rectangle;
    var input;

    SW.Events.Signal.removeListener(window, 'load', loadHandler);

    SW.Events.Signal.addListener('press', function(e) {
        if (e.detail.eventData.target._uid === rectangle._uid) {
            alert('');
        }
    });

    SW.Display.Canvas = new SW.Display.Canvas({
        id: 'spritewerk',
        width: 600,
        height: 400
    });

    // remember to wait for canvas to be instantiated
    input = new SW.Events.Input({
        bindMouseInput: true
    });

    scene = new SW.Display.Scene();
    scene.addLayer('rectLayer');
    layer = scene.getLayers().getItem('rectLayer');
    rectangle = new SW.Display.Rectangle();
    rectangle.dimension(256, 256);
    layer.addItem('recto', rectangle);

    SW.Display.Canvas.render(rectangle);

    input.setLayers(scene.getLayers());
}

SW.Events.Signal.addListener(window, 'load', loadHandler);