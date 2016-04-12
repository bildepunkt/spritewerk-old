/**
 * @class    Animation
 * @memberof bitmap
 * @desc     Describes the src positions and timing of spritesheet a animation
 * @author   Chris Peters
 *
 * @param    {Array}   srcXSequence A list of srcX positions
 * @param    {Array}   srcYSequence A list of srcY positions
 * @param    {Integer} [step=2]     The amount of frames between each frame step. This is based on
 *                                  requestAnimationFrame's 60fps rate. eg: 2 would animate @ 30fps, 3 @ 15fps etc.
 * @param    {loop}    [loop=false] If true, will start the sequence at the initial position when complete and run
 *                                  until stopped
 */
export default class Animation {
    constructor(srcXSequence, srcYSequence, step = 2, loop = false) {
        this._srcXSequence = srcXSequence;
        this._srcYSequence = srcYSequence;
        this._sequenceLength = Array.isArray(this._srcXSequence) ?
            this._srcXSequence.length :
            this._srcYSequence.length;
        this._step = step;
        this._frame = 0;
        this._playing = false;
        this._loop = loop;
    }

    /**
     * @method Animation#play
     * @param {Boolean} [loop] Whether or not to loop in this sequence instance
     */
    play(loop) {
        this._loop = loop !== undefined ? loop : this._loop;
        this._frame = 0;
        this._playing = true;
    }

    /**
     * @method Animation#update
     * @returns {null|Object} If animation not playing returns null else returns object containing current srcX/Y values
     */
    update() {
        if (!this._playing) {
            return null;
        }

        const nextTick = (this._frame + 1) % this._step;

        if (nextTick >= this._sequenceLength) {
            if (this._loop) {
                this._frame = 0;
            } else {
                this.stop();
            }
        } else {
            this._frame = nextTick;
        }

        return {
            srcX: this._srcXSequence[this._frame],
            srcY: this._srcYSequence[this._frame]
        };
    }

    /**
     * Stops the current animation. Called automatically when sequence ends and loop set to false
     *
     * @method Animation#stop
     */
    stop() {
        this._playing = false;
    }
}
