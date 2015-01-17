define([
    '../spritewerk/sprite'
], function(Sprite) {
    return Sprite.extend({
        protosName: 'player',

        movingUp: false,
        movingDn: false,
        movingLt: false,
        movingRt: false,
        facingUp: false,
        facingDn: true,
        facingLt: false,
        facingRt: false,
        attackTime: 128,
        walkLoopTime: 256,
        animInterval: null,
        SPEED       : 0.8,
        MAX_SPEED   : 6,
        MIN_SPEED_THRESHOLD: 0.1,
        MAX_FRICTION: 0.7,
        MIN_FRICTION: 1,

        init: function() {
            this.$sprite.init.apply(this);

            this.friction = this.MIN_FRICTION;
        },

        pressMe: function() {
            this.attack();
        },

        pressdown: function(e) {
            if (e.y < this.y) {
                this.movingUp = true;
                this.setFacingDirection('facingUp');
            } else if (e.y > this.bottom()) {
                this.movingDn = true;
                this.setFacingDirection('facingDn');
            }

            if (e.x < this.x) {
                this.movingLt = true;
                this.setFacingDirection('facingLt');
            } else if (e.x > this.right()) {
                this.movingRt = true;
                this.setFacingDirection('facingRt');
            }

            if (this.movingLt || this.movingRt || this.movingUp || this.movingDn) {
                this.startWalkLoop();
            } 

            this.setSrcXY();
        },

        pressup: function() {
            this.movingUp = false;
            this.movingDn = false;
            this.movingLt = false;
            this.movingRt = false;

            this.stopWalkLoop();
        },

        attack: function() {
            var self = this;

            if (this.facingUp) {
                this.weapon.srcX = 0;
                this.weapon.x = this.x;
                this.weapon.y = this.y - this.weapon.height;
            } else if (this.facingDn) {
                this.weapon.srcX = this.weapon.width;
                this.weapon.x = this.x;
                this.weapon.y = this.bottom();
            }

            if (this.facingLt) {
                this.weapon.srcX = this.weapon.width * 2;
                this.weapon.x = this.x - this.weapon.width;
                this.weapon.y = this.y;
            } else if (this.facingRt) {
                this.weapon.srcX = this.weapon.width * 3;
                this.weapon.x = this.right();
                this.weapon.y = this.y;
            }

            this.srcY = this.height;

            setTimeout(function() {
                self.weapon.x = -4096;
                self.weapon.y = -4096;
                self.srcY = 0;
            }, this.attackTime);
        },

        setFacingDirection: function(facingProperty) {
            this.facingUp = false;
            this.facingDn = false;
            this.facingLt = false;
            this.facingRt = false;

            this[facingProperty] = true;
        },

        setSrcXY: function() {
            if (this.facingUp) {
                this.srcX = 0;
            } else if (this.facingDn) {
                this.srcX = this.width;
            }

            if (this.facingLt) {
                this.srcX = this.width * 2;
            } else if (this.facingRt) {
                this.srcX = this.width * 3;
            }
        },

        startWalkLoop: function() {
            var self = this;

            this.srcY = this.height;

            this.animInterval = setInterval(function() {
                if (self.srcY === 0) {
                    self.srcY = self.height;
                } else {
                    self.srcY = 0;
                }
            }, this.walkLoopTime);
        },

        stopWalkLoop: function() {
            this.srcY = 0;
            clearInterval(this.animInterval);
        },

        update: function() {
            if (this.movingLt) {
                this.vx -= this.SPEED;
            } else if (this.movingRt) {
                this.vx += this.SPEED;
            }

            if (this.movingUp) {
                this.vy -= this.SPEED;
            } else if (this.movingDn) {
                this.vy += this.SPEED;
            }

            // TODO break into x/y friction?
            if (!this.movingLt && !this.movingRt && !this.movingUp && !this.movingDn) {
                this.friction = this.MAX_FRICTION;
            } else {
                this.friction = this.MIN_FRICTION;
            }

            if (this.vx >  this.MAX_SPEED) {
                this.vx =  this.MAX_SPEED;
            }
            if (this.vx < -this.MAX_SPEED) {
                this.vx = -this.MAX_SPEED;
            }
            if (this.vy >  this.MAX_SPEED) {
                this.vy =  this.MAX_SPEED;
            }
            if (this.vy < -this.MAX_SPEED) {
                this.vy = -this.MAX_SPEED;
            }

            if (Math.abs(this.vx) < this.MIN_SPEED_THRESHOLD) {
                this.vx = 0;
            }
            if (Math.abs(this.vy) < this.MIN_SPEED_THRESHOLD) {
                this.vy = 0;
            }

            this.vx = this.vx * this.friction;
            this.vy = this.vy * this.friction;

            this.$sprite.update.apply(this);
        }
    });
});