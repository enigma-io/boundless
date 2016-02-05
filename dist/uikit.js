(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        var _Object$getPrototypeO;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UIArrowKeyNavigation)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        return _this;
    }

    _createClass(UIArrowKeyNavigation, [{
        key: 'initialState',
        value: function initialState() {
            return {
                activeChildIndex: null
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.activeChildIndex !== null) {
                var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

                if (numChildren === 0) {
                    this.setState(this.initialState()); // eslint-disable-line react/no-did-update-set-state
                } else if (this.state.activeChildIndex >= numChildren) {
                        this.setFocus(numChildren - 1);
                    }
            }
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : (0, _reactDom.findDOMNode)(this.refs.wrapper)).children[index].focus();
        }
    }, {
        key: 'moveFocus',
        value: function moveFocus(delta) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            var nextIndex = this.state.activeChildIndex + delta;

            if (nextIndex >= numChildren) {
                nextIndex = 0; // loop
            } else if (nextIndex < 0) {
                    nextIndex = numChildren - 1; // reverse loop
                }

            this.setFocus(nextIndex);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
        }
    }, {
        key: 'handleChildBlur',
        value: function handleChildBlur(index) {
            if (this.state.activeChildIndex === index) {
                this.setState({ activeChildIndex: null });
            }
        }
    }, {
        key: 'handleChildFocus',
        value: function handleChildFocus(index) {
            this.setState({ activeChildIndex: index });
        }
    }, {
        key: 'children',
        value: function children() {
            var _this2 = this;

            return this.props.children && Array.prototype.concat(this.props.children).map(function (child, index) {
                return _react2.default.cloneElement(child, {
                    key: child.key || index,
                    tabIndex: child.tabIndex || 0,
                    onBlur: _this2.handleChildBlur.bind(_this2, index),
                    onFocus: _this2.handleChildFocus.bind(_this2, index)
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(this.props.component, _extends({}, this.props, {
                ref: 'wrapper',
                onKeyDown: this.handleKeyDown
            }), this.children());
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIButton = function (_UIView) {
    _inherits(UIButton, _UIView);

    function UIButton() {
        _classCallCheck(this, UIButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIButton).apply(this, arguments));
    }

    _createClass(UIButton, [{
        key: 'toggleState',
        value: function toggleState() {
            if (typeof this.props.pressed !== 'undefined') {
                this.props[this.props.pressed ? 'onUnpressed' : 'onPressed']();
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.toggleState();
            this.props.onClick();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    this.toggleState();

                    if (typeof this.props.pressed === 'undefined') {
                        this.props.onClick();
                    }
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                _extends({}, this.props, {
                    ref: 'button',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-button': true,
                        'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                        'ui-button-pressed': this.props.pressed
                    }, this.props.className, !!this.props.className)),
                    'aria-pressed': this.props.pressed,
                    onKeyDown: this.handleKeyDown.bind(this),
                    onClick: this.handleClick.bind(this) }),
                this.props.children
            );
        }
    }]);

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
    onClick: _noop2.default,
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};

exports.default = UIButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"22":22,"26":26,"28":28}],3:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UICheckbox).apply(this, arguments));
    }

    _createClass(UICheckbox, [{
        key: 'initialState',
        value: function initialState() {
            return {
                id: this.props.inputProps.id || this.uuid()
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.indeterminate !== this.props.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'setIndeterminate',
        value: function setIndeterminate() {
            this.refs.input.indeterminate = !!this.props.indeterminate;
        }
    }, {
        key: 'ariaState',
        value: function ariaState() {
            return this.props.indeterminate ? 'mixed' : String(this.props.checked);
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            // Send the opposite signal from what was passed to toggle the data
            this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            this.refs.input.focus();

            if (typeof this.props.handleClick === 'function') {
                event.persist();
                this.props.handleClick(event);
            }
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                type: 'checkbox',
                id: this.state.id,
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.indeterminate,
                    'ui-checkbox-checked': this.props.checked,
                    'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked
                }, this.props.inputProps.className, !!this.props.inputProps.className)),
                name: this.props.name,
                checked: this.props.checked,
                'aria-checked': this.ariaState(),
                onChange: this.handleChange.bind(this),
                onClick: this.handleClick.bind(this),
                value: this.props.value }));
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2.default.createElement(
                    'label',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-checkbox-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)),
                        htmlFor: this.state.id }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UICheckboxGroup).apply(this, arguments));
    }

    _createClass(UICheckboxGroup, [{
        key: 'allItemsChecked',
        value: function allItemsChecked() {
            return this.props.items.every(function (item) {
                return item.checked === true;
            });
        }
    }, {
        key: 'anyItemsChecked',
        value: function anyItemsChecked() {
            return this.props.items.some(function (item) {
                return item.checked === true;
            });
        }
    }, {
        key: 'renderSelectAll',
        value: function renderSelectAll() {
            if (this.props.selectAll) {
                var allChecked = this.allItemsChecked();

                return _react2.default.createElement(_UICheckbox2.default, _extends({}, this.props.selectAllProps, {
                    ref: 'select_all',
                    name: 'cb_select_all',
                    key: 'cb_select_all',
                    checked: allChecked,
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-group-selectall': true
                    }, this.props.selectAllProps.className, !!this.props.selectAllProps.className)),
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    label: this.props.selectAllLabel,
                    onChecked: this.props.onAllChecked,
                    onUnchecked: this.props.onAllUnchecked }));
            }
        }
    }, {
        key: 'renderCheckboxes',
        value: function renderCheckboxes() {
            var _this2 = this;

            return this.props.items.map(function (item) {
                return _react2.default.createElement(_UICheckbox2.default, _extends({}, item, {
                    ref: 'cb_item.name',
                    key: item.name,
                    onChecked: _this2.props.onChildChecked,
                    onUnchecked: _this2.props.onChildUnchecked }));
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
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
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'group',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-checkbox-group': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderChildren()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIDialog).apply(this, arguments));
    }

    _createClass(UIDialog, [{
        key: 'initialState',
        value: function initialState() {
            return {
                headerUUID: this.uuid(),
                bodyUUID: this.uuid()
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
                this.refs.dialog.focus();
            }

            this.handleFocus = this.handleFocus.bind(this);
            this.handleOutsideClick = this.handleOutsideClick.bind(this);

            window.addEventListener('focus', this.handleFocus, true);
            window.addEventListener('click', this.handleOutsideClick, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.handleOutsideClick, true);
            window.removeEventListener('focus', this.handleFocus, true);
        }
    }, {
        key: 'isPartOfDialog',
        value: function isPartOfDialog(node) {
            return node && this.refs.dialog.contains(node.nodeType === 3 ? node.parentNode : node);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(nativeEvent) {
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
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            if (this.props.closeOnEscKey && event.key === 'Escape') {
                this.props.onClose();
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleOutsideClick',
        value: function handleOutsideClick(nativeEvent) {
            if (this.props.closeOnOutsideClick && !this.isPartOfDialog(nativeEvent.target)) {
                this.props.onClose();
            }
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            if (this.props.body) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.bodyProps, {
                        ref: 'body',
                        id: this.state.bodyUUID,
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-dialog-body': true
                        }, this.props.bodyProps.className, !!this.props.bodyProps.className)) }),
                    this.props.body
                );
            }
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            if (this.props.footer) {
                return _react2.default.createElement(
                    'footer',
                    _extends({}, this.props.footerProps, {
                        ref: 'footer',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-dialog-footer': true
                        }, this.props.footerProps.className, !!this.props.footerProps.className)) }),
                    this.props.footer
                );
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (this.props.header) {
                return _react2.default.createElement(
                    'header',
                    _extends({}, this.props.headerProps, {
                        ref: 'header',
                        id: this.state.headerUUID,
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-dialog-header': true
                        }, this.props.headerProps.className, !!this.props.headerProps.className)) }),
                    this.props.header
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'dialog',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-dialog': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown.bind(this),
                    role: 'dialog',
                    'aria-labelledby': this.state.headerUUID,
                    'aria-describedby': this.state.bodyUUID,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.props.children || this.renderBody(),
                this.renderFooter()
            );
        }
    }]);

    return UIDialog;
}(_UIView3.default);

