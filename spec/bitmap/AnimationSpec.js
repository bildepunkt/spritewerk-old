'use strict';

var Animation = require('../../xpile/bitmap/Animation').default;

describe('Animation', function () {

    it('returns an instance with default options', function () {
        var animation = new Animation([0, 32, 64], 0);

        expect(animation._srcXSequence.length).toEqual(3);
        expect(animation._srcYSequence).toEqual(0);
        expect(animation._step).toEqual(2);
        expect(animation._loop).toBe(false);
    });

    it('sets accurate src coordinates on 2 step', function () {
        var animation = new Animation([0, 32, 64], 32);
        var srcCoords;

        srcCoords = animation.update();
        expect(srcCoords).toBe(null);

        animation.play();

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(0);
        expect(srcCoords.srcY).toEqual(32);
        // frame gets set after coords calculated
        expect(animation._frame).toEqual(0);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(0);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(2);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(64);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(2);
    });

    it('sets accurate src coordinates on 3 step', function () {
        var animation = new Animation([32, 64], 32, 3);
        var srcCoords;

        animation.play();

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(0);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(0);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(64);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);
    });

    it('iterates over x & y coords', function () {
        var animation = new Animation([32, 64], [32, 64], 1);
        var srcCoords;

        animation.play();

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(64);
        expect(srcCoords.srcY).toEqual(64);
        expect(animation._frame).toEqual(2);
    });

    it('loops if loop set to true', function () {
        var animation = new Animation([32, 64], 32, 1, true);
        var srcCoords;

        animation.play();

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(64);
        expect(srcCoords.srcY).toEqual(32);
        // frame has now been reset via loop
        expect(animation._frame).toEqual(0);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(32);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(1);

        srcCoords = animation.update();
        expect(srcCoords.srcX).toEqual(64);
        expect(srcCoords.srcY).toEqual(32);
        expect(animation._frame).toEqual(0);
    });
});
