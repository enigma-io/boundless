(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(21);

var _isString2 = _interopRequireDefault(_isString);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIArrowKeyNavigation = function (_React$PureComponent) {
    _inherits(UIArrowKeyNavigation, _React$PureComponent);

    function UIArrowKeyNavigation() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            activeChildIndex: null
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    event.preventDefault();
                    _this.moveFocus(-1);
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    event.preventDefault();
                    _this.moveFocus(1);
                    break;
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIArrowKeyNavigation.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== null) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            if (numChildren === 0) {
                this.setState({ activeChildIndex: null }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setState({ activeChildIndex: numChildren - 1 }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                this.setFocus(this.state.activeChildIndex);
            }
        }
    };

    UIArrowKeyNavigation.prototype.setFocus = function setFocus(index) {
        var childNode = (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : (0, _reactDom.findDOMNode)(this.refs.wrapper)).children[index];

        if (childNode && childNode.getAttribute('tabindex') === '-1') {
            this.moveFocus(childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        } else if (childNode && document.activeElement !== childNode) {
            childNode.focus();
        }
    };

    UIArrowKeyNavigation.prototype.moveFocus = function moveFocus(delta) {
        var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

        var nextIndex = this.state.activeChildIndex + delta;

        if (nextIndex >= numChildren) {
            nextIndex = 0; // loop
        } else if (nextIndex < 0) {
            nextIndex = numChildren - 1; // reverse loop
        }

        this.setState({ activeChildIndex: nextIndex });
    };

    UIArrowKeyNavigation.prototype.handleChildBlur = function handleChildBlur(index, child, event) {
        if (this.state.activeChildIndex === index) {
            this.setState({ activeChildIndex: null });
        }

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onBlur)) {
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onFocus)) {
            child.props.onFocus(event);
        }
    };

    UIArrowKeyNavigation.prototype.children = function children() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.props.tabIndex !== undefined ? child.props.tabIndex : 0,
                onBlur: _this2.handleChildBlur.bind(_this2, index, child),
                onFocus: _this2.handleChildFocus.bind(_this2, index, child)
            });
        });
    };

    UIArrowKeyNavigation.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, _extends({}, (0, _omit2.default)(this.props, UIArrowKeyNavigation.internalKeys), {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_react2.default.PureComponent);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"21":21,"24":24}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIButton = function (_React$PureComponent) {
    _inherits(UIButton, _React$PureComponent);

    function UIButton() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (_this.props.disabled) {
                return;
            }

            _this.toggleState(event);

            if ((0, _isFunction2.default)(_this.props.onClick)) {
                _this.props.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.disabled) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    _this.toggleState(event);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIButton.prototype.toggleState = function toggleState(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    };

    UIButton.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'button',
            _extends({}, (0, _omit2.default)(this.props, UIButton.internalKeys), {
                ref: 'button',
                className: (0, _classnames2.default)((_cx = {
                    'ui-button': true,
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                'aria-pressed': this.props.pressed,
                onKeyDown: this.handleKeyDown,
                onClick: this.handleClick }),
            this.props.children
        );
    };

    return UIButton;
}(_react2.default.PureComponent);

UIButton.propTypes = {
    children: _react2.default.PropTypes.node,
    onClick: _react2.default.PropTypes.func,
    onPressed: _react2.default.PropTypes.func,
    onUnpressed: _react2.default.PropTypes.func,
    pressed: _react2.default.PropTypes.bool
};
UIButton.internalKeys = Object.keys(UIButton.propTypes);
UIButton.defaultProps = {
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};
exports.default = UIButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"22":22,"24":24,"28":28}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _uuid = require(26);

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

        return _react2.default.createElement('input', _extends({}, (0, _omit2.default)(this.props.inputProps, 'indeterminate'), {
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
            _extends({}, (0, _omit2.default)(this.props, UICheckbox.internalKeys), {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"22":22,"24":24,"26":26,"28":28}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related checkboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckboxGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckboxGroup = function (_React$PureComponent) {
    _inherits(UICheckboxGroup, _React$PureComponent);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UICheckboxGroup.prototype.allItemsChecked = function allItemsChecked() {
        return this.props.items.every(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.anyItemsChecked = function anyItemsChecked() {
        return this.props.items.some(function (item) {
            return item.inputProps.checked === true;
        });
    };

    UICheckboxGroup.prototype.renderSelectAll = function renderSelectAll() {
        if (this.props.selectAll) {
            var _cx;

            var allChecked = this.allItemsChecked();
            var inputProps = this.props.selectAllProps.inputProps;


            return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                ref: 'select_all',
                key: 'cb_select_all',
                className: (0, _classnames2.default)((_cx = {
                    'ui-checkbox-group-selectall': true
                }, _cx[this.props.selectAllProps.className] = !!this.props.selectAllProps.className, _cx)),
                inputProps: _extends({}, inputProps, {
                    checked: allChecked,
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    name: inputProps && inputProps.name ? inputProps.name : 'cb_select_all'
                }),
                label: this.props.selectAllProps.label || 'Select All',
                onChecked: this.props.onAllChecked,
                onUnchecked: this.props.onAllUnchecked }));
        }
    };

    UICheckboxGroup.prototype.renderCheckboxes = function renderCheckboxes() {
        var _this2 = this;

        return this.props.items.map(function (item) {
            return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                key: item.inputProps.name,
                onChecked: _this2.props.onChildChecked,
                onUnchecked: _this2.props.onChildUnchecked }));
        });
    };

    UICheckboxGroup.prototype.renderChildren = function renderChildren() {
        var toBeRendered = [this.renderCheckboxes()];

        if (this.props.selectAll && this.props.selectAllPosition) {
            switch (this.props.selectAllPosition) {
                case UICheckboxGroup.Constants.SELECT_ALL_BEFORE:
                    toBeRendered.unshift(this.renderSelectAll());
                    break;

                case UICheckboxGroup.Constants.SELECT_ALL_AFTER:
                    toBeRendered.push(this.renderSelectAll());
                    break;
            }
        }

        return toBeRendered;
    };

    UICheckboxGroup.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UICheckboxGroup.internalKeys), {
                ref: 'group',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-checkbox-group': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)) }),
            this.renderChildren()
        );
    };

    return UICheckboxGroup;
}(_react2.default.PureComponent);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};
UICheckboxGroup.propTypes = {
    items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        inputProps: _react.PropTypes.shape({
            checked: _react.PropTypes.bool.isRequired,
            label: _react.PropTypes.string,
            name: _react.PropTypes.string.isRequired,
            value: _react.PropTypes.string
        })
    })).isRequired,
    onAllChecked: _react.PropTypes.func,
    onAllUnchecked: _react.PropTypes.func,
    onChildChecked: _react.PropTypes.func,
    onChildUnchecked: _react.PropTypes.func,
    selectAll: _react.PropTypes.bool,
    selectAllProps: _react.PropTypes.object,
    selectAllPosition: _react.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};
UICheckboxGroup.internalKeys = Object.keys(UICheckboxGroup.propTypes);
UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _noop2.default,
    onAllUnchecked: _noop2.default,
    onChildChecked: _noop2.default,
    onChildUnchecked: _noop2.default,
    selectAll: false,
    selectAllProps: {},
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};
exports.default = UICheckboxGroup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"22":22,"24":24,"28":28,"3":3}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIDialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIDialog = function (_React$PureComponent) {
    _inherits(UIDialog, _React$PureComponent);

    function UIDialog() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.mounted = false, _this.uuidHeader = (0, _uuid2.default)(), _this.uuidBody = (0, _uuid2.default)(), _this.callOnCloseIfMounted = function () {
            return _this.mounted && _this.props.onClose();
        }, _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(_this.callOnCloseIfMounted, 0);
                    }
                }

                return;
            }

            // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
            var previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

            if (_this.isPartOfDialog(previous) && !_this.isPartOfDialog(nativeEvent.target)) {
                nativeEvent.preventDefault();
                previous.focus(); // restore focus
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.closeOnEscKey && event.key === 'Escape') {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    UIDialog.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;

        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.$dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.addEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;

        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
        window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        if (!node || node === window) {
            return false;
        }

        return this.$wrapper.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                id: this.props.bodyProps.id || this.uuidBody,
                className: (0, _classnames2.default)((_cx = {
                    'ui-dialog-body': true
                }, _cx[this.props.bodyProps.className] = !!this.props.bodyProps.className, _cx)) }),
            this.props.children
        );
    };

    UIDialog.prototype.renderFooter = function renderFooter() {
        if (this.props.footer) {
            var _cx2;

            return _react2.default.createElement(
                'footer',
                _extends({}, this.props.footerProps, {
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-dialog-footer': true
                    }, _cx2[this.props.footerProps.className] = !!this.props.footerProps.className, _cx2)) }),
                this.props.footer
            );
        }
    };

    UIDialog.prototype.renderHeader = function renderHeader() {
        if (this.props.header) {
            var _cx3;

            return _react2.default.createElement(
                'header',
                _extends({}, this.props.headerProps, {
                    id: this.props.headerProps.id || this.uuidHeader,
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-dialog-header': true
                    }, _cx3[this.props.headerProps.className] = !!this.props.headerProps.className, _cx3)) }),
                this.props.header
            );
        }
    };

    UIDialog.prototype.renderFocusBoundary = function renderFocusBoundary() {
        if (this.props.captureFocus) {
            return _react2.default.createElement(
                'div',
                { className: 'ui-offscreen', tabIndex: '0', 'aria-hidden': 'true' },
                ' '
            );
        }
    }; // used to lock focus into a particular subset of DOM

    UIDialog.prototype.render = function render() {
        var _this2 = this,
            _cx4,
            _cx5;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.wrapperProps, {
                ref: function ref(node) {
                    return _this2.$wrapper = node;
                },
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-dialog-wrapper': true
                }, _cx4[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx4)),
                tabIndex: '0' }),
            this.renderFocusBoundary(),
            this.props.before,
            _react2.default.createElement(
                'div',
                _extends({}, (0, _omit2.default)(this.props, UIDialog.internalKeys), {
                    ref: function ref(node) {
                        return _this2.$dialog = node;
                    },
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-dialog': true
                    }, _cx5[this.props.className] = !!this.props.className, _cx5)),
                    onKeyDown: this.handleKeyDown,
                    role: 'dialog',
                    'aria-labelledby': this.uuidHeader,
                    'aria-describedby': this.uuidBody,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            ),
            this.props.after,
            this.renderFocusBoundary()
        );
    };

    return UIDialog;
}(_react2.default.PureComponent);

