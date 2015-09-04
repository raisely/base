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
                files: ['less/**/*'],
                tasks: ['less', 'cssmin'],
                options: {
                   spawn: false
                }
            },
            scripts: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['uglify'],
                options: {
                  spawn: false
                }
            }
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
        },

        // Minify CSS
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css',
              src: ['*.css', '!*.min.css'],
              dest: 'css',
              ext: '.min.css'
            }]
          }
        },

        // Minify Javascript
        uglify: {
            my_target: {
              files: {
                'js/site.min.js': ['js/*.js', '!js/*.min.js']
              }
            }
        }

    });

    // Load tasks so we can use them
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
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

    grunt.registerTask("dev", ["less", "cssmin", "uglify", "browserSync", "watch"]);

};
