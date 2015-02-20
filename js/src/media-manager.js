SW.MediaManager = SW.Protos.extend({
    images: {},

    sounds: {},

    addImage: function(name, img) {
        this.images[name] = img;
    },

    addSound: function(name, snd) {
        this.sounds[name] = snd;
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