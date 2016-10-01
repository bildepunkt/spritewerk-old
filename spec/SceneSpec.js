import Scene from "../src/Scene";
import Camera from "../src/Camera";
import Group from "../src/Group";
import Sprite from "../src/Sprite";
import Transform from "../src/lib/Transform";
// mocks
import Canvas from "./mocks/Canvas";
import context from "./mocks/context";

describe("Scene", ()=> {
    let defaults = {
        debug: true
    };
    let scene;
    let group;
    let sprite;

    beforeEach(()=> {
        scene = new Scene(new Canvas(), new Camera());
        group = new Group();
        sprite = new Sprite();
        
        spyOn(sprite, "render");
    });

    it("instantiates with params", ()=> {
        expect(scene instanceof Scene).toBe(true);
        expect(scene.camera instanceof Camera).toBe(true);
        expect(scene.options).toEqual(defaults);
        expect(scene.ctx).toEqual(context);
        expect(scene.transform instanceof Transform).toBe(true);
    });

    it("renders a group with one sprite", ()=> {
        group.collection.add(sprite, "sprite");
        scene.startRender(group);
        expect(sprite.render).toHaveBeenCalledWith(context);
    });
});
