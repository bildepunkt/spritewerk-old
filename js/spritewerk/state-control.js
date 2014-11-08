/**
 * sets up state objects
 *
 * @class StateControl
 * @static
 */
define([
    '../lib/preloader',
    '../lib/radio',
    './layer'
], function(preloader, radio, Layer) {
    return {
        /**
         * state instance
         */
        _state: null,

        /**
         * state constructor
         */
        _State: null,

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
            var stateLayers = [];
            var layer;
            var entity;
            var parsedEntity;

            radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

            for (var layerInd = 0; layerInd < this._data.layers.length; layerInd += 1) {
                stateLayers[layerInd] = new Layer();
                layer = this._data.layers[layerInd];

                for (var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    parsedEntity = new entity.type(entity.config);
                    parsedEntity.name = entity.name;

                    if (parsedEntity.src) {
                        parsedEntity.attachImage();
                    }

                    stateLayers[layerInd].entities[entityInd] = parsedEntity;
                }
            }

            // initialize state
            this._state = new this._State({
                layers: stateLayers,
                backgroundColor: this._data.backgroundColor
            });

            this._loadingState = false;
        },

        /**
         * @param {object} state
         */
        setState: function(State, data) {
            this._State = State;
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