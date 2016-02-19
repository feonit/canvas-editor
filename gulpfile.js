var concat = require('gulp-concat');
var jsdoc2md = require('gulp-jsdoc-to-markdown');
var gutil = require('gulp-util');
var gulp = require('gulp');
var del = require('del');

gulp.task('default', ['clean', 'docs']);

gulp.task('clean', function() {
    del.sync('docs', {force: true});
});

gulp.task('docs', ['clean'], function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('README.md'))
        .pipe(jsdoc2md())
        .on('error', function(err) {
            gutil.log('jsdoc2md failed:', err.message)
        })
        .pipe(gulp.dest('./'))
});