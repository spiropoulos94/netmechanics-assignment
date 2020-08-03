const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");

const sourcemaps = require("gulp-sourcemaps");

const browserSync = require("browser-sync").create();

function compileSass(done) {
  src("./assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/assets/css"));
  done();
}

exports.compileSass = compileSass;

function watchChanges() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./assets/scss/*.scss", compileSass);
  watch("./*.html").on("change", browserSync.reload);
}

exports.watchChanges = watchChanges;
