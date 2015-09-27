/**
 *
 */
describe('Vector', function() {
    var Vector = require('../dist/Vector');
    var vector;

    beforeEach(function () {
        vector = new Vector();
    });

    it('should have property x which equals zero', function () {
        expect(vector.x).toEqual(0);
    });

    it('should have property y which equals zero', function () {
        expect(vector.y).toEqual(0);
    });
});
