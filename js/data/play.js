/**
 *
 */

define([
    '../spritewerk/sprite',
    '../custom/player'
], function(Sprite, Player) {
    return {
        assets: [
            'img/bg.png',
            'img/player.png'
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
                            src: 'img/bg.png',
                            width: 1200,
                            height: 840,
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'player',
                        type: Player,
                        config: {
                            src: 'img/player.png',
                            width: 120,
                            height: 120,
                            srcWidth: 120,
                            srcHeight: 120
                        }
                    },
                    {
                        type: Sprite,
                        config: {
                            src: 'img/github.png'
                        }
                    },
                    {
                        type: Sprite,
                        config: {
                            src: 'img/github.png'
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
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }
    }
});