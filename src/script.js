'use strict';

var $ = require('jquery');
require('angular');
var app = angular.module('webApp', ['webApp.templates']);

app.footerLoaded = function() {
  $('.delayed').fadeIn('fast');
  var $h3s = $('article > section > h3');
  $h3s.addClass('noselect').on('click', function() {
    $('article').toggleClass('sticky');
  });
};

require('./js/directives/aside')(app);
require('./js/directives/article')(app);
require('./js/directives/footer')(app);
