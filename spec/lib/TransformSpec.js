import Transform from "../../src/lib/Transform";

describe("Transform", ()=> {
    let xform;

    beforeEach(()=> {
        xform = new Transform();
    });

    it("creates identity matrix", ()=> {
        expect(xform.matrix).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });

    it("rotates the matrix", ()=> {
        xform.rotate(45 * Math.PI / 180);
        expect(xform.matrix).toEqual([ 0.7071067811865476, 0.7071067811865475, -0.7071067811865475, 0.7071067811865476, 0, 0 ]);
        xform.rotate(-45 * Math.PI / 180);
        expect(xform.matrix).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });

    it("scales the matrix", ()=> {
        xform.scale(2, 2);
        expect(xform.matrix).toEqual([ 2, 0, 0, 2, 0, 0 ]);
        xform.scale(-2, -2);
        expect(xform.matrix).toEqual([ -4, -0, -0, -4, 0, 0 ]);
    });

    it("translates the matrix", ()=> {
        xform.translate(64, 64);
        expect(xform.matrix).toEqual([ 1, 0, 0, 1, 64, 64 ]);
        xform.translate(-64, -64);
        expect(xform.matrix).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });

    it("saves the stack history", ()=> {
        let identity = [1, 0, 0, 1, 0, 0];
        let stack;

        xform.save();
        stack = xform.stack;
        expect(stack.length).toEqual(1);
        expect(stack[0]).toEqual(identity);

        // T>R>S
        xform.translate(32, 32);
        xform.scale(4, 4);
        xform.save();

        stack = xform.stack;
        expect(stack.length).toEqual(2);
        expect(stack[1]).toEqual([ 4, 0, 0, 4, 32, 32 ]);
    });

    it("restores the stack history", ()=> {
        let identity = [1, 0, 0, 1, 0, 0];
        let stack;

        xform.save();

        // T>R>S
        xform.translate(32, 32);
        xform.scale(4, 4);
        xform.save();

        xform.restore();
        stack = xform.stack;
        expect(stack.length).toEqual(1);
        expect(stack[0]).toEqual(identity);
    });
});
