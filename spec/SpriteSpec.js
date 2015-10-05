/**
 * Sprite Spec
 */
describe('Sprite', function() {
    var Sprite = require('../dist/Sprite');
    var Point = require('../dist/Point');
    var sprite;

    beforeEach(function () {
        sprite = new Sprite();
    });

    it('is of type "Point"', function () {
        expect(sprite instanceof Point).toEqual(true);
    });

    it('has accurate dimensions', function () {
        sprite.setWidth(32).setHeight(32);

        expect(sprite.getWidth()).toEqual(32);
        expect(sprite.getHeight()).toEqual(32);
    });
});