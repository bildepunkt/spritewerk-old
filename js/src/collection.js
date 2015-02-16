SW.Collection = Protos.extend({
    items: {},
    sortedItems: [],

    add: function(name, data) {
        this.items[name] = data;
        this.sortedItems.push(data);
    },

    remove: function(name) {
        var item = this.items[name];

        this.sortedEach(function(iterItem, i) {
            if (item === iterItem) {
                iterItem = null;
                this.sortedItems.splice(i, 1);

                this.items[name] = null;
                delete this.items[name];

                return true;
            }
        });
    },

    sortedEach: function(fn) {
        for(var i = 0, len = this.sortedItems.length; i < len; i += 1) {
            fn(this.sortedItems[i], i, this.sortedItems);
        }
    },

    get: function(name) {
        return this.items[name];
    }
});