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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible checkbox with indeterminate support.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckbox
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckbox = function (_UIView) {
    _inherits(UICheckbox, _UIView);

    function UICheckbox() {
        var _temp, _this, _ret;

        _classCallCheck(this, UICheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            id: _this.props.inputProps.id || _this.uuid()
        }, _this.handleChange = function (event) {
            // Send the opposite signal from what was passed to toggle the data
            _this.props[!_this.props.checked ? 'onChecked' : 'onUnchecked'](_this.props.name);

            if (typeof _this.props.inputProps.onChange === 'function') {
                event.persist();
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleClick = function (event) {
            _this.refs.input.focus();

            if (typeof _this.props.inputProps.onClick === 'function') {
                event.persist();
                _this.props.inputProps.onClick(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UICheckbox.prototype.componentDidMount = function componentDidMount() {
        if (this.props.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.setIndeterminate = function setIndeterminate() {
        this.refs.input.indeterminate = !!this.props.indeterminate;
    };

    UICheckbox.prototype.ariaState = function ariaState() {
        return this.props.indeterminate ? 'mixed' : String(this.props.checked);
    };

    UICheckbox.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
            ref: 'input',
            type: 'checkbox',
            id: this.state.id,
            className: (0, _classnames2.default)((_cx = {
                'ui-checkbox': true,
                'ui-checkbox-mixed': this.props.indeterminate,
                'ui-checkbox-checked': this.props.checked,
                'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked
            }, _cx[this.props.inputProps.className] = !!this.props.inputProps.className, _cx)),
            name: this.props.name,
            checked: this.props.checked,
            'aria-checked': this.ariaState(),
            onChange: this.handleChange,
            onClick: this.handleClick,
            value: this.props.value }));
    };

    UICheckbox.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx2;

            return _react2.default.createElement(
                'label',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-checkbox-label': true
                    }, _cx2[this.props.labelProps.className] = !!this.props.labelProps.className, _cx2)),
                    htmlFor: this.state.id }),
                this.props.label
            );
        }
    };

    UICheckbox.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-checkbox-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UICheckbox;
}(_UIView3.default);

UICheckbox.propTypes = {
    checked: _react2.default.PropTypes.bool,
    indeterminate: _react2.default.PropTypes.bool,
    inputProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string.isRequired,
    onChecked: _react2.default.PropTypes.func,
    onUnchecked: _react2.default.PropTypes.func,
    value: _react2.default.PropTypes.string
};
UICheckbox.defaultProps = {
    checked: false,
    indeterminate: false,
    inputProps: {},
    labelProps: {},
    onChecked: _noop2.default,
    onUnchecked: _noop2.default
};
exports.default = UICheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVXFCOzs7Ozs7Ozs7Ozs7MElBc0JqQixRQUFRO0FBQ0osZ0JBQUksTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixFQUF0QixJQUE0QixNQUFLLElBQUwsRUFBNUI7aUJBdUJSLGVBQWUsVUFBQyxLQUFELEVBQVc7O0FBQ3RCLGtCQUFLLEtBQUwsQ0FBVyxDQUFDLE1BQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsV0FBdEIsR0FBb0MsYUFBcEMsQ0FBWCxDQUE4RCxNQUFLLEtBQUwsQ0FBVyxJQUFYLENBQTlELENBRHNCOztBQUd0QixnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsUUFBdEIsS0FBbUMsVUFBMUMsRUFBc0Q7QUFDdEQsc0JBQU0sT0FBTixHQURzRDtBQUV0RCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixRQUF0QixDQUErQixLQUEvQixFQUZzRDthQUExRDtTQUhXLFFBU2YsY0FBYyxVQUFDLEtBQUQsRUFBVztBQUNyQixrQkFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixLQUFoQixHQURxQjs7QUFHckIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEtBQWtDLFVBQXpDLEVBQXFEO0FBQ3JELHNCQUFNLE9BQU4sR0FEcUQ7QUFFckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUIsRUFGcUQ7YUFBekQ7U0FIVTs7O0FBdkRHLHlCQTBCakIsaURBQW9CO0FBQ2hCLFlBQUksS0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUMxQixpQkFBSyxnQkFBTCxHQUQwQjtTQUE5Qjs7O0FBM0JhLHlCQWdDakIsaURBQW1CLFdBQVc7QUFDMUIsWUFBSSxVQUFVLGFBQVYsS0FBNEIsS0FBSyxLQUFMLENBQVcsYUFBWCxF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ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19