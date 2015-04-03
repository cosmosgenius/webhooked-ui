'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var PORT = 8888;


gulp.task('serve', function() {
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
    gulp.watch('index.html').on('change', reload);
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
gulp.task('default' ,['serve']);
