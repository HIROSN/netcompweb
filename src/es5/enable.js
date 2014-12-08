'use strict';

var $ = require('jquery');

module.exports = function() {
  // Timestamp
  $('#timestamp').text(document.lastModified);

  // Display buttons
  var $buttons = $('.button');
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

  // Enable other non-static elements
  $('input').removeAttr('disabled');
  $('.js').removeClass('js');
  $('textarea.code').addClass('notouch');
};
