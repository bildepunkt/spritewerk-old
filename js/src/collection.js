SW.Collection = (function() {
    /**
     * @class SW.Collection
     * @extends SW.Unique
     * @belongsto SW
     */
    var Collection = function() {
        /**
         * @member {array} SW.Collection.prototype.sortedItems - the sorted list
         * @private
         */
        this.sortedItems = [];
        /**
         * @member {object} SW.Collection.prototype.items - the object literal list
         * @private
         */
        this.items = {};
    };

    Collection.prototype = new SW.Unique();

    /**
     * add an object to both this.items/this.sortedItems
     *
     * @method Collection.prototype.addItem
     * @param {string} name
     * @param {object} value
     */
    Collection.prototype.addItem = function(name, value) {
        this.items[name] = value;
        this.sortedItems.push(value);
    };

    /**
     * add an object to both this.items/this.sortedItems at a specific index
     *
     * @method Collection.prototype.addItemAt
     * @param {string} name
     * @param {any} value,
     * @param {integer} index
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this.items[name] = value;
        this.sortedItems.splice(index, 0, value);
    };

    /**
     * remove -by name- an object from both this.items/this.sortedItems
     *
     * @method Collection.prototype.removeItem
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
     * iterate the collection's sortedItems. The item, index, and the list being iterated are supplied to the provided function
     *
     * @method Collection.prototype.sortedEach
     * @param {function} fn
     */
    Collection.prototype.sortedEach = function(fn) {
        for(var i = 0, len = this.sortedItems.length; i < len; i += 1) {
            fn(this.sortedItems[i], i, this.sortedItems);
        }
    };

    /**
     * iterate the collection's items. The item, property, and the list being iterated are supplied to the provided function
     *
     * @method Collection.prototype.each
     * @param {function} fn
     */
    Collection.prototype.each = function(fn) {
        for(var prop in this.items) {
            fn(this.items[prop], prop, this.items);
        }
    };

    /**
     * iterate items and return the ones that meet criteria
     *
     * @method Collection.prototype.filter
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
     * get the count of items in collection
     *
     * @method Collection.prototype.getItemCount
     * @return {integer}
     */
    Collection.prototype.getItemCount = function() {
        return this.sortedItems.length;
    };

    /**
     * alter an existing item
     *
     * @method Collection.prototype.setItem
     * @param {string} name
     * @param {any} value
     */
    Collection.prototype.setItem = function(name, value) {
        this.items[name] = value;
    };

    /**
     * get an existing item by name
     *
     * @method Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        return this.items[name];
    };

    return Collection;
}());