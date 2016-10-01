import Camera from "../src/Camera";

describe("Camera", ()=> {
    let cam;

    beforeEach(()=> {
        cam = new Camera();
    });

    it("instantiates with defaults", ()=> {
        expect(cam instanceof Camera).toBe(true);
        expect(cam.x).toEqual(0);
        expect(cam.y).toEqual(0);
        expect(cam.width).toEqual(800);
        expect(cam.height).toEqual(600);
    });
});
