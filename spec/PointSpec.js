/**
 * Point Spec
 */
describe('Point', function() {
    var Point = require('../dist/Point');

    it('has accurate x & y coordinates', function () {
        var point = new Point().setX(32).setY(16);

        expect(point.getX()).toEqual(32);
        expect(point.getY()).toEqual(16);
    });

    it('has accurate global coordinates', function () {
        var point = new Point().setX(16).setY(8);
        point.setParentX(16).setParentY(8);

        expect(point.getGlobalX()).toEqual(32);
        expect(point.getGlobalY()).toEqual(16);
    });
});
