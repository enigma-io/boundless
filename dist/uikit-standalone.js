require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

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

},{"../UIView":25}],2:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],3:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],4:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require('../UICheckbox');

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UICheckbox":3,"../UIUtils/noop":21,"../UIView":25,"classnames":26}],5:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],6:[function(require,module,exports){
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

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

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

},{"../UIView":25,"classnames":26}],7:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],8:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

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

},{"../UIDialog":5,"../UIView":25,"classnames":26}],9:[function(require,module,exports){
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

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require('../UISegmentedControl');

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require('../UIArrowKeyNavigation');

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIArrowKeyNavigation":1,"../UISegmentedControl":15,"../UIUtils/noop":21,"../UIView":25,"./item":10,"classnames":26}],10:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

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

},{"../UIView":25,"classnames":26}],11:[function(require,module,exports){
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

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

var _classnames = require('classnames');

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

},{"../UIDialog":5,"../UIUtils/transform":24,"../UIView":25,"classnames":26}],12:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

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

},{"../UIButton":2,"../UIView":25,"classnames":26}],13:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],14:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26}],15:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UIButton":2,"../UIUtils/noop":21,"../UIView":25,"classnames":26}],16:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _findWhere = require('../UIUtils/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A high-performance, infinite table view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
 * At some point, the internals will probably be fully-separated into its own module such that it can
 * be embedded in other places without React.
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

                if (this._data instanceof Promise) {
                    this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                        if (this._data === promise) {
                            this.data = resolvedVal;
                        }
                    }.bind(this, this._data));

                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    this._waitingForResolution = true;
                } else if (this._data) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                    }

                    this._waitingForResolution = false;
                } else {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    this._waitingForResolution = false;
                }
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

