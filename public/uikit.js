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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (typeof child !== 'string' && typeof child.props.onFocus === 'function') {
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
        return _react2.default.createElement(this.props.component, _extends({}, (0, _lodash2.default)(this.props, UIArrowKeyNavigation.internal_keys), {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_UIView3.default);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.internal_keys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"26":26,"33":33}],2:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            if (_this.props.disabled) {
                return;
            }

            _this.toggleState(event);

            if (typeof _this.props.onClick === 'function') {
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

            if (typeof _this.props.onKeyDown === 'function') {
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
            _extends({}, (0, _lodash2.default)(this.props, UIButton.internal_keys), {
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
UIButton.internal_keys = Object.keys(UIButton.propTypes);
UIButton.defaultProps = {
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};
exports.default = UIButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"26":26,"28":28,"33":33}],3:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(25);

var _uuid2 = _interopRequireDefault(_uuid);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.id = (0, _uuid2.default)(), _this.handleChange = function (event) {
            // Send the opposite signal from what was passed to toggle the data
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.props[!_this.props.inputProps.checked ? 'onChecked' : 'onUnchecked'](_this.props.inputProps.name);

            if (typeof _this.props.inputProps.onChange === 'function') {
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleClick = function (event) {
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.refs.input.focus();

            if (typeof _this.props.inputProps.onClick === 'function') {
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
            _extends({}, (0, _lodash2.default)(this.props, UICheckbox.internal_keys), {
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
UICheckbox.internal_keys = Object.keys(UICheckbox.propTypes);
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

},{"21":21,"25":25,"26":26,"28":28,"33":33}],4:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

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
            _extends({}, (0, _lodash2.default)(this.props, UICheckboxGroup.internal_keys), {
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
UICheckboxGroup.internal_keys = Object.keys(UICheckboxGroup.propTypes);
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

},{"21":21,"26":26,"28":28,"3":3,"33":33}],5:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(25);

var _uuid2 = _interopRequireDefault(_uuid);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.uuid_header = (0, _uuid2.default)(), _this.uuid_body = (0, _uuid2.default)(), _this.handleFocus = function (nativeEvent) {
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

        return this.$dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                id: this.props.bodyProps.id || this.uuid_body,
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
                    id: this.props.headerProps.id || this.uuid_header,
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
            _cx4;

        return _react2.default.createElement(
            'div',
            null,
            this.renderFocusBoundary(),
            _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash2.default)(this.props, UIDialog.internal_keys), {
                    ref: function ref(node) {
                        return _this2.$dialog = node;
                    },
                    className: (0, _classnames2.default)((_cx4 = {
                        'ui-dialog': true
                    }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                    onKeyDown: this.handleKeyDown,
                    role: 'dialog',
                    'aria-labelledby': this.uuid_header,
                    'aria-describedby': this.uuid_body,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            ),
            this.renderFocusBoundary()
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
    closeOnOutsideScroll: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func
};
UIDialog.internal_keys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default
};
exports.default = UIDialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"26":26,"28":28,"33":33}],6:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            _extends({}, (0, _lodash2.default)(this.props, UIFittedText.internal_keys), {
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
UIFittedText.internal_keys = Object.keys(UIFittedText.propTypes);
exports.default = UIFittedText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"26":26,"28":28,"33":33}],7:[function(require,module,exports){
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

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            _extends({}, (0, _lodash2.default)(this.props, UIImage.internal_keys), {
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
UIImage.internal_keys = Object.keys(UIImage.propTypes);
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};
exports.default = UIImage;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"26":26,"28":28,"33":33}],8:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

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
            _extends({}, (0, _lodash2.default)(props, UIModal.internal_keys), {
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
}(_UIView3.default);

UIModal.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    maskProps: _react2.default.PropTypes.object,
    modalProps: _react2.default.PropTypes.object
});
UIModal.internal_keys = Object.keys(UIModal.propTypes);
UIModal.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {}
});
exports.default = UIModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"20":20,"26":26,"28":28,"33":33,"5":5}],9:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require(14);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(25);

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
                _extends({}, (0, _lodash2.default)(this.props, Item.internal_keys), { className: this.getClasses() }),
                this.props.loadingContent
            );
        }

        var jsx = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

        return _react2.default.cloneElement(jsx, _extends({}, (0, _lodash2.default)(this.props, Item.internal_keys), {
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
Item.internal_keys = Object.keys(Item.propTypes);

var UIPagination = function (_UIView) {
    _inherits(UIPagination, _UIView);

    function UIPagination() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this2), _this2.state = {
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
                content: typeof this.props.showPaginationState === 'function' ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
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
            _extends({}, (0, _lodash2.default)(this.props, UIPagination.internal_keys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-pagination-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPagination;
}(_UIView3.default);

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
UIPagination.internal_keys = Object.keys(UIPagination.propTypes);
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

},{"1":1,"14":14,"21":21,"25":25,"26":26,"28":28,"33":33}],10:[function(require,module,exports){
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

var _lodash3 = require(34);

var _lodash4 = _interopRequireDefault(_lodash3);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _transformProperty = require(24);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

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

            var x = Math.round(_this.getNextXPosition(anchor, _this.$dialog));
            var y = Math.round(_this.getNextYPosition(anchor, _this.$dialog));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(_this.$dialog, x, y);

            if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
                return _this.setState(alignmentCorrection, function () {
                    return _this.componentDidUpdate();
                });
            }

            _this.applyTranslation(_this.$dialog, x, y);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPopover.prototype.updateDialogInternalCache = function updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog;
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderDialog();
        this.align();
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

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

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _lodash2.default)(this.props, UIPopover.internal_keys), {
            className: (0, _classnames2.default)((_cx = {
                'ui-popover': true
            }, _cx['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx[this.props.className] = !!this.props.className, _cx)),
            style: _extends({}, this.props.style, {
                position: 'absolute',
                top: '0px',
                left: '0px'
            }) })), this.$container));
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
UIPopover.internal_keys = _lodash4.default.apply(undefined, [Object.keys(UIPopover.propTypes)].concat(Object.keys(_UIDialog2.default.propTypes)));
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: false,
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    anchorXAlign: UIPopover.position.START,
    anchorYAlign: UIPopover.position.END,
    autoReposition: true,
    selfXAlign: UIPopover.position.START,
    selfYAlign: UIPopover.position.START
});
exports.default = UIPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"24":24,"26":26,"28":28,"33":33,"34":34,"5":5}],11:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            _extends({}, (0, _lodash2.default)(this.props, UIProgress.internal_keys), {
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

UIProgress.propTypes = {
    cancelProps: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.node,
    labelProps: _react2.default.PropTypes.object,
    onCancel: _react2.default.PropTypes.func,
    progress: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    progressProps: _react2.default.PropTypes.object,
    tweenProperty: _react2.default.PropTypes.string
};
UIProgress.internal_keys = Object.keys(UIProgress.propTypes);
UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};
exports.default = UIProgress;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"26":26,"28":28,"33":33}],12:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            _extends({}, (0, _lodash2.default)(this.props, UIProgressiveDisclosure.internal_keys), {
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
UIProgressiveDisclosure.internal_keys = Object.keys(UIProgressiveDisclosure.propTypes);
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"26":26,"28":28,"33":33}],13:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(25);

