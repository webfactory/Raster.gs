'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
        dist: {
            options: {
                style: 'expanded'
            },
            files: {
                'dist/default.css': 'src/default.scss'
            }
        }
    }
  });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);
};