'use strict';

module.exports = function() {
  var $startButton;
  var $counterButton;
  var counter;
  var catCounter;

  $startButton = $('#start');
  $counterButton = $('#counter');

  /*
  class Counter {
  public:
    Counter(int c, int m, Element e);
    void increment();
    int getValue();
  private:
    void update();
  private:
    int count;
    int max;
    Element element;
  };

  Counter counter(5, 10, counterButton);
  */
  counter = function(count, max, $element) {
    var instance = {
      increment: function() {
        count = ++count % (max + 1);
        update();
      },

      getValue: function() {
        return count;
      }
    };

    var update = function() {
      $element.text(count + ' cats');
    };

    update();

    $element.click(function() {
      instance.increment();
    });

    return instance;
  }(5, 10, $counterButton);

  /*
  setInterval callback function has access to idTimer for free. Lifetime of
  idTimer is until it is cleared and even after this function returns.
  */
  catCounter = function(maxCats, msec, $element) {
    var count = 0;
    var idTimer;

    if (count < maxCats) {
      idTimer = setInterval(function() {
        if (count++ < maxCats) {
          $('<div></div>', {class: 'cat'})
          .hide()
          .appendTo($('#cats'))
          .slideDown('fast');
        }

        if (count >= maxCats) {
          clearInterval(idTimer);
          $element.removeClass('disabled');
        }
      }, msec);

      $element.removeClass('active');
      $element.addClass('disabled');
    }
  };

  $startButton.click(function() {
    var fade = require('./fade');

    if (!$(this).hasClass('disabled')) {

      $('#cats > div').slideUp('fast', function() {
        $(this).remove();
      });

      catCounter(counter.getValue(), 2000, $(this));
      fade($(this), [true, false, false], 1500);
    }
  });
};
