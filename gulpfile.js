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
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

gulp.task('js', function () {
    gulp.src(['assets/js/shadowbox.js', 'assets/js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('less', function () {
    return gulp.src('assets/less/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('css', ['less'], function () {
    gulp.src([
        '.tmp/bootstrap.css',
        'public/js/shadowbox/shadowbox.css'
    ])
        .pipe(concatCss('style.css'))
        .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public'));
});

gulp.task('default', function () {
    gulp.watch('assets/less/*.less', ['css']);
});


