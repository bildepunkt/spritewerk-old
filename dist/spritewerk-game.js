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
     * @param {SW.Renderable} entity
     * @return {Boolean}
     */
    Util.prototype.hitPoint = function(x, y, entity) {
        var position = entity.position();
        var dimension = entity.dimensions();

        if (x >= position.x &&
            x <= position.x + dimension.x &&
            y >= position.y &&
            y <= position.y + dimension.y) {
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
         * @member {SW.Renderable} SW.Input.prototype._pressCandidate
         * @private
         */
        this._pressCandidate = null;

        /**
         * @member {SW.Renderable} SW.Input.prototype._mouseCanDrag
         * @private
         */
        this._mouseCanDrag = false;

        /**
         * @member {SW.Renderable} SW.Input.prototype._isDragging
         * @private
         */
        this._isDragging = false;

        /**
         * the collection of entities to check against the interaction
         * 
         * @member {SW.Collection} SW.Input.prototype._layers
         * @private
         */
        this._layers = null;

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
        this.setLayers(e.detail.scene.getLayers());
    };

    /**
     * the layers => entities to check input events against
     *
     * @method SW.Input.prototype.setLayers
     * @param {SW.Collection} layers
     */
    Input.prototype.setLayers = function(layers) {
        this._layers = layers;
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
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a double click,  a double tap or both
         * @event SW.Signal#dblpress
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mousedown, a touchstart or both
         * @event SW.Signal#pressdown
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports either a mouseup, a touchend or both
         * @event SW.Signal#pressup
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
         /**
         * reports a mousemove (if mousedown) and touchmove
         * @event SW.Signal#drag
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the start of dragging
         * @event SW.Signal#dragstart
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
         * @property {Object} domEvent - the original dom event object
         */
        /**
         * reports the end of dragging
         * @event SW.Signal#dragend
         * @property {String} type - the event type
         * @property {Integer} x - the input's x coordinate
         * @property {Integer} y - the input's x coordinate
         * @property {SW.Renderable} target - a targeted entity
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
     * @return {SW.Renderable}
     * @private
     */
    Input.prototype._getEventTarget = function(e) {
        var topmostEntity;

        if (this._layers) {
            this._layers.each(function(layer) {
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
SW.Preloader = (function() {
    'use strict';

    /**
     * @class SW.Preloader
     * @belongsto SW
     * @param {Object} assets
     * @requires SW.Signal
     * @private
     */
    var Preloader = function(assets) {
        var prop;

        /**
         * @member {Object} SW.Preloader.prototype.assets
         * @private
         */
        this.assets = assets;

        /**
         * @member {Integer} SW.Preloader.prototype.total
         * @private
         */
        this.total = 0;

        /**
         * @member {Integer} SW.Preloader.prototype.loaded
         * @private
         */
        this.loaded = 0;

        for(prop in this.assets) {
            this.total += 1;
        }

        for (prop in this.assets) {
            if (this.assets[prop].indexOf('.png') > 0 || this.assets[prop].indexOf('.jpg') > 0 || this.assets[prop].indexOf('.gif') > 0) {
                var img = new Image();
                img.src = this.assets[prop];

                SW.Signal.addListener(img, 'load',  this._loadHandler, this);
                SW.Signal.addListener(img, 'error', this._error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                SW.Signal.addListener(audio, 'canplaythrough', this._loadHandler, this);
                SW.Signal.addListener(audio, 'error', this._error, this);
            } else {
                throw new Error('File type not supported');
            }
        }
    };

    /**
     * @method SW.Preloader.prototype._loadHandler
     * @fires SW.Signal#preload/update
     * @fires SW.Signal#preload/complete
     * @requires SW.Signal
     * @private
     */
    Preloader.prototype._loadHandler = function(e) {
        var el = e.currentTarget;
        var type = el.tagName.toLowerCase();
        var assetName;

        this._tuneOutCurrent(el);

        this.loaded += 1;

        for(var name in this.assets) {
            if (this._getFileName(this.assets[name]) === this._getFileName(el.src)) {
                assetName = name;
            }
        }

        /**
         * reports that an asset has been successfully preloaded
         *
         * @event SW.Signal#preload/update
         * @property {HTMLElement} el
         * @property {String} name
         * @property {Integer} loaded
         * @property {Integer} total
         */
        SW.Signal.dispatch('preload/update', {
            loaded: this.loaded,
            total : this.total,
            name: assetName,
            el: el,
            type: type
        });

        if (this.loaded === this.total) {
            /**
             * reports that all assets have been successfully preloaded
             *
             * @event SW.Signal#preload/complete
             */
            SW.Signal.dispatch('preload/complete');
        }
    };

    /**
     * @method SW.Preloader.prototype._tuneOutCurrent
     * @requires SW.Signal
     * @private
     */
    Preloader.prototype._tuneOutCurrent = function(el) {
        var type = el.tagName.toLowerCase();

        if (type == 'img') {
            SW.Signal.removeListener(el, 'load',  this._loadHandler);
            SW.Signal.removeListener(el, 'error', this._error);
        } else if (type == 'audio') {
            SW.Signal.removeListener(el, 'canplaythrough', this._loadHandler);
            SW.Signal.removeListener(el, 'error', this._error);
        }
    };

    /**
     * @method SW.Preloader.prototype._error
     * @private
     */
    Preloader.prototype._error = function(e) {
        if ('console' in window) {
            console.log(e);
        }
    };

    /**
     * @method SW.Preloader.prototype._getFileName
     * @param {String} path
     * @private
     */
    Preloader.prototype._getFileName = function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    };

    return Preloader;
}());
SW.MediaManager = (function() {
    'use strict';

    /**
     * manages and preloads media, plays audio
     *
     * @class SW.MediaManager
     * @requires SW.Signal
     * @belongsto SW
     * @singleton
     */
    var MediaManager = function() {
        /**
         * @member {Object} SW.MediaManager.prototype._images
         * @private
         */
        this._images = {};

        /**
         * @member {Object} SW.MediaManager.prototype._images
         * @private
         */
        this._sounds = {};

        SW.Signal.addListener('preload/update', this._onUpdate, this);
    };

    /**
     * @method SW.MediaManager.prototype.preload
     * @param {Object} assets - a hashtable of asset names & paths
     * @requires SW.Preloader
     */
    MediaManager.prototype.preload = function(assets) {
        new SW.Preloader(assets);
    };

    /**
     * @method SW.MediaManager.prototype._onUpdate
     * @param {SW.Signal#preload/update} e
     * @listens SW.Signal#preload/update
     * @private
     */
    MediaManager.prototype._onUpdate = function(e) {
        switch(e.detail.type) {
            case 'img':
                this._images[e.detail.name] = e.detail.el;
            break;
            case 'audio':
                this._sounds[e.detail.name] = e.detail.el;
            break;
        }
    };

    /**
     * @method SW.MediaManager.prototype._addImage
     * @private
     */
    MediaManager.prototype._addImage = function(name, img) {
        this._images[name] = img;
    };

    /**
     * @method SW.MediaManager.prototype._addSound
     * @private
     */
    MediaManager.prototype._addSound = function(name, snd) {
        this._sounds[name] = snd;
    };

    /**
     * @method SW.MediaManager.prototype.getImage
     * @param {String} name
     * @return {HTMLEntity}
     */
    MediaManager.prototype.getImage = function(name) {
        return this._images[name];
    };

    /**
     * @method SW.MediaManager.prototype.playSound
     * @param {String} name
     */
    MediaManager.prototype.playSound = function(name) {
        var sound = this._sounds[name];
        
        sound.currentTime = 0;
        sound.play();
    };

    /**
     * @method SW.MediaManager.prototype.pauseSound
     * @param {String} name
     */
    MediaManager.prototype.pauseSound = function(name) {
        var sound = this._sounds[name];

        sound.pause();
    };

    /**
     * @method SW.MediaManager.prototype.resumeSound
     * @param {String} name
     */
    MediaManager.prototype.resumeSound = function(name) {
        var sound = this._sounds[name];

        sound.play();
    };

    /**
     * @method SW.MediaManager.prototype.pauseAllSounds
     */
    MediaManager.prototype.pauseAllSounds = function() {
        for(var sound in this._sounds) {
            this._sounds[sound].pause();
        }
    };

    return new MediaManager();
}());
SW.Canvas = (function() {
    'use strict';

    /**
     * displays entities
     *
     * @class SW.Canvas
     * @param {Object} options
     * @param {String} options.id - the canvas element's id
     * @param {String} options.width - the canvas element's width
     * @param {String} options.height - the canvas element's height
     * @param {Boolean} [options.canvasFit] - if true, the canvas stretches to fill the viewport width/height
     * @belongsto SW
     */
    var Canvas = function(options) {
        options = options || {};

        /**
         * @member {HTMLEntity} SW.Canvas.prototype._canvasEl - the canvas element
         * @private
         */
        this._canvasEl = document.getElementById(options.id);
        /**
         * @member {HTMLEntity} SW.Canvas.prototype._context - the canvas element's context object
         * @private
         */
        this._context = this._canvasEl.getContext('2d');
        /**
         * @member {Integer} SW.Canvas.prototype._width - the canvas element's width
         * @private
         */
        this._width = options.width || 800;
        /**
         * @member {Integer} SW.Canvas.prototype._height - the canvas element's height
         * @private
         */
        this._height = options.height || 600;

        this._canvasEl.width = this._width;
        this._canvasEl.height = this._height;
        this._canvasEl.style.position = 'absolute';

        if (options.canvasFit) {
            SW.Signal.addListener('screen/resize', this._onScreenResize, this);
            this._onScreenResize();
        }
    };

    /**
     * @method SW.Canvas.prototype._onScreenResize
     * @listens SW.Signal#screen/resize
     * @private
     */
    Canvas.prototype._onScreenResize = function() {
        var LANDSCAPE_RATIO = this._height / this._width;
        var PORTRAIT_RATIO  = this._width / this._height;
        var IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var winLandscapeRatio = winH / winW;
        var winPortraitRatio  = winW / winH;
        var left = 0;
        var top  = 0;
        var canW;
        var canH;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                canW = winW;
                canH = canW * LANDSCAPE_RATIO;
                top  = (winH - canH) / 2;
            } else {
                canH = winH;
                canW = winH * PORTRAIT_RATIO;
                left = (winW - canW) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                canH = winH;
                canW = winH * PORTRAIT_RATIO;
                left = (winW - canW) / 2;
            } else {
                canW = winW;
                canH = canW * LANDSCAPE_RATIO;
                top  = (winH - canH) / 2;
            }
        }

        this._canvasEl.style.width  = Math.round(canW) + 'px';
        this._canvasEl.style.height = Math.round(canH) + 'px';
        this._canvasEl.style.left   = Math.round(left) + 'px';
        this._canvasEl.style.top    = Math.round(top)  + 'px';

        // we use a timeout here because some mobile browsers
        // don't fire if there is not a short delay
        //setTimeout(function() {
            //window.scrollTo(0,1);
        //}, 1);
    };

    /**
     * @method SW.Canvas.prototype.clearAll
     * @chainable
     */
    Canvas.prototype.clearAll = function() {
        this._context.clearRect(0, 0, this._width, this._height);

        return this;
    };

    /**
     * fills the entire canvas
     *
     * @method SW.Canvas.prototype.fillAll
     * @param {String} color - supports color names, hex & rgb(a)
     * @chainable
     */
    Canvas.prototype.fillAll = function(color) {
        this._context.save();
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, this._width, this._height);
        this._context.restore();

        return this;
    };

    /**
     * prepares context and decides how to render the entity
     *
     * @method SW.Canvas.prototype.render
     * @param {SW.renderable} entity
     */
    Canvas.prototype.render = function(entity) {
        var position = entity.getPosition();
        var scale = entity.getScale();
        var rotation = entity.getRotation();
        var rotationOffset = entity.getRotationOffset();
        var scaleOffset = entity.getScaleOffset();

        // remember: context transforms are cumulative :)
        this._context.save();
        this._context.translate(Math.floor(position.x), Math.floor(position.y));

        if (rotation !== 0) {
            this._context.translate(rotationOffset.x, rotationOffset.y);
            this._context.rotate((Math.PI / 180) * rotation);
            this._context.translate(-rotationOffset.x, -rotationOffset.y);
        }

        if (scale.x !== 1 || scale.y !== 1) {
            this._context.translate(scaleOffset.x, scaleOffset.y);
            this._context.scale(scale.x, scale.y);
            this._context.translate(-scaleOffset.x, -scaleOffset.y);
        }

        this._context.globalAlpha = entity.getOpacity();
        this._context.globalCompositeOperation = entity.getComposite();

        switch(entity.getDisplayType()) {
            case 'rectangle':
                this._renderRectangle(entity);
            break;
            case 'line':
                this._renderLine(entity);
            break;
            case 'polygon':
                this._renderPolygon(entity);
            break;
            case 'sprite':
                this._renderSprite(entity);
            break;
            case 'text':
                this._renderText(entity);
            break;
            default:
                throw new Error('SW.Canvas cannot render type: ' + entity.getDisplayType());
            break;
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderRectangle
     * @private
     */
    Canvas.prototype._renderRectangle = function(entity) {
        var dimension = entity.getDimensions();
        var fillStyle = entity.getFillStyle();
        var strokeStyle = entity.getStrokeStyle();

        this._context.save();
        this._context.lineWidth = entity.getStrokeWidth();

        if (fillStyle) {
            this._context.fillStyle = fillStyle;
            this._context.fillRect(0, 0, dimension.x, dimension.y);
        }

        if (strokeStyle) {
            this._context.strokeStyle = strokeStyle;
            this._context.strokeRect(0, 0, dimension.x, dimension.y);
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderLine
     * @private
     */
    Canvas.prototype._renderLine = function(entity) {
        var coordinates = entity.getCoordinates();

        this._context.save();
        this._context.strokeStyle = entity.getStrokeStyle();
        this._context.lineWidth = entity.getStrokeWidth();
        this._context.beginPath();

        this._context.moveTo(coordinates[0].x, coordinates[0].y);

        for(var i = 1, len = coordinates.length; i < len; i += 1) {
            this._context.lineTo(coordinates[i].x, coordinates[i].y);
        }

        this._context.stroke();
        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderPolygon
     * @private
     */
    Canvas.prototype._renderPolygon = function(entity) {
        var coordinates = entity.getCoordinates();
        var fillStyle = entity.getDillStyle();
        var strokeStyle = entity.getStrokeStyle();

        this._context.save();
        this._context.lineWidth = entity.getStrokeWidth();
        this._context.beginPath();

        this._context.moveTo(coordinates[0].x, coordinates[0].y);

        for(var i = 1, len = coordinates.length; i < len; i += 1) {
            this._context.lineTo(coordinates[i].x, coordinates[i].y);
        }

        this._context.lineTo(coordinates[0].x, coordinates[0].y);
        this._context.closePath();

        if (fillStyle) {
            this._context.fillStyle = fillStyle;
            this._context.fill();
        }

        if (strokeStyle) {
            this._context.strokeStyle = strokeStyle;
            this._context.stroke();
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderText
     * @private
     */
    Canvas.prototype._renderText = function(entity) {
        var fillStyle = entity.getFillStyle();
        var strokeStyle = entity.getStrokeStyle();
        var maxWidth = entity.getMaxWidth();
        var contents = entity.getContents();
        var lineHeight;
        var lines;
        var textDimensions;

        this._context.save();
        this._context.font = entity.getFont();
        this._context.textBaseline = entity.getBaseline();
        this._context.textAlign = entity.getAlign();
        this._context.lineWidth = entity.getStrokeWidth();

        if (typeof maxWidth === 'number') {
            lines = this._getWrappedText(contents, maxWidth);
            lineHeight = this._getLineHeight(entity);
        } else {
            lines[0] = contents;
        }

        for(var i = 0, len = lines.length; i < len; i += 1) {
            if (fillStyle) {
                this._context.fillStyle = fillStyle;
                this._context.fillText(lines[i], 0, lineHeight * i);
            }

            if (strokeStyle) {
                this._context.strokeStyle = strokeStyle;
                this._context.strokeText(lines[i], 0, lineHeight * i);
            }
        }

        textDimensions = this._context.measureText(contents);

        entity.setDimensions(
            maxWidth || textDimensions.width,
            lineHeight * lines.length
        );

        this._context.restore();
    };

    Canvas.prototype._getWrappedText = function(contents, maxWidth) {
        var words = contents.split(' ');
        var lines = [];
        var line = '';
        var testLine;
        var testWidth;

        for(var i = 0, len = words.length; i < len; i += 1) {
            testLine = line + words[i] + ' ';
            testWidth = this._context.measureText(testLine).width;

            if (testWidth > maxWidth) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        // and finally, add leftovers
        lines.push(line);

        return lines;
    };

    Canvas.prototype._getLineHeight = function(entity) {
        var factor = 1.2;
        var font = entity.getFont();
        return parseInt(font.match(/[0-9]*px|pt|em/), 10) * factor;
    };

    /**
     * @method Draw.prototype._renderSprite
     * @private
     */
    Canvas.prototype._renderSprite = function(entity) {
        var dimension = entity.getDimensions();
        var srcDimensions = entity.getSrcDimensions();
        var srcPosition = entity.getSrcPosition();

        this._context.drawImage(
            entity.getImage(),
            srcPosition.x,
            srcPosition.y,
            srcDimensions.x,
            srcDimensions.y,
            0, 0,
            dimension.x,
            dimension.y
        );
    };

    /**
     * @method SW.Canvas.prototype.getCanvasEl
     * @return {HTMLEntity}
     */
    Canvas.prototype.getCanvasEl = function() {
        return this._canvasEl;
    };

    /**
     * @method SW.Canvas.prototype.getContext
     * @return {CanvasRenderingContext2D}
     */
    Canvas.prototype.getContext = function() {
        return this._context;
    };

    return Canvas;
}());
SW.Vector = (function() {
    'use strict';
    
    /**
     * a two-dimensional vector
     *
     * @class SW.Vector
     * @param {Integer} [x]
     * @param {Integer} [y]
     * @belongsto SW
     */
    var Vector = function(x, y) {
        /**
         * @member {Float} SW.Vector.x - calculation along the x axis
         * @default 0
         */
        this.x = (typeof x === 'number') ? x : 0;
        /**
         * @member {Float} SW.Vector.y - calculation along the y axis
         * @default 0
         */
        this.y = (typeof y === 'number') ? y : 0;
    };

    return Vector; 
}());
SW.Renderable = (function() {
    'use strict';

    /**
     * is the base prototype for all renderable entities
     *
     * @class SW.Renderable
     * @extends SW.Unique
     * @requires SW.Vector
     * @belongsto SW
     */
    var Renderable = function() {
        SW.Unique.call(this);
 
        /**
         * @member {SW.Vector} SW.Renderable.prototype._position
         * @default 0
         * @private
         */
        this._position = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._velocity
         * @default 0
         * @private
         */
        this._velocity = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._dimensions
         * @private
         */
        this._dimensions = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._scale
         * @default 1
         * @private
         */
        this._scale = new SW.Vector(1, 1);

        /**
         * @member {SW.Vector} SW.Renderable.prototype._rotationOffset
         * @default 0
         * @private
         */
        this._rotationOffset = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._scaleOffset
         * @default 0
         * @private
         */
        this._scaleOffset = new SW.Vector();

        /**
         * @member {Boolean} SW.Renderable.prototype._draggable
         * @default false
         * @private
         */
        this._draggable = false;

        /**
         * @member {Integer} SW.Renderable.prototype._rotation
         * @default 0
         * @private
         */
        this._rotation = 0;

        /**
         * @member {Integer} SW.Renderable.prototype._opacity
         * @default 1
         * @private
         */
        this._opacity = 1;

        /**
         * the entity's fill display
         *
         * @member {String} SW.Text.prototype._fillStyle
         * @default '#000'
         * @private
         */
        this._fillStyle = '#999';

        /**
         * the entity's stroke display
         *
         * @member {String} SW.Text.prototype._strokeStyle
         * @default null
         * @private
         */
        this._strokeStyle = null;

        /**
         * the entity's stroke width
         *
         * @member {String} SW.Text.prototype._strokeWidth
         * @default 4
         * @private
         */
        this._strokeWidth = 4;

        /**
         * @member {Boolean} SW.Renderable.prototype._visible
         * @default true
         * @private
         */
        this._visible = true;

        /**
         * @member {Boolean} SW.Renderable.prototype._hidden
         * @default false
         * @private
         */
        this._hidden = false;

        /**
         * @member {String} SW.Renderable.prototype._composite
         * @default 'source-over'
         * @private
         */
        this._composite = 'source-over';

        /**
         * @member {String} SW.Renderable.prototype._displayType
         * @default ''
         * @private
         * @readonly
         */
        this._displayType = '';
    };

    Renderable.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * @method SW.Renderable.prototype.getDisplayType
     * @return {String}
     * @chainable
     */
    Renderable.prototype.getDisplayType = function() {
        return this._displayType;
    };

    /**
     * @method SW.Renderable.prototype.getPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getPosition = function() {
        return this._position;
    };

    /**
     * @method SW.Renderable.prototype.setPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setPosition = function(x, y) {
        if (typeof x === 'number') {
            this._position.x = x;
        }

        if (typeof y === 'number') {
            this._position.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getDimensions
     * @return {SW.Vector}
     */
    Renderable.prototype.getDimensions = function() {
        return this._dimensions;
    };

    /**
     * @method SW.Renderable.prototype.setDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._dimensions.x = x;
        }

        if (typeof y === 'number') {
            this._dimensions.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getRotation
     * @return {Float}
     */
    Renderable.prototype.getRotation = function(value) {
        return this._rotation;
    };

    /**
     * @method SW.Renderable.prototype.setRotation
     * @param {Float} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setRotation = function(value) {
        this._rotation = value;
    };

    /**
     * @method SW.Renderable.prototype.getRotationOffset
     * @return {SW.Vector}
     */
    Renderable.prototype.getRotationOffset = function() {
        return this._rotationOffset;
    };

    /**
     * @method SW.Renderable.prototype.setRotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setRotationOffset = function(x, y) {
        if (typeof x === 'number') {
            this._rotationOffset.x = x;
        }

        if (typeof y === 'number') {
            this._rotationOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getScale
     * @return {SW.Vector}
     */
    Renderable.prototype.getScale = function() {
        return this._scale;
    };

    /**
     * @method SW.Renderable.prototype.setScale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector}
     * @chainable
     */
    Renderable.prototype.setScale = function(x, y) {
        if (typeof x === 'number') {
            this._scale.x = x;
        }

        if (typeof y === 'number') {
            this._scale.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getScaleOffset
     * @return {SW.Vector}
     */
    Renderable.prototype.getScaleOffset = function() {
        return this._scaleOffset;
    };

    /**
     * @method SW.Renderable.prototype.setScaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setScaleOffset = function(x, y) {
        if (typeof x === 'number') {
            this._scaleOffset.x = x;
        }

        if (typeof y === 'number') {
            this._scaleOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getDraggable
     * @return {Boolean}
     */
    Renderable.prototype.getDraggable = function() {
        return this._draggable;
    };

    /**
     * @method SW.Renderable.prototype.setDraggable
     * @param {Boolean} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setDraggable = function(value) {
        this._draggable = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getOpacity
     * @return {Float}
     */
    Renderable.prototype.getOpacity = function() {
        return this._opacity;
    };

    /**
     * @method SW.Renderable.prototype.setOpacity
     * @param {Boolean} value
     * @return {Float}
     * @chainable
     */
    Renderable.prototype.setOpacity = function(value) {
        this._opacity = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getComposite
     * @return {String}
     */
    Renderable.prototype.getComposite = function() {
        return this._composite;
    };

    /**
     * @method SW.Renderable.prototype.setComposite
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setComposite = function(value) {
        this._composite = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getFillStyle
     * @return {String}
     */
    Renderable.prototype.getFillStyle = function(value) {
        return this._fillStyle;
    };

    /**
     * @method SW.Renderable.prototype.setFillStyle
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setFillStyle = function(value) {
        this._fillStyle = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getStrokeStyle
     * @return {String}
     */
    Renderable.prototype.getStrokeStyle = function() {
        return this._strokeStyle;
    };

    /**
     * @method SW.Renderable.prototype.setStrokeStyle
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setStrokeStyle = function(value) {
        this._strokeStyle = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getStrokeWidth
     * @return {String}
     */
    Renderable.prototype.getStrokeWidth = function() {
        return this._strokeWidth;
    };

    /**
     * @method SW.Renderable.prototype.setStrokeWidth
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setStrokeWidth = function(value) {
        this._strokeWidth = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getOuterPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getOuterPosition = function() {
        return new SW.Vector(this._position.x + this._dimensions.x, this._position.y + this._dimensions.y);
    };

    /**
     * @method SW.Renderable.prototype.getCenterPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getCenterPosition = function() {
        return new SW.Vector(this._position.x - this._dimensions.x / 2, this._position.y - this._dimensions.y / 2);
    };

    /**
     * @method SW.Renderable.prototype.getHalfDimension
     * @return {SW.Vector}
     */
    Renderable.prototype.getHalfDimension = function() {
        return new SW.Vector(this._dimensions.x / 2, this._dimensions.y / 2);
    };

    return Renderable;
}());
SW.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Rectangle
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Renderable.call(this);

        /**
         * @member {String} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Util.clone(SW.Renderable.prototype);

    return Rectangle;
}());
SW.Line = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Line
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Line = function() {
        SW.Renderable.call(this);

        /**
         * @member {Array} SW.Line.prototype._coordinates
         * @private
         */
        this._coordinates = [];
        
        /**
         * @member {String} SW.Line.prototype._cap
         * @default 'butt'
         * @private
         */
        this._cap = 'butt';

        /**
         * @member {String} SW.Line.prototype._displayType
         * @default 'line'
         * @private
         * @readonly
         */
        this._displayType = 'line';
    };

    Line.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Line.prototype.getCoordinates
     * @return {Array}
     */
    Line.prototype.getCoordinates = function() {
        return this._coordinates;
    };

    /**
     * @method SW.Line.prototype.setCoordinates
     * @param {Array} coordinates - n amount of coordinates
     * @return {SW.Line}
     * @chainable
     */
    Line.prototype.setCoordinates = function() {
        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    /**
     * @method SW.Line.prototype.getCap
     * @return {String}
     * @chainable
     */
    Line.prototype.getCap = function() {
        return this._cap;
    };

    /**
     * @method SW.Line.prototype.setCap
     * @param {String} value - values can be 'butt', 'round', or 'square'
     * @return {SW.Line}
     * @chainable
     */
    Line.prototype.setCap = function(value) {
        this._cap = value;

        return this;
    };

    return Line;
}());
SW.Sprite = (function() {
    'use strict';

    /**
     * a image display entity
     *
     * @class SW.Sprite
     * @extends SW.Renderable
     * @requires SW.Vector
     * @belongsto SW
     */
    var Sprite = function() {
        SW.Renderable.call(this);

        /**
         * @member {String} SW.Sprite.prototype._image
         * @private
         */
        this._image = null;

        /**
         * @member {SW.Vector} SW.Sprite.prototype._srcPosition
         * @private
         */
        this._srcPosition = new SW.Vector();
        
        /**
         * @member {SW.Vector} SW.Sprite.prototype._srcSize
         * @private
         */
        this._srcDimensions = new SW.Vector();

        /**
         * @member {String} SW.Sprite.prototype._displayType
         * @private
         * @readonly
         */
        this._displayType = 'sprite';
    };

    Sprite.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Sprite.prototype.getSrcPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getSrcPosition = function(x, y) {
        return this._srcPosition;
    };

    /**
     * @method SW.Sprite.prototype.setSrcPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setSrcPosition = function(x, y) {
        if (typeof x === 'number') {
            this._srcPosition.x = x;
        }

        if (typeof y === 'number') {
            this._srcPosition.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getSrcDimensions
     * @return {SW.Vector}
     */
    Sprite.prototype.getSrcDimensions = function(x, y) {
        return this._srcDimensions;
    };

    /**
     * @method SW.Sprite.prototype.setSrcDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setSrcDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._srcDimensions.x = x;
        }

        if (typeof y === 'number') {
            this._srcDimensions.y = y;
        }

        return this;
    };

    /**
     * set image property; if not already set, sets dimension/srcDimensions to image size
     *
     * @method SW.Sprite.prototype.setImage
     * @param {HTMLEntity} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setImage = function(value) {
        if (typeof value === 'object') {
            this._image = value;

            if (!this._srcDimensions.x && !this._srcDimensions.y) {
                this._srcDimensions.x = this._image.width;
                this._srcDimensions.y = this._image.height;
            }

            if (!this._dimensions.x && !this._dimensions.y) {
                this._dimensions.x = this._image.width;
                this._dimensions.y = this._image.height;
            }
        }

        return this;
    };

    return Sprite;
}());
SW.Text = (function() {
    'use strict';

    /**
     * a text display entity
     *
     * @class SW.Text
     * @param {Object} [options]
     * @param {Text} options.contents - the literal text
     * @belongsto SW
     */
    var Text = function(options) {
        SW.Renderable.call(this, options);

        options = options || {};

        /**
         * the literal text
         *
         * @member {String} SW.Text.prototype._contents
         * @private
         */
        this._contents = options.contents || '';

        /**
         * the text font
         *
         * @member {String} SW.Text.prototype._font
         * @default '12px sans-serif'
         * @private
         */
        this._font = '12px sans-serif';

        /**
         * the text's alignment
         *
         * @member {String} SW.Text.prototype._align
         * @default 'start'
         * @private
         */
        this._align = 'start';

        /**
         * the text's baseline
         *
         * @member {String} SW.Text.prototype._baseline
         * @default 'top'
         * @private
         */
        this._baseline = 'top';

        /**
         * @member {String} SW.Text.prototype._displayType
         * @private
         */
        this._displayType = 'text';

        /**
         * @member {String} SW.Text.prototype._maxWidth
         * @default
         * @private
         */
        this._maxWidth = null;
    };

    Text.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Text.prototype.getMaxWidth
     * @return {Integer}
     */
    Text.prototype.getMaxWidth = function() {
        return this._maxWidth;
    };

    /**
     * @method SW.Text.prototype.SetMaxWidth
     * @param {Integer} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.SetMaxWidth = function(value) {
        this._maxWidth = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getContents
     * @return {String}
     * @chainable
     */
    Text.prototype.getContents = function() {
        return this._contents;
    };

    /**
     * @method SW.Text.prototype.setContents
     * @param {String} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.setContents = function(value) {
        this._contents = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getFont
     * @return {String}
     */
    Text.prototype.getFont = function() {
        return this._font;
    };

    /**
     * @method SW.Text.prototype.setFont
     * @param {String} value
     * @return {String}
     */
    Text.prototype.setFont = function(value) {
        this._font = value;
    };

    /**
     * @method SW.Text.prototype.getBaseline
     * @return {String}
     */
    Text.prototype.getBaseline = function(value) {
        return this._baseline;
    };

    /**
     * @method SW.Text.prototype.setBaseline
     * @param {String} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.setBaseline = function(value) {
        this._baseline = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getAlign
     * @return {String}
     */
    Text.prototype.getAlign = function() {
        return this._align;
    };

    /**
     * @method SW.Text.prototype.setAlign
     * @return {String}
     */
    Text.prototype.setAlign = function(value) {
        this._align = value;
    };

    return Text;
}());
SW.Scene = (function() {
    'use strict';

    /**
     * manages layers and their entities
     *
     * @class SW.Scene
     * @param {Object} [options]
     * @param {Object} options.assets - a hash of names and src paths for images and audio files
     * @listens SW.Signal#press
     * @listens SW.Signal#dblpress
     * @listens SW.Signal#pressdown
     * @listens SW.Signal#pressup
     * @listens SW.Signal#dragstart
     * @listens SW.Signal#drag
     * @listens SW.Signal#dragend
     * @requires SW.Collection
     * @belongsto SW
     */
    var Scene = function(options) {
        options = options || {};

        /**
         * @member {SW.Collection} SW.Scene.prototype._layers
         * @private
         */
        this._layers = new SW.Collection();

        /**
         * @member {String} SW.Scene.prototype._bgColor
         * @private
         */
        this._bgColor = options.bgColor || '#ddd';

        /**
         * @member {String} SW.Scene.prototype._assets
         * @private
         */
        this._assets = options.assets;
    };

    /**
     * @method SW.Scene.prototype.getBgColor
     */
    Scene.prototype.getBgColor = function(value) {
        return this._bgColor;
    };

    /**
     * @method SW.Scene.prototype.setBgColor
     */
    Scene.prototype.setBgColor = function(value) {
        this._bgColor = value;

        return this;
    };

    /**
     * @method SW.Scene.prototype.getLayers
     * @return {SW.Collection}
     */
    Scene.prototype.getLayers = function() {
        return this._layers;
    };

    /**
     * gets assets
     *
     * @method SW.Scene.prototype.getAssets
     * @return {Array}
     */
    Scene.prototype.getAssets = function() {
        return this._assets;
    };

    /**
     * sets assets
     *
     * @method SW.Scene.prototype.setAssets
     * @param {Object} value
     * @return {SW.Scene}
     * @chainable
     */
    Scene.prototype.setAssets = function(value) {
        this._assets = value;

        return this;
    };

    /**
     * initialization method; for all setup work related to this scene; called when scene is first added to {@link SW.SceneManager}
     *
     * @method SW.Scene.prototype.init
     */
    Scene.prototype.init = function() {};

    /**
     * called on every frame; for updating all entity properties
     *
     * @method SW.Scene.prototype.update
     */
    Scene.prototype.update = function() {};

    /**
     * called when a scene is removed from {@link SW.SceneManager}; for removal of event listeners
     * @method SW.Scene.prototype.destroy
     */
    Scene.prototype.destroy = function() {};

    /**
     * the scene's press event handler
     *
     * @method SW.Scene.prototype.press
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.press = function() {};

    /**
     * the scene's dblpress event handler
     *
     * @method SW.Scene.prototype.dblpress
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dblpress = function() {};

    /**
     * the scene's pressdown event handler
     *
     * @method SW.Scene.prototype.pressdown
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.pressdown = function() {};

    /**
     * the scene's pressup event handler
     *
     * @method SW.Scene.prototype.pressup
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.pressup = function() {};

    /**
     * the scene's dragstart event handler
     *
     * @method SW.Scene.prototype.dragstart
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dragstart = function() {};

    /**
     * the scene's drag event handler
     *
     * @method SW.Scene.prototype.drag
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.drag = function() {};

    /**
     * the scene's dragend event handler
     *
     * @method SW.Scene.prototype.dragend
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dragend = function() {};

    return Scene;
}());
SW.SceneManager = (function() {
    'use strict';

    /**
     * manages scenes
     *
     * @class SW.SceneManager
     * @requires SW.Util
     * @requires SW.MediaManager
     * @listens SW.Signal#preload/complete
     * @belongsto SW
     * @extends SW.Layers
     * @singleton
     */
    var SceneManager = function() {
        var eventType;

        this._scenes = new SW.Collection();

        /**
         * name of the scene currently being loaded
         *
         * @member SW.SceneManager.prototype._loadingName
         * @private
         */
        this._loadingName = null;

        /**
         * the scene currently being loaded
         *
         * @member SW.SceneManager.prototype._loadingScene
         * @private
         */
        this._loadingScene = null;

        /**
         * the SW input event types
         *
         * @member SW.SceneManager.prototype._eventTypes
         * @private
         */
        this._eventTypes = ['press', 'dblpress', 'pressdown', 'pressup', 'dragstart', 'drag', 'dragend'];

        // bind input events
        for(var i = 0, len = this._eventTypes.length; i < len; i += 1) {
            eventType = this._eventTypes[i];
            SW.Signal.addListener(eventType, this._handleEvents, this);
        }

        SW.Signal.addListener('preload/complete', this._onPreloadComplete, this);
    };

    /**
     * SW input event handler to dispatch to current scene (with SW event data as event param)
     *
     * @method SW.SceneManager.prototype._handleEvents
     * @param {DOMEvent} event
     * @private
     */
    SceneManager.prototype._handleEvents = function(e) {
        var swEvent = e.detail;
        var activeScene = this.getActiveScene();

        activeScene[swEvent.type](swEvent);
    };

    /**
     * preloads scene's assets (if any), adds scene to stack, calls scene's init()
     *
     * @method SW.SceneManager.prototype.addScene
     * @param {String} name
     * @param {SW.Scene} Scene
     */
    SceneManager.prototype.addScene = function(name, Scene) {
        var scene = new Scene();
        var assets = scene.getAssets();

        this._loadingName = name;
        this._loadingScene = scene;

        if (SW.Util.hasMembers(assets)) {
            SW.MediaManager.preload(assets);
        } else {
            this._onPreloadComplete();
        }
    };

    /**
     * gets the active scene
     *
     * @method SW.SceneManager.prototype.getActiveScene
     * @return {SW.Scene}
     */
    SceneManager.prototype.getActiveScene = function() {
        var lastIndex = this._scenes.getItemCount() - 1;

        return this._scenes.getItemAt(lastIndex);
    };

    /**
     * sets the active scene
     *
     * @method SW.SceneManager.prototype.setActiveScene
     * @param {String} name
     * @fires SW.Signal#scene/activated
     * @return {SW.SceneManager}
     * @private
     * @chainable
     */
    SceneManager.prototype.setActiveScene = function(name) {
        var lastIndex = this._scenes.getItemCount() - 1;

        this._scenes.setItemIndex(name, lastIndex);

        /**
         * @event SW.Signal#scene/activated
         */
        SW.Signal.dispatch('scene/activated', {
            scene: this._scenes.getItemAt(lastIndex)
        });

        return this;
    };

    /**
     * finishes adding scene after preload
     *
     * @method SW.SceneManager.prototype._onPreloadComplete
     * @fires SW.Signal#scene/activated
     * @private
     */
    SceneManager.prototype._onPreloadComplete = function() {
        var eventType;

        this._scenes.addItem(this._loadingName, this._loadingScene);

        this._loadingScene.init();

        SW.Signal.dispatch('scene/activated', {
            scene: this._loadingScene
        });

        // remove references for GC (in case no more scenes added and this scene removed)
        this._loadingName = null;
        this._loadingScene = null;
    };

    return new SceneManager();
}());