'use strict';

// Enable non-static elements
$(require('./es5/enable'));

// coldenoughtostorebeeroutside.herokuapp.com/api
$(require('./es5/wunderground'));

// JavaScript Weekly
$(require('./es5/jsweekly'));

// jQuery Ajax, JSONP and Handlebars
$(require('./es5/omdbapi'));

// Window height and document height
$(require('./es5/catchthemouse'));

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
$(require('./es5/fibonacci'));

// Event listeners and handlers
$(function() {
  var listener = require('./es5/listener');

  listener($('#click1'))
  .jQueryEvent('click', '#click1');

  listener($('#click2'))
  .domEventListener('click', document.getElementById('click2'));

  listener($('#click3'))
  .domEventHandler('click', document.getElementById('click3'));
});

// Mutation Observers
$(function() {
  var observer = require('./es5/observer');
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
$(require('./es5/catcounter'));

// Public vs. private
$(require('./es5/publicvsprivate'));

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
