/**
 *
 */

define([
    '../spritewerk/sprite'
], function(Sprite) {
    return {
        assets: [
            'img/Github-Mark-120px-plus.png'
        ],
        backgroundColor: '#ccc',
        layers: [
            {
                entities: [
                    {
                        name: 'btn',
                        type: Sprite,
                        config: {
                            x: 400,
                            y: 400,
                            src: 'img/Github-Mark-120px-plus.png'
                        }
                    }
                ]
            }
        ]
    }
});