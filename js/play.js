var MyGame = MyGame || {};
MyGame.Play = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                em: 'img/Emerald.png',
                fire: 'img/Fire.png',
                ghost: 'img/Ghost.png',
                heart: 'img/Heart.png',
                bg: 'img/nebula-dark.jpg'
            },

            config: {
                bgColor: '#ccc',
                scrollRegions: {
                    left: 100,
                    right: 500
                },
                canScroll: true
            },

            groups: [{
                name: 'main',
                entities: [{
                    name: 'bg',
                    type: SW.Sprite,
                    config: {
                        imageName: 'bg'
                    }
                }, {
                    name: 'ghost',
                    type: MyGame.Player,
                    config: {
                        imageName: 'ghost',
                        follow: true,
                        containable: true
                    }
                }]
            }]
        },

        setup: function() {
            this.ghost = this.get('main').get('ghost');
        },

        pressdown: function(e) {
            this.ghost.onPressdown(e);
        },

        pressup: function(e) {
            this.ghost.onPressup(e);
        }
    });
}());