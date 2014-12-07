'use strict';

// All elements
$(function() {
  var $buttons = $('.button');

  $buttons.mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $buttons.mouseleave(function() {
    $(this).removeClass('active');
  });

  $buttons.css('display', 'inline-block');
  $('input').removeAttr('disabled');
  $('.js').removeClass('js');
});

// coldenoughtostorebeeroutside.herokuapp.com/api
$(require('./wunderground'));

// JavaScript Weekly
$(require('./jsweekly'));

// jQuery Ajax, JSONP and Handlebars
$(require('./omdbapi'));

// No touch feedback / text selection
$(function() {
  $('.button').addClass('notouch').addClass('noselect');
  $('textarea.code').addClass('notouch');
});

// Window height and document height
$(require('./catchthemouse'));

// DOM element in jQuery object
$(function() {
  $('#domElem').text($('#domElem').text() +
    '\n' + $('#jsLinks li').first()[0].textContent);
});

// Computed style
$(function() {
  var marginLeft = parseInt(
    window.getComputedStyle(document.body, null).marginLeft);

  $('#marginLeft').text($('#marginLeft').text() +
    '\n' + marginLeft + 'px');
});

// Memoization in Closure
$(require('./fibonacci'));

// Event listeners and handlers
$(function() {
  var listener = require('./listener');

  listener($('#click1')).jQueryEvent(
    'click', '#click1');

  listener($('#click2')).domEventListener(
    'click', document.getElementById('click2'));

  listener($('#click3')).domEventHandler(
    'click', document.getElementById('click3'));
});

// Mutation Observers
$(function() {
  var observer = require('./observer');
  var catObserver = observer($('#catObserver'));

  catObserver.callback = function(mutations) {
    var added = 0;
    var removed = 0;

    mutations.forEach(function(mutation) {
      added += mutation.addedNodes.length;
      removed += mutation.removedNodes.length;
    });

    this.getElement().html(added + ' added<br>' + removed + ' removed');
  };

  if (!catObserver.observe(document.getElementById('cats'))) {
    $('#ua').text(navigator.userAgent);
  }
});

// Cat Counter
$(require('./catcounter'));

// Public vs. private
$(require('./publicvsprivate'));

// Objects by reference
$(function() {
  var log;
  var isBobSmiling = false;

  var bob = {
    smiling: false
  };

  (function smile(smiling, person) {
    smiling = true;
    person.smiling = true;
  }(isBobSmiling, bob));

  log = '\n' + isBobSmiling + ' Object {smiling: ' + bob.smiling + '}';
  $('#bob').text($('#bob').text() + log);
});

// Timestamp
$(function() {
  $('#timestamp').text(document.lastModified);
});
