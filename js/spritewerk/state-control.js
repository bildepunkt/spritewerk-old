/**
 * sets up state objects
 *
 * @class StateControl
 * @static
 */
define([
    './camera',
    './layer',
    './shade',
    '../lib/preloader',
    '../lib/radio'
], function(Camera, Layer, Shade, preloader, radio) {
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
            var walls = this._data.walls ? this._parseMap(this._data.walls) : undefined;
            var scrollRegions;

            radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

            for (var layerInd = 0; layerInd < this._data.layers.length; layerInd += 1) {
                // TODO add friendly layer reference to state based on layer name
                stateLayers[layerInd] = new Layer();
                layer = this._data.layers[layerInd];

                for (var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    // set properties based on config object
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
                camera: new Camera(),
                walls: walls,
                backgroundColor: this._data.backgroundColor,
                scrollRegions: this._data.scrollRegions
            });

            this._loadingState = false;
        },

        _parseMap: function(map) {
            var parsed = [];
            var item;

            for (var y = 0, ylen = map.grid.length; y < ylen; y += 1) {
                for (var x = 0, xlen = map.grid[y].length; x < xlen; x += 1) {
                    item = map.grid[y][x];

                    if (item) {
                        parsed.push(
                            new Shade({
                                x: x * map.width,
                                y: y * map.height,
                                width: map.width,
                                height: map.height
                            })
                        );
                    }
                }
            }

            return parsed;
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

            if (this._state) {
                this._state.destroy();
            }

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