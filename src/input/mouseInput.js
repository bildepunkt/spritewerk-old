import { tuneIn } from "../util/radio";
import mouseCnst from "./constants/mouse";
import keycodes from "./constants/keycodes";
import { getScaleFactor } from "../util/domHelpers";
import { pointRectCollide } from "../util/physics";

/**
 * 
 * @requires input/keycodes
 */
export default {
    handlerObjects: {},
    queuedEvents: [],

    init (canvas, canvasFit) {
        this.canvas = canvas;
        this.canvasFit = canvasFit;

        this.handlerObjects = {
            [mouseCnst.DBL_CLICK]: [],
            [mouseCnst.CLICK]: [],
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: []
        };
        this.queuedEvents = [];
        this.enqueueEvents = this.enqueueEvents.bind(this);

        for (let event in mouseCnst) {
            tuneIn(canvas, event, this.enqueueEvents);
        }
    },

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     * Creates event objects with x/y coordinates
     * Not currently supporting multi-touch
     *
     * @method input.enqueueEvents
     * @param {object} inputEvent The DOM input event object
     */
    enqueueEvents (inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let scaleFactor = this.canvasFit ? getScaleFactor(this.canvas) : 1;
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            keycode: inputEvent.keycode,
            key: keycodes[inputEvent.keycode]
        };

        event.x = inputEvent.pageX;
        event.y = inputEvent.pageY;

        // coordinate positions relative to canvas scaling
        event.x = Math.round((event.x - this.canvas.offsetLeft) * scaleFactor);
        event.y = Math.round((event.y - this.canvas.offsetTop) * scaleFactor);

        this.queuedEvents.push(event);
    },

    executeHandlers () {
        for (let event of this.queuedEvents) {
            for (let handlerObj of this.handlerObjects[event.type]) {
                handlerObj.handler(event);
            }
        }

        this.queuedEvents = [];
    }
};
