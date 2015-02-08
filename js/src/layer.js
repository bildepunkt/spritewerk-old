define([
    '../lib/protos'
], function(Protos) {

    /**
     * Pool
     */
    return Protos.extend({
        protosName: 'pool',

        sortedPool: [],

        pool: {},

        /**
         * @param {array} arguments - array of entity configs
         */
        add: function() {
            var data = arguments;

            for(var i = 0, len = data.length; i < len; i += 1) {
                this.setupEntity(data[i]);
            }
        },

        setupEntity: function(data) {
            var entity = new data.type(data.config);
            var entityName = data.name ? data.name : entity.displayType + entity._uid;

            this.pool[entityName] = entity;
            this.sortedPool.push(entity);
        },

        remove: function(name) {
            var entity;

            if (!this.pool[name]) {
                return false;
            }

            entity = this.pool[name];

            for(var i = 0, len = this.sortedPool.length; i < len; i += 1) {
                if (entity._uid === this.sortedPool[i]._uid) {
                    this.sortedPool[i] = null;
                    this.sortedPool.splice(i, 1);
                    break;
                }
            }

            this.pool[name] = null;
            delete this.pool[name];

            return true;
        },

        sortedEach: function(fn) {
            for(var i = 0, len = this.sortedPool.length; i < len; i += 1) {
                fn(this.sortedPool[i], i);
            }
        }
    });
});