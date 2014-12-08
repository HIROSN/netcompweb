'use strict';

var config = require('../../../src/ie8/js/config');

describe('Config tests', function() {
  it('should have some cat images', function() {
    expect(config.catImages).toBeTruthy();
    expect(Array.isArray(config.catImages)).toBe(true);
    expect(config.catImages.length).toBeTruthy();
  });
});
