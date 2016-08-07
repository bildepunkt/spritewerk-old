"use strict";

describe("util/physics", ()=> {
    let Sprite = require("../../xpile/Sprite").default;
    let physics = require("../../xpile/util/physics");

    describe("pointRectCollide", ()=> {
        it("detects a point inside a rectangle", ()=> {
            expect( physics.pointRectCollide(0, 0, new Sprite(0, 0, 4, 4)) ).toBe(true);
            expect( physics.pointRectCollide(0, 0, new Sprite(1, 1, 4, 4)) ).toBe(false);

            expect( physics.pointRectCollide(4, 4, new Sprite(0, 0, 4, 4)) ).toBe(true);
            expect( physics.pointRectCollide(5, 5, new Sprite(0, 0, 4, 4)) ).toBe(false);

            expect( physics.pointRectCollide(2, 2, new Sprite(-4, -4, 8, 8)) ).toBe(true);
        });
    });

    describe("rectRectCollide", ()=> {
        it("detects a rectangle colliding with another rectangle", ()=> {
            
        });
    });
});
