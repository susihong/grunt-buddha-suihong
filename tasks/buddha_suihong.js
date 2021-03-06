/*
 * grunt-buddha-suihong
 * https://github.com/susihong/grunt-buddha-suihong
 *
 * Copyright (c) 2017 
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_suihong', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        who: 'buddha',
        commentSymbol: '//'
    });
      
      var testExistRegexMap = {
          'buddha': /o8888888o/,
          'alpaca': /┗┓┓┏━┳┓┏┛/
      }
      
      var who = options.who,
          commentSymbol = options.commentSymbol,
      
          commentFilepathMap = {
              'buddha': 'asserts/buddha.txt',
              'alpaca': 'asserts/alpaca.txt'
          },
          commentFilepath = path.join(__dirname, commentFilepathMap[who]),
          commentContent = grunt.file.read(commentFilepath),
      
          lineCommentArr = commentContent.split('\n');
          grunt.log.writeln('lineCommentArr length' + lineCommentArr.length);
      
      lineCommentArr.forEach(function(value, index, arr) {
          arr[index] = commentSymbol + value;
      });
      
      commentContent = lineCommentArr.join('\n');
      

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent = commentContent + '\n' + originalFileContent;
          
          if (testExistRegexMap[who].test(originalFileContent)) {
              return;
          }
          
          grunt.file.write(filepath, newFileContent);
      })

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
