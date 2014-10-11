$(document).ready(function() {

  // All buttons
  $('.button').mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $('.button').mouseleave(function() {
    $(this).removeClass('active');
  });

  // Cat Counter
  (function() {
    var startButton;
    var counterButton;
    var counter;
    var catCounter;
    var fade;

    startButton = $('#start');
    counterButton = $('#counter');

    /*
    class Counter {
    public:
      Counter(int c, Element e);
      void increment();
      int getValue();
    private:
      void update();
    private:
      int count;
      Element element;
    };

    Counter counter(5, counterButton);
    */
    counter = function(count, max, element) {
      var update = function() {
        element.text(count + ' cats');
      };

      update();

      element.click(function() {
        counter.increment();
      });

      return {
        increment: function() {
          count = ++count % (max + 1);
          update();
        },

        getValue: function() {
          return count;
        }
      };
    }(5, 10, counterButton);

    /*
    setInterval callback function has access to idTimer for free. Lifetime of
    idTimer is until it is cleared and even after this function returns.
    */
    catCounter = function(maxCats, msec, element) {
      var count = 0;
      var idTimer;

      if (count < maxCats) {
        idTimer = setInterval(function() {
          if (count++ < maxCats) {
            $('#cats').append('<div class="cat"></div>');
          }

          if (count >= maxCats) {
            clearInterval(idTimer);
            element.removeClass('disabled');
          }
        }, msec);

        element.removeClass('active');
        element.addClass('disabled');
      }
    };

    fade = function(element) {
      var level = 1;
      var step = function() {
        var hex = level.toString(16);
        element.css('background-color', '#' + hex + hex + 'FFFF');

        if (level < 15) {
          level += 1;
          setTimeout(step, 100);
        }
        else {
          element.removeAttr('style');
        }
      };

      setTimeout(step, 100);
    };

    startButton.click(function() {
      if (!$(this).hasClass('disabled')) {
        $('#cats > div').remove();
        catCounter(counter.getValue(), 2000, $(this));
        fade($(this));
      }
    });
  }());

  // Private vs. public
  (function() {
    var counter = function(element) {
      var count = 0;

      var update = function(unit) {
        element.text(count + ' ' + unit);
      };

      return {
        unit: '',

        increment: function() {
          ++count;
          update(this.unit);
        }
      };
    };

    var catButton = $('#catButton');
    var dogButton = $('#dogButton');
    var catCounter = counter(catButton);
    var dogCounter = counter(dogButton);
    catCounter.unit = 'cats';
    dogCounter.unit = 'dogs';

    catButton.click(function() {
      catCounter.increment();
    });

    dogButton.click(function() {
      dogCounter.increment();
    });
  }());

});
