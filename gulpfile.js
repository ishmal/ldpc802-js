const gulp = require('gulp');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', () =>
	gulp.src('test/**/*.js', {read: false})
	.pipe(mocha({reporter: 'spec'}))
);

gulp.task('default', ['lint', 'test']);
