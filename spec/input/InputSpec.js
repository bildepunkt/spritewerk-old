import Input from "../../src/input/Input";
import mouseInput from "../../src/input/mouseInput";
import Canvas from "../_mocks/Canvas";
import event from "../_mocks/event";

describe("Input", ()=> {
    let canvas = new Canvas();
    let input;

    function handleEvent (e) {
        console.log(e);
    }

    beforeEach(()=> {
        input = new Input(canvas, [mouseInput], {
            listenForTouch: false
        });
    });

    it("instantiates with mouseInput", ()=> {
        expect(input instanceof Input).toBe(true);
        expect(input.inputTypes[0]).toEqual(mouseInput);
    });

    it("adds mouse handler object with target", ()=> {
        let target = {
            uuid: 2048
        };
        let handlerObject;

        input.addListener(target, "click", handleEvent);
        handlerObject = input.inputTypes[0].handlerObjects.click[0];

        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(target);
    });

    it("adds mouse event handler object with no target", ()=> {
        let handlerObject;

        input.addListener(null, "click", handleEvent);
        handlerObject = input.inputTypes[0].handlerObjects.click[0];

        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(null);
    });

    it("throws error on unlisted event add attempt", ()=> {
        try {
            input.addListener(null, "flubular", handleEvent);
        } catch(err) {
            expect(err).toEqual(new TypeError("Event type \"flubular\" does not exist."));
        }
    });

    it("removes a handler object", ()=> {
        input.addListener(null, "click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(0);
    });

    it("removes a handler object with scoped handler", ()=> {
        input.addListener(null, "click", handleEvent, this);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(0);
    });

    it("throws error on unlisted event removal attempt", ()=> {
        try {
            input.removeListener(null, "flubular", handleEvent);
        } catch(err) {
            expect(err).toEqual(new TypeError("Event type \"flubular\" does not exist."));
        }
    });

    it("adds a mouse handler", ()=> {
        let evt = Object.assign({}, event);
        evt.pageX = 32;
        evt.pageY = 32;

        input.addListener(null, "click", handleEvent);
        input.inputTypes[0].enqueueEvent(evt);

        expect(input.inputTypes[0].queuedEvents[0]).toEqual({
            domEvent: evt,
            type: "click",
            ctrlKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            x: 32,
            y: 32
        });
    });

    it("executes a mouse handler", ()=> {
        let evt = Object.assign({}, event);
        let type;

        evt.pageX = 32;
        evt.pageY = 32;

        input.addListener(null, "click", handleEvent);
        input.inputTypes[0].enqueueEvent(evt);
        type = input.inputTypes[0].handlerObjects.click[0];

        spyOn(type, "handler");

        input._onTick();
        expect(type.handler).toHaveBeenCalled();
    });
});