UIDialog.propTypes = {
    after: _react2.default.PropTypes.node,
    before: _react2.default.PropTypes.node,
    bodyProps: _react2.default.PropTypes.object,
    captureFocus: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    closeOnEscKey: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    closeOnOutsideFocus: _react2.default.PropTypes.bool,
    closeOnOutsideScroll: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func,
    wrapperProps: _react2.default.PropTypes.object
};
UIDialog.internalKeys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default,
    wrapperProps: {}
};
exports.default = UIDialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"22":22,"24":24,"26":26,"28":28}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Fit given text inside a parent container, obeying implict and explicit constraints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIFittedText
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    var node = (0, _reactDom.findDOMNode)(instance);
    var containerBox = window.getComputedStyle(node.parentNode);
    var fontSize = toI(window.getComputedStyle(node).fontSize);

    var containerHeight = toI(containerBox.height);
    var containerWidth = toI(containerBox.width);

    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
        // need to account for padding
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    var optimizeForHeight = Math.floor(fontSize / node.offsetHeight * containerHeight);
    var optimizeForWidth = Math.floor(fontSize / node.offsetWidth * containerWidth);

    // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach(function (instance) {
        return rescale(instance);
    });
}

function registerInstance(instance) {
    if (instances.length === 0) {
        window.addEventListener('resize', handleWindowResize, true);
    }

    instances.push(instance);
}

function unregisterInstance(instance) {
    instances.splice(instances.indexOf(instance), 1);

    if (instances.length === 0) {
        window.removeEventListener('resize', handleWindowResize, true);
    }
}

var UIFittedText = function (_React$PureComponent) {
    _inherits(UIFittedText, _React$PureComponent);

    function UIFittedText() {
        _classCallCheck(this, UIFittedText);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIFittedText.prototype.componentDidMount = function componentDidMount() {
        rescale(this);

        // there are likely to be multiple instances of this component on a page, so it makes sense to just use
        // a shared global resize listener instead of each component having its own
        registerInstance(this);
    };

    UIFittedText.prototype.componentDidUpdate = function componentDidUpdate() {
        rescale(this);
    };

    UIFittedText.prototype.componentWillUnmount = function componentWillUnmount() {
        unregisterInstance(this);
    };

    UIFittedText.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'span',
            _extends({}, (0, _omit2.default)(this.props, UIFittedText.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-text': true
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            this.props.children
        );
    };

    return UIFittedText;
}(_react2.default.PureComponent);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.propTypes = {
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxFontSize: _react2.default.PropTypes.number
};
UIFittedText.internalKeys = Object.keys(UIFittedText.propTypes);
exports.default = UIFittedText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"24":24,"28":28}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"22":22,"24":24,"28":28}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _extractChildProps = require(19);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIModal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIModal = function (_React$PureComponent) {
    _inherits(UIModal, _React$PureComponent);

    function UIModal() {
        _classCallCheck(this, UIModal);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIModal.prototype.updateInternalModalCache = function updateInternalModalCache(instance) {
        this.modal = instance;
    };

    UIModal.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');

        document.body.appendChild(this.$container);

        this.renderModal();
    };

    UIModal.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderModal();
    };

    UIModal.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);
    };

    UIModal.prototype.renderModal = function renderModal() {
        var _cx, _cx2, _cx3;

        var props = this.props;


        this.updateInternalModalCache(_reactDom2.default.render(_react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(props, UIModal.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-modal-wrapper': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            _react2.default.createElement('div', _extends({}, props.maskProps, {
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-modal-mask': true
                }, _cx2[props.maskProps.className] = !!props.maskProps.className, _cx2)) })),
            _react2.default.createElement(
                _UIDialog2.default,
                _extends({}, (0, _extractChildProps2.default)(props, _UIDialog2.default.propTypes), props.modalProps, {
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-modal': true
                    }, _cx3[props.modalProps.className] = !!props.modalProps.className, _cx3)) }),
                props.children
            )
        ), this.$container));
    };

    UIModal.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIModal;
}(_react2.default.PureComponent);

UIModal.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    maskProps: _react2.default.PropTypes.object,
    modalProps: _react2.default.PropTypes.object
});
UIModal.internalKeys = Object.keys(UIModal.propTypes);
UIModal.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {}
});
exports.default = UIModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"19":19,"24":24,"28":28,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(30);

var _lodash2 = _interopRequireDefault(_lodash);

var _UISegmentedControl = require(14);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A utility view for paging the display of many data items of varying sizes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPagination
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this.mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Item.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    Item.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    Item.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
    };

    Item.prototype.getClasses = function getClasses(extraClasses) {
        return (0, _classnames2.default)({
            'ui-pagination-item': true,
            'ui-pagination-item-even': this.props.even,
            'ui-pagination-item-odd': !this.props.even,
            'ui-pagination-item-loading': this.state.data instanceof Promise
        }) + (extraClasses ? ' ' + extraClasses : '');
    };

    Item.prototype.render = function render() {
        if (this.state.data instanceof Promise) {
            return _react2.default.createElement(
                'div',
                _extends({}, (0, _omit2.default)(this.props, Item.internalKeys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _omit2.default)(this.props, Item.internalKeys), {
            className: this.getClasses(jsx.props.className),
            'data-index': this.props.index
        }));
    };

    return Item;
}(_react2.default.Component);

Item.propTypes = {
    even: _react.PropTypes.bool,
    data: _react.PropTypes.object,
    dataToJSXConverterFunc: _react.PropTypes.func,
    index: _react.PropTypes.number,
    loadingContent: _react.PropTypes.node
};
Item.internalKeys = Object.keys(Item.propTypes);

var UIPagination = function (_React$PureComponent) {
    _inherits(UIPagination, _React$PureComponent);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this2), _this2.state = {
            currentPage: _this2.props.initialPage,
            targetIndex: (_this2.props.initialPage - 1) * _this2.props.numItemsPerPage
        }, _this2.currentPage = function () {
            return _this2.state.currentPage;
        }, _this2.getPageForIndex = function (index) {
            var itemsPerPage = arguments.length <= 1 || arguments[1] === undefined ? _this2.props.numItemsPerPage : arguments[1];
            return Math.ceil((index + 1) / itemsPerPage);
        }, _this2.totalPages = function () {
            return Math.ceil(_this2.props.totalItems / _this2.props.numItemsPerPage);
        }, _this2.firstVisibleItemIndex = function () {
            return (_this2.currentPage() - 1) * _this2.props.numItemsPerPage;
        }, _this2.pageToIndex = function (i) {
            if (i < 0 || i >= _this2.props.totalItems) {
                return new Error('Cannot page to invalid index ' + i + '.');
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(i),
                targetIndex: i
            });
        }, _this2.handleClick = function (value) {
            var nextTargetIndex = void 0;

            switch (value) {
                case UIPagination.controls.FIRST:
                    nextTargetIndex = 0;
                    break;
                case UIPagination.controls.PREVIOUS:
                    nextTargetIndex = _this2.firstVisibleItemIndex() - _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.NEXT:
                    nextTargetIndex = _this2.firstVisibleItemIndex() + _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.LAST:
                    nextTargetIndex = _this2.props.totalItems - 1;
                    break;
                default:
                    nextTargetIndex = parseInt(value, 10) * _this2.props.numItemsPerPage - 1;
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(nextTargetIndex),
                targetIndex: nextTargetIndex
            });
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    UIPagination.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.currentPage()) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPagination.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        var _this3 = this;

        var oldProps = this.props;

        // use transactional `setState()` syntax to ensure that pending state updates are honored,
        // like those from `pageToIndex()`
        this.setState(function (state, props) {
            // NOTE: `props` here is technically the `nextProps` you'd receive from the first cWRP argument
            // so that's why we're caching `oldProps` outside the `setState`
            if (props.identifier !== oldProps.identifier) {
                return {
                    currentPage: 1,
                    targetIndex: 0
                };
            }

            return {
                currentPage: _this3.getPageForIndex(state.targetIndex, props.numItemsPerPage),
                targetIndex: state.targetIndex
            };
        });
    };

    UIPagination.prototype.createPageButtonOptions = function createPageButtonOptions() {
        var options = [];
        var currentPage = this.currentPage();
        var numPageToggles = this.props.numPageToggles;
        var totalPages = this.totalPages();
        var startPage = currentPage - (currentPage - 1) % numPageToggles;
        var endPage = Math.min(startPage + numPageToggles - 1, totalPages);

        if (this.props.showPaginationState) {
            options.push({
                selected: false,
                content: (0, _isFunction2.default)(this.props.showPaginationState) ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
                value: '',
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-state'
            });
        }

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlContent,
                value: UIPagination.controls.FIRST,
                disabled: this.currentPage() === 1,
                className: 'ui-pagination-control ui-pagination-control-first'
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlContent,
            value: UIPagination.controls.PREVIOUS,
            disabled: this.currentPage() === 1,
            className: 'ui-pagination-control ui-pagination-control-previous'
        });

        for (var i = startPage; i <= endPage; i++) {
            options.push({
                className: 'ui-pagination-control',
                'data-page-number': i,
                selected: i === this.currentPage(),
                content: i,
                value: i
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlContent,
            value: UIPagination.controls.NEXT,
            disabled: this.currentPage() === totalPages,
            className: 'ui-pagination-control ui-pagination-control-next'
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlContent,
                value: UIPagination.controls.LAST,
                disabled: this.currentPage() === totalPages,
                className: 'ui-pagination-control ui-pagination-control-last'
            });
        }

        if (this.props.customControlContent) {
            options.push({
                selected: false,
                content: this.props.customControlContent,
                value: (0, _uuid2.default)(),
                disabled: true,
                className: 'ui-pagination-control ui-pagination-control-custom'
            });
        }

        return options;
    };

    UIPagination.prototype.generateItems = function generateItems() {
        var generatedItems = [];
        var firstItemIndex = this.firstVisibleItemIndex();
        var lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i += 1) {
            generatedItems.push({ data: this.props.getItem(i) });
        }

        return generatedItems;
    };

    UIPagination.prototype.renderItems = function renderItems() {
        var _cx,
            _this4 = this;

        var props = this.props.listWrapperProps;
        var indexOffset = this.props.numItemsPerPage * (this.currentPage() - 1);

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, props, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-pagination-items': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            this.generateItems().map(function (item, index) {
                return _react2.default.createElement(Item, {
                    ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    dataToJSXConverterFunc: _this4.props.itemToJSXConverterFunc,
                    even: index % 2 === 0,
                    index: indexOffset + index,
                    loadingContent: _this4.props.itemLoadingContent });
            })
        );
    };

    UIPagination.prototype.renderControls = function renderControls(position) {
        var _cx2;

        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        var props = this.props.toggleWrapperProps;
        var positionLower = position.toLowerCase();
        var positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, props, {
            ref: 'segmentedControl' + positionCapitalized,
            className: (0, _classnames2.default)((_cx2 = {
                'ui-pagination-controls': true
            }, _cx2['ui-pagination-controls-' + positionLower] = true, _cx2[props.className] = !!props.className, _cx2)),
            options: this.createPageButtonOptions(),
            onOptionSelected: this.handleClick }));
    };

    UIPagination.prototype.renderView = function renderView() {
        var props = this.props;

        var position = UIPagination.positions;

        return _react2.default.createElement(
            'div',
            {
                ref: 'paginatedView',
                className: 'ui-pagination' },
            props.position === position.ABOVE || props.position === position.BOTH ? this.renderControls(position.ABOVE) : _noop2.default,
            this.renderItems(),
            props.position === position.BELOW || props.position === position.BOTH ? this.renderControls(position.BELOW) : _noop2.default
        );
    };

    UIPagination.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UIPagination.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_react2.default.PureComponent);

