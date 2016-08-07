import easing from "../lib/easing";

/**
 * @class Tween
 * @param {Sprite}  entity [description]
 * @param {Object}  from   A key/val map of tweenable starting values eg: { x: 0, opacity: 1 }
 * @param {Object}  to     A key/val map of tweenable ending values eg: { x: 32, opacity: 0 }
 * @param {Integer} ms     The length of the tween in milliseconds
 * @param {String}  easing The easing type
 */
 export default class Tween {
    constructor(_from, to, ms, easing="linear") {
        this._from   = _from;
        this._to     = to;
        this._ms     = ms;
        this._easing = easing;
    
        this._currentFrame = 0;
        this._startFrame   = 1;
        this._endFrame     = null;
        this._totalFrames  = Math.round( this._ms / (1000 / 60) );
    }

    isComplete() {
        return this._currentFrame >= this._endFrame;
    }
    
    onComplete() {
        // callback
    }

    update(entity) {
        this._startFrame = this._startFrame === null ? this._currentFrame : this._startFrame;
        this._endFrame = this._endFrame === null ? this._currentFrame + this._totalFrames : this._endFrame;

        if (this._currentFrame < this._endFrame) {
            for(let prop in this._from) {
                // allow users to use either `_x` or `x`
                let actualProp = entity[prop] !== undefined ? prop : "_" + prop;

                entity[actualProp] = easing[this._easing](
                    this._currentFrame,
                    this._from[actualProp],
                    this._to[actualProp],
                    this._totalFrames
                );
            }
        } else {
            this.onComplete();
        }

        this._currentFrame += 1;
    }
}
