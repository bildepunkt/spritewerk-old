import keyboardInput from "../../src/input/keyboardInput";
import cnst from "../../src/input/constants/keyboard";
import keycodes from "../../src/input/constants/keycodes";
import Canvas from "../_mocks/Canvas";
import event from "../_mocks/event";

describe("keyboardInput", ()=> {
    let canvas = new Canvas();

    beforeEach(()=> {
        keyboardInput.init(canvas);
    });

    it("initializes", ()=> {
        expect(keyboardInput.handlerObjects).toEqual({
            [cnst.KEY_DOWN]: [],
            [cnst.KEY_UP]: []
        });
        expect(keyboardInput.keysDown).toEqual({});
        expect(keyboardInput.queuedEvents).toEqual([]);
    });

    it("queues events", ()=> {
        var kc = 36;
        let e = Object.assign({}, event, {
            type: cnst.KEY_DOWN,
            keycode: kc
        });

        keyboardInput.enqueueEvent(e);

        expect(keyboardInput.queuedEvents[0].domEvent).toEqual(e);
        expect(keyboardInput.queuedEvents[0].key).toEqual(keycodes[kc]);
        expect(keyboardInput.queuedEvents[0].keycode).toEqual(kc);
        expect(keyboardInput.queuedEvents[0].type).toEqual(cnst.KEY_DOWN);
    });

    it("adds and removes keysDown", ()=> {
        var kc = 36;
        let e = Object.assign({}, event, {
            type: cnst.KEY_DOWN,
            keycode: kc
        });

        keyboardInput.enqueueEvent(e);

        expect(keyboardInput.keysDown).toEqual({
            [kc]: keycodes[kc]
        });

        e.type = cnst.KEY_UP;
        e.keycode = kc;

        keyboardInput.enqueueEvent(e);

        expect(keyboardInput.keysDown).toEqual({});
    });
});