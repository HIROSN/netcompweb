'use strict';

$.prototype.fade = function($element, rgb, msec) {
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

$.prototype.listener = function($element) {
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
      $.fade($element, [false, false, true]);
    }
  };

  $element.addClass('notouch').addClass('noselect');

  return instance;
};

$.prototype.observer = function($element) {
  var mutationObserver;

  var instance = {
    callback: function() {},

    getElement: function() {
      return $element;
    },

    observe: function(source) {
      if (mutationObserver) {
        mutationObserver.observe(source, {childList: true});
        return true;
      }

      return false;
    }
  };

  if (typeof MutationObserver === 'function') {
    mutationObserver = new MutationObserver(function(mutations) {
      if (!instance.callback(mutations)) {
        $.fade($element, [false, false, true]);
      }
    });
  }
  else {
    $element.addClass('disabled');
  }

  $element.addClass('notouch').addClass('noselect');

  return instance;
};

$(function() {
  $('.listener').css('display', 'inline-block');
});