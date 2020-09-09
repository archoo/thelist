var gulp = require('gulp');
var sass = require('gulp-sass');
var srcmaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var bsync = require('browser-sync').create();

// compile css
function doCSS() {
  return gulp.src('./src/**/*.scss', { sourcemaps: true })
             .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
             .pipe(concat('all.css'))
             .pipe(gulp.dest('./css', { sourcemaps: '.' }))
             .pipe(bsync.stream());
}

function doJS() {
  return gulp.src('./src/**/*.js', { sourcemaps: true })
             .pipe(concat('all.js'))
             .pipe(gulp.dest('./js', { sourcemaps: '.' }));
}

function doServe() {
  bsync.init({
    open: 'external',
    proxy: 'http://localhost/'
  });
  gulp.watch('./src/**/*.scss',doCSS);
  gulp.watch('./src/**/*.js',doJS);
  gulp.watch(['./js/all.js','./*.php']).on('change', bsync.reload);
}

exports.Style = doCSS;
exports.Scripts = doJS;
exports.default = doServe;
