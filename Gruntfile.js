module.exports = function(grunt) {
  var srcFiles = ['src/**/*.js'];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
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

    uglify: {
      my_target: {
        files: {
          'public/script.js': ['src/script.js'],
          'public/listener.js': ['src/listener.js'],
          'public/ie8/script.js': ['src/ie8/script.js']
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
          'src/stylesheet.css': 'src/stylesheet.scss',
          'src/ie8/stylesheet.css': 'src/ie8/stylesheet.scss'
        }
      }
    },

    cssmin: {
      my_target: {
        src: 'src/stylesheet.css',
        dest: 'public/stylesheet.css'
      },

      ie8: {
        src: 'src/ie8/stylesheet.css',
        dest: 'public/ie8/stylesheet.css'
      }
    }
  });

  grunt.registerTask('test',  ['jshint', 'jscs']);
  grunt.registerTask('default',  ['test', 'uglify', 'htmlmin', 'cssmin']);
};
