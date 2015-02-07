define([
    '../lib/protos',
    './config'
], function(Protos, config) {

    /**
     *
     */
    var Canvas = Protos.extend({
        protosName: 'canvas',

        canvas: null,

        init: function() {
            this.canvas = document.getElementById('spritewerk');
            this.canvas.width = config.width;
            this.canvas.height = config.height;
        },

        getCanvas: function() {
            return this.canvas;
        }
    });

    return new Canvas();
});