/**
 * CustomEvent polyfill
 */
CustomEvent = window.CustomEvent ||
function( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
};
CustomEvent.prototype = window.Event.prototype;

/**
 * Bind polyfill
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

(function() {
'use strict';

/** private */
var _compliant = 'addEventListener' in window,
    _mediator = document.createElement('div'),
    _body = document.getElementsByTagName('body')[0],
    _handlerManager = {};

_mediator.id = 'radio-mediator';
_body.appendChild(_mediator);

/**
 *
 */
function _tuneIn(el, type, handler) {
    if (_compliant) {
        el.addEventListener(type, handler, false);
    } else {
        el.attachEvent(type, handler);
    }
}

/**
 *
 */
function _tuneOut(el, type, handler) {
    if (_compliant) {
        el.removeEventListener(type, handler, false);
    } else {
        el.detachEvent(type, handler);
    }
}

/**
 *
 */
function _broadcast(el, type, data) {
    var windowType,
        customEvent;

        if (_compliant) {
            customEvent = new CustomEvent(type, {
                detail : data
            });
            el.dispatchEvent(customEvent);
        } else {
            windowType = 'on' + type;
            el.fireEvent(windowType);
        }
}

/**
 *
 */
function _getEl(selector) {
    var el;

    if (/^\..+$/.test(selector)) {
        el = document.getElementsByClassName(selector.split('.')[1]);
    } else if (/^\#.+$/.test(selector)) {
        el = document.getElementById(selector.split('#')[1]);
    } else if (selector === 'window') {
        el = window;
    } else if (selector === 'document') {
        el = document;
    } else {
        el = document.getElementsByTagName(selector);
    }

    return el;
}

/** public */
var radio = {
    // when using @context, assign return value to original handler to make it scope-bound
    tuneIn: function(el, type, handler, context) {
        var handlers;
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        if (context) {
            if (!_handlerManager[type]) {
                _handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            _handlerManager[type].push(handlers);
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _tuneIn(el[i], type, handlers ? handlers.boundHandler : handler);
            }    
        } else {
            _tuneIn(el, type, handlers ? handlers.boundHandler : handler);
        }
    },

    tuneOut: function(el, type, handler) {
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) === 'function') {
            handler = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (_handlerManager[type]) {
            for (var i = 0; i < _handlerManager[type].length; i += 1) {
                if (handler === _handlerManager[type][i].handler) {
                    handler = _handlerManager[type][i].boundHandler;
                    _handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _tuneOut(el[i], type, handler);
            }    
        } else {
            _tuneOut(el, type, handler);
        }
    },

    broadcast: function(el, type, data) {
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) !== 'string') {
            data = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _broadcast(el[i], type, data);
            }    
        } else {
            _broadcast(el, type, data);
        }
    },

    destroy: function() {
        // remove mediator el, ?
    }
};

try {
    module.exports = radio;
} catch(e) {
    try {
        define([], radio);
    } catch(e) {
        window.radio = radio;
    }
}

}());

