import Sprite from "../src/Sprite";

describe("Sprite", ()=> {
    let sprite;

    beforeEach(()=> {
        sprite = new Sprite();
    });

    it("increments ids", ()=> {
        expect(sprite.uuid).toEqual(1);
        let sprite2 = new Sprite();
        expect(sprite2.uuid).toEqual(2);
        let sprite3 = new Sprite();
        expect(sprite3.uuid).toEqual(3);
    });

    it("calculates global coordinates", ()=> {
        sprite.x = 64;
        sprite.y = 64;
        sprite.parentTransforms = {
            x: 64, y: 64
        };

        expect(sprite.gx).toEqual(128);
        expect(sprite.gy).toEqual(128);
    });
});
