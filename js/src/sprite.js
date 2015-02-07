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
        }
    });
});