!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";b.exports=function(a,b,c){var d,e=1;c=(c||400)/16,d=function(){var f,g=e.toString(16),h="#";for(f=0;3>f;f++)h+=b[f]?g+g:"FF";a.css("background-color",h),e++<15?setTimeout(d,c):a.removeAttr("style").css("display","inline-block")},setTimeout(d,c)}},{}],2:[function(a,b){"use strict";b.exports=function(){var a=function(){var a,b,c=document.getElementById("catImages"),d=$("#catImages > li > img"),e=d.length;a=window.getComputedStyle?parseInt(window.getComputedStyle(c,null).width):c.clientWidth,a-=2*e+1,a=Math.floor(a/e),b=Math.floor(.8*a),d.width(a).height(b)};a(),$(window).on("resize",function(){a()}),$("#catImages").on("click","li",function(){var a=$(this);a.fadeOut("fast",function(){a.appendTo(a.parent()).fadeIn("fast")})})}},{}],3:[function(a,b){"use strict";b.exports=function(){var b=a("../listener"),c=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},d=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},e=document.getElementById("IE");b($("#click4")).jQueryEvent("click","#noLinks").callback=function(a){c(a)},b($("#click5")).domEventListener("click",document.getElementById("noLinks")).callback=function(a){c(a)},b($("#click6")).domEventHandler("click",document.getElementById("noLinks")).callback=function(a){c(a)},e.addEventListener&&e.addEventListener("click",function(a){d(a)},!1),e.attachEvent&&e.attachEvent("onclick",function(a){d(a)})}},{"../listener":6}],4:[function(a,b){"use strict";b.exports=function(){var b=a("../listener"),c=function(a){var b;return a=a||window.event,a&&(b=a.target||a.srcElement),b},d=function(a,b){var d=c(b);d&&a.html(b.type+"<br>[id: "+d.id+"]")};b($("#mouseover1")).jQueryEvent("mouseover","#howTo").callback=function(a){d(this.getElement(),a)},b($("#mouseover2")).domEventListener("mouseover",document.getElementById("howTo")).callback=function(a){d(this.getElement(),a)},b($("#mouseover3")).domEventHandler("mouseover",document.getElementById("howTo")).callback=function(a){d(this.getElement(),a)}}},{"../listener":6}],5:[function(a){"use strict";$(document).ready(function(){var b,c=a("../listener");$("#timestamp").text(document.lastModified),$("input").removeAttr("disabled"),b=function(){var a,b=document.getElementById("list"),c=b.firstChild;for($("#nodes > div").remove();c;){switch(a=c.tagName||c.nodeName){case"#text":$("#nodes").append('<div class="text">&nbsp;</div>');break;case"LI":$("#nodes").append('<div class="item">li</div>')}c=c.nextSibling}},b(),$("#page").append("<p>"+navigator.userAgent+"</p"),c($("#click1")).jQueryEvent("click","#click1"),c($("#click2")).domEventListener("click",document.getElementById("click2")),c($("#click3")).domEventHandler("click",document.getElementById("click3")),c($("#input1")).jQueryEvent("input","#grocery"),c($("#input2")).domEventListener("input",document.getElementById("grocery")),c($("#input3")).domEventHandler("input",document.getElementById("grocery")),$("#grocery").on("keyup",function(a){var c;13==a.which&&(c=$(this).val(),$(this).val(""),c&&$('<li class="grocery">'+c+"</li>").hide().appendTo($("#list")).slideDown("fast",function(){b()}))}),$("#list").on("click","li",function(){var a=$(this);a.slideUp("fast",function(){a.remove(),b()})}),a("./eventobject")(),a("./defaultbehavior")(),a("./computedstyle")()})},{"../listener":6,"./computedstyle":2,"./defaultbehavior":3,"./eventobject":4}],6:[function(a,b){"use strict";b.exports=function(b){var c=a("./fade"),d={callback:function(){},getElement:function(){return b},jQueryEvent:function(a,b){return $(document).on(a,b,e),this},domEventListener:function(a,b){return b.addEventListener&&b.addEventListener(a,e,!1),this},domEventHandler:function(a,b){return b.attachEvent&&b.attachEvent("on"+a,e),this}},e=function(a){d.callback(a)||c(b,[!1,!1,!0])};return b.addClass("notouch").addClass("noselect"),d},$(function(){$(".listener").css("display","inline-block")})},{"./fade":1}]},{},[5,1,6,4,3,2]);