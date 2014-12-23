   module.exports = function (grunt) {
       grunt.initConfig({

           // live browser injection
           browserSync: {
               bsFiles: {
                   src : 'css/site.css'
               },
               options: {
                   watchTask: true,
                   server: {
                     baseDir: "."
                   }
               }
           },

           // watch changes to less files
           watch: {
               styles: {
                   files: ["less/**/*", "css/*.css"],
                   tasks: ["less", "csslint"]
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
                       compress: false
                     },
                   files: {
                     "css/site.css": ["less/*.less", "!less/_*.less"]
                   }
               }
           },

           // compresses .js files
           uglify: {
             options: {
               mangle: {
                 except: ['jQuery']
               },
               compress: true
             },
             js_files: {
               files: {
                 'js/dest/site.min.js': ['js/src/*.js']
               }
             }
           },

           // minify css files
           cssmin: {
             add_banner: {
               options: {
                 banner: '/* My minified css file */'
               }
             },
             minify: {
               expand: true,
               cwd: 'css/',
               src: ['*.css', '!*.min.css'],
               dest: 'css/dist/',
               ext: '.min.css'
             }
           },

          // lint css
          csslint: {
            options: {
              csslintrc: '.csslintrc'
            },
            strict: {
              options: {
                import: 2
              },
              src: ['css/*.css']
            },
            lax: {
              options: {
                import: false
              },
              src: ['css/*.css']
            }
          }

       });

       // Load tasks so we can use them

         // dev tasks
         grunt.loadNpmTasks("grunt-contrib-watch");
         grunt.loadNpmTasks("grunt-contrib-less");
         grunt.loadNpmTasks('grunt-browser-sync');
         grunt.loadNpmTasks('grunt-contrib-csslint');

         // prod tasks
         grunt.loadNpmTasks('grunt-contrib-uglify');
         grunt.loadNpmTasks('grunt-contrib-cssmin');

       // the default task will show the usage
       grunt.registerTask("default", "Prints usage", function () {
           grunt.log.writeln("");
           grunt.log.writeln("Building Base");
           grunt.log.writeln("------------------------");
           grunt.log.writeln("");
           grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
           grunt.log.writeln("* run 'grunt dev' to start watching and compiling LESS changes for development.");
           grunt.log.writeln("* run 'grunt prod' to minify css and js files for production.");
         });

       grunt.registerTask("dev", ["csslint", "less", "browserSync", "watch"]);
       grunt.registerTask("prod", ["cssmin", "uglify"]);

   };
