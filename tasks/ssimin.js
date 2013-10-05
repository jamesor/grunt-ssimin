'use strict';

/**
 * grunt-ssimin task
 * 
 * Inspired by yeoman/grunt-usemin, the following task reads HTML files 
 * looking for blocks of code to remove as server-side includes.  The 
 * task will look for start and end patterns as follows:
 *
 *     <!-- include:<type> <path> -->
 *     ... code to be placed in include
 *     <!-- endinclude -->
 *
 * - type: the type of include, either virtual or file
 * - path: the path where the include file should be created
 *
 * For Example:
 *
 *     <!-- include:virtual /includes/header.inc -->
 *     ... code to be placed in include
 *     <!-- endinclude -->
 *
 * The task would replace those lines with the following line:
 *
 *     <!--#include virtual="/includes/header.inc" -->
 *
 * And create a file at:
 *
 * <% Task's Target Folder %>/includes/header.inc
 */

module.exports = function (grunt) {

  grunt.registerMultiTask('ssimin', 'Replace content with Server-Side Includes', function() {

    var options = this.options({
      force: false
    });

    var force = options.force;
    delete options.force;

    // start build pattern: will match
    //  * <!-- include:[type] output -->
    // The following matching param are set when there's a match
    //   * 0 : the whole matched expression
    //   * 1 : the type (e.g. virtual or file)
    //   * 2 : the output - the include file to create
    //
    var regbuild = /<!--\s*include:(\w+)\s*([^\s]+)\s*-->/;
    var regend = /<!--\s*endinclude\s*-->/;
    var dest = this.target;

    var content, contentLines, indent, include, endinclude, includepath,
        isIncludeLine, includeLines, newContentlines;

    this.files.forEach(function (file) {
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {

          content = grunt.file.read(filepath);
          contentLines = content.replace(/\r\n/g, '\n').split(/\n/);
          newContentlines = includeLines = [];
          isIncludeLine = false;

          if (contentLines.length < 1) {
            grunt.log.warn('Destination not written because file was empty.');
          } else {

            contentLines.forEach(function (l) {
              indent = (l.match(/^\s*/) || [])[0];
              include = l.match(regbuild);
              endinclude = regend.test(l);

              if (include) {
                isIncludeLine = true;
                newContentlines.push(indent + '<!--#include ' + include[1] + '="' + include[2] + '" -->');
                includepath = dest + include[2];
                includeLines = [];
              }

              if (!isIncludeLine) {
                newContentlines.push(l);
              }

              if (endinclude) {
                isIncludeLine = false;
                if (!grunt.file.exists(includepath)) {
                  grunt.file.write(includepath, includeLines.join('\n'));
                  grunt.log.ok('Write ' + includepath + '.');
                }
              }

              if (isIncludeLine && !include && !endinclude) {
                includeLines.push(l);
              }

            });

            content = newContentlines.join('\n');
            grunt.file.write(filepath, content);
            grunt.log.ok('File ' + filepath + ' updated.');
          }

          return true;
        }
      });
    });

    // Fail task if errors were logged except if force was set.
    if (this.errorCount) { return force; }
  });

};