/**
 * sets up state objects
 *
 * @class StateControl
 * @static
 */
define([
    '../lib/preloader',
    '../lib/radio'
], function(preloader, radio) {
    return {
        /**
         * 
         */
        _state: null,

        /**
         *
         */
        _loadingState: false,

        init: function() {
            radio.tuneIn('newframe', this.update, this);
        },

        update: function() {
            if (! this._loadingState) {
                this._state.update();
            }
        },

        _onAssetsLoaded: function() {
            var layer;
            var entity;
            var parsedEntity;

            radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

            this._state.backgroundColor = this._data.backgroundColor;

            for (var layerInd = 0; layerInd < this._data.layers.length; layerInd += 1) {
                layer = this._data.layers[layerInd];

                this._state.layers[layerInd] = {
                    entities: []
                };

                for (var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    parsedEntity = new entity.type(entity.config);
                    parsedEntity.name = entity.name;

                    if (parsedEntity.src) {
                        parsedEntity.attachImage();
                    }

                    this._state.layers[layerInd].entities[entityInd] = parsedEntity;
                }
            }

            this._loadingState = false;
        },

        /**
         * @param {object} state
         */
        setState: function(State, data) {
            this._state = new State();
            this._data = data;
            this._loadingState = true;

            if (data.assets.length) {
                radio.tuneIn(document, 'preloader/assetsloaded', this._onAssetsLoaded, this);
                preloader.load(data.assets);
            } else {
                this._onAssetsLoaded();
            }
        },

        getState: function() {
            this._state;
        }
    };
});