UIDialog.propTypes = {
    body: _react2.default.PropTypes.node,
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIFittedText).apply(this, arguments));
    }

    _createClass(UIFittedText, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.rescale = this.rescale.bind(this);
            this.rescale();

            window.addEventListener('resize', this.rescale, true);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.rescale();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.rescale, true);
        }
    }, {
        key: 'rescale',
        value: function rescale() {
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
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                _extends({}, this.props, {
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-text': true
                    }, this.props.className, !!this.props.className)) }),
                this.props.children
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIImage).apply(this, arguments));
    }

    _createClass(UIImage, [{
        key: 'initialState',
        value: function initialState() {
            return {
                status: UIImage.status.LOADING
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.src !== this.props.src) {
                this.resetPreloader();
                this.setState({ status: UIImage.status.LOADING });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.preload();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.preload();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.resetPreloader();
        }
    }, {
        key: 'resetPreloader',
        value: function resetPreloader() {
            this.loader.onload = null;
            this.loader.onerror = null;
            this.loader = null;
        }
    }, {
        key: 'preload',
        value: function preload() {
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
        }
    }, {
        key: 'renderImage',
        value: function renderImage() {
            if (this.props.displayAsBackgroundImage) {
                return _react2.default.createElement('div', _extends({}, this.props.imageProps, {
                    ref: 'image',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-image': true
                    }, this.props.imageProps.className, !!this.props.imageProps.className)),
                    title: this.props.alt,
                    style: _extends({}, this.props.imageProps.style, {
                        backgroundImage: 'url(' + this.props.src + ')'
                    }) }));
            }

            return _react2.default.createElement('img', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-image': true
                }, this.props.imageProps.className, !!this.props.imageProps.className)),
                src: this.props.src,
                alt: this.props.alt,
                onLoad: _noop2.default,
                onError: _noop2.default }));
        }
    }, {
        key: 'renderStatus',
        value: function renderStatus() {
            return _react2.default.createElement('div', _extends({}, this.props.statusProps, {
                ref: 'status',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR
                }, this.props.statusProps.className, !!this.props.statusProps.className)),
                role: 'presentation' }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    alt: null,
                    src: null,
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-image-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderImage(),
                this.renderStatus()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require(5);

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIModal).apply(this, arguments));
    }

    _createClass(UIModal, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var dialogSpecificProps = Object.keys(_UIDialog2.default.propTypes).reduce(function (props, key) {
                props[key] = _this2.props[key];

                return props;
            }, {});

            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-modal-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                _react2.default.createElement('div', _extends({}, this.props.maskProps, {
                    ref: 'mask',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-modal-mask': true
                    }, this.props.maskProps.className, !!this.props.maskProps.className)) })),
                _react2.default.createElement(_UIDialog2.default, _extends({}, dialogSpecificProps, this.props.modalProps, {
                    ref: 'dialog',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-modal': true
                    }, this.props.modalProps.className, !!this.props.modalProps.className)) }))
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIPaginatedView).apply(this, arguments));
    }

    _createClass(UIPaginatedView, [{
        key: 'initialState',
        value: function initialState() {
            return {
                currentPage: this.props.pagerPosition,
                numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
                numItemsPerPage: this.props.numItemsPerPage,
                numPageToggles: this.props.numPageToggles,
                totalItems: this.props.totalItems,
                items: [{ data: this.props.getItem(0) }],
                shownItems: [{ data: this.props.getItem(0) }]
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(oldProps, oldState) {
            if (oldState.currentPage !== this.state.currentPage) {
                (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ shownItems: this.generateItems(this.state.currentPage) });
        }
    }, {
        key: 'createPageButtonOptions',
        value: function createPageButtonOptions() {
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
        }
    }, {
        key: 'currentPage',
        value: function currentPage() {
            return this.state.currentPage;
        }
    }, {
        key: 'generateItems',
        value: function generateItems(currentPage) {
            var generatedItems = [];
            var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
            var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

            for (var i = firstItemIndex; i <= lastItemIndex; i++) {
                generatedItems.push({ data: this.props.getItem(i) });
            }

            return generatedItems;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(value) {
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
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            return _react2.default.createElement(
                _UIArrowKeyNavigation2.default,
                _extends({}, this.props.listWrapperProps, {
                    ref: 'itemList',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-paginated-view-item-list': true
                    }, this.props.listWrapperProps.className, !!this.props.listWrapperProps.className)) }),
                this.state.shownItems.map(function (item, index) {
                    return _react2.default.createElement(_item2.default, { ref: 'item_' + index,
                        key: index,
                        data: item.data,
                        even: index % 2 === 0 });
                })
            );
        }
    }, {
        key: 'renderControls',
        value: function renderControls(position) {
            var _cx2;

            var positionLowerCase = position.toLowerCase();

            return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, this.props.toggleWrapperProps, {
                ref: 'segmentedControl' + (positionLowerCase[0].toUpperCase() + positionLowerCase.slice(1)),
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-paginated-view-controls': true
                }, _defineProperty(_cx2, 'ui-paginated-view-controls-' + positionLowerCase, true), _defineProperty(_cx2, this.props.toggleWrapperProps.className, !!this.props.toggleWrapperProps.className), _cx2)),
                options: this.createPageButtonOptions(),
                onOptionSelected: this.handleClick.bind(this) }));
        }
    }, {
        key: 'renderView',
        value: function renderView() {
            return _react2.default.createElement(
                'div',
                {
                    ref: 'paginatedView',
                    className: 'ui-paginated-view' },
                this.props.position === UIPaginatedView.position.ABOVE || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.ABOVE) : _noop2.default,
                this.renderItems(),
                this.props.position === UIPaginatedView.position.BELOW || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.BELOW) : _noop2.default
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-paginated-view-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderView()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIPaginatedViewItem).apply(this, arguments));
    }

    _createClass(UIPaginatedViewItem, [{
        key: 'initialState',
        value: function initialState() {
            return {
                data: this.props.data
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.data !== this.props.data) {
                this.setState({ data: nextProps.data });
            }
        }
    }, {
        key: 'waitForContentIfNecessary',
        value: function waitForContentIfNecessary() {
            if (this.state.data instanceof Promise) {
                this.state.data.then(function cautiouslySetItemData(promise, value) {
                    if (this.state.data === promise) {
                        this.setState({ data: value });
                    } // only replace if we're looking at the same promise, otherwise do nothing
                }.bind(this, this.state.data));
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.waitForContentIfNecessary();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.waitForContentIfNecessary();
        }
    }, {
        key: 'getClasses',
        value: function getClasses(extraClasses) {
            return (0, _classnames2.default)({
                'ui-paginated-view-item': true,
                'ui-paginated-view-item-even': this.props.even,
                'ui-paginated-view-item-odd': !this.props.even,
                'ui-paginated-view-item-loading': this.state.data instanceof Promise
            }) + (extraClasses ? ' ' + extraClasses : '');
        }
    }, {
        key: 'cloneWithClasses',
        value: function cloneWithClasses(element) {
            if (element instanceof Promise) {
                return _react2.default.createElement('div', _extends({}, this.props, { className: this.getClasses() }));
            }

            return _react2.default.cloneElement(element, _extends({}, this.props, { className: this.getClasses(this.state.data.props.className) }));
        }
    }, {
        key: 'render',
        value: function render() {
            return this.cloneWithClasses(this.state.data);
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIPopover).apply(this, arguments));
    }

    _createClass(UIPopover, [{
        key: 'initialState',
        value: function initialState() {
            return {
                anchorXAlign: this.props.anchorXAlign,
                anchorYAlign: this.props.anchorYAlign,
                selfXAlign: this.props.selfXAlign,
                selfYAlign: this.props.selfYAlign
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.body.appendChild(this.container = document.createElement('div'));

            // this is bad, don't do this anywhere else :-x.
            this.refs = {};
            this.refs.dialog = this.renderDialog();
            this.node = _reactDom2.default.findDOMNode(this.refs.dialog);

            this.align = this.align.bind(this);
            this.align();

            window.addEventListener('resize', this.align, true);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderDialog();
            this.align();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _reactDom2.default.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);

            window.removeEventListener('resize', this.align, true);
        }
    }, {
        key: 'getNextXPosition',
        value: function getNextXPosition(anchor, dialog) {
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
        }
    }, {
        key: 'getNextYPosition',
        value: function getNextYPosition(anchor, dialog) {
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
        }
    }, {
        key: 'getAlignmentCorrectionIfOverflowing',
        value: function getAlignmentCorrectionIfOverflowing(node, x, y) {
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
        }
    }, {
        key: 'applyTranslation',
        value: function applyTranslation(node, x, y) {
            if (_transform2.default) {
                node.style[_transform2.default] = 'translate(' + x + 'px, ' + y + 'px)';
            } else {
                node.style.left = x + 'px';
                node.style.top = y + 'px';
            }
        }
    }, {
        key: 'align',
        value: function align() {
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
        }
    }, {
        key: 'getClassAlignmentFragment',
        value: function getClassAlignmentFragment(constant) {
            var position = UIPopover.position;

            switch (constant) {
                case position.START:
                    return 'start';

                case position.MIDDLE:
                    return 'middle';

                case position.END:
                    return 'end';
            }
        }
    }, {
        key: 'renderDialog',
        value: function renderDialog() {
            var _cx;

            var state = this.state;
            var getFrag = this.getClassAlignmentFragment;

            return _reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, this.props, {
                captureFocus: false,
                className: (0, _classnames2.default)((_cx = {
                    'ui-popover': true
                }, _defineProperty(_cx, 'ui-popover-anchor-x-' + getFrag(state.anchorXAlign), true), _defineProperty(_cx, 'ui-popover-anchor-y-' + getFrag(state.anchorYAlign), true), _defineProperty(_cx, 'ui-popover-self-x-' + getFrag(state.selfXAlign), true), _defineProperty(_cx, 'ui-popover-self-y-' + getFrag(state.selfYAlign), true), _defineProperty(_cx, this.props.className, !!this.props.className), _cx)),
                style: _extends({}, this.props.style, {
                    position: 'absolute',
                    top: '0px',
                    left: '0px'
                }) })), this.container);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIButton = require(2);

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIProgress).apply(this, arguments));
    }

    _createClass(UIProgress, [{
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-progress-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)) }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'renderCancel',
        value: function renderCancel() {
            if (this.props.onCancel) {
                return _react2.default.createElement(_UIButton2.default, _extends({}, this.props.cancelProps, {
                    ref: 'cancel',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-progress-cancel': true
                    }, this.props.cancelProps.className, !!this.props.cancelProps.className)),
                    onClick: this.props.onCancel }));
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            return _react2.default.createElement('div', _extends({}, this.props.progressProps, {
                ref: 'progress',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
                }, this.props.progressProps.className, !!this.props.progressProps.className)),
                role: 'presentation',
                style: _extends({}, this.props.progressProps.style, _defineProperty({}, this.props.tweenProperty, this.props.progress)) }));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    label: null,
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-progress-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderProgress(),
                this.renderLabel(),
                this.renderCancel()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIProgressiveDisclosure).apply(this, arguments));
    }

    _createClass(UIProgressiveDisclosure, [{
        key: 'initialState',
        value: function initialState() {
            return {
                expanded: this.props.expanded
            };
        }
    }, {
        key: 'dispatchCallback',
        value: function dispatchCallback() {
            this.props[this.state.expanded ? 'onExpand' : 'onHide']();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this2 = this;

            if (newProps.expanded !== this.props.expanded) {
                this.setState({ expanded: newProps.expanded }, function () {
                    return _this2.dispatchCallback();
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var _this3 = this;

            this.setState({ expanded: !this.state.expanded }, function () {
                return _this3.dispatchCallback();
            });

            /* istanbul ignore else */
            if (typeof this.props.toggleProps.onClick === 'function') {
                event.persist();
                this.props.toggleProps.onClick(event);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-disclosure': true,
                        'ui-disclosure-expanded': this.state.expanded
                    }, this.props.className, !!this.props.className)) }),
                _react2.default.createElement(
                    'div',
                    _extends({}, this.props.toggleProps, {
                        ref: 'toggle',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-disclosure-toggle': true
                        }, this.props.toggleProps.className, !!this.props.toggleProps.className)),
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
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIRadio).apply(this, arguments));
    }

    _createClass(UIRadio, [{
        key: 'initialState',
        value: function initialState() {
            return {
                id: this.props.inputProps.id || this.uuid()
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            if (event.target.checked) {
                this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if (typeof this.props.inputProps.onChange === 'function') {
                event.persist();
                this.props.inputProps.onChange(event);
            }
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            return _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                type: 'radio',
                id: this.state.id,
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-radio': true,
                    'ui-radio-selected': this.props.selected
                }, this.props.inputProps.className, !!this.props.inputProps.className)),
                name: this.props.name,
                value: this.props.value,
                checked: this.props.selected,
                'aria-checked': String(this.props.selected),
                onChange: this.handleChange.bind(this) }));
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2.default.createElement(
                    'label',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-radio-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)),
                        htmlFor: this.state.id }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-radio-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UISegmentedControl).apply(this, arguments));
    }

    _createClass(UISegmentedControl, [{
        key: 'initialState',
        value: function initialState() {
            return {
                indexOfOptionInFocus: null
            };
        }
    }, {
        key: 'currentValue',
        value: function currentValue() {
            var value = undefined;

            this.props.options.some(function (option) {
                /* istanbul ignore else */
                if (option.selected) {
                    value = option.value;

                    return true;
                }
            });

            return value;
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            (0, _reactDom.findDOMNode)(this.refs['option_$' + index]).focus();
        }
    }, {
        key: 'getNextOptionIndex',
        value: function getNextOptionIndex(currentOptionIndex) {
            var next = currentOptionIndex + 1;

            return next < this.props.options.length ? next : 0;
        }
    }, {
        key: 'getPreviousOptionIndex',
        value: function getPreviousOptionIndex(currentOptionIndex) {
            var previous = currentOptionIndex - 1;

            return previous < 0 ? this.props.options.length - 1 : previous;
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(option, event) {
            if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
                this.setState({ indexOfOptionInFocus: null });
            }

            /* istanbul ignore else */
            if (typeof option.onBlur === 'function') {
                event.persist();
                option.onBlur(event);
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(option, event) {
            this.props.onOptionSelected(option.value);

            /* istanbul ignore else */
            if (typeof option.onClick === 'function') {
                event.persist();
                option.onClick(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(option, event) {
            this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

            /* istanbul ignore else */
            if (typeof option.onFocus === 'function') {
                event.persist();
                option.onFocus(event);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var _this2 = this;

            return this.props.options.map(function (definition, index) {
                return _react2.default.createElement(
                    _UIButton2.default,
                    _extends({}, definition, {
                        selected: null,
                        role: 'radio',
                        'aria-checked': String(definition.selected),
                        ref: 'option_$' + index,
                        key: definition.value,
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-segmented-control-option': true,
                            'ui-segmented-control-option-selected': definition.selected
                        }, definition.className, !!definition.className)),
                        tabIndex: definition.selected ? '0' : '-1',
                        onBlur: _this2.handleBlur.bind(_this2, definition),
                        onClick: _this2.handleClick.bind(_this2, definition),
                        onFocus: _this2.handleFocus.bind(_this2, definition) }),
                    definition.content
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    'aria-required': 'radiogroup',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-segmented-control': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown.bind(this) }),
                this.renderOptions()
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITable).apply(this, arguments));
    }

    _createClass(UITable, [{
        key: 'getTableViewConfiguration',
        value: function getTableViewConfiguration() {
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
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.table = new _table2.default(this.getTableViewConfiguration());
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.table.destroy();
            this.table = null;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.table.regenerate(this.getTableViewConfiguration());
        }
    }, {
        key: 'render',
        value: function render() {
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
                    null,
                    _react2.default.createElement(
                        'div',
                        { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                        _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                        _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
                    )
                ),
                _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' })
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A high-performance, infinite table view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class TableView
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transform = require(25);

var _transform2 = _interopRequireDefault(_transform);

var _findWhere = require(21);

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require(22);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FOR FUTURE EYES
 *
 * Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data
 * to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it
 * be known that we tried to do it the React Way™ and it was not performant enough.
 *
 * The combination that was settled upon is a React shell with native DOM guts. This combination yields the
 * best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.
 *
 * __Important Note__
 *
 * Any time you create a document fragment, make sure you release it after by setting its variable to `null`.
 * If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. render one row of cells
 * 2. capture table & cell sizing metrics
 * 3. render column heads and the rest of the cells
 *
 * If the component updates due to new props, just blow away everything and start over. It's cheaper than
 * trying to diff.
 */

var cellClassRegex = /\s?ui-table-cell\b/g;
var rowClassRegex = /\s?ui-table-row\b/g;
var activeClassRegex = /\s?ui-table-row-active/g;
var loadingClassRegex = /\s?ui-table-row-loading/g;
var evenClassRegex = /\s?ui-table-row-even/g;
var oddClassRegex = /\s?ui-table-row-odd/g;

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

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns
            an integer value, rather than the _actual_ width. SMH. */
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

                if (val) {
                    this.node.className += ' ui-table-row-active';
                } else {
                    this.node.className = this.node.className.replace(activeClassRegex, '');
                }
            }
        },
        '_setIndex': null,
        get setIndex() {
            return this._setIndex;
        },
        set setIndex(val) {
            if (val !== this._setIndex) {
                this._setIndex = val;

                if (this._setIndex % 2 === 0) {
                    this.node.className = this.node.className.replace(oddClassRegex, '');
                    this.node.className += ' ui-table-row-even';
                } else {
                    this.node.className = this.node.className.replace(evenClassRegex, '');
                    this.node.className += ' ui-table-row-odd';
                }
            }
        },
        '_data': null,
        '_waitingForResolution': false,
        set _waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                if (val) {
                    this.node.className += ' ui-table-row-loading';
                } else {
                    this.node.className = this.node.className.replace(loadingClassRegex, '');
                }
            }
        },
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

                    this._waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                    }

                    this._waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this._waitingForResolution = false;
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
    _createClass(TableView, [{
        key: 'validateColumnShape',
        value: function validateColumnShape(column) {
            return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && typeof column.width !== 'undefined' ? typeof column.width === 'number' : true;
        }
    }, {
        key: 'validateConfiguration',
        value: function validateConfiguration(config) {
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

            if (!config.columns.every(this.validateColumnShape)) {
                throw Error('TableView was not passed valid `columns`. They should be objects conforming to: {\n                mapping: string,\n                resizable: bool,\n                title: string,\n                width: number,\n            }');
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
        }
    }]);

    function TableView(config) {
        _classCallCheck(this, TableView);

        this.c = _extends({}, config);

        // fallback values
        this.c.columns = this.c.columns || [];
        this.c.getRow = this.c.getRow || _noop2.default;
        this.c.rowClickFunc = this.c.rowClickFunc || _noop2.default;
        this.c.cellClickFunc = this.c.cellClickFunc || _noop2.default;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);

        this._columns = [];
        this._rows = [];
        this._rowsOrderedByY = [];

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

        this._body = this.c.body;
        this._body_s = this._body.style;
        this._header = this.c.header;
        this._header_s = this._header.style;
        this._xScrollHandle_s = this.c['x-scroll-handle'].style;
        this._yScrollHandle_s = this.c['y-scroll-handle'].style;

        this.regenerate();

        this.c.wrapper.addEventListener('wheel', this.handleMoveIntent);
        this.c.wrapper.addEventListener('mousemove', this.handleDragMove);
        this.c.wrapper.addEventListener('touchstart', this.handleTouchStart);
        this.c.wrapper.addEventListener('touchmove', this.handleTouchMove);

        this.c.wrapper.addEventListener('keydown', this.handleKeyDown);

        this._header.addEventListener('mousedown', this.handleColumnDragStart);
        this._header.addEventListener('dblclick', this.handleColumnAutoExpand);

        this._body.addEventListener('click', this.handleClick);

        this.c['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
        this.c['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

        this.c['x-scroll-track'].addEventListener('click', this.handleAdvanceToXScrollTrackLocation);
        this.c['y-scroll-track'].addEventListener('click', this.handleAdvanceToYScrollTrackLocation);

        window.addEventListener('resize', this.handleWindowResize);
    }

    _createClass(TableView, [{
        key: 'destroy',
        value: function destroy() {
            var _this = this;

            this.c.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.c.wrapper.removeEventListener('mousemove', this.handleDragMove);
            this.c.wrapper.removeEventListener('touchstart', this.handleTouchStart);
            this.c.wrapper.removeEventListener('touchmove', this.handleTouchMove);

            this.c.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this._header.removeEventListener('mousedown', this.handleColumnDragStart);
            this._header.removeEventListener('dblclick', this.handleColumnAutoExpand);

            this._body.removeEventListener('click', this.handleClick);

            this.c['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.c['x-scroll-track'].removeEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].removeEventListener('click', this.handleAdvanceToYScrollTrackLocation);

            window.removeEventListener('resize', this.handleWindowResize);

            this.emptyHeader();
            this.emptyBody();

            // release nodes
            Object.keys(this.c).forEach(function (key) {
                if (_this.c[key] instanceof HTMLElement) {
                    _this.c[key] = null;
                }
            });
        }
    }, {
        key: 'resetInternals',
        value: function resetInternals() {
            this._x = this._y = 0;
            this._nextX = this._nextY = 0;
            this._lastXScroll = this._lastYScroll = 0;
            this._xScrollHandlePosition = this._yScrollHandlePosition = 0;

            this._activeRow = -1;
            this._nextActiveRow = null;

            // temporary variables in various calculations
            this._iterator = null;
            this._nRowsToShift = null;
            this._orderedYArrayTargetIndex = null;
            this._rowPointer = null;
            this._shiftDelta = null;
            this._targetIndex = null;

            this._dragTimer = null;

            this._fauxEvent = { preventDefault: _noop2.default };

            this._touch = null;
            this._lastTouchPageX = this._lastTouchPageY = 0;

            this._xScrollHandleSize = this._yScrollHandleSize = null;

            // reset!
            this.performTranslations();
        }
    }, {
        key: 'emptyHeader',
        value: function emptyHeader() {
            this._columns.length = 0;

            while (this._header.firstChild) {
                this._header.removeChild(this._header.firstChild);
            }
        }
    }, {
        key: 'buildColumns',
        value: function buildColumns() {
            var _this2 = this;

            this.emptyHeader();

            this.c.columns.forEach(function (column) {
                return _this2._columns.push(createHeaderCell(column));
            });
        }
    }, {
        key: 'computeMinMaxHeaderCellDimensions',
        value: function computeMinMaxHeaderCellDimensions() {
            var cs = undefined;

            this._columns.forEach(function (column) {
                cs = window.getComputedStyle(column.node);

                column.minWidth = parseInt(cs['min-width'], 10);
                column.maxWidth = parseInt(cs['max-width'], 10);
            });
        }
    }, {
        key: 'injectHeaderCells',
        value: function injectHeaderCells() {
            var _this3 = this;

            this._fragment = document.createDocumentFragment();
            this._columns.forEach(function (column) {
                return _this3._fragment.appendChild(column.node);
            });

            this._header.appendChild(this._fragment);

            // must be done after they have been injected into the DOM
            this.computeMinMaxHeaderCellDimensions();

            this._fragment = null; // prevent memleak
        }
    }, {
        key: 'emptyBody',
        value: function emptyBody() {
            this._rows.length = 0;
            this._rowsOrderedByY.length = 0;

            while (this._body.firstChild) {
                this._body.removeChild(this._body.firstChild);
            }
        }
    }, {
        key: 'injectFirstRow',
        value: function injectFirstRow() {
            this.emptyBody();

            this._rows.push(createRow({
                data: this.c.getRow(0),
                setIndex: 0,
                y: 0
            }, this._columns));

            this._rowsOrderedByY.push(0);

            this._body.appendChild(this._rows[0].node);
        }
    }, {
        key: 'injectRestOfRows',
        value: function injectRestOfRows() {
            this._fragment = document.createDocumentFragment();

            for (this._iterator = 1; this._iterator < this._nRowsToRender; this._iterator += 1) {
                this._rows.push(createRow({
                    data: this.c.getRow(this._iterator),
                    setIndex: this._iterator,
                    y: this._cell_h * this._iterator
                }, this._columns));

                this._rowsOrderedByY.push(this._iterator);

                this._fragment.appendChild(this._rows[this._iterator].node);
            }

            this._body.appendChild(this._fragment);
            this._fragment = null; // prevent memleak
        }
    }, {
        key: 'calculateCellHeight',
        value: function calculateCellHeight() {
            this._cell_h = this._rows[0].cells[0].node.clientHeight || 40;
        }
    }, {
        key: 'calculateCellWidths',
        value: function calculateCellWidths() {
            var _this4 = this;

            this._rows[0].cells.forEach(function (cell, index) {
                _this4._columns[index].width = _this4._columns[index].width || cell.node.getBoundingClientRect().width;
                cell.width = _this4._columns[index].width;
            });
        }
    }, {
        key: 'calculateXBound',
        value: function calculateXBound() {
            this._row_w = this._rows[0].node.clientWidth || 500;
            this._xMaximum = this._container_w <= this._row_w ? this._container_w - this._row_w : 0;
        }
    }, {
        key: 'calculateYBound',
        value: function calculateYBound() {
            this._yUpperBound = 0;
            this._yLowerBound = this._container_h - this._nRowsToRender * this._cell_h;
        } // do not run this unless rebuilding the table, does not preserve current min/max thresholds

    }, {
        key: 'calculateXScrollHandleSize',
        value: function calculateXScrollHandleSize() {
            this._xScrollHandleSize = this._container_w - Math.abs(this._xMaximum);

            if (this._xScrollHandleSize < 12) {
                this._xScrollHandleSize = 12;
            }

            return this._xScrollHandleSize;
        }
    }, {
        key: 'calculateYScrollHandleSize',
        value: function calculateYScrollHandleSize() {
            this._yScrollHandleSize = this._container_h * (this._nRowsToRender / this.c.totalRows);

            if (this._yScrollHandleSize < 12) {
                this._yScrollHandleSize = 12;
            }

            return this._yScrollHandleSize;
        }
    }, {
        key: 'initializeScrollBars',
        value: function initializeScrollBars() {
            this._xScrollTrack_w = this.c['x-scroll-track'].clientWidth || 500;
            this._yScrollTrack_h = this.c['y-scroll-track'].clientHeight || 150;
            this._xScrollHandle_s.width = this.calculateXScrollHandleSize() + 'px';
            this._yScrollHandle_s.height = this.calculateYScrollHandleSize() + 'px';
        }
    }, {
        key: 'calculateContainerDimensions',
        value: function calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this._container_h = this.c.wrapper.clientHeight || 150;
            this._container_w = this.c.wrapper.clientWidth || 500;
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            if (this.c.wrapper.clientHeight !== this._container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return this.regenerate();
            }

            this.calculateContainerDimensions();
            this.calculateXBound();
            this.initializeScrollBars();
        }
    }, {
        key: 'regenerate',
        value: function regenerate() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

            this.c = _extends({}, config);

            this.resetInternals();
            this.calculateContainerDimensions();

            this.buildColumns();
            this.injectFirstRow();
            this.calculateCellWidths();
            this.calculateCellHeight();

            this._nRowsToRender = Math.ceil(this._container_h * 1.3 / this._cell_h);

            if (this._nRowsToRender > this.c.totalRows) {
                this._nRowsToRender = this.c.totalRows;
            }

            this._rowStartIndex = 0;
            this._rowEndIndex = this._nRowsToRender;

            this.injectHeaderCells();
            this.injectRestOfRows();

            this.calculateXBound();
            this.calculateYBound();

            this.initializeScrollBars();
        }
    }, {
        key: 'handleScrollDown',
        value: function handleScrollDown() {
            if (this._rowEndIndex === this.c.totalRows || this._nextY >= this._yLowerBound) {
                return;
            }

            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._nextY - this._yLowerBound) / this._cell_h);

            if (this._nRowsToShift + this._rowEndIndex + 1 > this.c.totalRows) {
                /* more rows than there is data available, truncate */
                this._nRowsToShift = this.c.totalRows - this._rowEndIndex + 1;
            }

            if (this._nRowsToShift > 0) {
                if (this._nRowsToShift > this._nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this._shiftDelta = this._nRowsToShift - this._nRowsToRender;

                    this._yUpperBound -= this._shiftDelta * this._cell_h;
                    this._yLowerBound -= this._shiftDelta * this._cell_h;

                    this._rowStartIndex += this._shiftDelta;
                    this._rowEndIndex += this._shiftDelta;

                    this._nRowsToShift = this._nRowsToRender;
                }

                if (this._nRowsToShift > 0) {
                    for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator += 1) {
                        this._targetIndex = this._rowEndIndex + this._iterator;

                        /* move the lowest Y-value rows to the bottom of the ordering array */
                        this._rowPointer = this._rows[this._rowsOrderedByY[0]];

                        this._rowPointer.data = this._dragTimer ? null : this.c.getRow(this._targetIndex);
                        this._rowPointer.setIndex = this._targetIndex;
                        this._rowPointer.y = this._targetIndex * this._cell_h;
                        this._rowPointer.active = this._targetIndex === this._activeRow;

                        this._rowsOrderedByY.push(this._rowsOrderedByY.shift());
                    }

                    this._rowStartIndex += this._nRowsToShift;
                    this._rowEndIndex += this._nRowsToShift;

                    this._yUpperBound -= this._nRowsToShift * this._cell_h;
                    this._yLowerBound -= this._nRowsToShift * this._cell_h;
                }
            }

            this._rowPointer = null;
        }
    }, {
        key: 'handleScrollUp',
        value: function handleScrollUp() {
            if (this._rowStartIndex === 0 || this._nextY <= this._yUpperBound) {
                return;
            }

            /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._nextY - this._yUpperBound) / this._cell_h);

            if (this._rowStartIndex - this._nRowsToShift < 0) {
                this._nRowsToShift = this._rowStartIndex;
            }

            if (this._nRowsToShift > 0) {
                if (this._nRowsToShift > this._nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this._shiftDelta = this._nRowsToShift - this._nRowsToRender;

                    this._yUpperBound += this._shiftDelta * this._cell_h;
                    this._yLowerBound += this._shiftDelta * this._cell_h;

                    this._rowStartIndex -= this._shiftDelta;
                    this._rowEndIndex -= this._shiftDelta;

                    this._nRowsToShift = this._nRowsToRender;
                }

                if (this._nRowsToShift > 0) {
                    /* move the highest Y-value rows to the top of the ordering array */
                    this._orderedYArrayTargetIndex = this._rowsOrderedByY.length - 1;

                    for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator += 1) {
                        this._targetIndex = this._rowStartIndex - this._iterator - 1;

                        this._rowPointer = this._rows[this._rowsOrderedByY[this._orderedYArrayTargetIndex]];

                        this._rowPointer.data = this._dragTimer ? null : this.c.getRow(this._targetIndex);
                        this._rowPointer.setIndex = this._targetIndex;
                        this._rowPointer.y = this._targetIndex * this._cell_h;
                        this._rowPointer.active = this._targetIndex === this._activeRow;

                        this._rowsOrderedByY.unshift(this._rowsOrderedByY.pop());
                    }

                    this._rowStartIndex -= this._nRowsToShift;
                    this._rowEndIndex -= this._nRowsToShift;

                    this._yUpperBound += this._nRowsToShift * this._cell_h;
                    this._yLowerBound += this._nRowsToShift * this._cell_h;
                }
            }

            this._rowPointer = null;
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(event) {
            this._touch = event.touches.item(0);
            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to handleMoveIntent() */

            this._touch = event.touches.item(0);

            this._fauxEvent.deltaX = this._lastTouchPageX - this._touch.pageX;
            this._fauxEvent.deltaY = this._lastTouchPageY - this._touch.pageY;

            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;

            this.handleMoveIntent(this._fauxEvent);
        }
    }, {
        key: 'handleMoveIntent',
        value: function handleMoveIntent(event) {
            var _this5 = this;

            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0 || this._manuallyScrollingY && event.deltaY === 0 || this._manuallyScrollingX && event.deltaX === 0) {
                return;
            }

            // minimum translation should be one row height
            this._deltaX = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            this._deltaY = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * this._cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            this._nextX = this._manuallyScrollingY ? 0 : this._x - this._deltaX;

            if (this._nextX > 0) {
                this._nextX = 0;
            } else if (this._nextX < this._xMaximum) {
                this._nextX = this._xMaximum;
            }

            this._nextY = this._manuallyScrollingX ? 0 : this._y - this._deltaY;

            window.requestAnimationFrame(function () {
                if (_this5._nextY < _this5._y) {
                    _this5.handleScrollDown();
                } else if (_this5._nextY > _this5._y) {
                    _this5.handleScrollUp();
                }

                if (_this5._nextY > 0) {
                    _this5._nextY = 0;
                } else if (_this5._nextY < _this5._yLowerBound) {
                    _this5._nextY = _this5._yLowerBound;
                }

                if (_this5._nextX === 0) {
                    _this5._xScrollHandlePosition = 0;
                } else {
                    _this5._xScrollHandlePosition = Math.abs(_this5._nextX) / (_this5._row_w - _this5._container_w) * (_this5._xScrollTrack_w - _this5._xScrollHandleSize);

                    if (_this5._xScrollHandlePosition + _this5._xScrollHandleSize > _this5._xScrollTrack_w) {
                        _this5._xScrollHandlePosition = _this5._xScrollTrack_w - _this5._xScrollHandleSize;
                    }
                }

                if (_this5.nextY === 0) {
                    _this5._yScrollHandlePosition = 0;
                } else {
                    _this5._yScrollHandlePosition = Math.abs(_this5._nextY) / (_this5.c.totalRows * _this5._cell_h - _this5._container_h) * (_this5._yScrollTrack_h - _this5._yScrollHandleSize);

                    if (_this5._yScrollHandlePosition + _this5._yScrollHandleSize > _this5._yScrollTrack_h) {
                        _this5._yScrollHandlePosition = _this5._yScrollTrack_h - _this5._yScrollHandleSize;
                    }
                }

                _this5.performTranslations(); // Do all transforms grouped together

                _this5._x = _this5._nextX;
                _this5._y = _this5._nextY;
            });
        }
    }, {
        key: 'performTranslations',
        value: function performTranslations() {
            this._header_s[_transform2.default] = translate3d(this._nextX);
            this._body_s[_transform2.default] = translate3d(this._nextX, this._nextY);
            this._xScrollHandle_s[_transform2.default] = translate3d(this._xScrollHandlePosition);
            this._yScrollHandle_s[_transform2.default] = translate3d(0, this._yScrollHandlePosition);
        }
    }, {
        key: 'handleAdvanceToXScrollTrackLocation',
        value: function handleAdvanceToXScrollTrackLocation(event) {
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            this._fauxEvent.deltaX = event.pageX - this.c.wrapper.offsetLeft - this._lastXScroll;
            this._fauxEvent.deltaY = 0;

            this.handleMoveIntent(this._fauxEvent);

            this._lastXScroll = event.layerX;
        }
    }, {
        key: 'handleAdvanceToYScrollTrackLocation',
        value: function handleAdvanceToYScrollTrackLocation(event) {
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            this._fauxEvent.deltaX = 0;
            this._fauxEvent.deltaY = (event.pageY - this.c.wrapper.offsetTop - this._lastYScroll) / this._container_h * this.c.totalRows * this._cell_h;

            this.handleMoveIntent(this._fauxEvent);

            this._lastYScroll = event.layerY;
        }
    }, {
        key: 'handleXScrollHandleDragStart',
        value: function handleXScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            this._leftButtonPressed = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastXScroll = event.clientX;
            this._manuallyScrollingX = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleYScrollHandleDragStart',
        value: function handleYScrollHandleDragStart(event) {
            if (event.button !== 0) {
                return;
            }

            this._leftButtonPressed = true;

            // Fixes dragStart occasionally happening and breaking the simulated drag
            event.preventDefault();

            this._lastYScroll = event.clientY;
            this._manuallyScrollingY = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', this.handleDragEnd, true);
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
            var _this6 = this;

            if (!this._leftButtonPressed) {
                return;
            }

            if (this._dragTimer) {
                window.clearTimeout(this._dragTimer);
            }

            this._dragTimer = window.setTimeout(function () {
                _this6._dragTimer = null;

                /* Now fetch, once drag has ceased for long enough. */
                _this6._rows.forEach(function (row) {
                    if (row.data === null) {
                        row.data = _this6.c.getRow(row.setIndex);
                    }
                });
            }, this.c.throttleInterval);

            if (this._manuallyScrollingY) {
                this._fauxEvent.deltaX = 0;
                this._fauxEvent.deltaY = (event.clientY - this._lastYScroll) / this._container_h * this.c.totalRows * this._cell_h;

                this.handleMoveIntent(this._fauxEvent);

                this._lastYScroll = event.clientY;
            } else if (this._manuallyScrollingX) {

                this._fauxEvent.deltaX = event.clientX - this._lastXScroll;
                this._fauxEvent.deltaY = 0;

                this.handleMoveIntent(this._fauxEvent);

                this._lastXScroll = event.clientX;
            } else if (this._manuallyResizingColumn) {

                this.handleColumnResize(event.clientX - this._lastColumnX);

                this._lastColumnX = event.clientX;
            }
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this._leftButtonPressed = false;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.removeEventListener('mouseup', this.handleDragEnd, true);

            this._manuallyScrollingX = this._manuallyScrollingY = this._manuallyResizingColumn = false;
        }
    }, {
        key: 'handleColumnDragStart',
        value: function handleColumnDragStart(event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._leftButtonPressed = true;

                this._lastColumnX = event.clientX;

                this._manuallyResizingColumn = (0, _findWhere2.default)(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'applyNewColumnWidth',
        value: function applyNewColumnWidth(index, width) {
            this._columns[index].width = width;
            this._rows.forEach(function (row) {
                return row.cells[index].width = width;
            });

            this.calculateXBound();
            this.initializeScrollBars();
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            if (delta === 0) {
                return;
            }

            var index = this._columns.indexOf(this._manuallyResizingColumn);
            var adjustedDelta = delta;

            if (adjustedDelta < 0 && !isNaN(this._manuallyResizingColumn.minWidth) && this._manuallyResizingColumn.width + adjustedDelta < this._manuallyResizingColumn.minWidth) {
                adjustedDelta = this._manuallyResizingColumn.minWidth - this._manuallyResizingColumn.width;
            } else if (!isNaN(this._manuallyResizingColumn.maxWidth) && this._manuallyResizingColumn.width + adjustedDelta > this._manuallyResizingColumn.maxWidth) {
                adjustedDelta = this._manuallyResizingColumn.maxWidth - this._manuallyResizingColumn.width;
            }

            this.applyNewColumnWidth(index, this._manuallyResizingColumn.width + adjustedDelta);

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this._fauxEvent.deltaX = adjustedDelta;
                this._fauxEvent.deltaY = 0;

                this.handleMoveIntent(this._fauxEvent);
            }
        }
    }, {
        key: 'handleColumnAutoExpand',
        value: function handleColumnAutoExpand(event) {
            var _this7 = this;

            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this7._columns, 'mapping', mapping);
                    var columnIndex = _this7._columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = undefined;

                    _this7._rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this7.applyNewColumnWidth(columnIndex, width);
                })();
            }
        }
    }, {
        key: 'getKeyFromKeyCode',
        value: function getKeyFromKeyCode(code) {
            switch (code) {
                case 40:
                    return 'ArrowDown';

                case 38:
                    return 'ArrowUp';

                case 13:
                    return 'Enter';
            }

            return null;
        }
    }, {
        key: 'setAriaText',
        value: function setAriaText(text) {
            this.c.aria.innerText = text;
        }
    }, {
        key: 'setActiveRow',
        value: function setActiveRow(setIndex) {
            this._activeRow = setIndex;
            this._rows.forEach(function (row) {
                return row.active = row.setIndex === setIndex;
            });
        }
    }, {
        key: 'changeActiveRow',
        value: function changeActiveRow(delta) {
            var _this8 = this;

            this._nextActiveRow = (0, _findWhere2.default)(this._rows, 'setIndex', this._activeRow + delta);

            if (this._nextActiveRow) {
                this.setActiveRow(this._nextActiveRow.setIndex);
                this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

                if (delta === -1 && this._nextActiveRow.y * -1 > this._y || delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this._fauxEvent.deltaX = 0;
                        this._fauxEvent.deltaY = this._cell_h * delta;

                        this.handleMoveIntent(this._fauxEvent);
                    }
            } else if (delta === -1 && this._activeRow > 0 || delta === 1 && this._activeRow < this.c.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this._fauxEvent.deltaX = 0;
                this._fauxEvent.deltaY = (this._rowStartIndex > this._activeRow && this._activeRow - this._rowStartIndex || (this._rowStartIndex < this._activeRow && this._activeRow - this._rowStartIndex) + delta) * this._cell_h;

                this.handleMoveIntent(this._fauxEvent);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this8.changeActiveRow(delta);
                });
            }

            this._nextActiveRow = null;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
                    if (this._activeRow !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this9._rows, 'setIndex', _this9._activeRow).data;

                            _this9.setAriaText(_this9._columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }
        }
    }, {
        key: 'discoverCellAndRowNodes',
        value: function discoverCellAndRowNodes(target) {
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
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var map = this.discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(this._rows, 'node', map.row);

                this.setActiveRow(row.setIndex);

                if (map.cell) {
                    this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                this.c.rowClickFunc(event, row.setIndex);
            }
        }
    }]);

    return TableView;
}();

