(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

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

},{"27":27}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29,"3":3}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Fit given text inside a parent container, obeying implict and explicit constraints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIFittedText
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

var UIFittedText = function (_UIView) {
    _inherits(UIFittedText, _UIView);

    function UIFittedText() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIFittedText);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.rescale = function () {
            var node = (0, _reactDom.findDOMNode)(_this);
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
            node.style.fontSize = (Math.min(_this.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIFittedText.prototype.componentDidMount = function componentDidMount() {
        this.rescale();

        window.addEventListener('resize', this.rescale, true);
    };

    UIFittedText.prototype.componentDidUpdate = function componentDidUpdate() {
        this.rescale();
    };

    UIFittedText.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('resize', this.rescale, true);
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

},{"27":27,"29":29}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

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
        var _this2 = this,
            _cx,
            _cx2,
            _cx3;

        var dialogSpecificProps = Object.keys(_UIDialog2.default.propTypes).reduce(function (props, key) {
            props[key] = _this2.props[key];

            return props;
        }, {});

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
                _extends({}, dialogSpecificProps, this.props.modalProps, {
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

},{"27":27,"29":29,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require(15);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _item = require(10);

var _item2 = _interopRequireDefault(_item);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPaginatedView
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIPaginatedView = function (_UIView) {
    _inherits(UIPaginatedView, _UIView);

    function UIPaginatedView() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPaginatedView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            currentPage: _this.props.pagerPosition,
            numberOfPages: Math.ceil(_this.props.totalItems / _this.props.numItemsPerPage),
            numItemsPerPage: _this.props.numItemsPerPage,
            numPageToggles: _this.props.numPageToggles,
            totalItems: _this.props.totalItems,
            shownItems: [{ data: _this.props.getItem(0) }]
        }, _this.handleClick = function (value) {
            var pageNumber = undefined;

            switch (value) {
                case UIPaginatedView.controlValues.FIRST:
                    pageNumber = 1;
                    break;
                case UIPaginatedView.controlValues.PREVIOUS:
                    pageNumber = _this.state.currentPage - 1;
                    break;
                case UIPaginatedView.controlValues.NEXT:
                    pageNumber = _this.state.currentPage + 1;
                    break;
                case UIPaginatedView.controlValues.LAST:
                    pageNumber = _this.state.numberOfPages;
                    break;
                default:
                    pageNumber = parseInt(value, 10);
            }

            _this.setState({
                currentPage: pageNumber,
                shownItems: _this.generateItems(pageNumber)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPaginatedView.prototype.componentDidUpdate = function componentDidUpdate(oldProps, oldState) {
        if (oldState.currentPage !== this.state.currentPage) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPaginatedView.prototype.componentDidMount = function componentDidMount() {
        this.setState({ shownItems: this.generateItems(this.state.currentPage) });
    };

    UIPaginatedView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.identifier !== this.props.identifier) {
            this.setState({
                currentPage: 1,
                shownItems: this.generateItems(1, nextProps.getItem)
            });
        }
    };

    UIPaginatedView.prototype.createPageButtonOptions = function createPageButtonOptions() {
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
                value: UIPaginatedView.controlValues.FIRST,
                disabled: this.state.currentPage === 1,
                className: 'ui-paginated-view-controls-first'
            });
        }

        options.push({
            selected: false,
            content: this.props.previousPageControlText,
            value: UIPaginatedView.controlValues.PREVIOUS,
            disabled: this.state.currentPage === 1,
            className: 'ui-paginated-view-controls-previous'
        });

        for (var i = startPage; i <= endPage; i++) {
            options.push({
                selected: i === this.state.currentPage,
                content: i,
                value: i
            });
        }

        options.push({
            selected: false,
            content: this.props.nextPageControlText,
            value: UIPaginatedView.controlValues.NEXT,
            disabled: this.state.currentPage === this.state.numberOfPages,
            className: 'ui-paginated-view-controls-next'
        });

        if (this.props.showJumpToLast) {
            options.push({
                selected: false,
                content: this.props.jumpToLastControlText,
                value: UIPaginatedView.controlValues.LAST,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-paginated-view-controls-last'
            });
        }

        return options;
    };

    UIPaginatedView.prototype.currentPage = function currentPage() {
        return this.state.currentPage;
    };

    UIPaginatedView.prototype.generateItems = function generateItems(currentPage) {
        var getItem = arguments.length <= 1 || arguments[1] === undefined ? this.props.getItem : arguments[1];

        var generatedItems = [];
        var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
        var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({ data: getItem(i) });
        }

        return generatedItems;
    };

    UIPaginatedView.prototype.renderItems = function renderItems() {
        var _cx;

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, this.props.listWrapperProps, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-paginated-view-item-list': true
                }, _cx[this.props.listWrapperProps.className] = !!this.props.listWrapperProps.className, _cx)) }),
            this.state.shownItems.map(function (item, index) {
                return _react2.default.createElement(_item2.default, { ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    even: index % 2 === 0 });
            })
        );
    };

    UIPaginatedView.prototype.renderControls = function renderControls(position) {
        var _cx2;

        var positionLowerCase = position.toLowerCase();

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, this.props.toggleWrapperProps, {
            ref: 'segmentedControl' + (positionLowerCase[0].toUpperCase() + positionLowerCase.slice(1)),
            className: (0, _classnames2.default)((_cx2 = {
                'ui-paginated-view-controls': true
            }, _cx2['ui-paginated-view-controls-' + positionLowerCase] = true, _cx2[this.props.toggleWrapperProps.className] = !!this.props.toggleWrapperProps.className, _cx2)),
            options: this.createPageButtonOptions(),
            onOptionSelected: this.handleClick }));
    };

    UIPaginatedView.prototype.renderView = function renderView() {
        return _react2.default.createElement(
            'div',
            {
                ref: 'paginatedView',
                className: 'ui-paginated-view' },
            this.props.position === UIPaginatedView.position.ABOVE || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.ABOVE) : _noop2.default,
            this.renderItems(),
            this.props.position === UIPaginatedView.position.BELOW || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.BELOW) : _noop2.default
        );
    };

    UIPaginatedView.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-paginated-view-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

    return UIPaginatedView;
}(_UIView3.default);

UIPaginatedView.controlValues = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};
UIPaginatedView.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};
UIPaginatedView.propTypes = {
    getItem: _react2.default.PropTypes.func,
    identifier: _react2.default.PropTypes.string.isRequired,
    jumpToFirstControlText: _react2.default.PropTypes.string,
    jumpToLastControlText: _react2.default.PropTypes.string,
    listWrapperProps: _react2.default.PropTypes.object,
    nextPageControlText: _react2.default.PropTypes.string,
    numItemsPerPage: function validateNumItemsPerPage(props) {
        if (!Number.isInteger(props.numItemsPerPage)) {
            return new Error('`numItemsPerPage` must be an integer.');
        }

        if (props.numItemsPerPage < 1 || props.numItemsPerPage > props.totalItems) {
            return new Error('`numItemsPerPage` must be between 1 and ' + props.totalItems + '.');
        }
    },
    numPageToggles: _react2.default.PropTypes.number,
    pagerPosition: function validatePagerPosition(props) {
        if (!Number.isInteger(props.pagerPosition)) {
            return new Error('`pagerPosition` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.pagerPosition < 1 || props.pagerPosition > numberOfPages) {
            return new Error('`pagerPosition` must be between 1 and ' + numberOfPages + '.');
        }
    },
    position: _react2.default.PropTypes.oneOf(Object.keys(UIPaginatedView.position)),
    previousPageControlText: _react2.default.PropTypes.string,
    showJumpToFirst: _react2.default.PropTypes.bool,
    showJumpToLast: _react2.default.PropTypes.bool,
    toggleWrapperProps: _react2.default.PropTypes.object,
    totalItems: _react2.default.PropTypes.number.isRequired
};
UIPaginatedView.defaultProps = {
    options: [],
    getItem: _noop2.default,
    jumpToFirstControlText: '« First',
    jumpToLastControlText: 'Last »',
    listWrapperProps: {},
    nextPageControlText: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    pagerPosition: 1,
    position: UIPaginatedView.position.ABOVE,
    previousPageControlText: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};
exports.default = UIPaginatedView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"10":10,"15":15,"23":23,"27":27,"29":29}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIPaginatedViewItem = function (_UIView) {
    _inherits(UIPaginatedViewItem, _UIView);

    function UIPaginatedViewItem() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPaginatedViewItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this._mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPaginatedViewItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    };

    UIPaginatedViewItem.prototype.waitForContentIfNecessary = function waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this._mounted && this.state.data === promise) {
                    this.setState({ data: value });
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    };

    UIPaginatedViewItem.prototype.componentDidMount = function componentDidMount() {
        this._mounted = true;
        this.waitForContentIfNecessary();
    };

    UIPaginatedViewItem.prototype.componentWillUnmount = function componentWillUnmount() {
        this._mounted = false;
    };

    UIPaginatedViewItem.prototype.componentDidUpdate = function componentDidUpdate() {
        this.waitForContentIfNecessary();
    };

    UIPaginatedViewItem.prototype.getClasses = function getClasses(extraClasses) {
        return (0, _classnames2.default)({
            'ui-paginated-view-item': true,
            'ui-paginated-view-item-even': this.props.even,
            'ui-paginated-view-item-odd': !this.props.even,
            'ui-paginated-view-item-loading': this.state.data instanceof Promise
        }) + (extraClasses ? ' ' + extraClasses : '');
    };

    UIPaginatedViewItem.prototype.cloneWithClasses = function cloneWithClasses(element) {
        if (element instanceof Promise) {
            return _react2.default.createElement('div', _extends({}, this.props, { className: this.getClasses() }));
        }

        return _react2.default.cloneElement(element, _extends({}, this.props, {
            className: this.getClasses(this.state.data.props.className)
        }));
    };

    UIPaginatedViewItem.prototype.render = function render() {
        return this.cloneWithClasses(this.state.data);
    };

    return UIPaginatedViewItem;
}(_UIView3.default);

