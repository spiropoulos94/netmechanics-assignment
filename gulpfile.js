const gulp = require("gulp");

const sass = require("gulp-sass");

const browserSync = require("browser-sync").create();

// gulp.task("copyHtml", async function() {
//   gulp.src("src/*.html").pipe(gulp.dest("dist"));
// });
//
// gulp.task("sass", async function() {
//   return gulp
//     .src("./src/sass/*.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("./dist/css"));
// });

//compile scss into css

function style() {
  return (
    gulp
      .src("./assets/scss/*.scss")
      .pipe(sass())
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
