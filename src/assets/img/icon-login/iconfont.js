(function(window){var svgSprite='<svg><symbol id="icon-mima" viewBox="0 0 1024 1024"><path d="M781.994667 453.632 781.994667 293.546667c0-146.773333-119.125333-265.898667-265.898667-265.898667-1.706667 0-3.072 0-5.12 0-1.365333 0-3.413333 0-4.778667 0-146.773333 0-265.898667 119.125333-265.898667 265.898667l0 160.085333L146.090667 453.632 146.090667 1003.52l732.16 0L878.250667 453.632 781.994667 453.632 781.994667 453.632zM595.626667 902.826667l-165.888 0 40.618667-177.834667c-24.234667-14.336-40.618667-40.96-40.618667-71.338667 0-45.738667 37.205333-82.944 82.944-82.944 45.738667 0 82.944 37.205333 82.944 82.944 0 30.378667-16.384 57.002667-40.96 71.68L595.626667 902.826667 595.626667 902.826667zM648.874667 453.632l-275.456 0L373.418667 293.546667c0-73.386667 59.733333-132.778667 132.778667-132.778667 2.048 0 6.485333 0 6.485333 0s2.389333 0 3.413333 0c73.386667 0 132.778667 59.733333 132.778667 132.778667L648.874667 453.632 648.874667 453.632zM648.874667 453.632"  ></path></symbol><symbol id="icon-user" viewBox="0 0 1024 1024"><path d="M512 239.36m-239.36 0a239.36 239.36 0 1 0 478.72 0 239.36 239.36 0 1 0-478.72 0Z" fill="" ></path><path d="M512 478.72a512 512 0 0 0-512 512V1024h1024v-33.28a512 512 0 0 0-512-512z" fill="" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)