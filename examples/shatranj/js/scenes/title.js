var Title = function() {
    SW.Game.Scene.call(this);

    this.mainLayer = new SW.Game.Layer();
    this.playBtn = new SW.Display.Rectangle().dimensions(256, 64); 

    this.addItem('main', this.mainLayer);
    this.mainLayer.addItem('playBtn', this.playBtn);
};

Title.prototype = SW.Common.Util.clone(SW.Game.Scene.prototype);

Title.prototype.press = function(e) {
    if (e.target._uid === this.playBtn._uid) {
        alert('');
    }
};