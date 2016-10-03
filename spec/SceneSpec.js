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
    let camera;
    let sprite;

    beforeEach(()=> {
        camera = new Camera(512, 512);
        scene = new Scene(new Canvas(), camera);
        group = new Group();
        sprite = new Sprite();
    });

    it("instantiates with params", ()=> {
        expect(scene instanceof Scene).toBe(true);
        expect(scene.camera instanceof Camera).toBe(true);
        expect(scene.options).toEqual(defaults);
        expect(scene.ctx).toEqual(context);
        expect(scene.transform instanceof Transform).toBe(true);
    });

    it("renders a group with one sprite", ()=> {
        spyOn(sprite, "render");

        group.collection.add(sprite, "sprite");
        scene.startRender(group);

        expect(sprite.render).toHaveBeenCalledWith(context);
    });

    it("updates a group with one sprite", ()=> {
        spyOn(sprite, "update");

        group.collection.add(sprite, "sprite");
        scene.startUpdate(group);

        expect(sprite.update).toHaveBeenCalled();
    });
});
