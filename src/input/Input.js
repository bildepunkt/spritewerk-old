import { tuneIn } from "../util/radio";

const defaults = {
    fitToWindow: true
};

/**
 * @class       input/Input
 * @description A module for handling user input events on the canvas
 * @requires    util/radio
 *
 * @param {HTMLEntity} canvas The canvas element to interact with
 * @param {Array} inputTypes The different event type listeners/handler-executers
 * @param {Object}  [opts]
 * @param {Boolean} [opts.fitToWindow=true] Whether or not to calculate offsets for resized canvas
 */
export default class Input {
    constructor(canvas, inputTypes, opts=defaults) {
        this.canvas = canvas;
        this.inputTypes = inputTypes;
        this.options = opts;

        for (let inputType of inputTypes) {
            inputType.init(canvas, opts.canvasFit);
        }

        this._onTick = this._onTick.bind(this);
        tuneIn(this.canvas, "tick", this._onTick);
    }

    /**
     * Triggers all queued events.
     * @method Input#_onTick
     */
    _onTick() {
        for (let inputType of this.inputTypes) {
            for (let event of inputType.queuedEvents) {
                for (let handlerObj of inputType.handlerObjects[event.type]) {
                    handlerObj.handler(event);
                }
            }

            inputType.queuedEvents = [];
        }
    }

    /**
     * Adds a handler for the given event type
     * @method Input#addListener
     * @param  {Sprite|null} target  The target to check event trigger against, assign `null` to listen for all
     * @param  {string}      type    The event type
     * @param  {function}    handler The function to execute when event triggered
     * @param  {Object}      [scope] The optional scope to assign the handler
     * @return {boolean}             Returns true if added and false if callback already exists
     */
    addListener(target, type, handler, scope) {
        let added = false;
        let typeFound = false;

        for (let inputType of this.inputTypes) {
            let eventType = inputType.handlerObjects[type];

            if (Array.isArray(eventType)) {
                typeFound = true;

                eventType.push({
                    handler: scope ? handler.bind(scope) : handler,
                    original: handler,
                    target
                });

                added = true;
            }
        }

        if (!typeFound) {
            throw new TypeError(`Event type "${type}" does not exist.`);
        }

        return added;
    }

    /**
     * Removes matching handler if found
     * @method Input#removeListener
     * @param  {string}   type    the event type
     * @param  {function} handler the handler to remove
     * @return {boolean}  removed Returns true if removed and otherwise false
     */
    removeListener(type, handler) {
        let removed = false;
        let typeFound = false;

        for (let inputType of this.inputTypes) {
            let eventType = inputType.handlerObjects[type];
            typeFound = true;

            if (Array.isArray(eventType)) {
                for (let i = 0, len = eventType.length; i < len; i++) {
                    let handlerObject = eventType[i];

                    if (handlerObject.original === handler) {
                        eventType.splice(i, 1);
                        removed = true;
                        break;
                    }
                }
            }
        }

        if (!typeFound) {
            throw new TypeError(`Event type "${type}" does not exist.`);
        }

        return removed;
    }
}
