$(document).ready(function() {

  // Timestamp
  $('#timestamp').text(document.lastModified);

  // Whitespace nodes in children of ul element
  (function() {
    var parent = document.getElementById('list');
    var child = parent.firstChild;
    var name;

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

    $('#page').append('<p>' + navigator.userAgent + '</p');
  }());

  // Event listeners and handlers
  (function() {
    var grocery;

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
      if (event.which == 13) {
        grocery = $(this).val();
        $(this).val('');

        if (grocery) {
          $('#list').append('<li>' + grocery + '</li>');
        }
      }
    });
  }());
});
