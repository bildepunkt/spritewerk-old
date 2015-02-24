/**
 * The base state class to extend from
 *
 * @class SW.State
 * @extends SW.Collection
 * @belongsto SW
 */
SW.State = SW.Collection.extend({
    _canvas: null,

    _active: true,

    _visible: true,

    /**
     * object aquired via state's data object
     * @member {object} SW.State.prototype.config
     */
    config: {
        /**
         * @member {boolean} SW.State.prototype.config.scroll
         * @default false
         */
        canScroll: false,

        /**
         * the largest entity object which is used in determining scrolling
         * @member {object} SW.State.prototype.config.scrollRegions
         */ 
        scrollRegions: null,

        /**
         * the background color of the state; accepts hex, HSL(A)
         * @member {string} SW.State.prototype.config.bgColor
         */ 
        bgColor: null
    },

    /**
     * instance of the {@link SW.Camera} object
     * @member {SW.Camera} SW.State.prototype.camera
     */
    camera: null,

    /**
     * the largest entity object which is used in determining scrolling
     *
     * @member SW.State.prototype.boundingBox
     */        
    boundingBox: null,

    /**
     * an array of wall objects for blocking entities
     * @member {array} SW.State.prototype.walls
     */
    walls: null,

    /**
     * the target from a mousedown/touchstart event; used for click/tap replication
     *
     * @member SW.State.prototype.pressCandidate
     * @private
     */
    pressCandidate: null,

    /**
     * @method SW.State.prototype.press
     */
    press: function() {},

    /**
     * @method SW.State.prototype.dblpress
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

    /**
     * @method State.prototype.setup
     */
    setup: function() {},

    /**
     * @method State.prototype.update
     */
    update: function() {
        var self = this;
        var overlap;
        var wallInd;
        var wallLen;

        // update wall's positions
        if (this.walls && !this.camera.fixed && (this.camera.vx !== 0 || this.camera.vy !== 0)) {
            for (wallInd = 0, wallLen = this.walls.length; wallInd < wallLen; wallInd += 1) {
                this.walls[wallInd].x -= this.camera.vx;
                this.walls[wallInd].y -= this.camera.vy;
            }
        }

        this.sortedEach(function(group) {
            group.sortedEach(function(entity) {

                entity.update();

                if (entity.follow && self.config.canScroll && self.boundingBox && self.config.scrollRegions) {
                    self.camera._scroll(entity, self.boundingBox, self.config.scrollRegions);
                }

                if (!group.isHUD) {
                    if (!self.camera.fixed && (self.camera.vx !== 0 || self.camera.vy !== 0)) {
                        entity.x -= self.camera.vx * group.scrollDepth;
                        entity.y -= self.camera.vy * group.scrollDepth;
                    }

                    if (entity.getRight()  <= 0 || entity.x >= SW.Config.width ||
                        entity.getBottom() <= 0 || entity.y >= SW.Config.height) {
                        entity.visible = false;
                    } else {
                        entity.visible = true;
                    }
                }

                if (entity.visible) {
                    if (entity.blockable && self.walls) {
                        for (wallInd = 0, wallLen = self.walls.length; wallInd < wallLen; wallInd += 1) {
                            overlap = SW.Collision.block(entity, self.walls[wallInd]);

                            if (overlap) {
                                entity.x += overlap.x;
                                entity.y += overlap.y;
                            }
                        }
                    }

                    if (entity.containable) {
                        self.camera._contain(entity);
                    }
                }
            });
        });
    },

    render: function() {
        if (this.config.bgColor) {
            SW.Draw.fill(this.config.bgColor);
        }
        
        this.sortedEach(function(group) {
            group.sortedEach(function(entity) {
                if (entity.visible && !entity.hidden) {
                    SW.Draw.render(entity);
                }
            });
        });
    },

    /**
     * @method State.prototype.destroy
     */
    destroy: function() {},

    init: function() {
        this._canvas = SW.Canvas.getCanvas();
        // this event gets tuned out by FSM
        SW.Radio.tuneIn('inputreceived', this._onInputReceived, this);
    },

    /**
     * @method State.prototype._onInputReceived
     * @private
     */
    _onInputReceived: function(e) {
        if (!this.getActive()) {
            return false;
        }

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
            evt.absX = (inputEvent.hasOwnProperty('clientX') ? inputEvent.clientX : inputEvent.screenX) - offsetX;
            evt.absY = (inputEvent.hasOwnProperty('clientY') ? inputEvent.clientY : inputEvent.screenY) - offsetY;
        }

        // coordinate positions relative to canvas scaling
        evt.x = evt.absX * factor;
        evt.y = evt.absY * factor;

        evt.target = this._getTarget(evt);

        switch(inputEvent.type) {
            case 'click':
            case 'tap':
                if (this.pressCandidate && this.pressCandidate === evt.target) {
                    this.press(evt);
                }
            break;
            case 'dblclick':
            case 'dbltap':
                this.dblpress(evt);
            break;
            case 'mousedown':
            case 'touchstart':
                this.pressCandidate = evt.target;
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

    getActive: function() {
        return this._active;
    },

    setActive: function(val) {
        if (typeof val === 'boolean') {
            this._active = val;
        }
    },

    getVisible: function() {
        return this._visible;
    },

    setVisible: function(val) {
        if (typeof val === 'boolean') {
            this._visible = val;
        }
    }
});