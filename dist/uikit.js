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
        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args)));

        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        return _this;
    }

    UIArrowKeyNavigation.prototype.initialState = function initialState() {
        return {
            activeChildIndex: null
        };
    };

    UIArrowKeyNavigation.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== null) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            if (numChildren === 0) {
                this.setState(this.initialState()); // eslint-disable-line react/no-did-update-set-state
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

    UIArrowKeyNavigation.prototype.handleKeyDown = function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                event.preventDefault();
                this.moveFocus(-1);
                break;

            case 'ArrowDown':
            case 'ArrowRight':
                event.preventDefault();
                this.moveFocus(1);
                break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildBlur = function handleChildBlur(index, child, event) {
        if (this.state.activeChildIndex === index) {
            this.setState({ activeChildIndex: null });
        }

        if (typeof child !== 'string' && typeof child.props.onBlur === 'function') {
            event.persist();
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

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
        _classCallCheck(this, UIButton);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIButton.prototype.toggleState = function toggleState(event) {
        event.persist();
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    };

    UIButton.prototype.handleClick = function handleClick(event) {
        this.toggleState(event);

        if (typeof this.props.onClick === 'function') {
            event.persist();
            this.props.onClick(event);
        }
    };

    UIButton.prototype.handleKeyDown = function handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
            case 'Space':
                event.preventDefault();
                this.toggleState(event);
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
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
                onKeyDown: this.handleKeyDown.bind(this),
                onClick: this.handleClick.bind(this) }),
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
        _classCallCheck(this, UICheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args)));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    UICheckbox.prototype.initialState = function initialState() {
        return {
            id: this.props.inputProps.id || this.uuid()
        };
    };

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

    UICheckbox.prototype.handleChange = function handleChange(event) {
        // Send the opposite signal from what was passed to toggle the data
        this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);

        if (typeof this.props.inputProps.onChange === 'function') {
            event.persist();
            this.props.inputProps.onChange(event);
        }
    };

    UICheckbox.prototype.handleClick = function handleClick(event) {
        this.refs.input.focus();

        if (typeof this.props.inputProps.onClick === 'function') {
            event.persist();
            this.props.inputProps.onClick(event);
        }
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
        _classCallCheck(this, UIDialog);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIDialog.prototype.initialState = function initialState() {
        return {
            headerUUID: this.uuid(),
            bodyUUID: this.uuid()
        };
    };

    UIDialog.prototype.componentDidMount = function componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.refs.dialog.focus();
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('click', this.handleOutsideClick, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        return node && this.refs.dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.handleFocus = function handleFocus(nativeEvent) {
        if (!this.props.captureFocus) {
            if (this.props.closeOnOutsideFocus) {
                if (!this.isPartOfDialog(nativeEvent.target)) {
                    return this.props.onClose();
                }
            }

            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        var previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        if (this.isPartOfDialog(previous) && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    };

    UIDialog.prototype.handleKeyDown = function handleKeyDown(event) {
        if (this.props.closeOnEscKey && event.key === 'Escape') {
            this.props.onClose();
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    };

    UIDialog.prototype.handleOutsideClick = function handleOutsideClick(nativeEvent) {
        if (this.props.closeOnOutsideClick && !this.isPartOfDialog(nativeEvent.target)) {
            this.props.onClose();
        }
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
                onKeyDown: this.handleKeyDown.bind(this),
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

var _reactDom2 = _interopRequireDefault(_reactDom);

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
        _classCallCheck(this, UIFittedText);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIFittedText.prototype.componentDidMount = function componentDidMount() {
        this.rescale = this.rescale.bind(this);
        this.rescale();

        window.addEventListener('resize', this.rescale, true);
    };

    UIFittedText.prototype.componentDidUpdate = function componentDidUpdate() {
        this.rescale();
    };

    UIFittedText.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('resize', this.rescale, true);
    };

    UIFittedText.prototype.rescale = function rescale() {
        var node = _reactDom2.default.findDOMNode(this);
        var container = node.parentNode;
        var containerBox = window.getComputedStyle(container);
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
        node.style.fontSize = (Math.min(this.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
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
        _classCallCheck(this, UIImage);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIImage.prototype.initialState = function initialState() {
        return {
            status: UIImage.status.LOADING
        };
    };

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
        _classCallCheck(this, UIPaginatedView);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIPaginatedView.prototype.initialState = function initialState() {
        return {
            currentPage: this.props.pagerPosition,
            numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
            numItemsPerPage: this.props.numItemsPerPage,
            numPageToggles: this.props.numPageToggles,
            totalItems: this.props.totalItems,
            shownItems: [{ data: this.props.getItem(0) }]
        };
    };

    UIPaginatedView.prototype.componentDidUpdate = function componentDidUpdate(oldProps, oldState) {
        if (oldState.currentPage !== this.state.currentPage) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPaginatedView.prototype.componentDidMount = function componentDidMount() {
        this.setState({
            shownItems: this.generateItems(this.state.currentPage)
        });
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

    UIPaginatedView.prototype.handleClick = function handleClick(value) {
        var pageNumber = undefined;

        switch (value) {
            case UIPaginatedView.controlValues.FIRST:
                pageNumber = 1;
                break;
            case UIPaginatedView.controlValues.PREVIOUS:
                pageNumber = this.state.currentPage - 1;
                break;
            case UIPaginatedView.controlValues.NEXT:
                pageNumber = this.state.currentPage + 1;
                break;
            case UIPaginatedView.controlValues.LAST:
                pageNumber = this.state.numberOfPages;
                break;
            default:
                pageNumber = parseInt(value, 10);
        }

        this.setState({
            currentPage: pageNumber,
            shownItems: this.generateItems(pageNumber)
        });
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
            onOptionSelected: this.handleClick.bind(this) }));
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
        _classCallCheck(this, UIPaginatedViewItem);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIPaginatedViewItem.prototype.initialState = function initialState() {
        return {
            data: this.props.data
        };
    };

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

        return _react2.default.cloneElement(element, _extends({}, this.props, { className: this.getClasses(this.state.data.props.className) }));
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
        _classCallCheck(this, UIPopover);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIPopover.prototype.initialState = function initialState() {
        return {
            anchorXAlign: this.props.anchorXAlign,
            anchorYAlign: this.props.anchorYAlign,
            selfXAlign: this.props.selfXAlign,
            selfYAlign: this.props.selfYAlign
        };
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        document.body.appendChild(this.container = document.createElement('div'));

        // this is bad, don't do this anywhere else :-x.
        this.refs = {};
        this.refs.dialog = this.renderDialog();
        this.node = _reactDom2.default.findDOMNode(this.refs.dialog);

        this.align = this.align.bind(this);
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
            corrections.anchorXAlign = UIPopover.position.END;
            corrections.selfXAlign = UIPopover.position.END;
        } else if (x < 0) {
            // overflowing off to the left
            corrections.anchorXAlign = UIPopover.position.START;
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

    UIPopover.prototype.align = function align() {
        var _this2 = this;

        var anchor = this.props.anchor instanceof HTMLElement ? this.props.anchor : _reactDom2.default.findDOMNode(this.props.anchor);

        var x = this.getNextXPosition(anchor, this.node);
        var y = this.getNextYPosition(anchor, this.node);

        var alignmentCorrection = this.getAlignmentCorrectionIfOverflowing(this.node, x, y);

        if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
            return this.setState(alignmentCorrection, function () {
                return _this2.componentDidUpdate();
            });
        }

        this.applyTranslation(this.node, x, y);
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
        _classCallCheck(this, UIProgressiveDisclosure);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIProgressiveDisclosure.prototype.initialState = function initialState() {
        return {
            expanded: this.props.expanded
        };
    };

    UIProgressiveDisclosure.prototype.dispatchCallback = function dispatchCallback() {
        this.props[this.state.expanded ? 'onExpand' : 'onHide']();
    };

    UIProgressiveDisclosure.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        var _this2 = this;

        if (newProps.expanded !== this.props.expanded) {
            this.setState({ expanded: newProps.expanded }, function () {
                return _this2.dispatchCallback();
            });
        }
    };

    UIProgressiveDisclosure.prototype.handleClick = function handleClick(event) {
        var _this3 = this;

        this.setState({ expanded: !this.state.expanded }, function () {
            return _this3.dispatchCallback();
        });

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onClick === 'function') {
            event.persist();
            this.props.toggleProps.onClick(event);
        }
    };

    UIProgressiveDisclosure.prototype.handleKeyDown = function handleKeyDown(event) {
        var _this4 = this;

        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.setState({ expanded: !this.state.expanded }, function () {
                    return _this4.dispatchCallback();
                });
        }

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onKeyDown === 'function') {
            event.persist();
            this.props.toggleProps.onKeyDown(event);
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
                    onClick: this.handleClick.bind(this),
                    onKeyDown: this.handleKeyDown.bind(this),
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

exports.default = UIProgressiveDisclosure;


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
        _classCallCheck(this, UIRadio);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UIRadio.prototype.initialState = function initialState() {
        return {
            id: this.props.inputProps.id || this.uuid()
        };
    };

    UIRadio.prototype.handleChange = function handleChange(event) {
        if (event.target.checked) {
            this.props.onSelected(event.target.value);
        }

        /* istanbul ignore else */
        if (typeof this.props.inputProps.onChange === 'function') {
            event.persist();
            this.props.inputProps.onChange(event);
        }
    };

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
            onChange: this.handleChange.bind(this) }));
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

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

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
        _classCallCheck(this, UISegmentedControl);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UISegmentedControl.prototype.initialState = function initialState() {
        return {
            indexOfOptionInFocus: null
        };
    };

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

    UISegmentedControl.prototype.handleBlur = function handleBlur(option, event) {
        if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
            this.setState({ indexOfOptionInFocus: null });
        }

        if (typeof option.onBlur === 'function') {
            event.persist();
            option.onBlur(event);
        }
    };

    UISegmentedControl.prototype.handleClick = function handleClick(option, event) {
        this.props.onOptionSelected(option.value);

        if (typeof option.onClick === 'function') {
            event.persist();
            option.onClick(event);
        }
    };

    UISegmentedControl.prototype.handleFocus = function handleFocus(option, event) {
        this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

        if (typeof option.onFocus === 'function') {
            event.persist();
            option.onFocus(event);
        }
    };

    UISegmentedControl.prototype.handleKeyDown = function handleKeyDown(event) {
        var key = event.key;
        var activeItemIndex = this.state.indexOfOptionInFocus;

        if (key === 'ArrowLeft') {
            this.setFocus(this.getPreviousOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'ArrowRight') {
            this.setFocus(this.getNextOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'Enter') {
            this.handleClick(this.props.options[activeItemIndex]);
            event.preventDefault();
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
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
                    onBlur: _this2.handleBlur.bind(_this2, definition),
                    onPressed: _this2.handleClick.bind(_this2, definition),
                    onFocus: _this2.handleFocus.bind(_this2, definition) }),
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
                onKeyDown: this.handleKeyDown.bind(this) }),
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
        _classCallCheck(this, TableView);

        this.processConfiguration(config);

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleMoveIntent = this.handleMoveIntent.bind(this);

        this.handleXScrollHandleDragStart = this.handleXScrollHandleDragStart.bind(this);
        this.handleYScrollHandleDragStart = this.handleYScrollHandleDragStart.bind(this);
        this.handleAdvanceToXScrollTrackLocation = this.handleAdvanceToXScrollTrackLocation.bind(this);
        this.handleAdvanceToYScrollTrackLocation = this.handleAdvanceToYScrollTrackLocation.bind(this);

        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleColumnDragStart = this.handleColumnDragStart.bind(this);
        this.handleColumnAutoExpand = this.handleColumnAutoExpand.bind(this);

        this.handleWindowResize = this.handleWindowResize.bind(this);

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
        var _this = this;

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
            if (_this.c[key] instanceof HTMLElement) {
                _this.c[key] = null;
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
        var _this2 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column) {
            return _this2.columns.push(createHeaderCell(column));
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
        var _this3 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this3.fragment.appendChild(column.node);
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
        var _this4 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this4.columns[index].width = _this4.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this4.columns[index].width;
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

    TableView.prototype.handleWindowResize = function handleWindowResize() {
        if (this.c.wrapper.clientHeight !== this.container_h) {
            /* more rows may be needed to display the data, so we need to rebuild */
            return this.regenerate();
        }

        this.calculateContainerDimensions();
        this.calculateXBound();
        this.initializeScrollBars();
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

    TableView.prototype.handleMoveIntent = function handleMoveIntent(event) {
        event.preventDefault();

        if (event.deltaX === 0 && event.deltaY === 0) {
            return;
        }
        if (this.y_scroll_locked && event.deltaY === 0) {
            return;
        }
        if (this.x_scroll_locked && event.deltaX === 0) {
            return;
        }

        this.delta_x = event.deltaX;

        // deltaMode 0 === pixels, 1 === lines
        this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * this.cell_h : event.deltaY;

        /* lock the translation axis if the user is manipulating the synthetic scrollbars */
        this.next_x = this.y_scroll_locked ? this.x : this.x - this.delta_x;
        this.next_y = this.x_scroll_locked ? this.y : this.y - this.delta_y;

        if (this.next_x > 0) {
            this.next_x = 0;
        } else if (this.next_x < this.x_max) {
            this.next_x = this.x_max;
        }

        if (this.n_rows_visible >= this.c.totalRows) {
            /* negate the vertical movement, not enough rows to fill the body */
            this.next_y = this.y;
        } else if (this.next_y < this.y) {
            this.scrollDown();
        } else if (this.next_y > this.y) {
            this.scrollUp();
        }

        if (this.reset_timer) {
            window.clearTimeout(this.reset_timer);
        }

        /* reset row & wrapper Y values toward 0 to prevent overflowing */
        this.reset_timer = window.setTimeout(function resetYAxis(instance) {
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
        }, 100, this);

        this.top_visible_row_index = this.calculateVisibleTopRowIndex();

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
        }.bind(this, this.next_x, this.x, this.next_y, this.top_visible_row_index));

        this.x = this.next_x;
        this.y = this.next_y;
    };

    TableView.prototype.handleTouchMove = function handleTouchMove(event) {
        event.preventDefault();

        /* we handle touchmove by detecting the delta of pageX/Y and forwarding
        it to handleMoveIntent() */

        this.touch = event.touches.item(0);

        this.evt.deltaX = this.last_touch_pageX - this.touch.pageX;
        this.evt.deltaY = this.last_touch_pageY - this.touch.pageY;

        this.last_touch_pageX = this.touch.pageX;
        this.last_touch_pageY = this.touch.pageY;

        this.handleMoveIntent(this.evt);
    };

    TableView.prototype.handleTouchStart = function handleTouchStart(event) {
        this.touch = event.touches.item(0);
        this.last_touch_pageX = this.touch.pageX;
        this.last_touch_pageY = this.touch.pageY;
    };

    TableView.prototype.handleAdvanceToXScrollTrackLocation = function handleAdvanceToXScrollTrackLocation(event) {
        if (this.x_scroll_locked) {
            return;
        }
        if (event.target.className !== 'ui-table-x-scroll-track') {
            return;
        }

        this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_table_pixel_ratio;
        this.evt.deltaY = 0;

        this.handleMoveIntent(this.evt);

        this.last_pageX = event.pageX;
    };

    TableView.prototype.handleAdvanceToYScrollTrackLocation = function handleAdvanceToYScrollTrackLocation(event) {
        if (this.y_scroll_locked) {
            return;
        }
        if (event.target.className !== 'ui-table-y-scroll-track') {
            return;
        }

        this.evt.deltaX = 0;
        this.evt.deltaY = Math.floor(this.applyDelta(this.last_y_scroll_handle_y, event.pageY - this.distance_from_top) / this.y_scrollbar_pixel_ratio) * this.cell_h;

        this.handleMoveIntent(this.evt);
    };

    TableView.prototype.handleXScrollHandleDragStart = function handleXScrollHandleDragStart(event) {
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();

        this.last_pageX = event.pageX;
        this.x_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    };

    TableView.prototype.handleYScrollHandleDragStart = function handleYScrollHandleDragStart(event) {
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();

        /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
        this.y_scroll_offset = event.offsetY;

        this.y_scroll_locked = true;
        this.left_button_pressed = true;

        // If the mouseup happens outside the table, it won't be detected without this listener
        window.addEventListener('mouseup', this.handleDragEnd, true);
    };

    TableView.prototype.handleDragMove = function handleDragMove(event) {
        var _this5 = this;

        if (!this.left_button_pressed) {
            return;
        }

        if (this.y_scroll_locked) {
            if (this.drag_timer) {
                window.clearTimeout(this.drag_timer);
            }

            /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
            this.drag_timer = window.setTimeout(function () {
                _this5.drag_timer = null;

                /* Now fetch, once drag has ceased for long enough. */
                _this5.rows.forEach(function (row) {
                    if (row.data === null) {
                        row.data = _this5.c.getRow(row.setIndex);
                    }
                });
            }, this.c.throttleInterval);

            this.evt.deltaX = 0;
            this.evt.deltaY = Math.floor(this.applyDelta(this.last_y_scroll_handle_y, event.pageY - this.distance_from_top - this.y_scroll_offset) / this.y_scrollbar_pixel_ratio) * this.cell_h;

            this.handleMoveIntent(this.evt);
        } else if (this.x_scroll_locked) {
            this.evt.deltaX = (event.pageX - this.last_pageX) * this.x_table_pixel_ratio;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);

            this.last_pageX = event.pageX;
        } else if (this.column_is_resizing) {
            this.handleColumnResize(event.pageX - this.last_column_x);

            this.last_column_x = event.pageX;
        }
    };

    TableView.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    TableView.prototype.handleDragEnd = function handleDragEnd() {
        var _this6 = this;

        window.removeEventListener('mouseup', this.handleDragEnd, true);

        this.left_button_pressed = false;

        /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
        window.setTimeout(function () {
            return _this6.unlockDragToScroll();
        }, 0);
    };

    TableView.prototype.handleColumnDragStart = function handleColumnDragStart(event) {
        if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this.left_button_pressed = true;

            this.last_column_x = event.pageX;

            this.column_is_resizing = (0, _findWhere2.default)(this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
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

    TableView.prototype.handleColumnAutoExpand = function handleColumnAutoExpand(event) {
        var _this7 = this;

        if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
            (function () {
                var mapping = event.target.parentNode.getAttribute('data-column');
                var column = (0, _findWhere2.default)(_this7.columns, 'mapping', mapping);
                var columnIndex = _this7.columns.indexOf(column);

                var width = column.width;
                var cellWidth = undefined;

                _this7.rows.forEach(function (row) {
                    if (!(row.data instanceof Promise) && row.data !== null) {
                        cellWidth = row.cells[columnIndex].trueWidth();
                        width = width < cellWidth ? cellWidth : width;
                    }
                }); /* find the rendered row with the longest content entry */

                _this7.applyNewColumnWidth(columnIndex, width);
            })();
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
        var _this8 = this;

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
                return _this8.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    TableView.prototype.handleKeyDown = function handleKeyDown(event) {
        var _this9 = this;

        var key = event.key || this.getKeyFromKeyCode(event.keyCode);

        switch (key) {
            case 'ArrowDown':
                this.changeActiveRow(1);
                event.preventDefault();
                break;

            case 'ArrowUp':
                this.changeActiveRow(-1);
                event.preventDefault();
                break;

            case 'Enter':
                if (this.active_row !== -1) {
                    (function () {
                        var row = (0, _findWhere2.default)(_this9.rows, 'setIndex', _this9.active_row).data;

                        _this9.setAriaText(_this9.columns.map(function (column) {
                            return column.title + ': ' + row[column.mapping];
                        }).join('\n'));
                    })();
                }

                event.preventDefault();
                break;
        }
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

    TableView.prototype.handleClick = function handleClick(event) {
        var map = this.discoverCellAndRowNodes(event.target);

        if (map.row) {
            var row = (0, _findWhere2.default)(this.rows, 'node', map.row);

            this.setActiveRow(row.setIndex);

            if (map.cell) {
                this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
            }

            this.c.rowClickFunc(event, row.setIndex);
        }
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
        _classCallCheck(this, UITokenizedInput);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
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

    UITokenizedInput.prototype.add = function add(index) {
        if (this.props.tokens.indexOf(index) === -1) {
            this.props.handleAddToken(index);
        }
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

    UITokenizedInput.prototype.handleInputFocus = function handleInputFocus(event) {
        this.clearSelection();

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    };

    UITokenizedInput.prototype.handleKeyDown = function handleKeyDown(event) {
        switch (event.which) {
            case 37:
                // left arrow
                this.selectPreviousToken(event.shiftKey);
                break;

            case 39:
                // right arrow
                this.selectNextToken(event.shiftKey);
                break;

            case 8:
                // backspace
                if (this.props.tokensSelected.length) {
                    this.remove(this.props.tokensSelected);
                    this.refs.typeahead.focus();
                }

                break;

            case 65:
                // letter "a"
                if (event.metaKey) {
                    event.preventDefault();

                    this.refs.typeahead.focus();
                    this.refs.typeahead.select();

                    // hacky, but the only way unless we move selection management internal again
                    this._suppressNextTokenSelection = true;

                    this.props.handleNewSelection(this.props.tokens);
                } // "cmd"
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
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
                onKeyDown: this.handleKeyDown.bind(this) }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, descendants, {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                onEntitySelected: this.add.bind(this),
                onFocus: this.handleInputFocus.bind(this),
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
        _classCallCheck(this, UITypeaheadInput);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UITypeaheadInput.prototype.initialState = function initialState() {
        return {
            entityMatchIndexes: [],
            selectedEntityIndex: -1,
            id: this.uuid(),
            userInput: this.props.defaultValue
        };
    };

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
        var _this2 = this;

        this.setState({ selectedEntityIndex: index }, function () {
            return _this2.setValueWithSelectedEntity();
        });
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

    UITypeaheadInput.prototype.setValueWithSelectedEntity = function setValueWithSelectedEntity() {
        this.props.onEntitySelected(this.state.selectedEntityIndex);

        if (this.props.clearPartialInputOnSelection) {
            this.value('');
        } else {
            this.value(this.getSelectedEntityText());
        }
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

    UITypeaheadInput.prototype.handleInput = function handleInput(event) {
        var _this3 = this;

        this.setState({ userInput: event.target.value }, function () {
            return _this3.computeMatches();
        });

        if (this.props.onInput) {
            event.persist();
            this.props.onInput(event);
        }

        if (typeof this.props.inputProps.onInput === 'function') {
            event.persist();
            this.props.inputProps.onInput(event);
        }
    };

    UITypeaheadInput.prototype.handleKeyDown = function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowLeft':
                if (event.target.selectionStart > 1) {
                    event.stopPropagation();
                }

                break;

            case 'Tab':
            case 'ArrowRight':
                if (this.state.selectedEntityIndex !== -1 && this.cursorAtEndOfInput() && this.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    this.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                this.selectMatch(-1);
                this.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                this.selectMatch(1);
                this.focus();
                break;

            case 'Escape':
                if (this.state.selectedEntityIndex !== -1 && this.getInputNode() === event.target) {
                    this.resetMatches();
                }

                break;

            case 'Enter':
                if (this.state.selectedEntityIndex !== -1 && this.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    this.setValueWithSelectedEntity();
                } else {
                    this.props.onComplete(this.state.userInput);
                }

                break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
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
        var _this4 = this;

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

                    var entity = _this4.props.entities[index];

                    return _react2.default.createElement(
                        'div',
                        _extends({}, entity, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this4.state.selectedEntityIndex === index
                            }, _cx3[entity.className] = !!entity.className, _cx3)),
                            key: entity.text,
                            onClick: _this4.handleMatchClick.bind(_this4, index) }),
                        _this4.markMatchSubstring(_this4.state.userInput, entity)
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
                onKeyDown: this.handleKeyDown.bind(this) }),
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
                onInput: this.handleInput.bind(this) })),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUYWJsZS90YWJsZS9pbmRleC5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9maW5kV2hlcmUvaW5kZXguanMiLCJVSVV0aWxzL25vb3AvaW5kZXguanMiLCJVSVV0aWxzL25vdGlmeS9pbmRleC5qcyIsIlVJVXRpbHMvc2hhbGxvd0VxdWFsL2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIlVJVmlldy9pbmRleC5qcyIsImV4cG9ydHMuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNJTTs7O0FBQ0YsYUFERSxvQkFDRixHQUFxQjs4QkFEbkIsc0JB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VSxPQUFPLEtBQVAsQ0FBYSxPQUFiLEdBQXVCLFFBQVEsV0FBUixFQUFxQixPQUFyQjtBQUNqQyxzQkFBbUIsT0FBTyxLQUFQLENBQWEsZ0JBQWIsR0FBZ0MsUUFBUSxvQkFBUixFQUE4QixPQUE5QjtBQUNuRCxlQUFZLE9BQU8sS0FBUCxDQUFhLFNBQWIsR0FBeUIsUUFBUSxhQUFSLEVBQXVCLE9BQXZCO0FBQ3JDLHNCQUFtQixPQUFPLEtBQVAsQ0FBYSxnQkFBYixHQUFnQyxRQUFRLG9CQUFSLEVBQThCLE9BQTlCO0FBQ25ELGFBQVM7QUFDTCxnQkFBUyxPQUFPLEtBQVAsQ0FBYSxPQUFiLENBQXFCLE1BQXJCLEdBQThCLFFBQVEsa0JBQVIsRUFBNEIsT0FBNUI7QUFDdkMsMkJBQW9CLE9BQU8sS0FBUCxDQUFhLE9BQWIsQ0FBcUIsaUJBQXJCLEdBQXlDLFFBQVEsNkJBQVIsRUFBdUMsT0FBdkM7S0FGakU7QUFJQSxZQUFTLE9BQU8sS0FBUCxDQUFhLE1BQWIsR0FBc0IsUUFBUSxVQUFSLEVBQW9CLE9BQXBCO0NBdkJuQzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuXG5jbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkRm9jdXMoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cblxuVUlBcnJvd0tleU5hdmlnYXRpb24ucHJvcFR5cGVzID0ge1xuICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIF0pLFxufTtcblxuVUlBcnJvd0tleU5hdmlnYXRpb24uZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbXBvbmVudDogJ2RpdicsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUFycm93S2V5TmF2aWdhdGlvbjtcbiIsImltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlCdXR0b24ucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgb25VbnByZXNzZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUJ1dHRvbjtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSBjaGVja2JveCB3aXRoIGluZGV0ZXJtaW5hdGUgc3VwcG9ydC5cbiAqIEBjbGFzcyBVSUNoZWNrYm94XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMubmFtZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubmFtZSB8fCAnY2Jfc2VsZWN0X2FsbCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2FsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU9eyFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzID0ge1xuICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uQWxsQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BbGxVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdEFsbExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgXSksXG59O1xuXG5VSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgc2VsZWN0QWxsTGFiZWw6ICdTZWxlY3QgQWxsJyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3hHcm91cDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgICAgICBib2R5VVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVGb2N1cyA9IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZSAmJiB0aGlzLnJlZnMuZGlhbG9nLmNvbnRhaW5zKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYm9keVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmb290ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hlYWRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSURpYWxvZy5wcm9wVHlwZXMgPSB7XG4gICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cblVJRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBib2R5UHJvcHM6IHt9LFxuICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICBmb290ZXJQcm9wczoge30sXG4gICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgIG9uQ2xvc2U6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSURpYWxvZztcbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSA9IHRoaXMucmVzY2FsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXNjYWxlKCkge1xuICAgICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgICAgIGlmICggICBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCdcbiAgICAgICAgICAgIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgICAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgICAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgICAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKHRoaXMucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRml0dGVkVGV4dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG59O1xuXG5VSUZpdHRlZFRleHQucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRml0dGVkVGV4dDtcbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUltYWdlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWcgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgYWx0PXtudWxsfVxuICAgICAgICAgICAgICAgICBzcmM9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJSW1hZ2Uuc3RhdHVzID0ge1xuICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgIEVSUk9SOiAnRVJST1InLFxufTtcblxuVUlJbWFnZS5wcm9wVHlwZXMgPSB7XG4gICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJSW1hZ2UuZGVmYXVsdFByb3BzID0ge1xuICAgIGltYWdlUHJvcHM6IHt9LFxuICAgIHN0YXR1c1Byb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJSW1hZ2U7XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGlhbG9nU3BlY2lmaWNQcm9wcyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZyB7Li4uZGlhbG9nU3BlY2lmaWNQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlNb2RhbC5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtb2RhbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgIG1hc2tQcm9wczoge30sXG4gICAgbW9kYWxQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSU1vZGFsO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJUGFnaW5hdGVkVmlld1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBJdGVtIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVBhZ2luYXRlZFZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLnBhZ2VyUG9zaXRpb24sXG4gICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICAgICAgICAgIG51bVBhZ2VUb2dnbGVzOiB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzLFxuICAgICAgICAgICAgdG90YWxJdGVtczogdGhpcy5wcm9wcy50b3RhbEl0ZW1zLFxuICAgICAgICAgICAgc2hvd25JdGVtczogW3tkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oMCl9XSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKSB7XG4gICAgICAgIGlmIChvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pZGVudGlmaWVyICE9PSB0aGlzLnByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcygxLCBuZXh0UHJvcHMuZ2V0SXRlbSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIG51bWJlck9mUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKGN1cnJlbnRQYWdlLCBnZXRJdGVtID0gdGhpcy5wcm9wcy5nZXRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMuc3RhdGUudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IGdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayh2YWx1ZSkge1xuICAgICAgICBsZXQgcGFnZU51bWJlcjtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMocGFnZU51bWJlciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uIHsuLi50aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93bkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlckNhc2UgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17J3NlZ21lbnRlZENvbnRyb2wnICsgKHBvc2l0aW9uTG93ZXJDYXNlWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyQ2FzZS5zbGljZSgxKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFsndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtJyArIHBvc2l0aW9uTG93ZXJDYXNlXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0ZWQtdmlldyc+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzID0ge1xuICAgIEZJUlNUOiAnRklSU1QnLFxuICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgIE5FWFQ6ICdORVhUJyxcbiAgICBMQVNUOiAnTEFTVCcsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQk9USDogJ0JPVEgnLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LnByb3BUeXBlcyA9IHtcbiAgICBnZXRJdGVtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBpZGVudGlmaWVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGlzdFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxIHx8IHByb3BzLm51bUl0ZW1zUGVyUGFnZSA+IHByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgcHJvcHMudG90YWxJdGVtcyArICcuJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG51bVBhZ2VUb2dnbGVzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhZ2VyUG9zaXRpb246IGZ1bmN0aW9uIHZhbGlkYXRlUGFnZXJQb3NpdGlvbihwcm9wcykge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMucGFnZXJQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgIGlmIChwcm9wcy5wYWdlclBvc2l0aW9uIDwgMSB8fCBwcm9wcy5wYWdlclBvc2l0aW9uID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uKSksXG4gICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd0p1bXBUb0ZpcnN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SnVtcFRvTGFzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9nZ2xlV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHRvdGFsSXRlbXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgZ2V0SXRlbTogbm9vcCxcbiAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiAnwqsgRmlyc3QnLFxuICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogJ0xhc3QgwrsnLFxuICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG5leHRQYWdlQ29udHJvbFRleHQ6ICdOZXh0IOKAuicsXG4gICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICBwYWdlclBvc2l0aW9uOiAxLFxuICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUsXG4gICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6ICfigLkgUHJldmlvdXMnLFxuICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQYWdpbmF0ZWRWaWV3O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlQYWdpbmF0ZWRWaWV3SXRlbSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdW50ZWQgJiYgdGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWV2ZW4nOiB0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICBjbG9uZVdpdGhDbGFzc2VzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PjwvZGl2Pik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHsuLi50aGlzLnByb3BzLCBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEucHJvcHMuY2xhc3NOYW1lKX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmVXaXRoQ2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEpO1xuICAgIH1cbn1cblxuVUlQYWdpbmF0ZWRWaWV3SXRlbS5wcm9wVHlwZXMgPSB7XG4gICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUGFnaW5hdGVkVmlld0l0ZW07XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbiA9IHRoaXMuYWxpZ24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5ub2RlLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUG9wb3Zlci5wb3NpdGlvbiA9IHtcbiAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICBNSURETEU6ICdNSURETEUnLFxuICAgIEVORDogJ0VORCcsXG59O1xuXG5VSVBvcG92ZXIucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBhbmNob3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGFuY2hvcllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxufTtcblxuVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBvcG92ZXI7XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgbGFiZWw9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG59O1xuXG5VSVByb2dyZXNzLnByb3BUeXBlcyA9IHtcbiAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgXSksXG4gICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzcztcbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRlYXNlckV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgb25IaWRlOiBub29wLFxuICAgIHRvZ2dsZVByb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlO1xuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVJhZGlvLnByb3BUeXBlcyA9IHtcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cblVJUmFkaW8uZGVmYXVsdFByb3BzID0ge1xuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlSYWRpbztcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgYXJpYS1yZXF1aXJlZD0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWVuU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VlblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG11bHRpcGxlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW5jb3VudGVyZWQgbXVsdGlwbGUgb3B0aW9ucyB3aXRoIGBzZWxlY3RlZDogdHJ1ZWAuIFRoZXJlIGNhbiBiZSBvbmx5IG9uZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgdmFsdWVgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cblVJU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJU2VnbWVudGVkQ29udHJvbDtcbiIsIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGVWaWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL3RhYmxlJztcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgZ2V0VGFibGVWaWV3Q29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMucmVmcy53cmFwcGVyLFxuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLnJlZnMuaGVhZGVyLFxuICAgICAgICAgICAgYm9keTogdGhpcy5yZWZzLmJvZHksXG4gICAgICAgICAgICAneC1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneC1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgYXJpYTogdGhpcy5yZWZzLmFyaWEsXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZVZpZXcodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd0YWJsZScgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlLnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhyb3R0bGVJbnRlcnZhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBUYWJsZVZpZXdcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi8uLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vLi4vVUlVdGlscy9ub29wJztcblxuLypcblxuRk9SIEZVVFVSRSBFWUVTXG5cblNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0IGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cblxuVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGUgYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuXG5fX0ltcG9ydGFudCBOb3RlX19cblxuQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cblxuXG5PUkRFUiBPRiBPUEVSQVRJT05TXG5cbjEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4yLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG5cbklmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhbiB0cnlpbmcgdG8gZGlmZi5cblxuKi9cblxuY29uc3QgY2VsbENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLWNlbGxcXGIvZztcbmNvbnN0IHJvd0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvd1xcYi9nO1xuXG5jb25zdCB0cmFuc2xhdGUzZCA9IGZ1bmN0aW9uIHRyYW5zbGF0ZTNEKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5jb25zdCByZXBhcmVudENlbGxUZXh0ID0gZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwnO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0aXRsZScsIGNvbnRlbnQpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVET01IZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGggfHwgd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVDZWxsID0gZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cnVlV2lkdGg6IGZ1bmN0aW9uIHRydWVXaWR0aCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2xhc3NlcyA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgICAgICAvLyB0YWtlIG9mZiB0aGUgaW5uZXIgY2xhc3Mgd2hpY2ggaXMgd2hhdCBjYXVzZXMgdGhlIHNpemluZyBjb25zdHJhaW50XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAgICAgICAgIC8qIENhcHR1cmUgdGhlIG5ldyBhZGp1c3RlZCBzaXplLCBoYXZlIHRvIHVzZSB0aGUgaGFyZCB3YXkgYmVjYXVzZSAuY2xpZW50V2lkdGggcmV0dXJucyBhbiBpbnRlZ2VyIHZhbHVlLCByYXRoZXIgdGhhbiB0aGUgX2FjdHVhbF8gd2lkdGguIFNNSC4gKi9cbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gdGhpcy5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgICAgICAvLyBQdXQgZXZlcnl0aGluZyBiYWNrXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSBjaGlsZENsYXNzZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdXaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlRE9NUm93ID0gZnVuY3Rpb24gY3JlYXRlRE9NUm93KHNldEluZGV4LCB5KSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcm93LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1yb3cnO1xuICAgICAgICAgIHJvdy5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuXG4gICAgcmV0dXJuIHJvdztcbn07XG5cbmNvbnN0IGNyZWF0ZVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZVJvdyhtZXRhZGF0YSwgY29sdW1ucykge1xuICAgIC8qIElNUE9SVEFOVCBOT1RFOiBtZXRhZGF0YS5kYXRhIG1pZ2h0IGJlIGEgcHJvbWlzZS4gUGxhbiBhY2NvcmRpbmdseS4gKi9cblxuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZURPTVJvdyhtZXRhZGF0YS5zZXRJbmRleCwgbWV0YWRhdGEueSk7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBjZWxscy5wdXNoKGNyZWF0ZUNlbGwoJycsIGNvbHVtbi5tYXBwaW5nLCBjb2x1bW4ud2lkdGgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LWV2ZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LW9kZCcsICd1aS10YWJsZS1yb3ctZXZlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LW9kZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctZXZlbicsICd1aS10YWJsZS1yb3ctb2RkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2FpdGluZ0ZvclJlc29sdXRpb24nOiBmYWxzZSxcbiAgICAgICAgZ2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKCkgeyByZXR1cm4gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb247IH0sXG4gICAgICAgIHNldCB3YWl0aW5nRm9yUmVzb2x1dGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctbG9hZGluZycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctbG9hZGluZycsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UgfHwgdGhpcy5fZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFRhYmxlVmlldyB7XG4gICAgdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuICAgIHR5cGVvZiBjb2x1bW4ubWFwcGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4ucmVzaXphYmxlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiAodHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgaWYgKCEoY29uZmlnLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgd3JhcHBlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgaGVhZGVyYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmJvZHkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYm9keWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneC1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneS1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneC1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnWyd5LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuYXJpYSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBhcmlhYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgICFBcnJheS5pc0FycmF5KGNvbmZpZy5jb2x1bW5zKVxuICAgICAgICAgICAgfHwgY29uZmlnLmNvbHVtbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICB8fCAhY29uZmlnLmNvbHVtbnMuZXZlcnkodGhpcy52YWxpZGF0ZUNvbHVtblNoYXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRhYmxlVmlldyB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgICAgICBtYXBwaW5nOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciAob3B0aW9uYWwpLFxuICAgICAgICAgICAgfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdGhyb3R0bGVJbnRlcnZhbGA7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdG90YWxSb3dzYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGdldFJvd2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucm93Q2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjZWxsQ2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgdGhpcy5jID0gey4uLmNvbmZpZ307XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuYy5yb3dDbGlja0Z1bmMgPSB0aGlzLmMucm93Q2xpY2tGdW5jIHx8IG5vb3A7XG4gICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jID0gdGhpcy5jLmNlbGxDbGlja0Z1bmMgfHwgbm9vcDtcbiAgICAgICAgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgPSB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCB8fCAzMDA7XG4gICAgICAgIHRoaXMuYy50b3RhbFJvd3MgPSB0aGlzLmMudG90YWxSb3dzIHx8IDA7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbmZpZ3VyYXRpb24odGhpcy5jKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hTdGFydCA9IHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoTW92ZSA9IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCA9IHRoaXMuaGFuZGxlTW92ZUludGVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSA9IHRoaXMuaGFuZGxlV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5jLmJvZHk7XG4gICAgICAgIHRoaXMuYm9keV9zdHlsZSA9IHRoaXMuYm9keS5zdHlsZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZSA9IHRoaXMuaGVhZGVyLnN0eWxlO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnQgPSB0aGlzLmxhc3RfcGFnZVggPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IC0xO1xuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmhlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVDaGlsZCh0aGlzLmhlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMuYy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uKSkpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMucm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdygwKSxcbiAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKDApO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmb3IgKHRoaXMuaSA9IDE7IHRoaXMuaSA8IHRoaXMubl9yb3dzX3JlbmRlcmVkOyB0aGlzLmkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMuaSksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuaSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLmNlbGxfaCA9IHRoaXMucm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3NbMF0uY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMucm93X3cgPSB0aGlzLnJvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9tYXggPSB0aGlzLmNvbnRhaW5lcl93IDw9IHRoaXMucm93X3cgPyB0aGlzLmNvbnRhaW5lcl93IC0gdGhpcy5yb3dfdyA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMuY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLnhfbWF4KTtcblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9ICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9PT0gdGhpcy5uX3Jvd3NfcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcl9oICogKHRoaXMubl9yb3dzX3Zpc2libGUgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG5cbiAgICAgICAgLyogdG90YWwgdHJhbnNsYXRhYmxlIHNwYWNlIC8gc2Nyb2xsYmFyIHRyYWNrIHNpemUgPSByZWxhdGl2ZSB2YWx1ZSBvZiBhIHNjcm9sbGJhciBwaXhlbCAqL1xuICAgICAgICB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gPSBNYXRoLmFicyh0aGlzLnhfbWF4KSAvICh0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplKTtcblxuICAgICAgICAvKiBob3cgbWFueSBzY3JvbGxiYXIgcGl4ZWxzID09PSBvbmUgcm93PyAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvID0gKHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUpIC8gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c192aXNpYmxlKTtcblxuICAgICAgICAvKiBoaWRlIHRoZSBzY3JvbGxiYXJzIGlmIHRoZXkgYXJlIG5vdCBuZWVkZWQgKi9cblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpIHtcbiAgICAgICAgLyogVGhlIGZhbGxiYWNrIGFtb3VudHMgYXJlIGZvciB1bml0IHRlc3RpbmcsIHRoZSBicm93c2VyIHdpbGwgYWx3YXlzIGhhdmVcbiAgICAgICAgYW4gYWN0dWFsIG51bWJlci4gKi9cbiAgICAgICAgdGhpcy5jb250YWluZXJfaCA9IHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuY29udGFpbmVyX3cgPSB0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuYm9keV9oID0gdGhpcy5jLmJvZHkuY2xpZW50SGVpZ2h0IHx8IDExMDtcbiAgICB9XG5cbiAgICBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgIT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmJ1aWxkQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmluamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IE1hdGguY2VpbCh0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3JlbmRlcmVkID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSB0aGlzLmMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IE1hdGguZmxvb3IodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggPSB0aGlzLm5fcm93c19yZW5kZXJlZCAtIDE7XG5cbiAgICAgICAgdGhpcy5pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLmluamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUhlYWRlcihuZXh0WCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNjcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbERvd24oKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIGVuZCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCBuKSB3ZSB0cnVuY2F0ZSBhbnkgc2Nyb2xsIGF0dGVtcHRzICAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfZW5kX2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MgLSAxICYmIHRoaXMubmV4dF95IDw9IHRoaXMueV9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21heDtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMueF9zY3JvbGxfdHJhY2tfaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPj0gdGhpcy55X21heCkgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCB0b3AgcG9zaXRpb24gdG8gdGhlIGJvdHRvbVxuICAgICAgICAgICAoYmVsb3cgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9tYXgpIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCArIHRoaXMucm93X2VuZF9pbmRleCArIDEgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIHRoYW4gdGhlcmUgaXMgZGF0YSBhdmFpbGFibGUsIHRydW5jYXRlICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSArPSAoXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtICh0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9PT0gMCA/IDAgOiAxKSlcbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlEZWx0YShkZWx0YSwgbnVtKSB7XG4gICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gPCAwID8gbnVtIC0gZGVsdGEgOiBudW0gKyBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW0gLSBkZWx0YTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgodGFyZ2V0WSA9IHRoaXMubmV4dF95KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NbXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W1xuICAgICAgICAgICAgICAgIE1hdGguY2VpbChNYXRoLmFicyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFYID09PSAwICAgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGVsdGFfeCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLmRlbHRhX3kgPSAgIGV2ZW50LmRlbHRhTW9kZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnggOiB0aGlzLnggLSB0aGlzLmRlbHRhX3g7XG4gICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy54X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnkgOiB0aGlzLnkgLSB0aGlzLmRlbHRhX3k7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF94ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF94IDwgdGhpcy54X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnhfbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbmVnYXRlIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCwgbm90IGVub3VnaCByb3dzIHRvIGZpbGwgdGhlIGJvZHkgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95IDwgdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBpbnN0YW5jZS5hcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnRyYW5zbGF0ZUJvZHkoaW5zdGFuY2UueCwgaW5zdGFuY2UueSk7XG5cbiAgICAgICAgfSwgMTAwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IHRoaXMuY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlcyB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIGhhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSwgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wXG4gICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCAtIHRoaXMueV9zY3JvbGxfb2Zmc2V0XG4gICAgICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbHVtbl9pc19yZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfY29sdW1uX3gpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubG9ja0RyYWdUb1Njcm9sbCgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qIHRoZSBicm93c2VyIGZpcmVzIHRoZSBtb3VzZXVwIGFuZCBjbGljayBldmVudHMgc2ltdWx0YW5lb3VzbHksIGFuZCB3ZSBkb24ndCB3YW50IG91ciBjbGljayBoYW5kbGVyIHRvIGJlIGV4ZWN1dGVkLCBzbyBhIHplcm8tZGVsYXkgc2V0VGltZW91dCB3b3JrcyBoZXJlIHRvIGxldCB0aGUgc3RhY2sgY2xlYXIgYmVmb3JlIGFsbG93aW5nIGNsaWNrIGV2ZW50cyBhZ2Fpbi4gKi9cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmaW5kV2hlcmUodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgd2lkdGgpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKTtcbiAgICAgICAgbGV0IGFkanVzdGVkX2RlbHRhID0gZGVsdGE7XG5cbiAgICAgICAgaWYgKCAgIGFkanVzdGVkX2RlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aClcbiAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhID4gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBhZGp1c3RlZF9kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5BdXRvRXhwYW5kKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoY29sdW1uSW5kZXgsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVJvdyhzZXRJbmRleCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSBzZXRJbmRleDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF9hY3RpdmVfcm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyh0aGlzLm5leHRfYWN0aXZlX3Jvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMubmV4dF9hY3RpdmVfcm93LmRhdGFbdGhpcy5jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xID4gdGhpcy55KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPCB0aGlzLnkgLSB0aGlzLmJvZHlfaCArIHRoaXMuY2VsbF9oKVxuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMuY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5hY3RpdmVfcm93IDwgdGhpcy5jLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93biBpbiB0aGUgdmlld3BvcnQuICovXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPiB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPCB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZGVsdGEpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5IHx8IHRoaXMuZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93KS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgY29uc3Qgbm9kZU1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKGNlbGxDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAuY2VsbCA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5yb3cgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVNYXA7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnbm9kZScsIG1hcC5yb3cpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhyb3cuc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobWFwLmNlbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVZpZXc7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgYWRkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0IHsuLi5kZXNjZW5kYW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRva2VuaXplZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgdG9rZW5zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJVG9rZW5pemVkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgdG9rZW5zOiBbXSxcbiAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRva2VuaXplZElucHV0O1xuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRvb2x0aXAucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICBBRlRFUjogJ0FGVEVSJyxcbn07XG5cblVJVG9vbHRpcC5wcm9wVHlwZXMgPSB7XG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUb29sdGlwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb29sdGlwO1xuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmlucHV0O1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMucmVmcy5pbnB1dC52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX2ZvY3VzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX2ZvY3VzSW5wdXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBgZm9jdXNJbnB1dCgpYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4gUGxlYXNlIHVzZSBVSVR5cGVhaGVhZElucHV0LmZvY3VzKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJJbnB1dDogbmV3VmFsdWUgfSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX3NldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9zZXRWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IGBzZXRWYWx1ZSh0ZXh0KWAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuIFBsZWFzZSB1c2UgVUlUeXBlYWhlYWRJbnB1dC52YWx1ZSh0ZXh0KSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXJrRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWFya0Z1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMSA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hdGNoRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWF0Y2hGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcklucHV0OiBldmVudC50YXJnZXQudmFsdWV9LCAoKSA9PiB0aGlzLmNvbXB1dGVNYXRjaGVzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbnRpdHkuY2xhc3NOYW1lXTogISFlbnRpdHkuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudGl0eS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUudXNlcklucHV0LCBlbnRpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgdHlwZT17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0Lm1vZGUgPSB7XG4gICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAnRlVaWlknOiAnRlVaWlknLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgYWxnb3JpdGhtOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgXSksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9KSxcbiAgICBdKSxcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Db21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlIaWdobGlnaHRlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVHlwZWFoZWFkSW5wdXQ7XG4iLCIvKipcbiAqIFNlYXJjaGVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYW4gYXJyYXkgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvZmluZFdoZXJlXG4gKi9cblxubGV0IF9maW5kV2hlcmVJbmRleCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtICB7QXJyYXlbT2JqZWN0XX0gYXJyYXkgICAgIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIHByb3BlcnR5ICB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgdmFsdWUgICAgIHRoZSB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0ICh1c2VzIHN0cmljdCBlcXVhbGl0eSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfSBUaGUgbWF0Y2hlZCBhcnJheSBpdGVtLCBvciBub3RoaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIF9maW5kV2hlcmVJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoX2ZpbmRXaGVyZUluZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5W19maW5kV2hlcmVJbmRleF1bcHJvcGVydHldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W19maW5kV2hlcmVJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBfZmluZFdoZXJlSW5kZXggLT0gMTtcbiAgICB9XG59IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5pY29uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcub25DbGljayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL1VJVXRpbHMvc2hhbGxvd0VxdWFsJztcblxuLyoqXG4gKiBBbiBhdWdtZW50ZWQgdmVyc2lvbiBvZiBgUmVhY3QuQ29tcG9uZW50YCB3aXRoIHNvbWUgaGVscGZ1bCBhYnN0cmFjdGlvbnMgYWRkZWQgdG8gc21vb3RoXG4gKiB0aGUgY29tcG9uZW50IGRldmVsb3BtZW50IHByb2Nlc3MuXG4gKlxuICogQWxsIFVJS2l0IGNvbXBvbmVudHMgYXJlIGJhc2VkIG9uIFVJVmlldy5cbiAqXG4gKiBAYXVnbWVudHMge1JlYWN0LkNvbXBvbmVudH1cbiAqL1xuY2xhc3MgVUlWaWV3IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgZGF0YSBwYXNzZWQgb24gdG8gdGhlIGVuZCBjb21wb25lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZSA/IHRoaXMuaW5pdGlhbFN0YXRlKCkgOiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHByb3hpbWF0ZXMgdGhlIEBsaW5re1B1cmVSZW5kZXJNaXhpbiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWx9IGZyb20gRVM1IFJlYWN0LiBJbXBsZW1lbnQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIGluIHlvdXIgc3ViY2xhc3MgdG8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIGluY29taW5nIHByb3BzIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHByb3BzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgdGhlIGluY29taW5nIHN0YXRlIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgSW5mb3JtcyBSZWFjdCB0byByZS1yZW5kZXIgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICogICAgIC8vIHNvbWUgbG9naWMgaGVyZSwgZXZlbnR1YWxseSBgcmV0dXJuYCB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgIC8vIGN1cnJlbnQgcHJvcHMgJiBzdGF0ZSBhcmUgYXZhaWxhYmxlIGZvciBjb21wYXJpc29uIGF0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgXG4gICAgICogfVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gIXNoYWxsb3dFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8ICFzaGFsbG93RXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLnV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gICAgICovXG4gICAgdXVpZCgpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbXVsYXRlcyB0aGUgKG5vdyByZW1vdmVkKSBSZWFjdCBpbnRlcmZhY2UgYGdldEluaXRpYWxTdGF0ZWAuIEl0J3MgYSBjb252ZW5pZW5jZSwgYnV0IGFsbG93c1xuICAgICAqIGZvciB0aGlzIGZ1bmN0aW9uYWxpdHkgdG8gd29yayB3aXRob3V0IGhhdmluZyB0byBwcm92aWRlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBuYW1lIFVJVmlldyNpbml0aWFsU3RhdGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaW5pdGlhbFN0YXRlKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBVSVZpZXc7XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcbmdsb2JhbC5VSUtpdC5VSVV0aWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJQXJyb3dLZXlOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9VSUFycm93S2V5TmF2aWdhdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUGFnaW5hdGVkVmlldzogKGdsb2JhbC5VSUtpdC5VSVBhZ2luYXRlZFZpZXcgPSByZXF1aXJlKCcuL1VJUGFnaW5hdGVkVmlldycpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVXRpbHM6IHtcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wZXJ0eTogKGdsb2JhbC5VSUtpdC5VSVV0aWxzLnRyYW5zZm9ybVByb3BlcnR5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iXX0=
