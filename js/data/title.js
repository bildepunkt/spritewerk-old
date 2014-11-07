/**
 *
 */

define([
    '../spritewerk/sprite'
], function(Sprite) {
    return {
        assets: [
            'img/Scorpion.png',
            'img/Baddie1.png',
            'img/Ghost.png'
        ],
        backgroundColor: '#ccc',
        layers: [
            {
                entities: [
                    {
                        name: 'scorp',
                        type: Sprite,
                        config: {
                            src: 'img/Scorpion.png',
                            width: 128,
                            height: 128
                        }
                    },
                    {
                        name: 'baddie',
                        type: Sprite,
                        config: {
                            x: 64,
                            src: 'img/Baddie1.png',
                            width: 128,
                            height: 128
                        }
                    },
                    {
                        name: 'ghost',
                        type: Sprite,
                        config: {
                            x: 128,
                            src: 'img/Ghost.png',
                            width: 128,
                            height: 128
                        }
                    }
                ]
            }
        ]
    }
});