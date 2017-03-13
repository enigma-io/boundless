module.exports=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e){t.exports=require("boundless-utils-omit-keys")},function(t,e){t.exports=require("boundless-utils-uuid")},function(t,e){t.exports=require("classnames")},function(t,e){t.exports=require("react")},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=r(3),i=(r.n(a),r(2)),u=r.n(i),l=r(0),c=r.n(l),p=r(1),f=r.n(p),d=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},y=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=function(t){function e(){var t,r,s,a;n(this,e);for(var i=arguments.length,u=Array(i),l=0;l<i;l++)u[l]=arguments[l];return r=s=o(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(u))),s.state={status:e.status.LOADING},a=r,o(s,a)}return s(e,t),y(e,[{key:"componentWillReceiveProps",value:function(t){t.src!==this.props.src&&(this.resetPreloader(),this.setState({status:e.status.LOADING}))}},{key:"componentDidMount",value:function(){this.preload()}},{key:"componentDidUpdate",value:function(){this.preload()}},{key:"componentWillUnmount",value:function(){this.resetPreloader()}},{key:"resetPreloader",value:function(){this.loader.onload=null,this.loader.onerror=null,this.loader=null}},{key:"preload",value:function(){var t=this;this.loader||(this.loader=document.createElement("img"),this.loader.onload=function(){return t.setState({status:e.status.LOADED})},this.loader.onerror=function(){return t.setState({status:e.status.ERROR})},this.loader.src=this.props.src)}},{key:"render",value:function(){return r.i(a.createElement)(this.props.component,d({},c()(this.props,e.internalKeys),{className:u()("b-image",this.props.className,{"b-image-loading":this.state.status===e.status.LOADING,"b-image-loaded":this.state.status===e.status.LOADED,"b-image-error":this.state.status===e.status.ERROR}),title:this.props.alt,role:"img",style:d({},this.props.style,{backgroundImage:"url("+this.props.src+")"})})," ")}}]),e}(a.PureComponent);h.status={LOADING:f()(),LOADED:f()(),ERROR:f()()},h.propTypes={"*":a.PropTypes.any,alt:a.PropTypes.string,component:a.PropTypes.string,src:a.PropTypes.string.isRequired},h.defaultProps={alt:"",component:"div",src:"about:blank"},h.internalKeys=Object.keys(h.defaultProps),e.default=h}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDBhZmY3NDgyYzBlMDEyMjViMzkwIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiYm91bmRsZXNzLXV0aWxzLXV1aWRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiY2xhc3NuYW1lc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9ib3VuZGxlc3MtaW1hZ2UvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpbnN0YWxsZWRNb2R1bGVzIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmVxdWlyZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIndyaXRhYmxlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fIiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfX19kZWZhdWx0IiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX2JvdW5kbGVzc191dGlsc191dWlkX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX3V1aWRfX19kZWZhdWx0IiwiX2V4dGVuZHMiLCJhc3NpZ24iLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiSW1hZ2UiLCJfUHVyZUNvbXBvbmVudCIsIl9yZWYiLCJfdGVtcCIsIl90aGlzIiwiX3JldCIsInRoaXMiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImdldFByb3RvdHlwZU9mIiwiYXBwbHkiLCJjb25jYXQiLCJzdGF0ZSIsInN0YXR1cyIsIkxPQURJTkciLCJuZXh0UHJvcHMiLCJzcmMiLCJyZXNldFByZWxvYWRlciIsInNldFN0YXRlIiwicHJlbG9hZCIsImxvYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJfdGhpczIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJMT0FERUQiLCJFUlJPUiIsImNvbXBvbmVudCIsImludGVybmFsS2V5cyIsImNsYXNzTmFtZSIsImItaW1hZ2UtbG9hZGluZyIsImItaW1hZ2UtbG9hZGVkIiwiYi1pbWFnZS1lcnJvciIsInRpdGxlIiwiYWx0Iiwicm9sZSIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicHJvcFR5cGVzIiwiKiIsImFueSIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJkZWZhdWx0UHJvcHMiLCJrZXlzIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsUUFDRSxTQUFVQyxHQ0duQixRQUFBQyxHQUFBQyxHQUdBLEdBQUFDLEVBQUFELEdBQ0EsTUFBQUMsR0FBQUQsR0FBQUgsT0FHQSxJQUFBRCxHQUFBSyxFQUFBRCxJQUNBRSxFQUFBRixFQUNBRyxHQUFBLEVBQ0FOLFdBVUEsT0FOQUMsR0FBQUUsR0FBQUksS0FBQVIsRUFBQUMsUUFBQUQsSUFBQUMsUUFBQUUsR0FHQUgsRUFBQU8sR0FBQSxFQUdBUCxFQUFBQyxRQXZCQSxHQUFBSSxLQStEQSxPQW5DQUYsR0FBQU0sRUFBQVAsRUFHQUMsRUFBQU8sRUFBQUwsRUFHQUYsRUFBQUcsRUFBQSxTQUFBSyxHQUEyQyxNQUFBQSxJQUczQ1IsRUFBQVMsRUFBQSxTQUFBWCxFQUFBWSxFQUFBQyxHQUNBWCxFQUFBWSxFQUFBZCxFQUFBWSxJQUNBRyxPQUFBQyxlQUFBaEIsRUFBQVksR0FDQUssY0FBQSxFQUNBQyxZQUFBLEVBQ0FDLElBQUFOLEtBTUFYLEVBQUFrQixFQUFBLFNBQUFyQixHQUNBLEdBQUFjLEdBQUFkLEtBQUFzQixXQUNBLFdBQTJCLE1BQUF0QixHQUFBLFNBQzNCLFdBQWlDLE1BQUFBLEdBRWpDLE9BREFHLEdBQUFTLEVBQUFFLEVBQUEsSUFBQUEsR0FDQUEsR0FJQVgsRUFBQVksRUFBQSxTQUFBUSxFQUFBQyxHQUFzRCxNQUFBUixRQUFBUyxVQUFBQyxlQUFBbEIsS0FBQWUsRUFBQUMsSUFHdERyQixFQUFBd0IsRUFBQSxHQUdBeEIsSUFBQXlCLEVBQUEsS0RPTSxTQUFVNUIsRUFBUUMsR0V2RXhCRCxFQUFBQyxRQUFBNEIsUUFBQSw4QkY2RU0sU0FBVTdCLEVBQVFDLEdHN0V4QkQsRUFBQUMsUUFBQTRCLFFBQUEseUJIbUZNLFNBQVU3QixFQUFRQyxHSW5G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cEQsS0FDT21CLEtBQUtWLE1BQU0yQyxPQUNkQyx1QkFBd0JsQyxLQUFLVixNQUFNc0IsSUFBbkMsUUFYUixTTjhCZ2dIbEIsR01yR3orR3BCLEVBQUEsY0FBZG9CLEdBQ1ZlLFFBQ0hDLFFBQVM5QixNQUNUMEMsT0FBUTFDLE1BQ1IyQyxNQUFPM0MsT0FKTWMsRUFPVnlDLFdBSUhDLElBQUs5RCxFQUFBLFVBQVUrRCxJQUtmTixJQUFLekQsRUFBQSxVQUFVZ0UsT0FLZmQsVUFBV2xELEVBQUEsVUFBVWdFLE9BS3JCMUIsSUFBS3RDLEVBQUEsVUFBVWdFLE9BQU9DLFlBMUJUN0MsRUE2QlY4QyxjQUNIVCxJQUFLLEdBQ0xQLFVBQVcsTUFDWFosSUFBSyxlQWhDUWxCLEVBbUNWK0IsYUFBZWpGLE9BQU9pRyxLQUFLL0MsRUFBTThDLGNOa0U2cElsRixFQUE2QixRTXJHanRJb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4vKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIik7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtdXVpZFwiKTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRzX18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX3V1aWRfX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fKTtcbnZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0YXJnZXQpe2Zvcih2YXIgaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe3ZhciBzb3VyY2U9YXJndW1lbnRzW2ldO2Zvcih2YXIga2V5IGluIHNvdXJjZSl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSxrZXkpKXt0YXJnZXRba2V5XT1zb3VyY2Vba2V5XTt9fX1yZXR1cm4gdGFyZ2V0O307dmFyIF9jcmVhdGVDbGFzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LHByb3BzKXtmb3IodmFyIGk9MDtpPHByb3BzLmxlbmd0aDtpKyspe3ZhciBkZXNjcmlwdG9yPXByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZT1kZXNjcmlwdG9yLmVudW1lcmFibGV8fGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlPXRydWU7aWYoXCJ2YWx1ZVwiaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsQ29uc3RydWN0b3Ipe2lmKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcikpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX1mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLGNhbGwpe2lmKCFzZWxmKXt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7fXJldHVybiBjYWxsJiYodHlwZW9mIGNhbGw9PT1cIm9iamVjdFwifHx0eXBlb2YgY2FsbD09PVwiZnVuY3Rpb25cIik/Y2FsbDpzZWxmO31mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3Msc3VwZXJDbGFzcyl7aWYodHlwZW9mIHN1cGVyQ2xhc3MhPT1cImZ1bmN0aW9uXCImJnN1cGVyQ2xhc3MhPT1udWxsKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIit0eXBlb2Ygc3VwZXJDbGFzcyk7fXN1YkNsYXNzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MmJnN1cGVyQ2xhc3MucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6c3ViQ2xhc3MsZW51bWVyYWJsZTpmYWxzZSx3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlfX0pO2lmKHN1cGVyQ2xhc3MpT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcyxzdXBlckNsYXNzKTpzdWJDbGFzcy5fX3Byb3RvX189c3VwZXJDbGFzczt9dmFyIEltYWdlPWZ1bmN0aW9uKF9QdXJlQ29tcG9uZW50KXtfaW5oZXJpdHMoSW1hZ2UsX1B1cmVDb21wb25lbnQpO2Z1bmN0aW9uIEltYWdlKCl7dmFyIF9yZWY7dmFyIF90ZW1wLF90aGlzLF9yZXQ7X2NsYXNzQ2FsbENoZWNrKHRoaXMsSW1hZ2UpO2Zvcih2YXIgX2xlbj1hcmd1bWVudHMubGVuZ3RoLGFyZ3M9QXJyYXkoX2xlbiksX2tleT0wO19rZXk8X2xlbjtfa2V5Kyspe2FyZ3NbX2tleV09YXJndW1lbnRzW19rZXldO31yZXR1cm4gX3JldD0oX3RlbXA9KF90aGlzPV9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsKF9yZWY9SW1hZ2UuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW1hZ2UpKS5jYWxsLmFwcGx5KF9yZWYsW3RoaXNdLmNvbmNhdChhcmdzKSkpLF90aGlzKSxfdGhpcy5zdGF0ZT17c3RhdHVzOkltYWdlLnN0YXR1cy5MT0FESU5HfSxfdGVtcCksX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsX3JldCk7fV9jcmVhdGVDbGFzcyhJbWFnZSxbe2tleTonY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsdmFsdWU6ZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe2lmKG5leHRQcm9wcy5zcmMhPT10aGlzLnByb3BzLnNyYyl7dGhpcy5yZXNldFByZWxvYWRlcigpO3RoaXMuc2V0U3RhdGUoe3N0YXR1czpJbWFnZS5zdGF0dXMuTE9BRElOR30pO319fSx7a2V5Oidjb21wb25lbnREaWRNb3VudCcsdmFsdWU6ZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKXt0aGlzLnByZWxvYWQoKTt9fSx7a2V5Oidjb21wb25lbnREaWRVcGRhdGUnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpe3RoaXMucHJlbG9hZCgpO319LHtrZXk6J2NvbXBvbmVudFdpbGxVbm1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpe3RoaXMucmVzZXRQcmVsb2FkZXIoKTt9fSx7a2V5OidyZXNldFByZWxvYWRlcicsdmFsdWU6ZnVuY3Rpb24gcmVzZXRQcmVsb2FkZXIoKXt0aGlzLmxvYWRlci5vbmxvYWQ9bnVsbDt0aGlzLmxvYWRlci5vbmVycm9yPW51bGw7dGhpcy5sb2FkZXI9bnVsbDt9fSx7a2V5OidwcmVsb2FkJyx2YWx1ZTpmdW5jdGlvbiBwcmVsb2FkKCl7dmFyIF90aGlzMj10aGlzO2lmKHRoaXMubG9hZGVyKXtyZXR1cm47fXRoaXMubG9hZGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO3RoaXMubG9hZGVyLm9ubG9hZD1mdW5jdGlvbigpe3JldHVybiBfdGhpczIuc2V0U3RhdGUoe3N0YXR1czpJbWFnZS5zdGF0dXMuTE9BREVEfSk7fTt0aGlzLmxvYWRlci5vbmVycm9yPWZ1bmN0aW9uKCl7cmV0dXJuIF90aGlzMi5zZXRTdGF0ZSh7c3RhdHVzOkltYWdlLnN0YXR1cy5FUlJPUn0pO307dGhpcy5sb2FkZXIuc3JjPXRoaXMucHJvcHMuc3JjO319LHtrZXk6J3JlbmRlcicsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyKCl7cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcImNyZWF0ZUVsZW1lbnRcIl0pKHRoaXMucHJvcHMuY29tcG9uZW50LF9leHRlbmRzKHt9LF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCgpKHRoaXMucHJvcHMsSW1hZ2UuaW50ZXJuYWxLZXlzKSx7Y2xhc3NOYW1lOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX19fZGVmYXVsdCgpKCdiLWltYWdlJyx0aGlzLnByb3BzLmNsYXNzTmFtZSx7J2ItaW1hZ2UtbG9hZGluZyc6dGhpcy5zdGF0ZS5zdGF0dXM9PT1JbWFnZS5zdGF0dXMuTE9BRElORywnYi1pbWFnZS1sb2FkZWQnOnRoaXMuc3RhdGUuc3RhdHVzPT09SW1hZ2Uuc3RhdHVzLkxPQURFRCwnYi1pbWFnZS1lcnJvcic6dGhpcy5zdGF0ZS5zdGF0dXM9PT1JbWFnZS5zdGF0dXMuRVJST1J9KSx0aXRsZTp0aGlzLnByb3BzLmFsdCxyb2xlOidpbWcnLHN0eWxlOl9leHRlbmRzKHt9LHRoaXMucHJvcHMuc3R5bGUse2JhY2tncm91bmRJbWFnZTondXJsKCcrdGhpcy5wcm9wcy5zcmMrJyknfSl9KSwnXFx4QTAnKTt9fV0pO3JldHVybiBJbWFnZTt9KF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHVyZUNvbXBvbmVudFwiXSk7SW1hZ2Uuc3RhdHVzPXtMT0FESU5HOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fX2RlZmF1bHQoKSgpLExPQURFRDpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX3V1aWRfX19kZWZhdWx0KCkoKSxFUlJPUjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX3V1aWRfX19kZWZhdWx0KCkoKX07SW1hZ2UucHJvcFR5cGVzPXsnKic6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uYW55LGFsdDpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmcsY29tcG9uZW50Ol9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLnN0cmluZyxzcmM6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc3RyaW5nLmlzUmVxdWlyZWR9O0ltYWdlLmRlZmF1bHRQcm9wcz17YWx0OicnLGNvbXBvbmVudDonZGl2JyxzcmM6J2Fib3V0OmJsYW5rJ307SW1hZ2UuaW50ZXJuYWxLZXlzPU9iamVjdC5rZXlzKEltYWdlLmRlZmF1bHRQcm9wcyk7LyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBfX3dlYnBhY2tfZXhwb3J0c19fW1wiZGVmYXVsdFwiXSA9IEltYWdlO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGluZGV4LmpzIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGFmZjc0ODJjMGUwMTIyNWIzOTAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtb21pdC1rZXlzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiYm91bmRsZXNzLXV0aWxzLW9taXQta2V5c1wifVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtdXVpZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy11dWlkXCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJjbGFzc25hbWVzXCJ9XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBQcm9wVHlwZXMsIFB1cmVDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnYm91bmRsZXNzLXV0aWxzLW9taXQta2V5cyc7XG5pbXBvcnQgdXVpZCBmcm9tICdib3VuZGxlc3MtdXRpbHMtdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogdXVpZCgpLFxuICAgICAgICBMT0FERUQ6IHV1aWQoKSxcbiAgICAgICAgRVJST1I6IHV1aWQoKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogYW55IFtSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlXShodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RhZ3MtYW5kLWF0dHJpYnV0ZXMuaHRtbCNodG1sLWF0dHJpYnV0ZXMpXG4gICAgICAgICAqL1xuICAgICAgICAnKic6IFByb3BUeXBlcy5hbnksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgd3JpdHRlbiBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2UgZm9yIHNlYXJjaCBlbmdpbmVzLCBob3ZlcnRleHQgYW5kIHRob3NlIHVzaW5nIGFjY2Vzc2liaWxpdHkgdGVjaG5vbG9naWVzXG4gICAgICAgICAqL1xuICAgICAgICBhbHQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG92ZXJyaWRlcyB0aGUgY29tcG9uZW50IEhUTUwgdGFnXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgdmFsaWQgcGF0aCB0byB0aGUgZGVzaXJlZCBpbWFnZVxuICAgICAgICAgKi9cbiAgICAgICAgc3JjOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYWx0OiAnJyxcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgc3JjOiAnYWJvdXQ6YmxhbmsnLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhJbWFnZS5kZWZhdWx0UHJvcHMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkgICAgIHsgdGhpcy5wcmVsb2FkKCk7IH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSAgICB7IHRoaXMucHJlbG9hZCgpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgeyB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7IH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jb21wb25lbnRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBJbWFnZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2ItaW1hZ2UnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAnYi1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IEltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAnYi1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ2ItaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICByb2xlPSdpbWcnXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhY2thZ2VzL2JvdW5kbGVzcy1pbWFnZS9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=