'use strict';

var $ = require('jquery');

module.exports = function(app) {
  app.directive('footer', function() {
    return {
      restrict: 'A',
      templateUrl: 'footer.html',
      controller: function() {
        $('#timestamp').text(document.lastModified);
        require('../modules/default')();
        app.footerLoaded();
      }
    };
  });
};
