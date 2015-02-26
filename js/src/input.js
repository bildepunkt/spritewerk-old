SW.Input = (function() {
    /**
     * @class SW.Input
     * @belongsto SW
     * @requires SW.FSM
     * @requires SW.Util
     */
    var Input = function() {
        var index;

        /**
         * @member {HTMLElement} SW.Input.prototype.canvas
         * @private
         */
        this.canvas = SW.Canvas.get('canvas');

        /**
         * @member {array} SW.Input.prototype.mouseEvents
         * @private
         */
        this.mouseEvents = [
            'click', 'dblclick', 'mousedown', 'mouseup'
        ];

        /**
         * @member {array} SW.Input.prototype.touchEvents
         * @private
         */
        this.touchEvents = [
            'tap', 'dbltap', 'touchstart', 'touchend'
        ];

        if (SW.Config.bindMouseInput) {
            for(index = 0; index < this.mouseEvents.length; index += 1) {
                SW.Radio.tuneIn(this.canvas, this.mouseEvents[index], this._receiveEvent, this);
            }
        }

        if (SW.Config.bindTouchInput) {
            for(index = 0; index < this.touchEvents.length; index += 1) {
                SW.Radio.tuneIn(this.canvas, this.touchEvents[index], this._receiveEvent, this);
            }
        }
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
     * @fires SW.Radio#press
     * @fires SW.Radio#dblpress
     * @fires SW.Radio#pressdown
     * @fires SW.Radio#pressup
     * @private
     */
    Input.prototype._receiveEvent = function(inputEvent) {
        var factor = SW.Config.stretch ? 100 / this._getScaleFactor() / 100 : 1;
        var offsetX = parseInt(this.canvas.style.left, 10);
        var offsetY = parseInt(this.canvas.style.top,  10);
        var eventData = {
            domEvent: inputEvent
        };
        var eventType;

        if (inputEvent.hasOwnProperty('touches')) {
            eventData.absX = inputEvent.touches[0].pageX - offsetX;
            eventData.absY = inputEvent.touches[0].pageY - offsetY;
        } else {
            eventData.absX = inputEvent.clientX || inputEvent.screenX - offsetX;
            eventData.absY = inputEvent.clientY || inputEvent.screenY - offsetY;
        }

        // coordinate positions relative to canvas scaling
        eventData.x = eventData.absX * factor;
        eventData.y = eventData.absY * factor;

        eventData.target = this._getEventTarget(eventData);

        switch(inputEvent.type) {
            case 'click':
            case 'tap':
                if (this.pressCandidate && this.pressCandidate === eventData.target) {
                    eventType = 'press';
                }
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

        if (eventType !== undefined) {
            /**
             * reports either a click, a tap or both
             * @event SW.Radio#press
             * @property {string} type - the event type
             * @property {integer} x - the input's x coordinate
             * @property {integer} y - the input's x coordinate
             * @property {SW.Renderable} target - a targeted entity
             * @property {object} domEvent - the original dom event object
             */
            /**
             * reports either a double click,  a double tap or both
             * @event SW.Radio#dblpress
             * @property {string} type - the event type
             * @property {integer} x - the input's x coordinate
             * @property {integer} y - the input's x coordinate
             * @property {SW.Renderable} target - a targeted entity
             * @property {object} domEvent - the original dom event object
             */
            /**
             * reports either a mousedown, a touchstart or both
             * @event SW.Radio#pressdown
             * @property {string} type - the event type
             * @property {integer} x - the input's x coordinate
             * @property {integer} y - the input's x coordinate
             * @property {SW.Renderable} target - a targeted entity
             * @property {object} domEvent - the original dom event object
             */
            /**
             * reports either a mouseup, a touchend or both
             * @event SW.Radio#pressup
             * @property {string} type - the event type
             * @property {integer} x - the input's x coordinate
             * @property {integer} y - the input's x coordinate
             * @property {SW.Renderable} target - a targeted entity
             * @property {object} domEvent - the original dom event object
             */
            SW.Radio.broadcast(eventType, {
                eventData: eventData
            });
        }
    };

    /**
     * @method SW.Input.prototype._getScaleFactor
     * @private
     */
    Input.prototype._getScaleFactor = function() {
        var factor = 1;
        var canvasCssWidth;

        if (this.canvas.style.width) {
            canvasCssWidth = parseInt(this.canvas.style.width, 10);
            factor = canvasCssWidth / this.canvas.width;
        }

        return factor;
    };

    /**
     * @method SW.Input.prototype._getEventTarget
     * @private
     */
    Input.prototype._getEventTarget = function(e) {
        var activeState = SW.FSM.getActiveState();
        var topmostEntity;

        activeState.sortedEach(function(group) {
            group.sortedEach(function(entity) {
                if (SW.Util.hitPoint(e.x, e.y, entity)) {
                    // continually assign higher sorted entity
                    topmostEntity = entity;
                }
            });
        });

        return topmostEntity;
    };
}());