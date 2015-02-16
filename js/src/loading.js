SW.Loading = SW.State.extend({
    data: {
        assets: {
            sunset: '256.jpg'
        },

        config: {
            bgColor: '#C3C'
        },

        groups: [
            {
                name: 'main',
                entities: [
                    {
                        name: 'spinnerA',
                        type: Rectangle,
                        config: {
                            x: 288,
                            y: 176,
                            rotationOffsetX: 12,
                            rotationOffsetY: 36,
                            width: 24,
                            height: 24,
                            fill: '#3C3'
                        }
                    }, {
                        name: 'spinnerB',
                        type: Rectangle,
                        config: {
                            x: 288,
                            y: 224,
                            rotationOffsetX: 12,
                            rotationOffsetY: -12,
                            width: 24,
                            height: 24,
                            fill: '#3C3'
                        }
                    }
                ]
            }
        ]
    },

    update: function() {
        var spinnerA = this.get('main').get('spinnerA');
        var spinnerB = this.get('main').get('spinnerB');

        spinnerA.x += Math.sin(spinnerA.rotation) * 24;

        spinnerA.rotation += 4;
        spinnerB.rotation += 4;
    }
});