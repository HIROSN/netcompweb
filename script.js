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

  // Computed style
  (function() {
    var resizeCatImages = function() {
      var list = document.getElementById('catImages');
      var images = $('#catImages > li > img');
      var numberOfCats = images.length;
      var width = parseInt(getComputedStyle(list, null).width);
      var height;

      width -= 2 * numberOfCats;
      width = Math.floor(width / numberOfCats);
      height = Math.floor(width * 0.8);
      images.width(width).height(height);
    };

    resizeCatImages();

    $(window).on('resize', function() {
      resizeCatImages();
    });

    $('#catImages > li > img').click(function(event) {
      var item = $(event.target).parent();
      var list = $(item).parent();
      list.append(item);
    });
  }());

  // Memoization in Closure
  (function() {
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
  }());

  // Event listeners and handlers
  (function() {
    listener($('#click1')).jQueryEvent(
      'click', '#click1');

    listener($('#click2')).domEventListener(
      'click', document.getElementById('click2'));

    listener($('#click3')).domEventHandler(
      'click', document.getElementById('click3'));
  }());

  // Mutation Observers
  (function() {
    var catObserver = observer($('#catObserver'));

    catObserver.callback = function(mutations) {
      var added = 0;
      var removed = 0;

      mutations.forEach(function(mutation) {
        added += mutation.addedNodes.length;
        removed += mutation.removedNodes.length;
      });

      this.getElement().html(added + ' added<br>' + removed + ' removed');
    };

    if (!catObserver.observe(document.getElementById('cats')))
    {
      $('#ua').text(navigator.userAgent);
    }
  }());

  // Cat Counter
  (function() {
    var startButton;
    var counterButton;
    var counter;
    var catCounter;

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

      element.click(function(event) {
        instance.increment();
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

    startButton.click(function() {
      if (!$(this).hasClass('disabled')) {
        $('#cats > div').remove();
        catCounter(counter.getValue(), 2000, $(this));
        fade($(this), [true, false, false], 1500);
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

});
