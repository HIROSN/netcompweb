'use strict';

var $ = require('jquery');

module.exports = function() {
  $.getJSON('http://ip-api.com/json/?callback=?', function(ipdata) {
    $.getJSON('https://coldenoughtostorebeeroutside.herokuapp.com/' +
      'api?ip=' + ipdata.query + '&callback=?', function(wudata) {
        $('#icon').attr('src', wudata.icon);
        $('#tempf').text(wudata.tempf + '°F');
        $('#precip').text(wudata.precip + 'in');
        $('#wind').text(wudata.wind);
        $('.wudata').slideDown('fast');
      });
  });

  require('./enable')('#aside-wudata');
};
