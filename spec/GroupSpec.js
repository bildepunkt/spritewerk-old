import Group from "../src/Group";
import Collection from "../src/Collection";
import Sprite from "../src/Sprite";

describe("Group", ()=> {
    let group;

    beforeEach(()=> {
        group = new Group();
    });

    it("instantiates", ()=> {
        expect(group instanceof Group).toBe(true);
        expect(group.collection instanceof Collection).toBe(true);
        expect(group.sprite instanceof Sprite).toBe(true);
        expect(group.isGroup).toBe(true);
    });
});