var UITable = function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITable)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this._columns = [];
        _this._rows = [];
        _this._rowsOrderedByY = [];

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);

        _this.handleTouchStart = _this.handleTouchStart.bind(_this);
        _this.handleTouchMove = _this.handleTouchMove.bind(_this);
        _this.handleMoveIntent = _this.handleMoveIntent.bind(_this);

        _this.handleXScrollHandleDragStart = _this.handleXScrollHandleDragStart.bind(_this);
        _this.handleYScrollHandleDragStart = _this.handleYScrollHandleDragStart.bind(_this);
        _this.handleDragMove = _this.handleDragMove.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleColumnDragStart = _this.handleColumnDragStart.bind(_this);

        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        return _this;
    }

    _createClass(UITable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._body = this.refs.body;
            this._body_s = this._body.style;
            this._header = this.refs.header;
            this._header_s = this._header.style;
            this._xScrollHandle_s = this.refs['x-scroll-handle'].style;
            this._yScrollHandle_s = this.refs['y-scroll-handle'].style;

            this.regenerate();

            this.refs.wrapper.addEventListener('wheel', this.handleMoveIntent);
            this.refs.wrapper.addEventListener('mousemove', this.handleDragMove);
            this.refs.wrapper.addEventListener('touchstart', this.handleTouchStart);
            this.refs.wrapper.addEventListener('touchmove', this.handleTouchMove);

            this.refs.wrapper.addEventListener('keydown', this.handleKeyDown);

            this._header.addEventListener('mousedown', this.handleColumnDragStart);
            this._body.addEventListener('click', this.handleClick);

            this.refs['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.refs['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

            window.addEventListener('resize', this.handleWindowResize);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.refs.wrapper.removeEventListener('mousemove', this.handleDragMove);
            this.refs.wrapper.removeEventListener('touchstart', this.handleTouchStart);
            this.refs.wrapper.removeEventListener('touchmove', this.handleTouchMove);

            this.refs.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this._header.removeEventListener('mousedown', this.handleColumnDragStart);
            this._body.removeEventListener('click', this.handleClick);

            this.refs['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.refs['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

            window.removeEventListener('resize', this.handleWindowResize);

            this.emptyHeader();
            this.emptyBody();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.regenerate();
        }
    }, {
        key: 'resetInternals',
        value: function resetInternals() {
            this._x = this._y = 0;
            this._nextX = this._nextY = 0;
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

            this._dragEvent = { preventDefault: _noop2.default };

            this._touchEvent = { preventDefault: _noop2.default };
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

            this.props.columns.forEach(function (column) {
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
                data: this.props.getRow(0),
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
                    data: this.props.getRow(this._iterator),
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
            this._yScrollHandleSize = this._container_h * (this._nRowsToRender / this.props.totalRows);

            if (this._yScrollHandleSize < 12) {
                this._yScrollHandleSize = 12;
            }

            return this._yScrollHandleSize;
        }
    }, {
        key: 'initializeScrollBars',
        value: function initializeScrollBars() {
            this._xScrollTrack_w = this.refs['x-scroll-track'].clientWidth || 500;
            this._yScrollTrack_h = this.refs['y-scroll-track'].clientHeight || 150;
            this._xScrollHandle_s.width = this.calculateXScrollHandleSize() + 'px';
            this._yScrollHandle_s.height = this.calculateYScrollHandleSize() + 'px';
        }
    }, {
        key: 'calculateContainerDimensions',
        value: function calculateContainerDimensions() {
            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */
            this._container_h = this.refs.wrapper.clientHeight || 150;
            this._container_w = this.refs.wrapper.clientWidth || 500;
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            if (this.refs.wrapper.clientHeight !== this._container_h) {
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
            this.resetInternals();
            this.calculateContainerDimensions();

            this.buildColumns();
            this.injectFirstRow();
            this.calculateCellWidths();
            this.calculateCellHeight();

            this._nRowsToRender = Math.ceil(this._container_h * 1.3 / this._cell_h);

            if (this._nRowsToRender > this.props.totalRows) {
                this._nRowsToRender = this.props.totalRows;
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
            if (this._rowEndIndex === this.props.totalRows || this._nextY >= this._yLowerBound) {
                return;
            }

            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._nextY - this._yLowerBound) / this._cell_h);

            if (this._nRowsToShift + this._rowEndIndex + 1 > this.props.totalRows) {
                /* more rows than there is data available, truncate */
                this._nRowsToShift = this.props.totalRows - this._rowEndIndex + 1;
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

                        this._rowPointer.data = this.props.getRow(this._targetIndex);
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

                        this._rowPointer.data = this.props.getRow(this._targetIndex);
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

            this._touchEvent.deltaX = this._lastTouchPageX - this._touch.pageX;
            this._touchEvent.deltaY = this._lastTouchPageY - this._touch.pageY;

            this._lastTouchPageX = this._touch.pageX;
            this._lastTouchPageY = this._touch.pageY;

            this.handleMoveIntent(this._touchEvent);
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
                    _this5._yScrollHandlePosition = Math.abs(_this5._nextY) / (_this5.props.totalRows * _this5._cell_h - _this5._container_h) * (_this5._yScrollTrack_h - _this5._yScrollHandleSize);

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
        key: 'handleXScrollHandleDragStart',
        value: function handleXScrollHandleDragStart(event) {
            if (event.button === 0) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._lastXScroll = event.clientX;
                this._manuallyScrollingX = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleYScrollHandleDragStart',
        value: function handleYScrollHandleDragStart(event) {
            if (event.button === 0) {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                this._lastYScroll = event.clientY;
                this._manuallyScrollingY = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
            if (event.button === 0) {
                if (this._manuallyResizingColumn) {
                    this.handleColumnResize(event.clientX - this._lastColumnX);

                    this._lastColumnX = event.clientX;
                }

                if (this._manuallyScrollingX) {
                    this._dragEvent.deltaX = event.clientX - this._lastXScroll;
                    this._dragEvent.deltaY = 0;

                    this.handleMoveIntent(this._dragEvent);

                    this._lastXScroll = event.clientX;
                }

                if (this._manuallyScrollingY) {
                    this._dragEvent.deltaX = 0;
                    this._dragEvent.deltaY = (event.clientY - this._lastYScroll) / this._container_h * this.props.totalRows * this._cell_h;

                    this.handleMoveIntent(this._dragEvent);

                    this._lastYScroll = event.clientY;
                }
            }
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
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

                this._lastColumnX = event.clientX;

                this._manuallyResizingColumn = (0, _findWhere2.default)(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);
            }
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this6 = this;

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

            // Adjust the column header cell
            this._manuallyResizingColumn.width = this._manuallyResizingColumn.width + adjustedDelta;

            // Adjust the corresponding row cells
            this._rows.forEach(function (row) {
                return row.cells[index].width = _this6._manuallyResizingColumn.width;
            });

            this.calculateXBound();
            this.initializeScrollBars();

            /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
            we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
            if (adjustedDelta < 0) {
                this._dragEvent.deltaX = adjustedDelta;
                this._dragEvent.deltaY = 0;

                this.handleMoveIntent(this._dragEvent);
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
            this.refs.aria.innerText = text;
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
            var _this7 = this;

            this._nextActiveRow = (0, _findWhere2.default)(this._rows, 'setIndex', this._activeRow + delta);

            if (this._nextActiveRow) {
                this.setActiveRow(this._nextActiveRow.setIndex);
                this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

                if (delta === -1 && this._nextActiveRow.y * -1 > this._y || delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this._dragEvent.deltaX = 0;
                        this._dragEvent.deltaY = this._cell_h * delta;

                        this.handleMoveIntent(this._dragEvent);
                    }
            } else if (delta === -1 && this._activeRow > 0 || delta === 1 && this._activeRow < this.props.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this._dragEvent.deltaX = 0;
                this._dragEvent.deltaY = (this._rowStartIndex > this._activeRow && this._activeRow - this._rowStartIndex || (this._rowStartIndex < this._activeRow && this._activeRow - this._rowStartIndex) + delta) * this._cell_h;

                this.handleMoveIntent(this._dragEvent);

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this7.changeActiveRow(delta);
                });
            }

            this._nextActiveRow = null;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this8 = this;

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
                            var row = (0, _findWhere2.default)(_this8._rows, 'setIndex', _this8._activeRow).data;

                            _this8.setAriaText(_this8._columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }
                    event.preventDefault();
                    break;
            }

            if (typeof this.props.onKeyDown === 'function') {
                this.props.onKeyDown(event);
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
                    this.props.onCellInteract(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                this.props.onRowInteract(event, row.setIndex);
            }
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
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: _noop2.default,
    offscreenClass: 'ui-offscreen',
    onCellInteract: _noop2.default,
    onRowInteract: _noop2.default,
    totalRows: 0
};

exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/findWhere":20,"../UIUtils/noop":21,"../UIUtils/transform":24,"../UIView":25}],17:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require('../UITypeaheadInput');

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

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

},{"../UITypeaheadInput":19,"../UIUtils/noop":21,"../UIView":25,"classnames":26}],18:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

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

},{"../UIView":25,"classnames":26}],19:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

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

            if (this.state.selectedEntityIndex !== prevState.selectedEntityIndex && this.state.selectedEntityIndex >= 0) {
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

},{"../UIUtils/noop":21,"../UIView":25,"classnames":26,"escape-string-regexp":27}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _shallowEqual = require('../UIUtils/shallowEqual');

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

},{"../UIUtils/shallowEqual":23}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],"enigma-uikit":[function(require,module,exports){
(function (global){
'use strict';

/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

global.UIKit = {};
global.UIKit.UIUtils = {};

module.exports = {
    UIArrowKeyNavigation: global.UIKit.UIArrowKeyNavigation = require('./UIArrowKeyNavigation').default,
    UIButton: global.UIKit.UIButton = require('./UIButton').default,
    UICheckbox: global.UIKit.UICheckbox = require('./UICheckbox').default,
    UICheckboxGroup: global.UIKit.UICheckboxGroup = require('./UICheckboxGroup').default,
    UIDialog: global.UIKit.UIDialog = require('./UIDialog').default,
    UIFittedText: global.UIKit.UIFittedText = require('./UIFittedText').default,
    UIImage: global.UIKit.UIImage = require('./UIImage').default,
    UIModal: global.UIKit.UIModal = require('./UIModal').default,
    UIPaginatedView: global.UIKit.UIPaginatedView = require('./UIPaginatedView').default,
    UIPopover: global.UIKit.UIPopover = require('./UIPopover').default,
    UIProgress: global.UIKit.UIProgress = require('./UIProgress').default,
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require('./UIProgressiveDisclosure').default,
    UIRadio: global.UIKit.UIRadio = require('./UIRadio').default,
    UISegmentedControl: global.UIKit.UISegmentedControl = require('./UISegmentedControl').default,
    UITable: global.UIKit.UITable = require('./UITable').default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require('./UITokenizedInput').default,
    UITooltip: global.UIKit.UITooltip = require('./UITooltip').default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require('./UITypeaheadInput').default,
    UIUtils: {
        notify: global.UIKit.UIUtils.notify = require('./UIUtils/notify').default
    },
    UIView: global.UIKit.UIView = require('./UIView').default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./UIArrowKeyNavigation":1,"./UIButton":2,"./UICheckbox":3,"./UICheckboxGroup":4,"./UIDialog":5,"./UIFittedText":6,"./UIImage":7,"./UIModal":8,"./UIPaginatedView":9,"./UIPopover":11,"./UIProgress":12,"./UIProgressiveDisclosure":13,"./UIRadio":14,"./UISegmentedControl":15,"./UITable":16,"./UITokenizedInput":17,"./UITooltip":18,"./UITypeaheadInput":19,"./UIUtils/notify":22,"./UIView":25}]},{},["enigma-uikit"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUFycm93S2V5TmF2aWdhdGlvbi9pbmRleC5qcyIsIlVJQnV0dG9uL2luZGV4LmpzIiwiVUlDaGVja2JveC9pbmRleC5qcyIsIlVJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIlVJRGlhbG9nL2luZGV4LmpzIiwiVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiVUlJbWFnZS9pbmRleC5qcyIsIlVJTW9kYWwvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaW5kZXguanMiLCJVSVBhZ2luYXRlZFZpZXcvaXRlbS5qcyIsIlVJUG9wb3Zlci9pbmRleC5qcyIsIlVJUHJvZ3Jlc3MvaW5kZXguanMiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIlVJUmFkaW8vaW5kZXguanMiLCJVSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCJVSVRhYmxlL2luZGV4LmpzIiwiVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIlVJVG9vbHRpcC9pbmRleC5qcyIsIlVJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCJVSVV0aWxzL2ZpbmRXaGVyZS9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvbm90aWZ5L2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybS9pbmRleC5qcyIsIlVJVmlldy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwiZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDSU0sb0JBQW9CO2NBQXBCLG9CQUFvQjs7QUFDdEIsYUFERSxvQkFBb0IsR0FDRDs7OzhCQURuQixvQkFBb0I7OzBD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ZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMobnVtQ2hpbGRyZW4gLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRGb2N1cyhuZXh0SW5kZXgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkQmx1cihpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRGb2N1cyhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBpbmRleH0pO1xuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbiAmJiBBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgfHwgaW5kZXgsXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnRhYkluZGV4IHx8IDAsXG4gICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUNoaWxkQmx1ci5iaW5kKHRoaXMsIGluZGV4KSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuXG5VSUFycm93S2V5TmF2aWdhdGlvbi5wcm9wVHlwZXMgPSB7XG4gICAgY29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgXSksXG59O1xuXG5VSUFycm93S2V5TmF2aWdhdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY29tcG9uZW50OiAnZGl2Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uO1xuIiwiaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICB0b2dnbGVTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlCdXR0b24ucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkNsaWNrOiBub29wLFxuICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICBvblVucHJlc3NlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQnV0dG9uO1xuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSgpIHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMubmFtZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmhhbmRsZUNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgbGV0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BjYl9pdGVtLm5hbWVgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGxldCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cyA9IHtcbiAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcbiAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQWxsVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RBbGxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgIF0pLFxufTtcblxuVUlDaGVja2JveEdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG4gICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94R3JvdXA7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlclVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgYm9keVVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlRm9jdXMgPSB0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrID0gdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgdGhpcy5yZWZzLmRpYWxvZy5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmb290ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hlYWRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgdGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuVUlEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHlQcm9wczoge30sXG4gICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICBoZWFkZXJQcm9wczoge30sXG4gICAgb25DbG9zZTogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRGlhbG9nO1xuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlID0gdGhpcy5yZXNjYWxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIHJlc2NhbGUoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICAgICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4odGhpcy5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlGaXR0ZWRUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbn07XG5cblVJRml0dGVkVGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlGaXR0ZWRUZXh0O1xuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZyB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBhbHQ9e251bGx9XG4gICAgICAgICAgICAgICAgIHNyYz17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlJbWFnZS5zdGF0dXMgPSB7XG4gICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5VSUltYWdlLnByb3BUeXBlcyA9IHtcbiAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlJbWFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2VQcm9wczoge30sXG4gICAgc3RhdHVzUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlJbWFnZTtcbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlNb2RhbCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkaWFsb2dTcGVjaWZpY1Byb3BzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWFzaydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi5kaWFsb2dTcGVjaWZpY1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJTW9kYWwucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICBtYXNrUHJvcHM6IHt9LFxuICAgIG1vZGFsUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlNb2RhbDtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRlZFZpZXdcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlQYWdpbmF0ZWRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5wYWdlclBvc2l0aW9uLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBudW1QYWdlVG9nZ2xlczogdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcyxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IHRoaXMucHJvcHMudG90YWxJdGVtcyxcbiAgICAgICAgICAgIGl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgICAgICAgICAgc2hvd25JdGVtczogW3tkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oMCl9XSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKSB7XG4gICAgICAgIGlmIChvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXModGhpcy5zdGF0ZS5jdXJyZW50UGFnZSl9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcyhjdXJyZW50UGFnZSkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnN0YXRlLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayh2YWx1ZSkge1xuICAgICAgICBsZXQgcGFnZU51bWJlcjtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMocGFnZU51bWJlciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uIHsuLi50aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93bkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlckNhc2UgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17J3NlZ21lbnRlZENvbnRyb2wnICsgKHBvc2l0aW9uTG93ZXJDYXNlWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyQ2FzZS5zbGljZSgxKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFsndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtJyArIHBvc2l0aW9uTG93ZXJDYXNlXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0ZWQtdmlldyc+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzID0ge1xuICAgIEZJUlNUOiAnRklSU1QnLFxuICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgIE5FWFQ6ICdORVhUJyxcbiAgICBMQVNUOiAnTEFTVCcsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQk9USDogJ0JPVEgnLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LnByb3BUeXBlcyA9IHtcbiAgICBnZXRJdGVtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsaXN0V3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEgfHwgcHJvcHMubnVtSXRlbXNQZXJQYWdlID4gcHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBwcm9wcy50b3RhbEl0ZW1zICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbnVtUGFnZVRvZ2dsZXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcGFnZXJQb3NpdGlvbjogZnVuY3Rpb24gdmFsaWRhdGVQYWdlclBvc2l0aW9uKHByb3BzKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5wYWdlclBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24pKSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93SnVtcFRvRmlyc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNob3dKdW1wVG9MYXN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdG90YWxJdGVtczogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBnZXRJdGVtOiBub29wLFxuICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6ICfCqyBGaXJzdCcsXG4gICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiAnTGFzdCDCuycsXG4gICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgbmV4dFBhZ2VDb250cm9sVGV4dDogJ05leHQg4oC6JyxcbiAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgIHBhZ2VyUG9zaXRpb246IDEsXG4gICAgcG9zaXRpb246IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBhZ2luYXRlZFZpZXc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVBhZ2luYXRlZFZpZXdJdGVtIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkYXRhOiBuZXh0UHJvcHMuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0SXRlbURhdGEocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IHZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1pdGVtLWV2ZW4nOiB0aGlzLnByb3BzLmV2ZW4sXG4gICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICBjbG9uZVdpdGhDbGFzc2VzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PjwvZGl2Pik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHsuLi50aGlzLnByb3BzLCBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEucHJvcHMuY2xhc3NOYW1lKX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmVXaXRoQ2xhc3Nlcyh0aGlzLnN0YXRlLmRhdGEpO1xuICAgIH1cbn1cblxuVUlQYWdpbmF0ZWRWaWV3SXRlbS5wcm9wVHlwZXMgPSB7XG4gICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUGFnaW5hdGVkVmlld0l0ZW07XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24gPSB0aGlzLmFsaWduLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduKCkge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy5ub2RlLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2cgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBvcG92ZXIucG9zaXRpb24gPSB7XG4gICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgTUlERExFOiAnTUlERExFJyxcbiAgICBFTkQ6ICdFTkQnLFxufTtcblxuVUlQb3BvdmVyLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBhbmNob3JYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZlhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbn07XG5cblVJUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQb3BvdmVyO1xuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b24gey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBsYWJlbD17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjYW5jZWxQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbn07XG5cblVJUHJvZ3Jlc3MucHJvcFR5cGVzID0ge1xuICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzO1xuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBvbkV4cGFuZDogbm9vcCxcbiAgICBvbkhpZGU6IG5vb3AsXG4gICAgdG9nZ2xlUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU7XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUmFkaW8ucHJvcFR5cGVzID0ge1xuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuVUlSYWRpby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVJhZGlvO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgYXJpYS1yZXF1aXJlZD0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4gdHlwZW9mIG9wdGlvbi52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuVUlTZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlTZWdtZW50ZWRDb250cm9sO1xuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGZpbmRXaGVyZSBmcm9tICcuLi9VSVV0aWxzL2ZpbmRXaGVyZSc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGFcbiAqIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0XG4gKiBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG4gKlxuICogVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGVcbiAqIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cbiAqXG4gKiBBdCBzb21lIHBvaW50LCB0aGUgaW50ZXJuYWxzIHdpbGwgcHJvYmFibHkgYmUgZnVsbHktc2VwYXJhdGVkIGludG8gaXRzIG93biBtb2R1bGUgc3VjaCB0aGF0IGl0IGNhblxuICogYmUgZW1iZWRkZWQgaW4gb3RoZXIgcGxhY2VzIHdpdGhvdXQgUmVhY3QuXG4gKlxuICogX19JbXBvcnRhbnQgTm90ZV9fXG4gKlxuICogQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLlxuICogSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG4gKi9cblxuLyoqXG4gKiBPUkRFUiBPRiBPUEVSQVRJT05TXG4gKlxuICogMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbiAqIDIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4gKiAzLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcbiAqXG4gKiBJZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW5cbiAqIHRyeWluZyB0byBkaWZmLlxuICovXG5cbmNvbnN0IGNlbGxDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1jZWxsXFxiL2c7XG5jb25zdCByb3dDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3dcXGIvZztcbmNvbnN0IGFjdGl2ZUNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1hY3RpdmUvZztcbmNvbnN0IGxvYWRpbmdDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctbG9hZGluZy9nO1xuY29uc3QgZXZlbkNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1ldmVuL2c7XG5jb25zdCBvZGRDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctb2RkL2c7XG5cbmNvbnN0IHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24gdHJhbnNsYXRlM0QoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDBweCknO1xufTsgLy8geiBpcyBuZXZlciB1c2VkXG5cbmNvbnN0IHJlcGFyZW50Q2VsbFRleHQgPSBmdW5jdGlvbiByZXBhcmVudENlbGxUZXh0KG5vZGUsIGNvbnRlbnQpIHtcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsLWlubmVyJztcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRleHROb2RlO1xufTtcblxuY29uc3QgY3JlYXRlRE9NQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbCc7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgY29udGVudCk7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJywgbWFwcGluZyk7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgcmVwYXJlbnRDZWxsVGV4dChjZWxsLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01IZWFkZXJDZWxsKGNvbHVtbiwgd2lkdGgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCk7XG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAoY29sdW1uLnJlc2l6YWJsZSkge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJztcblxuICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBjcmVhdGVIZWFkZXJDZWxsID0gZnVuY3Rpb24gY3JlYXRlSGVhZGVyQ2VsbChtZXRhZGF0YSwgd2lkdGgpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlRE9NSGVhZGVyQ2VsbChtZXRhZGF0YSwgbWV0YWRhdGEud2lkdGggfHwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19tZXRhZGF0YSc6IG1ldGFkYXRhLFxuICAgICAgICAnX3RpdGxlJzogbWV0YWRhdGEudGl0bGUsXG4gICAgICAgIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9LFxuICAgICAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl90aXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl90aXRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfd2lkdGgnOiBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCxcbiAgICAgICAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH0sXG4gICAgICAgIHNldCB3aWR0aCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHROb2RlID0gcmVwYXJlbnRDZWxsVGV4dCh0aGlzLm5vZGUsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcHBpbmc6IG1ldGFkYXRhLm1hcHBpbmcsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6IG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUuY2hpbGROb2Rlc1swXSA6IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGROb2Rlc1swXSxcbiAgICAgICAgJ19jb250ZW50JzogY29udGVudCxcbiAgICAgICAgZ2V0IGNvbnRlbnQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50OyB9LFxuICAgICAgICBzZXQgY29udGVudCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTVJvdyA9IGZ1bmN0aW9uIGNyZWF0ZURPTVJvdyhzZXRJbmRleCwgeSkge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHJvdy5jbGFzc05hbWUgPSAndWktdGFibGUtcm93JztcbiAgICAgICAgICByb3cuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB5KTtcblxuICAgIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBmdW5jdGlvbiBjcmVhdGVSb3cobWV0YWRhdGEsIGNvbHVtbnMpIHtcbiAgICAvKiBJTVBPUlRBTlQgTk9URTogbWV0YWRhdGEuZGF0YSBtaWdodCBiZSBhIHByb21pc2UuIFBsYW4gYWNjb3JkaW5nbHkuICovXG5cbiAgICBjb25zdCByb3cgPSBjcmVhdGVET01Sb3cobWV0YWRhdGEuc2V0SW5kZXgsIG1ldGFkYXRhLnkpO1xuICAgIGNvbnN0IGNlbGxzID0gW107XG5cbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY2VsbHMucHVzaChjcmVhdGVDZWxsKCcnLCBjb2x1bW4ubWFwcGluZywgY29sdW1uLndpZHRoKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxzW2luZGV4XS5ub2RlKTtcbiAgICB9KTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgZnJhZ21lbnQgPSBudWxsO1xuXG4gICAgY29uc3Qgcm93T2JqID0ge1xuICAgICAgICBub2RlOiByb3csXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgJ19pdGVyYXRvcic6IG51bGwsXG4gICAgICAgICdfYWN0aXZlJzogZmFsc2UsXG4gICAgICAgIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH0sXG4gICAgICAgIHNldCBhY3RpdmUodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGFjdGl2ZUNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfc2V0SW5kZXgnOiBudWxsLFxuICAgICAgICBnZXQgc2V0SW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZXRJbmRleDsgfSxcbiAgICAgICAgc2V0IHNldEluZGV4KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fc2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXRJbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShvZGRDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShldmVuQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX2RhdGEnOiBudWxsLFxuICAgICAgICAnX3dhaXRpbmdGb3JSZXNvbHV0aW9uJzogZmFsc2UsXG4gICAgICAgIHNldCBfd2FpdGluZ0ZvclJlc29sdXRpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKGxvYWRpbmdDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH0sXG4gICAgICAgIHNldCBkYXRhKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHJlc29sdmVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc29sdmVkVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5fZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbdGhpcy5faXRlcmF0b3JdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3knOiBtZXRhZGF0YS55LFxuICAgICAgICBnZXQgeSgpIHsgcmV0dXJuIHRoaXMuX3k7IH0sXG4gICAgICAgIHNldCB5KHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSB0byBoYXZlIHRoZSBjbGFzc2VzIGFkZGVkIGF1dG9tYXRpY2FsbHlcbiAgICByb3dPYmouc2V0SW5kZXggPSBtZXRhZGF0YS5zZXRJbmRleDtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSBzbyB0aGUgUHJvbWlzZSBoYW5kbGluZyBjYW4gdGFrZSBwbGFjZSBpZiBuZWVkZWQuLi5cbiAgICByb3dPYmouZGF0YSA9IG1ldGFkYXRhLmRhdGE7XG5cbiAgICByZXR1cm4gcm93T2JqO1xufTtcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMuX3Jvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkgPSBbXTtcblxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaE1vdmUgPSB0aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQgPSB0aGlzLmhhbmRsZU1vdmVJbnRlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ01vdmUgPSB0aGlzLmhhbmRsZURyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUgPSB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9ib2R5ID0gdGhpcy5yZWZzLmJvZHk7XG4gICAgICAgIHRoaXMuX2JvZHlfcyA9IHRoaXMuX2JvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IHRoaXMucmVmcy5oZWFkZXI7XG4gICAgICAgIHRoaXMuX2hlYWRlcl9zID0gdGhpcy5faGVhZGVyLnN0eWxlO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5fYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG5cbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgcmVzZXRJbnRlcm5hbHMoKSB7XG4gICAgICAgIHRoaXMuX3ggPSB0aGlzLl95ID0gMDtcbiAgICAgICAgdGhpcy5fbmV4dFggPSB0aGlzLl9uZXh0WSA9IDA7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gLTE7XG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBudWxsO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hpZnREZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9kcmFnRXZlbnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuXG4gICAgICAgIHRoaXMuX3RvdWNoRXZlbnQgPSB7cHJldmVudERlZmF1bHQ6IG5vb3B9O1xuICAgICAgICB0aGlzLl90b3VjaCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RUb3VjaFBhZ2VYID0gdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSAwO1xuXG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IVxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBlbXB0eUhlYWRlcigpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUNoaWxkKHRoaXMuX2hlYWRlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQ29sdW1ucygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUhlYWRlcigpO1xuXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB0aGlzLl9jb2x1bW5zLnB1c2goY3JlYXRlSGVhZGVyQ2VsbChjb2x1bW4pKSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgY3M7XG5cbiAgICAgICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbHVtbi5ub2RlKTtcblxuICAgICAgICAgICAgY29sdW1uLm1pbldpZHRoID0gcGFyc2VJbnQoY3NbJ21pbi13aWR0aCddLCAxMCk7XG4gICAgICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSBwYXJzZUludChjc1snbWF4LXdpZHRoJ10sIDEwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5qZWN0SGVhZGVyQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLl9jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHRoaXMuX2ZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbi5ub2RlKSk7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuX2ZyYWdtZW50KTtcblxuICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gaW5qZWN0ZWQgaW50byB0aGUgRE9NXG4gICAgICAgIHRoaXMuY29tcHV0ZU1pbk1heEhlYWRlckNlbGxEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBlbXB0eUJvZHkoKSB7XG4gICAgICAgIHRoaXMuX3Jvd3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5fYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2JvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmplY3RGaXJzdFJvdygpIHtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcblxuICAgICAgICB0aGlzLl9yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KDApLFxuICAgICAgICAgICAgc2V0SW5kZXg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCB0aGlzLl9jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCgwKTtcblxuICAgICAgICB0aGlzLl9ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3Jvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDE7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1JlbmRlcjsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5fcm93cy5wdXNoKGNyZWF0ZVJvdyh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3codGhpcy5faXRlcmF0b3IpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiB0aGlzLl9pdGVyYXRvcixcbiAgICAgICAgICAgICAgICB5OiB0aGlzLl9jZWxsX2ggKiB0aGlzLl9pdGVyYXRvcixcbiAgICAgICAgICAgIH0sIHRoaXMuX2NvbHVtbnMpKTtcblxuICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkucHVzaCh0aGlzLl9pdGVyYXRvcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX3Jvd3NbdGhpcy5faXRlcmF0b3JdLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFnbWVudCk7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ2VsbEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5fY2VsbF9oID0gdGhpcy5fcm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLl9yb3dzWzBdLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLl9yb3dfdyA9IHRoaXMuX3Jvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3hNYXhpbXVtID0gICB0aGlzLl9jb250YWluZXJfdyA8PSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fY29udGFpbmVyX3cgLSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMuX3lVcHBlckJvdW5kID0gMDtcbiAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgPSB0aGlzLl9jb250YWluZXJfaCAtICh0aGlzLl9uUm93c1RvUmVuZGVyICogdGhpcy5fY2VsbF9oKTtcbiAgICB9IC8vIGRvIG5vdCBydW4gdGhpcyB1bmxlc3MgcmVidWlsZGluZyB0aGUgdGFibGUsIGRvZXMgbm90IHByZXNlcnZlIGN1cnJlbnQgbWluL21heCB0aHJlc2hvbGRzXG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfdyAtIE1hdGguYWJzKHRoaXMuX3hNYXhpbXVtKTtcblxuICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfaCAqICh0aGlzLl9uUm93c1RvUmVuZGVyIC8gdGhpcy5wcm9wcy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLl94U2Nyb2xsVHJhY2tfdyA9IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxUcmFja19oID0gdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxIYW5kbGVfcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlWFNjcm9sbEhhbmRsZVNpemUoKSArICdweCc7XG4gICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVfcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKSB7XG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl9oID0gdGhpcy5yZWZzLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyX3cgPSB0aGlzLnJlZnMud3JhcHBlci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgfVxuXG4gICAgaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLndyYXBwZXIuY2xpZW50SGVpZ2h0ICE9PSB0aGlzLl9jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRJbnRlcm5hbHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5idWlsZENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RGaXJzdFJvdygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxXaWR0aHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5fblJvd3NUb1JlbmRlciA9IE1hdGguY2VpbCgodGhpcy5fY29udGFpbmVyX2ggKiAxLjMpIC8gdGhpcy5fY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1JlbmRlciA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvUmVuZGVyID0gdGhpcy5wcm9wcy50b3RhbFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggPSB0aGlzLl9uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0SGVhZGVyQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RSZXN0T2ZSb3dzKCk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsRG93bigpIHtcbiAgICAgICAgaWYgKCAgIHRoaXMuX3Jvd0VuZEluZGV4ID09PSB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgfHwgdGhpcy5fbmV4dFkgPj0gdGhpcy5feUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGxvd2VzdCBZIHZhbHVlIHRvIHRoZSB5TG93ZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgbmV4dCByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5fbmV4dFkgLSB0aGlzLl95TG93ZXJCb3VuZCkgLyB0aGlzLl9jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ICsgdGhpcy5fcm93RW5kSW5kZXggKyAxID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5wcm9wcy50b3RhbFJvd3MgLSB0aGlzLl9yb3dFbmRJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IHRoaXMuX25Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpZnREZWx0YSA9IHRoaXMuX25Sb3dzVG9TaGlmdCAtIHRoaXMuX25Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCAtPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kIC09IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ICs9IHRoaXMuX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMuX25Sb3dzVG9SZW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1NoaWZ0OyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gdGhpcy5fcm93RW5kSW5kZXggKyB0aGlzLl9pdGVyYXRvcjtcblxuICAgICAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSB0aGlzLl9yb3dzW3RoaXMuX3Jvd3NPcmRlcmVkQnlZWzBdXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLl90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLl90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci55ID0gdGhpcy5fdGFyZ2V0SW5kZXggKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuYWN0aXZlID0gdGhpcy5fdGFyZ2V0SW5kZXggPT09IHRoaXMuX2FjdGl2ZVJvdztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5wdXNoKHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggKz0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ICs9IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kIC09IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCAtPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jvd1N0YXJ0SW5kZXggPT09IDAgfHwgdGhpcy5fbmV4dFkgPD0gdGhpcy5feVVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBoaWdoZXN0IFkgdmFsdWUgdG8gdGhlIHlVcHBlckJvdW5kIGFuZCByZXF1ZXN0IHRoZSBwcmV2aW91cyByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5fbmV4dFkgLSB0aGlzLl95VXBwZXJCb3VuZCkgLyB0aGlzLl9jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5fcm93U3RhcnRJbmRleCAtIHRoaXMuX25Sb3dzVG9TaGlmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMuX3Jvd1N0YXJ0SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IHRoaXMuX25Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpZnREZWx0YSA9IHRoaXMuX25Sb3dzVG9TaGlmdCAtIHRoaXMuX25Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCArPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kICs9IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4IC09IHRoaXMuX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggLT0gdGhpcy5fc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMuX25Sb3dzVG9SZW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1NoaWZ0OyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gdGhpcy5fcm93U3RhcnRJbmRleCAtIHRoaXMuX2l0ZXJhdG9yIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gdGhpcy5fcm93c1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZW3RoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLl90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLl90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci55ID0gdGhpcy5fdGFyZ2V0SW5kZXggKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuYWN0aXZlID0gdGhpcy5fdGFyZ2V0SW5kZXggPT09IHRoaXMuX2FjdGl2ZVJvdztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS51bnNoaWZ0KHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnBvcCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCArPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICB0aGlzLl90b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVggPSB0aGlzLl90b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5fbGFzdFRvdWNoUGFnZVkgPSB0aGlzLl90b3VjaC5wYWdlWTtcbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKiB3ZSBoYW5kbGUgdG91Y2htb3ZlIGJ5IGRldGVjdGluZyB0aGUgZGVsdGEgb2YgcGFnZVgvWSBhbmQgZm9yd2FyZGluZ1xuICAgICAgICBpdCB0byBoYW5kbGVNb3ZlSW50ZW50KCkgKi9cblxuICAgICAgICB0aGlzLl90b3VjaCA9IGV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcblxuICAgICAgICB0aGlzLl90b3VjaEV2ZW50LmRlbHRhWCA9IHRoaXMuX2xhc3RUb3VjaFBhZ2VYIC0gdGhpcy5fdG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuX3RvdWNoRXZlbnQuZGVsdGFZID0gdGhpcy5fbGFzdFRvdWNoUGFnZVkgLSB0aGlzLl90b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWCA9IHRoaXMuX3RvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLl9sYXN0VG91Y2hQYWdlWSA9IHRoaXMuX3RvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl90b3VjaEV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluaW11bSB0cmFuc2xhdGlvbiBzaG91bGQgYmUgb25lIHJvdyBoZWlnaHRcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuX2RlbHRhWSA9IGV2ZW50LmRlbHRhTW9kZSA9PT0gMSA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSwgMTApICogdGhpcy5fY2VsbF9oIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLl9uZXh0WCA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSA/IDAgOiB0aGlzLl94IC0gdGhpcy5fZGVsdGFYO1xuXG4gICAgICAgIGlmICh0aGlzLl9uZXh0WCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRYID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WCA8IHRoaXMuX3hNYXhpbXVtKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0WCA9IHRoaXMuX3hNYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmV4dFkgPSB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPyAwIDogdGhpcy5feSAtIHRoaXMuX2RlbHRhWTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WSA8IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbERvd24oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFkgPiB0aGlzLl95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxVcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WSA8IHRoaXMuX3lMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFkgPSB0aGlzLl95TG93ZXJCb3VuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRYID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gICAoTWF0aC5hYnModGhpcy5fbmV4dFgpIC8gKHRoaXMuX3Jvd193IC0gdGhpcy5fY29udGFpbmVyX3cpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKHRoaXMuX3hTY3JvbGxUcmFja193IC0gdGhpcy5feFNjcm9sbEhhbmRsZVNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3hTY3JvbGxIYW5kbGVQb3NpdGlvbiArIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplID4gdGhpcy5feFNjcm9sbFRyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uID0gdGhpcy5feFNjcm9sbFRyYWNrX3cgLSB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRZID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uID0gICAoTWF0aC5hYnModGhpcy5fbmV4dFkpIC8gKCh0aGlzLnByb3BzLnRvdGFsUm93cyAqIHRoaXMuX2NlbGxfaCkgLSB0aGlzLl9jb250YWluZXJfaCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAodGhpcy5feVNjcm9sbFRyYWNrX2ggLSB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uICsgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPiB0aGlzLl95U2Nyb2xsVHJhY2tfaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl95U2Nyb2xsVHJhY2tfaCAtIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNsYXRpb25zKCk7IC8vIERvIGFsbCB0cmFuc2Zvcm1zIGdyb3VwZWQgdG9nZXRoZXJcblxuICAgICAgICAgICAgdGhpcy5feCA9IHRoaXMuX25leHRYO1xuICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX25leHRZO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwZXJmb3JtVHJhbnNsYXRpb25zKCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJfc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHRoaXMuX25leHRYKTtcbiAgICAgICAgdGhpcy5fYm9keV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5fbmV4dFgsIHRoaXMuX25leHRZKTtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZV9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgdGhpcy5feVNjcm9sbEhhbmRsZVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQuY2xpZW50WCAtIHRoaXMuX2xhc3RDb2x1bW5YKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RDb2x1bW5YID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdFhTY3JvbGw7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0V2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5fZHJhZ0V2ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVkgPSAoKGV2ZW50LmNsaWVudFkgLSB0aGlzLl9sYXN0WVNjcm9sbCkgLyB0aGlzLl9jb250YWluZXJfaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9kcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPSB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG5cbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBmaW5kV2hlcmUodGhpcy5fY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtblJlc2l6ZShkZWx0YSkge1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY29sdW1ucy5pbmRleE9mKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4pO1xuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIGlmICggICBhZGp1c3RlZERlbHRhIDwgMFxuICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGgpXG4gICAgICAgICAgICAmJiB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA8IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZERlbHRhID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5taW5XaWR0aCAtIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGgpXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPiB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoKSB7XG4gICAgICAgICAgICBhZGp1c3RlZERlbHRhID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aCAtIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3QgdGhlIGNvbHVtbiBoZWFkZXIgY2VsbFxuICAgICAgICB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aCArIGFkanVzdGVkRGVsdGE7XG5cbiAgICAgICAgLy8gQWRqdXN0IHRoZSBjb3JyZXNwb25kaW5nIHJvdyBjZWxsc1xuICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2gocm93ID0+IHJvdy5jZWxsc1tpbmRleF0ud2lkdGggPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVhCb3VuZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICBpZiAoYWRqdXN0ZWREZWx0YSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVggPSBhZGp1c3RlZERlbHRhO1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0V2ZW50LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLl9kcmFnRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5RnJvbUtleUNvZGUoY29kZSkge1xuICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dEb3duJztcblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd1VwJztcblxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgcmV0dXJuICdFbnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRBcmlhVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMucmVmcy5hcmlhLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlUm93KHNldEluZGV4KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IHNldEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2gocm93ID0+IHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgdGhpcy5fbmV4dEFjdGl2ZVJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLl9hY3RpdmVSb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRBY3RpdmVSb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHRoaXMuX25leHRBY3RpdmVSb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBcmlhVGV4dCh0aGlzLl9uZXh0QWN0aXZlUm93LmRhdGFbdGhpcy5fY29sdW1uc1swXS5tYXBwaW5nXSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMuX25leHRBY3RpdmVSb3cueSAqIC0xID4gdGhpcy5feSlcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLl9jZWxsX2ggPCB0aGlzLl95IC0gdGhpcy5fY29udGFpbmVyX2ggKyB0aGlzLl9jZWxsX2gpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0V2ZW50LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ0V2ZW50LmRlbHRhWSA9IHRoaXMuX2NlbGxfaCAqIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2RyYWdFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLl9hY3RpdmVSb3cgPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLl9hY3RpdmVSb3cgPCB0aGlzLnByb3BzLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duXG4gICAgICAgICAgICAgICAgaW4gdGhlIHZpZXdwb3J0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9kcmFnRXZlbnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdFdmVudC5kZWx0YVkgPSAoICAgKCAgICB0aGlzLl9yb3dTdGFydEluZGV4ID4gdGhpcy5fYWN0aXZlUm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hY3RpdmVSb3cgLSB0aGlzLl9yb3dTdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA8IHRoaXMuX2FjdGl2ZVJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fYWN0aXZlUm93IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHRoaXMuX2RyYWdFdmVudCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBwcm9jZXNzIGFnYWluLCBub3cgdGhhdCB0aGUgcm93IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBsZXQga2V5ID0gZXZlbnQua2V5IHx8IHRoaXMuZ2V0S2V5RnJvbUtleUNvZGUoZXZlbnQua2V5Q29kZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVJvdyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdzZXRJbmRleCcsIHRoaXMuX2FjdGl2ZVJvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5fY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93W2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKHRhcmdldCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRhcmdldDtcbiAgICAgICAgbGV0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChjZWxsQ2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLmRpc2NvdmVyQ2VsbEFuZFJvd05vZGVzKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG1hcC5yb3cpIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBmaW5kV2hlcmUodGhpcy5fcm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3cocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdChldmVudCwgcm93LnNldEluZGV4LCBtYXAuY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QoZXZlbnQsIHJvdy5zZXRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0ndGFibGUnIGNsYXNzTmFtZT0ndWktdGFibGUnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZGVyJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcicgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlLnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG90YWxSb3dzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuVUlUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBjb2x1bW5zOiBbXSxcbiAgICBnZXRSb3c6IG5vb3AsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBub29wLFxuICAgIG9uUm93SW50ZXJhY3Q6IG5vb3AsXG4gICAgdG90YWxSb3dzOiAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5jbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQudmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICBhZGQoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaW5kZXgpID09PSAtMSkgeyB0aGlzLnByb3BzLmhhbmRsZUFkZFRva2VuKGluZGV4KTsgfVxuICAgIH1cblxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gKEFycmF5LmlzQXJyYXkoaW5kZXgpID8gaW5kZXggOiBbaW5kZXhdKS5maWx0ZXIoaWR4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGlkeCkgIT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGgpIHsgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmVUb2tlbnMoaW5kZXhlcyk7IH1cbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbihpbmRleCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbnMoaW5kZXhlcykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihpbmRleGVzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGxhc3QoaW5kZXhlcykpO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbXSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1Rva2VuQ2xvc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLmRlc2NlbmRhbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgIGhhbmRsZUFkZFRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlUb2tlbml6ZWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBub29wLFxuICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICB0b2tlbnM6IFtdLFxuICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICBzaG93VG9rZW5DbG9zZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9rZW5pemVkSW5wdXQ7XG4iLCIvKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKiBAY2xhc3MgVUlUb29sdGlwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9vbHRpcC5wb3NpdGlvbiA9IHtcbiAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgIEFGVEVSOiAnQUZURVInLFxufTtcblxuVUlUb29sdGlwLnByb3BUeXBlcyA9IHtcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSVRvb2x0aXAuZGVmYXVsdFByb3BzID0ge1xuICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRvb2x0aXA7XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcblxuY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgaWQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgdXNlcklucHV0OiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sICgpID0+IHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQ7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5yZWZzLmlucHV0LnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzSW5wdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfZm9jdXNJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfZm9jdXNJbnB1dCA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IGBmb2N1c0lucHV0KClgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLiBQbGVhc2UgdXNlIFVJVHlwZWFoZWFkSW5wdXQuZm9jdXMoKSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcklucHV0OiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX3NldFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogYHNldFZhbHVlKHRleHQpYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4gUGxlYXNlIHVzZSBVSVR5cGVhaGVhZElucHV0LnZhbHVlKHRleHQpIGluc3RlYWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hcmtGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXJrRnVuYyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya0Z1bmNgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWF0Y2hGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9tYXRjaEZ1bmMgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuY2Agd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWF0Y2hlcyhlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS51c2VySW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJyAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi5lbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BtYXRjaF8kJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50aXR5LnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS51c2VySW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICB0eXBlPXtudWxsfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVHlwZWFoZWFkSW5wdXQubW9kZSA9IHtcbiAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICdGVVpaWSc6ICdGVVpaWScsXG59O1xuXG5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICBhbGdvcml0aG06IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBdKSxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcmtGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG1hdGNoRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIH0pLFxuICAgIF0pLFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICksXG4gICAgaGludDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaGludFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYWxnb3JpdGhtOiBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBlbnRpdGllczogW10sXG4gICAgaGludFByb3BzOiB7fSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUeXBlYWhlYWRJbnB1dDtcbiIsIi8qKlxuICogU2VhcmNoZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9jY3VyZW5jZSBvZiBhbiBhcnJheSBpdGVtIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9maW5kV2hlcmVcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0gIHtBcnJheVtPYmplY3RdfSBhcnJheSAgICAgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgcHJvcGVydHkgIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICB2YWx1ZSAgICAgdGhlIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QgKHVzZXMgc3RyaWN0IGVxdWFsaXR5KVxuICpcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9IFRoZSBtYXRjaGVkIGFycmF5IGl0ZW0sIG9yIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn0gLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcuYm9keSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5oZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmljb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5vbkNsaWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbUV4aXN0cyhpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlJdGVtRXhpc3RzKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvdHJhbnNmb3JtXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBsZXQgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJVmlldztcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgJ1xcXFwkJicpO1xufTtcbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuZ2xvYmFsLlVJS2l0LlVJVXRpbHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlBcnJvd0tleU5hdmlnYXRpb246IChnbG9iYWwuVUlLaXQuVUlBcnJvd0tleU5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJykuZGVmYXVsdCksXG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQYWdpbmF0ZWRWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJUGFnaW5hdGVkVmlldyA9IHJlcXVpcmUoJy4vVUlQYWdpbmF0ZWRWaWV3JykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlVdGlsczoge1xuICAgICAgICBub3RpZnk6IChnbG9iYWwuVUlLaXQuVUlVdGlscy5ub3RpZnkgPSByZXF1aXJlKCcuL1VJVXRpbHMvbm90aWZ5JykuZGVmYXVsdCksXG4gICAgfSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iXX0=
