"use strict";

const gulp = require('gulp');
const taskListing = require('gulp-task-listing')

require('./tasks/gulp/das');
require('./tasks/gulp/campaign');
require('./tasks/gulp/dasJs');
require('./tasks/gulp/nodemon')

const dasBuildTasks = gulp.series('das-copy-libs', 'das-copy-images', 'das-compile-sass', 'das-compile-js', 'das-compile-js-components', 'das-compile-js-components-dev');
const dasWatchTasks = gulp.parallel('das-watch-sass', 'das-watch-js');

const campaignBuildTasks = gulp.series('campaign-copy-libs', 'campaign-compile-sass', 'campaign-compile-js', 'campaign-copy-images');
const campaignWatchTasks = gulp.parallel('campaign-watch-sass');

gulp.task('das',  gulp.series(
  dasBuildTasks,
  dasWatchTasks
))

gulp.task('campaign', gulp.series(
  campaignBuildTasks,
  campaignWatchTasks
))

gulp.task('build', gulp.series(
  dasBuildTasks,
  campaignBuildTasks
))

gulp.task('watch', () => Promise.all([
  'das-watch-sass',
  'das-watch-js'
]))


gulp.task('start', gulp.series(
  'watch',
  'nodemon'
));


gulp.task('default', taskListing)