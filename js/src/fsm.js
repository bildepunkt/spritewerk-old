SW.FSM = SW.Collection.extend({
    beingLoaded: {
        name: null,
        data: null
    },

    init: function() {
        this.add('loading', SW.Loading);

        radio.tuneIn('preloadcomplete', this._onPreloadComplete, this);
    },

    add: function(name, State) {
        if (this.get('loading')) {
            this.setActive('loading');
        }

        this.beingLoaded.name = name;
        this.beingLoaded.state = new State();

        if (this.beingLoaded.state.data.assets) {
            new SW.Preloader({
                assets: this.beingLoaded.state.data.assets
            });
        } else {
            this._onPreloadComplete();
        }
    },

    remove: function(name) {
        var state = this.get(name);

        radio.tuneOut('inputreceived', state._onInputReceived);
        state.destroy();
        SW.Collection.prototype.remove.call(this, name);
    },

    /**
     * @method FSM.prototype._onPreloadComplete
     * @private
     */
    _onPreloadComplete: function() {
        var state = this.beingLoaded.state;
        var data = state.data;
        var group;
        var entity;
        var entityData;
        var entityName;

        state.config = data.config;

        for(var g = 0, gLen = data.groups.length; g < gLen; g += 1) {
            group = data.groups[g];
            state.add(group.name, new SW.Collection());

            for(var e = 0, eLen = group.entities.length; e < eLen; e += 1) {
                entityData = group.entities[e];

                if (entityData.config.imageName) {
                    entityData.config.img = SW.MediaManager.images[entityData.config.imageName];
                }

                entity = new entityData.type(entityData.config);
                entityName = entityData.name ? entityData.name : entity.displayType + entity._uid;

                state.get(group.name).add(entityName, entity);
            }
        }

        state.data = null;
        delete state.data;

        state.setup();

        SW.Collection.prototype.add.call(this, this.beingLoaded.name, state);

        this.setActive(this.beingLoaded.name);
    },

    getActive: function() {
        return this.sortedItems[this.getCount() - 1];
    },

    setActive: function(name) {
        var state = this.get(name);

        if (!state) {
            return false;
        }

        if (this.getCount() === 1) {
            state.active = true;
            state.visible = true;
            return false;
        }

        this.sortedEach(function(item, i, list) {
            if (state === item) {
                item.active = true;
                item.visible = true;

                if (i < list.length - 1) {
                    list.splice(i, 1);
                    list.push(item);
                }
            } else {
                item.active = false;
                item.visible = false;
            }
        });
    }
});