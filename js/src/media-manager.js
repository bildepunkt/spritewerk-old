SW.MediaManager = (function() {
    /**
     * manages and preloads media, plays audio
     *
     * @class SW.MediaManager
     * @requires SW.Preloader
     * @belongsto SW
     */
    var MediaManager = function() {
        /**
         * @member {object} SW.MediaManager.prototype.images
         */
        this.images = {};

        /**
         * @member {object} SW.MediaManager.prototype.images
         */
        this.sounds = {};

        /**
         * @member {SW.Preloader} SW.MediaManager.prototype.preloader
         */
        this.preloader = null;

        SW.Radio.tuneIn('preload/update', this._onUpdate, this);
    };

    /**
     * @method SW.MediaManager.prototype.preload
     */
    MediaManager.prototype.preload = function(assets) {
        this.preloader = new SW._Preloader(assets);
    };

    /**
     * @method SW.MediaManager.prototype._onUpdate
     * @param {SW.Radio#preload/update} e
     * @listens SW.Radio#preload/update
     * @private
     */
    MediaManager.prototype._onUpdate = function(e) {
        switch(e.detail.type) {
            case 'img':
                this.images[e.detail.name] = e.detail.el;
            break;
            case 'audio':
                this.sounds[e.detail.name] = e.detail.el;
            break;
        }
    };

    /**
     * @method SW.MediaManager.prototype._addImage
     * @private
     */
    MediaManager.prototype._addImage = function(name, img) {
        this.images[name] = img;
    };

    /**
     * @method SW.MediaManager.prototype._addSound
     * @private
     */
    MediaManager.prototype._addSound = function(name, snd) {
        this.sounds[name] = snd;
    };

    MediaManager.prototype.getImage = function(name) {
        return this.images[name];
    }

    MediaManager.prototype.play = function(name) {
        var sound = this.sounds[name];
        
        sound.currentTime = 0;
        sound.play();
    };

    MediaManager.prototype.pause = function(name) {
        var sound = this.sounds[name];

        sound.pause();
    };

    MediaManager.prototype.resume = function() {
        var sound = this.sounds[name];

        sound.play();
    };

    MediaManager.prototype.pauseAll = function() {
        for(var sound in this.sounds) {
            this.sounds[sound].pause();
        }
    };

    return MediaManager;
}());