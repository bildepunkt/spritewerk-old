var Pool = Protos.extend({
    protosName: 'pool',

    entities: [],

    entitiesToAdd: null,

    entitiesAdded: null,

    entityBeingLoaded: null,

    /**
     * @param {array} arguments - array of Sprite configs
     */
    add: function() {
        var data = arguments;

        this.entitiesToAdd = data.length;
        this.entitiesAdded = 0;

        for(var i = 0, len = data.length; i < len; i += 1) {
            this.setupEntity(data[i]);
        }
    },

    setupEntity: function(data) {
        var EntityType = data.type;
        var entity;

        // so we don't pollute members
        delete data.type;

        entity = new EntityType(data);

        this.entities.push(entity);

        this.entitiesAdded += 1;

        if (this.entitiesAdded === this.entitiesToAdd) {
            radio.broadcast('entitiesready', {
                data: this.entities
            });
        }
    },

    remove: function(entity) {
        for(var i = 0, len = this.entities.length; i < len; i += 1) {
            if (entity === this.entities[i]) {
                this.entities.splice(i, 1);
                break;
            }
        }
    },

    each: function(fn) {
        for(var i = 0, len = this.entities.length; i < len; i += 1) {
            fn(this.entities[i], i);
        }
    }
});