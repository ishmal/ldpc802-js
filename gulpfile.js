const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const jshint = require('gulp-jshint');


gulp.task('lint', () => {
      return gulp.src(['./src/**/*.js', './test/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('test', () => {
      return gulp.src('./test/**/*.js')
      .pipe(jasmine());
});

gulp.task('default', ['lint', 'test']);
