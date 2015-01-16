/**
 *
 */

define([
    '../spritewerk/sprite',
    '../custom/player'
], function(Sprite, Player) {
    return {
        assets: [
            '../256.jpg',
            '../257.jpg'
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
                            src: '../257.jpg',
                            width: 1200,
                            height: 840,
                            opacity: 0.1
                        }
                    },
                    {
                        name: 'player',
                        type: Player,
                        config: {
                            src: '../256.jpg',
                            width: 120,
                            height: 120
                        }
                    },
                    {
                        type: Sprite,
                        config: {
                            src: '../257.jpg',
                            width: 120,
                            height: 120
                        }
                    }
                ]
            }
        ],
        scrollRegions: {
            right: 760,
            left: 200,
            top: 200,
            bottom: 400
        },
        walls: {
            width: 120,
            height: 120,
            grid: [
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 1]
            ]
        }
    }
});