var _uuid2 = _interopRequireDefault(_uuid);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.uuid = (0, _uuid2.default)(), _this.handleChange = function (event) {
            if (event.target.checked) {
                _this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if (typeof _this.props.inputProps.onChange === 'function') {
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
            _extends({}, (0, _lodash2.default)(this.props, UIRadio.internal_keys), {
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
UIRadio.internal_keys = Object.keys(UIRadio.propTypes);
UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: _noop2.default,
    selected: false
};
exports.default = UIRadio;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"21":21,"25":25,"26":26,"28":28,"33":33}],14:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

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
            option.onBlur(event);
        }
    };

    UISegmentedControl.prototype.handleOptionClick = function handleOptionClick(option, event) {
        this.props.onOptionSelected(option.value);

        if (typeof option.onClick === 'function') {
            option.onClick(event);
        }
    };

    UISegmentedControl.prototype.handleOptionFocus = function handleOptionFocus(option, event) {
        this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

        if (typeof option.onFocus === 'function') {
            option.onFocus(event);
        }
    };

    UISegmentedControl.prototype.renderOptions = function renderOptions() {
        var _this2 = this;

        return this.props.options.map(function (definition, index) {
            var _cx;

            return _react2.default.createElement(
                _UIButton2.default,
                _extends({}, (0, _lodash2.default)(definition, UISegmentedControl.internal_child_keys), {
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
            _extends({}, (0, _lodash2.default)(this.props, UISegmentedControl.internal_keys), {
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
UISegmentedControl.internal_keys = Object.keys(UISegmentedControl.propTypes);
UISegmentedControl.internal_child_keys = ['content', 'value', 'selected'];
UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: _noop2.default
};
exports.default = UISegmentedControl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"21":21,"26":26,"28":28,"33":33}],15:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for Table.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function didColumnsChange(current_columns, prev_columns, table_internal_columns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (current_columns.length !== prev_columns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return current_columns.some(function (column, index) {
        return column.mapping !== prev_columns[index].mapping || column.title !== prev_columns[index].title || column.resizable !== prev_columns[index].resizable || column.width !== table_internal_columns[index].width;
    });
}

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

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prev_props) {
        var props = this.props;

        var changed_props = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prev_props[key]) {
                changed_props.push(key);
            }
        }

        for (key in prev_props) {
            if (prev_props[key] !== props[key] && changed_props.indexOf(key) === -1) {
                changed_props.push(key);
            }
        }

        if (changed_props.length) {
            if (changed_props.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changed_props.length === 1 && changed_props[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prev_props.columns, this.table.columns) === false) {
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
            _extends({}, (0, _lodash2.default)(this.props, UITable.internal_keys), {
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
    totalRows: _react.PropTypes.number
};
UITable.internal_keys = Object.keys(UITable.propTypes);
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"26":26,"29":29,"33":33}],16:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ is_focused: true });

            if (is_function(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come exclusively via props (cWRP)
            // so it exactly mirrors the current application state, otherwise a re-render will occur before
            // the new text has completed its feedback loop and the cursor position is lost
            if (_this.state.is_controlled === false) {
                _this.setState({ input: event.target.value });
            }

            if (is_function(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
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
            _extends({}, (0, _lodash2.default)(props, UITextualInput.internal_keys), {
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
}(_UIView3.default);

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
UITextualInput.internal_keys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"26":26,"28":28,"33":33}],17:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

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
        }, _this.handleInputClick = function (event) {
            _this.clearSelection();

            if (typeof _this.props.inputProps.onClick === 'function') {
                _this.props.inputProps.onClick(event);
            }
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if (typeof _this.props.inputProps.onFocus === 'function') {
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
            _extends({}, (0, _lodash2.default)(this.props, UITokenizedInput.internal_keys), {
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
}(_UIView3.default);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokenCloseComponent: _react2.default.PropTypes.element,
    tokenCloseVisible: _react2.default.PropTypes.bool,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)
});
UITokenizedInput.internal_keys = Object.keys(UITokenizedInput.propTypes);
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

},{"19":19,"20":20,"21":21,"26":26,"28":28,"33":33}],18:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

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
            _extends({}, (0, _lodash2.default)(this.props, UITooltip.internal_keys), {
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
UITooltip.internal_keys = Object.keys(UITooltip.propTypes);
UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE
};
exports.default = UITooltip;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"26":26,"28":28,"33":33}],19:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _extractChildProps = require(20);

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _noop = require(21);

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require(25);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
            this.setState({ input: nextProps.inputProps.value || '' });
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
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this2.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
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
            _extends({}, (0, _lodash2.default)(props, UITypeaheadInput.internal_keys), {
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
UITypeaheadInput.internal_keys = Object.keys(UITypeaheadInput.propTypes);
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
        id: (0, _uuid2.default)(),
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

    this.setValue = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

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

    this.handleChange = function (event) {
        if (_this3.state.is_controlled === false) {
            _this3.setState({ input: event.target.value || '' }, function () {
                return _this3.computeMatches();
            });
        }

        if (typeof _this3.props.inputProps.onChange === 'function') {
            _this3.props.inputProps.onChange(event);
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
                    _this3.props.onComplete(_this3.state.input, event);
                }

                break;
        }

        if (typeof _this3.props.onKeyDown === 'function') {
            _this3.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"16":16,"20":20,"21":21,"25":25,"26":26,"28":28,"32":32,"33":33}],20:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _shallowEqual = require(23);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _uuid2 = require(25);

var _uuid3 = _interopRequireDefault(_uuid2);

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

    UIView.prototype.uuid = function uuid() {
        if (this.uuid_warning === undefined) {
            this.uuid_warning = true;

            console.warn('Use of UIView.prototype.uuid() is deprecated and will be removed in a future release. Please switch to using UIUtils/uuid instead.');

            return (0, _uuid3.default)();
        }
    };

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

},{"23":23,"25":25}],27:[function(require,module,exports){
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
        notify: global.UIKit.UIUtils.notify = require(22).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(24).default,
        uuid: global.UIKit.UIUtils.uuid = require(25).default
    },
    UIView: global.UIKit.UIView = require(26).default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"20":20,"22":22,"24":24,"25":25,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
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
}(); /**
      * A high-performance, infinite table view.
      */

var _findWhere = require(30);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _transformProperty = require(31);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this.getTextToBeRendered());
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

            this.columns.forEach(function (column, index) {
                var width = column.width || 0;
                var cellWidth = void 0;

                _this4.rows.forEach(function (row) {
                    if (!(row.data instanceof Promise) && row.data !== null) {
                        cellWidth = row.cells[index].node.getBoundingClientRect().width;
                        width = width < cellWidth ? cellWidth : width;
                    }
                }); /* find the rendered row with the longest content entry */

                _this4._applyNewColumnWidth(index, width);
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
            this._calculateColumnWidths();
            this._injectHeaderCells();

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
            var _this7 = this;

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
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
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
 * @param {Array} [array] The array to search.
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
 * @param {Array} [array] The array to search.
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
 * @param {Array} array The array to search.
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
 * @param {Array} array The array to search.
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
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
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
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

/**
 * Creates a function that invokes `func` with its first argument transformed.
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
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Reflect = root.Reflect,
    Symbol = root.Symbol,
    enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf,
    nativeGetSymbols = Object.getOwnPropertySymbols,
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
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
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
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
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
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

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
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
var getPrototype = overArg(nativeGetPrototype, Object);

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
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

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
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
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
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
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
  return value != null && isLength(getLength(value)) && !isFunction(value);
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
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
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
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
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
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
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
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
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
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
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
 * @param {Array} [array] The array to search.
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
 * @param {Array} [array] The array to search.
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
 * @param {Array} array The array to search.
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
 * @param {Array} array The array to search.
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
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
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
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
 * @param {Array} array The array to search.
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
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

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
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
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
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
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
  return value != null && isLength(getLength(value)) && !isFunction(value);
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
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
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
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRpb24vaW5kZXguanMiLCJVSVBvcG92ZXIvaW5kZXguanMiLCJVSVByb2dyZXNzL2luZGV4LmpzIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCJVSVJhZGlvL2luZGV4LmpzIiwiVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiVUlUYWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCJVSVV0aWxzL3NoYWxsb3dFcXVhbC9pbmRleC5qcyIsIlVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHkvaW5kZXguanMiLCJVSVV0aWxzL3V1aWQvaW5kZXguanMiLCJVSVZpZXcvaW5kZXguanMiLCJleHBvcnRzLmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZW5pZ21hLXRhYmxlL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL3V0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbmlnbWEtdGFibGUvc3JjL3V0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5vbWl0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC53aXRob3V0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCLG9COzs7Ozs7Ozs7Ozs7MElBY2pCLEssR0FBUTtBQUNKLDhCQUFrQjtBQURkLFMsUUFnRFIsYSxHQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixvQkFBUSxNQUFNLEdBQWQ7QUFDQSxxQkFBSyxTQUFMO0FBQ0EscUJBQUssV0FBTDtBQUNJLDBCQUFNLGNBQU47QUFDQSwwQkFBSyxTQUFMLENBQWUsQ0FBQyxDQUFoQjtBQUNBOztBQUVKLHFCQUFLLFdBQUw7QUFDQSxxQkFBSyxZQUFMO0FBQ0ksMEJBQU0sY0FBTjtBQUNBLDBCQUFLLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUFYSjs7QUFjQSxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFNBQWxCLEtBQWdDLFVBQXBDLEVBQWdEO0FBQzVDLHNCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0g7QUFDSixTOzs7bUNBOURELGtCLCtCQUFtQixTLEVBQVcsUyxFQUFXO0FBQ3JDLFlBQUksS0FBSyxLQUFMLENBQVcsZ0JBQVgsS0FBZ0MsSUFBcEMsRUFBMEM7QUFDdEMsZ0JBQU0sY0FBZ0IsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUNDLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixLQUFLLEtBQUwsQ0FBVyxRQUFsQyxDQUFELENBQThDLE1BRDlDLEdBRUEsQ0FGdEI7O0FBSUEsZ0JBQUksZ0JBQWdCLENBQXBCLEVBQXVCO0FBQ25CLHFCQUFLLFFBQUwsQ0FBYyxFQUFDLGtCQUFrQixJQUFuQixFQUFkLEU7QUFDSCxhQUZELE1BRU8s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QUFDVjtBLEFBakJjLENBQUM7OztBQ05oQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNwaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlBcnJvd0tleU5hdmlnYXRpb24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlBcnJvd0tleU5hdmlnYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxfa2V5cyksXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH07XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQnV0dG9uLmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICAgIGxhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcy5pbnB1dFByb3BzLCAnaW5kZXRlcm1pbmF0ZScpfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfVxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5nZXRBcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94LmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0QWxsOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICB9XG5cbiAgICBhbGxJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveEdyb3VwLmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBib2R5UHJvcHM6IHt9LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgICAgICBoZWFkZXJQcm9wczoge30sXG4gICAgICAgIG9uQ2xvc2U6IG5vb3AsXG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tzIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICB1dWlkX2hlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRfYm9keSA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiRkaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVTY3JvbGwgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZF9ib2R5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuaWQgfHwgdGhpcy51dWlkX2hlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlEaWFsb2cuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRfaGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRfYm9keX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuZnVuY3Rpb24gcmVzY2FsZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgaWYgKGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94JyB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKGluc3RhbmNlLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbF9rZXlzKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlJbWFnZS5pbnRlcm5hbF9rZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgfVxuXG4gICAgdXBkYXRlSW50ZXJuYWxNb2RhbENhY2hlKGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlck1vZGFsKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICB0aGlzLnVwZGF0ZUludGVybmFsTW9kYWxDYWNoZShcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICwgdGhpcy4kY29udGFpbmVyKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IC8+KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgdXRpbGl0eSB2aWV3IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zIG9mIHZhcnlpbmcgc2l6ZXMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0aW9uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGV2ZW46IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKEl0ZW0ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbF9rZXlzKX0gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGpzeCA9IHRoaXMucHJvcHMuZGF0YVRvSlNYQ29udmVydGVyRnVuYyh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoanN4LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxfa2V5cyksXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyhqc3gucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBjb250cm9scyA9IHtcbiAgICAgICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgICAgICBORVhUOiAnTkVYVCcsXG4gICAgICAgIExBU1Q6ICdMQVNUJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25zID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjdXN0b21Db250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGdldEl0ZW06IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgICAgICBpbml0aWFsUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVJbml0aWFsUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLmluaXRpYWxQYWdlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93UGFnaW5hdGlvblN0YXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogZmFsc2UsXG4gICAgICAgIGluaXRpYWxQYWdlOiAxLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBkYXRhID0+IGRhdGEsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlLFxuICAgICAgICB0YXJnZXRJbmRleDogKHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlID0gKCkgPT4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuICAgIGdldFBhZ2VGb3JJbmRleCA9IChpbmRleCwgaXRlbXNQZXJQYWdlID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpID0+IE1hdGguY2VpbCgoaW5kZXggKyAxKSAvIGl0ZW1zUGVyUGFnZSlcbiAgICB0b3RhbFBhZ2VzID0gKCkgPT4gTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKVxuXG4gICAgZmlyc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4gKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2VcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAocHJldlN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKCkpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICBjb25zdCBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgLy8gdXNlIHRyYW5zYWN0aW9uYWwgYHNldFN0YXRlKClgIHN5bnRheCB0byBlbnN1cmUgdGhhdCBwZW5kaW5nIHN0YXRlIHVwZGF0ZXMgYXJlIGhvbm9yZWQsXG4gICAgICAgIC8vIGxpa2UgdGhvc2UgZnJvbSBgcGFnZVRvSW5kZXgoKWBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFOiBgcHJvcHNgIGhlcmUgaXMgdGVjaG5pY2FsbHkgdGhlIGBuZXh0UHJvcHNgIHlvdSdkIHJlY2VpdmUgZnJvbSB0aGUgZmlyc3QgY1dSUCBhcmd1bWVudFxuICAgICAgICAgICAgLy8gc28gdGhhdCdzIHdoeSB3ZSdyZSBjYWNoaW5nIGBvbGRQcm9wc2Agb3V0c2lkZSB0aGUgYHNldFN0YXRlYFxuICAgICAgICAgICAgaWYgKHByb3BzLmlkZW50aWZpZXIgIT09IG9sZFByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoc3RhdGUudGFyZ2V0SW5kZXgsIHByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IHN0YXRlLnRhcmdldEluZGV4LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZVRvSW5kZXggPSBpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAgIHR5cGVvZiB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM9e3RoaXMucHJvcHMuaXRlbVRvSlNYQ29udmVydGVyRnVuY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbl9sb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uX2NhcGl0YWxpemVkID0gcG9zaXRpb25fbG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uX2xvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uX2NhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25fbG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbi8qXG4gICAgQSBudWFuY2UgYWJvdXQgdGhpcyBjb21wb25lbnQ6IHNpbmNlIGl0IG9ubHkgcmVuZGVycyBhIHNpbXBsZSA8ZGl2PiwgdGhlIG1haW4gcmVuZGVyKCkgZnVuY3Rpb25cbiAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICBhIGZ1bGwgcmUtcmVuZGVyIG9mIHRoZSBjaGlsZCBkaWFsb2cuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IHdpdGhvdXQgZnJvbSAnbG9kYXNoLndpdGhvdXQnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGZYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSB3aXRob3V0KE9iamVjdC5rZXlzKFVJUG9wb3Zlci5wcm9wVHlwZXMpLCAuLi5PYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhbmNob3JYQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWEFsaWduLFxuICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgIHNlbGZZQWxpZ246IHRoaXMucHJvcHMuc2VsZllBbGlnbixcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nID0gaW5zdGFuY2U7XG4gICAgICAgIHRoaXMuJGRpYWxvZyA9IGluc3RhbmNlLiRkaWFsb2c7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIHRoaXMuJGRpYWxvZykpO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRZUG9zaXRpb24oYW5jaG9yLCB0aGlzLiRkaWFsb2cpKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLiRkaWFsb2csIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kZGlhbG9nLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3MucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzLmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbF9rZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlSYWRpby5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9XG5cbiAgICB1dWlkID0gdXVpZCgpXG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzKVxuICAgIHN0YXRpYyBpbnRlcm5hbF9jaGlsZF9rZXlzID0gW1xuICAgICAgICAnY29udGVudCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgXVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxfY2hpbGRfa2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZS5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnZW5pZ21hLXRhYmxlJztcblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuXG5mdW5jdGlvbiBkaWRDb2x1bW5zQ2hhbmdlKGN1cnJlbnRfY29sdW1ucywgcHJldl9jb2x1bW5zLCB0YWJsZV9pbnRlcm5hbF9jb2x1bW5zKSB7XG4gICAgLypcbiAgICAgICAgMS4gdGhlcmUgc2hvdWxkIGJlIHRoZSBzYW1lIG51bWJlciBvZiBjb2x1bW5zXG4gICAgICAgIDIuIHRoZSBjb2x1bW5zIHNob3VsZCBleGFjdGx5IG1hdGNoIGluIHRoZSBwcm9wZXIgb3JkZXJcbiAgICAgICAgMy4gZWFjaCBjb2x1bW4gcHJvcGVydHkgc2hvdWxkIGJlIGV4YWN0bHkgdGhlIHNhbWVcbiAgICAgKi9cblxuICAgIGlmIChjdXJyZW50X2NvbHVtbnMubGVuZ3RoICE9PSBwcmV2X2NvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRpZCB0aGUgY29sdW1uIGRlc2NyaXB0b3JzIGNoYW5nZSBpbiBzb21lIHdheSwgb3IgZGlkIHRoZSB3aWR0aCBjaGFuZ2U/XG4gICAgLy8gdGhpcyB3aWxsIGFsc28gY2F0Y2ggaWYgdGhlIG9yZGVyIG9mIHRoZSBjb2x1bW5zIGNoYW5nZWQgd2hlbiBjb21wYXJpbmdcbiAgICAvLyB0aGUgbWFwcGluZyBwcm9wZXJ0eVxuICAgIHJldHVybiBjdXJyZW50X2NvbHVtbnMuc29tZSgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gICAgY29sdW1uLm1hcHBpbmcgIT09IHByZXZfY29sdW1uc1tpbmRleF0ubWFwcGluZ1xuICAgICAgICAgICAgICAgfHwgY29sdW1uLnRpdGxlICE9PSBwcmV2X2NvbHVtbnNbaW5kZXhdLnRpdGxlXG4gICAgICAgICAgICAgICB8fCBjb2x1bW4ucmVzaXphYmxlICE9PSBwcmV2X2NvbHVtbnNbaW5kZXhdLnJlc2l6YWJsZVxuICAgICAgICAgICAgICAgfHwgY29sdW1uLndpZHRoICE9PSB0YWJsZV9pbnRlcm5hbF9jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUm93SW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG90YWxSb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlUYWJsZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjbGFzc05hbWU6ICcnLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRydWUsXG4gICAgfVxuXG4gICAgZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICByb3dDbGlja0Z1bmM6IHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdCxcbiAgICAgICAgICAgIGNlbGxDbGlja0Z1bmM6IHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QsXG4gICAgICAgICAgICBvbkNvbHVtblJlc2l6ZTogdGhpcy5wcm9wcy5vbkNvbHVtblJlc2l6ZSxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0aGlzLnByb3BzLnByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBjaGFuZ2VkX3Byb3BzID0gW107XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgLyogYmlkaXJlY3Rpb25hbCBrZXkgY2hhbmdlIGRldGVjdGlvbiAqL1xuXG4gICAgICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSAhPT0gcHJldl9wcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZF9wcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGtleSBpbiBwcmV2X3Byb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJldl9wcm9wc1trZXldICE9PSBwcm9wc1trZXldICYmIGNoYW5nZWRfcHJvcHMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRfcHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZF9wcm9wcy5pbmRleE9mKCdqdW1wVG9Sb3dJbmRleCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8qIGp1bXBUb1Jvd0luZGV4IGFscmVhZHkgdHJpZ2dlcnMgYSByZWdlbmVyYXRpb24sIGp1c3QgYXZvaWRpbmcgcnVubmluZyBpdCB0d2ljZSAqL1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMubGVuZ3RoID09PSAxICYmIGNoYW5nZWRfcHJvcHNbMF0gPT09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgIC8qIGRpZCB0aGluZ3MgbWF0ZXJpYWxseSBjaGFuZ2UsIG9yIGp1c3QgdXBkYXRpbmcgYSBjb2x1bW4gd2lkdGg/ICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZENvbHVtbnNDaGFuZ2UocHJvcHMuY29sdW1ucywgcHJldl9wcm9wcy5jb2x1bW5zLCB0aGlzLnRhYmxlLmNvbHVtbnMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclhTY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyWVNjcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBcmlhKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVGFibGUuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclhTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJZU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJpYSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuY29uc3QgaXNfZnVuY3Rpb24gPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNfc3RyaW5nID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc19jb250cm9sbGVkOiBpc19zdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNfZm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCAnJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgJyd9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogbmV4dF9wcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5maWVsZC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXh0X3ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ1VJVGV4dHVhbElucHV0OiBhIGNvbnRyb2xsZWQgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGJ5IGNoYW5naW5nIGl0cyBgcHJvcHMudmFsdWVgIG9yIGBwcm9wcy5pbnB1dFByb3BzLnZhbHVlYCwgbm90IHZpYSBwcm9ncmFtbWF0aWMgbWV0aG9kcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcy5maWVsZC52YWx1ZSA9IG5leHRfdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0X3ZhbHVlfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSBldmVudCA9PiB7XG4gICAgICAgIC8vIGZvciBcImNvbnRyb2xsZWRcIiBzY2VuYXJpb3MsIHVwZGF0ZXMgdG8gdGhlIGNhY2hlZCBpbnB1dCB0ZXh0IHNob3VsZCBjb21lIGV4Y2x1c2l2ZWx5IHZpYSBwcm9wcyAoY1dSUClcbiAgICAgICAgLy8gc28gaXQgZXhhY3RseSBtaXJyb3JzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIHN0YXRlLCBvdGhlcndpc2UgYSByZS1yZW5kZXIgd2lsbCBvY2N1ciBiZWZvcmVcbiAgICAgICAgLy8gdGhlIG5ldyB0ZXh0IGhhcyBjb21wbGV0ZWQgaXRzIGZlZWRiYWNrIGxvb3AgYW5kIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbG9zdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcblxuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSVRva2VuaXplZElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogbm9vcCxcbiAgICAgICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBub29wLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6ICg8ZGl2Plg8L2Rpdj4pLFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgdG9rZW5zOiBbXSxcbiAgICAgICAgdG9rZW5zU2VsZWN0ZWQ6IFtdLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIC8vIHBhc3N0aHJvdWdocyB0byBVSVR5cGVhaGVhZElucHV0IGluc3RhbmNlIG1ldGhvZHNcbiAgICBmb2N1cyA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKVxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0SW5wdXROb2RlKClcbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFZhbHVlKClcbiAgICBzZWxlY3QgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpXG4gICAgc2V0VmFsdWUgPSB2YWx1ZSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9rZW5pemVkSW5wdXQuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRvb2x0aXAuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jb25zdCBpc19zdHJpbmcgPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcbmNvbnN0IGlzX2Z1bmN0aW9uID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ2Z1bmN0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgICdTVEFSVFNfV0lUSCc6ICdTVEFSVFNfV0lUSCcsXG4gICAgICAgICdGVVpaWSc6ICdGVVpaWScsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBhbGdvcml0aG06IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtYXRjaGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgaGludDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGhpbnRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIGlzX2NvbnRyb2xsZWQ6IGlzX3N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8ICcnfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZDtcbiAgICB9XG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHZhbHVlfSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiAgICBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZFxuICAgICAgICAgICAgICAgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzX3N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDBcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzX3N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hdGNoZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZSB8fCAnJ30sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzTmFtZV06ICEhY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgcHJvcHMgbGlzdGVkIGluIHRoZSBwcm9wVHlwZXMgb2YgYSBjaGlsZCBjb21wb25lbnRcbiAqIGUuZy4gdXNlZCBpbiBVSVR5cGVhaGVhZElucHV0IHRvIGlkZW50aWZ5IHdoaWNoIHByb3BzIGFyZSBtZWFudCBmb3IgVUlUZXh0dWFsSW5wdXRcbiAqIEBtb2R1bGUgVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wc1xuICpcbiAqIEBwYXJhbSAge09iamVjdH0gcGFyZW50UHJvcHMgICAgIHByb3BzIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNoaWxkUHJvcFR5cGVzICBwcm9wVHlwZXMgb2YgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgcHJvcHMgdG8gYmUgc3ByZWFkIGFwcGxpZWQgdG8gYSBjaGlsZCBjb21wb25lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0Q2hpbGRQcm9wcyhwYXJlbnRQcm9wcywgY2hpbGRQcm9wVHlwZXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hpbGRQcm9wVHlwZXMpLnJlZHVjZSgoY2hpbGRQcm9wcywga2V5KSA9PiB7XG4gICAgICAgIGlmIChwYXJlbnRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICBjaGlsZFByb3BzW2tleV0gPSBwYXJlbnRQcm9wc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkUHJvcHM7XG4gICAgfSwge30pO1xufVxuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuYm9keSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5oZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmljb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5vbkNsaWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4YW1wbGVcbiAqIHV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi9VSVV0aWxzL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIHV1aWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnV1aWRfd2FybmluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnV1aWRfd2FybmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVXNlIG9mIFVJVmlldy5wcm90b3R5cGUudXVpZCgpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLiBQbGVhc2Ugc3dpdGNoIHRvIHVzaW5nIFVJVXRpbHMvdXVpZCBpbnN0ZWFkLicpO1xuXG4gICAgICAgICAgICByZXR1cm4gdXVpZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwcm94aW1hdGVzIHRoZSBAbGlua3tQdXJlUmVuZGVyTWl4aW4gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9wdXJlLXJlbmRlci1taXhpbi5odG1sfSBmcm9tIEVTNSBSZWFjdC4gSW1wbGVtZW50IHNob3VsZENvbXBvbmVudFVwZGF0ZSBpbiB5b3VyIHN1YmNsYXNzIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIHRoZSBpbmNvbWluZyBwcm9wcyBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBwcm9wc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFN0YXRlIHRoZSBpbmNvbWluZyBzdGF0ZSBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBzdGF0ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgIEluZm9ybXMgUmVhY3QgdG8gcmUtcmVuZGVyIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAqICAgICAvLyBzb21lIGxvZ2ljIGhlcmUsIGV2ZW50dWFsbHkgYHJldHVybmAgdHJ1ZSBvciBmYWxzZVxuICAgICAqICAgICAvLyBjdXJyZW50IHByb3BzICYgc3RhdGUgYXJlIGF2YWlsYWJsZSBmb3IgY29tcGFyaXNvbiBhdCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW11bGF0ZXMgdGhlIChub3cgcmVtb3ZlZCkgUmVhY3QgaW50ZXJmYWNlIGBnZXRJbml0aWFsU3RhdGVgLiBJdCdzIGEgY29udmVuaWVuY2UsIGJ1dCBhbGxvd3NcbiAgICAgKiBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5IHRvIHdvcmsgd2l0aG91dCBoYXZpbmcgdG8gcHJvdmlkZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAbmFtZSBVSVZpZXcjaW5pdGlhbFN0YXRlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICAgICBpdGVtczogW11cbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKi9cbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuZ2xvYmFsLlVJS2l0LlVJVXRpbHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlBcnJvd0tleU5hdmlnYXRpb246IChnbG9iYWwuVUlLaXQuVUlBcnJvd0tleU5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJykuZGVmYXVsdCksXG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQYWdpbmF0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJUGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vVUlQYWdpbmF0aW9uJykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUZXh0dWFsSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUZXh0dWFsSW5wdXQgPSByZXF1aXJlKCcuL1VJVGV4dHVhbElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlVdGlsczoge1xuICAgICAgICBleHRyYWN0Q2hpbGRQcm9wczogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLmV4dHJhY3RDaGlsZFByb3BzID0gcmVxdWlyZSgnLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJykuZGVmYXVsdCksXG4gICAgICAgIG5vdGlmeTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLm5vdGlmeSA9IHJlcXVpcmUoJy4vVUlVdGlscy9ub3RpZnknKS5kZWZhdWx0KSxcbiAgICAgICAgdHJhbnNmb3JtUHJvcGVydHk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy50cmFuc2Zvcm1Qcm9wZXJ0eSA9IHJlcXVpcmUoJy4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eScpLmRlZmF1bHQpLFxuICAgICAgICB1dWlkOiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMudXVpZCA9IHJlcXVpcmUoJy4vVUlVdGlscy91dWlkJykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICovXG5cbmltcG9ydCBmdyBmcm9tICcuL3V0aWxzL2ZpbmRXaGVyZSc7XG5pbXBvcnQgdHAgZnJvbSAnLi91dGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmV4cG9ydCBjb25zdCBJTklUSUFMSVpFRCA9ICd1aS10YWJsZS1pbml0aWFsaXplZCc7XG5leHBvcnQgY29uc3QgSEVBREVSX0NFTEwgPSAndWktdGFibGUtaGVhZGVyLWNlbGwnO1xuZXhwb3J0IGNvbnN0IEhFQURFUl9DRUxMX0hBTkRMRSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcbmV4cG9ydCBjb25zdCBDRUxMID0gJ3VpLXRhYmxlLWNlbGwnO1xuZXhwb3J0IGNvbnN0IENFTExfRVZFTiA9ICd1aS10YWJsZS1jZWxsLWV2ZW4nO1xuZXhwb3J0IGNvbnN0IENFTExfT0REID0gJ3VpLXRhYmxlLWNlbGwtb2RkJztcbmV4cG9ydCBjb25zdCBDRUxMX0lOTkVSID0gJ3VpLXRhYmxlLWNlbGwtaW5uZXInO1xuZXhwb3J0IGNvbnN0IFJPVyA9ICd1aS10YWJsZS1yb3cnO1xuZXhwb3J0IGNvbnN0IFJPV19FVkVOID0gJ3VpLXRhYmxlLXJvdy1ldmVuJztcbmV4cG9ydCBjb25zdCBST1dfT0REID0gJ3VpLXRhYmxlLXJvdy1vZGQnO1xuZXhwb3J0IGNvbnN0IFJPV19BQ1RJVkUgPSAndWktdGFibGUtcm93LWFjdGl2ZSc7XG5leHBvcnQgY29uc3QgUk9XX0xPQURJTkcgPSAndWktdGFibGUtcm93LWxvYWRpbmcnO1xuZXhwb3J0IGNvbnN0IFhfU0NST0xMX1RSQUNLID0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJztcbmV4cG9ydCBjb25zdCBZX1NDUk9MTF9UUkFDSyA9ICd1aS10YWJsZS15LXNjcm9sbC10cmFjayc7XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcblxuLypcblxuRk9SIEZVVFVSRSBFWUVTXG5cblNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0IGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cblxuVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGUgYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuXG5fX0ltcG9ydGFudCBOb3RlX19cblxuQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cblxuXG5PUkRFUiBPRiBPUEVSQVRJT05TXG5cbjEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4yLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG5cbklmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhbiB0cnlpbmcgdG8gZGlmZi5cblxuKi9cblxuZnVuY3Rpb24gYXBwbHlEZWx0YShkZWx0YSwgbnVtKSB7XG4gICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICByZXR1cm4gbnVtIDwgMCA/IG51bSAtIGRlbHRhIDogbnVtICsgZGVsdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bSAtIGRlbHRhO1xufVxuXG5mdW5jdGlvbiBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAxOTI6XG4gICAgICAgIHJldHVybiAnRXNjYXBlJztcblxuICAgIGNhc2UgNDA6XG4gICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgIGNhc2UgMzg6XG4gICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICBjYXNlIDEzOlxuICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlM2QgKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5cbmZ1bmN0aW9uIHJlcGFyZW50Q2VsbFRleHQobm9kZSwgY29udGVudCkge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gQ0VMTF9JTk5FUjtcblxuICAgIGNvbnN0IHRleHRfbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dF9ub2RlKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gdGV4dF9ub2RlO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjZWxsLmNsYXNzTmFtZSA9IENFTEw7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKGluZGV4ICUgMiA9PT0gMCA/IENFTExfRVZFTiA6IENFTExfT0REKTtcblxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgsIGluZGV4KTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0NFTEwpO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSBIRUFERVJfQ0VMTF9IQU5ETEU7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX2NvbnRlbnQnOiBjb250ZW50LFxuICAgICAgICBnZXQgY29udGVudCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7IH0sXG4gICAgICAgIGdldFRleHRUb0JlUmVuZGVyZWQ6IGZ1bmN0aW9uIGdldFRleHRUb0JlUmVuZGVyZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50IHx8ICcnOyAvLyBkbyBub3QgcmVuZGVyIG51bGwvdW5kZWZpbmVkXG4gICAgICAgIH0sXG4gICAgICAgIHNldCBjb250ZW50KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5nZXRUZXh0VG9CZVJlbmRlcmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuZ2V0VGV4dFRvQmVSZW5kZXJlZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVXaWR0aDogZnVuY3Rpb24gdHJ1ZVdpZHRoKCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDbGFzc2VzID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugb2ZmIHRoZSBpbm5lciBjbGFzcyB3aGljaCBpcyB3aGF0IGNhdXNlcyB0aGUgc2l6aW5nIGNvbnN0cmFpbnRcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSAnJztcblxuICAgICAgICAgICAgLyogQ2FwdHVyZSB0aGUgbmV3IGFkanVzdGVkIHNpemUsIGhhdmUgdG8gdXNlIHRoZSBoYXJkIHdheSBiZWNhdXNlIC5jbGllbnRXaWR0aCByZXR1cm5zIGFuIGludGVnZXIgdmFsdWUsIHJhdGhlciB0aGFuIHRoZSBfYWN0dWFsXyB3aWR0aC4gU01ILiAqL1xuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFB1dCBldmVyeXRoaW5nIGJhY2tcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9IGNoaWxkQ2xhc3NlcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gUk9XO1xuICAgICAgICAgIHJvdy5zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoLCBpbmRleCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFJPV19BQ1RJVkUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChST1dfQUNUSVZFKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1dfQUNUSVZFKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShST1dfQUNUSVZFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChST1dfRVZFTik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFJPV19PREQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19PREQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShST1dfRVZFTik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHZhbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBnZXQgd2FpdGluZ0ZvclJlc29sdXRpb24oKSB7IHJldHVybiB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbjsgfSxcbiAgICAgICAgc2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1dfTE9BRElORykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFJPV19MT0FESU5HKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTGlzdC5jb250YWlucyhST1dfTE9BRElORykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoUk9XX0xPQURJTkcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IG51bGwgfHwgdGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVt0aGlzLl9pdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW2NvbHVtbnNbdGhpcy5faXRlcmF0b3JdLm1hcHBpbmddO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3knOiBtZXRhZGF0YS55LFxuICAgICAgICBnZXQgeSgpIHsgcmV0dXJuIHRoaXMuX3k7IH0sXG4gICAgICAgIHNldCB5KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG4gICAgcm93T2JqLmFjdGl2ZSA9IG1ldGFkYXRhLmFjdGl2ZTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSBzbyB0aGUgUHJvbWlzZSBoYW5kbGluZyBjYW4gdGFrZSBwbGFjZSBpZiBuZWVkZWQuLi5cbiAgICByb3dPYmouZGF0YSA9IG1ldGFkYXRhLmRhdGE7XG5cbiAgICByZXR1cm4gcm93T2JqO1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICByZXR1cm4gICAgdHlwZW9mIGNvbHVtbi5tYXBwaW5nID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICYmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY29sdW1uLndpZHRoID09PSAnbnVtYmVyJyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjKSB7XG4gICAgaWYgKCEoYy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGMuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBoZWFkZXJgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoYy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoY1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShjLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCAgIEFycmF5LmlzQXJyYXkoYy5jb2x1bW5zKSA9PT0gZmFsc2VcbiAgICAgICAgfHwgYy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICB8fCBjLmNvbHVtbnMuZXZlcnkodmFsaWRhdGVDb2x1bW5TaGFwZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBUYWJsZSB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgIG1hcHBpbmc6IHN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyIChvcHRpb25hbCksXG4gICAgICAgIH1gKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoYy5yb3dDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5yb3dDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjLmNlbGxDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYy5jZWxsQ2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjZWxsQ2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGMuY29sdW1uUmVzaXplRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjLmNvbHVtblJlc2l6ZUZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNvbHVtblJlc2l6ZUZ1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGMucHJlc2VydmVTY3JvbGxTdGF0ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBwcmVzZXJ2ZVNjcm9sbFN0YXRlYDsgaXQgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIHtcbiAgICBfcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGU7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbih0aGlzLmMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLmJvZHlfc3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jLmhlYWRlcjtcbiAgICAgICAgdGhpcy5oZWFkZXJfc3R5bGUgPSB0aGlzLmhlYWRlci5zdHlsZTtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLl9yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlUm93SW5kZXgoKTtcblxuICAgICAgICAvKiB1c2VkIGluIHNjcm9sbCBzdGF0ZSBwcmVzZXJ2YXRpb24gY2FsY3VsYXRpb25zICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcblxuICAgICAgICAgICAgdGhpcy5jb3B5X25vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgdGhpcy5jb3B5X25vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgdGhpcy5jb3B5X25vZGUuc3R5bGUuY2xpcCA9ICdyZWN0KDFweCwgMXB4LCAxcHgsIDFweCknO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmNvcHlfbm9kZSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb3B5aW5nIHJvd3MgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5faGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgfVxuXG4gICAgX3Jlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5jWyd5LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9ICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5jWyd4LXNjcm9sbC10cmFjayddKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnQgPSAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQWxsKCk7XG4gICAgfVxuXG4gICAgX2VtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLl9lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMuYy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uLCBpbmRleCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKSB7XG4gICAgICAgIGxldCBjcztcblxuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9pbmplY3RIZWFkZXJDZWxscygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uLm5vZGUpKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuX2NvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBfZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLnJvd3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2luamVjdEZpcnN0Um93KCkge1xuICAgICAgICB0aGlzLl9lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLnJvd19zdGFydF9pbmRleCksXG4gICAgICAgICAgICBzZXRJbmRleDogdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2goMCk7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm93c1swXS5ub2RlKTtcbiAgICB9XG5cbiAgICBfaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmb3IgKHRoaXMuaSA9IDE7IHRoaXMuaSA8IHRoaXMubl9yb3dzX3JlbmRlcmVkOyB0aGlzLmkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3csXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbF9oICogdGhpcy5pLFxuICAgICAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLmkpO1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbdGhpcy5pXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIF9hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCkge1xuICAgICAgICB0aGlzLmMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgLy8gdGhlIHByb3ZpZGVkIGNvbmZpZyBvYmplY3RzXG4gICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDsgICAgICAvLyB0aGUgY29sdW1uIG5vZGVzXG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgIGlmICh0aGlzLmMub25Db2x1bW5SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuYy5vbkNvbHVtblJlc2l6ZSh0aGlzLmNvbHVtbnNbaW5kZXhdLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVDb2x1bW5XaWR0aHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBjb2x1bW4ud2lkdGggfHwgMDtcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbaW5kZXhdLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9jYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLmNlbGxfaCA9IHRoaXMucm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLnJvd193ID0gdGhpcy5yb3dzWzBdLm5vZGUuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLnhfbWF4ID0gdGhpcy5jb250YWluZXJfdyA8PSB0aGlzLnJvd193ID8gdGhpcy5jb250YWluZXJfdyAtIHRoaXMucm93X3cgOiAwO1xuICAgIH1cblxuICAgIF9jYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMueV9taW4gPSAwO1xuICAgICAgICB0aGlzLnlfbWF4ID0gdGhpcy5ib2R5X2ggLSB0aGlzLm5fcm93c19yZW5kZXJlZCAqIHRoaXMuY2VsbF9oO1xuICAgIH1cblxuICAgIF9jYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAvIHRoaXMucm93X3cgKiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3c7XG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAgIHRoaXMubl9yb3dzX3Zpc2libGUgPT09IHRoaXMubl9yb3dzX3JlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY29udGFpbmVyX2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5jb250YWluZXJfaCAqICh0aGlzLm5fcm93c192aXNpYmxlIC8gdGhpcy5jLnRvdGFsUm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgX2luaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgdGhpcy5jb250YWluZXJfdztcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCA4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IHRoaXMuY29udGFpbmVyX2g7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlLndpZHRoID0gdGhpcy5fY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlLmhlaWdodCA9IHRoaXMuX2NhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuXG4gICAgICAgIC8qIHRvdGFsIHRyYW5zbGF0YWJsZSBzcGFjZSAvIHNjcm9sbGJhciB0cmFjayBzaXplID0gcmVsYXRpdmUgdmFsdWUgb2YgYSBzY3JvbGxiYXIgcGl4ZWwgKi9cbiAgICAgICAgdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvID0gTWF0aC5hYnModGhpcy54X21heCkgLyAodGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSk7XG5cbiAgICAgICAgLyogaG93IG1hbnkgc2Nyb2xsYmFyIHBpeGVscyA9PT0gb25lIHJvdz8gKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbyA9ICh0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplKSAvICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5uX3Jvd3NfdmlzaWJsZSk7XG5cbiAgICAgICAgLyogaGlkZSB0aGUgc2Nyb2xsYmFycyBpZiB0aGV5IGFyZSBub3QgbmVlZGVkICovXG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpIHtcbiAgICAgICAgLyogVGhlIGZhbGxiYWNrIGFtb3VudHMgYXJlIGZvciB1bml0IHRlc3RpbmcsIHRoZSBicm93c2VyIHdpbGwgYWx3YXlzIGhhdmVcbiAgICAgICAgYW4gYWN0dWFsIG51bWJlci4gKi9cbiAgICAgICAgdGhpcy5jb250YWluZXJfaCA9IHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuY29udGFpbmVyX3cgPSB0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuYm9keV9oID0gdGhpcy5jLmJvZHkuY2xpZW50SGVpZ2h0IHx8IDExMDtcbiAgICB9XG5cbiAgICBfaGFuZGxlV2luZG93UmVzaXplID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0ICE9PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgbWF5IGJlIG5lZWRlZCB0byBkaXNwbGF5IHRoZSBkYXRhLCBzbyB3ZSBuZWVkIHRvIHJlYnVpbGQgKi9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2VuZXJhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCAhPT0gdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgY29uc3Qgb2xkX3dpZHRoID0gdGhpcy5jb250YWluZXJfdztcblxuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueCAvIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyAqIC0xO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICAgICAgLy8gZ2V0dGluZyBsYXJnZXIgYW5kIHdlJ3JlIGZ1bGx5IHNjcm9sbGVkIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgaWYgKG9sZF93aWR0aCA8IHRoaXMuY29udGFpbmVyX3cgJiYgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5jb250YWluZXJfdyAtIG9sZF93aWR0aDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUhlYWRlcih0aGlzLngpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUJvZHkodGhpcy54LCB0aGlzLmxhc3RfYm9keV95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlQm9keSh4LCB5KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfYm9keV94IHx8IHkgIT09IHRoaXMubGFzdF9ib2R5X3kpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keV9zdHlsZVt0cF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh4KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlW3RwXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHBdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zbGF0ZUFsbChuZXh0WCwgbmV4dFkpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgX3Njcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zY3JvbGxEb3duKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBlbmQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggbikgd2UgdHJ1bmNhdGUgYW55IHNjcm9sbCBhdHRlbXB0cyAgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzIC0gMSAmJiB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID49IHRoaXMueV9tYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgdG9wIHBvc2l0aW9uIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgKGJlbG93IHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgKyB0aGlzLnJvd19lbmRfaW5kZXggKyAxID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gKFxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAodGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPT09IDAgPyAwIDogMSkpXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIF9oYW5kbGVNb3ZlSW50ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWCA9PT0gMCAgICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmRlbHRhX3ggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5kZWx0YV95ID0gICBldmVudC5kZWx0YU1vZGUgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChldmVudC5kZWx0YVksIDEwKSAqIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgICAgICAgIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID8gdGhpcy54IDogdGhpcy54IC0gdGhpcy5kZWx0YV94O1xuICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueF9zY3JvbGxfbG9ja2VkID8gdGhpcy55IDogdGhpcy55IC0gdGhpcy5kZWx0YV95O1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeCA8IHRoaXMueF9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy54X21heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG5lZ2F0ZSB0aGUgdmVydGljYWwgbW92ZW1lbnQsIG5vdCBlbm91Z2ggcm93cyB0byBmaWxsIHRoZSBib2R5ICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA8IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID4gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBhcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLl90cmFuc2xhdGVCb2R5KGluc3RhbmNlLngsIGluc3RhbmNlLnkpO1xuXG4gICAgICAgIH0sIDEwMCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSB0aGlzLl9jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgoKTtcblxuICAgICAgICAvKiBxdWV1ZSB1cCB0cmFuc2xhdGlvbnMgYW5kIHRoZSBicm93c2VyIHdpbGwgZXhlY3V0ZSB0aGVtIGFzIGFibGUsIG5lZWQgdG8gcGFzcyBpbiB0aGUgdmFsdWVzIHRoYXQgd2lsbCBjaGFuZ2UgZHVlIHRvIG1vcmUgX2hhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUFsbChuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgX2hhbmRsZVRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIHdlIGhhbmRsZSB0b3VjaG1vdmUgYnkgZGV0ZWN0aW5nIHRoZSBkZWx0YSBvZiBwYWdlWC9ZIGFuZCBmb3J3YXJkaW5nXG4gICAgICAgIGl0IHRvIF9oYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWCAtIHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSAtIHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSB0aGlzLnRvdWNoLnBhZ2VZO1xuICAgIH1cblxuICAgIF9oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSBYX1NDUk9MTF9UUkFDSykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gsIGV2ZW50LnBhZ2VYIC0gdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnRcbiAgICAgICAgICAgICkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW9cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgIH1cblxuICAgIF9oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSBZX1NDUk9MTF9UUkFDSykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcFxuICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIF9oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIF9oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiBhZGp1c3RzIGZvciB0aGUgcGl4ZWwgZGlzdGFuY2UgYmV0d2VlbiB3aGVyZSB0aGUgaGFuZGxlIGlzIGNsaWNrZWQgYW5kIHRoZSB0b3AgZWRnZSBvZiBpdDsgdGhlIGhhbmRsZSBpcyBwb3NpdGlvbmVkIGFjY29yZGluZyB0byBpdHMgdG9wIGVkZ2UgKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbF9vZmZzZXQgPSBldmVudC5vZmZzZXRZO1xuXG4gICAgICAgIHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRHJhZ01vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnX3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kcmFnX3RpbWVyKTsgfVxuXG4gICAgICAgICAgICAvKiB4LWF4aXMgZG9lc24ndCBuZWVkIHRocm90dGxlIHByb3RlY3Rpb24gc2luY2UgaXQgZG9lc24ndCBjYXVzZSBhIHJvdyBmZXRjaCAqL1xuICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvKiBOb3cgZmV0Y2gsIG9uY2UgZHJhZyBoYXMgY2Vhc2VkIGZvciBsb25nIGVub3VnaC4gKi9cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5jLmdldFJvdyhyb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIGFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wIC0gdGhpcy55X3Njcm9sbF9vZmZzZXRcbiAgICAgICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNvbHVtblJlc2l6ZShldmVudC5wYWdlWCAtIHRoaXMubGFzdF9jb2x1bW5feCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VubG9ja0RyYWdUb1Njcm9sbCgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgX2hhbmRsZURyYWdFbmQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLl91bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUNvbHVtbkRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZncodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuXG4gICAgICAgIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwICYmIHRoaXMucm93X3cgKyB0aGlzLnggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IGFkanVzdGVkX2RlbHRhO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IEhFQURFUl9DRUxMX0hBTkRMRSkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZ3KHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIF9jaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgodGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA8IDAgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPiAwICYmIHRoaXMuYWN0aXZlX3JvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKiBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd24gaW4gdGhlIHZpZXdwb3J0LiAqL1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICggICAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID4gdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IDwgdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2NoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIF9oYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCBnZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvd0luZGV4KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEgLy8gYWxyZWFkeSBrZXlpbmcgdGhyb3VnaCB0aGUgdGFibGVcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5hY3RpdmVfcm93ID09PSAtMSAmJiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCkgLy8gYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB0aGUgYWN0aXZlIHJvdyBvbiB0aGUgdG9wbW9zdCByb3cgaW4gdGhlIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VBY3RpdmVSb3codGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcGFkZGluZ19yb3dzICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmdyh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgaWYgKChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpICYmIHRoaXMuYWN0aXZlX3JvdyA+PSAwICYmIHRoaXMuY29weV9ub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlX3JvdyA9IGZ3KHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29weV9ub2RlLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiBgXCIke2NvbHVtbi50aXRsZS5yZXBsYWNlKCdcIicsICdcXFxcXCInKX1cImApLmpvaW4oJywnKVxuICAgICAgICAgICAgICAgICAgICArICdcXG4nXG4gICAgICAgICAgICAgICAgICAgICsgYWN0aXZlX3Jvdy5jZWxscy5tYXAoY2VsbCA9PiBgXCIke2NlbGwubm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCdcIicsICdcXFxcXCInKX1cImApLmpvaW4oJywnKVxuICAgICAgICAgICAgICAgICAgICArICdcXG4nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5X25vZGUuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKENFTEwpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoUk9XKSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIF9oYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLl9kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmdyh0aGlzLnJvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93SW5kZXgocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsICYmIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5yb3dDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIEFQSXNcblxuICAgIGdldEFjdGl2ZVJvd0luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVfcm93ID4gLTEgPyB0aGlzLmFjdGl2ZV9yb3cgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93SW5kZXgoc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRBY3RpdmVSb3dJbmRleCgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFhBbW91bnRTY3JvbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcbiAgICB9XG5cbiAgICBnZXRZQW1vdW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuXG4gICAganVtcFRvUm93SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55ID0gMDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IGluZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZVJvd0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5fcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTsgfVxuXG4gICAgICAgIC8vIGFsbG93cyBmb3IgdHJ1ZSBzaXplcyB0byBiZSBjYWxjdWxhdGVkOyBwb3N0LWluaXRpYWxpemF0aW9uLCB0aGUgZmxleGJveCBhdXRvLWdyb3cgYWxnb3JpdGhtIHRha2VzIG92ZXJcbiAgICAgICAgLy8gYW5kIHdpbGwgZGl2dnkgdXAgcmVtYWluaW5nIHNwYWNlIGFtb25nc3QgdGhlIGNoaWxkcmVuLi4uIHByZWNhbGN1bGF0aW5nIHRoZSB0cnVlIHNpemUgbWVhbnMgbGFyZ2VyIGNvbHVtbnNcbiAgICAgICAgLy8gd2lsbCBub3QgYmUgcHJlbWF0dXJlbHkgdHJ1bmNhdGVkXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoSU5JVElBTElaRUQpO1xuXG4gICAgICAgIC8qIHN0b3JlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgdW5pb24gZm9yIGlmIHdlIG5lZWQgdG8gcmVoeWRyYXRlIHRoZSBwcmV2aW91cyBzY3JvbGwgc3RhdGUgKi9cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuX195ID0gdGhpcy55O1xuICAgICAgICB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgdGhpcy5fcmVzZXRJbnRlcm5hbHMoKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3dJbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuX2J1aWxkQ29sdW1ucygpO1xuXG4gICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID0gdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPyB0aGlzLl9fcm93X3N0YXJ0X2luZGV4IHx8IDAgOiAwO1xuXG4gICAgICAgIHRoaXMuX2luamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IE1hdGguY2VpbCh0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3JlbmRlcmVkID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSB0aGlzLmMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IE1hdGguZmxvb3IodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcm93c19yZW5kZXJlZCAtIDE7XG5cbiAgICAgICAgdGhpcy5faW5qZWN0UmVzdE9mUm93cygpO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVDb2x1bW5XaWR0aHMoKTtcbiAgICAgICAgdGhpcy5faW5qZWN0SGVhZGVyQ2VsbHMoKTtcblxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgJiYgdGhpcy5fX3ggIT09IG51bGwgJiYgdGhpcy5fX3kgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8qIHRoZSBjYWNoZWQgdmFsdWVzIGFyZSB0aGVuIGFwcGxpZWQgYWdhaW5zdCB0aGUgdGFibGUgdG8gYXJyaXZlIGF0IHRoZSBwcmV2aW91cyBzdGF0ZSAqL1xuXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IC10aGlzLl9feCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6IC10aGlzLl9feSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgYWxsIHRoZSBzZXR1cCBpcyBjb21wbGV0ZSwgYXBwbHkgdGhlIGZsZXggYWxnb3JpdGhtIHRvIGV4cGFuZCBzbWFsbGVyIGNlbGxzIGlmIHRoZXJlXG4gICAgICAgIC8vIGlzIGV4dHJhIHJvb21cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuY2xhc3NMaXN0LmFkZChJTklUSUFMSVpFRCk7XG5cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5faGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLl9oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVDbGljayk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLl9lbXB0eUJvZHkoKTtcblxuICAgICAgICAvLyByZWxlYXNlIGNhY2hlZCBET00gbm9kZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jW2tleV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBTZWFyY2hlcyBhbmQgcmV0dXJucyB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGFuIGFycmF5IGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL2ZpbmRXaGVyZVxuICovXG5cbmxldCBfZmluZFdoZXJlSW5kZXggPSBudWxsO1xuXG4vKipcbiAqIEBwYXJhbSAge0FycmF5W09iamVjdF19IGFycmF5ICAgICBhbiBhcnJheSBvZiBvYmplY3RzXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICBwcm9wZXJ0eSAgdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIG1hdGNoIGFnYWluc3RcbiAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgIHZhbHVlICAgICB0aGUgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCAodXNlcyBzdHJpY3QgZXF1YWxpdHkpXG4gKlxuICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH0gVGhlIG1hdGNoZWQgYXJyYXkgaXRlbSwgb3Igbm90aGluZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZFdoZXJlKGFycmF5LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBfZmluZFdoZXJlSW5kZXggPSBhcnJheS5sZW5ndGggLSAxO1xuXG4gICAgd2hpbGUgKF9maW5kV2hlcmVJbmRleCA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheVtfZmluZFdoZXJlSW5kZXhdW3Byb3BlcnR5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtfZmluZFdoZXJlSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgX2ZpbmRXaGVyZUluZGV4IC09IDE7XG4gICAgfVxufSAvLyBvcHRpbWl6ZWQgc3BlY2lmaWNhbGx5IHRvIG9ubHkgbG9vayBmb3IgYSBzaW5nbGUga2V5OnZhbHVlIG1hdGNoXG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpY1xuICogdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwb3NzaWJpbGl0aWVzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcG9zc2liaWxpdGllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocG9zc2liaWxpdGllc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3NzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGl0ZXJhdG9yYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGl0ZXJhdG9yIFRoZSBpdGVyYXRvciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGl0ZXJhdG9yVG9BcnJheShpdGVyYXRvcikge1xuICB2YXIgZGF0YSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICghKGRhdGEgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICByZXN1bHQucHVzaChkYXRhLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGZpcnN0IGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBSZWZsZWN0ID0gcm9vdC5SZWZsZWN0LFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIGVudW1lcmF0ZSA9IFJlZmxlY3QgPyBSZWZsZWN0LmVudW1lcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlLFxuICAgIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGxpa2UgYF8uZGlmZmVyZW5jZWAgd2l0aG91dCBzdXBwb3J0XG4gKiBmb3IgZXhjbHVkaW5nIG11bHRpcGxlIGFycmF5cyBvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VEaWZmZXJlbmNlKGFycmF5LCB2YWx1ZXMsIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICB2YWx1ZXNMZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuXG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoaXRlcmF0ZWUpIHtcbiAgICB2YWx1ZXMgPSBhcnJheU1hcCh2YWx1ZXMsIGJhc2VVbmFyeShpdGVyYXRlZSkpO1xuICB9XG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9XG4gIGVsc2UgaWYgKHZhbHVlcy5sZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB2YWx1ZXMgPSBuZXcgU2V0Q2FjaGUodmFsdWVzKTtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciB2YWx1ZXNJbmRleCA9IHZhbHVlc0xlbmd0aDtcbiAgICAgIHdoaWxlICh2YWx1ZXNJbmRleC0tKSB7XG4gICAgICAgIGlmICh2YWx1ZXNbdmFsdWVzSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyh2YWx1ZXMsIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoLlxuICogQHBhcmFtIHtib29sZWFufSBbcHJlZGljYXRlPWlzRmxhdHRlbmFibGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gaXNGbGF0dGVuYWJsZSk7XG4gIHJlc3VsdCB8fCAocmVzdWx0ID0gW10pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChkZXB0aCA+IDAgJiYgcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlQdXNoKHJlc3VsdCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHNraXAgdGhlIGNvbnN0cnVjdG9yXG4gKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIG9iamVjdCA9IG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogT2JqZWN0KG9iamVjdCk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBGYWxsYmFjayBmb3IgSUUgPCA5IHdpdGggZXM2LXNoaW0uXG5pZiAoZW51bWVyYXRlICYmICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgJ3ZhbHVlT2YnOiAxIH0sICd2YWx1ZU9mJykpIHtcbiAgYmFzZUtleXNJbiA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkoZW51bWVyYXRlKG9iamVjdCkpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnBpY2tgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogcHJvcGVydHkgaWRlbnRpZmllcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrKG9iamVjdCwgcHJvcHMpIHtcbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4ga2V5IGluIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgIGBfLnBpY2tCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2sgZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGtleSkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0luLCBnZXRTeW1ib2xzSW4pO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhXG4gKiBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MikgdGhhdCBhZmZlY3RzXG4gKiBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGBbW1Byb3RvdHlwZV1dYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgYFtbUHJvdG90eXBlXV1gLlxuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhuYXRpdmVHZXRQcm90b3R5cGUsIE9iamVjdCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSBuYXRpdmVHZXRTeW1ib2xzID8gb3ZlckFyZyhuYXRpdmVHZXRTeW1ib2xzLCBPYmplY3QpIDogc3R1YkFycmF5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXNcbiAqIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzSW4gPSAhbmF0aXZlR2V0U3ltYm9scyA/IHN0dWJBcnJheSA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChvYmplY3QpIHtcbiAgICBhcnJheVB1c2gocmVzdWx0LCBnZXRTeW1ib2xzKG9iamVjdCkpO1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZShvYmplY3QpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgaW5kZXgga2V5cyBmb3IgYG9iamVjdGAgdmFsdWVzIG9mIGFycmF5cyxcbiAqIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBzdHJpbmdzLCBvdGhlcndpc2UgYG51bGxgIGlzIHJldHVybmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gUmV0dXJucyBpbmRleCBrZXlzLCBlbHNlIGBudWxsYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhLZXlzKG9iamVjdCkge1xuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgaWYgKGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlVGltZXMobGVuZ3RoLCBTdHJpbmcpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSB8fFxuICAgICEhKHNwcmVhZGFibGVTeW1ib2wgJiYgdmFsdWUgJiYgdmFsdWVbc3ByZWFkYWJsZVN5bWJvbF0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIGluY29ycmVjdGx5IG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgd2VhayBtYXAgY29uc3RydWN0b3JzLFxuICAvLyBhbmQgUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3RyaW5nYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3RyaW5nLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTdHJpbmcoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgKCFpc0FycmF5KHZhbHVlKSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICBwcm9wcyA9IGJhc2VLZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgaW5kZXhlcyA9IGluZGV4S2V5cyhvYmplY3QpLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWluZGV4ZXMsXG4gICAgICByZXN1bHQgPSBpbmRleGVzIHx8IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgYF8ucGlja2A7IHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZVxuICogb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBgb2JqZWN0YCB0aGF0IGFyZVxuICogbm90IG9taXR0ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcm9wc10gVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIG9taXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLm9taXQob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vID0+IHsgJ2InOiAnMicgfVxuICovXG52YXIgb21pdCA9IGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcHJvcHMpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHByb3BzID0gYXJyYXlNYXAoYmFzZUZsYXR0ZW4ocHJvcHMsIDEpLCB0b0tleSk7XG4gIHJldHVybiBiYXNlUGljayhvYmplY3QsIGJhc2VEaWZmZXJlbmNlKGdldEFsbEtleXNJbihvYmplY3QpLCBwcm9wcykpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb21pdDtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLmRpZmZlcmVuY2VgIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGV4Y2x1ZGluZyBtdWx0aXBsZSBhcnJheXMgb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlRGlmZmVyZW5jZShhcnJheSwgdmFsdWVzLCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgdmFsdWVzTGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcblxuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgdmFsdWVzID0gYXJyYXlNYXAodmFsdWVzLCBiYXNlVW5hcnkoaXRlcmF0ZWUpKTtcbiAgfVxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgfVxuICBlbHNlIGlmICh2YWx1ZXMubGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgdmFsdWVzID0gbmV3IFNldENhY2hlKHZhbHVlcyk7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdmFsdWVzSW5kZXggPSB2YWx1ZXNMZW5ndGg7XG4gICAgICB3aGlsZSAodmFsdWVzSW5kZXgtLSkge1xuICAgICAgICBpZiAodmFsdWVzW3ZhbHVlc0luZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXModmFsdWVzLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYVxuICogW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpIHRoYXQgYWZmZWN0c1xuICogU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgZXhjbHVkaW5nIGFsbCBnaXZlbiB2YWx1ZXMgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogKipOb3RlOioqIFVubGlrZSBgXy5wdWxsYCwgdGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsuLi4qfSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKiBAc2VlIF8uZGlmZmVyZW5jZSwgXy54b3JcbiAqIEBleGFtcGxlXG4gKlxuICogXy53aXRob3V0KFsyLCAxLCAyLCAzXSwgMSwgMik7XG4gKiAvLyA9PiBbM11cbiAqL1xudmFyIHdpdGhvdXQgPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheSwgdmFsdWVzKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdChhcnJheSlcbiAgICA/IGJhc2VEaWZmZXJlbmNlKGFycmF5LCB2YWx1ZXMpXG4gICAgOiBbXTtcbn0pO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgd2VhayBtYXAgY29uc3RydWN0b3JzLFxuICAvLyBhbmQgUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpdGhvdXQ7XG4iXX0=
