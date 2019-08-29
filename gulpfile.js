"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

// CSS task
function css() {
  return gulp
    .src("./sass/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./"))
}

// Watch files
function watchFiles() {
  gulp.watch("./sass/*", css);
}

// define complex tasks
const build = gulp.series(css, watchFiles);

// export tasks
exports.default = build;
