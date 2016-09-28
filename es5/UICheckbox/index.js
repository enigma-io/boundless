'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require('../UIUtils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible checkbox with indeterminate support.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckbox
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckbox = function (_React$PureComponent) {
    _inherits(UICheckbox, _React$PureComponent);

    function UICheckbox() {
        var _temp, _this, _ret;

        _classCallCheck(this, UICheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.id = (0, _uuid2.default)(), _this.handleChange = function (event) {
            // Send the opposite signal from what was passed to toggle the data
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.props[!_this.props.inputProps.checked ? 'onChecked' : 'onUnchecked'](_this.props.inputProps.name);

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleClick = function (event) {
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.refs.input.focus();

            if ((0, _isFunction2.default)(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UICheckbox.prototype.componentDidMount = function componentDidMount() {
        if (this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.inputProps.indeterminate !== this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    };

    UICheckbox.prototype.setIndeterminate = function setIndeterminate() {
        this.refs.input.indeterminate = !!this.props.inputProps.indeterminate;
    };

    UICheckbox.prototype.getAriaState = function getAriaState() {
        return this.props.inputProps.indeterminate ? 'mixed' : String(this.props.inputProps.checked);
    };

    UICheckbox.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, (0, _lodash2.default)(this.props.inputProps, 'indeterminate'), {
            ref: 'input',
            type: 'checkbox',
            className: (0, _classnames2.default)((_cx = {
                'ui-checkbox': true,
                'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                'ui-checkbox-checked': this.props.inputProps.checked,
                'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked
            }, _cx[this.props.inputProps.className] = !!this.props.inputProps.className, _cx)),
            id: this.props.inputProps.id || this.id,
            'aria-checked': this.getAriaState(),
            onChange: this.handleChange,
            onClick: this.handleClick }));
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
                    htmlFor: this.props.inputProps.id || this.id }),
                this.props.label
            );
        }
    };

    UICheckbox.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UICheckbox.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-checkbox-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UICheckbox;
}(_react2.default.PureComponent);

UICheckbox.propTypes = {
    inputProps: _react.PropTypes.shape({
        checked: _react.PropTypes.bool,
        className: _react.PropTypes.string,
        disabled: _react.PropTypes.bool,
        id: _react.PropTypes.string,
        indeterminate: _react.PropTypes.bool,
        onChange: _react.PropTypes.func,
        onClick: _react.PropTypes.func,
        name: _react.PropTypes.string,
        value: _react.PropTypes.string
    }),
    label: _react.PropTypes.node,
    labelProps: _react.PropTypes.object,
    onChecked: _react.PropTypes.func,
    onUnchecked: _react.PropTypes.func
};
UICheckbox.internalKeys = Object.keys(UICheckbox.propTypes);
UICheckbox.defaultProps = {
    inputProps: {
        checked: false,
        indeterminate: false
    },
    labelProps: {},
    onChecked: _noop2.default,
    onUnchecked: _noop2.default
};
exports.default = UICheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3gvaW5kZXguanMiXSwibmFtZXMiOlsiVUlDaGVja2JveCIsImlkIiwiaGFuZGxlQ2hhbmdlIiwiZXZlbnQiLCJwcm9wcyIsImlucHV0UHJvcHMiLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJuYW1lIiwib25DaGFuZ2UiLCJoYW5kbGVDbGljayIsInJlZnMiLCJpbnB1dCIsImZvY3VzIiwib25DbGljayIsImNvbXBvbmVudERpZE1vdW50IiwiaW5kZXRlcm1pbmF0ZSIsInNldEluZGV0ZXJtaW5hdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJnZXRBcmlhU3RhdGUiLCJTdHJpbmciLCJyZW5kZXJJbnB1dCIsImNsYXNzTmFtZSIsInJlbmRlckxhYmVsIiwibGFiZWwiLCJsYWJlbFByb3BzIiwicmVuZGVyIiwiaW50ZXJuYWxLZXlzIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsInNoYXBlIiwiYm9vbCIsInN0cmluZyIsImZ1bmMiLCJ2YWx1ZSIsIm5vZGUiLCJvYmplY3QiLCJvbkNoZWNrZWQiLCJvblVuY2hlY2tlZCIsIk9iamVjdCIsImtleXMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFYQTs7Ozs7SUFhcUJBLFU7Ozs7Ozs7Ozs7OztvS0ErQmpCQyxFLEdBQUsscUIsUUFrQkxDLFksR0FBZSxVQUFDQyxLQUFELEVBQVc7QUFBRTtBQUN4QixnQkFBSSxNQUFLQyxLQUFMLENBQVdDLFVBQVgsQ0FBc0JDLFFBQTFCLEVBQW9DO0FBQUU7QUFBUzs7QUFFL0Msa0JBQUtGLEtBQUwsQ0FBVyxDQUFDLE1BQUtBLEtBQUwsQ0FBV0MsVUFBWCxDQUFzQkUsT0FBdkIsR0FBaUMsV0FBakMsR0FBK0MsYUFBMUQsRUFBeUUsTUFBS0gsS0FBTCxDQUFXQyxVQUFYLENBQXNCRyxJQUEvRjs7QUFF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TmtCO0FBT2xCQztBQVBrQixDO2tCQXJCTHZDLFUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMuaW5wdXRQcm9wcywgJ2luZGV0ZXJtaW5hdGUnKX1cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuZ2V0QXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=