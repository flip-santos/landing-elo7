'use strict';

module.exports = (gulp,config) => {

  const handleErrors = require('../util/handle-error'),
        // filters = require('../util/nunjucks-filters'),
        rename = require('gulp-rename'),
        path = require('path'),
        fs = require('fs'),
        data = require('gulp-data'),
        gutil = require('gulp-util'),
        prettify = require('gulp-html-prettify'),
        htmlmin = require('gulp-html-minifier'),
        // getFiles = require('../util/get-files-array'),
        nunjRender = require('gulp-nunjucks-render'); 

  gulp.task('markup', function(){

    //Add all nunjucks filters from './gulp/util/nunjucks-filters.js'
    // let env = nunjRender.nunjucks.configure(['./config'], { 'watch': false });

    // for(let key in filters){
    //   if(!filters.hasOwnProperty(key)) return;
    //   env.addFilter(key, filters[key]);
    // }

    //Get filtered src files
    // let srcArr = [],
    //     markupFiles = getFiles(config.views);

    // markupFiles.forEach(function(item){
    //   srcArr.push(item.src.markup);
    // });

    return gulp.src(`${config.src}/views/**/*.nunj`)
      
      //Handle views data
      .pipe(data(function(file){
        
        let viewId = path.dirname(file.relative).replace('views/', ''),
            // jsonFileName = config.views[viewId].src.data;
            jsonFileName = `${config.src}/views/${viewId}/view-data.json`;

        if (!fs.existsSync(jsonFileName)) {
          gutil.log(gutil.colors.red(`WARNING: View "${viewId}" has no data file!`));
          return false;
        }

        return JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));

      }))

      //Compile Views
      .pipe(nunjRender())

      //Handle file rename for views
      .pipe(rename(function(file){
        let viewUrl = config.views[ file.dirname.split('/')[1] ].url; 
        file.dirname = path.dirname(viewUrl);
        file.basename = path.basename(viewUrl, path.extname(viewUrl));
        file.extname = path.extname(viewUrl);
      }))
      
      //Local 
      .pipe(prettify({
        indent_char: ' ', 
        indent_size: 2
      }))
      .pipe(gulp.dest(config.local))

      //Dist
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      }))
      .pipe(gulp.dest(config.dist))
      
      .on('error', handleErrors);

  });

}