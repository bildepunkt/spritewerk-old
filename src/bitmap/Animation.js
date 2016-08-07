/**
 * @class    Animation
 * @memberof bitmap
 * @desc     Describes the src positions and timing of spritesheet a animation
 * @author   Chris Peters
 *
 * @param    {Array|Integer} srcXSequence A list of (or singular) srcX position(s)
 * @param    {Array|Integer} srcYSequence A list of (or singular) srcY position(s)
 * @param    {Integer}       [step=2]     The amount of frames between each frame step. This is based on
 *                                        requestAnimationFrame's 60fps rate. eg: 2 would animate @ 30fps, 3 @ 15fps
 *                                        etc.
 * @param    {loop}          [loop=false] If true, will start the sequence at the initial position when complete and run
 *                                        until stopped
 */
export default class Animation {
    constructor(srcXSequence, srcYSequence, step = 2, loop = false) {
        this._srcXSequence = srcXSequence;
        this._srcYSequence = srcYSequence;

        // at least one sequence must be array
        this._sequenceLength = Array.isArray(this._srcXSequence)
            ? this._srcXSequence.length
            : this._srcYSequence.length;

        this._step = step;
        this._frame = 0;
        this._ticks = 0;
        this._playing = false;
        this._loop = loop;
    }

    /**
     * Callback executed if loop set to false on sequence completion
     *
     * @method Animation#onComplete
     */
    onComplete() {

    }

    /**
     * @memberof bitmap
     * @method Animation#play
     * @param {Boolean} [loop] Whether or not to loop in this sequence instance
     */
    play(loop) {
        this._loop = loop !== undefined ? loop : this._loop;
        this._ticks = 0;
        this._frame = 0;
        this._playing = true;
    }

    /**
     * @memberof bitmap
     * @method Animation#update
     * @returns {null|Object} If animation not playing returns null else returns object containing current srcX/Y values
     */
    update(factor) {
        if (!this._playing) {
            return null;
        }

        var srcCoords = {
            srcX: Array.isArray(this._srcXSequence) ? this._srcXSequence[this._frame] : this._srcXSequence,
            srcY: Array.isArray(this._srcYSequence) ? this._srcYSequence[this._frame] : this._srcYSequence
        };

        this._ticks += 1;
        this._frame += this._ticks % this._step === 0 ? 1 : 0;

        if (this._frame >= this._sequenceLength) {
            if (this._loop) {
                this._frame = 0;
                this._ticks = 0;
            } else {
                this.stop();
                this.onComplete();
            }
        }

        return srcCoords;
    }

    /**
     * Stops the current animation. Called automatically when sequence ends and loop set to false
     *
     * @memberof bitmap
     * @method Animation#stop
     */
    stop() {
        this._playing = false;
    }
}
