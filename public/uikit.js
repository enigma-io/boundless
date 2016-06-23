(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIArrowKeyNavigation = function (_UIView) {
    _inherits(UIArrowKeyNavigation, _UIView);

    function UIArrowKeyNavigation() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
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

        if (typeof child !== 'string' && typeof child.props.onBlur === 'function') {
            event.persist();
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (typeof child !== 'string' && typeof child.props.onFocus === 'function') {
            event.persist();
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
        return _react2.default.createElement(this.props.component, _extends({}, this.props, {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_UIView3.default);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIButton = function (_UIView) {
    _inherits(UIButton, _UIView);

    function UIButton() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.handleClick = function (event) {
            _this.toggleState(event);

            if (typeof _this.props.onClick === 'function') {
                event.persist();
                _this.props.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    _this.toggleState(event);
            }

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIButton.prototype.toggleState = function toggleState(event) {
        event.persist();
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    };

    UIButton.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'button',
            _extends({}, this.props, {
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
}(_UIView3.default);

UIButton.propTypes = {
    children: _react2.default.PropTypes.node,
    onClick: _react2.default.PropTypes.func,
    onPressed: _react2.default.PropTypes.func,
    onUnpressed: _react2.default.PropTypes.func,
    pressed: _react2.default.PropTypes.bool
};
UIButton.defaultProps = {
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};
exports.default = UIButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related checkboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UICheckboxGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UICheckboxGroup = function (_UIView) {
    _inherits(UICheckboxGroup, _UIView);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UICheckboxGroup.prototype.allItemsChecked = function allItemsChecked() {
        return this.props.items.every(function (item) {
            return item.checked === true;
        });
    };

    UICheckboxGroup.prototype.anyItemsChecked = function anyItemsChecked() {
        return this.props.items.some(function (item) {
            return item.checked === true;
        });
    };

    UICheckboxGroup.prototype.renderSelectAll = function renderSelectAll() {
        if (this.props.selectAll) {
            var _cx;

            var allChecked = this.allItemsChecked();

            return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                ref: 'select_all',
                name: this.props.selectAllProps.name || 'cb_select_all',
                key: 'cb_select_all',
                checked: allChecked,
                className: (0, _classnames2.default)((_cx = {
                    'ui-checkbox-group-selectall': true
                }, _cx[this.props.selectAllProps.className] = !!this.props.selectAllProps.className, _cx)),
                indeterminate: !allChecked && this.anyItemsChecked(),
                label: this.props.selectAllLabel,
                onChecked: this.props.onAllChecked,
                onUnchecked: this.props.onAllUnchecked }));
        }
    };

    UICheckboxGroup.prototype.renderCheckboxes = function renderCheckboxes() {
        var _this2 = this;

        return this.props.items.map(function (item) {
            return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                key: item.name,
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
            _extends({}, this.props, {
                ref: 'group',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-checkbox-group': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)) }),
            this.renderChildren()
        );
    };

    return UICheckboxGroup;
}(_UIView3.default);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};
UICheckboxGroup.propTypes = {
    items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        checked: _react2.default.PropTypes.bool.isRequired,
        label: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string.isRequired,
        value: _react2.default.PropTypes.string
    })).isRequired,
    onAllChecked: _react2.default.PropTypes.func,
    onAllUnchecked: _react2.default.PropTypes.func,
    onChildChecked: _react2.default.PropTypes.func,
    onChildUnchecked: _react2.default.PropTypes.func,
    selectAll: _react2.default.PropTypes.bool,
    selectAllProps: _react2.default.PropTypes.object,
    selectAllLabel: _react2.default.PropTypes.string,
    selectAllPosition: _react2.default.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};
UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _noop2.default,
    onAllUnchecked: _noop2.default,
    onChildChecked: _noop2.default,
    onChildUnchecked: _noop2.default,
    selectAllProps: {},
    selectAllLabel: 'Select All',
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};
exports.default = UICheckboxGroup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27,"3":3}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIDialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIDialog = function (_UIView) {
    _inherits(UIDialog, _UIView);

    function UIDialog() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            headerUUID: _this.uuid(),
            bodyUUID: _this.uuid()
        }, _this.handleFocus = function (nativeEvent) {
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIDialog.prototype.componentDidMount = function componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.refs.dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        if (!node || node === window) {
            return false;
        }

        return this.refs.dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                ref: 'body',
                id: this.state.bodyUUID,
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
                    ref: 'footer',
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
                    ref: 'header',
                    id: this.state.headerUUID,
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-dialog-header': true
                    }, _cx3[this.props.headerProps.className] = !!this.props.headerProps.className, _cx3)) }),
                this.props.header
            );
        }
    };

    UIDialog.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'dialog',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-dialog': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                onKeyDown: this.handleKeyDown,
                role: 'dialog',
                'aria-labelledby': this.state.headerUUID,
                'aria-describedby': this.state.bodyUUID,
                tabIndex: '0' }),
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()
        );
    };

    return UIDialog;
}(_UIView3.default);

UIDialog.propTypes = {
    bodyProps: _react2.default.PropTypes.object,
    captureFocus: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    closeOnEscKey: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    closeOnOutsideFocus: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func
};
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default
};
exports.default = UIDialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

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

var UIFittedText = function (_UIView) {
    _inherits(UIFittedText, _UIView);

    function UIFittedText() {
        _classCallCheck(this, UIFittedText);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
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
            _extends({}, this.props, {
                className: (0, _classnames2.default)((_cx = {
                    'ui-text': true
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            this.props.children
        );
    };

    return UIFittedText;
}(_UIView3.default);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.propTypes = {
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxFontSize: _react2.default.PropTypes.number
};
exports.default = UIFittedText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"27":27}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An image block with placeholder support for loading and fallback scenarios.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIImage = function (_UIView) {
    _inherits(UIImage, _UIView);

    function UIImage() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
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
            _extends({}, this.props, {
                alt: null,
                src: null,
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-image-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)) }),
            this.renderImage(),
            this.renderStatus()
        );
    };

    return UIImage;
}(_UIView3.default);

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
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};
exports.default = UIImage;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIModal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIModal = function (_UIView) {
    _inherits(UIModal, _UIView);

    function UIModal() {
        _classCallCheck(this, UIModal);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIModal.prototype.render = function render() {
        var _cx, _cx2, _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-modal-wrapper': true
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            _react2.default.createElement('div', _extends({}, this.props.maskProps, {
                ref: 'mask',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-modal-mask': true
                }, _cx2[this.props.maskProps.className] = !!this.props.maskProps.className, _cx2)) })),
            _react2.default.createElement(
                _UIDialog2.default,
                _extends({}, (0, _extractChildProps2.default)(this.props, _UIDialog2.default.propTypes), this.props.modalProps, {
                    ref: 'dialog',
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-modal': true
                    }, _cx3[this.props.modalProps.className] = !!this.props.modalProps.className, _cx3)) }),
                this.props.children
            )
        );
    };

    return UIModal;
}(_UIView3.default);

UIModal.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    maskProps: _react2.default.PropTypes.object,
    modalProps: _react2.default.PropTypes.object
});
UIModal.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    maskProps: {},
    modalProps: {}
});
exports.default = UIModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"25":25,"27":27,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView3 = require(25);

var _UIView4 = _interopRequireDefault(_UIView3);

var _UISegmentedControl = require(14);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A utility view for paging the display of many data items of varying sizes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPagination
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Item = function (_UIView) {
    _inherits(Item, _UIView);

    function Item() {
        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this.__mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Item.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    Item.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.__mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    Item.prototype.componentDidMount = function componentDidMount() {
        this.__mounted = true;
        this.waitForContentIfNecessary();
    };

    Item.prototype.componentWillUnmount = function componentWillUnmount() {
        this.__mounted = false;
    };

    Item.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
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
            return _react2.default.createElement('div', _extends({}, this.props, { className: this.getClasses() }));
        }

        return _react2.default.cloneElement(this.state.data, _extends({}, this.props, {
            className: this.getClasses(this.state.data.props.className),
            'data-index': this.props.index,
            data: null,
            even: null,
            index: null
        }));
    };

    return Item;
}(_UIView4.default);

Item.propTypes = {
    even: _react.PropTypes.bool,
    data: _react.PropTypes.object,
    index: _react.PropTypes.number
};

