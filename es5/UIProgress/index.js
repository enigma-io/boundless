'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An unopinionated progress implementation that allows for a variety of shapes and effects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgress
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgress = function (_UIView) {
    _inherits(UIProgress, _UIView);

    function UIProgress() {
        _classCallCheck(this, UIProgress);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIProgress.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx;

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx = {
                        'ui-progress-label': true
                    }, _cx[this.props.labelProps.className] = !!this.props.labelProps.className, _cx)) }),
                this.props.label
            );
        }
    };

    UIProgress.prototype.renderCancel = function renderCancel() {
        if (this.props.onCancel) {
            var _cx2;

            return _react2.default.createElement(_UIButton2.default, _extends({}, this.props.cancelProps, {
                ref: 'cancel',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-progress-cancel': true
                }, _cx2[this.props.cancelProps.className] = !!this.props.cancelProps.className, _cx2)),
                onPressed: this.props.onCancel }));
        }
    };

    UIProgress.prototype.renderProgress = function renderProgress() {
        var _cx3, _extends2;

        return _react2.default.createElement('div', _extends({}, this.props.progressProps, {
            ref: 'progress',
            className: (0, _classnames2.default)((_cx3 = {
                'ui-progress': true,
                'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
            }, _cx3[this.props.progressProps.className] = !!this.props.progressProps.className, _cx3)),
            role: 'presentation',
            style: _extends({}, this.props.progressProps.style, (_extends2 = {}, _extends2[this.props.tweenProperty] = this.props.progress, _extends2)) }));
    };

    UIProgress.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIProgress.internal_keys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-progress-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderProgress(),
            this.renderLabel(),
            this.renderCancel()
        );
    };

    return UIProgress;
}(_UIView3.default);

UIProgress.propTypes = {
    cancelProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    onCancel: _react2.default.PropTypes.func,
    progress: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    progressProps: _react2.default.PropTypes.object,
    tweenProperty: _react2.default.PropTypes.string
};
UIProgress.internal_keys = Object.keys(UIProgress.propTypes);
UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};
exports.default = UIProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3MvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFWQTs7Ozs7SUFZcUIsVTs7Ozs7Ozs7O3lCQXVCakIsVywwQkFBYztBQUNWLFlBQUksS0FBSyxLQUFMLENBQVcsS0FBZixFQUFzQjtBQUFBOztBQUNsQixtQkFDSTtBQUFBO0FBQUEsNkJBQ1EsS0FBSyxLQUFMLENBQVcsVUFEbkI7QUFFSSx5QkFBSSxPQUZSO0FBR0ksK0JBQVc7QUFDUCw2Q0FBcUI7QUFEZCwyQkFFTixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFNBRmhCLElBRTRCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFNBRnBELE9BSGY7QUFPSyxxQkFBSyxLQUFMLENBQVc7QUFQaEIsYUFESjtBQVdIO0FBQ0osSzs7eUJBRUQsWSwyQkFBZTtBQUNYLFlBQUksS0FBSyxLQUFMLENBQVcsUUFBZixFQUF5QjtBQUFBOztBQUNyQixtQkFDSSwrREFDUSxLQUFLLEtBQUwsQ0FBVyxXQURuQjtBQUVJLHFCQUFJLFFBRlI7QUFHSSwyQkFBVztBQUNQLDBDQUFzQjtBQURmLHdCQUVOLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FGakIsSUFFNkIsQ0FBQyxDQUFDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FGdEQsUUFIZjtBQU9JLDJCQUFXLEtBQUssS0FBTCxDQUFXLFFBUDFCLElBREo7QUFVSDtBQUNKLEs7O3lCQUVELGMsNkJBQWlCO0FBQUE7O0FBQ2IsZUFDSSxrREFDUSxLQUFLLEtBQUwsQ0FBVyxhQURuQjtBQUVJLGlCQUFJLFVBRlI7QUFHSSx1QkFBVztBQUNQLCtCQUFlLElBRFI7QUFFUCw2Q0FBNkIsT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFsQixLQUErQjtBQUZyRCxvQkFHTixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLFNBSG5CLElBRytCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLFNBSDFELFFBSGY7QUFRSSxrQkFBSyxjQVJUO0FBU0ksZ0NBQ08sS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixLQURoQyw2QkFFSyxLQUFLLEtBQUwsQ0FBVyxhQUZoQixJQUVnQyxLQUFLLEtBQUwsQ0FBVyxRQUYzQyxhQVRKLElBREo7QUFlSCxLOzt5QkFFRCxNLHFCQUFTO0FBQUE7O0FBQ0wsZUFDSTtBQUFBO0FBQUEseUJBQ1Esc0JBQUssS0FBSyxLQUFWLEVBQWlCLFdBQVcsYUFBNUIsQ0FEUjtBQUVJLHFCQUFJLFNBRlI7QUFHSSwyQkFBVztBQUNQLDJDQUF1QjtBQURoQix3QkFFTixLQUFLLEtBQUwsQ0FBVyxTQUZMLElBRWlCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxTQUY5QixRQUhmO0FBT0ssaUJBQUssY0FBTCxFQVBMO0FBUUssaUJBQUssV0FBTCxFQVJMO0FBU0ssaUJBQUssWUFBTDtBQVRMLFNBREo7QUFhSCxLOzs7OztBQXRGZ0IsVSxDQUNWLFMsR0FBWTtBQUNmLGlCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEZDtBQUVmLFdBQU8sZ0JBQU0sU0FBTixDQUFnQixJQUZSO0FBR2YsZ0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUhiO0FBSWYsY0FBVSxnQkFBTSxTQUFOLENBQWdCLElBSlg7QUFLZixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FDbEMsZ0JBQU0sU0FBTixDQUFnQixNQURrQixFQUVsQyxnQkFBTSxTQUFOLENBQWdCLE1BRmtCLENBQTFCLENBTEs7QUFTZixtQkFBZSxnQkFBTSxTQUFOLENBQWdCLE1BVGhCO0FBVWYsbUJBQWUsZ0JBQU0sU0FBTixDQUFnQjtBQVZoQixDO0FBREYsVSxDQWNWLGEsR0FBZ0IsT0FBTyxJQUFQLENBQVksV0FBVyxTQUF2QixDO0FBZE4sVSxDQWdCVixZLEdBQWU7QUFDbEIsaUJBQWEsRUFESztBQUVsQixnQkFBWSxFQUZNO0FBR2xCLG1CQUFlLEVBSEc7QUFJbEIsbUJBQWU7QUFKRyxDO2tCQWhCTCxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==