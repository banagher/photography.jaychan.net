'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // files and directorys 
        config: {
            cwd: 'src',
            dist: 'dist',
            bootstrap: 'vendor/bootstrap',
            css: 'css',
            copy: ['css/**', '!css/*.css', 'js/**', '!js/main.js', 'fonts/**', 'inc/**', 'favicon.png'],
            html: ['<%= cwd %>/index.html']
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= config.cwd %>/vendor/',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        less: {
            bootstrap: {
                options: {
                    cleancss: true,
                    compress: false,
                },
                files: { "dist/css/bootstrap.css": "src/vendor/bootstrap/less/bootstrap.less" }
            },
            theme: {
                options: {
                    cleancss: true,
                    compress: false,
                },
                files: { "dist/css/jchan-theme.css": "src/vendor/bootstrap/less/theme.less" }
            }
        },
        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case': true
                },
                src: ['dist/*.html']
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.cwd %>',
                    src: '<%= config.html %>',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
                stripBanners: false
            },
            js: {
                src: [
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/transition.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/alert.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/button.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/carousel.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/collapse.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/dropdown.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/modal.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/tooltip.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/popover.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/scrollspy.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/tab.js',
                    '<%= config.cwd %>/<%= config.bootstrap %>/js/affix.js',
                    '<%= config.cwd %>/js/jchan-custom.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        copy: {
            move: {
                expand: true,
                cwd: '<%= config.cwd %>',
                src: '<%= config.copy %>',
                dest: '<%= config.dist %>',
            },
        },
        watch: {
            less: {
                files: '**/*.less',
                tasks: ['less'],
                options: {
                    cwd: '<%= config.cwd %>'
                }
            },
            js: {
                files: 'js/*.js',
                tasks: ['concat:js'],
                options: {
                    cwd: '<%= config.cwd %>'
                }
            },
            html: {
                files: '*.html',
                tasks: ['default'],
                options: {
                    cwd: '<%= config.cwd %>'
                }
            }
        }
    });

    //load the devDependancies tasks
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    // create entry points
    grunt.registerTask("default", ['less', 'concat:js', 'htmlmin', 'copy:move']);
};
