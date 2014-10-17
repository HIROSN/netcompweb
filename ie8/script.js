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
    var showId = function($element, event) {
      var target = getTarget(event);

      if (target) {
        $element.html(
          event.type + '<br>[id: ' + target.id + ']');
      }
    };

    listener($('#mouseover1')).
      jQueryEvent('mouseover', '#howTo').
      callback = function(event) {
        showId(this.getElement(), event);
      };

    listener($('#mouseover2')).
      domEventListener('mouseover', document.getElementById('howTo')).
      callback = function(event) {
        showId(this.getElement(), event);
      };

    listener($('#mouseover3')).
      domEventHandler('mouseover', document.getElementById('howTo')).
      callback = function(event) {
        showId(this.getElement(), event);
      };
  }());

  // Changing default behavior
  (function() {
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

    listener($('#click4')).
      jQueryEvent('click', '#noLinks').
      callback = function(event) {
        blockLink(event);
      };

    listener($('#click5')).
      domEventListener('click', document.getElementById('noLinks')).
      callback = function(event) {
        blockLink(event);
      };

    listener($('#click6')).
      domEventHandler('click', document.getElementById('noLinks')).
      callback = function(event) {
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
  }());

  // Computed style
  (function() {
    var resizeCatImages = function() {
      var list = document.getElementById('catImages');
      var $images = $('#catImages > li > img');
      var numberOfCats = $images.length;
      var width;
      var height;

      if (window.getComputedStyle) {
        width = parseInt(getComputedStyle(list, null).width);
      }
      else {
        width = list.clientWidth;
      }

      width -= 2 * numberOfCats;
      width = Math.floor(width / numberOfCats);
      height = Math.floor(width * 0.8);
      $images.width(width).height(height);
    };

    resizeCatImages();

    $(window).on('resize', function() {
      resizeCatImages();
    });

    $('#catImages').click(function(event) {
      var $item = $(event.target).parent();
      var $list = $($item).parent();
      $item.remove();
      $list.append($item);
    });
  }());
});
