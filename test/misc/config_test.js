'use strict';

var expect = require('chai').expect;
var async = require('async');
var request = require('superagent');
var config = require('../../src/ie8/es5/config');

describe('Config tests', function() {
  it('should be ok to request external resources', function(done) {
    async.each(config.catImages, function(url, callback) {
      request.head(url).end(function(err, data) {
        if (200 !== data.status) { err = url; }
        callback(err);
      });
    },
    function(err) {
      expect(err).to.equal(undefined);
      done();
    });
  });
});
