'use strict';

var $ = require('jquery');

module.exports = function(app) {
  app.directive('articleJsWeekly', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-js-weekly.html',
      controller: require('../modules/jsweekly')
    };
  });

  app.directive('articleInnovationsSpa', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-innovations-spa.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleEmptyObjIsTruthy', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-empty-obj-is-truthy.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleCodingInterviews', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-coding-interviews.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleDiffsParseIntNumber', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-diffs-parse-int-number.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleLocalhostServerNode', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-localhost-server-node.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleLocalhostServerPython', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-localhost-server-python.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleXDomainXmlRes', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-x-domain-xml-res.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleOmdbapi', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-omdbapi.html',
      controller: require('../modules/omdbapi')
    };
  });

  app.directive('articleTouchFeedback', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-touch-feedback.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleCatchthemouse', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-catchthemouse.html',
      controller: require('../modules/catchthemouse')
    };
  });

  app.directive('articleHitTesting', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-hit-testing.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleDeveloperTools', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-developer-tools.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleVariables', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-variables.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleDomElement', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-dom-element.html',
      controller: function() {
        $('#domElem').text($('#domElem').text() +
          '\n' + $('title')[0].textContent);
        require('../modules/default')();
      }
    };
  });

  app.directive('articleRemoveAndDetach', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-remove-and-detach.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleComputedStyle', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-computed-style.html',
      controller: function() {
        var marginLeft = parseInt(
          window.getComputedStyle(document.body, null).marginLeft);

        $('#marginLeft').text($('#marginLeft').text() +
          '\n' + marginLeft + 'px');
        require('../modules/default')();
      }
    };
  });

  app.directive('articleFibonacci', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-fibonacci.html',
      controller: require('../modules/fibonacci')
    };
  });

  app.directive('articleChaining', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-chaining.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleClassExists', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-class-exists.html',
      controller: require('../modules/default')
    };
  });

  app.directive('articleEventListeners', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-event-listeners.html',
      controller: function() {
        var listener = require('../modules/listener');

        listener($('#click1'))
        .jQueryEvent('click', '#click1');

        listener($('#click2'))
        .domEventListener('click', document.getElementById('click2'));

        listener($('#click3'))
        .domEventHandler('click', document.getElementById('click3'));

        require('../modules/enable')('#article-event-listeners');
      }
    };
  });

  app.directive('articleMutationObservers', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-mutation-observers.html',
      controller: require('../modules/mutationobservers')
    };
  });

  app.directive('articlePublicvsprivate', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-publicvsprivate.html',
      controller: require('../modules/publicvsprivate')
    };
  });

  app.directive('articleObjectsByRef', function() {
    return {
      restrict: 'A',
      templateUrl: 'article-objects-by-ref.html',
      controller: function() {
        var log;
        var isBobSmiling = false;
        var bob = {smiling: false};

        (function smile(smiling, person) {
          smiling = true;
          person.smiling = true;
        }(isBobSmiling, bob));

        log = '\n' + isBobSmiling + ' Object {smiling: ' + bob.smiling + '}';
        $('#bob').text($('#bob').text() + log);
        require('../modules/default')();
      }
    };
  });
};
