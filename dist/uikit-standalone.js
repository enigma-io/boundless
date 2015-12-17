require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIButton = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],2:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UICheckbox = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],3:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UICheckboxGroup = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UICheckbox":2,"../UIUtils/noop":18,"../UIView":21,"classnames":22}],4:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIDialog = (function (_UIView) {
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

            if (this.props.closeOnOutsideClick) {
                this.handleOutsideClick = this.handleOutsideClick.bind(this);

                window.addEventListener('click', this.handleOutsideClick, true);
            }

            this.handleFocus = this.handleFocus.bind(this);

            window.addEventListener('focus', this.handleFocus, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.closeOnOutsideClick) {
                window.removeEventListener('click', this.handleOutsideClick, true);
            }

            window.removeEventListener('focus', this.handleFocus, true);
        }
    }, {
        key: 'isPartOfDialog',
        value: function isPartOfDialog(node) {
            return this.refs.dialog.contains(node);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(nativeEvent) {
            if (!this.props.captureFocus) {
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
            if (!this.isPartOfDialog(nativeEvent.target)) {
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
})(_UIView3.default);

UIDialog.propTypes = {
    body: _react2.default.PropTypes.node,
    bodyProps: _react2.default.PropTypes.object,
    captureFocus: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    closeOnEscKey: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],5:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIFittedText = (function (_UIView) {
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
            var containerHeight = toI(containerBox.height);
            var containerWidth = toI(containerBox.width);
            var fontSize = toI(window.getComputedStyle(node).fontSize);

            if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
                // need to account for padding
                containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
                containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
            }

            var optimizeForHeight = Math.floor(fontSize / node.offsetHeight * containerHeight);
            var optimizeForWidth = Math.floor(fontSize / node.offsetWidth * containerWidth);

            node.style.fontSize = Math.min(this.props.maxFontSize, optimizeForHeight, optimizeForWidth) + 'px';
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
})(_UIView3.default);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};

UIFittedText.propTypes = {
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxFontSize: _react2.default.PropTypes.number
};

exports.default = UIFittedText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":21,"classnames":22}],6:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIImage = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],7:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A generic list view, supporting unstyled, bulleted and numbered output.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIList
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIList = (function (_UIView) {
    _inherits(UIList, _UIView);

    function UIList() {
        _classCallCheck(this, UIList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIList).apply(this, arguments));
    }

    _createClass(UIList, [{
        key: 'initialState',
        value: function initialState() {
            return {
                activeItem: null
            };
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            this.refs['item_' + index].focus();
        }
    }, {
        key: 'getNextItemIndex',
        value: function getNextItemIndex(currentItem) {
            var next = this.props.items.indexOf(currentItem) + 1;

            return next < this.props.items.length ? next : 0;
        }
    }, {
        key: 'getPreviousItemIndex',
        value: function getPreviousItemIndex(currentItem) {
            var previous = this.props.items.indexOf(currentItem) - 1;

            return previous < 0 ? this.props.items.length - 1 : previous;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this2 = this;

            var key = event.key;
            var items = this.props.items;
            var activeItem = this.state.activeItem;

            var next = function next() {
                _this2.setFocus(_this2.getNextItemIndex(activeItem));
                event.preventDefault();
            };

            var prev = function prev() {
                event.preventDefault();
                _this2.setFocus(_this2.getPreviousItemIndex(activeItem));
            };

            if (key === 'Tab') {
                var activeItemIndex = items.indexOf(activeItem);

                if (event.shiftKey && activeItemIndex !== 0) {
                    prev();
                } else if (!event.shiftKey && activeItemIndex !== items.length - 1) {
                    next();
                }
            } else {
                switch (key) {
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        prev();
                        break;

                    case 'ArrowDown':
                    case 'ArrowRight':
                        next();
                        break;
                }
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this3 = this;

            var nodeType = this.props.type ? 'li' : 'span';

            return this.props.items.map(function (item, index) {
                return _react2.default.createElement(nodeType, {
                    className: 'ui-list-item',
                    ref: 'item_' + index,
                    key: index,
                    tabIndex: 0,
                    onBlur: function onBlur() {
                        return _this3.state.activeItem === item && _this3.setState({ activeItem: null });
                    },
                    onFocus: function onFocus() {
                        return _this3.setState({ activeItem: item });
                    },
                    children: item
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var nodeType = 'div';

            switch (this.props.type) {
                case 'bullet':
                    nodeType = 'ul';
                    break;

                case 'number':
                    nodeType = 'ol';
                    break;
            }

            return _react2.default.createElement(nodeType, _extends({}, this.props, {
                ref: 'list',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-list': true,
                    'ui-list-bulleted': this.props.type === 'bullet',
                    'ui-list-numbered': this.props.type === 'number',
                    'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number'
                }, this.props.className, !!this.props.className)),
                onKeyDown: this.handleKeyDown.bind(this),
                children: this.renderContent()
            }));
        }
    }]);

    return UIList;
})(_UIView3.default);

UIList.propTypes = {
    items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node),
    type: _react2.default.PropTypes.oneOf(['bullet', 'number'])
};

UIList.defaultProps = {
    items: []
};

exports.default = UIList;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":21,"classnames":22}],8:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIModal = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIDialog":4,"../UIView":21,"classnames":22}],9:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIPopover = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIDialog":4,"../UIUtils/transform":20,"../UIView":21,"classnames":22}],10:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIProgress = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIButton":1,"../UIView":21,"classnames":22}],11:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIProgressiveDisclosure = (function (_UIView) {
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
        value: function handleClick() {
            var _this3 = this;

            this.setState({ expanded: !this.state.expanded }, function () {
                return _this3.dispatchCallback();
            });

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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],12:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UIRadio = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22}],13:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UISegmentedControl = (function (_UIView) {
    _inherits(UISegmentedControl, _UIView);

    function UISegmentedControl() {
        _classCallCheck(this, UISegmentedControl);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UISegmentedControl).apply(this, arguments));
    }

    _createClass(UISegmentedControl, [{
        key: 'currentValue',
        value: function currentValue() {
            var value = undefined;

            this.props.options.some(function (option) {
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
            if (this.state.indexOfOptionInFocus === option) {
                this.setState({ indexOfOptionInFocus: null });
            }

            if (typeof option.onBlur === 'function') {
                event.persist();
                option.onBlur(event);
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(option, event) {
            this.props.onOptionSelected(option.value);

            if (typeof option.onClick === 'function') {
                event.persist();
                option.onClick(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(option, event) {
            this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

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
                        tabIndex: definition.selected ? 0 : -1,
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
})(_UIView3.default);

UISegmentedControl.propTypes = {
    onOptionSelected: _react2.default.PropTypes.func,
    options: function options(props) {
        if (props.options.length < 2) {
            return new Error('Must provide at least two options.');
        }

        var missingSelected = props.options.some(function (option) {
            if (!('selected' in option)) {
                return true;
            }
        });

        if (missingSelected) {
            return new Error('Must provide a `selected` prop for each option.');
        }

        var missingValue = props.options.some(function (option) {
            if (!('value' in option)) {
                return true;
            }
        });

        if (missingValue) {
            return new Error('Must provide a `value` prop for each option.');
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
            return new Error('Encountered multiple options with `selected: true`. There can be only one.');
        }
    }
};

UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: _noop2.default
};

exports.default = UISegmentedControl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIButton":1,"../UIUtils/noop":18,"../UIView":21,"classnames":22}],14:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

/** @ignore */
var _findWhereIndex = null;
var findWhere = function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
    }
}; // optimized specifically to only look for a single key:value match

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
    var cs = window.getComputedStyle(node);

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
        minWidth: parseInt(cs['min-width'], 10),
        maxWidth: parseInt(cs['max-width'], 10),
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
                    this._data.then((function cautiouslySetRowData(promise, resolvedVal) {
                        if (this._data === promise) {
                            this.data = resolvedVal;
                        }
                    }).bind(this, this._data));

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

var translate3d = function translate3D() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

var UITable = (function (_UIView) {
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

        _this.handleMoveIntent = _this.handleMoveIntent.bind(_this);
        _this.handleXScrollHandleDragStart = _this.handleXScrollHandleDragStart.bind(_this);
        _this.handleYScrollHandleDragStart = _this.handleYScrollHandleDragStart.bind(_this);
        _this.handleDragMove = _this.handleDragMove.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleColumnDragStart = _this.handleColumnDragStart.bind(_this);
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
            this.refs.wrapper.addEventListener('keydown', this.handleKeyDown);

            this._header.addEventListener('mousedown', this.handleColumnDragStart);
            this._body.addEventListener('click', this.handleClick);

            this.refs['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.refs['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.refs.wrapper.removeEventListener('mousemove', this.handleDragMove);
            this.refs.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this._header.removeEventListener('mousedown', this.handleColumnDragStart);
            this._body.removeEventListener('click', this.handleClick);

            this.refs['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.refs['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

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
            this._xScrollHandlePosition = 0;
            this._yScrollHandlePosition = 0;

            this._activeRow = -1;
            this._nextActiveRow = null;

            // temporary variables in various calculations
            this._iterator = null;
            this._nRowsToShift = null;
            this._orderedYArrayTargetIndex = null;
            this._rowPointer = null;
            this._shiftDelta = null;
            this._targetIndex = null;

            this._xScrollHandleSize = null;
            this._yScrollHandleSize = null;

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

            this.props.columns.forEach(function (column, index) {
                return _this2._columns.push(createHeaderCell(column));
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
        }
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
            this._xScrollHandle_s.width = this.calculateXScrollHandleSize() + 'px';
            this._yScrollHandle_s.height = this.calculateYScrollHandleSize() + 'px';
        }
    }, {
        key: 'regenerate',
        value: function regenerate() {
            this.resetInternals();

            this.buildColumns();

            this.injectFirstRow();
            this.calculateCellWidths();

            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */

            this._cell_h = this._rows[0].cells[0].node.clientHeight || 40;

            this._container_h = this.refs.wrapper.clientHeight || 150;
            this._container_w = this.refs.wrapper.clientWidth || 500;

            this._xScrollTrack_w = this.refs['x-scroll-track'].clientWidth || 500;
            this._yScrollTrack_h = this.refs['y-scroll-track'].clientHeight || 150;

            this._nRowsToRender = Math.ceil(this._container_h * 1.3 / this._cell_h);

            if (this._nRowsToRender > this.props.totalRows) {
                this._nRowsToRender = this.props.totalRows;
            }

            this._rowStartIndex = 0;
            this._rowEndIndex = this._nRowsToRender;

            this.calculateXBound();
            this.calculateYBound();

            this.injectHeaderCells();
            this.injectRestOfRows();

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
            this._deltaY = event.deltaMode === 1 ? parseInt(event.deltaY) * this._cell_h : event.deltaY;

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
                    this.handleMoveIntent({
                        deltaX: event.clientX - this._lastXScroll,
                        deltaY: 0,
                        preventDefault: _noop2.default
                    });

                    this._lastXScroll = event.clientX;
                }

                if (this._manuallyScrollingY) {
                    this.handleMoveIntent({
                        deltaX: 0,
                        deltaY: (event.clientY - this._lastYScroll) / this._container_h * this.props.totalRows * this._cell_h,
                        preventDefault: _noop2.default
                    });

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

                this._manuallyResizingColumn = findWhere(this._columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

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

            var adjustedDelta = delta;
            var index = this._columns.indexOf(this._manuallyResizingColumn);

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
                this.handleMoveIntent({
                    deltaX: adjustedDelta,
                    deltaY: 0,
                    preventDefault: _noop2.default
                });
            }
        }
    }, {
        key: 'getKeyFromKeyCode',
        value: function getKeyFromKeyCode(code) {
            switch (event.keyCode) {
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

            this._nextActiveRow = findWhere(this._rows, 'setIndex', this._activeRow + delta);

            if (this._nextActiveRow) {
                this.setActiveRow(this._nextActiveRow.setIndex);
                this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]);

                if (delta === -1 && this._nextActiveRow.y * -1 > this._y || delta === 1 && this._nextActiveRow.y * -1 - this._cell_h < this._y - this._container_h + this._cell_h // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this.handleMoveIntent({
                            deltaX: 0,
                            deltaY: this._cell_h * delta,
                            preventDefault: _noop2.default
                        });
                    }
            } else if (delta === -1 && this._activeRow > 0 || delta === 1 && this._activeRow < this.props.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: (this._rowStartIndex > this._activeRow && this._activeRow - this._rowStartIndex || (this._rowStartIndex < this._activeRow && this._activeRow - this._rowStartIndex) + delta) * this._cell_h,
                    preventDefault: _noop2.default
                });

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
                            var row = findWhere(_this8._rows, 'setIndex', _this8._activeRow).data;

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
                var row = findWhere(this._rows, 'node', map.row);

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
})(_UIView3.default);

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

},{"../UIUtils/noop":18,"../UIUtils/transform":20,"../UIView":21}],15:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distill rich entity data matched via typeahead input into simple visual abstractions.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITokenizedInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var first = function getFirstArrayItem(array) {
    return array[0];
};

var last = function getLastArrayItem(array) {
    return array[array.length - 1];
};

var without = function rejectSomeArrayItems(baseArray) {
    for (var _len = arguments.length, toBeExcluded = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        toBeExcluded[_key - 1] = arguments[_key];
    }

    return baseArray.filter(function rejectSome(item) {
        return toBeExcluded.indexOf(item) === -1;
    });
};

var UITokenizedInput = (function (_UIView) {
    _inherits(UITokenizedInput, _UIView);

    function UITokenizedInput() {
        _classCallCheck(this, UITokenizedInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITokenizedInput).apply(this, arguments));
    }

    _createClass(UITokenizedInput, [{
        key: 'initialState',
        value: function initialState() {
            return {
                tokenizedEntityIndexesSelected: [],
                tokenizedEntityIndexes: [].concat(this.props.defaultTokenizedEntityIndexes)
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var previousIndexes = prevState.tokenizedEntityIndexes;
            var previousSelectedIndexes = prevState.tokenizedEntityIndexesSelected;
            var currentIndexes = this.state.tokenizedEntityIndexes;
            var currentSelectedIndexes = this.state.tokenizedEntityIndexesSelected;

            if (previousIndexes !== currentIndexes) {
                this.props.onTokenChange(currentIndexes);
            }

            if (previousSelectedIndexes !== currentSelectedIndexes) {
                // move focus
                if (currentSelectedIndexes.length === 0) {
                    return;
                } else if (currentSelectedIndexes.length === 1 || currentSelectedIndexes[0] !== previousSelectedIndexes[0] /* multi selection, leftward */) {
                        this.refs['token_' + currentSelectedIndexes[0]].focus();
                    } else if (last(currentSelectedIndexes) !== last(previousSelectedIndexes) /* multi selection, rightward */) {
                        this.refs['token_' + last(currentSelectedIndexes)].focus();
                    }
            }
        }

        /**
         * Create a token based on an entity's array index.
         *
         * @param {Number|Array<Number>}  index         the array index of the desired entity to be tokenized
         * @param {Boolean}               [focusInput]  determines if the input should be focused after the
         *                                              token changes are applied
         * @param {Boolean}               [clearInput]  determines if the input should be cleared after the
         *                                              token changes are applied
         */

    }, {
        key: 'addToken',
        value: function addToken(index, focusInput, clearInput) {
            var _this2 = this;

            var indexes = (Array.isArray(index) ? index : [index]).filter(function (idx) {
                return _this2.state.tokenizedEntityIndexes.indexOf(idx) === -1;
            });

            this.setState({ tokenizedEntityIndexes: this.state.tokenizedEntityIndexes.concat(indexes) });

            focusInput && this.refs.typeahead.focusInput();
            clearInput && this.refs.typeahead.setValue('');
        }

        /**
         * Remove a token based on an entity's array index. If no index is given, all tokens are removed.
         *
         * @param {Number|Array<Number>}  index         the array index of the desired entity to be tokenized
         * @param {Boolean}               [focusInput]  determines if the input should be focused after the
         *                                              token changes are applied
         * @param {Boolean}               [clearInput]  determines if the input should be cleared after the
         *                                              token changes are applied
         */

    }, {
        key: 'removeToken',
        value: function removeToken() {
            var index = arguments.length <= 0 || arguments[0] === undefined ? this.state.tokenizedEntityIndexesSelected : arguments[0];
            var focusInput = arguments[1];
            var clearInput = arguments[2];

            var indexes = Array.isArray(index) ? index : [index];

            this.setState({
                tokenizedEntityIndexes: without.apply(undefined, [this.state.tokenizedEntityIndexes].concat(_toConsumableArray(indexes))),
                tokenizedEntityIndexesSelected: without.apply(undefined, [this.state.tokenizedEntityIndexesSelected].concat(_toConsumableArray(indexes)))
            });

            focusInput && this.refs.typeahead.focusInput();
            clearInput && this.refs.typeahead.setValue('');
        }
    }, {
        key: 'handleInputFocus',
        value: function handleInputFocus(event) {
            this.setState({ tokenizedEntityIndexesSelected: [] });

            if (typeof this.props.inputProps.onFocus === 'function') {
                event.persist();
                this.props.inputProps.onFocus(event);
            }
        }
    }, {
        key: 'selectPreviousToken',
        value: function selectPreviousToken(append) {
            var selected = this.state.tokenizedEntityIndexesSelected;
            var indexes = this.state.tokenizedEntityIndexes;

            if (selected.length === 1 && first(selected) === first(indexes)) {
                return; // already at leftmost bound
            }

            if (selected.length === 0) {
                // pick the rightmost
                this.setState({
                    tokenizedEntityIndexesSelected: [last(indexes)]
                });
            } else {
                // add the next leftmost to a reconstructed "selected" array
                var previousToken = indexes[indexes.indexOf(first(selected)) - 1];

                this.setState({
                    tokenizedEntityIndexesSelected: append ? [previousToken].concat(selected) : [previousToken]
                });
            }
        }
    }, {
        key: 'selectNextToken',
        value: function selectNextToken(append) {
            var selected = this.state.tokenizedEntityIndexesSelected;
            var indexes = this.state.tokenizedEntityIndexes;

            if (selected.length === 0) {
                return;
            }

            if (last(selected) === last(indexes)) {
                this.setState({
                    tokenizedEntityIndexesSelected: []
                });

                this.refs.typeahead.focusInput();
            } else {
                var nextToken = indexes[indexes.indexOf(last(selected)) + 1];

                this.setState({
                    tokenizedEntityIndexesSelected: append ? selected.concat(nextToken) : [nextToken]
                });
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    this.selectPreviousToken(event.shiftKey);
                    break;

                case 'ArrowRight':
                    this.selectNextToken(event.shiftKey);
                    break;

                case 'Backspace':
                    if (this.state.tokenizedEntityIndexesSelected.length) {
                        event.preventDefault();
                        this.removeToken();

                        this.refs.typeahead.focusInput();
                    }

                    break;
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleTokenCloseClick',
        value: function handleTokenCloseClick(index) {
            this.removeToken(index);
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
        key: 'selectSingleToken',
        value: function selectSingleToken(index) {
            if (this.state.tokenizedEntityIndexesSelected.indexOf(index) === -1 || this.state.tokenizedEntityIndexesSelected.length > 1) {
                this.setState({
                    tokenizedEntityIndexesSelected: [index]
                });
            }
        }
    }, {
        key: 'handleTokenKeyDown',
        value: function handleTokenKeyDown(index, event) {
            switch (event.key) {
                case 'Enter':
                case 'Space':
                    this.selectSingleToken(index);
            }
        }
    }, {
        key: 'renderTokens',
        value: function renderTokens() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ui-tokenfield-tokens' },
                this.state.tokenizedEntityIndexes.map(function (index) {
                    return _react2.default.createElement(
                        'div',
                        { ref: 'token_' + index,
                            key: index,
                            className: (0, _classnames2.default)({
                                'ui-tokenfield-token': true,
                                'ui-tokenfield-token-selected': _this3.state.tokenizedEntityIndexesSelected.indexOf(index) !== -1
                            }),
                            onClick: _this3.selectSingleToken.bind(_this3, index),
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
                    onEntitySelected: this.addToken.bind(this),
                    onFocus: this.handleInputFocus.bind(this),
                    clearPartialInputOnSelection: true }))
            );
        }
    }]);

    return UITokenizedInput;
})(_UIView3.default);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    defaultTokenizedEntityIndexes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    onTokenChange: _react2.default.PropTypes.func,
    showTokenClose: _react2.default.PropTypes.bool
});

UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    defaultTokenizedEntityIndexes: [],
    onTokenChange: _noop2.default,
    showTokenClose: true
});

exports.default = UITokenizedInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UITypeaheadInput":17,"../UIUtils/noop":18,"../UIView":21,"classnames":22}],16:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UITooltip = (function (_UIView) {
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
})(_UIView3.default);

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

},{"../UIView":21,"classnames":22}],17:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var UITypeaheadInput = (function (_UIView) {
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
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
                this.refs.matches.scrollTop = 0;
            } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop
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
        key: 'focusInput',
        value: function focusInput() {
            this.getInputNode().focus();
        }
    }, {
        key: 'setValue',
        value: function setValue(newValue) {
            this.getInputNode().value = newValue;

            this.setState({ userInput: newValue });
            this.resetMatches();
            this.focusInput();
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
                this.setValue('');
            } else {
                this.setValue(this.getSelectedEntityText());
            }
        }
    }, {
        key: 'markFuzzyMatchSubstring',
        value: function markFuzzyMatchSubstring(entityContent, userText) {
            var frags = entityContent.split(new RegExp('(' + (0, _escapeStringRegexp2.default)(userText) + ')', 'ig'));
            var normalizedUserText = userText.toLowerCase();
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
        value: function markStartsWithMatchSubstring(entityContent, userInput) {
            var seekValue = userInput.toLowerCase();
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

            console.warn('No `props.algorithm.markFunc` was provided to UITypeaheadInput; falling back to the default marking algorithm.');

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

            console.warn('No `props.algorithm.matchFunc` was provided to UITypeaheadInput; falling back to the default matching algorithm.');

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
                    if (this.state.selectedEntityIndex !== -1 && this.cursorAtEndOfInput() && this.getInputNode() === event.target) {
                        event.nativeEvent.preventDefault();
                        this.setValueWithSelectedEntity();
                    }

                    break;

                case 'ArrowUp':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    this.selectMatch(-1);
                    this.focusInput();
                    break;

                case 'ArrowDown':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    this.selectMatch(1);
                    this.focusInput();
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
                            _this4.markMatchSubstring(entity.text, _this4.state.userInput)
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
})(_UIView3.default);

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
    onEntitySelected: _noop2.default
};

