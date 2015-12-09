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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],2:[function(require,module,exports){
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],3:[function(require,module,exports){
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

},{"../UICheckbox":2,"../UIUtils/noop":20,"../UIView":23,"classnames":24}],4:[function(require,module,exports){
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],5:[function(require,module,exports){
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

},{"../UIView":23,"classnames":24}],6:[function(require,module,exports){
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],7:[function(require,module,exports){
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

},{"../UIView":23,"classnames":24}],8:[function(require,module,exports){
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

},{"../UIDialog":4,"../UIView":23,"classnames":24}],9:[function(require,module,exports){
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

},{"../UIDialog":4,"../UIUtils/transform":22,"../UIView":23,"classnames":24}],10:[function(require,module,exports){
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

},{"../UIButton":1,"../UIView":23,"classnames":24}],11:[function(require,module,exports){
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
                    this.props.teaser
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],12:[function(require,module,exports){
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],13:[function(require,module,exports){
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

},{"../UIButton":1,"../UIUtils/noop":20,"../UIView":23,"classnames":24}],14:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITableCell = (function (_UIView) {
    _inherits(UITableCell, _UIView);

    function UITableCell() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITableCell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITableCell)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(UITableCell, [{
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onInteract) {
                event.persist();

                this.props.onInteract(event, this.props.row, this.props.content);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            if (typeof this.props.width === 'number') {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-table-cell-inner' },
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-table-cell-inner-text' },
                        this.props.content
                    )
                );
            }

            return this.props.content;
        }
    }, {
        key: 'render',
        value: function render() {
            var addTitle = typeof this.props.content === 'string';

            return _react2.default.createElement(
                'div',
                { className: 'ui-table-cell',
                    title: addTitle ? this.props.content : null,
                    style: { width: this.props.width ? this.props.width + 'px' : null },
                    onClick: this.handleClick },
                this.renderContent()
            );
        }
    }]);

    return UITableCell;
})(_UIView3.default);

UITableCell.propTypes = {
    content: _react2.default.PropTypes.node,
    width: _react2.default.PropTypes.number,
    onInteract: _react2.default.PropTypes.func,
    row: _react2.default.PropTypes.object
};

exports.default = UITableCell;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":23}],15:[function(require,module,exports){
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

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A high-performance, infinite table view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * FOR FUTURE EYES
 *
 * There are a lot of places where shared this.{name} variables have been
 * used where they don't seem to be needed. This is completely on purpose to
 * reduce memory pressure during scroll operations. If you change them back to
 * normal vars, you'll see the sawtoothing in your JS profiler... so don't do it!
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. initial render w/ one row of cells
 * 2. capture table & cell sizing metrics
 * 3. apply widths to column definitions
 * 4. render pass 2 w/ column heads and the rest of the cells
 */

/** @ignore */
var findWhere = function findWhere(array, property, value) {
    var index = array.length - 1;

    while (index > -1) {
        if (array[index][property] === value) {
            return array[index];
        }

        index -= 1;
    }
}; // optimized specifically to only look for a single key:value match

var UITable = (function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITable)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleRowClick = _this.handleRowClick.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleDragMove = _this.handleDragMove.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleMoveIntent = _this.handleMoveIntent.bind(_this);

        _this.handleXScrollerDragStart = _this.handleXScrollerDragStart.bind(_this);
        _this.handleYScrollerDragStart = _this.handleYScrollerDragStart.bind(_this);
        _this.handleColumnDragStart = _this.handleColumnDragStart.bind(_this);
        return _this;
    }

    _createClass(UITable, [{
        key: 'initialState',
        value: function initialState() {
            return {
                ariaSpokenOutput: '',
                chokeRender: true,
                currentActiveRowIndex: -1,
                rows: [{
                    data: this.props.getRow(0),
                    setIndex: 0,
                    y: 0
                }],
                rowsOrderedByY: [0],
                columns: this.props.columns.slice(0),
                xScrollerNubSize: null,
                yScrollerNubSize: null
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.xCurrent = this.yCurrent = 0;
            this.xNext = this.yNext = null;
            this.yScrollNubPosition = 0;

            // temporary variables in various calculations
            this.cache_iterator = null;
            this.cache_nextActiveRow = null;
            this.cache_nRowsToShift = null;
            this.cache_orderedYArrayTargetIndex = null;
            this.cache_rowPointer = null;
            this.cache_shiftDelta = null;
            this.cache_targetIndex = null;

            this.captureDimensions();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            /* so we can reuse state.rows to avoid extra array allocations in the scroll handlers - in this case a few more CPU cycles are far cheaper than running up against the GC */
            return true;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.refs.head && typeof this.minimumColumnWidth === 'undefined') {
                var node = this.refs.wrapper.getElementsByClassName('ui-table-header-cell')[0];

                if (node) {
                    var nodeStyle = window.getComputedStyle(node);

                    // will be NaN if not a pixel value
                    this.maximumColumnWidth = parseInt(nodeStyle.maxWidth, 10);
                    this.minimumColumnWidth = parseInt(nodeStyle.minWidth, 10);
                }
            }
        }
    }, {
        key: 'calculateXScrollerNubSize',
        value: function calculateXScrollerNubSize() {
            var px = this.containerWidth - Math.abs(this.xMaximumTranslation);

            return px < 12 ? 12 : px;
        }
    }, {
        key: 'calculateYScrollerNubSize',
        value: function calculateYScrollerNubSize() {
            var px = this.rowEndIndex / this.props.totalRows;

            return px < 12 ? 12 : px;
        }
    }, {
        key: 'captureDimensions',
        value: function captureDimensions() {
            var firstRow = this.refs.body.getElementsByClassName('ui-table-row')[0];
            var firstRowCells = firstRow.getElementsByClassName('ui-table-cell');
            var container = this.refs.wrapper;

            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */

            this.cellHeight = firstRowCells[0].clientHeight || 40;
            this.containerHeight = container.clientHeight || 150;
            this.containerWidth = container.clientWidth || 500;

            this.nRowsToRender = Math.ceil(this.containerHeight * 1.3 / this.cellHeight);

            this.rowStartIndex = 0;
            this.rowEndIndex = this.nRowsToRender;

            var tableWidth = firstRow.clientWidth || 500;

            this.xMaximumTranslation = this.containerWidth > tableWidth ? 0 : this.containerWidth - tableWidth;

            this.yUpperBound = 0;
            this.yLowerBound = this.containerHeight - this.nRowsToRender * this.cellHeight;

            var adjustedColumns = this.state.columns.map(function discoverWidth(column, index) {
                return _extends({}, column, {
                    width: Math.ceil(firstRowCells[index].getBoundingClientRect().width)
                });
            });

            var generatedRows = [];
            var rowsOrderedByY = [];

            for (var i = 0; i < this.nRowsToRender; i += 1) {
                generatedRows.push({
                    data: this.props.getRow(i),
                    setIndex: i,
                    y: this.cellHeight * i
                });

                rowsOrderedByY.push(i);
            }

            this.setState({
                chokeRender: false,
                columns: adjustedColumns,
                rows: generatedRows,
                rowsOrderedByY: rowsOrderedByY,
                xScrollerNubSize: this.calculateXScrollerNubSize(),
                yScrollerNubSize: this.calculateYScrollerNubSize()
            });
        }
    }, {
        key: 'handleScrollDown',
        value: function handleScrollDown() {
            if (this.rowEndIndex === this.props.totalRows || this.yNext >= this.yLowerBound) {
                return;
            }

            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this.cache_nRowsToShift = Math.ceil(Math.abs(this.yNext - this.yLowerBound) / this.cellHeight);

            if (this.cache_nRowsToShift + this.rowEndIndex > this.props.totalRows) {
                /* more rows than there is data available, truncate */
                this.cache_nRowsToShift = this.props.totalRows - this.rowEndIndex;
            }

            if (this.cache_nRowsToShift > 0) {
                if (this.cache_nRowsToShift > this.nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this.cache_shiftDelta = this.cache_nRowsToShift - this.nRowsToRender;

                    this.yUpperBound -= this.cache_shiftDelta * this.cellHeight;
                    this.yLowerBound -= this.cache_shiftDelta * this.cellHeight;

                    this.rowStartIndex += this.cache_shiftDelta;
                    this.rowEndIndex += this.cache_shiftDelta;

                    this.cache_nRowsToShift = this.nRowsToRender;
                }

                if (this.cache_nRowsToShift > 0) {
                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this.cache_orderedYArrayTargetIndex = 0;

                    for (this.cache_iterator = 0; this.cache_iterator < this.cache_nRowsToShift; this.cache_iterator++) {
                        this.cache_targetIndex = this.rowEndIndex + this.cache_iterator;

                        this.cache_rowPointer = this.state.rows[this.state.rowsOrderedByY[this.cache_orderedYArrayTargetIndex]];
                        this.cache_rowPointer.data = this.props.getRow(this.cache_targetIndex);
                        this.cache_rowPointer.setIndex = this.cache_targetIndex;
                        this.cache_rowPointer.y = this.cache_targetIndex * this.cellHeight;

                        this.state.rowsOrderedByY.push(this.state.rowsOrderedByY.shift());
                    }

                    this.rowStartIndex += this.cache_nRowsToShift;
                    this.rowEndIndex += this.cache_nRowsToShift;

                    this.yUpperBound -= this.cache_nRowsToShift * this.cellHeight;
                    this.yLowerBound -= this.cache_nRowsToShift * this.cellHeight;

                    this.setState({ rows: this.state.rows });
                }
            }
        }
    }, {
        key: 'handleScrollUp',
        value: function handleScrollUp() {
            if (this.rowStartIndex === 0 || this.yNext <= this.yUpperBound) {
                return;
            }

            /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this.cache_nRowsToShift = Math.ceil(Math.abs(this.yNext - this.yUpperBound) / this.cellHeight);

            if (this.rowStartIndex - this.cache_nRowsToShift < 0) {
                this.cache_nRowsToShift = this.rowStartIndex;
            }

            if (this.cache_nRowsToShift > 0) {
                if (this.cache_nRowsToShift > this.nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this.cache_shiftDelta = this.cache_nRowsToShift - this.nRowsToRender;

                    this.yUpperBound += this.cache_shiftDelta * this.cellHeight;
                    this.yLowerBound += this.cache_shiftDelta * this.cellHeight;

                    this.rowStartIndex -= this.cache_shiftDelta;
                    this.rowEndIndex -= this.cache_shiftDelta;

                    this.cache_nRowsToShift = this.nRowsToRender;
                }

                if (this.cache_nRowsToShift > 0) {
                    /* move the highest Y-value rows to the top of the ordering array */
                    this.cache_orderedYArrayTargetIndex = this.state.rowsOrderedByY.length - 1;

                    for (this.cache_iterator = 0; this.cache_iterator < this.cache_nRowsToShift; this.cache_iterator++) {
                        this.cache_targetIndex = this.rowStartIndex - this.cache_iterator - 1;

                        this.cache_rowPointer = this.state.rows[this.state.rowsOrderedByY[this.cache_orderedYArrayTargetIndex]];
                        this.cache_rowPointer.data = this.props.getRow(this.cache_targetIndex);
                        this.cache_rowPointer.setIndex = this.cache_targetIndex;
                        this.cache_rowPointer.y = this.cache_targetIndex * this.cellHeight;

                        this.state.rowsOrderedByY.unshift(this.state.rowsOrderedByY.pop());
                    }

                    this.rowStartIndex -= this.cache_nRowsToShift;
                    this.rowEndIndex -= this.cache_nRowsToShift;

                    this.yUpperBound += this.cache_nRowsToShift * this.cellHeight;
                    this.yLowerBound += this.cache_nRowsToShift * this.cellHeight;

                    this.setState({ rows: this.state.rows });
                }
            }
        }
    }, {
        key: 'handleMoveIntent',
        value: function handleMoveIntent(event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0 || this.manuallyScrollingY && event.deltaY === 0 || this.manuallyScrollingX && event.deltaX === 0) {
                return;
            }

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            this.xNext = this.manuallyScrollingY ? 0 : this.xCurrent - event.deltaX;

            if (this.xNext > 0) {
                this.xNext = 0;
            } else if (this.xNext < this.xMaximumTranslation) {
                this.xNext = this.xMaximumTranslation;
            }

            this.yNext = this.manuallyScrollingX ? 0 : this.yCurrent - event.deltaY;

            if (this.yNext < this.yCurrent) {
                this.handleScrollDown();
            } else if (this.yNext > this.yCurrent) {
                this.handleScrollUp();
            }

            if (this.yNext > 0) {
                this.yNext = 0;
            } else if (this.yNext < this.yLowerBound) {
                this.yNext = this.yLowerBound;
            }

            if (this.xNext !== this.xCurrent) {
                this.refs.head.style[_transform2.default] = 'translate3d(' + this.xNext + 'px, 0px, 0px)';
            }

            /* Move wrapper */
            this.refs.body.style[_transform2.default] = 'translate3d(' + this.xNext + 'px, ' + this.yNext + 'px, 0px)';

            /* move scrollbar nubs */
            this.refs.xScrollerNub.style[_transform2.default] = 'translate3d(' + Math.abs(this.xNext) + 'px, 0px, 0px)';

            this.yScrollNubPosition = this.rowStartIndex / this.props.totalRows * this.containerHeight;

            if (this.yScrollNubPosition + this.state.yScrollerNubSize > this.containerHeight) {
                this.yScrollNubPosition = this.containerHeight - this.state.yScrollerNubSize;
            }

            this.refs.yScrollerNub.style[_transform2.default] = 'translate3d(0px, ' + this.yScrollNubPosition + 'px, 0px)';

            this.xCurrent = this.xNext;
            this.yCurrent = this.yNext;
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this2 = this;

            if (delta === 0) {
                return;
            }

            var adjustedDelta = delta;
            var newTableWidth = 0;

            var copy = this.state.columns.map(function (definition) {
                if (definition.mapping !== _this2.manuallyResizingColumn.mapping) {
                    newTableWidth += definition.width;

                    return definition;
                }

                /* Before any measurements are applied, first we need to compare the delta to the known cell width thresholds and scale appropriately. */

                if (adjustedDelta < 0 && !isNaN(_this2.minimumColumnWidth) && definition.width + adjustedDelta < _this2.minimumColumnWidth) {
                    adjustedDelta = _this2.minimumColumnWidth - definition.width;
                } else if (!isNaN(_this2.maximumColumnWidth) && definition.width + adjustedDelta > _this2.maximumColumnWidth) {
                    adjustedDelta = _this2.maximumColumnWidth - definition.width;
                }

                newTableWidth += definition.width + adjustedDelta;

                return _extends({}, definition, {
                    width: definition.width + adjustedDelta
                });
            });

            if (newTableWidth <= this.containerWidth) {
                this.xMaximumTranslation = 0;
            } else {
                this.xMaximumTranslation -= adjustedDelta;
            }

            this.setState({
                columns: copy,
                xScrollerNubSize: this.calculateXScrollerNubSize()
            }, function () {
                /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
                we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
                if (adjustedDelta < 0) {
                    _this2.handleMoveIntent({
                        deltaX: adjustedDelta,
                        deltaY: 0,
                        preventDefault: _noop2.default
                    });
                }
            });
        }
    }, {
        key: 'handleColumnDragStart',
        value: function handleColumnDragStart(event) {
            if (event.button === 0) {
                this.lastColumnX = event.clientX;
                this.manuallyResizingColumn = this.state.columns[event.target.getAttribute('data-column-index')];
            }
        }
    }, {
        key: 'handleXScrollerDragStart',
        value: function handleXScrollerDragStart(event) {
            if (event.button === 0) {
                this.lastXScroll = event.clientX;
                this.manuallyScrollingX = true;
            }
        }
    }, {
        key: 'handleYScrollerDragStart',
        value: function handleYScrollerDragStart(event) {
            if (event.button === 0) {
                this.lastYScroll = event.clientY;
                this.manuallyScrollingY = true;
            }
        }
    }, {
        key: 'handleDragMove',
        value: function handleDragMove(event) {
            if (event.button === 0) {
                if (this.manuallyResizingColumn) {
                    this.handleColumnResize(event.clientX - this.lastColumnX);

                    this.lastColumnX = event.clientX;
                }

                if (this.manuallyScrollingX) {
                    this.handleMoveIntent({
                        deltaX: event.clientX - this.lastXScroll,
                        deltaY: 0,
                        preventDefault: _noop2.default
                    });

                    this.lastXScroll = event.clientX;
                }

                if (this.manuallyScrollingY) {
                    this.handleMoveIntent({
                        deltaX: 0,
                        deltaY: (event.clientY - this.lastYScroll) / this.containerHeight * this.props.totalRows * this.cellHeight,
                        preventDefault: _noop2.default
                    });

                    this.lastYScroll = event.clientY;
                }
            }
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            if (this.manuallyResizingColumn) {
                this.manuallyResizingColumn = null;
            }

            if (this.manuallyScrollingX) {
                this.manuallyScrollingX = false;
            }

            if (this.manuallyScrollingY) {
                this.manuallyScrollingY = false;
            }
        }
    }, {
        key: 'handleRowClick',
        value: function handleRowClick(event, clickedRowData) {
            if (this.props.onRowInteract) {
                event.persist();
                this.props.onRowInteract(event, clickedRowData);
            }

            this.setState({
                currentActiveRowIndex: findWhere(this.state.rows, 'data', clickedRowData).setIndex
            });
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this3 = this;

            return this.state.rows.map(function (row, index) {
                return _react2.default.createElement(_row2.default, { key: index,
                    active: row.setIndex === _this3.state.currentActiveRowIndex,
                    columns: _this3.state.columns,
                    data: row.data,
                    even: row.setIndex % 2 === 0,
                    y: row.y,
                    onInteract: _this3.handleRowClick,
                    onCellInteract: _this3.props.onCellInteract });
            });
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return _react2.default.createElement(
                'div',
                { ref: 'body',
                    className: 'ui-table-body' },
                this.renderRows()
            );
        }
    }, {
        key: 'renderHead',
        value: function renderHead() {
            var _this4 = this;

            if (!this.state.chokeRender) {
                return _react2.default.createElement(
                    'div',
                    { ref: 'head', className: 'ui-table-header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-table-row ui-table-header-row' },
                        this.state.columns.map(function (column, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index,
                                    className: 'ui-table-cell ui-table-header-cell',
                                    style: { width: typeof column.width === 'number' ? column.width : null } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'ui-table-cell-inner' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ui-table-cell-inner-text' },
                                        column.title
                                    )
                                ),
                                _react2.default.createElement('div', { className: 'ui-table-header-cell-resize-handle',
                                    'data-column-index': index,
                                    onMouseDown: _this4.handleColumnDragStart })
                            );
                        })
                    )
                );
            }
        }
    }, {
        key: 'renderScrollbars',
        value: function renderScrollbars() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-table-x-scroller',
                        onMouseDown: this.handleXScrollerDragStart },
                    _react2.default.createElement('div', { ref: 'xScrollerNub',
                        className: 'ui-table-x-scroller-nub',
                        style: { width: this.state.xScrollerNubSize } })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-table-y-scroller',
                        onMouseDown: this.handleYScrollerDragStart },
                    _react2.default.createElement('div', { ref: 'yScrollerNub',
                        className: 'ui-table-y-scroller-nub',
                        style: { height: this.state.yScrollerNubSize } })
                )
            );
        }
    }, {
        key: 'changeActiveRow',
        value: function changeActiveRow(delta) {
            var _this5 = this;

            this.cache_nextActiveRow = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex + delta);

            if (this.cache_nextActiveRow) {
                this.setState({
                    ariaSpokenOutput: this.cache_nextActiveRow.data[this.state.columns[0].mapping],
                    currentActiveRowIndex: this.cache_nextActiveRow.setIndex
                });

                if (delta === -1 && this.cache_nextActiveRow.y * -1 > this.yCurrent || delta === 1 && this.cache_nextActiveRow.y * -1 - this.cellHeight < this.yCurrent - this.containerHeight + this.cellHeight // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this.handleMoveIntent({
                            deltaX: 0,
                            deltaY: this.cellHeight * delta,
                            preventDefault: _noop2.default
                        });
                    }
            } else if (delta === -1 && this.state.currentActiveRowIndex > 0 || delta === 1 && this.state.currentActiveRowIndex < this.props.totalRows) {
                /*
                    The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown
                    in the viewport.
                 */
                this.handleMoveIntent({
                    deltaX: 0,
                    deltaY: (this.rowStartIndex > this.state.currentActiveRowIndex && this.state.currentActiveRowIndex - this.rowStartIndex || (this.rowStartIndex < this.state.currentActiveRowIndex && this.state.currentActiveRowIndex - this.rowStartIndex) + delta) * this.cellHeight,
                    preventDefault: _noop2.default
                });

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this5.changeActiveRow(delta);
                });
            }

            this.cache_nextActiveRow = null;
        }
    }, {
        key: 'ariaExposeFullRowData',
        value: function ariaExposeFullRowData() {
            var row = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex);

            if (row) {
                this.setState({
                    ariaSpokenOutput: this.state.columns.map(function (column) {
                        return column.title + ': ' + row.data[column.mapping];
                    }).join('\n')
                });
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowDown':
                    this.changeActiveRow(1);
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    this.changeActiveRow(-1);
                    event.preventDefault();
                    break;
                case 'Enter':
                    this.ariaExposeFullRowData();
                    event.preventDefault();
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
                    className: this.props.offscreenClass,
                    'aria-live': 'polite' },
                this.state.ariaSpokenOutput
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
                        'ui-table-wrapper': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown,
                    onMouseMove: this.handleDragMove,
                    onMouseUp: this.handleDragEnd,
                    onWheel: this.handleMoveIntent,
                    tabIndex: '0' }),
                _react2.default.createElement(
                    'div',
                    { ref: 'table',
                        className: 'ui-table' },
                    this.renderHead(),
                    this.renderBody()
                ),
                this.renderNotification(),
                this.renderScrollbars()
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
    offscreenClass: _react2.default.PropTypes.string,
    onCellInteract: _react2.default.PropTypes.func,
    onRowInteract: _react2.default.PropTypes.func,
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    columns: [],
    getRow: _noop2.default,
    offscreenClass: 'ui-offscreen'
};

