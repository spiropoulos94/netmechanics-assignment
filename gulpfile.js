const gulp = require("gulp");

const sass = require("gulp-sass");

const browserSync = require("browser-sync").create();

function style() {
  return (
    gulp
      .src("./assets/scss/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./dist/assets/css"))
      //stream changes
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./assets/scss/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.style = style;

exports.watch = watch;
