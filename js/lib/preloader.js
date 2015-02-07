define([
    './protos',
    './radio'
], function(Protos, radio) {

    return Protos.extend({
        protosName: 'preloader',

        total: 0,

        loaded: 0,

        mediaManager: null,

        /**
         * @params {object}        options
         * @params {array}         options.paths - array of url paths
         * @params {MediaManager}  [options.mediaManager] - instance of MediaManager
         */
        init : function(options) {
            var paths = options.paths;

            this.mediaManager = options.mediaManager;

            this.total = paths.length;

            for (var i = 0; i < this.total; i += 1) {
                if (paths[i].indexOf('.png') > 0 || paths[i].indexOf('.jpg') > 0) {
                    var img = new Image();
                    img.src = paths[i];

                    radio.tuneIn(img, 'load',  this.loadHandler, this);
                    radio.tuneIn(img, 'error', this.error, this);
                } else if (paths[i].indexOf('.mp3') > 0 || paths[i].indexOf('.wav') > 0 || paths[i].indexOf('.ogg') > 0) {
                    var audio = new Audio();
                    audio.src = paths[i];

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
                    this.mediaManager.addImage(el.src, el);
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
        }
    });
});