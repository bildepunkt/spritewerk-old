'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class  Preloader
 * @desc   Preloads a list of image, video, and audio files
 * @author Chris Peters
 */

var Preloader = function () {
    function Preloader() {
        _classCallCheck(this, Preloader);
    }

    _createClass(Preloader, null, [{
        key: 'load',

        /**
         * Parses file types and preloads them via element tags
         * @method Preloader.load
         * @param {...String|Array} paths File paths to preload
         */
        value: function load() {
            for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
                paths[_key] = arguments[_key];
            }

            Preloader.loaded = 0;
            Preloader.total = paths.length;

            // if array is passed
            if (paths.length && Array.isArray(paths[0])) {
                paths = paths[0];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var path = _step.value;

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
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
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

    }, {
        key: '_isAudio',
        value: function _isAudio(path) {
            return path.indexOf('.mp3') > 0 || path.indexOf('.wav') > 0 || path.indexOf('.ogg') > 0;
        }

        /**
         * Returns if file has image extension
         *
         * @method Preloader._isImage
         * @param  {String}  path The file path
         * @return {Boolean}
         */

    }, {
        key: '_isImage',
        value: function _isImage(path) {
            return path.indexOf('.png') > 0 || path.indexOf('.jpg') > 0 || path.indexOf('.jpeg') > 0 || path.indexOf('.gif') > 0 || path.indexOf('.bmp') > 0;
        }

        /**
         * Returns if file has video extension
         *
         * @method Preloader._isVideo
         * @param  {String}  path The file path
         * @return {Boolean}
         */

    }, {
        key: '_isVideo',
        value: function _isVideo(path) {
            return path.indexOf('.webm') > 0 || path.indexOf('.mp4') > 0 || path.indexOf('.ogv') > 0;
        }

        /**
         * Removes event listener when loaded or errored
         *
         * @method Preloader.removeListener
         * @param  {HTMLEntity} el The html element
         */

    }, {
        key: 'removeListener',
        value: function removeListener(el) {
            var type = el.tagName.toLowerCase();

            switch (type) {
                case 'img':
                    el.removeEventListener('load', Preloader.handleLoad, false);
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

    }, {
        key: 'handleLoad',
        value: function handleLoad(e) {
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

    }, {
        key: 'update',
        value: function update() {}

        /**
         * Callback executed when loading complete
         *
         * @method Preload.complete
         */

    }, {
        key: 'complete',
        value: function complete() {}

        /**
         * Handles errors
         *
         * @method Preloader.error
         * @param {Object} e The event object
         */

    }, {
        key: 'error',
        value: function error(e) {
            console.warn(e.status);
        }
    }]);

    return Preloader;
}();

Preloader.loaded = 0;
Preloader.total = 0;

exports.default = Preloader;