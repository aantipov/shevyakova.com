/**
 * Created by Alexei Antipov
 * Url: http://alexei.me
 *
 * Description
 */
'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

gulp.task('js', function () {
    gulp.src(['assets/js/shadowbox.js', 'assets/js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function () {
    gulp.src(['assets/css/bootstrap.min.css', 'assets/css/bootstrap-responsive.min.css', 'shadowbox/shadowbox.css', 'assets/css/*.css'])
        .pipe(concatCss('style.css'))
        //.pipe(minifyCSS())
        .pipe(gulp.dest('public'));
});