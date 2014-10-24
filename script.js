// All elements
$(function() {
  var $buttons = $('.button');

  $buttons.mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $buttons.mouseleave(function() {
    $(this).removeClass('active');
  });

  $buttons.css('display', 'inline-block');
  $('input').removeAttr('disabled');
  $('.js').removeClass('js');
});

// JavaScript Weekly
$(function() {
  var dfd = $.Deferred();
  var $message = $('#jsweekly-links > li:first');
  $message.text('Loading...');

  $.ajax({
    url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0',
    data: {q: 'http://javascriptweekly.com/rss/1i29bb1p'},
    dataType: 'jsonp',
    success: dfd.resolve,
    error: dfd.reject
  });

  dfd.promise().then(function(results) {
    var latest = results &&
      results.responseData &&
      results.responseData.feed &&
      results.responseData.feed.entries &&
      results.responseData.feed.entries.length &&
      results.responseData.feed.entries[0];

    if (latest) {
      $('#jsweekly > a').attr('href', latest.link);
      $('#jsweekly-latest-content').html(latest.content);
      $message.detach();

      $('#jsweekly-latest-content > table div > a').each(function() {
        var $link = $(this);

        if ($link.css('display') === 'block' &&
            $link.css('text-decoration') === 'underline') {
          $link.removeAttr('style').
            attr('target', '_blank');
          $('<li></li>').html($link).
            appendTo($('#jsweekly-links'));
        }
      });
    }
    else {
      $message.text(results.responseDetails);
    }
  }).fail(function(results) {
    $message.text(results.status + ' - ' + results.statusText);
    console.log(results);
  }).always(function() {
    $message.css('color', 'red');
  });
});

// jQuery Ajax, JSONP and Handlebars
$(function() {
  var searchMovie = function(title) {
    var dfd = $.Deferred();

    $.ajax({
      url: 'http://www.omdbapi.com/',
      data: {s: title},
      dataType: 'jsonp',
      success: dfd.resolve,
      error: dfd.reject
    });

    return dfd.promise();
  };

  $('#movie-title').on('blur', function() {
    var input = this;
    var title = $(input).val();

    $('#movies > li').slideUp('fast', function() {
      $(this).remove();
    });

    if (title) {
      input.disabled = true;

      searchMovie(title).then(function(results) {
        var template = Handlebars.compile($('#movies-template').html());

        $(template(results)).
          hide().
          appendTo($('#movies')).
          slideDown('fast');
      }).always(function() {
        input.disabled = false;
      });
    }
  }).on('keydown', function(event) {
    if (event.which == 13) {
      $(this).blur();
    }
  }).on('focus', function() {
    $(this).val('');
  });
});

// No touch feedback / text selection
$(function() {
  $('.button').addClass('notouch').addClass('noselect');
  $('textarea.code').addClass('notouch');
});

// Window height and document height
$(function() {
  var MOVE_LENGTH = 50;
  var MOVE_TIME = 300;
  var DIRECTIONS = ['up', 'down', 'left', 'right'];
  var PRELOADIMAGES = ['right', 'right-up', 'right-down', 'left', 'left-up',
    'left-down', 'win'];

  var $mouse = $('#mouse');
  var $floor = $('#floor');
  var $playButton = $('#play');

  var xMax = $floor.width() - $mouse.width();
  var yMax = $floor.height() - $mouse.height();
  var idTimer = null;
  var leftOrRight = 'right';
  var imageName = leftOrRight;
  var scared = 1;

  var boundValue = function(value, max) {
    return value < 0 ? 0 : value > max ? max : value;
  };

  var randomDirection = function() {
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  };

  var current = function(positionProperty) {
    return parseInt($mouse.css(positionProperty));
  };

  var layoutChange = function() {
    $floor.animate({height: $(window).height() / 2}, function() {
      xMax = $floor.width() - $mouse.width();
      yMax = $floor.height() - $mouse.height();
    });
  };

  var preloadImages = function() {
    var $preload = $('#mouse-preload');
    var i;

    if ($preload.children().length === 0) {
      for (i = 0; i < PRELOADIMAGES.length; i++) {
        $preload.append($('<div></div>', {
          class: 'mouse-preload mouse-' + PRELOADIMAGES[i]
        }));
      }
    }
  };

  var setImage = function(newName, oldName) {
    if (oldName) {
      $mouse.removeClass('mouse-' + oldName);
    }

    $mouse.addClass('mouse-' + newName);
    imageName = newName;
  };

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

    setImage(direction, imageName);
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
  setImage(imageName);

  $playButton.click(function() {
    if (!idTimer) {
      layoutChange();
      $playButton.addClass('disabled');
      preloadImages();
      idTimer = setInterval(scamper, MOVE_TIME + 10);
    }
  });

  $mouse.click(function(event) {
    if (idTimer) {
      clearInterval(idTimer);
      idTimer = null;
      leftOrRight = 'right';
      setImage('win', imageName);
      $playButton.removeClass('disabled');
      event.stopPropagation();
    }
    else {
      leftOrRight = current('left') > xMax / 2 ? 'left' : 'right';
      setImage(leftOrRight, imageName);
    }
  });

  $floor.click(function(event) {
    var offset;
    var x;
    var y;

    if (idTimer) {
      offset = $mouse.offset();
      x = Math.abs(offset.left + current('width') / 2 - event.pageX);
      y = Math.abs(offset.top + current('height') / 2 - event.pageY);

      if (x < MOVE_LENGTH * 2 && y < MOVE_LENGTH * 2) {
        scared = 10;
      }
    }
  });

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

  if (!catObserver.observe(document.getElementById('cats'))) {
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
          $('<div></div>', {class: 'cat'}).
            hide().
            appendTo($('#cats')).
            slideDown('fast');
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

      $('#cats > div').slideUp('fast', function() {
        $(this).remove();
      });

      catCounter(counter.getValue(), 2000, $(this));
      fade($(this), [true, false, false], 1500);
    }
  });
});

// Public vs. private
$(function() {
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
