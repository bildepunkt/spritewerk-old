"use strict";

describe("Context2d", ()=> {
    var Context2d = require("../xpile/Context2d").default;
    var Xform = require("../xpile/Xform").default;
    var context2d;

    beforeEach(()=> {
        context2d = new Context2d({
            save: ()=> {},
            restore: ()=> {},
            setTransform: ()=> {}
        }, new Xform());
    });

    it("saves the stack history", ()=> {
        let identity = [1, 0, 0, 1, 0, 0];
        let stack;

        context2d.save();
        stack = context2d.getStack();
        expect(stack.length).toEqual(1);
        expect(stack[0]).toEqual(identity);

        // T>R>S
        context2d.translate(32, 32);
        context2d.scale(4, 4);
        context2d.save();

        stack = context2d.getStack();
        expect(stack.length).toEqual(2);
        expect(stack[1]).toEqual([ 4, 0, 0, 4, 32, 32 ]);
    });

    it("restores the stack history", ()=> {
        let identity = [1, 0, 0, 1, 0, 0];
        let stack;

        context2d.save();

        // T>R>S
        context2d.translate(32, 32);
        context2d.scale(4, 4);
        context2d.save();

        context2d.restore();
        stack = context2d.getStack();
        expect(stack.length).toEqual(1);
        expect(stack[0]).toEqual(identity);
    });
});