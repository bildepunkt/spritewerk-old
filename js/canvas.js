var Canvas = Protos.extend({
    canvas: null,

    init: function() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = Config.width;
        this.canvas.height = Config.height;
    },

    getCanvas: function() {
        return this.canvas;
    }
});