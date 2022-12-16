const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const browsersync = require("browser-sync").create();
const del = require("del");

const htmlInput = "src/*.html";
const htmlOutput = "dist/";
const stylesMainInput = "src/styles/global.scss";
const stylesInput = "src/styles/**/*.scss";
const stylesOutput = "dist/css/";
const scriptsInput = "src/scripts/**/*.ts";
const scriptsOutput = "dist/js/";
const imgInput = "src/img/**";
const imgOutput = "dist/img/";

function clean() {
  return del(["dist/*", "!dist/img"]);
}

function html() {
  return gulp
    .src(htmlInput)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(htmlOutput))
    .pipe(browsersync.stream());
}

function styles() {
  return gulp
    .src(stylesMainInput)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(
      rename({
        basename: "style",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(stylesOutput))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp
    .src(scriptsInput)
    .pipe(sourcemaps.init())
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: "main.min.js",
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(scriptsOutput))
    .pipe(browsersync.stream());
}

function img() {
  return gulp
    .src(imgInput)
    .pipe(newer(imgOutput))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(imgOutput));
}

function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(htmlOutput).on("change", browsersync.reload);
  gulp.watch(htmlInput, html);
  gulp.watch(stylesInput, styles);
  gulp.watch(scriptsInput, scripts);
  gulp.watch(imgInput, img);
}

exports.build = gulp.series(clean, html, gulp.parallel(styles, scripts, img));
exports.dev = gulp.series(
  clean,
  html,
  gulp.parallel(styles, scripts, img),
  watch
);
