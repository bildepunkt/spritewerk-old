SW.FSM = SW.Collection.extend({
    _beingLoaded: {
        name: null,
        data: null
    },

    _boundingBox: {
        width: 0,
        height: 0
    },

    init: function() {
        this.add('loading', SW.Loading);

        SW.Radio.tuneIn('preloadcomplete', this._onPreloadComplete, this);
    },

    add: function(name, State) {
        if (this.get('loading')) {
            this.setActiveState('loading');
        }

        this._beingLoaded.name = name;
        this._beingLoaded.state = new State();

        if (this._beingLoaded.state.data.assets) {
            new SW.Preloader({
                assets: this._beingLoaded.state.data.assets
            });
        } else {
            this._onPreloadComplete();
        }
    },

    remove: function(name) {
        var state = this.get(name);

        state.destroy();
        SW.Radio.tuneOut('inputreceived', state._onInputReceived);
        SW.Collection.prototype.remove.call(this, name);
    },

    /**
     * @method FSM.prototype._onPreloadComplete
     * @private
     */
    _onPreloadComplete: function() {
        var state = this._beingLoaded.state;
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

                if (entity.width > this._boundingBox.width) {
                    state.boundingBox.width = entity.width;
                }
                if (entity.height > this._boundingBox.height) {
                    state.boundingBox.height = entity.height;
                }

                state.get(group.name).add(entityName, entity);
            }
        }

        state.data = null;
        delete state.data;

        state.camera = new SW.Camera();

        state.setup();

        SW.Collection.prototype.add.call(this, this._beingLoaded.name, state);

        this.setActiveState(this._beingLoaded.name);

        this._beingLoaded.state = null;
        this._beingLoaded.name = null;
    },

    getActiveState: function() {
        return this.sortedItems[this.getCount() - 1];
    },

    setActiveState: function(name) {
        var state = this.get(name);

        if (!state) {
            return false;
        }

        if (this.getCount() === 1) {
            state.active(true);
            state.visible(true);
            return false;
        }

        this.sortedEach(function(item, i, list) {
            if (state === item) {
                item.active(true);
                item.visible(true);

                if (i < list.length - 1) {
                    list.splice(i, 1);
                    list.push(item);
                }
            } else {
                item.active(false);
                item.visible(false);
            }
        });
    }
});