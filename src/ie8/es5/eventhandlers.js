'use strict';

module.exports = function() {
  var listener = require('../../es5/listener');
  var showNodes = require('./shownodes');

  listener($('#click1'))
  .jQueryEvent('click', '#click1');

  listener($('#click2'))
  .domEventListener('click', document.getElementById('click2'));

  listener($('#click3'))
  .domEventHandler('click', document.getElementById('click3'));

  listener($('#input1'))
  .jQueryEvent('input', '#grocery');

  listener($('#input2'))
  .domEventListener('input', document.getElementById('grocery'));

  listener($('#input3'))
  .domEventHandler('input', document.getElementById('grocery'));

  $('#grocery').on('keyup', function(event) {
    var grocery;

    if (event.which == 13) {
      grocery = $(this).val();
      $(this).val('');

      if (grocery) {
        $('<li class="grocery">' + grocery + '</li>')
        .hide()
        .appendTo($('#list'))
        .slideDown('fast', function() {
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
};