UIPaginatedViewItem.propTypes = {
    even: _react2.default.PropTypes.bool,
    data: _react2.default.PropTypes.object
};
exports.default = UIPaginatedViewItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"27":27,"29":29}],11:[function(require,module,exports){
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

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _transformProperty = require(26);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _classnames = require(29);

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

},{"26":26,"27":27,"29":29,"5":5}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

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

},{"2":2,"27":27,"29":29}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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

},{"23":23,"27":27,"29":29}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(23);

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
        var value = undefined;

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
                'aria-required': 'radiogroup',
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

},{"2":2,"23":23,"27":27,"29":29}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _table = require(17);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for TableView.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITable = function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UITable.prototype.getTableViewConfiguration = function getTableViewConfiguration() {
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
        this.table = new _table2.default(this.getTableViewConfiguration());

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
        var key = undefined;

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

            this.table.regenerate(this.getTableViewConfiguration());
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

},{"17":17,"27":27}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transformProperty = require(26);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _findWhere = require(22);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * A high-performance, infinite table view.
                                                                                                                                                           * @class TableView
                                                                                                                                                           */

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

var cellClassRegex = /\s?ui-table-cell\b/g;
var rowClassRegex = /\s?ui-table-row\b/g;

var translate3d = function translate3D() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

var reparentCellText = function reparentCellText(node, content) {
    if (node.childNodes.length && node.childNodes[0].nodeType === 3) {
        node.removeChild(node.childNodes[0]);
    }

    var text = document.createElement('div');
    text.className = 'ui-table-cell-inner';

    var textNode = document.createTextNode(content);
    text.appendChild(textNode);

    node.appendChild(text);

    return textNode;
};

var createDOMCell = function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = 'ui-table-cell ';
    cell.className += index % 2 === 0 ? 'ui-table-cell-even' : 'ui-table-cell-odd';

    cell.setAttribute('data-column', mapping);
    cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

var createDOMHeaderCell = function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