UIPagination.controls = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};
UIPagination.positions = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};
UIPagination.propTypes = {
    customControlContent: _react.PropTypes.node,
    getItem: _react.PropTypes.func,
    hidePagerIfNotNeeded: _react.PropTypes.bool,
    identifier: _react.PropTypes.string.isRequired,

    initialPage: function validateInitialPage(props) {
        if ((0, _lodash2.default)(props.initialPage) === false) {
            return new Error('`initialPage` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.initialPage < 1 || props.initialPage > numberOfPages) {
            return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
        }
    },

    itemLoadingContent: _react.PropTypes.node,
    itemToJSXConverterFunc: _react.PropTypes.func,
    jumpToFirstControlContent: _react.PropTypes.node,
    jumpToLastControlContent: _react.PropTypes.node,
    listWrapperProps: _react.PropTypes.object,
    nextPageControlContent: _react.PropTypes.node,

    numItemsPerPage: function validateNumItemsPerPage(props) {
        if ((0, _lodash2.default)(props.numItemsPerPage) === false) {
            return new Error('`numItemsPerPage` must be an integer.');
        } else if (props.numItemsPerPage < 1) {
            return new Error('`numItemsPerPage` must be greater than zero.');
        }
    },

    numPageToggles: _react.PropTypes.number,
    position: _react.PropTypes.oneOf(Object.keys(UIPagination.positions)),
    previousPageControlContent: _react.PropTypes.node,
    showJumpToFirst: _react.PropTypes.bool,
    showJumpToLast: _react.PropTypes.bool,
    showPaginationState: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    toggleWrapperProps: _react.PropTypes.object,
    totalItems: _react.PropTypes.number.isRequired
};
UIPagination.internalKeys = Object.keys(UIPagination.propTypes);
UIPagination.defaultProps = {
    getItem: _noop2.default,
    hidePagerIfNotNeeded: false,
    initialPage: 1,
    itemToJSXConverterFunc: function itemToJSXConverterFunc(data) {
        return data;
    },
    jumpToFirstControlContent: '« First',
    jumpToLastControlContent: 'Last »',
    listWrapperProps: {},
    nextPageControlContent: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    position: UIPagination.positions.ABOVE,
    previousPageControlContent: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};
exports.default = UIPagination;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"14":14,"20":20,"22":22,"24":24,"26":26,"28":28,"30":30}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _transformProperty = require(25);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking container positioned to a specific anchor element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPopover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function without(arr1, arr2) {
    return arr1.filter(function (item) {
        return arr2.indexOf(item) === -1;
    });
}
function values(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

var UIPopover = function (_React$PureComponent) {
    _inherits(UIPopover, _React$PureComponent);

    function UIPopover(props) {
        _classCallCheck(this, UIPopover);

        var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this));

        _this.componentDidUpdate = function () {
            /*
                A nuance about this component: since it only renders a simple <div>, the main render() function
                never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
                a full re-render of the child dialog.
             */
            _this.renderDialog();
            _this.align();
        };

        _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : _reactDom2.default.findDOMNode(_this.props.anchor);

            _this.cacheViewportCartography(anchor);

            var dx = Math.round(_this.getNextDialogXPosition(anchor));
            var dy = Math.round(_this.getNextDialogYPosition(anchor));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(dx, dy);

            if (alignmentCorrection && _this.didAlignmentChange(alignmentCorrection)) {
                return _this.setState(alignmentCorrection, _this.componentDidUpdate);
            }

            // the caret is initially positioned at 0,0 inside the dialog
            // which is already positioned at the anchor, so we just need to
            // make small adjustments as necessary to line up the caret
            // with the visual center of the anchor

            _this.$caret.style.left = Math.round(_this.getNextCaretXPosition(anchor)) + 'px';
            _this.$caret.style.top = Math.round(_this.getNextCaretYPosition(anchor)) + 'px';

            _this.applyTranslation(_this.$caret, _classnames2.default, 0);
            _this.applyTranslation(_this.$wrapper, dx, dy);
        };

        _this.state = {
            anchorXAlign: props.anchorXAlign || props.preset.anchorXAlign,
            anchorYAlign: props.anchorYAlign || props.preset.anchorYAlign,
            selfXAlign: props.selfXAlign || props.preset.selfXAlign,
            selfYAlign: props.selfYAlign || props.preset.selfYAlign
        };
        return _this;
    }

    UIPopover.prototype.updateDialogInternalCache = function updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog; // used in testing, not relevant
        this.$wrapper = instance.$wrapper;
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

        window.removeEventListener('resize', this.align, true);
    };

    UIPopover.prototype.cacheViewportCartography = function cacheViewportCartography(anchor) {
        var anchorRect = anchor.getBoundingClientRect();

        this.anchorLeft = anchorRect.left;
        this.anchorTop = anchorRect.top;
        this.anchorHeight = anchorRect.height;
        this.anchorWidth = anchorRect.width;

        this.bodyLeft = document.body.scrollLeft;
        this.bodyTop = document.body.scrollTop;
    };

    UIPopover.prototype.getNextCaretXPosition = function getNextCaretXPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
        var _state = this.state;
        var anchorXAlign = _state.anchorXAlign;
        var selfXAlign = _state.selfXAlign;
        var anchorYAlign = _state.anchorYAlign;
        var selfYAlign = _state.selfYAlign;

        var position = UIPopover.position;

        var nextX = 0;

        // we only want to change the X position when we're
        // fully above or below the anchor and selfXAlign isn't MIDDLE

        if (selfXAlign !== position.MIDDLE && (anchorYAlign === position.START && selfYAlign === position.END || anchorYAlign === position.END && selfYAlign === position.START)) {

            if (anchorXAlign === position.START) {
                nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
            } else if (anchorXAlign === position.END) {
                nextX += this.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextX;
    };

    UIPopover.prototype.getNextCaretYPosition = function getNextCaretYPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
        var _state2 = this.state;
        var anchorXAlign = _state2.anchorXAlign;
        var selfXAlign = _state2.selfXAlign;
        var anchorYAlign = _state2.anchorYAlign;
        var selfYAlign = _state2.selfYAlign;

        var position = UIPopover.position;

        var nextY = 0;

        // we only want to change the Y position when we're
        // fully to the left or right of the anchor (start,end | end,start)
        // selfYAlign isn't MIDDLE

        if (selfYAlign !== position.MIDDLE && (anchorXAlign === position.START && selfXAlign === position.END || anchorXAlign === position.END && selfXAlign === position.START)) {

            if (anchorYAlign === position.START) {
                nextY += this.anchorHeight / 2 - caret.clientWidth / 2;
            } else if (anchorYAlign === position.END) {
                nextY += this.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextY;
    };

    UIPopover.prototype.getNextDialogXPosition = function getNextDialogXPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];
        var _state3 = this.state;
        var anchorXAlign = _state3.anchorXAlign;
        var selfXAlign = _state3.selfXAlign;

        var position = UIPopover.position;

        var nextX = this.anchorLeft + this.bodyLeft;

        switch (anchorXAlign) {
            case position.MIDDLE:
                nextX += this.anchorWidth / 2;
                break;

            case position.END:
                nextX += this.anchorWidth;
                break;
        }

        switch (selfXAlign) {
            case position.MIDDLE:
                nextX -= dialog.clientWidth / 2;
                break;

            case position.END:
                nextX -= dialog.clientWidth;
                break;
        }

        return nextX;
    };

    UIPopover.prototype.getNextDialogYPosition = function getNextDialogYPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];

        var state = this.state;
        var position = UIPopover.position;
        var anchorY = this.anchorTop + this.bodyTop;

        var nextY = anchorY + this.anchorHeight;

        switch (state.anchorYAlign) {
            case position.START:
                nextY = anchorY;
                break;

            case position.MIDDLE:
                nextY = anchorY + this.anchorHeight / 2;
                break;
        }

        switch (state.selfYAlign) {
            case position.MIDDLE:
                nextY -= dialog.clientHeight / 2;
                break;

            case position.END:
                nextY -= dialog.clientHeight;
                break;
        }

        return nextY;
    };

    UIPopover.prototype.getAlignmentCorrectionIfOverflowing = function getAlignmentCorrectionIfOverflowing(x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        var corrections = _extends({}, this.state);
        var position = UIPopover.position;

        var width = this.$wrapper.clientWidth;
        var height = this.$wrapper.clientHeight;
        var xMax = document.body.scrollWidth;
        var yMax = document.body.scrollHeight;

        if (x + width > xMax) {
            // overflowing off to the right
            corrections.anchorXAlign = position.START;
            corrections.selfXAlign = position.END;
        }

        if (x < 0) {
            // overflowing off to the left
            corrections.anchorXAlign = position.END;
            corrections.selfXAlign = position.START;
        }

        if (y + height > yMax) {
            // overflowing below
            // if left/right
            if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                corrections.anchorYAlign = position.END;
            } else {
                corrections.anchorYAlign = position.START;
            }

            corrections.selfYAlign = position.END;
        }

        if (y < 0) {
            // overflowing above
            // if left/right
            if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                corrections.anchorYAlign = position.START;
            } else {
                corrections.anchorYAlign = position.END;
            }

            corrections.selfYAlign = position.START;
        }

        return corrections;
    };

    UIPopover.prototype.applyTranslation = function applyTranslation(node, x, y) {
        if (_transformProperty2.default) {
            node.style[_transformProperty2.default] = 'translate(' + x + 'px, ' + y + 'px)';
        } else {
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        }
    };

    UIPopover.prototype.didAlignmentChange = function didAlignmentChange(nextAlignment) {
        var currentAlignment = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];

        return nextAlignment.anchorXAlign !== currentAlignment.anchorXAlign || nextAlignment.anchorYAlign !== currentAlignment.anchorYAlign || nextAlignment.selfXAlign !== currentAlignment.selfXAlign || nextAlignment.selfYAlign !== currentAlignment.selfYAlign;
    };

    UIPopover.prototype.getClassAlignmentFragment = function getClassAlignmentFragment(constant) {
        var position = UIPopover.position;

        switch (constant) {
            case position.START:
                return 'start';

            case position.MIDDLE:
                return 'middle';

            case position.END:
                return 'end';
        }
    };

    UIPopover.prototype.renderDialog = function renderDialog() {
        var _this2 = this,
            _cx,
            _cx2;

        var state = this.state;
        var getFrag = this.getClassAlignmentFragment;

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _omit2.default)(this.props, UIPopover.internalKeys), {
            before: _react2.default.cloneElement(this.props.caretComponent, {
                ref: function ref(node) {
                    return _this2.$caret = node;
                },
                className: (0, _classnames2.default)((_cx = {
                    'ui-popover-caret': true
                }, _cx[this.props.caretComponent.props.className] = !!this.props.caretComponent.props.className, _cx))
            }),
            wrapperProps: _extends({}, this.props.wrapperProps, {
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-popover': true
                }, _cx2['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx2['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx2['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx2['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx2[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx2))
            }) })), this.$container));
    };

    UIPopover.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIPopover;
}(_react2.default.PureComponent);

