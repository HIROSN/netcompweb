"use strict";$(document).ready(function(){var a,b;$("#timestamp").text(document.lastModified),$("input").removeAttr("disabled"),a=function(){var a,b=document.getElementById("list"),c=b.firstChild;for($("#nodes > div").remove();c;){switch(a=c.tagName||c.nodeName){case"#text":$("#nodes").append('<div class="text">&nbsp;</div>');break;case"LI":$("#nodes").append('<div class="item">li</div>')}c=c.nextSibling}},a(),$("#page").append("<p>"+navigator.userAgent+"</p"),b=function(a){var b;return a=a||window.event,a&&(b=a.target||a.srcElement),b},$.listener($("#click1")).jQueryEvent("click","#click1"),$.listener($("#click2")).domEvent$.listener("click",document.getElementById("click2")),$.listener($("#click3")).domEventHandler("click",document.getElementById("click3")),$.listener($("#input1")).jQueryEvent("input","#grocery"),$.listener($("#input2")).domEvent$.listener("input",document.getElementById("grocery")),$.listener($("#input3")).domEventHandler("input",document.getElementById("grocery")),$("#grocery").on("keyup",function(b){var c;13==b.which&&(c=$(this).val(),$(this).val(""),c&&$('<li class="grocery">'+c+"</li>").hide().appendTo($("#list")).slideDown("fast",function(){a()}))}),$("#list").on("click","li",function(){var b=$(this);b.slideUp("fast",function(){b.remove(),a()})}),function(){var a=function(a,c){var d=b(c);d&&a.html(c.type+"<br>[id: "+d.id+"]")};$.listener($("#mouseover1")).jQueryEvent("mouseover","#howTo").callback=function(b){a(this.getElement(),b)},$.listener($("#mouseover2")).domEvent$.listener("mouseover",document.getElementById("howTo")).callback=function(b){a(this.getElement(),b)},$.listener($("#mouseover3")).domEventHandler("mouseover",document.getElementById("howTo")).callback=function(b){a(this.getElement(),b)}}(),function(){var a=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},b=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},c=document.getElementById("IE");$.listener($("#click4")).jQueryEvent("click","#noLinks").callback=function(b){a(b)},$.listener($("#click5")).domEvent$.listener("click",document.getElementById("noLinks")).callback=function(b){a(b)},$.listener($("#click6")).domEventHandler("click",document.getElementById("noLinks")).callback=function(b){a(b)},c.addEvent$.listener&&c.addEvent$.listener("click",function(a){b(a)},!1),c.attachEvent&&c.attachEvent("onclick",function(a){b(a)})}(),function(){var a=function(){var a,b,c=document.getElementById("catImages"),d=$("#catImages > li > img"),e=d.length;a=window.getComputedStyle?parseInt(window.getComputedStyle(c,null).width):c.clientWidth,a-=2*e+1,a=Math.floor(a/e),b=Math.floor(.8*a),d.width(a).height(b)};a(),$(window).on("resize",function(){a()}),$("#catImages").on("click","li",function(){var a=$(this);a.fadeOut("fast",function(){a.appendTo(a.parent()).fadeIn("fast")})})}()});