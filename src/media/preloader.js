SW.Media.Preloader = (function() {
    /**
     * @class SW.Media.Preloader
     * @belongsto SW
     * @param {Object} assets
     * @requires SW.Events.Signal
     * @private
     */
    var Preloader = function(assets) {
        var prop;

        /**
         * @member {Object} SW.Media.Preloader.prototype.assets
         * @private
         */
        this.assets = assets;

        /**
         * @member {Integer} SW.Media.Preloader.prototype.total
         * @private
         */
        this.total = 0;

        /**
         * @member {Integer} SW.Media.Preloader.prototype.loaded
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

                SW.Events.Signal.addListener(img, 'load',  this._loadHandler, this);
                SW.Events.Signal.addListener(img, 'error', this._error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                SW.Events.Signal.addListener(audio, 'canplaythrough', this._loadHandler, this);
                SW.Events.Signal.addListener(audio, 'error', this._error, this);
            } else {
                throw new Error('File type not supported');
            }
        }
    };

    /**
     * @method SW.Media.Preloader.prototype._loadHandler
     * @fires SW.Events.Signal#preload/update
     * @fires SW.Events.Signal#preload/complete
     * @requires SW.Events.Signal
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
         * @event SW.Events.Signal#preload/update
         * @property {HTMLElement} el
         * @property {String} name
         * @property {Integer} loaded
         * @property {Integer} total
         */
        SW.Events.Signal.dispatch('preload/update', {
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
             * @event SW.Events.Signal#preload/complete
             */
            SW.Events.Signal.dispatch('preload/complete');
        }
    };

    /**
     * @method SW.Media.Preloader.prototype._tuneOutCurrent
     * @requires SW.Events.Signal
     * @private
     */
    Preloader.prototype._tuneOutCurrent = function(el) {
        var type = el.tagName.toLowerCase();

        if (type == 'img') {
            SW.Events.Signal.removeListener(el, 'load',  this._loadHandler);
            SW.Events.Signal.removeListener(el, 'error', this._error);
        } else if (type == 'audio') {
            SW.Events.Signal.removeListener(el, 'canplaythrough', this._loadHandler);
            SW.Events.Signal.removeListener(el, 'error', this._error);
        }
    };

    /**
     * @method SW.Media.Preloader.prototype._error
     * @private
     */
    Preloader.prototype._error = function(e) {
        if ('console' in window) {
            console.log(e);
        }
    };

    /**
     * @method SW.Media.Preloader.prototype._getFileName
     * @param {String} path
     * @private
     */
    Preloader.prototype._getFileName = function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    };

    return Preloader;
}());