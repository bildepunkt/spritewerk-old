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
                            height: 840
                        }
                    },
                    {
                        name: 'player',
                        type: Player,
                        config: {
                            src: 'img/player.png',
                            srcX: 120,
                            width: 120,
                            height: 120,
                            srcWidth: 120,
                            srcHeight: 120
                        }
                    },
                    {
                        name: 'enemy',
                        type: Sprite,
                        config: {
                            x: 240,
                            y: 240,
                            src: 'img/enemy.png',
                            width: 120,
                            height: 120,
                            srcWidth: 120,
                            srcHeight: 120
                        }
                    },
                    {
                        name: 'weapon',
                        type: Sprite,
                        config: {
                            x: -4096,
                            y: -4096,
                            src: 'img/weapon.png',
                            width: 120,
                            height: 120,
                            srcWidth: 120,
                            srcHeight: 120
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
                [0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
            ]
        }
    }
});