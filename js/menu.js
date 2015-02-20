var MyGame = MyGame || {};
MyGame.Menu = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                startBtn: '../start.gif',
                seattle: '../seattle.jpg',
                desktop: '../desktop.png'
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
                        imageName: 'startBtn',
                        height: 16,
                        width: 16
                    }
                }]
            }]
        },

        setup: function() {
            this.startBtn = this.get('main').get('startBtn');
        },

        press: function(e) {
            if (e.target === this.startBtn) {
                SW.FSM.add('game', MyGame.Play);
            }
        },

        update: function() {
        },

        destroy: function() {
        }
    });
}());