UIPopover.position = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};
UIPopover.positionValues = values(UIPopover.position);
UIPopover.preset = {
    'ABOVE': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.START,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.END
    },
    'BELOW': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.END,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.START
    },
    'LEFT': {
        anchorXAlign: UIPopover.position.START,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.END,
        selfYAlign: UIPopover.position.MIDDLE
    },
    'RIGHT': {
        anchorXAlign: UIPopover.position.END,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.START,
        selfYAlign: UIPopover.position.MIDDLE
    }
};
UIPopover.presetValues = values(UIPopover.preset);
UIPopover.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    anchor: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(HTMLElement), _react.PropTypes.shape({
        props: _react.PropTypes.object,
        state: _react.PropTypes.object
    })]).isRequired,
    anchorXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    anchorYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    autoReposition: _react.PropTypes.bool,
    caretComponent: _react.PropTypes.element,
    preset: _react.PropTypes.oneOf(UIPopover.presetValues),
    selfXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    selfYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    wrapperProps: _react.PropTypes.object
});
UIPopover.internalKeys = without(Object.keys(UIPopover.propTypes), Object.keys(_UIDialog2.default.propTypes));
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    autoReposition: true,
    captureFocus: false,
    caretComponent: _react2.default.createElement(
        'svg',
        { viewBox: '0 0 14 9.5', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-border', fill: '#000', points: '7 0 14 10 0 10' }),
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-fill', fill: '#FFF', points: '6.98230444 1.75 12.75 10 1.25 10' })
        )
    ),
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    preset: UIPopover.preset.BELOW,
    wrapperProps: {}
});
exports.default = UIPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"24":24,"25":25,"28":28,"5":5}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

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
            _extends({}, (0, _omit2.default)(this.props, UIProgress.internalKeys), {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"24":24,"28":28}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hide content until it's needed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgressiveDisclosure
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgressiveDisclosure = function (_React$PureComponent) {
    _inherits(UIProgressiveDisclosure, _React$PureComponent);

    function UIProgressiveDisclosure() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onClick)) {
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onKeyDown)) {
                _this.props.toggleProps.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIProgressiveDisclosure.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({ expanded: newProps.expanded }, this.dispatchCallback);
        }
    };

    UIProgressiveDisclosure.prototype.renderContent = function renderContent() {
        if (this.state.expanded) {
            return _react2.default.createElement(
                'div',
                { ref: 'content',
                    className: 'ui-disclosure-content' },
                this.props.children
            );
        }
    };

    UIProgressiveDisclosure.prototype.render = function render() {
        var _cx, _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UIProgressiveDisclosure.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            _react2.default.createElement(
                'div',
                _extends({}, this.props.toggleProps, {
                    ref: 'toggle',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-disclosure-toggle': true
                    }, _cx2[this.props.toggleProps.className] = !!this.props.toggleProps.className, _cx2)),
                    onClick: this.handleClick,
                    onKeyDown: this.handleKeyDown,
                    tabIndex: '0' }),
                this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser
            ),
            this.renderContent()
        );
    };

    return UIProgressiveDisclosure;
}(_react2.default.PureComponent);

UIProgressiveDisclosure.propTypes = {
    children: _react2.default.PropTypes.node,
    expanded: _react2.default.PropTypes.bool,
    onExpand: _react2.default.PropTypes.func,
    onHide: _react2.default.PropTypes.func,
    teaser: _react2.default.PropTypes.node,
    teaserExpanded: _react2.default.PropTypes.node,
    toggleProps: _react2.default.PropTypes.object
};
UIProgressiveDisclosure.internalKeys = Object.keys(UIProgressiveDisclosure.propTypes);
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"22":22,"24":24,"28":28}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible radio form control.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIRadio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIRadio = function (_React$PureComponent) {
    _inherits(UIRadio, _React$PureComponent);

    function UIRadio() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.uuid = (0, _uuid2.default)(), _this.handleChange = function (event) {
            if (event.target.checked) {
                _this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIRadio.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
            ref: 'input',
            type: 'radio',
            id: this.props.id || this.props.inputProps.id || this.uuid,
            className: (0, _classnames2.default)((_cx = {
                'ui-radio': true,
                'ui-radio-selected': this.props.selected
            }, _cx[this.props.inputProps.className] = !!this.props.inputProps.className, _cx)),
            name: this.props.name,
            value: this.props.value,
            checked: this.props.selected,
            'aria-checked': String(this.props.selected),
            onChange: this.handleChange }));
    };

    UIRadio.prototype.renderLabel = function renderLabel() {
        if (this.props.label) {
            var _cx2;

            return _react2.default.createElement(
                'label',
                _extends({}, this.props.labelProps, {
                    ref: 'label',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-radio-label': true
                    }, _cx2[this.props.labelProps.className] = !!this.props.labelProps.className, _cx2)),
                    htmlFor: this.props.id || this.props.inputProps.id || this.uuid }),
                this.props.label
            );
        }
    };

    UIRadio.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UIRadio.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-radio-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UIRadio;
}(_react2.default.PureComponent);

UIRadio.propTypes = {
    inputProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string.isRequired,
    onSelected: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.string.isRequired
};
UIRadio.internalKeys = Object.keys(UIRadio.propTypes);
UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: _noop2.default,
    selected: false
};
exports.default = UIRadio;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"22":22,"24":24,"26":26,"28":28}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"20":20,"22":22,"24":24,"28":28}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(21);

var _isString2 = _interopRequireDefault(_isString);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITextualInput = function (_React$PureComponent) {
    _inherits(UITextualInput, _React$PureComponent);

    function UITextualInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            input: '',
            isControlled: (0, _isString2.default)(_this.props.inputProps.value),
            isFocused: false
        }, _this.setInputValue = function () {
            var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            return _this.setState({ input: value });
        }, _this.getValue = function () {
            return _this.refs.field.value;
        }, _this.handleBlur = function (event) {
            _this.setState({ isFocused: false });

            if ((0, _isFunction2.default)(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ isFocused: true });

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come
            // exclusively via props (cWRP) so it exactly mirrors the current application
            // state, otherwise a re-render will occur before the new text has completed its
            // feedback loop and the cursor position is lost
            if (_this.state.isControlled === false) {
                _this.setInputValue(event.target.value);
            }

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.isControlled === true) {
            return this.setInputValue(this.props.inputProps.value);
        }

        this.setInputValue(this.props.inputProps.defaultValue);
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setInputValue(nextProps.inputProps.value);
        }
    };

    UITextualInput.prototype.setValue = function setValue(nextValue) {
        this.setInputValue(nextValue);
        this.refs.field.value = nextValue;

        if (this.state.isControlled === true) {
            // simulate input change event flow
            this.refs.field.dispatchEvent(new Event('input', { bubbles: true }));
            this.refs.field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    };

    UITextualInput.prototype.getPlaceholderText = function getPlaceholderText() {
        var isNonEmpty = this.state.input !== '';
        var shouldShowPlaceholder = this.props.hidePlaceholderOnFocus === true ? this.state.isFocused === false && isNonEmpty === false : isNonEmpty === false;

        return shouldShowPlaceholder ? this.props.inputProps.placeholder : '';
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        return _react2.default.createElement(
            'div',
            { ref: 'placeholder', className: 'ui-textual-input-placeholder ui-textual-input' },
            this.getPlaceholderText()
        );
    };

    UITextualInput.prototype.render = function render() {
        var _cx, _cx2;

        var props = this.props;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(props, UITextualInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[props.className] = Boolean(props.className), _cx)),
                title: this.getPlaceholderText() }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[props.inputProps.className] = Boolean(props.inputProps.className), _cx2)),
                placeholder: null,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onChange: this.handleChange }))
        );
    };

    return UITextualInput;
}(_react2.default.PureComponent);

UITextualInput.propTypes = {
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        onBlur: _react.PropTypes.func,
        onFocus: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        placeholder: _react.PropTypes.string,
        type: _react.PropTypes.string,
        value: _react.PropTypes.string
    })
};
UITextualInput.internalKeys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"21":21,"24":24,"28":28}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UITypeaheadInput = require(18);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _extractChildProps = require(19);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distill rich entity data matched via typeahead input into simple visual abstractions.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITokenizedInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var first = function first(array) {
    return array[0];
};
var last = function last(array) {
    return array[array.length - 1];
};

