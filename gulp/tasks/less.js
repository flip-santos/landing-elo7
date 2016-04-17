'use strict';

module.exports = (gulp, config) => {

  const less = require('gulp-less'),
        cleanCSS = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),
        rename = require('gulp-rename');

  gulp.task('less', function(){

    return gulp.src(`${config.src}/views/**/*.less`)
      .pipe(less({
        paths: [
          './node_modules',
          config.src
        ]
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(rename((path) => {
        path.basename = path.dirname;
        path.dirname = '';
      }))
      .pipe(cleanCSS({
        keepSpecialComments: 0
      }))
      .pipe(gulp.dest(`${config.dest}/assets/css`));

  });

}