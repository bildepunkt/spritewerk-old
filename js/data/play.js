/**
 *
 */

define([
    '../spritewerk/shade',
    '../spritewerk/sprite'
], function(Shade, Sprite) {
    return {
        assets: [
            'img/Github-Mark-120px-plus.png'
        ],
        backgroundColor: '#ccc',
        layers: [
            {
                name: 'main',
                entities: [
                    {
                        name: 'bg',
                        type: Sprite,
                        config: {
                            src: 'img/bg.png'
                        }
                    },
                    {
                        name: 'player',
                        type: Sprite,
                        config: {
                            src: 'img/Github-Mark-120px-plus.png'
                        }
                    }
                ]
            }
        ],
        scrollRegions: {
            right: 760,
            left: 200
        },
        walls: {
            width: 120,
            height: 120,
            grid: [
                [0, 0, 0, 1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1]
            ]
        }
    }
});