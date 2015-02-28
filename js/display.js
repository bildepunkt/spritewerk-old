(function() {
    window.onload = function() {
        var w = 600;
        var h = 400;
        var canvas = new SW.Canvas({
            id: 'spritewerk',
            width: w,
            height: h
        });

        var scene = new SW.Scene();
        var rectangle;
        var rectLayer;
        var line;
        var lineLayer;

        scene.addLayer('rectLayer');
        scene.addLayer('lineLayer');
        rectLayer = scene.getLayers().getItem('rectLayer');
        lineLayer = scene.getLayers().getItem('lineLayer');

        for(var i = 0; i < 500; i += 1) {
            rectangle = new SW.Rectangle();
            rectangle.position(Math.random()*w, Math.random()*h);
            rectangle.dimension(16, 16);
            rectangle.opacity(0.2);
            rectLayer.addItem('recto' + i, rectangle);

            line = new SW.Line();
            line.coordinates(
                new SW.Vector(Math.random()*w, Math.random()*h),
                new SW.Vector(Math.random()*w, Math.random()*h)
            );
            lineLayer.addItem('lino' + i, line);
        }

        function renderAll() {
            canvas.clearAll();

            scene.getLayers().each(function(layer) {
                layer.each(function(entity) {
                    entity.position(Math.random()*w, Math.random()*h);
                    canvas.render(entity);
                });
            });
        }

        setInterval(function() {
            requestAnimationFrame(renderAll);
        }, 33);
    };
}());