/**
 * @class       Radio
 * @description Wrapper for Events. Currently only supports dispatching custom events
 * @author      Chris Peters
 */
export default class Radio {
    /**
     * @method Radio.tuneIn
     * @param {Any}      target
     * @param {String}   event
     * @param {Function} callback
     */
    static tuneIn(target, event, callback) {
        target.addEventListener(event, callback, false);
    }

    /**
     *
     * @method Radio.tuneOut
     * @param {Any}      target
     * @param {String}   event
     * @param {Function} callback
     */
    static tuneOut(target, event, callback) {
        target.removeEventListener(event, callback, false);
    }

    /**
     *
     * @method Radio.dispatch
     * @param {Any}    target
     * @param {String} event
     * @param {Object} data
     */
    static dispatch(target, event, data) {
        const evt = new CustomEvent(event, {
            detail: data
        });

        target.dispatchEvent(evt);
    }
}
