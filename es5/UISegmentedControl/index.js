'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UISegmentedControl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UISegmentedControl = function (_React$PureComponent) {
    _inherits(UISegmentedControl, _React$PureComponent);

    function UISegmentedControl() {
        var _temp, _this, _ret;

        _classCallCheck(this, UISegmentedControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            indexOfOptionInFocus: null
        }, _this.handleKeyDown = function (event) {
            var key = event.key;
            var activeItemIndex = _this.state.indexOfOptionInFocus;

            if (key === 'ArrowLeft') {
                _this.setFocus(_this.getPreviousOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'ArrowRight') {
                _this.setFocus(_this.getNextOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'Enter') {
                _this.handleOptionClick(_this.props.options[activeItemIndex]);
                event.preventDefault();
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UISegmentedControl.prototype.currentValue = function currentValue() {
        var value = void 0;

        this.props.options.some(function (option) {
            if (option.selected) {
                value = option.value;

                return true;
            }
        });

        return value;
    };

    UISegmentedControl.prototype.setFocus = function setFocus(index) {
        (0, _reactDom.findDOMNode)(this.refs['option_$' + index]).focus();
    };

    UISegmentedControl.prototype.getNextOptionIndex = function getNextOptionIndex(currentOptionIndex) {
        var next = currentOptionIndex + 1;

        return next < this.props.options.length ? next : 0;
    };

    UISegmentedControl.prototype.getPreviousOptionIndex = function getPreviousOptionIndex(currentOptionIndex) {
        var previous = currentOptionIndex - 1;

        return previous < 0 ? this.props.options.length - 1 : previous;
    };

    UISegmentedControl.prototype.handleOptionBlur = function handleOptionBlur(option, event) {
        if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
            this.setState({ indexOfOptionInFocus: null });
        }

        if ((0, _isFunction2.default)(option.onBlur)) {
            option.onBlur(event);
        }
    };

    UISegmentedControl.prototype.handleOptionClick = function handleOptionClick(option, event) {
        this.props.onOptionSelected(option.value);

        if ((0, _isFunction2.default)(option.onClick)) {
            option.onClick(event);
        }
    };

    UISegmentedControl.prototype.handleOptionFocus = function handleOptionFocus(option, event) {
        this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

        if ((0, _isFunction2.default)(option.onFocus)) {
            option.onFocus(event);
        }
    };

    UISegmentedControl.prototype.renderOptions = function renderOptions() {
        var _this2 = this;

        return this.props.options.map(function (definition, index) {
            var _cx;

            return _react2.default.createElement(
                _UIButton2.default,
                _extends({}, (0, _lodash2.default)(definition, UISegmentedControl.internalChildKeys), {
                    role: 'radio',
                    'aria-checked': String(definition.selected),
                    ref: 'option_$' + index,
                    key: definition.value,
                    className: (0, _classnames2.default)((_cx = {
                        'ui-segmented-control-option': true,
                        'ui-segmented-control-option-selected': definition.selected
                    }, _cx[definition.className] = !!definition.className, _cx)),
                    tabIndex: definition.selected ? '0' : '-1',
                    onBlur: _this2.handleOptionBlur.bind(_this2, definition),
                    onPressed: _this2.handleOptionClick.bind(_this2, definition),
                    onFocus: _this2.handleOptionFocus.bind(_this2, definition) }),
                definition.content
            );
        });
    };

    UISegmentedControl.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UISegmentedControl.internalKeys), {
                ref: 'wrapper',
                'aria-role': 'radiogroup',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-segmented-control': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)),
                onKeyDown: this.handleKeyDown }),
            this.renderOptions()
        );
    };

    return UISegmentedControl;
}(_react2.default.PureComponent);

