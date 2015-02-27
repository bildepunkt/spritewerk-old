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
     * @param {any} value
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

    /**
     * moves item to new index
     * 
     * @method SW.Collection.prototype.setIndex
     * @param {string} name
     * @param {int|string} newDepth - int use: 0 for back, -1 for front, or anything inbetween. string use: '++' or '--' for forward or back respectively
     */
    /*Collection.prototype.setIndex = function(name, newDepth) {
        var entitiesLen = this.entities.length;
        var entityObject;
        var depth;
        var i;

        for (i = 0; i < entitiesLen; i += 1) {
            if (this.entities[i]._uid === entity._uid) {
                entityObject = this.entities[i];
                depth = i;
                break;
            }
        }

        if (newDepth === -1 && depth === this.entities.length -1) {
            return;
        }

        if (newDepth === 0  && depth === 0) {
            return;
        }

        this.entities.splice(depth, 1);

        switch(typeof newDepth) {
            case 'number':
                if (newDepth === -1 || newDepth >= this.entities.length) {
                    this.entities.push(entityObject);
                } else {
                    this.entities.splice(newDepth, 0, entityObject);
                }
            break;
            case 'string':
                if (newDepth === '++') {
                    this.entities.splice(depth + 1, 0, entityObject);
                } else if (newDepth === '--') {
                    this.entities.splice(depth - 1, 0, entityObject);
                }
            break;
        }
    };*/

    /**
     * @method SW.Collection.prototype.getItemIndex
     * @param {string} name
     * @return {integer}
     */
    /*getItemIndex = function(entity) {
        var entitiesLen = this.entities.length;
        var i;

        for (i = 0; i < entitiesLen; i += 1) {
            if (this.entities[i]._uid === entity._uid) {
                return i;
            }
        }
    };*/

    return Collection;
}());