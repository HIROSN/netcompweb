!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";b.exports=function(){var b=a("./config"),c=$("#catImages > li > img"),d=function(){var a,b,d=document.getElementById("catImages"),e=c.length;a=window.getComputedStyle?parseInt(window.getComputedStyle(d,null).width):d.clientWidth,a-=2*e+1,a=Math.floor(a/e),b=Math.floor(.8*a),c.width(a).height(b)};c.each(function(a){$(this).attr("src",b.catImages[a])}),d(),$(window).on("resize",function(){d()}),$("#catImages").on("click","li",function(){var a=$(this);a.fadeOut("fast",function(){a.appendTo(a.parent()).fadeIn("fast")})})}},{"./config":2}],2:[function(a,b,c){"use strict";b.exports={catImages:["http://hirosn.azurewebsites.net/images/cat.svg","http://hirosn.azurewebsites.net/images/cat.svg","http://hirosn.azurewebsites.net/images/cat.svg","http://hirosn.azurewebsites.net/images/cat.svg"]}},{}],3:[function(a,b,c){"use strict";b.exports=function(){var b=a("./listener"),c=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},d=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},e=document.getElementById("IE");b($("#click4")).jQueryEvent("click","#noLinks").callback=function(a){c(a)},b($("#click5")).domEventListener("click",document.getElementById("noLinks")).callback=function(a){c(a)},b($("#click6")).domEventHandler("click",document.getElementById("noLinks")).callback=function(a){c(a)},e.addEventListener&&e.addEventListener("click",function(a){d(a)},!1),e.attachEvent&&e.attachEvent("onclick",function(a){d(a)})}},{"./listener":6}],4:[function(a,b,c){"use strict";b.exports=function(){var b=a("./listener"),c=a("./shownodes");b($("#click1")).jQueryEvent("click","#click1"),b($("#click2")).domEventListener("click",document.getElementById("click2")),b($("#click3")).domEventHandler("click",document.getElementById("click3")),b($("#input1")).jQueryEvent("input","#grocery"),b($("#input2")).domEventListener("input",document.getElementById("grocery")),b($("#input3")).domEventHandler("input",document.getElementById("grocery")),$("#grocery").on("keyup",function(a){var b;13==a.which&&(b=$(this).val(),$(this).val(""),b&&$('<li class="grocery">'+b+"</li>").hide().appendTo($("#list")).slideDown("fast",function(){c()}))}),$("#list").on("click","li",function(){var a=$(this);a.slideUp("fast",function(){a.remove(),c()})})}},{"./listener":6,"./shownodes":7}],5:[function(a,b,c){"use strict";b.exports=function(){var b=a("./listener"),c=function(a){var b;return a=a||window.event,a&&(b=a.target||a.srcElement),b},d=function(a,b){var d=c(b);d&&a.html(b.type+"<br>[id: "+d.id+"]")};b($("#mouseover1")).jQueryEvent("mouseover","#howTo").callback=function(a){d(this.getElement(),a)},b($("#mouseover2")).domEventListener("mouseover",document.getElementById("howTo")).callback=function(a){d(this.getElement(),a)},b($("#mouseover3")).domEventHandler("mouseover",document.getElementById("howTo")).callback=function(a){d(this.getElement(),a)}}},{"./listener":6}],6:[function(a,b,c){"use strict";b.exports=function(b){var c=a("../../js/modules/fade"),d={callback:function(){},getElement:function(){return b},jQueryEvent:function(a,b){return $(document).on(a,b,e),this},domEventListener:function(a,b){return b.addEventListener&&b.addEventListener(a,e,!1),this},domEventHandler:function(a,b){return b.attachEvent&&b.attachEvent("on"+a,e),this}},e=function(a){d.callback(a)||c(b,[!1,!1,!0])};return b.addClass("notouch").addClass("noselect"),d},$(function(){$(".listener").css("display","inline-block")})},{"../../js/modules/fade":9}],7:[function(a,b,c){"use strict";b.exports=function(){var a,b=document.getElementById("list"),c=b.firstChild;for($("#nodes > div").remove();c;){switch(a=c.tagName||c.nodeName){case"#text":$("#nodes").append('<div class="text">&nbsp;</div>');break;case"LI":$("#nodes").append('<div class="item">li</div>')}c=c.nextSibling}var d=$(".item");d.corner&&d.corner("5px")}},{}],8:[function(a,b,c){"use strict";$(document).ready(function(){a("./js/shownodes")(),a("./js/eventhandlers")(),a("./js/eventobject")(),a("./js/defaultbehavior")(),a("./js/computedstyle")(),$("input").removeAttr("disabled"),$("#page").append("<p>"+navigator.userAgent+"</p"),$("#timestamp").text(document.lastModified)})},{"./js/computedstyle":1,"./js/defaultbehavior":3,"./js/eventhandlers":4,"./js/eventobject":5,"./js/shownodes":7}],9:[function(a,b,c){"use strict";b.exports=function(a,b,c){var d,e=1;c=(c||400)/16,d=function(){var f,g=e.toString(16),h="#";for(f=0;f<3;f++)h+=b[f]?g+g:"FF";a.css("background-color",h),e++<15?setTimeout(d,c):a.removeAttr("style").css("display","inline-block")},setTimeout(d,c)}},{}]},{},[8,9,1,2,3,4,5,6,7]);