import mouseInput from "../../src/input/mouseInput";
import mouseCnst from "../../src/input/constants/mouse";
import emulatedCnst from "../../src/input/constants/emulated";
import Canvas from "../_mocks/Canvas";
import event from "../_mocks/event";

describe("mouseInput", ()=> {
    let canvas = new Canvas();

    beforeEach(()=> {
        mouseInput.init(canvas, false);
    });

    it("initializes", ()=> {
        expect(mouseInput.handlerObjects).toEqual({
            [mouseCnst.DBL_CLICK]: [],
            [mouseCnst.CLICK]: [],
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        });

        expect(mouseInput.queuedEvents).toEqual([]);
    });

    it("calculates canvas offset", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.CLICK,
            pageX: 32,
            pageY: 32
        });

        canvas.offsetLeft = 28;
        canvas.offsetTop = 16;

        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].x).toEqual(4);
        expect(mouseInput.queuedEvents[0].y).toEqual(16);
    });

    it("queues events", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.CLICK
        });

        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].domEvent).toEqual(e);
        expect(mouseInput.queuedEvents[0].type).toEqual(mouseCnst.CLICK);
    });

    it("emulates drag events", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_DOWN
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].type).toEqual(mouseCnst.MOUSE_DOWN);

        e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_MOVE
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[1].type).toEqual(mouseCnst.MOUSE_MOVE);
        expect(mouseInput.queuedEvents[2].type).toEqual(emulatedCnst.DRAG_START);
        expect(mouseInput.queuedEvents[3].type).toEqual(emulatedCnst.DRAG);

        e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_UP
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[4].type).toEqual(mouseCnst.MOUSE_UP);
        expect(mouseInput.queuedEvents[5].type).toEqual(emulatedCnst.DRAG_END);
    });
});