var UITokenizedInput = function (_React$PureComponent) {
    _inherits(UITokenizedInput, _React$PureComponent);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.focus = function () {
            return _this.refs.typeahead.focus();
        }, _this.getInputNode = function () {
            return _this.refs.typeahead.getInputNode();
        }, _this.getSelectedEntityText = function () {
            return _this.refs.typeahead.getSelectedEntityText();
        }, _this.getValue = function () {
            return _this.refs.typeahead.getValue();
        }, _this.select = function () {
            return _this.refs.typeahead.select();
        }, _this.setValue = function (value) {
            return _this.refs.typeahead.setValue(value);
        }, _this.add = function (index) {
            if (_this.props.tokens.indexOf(index) === -1) {
                _this.props.handleAddToken(index);
            }
        }, _this.handleInputClick = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus)) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.which) {
                case 37:
                    // left arrow
                    _this.selectPreviousToken(event.shiftKey);
                    break;

                case 39:
                    // right arrow
                    _this.selectNextToken(event.shiftKey);
                    break;

                case 8:
                    // backspace
                    if (_this.props.tokensSelected.length) {
                        _this.remove(_this.props.tokensSelected);
                        _this.focus();
                    }

                    break;

                case 65:
                    // letter "a"
                    if (event.metaKey) {
                        event.preventDefault();

                        _this.focus();
                        _this.select();

                        // hacky, but the only way unless we move selection management internal again
                        _this._suppressNextTokenSelection = true;

                        _this.props.handleNewSelection(_this.props.tokens);
                    } // "cmd"
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITokenizedInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var previousSelectedIndexes = prevProps.tokensSelected;
        var currentSelectedIndexes = this.props.tokensSelected;

        if (this.props.tokens.length > prevProps.tokens.length) {
            this.setValue('');
        }

        if (this._suppressNextTokenSelection) {
            this._suppressNextTokenSelection = false;

            return;
        }

        if (previousSelectedIndexes !== currentSelectedIndexes && currentSelectedIndexes.length !== 0) {
            if (currentSelectedIndexes.length === 1 || currentSelectedIndexes[0] !== previousSelectedIndexes[0] /* multi selection, leftward */) {
                    return this.refs['token_' + currentSelectedIndexes[0]].focus();
                } else if (last(currentSelectedIndexes) !== last(previousSelectedIndexes) /* multi selection, rightward */) {
                    return this.refs['token_' + last(currentSelectedIndexes)].focus();
                }

            this.refs['token_' + currentSelectedIndexes[0]].focus();
        } // move focus
    };

    // passthroughs to UITypeaheadInput instance methods


    UITokenizedInput.prototype.remove = function remove(index) {
        var _this2 = this;

        var indexes = (Array.isArray(index) ? index : [index]).filter(function (idx) {
            return _this2.props.tokens.indexOf(idx) !== -1;
        });

        if (indexes.length) {
            this.props.handleRemoveTokens(indexes);
        }
    };

    UITokenizedInput.prototype.selectToken = function selectToken(index) {
        this.props.handleNewSelection([index]);
    };

    UITokenizedInput.prototype.selectTokens = function selectTokens(indexes) {
        this.props.handleNewSelection(indexes);
    };

    UITokenizedInput.prototype.selectPreviousToken = function selectPreviousToken(append) {
        var selected = this.props.tokensSelected;
        var indexes = this.props.tokens;

        if (selected.length === 1 && first(selected) === first(indexes)) {
            return; // already at leftmost bound
        }

        if (selected.length === 0) {
            // pick the rightmost
            this.selectToken(last(indexes));
        } else {
            // add the next leftmost to a reconstructed "selected" array
            var previousToken = indexes[indexes.indexOf(first(selected)) - 1];

            this.selectTokens(append ? [previousToken].concat(selected) : [previousToken]);
        }
    };

    UITokenizedInput.prototype.selectNextToken = function selectNextToken(append) {
        var selected = this.props.tokensSelected;
        var indexes = this.props.tokens;

        if (selected.length === 0) {
            return;
        }

        if (last(selected) === last(indexes)) {
            this.clearSelection();
            this.focus();
        } else {
            var nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.selectTokens(append ? selected.concat(nextToken) : [nextToken]);
        }
    };

    UITokenizedInput.prototype.clearSelection = function clearSelection() {
        this.props.handleNewSelection([]);
    };

    UITokenizedInput.prototype.handleTokenCloseClick = function handleTokenCloseClick(index, event) {
        // if we don't stop propagation, the event bubbles and results in a failed token selection
        event.stopPropagation();

        this.remove(index);
        this.focus();

        if (this.props.tokenCloseComponent.props.onClick) {
            this.props.tokenCloseComponent.props.onClick(event);
        }
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.tokenCloseVisible) {
            var _cx;

            return _react2.default.cloneElement(this.props.tokenCloseComponent, {
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-token-close': true
                }, _cx[this.props.tokenCloseComponent.props.className] = Boolean(this.props.tokenCloseComponent.props.className), _cx)),
                onClick: this.handleTokenCloseClick.bind(this, index)
            });
        }
    };

    UITokenizedInput.prototype.handleTokenKeyDown = function handleTokenKeyDown(index, event) {
        switch (event.which) {
            case 13: // enter
            case 32:
                // space
                this.selectToken(index);
                event.preventDefault();
                break;

            case 8:
                // backspace
                this.remove(index);
                this.focus();
                event.preventDefault();
                break;
        }
    };

    UITokenizedInput.prototype.renderTokens = function renderTokens() {
        var _this3 = this;

        return _react2.default.createElement(
            'div',
            { className: 'ui-tokenfield-tokens' },
            this.props.tokens.map(function (index) {
                return _react2.default.createElement(
                    'div',
                    {
                        ref: 'token_' + index,
                        key: index,
                        className: (0, _classnames2.default)({
                            'ui-tokenfield-token': true,
                            'ui-tokenfield-token-selected': _this3.props.tokensSelected.indexOf(index) !== -1
                        }),
                        onClick: _this3.selectToken.bind(_this3, index),
                        onKeyDown: _this3.handleTokenKeyDown.bind(_this3, index),
                        tabIndex: '0' },
                    _this3.props.entities[index].text,
                    _this3.renderTokenClose(index)
                );
            })
        );
    };

    UITokenizedInput.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UITokenizedInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-tokenfield-wrapper': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, (0, _extractChildProps2.default)(this.props, _UITypeaheadInput2.default.propTypes), {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                clearPartialInputOnSelection: true,
                inputProps: _extends({}, this.props.inputProps, {
                    onClick: this.handleInputClick,
                    onFocus: this.handleInputFocus
                }),
                onEntitySelected: this.add }))
        );
    };

    return UITokenizedInput;
}(_react2.default.PureComponent);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokenCloseComponent: _react2.default.PropTypes.element,
    tokenCloseVisible: _react2.default.PropTypes.bool,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)
});
UITokenizedInput.internalKeys = Object.keys(UITokenizedInput.propTypes);
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokenCloseComponent: _react2.default.createElement(
        'div',
        null,
        'X'
    ),
    tokenCloseVisible: true,
    tokens: [],
    tokensSelected: []
});
exports.default = UITokenizedInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"18":18,"19":19,"20":20,"22":22,"24":24,"28":28}],17:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A wrapper that displays provided text on hover.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITooltip = function (_React$PureComponent) {
    _inherits(UITooltip, _React$PureComponent);

    function UITooltip() {
        _classCallCheck(this, UITooltip);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UITooltip.prototype.render = function render() {
        var _cx;

        var position = this.props.position;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(this.props, UITooltip.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-tooltip': true,
                    'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                    'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                    'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                    'ui-tooltip-position-after': position === UITooltip.position.AFTER
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                'data-tooltip': this.props.text,
                'aria-label': this.props['aria-label'] || this.props.text }),
            this.props.children
        );
    };

    return UITooltip;
}(_react2.default.PureComponent);

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};
UITooltip.propTypes = {
    position: _react2.default.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: _react2.default.PropTypes.string
};
UITooltip.internalKeys = Object.keys(UITooltip.propTypes);
UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE
};
exports.default = UITooltip;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"24":24,"28":28}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(29);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _UITextualInput = require(15);

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _extractChildProps = require(19);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(21);

var _isString2 = _interopRequireDefault(_isString);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _omit = require(24);

var _omit2 = _interopRequireDefault(_omit);

