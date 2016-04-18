'use strict';

module.exports = (gulp, config) => {

  const rename = require('gulp-rename');

  gulp.task('copy-files', ()=>{

    gulp.src([
      `${config.src}/**/.htaccess`,
      `${config.src}/assets/**/*.*`
    ], { dot: true })
    .pipe(rename((path) => {
      // console.log(path);
      // path.dirname = path.dirname.replace('views', '');
      switch(path.dirname){
        case 'views':
          path.dirname = path.dirname.replace('views', '');
          break;
        case 'fonts':
        case 'images':
          let dir = path.dirname;
          path.dirname = `assets/${dir}`;
          break;
      }

    }))
    .pipe(gulp.dest(config.dest))

  });

}