var UIPagination = function (_UIView2) {
    _inherits(UIPagination, _UIView2);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _UIView2.call.apply(_UIView2, [this].concat(args))), _this2), _this2.state = {
            currentPage: _this2.props.pagerPosition,
            numberOfPages: Math.ceil(_this2.props.totalItems / _this2.props.numItemsPerPage),
            numItemsPerPage: _this2.props.numItemsPerPage,
            numPageToggles: _this2.props.numPageToggles,
            totalItems: _this2.props.totalItems,
            shownItems: [{ data: _this2.props.getItem(0) }]
        }, _this2.currentPage = function () {
            return _this2.state.currentPage;
        }, _this2.handleClick = function (value) {
            var values = UIPagination.controls;
            var pageNumber = void 0;

            switch (value) {
                case values.FIRST:
                    pageNumber = 1;
                    break;
                case values.PREVIOUS:
                    pageNumber = _this2.state.currentPage - 1;
                    break;
                case values.NEXT:
                    pageNumber = _this2.state.currentPage + 1;
                    break;
                case values.LAST:
                    pageNumber = _this2.state.numberOfPages;
                    break;
                default:
                    pageNumber = parseInt(value, 10);
            }

            _this2.setState({
                currentPage: pageNumber,
                shownItems: _this2.generateItems(pageNumber)
            });
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    UIPagination.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPagination.prototype.componentDidMount = function componentDidMount() {
        this.setState({ shownItems: this.generateItems(this.state.currentPage) });
    };

    UIPagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.identifier !== this.props.identifier) {
            this.setState({
                currentPage: 1,
                shownItems: this.generateItems(1, nextProps.getItem)
            });
        }
    };

    UIPagination.prototype.createPageButtonOptions = function createPageButtonOptions() {
        var options = [];
        var numberOfPages = this.state.numberOfPages;
        var currentPage = this.state.currentPage;
        var numPageToggles = this.props.numPageToggles;
        var startPage = currentPage - (currentPage - 1) % numPageToggles;
        var endPage = Math.min(startPage + numPageToggles - 1, numberOfPages);

        if (this.props.showJumpToFirst) {
            options.push({
                selected: false,
                content: this.props.jumpToFirstControlText,
                value: UIPagination.controls.FIRST,
                disabled: this.state.currentPage === 1,
                className: 'ui-pagination-control ui-pagination-control-first'
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlText,
            value: UIPagination.controls.PREVIOUS,
            disabled: this.state.currentPage === 1,
            className: 'ui-pagination-control ui-pagination-control-previous'
        });

        for (var i = startPage; i <= endPage; i++) {
            options.push({
                className: 'ui-pagination-control',
                'data-page-number': i,
                selected: i === this.state.currentPage,
                content: i,
                value: i
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlText,
            value: UIPagination.controls.NEXT,
            disabled: this.state.currentPage === this.state.numberOfPages,
            className: 'ui-pagination-control ui-pagination-control-next'
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlText,
                value: UIPagination.controls.LAST,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-pagination-control ui-pagination-control-last'
            });
        }

        return options;
    };

    UIPagination.prototype.generateItems = function generateItems(currentPage) {
        var getItem = arguments.length <= 1 || arguments[1] === undefined ? this.props.getItem : arguments[1];

        var generatedItems = [];
        var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
        var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({ data: getItem(i) });
        }

        return generatedItems;
    };

    UIPagination.prototype.renderItems = function renderItems() {
        var _cx,
            _this3 = this;

        var props = this.props.listWrapperProps;

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, props, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-pagination-items': true
                }, _cx[props.className] = !!props.className, _cx)) }),
            this.state.shownItems.map(function (item, index) {
                return _react2.default.createElement(Item, {
                    ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    even: index % 2 === 0,
                    index: _this3.state.currentPage - 1 + index });
            })
        );
    };

    UIPagination.prototype.renderControls = function renderControls(position) {
        var _cx2;

        if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
            return;
        }

        var props = this.props.toggleWrapperProps;
        var position_lower = position.toLowerCase();
        var position_capitalized = position_lower[0].toUpperCase() + position_lower.slice(1);

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, props, {
            ref: 'segmentedControl' + position_capitalized,
            className: (0, _classnames2.default)((_cx2 = {
                'ui-pagination-controls': true
            }, _cx2['ui-pagination-controls-' + position_lower] = true, _cx2[props.className] = !!props.className, _cx2)),
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
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_UIView4.default);

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
    getItem: _react.PropTypes.func,
    hidePagerIfNotNeeded: _react.PropTypes.bool,
    identifier: _react.PropTypes.string.isRequired,
    jumpToFirstControlText: _react.PropTypes.string,
    jumpToLastControlText: _react.PropTypes.string,
    listWrapperProps: _react.PropTypes.object,
    nextPageControlText: _react.PropTypes.string,

    numItemsPerPage: function validateNumItemsPerPage(props) {
        if (!Number.isInteger(props.numItemsPerPage)) {
            return new Error('`numItemsPerPage` must be an integer.');
        } else if (props.numItemsPerPage < 1) {
            return new Error('`numItemsPerPage` must be greater than zero.');
        }
    },

    numPageToggles: _react.PropTypes.number,

    pagerPosition: function validatePagerPosition(props) {
        if (!Number.isInteger(props.pagerPosition)) {
            return new Error('`pagerPosition` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.pagerPosition < 1 || props.pagerPosition > numberOfPages) {
            return new Error('`pagerPosition` must be between 1 and ' + numberOfPages + '.');
        }
    },

    position: _react.PropTypes.oneOf(Object.keys(UIPagination.positions)),
    previousPageControlText: _react.PropTypes.string,
    showJumpToFirst: _react.PropTypes.bool,
    showJumpToLast: _react.PropTypes.bool,
    toggleWrapperProps: _react.PropTypes.object,
    totalItems: _react.PropTypes.number.isRequired
};
UIPagination.defaultProps = {
    options: [],
    getItem: _noop2.default,
    hidePagerIfNotNeeded: false,
    jumpToFirstControlText: '« First',
    jumpToLastControlText: 'Last »',
    listWrapperProps: {},
    nextPageControlText: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    pagerPosition: 1,
    position: UIPagination.positions.ABOVE,
    previousPageControlText: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};
exports.default = UIPagination;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"14":14,"21":21,"25":25,"27":27}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _transformProperty = require(24);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking container positioned to a specific anchor element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPopover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/*
    A nuance about this component: since it only renders a simple <div>, the main render() function
    never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
    a full re-render of the child dialog.
 */

