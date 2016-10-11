'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _omit = require('../UIUtils/omit');

var _omit2 = _interopRequireDefault(_omit);

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
                _extends({}, (0, _omit2.default)(definition, UISegmentedControl.internalChildKeys), {
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
            _extends({}, (0, _omit2.default)(this.props, UISegmentedControl.internalKeys), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBWkE7Ozs7O0lBY3FCLGtCOzs7Ozs7Ozs7Ozs7b0tBbURqQixLLEdBQVE7QUFDSixrQ0FBc0I7QUFEbEIsUyxRQTREUixhLEdBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3ZCLGdCQUFNLE1BQU0sTUFBTSxHQUFsQjtBQUNBLGdCQUFNLGtCQUFrQixNQUFLLEtBQUwsQ0FBVyxvQkFBbkM7O0FBRUEsZ0JBQUksUUFBUSxXQUFaLEVBQXlCO0FBQ3JCLHNCQUFLLFFBQUwsQ0FBYyxNQUFLLHNCQUFMLENBQTRCLGVBQTVCLENBQWQ7QUFDQSxzQkFBTSxjQUFOO0FBQ0gsYUFIRCxNQUdPLElBQUksUUFBUSxZQUFaLEVBQTBCO0FBQzdCLHNCQUFLLFFBQUwsQ0FBYyxNQUFLLGtCQUFMLENBQXdCLGVBQXhCLENBQWQ7QUFDQSxzQkFBTSxjQUFOO0FBQ0gsYUFITSxNQUdBLElBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ3hCLHNCQUFLLGlCQUFMLENBQXVCLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsZUFBbkIsQ0FBdkI7QUFDQSxzQkFBTSxjQUFOO0FBQ0g7O0FBRUQsZ0JBQUksMEJBQVcsTUFBSyxLQUFMLENBQVcsU0FBdEIsQ0FBSixFQUFzQztBQUNsQyxzQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQjtBQUNIO0FBQ0osUzs7O2lDQTFFRCxZLDJCQUFlO0FBQ1gsWUFBSSxjQUFKOztBQUVBLGFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBd0Isa0JBQVU7QUFDOUIsZ0JBQUksT0FBTyxRQUFYLEVBQXFCO0FBQ2pCLHdCQUFRLE9BQU8sS0FBZjs7QUFFQSx1QkFBTyxJQUFQO0FBQ0g7QUFDSixTQU5EOztBQVFBLGVB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QixDO0FBdkNMLGtCLENBd0NWLGlCLEdBQW9CLENBQ3ZCLFNBRHVCLEVBRXZCLE9BRnVCLEVBR3ZCLFVBSHVCLEM7QUF4Q1Ysa0IsQ0E4Q1YsWSxHQUFlO0FBQ2xCLGFBQVMsRUFEUztBQUVsQjtBQUZrQixDO2tCQTlDTCxrQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25CbHVyKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25DbGljayhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcHRpb25TZWxlY3RlZChvcHRpb24udmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkNsaWNrKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkZvY3VzKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQoZGVmaW5pdGlvbiwgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsQ2hpbGRLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVPcHRpb25Gb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBhcmlhLXJvbGU9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==