'use strict';

/* global $: false */

$(function() {
  var $theme = $('#theme');
  var $myPageWrapper = $('#myPageWrapper');
  var $myColumns = $('#myColumns');
  var $myContent = $('.myContent');

  var $showColumn = $('#showColumn');
  var $numContents = $('#numContents');

  var $showAnimation = $('#showAnimation');
  var $numAnimations = $('#numAnimations');

  var $fixed = $('#fixed');
  var $headerImage = $('#header-image img');

  var $showFilters = $('#showFilters');
  var $filters = $('#filters');

  var $anim = $('.anim-box');
  var $pos = $('.pos-box');
  var $bg = $('.bg-box');

  var showHideFilters = function() {
    if ($showFilters.is(':checked')) {
      $filters.removeClass('hidden');
    } else {
      $filters.addClass('hidden');
    }
  };

  var showHideColumn = function() {
    if ($showColumn.is(':checked')) {
      $myColumns.removeClass('hidden');
    } else {
      $myColumns.addClass('hidden');
    }
  };

  var showContents = function() {
    $('.myContent div').remove();

    for (var i = 0; i < +$numContents.val(); i++) {
      $myContent.append($('<div class="App_v2"></div>'));
    }
  };

  var showAnimation = function() {
    for (var i = 0; i < +$numAnimations.val(); i++) {
      $myPageWrapper.append($('<div class="animated tada">tada</div>'));
    }
  };

  var removeAnimation = function() {
    $('#myPageWrapper .animated').remove();
  };

  $showFilters.on('click', function() {
    showHideFilters();
  });

  $showColumn.on('click', function() {
    showHideColumn();
  });

  $numContents.on('keyup', function(event) {
    if (13 === event.which) {
      $(this).blur();
    }
  });

  $numContents.on('blur', function() {
    showContents();
  });

  $showAnimation.on('click', function() {
    if ($showAnimation.is(':checked')) {
      showAnimation();
    } else {
      removeAnimation();
    }
  });

  $numAnimations.on('keyup', function(event) {
    if (13 === event.which) {
      $(this).blur();
    }
  });

  $numAnimations.on('blur', function() {
    removeAnimation();
    showAnimation();
  });

  $fixed.on('click', function() {
    if ($fixed.is(':checked')) {
      $headerImage.css('background-attachment', 'fixed');
      $theme.removeClass('hidden');
    } else {
      $headerImage.css('background-attachment', 'scroll');
      $theme.addClass('hidden');
    }
  });

  $myContent.on('mouseenter', '.App_v2', function() {
    $(this).animate({width: '+=10px'});
  })
  .on('mouseleave', '.App_v2', function() {
    $(this).animate({width: '-=10px'});
  })
  .on('click', '.App_v2', function() {
    $(this).toggle(1000);
  });

  $anim.on('click', function(event) {
    var $target = $(event.target);
    var $filter = $target.closest('.filter').find('.target');
    var func = $target.attr('data') || $target.attr('id');
    if ($target.is(':checked')) {
      $filter.addClass(func);
    } else {
      $filter.removeClass(func);
    }
  });

  $pos.on('click', function(event) {
    var $target = $(event.target);
    var $filters = $('#filters');
    var $filter = $target.closest('.filter');
    if ($target.is(':checked')) {
      $filters.addClass('had-fixed-pos');
      $filter.addClass('fixed-pos');
      $pos.prop('disabled', true);
      $target.prop('disabled', false);
    } else {
      $filters.removeClass('had-fixed-pos');
      $filter.removeClass('fixed-pos');
      $pos.prop('disabled', false);
    }
  });

  $bg.on('click', function(event) {
    var $target = $(event.target);
    var $background = $('#background');
    var filter = $target.closest('.filter').find('.target').attr('class');
    if ($target.is(':checked')) {
      $background.addClass('background');
      $background.addClass(filter);
      $bg.prop('disabled', true);
      $target.prop('disabled', false);
      $anim.prop('disabled', true);
    } else {
      $background.removeClass('background');
      $background.removeClass(filter);
      $bg.prop('disabled', false);
      $anim.prop('disabled', false);
    }
  });

  (function() {
    var hueRotateCanvas = document.getElementById('hue-rotate-canvas');
    var context = hueRotateCanvas.getContext('2d');
    var radient = context.createLinearGradient(0, 0, 400, 0);
    radient.addColorStop(0, 'red');
    radient.addColorStop(1, 'white');
    context.fillStyle = radient;
    context.fillRect(0, 0, 400, 216);
  })();

  showHideFilters();
  showHideColumn();
  showContents();
});
