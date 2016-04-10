/**
 * @class  Preloader
 * @desc   Preloads a list of image, video, and audio files
 * @author Chris Peters
 */
class Preloader {
    /**
     * Parses file types and preloads them via element tags
     * @method Preloader.load
     * @param {...String|Array} paths File paths to preload
     */
    static load(...paths) {
        Preloader.loaded = 0;
        Preloader.total = paths.length;

        // if array is passed
        if (paths.length && Array.isArray(paths[0])) {
            paths = paths[0];
        }

        for (let path of paths) {
            if (Preloader._isImage(path)) {
                var img = new Image();
                img.src = path;

                img.addEventListener('load', Preloader.handleLoad, false);
                img.addEventListener('error', Preloader.error, false);
            } else if (Preloader._isAudio(path)) {
                var audio = new Audio();
                audio.src = path;

                audio.addEventListener('canplaythrough', Preloader.handleLoad, false);
                audio.addEventListener('error', Preloader.error, false);
            } else if (Preloader._isVideo(path)) {
                var video = new Video();
                video.src = path;

                video.addEventListener('canplaythrough', Preloader.handleLoad, false);
                video.addEventListener('error', Preloader.error, false);
            }
        }
    }

    /**
     * Returns if file has audio extension
     *
     * @method Preloader._isAudio
     * @param  {String}  path The file path
     * @return {Boolean}
     */
    static _isAudio(path) {
        return path.indexOf('.mp3') > 0 ||
            path.indexOf('.wav')    > 0 ||
            path.indexOf('.ogg')    > 0;
    }

    /**
     * Returns if file has image extension
     *
     * @method Preloader._isImage
     * @param  {String}  path The file path
     * @return {Boolean}
     */
    static _isImage(path) {
        return path.indexOf('.png') > 0 ||
            path.indexOf('.jpg')    > 0 ||
            path.indexOf('.jpeg')   > 0 ||
            path.indexOf('.gif')    > 0 ||
            path.indexOf('.bmp')    > 0;
    }

    /**
     * Returns if file has video extension
     *
     * @method Preloader._isVideo
     * @param  {String}  path The file path
     * @return {Boolean}
     */
    static _isVideo(path) {
        return path.indexOf('.webm') > 0 ||
            path.indexOf('.mp4')     > 0 ||
            path.indexOf('.ogv')     > 0;
    }

    /**
     * Removes event listener when loaded or errored
     *
     * @method Preloader.removeListener
     * @param  {HTMLEntity} el The html element
     */
    static removeListener(el) {
        var type = el.tagName.toLowerCase();

        switch (type) {
            case 'img':
                el.removeEventListener('load',  Preloader.handleLoad, false);
                el.removeEventListener('error', Preloader.error, false);

                break;
            case 'audio':
                el.removeEventListener('canplaythrough', Preloader.handleLoad, false);
                el.removeEventListener('error', Preloader.error, false);

                break;
        }
    }

    /**
     * Increments loaded count and calls complete or update based on count
     *
     * @method Preloader.handleLoad
     * @param  {Object} e The event object
     */
    static handleLoad(e) {
        Preloader.removeListener(e.currentTarget);

        Preloader.loaded += 1;

        if (Preloader.loaded === Preloader.total) {
            Preloader.complete();
        } else {
            Preloader.update(Preloader.loaded, Preloader.total);
        }
    }

    /**
     * Callback executed every time an asset has loaded. It gets passed loaded & total
     * which is useful for displaying percentage feedback.
     *
     * @method Preloader.update
     * @param {Integer} loaded
     * @param {Integer} total
     */
    static update() {}

    /**
     * Callback executed when loading complete
     *
     * @method Preload.complete
     */
    static complete() {}

    /**
     * Handles errors
     *
     * @method Preloader.error
     * @param {Object} e The event object
     */
    static error(e) {
        console.warn(e.status);
    }
}

Preloader.loaded = 0;
Preloader.total = 0;

export default Preloader;
