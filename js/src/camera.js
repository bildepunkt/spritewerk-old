/**
 * controls what is shown on the canvas
 *
 * @class SW.Camera
 * @belongsto SW
 */
SW.Camera = SW.Protos.extend({
    x: 0,

    y: 0,

    vx: 0,

    vy: 0,

    width: null,

    height: null,

    /** 
     * @member {int} SW.Camera.prototype.zoom
     */
    zoom: 1,

    /**
     * @member {boolean} SW.Camera.prototype.scrolling - use to override scrolling if other camera moves needed
     */
    scrolling: true,

    /**
     * @member {boolean} SW.Camera.prototype.locked - if the camera will not be moving at all, set fixed to avoid wasting resources updating entities or walls
     */
    fixed: false,

    init: function() {
        this.width = SW.Config.width;
        this.height = SW.Config.height;
    },

    _scroll: function(entity, boundingBox, regions) {
        if (!this.scrolling) {
            return false;
        }

        this.vx = 0;
        this.vy = 0;

        if (regions.left && entity.vx < 0 &&
            entity.x < regions.left && boundingBox.x < 0)
        {
            this.vx = entity.vx;
        }

        if (regions.right && entity.vx > 0 &&
            entity.x + entity.width > regions.right &&
            boundingBox.x > this.width - boundingBox.width)
        {
            this.vx = entity.vx;
        }

        if (regions.top && entity.vy < 0 &&
            entity.y < regions.top && boundingBox.y < 0)
        {
            this.vy = entity.vy;
        }

        if (regions.bottom && entity.vy > 0 &&
            entity.y + entity.height > regions.bottom &&
            boundingBox.y > this.height - boundingBox.height)
        {
            this.vy = entity.vy;
        }
    },

    _contain : function(entity) {
        var position = {};

        if (entity.x < 0) {
            entity.x = 0;
        } else if (entity.x + entity.width > this.width) {
            entity.x = this.width - entity.width;
        }

        if (entity.y < 0) {
            entity.y = 0;
        } else if (entity.y + entity.height > this.height) {
            entity.y = this.height - entity.height;
        }
    },

    center: function(entity) {
        entity.x = this.width  / 2 - entity.halfWidth();
        entity.y = this.height / 2 - entity.halfHeight();
    }
});