exports.default = UITypeaheadInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":18,"../UIView":21,"classnames":22,"escape-string-regexp":23}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

    return a.every(function (item) {
        return b.indexOf(item) !== -1;
    }) && b.every(function (item) {
        return a.indexOf(item) !== -1;
    });
}

},{}],20:[function(require,module,exports){
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

exports.default = (function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    // used in JSDOM
    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();

},{}],21:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

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

var UIView = (function (_React$Component) {
  _inherits(UIView, _React$Component);

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
})(_react2.default.Component);

exports.default = UIView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/shallowEqual":19}],22:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes += ' ' + arg;
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
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

},{}],23:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe,  '\\$&');
};

},{}],"enigma-uikit":[function(require,module,exports){
(function (global){
'use strict';

/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

global.UIKit = {};

module.exports = {
    UIButton: global.UIKit.UIButton = require('./UIButton').default,
    UICheckbox: global.UIKit.UICheckbox = require('./UICheckbox').default,
    UICheckboxGroup: global.UIKit.UICheckboxGroup = require('./UICheckboxGroup').default,
    UIDialog: global.UIKit.UIDialog = require('./UIDialog').default,
    UIFittedText: global.UIKit.UIFittedText = require('./UIFittedText').default,
    UIImage: global.UIKit.UIImage = require('./UIImage').default,
    UIList: global.UIKit.UIList = require('./UIList').default,
    UIModal: global.UIKit.UIModal = require('./UIModal').default,
    UIPopover: global.UIKit.UIPopover = require('./UIPopover').default,
    UIProgress: global.UIKit.UIProgress = require('./UIProgress').default,
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require('./UIProgressiveDisclosure').default,
    UIRadio: global.UIKit.UIRadio = require('./UIRadio').default,
    UISegmentedControl: global.UIKit.UISegmentedControl = require('./UISegmentedControl').default,
    UITable: global.UIKit.UITable = require('./UITable').default,
    UITokenizedInput: global.UIKit.UITokenizedInput = require('./UITokenizedInput').default,
    UITooltip: global.UIKit.UITooltip = require('./UITooltip').default,
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require('./UITypeaheadInput').default,
    UIView: global.UIKit.UIView = require('./UIView').default
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./UIButton":1,"./UICheckbox":2,"./UICheckboxGroup":3,"./UIDialog":4,"./UIFittedText":5,"./UIImage":6,"./UIList":7,"./UIModal":8,"./UIPopover":9,"./UIProgress":10,"./UIProgressiveDisclosure":11,"./UIRadio":12,"./UISegmentedControl":13,"./UITable":14,"./UITokenizedInput":15,"./UITooltip":16,"./UITypeaheadInput":17,"./UIView":21}]},{},["enigma-uikit"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUJ1dHRvbi9pbmRleC5qcyIsIlVJQ2hlY2tib3gvaW5kZXguanMiLCJVSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCJVSURpYWxvZy9pbmRleC5qcyIsIlVJRml0dGVkVGV4dC9pbmRleC5qcyIsIlVJSW1hZ2UvaW5kZXguanMiLCJVSUxpc3QvaW5kZXguanMiLCJVSU1vZGFsL2luZGV4LmpzIiwiVUlQb3BvdmVyL2luZGV4LmpzIiwiVUlQcm9ncmVzcy9pbmRleC5qcyIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiVUlSYWRpby9pbmRleC5qcyIsIlVJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIlVJVGFibGUvaW5kZXguanMiLCJVSVRva2VuaXplZElucHV0L2luZGV4LmpzIiwiVUlUb29sdGlwL2luZGV4LmpzIiwiVUlUeXBlYWhlYWRJbnB1dC9pbmRleC5qcyIsIlVJVXRpbHMvbm9vcC9pbmRleC5qcyIsIlVJVXRpbHMvc2hhbGxvd0VxdWFsL2luZGV4LmpzIiwiVUlVdGlscy90cmFuc2Zvcm0vaW5kZXguanMiLCJVSVZpZXcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsImV4cG9ydHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDS00sUUFBUTtjQUFSLFFBQVE7O2FBQVIsUUFBUTs4QkFBUixRQUFROztzRUFBUixRQUFROzs7aUJBQVIsUUFBUTs7c0NBQ0k7QUFDVixnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUMzQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8s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QUFDO0FBQzlHLFdBQU8sRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxBQUFDO0FBQzlELHNCQUFrQixFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxBQUFDO0FBQy9GLFdBQU8sRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxBQUFDO0FBQzlELG9CQUFnQixFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxBQUFDO0FBQ3pGLGFBQVMsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxBQUFDO0FBQ3BFLG9CQUFnQixFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxBQUFDO0FBQ3pGLFVBQU0sRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxBQUFDO0NBQzlELENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICB0b2dnbGVTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlCdXR0b24ucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkNsaWNrOiBub29wLFxuICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICBvblVucHJlc3NlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQnV0dG9uO1xuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSgpIHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMubmFtZSk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5hcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3gucHJvcFR5cGVzID0ge1xuICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGluZGV0ZXJtaW5hdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlDaGVja2JveC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hlY2tlZDogZmFsc2UsXG4gICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25DaGVja2VkOiBub29wLFxuICAgIG9uVW5jaGVja2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDaGVja2JveDtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGxldCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4udGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZT17IWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgY2JfaXRlbS5uYW1lYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBsZXQgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMgPSB7XG4gICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxufTtcblxuVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcyA9IHtcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25BbGxDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0QWxsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0QWxsTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICBdKSxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaXRlbXM6IFtdLFxuICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICBvbkNoaWxkQ2hlY2tlZDogbm9vcCxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICBzZWxlY3RBbGxMYWJlbDogJ1NlbGVjdCBBbGwnLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDaGVja2JveEdyb3VwO1xuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXJVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU91dHNpZGVDbGljayA9IHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlRm9jdXMgPSB0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcyk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGlzUGFydE9mRGlhbG9nKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5kaWFsb2cuY29udGFpbnMobm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYm9keVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlciB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZm9vdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoZWFkZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgcm9sZT0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuIHx8IHRoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSURpYWxvZy5wcm9wVHlwZXMgPSB7XG4gICAgYm9keTogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cblVJRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBib2R5UHJvcHM6IHt9LFxuICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICBmb290ZXJQcm9wczoge30sXG4gICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgIG9uQ2xvc2U6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSURpYWxvZztcbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSA9IHRoaXMucmVzY2FsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXNjYWxlKCkge1xuICAgICAgICBsZXQgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG4gICAgICAgIGxldCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICAgICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgICAgICBsZXQgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IE1hdGgubWluKHRoaXMucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSArICdweCc7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRml0dGVkVGV4dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG59O1xuXG5VSUZpdHRlZFRleHQucHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRml0dGVkVGV4dDtcbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUltYWdlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWcgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgYWx0PXtudWxsfVxuICAgICAgICAgICAgICAgICBzcmM9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJSW1hZ2Uuc3RhdHVzID0ge1xuICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgIEVSUk9SOiAnRVJST1InLFxufTtcblxuVUlJbWFnZS5wcm9wVHlwZXMgPSB7XG4gICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJSW1hZ2UuZGVmYXVsdFByb3BzID0ge1xuICAgIGltYWdlUHJvcHM6IHt9LFxuICAgIHN0YXR1c1Byb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJSW1hZ2U7XG4iLCIvKipcbiAqIEEgZ2VuZXJpYyBsaXN0IHZpZXcsIHN1cHBvcnRpbmcgdW5zdHlsZWQsIGJ1bGxldGVkIGFuZCBudW1iZXJlZCBvdXRwdXQuXG4gKiBAY2xhc3MgVUlMaXN0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlMaXN0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmVJdGVtOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmVmc1tgaXRlbV8ke2luZGV4fWBdLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dEl0ZW1JbmRleChjdXJyZW50SXRlbSkge1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c0l0ZW1JbmRleChjdXJyZW50SXRlbSkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSB0aGlzLnByb3BzLml0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pIC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtcztcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuc3RhdGUuYWN0aXZlSXRlbTtcblxuICAgICAgICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRJdGVtSW5kZXgoYWN0aXZlSXRlbSkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwcmV2ID0gKCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c0l0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ1RhYicpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IGl0ZW1zLmluZGV4T2YoYWN0aXZlSXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBhY3RpdmVJdGVtSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmV2KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFldmVudC5zaGlmdEtleSAmJiBhY3RpdmVJdGVtSW5kZXggIT09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHByZXYoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGVUeXBlID0gdGhpcy5wcm9wcy50eXBlID8gJ2xpJyA6ICdzcGFuJztcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChub2RlVHlwZSwge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWxpc3QtaXRlbScsXG4gICAgICAgICAgICAgICAgcmVmOiBgaXRlbV8ke2luZGV4fWAsXG4gICAgICAgICAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6ICgpID0+IHRoaXMuc3RhdGUuYWN0aXZlSXRlbSA9PT0gaXRlbSAmJiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBudWxsfSksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSXRlbTogaXRlbX0pLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG5vZGVUeXBlID0gJ2Rpdic7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYnVsbGV0JzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ3VsJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBub2RlVHlwZSA9ICdvbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgcmVmOiAnbGlzdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAndWktbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtYnVsbGV0ZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdidWxsZXQnLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LW51bWJlcmVkJzogdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1wbGFpbic6IHRoaXMucHJvcHMudHlwZSAhPT0gJ2J1bGxldCcgJiYgdGhpcy5wcm9wcy50eXBlICE9PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMucmVuZGVyQ29udGVudCgpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblVJTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5ub2RlKSxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydidWxsZXQnLCAnbnVtYmVyJ10pLFxufTtcblxuVUlMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUxpc3Q7XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGlhbG9nU3BlY2lmaWNQcm9wcyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZyB7Li4uZGlhbG9nU3BlY2lmaWNQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSU1vZGFsLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgbWFza1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1vZGFsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSU1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgbWFza1Byb3BzOiB7fSxcbiAgICBtb2RhbFByb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJTW9kYWw7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24gPSB0aGlzLmFsaWduLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduKCkge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy5ub2RlLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2cgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBvcG92ZXIucG9zaXRpb24gPSB7XG4gICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgTUlERExFOiAnTUlERExFJyxcbiAgICBFTkQ6ICdFTkQnLFxufTtcblxuVUlQb3BvdmVyLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBhbmNob3JYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZlhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbn07XG5cblVJUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQb3BvdmVyO1xuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b24gey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxufTtcblxuVUlQcm9ncmVzcy5wcm9wVHlwZXMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3M7XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBvbkV4cGFuZDogbm9vcCxcbiAgICBvbkhpZGU6IG5vb3AsXG4gICAgdG9nZ2xlUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU7XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUmFkaW8ucHJvcFR5cGVzID0ge1xuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuVUlSYWRpby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVJhZGlvO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFVJVmlldyB7XG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcHRpb25TZWxlY3RlZChvcHRpb24udmFsdWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbil9KTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b24gey4uLmRlZmluaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/IDAgOiAtMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgYXJpYS1yZXF1aXJlZD0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9wdGlvbnM6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdWYWx1ZSA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3ZhbHVlJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRW5jb3VudGVyZWQgbXVsdGlwbGUgb3B0aW9ucyB3aXRoIGBzZWxlY3RlZDogdHJ1ZWAuIFRoZXJlIGNhbiBiZSBvbmx5IG9uZS4nKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5VSVNlZ21lbnRlZENvbnRyb2wuZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVNlZ21lbnRlZENvbnRyb2w7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogU2Nyb2xsIHBlcmZvcm1hbmNlIGlzIGEgdHJpY2t5IGJlYXN0IC0tIG1vcmVzbyB3aGVuIHRyeWluZyB0byBtYWludGFpbiA1MCsgRlBTIGFuZCBwdW1waW5nIGEgbG90IG9mIGRhdGFcbiAqIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0XG4gKiBiZSBrbm93biB0aGF0IHdlIHRyaWVkIHRvIGRvIGl0IHRoZSBSZWFjdCBXYXnihKIgYW5kIGl0IHdhcyBub3QgcGVyZm9ybWFudCBlbm91Z2guXG4gKlxuICogVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGVcbiAqIGJlc3QgcGVyZm9ybWFuY2UsIHdoaWxlIHN0aWxsIGJlaW5nIHBlcmZlY3RseSBpbnRlcm9wZXJhYmxlIHdpdGggdGhlIHJlc3Qgb2YgVUlLaXQgYW5kIFJlYWN0IHVzZSBjYXNlcy5cbiAqXG4gKiBBdCBzb21lIHBvaW50LCB0aGUgaW50ZXJuYWxzIHdpbGwgcHJvYmFibHkgYmUgZnVsbHktc2VwYXJhdGVkIGludG8gaXRzIG93biBtb2R1bGUgc3VjaCB0aGF0IGl0IGNhblxuICogYmUgZW1iZWRkZWQgaW4gb3RoZXIgcGxhY2VzIHdpdGhvdXQgUmVhY3QuXG4gKlxuICogX19JbXBvcnRhbnQgTm90ZV9fXG4gKlxuICogQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLlxuICogSWYgeW91IGRvbid0LCBpdCdsbCBjcmVhdGUgYSBtZW1vcnkgbGVhay4gQWxzbywgbWFrZSBzdXJlIGFsbCBnZW5lcmF0ZWQgRE9NIGlzIHJlbW92ZWQgb24gY29tcG9uZW50V2lsbFVubW91bnQuXG4gKi9cblxuLyoqXG4gKiBPUkRFUiBPRiBPUEVSQVRJT05TXG4gKlxuICogMS4gcmVuZGVyIG9uZSByb3cgb2YgY2VsbHNcbiAqIDIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4gKiAzLiByZW5kZXIgY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcbiAqXG4gKiBJZiB0aGUgY29tcG9uZW50IHVwZGF0ZXMgZHVlIHRvIG5ldyBwcm9wcywganVzdCBibG93IGF3YXkgZXZlcnl0aGluZyBhbmQgc3RhcnQgb3Zlci4gSXQncyBjaGVhcGVyIHRoYW5cbiAqIHRyeWluZyB0byBkaWZmLlxuICovXG5cbmNvbnN0IGNlbGxDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1jZWxsXFxiL2c7XG5jb25zdCByb3dDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3dcXGIvZztcbmNvbnN0IGFjdGl2ZUNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1hY3RpdmUvZztcbmNvbnN0IGxvYWRpbmdDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctbG9hZGluZy9nO1xuY29uc3QgZXZlbkNsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvdy1ldmVuL2c7XG5jb25zdCBvZGRDbGFzc1JlZ2V4ID0gL1xccz91aS10YWJsZS1yb3ctb2RkL2c7XG5cbi8qKiBAaWdub3JlICovXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcbmNvbnN0IGZpbmRXaGVyZSA9IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn07IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcblxuY29uc3QgcmVwYXJlbnRDZWxsVGV4dCA9IGZ1bmN0aW9uIHJlcGFyZW50Q2VsbFRleHQobm9kZSwgY29udGVudCkge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwtaW5uZXInO1xuXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICByZXR1cm4gdGV4dE5vZGU7XG59O1xuXG5jb25zdCBjcmVhdGVET01DZWxsID0gZnVuY3Rpb24gY3JlYXRlRE9NQ2VsbChjb250ZW50LCBtYXBwaW5nLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICd1aS10YWJsZS1jZWxsJztcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBjb250ZW50KTtcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlRE9NSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUhlYWRlckNlbGwoY29sdW1uLCB3aWR0aCkge1xuICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVET01DZWxsKGNvbHVtbi50aXRsZSwgY29sdW1uLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBoYW5kbGUuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnO1xuXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZUhlYWRlckNlbGwgPSBmdW5jdGlvbiBjcmVhdGVIZWFkZXJDZWxsKG1ldGFkYXRhLCB3aWR0aCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVET01IZWFkZXJDZWxsKG1ldGFkYXRhLCBtZXRhZGF0YS53aWR0aCB8fCB3aWR0aCk7XG4gICAgY29uc3QgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiAgIG5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gM1xuICAgICAgICAgICAgICAgICAgICAgPyBub2RlLmNoaWxkTm9kZXNbMF1cbiAgICAgICAgICAgICAgICAgICAgIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoIHx8IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbWluV2lkdGg6IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApLFxuICAgICAgICBtYXhXaWR0aDogcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCksXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVDZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ190ZXh0Tm9kZSc6ICAgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzXG4gICAgICAgICAgICAgICAgICAgICA/IG5vZGUuY2hpbGROb2Rlc1swXVxuICAgICAgICAgICAgICAgICAgICAgOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUubm9kZVZhbHVlID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IHdpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVET01Sb3cgPSBmdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLXJvdyc7XG4gICAgICAgICAgcm93LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG5cbiAgICByZXR1cm4gcm93O1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsc1tpbmRleF0ubm9kZSk7XG4gICAgfSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGZyYWdtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHJvd09iaiA9IHtcbiAgICAgICAgbm9kZTogcm93LFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgICdfaXRlcmF0b3InOiBudWxsLFxuICAgICAgICAnX2FjdGl2ZSc6IGZhbHNlLFxuICAgICAgICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9LFxuICAgICAgICBzZXQgYWN0aXZlKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShhY3RpdmVDbGFzc1JlZ2V4LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3NldEluZGV4JzogbnVsbCxcbiAgICAgICAgZ2V0IHNldEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2V0SW5kZXg7IH0sXG4gICAgICAgIHNldCBzZXRJbmRleCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5kZXggPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0SW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2Uob2RkQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWV2ZW4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoZXZlbkNsYXNzUmVnZXgsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSArPSAnIHVpLXRhYmxlLXJvdy1vZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19kYXRhJzogbnVsbCxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBzZXQgX3dhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShsb2FkaW5nQ2xhc3NSZWdleCwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9LFxuICAgICAgICBzZXQgZGF0YSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCByZXNvbHZlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHRoaXMuX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLmNlbGxzLmxlbmd0aDsgdGhpcy5faXRlcmF0b3IgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbY29sdW1uc1t0aGlzLl9pdGVyYXRvcl0ubWFwcGluZ107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgc28gdGhlIFByb21pc2UgaGFuZGxpbmcgY2FuIHRha2UgcGxhY2UgaWYgbmVlZGVkLi4uXG4gICAgcm93T2JqLmRhdGEgPSBtZXRhZGF0YS5kYXRhO1xuXG4gICAgcmV0dXJuIHJvd09iajtcbn1cblxuY29uc3QgdHJhbnNsYXRlM2QgPSBmdW5jdGlvbiB0cmFuc2xhdGUzRCh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMHB4KSc7XG59OyAvLyB6IGlzIG5ldmVyIHVzZWRcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMuX3Jvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVkgPSBbXTtcblxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQgPSB0aGlzLmhhbmRsZU1vdmVJbnRlbnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCA9IHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl9ib2R5ID0gdGhpcy5yZWZzLmJvZHk7XG4gICAgICAgIHRoaXMuX2JvZHlfcyA9IHRoaXMuX2JvZHkuc3R5bGU7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IHRoaXMucmVmcy5oZWFkZXI7XG4gICAgICAgIHRoaXMuX2hlYWRlcl9zID0gdGhpcy5faGVhZGVyLnN0eWxlO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MgPSB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLnN0eWxlO1xuXG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVEcmFnTW92ZSk7XG4gICAgICAgIHRoaXMucmVmcy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgIHRoaXMuX2hlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgIHRoaXMuX2JvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgIHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICB0aGlzLnJlZnMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcbiAgICAgICAgdGhpcy5yZWZzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG5cbiAgICAgICAgdGhpcy5faGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5fYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgIHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVYU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQpO1xuXG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5lbXB0eUJvZHkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVnZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLl94ID0gdGhpcy5feSA9IDA7XG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbmV4dFkgPSAwO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IC0xO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuX2l0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpO1xuICAgIH1cblxuICAgIGVtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLl9jb2x1bW5zLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2hlYWRlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5faGVhZGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRDb2x1bW5zKCkge1xuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaW5kZXgpID0+IHRoaXMuX2NvbHVtbnMucHVzaChjcmVhdGVIZWFkZXJDZWxsKGNvbHVtbikpKTtcbiAgICB9XG5cbiAgICBpbmplY3RIZWFkZXJDZWxscygpIHtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5fZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uLm5vZGUpKTtcblxuICAgICAgICB0aGlzLl9oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5fZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGVtcHR5Qm9keSgpIHtcbiAgICAgICAgdGhpcy5fcm93cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkucmVtb3ZlQ2hpbGQodGhpcy5fYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluamVjdEZpcnN0Um93KCkge1xuICAgICAgICB0aGlzLmVtcHR5Qm9keSgpO1xuXG4gICAgICAgIHRoaXMuX3Jvd3MucHVzaChjcmVhdGVSb3coe1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3coMCksXG4gICAgICAgICAgICBzZXRJbmRleDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHRoaXMuX2NvbHVtbnMpKTtcblxuICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5wdXNoKDApO1xuXG4gICAgICAgIHRoaXMuX2JvZHkuYXBwZW5kQ2hpbGQodGhpcy5fcm93c1swXS5ub2RlKTtcbiAgICB9XG5cbiAgICBpbmplY3RSZXN0T2ZSb3dzKCkge1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMTsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvUmVuZGVyOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmdldFJvdyh0aGlzLl9pdGVyYXRvciksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuX2l0ZXJhdG9yLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuX2NlbGxfaCAqIHRoaXMuX2l0ZXJhdG9yLFxuICAgICAgICAgICAgfSwgdGhpcy5fY29sdW1ucykpO1xuXG4gICAgICAgICAgICB0aGlzLl9yb3dzT3JkZXJlZEJ5WS5wdXNoKHRoaXMuX2l0ZXJhdG9yKTtcblxuICAgICAgICAgICAgdGhpcy5fZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5fcm93c1t0aGlzLl9pdGVyYXRvcl0ubm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2ZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBudWxsOyAvLyBwcmV2ZW50IG1lbWxlYWtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDZWxsV2lkdGhzKCkge1xuICAgICAgICB0aGlzLl9yb3dzWzBdLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoIHx8IGNlbGwubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNlbGwud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWEJvdW5kKCkge1xuICAgICAgICB0aGlzLl9yb3dfdyA9IHRoaXMuX3Jvd3NbMF0ubm9kZS5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3hNYXhpbXVtID0gICB0aGlzLl9jb250YWluZXJfdyA8PSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fY29udGFpbmVyX3cgLSB0aGlzLl9yb3dfd1xuICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMuX3lVcHBlckJvdW5kID0gMDtcbiAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgPSB0aGlzLl9jb250YWluZXJfaCAtICh0aGlzLl9uUm93c1RvUmVuZGVyICogdGhpcy5fY2VsbF9oKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfdyAtIE1hdGguYWJzKHRoaXMuX3hNYXhpbXVtKTtcblxuICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPCAxMikge1xuICAgICAgICAgICAgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5feVNjcm9sbEhhbmRsZVNpemUgPSB0aGlzLl9jb250YWluZXJfaCAqICh0aGlzLl9uUm93c1RvUmVuZGVyIC8gdGhpcy5wcm9wcy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA8IDEyKSB7XG4gICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3Mud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkgKyAncHgnO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3MuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZWdlbmVyYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cbiAgICAgICAgdGhpcy5idWlsZENvbHVtbnMoKTtcblxuICAgICAgICB0aGlzLmluamVjdEZpcnN0Um93KCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2VsbFdpZHRocygpO1xuXG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG5cbiAgICAgICAgdGhpcy5fY2VsbF9oID0gdGhpcy5fcm93c1swXS5jZWxsc1swXS5ub2RlLmNsaWVudEhlaWdodCB8fCA0MDtcblxuICAgICAgICB0aGlzLl9jb250YWluZXJfaCA9IHRoaXMucmVmcy53cmFwcGVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcl93ID0gdGhpcy5yZWZzLndyYXBwZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuXG4gICAgICAgIHRoaXMuX3hTY3JvbGxUcmFja193ID0gdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5feVNjcm9sbFRyYWNrX2ggPSB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IDE1MDtcblxuICAgICAgICB0aGlzLl9uUm93c1RvUmVuZGVyID0gTWF0aC5jZWlsKCh0aGlzLl9jb250YWluZXJfaCAqIDEuMykgLyB0aGlzLl9jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvUmVuZGVyID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9SZW5kZXIgPSB0aGlzLnByb3BzLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCA9IHRoaXMuX25Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVZQm91bmQoKTtcblxuICAgICAgICB0aGlzLmluamVjdEhlYWRlckNlbGxzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UmVzdE9mUm93cygpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxEb3duKCkge1xuICAgICAgICBpZiAoICAgdGhpcy5fcm93RW5kSW5kZXggPT09IHRoaXMucHJvcHMudG90YWxSb3dzXG4gICAgICAgICAgICB8fCB0aGlzLl9uZXh0WSA+PSB0aGlzLl95TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgbG93ZXN0IFkgdmFsdWUgdG8gdGhlIHlMb3dlckJvdW5kIGFuZCByZXF1ZXN0IHRoZSBuZXh0IHJvdy4gU2NhbGUgYXBwcm9wcmlhdGVseSBpZiBhIGJpZyBkZWx0YSBhbmQgbWlncmF0ZSBhcyBtYW55IHJvd3MgYXMgYXJlIG5lY2Vzc2FyeS4gKi9cblxuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl9uZXh0WSAtIHRoaXMuX3lMb3dlckJvdW5kKSAvIHRoaXMuX2NlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgKyB0aGlzLl9yb3dFbmRJbmRleCArIDEgPiB0aGlzLnByb3BzLnRvdGFsUm93cykge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIHRoYW4gdGhlcmUgaXMgZGF0YSBhdmFpbGFibGUsIHRydW5jYXRlICovXG4gICAgICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSB0aGlzLnByb3BzLnRvdGFsUm93cyAtIHRoaXMuX3Jvd0VuZEluZGV4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5fblJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kIC09IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggKz0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCArPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvU2hpZnQ7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dFbmRJbmRleCArIHRoaXMuX2l0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IHRoaXMuX3Jvd3NbdGhpcy5fcm93c09yZGVyZWRCeVlbMF1dO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5fcm93c09yZGVyZWRCeVkuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCArPSB0aGlzLl9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMuX3lMb3dlckJvdW5kIC09IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbFVwKCkge1xuICAgICAgICBpZiAodGhpcy5fcm93U3RhcnRJbmRleCA9PT0gMCB8fCB0aGlzLl9uZXh0WSA8PSB0aGlzLl95VXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIHVwLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGhpZ2hlc3QgWSB2YWx1ZSB0byB0aGUgeVVwcGVyQm91bmQgYW5kIHJlcXVlc3QgdGhlIHByZXZpb3VzIHJvdy4gU2NhbGUgYXBwcm9wcmlhdGVseSBpZiBhIGJpZyBkZWx0YSBhbmQgbWlncmF0ZSBhcyBtYW55IHJvd3MgYXMgYXJlIG5lY2Vzc2FyeS4gKi9cblxuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl9uZXh0WSAtIHRoaXMuX3lVcHBlckJvdW5kKSAvIHRoaXMuX2NlbGxfaFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5fblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fcm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5fblJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5fblJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX3NoaWZ0RGVsdGEgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fblJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBoaWdoZXN0IFktdmFsdWUgcm93cyB0byB0aGUgdG9wIG9mIHRoZSBvcmRlcmluZyBhcnJheSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IHRoaXMuX3Jvd3NPcmRlcmVkQnlZLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLl9uUm93c1RvU2hpZnQ7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0SW5kZXggPSB0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5faXRlcmF0b3IgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIgPSB0aGlzLl9yb3dzW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93c09yZGVyZWRCeVlbdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XVxuICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5hY3RpdmUgPSB0aGlzLl90YXJnZXRJbmRleCA9PT0gdGhpcy5fYWN0aXZlUm93O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3NPcmRlcmVkQnlZLnVuc2hpZnQodGhpcy5fcm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxfaDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9uUm93c1RvU2hpZnQgKiB0aGlzLl9jZWxsX2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluaW11bSB0cmFuc2xhdGlvbiBzaG91bGQgYmUgb25lIHJvdyBoZWlnaHRcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIC8vIGRlbHRhTW9kZSAwID09PSBwaXhlbHMsIDEgPT09IGxpbmVzXG4gICAgICAgIHRoaXMuX2RlbHRhWSA9IGV2ZW50LmRlbHRhTW9kZSA9PT0gMSA/IHBhcnNlSW50KGV2ZW50LmRlbHRhWSkgKiB0aGlzLl9jZWxsX2ggOiBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMuX3ggLSB0aGlzLl9kZWx0YVg7XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRYID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dFggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRYIDwgdGhpcy5feE1heGltdW0pIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRYID0gdGhpcy5feE1heGltdW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA/IDAgOiB0aGlzLl95IC0gdGhpcy5fZGVsdGFZO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsRG93bigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZXh0WSA+IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0WSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25leHRZIDwgdGhpcy5feUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0WSA9IHRoaXMuX3lMb3dlckJvdW5kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WCkgLyAodGhpcy5fcm93X3cgLSB0aGlzLl9jb250YWluZXJfdykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAodGhpcy5feFNjcm9sbFRyYWNrX3cgLSB0aGlzLl94U2Nyb2xsSGFuZGxlU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feFNjcm9sbEhhbmRsZVBvc2l0aW9uICsgdGhpcy5feFNjcm9sbEhhbmRsZVNpemUgPiB0aGlzLl94U2Nyb2xsVHJhY2tfdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSB0aGlzLl94U2Nyb2xsVHJhY2tfdyAtIHRoaXMuX3hTY3JvbGxIYW5kbGVTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubmV4dFkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gPSAgIChNYXRoLmFicyh0aGlzLl9uZXh0WSkgLyAoKHRoaXMucHJvcHMudG90YWxSb3dzICogdGhpcy5fY2VsbF9oKSAtIHRoaXMuX2NvbnRhaW5lcl9oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICh0aGlzLl95U2Nyb2xsVHJhY2tfaCAtIHRoaXMuX3lTY3JvbGxIYW5kbGVTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24gKyB0aGlzLl95U2Nyb2xsSGFuZGxlU2l6ZSA+IHRoaXMuX3lTY3JvbGxUcmFja19oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3lTY3JvbGxIYW5kbGVQb3NpdGlvbiA9IHRoaXMuX3lTY3JvbGxUcmFja19oIC0gdGhpcy5feVNjcm9sbEhhbmRsZVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMoKTsgLy8gRG8gYWxsIHRyYW5zZm9ybXMgZ3JvdXBlZCB0b2dldGhlclxuXG4gICAgICAgICAgICB0aGlzLl94ID0gdGhpcy5fbmV4dFg7XG4gICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fbmV4dFk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBlcmZvcm1UcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcl9zW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QodGhpcy5fbmV4dFgpO1xuICAgICAgICB0aGlzLl9ib2R5X3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl9uZXh0WCwgdGhpcy5fbmV4dFkpO1xuICAgICAgICB0aGlzLl94U2Nyb2xsSGFuZGxlX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh0aGlzLl94U2Nyb2xsSGFuZGxlUG9zaXRpb24pO1xuICAgICAgICB0aGlzLl95U2Nyb2xsSGFuZGxlX3NbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCgwLCB0aGlzLl95U2Nyb2xsSGFuZGxlUG9zaXRpb24pO1xuICAgIH1cblxuICAgIGhhbmRsZVhTY3JvbGxIYW5kbGVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVZU2Nyb2xsSGFuZGxlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIEZpeGVzIGRyYWdTdGFydCBvY2Nhc2lvbmFsbHkgaGFwcGVuaW5nIGFuZCBicmVha2luZyB0aGUgc2ltdWxhdGVkIGRyYWdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiBldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdFhTY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogKChldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdFlTY3JvbGwpIC8gdGhpcy5fY29udGFpbmVyX2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5fY2VsbF9oLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQoKSB7XG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgICAgICB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gZmluZFdoZXJlKHRoaXMuX2NvbHVtbnMsICdtYXBwaW5nJywgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jb2x1bW5zLmluZGV4T2YodGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbik7XG5cbiAgICAgICAgaWYgKCAgIGFkanVzdGVkRGVsdGEgPCAwXG4gICAgICAgICAgICAmJiAhaXNOYU4odGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5taW5XaWR0aClcbiAgICAgICAgICAgICYmIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggKyBhZGp1c3RlZERlbHRhIDwgdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1pbldpZHRoIC0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXhXaWR0aClcbiAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA+IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1heFdpZHRoIC0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkanVzdCB0aGUgY29sdW1uIGhlYWRlciBjZWxsXG4gICAgICAgIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGggPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uLndpZHRoICsgYWRqdXN0ZWREZWx0YTtcblxuICAgICAgICAvLyBBZGp1c3QgdGhlIGNvcnJlc3BvbmRpbmcgcm93IGNlbGxzXG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmNlbGxzW2luZGV4XS53aWR0aCA9IHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4ud2lkdGgpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjcm9sbEJhcnMoKTtcblxuICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgIHdlJ2xsIHNlZSB1bndhbnRlZCB3aGl0ZXNwYWNlIG9uIHRoZSByaWdodCBzaWRlLiBJZiB0aGUgdGFibGUgd2lkdGggYmVjb21lcyBzbWFsbGVyIHRoYW4gdGhlIG92ZXJhbGwgY29udGFpbmVyLCB3aGl0ZXNwYWNlIHdpbGwgYXBwZWFyIHJlZ2FyZGxlc3MuICovXG4gICAgICAgIGlmIChhZGp1c3RlZERlbHRhIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IGFkanVzdGVkRGVsdGEsXG4gICAgICAgICAgICAgICAgZGVsdGFZOiAwLFxuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRLZXlGcm9tS2V5Q29kZShjb2RlKSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgcmV0dXJuICdBcnJvd0Rvd24nO1xuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93VXAnO1xuXG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICByZXR1cm4gJ0VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEFyaWFUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy5yZWZzLmFyaWEuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVSb3coc2V0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gc2V0SW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaChyb3cgPT4gcm93LmFjdGl2ZSA9IHJvdy5zZXRJbmRleCA9PT0gc2V0SW5kZXgpO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdzZXRJbmRleCcsIHRoaXMuX2FjdGl2ZVJvdyArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5fbmV4dEFjdGl2ZVJvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3codGhpcy5fbmV4dEFjdGl2ZVJvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLl9jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgPiB0aGlzLl95KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLl9uZXh0QWN0aXZlUm93LnkgKiAtMSAtIHRoaXMuX2NlbGxfaCA8IHRoaXMuX3kgLSB0aGlzLl9jb250YWluZXJfaCArIHRoaXMuX2NlbGxfaCkgLy8gMSB1bml0IG9mIGNlbGxIZWlnaHQgaXMgcmVtb3ZlZCB0byBjb21wZW5zYXRlIGZvciB0aGUgaGVhZGVyIHJvd1xuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogdGhpcy5fY2VsbF9oICogZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fYWN0aXZlUm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5fYWN0aXZlUm93IDwgdGhpcy5wcm9wcy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93blxuICAgICAgICAgICAgICAgIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgICAgICAgICAgZGVsdGFZOiAoICAgKCAgICB0aGlzLl9yb3dTdGFydEluZGV4ID4gdGhpcy5fYWN0aXZlUm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hY3RpdmVSb3cgLSB0aGlzLl9yb3dTdGFydEluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA8IHRoaXMuX2FjdGl2ZVJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5fYWN0aXZlUm93IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuX2NlbGxfaCxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LmtleSB8fCB0aGlzLmdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVSb3cgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLl9yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLl9hY3RpdmVSb3cpLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMuX2NvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvd1tjb2x1bW4ubWFwcGluZ119YDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGxldCBub2RlTWFwID0ge307XG5cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NOYW1lLm1hdGNoKHJvd0NsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvdzogbm9kZX07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoKCFub2RlTWFwLmNlbGwgfHwgIW5vZGVNYXAucm93KSAmJiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2goY2VsbENsYXNzUmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5jZWxsID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLnJvdyA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZU1hcDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5kaXNjb3ZlckNlbGxBbmRSb3dOb2RlcyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChtYXAucm93KSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuX3Jvd3MsICdub2RlJywgbWFwLnJvdyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KHJvdy5zZXRJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChtYXAuY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0KGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJyBjbGFzc05hbWU9J3VpLXRhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzIHx8ICd1aS1vZmZzY3JlZW4nfSBhcmlhLWxpdmU9J3BvbGl0ZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93SW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cblVJVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgY29sdW1uczogW10sXG4gICAgZ2V0Um93OiBub29wLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNlbGxJbnRlcmFjdDogbm9vcCxcbiAgICBvblJvd0ludGVyYWN0OiBub29wLFxuICAgIHRvdGFsUm93czogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBmdW5jdGlvbiBnZXRGaXJzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVswXTtcbn07XG5cbmNvbnN0IGxhc3QgPSBmdW5jdGlvbiBnZXRMYXN0QXJyYXlJdGVtKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufTtcblxuY29uc3Qgd2l0aG91dCA9IGZ1bmN0aW9uIHJlamVjdFNvbWVBcnJheUl0ZW1zKGJhc2VBcnJheSwgLi4udG9CZUV4Y2x1ZGVkKSB7XG4gICAgcmV0dXJuIGJhc2VBcnJheS5maWx0ZXIoZnVuY3Rpb24gcmVqZWN0U29tZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0b0JlRXhjbHVkZWQuaW5kZXhPZihpdGVtKSA9PT0gLTE7XG4gICAgfSk7XG59O1xuXG5jbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlczogW10uY29uY2F0KHRoaXMucHJvcHMuZGVmYXVsdFRva2VuaXplZEVudGl0eUluZGV4ZXMpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBsZXQgcHJldmlvdXNJbmRleGVzID0gcHJldlN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXM7XG4gICAgICAgIGxldCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZTdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBjdXJyZW50SW5kZXhlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcztcbiAgICAgICAgbGV0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDtcblxuICAgICAgICBpZiAocHJldmlvdXNJbmRleGVzICE9PSBjdXJyZW50SW5kZXhlcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblRva2VuQ2hhbmdlKGN1cnJlbnRJbmRleGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlcykgeyAvLyBtb3ZlIGZvY3VzXG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB0b2tlbiBiYXNlZCBvbiBhbiBlbnRpdHkncyBhcnJheSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfEFycmF5PE51bWJlcj59ICBpbmRleCAgICAgICAgIHRoZSBhcnJheSBpbmRleCBvZiB0aGUgZGVzaXJlZCBlbnRpdHkgdG8gYmUgdG9rZW5pemVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICAgIFtmb2N1c0lucHV0XSAgZGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgc2hvdWxkIGJlIGZvY3VzZWQgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gY2hhbmdlcyBhcmUgYXBwbGllZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgICBbY2xlYXJJbnB1dF0gIGRldGVybWluZXMgaWYgdGhlIGlucHV0IHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIGNoYW5nZXMgYXJlIGFwcGxpZWRcbiAgICAgKi9cbiAgICBhZGRUb2tlbihpbmRleCwgZm9jdXNJbnB1dCwgY2xlYXJJbnB1dCkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gKEFycmF5LmlzQXJyYXkoaW5kZXgpID8gaW5kZXggOiBbaW5kZXhdKS5maWx0ZXIoaWR4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXMuaW5kZXhPZihpZHgpID09PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dG9rZW5pemVkRW50aXR5SW5kZXhlczogdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzLmNvbmNhdChpbmRleGVzKX0pO1xuXG4gICAgICAgIGZvY3VzSW5wdXQgJiYgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1c0lucHV0KCk7XG4gICAgICAgIGNsZWFySW5wdXQgJiYgdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSgnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgdG9rZW4gYmFzZWQgb24gYW4gZW50aXR5J3MgYXJyYXkgaW5kZXguIElmIG5vIGluZGV4IGlzIGdpdmVuLCBhbGwgdG9rZW5zIGFyZSByZW1vdmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8QXJyYXk8TnVtYmVyPn0gIGluZGV4ICAgICAgICAgdGhlIGFycmF5IGluZGV4IG9mIHRoZSBkZXNpcmVkIGVudGl0eSB0byBiZSB0b2tlbml6ZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgICAgICAgW2ZvY3VzSW5wdXRdICBkZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBzaG91bGQgYmUgZm9jdXNlZCBhZnRlciB0aGVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiBjaGFuZ2VzIGFyZSBhcHBsaWVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICAgIFtjbGVhcklucHV0XSAgZGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgc2hvdWxkIGJlIGNsZWFyZWQgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gY2hhbmdlcyBhcmUgYXBwbGllZFxuICAgICAqL1xuICAgIHJlbW92ZVRva2VuKGluZGV4ID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQsIGZvY3VzSW5wdXQsIGNsZWFySW5wdXQpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IEFycmF5LmlzQXJyYXkoaW5kZXgpID8gaW5kZXggOiBbaW5kZXhdO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlczogd2l0aG91dCh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXMsIC4uLmluZGV4ZXMpLFxuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiB3aXRob3V0KHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLCAuLi5pbmRleGVzKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9jdXNJbnB1dCAmJiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgY2xlYXJJbnB1dCAmJiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKCcnKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Rva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogW119KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGluZGV4ZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbbGFzdChpbmRleGVzKV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkO1xuICAgICAgICBsZXQgaW5kZXhlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogW10sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1c0lucHV0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQmFja3NwYWNlJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9rZW4oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnJlbW92ZVRva2VuKGluZGV4KTtcbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUb2tlbkNsb3NlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0U2luZ2xlVG9rZW4oaW5kZXgpIHtcbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpID09PSAtMVxuICAgICAgICAgICAgfHwgdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbaW5kZXhdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RTaW5nbGVUb2tlbihpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0U2luZ2xlVG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dCB7Li4uZGVzY2VuZGFudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkVG9rZW4uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRva2VuaXplZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICBkZWZhdWx0VG9rZW5pemVkRW50aXR5SW5kZXhlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgb25Ub2tlbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlUb2tlbml6ZWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgZGVmYXVsdFRva2VuaXplZEVudGl0eUluZGV4ZXM6IFtdLFxuICAgIG9uVG9rZW5DaGFuZ2U6IG5vb3AsXG4gICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRva2VuaXplZElucHV0O1xuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRvb2x0aXAucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICBBRlRFUjogJ0FGVEVSJyxcbn07XG5cblVJVG9vbHRpcC5wcm9wVHlwZXMgPSB7XG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUb29sdGlwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb29sdGlwO1xuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQoKSB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgKCkgPT4gdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpKTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGVudGl0eUNvbnRlbnQsIHVzZXJUZXh0KSB7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIodXNlclRleHQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlcklucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLndhcm4oJ05vIGBwcm9wcy5hbGdvcml0aG0ubWFya0Z1bmNgIHdhcyBwcm92aWRlZCB0byBVSVR5cGVhaGVhZElucHV0OyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0uJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyguLi5hcmdzKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hbGdvcml0aG0pIHtcbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEg6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuXG4gICAgICAgIGNhc2UgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUud2FybignTm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaEZ1bmNgIHdhcyBwcm92aWRlZCB0byBVSVR5cGVhaGVhZElucHV0OyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtLicpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcklucHV0OiBldmVudC50YXJnZXQudmFsdWV9LCAoKSA9PiB0aGlzLmNvbXB1dGVNYXRjaGVzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlbnRpdHkudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHkudGV4dCwgdGhpcy5zdGF0ZS51c2VySW5wdXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgdHlwZT17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0Lm1vZGUgPSB7XG4gICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAnRlVaWlknOiAnRlVaWlknLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgYWxnb3JpdGhtOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgXSksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9KSxcbiAgICBdKSxcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Db21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVR5cGVhaGVhZElucHV0O1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvdHJhbnNmb3JtXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBsZXQgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJVmlldztcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgICdcXFxcJCYnKTtcbn07XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlMaXN0OiAoZ2xvYmFsLlVJS2l0LlVJTGlzdCA9IHJlcXVpcmUoJy4vVUlMaXN0JykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJVmlldyA9IHJlcXVpcmUoJy4vVUlWaWV3JykuZGVmYXVsdCksXG59O1xuIl19
