'use strict';

module.exports = function($element) {
  var fade = require('./fade');
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
        fade($element, [false, false, true]);
      }
    });
  }
  else {
    $element.addClass('disabled');
  }

  $element.addClass('notouch').addClass('noselect');

  return instance;
};
