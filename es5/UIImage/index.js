'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An image block with placeholder support for loading and fallback scenarios.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIImage = function (_React$PureComponent) {
    _inherits(UIImage, _React$PureComponent);

    function UIImage() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
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
            _extends({}, (0, _lodash2.default)(this.props, UIImage.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-image-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderImage(),
            this.renderStatus()
        );
    };

    return UIImage;
}(_react2.default.PureComponent);

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
UIImage.internalKeys = Object.keys(UIImage.propTypes);
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};
exports.default = UIImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJSW1hZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiVUlJbWFnZSIsInN0YXRlIiwic3RhdHVzIiwiTE9BRElORyIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzcmMiLCJwcm9wcyIsInJlc2V0UHJlbG9hZGVyIiwic2V0U3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsInByZWxvYWQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImxvYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJMT0FERUQiLCJFUlJPUiIsInJlbmRlckltYWdlIiwiZGlzcGxheUFzQmFja2dyb3VuZEltYWdlIiwiaW1hZ2VQcm9wcyIsImNsYXNzTmFtZSIsImFsdCIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicmVuZGVyU3RhdHVzIiwic3RhdHVzUHJvcHMiLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiYm9vbCIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJPYmplY3QiLCJrZXlzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7SUFXcUJBLE87Ozs7Ozs7Ozs7OztvS0FzQmpCQyxLLEdBQVE7QUFDSkMsb0JBQVFGLFFBQVFFLE1BQVIsQ0FBZUM7QUFEbkIsUzs7O3NCQUlSQyx5QixzQ0FBMEJDLFMsRUFBVztBQUNqQyxZQUFJQSxVQUFVQyxHQUFWLEtBQWtCLEtBQUtDLEtBQUwsQ0FBV0QsR0FBakMsRUFBc0M7QUFDbEMsaUJBQUtFLGNBQUw7QUFDQSxpQkFBS0MsUUFBTCxDQUFjLEVBQUNQLFFBQVFGLFFBQVFFLE1BQVIsQ0FBZUMsT0FBeEIsRUFBZDtBQUNIO0FBQ0os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QUE7O0FBQ0wsZUFDSTtBQUFBO0FBQUEseUJBQ1Esc0JBQUssS0FBS3ZCLEtBQVYsRUFBaUJQLFFBQVErQixZQUF6QixDQURSO0FBRUkscUJBQUksU0FGUjtBQUdJLDJCQUFXO0FBQ1Asd0NBQW9CO0FBRGIsd0JBRU4sS0FBS3hCLEtBQUwsQ0FBV2lCLFNBRkwsSUFFaUIsQ0FBQyxDQUFDLEtBQUtqQixLQUFMLENBQVdpQixTQUY5QixRQUhmO0FBT0ssaUJBQUtILFdBQUwsRUFQTDtBQVFLLGlCQUFLTyxZQUFMO0FBUkwsU0FESjtBQVlILEs7OztFQTNIZ0MsZ0JBQU1JLGE7O0FBQXRCaEMsTyxDQUNWRSxNLEdBQVM7QUFDWkMsYUFBUyxTQURHO0FBRVpnQixZQUFRLFFBRkk7QUFHWkMsV0FBTztBQUhLLEM7QUFEQ3BCLE8sQ0FPVmlDLFMsR0FBWTtBQUNmUixTQUFLLGdCQUFNUyxTQUFOLENBQWdCQyxNQUROO0FBRWZiLDhCQUEwQixnQkFBTVksU0FBTixDQUFnQkUsSUFGM0I7QUFHZmIsZ0JBQVksZ0JBQU1XLFNBQU4sQ0FBZ0JHLE1BSGI7QUFJZi9CLFNBQUssZ0JBQU00QixTQUFOLENBQWdCQyxNQUFoQixDQUF1QkcsVUFKYjtBQUtmVCxpQkFBYSxnQkFBTUssU0FBTixDQUFnQkc7QUFMZCxDO0FBUEZyQyxPLENBZVYrQixZLEdBQWVRLE9BQU9DLElBQVAsQ0FBWXhDLFFBQVFpQyxTQUFwQixDO0FBZkxqQyxPLENBaUJWeUMsWSxHQUFlO0FBQ2xCbEIsZ0JBQVksRUFETTtBQUVsQk0saUJBQWE7QUFGSyxDO2tCQWpCTDdCLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUltYWdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlJbWFnZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==