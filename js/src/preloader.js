SW._Preloader = (function() {
    /**
     * @class SW._Preloader
     * @belongsto SW
     * @param {object} assets
     * @private
     */
    var _Preloader = function(assets) {
        var prop;

        /**
         * @member {object} SW._Preloader.prototype.assets
         * @private
         */
        this.assets = assets;

        /**
         * @member {integer} SW._Preloader.prototype.total
         * @private
         */
        this.total = 0;

        /**
         * @member {integer} SW._Preloader.prototype.loaded
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

                SW.Radio.tuneIn(img, 'load',  this._loadHandler, this);
                SW.Radio.tuneIn(img, 'error', this._error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                SW.Radio.tuneIn(audio, 'canplaythrough', this._loadHandler, this);
                SW.Radio.tuneIn(audio, 'error', this._error, this);
            } else {
                throw new Error('File type not supported');
            }
        }
    };

    /**
     * @method SW._Preloader.prototype._tuneOutCurrent
     * @private
     */
    _Preloader.prototype._tuneOutCurrent = function(el) {
        var type = el.tagName.toLowerCase();

        if (type == 'img') {
            SW.Radio.tuneOut(el, 'load',  this._loadHandler);
            SW.Radio.tuneOut(el, 'error', this._error);
        } else if (type == 'audio') {
            SW.Radio.tuneOut(el, 'canplaythrough', this._loadHandler);
            SW.Radio.tuneOut(el, 'error', this._error);
        }
    };

    /**
     * @method SW._Preloader.prototype._loadHandler
     * @fires SW.Radio#preload/update
     * @fires SW.Radio#preload/complete
     * @private
     */
    _Preloader.prototype._loadHandler = function(e) {
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
         * @event SW.Radio#preload/update
         * @property {HTMLElement} el
         * @property {string} name
         * @property {integer} loaded
         * @property {integer} total
         */
        SW.Radio.broadcast('preload/update', {
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
             * @event SW.Radio#preload/complete
             */
            SW.Radio.broadcast('preload/complete');
        }
    };

    /**
     * @method SW._Preloader.prototype._error
     * @private
     */
    _Preloader.prototype._error = function(e) {
        if ('console' in window) {
            console.log(e);
        }
    };

    /**
     * @method SW._Preloader.prototype._getFileName
     * @param {string} path
     * @private
     */
    _Preloader.prototype._getFileName = function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    };

    return _Preloader;
}());