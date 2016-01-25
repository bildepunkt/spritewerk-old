/**
 *
 */
class Preloader {
    static load(paths) {
        Preloader.loaded = 0;
        Preloader.total = paths.length;

        for (let path of paths) {
            if (path.indexOf('.png') > 0 || path.indexOf('.jpg') > 0) {
                var img = new Image();
                img.src = path;

                img.addEventListener('load', Preloader.handleLoad, false);
                img.addEventListener('error', Preloader.error, false);
            } else if (path.indexOf('.mp3') > 0 || path.indexOf('.wav') > 0 || path.indexOf('.ogg') > 0) {
                var audio = new Audio();
                audio.src = path;

                audio.addEventListener('canplaythrough', Preloader.handleLoad, false);
                audio.addEventListener('error', Preloader.error, false);
            }
        }
    }

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

    static handleLoad(e) {
        Preloader.removeListener(e.currentTarget);

        Preloader.loaded += 1;

        if (Preloader.loaded === Preloader.total) {
            Preloader.complete();
        } else {
            Preloader.update(Preloader.Preloader.loaded, Preloader.total);
        }
    }

    static error(e) {
        console.log(e.status);
    }
}

Preloader.loaded = 0;
Preloader.total = 0;

export default Preloader;
