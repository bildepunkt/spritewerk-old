"use strict";

describe("Group", ()=> {
    var Group = require("../xpile/Group").default;
    var itemA = {
        x: 4, y: 4, sx: 1, sy: 1, uid: 0
    }
    var itemB = {
        x: 8, y: 8, sx: 2, sy: 2, uid: 1
    }
    var group;

    beforeEach(()=> {
        group = new Group();
    });

    it("adds one item", ()=> {
        group.add(itemA, "itemA");

        expect(group.items[0]).toEqual({
            item: itemA,
            name: "itemA"
        });
    });

    it("adds one item at the given index", ()=> {
        group.add(itemA, "itemA");
        group.add(itemA, "itemB");
        group.add(itemA, "itemC");

        group.addAt(1, itemB, "newItem");

        expect(group.getCount()).toEqual(4);
        expect(group.items[1]).toEqual({
            item: itemB,
            name: "newItem"
        });
    });

    it("adds many items", ()=> {
        group.addMany(
            { item: itemA },
            { item: itemA },
            { item: itemB }
        );

        expect(group.getCount()).toEqual(3);
        expect(group.items[2].item).toEqual(itemB);
    });

    it("returns correct count", ()=> {
        group.add(itemA, "itemA");
        expect(group.getCount()).toEqual(1);
        group.add(itemA, "itemB");
        expect(group.getCount()).toEqual(2);
        group.add(itemA, "itemC");
        expect(group.getCount()).toEqual(3);
    });

    it("gets an item by name", ()=> {
        group.addMany(
            { item: itemA, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" }
        );

        expect(group.getBy("b")).toEqual(itemB);
    });

    it("gets an item at given index", ()=> {
        group.addMany(
            { item: itemA, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" }
        );

        expect(group.getAt(1)).toEqual(itemB);
    });

    it("removes an item by name", ()=> {
        group.addMany(
            { item: itemB, name: "a" },
            { item: itemB, name: "b" },
            { item: itemA, name: "c" },
            { item: itemB, name: "d" }
        );

        group.removeBy("c");
        expect(group.getCount()).toEqual(3);
        expect(group.getAt(0)).toEqual(itemB);
        expect(group.getAt(1)).toEqual(itemB);
        expect(group.getAt(2)).toEqual(itemB);
    });

    it("removes an item at given index", ()=> {
        group.addMany(
            { item: itemB, name: "a" },
            { item: itemA, name: "b" },
            { item: itemB, name: "c" },
            { item: itemB, name: "d" }
        );

        group.removeAt(1);
        expect(group.getCount()).toEqual(3);
        expect(group.getAt(0)).toEqual(itemB);
        expect(group.getAt(1)).toEqual(itemB);
        expect(group.getAt(2)).toEqual(itemB);
    });

    it("removes all items", ()=> {
        group.addMany(
            { item: itemB, name: "a" },
            { item: itemA, name: "b" },
            { item: itemB, name: "c" },
            { item: itemB, name: "d" }
        );

        expect(group.getCount()).toEqual(4);

        group.removeAll();
        expect(group.getCount()).toEqual(0);
    });
});
