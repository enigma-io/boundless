'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An image block with placeholder support for loading and fallback scenarios.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIImage = function (_UIView) {
    _inherits(UIImage, _UIView);

    function UIImage() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            status: UIImage.status.LOADING
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIImage.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetPreloader();
            this.setState({ status: UIImage.status.LOADING });
        }
    };

    UIImage.prototype.componentDidMount = function componentDidMount() {
        this.preload();
    };

    UIImage.prototype.componentDidUpdate = function componentDidUpdate() {
        this.preload();
    };

    UIImage.prototype.componentWillUnmount = function componentWillUnmount() {
        this.resetPreloader();
    };

    UIImage.prototype.resetPreloader = function resetPreloader() {
        this.loader.onload = null;
        this.loader.onerror = null;
        this.loader = null;
    };

    UIImage.prototype.preload = function preload() {
        var _this2 = this;

        if (this.loader) {
            return;
        }

        this.loader = document.createElement('img');

        this.loader.onload = function () {
            return _this2.setState({ status: UIImage.status.LOADED });
        };
        this.loader.onerror = function () {
            return _this2.setState({ status: UIImage.status.ERROR });
        };

        this.loader.src = this.props.src;
    };

    UIImage.prototype.renderImage = function renderImage() {
        var _cx2;

        if (this.props.displayAsBackgroundImage) {
            var _cx;

            return _react2.default.createElement('div', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: (0, _classnames2.default)((_cx = {
                    'ui-image': true
                }, _cx[this.props.imageProps.className] = !!this.props.imageProps.className, _cx)),
                title: this.props.alt,
                style: _extends({}, this.props.imageProps.style, {
                    backgroundImage: 'url(' + this.props.src + ')'
                }) }));
        }

        return _react2.default.createElement('img', _extends({}, this.props.imageProps, {
            ref: 'image',
            className: (0, _classnames2.default)((_cx2 = {
                'ui-image': true
            }, _cx2[this.props.imageProps.className] = !!this.props.imageProps.className, _cx2)),
            src: this.props.src,
            alt: this.props.alt,
            onLoad: _noop2.default,
            onError: _noop2.default }));
    };

    UIImage.prototype.renderStatus = function renderStatus() {
        var _cx3;

        return _react2.default.createElement('div', _extends({}, this.props.statusProps, {
            ref: 'status',
            className: (0, _classnames2.default)((_cx3 = {
                'ui-image-status': true,
                'ui-image-loading': this.state.status === UIImage.status.LOADING,
                'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                'ui-image-error': this.state.status === UIImage.status.ERROR
            }, _cx3[this.props.statusProps.className] = !!this.props.statusProps.className, _cx3)),
            role: 'presentation' }));
    };

    UIImage.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                alt: null,
                src: null,
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-image-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderImage(),
            this.renderStatus()
        );
    };

    return UIImage;
}(_UIView3.default);

UIImage.status = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR'
};
UIImage.propTypes = {
    alt: _react2.default.PropTypes.string,
    displayAsBackgroundImage: _react2.default.PropTypes.bool,
    imageProps: _react2.default.PropTypes.object,
    src: _react2.default.PropTypes.string.isRequired,
    statusProps: _react2.default.PropTypes.object
};
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};
exports.default = UIImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJSW1hZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztJQUVxQixPO2NBQUEsTzs7YUFBQSxPOzs7OEJBQUEsTzs7Ozs7OzBJQW9CakIsSyxHQUFRO0FBQ0osb0JBQVEsUUFBUSxNQUFSLENBQWU7QUFEbkIsUzs7O0FBcEJTLFcsV0F3QmpCLHlCLHNDQUEwQixTLEVBQVc7QUFDakMsWUFBSSxVQUFVLEdBQVYsS0FBa0IsS0FBSyxLQUFMLENBQVcsR0FBakMsRUFBc0M7QUFDbEMsaUJBQUssY0FBTDtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQVEsUUFBUSxNQUFSLENBQWUsT0FBeEIsRUFBZDtBQUNIO0FBQ0osSzs7QUE3QmdCLFcsV0ErQmpCLGlCLGdDQUFvQjtBQUNoQixhQUFLLE9BQUw7QUFDSCxLOztBQWpDZ0IsVyxXQW1DakIsa0IsaUNBQXFCO0FBQ2pCLGFBQUssT0FBTDtBQUNILEs7O0FBckNnQixXLFdBdUNqQixvQixtQ0FBdUI7QUFDbkIsYUFBSyxjQUFMO0FBQ0gsSzs7QUF6Q2dCLFcsV0EyQ2pCLGMsNkJBQWlCO0FBQ2IsYUFBSyxNQUFMLENBQVksTUFBWixHQUFxQixJQUFyQjtBQUNBLGFBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsSUFBdEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0gsSzs7QUEvQ2dCLFcsV0FpRGpCLE8sc0JBQVU7QUFBQTs7QUFDTixZQUFJLEtBQUssTUFBVCxFQUFpQjtBQUFFO0FBQVM7O0FBRTVCLGFBQUssTUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkOztBQUVBLGFBQUssTUFBTCxDQUFZLE1BQVosR0FBcUI7QUFBQSxtQkFBTSxPQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQVEsUUFBUSxNQUFSLENBQWUsTUFBeEIsRUFBZCxDQUFOO0FBQUEsU0FBckI7QUFDQSxhQUFL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QWE7QUFGSyxDO2tCQWZMLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWcgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgYWx0PXtudWxsfVxuICAgICAgICAgICAgICAgICBzcmM9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=