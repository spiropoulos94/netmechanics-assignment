const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");

const sourcemaps = require("gulp-sourcemaps");

const browserSync = require("browser-sync").create();

const gulpBuild = require("gulp-build");

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
  watch("./assets/scss/*.scss").on("change", browserSync.reload);
}

exports.watchChanges = watchChanges;

//gulp.task("build", function() {
//  gulp
//    .src("index.html")
//    .pipe(build({ title: "Some page" }))
//    .pipe(gulp.dest("dist"));
//});

function build(done) {
  src("index.html")
    .pipe(gulpBuild({ title: "Some page" }))
    .pipe(dest("dist"));
  done();
}

exports.build = build;
//this default gulp tasks is listening on changes in scss and it provides a sourcemap along with a hot-reload browser.
exports.default = series(compileSass, watchChanges);
