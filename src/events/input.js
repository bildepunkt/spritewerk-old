SW.Events.Input = (function() {
    /**
     * @class SW.Events.Input
     * @param {Object} options
     * @param {SW.Display.Canvas} options.canvas
     * @param {Boolean} options.canvasStretch
     * @param {Boolean} options.bindMouseInput
     * @param {Boolean} options.bindTouchInput
     * @requires SW.Display.Canvas
     * @belongsto SW
     */
    var Input = function(options) {
        var index;

        /**
         * @member {Array} SW.Events.Input.prototype._mouseEvents
         * @private
         */
        this._mouseEvents = [
            'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'
        ];

        /**
         * @member {Array} SW.Events.Input.prototype._touchEvents
         * @private
         */
        this._touchEvents = [
            'tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'
        ];

        /**
         * @member {HTMLElement} SW.Events.Input.prototype._eventEl
         * @private
         */
        this._eventEl = options.eventEl;

        /**
         * @member {Array} SW.Events.Input.prototype._canvasFit
         * @private
         */
        this._canvasFit = options.canvasFit;

        /**
         * @member {SW.Renderable} SW.Events.Input.prototype._pressCandidate
         * @private
         */
        this._pressCandidate = null;

        /**
         * @member {SW.Renderable} SW.Events.Input.prototype._mouseCanDrag
         * @private
         */
        this._mouseCanDrag = false;

        /**
         * @member {SW.Renderable} SW.Events.Input.prototype._isDragging
         * @private
         */
        this._isDragging = false;

        /**
         * the collection of layers of entities to check against the interaction
         * 
         * @member {SW.Scene.Scene} SW.Events.Input.prototype._scene
         * @private
         */
        this._scene = null;

        /**
         * the collection of entities to check against the interaction
         * 
         * @member {SW.Common.Collection|SW.Display.Layer} SW.Events.Input.prototype._layer
         * @private
         */
        this._layer = null;

        if (options.bindMouseInput) {
            for(index = 0; index < this._mouseEvents.length; index += 1) {
                SW.Events.Signal.addListener(this._eventEl, this._mouseEvents[index], this._receiveEvent, this);
            }
        }

        if (options.bindTouchInput) {
            for(index = 0; index < this._touchEvents.length; index += 1) {
                SW.Events.Signal.addListener(this._eventEl, this._touchEvents[index], this._receiveEvent, this);
            }
        }

        SW.Events.Signal.addListener('scene/activated', this.receiveScene, this);
    };

    Input.prototype.receiveScene = function(e) {
        this.setScene(e.detail.scene);
    };

    /**
     * the scene => layers => entities to check input events against; if we have a scene we won't check for a layer
     *
     * @method SW.Events.Input.prototype.setScene
     * @param {SW.Common.Scene} scene
     */
    Input.prototype.setScene = function(scene) {
        this._scene = scene;
    };

    /**
     * the layer => entities to check input events against; a layer is for situations where the complexity of a scene is not warranted
     *
     * @method SW.Events.Input.prototype.setLayer
     * @param {SW.Common.Collection|SW.Scenes.Layer} layer
     */
    Input.prototype.setLayer = function(layer) {
        this._layer = layer;
    };

    /**
     * @method SW.Input.prototype._receiveEvent
     * @requires SW.Display.Vector
     * @listens this.canvas#click
     * @listens this.canvas#dblclick
     * @listens this.canvas#mousedown
     * @listens this.canvas#mouseup
     * @listens this.canvas#mousemove
     * @listens this.canvas#tap
     * @listens this.canvas#dbltap
     * @listens this.canvas#touchstart
     * @listens this.canvas#touchend
     * @listens this.canvas#touchmove
     * @fires SW.Events.Signal#press
     * @fires SW.Events.Signal#dblpress
     * @fires SW.Events.Signal#pressdown
     * @fires SW.Events.Signal#pressup
     * @fires SW.Events.Signal#dragstart
     * @fires SW.Events.Signal#drag
     * @fires SW.Events.Signal#dragend
     * @private
     */
    Input.prototype._receiveEvent = function(inputEvent) {
        var factor = this._canvasFit ? 100 / this._getScaleFactor() / 100 : 1;
        var offsetX = this._eventEl.offsetLeft;
        var offsetY = this._eventEl.offsetTop;
        var eventData = {
            domEvent: inputEvent
        };
        var eventTypes = [];
        var dragCandidatePosition;

        if (inputEvent.hasOwnProperty('touches')) {
            eventData.absX = inputEvent.touches[0].pageX - offsetX;
            eventData.absY = inputEvent.touches[0].pageY - offsetY;
        } else {
            eventData.absX = inputEvent.offsetX || inputEvent.clientX - this._eventEl.clientLeft;
            eventData.absY = inputEvent.offsetY || inputEvent.clientY - this._eventEl.clientTop;
        }

        // coordinate positions relative to canvas scaling
        eventData.x = eventData.absX * factor;
        eventData.y = eventData.absY * factor;

        eventData.target = this._getEventTarget(eventData);

        switch(inputEvent.type) {
            case 'click':
            case 'tap':
                if (!this._pressCandidate || !eventData.target || this._pressCandidate._uid !== eventData.target._uid) {
                    // remove potential target if it was not pressed AND released on
                    eventData.target = undefined;
                }
                this._pressCandidate = null;
                eventTypes.push('press');
            break;
            case 'dblclick':
            case 'dbltap':
                eventTypes.push('dblpress');
            break;
            case 'mousedown':
            case 'touchstart':
                this._pressCandidate = eventData.target;
                this._dragCandidate = eventData.target && eventData.target.draggable() ? eventData.target : undefined;
                if (this._dragCandidate) {
                    dragCandidatePosition = this._dragCandidate.position();
                    this._dragCandidateOffsetX = eventData.x - dragCandidatePosition.x;
                    this._dragCandidateOffsetY = eventData.y - dragCandidatePosition.y;
                }
                this._mouseCanDrag = true;
                eventTypes.push('pressdown');
            break;
            case 'mouseup':
            case 'touchend':
                this._mouseCanDrag = false;
                if (this._isDragging) {
                    this._isDragging = false;
                    this._dragCandidate = null;
                    eventTypes.push('dragend');
                }
                eventTypes.push('pressup');
            break;
            /*
            // TODO decide whether to include...
            case 'touchleave':
            case 'touchcancel':
                if (this._isDragging) {
                    this._isDragging = false;
                    this._dragCandidate = null;
                    eventTypes.push('dragleave');
                }
                eventTypes.push('pressleave');
            break;*/
            case 'mousemove':
            case 'touchmove':
                if (this._mouseCanDrag && this._dragCandidate && this._dragCandidate.draggable()) {

                    dragCandidatePosition = this._dragCandidate.position();

                    this._dragCandidate.position(
                        eventData.x - this._dragCandidateOffsetX,
                        eventData.y - this._dragCandidateOffsetY
                    );

                    if (!this._isDragging) {
                        this._isDragging = true;
                        eventTypes.push('dragstart');
                    }

                    eventTypes.push('drag');
                }
            break;
        }

        /**
         * reports either a click, a tap or both
         * @event SW.Events.Signal#press
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a double click,  a double tap or both
         * @event SW.Events.Signal#dblpress
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mousedown, a touchstart or both
         * @event SW.Events.Signal#pressdown
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mouseup, a touchend or both
         * @event SW.Events.Signal#pressup
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
         /**
         * reports a mousemove (if mousedown) and touchmove
         * @event SW.Events.Signal#drag
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the start of dragging
         * @event SW.Events.Signal#dragstart
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the end of dragging
         * @event SW.Events.Signal#dragend
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        for(var i = 0, len = eventTypes.length; i < len; i += 1) {
            eventData.type = eventTypes[i];
            SW.Events.Signal.dispatch(eventData.type, eventData);
        }
    };

    /**
     * @method SW.Events.Input.prototype._getScaleFactor
     * @return {Float}
     * @private
     */
    Input.prototype._getScaleFactor = function() {
        var factor = 1;
        var canvasCssWidth;

        if (this._eventEl.style.width) {
            canvasCssWidth = parseInt(this._eventEl.style.width, 10);
            factor = canvasCssWidth / this._eventEl.width;
        }

        return factor;
    };

    /**
     * @method SW.Events.Input.prototype._getEventTarget
     * @return {SW.Display.Renderable}
     * @private
     */
    Input.prototype._getEventTarget = function(e) {
        var topmostEntity;

        if (this._scene) {
            this._scene.each(function(layer) {
                layer.each(function(entity) {
                    if (SW.Common.Util.hitPoint(e.x, e.y, entity)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                });
            });
        } else if (this._layer) {
            this._layer.each(function(entity) {
                if (SW.Common.Util.hitPoint(e.x, e.y, entity)) {
                    // continually assign higher sorted entity
                    topmostEntity = entity;
                }
            });
        } else {
            throw new TypeError('SW.Events.Input requires one SW.Scenes.Scene or SW.Common.Collection for checking against entities');
        }

        return topmostEntity;
    };

    return Input;
}());