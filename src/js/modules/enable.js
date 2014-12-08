'use strict';

var $ = require('jquery');

module.exports = function(selector) {
  // Display buttons
  var $buttons = $(selector + ' .button');
  $buttons.css('display', 'inline-block');
  $buttons.addClass('notouch').addClass('noselect');

  $buttons.mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $buttons.mouseleave(function() {
    $(this).removeClass('active');
  });

  // Enable input
  $(selector + ' input').removeAttr('disabled');

  // Enable listener
  $(selector + ' .listener').css('display', 'inline-block');

  // Enable other non-static elements
  require('./default')();
};