var UIPopover = function (_UIView) {
    _inherits(UIPopover, _UIView);

    function UIPopover() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPopover);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            anchorXAlign: _this.props.anchorXAlign,
            anchorYAlign: _this.props.anchorYAlign,
            selfXAlign: _this.props.selfXAlign,
            selfYAlign: _this.props.selfYAlign
        }, _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : _reactDom2.default.findDOMNode(_this.props.anchor);

            var x = _this.getNextXPosition(anchor, _this.node);
            var y = _this.getNextYPosition(anchor, _this.node);

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(_this.node, x, y);

            if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
                return _this.setState(alignmentCorrection, function () {
                    return _this.componentDidUpdate();
                });
            }

            _this.applyTranslation(_this.node, x, y);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        document.body.appendChild(this.container = document.createElement('div'));

        // this is bad, don't do this anywhere else :-x.
        this.refs = {};
        this.refs.dialog = this.renderDialog();
        this.node = _reactDom2.default.findDOMNode(this.refs.dialog);

        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderDialog();
        this.align();
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.container);
        document.body.removeChild(this.container);

        window.removeEventListener('resize', this.align, true);
    };

    UIPopover.prototype.getNextXPosition = function getNextXPosition(anchor, dialog) {
        var state = this.state;
        var position = UIPopover.position;

        var nextX = anchor.getBoundingClientRect().left + document.body.scrollLeft;

        switch (state.anchorXAlign) {
            case position.MIDDLE:
                nextX += anchor.offsetWidth / 2;
                break;

            case position.END:
                nextX += anchor.offsetWidth;
                break;
        }

        switch (state.selfXAlign) {
            case position.MIDDLE:
                nextX -= dialog.clientWidth / 2;
                break;

            case position.END:
                nextX -= dialog.clientWidth;
                break;
        }

        return nextX;
    };

    UIPopover.prototype.getNextYPosition = function getNextYPosition(anchor, dialog) {
        var state = this.state;
        var position = UIPopover.position;
        var anchorY = anchor.getBoundingClientRect().top + document.body.scrollTop;
        var anchorHeight = anchor.offsetHeight;

        var nextY = anchorY + anchorHeight;

        switch (state.anchorYAlign) {
            case position.START:
                nextY = anchorY;
                break;

            case position.MIDDLE:
                nextY = anchorY + anchorHeight / 2;
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

    UIPopover.prototype.getAlignmentCorrectionIfOverflowing = function getAlignmentCorrectionIfOverflowing(node, x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        var corrections = {};

        var width = node.clientWidth;
        var height = node.clientHeight;
        var xMax = document.body.scrollWidth;
        var yMax = document.body.scrollHeight;

        if (x + width > xMax) {
            // overflowing off to the right
            corrections.anchorXAlign = UIPopover.position.START;
            corrections.selfXAlign = UIPopover.position.END;
        } else if (x < 0) {
            // overflowing off to the left
            corrections.anchorXAlign = UIPopover.position.END;
            corrections.selfXAlign = UIPopover.position.START;
        } else if (y + height > yMax) {
            // overflowing below
            corrections.anchorYAlign = UIPopover.position.START;
            corrections.selfYAlign = UIPopover.position.END;
        } else if (y < 0) {
            // overflowing above
            corrections.anchorYAlign = UIPopover.position.END;
            corrections.anchorXAlign = UIPopover.position.MIDDLE;
            corrections.selfYAlign = UIPopover.position.START;
            corrections.selfXAlign = UIPopover.position.MIDDLE;
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
        var _cx;

        var state = this.state;
        var getFrag = this.getClassAlignmentFragment;

        return _reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, this.props, {
            className: (0, _classnames2.default)((_cx = {
                'ui-popover': true
            }, _cx['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx[this.props.className] = !!this.props.className, _cx)),
            style: _extends({}, this.props.style, {
                position: 'absolute',
                top: '0px',
                left: '0px'
            }) })), this.container);
    };

    UIPopover.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIPopover;
}(_UIView3.default);

UIPopover.position = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};
UIPopover.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    anchor: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(HTMLElement), _react2.default.PropTypes.shape({
        props: _react2.default.PropTypes.object,
        state: _react2.default.PropTypes.object
    })]). // a react element of some fashion, React.PropTypes.element wasn't working
    isRequired,
    anchorXAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    anchorYAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    autoReposition: _react2.default.PropTypes.bool,
    selfXAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    selfYAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END])
});
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: false,
    closeOnOutsideClick: true,
    closeOnEscKey: true,
    anchorXAlign: UIPopover.position.START,
    anchorYAlign: UIPopover.position.END,
    autoReposition: true,
    selfXAlign: UIPopover.position.START,
    selfYAlign: UIPopover.position.START
});
exports.default = UIPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"24":24,"25":25,"27":27,"5":5}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

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
            _extends({}, this.props, {
                label: null,
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"25":25,"27":27}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hide content until it's needed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgressiveDisclosure
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgressiveDisclosure = function (_UIView) {
    _inherits(UIProgressiveDisclosure, _UIView);

    function UIProgressiveDisclosure() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if (typeof _this.props.toggleProps.onClick === 'function') {
                event.persist();
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if (typeof _this.props.toggleProps.onKeyDown === 'function') {
                event.persist();
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
            _extends({}, this.props, {
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
}(_UIView3.default);

UIProgressiveDisclosure.propTypes = {
    children: _react2.default.PropTypes.node,
    expanded: _react2.default.PropTypes.bool,
    onExpand: _react2.default.PropTypes.func,
    onHide: _react2.default.PropTypes.func,
    teaser: _react2.default.PropTypes.node,
    teaserExpanded: _react2.default.PropTypes.node,
    toggleProps: _react2.default.PropTypes.object
};
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An accessible radio form control.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIRadio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIRadio = function (_UIView) {
    _inherits(UIRadio, _UIView);

    function UIRadio() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            id: _this.props.inputProps.id || _this.uuid()
        }, _this.handleChange = function (event) {
            if (event.target.checked) {
                _this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if (typeof _this.props.inputProps.onChange === 'function') {
                event.persist();
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIRadio.prototype.renderInput = function renderInput() {
        var _cx;

        return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
            ref: 'input',
            type: 'radio',
            id: this.state.id,
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
                    htmlFor: this.state.id }),
                this.props.label
            );
        }
    };

    UIRadio.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-radio-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderInput(),
            this.renderLabel()
        );
    };

    return UIRadio;
}(_UIView3.default);

UIRadio.propTypes = {
    inputProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string.isRequired,
    onSelected: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.string.isRequired
};
UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: _noop2.default,
    selected: false
};
exports.default = UIRadio;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"27":27}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UISegmentedControl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UISegmentedControl = function (_UIView) {
    _inherits(UISegmentedControl, _UIView);

    function UISegmentedControl() {
        var _temp, _this, _ret;

        _classCallCheck(this, UISegmentedControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
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

        if (typeof option.onBlur === 'function') {
            event.persist();
            option.onBlur(event);
        }
    };

    UISegmentedControl.prototype.handleOptionClick = function handleOptionClick(option, event) {
        this.props.onOptionSelected(option.value);

        if (typeof option.onClick === 'function') {
            event.persist();
            option.onClick(event);
        }
    };

    UISegmentedControl.prototype.handleOptionFocus = function handleOptionFocus(option, event) {
        this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

        if (typeof option.onFocus === 'function') {
            event.persist();
            option.onFocus(event);
        }
    };

    UISegmentedControl.prototype.renderOptions = function renderOptions() {
        var _this2 = this;

        return this.props.options.map(function (definition, index) {
            var _cx;

            return _react2.default.createElement(
                _UIButton2.default,
                _extends({}, definition, {
                    content: null,
                    value: null,
                    selected: null,
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
            _extends({}, this.props, {
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
}(_UIView3.default);

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
UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: _noop2.default
};
exports.default = UISegmentedControl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"21":21,"25":25,"27":27}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _enigmaTable = require(28);

var _enigmaTable2 = _interopRequireDefault(_enigmaTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for Table.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITable = function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
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
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            onColumnResize: this.props.onColumnResize,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows,

            // internal use only, renders the table without any event listeners (minimal computation)
            static_mode: this.props.static
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

    UITable.prototype.onlyColumnWidthChangedAndMatchesTableInternals = function onlyColumnWidthChangedAndMatchesTableInternals(current_columns, prev_columns, table_internal_columns) {
        /* the columns should exactly match in the proper order, or the widths should be the same as the internal column
        representation, meaning the change is a reaction to being alerted by `props.onColumnResize` */
        return current_columns.every(function (column, index) {
            return column === prev_columns[index] || column.mapping === prev_columns[index].mapping && column.width === table_internal_columns[index].width;
        });
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prev_props) {
        var changed_props = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in this.props) {
            if (this.props[key] !== prev_props[key]) {
                changed_props.push(key);
            }
        }

        for (key in prev_props) {
            if (prev_props[key] !== this.props[key] && changed_props.indexOf(key) === -1) {
                changed_props.push(key);
            }
        }

        if (changed_props.length) {
            if (changed_props.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(this.props.jumpToRowIndex);
            }

            if (changed_props.length === 1 && changed_props[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (this.onlyColumnWidthChangedAndMatchesTableInternals(this.props.columns, prev_props.columns, this.table.columns)) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    };

    UITable.prototype.renderXScroll = function renderXScroll() {
        if (!this.props.static) {
            return _react2.default.createElement(
                'div',
                { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
            );
        }
    };

    UITable.prototype.renderYScroll = function renderYScroll() {
        if (!this.props.static) {
            return _react2.default.createElement(
                'div',
                { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
            );
        }
    };

    UITable.prototype.renderAria = function renderAria() {
        if (!this.props.static) {
            return _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' });
        }
    };

    UITable.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
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
}(_UIView3.default);

UITable.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
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
    onRowInteract: _react.PropTypes.func,
    preserveScrollState: _react.PropTypes.bool,
    throttleInterval: _react.PropTypes.number,
    totalRows: _react.PropTypes.number,

    static: _react.PropTypes.bool
};
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"28":28}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is_function = function is_function(test) {
    return typeof test === 'function';
};
var is_string = function is_string(test) {
    return typeof test === 'string';
};

var UITextualInput = function (_UIView) {
    _inherits(UITextualInput, _UIView);

    function UITextualInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            input: '',
            is_controlled: is_string(_this.props.inputProps.value),
            is_focused: false
        }, _this.handleBlur = function (event) {
            _this.setState({ is_focused: false });

            if (is_function(_this.props.inputProps.onBlur) === true) {
                event.persist();
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ is_focused: true });

            if (is_function(_this.props.inputProps.onFocus) === true) {
                event.persist();
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            _this.setState({ input: event.target.value });

            if (is_function(_this.props.inputProps.onChange) === true) {
                event.persist();
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleInput = function (event) {
            _this.setState({ input: event.target.value });

            if (is_function(_this.props.inputProps.onInput) === true) {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.is_controlled === true) {
            return this.setState({ input: this.props.inputProps.value || '' });
        }

        this.setState({ input: this.props.inputProps.defaultValue || '' });
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(next_props) {
        if (next_props.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: next_props.inputProps.value });
        }
    };

    UITextualInput.prototype.getValue = function getValue() {
        return this.refs.field.value;
    };

    UITextualInput.prototype.setValue = function setValue(next_value) {
        if (this.state.is_controlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = next_value;
        this.setState({ input: next_value });
    };

    UITextualInput.prototype.getPlaceholderText = function getPlaceholderText() {
        var is_non_empty = this.state.input !== '';
        var should_show_placeholder = this.props.hidePlaceholderOnFocus === true ? this.state.is_focused === false && is_non_empty === false : is_non_empty === false;

        return should_show_placeholder ? this.props.inputProps.placeholder : '';
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
            _extends({}, props, {
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
                onChange: this.handleChange,
                onInput: this.handleInput }))
        );
    };

    return UITextualInput;
}(_UIView3.default);

UITextualInput.propTypes = {
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        onBlur: _react.PropTypes.func,
        onFocus: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        onInput: _react.PropTypes.func,
        placeholder: _react.PropTypes.string,
        type: _react.PropTypes.string,
        value: _react.PropTypes.string
    })
};
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"27":27}],17:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require(19);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

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

var UITokenizedInput = function (_UIView) {
    _inherits(UITokenizedInput, _UIView);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.focus = function () {
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
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if (typeof _this.props.inputProps.onFocus === 'function') {
                event.persist();
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
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

    UITokenizedInput.prototype.handleTokenCloseClick = function handleTokenCloseClick(index) {
        this.remove(index);
        this.focus();
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return _react2.default.createElement('div', {
                className: 'ui-tokenfield-token-close',
                onClick: this.handleTokenCloseClick.bind(this, index) });
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
                this.handleTokenCloseClick(index);
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
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-wrapper': true
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, (0, _extractChildProps2.default)(this.props, _UITypeaheadInput2.default.propTypes), {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                clearPartialInputOnSelection: true,
                inputProps: _extends({}, this.props.inputProps, {
                    onFocus: this.handleInputFocus
                }),
                onEntitySelected: this.add }))
        );
    };

    return UITokenizedInput;
}(_UIView3.default);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    showTokenClose: _react2.default.PropTypes.bool
});
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokens: [],
    tokensSelected: [],
    showTokenClose: true
});
exports.default = UITokenizedInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"19":19,"20":20,"21":21,"25":25,"27":27}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A wrapper that displays provided text on hover.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITooltip = function (_UIView) {
    _inherits(UITooltip, _UIView);

    function UITooltip() {
        _classCallCheck(this, UITooltip);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UITooltip.prototype.render = function render() {
        var _cx;

        var position = this.props.position;


        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
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
}(_UIView3.default);

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
UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE
};
exports.default = UITooltip;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"27":27}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITextualInput = require(16);

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _UIView2 = require(25);

var _UIView3 = _interopRequireDefault(_UIView2);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require(27);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(31);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var is_string = function is_string(test) {
    return typeof test === 'string';
};
var is_function = function is_function(test) {
    return typeof test === 'function';
};

