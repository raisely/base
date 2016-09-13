module.exports = grunt => {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		browserSync: {
			bsFiles: {
                src: [
                    'css/*.css',
                    'js/*.js',
                    '*.html'
                ]
            },
			options: {
				watchTask: true,
	            proxy: "base.dev"
	        }
		},
		// watch changes to SASS and JS files
		watch: {
			styles: {
				files: ['scss/**/*'],
				tasks: ['sass', 'autoprefixer'],
				options: {
				   spawn: false
				}
			},
			scripts: {
				files: ['js/**/*.js'],
				tasks: ['browserify', 'uglify'],
				options: {
				  spawn: false
				}
			}
		},

		sass: {
			options: {
				sourceMap: true,
				sourceMapFilename: 'css/site.min.css.map',
                sourceMapURL: 'site.min.css.map',
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'css/site.min.css': 'scss/base.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9'],
				map: true
			},
			dist: {
				files: {
					'css/site.min.css': 'css/site.min.css'
				}
			}
		},
		browserify: {
			dist: {
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: [
                        ["babelify",{
                            presets: ['es2015']
                        }]
                    ]
				},
				files: {
				   "js/site.min.js": ["js/site.js"]
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'js/site.min.js': ['js/site.min.js']
				}
			}
		}

	});

	grunt.registerTask("default", "Prints usage", function () {
		grunt.log.writeln("");
		grunt.log.writeln("Building Base");
		grunt.log.writeln("------------------------");
		grunt.log.writeln("");
		grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
		grunt.log.writeln("* run 'grunt dev' to start watching and compiling SASS and JS changes for development.");
	});

	grunt.registerTask('dev', ['sass', 'autoprefixer', 'browserSync', 'watch']);
	grunt.registerTask('prod', ['sass', 'autoprefixer', 'browserify', 'uglify']);
}