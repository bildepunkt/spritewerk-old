import eventConstants from "./eventConstants";
import { tuneIn } from "../util/radio";
import { getScaleFactor } from "../util/domHelpers";
import { pointRectCollide } from "../util/physics";

const mouseEvents = [
    eventConstants.CLICK,
    eventConstants.DBL_CLICK,
    eventConstants.MOUSE_DOWN, 
    eventConstants.MOUSE_UP,
    eventConstants.MOUSE_MOVE
];
const touchEvents = [
    eventConstants.TAP,
    eventConstants.DBL_TAP,
    eventConstants.TOUCH_START,
    eventConstants.TOUCH_END,
    eventConstants.TOUCH_MOVE
];

let canDrag = false;
let isDragging = false;
let draggableHandlers = [];
let queuedEvents = [];

/**
 * Adds mouse listeners
 * @method input.addMouseListeners
 */
export function addMouseListeners(canvas) {
    for (let event of mouseEvents) {
        tuneIn(canvas, event, enqueueEvents);
    }
}

/**
 * Adds touch listeners
 * @method input.addTouchListeners
 */
export function addTouchListeners(canvas) {
    for (let event of touchEvents) {
        tuneIn(canvas, event, enqueueEvents);
    }
}

/**
 * Handler for DOM events. Creates custom event object with helpful properties
 * Creates event objects with x/y coordinates
 * Not currently supporting multi-touch
 *
 * @method input.enqueueEvents
 * @param {object} inputEvent The DOM input event object
 */
function enqueueEvents(inputEvent, canvas, canvasFit) {
    inputEvent.preventDefault();
    inputEvent.stopPropagation();

    let scaleFactor = canvasFit ? getScaleFactor(canvas) : 1;
    let event = {
        domEvent: inputEvent,
        type: inputEvent.type
    };

    if (inputEvent.touches && inputEvent.touches.length) {
        event.x = inputEvent.touches[0].pageX;
        event.y = inputEvent.touches[0].pageY;
    } else if (inputEvent.changedTouches && inputEvent.changedTouches.length) {
        event.x = inputEvent.changedTouches[0].pageX;
        event.y = inputEvent.changedTouches[0].pageY;
    } else {
        event.x = inputEvent.pageX;
        event.y = inputEvent.pageY;
    }

    // coordinate positions relative to canvas scaling
    event.x = Math.round((event.x - canvas.offsetLeft) * scaleFactor);
    event.y = Math.round((event.y - canvas.offsetTop) * scaleFactor);

    queuedEvents.push(event);

    // check for drag simulation
    switch (event.type) {
    case eventConstants.MOUSE_DOWN:
    case eventConstants.TOUCH_START:
        canDrag = true;

        for (let handlerObject of listeners.drag) {
            // if handlerObj has a target make sure it is hit first; if not, add it and trigger regardless
            if (handlerObject.target) {
                if (pointRectCollide(event.x, event.y, handlerObject.target.getBoundingBox())) {
                    handlerObject.offsetX = event.x - handlerObject.target.x;
                    handlerObject.offsetY = event.y - handlerObject.target.y;
                    
                    draggableHandlers.push(handlerObject);
                }
            } else {
                draggableHandlers.push(handlerObject);
            }
        }
        break;
    case eventConstants.MOUSE_UP:
    case eventConstants.TOUCH_END:
        canDrag = false;
        draggableHandlers = [];

        if (isDragging) {
            isDragging = false;

            queuedEvents.push(Object.assign({}, event, {
                type: eventConstants.DRAG_END
            }));
        }
        break;
    case eventConstants.MOUSE_MOVE:
    case eventConstants.TOUCH_MOVE:
        if (canDrag) {
            if (!isDragging) {
                isDragging = true;

                queuedEvents.push(Object.assign({}, event, {
                    type: eventConstants.DRAG_START
                }));
            }

            queuedEvents.push(Object.assign({}, event, {
                type: eventConstants.DRAG
            }));
        }
        break;
    }
}

function handlePointerEvents (event, listeners) {
    switch (event.type) {
    case eventConstants.DRAG:
        for (let handlerObject of draggableHandlers) {
            event.offsetX = handlerObject.offsetX;
            event.offsetY = handlerObject.offsetY;

            handlerObject.handler(event);
        }
    default:
        for (let handlerObject of listeners) {
            if (handlerObject.target) {
                // if event was bound with a target, trigger handler ONLY if target hit
                if (pointRectCollide(event.x, event.y, handlerObject.target.getBoundingBox())) {
                    // add target to the event obj
                    event.target = handlerObject.target;
                    handlerObject.handler(event);
                }
            } else {
                handlerObject.handler(event);
            }
        }
    }
}

/**
 * executes handlers of the given event's type
 * @method input.triggerHandlers
 * @param {object} event
 * @private
 */
function triggerHandlers(listeners) {
    for (let event of queuedEvents) {
        switch (event.type) {
        case eventConstants.DRAG:
            for (let handlerObject of draggableHandlers) {
                event.offsetX = handlerObject.offsetX;
                event.offsetY = handlerObject.offsetY;

                handlerObject.handler(event);
            }
            break;
        default:
            for (let handlerObject of listeners[event.type]) {
                if (handlerObject.target) {
                    // if event was bound with a target, trigger handler ONLY if target hit
                    if (pointRectCollide(event.x, event.y, handlerObject.target.getBoundingBox())) {
                        // add target to the event obj
                        event.target = handlerObject.target;
                        handlerObject.handler(event);
                    }
                } else {
                    handlerObject.handler(event);
                }
            }
            break;
        }
    }
}