var createHeaderCell = function createHeaderCell(metadata, index) {
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

var createCell = function createCell(content, mapping, width, index) {
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

var createDOMRow = function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = 'ui-table-row';
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
};

var createRow = function createRow(metadata, columns) {
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

                if (val && this.node.className.indexOf('ui-table-row-active') === -1) {
                    this.node.className += ' ui-table-row-active';
                } else if (!val && this.node.className.indexOf('ui-table-row-active') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-active', '').trim();
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
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-even' : this.node.className.replace('ui-table-row-odd', 'ui-table-row-even');
                } else {
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-odd' : this.node.className.replace('ui-table-row-even', 'ui-table-row-odd');
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

                if (val && this.node.className.indexOf('ui-table-row-loading') === -1) {
                    this.node.className += ' ui-table-row-loading';
                } else if (!val && this.node.className.indexOf('ui-table-row-loading') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-loading', '').trim();
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

var TableView = function () {
    TableView.prototype.validateColumnShape = function validateColumnShape(column) {
        return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
    };

    TableView.prototype.validateConfiguration = function validateConfiguration(config) {
        // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
        if (config.static_mode !== undefined && typeof config.static_mode !== 'boolean') {
            throw Error('TableView was not passed a valid `static_mode`; it should be a boolean.');
        }

        if (!(config.wrapper instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `wrapper` element.');
        }

        if (!(config.header instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `header` element.');
        }

        if (!(config.body instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `body` element.');
        }

        if (!config.static_mode && !(config['x-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-track` element.');
        }

        if (!config.static_mode && !(config['y-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-track` element.');
        }

        if (!config.static_mode && !(config['x-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-handle` element.');
        }

        if (!config.static_mode && !(config['y-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-handle` element.');
        }

        if (!config.static_mode && !(config.aria instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `aria` element.');
        }

        if (!Array.isArray(config.columns) || config.columns.length === 0 || !config.columns.every(this.validateColumnShape)) {
            throw Error('TableView was not passed valid `columns`. It should be an array with at least one object conforming to: {\n                mapping: string,\n                resizable: bool,\n                title: string,\n                width: number (optional),\n            }');
        }

        if (typeof config.throttleInterval !== 'number') {
            throw Error('TableView was not passed a valid `throttleInterval`; it should be a Number.');
        }

        if (typeof config.totalRows !== 'number') {
            throw Error('TableView was not passed a valid `totalRows`; it should be a Number.');
        }

        if (typeof config.getRow !== 'function') {
            throw Error('TableView was not passed a valid `getRow`; it should be a function.');
        }

        if (config.rowClickFunc !== undefined && typeof config.rowClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `rowClickFunc`; it should be a function.');
        }

        if (config.cellClickFunc !== undefined && typeof config.cellClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `cellClickFunc`; it should be a function.');
        }

        if (config.columnResizeFunc !== undefined && typeof config.columnResizeFunc !== 'function') {
            throw Error('TableView was not passed a valid `columnResizeFunc`; it should be a function.');
        }

        if (typeof config.preserveScrollState !== 'boolean') {
            throw Error('TableView was not passed a valid `preserveScrollState`; it should be a boolean.');
        }
    };

    TableView.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);
    };

    function TableView(config) {
        var _this = this;

        _classCallCheck(this, TableView);

        this.handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            }

            _this.calculateContainerDimensions();
            _this.calculateXBound();
            _this.initializeScrollBars();
        };

        this.handleMoveIntent = function (event) {
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
                _this.scrollDown();
            } else if (_this.next_y > _this.y) {
                _this.scrollUp();
            }

            if (_this.reset_timer) {
                window.clearTimeout(_this.reset_timer);
            }

            /* reset row & wrapper Y values toward 0 to prevent overflowing */
            _this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                instance.reset_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = instance.applyDelta(instance.reset_delta, instance.y);
                instance.y_min = instance.applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = instance.applyDelta(instance.reset_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance.translateBody(instance.x, instance.y);
            }, 100, _this);

            _this.top_visible_row_index = _this.calculateVisibleTopRowIndex();

            /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
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
                this.performTranslations(nextX, nextY);
            }.bind(_this, _this.next_x, _this.x, _this.next_y, _this.top_visible_row_index));

            _this.x = _this.next_x;
            _this.y = _this.next_y;
        };

        this.handleTouchMove = function (event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to handleMoveIntent() */

            _this.touch = event.touches.item(0);

            _this.evt.deltaX = _this.last_touch_pageX - _this.touch.pageX;
            _this.evt.deltaY = _this.last_touch_pageY - _this.touch.pageY;

            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleTouchStart = function (event) {
            _this.touch = event.touches.item(0);
            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;
        };

        this.handleAdvanceToXScrollTrackLocation = function (event) {
            if (_this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
            _this.evt.deltaY = 0;

            _this.handleMoveIntent(_this.evt);

            _this.last_pageX = event.pageX;
        };

        this.handleAdvanceToYScrollTrackLocation = function (event) {
            if (_this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            _this.evt.deltaX = 0;
            _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleXScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            _this.last_pageX = event.pageX;
            _this.x_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleYScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            _this.y_scroll_offset = event.offsetY;

            _this.y_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleDragMove = function (event) {
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
                _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

                _this.handleMoveIntent(_this.evt);
            } else if (_this.x_scroll_locked) {
                _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
                _this.evt.deltaY = 0;

                _this.handleMoveIntent(_this.evt);

                _this.last_pageX = event.pageX;
            } else if (_this.column_is_resizing) {
                _this.handleColumnResize(event.pageX - _this.last_column_x);

                _this.last_column_x = event.pageX;
            }
        };

        this.handleDragEnd = function () {
            window.removeEventListener('mouseup', _this.handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this.unlockDragToScroll();
            }, 0);
        };

        this.handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', _this.handleDragEnd, true);
            }
        };

        this.handleColumnAutoExpand = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this.columns, 'mapping', mapping);
                    var columnIndex = _this.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = undefined;

                    _this.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this.applyNewColumnWidth(columnIndex, width);
                })();
            }
        };

        this.handleKeyDown = function (event) {
            var key = event.key || _this.getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'ArrowDown':
                    _this.changeActiveRow(1);
                    event.preventDefault();
                    break;

                case 'ArrowUp':
                    _this.changeActiveRow(-1);
                    event.preventDefault();
                    break;

                case 'Enter':
                    if (_this.active_row !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row).data;

                            _this.setAriaText(_this.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }
        };

        this.handleClick = function (event) {
            var map = _this.discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(_this.rows, 'node', map.row);

                _this.setActiveRow(row.setIndex);

                if (map.cell && _this.c.cellClickFunc) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                if (_this.c.rowClickFunc) {
                    _this.c.rowClickFunc(event, row.setIndex);
                }
            }
        };

        this.processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        if (!this.c.static_mode) {
            this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
            this.y_scroll_handle_style = this.c['y-scroll-handle'].style;
        }

        this.resetInternals();
        this.resetActiveRow();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        if (!this.c.static_mode) {
            window.addEventListener('resize', this.handleWindowResize);
            window.addEventListener('mousemove', this.handleDragMove);

            this.c.wrapper.addEventListener('wheel', this.handleMoveIntent);
            this.c.wrapper.addEventListener('touchstart', this.handleTouchStart);
            this.c.wrapper.addEventListener('touchmove', this.handleTouchMove);

            this.c.wrapper.addEventListener('keydown', this.handleKeyDown);

            this.header.addEventListener('mousedown', this.handleColumnDragStart);
            this.header.addEventListener('dblclick', this.handleColumnAutoExpand);

            this.body.addEventListener('click', this.handleClick);

            this.c['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.c['x-scroll-track'].addEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].addEventListener('click', this.handleAdvanceToYScrollTrackLocation);
        }
    }

    TableView.prototype.destroy = function destroy() {
        var _this2 = this;

        if (!this.c.static_mode) {
            window.removeEventListener('resize', this.handleWindowResize);
            window.removeEventListener('mousemove', this.handleDragMove);

            this.c.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.c.wrapper.removeEventListener('touchstart', this.handleTouchStart);
            this.c.wrapper.removeEventListener('touchmove', this.handleTouchMove);

            this.c.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this.header.removeEventListener('mousedown', this.handleColumnDragStart);
            this.header.removeEventListener('dblclick', this.handleColumnAutoExpand);

            this.body.removeEventListener('click', this.handleClick);

            this.c['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.c['x-scroll-track'].removeEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].removeEventListener('click', this.handleAdvanceToYScrollTrackLocation);
        }

        this.emptyHeader();
        this.emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach(function (key) {
            if (_this2.c[key] instanceof HTMLElement) {
                _this2.c[key] = null;
            }
        });
    };

    TableView.prototype.resetActiveRow = function resetActiveRow() {
        this.active_row = -1;
        this.next_active_row = null;
    };

    TableView.prototype.resetInternals = function resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;

        this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

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

        this.evt = { preventDefault: _noop2.default };

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

        this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
        this.x_scroll_handle_size = this.y_scroll_handle_size = null;

        // reset!
        this.performTranslations();
    };

    TableView.prototype.emptyHeader = function emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    };

    TableView.prototype.buildColumns = function buildColumns() {
        var _this3 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column, index) {
            _this3.columns.push(createHeaderCell(column, index));
        });
    };

    TableView.prototype.computeMinMaxHeaderCellDimensions = function computeMinMaxHeaderCellDimensions() {
        var cs = undefined;

        this.columns.forEach(function (column) {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    };

    TableView.prototype.injectHeaderCells = function injectHeaderCells() {
        var _this4 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this4.fragment.appendChild(column.node);
        });

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    };

    TableView.prototype.emptyBody = function emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    };

    TableView.prototype.injectFirstRow = function injectFirstRow() {
        this.emptyBody();

        this.rows.push(createRow({
            active: this.row_start_index === this.active_row,
            data: this.c.getRow(this.row_start_index),
            setIndex: this.row_start_index,
            y: 0
        }, this.columns));

        this.rows_ordered_by_y.push(0);
        this.rows_ordered_by_y_length += 1;

        this.body.appendChild(this.rows[0].node);
    };

    TableView.prototype.injectRestOfRows = function injectRestOfRows() {
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
    };

    TableView.prototype.calculateCellHeight = function calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    };

    TableView.prototype.calculateCellWidths = function calculateCellWidths() {
        var _this5 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this5.columns[index].width = _this5.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this5.columns[index].width;
        });
    };

    TableView.prototype.calculateXBound = function calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    };

    TableView.prototype.calculateYBound = function calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    };

    TableView.prototype.calculateXScrollHandleSize = function calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        }

        return this.x_scroll_handle_size;
    };

    TableView.prototype.calculateYScrollHandleSize = function calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    };

    TableView.prototype.initializeScrollBars = function initializeScrollBars() {
        this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || this.container_w;
        this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
        this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || this.container_h;
        this.x_scroll_handle_style.width = this.calculateXScrollHandleSize() + 'px';
        this.y_scroll_handle_style.height = this.calculateYScrollHandleSize() + 'px';

        /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
        this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

        /* how many scrollbar pixels === one row? */
        this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_visible);

        /* hide the scrollbars if they are not needed */

        if (this.x_scroll_handle_size === this.container_w) {
            this.c['x-scroll-track'].style.display = 'none';
            this.x_scroll_track_hidden = true;
        } else {
            this.c['x-scroll-track'].style.display = '';
            this.x_scroll_track_hidden = false;
        }

        if (this.y_scroll_handle_size === this.container_h) {
            this.c['y-scroll-track'].style.display = 'none';
            this.y_scroll_track_hidden = true;
        } else {
            this.c['y-scroll-track'].style.display = '';
            this.y_scroll_track_hidden = false;
        }
    };

    TableView.prototype.calculateContainerDimensions = function calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    };

    TableView.prototype.regenerate = function regenerate() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

        if (config !== this.c) {
            this.processConfiguration(config);
        }

        /* stores the current state of the union for if we need to rehydrate the previous scroll state */
        this.__x = this.x;
        this.__y = this.y;
        this.__row_start_index = this.row_start_index;

        this.resetInternals();

        if (this.active_row >= this.c.totalRows) {
            this.resetActiveRow();
        }

        this.calculateContainerDimensions();

        this.buildColumns();

        this.row_start_index = this.c.preserveScrollState ? this.__row_start_index || 0 : 0;

        this.injectFirstRow();
        this.calculateCellWidths();
        this.calculateCellHeight();

        this.n_rows_rendered = Math.ceil(this.body_h / this.cell_h) + this.n_padding_rows;

        if (this.n_rows_rendered > this.c.totalRows) {
            this.n_rows_rendered = this.c.totalRows;
        }

        this.n_rows_visible = Math.floor(this.body_h / this.cell_h);

        if (this.n_rows_visible > this.n_rows_rendered) {
            this.n_rows_visible = this.n_rows_rendered;
        }

        this.row_end_index = this.row_start_index + this.n_rows_rendered - 1;

        this.injectHeaderCells();
        this.injectRestOfRows();

        if (!this.c.static_mode) {
            this.calculateXBound();
            this.calculateYBound();

            this.initializeScrollBars();

            if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
                /* the cached values are then applied against the table to arrive at the previous state */

                this.handleMoveIntent({
                    deltaX: -this.__x,
                    deltaY: -this.__y,
                    preventDefault: _noop2.default
                });
            }
        }

        this.__x = this.__y = this.__row_start_index = null;
    };

    TableView.prototype.translateHeader = function translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[_transformProperty2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    TableView.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transformProperty2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    TableView.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    TableView.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    };

    TableView.prototype.performTranslations = function performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    };

    TableView.prototype.scrollUp = function scrollUp() {
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
    };

    TableView.prototype.scrollDown = function scrollDown() {
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

            this.next_y = this.applyDelta(this.applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

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
    };

    TableView.prototype.applyDelta = function applyDelta(delta, num) {
        if (delta < 0) {
            return num < 0 ? num - delta : num + delta;
        }

        return num - delta;
    };

    TableView.prototype.calculateVisibleTopRowIndex = function calculateVisibleTopRowIndex() {
        var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

        return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(this.applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
    };

    TableView.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    TableView.prototype.applyNewColumnWidth = function applyNewColumnWidth(index, width) {
        this.c.columns[index].width = width; // the provided config objects
        this.columns[index].width = width; // the column nodes
        this.rows.forEach(function (row) {
            row.cells[index].width = width;
        });

        this.calculateXBound();
        this.initializeScrollBars();

        if (this.c.onColumnResize) {
            this.c.onColumnResize(this.columns[index].mapping, width);
        }
    };

    TableView.prototype.handleColumnResize = function handleColumnResize(delta) {
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

        this.applyNewColumnWidth(index, this.column_is_resizing.width + adjusted_delta);

        /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than
        the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
            this.evt.deltaX = adjusted_delta;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);
        }
    };

    TableView.prototype.getKeyFromKeyCode = function getKeyFromKeyCode(code) {
        switch (code) {
            case 40:
                return 'ArrowDown';

            case 38:
                return 'ArrowUp';

            case 13:
                return 'Enter';
        }

        return null;
    };

    TableView.prototype.setAriaText = function setAriaText(text) {
        this.c.aria.innerText = text;
    };

    TableView.prototype.setActiveRow = function setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(function (row) {
            row.active = row.setIndex === setIndex;
        });
    };

    TableView.prototype.changeActiveRow = function changeActiveRow(delta) {
        var _this6 = this;

        if (this.active_row + delta >= this.c.totalRows) {
            return;
        }

        this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

        if (this.next_active_row) {
            this.setActiveRow(this.next_active_row.setIndex);
            this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

            if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h) {
                // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cell_h * delta;

                this.handleMoveIntent(this.evt);
            }
        } else if (delta < 0 && this.active_row > 0 || delta > 0 && this.active_row < this.c.totalRows) {
            /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
            this.evt.deltaX = 0;
            this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

            this.handleMoveIntent(this.evt);

            // start the process again, now that the row is available
            window.requestAnimationFrame(function () {
                return _this6.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    TableView.prototype.discoverCellAndRowNodes = function discoverCellAndRowNodes(target) {
        var node = target;
        var nodeMap = {};

        if (node.className.match(rowClassRegex)) {
            return { row: node };
        }

        while ((!nodeMap.cell || !nodeMap.row) && node) {
            if (node.className.match(cellClassRegex)) {
                nodeMap.cell = node;
            } else if (node.className.match(rowClassRegex)) {
                nodeMap.row = node;
            }

            node = node.parentNode;
        }

        return nodeMap;
    };

    TableView.prototype.jumpToRowIndex = function jumpToRowIndex(index) {
        this.row_start_index = index;
        this.y = 0;

        this.regenerate();

        this.top_visible_row_index = index;
        this.y_scroll_handle_position = index * this.y_scrollbar_pixel_ratio;

        if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
            this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
        }

        this.translateYScrollHandle(this.y_scroll_handle_position);

        this.setActiveRow(index);
    };

    return TableView;
}();

exports.default = TableView;

},{"22":22,"23":23,"26":26}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

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
            is_controlled: is_string(_this.props.inputProps.value) || is_string(_this.props.value),
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
            return this.setState({ input: this.props.inputProps.value || this.props.value || '' });
        }

        this.setState({ input: this.props.inputProps.defaultValue || this.props.defaultValue || '' });
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        if (props.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: props.inputProps.value });
        } else if (props.value !== this.props.value) {
            this.setState({ input: props.value });
        }
    };

    UITextualInput.prototype.value = function value(next_value) {
        if (this.state.is_controlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = next_value;
        this.setState({ input: next_value });
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        var is_non_empty = Boolean(this.state.input);
        var should_show_placeholder = this.props.hidePlaceholderOnFocus === true ? this.state.is_focused === false && is_non_empty === false : is_non_empty === false;

        return _react2.default.createElement(
            'div',
            { ref: 'placeholder', className: 'ui-textual-input ui-textual-input-placeholder' },
            should_show_placeholder ? this.props.inputProps.placeholder || this.props.placeholder : ''
        );
    };

    UITextualInput.prototype.render = function render() {
        var _cx, _cx2;

        var state = this.state;
        var props = this.props;


        return _react2.default.createElement(
            'div',
            _extends({}, props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[props.className] = Boolean(props.className), _cx)),
                name: null,
                placeholder: null,
                type: null }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[props.inputProps.className] = Boolean(props.inputProps.className), _cx2)),
                defaultValue: state.is_controlled === true ? undefined : props.inputProps.defaultValue || props.defaultValue,
                name: props.inputProps.name || props.name,
                placeholder: null,
                type: props.inputProps.type || props.type,
                value: state.is_controlled === true ? props.inputProps.value || props.value || '' : undefined,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onInput: this.handleInput }))
        );
    };

    return UITextualInput;
}(_UIView3.default);

