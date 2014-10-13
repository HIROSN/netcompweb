$(document).ready(function() {
  var showNodes;
  var getTarget;

  // Timestamp
  $('#timestamp').text(document.lastModified);

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
  getTarget = function(event) {
    var target;
    event = event || window.event;

    if (event) {
      target = event.target || event.srcElement;
    }

    return target;
  };

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
        $('#list').append('<li class="grocery">' + grocery + '</li>');
        showNodes();
      }
    }
  });

  $('#list').click(function(event) {
    var target = getTarget(event);

    if (target.tagName === 'LI') {
      target.parentNode.removeChild(target);
      showNodes();
    }
  });

  // Event object
  (function() {
    var mouseover1 = listener($('#mouseover1'));
    var mouseover2 = listener($('#mouseover2'));
    var mouseover3 = listener($('#mouseover3'));
    var showId;

    mouseover1.jQueryEvent(
      'mouseover', '#howTo');

    mouseover2.domEventListener(
      'mouseover', document.getElementById('howTo'));

    mouseover3.domEventHandler(
      'mouseover', document.getElementById('howTo'));

    showId = function(element, event) {
      var target = getTarget(event);

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

  // Changing default behavior
  (function() {
    var click4 = listener($('#click4'));
    var click5 = listener($('#click5'));
    var click6 = listener($('#click6'));
    var blockLink;
    var followLink;
    var ie;

    click4.jQueryEvent(
      'click', '#noLinks');

    click5.domEventListener(
      'click', document.getElementById('noLinks'));

    click6.domEventHandler(
      'click', document.getElementById('noLinks'));

    blockLink = function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    };

    click4.callback = function(event) {
      blockLink(event);
    };

    click5.callback = function(event) {
      blockLink(event);
    };

    click6.callback = function(event) {
      blockLink(event);
    };

    followLink = function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    };

    ie = document.getElementById('IE');

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
  }());
});
