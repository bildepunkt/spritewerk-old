import Viewport from "../src/Viewport";
import Element from "./mocks/Element";
import doc from "./mocks/document";

describe("Viewport", ()=> {
    const defaults = {
        window: new Element("window"),
        document: doc,
        parent: doc.body,
        fitToWindow: true
    };
    let viewport;

    beforeEach(()=> {
        viewport = new Viewport(640, 480, defaults);
    });

    it("instantiates with params", ()=> {
        expect(viewport instanceof Viewport).toBe(true);
        expect(viewport.width).toEqual(640);
        expect(viewport.height).toEqual(480);
        expect(viewport.options).toEqual(defaults);
    });
});
