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

var _transform = require(25);

var _transform2 = _interopRequireDefault(_transform);

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
        if (_transform2.default) {
            node.style[_transform2.default] = 'translate(' + x + 'px, ' + y + 'px)';
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

var _transform = require(25);

var _transform2 = _interopRequireDefault(_transform);

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
    row.style[_transform2.default] = translate3d(0, y);

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
                this.node.style[_transform2.default] = translate3d(0, this._y);
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
            this.header_style[_transform2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    TableView.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transform2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    TableView.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transform2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    TableView.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transform2.default] = translate3d(0, y);
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
 * @module UIKit/utils/transform
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
        notify: global.UIKit.UIUtils.notify = require(23).default
    },
    UIView: global.UIKit.UIView = require(26).default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"18":18,"19":19,"2":2,"20":20,"23":23,"26":26,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],28:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUYWJsZS90YWJsZS9pbmRleC5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9maW5kV2hlcmUvaW5kZXguanMiLCJVSVV0aWxzL25vb3AvaW5kZXguanMiLCJVSVV0aWxzL25vdGlmeS9pbmRleC5qcyIsIlVJVXRpbHMvc2hhbGxvd0VxdWFsL2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm0vaW5kZXguanMiLCJVSVZpZXcvaW5kZXguanMiLCJleHBvcnRzLmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSU07OztBQUNGLGFBREUsb0JBQ0YsR0FBcUI7OEJBRG5CLHNCQUNtQjs7MENB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QUFQLENBQWEsT0FBYixHQUF1QixRQUFRLFdBQVIsRUFBcUIsT0FBckI7QUFDakMsc0JBQW1CLE9BQU8sS0FBUCxDQUFhLGdCQUFiLEdBQWdDLFFBQVEsb0JBQVIsRUFBOEIsT0FBOUI7QUFDbkQsZUFBWSxPQUFPLEtBQVAsQ0FBYSxTQUFiLEdBQXlCLFFBQVEsYUFBUixFQUF1QixPQUF2QjtBQUNyQyxzQkFBbUIsT0FBTyxLQUFQLENBQWEsZ0JBQWIsR0FBZ0MsUUFBUSxvQkFBUixFQUE4QixPQUE5QjtBQUNuRCxhQUFTO0FBQ0wsZ0JBQVMsT0FBTyxLQUFQLENBQWEsT0FBYixDQUFxQixNQUFyQixHQUE4QixRQUFRLGtCQUFSLEVBQTRCLE9BQTVCO0tBRDNDO0FBR0EsWUFBUyxPQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLFFBQVEsVUFBUixFQUFvQixPQUFwQjtDQXRCbkM7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuY2xhc3MgVUlBcnJvd0tleU5hdmlnYXRpb24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSgpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudW1DaGlsZHJlbiAtIDF9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gKFxuICAgICAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgID8gdGhpcy5yZWZzLndyYXBwZXJcbiAgICAgICAgICA6IGZpbmRET01Ob2RlKHRoaXMucmVmcy53cmFwcGVyKVxuICAgICAgICApLmNoaWxkcmVuW2luZGV4XTtcblxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgY2hpbGROb2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygtMSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRCbHVyKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEZvY3VzKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogaW5kZXh9KTtcblxuICAgICAgICBpZiAodHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgfHwgaW5kZXgsXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnRhYkluZGV4IHx8IDAsXG4gICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUNoaWxkQmx1ci5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVDaGlsZEZvY3VzLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbigpKTtcbiAgICB9XG59XG5cblVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcyA9IHtcbiAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBdKSxcbn07XG5cblVJQXJyb3dLZXlOYXZpZ2F0aW9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb21wb25lbnQ6ICdkaXYnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlBcnJvd0tleU5hdmlnYXRpb247XG4iLCJpbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnByb3BzLnByZXNzZWQgPyAnb25VbnByZXNzZWQnIDogJ29uUHJlc3NlZCddKGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzZWQnOiB0aGlzLnByb3BzLnByZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXt0aGlzLnByb3BzLnByZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5VSUJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb25QcmVzc2VkOiBub29wLFxuICAgIG9uVW5wcmVzc2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlCdXR0b247XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5hcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3gucHJvcFR5cGVzID0ge1xuICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlDaGVja2JveC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hlY2tlZDogZmFsc2UsXG4gICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25DaGVja2VkOiBub29wLFxuICAgIG9uVW5jaGVja2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDaGVja2JveDtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLm5hbWUgfHwgJ2NiX3NlbGVjdF9hbGwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cyA9IHtcbiAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcbiAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQWxsVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RBbGxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgIF0pLFxufTtcblxuVUlDaGVja2JveEdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG4gICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94R3JvdXA7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlclVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgYm9keVVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlRm9jdXMgPSB0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrID0gdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgdGhpcy5yZWZzLmRpYWxvZy5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlciB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZm9vdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoZWFkZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgcm9sZT0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlEaWFsb2cucHJvcFR5cGVzID0ge1xuICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5VSURpYWxvZy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYm9keVByb3BzOiB7fSxcbiAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICBvbkNsb3NlOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlEaWFsb2c7XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5jbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUgPSB0aGlzLnJlc2NhbGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVzY2FsZSgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgICAgICBpZiAoICAgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAgICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbih0aGlzLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUZpdHRlZFRleHQuZGVmYXVsdFByb3BzID0ge1xuICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxufTtcblxuVUlGaXR0ZWRUZXh0LnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgXSksXG4gICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUZpdHRlZFRleHQ7XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGFsdD17bnVsbH1cbiAgICAgICAgICAgICAgICAgc3JjPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUltYWdlLnN0YXR1cyA9IHtcbiAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICBFUlJPUjogJ0VSUk9SJyxcbn07XG5cblVJSW1hZ2UucHJvcFR5cGVzID0ge1xuICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUltYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbWFnZVByb3BzOiB7fSxcbiAgICBzdGF0dXNQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUltYWdlO1xuIiwiLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlNb2RhbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSU1vZGFsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1NwZWNpZmljUHJvcHMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXNrJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2cgey4uLmRpYWxvZ1NwZWNpZmljUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvVUlEaWFsb2c+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJTW9kYWwucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICBtYXNrUHJvcHM6IHt9LFxuICAgIG1vZGFsUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlNb2RhbDtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRlZFZpZXdcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlQYWdpbmF0ZWRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5wYWdlclBvc2l0aW9uLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBudW1QYWdlVG9nZ2xlczogdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcyxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IHRoaXMucHJvcHMudG90YWxJdGVtcyxcbiAgICAgICAgICAgIHNob3duSXRlbXM6IFt7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKDApfV0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSkge1xuICAgICAgICBpZiAob2xkU3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXModGhpcy5zdGF0ZS5jdXJyZW50UGFnZSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaWRlbnRpZmllciAhPT0gdGhpcy5wcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMoMSwgbmV4dFByb3BzLmdldEl0ZW0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcyhjdXJyZW50UGFnZSwgZ2V0SXRlbSA9IHRoaXMucHJvcHMuZ2V0SXRlbSkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnN0YXRlLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiBnZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sodmFsdWUpIHtcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXI7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUzpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYWdlTnVtYmVyLFxuICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHBhZ2VOdW1iZXIpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSUFycm93S2V5TmF2aWdhdGlvbiB7Li4udGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWxpc3QnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd25JdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbSByZWY9e2BpdGVtXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtpdGVtLmRhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXJDYXNlID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eydzZWdtZW50ZWRDb250cm9sJyArIChwb3NpdGlvbkxvd2VyQ2FzZVswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlckNhc2Uuc2xpY2UoMSkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLScgKyBwb3NpdGlvbkxvd2VyQ2FzZV06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGVkLXZpZXcnPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRVxuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPV1xuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcyA9IHtcbiAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICBORVhUOiAnTkVYVCcsXG4gICAgTEFTVDogJ0xBU1QnLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uID0ge1xuICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgIEJPVEg6ICdCT1RIJyxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5wcm9wVHlwZXMgPSB7XG4gICAgZ2V0SXRlbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxpc3RXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmV4dFBhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSB8fCBwcm9wcy5udW1JdGVtc1BlclBhZ2UgPiBwcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIHByb3BzLnRvdGFsSXRlbXMgKyAnLicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBudW1QYWdlVG9nZ2xlczogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdlclBvc2l0aW9uOiBmdW5jdGlvbiB2YWxpZGF0ZVBhZ2VyUG9zaXRpb24ocHJvcHMpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLnBhZ2VyUG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICBpZiAocHJvcHMucGFnZXJQb3NpdGlvbiA8IDEgfHwgcHJvcHMucGFnZXJQb3NpdGlvbiA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbikpLFxuICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dKdW1wVG9GaXJzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0p1bXBUb0xhc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0b3RhbEl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcuZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIGdldEl0ZW06IG5vb3AsXG4gICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogJ8KrIEZpcnN0JyxcbiAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6ICdMYXN0IMK7JyxcbiAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiAnTmV4dCDigLonLFxuICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgcGFnZXJQb3NpdGlvbjogMSxcbiAgICBwb3NpdGlvbjogVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFLFxuICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiAn4oC5IFByZXZpb3VzJyxcbiAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUGFnaW5hdGVkVmlldztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUGFnaW5hdGVkVmlld0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmRhdGEgIT09IHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IG5leHRQcm9wcy5kYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VudGVkICYmIHRoaXMuc3RhdGUuZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLnN0YXRlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbSc6IHRydWUsXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWxvYWRpbmcnOiB0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlLFxuICAgICAgICB9KSArIChleHRyYUNsYXNzZXMgPyAnICcgKyBleHRyYUNsYXNzZXMgOiAnJyk7XG4gICAgfVxuXG4gICAgY2xvbmVXaXRoQ2xhc3NlcyhlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuICg8ZGl2IHsuLi50aGlzLnByb3BzfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT48L2Rpdj4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB7Li4udGhpcy5wcm9wcywgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXModGhpcy5zdGF0ZS5kYXRhLnByb3BzLmNsYXNzTmFtZSl9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lV2l0aENsYXNzZXModGhpcy5zdGF0ZS5kYXRhKTtcbiAgICB9XG59XG5cblVJUGFnaW5hdGVkVmlld0l0ZW0ucHJvcFR5cGVzID0ge1xuICAgIGV2ZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBhZ2luYXRlZFZpZXdJdGVtO1xuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbi8qXG4gICAgQSBudWFuY2UgYWJvdXQgdGhpcyBjb21wb25lbnQ6IHNpbmNlIGl0IG9ubHkgcmVuZGVycyBhIHNpbXBsZSA8ZGl2PiwgdGhlIG1haW4gcmVuZGVyKCkgZnVuY3Rpb25cbiAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICBhIGZ1bGwgcmUtcmVuZGVyIG9mIHRoZSBjaGlsZCBkaWFsb2cuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlQb3BvdmVyIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiB0aGlzLnByb3BzLmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IHRoaXMucHJvcHMuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IHRoaXMucHJvcHMuc2VsZllBbGlnbixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoKHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpKTtcblxuICAgICAgICAvLyB0aGlzIGlzIGJhZCwgZG9uJ3QgZG8gdGhpcyBhbnl3aGVyZSBlbHNlIDoteC5cbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMucmVmcy5kaWFsb2cgPSB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLm5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZGlhbG9nKTtcblxuICAgICAgICB0aGlzLmFsaWduID0gdGhpcy5hbGlnbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGdldE5leHRYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IGFuY2hvci5vZmZzZXRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYICs9IGFuY2hvci5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBhbmNob3JIZWlnaHQgPSBhbmNob3Iub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7fTtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRTtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMuZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLmdldE5leHRZUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKHRoaXMubm9kZSwgeCwgeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgT2JqZWN0LmtleXMoYWxpZ25tZW50Q29ycmVjdGlvbikubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uLCAoKSA9PiB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLm5vZGUsIHgsIHkpO1xuICAgIH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEaWFsb2coKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgZ2V0RnJhZyA9IHRoaXMuZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDtcblxuICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmVGb2N1cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcG9wb3Zlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXktJHtnZXRGcmFnKHN0YXRlLmFuY2hvcllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQb3BvdmVyLnBvc2l0aW9uID0ge1xuICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgRU5EOiAnRU5EJyxcbn07XG5cblVJUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgIGFuY2hvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIHByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgYW5jaG9yWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgYW5jaG9yWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgYXV0b1JlcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNlbGZYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBzZWxmWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG59O1xuXG5VSVBvcG92ZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUG9wb3ZlcjtcbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBsYWJlbD17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjYW5jZWxQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbn07XG5cblVJUHJvZ3Jlc3MucHJvcFR5cGVzID0ge1xuICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzO1xuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBvbkV4cGFuZDogbm9vcCxcbiAgICBvbkhpZGU6IG5vb3AsXG4gICAgdG9nZ2xlUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU7XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUmFkaW8ucHJvcFR5cGVzID0ge1xuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuVUlSYWRpby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVJhZGlvO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi5kZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1cy5iaW5kKHRoaXMsIGRlZmluaXRpb24pfT5cbiAgICAgICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XG4gICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uczogZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4gdHlwZW9mIG9wdGlvbi52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuVUlTZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlTZWdtZW50ZWRDb250cm9sO1xuIiwiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZVZpZXcuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVGFibGVWaWV3IGZyb20gJy4vdGFibGUnO1xuXG5jbGFzcyBVSVRhYmxlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBnZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy5yZWZzLndyYXBwZXIsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMucmVmcy5oZWFkZXIsXG4gICAgICAgICAgICBib2R5OiB0aGlzLnJlZnMuYm9keSxcbiAgICAgICAgICAgICd4LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd4LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICBhcmlhOiB0aGlzLnJlZnMuYXJpYSxcblxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgcm93Q2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QsXG4gICAgICAgICAgICBjZWxsQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgZ2V0Um93OiB0aGlzLnByb3BzLmdldFJvdyxcbiAgICAgICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IHRoaXMucHJvcHMudGhyb3R0bGVJbnRlcnZhbCxcbiAgICAgICAgICAgIHRvdGFsUm93czogdGhpcy5wcm9wcy50b3RhbFJvd3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlVmlldyh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMudGFibGUucmVnZW5lcmF0ZSh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJyBjbGFzc05hbWU9J3VpLXRhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVGFibGUucHJvcFR5cGVzID0ge1xuICAgIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgbWFwcGluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB9KVxuICAgICksXG4gICAgZ2V0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBpZGVudGlmaWVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvd0ludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0aHJvdHRsZUludGVydmFsOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cblVJVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiIsIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFRhYmxlVmlld1xuICovXG5cbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vLi4vVUlVdGlscy9ub29wJztcblxuLypcblxuRk9SIEZVVFVSRSBFWUVTXG5cblNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0IGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cblxuVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGUgYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuXG5fX0ltcG9ydGFudCBOb3RlX19cblxuQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cblxuXG5PUkRFUiBPRiBPUEVSQVRJT05TXG5cbjEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4yLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG5cbklmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhbiB0cnlpbmcgdG8gZGlmZi5cblxuKi9cblxuY29uc3QgY2VsbENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLWNlbGxcXGIvZztcbmNvbnN0IHJvd0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvd1xcYi9nO1xuXG5jb25zdCB0cmFuc2xhdGUzZCA9IGZ1bmN0aW9uIHRyYW5zbGF0ZTNEKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5jb25zdCByZXBhcmVudENlbGxUZXh0ID0gZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwnO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0aXRsZScsIGNvbnRlbnQpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIG1hcHBpbmcpO1xuICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHJlcGFyZW50Q2VsbFRleHQoY2VsbCwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVET01IZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NSGVhZGVyQ2VsbChjb2x1bW4sIHdpZHRoKSB7XG4gICAgY29uc3QgY2VsbCA9IGNyZWF0ZURPTUNlbGwoY29sdW1uLnRpdGxlLCBjb2x1bW4ubWFwcGluZywgd2lkdGgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfbWV0YWRhdGEnOiBtZXRhZGF0YSxcbiAgICAgICAgJ190aXRsZSc6IG1ldGFkYXRhLnRpdGxlLFxuICAgICAgICBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLl90aXRsZTsgfSxcbiAgICAgICAgc2V0IHRpdGxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fdGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX3RpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogbWV0YWRhdGEud2lkdGggfHwgd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXBwaW5nOiBtZXRhZGF0YS5tYXBwaW5nLFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVDZWxsID0gZnVuY3Rpb24gY3JlYXRlQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cnVlV2lkdGg6IGZ1bmN0aW9uIHRydWVXaWR0aCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2xhc3NlcyA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgICAgICAvLyB0YWtlIG9mZiB0aGUgaW5uZXIgY2xhc3Mgd2hpY2ggaXMgd2hhdCBjYXVzZXMgdGhlIHNpemluZyBjb25zdHJhaW50XG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAgICAgICAgIC8qIENhcHR1cmUgdGhlIG5ldyBhZGp1c3RlZCBzaXplLCBoYXZlIHRvIHVzZSB0aGUgaGFyZCB3YXkgYmVjYXVzZSAuY2xpZW50V2lkdGggcmV0dXJucyBhbiBpbnRlZ2VyIHZhbHVlLCByYXRoZXIgdGhhbiB0aGUgX2FjdHVhbF8gd2lkdGguIFNNSC4gKi9cbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gdGhpcy5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgICAgICAvLyBQdXQgZXZlcnl0aGluZyBiYWNrXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSBjaGlsZENsYXNzZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdXaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlRE9NUm93ID0gZnVuY3Rpb24gY3JlYXRlRE9NUm93KHNldEluZGV4LCB5KSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcm93LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1yb3cnO1xuICAgICAgICAgIHJvdy5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHkpO1xuXG4gICAgcmV0dXJuIHJvdztcbn07XG5cbmNvbnN0IGNyZWF0ZVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZVJvdyhtZXRhZGF0YSwgY29sdW1ucykge1xuICAgIC8qIElNUE9SVEFOVCBOT1RFOiBtZXRhZGF0YS5kYXRhIG1pZ2h0IGJlIGEgcHJvbWlzZS4gUGxhbiBhY2NvcmRpbmdseS4gKi9cblxuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZURPTVJvdyhtZXRhZGF0YS5zZXRJbmRleCwgbWV0YWRhdGEueSk7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcblxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBjZWxscy5wdXNoKGNyZWF0ZUNlbGwoJycsIGNvbHVtbi5tYXBwaW5nLCBjb2x1bW4ud2lkdGgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LWV2ZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LW9kZCcsICd1aS10YWJsZS1yb3ctZXZlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LW9kZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctZXZlbicsICd1aS10YWJsZS1yb3ctb2RkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2FpdGluZ0ZvclJlc29sdXRpb24nOiBmYWxzZSxcbiAgICAgICAgZ2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKCkgeyByZXR1cm4gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb247IH0sXG4gICAgICAgIHNldCB3YWl0aW5nRm9yUmVzb2x1dGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsICYmIHRoaXMubm9kZS5jbGFzc05hbWUuaW5kZXhPZigndWktdGFibGUtcm93LWxvYWRpbmcnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctbG9hZGluZycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctbG9hZGluZycsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UgfHwgdGhpcy5fZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldFJvd0RhdGEocHJvbWlzZSwgcmVzb2x2ZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn07XG5cbmNsYXNzIFRhYmxlVmlldyB7XG4gICAgdmFsaWRhdGVDb2x1bW5TaGFwZShjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuICAgIHR5cGVvZiBjb2x1bW4ubWFwcGluZyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4ucmVzaXphYmxlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2x1bW4udGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiAodHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgaWYgKCEoY29uZmlnLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgd3JhcHBlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgaGVhZGVyYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmJvZHkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYm9keWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneC1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneS1zY3JvbGwtdHJhY2snXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC10cmFja2AgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZ1sneC1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnWyd5LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB5LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuYXJpYSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBhcmlhYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgICFBcnJheS5pc0FycmF5KGNvbmZpZy5jb2x1bW5zKVxuICAgICAgICAgICAgfHwgY29uZmlnLmNvbHVtbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICB8fCAhY29uZmlnLmNvbHVtbnMuZXZlcnkodGhpcy52YWxpZGF0ZUNvbHVtblNoYXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRhYmxlVmlldyB3YXMgbm90IHBhc3NlZCB2YWxpZCBcXGBjb2x1bW5zXFxgLiBJdCBzaG91bGQgYmUgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCBvbmUgb2JqZWN0IGNvbmZvcm1pbmcgdG86IHtcbiAgICAgICAgICAgICAgICBtYXBwaW5nOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciAob3B0aW9uYWwpLFxuICAgICAgICAgICAgfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudGhyb3R0bGVJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdGhyb3R0bGVJbnRlcnZhbGA7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRvdGFsUm93cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgdG90YWxSb3dzYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZ2V0Um93ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGdldFJvd2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucm93Q2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHJvd0NsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuY2VsbENsaWNrRnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBjZWxsQ2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgICAgdGhpcy5jID0gey4uLmNvbmZpZ307XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuYy5yb3dDbGlja0Z1bmMgPSB0aGlzLmMucm93Q2xpY2tGdW5jIHx8IG5vb3A7XG4gICAgICAgIHRoaXMuYy5jZWxsQ2xpY2tGdW5jID0gdGhpcy5jLmNlbGxDbGlja0Z1bmMgfHwgbm9vcDtcbiAgICAgICAgdGhpcy5jLnRocm90dGxlSW50ZXJ2YWwgPSB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCB8fCAzMDA7XG4gICAgICAgIHRoaXMuYy50b3RhbFJvd3MgPSB0aGlzLmMudG90YWxSb3dzIHx8IDA7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbmZpZ3VyYXRpb24odGhpcy5jKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hTdGFydCA9IHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoTW92ZSA9IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCA9IHRoaXMuaGFuZGxlTW92ZUludGVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSA9IHRoaXMuaGFuZGxlV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5jLmJvZHk7XG4gICAgICAgIHRoaXMuYm9keV9zdHlsZSA9IHRoaXMuYm9keS5zdHlsZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZSA9IHRoaXMuaGVhZGVyLnN0eWxlO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlID0gdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQpO1xuXG4gICAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX2xlZnQgPSB0aGlzLmxhc3RfcGFnZVggPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlX3JvdyA9IC0xO1xuICAgICAgICB0aGlzLm5leHRfYWN0aXZlX3JvdyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5pID0gbnVsbDtcbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMucHRyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbiBjYWNoZXNcbiAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X2JvZHlfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3kgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeF9zY3JvbGxfaGFuZGxlX3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ldnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfdyA9IHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCA9IG51bGw7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gbnVsbDtcblxuICAgICAgICAvLyByZXNldCFcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7XG4gICAgfVxuXG4gICAgZW1wdHlIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmhlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVDaGlsZCh0aGlzLmhlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMuYy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uKSkpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLmZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMucm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95Lmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLnJvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdygwKSxcbiAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKDApO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmb3IgKHRoaXMuaSA9IDE7IHRoaXMuaSA8IHRoaXMubl9yb3dzX3JlbmRlcmVkOyB0aGlzLmkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KHRoaXMuaSksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuaSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxfaCAqIHRoaXMuaSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5pKTtcbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3lfbGVuZ3RoICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW3RoaXMuaV0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLmNlbGxfaCA9IHRoaXMucm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLnJvd3NbMF0uY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLmNvbHVtbnNbaW5kZXhdLndpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMucm93X3cgPSB0aGlzLnJvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMueF9tYXggPSB0aGlzLmNvbnRhaW5lcl93IDw9IHRoaXMucm93X3cgPyB0aGlzLmNvbnRhaW5lcl93IC0gdGhpcy5yb3dfdyA6IDA7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWUJvdW5kKCkge1xuICAgICAgICB0aGlzLnlfbWluID0gMDtcbiAgICAgICAgdGhpcy55X21heCA9IHRoaXMuYm9keV9oIC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQgKiB0aGlzLmNlbGxfaDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IHRoaXMuY29udGFpbmVyX3cgLSBNYXRoLmFicyh0aGlzLnhfbWF4KTtcblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9ICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9PT0gdGhpcy5uX3Jvd3NfcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250YWluZXJfaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcl9oICogKHRoaXMubl9yb3dzX3Zpc2libGUgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja193ID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IHRoaXMuY29udGFpbmVyX3c7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaCA9IHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgODtcbiAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCB0aGlzLmNvbnRhaW5lcl9oO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZS53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlWVNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG5cbiAgICAgICAgLyogdG90YWwgdHJhbnNsYXRhYmxlIHNwYWNlIC8gc2Nyb2xsYmFyIHRyYWNrIHNpemUgPSByZWxhdGl2ZSB2YWx1ZSBvZiBhIHNjcm9sbGJhciBwaXhlbCAqL1xuICAgICAgICB0aGlzLnhfdGFibGVfcGl4ZWxfcmF0aW8gPSBNYXRoLmFicyh0aGlzLnhfbWF4KSAvICh0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplKTtcblxuICAgICAgICAvKiBob3cgbWFueSBzY3JvbGxiYXIgcGl4ZWxzID09PSBvbmUgcm93PyAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvID0gKHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUpIC8gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLm5fcm93c192aXNpYmxlKTtcblxuICAgICAgICAvKiBoaWRlIHRoZSBzY3JvbGxiYXJzIGlmIHRoZXkgYXJlIG5vdCBuZWVkZWQgKi9cblxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA9PT0gdGhpcy5jb250YWluZXJfdykge1xuICAgICAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl9oKSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpIHtcbiAgICAgICAgLyogVGhlIGZhbGxiYWNrIGFtb3VudHMgYXJlIGZvciB1bml0IHRlc3RpbmcsIHRoZSBicm93c2VyIHdpbGwgYWx3YXlzIGhhdmVcbiAgICAgICAgYW4gYWN0dWFsIG51bWJlci4gKi9cbiAgICAgICAgdGhpcy5jb250YWluZXJfaCA9IHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuY29udGFpbmVyX3cgPSB0aGlzLmMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuYm9keV9oID0gdGhpcy5jLmJvZHkuY2xpZW50SGVpZ2h0IHx8IDExMDtcbiAgICB9XG5cbiAgICBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmMud3JhcHBlci5jbGllbnRIZWlnaHQgIT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSB0aGlzLmMpIHsgdGhpcy5wcm9jZXNzQ29uZmlndXJhdGlvbihjb25maWcpOyB9XG5cbiAgICAgICAgdGhpcy5yZXNldEludGVybmFscygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmJ1aWxkQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmluamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxIZWlnaHQoKTtcblxuICAgICAgICB0aGlzLm5fcm93c19yZW5kZXJlZCA9IE1hdGguY2VpbCh0aGlzLmJvZHlfaCAvIHRoaXMuY2VsbF9oKSArIHRoaXMubl9wYWRkaW5nX3Jvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3JlbmRlcmVkID4gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSB0aGlzLmMudG90YWxSb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IE1hdGguZmxvb3IodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdmlzaWJsZSA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggPSB0aGlzLm5fcm93c19yZW5kZXJlZCAtIDE7XG5cbiAgICAgICAgdGhpcy5pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLmluamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKHggIT09IHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCkge1xuICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF94X3Njcm9sbF9oYW5kbGVfeCA9IHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHkpIHtcbiAgICAgICAgaWYgKHkgIT09IHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSkge1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKG5leHRYLCBuZXh0WSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUhlYWRlcihuZXh0WCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlQm9keShuZXh0WCwgbmV4dFkpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVhTY3JvbGxIYW5kbGUodGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuICAgIH1cblxuICAgIHNjcm9sbFVwKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBzdGFydCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCAwKSB3ZSB0cnVuY2F0ZSB1cHdhcmQgc2Nyb2xsIGF0dGVtcHRzXG4gICAgICAgICAgIHRvIHRoZSB1cHBlciB0cmFuc2xhdGlvbiBib3VuZGFyeSB0byBrZWVwIGZyb20gc2tpcHBpbmcgb2ZmIGludG8gbm90aGluZ25lc3MgKi9cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgJiYgdGhpcy5uZXh0X3kgPiB0aGlzLnlfbWluKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9taW47XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvd19zdGFydF9pbmRleCA9PT0gMCB8fCB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWluKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCBib3R0b20gcG9zaXRpb24gdG8gdGhlIHRvcFxuICAgICAgICAgICAoYWJvdmUgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubmV4dF95IC0gdGhpcy55X21pbikgLyB0aGlzLmNlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIC8qIHByZXZlbnQgdW5kZXItcm90YXRpbmcgYmVsb3cgaW5kZXggemVybywgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgYSBkYXRhIHNldCAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggLSB0aGlzLm5fcm93c190b19zaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95IC09IE1hdGguYWJzKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQpICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGRlY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgIHRoaXMub3JkZXJlZF95X2FycmF5X2luZGV4ID0gdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W3RoaXMub3JkZXJlZF95X2FycmF5X2luZGV4XVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5kYXRhID0gdGhpcy5kcmFnX3RpbWVyID8gbnVsbCA6IHRoaXMuYy5nZXRSb3codGhpcy50YXJnZXRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnNldEluZGV4ID0gdGhpcy50YXJnZXRfaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIueSA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXS55IC0gdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kudW5zaGlmdCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnBvcCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbERvd24oKSB7XG4gICAgICAgIC8qIGF0IHRoZSBsb2dpY2FsIGVuZCBvZiB0aGUgdGFibGUgKHJvdyBpbmRleCBuKSB3ZSB0cnVuY2F0ZSBhbnkgc2Nyb2xsIGF0dGVtcHRzICAqL1xuICAgICAgICBpZiAodGhpcy5yb3dfZW5kX2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MgLSAxICYmIHRoaXMubmV4dF95IDw9IHRoaXMueV9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55X21heDtcblxuICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMueF9zY3JvbGxfdHJhY2tfaDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPj0gdGhpcy55X21heCkgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSByb3cgaW4gdGhlIHZpc3VhbCB0b3AgcG9zaXRpb24gdG8gdGhlIGJvdHRvbVxuICAgICAgICAgICAoYmVsb3cgdGhlIGxpcCBvZiB0aGUgdmlldykgKi9cblxuICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9tYXgpIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCArIHRoaXMucm93X2VuZF9pbmRleCArIDEgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIHRoYW4gdGhlcmUgaXMgZGF0YSBhdmFpbGFibGUsIHRydW5jYXRlICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSArPSAoXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtICh0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9PT0gMCA/IDAgOiAxKSlcbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLmFwcGx5RGVsdGEoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9tYXgsIHRoaXMueSkgJSB0aGlzLmNlbGxfaCwgdGhpcy5uZXh0X3lcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMucm93X2VuZF9pbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgPiB0aGlzLm5fcm93c19yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIC8qIHdoZW4gdGhlIHRvdGFsIG1vdmVtZW50IGVuZHMgdXAgYmVpbmcgbGFyZ2VyIHRoYW4gdGhlIHNldCBvZiByb3dzIGFscmVhZHkgcmVuZGVyZWQsIHdlIGNhbiBzYWZlbHkgaW5jcmVtZW50IHRoZSBcInZpZXdhYmxlXCIgcm93IHJhbmdlIGFjY29yZGluZ2x5IGFuZCB0aGUgbmV4dCBzdGVwIHdoZXJlIHRoZSBjb250ZW50IGlzIHN1YnN0aXR1dGVkIHdpbGwgYXV0b21hdGljYWxseSBpbnNlcnQgdGhlIG5leHQgbG9naWNhbCByb3cgaW50byBpdHMgcGxhY2UgKi9cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSB0aGlzLm5fcm93c190b19zaGlmdCAtIHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5zaGlmdF9kZWx0YTtcblxuICAgICAgICAgICAgICAgIC8qIGFjY29tb2RhdGUgZm9yIHRoZSBudW1iZXIgb2YgcGl4ZWxzIHRoYXQgd2lsbCBub3QgYmUgcmVuZGVyZWQgKi9cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSArPSB0aGlzLnNoaWZ0X2RlbHRhICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMubl9yb3dzX3JlbmRlcmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHRoaXMuaXRlcmF0b3IgPSAxOyB0aGlzLml0ZXJhdG9yIDw9IHRoaXMubl9yb3dzX3RvX3NoaWZ0OyB0aGlzLml0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IHRoaXMucm93X2VuZF9pbmRleCArIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAvKiB0aGUgcGFkZGluZyByb3dzIHdpbGwgZXhjZWVkIHRoZSBtYXhpbXVtIGluZGV4IGZvciBhIGRhdGEgc2V0IG9uY2UgdGhlIHVzZXIgaGFzIGZ1bGx5IHRyYW5zbGF0ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0X2luZGV4ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKHRoaXMucm93c19vcmRlcmVkX2J5X3kuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgbG93ZXN0IFktdmFsdWUgcm93cyB0byB0aGUgYm90dG9tIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbMF1dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCAtIDFdXS55ICsgdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuYWN0aXZlID0gdGhpcy50YXJnZXRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdztcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcbiAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCArPSB0aGlzLm5fcm93c190b19zaGlmdDtcblxuICAgICAgICAgICAgdGhpcy55X21pbiAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy55X21heCAtPSB0aGlzLm5fcm93c190b19zaGlmdCAqIHRoaXMuY2VsbF9oO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlEZWx0YShkZWx0YSwgbnVtKSB7XG4gICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gPCAwID8gbnVtIC0gZGVsdGEgOiBudW0gKyBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW0gLSBkZWx0YTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVWaXNpYmxlVG9wUm93SW5kZXgodGFyZ2V0WSA9IHRoaXMubmV4dF95KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NbXG4gICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95W1xuICAgICAgICAgICAgICAgIE1hdGguY2VpbChNYXRoLmFicyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKHRoaXMueV9taW4sIHRhcmdldFkpIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgXVxuICAgICAgICBdLnNldEluZGV4O1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFYID09PSAwICAgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAodGhpcy54X3Njcm9sbF9sb2NrZWQgJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGVsdGFfeCA9IGV2ZW50LmRlbHRhWDtcblxuICAgICAgICAvLyBkZWx0YU1vZGUgMCA9PT0gcGl4ZWxzLCAxID09PSBsaW5lc1xuICAgICAgICB0aGlzLmRlbHRhX3kgPSAgIGV2ZW50LmRlbHRhTW9kZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5jZWxsX2hcbiAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnggOiB0aGlzLnggLSB0aGlzLmRlbHRhX3g7XG4gICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy54X3Njcm9sbF9sb2NrZWQgPyB0aGlzLnkgOiB0aGlzLnkgLSB0aGlzLmRlbHRhX3k7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF94ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF94IDwgdGhpcy54X21heCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3ggPSB0aGlzLnhfbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3Zpc2libGUgPj0gdGhpcy5jLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbmVnYXRlIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCwgbm90IGVub3VnaCByb3dzIHRvIGZpbGwgdGhlIGJvZHkgKi9cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy55O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95IDwgdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA+IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlc2V0X3RpbWVyKTsgfVxuXG4gICAgICAgIC8qIHJlc2V0IHJvdyAmIHdyYXBwZXIgWSB2YWx1ZXMgdG93YXJkIDAgdG8gcHJldmVudCBvdmVyZmxvd2luZyAqL1xuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gcmVzZXRZQXhpcyhpbnN0YW5jZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfdGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNldF9kZWx0YSA9IGluc3RhbmNlLnlfbWluO1xuXG4gICAgICAgICAgICAvKiBzaGlmdCBhbGwgdGhlIHBvc2l0aW9uaW5nIHZhcmlhYmxlcyAqL1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9taW4gPSBpbnN0YW5jZS5hcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21pbik7XG4gICAgICAgICAgICBpbnN0YW5jZS55X21heCA9IGluc3RhbmNlLmFwcGx5RGVsdGEoaW5zdGFuY2UucmVzZXRfZGVsdGEsIGluc3RhbmNlLnlfbWF4KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSByb3dzICovXG4gICAgICAgICAgICBpbnN0YW5jZS5yb3dzX29yZGVyZWRfYnlfeS5mb3JFYWNoKChwb3NpdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5yb3dzW3Bvc2l0aW9uXS55ID0gaW5kZXggKiBpbnN0YW5jZS5jZWxsX2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogc2hpZnQgdGhlIHdyYXBwZXIgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnRyYW5zbGF0ZUJvZHkoaW5zdGFuY2UueCwgaW5zdGFuY2UueSk7XG5cbiAgICAgICAgfSwgMTAwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IHRoaXMuY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KCk7XG5cbiAgICAgICAgLyogcXVldWUgdXAgdHJhbnNsYXRpb25zIGFuZCB0aGUgYnJvd3NlciB3aWxsIGV4ZWN1dGUgdGhlbSBhcyBhYmxlLCBuZWVkIHRvIHBhc3MgaW4gdGhlIHZhbHVlcyB0aGF0IHdpbGwgY2hhbmdlIGR1ZSB0byBtb3JlIGhhbmRsZU1vdmVJbnRlbnQgaW52b2NhdGlvbnMgYmVmb3JlIHRoaXMgckFGIGV2ZW50dWFsbHkgZXhlY3V0ZXMuICovXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gckFGKG5leHRYLCBjdXJyWCwgbmV4dFksIHZpc2libGVUb3BSb3dJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArPSAoKG5leHRYIC0gY3VyclgpIC8gdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvKSAqIC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uICsgdGhpcy54X3Njcm9sbF9oYW5kbGVfc2l6ZSA+IHRoaXMueF9zY3JvbGxfdHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHZpc2libGVUb3BSb3dJbmRleCAqIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW87XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnlfc2Nyb2xsX3RyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLm5leHRfeCwgdGhpcy54LCB0aGlzLm5leHRfeSwgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXgpKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLm5leHRfeDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5uZXh0X3k7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogd2UgaGFuZGxlIHRvdWNobW92ZSBieSBkZXRlY3RpbmcgdGhlIGRlbHRhIG9mIHBhZ2VYL1kgYW5kIGZvcndhcmRpbmdcbiAgICAgICAgaXQgdG8gaGFuZGxlTW92ZUludGVudCgpICovXG5cbiAgICAgICAgdGhpcy50b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVggLSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgLSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWCA9IHRoaXMudG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMubGFzdF90b3VjaF9wYWdlWSA9IHRoaXMudG91Y2gucGFnZVk7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSAwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdF95X3Njcm9sbF9oYW5kbGVfeSwgZXZlbnQucGFnZVkgLSB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wXG4gICAgICAgICAgICApIC8gdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpb1xuICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxhc3RfcGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLyogYWRqdXN0cyBmb3IgdGhlIHBpeGVsIGRpc3RhbmNlIGJldHdlZW4gd2hlcmUgdGhlIGhhbmRsZSBpcyBjbGlja2VkIGFuZCB0aGUgdG9wIGVkZ2Ugb2YgaXQ7IHRoZSBoYW5kbGUgaXMgcG9zaXRpb25lZCBhY2NvcmRpbmcgdG8gaXRzIHRvcCBlZGdlICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxfb2Zmc2V0ID0gZXZlbnQub2Zmc2V0WTtcblxuICAgICAgICB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubGVmdF9idXR0b25fcHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9sb2NrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdfdGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdfdGltZXIpOyB9XG5cbiAgICAgICAgICAgIC8qIHgtYXhpcyBkb2Vzbid0IG5lZWQgdGhyb3R0bGUgcHJvdGVjdGlvbiBzaW5jZSBpdCBkb2Vzbid0IGNhdXNlIGEgcm93IGZldGNoICovXG4gICAgICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEgPSB0aGlzLmMuZ2V0Um93KHJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuYy50aHJvdHRsZUludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcCAtIHRoaXMueV9zY3JvbGxfb2Zmc2V0XG4gICAgICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgICAgICkgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfcGFnZVgpICogdGhpcy54X3RhYmxlX3BpeGVsX3JhdGlvO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuZXZ0KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbHVtbl9pc19yZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQucGFnZVggLSB0aGlzLmxhc3RfY29sdW1uX3gpO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubG9ja0RyYWdUb1Njcm9sbCgpIHtcbiAgICAgICAgdGhpcy54X3Njcm9sbF9sb2NrZWQgPSB0aGlzLnlfc2Nyb2xsX2xvY2tlZCA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMubGVmdF9idXR0b25fcHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qIHRoZSBicm93c2VyIGZpcmVzIHRoZSBtb3VzZXVwIGFuZCBjbGljayBldmVudHMgc2ltdWx0YW5lb3VzbHksIGFuZCB3ZSBkb24ndCB3YW50IG91ciBjbGljayBoYW5kbGVyIHRvIGJlIGV4ZWN1dGVkLCBzbyBhIHplcm8tZGVsYXkgc2V0VGltZW91dCB3b3JrcyBoZXJlIHRvIGxldCB0aGUgc3RhY2sgY2xlYXIgYmVmb3JlIGFsbG93aW5nIGNsaWNrIGV2ZW50cyBhZ2Fpbi4gKi9cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51bmxvY2tEcmFnVG9TY3JvbGwoKSwgMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RfY29sdW1uX3ggPSBldmVudC5wYWdlWDtcblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcgPSBmaW5kV2hlcmUodGhpcy5jb2x1bW5zLCAnbWFwcGluZycsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgd2lkdGgpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nKTtcbiAgICAgICAgbGV0IGFkanVzdGVkX2RlbHRhID0gZGVsdGE7XG5cbiAgICAgICAgaWYgKCAgIGFkanVzdGVkX2RlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA8IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRfZGVsdGEgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCAtIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5tYXhXaWR0aClcbiAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aCArIGFkanVzdGVkX2RlbHRhID4gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlOZXdDb2x1bW5XaWR0aChpbmRleCwgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWRfZGVsdGEgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBhZGp1c3RlZF9kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5BdXRvRXhwYW5kKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoY29sdW1uSW5kZXgsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVJvdyhzZXRJbmRleCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSBzZXRJbmRleDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF9hY3RpdmVfcm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyh0aGlzLm5leHRfYWN0aXZlX3Jvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMubmV4dF9hY3RpdmVfcm93LmRhdGFbdGhpcy5jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xID4gdGhpcy55KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPCB0aGlzLnkgLSB0aGlzLmJvZHlfaCArIHRoaXMuY2VsbF9oKVxuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMuY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5hY3RpdmVfcm93IDwgdGhpcy5jLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93biBpbiB0aGUgdmlld3BvcnQuICovXG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPiB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPCB0aGlzLmFjdGl2ZV9yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYWN0aXZlX3JvdyAtIHRoaXMucm93X3N0YXJ0X2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgZGVsdGEpICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5IHx8IHRoaXMuZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZV9yb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ3NldEluZGV4JywgdGhpcy5hY3RpdmVfcm93KS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgY29uc3Qgbm9kZU1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyb3c6IG5vZGV9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCghbm9kZU1hcC5jZWxsIHx8ICFub2RlTWFwLnJvdykgJiYgbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKGNlbGxDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAuY2VsbCA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5yb3cgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVNYXA7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnbm9kZScsIG1hcC5yb3cpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhyb3cuc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobWFwLmNlbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVZpZXc7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgYWRkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0IHsuLi5kZXNjZW5kYW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRva2VuaXplZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgdG9rZW5zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJVG9rZW5pemVkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgdG9rZW5zOiBbXSxcbiAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRva2VuaXplZElucHV0O1xuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRvb2x0aXAucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICBBRlRFUjogJ0FGVEVSJyxcbn07XG5cblVJVG9vbHRpcC5wcm9wVHlwZXMgPSB7XG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUb29sdGlwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb29sdGlwO1xuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmlucHV0O1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMucmVmcy5pbnB1dC52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX2ZvY3VzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX2ZvY3VzSW5wdXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBgZm9jdXNJbnB1dCgpYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4gUGxlYXNlIHVzZSBVSVR5cGVhaGVhZElucHV0LmZvY3VzKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJJbnB1dDogbmV3VmFsdWUgfSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX3NldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9zZXRWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IGBzZXRWYWx1ZSh0ZXh0KWAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuIFBsZWFzZSB1c2UgVUlUeXBlYWhlYWRJbnB1dC52YWx1ZSh0ZXh0KSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXJrRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWFya0Z1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMSA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hdGNoRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWF0Y2hGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcklucHV0OiBldmVudC50YXJnZXQudmFsdWV9LCAoKSA9PiB0aGlzLmNvbXB1dGVNYXRjaGVzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbnRpdHkuY2xhc3NOYW1lXTogISFlbnRpdHkuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudGl0eS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUudXNlcklucHV0LCBlbnRpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgdHlwZT17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0Lm1vZGUgPSB7XG4gICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAnRlVaWlknOiAnRlVaWlknLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgYWxnb3JpdGhtOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgXSksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9KSxcbiAgICBdKSxcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Db21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlIaWdobGlnaHRlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVHlwZWFoZWFkSW5wdXQ7XG4iLCIvKipcbiAqIFNlYXJjaGVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYW4gYXJyYXkgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvZmluZFdoZXJlXG4gKi9cblxubGV0IF9maW5kV2hlcmVJbmRleCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtICB7QXJyYXlbT2JqZWN0XX0gYXJyYXkgICAgIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIHByb3BlcnR5ICB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgdmFsdWUgICAgIHRoZSB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0ICh1c2VzIHN0cmljdCBlcXVhbGl0eSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfSBUaGUgbWF0Y2hlZCBhcnJheSBpdGVtLCBvciBub3RoaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIF9maW5kV2hlcmVJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoX2ZpbmRXaGVyZUluZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5W19maW5kV2hlcmVJbmRleF1bcHJvcGVydHldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W19maW5kV2hlcmVJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBfZmluZFdoZXJlSW5kZXggLT0gMTtcbiAgICB9XG59IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5pY29uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcub25DbGljayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL3RyYW5zZm9ybVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJVmlldztcbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuZ2xvYmFsLlVJS2l0LlVJVXRpbHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlBcnJvd0tleU5hdmlnYXRpb246IChnbG9iYWwuVUlLaXQuVUlBcnJvd0tleU5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJykuZGVmYXVsdCksXG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQYWdpbmF0ZWRWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJUGFnaW5hdGVkVmlldyA9IHJlcXVpcmUoJy4vVUlQYWdpbmF0ZWRWaWV3JykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlVdGlsczoge1xuICAgICAgICBub3RpZnk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5ub3RpZnkgPSByZXF1aXJlKCcuL1VJVXRpbHMvbm90aWZ5JykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iXX0=
