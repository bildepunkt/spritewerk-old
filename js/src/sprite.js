SW.Sprite = SW.Renderable.extend({
    img: null,

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