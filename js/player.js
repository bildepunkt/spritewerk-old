var MyGame = MyGame || {};
MyGame.Player = SW.Sprite.extend({
    onPressdown: function(e) {
        if (e.x < this.x) {
            this.vx = -6;
        } else if (e.x > this.getRight()) {
            this.vx = 6;
        }

        if (e.y < this.y) {
            this.vy = -6;
        } else if (e.y > this.getBottom()) {
            this.vy = 6;
        }
    },

    onPressup: function(e) {
        this.vx = 0;
        this.vy = 0;
    }
});