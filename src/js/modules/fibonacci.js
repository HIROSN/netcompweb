'use strict';

var $ = require('jquery');

module.exports = function() {
  var fibonacci = function() {
    var cache = [0, 1];

    return function fib(n) {
      var r;

      if (n >= 0) {
        r = cache[n];

        if (typeof r !== 'number') {
          r = fib(n - 1) + fib(n - 2);
          cache[n] = r;
        }
      }

      return r;
    };
  }();

  var showAnswer = function(n) {
    var answer;

    if (typeof n === 'number') {
      answer = fibonacci(n);
    }

    if (typeof answer !== 'number') {
      answer = '?';
    }

    $('#fibans').text(answer);
  };

  $('#fibn').on('focus', function() {
    $(this).val('');
    showAnswer();
  });

  $('#fibn').on('blur', function() {
    showAnswer(+$(this).val());
  });

  $('#fibn').on('keyup', function(event) {
    if (event.which == 13) {
      showAnswer(+$(this).val());
      $(this).blur();
    }
  });

  require('./enable')('#article-fibonacci');
};
