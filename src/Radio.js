/**
 * Wrapper for event listening, removing, & dispatching. Currently only supports broadcasting Custom and Mouse events
 * @class Radio
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
     * @method Radio.broadcast
     * @param {Any}    target
     * @param {String} event
     * @param {Object} data
     */
    static broadcast(target, event, data) {
        let evt;

        switch(event) {
            // TODO verify MouseEvent
            case 'click':
            case 'dblclick':
            case 'mousedown':
            case 'mouseup':
            case 'mousemove':
                evt = new MouseEvent(event, {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                });
                break;
            default:
                evt = new CustomEvent(event, {
                    detail: data
                });
                break;
        }

        target.dispatchEvent(evt);
    }
}
