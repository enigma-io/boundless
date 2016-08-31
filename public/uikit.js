(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

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

        if (childNode && document.activeElement !== childNode) {
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
                tabIndex: child.tabIndex || 0,
                onBlur: _this2.handleChildBlur.bind(_this2, index, child),
                onFocus: _this2.handleChildFocus.bind(_this2, index, child)
            });
        });
    };

    UIArrowKeyNavigation.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, _extends({}, (0, _lodash2.default)(this.props, UIArrowKeyNavigation.internalKeys), {
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

},{"21":21,"22":22,"33":33}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
            _extends({}, (0, _lodash2.default)(this.props, UIButton.internalKeys), {
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

},{"21":21,"23":23,"28":28,"33":33}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"23":23,"26":26,"28":28,"33":33}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _noop = require(23);

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
            _extends({}, (0, _lodash2.default)(this.props, UICheckboxGroup.internalKeys), {
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

},{"23":23,"28":28,"3":3,"33":33}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.uuidHeader = (0, _uuid2.default)(), _this.uuidBody = (0, _uuid2.default)(), _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(function () {
                            return _this.props.onClose();
                        }, 0);
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
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    UIDialog.prototype.componentDidMount = function componentDidMount() {
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
                _extends({}, (0, _lodash2.default)(this.props, UIDialog.internalKeys), {
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

},{"21":21,"23":23,"26":26,"28":28,"33":33}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

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
            _extends({}, (0, _lodash2.default)(this.props, UIFittedText.internalKeys), {
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

},{"28":28,"33":33}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
            _extends({}, (0, _lodash2.default)(this.props, UIImage.internalKeys), {
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

},{"23":23,"28":28,"33":33}],8:[function(require,module,exports){
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

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

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
            _extends({}, (0, _lodash2.default)(props, UIModal.internalKeys), {
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

},{"20":20,"28":28,"33":33,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UISegmentedControl = require(14);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
                _extends({}, (0, _lodash2.default)(this.props, Item.internalKeys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _lodash2.default)(this.props, Item.internalKeys), {
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
            _extends({}, (0, _lodash2.default)(this.props, UIPagination.internalKeys), {
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
        if (!Number.isInteger(props.initialPage)) {
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
        if (!Number.isInteger(props.numItemsPerPage)) {
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

},{"1":1,"14":14,"21":21,"23":23,"26":26,"28":28,"33":33}],10:[function(require,module,exports){
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

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require(35);

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require(34);

var _lodash6 = _interopRequireDefault(_lodash5);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _transformProperty = require(25);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking container positioned to a specific anchor element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPopover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _lodash2.default)(this.props, UIPopover.internalKeys), {
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
UIPopover.positionValues = (0, _lodash6.default)(UIPopover.position);
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
UIPopover.presetValues = (0, _lodash6.default)(UIPopover.preset);
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
UIPopover.internalKeys = _lodash4.default.apply(undefined, [Object.keys(UIPopover.propTypes)].concat(Object.keys(_UIDialog2.default.propTypes)));
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

},{"25":25,"28":28,"33":33,"34":34,"35":35,"5":5}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require(2);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"28":28,"33":33}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
            _extends({}, (0, _lodash2.default)(this.props, UIProgressiveDisclosure.internalKeys), {
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

},{"21":21,"23":23,"28":28,"33":33}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
            _extends({}, (0, _lodash2.default)(this.props, UIRadio.internalKeys), {
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

},{"21":21,"23":23,"26":26,"28":28,"33":33}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"21":21,"23":23,"28":28,"33":33}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _enigmaTable = require(29);

var _enigmaTable2 = _interopRequireDefault(_enigmaTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for Table.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function didColumnsChange(currentColumns, prevColumns, tableInternalColumns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (currentColumns.length !== prevColumns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return currentColumns.some(function (column, index) {
        return column.mapping !== prevColumns[index].mapping || column.title !== prevColumns[index].title || column.resizable !== prevColumns[index].resizable || column.width !== undefined && column.width !== tableInternalColumns[index].width;
    });
}

var columnChildSpec = _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    attributes: _react.PropTypes.object
});

var UITable = function (_React$PureComponent) {
    _inherits(UITable, _React$PureComponent);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UITable.prototype.getSubviewConfiguration = function getSubviewConfiguration() {
        return {
            wrapper: this.refs.wrapper,
            header: this.refs.header,
            body: this.refs.body,
            'x-scroll-track': this.refs['x-scroll-track'],
            'x-scroll-handle': this.refs['x-scroll-handle'],
            'y-scroll-track': this.refs['y-scroll-track'],
            'y-scroll-handle': this.refs['y-scroll-handle'],
            aria: this.refs.aria,

            columns: this.props.columns,
            headerColumnClickFunc: this.props.onHeaderCellInteract,
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            onColumnResize: this.props.onColumnResize,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _enigmaTable2.default(this.getSubviewConfiguration());

        if (this.props.jumpToRowIndex) {
            this.table.jumpToRowIndex(this.props.jumpToRowIndex);
        }
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var props = this.props;

        var changedProps = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prevProps[key]) {
                changedProps.push(key);
            }
        }

        for (key in prevProps) {
            if (prevProps[key] !== props[key] && changedProps.indexOf(key) === -1) {
                changedProps.push(key);
            }
        }

        if (changedProps.length) {
            if (changedProps.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changedProps.length === 1 && changedProps[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prevProps.columns, this.table.columns) === false) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    };

    UITable.prototype.renderXScroll = function renderXScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
            _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
        );
    };

    UITable.prototype.renderYScroll = function renderYScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
            _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
        );
    };

    UITable.prototype.renderAria = function renderAria() {
        return _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' });
    };

    UITable.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITable.internalKeys), {
                ref: 'wrapper',
                className: 'ui-table-wrapper ' + this.props.className,
                'data-set-identifier': this.props.identifier,
                tabIndex: '0' }),
            _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
            _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' }),
            this.renderXScroll(),
            this.renderYScroll(),
            this.renderAria()
        );
    };

    return UITable;
}(_react2.default.PureComponent);

UITable.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool, columnChildSpec, _react.PropTypes.arrayOf(columnChildSpec)]),
        mapping: _react.PropTypes.string,
        resizable: _react.PropTypes.bool,
        title: _react.PropTypes.string,
        width: _react.PropTypes.number
    })),
    getRow: _react.PropTypes.func,
    identifier: _react.PropTypes.string,
    jumpToRowIndex: _react.PropTypes.number,
    offscreenClass: _react.PropTypes.string,
    onCellInteract: _react.PropTypes.func,
    onColumnResize: _react.PropTypes.func,
    onHeaderCellInteract: _react.PropTypes.func,
    onRowInteract: _react.PropTypes.func,
    preserveScrollState: _react.PropTypes.bool,
    throttleInterval: _react.PropTypes.number,
    totalRows: _react.PropTypes.number
};
UITable.internalKeys = Object.keys(UITable.propTypes);
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"29":29,"33":33}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

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
            return _this.setState(function (state) {
                return _extends({}, state, { input: value });
            });
        }, _this.getValue = function () {
            return _this.refs.field.value;
        }, _this.handleBlur = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: false });
            });

            if ((0, _isFunction2.default)(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: true });
            });

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
            _extends({}, (0, _lodash2.default)(props, UITextualInput.internalKeys), {
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

},{"21":21,"22":22,"28":28,"33":33}],17:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _UITypeaheadInput = require(19);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
            _extends({}, (0, _lodash2.default)(this.props, UITokenizedInput.internalKeys), {
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

},{"19":19,"20":20,"21":21,"23":23,"28":28,"33":33}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

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
            _extends({}, (0, _lodash2.default)(this.props, UITooltip.internalKeys), {
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

},{"28":28,"33":33}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(32);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _lodash = require(33);

var _lodash2 = _interopRequireDefault(_lodash);

var _UITextualInput = require(16);

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

var _isString2 = _interopRequireDefault(_isString);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

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
        this.setState(function (state) {
            return _extends({}, state, { selectedEntityIndex: index });
        }, this.setValueWithSelectedEntity);
    };

    UITypeaheadInput.prototype.selectMatch = function selectMatch(delta) {
        var _this2 = this;

        var matches = this.state.entityMatchIndexes;
        var totalMatches = matches.length;
        var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            (function () {
                if (nextIndex < 0) {
                    nextIndex = totalMatches - 1; // reverse loop
                } else if (nextIndex >= totalMatches) {
                    nextIndex = 0; // loop
                }

                var matchIndex = matches[nextIndex];
                var matchesNode = _this2.refs.matches;
                var matchesNodeYEnd = matchesNode.scrollTop + matchesNode.clientHeight;
                var matchNode = _this2.refs['match_$' + matchIndex];
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

                _this2.setState(function (state) {
                    return _extends({}, state, { selectedEntityIndex: matchIndex });
                });
            })();
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
        var _this3 = this;

        this.setState(function (state, props) {
            var entities = providedEntities || props.entities;
            var currentValue = state.input;
            var matches = currentValue === '' ? [] : _this3.getMatchIndexes(currentValue, entities);

            return _extends({}, state, {
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches
            });
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
        var _this4 = this;

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

                    var entity = _this4.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this4.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this4.handleMatchClick.bind(_this4, index) }),
                        _this4.markMatchSubstring(_this4.state.input, entity)
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
            _extends({}, (0, _lodash2.default)(props, UITypeaheadInput.internalKeys), {
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
    var _this5 = this;

    this.state = {
        entityMatchIndexes: [],
        id: (0, _uuid2.default)(),
        isControlled: (0, _isString2.default)(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };

    this.updateInputState = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return _this5.setState(function (state) {
            return _extends({}, state, { input: value });
        });
    };

    this.getSelectedEntityText = function () {
        var entity = _this5.props.entities[_this5.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        _this5.setState(function (state) {
            return _extends({}, state, {
                selectedEntityIndex: -1,
                entityMatchIndexes: []
            });
        });
    };

    this.getInputNode = function () {
        return _this5.refs.input.refs.field;
    };

    this.select = function () {
        var input = _this5.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this5.getValue().length;
    };

    this.focus = function () {
        return _this5.getInputNode().focus();
    };

    this.getValue = function () {
        return _this5.refs.input.getValue();
    };

    this.setValue = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        _this5.refs.input.setValue(value);

        _this5.updateInputState(value);
        _this5.resetMatches();
        _this5.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this5.props.onEntitySelected(_this5.state.selectedEntityIndex);

        if (_this5.props.clearPartialInputOnSelection) {
            _this5.setValue('');
        } else {
            _this5.setValue(_this5.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(_this5.resetMatches, 0);
    };

    this.markMatchSubstring = function () {
        return _this5.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this5.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleChange = function (event) {
        if (_this5.state.isControlled === false) {
            _this5.updateInputState(event.target.value);
            _this5.computeMatches();
        }

        if ((0, _isFunction2.default)(_this5.props.inputProps.onChange)) {
            _this5.props.inputProps.onChange(event);
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
                if (_this5.state.selectedEntityIndex !== -1 && _this5.cursorAtEndOfInput() && _this5.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(-1);
                _this5.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(1);
                _this5.focus();
                break;

            case 'Escape':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    _this5.resetMatches();
                }

                break;

            case 'Enter':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                } else {
                    _this5.props.onComplete(_this5.state.input, event);
                }

                break;
        }

        if ((0, _isFunction2.default)(_this5.props.onKeyDown)) {
            _this5.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"16":16,"20":20,"21":21,"22":22,"23":23,"26":26,"28":28,"32":32,"33":33}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'function';
};

},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (test) {
  return typeof test === 'string';
};

},{}],23:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = noop;
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

},{}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.errors = undefined;
exports.default = notify;

var _isFunction = require(21);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require(22);

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

},{"21":21,"22":22}],25:[function(require,module,exports){
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
    UITable: global.UIKit.UITable = require(15).default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require(17).default,
    UITextualInput: global.UIKit.UITextualInput = require(16).default,
    UITooltip: global.UIKit.UITooltip = require(18).default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require(19).default,
    UIUtils: {
        extractChildProps: global.UIKit.UIUtils.extractChildProps = require(20).default,
        notify: global.UIKit.UIUtils.notify = require(24).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(25).default,
        uuid: global.UIKit.UIUtils.uuid = require(26).default
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"20":20,"24":24,"25":25,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Y_SCROLL_TRACK = exports.X_SCROLL_TRACK = exports.ROW_LOADING = exports.ROW_ACTIVE = exports.ROW_ODD = exports.ROW_EVEN = exports.ROW = exports.CELL_INNER = exports.CELL_ODD = exports.CELL_EVEN = exports.CELL = exports.HEADER_CELL_HANDLE = exports.HEADER_CELL = exports.INITIALIZED = undefined;

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _findWhere = require(30);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _transformProperty = require(31);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
} /**
   * A high-performance, infinite table view.
   */

var INITIALIZED = exports.INITIALIZED = 'ui-table-initialized';
var HEADER_CELL = exports.HEADER_CELL = 'ui-table-header-cell';
var HEADER_CELL_HANDLE = exports.HEADER_CELL_HANDLE = 'ui-table-header-cell-resize-handle';
var CELL = exports.CELL = 'ui-table-cell';
var CELL_EVEN = exports.CELL_EVEN = 'ui-table-cell-even';
var CELL_ODD = exports.CELL_ODD = 'ui-table-cell-odd';
var CELL_INNER = exports.CELL_INNER = 'ui-table-cell-inner';
var ROW = exports.ROW = 'ui-table-row';
var ROW_EVEN = exports.ROW_EVEN = 'ui-table-row-even';
var ROW_ODD = exports.ROW_ODD = 'ui-table-row-odd';
var ROW_ACTIVE = exports.ROW_ACTIVE = 'ui-table-row-active';
var ROW_LOADING = exports.ROW_LOADING = 'ui-table-row-loading';
var X_SCROLL_TRACK = exports.X_SCROLL_TRACK = 'ui-table-x-scroll-track';
var Y_SCROLL_TRACK = exports.Y_SCROLL_TRACK = 'ui-table-y-scroll-track';

var isObject = function isObject(test) {
    return Object.prototype.toString.call(test) === '[object Object]';
};
var noop = function noop() {};

/*

FOR FUTURE EYES

Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it be known that we tried to do it the React Way™ and it was not performant enough.

The combination that was settled upon is a React shell with native DOM guts. This combination yields the best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.

__Important Note__

Any time you create a document fragment, make sure you release it after by setting its variable to `null`. If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.


ORDER OF OPERATIONS

1. render one row of cells
2. capture table & cell sizing metrics
3. render column heads and the rest of the cells

If the component updates due to new props, just blow away everything and start over. It's cheaper than trying to diff.

*/

function applyDelta(delta, num) {
    if (delta < 0) {
        return num < 0 ? num - delta : num + delta;
    }

    return num - delta;
}

function getKeyFromKeyCode(code) {
    switch (code) {
        case 192:
            return 'Escape';

        case 40:
            return 'ArrowDown';

        case 38:
            return 'ArrowUp';

        case 13:
            return 'Enter';
    }

    return null;
}

function translate3d() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
} // z is never used

/**
 * Generates a DOM cell.
 *
 * @param  {string}  content
 * @param  {string}  mapping
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = CELL;
    cell.classList.add(index % 2 === 0 ? CELL_EVEN : CELL_ODD);

    cell.setAttribute('data-column', mapping);

    if (width) {
        cell.style.width = width + 'px';
    }

    var text = document.createElement('div');
    text.className = CELL_INNER;

    var text_node = document.createTextNode(content);
    text.appendChild(text_node);

    cell.appendChild(text);

    return cell;
}

/**
 * Converts a simple object DOM spec into equivalent DOM node(s).
 *
 * @param  {string}       options.tag
 * @param  {object}       options.attributes   - HTML attributes that must be set via `setAttribute()`, e.g. `data-*`
 * @param  {*}            options.children     - should be a string, DOM spec, or array of DOM specs;
 *                                               all other input will be stringified
 * @param  {object}       options.properties   - properties to be explicitly set, e.g. `className`
 *
 * @return {HTMLElement}
 */
function specToDOM(_ref) {
    var _ref$tag = _ref.tag;
    var tag = _ref$tag === undefined ? 'div' : _ref$tag;
    var _ref$attributes = _ref.attributes;
    var attributes = _ref$attributes === undefined ? {} : _ref$attributes;
    var children = _ref.children;

    var properties = _objectWithoutProperties(_ref, ['tag', 'attributes', 'children']);

    var node = document.createElement(tag);

    Object.keys(attributes).forEach(function (key) {
        return node.setAttribute(key, attributes[key]);
    });
    Object.keys(properties).forEach(function (key) {
        return node[key] = properties[key];
    });

    if (children) {
        if (Array.isArray(children)) {
            children.forEach(function (spec) {
                return node.appendChild(specToDOM(spec));
            });
        } else if (isObject(children)) {
            node.appendChild(specToDOM(children));
        } else {
            node.appendChild(document.createTextNode(String(children)));
        }
    }

    return node;
}

/**
 * Generates a header cell with resize handle and optional children as defined by the object DOM DSL.
 *
 * @param  {object}  column
 * @param  {*}       column.children    - should be a string, DOM spec, or array of DOM specs;
 *                                        all other input will be stringified
 * @param  {string}  column.mapping
 * @param  {boolean} column.resizable
 * @param  {string}  column.title
 * @param  {number}  width
 * @param  {number}  index
 *
 * @return {HTMLElement}
 */
function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.classList.add(HEADER_CELL);

    if (column.children) {
        if (Array.isArray(column.children)) {
            column.children.forEach(function (spec) {
                return cell.appendChild(specToDOM(spec));
            });
        } else if (isObject(column.children)) {
            cell.appendChild(specToDOM(column.children));
        } else {
            cell.appendChild(document.createTextNode(String(column.children)));
        }
    }

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = HEADER_CELL_HANDLE;

        cell.appendChild(handle);
    }

    return cell;
}

