'use strict';

module.exports = (gulp,config) => {
  
  const handleErrors = require('../util/handle-error'),
        rename = require('gulp-rename'),
        path = require('path'),
        fs = require('fs'),
        data = require('gulp-data'),
        gutil = require('gulp-util'),
        prettify = require('gulp-html-prettify'),
        nunjRender = require('gulp-nunjucks-render'); 
  
  const handleData = (file) => {
    let viewId = path.dirname(file.relative).replace('views/', ''),
        jsonFileName = `${config.src}/views/${viewId}/view.json`;

    if (!fs.existsSync(jsonFileName)) {
      gutil.log(gutil.colors.red(`WARNING: View "${viewId}" has no data file!`));
      return false;
    }

    return JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
    
  }

  let env = nunjRender.nunjucks.configure(['./src'], { 'watch': false });
  
  gulp.task('markup', () => {

    return gulp.src(`${config.src}/views/**/view.nunj`)
      .pipe(data(handleData))
      .pipe(nunjRender())
      .pipe(rename(function(path){
        path.basename = 'index';
      }))
      .pipe(prettify({
        indent_char: ' ', 
        indent_size: 2
      }))
      .pipe(gulp.dest(config.dest))
      .on('error', handleErrors)

  });
      
}