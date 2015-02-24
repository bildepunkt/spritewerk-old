/**
 * for the holding and sorting of objects in an array (sorted) with a named reference in a literal object/dictionary
 *
 * @class SW.Collection
 * @memberof SW
 */
SW.Collection = SW.Protos.extend({
    /**
     * @prop {array} SW.Collection.prototype.items - the literal object/dictionary
     */
    items: {},
    
    /**
     * @prop {object} SW.Collection.prototype.sortedItems - the sorted list
     */
    sortedItems: [],

    /**
     * add an object to both this.items/this.sortedItems
     *
     * @method SW.Collection.prototype.add
     * @param {string} name
     * @param {object} value
     */
    add: function(name, value) {
        this.items[name] = value;
        this.sortedItems.push(value);
    },

    addAt: function(name, value, index) {
        this.items[name] = value;
        this.sortedItems.splice(index, 0, value);
    },

    /**
     * remove -by name- an object from both this.items/this.sortedItems
     *
     * @method SW.Collection.prototype.remove
     * @param {string} name
     */
    remove: function(name) {
        var item = this.items[name];

        this.sortedEach(function(iterItem, i, items) {
            if (item === iterItem) {
                iterItem = null;
                items.splice(i, 1);

                return true;
            }
        });

        this.items[name] = null;
        delete this.items[name];
    },

    /**
     * iterate this.sortedItems. provides the item, index, and the list being iterated to the provided function
     *
     * @method SW.Collection.prototype.sortedEach
     * @param {function} fn
     */
    sortedEach: function(fn) {
        for(var i = 0, len = this.sortedItems.length; i < len; i += 1) {
            fn(this.sortedItems[i], i, this.sortedItems);
        }
    },

    /**
     * iterate this.items. provides the item, propery, and the list being iterated to the provided function
     *
     * @method SW.Collection.prototype.each
     * @param {function} fn
     */
    each: function(fn) {
        for(var prop in this.items) {
            fn(this.items[prop], prop, this.items);
        }
    },

    /**
     * iterate items and return the ones that meet criteria
     *
     * @method SW.Collection.prototype.filter
     * @param {function} fn
     * @return {array} filteredItems
     */
    filter: function(fn) {
        var filteredItems = [];
        var filteredItem;

        this.sortedEach(function(item, i, items) {
            filteredItem = fn(item, i, items);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        });

        return filteredItems;
    },

    /**
     * get the count of items in collection
     *
     * @method SW.Collection.prototype.getCount
     * @return {integer}
     */
    getCount: function() {
        return this.sortedItems.length;
    },

    /**
     * alter an existing item
     *
     * @method SW.Collection.prototype.set
     * @param {string} name
     * @param {object} value
     */
    set: function(name, value) {
        this.items[name] = value;
    },

    /**
     * get an existing item by name
     *
     * @method SW.Collection.prototype.get
     * @return {object}
     */
    get: function(name) {
        return this.items[name];
    }
});