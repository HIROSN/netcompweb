'use strict';

module.exports = function() {
  var listener = require('../listener');

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

  listener($('#click4'))
  .jQueryEvent('click', '#noLinks')
  .callback = function(event) {
    blockLink(event);
  };

  listener($('#click5'))
  .domEventListener('click', document.getElementById('noLinks'))
  .callback = function(event) {
    blockLink(event);
  };

  listener($('#click6'))
  .domEventHandler('click', document.getElementById('noLinks'))
  .callback = function(event) {
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
};