function createHeaderCell(metadata, index) {
    var node = createDOMHeaderCell(metadata, metadata.width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_metadata': metadata,
        '_title': metadata.title,
        get title() {
            return this._title;
        },
        set title(val) {
            if (val !== this._title) {
                this._title = val;

                this.node.setAttribute('title', this._title);
                this._textNode.nodeValue = this._title;
            }
        },
        '_width': metadata.width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        mapping: metadata.mapping,
        node: node
    };
}

function createCell(content, mapping, width, index) {
    var node = createDOMCell(content, mapping, width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        getTextToBeRendered: function getTextToBeRendered() {
            return this.content || ''; // do not render null/undefined
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;
                this._textNode.nodeValue = this.getTextToBeRendered();
            }
        },
        '_width': width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';
            }
        },
        trueWidth: function trueWidth() {
            var style = this.node.getAttribute('style');
            var childClasses = this.node.children[0].className;

            this.node.setAttribute('style', '');

            // take off the inner class which is what causes the sizing constraint
            this.node.children[0].className = '';

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns an integer value, rather than the _actual_ width. SMH. */
            var newWidth = this.node.getBoundingClientRect().width;

            // Put everything back
            this.node.setAttribute('style', style);
            this.node.children[0].className = childClasses;

            return newWidth;
        },
        node: node
    };
}

function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = ROW;
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
}

function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    var row = createDOMRow(metadata.setIndex, metadata.y);
    var cells = [];

    var fragment = document.createDocumentFragment();

    columns.forEach(function (column, index) {
        cells.push(createCell('', column.mapping, column.width, index));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    var rowObj = {
        node: row,
        cells: cells,
        '_iterator': null,
        '_active': false,
        get active() {
            return this._active;
        },
        set active(val) {
            if (val !== this._active) {
                this._active = val;

                if (val && this.node.classList.contains(ROW_ACTIVE) === false) {
                    this.node.classList.add(ROW_ACTIVE);
                } else if (!val && this.node.classList.contains(ROW_ACTIVE) === true) {
                    this.node.classList.remove(ROW_ACTIVE);
                }
            }
        },
        '_setIndex': null,
        get setIndex() {
            return this._setIndex;
        },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.classList.add(ROW_EVEN);
                    this.node.classList.remove(ROW_ODD);
                } else {
                    this.node.classList.add(ROW_ODD);
                    this.node.classList.remove(ROW_EVEN);
                }

                this.node.setAttribute('data-index', val);

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() {
            return this._waitingForResolution;
        },
        set waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                this._waitingForResolution = val;

                if (val && this.node.classList.contains(ROW_LOADING) === false) {
                    this.node.classList.add(ROW_LOADING);
                } else if (!val && this.node.classList.contains(ROW_LOADING) === true) {
                    this.node.classList.remove(ROW_LOADING);
                }
            }
        },
        '_data': null,
        get data() {
            return this._data;
        },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data === null || this._data instanceof Promise) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    if (this._data instanceof Promise) {
                        this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                            if (this._data === promise) {
                                this.data = resolvedVal;
                            }
                        }.bind(this, this._data));
                    }

                    this.waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    if (Array.isArray(this._data)) {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[this._iterator];
                        }
                    } else {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                        }
                    }

                    this.waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this.waitingForResolution = false;
            }
        },
        '_y': metadata.y,
        get y() {
            return this._y;
        },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[_transformProperty2.default] = translate3d(0, this._y);
            }
        }
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;
    rowObj.active = metadata.active;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
}