UITextualInput.propTypes = {
    defaultValue: _react.PropTypes.string,
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        placeholder: _react.PropTypes.string,
        value: _react.PropTypes.string
    }),
    name: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    type: _react.PropTypes.string,
    value: _react.PropTypes.string
};
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: false,
    inputProps: {},
    name: null,
    placeholder: '',
    type: 'text'
};
exports.default = UITextualInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"27":27,"29":29}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require(21);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

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

var UITokenizedInput = function (_UIView) {
    _inherits(UITokenizedInput, _UIView);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.add = function (index) {
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
                        _this.refs.typeahead.focus();
                    }

                    break;

                case 65:
                    // letter "a"
                    if (event.metaKey) {
                        event.preventDefault();

                        _this.refs.typeahead.focus();
                        _this.refs.typeahead.select();

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
            this.refs.typeahead.value('');
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
            this.refs.typeahead.focus();
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
        this.refs.typeahead.focus();
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return _react2.default.createElement('div', { className: 'ui-tokenfield-token-close',
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
                    { ref: 'token_' + index,
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
        var _this4 = this,
            _cx;

        var descendants = Object.keys(_UITypeaheadInput2.default.propTypes).reduce(function (props, key) {
            props[key] = _this4.props[key];

            return props;
        }, {});

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-wrapper': true
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, descendants, {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                onEntitySelected: this.add,
                onFocus: this.handleInputFocus,
                clearPartialInputOnSelection: true }))
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

},{"21":21,"23":23,"27":27,"29":29}],20:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(29);

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

},{"27":27,"29":29}],21:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITextualInput = require(18);

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _UIView2 = require(27);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(23);

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require(29);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(30);

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

