module.exports = function(grunt) {
  var srcFiles = ['src/**/*.js'];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

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
          'public/ie8/index.html': 'src/ie8/index.html'
        },
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      }
    },

    cssmin: {
      my_target: {
        files: {
          'public/stylesheet.css': ['src/stylesheet.css'],
          'public/ie8/stylesheet.css': ['src/ie8/stylesheet.css']
        }
      }
    }
  });

  grunt.registerTask('test',  ['jshint', 'jscs']);
  grunt.registerTask('default',  ['test', 'uglify', 'htmlmin', 'cssmin']);
};
