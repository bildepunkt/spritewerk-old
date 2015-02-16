SW.FSM = SW.Collection.extend({
    beingLoaded: {
        name: null,
        data: null
    },

    init: function(options) {
        this.add('loading', options.state);

        radio.tuneIn('preloadcomplete', this.onPreloadComplete, this);
    },

    add: function(name, State) {
        if (this.get('loading')) {
            this.setActive('loading');
        }

        this.beingLoaded.name = name;
        this.beingLoaded.state = new State();

        if (this.beingLoaded.state.assets) {
            new SW.Preloader({
                assets: this.beingLoaded.state.assets
            });
        } else {
            this.onPreloadComplete();
        }
    },

    onPreloadComplete: function() {
        var state = this.beingLoaded.state;
        var data = state.data;
        var group;
        var entity;
        var entityData;
        var entityName;

        this.sortedEach(function(item) {
            item.active = false;
            item.visible = false;
        });

        state.config = data.config;


        for(var g = 0, gLen = data.groups.length; g < gLen; g += 1) {
            group = data.groups[g];
            state.add(group.name, new Collection());

            for(var e = 0, eLen = group.entities.length; e < eLen; e += 1) {
                entityData = group.entities[e];

                if (entityData.config.imageName) {
                    entityData.config.img = MediaManager.images[entityData.config.imageName];
                }

                entity = new entityData.type(entityData.config);
                entityName = entityData.name ? entityData.name : entity.displayType + entity._uid;

                state.get(group.name).add(entityName, entity);
            }
        }

        state.data = null;
        delete state.data;

        SW.Collection.prototype.add.call(this, this.beingLoaded.name, state);
    },

    setActive: function(name) {
        var state = this.items[name];

        this.sortedEach(function(item, i) {
            if (state === item) {
                item.active = true;
                item.visible = true;
                this.sortedStates.splice(i, 1);
                this.sortedStates.push(item);
            } else {
                item.active = false;
                item.visible = false;
            }
        });
    }
});