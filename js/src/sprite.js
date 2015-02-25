SW.Sprite = (function() {
    
    var Sprite = function() {
        this.img = null;
    };

    Sprite.prototype = new SW.Renderable();

    Sprite.prototype.setImage = function(img) {
        this.img = img;
    };

    return Sprite;
}());