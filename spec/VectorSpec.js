/**
 *
 */
describe('Vector', function() {
    var Vector = require('../dist/Vector');
    var vector;

    it('has x & y coordinates that default to zero', function () {
        vector = new Vector();
        expect(vector.x).toEqual(0);
        expect(vector.y).toEqual(0);
    });

    it('has x & y coordinates that can be set in constructor', function () {
        vector = new Vector(32, 64);
        expect(vector.x).toEqual(32);
        expect(vector.y).toEqual(64);
    });
});
