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
         * @member {String} SW.Dom.prototype._title
         * @private
         */
        this._title = options.title;

        /**
         * @member {String} SW.Dom.prototype._barsColor
         * @private
         */
        this._barsColor = options.barsColor || '#444';

        document.title = this._title || 'spritewerk game';

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

        body.style.backgroundColor = this._barsColor;
        body.style.margin = 0;
        body.style.padding = 0;
    };

    return Dom;
}());
SW.Canvas = (function() {
    'use strict';

    /**
     * control for canvas element
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
        this._canvasEl.style.userSelect = 'none'; 
        this._canvasEl.style.oUserSelect = 'none'; 
        this._canvasEl.style.mozUserSelect = 'none'; 
        this._canvasEl.style.khtmlUserSelect = 'none'; 
        this._canvasEl.style.webkitUserSelect = 'none'; 

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
     * @method SW.Canvas.prototype.getCanvasEl
     * @return {HTMLEntity}
     */
    Canvas.prototype.getCanvasEl = function() {
        return this._canvasEl;
    };

    return Canvas;
}());
SW.Draw = (function() {

    /**
     * @class SW.Draw
     * @belongsto SW
     */
    var Draw = function(options) {
        this._canvas = options.canvas;
        this._context = this._canvas.getContext('2d');
    };

    /**
     * @method SW.Draw.prototype.clearAll
     * @chainable
     */
    Draw.prototype.clearAll = function() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        return this;
    };

    /**
     * fills the entire Draw
     *
     * @method SW.Draw.prototype.fillAll
     * @param {String} color - supports color names, hex & rgb(a)
     * @chainable
     */
    Draw.prototype.fillAll = function(color) {
        this._context.save();
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.restore();

        return this;
    };

    /**
     * prepares context and decides how to render the entity
     *
     * @method SW.Draw.prototype.render
     * @param {SW.renderable} entity
     */
    Draw.prototype.render = function(entity) {
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
            case 'bitmap':
                this._renderBitmap(entity);
            break;
            case 'text':
                this._renderText(entity);
            break;
            default:
                throw new Error('SW.Draw cannot render type: ' + entity.getDisplayType());
            break;
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderRectangle
     * @private
     */
    Draw.prototype._renderRectangle = function(entity) {
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
    Draw.prototype._renderLine = function(entity) {
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
    Draw.prototype._renderPolygon = function(entity) {
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
    Draw.prototype._renderText = function(entity) {
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

    Draw.prototype._getWrappedText = function(contents, maxWidth) {
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

    Draw.prototype._getLineHeight = function(entity) {
        var factor = 1.2;
        var font = entity.getFont();
        return parseInt(font.match(/[0-9]*px|pt|em/), 10) * factor;
    };

    /**
     * @method Draw.prototype._renderBitmap
     * @private
     */
    Draw.prototype._renderBitmap = function(entity) {
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

    return Draw;
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
SW.Sprite = (function() {
    'use strict';

    /**
     * is the base prototype for all renderable entities
     *
     * @class SW.Sprite
     * @extends SW.Unique
     * @requires SW.Vector
     * @belongsto SW
     */
    var Sprite = function() {
        SW.Unique.call(this);
 
        /**
         * @member {SW.Vector} SW.Sprite.prototype._position
         * @default 0
         * @private
         */
        this._position = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._velocity
         * @default 0
         * @private
         */
        this._velocity = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._dimensions
         * @private
         */
        this._dimensions = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._scale
         * @default 1
         * @private
         */
        this._scale = new SW.Vector(1, 1);

        /**
         * @member {SW.Vector} SW.Sprite.prototype._rotationOffset
         * @default 0
         * @private
         */
        this._rotationOffset = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._scaleOffset
         * @default 0
         * @private
         */
        this._scaleOffset = new SW.Vector();

        /**
         * @member {Boolean} SW.Sprite.prototype._draggable
         * @default false
         * @private
         */
        this._draggable = false;

        /**
         * @member {Integer} SW.Sprite.prototype._rotation
         * @default 0
         * @private
         */
        this._rotation = 0;

        /**
         * @member {Integer} SW.Sprite.prototype._opacity
         * @default 1
         * @private
         */
        this._opacity = 1;

        /**
         * the entity's fill display
         *
         * @member {String} SW.Sprite.prototype._fillStyle
         * @default '#000'
         * @private
         */
        this._fillStyle = '#999';

        /**
         * the entity's stroke display
         *
         * @member {String} SW.Sprite.prototype._strokeStyle
         * @default null
         * @private
         */
        this._strokeStyle = null;

        /**
         * the entity's stroke width
         *
         * @member {String} SW.Sprite.prototype._strokeWidth
         * @default 4
         * @private
         */
        this._strokeWidth = 4;

        /**
         * @member {Boolean} SW.Sprite.prototype._visible
         * @default true
         * @private
         */
        this._visible = true;

        /**
         * @member {Boolean} SW.Sprite.prototype._hidden
         * @default false
         * @private
         */
        this._hidden = false;

        /**
         * @member {String} SW.Sprite.prototype._composite
         * @default 'source-over'
         * @private
         */
        this._composite = 'source-over';

        /**
         * @member {String} SW.Sprite.prototype._displayType
         * @default ''
         * @private
         * @readonly
         */
        this._displayType = '';
    };

    Sprite.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * @method SW.Sprite.prototype.getDisplayType
     * @return {String}
     * @chainable
     */
    Sprite.prototype.getDisplayType = function() {
        return this._displayType;
    };

    /**
     * @method SW.Sprite.prototype.getPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getPosition = function() {
        return this._position;
    };

    /**
     * @method SW.Sprite.prototype.setPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setPosition = function(x, y) {
        if (typeof x === 'number') {
            this._position.x = x;
        }

        if (typeof y === 'number') {
            this._position.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getDimensions
     * @return {SW.Vector}
     */
    Sprite.prototype.getDimensions = function() {
        return this._dimensions;
    };

    /**
     * @method SW.Sprite.prototype.setDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._dimensions.x = x;
        }

        if (typeof y === 'number') {
            this._dimensions.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getRotation
     * @return {Float}
     */
    Sprite.prototype.getRotation = function(value) {
        return this._rotation;
    };

    /**
     * @method SW.Sprite.prototype.setRotation
     * @param {Float} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setRotation = function(value) {
        this._rotation = value;
    };

    /**
     * @method SW.Sprite.prototype.getRotationOffset
     * @return {SW.Vector}
     */
    Sprite.prototype.getRotationOffset = function() {
        return this._rotationOffset;
    };

    /**
     * @method SW.Sprite.prototype.setRotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setRotationOffset = function(x, y) {
        if (typeof x === 'number') {
            this._rotationOffset.x = x;
        }

        if (typeof y === 'number') {
            this._rotationOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getScale
     * @return {SW.Vector}
     */
    Sprite.prototype.getScale = function() {
        return this._scale;
    };

    /**
     * @method SW.Sprite.prototype.setScale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector}
     * @chainable
     */
    Sprite.prototype.setScale = function(x, y) {
        if (typeof x === 'number') {
            this._scale.x = x;
        }

        if (typeof y === 'number') {
            this._scale.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getScaleOffset
     * @return {SW.Vector}
     */
    Sprite.prototype.getScaleOffset = function() {
        return this._scaleOffset;
    };

    /**
     * @method SW.Sprite.prototype.setScaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setScaleOffset = function(x, y) {
        if (typeof x === 'number') {
            this._scaleOffset.x = x;
        }

        if (typeof y === 'number') {
            this._scaleOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getDraggable
     * @return {Boolean}
     */
    Sprite.prototype.getDraggable = function() {
        return this._draggable;
    };

    /**
     * @method SW.Sprite.prototype.setDraggable
     * @param {Boolean} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setDraggable = function(value) {
        this._draggable = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getOpacity
     * @return {Float}
     */
    Sprite.prototype.getOpacity = function() {
        return this._opacity;
    };

    /**
     * @method SW.Sprite.prototype.setOpacity
     * @param {Boolean} value
     * @return {Float}
     * @chainable
     */
    Sprite.prototype.setOpacity = function(value) {
        this._opacity = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getComposite
     * @return {String}
     */
    Sprite.prototype.getComposite = function() {
        return this._composite;
    };

    /**
     * @method SW.Sprite.prototype.setComposite
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setComposite = function(value) {
        this._composite = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getFillStyle
     * @return {String}
     */
    Sprite.prototype.getFillStyle = function(value) {
        return this._fillStyle;
    };

    /**
     * @method SW.Sprite.prototype.setFillStyle
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setFillStyle = function(value) {
        this._fillStyle = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getStrokeStyle
     * @return {String}
     */
    Sprite.prototype.getStrokeStyle = function() {
        return this._strokeStyle;
    };

    /**
     * @method SW.Sprite.prototype.setStrokeStyle
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setStrokeStyle = function(value) {
        this._strokeStyle = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getStrokeWidth
     * @return {String}
     */
    Sprite.prototype.getStrokeWidth = function() {
        return this._strokeWidth;
    };

    /**
     * @method SW.Sprite.prototype.setStrokeWidth
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setStrokeWidth = function(value) {
        this._strokeWidth = value;

        return this;
    };

    /**
     * returns entity's right-most x and bottom-most y positions
     * @method SW.Sprite.prototype.getOuterPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getOuterPosition = function() {
        return new SW.Vector(this._position.x + this._dimensions.x, this._position.y + this._dimensions.y);
    };

    /**
     * returns the entity's coordinates at center
     * @method SW.Sprite.prototype.getCenterPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getCenterPosition = function() {
        return new SW.Vector(this._position.x - this._dimensions.x / 2, this._position.y - this._dimensions.y / 2);
    };

    /**
     * returns entity's half dimensions
     * @method SW.Sprite.prototype.getHalfDimension
     * @return {SW.Vector}
     */
    Sprite.prototype.getHalfDimension = function() {
        return new SW.Vector(this._dimensions.x / 2, this._dimensions.y / 2);
    };

    /**
     * @method SW.Sprite.prototype.alignToCanvas
     * @return {SW.Sprite}
     */
    /*Sprite.prototype.alignToCanvas = function(x, y) {
        if (typeof x === 'string') {
            switch(x) {
                case 'top':
                    //
                break;
                case 'center':
                    //
                break;
                case 'bottom':
                    //
                break;
            }
        }

        if (typeof y === 'string') {
            switch(y) {
                case 'top':
                    this.setPosition(null, 0);
                break;
                case 'center':
                    this.setPosition(null, 0);
                break;
                case 'bottom':
                    //
                break;
            }
        }
    };*/

    return Sprite;
}());
SW.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Rectangle
     * @extends SW.Sprite
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Sprite.call(this);

        /**
         * @member {String} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Util.clone(SW.Sprite.prototype);

    return Rectangle;
}());
SW.Line = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Line
     * @extends SW.Sprite
     * @belongsto SW
     */
    var Line = function() {
        SW.Sprite.call(this);

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

    Line.prototype = SW.Util.clone(SW.Sprite.prototype);

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
SW.Polygon = (function() {
    'use strict';

    /**
     * a line display entity
     *
     * @class SW.Polygon
     * @extends SW.Sprite
     * @belongsto SW
     */
    var Polygon = function() {
        SW.Sprite.call(this);

        /**
         * @member {Array} SW.Polygon.prototype._coordinates
         * @private
         */
        this._coordinates = [];

        /**
         * @member {String} SW.Polygon.prototype._displayType
         * @default 'polygon'
         * @private
         * @readonly
         */
        this._displayType = 'polygon';
    };

    Polygon.prototype = SW.Util.clone(SW.Sprite.prototype);

    /**
     * @method SW.Polygon.prototype.getCoordinates
     * @return {Array}
     */
    Polygon.prototype.getCoordinates = function() {
        return this._coordinates;
    };

    /**
     * @method SW.Polygon.prototype.setCoordinates
     * @param {Array} coordinates - n amount of coordinates
     * @return {SW.Polygon}
     * @chainable
     */
    Polygon.prototype.setCoordinates = function() {
        for(var i = 0, len = arguments.length; i < len; i += 1) {
            this._coordinates[i] = arguments[i];
        }

        return this;
    };

    return Polygon;
}());
SW.Bitmap = (function() {
    'use strict';

    /**
     * a image display entity
     *
     * @class SW.Bitmap
     * @extends SW.Sprite
     * @requires SW.Vector
     * @belongsto SW
     */
    var Bitmap = function() {
        SW.Sprite.call(this);

        /**
         * @member {String} SW.Bitmap.prototype._image
         * @private
         */
        this._image = null;

        /**
         * @member {SW.Vector} SW.Bitmap.prototype._srcPosition
         * @private
         */
        this._srcPosition = new SW.Vector();
        
        /**
         * @member {SW.Vector} SW.Bitmap.prototype._srcSize
         * @private
         */
        this._srcDimensions = new SW.Vector();

        /**
         * @member {String} SW.Bitmap.prototype._displayType
         * @private
         * @readonly
         */
        this._displayType = 'bitmap';
    };

    Bitmap.prototype = SW.Util.clone(SW.Sprite.prototype);

    /**
     * @method SW.Bitmap.prototype.getSrcPosition
     * @return {SW.Vector}
     */
    Bitmap.prototype.getSrcPosition = function(x, y) {
        return this._srcPosition;
    };

    /**
     * @method SW.Bitmap.prototype.setSrcPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setSrcPosition = function(x, y) {
        if (typeof x === 'number') {
            this._srcPosition.x = x;
        }

        if (typeof y === 'number') {
            this._srcPosition.y = y;
        }

        return this;
    };

    /**
     * @method SW.Bitmap.prototype.getSrcDimensions
     * @return {SW.Vector}
     */
    Bitmap.prototype.getSrcDimensions = function(x, y) {
        return this._srcDimensions;
    };

    /**
     * @method SW.Bitmap.prototype.setSrcDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setSrcDimensions = function(x, y) {
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
     * @method SW.Bitmap.prototype.setImage
     * @param {HTMLEntity} value
     * @return {SW.Bitmap}
     * @chainable
     */
    Bitmap.prototype.setImage = function(value) {
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

    return Bitmap;
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
        SW.Sprite.call(this, options);

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

    Text.prototype = SW.Util.clone(SW.Sprite.prototype);

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