module.exports=function(e){function r(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,r),t.l=!0,t.exports}var o={};return r.m=e,r.c=o,r.i=function(e){return e},r.d=function(e,o,n){r.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(o,"a",o),o},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=4)}([function(e,r){e.exports=require("boundless-button")},function(e,r){e.exports=require("boundless-utils-omit-keys")},function(e,r){e.exports=require("classnames")},function(e,r){e.exports=require("react")},function(e,r,o){"use strict";function n(e,r,o){return r in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o,e}function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function s(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function p(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var i=o(3),c=(o.n(i),o(2)),a=o.n(c),u=o(0),l=o.n(u),f=o(1),y=o.n(f),P=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},h=function(){function e(e,r){for(var o=0;o<r.length;o++){var n=r[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,o,n){return o&&e(r.prototype,o),n&&e(r,n),r}}(),b=function(e){function r(){return t(this,r),s(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return p(r,e),h(r,[{key:"renderCancel",value:function(){if(this.props.onCancel)return o.i(i.createElement)(l.a,P({},this.props.cancelProps,{className:a()("b-progress-cancel",this.props.cancelProps.className),component:this.props.cancelComponent,onPressed:this.props.onCancel}))}},{key:"renderProgress",value:function(){return o.i(i.createElement)(this.props.progressComponent,P({},this.props.progressProps,{className:a()("b-progress",this.props.progressProps.className,{"b-progress-indeterminate":void 0===this.props.progress}),role:"presentation",style:P({},this.props.progressProps.style,n({},this.props.tweenProperty,this.props.progress))}))}},{key:"render",value:function(){return o.i(i.createElement)(this.props.component,P({},y()(this.props,r.internalKeys),{className:a()("b-progress-wrapper",this.props.className),"data-progress":void 0!==this.props.progress?this.props.progress:null}),this.renderProgress(),this.props.children,this.renderCancel())}}]),r}(i.PureComponent);b.propTypes={"*":i.PropTypes.any,cancelComponent:i.PropTypes.oneOfType([i.PropTypes.string,i.PropTypes.func]),cancelProps:i.PropTypes.shape({"*":i.PropTypes.any}),component:i.PropTypes.string,onCancel:i.PropTypes.func,progress:i.PropTypes.oneOfType([i.PropTypes.string,i.PropTypes.number]),progressComponent:i.PropTypes.string,progressProps:i.PropTypes.shape({"*":i.PropTypes.any}),tweenProperty:i.PropTypes.string},b.defaultProps={cancelComponent:"button",cancelProps:{},component:"div",onCancel:null,progress:void 0,progressComponent:"div",progressProps:{},tweenProperty:"width"},b.internalKeys=Object.keys(b.defaultProps),r.default=b}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDg2NWEzODFlN2JmZTRkZjAxNzA4Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy1idXR0b25cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiYm91bmRsZXNzLXV0aWxzLW9taXQta2V5c1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJjbGFzc25hbWVzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL3BhY2thZ2VzL2JvdW5kbGVzcy1wcm9ncmVzcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImluc3RhbGxlZE1vZHVsZXMiLCJpIiwibCIsImNhbGwiLCJtIiwiYyIsInZhbHVlIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJyZXF1aXJlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9kZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsIndyaXRhYmxlIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwic2VsZiIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fIiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX19fZGVmYXVsdCIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfYnV0dG9uX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX2J1dHRvbl9fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fIiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfX19kZWZhdWx0IiwiX2V4dGVuZHMiLCJhc3NpZ24iLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiUHJvZ3Jlc3MiLCJfUHVyZUNvbXBvbmVudCIsInRoaXMiLCJnZXRQcm90b3R5cGVPZiIsImFwcGx5Iiwib25DYW5jZWwiLCJhIiwiY2FuY2VsUHJvcHMiLCJjbGFzc05hbWUiLCJjb21wb25lbnQiLCJjYW5jZWxDb21wb25lbnQiLCJvblByZXNzZWQiLCJwcm9ncmVzc0NvbXBvbmVudCIsInByb2dyZXNzUHJvcHMiLCJiLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUiLCJ1bmRlZmluZWQiLCJwcm9ncmVzcyIsInJvbGUiLCJzdHlsZSIsInR3ZWVuUHJvcGVydHkiLCJpbnRlcm5hbEtleXMiLCJkYXRhLXByb2dyZXNzIiwicmVuZGVyUHJvZ3Jlc3MiLCJjaGlsZHJlbiIsInJlbmRlckNhbmNlbCIsInByb3BUeXBlcyIsIioiLCJhbnkiLCJvbmVPZlR5cGUiLCJz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RTdCaEIsY0FBZWhDLEVBQUEsVUFBVWtELE9BSXJCTCxJQUFLN0MsRUFBQSxVQUFVOEMsTUFNbkJSLGNBQWV0QyxFQUFBLFVBQVVnRCxRQXZEWjdCLEVBMERWaUMsY0FDSHZCLGdCQUFpQixTQUNqQkgsZUFDQUUsVUFBVyxNQUNYSixTQUFVLEtBQ1ZXLFNBQVVELE9BQ1ZILGtCQUFtQixNQUNuQkMsaUJBQ0FNLGNBQWUsU0FsRUZuQixFQXFFVm9CLGFBQWV4RSxPQUFPc0YsS0FBS2xDLEVBQVNpQyxjTmdDNG1KdkUsRUFBNkIsUU1yR25xSnNDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtYnV0dG9uXCIpO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm91bmRsZXNzLXV0aWxzLW9taXQta2V5c1wiKTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRzX18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc19idXR0b25fXyA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc19idXR0b25fX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfYnV0dG9uX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18ubihfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fKTtcbnZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0YXJnZXQpe2Zvcih2YXIgaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe3ZhciBzb3VyY2U9YXJndW1lbnRzW2ldO2Zvcih2YXIga2V5IGluIHNvdXJjZSl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSxrZXkpKXt0YXJnZXRba2V5XT1zb3VyY2Vba2V5XTt9fX1yZXR1cm4gdGFyZ2V0O307dmFyIF9jcmVhdGVDbGFzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LHByb3BzKXtmb3IodmFyIGk9MDtpPHByb3BzLmxlbmd0aDtpKyspe3ZhciBkZXNjcmlwdG9yPXByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZT1kZXNjcmlwdG9yLmVudW1lcmFibGV8fGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlPXRydWU7aWYoXCJ2YWx1ZVwiaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTtmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7aWYoa2V5IGluIG9iail7T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx3cml0YWJsZTp0cnVlfSk7fWVsc2V7b2JqW2tleV09dmFsdWU7fXJldHVybiBvYmo7fWZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSxDb25zdHJ1Y3Rvcil7aWYoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTt9fWZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsY2FsbCl7aWYoIXNlbGYpe3Rocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTt9cmV0dXJuIGNhbGwmJih0eXBlb2YgY2FsbD09PVwib2JqZWN0XCJ8fHR5cGVvZiBjYWxsPT09XCJmdW5jdGlvblwiKT9jYWxsOnNlbGY7fWZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcyxzdXBlckNsYXNzKXtpZih0eXBlb2Ygc3VwZXJDbGFzcyE9PVwiZnVuY3Rpb25cIiYmc3VwZXJDbGFzcyE9PW51bGwpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiK3R5cGVvZiBzdXBlckNsYXNzKTt9c3ViQ2xhc3MucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyYmc3VwZXJDbGFzcy5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTpzdWJDbGFzcyxlbnVtZXJhYmxlOmZhbHNlLHdyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWV9fSk7aWYoc3VwZXJDbGFzcylPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLHN1cGVyQ2xhc3MpOnN1YkNsYXNzLl9fcHJvdG9fXz1zdXBlckNsYXNzO312YXIgUHJvZ3Jlc3M9ZnVuY3Rpb24oX1B1cmVDb21wb25lbnQpe19pbmhlcml0cyhQcm9ncmVzcyxfUHVyZUNvbXBvbmVudCk7ZnVuY3Rpb24gUHJvZ3Jlc3MoKXtfY2xhc3NDYWxsQ2hlY2sodGhpcyxQcm9ncmVzcyk7cmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsKFByb2dyZXNzLl9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKFByb2dyZXNzKSkuYXBwbHkodGhpcyxhcmd1bWVudHMpKTt9X2NyZWF0ZUNsYXNzKFByb2dyZXNzLFt7a2V5OidyZW5kZXJDYW5jZWwnLHZhbHVlOmZ1bmN0aW9uIHJlbmRlckNhbmNlbCgpe2lmKHRoaXMucHJvcHMub25DYW5jZWwpe3JldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJjcmVhdGVFbGVtZW50XCJdKShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX2J1dHRvbl9fX2RlZmF1bHQuYSxfZXh0ZW5kcyh7fSx0aGlzLnByb3BzLmNhbmNlbFByb3BzLHtjbGFzc05hbWU6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfX19kZWZhdWx0KCkoJ2ItcHJvZ3Jlc3MtY2FuY2VsJyx0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSksY29tcG9uZW50OnRoaXMucHJvcHMuY2FuY2VsQ29tcG9uZW50LG9uUHJlc3NlZDp0aGlzLnByb3BzLm9uQ2FuY2VsfSkpO319fSx7a2V5OidyZW5kZXJQcm9ncmVzcycsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyUHJvZ3Jlc3MoKXtyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiY3JlYXRlRWxlbWVudFwiXSkodGhpcy5wcm9wcy5wcm9ncmVzc0NvbXBvbmVudCxfZXh0ZW5kcyh7fSx0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMse2NsYXNzTmFtZTpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQoKSgnYi1wcm9ncmVzcycsdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSx7J2ItcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6dGhpcy5wcm9wcy5wcm9ncmVzcz09PXVuZGVmaW5lZH0pLHJvbGU6J3ByZXNlbnRhdGlvbicsc3R5bGU6X2V4dGVuZHMoe30sdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLF9kZWZpbmVQcm9wZXJ0eSh7fSx0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHksdGhpcy5wcm9wcy5wcm9ncmVzcykpfSkpO319LHtrZXk6J3JlbmRlcicsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyKCl7cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcImNyZWF0ZUVsZW1lbnRcIl0pKHRoaXMucHJvcHMuY29tcG9uZW50LF9leHRlbmRzKHt9LF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCgpKHRoaXMucHJvcHMsUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKSx7Y2xhc3NOYW1lOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX19fZGVmYXVsdCgpKCdiLXByb2dyZXNzLXdyYXBwZXInLHRoaXMucHJvcHMuY2xhc3NOYW1lKSwnZGF0YS1wcm9ncmVzcyc6dGhpcy5wcm9wcy5wcm9ncmVzcyE9PXVuZGVmaW5lZD90aGlzLnByb3BzLnByb2dyZXNzOm51bGx9KSx0aGlzLnJlbmRlclByb2dyZXNzKCksdGhpcy5wcm9wcy5jaGlsZHJlbix0aGlzLnJlbmRlckNhbmNlbCgpKTt9fV0pO3JldHVybiBQcm9ncmVzczt9KF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHVyZUNvbXBvbmVudFwiXSk7UHJvZ3Jlc3MucHJvcFR5cGVzPXsnKic6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uYW55LGNhbmNlbENvbXBvbmVudDpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5vbmVPZlR5cGUoW19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLnN0cmluZyxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5mdW5jXSksY2FuY2VsUHJvcHM6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc2hhcGUoeycqJzpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5hbnl9KSxjb21wb25lbnQ6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc3RyaW5nLG9uQ2FuY2VsOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLmZ1bmMscHJvZ3Jlc3M6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0ub25lT2ZUeXBlKFtfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmcsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0ubnVtYmVyXSkscHJvZ3Jlc3NDb21wb25lbnQ6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc3RyaW5nLHByb2dyZXNzUHJvcHM6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uc2hhcGUoeycqJzpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5hbnl9KSx0d2VlblByb3BlcnR5Ol9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLnN0cmluZ307UHJvZ3Jlc3MuZGVmYXVsdFByb3BzPXtjYW5jZWxDb21wb25lbnQ6J2J1dHRvbicsY2FuY2VsUHJvcHM6e30sY29tcG9uZW50OidkaXYnLG9uQ2FuY2VsOm51bGwscHJvZ3Jlc3M6dW5kZWZpbmVkLHByb2dyZXNzQ29tcG9uZW50OidkaXYnLHByb2dyZXNzUHJvcHM6e30sdHdlZW5Qcm9wZXJ0eTond2lkdGgnfTtQcm9ncmVzcy5pbnRlcm5hbEtleXM9T2JqZWN0LmtleXMoUHJvZ3Jlc3MuZGVmYXVsdFByb3BzKTsvKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gUHJvZ3Jlc3M7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaW5kZXguanMiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NjVhMzgxZTdiZmU0ZGYwMTcwOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy1idXR0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJib3VuZGxlc3MtYnV0dG9uXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJib3VuZGxlc3MtdXRpbHMtb21pdC1rZXlzXCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJjbGFzc25hbWVzXCJ9XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBQcm9wVHlwZXMsIFB1cmVDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IEJ1dHRvbiBmcm9tICdib3VuZGxlc3MtYnV0dG9uJztcbmltcG9ydCBvbWl0IGZyb20gJ2JvdW5kbGVzcy11dGlscy1vbWl0LWtleXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzcyBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbnkgW1JlYWN0LXN1cHBvcnRlZCBhdHRyaWJ1dGVdKGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdGFncy1hbmQtYXR0cmlidXRlcy5odG1sI2h0bWwtYXR0cmlidXRlcylcbiAgICAgICAgICovXG4gICAgICAgICcqJzogUHJvcFR5cGVzLmFueSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW55IHZhbGlkIEhUTUwgdGFnIG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGNhbmNlbENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGNhbmNlbFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBhbnkgW1JlYWN0LXN1cHBvcnRlZCBhdHRyaWJ1dGVdKGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdGFncy1hbmQtYXR0cmlidXRlcy5odG1sI2h0bWwtYXR0cmlidXRlcylcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJyonOiBQcm9wVHlwZXMuYW55LFxuICAgICAgICB9KSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW55IHZhbGlkIEhUTUwgdGFnIG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgc3VwcGxpZWQsIGFkZHMgYSBjYW5jZWwgZWxlbWVudCBhbmQgY2FsbHMgdGhpcyBmdW5jdGlvbiB3aGVuIHRoYXQgZWxlbWVudCBpcyBjbGlja2VkXG4gICAgICAgICAqL1xuICAgICAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBpbnRlZ2VyIChhbmQgdW5pdCwgaWYgYXBwbGljYWJsZSkgb2YgdGhlIGN1cnJlbnQgcHJvZ3Jlc3Mgc3RhdGUsIGUuZy4gMC4wMSAob3BhY2l0eSlcbiAgICAgICAgICovXG4gICAgICAgIHByb2dyZXNzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbnkgdmFsaWQgSFRNTCB0YWcgbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvZ3Jlc3NDb21wb25lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYW55IFtSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlXShodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RhZ3MtYW5kLWF0dHJpYnV0ZXMuaHRtbCNodG1sLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICcqJzogUHJvcFR5cGVzLmFueSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBDU1MgcHJvcGVydHkgdG8gdHdlZW4gKG11c3QgYWNjZXB0IHBlcmNlbnRhZ2VzKSAtIGRlZmF1bHRzIHRvIFwid2lkdGhcIlxuICAgICAgICAgKi9cbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxDb21wb25lbnQ6ICdidXR0b24nLFxuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIG9uQ2FuY2VsOiBudWxsLFxuICAgICAgICBwcm9ncmVzczogdW5kZWZpbmVkLFxuICAgICAgICBwcm9ncmVzc0NvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgICAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhQcm9ncmVzcy5kZWZhdWx0UHJvcHMpXG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2ItcHJvZ3Jlc3MtY2FuY2VsJywgdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ9e3RoaXMucHJvcHMuY2FuY2VsQ29tcG9uZW50fVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5wcm9ncmVzc0NvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgnYi1wcm9ncmVzcycsIHRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ItcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFByb2dyZXNzLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgnYi1wcm9ncmVzcy13cmFwcGVyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIGRhdGEtcHJvZ3Jlc3M9e3RoaXMucHJvcHMucHJvZ3Jlc3MgIT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMucHJvZ3Jlc3MgOiBudWxsfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC90aGlzLnByb3BzLmNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9ib3VuZGxlc3MtcHJvZ3Jlc3MvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9