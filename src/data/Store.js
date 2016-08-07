/**
 * @class Store
 * @memberOf data
 */
class Store {
    constructor () {
        this._items = {};
    }

    fetch (key) {
        return this._items[key];
    }

    add (key, val) {
        this._items[key] = val;
    }

    addMany (obj) {
        for (let key in obj) {
            this._items[keys] = obj[keys];
        }
    }

    clear (key) {
        if (typeof key === "string") {
            let item = this._items[key];
            this._items[key] = Array.isArray(item) ? [] : {};
        } else {
            this._items = {};
        }
    }

    serialize (key) {
        if (typeof key === "string") {
            return JSON.stringify(this._items[key]);
        } else {
            return JSON.stringify(this._items);
        }
    }

    deserialize (data) {
        return JSON.parse(data);
    }
}
