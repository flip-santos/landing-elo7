'use strict';

module.exports = (gulp, app) => {
  
  const runSequence = require("run-sequence");

  gulp.task('default', function(){

    runSequence(
      'clean-build',
      ['less', 'markup']
    );
    
  });
  
}