'use strict';

var $ = require('jquery');
require('angular');

$(function() {
  var app = angular.module('webapp', []);

  require('./js/directives/aside')(app);
  require('./js/directives/article')(app);

  $('#timestamp').text(document.lastModified);
});
