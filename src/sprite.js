var Sprite = Protos.extend({
    protosName: 'sprite',

    x: 0,

    y: 0,

    vx: 0,

    vy: 0,

    srcX: 0,

    srcY: 0,

    srcWidth: null,

    srcHeight: null,

    width: null,

    height: null,

    scaleX: 1,

    scaleY: 1,

    rotation: 0,

    displayType: null,

    shape: null,

    polygon: null,

    path: null,

    image: null,

    opacity: 1,

    composite: 'source-over',

    init: function() {
        if (this.shape) {
            this.setShape(this.shape);
        } else if (this.polygon) {
            this.setPolygon(this.polygon);
        } else if (this.path) {
            this.setPath(this.path);
        } else if (this.image) {
            this.setImage(this.image);
        } else if (this.width && this.height) {
            this.setShape({
                type: 'rectangle'
            });
        }
    },

    setShape: function(shapeConfig) {
        this.shape = shapeConfig;
        this.displayType = 'shape';
    },

    setPolygon: function() {
        //
        this.displayType = 'polygon';
    },

    setPath: function() {
        //
        this.displayType = 'path';
    },

    setImage: function(img) {
        this.image = img;

        if (!this.srcWidth && !this.srcHeight) {
            this.srcWidth = this.image.width;
            this.srcHeight = this.image.height;
        }

        if (!this.width && !this.height) {
            this.width = this.image.width;
            this.height = this.image.height;
        }

        this.displayType = 'image';
    },

    getLeft: function() {
        return this.x - this.getHalfWidth();
    },

    getTop: function() {
        return this.y - this.getHalfHeight();
    },

    getRight: function() {
        return this.x + this.getHalfWidth();
    },

    getBottom: function() {
        return this.y + this.getHalfHeight();
    },

    getHalfWidth: function() {
        return this.width / 2;
    },

    getHalfHeight: function() {
        return this.height / 2;
    },

    update: function() {
        this.x += this.vx;
        this.y += this.vy;
    }
});