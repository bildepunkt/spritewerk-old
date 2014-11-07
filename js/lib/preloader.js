(function() {
'use strict';

/** private */
var total = 0,
    loaded = 0,
    updateEvent,
    assetsLoadedEvent = new CustomEvent('preloader/assetsloaded');

function tuneOutCurrent(el) {
    var type = el.tagName.toLowerCase();

    if (type == 'img') {
        el.removeEventListener('load',  loadHandler, false);
        el.removeEventListener('error', error, false);
    } else if (type == 'audio') {
        el.removeEventListener('canplaythrough', loadHandler, false);
        el.removeEventListener('error', error, false);
    }
}

function loadHandler(e) {
    tuneOutCurrent(e.currentTarget);

    loaded += 1;

    if (loaded === total) {
        document.dispatchEvent(assetsLoadedEvent);
        // reset if using multiple times
        loaded = 0;
    } else {
        // TODO does the event need to be created to update the detail object
        updateEvent = new CustomEvent('preloader/update', {
            detail: {
                loaded: loaded,
                total : total
            }
        });
        document.dispatchEvent(updateEvent);
    }
}

function error(e) {
    console.log(e.status);
}

/** public */
var preloader = {
    /**
     * @params {array} paths Array of {string} paths
     */
    load : function(paths) {
        total = paths.length;

        for (var i = 0; i < total; i += 1) {
            if (paths[i].indexOf('.png') > 0 || paths[i].indexOf('.jpg') > 0) {
                var img = new Image();
                img.src = paths[i];

                img.addEventListener('load', loadHandler, false);
                img.addEventListener('error', error, false);
            } else if (paths[i].indexOf('.mp3') > 0 || paths[i].indexOf('.wav') > 0 || paths[i].indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = paths[i];

                audio.addEventListener('canplaythrough', loadHandler, false);
                audio.addEventListener('error', error, false);
            }
        }
    }
};

try {
    module.exports = preloader;
} catch(e) {
    try {
        define([], preloader);
    } catch(e) {
        window.preloader = preloader;
    }
}

}());