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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
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

    clean: {
      src: ['public/']
    },

    copy: {
      images: {
        cwd: 'src/images/',
        expand: true,
        src: ['**/*.*'],
        dest: 'public/images/'
      },

      ie8_css: {
        cwd: 'src/ie8/css/',
        expand: true,
        src: ['**/*.*'],
        dest: 'public/ie8/'
      }
    },

    html2js: {
      options: {
        base: 'src/html',
        module: 'webApp.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['src/html/**/*.html'],
        dest: 'build/templates.js'
      },
    },

    browserify: {
      build: {
        files: {
          'build/script.js': [
            'src/script.js',
            'src/js/modules/*.js',
            'src/js/directives/*.js',
            'build/templates.js'
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
    'clean',
    'copy',
    'html2js',
    'browserify',
    'uglify',
    'htmlmin',
    'sass',
    'cssmin',
    'karma'
  ]);
};