exports.default = UITable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIUtils/transform":22,"../UIView":23,"./row":16,"classnames":24}],16:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _transform = require('../UIUtils/transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITableRow = (function (_UIView) {
    _inherits(UITableRow, _UIView);

    function UITableRow() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITableRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITableRow)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(UITableRow, [{
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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return true;
        }
    }, {
        key: 'waitForContentIfNecessary',
        value: function waitForContentIfNecessary() {
            if (this.state.data instanceof Promise) {
                this.state.data.then((function cautiouslySetRowData(promise, value) {
                    if (this.state.data === promise) {
                        this.setState({ data: value });
                    } // only replace if we're looking at the same promise, otherwise do nothing
                }).bind(this, this.state.data));
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
        value: function getClasses() {
            var classes = 'ui-table-row';

            if (this.props.even) {
                classes += ' ui-table-row-even';
            } else {
                classes += ' ui-table-row-odd';
            }

            if (this.state.data instanceof Promise) {
                classes += ' ui-table-row-loading';
            }

            if (this.props.active) {
                classes += ' ui-table-row-active';
            }

            return classes;
        }
    }, {
        key: 'renderCells',
        value: function renderCells() {
            var _this2 = this;

            var data = this.state.data instanceof Promise ? {} : this.state.data;

            if (data) {
                return this.props.columns.map(function (definition, index) {
                    return _react2.default.createElement(_cell2.default, { key: index,
                        content: data[definition.mapping],
                        width: definition.width,
                        onInteract: _this2.props.onCellInteract,
                        row: _this2.state.data });
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onInteract) {
                event.persist();
                this.props.onInteract(event, this.state.data);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.getClasses(),
                    style: _defineProperty({}, _transform2.default, this.props.y && 'translate3d(0px, ' + this.props.y + 'px, 0px)'),
                    onClick: this.handleClick },
                this.renderCells()
            );
        }
    }]);

    return UITableRow;
})(_UIView3.default);