exports.default = TableView;

},{"21":21,"22":22,"25":25}],18:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITokenizedInput).apply(this, arguments));
    }

    _createClass(UITokenizedInput, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
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
        }
    }, {
        key: 'add',
        value: function add(index) {
            if (this.props.tokens.indexOf(index) === -1) {
                this.props.handleAddToken(index);
            }
        }
    }, {
        key: 'remove',
        value: function remove(index) {
            var _this2 = this;

            var indexes = (Array.isArray(index) ? index : [index]).filter(function (idx) {
                return _this2.props.tokens.indexOf(idx) !== -1;
            });

            if (indexes.length) {
                this.props.handleRemoveTokens(indexes);
            }
        }
    }, {
        key: 'selectToken',
        value: function selectToken(index) {
            this.props.handleNewSelection([index]);
        }
    }, {
        key: 'selectTokens',
        value: function selectTokens(indexes) {
            this.props.handleNewSelection(indexes);
        }
    }, {
        key: 'selectPreviousToken',
        value: function selectPreviousToken(append) {
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
        }
    }, {
        key: 'selectNextToken',
        value: function selectNextToken(append) {
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
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            this.props.handleNewSelection([]);
        }
    }, {
        key: 'handleInputFocus',
        value: function handleInputFocus(event) {
            this.clearSelection();

            if (typeof this.props.inputProps.onFocus === 'function') {
                event.persist();
                this.props.inputProps.onFocus(event);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
        }
    }, {
        key: 'handleTokenCloseClick',
        value: function handleTokenCloseClick(index) {
            this.remove(index);
            this.refs.typeahead.focus();
        }
    }, {
        key: 'renderTokenClose',
        value: function renderTokenClose(index) {
            if (this.props.showTokenClose) {
                return _react2.default.createElement('div', { className: 'ui-tokenfield-token-close',
                    onClick: this.handleTokenCloseClick.bind(this, index) });
            }
        }
    }, {
        key: 'handleTokenKeyDown',
        value: function handleTokenKeyDown(index, event) {
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
        }
    }, {
        key: 'renderTokens',
        value: function renderTokens() {
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
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var descendants = Object.keys(_UITypeaheadInput2.default.propTypes).reduce(function (props, key) {
                props[key] = _this4.props[key];

                return props;
            }, {});

            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-tokenfield-wrapper': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown.bind(this) }),
                this.renderTokens(),
                _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, descendants, {
                    ref: 'typeahead',
                    className: 'ui-tokenfield',
                    onEntitySelected: this.add.bind(this),
                    onFocus: this.handleInputFocus.bind(this),
                    clearPartialInputOnSelection: true }))
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require(26);

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require(28);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITooltip).apply(this, arguments));
    }

    _createClass(UITooltip, [{
        key: 'render',
        value: function render() {
            var position = this.props.position;

            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-tooltip': true,
                        'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                        'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                        'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                        'ui-tooltip-position-after': position === UITooltip.position.AFTER
                    }, this.props.className, !!this.props.className)),
                    'data-tooltip': this.props.text,
                    'aria-label': this.props['aria-label'] || this.props.text }),
                this.props.children
            );
        }
    }]);

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITypeaheadInput).apply(this, arguments));
    }

    _createClass(UITypeaheadInput, [{
        key: 'initialState',
        value: function initialState() {
            return {
                entityMatchIndexes: [],
                selectedEntityIndex: -1,
                id: this.uuid(),
                userInput: this.props.defaultValue
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.defaultValue) {
                this.computeMatches();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.entities !== this.props.entities) {
                this.computeMatches(nextProps.entities);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.selectedEntityIndex >= 0) {
                this.props.onEntityHighlighted(this.state.selectedEntityIndex);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
                this.refs.matches.scrollTop = 0;
            } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop

            if (this.state.selectedEntityIndex >= 0 && this.props.entities[this.state.selectedEntityIndex] !== prevProps.entities[prevState.selectedEntityIndex]) {
                this.props.onEntityHighlighted(this.state.selectedEntityIndex);
            }
        }
    }, {
        key: 'getSelectedEntityText',
        value: function getSelectedEntityText() {
            var entity = this.props.entities[this.state.selectedEntityIndex];

            return entity ? entity.text : '';
        }
    }, {
        key: 'handleMatchClick',
        value: function handleMatchClick(index) {
            var _this2 = this;

            this.setState({ selectedEntityIndex: index }, function () {
                return _this2.setValueWithSelectedEntity();
            });
        }
    }, {
        key: 'selectMatch',
        value: function selectMatch(delta) {
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
        }
    }, {
        key: 'resetMatches',
        value: function resetMatches() {
            this.setState({
                selectedEntityIndex: -1,
                entityMatchIndexes: []
            });
        }
    }, {
        key: 'getInputNode',
        value: function getInputNode() {
            return this.refs.input;
        }
    }, {
        key: 'select',
        value: function select() {
            this.refs.input.selectionStart = 0;
            this.refs.input.selectionEnd = this.refs.input.value.length;
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.getInputNode().focus();
        }
    }, {
        key: 'focusInput',
        value: function focusInput() {
            if (!this.warned_focusInput) {
                this.warned_focusInput = true;
                console.warn('UITypeaheadInput: `focusInput()` is deprecated and will be removed in a future release. Please use UITypeaheadInput.focus() instead.');
            }

            this.focus();
        }
    }, {
        key: 'value',
        value: function value(newValue) {
            this.getInputNode().value = newValue;

            this.setState({ userInput: newValue });
            this.resetMatches();
            this.focus();
        }
    }, {
        key: 'setValue',
        value: function setValue(newValue) {
            if (!this.warned_setValue) {
                this.warned_setValue = true;
                console.warn('UITypeaheadInput: `setValue(text)` is deprecated and will be removed in a future release. Please use UITypeaheadInput.value(text) instead.');
            }

            this.value(newValue);
        }
    }, {
        key: 'cursorAtEndOfInput',
        value: function cursorAtEndOfInput() {
            var node = this.getInputNode();

            return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
        }
    }, {
        key: 'setValueWithSelectedEntity',
        value: function setValueWithSelectedEntity() {
            this.props.onEntitySelected(this.state.selectedEntityIndex);

            if (this.props.clearPartialInputOnSelection) {
                this.value('');
            } else {
                this.value(this.getSelectedEntityText());
            }
        }
    }, {
        key: 'markFuzzyMatchSubstring',
        value: function markFuzzyMatchSubstring(input, entity) {
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
        }
    }, {
        key: 'markStartsWithMatchSubstring',
        value: function markStartsWithMatchSubstring(input, entity) {
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
        }
    }, {
        key: 'markMatchSubstring',
        value: function markMatchSubstring() {
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
        }
    }, {
        key: 'getFuzzyMatchIndexes',
        value: function getFuzzyMatchIndexes(userText, entities) {
            var normalized = userText.toLowerCase();

            return entities.reduce(function findIndexes(result, entity, index) {
                return entity.text.toLowerCase().indexOf(normalized) !== -1 ? result.push(index) && result : result;
            }, []);
        }
    }, {
        key: 'getStartsWithMatchIndexes',
        value: function getStartsWithMatchIndexes(userText, entities) {
            var seekValue = userText.toLowerCase();

            return entities.reduce(function seekMatch(result, entity, index) {
                return entity.text.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
            }, []);
        }
    }, {
        key: 'getMatchIndexes',
        value: function getMatchIndexes() {
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
        }
    }, {
        key: 'computeMatches',
        value: function computeMatches() {
            var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

            var currentValue = this.state.userInput;
            var matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

            this.setState({
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
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
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
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
        }
    }, {
        key: 'renderNotification',
        value: function renderNotification() {
            return _react2.default.createElement(
                'div',
                { ref: 'aria',
                    id: this.state.id,
                    className: this.props.offscreenClass,
                    'aria-live': 'polite' },
                this.getSelectedEntityText()
            );
        }
    }, {
        key: 'renderHint',
        value: function renderHint() {
            if (this.props.hint) {
                var userText = this.state.userInput;
                var raw = this.getSelectedEntityText();
                var processed = '';

                if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                    processed = raw.replace(new RegExp(userText, 'i'), userText);
                }

                return _react2.default.createElement('input', _extends({}, this.props.hintProps, {
                    ref: 'hint',
                    type: this.props.type || this.props.inputProps.type || 'text',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead-hint': true
                    }, this.props.hintProps.className, !!this.props.hintProps.className)),
                    value: processed,
                    disabled: true,
                    tabIndex: '-1' }));
            }
        }
    }, {
        key: 'renderMatches',
        value: function renderMatches() {
            var _this4 = this;

            if (this.state.entityMatchIndexes.length) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.matchWrapperProps, {
                        ref: 'matches',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-typeahead-match-wrapper': true
                        }, this.props.matchWrapperProps.className, !!this.props.matchWrapperProps.className)) }),
                    this.state.entityMatchIndexes.map(function (index) {
                        var entity = _this4.props.entities[index];

                        return _react2.default.createElement(
                            'div',
                            _extends({}, entity, {
                                ref: 'match_$' + index,
                                className: (0, _classnames2.default)(_defineProperty({
                                    'ui-typeahead-match': true,
                                    'ui-typeahead-match-selected': _this4.state.selectedEntityIndex === index
                                }, entity.className, !!entity.className)),
                                key: entity.text,
                                onClick: _this4.handleMatchClick.bind(_this4, index) }),
                            _this4.markMatchSubstring(_this4.state.userInput, entity)
                        );
                    })
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    type: null,
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead-wrapper': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown.bind(this) }),
                this.renderNotification(),
                this.renderHint(),
                _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                    ref: 'input',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead': true
                    }, this.props.inputProps.className, !!this.props.inputProps.className)),
                    defaultValue: this.props.defaultValue || this.props.inputProps.defaultValue,
                    name: this.props.name || this.props.inputProps.name,
                    type: this.props.type || this.props.inputProps.type || 'text',
                    'aria-controls': this.state.id,
                    onInput: this.handleInput.bind(this) })),
                this.renderMatches()
            );
        }
    }]);

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

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    var _Object$getPrototypeO;

    _classCallCheck(this, UIView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UIView)).call.apply(_Object$getPrototypeO, [this].concat(args)));

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

  _createClass(UIView, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual2.default)(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
    }

    /**
     * Generates a unique ID. Based on {@link https://gist.github.com/jed/982883 this implementation}.
     * @return {string} a unique identifier
     *
     * @example
     * this.uuid(); // 1f2cd27f-0754-4344-9d20-436a201b2f80
     */

  }, {
    key: 'uuid',
    value: function uuid() {
      /* eslint-disable */
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
        return (a ^ Math.random() * 16 >> a / 4).toString(16);
      });
      /* eslint-enable */
    }

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

  }]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUYWJsZS90YWJsZS9pbmRleC5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9maW5kV2hlcmUvaW5kZXguanMiLCJVSVV0aWxzL25vb3AvaW5kZXguanMiLCJVSVV0aWxzL25vdGlmeS9pbmRleC5qcyIsIlVJVXRpbHMvc2hhbGxvd0VxdWFsL2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm0vaW5kZXguanMiLCJVSVZpZXcvaW5kZXguanMiLCJleHBvcnRzLmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lNOzs7QUFDRixhQURFLG9CQUNGLEdBQXFCOzs7OEJBRG5CLHNCQUNt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LE9BQTVCO0tBRDNDO0FBR0EsWUFBUyxPQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLFFBQVEsVUFBUixFQUFvQixPQUFwQjtDQXRCbkM7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuY2xhc3MgVUlBcnJvd0tleU5hdmlnYXRpb24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUoKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyhudW1DaGlsZHJlbiAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgKFxuICAgICAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgID8gdGhpcy5yZWZzLndyYXBwZXJcbiAgICAgICAgICA6IGZpbmRET01Ob2RlKHRoaXMucmVmcy53cmFwcGVyKVxuICAgICAgICApLmNoaWxkcmVuW2luZGV4XS5mb2N1cygpO1xuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEZvY3VzKG5leHRJbmRleCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygtMSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRCbHVyKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEZvY3VzKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG4gICAgfVxuXG4gICAgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuICYmIEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQudGFiSW5kZXggfHwgMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgpLFxuICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlQ2hpbGRGb2N1cy5iaW5kKHRoaXMsIGluZGV4KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbigpKTtcbiAgICB9XG59XG5cblVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcyA9IHtcbiAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBdKSxcbn07XG5cblVJQXJyb3dLZXlOYXZpZ2F0aW9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb21wb25lbnQ6ICdkaXYnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlBcnJvd0tleU5hdmlnYXRpb247XG4iLCJpbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHRvZ2dsZVN0YXRlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlCdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICAgIG9uQ2xpY2s6IG5vb3AsXG4gICAgb25QcmVzc2VkOiBub29wLFxuICAgIG9uVW5wcmVzc2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlCdXR0b247XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKCkgeyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaGFuZGxlQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5hcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94LnByb3BUeXBlcyA9IHtcbiAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbmRldGVybWluYXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJQ2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xuICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICBvblVuY2hlY2tlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3g7XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBhbGxJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBsZXQgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2FsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU9eyFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGNiX2l0ZW0ubmFtZWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgbGV0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzID0ge1xuICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uQWxsQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BbGxVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdEFsbExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgXSksXG59O1xuXG5VSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgc2VsZWN0QWxsTGFiZWw6ICdTZWxlY3QgQWxsJyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3hHcm91cDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgICAgICBib2R5VVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVGb2N1cyA9IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZSAmJiB0aGlzLnJlZnMuZGlhbG9nLmNvbnRhaW5zKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5ib2R5fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbiB8fCB0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlEaWFsb2cucHJvcFR5cGVzID0ge1xuICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5VSURpYWxvZy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYm9keVByb3BzOiB7fSxcbiAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICBvbkNsb3NlOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlEaWFsb2c7XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5jbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUgPSB0aGlzLnJlc2NhbGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVzY2FsZSgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgICAgICBpZiAoICAgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAgICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbih0aGlzLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUZpdHRlZFRleHQuZGVmYXVsdFByb3BzID0ge1xuICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxufTtcblxuVUlGaXR0ZWRUZXh0LnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgXSksXG4gICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUZpdHRlZFRleHQ7XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGFsdD17bnVsbH1cbiAgICAgICAgICAgICAgICAgc3JjPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUltYWdlLnN0YXR1cyA9IHtcbiAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICBFUlJPUjogJ0VSUk9SJyxcbn07XG5cblVJSW1hZ2UucHJvcFR5cGVzID0ge1xuICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUltYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbWFnZVByb3BzOiB7fSxcbiAgICBzdGF0dXNQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUltYWdlO1xuIiwiLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlNb2RhbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSU1vZGFsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1NwZWNpZmljUHJvcHMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXNrJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2cgey4uLmRpYWxvZ1NwZWNpZmljUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlNb2RhbC5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtb2RhbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgIG1hc2tQcm9wczoge30sXG4gICAgbW9kYWxQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSU1vZGFsO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJUGFnaW5hdGVkVmlld1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBJdGVtIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVBhZ2luYXRlZFZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLnBhZ2VyUG9zaXRpb24sXG4gICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICAgICAgICAgIG51bVBhZ2VUb2dnbGVzOiB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzLFxuICAgICAgICAgICAgdG90YWxJdGVtczogdGhpcy5wcm9wcy50b3RhbEl0ZW1zLFxuICAgICAgICAgICAgaXRlbXM6IFt7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKDApfV0sXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUpIHtcbiAgICAgICAgaWYgKG9sZFN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKX0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIG51bWJlck9mUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xUZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMuc3RhdGUudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnN0YXRlLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKHZhbHVlKSB7XG4gICAgICAgIGxldCBwYWdlTnVtYmVyO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVM6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogcGFnZU51bWJlcixcbiAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyhwYWdlTnVtYmVyKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb24gey4uLnRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3duSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW0gcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyQ2FzZSA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnc2VnbWVudGVkQ29udHJvbCcgKyAocG9zaXRpb25Mb3dlckNhc2VbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXJDYXNlLnNsaWNlKDEpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgWyd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy0nICsgcG9zaXRpb25Mb3dlckNhc2VdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRlZC12aWV3Jz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkVcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1dcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMgPSB7XG4gICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgTkVYVDogJ05FWFQnLFxuICAgIExBU1Q6ICdMQVNUJyxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbiA9IHtcbiAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICBCT1RIOiAnQk9USCcsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcucHJvcFR5cGVzID0ge1xuICAgIGdldEl0ZW06IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxpc3RXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmV4dFBhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSB8fCBwcm9wcy5udW1JdGVtc1BlclBhZ2UgPiBwcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIHByb3BzLnRvdGFsSXRlbXMgKyAnLicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBudW1QYWdlVG9nZ2xlczogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdlclBvc2l0aW9uOiBmdW5jdGlvbiB2YWxpZGF0ZVBhZ2VyUG9zaXRpb24ocHJvcHMpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLnBhZ2VyUG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICBpZiAocHJvcHMucGFnZXJQb3NpdGlvbiA8IDEgfHwgcHJvcHMucGFnZXJQb3NpdGlvbiA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbikpLFxuICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dKdW1wVG9GaXJzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0p1bXBUb0xhc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0b3RhbEl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcuZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIGdldEl0ZW06IG5vb3AsXG4gICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogJ8KrIEZpcnN0JyxcbiAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6ICdMYXN0IMK7JyxcbiAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiAnTmV4dCDigLonLFxuICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgcGFnZXJQb3NpdGlvbjogMSxcbiAgICBwb3NpdGlvbjogVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFLFxuICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiAn4oC5IFByZXZpb3VzJyxcbiAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUGFnaW5hdGVkVmlldztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUGFnaW5hdGVkVmlld0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmRhdGEgIT09IHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IG5leHRQcm9wcy5kYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRJdGVtRGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKGV4dHJhQ2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gY3goe1xuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLW9kZCc6ICF0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIGNsb25lV2l0aENsYXNzZXMoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoPGRpdiB7Li4udGhpcy5wcm9wc30gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+PC9kaXY+KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwgey4uLnRoaXMucHJvcHMsIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKHRoaXMuc3RhdGUuZGF0YS5wcm9wcy5jbGFzc05hbWUpfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZVdpdGhDbGFzc2VzKHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgfVxufVxuXG5VSVBhZ2luYXRlZFZpZXdJdGVtLnByb3BUeXBlcyA9IHtcbiAgICBldmVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQYWdpbmF0ZWRWaWV3SXRlbTtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG4vKlxuICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgbmV2ZXIgY2hhbmdlcy4gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgYGNvbXBvbmVudERpZFVwZGF0ZWAgYWZ0ZXIgYHNldFN0YXRlYCB0byB0cmlnZ2VyXG4gICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbiA9IHRoaXMuYWxpZ24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5ub2RlLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUG9wb3Zlci5wb3NpdGlvbiA9IHtcbiAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICBNSURETEU6ICdNSURETEUnLFxuICAgIEVORDogJ0VORCcsXG59O1xuXG5VSVBvcG92ZXIucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBhbmNob3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGFuY2hvcllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxufTtcblxuVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBvcG92ZXI7XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGxhYmVsPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxufTtcblxuVUlQcm9ncmVzcy5wcm9wVHlwZXMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3M7XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSGlkZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgIG9uRXhwYW5kOiBub29wLFxuICAgIG9uSGlkZTogbm9vcCxcbiAgICB0b2dnbGVQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVJhZGlvIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlSYWRpby5wcm9wVHlwZXMgPSB7XG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5VSVJhZGlvLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvblNlbGVjdGVkOiBub29wLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUmFkaW87XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjdXJyZW50VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIHsuLi5kZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGVmaW5pdGlvbi5jbGFzc05hbWVdOiAhIWRlZmluaXRpb24uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e2RlZmluaXRpb24uc2VsZWN0ZWQgPyAnMCcgOiAnLTEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XG4gICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uczogZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuY291bnRlcmVkIG11bHRpcGxlIG9wdGlvbnMgd2l0aCBgc2VsZWN0ZWQ6IHRydWVgLiBUaGVyZSBjYW4gYmUgb25seSBvbmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5VSVNlZ21lbnRlZENvbnRyb2wuZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVNlZ21lbnRlZENvbnRyb2w7XG4iLCIvKipcbiAqIFJlYWN0IHdyYXBwZXIgZm9yIFRhYmxlVmlldy5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBUYWJsZVZpZXcgZnJvbSAnLi90YWJsZSc7XG5cbmNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICByb3dDbGlja0Z1bmM6IHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdCxcbiAgICAgICAgICAgIGNlbGxDbGlja0Z1bmM6IHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QsXG4gICAgICAgICAgICBnZXRSb3c6IHRoaXMucHJvcHMuZ2V0Um93LFxuICAgICAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogdGhpcy5wcm9wcy50aHJvdHRsZUludGVydmFsLFxuICAgICAgICAgICAgdG90YWxSb3dzOiB0aGlzLnByb3BzLnRvdGFsUm93cyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgVGFibGVWaWV3KHRoaXMuZ2V0VGFibGVWaWV3Q29uZmlndXJhdGlvbigpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5yZWdlbmVyYXRlKHRoaXMuZ2V0VGFibGVWaWV3Q29uZmlndXJhdGlvbigpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0ndGFibGUnIGNsYXNzTmFtZT0ndWktdGFibGUnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZGVyJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcicgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlLnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhyb3R0bGVJbnRlcnZhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBUYWJsZVZpZXdcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi8uLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgZmluZFdoZXJlIGZyb20gJy4uLy4uL1VJVXRpbHMvZmluZFdoZXJlJztcbmltcG9ydCBub29wIGZyb20gJy4uLy4uL1VJVXRpbHMvbm9vcCc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGFcbiAqIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0XG4gKiBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG4gKlxuICogVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGVcbiAqIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cbiAqXG4gKiBfX0ltcG9ydGFudCBOb3RlX19cbiAqXG4gKiBBbnkgdGltZSB5b3UgY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIG1ha2Ugc3VyZSB5b3UgcmVsZWFzZSBpdCBhZnRlciBieSBzZXR0aW5nIGl0cyB2YXJpYWJsZSB0byBgbnVsbGAuXG4gKiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cbiAqL1xuXG4vKipcbiAqIE9SREVSIE9GIE9QRVJBVElPTlNcbiAqXG4gKiAxLiByZW5kZXIgb25lIHJvdyBvZiBjZWxsc1xuICogMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbiAqIDMuIHJlbmRlciBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuICpcbiAqIElmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhblxuICogdHJ5aW5nIHRvIGRpZmYuXG4gKi9cblxuY29uc3QgY2VsbENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLWNlbGxcXGIvZztcbmNvbnN0IHJvd0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvd1xcYi9nO1xuY29uc3QgYWN0aXZlQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LWFjdGl2ZS9nO1xuY29uc3QgbG9hZGluZ0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1sb2FkaW5nL2c7XG5jb25zdCBldmVuQ2xhc3NSZWdleCA9IC9cXHM/dWktdGFibGUtcm93LWV2ZW4vZztcbmNvbnN0IG9kZENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1vZGQvZztcblxuY29uc3QgdHJhbnNsYXRlM2QgPSBmdW5jdGlvbiB0cmFuc2xhdGUzRCh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMHB4KSc7XG59OyAvLyB6IGlzIG5ldmVyIHVzZWRcblxuY29uc3QgcmVwYXJlbnRDZWxsVGV4dCA9IGZ1bmN0aW9uIHJlcGFyZW50Q2VsbFRleHQobm9kZSwgY29udGVudCkge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwtaW5uZXInO1xuXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gdGV4dE5vZGU7XG59O1xuXG5jb25zdCBjcmVhdGVET01DZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsJztcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBjb250ZW50KTtcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlRE9NSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUhlYWRlckNlbGwoY29sdW1uLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVIZWFkZXJDZWxsKG1ldGFkYXRhLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01IZWFkZXJDZWxsKG1ldGFkYXRhLCBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX2NvbnRlbnQnOiBjb250ZW50LFxuICAgICAgICBnZXQgY29udGVudCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7IH0sXG4gICAgICAgIHNldCBjb250ZW50KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX2NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVdpZHRoOiBmdW5jdGlvbiB0cnVlV2lkdGgoKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsYXNzZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICAgICAgLy8gdGFrZSBvZmYgdGhlIGlubmVyIGNsYXNzIHdoaWNoIGlzIHdoYXQgY2F1c2VzIHRoZSBzaXppbmcgY29uc3RyYWludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAvKiBDYXB0dXJlIHRoZSBuZXcgYWRqdXN0ZWQgc2l6ZSwgaGF2ZSB0byB1c2UgdGhlIGhhcmQgd2F5IGJlY2F1c2UgLmNsaWVudFdpZHRoIHJldHVybnNcbiAgICAgICAgICAgIGFuIGludGVnZXIgdmFsdWUsIHJhdGhlciB0aGFuIHRoZSBfYWN0dWFsXyB3aWR0aC4gU01ILiAqL1xuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFB1dCBldmVyeXRoaW5nIGJhY2tcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9IGNoaWxkQ2xhc3NlcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVET01Sb3cgPSBmdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLXJvdyc7XG4gICAgICAgICAgcm93LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG5cbiAgICByZXR1cm4gcm93O1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShhY3RpdmVDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0SW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2Uob2RkQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWV2ZW4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoZXZlbkNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1vZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBzZXQgX3dhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShsb2FkaW5nQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHRoaXMuX2RhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzb2x2ZWRWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSB0aGlzLl9kYXRhW2NvbHVtbnNbdGhpcy5faXRlcmF0b3JdLm1hcHBpbmddO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfeSc6IG1ldGFkYXRhLnksXG4gICAgICAgIGdldCB5KCkgeyByZXR1cm4gdGhpcy5feTsgfSxcbiAgICAgICAgc2V0IHkodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHRvIGhhdmUgdGhlIGNsYXNzZXMgYWRkZWQgYXV0b21hdGljYWxseVxuICAgIHJvd09iai5zZXRJbmRleCA9IG1ldGFkYXRhLnNldEluZGV4O1xuXG4gICAgLy8gU2V0dGluZyBpdCBzZXBhcmF0ZWx5IHNvIHRoZSBQcm9taXNlIGhhbmRsaW5nIGNhbiB0YWtlIHBsYWNlIGlmIG5lZWRlZC4uLlxuICAgIHJvd09iai5kYXRhID0gbWV0YWRhdGEuZGF0YTtcblxuICAgIHJldHVybiByb3dPYmo7XG59O1xuXG5jbGFzcyBUYWJsZVZpZXcge1xuICAgIHZhbGlkYXRlQ29sdW1uU2hhcGUoY29sdW1uKSB7XG4gICAgICAgIHJldHVybiAgICB0eXBlb2YgY29sdW1uLm1hcHBpbmcgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnJlc2l6YWJsZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sdW1uLnRpdGxlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi53aWR0aCAhPT0gJ3VuZGVmaW5lZCcgPyB0eXBlb2YgY29sdW1uLndpZHRoID09PSAnbnVtYmVyJyA6IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgICAgICBpZiAoIShjb25maWcud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB3cmFwcGVyYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBoZWFkZXJgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWcuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBib2R5YCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnWyd4LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnWyd5LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnWyd4LXNjcm9sbC1oYW5kbGUnXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB4LXNjcm9sbC1oYW5kbGVgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShjb25maWdbJ3ktc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5hcmlhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGFyaWFgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5jb2x1bW5zLmV2ZXJ5KHRoaXMudmFsaWRhdGVDb2x1bW5TaGFwZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgdmFsaWQgXFxgY29sdW1uc1xcYC4gVGhleSBzaG91bGQgYmUgb2JqZWN0cyBjb25mb3JtaW5nIHRvOiB7XG4gICAgICAgICAgICAgICAgbWFwcGluZzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgICAgICB9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aHJvdHRsZUludGVydmFsICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0aHJvdHRsZUludGVydmFsYDsgaXQgc2hvdWxkIGJlIGEgTnVtYmVyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcudG90YWxSb3dzICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGB0b3RhbFJvd3NgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5nZXRSb3cgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgZ2V0Um93YDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5yb3dDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcm93Q2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5jZWxsQ2xpY2tGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNlbGxDbGlja0Z1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmMgPSB7Li4uY29uZmlnfTtcblxuICAgICAgICAvLyBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5jLmNvbHVtbnMgPSB0aGlzLmMuY29sdW1ucyB8fCBbXTtcbiAgICAgICAgdGhpcy5jLmdldFJvdyA9IHRoaXMuYy5nZXRSb3cgfHwgbm9vcDtcbiAgICAgICAgdGhpcy5jLnJvd0NsaWNrRnVuYyA9IHRoaXMuYy5yb3dDbGlja0Z1bmMgfHwgbm9vcDtcbiAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMgPSB0aGlzLmMuY2VsbENsaWNrRnVuYyB8fCBub29wO1xuICAgICAgICB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCA9IHRoaXMuYy50aHJvdHRsZUludGVydmFsIHx8IDMwMDtcbiAgICAgICAgdGhpcy5jLnRvdGFsUm93cyA9IHRoaXMuYy50b3RhbFJvd3MgfHwgMDtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29uZmlndXJhdGlvbih0aGlzLmMpO1xuXG4gICAgICAgIHRoaXMuX2NvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fcm93cyA9IFtdO1xuICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WSA9IFtdO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hTdGFydCA9IHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoTW92ZSA9IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCA9IHRoaXMuaGFuZGxlTW92ZUludGVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbiA9IHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQgPSB0aGlzLmhhbmRsZUNvbHVtbkF1dG9FeHBhbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSA9IHRoaXMuaGFuZGxlV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fYm9keSA9IHRoaXMuYy5ib2R5O1xuICAgICAgICB0aGlzLl9ib2R5X3MgPSB0aGlzLl9ib2R5LnN0eWxlO1xuICAgICAgICB0aGlzLl9oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLl9oZWFkZXJfcyA9IHRoaXMuX2hlYWRlci5zdHlsZTtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZV9zID0gdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZV9zID0gdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5zdHlsZTtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlTW92ZUludGVudCk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlRHJhZ01vdmUpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuXG4gICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgdGhpcy5fYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG4gICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5oYW5kbGVDb2x1bW5BdXRvRXhwYW5kKTtcblxuICAgICAgICB0aGlzLl9ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9YU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWVNjcm9sbFRyYWNrTG9jYXRpb24pO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG5cbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIC8vIHJlbGVhc2Ugbm9kZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jW2tleV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuX3ggPSB0aGlzLl95ID0gMDtcbiAgICAgICAgdGhpcy5fbmV4dFggPSB0aGlzLl9uZXh0WSA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gdGhpcy5fbGFzdFlTY3JvbGwgPSAwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IC0xO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuX2l0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZHJhZ1RpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9mYXV4RXZlbnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMuX3RvdWNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVggPSB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IDA7XG5cbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpO1xuICAgIH1cblxuICAgIGVtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLl9jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2hlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5faGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG5cbiAgICAgICAgdGhpcy5jLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5fY29sdW1ucy5wdXNoKGNyZWF0ZUhlYWRlckNlbGwoY29sdW1uKSkpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IGNzO1xuXG4gICAgICAgIHRoaXMuX2NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLl9mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hcHBlbmRDaGlsZCh0aGlzLl9mcmFnbWVudCk7XG5cbiAgICAgICAgLy8gbXVzdCBiZSBkb25lIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGluamVjdGVkIGludG8gdGhlIERPTVxuICAgICAgICB0aGlzLmNvbXB1dGVNaW5NYXhIZWFkZXJDZWxsRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLl9yb3dzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2JvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLmMuZ2V0Um93KDApLFxuICAgICAgICAgICAgc2V0SW5kZXg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLl9jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCgwKTtcblxuICAgICAgICB0aGlzLl9ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3Jvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDE7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1JlbmRlcjsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLl9pdGVyYXRvciksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuX2l0ZXJhdG9yLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuX2NlbGxfaCAqIHRoaXMuX2l0ZXJhdG9yLFxuICAgICAgICAgICAgfSwgdGhpcy5fY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5wdXNoKHRoaXMuX2l0ZXJhdG9yKTtcblxuICAgICAgICAgICAgdGhpcy5fZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5fcm93c1t0aGlzLl9pdGVyYXRvcl0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2ZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsSGVpZ2h0KCkge1xuICAgICAgICB0aGlzLl9jZWxsX2ggPSB0aGlzLl9yb3dzWzBdLmNlbGxzWzBdLm5vZGUuY2xpZW50SGVpZ2h0IHx8IDQwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxXaWR0aHMoKSB7XG4gICAgICAgIHRoaXMuX3Jvd3NbMF0uY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoID0gdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGggfHwgY2VsbC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYQm91bmQoKSB7XG4gICAgICAgIHRoaXMuX3Jvd193ID0gdGhpcy5fcm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5feE1heGltdW0gPSAgIHRoaXMuX2NvbnRhaW5lcl93IDw9IHRoaXMuX3Jvd193XG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9jb250YWluZXJfdyAtIHRoaXMuX3Jvd193XG4gICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgPSAwO1xuICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCA9IHRoaXMuX2NvbnRhaW5lcl9oIC0gKHRoaXMuX25Sb3dzVG9SZW5kZXIgKiB0aGlzLl9jZWxsX2gpO1xuICAgIH0gLy8gZG8gbm90IHJ1biB0aGlzIHVubGVzcyByZWJ1aWxkaW5nIHRoZSB0YWJsZSwgZG9lcyBub3QgcHJlc2VydmUgY3VycmVudCBtaW4vbWF4IHRocmVzaG9sZHNcblxuICAgIGNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA9IHRoaXMuX2NvbnRhaW5lcl93IC0gTWF0aC5hYnModGhpcy5feE1heGltdW0pO1xuXG4gICAgICAgIGlmICh0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IHRoaXMuX2NvbnRhaW5lcl9oICogKHRoaXMuX25Sb3dzVG9SZW5kZXIgLyB0aGlzLmMudG90YWxSb3dzKTtcblxuICAgICAgICBpZiAodGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplU2Nyb2xsQmFycygpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbFRyYWNrX3cgPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl95U2Nyb2xsVHJhY2tfaCA9IHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3Mud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLl9jb250YWluZXJfaCA9IHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl93ID0gdGhpcy5jLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5fY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyBtYXkgYmUgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGRhdGEsIHNvIHdlIG5lZWQgdG8gcmVidWlsZCAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKGNvbmZpZyA9IHRoaXMuYykge1xuICAgICAgICB0aGlzLmMgPSB7Li4uY29uZmlnfTtcblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0Rmlyc3RSb3coKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsV2lkdGhzKCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9SZW5kZXIgPSBNYXRoLmNlaWwoKHRoaXMuX2NvbnRhaW5lcl9oICogMS4zKSAvIHRoaXMuX2NlbGxfaCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9SZW5kZXIgPiB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvUmVuZGVyID0gdGhpcy5jLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCA9IHRoaXMuX25Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgdGhpcy5pbmplY3RIZWFkZXJDZWxscygpO1xuICAgICAgICB0aGlzLmluamVjdFJlc3RPZlJvd3MoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxEb3duKCkge1xuICAgICAgICBpZiAoICAgdGhpcy5fcm93RW5kSW5kZXggPT09IHRoaXMuYy50b3RhbFJvd3NcbiAgICAgICAgICAgIHx8IHRoaXMuX25leHRZID49IHRoaXMuX3lMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBsb3dlc3QgWSB2YWx1ZSB0byB0aGUgeUxvd2VyQm91bmQgYW5kIHJlcXVlc3QgdGhlIG5leHQgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX25leHRZIC0gdGhpcy5feUxvd2VyQm91bmQpIC8gdGhpcy5fY2VsbF9oXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCArIHRoaXMuX3Jvd0VuZEluZGV4ICsgMSA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5jLnRvdGFsUm93cyAtIHRoaXMuX3Jvd0VuZEluZGV4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5fblJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kIC09IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggKz0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCArPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvU2hpZnQ7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dFbmRJbmRleCArIHRoaXMuX2l0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IHRoaXMuX3Jvd3NbdGhpcy5fcm93c09yZGVyZWRCeVlbMF1dO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMuX2RyYWdUaW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5fcm93c09yZGVyZWRCeVkuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCArPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kIC09IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbFVwKCkge1xuICAgICAgICBpZiAodGhpcy5fcm93U3RhcnRJbmRleCA9PT0gMCB8fCB0aGlzLl9uZXh0WSA8PSB0aGlzLl95VXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGhpZ2hlc3QgWSB2YWx1ZSB0byB0aGUgeVVwcGVyQm91bmQgYW5kIHJlcXVlc3QgdGhlIHByZXZpb3VzIHJvdy4gU2NhbGUgYXBwcm9wcmlhdGVseSBpZiBhIGJpZyBkZWx0YSBhbmQgbWlncmF0ZSBhcyBtYW55IHJvd3MgYXMgYXJlIG5lY2Vzc2FyeS4gKi9cblxuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl9uZXh0WSAtIHRoaXMuX3lVcHBlckJvdW5kKSAvIHRoaXMuX2NlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5fblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fcm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5fblJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvU2hpZnQ7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5faXRlcmF0b3IgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSB0aGlzLl9yb3dzW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVlbdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XVxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMuX2RyYWdUaW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnVuc2hpZnQodGhpcy5fcm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3RvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IHRoaXMuX3RvdWNoLnBhZ2VZO1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIHdlIGhhbmRsZSB0b3VjaG1vdmUgYnkgZGV0ZWN0aW5nIHRoZSBkZWx0YSBvZiBwYWdlWC9ZIGFuZCBmb3J3YXJkaW5nXG4gICAgICAgIGl0IHRvIGhhbmRsZU1vdmVJbnRlbnQoKSAqL1xuXG4gICAgICAgIHRoaXMuX3RvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuXG4gICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSB0aGlzLl9sYXN0VG91Y2hQYWdlWCAtIHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gdGhpcy5fbGFzdFRvdWNoUGFnZVkgLSB0aGlzLl90b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IHRoaXMuX3RvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZU1vdmVJbnRlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoKGV2ZW50LmRlbHRhWCA9PT0gMCAmJiBldmVudC5kZWx0YVkgPT09IDApXG4gICAgICAgICAgICB8fCB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgJiYgZXZlbnQuZGVsdGFZID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5pbXVtIHRyYW5zbGF0aW9uIHNob3VsZCBiZSBvbmUgcm93IGhlaWdodFxuICAgICAgICB0aGlzLl9kZWx0YVggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gZXZlbnQuZGVsdGFNb2RlID09PSAxID8gcGFyc2VJbnQoZXZlbnQuZGVsdGFZLCAxMCkgKiB0aGlzLl9jZWxsX2ggOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMuX3ggLSB0aGlzLl9kZWx0YVg7XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRYID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRYIDwgdGhpcy5feE1heGltdW0pIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5feE1heGltdW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA/IDAgOiB0aGlzLl95IC0gdGhpcy5fZGVsdGFZO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsRG93bigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WSA+IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX3lMb3dlckJvdW5kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WCkgLyAodGhpcy5fcm93X3cgLSB0aGlzLl9jb250YWluZXJfdykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAodGhpcy5feFNjcm9sbFRyYWNrX3cgLSB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uICsgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPiB0aGlzLl94U2Nyb2xsVHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl94U2Nyb2xsVHJhY2tfdyAtIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubmV4dFkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WSkgLyAoKHRoaXMuYy50b3RhbFJvd3MgKiB0aGlzLl9jZWxsX2gpIC0gdGhpcy5fY29udGFpbmVyX2gpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKHRoaXMuX3lTY3JvbGxUcmFja19oIC0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiArIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplID4gdGhpcy5feVNjcm9sbFRyYWNrX2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gdGhpcy5feVNjcm9sbFRyYWNrX2ggLSB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpOyAvLyBEbyBhbGwgdHJhbnNmb3JtcyBncm91cGVkIHRvZ2V0aGVyXG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSB0aGlzLl9uZXh0WDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLl9uZXh0WTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGVyZm9ybVRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl9uZXh0WCk7XG4gICAgICAgIHRoaXMuX2JvZHlfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX25leHRYLCB0aGlzLl9uZXh0WSk7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09ICd1aS10YWJsZS14LXNjcm9sbC10cmFjaycpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5jLndyYXBwZXIub2Zmc2V0TGVmdCAtIHRoaXMuX2xhc3RYU2Nyb2xsO1xuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gMDtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcblxuICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IGV2ZW50LmxheWVyWDtcbiAgICB9XG5cbiAgICBoYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9ICgoZXZlbnQucGFnZVkgLSB0aGlzLmMud3JhcHBlci5vZmZzZXRUb3AgLSB0aGlzLl9sYXN0WVNjcm9sbCkgLyB0aGlzLl9jb250YWluZXJfaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5jLnRvdGFsUm93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2ZhdXhFdmVudCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5sYXllclk7XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2xlZnRCdXR0b25QcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2xlZnRCdXR0b25QcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5fZHJhZ1RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZHJhZ1RpbWVyKTsgfVxuXG4gICAgICAgIHRoaXMuX2RyYWdUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdUaW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8qIE5vdyBmZXRjaCwgb25jZSBkcmFnIGhhcyBjZWFzZWQgZm9yIGxvbmcgZW5vdWdoLiAqL1xuICAgICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5jLmdldFJvdyhyb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gKChldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdFlTY3JvbGwpIC8gdGhpcy5fY29udGFpbmVyX2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLmMudG90YWxSb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1gpIHtcblxuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0WFNjcm9sbDtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVkgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kKCkge1xuICAgICAgICB0aGlzLl9sZWZ0QnV0dG9uUHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGVmdEJ1dHRvblByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG5cbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBmaW5kV2hlcmUodGhpcy5fY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHdpZHRoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbHVtbnMuaW5kZXhPZih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uKTtcbiAgICAgICAgbGV0IGFkanVzdGVkRGVsdGEgPSBkZWx0YTtcblxuICAgICAgICBpZiAoICAgYWRqdXN0ZWREZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgJiYgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPCB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggKyBhZGp1c3RlZERlbHRhID4gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGggLSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGluZGV4LCB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YSk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWREZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhdXhFdmVudC5kZWx0YVggPSBhZGp1c3RlZERlbHRhO1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uQXV0b0V4cGFuZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGZpbmRXaGVyZSh0aGlzLl9jb2x1bW5zLCAnbWFwcGluZycsIG1hcHBpbmcpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLl9jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEocm93LmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSAmJiByb3cuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdLnRydWVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoIDwgY2VsbFdpZHRoID8gY2VsbFdpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8qIGZpbmQgdGhlIHJlbmRlcmVkIHJvdyB3aXRoIHRoZSBsb25nZXN0IGNvbnRlbnQgZW50cnkgKi9cblxuICAgICAgICAgICAgdGhpcy5hcHBseU5ld0NvbHVtbldpZHRoKGNvbHVtbkluZGV4LCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5jLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXgpO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdzZXRJbmRleCcsIHRoaXMuX2FjdGl2ZVJvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5fbmV4dEFjdGl2ZVJvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5fbmV4dEFjdGl2ZVJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLl9jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgPiB0aGlzLl95KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLl9uZXh0QWN0aXZlUm93LnkgKiAtMSAtIHRoaXMuX2NlbGxfaCA8IHRoaXMuX3kgLSB0aGlzLl9jb250YWluZXJfaCArIHRoaXMuX2NlbGxfaCkgLy8gMSB1bml0IG9mIGNlbGxIZWlnaHQgaXMgcmVtb3ZlZCB0byBjb21wZW5zYXRlIGZvciB0aGUgaGVhZGVyIHJvd1xuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gdGhpcy5fY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZmF1eEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuX2FjdGl2ZVJvdyA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuX2FjdGl2ZVJvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93blxuICAgICAgICAgICAgICAgIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fZmF1eEV2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9mYXV4RXZlbnQuZGVsdGFZID0gKCAgICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA+IHRoaXMuX2FjdGl2ZVJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fYWN0aXZlUm93IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPCB0aGlzLl9hY3RpdmVSb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX2FjdGl2ZVJvdyAtIHRoaXMuX3Jvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9mYXV4RXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5IHx8IHRoaXMuZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3RpdmVSb3coLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVSb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdzZXRJbmRleCcsIHRoaXMuX2FjdGl2ZVJvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5fY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY292ZXJDZWxsQW5kUm93Tm9kZXModGFyZ2V0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0O1xuICAgICAgICBjb25zdCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnbm9kZScsIG1hcC5yb3cpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyhyb3cuc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobWFwLmNlbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuY2VsbENsaWNrRnVuYyhldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVZpZXc7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgYWRkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0IHsuLi5kZXNjZW5kYW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRva2VuaXplZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgdG9rZW5zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJVG9rZW5pemVkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgdG9rZW5zOiBbXSxcbiAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRva2VuaXplZElucHV0O1xuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRvb2x0aXAucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICBBRlRFUjogJ0FGVEVSJyxcbn07XG5cblVJVG9vbHRpcC5wcm9wVHlwZXMgPSB7XG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUb29sdGlwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb29sdGlwO1xuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmlucHV0O1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMucmVmcy5pbnB1dC52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX2ZvY3VzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX2ZvY3VzSW5wdXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBgZm9jdXNJbnB1dCgpYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4gUGxlYXNlIHVzZSBVSVR5cGVhaGVhZElucHV0LmZvY3VzKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJJbnB1dDogbmV3VmFsdWUgfSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkX3NldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9zZXRWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IGBzZXRWYWx1ZSh0ZXh0KWAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuIFBsZWFzZSB1c2UgVUlUeXBlYWhlYWRJbnB1dC52YWx1ZSh0ZXh0KSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXJrRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWFya0Z1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMSA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMoLi4uYXJncykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYWxnb3JpdGhtKSB7XG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcblxuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hdGNoRnVuYykge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWF0Y2hGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcklucHV0OiBldmVudC50YXJnZXQudmFsdWV9LCAoKSA9PiB0aGlzLmNvbXB1dGVNYXRjaGVzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbnRpdHkuY2xhc3NOYW1lXTogISFlbnRpdHkuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudGl0eS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUudXNlcklucHV0LCBlbnRpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgdHlwZT17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0Lm1vZGUgPSB7XG4gICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAnRlVaWlknOiAnRlVaWlknLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgYWxnb3JpdGhtOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgXSksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9KSxcbiAgICBdKSxcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Db21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlIaWdobGlnaHRlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVHlwZWFoZWFkSW5wdXQ7XG4iLCIvKipcbiAqIFNlYXJjaGVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYW4gYXJyYXkgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvZmluZFdoZXJlXG4gKi9cblxubGV0IF9maW5kV2hlcmVJbmRleCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtICB7QXJyYXlbT2JqZWN0XX0gYXJyYXkgICAgIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIHByb3BlcnR5ICB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgdmFsdWUgICAgIHRoZSB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0ICh1c2VzIHN0cmljdCBlcXVhbGl0eSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfSBUaGUgbWF0Y2hlZCBhcnJheSBpdGVtLCBvciBub3RoaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIF9maW5kV2hlcmVJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoX2ZpbmRXaGVyZUluZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5W19maW5kV2hlcmVJbmRleF1bcHJvcGVydHldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W19maW5kV2hlcmVJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBfZmluZFdoZXJlSW5kZXggLT0gMTtcbiAgICB9XG59IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5pY29uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWcub25DbGljayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24gdmFsaWRhdGVBcnJheUl0ZW1FeGlzdHMoaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL3RyYW5zZm9ybVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgbGV0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL1VJVXRpbHMvc2hhbGxvd0VxdWFsJztcblxuLyoqXG4gKiBBbiBhdWdtZW50ZWQgdmVyc2lvbiBvZiBgUmVhY3QuQ29tcG9uZW50YCB3aXRoIHNvbWUgaGVscGZ1bCBhYnN0cmFjdGlvbnMgYWRkZWQgdG8gc21vb3RoXG4gKiB0aGUgY29tcG9uZW50IGRldmVsb3BtZW50IHByb2Nlc3MuXG4gKlxuICogQWxsIFVJS2l0IGNvbXBvbmVudHMgYXJlIGJhc2VkIG9uIFVJVmlldy5cbiAqXG4gKiBAYXVnbWVudHMge1JlYWN0LkNvbXBvbmVudH1cbiAqL1xuY2xhc3MgVUlWaWV3IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgZGF0YSBwYXNzZWQgb24gdG8gdGhlIGVuZCBjb21wb25lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZSA/IHRoaXMuaW5pdGlhbFN0YXRlKCkgOiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHByb3hpbWF0ZXMgdGhlIEBsaW5re1B1cmVSZW5kZXJNaXhpbiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWx9IGZyb20gRVM1IFJlYWN0LiBJbXBsZW1lbnQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIGluIHlvdXIgc3ViY2xhc3MgdG8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIGluY29taW5nIHByb3BzIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHByb3BzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgdGhlIGluY29taW5nIHN0YXRlIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgSW5mb3JtcyBSZWFjdCB0byByZS1yZW5kZXIgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICogICAgIC8vIHNvbWUgbG9naWMgaGVyZSwgZXZlbnR1YWxseSBgcmV0dXJuYCB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgIC8vIGN1cnJlbnQgcHJvcHMgJiBzdGF0ZSBhcmUgYXZhaWxhYmxlIGZvciBjb21wYXJpc29uIGF0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgXG4gICAgICogfVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gIXNoYWxsb3dFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8ICFzaGFsbG93RXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLnV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gICAgICovXG4gICAgdXVpZCgpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbXVsYXRlcyB0aGUgKG5vdyByZW1vdmVkKSBSZWFjdCBpbnRlcmZhY2UgYGdldEluaXRpYWxTdGF0ZWAuIEl0J3MgYSBjb252ZW5pZW5jZSwgYnV0IGFsbG93c1xuICAgICAqIGZvciB0aGlzIGZ1bmN0aW9uYWxpdHkgdG8gd29yayB3aXRob3V0IGhhdmluZyB0byBwcm92aWRlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBuYW1lIFVJVmlldyNpbml0aWFsU3RhdGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaW5pdGlhbFN0YXRlKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBVSVZpZXc7XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcbmdsb2JhbC5VSUtpdC5VSVV0aWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uOiAoZ2xvYmFsLlVJS2l0LlVJQXJyb3dLZXlOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9VSUFycm93S2V5TmF2aWdhdGlvbicpLmRlZmF1bHQpLFxuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUGFnaW5hdGVkVmlldzogKGdsb2JhbC5VSUtpdC5VSVBhZ2luYXRlZFZpZXcgPSByZXF1aXJlKCcuL1VJUGFnaW5hdGVkVmlldycpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVXRpbHM6IHtcbiAgICAgICAgbm90aWZ5OiAoZ2xvYmFsLlVJS2l0LlVJVXRpbHMubm90aWZ5ID0gcmVxdWlyZSgnLi9VSVV0aWxzL25vdGlmeScpLmRlZmF1bHQpLFxuICAgIH0sXG4gICAgVUlWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJVmlldyA9IHJlcXVpcmUoJy4vVUlWaWV3JykuZGVmYXVsdCksXG59O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIl19
