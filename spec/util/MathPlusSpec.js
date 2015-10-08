/**
 *
 */
describe('MathPlus', function() {
    var MathPlus = require('../../dist/util/MathPlus');

    it('clamps', function () {
        expect(MathPlus.clamp(3,  0, 2)).toEqual(2);
        expect(MathPlus.clamp(1,  0, 2)).toEqual(1);
        expect(MathPlus.clamp(-1, 0, 2)).toEqual(0);
    });
});