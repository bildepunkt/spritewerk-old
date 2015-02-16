SW.Canvas = Protos.extend({
    canvas: null,

    init: function() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = SW.Config.width;
        this.canvas.height = SW.Config.height;
    },

    getCanvas: function() {
        return this.canvas;
    }
});