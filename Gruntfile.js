'use strict';

module.exports = function(grunt) {
  var srcFiles = ['*.js', 'src/**/*.js'];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-css');

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        preset: 'google'
      }
    },

    browserify: {
      dist: {
        files: {
          'build/script.js': [
            'src/script.js',
            'src/es5/fade.js',
            'src/es5/listener.js',
            'src/es5/observer.js',
            'src/es5/wunderground.js',
            'src/es5/jsweekly.js',
            'src/es5/omdbapi.js',
            'src/es5/catchthemouse.js',
            'src/es5/fibonacci.js',
            'src/es5/catcounter.js',
            'src/es5/publicvsprivate.js'
          ],

          'build/ie8/script.js': [
            'src/ie8/script.js',
            'src/es5/fade.js',
            'src/es5/listener.js',
            'src/ie8/es5/eventobject.js',
            'src/ie8/es5/defaultbehavior.js',
            'src/ie8/es5/computedstyle.js'
          ]
        }
      }
    },

    uglify: {
      target: {
        files: {
          'public/script.js': ['build/script.js'],
          'public/ie8/script.js': ['build/ie8/script.js']
        }
      }
    },

    htmlmin: {
      dist: {
        files: {
          'public/index.html': 'src/index.html',
        },
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      },

      ie8: {
        files: {
          'public/ie8/index.html': 'src/ie8/index.html'
        },
        options: {
          removeComments: true,
          collapseWhitespace: true,
          preserveLineBreaks: true
        }
      }
    },

    sass: {
      dist: {
        files: {
          'build/stylesheet.css': 'src/stylesheet.scss',
          'build/ie8/stylesheet.css': 'src/ie8/stylesheet.scss'
        }
      }
    },

    cssmin: {
      target: {
        src: 'build/stylesheet.css',
        dest: 'public/stylesheet.css'
      },

      ie8: {
        src: 'build/ie8/stylesheet.css',
        dest: 'public/ie8/stylesheet.css'
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'jscs'
  ]);

  grunt.registerTask('default', [
    'test',
    'browserify',
    'uglify',
    'htmlmin',
    'sass',
    'cssmin'
  ]);
};
