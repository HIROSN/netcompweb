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
    var mouseover1;
    var mouseover2;
    var mouseover3;

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

    mouseover1 = listener($('#mouseover1'));
    mouseover2 = listener($('#mouseover2'));
    mouseover3 = listener($('#mouseover3'));

    mouseover1.jQueryEvent(
      'mouseover', '#howTo');

    mouseover2.domEventListener(
      'mouseover', document.getElementById('howTo'));

    mouseover3.domEventHandler(
      'mouseover', document.getElementById('howTo'));

    var showId = function(element, event) {
      var target;
      event = event || window.event;

      if (event) {
        target = event.target || event.srcElement;
      }

      if (target) {
        element.html(
          event.type + '<br>[id: ' + target.id + ']');
      }
    };

    mouseover1.callback = function(event) {
      showId(this.getElement(), event);
    };

    mouseover2.callback = function(event) {
      showId(this.getElement(), event);
    };

    mouseover3.callback = function(event) {
      showId(this.getElement(), event);
    };
  }());
});
