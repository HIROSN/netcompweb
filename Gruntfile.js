'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    '**/*.js',
    '!node_modules/**/*',
    '!build/**/*',
    '!public/**/*'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
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
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties'
      }
    },

    simplemocha: {
      src: ['test/misc/**/*.js']
    },

    browserify: {
      build: {
        files: {
          'build/script.js': [
            'src/script.js',
            'src/es5/*.js'
          ],

          'build/ie8/script.js': [
            'src/ie8/script.js',
            'src/es5/fade.js',
            'src/es5/listener.js',
            'src/ie8/es5/*.js'
          ]
        }
      }
    },

    uglify: {
      public: {
        files: {
          'public/script.js': ['build/script.js'],
          'public/ie8/script.js': ['build/ie8/script.js']
        }
      }
    },

    htmlmin: {
      public: {
        files: {
          'public/index.html': 'src/index.html',
        },
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      },

      public_ie8: {
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
      build: {
        files: {
          'build/stylesheet.css': 'src/stylesheet.scss',
          'build/ie8/stylesheet.css': 'src/ie8/stylesheet.scss'
        }
      }
    },

    cssmin: {
      public: {
        src: 'build/stylesheet.css',
        dest: 'public/stylesheet.css'
      },

      public_ie8: {
        src: 'build/ie8/stylesheet.css',
        dest: 'public/ie8/stylesheet.css'
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'simplemocha',
    'browserify',
    'uglify',
    'htmlmin',
    'sass',
    'cssmin'
  ]);
};
