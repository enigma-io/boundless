webpackJsonp([21,30],{485:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),i=(n.n(l),n(59)),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){function t(){var e,n,a,l;r(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={input:""},a.handleChange=function(e){return a.setState({input:e.target.value})},l=n,o(a,l)}return a(t,e),c(t,[{key:"render",value:function(){return n.i(l.createElement)("div",{className:"spread"},n.i(l.createElement)("div",null,n.i(l.createElement)("h5",null,'hidePlaceholderOnFocus="false"'),n.i(l.createElement)(i.default,{hidePlaceholderOnFocus:!1,inputProps:{placeholder:"Start typing and I disappear!"}})),n.i(l.createElement)("div",{style:{marginLeft:"1em"}},n.i(l.createElement)("h5",null,'hidePlaceholderOnFocus="true"'),n.i(l.createElement)(i.default,{hidePlaceholderOnFocus:!0,inputProps:{placeholder:"Focus on me and I disappear!"}})),n.i(l.createElement)("div",{style:{marginLeft:"1em"}},n.i(l.createElement)("h5",null,'"controlled" input'),n.i(l.createElement)(i.default,{hidePlaceholderOnFocus:!0,inputProps:{placeholder:"Focus on me and I disappear!",onChange:this.handleChange,value:this.state.input}})))}}]),t}(l.PureComponent);t.default=u,u.__docgenInfo={description:""}}});