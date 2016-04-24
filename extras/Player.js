/*var Phantasm = Sprite.extend({
    _protosName: 'phantasm',

    init: function() {
        this.$sprite.init.call(this);

        this.movingLt     = false;
        this.movingRt     = false;
        this.movingUp     = false;
        this.movingDn     = false;
        this.SPEED        = 0.8;
        this.MAX_SPEED    = 6;
        this.MAX_FRICTION = 0.7;
        this.MIN_FRICTION = 1;
        this.MIN_SPEED_THRESHOLD = 0.1;
        this.friction     = this.MIN_FRICTION;
    },

    move: function() {
        if (this.movingLt) {
            this.vx('-=' + this.SPEED);
        }
        if (this.movingRt) {
            this.vx('+=' + this.SPEED);
        }
        if (this.movingUp) {
            this.vy('-=' + this.SPEED);
        }
        if (this.movingDn) {
            this.vy('+=' + this.SPEED);
        }

        // TODO break into x/y friction?
        if (!this.movingLt && !this.movingRt && !this.movingUp && !this.movingDn) {
            this.friction = this.MAX_FRICTION;
        } else {
            this.friction = this.MIN_FRICTION;
        }

        if (this.vx() >  this.MAX_SPEED) {
            this.vx(this.MAX_SPEED);
        }
        if (this.vx() < -this.MAX_SPEED) {
            this.vx(-this.MAX_SPEED);
        }
        if (this.vy() >  this.MAX_SPEED) {
            this.vy(this.MAX_SPEED);
        }
        if (this.vy() < -this.MAX_SPEED) {
            this.vy(-this.MAX_SPEED);
        }

        if (Math.abs(this.vx()) < this.MIN_SPEED_THRESHOLD) {
            this.vx(0);
        }
        if (Math.abs(this.vy()) < this.MIN_SPEED_THRESHOLD) {
            this.vy(0);
        }

        this.vx(this.vx() * this.friction);
        this.vy(this.vy() * this.friction);
    }
});*/