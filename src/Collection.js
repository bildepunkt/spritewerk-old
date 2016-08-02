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
     * Returns an object at a given index
     * @method Collection#getAt
     * @param  {Integer} index The index
     * @return {Any}
     */
    getAt (index) {
        return this.items[index].item;
    }

    /**
     * Returns an object by name
     * @method Collection#getBy
     * @param  {String} name The name
     * @return {Any}
     */
    getBy (name) {
        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (item.name === name) {
                return item.item;
            }
        }
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
     * Removes an item by name
     * @method Collection#removeBy
     * @param  {String} name The item's name
     * @return {Any}
     */
    removeBy (name) {
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
     * Remove item by name
     * @method Collection#removeBy
     * @param {String} name
     */
    removeBy (name) {
        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (item.name === name) {
                this.items.splice(i, 1);
                break;
            }
        }
    }
}
