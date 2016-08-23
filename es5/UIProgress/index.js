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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An unopinionated progress implementation that allows for a variety of shapes and effects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgress
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgress = function (_React$PureComponent) {
    _inherits(UIProgress, _React$PureComponent);

    function UIProgress() {
        _classCallCheck(this, UIProgress);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
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
            _extends({}, (0, _lodash2.default)(this.props, UIProgress.internalKeys), {
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
}(_react2.default.PureComponent);

UIProgress.propTypes = {
    cancelProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    onCancel: _react2.default.PropTypes.func,
    progress: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    progressProps: _react2.default.PropTypes.object,
    tweenProperty: _react2.default.PropTypes.string
};
UIProgress.internalKeys = Object.keys(UIProgress.propTypes);
UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};
exports.default = UIProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3MvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7K2VBVEE7Ozs7O0lBV3FCLFU7Ozs7Ozs7Ozt5QkF1QmpCLFcsMEJBQWM7QUFDVixZQUFJLEtBQUssS0FBTCxDQUFXLEtBQWYsRUFBc0I7QUFBQTs7QUFDbEIsbUJBQ0k7QUFBQTtBQUFBLDZCQUNRLEtBQUssS0FBTCxDQUFXLFVBRG5CO0FBRUkseUJBQUksT0FGUjtBQUdJLCtCQUFXO0FBQ1AsNkNBQXFCO0FBRGQsMkJBRU4sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixTQUZoQixJQUU0QixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixTQUZwRCxPQUhmO0FBT0sscUJBQUssS0FBTCxDQUFXO0FBUGhCLGFBREo7QUFXSDtBQUNKLEs7O3lCQUVELFksMkJBQWU7QUFDWCxZQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFBQTs7QUFDckIsbUJBQ0ksK0RBQ1EsS0FBSyxLQUFMLENBQVcsV0FEbkI7QUFFSSxxQkFBSSxRQUZSO0FBR0ksMkJBQVc7QUFDUCwwQ0FBc0I7QUFEZix3QkFFTixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBRmpCLElBRTZCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBRnRELFFBSGY7QUFPSSwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxRQVAxQixJQURKO0FBVUg7QUFDSixLOzt5QkFFRCxjLDZCQUFpQjtBQUFBOztBQUNiLGVBQ0ksa0RBQ1EsS0FBSyxLQUFMLENBQVcsYUFEbkI7QUFFSSxpQkFBSSxVQUZSO0FBR0ksdUJBQVc7QUFDUCwrQkFBZSxJQURSO0FBRVAsNkNBQTZCLE9BQU8sS0FBSyxLQUFMLENBQVcsUUFBbEIsS0FBK0I7QUFGckQsb0JBR04sS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixTQUhuQixJQUcrQixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixTQUgxRCxRQUhmO0FBUUksa0JBQUssY0FSVDtBQVNJLGdDQUNPLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsS0FEaEMsNkJBRUssS0FBSyxLQUFMLENBQVcsYUFGaEIsSUFFZ0MsS0FBSyxLQUFMLENBQVcsUUFGM0MsYUFUSixJQURKO0FBZUgsSzs7eUJBRUQsTSxxQkFBUztBQUFBOztBQUNMLGVBQ0k7QUFBQTtBQUFBLHlCQUNRLHNCQUFLLEtBQUssS0FBVixFQUFpQixXQUFXLFlBQTVCLENBRFI7QUFFSSxxQkFBSSxTQUZSO0FBR0ksMkJBQVc7QUFDUCwyQ0FBdUI7QUFEaEIsd0JBRU4sS0FBSyxLQUFMLENBQVcsU0FGTCxJQUVpQixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsU0FGOUIsUUFIZjtBQU9LLGlCQUFLLGNBQUwsRUFQTDtBQVFLLGlCQUFLLFdBQUwsRUFSTDtBQVNLLGlCQUFLLFlBQUw7QUFUTCxTQURKO0FBYUgsSzs7O0VBdEZtQyxnQkFBTSxhOztBQUF6QixVLENBQ1YsUyxHQUFZO0FBQ2YsaUJBQWEsZ0JBQU0sU0FBTixDQUFnQixNQURkO0FBRWYsV0FBTyxnQkFBTSxTQUFOLENBQWdCLElBRlI7QUFHZixnQkFBWSxnQkFBTSxTQUFOLENBQWdCLE1BSGI7QUFJZixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFKWDtBQUtmLGNBQVUsZ0JBQU0sU0FBTixDQUFnQixTQUFoQixDQUEwQixDQUNsQyxnQkFBTSxTQUFOLENBQWdCLE1BRGtCLEVBRWxDLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGa0IsQ0FBMUIsQ0FMSztBQVNmLG1CQUFlLGdCQUFNLFNBQU4sQ0FBZ0IsTUFUaEI7QUFVZixtQkFBZSxnQkFBTSxTQUFOLENBQWdCO0FBVmhCLEM7QUFERixVLENBY1YsWSxHQUFlLE9BQU8sSUFBUCxDQUFZLFdBQVcsU0FBdkIsQztBQWRMLFUsQ0FnQlYsWSxHQUFlO0FBQ2xCLGlCQUFhLEVBREs7QUFFbEIsZ0JBQVksRUFGTTtBQUdsQixtQkFBZSxFQUhHO0FBSWxCLG1CQUFlO0FBSkcsQztrQkFoQkwsVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3MucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==