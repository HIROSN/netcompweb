'use strict';

var $ = require('jquery');

module.exports = function(app) {
  app.directive('asidePages', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-pages.html'
    };
  });

  app.directive('asideWudata', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-wudata.html'
    };
  });

  app.directive('asideJsLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-js-links.html',
      controller: function() {
        // DOM element in jQuery object
        $('#domElem').text($('#domElem').text() +
          '\n' + $('#jsLinks li').first()[0].textContent);
      }
    };
  });

  app.directive('asideNodeLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-node-links.html'
    };
  });

  app.directive('asideJqLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-jq-links.html'
    };
  });

  app.directive('asideAngularLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-angular-links.html'
    };
  });

  app.directive('asideOtherLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-other-links.html'
    };
  });
};
