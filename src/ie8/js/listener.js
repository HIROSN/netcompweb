'use strict';

/* global $: false */

module.exports = function($element) {
  var fade = require('../../js/modules/fade');
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
