'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var packages = {
    display: {
        dest: 'dist',
        out: 'spritewerk-display.js',
        files: [
            'src/spritewerk.js',

            'src/common/util.js',
            'src/common/unique.js',
            'src/common/collection.js',
            'src/common/dom.js',

            'src/display/canvas.js',
            'src/display/vector.js',
            'src/display/sprite.js',
            'src/display/rectangle.js',
            'src/display/line.js',
            'src/display/polygon.js',
            'src/display/bitmap.js',
            'src/display/text.js'
        ]
    },
    events: {
        dest: 'dist',
        out: 'spritewerk-events.js',
        files: [
            'src/spritewerk.js',

            'src/common/util.js',
            'src/common/unique.js',
            'src/common/collection.js',
            'src/common/dom.js',

            'src/events/signal.js',
            'src/events/input.js'
        ]
    },
    media: {
        dest: 'dist',
        out: 'spritewerk-media.js',
        files: [
            'src/spritewerk.js',

            'src/common/util.js',
            'src/common/unique.js',
            'src/common/collection.js',
            'src/common/dom.js',

            'src/events/signal.js',
            'src/events/input.js',

            'src/media/preloader.js',
            'src/media/media-manager.js'
        ]
    },
    game: {
        dest: 'dist',
        out: 'spritewerk-game.js',
        files: [
            'src/spritewerk.js',

            'src/common/util.js',
            'src/common/unique.js',
            'src/common/collection.js',
            'src/common/dom.js',

            'src/events/signal.js',
            'src/events/input.js',

            'src/media/preloader.js',
            'src/media/media-manager.js',

            'src/display/canvas.js',
            'src/display/vector.js',
            'src/display/sprite.js',
            'src/display/rectangle.js',
            'src/display/line.js',
            'src/display/polygon.js',
            'src/display/bitmap.js',
            'src/display/text.js',

            'src/game/scene.js',
            'src/game/scene-manager.js',
        ]
    }
};

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('build', ['clean'], function() {
    for(var key in packages) {
        gulp.src(packages[key].files)
            .pipe(uglify())
            .pipe(concat(packages[key].out))
            .pipe(gulp.dest(packages[key].dest));
    }
});

gulp.task('buildDev', ['clean'], function() {
    for(var key in packages) {
        gulp.src(packages[key].files)
            .pipe(concat(packages[key].out))
            .pipe(gulp.dest(packages[key].dest));
    }
});

gulp.task('default', ['buildDev']);