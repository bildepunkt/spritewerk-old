import { tuneIn, tuneOut } from "./radio";

/**
 * @class Timer
 * @param {Function} callback The callback to execute when msDelay has elapsed
 * @param {Integer}  msDelay  The timer delay
 * @param {Any}      scope    The scope within which to execute the callback
 * @param {Object}   options  //
 */
export class Timer {
    constructor (callback, msDelay, scope, options={}) {
        this._callback = callback;
        this._msDelay = msDelay;
        this._scope = scope;
        this._document = options.document || document;
        this._ms = 0;

        this._onTick = this._onTick.bind(this);

        tuneIn(this._document, "tick", this._onTick);
    }

    _onTick (e) {
        this._ms += e.detail.delta;

        if (this._ms * 1000 >= this._msDelay) {
            tuneOut(this._document, "tick", this._onTick);

            if (this._scope) {
                this._callback.apply(this._scope);
            } else {
                this._callback();
            }
        }
    }

    clear () {
        tuneOut(this._document, "tick", this._onTick);
    }
}