var UITypeaheadInput = function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: nextProps.inputProps.value });
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

    UITypeaheadInput.prototype.resetMatches = function resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndexes: []
        });
    };

    UITypeaheadInput.prototype.getInputNode = function getInputNode() {
        return this.refs.input.refs.field;
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
        if (is_string(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;
        } else if (is_function(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (!this.warned_marker) {
            this.warned_marker = true;
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

        return entities.reduce(function seekMatch(result, entity, index) {
            return entity.text.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
        }, []);
    };

    UITypeaheadInput.prototype.getMatchingFunction = function getMatchingFunction() {
        if (is_string(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;
        } else if (is_function(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (!this.warned_matcher) {
            this.warned_matcher = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches() {
        var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

        var currentValue = this.state.input;
        var matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

        this.setState({
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndexes: matches
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
        var _this2 = this;

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

                    var entity = _this2.props.entities[index];

                    return _react2.default.createElement(
                        'div',
                        _extends({}, entity, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this2.state.selectedEntityIndex === index
                            }, _cx3[entity.className] = !!entity.className, _cx3)),
                            key: entity.text,
                            onClick: _this2.handleMatchClick.bind(_this2, index) }),
                        _this2.markMatchSubstring(_this2.state.input, entity)
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
            _extends({}, props, {
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
                    onInput: this.handleInput
                }) })),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_UIView3.default);

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
    var _this3 = this;

    this.state = {
        entityMatchIndexes: [],
        selectedEntityIndex: -1,
        id: this.uuid(),
        is_controlled: is_string(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || ''
    };

    this.getSelectedEntityText = function () {
        var entity = _this3.props.entities[_this3.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.select = function () {
        var input = _this3.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this3.getValue().length;
    };

    this.focus = function () {
        return _this3.getInputNode().focus();
    };

    this.getValue = function () {
        return _this3.refs.input.getValue();
    };

    this.setValue = function (value) {
        _this3.refs.input.setValue(value);

        _this3.setState({ input: value });
        _this3.resetMatches();
        _this3.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this3.props.onEntitySelected(_this3.state.selectedEntityIndex);

        if (_this3.props.clearPartialInputOnSelection) {
            _this3.setValue('');
        } else {
            _this3.setValue(_this3.getSelectedEntityText());
        }
    };

    this.markMatchSubstring = function () {
        return _this3.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this3.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleInput = function (event) {
        event.stopPropagation();

        _this3.setState({ input: event.target.value }, function () {
            return _this3.computeMatches();
        });

        if (typeof _this3.props.inputProps.onInput === 'function') {
            event.persist();
            _this3.props.inputProps.onInput(event);
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
                if (_this3.state.selectedEntityIndex !== -1 && _this3.cursorAtEndOfInput() && _this3.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this3.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this3.selectMatch(-1);
                _this3.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this3.selectMatch(1);
                _this3.focus();
                break;

            case 'Escape':
                if (_this3.state.selectedEntityIndex !== -1 && _this3.getInputNode() === event.target) {
                    _this3.resetMatches();
                }

                break;

            case 'Enter':
                if (_this3.state.selectedEntityIndex !== -1 && _this3.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this3.setValueWithSelectedEntity();
                } else {
                    _this3.props.onComplete(_this3.state.input);
                }

                break;
        }

        if (typeof _this3.props.onKeyDown === 'function') {
            event.persist();
            _this3.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"16":16,"20":20,"21":21,"25":25,"27":27,"31":31}],20:[function(require,module,exports){
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
"use strict";

exports.__esModule = true;
exports.default = noop;
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = notify;
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
        } else if (typeof config.body !== 'string') {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if (typeof config.header !== 'string') {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && typeof config.icon !== 'string') {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && typeof config.onClick !== 'function') {
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

},{}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = checkShallowEquality;
var getExactType = function retrieveDeepType(object) {
    return Object.prototype.toString.call(object);
};

var compareObjectKeys = function compareObjectKeys(key, baseArray) {
    return typeof this[key] !== 'undefined' && baseArray[key] === this[key];
}; // `this` is set to the comparison array

function checkShallowEquality(a, b) {
    if (a === b) {
        return true;
    }

    var type = getExactType(a);

    if (type !== getExactType(b) // type mismatches can't be compared
     || type !== '[object Object]' && type !== '[object Array]') {
        // functions, Promises, etc cannot be directly compared
        return false;
    }

    if (type === '[object Object]') {
        return Object.keys(a).every(compareObjectKeys, b) && Object.keys(b).every(compareObjectKeys, a);
    }

    return a.every(function validateArrayItemExists(item) {
        return b.indexOf(item) !== -1;
    }) && b.every(function validateArrayItemExists(item) {
        return a.indexOf(item) !== -1;
    });
}

},{}],24:[function(require,module,exports){
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

    // used in JSDOM
    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
}();

},{}],25:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _shallowEqual = require(23);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An augmented version of `React.Component` with some helpful abstractions added to smooth
 * the component development process.
 *
 * All UIKit components are based on UIView.
 *
 * @augments {React.Component}
 */

var UIView = function (_Component) {
  _inherits(UIView, _Component);

  /**
   * @param {object} props data passed on to the end component
   */

  function UIView() {
    _classCallCheck(this, UIView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

    _this.state = _this.initialState ? _this.initialState() : {};
    return _this;
  }

  /**
   * Approximates the @link{PureRenderMixin https://facebook.github.io/react/docs/pure-render-mixin.html} from ES5 React. Implement shouldComponentUpdate in your subclass to override this functionality.
   *
   * @param  {Object} nextProps the incoming props definition, may differ from current props
   * @param  {Object} nextState the incoming state definition, may differ from current state
   * @return {Boolean}          Informs React to re-render the component.
   *
   * @example
   * shouldComponentUpdate(nextProps, nextState) {
   *     // some logic here, eventually `return` true or false
   *     // current props & state are available for comparison at `this.props`, `this.state`
   * }
   */


  UIView.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !(0, _shallowEqual2.default)(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
  };

  /**
   * Generates a unique ID. Based on {@link https://gist.github.com/jed/982883 this implementation}.
   * @return {string} a unique identifier
   *
   * @example
   * this.uuid(); // 1f2cd27f-0754-4344-9d20-436a201b2f80
   */


  UIView.prototype.uuid = function uuid() {
    /* eslint-disable */
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
      return (a ^ Math.random() * 16 >> a / 4).toString(16);
    });
    /* eslint-enable */
  };

  /**
   * Emulates the (now removed) React interface `getInitialState`. It's a convenience, but allows
   * for this functionality to work without having to provide a constructor function.
   *
   * @virtual
   * @name UIView#initialState
   *
   * @example
   * initialState() {
   *     return {
   *          items: []
   *     }
   * }
   */


  return UIView;
}(_react.Component);

exports.default = UIView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"23":23}],26:[function(require,module,exports){
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
        notify: global.UIKit.UIUtils.notify = require(22).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(24).default
    },
    UIView: global.UIKit.UIView = require(25).default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"22":22,"24":24,"25":25,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Y_SCROLL_TRACK = exports.X_SCROLL_TRACK = exports.ROW_LOADING = exports.ROW_ACTIVE = exports.ROW_ODD = exports.ROW_EVEN = exports.ROW = exports.CELL_INNER = exports.CELL_ODD = exports.CELL_EVEN = exports.CELL = exports.HEADER_CELL_HANDLE = exports.HEADER_CELL = undefined;

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
}(); /**
      * A high-performance, infinite table view.
      */

var _findWhere = require(29);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _transformProperty = require(30);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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
}; // z is never used

function reparentCellText(node, content) {
    if (node.childNodes.length && node.childNodes[0].nodeType === 3) {
        node.removeChild(node.childNodes[0]);
    }

    var text = document.createElement('div');
    text.className = CELL_INNER;

    var text_node = document.createTextNode(content);
    text.appendChild(text_node);

    node.appendChild(text);

    return text_node;
};

function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = CELL;
    cell.classList.add(index % 2 === 0 ? CELL_EVEN : CELL_ODD);

    cell.setAttribute('data-column', mapping);
    cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.classList.add(HEADER_CELL);

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = HEADER_CELL_HANDLE;

        cell.appendChild(handle);
    }

    return cell;
};

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

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._title);
                }
            }
        },
        mapping: metadata.mapping,
        node: node
    };
};

function createCell(content, mapping, width, index) {
    var node = createDOMCell(content, mapping, width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;
                this._textNode.nodeValue = this._content;
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

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._content);
                }
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
};

function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = ROW;
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
};

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
};

