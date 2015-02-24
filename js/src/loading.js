(function() {
'use strict';

var halfWidth = SW.Config.width / 2;
var halfHeight = SW.Config.height / 2;
var spinnerSize = 24;
var spinnerX = halfWidth - 12;
var spinnerY = halfHeight - 36;
var rotOffX = 12;
var rotOffY = 36;

SW.Loading = SW.State.extend({
    data: {
        config: {
            bgColor: '#C00'
        },

        groups: [{
            name: 'bars',
            entities: [{
                name: 'container',
                type: SW.Rectangle,
                config: {
                    y: halfHeight - 3,
                    width: SW.Config.width,
                    height: 6,
                    fill: '#444'
                }
            }, {
                name: 'progress',
                type: SW.Rectangle,
                config: {
                    y: halfHeight - 3,
                    width: 0,
                    height: 6,
                    fill: '#888'
                }
            }]
        },{
            name: 'spinner',
            entities: [{
                name: 'a',
                type: SW.Rectangle,
                config: {
                    x: spinnerX,
                    y: spinnerY,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    width: spinnerSize,
                    height: spinnerSize,
                    fill: '#CC3'
                }
            }, {
                name: 'b',
                type: SW.Rectangle,
                config: {
                    x: spinnerX,
                    y: spinnerY,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 120,
                    width: spinnerSize,
                    height: spinnerSize,
                    fill: '#C3C'
                }
            }, {
                name: 'c',
                type: SW.Rectangle,
                config: {
                    x: spinnerX,
                    y: spinnerY,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 240,
                    width: spinnerSize,
                    height: spinnerSize,
                    fill: '#3CC'
                }
            }]
        }]
    },

    setup: function() {
        SW.Radio.tuneIn('preloadupdate', this.updateBar, this);

        switch(SW.Config.loader) {
            case 'spinner':
                this.spinnerA = this.get('spinner').get('a');
                this.spinnerB = this.get('spinner').get('b');
                this.spinnerC = this.get('spinner').get('c');
                this.remove('bars');
            break;
            case 'progress':
                this.progressBar = this.get('bars').get('progress');
                this.remove('spinner');
            break;
        }

    },

    updateBar: function(e) {
        var data = e.detail;

        this.progressBar.width = SW.Config.width / data.total * data.loaded;
    },

    update: function() {
        //SW.State.prototype.update.call(this);

        if (SW.Config.loader === 'spinner') {
            this.spinnerA.rotation += 4;
            this.spinnerB.rotation += 4;
            this.spinnerC.rotation += 4;
        }
    },

    destroy: function() {
        SW.Radio.tuneOut('preloadupdate', this.updateBar, this);
    }
});

}());