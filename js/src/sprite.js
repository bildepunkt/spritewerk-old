define([
    '../lib/protos'
], function(Protos) {

    /**
     *
     */
    return Protos.extend({
        protosName: 'sprite',

        x: 0,

        y: 0,

        srcX: 0,

        srcY: 0,

        srcWidth: null,

        srcHeight: null,

        width: null,

        height: null,

        scaleX: 1,

        scaleY: 1,

        rotationOffsetX: 0,

        rotationOffsetY: 0,

        scaleOffsetX: 0,

        scaleOffsetY: 0,

        rotation: 0,

        image: null,

        opacity: 1,

        displayType: 'sprite',

        composite: 'source-over',

        init: function() {
            if (this.image) {
                this.setImage();
            }
        },

        setImage: function(img) {
            this.image = img || this.image;

            if (!this.srcWidth && !this.srcHeight) {
                this.srcWidth = this.image.width;
                this.srcHeight = this.image.height;
            }

            if (!this.width && !this.height) {
                this.width = this.image.width;
                this.height = this.image.height;
            }
        },

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
});