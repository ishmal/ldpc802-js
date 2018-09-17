const gulp = require("gulp");
const Mocha = require("./mocha-tool");
const jshint = require("gulp-jshint");

gulp.task("lint", () => {
  return gulp.src("src/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("test", () => {
  let opts = {
    colors: true
  };
  let files = [
    "./test/*.js"
  ];
  let mocha = new Mocha(opts);
  return mocha.runFiles(files);
});

gulp.task("default", gulp.parallel("lint", "test"));