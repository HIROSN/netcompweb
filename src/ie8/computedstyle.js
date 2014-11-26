'use strict';

module.exports = function() {
  var resizeCatImages = function() {
    var list = document.getElementById('catImages');
    var $images = $('#catImages > li > img');
    var numberOfCats = $images.length;
    var width;
    var height;

    if (window.getComputedStyle) {
      width = parseInt(window.getComputedStyle(list, null).width);
    }
    else {
      width = list.clientWidth;
    }

    width -= 2 * numberOfCats + 1;
    width = Math.floor(width / numberOfCats);
    height = Math.floor(width * 0.8);
    $images.width(width).height(height);
  };

  resizeCatImages();

  $(window).on('resize', function() {
    resizeCatImages();
  });

  $('#catImages').on('click', 'li', function() {
    var $li = $(this);

    $li.fadeOut('fast', function() {
      $li.appendTo($li.parent()).
      fadeIn('fast');
    });
  });
};
