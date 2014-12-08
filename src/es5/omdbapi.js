'use strict';

var $ = require('jquery');

module.exports = function() {
  var searchMovie = function(title) {
    var dfd = $.Deferred();

    $.ajax({
      url: 'http://www.omdbapi.com/',
      data: {s: title},
      dataType: 'jsonp',
      success: dfd.resolve,
      error: dfd.reject
    });

    return dfd.promise();
  };

  $('#movie-title').on('blur', function() {
    var input = this;
    var title = $(input).val();

    $('#movies > li').slideUp('fast', function() {
      $(this).remove();
    });

    if (title) {
      input.disabled = true;

      searchMovie(title).then(function(results) {
        var template = Handlebars.compile($('#movies-template').html());
        $(template(results))
        .hide()
        .appendTo($('#movies'))
        .slideDown('fast');
      })
      .always(function() {
        input.disabled = false;
      });
    }
  }).on('keydown', function(event) {
    if (event.which == 13) {
      $(this).blur();
    }
  }).on('focus', function() {
    $(this).val('');
  });
};
