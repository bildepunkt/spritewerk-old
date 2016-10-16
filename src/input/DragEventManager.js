import emulatedCnst from "./constants/emulated";

/**
 * Provides a common interface for mouse and touch events to emulate drag events
 * @class input/DragEventManager
 * @requires ./constants/emulated
 * @param  {String} start The mouse/touch start event
 * @param  {String} move  The mouse/touch move event
 * @param  {String} end   The mouse/touch end event
 */
export default class DragEventManager {
    constructor (start, move, end) {
        this.startEvent = start;
        this.moveEvent = move;
        this.endEvent = end;
        this.isDragging = false;
        this.canDrag = false;
    }

    getDragEvents (event) {
        let dragEvents = [];

        // emulate events
        switch (event.type) {
        case this.startEvent:
            this.canDrag = true;

            break;
        case this.moveEvent:
            if (this.canDrag) {
                if (!this.isDragging) {
                    dragEvents.push(Object.assign({}, event, {
                        type: emulatedCnst.DRAG_START
                    }));
                }

                dragEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG
                }));

                this.isDragging = true;
            }

            break;
        case this.endEvent:
            if (this.isDragging) {
                dragEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG_END
                }));

                this.isDragging = false;
            }

            this.canDrag = false;
            break;
        }

        return dragEvents;
    }
}