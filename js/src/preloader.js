/**
 * @private
 */
SW.Preloader = SW.Protos.extend({
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

                SW.Radio.tuneIn(img, 'load',  this.loadHandler, this);
                SW.Radio.tuneIn(img, 'error', this.error, this);
            } else if (this.assets[prop].indexOf('.mp3') > 0 || this.assets[prop].indexOf('.wav') > 0 || this.assets[prop].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = this.assets[prop];

                SW.Radio.tuneIn(audio, 'canplaythrough', this.loadHandler, this);
                SW.Radio.tuneIn(audio, 'error', this.error, this);
            } else {
                throw new Error('File type not supported');
            }
        }
    },

    tuneOutCurrent: function(el) {
        var type = el.tagName.toLowerCase();
        var name;

        if (type == 'img') {
            SW.Radio.tuneOut(el, 'load',  this.loadHandler);
            SW.Radio.tuneOut(el, 'error', this.error);

            if (SW.MediaManager) {
                for(name in this.assets) {
                    if (this.getFileName(this.assets[name]) === this.getFileName(el.src)) {
                        SW.MediaManager.addImage(name, el);
                    }
                }
            }
        } else if (type == 'audio') {
            SW.Radio.tuneOut(el, 'canplaythrough', this.loadHandler);
            SW.Radio.tuneOut(el, 'error', this.error);

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

        SW.Radio.broadcast('preloadupdate', {
            loaded: this.loaded,
            total : this.total
        });

        if (this.loaded === this.total) {
            SW.Radio.broadcast('preloadcomplete');
        }
    },

    error: function(e) {
        console.log(e.status);
    },

    getFileName: function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.length + 1);
    }
});