UITableRow.propTypes = {
    columns: _react2.default.PropTypes.array,
    even: _react2.default.PropTypes.bool,
    data: _react2.default.PropTypes.object,
    onCellInteract: _react2.default.PropTypes.func,
    onInteract: _react2.default.PropTypes.func,
    y: _react2.default.PropTypes.number
};

exports.default = UITableRow;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/transform":22,"../UIView":23,"./cell":14}],17:[function(require,module,exports){
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

            var indexes = (Array.isArray(index) ? index : [index]).filter(function (index) {
                return _this2.state.tokenizedEntityIndexes.indexOf(index) === -1;
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

},{"../UITypeaheadInput":19,"../UIUtils/noop":20,"../UIView":23,"classnames":24}],18:[function(require,module,exports){
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

},{"../UIView":23,"classnames":24}],19:[function(require,module,exports){
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
                entityMatchIndices: [],
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
        key: 'getSelectedEntityText',
        value: function getSelectedEntityText() {
            var entity = this.props.entities[this.state.selectedEntityIndex];

            return entity ? entity.text : '';
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
                    type: 'text',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead-hint': true
                    }, this.props.hintProps.className, !!this.props.hintProps.className)),
                    value: processed,
                    disabled: true,
                    tabIndex: '-1' }));
            }
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
        key: 'markMatchSubstring',
        value: function markMatchSubstring(entityContent, userInput) {
            if (this.props.markFunc) {
                return this.props.markFunc(entityContent, userInput);
            }

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
        key: 'renderMatches',
        value: function renderMatches() {
            var _this3 = this;

            if (this.state.entityMatchIndices.length) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.matchWrapperProps, {
                        ref: 'matches',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-typeahead-match-wrapper': true
                        }, this.props.matchWrapperProps.className, !!this.props.matchWrapperProps.className)) }),
                    this.state.entityMatchIndices.map(function (index) {
                        var entity = _this3.props.entities[index];

                        return _react2.default.createElement(
                            'div',
                            _extends({}, entity, {
                                className: (0, _classnames2.default)(_defineProperty({
                                    'ui-typeahead-match': true,
                                    'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index
                                }, entity.className, !!entity.className)),
                                key: entity.text,
                                onClick: _this3.handleMatchClick.bind(_this3, index) }),
                            _this3.markMatchSubstring(entity.text, _this3.state.userInput)
                        );
                    })
                );
            }
        }
    }, {
        key: 'selectMatch',
        value: function selectMatch(delta) {
            var matches = this.state.entityMatchIndices;
            var totalMatches = matches.length;
            var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

            if (totalMatches) {
                if (nextIndex < 0) {
                    nextIndex = totalMatches - 1; // reverse loop
                } else if (nextIndex >= totalMatches) {
                        nextIndex = 0; // loop
                    }

                this.setState({ selectedEntityIndex: matches[nextIndex] });
            }
        }
    }, {
        key: 'resetMatches',
        value: function resetMatches() {
            this.setState({
                selectedEntityIndex: -1,
                entityMatchIndices: []
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

        // The default implementation is a simple "starts-with" search

    }, {
        key: 'getMatchIndices',
        value: function getMatchIndices(currentValue, entities) {
            if (this.props.matchFunc) {
                return this.props.matchFunc(currentValue, entities);
            }

            var seekValue = currentValue.toLowerCase();

            return entities.reduce(function seekMatch(result, entity, index) {
                return entity.text.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
            }, []);
        }
    }, {
        key: 'computeMatches',
        value: function computeMatches() {
            var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

            var currentValue = this.state.userInput;
            var matches = currentValue === '' ? [] : this.getMatchIndices(currentValue, entities);

            this.setState({
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndices: matches
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            var _this4 = this;

            this.setState({ userInput: event.target.value }, function () {
                return _this4.computeMatches();
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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
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

UITypeaheadInput.propTypes = {
    clearPartialInputOnSelection: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.string,
    entities: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        text: _react2.default.PropTypes.string
    })),
    hint: _react2.default.PropTypes.bool,
    hintProps: _react2.default.PropTypes.object,
    inputProps: _react2.default.PropTypes.object,
    markFunc: _react2.default.PropTypes.func,
    matchFunc: _react2.default.PropTypes.func,
    matchWrapperProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onComplete: _react2.default.PropTypes.func,
    onInput: _react2.default.PropTypes.func,
    onEntitySelected: _react2.default.PropTypes.func,
    type: _react2.default.PropTypes.string
};

UITypeaheadInput.defaultProps = {
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();

},{}],23:[function(require,module,exports){
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

},{"../UIUtils/shallowEqual":21}],24:[function(require,module,exports){
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

},{"./UIButton":1,"./UICheckbox":2,"./UICheckboxGroup":3,"./UIDialog":4,"./UIFittedText":5,"./UIImage":6,"./UIList":7,"./UIModal":8,"./UIPopover":9,"./UIProgress":10,"./UIProgressiveDisclosure":11,"./UIRadio":12,"./UISegmentedControl":13,"./UITable":15,"./UITokenizedInput":17,"./UITooltip":18,"./UITypeaheadInput":19,"./UIView":23}]},{},["enigma-uikit"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUJ1dHRvbi9pbmRleC5qcyIsIlVJQ2hlY2tib3gvaW5kZXguanMiLCJVSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCJVSURpYWxvZy9pbmRleC5qcyIsIlVJRml0dGVkVGV4dC9pbmRleC5qcyIsIlVJSW1hZ2UvaW5kZXguanMiLCJVSUxpc3QvaW5kZXguanMiLCJVSU1vZGFsL2luZGV4LmpzIiwiVUlQb3BvdmVyL2luZGV4LmpzIiwiVUlQcm9ncmVzcy9pbmRleC5qcyIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiVUlSYWRpby9pbmRleC5qcyIsIlVJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIlVJVGFibGUvY2VsbC5qcyIsIlVJVGFibGUvaW5kZXguanMiLCJVSVRhYmxlL3Jvdy5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybS9pbmRleC5qcyIsIlVJVmlldy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNLTSxRQUFRO2NBQVIsUUFBUTs7YUFBUixRQUFROzhCQUFSLFFBQVE7O3NFQUFSLFFBQVE7OztpQkFBUixRQUFROztzQ0FDSTtBQUNWLGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO0FBQzNDLG9CQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGFBQWEs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b0JBQWdCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDekYsYUFBUyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDcEUsb0JBQWdCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDekYsVUFBTSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEFBQUM7Q0FDOUQsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHRvZ2dsZVN0YXRlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlCdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICAgIG9uQ2xpY2s6IG5vb3AsXG4gICAgb25QcmVzc2VkOiBub29wLFxuICAgIG9uVW5wcmVzc2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlCdXR0b247XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKCkgeyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgbGV0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BjYl9pdGVtLm5hbWVgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGxldCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cyA9IHtcbiAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcbiAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQWxsVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RBbGxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgIF0pLFxufTtcblxuVUlDaGVja2JveEdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG4gICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94R3JvdXA7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlclVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgYm9keVVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrID0gdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVGb2N1cyA9IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmRpYWxvZy5jb250YWlucyhub2RlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrKG5hdGl2ZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmb290ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hlYWRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgdGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuVUlEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHlQcm9wczoge30sXG4gICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICBoZWFkZXJQcm9wczoge30sXG4gICAgb25DbG9zZTogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRGlhbG9nO1xuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlID0gdGhpcy5yZXNjYWxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIHJlc2NhbGUoKSB7XG4gICAgICAgIGxldCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGxldCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcbiAgICAgICAgbGV0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgICAgICBpZiAoICAgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIGxldCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgICAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gTWF0aC5taW4odGhpcy5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlGaXR0ZWRUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbn07XG5cblVJRml0dGVkVGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlGaXR0ZWRUZXh0O1xuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZyB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBhbHQ9e251bGx9XG4gICAgICAgICAgICAgICAgIHNyYz17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlJbWFnZS5zdGF0dXMgPSB7XG4gICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5VSUltYWdlLnByb3BUeXBlcyA9IHtcbiAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlJbWFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2VQcm9wczoge30sXG4gICAgc3RhdHVzUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlJbWFnZTtcbiIsIi8qKlxuICogQSBnZW5lcmljIGxpc3Qgdmlldywgc3VwcG9ydGluZyB1bnN0eWxlZCwgYnVsbGV0ZWQgYW5kIG51bWJlcmVkIG91dHB1dC5cbiAqIEBjbGFzcyBVSUxpc3RcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzW2BpdGVtXyR7aW5kZXh9YF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0SXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzSXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLml0ZW1zO1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5zdGF0ZS5hY3RpdmVJdGVtO1xuXG4gICAgICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dEl0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHByZXYgPSAoKSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzSXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoa2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gaXRlbXMuaW5kZXhPZihhY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUl0ZW1JbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXYoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUl0ZW1JbmRleCAhPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgcHJldigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZVR5cGUgPSB0aGlzLnByb3BzLnR5cGUgPyAnbGknIDogJ3NwYW4nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgICByZWY6IGBpdGVtXyR7aW5kZXh9YCxcbiAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogKCkgPT4gdGhpcy5zdGF0ZS5hY3RpdmVJdGVtID09PSBpdGVtICYmIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUl0ZW06IG51bGx9KSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiAoKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBpdGVtfSksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGl0ZW0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgbm9kZVR5cGUgPSAnZGl2JztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICBjYXNlICdidWxsZXQnOlxuICAgICAgICAgICAgbm9kZVR5cGUgPSAndWwnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ29sJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICdsaXN0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICd1aS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1idWxsZXRlZCc6IHRoaXMucHJvcHMudHlwZSA9PT0gJ2J1bGxldCcsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtbnVtYmVyZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LXBsYWluJzogdGhpcy5wcm9wcy50eXBlICE9PSAnYnVsbGV0JyAmJiB0aGlzLnByb3BzLnR5cGUgIT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5yZW5kZXJDb250ZW50KCksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuVUlMaXN0LnByb3BUeXBlcyA9IHtcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm5vZGUpLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2J1bGxldCcsICdudW1iZXInXSksXG59O1xuXG5VSUxpc3QuZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJTGlzdDtcbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlNb2RhbCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkaWFsb2dTcGVjaWZpY1Byb3BzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWFzaydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi5kaWFsb2dTcGVjaWZpY1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJTW9kYWwucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICBtYXNrUHJvcHM6IHt9LFxuICAgIG1vZGFsUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlNb2RhbDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG4vKlxuICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgbmV2ZXIgY2hhbmdlcy4gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgYGNvbXBvbmVudERpZFVwZGF0ZWAgYWZ0ZXIgYHNldFN0YXRlYCB0byB0cmlnZ2VyXG4gICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbiA9IHRoaXMuYWxpZ24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5ub2RlLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUG9wb3Zlci5wb3NpdGlvbiA9IHtcbiAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICBNSURETEU6ICdNSURETEUnLFxuICAgIEVORDogJ0VORCcsXG59O1xuXG5VSVBvcG92ZXIucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBhbmNob3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGFuY2hvcllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxufTtcblxuVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBvcG92ZXI7XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG59O1xuXG5VSVByb2dyZXNzLnByb3BUeXBlcyA9IHtcbiAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgXSksXG4gICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzcztcbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgIG9uRXhwYW5kOiBub29wLFxuICAgIG9uSGlkZTogbm9vcCxcbiAgICB0b2dnbGVQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVJhZGlvIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlSYWRpby5wcm9wVHlwZXMgPSB7XG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5VSVJhZGlvLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvblNlbGVjdGVkOiBub29wLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUmFkaW87XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjdXJyZW50VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZUJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gb3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gMCA6IC0xfVxuICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XG4gICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uczogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWlzc2luZ1ZhbHVlID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoISgndmFsdWUnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cblVJU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJU2VnbWVudGVkQ29udHJvbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5cbmNsYXNzIFVJVGFibGVDZWxsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnRlcmFjdCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMucHJvcHMucm93LCB0aGlzLnByb3BzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57dGhpcy5wcm9wcy5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZW50O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFkZFRpdGxlID0gdHlwZW9mIHRoaXMucHJvcHMuY29udGVudCA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsJ1xuICAgICAgICAgICAgICAgICB0aXRsZT17YWRkVGl0bGUgPyB0aGlzLnByb3BzLmNvbnRlbnQgOiBudWxsfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLndpZHRoID8gdGhpcy5wcm9wcy53aWR0aCArICdweCcgOiBudWxsfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlQ2VsbC5wcm9wVHlwZXMgPSB7XG4gICAgY29udGVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcm93OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZUNlbGw7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSb3cgZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuLyoqXG4gKiBGT1IgRlVUVVJFIEVZRVNcbiAqXG4gKiBUaGVyZSBhcmUgYSBsb3Qgb2YgcGxhY2VzIHdoZXJlIHNoYXJlZCB0aGlzLntuYW1lfSB2YXJpYWJsZXMgaGF2ZSBiZWVuXG4gKiB1c2VkIHdoZXJlIHRoZXkgZG9uJ3Qgc2VlbSB0byBiZSBuZWVkZWQuIFRoaXMgaXMgY29tcGxldGVseSBvbiBwdXJwb3NlIHRvXG4gKiByZWR1Y2UgbWVtb3J5IHByZXNzdXJlIGR1cmluZyBzY3JvbGwgb3BlcmF0aW9ucy4gSWYgeW91IGNoYW5nZSB0aGVtIGJhY2sgdG9cbiAqIG5vcm1hbCB2YXJzLCB5b3UnbGwgc2VlIHRoZSBzYXd0b290aGluZyBpbiB5b3VyIEpTIHByb2ZpbGVyLi4uIHNvIGRvbid0IGRvIGl0IVxuICovXG5cbi8qKlxuICogT1JERVIgT0YgT1BFUkFUSU9OU1xuICpcbiAqIDEuIGluaXRpYWwgcmVuZGVyIHcvIG9uZSByb3cgb2YgY2VsbHNcbiAqIDIuIGNhcHR1cmUgdGFibGUgJiBjZWxsIHNpemluZyBtZXRyaWNzXG4gKiAzLiBhcHBseSB3aWR0aHMgdG8gY29sdW1uIGRlZmluaXRpb25zXG4gKiA0LiByZW5kZXIgcGFzcyAyIHcvIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG4gKi9cblxuLyoqIEBpZ25vcmUgKi9cbmNvbnN0IGZpbmRXaGVyZSA9IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbGV0IGluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheVtpbmRleF1bcHJvcGVydHldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4IC09IDE7XG4gICAgfVxufTsgLy8gb3B0aW1pemVkIHNwZWNpZmljYWxseSB0byBvbmx5IGxvb2sgZm9yIGEgc2luZ2xlIGtleTp2YWx1ZSBtYXRjaFxuXG5jbGFzcyBVSVRhYmxlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlUm93Q2xpY2sgPSB0aGlzLmhhbmRsZVJvd0NsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdNb3ZlID0gdGhpcy5oYW5kbGVEcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50ID0gdGhpcy5oYW5kbGVNb3ZlSW50ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVhTY3JvbGxlckRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydCA9IHRoaXMuaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiAnJyxcbiAgICAgICAgICAgIGNob2tlUmVuZGVyOiB0cnVlLFxuICAgICAgICAgICAgY3VycmVudEFjdGl2ZVJvd0luZGV4OiAtMSxcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3coMCksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgcm93c09yZGVyZWRCeVk6IFswXSxcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucy5zbGljZSgwKSxcbiAgICAgICAgICAgIHhTY3JvbGxlck51YlNpemU6IG51bGwsXG4gICAgICAgICAgICB5U2Nyb2xsZXJOdWJTaXplOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnhDdXJyZW50ID0gdGhpcy55Q3VycmVudCA9IDA7XG4gICAgICAgIHRoaXMueE5leHQgPSB0aGlzLnlOZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy55U2Nyb2xsTnViUG9zaXRpb24gPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5jYWNoZV9pdGVyYXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX3RhcmdldEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNhcHR1cmVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICAvKiBzbyB3ZSBjYW4gcmV1c2Ugc3RhdGUucm93cyB0byBhdm9pZCBleHRyYSBhcnJheSBhbGxvY2F0aW9ucyBpbiB0aGUgc2Nyb2xsIGhhbmRsZXJzIC0gaW4gdGhpcyBjYXNlIGEgZmV3IG1vcmUgQ1BVIGN5Y2xlcyBhcmUgZmFyIGNoZWFwZXIgdGhhbiBydW5uaW5nIHVwIGFnYWluc3QgdGhlIEdDICovXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy5oZWFkICYmIHR5cGVvZiB0aGlzLm1pbmltdW1Db2x1bW5XaWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnJlZnMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1aS10YWJsZS1oZWFkZXItY2VsbCcpWzBdO1xuXG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBOYU4gaWYgbm90IGEgcGl4ZWwgdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLm1heGltdW1Db2x1bW5XaWR0aCA9IHBhcnNlSW50KG5vZGVTdHlsZS5tYXhXaWR0aCwgMTApO1xuICAgICAgICAgICAgICAgIHRoaXMubWluaW11bUNvbHVtbldpZHRoID0gcGFyc2VJbnQobm9kZVN0eWxlLm1pbldpZHRoLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVYU2Nyb2xsZXJOdWJTaXplKCkge1xuICAgICAgICBjb25zdCBweCA9IHRoaXMuY29udGFpbmVyV2lkdGggLSBNYXRoLmFicyh0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24pO1xuXG4gICAgICAgIHJldHVybiBweCA8IDEyID8gMTIgOiBweDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplKCkge1xuICAgICAgICBjb25zdCBweCA9IHRoaXMucm93RW5kSW5kZXggLyB0aGlzLnByb3BzLnRvdGFsUm93cztcblxuICAgICAgICByZXR1cm4gcHggPCAxMiA/IDEyIDogcHg7XG4gICAgfVxuXG4gICAgY2FwdHVyZURpbWVuc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gdGhpcy5yZWZzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktdGFibGUtcm93JylbMF07XG4gICAgICAgIGNvbnN0IGZpcnN0Um93Q2VsbHMgPSBmaXJzdFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1aS10YWJsZS1jZWxsJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy53cmFwcGVyO1xuXG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG5cbiAgICAgICAgdGhpcy5jZWxsSGVpZ2h0ID0gZmlyc3RSb3dDZWxsc1swXS5jbGllbnRIZWlnaHQgfHwgNDA7XG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSBjb250YWluZXIuY2xpZW50V2lkdGggfHwgNTAwO1xuXG4gICAgICAgIHRoaXMublJvd3NUb1JlbmRlciA9IE1hdGguY2VpbCgodGhpcy5jb250YWluZXJIZWlnaHQgKiAxLjMpIC8gdGhpcy5jZWxsSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggPSAwO1xuICAgICAgICB0aGlzLnJvd0VuZEluZGV4ID0gdGhpcy5uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgIGNvbnN0IHRhYmxlV2lkdGggPSBmaXJzdFJvdy5jbGllbnRXaWR0aCB8fCA1MDA7XG5cbiAgICAgICAgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uID0gICB0aGlzLmNvbnRhaW5lcldpZHRoID4gdGFibGVXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRhaW5lcldpZHRoIC0gdGFibGVXaWR0aDtcblxuICAgICAgICB0aGlzLnlVcHBlckJvdW5kID0gMDtcbiAgICAgICAgdGhpcy55TG93ZXJCb3VuZCA9IHRoaXMuY29udGFpbmVySGVpZ2h0IC0gKHRoaXMublJvd3NUb1JlbmRlciAqIHRoaXMuY2VsbEhlaWdodCk7XG5cbiAgICAgICAgY29uc3QgYWRqdXN0ZWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5jb2x1bW5zLm1hcChmdW5jdGlvbiBkaXNjb3ZlcldpZHRoKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmNlaWwoZmlyc3RSb3dDZWxsc1tpbmRleF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkUm93cyA9IFtdO1xuICAgICAgICBjb25zdCByb3dzT3JkZXJlZEJ5WSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uUm93c1RvUmVuZGVyOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZFJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3coaSksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IGksXG4gICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsSGVpZ2h0ICogaSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3dzT3JkZXJlZEJ5WS5wdXNoKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjaG9rZVJlbmRlcjogZmFsc2UsXG4gICAgICAgICAgICBjb2x1bW5zOiBhZGp1c3RlZENvbHVtbnMsXG4gICAgICAgICAgICByb3dzOiBnZW5lcmF0ZWRSb3dzLFxuICAgICAgICAgICAgcm93c09yZGVyZWRCeVk6IHJvd3NPcmRlcmVkQnlZLFxuICAgICAgICAgICAgeFNjcm9sbGVyTnViU2l6ZTogdGhpcy5jYWxjdWxhdGVYU2Nyb2xsZXJOdWJTaXplKCksXG4gICAgICAgICAgICB5U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsRG93bigpIHtcbiAgICAgICAgaWYgKCAgIHRoaXMucm93RW5kSW5kZXggPT09IHRoaXMucHJvcHMudG90YWxSb3dzXG4gICAgICAgICAgICB8fCB0aGlzLnlOZXh0ID49IHRoaXMueUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGxvd2VzdCBZIHZhbHVlIHRvIHRoZSB5TG93ZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgbmV4dCByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlOZXh0IC0gdGhpcy55TG93ZXJCb3VuZCkgLyB0aGlzLmNlbGxIZWlnaHRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKyB0aGlzLnJvd0VuZEluZGV4ID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLnByb3BzLnRvdGFsUm93cyAtIHRoaXMucm93RW5kSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiB0aGlzLm5Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgLSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnlVcHBlckJvdW5kIC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kIC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCArPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCArPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMublJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuY2FjaGVfaXRlcmF0b3IgPSAwOyB0aGlzLmNhY2hlX2l0ZXJhdG9yIDwgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7IHRoaXMuY2FjaGVfaXRlcmF0b3IrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3RhcmdldEluZGV4ID0gdGhpcy5yb3dFbmRJbmRleCArIHRoaXMuY2FjaGVfaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gdGhpcy5zdGF0ZS5yb3dzW3RoaXMuc3RhdGUucm93c09yZGVyZWRCeVlbdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLmNhY2hlX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnkgPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucHVzaCh0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4ICs9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kIC09IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm93czogdGhpcy5zdGF0ZS5yb3dzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm93U3RhcnRJbmRleCA9PT0gMCB8fCB0aGlzLnlOZXh0IDw9IHRoaXMueVVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBoaWdoZXN0IFkgdmFsdWUgdG8gdGhlIHlVcHBlckJvdW5kIGFuZCByZXF1ZXN0IHRoZSBwcmV2aW91cyByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlOZXh0IC0gdGhpcy55VXBwZXJCb3VuZCkgLyB0aGlzLmNlbGxIZWlnaHRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5yb3dTdGFydEluZGV4IC0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMucm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IHRoaXMublJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAtIHRoaXMublJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhICogdGhpcy5jZWxsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueUxvd2VyQm91bmQgKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dTdGFydEluZGV4IC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4IC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gdGhpcy5uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5jYWNoZV9pdGVyYXRvciA9IDA7IHRoaXMuY2FjaGVfaXRlcmF0b3IgPCB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDsgdGhpcy5jYWNoZV9pdGVyYXRvcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXggPSB0aGlzLnJvd1N0YXJ0SW5kZXggLSB0aGlzLmNhY2hlX2l0ZXJhdG9yIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIgPSB0aGlzLnN0YXRlLnJvd3NbdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WVt0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleF1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIueSA9IHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXggKiB0aGlzLmNlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS51bnNoaWZ0KHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4IC09IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kICs9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm93czogdGhpcy5zdGF0ZS5yb3dzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgJiYgZXZlbnQuZGVsdGFZID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCAmJiBldmVudC5kZWx0YVggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPyAwIDogdGhpcy54Q3VycmVudCAtIGV2ZW50LmRlbHRhWDtcblxuICAgICAgICBpZiAodGhpcy54TmV4dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMueE5leHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueE5leHQgPCB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMueE5leHQgPSB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnlOZXh0ID0gdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPyAwIDogdGhpcy55Q3VycmVudCAtIGV2ZW50LmRlbHRhWTtcblxuICAgICAgICBpZiAodGhpcy55TmV4dCA8IHRoaXMueUN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueU5leHQgPiB0aGlzLnlDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55TmV4dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMueU5leHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueU5leHQgPCB0aGlzLnlMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnlOZXh0ID0gdGhpcy55TG93ZXJCb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnhOZXh0ICE9PSB0aGlzLnhDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuaGVhZC5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgke3RoaXMueE5leHR9cHgsIDBweCwgMHB4KWA7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBNb3ZlIHdyYXBwZXIgKi9cbiAgICAgICAgdGhpcy5yZWZzLmJvZHkuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnhOZXh0fXB4LCAke3RoaXMueU5leHR9cHgsIDBweClgO1xuXG4gICAgICAgIC8qIG1vdmUgc2Nyb2xsYmFyIG51YnMgKi9cbiAgICAgICAgdGhpcy5yZWZzLnhTY3JvbGxlck51Yi5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgke01hdGguYWJzKHRoaXMueE5leHQpfXB4LCAwcHgsIDBweClgO1xuXG4gICAgICAgIHRoaXMueVNjcm9sbE51YlBvc2l0aW9uID0gKHRoaXMucm93U3RhcnRJbmRleCAvIHRoaXMucHJvcHMudG90YWxSb3dzKSAqIHRoaXMuY29udGFpbmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiArIHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZSA+IHRoaXMuY29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuY29udGFpbmVySGVpZ2h0IC0gdGhpcy5zdGF0ZS55U2Nyb2xsZXJOdWJTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZzLnlTY3JvbGxlck51Yi5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy55U2Nyb2xsTnViUG9zaXRpb259cHgsIDBweClgO1xuXG4gICAgICAgIHRoaXMueEN1cnJlbnQgPSB0aGlzLnhOZXh0O1xuICAgICAgICB0aGlzLnlDdXJyZW50ID0gdGhpcy55TmV4dDtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuICAgICAgICBsZXQgbmV3VGFibGVXaWR0aCA9IDA7XG5cbiAgICAgICAgbGV0IGNvcHkgPSB0aGlzLnN0YXRlLmNvbHVtbnMubWFwKGRlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubWFwcGluZyAhPT0gdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICBuZXdUYWJsZVdpZHRoICs9IGRlZmluaXRpb24ud2lkdGg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQmVmb3JlIGFueSBtZWFzdXJlbWVudHMgYXJlIGFwcGxpZWQsIGZpcnN0IHdlIG5lZWQgdG8gY29tcGFyZSB0aGUgZGVsdGEgdG8gdGhlIGtub3duIGNlbGwgd2lkdGggdGhyZXNob2xkcyBhbmQgc2NhbGUgYXBwcm9wcmlhdGVseS4gKi9cblxuICAgICAgICAgICAgaWYgKCAgIGFkanVzdGVkRGVsdGEgPCAwXG4gICAgICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMubWluaW11bUNvbHVtbldpZHRoKVxuICAgICAgICAgICAgICAgICYmIGRlZmluaXRpb24ud2lkdGggKyBhZGp1c3RlZERlbHRhIDwgdGhpcy5taW5pbXVtQ29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMubWluaW11bUNvbHVtbldpZHRoIC0gZGVmaW5pdGlvbi53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMubWF4aW11bUNvbHVtbldpZHRoKVxuICAgICAgICAgICAgICAgICAgICAgICAmJiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA+IHRoaXMubWF4aW11bUNvbHVtbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMubWF4aW11bUNvbHVtbldpZHRoIC0gZGVmaW5pdGlvbi53aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3VGFibGVXaWR0aCArPSBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChuZXdUYWJsZVdpZHRoIDw9IHRoaXMuY29udGFpbmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueE1heGltdW1UcmFuc2xhdGlvbiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24gLT0gYWRqdXN0ZWREZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29sdW1uczogY29weSxcbiAgICAgICAgICAgIHhTY3JvbGxlck51YlNpemU6IHRoaXMuY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpLFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICAgICAgaWYgKGFkanVzdGVkRGVsdGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiBhZGp1c3RlZERlbHRhLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSB0aGlzLnN0YXRlLmNvbHVtbnNbZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4taW5kZXgnKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdFhTY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6ICgoZXZlbnQuY2xpZW50WSAtIHRoaXMubGFzdFlTY3JvbGwpIC8gdGhpcy5jb250YWluZXJIZWlnaHQpICogdGhpcy5wcm9wcy50b3RhbFJvd3MgKiB0aGlzLmNlbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdYKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdZKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUm93Q2xpY2soZXZlbnQsIGNsaWNrZWRSb3dEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdChldmVudCwgY2xpY2tlZFJvd0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlUm93SW5kZXg6IGZpbmRXaGVyZShcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJvd3MsICdkYXRhJywgY2xpY2tlZFJvd0RhdGFcbiAgICAgICAgICAgICkuc2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnJvd3MubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17cm93LnNldEluZGV4ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMuc3RhdGUuY29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Jvdy5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgZXZlbj17KHJvdy5zZXRJbmRleCkgJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgeT17cm93Lnl9XG4gICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgICAgICAgICAgICAgb25DZWxsSW50ZXJhY3Q9e3RoaXMucHJvcHMub25DZWxsSW50ZXJhY3R9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keSc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUm93cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNob2tlUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcic+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1yb3cgdWktdGFibGUtaGVhZGVyLXJvdyc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jb2x1bW5zLm1hcCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwgdWktdGFibGUtaGVhZGVyLWNlbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicgPyBjb2x1bW4ud2lkdGggOiBudWxsfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsLWlubmVyLXRleHQnPntjb2x1bW4udGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1jb2x1bW4taW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU2Nyb2xsYmFycygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neFNjcm9sbGVyTnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGxlci1udWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdGhpcy5zdGF0ZS54U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5U2Nyb2xsZXJOdWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbGVyLW51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS55U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBmaW5kV2hlcmUodGhpcy5zdGF0ZS5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLnN0YXRlLmNvbHVtbnNbMF0ubWFwcGluZ10sXG4gICAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZVJvd0luZGV4OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuc2V0SW5kZXgsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93LnkgKiAtMSA+IHRoaXMueUN1cnJlbnQpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLmNlbGxIZWlnaHQgPCB0aGlzLnlDdXJyZW50IC0gdGhpcy5jb250YWluZXJIZWlnaHQgKyB0aGlzLmNlbGxIZWlnaHQpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IHRoaXMuY2VsbEhlaWdodCAqIGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggPCB0aGlzLnByb3BzLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duXG4gICAgICAgICAgICAgICAgaW4gdGhlIHZpZXdwb3J0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6ICggICAoICAgIHRoaXMucm93U3RhcnRJbmRleCA+IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93U3RhcnRJbmRleCA8IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbEhlaWdodCxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKCkge1xuICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuc3RhdGUucm93cywgJ3NldEluZGV4JywgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXgpO1xuXG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFyaWFTcG9rZW5PdXRwdXQ6IHRoaXMuc3RhdGUuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93LmRhdGFbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgdGhpcy5hcmlhRXhwb3NlRnVsbFJvd0RhdGEoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5hcmlhU3Bva2VuT3V0cHV0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRhYmxlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZURyYWdNb3ZlfVxuICAgICAgICAgICAgICAgICBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlRHJhZ0VuZH1cbiAgICAgICAgICAgICAgICAgb25XaGVlbD17dGhpcy5oYW5kbGVNb3ZlSW50ZW50fVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWQoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNjcm9sbGJhcnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvd0ludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2x1bW5zOiBbXSxcbiAgICBnZXRSb3c6IG5vb3AsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgQ2VsbCBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuXG5jbGFzcyBVSVRhYmxlUm93IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xuICAgICAgICBsZXQgY2xhc3NlcyA9ICd1aS10YWJsZS1yb3cnO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV2ZW4pIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2VsbHMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSA/IHt9IDogdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtkYXRhW2RlZmluaXRpb24ubWFwcGluZ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtkZWZpbml0aW9uLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIFt0cmFuc2Zvcm1Qcm9wXTogdGhpcy5wcm9wcy55ICYmIGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy5wcm9wcy55fXB4LCAwcHgpYCxcbiAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2VsbHMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZVJvdy5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIGV2ZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlUm93O1xuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGZpcnN0ID0gZnVuY3Rpb24gZ2V0Rmlyc3RBcnJheUl0ZW0oYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbMF07XG59O1xuXG5jb25zdCBsYXN0ID0gZnVuY3Rpb24gZ2V0TGFzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbmNvbnN0IHdpdGhvdXQgPSBmdW5jdGlvbiByZWplY3RTb21lQXJyYXlJdGVtcyhiYXNlQXJyYXksIC4uLnRvQmVFeGNsdWRlZCkge1xuICAgIHJldHVybiBiYXNlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIHJlamVjdFNvbWUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdG9CZUV4Y2x1ZGVkLmluZGV4T2YoaXRlbSkgPT09IC0xO1xuICAgIH0pO1xufTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXM6IFtdLmNvbmNhdCh0aGlzLnByb3BzLmRlZmF1bHRUb2tlbml6ZWRFbnRpdHlJbmRleGVzKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzSW5kZXhlcyA9IHByZXZTdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzO1xuICAgICAgICBsZXQgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2U3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXM7XG4gICAgICAgIGxldCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzSW5kZXhlcyAhPT0gY3VycmVudEluZGV4ZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Ub2tlbkNoYW5nZShjdXJyZW50SW5kZXhlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpIHsgLy8gbW92ZSBmb2N1c1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgdG9rZW4gYmFzZWQgb24gYW4gZW50aXR5J3MgYXJyYXkgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxBcnJheTxOdW1iZXI+fSAgaW5kZXggICAgICAgICB0aGUgYXJyYXkgaW5kZXggb2YgdGhlIGRlc2lyZWQgZW50aXR5IHRvIGJlIHRva2VuaXplZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgICBbZm9jdXNJbnB1dF0gIGRldGVybWluZXMgaWYgdGhlIGlucHV0IHNob3VsZCBiZSBmb2N1c2VkIGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIGNoYW5nZXMgYXJlIGFwcGxpZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgICAgICAgW2NsZWFySW5wdXRdICBkZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBzaG91bGQgYmUgY2xlYXJlZCBhZnRlciB0aGVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiBjaGFuZ2VzIGFyZSBhcHBsaWVkXG4gICAgICovXG4gICAgYWRkVG9rZW4oaW5kZXgsIGZvY3VzSW5wdXQsIGNsZWFySW5wdXQpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGluZGV4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0b2tlbml6ZWRFbnRpdHlJbmRleGVzOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXMuY29uY2F0KGluZGV4ZXMpfSk7XG5cbiAgICAgICAgZm9jdXNJbnB1dCAmJiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgY2xlYXJJbnB1dCAmJiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSB0b2tlbiBiYXNlZCBvbiBhbiBlbnRpdHkncyBhcnJheSBpbmRleC4gSWYgbm8gaW5kZXggaXMgZ2l2ZW4sIGFsbCB0b2tlbnMgYXJlIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxBcnJheTxOdW1iZXI+fSAgaW5kZXggICAgICAgICB0aGUgYXJyYXkgaW5kZXggb2YgdGhlIGRlc2lyZWQgZW50aXR5IHRvIGJlIHRva2VuaXplZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgICBbZm9jdXNJbnB1dF0gIGRldGVybWluZXMgaWYgdGhlIGlucHV0IHNob3VsZCBiZSBmb2N1c2VkIGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIGNoYW5nZXMgYXJlIGFwcGxpZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgICAgICAgW2NsZWFySW5wdXRdICBkZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBzaG91bGQgYmUgY2xlYXJlZCBhZnRlciB0aGVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiBjaGFuZ2VzIGFyZSBhcHBsaWVkXG4gICAgICovXG4gICAgcmVtb3ZlVG9rZW4oaW5kZXggPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZCwgZm9jdXNJbnB1dCwgY2xlYXJJbnB1dCkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzOiB3aXRob3V0KHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcywgLi4uaW5kZXhlcyksXG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQsIC4uLmluZGV4ZXMpLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb2N1c0lucHV0ICYmIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICBjbGVhcklucHV0ICYmIHRoaXMucmVmcy50eXBlYWhlYWQuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbXX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkO1xuICAgICAgICBsZXQgaW5kZXhlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IFtsYXN0KGluZGV4ZXMpXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgbGV0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBpbmRleGVzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2tlbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVG9rZW4oaW5kZXgpO1xuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1Rva2VuQ2xvc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RTaW5nbGVUb2tlbihpbmRleCkge1xuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgPT09IC0xXG4gICAgICAgICAgICB8fCB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IFtpbmRleF0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFNpbmdsZVRva2VuKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RTaW5nbGVUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgICAgICAgICAgcHJvcHNba2V5XSA9IHRoaXMucHJvcHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0IHsuLi5kZXNjZW5kYW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGRUb2tlbi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1cy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgIGRlZmF1bHRUb2tlbml6ZWRFbnRpdHlJbmRleGVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICBvblRva2VuQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93VG9rZW5DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5VSVRva2VuaXplZElucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICBkZWZhdWx0VG9rZW5pemVkRW50aXR5SW5kZXhlczogW10sXG4gICAgb25Ub2tlbkNoYW5nZTogbm9vcCxcbiAgICBzaG93VG9rZW5DbG9zZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9rZW5pemVkSW5wdXQ7XG4iLCIvKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKiBAY2xhc3MgVUlUb29sdGlwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9vbHRpcC5wb3NpdGlvbiA9IHtcbiAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgIEFGVEVSOiAnQUZURVInLFxufTtcblxuVUlUb29sdGlwLnByb3BUeXBlcyA9IHtcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSVRvb2x0aXAuZGVmYXVsdFByb3BzID0ge1xuICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRvb2x0aXA7XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgaWQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgdXNlcklucHV0OiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sICgpID0+IHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSk7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nKGVudGl0eUNvbnRlbnQsIHVzZXJJbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tYXJrRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWFya0Z1bmMoZW50aXR5Q29udGVudCwgdXNlcklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJJbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kaWNlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50aXR5LnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcoZW50aXR5LnRleHQsIHRoaXMuc3RhdGUudXNlcklucHV0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kaWNlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzW25leHRJbmRleF0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQ7XG4gICAgfVxuXG4gICAgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcklucHV0OiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBzaW1wbGUgXCJzdGFydHMtd2l0aFwiIHNlYXJjaFxuICAgIGdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1hdGNoRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWF0Y2hGdW5jKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gY3VycmVudFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWF0Y2hlcyhlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRpY2VzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VySW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVudGl0aWVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBoaW50OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBoaW50UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWF0Y2hGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBtYXRjaFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ29tcGxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBoaW50UHJvcHM6IHt9LFxuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiB7fSxcbiAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUeXBlYWhlYWRJbnB1dDtcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL3RyYW5zZm9ybVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgbGV0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcHJveGltYXRlcyB0aGUgQGxpbmt7UHVyZVJlbmRlck1peGluIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcHVyZS1yZW5kZXItbWl4aW4uaHRtbH0gZnJvbSBFUzUgUmVhY3QuIEltcGxlbWVudCBzaG91bGRDb21wb25lbnRVcGRhdGUgaW4geW91ciBzdWJjbGFzcyB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgaW5jb21pbmcgcHJvcHMgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgcHJvcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSB0aGUgaW5jb21pbmcgc3RhdGUgZGVmaW5pdGlvbiwgbWF5IGRpZmZlciBmcm9tIGN1cnJlbnQgc3RhdGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICBJbmZvcm1zIFJlYWN0IHRvIHJlLXJlbmRlciB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgKiAgICAgLy8gc29tZSBsb2dpYyBoZXJlLCBldmVudHVhbGx5IGByZXR1cm5gIHRydWUgb3IgZmFsc2VcbiAgICAgKiAgICAgLy8gY3VycmVudCBwcm9wcyAmIHN0YXRlIGFyZSBhdmFpbGFibGUgZm9yIGNvbXBhcmlzb24gYXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWBcbiAgICAgKiB9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgIXNoYWxsb3dFcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gQmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMgdGhpcyBpbXBsZW1lbnRhdGlvbn0uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudXVpZCgpOyAvLyAxZjJjZDI3Zi0wNzU0LTQzNDQtOWQyMC00MzZhMjAxYjJmODBcbiAgICAgKi9cbiAgICB1dWlkKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtdWxhdGVzIHRoZSAobm93IHJlbW92ZWQpIFJlYWN0IGludGVyZmFjZSBgZ2V0SW5pdGlhbFN0YXRlYC4gSXQncyBhIGNvbnZlbmllbmNlLCBidXQgYWxsb3dzXG4gICAgICogZm9yIHRoaXMgZnVuY3Rpb25hbGl0eSB0byB3b3JrIHdpdGhvdXQgaGF2aW5nIHRvIHByb3ZpZGUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQG5hbWUgVUlWaWV3I2luaXRpYWxTdGF0ZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbml0aWFsU3RhdGUoKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgICAgaXRlbXM6IFtdXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJVmlldztcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZ2xvYmFsLlVJS2l0ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3g6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveCcpLmRlZmF1bHQpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpLmRlZmF1bHQpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpLmRlZmF1bHQpLFxuICAgIFVJRml0dGVkVGV4dDogKGdsb2JhbC5VSUtpdC5VSUZpdHRlZFRleHQgPSByZXF1aXJlKCcuL1VJRml0dGVkVGV4dCcpLmRlZmF1bHQpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpLmRlZmF1bHQpLFxuICAgIFVJTGlzdDogKGdsb2JhbC5VSUtpdC5VSUxpc3QgPSByZXF1aXJlKCcuL1VJTGlzdCcpLmRlZmF1bHQpLFxuICAgIFVJTW9kYWw6IChnbG9iYWwuVUlLaXQuVUlNb2RhbCA9IHJlcXVpcmUoJy4vVUlNb2RhbCcpLmRlZmF1bHQpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpLmRlZmF1bHQpLFxuICAgIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZScpLmRlZmF1bHQpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpLmRlZmF1bHQpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpLmRlZmF1bHQpLFxuICAgIFVJVGFibGU6IChnbG9iYWwuVUlLaXQuVUlUYWJsZSA9IHJlcXVpcmUoJy4vVUlUYWJsZScpLmRlZmF1bHQpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpLmRlZmF1bHQpLFxuICAgIFVJVHlwZWFoZWFkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUeXBlYWhlYWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUeXBlYWhlYWRJbnB1dCcpLmRlZmF1bHQpLFxuICAgIFVJVmlldzogKGdsb2JhbC5VSUtpdC5VSVZpZXcgPSByZXF1aXJlKCcuL1VJVmlldycpLmRlZmF1bHQpLFxufTtcbiJdfQ==
