import easing from '../lib/easing';

/**
 *
 */
 export default class Tween {
    constructor() {
        this._entity = null;
        this._from   = null;
        this._to     = null;
        this._ms     = null;
        this._easing = null;
    
        this._currentFrame = null;
        this._startFrame   = null;
        this._endFrame     = null;
        this._totalFrames = this._ms / (1000 / 60);
        this._complete = false;
    }
    
    onComplete() {
        // callback
    }

    update(frame) {
        this._currentFrame = frame;
        this._startFrame   = this._startFrame === null ? this._currentFrame : this._startFrame;
        this._endFrame     = this._endFrame   === null ? this._currentFrame + this._totalFrames : this._endFrame;

        if (this._currentFrame < this._endFrame && !this._complete) {
            if (!this._easing) {
                this._easing = 'linear';
            }

            for(let prop in this._from) {
                this._entity[prop] = easing[this._easing](
                    this._currentFrame,
                    this._from[prop],
                    this._to[prop] - this._from[prop],
                    this._totalFrames
                );
            }
        } else {
            this._complete = true;
            this.onComplete();
        }
    }
}
