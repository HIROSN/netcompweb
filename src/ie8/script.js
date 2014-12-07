'use strict';

$(document).ready(function() {
  var showNodes = require('./es5/shownodes');

  // Timestamp
  $('#timestamp').text(document.lastModified);

  // Enable elements
  $('input').removeAttr('disabled');

  // Whitespace nodes in children of ul element
  showNodes();
  $('#page').append('<p>' + navigator.userAgent + '</p');

  // Event listeners and handlers
  require('./es5/eventhandlers')();

  // Event object
  require('./es5/eventobject')();

  // Changing default behavior
  require('./es5/defaultbehavior')();

  // Computed style
  require('./es5/computedstyle')();
});
