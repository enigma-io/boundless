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
            var pageNumber = void 0;

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
        this.table = new _table2.default(this.getSubviewConfiguration());

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
                                                                                                                                                           * @class Table
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
    text.className = 'ui-table-cell-inner';

    var textNode = document.createTextNode(content);
    text.appendChild(textNode);

    node.appendChild(text);

    return textNode;
};

function createDOMCell(content, mapping, width, index) {
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

function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

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
    row.className = 'ui-table-row';
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

function validateColumnShape(column) {
    return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
}

function validateConfiguration(config) {
    // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
    if (config.static_mode !== undefined && typeof config.static_mode !== 'boolean') {
        throw Error('Table was not passed a valid `static_mode`; it should be a boolean.');
    }

    if (!(config.wrapper instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `wrapper` element.');
    }

    if (!(config.header instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `header` element.');
    }

    if (!(config.body instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `body` element.');
    }

    if (!config.static_mode && !(config['x-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-track` element.');
    }

    if (!config.static_mode && !(config['y-scroll-track'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-track` element.');
    }

    if (!config.static_mode && !(config['x-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `x-scroll-handle` element.');
    }

    if (!config.static_mode && !(config['y-scroll-handle'] instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `y-scroll-handle` element.');
    }

    if (!config.static_mode && !(config.aria instanceof HTMLElement)) {
        throw Error('Table was not passed a valid `aria` element.');
    }

    if (!Array.isArray(config.columns) || config.columns.length === 0 || !config.columns.every(validateColumnShape)) {
        throw Error('Table was not passed valid `columns`. It should be an array with at least one object conforming to: {\n            mapping: string,\n            resizable: bool,\n            title: string,\n            width: number (optional),\n        }');
    }

    if (typeof config.throttleInterval !== 'number') {
        throw Error('Table was not passed a valid `throttleInterval`; it should be a Number.');
    }

    if (typeof config.totalRows !== 'number') {
        throw Error('Table was not passed a valid `totalRows`; it should be a Number.');
    }

    if (typeof config.getRow !== 'function') {
        throw Error('Table was not passed a valid `getRow`; it should be a function.');
    }

    if (config.rowClickFunc !== undefined && typeof config.rowClickFunc !== 'function') {
        throw Error('Table was not passed a valid `rowClickFunc`; it should be a function.');
    }

    if (config.cellClickFunc !== undefined && typeof config.cellClickFunc !== 'function') {
        throw Error('Table was not passed a valid `cellClickFunc`; it should be a function.');
    }

    if (config.columnResizeFunc !== undefined && typeof config.columnResizeFunc !== 'function') {
        throw Error('Table was not passed a valid `columnResizeFunc`; it should be a function.');
    }

    if (typeof config.preserveScrollState !== 'boolean') {
        throw Error('Table was not passed a valid `preserveScrollState`; it should be a boolean.');
    }
}

var Table = function () {
    Table.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        validateConfiguration(this.c);
    };

    function Table(config) {
        var _this = this;

        _classCallCheck(this, Table);

        this.handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            } else if (_this.c.wrapper.clientWidth !== _this.container_w) {
                var old_width = _this.container_w;

                _this.calculateContainerDimensions();
                _this.calculateXBound();
                _this.initializeScrollBars();

                _this.x_scroll_handle_position = _this.x / _this.x_table_pixel_ratio * -1;

                if (_this.x_scroll_handle_position + _this.x_scroll_handle_size > _this.x_scroll_track_w) {
                    _this.x_scroll_handle_position = _this.x_scroll_track_w - _this.x_scroll_handle_size;
                }

                _this.translateXScrollHandle(_this.x_scroll_handle_position);

                // getting larger and we're fully scrolled to the right
                if (old_width < _this.container_w && _this.x_scroll_handle_position + _this.x_scroll_handle_size === _this.x_scroll_track_w) {
                    _this.x += _this.container_w - old_width;

                    _this.translateHeader(_this.x);
                    _this.translateBody(_this.x, _this.last_body_y);
                }
            }
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
                instance.y = applyDelta(instance.reset_delta, instance.y);
                instance.y_min = applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = applyDelta(instance.reset_delta, instance.y_max);

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

            _this.evt.deltaX = Math.floor(applyDelta(_this.last_x_scroll_handle_x, event.pageX - _this.distance_from_left) * _this.x_table_pixel_ratio);

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
            _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

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
                _this.evt.deltaY = Math.floor(applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

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
                    var cellWidth = void 0;

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
            var key = event.key || getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'Escape':
                    _this.resetActiveRow();
                    break;

                case 'ArrowDown':
                    if (_this.active_row !== -1 // already keying through the table
                     || _this.active_row === -1 && _this.row_start_index === 0 // at the beginning
                    ) {
                            _this.changeActiveRow(1);
                        } else {
                        // start the active row on the topmost row in the current viewport
                        _this.changeActiveRow(_this.row_start_index + _this.n_padding_rows + 1);
                    }

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

    Table.prototype.destroy = function destroy() {
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

    Table.prototype.resetActiveRow = function resetActiveRow() {
        var _this3 = this;

        this.active_row = -1;
        this.next_active_row = null;

        if (this.rows.length) {
            this.rows.forEach(function (row) {
                row.active = row.setIndex === _this3.active_row;
            });
        }
    };

    Table.prototype.resetInternals = function resetInternals() {
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

        this.evt = { preventDefault: _noop2.default };

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

        this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
        this.x_scroll_handle_size = this.y_scroll_handle_size = null;

        // reset!
        this.performTranslations();
    };

    Table.prototype.emptyHeader = function emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    };

    Table.prototype.buildColumns = function buildColumns() {
        var _this4 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column, index) {
            _this4.columns.push(createHeaderCell(column, index));
        });
    };

    Table.prototype.computeMinMaxHeaderCellDimensions = function computeMinMaxHeaderCellDimensions() {
        var cs = void 0;

        this.columns.forEach(function (column) {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    };

    Table.prototype.injectHeaderCells = function injectHeaderCells() {
        var _this5 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this5.fragment.appendChild(column.node);
        });

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    };

    Table.prototype.emptyBody = function emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    };

    Table.prototype.injectFirstRow = function injectFirstRow() {
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

    Table.prototype.injectRestOfRows = function injectRestOfRows() {
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

    Table.prototype.calculateCellHeight = function calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    };

    Table.prototype.calculateCellWidths = function calculateCellWidths() {
        var _this6 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this6.columns[index].width = _this6.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this6.columns[index].width;
        });
    };

    Table.prototype.calculateXBound = function calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    };

    Table.prototype.calculateYBound = function calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    };

    Table.prototype.calculateXScrollHandleSize = function calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.x_scroll_track_w / this.row_w * this.x_scroll_track_w;

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        } else if (this.x_scroll_handle_size > this.x_scroll_track_w) {
            this.x_scroll_handle_size = this.x_scroll_track_w;
        }

        return this.x_scroll_handle_size;
    };

    Table.prototype.calculateYScrollHandleSize = function calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    };

    Table.prototype.initializeScrollBars = function initializeScrollBars() {
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
    };

    Table.prototype.calculateContainerDimensions = function calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    };

    Table.prototype.regenerate = function regenerate() {
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

    Table.prototype.translateHeader = function translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[_transformProperty2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    Table.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transformProperty2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    Table.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    Table.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    };

    Table.prototype.performTranslations = function performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    };

    Table.prototype.scrollUp = function scrollUp() {
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

    Table.prototype.scrollDown = function scrollDown() {
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
    };

    Table.prototype.calculateVisibleTopRowIndex = function calculateVisibleTopRowIndex() {
        var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

        return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
    };

    Table.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    Table.prototype.applyNewColumnWidth = function applyNewColumnWidth(index, width) {
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

    Table.prototype.handleColumnResize = function handleColumnResize(delta) {
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

    Table.prototype.setAriaText = function setAriaText(text) {
        this.c.aria.innerText = text;
    };

    Table.prototype.setActiveRow = function setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(function (row) {
            row.active = row.setIndex === setIndex;
        });
    };

    Table.prototype.changeActiveRow = function changeActiveRow(delta) {
        var _this7 = this;

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
                return _this7.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    Table.prototype.discoverCellAndRowNodes = function discoverCellAndRowNodes(target) {
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

    Table.prototype.jumpToRowIndex = function jumpToRowIndex(index) {
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

    return Table;
}();

exports.default = Table;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUYWJsZS90YWJsZS9pbmRleC5qcyIsIlVJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiVUlWaWV3L2luZGV4LmpzIiwiZXhwb3J0cy5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJ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LE9BQU8sS0FBUCxDQUFhLGdCQUFiLEdBQWdDLFFBQVEsb0JBQVIsRUFBOEIsT0FuQnBFO0FBb0JiLGFBQVM7QUFDTCxnQkFBUyxPQUFPLEtBQVAsQ0FBYSxPQUFiLENBQXFCLE1BQXJCLEdBQThCLFFBQVEsa0JBQVIsRUFBNEIsT0FEOUQ7QUFFTCwyQkFBb0IsT0FBTyxLQUFQLENBQWEsT0FBYixDQUFxQixpQkFBckIsR0FBeUMsUUFBUSw2QkFBUixFQUF1QztBQUYvRixLQXBCSTtBQXdCYixZQUFTLE9BQU8sS0FBUCxDQUFhLE1BQWIsR0FBc0IsUUFBUSxVQUFSLEVBQW9CO0FBeEJ0QyxDQUFqQjs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25QcmVzc2VkOiBub29wLFxuICAgICAgICBvblVucHJlc3NlZDogbm9vcCxcbiAgICB9O1xuXG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIENvbnN0YW50cyA9IHtcbiAgICAgICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLm5hbWUgfHwgJ2NiX3NlbGVjdF9hbGwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5kaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuZnVuY3Rpb24gcmVzY2FsZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKGluc3RhbmNlLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHN0YXR1c1Byb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGFsdD17bnVsbH1cbiAgICAgICAgICAgICAgICAgc3JjPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlNb2RhbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1vZGFsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIG1hc2tQcm9wczoge30sXG4gICAgICAgIG1vZGFsUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGlhbG9nU3BlY2lmaWNQcm9wcyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWFzaydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2cgey4uLmRpYWxvZ1NwZWNpZmljUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L1VJRGlhbG9nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJUGFnaW5hdGVkVmlld1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBJdGVtIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRlZFZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBjb250cm9sVmFsdWVzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEgfHwgcHJvcHMubnVtSXRlbXNQZXJQYWdlID4gcHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgcHJvcHMudG90YWxJdGVtcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwYWdlclBvc2l0aW9uOiBmdW5jdGlvbiB2YWxpZGF0ZVBhZ2VyUG9zaXRpb24ocHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5wYWdlclBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5wYWdlclBvc2l0aW9uIDwgMSB8fCBwcm9wcy5wYWdlclBvc2l0aW9uID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbikpLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogJ8KrIEZpcnN0JyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiAnTGFzdCDCuycsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiAnTmV4dCDigLonLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICAgICAgcGFnZXJQb3NpdGlvbjogMSxcbiAgICAgICAgcG9zaXRpb246IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5wYWdlclBvc2l0aW9uLFxuICAgICAgICBudW1iZXJPZlBhZ2VzOiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcyxcbiAgICAgICAgdG90YWxJdGVtczogdGhpcy5wcm9wcy50b3RhbEl0ZW1zLFxuICAgICAgICBzaG93bkl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUpIHtcbiAgICAgICAgaWYgKG9sZFN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaWRlbnRpZmllciAhPT0gdGhpcy5wcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMoMSwgbmV4dFByb3BzLmdldEl0ZW0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIG51bWJlck9mUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKGN1cnJlbnRQYWdlLCBnZXRJdGVtID0gdGhpcy5wcm9wcy5nZXRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMuc3RhdGUudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IGdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgcGFnZU51bWJlcjtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMocGFnZU51bWJlciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uIHsuLi50aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93bkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlckNhc2UgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17J3NlZ21lbnRlZENvbnRyb2wnICsgKHBvc2l0aW9uTG93ZXJDYXNlWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyQ2FzZS5zbGljZSgxKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFsndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtJyArIHBvc2l0aW9uTG93ZXJDYXNlXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGVkLXZpZXcnPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRVxuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPV1xuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0ZWRWaWV3SXRlbSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICB9XG5cbiAgICBfbW91bnRlZCA9IGZhbHNlXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmRhdGEgIT09IHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IG5leHRQcm9wcy5kYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VudGVkICYmIHRoaXMuc3RhdGUuZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLnN0YXRlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbSc6IHRydWUsXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWxvYWRpbmcnOiB0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlLFxuICAgICAgICB9KSArIChleHRyYUNsYXNzZXMgPyAnICcgKyBleHRyYUNsYXNzZXMgOiAnJyk7XG4gICAgfVxuXG4gICAgY2xvbmVXaXRoQ2xhc3NlcyhlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuICg8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT48L2Rpdj4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXModGhpcy5zdGF0ZS5kYXRhLnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmVXaXRoQ2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG4vKlxuICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgbmV2ZXIgY2hhbmdlcy4gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgYGNvbXBvbmVudERpZFVwZGF0ZWAgYWZ0ZXIgYHNldFN0YXRlYCB0byB0cmlnZ2VyXG4gICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3BvdmVyIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZlhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgYW5jaG9yWUFsaWduOiB0aGlzLnByb3BzLmFuY2hvcllBbGlnbixcbiAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5ub2RlLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcG9wb3Zlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IC8+KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b24gey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGxhYmVsPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgICAgIG9uSGlkZTogbm9vcCxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi5kZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVPcHRpb25Gb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZS5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBUYWJsZSBmcm9tICcuL3RhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUm93SW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG90YWxSb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gICAgICAgIHN0YXRpYzogUHJvcFR5cGVzLmJvb2wsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0cnVlLFxuICAgIH1cblxuICAgIGdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy5yZWZzLndyYXBwZXIsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMucmVmcy5oZWFkZXIsXG4gICAgICAgICAgICBib2R5OiB0aGlzLnJlZnMuYm9keSxcbiAgICAgICAgICAgICd4LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd4LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICBhcmlhOiB0aGlzLnJlZnMuYXJpYSxcblxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgcm93Q2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QsXG4gICAgICAgICAgICBjZWxsQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgb25Db2x1bW5SZXNpemU6IHRoaXMucHJvcHMub25Db2x1bW5SZXNpemUsXG4gICAgICAgICAgICBnZXRSb3c6IHRoaXMucHJvcHMuZ2V0Um93LFxuICAgICAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdGhpcy5wcm9wcy5wcmVzZXJ2ZVNjcm9sbFN0YXRlLFxuICAgICAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogdGhpcy5wcm9wcy50aHJvdHRsZUludGVydmFsLFxuICAgICAgICAgICAgdG90YWxSb3dzOiB0aGlzLnByb3BzLnRvdGFsUm93cyxcblxuICAgICAgICAgICAgLy8gaW50ZXJuYWwgdXNlIG9ubHksIHJlbmRlcnMgdGhlIHRhYmxlIHdpdGhvdXQgYW55IGV2ZW50IGxpc3RlbmVycyAobWluaW1hbCBjb21wdXRhdGlvbilcbiAgICAgICAgICAgIHN0YXRpY19tb2RlOiB0aGlzLnByb3BzLnN0YXRpYyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZSh0aGlzLmdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbmx5Q29sdW1uV2lkdGhDaGFuZ2VkQW5kTWF0Y2hlc1RhYmxlSW50ZXJuYWxzKGN1cnJlbnRfY29sdW1ucywgcHJldl9jb2x1bW5zLCB0YWJsZV9pbnRlcm5hbF9jb2x1bW5zKSB7XG4gICAgICAgIC8qIHRoZSBjb2x1bW5zIHNob3VsZCBleGFjdGx5IG1hdGNoIGluIHRoZSBwcm9wZXIgb3JkZXIsIG9yIHRoZSB3aWR0aHMgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHRoZSBpbnRlcm5hbCBjb2x1bW5cbiAgICAgICAgcmVwcmVzZW50YXRpb24sIG1lYW5pbmcgdGhlIGNoYW5nZSBpcyBhIHJlYWN0aW9uIHRvIGJlaW5nIGFsZXJ0ZWQgYnkgYHByb3BzLm9uQ29sdW1uUmVzaXplYCAqL1xuICAgICAgICByZXR1cm4gY3VycmVudF9jb2x1bW5zLmV2ZXJ5KChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gICAgY29sdW1uID09PSBwcmV2X2NvbHVtbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgfHwgKGNvbHVtbi5tYXBwaW5nID09PSBwcmV2X2NvbHVtbnNbaW5kZXhdLm1hcHBpbmcgJiYgY29sdW1uLndpZHRoID09PSB0YWJsZV9pbnRlcm5hbF9jb2x1bW5zW2luZGV4XS53aWR0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRfcHJvcHMgPSBbXTtcbiAgICAgICAgbGV0IGtleTtcblxuICAgICAgICAvKiBiaWRpcmVjdGlvbmFsIGtleSBjaGFuZ2UgZGV0ZWN0aW9uICovXG5cbiAgICAgICAgZm9yIChrZXkgaW4gdGhpcy5wcm9wcykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHNba2V5XSAhPT0gcHJldl9wcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZF9wcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGtleSBpbiBwcmV2X3Byb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJldl9wcm9wc1trZXldICE9PSB0aGlzLnByb3BzW2tleV0gJiYgY2hhbmdlZF9wcm9wcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZF9wcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlZF9wcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkX3Byb3BzLmluZGV4T2YoJ2p1bXBUb1Jvd0luZGV4JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLyoganVtcFRvUm93SW5kZXggYWxyZWFkeSB0cmlnZ2VycyBhIHJlZ2VuZXJhdGlvbiwganVzdCBhdm9pZGluZyBydW5uaW5nIGl0IHR3aWNlICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VkX3Byb3BzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VkX3Byb3BzWzBdID09PSAnY29sdW1ucycpIHtcbiAgICAgICAgICAgICAgICAvKiBkaWQgdGhpbmdzIG1hdGVyaWFsbHkgY2hhbmdlLCBvciBqdXN0IHVwZGF0aW5nIGEgY29sdW1uIHdpZHRoPyAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ubHlDb2x1bW5XaWR0aENoYW5nZWRBbmRNYXRjaGVzVGFibGVJbnRlcm5hbHModGhpcy5wcm9wcy5jb2x1bW5zLCBwcmV2X3Byb3BzLmNvbHVtbnMsIHRoaXMudGFibGUuY29sdW1ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZS5yZWdlbmVyYXRlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJYU2Nyb2xsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc3RhdGljKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcllTY3JvbGwoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zdGF0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQXJpYSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnN0YXRpYykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzIHx8ICd1aS1vZmZzY3JlZW4nfSBhcmlhLWxpdmU9J3BvbGl0ZScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclhTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJZU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJpYSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKiBAY2xhc3MgVGFibGVcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi8uLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vLi4vVUlVdGlscy9ub29wJztcblxuLypcblxuRk9SIEZVVFVSRSBFWUVTXG5cblNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0IGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cblxuVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGUgYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuXG5fX0ltcG9ydGFudCBOb3RlX19cblxuQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cblxuXG5PUkRFUiBPRiBPUEVSQVRJT05TXG5cbjEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4yLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG5cbklmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhbiB0cnlpbmcgdG8gZGlmZi5cblxuKi9cblxuY29uc3QgY2VsbENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLWNlbGxcXGIvZztcbmNvbnN0IHJvd0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvd1xcYi9nO1xuXG5mdW5jdGlvbiBhcHBseURlbHRhKGRlbHRhLCBudW0pIHtcbiAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgIHJldHVybiBudW0gPCAwID8gbnVtIC0gZGVsdGEgOiBudW0gKyBkZWx0YTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVtIC0gZGVsdGE7XG59XG5cbmZ1bmN0aW9uIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlIDE5MjpcbiAgICAgICAgcmV0dXJuICdFc2NhcGUnO1xuXG4gICAgY2FzZSA0MDpcbiAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgY2FzZSAzODpcbiAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgIGNhc2UgMTM6XG4gICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUzZCAoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cblxuZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCAnO1xuICAgIGNlbGwuY2xhc3NOYW1lICs9IGluZGV4ICUgMiA9PT0gMCA/ICd1aS10YWJsZS1jZWxsLWV2ZW4nIDogJ3VpLXRhYmxlLWNlbGwtb2RkJztcblxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgsIGluZGV4KTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoLCBpbmRleCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnMgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoLCBpbmRleCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWFjdGl2ZScsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9ICAgdGhpcy5fc2V0SW5kZXggPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3VpLXRhYmxlLXJvdyB1aS10YWJsZS1yb3ctZXZlbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctb2RkJywgJ3VpLXRhYmxlLXJvdy1ldmVuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9ICAgdGhpcy5fc2V0SW5kZXggPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3VpLXRhYmxlLXJvdyB1aS10YWJsZS1yb3ctb2RkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1ldmVuJywgJ3VpLXRhYmxlLXJvdy1vZGQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdmFsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEluZGV4ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIGdldCB3YWl0aW5nRm9yUmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uOyB9LFxuICAgICAgICBzZXQgd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWxvYWRpbmcnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IG51bGwgfHwgdGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVt0aGlzLl9pdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW2NvbHVtbnNbdGhpcy5faXRlcmF0b3JdLm1hcHBpbmddO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3knOiBtZXRhZGF0YS55LFxuICAgICAgICBnZXQgeSgpIHsgcmV0dXJuIHRoaXMuX3k7IH0sXG4gICAgICAgIHNldCB5KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSB0byBoYXZlIHRoZSBjbGFzc2VzIGFkZGVkIGF1dG9tYXRpY2FsbHlcbiAgICByb3dPYmouc2V0SW5kZXggPSBtZXRhZGF0YS5zZXRJbmRleDtcbiAgICByb3dPYmouYWN0aXZlID0gbWV0YWRhdGEuYWN0aXZlO1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbHVtblNoYXBlKGNvbHVtbikge1xuICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4ucmVzaXphYmxlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgJiYgKGNvbHVtbi53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgIC8vIHgtc2Nyb2xsLXRyYWNrLCB5LXNjcm9sbC10cmFjaywgeC1zY3JvbGwtaGFuZGxlLCB5LXNjcm9sbC1oYW5kbGUsIGFuZCBhcmlhIGFyZSBub3QgcmVxdWlyZWQgaW4gc3RhdGljX21vZGVcbiAgICBpZiAoY29uZmlnLnN0YXRpY19tb2RlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5zdGF0aWNfbW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBzdGF0aWNfbW9kZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoY29uZmlnLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHdyYXBwZXJgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoY29uZmlnLmhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgaGVhZGVyYCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghKGNvbmZpZy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd4LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneS1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3ktc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWcuYXJpYSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYXJpYWAgZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICBpZiAoICAgIUFycmF5LmlzQXJyYXkoY29uZmlnLmNvbHVtbnMpXG4gICAgICAgIHx8IGNvbmZpZy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICB8fCAhY29uZmlnLmNvbHVtbnMuZXZlcnkodmFsaWRhdGVDb2x1bW5TaGFwZSkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYFRhYmxlIHdhcyBub3QgcGFzc2VkIHZhbGlkIFxcYGNvbHVtbnNcXGAuIEl0IHNob3VsZCBiZSBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IG9uZSBvYmplY3QgY29uZm9ybWluZyB0bzoge1xuICAgICAgICAgICAgbWFwcGluZzogc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBib29sLFxuICAgICAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoOiBudW1iZXIgKG9wdGlvbmFsKSxcbiAgICAgICAgfWApO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnRocm90dGxlSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUYWJsZSB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0aHJvdHRsZUludGVydmFsYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5nZXRSb3cgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGdldFJvd2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcucm93Q2xpY2tGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5yb3dDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlIHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY2VsbENsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY29sdW1uUmVzaXplRnVuYyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuY29sdW1uUmVzaXplRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY29sdW1uUmVzaXplRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnByZXNlcnZlU2Nyb2xsU3RhdGUgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBFcnJvcignVGFibGUgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcHJlc2VydmVTY3JvbGxTdGF0ZWA7IGl0IHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSB7XG4gICAgcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGU7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbih0aGlzLmMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5jLmJvZHk7XG4gICAgICAgIHRoaXMuYm9keV9zdHlsZSA9IHRoaXMuYm9keS5zdHlsZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZSA9IHRoaXMuaGVhZGVyLnN0eWxlO1xuXG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3coKTtcblxuICAgICAgICAvKiB1c2VkIGluIHNjcm9sbCBzdGF0ZSBwcmVzZXJ2YXRpb24gY2FsY3VsYXRpb25zICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0QWN0aXZlUm93KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSAtMTtcbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeSA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubl9wYWRkaW5nX3Jvd3MgPSAzO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy5uZXh0X3kgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10pIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wID0gICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10pIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fbGVmdCA9ICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gMDtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IDA7XG5cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHZhcmlhYmxlcyBpbiB2YXJpb3VzIGNhbGN1bGF0aW9uc1xuICAgICAgICB0aGlzLmkgPSBudWxsO1xuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSBudWxsO1xuXG4gICAgICAgIC8vIHRyYW5zbGF0aW9uIGNhY2hlc1xuICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmV2dCA9IHtwcmV2ZW50RGVmYXVsdDogbm9vcH07XG5cbiAgICAgICAgdGhpcy50b3VjaCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IDA7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy55X3Njcm9sbF90cmFja19oID0gbnVsbDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IVxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBlbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG5cbiAgICAgICAgdGhpcy5jLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4sIGluZGV4KSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29sdW1uLm5vZGUpO1xuXG4gICAgICAgICAgICBjb2x1bW4ubWluV2lkdGggPSBwYXJzZUludChjc1snbWluLXdpZHRoJ10sIDEwKTtcbiAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHBhcnNlSW50KGNzWydtYXgtd2lkdGgnXSwgMTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbmplY3RIZWFkZXJDZWxscygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uLm5vZGUpKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGVtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluamVjdEZpcnN0Um93KCkge1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3csXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMucm93X3N0YXJ0X2luZGV4KSxcbiAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCgwKTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb3dzWzBdLm5vZGUpO1xuICAgIH1cblxuICAgIGluamVjdFJlc3RPZlJvd3MoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLmkgPSAxOyB0aGlzLmkgPCB0aGlzLm5fcm93c19yZW5kZXJlZDsgdGhpcy5pICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pICsgdGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLmNlbGxfaCA9IHRoaXMucm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3NbMF0uY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMucm93X3cgPSB0aGlzLnJvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9tYXggPSB0aGlzLmNvbnRhaW5lcl93IDw9IHRoaXMucm93X3cgPyB0aGlzLmNvbnRhaW5lcl93IC0gdGhpcy5yb3dfdyA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAvIHRoaXMucm93X3cgKiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3c7XG5cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IDEyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9ICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9PT0gdGhpcy5uX3Jvd3NfcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcl9oICogKHRoaXMubl9yb3dzX3Zpc2libGUgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG5cbiAgICAgICAgLyogdG90YWwgdHJhbnNsYXRhYmxlIHNwYWNlIC8gc2Nyb2xsYmFyIHRyYWNrIHNpemUgPSByZWxhdGl2ZSB2YWx1ZSBvZiBhIHNjcm9sbGJhciBwaXhlbCAqL1xuICAgICAgICB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gPSBNYXRoLmFicyh0aGlzLnhfbWF4KSAvICh0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplKTtcblxuICAgICAgICAvKiBob3cgbWFueSBzY3JvbGxiYXIgcGl4ZWxzID09PSBvbmUgcm93PyAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvID0gKHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUpIC8gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c192aXNpYmxlKTtcblxuICAgICAgICAvKiBoaWRlIHRoZSBzY3JvbGxiYXJzIGlmIHRoZXkgYXJlIG5vdCBuZWVkZWQgKi9cblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyX2ggPSB0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl93ID0gdGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLmJvZHlfaCA9IHRoaXMuYy5ib2R5LmNsaWVudEhlaWdodCB8fCAxMTA7XG4gICAgfVxuXG4gICAgaGFuZGxlV2luZG93UmVzaXplID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0ICE9PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgbWF5IGJlIG5lZWRlZCB0byBkaXNwbGF5IHRoZSBkYXRhLCBzbyB3ZSBuZWVkIHRvIHJlYnVpbGQgKi9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2VuZXJhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCAhPT0gdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgY29uc3Qgb2xkX3dpZHRoID0gdGhpcy5jb250YWluZXJfdztcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueCAvIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyAqIC0xO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuXG4gICAgICAgICAgICAvLyBnZXR0aW5nIGxhcmdlciBhbmQgd2UncmUgZnVsbHkgc2Nyb2xsZWQgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBpZiAob2xkX3dpZHRoIDwgdGhpcy5jb250YWluZXJfdyAmJiB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmNvbnRhaW5lcl93IC0gb2xkX3dpZHRoO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVIZWFkZXIodGhpcy54KTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZUJvZHkodGhpcy54LCB0aGlzLmxhc3RfYm9keV95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoY29uZmlnID0gdGhpcy5jKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IHRoaXMuYykgeyB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7IH1cblxuICAgICAgICAvKiBzdG9yZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHVuaW9uIGZvciBpZiB3ZSBuZWVkIHRvIHJlaHlkcmF0ZSB0aGUgcHJldmlvdXMgc2Nyb2xsIHN0YXRlICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy54O1xuICAgICAgICB0aGlzLl9feSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuXG4gICAgICAgIHRoaXMucmVzZXRJbnRlcm5hbHMoKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG5cbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA/IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggfHwgMCA6IDA7XG5cbiAgICAgICAgdGhpcy5pbmplY3RGaXJzdFJvdygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxXaWR0aHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSBNYXRoLmNlaWwodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCkgKyB0aGlzLm5fcGFkZGluZ19yb3dzO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c19yZW5kZXJlZCA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gdGhpcy5jLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSBNYXRoLmZsb29yKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgLSAxO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0SGVhZGVyQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RSZXN0T2ZSb3dzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSAmJiB0aGlzLl9feCAhPT0gbnVsbCAmJiB0aGlzLl9feSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8qIHRoZSBjYWNoZWQgdmFsdWVzIGFyZSB0aGVuIGFwcGxpZWQgYWdhaW5zdCB0aGUgdGFibGUgdG8gYXJyaXZlIGF0IHRoZSBwcmV2aW91cyBzdGF0ZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAtdGhpcy5fX3gsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogLXRoaXMuX195LFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUgJiYgeCAhPT0gdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUoeSkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSAmJiB5ICE9PSB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVIZWFkZXIobmV4dFgpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUJvZHkobmV4dFgsIG5leHRZKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBzY3JvbGxVcCgpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggMCkgd2UgdHJ1bmNhdGUgdXB3YXJkIHNjcm9sbCBhdHRlbXB0c1xuICAgICAgICAgICB0byB0aGUgdXBwZXIgdHJhbnNsYXRpb24gYm91bmRhcnkgdG8ga2VlcCBmcm9tIHNraXBwaW5nIG9mZiBpbnRvIG5vdGhpbmduZXNzICovXG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwICYmIHRoaXMubmV4dF95ID4gdGhpcy55X21pbikge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWluO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgfHwgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21pbikgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgYm90dG9tIHBvc2l0aW9uIHRvIHRoZSB0b3BcbiAgICAgICAgICAgKGFib3ZlIHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9taW4pIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICAvKiBwcmV2ZW50IHVuZGVyLXJvdGF0aW5nIGJlbG93IGluZGV4IHplcm8sIHRoZSBsb2dpY2FsIHN0YXJ0IG9mIGEgZGF0YSBzZXQgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSAtPSBNYXRoLmFicyh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0KSAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLnJvd19zdGFydF9pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBkZWNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuXG4gICAgICAgICAgICAgICAgLyogYWNjb21vZGF0ZSBmb3IgdGhlIG51bWJlciBvZiBwaXhlbHMgdGhhdCB3aWxsIG5vdCBiZSByZW5kZXJlZCAqL1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMuc2hpZnRfZGVsdGEgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleF1cbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVswXV0ueSAtIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnVuc2hpZnQodGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wb3AoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuXG4gICAgICAgICAgICB0aGlzLnlfbWluICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLnlfbWF4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxEb3duKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBlbmQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggbikgd2UgdHJ1bmNhdGUgYW55IHNjcm9sbCBhdHRlbXB0cyAgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzIC0gMSAmJiB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID49IHRoaXMueV9tYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgdG9wIHBvc2l0aW9uIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgKGJlbG93IHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgKyB0aGlzLnJvd19lbmRfaW5kZXggKyAxID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gKFxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAodGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPT09IDAgPyAwIDogMSkpXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICBhcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KHRhcmdldFkgPSB0aGlzLm5leHRfeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3dzW1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVtcbiAgICAgICAgICAgICAgICBNYXRoLmNlaWwoTWF0aC5hYnMoXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5RGVsdGEodGhpcy55X21pbiwgdGFyZ2V0WSkgLyB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICBdXG4gICAgICAgIF0uc2V0SW5kZXg7XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVggPT09IDAgICAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kZWx0YV94ID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuZGVsdGFfeSA9ICAgZXZlbnQuZGVsdGFNb2RlID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LmRlbHRhWTtcblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueCA6IHRoaXMueCAtIHRoaXMuZGVsdGFfeDtcbiAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueSA6IHRoaXMueSAtIHRoaXMuZGVsdGFfeTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X3ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3ggPCB0aGlzLnhfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueF9tYXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBuZWdhdGUgdGhlIHZlcnRpY2FsIG1vdmVtZW50LCBub3QgZW5vdWdoIHJvd3MgdG8gZmlsbCB0aGUgYm9keSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPCB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID4gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNldF90aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRfdGltZXIpOyB9XG5cbiAgICAgICAgLyogcmVzZXQgcm93ICYgd3JhcHBlciBZIHZhbHVlcyB0b3dhcmQgMCB0byBwcmV2ZW50IG92ZXJmbG93aW5nICovXG4gICAgICAgIHRoaXMucmVzZXRfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiByZXNldFlBeGlzKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF90aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X2RlbHRhID0gaW5zdGFuY2UueV9taW47XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcG9zaXRpb25pbmcgdmFyaWFibGVzICovXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueSk7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21pbiA9IGFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWluKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWF4ID0gYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9tYXgpO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHJvd3MgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnJvd3Nfb3JkZXJlZF9ieV95LmZvckVhY2goKHBvc2l0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnJvd3NbcG9zaXRpb25dLnkgPSBpbmRleCAqIGluc3RhbmNlLmNlbGxfaDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCB0aGUgd3JhcHBlciAqL1xuICAgICAgICAgICAgaW5zdGFuY2UudHJhbnNsYXRlQm9keShpbnN0YW5jZS54LCBpbnN0YW5jZS55KTtcblxuICAgICAgICB9LCAxMDAsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgoKTtcblxuICAgICAgICAvKiBxdWV1ZSB1cCB0cmFuc2xhdGlvbnMgYW5kIHRoZSBicm93c2VyIHdpbGwgZXhlY3V0ZSB0aGVtIGFzIGFibGUsIG5lZWQgdG8gcGFzcyBpbiB0aGUgdmFsdWVzIHRoYXQgd2lsbCBjaGFuZ2UgZHVlIHRvIG1vcmUgaGFuZGxlTW92ZUludGVudCBpbnZvY2F0aW9ucyBiZWZvcmUgdGhpcyByQUYgZXZlbnR1YWxseSBleGVjdXRlcy4gKi9cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiByQUYobmV4dFgsIGN1cnJYLCBuZXh0WSwgdmlzaWJsZVRvcFJvd0luZGV4KSB7XG4gICAgICAgICAgICBpZiAobmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICs9ICgobmV4dFggLSBjdXJyWCkgLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8pICogLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdmlzaWJsZVRvcFJvd0luZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMubmV4dF94LCB0aGlzLngsIHRoaXMubmV4dF95LCB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCkpO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMubmV4dF94O1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm5leHRfeTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBoYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWCAtIHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSAtIHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteC1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBhcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCwgZXZlbnQucGFnZVggLSB0aGlzLmRpc3RhbmNlX2Zyb21fbGVmdFxuICAgICAgICAgICAgKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpb1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBhcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSwgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wXG4gICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgLSB0aGlzLnlfc2Nyb2xsX29mZnNldFxuICAgICAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X3BhZ2VYKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbztcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X2NvbHVtbl94KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvY2tEcmFnVG9TY3JvbGwoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiB0aGUgYnJvd3NlciBmaXJlcyB0aGUgbW91c2V1cCBhbmQgY2xpY2sgZXZlbnRzIHNpbXVsdGFuZW91c2x5LCBhbmQgd2UgZG9uJ3Qgd2FudCBvdXIgY2xpY2sgaGFuZGxlciB0byBiZSBleGVjdXRlZCwgc28gYSB6ZXJvLWRlbGF5IHNldFRpbWVvdXQgd29ya3MgaGVyZSB0byBsZXQgdGhlIHN0YWNrIGNsZWFyIGJlZm9yZSBhbGxvd2luZyBjbGljayBldmVudHMgYWdhaW4uICovXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMudW5sb2NrRHJhZ1RvU2Nyb2xsKCksIDApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuYy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAvLyB0aGUgcHJvdmlkZWQgY29uZmlnIG9iamVjdHNcbiAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAgIC8vIHRoZSBjb2x1bW4gbm9kZXNcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5jZWxsc1tpbmRleF0ud2lkdGggPSB3aWR0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgIGlmICh0aGlzLmMub25Db2x1bW5SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuYy5vbkNvbHVtblJlc2l6ZSh0aGlzLmNvbHVtbnNbaW5kZXhdLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtblJlc2l6ZShkZWx0YSkge1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZih0aGlzLmNvbHVtbl9pc19yZXNpemluZyk7XG4gICAgICAgIGxldCBhZGp1c3RlZF9kZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIGlmICggICBhZGp1c3RlZF9kZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aClcbiAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA+IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKSB7XG4gICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEpO1xuXG4gICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhblxuICAgICAgICB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgaWYgKGFkanVzdGVkX2RlbHRhIDwgMCAmJiB0aGlzLnJvd193ICsgdGhpcy54ICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBhZGp1c3RlZF9kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5BdXRvRXhwYW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoY29sdW1uSW5kZXgsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5jLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuYWN0aXZlID0gcm93LnNldEluZGV4ID09PSBzZXRJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSA+PSB0aGlzLmMudG90YWxSb3dzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93ICsgZGVsdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfYWN0aXZlX3Jvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5uZXh0X2FjdGl2ZV9yb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLm5leHRfYWN0aXZlX3Jvdy5kYXRhW3RoaXMuY29sdW1uc1swXS5tYXBwaW5nXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA+IHRoaXMueSlcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xIDwgdGhpcy55IC0gdGhpcy5ib2R5X2ggKyB0aGlzLmNlbGxfaClcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmNlbGxfaCAqIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPCAwICYmIHRoaXMuYWN0aXZlX3JvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID4gMCAmJiB0aGlzLmFjdGl2ZV9yb3cgPCB0aGlzLmMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLyogVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA+IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA8IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXkgfHwgZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3coKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5hY3RpdmVfcm93ICE9PSAtMSAvLyBhbHJlYWR5IGtleWluZyB0aHJvdWdoIHRoZSB0YWJsZVxuICAgICAgICAgICAgICAgIHx8ICh0aGlzLmFjdGl2ZV9yb3cgPT09IC0xICYmIHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwKSAvLyBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgdGhlIGFjdGl2ZSByb3cgb24gdGhlIHRvcG1vc3Qgcm93IGluIHRoZSBjdXJyZW50IHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3codGhpcy5yb3dfc3RhcnRfaW5kZXggKyB0aGlzLm5fcGFkZGluZ19yb3dzICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29sdW1uLnRpdGxlfTogJHtyb3dbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChjZWxsQ2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZGlzY292ZXJDZWxsQW5kUm93Tm9kZXMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAobWFwLnJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3cocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsICYmIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5yb3dDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAganVtcFRvUm93SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55ID0gMDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IGluZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KGluZGV4KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBpc19mdW5jdGlvbiA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc19zdHJpbmcgPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IGZhbHNlLFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNfY29udHJvbGxlZDogaXNfc3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkgfHwgaXNfc3RyaW5nKHRoaXMucHJvcHMudmFsdWUpLFxuICAgICAgICBpc19mb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWUgfHwgJyd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8ICcnfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogcHJvcHMuaW5wdXRQcm9wcy52YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogcHJvcHMudmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbHVlKG5leHRfdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignVUlUZXh0dWFsSW5wdXQ6IGEgY29udHJvbGxlZCBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYnkgY2hhbmdpbmcgaXRzIGBwcm9wcy52YWx1ZWAgb3IgYHByb3BzLmlucHV0UHJvcHMudmFsdWVgLCBub3QgdmlhIHByb2dyYW1tYXRpYyBtZXRob2RzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dF92YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRfdmFsdWV9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0ID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IEJvb2xlYW4odGhpcy5zdGF0ZS5pbnB1dCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNfZm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNfbm9uX2VtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNfbm9uX2VtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQgdWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic+XG4gICAgICAgICAgICAgICAge3Nob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZSwgcHJvcHMgfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBuYW1lPXtudWxsfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgIHR5cGU9e251bGx9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtzdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlID8gdW5kZWZpbmVkIDogcHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgcHJvcHMuZGVmYXVsdFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtwcm9wcy5pbnB1dFByb3BzLm5hbWUgfHwgcHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e3Byb3BzLmlucHV0UHJvcHMudHlwZSB8fCBwcm9wcy50eXBlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSA/IHByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgcHJvcHMudmFsdWUgfHwgJycgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGZpcnN0ID0gYXJyYXkgPT4gYXJyYXlbMF07XG5jb25zdCBsYXN0ID0gYXJyYXkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICAgICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogbm9vcCxcbiAgICAgICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBub29wLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dCB7Li4uZGVzY2VuZGFudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJFRk9SRTogJ0JFRk9SRScsXG4gICAgICAgIEFGVEVSOiAnQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlbG93JzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUxPVyxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgdGhpcy5wcm9wcy50ZXh0fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcblxuY29uc3QgaXNfc3RyaW5nID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya0Z1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgIG1hdGNoRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25JbnB1dDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYWxnb3JpdGhtOiBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICBlbnRpdGllczogW10sXG4gICAgICAgIGhpbnRQcm9wczoge30sXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgaXNfY29udHJvbGxlZDogaXNfc3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkgfHwgaXNfc3RyaW5nKHRoaXMucHJvcHMudmFsdWUpLFxuICAgICAgICB1c2VySW5wdXQ6ICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWVcbiAgICAgICAgICAgICAgICAgICB8fCAnJyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogbmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogbmV4dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQoKSB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZDtcbiAgICB9XG5cbiAgICBzZWxlY3QoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IGlucHV0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC52YWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJJbnB1dDogbmV3VmFsdWUgfSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hcmtGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXJrRnVuYyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya0Z1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWF0Y2hGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXRjaEZ1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuY2Agd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWF0Y2hlcyhlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS51c2VySW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BtYXRjaF8kJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50aXR5LnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyh0aGlzLnN0YXRlLnVzZXJJbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgdHlwZT17bnVsbH1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBzdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlID8gdW5kZWZpbmVkIDogcHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgcHJvcHMuZGVmYXVsdFZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvcHMuaW5wdXRQcm9wcy5uYW1lIHx8IHByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgcHJvcHMudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ6IHRoaXMuaGFuZGxlSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSA/IHByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgcHJvcHMudmFsdWUgfHwgJycgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBTZWFyY2hlcyBhbmQgcmV0dXJucyB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGFuIGFycmF5IGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL2ZpbmRXaGVyZVxuICovXG5cbmxldCBfZmluZFdoZXJlSW5kZXggPSBudWxsO1xuXG4vKipcbiAqIEBwYXJhbSAge0FycmF5W09iamVjdF19IGFycmF5ICAgICBhbiBhcnJheSBvZiBvYmplY3RzXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICBwcm9wZXJ0eSAgdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIG1hdGNoIGFnYWluc3RcbiAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgIHZhbHVlICAgICB0aGUgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCAodXNlcyBzdHJpY3QgZXF1YWxpdHkpXG4gKlxuICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH0gVGhlIG1hdGNoZWQgYXJyYXkgaXRlbSwgb3Igbm90aGluZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZFdoZXJlKGFycmF5LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBfZmluZFdoZXJlSW5kZXggPSBhcnJheS5sZW5ndGggLSAxO1xuXG4gICAgd2hpbGUgKF9maW5kV2hlcmVJbmRleCA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheVtfZmluZFdoZXJlSW5kZXhdW3Byb3BlcnR5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtfZmluZFdoZXJlSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgX2ZpbmRXaGVyZUluZGV4IC09IDE7XG4gICAgfVxufSAvLyBvcHRpbWl6ZWQgc3BlY2lmaWNhbGx5IHRvIG9ubHkgbG9vayBmb3IgYSBzaW5nbGUga2V5OnZhbHVlIG1hdGNoXG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKipcbiAqIFRyaWdnZXIgbmF0aXZlIHRvYXN0cyBpbiBzdXBwb3J0aW5nIGJyb3dzZXJzLlxuICogQGNsYXNzIFVJTm90aWZpY2F0aW9uU2VydmljZVxuICovXG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmhlYWRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcuaWNvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLm9uQ2xpY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpXG4gICAgICAgICk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBnZXRFeGFjdFR5cGUgPSBmdW5jdGlvbiByZXRyaWV2ZURlZXBUeXBlKG9iamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbn07XG5cbmNvbnN0IGNvbXBhcmVPYmplY3RLZXlzID0gZnVuY3Rpb24gY29tcGFyZU9iamVjdEtleXMoa2V5LCBiYXNlQXJyYXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXNba2V5XSAhPT0gJ3VuZGVmaW5lZCcgJiYgYmFzZUFycmF5W2tleV0gPT09IHRoaXNba2V5XTtcbn07IC8vIGB0aGlzYCBpcyBzZXQgdG8gdGhlIGNvbXBhcmlzb24gYXJyYXlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGFsbG93RXF1YWxpdHkoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSBnZXRFeGFjdFR5cGUoYSk7XG5cbiAgICBpZiAoICAgIHR5cGUgIT09IGdldEV4YWN0VHlwZShiKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgbWlzbWF0Y2hlcyBjYW4ndCBiZSBjb21wYXJlZFxuICAgICAgICB8fCAodHlwZSAhPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgdHlwZSAhPT0gJ1tvYmplY3QgQXJyYXldJykpIHsgLy8gZnVuY3Rpb25zLCBQcm9taXNlcywgZXRjIGNhbm5vdCBiZSBkaXJlY3RseSBjb21wYXJlZFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYikgJiYgT2JqZWN0LmtleXMoYikuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGEpO1xuICAgIH1cblxuICAgIHJldHVybiAgICBhLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGIuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pXG4gICAgICAgICAgICYmIGIuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYS5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSk7XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi9VSVV0aWxzL3NoYWxsb3dFcXVhbCc7XG5cbi8qKlxuICogQW4gYXVnbWVudGVkIHZlcnNpb24gb2YgYFJlYWN0LkNvbXBvbmVudGAgd2l0aCBzb21lIGhlbHBmdWwgYWJzdHJhY3Rpb25zIGFkZGVkIHRvIHNtb290aFxuICogdGhlIGNvbXBvbmVudCBkZXZlbG9wbWVudCBwcm9jZXNzLlxuICpcbiAqIEFsbCBVSUtpdCBjb21wb25lbnRzIGFyZSBiYXNlZCBvbiBVSVZpZXcuXG4gKlxuICogQGF1Z21lbnRzIHtSZWFjdC5Db21wb25lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVmlldyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzIGRhdGEgcGFzc2VkIG9uIHRvIHRoZSBlbmQgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGUgPyB0aGlzLmluaXRpYWxTdGF0ZSgpIDoge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwcm94aW1hdGVzIHRoZSBAbGlua3tQdXJlUmVuZGVyTWl4aW4gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9wdXJlLXJlbmRlci1taXhpbi5odG1sfSBmcm9tIEVTNSBSZWFjdC4gSW1wbGVtZW50IHNob3VsZENvbXBvbmVudFVwZGF0ZSBpbiB5b3VyIHN1YmNsYXNzIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIHRoZSBpbmNvbWluZyBwcm9wcyBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBwcm9wc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFN0YXRlIHRoZSBpbmNvbWluZyBzdGF0ZSBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBzdGF0ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgIEluZm9ybXMgUmVhY3QgdG8gcmUtcmVuZGVyIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAqICAgICAvLyBzb21lIGxvZ2ljIGhlcmUsIGV2ZW50dWFsbHkgYHJldHVybmAgdHJ1ZSBvciBmYWxzZVxuICAgICAqICAgICAvLyBjdXJyZW50IHByb3BzICYgc3RhdGUgYXJlIGF2YWlsYWJsZSBmb3IgY29tcGFyaXNvbiBhdCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy51dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICAgICAqL1xuICAgIHV1aWQoKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW11bGF0ZXMgdGhlIChub3cgcmVtb3ZlZCkgUmVhY3QgaW50ZXJmYWNlIGBnZXRJbml0aWFsU3RhdGVgLiBJdCdzIGEgY29udmVuaWVuY2UsIGJ1dCBhbGxvd3NcbiAgICAgKiBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5IHRvIHdvcmsgd2l0aG91dCBoYXZpbmcgdG8gcHJvdmlkZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAbmFtZSBVSVZpZXcjaW5pdGlhbFN0YXRlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICAgICBpdGVtczogW11cbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKi9cbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuZ2xvYmFsLlVJS2l0LlVJVXRpbHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlBcnJvd0tleU5hdmlnYXRpb246IChnbG9iYWwuVUlLaXQuVUlBcnJvd0tleU5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJykuZGVmYXVsdCksXG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQYWdpbmF0ZWRWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJUGFnaW5hdGVkVmlldyA9IHJlcXVpcmUoJy4vVUlQYWdpbmF0ZWRWaWV3JykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUZXh0dWFsSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUZXh0dWFsSW5wdXQgPSByZXF1aXJlKCcuL1VJVGV4dHVhbElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlVdGlsczoge1xuICAgICAgICBub3RpZnk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5ub3RpZnkgPSByZXF1aXJlKCcuL1VJVXRpbHMvbm90aWZ5JykuZGVmYXVsdCksXG4gICAgICAgIHRyYW5zZm9ybVByb3BlcnR5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMudHJhbnNmb3JtUHJvcGVydHkgPSByZXF1aXJlKCcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknKS5kZWZhdWx0KSxcbiAgICB9LFxuICAgIFVJVmlldzogKGdsb2JhbC5VSUtpdC5VSVZpZXcgPSByZXF1aXJlKCcuL1VJVmlldycpLmRlZmF1bHQpLFxufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgJ1xcXFwkJicpO1xufTtcbiJdfQ==
