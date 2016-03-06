'use strict';

var $ = require('jquery');

module.exports = function() {
  var counter = function($element) {
    function Counter() {
      // Public property
      this.unit = '';
    }

    // Public method
    Counter.prototype.increment = function() {
      ++count;
      update();
    };

    var instance = new Counter();

    // Private property
    var count = 0;

    // Private method
    var update = function() {
      $element.text(count + ' ' + instance.unit);
    };

    return instance;
  };

  var $catButton = $('#catButton');
  var $dogButton = $('#dogButton');
  var catCounter = counter($catButton);
  var dogCounter = counter($dogButton);
  catCounter.unit = 'cats';
  dogCounter.unit = 'dogs';

  $catButton.click(function() {
    catCounter.increment();
  });

  $dogButton.click(function() {
    dogCounter.increment();
  });

  require('./enable')('#article-publicvsprivate');
};
