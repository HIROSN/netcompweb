'use strict';

var $ = require('jquery');

module.exports = function(app) {
  app.directive('asidePages', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-pages.html',
      controller: require('../modules/default')
    };
  });

  app.directive('asideJsLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-js-links.html',
      controller: require('../modules/default')
    };
  });

  app.directive('asideNodeLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-node-links.html',
      controller: require('../modules/default')
    };
  });

  app.directive('asideJqLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-jq-links.html',
      controller: require('../modules/default')
    };
  });

  app.directive('asideAngularLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-angular-links.html',
      controller: require('../modules/default')
    };
  });

  app.directive('asideOtherLinks', function() {
    return {
      restrict: 'A',
      templateUrl: 'aside-other-links.html',
      controller: require('../modules/default')
    };
  });

  app.directive('footer', function() {
    return {
      restrict: 'A',
      templateUrl: 'footer.html',
      controller: function() {
        $('#timestamp').text(document.lastModified);
        require('../modules/default')();
      }
    };
  });
};
