var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var reactify = require('reactify');
var htmlMinifier = require('gulp-html-minifier');
var uglify = require('gulp-uglify');



gulp.task('html-development', function () {
     gulp
        .src('./src/*.css')
        .pipe(gulp.dest('./build'));
     gulp
        .src('./src/**/*.css')
        .pipe(gulp.dest('./build'));
     gulp
        .src('./src/**/*.png')
        .pipe(gulp.dest('./build'));
    return gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('js-development', function () {

    return browserify(__dirname + "/src/js/index.js")
        .transform(reactify)
        .bundle()
        .pipe(vinylSourceStream('index.js'))
        .pipe(gulp.dest('./build/js/'))

});


gulp.task('watch', function () {

    gulp.watch('./src/js/**/*.js', ['js-development']);
    gulp.watch('./src/js/**/*.jsx', ['js-development']);
    gulp.watch('./src/**/*.html', ['html-development']);
    gulp.watch('./src/**/*.css', ['html-development']);

});


gulp.task('default', ['js-development', 'html-development', 'watch']);