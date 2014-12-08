'use strict';

var $ = require('jquery');
require('angular');

$(function() {
  var app = angular.module('webapp', []);
  require('./js/directives/aside-1')(app);
});

// Enable non-static elements
$(require('./js/modules/enable'));

// coldenoughtostorebeeroutside.herokuapp.com/api
$(require('./js/modules/wunderground'));

// JavaScript Weekly
$(require('./js/modules/jsweekly'));

// jQuery Ajax, JSONP and Handlebars
$(require('./js/modules/omdbapi'));

// Window height and document height
$(require('./js/modules/catchthemouse'));

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
$(require('./js/modules/fibonacci'));

// Event listeners and handlers
$(function() {
  var listener = require('./js/modules/listener');

  listener($('#click1'))
  .jQueryEvent('click', '#click1');

  listener($('#click2'))
  .domEventListener('click', document.getElementById('click2'));

  listener($('#click3'))
  .domEventHandler('click', document.getElementById('click3'));
});

// Mutation Observers
$(function() {
  var observer = require('./js/modules/observer');
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
$(require('./js/modules/catcounter'));

// Public vs. private
$(require('./js/modules/publicvsprivate'));

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
