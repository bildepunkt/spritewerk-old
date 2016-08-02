"use strict";

describe("Xform", ()=> {
    var Xform = require("../xpile/Xform").default;
    var xform;

    beforeEach(()=> {
        xform = new Xform();
    });

    it("creates identity matrix", ()=> {
        expect(xform.getIdentity()).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });

    it("rotates the matrix", ()=> {
        xform.rotate(45);
        expect(xform.getMatrix()).toEqual([ 0.7071067811865476, 0.7071067811865475, -0.7071067811865475, 0.7071067811865476, 0, 0 ]);
        xform.rotate(-45);
        expect(xform.getMatrix()).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });

    it("scales the matrix", ()=> {
        xform.scale(2, 2);
        expect(xform.getMatrix()).toEqual([ 2, 0, 0, 2, 0, 0 ]);
        xform.scale(-2, -2);
        expect(xform.getMatrix()).toEqual([ -4, -0, -0, -4, 0, 0 ]);
    });

    it("translates the matrix", ()=> {
        xform.translate(64, 64);
        expect(xform.getMatrix()).toEqual([ 1, 0, 0, 1, 64, 64 ]);
        xform.translate(-64, -64);
        expect(xform.getMatrix()).toEqual([ 1, 0, 0, 1, 0, 0 ]);
    });
});
