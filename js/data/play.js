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
                            width: 2000,
                            height: 1000,
                            src: 'img/Github-Mark-120px-plus.png'
                        }
                    },
                    {
                        name: 'player',
                        type: Sprite,
                        config: {
                            x: 400,
                            y: 400,
                            src: 'img/Github-Mark-120px-plus.png'
                        }
                    }
                ]
            }
        ],
        scrollRegions: {
            right: 760,
            left: 200
        }
    }
});