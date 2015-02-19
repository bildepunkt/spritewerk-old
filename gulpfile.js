'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var core = {
    dest: 'dist/js',
    minDest: 'dist/js/min',
    out: 'spritewerk-core.js',
    files: [
        './js/lib/radio.js',
        './js/lib/protos.js',

        './js/src/spritewerk.js',
        './js/src/collection.js',
        './js/src/renderable.js',
        './js/src/state.js',

        './js/src/config.js',
        './js/src/dom.js',
        './js/src/canvas.js',
        './js/src/collision.js',
        './js/src/input.js',
        './js/src/draw.js',
        './js/src/fsm.js',
        './js/src/game.js',
        './js/src/media-manager.js',
        './js/src/preloader.js',
        './js/src/rectangle.js',
        './js/src/sprite.js',
        './js/src/loading.js',
        './js/src/ready.js'
    ]
};

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('core-concat', ['clean'], function() {
    return gulp.src(core.files)
        .pipe(concat(core.out))
        .pipe(gulp.dest(core.dest));
});

gulp.task('core-compress', ['core-concat'], function() {
    return gulp.src(core.dest + '/' + core.out)
        .pipe(uglify())
        .pipe(gulp.dest(core.minDest));
});

gulp.task('default', ['core-concat', 'core-compress']);
