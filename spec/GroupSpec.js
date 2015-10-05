/**
 * Group Spec
 */
describe('Group', function() {
    var Group = require('../dist/Group');
    var Sprite = require('../dist/Sprite');
    var Point = require('../dist/Point');

    it('is of type "Point"', function () {
        expect(new Group() instanceof Point).toEqual(true);
    });

    it('updates 1st level renderable\'s global coordinates', function () {
        var group = new Group();
        var sprite = new Sprite();

        group.setX(64);
        group.addChild(sprite);

        expect(sprite.getGlobalX()).toEqual(64);

        group.setY(32);

        expect(sprite.getGlobalY()).toEqual(32);
    });

    it('updates 1st level group\'s global coordinates', function () {
        var group = new Group();
        var childGroup = new Sprite();

        group.setX(64);
        group.addChild(childGroup);

        expect(childGroup.getGlobalX()).toEqual(64);

        group.setY(32);

        expect(childGroup.getGlobalY()).toEqual(32);
    });

    it('updates 4th level renderable\'s global coordinates', function () {
        var alpha = new Group().setX(4).setY(4);
        var beta  = new Group().setX(4).setY(4);
        var gamma = new Group().setX(4).setY(4);
        var delta = new Group().setX(4).setY(4);
        var sprite = new Sprite();

        alpha.addChild(beta);
        beta.addChild(gamma);
        gamma.addChild(delta);
        delta.addChild(sprite);

        expect(sprite.getGlobalX()).toEqual(16);
        expect(sprite.getGlobalY()).toEqual(16);
    });

    it('returns renderable & group children', function () {
        var group = new Group();

        group.addChild(new Sprite());
        group.addChild(new Sprite());
        group.addChild(new Group());

        expect(group.getChildren().length).toEqual(3);
    });

    it('returns renderable & group child by name', function () {
        var spriteName = 'Arya';
        var groupName = 'groupA';
        var group = new Group();

        group.addChild(new Sprite(), spriteName);
        group.addChild(new Group(), groupName);

        expect(group.getChild(spriteName)).toBeTruthy();
        expect(group.getChild(groupName)).toBeTruthy();
    });
});
