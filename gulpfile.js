'use strict';

const gulp = require('gulp'),
      config = require('./gulp/config'),
      taskPath = './gulp/tasks',
      taskList = require('fs').readdirSync(taskPath);

taskList.forEach( (taskFile) => { require(`${taskPath}/${taskFile}`)(gulp, config) });
