SW.State = SW.Collection.extend({
    _canvas: null,

    _active: true,

    _visible: true,

    /**
     * @member {boolean} State.prototype.config
     * @default false
     */
    config: {
        /**
         * @member {boolean} State.prototype.config.scroll
         * @default false
         */
        canScroll: false,

        /**
         * (aquired via data object) the largest entity object which is used in determining scrolling
         *
         * @member State.prototype.config.scrollRegions
         */ 
        scrollRegions: null,

        bgColor: null
    },

    /**
     * instance of the {@link SW.Camera} object
     * @member {SW.Camera} State.prototype.camera
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
     * @member {array} State.prototype.walls
     */
    walls: null,

    /**
     * the target from a mousedown/touchstart event; used for click/tap replication
     *
     * @member State.prototype.pressCandidate
     * @private
     */
    pressCandidate: null,

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

    /**
     * @method State.prototype.setup
     */
    setup: function() {},

    /**
     * @method State.prototype.update
     */
    update: function() {
        var overlap;
        var wallInd;
        var wallLen;

        if (this.config.bgColor) {
            SW.Draw.fill(this.config.bgColor);
        }

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

                if (entity.follow && this.canScroll && this.boundingBox && this.scrollRegions) {
                    this.camera._scroll(entity, this.boundingBox, this.scrollRegions);
                }

                if (!group.isHUD) {
                    if (!this.camera.fixed && (this.camera.vx !== 0 || this.camera.vy !== 0)) {
                        entity.x -= this.camera.vx * group.scrollDepth;
                        entity.y -= this.camera.vy * group.scrollDepth;
                    }

                    if (entity.right()  <= 0 || entity.x >= SW.Config.width ||
                        entity.bottom() <= 0 || entity.y >= SW.Config.height) {
                        entity.visible = false;
                    } else {
                        entity.visible = true;
                    }
                }

                if (entity.visible) {
                    if (entity.blockable && this.walls) {
                        for (wallInd = 0, wallLen = this.walls.length; wallInd < wallLen; wallInd += 1) {
                            overlap = SW.Collision.block(entity, this.walls[wallInd]);

                            if (overlap) {
                                entity.x += overlap.x;
                                entity.y += overlap.y;
                            }
                        }
                    }

                    if (entity.containable) {
                        this.camera._contain(entity);
                    }
                }
            });
        });
    },

    render: function() {
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
        if (!this.active) {
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