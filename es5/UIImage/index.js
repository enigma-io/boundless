'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An image block with placeholder support for loading and fallback scenarios.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIImage = (function (_UIView) {
    _inherits(UIImage, _UIView);

    function UIImage() {
        _classCallCheck(this, UIImage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIImage).apply(this, arguments));
    }

    _createClass(UIImage, [{
        key: 'initialState',
        value: function initialState() {
            return {
                status: UIImage.status.LOADING
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.src !== this.props.src) {
                this.resetPreloader();
                this.setState({ status: UIImage.status.LOADING });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.preload();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            this.preload();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.resetPreloader();
        }
    }, {
        key: 'resetPreloader',
        value: function resetPreloader() {
            this.loader.onload = null;
            this.loader.onerror = null;
            this.loader = null;
        }
    }, {
        key: 'preload',
        value: function preload() {
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
        }
    }, {
        key: 'renderImage',
        value: function renderImage() {
            if (this.props.displayAsBackgroundImage) {
                return _react2.default.createElement('div', _extends({}, this.props.imageProps, {
                    ref: 'image',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-image': true
                    }, this.props.imageProps.className, !!this.props.imageProps.className)),
                    title: this.props.alt,
                    style: _extends({}, this.props.imageProps.style, {
                        backgroundImage: 'url(' + this.props.src + ')'
                    }) }));
            }

            return _react2.default.createElement('img', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-image': true
                }, this.props.imageProps.className, !!this.props.imageProps.className)),
                src: this.props.src,
                alt: this.props.alt,
                onLoad: _noop2.default,
                onError: _noop2.default }));
        }
    }, {
        key: 'renderStatus',
        value: function renderStatus() {
            return _react2.default.createElement('div', _extends({}, this.props.statusProps, {
                ref: 'status',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR
                }, this.props.statusProps.className, !!this.props.statusProps.className)),
                role: 'presentation' }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    alt: null,
                    src: null,
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-image-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderImage(),
                this.renderStatus()
            );
        }
    }]);

    return UIImage;
})(_UIView3.default);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJSW1hZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVU0sT0FBTztjQUFQLE9BQU87O2FBQVAsT0FBTzs4QkFBUCxPQUFPOztzRUFBUCxPQUFPOzs7aUJBQVAsT0FBTzs7dUNBQ007QUFDWCxtQkFBTztBQUNILHNCQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQ2pDLENBQUM7U0FDTDs7O2tEQUV5QixTQUFTLEVBQUU7QUFDakMsZ0JBQUksU0FBUyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUNsQyxvQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQzthQUNuRDtTQUNKOzs7NENBRW1CO0FBQ2hCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7OzsyQ0FFa0IsU0FBUyxFQUFFO0FBQzFCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7OzsrQ0FFc0I7QUFDbkIsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6Qjs7O3lDQUVnQjtBQUNiLGdCQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDMUIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUMzQixnQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7OztrQ0FFUzs7O0FBQ04sZ0JBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUFFLHVCQUFPO2FBQUU7O0FBRTVCLGdCQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTVDLGdCQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRzt1QkFBTSxPQUFLLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDO2FBQUEsQ0FBQztBQUMxRSxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUc7dUJBQU0sT0FBSyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQzthQUFBLENBQUM7O0FBRTFFLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNwQzs7O3NDQUVhO0FBQ1YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRTtBQUNyQyx1QkFDSSxrREFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsdUJBQUcsRUFBQyxPQUFPO0FBQ1gsNkJBQVMsRUFBRTtBQUNQLGtDQUFVLEVBQUUsSUFBSTt1QkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdEUsQUFBQztBQUNILHlCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEFBQUM7QUFDdEIseUJBQUssZUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLO0FBQzlCLHVDQUFlLFdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQUc7c0JBQzNDLElBQUcsQ0FDWjthQUNMOztBQUVELG1CQUNJLGtEQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUN6QixtQkFBRyxFQUFDLE9BQU87QUFDWCx5QkFBUyxFQUFFO0FBQ1IsOEJBQVUsRUFBRSxJQUFJO21CQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUNyRSxBQUFDO0FBQ0gsbUJBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQUFBQztBQUNwQixtQkFBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxBQUFDO0FBQ3BCLHNCQUFNLGdCQUFPO0FBQ2IsdUJBQU8sZ0JBQU8sSUFBRyxDQUN4QjtTQUNMOzs7dUNBRWM7QUFDWCxtQkFDSSxrREFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7QUFDMUIsbUJBQUcsRUFBQyxRQUFRO0FBQ1oseUJBQVMsRUFBRTtBQUNSLHFDQUFpQixFQUFFLElBQUk7QUFDdkIsc0NBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO0FBQ2hFLHFDQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtBQUM5RCxvQ0FBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7bUJBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUN2RSxBQUFDO0FBQ0gsb0JBQUksRUFBQyxjQUFjLElBQUcsQ0FDN0I7U0FDTDs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBRSxJQUFJLEFBQUM7QUFDVix1QkFBRyxFQUFFLElBQUksQUFBQztBQUNWLHVCQUFHLEVBQUMsU0FBUztBQUNiLDZCQUFTLEVBQUU7QUFDUiwwQ0FBa0IsRUFBRSxJQUFJO3VCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQy9DLEFBQUM7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRTthQUNsQixDQUNSO1NBQ0w7OztXQXZHQyxPQUFPOzs7QUEwR2IsT0FBTyxDQUFDLE1BQU0sR0FBRztBQUNiLFdBQU8sRUFBRSxTQUFTO0FBQ2xCLFVBQU0sRUFBRSxRQUFRO0FBQ2hCLFNBQUssRUFBRSxPQUFPO0NBQ2pCLENBQUM7O0FBRUYsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNoQixPQUFHLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDM0IsNEJBQXdCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLE9BQUcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdEMsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQ3RDLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixjQUFVLEVBQUUsRUFBRTtBQUNkLGVBQVcsRUFBRSxFQUFFO0NBQ2xCLENBQUM7O2tCQUVhLE9BQU8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGFsdD17bnVsbH1cbiAgICAgICAgICAgICAgICAgc3JjPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUltYWdlLnN0YXR1cyA9IHtcbiAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICBFUlJPUjogJ0VSUk9SJyxcbn07XG5cblVJSW1hZ2UucHJvcFR5cGVzID0ge1xuICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUltYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbWFnZVByb3BzOiB7fSxcbiAgICBzdGF0dXNQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUltYWdlO1xuIl19