function validateColumnShape(column) {
    return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(c) {
    // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
    if (c.static_mode !== undefined && typeof c.static_mode !== 'boolean') {
        throw Error('Table was not passed a valid `static_mode`; it should be a boolean.');
    }

    if (!(c.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(c.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(c.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!c.static_mode && !(c['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!c.static_mode && !(c['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!c.static_mode && !(c['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!c.static_mode && !(c['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!c.static_mode && !(c.aria instanceof HTMLElement)) {
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

        this._handleDragEnd = function () {
            window.removeEventListener('mouseup', _this._handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this._unlockDragToScroll();
            }, 0);
        };

        this._handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === HEADER_CELL_HANDLE) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

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

        this._processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        if (!this.c.static_mode) {
            this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
            this.y_scroll_handle_style = this.c['y-scroll-handle'].style;
        }

        this._resetInternals();
        this.resetActiveRowIndex();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        if (!this.c.static_mode) {
            window.addEventListener('resize', this._handleWindowResize);
            window.addEventListener('mousemove', this._handleDragMove);

            this.c.wrapper.addEventListener('wheel', this._handleMoveIntent);
            this.c.wrapper.addEventListener('touchstart', this._handleTouchStart);
            this.c.wrapper.addEventListener('touchmove', this._handleTouchMove);

            this.c.wrapper.addEventListener('keydown', this._handleKeyDown);

            this.header.addEventListener('mousedown', this._handleColumnDragStart);
            this.header.addEventListener('dblclick', this._handleColumnAutoExpand);

            this.body.addEventListener('click', this._handleClick);

            this.c['x-scroll-handle'].addEventListener('mousedown', this._handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].addEventListener('mousedown', this._handleYScrollHandleDragStart);

            this.c['x-scroll-track'].addEventListener('click', this._handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].addEventListener('click', this._handleAdvanceToYScrollTrackLocation);
        }
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
                _this2.columns.push(createHeaderCell(column, index));
            });
        }
    }, {
        key: '_computeMinMaxHeaderCellDimensions',
        value: function _computeMinMaxHeaderCellDimensions() {
            var cs = void 0;

            this.columns.forEach(function (column) {
                cs = window.getComputedStyle(column.node);

                column.minWidth = parseInt(cs['min-width'], 10);
                column.maxWidth = parseInt(cs['max-width'], 10);
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
        key: '_calculateCellHeight',
        value: function _calculateCellHeight() {
            this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: '_calculateCellWidths',
        value: function _calculateCellWidths() {
            var _this4 = this;

            this.rows[0].cells.forEach(function (cell, index) {
                _this4.columns[index].width = _this4.columns[index].width || cell.node.getBoundingClientRect().width;
                cell.width = _this4.columns[index].width;
            });
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
            if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
                this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
                this.last_x_scroll_handle_x = x;
            }
        }
    }, {
        key: '_translateYScrollHandle',
        value: function _translateYScrollHandle(y) {
            if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
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
            var _this5 = this;

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
                    return _this5._changeActiveRow(delta);
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
            var _this6 = this;

            this.active_row = -1;
            this.next_active_row = null;

            if (this.rows.length) {
                this.rows.forEach(function (row) {
                    row.active = row.setIndex === _this6.active_row;
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
            this._calculateCellWidths();
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

            this._injectHeaderCells();
            this._injectRestOfRows();

            if (!this.c.static_mode) {
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
            }

            this.__x = this.__y = this.__row_start_index = null;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this7 = this;

            if (!this.c.static_mode) {
                window.removeEventListener('resize', this._handleWindowResize);
                window.removeEventListener('mousemove', this._handleDragMove);

                this.c.wrapper.removeEventListener('wheel', this._handleMoveIntent);
                this.c.wrapper.removeEventListener('touchstart', this._handleTouchStart);
                this.c.wrapper.removeEventListener('touchmove', this._handleTouchMove);

                this.c.wrapper.removeEventListener('keydown', this._handleKeyDown);

                this.header.removeEventListener('mousedown', this._handleColumnDragStart);
                this.header.removeEventListener('dblclick', this._handleColumnAutoExpand);

                this.body.removeEventListener('click', this._handleClick);

                this.c['x-scroll-handle'].removeEventListener('mousedown', this._handleXScrollHandleDragStart);
                this.c['y-scroll-handle'].removeEventListener('mousedown', this._handleYScrollHandleDragStart);

                this.c['x-scroll-track'].removeEventListener('click', this._handleAdvanceToXScrollTrackLocation);
                this.c['y-scroll-track'].removeEventListener('click', this._handleAdvanceToYScrollTrackLocation);
            }

            this._emptyHeader();
            this._emptyBody();

            // release cached DOM nodes
            Object.keys(this.c).forEach(function (key) {
                if (_this7.c[key] instanceof HTMLElement) {
                    _this7.c[key] = null;
                }
            });
        }
    }]);

    return Table;
}();

exports.default = Table;

},{"29":29,"30":30}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}]},{},[26])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRpb24vaW5kZXguanMiLCJVSVBvcG92ZXIvaW5kZXguanMiLCJVSVByb2dyZXNzL2luZGV4LmpzIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCJVSVJhZGlvL2luZGV4LmpzIiwiVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiVUlUYWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCJVSVV0aWxzL3NoYWxsb3dFcXVhbC9pbmRleC5qcyIsIlVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHkvaW5kZXguanMiLCJVSVZpZXcvaW5kZXguanMiLCJleHBvcnRzLmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZW5pZ21hLXRhYmxlL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL3V0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL3V0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQixvQjs7Ozs7Ozs7Ozs7OzBJQVlqQixLLEdBQVE7QUFDSiw4QkFBa0I7QUFEZCxTLFFBZ0RSLGEsR0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDdkIsb0JBQVEsTUFBTSxHQUFkO0FBQ0EscUJBQUssU0FBTDtBQUNBLHFCQUFLLFdBQUw7QUFDSSwwQkFBTSxjQUFOO0FBQ0EsMEJBQUssU0FBTCxDQUFlLENBQUMsQ0FBaEI7QUFDQTs7QUFFSixxQkFBSyxXQUFMO0FBQ0EscUJBQUssWUFBTDtBQUNJLDBCQUFNLGNBQU47QUFDQSwwQkFBSyxTQUFMLENBQWUsQ0FBZjtBQUNBO0FBWEo7O0FBY0EsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxTQUFsQixLQUFnQyxVQUFwQyxFQUFnRDtBQUM1QyxzQkFBTSxPQUFOO0FBQ0Esc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckI7QUFDSDtBQUNKLFM7OzttQ0EvREQsa0IsK0JBQW1CLFMsRUFBVyxTLEVBQVc7QUFDckMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxLQUFnQyxJQUFwQyxFQUEwQztBQUN0QyxnQkFBTSxjQUFnQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ0MsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLEtBQUssS0FBTCxDQUFXLFFBQWxDLENBQUQsQ0FBOEMsTUFEOUMsR0FFQSxDQUZ0Qjs7QUFJQSxnQkFBSSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIscUJBQUssUUFBTCxDQUFjLEVBQUMsa0JBQWtCLElBQW5CLEVBQWQsRTtBQUNILGFBRkQsTUFFTyxJQUFJLEtBQUssS0FBTCxDQUFXLGdCQUFYLElBQStCLFdBQW5DLEVBQWdEO0FBQ25ELHlCQUFLLFFBQUwsQ0FBYyxFQUFDLGtCQUFrQixjQUFjLENBQWpDLEVB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Ozs7Ozs7OztBQVNQLFNBQUEsQUFBUyxVQUFULEFBQW1CLE9BQW5CLEFBQTBCLFVBQTFCLEFBQW9DLE9BQU8sQUFDdEQ7c0JBQWtCLE1BQUEsQUFBTSxTQUF4QixBQUFpQyxBQUVqQzs7V0FBTyxrQkFBa0IsQ0FBekIsQUFBMEIsR0FBRyxBQUN6QjtZQUFJLE1BQUEsQUFBTSxpQkFBTixBQUF1QixjQUEzQixBQUF5QyxPQUFPLEFBQzVDO21CQUFPLE1BQVAsQUFBTyxBQUFNLEFBQ2hCO0FBRUQ7OzJCQUFBLEFBQW1CLEFBQ3RCO0FBQ0o7QTs7Ozs7Ozs7Ozs7Ozs7OzJCQ2xCZSxBQUFTLDBCQUEwQixBQUMvQztRQUFNLGdCQUFnQixDQUFBLEFBQ2xCLGFBRGtCLEFBRWxCLG1CQUZrQixBQUdsQixnQkFIa0IsQUFJbEIsY0FKa0IsQUFLbEIsZUFMSixBQUFzQixBQU1sQixBQUdKOzs7U0FBSyxJQUFJLElBQUosQUFBUSxHQUFHLE1BQU0sY0FBdEIsQUFBb0MsUUFBUSxJQUE1QyxBQUFnRCxLQUFoRCxBQUFxRCxLQUFLLEFBQ3REO1lBQUksY0FBQSxBQUFjLE1BQU0sU0FBQSxBQUFTLGdCQUFqQyxBQUFpRCxPQUFPLEFBQ3BEO21CQUFPLGNBQVAsQUFBTyxBQUFjLEFBQ3hCO0FBQ0o7QUFFRDs7V0FBQSxBQUFPLEFBQ1Y7QSxBQWpCYyxDQUFDOzs7QUNOaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25QcmVzc2VkOiBub29wLFxuICAgICAgICBvblVucHJlc3NlZDogbm9vcCxcbiAgICB9O1xuXG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIENvbnN0YW50cyA9IHtcbiAgICAgICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLm5hbWUgfHwgJ2NiX3NlbGVjdF9hbGwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5kaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuZnVuY3Rpb24gcmVzY2FsZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKGluc3RhbmNlLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHN0YXR1c1Byb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGFsdD17bnVsbH1cbiAgICAgICAgICAgICAgICAgc3JjPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlNb2RhbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1vZGFsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIG1hc2tQcm9wczoge30sXG4gICAgICAgIG1vZGFsUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyh0aGlzLnByb3BzLCBVSURpYWxvZy5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB1dGlsaXR5IHZpZXcgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMgb2YgdmFyeWluZyBzaXplcy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRpb25cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBfX21vdW50ZWQgPSBmYWxzZVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IG5leHRQcm9wcy5kYXRhfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX19tb3VudGVkICYmIHRoaXMuc3RhdGUuZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLnN0YXRlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9fbW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLl9fbW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoPGRpdiB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0gLz4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnN0YXRlLmRhdGEsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICBldmVuOiBudWxsLFxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gICAgICAgIHBhZ2VyUG9zaXRpb246IGZ1bmN0aW9uIHZhbGlkYXRlUGFnZXJQb3NpdGlvbihwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLnBhZ2VyUG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogZmFsc2UsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sVGV4dDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBhZ2VyUG9zaXRpb246IDEsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLnBhZ2VyUG9zaXRpb24sXG4gICAgICAgIG51bWJlck9mUGFnZXM6IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzLFxuICAgICAgICB0b3RhbEl0ZW1zOiB0aGlzLnByb3BzLnRvdGFsSXRlbXMsXG4gICAgICAgIHNob3duSXRlbXM6IFt7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKDApfV0sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pZGVudGlmaWVyICE9PSB0aGlzLnByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcygxLCBuZXh0UHJvcHMuZ2V0SXRlbSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlID0gKCkgPT4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKGN1cnJlbnRQYWdlLCBnZXRJdGVtID0gdGhpcy5wcm9wcy5nZXRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMuc3RhdGUudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IGdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBVSVBhZ2luYXRpb24uY29udHJvbHM7XG4gICAgICAgIGxldCBwYWdlTnVtYmVyO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSB2YWx1ZXMuRklSU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHZhbHVlcy5QUkVWSU9VUzpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHZhbHVlcy5ORVhUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdmFsdWVzLkxBU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMocGFnZU51bWJlciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW1zJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93bkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtpdGVtLmRhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4PXt0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMSArIGluZGV4fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbl9sb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uX2NhcGl0YWxpemVkID0gcG9zaXRpb25fbG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uX2xvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uX2NhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25fbG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGZYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiB0cnVlLFxuICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgIHNlbGZYQWxpZ246IHRoaXMucHJvcHMuc2VsZlhBbGlnbixcbiAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy5ub2RlLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBsYWJlbD17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGUuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlIGZyb20gJ2VuaWdtYS10YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXBwaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBnZXRSb3c6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBqdW1wVG9Sb3dJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ2VsbEludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Db2x1bW5SZXNpemU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblJvd0ludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvdGFsUm93czogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBzdGF0aWM6IFByb3BUeXBlcy5ib29sLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdHJ1ZSxcbiAgICB9XG5cbiAgICBnZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMucmVmcy53cmFwcGVyLFxuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLnJlZnMuaGVhZGVyLFxuICAgICAgICAgICAgYm9keTogdGhpcy5yZWZzLmJvZHksXG4gICAgICAgICAgICAneC1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneC1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgYXJpYTogdGhpcy5yZWZzLmFyaWEsXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIG9uQ29sdW1uUmVzaXplOiB0aGlzLnByb3BzLm9uQ29sdW1uUmVzaXplLFxuICAgICAgICAgICAgZ2V0Um93OiB0aGlzLnByb3BzLmdldFJvdyxcbiAgICAgICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRoaXMucHJvcHMucHJlc2VydmVTY3JvbGxTdGF0ZSxcbiAgICAgICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IHRoaXMucHJvcHMudGhyb3R0bGVJbnRlcnZhbCxcbiAgICAgICAgICAgIHRvdGFsUm93czogdGhpcy5wcm9wcy50b3RhbFJvd3MsXG5cbiAgICAgICAgICAgIC8vIGludGVybmFsIHVzZSBvbmx5LCByZW5kZXJzIHRoZSB0YWJsZSB3aXRob3V0IGFueSBldmVudCBsaXN0ZW5lcnMgKG1pbmltYWwgY29tcHV0YXRpb24pXG4gICAgICAgICAgICBzdGF0aWNfbW9kZTogdGhpcy5wcm9wcy5zdGF0aWMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgVGFibGUodGhpcy5nZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCkge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleCh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgb25seUNvbHVtbldpZHRoQ2hhbmdlZEFuZE1hdGNoZXNUYWJsZUludGVybmFscyhjdXJyZW50X2NvbHVtbnMsIHByZXZfY29sdW1ucywgdGFibGVfaW50ZXJuYWxfY29sdW1ucykge1xuICAgICAgICAvKiB0aGUgY29sdW1ucyBzaG91bGQgZXhhY3RseSBtYXRjaCBpbiB0aGUgcHJvcGVyIG9yZGVyLCBvciB0aGUgd2lkdGhzIHNob3VsZCBiZSB0aGUgc2FtZSBhcyB0aGUgaW50ZXJuYWwgY29sdW1uXG4gICAgICAgIHJlcHJlc2VudGF0aW9uLCBtZWFuaW5nIHRoZSBjaGFuZ2UgaXMgYSByZWFjdGlvbiB0byBiZWluZyBhbGVydGVkIGJ5IGBwcm9wcy5vbkNvbHVtblJlc2l6ZWAgKi9cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRfY29sdW1ucy5ldmVyeSgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICAgIGNvbHVtbiA9PT0gcHJldl9jb2x1bW5zW2luZGV4XVxuICAgICAgICAgICAgICAgICAgIHx8IChjb2x1bW4ubWFwcGluZyA9PT0gcHJldl9jb2x1bW5zW2luZGV4XS5tYXBwaW5nICYmIGNvbHVtbi53aWR0aCA9PT0gdGFibGVfaW50ZXJuYWxfY29sdW1uc1tpbmRleF0ud2lkdGgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldl9wcm9wcykge1xuICAgICAgICBjb25zdCBjaGFuZ2VkX3Byb3BzID0gW107XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgLyogYmlkaXJlY3Rpb25hbCBrZXkgY2hhbmdlIGRldGVjdGlvbiAqL1xuXG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMucHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzW2tleV0gIT09IHByZXZfcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRfcHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJldl9wcm9wcykge1xuICAgICAgICAgICAgaWYgKHByZXZfcHJvcHNba2V5XSAhPT0gdGhpcy5wcm9wc1trZXldICYmIGNoYW5nZWRfcHJvcHMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRfcHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZF9wcm9wcy5pbmRleE9mKCdqdW1wVG9Sb3dJbmRleCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8qIGp1bXBUb1Jvd0luZGV4IGFscmVhZHkgdHJpZ2dlcnMgYSByZWdlbmVyYXRpb24sIGp1c3QgYXZvaWRpbmcgcnVubmluZyBpdCB0d2ljZSAqL1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hhbmdlZF9wcm9wcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlZF9wcm9wc1swXSA9PT0gJ2NvbHVtbnMnKSB7XG4gICAgICAgICAgICAgICAgLyogZGlkIHRoaW5ncyBtYXRlcmlhbGx5IGNoYW5nZSwgb3IganVzdCB1cGRhdGluZyBhIGNvbHVtbiB3aWR0aD8gKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbmx5Q29sdW1uV2lkdGhDaGFuZ2VkQW5kTWF0Y2hlc1RhYmxlSW50ZXJuYWxzKHRoaXMucHJvcHMuY29sdW1ucywgcHJldl9wcm9wcy5jb2x1bW5zLCB0aGlzLnRhYmxlLmNvbHVtbnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGUucmVnZW5lcmF0ZSh0aGlzLmdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyWFNjcm9sbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnN0YXRpYykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJZU2Nyb2xsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc3RhdGljKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckFyaWEoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zdGF0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJYU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWVNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWEoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBpc19mdW5jdGlvbiA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc19zdHJpbmcgPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25JbnB1dDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzX2NvbnRyb2xsZWQ6IGlzX3N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpc19mb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8ICcnfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSB8fCAnJ30pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0X3Byb3BzLmlucHV0UHJvcHMudmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmZpZWxkLnZhbHVlO1xuICAgIH1cblxuICAgIHNldFZhbHVlKG5leHRfdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignVUlUZXh0dWFsSW5wdXQ6IGEgY29udHJvbGxlZCBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYnkgY2hhbmdpbmcgaXRzIGBwcm9wcy52YWx1ZWAgb3IgYHByb3BzLmlucHV0UHJvcHMudmFsdWVgLCBub3QgdmlhIHByb2dyYW1tYXRpYyBtZXRob2RzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dF92YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRfdmFsdWV9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBldmVudC50YXJnZXQudmFsdWV9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcblxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIC8vIHBhc3N0aHJvdWdocyB0byBVSVR5cGVhaGVhZElucHV0IGluc3RhbmNlIG1ldGhvZHNcbiAgICBmb2N1cyA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKVxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0SW5wdXROb2RlKClcbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFZhbHVlKClcbiAgICBzZWxlY3QgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpXG4gICAgc2V0VmFsdWUgPSB2YWx1ZSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyh0aGlzLnByb3BzLCBVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKiBAY2xhc3MgVUlUb29sdGlwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuXG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNvbnN0IGlzX3N0cmluZyA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuY29uc3QgaXNfZnVuY3Rpb24gPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBhbGdvcml0aG06IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgaGludFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIGlzX2NvbnRyb2xsZWQ6IGlzX3N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZDtcbiAgICB9XG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc19zdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwXG4gICAgICAgICAgICAgICAgICAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoaW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc19zdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXRjaGVyKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXRjaGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaGVyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hdGNoaW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSwgKCkgPT4gdGhpcy5jb21wdXRlTWF0Y2hlcygpKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUuaW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudGl0eS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPFVJVGV4dHVhbElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17c3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0OiB0aGlzLmhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKipcbiAqIFRyaWdnZXIgbmF0aXZlIHRvYXN0cyBpbiBzdXBwb3J0aW5nIGJyb3dzZXJzLlxuICogQGNsYXNzIFVJTm90aWZpY2F0aW9uU2VydmljZVxuICovXG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmhlYWRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuaWNvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLm9uQ2xpY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpXG4gICAgICAgICk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBnZXRFeGFjdFR5cGUgPSBmdW5jdGlvbiByZXRyaWV2ZURlZXBUeXBlKG9iamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbn07XG5cbmNvbnN0IGNvbXBhcmVPYmplY3RLZXlzID0gZnVuY3Rpb24gY29tcGFyZU9iamVjdEtleXMoa2V5LCBiYXNlQXJyYXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXNba2V5XSAhPT0gJ3VuZGVmaW5lZCcgJiYgYmFzZUFycmF5W2tleV0gPT09IHRoaXNba2V5XTtcbn07IC8vIGB0aGlzYCBpcyBzZXQgdG8gdGhlIGNvbXBhcmlzb24gYXJyYXlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGFsbG93RXF1YWxpdHkoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSBnZXRFeGFjdFR5cGUoYSk7XG5cbiAgICBpZiAoICAgIHR5cGUgIT09IGdldEV4YWN0VHlwZShiKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgbWlzbWF0Y2hlcyBjYW4ndCBiZSBjb21wYXJlZFxuICAgICAgICB8fCAodHlwZSAhPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgdHlwZSAhPT0gJ1tvYmplY3QgQXJyYXldJykpIHsgLy8gZnVuY3Rpb25zLCBQcm9taXNlcywgZXRjIGNhbm5vdCBiZSBkaXJlY3RseSBjb21wYXJlZFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYikgJiYgT2JqZWN0LmtleXMoYikuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGEpO1xuICAgIH1cblxuICAgIHJldHVybiAgICBhLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGIuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pXG4gICAgICAgICAgICYmIGIuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYS5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSk7XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi9VSVV0aWxzL3NoYWxsb3dFcXVhbCc7XG5cbi8qKlxuICogQW4gYXVnbWVudGVkIHZlcnNpb24gb2YgYFJlYWN0LkNvbXBvbmVudGAgd2l0aCBzb21lIGhlbHBmdWwgYWJzdHJhY3Rpb25zIGFkZGVkIHRvIHNtb290aFxuICogdGhlIGNvbXBvbmVudCBkZXZlbG9wbWVudCBwcm9jZXNzLlxuICpcbiAqIEFsbCBVSUtpdCBjb21wb25lbnRzIGFyZSBiYXNlZCBvbiBVSVZpZXcuXG4gKlxuICogQGF1Z21lbnRzIHtSZWFjdC5Db21wb25lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVmlldyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzIGRhdGEgcGFzc2VkIG9uIHRvIHRoZSBlbmQgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGUgPyB0aGlzLmluaXRpYWxTdGF0ZSgpIDoge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwcm94aW1hdGVzIHRoZSBAbGlua3tQdXJlUmVuZGVyTWl4aW4gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9wdXJlLXJlbmRlci1taXhpbi5odG1sfSBmcm9tIEVTNSBSZWFjdC4gSW1wbGVtZW50IHNob3VsZENvbXBvbmVudFVwZGF0ZSBpbiB5b3VyIHN1YmNsYXNzIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIHRoZSBpbmNvbWluZyBwcm9wcyBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBwcm9wc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFN0YXRlIHRoZSBpbmNvbWluZyBzdGF0ZSBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBzdGF0ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgIEluZm9ybXMgUmVhY3QgdG8gcmUtcmVuZGVyIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAqICAgICAvLyBzb21lIGxvZ2ljIGhlcmUsIGV2ZW50dWFsbHkgYHJldHVybmAgdHJ1ZSBvciBmYWxzZVxuICAgICAqICAgICAvLyBjdXJyZW50IHByb3BzICYgc3RhdGUgYXJlIGF2YWlsYWJsZSBmb3IgY29tcGFyaXNvbiBhdCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy51dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICAgICAqL1xuICAgIHV1aWQoKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW11bGF0ZXMgdGhlIChub3cgcmVtb3ZlZCkgUmVhY3QgaW50ZXJmYWNlIGBnZXRJbml0aWFsU3RhdGVgLiBJdCdzIGEgY29udmVuaWVuY2UsIGJ1dCBhbGxvd3NcbiAgICAgKiBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5IHRvIHdvcmsgd2l0aG91dCBoYXZpbmcgdG8gcHJvdmlkZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAbmFtZSBVSVZpZXcjaW5pdGlhbFN0YXRlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICAgICBpdGVtczogW11cbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKi9cbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuZ2xvYmFsLlVJS2l0LlVJVXRpbHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlBcnJvd0tleU5hdmlnYXRpb246IChnbG9iYWwuVUlLaXQuVUlBcnJvd0tleU5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJykuZGVmYXVsdCksXG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQYWdpbmF0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJUGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vVUlQYWdpbmF0aW9uJykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUZXh0dWFsSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUZXh0dWFsSW5wdXQgPSByZXF1aXJlKCcuL1VJVGV4dHVhbElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlVdGlsczoge1xuICAgICAgICBub3RpZnk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5ub3RpZnkgPSByZXF1aXJlKCcuL1VJVXRpbHMvbm90aWZ5JykuZGVmYXVsdCksXG4gICAgICAgIHRyYW5zZm9ybVByb3BlcnR5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMudHJhbnNmb3JtUHJvcGVydHkgPSByZXF1aXJlKCcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknKS5kZWZhdWx0KSxcbiAgICB9LFxuICAgIFVJVmlldzogKGdsb2JhbC5VSUtpdC5VSVZpZXcgPSByZXF1aXJlKCcuL1VJVmlldycpLmRlZmF1bHQpLFxufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKi9cblxuaW1wb3J0IGZ3IGZyb20gJy4vdXRpbHMvZmluZFdoZXJlJztcbmltcG9ydCB0cCBmcm9tICcuL3V0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcblxuZXhwb3J0IGNvbnN0IEhFQURFUl9DRUxMID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsJztcbmV4cG9ydCBjb25zdCBIRUFERVJfQ0VMTF9IQU5ETEUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5leHBvcnQgY29uc3QgQ0VMTCA9ICd1aS10YWJsZS1jZWxsJztcbmV4cG9ydCBjb25zdCBDRUxMX0VWRU4gPSAndWktdGFibGUtY2VsbC1ldmVuJztcbmV4cG9ydCBjb25zdCBDRUxMX09ERCA9ICd1aS10YWJsZS1jZWxsLW9kZCc7XG5leHBvcnQgY29uc3QgQ0VMTF9JTk5FUiA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcbmV4cG9ydCBjb25zdCBST1cgPSAndWktdGFibGUtcm93JztcbmV4cG9ydCBjb25zdCBST1dfRVZFTiA9ICd1aS10YWJsZS1yb3ctZXZlbic7XG5leHBvcnQgY29uc3QgUk9XX09ERCA9ICd1aS10YWJsZS1yb3ctb2RkJztcbmV4cG9ydCBjb25zdCBST1dfQUNUSVZFID0gJ3VpLXRhYmxlLXJvdy1hY3RpdmUnO1xuZXhwb3J0IGNvbnN0IFJPV19MT0FESU5HID0gJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJztcbmV4cG9ydCBjb25zdCBYX1NDUk9MTF9UUkFDSyA9ICd1aS10YWJsZS14LXNjcm9sbC10cmFjayc7XG5leHBvcnQgY29uc3QgWV9TQ1JPTExfVFJBQ0sgPSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snO1xuXG5jb25zdCBub29wID0gZnVuY3Rpb24gKCkge307XG5cbi8qXG5cbkZPUiBGVVRVUkUgRVlFU1xuXG5TY3JvbGwgcGVyZm9ybWFuY2UgaXMgYSB0cmlja3kgYmVhc3QgLS0gbW9yZXNvIHdoZW4gdHJ5aW5nIHRvIG1haW50YWluIDUwKyBGUFMgYW5kIHB1bXBpbmcgYSBsb3Qgb2YgZGF0YSB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdCBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG5cblRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cblxuX19JbXBvcnRhbnQgTm90ZV9fXG5cbkFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC4gSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG5cblxuT1JERVIgT0YgT1BFUkFUSU9OU1xuXG4xLiByZW5kZXIgb25lIHJvdyBvZiBjZWxsc1xuMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbjMuIHJlbmRlciBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuXG5JZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW4gdHJ5aW5nIHRvIGRpZmYuXG5cbiovXG5cbmZ1bmN0aW9uIGFwcGx5RGVsdGEoZGVsdGEsIG51bSkge1xuICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgcmV0dXJuIG51bSA8IDAgPyBudW0gLSBkZWx0YSA6IG51bSArIGRlbHRhO1xuICAgIH1cblxuICAgIHJldHVybiBudW0gLSBkZWx0YTtcbn1cblxuZnVuY3Rpb24gZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgMTkyOlxuICAgICAgICByZXR1cm4gJ0VzY2FwZSc7XG5cbiAgICBjYXNlIDQwOlxuICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICBjYXNlIDM4OlxuICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgY2FzZSAxMzpcbiAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZTNkICh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMHB4KSc7XG59OyAvLyB6IGlzIG5ldmVyIHVzZWRcblxuXG5mdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IENFTExfSU5ORVI7XG5cbiAgICBjb25zdCB0ZXh0X25vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHRfbm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHRfbm9kZTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY2VsbC5jbGFzc05hbWUgPSBDRUxMO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChpbmRleCAlIDIgPT09IDAgPyBDRUxMX0VWRU4gOiBDRUxMX09ERCk7XG5cbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9DRUxMKTtcblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gSEVBREVSX0NFTExfSEFORExFO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoLCBpbmRleCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnMgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSBST1c7XG4gICAgICAgICAgcm93LnN0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuXG4gICAgcmV0dXJuIHJvdztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdyhtZXRhZGF0YSwgY29sdW1ucykge1xuICAgIC8qIElNUE9SVEFOVCBOT1RFOiBtZXRhZGF0YS5kYXRhIG1pZ2h0IGJlIGEgcHJvbWlzZS4gUGxhbiBhY2NvcmRpbmdseS4gKi9cblxuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZURPTVJvdyhtZXRhZGF0YS5zZXRJbmRleCwgbWV0YWRhdGEueSk7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBjZWxscy5wdXNoKGNyZWF0ZUNlbGwoJycsIGNvbHVtbi5tYXBwaW5nLCBjb2x1bW4ud2lkdGgsIGluZGV4KSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XX0FDVElWRSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19BQ1RJVkUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19FVkVOKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoUk9XX09ERCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX09ERCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19FVkVOKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdmFsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEluZGV4ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIGdldCB3YWl0aW5nRm9yUmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uOyB9LFxuICAgICAgICBzZXQgd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19MT0FESU5HKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoUk9XX0xPQURJTkcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19MT0FESU5HKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShST1dfTE9BRElORyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gbnVsbCB8fCB0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2RhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW3RoaXMuX2l0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSB0byBoYXZlIHRoZSBjbGFzc2VzIGFkZGVkIGF1dG9tYXRpY2FsbHlcbiAgICByb3dPYmouc2V0SW5kZXggPSBtZXRhZGF0YS5zZXRJbmRleDtcbiAgICByb3dPYmouYWN0aXZlID0gbWV0YWRhdGEuYWN0aXZlO1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbHVtblNoYXBlKGNvbHVtbikge1xuICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4ucmVzaXphYmxlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgJiYgKGNvbHVtbi53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb25maWd1cmF0aW9uKGMpIHtcbiAgICAvLyB4LXNjcm9sbC10cmFjaywgeS1zY3JvbGwtdHJhY2ssIHgtc2Nyb2xsLWhhbmRsZSwgeS1zY3JvbGwtaGFuZGxlLCBhbmQgYXJpYSBhcmUgbm90IHJlcXVpcmVkIGluIHN0YXRpY19tb2RlXG4gICAgaWYgKGMuc3RhdGljX21vZGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5zdGF0aWNfbW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBzdGF0aWNfbW9kZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoYy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGMuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBoZWFkZXJgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoYy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghYy5zdGF0aWNfbW9kZSAmJiAhKGNbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghYy5zdGF0aWNfbW9kZSAmJiAhKGNbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghYy5zdGF0aWNfbW9kZSAmJiAhKGNbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjLnN0YXRpY19tb2RlICYmICEoY1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWMuc3RhdGljX21vZGUgJiYgIShjLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCAgIEFycmF5LmlzQXJyYXkoYy5jb2x1bW5zKSA9PT0gZmFsc2VcbiAgICAgICAgfHwgYy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICB8fCBjLmNvbHVtbnMuZXZlcnkodmFsaWRhdGVDb2x1bW5TaGFwZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBUYWJsZSB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgIG1hcHBpbmc6IHN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyIChvcHRpb25hbCksXG4gICAgICAgIH1gKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5yb3dDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5yb3dDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjLmNlbGxDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5jZWxsQ2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjZWxsQ2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGMuY29sdW1uUmVzaXplRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLmNvbHVtblJlc2l6ZUZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNvbHVtblJlc2l6ZUZ1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMucHJlc2VydmVTY3JvbGxTdGF0ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBwcmVzZXJ2ZVNjcm9sbFN0YXRlYDsgaXQgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIHtcbiAgICBfcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGU7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbih0aGlzLmMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLmJvZHlfc3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jLmhlYWRlcjtcbiAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGUgPSB0aGlzLmhlYWRlci5zdHlsZTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVzZXRJbnRlcm5hbHMoKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogdXNlZCBpbiBzY3JvbGwgc3RhdGUgcHJlc2VydmF0aW9uIGNhbGN1bGF0aW9ucyAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMuX195ID0gdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5faGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldEludGVybmFscygpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMucm93cyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95ID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5uX3BhZGRpbmdfcm93cyA9IDM7XG5cbiAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLm5leHRfeSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXSkge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgPSAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXSkge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzdGFuY2VfZnJvbV9sZWZ0ID0gICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gMDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuaSA9IG51bGw7XG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRpb24gY2FjaGVzXG4gICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXZ0ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSBudWxsO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZUFsbCgpO1xuICAgIH1cblxuICAgIF9lbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2J1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5fZW1wdHlIZWFkZXIoKTtcblxuICAgICAgICB0aGlzLmMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjcmVhdGVIZWFkZXJDZWxsKGNvbHVtbiwgaW5kZXgpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29sdW1uLm5vZGUpO1xuXG4gICAgICAgICAgICBjb2x1bW4ubWluV2lkdGggPSBwYXJzZUludChjc1snbWluLXdpZHRoJ10sIDEwKTtcbiAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHBhcnNlSW50KGNzWydtYXgtd2lkdGgnXSwgMTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLl9jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgX2VtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9pbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5fZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMucm93X3N0YXJ0X2luZGV4LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKDApO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgX2luamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLmkgPSAxOyB0aGlzLmkgPCB0aGlzLm5fcm93c19yZW5kZXJlZDsgdGhpcy5pICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5jZWxsX2ggPSB0aGlzLnJvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZUNlbGxXaWR0aHMoKSB7XG4gICAgICAgIHRoaXMucm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggfHwgY2VsbC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9jYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMucm93X3cgPSB0aGlzLnJvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9tYXggPSB0aGlzLmNvbnRhaW5lcl93IDw9IHRoaXMucm93X3cgPyB0aGlzLmNvbnRhaW5lcl93IC0gdGhpcy5yb3dfdyA6IDA7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVlCb3VuZCgpIHtcbiAgICAgICAgdGhpcy55X21pbiA9IDA7XG4gICAgICAgIHRoaXMueV9tYXggPSB0aGlzLmJvZHlfaCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkICogdGhpcy5jZWxsX2g7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy54X3Njcm9sbF90cmFja193IC8gdGhpcy5yb3dfdyAqIHRoaXMueF9zY3JvbGxfdHJhY2tfdztcblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIF9jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9ICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9PT0gdGhpcy5uX3Jvd3NfcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcl9oICogKHRoaXMubl9yb3dzX3Zpc2libGUgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBfaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCB0aGlzLmNvbnRhaW5lcl93O1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IDg7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgdGhpcy5jb250YWluZXJfaDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUud2lkdGggPSB0aGlzLl9jYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUuaGVpZ2h0ID0gdGhpcy5fY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG5cbiAgICAgICAgLyogdG90YWwgdHJhbnNsYXRhYmxlIHNwYWNlIC8gc2Nyb2xsYmFyIHRyYWNrIHNpemUgPSByZWxhdGl2ZSB2YWx1ZSBvZiBhIHNjcm9sbGJhciBwaXhlbCAqL1xuICAgICAgICB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gPSBNYXRoLmFicyh0aGlzLnhfbWF4KSAvICh0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplKTtcblxuICAgICAgICAvKiBob3cgbWFueSBzY3JvbGxiYXIgcGl4ZWxzID09PSBvbmUgcm93PyAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvID0gKHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUpIC8gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c192aXNpYmxlKTtcblxuICAgICAgICAvKiBoaWRlIHRoZSBzY3JvbGxiYXJzIGlmIHRoZXkgYXJlIG5vdCBuZWVkZWQgKi9cblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9oID0gdGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5jb250YWluZXJfdyA9IHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5ib2R5X2ggPSB0aGlzLmMuYm9keS5jbGllbnRIZWlnaHQgfHwgMTEwO1xuICAgIH1cblxuICAgIF9oYW5kbGVXaW5kb3dSZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgIT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoICE9PSB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICBjb25zdCBvbGRfd2lkdGggPSB0aGlzLmNvbnRhaW5lcl93O1xuXG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54IC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvICogLTE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvLyBnZXR0aW5nIGxhcmdlciBhbmQgd2UncmUgZnVsbHkgc2Nyb2xsZWQgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBpZiAob2xkX3dpZHRoIDwgdGhpcy5jb250YWluZXJfdyAmJiB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmNvbnRhaW5lcl93IC0gb2xkX3dpZHRoO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlSGVhZGVyKHRoaXMueCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlQm9keSh0aGlzLngsIHRoaXMubGFzdF9ib2R5X3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZUhlYWRlcih4KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfaGVhZGVyX3gpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVCb2R5KHgsIHkpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF9ib2R5X3ggfHwgeSAhPT0gdGhpcy5sYXN0X2JvZHlfeSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5X3N0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IHg7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUgJiYgeCAhPT0gdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh5KSB7XG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlICYmIHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZUFsbChuZXh0WCwgbmV4dFkpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgX3Njcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zY3JvbGxEb3duKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBlbmQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggbikgd2UgdHJ1bmNhdGUgYW55IHNjcm9sbCBhdHRlbXB0cyAgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzIC0gMSAmJiB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID49IHRoaXMueV9tYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgdG9wIHBvc2l0aW9uIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgKGJlbG93IHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgKyB0aGlzLnJvd19lbmRfaW5kZXggKyAxID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gKFxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAodGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPT09IDAgPyAwIDogMSkpXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIF9oYW5kbGVNb3ZlSW50ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWCA9PT0gMCAgICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmRlbHRhX3ggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5kZWx0YV95ID0gICBldmVudC5kZWx0YU1vZGUgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChldmVudC5kZWx0YVksIDEwKSAqIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgICAgICAgIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID8gdGhpcy54IDogdGhpcy54IC0gdGhpcy5kZWx0YV94O1xuICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueF9zY3JvbGxfbG9ja2VkID8gdGhpcy55IDogdGhpcy55IC0gdGhpcy5kZWx0YV95O1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeCA8IHRoaXMueF9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy54X21heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG5lZ2F0ZSB0aGUgdmVydGljYWwgbW92ZW1lbnQsIG5vdCBlbm91Z2ggcm93cyB0byBmaWxsIHRoZSBib2R5ICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA8IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID4gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBhcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLl90cmFuc2xhdGVCb2R5KGluc3RhbmNlLngsIGluc3RhbmNlLnkpO1xuXG4gICAgICAgIH0sIDEwMCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSB0aGlzLl9jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgoKTtcblxuICAgICAgICAvKiBxdWV1ZSB1cCB0cmFuc2xhdGlvbnMgYW5kIHRoZSBicm93c2VyIHdpbGwgZXhlY3V0ZSB0aGVtIGFzIGFibGUsIG5lZWQgdG8gcGFzcyBpbiB0aGUgdmFsdWVzIHRoYXQgd2lsbCBjaGFuZ2UgZHVlIHRvIG1vcmUgX2hhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUFsbChuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgX2hhbmRsZVRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIHdlIGhhbmRsZSB0b3VjaG1vdmUgYnkgZGV0ZWN0aW5nIHRoZSBkZWx0YSBvZiBwYWdlWC9ZIGFuZCBmb3J3YXJkaW5nXG4gICAgICAgIGl0IHRvIF9oYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWCAtIHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSAtIHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSB0aGlzLnRvdWNoLnBhZ2VZO1xuICAgIH1cblxuICAgIF9oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSBYX1NDUk9MTF9UUkFDSykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gsIGV2ZW50LnBhZ2VYIC0gdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnRcbiAgICAgICAgICAgICkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW9cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgIH1cblxuICAgIF9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSBZX1NDUk9MTF9UUkFDSykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcFxuICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIF9oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIF9oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiBhZGp1c3RzIGZvciB0aGUgcGl4ZWwgZGlzdGFuY2UgYmV0d2VlbiB3aGVyZSB0aGUgaGFuZGxlIGlzIGNsaWNrZWQgYW5kIHRoZSB0b3AgZWRnZSBvZiBpdDsgdGhlIGhhbmRsZSBpcyBwb3NpdGlvbmVkIGFjY29yZGluZyB0byBpdHMgdG9wIGVkZ2UgKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbF9vZmZzZXQgPSBldmVudC5vZmZzZXRZO1xuXG4gICAgICAgIHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRHJhZ01vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnX3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kcmFnX3RpbWVyKTsgfVxuXG4gICAgICAgICAgICAvKiB4LWF4aXMgZG9lc24ndCBuZWVkIHRocm90dGxlIHByb3RlY3Rpb24gc2luY2UgaXQgZG9lc24ndCBjYXVzZSBhIHJvdyBmZXRjaCAqL1xuICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvKiBOb3cgZmV0Y2gsIG9uY2UgZHJhZyBoYXMgY2Vhc2VkIGZvciBsb25nIGVub3VnaC4gKi9cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5jLmdldFJvdyhyb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wIC0gdGhpcy55X3Njcm9sbF9vZmZzZXRcbiAgICAgICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNvbHVtblJlc2l6ZShldmVudC5wYWdlWCAtIHRoaXMubGFzdF9jb2x1bW5feCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VubG9ja0RyYWdUb1Njcm9sbCgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgX2hhbmRsZURyYWdFbmQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLl91bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUNvbHVtbkRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZncodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCkge1xuICAgICAgICB0aGlzLmMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgLy8gdGhlIHByb3ZpZGVkIGNvbmZpZyBvYmplY3RzXG4gICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgICAvLyB0aGUgY29sdW1uIG5vZGVzXG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgIGlmICh0aGlzLmMub25Db2x1bW5SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuYy5vbkNvbHVtblJlc2l6ZSh0aGlzLmNvbHVtbnNbaW5kZXhdLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuXG4gICAgICAgIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwICYmIHRoaXMucm93X3cgKyB0aGlzLnggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IGFkanVzdGVkX2RlbHRhO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZ3KHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIF9jaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgodGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA8IDAgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPiAwICYmIHRoaXMuYWN0aXZlX3JvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKiBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd24gaW4gdGhlIHZpZXdwb3J0LiAqL1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICggICAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID4gdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IDwgdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2NoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIF9oYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCBnZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEgLy8gYWxyZWFkeSBrZXlpbmcgdGhyb3VnaCB0aGUgdGFibGVcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5hY3RpdmVfcm93ID09PSAtMSAmJiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCkgLy8gYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB0aGUgYWN0aXZlIHJvdyBvbiB0aGUgdG9wbW9zdCByb3cgaW4gdGhlIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VBY3RpdmVSb3codGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcGFkZGluZ19yb3dzICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2Rpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgY29uc3Qgbm9kZU1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1cpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoQ0VMTCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1cpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5yb3cgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVNYXA7XG4gICAgfVxuXG4gICAgX2hhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuX2Rpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZ3KHRoaXMucm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3dJbmRleChyb3cuc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobWFwLmNlbGwgJiYgdGhpcy5jLmNlbGxDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jLnJvd0NsaWNrRnVuYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5yb3dDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgQVBJc1xuXG4gICAgZ2V0QWN0aXZlUm93SW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZV9yb3cgPiAtMSA/IHRoaXMuYWN0aXZlX3JvdyA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3dJbmRleChzZXRJbmRleCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSBzZXRJbmRleDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2ZVJvd0luZGV4KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSAtMTtcbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0WEFtb3VudFNjcm9sbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54O1xuICAgIH1cblxuICAgIGdldFlBbW91bnRTY3JvbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcbiAgICB9XG5cbiAgICBqdW1wVG9Sb3dJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnkgPSAwO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gaW5kZXggKiB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgoaW5kZXgpO1xuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoY29uZmlnID0gdGhpcy5jKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IHRoaXMuYykgeyB0aGlzLl9wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgLyogc3RvcmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB1bmlvbiBmb3IgaWYgd2UgbmVlZCB0byByZWh5ZHJhdGUgdGhlIHByZXZpb3VzIHNjcm9sbCBzdGF0ZSAqL1xuICAgICAgICB0aGlzLl9feCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5fX3kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleDtcblxuICAgICAgICB0aGlzLl9yZXNldEludGVybmFscygpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fYnVpbGRDb2x1bW5zKCk7XG5cbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA/IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggfHwgMCA6IDA7XG5cbiAgICAgICAgdGhpcy5faW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSBNYXRoLmNlaWwodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCkgKyB0aGlzLm5fcGFkZGluZ19yb3dzO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c19yZW5kZXJlZCA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gdGhpcy5jLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSBNYXRoLmZsb29yKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgLSAxO1xuXG4gICAgICAgIHRoaXMuX2luamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuX2luamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlICYmIHRoaXMuX194ICE9PSBudWxsICYmIHRoaXMuX195ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLyogdGhlIGNhY2hlZCB2YWx1ZXMgYXJlIHRoZW4gYXBwbGllZCBhZ2FpbnN0IHRoZSB0YWJsZSB0byBhcnJpdmUgYXQgdGhlIHByZXZpb3VzIHN0YXRlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAtdGhpcy5fX3gsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogLXRoaXMuX195LFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2hhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUtleURvd24pO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLl9oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5fZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWNcbiAqIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBvc3NpYmlsaXRpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHBvc3NpYmlsaXRpZXNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIl19
