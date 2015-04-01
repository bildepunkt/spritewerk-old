/**
 * @namespace
 */
var SW = {};
SW.Util = (function() {
    'use strict';

    /**
     * provides generic, useful functions
     *
     * @class SW.Util
     * @belongsto SW
     * @singleton
     */
    var Util = function() {};

    /**
     * recursively deep copies an object
     *
     * @method SW.Util.prototype.clone
     * @param {Object} src
     * @return {Object}
     */
    Util.prototype.clone = function(src) {
        // check for arrays too!
        var obj = (typeof src === 'object' && src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = this.clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    };

    /**
     * recursively appends (deep copies) an array of objects to the target. returns the new target
     *
     * @method SW.Util.prototype.mixin
     * @param {Object} target - the object to append to
     * @param {Object} ...sources - objects to mix into source
     * @return {Object}
     */
    Util.prototype.mixin = function(target, sources) {
        var len = arguments.length;
        var subObj;
        var key;

        if (len < 2) {
            throw new Error('Util.mixin requires two or more arguments');
        }

        for(var i = 1; i < len; i += 1) {
            subObj = this.clone(arguments[i]);
            for (key in subObj) {
                target[key] = subObj[key];
            }
        }

        return target;
    };

    /**
     * checks if an object contains members
     *
     * @method SW.Util.prototype.hasMemebers
     * @param {Object} obj
     * @return {Boolean}
     */
    Util.prototype.hasMembers = function(obj) {
        var count = 0;

        for(var key in obj) {
            count++;
            if (count) {
                break;
            }
        }

        return count ? true : false;
    };

    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @method SW.Util.prototype.hitPoint
     * @param {Integer} x - mouse/touch position
     * @param {Integer} y - mouse/touch position
     * @param {SW.Sprite} entity
     * @return {Boolean}
     */
    Util.prototype.hitPoint = function(x, y, entity) {
        var position = entity.getPosition();
        var dimensions = entity.getDimensions();

        if (x >= position.x &&
            x <= position.x + dimensions.x &&
            y >= position.y &&
            y <= position.y + dimensions.y) {
            return true;
        }
        return false;
    };

    return new Util();
}());
SW.Unique = (function() {
    'use strict';

    var uidCounter = 0;

    /**
     * provides a unique identifier to sub prototypes
     *
     * @class SW.Unique
     * @belongsto SW
     */
    var Unique = function() {
        /**
         * @member {Integer} SW.Unique.prototype._uid - the object's unique ID
         * @private
         * @readonly
         */
        this._uid = ++uidCounter;
    };

    return Unique;
}());
SW.Collection = (function() {
    'use strict';

    /**
     * provides management of, and an interface for, a list of items
     *
     * @class SW.Collection
     * @extends SW.Unique
     * @belongsto SW
     */
    var Collection = function() {
        SW.Unique.call(this);

        /**
         * @member {Array} SW.Collection.prototype._items - the sorted list
         * @private
         */
        this._items = [];
    };

    Collection.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * adds an object to the collection's items
     *
     * @method SW.Collection.prototype.addItem
     * @param {String} name
     * @param {Object} value
     * @chainable
     */
    Collection.prototype.addItem = function(name, value) {
        this._items.push({
            name: name,
            value: value
        });

        return this;
    };

    /**
     * adds an object to the collection's items at a specific index
     *
     * @method SW.Collection.prototype.addItemAt
     * @param {String} name
     * @param {any} value
     * @param {Integer} index
     * @chainable
     */
    Collection.prototype.addItemAt = function(name, value, index) {
        this._items.splice(index, 0, {
            name: name,
            value: value
        });

        return this;
    };

    /**
     * removes -by name- an object from the collection's items
     *
     * @method SW.Collection.prototype.removeItem
     * @param {String} name
     */
    Collection.prototype.removeItem = function(name) {
        this._rawEach(function(iterItem, i, iterName, items) {
            if (name === iterName) {
                iterItem = null;
                items.splice(i, 1);

                // break out of loop
                return false;
            }
        });
    };

    /**
     * removes all items from collection
     *
     * @method SW.Collection.prototype.removeAllItems
     * @return {SW.Collection}
     * @chainable
     */
    Collection.prototype.removeAllItems = function() {
        this._items = [];

        return this;
    };

    /**
     * iterates the collection's sortedItems. The item, index, and name are supplied to the provided function
     *
     * @method SW.Collection.prototype.each
     * @param {Function} fn
     * @param {Object} scope
     */
    Collection.prototype.each = function(fn, scope) {
        var item;

        fn = scope ? fn.bind(scope) : fn;

        for(var i = 0, len = this._items.length; i < len; i += 1) {
            item = this._items[i];
            if (fn(item.value, i, item.name) === false) {
                break;
            }
        }
    };

    /**
     * iterates the collection's sortedItems. The raw item, index, name, and the list being iterated are supplied to the provided function
     *
     * @method SW.Collection.prototype._rawEach
     * @param {function} fn
     * @private
     */
    Collection.prototype._rawEach = function(fn) {
        for(var i = 0, len = this._items.length; i < len; i += 1) {
            if (fn(this._items[i], i, this._items[i].name, this._items) === false) {
                break;
            }
        }
    };

    /**
     * iterates items and return the ones that meet criteria
     *
     * @method SW.Collection.prototype.filter
     * @param {function} fn
     * @return {Array} filteredItems
     */
    Collection.prototype.filter = function(fn, scope) {
        var filteredItems = [];
        var filteredItem;

        this.each(function(item, i, name) {
            filteredItem = fn(item, i, name);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        }, scope);

        return filteredItems;
    };

    /**
     * gets the count of items in collection
     *
     * @method SW.Collection.prototype.getItemCount
     * @return {Integer}
     */
    Collection.prototype.getItemCount = function() {
        return this._items.length;
    };

    /**
     * alters an existing item
     *
     * @method SW.Collection.prototype.setItem
     * @param {String} name
     * @param {any} value
     * @chainable
     */
    Collection.prototype.setItem = function(name, value) {
        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                iterItem.value = value;

                return false;
            }
        });

        return this;
    };

    /**
     * gets an existing item by name
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItem = function(name) {
        var item;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * gets an existing item by name index
     *
     * @method SW.Collection.prototype.getItem
     * @return {any}
     */
    Collection.prototype.getItemAt = function(index) {
        return this._items[index].value;
    };

    /**
     * gets a raw item by name
     *
     * @method SW.Collection.prototype._getRawItem
     * @return {any}
     * @private
     */
    Collection.prototype._getRawItem = function(name) {
        var item;

        this._rawEach(function(iterItem, i, iterName) {
            if (name === iterName) {
                item = iterItem;

                return false;
            }
        });

        return item;
    };

    /**
     * moves item to new index
     * 
     * @method SW.Collection.prototype.setItemIndex
     * @param {String} name
     * @param {Integer} index
     */
    Collection.prototype.setItemIndex = function(name, index) {
        var item;
        var currentIndex = this.getItemIndex(name);

        if (index === currentIndex) {
            return;
        }

        item = this._getRawItem(name);
        this.removeItem(name);
        this._items.splice(index, 0, item);
    };

    /**
     * gets an item's current index
     *
     * @method SW.Collection.prototype.getItemIndex
     * @param {String} name
     * @return {Integer}
     */
    Collection.prototype.getItemIndex = function(name) {
        var index;

        this.each(function(iterItem, i, iterName) {
            if (name === iterName) {
                index = i;

                return false;
            }
        });

        return index;
    };

    return Collection;
}());
SW.Dom = (function() {
    'use strict';

    /**
     * manipulates, and listens to, various dom elements
     *
     * @class SW.Dom
     * @belongsto SW
     */
    var Dom = function(options) {
        options = options || {};

        /**
         * @member {String} SW.Dom.prototype.title
         */
        this.title = options.title;

        /**
         * @member {String} SW.Dom.prototype.frameColor
         */
        this.frameColor = options.frameColor || '#444';

        document.title = this.title || 'spritewerk game';
        this._styleElements();

        SW.Signal.addListener(window, 'resize', this._onWindowResize, this);
        SW.Signal.addListener(window, 'orientationchange', this._onWindowResize, this);
    };

    /**
     * @method SW.Dom.prototype._onWindowResize
     * @listens window#resize
     * @listens window#orientationchange
     * @fires SW.Signal#screen/resize
     * @private
     */
    Dom.prototype._onWindowResize = function() {
        /**
         * reports a change in screen size
         * @event SW.Signal#screen/resize
         */
        SW.Signal.dispatch('screen/resize');
    };

    /**
     * @method SW.Dom.prototype._styleElements
     * @private
     */
    Dom.prototype._styleElements = function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = this.bgColor;
        body.style.margin = 0;
        body.style.padding = 0;
    };

    return Dom;
}());
SW.Signal = (function() {
    'use strict';

    /**
     * event handler
     *
     * @class SW.Signal
     * @belongsto SW
     * @singleton
     */
    var Signal = function() {
        this._handlerManager = {};

        this._mediator = document;
    };

    /**
     * tune in to events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.addListener
     * @param {HTMLElement} [el] - the element to listen to (if not present, will listen to built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     * @param {Object} [context] - if present will call handler with this scope
     */
    Signal.prototype.addListener = function(el, type, handler, context) {
        var handlers;

        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = this._mediator;
        }

        if (context) {
            if (!this._handlerManager[type]) {
                this._handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            this._handlerManager[type].push(handlers);
        }

        el.addEventListener(type, handlers ? handlers.boundHandler : handler, false);
    };

    /**
     * tune out events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.removeListener
     * @param {HTMLElement} [el] - the element to stop listening to (if not present, will tune out the built-in mediator)
     * @param {String} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     */
    Signal.prototype.removeListener = function(el, type, handler) {
        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            handler = type;
            type = el;
            el = this._mediator;
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (this._handlerManager[type]) {
            for (var i = 0; i < this._handlerManager[type].length; i += 1) {
                if (handler === this._handlerManager[type][i].handler) {
                    handler = this._handlerManager[type][i].boundHandler;
                    this._handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        el.removeEventListener(type, handler, false);
    };

    /**
     * dispatches events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.dispatch
     * @param {HTMLElement} [el] - the element to broadcast from (if not present, will broadcast from built-in mediator)
     * @param {String} type - event type
     * @param {Object} data - the data to pass to the handler
     */
    Signal.prototype.dispatch = function(el, type, data) {
        var customEvent;

        // no element, shift args over
        if (typeof el === 'string' && typeof type !== 'string') {
            data = type;
            type = el;
            el = this._mediator;
        }
        
        customEvent = new CustomEvent(type, {
            detail : data
        });

        el.dispatchEvent(customEvent);
    };

    return new Signal();
}());
SW.Input = (function() {
    'use strict';

    /**
     * @class SW.Input
     * @param {Object} options
     * @param {SW.Canvas} options.canvas
     * @param {Boolean} options.canvasStretch
     * @param {Boolean} options.bindMouseInput
     * @param {Boolean} options.bindTouchInput
     * @listens SW.Signal#scene/activated
     * @requires SW.Canvas
     * @belongsto SW
     */
    var Input = function(options) {
        var index;

        /**
         * @member {Array} SW.Input.prototype._mouseEvents
         * @private
         */
        this._mouseEvents = [
            'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'
        ];

        /**
         * @member {Array} SW.Input.prototype._touchEvents
         * @private
         */
        this._touchEvents = [
            'tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'
        ];

        /**
         * @member {HTMLElement} SW.Input.prototype._eventEl
         * @private
         */
        this._eventEl = options.eventEl;

        /**
         * @member {Array} SW.Input.prototype._canvasFit
         * @private
         */
        this._canvasFit = options.canvasFit;

        /**
         * @member {SW.Sprite} SW.Input.prototype._pressCandidate
         * @private
         */
        this._pressCandidate = null;

        /**
         * @member {Boolean} SW.Input.prototype._mouseCanDrag
         * @private
         */
        this._mouseCanDrag = false;

        /**
         * @member {Boolean} SW.Input.prototype._isDragging
         * @private
         */
        this._isDragging = false;

        /**
         * the scene with a collection of entities to check against the interaction
         * 
         * @member {SW.Collection} SW.Input.prototype._activeScene
         * @private
         */
        this._activeScene = null;

        if (options.bindMouseInput) {
            for(index = 0; index < this._mouseEvents.length; index += 1) {
                SW.Signal.addListener(this._eventEl, this._mouseEvents[index], this._receiveEvent, this);
            }
        }

        if (options.bindTouchInput) {
            for(index = 0; index < this._touchEvents.length; index += 1) {
                SW.Signal.addListener(this._eventEl, this._touchEvents[index], this._receiveEvent, this);
            }
        }

        SW.Signal.addListener('scene/activated', this._onSceneActivated, this);
    };

    /**
     * @method SW.Input.prototype._onSceneActivated
     */
    Input.prototype._onSceneActivated = function(e) {
        this.setActiveScene(e.detail.scene);
    };

    /**
     * the scene => layers => entities to check input events against
     *
     * @method SW.Input.prototype.setActiveScene
     * @param {SW.Collection} scene
     */
    Input.prototype.setActiveScene = function(scene) {
        this._activeScene = scene;
    };

    /**
     * @method SW.Input.prototype._receiveEvent
     * @requires SW.Vector
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
     * @fires SW.Signal#press
     * @fires SW.Signal#dblpress
     * @fires SW.Signal#pressdown
     * @fires SW.Signal#pressup
     * @fires SW.Signal#dragstart
     * @fires SW.Signal#drag
     * @fires SW.Signal#dragend
     * @private
     */
    Input.prototype._receiveEvent = function(inputEvent) {
        var factor = this._canvasFit ? 100 / this._getScaleFactor() / 100 : 1;
        var offsetX = this._eventEl.offsetLeft;
        var offsetY = this._eventEl.offsetTop;
        var eventData = {
            swEvent: true,
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
                this._dragCandidate = eventData.target && eventData.target.getDraggable() ? eventData.target : undefined;
                if (this._dragCandidate) {
                    dragCandidatePosition = this._dragCandidate.getPosition();
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
                if (this._mouseCanDrag && this._dragCandidate && this._dragCandidate.getDraggable()) {

                    dragCandidatePosition = this._dragCandidate.getPosition();

                    this._dragCandidate.setPosition(
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

        // assign an object so we don't need to check if target is defined
        if (!eventData.target) {
            eventData.target = {
                _uid: this._eventEl.nodeName
            };
        }

        /**
         * reports either a click, a tap or both
         * @event SW.Signal#press
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a double click,  a double tap or both
         * @event SW.Signal#dblpress
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mousedown, a touchstart or both
         * @event SW.Signal#pressdown
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mouseup, a touchend or both
         * @event SW.Signal#pressup
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
         /**
         * reports a mousemove (if mousedown) and touchmove
         * @event SW.Signal#drag
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the start of dragging
         * @event SW.Signal#dragstart
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the end of dragging
         * @event SW.Signal#dragend
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Sprite} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        for(var i = 0, len = eventTypes.length; i < len; i += 1) {
            eventData.type = eventTypes[i];
            SW.Signal.dispatch(eventData.type, eventData);
        }
    };

    /**
     * @method SW.Input.prototype._getScaleFactor
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
     * @method SW.Input.prototype._getEventTarget
     * @return {SW.Sprite}
     * @private
     */
    Input.prototype._getEventTarget = function(e) {
        var topmostEntity;

        if (this._activeScene) {
            this._activeScene.getLayers().each(function(layer) {
                layer.each(function(entity) {
                    if (SW.Util.hitPoint(e.x, e.y, entity)) {
                        // continually assign higher sorted entity
                        topmostEntity = entity;
                    }
                });
            });
        } else {
            throw new TypeError('SW.Input requires a scene');
        }

        return topmostEntity;
    };

    return Input;
}());