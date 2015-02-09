define([
    './protos',
    './radio'
], function(Protos, radio) {

    return Protos.extend({
        protosName: 'preloader',

        paths: null,

        total: 0,

        loaded: 0,

        mediaManager: null,

        /**
         * @params {object}        options
         * @params {array}         options.paths - array of url paths
         * @params {MediaManager}  [options.mediaManager] - instance of MediaManager
         */
        init : function(options) {
            var assetCount = 0;
            var prop;

            this.paths = options.paths;

            this.mediaManager = options.mediaManager;

            for(prop in this.paths) {
                this.total += 1;
            }

            for (prop in this.paths) {
                if (this.paths[prop].indexOf('.png') > 0 || this.paths[prop].indexOf('.jpg') > 0) {
                    var img = new Image();
                    img.src = this.paths[prop];

                    radio.tuneIn(img, 'load',  this.loadHandler, this);
                    radio.tuneIn(img, 'error', this.error, this);
                } else if (this.paths[prop].indexOf('.mp3') > 0 || this.paths[prop].indexOf('.wav') > 0 || this.paths[prop].indexOf('.ogg') > 0) {
                    var audio = new Audio();
                    audio.src = this.paths[prop];

                    radio.tuneIn(audio, 'canplaythrough', this.loadHandler, this);
                    radio.tuneIn(audio, 'error', this.error, this);
                }
            }
        },

        tuneOutCurrent: function(el) {
            var type = el.tagName.toLowerCase();

            if (type == 'img') {
                radio.tuneOut(el, 'load',  this.loadHandler);
                radio.tuneOut(el, 'error', this.error);

                if (this.mediaManager) {
                    for(var name in this.paths) {
                        if (this.getFileName(this.paths[name]) === this.getFileName(el.src)) {
                            this.mediaManager.addImage(name, el);
                        }
                    }
                }
            } else if (type == 'audio') {
                radio.tuneOut(el, 'canplaythrough', this.loadHandler);
                radio.tuneOut(el, 'error', this.error);

                if (this.mediaManager) {
                    this.mediaManager.addSound(el.src, el);
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
});