import Input from "../../src/input/Input";
import Canvas from "../mocks/Canvas";
import constants from "../../src/input/eventConstants";

describe("Input", ()=> {
    let canvas = new Canvas();

    function handleEvent (e) {
        console.log(e);
    }

    it("instantiates with mix of user opts and defaults", ()=> {
        let input = new Input(canvas, {
            listenForTouch: false
        });

        expect(input.listenForTouch).toBe(false);
        expect(input.listenForMouse).toBe(true);
    });

    it("adds mouse event handler object with target", ()=> {
        let input = new Input(canvas);
        let target = {
            uuid: 2048
        };
        let handlerObject;

        input.addListener(target, "click", handleEvent);
        handlerObject = input.pointerListeners.click[0];
        
        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(target);
    });

    it("adds mouse event handler object with no target", ()=> {
        let input = new Input(canvas);
        let handlerObject;

        input.addListener(null, "click", handleEvent);
        handlerObject = input.pointerListeners.click[0];

        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(null);
    });

    it("adds handler object with scoped handler", ()=> {
        let input = new Input(canvas);
        let handlerObject;

        input.addListener(null, "click", handleEvent, this);
        handlerObject = input.pointerListeners.click[0];

        expect(input.pointerListeners.click.length).toEqual(1);
        expect(handlerObject.handler).not.toEqual(handleEvent);
        expect(handlerObject.original).toEqual(handleEvent);
    });

    it("doesn\'t add duplicate handler objects", ()=> {
        let input = new Input(canvas);

        input.addListener(null, "click", handleEvent);
        input.addListener(null, "click", handleEvent);
        expect(input.pointerListeners.click.length).toEqual(1);
    });

    it("removes a handler object", ()=> {
        let input = new Input(canvas);

        input.addListener(null, "click", handleEvent);
        expect(input.pointerListeners.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.pointerListeners.click.length).toEqual(0);
    });

    it("removes a handler object with scoped handler", ()=> {
        let input = new Input(canvas);

        input.addListener(null, "click", handleEvent, this);
        expect(input.pointerListeners.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.pointerListeners.click.length).toEqual(0);
    });

    it("returns correct handler objects", ()=> {
        let input = new Input(canvas);
        let handlerObjects;

        input.addListener(null, "tap", handleEvent);
        handlerObjects = input._getHandlerObjects(constants.TAP);
        expect(handlerObjects).toEqual(input.pointerListeners.tap);

        input.addListener(null, "keyup", handleEvent);
        handlerObjects = input._getHandlerObjects(constants.KEY_UP);
        expect(handlerObjects).toEqual(input.keyboardListeners.keyup);
    });
});