var _uuid = require(26);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITypeaheadInput = function (_React$PureComponent) {
    _inherits(UITypeaheadInput, _React$PureComponent);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.inputProps.value || this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.updateInputState(nextProps.inputProps.value);
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentDidMount = function componentDidMount() {
        if (this.state.selectedEntityIndex >= 0) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
            this.refs.matches.scrollTop = 0;
        } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop

        if (this.state.selectedEntityIndex >= 0 && this.props.entities[this.state.selectedEntityIndex] !== prevProps.entities[prevState.selectedEntityIndex]) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.handleMatchClick = function handleMatchClick(index) {
        this.setState({ selectedEntityIndex: index }, this.setValueWithSelectedEntity);
    };

    UITypeaheadInput.prototype.selectMatch = function selectMatch(delta) {
        var matches = this.state.entityMatchIndexes;
        var totalMatches = matches.length;
        var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            if (nextIndex < 0) {
                nextIndex = totalMatches - 1; // reverse loop
            } else if (nextIndex >= totalMatches) {
                nextIndex = 0; // loop
            }

            var matchIndex = matches[nextIndex];
            var matchesNode = this.refs.matches;
            var matchesNodeYEnd = matchesNode.scrollTop + matchesNode.clientHeight;
            var matchNode = this.refs['match_$' + matchIndex];
            var matchNodeYStart = matchNode.offsetTop;
            var matchNodeYEnd = matchNodeYStart + matchNode.clientHeight;

            // bring into view if necessary
            if (matchNodeYEnd >= matchesNodeYEnd) {
                // below
                matchesNode.scrollTop += matchNodeYEnd - matchesNodeYEnd;
            } else if (matchNodeYStart <= matchesNode.scrollTop) {
                // above
                matchesNode.scrollTop = matchNodeYStart;
            }

            this.setState({ selectedEntityIndex: matchIndex });
        }
    };

    UITypeaheadInput.prototype.cursorAtEndOfInput = function cursorAtEndOfInput() {
        var node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === this.getValue().length;
    };

    UITypeaheadInput.prototype.markFuzzyMatchSubstring = function markFuzzyMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var frags = entityContent.split(new RegExp('(' + (0, _escapeStringRegexp2.default)(input) + ')', 'ig'));
        var normalizedUserText = input.toLowerCase();
        var threshold = frags.length;
        var i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = _react2.default.createElement(
                    'mark',
                    { key: i, className: 'ui-typeahead-match-highlight' },
                    frags[i]
                );
            }
        }

        return frags;
    };

    UITypeaheadInput.prototype.markStartsWithMatchSubstring = function markStartsWithMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var seekValue = input.toLowerCase();
        var indexStart = entityContent.toLowerCase().indexOf(seekValue);
        var indexEnd = indexStart + seekValue.length;

        return [_react2.default.createElement(
            'span',
            { key: '0' },
            entityContent.slice(0, indexStart)
        ), _react2.default.createElement(
            'mark',
            { key: '1', className: 'ui-typeahead-match-highlight' },
            entityContent.slice(indexStart, indexEnd)
        ), _react2.default.createElement(
            'span',
            { key: '2' },
            entityContent.slice(indexEnd)
        )];
    };

    UITypeaheadInput.prototype.getMarkingFunction = function getMarkingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;
        } else if ((0, _isFunction2.default)(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (this.warnedMarker === undefined) {
            this.warnedMarker = true;
            console.warn('UITypeaheadInput: no `props.algorithm.marker` was provided; falling back to the default marking algorithm (FUZZY).');
        }

        return this.markFuzzyMatchSubstring;
    };

    UITypeaheadInput.prototype.getFuzzyMatchIndexes = function getFuzzyMatchIndexes(userText, entities) {
        var normalized = userText.toLowerCase();

        return entities.reduce(function findIndexes(result, entity, index) {
            return entity.text.toLowerCase().indexOf(normalized) !== -1 ? result.push(index) && result : result;
        }, []);
    };

    UITypeaheadInput.prototype.getStartsWithMatchIndexes = function getStartsWithMatchIndexes(userText, entities) {
        var seekValue = userText.toLowerCase();

        return entities.reduce(function seekMatch(results, entity, index) {
            if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                results.push(index);
            }

            return results;
        }, []);
    };

    UITypeaheadInput.prototype.getMatchingFunction = function getMatchingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;
        } else if ((0, _isFunction2.default)(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (this.warnedMatcher === undefined) {
            this.warnedMatcher = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches(providedEntities) {
        var _this2 = this;

        this.setState(function (state, props) {
            var entities = providedEntities || props.entities;
            var currentValue = state.input;
            var matches = currentValue === '' ? [] : _this2.getMatchIndexes(currentValue, entities);

            return {
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches
            };
        });
    };

    UITypeaheadInput.prototype.renderNotification = function renderNotification() {
        return _react2.default.createElement(
            'div',
            {
                ref: 'aria',
                id: this.state.id,
                className: this.props.offscreenClass,
                'aria-live': 'polite' },
            this.getSelectedEntityText()
        );
    };

    UITypeaheadInput.prototype.renderHint = function renderHint() {
        if (this.props.hint) {
            var _cx;

            var userText = this.state.input;
            var raw = this.getSelectedEntityText();
            var processed = '';

            if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.hintProps, {
                    ref: 'hint',
                    className: (0, _classnames2.default)((_cx = {
                        'ui-textual-input': true,
                        'ui-textual-input-placeholder': true,
                        'ui-typeahead-hint': true
                    }, _cx[this.props.hintProps.className] = !!this.props.hintProps.className, _cx)),
                    tabIndex: '-1' }),
                processed
            );
        }
    };

    UITypeaheadInput.prototype.renderMatches = function renderMatches() {
        var _this3 = this;

        if (this.state.entityMatchIndexes.length) {
            var _cx2;

            var props = this.props.matchWrapperProps;

            return _react2.default.createElement(
                'div',
                _extends({}, props, {
                    ref: 'matches',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-typeahead-match-wrapper': true
                    }, _cx2[props.className] = !!props.className, _cx2)) }),
                this.state.entityMatchIndexes.map(function (index) {
                    var _cx3;

                    var entity = _this3.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this3.handleMatchClick.bind(_this3, index) }),
                        _this3.markMatchSubstring(_this3.state.input, entity)
                    );
                })
            );
        }
    };

    UITypeaheadInput.prototype.render = function render() {
        var _cx4, _cx5;

        var props = this.props;
        var state = this.state;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _omit2.default)(props, UITypeaheadInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[props.className] = !!props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement(_UITextualInput2.default, _extends({}, (0, _extractChildProps2.default)(props, _UITextualInput2.default.propTypes), {
                ref: 'input',
                'aria-controls': state.id,
                inputProps: _extends({}, props.inputProps, {
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-typeahead': true
                    }, _cx5[props.inputProps.className] = !!props.inputProps.className, _cx5)),
                    onChange: this.handleChange
                }) })),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_react2.default.PureComponent);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = _extends({}, _UITextualInput2.default.propTypes, {
    algorithm: _react.PropTypes.oneOfType([_react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react.PropTypes.shape({
        marker: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])]),
        matcher: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])])
    })]),
    clearPartialInputOnSelection: _react.PropTypes.bool,
    entities: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.string
    })),
    hint: _react.PropTypes.bool,
    hintProps: _react.PropTypes.object,
    matchWrapperProps: _react.PropTypes.object,
    offscreenClass: _react.PropTypes.string,
    onComplete: _react.PropTypes.func,
    onEntityHighlighted: _react.PropTypes.func,
    onEntitySelected: _react.PropTypes.func
});
UITypeaheadInput.internalKeys = Object.keys(UITypeaheadInput.propTypes);
UITypeaheadInput.defaultProps = _extends({}, _UITextualInput2.default.defaultProps, {
    algorithm: UITypeaheadInput.mode.FUZZY,
    clearPartialInputOnSelection: false,
    entities: [],
    hintProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntityHighlighted: _noop2.default,
    onEntitySelected: _noop2.default
});

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        entityMatchIndexes: [],
        id: (0, _uuid2.default)(),
        isControlled: (0, _isString2.default)(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };

    this.updateInputState = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return _this4.setState({ input: value });
    };

    this.getSelectedEntityText = function () {
        var entity = _this4.props.entities[_this4.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        _this4.setState({
            selectedEntityIndex: -1,
            entityMatchIndexes: []
        });
    };

    this.getInputNode = function () {
        return _this4.refs.input.refs.field;
    };

    this.select = function () {
        var input = _this4.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this4.getValue().length;
    };

    this.focus = function () {
        return _this4.getInputNode().focus();
    };

    this.getValue = function () {
        return _this4.refs.input.getValue();
    };

    this.setValue = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        _this4.refs.input.setValue(value);

        _this4.updateInputState(value);
        _this4.resetMatches();
        _this4.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this4.props.onEntitySelected(_this4.state.selectedEntityIndex);

        if (_this4.props.clearPartialInputOnSelection) {
            _this4.setValue('');
        } else {
            _this4.setValue(_this4.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(_this4.resetMatches, 0);
    };

    this.markMatchSubstring = function () {
        return _this4.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this4.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleChange = function (event) {
        if (_this4.state.isControlled === false) {
            _this4.updateInputState(event.target.value);
            _this4.computeMatches();
        }

        if ((0, _isFunction2.default)(_this4.props.inputProps.onChange)) {
            _this4.props.inputProps.onChange(event);
        }
    };

    this.handleKeyDown = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                if (event.target.selectionStart > 1) {
                    event.stopPropagation();
                }

                break;

            case 'Tab':
            case 'ArrowRight':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.cursorAtEndOfInput() && _this4.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this4.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this4.selectMatch(-1);
                _this4.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this4.selectMatch(1);
                _this4.focus();
                break;

            case 'Escape':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.getInputNode() === event.target) {
                    _this4.resetMatches();
                }

                break;

            case 'Enter':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this4.setValueWithSelectedEntity();
                } else {
                    _this4.props.onComplete(_this4.state.input, event);
                }

                break;
        }

        if ((0, _isFunction2.default)(_this4.props.onKeyDown)) {
            _this4.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"15":15,"19":19,"20":20,"21":21,"22":22,"24":24,"26":26,"28":28,"29":29}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = extractChildProps;
/**
 * Returns an object containing all props listed in the propTypes of a child component
 * e.g. used in UITypeaheadInput to identify which props are meant for UITextualInput
 * @module UIUtils/extractChildProps
 *
 * @param  {Object} parentProps     props of the parent component
 * @param  {Object} childPropTypes  propTypes of the child component
 * @return {Object}                 props to be spread applied to a child component
 */

function extractChildProps(parentProps, childPropTypes) {
    return Object.keys(childPropTypes).reduce(function (childProps, key) {
        if (parentProps[key]) {
            childProps[key] = parentProps[key];
        }

        return childProps;
    }, {});
}

},{}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'function';
};

},{}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'string';
};

},{}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = noop;
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

},{}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.errors = undefined;
exports.default = notify;

var _isFunction = require(20);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(21);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Trigger native toasts in supporting browsers.
 * @class UINotificationService
 */

var errors = exports.errors = {
    DISABLED: 'UIUtils/notify: web notifications are currently disabled by user settings.',
    NOT_AVAILABLE: 'UIUtils/notify: web notifications are not supported on this platform.',
    CONFIG_TYPE: 'UIUtils/notify: passed a non-object as configuration.',
    CONFIG_MISSING: 'UIUtils/notify: no configuration was passed.',
    BODY_TYPE: 'UIUtils/notify: `body` must be a string.',
    BODY_MISSING: 'UIUtils/notify: `body` was omitted from the configuration object.',
    HEADER_TYPE: 'UIUtils/notify: `header` must be a string.',
    HEADER_MISSING: 'UIUtils/notify: `header` was omitted from the configuration object.',
    ICON_TYPE: 'UIUtils/notify: `icon` must be a URL string.',
    ONCLICK_TYPE: 'UIUtils/notify: `onClick` must be a function.'
};

var NotificationAPI = function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    } else if (window.webkitNotifications) {
        return window.webkitNotifications;
    } else if (navigator.mozNotification) {
        return navigator.mozNotification;
    }

    return false;
}();

function requestPermission() {
    return new Promise(function (resolve, reject) {
        NotificationAPI.requestPermission(function requestReceiver(status) {
            if (status === 'granted' || status === 0) {
                resolve();
            }

            reject(errors.DISABLED);
        });
    });
}

function checkPermission() {
    return new Promise(function (resolve, reject) {
        if (!NotificationAPI) {
            return reject(errors.NOT_AVAILABLE);
        }

        if ('permission' in NotificationAPI) {
            switch (NotificationAPI.permission) {
                case 'granted':
                    return resolve();

                case 'denied':
                    return reject(errors.DISABLED);
            }

            requestPermission().then(resolve, reject);
        } else if ('checkPermission' in NotificationAPI) {
            switch (NotificationAPI.checkPermission()) {
                case 0:
                    return resolve();

                case 1:
                    requestPermission().then(resolve, reject);
                    break;

                default:
                    return reject(errors.DISABLED);
            }
        }
    });
}

function notify(config) {
    return new Promise(function (resolve, reject) {
        if (config === undefined) {
            return reject(errors.CONFIG_MISSING);
        } else if (Object.prototype.toString.call(config) !== '[object Object]') {
            return reject(errors.CONFIG_TYPE);
        } else if (config.body === undefined) {
            return reject(errors.BODY_MISSING);
        } else if ((0, _isString2.default)(config.body) === false) {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if ((0, _isString2.default)(config.header) === false) {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && (0, _isString2.default)(config.icon) === false) {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && (0, _isFunction2.default)(config.onClick) === false) {
            return reject(errors.ONCLICK_TYPE);
        }

        checkPermission().then(function spawnWebNotification() {
            var notification = new NotificationAPI(config.header, {
                body: config.body,
                icon: config.icon
            });

            /* istanbul ignore next */
            if (config.onClick) {
                notification.addEventListener('click', config.onClick);
            }

            resolve(notification);
        }, function (error) {
            return reject(error);
        });
    });
}

},{"20":20,"21":21}],24:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = omitKeysFromSourceObject;
/**
 * Returns a modified version of the supplied object without the given keys.
 */

function omitKeysFromSourceObject(source) {
    var omittedKeys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    return Object.keys(source).reduce(function relocateAcceptedKeys(hash, key) {
        if (omittedKeys.indexOf(key) === -1) {
            hash[key] = source[key];
        }

        return hash;
    }, {});
}

},{}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIUtils/transformProperty
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */

exports.default = function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
}();

},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = uuid;
/**
 * Generates a unique ID. Based on {@link https://gist.github.com/jed/982883 this implementation}.
 * @return {string} a unique identifier
 *
 * @example
 * uuid(); // 1f2cd27f-0754-4344-9d20-436a201b2f80
 */
function uuid() {
  /* eslint-disable */
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
    return (a ^ Math.random() * 16 >> a / 4).toString(16);
  });
  /* eslint-enable */
}

},{}],27:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

global.UIKit = {};
global.UIKit.UIUtils = {};

