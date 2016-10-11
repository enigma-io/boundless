'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _omit = require('../UIUtils/omit');

var _omit2 = _interopRequireDefault(_omit);

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
            _extends({}, (0, _omit2.default)(this.props, UIImage.internalKeys), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJSW1hZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBVEE7Ozs7O0lBV3FCLE87Ozs7Ozs7Ozs7OztvS0FzQmpCLEssR0FBUTtBQUNKLG9CQUFRLFFBQVEsTUFBUixDQUFlO0FBRG5CLFM7OztzQkFJUix5QixzQ0FBMEIsUyxFQUFXO0FBQ2pDLFlBQUksVUFBVSxHQUFWLEtBQWtCLEtBQUssS0FBTCxDQUFXLEdBQWpDLEVBQXNDO0FBQ2xDLGlCQUFLLGNBQUw7QUFDQSxpQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFRLFFBQVEsTUFBUixDQUFlLE9BQXhCLEVBQWQ7QUFDSDtBQUNKLEs7O3NCQUVELGlCLGdDQUFvQjtBQUNoQixhQUFLLE9BQUw7QUFDSCxLOztzQkFFRCxrQixpQ0FBcUI7QUFDakIsYUFBSyxPQUFMO0FBQ0gsSzs7c0JBRUQsb0IsbUNBQXVCO0FBQ25CLGFBQUssY0FBTDtBQUNILEs7O3NCQUVELGMsNkJBQWlCO0FBQ2IsYUFBSyxNQUFMLENBQVksTUFBWixHQUFxQixJQUFyQjtBQUNBLGFBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsSUFBdEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0gsSzs7c0JBRUQsTyxzQkFBVTtBQUFBOztBQUNOLFlBQUksS0FBSyxNQUFULEVBQWlCO0FBQUU7QUFBUzs7QUFFNUIsYUFBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWQ7O0FBRUEsYUFBSyxNQUFMLENBQVksTUFBWixHQUFxQjtBQUFBLG1CQUFNLE9BQUssUUFBTCxDQUFjLEVBQUMsUUFBUSxRQUFRLE1BQVIsQ0FBZSxNQUF4QixFQUFkLENBQU47QUFBQSxTQUFyQjtBQUNBLGFBQUssTUFBTCxDQUFZLE9BQVosR0FBc0I7QUFBQSxtQkFBTSxPQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQVEsUUFBUSxNQUFSLENBQWUs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bnQiOlsiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlJbWFnZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19