'use strict';

module.exports = function(gulp, config){

  const browserifyBundler = require('../util/browserify-bundler');

  gulp.task('scripts', function(){
    
    // gulp.src(app.src + '/scripts/**/*.js')
    //   .pipe(gulp.dest(app.local + '/assets/scripts'))
    //   .pipe(gulp.dest(app.dist + '/assets/scripts'))

    return browserifyBundler(false, config);

  });

}