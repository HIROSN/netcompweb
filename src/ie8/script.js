'use strict';

/* global $: false */

$(document).ready(function() {
  var showNodes = require('./js/shownodes');

  // Timestamp
  $('#timestamp').text(document.lastModified);

  // Enable elements
  $('input').removeAttr('disabled');

  // Whitespace nodes in children of ul element
  showNodes();
  $('#page').append('<p>' + navigator.userAgent + '</p');

  // Event listeners and handlers
  require('./js/eventhandlers')();

  // Event object
  require('./js/eventobject')();

  // Changing default behavior
  require('./js/defaultbehavior')();

  // Computed style
  require('./js/computedstyle')();
});
