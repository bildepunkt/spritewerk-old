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

        /**
         * @member {object} StateControl._stateConfig - all the parsed data that will be passed to the state constructor when all the async img loads are complete
         * @private
         */
        _stateConfig: null,

        /**
         * @member {int} StateControl._entityWithImgCount - the current amount of entities whose images have been loaded
         * @private
         */
        _entityWithImgCount: null,

        /**
         * @member {int} StateControl._entityWithImgTotal - the amount of entities that are loading images
         * @private
         */
        _entityWithImgTotal: null,

        /**
         * @member {int} StateControl._boundingBoxCandidate - 
         * @private
         */
        _boundingBoxCandidate: {
            width: 0,
            height: 0
        },

        init: function() {
            radio.tuneIn('newframe', this.update, this);

            // for increment _entityWithImgCount
            radio.tuneIn('entityready', this._onEntityImgLoaded, this);
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

        getEntityWithImgTotal: function(layers) {
            var count = 0;
            var layer;

            for (var layerInd = 0; layerInd < layers.length; layerInd += 1) {
                layer = this._data.layers[layerInd];

                for (var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    if (layer.entities[entityInd].config.src) {
                        count += 1;
                    }
                }
            }

            return count;
        },

        _onEntityImgLoaded: function(e) {
            var entity = e.detail.entity;

            this._entityWithImgCount += 1;

            if (entity.width > this._boundingBoxCandidate.width && entity.height > this._boundingBoxCandidate.height) {
                this._boundingBoxCandidate = entity;
            }

            if (this._entityWithImgCount === this._entityWithImgTotal) {

                this._stateConfig.boundingBox = this._boundingBoxCandidate;

                // STATE READY!!!
                this._state = new this._State(this._stateConfig);

                this._loadingState = false;
            }
        },

        /**
         * executes after assets are preloaded
         *
         * @method StateControl._onAssetsLoaded
         * @private
         */
        _onAssetsLoaded: function() {
            var parsedLayers = {
                // sorted layers for rendering in order
                _sorted: []
            };
            var walls = this._data.walls ? this._parseMap(this._data.walls) : undefined;
            var boundingBox = {
                width: 0,
                height: 0
            };
            var layer;
            var entity;
            var parsedEntity;

            this._entityWithImgTotal = this.getEntityWithImgTotal(this._data.layers);

            radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

            for (var layerInd = 0; layerInd < this._data.layers.length; layerInd += 1) {
                parsedLayers._sorted[layerInd] = new Layer();
                layer = this._data.layers[layerInd];

                for (var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    // set properties based on config object
                    parsedEntity = new entity.type(entity.config);
                    parsedEntity.name = entity.name || parsedEntity.protosName + parsedEntity._uid;

                    if (parsedEntity.src) {
                        parsedEntity.attachImage();
                    }

                    if (parsedEntity.width > boundingBox.width && parsedEntity.height > boundingBox.height) {
                        boundingBox = parsedEntity;
                    }

                    parsedLayers._sorted[layerInd].entities[entityInd] = parsedEntity;
                    // add named ref as well
                    parsedLayers[layer.name] = parsedLayers._sorted[layerInd];
                }
            }

            this._stateConfig = {
                layers: parsedLayers,
                camera: new Camera(),
                walls: walls,
                backgroundColor: this._data.backgroundColor,
                scrollRegions: this._data.scrollRegions
            };
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