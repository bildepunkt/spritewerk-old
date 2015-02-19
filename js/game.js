var MyGame = MyGame || {};
MyGame.Game = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                seattle: '../seattle.jpg'
            },

            config: {
                bgColor: '#ccc'
            },

            groups: [{
                name: 'main',
                entities: [{
                    name: 'seattle',
                    type: SW.Sprite,
                    config: {
                        imageName: 'seattle'
                    }
                }]
            }]
        },

        setup: function() {
            this.seattle = this.get('main').get('seattle');
        },

        press: function(e) {
            if (e.target === this.seattle) {
                console.log(this.seattle);
            }
        },

        update: function() {
        },

        destroy: function() {
        }
    });
}());