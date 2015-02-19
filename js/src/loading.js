(function() {
'use strict';

var wh = 24;
var x = SW.Config.width / 2 - 12;
var y = SW.Config.height / 2 - 24;
var rotOffX = 12;
var rotOffY = 36;

SW.Loading = SW.State.extend({
    data: {
        config: {
            bgColor: '#000'
        },

        groups: [{
            name: 'main',
            entities: [{
                name: 'spinnerA',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    width: wh,
                    height: wh,
                    fill: '#CC3'
                }
            }, {
                name: 'spinnerB',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 120,
                    width: wh,
                    height: wh,
                    fill: '#C3C'
                }
            }, {
                name: 'spinnerC',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 240,
                    width: wh,
                    height: wh,
                    fill: '#3CC'
                }
            }]
        }]
    },

    setup: function() {
        this.spinnerA = this.get('main').get('spinnerA');
        this.spinnerB = this.get('main').get('spinnerB');
        this.spinnerC = this.get('main').get('spinnerC');
    },

    update: function() {
        this.spinnerA.rotation += 4;
        this.spinnerB.rotation += 4;
        this.spinnerC.rotation += 4;
    }
});

}());