import * as math from "../../src/util/math";

describe("util/math", ()=> {

    describe("degreesToRadians", ()=> {
        it("converts degrees to radians", function () {
            expect(math.degreesToRadians(1)).toEqual(0.017453292519943295);
            expect(math.degreesToRadians(45)).toEqual(0.7853981633974483);
            expect(math.degreesToRadians(90)).toEqual(1.5707963267948966);
        });
    });

    describe("radiansToDegrees", ()=> {
        it("converts radians to degrees", function () {
            expect(math.radiansToDegrees(1)).toEqual(57.29577951308232);
            expect(math.radiansToDegrees(4)).toEqual(229.1831180523293);
            expect(math.radiansToDegrees(8)).toEqual(458.3662361046586);
        });
    });
});