/**
 * the base state to extend from
 *
 * @class State
 */
define([
    '../lib/protos',
    '../lib/radio',
    './config',
    './dom-control',
    './draw',
    './input'
], function(Protos, radio, config, DomControl, Draw, Input) {
    return Protos.extend({
        /** 
         * @member {string} State.prototype.name - the unique name necessary for proto's inheritance
         */
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
         * @member {object} State.prototype.config
         */
        config: {},

        /**
         * @method State.prototype.press
         */
        press: function(e) {
            console.log(e);
        },

        /**
         * @method State.prototype.dblpress
         */
        dblpress: function(e) {
            console.log(e);
        },

        /**
         * @method State.prototype.pressdown
         */
        pressdown: function(e) {
            console.log(e);
        },

        /**
         * @method State.prototype.pressup
         */
        pressup: function(e) {
            console.log(e);
        },

        /**
         * @method State.prototype.mousemove
         */
        mousemove: function(e) {
            console.log(e);
        },

        init: function() {
            this._canvas = DomControl.getCanvas();

            radio.tuneIn('inputreceived', this._onInputReceived, this);
        },

        /**
         * @method State.prototype._onInputReceived
         * @private
         */
        _onInputReceived: function(e) {
            var inputEvent = e.detail.inputEvent;
            var evt = {
                domEvent: inputEvent,
                x: inputEvent.hasOwnProperty('offsetX') ? inputEvent.offsetX : inputEvent.layerX,
                y: inputEvent.hasOwnProperty('offsetY') ? inputEvent.offsetY : inputEvent.layerY
            };

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
            var factor = 1;
            var canvasCssWidth;
            var topmostEntity;
            var entity;
            var layer;

            if (this._canvas.style.width) {
                canvasCssWidth = parseInt(this._canvas.style.width, 10);
                factor = canvasCssWidth / this._canvas.width;
            }

            // TODO possibly setup event queue which is triggered in update loop (and subsequently emptied)
            for(var layerInd = 0; layerInd < this.layers.length; layerInd += 1) {
                layer = this.layers[layerInd];

                for(var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    if (this._hitPoint(e.x, e.y, entity, factor)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                }
            }

            return topmostEntity;
        },

        /**
         * @method State.prototype._hitPoint
         * @param {number} x - mouse/touch position
         * @param {number} y - mouse/touch position
         * @param {Sprite} entity
         * @param {number} factor
         * @private
         */
        // TODO move into collision file
        _hitPoint: function(x, y, entity, factor) {
            if (x >= entity.x * factor &&
                x <= entity.x * factor + entity.width * factor &&
                y >= entity.y * factor &&
                y <= entity.y * factor + entity.height * factor) {
                return true;
            }
            return false;
        },

        /**
         * updates all layers' entity's velocities, camera input, and determines visibility
         *
         * @method State.prototype.update
         */
        update: function() {
            var layer;
            var entity;

            Draw.clearCanvas().fillCanvas(this.backgroundColor);

            for(var layerInd = 0; layerInd < this.layers.length; layerInd += 1) {
                layer = this.layers[layerInd];

                for(var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                    entity = layer.entities[entityInd];

                    entity.x += entity.vx;
                    entity.y += entity.vy;

                    if (!layer.hud && this.scroll) {
                        entity.x -= this.camera.vx * layer.scrollDepth;
                        entity.y -= this.camera.vy * layer.scrollDepth;
                    }

                    // determine visibility
                    if (!layer.hud) {
                        if (entity.x + entity.width <= 0 || entity.x >= config.width ||
                            entity.y + entity.height <= 0 || entity.y >= config.height) {
                            entity.visible = false;
                        } else {
                            entity.visible = true;
                        }
                    }

                    if (entity.visible) {
                        Draw.renderEntity(entity);
                    }
                }
            }
        },

        /**
         * @method State.prototype.destroy
         */
        destroy: function() {}
    });
});