function validateColumnShape(column) {
    return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(c) {
    if (!(c.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(c.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(c.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!(c['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!(c['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!(c['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!(c['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!(c.aria instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `aria` element.');
    }

    if (Array.isArray(c.columns) === false || c.columns.length === 0 || c.columns.every(validateColumnShape) === false) {
        throw Error('Table was not passed valid `columns`. It should be an array with at least one object conforming to: {\n            mapping: string,\n            resizable: bool,\n            title: string,\n            width: number (optional),\n        }');
    }

    if (typeof c.throttleInterval !== 'number') {
        throw Error('Table was not passed a valid `throttleInterval`; it should be a Number.');
    }

    if (typeof c.totalRows !== 'number') {
        throw Error('Table was not passed a valid `totalRows`; it should be a Number.');
    }

    if (typeof c.getRow !== 'function') {
        throw Error('Table was not passed a valid `getRow`; it should be a function.');
    }

    if (c.headerColumnClickFunc !== undefined && typeof c.headerColumnClickFunc !== 'function') {
        throw Error('Table was not passed a valid `headerColumnClickFunc`; it should be a function.');
    }

    if (c.rowClickFunc !== undefined && typeof c.rowClickFunc !== 'function') {
        throw Error('Table was not passed a valid `rowClickFunc`; it should be a function.');
    }

    if (c.cellClickFunc !== undefined && typeof c.cellClickFunc !== 'function') {
        throw Error('Table was not passed a valid `cellClickFunc`; it should be a function.');
    }

    if (c.columnResizeFunc !== undefined && typeof c.columnResizeFunc !== 'function') {
        throw Error('Table was not passed a valid `columnResizeFunc`; it should be a function.');
    }

    if (typeof c.preserveScrollState !== 'boolean') {
        throw Error('Table was not passed a valid `preserveScrollState`; it should be a boolean.');
    }
}

var Table = function () {
    _createClass(Table, [{
        key: '_processConfiguration',
        value: function _processConfiguration(config) {
            this.c = _extends({}, config);

            // fallback values
            this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
            this.c.throttleInterval = this.c.throttleInterval || 300;
            this.c.totalRows = this.c.totalRows || 0;

            validateConfiguration(this.c);
        }
    }]);

    function Table(config) {
        var _this = this;

        _classCallCheck(this, Table);

        this._handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            } else if (_this.c.wrapper.clientWidth !== _this.container_w) {
                var old_width = _this.container_w;

                _this._calculateContainerDimensions();
                _this._calculateXBound();
                _this._initializeScrollBars();

                _this.x_scroll_handle_position = _this.x / _this.x_table_pixel_ratio * -1;

                if (_this.x_scroll_handle_position + _this.x_scroll_handle_size > _this.x_scroll_track_w) {
                    _this.x_scroll_handle_position = _this.x_scroll_track_w - _this.x_scroll_handle_size;
                }

                _this._translateXScrollHandle(_this.x_scroll_handle_position);

                // getting larger and we're fully scrolled to the right
                if (old_width < _this.container_w && _this.x_scroll_handle_position + _this.x_scroll_handle_size === _this.x_scroll_track_w) {
                    _this.x += _this.container_w - old_width;

                    _this._translateHeader(_this.x);
                    _this._translateBody(_this.x, _this.last_body_y);
                }
            }
        };

        this._handleMoveIntent = function (event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0) {
                return;
            }
            if (_this.y_scroll_locked && event.deltaY === 0) {
                return;
            }
            if (_this.x_scroll_locked && event.deltaX === 0) {
                return;
            }

            _this.delta_x = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            _this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * _this.cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            _this.next_x = _this.y_scroll_locked ? _this.x : _this.x - _this.delta_x;
            _this.next_y = _this.x_scroll_locked ? _this.y : _this.y - _this.delta_y;

            if (_this.next_x > 0) {
                _this.next_x = 0;
            } else if (_this.next_x < _this.x_max) {
                _this.next_x = _this.x_max;
            }

            if (_this.n_rows_visible >= _this.c.totalRows) {
                /* negate the vertical movement, not enough rows to fill the body */
                _this.next_y = _this.y;
            } else if (_this.next_y < _this.y) {
                _this._scrollDown();
            } else if (_this.next_y > _this.y) {
                _this._scrollUp();
            }

            if (_this.reset_timer) {
                window.clearTimeout(_this.reset_timer);
            }

            /* reset row & wrapper Y values toward 0 to prevent overflowing */
            _this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                instance.reset_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = applyDelta(instance.reset_delta, instance.y);
                instance.y_min = applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = applyDelta(instance.reset_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance._translateBody(instance.x, instance.y);
            }, 100, _this);

            _this.top_visible_row_index = _this._calculateVisibleTopRowIndex();

            /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more _handleMoveIntent invocations before this rAF eventually executes. */
            window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
                if (nextX === 0) {
                    this.x_scroll_handle_position = 0;
                } else {
                    this.x_scroll_handle_position += (nextX - currX) / this.x_table_pixel_ratio * -1;

                    if (this.x_scroll_handle_position + this.x_scroll_handle_size > this.x_scroll_track_w) {
                        this.x_scroll_handle_position = this.x_scroll_track_w - this.x_scroll_handle_size;
                    }
                }

                this.y_scroll_handle_position = visibleTopRowIndex * this.y_scrollbar_pixel_ratio;

                if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                    this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
                }

                // Do all transforms grouped together
                this._translateAll(nextX, nextY);
            }.bind(_this, _this.next_x, _this.x, _this.next_y, _this.top_visible_row_index));

            _this.x = _this.next_x;
            _this.y = _this.next_y;
        };

        this._handleTouchMove = function (event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to _handleMoveIntent() */

            _this.touch = event.touches.item(0);

            _this.evt.deltaX = _this.last_touch_pageX - _this.touch.pageX;
            _this.evt.deltaY = _this.last_touch_pageY - _this.touch.pageY;

            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;

            _this._handleMoveIntent(_this.evt);
        };

        this._handleTouchStart = function (event) {
            _this.touch = event.touches.item(0);
            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;
        };

        this._handleAdvanceToXScrollTrackLocation = function (event) {
            if (_this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== X_SCROLL_TRACK) {
                return;
            }

            _this.evt.deltaX = Math.floor(applyDelta(_this.last_x_scroll_handle_x, event.pageX - _this.distance_from_left) * _this.x_table_pixel_ratio);

            _this.evt.deltaY = 0;

            _this._handleMoveIntent(_this.evt);

            _this.last_pageX = event.pageX;
        };

        this._handleAdvanceToYScrollTrackLocation = function (event) {
            if (_this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== Y_SCROLL_TRACK) {
                return;
            }

            _this.evt.deltaX = 0;
            _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

            _this._handleMoveIntent(_this.evt);
        };

        this._handleXScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            _this.last_pageX = event.pageX;
            _this.x_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this._handleDragEnd, true);
        };

        this._handleYScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            _this.y_scroll_offset = event.offsetY;

            _this.y_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this._handleDragEnd, true);
        };

        this._handleDragMove = function (event) {
            if (!_this.left_button_pressed) {
                return;
            }

            if (_this.y_scroll_locked) {
                if (_this.drag_timer) {
                    window.clearTimeout(_this.drag_timer);
                }

                /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
                _this.drag_timer = window.setTimeout(function () {
                    _this.drag_timer = null;

                    /* Now fetch, once drag has ceased for long enough. */
                    _this.rows.forEach(function (row) {
                        if (row.data === null) {
                            row.data = _this.c.getRow(row.setIndex);
                        }
                    });
                }, _this.c.throttleInterval);

                _this.evt.deltaX = 0;
                _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

                _this._handleMoveIntent(_this.evt);
            } else if (_this.x_scroll_locked) {
                _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
                _this.evt.deltaY = 0;

                _this._handleMoveIntent(_this.evt);

                _this.last_pageX = event.pageX;
            } else if (_this.column_is_resizing) {
                _this._handleColumnResize(event.pageX - _this.last_column_x);

                _this.last_column_x = event.pageX;
            }
        };

        this._handleDragEnd = function (event) {
            window.removeEventListener('mouseup', _this._handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this._unlockDragToScroll();
            }, 0);
        };

        this._preventClickWhileDragging = function (event) {
            return event.stopImmediatePropagation();
        };

        this._handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                window.addEventListener('click', _this._preventClickWhileDragging, true);

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', _this._handleDragEnd, true);
            }
        };

        this._handleColumnAutoExpand = function (event) {
            if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this.columns, 'mapping', mapping);
                    var columnIndex = _this.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = void 0;

                    _this.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this._applyNewColumnWidth(columnIndex, width);
                })();
            }
        };

        this._handleKeyDown = function (event) {
            var key = event.key || getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'Escape':
                    _this.resetActiveRowIndex();
                    break;

                case 'ArrowDown':
                    if (_this.active_row !== -1 // already keying through the table
                    || _this.active_row === -1 && _this.row_start_index === 0 // at the beginning
                    ) {
                            _this._changeActiveRow(1);
                        } else {
                        // start the active row on the topmost row in the current viewport
                        _this._changeActiveRow(_this.row_start_index + _this.n_padding_rows + 1);
                    }

                    event.preventDefault();
                    break;

                case 'ArrowUp':
                    _this._changeActiveRow(-1);
                    event.preventDefault();
                    break;

                case 'Enter':
                    if (_this.active_row !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row).data;

                            _this._setAriaText(_this.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;

                case 'c':
                    if ((event.metaKey || event.ctrlKey) && _this.active_row >= 0 && _this.copy_node) {
                        var active_row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row);

                        _this.copy_node.value = _this.columns.map(function (column) {
                            return '"' + column.title.replace('"', '\\"') + '"';
                        }).join(',') + '\n' + active_row.cells.map(function (cell) {
                            return '"' + cell.node.textContent.replace('"', '\\"') + '"';
                        }).join(',') + '\n';

                        _this.copy_node.select();

                        document.execCommand('copy');
                    }

                    break;
            }
        };

        this._handleClick = function (event) {
            var map = _this._discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(_this.rows, 'node', map.row);

                _this.setActiveRowIndex(row.setIndex);

                if (map.cell && _this.c.cellClickFunc) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                if (_this.c.rowClickFunc) {
                    _this.c.rowClickFunc(event, row.setIndex);
                }
            }
        };

        this._handleHeaderClick = function (event) {
            if (_this.c.headerColumnClickFunc) {
                var node = event.target;
                var mapping = void 0;

                while (!mapping && node) {
                    if (!node.hasAttribute('data-column')) {
                        node = node.parentElement;
                        continue;
                    }

                    mapping = node.getAttribute('data-column');
                }

                if (mapping) {
                    _this.c.headerColumnClickFunc(event, mapping);
                }
            }
        };

        this._processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
        this.y_scroll_handle_style = this.c['y-scroll-handle'].style;

        this._resetInternals();
        this.resetActiveRowIndex();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        try {
            document.execCommand('copy');

            this.copy_node = document.createElement('textarea');
            this.copy_node.style.position = 'absolute';
            this.copy_node.style.clip = 'rect(1px, 1px, 1px, 1px)';

            this.c.wrapper.appendChild(this.copy_node);
        } catch (e) {
            console.warn('Copying rows is not supported by this browser.');
        }

        window.addEventListener('resize', this._handleWindowResize);
        window.addEventListener('mousemove', this._handleDragMove);

        this.c.wrapper.addEventListener('wheel', this._handleMoveIntent);
        this.c.wrapper.addEventListener('touchstart', this._handleTouchStart);
        this.c.wrapper.addEventListener('touchmove', this._handleTouchMove);

        this.c.wrapper.addEventListener('keydown', this._handleKeyDown);

        this.header.addEventListener('mousedown', this._handleColumnDragStart);
        this.header.addEventListener('click', this._handleHeaderClick);
        this.header.addEventListener('dblclick', this._handleColumnAutoExpand);

        this.body.addEventListener('click', this._handleClick);

        this.c['x-scroll-handle'].addEventListener('mousedown', this._handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].addEventListener('mousedown', this._handleYScrollHandleDragStart);

        this.c['x-scroll-track'].addEventListener('click', this._handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].addEventListener('click', this._handleAdvanceToYScrollTrackLocation);
    }

    _createClass(Table, [{
        key: '_resetInternals',
        value: function _resetInternals() {
            this.columns = [];
            this.rows = [];
            this.rows_ordered_by_y = [];
            this.rows_ordered_by_y_length = 0;
            this.n_padding_rows = 3;

            this.x = this.y = 0;
            this.next_x = this.next_y = 0;

            if (this.c['y-scroll-track']) {
                this.c['y-scroll-track'].style.display = '';
            }

            this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

            if (this.c['x-scroll-track']) {
                this.c['x-scroll-track'].style.display = '';
            }

            this.distance_from_left = this.c['x-scroll-track'] ? this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset : null;

            this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

            this.top_visible_row_index = 0;

            // temporary variables in various calculations
            this.i = null;
            this.n_rows_to_shift = null;
            this.ordered_y_array_index = null;
            this.ptr = null;
            this.shift_delta = null;
            this.target_index = null;

            // translation caches
            this.last_header_x = null;
            this.last_body_x = null;
            this.last_body_y = null;
            this.last_x_scroll_handle_x = null;
            this.last_y_scroll_handle_y = null;

            this.drag_timer = null;

            this.evt = { preventDefault: noop };

            this.touch = null;
            this.last_touch_pageX = this.last_touch_pageY = 0;

            this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
            this.x_scroll_handle_size = this.y_scroll_handle_size = null;

            // reset!
            this._translateAll();
        }
    }, {
        key: '_emptyHeader',
        value: function _emptyHeader() {
            this.columns.length = 0;

            while (this.header.firstChild) {
                this.header.removeChild(this.header.firstChild);
            }
        }
    }, {
        key: '_buildColumns',
        value: function _buildColumns() {
            var _this2 = this;

            this._emptyHeader();
            this.c.columns.forEach(function (column, index) {
                return _this2.columns.push(createHeaderCell(column, index));
            });
        }
    }, {
        key: '_computeMinMaxHeaderCellDimensions',
        value: function _computeMinMaxHeaderCellDimensions() {
            this.columns.forEach(function (column) {
                var cs = window.getComputedStyle(column.node);
                var max = cs['max-width'];
                var min = cs['min-width'];

                column.minWidth = min === 'none' ? Number.MIN_VALUE : parseInt(min, 10);
                column.maxWidth = max === 'none' ? Number.MAX_VALUE : parseInt(max, 10);
            });
        }
    }, {
        key: '_injectHeaderCells',
        value: function _injectHeaderCells() {
            var _this3 = this;

            this.fragment = document.createDocumentFragment();
            this.columns.forEach(function (column) {
                return _this3.fragment.appendChild(column.node);
            });

            this.header.appendChild(this.fragment);

            // must be done after they have been injected into the DOM
            this._computeMinMaxHeaderCellDimensions();

            this.fragment = null; // prevent memleak
        }
    }, {
        key: '_emptyBody',
        value: function _emptyBody() {
            this.rows.length = 0;
            this.rows_ordered_by_y.length = 0;
            this.rows_ordered_by_y_length = 0;

            while (this.body.firstChild) {
                this.body.removeChild(this.body.firstChild);
            }
        }
    }, {
        key: '_injectFirstRow',
        value: function _injectFirstRow() {
            this._emptyBody();

            this.rows.push(createRow({
                active: this.row_start_index === this.active_row,
                data: this.c.getRow(this.row_start_index),
                setIndex: this.row_start_index,
                y: 0
            }, this.columns));

            this.rows_ordered_by_y.push(0);
            this.rows_ordered_by_y_length += 1;

            this.body.appendChild(this.rows[0].node);
        }
    }, {
        key: '_injectRestOfRows',
        value: function _injectRestOfRows() {
            this.fragment = document.createDocumentFragment();

            for (this.i = 1; this.i < this.n_rows_rendered; this.i += 1) {
                this.rows.push(createRow({
                    active: this.i + this.row_start_index === this.active_row,
                    data: this.c.getRow(this.i + this.row_start_index),
                    setIndex: this.i + this.row_start_index,
                    y: this.cell_h * this.i
                }, this.columns));

                this.rows_ordered_by_y.push(this.i);
                this.rows_ordered_by_y_length += 1;

                this.fragment.appendChild(this.rows[this.i].node);
            }

            this.body.appendChild(this.fragment);
            this.fragment = null; // prevent memleak
        }
    }, {
        key: '_applyNewColumnWidth',
        value: function _applyNewColumnWidth(index, width) {
            this.c.columns[index].width = width; // the provided config objects
            this.columns[index].width = width; // the column nodes
            this.rows.forEach(function (row) {
                row.cells[index].width = width;
            });

            this._calculateXBound();
            this._initializeScrollBars();

            if (this.c.onColumnResize) {
                this.c.onColumnResize(this.columns[index].mapping, width);
            }
        }
    }, {
        key: '_calculateColumnWidths',
        value: function _calculateColumnWidths() {
            var _this4 = this;

            var totalWidth = 0;

            this.columns.forEach(function (column, index) {
                if (column.width === undefined) {
                    column.width = Math.min(Math.max.apply(Math, _toConsumableArray(_this4.rows.map(function (row) {
                        return row.cells[index].node.clientWidth + 1 || column.minWidth;
                    }))), column.maxWidth);
                }

                totalWidth += column.width;
            });

            // automatically try to fill the available space
            if (totalWidth < this.container_w) {
                (function () {
                    var diff = _this4.container_w - totalWidth;
                    var diffRemainder = diff % _this4.columns.length;
                    var pxToAdd = (diff - diffRemainder) / _this4.columns.length;

                    _this4.columns.forEach(function (column, index, array) {
                        column.width += pxToAdd;

                        if (index === array.length - 1) {
                            column.width += diffRemainder;
                        }
                    });
                })();
            }

            this._applyColumnWidths();
        }
    }, {
        key: '_applyColumnWidths',
        value: function _applyColumnWidths() {
            var _this5 = this;

            this.rows.forEach(function (row) {
                row.cells.forEach(function (cell, index) {
                    cell.width = _this5.columns[index].width;
                });
            });
        }
    }, {
        key: '_calculateCellHeight',
        value: function _calculateCellHeight() {
            this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: '_calculateXBound',
        value: function _calculateXBound() {
            this.row_w = this.rows[0].node.clientWidth || 500;
            this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
        }
    }, {
        key: '_calculateYBound',
        value: function _calculateYBound() {
            this.y_min = 0;
            this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
        }
    }, {
        key: '_calculateXScrollHandleSize',
        value: function _calculateXScrollHandleSize() {
            this.x_scroll_handle_size = this.x_scroll_track_w / this.row_w * this.x_scroll_track_w;

            if (this.x_scroll_handle_size < 12) {
                this.x_scroll_handle_size = 12;
            } else if (this.x_scroll_handle_size > this.x_scroll_track_w) {
                this.x_scroll_handle_size = this.x_scroll_track_w;
            }

            return this.x_scroll_handle_size;
        }
    }, {
        key: '_calculateYScrollHandleSize',
        value: function _calculateYScrollHandleSize() {
            this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

            if (this.y_scroll_handle_size < 12) {
                this.y_scroll_handle_size = 12;
            }

            return this.y_scroll_handle_size;
        }
    }, {
        key: '_initializeScrollBars',
        value: function _initializeScrollBars() {
            this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || this.container_w;
            this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
            this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || this.container_h;
            this.x_scroll_handle_style.width = this._calculateXScrollHandleSize() + 'px';
            this.y_scroll_handle_style.height = this._calculateYScrollHandleSize() + 'px';

            /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
            this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

            /* how many scrollbar pixels === one row? */
            this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_visible);

            /* hide the scrollbars if they are not needed */

            if (this.x_scroll_handle_size === this.x_scroll_track_w) {
                this.c['x-scroll-track'].style.display = 'none';
                this.x_scroll_track_hidden = true;
            } else {
                this.c['x-scroll-track'].style.display = '';
                this.x_scroll_track_hidden = false;
            }

            if (this.y_scroll_handle_size === this.y_scroll_track_h) {
                this.c['y-scroll-track'].style.display = 'none';
                this.y_scroll_track_hidden = true;
            } else {
                this.c['y-scroll-track'].style.display = '';
                this.y_scroll_track_hidden = false;
            }
        }
    }, {
        key: '_calculateContainerDimensions',
        value: function _calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this.container_h = this.c.wrapper.clientHeight || 150;
            this.container_w = this.c.wrapper.clientWidth || 500;
            this.body_h = this.c.body.clientHeight || 110;
        }
    }, {
        key: '_translateHeader',
        value: function _translateHeader(x) {
            if (x !== this.last_header_x) {
                this.header_style[_transformProperty2.default] = translate3d(x);
                this.last_header_x = x;
            }
        }
    }, {
        key: '_translateBody',
        value: function _translateBody(x, y) {
            if (x !== this.last_body_x || y !== this.last_body_y) {
                this.body_style[_transformProperty2.default] = translate3d(x, y);
                this.last_body_x = x;
                this.last_body_y = y;
            }
        }
    }, {
        key: '_translateXScrollHandle',
        value: function _translateXScrollHandle(x) {
            if (x !== this.last_x_scroll_handle_x) {
                this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
                this.last_x_scroll_handle_x = x;
            }
        }
    }, {
        key: '_translateYScrollHandle',
        value: function _translateYScrollHandle(y) {
            if (y !== this.last_y_scroll_handle_y) {
                this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
                this.last_y_scroll_handle_y = y;
            }
        }
    }, {
        key: '_translateAll',
        value: function _translateAll(nextX, nextY) {
            this._translateHeader(nextX);
            this._translateBody(nextX, nextY);
            this._translateXScrollHandle(this.x_scroll_handle_position);
            this._translateYScrollHandle(this.y_scroll_handle_position);
        }
    }, {
        key: '_scrollUp',
        value: function _scrollUp() {
            /* at the logical start of the table (row index 0) we truncate upward scroll attempts
               to the upper translation boundary to keep from skipping off into nothingness */

            if (this.row_start_index === 0 && this.next_y > this.y_min) {
                this.next_y = this.y_min;

                return;
            }

            if (this.row_start_index === 0 || this.next_y <= this.y_min) {
                return;
            }

            /* Scrolling up, so we want to move the row in the visual bottom position to the top
               (above the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_min) / this.cell_h);

            /* prevent under-rotating below index zero, the logical start of a data set */
            if (this.row_start_index - this.n_rows_to_shift < 0) {
                this.next_y -= Math.abs(this.row_start_index - this.n_rows_to_shift) * this.cell_h;
                this.n_rows_to_shift = this.row_start_index;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_rendered) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                    this.row_start_index -= this.shift_delta;
                    this.row_end_index -= this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y -= this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_rendered;
                }

                /* move the highest Y-value rows to the top of the ordering array */
                this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

                for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_start_index - this.iterator;

                    this.ptr = this.rows[this.rows_ordered_by_y[this.ordered_y_array_index]];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.rows[this.rows_ordered_by_y[0]].y - this.cell_h;
                    this.ptr.active = this.target_index === this.active_row;

                    this.ptr = null;

                    this.rows_ordered_by_y.unshift(this.rows_ordered_by_y.pop());
                }

                this.row_start_index -= this.n_rows_to_shift;
                this.row_end_index -= this.n_rows_to_shift;

                this.y_min += this.n_rows_to_shift * this.cell_h;
                this.y_max += this.n_rows_to_shift * this.cell_h;
            }
        }
    }, {
        key: '_scrollDown',
        value: function _scrollDown() {
            /* at the logical end of the table (row index n) we truncate any scroll attempts  */
            if (this.row_end_index >= this.c.totalRows - 1 && this.next_y <= this.y_max) {
                this.next_y = this.y_max;

                if (this.x_scroll_track_hidden === false) {
                    this.next_y -= this.x_scroll_track_h;
                }

                return;
            } else if (this.next_y >= this.y_max) {
                return;
            }

            /* Scrolling down, so we want to move the row in the visual top position to the bottom
               (below the lip of the view) */

            this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

            if (this.n_rows_to_shift + this.row_end_index + 1 >= this.c.totalRows) {
                /* more rows than there is data available, truncate */
                this.next_y += (this.n_rows_to_shift - (this.c.totalRows - this.row_end_index - (this.top_visible_row_index === 0 ? 0 : 1))) * this.cell_h;

                this.next_y = applyDelta(applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

                if (this.x_scroll_track_hidden === false) {
                    this.next_y -= this.x_scroll_track_h;
                }

                this.n_rows_to_shift = this.c.totalRows - this.row_end_index - 1;
            }

            if (this.n_rows_to_shift > 0) {
                if (this.n_rows_to_shift > this.n_rows_rendered) {
                    /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                    this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                    this.row_start_index += this.shift_delta;
                    this.row_end_index += this.shift_delta;

                    /* accomodate for the number of pixels that will not be rendered */
                    this.next_y += this.shift_delta * this.cell_h;

                    this.n_rows_to_shift = this.n_rows_rendered;
                }

                for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                    this.target_index = this.row_end_index + this.iterator;

                    /* the padding rows will exceed the maximum index for a data set once the user has fully translated to the bottom of the screen */
                    if (this.target_index >= this.c.totalRows) {
                        this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());

                        continue;
                    }

                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this.ptr = this.rows[this.rows_ordered_by_y[0]];

                    this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                    this.ptr.setIndex = this.target_index;
                    this.ptr.y = this.rows[this.rows_ordered_by_y[this.rows_ordered_by_y_length - 1]].y + this.cell_h;
                    this.ptr.active = this.target_index === this.active_row;

                    this.ptr = null;

                    this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());
                }

                this.row_start_index += this.n_rows_to_shift;
                this.row_end_index += this.n_rows_to_shift;

                this.y_min -= this.n_rows_to_shift * this.cell_h;
                this.y_max -= this.n_rows_to_shift * this.cell_h;
            }
        }
    }, {
        key: '_calculateVisibleTopRowIndex',
        value: function _calculateVisibleTopRowIndex() {
            var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

            return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
        }
    }, {
        key: '_unlockDragToScroll',
        value: function _unlockDragToScroll() {
            this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;

            window.removeEventListener('click', this._preventClickWhileDragging, true);
        }
    }, {
        key: '_handleColumnResize',
        value: function _handleColumnResize(delta) {
            if (delta === 0) {
                return;
            }

            var index = this.columns.indexOf(this.column_is_resizing);
            var adjusted_delta = delta;

            if (adjusted_delta < 0 && !isNaN(this.column_is_resizing.minWidth) && this.column_is_resizing.width + adjusted_delta < this.column_is_resizing.minWidth) {
                adjusted_delta = this.column_is_resizing.minWidth - this.column_is_resizing.width;
            } else if (!isNaN(this.column_is_resizing.maxWidth) && this.column_is_resizing.width + adjusted_delta > this.column_is_resizing.maxWidth) {
                adjusted_delta = this.column_is_resizing.maxWidth - this.column_is_resizing.width;
            }

            this._applyNewColumnWidth(index, this.column_is_resizing.width + adjusted_delta);

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than
            the overall container, whitespace will appear regardless. */
            if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
                this.evt.deltaX = adjusted_delta;
                this.evt.deltaY = 0;

                this._handleMoveIntent(this.evt);
            }
        }
    }, {
        key: '_setAriaText',
        value: function _setAriaText(text) {
            this.c.aria.innerText = text;
        }
    }, {
        key: '_changeActiveRow',
        value: function _changeActiveRow(delta) {
            var _this6 = this;

            if (this.active_row + delta >= this.c.totalRows) {
                return;
            }

            this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

            if (this.next_active_row) {
                this.setActiveRowIndex(this.next_active_row.setIndex);
                this._setAriaText(this.next_active_row.data[this.columns[0].mapping]);

                if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h) {
                    // Destination row is outside the viewport, so simulate a scroll
                    this.evt.deltaX = 0;
                    this.evt.deltaY = this.cell_h * delta;

                    this._handleMoveIntent(this.evt);
                }
            } else if (delta < 0 && this.active_row > 0 || delta > 0 && this.active_row < this.c.totalRows) {
                /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
                this.evt.deltaX = 0;
                this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

                this._handleMoveIntent(this.evt);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this6._changeActiveRow(delta);
                });
            }

            this.next_active_row = null;
        }
    }, {
        key: '_discoverCellAndRowNodes',
        value: function _discoverCellAndRowNodes(target) {
            var node = target;
            var nodeMap = {};

            if (node.classList.contains(ROW)) {
                return { row: node };
            }

            while ((!nodeMap.cell || !nodeMap.row) && node) {
                if (node.classList.contains(CELL)) {
                    nodeMap.cell = node;
                } else if (node.classList.contains(ROW)) {
                    nodeMap.row = node;
                }

                node = node.parentNode;
            }

            return nodeMap;
        }
    }, {
        key: 'getActiveRowIndex',

        // public APIs

        value: function getActiveRowIndex() {
            return this.active_row > -1 ? this.active_row : undefined;
        }
    }, {
        key: 'setActiveRowIndex',
        value: function setActiveRowIndex(setIndex) {
            this.active_row = setIndex;
            this.rows.forEach(function (row) {
                row.active = row.setIndex === setIndex;
            });
        }
    }, {
        key: 'resetActiveRowIndex',
        value: function resetActiveRowIndex() {
            var _this7 = this;

            this.active_row = -1;
            this.next_active_row = null;

            if (this.rows.length) {
                this.rows.forEach(function (row) {
                    row.active = row.setIndex === _this7.active_row;
                });
            }
        }
    }, {
        key: 'getXAmountScrolled',
        value: function getXAmountScrolled() {
            return this.x;
        }
    }, {
        key: 'getYAmountScrolled',
        value: function getYAmountScrolled() {
            return this.y;
        }
    }, {
        key: 'jumpToRowIndex',
        value: function jumpToRowIndex(index) {
            this.row_start_index = index;
            this.y = 0;

            this.regenerate();

            this.top_visible_row_index = index;
            this.y_scroll_handle_position = index * this.y_scrollbar_pixel_ratio;

            if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
            }

            this._translateYScrollHandle(this.y_scroll_handle_position);

            this.setActiveRowIndex(index);
        }
    }, {
        key: 'regenerate',
        value: function regenerate() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

            if (config !== this.c) {
                this._processConfiguration(config);
            }

            // allows for true sizes to be calculated; post-initialization, the flexbox auto-grow algorithm takes over
            // and will divvy up remaining space amongst the children... precalculating the true size means larger columns
            // will not be prematurely truncated
            this.c.wrapper.classList.remove(INITIALIZED);

            /* stores the current state of the union for if we need to rehydrate the previous scroll state */
            this.__x = this.x;
            this.__y = this.y;
            this.__row_start_index = this.row_start_index;

            this._resetInternals();

            if (this.active_row >= this.c.totalRows) {
                this.resetActiveRowIndex();
            }

            this._calculateContainerDimensions();

            this._buildColumns();

            this.row_start_index = this.c.preserveScrollState ? this.__row_start_index || 0 : 0;

            this._injectFirstRow();
            this._calculateCellHeight();

            this.n_rows_rendered = Math.ceil(this.body_h / this.cell_h) + this.n_padding_rows;

            if (this.n_rows_rendered > this.c.totalRows) {
                this.n_rows_rendered = this.c.totalRows;
            }

            this.n_rows_visible = Math.floor(this.body_h / this.cell_h);

            if (this.n_rows_visible > this.n_rows_rendered) {
                this.n_rows_visible = this.n_rows_rendered;
            }

            this.row_end_index = this.row_start_index + this.n_rows_rendered - 1;

            this._injectRestOfRows();
            this._injectHeaderCells();
            this._calculateColumnWidths();

            this._calculateXBound();
            this._calculateYBound();

            this._initializeScrollBars();

            if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
                /* the cached values are then applied against the table to arrive at the previous state */

                this._handleMoveIntent({
                    deltaX: -this.__x,
                    deltaY: -this.__y,
                    preventDefault: noop
                });
            }

            // now that all the setup is complete, apply the flex algorithm to expand smaller cells if there
            // is extra room
            this.c.wrapper.classList.add(INITIALIZED);

            this.__x = this.__y = this.__row_start_index = null;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this8 = this;

            window.removeEventListener('resize', this._handleWindowResize);
            window.removeEventListener('mousemove', this._handleDragMove);

            this.c.wrapper.removeEventListener('wheel', this._handleMoveIntent);
            this.c.wrapper.removeEventListener('touchstart', this._handleTouchStart);
            this.c.wrapper.removeEventListener('touchmove', this._handleTouchMove);

            this.c.wrapper.removeEventListener('keydown', this._handleKeyDown);

            this.header.removeEventListener('mousedown', this._handleColumnDragStart);
            this.header.removeEventListener('click', this._handleHeaderClick);
            this.header.removeEventListener('dblclick', this._handleColumnAutoExpand);

            this.body.removeEventListener('click', this._handleClick);

            this.c['x-scroll-handle'].removeEventListener('mousedown', this._handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].removeEventListener('mousedown', this._handleYScrollHandleDragStart);

            this.c['x-scroll-track'].removeEventListener('click', this._handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].removeEventListener('click', this._handleAdvanceToYScrollTrackLocation);

            this._emptyHeader();
            this._emptyBody();

            // release cached DOM nodes
            Object.keys(this.c).forEach(function (key) {
                if (_this8.c[key] instanceof HTMLElement) {
                    _this8.c[key] = null;
                }
            });
        }
    }]);

    return Table;
}();

