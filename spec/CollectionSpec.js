import Collection from "../src/Collection";

describe("Collection", ()=> {
    let itemA = {
        x: 4, y: 4, sx: 1, sy: 1, uid: 0
    }
    let itemB = {
        x: 8, y: 8, sx: 2, sy: 2, uid: 1
    }
    let collection;

    beforeEach(()=> {
        collection = new Collection();
    });

    it("adds one item", ()=> {
        collection.add(itemA, "itemA");

        expect(collection.items[0]).toEqual({
            item: itemA,
            name: "itemA"
        });
    });

    it("adds one item at the given index", ()=> {
        collection.add(itemA, "itemA");
        collection.add(itemA, "itemB");
        collection.add(itemA, "itemC");

        collection.addAt(1, itemB, "newItem");

        expect(collection.getCount()).toEqual(4);
        expect(collection.items[1]).toEqual({
            item: itemB,
            name: "newItem"
        });
    });

    it("adds many items", ()=> {
        collection.addMany(
            { item: itemA },
            { item: itemA },
            { item: itemB }
        );

        expect(collection.getCount()).toEqual(3);
        expect(collection.items[2].item).toEqual(itemB);
    });

    it("returns correct count", ()=> {
        collection.add(itemA, "itemA");
        expect(collection.getCount()).toEqual(1);
        collection.add(itemA, "itemB");
        expect(collection.getCount()).toEqual(2);
        collection.add(itemA, "itemC");
        expect(collection.getCount()).toEqual(3);
    });

    it("fetches an item by name", ()=> {
        collection.addMany(
            { item: itemA, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" }
        );

        expect(collection.fetch("b")).toEqual(itemB);
    });

    it("fetches an item at given index", ()=> {
        collection.addMany(
            { item: itemA, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" }
        );

        expect(collection.fetchAt(1)).toEqual(itemB);
    });

    it("removes an item by name", ()=> {
        collection.addMany(
            { item: itemB, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" },
            { item: itemB, name: "d" }
        );

        collection.remove("c");
        expect(collection.getCount()).toEqual(3);
        expect(collection.fetchAt(0)).toEqual(itemB);
        expect(collection.fetchAt(1)).toEqual(itemB);
        expect(collection.fetchAt(2)).toEqual(itemB);
    });

    it("removes an item at given index", ()=> {
        collection.addMany(
            { item: itemB, name: "a" },
            { item: itemA, name: "b" },
            { item: itemB, name: "c" },
            { item: itemB, name: "d" }
        );

        collection.removeAt(1);
        expect(collection.getCount()).toEqual(3);
        expect(collection.fetchAt(0)).toEqual(itemB);
        expect(collection.fetchAt(1)).toEqual(itemB);
        expect(collection.fetchAt(2)).toEqual(itemB);
    });

    it("removes all items", ()=> {
        collection.addMany(
            { item: itemB, name: "a" },
            { item: itemA, name: "b" },
            { item: itemB, name: "c" },
            { item: itemB, name: "d" }
        );

        expect(collection.getCount()).toEqual(4);

        collection.removeAll();
        expect(collection.getCount()).toEqual(0);
    });
});
