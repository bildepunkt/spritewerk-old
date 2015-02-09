define([
    './src/media-manager',
    './src/draw',
    './src/engine',
    './src/sprite',
    './src/state',
    './lib/radio'
], function(mediaManager, draw, engine, Sprite, State, radio) {

    return function() {
        var state;

        radio.tuneIn('stateready', function() {
            draw.clear();
            state.sortedLayers[0].sortedEach(function(item) {
                draw.render(item);
            });
        });

        var state = new State({
            assets: {
                sunset: 'img/sun-set.jpg'
            },
            layers: [
                {
                    name: 'main',
                    entities: {
                        name: 'sunset',
                        type: Sprite,
                        config: {
                            x: 100,
                            y: 100,
                            rotationOffsetX: 100,
                            rotationOffsetY: 100,
                            scaleOffsetX: 100,
                            scaleOffsetY: 100,
                            width: 200,
                            height: 200,
                            opacity: 0.5,
                            imageName: 'sunset'
                        }
                    }
                }
            ]
        });
    }
});