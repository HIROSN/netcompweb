'use strict';

/* global $: false */

module.exports = function() {
  var config = require('./config');
  var $images = $('#catImages > li > img');

  var resizeCatImages = function() {
    var list = document.getElementById('catImages');
    var numberOfCats = $images.length;
    var width;
    var height;

    if (window.getComputedStyle) {
      width = parseInt(window.getComputedStyle(list, null).width);
    } else {
      width = list.clientWidth;
    }

    width -= 2 * numberOfCats + 1;
    width = Math.floor(width / numberOfCats);
    height = Math.floor(width * 0.8);
    $images.width(width).height(height);
  };

  $images.each(function(index) {
    $(this).attr('src', config.catImages[index]);
  });

  resizeCatImages();

  $(window).on('resize', function() {
    resizeCatImages();
  });

  $('#catImages').on('click', 'li', function() {
    var $li = $(this);

    $li.fadeOut('fast', function() {
      $li.appendTo($li.parent())
      .fadeIn('fast');
    });
  });
};
