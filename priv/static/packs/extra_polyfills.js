(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{733:function(t,e,n){"use strict";n.r(e);n(766),n(765);var i=n(764);n.n(i)()()},764:function(t,e,n){"use strict";var i="bfred-it:object-fit-images",r=/(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,o="undefined"==typeof Image?{style:{"object-position":1}}:new Image,s="object-fit"in o.style,c="object-position"in o.style,a="background-size"in o.style,u="string"==typeof o.currentSrc,l=o.getAttribute,h=o.setAttribute,f=!1;function d(t,e,n){var i="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+(e||1)+"' height='"+(n||0)+"'%3E%3C/svg%3E";l.call(t,"src")!==i&&h.call(t,"src",i)}function g(t,e){t.naturalWidth?e(t):setTimeout(g,100,t,e)}function p(t){var e=function(t){for(var e,n=getComputedStyle(t).fontFamily,i={};null!==(e=r.exec(n));)i[e[1]]=e[2];return i}(t),n=t[i];if(e["object-fit"]=e["object-fit"]||"fill",!n.img){if("fill"===e["object-fit"])return;if(!n.skipTest&&s&&!e["object-position"])return}if(!n.img){n.img=new Image(t.width,t.height),n.img.srcset=l.call(t,"data-ofi-srcset")||t.srcset,n.img.src=l.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),d(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{!function(t){var e={get:function(e){return t[i].img[e||"src"]},set:function(e,n){return t[i].img[n||"src"]=e,h.call(t,"data-ofi-"+n,e),p(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}!function(t){if(t.srcset&&!u&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}(n.img),t.style.backgroundImage='url("'+(n.img.currentSrc||n.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=e["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(e["object-fit"])?g(n.img,function(){n.img.naturalWidth>t.width||n.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=e["object-fit"].replace("none","auto").replace("fill","100% 100%"),g(n.img,function(e){d(t,e.naturalWidth,e.naturalHeight)})}function m(t,e){var n=!f&&!t;if(e=e||{},t=t||"img",c&&!e.skipTest||!a)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][i]=t[r][i]||{skipTest:e.skipTest},p(t[r]);n&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&m(t.target,{skipTest:e.skipTest})},!0),f=!0,t="img"),e.watchMQ&&window.addEventListener("resize",m.bind(null,t,{skipTest:e.skipTest}))}m.supportsObjectFit=s,m.supportsObjectPosition=c,function(){function t(t,e){return t[i]&&t[i].img&&("src"===e||"srcset"===e)?t[i].img:t}c||(HTMLImageElement.prototype.getAttribute=function(e){return l.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,n){return h.call(t(this,e),e,String(n))})}(),t.exports=m},765:function(t,e,n){(function(n){var i,r,o;r=[],void 0===(o="function"==typeof(i=function(){"use strict";var t,e,i,r,o,s,c,a,u="undefined"!=typeof window?window:void 0!=typeof n?n:this||{},l=u.cancelRequestAnimationFrame&&u.requestAnimationFrame||setTimeout,h=u.cancelRequestAnimationFrame||clearTimeout,f=[],d=0,g=!1,p=7,m=35,b=125,v=0,y=0,_=0,I={get didTimeout(){return!1},timeRemaining:function(){var t=p-(Date.now()-y);return t<0?0:t}},w=(o=function(){p=22,b=66,m=0},a=function(){var t=Date.now()-c;t<99?s=setTimeout(a,99-t):(s=null,o())},function(){c=Date.now(),s||(s=setTimeout(a,99))});function E(){125!=b&&(p=7,b=125,m=35,g&&(g&&(r&&h(r),i&&clearTimeout(i),g=!1),R())),w()}function T(){r=null,i=setTimeout(O,0)}function k(){i=null,l(T)}function R(){g||(e=b-(Date.now()-y),t=Date.now(),g=!0,m&&e<m&&(e=m),e>9?i=setTimeout(k,e):(e=0,k()))}function O(){var n,r,o,s=p>9?9:1;if(y=Date.now(),g=!1,i=null,d>2||y-e-50<t)for(r=0,o=f.length;r<o&&I.timeRemaining()>s;r++)n=f.shift(),_++,n&&n(I);f.length?R():d=0}function L(t){return v++,f.push(t),R(),v}function M(t){var e=t-1-_;f[e]&&(f[e]=null)}if(u.requestIdleCallback&&u.cancelIdleCallback)try{u.requestIdleCallback(function(){},{timeout:0})}catch(t){!function(t){var e,n;if(u.requestIdleCallback=function(e,n){return n&&"number"==typeof n.timeout?t(e,n.timeout):t(e)},u.IdleCallbackDeadline&&(e=IdleCallbackDeadline.prototype)){if(!(n=Object.getOwnPropertyDescriptor(e,"timeRemaining"))||!n.configurable||!n.get)return;Object.defineProperty(e,"timeRemaining",{value:function(){return n.get.call(this)},enumerable:!0,configurable:!0})}}(u.requestIdleCallback)}else u.requestIdleCallback=L,u.cancelIdleCallback=M,u.document&&document.addEventListener&&(u.addEventListener("scroll",E,!0),u.addEventListener("resize",E),document.addEventListener("focus",E,!0),document.addEventListener("mouseover",E,!0),["click","keypress","touchstart","mousedown"].forEach(function(t){document.addEventListener(t,E,{capture:!0,passive:!0})}),u.MutationObserver&&new MutationObserver(E).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}));return{request:L,cancel:M}})?i.apply(e,r):i)||(t.exports=o)}).call(this,n(87))},766:function(t,e){!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];r.prototype.THROTTLE_TIMEOUT=100,r.prototype.POLL_INTERVAL=null,r.prototype.USE_MUTATION_OBSERVER=!0,r.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},r.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},r.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},r.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},r.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},r.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},r.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(o(t,"resize",this._checkForIntersections,!0),o(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},r.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},r.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(r){var o=r.element,s=c(o),a=this._rootContainsTarget(o),u=r.entry,l=e&&a&&this._computeTargetAndRootIntersection(o,n),h=r.entry=new i({time:t.performance&&performance.now&&performance.now(),target:o,boundingClientRect:s,rootBounds:n,intersectionRect:l});u?e&&a?this._hasCrossedThreshold(u,h)&&this._queuedEntries.push(h):u&&u.isIntersecting&&this._queuedEntries.push(h):this._queuedEntries.push(h)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},r.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var r,o,s,a,l,h,f,d,g=c(n),p=u(n),m=!1;!m;){var b=null,v=1==p.nodeType?t.getComputedStyle(p):{};if("none"==v.display)return;if(p==this.root||p==e?(m=!0,b=i):p!=e.body&&p!=e.documentElement&&"visible"!=v.overflow&&(b=c(p)),b&&(r=b,o=g,void 0,void 0,void 0,void 0,void 0,void 0,s=Math.max(r.top,o.top),a=Math.min(r.bottom,o.bottom),l=Math.max(r.left,o.left),h=Math.min(r.right,o.right),d=a-s,!(g=(f=h-l)>=0&&d>=0&&{top:s,bottom:a,left:l,right:h,width:f,height:d})))break;p=u(p)}return g}},r.prototype._getRootRect=function(){var t;if(this.root)t=c(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},r.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},r.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var r=0;r<this.thresholds.length;r++){var o=this.thresholds[r];if(o==n||o==i||o<n!=o<i)return!0}},r.prototype._rootIsInDom=function(){return!this.root||a(e,this.root)},r.prototype._rootContainsTarget=function(t){return a(this.root||e,t)},r.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},r.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=r,t.IntersectionObserverEntry=i}function i(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,r=i.width*i.height;this.intersectionRatio=n?r/n:this.isIntersecting?1:0}function r(t,e){var n,i,r,o=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(o.root&&1!=o.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),i=this.THROTTLE_TIMEOUT,r=null,function(){r||(r=setTimeout(function(){n(),r=null},i))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(o.rootMargin),this.thresholds=this._initThresholds(o.threshold),this.root=o.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function o(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function a(t,e){for(var n=e;n;){if(n==t)return!0;n=u(n)}return!1}function u(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document)}}]);
//# sourceMappingURL=extra_polyfills.js.map