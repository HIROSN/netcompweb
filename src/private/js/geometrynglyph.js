'use strict';

(function() {
  var recreateDIVs = function() {
    var container = document.getElementById('container');
    var first = container.firstChild;
    var text = first.textContent;
    var cs = window.getComputedStyle(first, null);
    var bcs = window.getComputedStyle(document.body, null);

    var wx = window.innerWidth;
    wx -= parseInt(bcs.paddingLeft) + parseInt(bcs.paddingRight);

    var wy = window.innerHeight;
    wy -= parseInt(bcs.paddingTop);

    var x = parseInt(cs.width);
    x += parseInt(cs.marginLeft) + parseInt(cs.marginRight);

    var y = parseInt(cs.height);
    y += parseInt(cs.marginTop) + parseInt(cs.marginBottom);

    var n = Math.floor(wx / x) * Math.floor(wy / y);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (var i = 0; i < n; i++) {
      var div = document.createElement('DIV');
      div.appendChild(document.createTextNode(text));
      container.appendChild(div);
    }
  };

  recreateDIVs();
  window.addEventListener('resize', recreateDIVs);
})();
