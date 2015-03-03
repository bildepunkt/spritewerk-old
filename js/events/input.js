/*
SPRITEWERK
==========

### A small, friendly HTML5 framework for device-agnostic game development  

SPRITEWERK is a culmination of:
* my desire to learn and keep up with advances
* self-expression (read: the ability to write code the way I want)
* a want to easily prototype my game/interactive ideas

#### Architecture
* all object properties are private and thus, should only be accessed through methods
* gettable properites will have getters, settable > setters, and get/settable will have an overloaded method (sans prefix)
* currently the SPRITEWERK interaction paradigm is that game control is device-agnostic.  
  Therefore touch/mouse events are normalized and merged into these singular events: press, dblpress, pressup, pressdown, drag (mousemove after mousedown)
*/

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
            'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'
        ];

        /**
         * @member {array} SW.Events.Input.prototype._touchEvents
         * @private
         */
        this._touchEvents = [
            'tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'
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
         * @member {SW.Renderable} SW.Events.Input.prototype._pressCandidate
         * @private
         */
        this._pressCandidate = null;

        /**
         * @member {SW.Renderable} SW.Events.Input.prototype._canDrag
         * @private
         */
        this._canDrag = false;

        /**
         * @member {SW.Renderable} SW.Events.Input.prototype._isDragging
         * @private
         */
        this._isDragging = false;

        /**
         * the collection of layers of entities to check against the interaction
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
     * @private
     */
    Input.prototype._receiveEvent = function(inputEvent) {
        var factor = this._canvasStretch ? 100 / this._getScaleFactor() / 100 : 1;
        var offsetX = this._canvas.offsetLeft;
        var offsetY = this._canvas.offsetTop;
        var eventData = {
            domEvent: inputEvent
        };
        var eventTypes = [];
        var dragCandidatePosition;

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
                if (!this._pressCandidate && this._pressCandidate._uid !== eventData.target._uid) {
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
                this._dragCandidate = eventData.target;
                if (this._dragCandidate) {
                    dragCandidatePosition = this._dragCandidate.position();
                    this._dragCandidateOffsetX = eventData.x - dragCandidatePosition.x;
                    this._dragCandidateOffsetY = eventData.y - dragCandidatePosition.y;
                }
                this._canDrag = true;
                eventTypes.push('pressdown');
            break;
            case 'mouseup':
            case 'touchend':
                this._canDrag = false;
                if (this._isDragging) {
                    this._isDragging = false;
                    this._dragCandidate = null;
                    eventTypes.push('dragend');
                }
                eventTypes.push('pressup');
            break;
            case 'mousemove':
            case 'touchmove':
                if (this._canDrag) {
                    eventTypes.push('drag');

                    if (this._dragCandidate) {
                        dragCandidatePosition = this._dragCandidate.position();
                        this._dragCandidate.position(
                            eventData.x - this._dragCandidateOffsetX,
                            eventData.y - this._dragCandidateOffsetY
                        );
                    }

                    if (!this._isDragging) {
                        this._isDragging = true;
                        eventTypes.push('dragstart');
                    }
                }
            break;
        }

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
         /**
         * reports a mousemove (if mousedown) and touchmove
         * @event SW.Events.Signal#drag
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        /**
         * reports the start of dragging
         * @event SW.Events.Signal#dragstart
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        /**
         * reports the end of dragging
         * @event SW.Events.Signal#dragend
         * @property {string} type - the event type
         * @property {integer} x - the input's x coordinate
         * @property {integer} y - the input's x coordinate
         * @property {SW.Display.Renderable} target - a targeted entity
         * @property {object} domEvent - the original dom event object
         */
        for(var i = 0, len = eventTypes.length; i < len; i += 1) {
            SW.Events.Signal.dispatch(eventTypes[i], {
                eventData: eventData
            });
        }
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