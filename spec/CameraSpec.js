/**
 * Camera Spec
 */
describe('Camera', function() {
    var Camera = require('../dist/Camera');
    var Point = require('../dist/Point');

    it('is of type "Point"', function () {
        expect(new Camera() instanceof Point).toEqual(true);
    });
});