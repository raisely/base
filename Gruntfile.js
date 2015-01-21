module.exports = function (grunt) {

	grunt.initConfig({

	// Live browser injection
	browserSync: {
		bsFiles: {
			src : ["css/site.css", "js/*.js"]
		}
	},

	// Watch changes to files
	watch: {
		styles: {
			files: ["less/**/*.less", "js/**/*.js"],
			tasks: ["less", "minified"]
		},
		options: {
			spawn: false,
		},
	},

	// Compile set less files
	less: {
		development: {
			options: {
				paths: ["less"],
				sourceMap: true,
				sourceMapFilename: "css/site.css.map",
				sourceMapURL: "css/site.css.map"
			},
			files: {
				"css/site.css": ["less/*.less", "!less/_*.less"]
			}
		},
		production: {
			options: {
				paths: ["less"],
				sourceMap: false,
				cssmin: true
			},
			files: {
				"css/site.css": ["less/*.less", "!less/_*.less"]
			}
		}
	},

	// Compress .js files
	minified : {
		files: {
			src: [ 'js/*.js', '!js/*.min.js', '!js/vendor/**/*.js', '!js/**/_*.js'],
			dest: 'js/'
		},
		options : {
			allinone: false,
			ext: '.min.js'
		}
	}

	});

	// Load modules
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-browser-sync");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-minified');

	// The default task prints usage
	grunt.registerTask("default", "Prints usage", function () {
		grunt.log.writeln("");
		grunt.log.writeln("Building Base");
		grunt.log.writeln("------------------------");
		grunt.log.writeln("");
		grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
		grunt.log.writeln("* run 'grunt dev' to start watching and compiling LESS changes for development.");
		grunt.log.writeln("* run 'grunt prod' to minify css and js files for production.");
	});

	// Create our tasks
	grunt.registerTask("dev", ["less:development", "minified", "watch", "browserSync"]);
	grunt.registerTask("prod", ["minified", "less:production"]);

};
