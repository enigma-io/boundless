"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,r,s){return r&&e(t.prototype,r),s&&e(t,s),t}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_noop=require("../UIUtils/noop"),_noop2=_interopRequireDefault(_noop),UIImage=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"initialState",value:function(){return{status:t.status.LOADING}}},{key:"componentWillReceiveProps",value:function(e){e.src!==this.props.src&&(this.resetPreloader(),this.setState({status:t.status.LOADING}))}},{key:"componentDidMount",value:function(){this.preload()}},{key:"componentDidUpdate",value:function(){this.preload()}},{key:"componentWillUnmount",value:function(){this.resetPreloader()}},{key:"resetPreloader",value:function(){this.loader.onload=null,this.loader.onerror=null,this.loader=null}},{key:"preload",value:function(){var e=this;this.loader||(this.loader=document.createElement("img"),this.loader.onload=function(){return e.setState({status:t.status.LOADED})},this.loader.onerror=function(){return e.setState({status:t.status.ERROR})},this.loader.src=this.props.src)}},{key:"renderImage",value:function(){return this.props.displayAsBackgroundImage?_react2.default.createElement("div",_extends({},this.props.imageProps,{ref:"image",className:(0,_classnames2.default)(_defineProperty({"ui-image":!0},this.props.imageProps.className,!!this.props.imageProps.className)),title:this.props.alt,style:_extends({},this.props.imageProps.style,{backgroundImage:"url("+this.props.src+")"})})):_react2.default.createElement("img",_extends({},this.props.imageProps,{ref:"image",className:(0,_classnames2.default)(_defineProperty({"ui-image":!0},this.props.imageProps.className,!!this.props.imageProps.className)),src:this.props.src,alt:this.props.alt,onLoad:_noop2.default,onError:_noop2.default}))}},{key:"renderStatus",value:function(){return _react2.default.createElement("div",_extends({},this.props.statusProps,{ref:"status",className:(0,_classnames2.default)(_defineProperty({"ui-image-status":!0,"ui-image-loading":this.state.status===t.status.LOADING,"ui-image-loaded":this.state.status===t.status.LOADED,"ui-image-error":this.state.status===t.status.ERROR},this.props.statusProps.className,!!this.props.statusProps.className)),role:"presentation"}))}},{key:"render",value:function(){return _react2.default.createElement("div",_extends({},this.props,{alt:null,src:null,ref:"wrapper",className:(0,_classnames2.default)(_defineProperty({"ui-image-wrapper":!0},this.props.className,!!this.props.className))}),this.renderImage(),this.renderStatus())}}]),t}(_UIView3.default);UIImage.status={LOADING:"LOADING",LOADED:"LOADED",ERROR:"ERROR"},UIImage.propTypes={alt:_react2.default.PropTypes.string,displayAsBackgroundImage:_react2.default.PropTypes.bool,imageProps:_react2.default.PropTypes.object,src:_react2.default.PropTypes.string.isRequired,statusProps:_react2.default.PropTypes.object},UIImage.defaultProps={imageProps:{},statusProps:{}},exports.default=UIImage;