var UITypeaheadInput = function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            entityMatchIndexes: [],
            selectedEntityIndex: -1,
            id: _this.uuid(),
            is_controlled: is_string(_this.props.inputProps.value) || is_string(_this.props.value),
            userInput: _this.props.inputProps.value || _this.props.value || _this.props.inputProps.defaultValue || _this.props.defaultValue || ''
        }, _this.setValueWithSelectedEntity = function () {
            _this.props.onEntitySelected(_this.state.selectedEntityIndex);

            if (_this.props.clearPartialInputOnSelection) {
                _this.value('');
            } else {
                _this.value(_this.getSelectedEntityText());
            }
        }, _this.handleInput = function (event) {
            event.stopPropagation();

            _this.setState({ userInput: event.target.value }, function () {
                return _this.computeMatches();
            });

            if (_this.props.onInput) {
                event.persist();
                _this.props.onInput(event);
            }

            if (typeof _this.props.inputProps.onInput === 'function') {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    if (event.target.selectionStart > 1) {
                        event.stopPropagation();
                    }

                    break;

                case 'Tab':
                case 'ArrowRight':
                    if (_this.state.selectedEntityIndex !== -1 && _this.cursorAtEndOfInput() && _this.getInputNode() === event.target && !event.shiftKey) {
                        event.nativeEvent.preventDefault();
                        _this.setValueWithSelectedEntity();
                    }

                    break;

                case 'ArrowUp':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    _this.selectMatch(-1);
                    _this.focus();
                    break;

                case 'ArrowDown':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    _this.selectMatch(1);
                    _this.focus();
                    break;

                case 'Escape':
                    if (_this.state.selectedEntityIndex !== -1 && _this.getInputNode() === event.target) {
                        _this.resetMatches();
                    }

                    break;

                case 'Enter':
                    if (_this.state.selectedEntityIndex !== -1 && _this.getInputNode() === event.target) {
                        event.nativeEvent.preventDefault();
                        _this.setValueWithSelectedEntity();
                    } else {
                        _this.props.onComplete(_this.state.userInput);
                    }

                    break;
            }

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setState({ userInput: nextProps.inputProps.value });
        } else if (nextProps.value !== this.props.value) {
            this.setState({ userInput: nextProps.value });
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

    UITypeaheadInput.prototype.getSelectedEntityText = function getSelectedEntityText() {
        var entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.text : '';
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

    UITypeaheadInput.prototype.select = function select() {
        var input = this.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = input.length;
    };

    UITypeaheadInput.prototype.focus = function focus() {
        this.getInputNode().focus();
    };

    UITypeaheadInput.prototype.value = function value(newValue) {
        this.refs.input.value(newValue);

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    };

    UITypeaheadInput.prototype.cursorAtEndOfInput = function cursorAtEndOfInput() {
        var node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
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

    UITypeaheadInput.prototype.markMatchSubstring = function markMatchSubstring() {
        switch (this.props.algorithm) {
            case UITypeaheadInput.mode.STARTS_WITH:
                return this.markStartsWithMatchSubstring.apply(this, arguments);

            case UITypeaheadInput.mode.FUZZY:
                return this.markFuzzyMatchSubstring.apply(this, arguments);
        }

        if (typeof this.props.algorithm.markFunc === 'function') {
            var _props$algorithm;

            return (_props$algorithm = this.props.algorithm).markFunc.apply(_props$algorithm, arguments);
        }

        if (!this.warned_markFunc) {
            this.warned_markFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.markFunc` was provided; falling back to the default marking algorithm.');
        }

        return this.markStartsWithMatchSubstring.apply(this, arguments);
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

    UITypeaheadInput.prototype.getMatchIndexes = function getMatchIndexes() {
        switch (this.props.algorithm) {
            case UITypeaheadInput.mode.STARTS_WITH:
                return this.getStartsWithMatchIndexes.apply(this, arguments);

            case UITypeaheadInput.mode.FUZZY:
                return this.getFuzzyMatchIndexes.apply(this, arguments);
        }

        if (typeof this.props.algorithm.matchFunc === 'function') {
            var _props$algorithm2;

            return (_props$algorithm2 = this.props.algorithm).matchFunc.apply(_props$algorithm2, arguments);
        }

        if (!this.warned_matchFunc) {
            this.warned_matchFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matchFunc` was provided; falling back to the default matching algorithm.');
        }

        return this.getStartsWithMatchIndexes.apply(this, arguments);
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches() {
        var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

        var currentValue = this.state.userInput;
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

            var userText = this.state.userInput;
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

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.matchWrapperProps, {
                    ref: 'matches',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-typeahead-match-wrapper': true
                    }, _cx2[this.props.matchWrapperProps.className] = !!this.props.matchWrapperProps.className, _cx2)) }),
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
                        _this2.markMatchSubstring(_this2.state.userInput, entity)
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
                type: null,
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[props.className] = !!props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement(_UITextualInput2.default, {
                ref: 'input',
                inputProps: _extends({}, props.inputProps, {
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-typeahead': true
                    }, _cx5[props.inputProps.className] = !!props.inputProps.className, _cx5)),
                    defaultValue: state.is_controlled === true ? undefined : props.inputProps.defaultValue || props.defaultValue || '',
                    name: props.inputProps.name || props.name,
                    type: props.inputProps.type || props.type,
                    onInput: this.handleInput,
                    value: state.is_controlled === true ? props.inputProps.value || props.value || '' : undefined
                }),
                'aria-controls': state.id }),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_UIView3.default);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = {
    algorithm: _react.PropTypes.oneOfType([_react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react.PropTypes.shape({
        markFunc: _react.PropTypes.func,
        matchFunc: _react.PropTypes.func
    })]),
    clearPartialInputOnSelection: _react.PropTypes.bool,
    defaultValue: _react.PropTypes.string,
    entities: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.string
    })),
    hint: _react.PropTypes.bool,
    hintProps: _react.PropTypes.object,
    inputProps: _react.PropTypes.shape({
        className: _react.PropTypes.string,
        defaultValue: _react.PropTypes.string,
        name: _react.PropTypes.string,
        type: _react.PropTypes.string,
        value: _react.PropTypes.string
    }),
    matchWrapperProps: _react.PropTypes.object,
    name: _react.PropTypes.string,
    offscreenClass: _react.PropTypes.string,
    onComplete: _react.PropTypes.func,
    onInput: _react.PropTypes.func,
    onEntityHighlighted: _react.PropTypes.func,
    onEntitySelected: _react.PropTypes.func,
    type: _react.PropTypes.string,
    value: _react.PropTypes.string
};
UITypeaheadInput.defaultProps = {
    algorithm: UITypeaheadInput.mode.STARTS_WITH,
    clearPartialInputOnSelection: false,
    entities: [],
    hintProps: {},
    inputProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntityHighlighted: _noop2.default,
    onEntitySelected: _noop2.default
};
exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"18":18,"23":23,"27":27,"29":29,"30":30}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _shallowEqual = require(25);

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

},{"25":25}],28:[function(require,module,exports){
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
    UIPaginatedView: global.UIKit.UIPaginatedView = require(9).default,
    UIPopover: global.UIKit.UIPopover = require(11).default,
    UIProgress: global.UIKit.UIProgress = require(12).default,
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require(13).default,
    UIRadio: global.UIKit.UIRadio = require(14).default,
    UISegmentedControl: global.UIKit.UISegmentedControl = require(15).default,
    UITable: global.UIKit.UITable = require(16).default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require(19).default,
    UITextualInput: global.UIKit.UITextualInput = require(18).default,
    UITooltip: global.UIKit.UITooltip = require(20).default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require(21).default,
    UIUtils: {
        notify: global.UIKit.UIUtils.notify = require(24).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(26).default
    },
    UIView: global.UIKit.UIView = require(27).default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"18":18,"19":19,"2":2,"20":20,"21":21,"24":24,"26":26,"27":27,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}]},{},[28])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUYWJsZS90YWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiVUlWaWV3L2luZGV4LmpzIiwiZXhwb3J0cy5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJ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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBwcmV2U3RhdGUuYWN0aXZlQ2hpbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggKyBkZWx0YTtcblxuICAgICAgICBpZiAobmV4dEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gbnVtQ2hpbGRyZW4gLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG5leHRJbmRleH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkQmx1cihpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRGb2N1cyhpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiBjaGlsZC50YWJJbmRleCB8fCAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVDaGlsZEJsdXIuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlQ2hpbGRGb2N1cy5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgIH07XG5cbiAgICB0b2dnbGVTdGF0ZShldmVudCkge1xuICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBvbkNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5jaGVja2VkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5hcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzZWxlY3RBbGxQb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICAgICAgc2VsZWN0QWxsTGFiZWw6ICdTZWxlY3QgQWxsJyxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgfVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubmFtZSB8fCAnY2Jfc2VsZWN0X2FsbCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2FsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU9eyFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBib2R5UHJvcHM6IHt9LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBoZWFkZXJVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgYm9keVVVSUQ6IHRoaXMudXVpZCgpLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8IG5vZGUgPT09IHdpbmRvdykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmRpYWxvZy5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlciB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZm9vdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoZWFkZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVzY2FsZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnBhcmVudE5vZGUpO1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICAgICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4odGhpcy5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUltYWdlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZyB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBhbHQ9e251bGx9XG4gICAgICAgICAgICAgICAgIHNyYz17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1vZGFsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBtYXNrUHJvcHM6IHt9LFxuICAgICAgICBtb2RhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1NwZWNpZmljUHJvcHMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi5kaWFsb2dTcGVjaWZpY1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRlZFZpZXdcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0ZWRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgY29udHJvbFZhbHVlcyA9IHtcbiAgICAgICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgICAgICBORVhUOiAnTkVYVCcsXG4gICAgICAgIExBU1Q6ICdMQVNUJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGdldEl0ZW06IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpZGVudGlmaWVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxIHx8IHByb3BzLm51bUl0ZW1zUGVyUGFnZSA+IHByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIHByb3BzLnRvdGFsSXRlbXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcGFnZXJQb3NpdGlvbjogZnVuY3Rpb24gdmFsaWRhdGVQYWdlclBvc2l0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMucGFnZXJQb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMucGFnZXJQb3NpdGlvbiA8IDEgfHwgcHJvcHMucGFnZXJQb3NpdGlvbiA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24pKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0b3RhbEl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sVGV4dDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBhZ2VyUG9zaXRpb246IDEsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUsXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiAn4oC5IFByZXZpb3VzJyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMucGFnZXJQb3NpdGlvbixcbiAgICAgICAgbnVtYmVyT2ZQYWdlczogTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXMsXG4gICAgICAgIHRvdGFsSXRlbXM6IHRoaXMucHJvcHMudG90YWxJdGVtcyxcbiAgICAgICAgc2hvd25JdGVtczogW3tkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oMCl9XSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKSB7XG4gICAgICAgIGlmIChvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXModGhpcy5zdGF0ZS5jdXJyZW50UGFnZSl9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlkZW50aWZpZXIgIT09IHRoaXMucHJvcHMuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKDEsIG5leHRQcm9wcy5nZXRJdGVtKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcyhjdXJyZW50UGFnZSwgZ2V0SXRlbSA9IHRoaXMucHJvcHMuZ2V0SXRlbSkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnN0YXRlLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiBnZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXI7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUzpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYWdlTnVtYmVyLFxuICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHBhZ2VOdW1iZXIpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSUFycm93S2V5TmF2aWdhdGlvbiB7Li4udGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWxpc3QnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd25JdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbSByZWY9e2BpdGVtXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtpdGVtLmRhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXJDYXNlID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eydzZWdtZW50ZWRDb250cm9sJyArIChwb3NpdGlvbkxvd2VyQ2FzZVswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlckNhc2Uuc2xpY2UoMSkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLScgKyBwb3NpdGlvbkxvd2VyQ2FzZV06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRlZC12aWV3Jz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkVcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1dcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGVkVmlld0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGV2ZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgfVxuXG4gICAgX21vdW50ZWQgPSBmYWxzZVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkYXRhOiBuZXh0UHJvcHMuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0SXRlbURhdGEocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91bnRlZCAmJiB0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLl9tb3VudGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKGV4dHJhQ2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gY3goe1xuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLW9kZCc6ICF0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIGNsb25lV2l0aENsYXNzZXMoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoPGRpdiB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+PC9kaXY+KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKHRoaXMuc3RhdGUuZGF0YS5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lV2l0aENsYXNzZXModGhpcy5zdGF0ZS5kYXRhKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGZYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiB0cnVlLFxuICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgIHNlbGZYQWxpZ246IHRoaXMucHJvcHMuc2VsZlhBbGlnbixcbiAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy5ub2RlLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBsYWJlbD17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgYXJpYS1yZXF1aXJlZD0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGVWaWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL3RhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUm93SW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG90YWxSb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gICAgICAgIHN0YXRpYzogUHJvcFR5cGVzLmJvb2wsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0cnVlLFxuICAgIH1cblxuICAgIGdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICByb3dDbGlja0Z1bmM6IHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdCxcbiAgICAgICAgICAgIGNlbGxDbGlja0Z1bmM6IHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QsXG4gICAgICAgICAgICBvbkNvbHVtblJlc2l6ZTogdGhpcy5wcm9wcy5vbkNvbHVtblJlc2l6ZSxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0aGlzLnByb3BzLnByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuXG4gICAgICAgICAgICAvLyBpbnRlcm5hbCB1c2Ugb25seSwgcmVuZGVycyB0aGUgdGFibGUgd2l0aG91dCBhbnkgZXZlbnQgbGlzdGVuZXJzIChtaW5pbWFsIGNvbXB1dGF0aW9uKVxuICAgICAgICAgICAgc3RhdGljX21vZGU6IHRoaXMucHJvcHMuc3RhdGljLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlVmlldyh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIG9ubHlDb2x1bW5XaWR0aENoYW5nZWRBbmRNYXRjaGVzVGFibGVJbnRlcm5hbHMoY3VycmVudF9jb2x1bW5zLCBwcmV2X2NvbHVtbnMsIHRhYmxlX2ludGVybmFsX2NvbHVtbnMpIHtcbiAgICAgICAgLyogdGhlIGNvbHVtbnMgc2hvdWxkIGV4YWN0bHkgbWF0Y2ggaW4gdGhlIHByb3BlciBvcmRlciwgb3IgdGhlIHdpZHRocyBzaG91bGQgYmUgdGhlIHNhbWUgYXMgdGhlIGludGVybmFsIGNvbHVtblxuICAgICAgICByZXByZXNlbnRhdGlvbiwgbWVhbmluZyB0aGUgY2hhbmdlIGlzIGEgcmVhY3Rpb24gdG8gYmVpbmcgYWxlcnRlZCBieSBgcHJvcHMub25Db2x1bW5SZXNpemVgICovXG4gICAgICAgIHJldHVybiBjdXJyZW50X2NvbHVtbnMuZXZlcnkoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAgICBjb2x1bW4gPT09IHByZXZfY29sdW1uc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICB8fCAoY29sdW1uLm1hcHBpbmcgPT09IHByZXZfY29sdW1uc1tpbmRleF0ubWFwcGluZyAmJiBjb2x1bW4ud2lkdGggPT09IHRhYmxlX2ludGVybmFsX2NvbHVtbnNbaW5kZXhdLndpZHRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZF9wcm9wcyA9IFtdO1xuICAgICAgICBsZXQga2V5O1xuXG4gICAgICAgIC8qIGJpZGlyZWN0aW9uYWwga2V5IGNoYW5nZSBkZXRlY3Rpb24gKi9cblxuICAgICAgICBmb3IgKGtleSBpbiB0aGlzLnByb3BzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wc1trZXldICE9PSBwcmV2X3Byb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkX3Byb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoa2V5IGluIHByZXZfcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcmV2X3Byb3BzW2tleV0gIT09IHRoaXMucHJvcHNba2V5XSAmJiBjaGFuZ2VkX3Byb3BzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkX3Byb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VkX3Byb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMuaW5kZXhPZignanVtcFRvUm93SW5kZXgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvKiBqdW1wVG9Sb3dJbmRleCBhbHJlYWR5IHRyaWdnZXJzIGEgcmVnZW5lcmF0aW9uLCBqdXN0IGF2b2lkaW5nIHJ1bm5pbmcgaXQgdHdpY2UgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleCh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMubGVuZ3RoID09PSAxICYmIGNoYW5nZWRfcHJvcHNbMF0gPT09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgIC8qIGRpZCB0aGluZ3MgbWF0ZXJpYWxseSBjaGFuZ2UsIG9yIGp1c3QgdXBkYXRpbmcgYSBjb2x1bW4gd2lkdGg/ICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25seUNvbHVtbldpZHRoQ2hhbmdlZEFuZE1hdGNoZXNUYWJsZUludGVybmFscyh0aGlzLnByb3BzLmNvbHVtbnMsIHByZXZfcHJvcHMuY29sdW1ucywgdGhpcy50YWJsZS5jb2x1bW5zKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyWFNjcm9sbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnN0YXRpYykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJZU2Nyb2xsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc3RhdGljKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckFyaWEoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zdGF0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJYU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWVNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWEoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFRhYmxlVmlld1xuICovXG5cbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IGZpbmRXaGVyZSBmcm9tICcuLi8uLi9VSVV0aWxzL2ZpbmRXaGVyZSc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi8uLi9VSVV0aWxzL25vb3AnO1xuXG4vKlxuXG5GT1IgRlVUVVJFIEVZRVNcblxuU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGEgdG8gdGhlIERPTS4gVGhlcmUgYXJlIGEgbG90IG9mIGNob2ljZXMgaW4gdGhpcyBjb21wb25lbnQgdGhhdCBtYXkgc2VlbSBvZGQgYXQgZmlyc3QgYmx1c2gsIGJ1dCBsZXQgaXQgYmUga25vd24gdGhhdCB3ZSB0cmllZCB0byBkbyBpdCB0aGUgUmVhY3QgV2F54oSiIGFuZCBpdCB3YXMgbm90IHBlcmZvcm1hbnQgZW5vdWdoLlxuXG5UaGUgY29tYmluYXRpb24gdGhhdCB3YXMgc2V0dGxlZCB1cG9uIGlzIGEgUmVhY3Qgc2hlbGwgd2l0aCBuYXRpdmUgRE9NIGd1dHMuIFRoaXMgY29tYmluYXRpb24geWllbGRzIHRoZSBiZXN0IHBlcmZvcm1hbmNlLCB3aGlsZSBzdGlsbCBiZWluZyBwZXJmZWN0bHkgaW50ZXJvcGVyYWJsZSB3aXRoIHRoZSByZXN0IG9mIFVJS2l0IGFuZCBSZWFjdCB1c2UgY2FzZXMuXG5cbl9fSW1wb3J0YW50IE5vdGVfX1xuXG5BbnkgdGltZSB5b3UgY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIG1ha2Ugc3VyZSB5b3UgcmVsZWFzZSBpdCBhZnRlciBieSBzZXR0aW5nIGl0cyB2YXJpYWJsZSB0byBgbnVsbGAuIElmIHlvdSBkb24ndCwgaXQnbGwgY3JlYXRlIGEgbWVtb3J5IGxlYWsuIEFsc28sIG1ha2Ugc3VyZSBhbGwgZ2VuZXJhdGVkIERPTSBpcyByZW1vdmVkIG9uIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuXG5cbk9SREVSIE9GIE9QRVJBVElPTlNcblxuMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbjIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4zLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcblxuSWYgdGhlIGNvbXBvbmVudCB1cGRhdGVzIGR1ZSB0byBuZXcgcHJvcHMsIGp1c3QgYmxvdyBhd2F5IGV2ZXJ5dGhpbmcgYW5kIHN0YXJ0IG92ZXIuIEl0J3MgY2hlYXBlciB0aGFuIHRyeWluZyB0byBkaWZmLlxuXG4qL1xuXG5jb25zdCBjZWxsQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtY2VsbFxcYi9nO1xuY29uc3Qgcm93Q2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93XFxiL2c7XG5cbmNvbnN0IHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24gdHJhbnNsYXRlM0QoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cbmNvbnN0IHJlcGFyZW50Q2VsbFRleHQgPSBmdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHROb2RlO1xufTtcblxuY29uc3QgY3JlYXRlRE9NQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCAnO1xuICAgIGNlbGwuY2xhc3NOYW1lICs9IGluZGV4ICUgMiA9PT0gMCA/ICd1aS10YWJsZS1jZWxsLWV2ZW4nIDogJ3VpLXRhYmxlLWNlbGwtb2RkJztcblxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVET01IZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoLCBpbmRleCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVIZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVDZWxsID0gZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnMgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoLCBpbmRleCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWFjdGl2ZScsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9ICAgdGhpcy5fc2V0SW5kZXggPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3VpLXRhYmxlLXJvdyB1aS10YWJsZS1yb3ctZXZlbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctb2RkJywgJ3VpLXRhYmxlLXJvdy1ldmVuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9ICAgdGhpcy5fc2V0SW5kZXggPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3VpLXRhYmxlLXJvdyB1aS10YWJsZS1yb3ctb2RkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1ldmVuJywgJ3VpLXRhYmxlLXJvdy1vZGQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdmFsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEluZGV4ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIGdldCB3YWl0aW5nRm9yUmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uOyB9LFxuICAgICAgICBzZXQgd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWxvYWRpbmcnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IG51bGwgfHwgdGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVt0aGlzLl9pdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW2NvbHVtbnNbdGhpcy5faXRlcmF0b3JdLm1hcHBpbmddO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3knOiBtZXRhZGF0YS55LFxuICAgICAgICBnZXQgeSgpIHsgcmV0dXJuIHRoaXMuX3k7IH0sXG4gICAgICAgIHNldCB5KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSB0byBoYXZlIHRoZSBjbGFzc2VzIGFkZGVkIGF1dG9tYXRpY2FsbHlcbiAgICByb3dPYmouc2V0SW5kZXggPSBtZXRhZGF0YS5zZXRJbmRleDtcbiAgICByb3dPYmouYWN0aXZlID0gbWV0YWRhdGEuYWN0aXZlO1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5jbGFzcyBUYWJsZVZpZXcge1xuICAgIHZhbGlkYXRlQ29sdW1uU2hhcGUoY29sdW1uKSB7XG4gICAgICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnRpdGxlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgJiYgKGNvbHVtbi53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIC8vIHgtc2Nyb2xsLXRyYWNrLCB5LXNjcm9sbC10cmFjaywgeC1zY3JvbGwtaGFuZGxlLCB5LXNjcm9sbC1oYW5kbGUsIGFuZCBhcmlhIGFyZSBub3QgcmVxdWlyZWQgaW4gc3RhdGljX21vZGVcbiAgICAgICAgaWYgKGNvbmZpZy5zdGF0aWNfbW9kZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuc3RhdGljX21vZGUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBzdGF0aWNfbW9kZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBoZWFkZXJgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneS1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd4LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWcuYXJpYSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBhcmlhYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgICFBcnJheS5pc0FycmF5KGNvbmZpZy5jb2x1bW5zKVxuICAgICAgICAgICAgfHwgY29uZmlnLmNvbHVtbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICB8fCAhY29uZmlnLmNvbHVtbnMuZXZlcnkodGhpcy52YWxpZGF0ZUNvbHVtblNoYXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRhYmxlVmlldyB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgICAgICBtYXBwaW5nOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciAob3B0aW9uYWwpLFxuICAgICAgICAgICAgfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdGhyb3R0bGVJbnRlcnZhbGA7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdG90YWxSb3dzYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGdldFJvd2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yb3dDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLnJvd0NsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGByb3dDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjZWxsQ2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmNvbHVtblJlc2l6ZUZ1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmNvbHVtblJlc2l6ZUZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY29sdW1uUmVzaXplRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucHJlc2VydmVTY3JvbGxTdGF0ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHByZXNlcnZlU2Nyb2xsU3RhdGVgOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGU7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb25maWd1cmF0aW9uKHRoaXMuYyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTtcblxuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmMuYm9keTtcbiAgICAgICAgdGhpcy5ib2R5X3N0eWxlID0gdGhpcy5ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuYy5oZWFkZXI7XG4gICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlID0gdGhpcy5oZWFkZXIuc3R5bGU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzZXRJbnRlcm5hbHMoKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvdygpO1xuXG4gICAgICAgIC8qIHVzZWQgaW4gc2Nyb2xsIHN0YXRlIHByZXNlcnZhdGlvbiBjYWxjdWxhdGlvbnMgKi9cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuXG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcblxuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICAvLyByZWxlYXNlIGNhY2hlZCBET00gbm9kZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jW2tleV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRBY3RpdmVSb3coKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IC0xO1xuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeSA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubl9wYWRkaW5nX3Jvd3MgPSAzO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy5uZXh0X3kgPSAwO1xuXG4gICAgICAgIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgPSAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmhlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVDaGlsZCh0aGlzLmhlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMuYy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uLCBpbmRleCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMucm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLnJvd19zdGFydF9pbmRleCksXG4gICAgICAgICAgICBzZXRJbmRleDogdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2goMCk7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm93c1swXS5ub2RlKTtcbiAgICB9XG5cbiAgICBpbmplY3RSZXN0T2ZSb3dzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5pID0gMTsgdGhpcy5pIDwgdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7IHRoaXMuaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsX2ggKiB0aGlzLmksXG4gICAgICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMuaSk7XG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMucm93c1t0aGlzLmldLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5jZWxsX2ggPSB0aGlzLnJvd3NbMF0uY2VsbHNbMF0ubm9kZS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbFdpZHRocygpIHtcbiAgICAgICAgdGhpcy5yb3dzWzBdLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCB8fCBjZWxsLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjZWxsLndpZHRoID0gdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLnJvd193ID0gdGhpcy5yb3dzWzBdLm5vZGUuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLnhfbWF4ID0gdGhpcy5jb250YWluZXJfdyA8PSB0aGlzLnJvd193ID8gdGhpcy5jb250YWluZXJfdyAtIHRoaXMucm93X3cgOiAwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlCb3VuZCgpIHtcbiAgICAgICAgdGhpcy55X21pbiA9IDA7XG4gICAgICAgIHRoaXMueV9tYXggPSB0aGlzLmJvZHlfaCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkICogdGhpcy5jZWxsX2g7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLmNvbnRhaW5lcl93IC0gTWF0aC5hYnModGhpcy54X21heCk7XG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSB7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAgIHRoaXMubl9yb3dzX3Zpc2libGUgPT09IHRoaXMubl9yb3dzX3JlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY29udGFpbmVyX2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5jb250YWluZXJfaCAqICh0aGlzLm5fcm93c192aXNpYmxlIC8gdGhpcy5jLnRvdGFsUm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCB0aGlzLmNvbnRhaW5lcl93O1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IDg7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgdGhpcy5jb250YWluZXJfaDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGUud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuXG4gICAgICAgIC8qIHRvdGFsIHRyYW5zbGF0YWJsZSBzcGFjZSAvIHNjcm9sbGJhciB0cmFjayBzaXplID0gcmVsYXRpdmUgdmFsdWUgb2YgYSBzY3JvbGxiYXIgcGl4ZWwgKi9cbiAgICAgICAgdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvID0gTWF0aC5hYnModGhpcy54X21heCkgLyAodGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSk7XG5cbiAgICAgICAgLyogaG93IG1hbnkgc2Nyb2xsYmFyIHBpeGVscyA9PT0gb25lIHJvdz8gKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbyA9ICh0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplKSAvICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5uX3Jvd3NfdmlzaWJsZSk7XG5cbiAgICAgICAgLyogaGlkZSB0aGUgc2Nyb2xsYmFycyBpZiB0aGV5IGFyZSBub3QgbmVlZGVkICovXG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyX2ggPSB0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl93ID0gdGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLmJvZHlfaCA9IHRoaXMuYy5ib2R5LmNsaWVudEhlaWdodCB8fCAxMTA7XG4gICAgfVxuXG4gICAgaGFuZGxlV2luZG93UmVzaXplID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0ICE9PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgbWF5IGJlIG5lZWRlZCB0byBkaXNwbGF5IHRoZSBkYXRhLCBzbyB3ZSBuZWVkIHRvIHJlYnVpbGQgKi9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2VuZXJhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgcmVnZW5lcmF0ZShjb25maWcgPSB0aGlzLmMpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPT0gdGhpcy5jKSB7IHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTsgfVxuXG4gICAgICAgIC8qIHN0b3JlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgdW5pb24gZm9yIGlmIHdlIG5lZWQgdG8gcmVoeWRyYXRlIHRoZSBwcmV2aW91cyBzY3JvbGwgc3RhdGUgKi9cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuX195ID0gdGhpcy55O1xuICAgICAgICB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZVJvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5idWlsZENvbHVtbnMoKTtcblxuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID8gdGhpcy5fX3Jvd19zdGFydF9pbmRleCB8fCAwIDogMDtcblxuICAgICAgICB0aGlzLmluamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IE1hdGguY2VpbCh0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3JlbmRlcmVkID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSB0aGlzLmMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IE1hdGguZmxvb3IodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcm93c19yZW5kZXJlZCAtIDE7XG5cbiAgICAgICAgdGhpcy5pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLmluamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlICYmIHRoaXMuX194ICE9PSBudWxsICYmIHRoaXMuX195ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLyogdGhlIGNhY2hlZCB2YWx1ZXMgYXJlIHRoZW4gYXBwbGllZCBhZ2FpbnN0IHRoZSB0YWJsZSB0byBhcnJpdmUgYXQgdGhlIHByZXZpb3VzIHN0YXRlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IC10aGlzLl9feCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiAtdGhpcy5fX3ksXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3ggPSB0aGlzLl9feSA9IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZUhlYWRlcih4KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfaGVhZGVyX3gpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoeCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlQm9keSh4LCB5KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfYm9keV94IHx8IHkgIT09IHRoaXMubGFzdF9ib2R5X3kpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IHg7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUoeCkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSAmJiB4ICE9PSB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3gpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoeCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh5KSB7XG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlICYmIHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUhlYWRlcihuZXh0WCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNjcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbERvd24oKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIGVuZCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCBuKSB3ZSB0cnVuY2F0ZSBhbnkgc2Nyb2xsIGF0dGVtcHRzICAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfZW5kX2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MgLSAxICYmIHRoaXMubmV4dF95IDw9IHRoaXMueV9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21heDtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMueF9zY3JvbGxfdHJhY2tfaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPj0gdGhpcy55X21heCkgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCB0b3AgcG9zaXRpb24gdG8gdGhlIGJvdHRvbVxuICAgICAgICAgICAoYmVsb3cgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9tYXgpIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCArIHRoaXMucm93X2VuZF9pbmRleCArIDEgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIHRoYW4gdGhlcmUgaXMgZGF0YSBhdmFpbGFibGUsIHRydW5jYXRlICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSArPSAoXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtICh0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9PT0gMCA/IDAgOiAxKSlcbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlEZWx0YShkZWx0YSwgbnVtKSB7XG4gICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gPCAwID8gbnVtIC0gZGVsdGEgOiBudW0gKyBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW0gLSBkZWx0YTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgodGFyZ2V0WSA9IHRoaXMubmV4dF95KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NbXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W1xuICAgICAgICAgICAgICAgIE1hdGguY2VpbChNYXRoLmFicyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFYID09PSAwICAgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGVsdGFfeCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLmRlbHRhX3kgPSAgIGV2ZW50LmRlbHRhTW9kZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnggOiB0aGlzLnggLSB0aGlzLmRlbHRhX3g7XG4gICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy54X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnkgOiB0aGlzLnkgLSB0aGlzLmRlbHRhX3k7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF94ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF94IDwgdGhpcy54X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnhfbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbmVnYXRlIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCwgbm90IGVub3VnaCByb3dzIHRvIGZpbGwgdGhlIGJvZHkgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95IDwgdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBpbnN0YW5jZS5hcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnRyYW5zbGF0ZUJvZHkoaW5zdGFuY2UueCwgaW5zdGFuY2UueSk7XG5cbiAgICAgICAgfSwgMTAwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IHRoaXMuY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlcyB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIGhhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSwgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wXG4gICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCAtIHRoaXMueV9zY3JvbGxfb2Zmc2V0XG4gICAgICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbHVtbl9pc19yZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfY29sdW1uX3gpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubG9ja0RyYWdUb1Njcm9sbCgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qIHRoZSBicm93c2VyIGZpcmVzIHRoZSBtb3VzZXVwIGFuZCBjbGljayBldmVudHMgc2ltdWx0YW5lb3VzbHksIGFuZCB3ZSBkb24ndCB3YW50IG91ciBjbGljayBoYW5kbGVyIHRvIGJlIGV4ZWN1dGVkLCBzbyBhIHplcm8tZGVsYXkgc2V0VGltZW91dCB3b3JrcyBoZXJlIHRvIGxldCB0aGUgc3RhY2sgY2xlYXIgYmVmb3JlIGFsbG93aW5nIGNsaWNrIGV2ZW50cyBhZ2Fpbi4gKi9cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmaW5kV2hlcmUodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgd2lkdGgpIHtcbiAgICAgICAgdGhpcy5jLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7ICAgIC8vIHRoZSBwcm92aWRlZCBjb25maWcgb2JqZWN0c1xuICAgICAgICB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7ICAgICAgLy8gdGhlIGNvbHVtbiBub2Rlc1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYy5vbkNvbHVtblJlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5jLm9uQ29sdW1uUmVzaXplKHRoaXMuY29sdW1uc1tpbmRleF0ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKTtcbiAgICAgICAgbGV0IGFkanVzdGVkX2RlbHRhID0gZGVsdGE7XG5cbiAgICAgICAgaWYgKCAgIGFkanVzdGVkX2RlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aClcbiAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhID4gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuXG4gICAgICAgIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwICYmIHRoaXMucm93X3cgKyB0aGlzLnggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29udGFpbmVyX3cpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IGFkanVzdGVkX2RlbHRhO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBmaW5kV2hlcmUodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIG1hcHBpbmcpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2x1bW4pO1xuXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBjb2x1bW4ud2lkdGg7XG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHJvdy5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkgJiYgcm93LmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFdpZHRoID0gcm93LmNlbGxzW2NvbHVtbkluZGV4XS50cnVlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCA8IGNlbGxXaWR0aCA/IGNlbGxXaWR0aCA6IHdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvKiBmaW5kIHRoZSByZW5kZXJlZCByb3cgd2l0aCB0aGUgbG9uZ2VzdCBjb250ZW50IGVudHJ5ICovXG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlOZXdDb2x1bW5XaWR0aChjb2x1bW5JbmRleCwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRBcmlhVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMuYy5hcmlhLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICsgZGVsdGEgPj0gdGhpcy5jLnRvdGFsUm93cykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHRoaXMubmV4dF9hY3RpdmVfcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhIDwgMCAmJiB0aGlzLmFjdGl2ZV9yb3cgPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA+IDAgJiYgdGhpcy5hY3RpdmVfcm93IDwgdGhpcy5jLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93biBpbiB0aGUgdmlld3BvcnQuICovXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPiB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPCB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZGVsdGEpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5IHx8IHRoaXMuZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93KS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgY29uc3Qgbm9kZU1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKGNlbGxDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAuY2VsbCA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5yb3cgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVNYXA7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnbm9kZScsIG1hcC5yb3cpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhyb3cuc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobWFwLmNlbGwgJiYgdGhpcy5jLmNlbGxDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jLnJvd0NsaWNrRnVuYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5yb3dDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBqdW1wVG9Sb3dJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnkgPSAwO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gaW5kZXggKiB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3coaW5kZXgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVWaWV3O1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgaXNfZnVuY3Rpb24gPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNfc3RyaW5nID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBmYWxzZSxcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzX2NvbnRyb2xsZWQ6IGlzX3N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHx8IGlzX3N0cmluZyh0aGlzLnByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNfZm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLnZhbHVlIHx8ICcnfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSB8fCAnJ30pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHByb3BzLmlucHV0UHJvcHMudmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZShuZXh0X3ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ1VJVGV4dHVhbElucHV0OiBhIGNvbnRyb2xsZWQgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGJ5IGNoYW5naW5nIGl0cyBgcHJvcHMudmFsdWVgIG9yIGBwcm9wcy5pbnB1dFByb3BzLnZhbHVlYCwgbm90IHZpYSBwcm9ncmFtbWF0aWMgbWV0aG9kcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcy5maWVsZC52YWx1ZSA9IG5leHRfdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0X3ZhbHVlfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dCA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICBjb25zdCBpc19ub25fZW1wdHkgPSBCb29sZWFuKHRoaXMuc3RhdGUuaW5wdXQpO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0IHVpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInPlxuICAgICAgICAgICAgICAgIHtzaG91bGRfc2hvd19wbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGUsIHByb3BzIH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17bnVsbH1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICB0eXBlPXtudWxsfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17c3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSA/IHVuZGVmaW5lZCA6IHByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlIHx8IHByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17cHJvcHMuaW5wdXRQcm9wcy5uYW1lIHx8IHByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtwcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgcHJvcHMudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUgPyBwcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHByb3BzLnZhbHVlIHx8ICcnIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC52YWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VG9rZW5DbG9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLmRlc2NlbmRhbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNvbnN0IGlzX3N0cmluZyA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbGdvcml0aG06IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICBtYXRjaEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSW5wdXQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIGlzX2NvbnRyb2xsZWQ6IGlzX3N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHx8IGlzX3N0cmluZyh0aGlzLnByb3BzLnZhbHVlKSxcbiAgICAgICAgdXNlcklucHV0OiAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICAgICAgfHwgJycsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IG5leHRQcm9wcy52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGQ7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgPSBpbnB1dC5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQudmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXJrRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWFya0Z1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMSA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hdGNoRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWF0Y2hGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcklucHV0OiBldmVudC50YXJnZXQudmFsdWV9LCAoKSA9PiB0aGlzLmNvbXB1dGVNYXRjaGVzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudGl0eS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS51c2VySW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHR5cGU9e251bGx9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSA/IHVuZGVmaW5lZCA6IHByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlIHx8IHByb3BzLmRlZmF1bHRWYWx1ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb3BzLmlucHV0UHJvcHMubmFtZSB8fCBwcm9wcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8IHByb3BzLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0OiB0aGlzLmhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUgPyBwcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHByb3BzLnZhbHVlIHx8ICcnIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuYm9keSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5oZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmljb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5vbkNsaWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcbmdsb2JhbC5VSUtpdC5VSVV0aWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJQXJyb3dLZXlOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9VSUFycm93S2V5TmF2aWdhdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUGFnaW5hdGVkVmlldzogKGdsb2JhbC5VSUtpdC5VSVBhZ2luYXRlZFZpZXcgPSByZXF1aXJlKCcuL1VJUGFnaW5hdGVkVmlldycpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVGV4dHVhbElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVGV4dHVhbElucHV0ID0gcmVxdWlyZSgnLi9VSVRleHR1YWxJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVXRpbHM6IHtcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wZXJ0eTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnRyYW5zZm9ybVByb3BlcnR5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iXX0=
