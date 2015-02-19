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
            if (this.assets[prop].indexOf('.png') > 0 || this.assets[prop].indexOf('.jpg') > 0 || this.assets[prop].indexOf('.gif') > 0) {
                var img = new Image();
                img.src = this.assets[prop];

                radio.tuneIn(img, 'load',  this.loadHandler, this);
                radio.tuneIn(img, 'error', this.error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                radio.tuneIn(audio, 'canplaythrough', this.loadHandler, this);
                radio.tuneIn(audio, 'error', this.error, this);
            } else {
                throw new Error('File type not supported');
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