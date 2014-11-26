'use strict';

module.exports = function() {
  var dfd = $.Deferred();
  var $message = $('#jsweekly-links > li:first');
  $message.text('Loading...');

  $.ajax({
    url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0',
    data: {q: 'http://javascriptweekly.com/rss/1i29bb1p'},
    dataType: 'jsonp',
    success: dfd.resolve,
    error: dfd.reject
  });

  dfd.promise().then(function(results) {
    var latest =
      results.responseData &&
      results.responseData.feed &&
      results.responseData.feed.entries &&
      results.responseData.feed.entries.length &&
      results.responseData.feed.entries[0];

    if (latest) {
      $message.detach();
      $('#jsweekly > a').attr('href', latest.link);

      $('#jsweekly-latest-content').html(latest.content.replace(
        new RegExp('< *img ', 'gi'), '<!img '));

      $('#jsweekly-latest-content > table div > a').each(function() {
        var $link = $(this);

        if ($link.css('display') === 'block' &&
            $link.css('text-decoration') === 'underline') {
          $link.removeAttr('style').
            attr('target', '_blank');
          $('<li></li>').html($link).
            appendTo($('#jsweekly-links'));
        }
      });
    }
    else {
      $message.text(results.responseDetails);
    }
  }).fail(function(results) {
    $message.text(results.status + ' - ' + results.statusText);
  }).always(function() {
    $message.css('color', 'red');
  });
};
