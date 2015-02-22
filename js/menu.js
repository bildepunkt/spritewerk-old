var MyGame = MyGame || {};
MyGame.Menu = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                chain: 'img/Chain.png',
                chest: 'img/Chest.png',
                crate: 'img/Crate.png'
            },

            config: {
                bgColor: '#ccc'
            },

            groups: [{
                name: 'main',
                entities: [{
                    name: 'crate',
                    type: SW.Sprite,
                    config: {
                        x: 284,
                        y: 184,
                        imageName: 'crate'
                    }
                }]
            }]
        },

        setup: function() {
            this.crate = this.get('main').get('crate');
        },

        press: function(e) {
            if (e.target === this.crate) {
                SW.FSM.add('game', MyGame.Play);
            }
        }
    });
}());