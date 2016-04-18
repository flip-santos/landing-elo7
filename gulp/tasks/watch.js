'use strict';

module.exports = (gulp, config) => {

  const browserifyBundler = require('../util/browserify-bundler');

  gulp.task('watch', () => {

    browserifyBundler(true, config);

    gulp.watch(config.src + '/**/*.less', ['less']);
    
    gulp.watch([
      config.src + '/views/**/*.nunj',
      config.src + '/views/**/*.json',
      config.src + '/modules/**/*.nunj',
      config.src + '/components/**/*.nunj',
      config.src + '/templates/**/*.nunj'
    ], ['markup']);

  });
}