var Protos = (function() {
    var uidCounter = 0;

    // deep copy an object
    function clone(src) {
        // check for arrays too!
        var obj = (src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    }

    var Protos = function(members, alpha) {
        var prop;
        var Beta = function(options, extending) {
            var prop;

            for(prop in this) {
                if (typeof this[prop] === 'object' && this[prop] !== null) {
                    this[prop] = clone(this[prop]);
                }
            }

            for(prop in options) {
                if (this[prop] !== undefined) {
                    this[prop] = options[prop];
                }
            }

            this.uid = uidCounter++;

            if (this.init && !extending) {
                this.init(options);
            }
        };

        for(prop in members) {
            if (typeof members[prop] === 'object' && members[prop] !== null) {
                alpha[prop] = clone(members[prop]);
            } else {
                alpha[prop] = members[prop];
            }
        }

        Beta.prototype = alpha;

        Beta.extend = function(members) {
            return Protos(members, new this(null, true));
        };

        return Beta;
    };

    return Protos();
}());
var SW = {};
SW.Collection = Protos.extend({
    items: {},
    sortedItems: [],

    add: function(name, value) {
        this.items[name] = value;
        this.sortedItems.push(value);
    },

    remove: function(name) {
        var item = this.items[name];

        this.sortedEach(function(iterItem, i) {
            if (item === iterItem) {
                iterItem = null;
                this.sortedItems.splice(i, 1);

                this.items[name] = null;
                delete this.items[name];

                return true;
            }
        });
    },

    sortedEach: function(fn) {
        for(var i = 0, len = this.sortedItems.length; i < len; i += 1) {
            fn(this.sortedItems[i], i, this.sortedItems);
        }
    },

    each: function(fn) {
        for(var prop in this.items) {
            fn(this.items[prop], prop, this.items);
        }
    },

    filter: function(fn) {
        var filteredItems = [];
        var filteredItem;

        this.sortedEach(function(item, i, items) {
            filteredItem = fn(item, i, items);
            if (filteredItem) {
                filteredItems.push(filteredItem);
            }
        });

        return filteredItems;
    },

    getCount: function() {
        return this.sortedItems.length;
    },

    set: function(name, value) {
        this.items[name] = value;
    },

    get: function(name) {
        return this.items[name];
    }
});
SW.Renderable = Protos.extend({
    x: 0,

    y: 0,

    width: null,

    height: null,

    scaleX: 1,

    scaleY: 1,

    rotationOffsetX: 0,

    rotationOffsetY: 0,

    scaleOffsetX: 0,

    scaleOffsetY: 0,

    rotation: 0,

    opacity: 1,

    composite: 'source-over',

    getRight: function() {
        return this.x + this.width;
    },

    getBottom: function() {
        return this.y + this.height;
    },

    getCenterX: function() {
        return this.x + this.halfWidth();
    },

    getCenterY: function() {
        return this.y + this.halfHeight();
    },

    getHalfWidth: function() {
        return this.width / 2;
    },

    getHalfHeight: function() {
        return this.height / 2;
    }
});
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
        // this event gets tuned out by FSM
        radio.tuneIn('inputreceived', this._onInputReceived, this);
    },

    /**
     * @method State.prototype._onInputReceived
     * @private
     */
    _onInputReceived: function(e) {
        var factor = 100 / SW.Input._getScaleFactor() / 100;
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
    },

    /**
     * @method State.prototype._getTarget
     * @private
     */
    _getTarget: function(e) {
        var topmostEntity;

        this.sortedEach(function(group) {
            group.sortedEach(function(entity) {
                if (SW.Collision.hitPoint(e.x, e.y, entity)) {
                    // continually assign higher sorted entity
                    topmostEntity = entity;
                }
            });
        });

        return topmostEntity;
    },

    setup: function() {},

    update: function() {},

    destroy: function() {}
});
SW.Config = {
    width: 600,
    height: 400,
    fps: 60,
    stretch: true,
    backgroundColor: '#444',
    bindMouseInput: true,
    bindTouchInput: true,
    title: 'spritewerk game'
};
SW.Dom = Protos.extend({
    
    init: function() {
        document.title = SW.Config.title;

        this._styleElements();

        if (SW.Config.stretch) {
            radio.tuneIn(window, 'resize', this._onWindowResize, this);
            // TODO is this needed?
            radio.tuneIn(window, 'orientationchange', this._onWindowResize, this);
        }
    },

    /**
     * @method Dom._onWindowResize
     * @private
     */
    _onWindowResize: function() {
        radio.broadcast('screenresize');
    },

    /**
     * @method Dom._styleElements
     * @private
     */
    _styleElements: function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = SW.Config.backgroundColor;
        body.style.margin = 0;
        body.style.padding = 0;
    }
});
SW.Canvas = Protos.extend({
    canvas: null,
    width: null,
    height: null,

    init: function() {
        this.canvas = document.getElementById('spritewerk');
        this.width = SW.Config.width;
        this.height = SW.Config.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.canvas.style.position = 'absolute';

        if (SW.Config.stretch) {
            radio.tuneIn('screenresize', this._onScreenResize, this);
            this._onScreenResize();
        }
    },

    /**
     * @method Canvas._onScreenResize
     * @private
     */
    _onScreenResize: function() {
        var LANDSCAPE_RATIO = SW.Config.height / SW.Config.width;
        var PORTRAIT_RATIO  = SW.Config.width / SW.Config.height;
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

        this.canvas.style.width  = Math.round(canW) + 'px';
        this.canvas.style.height = Math.round(canH) + 'px';
        this.canvas.style.left   = Math.round(left) + 'px';
        this.canvas.style.top    = Math.round(top)  + 'px';

        // we use a timeout here because some mobile browsers
        // don't fire if there is not a short delay
        //setTimeout(function() {
            //window.scrollTo(0,1);
        //}, 1);
    },

    /**
     * @method Canvas.getCanvas
     */
    getCanvas: function() {
        return this.canvas;
    }
});
SW.Input = Protos.extend({
    canvas: null,

    init: function() {
        this.canvas = SW.Canvas.getCanvas();

        if (SW.Config.bindMouseInput) {
            radio.tuneIn(this.canvas, 'click',     this._receiveEvent);
            radio.tuneIn(this.canvas, 'dblclick',  this._receiveEvent);
            radio.tuneIn(this.canvas, 'mousedown', this._receiveEvent);
            radio.tuneIn(this.canvas, 'mouseup',   this._receiveEvent);
        }

        if (SW.Config.bindTouchInput) {
            radio.tuneIn(this.canvas, 'tap',        this._receiveEvent);
            radio.tuneIn(this.canvas, 'dbltap',     this._receiveEvent);
            radio.tuneIn(this.canvas, 'touchstart', this._receiveEvent);
            radio.tuneIn(this.canvas, 'touchend',   this._receiveEvent);
        }
    },

    /**
     * @method Input._getScaleFactor
     * @protected
     */
    _getScaleFactor: function() {
        var factor = 1;
        var canvasCssWidth;

        if (this.canvas.style.width) {
            canvasCssWidth = parseInt(this.canvas.style.width, 10);
            factor = canvasCssWidth / this.canvas.width;
        }

        return factor;
    },

    /**
     * handle dom events
     *
     * @method Input._receiveEvent
     * @private
     */
    _receiveEvent: function(e) {
        radio.broadcast('inputreceived', {
            inputEvent: e
        });
    }
});
SW.Draw = Protos.extend({
    canvas: null,
    context: null,

    init: function() {
        this.canvas = SW.Canvas.getCanvas();
        this.context = this.canvas.getContext('2d');
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        return this;
    },

    fill: function(color) {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();

        return this;
    },

    render: function(entity) {
        // remember: context transforms are cumulative :)
        this.context.save();
        this.context.translate(entity.x, entity.y);

        if (entity.rotation !== 0) {
            this.context.translate(entity.rotationOffsetX, entity.rotationOffsetY);
            this.context.rotate((Math.PI / 180) * entity.rotation);
            this.context.translate(-entity.rotationOffsetX, -entity.rotationOffsetY);
        }

        if (entity.scaleX !== 1 || entity.scaleY !== 1) {
            this.context.translate(entity.scaleOffsetX, entity.scaleOffsetY);
            this.context.scale(entity.scaleX, entity.scaleY);
            this.context.translate(-entity.scaleOffsetX, -entity.scaleOffsetY);
        }

        this.context.globalAlpha = entity.opacity;
        this.context.globalCompositeOperation = entity.composite;

        switch(entity.displayType) {
            case 'rectangle':
                this._renderRectangle(entity);
            break;
            case 'sprite':
                this._renderSprite(entity);
            break;
        }

        this.context.restore();
    },

    /**
     * @method Draw._renderRectangle
     * @private
     */
    _renderRectangle: function(entity) {
        this.context.fillStyle = entity.fill;
        this.context.fillRect(0, 0, entity.width, entity.height);
    },

    /**
     * @method Draw._renderSprite
     * @private
     */
    _renderSprite: function(entity) {
        this.context.drawImage(
            entity.img,
            entity.srcX,
            entity.srcY,
            entity.srcWidth,
            entity.srcHeight,
            0, 0,
            entity.width,
            entity.height
        );
    }
});
SW.FSM = SW.Collection.extend({
    beingLoaded: {
        name: null,
        data: null
    },

    init: function() {
        this.add('loading', SW.Loading);

        radio.tuneIn('preloadcomplete', this._onPreloadComplete, this);
    },

    add: function(name, State) {
        if (this.get('loading')) {
            this.setActive('loading');
        }

        this.beingLoaded.name = name;
        this.beingLoaded.state = new State();

        if (this.beingLoaded.state.data.assets) {
            new SW.Preloader({
                assets: this.beingLoaded.state.data.assets
            });
        } else {
            this._onPreloadComplete();
        }
    },

    remove: function(name) {
        var state = this.get(name);

        radio.tuneOut('inputreceived', state._onInputReceived);
        SW.Collection.prototype.remove.call(this, name);
    },

    /**
     * @method FSM._onPreloadComplete
     * @private
     */
    _onPreloadComplete: function() {
        var state = this.beingLoaded.state;
        var data = state.data;
        var group;
        var entity;
        var entityData;
        var entityName;

        state.config = data.config;

        for(var g = 0, gLen = data.groups.length; g < gLen; g += 1) {
            group = data.groups[g];
            state.add(group.name, new SW.Collection());

            for(var e = 0, eLen = group.entities.length; e < eLen; e += 1) {
                entityData = group.entities[e];

                if (entityData.config.imageName) {
                    entityData.config.img = SW.MediaManager.images[entityData.config.imageName];
                }

                entity = new entityData.type(entityData.config);
                entityName = entityData.name ? entityData.name : entity.displayType + entity._uid;

                state.get(group.name).add(entityName, entity);
            }
        }

        state.data = null;
        delete state.data;

        state.setup();

        SW.Collection.prototype.add.call(this, this.beingLoaded.name, state);

        this.setActive(this.beingLoaded.name);
    },

    getActive: function() {
        return this.sortedItems[this.getCount() - 1];
    },

    setActive: function(name) {
        var state = this.get(name);

        if (!state) {
            return false;
        }

        if (this.getCount() === 1) {
            state.active = true;
            state.visible = true;
            return false;
        }

        this.sortedEach(function(item, i, list) {
            if (state === item) {
                item.active = true;
                item.visible = true;

                if (i < list.length - 1) {
                    this.sortedItems.splice(i, 1);
                    this.sortedItems.push(item);
                }
            } else {
                item.active = false;
                item.visible = false;
            }
        });
    }
});
SW.Game = Protos.extend({
    frame: 0,

    start: function(name, state) {
        if (name && state) {
            SW.FSM.add(name, state);
        }

        this.scopedUpdate = this._update.bind(this);

        this._update();
    },

    _update: function() {
        SW.FSM.sortedEach(function(state) {
            SW.Draw.clear();

            if (state.active) {
                state.update();
            }

            if (state.visible) {
                SW.Draw.clear().fill(state.config.bgColor);

                state.sortedEach(function(group) {
                    group.sortedEach(function(entity) {
                        SW.Draw.render(entity);
                    });
                });
            }
        });

        radio.broadcast('newframe', {
            detail: {
                frame: ++this.frame
            }
        });

        requestAnimationFrame(this.scopedUpdate);
    }
});
SW.MediaManager = Protos.extend({
    images: {},

    sounds: {},

    addImage: function(name, img) {
        this.images[name] = img;
    },

    addSound: function(name, snd) {
        this.sounds[name] = snd;
    },

    play: function(name) {
        var sound = this.sounds[name];
        
        sound.currentTime = 0;
        sound.play();
    },

    pause: function(name) {
        var sound = this.sounds[name];

        sound.pause();
    },

    resume: function() {
        var sound = this.sounds[name];

        sound.play();
    },

    pauseAll: function() {
        for(var sound in this.sounds) {
            this.sounds[sound].pause();
        }
    }
});
SW.Preloader = Protos.extend({
    assets: null,

    total: 0,

    loaded: 0,

    /**
     * @params {object} options
     * @params {array}  options.assets - array of url paths
     */
    init : function(options) {
        var prop;

        this.assets = options.assets;

        for(prop in this.assets) {
            this.total += 1;
        }

        for (prop in this.assets) {
            if (this.assets[prop].indexOf('.png') > 0 || this.assets[prop].indexOf('.jpg') > 0) {
                var img = new Image();
                img.src = this.assets[prop];

                radio.tuneIn(img, 'load',  this.loadHandler, this);
                radio.tuneIn(img, 'error', this.error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                radio.tuneIn(audio, 'canplaythrough', this.loadHandler, this);
                radio.tuneIn(audio, 'error', this.error, this);
            }
        }
    },

    tuneOutCurrent: function(el) {
        var type = el.tagName.toLowerCase();
        var name;

        if (type == 'img') {
            radio.tuneOut(el, 'load',  this.loadHandler);
            radio.tuneOut(el, 'error', this.error);

            if (SW.MediaManager) {
                for(name in this.assets) {
                    if (this.getFileName(this.assets[name]) === this.getFileName(el.src)) {
                        SW.MediaManager.addImage(name, el);
                    }
                }
            }
        } else if (type == 'audio') {
            radio.tuneOut(el, 'canplaythrough', this.loadHandler);
            radio.tuneOut(el, 'error', this.error);

            if (SW.MediaManager) {
                for(name in this.assets) {
                    if (this.getFileName(this.assets[name]) === this.getFileName(el.src)) {
                        SW.MediaManager.addSound(name, el);
                    }
                }
            }
        }
    },

    loadHandler: function(e) {
        this.tuneOutCurrent(e.currentTarget);

        this.loaded += 1;

        if (this.loaded === this.total) {
            radio.broadcast('preloadcomplete');
        } else {
            radio.broadcast('preloadupdate', {
                detail: {
                    loaded: this.loaded,
                    total : this.total
                }
            });
        }
    },

    error: function(e) {
        console.log(e.status);
    },

    getFileName: function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    }
});
SW.Rectangle = SW.Renderable.extend({
    fill: '#000',

    displayType: 'rectangle'
});
SW.Sprite = SW.Renderable.extend({
    img: null,
    imageName: null,
    srcX: 0,
    srcY: 0,
    srcWidth: null,
    srcHeight: null,
    displayType: 'sprite',

    init: function() {
        if (this.img) {
            this.setImage();
        }
    },

    setImage: function(img) {
        this.img = img || this.img;

        if (!this.srcWidth && !this.srcHeight) {
            this.srcWidth = this.img.width;
            this.srcHeight = this.img.height;
        }

        if (!this.width && !this.height) {
            this.width = this.img.width;
            this.height = this.img.height;
        }
    }
});
(function() {
'use strict';

var wh = 24;
var x = SW.Config.width / 2 - 12;
var y = SW.Config.height / 2 - 24;
var rotOffX = 12;
var rotOffY = 36;

SW.Loading = SW.State.extend({
    data: {
        config: {
            bgColor: '#000'
        },

        groups: [{
            name: 'main',
            entities: [{
                name: 'spinnerA',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    width: wh,
                    height: wh,
                    fill: '#CC3'
                }
            }, {
                name: 'spinnerB',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 120,
                    width: wh,
                    height: wh,
                    fill: '#C3C'
                }
            }, {
                name: 'spinnerC',
                type: SW.Rectangle,
                config: {
                    x: x,
                    y: y,
                    rotationOffsetX: rotOffX,
                    rotationOffsetY: rotOffY,
                    rotation: 240,
                    width: wh,
                    height: wh,
                    fill: '#3CC'
                }
            }]
        }]
    },

    setup: function() {
        this.spinnerA = this.get('main').get('spinnerA');
        this.spinnerB = this.get('main').get('spinnerB');
        this.spinnerC = this.get('main').get('spinnerC');
    },

    update: function() {
        this.spinnerA.rotation += 4;
        this.spinnerB.rotation += 4;
        this.spinnerC.rotation += 4;
    }
});

}());
(function() {
    'use strict';

    function init() {
        radio.tuneOut(window, 'load', init);

        SW.MediaManager = new SW.MediaManager();
        SW.Dom = new SW.Dom();
        SW.Canvas = new SW.Canvas();
        SW.Draw = new SW.Draw();
        SW.Input = new SW.Input();
        SW.FSM = new SW.FSM();
        SW.Game = new SW.Game();

        radio.broadcast('spritewerkready');
    }

    radio.tuneIn(window, 'load', init);
}());