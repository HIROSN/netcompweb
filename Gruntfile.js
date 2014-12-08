'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    '**/*.js',
    '!node_modules/**/*',
    '!build/**/*',
    '!public/**/*',
    '!test/browser/**/*'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-karma');

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
            'src/js/modules/*.js',
            'src/js/directives/*.js'
          ],

          'build/ie8/script.js': [
            'src/ie8/script.js',
            'src/js/modules/fade.js',
            'src/ie8/js/*.js'
          ]
        }
      },

      test_browser: {
        files: {
          'test/browser/browser_unit_tests.js': [
            'src/js/modules/*.js',
            'src/ie8/js/*.js',
            'test/browser/unit/*.js'
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
        files: {'public/index.html': 'src/index.html'},
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      },

      public_src_html: {
        files: [{
          expand: true,
          cwd: 'src/html/',
          src: '**/*.html',
          dest: 'public/'
        }],
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
    },

    karma: {
      options: {
        files: [
          'node_modules/jquery/dist/jquery.js',
          'test/browser/browser_unit_tests.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        logLevel: 'INFO',
        plugins : [
          'karma-jasmine',
          'karma-phantomjs-launcher'
        ],
        reporters: 'dots'
      },
      unit: {
        singleRun: true
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
    'cssmin',
    'karma'
  ]);
};
