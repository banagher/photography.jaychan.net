'use strict';

module.exports = function(grunt) {

	// Configuring paths for the application
	var pathConfig = {
		cwd: 'src',
		dist: 'dist',
		bootstrap: 'vendor/bootstrap',
		css: 'css',
		copy: ['css/**', '!css/*.css', 'fonts/**', 'inc/**', 'favicon.png'],
		html: ['index.html']
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		paths: pathConfig,

		bower: {
			install: {
				options: {
					targetDir: '<%= paths.cwd %>/vendor/',
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
			dev: {
				options: {
					cleancss: false,
					compress: false
				},
				files: {
					'dist/css/bootstrap.css': 'src/vendor/bootstrap/less/bootstrap.less',
					'dist/css/tmedia.css': 'src/less/tmedia.less'
				}
			},
			prod: {
				options: {
					cleancss: true,
					compress: true
				},
				files: {
					'dist/css/bootstrap.css': 'src/vendor/bootstrap/less/bootstrap.less',
					'dist/css/tmedia.css': 'src/less/tmedia.less'
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: false,
				collapseWhitespace: false
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= paths.cwd %>',
					src: '*.html',
					dest: '<%= paths.dist %>'
				}]
			},
			partials: {
				files: [{
					expand: true,
					cwd: '<%= paths.cwd %>/app/partials',
					src: '*',
					dest: '<%= paths.dist %>/partials'
				}]
			}
		},
		useminPrepare: {
			html: '<%= paths.cwd %>/index.html',
			options: {
				dest: '<%= paths.dist %>',
				flow: {
					steps: {
						js: ['concat', 'uglifyjs']
					},
					post: {}
				}
			}
		},
		//Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= paths.dist %>/index.html'],
			css: ['<%= paths.dist %>/css/{,*/}*.css']
			//js: ['<%= paths.dist %>/scripts/{,*/}*.js'],
		},
		jshint: {
			all: ['Gruntfile.js', '<%= paths.cwd %>/js/**/*.js', '<%= paths.cwd %>/app/**/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		jscs: {
			src: ['Gruntfile.js', '<%= paths.cwd %>/js/**/*.js', '<%= paths.cwd %>/app/**/*.js'],
			options: {
				config: '.jscsrc'
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= paths.dist %>/{,*/}*',
						'!<%= paths.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},
		copy: {
			prod: {
				expand: true,
				cwd: '<%= paths.cwd %>',
				src: '<%= paths.copy %>',
				dest: '<%= paths.dist %>'
			},
			dev: {
				expand: true,
				cwd: '<%= paths.cwd %>',
				src: ['js/**/*.js', 'vendor/**/*.js'],
				dest: '<%= paths.dist %>'
			}
		},
		watch: {
			options: {
				livereload: true
			},
			less: {
				files: '**/*.less',
				tasks: ['less'],
				options: {
					cwd: '<%= paths.cwd %>'
				}
			},
			js: {
				files: ['js/*.js', 'app/**/*.js'],
				tasks: ['jshint:all', 'jscs', 'concat:js', 'copy:prod'],
				options: {
					cwd: '<%= paths.cwd %>'
				}
			},
			html: {
				files: '**/*.html',
				tasks: ['htmlmin'],
				options: {
					cwd: '<%= paths.cwd %>'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: '.',
					hostname: 'localhost',
					protocol: 'http',
					livereload: true,
					open: true
				}
			}
		}
	});

	//load the devDependancies tasks
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	// Test and dev build
	grunt.registerTask('default', [
		'clean:dist',
		'less:dev',
		'jshint:all',
		'jscs',
		'htmlmin',
		'copy:dev'
	]);

	// Prod build
	grunt.registerTask('prod', [
		'clean:dist',
		'htmlmin',
		'less:prod',
		'useminPrepare',
		'concat',
		'uglify',
		'jshint:all',
		'jscs',
		'usemin',
		'copy:prod'
	]);

	// Start server
	grunt.registerTask('serve', ['connect', 'watch']);
};
