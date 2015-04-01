SW.Emitter = (function() {

    var defaults = {
        type: 'rectangle',
        fillStyle: '#aaa',
        amount: 100,
        lifeTime: 5000,
        customUpdate: function() {}
    };

    var Emitter = function(options) {
        var SpriteType;

        SW.Renderable.call(this, options);

        /**
         * @member {} SW.Emitter.prototype._amount - amount of particles 
         */
        this._amount = options.amount || defaults.amount;

        /**
         * @member {String} SW.Emitter.prototype._type - the sprite type
         */
        this._type = options.type || 'rectangle';

        /**
         * @member {String} SW.Emitter.prototype._fillStyle
         */
        this._fillStyle = options.fillStyle || '#aaa';

        /**
         * @member {Function} SW.Emitter.prototype._customUpdate
         */
        this._customUpdate = options.customUpdate || defaults.customUpdate;

        /**
         * @member {Integer} SW.Emitter.prototype._lifeTime - max frames particles live
         */
        this._lifeTime = options.lifeTime || defaults.lifeTime;

        /**
         * @member {HTMLElement} SW.Emitter.prototype._image - f type is bitmap
         */
        this._image = options.image;

        /**
         * @member {Integer} SW.Emitter.prototype._time
         */
        this._time = 0;

        /**
         * @member {SW.Collection} SW.Emitter.prototype._fields
         */
        this._fields = new SW.Collection();

        /**
         * @member {SW.Collection} SW.Emitter.prototype._particles
         */
        this._particles = new SW.Collection();

        /**
         * @member {String} SW.Emitter.prototype._displayType
         */
        this._displayType = 'emitter';

        /**
         * @member {Object} SW.Emitter.prototype._jitter
         */
        this._jitter = {
            dimensions: 0,
            size: 0
        };

        for(var key in options.jitter) {
            this._jitter[key] = options.jitter[key];
        }

        switch(this._type) {
            case 'rectangle':
                SpriteType = SW.Rectangle;
            break;
            case 'polygon':
                SpriteType = SW.Polygon;
            break;
            case 'line':
                SpriteType = SW.Line;
            break;
            case 'text':
                SpriteType = SW.Text;
            break;
            case 'bitmap':
                SpriteType = SW.Bitmap;
            break;
        }

        for(var i = 0, len = this._amount; i < len; i++) {
            var sprite = new SpriteType()
                .position(
                    this._position.x + ( (Math.random() * 2 - 1) * this._jitter.position ),
                    this._position.y + ( (Math.random() * 2 - 1) * this._jitter.position )
                )
                .dimensions(
                    this._dimensions.x + ( (Math.random() * 2 - 1) * this._jitter.dimensions ),
                    this._dimensions.y + ( (Math.random() * 2 - 1) * this._jitter.dimensions )
                );

            if (this._type === 'bitmap' && this._image) {
                sprite.setImage(this._image);
            }

            this._particles.addItem('p' + i, sprite);
        };

        Signal.addListener('update', this._update, this);
    };

    Emitter.prototype._update = function() {
        this._particles.each(function(particle) {
            this._fields.each(function(field) {

            });

            this._customUpdate.call(this, particle, this._time);
        });

        this._time += 1;
    };

    return Emitter;
}());