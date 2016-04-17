'use strict';

module.exports = (gulp, config) => {
  
  const del = require('del');

  gulp.task('clean-build', () => { del(config.dest) });
  
}