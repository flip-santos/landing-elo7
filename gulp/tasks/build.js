'use strict';

module.exports = (gulp, app) => {
  
  const runSequence = require("run-sequence");

  gulp.task('default', () => {

    runSequence(
      'clean-build',
      ['less', 'markup', 'scripts', 'copy-files']
    );
    
  });
  
}