'use strict';

module.exports = function(watch, config){

  const gulp = require('gulp'),
        glob = require('glob'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        watchify = require('watchify'),
        rename = require('gulp-rename'),
        gutil = require('gulp-util'),
        path = require('path'),
        uglify = require('gulp-uglify');
  
  glob(`${config.src}/views/**/view.js`, function (err, entry) {

    if(err){
      console.error(err);
      return false;
    }

    let scriptFile = path.resolve(entry[0]),
        transformedScript = browserify({
          entries: scriptFile,
          paths: [
            './node_modules',
            './',
            config.src
          ]
        }),
        bundler =  watch ? watchify(transformedScript) : transformedScript, 
        scriptsFolder = '/assets/scripts/';

    function rebundle() {
        
      bundler.bundle()
        .on('error', function(err) { 
          gutil.log(err);
          this.emit('end'); 
        })
        
        .pipe(source(scriptFile))
        .pipe(buffer())
        .pipe(rename(function(path){
          path.basename =  path.dirname.replace('src/views/', '');
          path.dirname = '';
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest + scriptsFolder));
  
    }

    bundler.on('update', function() {
      gutil.log('Rebundling...');
      rebundle();
    });

    return rebundle();  


  });
  


}