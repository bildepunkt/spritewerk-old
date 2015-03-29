SW.MediaManager = (function() {
    'use strict';

    /**
     * manages and preloads media, plays audio
     *
     * @class SW.MediaManager
     * @requires SW.Signal
     * @belongsto SW
     * @singleton
     */
    var MediaManager = function() {
        /**
         * @member {Object} SW.MediaManager.prototype._images
         * @private
         */
        this._images = {};

        /**
         * @member {Object} SW.MediaManager.prototype._images
         * @private
         */
        this._sounds = {};

        SW.Signal.addListener('preload/update', this._onUpdate, this);
    };

    /**
     * @method SW.MediaManager.prototype.preload
     * @param {Object} assets - a hashtable of asset names & paths
     * @requires SW.Preloader
     */
    MediaManager.prototype.preload = function(assets) {
        new SW.Preloader(assets);
    };

    /**
     * @method SW.MediaManager.prototype._onUpdate
     * @param {SW.Signal#preload/update} e
     * @listens SW.Signal#preload/update
     * @private
     */
    MediaManager.prototype._onUpdate = function(e) {
        switch(e.detail.type) {
            case 'img':
                this._images[e.detail.name] = e.detail.el;
            break;
            case 'audio':
                this._sounds[e.detail.name] = e.detail.el;
            break;
        }
    };

    /**
     * @method SW.MediaManager.prototype._addImage
     * @private
     */
    MediaManager.prototype._addImage = function(name, img) {
        this._images[name] = img;
    };

    /**
     * @method SW.MediaManager.prototype._addSound
     * @private
     */
    MediaManager.prototype._addSound = function(name, snd) {
        this._sounds[name] = snd;
    };

    /**
     * @method SW.MediaManager.prototype.getImage
     * @param {String} name
     * @return {HTMLEntity}
     */
    MediaManager.prototype.getImage = function(name) {
        return this._images[name];
    };

    /**
     * @method SW.MediaManager.prototype.playSound
     * @param {String} name
     */
    MediaManager.prototype.playSound = function(name) {
        var sound = this._sounds[name];
        
        sound.currentTime = 0;
        sound.play();
    };

    /**
     * @method SW.MediaManager.prototype.pauseSound
     * @param {String} name
     */
    MediaManager.prototype.pauseSound = function(name) {
        var sound = this._sounds[name];

        sound.pause();
    };

    /**
     * @method SW.MediaManager.prototype.resumeSound
     * @param {String} name
     */
    MediaManager.prototype.resumeSound = function(name) {
        var sound = this._sounds[name];

        sound.play();
    };

    /**
     * @method SW.MediaManager.prototype.pauseAllSounds
     */
    MediaManager.prototype.pauseAllSounds = function() {
        for(var sound in this._sounds) {
            this._sounds[sound].pause();
        }
    };

    return new MediaManager();
}());