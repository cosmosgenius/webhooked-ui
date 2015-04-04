'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var PORT = 8888;

var src = {
    sass: 'app/scss/*.scss',
    css:  'app/css',
    js: ['app/src/**/*.js', 'app/src/**/*.jsx'],
    html: 'app/index.html'
};

var libs = [
    'app/libs/react.js'
];

gulp.task('serve', ['index'], function() {
    browserSync({
        server: {
            baseDir: './app'
        },
        port: PORT,
        open: false,
        ui: {
            port: PORT-1
        }
    });
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js-watch']);
    gulp.watch(src.html).on('change', reload);
});

gulp.task('js-watch', ['js'], reload);

gulp.task('index', ['sass','js'], function () {
    var target = gulp.src('app/index.html');
    var sourcearray = libs.concat(['app/app.js', 'app/css/*.css']);
    var sources = gulp.src(
        sourcearray,
        {read: false}
    );

    return target.pipe(inject(
        sources,
        {
            relative: true
        }
    ))
    .pipe(gulp.dest('app'));
});

gulp.task('js', function() {
    var b = browserify({
        entries: './app/src/app.jsx',
        debug: true
    });
    return b.transform(babelify)
            .bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulp.dest('app'));
});

gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

gulp.task('test', []);
gulp.task('build', []);
gulp.task('default' ,['serve']);
