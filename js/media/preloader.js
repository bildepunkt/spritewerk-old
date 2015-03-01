SW.Preloader = (function() {
    /**
     * @class SW.Preloader
     * @belongsto SW
     * @param {object} assets
     * @requires SW.Signal
     * @private
     */
    var Preloader = function(assets) {
        var prop;

        /**
         * @member {object} SW.Preloader.prototype.assets
         * @private
         */
        this.assets = assets;

        /**
         * @member {integer} SW.Preloader.prototype.total
         * @private
         */
        this.total = 0;

        /**
         * @member {integer} SW.Preloader.prototype.loaded
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
         * @property {string} name
         * @property {integer} loaded
         * @property {integer} total
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
     * @param {string} path
     * @private
     */
    Preloader.prototype._getFileName = function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    };

    return Preloader;
}());