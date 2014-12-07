'use strict';

module.exports = function() {
  var listener = require('../../es5/listener');

  var getTarget = function(event) {
    var target;
    event = event || window.event;

    if (event) {
      target = event.target || event.srcElement;
    }

    return target;
  };

  var showId = function($element, event) {
    var target = getTarget(event);

    if (target) {
      $element.html(
        event.type + '<br>[id: ' + target.id + ']');
    }
  };

  listener($('#mouseover1'))
  .jQueryEvent('mouseover', '#howTo')
  .callback = function(event) {
    showId(this.getElement(), event);
  };

  listener($('#mouseover2'))
  .domEventListener('mouseover', document.getElementById('howTo'))
  .callback = function(event) {
    showId(this.getElement(), event);
  };

  listener($('#mouseover3'))
  .domEventHandler('mouseover', document.getElementById('howTo'))
  .callback = function(event) {
    showId(this.getElement(), event);
  };
};
