SW.Collection = (function() {
    'use strict';

    /**
     * provides management of, and an interface for, a list of entities
     *
     * @class SW.Collection
     * @extends SW.Unique
     * @param {object} [items] - a hash of items to add to the new collection
     * @belongsto SW
     */
    var Collection = function(items) {
        /**
         * @member {array} SW.Collection.prototype.sortedItems - the sorted list
         * @private
         */
        this.sortedItems = [];
        /**
         * @member {object} SW.Collection.prototype.items - the hash list
         * @private
         */
        this.items = {};

        if (typeof items === 'object') {
            for (var key in items) {
                this.addItem(key, items[key]);
            }
        }
    };

    // inherit unique
    Collection.prototype = new SW.Unique();

    /**
     * adds an object to both this.items/this.sortedItems
     *
     * @method SW.Collection.prototype.addItem
     * @param {string} name
     * @param {object} value
     */
    Collection.prototype.addItem = function(name, value) {
        this.items[name] = value;
        this.sortedItems.push(value);
    };

    /**
     * adds an object to both this.items/this.sortedItems at a specific index
     *
     * @method SW.Collection.prototype.addItemAt
     * @param {string} name
     * @param {any} value
     * @param {integer} index
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this.items[name] = value;
        this.sortedItems.splice(index, 0, value);
    };

    /**
     * removes -by name- an object from both this.items/this.sortedItems
     *
     * @method SW.Collection.prototype.removeItem
     * @param {string} name
     */
    Collection.prototype.removeItem = function(name) {
        var item = this.items[name];

        this.sortedEach(function(iterItem, i, items) {
            if (item._uid === iterItem._uid) {
                iterItem = null;
                items.splice(i, 1);

                return true;
            }
        });

        this.items[name] = null;
        delete this.items[name];
    };

    /**
     * iterates the collection's sortedItems. The item, index, and the list being iterated are supplied to the provided function
     *
     * @method SW.Collection.prototype.sortedEach
     * @param {function} fn
     */
    Collection.prototype.sortedEach = function(fn) {
        for(var i = 0, len = this.sortedItems.length; i < len; i += 1) {
            fn(this.sortedItems[i], i, this.sortedItems);
        }
    };

    /**
     * iterates the collection's items. The item, property, and the list being iterated are supplied to the provided function
     *
     * @method SW.Collection.prototype.each
     * @param {function} fn
     */
    Collection.prototype.each = function(fn) {
        for(var prop in this.items) {
            fn(this.items[prop], prop, this.items);
        }
    };

    /**
     * iterates items and return the ones that meet criteria
     *
     * @method SW.Collection.prototype.filter
     * @param {function} fn
     * @return {array} filteredItems
     */
    Collection.prototype.filter = function(fn) {
        var filteredItems = [];
        var filteredItem;

        this.sortedEach(function(item, i, items) {
            filteredItem = fn(item, i, items);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        });

        return filteredItems;
    };

    /**
     * gets the count of items in collection
     *
     * @method SW.Collection.prototype.getItemCount
     * @return {integer}
     */
    Collection.prototype.getItemCount = function() {
        return this.sortedItems.length;
    };

    /**
     * alters an existing item
     *
     * @method SW.Collection.prototype.setItem
     * @param {string} name
     * @param {any} value
     */
    Collection.prototype.setItem = function(name, value) {
        this.items[name] = value;
    };

    /**
     * gets an existing item by name
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        return this.items[name];
    };

    /**
     * moves item to new index
     * 
     * @method SW.Collection.prototype.setItemIndex
     * @param {string} name
     * @param {integer} index
     */
    Collection.prototype.setItemIndex = function(name, index) {
        var item = this.getItem(name);
        var currentIndex = this.getItemIndex(name);

        if (index === currentIndex) {
            return;
        }

        this.removeItem(name);
        this.addItemAt(name, item, index);
    };

    /**
     * gets an items current index
     *
     * @method SW.Collection.prototype.getItemIndex
     * @param {string} name
     * @return {integer}
     */
    Collection.prototype.getItemIndex = function(name) {
        var theItem = this.getItem(name);
        var index;

        this.sortedEach(function(item, i) {
            if (theItem._uid === item._uid) {
                index = i;
                return;
            }
        });

        return index;
    };

    return Collection;
}());