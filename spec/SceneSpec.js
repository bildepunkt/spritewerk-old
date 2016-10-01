import Scene from "../src/Scene";
import Camera from "../src/Camera";
import Canvas from "./mocks/Canvas";

describe("Scene", ()=> {
    let scene;
    let defaults = {
        debug: true
    };

    beforeEach(()=> {
        scene = new Scene(new Canvas(), new Camera());
    });

    it("instantiates with params", ()=> {
        expect(scene instanceof Scene).toBe(true);
        expect(scene.camera instanceof Camera).toBe(true);
        expect(scene.options).toEqual(defaults);
    });
});
