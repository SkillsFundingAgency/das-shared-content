'use strict'

const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const eol = require('gulp-eol')
const rename = require('gulp-rename')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

const configPaths = require('../../config/paths.json')

gulp.task('das-compile-js', function() {
  return gulp.src([
      '!' + configPaths.src.dasJs,
      configPaths.src.defaultJs,
      configPaths.src.defaultJsMain
  ]).pipe(concat('app.min.js'))
    .pipe(terser({ module: true }))
    .pipe(gulp.dest(configPaths.dist.defaultJs));
});

gulp.task('das-watch-js', function() {

  gulp.watch(['!' + configPaths.src.dasJs, configPaths.src.defaultJs], gulp.series('das-compile-js'))
    .on('change', function (path) {
      console.log(`File ${path} was changed, running tasks...`);
    });

  gulp.watch([configPaths.src.componentJs, configPaths.src.dasJs], gulp.series('das-compile-js-components'))
    .on('change', function (path) {
      console.log(`File ${path} was changed, running tasks...`);
    });

});

gulp.task('das-compile-js-components', function() {
  let srcFile = configPaths.src.dasJs
  let jsDest = configPaths.dist.defaultJs
  return gulp.src(srcFile)
    .pipe(rollup({
      name: 'DASFrontend',
      plugins: [resolve(), commonjs()],
      legacy: true,
      format: 'umd',
    })).on('error', function (e) { console.log(e) })
    .pipe(terser({ module: true }))
    .pipe(
      rename({
        basename: 'das-all',
        extname: '.min.js'
      })
    )
    .pipe(eol())
    .pipe(gulp.dest(jsDest));
});
