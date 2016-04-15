// import Easing from './Easing';

/**
 *
 */
 export default class Tween {
    constructor() {
        /*entity: null,
        from:   null,
        to:     null,
        ms:     null,
        easing: null,
    
        currentFrame: null,
        startFrame:   null,
        endFrame:     null,
        totalFrames:  null,*/
        this._complete = false;
        
        this.totalFrames = this.ms / (1000 / config.fps);
    }
    
    onComplete() {
        // callback
    }

    update: function(e) {
        this.currentFrame = e.detail.frame;
        this.startFrame   = this.startFrame === null ? this.currentFrame : this.startFrame;
        this.endFrame     = this.endFrame   === null ? this.currentFrame + this.totalFrames : this.endFrame;

        if (this.currentFrame < this.endFrame && !this._complete) {
            if (!this.easing) {
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
            this._complete = true;
            this.onComplete();
        }
    }
}

