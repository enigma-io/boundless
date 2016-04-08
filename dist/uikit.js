(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

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

},{"26":26}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"22":22,"26":26,"28":28}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"22":22,"26":26,"28":28}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require(3);

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"22":22,"26":26,"28":28,"3":3}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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
                        return _this.props.onClose();
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
                _this.props.onClose();
            }

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                _this.props.onClose();
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

},{"22":22,"26":26,"28":28}],6:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

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

},{"26":26,"28":28}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"22":22,"26":26,"28":28}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

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

},{"26":26,"28":28,"5":5}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require(15);

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require(1);

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _item = require(10);

var _item2 = _interopRequireDefault(_item);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"1":1,"10":10,"15":15,"22":22,"26":26,"28":28}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

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

},{"26":26,"28":28}],11:[function(require,module,exports){
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _transformProperty = require(25);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _classnames = require(28);

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
            captureFocus: false,
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
    anchorXAlign: UIPopover.position.START,
    anchorYAlign: UIPopover.position.END,
    autoReposition: true,
    selfXAlign: UIPopover.position.START,
    selfYAlign: UIPopover.position.START
});
exports.default = UIPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"25":25,"26":26,"28":28,"5":5}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

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

},{"2":2,"26":26,"28":28}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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
            _react2.default.createElement(
                'div',
                { ref: 'content',
                    className: 'ui-disclosure-content' },
                this.props.children
            )
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

},{"22":22,"26":26,"28":28}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"22":22,"26":26,"28":28}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"2":2,"22":22,"26":26,"28":28}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

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
            getRow: this.props.getRow,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _table2.default(this.getTableViewConfiguration());
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate() {
        this.table.regenerate(this.getTableViewConfiguration());
    };

    UITable.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: 'ui-table-wrapper ' + this.props.className,
                'data-set-identifier': this.props.identifier,
                tabIndex: '0' }),
            _react2.default.createElement(
                'div',
                { ref: 'table', className: 'ui-table' },
                _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
                _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' })
            ),
            _react2.default.createElement(
                'div',
                { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
            ),
            _react2.default.createElement(
                'div',
                { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
            ),
            _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' })
        );
    };

    return UITable;
}(_UIView3.default);

UITable.propTypes = {
    columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        mapping: _react2.default.PropTypes.string,
        resizable: _react2.default.PropTypes.bool,
        title: _react2.default.PropTypes.string,
        width: _react2.default.PropTypes.number
    })),
    getRow: _react2.default.PropTypes.func,
    identifier: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onCellInteract: _react2.default.PropTypes.func,
    onRowInteract: _react2.default.PropTypes.func,
    throttleInterval: _react2.default.PropTypes.number,
    totalRows: _react2.default.PropTypes.number
};
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen'
};
exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"17":17,"26":26}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transformProperty = require(25);

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _findWhere = require(21);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require(22);

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

