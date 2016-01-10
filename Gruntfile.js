module.exports = function (grunt) {
    grunt.initConfig({

        // live browser injection
        browserSync: {
            bsFiles: {
                src : 'css/site.css'
            },
            options: {
                watchTask: true
            }
        },

        // watch changes to less files
        watch: {
            styles: {
                files: ["less/**/*"],
                tasks: ["less"]
            },
            scripts: {
                files: ["js/**/*"],
                tasks: ["browserify","uglify"]
            },
            options: {
                spawn: false,
            },
        },

        // compile set less files
        less: {
            development: {
                options: {
                    paths: ["less"],
                    sourceMap: true,
                    sourceMapFilename: 'css/site.css.map',
                    sourceMapURL: 'css/site.css.map',
                    compress: true
                },
                files: {
                    "css/site.css": ["less/*.less", "!less/_*.less", "!less/editor.less"]
                }
            }
        },

        browserify: {
            dist: {
                options: {
                   transform: [
                      ["babelify", {
                         loose: "all"
                      }]
                   ]
                },
                files: {
                   // if the source file has an extension of es6 then
                   // we change the name of the source file accordingly.
                   // The result file's extension is always .js
                   "./js/bundle.js": ["./js/app.js"]
                }
            }
        },

        // uglify
        uglify: {
            prod: {
                  files: {
                    'js/bundle.min.js': ['js/bundle.js']
                }
            }
        }

    });

    // Load tasks so we can use them
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // the default task will show the usage
    grunt.registerTask("default", "Prints usage", function () {
        grunt.log.writeln("");
        grunt.log.writeln("Building Base");
        grunt.log.writeln("------------------------");
        grunt.log.writeln("");
        grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
        grunt.log.writeln("* run 'grunt dev' to start watching and compiling LESS changes for development.");
    });

    grunt.registerTask("dev", ["less", "browserify", "browserSync", "watch"]);

};
