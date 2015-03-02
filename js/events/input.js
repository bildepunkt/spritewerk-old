SW.Events.Input = (function() {
    /**
     * @class SW.Events.Input
     * @param {object} options
     * @param {boolean} options.canvasStretch
     * @param {boolean} options.bindMouseInput
     * @param {boolean} options.bindTouchInput
     * @requires SW.Display.Canvas
     * @belongsto SW
     */
    var Input = function(options) {
        var index;

        options = options || {};

        /**
         * @member {array} SW.Events.Input.prototype._mouseEvents
         * @private
         */
        this._mouseEvents = [
            'click', 'dblclick', 'mousedown', 'mouseup'
        ];

        /**
         * @member {array} SW.Events.Input.prototype._touchEvents
         * @private
         */
        this._touchEvents = [
            'tap', 'dbltap', 'touchstart', 'touchend'
        ];

        /**
         * @member {HTMLElement} SW.Events.Input.prototype._canvas
         * @private
         */
        this._canvas = SW.Display.Canvas.getCanvasEl();

        /**
         * @member {array} SW.Events.Input.prototype._canvasStretch
         * @private
         */
        this._canvasStretch = options.canvasStretch;

        /**
         * the layers of entities to check against the interaction
         * 
         * @member {SW.Common.Collection} SW.Events.Input.prototype._layers
         * @private
         */
        this._layers = null;

        if (options.bindMouseInput) {
            for(index = 0; index < this._mouseEvents.length; index += 1) {
                SW.Events.Signal.addListener(this._canvas, this._mouseEvents[index], this._receiveEvent, this);
            }
        }

        if (options.bindTouchInput) {
            for(index = 0; index < this._touchEvents.length; index += 1) {
                SW.Events.Signal.addListener(this._canvas, this._touchEvents[index], this._receiveEvent, this);
            }
        }
    };

    /**
     * @method SW.Events.Input.prototype.setLayers
     * @param {SW.Common.Collection} layers
     */
    Input.prototype.setLayers = function(layers) {
        this._layers = layers;
    };

    /**
     * @method SW.Input.prototype._receiveEvent
     * @listens this.canvas#click
     * @listens this.canvas#dblclick
     * @listens this.canvas#mousedown
     * @listens this.canvas#mouseup
     * @listens this.canvas#tap
     * @listens this.canvas#dbltap
     * @listens this.canvas#touchstart
     * @listens this.canvas#touchend
     * @fires SW.Events.Signal#press
     * @fires SW.Events.Signal#dblpress
     * @fires SW.Events.Signal#pressdown
     * @fires SW.Events.Signal#pressup
     * @private
     */
    Input.prototype._receiveEvent = function(inputEvent) {
        var factor = this._canvasStretch ? 100 / this._getScaleFactor() / 100 : 1;
        var offsetX = this._canvas.offsetLeft;
        var offsetY = this._canvas.offsetTop;
        var eventData = {
            domEvent: inputEvent
        };
        var eventType;

        if (inputEvent.hasOwnProperty('touches')) {
            eventData.absX = inputEvent.touches[0].pageX - offsetX;
            eventData.absY = inputEvent.touches[0].pageY - offsetY;
        } else {
            eventData.absX = inputEvent.offsetX || inputEvent.clientX - this._canvas.clientLeft;
            eventData.absY = inputEvent.offsetY || inputEvent.clientY - this._canvas.clientTop;
        }

        // coordinate positions relative to canvas scaling
        eventData.x = eventData.absX * factor;
        eventData.y = eventData.absY * factor;

        eventData.target = this._getEventTarget(eventData);

        switch(inputEvent.type) {
            case 'click':
            case 'tap':
                if (!this.pressCandidate && this.pressCandidate !== eventData.target) {
                    eventsData.target = undefined;
                }
                eventType = 'press';
            break;
            case 'dblclick':
            case 'dbltap':
                eventType = 'dblpress';
            break;
            case 'mousedown':
            case 'touchstart':
                this.pressCandidate = eventData.target;
                eventType = 'pressdown';
            break;
            case 'mouseup':
            case 'touchend':
                eventType = 'pressup';
            break;
        }

        eventData.type = eventType;

        /**
         * reports either a click, a tap or both
         * @event SW.Events.Signal#press
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        /**
         * reports either a double click,  a double tap or both
         * @event SW.Events.Signal#dblpress
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        /**
         * reports either a mousedown, a touchstart or both
         * @event SW.Events.Signal#pressdown
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        /**
         * reports either a mouseup, a touchend or both
         * @event SW.Events.Signal#pressup
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        SW.Events.Signal.dispatch(eventType, {
            eventData: eventData
        });
    };

    /**
     * @method SW.Events.Input.prototype._getScaleFactor
     * @return {float}
     * @private
     */
    Input.prototype._getScaleFactor = function() {
        var factor = 1;
        var canvasCssWidth;

        if (this._canvas.style.width) {
            canvasCssWidth = parseInt(this._canvas.style.width, 10);
            factor = canvasCssWidth / this._canvas.width;
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

        this._layers.sortedEach(function(layer) {
            layer.sortedEach(function(entity) {
                if (SW.Common.Util.hitPoint(e.x, e.y, entity)) {
                    // continually assign higher sorted entity
                    topmostEntity = entity;
                }
            });
        });

        return topmostEntity;
    };

    return Input;
}());