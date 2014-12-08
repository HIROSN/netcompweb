'use strict';

var $ = require('jquery');

module.exports = function() {
  $('.js').removeClass('js');
  $('textarea.code').addClass('notouch');
};
