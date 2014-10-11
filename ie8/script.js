$(document).ready(function() {

  // Timestamp
  $('#timestamp').text(document.lastModified);

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

});
