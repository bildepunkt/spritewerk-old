SW.Collection = (function() {
    'use strict';

    /**
     * provides management of, and an interface for, a list of items
     *
     * @class SW.Collection
     * @extends SW.Unique
     * @belongsto SW
     */
    var Collection = function() {
        SW.Unique.call(this);

        /**
         * @member {Array} SW.Collection.prototype._items - the sorted list
         * @private
         */
        this._items = [];
    };

    Collection.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * adds an object to the collection's items
     *
     * @method SW.Collection.prototype.addItem
     * @param {String} name
     * @param {Object} value
     * @chainable
     */
    Collection.prototype.addItem = function(name, value) {
        this._items.push({
            name: name,
            value: value
        });

        return this;
    };

    /**
     * adds an object to the collection's items at a specific index
     *
     * @method SW.Collection.prototype.addItemAt
     * @param {String} name
     * @param {any} value
     * @param {Integer} index
     * @chainable
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this._items.splice(index, 0, {
            name: name,
            value: value
        });

        return this;
    };

    /**
     * removes -by name- an object from the collection's items
     *
     * @method SW.Collection.prototype.removeItem
     * @param {String} name
     */
    Collection.prototype.removeItem = function(name) {
        this._rawEach(function(iterItem, i, iterName, items) {
            if (name === iterName) {
                iterItem = null;
                items.splice(i, 1);

                // break out of loop
                return false;
            }
        });
    };

    /**
     * removes all items from collection
     *
     * @method SW.Collection.prototype.removeAllItems
     * @return {SW.Collection}
     * @chainable
     */
    Collection.prototype.removeAllItems = function() {
        this._items = [];

        return this;
    };

    /**
     * iterates the collection's sortedItems. The item, index, and name are supplied to the provided function
     *
     * @method SW.Collection.prototype.each
     * @param {Function} fn
     * @param {Object} scope
     */
    Collection.prototype.each = function(fn, scope) {
        var item;

        fn = scope ? fn.bind(scope) : fn;

        for(var i = 0, len = this._items.length; i < len; i += 1) {
            item = this._items[i];
            if (fn(item.value, i, item.name) === false) {
                break;
            }
        }
    };

    /**
     * iterates the collection's sortedItems. The raw item, index, name, and the list being iterated are supplied to the provided function
     *
     * @method SW.Collection.prototype._rawEach
     * @param {function} fn
     * @private
     */
    Collection.prototype._rawEach = function(fn) {
        for(var i = 0, len = this._items.length; i < len; i += 1) {
            if (fn(this._items[i], i, this._items[i].name, this._items) === false) {
                break;
            }
        }
    };

    /**
     * iterates items and return the ones that meet criteria
     *
     * @method SW.Collection.prototype.filter
     * @param {function} fn
     * @return {Array} filteredItems
     */
    Collection.prototype.filter = function(fn, scope) {
        var filteredItems = [];
        var filteredItem;

        this.each(function(item, i, name) {
            filteredItem = fn(item, i, name);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        }, scope);

        return filteredItems;
    };

    /**
     * gets the count of items in collection
     *
     * @method SW.Collection.prototype.getItemCount
     * @return {Integer}
     */
    Collection.prototype.getItemCount = function() {
        return this._items.length;
    };

    /**
     * alters an existing item
     *
     * @method SW.Collection.prototype.setItem
     * @param {String} name
     * @param {any} value
     * @chainable
     */
    Collection.prototype.setItem = function(name, value) {
        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                iterItem.value = value;

                return false;
            }
        });

        return this;
    };

    /**
     * gets an existing item by name
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        var item;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * gets an existing item by name index
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItemAt = function(index) {
        return this._items[index].value;
    };

    /**
     * gets a raw item by name
     *
     * @method SW.Collection.prototype._getRawItem
     * @return {any}
     * @private
     */
    Collection.prototype._getRawItem = function(name) {
        var item;

        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * moves item to new index
     * 
     * @method SW.Collection.prototype.setItemIndex
     * @param {String} name
     * @param {Integer} index
     */
    Collection.prototype.setItemIndex = function(name, index) {
        var item;
        var currentIndex = this.getItemIndex(name);

        if (index === currentIndex) {
            return;
        }

        item = this._getRawItem(name);
        this.removeItem(name);
        this._items.splice(index, 0, item);
    };

    /**
     * gets an item's current index
     *
     * @method SW.Collection.prototype.getItemIndex
     * @param {String} name
     * @return {Integer}
     */
    Collection.prototype.getItemIndex = function(name) {
        var index;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                index = i;

                return false;
            }
        });

        return index;
    };

    return Collection;
}());