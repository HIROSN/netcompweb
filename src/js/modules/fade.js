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
      } else {
        color += 'FF';
      }
    }

    $element.css('background-color', color);

    if (level++ < 15) {
      setTimeout(step, msec);
    } else {
      $element.removeAttr('style')
      .css('display', 'inline-block');
    }
  };

  setTimeout(step, msec);
};
