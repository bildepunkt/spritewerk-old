/**
 * Finite State Manager - Responsible for handling adding, removing, and swapping game states
 *
 * @class SW.FSM
 * @extends SW.Collection
 * @belongsto SW
 */
SW.FSM = SW.Collection.extend({
    _beingLoaded: {
        name: null,
        data: null
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

        // create dummy BB
        state.boundingBox = {
            width: 0,
            height: 0
        };

        for(var g = 0, gLen = data.groups.length; g < gLen; g += 1) {
            group = data.groups[g];

            state.add(group.name, new SW.Collection());

            state.get(group.name).scrollDepth = group.scrollDepth || 1;

            for(var e = 0, eLen = group.entities.length; e < eLen; e += 1) {
                entityData = group.entities[e];

                if (entityData.config.imageName) {
                    entityData.config.img = SW.MediaManager.images[entityData.config.imageName];
                }

                entity = new entityData.type(entityData.config);
                entityName = entityData.name ? entityData.name : entity.displayType + entity._uid;

                if (entity.width > state.boundingBox.width || entity.height > state.boundingBox.height) {
                    state.boundingBox = entity;
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
        var spliceIndex;

        if (!state) {
            return false;
        }

        if (this.getCount() === 1) {
            state.setActive(true);
            state.setVisible(true);
            return false;
        }

        this.sortedEach(function(item, i, list) {
            if (state === item) {
                item.setActive(true);
                item.setVisible(true);

                if (i < list.length - 1) {
                    spliceIndex = i;
                }
            } else {
                item.setActive(false);
                item.setVisible(false);
            }
        });

        if (typeof spliceIndex === 'number') {
            this.sortedItems.splice(spliceIndex, 1);
            this.sortedItems.push(state);
        }
    }
});