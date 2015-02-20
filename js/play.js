var MyGame = MyGame || {};
MyGame.Play = (function() {
    'use strict';

    return SW.State.extend({
        data: {
            assets: {
                ss: '../solar-system.png',
                yellowstone: '../yellowstone.jpg'
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
        }
    });
}());