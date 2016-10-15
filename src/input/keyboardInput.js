import { tuneIn } from "../util/radio";
import cnst from "./constants/keyboard";
import keycodes from "./constants/keycodes";

/**
 * @module  keyboardInput
 */
export default {
    /**
     * @method keyboardInput.init
     * @param  {[type]} canvas    [description]
     */
    init (canvas) {
        this.canvas = canvas;

        this.handlerObjects = {
            [cnst.KEY_DOWN]: [],
            [cnst.KEY_UP]: []
        };
        this.keysDown = {};
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);

        for (let event in cnst) {
            tuneIn(canvas, event, this.enqueueEvent);
        }
    },

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     * @method keyboardInput.enqueueEvent
     * @param {object} inputEvent - The DOM event object
     */
    enqueueEvent (inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            keycode: inputEvent.keycode,
            key: keycodes[inputEvent.keycode],
            ctrlKey: inputEvent.ctrlKey,
            shiftKey: inputEvent.shiftKey,
            metaKey: inputEvent.metaKey
        };

        this.queuedEvents.push(event);

        switch (event.type) {
        case cnst.KEY_DOWN:
            this.keysDown["" + event.keycode] = event.key;
            break;
        case cnst.KEY_UP:
            delete this.keysDown[event.keycode];
            break;
        }
    }
};
