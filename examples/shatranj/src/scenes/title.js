var Title = function() {
    SW.Scene.call(this);

    this.mainLayer = new SW.Layer();
    this.playBtn = new SW.Rectangle().dimensions(256, 64); 

    this.addItem('main', this.mainLayer);
    this.mainLayer.addItem('playBtn', this.playBtn);
};

Title.prototype = SW.Util.clone(SW.Scene.prototype);

Title.prototype.press = function(e) {
    if (e.target._uid === this.playBtn._uid) {
        SW.SceneManager.addScene('play', Play);
    }
};