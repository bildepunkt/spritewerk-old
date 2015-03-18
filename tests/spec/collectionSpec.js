describe('SW.Collection', function() {
    var collection;

    beforeEach(function() {
        collection = new SW.Collection();
        collection.addItem('foo', 123).addItem('bar', 456).addItem('baz', {seven: 7});
    });

    it ('can be added to via #addItem', function() {
        collection.addItem('new', 101112);

        expect(collection.getItemCount()).toEqual(4);
    });

    it ('can alter its items via #setItem', function() {
        collection.setItem('foo', 321);

        expect(collection.getItem('foo')).toEqual(321);
    });

    it('can get items by name via #getItem', function() {
        expect(collection.getItem('foo')).toEqual(123);
    });

    it('can give item length via #getItemCount', function() {
        expect(collection.getItemCount()).toEqual(3);
    });

    it('can iterate sorted items via #each, and return the @item, @index, and @name', function() {
        var correctParamsCount = 0;

        collection.each(function(item, index, name) {
            if (item !== undefined && typeof index === 'number' && typeof name === 'string') {
                correctParamsCount++;
            }
        });

        expect(correctParamsCount).toEqual(3);
    });

    it('can set scope for each calls', function() {
        var match;
        var foo = {
            match: 9,
            items: new SW.Collection(),
            checkMatches: function() {
                var match;
                this.items.each(function(item) {
                    if (item === this.match) {
                        match = item;
                        return false;
                    }
                }, this);

                return match;
            }
        };

        foo.items.addItem('bar', 8);
        foo.items.addItem('baz', 9);
        match = foo.checkMatches();

        expect(match).toEqual(9);
    });

    it('can get an item\'s index via #getItemIndex', function() {
        expect(collection.getItemIndex('baz')).toEqual(2);
    });

    it('can change an item\'s index via #setItemIndex', function() {
        collection.setItemIndex('baz', 1);
        expect(collection.getItemCount()).toEqual(3);
        expect(collection.getItemIndex('baz')).toEqual(1);
    });

    it('can remove items by name', function() {
        collection.removeItem('foo');

        expect(collection.getItemCount()).toEqual(2);
        expect(collection.getItem('foo')).toBeUndefined();
    });
});