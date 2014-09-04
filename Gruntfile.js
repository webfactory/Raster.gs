'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourcemap: "none",
                loadPath: [
                    'bower_components/'
                ]
            },
            test: {
                options: {
                    quiet: true
                },
                files: {
                    'tmp/results.css': 'tests/tests.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/default.min.css': 'src/default.scss'
                }
            }
        },
        test: {
            options: {
                quiet: true
            },
            files: {
                'tmp/results.css': 'tests/tests.scss'
            }
        },
        bootcamp: {
            test: {
                files: {
                    src: ['./tmp/results.css']
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/settings.scss',
                    'src/functions/_column-widths.scss',
                    'src/functions/_get-column-widths.scss',
                    'src/functions/_column-margins.scss',
                    'src/functions/_get-column-margin.scss',
                    'src/functions/_parse-columns.scss',
                    'src/functions/_has-equal-columns.scss',
                    'src/mixins/_column.scss',
                    'src/mixins/_raster.scss'
                ],
                dest: 'dist/_raster.scss'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: false
                },
                src: ['dist/**/*.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('bootcamp');
    grunt.registerTask('default', ['sass:dist', 'concat', 'csslint']);
    grunt.registerTask('test', ['sass:test', 'bootcamp']);
};