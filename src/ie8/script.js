'use strict';

$(document).ready(function() {
  var listener = require('../listener');
  var showNodes;

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
  require('./eventobject')();

  // Changing default behavior
  require('./defaultbehavior')();

  // Computed style
  require('./computedstyle')();
});
