/**
 * an image display entity
 *
 * @class SW.Sprite
 * @extends SW.Renderable
 * @belongsto SW
 */
SW.Sprite = SW.Renderable.extend({
    img: null,
    imageName: null,
    srcX: 0,
    srcY: 0,
    srcWidth: null,
    srcHeight: null,
    displayType: 'sprite',

    init: function() {
        if (this.img) {
            this.setImage();
        }
    },

    setImage: function(img) {
        this.img = img || this.img;

        if (!this.srcWidth && !this.srcHeight) {
            this.srcWidth = this.img.width;
            this.srcHeight = this.img.height;
        }

        if (!this.width && !this.height) {
            this.width = this.img.width;
            this.height = this.img.height;
        }
    }
});