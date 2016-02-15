'use strict';

var Collection = require('../build/Collection').default;

describe('Collection', function () {
    var itemA = {
        x: 32,
        y: 32,
        id: 'foobar'
    };
    var itemB = {
        x: 64,
        y: 64,
        id: 'derpskerp'
    }
    var col;

    beforeEach(function () {
        col = new Collection();
        itemA = {
            x: 32,
            y: 32,
            id: 'amaranth'
        };
        itemB = {
            x: 64,
            y: 64,
            id: 'beetlejuice'
        }
    });

    it('adds one item with name', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItem(itemA, 'itemA');
        expect(col.getItem('itemA')).toEqual(itemA);
    });

    it('adds items with names', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        expect(col.getItemCount()).toEqual(2);
        expect(col.getItem('itemA')).toEqual(itemA);
        expect(col.getItem('itemB')).toEqual(itemB);
    });

    it('adds items without names', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems(itemA, itemB);

        expect(col.getItemCount()).toEqual(2);
        expect(col.getItem('itemA')).toEqual(undefined);
    });

    it('adds items without names', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems(itemA, itemB);

        expect(col.getItemCount()).toEqual(2);
        expect(col.getItem('itemA')).toEqual(undefined);
    });

    it('iterates items', function () {
        expect(col.getItemCount()).toEqual(0);
        var items = [];

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        col.each(function (item, index, name) {
            items.push({
                item: item,
                index: index,
                name: name
            });
        });

        expect(items[0].item).toEqual(itemA);
        expect(items[0].index).toEqual(0);
        expect(items[0].name).toEqual('itemA');

        expect(items[1].item).toEqual(itemB);
        expect(items[1].index).toEqual(1);
        expect(items[1].name).toEqual('itemB');
    });

    it('iterates raw item value/name', function () {
        expect(col.getItemCount()).toEqual(0);
        var items = [];

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        col._rawEach(function (item, index, name) {
            items.push(item);
        });

        expect(items[0].item).toEqual(itemA);
        expect(items[0].name).toEqual('itemA');

        expect(items[1].item).toEqual(itemB);
        expect(items[1].name).toEqual('itemB');
    });

    it('filters items', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        var derpy = col.filter(function (item, index, name) {
            return item.id === 'beetlejuice';
        });

        expect(derpy.length).toEqual(1);
        expect(derpy[0].id).toEqual('beetlejuice');
    });

    it('gets item data', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItem(itemA, 'item');

        expect(col.getItem('item').id).toEqual('amaranth');
    });

    it('gets item\'s raw item/name data', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItem(itemA, 'item');

        expect(col._getRawItem('item').item).toEqual(itemA);
    });

    it('sets item data', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItem(itemB, 'item');
        col.setItem('item', itemA);

        expect(col.getItem('item').id).toEqual('amaranth');
    });

    it('gets an item\'s index', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        expect(col.getItemIndex('itemA')).toEqual(0);
        expect(col.getItemIndex('itemB')).toEqual(1);
    });

    it('sets an item\'s index', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        col.setItemIndex('itemB', 0);

        expect(col.getItemIndex('itemA')).toEqual(1);
        expect(col.getItemIndex('itemB')).toEqual(0);
    });

    it('gets an item at a specified index', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        expect(col.getItemAt(0).id).toEqual('amaranth');
        expect(col.getItemAt(1).id).toEqual('beetlejuice');
    });

    it('removes an item', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        expect(col.getItemCount()).toEqual(2);

        let removed = col.removeItem('itemA');
        expect(removed).toBe(true);
        expect(col.getItemCount()).toEqual(1);
        expect(col.getItem('itemB').id).toEqual('beetlejuice');
    });

    it('removes all items', function () {
        expect(col.getItemCount()).toEqual(0);

        col.addItems({
            item: itemA,
            name: 'itemA',
        }, {
            item: itemB,
            name: 'itemB',
        });

        expect(col.getItemCount()).toEqual(2);
        col.removeAllItems();
        expect(col.getItemCount()).toEqual(0);
    });
});
