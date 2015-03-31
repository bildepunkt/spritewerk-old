SW.Emitter = (function() {

    var defaults = {
        type: 'rectangle',
        fillStyle: '#aaa',
        amount: 100,
        lifeTime: 5000,
        customUpdate: function() {}
    };

    var Emitter = function(options) {
        SW.Renderable.call(this, options);

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._amount = options.amount || defaults.amount;

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._type = options.type || 'rectangle';

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._fillStyle = options.fillStyle || ;

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._customUpdate = options.customUpdate || defaults.customUpdate;

        /**
         * @member {} SW.Emitter.prototype._lifeTime - max frames particles live
         */
        this._lifeTime = options.lifeTime || defaults.lifeTime;

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._jitter = {
            dimensions: 0,
            size: 0
        };

        for(var key in options.jitter) {
            this._jitter[key] = options.jitter[key];
        }

        /**
         * @member {} SW.Emitter.prototype.
         */
        this.time = 0;

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._fields = new SW.Collection();

        /**
         * @member {} SW.Emitter.prototype.
         */
        this._particles = new SW.Collection();

        for(var i = 0, len = this._amount; i < len; i++) {
            var renderableType = SW.Util.toTitleCase(this._type);

            this._particles.addItem(
                'p' + i,
                new SW[this._type]()
                    .position(
                        this._position.x + ( (Math.random() * 2 - 1) * this._jitter.position ),
                        this._position.y + ( (Math.random() * 2 - 1) * this._jitter.position )
                    )
                    .dimensions(
                        this._dimensions.x + ( (Math.random() * 2 - 1) * this._jitter.dimensions ),
                        this._dimensions.y + ( (Math.random() * 2 - 1) * this._jitter.dimensions )
                    )
            );
        };

        this._displayType = null;

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