// All buttons
$(function() {
  $('.button').mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $('.button').mouseleave(function() {
    $(this).removeClass('active');
  });
});

// Window height and document height
$(function() {
  var MOVE_LENGTH = 50;
  var MOVE_TIME = 300;
  var DIRECTIONS = ['up', 'down', 'left', 'right'];

  var $mouse = $('#mouse');
  var $floor = $('#floor');
  var $playButton = $('#play');

  var xMax = $floor.width() - $mouse.width();
  var yMax = $floor.height() - $mouse.height();
  var idTimer = null;
  var leftOrRight = 'right';
  var scared = 1;

  var boundValue = function(value, max) {
    return value < 0 ? 0 : value > max ? max : value;
  }

  var randomDirection = function() {
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  }

  var current = function(positionProperty) {
    return parseInt($mouse.css(positionProperty));
  }

  var layoutChange = function() {
    $floor.css('height', $(window).height() / 2);
    xMax = $floor.width() - $mouse.width();
    yMax = $floor.height() - $mouse.height();
  }

  var scamper = function() {
    var top = current('top');
    var left = current('left');
    var newTop = top;
    var newLeft = left;
    var direction;

    while (newTop === top && newLeft === left) {
      direction = randomDirection();

      switch (direction) {
        case 'up':
          newTop  -= MOVE_LENGTH * scared;
          direction = leftOrRight + '-' + direction;
          break;
        case 'down':
          newTop  += MOVE_LENGTH * scared;
          direction = leftOrRight + '-' + direction;
          break;
        case 'left':
          newLeft -= MOVE_LENGTH * scared;
          leftOrRight = direction;
          break;
        case 'right':
          newLeft += MOVE_LENGTH * scared;
          leftOrRight = direction;
          break;
      }

      newTop = boundValue(newTop, yMax);
      newLeft = boundValue(newLeft, xMax);
    }

    $mouse.css('background-image', 'url("' + direction + '.gif")');
    scared = 1;

    if (newTop !== top) {
      $mouse.animate({top: newTop}, MOVE_TIME);
    }

    if (newLeft !== left) {
      $mouse.animate({left: newLeft}, MOVE_TIME);
    }
  };

  $mouse.css('top', 0);
  $mouse.css('left', 0);

  $playButton.click(function() {
    if (!idTimer) {
      layoutChange();
      $playButton.addClass('disabled');
      idTimer = setInterval(scamper, MOVE_TIME + 10);
    }
  });

  $mouse.click(function(event) {
    if (idTimer) {
      clearInterval(idTimer);
      idTimer = null;
      $mouse.css('background-image', 'url("win.gif")');
      $playButton.removeClass('disabled');
      event.stopPropagation();
    }
  });

  $floor.click(function() {
    if (idTimer) {
      scared = 10;
    }
  })

  $(window).on('resize', function() {
    if (idTimer) {
      layoutChange();
    }
  });
});

// DOM element in jQuery object
$(function() {
  $('#domElem').text($('#domElem').text() +
    '\n' + $('#jsLinks li').first()[0].textContent);
});

// Computed style
$(function() {
  var marginLeft = parseInt(
    getComputedStyle(document.body, null).marginLeft);

  $('#marginLeft').text($('#marginLeft').text() +
    '\n' + marginLeft + 'px');
});

// Memoization in Closure
$(function() {
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
});

// Event listeners and handlers
$(function() {
  listener($('#click1')).jQueryEvent(
    'click', '#click1');

  listener($('#click2')).domEventListener(
    'click', document.getElementById('click2'));

  listener($('#click3')).domEventHandler(
    'click', document.getElementById('click3'));
});

// Mutation Observers
$(function() {
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
});

// Cat Counter
$(function() {
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

    $element.click(function(event) {
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
          $('#cats').append('<div class="cat"></div>');
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
    if (!$(this).hasClass('disabled')) {
      $('#cats > div').remove();
      catCounter(counter.getValue(), 2000, $(this));
      fade($(this), [true, false, false], 1500);
    }
  });
});

// Public vs. private
$(function() {
  var counter = function($element) {
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
});

// Objects by reference
$(function() {
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
});

// Timestamp
$(function() {
  $('#timestamp').text(document.lastModified);
});
