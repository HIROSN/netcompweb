'use strict';

/* global $: false */

$(document).ready(function() {
  require('./js/shownodes')();
  require('./js/eventhandlers')();
  require('./js/eventobject')();
  require('./js/defaultbehavior')();
  require('./js/computedstyle')();

  $('input').removeAttr('disabled');
  $('#page').append('<p>' + navigator.userAgent + '</p');
  $('#timestamp').text(document.lastModified);
});
