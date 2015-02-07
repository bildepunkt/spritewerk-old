define([
    '../lib/protos'
], function(Protos) {

    /**
     * Pool
     */
    return Protos.extend({
        protosName: 'pool',

        sortedEntities: [],

        entities: {},

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
            var EntityType = data.type;
            var entityName = data.name;
            var entity;

            // so we don't pollute instance members
            delete data.type;
            delete data.name;

            entity = new EntityType(data);

            if (!entityName) {
                entityName = entity.displayType + entity._uid;
            }

            this.entities[entityName] = entity;
            this.sortedEntities.push(entity);
        },

        remove: function(name) {
            var entity;

            if (!this.entities[name]) {
                return false;
            }

            entity = this.entities[name];

            for(var i = 0, len = this.sortedEntities.length; i < len; i += 1) {
                if (entity._uid === this.sortedEntities[i]._uid) {
                    this.sortedEntities[i] = null;
                    this.sortedEntities.splice(i, 1);
                    break;
                }
            }

            this.entities[name] = null;
            delete this.entities[name];

            return true;
        },

        sortedEach: function(fn) {
            for(var i = 0, len = this.sortedEntities.length; i < len; i += 1) {
                fn(this.sortedEntities[i], i);
            }
        }
    });
});