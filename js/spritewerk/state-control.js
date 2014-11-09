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
         * @member {object} StateControl._state - instance of current state
         * @private
         */
        _state: null,

        /**
         * @member {constructor} StateControl._State - current state constructor
         * @private
         */
        _State: null,

        /**
         * @member {boolean} StateControl._loadingState - true when loading a state
         * @private
         */
        _loadingState: false,

        init: function() {
            radio.tuneIn('newframe', this.update, this);
        },

        /**
         * if not currently loading, call state's update function
         *
         * @method StateControl.update
         */
        update: function() {
            if (! this._loadingState) {
                this._state.update();
            }
        },

        /**
         * executes after assets are preloaded
         *
         * @method StateControl._onAssetsLoaded
         * @private
         */
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
         * @method StateControl.setState
         * @param {constructor} State
         * @param {object} data
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

        /**
         * @method StateControl.getState
         */
        getState: function() {
            this._state;
        }
    };
});