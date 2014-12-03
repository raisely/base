module.exports = function (grunt) {
    grunt.initConfig({

        styleinjector: {
            files: {
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
            options: {
                spawn: false,
            },
        },

        // compile set less files
        less: {
            development: {
                options: {
                    paths: ["less"],
                },
                files: {
                    "css/site.css": ["less/*.less", "!less/_*.less"]
                }
            }
        },

    });

    // Load tasks so we can use them
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-style-injector');

    // the default task will show the usage
    grunt.registerTask("default", "Prints usage", function () {
        grunt.log.writeln("");
        grunt.log.writeln("Using Base");
        grunt.log.writeln("------------------------");
        grunt.log.writeln("");
        grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
        grunt.log.writeln("* run 'grunt dev' to start watching and compiling LESS changes.");
    });

    grunt.registerTask("dev", ["less:development", "styleinjector", "watch:styles"]);
};
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
                    "css/site.css": ["less/*.less", "!less/_*.less"]
                }
            }
        }

    });

    // Load tasks so we can use them
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-browser-sync');

    // the default task will show the usage
    grunt.registerTask("default", "Prints usage", function () {
        grunt.log.writeln("");
        grunt.log.writeln("Building Base");
        grunt.log.writeln("------------------------");
        grunt.log.writeln("");
        grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
        grunt.log.writeln("* run 'grunt dev' to start watching and compiling LESS changes for development.");
    });

    grunt.registerTask("dev", ["less", "browserSync", "watch"]);

};
