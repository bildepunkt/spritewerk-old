"use strict";

describe("Sprite", ()=> {
    let Sprite = require("../xpile/Sprite").default;
    let tween = {
        isComplete: ()=> { return true },
        update: ()=> {}
    };
    let sprite;

    beforeEach(()=> {
        sprite = new Sprite();
    });

    it("increments ids", ()=> {
        expect(sprite.uuid).toEqual(0);
        let sprite2 = new Sprite();
        expect(sprite2.uuid).toEqual(1);
        let sprite3 = new Sprite();
        expect(sprite3.uuid).toEqual(2);
    });

    it("sets dirty to true on `set`s", ()=> {
        sprite.x = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.y = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.width = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.height = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.sx = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.sy = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.rotation = 4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.opacity = 0.4;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.composite = Sprite.LUMINOSITY;
        expect(sprite._dirty).toBe(true);
        sprite._dirty = false;

        sprite.visible = 0.4;
        expect(sprite._dirty).toBe(true);
    });

    it("returns correct bounding box", ()=> {
        let bb;

        sprite.width = 64;
        sprite.height = 64;
        bb = sprite.getBoundingBox();
        expect(bb.minX).toEqual(0);
        expect(bb.minY).toEqual(0);
        expect(bb.maxX).toEqual(64);
        expect(bb.maxX).toEqual(64);

        sprite.x = 64;
        sprite.y = 64;
        bb = sprite.getBoundingBox();
        expect(bb.minX).toEqual(64);
        expect(bb.minY).toEqual(64);
        expect(bb.maxX).toEqual(128);
        expect(bb.maxX).toEqual(128);

        sprite.sx = -1;
        sprite.sy = -1;
        bb = sprite.getBoundingBox();
        expect(bb.minX).toEqual(0);
        expect(bb.minY).toEqual(0);
        expect(bb.maxX).toEqual(64);
        expect(bb.maxX).toEqual(64);

        sprite.parentTransforms.x = 64;
        sprite.parentTransforms.y = 64;
        bb = sprite.getBoundingBox();
        expect(bb.minX).toEqual(64);
        expect(bb.minY).toEqual(64);
        expect(bb.maxX).toEqual(128);
        expect(bb.maxX).toEqual(128);
    });

    it("adds tweens", ()=> {
        expect(sprite.tweens.length).toEqual(0);
        sprite.addTween({});
        expect(sprite.tweens.length).toEqual(1);
    });

    it("removes tweens when complete", ()=> {
        sprite.addTween(tween);
        expect(sprite.tweens.length).toEqual(1);
        sprite.update();
        expect(sprite.tweens.length).toEqual(0);
    });
});
