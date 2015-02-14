var Renderable = Protos.extend({
    x: 0,

    y: 0,

    width: null,

    height: null,

    scaleX: 1,

    scaleY: 1,

    rotationOffsetX: 0,

    rotationOffsetY: 0,

    scaleOffsetX: 0,

    scaleOffsetY: 0,

    rotation: 0,

    opacity: 1,

    composite: 'source-over',

    getRight: function() {
        return this.x + this.width;
    },

    getBottom: function() {
        return this.y + this.height;
    },

    getCenterX: function() {
        return this.x + this.halfWidth();
    },

    getCenterY: function() {
        return this.y + this.halfHeight();
    },

    getHalfWidth: function() {
        return this.width / 2;
    },

    getHalfHeight: function() {
        return this.height / 2;
    }
});