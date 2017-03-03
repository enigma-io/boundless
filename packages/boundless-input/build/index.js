module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t){e.exports=require("boundless-utils-omit-keys")},function(e,t){e.exports=require("classnames")},function(e,t){e.exports=require("react")},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var p=n(2),u=n.n(p),i=n(1),a=n.n(i),l=n(0),c=n.n(l),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=function(e){return"function"==typeof e},y=function(e){function t(){var e,n,s,p;r(this,t);for(var u=arguments.length,i=Array(u),a=0;a<u;a++)i[a]=arguments[a];return n=s=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),s.state={input:"",isControlled:"string"==typeof s.props.inputProps.value,isFocused:!1},s.setInputValue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return s.setState({input:e})},s.getValue=function(){return s.refs.field.value},s.handleBlur=function(e){s.setState({isFocused:!1}),d(s.props.inputProps.onBlur)===!0&&s.props.inputProps.onBlur(e)},s.handleFocus=function(e){s.setState({isFocused:!0}),d(s.props.inputProps.onFocus)===!0&&s.props.inputProps.onFocus(e)},s.handleChange=function(e){s.state.isControlled===!1&&s.setInputValue(e.target.value),d(s.props.inputProps.onChange)===!0&&s.props.inputProps.onChange(e)},p=n,o(s,p)}return s(t,e),h(t,[{key:"componentWillMount",value:function(){if(this.state.isControlled===!0)return this.setInputValue(this.props.inputProps.value);this.setInputValue(this.props.inputProps.defaultValue)}},{key:"componentWillReceiveProps",value:function(e){e.inputProps.value!==this.props.inputProps.value&&this.setInputValue(e.inputProps.value)}},{key:"setValue",value:function(e){this.setInputValue(e),this.refs.field.value=e,this.state.isControlled===!0&&(this.refs.field.dispatchEvent(new Event("input",{bubbles:!0})),this.refs.field.dispatchEvent(new Event("change",{bubbles:!0})))}},{key:"getPlaceholderText",value:function(){var e=""!==this.state.input;return(this.props.hidePlaceholderOnFocus===!0?this.state.isFocused===!1&&e===!1:e===!1)?this.props.inputProps.placeholder:""}},{key:"render",value:function(){return u.a.createElement(this.props.component,f({},c()(this.props,t.internalKeys),{className:a()("b-input-wrapper",this.props.className),title:this.getPlaceholderText()}),u.a.createElement("input",f({},this.props.inputProps,{ref:"field",className:a()("b-input",this.props.inputProps.className),placeholder:null,onBlur:this.handleBlur,onFocus:this.handleFocus,onChange:this.handleChange})),u.a.createElement("div",{className:"b-input-placeholder b-input"},this.getPlaceholderText()))}}]),t}(u.a.PureComponent);y.propTypes={"*":p.PropTypes.any,component:p.PropTypes.string,hidePlaceholderOnFocus:p.PropTypes.bool,inputProps:p.PropTypes.shape({"*":p.PropTypes.any,defaultValue:p.PropTypes.string,onBlur:p.PropTypes.func,onFocus:p.PropTypes.func,onChange:p.PropTypes.func,placeholder:p.PropTypes.string,type:p.PropTypes.string,value:p.PropTypes.string})},y.defaultProps={component:"div",hidePlaceholderOnFocus:!0,inputProps:{type:"text"}},y.internalKeys=Object.keys(y.defaultProps),t.default=y}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGU3YTJkYjNkM2VhYWEwMDFjM2I4Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiY2xhc3NuYW1lc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9ib3VuZGxlc3MtaW5wdXQvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpbnN0YWxsZWRNb2R1bGVzIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmVxdWlyZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIndyaXRhYmxlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fIiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfX19kZWZhdWx0IiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCIsIl9leHRlbmRzIiwiYXNzaWduIiwidGFyZ2V0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImlzRnVuY3Rpb24iLCJ4IiwiSW5wdXQiLCJfUmVhY3QkUHVyZUNvbXBvbmVudCIsIl9yZWYiLCJfdGVtcCIsIl90aGlzIiwiX3JldCIsInRoaXMiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImdldFByb3RvdHlwZU9mIiwiYXBwbHkiLCJjb25jYXQiLCJzdGF0ZSIsImlucHV0IiwiaXNDb250cm9sbGVkIiwiaW5wdXRQcm9wcyIsImlzRm9jdXNlZCIsInNldElucHV0VmFsdWUiLCJ1bmRlZmluZWQiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwicmVmcyIsImZpZWxkIiwiaGFuZGxlQmx1ciIsImV2ZW50Iiwib25CbHVyIiwiaGFuZGxlRm9jdXMiLCJvbkZvY3VzIiwiaGFuZGxlQ2hhbmdlIiwib25DaGFuZ2UiLCJkZWZhdWx0VmFsdWUiLCJuZXh0UHJvcHMiLCJuZXh0VmFsdWUiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJidWJibGVzIiwiaXNOb25FbXB0eSIsImhpZGVQbGFjZWhvbGRlck9uRm9jdXMiLCJwbGFjZWhvbGRlciIsImEiLCJjcmVhdGVFbGVtZW50IiwiY29tcG9uZW50IiwiaW50ZXJuYWxLZXlzIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJnZXRQbGFjZWhvbGRlclRleHQiLCJyZWYiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiKiIsImFueSIsInN0cmluZyIsImJvb2wiLCJzaGFwZSIsImZ1bmMiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwia2V5cyJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLFFBQ0UsU0FBVUMsR0NHbkIsUUFBQUMsR0FBQUMsR0FHQSxHQUFBQyxFQUFBRCxHQUNBLE1BQUFDLEdBQUFELEdBQUFILE9BR0EsSUFBQUQsR0FBQUssRUFBQUQsSUFDQUUsRUFBQUYsRUFDQUcsR0FBQSxFQUNBTixXQVVBLE9BTkFDLEdBQUFFLEdBQUFJLEtBQUFSLEVBQUFDLFFBQUFELElBQUFDLFFBQUFFLEdBR0FILEVBQUFPLEdBQUEsRUFHQVAsRUFBQUMsUUF2QkEsR0FBQUksS0ErREEsT0FuQ0FGLEdBQUFNLEVBQUFQLEVBR0FDLEVBQUFPLEVBQUFMLEVBR0FGLEVBQUFHLEVBQUEsU0FBQUssR0FBMkMsTUFBQUEsSUFHM0NSLEVBQUFTLEVBQUEsU0FBQVgsRUFBQVksRUFBQUMsR0FDQVgsRUFBQVksRUFBQWQsRUFBQVksSUFDQUcsT0FBQUMsZUFBQWhCLEVBQUFZLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BWCxFQUFBa0IsRUFBQSxTQUFBckIsR0FDQSxHQUFBYyxHQUFBZCxLQUFBc0IsV0FDQSxXQUEyQixNQUFBdEIsR0FBQSxTQUMzQixXQUFpQyxNQUFBQSxHQUVqQyxPQURBRyxHQUFBUyxFQUFBRSxFQUFBLElBQUFBLEdBQ0FBLEdBSUFYLEVBQUFZLEVBQUEsU0FBQVEsRUFBQUMsR0FBc0QsTUFBQVIsUUFBQVMsVUFBQUMsZUFBQWxCLEtBQUFlLEVBQUFDLElBR3REckIsRUFBQXdCLEVBQUEsR0FHQXhCLElBQUF5QixFQUFBLEtET00sU0FBVTVCLEVBQVFDLEdFdkV4QkQsRUFBQUMsUUFBQTRCLFFBQUEsOEJGNkVNLFNBQVU3QixFQUFRQyxHRzdFeEJE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QUFBLFVBQVV5RSxJQUVmcEIsYUFBY3JELEVBQUEsVUFBVTBFLE9BQ3hCMUIsT0FBUWhELEVBQUEsVUFBVTZFLEtBQ2xCM0IsUUFBU2xELEVBQUEsVUFBVTZFLEtBQ25CekIsU0FBVXBELEVBQUEsVUFBVTZFLEtBQ3BCaEIsWUFBYTdELEVBQUEsVUFBVTBFLE9BQ3ZCSSxLQUFNOUUsRUFBQSxVQUFVMEUsT0FDaEI3RyxNQUFPbUMsRUFBQSxVQUFVMEUsVUE3QlJyRCxFQWlDVjBELGNBQ0hmLFVBQVcsTUFDWEosd0JBQXdCLEVBQ3hCdEIsWUFDSXdDLEtBQU0sU0FyQ0d6RCxFQXlDVjRDLGFBQWUvRixPQUFPOEcsS0FBSzNELEVBQU0wRCxjTG1Dd21ML0YsRUFBNkIsUUs1RTVwTHFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtb21pdC1rZXlzXCIpO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3NuYW1lc1wiKTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX19fZGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18ubihfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfXyk7XG52YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odGFyZ2V0KXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXt2YXIgc291cmNlPWFyZ3VtZW50c1tpXTtmb3IodmFyIGtleSBpbiBzb3VyY2Upe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2Usa2V5KSl7dGFyZ2V0W2tleV09c291cmNlW2tleV07fX19cmV0dXJuIHRhcmdldDt9O3ZhciBfY3JlYXRlQ2xhc3M9ZnVuY3Rpb24oKXtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCxwcm9wcyl7Zm9yKHZhciBpPTA7aTxwcm9wcy5sZW5ndGg7aSsrKXt2YXIgZGVzY3JpcHRvcj1wcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGU9ZGVzY3JpcHRvci5lbnVtZXJhYmxlfHxmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZT10cnVlO2lmKFwidmFsdWVcImluIGRlc2NyaXB0b3IpZGVzY3JpcHRvci53cml0YWJsZT10cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsZGVzY3JpcHRvci5rZXksZGVzY3JpcHRvcik7fX1yZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IscHJvdG9Qcm9wcyxzdGF0aWNQcm9wcyl7aWYocHJvdG9Qcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSxwcm90b1Byb3BzKTtpZihzdGF0aWNQcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7fTt9KCk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO319ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZixjYWxsKXtpZighc2VsZil7dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO31yZXR1cm4gY2FsbCYmKHR5cGVvZiBjYWxsPT09XCJvYmplY3RcInx8dHlwZW9mIGNhbGw9PT1cImZ1bmN0aW9uXCIpP2NhbGw6c2VsZjt9ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLHN1cGVyQ2xhc3Mpe2lmKHR5cGVvZiBzdXBlckNsYXNzIT09XCJmdW5jdGlvblwiJiZzdXBlckNsYXNzIT09bnVsbCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrdHlwZW9mIHN1cGVyQ2xhc3MpO31zdWJDbGFzcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzJiZzdXBlckNsYXNzLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnN1YkNsYXNzLGVudW1lcmFibGU6ZmFsc2Usd3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZX19KTtpZihzdXBlckNsYXNzKU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3Msc3VwZXJDbGFzcyk6c3ViQ2xhc3MuX19wcm90b19fPXN1cGVyQ2xhc3M7fXZhciBpc0Z1bmN0aW9uPWZ1bmN0aW9uIGlzRnVuY3Rpb24oeCl7cmV0dXJuIHR5cGVvZiB4PT09J2Z1bmN0aW9uJzt9O3ZhciBJbnB1dD1mdW5jdGlvbihfUmVhY3QkUHVyZUNvbXBvbmVudCl7X2luaGVyaXRzKElucHV0LF9SZWFjdCRQdXJlQ29tcG9uZW50KTtmdW5jdGlvbiBJbnB1dCgpe3ZhciBfcmVmO3ZhciBfdGVtcCxfdGhpcyxfcmV0O19jbGFzc0NhbGxDaGVjayh0aGlzLElucHV0KTtmb3IodmFyIF9sZW49YXJndW1lbnRzLmxlbmd0aCxhcmdzPUFycmF5KF9sZW4pLF9rZXk9MDtfa2V5PF9sZW47X2tleSsrKXthcmdzW19rZXldPWFyZ3VtZW50c1tfa2V5XTt9cmV0dXJuIF9yZXQ9KF90ZW1wPShfdGhpcz1fcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLChfcmVmPUlucHV0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKElucHV0KSkuY2FsbC5hcHBseShfcmVmLFt0aGlzXS5jb25jYXQoYXJncykpKSxfdGhpcyksX3RoaXMuc3RhdGU9e2lucHV0OicnLGlzQ29udHJvbGxlZDp0eXBlb2YgX3RoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZT09PSdzdHJpbmcnLGlzRm9jdXNlZDpmYWxzZX0sX3RoaXMuc2V0SW5wdXRWYWx1ZT1mdW5jdGlvbigpe3ZhciB2YWx1ZT1hcmd1bWVudHMubGVuZ3RoPjAmJmFyZ3VtZW50c1swXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMF06Jyc7cmV0dXJuIF90aGlzLnNldFN0YXRlKHtpbnB1dDp2YWx1ZX0pO30sX3RoaXMuZ2V0VmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gX3RoaXMucmVmcy5maWVsZC52YWx1ZTt9LF90aGlzLmhhbmRsZUJsdXI9ZnVuY3Rpb24oZXZlbnQpe190aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6ZmFsc2V9KTtpZihpc0Z1bmN0aW9uKF90aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKT09PXRydWUpe190aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKGV2ZW50KTt9fSxfdGhpcy5oYW5kbGVGb2N1cz1mdW5jdGlvbihldmVudCl7X3RoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDp0cnVlfSk7aWYoaXNGdW5jdGlvbihfdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpPT09dHJ1ZSl7X3RoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTt9fSxfdGhpcy5oYW5kbGVDaGFuZ2U9ZnVuY3Rpb24oZXZlbnQpe2lmKF90aGlzLnN0YXRlLmlzQ29udHJvbGxlZD09PWZhbHNlKXtfdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7fWlmKGlzRnVuY3Rpb24oX3RoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSk9PT10cnVlKXtfdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTt9fSxfdGVtcCksX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsX3JldCk7fV9jcmVhdGVDbGFzcyhJbnB1dCxbe2tleTonY29tcG9uZW50V2lsbE1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKXtpZih0aGlzLnN0YXRlLmlzQ29udHJvbGxlZD09PXRydWUpe3JldHVybiB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKTt9dGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO319LHtrZXk6J2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtpZihuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSE9PXRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSl7dGhpcy5zZXRJbnB1dFZhbHVlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTt9fX0se2tleTonc2V0VmFsdWUnLHZhbHVlOmZ1bmN0aW9uIHNldFZhbHVlKG5leHRWYWx1ZSl7dGhpcy5zZXRJbnB1dFZhbHVlKG5leHRWYWx1ZSk7dGhpcy5yZWZzLmZpZWxkLnZhbHVlPW5leHRWYWx1ZTtpZih0aGlzLnN0YXRlLmlzQ29udHJvbGxlZD09PXRydWUpe3RoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLHtidWJibGVzOnRydWV9KSk7dGhpcy5yZWZzLmZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLHtidWJibGVzOnRydWV9KSk7fX19LHtrZXk6J2dldFBsYWNlaG9sZGVyVGV4dCcsdmFsdWU6ZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXJUZXh0KCl7dmFyIGlzTm9uRW1wdHk9dGhpcy5zdGF0ZS5pbnB1dCE9PScnO3ZhciBzaG91bGRTaG93UGxhY2Vob2xkZXI9dGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzPT09dHJ1ZT90aGlzLnN0YXRlLmlzRm9jdXNlZD09PWZhbHNlJiZpc05vbkVtcHR5PT09ZmFsc2U6aXNOb25FbXB0eT09PWZhbHNlO3JldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXI/dGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyOicnO319LHtrZXk6J3JlbmRlcicsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyKCl7cmV0dXJuIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQuYS5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LF9leHRlbmRzKHt9LF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCgpKHRoaXMucHJvcHMsSW5wdXQuaW50ZXJuYWxLZXlzKSx7Y2xhc3NOYW1lOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX19fZGVmYXVsdCgpKCdiLWlucHV0LXdyYXBwZXInLHRoaXMucHJvcHMuY2xhc3NOYW1lKSx0aXRsZTp0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfSksX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLmNyZWF0ZUVsZW1lbnQoJ2lucHV0JyxfZXh0ZW5kcyh7fSx0aGlzLnByb3BzLmlucHV0UHJvcHMse3JlZjonZmllbGQnLGNsYXNzTmFtZTpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQoKSgnYi1pbnB1dCcsdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSkscGxhY2Vob2xkZXI6bnVsbCxvbkJsdXI6dGhpcy5oYW5kbGVCbHVyLG9uRm9jdXM6dGhpcy5oYW5kbGVGb2N1cyxvbkNoYW5nZTp0aGlzLmhhbmRsZUNoYW5nZX0pKSxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0LmEuY3JlYXRlRWxlbWVudCgnZGl2Jyx7Y2xhc3NOYW1lOidiLWlucHV0LXBsYWNlaG9sZGVyIGItaW5wdXQnfSx0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpKSk7fX1dKTtyZXR1cm4gSW5wdXQ7fShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0LmEuUHVyZUNvbXBvbmVudCk7SW5wdXQucHJvcFR5cGVzPXsnKic6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uYW55LGNvbXBvbmVudDpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmcsaGlkZVBsYWNlaG9sZGVyT25Gb2N1czpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5ib29sLGlucHV0UHJvcHM6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc2hhcGUoeycqJzpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5hbnksZGVmYXVsdFZhbHVlOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLnN0cmluZyxvbkJsdXI6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uZnVuYyxvbkZvY3VzOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLmZ1bmMsb25DaGFuZ2U6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uZnVuYyxwbGFjZWhvbGRlcjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmcsdHlwZTpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmcsdmFsdWU6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc3RyaW5nfSl9O0lucHV0LmRlZmF1bHRQcm9wcz17Y29tcG9uZW50OidkaXYnLGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6dHJ1ZSxpbnB1dFByb3BzOnt0eXBlOid0ZXh0J319O0lucHV0LmludGVybmFsS2V5cz1PYmplY3Qua2V5cyhJbnB1dC5kZWZhdWx0UHJvcHMpOy8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gX193ZWJwYWNrX2V4cG9ydHNfX1tcImRlZmF1bHRcIl0gPSBJbnB1dDtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBpbmRleC5qcyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU3YTJkYjNkM2VhYWEwMDFjM2I4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm91bmRsZXNzLXV0aWxzLW9taXQta2V5c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIn1cbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3NuYW1lc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qczJcIjpcImNsYXNzbmFtZXNcIn1cbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJyZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnYm91bmRsZXNzLXV0aWxzLW9taXQta2V5cyc7XG5cbmNvbnN0IGlzRnVuY3Rpb24gPSAoeCkgPT4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG5cbi8qKlxuX19BbiBpbnB1dCBjb250cm9sIHdpdGggcGxhY2Vob2xkZXIgZW11bGF0aW9uIGZvciBub24tc3VwcG9ydGluZyBwbGF0Zm9ybXMuX19cblxuSW5wdXQgYWJzdHJhY3RzIGF3YXkgdGhlIGNyb3NzLXBsYXRmb3JtIGRpZmZlcmVuY2VzIG9mIHBsYWNlaG9sZGVyIHN0eWxpbmcgYW5kIGJlaGF2aW9ycywgZm9yIGV4YW1wbGU6IEludGVybmV0IEV4cGxvcmVyIGRpc21pc3NlcyBuYXRpdmUgcGxhY2Vob2xkZXJzIG9uIGlucHV0IGZvY3VzIGFuZCBvdGhlciBwbGF0Zm9ybXMgZG8gbm90LiBUaGlzIGNvbXBvbmVudCBlbnN1cmVzIHRoYXQgdGV4dCBpbnB1dCBjb250cm9scyB3aWxsIGZlZWwgYW5kIGJlaGF2ZSBzaW1pbGFybHkgb24gbW9yZSBkZXZpY2VzLlxuXG4jIyBDb21wb25lbnQgSW5zdGFuY2UgTWV0aG9kc1xuXG5XaGVuIHVzaW5nIGBJbnB1dGAgaW4geW91ciBwcm9qZWN0LCB5b3UgbWF5IGNhbGwgdGhlIGZvbGxvd2luZyBtZXRob2RzIG9uIGEgcmVuZGVyZWQgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudC4gVXNlIFtgcmVmc2BdKGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVmcy1hbmQtdGhlLWRvbS5odG1sKSB0byBnZXQgdGhlIGluc3RhbmNlLlxuXG4tIF9fZ2V0VmFsdWUoKV9fXG4gIHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGlucHV0IGZpZWxkXG5cbi0gX19zZXRWYWx1ZShzdHJpbmcpX19cbiAgcHJvZ3JhbW1hdGljYWxseSBzZXQgdGhlIGlucHV0IHZhbHVlOyB1c2VmdWwgZm9yIGNsZWFyaW5nIG91dCB0aGUgaW5wdXQgaW4gXCJ1bmNvbnRyb2xsZWRcIiBtb2RlIC0tIG5vdGUgdGhhdCBkaWdnaW5nIGludG8gdGhlIGludGVybmFscyBhbmQgc2V0dGluZyB0aGUgYHJlZnMuZmllbGQudmFsdWUgPSAnJ2AgZGlyZWN0bHkgd2lsbCBub3QgdHJpZ2dlciBldmVudHMgYW5kIG1lc3NlcyB1cCB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFueSBbUmVhY3Qtc3VwcG9ydGVkIGF0dHJpYnV0ZV0oaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90YWdzLWFuZC1hdHRyaWJ1dGVzLmh0bWwjaHRtbC1hdHRyaWJ1dGVzKVxuICAgICAgICAgKi9cbiAgICAgICAgJyonOiBQcm9wVHlwZXMuYW55LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvdmVycmlkZXMgdGhlIEhUTUwgY29udGFpbmVyIHRhZ1xuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0cmlnZ2VycyB0aGUgcGxhY2Vob2xkZXIgdG8gZGlzYXBwZWFyIHdoZW4gdGhlIGlucHV0IGZpZWxkIGlzIGZvY3VzZWQsIHJlYXBwZWFycyB3aGVuIHRoZSB1c2VyIGhhcyB0YWJiZWQgYXdheSBvciBmb2N1cyBpcyBtb3ZlZFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYW55IFtSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlXShodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RhZ3MtYW5kLWF0dHJpYnV0ZXMuaHRtbCNodG1sLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICcqJzogUHJvcFR5cGVzLmFueSxcblxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSW5wdXQuZGVmYXVsdFByb3BzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNDb250cm9sbGVkOiB0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlID09PSAnc3RyaW5nJyxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9IHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNGb2N1c2VkID09PSBmYWxzZSAmJiBpc05vbkVtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jb21wb25lbnRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2ItaW5wdXQtd3JhcHBlcicsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2ItaW5wdXQnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYi1pbnB1dC1wbGFjZWhvbGRlciBiLWlucHV0Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhY2thZ2VzL2JvdW5kbGVzcy1pbnB1dC9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=