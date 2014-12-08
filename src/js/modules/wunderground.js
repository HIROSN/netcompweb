'use strict';

var $ = require('jquery');

module.exports = function() {
  $.getJSON('https://freegeoip.net/json/?callback=?', function(ipdata) {
    $.getJSON('https://coldenoughtostorebeeroutside.herokuapp.com/' +
      'api?ip=' + ipdata.ip + '&callback=?', function(wudata) {
        $('#icon').attr('src', wudata.icon);
        $('#tempf').text(wudata.tempf + '°F');
        $('#precip').text(wudata.precip + 'in');
        $('#wind').text(wudata.wind);
        $('.wudata').slideDown('fast');
      });
  });
};
