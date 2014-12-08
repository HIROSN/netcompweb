'use strict';

var $ = require('jquery');

module.exports = function() {
  var MOVE_LENGTH = 50;
  var MOVE_TIME = 300;
  var DIRECTIONS = ['up', 'down', 'left', 'right'];
  var PRELOADIMAGES = ['right', 'right-up', 'right-down', 'left', 'left-up',
    'left-down', 'win'];

  var $mouse = $('#mouse');
  var $floor = $('#floor');
  var $playButton = $('#play');

  var xMax = $floor.width() - $mouse.width();
  var yMax = $floor.height() - $mouse.height();
  var idTimer = null;
  var leftOrRight = 'right';
  var imageName = leftOrRight;
  var scared = 1;

  var boundValue = function(value, max) {
    return value < 0 ? 0 : value > max ? max : value;
  };

  var randomDirection = function() {
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  };

  var current = function(positionProperty) {
    return parseInt($mouse.css(positionProperty));
  };

  var layoutChange = function() {
    $floor.animate({height: $(window).height() / 2}, function() {
      xMax = $floor.width() - $mouse.width();
      yMax = $floor.height() - $mouse.height();
    });
  };

  var preloadImages = function() {
    var $preload = $('#mouse-preload');
    var i;

    if ($preload.children().length === 0) {
      for (i = 0; i < PRELOADIMAGES.length; i++) {
        $preload.append($('<div></div>', {
          class: 'mouse-preload mouse-' + PRELOADIMAGES[i]
        }));
      }
    }
  };

  var setImage = function(newName, oldName) {
    if (oldName) {
      $mouse.removeClass('mouse-' + oldName);
    }

    $mouse.addClass('mouse-' + newName);
    imageName = newName;
  };

  var scamper = function() {
    var top = current('top');
    var left = current('left');
    var newTop = top;
    var newLeft = left;
    var direction;

    while (newTop === top && newLeft === left) {
      direction = randomDirection();

      switch (direction) {
        case 'up':
          newTop  -= MOVE_LENGTH * scared;
          direction = leftOrRight + '-' + direction;
          break;
        case 'down':
          newTop  += MOVE_LENGTH * scared;
          direction = leftOrRight + '-' + direction;
          break;
        case 'left':
          newLeft -= MOVE_LENGTH * scared;
          leftOrRight = direction;
          break;
        case 'right':
          newLeft += MOVE_LENGTH * scared;
          leftOrRight = direction;
          break;
      }

      newTop = boundValue(newTop, yMax);
      newLeft = boundValue(newLeft, xMax);
    }

    setImage(direction, imageName);
    scared = 1;

    if (newTop !== top) {
      $mouse.animate({top: newTop}, MOVE_TIME);
    }

    if (newLeft !== left) {
      $mouse.animate({left: newLeft}, MOVE_TIME);
    }
  };

  $mouse.css('top', 0);
  $mouse.css('left', 0);
  setImage(imageName);

  $playButton.click(function() {
    if (!idTimer) {
      $floor.css('background-image', 'url("wood.gif")');
      layoutChange();
      $playButton.addClass('disabled');
      preloadImages();
      idTimer = setInterval(scamper, MOVE_TIME + 10);
    }
  });

  $mouse.click(function(event) {
    if (idTimer) {
      clearInterval(idTimer);
      idTimer = null;
      leftOrRight = 'right';
      setImage('win', imageName);
      $playButton.removeClass('disabled');
      event.stopPropagation();
    }
    else {
      leftOrRight = current('left') > xMax / 2 ? 'left' : 'right';
      setImage(leftOrRight, imageName);
    }
  });

  $floor.click(function(event) {
    var offset;
    var x;
    var y;

    if (idTimer) {
      offset = $mouse.offset();
      x = Math.abs(offset.left + current('width') / 2 - event.pageX);
      y = Math.abs(offset.top + current('height') / 2 - event.pageY);

      if (x < MOVE_LENGTH * 2 && y < MOVE_LENGTH * 2) {
        scared = 10;
      }
    }
  });

  $(window).on('resize', function() {
    if (idTimer) {
      layoutChange();
    }
  });
};
