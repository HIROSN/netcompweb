$(document).ready(function() {

  // Timestamp
  $('#timestamp').text(document.lastModified);

  // All buttons
  $('.button').mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $('.button').mouseleave(function() {
    $(this).removeClass('active');
  });

  // Objects by reference
  (function() {
    var log;
    var isBobSmiling = false;

    var bob = {
      smiling: false
    };

    (function smile(smiling, person) {
      smiling = true;
      person.smiling = true;
    }(isBobSmiling, bob));

    log = '\n' + isBobSmiling + ' Object {smiling: ' + bob.smiling + '}';
    $('#bob').text($('#bob').text() + log);
  }());

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
    counter = function(count, max, element) {
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
        element.text(count + ' cats');
      };

      update();

      element.click(function() {
        counter.increment();
      });

      return instance;
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

  // Public vs. private
  (function() {
    var counter = function(element) {
      var instance = {
        // Public property
        unit: '',

        // Public method
        increment: function() {
          ++count;
          update();
        }
      };

      // Private property
      var count = 0;

      // Private method
      var update = function() {
        element.text(count + ' ' + instance.unit);
      };

      return instance;
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
