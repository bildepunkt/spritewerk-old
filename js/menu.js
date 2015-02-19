var MyGame = MyGame || {};
MyGame.Menu = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                startBtn: '../start.gif'
            },

            config: {
                bgColor: '#ccc'
            },

            groups: [{
                name: 'main',
                entities: [{
                    name: 'startBtn',
                    type: SW.Sprite,
                    config: {
                        imageName: 'startBtn'
                    }
                }]
            }]
        },

        setup: function() {
            this.startBtn = this.get('main').get('startBtn');
        },

        press: function(e) {
            if (e.target === this.startBtn) {
                SW.FSM.add('game', MyGame.Game);
            }
        },

        update: function() {
        },

        destroy: function() {
        }
    });
}());