UISegmentedControl.propTypes = {
    onOptionSelected: _react2.default.PropTypes.func,
    options: function validateOptions(props) {
        if (props.options.length < 2) {
            throw new Error('Must provide at least two options.');
        }

        var missingSelected = props.options.some(function (option) {
            if (!('selected' in option)) {
                return true;
            }
        });

        if (missingSelected) {
            throw new Error('Must provide a `selected` prop for each option.');
        }

        var seenSelected = false;
        var multipleSelected = props.options.some(function (option) {
            if (option.selected) {
                if (seenSelected) {
                    return true;
                }

                seenSelected = true;
            }
        });

        if (multipleSelected) {
            throw new Error('Encountered multiple options with `selected: true`. There can be only one.');
        }

        if (props.options.some(function (option) {
            return typeof option.value === 'undefined';
        })) {
            throw new Error('Must provide a `value` prop for each option.');
        }
    }
};
UISegmentedControl.internalKeys = Object.keys(UISegmentedControl.propTypes);
UISegmentedControl.internalChildKeys = ['content', 'value', 'selected'];
UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: _noop2.default
};
exports.default = UISegmentedControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJVSVNlZ21lbnRlZENvbnRyb2wiLCJzdGF0ZSIsImluZGV4T2ZPcHRpb25JbkZvY3VzIiwiaGFuZGxlS2V5RG93biIsImV2ZW50Iiwia2V5IiwiYWN0aXZlSXRlbUluZGV4Iiwic2V0Rm9jdXMiLCJnZXRQcmV2aW91c09wdGlvbkluZGV4IiwicHJldmVudERlZmF1bHQiLCJnZXROZXh0T3B0aW9uSW5kZXgiLCJoYW5kbGVPcHRpb25DbGljayIsInByb3BzIiwib3B0aW9ucyIsIm9uS2V5RG93biIsImN1cnJlbnRWYWx1ZSIsInZhbHVlIiwic29tZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaW5kZXgiLCJyZWZzIiwiZm9jdXMiLCJjdXJyZW50T3B0aW9uSW5kZXgiLCJuZXh0IiwibGVuZ3RoIiwicHJldmlvdXMiLCJoYW5kbGVPcHRpb25CbHVyIiwiaW5kZXhPZiIsInNldFN0YXRlIiwib25CbHVyIiwib25PcHRpb25TZWxlY3RlZCIsIm9uQ2xpY2siLCJoYW5kbGVPcHRpb25Gb2N1cyIsIm9uRm9jdXMiLCJyZW5kZXJPcHRpb25zIiwibWFwIiwiZGVmaW5pdGlvbiIsImludGVybmFsQ2hpbGRLZXlzIiwiU3RyaW5nIiwiY2xhc3NOYW1lIiwiYmluZCIsImNvbnRlbnQiLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsInZhbGlkYXRlT3B0aW9ucyIsIkVycm9yIiwibWlzc2luZ1NlbGVjdGVkIiwic2VlblNlbGVjdGVkIiwibXVsdGlwbGVTZWxlY3RlZCIsIk9iamVjdCIsImtleXMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFaQTs7Ozs7SUFjcUJBLGtCOzs7Ozs7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TjtBQUNIO0FBQ0o7QUFuQ2MsQztBQURGbEQsa0IsQ0F1Q1Y0QyxZLEdBQWVVLE9BQU9DLElBQVAsQ0FBWXZELG1CQUFtQjhDLFNBQS9CLEM7QUF2Q0w5QyxrQixDQXdDVnNDLGlCLEdBQW9CLENBQ3ZCLFNBRHVCLEVBRXZCLE9BRnVCLEVBR3ZCLFVBSHVCLEM7QUF4Q1Z0QyxrQixDQThDVndELFksR0FBZTtBQUNsQjNDLGFBQVMsRUFEUztBQUVsQmtCO0FBRmtCLEM7a0JBOUNML0Isa0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25CbHVyKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25DbGljayhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcHRpb25TZWxlY3RlZChvcHRpb24udmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkNsaWNrKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkZvY3VzKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQoZGVmaW5pdGlvbiwgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsQ2hpbGRLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVPcHRpb25Gb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBhcmlhLXJvbGU9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==