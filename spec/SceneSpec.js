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
    let size = 512;
    let scene;
    let group;
    let camera;
    let canvas;
    let sprite;

    beforeEach(()=> {
        camera = new Camera(0, 0, size, size);
        canvas = new Canvas();
        canvas.width = size;
        canvas.height = size;
        scene = new Scene(canvas, camera);
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

    it("offsets the transform stack when camera zoomed", ()=> {
        camera.zoom = 2;

        group.collection.add(sprite, "sprite");
        scene.startRender(group);

        expect(scene.cameraXformOffset).toEqual({
            x: -256, y: -256
        });
    });

    xit("offsets the transform stack when group is scaled", ()=> {
        group.sx = 2;
        group.sy = 2;

        group.collection.add(sprite, "sprite");
        scene.startRender(group);

        expect(scene.xformOffset).toEqual({
            x: -256, y: -256
        });
    });
});
