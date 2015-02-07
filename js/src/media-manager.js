define([
    '../lib/protos'
], function(Protos) {

    /**
     * Media Manager
     */
    var MediaManager = Protos.extend({
        protosName: 'mediamanager',

        images: {},

        sounds: {},

        addImage: function(path, img) {
            var name = this.getName(path);
            this.images[name] = img;
        },

        addSound: function(path, snd) {
            var name = this.getName(path);
            this.sounds[name] = snd;
        },

        getName: function(path) {
            return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')).replace(/[^a-z0-9]/i, '_');
        },

        play: function(name) {
            var sound = this.sounds[name];
            
            sound.currentTime = 0;
            sound.play();
        },

        pause: function(name) {
            var sound = this.sounds[name];

            sound.pause();
        },

        resume: function() {
            var sound = this.sounds[name];

            sound.play();
        },

        pauseAll: function() {
            for(var sound in this.sounds) {
                this.sounds[sound].pause();
            }
        }
    });

    return new MediaManager();
});