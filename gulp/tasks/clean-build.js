'use strict';

module.exports = (gulp, config) => {
  
  gulp.task('clean-build', () => require('del')(config.dest));
  
}