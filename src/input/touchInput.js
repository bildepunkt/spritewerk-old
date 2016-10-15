import { tuneIn } from "../util/radio";
import touchCnst from "./constants/touch";
import emulatedCnst from "./constants/emulated";
import { getScaleFactor } from "../util/domHelpers";

/**
 * @module touchInput
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
            [touchCnst.DBL_TAP]: [],
            [touchCnst.TAP]: [],
            [touchCnst.TOUCH_START]: [],
            [touchCnst.TOUCH_MOVE]: [],
            [touchCnst.TOUCH_END]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        };
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);
        this.clickCandidates = [];
        this.isDragging = false;
        this.canDrag = false;

        for (let event in touchCnst) {
            tuneIn(canvas, touchCnst[event], this.enqueueEvent);
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
        let x, y;

        if (inputEvent.touches && inputEvent.touches.length) {
            x = inputEvent.touches[0].pageX;
            y = inputEvent.touches[0].pageY;
        } else if (inputEvent.changedTouches && inputEvent.changedTouches.length) {
            x = inputEvent.changedTouches[0].pageX;
            y = inputEvent.changedTouches[0].pageY;
        } else {
            x = inputEvent.pageX;
            y = inputEvent.pageY;
        }

        // coordinate positions relative to canvas scaling
        event.x = Math.round((x - this.canvas.offsetLeft) * scaleFactor);
        event.y = Math.round((y - this.canvas.offsetTop) * scaleFactor);

        this.queuedEvents.push(event);

        // emulate events
        switch (event.type) {
        case touchCnst.TOUCH_START:
            this.canDrag = true;

            break;
        case touchCnst.TOUCH_MOVE:
            if (this.canDrag) {
                if (!this.isDragging) {
                    this.queuedEvents.push(Object.assign({}, event, {
                        type: emulatedCnst.DRAG_START
                    }));
                }

                this.queuedEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG
                }));

                this.isDragging = true;
            }

            break;
        case touchCnst.TOUCH_END:
            if (this.isDragging) {
                this.queuedEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG_END
                }));

                this.isDragging = false;
            }

            this.canDrag = false;
            break;
        }
    }
};
