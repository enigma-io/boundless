webpackJsonp([5,14,30],{475:function(t,n,e){"use strict";function o(){return new Promise(function(t,n){f.requestPermission(function(e){"granted"===e&&t(),n(c.DISABLED)})})}function i(){return new Promise(function(t,n){if(!f)return n(c.NOT_AVAILABLE);if("permission"in f){switch(f.permission){case"granted":return t();case"denied":return n(c.DISABLED)}o().then(t,n)}})}function r(t){return new Promise(function(n,e){return void 0===t?e(c.CONFIG_MISSING):"[object Object]"!==Object.prototype.toString.call(t)?e(c.CONFIG_TYPE):void 0===t.body?e(c.BODY_MISSING):u(t.body)===!1?e(c.BODY_TYPE):void 0===t.header?e(c.HEADER_MISSING):u(t.header)===!1?e(c.HEADER_TYPE):void 0!==t.icon&&u(t.icon)===!1?e(c.ICON_TYPE):void 0!==t.onClick&&a(t.onClick)===!1?e(c.ONCLICK_TYPE):void i().then(function(){var e=new f(t.header,{body:t.body,icon:t.icon});t.onClick&&e.addEventListener("click",t.onClick),n(e)},function(t){return e(t)})})}Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"errors",function(){return c}),n.default=r;var c={DISABLED:"webNotification: web notifications are currently disabled by user settings.",NOT_AVAILABLE:"webNotification: web notifications are not supported on this platform.",CONFIG_TYPE:"webNotification: passed a non-object as configuration.",CONFIG_MISSING:"webNotification: no configuration was passed.",BODY_TYPE:"webNotification: `body` must be a string.",BODY_MISSING:"webNotification: `body` was omitted from the configuration object.",HEADER_TYPE:"webNotification: `header` must be a string.",HEADER_MISSING:"webNotification: `header` was omitted from the configuration object.",ICON_TYPE:"webNotification: `icon` must be a URL string.",ONCLICK_TYPE:"webNotification: `onClick` must be a function."},a=function(t){return"function"==typeof t},u=function(t){return"string"==typeof t},f=function(){return!!window.Notification&&window.Notification}()},495:function(t,n,e){"use strict";function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}function r(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var c=e(0),a=e.n(c),u=e(475),f=e(34),s=function(){function t(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}}(),l=function(t){function n(){var t,r,c,a;o(this,n);for(var f=arguments.length,s=Array(f),l=0;l<f;l++)s[l]=arguments[l];return r=c=i(this,(t=n.__proto__||Object.getPrototypeOf(n)).call.apply(t,[this].concat(s))),c.state={n:0},c.spawnNotification=function(){e.i(u.default)(c.template(c.state.n+1)).catch(function(t){return console.warn(t)}),c.setState({n:c.state.n+1})},a=r,i(c,a)}return r(n,t),s(n,[{key:"template",value:function(t){return{header:"Notification #"+t,body:"I can support up to two lines of text.",icon:"http://icons.iconarchive.com/icons/icons8/ios7/128/Astrology-Winter-icon.png",onClick:function(){return window.open("http://www.epa.gov/")}}}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(f.default,{ref:"trigger",onClick:this.spawnNotification},"Spawn Notification"))}}]),n}(a.a.PureComponent);n.default=l,l.__docgenInfo={description:""}}});