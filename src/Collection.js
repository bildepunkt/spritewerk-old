/**
 * @class Collection
 */
export default class Collection {
    constructor () {
        this.items = [];
    }

    /**
     * Add an item with optional name
     * @method Collection#add
     * @param  {Any}    item The item to add
     * @param  {String} [name=""] The optional name of the item
     */
    add (item, name="") {
        this.items.push({
            item, name
        });
    }

    /**
     * Add an item at a given index
     * @method Collection#addAt
     * @param  {Integer} index The index to add the item
     * @param  {Any}     item The item to add
     * @param  {String}  [name=""] The optional name of the item
     */
    addAt (index, item, name="") {
        if (index > this.getCount()) {
            this.add(item, name);
        } else {
            this.items.splice(index, 0, {
                item, name
            });
        }
    }

    /**
     * Add multiple items
     * @method Collection#addMany
     * @param  {...Object} items An object containing item and optional name. eg: <code>{item: someItem, name: "someName"}</code>
     */
    addMany (...items) {
        for (let item of items) {
            this.add(item.item, item.name);
        }
    }

    /**
     * Iterates the collection's sorted items. The item, index, and name are supplied
     * to the provided function
     * @method Collection#each
     * @param {Function} fn      The function to execute on the iterable
     * @param {Object}   [scope] The scope with which to execute the function
     */
    each (fn, scope) {
        fn = scope ? fn.bind(scope) : fn;

        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            let doContinue;

            // if item on last item and an item is removed
            if (!item) {
                break;
            }

            doContinue = fn(item.item, item.name, i);

            if (doContinue === false) {
                break;
            }
        }
    }

    /**
     * Returns an object by name
     * @method Collection#fetch
     * @param  {String} name The name
     * @return {Any}
     */
    fetch (name) {
        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (item.name === name) {
                return item.item;
            }
        }
    }

    /**
     * Returns an object at a given index
     * @method Collection#fetchAt
     * @param  {Integer} index The index
     * @return {Any}
     */
    fetchAt (index) {
        return this.items[index].item;
    }

    /**
     * Returns the count of items in group
     * @method Collection#getCount
     * @return {Integer}
     */
    getCount () {
        return this.items.length;
    }

    /**
     * Remove item by name
     * @method Collection#removeBy
     * @param {String} name
     */
    remove (name) {
        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (item.name === name) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Removes all items
     * @method Collection#removeAll
     */
    removeAll () {
        this.items = [];
    }

    /**
     * Remove item at given index
     * @method Collection#removeAt
     * @param {Integer} index
     */
    removeAt (index) {
        this.items.splice(index, 1);
    }

    /**
     * iterates items and return the ones that meet criteria
     * @method Collection#filter
     * @param  {Function} fn      Truth predicate
     * @param  {Object}   [scope] The scope in which to execute the function
     * @return {Array}
     */
    filter(fn, scope) {
        let filteredItems = [];

        this.each((item, i, name)=> {
            let predicate = fn(item, i, name);

            if (predicate) {
                filteredItems.push(item);
            }
        }, scope);

        return filteredItems;
    }

    /**
     * Assigns a new value to an existing item
     * @method Collection#update
     * @param {String} name  The name of the object to modify
     * @param {Any}    value The new value
     */
    update (name, value) {
        for (let item of this.items) {
            if (name === item.name) {
                item = value;
                break;
            }
        }
    }

    /**
     * Moves item to new index
     * @method Collection#updateIndex
     * @param {String}  name  The name of the object being moved
     * @param {Integer} index The item's new index
     */
    /*moveTo (name, index) {
        let item;
        let currentIndex = this.getIndexBy(name);

        if (index === currentIndex) {
            return;
        }

        item = this._getRawItem(name);
        this.removeWithName(name);
        this._items.splice(index, 0, item);
    }

    moveToTop (name) {
        // ...
    }

    moveToBottom (name) {
        // ...
    }*/
}
