import { tuneIn } from "../util/radio";
import mouseCnst from "./constants/mouse";
import emulatedCnst from "./constants/emulated";
import { getScaleFactor } from "../util/domHelpers";
//import { pointRectCollide } from "../util/physics";

/**
 * @module MouseInput
 */
export default {
    /**
     * @method mouseInput.init
     * @param  {[type]} canvas    [description]
     * @param  {[type]} canvasFit [description]
     */
    init (canvas, canvasFit) {
        this.canvas = canvas;
        this.canvasFit = canvasFit;

        this.handlerObjects = {
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: [],
            [emulatedCnst.DBL_CLICK]: [],
            [emulatedCnst.CLICK]: []
        };
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);
        this.clickCandidates = [];

        for (let event in [mouseCnst.MOUSE_DOWN, mouseCnst.MOUSE_MOVE, mouseCnst.MOUSE_UP]) {
            tuneIn(canvas, event, this.enqueueEvent);
        }
    },

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     * @method mouseInput.enqueueEvent
     * @param {object} inputEvent - The DOM event object
     */
    enqueueEvent (inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let scaleFactor = this.canvasFit ? getScaleFactor(this.canvas) : 1;
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            ctrlKey: inputEvent.ctrlKey,
            shiftKey: inputEvent.shiftKey,
            metaKey: inputEvent.metaKey,
            button: inputEvent.button
        };

        // coordinate positions relative to canvas scaling
        event.x = Math.round((inputEvent.pageX - this.canvas.offsetLeft) * scaleFactor);
        event.y = Math.round((inputEvent.pageY - this.canvas.offsetTop) * scaleFactor);

        this.queuedEvents.push(event);

        // emulate click events
        switch (event.type) {
        case mouseCnst.MOUSE_DOWN:


            break;
        case mouseCnst.MOUSE_UP:

            this.queuedEvents.push(Object.assign({}, event, {
                type: mouseCnst.CLICK
            }));
            break;
        }
    }
};
