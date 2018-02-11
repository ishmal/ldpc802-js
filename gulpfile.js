const gulp = require('gulp');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', () => {
  return gulp.src('test/ldpctest.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('default', gulp.series("lint", "test"));