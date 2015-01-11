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
            var walls = this._data.walls ? this.parseMap(this._data.walls) : undefined;

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
                backgroundColor: this._data.backgroundColor,
                camera: new Camera(),
                walls: walls
            });

            this._loadingState = false;
        },

        parseMap: function(map) {
            var parsed = [];
            var item;

            for (var y = 0, ylen = map.grid.length; y < ylen; y += 1) {
                for (var x = 0, xlen = map.grid.length; x < xlen; x += 1) {
                    item = map.grid[y][x];

                    parsed.push(
                        new Shade({
                            x: x * item.width,
                            y: y * item.height,
                            width: item.width,
                            height: item.height
                        })
                    );
                }
            }

            return map;
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