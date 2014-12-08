'use strict';

var $ = require('jquery');
require('angular');

$(function() {
  var app = angular.module('webapp', []);

  app.footerLoaded = function() {
    $('.delayed').fadeIn('fast');
  };

  require('./js/directives/aside')(app);
  require('./js/directives/article')(app);
  require('./js/directives/footer')(app);
});
