'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var PORT = 8888;

var src = {
    sass: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/index.html'
};

gulp.task('serve', ['sass','index'], function() {
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
    gulp.watch(src.html).on('change', reload);
});

gulp.task('index', ['sass'], function () {
    var target = gulp.src('app/index.html');
    var sources = gulp.src(
        ['app/js/app.js', 'app/css/*.css'],
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
