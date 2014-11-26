(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function($element, rgb, msec) {
  var level = 1;
  var step;
  msec = (msec || 400) / 16;

  step = function() {
    var hex = level.toString(16);
    var color = '#';
    var i;

    for (i = 0; i < 3; i++) {
      if (rgb[i]) {
        color += hex + hex;
      }
      else {
        color += 'FF';
      }
    }

    $element.css('background-color', color);

    if (level++ < 15) {
      setTimeout(step, msec);
    }
    else {
      $element.removeAttr('style').
        css('display', 'inline-block');
    }
  };

  setTimeout(step, msec);
};

},{}],2:[function(require,module,exports){
'use strict';

$(document).ready(function() {
  var listener = require('../listener');
  var showNodes;
  var getTarget;

  // Timestamp
  $('#timestamp').text(document.lastModified);

  // Enable elements
  $('input').removeAttr('disabled');

  // Whitespace nodes in children of ul element
  showNodes = function() {
    var parent = document.getElementById('list');
    var child = parent.firstChild;
    var name;
    $('#nodes > div').remove();

    while (child) {
      name = child.tagName || child.nodeName;

      switch (name) {
      case '#text':
        $('#nodes').append('<div class="text">&nbsp;</div>');
        break;
      case 'LI':
        $('#nodes').append('<div class="item">li</div>');
        break;
      }

      child = child.nextSibling;
    }
  };

  showNodes();
  $('#page').append('<p>' + navigator.userAgent + '</p');

  // Event listeners and handlers
  getTarget = function(event) {
    var target;
    event = event || window.event;

    if (event) {
      target = event.target || event.srcElement;
    }

    return target;
  };

  listener($('#click1')).jQueryEvent(
    'click', '#click1');

  listener($('#click2')).domEventListener(
    'click', document.getElementById('click2'));

  listener($('#click3')).domEventHandler(
    'click', document.getElementById('click3'));

  listener($('#input1')).jQueryEvent(
    'input', '#grocery');

  listener($('#input2')).domEventListener(
    'input', document.getElementById('grocery'));

  listener($('#input3')).domEventHandler(
    'input', document.getElementById('grocery'));

  $('#grocery').on('keyup', function(event) {
    var grocery;

    if (event.which == 13) {
      grocery = $(this).val();
      $(this).val('');

      if (grocery) {
        $('<li class="grocery">' + grocery + '</li>').
          hide().
          appendTo($('#list')).
          slideDown('fast', function() {
            showNodes();
          });
      }
    }
  });

  $('#list').on('click', 'li', function() {
    var $this = $(this);

    $this.slideUp('fast', function() {
      $this.remove();
      showNodes();
    });
  });

  // Event object
  (function() {
    var showId = function($element, event) {
      var target = getTarget(event);

      if (target) {
        $element.html(
          event.type + '<br>[id: ' + target.id + ']');
      }
    };

    listener($('#mouseover1')).
      jQueryEvent('mouseover', '#howTo').
      callback = function(event) {
        showId(this.getElement(), event);
      };

    listener($('#mouseover2')).
      domEventListener('mouseover', document.getElementById('howTo')).
      callback = function(event) {
        showId(this.getElement(), event);
      };

    listener($('#mouseover3')).
      domEventHandler('mouseover', document.getElementById('howTo')).
      callback = function(event) {
        showId(this.getElement(), event);
      };
  }());

  // Changing default behavior
  (function() {
    var blockLink = function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    };

    var followLink = function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    };

    var ie = document.getElementById('IE');

    listener($('#click4')).
      jQueryEvent('click', '#noLinks').
      callback = function(event) {
        blockLink(event);
      };

    listener($('#click5')).
      domEventListener('click', document.getElementById('noLinks')).
      callback = function(event) {
        blockLink(event);
      };

    listener($('#click6')).
      domEventHandler('click', document.getElementById('noLinks')).
      callback = function(event) {
        blockLink(event);
      };

    if (ie.addEventListener) {
      ie.addEventListener('click', function(event) {
        followLink(event);
      }, false);
    }

    if (ie.attachEvent) {
      ie.attachEvent('onclick', function(event) {
        followLink(event);
      });
    }
  }());

  // Computed style
  (function() {
    var resizeCatImages = function() {
      var list = document.getElementById('catImages');
      var $images = $('#catImages > li > img');
      var numberOfCats = $images.length;
      var width;
      var height;

      if (window.getComputedStyle) {
        width = parseInt(window.getComputedStyle(list, null).width);
      }
      else {
        width = list.clientWidth;
      }

      width -= 2 * numberOfCats + 1;
      width = Math.floor(width / numberOfCats);
      height = Math.floor(width * 0.8);
      $images.width(width).height(height);
    };

    resizeCatImages();

    $(window).on('resize', function() {
      resizeCatImages();
    });

    $('#catImages').on('click', 'li', function() {
      var $li = $(this);

      $li.fadeOut('fast', function() {
        $li.appendTo($li.parent()).
          fadeIn('fast');
      });
    });
  }());
});

},{"../listener":3}],3:[function(require,module,exports){
'use strict';

module.exports = function($element) {
  var fade = require('./fade');
  var instance = {
    callback: function() {},

    getElement: function() {
      return $element;
    },

    jQueryEvent: function(name, source) {
      $(document).on(name, source, blink);
      return this;
    },

    domEventListener: function(name, source) {
      if (source.addEventListener) {
        source.addEventListener(name, blink, false);
      }
      return this;
    },

    domEventHandler: function(name, source) {
      if (source.attachEvent) {
        source.attachEvent('on' + name, blink);
      }
      return this;
    }
  };

  var blink = function(event) {
    if (!instance.callback(event)) {
      fade($element, [false, false, true]);
    }
  };

  $element.addClass('notouch').addClass('noselect');

  return instance;
};

$(function() {
  $('.listener').css('display', 'inline-block');
});

},{"./fade":1}]},{},[2,1,3]);