exports.default = Table;

},{"30":30,"31":31}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findWhere;
/**
 * Searches and returns the first occurence of an array item with the given property.
 * @module UIKit/utils/findWhere
 */

var _findWhereIndex = null;

/**
 * @param  {Array[Object]} array     an array of objects
 * @param  {String}        property  the name of the property to match against
 * @param  {*}             value     the value to match against (uses strict equality)
 *
 * @return {Object|undefined} The matched array item, or nothing.
 */
function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
    }
} // optimized specifically to only look for a single key:value match

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic
 * transform style manipulation.
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */
exports.default = function detectTransformProperty() {
    var possibilities = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    // used in JSDOM
    for (var i = 0, len = possibilities.length; i < len; i++) {
        if (possibilities[i] in document.documentElement.style) {
            return possibilities[i];
        }
    }

    return false;
}();

},{}],32:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],33:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = omit;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],34:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{}],35:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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

module.exports = without;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRpb24vaW5kZXguanMiLCJVSVBvcG92ZXIvaW5kZXguanMiLCJVSVByb2dyZXNzL2luZGV4LmpzIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCJVSVJhZGlvL2luZGV4LmpzIiwiVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiVUlUYWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiVUlVdGlscy9pc0Z1bmN0aW9uL2luZGV4LmpzIiwiVUlVdGlscy9pc1N0cmluZy9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIlVJVXRpbHMvdXVpZC9pbmRleC5qcyIsImV4cG9ydHMuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VuaWdtYS10YWJsZS9zcmMvdXRpbHMvZmluZFdoZXJlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VuaWdtYS10YWJsZS9zcmMvdXRpbHMvdHJhbnNmb3JtUHJvcGVydHkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9taXQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnZhbHVlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gud2l0aG91dC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCLG9COzs7Ozs7Ozs7Ozs7b0tBY2pCLEssR0FBUTtBQUNKLDhCQUFrQjtBQURkLFMsUUFnRFIsYSxHQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixvQkFBUSxNQUFNLEdBQWQ7QUFDQSxxQkFBSyxTQUFMO0FBQ0EscUJBQUssV0FBTDtBQUNJLDBCQUFNLGNBQU47QUFDQSwwQkFBSyxTQUFMLENBQWUsQ0FBQyxDQUFoQjtBQUNBOztBQUVKLHFCQUFLLFdBQUw7QUFDQSxxQkFBSyxZQUFMO0FBQ0ksMEJBQU0sY0FBTjtBQUNBLDBCQUFLLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUFYSjs7QUFjQSxnQkFBSSwwQkFBVyxNQUFLLEtBQUwsQ0FBVyxTQUF0QixDQUFKLEVBQXNDO0FBQ2xDLHNCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0g7QUFDSixTOzs7bUNBOURELGtCLCtCQUFtQixTLEVBQVcsUyxFQUFXO0FBQ3JDLFlBQUksS0FBSyxLQUFMLENBQVcsZ0JBQVgsS0FBZ0MsSUFBcEMsRUFBMEM7QUFDdEMsZ0JBQU0sY0FBZ0IsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUNDLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixLQUFLLEtBQUwsQ0FBVyxRQUFsQyxDQUFELENBQThDLE1BRDlDLEdBRUEsQ0FGdEI7O0FBSUEsZ0JBQUksZ0JBQWdCLENBQXBCLEVBQXVCO0FBQ25CLHFCQUFLLFFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaDlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUFycm93S2V5TmF2aWdhdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBwcmV2U3RhdGUuYWN0aXZlQ2hpbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggKyBkZWx0YTtcblxuICAgICAgICBpZiAobmV4dEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gbnVtQ2hpbGRyZW4gLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG5leHRJbmRleH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRCbHVyKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghaXNTdHJpbmcoY2hpbGQpICYmIGlzRnVuY3Rpb24oY2hpbGQucHJvcHMub25CbHVyKSkge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghaXNTdHJpbmcoY2hpbGQpICYmIGlzRnVuY3Rpb24oY2hpbGQucHJvcHMub25Gb2N1cykpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiBjaGlsZC50YWJJbmRleCB8fCAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVDaGlsZEJsdXIuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlQ2hpbGRGb2N1cy5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBVSUFycm93S2V5TmF2aWdhdGlvbi5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbigpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH07XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlCdXR0b24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25QcmVzc2VkOiBub29wLFxuICAgICAgICBvblVucHJlc3NlZDogbm9vcCxcbiAgICB9O1xuXG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnByb3BzLnByZXNzZWQgPyAnb25VbnByZXNzZWQnIDogJ29uUHJlc3NlZCddKGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQnV0dG9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzZWQnOiB0aGlzLnByb3BzLnByZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXt0aGlzLnByb3BzLnByZXNzZWR9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMuaW5wdXRQcm9wcywgJ2luZGV0ZXJtaW5hdGUnKX1cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuZ2V0QXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIENvbnN0YW50cyA9IHtcbiAgICAgICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0QWxsOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICB9XG5cbiAgICBhbGxJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveEdyb3VwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhZnRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJlZm9yZTogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogZmFsc2UsXG4gICAgICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLiRkaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJHdyYXBwZXIuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmhlYWRlclByb3BzLmlkIHx8IHRoaXMudXVpZEhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiAodGhpcy4kd3JhcHBlciA9IG5vZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJlZm9yZX1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlEaWFsb2cuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtub2RlID0+ICh0aGlzLiRkaWFsb2cgPSBub2RlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e3RoaXMudXVpZEhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT17dGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFmdGVyfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuZnVuY3Rpb24gcmVzY2FsZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgaWYgKGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94JyB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKGluc3RhbmNlLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlJbWFnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJSW1hZ2UucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHN0YXR1c1Byb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUltYWdlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1vZGFsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1vZGFsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJTW9kYWwucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIG1hc2tQcm9wczoge30sXG4gICAgICAgIG1vZGFsUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHVwZGF0ZUludGVybmFsTW9kYWxDYWNoZShpbnN0YW5jZSkge1xuICAgICAgICB0aGlzLm1vZGFsID0gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJNb2RhbCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJNb2RhbCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXJNb2RhbCgpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnRlcm5hbE1vZGFsQ2FjaGUoXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlNb2RhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICwgdGhpcy4kY29udGFpbmVyKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IC8+KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgdXRpbGl0eSB2aWV3IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zIG9mIHZhcnlpbmcgc2l6ZXMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0aW9uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgZGF0YVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBsb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKEl0ZW0ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ0NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QganN4ID0gdGhpcy5wcm9wcy5kYXRhVG9KU1hDb252ZXJ0ZXJGdW5jKHRoaXMuc3RhdGUuZGF0YSwgdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChqc3gsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXMoanN4LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IHRoaXMucHJvcHMuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5pbml0aWFsUGFnZSA8IDEgfHwgcHJvcHMuaW5pdGlhbFBhZ2UgPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGl0ZW1Mb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IGZhbHNlLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogZGF0YSA9PiBkYXRhLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0aW9uLnBvc2l0aW9ucy5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gaSA9PiB7XG4gICAgICAgIGlmIChpIDwgMCB8fCBpID49IHRoaXMucHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgQ2Fubm90IHBhZ2UgdG8gaW52YWxpZCBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoaSksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogaSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMudG90YWxQYWdlcygpO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgdG90YWxQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogICBpc0Z1bmN0aW9uKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM9e3RoaXMucHJvcHMuaXRlbVRvSlNYQ29udmVydGVyRnVuY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DYXBpdGFsaXplZCA9IHBvc2l0aW9uTG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXIuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgc2VnbWVudGVkQ29udHJvbCR7cG9zaXRpb25DYXBpdGFsaXplZH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcGFnaW5hdGlvbi1jb250cm9scy0ke3Bvc2l0aW9uTG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCB3aXRob3V0IGZyb20gJ2xvZGFzaC53aXRob3V0JztcbmltcG9ydCB2YWx1ZXMgZnJvbSAnbG9kYXNoLnZhbHVlcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25WYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnBvc2l0aW9uKVxuXG4gICAgc3RhdGljIHByZXNldCA9IHtcbiAgICAgICAgJ0FCT1ZFJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0JFTE9XJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0xFRlQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgICAgICAnUklHSFQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVzZXRWYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnByZXNldClcblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgYW5jaG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgcHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjYXJldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIHByZXNldDogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wcmVzZXRWYWx1ZXMpLFxuICAgICAgICBzZWxmWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgc2VsZllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gd2l0aG91dChPYmplY3Qua2V5cyhVSVBvcG92ZXIucHJvcFR5cGVzKSwgLi4uT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKSlcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgICAgIGNhcHR1cmVGb2N1czogZmFsc2UsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiAoXG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9JzAgMCAxNCA5LjUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+XG4gICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1ib3JkZXInIGZpbGw9JyMwMDAnIHBvaW50cz0nNyAwIDE0IDEwIDAgMTAnPjwvcG9seWdvbj5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWZpbGwnIGZpbGw9JyNGRkYnIHBvaW50cz0nNi45ODIzMDQ0NCAxLjc1IDEyLjc1IDEwIDEuMjUgMTAnPjwvcG9seWdvbj5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIHByZXNldDogVUlQb3BvdmVyLnByZXNldC5CRUxPVyxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246ICAgcHJvcHMuYW5jaG9yWEFsaWduICB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiAgIHByb3BzLmFuY2hvcllBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246ICAgICBwcm9wcy5zZWxmWEFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogICAgIHByb3BzLnNlbGZZQWxpZ24gICAgfHwgcHJvcHMucHJlc2V0LnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhbG9nSW50ZXJuYWxDYWNoZShpbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGluc3RhbmNlO1xuICAgICAgICB0aGlzLiRkaWFsb2cgPSBpbnN0YW5jZS4kZGlhbG9nOyAgICAvLyB1c2VkIGluIHRlc3RpbmcsIG5vdCByZWxldmFudFxuICAgICAgICB0aGlzLiR3cmFwcGVyID0gaW5zdGFuY2UuJHdyYXBwZXI7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvKlxuICAgICAgICAgICAgQSBudWFuY2UgYWJvdXQgdGhpcyBjb21wb25lbnQ6IHNpbmNlIGl0IG9ubHkgcmVuZGVycyBhIHNpbXBsZSA8ZGl2PiwgdGhlIG1haW4gcmVuZGVyKCkgZnVuY3Rpb25cbiAgICAgICAgICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgICAgICAgICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcikge1xuICAgICAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yTGVmdCA9IGFuY2hvclJlY3QubGVmdDtcbiAgICAgICAgdGhpcy5hbmNob3JUb3AgPSBhbmNob3JSZWN0LnRvcDtcbiAgICAgICAgdGhpcy5hbmNob3JIZWlnaHQgPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgdGhpcy5hbmNob3JXaWR0aCA9IGFuY2hvclJlY3Qud2lkdGg7XG5cbiAgICAgICAgdGhpcy5ib2R5TGVmdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5ib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBYIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgYWJvdmUgb3IgYmVsb3cgdGhlIGFuY2hvciBhbmQgc2VsZlhBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZlhBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLiR3cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRZID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBZIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIGFuY2hvciAoc3RhcnQsZW5kIHwgZW5kLHN0YXJ0KVxuICAgICAgICAvLyBzZWxmWUFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWUFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuYW5jaG9ySGVpZ2h0IC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLiR3cmFwcGVyLmNsaWVudEhlaWdodCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gdGhpcy5hbmNob3JMZWZ0ICsgdGhpcy5ib2R5TGVmdDtcblxuICAgICAgICBzd2l0Y2ggKGFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gdGhpcy5hbmNob3JUb3AgKyB0aGlzLmJvZHlUb3A7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7Li4udGhpcy5zdGF0ZX07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlkQWxpZ25tZW50Q2hhbmdlKG5leHRBbGlnbm1lbnQsIGN1cnJlbnRBbGlnbm1lbnQgPSB0aGlzLnN0YXRlKSB7XG4gICAgICAgIHJldHVybiAgICBuZXh0QWxpZ25tZW50LmFuY2hvclhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuYW5jaG9yWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvcllBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWUFsaWduO1xuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICB0aGlzLmNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yKSk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yKSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoZHgsIGR5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiB0aGlzLmRpZEFsaWdubWVudENoYW5nZShhbGlnbm1lbnRDb3JyZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgdGhpcy5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGNhcmV0IGlzIGluaXRpYWxseSBwb3NpdGlvbmVkIGF0IDAsMCBpbnNpZGUgdGhlIGRpYWxvZ1xuICAgICAgICAvLyB3aGljaCBpcyBhbHJlYWR5IHBvc2l0aW9uZWQgYXQgdGhlIGFuY2hvciwgc28gd2UganVzdCBuZWVkIHRvXG4gICAgICAgIC8vIG1ha2Ugc21hbGwgYWRqdXN0bWVudHMgYXMgbmVjZXNzYXJ5IHRvIGxpbmUgdXAgdGhlIGNhcmV0XG4gICAgICAgIC8vIHdpdGggdGhlIHZpc3VhbCBjZW50ZXIgb2YgdGhlIGFuY2hvclxuXG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuJGNhcmV0LCBjeCwgMCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiR3cmFwcGVyLCBkeCwgZHkpO1xuICAgIH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEaWFsb2coKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgZ2V0RnJhZyA9IHRoaXMuZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2FyZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IChub2RlKSA9PiAodGhpcy4kY2FyZXQgPSBub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXItY2FyZXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYXJldENvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXktJHtnZXRGcmFnKHN0YXRlLmFuY2hvcllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAsIHRoaXMuJGNvbnRhaW5lcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlSYWRpby5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9XG5cbiAgICB1dWlkID0gdXVpZCgpXG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUmFkaW8uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMpXG4gICAgc3RhdGljIGludGVybmFsQ2hpbGRLZXlzID0gW1xuICAgICAgICAnY29udGVudCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgXVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQmx1cikpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25DbGljaykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkZvY3VzKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbil9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25Gb2N1cykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KGRlZmluaXRpb24sIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbENoaWxkS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgYXJpYS1yb2xlPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJlYWN0IHdyYXBwZXIgZm9yIFRhYmxlLlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBUYWJsZSBmcm9tICdlbmlnbWEtdGFibGUnO1xuXG5mdW5jdGlvbiBkaWRDb2x1bW5zQ2hhbmdlKGN1cnJlbnRDb2x1bW5zLCBwcmV2Q29sdW1ucywgdGFibGVJbnRlcm5hbENvbHVtbnMpIHtcbiAgICAvKlxuICAgICAgICAxLiB0aGVyZSBzaG91bGQgYmUgdGhlIHNhbWUgbnVtYmVyIG9mIGNvbHVtbnNcbiAgICAgICAgMi4gdGhlIGNvbHVtbnMgc2hvdWxkIGV4YWN0bHkgbWF0Y2ggaW4gdGhlIHByb3BlciBvcmRlclxuICAgICAgICAzLiBlYWNoIGNvbHVtbiBwcm9wZXJ0eSBzaG91bGQgYmUgZXhhY3RseSB0aGUgc2FtZVxuICAgICAqL1xuXG4gICAgaWYgKGN1cnJlbnRDb2x1bW5zLmxlbmd0aCAhPT0gcHJldkNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRpZCB0aGUgY29sdW1uIGRlc2NyaXB0b3JzIGNoYW5nZSBpbiBzb21lIHdheSwgb3IgZGlkIHRoZSB3aWR0aCBjaGFuZ2U/XG4gICAgLy8gdGhpcyB3aWxsIGFsc28gY2F0Y2ggaWYgdGhlIG9yZGVyIG9mIHRoZSBjb2x1bW5zIGNoYW5nZWQgd2hlbiBjb21wYXJpbmdcbiAgICAvLyB0aGUgbWFwcGluZyBwcm9wZXJ0eVxuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucy5zb21lKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiAgICBjb2x1bW4ubWFwcGluZyAhPT0gcHJldkNvbHVtbnNbaW5kZXhdLm1hcHBpbmdcbiAgICAgICAgICAgICAgIHx8IGNvbHVtbi50aXRsZSAhPT0gcHJldkNvbHVtbnNbaW5kZXhdLnRpdGxlXG4gICAgICAgICAgICAgICB8fCBjb2x1bW4ucmVzaXphYmxlICE9PSBwcmV2Q29sdW1uc1tpbmRleF0ucmVzaXphYmxlXG4gICAgICAgICAgICAgICB8fCAoY29sdW1uLndpZHRoICE9PSB1bmRlZmluZWQgJiYgY29sdW1uLndpZHRoICE9PSB0YWJsZUludGVybmFsQ29sdW1uc1tpbmRleF0ud2lkdGgpO1xuICAgIH0pO1xufVxuXG5jb25zdCBjb2x1bW5DaGlsZFNwZWMgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRhZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdHRyaWJ1dGVzOiBQcm9wVHlwZXMub2JqZWN0LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGFibGUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uQ2hpbGRTcGVjLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYXJyYXlPZihjb2x1bW5DaGlsZFNwZWMpLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGVhZGVyQ2VsbEludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Sb3dJbnRlcmFjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICB0aHJvdHRsZUludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB0b3RhbFJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGFibGUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0cnVlLFxuICAgIH1cblxuICAgIGdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy5yZWZzLndyYXBwZXIsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMucmVmcy5oZWFkZXIsXG4gICAgICAgICAgICBib2R5OiB0aGlzLnJlZnMuYm9keSxcbiAgICAgICAgICAgICd4LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd4LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICBhcmlhOiB0aGlzLnJlZnMuYXJpYSxcblxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgaGVhZGVyQ29sdW1uQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uSGVhZGVyQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgcm93Q2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QsXG4gICAgICAgICAgICBjZWxsQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgb25Db2x1bW5SZXNpemU6IHRoaXMucHJvcHMub25Db2x1bW5SZXNpemUsXG4gICAgICAgICAgICBnZXRSb3c6IHRoaXMucHJvcHMuZ2V0Um93LFxuICAgICAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdGhpcy5wcm9wcy5wcmVzZXJ2ZVNjcm9sbFN0YXRlLFxuICAgICAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogdGhpcy5wcm9wcy50aHJvdHRsZUludGVydmFsLFxuICAgICAgICAgICAgdG90YWxSb3dzOiB0aGlzLnByb3BzLnRvdGFsUm93cyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZSh0aGlzLmdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBjaGFuZ2VkUHJvcHMgPSBbXTtcbiAgICAgICAgbGV0IGtleTtcblxuICAgICAgICAvKiBiaWRpcmVjdGlvbmFsIGtleSBjaGFuZ2UgZGV0ZWN0aW9uICovXG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldICE9PSBwcmV2UHJvcHNba2V5XSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGtleSBpbiBwcmV2UHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcmV2UHJvcHNba2V5XSAhPT0gcHJvcHNba2V5XSAmJiBjaGFuZ2VkUHJvcHMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5pbmRleE9mKCdqdW1wVG9Sb3dJbmRleCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8qIGp1bXBUb1Jvd0luZGV4IGFscmVhZHkgdHJpZ2dlcnMgYSByZWdlbmVyYXRpb24sIGp1c3QgYXZvaWRpbmcgcnVubmluZyBpdCB0d2ljZSAqL1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlZFByb3BzWzBdID09PSAnY29sdW1ucycpIHtcbiAgICAgICAgICAgICAgICAvKiBkaWQgdGhpbmdzIG1hdGVyaWFsbHkgY2hhbmdlLCBvciBqdXN0IHVwZGF0aW5nIGEgY29sdW1uIHdpZHRoPyAqL1xuICAgICAgICAgICAgICAgIGlmIChkaWRDb2x1bW5zQ2hhbmdlKHByb3BzLmNvbHVtbnMsIHByZXZQcm9wcy5jb2x1bW5zLCB0aGlzLnRhYmxlLmNvbHVtbnMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclhTY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyWVNjcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBcmlhKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVGFibGUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZGVyJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcicgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWFNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcllTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc0NvbnRyb2xsZWQ6IGlzU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSksXG4gICAgICAgIGlzRm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldElucHV0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlucHV0OiB2YWx1ZX0pKVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHsuLi5zdGF0ZSwgaXNGb2N1c2VkOiBmYWxzZX0pKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlzRm9jdXNlZDogdHJ1ZX0pKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgLy8gZm9yIFwiY29udHJvbGxlZFwiIHNjZW5hcmlvcywgdXBkYXRlcyB0byB0aGUgY2FjaGVkIGlucHV0IHRleHQgc2hvdWxkIGNvbWVcbiAgICAgICAgLy8gZXhjbHVzaXZlbHkgdmlhIHByb3BzIChjV1JQKSBzbyBpdCBleGFjdGx5IG1pcnJvcnMgdGhlIGN1cnJlbnQgYXBwbGljYXRpb25cbiAgICAgICAgLy8gc3RhdGUsIG90aGVyd2lzZSBhIHJlLXJlbmRlciB3aWxsIG9jY3VyIGJlZm9yZSB0aGUgbmV3IHRleHQgaGFzIGNvbXBsZXRlZCBpdHNcbiAgICAgICAgLy8gZmVlZGJhY2sgbG9vcCBhbmQgdGhlIGN1cnNvciBwb3NpdGlvbiBpcyBsb3N0XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBsYWNlaG9sZGVyVGV4dCgpIHtcbiAgICAgICAgY29uc3QgaXNOb25FbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRTaG93UGxhY2Vob2xkZXIgPSAgIHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgPT09IGZhbHNlICYmIGlzTm9uRW1wdHkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc05vbkVtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gc2hvdWxkU2hvd1BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gdmFsdWUgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHdlIGRvbid0IHN0b3AgcHJvcGFnYXRpb24sIHRoZSBldmVudCBidWJibGVzIGFuZCByZXN1bHRzIGluIGEgZmFpbGVkIHRva2VuIHNlbGVjdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZVZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRva2VuaXplZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRvb2x0aXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb29sdGlwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRTdGF0ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHsuLi5zdGF0ZSwgaW5wdXQ6IHZhbHVlfSkpXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAoc3RhdGUpID0+ICh7Li4uc3RhdGUsIHNlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSksXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZFxuXG4gICAgc2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgPSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQuZ2V0VmFsdWUoKVxuXG4gICAgc2V0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4ge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiAgICBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZFxuICAgICAgICAgICAgICAgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5lZWRzIHRvIGhhcHBlbiBhZnRlciB0aGUgdXBjb21pbmcgcmVuZGVyIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgYHNldFZhbHVlYFxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnJlc2V0TWF0Y2hlcywgMCk7XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0TWFya2luZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWFya2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWFya2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXJraW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0cywgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoaW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hdGNoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXRjaGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaGVyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hdGNoaW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgY29tcHV0ZU1hdGNoZXMocHJvdmlkZWRFbnRpdGllcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0aWVzID0gcHJvdmlkZWRFbnRpdGllcyB8fCBwcm9wcy5lbnRpdGllcztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUuaW5wdXQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzTmFtZV06ICEhY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJVGV4dHVhbElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbidcbiIsImV4cG9ydCBkZWZhdWx0ICh0ZXN0KSA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZydcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vaXNTdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5ib2R5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmhlYWRlcikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiBpc1N0cmluZyhjb25maWcuaWNvbikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgaXNGdW5jdGlvbihjb25maWcub25DbGljaykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4YW1wbGVcbiAqIHV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcbmdsb2JhbC5VSUtpdC5VSVV0aWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJQXJyb3dLZXlOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9VSUFycm93S2V5TmF2aWdhdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUGFnaW5hdGlvbjogKGdsb2JhbC5VSUtpdC5VSVBhZ2luYXRpb24gPSByZXF1aXJlKCcuL1VJUGFnaW5hdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVGV4dHVhbElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVGV4dHVhbElucHV0ID0gcmVxdWlyZSgnLi9VSVRleHR1YWxJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVXRpbHM6IHtcbiAgICAgICAgZXh0cmFjdENoaWxkUHJvcHM6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5leHRyYWN0Q2hpbGRQcm9wcyA9IHJlcXVpcmUoJy4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcycpLmRlZmF1bHQpLFxuICAgICAgICBub3RpZnk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5ub3RpZnkgPSByZXF1aXJlKCcuL1VJVXRpbHMvbm90aWZ5JykuZGVmYXVsdCksXG4gICAgICAgIHRyYW5zZm9ybVByb3BlcnR5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMudHJhbnNmb3JtUHJvcGVydHkgPSByZXF1aXJlKCcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknKS5kZWZhdWx0KSxcbiAgICAgICAgdXVpZDogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnV1aWQgPSByZXF1aXJlKCcuL1VJVXRpbHMvdXVpZCcpLmRlZmF1bHQpLFxuICAgIH0sXG59O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqL1xuXG5pbXBvcnQgZncgZnJvbSAnLi91dGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IHRwIGZyb20gJy4vdXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTElaRUQgPSAndWktdGFibGUtaW5pdGlhbGl6ZWQnO1xuZXhwb3J0IGNvbnN0IEhFQURFUl9DRUxMID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsJztcbmV4cG9ydCBjb25zdCBIRUFERVJfQ0VMTF9IQU5ETEUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5leHBvcnQgY29uc3QgQ0VMTCA9ICd1aS10YWJsZS1jZWxsJztcbmV4cG9ydCBjb25zdCBDRUxMX0VWRU4gPSAndWktdGFibGUtY2VsbC1ldmVuJztcbmV4cG9ydCBjb25zdCBDRUxMX09ERCA9ICd1aS10YWJsZS1jZWxsLW9kZCc7XG5leHBvcnQgY29uc3QgQ0VMTF9JTk5FUiA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcbmV4cG9ydCBjb25zdCBST1cgPSAndWktdGFibGUtcm93JztcbmV4cG9ydCBjb25zdCBST1dfRVZFTiA9ICd1aS10YWJsZS1yb3ctZXZlbic7XG5leHBvcnQgY29uc3QgUk9XX09ERCA9ICd1aS10YWJsZS1yb3ctb2RkJztcbmV4cG9ydCBjb25zdCBST1dfQUNUSVZFID0gJ3VpLXRhYmxlLXJvdy1hY3RpdmUnO1xuZXhwb3J0IGNvbnN0IFJPV19MT0FESU5HID0gJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJztcbmV4cG9ydCBjb25zdCBYX1NDUk9MTF9UUkFDSyA9ICd1aS10YWJsZS14LXNjcm9sbC10cmFjayc7XG5leHBvcnQgY29uc3QgWV9TQ1JPTExfVFJBQ0sgPSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snO1xuXG5jb25zdCBpc09iamVjdCA9ICh0ZXN0KSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGVzdCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8qXG5cbkZPUiBGVVRVUkUgRVlFU1xuXG5TY3JvbGwgcGVyZm9ybWFuY2UgaXMgYSB0cmlja3kgYmVhc3QgLS0gbW9yZXNvIHdoZW4gdHJ5aW5nIHRvIG1haW50YWluIDUwKyBGUFMgYW5kIHB1bXBpbmcgYSBsb3Qgb2YgZGF0YSB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdCBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG5cblRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cblxuX19JbXBvcnRhbnQgTm90ZV9fXG5cbkFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC4gSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG5cblxuT1JERVIgT0YgT1BFUkFUSU9OU1xuXG4xLiByZW5kZXIgb25lIHJvdyBvZiBjZWxsc1xuMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbjMuIHJlbmRlciBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuXG5JZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW4gdHJ5aW5nIHRvIGRpZmYuXG5cbiovXG5cbmZ1bmN0aW9uIGFwcGx5RGVsdGEoZGVsdGEsIG51bSkge1xuICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgcmV0dXJuIG51bSA8IDAgPyBudW0gLSBkZWx0YSA6IG51bSArIGRlbHRhO1xuICAgIH1cblxuICAgIHJldHVybiBudW0gLSBkZWx0YTtcbn1cblxuZnVuY3Rpb24gZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgMTkyOlxuICAgICAgICByZXR1cm4gJ0VzY2FwZSc7XG5cbiAgICBjYXNlIDQwOlxuICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICBjYXNlIDM4OlxuICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgY2FzZSAxMzpcbiAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZTNkKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn0gLy8geiBpcyBuZXZlciB1c2VkXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgRE9NIGNlbGwuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgY29udGVudFxuICogQHBhcmFtICB7c3RyaW5nfSAgbWFwcGluZ1xuICogQHBhcmFtICB7bnVtYmVyfSAgd2lkdGhcbiAqIEBwYXJhbSAge251bWJlcn0gIGluZGV4XG4gKlxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY2VsbC5jbGFzc05hbWUgPSBDRUxMO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChpbmRleCAlIDIgPT09IDAgPyBDRUxMX0VWRU4gOiBDRUxMX09ERCk7XG5cbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IENFTExfSU5ORVI7XG5cbiAgICBjb25zdCB0ZXh0X25vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHRfbm9kZSk7XG5cbiAgICBjZWxsLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIGNlbGw7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBzaW1wbGUgb2JqZWN0IERPTSBzcGVjIGludG8gZXF1aXZhbGVudCBET00gbm9kZShzKS5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgIG9wdGlvbnMudGFnXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgIG9wdGlvbnMuYXR0cmlidXRlcyAgIC0gSFRNTCBhdHRyaWJ1dGVzIHRoYXQgbXVzdCBiZSBzZXQgdmlhIGBzZXRBdHRyaWJ1dGUoKWAsIGUuZy4gYGRhdGEtKmBcbiAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbiAgICAgLSBzaG91bGQgYmUgYSBzdHJpbmcsIERPTSBzcGVjLCBvciBhcnJheSBvZiBET00gc3BlY3M7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsIG90aGVyIGlucHV0IHdpbGwgYmUgc3RyaW5naWZpZWRcbiAqIEBwYXJhbSAge29iamVjdH0gICAgICAgb3B0aW9ucy5wcm9wZXJ0aWVzICAgLSBwcm9wZXJ0aWVzIHRvIGJlIGV4cGxpY2l0bHkgc2V0LCBlLmcuIGBjbGFzc05hbWVgXG4gKlxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIHNwZWNUb0RPTSh7dGFnID0gJ2RpdicsIGF0dHJpYnV0ZXMgPSB7fSwgY2hpbGRyZW4sIC4uLnByb3BlcnRpZXN9KSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGtleSkgPT4gbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pKTtcbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKChrZXkpID0+IChub2RlW2tleV0gPSBwcm9wZXJ0aWVzW2tleV0pKTtcblxuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goc3BlYyA9PiBub2RlLmFwcGVuZENoaWxkKHNwZWNUb0RPTShzcGVjKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzcGVjVG9ET00oY2hpbGRyZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGNoaWxkcmVuKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgaGVhZGVyIGNlbGwgd2l0aCByZXNpemUgaGFuZGxlIGFuZCBvcHRpb25hbCBjaGlsZHJlbiBhcyBkZWZpbmVkIGJ5IHRoZSBvYmplY3QgRE9NIERTTC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBjb2x1bW5cbiAqIEBwYXJhbSAgeyp9ICAgICAgIGNvbHVtbi5jaGlsZHJlbiAgICAtIHNob3VsZCBiZSBhIHN0cmluZywgRE9NIHNwZWMsIG9yIGFycmF5IG9mIERPTSBzcGVjcztcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbCBvdGhlciBpbnB1dCB3aWxsIGJlIHN0cmluZ2lmaWVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBjb2x1bW4ubWFwcGluZ1xuICogQHBhcmFtICB7Ym9vbGVhbn0gY29sdW1uLnJlc2l6YWJsZVxuICogQHBhcmFtICB7c3RyaW5nfSAgY29sdW1uLnRpdGxlXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICB3aWR0aFxuICogQHBhcmFtICB7bnVtYmVyfSAgaW5kZXhcbiAqXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9DRUxMKTtcblxuICAgIGlmIChjb2x1bW4uY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgY29sdW1uLmNoaWxkcmVuLmZvckVhY2goc3BlYyA9PiBjZWxsLmFwcGVuZENoaWxkKHNwZWNUb0RPTShzcGVjKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbHVtbi5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoc3BlY1RvRE9NKGNvbHVtbi5jaGlsZHJlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY29sdW1uLmNoaWxkcmVuKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSBIRUFERVJfQ0VMTF9IQU5ETEU7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJDZWxsKG1ldGFkYXRhLCBpbmRleCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01IZWFkZXJDZWxsKG1ldGFkYXRhLCBtZXRhZGF0YS53aWR0aCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgZ2V0VGV4dFRvQmVSZW5kZXJlZDogZnVuY3Rpb24gZ2V0VGV4dFRvQmVSZW5kZXJlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQgfHwgJyc7IC8vIGRvIG5vdCByZW5kZXIgbnVsbC91bmRlZmluZWRcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLmdldFRleHRUb0JlUmVuZGVyZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVXaWR0aDogZnVuY3Rpb24gdHJ1ZVdpZHRoKCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDbGFzc2VzID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugb2ZmIHRoZSBpbm5lciBjbGFzcyB3aGljaCBpcyB3aGF0IGNhdXNlcyB0aGUgc2l6aW5nIGNvbnN0cmFpbnRcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSAnJztcblxuICAgICAgICAgICAgLyogQ2FwdHVyZSB0aGUgbmV3IGFkanVzdGVkIHNpemUsIGhhdmUgdG8gdXNlIHRoZSBoYXJkIHdheSBiZWNhdXNlIC5jbGllbnRXaWR0aCByZXR1cm5zIGFuIGludGVnZXIgdmFsdWUsIHJhdGhlciB0aGFuIHRoZSBfYWN0dWFsXyB3aWR0aC4gU01ILiAqL1xuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFB1dCBldmVyeXRoaW5nIGJhY2tcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9IGNoaWxkQ2xhc3NlcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSBST1c7XG4gICAgICAgICAgcm93LnN0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuXG4gICAgcmV0dXJuIHJvdztcbn1cblxuZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCwgaW5kZXgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1dfQUNUSVZFKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX0FDVElWRSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XX0FDVElWRSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoUk9XX0FDVElWRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX0VWRU4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShST1dfT0REKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChST1dfT0REKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoUk9XX0VWRU4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB2YWwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2FpdGluZ0ZvclJlc29sdXRpb24nOiBmYWxzZSxcbiAgICAgICAgZ2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKCkgeyByZXR1cm4gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb247IH0sXG4gICAgICAgIHNldCB3YWl0aW5nRm9yUmVzb2x1dGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XX0xPQURJTkcpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChST1dfTE9BRElORyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XX0xPQURJTkcpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19MT0FESU5HKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfZGF0YSc6IG51bGwsXG4gICAgICAgIGdldCBkYXRhKCkgeyByZXR1cm4gdGhpcy5fZGF0YTsgfSxcbiAgICAgICAgc2V0IGRhdGEodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBudWxsIHx8IHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCByZXNvbHZlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc29sdmVkVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLl9kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbdGhpcy5faXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHRvIGhhdmUgdGhlIGNsYXNzZXMgYWRkZWQgYXV0b21hdGljYWxseVxuICAgIHJvd09iai5zZXRJbmRleCA9IG1ldGFkYXRhLnNldEluZGV4O1xuICAgIHJvd09iai5hY3RpdmUgPSBtZXRhZGF0YS5hY3RpdmU7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICByZXR1cm4gICAgdHlwZW9mIGNvbHVtbi5tYXBwaW5nID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICYmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY29sdW1uLndpZHRoID09PSAnbnVtYmVyJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjKSB7XG4gICAgaWYgKCEoYy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGMuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBoZWFkZXJgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoYy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoY1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCAgIEFycmF5LmlzQXJyYXkoYy5jb2x1bW5zKSA9PT0gZmFsc2VcbiAgICAgICAgfHwgYy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICB8fCBjLmNvbHVtbnMuZXZlcnkodmFsaWRhdGVDb2x1bW5TaGFwZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBUYWJsZSB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgIG1hcHBpbmc6IHN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyIChvcHRpb25hbCksXG4gICAgICAgIH1gKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5oZWFkZXJDb2x1bW5DbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5oZWFkZXJDb2x1bW5DbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlckNvbHVtbkNsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjLnJvd0NsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLnJvd0NsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcm93Q2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGMuY2VsbENsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNlbGxDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5jb2x1bW5SZXNpemVGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGMuY29sdW1uUmVzaXplRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY29sdW1uUmVzaXplRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHByZXNlcnZlU2Nyb2xsU3RhdGVgOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUge1xuICAgIF9wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgdGhpcy5jID0gey4uLmNvbmZpZ307XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZTtcbiAgICAgICAgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgPSB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCB8fCAzMDA7XG4gICAgICAgIHRoaXMuYy50b3RhbFJvd3MgPSB0aGlzLmMudG90YWxSb3dzIHx8IDA7XG5cbiAgICAgICAgdmFsaWRhdGVDb25maWd1cmF0aW9uKHRoaXMuYyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5jLmJvZHk7XG4gICAgICAgIHRoaXMuYm9keV9zdHlsZSA9IHRoaXMuYm9keS5zdHlsZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZSA9IHRoaXMuaGVhZGVyLnN0eWxlO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3dJbmRleCgpO1xuXG4gICAgICAgIC8qIHVzZWQgaW4gc2Nyb2xsIHN0YXRlIHByZXNlcnZhdGlvbiBjYWxjdWxhdGlvbnMgKi9cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuXG4gICAgICAgICAgICB0aGlzLmNvcHlfbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgICAgICB0aGlzLmNvcHlfbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB0aGlzLmNvcHlfbm9kZS5zdHlsZS5jbGlwID0gJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KSc7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuY29weV9ub2RlKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvcHlpbmcgcm93cyBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5faGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVIZWFkZXJDbGljayk7XG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5faGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgfVxuXG4gICAgX3Jlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5jWyd5LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9ICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5jWyd4LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnQgPSAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQWxsKCk7XG4gICAgfVxuXG4gICAgX2VtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLl9lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB0aGlzLmNvbHVtbnMucHVzaChjcmVhdGVIZWFkZXJDZWxsKGNvbHVtbiwgaW5kZXgpKSk7XG4gICAgfVxuXG4gICAgX2NvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29sdW1uLm5vZGUpO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gY3NbJ21heC13aWR0aCddO1xuICAgICAgICAgICAgY29uc3QgbWluID0gY3NbJ21pbi13aWR0aCddO1xuXG4gICAgICAgICAgICBjb2x1bW4ubWluV2lkdGggPSBtaW4gPT09ICdub25lJyA/IE51bWJlci5NSU5fVkFMVUUgOiBwYXJzZUludChtaW4sIDEwKTtcbiAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IG1heCA9PT0gJ25vbmUnID8gTnVtYmVyLk1BWF9WQUxVRSA6IHBhcnNlSW50KG1heCwgMTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLl9jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgX2VtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9pbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5fZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMucm93X3N0YXJ0X2luZGV4LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKDApO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgX2luamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLmkgPSAxOyB0aGlzLmkgPCB0aGlzLm5fcm93c19yZW5kZXJlZDsgdGhpcy5pICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBfYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgd2lkdGgpIHtcbiAgICAgICAgdGhpcy5jLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7ICAgIC8vIHRoZSBwcm92aWRlZCBjb25maWcgb2JqZWN0c1xuICAgICAgICB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7ICAgICAgLy8gdGhlIGNvbHVtbiBub2Rlc1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLm9uQ29sdW1uUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLmMub25Db2x1bW5SZXNpemUodGhpcy5jb2x1bW5zW2luZGV4XS5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ29sdW1uV2lkdGhzKCkge1xuICAgICAgICBsZXQgdG90YWxXaWR0aCA9IDA7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCguLi50aGlzLnJvd3MubWFwKChyb3cpID0+IHJvdy5jZWxsc1tpbmRleF0ubm9kZS5jbGllbnRXaWR0aCArIDEgfHwgY29sdW1uLm1pbldpZHRoKSksXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3RhbFdpZHRoICs9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSB0cnkgdG8gZmlsbCB0aGUgYXZhaWxhYmxlIHNwYWNlXG4gICAgICAgIGlmICh0b3RhbFdpZHRoIDwgdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuY29udGFpbmVyX3cgLSB0b3RhbFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZGlmZlJlbWFpbmRlciA9IGRpZmYgJSB0aGlzLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgcHhUb0FkZCA9IChkaWZmIC0gZGlmZlJlbWFpbmRlcikgLyB0aGlzLmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICBjb2x1bW4ud2lkdGggKz0gcHhUb0FkZDtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4ud2lkdGggKz0gZGlmZlJlbWFpbmRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FwcGx5Q29sdW1uV2lkdGhzKCk7XG4gICAgfVxuXG4gICAgX2FwcGx5Q29sdW1uV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5jZWxsX2ggPSB0aGlzLnJvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5yb3dfdyA9IHRoaXMucm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy54X21heCA9IHRoaXMuY29udGFpbmVyX3cgPD0gdGhpcy5yb3dfdyA/IHRoaXMuY29udGFpbmVyX3cgLSB0aGlzLnJvd193IDogMDtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLyB0aGlzLnJvd193ICogdGhpcy54X3Njcm9sbF90cmFja193O1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy54X3Njcm9sbF90cmFja193O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gICB0aGlzLm5fcm93c192aXNpYmxlID09PSB0aGlzLm5fcm93c19yZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNvbnRhaW5lcl9oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY29udGFpbmVyX2ggKiAodGhpcy5uX3Jvd3NfdmlzaWJsZSAvIHRoaXMuYy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuX2NhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZS5oZWlnaHQgPSB0aGlzLl9jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcblxuICAgICAgICAvKiB0b3RhbCB0cmFuc2xhdGFibGUgc3BhY2UgLyBzY3JvbGxiYXIgdHJhY2sgc2l6ZSA9IHJlbGF0aXZlIHZhbHVlIG9mIGEgc2Nyb2xsYmFyIHBpeGVsICovXG4gICAgICAgIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyA9IE1hdGguYWJzKHRoaXMueF9tYXgpIC8gKHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUpO1xuXG4gICAgICAgIC8qIGhvdyBtYW55IHNjcm9sbGJhciBwaXhlbHMgPT09IG9uZSByb3c/ICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8gPSAodGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSkgLyAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMubl9yb3dzX3Zpc2libGUpO1xuXG4gICAgICAgIC8qIGhpZGUgdGhlIHNjcm9sbGJhcnMgaWYgdGhleSBhcmUgbm90IG5lZWRlZCAqL1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyX2ggPSB0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl93ID0gdGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLmJvZHlfaCA9IHRoaXMuYy5ib2R5LmNsaWVudEhlaWdodCB8fCAxMTA7XG4gICAgfVxuXG4gICAgX2hhbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggIT09IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZF93aWR0aCA9IHRoaXMuY29udGFpbmVyX3c7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnggLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gKiAtMTtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIC8vIGdldHRpbmcgbGFyZ2VyIGFuZCB3ZSdyZSBmdWxseSBzY3JvbGxlZCB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGlmIChvbGRfd2lkdGggPCB0aGlzLmNvbnRhaW5lcl93ICYmIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuY29udGFpbmVyX3cgLSBvbGRfd2lkdGg7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVIZWFkZXIodGhpcy54KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVCb2R5KHRoaXMueCwgdGhpcy5sYXN0X2JvZHlfeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlSGVhZGVyKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9oZWFkZXJfeCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoeCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0geDtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZVhTY3JvbGxIYW5kbGUoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh5KSB7XG4gICAgICAgIGlmICh5ICE9PSB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVBbGwobmV4dFgsIG5leHRZKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZUhlYWRlcihuZXh0WCk7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZUJvZHkobmV4dFgsIG5leHRZKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgIH1cblxuICAgIF9zY3JvbGxVcCgpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggMCkgd2UgdHJ1bmNhdGUgdXB3YXJkIHNjcm9sbCBhdHRlbXB0c1xuICAgICAgICAgICB0byB0aGUgdXBwZXIgdHJhbnNsYXRpb24gYm91bmRhcnkgdG8ga2VlcCBmcm9tIHNraXBwaW5nIG9mZiBpbnRvIG5vdGhpbmduZXNzICovXG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwICYmIHRoaXMubmV4dF95ID4gdGhpcy55X21pbikge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWluO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgfHwgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21pbikgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgYm90dG9tIHBvc2l0aW9uIHRvIHRoZSB0b3BcbiAgICAgICAgICAgKGFib3ZlIHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9taW4pIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICAvKiBwcmV2ZW50IHVuZGVyLXJvdGF0aW5nIGJlbG93IGluZGV4IHplcm8sIHRoZSBsb2dpY2FsIHN0YXJ0IG9mIGEgZGF0YSBzZXQgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSAtPSBNYXRoLmFicyh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0KSAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLnJvd19zdGFydF9pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBkZWNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuXG4gICAgICAgICAgICAgICAgLyogYWNjb21vZGF0ZSBmb3IgdGhlIG51bWJlciBvZiBwaXhlbHMgdGhhdCB3aWxsIG5vdCBiZSByZW5kZXJlZCAqL1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMuc2hpZnRfZGVsdGEgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleF1cbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVswXV0ueSAtIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnVuc2hpZnQodGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wb3AoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuXG4gICAgICAgICAgICB0aGlzLnlfbWluICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLnlfbWF4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2Nyb2xsRG93bigpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgZW5kIG9mIHRoZSB0YWJsZSAocm93IGluZGV4IG4pIHdlIHRydW5jYXRlIGFueSBzY3JvbGwgYXR0ZW1wdHMgICovXG4gICAgICAgIGlmICh0aGlzLnJvd19lbmRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cyAtIDEgJiYgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWF4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+PSB0aGlzLnlfbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIHRvcCBwb3NpdGlvbiB0byB0aGUgYm90dG9tXG4gICAgICAgICAgIChiZWxvdyB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21heCkgLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ICsgdGhpcy5yb3dfZW5kX2luZGV4ICsgMSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IChcbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCAtICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gKHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID09PSAwID8gMCA6IDEpKVxuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgYXBwbHlEZWx0YSh0aGlzLnlfbWF4LCB0aGlzLnkpICUgdGhpcy5jZWxsX2gsIHRoaXMubmV4dF95XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGluY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19lbmRfaW5kZXggKyB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgLyogdGhlIHBhZGRpbmcgcm93cyB3aWxsIGV4Y2VlZCB0aGUgbWF4aW11bSBpbmRleCBmb3IgYSBkYXRhIHNldCBvbmNlIHRoZSB1c2VyIGhhcyBmdWxseSB0cmFuc2xhdGVkIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbiAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggLSAxXV0ueSArIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgodGFyZ2V0WSA9IHRoaXMubmV4dF95KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NbXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W1xuICAgICAgICAgICAgICAgIE1hdGguY2VpbChNYXRoLmFicyhcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlEZWx0YSh0aGlzLnlfbWluLCB0YXJnZXRZKSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXS5zZXRJbmRleDtcbiAgICB9XG5cbiAgICBfaGFuZGxlTW92ZUludGVudCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVggPT09IDAgICAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kZWx0YV94ID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuZGVsdGFfeSA9ICAgZXZlbnQuZGVsdGFNb2RlID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LmRlbHRhWTtcblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueCA6IHRoaXMueCAtIHRoaXMuZGVsdGFfeDtcbiAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueSA6IHRoaXMueSAtIHRoaXMuZGVsdGFfeTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X3ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3ggPCB0aGlzLnhfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueF9tYXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBuZWdhdGUgdGhlIHZlcnRpY2FsIG1vdmVtZW50LCBub3QgZW5vdWdoIHJvd3MgdG8gZmlsbCB0aGUgYm9keSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPCB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2V0X3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZXNldF90aW1lcik7IH1cblxuICAgICAgICAvKiByZXNldCByb3cgJiB3cmFwcGVyIFkgdmFsdWVzIHRvd2FyZCAwIHRvIHByZXZlbnQgb3ZlcmZsb3dpbmcgKi9cbiAgICAgICAgdGhpcy5yZXNldF90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uIHJlc2V0WUF4aXMoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfZGVsdGEgPSBpbnN0YW5jZS55X21pbjtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSBwb3NpdGlvbmluZyB2YXJpYWJsZXMgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnkgPSBhcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55KTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWluID0gYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9taW4pO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9tYXggPSBhcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21heCk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcm93cyAqL1xuICAgICAgICAgICAgaW5zdGFuY2Uucm93c19vcmRlcmVkX2J5X3kuZm9yRWFjaCgocG9zaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uucm93c1twb3NpdGlvbl0ueSA9IGluZGV4ICogaW5zdGFuY2UuY2VsbF9oO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IHRoZSB3cmFwcGVyICovXG4gICAgICAgICAgICBpbnN0YW5jZS5fdHJhbnNsYXRlQm9keShpbnN0YW5jZS54LCBpbnN0YW5jZS55KTtcblxuICAgICAgICB9LCAxMDAsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5fY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlcyB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIF9oYW5kbGVNb3ZlSW50ZW50IGludm9jYXRpb25zIGJlZm9yZSB0aGlzIHJBRiBldmVudHVhbGx5IGV4ZWN1dGVzLiAqL1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIHJBRihuZXh0WCwgY3VyclgsIG5leHRZLCB2aXNpYmxlVG9wUm93SW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChuZXh0WCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKz0gKChuZXh0WCAtIGN1cnJYKSAvIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbykgKiAtMTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB2aXNpYmxlVG9wUm93SW5kZXggKiB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvO1xuXG4gICAgICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhbGwgdHJhbnNmb3JtcyBncm91cGVkIHRvZ2V0aGVyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVBbGwobmV4dFgsIG5leHRZKTtcblxuICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5uZXh0X3gsIHRoaXMueCwgdGhpcy5uZXh0X3ksIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4KSk7XG5cbiAgICAgICAgdGhpcy54ID0gdGhpcy5uZXh0X3g7XG4gICAgICAgIHRoaXMueSA9IHRoaXMubmV4dF95O1xuICAgIH1cblxuICAgIF9oYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBfaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBfaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gWF9TQ1JPTExfVFJBQ0spIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94LCBldmVudC5wYWdlWCAtIHRoaXMuZGlzdGFuY2VfZnJvbV9sZWZ0XG4gICAgICAgICAgICApICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICB9XG5cbiAgICBfaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gWV9TQ1JPTExfVFJBQ0spIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LCBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3BcbiAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZURyYWdNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ190aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuZHJhZ190aW1lcik7IH1cblxuICAgICAgICAgICAgLyogeC1heGlzIGRvZXNuJ3QgbmVlZCB0aHJvdHRsZSBwcm90ZWN0aW9uIHNpbmNlIGl0IGRvZXNuJ3QgY2F1c2UgYSByb3cgZmV0Y2ggKi9cbiAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLyogTm93IGZldGNoLCBvbmNlIGRyYWcgaGFzIGNlYXNlZCBmb3IgbG9uZyBlbm91Z2guICovXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0YSA9IHRoaXMuYy5nZXRSb3cocm93LnNldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICBhcHBseURlbHRhKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCAtIHRoaXMueV9zY3JvbGxfb2Zmc2V0XG4gICAgICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X3BhZ2VYKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbztcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfY29sdW1uX3gpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91bmxvY2tEcmFnVG9TY3JvbGwoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3ByZXZlbnRDbGlja1doaWxlRHJhZ2dpbmcsIHRydWUpO1xuICAgIH1cblxuICAgIF9oYW5kbGVEcmFnRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLl91bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgX3ByZXZlbnRDbGlja1doaWxlRHJhZ2dpbmcgPSAoZXZlbnQpID0+IGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG5cbiAgICBfaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gSEVBREVSX0NFTExfSEFORExFKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmdyh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fcHJldmVudENsaWNrV2hpbGVEcmFnZ2luZywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuXG4gICAgICAgIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwICYmIHRoaXMucm93X3cgKyB0aGlzLnggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IGFkanVzdGVkX2RlbHRhO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZ3KHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIF9jaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgodGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA8IDAgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPiAwICYmIHRoaXMuYWN0aXZlX3JvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKiBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd24gaW4gdGhlIHZpZXdwb3J0LiAqL1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICggICAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID4gdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IDwgdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2NoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIF9oYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCBnZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEgLy8gYWxyZWFkeSBrZXlpbmcgdGhyb3VnaCB0aGUgdGFibGVcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5hY3RpdmVfcm93ID09PSAtMSAmJiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCkgLy8gYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB0aGUgYWN0aXZlIHJvdyBvbiB0aGUgdG9wbW9zdCByb3cgaW4gdGhlIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VBY3RpdmVSb3codGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcGFkZGluZ19yb3dzICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgaWYgKChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpICYmIHRoaXMuYWN0aXZlX3JvdyA+PSAwICYmIHRoaXMuY29weV9ub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlX3JvdyA9IGZ3KHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgID0gICB0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiBgXCIke2NvbHVtbi50aXRsZS5yZXBsYWNlKCdcIicsICdcXFxcXCInKX1cImApLmpvaW4oJywnKVxuICAgICAgICAgICAgICAgICAgICAgICsgJ1xcbidcbiAgICAgICAgICAgICAgICAgICAgICArIGFjdGl2ZV9yb3cuY2VsbHMubWFwKGNlbGwgPT4gYFwiJHtjZWxsLm5vZGUudGV4dENvbnRlbnQucmVwbGFjZSgnXCInLCAnXFxcXFwiJyl9XCJgKS5qb2luKCcsJylcbiAgICAgICAgICAgICAgICAgICAgICArICdcXG4nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5X25vZGUuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKENFTEwpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XKSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIF9oYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLl9kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmdyh0aGlzLnJvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsICYmIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5yb3dDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZUhlYWRlckNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmMuaGVhZGVyQ29sdW1uQ2xpY2tGdW5jKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBtYXBwaW5nO1xuXG4gICAgICAgICAgICB3aGlsZSAoIW1hcHBpbmcgJiYgbm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICghbm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWFwcGluZyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFwcGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5oZWFkZXJDb2x1bW5DbGlja0Z1bmMoZXZlbnQsIG1hcHBpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIEFQSXNcblxuICAgIGdldEFjdGl2ZVJvd0luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVfcm93ID4gLTEgPyB0aGlzLmFjdGl2ZV9yb3cgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93SW5kZXgoc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRBY3RpdmVSb3dJbmRleCgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFhBbW91bnRTY3JvbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcbiAgICB9XG5cbiAgICBnZXRZQW1vdW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuXG4gICAganVtcFRvUm93SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55ID0gMDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IGluZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZVJvd0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5fcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTsgfVxuXG4gICAgICAgIC8vIGFsbG93cyBmb3IgdHJ1ZSBzaXplcyB0byBiZSBjYWxjdWxhdGVkOyBwb3N0LWluaXRpYWxpemF0aW9uLCB0aGUgZmxleGJveCBhdXRvLWdyb3cgYWxnb3JpdGhtIHRha2VzIG92ZXJcbiAgICAgICAgLy8gYW5kIHdpbGwgZGl2dnkgdXAgcmVtYWluaW5nIHNwYWNlIGFtb25nc3QgdGhlIGNoaWxkcmVuLi4uIHByZWNhbGN1bGF0aW5nIHRoZSB0cnVlIHNpemUgbWVhbnMgbGFyZ2VyIGNvbHVtbnNcbiAgICAgICAgLy8gd2lsbCBub3QgYmUgcHJlbWF0dXJlbHkgdHJ1bmNhdGVkXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoSU5JVElBTElaRUQpO1xuXG4gICAgICAgIC8qIHN0b3JlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgdW5pb24gZm9yIGlmIHdlIG5lZWQgdG8gcmVoeWRyYXRlIHRoZSBwcmV2aW91cyBzY3JvbGwgc3RhdGUgKi9cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuX195ID0gdGhpcy55O1xuICAgICAgICB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgdGhpcy5fcmVzZXRJbnRlcm5hbHMoKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3dJbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuX2J1aWxkQ29sdW1ucygpO1xuXG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPyB0aGlzLl9fcm93X3N0YXJ0X2luZGV4IHx8IDAgOiAwO1xuXG4gICAgICAgIHRoaXMuX2luamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IE1hdGguY2VpbCh0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3JlbmRlcmVkID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSB0aGlzLmMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IE1hdGguZmxvb3IodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcm93c19yZW5kZXJlZCAtIDE7XG5cbiAgICAgICAgdGhpcy5faW5qZWN0UmVzdE9mUm93cygpO1xuICAgICAgICB0aGlzLl9pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVDb2x1bW5XaWR0aHMoKTtcblxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgJiYgdGhpcy5fX3ggIT09IG51bGwgJiYgdGhpcy5fX3kgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8qIHRoZSBjYWNoZWQgdmFsdWVzIGFyZSB0aGVuIGFwcGxpZWQgYWdhaW5zdCB0aGUgdGFibGUgdG8gYXJyaXZlIGF0IHRoZSBwcmV2aW91cyBzdGF0ZSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IC10aGlzLl9feCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6IC10aGlzLl9feSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgYWxsIHRoZSBzZXR1cCBpcyBjb21wbGV0ZSwgYXBwbHkgdGhlIGZsZXggYWxnb3JpdGhtIHRvIGV4cGFuZCBzbWFsbGVyIGNlbGxzIGlmIHRoZXJlXG4gICAgICAgIC8vIGlzIGV4dHJhIHJvb21cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuY2xhc3NMaXN0LmFkZChJTklUSUFMSVpFRCk7XG5cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5faGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVIZWFkZXJDbGljayk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5faGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG5cbiAgICAgICAgdGhpcy5fZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5fZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWNcbiAqIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBvc3NpYmlsaXRpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHBvc3NpYmlsaXRpZXNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2UsXG4gICAgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5kaWZmZXJlbmNlYCB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBleGNsdWRpbmcgbXVsdGlwbGUgYXJyYXlzIG9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZURpZmZlcmVuY2UoYXJyYXksIHZhbHVlcywgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHZhbHVlc0xlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG5cbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChpdGVyYXRlZSkge1xuICAgIHZhbHVlcyA9IGFycmF5TWFwKHZhbHVlcywgYmFzZVVuYXJ5KGl0ZXJhdGVlKSk7XG4gIH1cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH1cbiAgZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIHZhbHVlcyA9IG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHZhbHVlc0luZGV4ID0gdmFsdWVzTGVuZ3RoO1xuICAgICAgd2hpbGUgKHZhbHVlc0luZGV4LS0pIHtcbiAgICAgICAgaWYgKHZhbHVlc1t2YWx1ZXNJbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHZhbHVlcywgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBzdXBwb3J0IGZvciByZXN0cmljdGluZyBmbGF0dGVuaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmVkaWNhdGU9aXNGbGF0dGVuYWJsZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCB0byB2YWx1ZXMgdGhhdCBwYXNzIGBwcmVkaWNhdGVgIGNoZWNrcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgcmVzdWx0IHx8IChyZXN1bHQgPSBbXSk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKGRlcHRoID4gMCAmJiBwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBpZiAoZGVwdGggPiAxKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGJhc2VGbGF0dGVuKHZhbHVlLCBkZXB0aCAtIDEsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5waWNrYCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIHByb3BlcnR5IGlkZW50aWZpZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGljayhvYmplY3QsIHByb3BzKSB7XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYmFzZVBpY2tCeShvYmplY3QsIHByb3BzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIGtleSBpbiBvYmplY3Q7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mICBgXy5waWNrQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2tCeShvYmplY3QsIHByb3BzLCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXkpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNJbiwgZ2V0U3ltYm9sc0luKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gbmF0aXZlR2V0U3ltYm9scyA/IG92ZXJBcmcobmF0aXZlR2V0U3ltYm9scywgT2JqZWN0KSA6IHN0dWJBcnJheTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzXG4gKiBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9sc0luID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB3aGlsZSAob2JqZWN0KSB7XG4gICAgYXJyYXlQdXNoKHJlc3VsdCwgZ2V0U3ltYm9scyhvYmplY3QpKTtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGUob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZsYXR0ZW5hYmxlIGBhcmd1bWVudHNgIG9iamVjdCBvciBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmbGF0dGVuYWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0ZsYXR0ZW5hYmxlKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkgfHxcbiAgICAhIShzcHJlYWRhYmxlU3ltYm9sICYmIHZhbHVlICYmIHZhbHVlW3NwcmVhZGFibGVTeW1ib2xdKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5waWNrYDsgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlXG4gKiBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgIHRoYXQgYXJlXG4gKiBub3Qgb21pdHRlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3Byb3BzXSBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gb21pdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ub21pdChvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYic6ICcyJyB9XG4gKi9cbnZhciBvbWl0ID0gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwcm9wcykge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcHJvcHMgPSBhcnJheU1hcChiYXNlRmxhdHRlbihwcm9wcywgMSksIHRvS2V5KTtcbiAgcmV0dXJuIGJhc2VQaWNrKG9iamVjdCwgYmFzZURpZmZlcmVuY2UoZ2V0QWxsS2V5c0luKG9iamVjdCksIHByb3BzKSk7XG59KTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbWl0O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIG9mIGBwcm9wc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBhcnJheU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPyBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlcztcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLmRpZmZlcmVuY2VgIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGV4Y2x1ZGluZyBtdWx0aXBsZSBhcnJheXMgb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlRGlmZmVyZW5jZShhcnJheSwgdmFsdWVzLCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgdmFsdWVzTGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcblxuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgdmFsdWVzID0gYXJyYXlNYXAodmFsdWVzLCBiYXNlVW5hcnkoaXRlcmF0ZWUpKTtcbiAgfVxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgfVxuICBlbHNlIGlmICh2YWx1ZXMubGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgdmFsdWVzID0gbmV3IFNldENhY2hlKHZhbHVlcyk7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdmFsdWVzSW5kZXggPSB2YWx1ZXNMZW5ndGg7XG4gICAgICB3aGlsZSAodmFsdWVzSW5kZXgtLSkge1xuICAgICAgICBpZiAodmFsdWVzW3ZhbHVlc0luZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXModmFsdWVzLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBleGNsdWRpbmcgYWxsIGdpdmVuIHZhbHVlcyB1c2luZ1xuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLnB1bGxgLCB0aGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0gey4uLip9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqIEBzZWUgXy5kaWZmZXJlbmNlLCBfLnhvclxuICogQGV4YW1wbGVcbiAqXG4gKiBfLndpdGhvdXQoWzIsIDEsIDIsIDNdLCAxLCAyKTtcbiAqIC8vID0+IFszXVxuICovXG52YXIgd2l0aG91dCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFycmF5LCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KGFycmF5KVxuICAgID8gYmFzZURpZmZlcmVuY2UoYXJyYXksIHZhbHVlcylcbiAgICA6IFtdO1xufSk7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2l0aG91dDtcbiJdfQ==
