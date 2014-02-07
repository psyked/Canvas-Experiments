'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['app/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'app/shared/css/app.css': 'app/shared/scss/app.scss',
					'app/canvas-tools_template/css/canvas-tools.css': 'app/canvas-tools_template/scss/canvas-tools.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'app/canvas-tools_template/js/**/*.js',
				'app/shared/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['dist/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['**/*.html', '!bower_components/**'],
					dest: 'dist/',
					filter: 'isFile'
				}, {
					expand: true,
					cwd:'app/shared',
					src: ['images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/shared'
				}, {
					expand: true,
					cwd:'app/canvas-tools_template',
					src: ['images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/canvas-tools_template'
				} , {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/shared/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		uncss: {
			dist: {
				files: {
					'.tmp/concat/shared/css/app.min.css': ['app/**/*.html', '!app/bower_components/**']
				}
			}
		},
		
		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['app/**/*.html', '!app/bower_components/**'],
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/**/*.html', '!app/bower_components/**'],
			css: ['dist/canvas-tools_template/css/**/*.css', 'dist/shared/css/**/*.css'],
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: ['app/shared/scss/**/*.scss', 'app/canvas-tools_template/scss/**/*.scss'],
				tasks: ['sass']
			},
			livereload: {
				files: ['app/**/*.html', '!app/bower_components/**', 'app/shared/js/**/*.js', 'app/canvas-tools_template/js/**/*.js', 'app/shared/css/**/*.css', 'app/canvas-tools_template/css/**/*.css', 'app/shared/images/**/*.{jpg,gif,svg,jpeg,png}', 'app/canvas-tools_template/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: 'app/',
					livereload: true
				}
			},
			dist: {
				options: {
					port: 9001,
					base: 'dist/',
					keepalive: true,
					livereload: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin']);

};