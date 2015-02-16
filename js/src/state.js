SW.State = SW.Collection.extend({
    active: true,

    visible: true,

    data: null,

    /**
     * @member {boolean} State.prototype.scroll
     * @default false
     */
    canScroll: false,

    /**
     * @member {object} State.prototype.camera
     */
    camera: null,

    /**
     * the largest entity object which is used in determining scrolling
     *
     * @method State.prototype.boundingBox
     */        
    boundingBox: null,

    /**
     * (aquired via data object) contains sorted array of and named references of objects with a config options and a collection of entities
     *
     * @member {array} State.prototype.layers
     */
    layers: {},

    /**
     * (aquired via data object)
     *
     * @member {string} State.prototype.backgroundColor
     */
    backgroundColor: null,

    /**
     * (aquired via data object)
     *
     * @member {array} State.prototype.walls
     */
    walls: null,

    /**
     * (aquired via data object) the largest entity object which is used in determining scrolling
     *
     * @method State.prototype.boundingBox
     */ 
    scrollRegions: null,

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

    init: function() {
        radio.tuneIn('inputreceived', this._onInputReceived, this);
    },

    /**
     * @method State.prototype._onInputReceived
     * @private
     */
    _onInputReceived: function(e) {/*
        var factor = 100 / Input._getScaleFactor() / 100;
        var inputEvent = e.detail.inputEvent;
        var offsetX = parseInt(this._canvas.style.left, 10);
        var offsetY = parseInt(this._canvas.style.top,  10);
        var evt = {
            domEvent: inputEvent
        };

        if (inputEvent.hasOwnProperty('touches')) {
            evt.absX = inputEvent.touches[0].pageX - offsetX;
            evt.absY = inputEvent.touches[0].pageY - offsetY;
        } else {
            evt.absX = (inputEvent.hasOwnProperty('clientX') ? inputEvent.clientX : inputEvent.screenX) - offsetX,
            evt.absY = (inputEvent.hasOwnProperty('clientY') ? inputEvent.clientY : inputEvent.screenY) - offsetY
        }

        // coordinate positions relative to canvas scaling
        evt.x = evt.absX * factor;
        evt.y = evt.absY * factor;

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
        }
    */},

    /**
     * @method State.prototype._getTarget
     * @private
     */
    _getTarget: function(e) {/*
        var topmostEntity;
        var entity;
        var layer;

        // TODO possibly setup event queue which is triggered in update loop (and subsequently emptied)
        for(var layerInd = 0; layerInd < this.layers._sorted.length; layerInd += 1) {
            layer = this.layers._sorted[layerInd];

            for(var entityInd = 0; entityInd < layer.entities.length; entityInd += 1) {
                entity = layer.entities[entityInd];

                if (Collision.hitPoint(e.x, e.y, entity)) {
                    // continually assign higher sorted entity
                    topmostEntity = entity;
                }
            }
        }

        return topmostEntity;
    */},

    setup: function() {},

    update: function() {},

    destroy: function() {
        radio.tuneOut('inputreceived', this.inputHandler);
    }
});