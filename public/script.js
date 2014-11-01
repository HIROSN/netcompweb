"use strict";$(function(){var a=$(".button");a.mouseenter(function(){$(this).hasClass("disabled")||$(this).addClass("active")}),a.mouseleave(function(){$(this).removeClass("active")}),a.css("display","inline-block"),$("input").removeAttr("disabled"),$(".js").removeClass("js")}),$(function(){var a=$.Deferred(),b=$("#jsweekly-links > li:first");b.text("Loading..."),$.ajax({url:"https://ajax.googleapis.com/ajax/services/feed/load?v=1.0",data:{q:"http://javascriptweekly.com/rss/1i29bb1p"},dataType:"jsonp",success:a.resolve,error:a.reject}),a.promise().then(function(a){var c=a.responseData&&a.responseData.feed&&a.responseData.feed.entries&&a.responseData.feed.entries.length&&a.responseData.feed.entries[0];c?(b.detach(),$("#jsweekly > a").attr("href",c.link),$("#jsweekly-latest-content").html(c.content.replace(new RegExp("img","gi"),"!img")),$("#jsweekly-latest-content > table div > a").each(function(){var a=$(this);"block"===a.css("display")&&"underline"===a.css("text-decoration")&&(a.removeAttr("style").attr("target","_blank"),$("<li></li>").html(a).appendTo($("#jsweekly-links")))})):b.text(a.responseDetails)}).fail(function(a){b.text(a.status+" - "+a.statusText)}).always(function(){b.css("color","red")})}),$(function(){var a=function(a){var b=$.Deferred();return $.ajax({url:"http://www.omdbapi.com/",data:{s:a},dataType:"jsonp",success:b.resolve,error:b.reject}),b.promise()};$("#movie-title").on("blur",function(){var b=this,c=$(b).val();$("#movies > li").slideUp("fast",function(){$(this).remove()}),c&&(b.disabled=!0,a(c).then(function(a){var b=Handlebars.compile($("#movies-template").html());$(b(a)).hide().appendTo($("#movies")).slideDown("fast")}).always(function(){b.disabled=!1}))}).on("keydown",function(a){13==a.which&&$(this).blur()}).on("focus",function(){$(this).val("")})}),$(function(){$(".button").addClass("notouch").addClass("noselect"),$("textarea.code").addClass("notouch")}),$(function(){var a=50,b=300,c=["up","down","left","right"],d=["right","right-up","right-down","left","left-up","left-down","win"],e=$("#mouse"),f=$("#floor"),g=$("#play"),h=f.width()-e.width(),i=f.height()-e.height(),j=null,k="right",l=k,m=1,n=function(a,b){return 0>a?0:a>b?b:a},o=function(){return c[Math.floor(Math.random()*c.length)]},p=function(a){return parseInt(e.css(a))},q=function(){f.animate({height:$(window).height()/2},function(){h=f.width()-e.width(),i=f.height()-e.height()})},r=function(){var a,b=$("#mouse-preload");if(0===b.children().length)for(a=0;a<d.length;a++)b.append($("<div></div>",{"class":"mouse-preload mouse-"+d[a]}))},s=function(a,b){b&&e.removeClass("mouse-"+b),e.addClass("mouse-"+a),l=a},t=function(){for(var c,d=p("top"),f=p("left"),g=d,j=f;g===d&&j===f;){switch(c=o()){case"up":g-=a*m,c=k+"-"+c;break;case"down":g+=a*m,c=k+"-"+c;break;case"left":j-=a*m,k=c;break;case"right":j+=a*m,k=c}g=n(g,i),j=n(j,h)}s(c,l),m=1,g!==d&&e.animate({top:g},b),j!==f&&e.animate({left:j},b)};e.css("top",0),e.css("left",0),s(l),g.click(function(){j||(f.css("background-image",'url("wood.gif")'),q(),g.addClass("disabled"),r(),j=setInterval(t,b+10))}),e.click(function(a){j?(clearInterval(j),j=null,k="right",s("win",l),g.removeClass("disabled"),a.stopPropagation()):(k=p("left")>h/2?"left":"right",s(k,l))}),f.click(function(b){var c,d,f;j&&(c=e.offset(),d=Math.abs(c.left+p("width")/2-b.pageX),f=Math.abs(c.top+p("height")/2-b.pageY),2*a>d&&2*a>f&&(m=10))}),$(window).on("resize",function(){j&&q()})}),$(function(){$("#domElem").text($("#domElem").text()+"\n"+$("#jsLinks li").first()[0].textContent)}),$(function(){var a=parseInt(window.getComputedStyle(document.body,null).marginLeft);$("#marginLeft").text($("#marginLeft").text()+"\n"+a+"px")}),$(function(){var a=function(){var a=[0,1];return function b(c){var d;return c>=0&&(d=a[c],"number"!=typeof d&&(d=b(c-1)+b(c-2),a[c]=d)),d}}(),b=function(b){var c;"number"==typeof b&&(c=a(b)),"number"!=typeof c&&(c="?"),$("#fibans").text(c)};$("#fibn").on("focus",function(){$(this).val(""),b()}),$("#fibn").on("blur",function(){b(+$(this).val())}),$("#fibn").on("keyup",function(a){13==a.which&&(b(+$(this).val()),$(this).blur())})}),$(function(){$.listener($("#click1")).jQueryEvent("click","#click1"),$.listener($("#click2")).domEventListener("click",document.getElementById("click2")),$.listener($("#click3")).domEventHandler("click",document.getElementById("click3"))}),$(function(){var a=$.observer($("#catObserver"));a.callback=function(a){var b=0,c=0;a.forEach(function(a){b+=a.addedNodes.length,c+=a.removedNodes.length}),this.getElement().html(b+" added<br>"+c+" removed")},a.observe(document.getElementById("cats"))||$("#ua").text(navigator.userAgent)}),$(function(){var a,b,c,d;a=$("#start"),b=$("#counter"),c=function(a,b,c){var d={increment:function(){a=++a%(b+1),e()},getValue:function(){return a}},e=function(){c.text(a+" cats")};return e(),c.click(function(){d.increment()}),d}(5,10,b),d=function(a,b,c){var d,e=0;a>e&&(d=setInterval(function(){e++<a&&$("<div></div>",{"class":"cat"}).hide().appendTo($("#cats")).slideDown("fast"),e>=a&&(clearInterval(d),c.removeClass("disabled"))},b),c.removeClass("active"),c.addClass("disabled"))},a.click(function(){$(this).hasClass("disabled")||($("#cats > div").slideUp("fast",function(){$(this).remove()}),d(c.getValue(),2e3,$(this)),$.fade($(this),[!0,!1,!1],1500))})}),$(function(){var a=function(a){function b(){this.unit=""}b.prototype.increment=function(){++d,e()};var c=new b,d=0,e=function(){a.text(d+" "+c.unit)};return c},b=$("#catButton"),c=$("#dogButton"),d=a(b),e=a(c);d.unit="cats",e.unit="dogs",b.click(function(){d.increment()}),c.click(function(){e.increment()})}),$(function(){var a,b=!1,c={smiling:!1};!function(a,b){a=!0,b.smiling=!0}(b,c),a="\n"+b+" Object {smiling: "+c.smiling+"}",$("#bob").text($("#bob").text()+a)}),$(function(){$("#timestamp").text(document.lastModified)});