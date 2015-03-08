SW.Common.Collection = (function() {
    'use strict';

    /**
     * provides management of, and an interface for, a (named and indexed) list of entities
     *
     * @class SW.Common.Collection
     * @belongsto SW
     */
    var Collection = function() {
        SW.Common.Util.inherit(this, SW.Common.Unique);

        /**
         * @member {Array} SW.Common.Collection.prototype._sortedItems - the sorted list
         * @private
         */
        this._sortedItems = [];
        /**
         * @member {Object} SW.Common.Collection.prototype._items - the hash list
         * @private
         */
        this._items = {};
    };

    /**
     * adds an object to both this.items/this.sortedItems
     *
     * @method SW.Common.Collection.prototype.addItem
     * @param {String} name
     * @param {Object} value
     */
    Collection.prototype.addItem = function(name, value) {
        this._items[name] = value;
        this._sortedItems.push(value);
    };

    /**
     * adds an object to both this.items/this.sortedItems at a specific index
     *
     * @method SW.Common.Collection.prototype.addItemAt
     * @param {String} name
     * @param {any} value
     * @param {Integer} index
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this._items[name] = value;
        this._sortedItems.splice(index, 0, value);
    };

    /**
     * removes -by name- an object from both this.items/this.sortedItems
     *
     * @method SW.Common.Collection.prototype.removeItem
     * @param {String} name
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

        this._items[name] = null;
        delete this._items[name];
    };

    /**
     * iterates the collection's sortedItems. The item, index, and the list being iterated are supplied to the provided function
     *
     * @method SW.Common.Collection.prototype.sortedEach
     * @param {function} fn
     */
    Collection.prototype.sortedEach = function(fn) {
        for(var i = 0, len = this._sortedItems.length; i < len; i += 1) {
            fn(this._sortedItems[i], i, this._sortedItems);
        }
    };

    /**
     * iterates the collection's items. The item, property, and the list being iterated are supplied to the provided function
     *
     * @method SW.Common.Collection.prototype.each
     * @param {function} fn
     */
    Collection.prototype.each = function(fn) {
        for(var prop in this._items) {
            fn(this._items[prop], prop, this._items);
        }
    };

    /**
     * iterates items and return the ones that meet criteria
     *
     * @method SW.Common.Collection.prototype.filter
     * @param {function} fn
     * @return {Array} filteredItems
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
     * @method SW.Common.Collection.prototype.getItemCount
     * @return {Integer}
     */
    Collection.prototype.getItemCount = function() {
        return this._sortedItems.length;
    };

    /**
     * alters an existing item
     *
     * @method SW.Common.Collection.prototype.setItem
     * @param {String} name
     * @param {any} value
     */
    Collection.prototype.setItem = function(name, value) {
        this._items[name] = value;
    };

    /**
     * gets an existing item by name
     *
     * @method SW.Common.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        return this._items[name];
    };

    /**
     * moves item to new index
     * 
     * @method SW.Common.Collection.prototype.setItemIndex
     * @param {String} name
     * @param {Integer} index
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
     * @method SW.Common.Collection.prototype.getItemIndex
     * @param {String} name
     * @return {Integer}
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