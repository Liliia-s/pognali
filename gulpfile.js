'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
// var svgclean = require("remove-svg-properties").stream;
// var html = require("gulp-posthtml");
// var include = require("posthtml-include");
var clean = require('del');
var htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var jsmerge = require('gulp-concat');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

// gulp.task("start", gulp.series("css", "server"));

gulp.task('images', function () {
  return gulp.src('source/img/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('htmlmin', function () {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      ignoreCustomFragments: [/<br>\s/gi]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return pipeline(
      gulp.src('source/js/*.js'),
      // jsmerge('scripts.min.js'),
      // jsmin(),
      gulp.dest('build/js')
  );
});

// .pipe(rename(function (path) {
//   path.basename += ".min";
// }))
// .pipe(gulp.dest("build/js"));

// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//     .pipe(html([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });

gulp.task('clean', function () {
  return clean('build');
});

gulp.task('copy', function () {
  return gulp.src([
    // "source/*.html",
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('server', function () {
  server.init({
    server: 'build/'
    // notify: false,
    // open: true,
    // cors: true,
    // ui: false
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite'));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
  gulp.watch('source/*.html', gulp.series('htmlmin', 'refresh'));
  // gulp.watch("source/*.html", gulp.series("htmlmin", "refresh"));
  // gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

// gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'js', 'htmlmin'));
gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'htmlmin'));
gulp.task('start', gulp.series('build', 'server'));