module.exports = {
    UIArrowKeyNavigation: global.UIKit.UIArrowKeyNavigation = require(1).default,
    UIButton: global.UIKit.UIButton = require(2).default,
    UICheckbox: global.UIKit.UICheckbox = require(3).default,
    UICheckboxGroup: global.UIKit.UICheckboxGroup = require(4).default,
    UIDialog: global.UIKit.UIDialog = require(5).default,
    UIFittedText: global.UIKit.UIFittedText = require(6).default,
    UIImage: global.UIKit.UIImage = require(7).default,
    UIModal: global.UIKit.UIModal = require(8).default,
    UIPagination: global.UIKit.UIPagination = require(9).default,
    UIPopover: global.UIKit.UIPopover = require(10).default,
    UIProgress: global.UIKit.UIProgress = require(11).default,
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require(12).default,
    UIRadio: global.UIKit.UIRadio = require(13).default,
    UISegmentedControl: global.UIKit.UISegmentedControl = require(14).default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require(16).default,
    UITextualInput: global.UIKit.UITextualInput = require(15).default,
    UITooltip: global.UIKit.UITooltip = require(17).default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require(18).default,
    UIUtils: {
        extractChildProps: global.UIKit.UIUtils.extractChildProps = require(19).default,
        notify: global.UIKit.UIUtils.notify = require(23).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(25).default,
        uuid: global.UIKit.UIUtils.uuid = require(26).default
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"23":23,"25":25,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],29:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],30:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = isInteger;

},{}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRpb24vaW5kZXguanMiLCJVSVBvcG92ZXIvaW5kZXguanMiLCJVSVByb2dyZXNzL2luZGV4LmpzIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCJVSVJhZGlvL2luZGV4LmpzIiwiVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiVUlUZXh0dWFsSW5wdXQvaW5kZXguanMiLCJVSVRva2VuaXplZElucHV0L2luZGV4LmpzIiwiVUlUb29sdGlwL2luZGV4LmpzIiwiVUlUeXBlYWhlYWRJbnB1dC9pbmRleC5qcyIsIlVJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMvaW5kZXguanMiLCJVSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCJVSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCJVSVV0aWxzL29taXQvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiVUlVdGlscy91dWlkL2luZGV4LmpzIiwiZXhwb3J0cy5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5pc2ludGVnZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IG51bGwsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bGx9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudW1DaGlsZHJlbiAtIDF9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gKFxuICAgICAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgID8gdGhpcy5yZWZzLndyYXBwZXJcbiAgICAgICAgICA6IGZpbmRET01Ob2RlKHRoaXMucmVmcy53cmFwcGVyKVxuICAgICAgICApLmNoaWxkcmVuW2luZGV4XTtcblxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIGNoaWxkTm9kZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09ICctMScpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggKyBkZWx0YTtcblxuICAgICAgICBpZiAobmV4dEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gbnVtQ2hpbGRyZW4gLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG5leHRJbmRleH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRCbHVyKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghaXNTdHJpbmcoY2hpbGQpICYmIGlzRnVuY3Rpb24oY2hpbGQucHJvcHMub25CbHVyKSkge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghaXNTdHJpbmcoY2hpbGQpICYmIGlzRnVuY3Rpb24oY2hpbGQucHJvcHMub25Gb2N1cykpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiBjaGlsZC5wcm9wcy50YWJJbmRleCAhPT0gdW5kZWZpbmVkID8gY2hpbGQucHJvcHMudGFiSW5kZXggOiAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVDaGlsZEJsdXIuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlQ2hpbGRGb2N1cy5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBVSUFycm93S2V5TmF2aWdhdGlvbi5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbigpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICAgIGxhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5jaGVja2VkOiBub29wLFxuICAgIH1cblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcy5pbnB1dFByb3BzLCAnaW5kZXRlcm1pbmF0ZScpfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfVxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5nZXRBcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIENvbnN0YW50cyA9IHtcbiAgICAgICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0QWxsOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICB9XG5cbiAgICBhbGxJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveEdyb3VwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWZ0ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBiZWZvcmU6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8IG5vZGUgPT09IHdpbmRvdykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kd3JhcHBlci5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgY2FsbE9uQ2xvc2VJZk1vdW50ZWQgPSAoKSA9PiB0aGlzLm1vdW50ZWQgJiYgdGhpcy5wcm9wcy5vbkNsb3NlKClcblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQodGhpcy5jYWxsT25DbG9zZUlmTW91bnRlZCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuYm9keVByb3BzfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmJvZHlQcm9wcy5pZCB8fCB0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuaWQgfHwgdGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvY3VzQm91bmRhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktb2Zmc2NyZWVuJyB0YWJJbmRleD0nMCcgYXJpYS1oaWRkZW49J3RydWUnPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gLy8gdXNlZCB0byBsb2NrIGZvY3VzIGludG8gYSBwYXJ0aWN1bGFyIHN1YnNldCBvZiBET01cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy53cmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtub2RlID0+ICh0aGlzLiR3cmFwcGVyID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9e25vZGUgPT4gKHRoaXMuJGRpYWxvZyA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWZ0ZXJ9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IFtdO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5mdW5jdGlvbiByZXNjYWxlKGluc3RhbmNlKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnBhcmVudE5vZGUpO1xuICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICBpZiAoY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4oaW5zdGFuY2UucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICBpbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiByZXNjYWxlKGluc3RhbmNlKSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VzLmluZGV4T2YoaW5zdGFuY2UpLCAxKTtcblxuICAgIGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlGaXR0ZWRUZXh0LnByb3BUeXBlcylcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuXG4gICAgICAgIC8vIHRoZXJlIGFyZSBsaWtlbHkgdG8gYmUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoaXMgY29tcG9uZW50IG9uIGEgcGFnZSwgc28gaXQgbWFrZXMgc2Vuc2UgdG8ganVzdCB1c2VcbiAgICAgICAgLy8gYSBzaGFyZWQgZ2xvYmFsIHJlc2l6ZSBsaXN0ZW5lciBpbnN0ZWFkIG9mIGVhY2ggY29tcG9uZW50IGhhdmluZyBpdHMgb3duXG4gICAgICAgIHJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB1bnJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLm9taXQodGhpcy5wcm9wcywgVUlGaXR0ZWRUZXh0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlJbWFnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJSW1hZ2UucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHN0YXR1c1Byb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUltYWdlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSU1vZGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBtYXNrUHJvcHM6IHt9LFxuICAgICAgICBtb2RhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICB1cGRhdGVJbnRlcm5hbE1vZGFsQ2FjaGUoaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5tb2RhbCA9IGluc3RhbmNlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyTW9kYWwoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyTW9kYWwoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVuZGVyTW9kYWwoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW50ZXJuYWxNb2RhbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJTW9kYWwuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSURpYWxvZy5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvVUlEaWFsb2c+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAsIHRoaXMuJGNvbnRhaW5lcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHV0aWxpdHkgdmlldyBmb3IgcGFnaW5nIHRoZSBkaXNwbGF5IG9mIG1hbnkgZGF0YSBpdGVtcyBvZiB2YXJ5aW5nIHNpemVzLlxuICogQGNsYXNzIFVJUGFnaW5hdGlvblxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBpc0ludGVnZXIgZnJvbSAnbG9kYXNoLmlzaW50ZWdlcic7XG5cbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgZGF0YVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBsb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKEl0ZW0ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ0NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QganN4ID0gdGhpcy5wcm9wcy5kYXRhVG9KU1hDb252ZXJ0ZXJGdW5jKHRoaXMuc3RhdGUuZGF0YSwgdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChqc3gsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXMoanN4LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IHRoaXMucHJvcHMuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLmluaXRpYWxQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLmluaXRpYWxQYWdlIDwgMSB8fCBwcm9wcy5pbml0aWFsUGFnZSA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXRlbUxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcblxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93UGFnaW5hdGlvblN0YXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IGRhdGEgPT4gZGF0YSxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogJ8KrIEZpcnN0JyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiAnTGFzdCDCuycsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiAnTmV4dCDigLonLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICAgICAgcG9zaXRpb246IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMuQUJPVkUsXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiAn4oC5IFByZXZpb3VzJyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UsXG4gICAgICAgIHRhcmdldEluZGV4OiAodGhpcy5wcm9wcy5pbml0aWFsUGFnZSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UgPSAoKSA9PiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgZ2V0UGFnZUZvckluZGV4ID0gKGluZGV4LCBpdGVtc1BlclBhZ2UgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT4gTWF0aC5jZWlsKChpbmRleCArIDEpIC8gaXRlbXNQZXJQYWdlKVxuICAgIHRvdGFsUGFnZXMgPSAoKSA9PiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpXG5cbiAgICBmaXJzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UoKSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gdGhpcy5wcm9wcztcblxuICAgICAgICAvLyB1c2UgdHJhbnNhY3Rpb25hbCBgc2V0U3RhdGUoKWAgc3ludGF4IHRvIGVuc3VyZSB0aGF0IHBlbmRpbmcgc3RhdGUgdXBkYXRlcyBhcmUgaG9ub3JlZCxcbiAgICAgICAgLy8gbGlrZSB0aG9zZSBmcm9tIGBwYWdlVG9JbmRleCgpYFxuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIC8vIE5PVEU6IGBwcm9wc2AgaGVyZSBpcyB0ZWNobmljYWxseSB0aGUgYG5leHRQcm9wc2AgeW91J2QgcmVjZWl2ZSBmcm9tIHRoZSBmaXJzdCBjV1JQIGFyZ3VtZW50XG4gICAgICAgICAgICAvLyBzbyB0aGF0J3Mgd2h5IHdlJ3JlIGNhY2hpbmcgYG9sZFByb3BzYCBvdXRzaWRlIHRoZSBgc2V0U3RhdGVgXG4gICAgICAgICAgICBpZiAocHJvcHMuaWRlbnRpZmllciAhPT0gb2xkUHJvcHMuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogMCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChzdGF0ZS50YXJnZXRJbmRleCwgcHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogc3RhdGUudGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYWdlVG9JbmRleCA9IGkgPT4ge1xuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLnByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYENhbm5vdCBwYWdlIHRvIGludmFsaWQgaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KGkpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IGksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSgpO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLnRvdGFsUGFnZXMoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIHRvdGFsUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICAgaXNGdW5jdGlvbih0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUoY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtjdXJyZW50UGFnZX0gb2YgJHt0b3RhbFBhZ2VzfWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtc3RhdGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sJyxcbiAgICAgICAgICAgICAgICAnZGF0YS1wYWdlLW51bWJlcic6IGksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuY3VycmVudFBhZ2UoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdXVpZCgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtY3VzdG9tJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5wcm9wcy50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IG5leHRUYXJnZXRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUzpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgLSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLnByb3BzLnRvdGFsSXRlbXMgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSBwYXJzZUludCh2YWx1ZSwgMTApICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgobmV4dFRhcmdldEluZGV4KSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBuZXh0VGFyZ2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW1zJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZW5lcmF0ZUl0ZW1zKCkubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BpdGVtXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4PXtpbmRleE9mZnNldCArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdDb250ZW50PXt0aGlzLnByb3BzLml0ZW1Mb2FkaW5nQ29udGVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCAgIHRoaXMucHJvcHMuaGlkZVBhZ2VySWZOb3ROZWVkZWRcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMudG90YWxJdGVtcyA8PSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ2FwaXRhbGl6ZWQgPSBwb3NpdGlvbkxvd2VyWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uQ2FwaXRhbGl6ZWR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24tY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBhZ2luYXRpb24tY29udHJvbHMtJHtwb3NpdGlvbkxvd2VyfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQYWdpbmF0aW9uLnBvc2l0aW9ucztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRpb24nPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkFCT1ZFIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CRUxPVyB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQYWdpbmF0aW9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyMSwgYXJyMikgeyByZXR1cm4gYXJyMS5maWx0ZXIoKGl0ZW0pID0+IGFycjIuaW5kZXhPZihpdGVtKSA9PT0gLTEpOyB9XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSAgICAgICAgIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IG9ialtrZXldKTsgfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvblZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucG9zaXRpb24pXG5cbiAgICBzdGF0aWMgcHJlc2V0ID0ge1xuICAgICAgICAnQUJPVkUnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICB9LFxuICAgICAgICAnQkVMT1cnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICB9LFxuICAgICAgICAnTEVGVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgICAgICdSSUdIVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIHByZXNldFZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucHJlc2V0KVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBQcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhbmNob3JZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgcHJlc2V0OiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnByZXNldFZhbHVlcyksXG4gICAgICAgIHNlbGZYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBzZWxmWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSB3aXRob3V0KE9iamVjdC5rZXlzKFVJUG9wb3Zlci5wcm9wVHlwZXMpLCBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IChcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD0nMCAwIDE0IDkuNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cbiAgICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWJvcmRlcicgZmlsbD0nIzAwMCcgcG9pbnRzPSc3IDAgMTQgMTAgMCAxMCcgLz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWZpbGwnIGZpbGw9JyNGRkYnIHBvaW50cz0nNi45ODIzMDQ0NCAxLjc1IDEyLjc1IDEwIDEuMjUgMTAnIC8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICksXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiAgIHByb3BzLmFuY2hvclhBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogICBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiAgICAgcHJvcHMuc2VsZlhBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246ICAgICBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBpbnN0YW5jZTtcbiAgICAgICAgdGhpcy4kZGlhbG9nID0gaW5zdGFuY2UuJGRpYWxvZzsgICAgLy8gdXNlZCBpbiB0ZXN0aW5nLCBub3QgcmVsZXZhbnRcbiAgICAgICAgdGhpcy4kd3JhcHBlciA9IGluc3RhbmNlLiR3cmFwcGVyO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgICAgICAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICAgICAgICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyLWNhcmV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlclByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgICAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzcy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUmFkaW8ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgdXVpZCA9IHV1aWQoKVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25CbHVyKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25DbGljayhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcHRpb25TZWxlY3RlZChvcHRpb24udmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkNsaWNrKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkZvY3VzKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQoZGVmaW5pdGlvbiwgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsQ2hpbGRLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVPcHRpb25Gb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBhcmlhLXJvbGU9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gdmFsdWUgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHdlIGRvbid0IHN0b3AgcHJvcGFnYXRpb24sIHRoZSBldmVudCBidWJibGVzIGFuZCByZXN1bHRzIGluIGEgZmFpbGVkIHRva2VuIHNlbGVjdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZVZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRva2VuaXplZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRvb2x0aXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb29sdGlwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBhbGdvcml0aG06IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgaGludFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaW5wdXQ6ICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgfHwgJycsXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgIH1cblxuICAgIHVwZGF0ZUlucHV0U3RhdGUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHZhbHVlfSlcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkXG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSB1cGNvbWluZyByZW5kZXIgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBieSBgc2V0VmFsdWVgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucmVzZXRNYXRjaGVzLCAwKTtcbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXJrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHRzLCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWF0Y2hlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhwcm92aWRlZEVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50aXRpZXMgPSBwcm92aWRlZEVudGl0aWVzIHx8IHByb3BzLmVudGl0aWVzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCB0ZXh0LCAuLi5yZXN0fSA9IGVudGl0eTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BtYXRjaF8kJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NOYW1lXTogISFjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyh0aGlzLnN0YXRlLmlucHV0LCBlbnRpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHMsIHN0YXRlfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPFVJVGV4dHVhbElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17c3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHByb3BzIGxpc3RlZCBpbiB0aGUgcHJvcFR5cGVzIG9mIGEgY2hpbGQgY29tcG9uZW50XG4gKiBlLmcuIHVzZWQgaW4gVUlUeXBlYWhlYWRJbnB1dCB0byBpZGVudGlmeSB3aGljaCBwcm9wcyBhcmUgbWVhbnQgZm9yIFVJVGV4dHVhbElucHV0XG4gKiBAbW9kdWxlIFVJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHNcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHBhcmVudFByb3BzICAgICBwcm9wcyBvZiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICogQHBhcmFtICB7T2JqZWN0fSBjaGlsZFByb3BUeXBlcyAgcHJvcFR5cGVzIG9mIHRoZSBjaGlsZCBjb21wb25lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIHByb3BzIHRvIGJlIHNwcmVhZCBhcHBsaWVkIHRvIGEgY2hpbGQgY29tcG9uZW50XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdENoaWxkUHJvcHMocGFyZW50UHJvcHMsIGNoaWxkUHJvcFR5cGVzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNoaWxkUHJvcFR5cGVzKS5yZWR1Y2UoKGNoaWxkUHJvcHMsIGtleSkgPT4ge1xuICAgICAgICBpZiAocGFyZW50UHJvcHNba2V5XSkge1xuICAgICAgICAgICAgY2hpbGRQcm9wc1trZXldID0gcGFyZW50UHJvcHNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGlsZFByb3BzO1xuICAgIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0ICh0ZXN0KSA9PiB0eXBlb2YgdGVzdCA9PT0gJ2Z1bmN0aW9uJ1xuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJ1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpXG4gICAgICAgICk7XG4gICAgfSk7XG59XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZ2xvYmFsLlVJS2l0ID0ge307XG5nbG9iYWwuVUlLaXQuVUlVdGlscyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBVSUFycm93S2V5TmF2aWdhdGlvbjogKGdsb2JhbC5VSUtpdC5VSUFycm93S2V5TmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vVUlBcnJvd0tleU5hdmlnYXRpb24nKS5kZWZhdWx0KSxcbiAgICBVSUJ1dHRvbjogKGdsb2JhbC5VSUtpdC5VSUJ1dHRvbiA9IHJlcXVpcmUoJy4vVUlCdXR0b24nKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94OiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3ggPSByZXF1aXJlKCcuL1VJQ2hlY2tib3gnKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94R3JvdXA6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveEdyb3VwID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94R3JvdXAnKS5kZWZhdWx0KSxcbiAgICBVSURpYWxvZzogKGdsb2JhbC5VSUtpdC5VSURpYWxvZyA9IHJlcXVpcmUoJy4vVUlEaWFsb2cnKS5kZWZhdWx0KSxcbiAgICBVSUZpdHRlZFRleHQ6IChnbG9iYWwuVUlLaXQuVUlGaXR0ZWRUZXh0ID0gcmVxdWlyZSgnLi9VSUZpdHRlZFRleHQnKS5kZWZhdWx0KSxcbiAgICBVSUltYWdlOiAoZ2xvYmFsLlVJS2l0LlVJSW1hZ2UgPSByZXF1aXJlKCcuL1VJSW1hZ2UnKS5kZWZhdWx0KSxcbiAgICBVSU1vZGFsOiAoZ2xvYmFsLlVJS2l0LlVJTW9kYWwgPSByZXF1aXJlKCcuL1VJTW9kYWwnKS5kZWZhdWx0KSxcbiAgICBVSVBhZ2luYXRpb246IChnbG9iYWwuVUlLaXQuVUlQYWdpbmF0aW9uID0gcmVxdWlyZSgnLi9VSVBhZ2luYXRpb24nKS5kZWZhdWx0KSxcbiAgICBVSVBvcG92ZXI6IChnbG9iYWwuVUlLaXQuVUlQb3BvdmVyID0gcmVxdWlyZSgnLi9VSVBvcG92ZXInKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3MgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3MnKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUnKS5kZWZhdWx0KSxcbiAgICBVSVJhZGlvOiAoZ2xvYmFsLlVJS2l0LlVJUmFkaW8gPSByZXF1aXJlKCcuL1VJUmFkaW8nKS5kZWZhdWx0KSxcbiAgICBVSVNlZ21lbnRlZENvbnRyb2w6IChnbG9iYWwuVUlLaXQuVUlTZWdtZW50ZWRDb250cm9sID0gcmVxdWlyZSgnLi9VSVNlZ21lbnRlZENvbnRyb2wnKS5kZWZhdWx0KSxcbiAgICBVSVRva2VuaXplZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVG9rZW5pemVkSW5wdXQgPSByZXF1aXJlKCcuL1VJVG9rZW5pemVkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVRleHR1YWxJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRleHR1YWxJbnB1dCA9IHJlcXVpcmUoJy4vVUlUZXh0dWFsSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVRvb2x0aXA6IChnbG9iYWwuVUlLaXQuVUlUb29sdGlwID0gcmVxdWlyZSgnLi9VSVRvb2x0aXAnKS5kZWZhdWx0KSxcbiAgICBVSVR5cGVhaGVhZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVHlwZWFoZWFkSW5wdXQgPSByZXF1aXJlKCcuL1VJVHlwZWFoZWFkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVV0aWxzOiB7XG4gICAgICAgIGV4dHJhY3RDaGlsZFByb3BzOiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMuZXh0cmFjdENoaWxkUHJvcHMgPSByZXF1aXJlKCcuL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnKS5kZWZhdWx0KSxcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wZXJ0eTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnRyYW5zZm9ybVByb3BlcnR5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JykuZGVmYXVsdCksXG4gICAgICAgIHV1aWQ6IChnbG9iYWwuVUlLaXQuVUlVdGlscy51dWlkID0gcmVxdWlyZSgnLi9VSVV0aWxzL3V1aWQnKS5kZWZhdWx0KSxcbiAgICB9LFxufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgJ1xcXFwkJicpO1xufTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsXG4gICAgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BOdW1iZXIuaXNJbnRlZ2VyYF0oaHR0cHM6Ly9tZG4uaW8vTnVtYmVyL2lzSW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzSW50ZWdlcigzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcignMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPT0gdG9JbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gdG9GaW5pdGUodmFsdWUpLFxuICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ludGVnZXI7XG4iXX0=