var createDOMCell = function createDOMCell(content, mapping, width) {
    var cell = document.createElement('div');
    cell.className = 'ui-table-cell';
    cell.setAttribute('title', content);
    cell.setAttribute('data-column', mapping);
    cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

var createDOMHeaderCell = function createDOMHeaderCell(column, width) {
    var cell = createDOMCell(column.title, column.mapping, width);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

var createHeaderCell = function createHeaderCell(metadata, width) {
    var node = createDOMHeaderCell(metadata, metadata.width || width);

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
        '_width': metadata.width || width,
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

var createCell = function createCell(content, mapping, width) {
    var node = createDOMCell(content, mapping, width);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;

                this.node.setAttribute('title', this._content);
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
        cells.push(createCell('', column.mapping, column.width));
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

                if (this._data instanceof Promise || this._data === null) {
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
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
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

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
};

var TableView = function () {
    TableView.prototype.validateColumnShape = function validateColumnShape(column) {
        return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (typeof column.width === 'number' || typeof column.width === 'undefined');
    };

    TableView.prototype.validateConfiguration = function validateConfiguration(config) {
        if (!(config.wrapper instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `wrapper` element.');
        }

        if (!(config.header instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `header` element.');
        }

        if (!(config.body instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `body` element.');
        }

        if (!(config['x-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-track` element.');
        }

        if (!(config['y-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-track` element.');
        }

        if (!(config['x-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-handle` element.');
        }

        if (!(config['y-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-handle` element.');
        }

        if (!(config.aria instanceof HTMLElement)) {
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

        if (typeof config.rowClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `rowClickFunc`; it should be a function.');
        }

        if (typeof config.cellClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `cellClickFunc`; it should be a function.');
        }
    };

    TableView.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.rowClickFunc = this.c.rowClickFunc || _noop2.default;
        this.c.cellClickFunc = this.c.cellClickFunc || _noop2.default;
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

                if (map.cell) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                _this.c.rowClickFunc(event, row.setIndex);
            }
        };

        this.processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;
        this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
        this.y_scroll_handle_style = this.c['y-scroll-handle'].style;

        this.regenerate();

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

    TableView.prototype.destroy = function destroy() {
        var _this2 = this;

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

        this.emptyHeader();
        this.emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach(function (key) {
            if (_this2.c[key] instanceof HTMLElement) {
                _this2.c[key] = null;
            }
        });
    };

    TableView.prototype.resetInternals = function resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;
        this.distance_from_left = this.last_pageX = this.c['x-scroll-track'].getBoundingClientRect().left + window.pageXOffset;
        this.distance_from_top = this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset;
        this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

        this.active_row = -1;
        this.next_active_row = null;

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

        this.c.columns.forEach(function (column) {
            return _this3.columns.push(createHeaderCell(column));
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
            data: this.c.getRow(0),
            setIndex: 0,
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
                data: this.c.getRow(this.i),
                setIndex: this.i,
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

        this.resetInternals();
        this.calculateContainerDimensions();

        this.buildColumns();
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

        this.row_start_index = 0;
        this.row_end_index = this.n_rows_rendered - 1;

        this.injectHeaderCells();
        this.injectRestOfRows();

        this.calculateXBound();
        this.calculateYBound();

        this.initializeScrollBars();
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
        if (x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    TableView.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (y !== this.last_y_scroll_handle_y) {
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
        this.columns[index].width = width;
        this.rows.forEach(function (row) {
            row.cells[index].width = width;
        });

        this.calculateXBound();
        this.initializeScrollBars();
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
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0) {
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
        } else if (delta === -1 && this.active_row > 0 || delta === 1 && this.active_row < this.c.totalRows) {
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

    return TableView;
}();

exports.default = TableView;

},{"21":21,"22":22,"25":25}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require(20);

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

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

},{"20":20,"22":22,"26":26,"28":28}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

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

},{"26":26,"28":28}],20:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require(29);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
            userInput: _this.props.defaultValue
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
        return this.refs.input;
    };

    UITypeaheadInput.prototype.select = function select() {
        this.refs.input.selectionStart = 0;
        this.refs.input.selectionEnd = this.refs.input.value.length;
    };

    UITypeaheadInput.prototype.focus = function focus() {
        this.getInputNode().focus();
    };

    UITypeaheadInput.prototype.focusInput = function focusInput() {
        if (!this.warned_focusInput) {
            this.warned_focusInput = true;
            console.warn('UITypeaheadInput: `focusInput()` is deprecated and will be removed in a future release. Please use UITypeaheadInput.focus() instead.');
        }

        this.focus();
    };

    UITypeaheadInput.prototype.value = function value(newValue) {
        this.getInputNode().value = newValue;

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    };

    UITypeaheadInput.prototype.setValue = function setValue(newValue) {
        if (!this.warned_setValue) {
            this.warned_setValue = true;
            console.warn('UITypeaheadInput: `setValue(text)` is deprecated and will be removed in a future release. Please use UITypeaheadInput.value(text) instead.');
        }

        this.value(newValue);
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
            { ref: 'aria',
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

            return _react2.default.createElement('input', _extends({}, this.props.hintProps, {
                ref: 'hint',
                type: this.props.type || this.props.inputProps.type || 'text',
                className: (0, _classnames2.default)((_cx = {
                    'ui-typeahead-hint': true
                }, _cx[this.props.hintProps.className] = !!this.props.hintProps.className, _cx)),
                value: processed,
                disabled: true,
                tabIndex: '-1' }));
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

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                type: null,
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                className: (0, _classnames2.default)((_cx5 = {
                    'ui-typeahead': true
                }, _cx5[this.props.inputProps.className] = !!this.props.inputProps.className, _cx5)),
                defaultValue: this.props.defaultValue || this.props.inputProps.defaultValue,
                name: this.props.name || this.props.inputProps.name,
                type: this.props.type || this.props.inputProps.type || 'text',
                'aria-controls': this.state.id,
                onInput: this.handleInput })),
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
    algorithm: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react2.default.PropTypes.shape({
        markFunc: _react2.default.PropTypes.func,
        matchFunc: _react2.default.PropTypes.func
    })]),
    clearPartialInputOnSelection: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.string,
    entities: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        text: _react2.default.PropTypes.string
    })),
    hint: _react2.default.PropTypes.bool,
    hintProps: _react2.default.PropTypes.object,
    inputProps: _react2.default.PropTypes.object,
    matchWrapperProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onComplete: _react2.default.PropTypes.func,
    onInput: _react2.default.PropTypes.func,
    onEntityHighlighted: _react2.default.PropTypes.func,
    onEntitySelected: _react2.default.PropTypes.func,
    type: _react2.default.PropTypes.string
};
UITypeaheadInput.defaultProps = {
    algorithm: UITypeaheadInput.mode.STARTS_WITH,
    clearPartialInputOnSelection: false,
    defaultValue: '',
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

},{"22":22,"26":26,"28":28,"29":29}],21:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

    // used in JSDOM
    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
}();

},{}],26:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _shallowEqual = require(24);

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

},{"24":24}],27:[function(require,module,exports){
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
    UITokenizedInput: global.UIKit.UITokenizedInput = require(18).default,
    UITooltip: global.UIKit.UITooltip = require(19).default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require(20).default,
    UIUtils: {
        notify: global.UIKit.UIUtils.notify = require(23).default,
        transformProperty: global.UIKit.UIUtils.transformProperty = require(25).default
    },
    UIView: global.UIKit.UIView = require(26).default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"18":18,"19":19,"2":2,"20":20,"23":23,"25":25,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
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

},{}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIlVJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiVUlCdXR0b24vaW5kZXguanMiLCJVSUNoZWNrYm94L2luZGV4LmpzIiwiVUlDaGVja2JveEdyb3VwL2luZGV4LmpzIiwiVUlEaWFsb2cvaW5kZXguanMiLCJVSUZpdHRlZFRleHQvaW5kZXguanMiLCJVSUltYWdlL2luZGV4LmpzIiwiVUlNb2RhbC9pbmRleC5qcyIsIlVJUGFnaW5hdGVkVmlldy9pbmRleC5qcyIsIlVJUGFnaW5hdGVkVmlldy9pdGVtLmpzIiwiVUlQb3BvdmVyL2luZGV4LmpzIiwiVUlQcm9ncmVzcy9pbmRleC5qcyIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiVUlSYWRpby9pbmRleC5qcyIsIlVJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIlVJVGFibGUvaW5kZXguanMiLCJVSVRhYmxlL3RhYmxlL2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiVUlWaWV3L2luZGV4LmpzIiwiZXhwb3J0cy5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7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QVAsQ0FBYSxnQkFBYixHQUFnQyxRQUFRLG9CQUFSLEVBQThCLE9BQTlCO0FBQ25ELGFBQVM7QUFDTCxnQkFBUyxPQUFPLEtBQVAsQ0FBYSxPQUFiLENBQXFCLE1BQXJCLEdBQThCLFFBQVEsa0JBQVIsRUFBNEIsT0FBNUI7QUFDdkMsMkJBQW9CLE9BQU8sS0FBUCxDQUFhLE9BQWIsQ0FBcUIsaUJBQXJCLEdBQXlDLFFBQVEsNkJBQVIsRUFBdUMsT0FBdkM7S0FGakU7QUFJQSxZQUFTLE9BQU8sS0FBUCxDQUFhLE1BQWIsR0FBc0IsUUFBUSxVQUFSLEVBQW9CLE9BQXBCO0NBdkJuQzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25QcmVzc2VkOiBub29wLFxuICAgICAgICBvblVucHJlc3NlZDogbm9vcCxcbiAgICB9O1xuXG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIENvbnN0YW50cyA9IHtcbiAgICAgICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLm5hbWUgfHwgJ2NiX3NlbGVjdF9hbGwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5kaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIHJlc2NhbGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgICAgIGlmICggICBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCdcbiAgICAgICAgICAgIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgICAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgICAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgICAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKHRoaXMucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWcgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgYWx0PXtudWxsfVxuICAgICAgICAgICAgICAgICBzcmM9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkaWFsb2dTcGVjaWZpY1Byb3BzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXNrJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZyB7Li4uZGlhbG9nU3BlY2lmaWNQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvVUlEaWFsb2c+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0ZWRWaWV3XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGVkVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGNvbnRyb2xWYWx1ZXMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBnZXRJdGVtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSB8fCBwcm9wcy5udW1JdGVtc1BlclBhZ2UgPiBwcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBwcm9wcy50b3RhbEl0ZW1zICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHBhZ2VyUG9zaXRpb246IGZ1bmN0aW9uIHZhbGlkYXRlUGFnZXJQb3NpdGlvbihwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLnBhZ2VyUG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbFRleHQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwYWdlclBvc2l0aW9uOiAxLFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLnBhZ2VyUG9zaXRpb24sXG4gICAgICAgIG51bWJlck9mUGFnZXM6IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzLFxuICAgICAgICB0b3RhbEl0ZW1zOiB0aGlzLnByb3BzLnRvdGFsSXRlbXMsXG4gICAgICAgIHNob3duSXRlbXM6IFt7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKDApfV0sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSkge1xuICAgICAgICBpZiAob2xkU3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pZGVudGlmaWVyICE9PSB0aGlzLnByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcygxLCBuZXh0UHJvcHMuZ2V0SXRlbSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoY3VycmVudFBhZ2UsIGdldEl0ZW0gPSB0aGlzLnByb3BzLmdldEl0ZW0pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5zdGF0ZS50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBwYWdlTnVtYmVyO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVM6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogcGFnZU51bWJlcixcbiAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyhwYWdlTnVtYmVyKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb24gey4uLnRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3duSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW0gcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyQ2FzZSA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnc2VnbWVudGVkQ29udHJvbCcgKyAocG9zaXRpb25Mb3dlckNhc2VbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXJDYXNlLnNsaWNlKDEpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgWyd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy0nICsgcG9zaXRpb25Mb3dlckNhc2VdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0ZWQtdmlldyc+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRlZFZpZXdJdGVtIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBldmVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIH1cblxuICAgIF9tb3VudGVkID0gZmFsc2VcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWV2ZW4nOiB0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICBjbG9uZVdpdGhDbGFzc2VzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PjwvZGl2Pik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZVdpdGhDbGFzc2VzKHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbi8qXG4gICAgQSBudWFuY2UgYWJvdXQgdGhpcyBjb21wb25lbnQ6IHNpbmNlIGl0IG9ubHkgcmVuZGVycyBhIHNpbXBsZSA8ZGl2PiwgdGhlIG1haW4gcmVuZGVyKCkgZnVuY3Rpb25cbiAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICBhIGZ1bGwgcmUtcmVuZGVyIG9mIHRoZSBjaGlsZCBkaWFsb2cuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBzZWxmWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhbmNob3JYQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWEFsaWduLFxuICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgIHNlbGZZQWxpZ246IHRoaXMucHJvcHMuc2VsZllBbGlnbixcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoKHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpKTtcblxuICAgICAgICAvLyB0aGlzIGlzIGJhZCwgZG9uJ3QgZG8gdGhpcyBhbnl3aGVyZSBlbHNlIDoteC5cbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMucmVmcy5kaWFsb2cgPSB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLm5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZGlhbG9nKTtcblxuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGdldE5leHRYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IGFuY2hvci5vZmZzZXRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYICs9IGFuY2hvci5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBhbmNob3JIZWlnaHQgPSBhbmNob3Iub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7fTtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRTtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMuZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLmdldE5leHRZUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKHRoaXMubm9kZSwgeCwgeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgT2JqZWN0LmtleXMoYWxpZ25tZW50Q29ycmVjdGlvbikubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uLCAoKSA9PiB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLm5vZGUsIHgsIHkpO1xuICAgIH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEaWFsb2coKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgZ2V0RnJhZyA9IHRoaXMuZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDtcblxuICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmVGb2N1cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcG9wb3Zlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXktJHtnZXRGcmFnKHN0YXRlLmFuY2hvcllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgICAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgbGFiZWw9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGlkZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRlYXNlckV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi5kZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVPcHRpb25Gb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZVZpZXcuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVGFibGVWaWV3IGZyb20gJy4vdGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRhYmxlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFwcGluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgZ2V0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ2VsbEludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjbGFzc05hbWU6ICcnLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgfVxuXG4gICAgZ2V0VGFibGVWaWV3Q29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMucmVmcy53cmFwcGVyLFxuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLnJlZnMuaGVhZGVyLFxuICAgICAgICAgICAgYm9keTogdGhpcy5yZWZzLmJvZHksXG4gICAgICAgICAgICAneC1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneC1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgYXJpYTogdGhpcy5yZWZzLmFyaWEsXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZVZpZXcodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd0YWJsZScgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKiBAY2xhc3MgVGFibGVWaWV3XG4gKi9cblxuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgZmluZFdoZXJlIGZyb20gJy4uLy4uL1VJVXRpbHMvZmluZFdoZXJlJztcbmltcG9ydCBub29wIGZyb20gJy4uLy4uL1VJVXRpbHMvbm9vcCc7XG5cbi8qXG5cbkZPUiBGVVRVUkUgRVlFU1xuXG5TY3JvbGwgcGVyZm9ybWFuY2UgaXMgYSB0cmlja3kgYmVhc3QgLS0gbW9yZXNvIHdoZW4gdHJ5aW5nIHRvIG1haW50YWluIDUwKyBGUFMgYW5kIHB1bXBpbmcgYSBsb3Qgb2YgZGF0YSB0byB0aGUgRE9NLiBUaGVyZSBhcmUgYSBsb3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGNvbXBvbmVudCB0aGF0IG1heSBzZWVtIG9kZCBhdCBmaXJzdCBibHVzaCwgYnV0IGxldCBpdCBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG5cblRoZSBjb21iaW5hdGlvbiB0aGF0IHdhcyBzZXR0bGVkIHVwb24gaXMgYSBSZWFjdCBzaGVsbCB3aXRoIG5hdGl2ZSBET00gZ3V0cy4gVGhpcyBjb21iaW5hdGlvbiB5aWVsZHMgdGhlIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cblxuX19JbXBvcnRhbnQgTm90ZV9fXG5cbkFueSB0aW1lIHlvdSBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCwgbWFrZSBzdXJlIHlvdSByZWxlYXNlIGl0IGFmdGVyIGJ5IHNldHRpbmcgaXRzIHZhcmlhYmxlIHRvIGBudWxsYC4gSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG5cblxuT1JERVIgT0YgT1BFUkFUSU9OU1xuXG4xLiByZW5kZXIgb25lIHJvdyBvZiBjZWxsc1xuMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbjMuIHJlbmRlciBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuXG5JZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW4gdHJ5aW5nIHRvIGRpZmYuXG5cbiovXG5cbmNvbnN0IGNlbGxDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1jZWxsXFxiL2c7XG5jb25zdCByb3dDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3dcXGIvZztcblxuY29uc3QgdHJhbnNsYXRlM2QgPSBmdW5jdGlvbiB0cmFuc2xhdGUzRCh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMHB4KSc7XG59OyAvLyB6IGlzIG5ldmVyIHVzZWRcblxuY29uc3QgcmVwYXJlbnRDZWxsVGV4dCA9IGZ1bmN0aW9uIHJlcGFyZW50Q2VsbFRleHQobm9kZSwgY29udGVudCkge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwtaW5uZXInO1xuXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gdGV4dE5vZGU7XG59O1xuXG5jb25zdCBjcmVhdGVET01DZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsJztcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBjb250ZW50KTtcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlRE9NSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUhlYWRlckNlbGwoY29sdW1uLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVIZWFkZXJDZWxsKG1ldGFkYXRhLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01IZWFkZXJDZWxsKG1ldGFkYXRhLCBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX2NvbnRlbnQnOiBjb250ZW50LFxuICAgICAgICBnZXQgY29udGVudCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7IH0sXG4gICAgICAgIHNldCBjb250ZW50KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnMgYW4gaW50ZWdlciB2YWx1ZSwgcmF0aGVyIHRoYW4gdGhlIF9hY3R1YWxfIHdpZHRoLiBTTUguICovXG4gICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgLy8gUHV0IGV2ZXJ5dGhpbmcgYmFja1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gY2hpbGRDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3V2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWFjdGl2ZScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWFjdGl2ZScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctYWN0aXZlJywgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gICB0aGlzLl9zZXRJbmRleCA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndWktdGFibGUtcm93IHVpLXRhYmxlLXJvdy1ldmVuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1vZGQnLCAndWktdGFibGUtcm93LWV2ZW4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gICB0aGlzLl9zZXRJbmRleCA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndWktdGFibGUtcm93IHVpLXRhYmxlLXJvdy1vZGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWV2ZW4nLCAndWktdGFibGUtcm93LW9kZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEluZGV4ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIGdldCB3YWl0aW5nRm9yUmVzb2x1dGlvbigpIHsgcmV0dXJuIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uOyB9LFxuICAgICAgICBzZXQgd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LWxvYWRpbmcnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHRoaXMuX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHRvIGhhdmUgdGhlIGNsYXNzZXMgYWRkZWQgYXV0b21hdGljYWxseVxuICAgIHJvd09iai5zZXRJbmRleCA9IG1ldGFkYXRhLnNldEluZGV4O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5jbGFzcyBUYWJsZVZpZXcge1xuICAgIHZhbGlkYXRlQ29sdW1uU2hhcGUoY29sdW1uKSB7XG4gICAgICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnRpdGxlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgJiYgKHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInIHx8IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICd1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIGlmICghKGNvbmZpZy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHdyYXBwZXJgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGhlYWRlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5ib2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGJvZHlgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3gtc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3gtc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneS1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYXJpYWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICAhQXJyYXkuaXNBcnJheShjb25maWcuY29sdW1ucylcbiAgICAgICAgICAgIHx8IGNvbmZpZy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgfHwgIWNvbmZpZy5jb2x1bW5zLmV2ZXJ5KHRoaXMudmFsaWRhdGVDb2x1bW5TaGFwZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgdmFsaWQgXFxgY29sdW1uc1xcYC4gSXQgc2hvdWxkIGJlIGFuIGFycmF5IHdpdGggYXQgbGVhc3Qgb25lIG9iamVjdCBjb25mb3JtaW5nIHRvOiB7XG4gICAgICAgICAgICAgICAgbWFwcGluZzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIgKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRocm90dGxlSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50b3RhbFJvd3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmdldFJvdyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJvd0NsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGByb3dDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY2VsbENsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICAgIHRoaXMuYyA9IHsuLi5jb25maWd9O1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jID0gdGhpcy5jLnJvd0NsaWNrRnVuYyB8fCBub29wO1xuICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyA9IHRoaXMuYy5jZWxsQ2xpY2tGdW5jIHx8IG5vb3A7XG4gICAgICAgIHRoaXMuYy50aHJvdHRsZUludGVydmFsID0gdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgfHwgMzAwO1xuICAgICAgICB0aGlzLmMudG90YWxSb3dzID0gdGhpcy5jLnRvdGFsUm93cyB8fCAwO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb25maWd1cmF0aW9uKHRoaXMuYyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb24oY29uZmlnKTtcblxuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmMuYm9keTtcbiAgICAgICAgdGhpcy5ib2R5X3N0eWxlID0gdGhpcy5ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuYy5oZWFkZXI7XG4gICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlID0gdGhpcy5oZWFkZXIuc3R5bGU7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUgPSB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuXG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICAvLyByZWxlYXNlIGNhY2hlZCBET00gbm9kZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jW2tleV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeSA9IFtdO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubl9wYWRkaW5nX3Jvd3MgPSAzO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy5uZXh0X3kgPSAwO1xuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fbGVmdCA9IHRoaXMubGFzdF9wYWdlWCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVfcm93ID0gLTE7XG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IDA7XG5cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHZhcmlhYmxlcyBpbiB2YXJpb3VzIGNhbGN1bGF0aW9uc1xuICAgICAgICB0aGlzLmkgPSBudWxsO1xuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSBudWxsO1xuXG4gICAgICAgIC8vIHRyYW5zbGF0aW9uIGNhY2hlc1xuICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmV2dCA9IHtwcmV2ZW50RGVmYXVsdDogbm9vcH07XG5cbiAgICAgICAgdGhpcy50b3VjaCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IDA7XG5cbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy55X3Njcm9sbF90cmFja19oID0gbnVsbDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IVxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBlbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuaGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG5cbiAgICAgICAgdGhpcy5jLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4pKSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29sdW1uLm5vZGUpO1xuXG4gICAgICAgICAgICBjb2x1bW4ubWluV2lkdGggPSBwYXJzZUludChjc1snbWluLXdpZHRoJ10sIDEwKTtcbiAgICAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHBhcnNlSW50KGNzWydtYXgtd2lkdGgnXSwgMTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbmplY3RIZWFkZXJDZWxscygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uLm5vZGUpKTtcblxuICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGVtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluamVjdEZpcnN0Um93KCkge1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIHRoaXMucm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KDApLFxuICAgICAgICAgICAgc2V0SW5kZXg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLmNvbHVtbnMpKTtcblxuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2goMCk7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm93c1swXS5ub2RlKTtcbiAgICB9XG5cbiAgICBpbmplY3RSZXN0T2ZSb3dzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAodGhpcy5pID0gMTsgdGhpcy5pIDwgdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7IHRoaXMuaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5pKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5pLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbF9oICogdGhpcy5pLFxuICAgICAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLmkpO1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbdGhpcy5pXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuY2VsbF9oID0gdGhpcy5yb3dzWzBdLmNlbGxzWzBdLm5vZGUuY2xpZW50SGVpZ2h0IHx8IDQwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxXaWR0aHMoKSB7XG4gICAgICAgIHRoaXMucm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggfHwgY2VsbC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5yb3dfdyA9IHRoaXMucm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy54X21heCA9IHRoaXMuY29udGFpbmVyX3cgPD0gdGhpcy5yb3dfdyA/IHRoaXMuY29udGFpbmVyX3cgLSB0aGlzLnJvd193IDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMueV9taW4gPSAwO1xuICAgICAgICB0aGlzLnlfbWF4ID0gdGhpcy5ib2R5X2ggLSB0aGlzLm5fcm93c19yZW5kZXJlZCAqIHRoaXMuY2VsbF9oO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy5jb250YWluZXJfdyAtIE1hdGguYWJzKHRoaXMueF9tYXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gICB0aGlzLm5fcm93c192aXNpYmxlID09PSB0aGlzLm5fcm93c19yZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNvbnRhaW5lcl9oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY29udGFpbmVyX2ggKiAodGhpcy5uX3Jvd3NfdmlzaWJsZSAvIHRoaXMuYy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgdGhpcy5jb250YWluZXJfdztcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCA4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IHRoaXMuY29udGFpbmVyX2g7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlLndpZHRoID0gdGhpcy5jYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcblxuICAgICAgICAvKiB0b3RhbCB0cmFuc2xhdGFibGUgc3BhY2UgLyBzY3JvbGxiYXIgdHJhY2sgc2l6ZSA9IHJlbGF0aXZlIHZhbHVlIG9mIGEgc2Nyb2xsYmFyIHBpeGVsICovXG4gICAgICAgIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyA9IE1hdGguYWJzKHRoaXMueF9tYXgpIC8gKHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUpO1xuXG4gICAgICAgIC8qIGhvdyBtYW55IHNjcm9sbGJhciBwaXhlbHMgPT09IG9uZSByb3c/ICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8gPSAodGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSkgLyAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMubl9yb3dzX3Zpc2libGUpO1xuXG4gICAgICAgIC8qIGhpZGUgdGhlIHNjcm9sbGJhcnMgaWYgdGhleSBhcmUgbm90IG5lZWRlZCAqL1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9oID0gdGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5jb250YWluZXJfdyA9IHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5ib2R5X2ggPSB0aGlzLmMuYm9keS5jbGllbnRIZWlnaHQgfHwgMTEwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoY29uZmlnID0gdGhpcy5jKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IHRoaXMuYykgeyB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7IH1cblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gTWF0aC5jZWlsKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpICsgdGhpcy5uX3BhZGRpbmdfcm93cztcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfcmVuZGVyZWQgPiB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IHRoaXMuYy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gTWF0aC5mbG9vcih0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5fcm93c192aXNpYmxlID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCA9IDA7XG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkIC0gMTtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWUJvdW5kKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZUhlYWRlcih4KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfaGVhZGVyX3gpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoeCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfaGVhZGVyX3ggPSB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlQm9keSh4LCB5KSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLmxhc3RfYm9keV94IHx8IHkgIT09IHRoaXMubGFzdF9ib2R5X3kpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IHg7XG4gICAgICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUoeSkge1xuICAgICAgICBpZiAoeSAhPT0gdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95KSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBlcmZvcm1UcmFuc2xhdGlvbnMobmV4dFgsIG5leHRZKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlSGVhZGVyKG5leHRYKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVCb2R5KG5leHRYLCBuZXh0WSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWFNjcm9sbEhhbmRsZSh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlWVNjcm9sbEhhbmRsZSh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgc2Nyb2xsVXAoKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIHN0YXJ0IG9mIHRoZSB0YWJsZSAocm93IGluZGV4IDApIHdlIHRydW5jYXRlIHVwd2FyZCBzY3JvbGwgYXR0ZW1wdHNcbiAgICAgICAgICAgdG8gdGhlIHVwcGVyIHRyYW5zbGF0aW9uIGJvdW5kYXJ5IHRvIGtlZXAgZnJvbSBza2lwcGluZyBvZmYgaW50byBub3RoaW5nbmVzcyAqL1xuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCAmJiB0aGlzLm5leHRfeSA+IHRoaXMueV9taW4pIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21pbjtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwIHx8IHRoaXMubmV4dF95IDw9IHRoaXMueV9taW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIGJvdHRvbSBwb3NpdGlvbiB0byB0aGUgdG9wXG4gICAgICAgICAgIChhYm92ZSB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWluKSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogcHJldmVudCB1bmRlci1yb3RhdGluZyBiZWxvdyBpbmRleCB6ZXJvLCB0aGUgbG9naWNhbCBzdGFydCBvZiBhIGRhdGEgc2V0ICovXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gTWF0aC5hYnModGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCkgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgZGVjcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIGZvciAodGhpcy5pdGVyYXRvciA9IDE7IHRoaXMuaXRlcmF0b3IgPD0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7IHRoaXMuaXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gdGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSB0aGlzLnJvd3NbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXhdXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dLnkgLSB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5hY3RpdmUgPSB0aGlzLnRhcmdldF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS51bnNoaWZ0KHRoaXMucm93c19vcmRlcmVkX2J5X3kucG9wKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCArPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsRG93bigpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgZW5kIG9mIHRoZSB0YWJsZSAocm93IGluZGV4IG4pIHdlIHRydW5jYXRlIGFueSBzY3JvbGwgYXR0ZW1wdHMgICovXG4gICAgICAgIGlmICh0aGlzLnJvd19lbmRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cyAtIDEgJiYgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWF4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+PSB0aGlzLnlfbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIHJvdyBpbiB0aGUgdmlzdWFsIHRvcCBwb3NpdGlvbiB0byB0aGUgYm90dG9tXG4gICAgICAgICAgIChiZWxvdyB0aGUgbGlwIG9mIHRoZSB2aWV3KSAqL1xuXG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21heCkgLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ICsgdGhpcy5yb3dfZW5kX2luZGV4ICsgMSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IChcbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCAtICh0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gKHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID09PSAwID8gMCA6IDEpKVxuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMuYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEodGhpcy55X21heCwgdGhpcy55KSAlIHRoaXMuY2VsbF9oLCB0aGlzLm5leHRfeVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMueF9zY3JvbGxfdHJhY2tfaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLmMudG90YWxSb3dzIC0gdGhpcy5yb3dfZW5kX2luZGV4IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBpbmNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLnNoaWZ0X2RlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLnNoaWZ0X2RlbHRhO1xuXG4gICAgICAgICAgICAgICAgLyogYWNjb21vZGF0ZSBmb3IgdGhlIG51bWJlciBvZiBwaXhlbHMgdGhhdCB3aWxsIG5vdCBiZSByZW5kZXJlZCAqL1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95ICs9IHRoaXMuc2hpZnRfZGVsdGEgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodGhpcy5pdGVyYXRvciA9IDE7IHRoaXMuaXRlcmF0b3IgPD0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7IHRoaXMuaXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gdGhpcy5yb3dfZW5kX2luZGV4ICsgdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIC8qIHRoZSBwYWRkaW5nIHJvd3Mgd2lsbCBleGNlZWQgdGhlIG1heGltdW0gaW5kZXggZm9yIGEgZGF0YSBzZXQgb25jZSB0aGUgdXNlciBoYXMgZnVsbHkgdHJhbnNsYXRlZCB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXRfaW5kZXggPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVswXV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoIC0gMV1dLnkgKyB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5hY3RpdmUgPSB0aGlzLnRhcmdldF9pbmRleCA9PT0gdGhpcy5hY3RpdmVfcm93O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuXG4gICAgICAgICAgICB0aGlzLnlfbWluIC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLnlfbWF4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseURlbHRhKGRlbHRhLCBudW0pIHtcbiAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSA8IDAgPyBudW0gLSBkZWx0YSA6IG51bSArIGRlbHRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bSAtIGRlbHRhO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCh0YXJnZXRZID0gdGhpcy5uZXh0X3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1tcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lbXG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEodGhpcy55X21pbiwgdGFyZ2V0WSkgLyB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICBdXG4gICAgICAgIF0uc2V0SW5kZXg7XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVggPT09IDAgICAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCAmJiBldmVudC5kZWx0YVggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kZWx0YV94ID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuZGVsdGFfeSA9ICAgZXZlbnQuZGVsdGFNb2RlID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLmNlbGxfaFxuICAgICAgICAgICAgICAgICAgICAgICA6IGV2ZW50LmRlbHRhWTtcblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueCA6IHRoaXMueCAtIHRoaXMuZGVsdGFfeDtcbiAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA/IHRoaXMueSA6IHRoaXMueSAtIHRoaXMuZGVsdGFfeTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X3ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3ggPCB0aGlzLnhfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueF9tYXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdmlzaWJsZSA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBuZWdhdGUgdGhlIHZlcnRpY2FsIG1vdmVtZW50LCBub3QgZW5vdWdoIHJvd3MgdG8gZmlsbCB0aGUgYm9keSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPCB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID4gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNldF90aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRfdGltZXIpOyB9XG5cbiAgICAgICAgLyogcmVzZXQgcm93ICYgd3JhcHBlciBZIHZhbHVlcyB0b3dhcmQgMCB0byBwcmV2ZW50IG92ZXJmbG93aW5nICovXG4gICAgICAgIHRoaXMucmVzZXRfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiByZXNldFlBeGlzKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF90aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X2RlbHRhID0gaW5zdGFuY2UueV9taW47XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcG9zaXRpb25pbmcgdmFyaWFibGVzICovXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gaW5zdGFuY2UuYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueSk7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21pbiA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWluKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWF4ID0gaW5zdGFuY2UuYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9tYXgpO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHJvd3MgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnJvd3Nfb3JkZXJlZF9ieV95LmZvckVhY2goKHBvc2l0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnJvd3NbcG9zaXRpb25dLnkgPSBpbmRleCAqIGluc3RhbmNlLmNlbGxfaDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCB0aGUgd3JhcHBlciAqL1xuICAgICAgICAgICAgaW5zdGFuY2UudHJhbnNsYXRlQm9keShpbnN0YW5jZS54LCBpbnN0YW5jZS55KTtcblxuICAgICAgICB9LCAxMDAsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gdGhpcy5jYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgoKTtcblxuICAgICAgICAvKiBxdWV1ZSB1cCB0cmFuc2xhdGlvbnMgYW5kIHRoZSBicm93c2VyIHdpbGwgZXhlY3V0ZSB0aGVtIGFzIGFibGUsIG5lZWQgdG8gcGFzcyBpbiB0aGUgdmFsdWVzIHRoYXQgd2lsbCBjaGFuZ2UgZHVlIHRvIG1vcmUgaGFuZGxlTW92ZUludGVudCBpbnZvY2F0aW9ucyBiZWZvcmUgdGhpcyByQUYgZXZlbnR1YWxseSBleGVjdXRlcy4gKi9cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiByQUYobmV4dFgsIGN1cnJYLCBuZXh0WSwgdmlzaWJsZVRvcFJvd0luZGV4KSB7XG4gICAgICAgICAgICBpZiAobmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICs9ICgobmV4dFggLSBjdXJyWCkgLyB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8pICogLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy54X3Njcm9sbF90cmFja193KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy54X3Njcm9sbF90cmFja193IC0gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdmlzaWJsZVRvcFJvd0luZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueV9zY3JvbGxfdHJhY2tfaCkge1xuICAgICAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMubmV4dF94LCB0aGlzLngsIHRoaXMubmV4dF95LCB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCkpO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMubmV4dF94O1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm5leHRfeTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBoYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IHRoaXMubGFzdF90b3VjaF9wYWdlWCAtIHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMubGFzdF90b3VjaF9wYWdlWSAtIHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gdGhpcy50b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteC1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lICE9PSAndWktdGFibGUteS1zY3JvbGwtdHJhY2snKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LCBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3BcbiAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiBhZGp1c3RzIGZvciB0aGUgcGl4ZWwgZGlzdGFuY2UgYmV0d2VlbiB3aGVyZSB0aGUgaGFuZGxlIGlzIGNsaWNrZWQgYW5kIHRoZSB0b3AgZWRnZSBvZiBpdDsgdGhlIGhhbmRsZSBpcyBwb3NpdGlvbmVkIGFjY29yZGluZyB0byBpdHMgdG9wIGVkZ2UgKi9cbiAgICAgICAgdGhpcy55X3Njcm9sbF9vZmZzZXQgPSBldmVudC5vZmZzZXRZO1xuXG4gICAgICAgIHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ190aW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuZHJhZ190aW1lcik7IH1cblxuICAgICAgICAgICAgLyogeC1heGlzIGRvZXNuJ3QgbmVlZCB0aHJvdHRsZSBwcm90ZWN0aW9uIHNpbmNlIGl0IGRvZXNuJ3QgY2F1c2UgYSByb3cgZmV0Y2ggKi9cbiAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLyogTm93IGZldGNoLCBvbmNlIGRyYWcgaGFzIGNlYXNlZCBmb3IgbG9uZyBlbm91Z2guICovXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0YSA9IHRoaXMuYy5nZXRSb3cocm93LnNldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wIC0gdGhpcy55X3Njcm9sbF9vZmZzZXRcbiAgICAgICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IChldmVudC5wYWdlWCAtIHRoaXMubGFzdF9wYWdlWCkgKiB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW87XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5wYWdlWCAtIHRoaXMubGFzdF9jb2x1bW5feCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2NrRHJhZ1RvU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2xvY2tlZCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyogdGhlIGJyb3dzZXIgZmlyZXMgdGhlIG1vdXNldXAgYW5kIGNsaWNrIGV2ZW50cyBzaW11bHRhbmVvdXNseSwgYW5kIHdlIGRvbid0IHdhbnQgb3VyIGNsaWNrIGhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQsIHNvIGEgemVyby1kZWxheSBzZXRUaW1lb3V0IHdvcmtzIGhlcmUgdG8gbGV0IHRoZSBzdGFjayBjbGVhciBiZWZvcmUgYWxsb3dpbmcgY2xpY2sgZXZlbnRzIGFnYWluLiAqL1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVubG9ja0RyYWdUb1Njcm9sbCgpLCAwKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9jb2x1bW5feCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgICAgICB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZpbmRXaGVyZSh0aGlzLmNvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB3aWR0aCkge1xuICAgICAgICB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuY2VsbHNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpO1xuICAgICAgICBsZXQgYWRqdXN0ZWRfZGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWRfZGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhIDwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhKTtcblxuICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgIHdlJ2xsIHNlZSB1bndhbnRlZCB3aGl0ZXNwYWNlIG9uIHRoZSByaWdodCBzaWRlLiBJZiB0aGUgdGFibGUgd2lkdGggYmVjb21lcyBzbWFsbGVyIHRoYW4gdGhlIG92ZXJhbGwgY29udGFpbmVyLCB3aGl0ZXNwYWNlIHdpbGwgYXBwZWFyIHJlZ2FyZGxlc3MuICovXG4gICAgICAgIGlmIChhZGp1c3RlZF9kZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IGFkanVzdGVkX2RlbHRhO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJyk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBmaW5kV2hlcmUodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIG1hcHBpbmcpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2x1bW4pO1xuXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBjb2x1bW4ud2lkdGg7XG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHJvdy5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkgJiYgcm93LmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFdpZHRoID0gcm93LmNlbGxzW2NvbHVtbkluZGV4XS50cnVlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCA8IGNlbGxXaWR0aCA/IGNlbGxXaWR0aCA6IHdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvKiBmaW5kIHRoZSByZW5kZXJlZCByb3cgd2l0aCB0aGUgbG9uZ2VzdCBjb250ZW50IGVudHJ5ICovXG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlOZXdDb2x1bW5XaWR0aChjb2x1bW5JbmRleCwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRBcmlhVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMuYy5hcmlhLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICsgZGVsdGEgPj0gdGhpcy5jLnRvdGFsUm93cykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5uZXh0X2FjdGl2ZV9yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHRoaXMubmV4dF9hY3RpdmVfcm93LnNldEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5uZXh0X2FjdGl2ZV9yb3cuZGF0YVt0aGlzLmNvbHVtbnNbMF0ubWFwcGluZ10pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPiB0aGlzLnkpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMubmV4dF9hY3RpdmVfcm93LnkgKiAtMSA8IHRoaXMueSAtIHRoaXMuYm9keV9oICsgdGhpcy5jZWxsX2gpXG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5jZWxsX2ggKiBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLmFjdGl2ZV9yb3cgPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLmFjdGl2ZV9yb3cgPCB0aGlzLmMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLyogVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA+IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLnJvd19zdGFydF9pbmRleCA8IHRoaXMuYWN0aXZlX3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hY3RpdmVfcm93IC0gdGhpcy5yb3dfc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXkgfHwgdGhpcy5nZXRLZXlGcm9tS2V5Q29kZShldmVudC5rZXlDb2RlKTtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY292ZXJDZWxsQW5kUm93Tm9kZXModGFyZ2V0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0O1xuICAgICAgICBjb25zdCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgsIG1hcC5jZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYy5yb3dDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlVmlldztcbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC52YWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VG9rZW5DbG9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLmRlc2NlbmRhbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgICdTVEFSVFNfV0lUSCc6ICdTVEFSVFNfV0lUSCcsXG4gICAgICAgICdGVVpaWSc6ICdGVVpaWScsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWxnb3JpdGhtOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgbWF0Y2hGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgaGludDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBhbGdvcml0aG06IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgaGludFByb3BzOiB7fSxcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBub29wLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgaWQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB1c2VySW5wdXQ6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQoKSB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQ7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5yZWZzLmlucHV0LnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzSW5wdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfZm9jdXNJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfZm9jdXNJbnB1dCA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IGBmb2N1c0lucHV0KClgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLiBQbGVhc2UgdXNlIFVJVHlwZWFoZWFkSW5wdXQuZm9jdXMoKSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcklucHV0OiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX3NldFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogYHNldFZhbHVlKHRleHQpYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4gUGxlYXNlIHVzZSBVSVR5cGVhaGVhZElucHV0LnZhbHVlKHRleHQpIGluc3RlYWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hcmtGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXJrRnVuYyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya0Z1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWF0Y2hGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXRjaEZ1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuY2Agd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWF0Y2hlcyhlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS51c2VySW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJyAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi5lbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BtYXRjaF8kJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50aXR5LnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS51c2VySW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICB0eXBlPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dH0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuYm9keSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5oZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmljb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5vbkNsaWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcbmdsb2JhbC5VSUtpdC5VSVV0aWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJQXJyb3dLZXlOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9VSUFycm93S2V5TmF2aWdhdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUGFnaW5hdGVkVmlldzogKGdsb2JhbC5VSUtpdC5VSVBhZ2luYXRlZFZpZXcgPSByZXF1aXJlKCcuL1VJUGFnaW5hdGVkVmlldycpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVXRpbHM6IHtcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wZXJ0eTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnRyYW5zZm9ybVByb3BlcnR5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iXX0=
