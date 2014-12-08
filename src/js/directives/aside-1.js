'use strict';

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
};
