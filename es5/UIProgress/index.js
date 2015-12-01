'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An unopinionated progress implementation that allows for a variety of shapes and effects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgress
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgress = (function (_UIView) {
    _inherits(UIProgress, _UIView);

    function UIProgress() {
        _classCallCheck(this, UIProgress);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIProgress).apply(this, arguments));
    }

    _createClass(UIProgress, [{
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-progress-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)) }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'renderCancel',
        value: function renderCancel() {
            if (this.props.onCancel) {
                return _react2.default.createElement(_UIButton2.default, _extends({}, this.props.cancelProps, {
                    ref: 'cancel',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-progress-cancel': true
                    }, this.props.cancelProps.className, !!this.props.cancelProps.className)),
                    onClick: this.props.onCancel }));
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            return _react2.default.createElement('div', _extends({}, this.props.progressProps, {
                ref: 'progress',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
                }, this.props.progressProps.className, !!this.props.progressProps.className)),
                role: 'presentation',
                style: _extends({}, this.props.progressProps.style, _defineProperty({}, this.props.tweenProperty, this.props.progress)) }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-progress-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderProgress(),
                this.renderLabel(),
                this.renderCancel()
            );
        }
    }]);

    return UIProgress;
})(_UIView3.default);

UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};

UIProgress.propTypes = {
    cancelProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    onCancel: _react2.default.PropTypes.func,
    progress: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    progressProps: _react2.default.PropTypes.object,
    tweenProperty: _react2.default.PropTypes.string
};

exports.default = UIProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3MvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVU0sVUFBVTtjQUFWLFVBQVU7O2FBQVYsVUFBVTs4QkFBVixVQUFVOztzRUFBVixVQUFVOzs7aUJBQVYsVUFBVTs7c0NBQ0U7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDUiwrQ0FBbUIsRUFBRSxJQUFJOzJCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckUsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7aUJBQ2YsQ0FDUjthQUNMO1NBQ0o7Ozt1Q0FFYztBQUNYLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3JCLHVCQUNJLCtEQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQix1QkFBRyxFQUFDLFFBQVE7QUFDWiw2QkFBUyxFQUFFO0FBQ1AsNENBQW9CLEVBQUUsSUFBSTt1QkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3hFLEFBQUM7QUFDSCwyQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLElBQUcsQ0FDNUM7YUFDTDtTQUNKOzs7eUNBRWdCO0FBQ2IsbUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0FBQzVCLG1CQUFHLEVBQUMsVUFBVTtBQUNkLHlCQUFTLEVBQUU7QUFDUixpQ0FBYSxFQUFFLElBQUk7QUFDbkIsK0NBQTJCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxXQUFXO21CQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFDM0UsQUFBQztBQUNILG9CQUFJLEVBQUMsY0FBYztBQUNuQixxQkFBSyxlQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssc0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNqRCxJQUFHLENBQ1o7U0FDTDs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDZDQUFxQixFQUFFLElBQUk7dUJBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ2xCLENBQ1I7U0FDTDs7O1dBNURDLFVBQVU7OztBQStEaEIsVUFBVSxDQUFDLFlBQVksR0FBRztBQUN0QixlQUFXLEVBQUUsRUFBRTtBQUNmLGNBQVUsRUFBRSxFQUFFO0FBQ2QsaUJBQWEsRUFBRSxFQUFFO0FBQ2pCLGlCQUFhLEVBQUUsT0FBTztDQUN6QixDQUFDOztBQUVGLFVBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2xDLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQ3ZCLENBQUM7QUFDRixpQkFBYSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3JDLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDeEMsQ0FBQzs7a0JBRWEsVUFBVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjYW5jZWxQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbn07XG5cblVJUHJvZ3Jlc3MucHJvcFR5cGVzID0ge1xuICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzO1xuIl19