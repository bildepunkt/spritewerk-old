/**
 * the base state to extend from
 *
 * @class State
 */
define([
    '../lib/protos',
    '../lib/radio',
    './util/collision',
    './config',
    './dom-control',
    './draw',
    './input'
], function(Protos, radio, Collision, config, DomControl, Draw, Input) {
    return Protos.extend({
        protosName: 'state',

        /**
         * @member {HTMLEntity} State.prototype._canvas
         * @private
         */
        _canvas: null,

        /**
         * @member {boolean} State.prototype.scroll
         * @default false
         */
        scroll: false,

        /**
         * contains objects with a config options and a collection of entities
         *
         * @member {array} State.prototype.layers
         */
        layers: [],

        /**
         * @member {string} State.prototype.backgroundColor
         */
        backgroundColor: null,

        /**
         * @member {object} State.prototype.camera
         */
        camera: null,

        /**
         * @member {array} State.prototype.walls
         */
        walls: null,

        /**
         * the largest entity object which is used in determining scrolling
         *
         * @method State.prototype.boundingBox
         */        
        boundingBox: null,

        /**
         * @method State.prototype.press
         */
        press: function() {},

        /**
         * @method State.prototype.dblpress
         */
        dblpress: function() {},

        /**
         * @method State.prototype.pressdown
         */
        pressdown: function() {},

        /**
         * @method State.prototype.pressup
         */
        pressup: function() {},

        /**
         * @method State.prototype.mousemove
         */
        mousemove: function() {},

        init: function() {
            this._canvas = DomControl.getCanvas();

            radio.tuneIn('inputreceived', this._onInputReceived, this);
        },

        /**
         * @method State.prototype._onInputReceived
         * @private
         */
        _onInputReceived: function(e) {
            var factor = 100 / Input.scaleFactor() / 100;
            var inputEvent = e.detail.inputEvent;
            var evt = {
                domEvent: inputEvent,
                x: (inputEvent.hasOwnProperty('offsetX') ? inputEvent.offsetX : inputEvent.layerX),
                y: (inputEvent.hasOwnProperty('offsetY') ? inputEvent.offsetY : inputEvent.layerY)
            };

            // x positions relative to canvas scaling
            evt.relX = evt.x * factor;
            evt.relY = evt.y * factor;
            evt.target = this._getTarget(evt);

            switch(inputEvent.type) {
                case 'click':
                case 'tap':
                    this.press(evt);
                break;
                case 'dblclick':
                case 'dbltap':
                    this.dblpress(evt);
                break;
                case 'mousedown':
                case 'touchstart':
                    this.pressdown(evt);
                break;
                case 'mouseup':
                case 'touchend':
                    this.pressup(evt);
                break;
                case 'mousemove':
                    this.mousemove(evt);
                break;
            }
        },

        /**
         * @method State.prototype._getTarget
         * @private
         */
        _getTarget: function(e) {
            var topmostEntity;
            var entity;
            var layer;

            // TODO possibly setup event queue which is triggered in update loop (and subsequently emptied)
            for(var layerInd = 0; layerInd < this.layers.length; layerInd += 1) {
                layer = this.layers[layerInd];

                for(var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    if (Collision.hitPoint(e.relX, e.relY, entity)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                }
            }

            return topmostEntity;
        },

        /**
         * updates all layers' entity's velocities, camera input, and determines visibility
         *
         * @method State.prototype.update
         */
        update: function() {
            var layer;
            var entity;
            var overlap;
            var boundingBoxCandidate = this.boundingBox ? null : {
                width: 0,
                height: 0
            };

            Draw.clearCanvas().fillCanvas(this.backgroundColor);

            for(var layerInd = 0; layerInd < this.layers.length; layerInd += 1) {
                layer = this.layers[layerInd];

                for(var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    entity.x += entity.vx;
                    entity.y += entity.vy;

                    if (!layer.hud) {
                        entity.x -= this.camera.vx * (layer.scrollDepth);
                        entity.y -= this.camera.vy * (layer.scrollDepth);

                        if (entity.x + entity.width <= 0  || entity.x >= config.width ||
                            entity.y + entity.height <= 0 || entity.y >= config.height) {
                            entity.visible = false;
                        } else {
                            entity.visible = true;
                        }
                    }

                    if (entity.visible) {
                        if (entity.blockable && this.walls) {
                            for (var i = 0; i < this.walls.length; i += 1) {
                                overlap = Collision.block(entity, this.walls[i]);

                                if (overlap) {
                                    entity.x = overlap.x;
                                    entity.y = overlap.y;
                                }
                            }
                        }

                        if (entity.containable) {
                            this.camera.contain(entity);
                        }

                        if (!entity.hidden) {
                            Draw.renderEntity(entity);
                        }
                    }

                    if (!this.boundingBox) {
                        if (entity.width > boundingBoxCandidate.width && entity.height > boundingBoxCandidate.height) {
                            boundingBoxCandidate = entity;
                        }
                    }
                }
            }

            if (!this.boundingBox) {
                this.boundingBox = boundingBoxCandidate;
            }
        },

        /**
         * @method State.prototype.destroy
         */
        destroy: function() {
            radio.tuneOut('inputreceived', this._onInputReceived, this);
        }
    });
});