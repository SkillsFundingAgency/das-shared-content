'use strict'
const gulp = require('gulp')
const nodemon = require('nodemon')
const paths = require('../../config/paths.json')


gulp.task('nodemon', () => {
  return nodemon({
    watch: [
      paths.app
    ],
    script: './server.js'
  })
})