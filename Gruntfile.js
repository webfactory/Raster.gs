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
                    style: 'expanded'
                },
                files: {
                    'demos/twelve-columns/css/twelve-columns.css': 'demos/twelve-columns/scss/twelve-columns.scss',
                    'demos/semantic/css/semantic.css': 'demos/semantic/scss/semantic.scss'
                }
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
            options: {
                banner: '//Author: Marc Mintel <marc@mintel.me>\n//Twitter: @marcmintel\n//Team: webfactory GmbH <info@webfactory.de>\n//Licensed under MIT Open Source\n\n'
            },
            dist: {
                src: [
                    'src/_settings.scss',
                    'src/private/extends/_helpers.scss',
                    'src/private/functions/_is-equal.scss',
                    'src/private/functions/_parse-columns.scss',
                    'src/private/functions/_column-widths.scss',
                    'src/private/functions/_get-width.scss',
                    'src/private/functions/_parse-width.scss',
                    'src/private/functions/_column-margins.scss',
                    'src/private/functions/_get-margin.scss',
                    'src/private/functions/_parse-margin.scss',
                    'src/private/mixins/_column.scss',
                    'src/private/mixins/_full.scss',
                    'src/private/mixins/_hidden.scss',
                    'src/private/mixins/_pad.scss',
                    'src/private/mixins/_row.scss',
                    'src/private/mixins/_grid.scss',
                    'src/public/mixins/_column.scss',
                    'src/public/mixins/_full.scss',
                    'src/public/mixins/_hidden.scss',
                    'src/public/mixins/_pad.scss',
                    'src/public/mixins/_row.scss',
                    'src/public/mixins/_grid.scss'
                    
                ],
                dest: 'dist/_raster.scss'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            combine: {
            }
        },
        comments: {
            demos: {
                // Target-specific file lists and/or options go here.
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ 'demos/twelve-columns/css/twelve-columns.css', 'demos/semantic/css/semantic.css' ]
            }
        },
        csslint: {
            strict: {
                options: {
                    import: false
                },
                src: ['dist/**/*.css']
            }
        },
        copy: {
            main: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: 'bower_components/normalize-css/*.css',
                    dest: 'demos/demo-styles/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('bootcamp');
    grunt.registerTask('default', ['copy', 'concat', 'sass:dist', 'csslint', 'comments']);
    grunt.registerTask('test', ['sass:test', 'bootcamp']);
};