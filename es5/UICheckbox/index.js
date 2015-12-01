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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible checkbox with indeterminate support.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckbox
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckbox = (function (_UIView) {
    _inherits(UICheckbox, _UIView);

    function UICheckbox() {
        _classCallCheck(this, UICheckbox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UICheckbox).apply(this, arguments));
    }

    _createClass(UICheckbox, [{
        key: 'initialState',
        value: function initialState() {
            return {
                id: this.props.inputProps.id || this.uuid()
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.indeterminate !== this.props.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'setIndeterminate',
        value: function setIndeterminate() {
            this.refs.input.indeterminate = !!this.props.indeterminate;
        }
    }, {
        key: 'ariaState',
        value: function ariaState() {
            return this.props.indeterminate ? 'mixed' : String(this.props.checked);
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            // Send the opposite signal from what was passed to toggle the data
            this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                type: 'checkbox',
                id: this.state.id,
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.indeterminate,
                    'ui-checkbox-checked': this.props.checked,
                    'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked
                }, this.props.inputProps.className, !!this.props.inputProps.className)),
                name: this.props.name,
                checked: this.props.checked,
                'aria-checked': this.ariaState(),
                onChange: this.handleChange.bind(this),
                value: this.props.value }));
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2.default.createElement(
                    'label',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-checkbox-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)),
                        htmlFor: this.state.id }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);

    return UICheckbox;
})(_UIView3.default);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQ2hlY2tib3gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVU0sVUFBVTtjQUFWLFVBQVU7O2FBQVYsVUFBVTs4QkFBVixVQUFVOztzRUFBVixVQUFVOzs7aUJBQVYsVUFBVTs7dUNBQ0c7QUFDWCxtQkFBTztBQUNILGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDOUMsQ0FBQztTQUNMOzs7NENBRW1CO0FBQ2hCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzFCLG9CQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtTQUNKOzs7MkNBRWtCLFNBQVMsRUFBRTtBQUMxQixnQkFBSSxTQUFTLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3RELG9CQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtTQUNKOzs7MkNBRWtCO0FBQ2YsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7U0FDOUQ7OztvQ0FFVztBQUNSLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxRTs7O3VDQUVjOztBQUNYLGdCQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFHLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEY7OztzQ0FFYTtBQUNWLG1CQUNJLG9EQUFXLElBQUksQ0FBQyxLQUFL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QUFXLGdCQUFNO0NBQ3BCLENBQUM7O2tCQUVhLFVBQVUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKCkgeyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIl19