define([
    './config',
    '../lib/easing',
    '../lib/protos',
    '../lib/radio'
], function(config, Easing, Protos, radio) {

    /**
     * Tween
     */
    return Protos.extend({
        protosName: 'tween',

        entity: null,
        from:   null,
        to:     null,
        ms:     null,
        easing: null,

        currentFrame: null,
        startFrame:   null,
        endFrame:     null,
        totalFrames:  null,

        init: function() {
            this.totalFrames = this.ms / (1000 / config.fps);

            radio.tuneIn('newframe', this.update, this);
        },

        update: function(e) {
            this.currentFrame = e.detail.frame;
            this.startFrame   = this.startFrame === null ? this.currentFrame : this.startFrame;
            this.endFrame     = this.endFrame   === null ? this.currentFrame + this.totalFrames : this.endFrame;

            if (this.currentFrame < this.endFrame) {
                if (this.easing === null) {
                    this.easing = 'linear';
                }

                for(var prop in this.from) {
                    this.entity[prop] = Easing[this.easing](
                        this.currentFrame,
                        this.from[prop],
                        this.to[prop] - this.from[prop],
                        this.totalFrames
                    );
                }
            } else {
                radio.tuneOut('newframe', this.update);
            }
        }
    });
});