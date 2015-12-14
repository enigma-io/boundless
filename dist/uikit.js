require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UICheckbox":2,"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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

},{"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIView":23,"classnames":24,"react":"react"}],8:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIDialog":4,"../UIView":23,"classnames":24,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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

},{"../UIDialog":4,"../UIUtils/transform":22,"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIButton":1,"../UIView":23,"classnames":24,"react":"react"}],11:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],12:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],13:[function(require,module,exports){
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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

},{"../UIButton":1,"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.content !== this.props.content || nextProps.width !== this.props.width || nextProps.row !== this.props.row;
        }
    }, {
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
            return _react2.default.createElement(
                'div',
                { className: 'ui-table-cell',
                    title: typeof this.props.content === 'string' ? this.props.content : null,
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

},{"../UIView":23,"react":"react"}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

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
 * There are a lot of places where shared this.{name} variables have been
 * used where they don't seem to be needed. This is completely on purpose to
 * reduce memory pressure during scroll operations. If you change them back to
 * normal vars, you'll see more GCs in your JS profiler... so don't do it!
 */

/**
 * ORDER OF OPERATIONS
 *
 * 1. initial render w/ one row of cells
 * 2. capture table & cell sizing metrics
 * 3. apply widths to column definitions
 * 4. render pass 2 w/ column heads and the rest of the cells
 */

var _findWhereIndex = null;

/** @ignore */
var findWhere = function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
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

        _this.captureConstraints = _this.captureConstraints.bind(_this);

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
            this.captureConstraints();

            window.addEventListener('resize', this.captureConstraints, true);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            var _this2 = this;

            this.setState(this.initialState(), function () {
                return _this2.captureConstraints();
            });
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
            if (this.refs.head && this._minimumColumnWidth !== undefined) {
                this._componentDidUpdate_node = this.refs.wrapper.getElementsByClassName('ui-table-header-cell')[0];

                if (this._componentDidUpdate_node) {
                    this._componentDidUpdate_nodeStyle = window.getComputedStyle(this._componentDidUpdate_node);

                    // will be NaN if not a pixel value
                    this._maximumColumnWidth = parseInt(this._componentDidUpdate_nodeStyle.maxWidth, 10);
                    this._minimumColumnWidth = parseInt(this._componentDidUpdate_nodeStyle.minWidth, 10);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.captureConstraints, true);
        }
    }, {
        key: 'calculateXScrollerNubSize',
        value: function calculateXScrollerNubSize() {
            this._calculateXScrollerNubSize = this._containerWidth - Math.abs(this._xMaximumTranslation);

            return this._calculateXScrollerNubSize < 12 ? 12 : this._calculateXScrollerNubSize;
        }
    }, {
        key: 'calculateYScrollerNubSize',
        value: function calculateYScrollerNubSize() {
            this._calculateYScrollerNubSize = this._containerHeight * (this.nRowsToRender / this.props.totalRows);

            return this._calculateYScrollerNubSize < 12 ? 12 : this._calculateYScrollerNubSize;
        }
    }, {
        key: 'resetInternalCaches',
        value: function resetInternalCaches() {
            this._xCurrent = this._yCurrent = 0;
            this._xNext = this._yNext = 0;
            this._xCurrentScrollNubPosition = this._xScrollNubPosition = 0;
            this._yCurrentScrollNubPosition = this._yScrollNubPosition = 0;

            // temporary variables in various calculations
            this._iterator = null;
            this._nextActiveRow = null;
            this._nRowsToShift = null;
            this._orderedYArrayTargetIndex = null;
            this._rowPointer = null;
            this._shiftDelta = null;
            this._targetIndex = null;

            this._calculateXScrollerNubSize = null;
            this._calculateYScrollerNubSize = null;

            this._componentDidUpdate_node = null;
            this._componentDidUpdate_nodeStyle = null;

            this._captureConstraints_firstRow = null;
            this._captureConstraints_firstRowCells = null;
            this._captureConstraints_container = null;
            this._captureConstraints_generatedRows = null;
            this._captureConstraints_rowsOrderedByY = null;

            this._ariaExposeFullRowData = null;

            // reset!
            this.performTranslations();
        }
    }, {
        key: 'calculateXAxisConsiderations',
        value: function calculateXAxisConsiderations() {
            this._rowWidth = this.refs.body.getElementsByClassName('ui-table-row')[0].clientWidth || 500;
            this._xMaximumTranslation = this._containerWidth > this._rowWidth ? 0 : this._containerWidth - this._rowWidth;
        }
    }, {
        key: 'captureConstraints',
        value: function captureConstraints() {
            this.resetInternalCaches();

            this._captureConstraints_firstRow = this.refs.body.getElementsByClassName('ui-table-row')[0];
            this._captureConstraints_firstRowCells = this._captureConstraints_firstRow.getElementsByClassName('ui-table-cell');
            this._captureConstraints_container = this.refs.wrapper;

            /* The fallback amounts are for unit testing, the browser will always have
            an actual number. */

            this._cellHeight = this._captureConstraints_firstRowCells[0].clientHeight || 40;

            this._containerHeight = this._captureConstraints_container.clientHeight || 150;
            this._containerWidth = this._captureConstraints_container.clientWidth || 500;
            this._xScrollerWidth = this.refs.xScroller.clientWidth;

            this.nRowsToRender = Math.ceil(this._containerHeight * 1.3 / this._cellHeight);

            if (this.nRowsToRender > this.props.totalRows) {
                this.nRowsToRender = this.props.totalRows;
            } // rendering more rows than we have content is not constructive.

            this._rowStartIndex = 0;
            this._rowEndIndex = this.nRowsToRender;

            this.calculateXAxisConsiderations();

            this._yUpperBound = 0;
            this._yLowerBound = this._containerHeight - this.nRowsToRender * this._cellHeight;

            this._captureConstraints_generatedRows = [];
            this._captureConstraints_rowsOrderedByY = [];

            for (this._iterator = 0; this._iterator < this.nRowsToRender; this._iterator += 1) {
                this._captureConstraints_generatedRows.push({
                    data: this.props.getRow(this._iterator),
                    setIndex: this._iterator,
                    y: this._cellHeight * this._iterator
                });

                this._captureConstraints_rowsOrderedByY.push(this._iterator);
            }

            this.setState({
                chokeRender: false,
                columns: this.state.columns.map(function discoverWidth(column, index) {
                    return _extends({}, column, {
                        width: Math.ceil(this._captureConstraints_firstRowCells[index].getBoundingClientRect().width)
                    });
                }, this),
                rows: this._captureConstraints_generatedRows,
                rowsOrderedByY: this._captureConstraints_rowsOrderedByY,
                xScrollerNubSize: this.calculateXScrollerNubSize(),
                yScrollerNubSize: this.calculateYScrollerNubSize()
            });
        }
    }, {
        key: 'handleScrollDown',
        value: function handleScrollDown() {
            if (this._rowEndIndex === this.props.totalRows || this._yNext >= this._yLowerBound) {
                return;
            }

            /* Scrolling down, so we want to move the lowest Y value to the yLowerBound and request the next row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._yNext - this._yLowerBound) / this._cellHeight);

            if (this._nRowsToShift + this._rowEndIndex + 1 > this.props.totalRows) {
                /* more rows than there is data available, truncate */
                this._nRowsToShift = this.props.totalRows - this._rowEndIndex + 1;
            }

            if (this._nRowsToShift > 0) {
                if (this._nRowsToShift > this.nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this._shiftDelta = this._nRowsToShift - this.nRowsToRender;

                    this._yUpperBound -= this._shiftDelta * this._cellHeight;
                    this._yLowerBound -= this._shiftDelta * this._cellHeight;

                    this._rowStartIndex += this._shiftDelta;
                    this._rowEndIndex += this._shiftDelta;

                    this._nRowsToShift = this.nRowsToRender;
                }

                if (this._nRowsToShift > 0) {
                    /* move the lowest Y-value rows to the bottom of the ordering array */
                    this._orderedYArrayTargetIndex = 0;

                    for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator++) {
                        this._targetIndex = this._rowEndIndex + this._iterator;

                        this._rowPointer = this.state.rows[this.state.rowsOrderedByY[this._orderedYArrayTargetIndex]];
                        this._rowPointer.data = this.props.getRow(this._targetIndex);
                        this._rowPointer.setIndex = this._targetIndex;
                        this._rowPointer.y = this._targetIndex * this._cellHeight;

                        this.state.rowsOrderedByY.push(this.state.rowsOrderedByY.shift());
                    }

                    this._rowStartIndex += this._nRowsToShift;
                    this._rowEndIndex += this._nRowsToShift;

                    this._yUpperBound -= this._nRowsToShift * this._cellHeight;
                    this._yLowerBound -= this._nRowsToShift * this._cellHeight;

                    this.setState({ rows: this.state.rows });
                }
            }
        }
    }, {
        key: 'handleScrollUp',
        value: function handleScrollUp() {
            if (this._rowStartIndex === 0 || this._yNext <= this._yUpperBound) {
                return;
            }

            /* Scrolling up, so we want to move the highest Y value to the yUpperBound and request the previous row. Scale appropriately if a big delta and migrate as many rows as are necessary. */

            this._nRowsToShift = Math.ceil(Math.abs(this._yNext - this._yUpperBound) / this._cellHeight);

            if (this._rowStartIndex - this._nRowsToShift < 0) {
                this._nRowsToShift = this._rowStartIndex;
            }

            if (this._nRowsToShift > 0) {
                if (this._nRowsToShift > this.nRowsToRender) {
                    /* a very large scroll delta, calculate where the boundaries should be */
                    this._shiftDelta = this._nRowsToShift - this.nRowsToRender;

                    this._yUpperBound += this._shiftDelta * this._cellHeight;
                    this._yLowerBound += this._shiftDelta * this._cellHeight;

                    this._rowStartIndex -= this._shiftDelta;
                    this._rowEndIndex -= this._shiftDelta;

                    this._nRowsToShift = this.nRowsToRender;
                }

                if (this._nRowsToShift > 0) {
                    /* move the highest Y-value rows to the top of the ordering array */
                    this._orderedYArrayTargetIndex = this.state.rowsOrderedByY.length - 1;

                    for (this._iterator = 0; this._iterator < this._nRowsToShift; this._iterator++) {
                        this._targetIndex = this._rowStartIndex - this._iterator - 1;

                        this._rowPointer = this.state.rows[this.state.rowsOrderedByY[this._orderedYArrayTargetIndex]];
                        this._rowPointer.data = this.props.getRow(this._targetIndex);
                        this._rowPointer.setIndex = this._targetIndex;
                        this._rowPointer.y = this._targetIndex * this._cellHeight;

                        this.state.rowsOrderedByY.unshift(this.state.rowsOrderedByY.pop());
                    }

                    this._rowStartIndex -= this._nRowsToShift;
                    this._rowEndIndex -= this._nRowsToShift;

                    this._yUpperBound += this._nRowsToShift * this._cellHeight;
                    this._yLowerBound += this._nRowsToShift * this._cellHeight;

                    this.setState({ rows: this.state.rows });
                }
            }
        }
    }, {
        key: 'performTranslations',
        value: function performTranslations() {
            this.refs.head && (this.refs.head.style[_transform2.default] = 'translate3d(' + this._xNext + 'px, 0px, 0px)');

            this.refs.body.style[_transform2.default] = 'translate3d(' + this._xNext + 'px, ' + this._yNext + 'px, 0px)';
            this.refs.xScrollerNub.style[_transform2.default] = 'translate3d(' + this._xScrollNubPosition + 'px, 0px, 0px)';
            this.refs.yScrollerNub.style[_transform2.default] = 'translate3d(0px, ' + this._yScrollNubPosition + 'px, 0px)';
        }
    }, {
        key: 'handleMoveIntent',
        value: function handleMoveIntent(event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0 || this._manuallyScrollingY && event.deltaY === 0 || this._manuallyScrollingX && event.deltaX === 0) {
                return;
            }

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            this._xNext = this._manuallyScrollingY ? 0 : this._xCurrent - event.deltaX;

            if (this._xNext > 0) {
                this._xNext = 0;
            } else if (this._xNext < this._xMaximumTranslation) {
                this._xNext = this._xMaximumTranslation;
            }

            this._yNext = this._manuallyScrollingX ? 0 : this._yCurrent - event.deltaY;

            if (this._yNext < this._yCurrent) {
                this.handleScrollDown();
            } else if (this._yNext > this._yCurrent) {
                this.handleScrollUp();
            }

            if (this._yNext > 0) {
                this._yNext = 0;
            } else if (this._yNext < this._yLowerBound) {
                this._yNext = this._yLowerBound;
            }

            this._xScrollNubPosition = Math.abs(this._xNext) / (this._rowWidth - this._containerWidth) * (this._xScrollerWidth - this.state.xScrollerNubSize);

            if (this._xScrollNubPosition + this.state.xScrollerNubSize > this._xScrollerWidth) {
                this._xScrollNubPosition = this._xScrollerWidth - this.state.xScrollerNubSize;
            }

            this._yScrollNubPosition = this._rowStartIndex / this.props.totalRows * this._containerHeight;

            if (this._yScrollNubPosition + this.state.yScrollerNubSize > this._containerHeight) {
                this._yScrollNubPosition = this._containerHeight - this.state.yScrollerNubSize;
            }

            this.performTranslations(); // Do all transforms grouped together

            this._xCurrent = this._xNext;
            this._yCurrent = this._yNext;
            this._xCurrentScrollNubPosition = this._xScrollNubPosition;
            this._yCurrentScrollNubPosition = this._yScrollNubPosition;
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this3 = this;

            if (delta === 0) {
                return;
            }

            var adjustedDelta = delta;
            var newTableWidth = 0;

            var copy = this.state.columns.map(function (definition) {
                if (definition.mapping !== _this3._manuallyResizingColumn.mapping) {
                    newTableWidth += definition.width;

                    return definition;
                }

                /* Before any measurements are applied, first we need to compare the delta to the known cell width thresholds and scale appropriately. */

                if (adjustedDelta < 0 && !isNaN(_this3._minimumColumnWidth) && definition.width + adjustedDelta < _this3._minimumColumnWidth) {
                    adjustedDelta = _this3._minimumColumnWidth - definition.width;
                } else if (!isNaN(_this3._maximumColumnWidth) && definition.width + adjustedDelta > _this3._maximumColumnWidth) {
                    adjustedDelta = _this3._maximumColumnWidth - definition.width;
                }

                newTableWidth += definition.width + adjustedDelta;

                return _extends({}, definition, {
                    width: definition.width + adjustedDelta
                });
            });

            if (newTableWidth <= this._containerWidth) {
                this._xMaximumTranslation = 0;
            } else {
                this._xMaximumTranslation -= adjustedDelta;
            }

            this.setState({
                columns: copy,
                xScrollerNubSize: this.calculateXScrollerNubSize()
            }, function () {
                _this3.calculateXAxisConsiderations();

                /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
                we'll see unwanted whitespace on the right side. If the table width becomes smaller than the overall container, whitespace will appear regardless. */
                if (adjustedDelta < 0) {
                    _this3.handleMoveIntent({
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
                this._lastColumnX = event.clientX;

                this._manuallyResizingColumn = this.state.columns[event.target.getAttribute('data-column-index')];

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);

                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.nativeEvent.preventDefault();
            }
        }
    }, {
        key: 'handleXScrollerDragStart',
        value: function handleXScrollerDragStart(event) {
            if (event.button === 0) {
                this._lastXScroll = event.clientX;
                this._manuallyScrollingX = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);

                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.nativeEvent.preventDefault();
            }
        }
    }, {
        key: 'handleYScrollerDragStart',
        value: function handleYScrollerDragStart(event) {
            if (event.button === 0) {
                this._lastYScroll = event.clientY;
                this._manuallyScrollingY = true;

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', this.handleDragEnd, true);

                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.nativeEvent.preventDefault();
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
                        deltaY: (event.clientY - this._lastYScroll) / this._containerHeight * this.props.totalRows * this._cellHeight,
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
            var _this4 = this;

            return this.state.rows.map(function (row, index) {
                return _react2.default.createElement(_row2.default, { key: index,
                    active: row.setIndex === _this4.state.currentActiveRowIndex,
                    columns: _this4.state.columns,
                    data: row.data,
                    even: row.setIndex % 2 === 0,
                    y: row.y,
                    onInteract: _this4.handleRowClick,
                    onCellInteract: _this4.props.onCellInteract });
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
        key: 'renderColumnResizeHandle',
        value: function renderColumnResizeHandle(column, index) {
            if (column.resizable) {
                return _react2.default.createElement('div', { className: 'ui-table-header-cell-resize-handle',
                    'data-column-index': index,
                    onMouseDown: this.handleColumnDragStart });
            }
        }
    }, {
        key: 'renderHead',
        value: function renderHead() {
            var _this5 = this;

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
                                _this5.renderColumnResizeHandle(column, index)
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
                    { ref: 'xScroller',
                        className: 'ui-table-x-scroller',
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
            var _this6 = this;

            this._nextActiveRow = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex + delta);

            if (this._nextActiveRow) {
                this.setState({
                    ariaSpokenOutput: this._nextActiveRow.data[this.state.columns[0].mapping],
                    currentActiveRowIndex: this._nextActiveRow.setIndex
                });

                if (delta === -1 && this._nextActiveRow.y * -1 > this._yCurrent || delta === 1 && this._nextActiveRow.y * -1 - this._cellHeight < this._yCurrent - this._containerHeight + this._cellHeight // 1 unit of cellHeight is removed to compensate for the header row
                ) {
                        // Destination row is outside the viewport, so simulate a scroll
                        this.handleMoveIntent({
                            deltaX: 0,
                            deltaY: this._cellHeight * delta,
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
                    deltaY: (this._rowStartIndex > this.state.currentActiveRowIndex && this.state.currentActiveRowIndex - this._rowStartIndex || (this._rowStartIndex < this.state.currentActiveRowIndex && this.state.currentActiveRowIndex - this._rowStartIndex) + delta) * this._cellHeight,
                    preventDefault: _noop2.default
                });

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this6.changeActiveRow(delta);
                });
            }

            this._nextActiveRow = null;
        }
    }, {
        key: 'ariaExposeFullRowData',
        value: function ariaExposeFullRowData() {
            var _this7 = this;

            this._ariaExposeFullRowData = findWhere(this.state.rows, 'setIndex', this.state.currentActiveRowIndex);

            if (this._ariaExposeFullRowData) {
                this.setState({
                    ariaSpokenOutput: this.state.columns.map(function (column) {
                        return column.title + ': ' + _this7._ariaExposeFullRowData.data[column.mapping];
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
                    className: 'ui-table-wrapper ' + this.props.className,
                    onKeyDown: this.handleKeyDown,
                    onMouseMove: this.handleDragMove,
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
    name: _react2.default.PropTypes.string,
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    className: '',
    columns: [],
    getRow: _noop2.default,
    offscreenClass: 'ui-offscreen',
    totalRows: 0
};

exports.default = UITable;

},{"../UIUtils/noop":20,"../UIUtils/transform":22,"../UIView":23,"./row":16,"react":"react"}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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
        _this.cache_style = _defineProperty({}, _transform2.default, null);
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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.data !== this.props.data || nextState.data !== this.state.data || nextProps.even !== this.props.even || nextProps.columns !== this.props.columns || nextProps.y !== this.props.y;
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
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onInteract) {
                event.persist();
                this.props.onInteract(event, this.state.data);
            }
        }
    }, {
        key: 'renderCells',
        value: function renderCells() {
            var _this2 = this;

            if (this.state.data && this.state.data instanceof Promise === false) {
                return this.props.columns.map(function (definition) {
                    return _react2.default.createElement(_cell2.default, { key: definition.mapping,
                        content: _this2.state.data[definition.mapping],
                        width: definition.width,
                        onInteract: _this2.props.onCellInteract,
                        row: _this2.state.data });
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-table-row' + (this.props.even ? ' ui-table-row-even' : ' ui-table-row-odd') + (this.state.data instanceof Promise ? ' ui-table-row-loading' : '') + (this.props.active ? ' ui-table-row-active' : ''),
                    style: _defineProperty({}, _transform2.default, 'translate3d(0px, ' + this.props.y + 'px, 0px)'),
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

},{"../UIUtils/transform":22,"../UIView":23,"./cell":14,"react":"react"}],17:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UITypeaheadInput":19,"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],18:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIView":23,"classnames":24,"react":"react"}],19:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],20:[function(require,module,exports){
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

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

},{"../UIUtils/shallowEqual":21,"react":"react"}],24:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUJ1dHRvbi9pbmRleC5qcyIsIlVJQ2hlY2tib3gvaW5kZXguanMiLCJVSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCJVSURpYWxvZy9pbmRleC5qcyIsIlVJRml0dGVkVGV4dC9pbmRleC5qcyIsIlVJSW1hZ2UvaW5kZXguanMiLCJVSUxpc3QvaW5kZXguanMiLCJVSU1vZGFsL2luZGV4LmpzIiwiVUlQb3BvdmVyL2luZGV4LmpzIiwiVUlQcm9ncmVzcy9pbmRleC5qcyIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiVUlSYWRpby9pbmRleC5qcyIsIlVJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIlVJVGFibGUvY2VsbC5qcyIsIlVJVGFibGUvaW5kZXguanMiLCJVSVRhYmxlL3Jvdy5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybS9pbmRleC5qcyIsIlVJVmlldy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0tNLFFBQVE7Y0FBUixRQUFROzthQUFSLFFBQVE7OEJBQVIsUUFBUTs7c0VBQVIsUUFBUTs7O2lCQUFSLFFBQVE7O3NDQUNJO0FBQ1YsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7QUFDM0Msb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDbEU7U0FDSjs7O3NDQUVhO0FBQ1YsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixnQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN4Qjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPLENBQUM7QUFDYixxQkFBSyxPQUFPO0FBQ1IseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUVuQix3QkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUMzQyw0QkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDeEI7QUFBQSxhQUNKOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBWSxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsUUFBUTtBQUNaLDZCQUFTLEVBQUU7QUFDUCxtQ0FBVyxFQUFFLElBQUk7QUFDakIsNkNBQXFCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxXQUFXO0FBQ2hFLDJDQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzt1QkFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNoRCxBQUFDO0FBQ0gsb0NBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUM7QUFDakMsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUN6QywyQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7YUFDZixDQUNYO1NBQ0w7OztXQTlDQyxRQUFROzs7QUFpRGQsUUFBUSxDQUFDLFNBQVMsR0FBRztBQUNqQixZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ2hDLENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRztBQUNwQixXQUFPLGdCQUFNO0FBQ2IsYUFBUyxnQkFBTTtBQUNmLGVBQVcsZ0JBQU07Q0FDcEIsQ0FBQzs7a0JBRWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDMURqQixVQUFVO2NBQVYsVUFBVTs7YUFBVixVQUFVOzhCQUFWLFVBQVU7O3NFQUFWLFVBQVU7OztpQkFBVixVQUFVOzt1Q0FDRztBQUNYLG1CQUFPO0FBQ0gsa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTthQUM5QyxDQUFDO1NBQ0w7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDMUIsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1NBQ0o7OzsyQ0FFa0IsU0FBUyxFQUFFO0FBQzFCLGdCQUFJLFNBQVMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDdEQsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1NBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztTQUM5RDs7O29DQUVXO0FBQ1IsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFFOzs7dUNBRWM7O0FBQ1gsZ0JBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUcsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRjs7O3NDQUVhO0FBQ1YsbUJBQ0ksb0RBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLG1CQUFHLEVBQUMsT0FBTztBQUNYLG9CQUFJLEVBQUMsVUFBVTtBQUNmLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDbEIseUJBQVMsRUFBRTtBQUNQLGlDQUFhLEVBQUUsSUFBSTtBQUNuQix1Q0FBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7QUFDN0MseUNBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQ3pDLDJDQUF1QixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87bUJBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUN0RSxBQUFDO0FBQ0gsb0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztBQUN0Qix1QkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDO0FBQzVCLGdDQUFjLElBQUksQ0FBQyxTQUFTLEVBQUUsQUFBQztBQUMvQix3QkFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQ3ZDLHFCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsSUFBRyxDQUNwQztTQUNMOzs7c0NBRWE7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDTiwrQ0FBbUIsRUFBRSxJQUFJOzJCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdkUsQUFBQztBQUNILCtCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztpQkFDYixDQUNWO2FBQ0w7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDZDQUFxQixFQUFFLElBQUk7dUJBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBaEZDLFVBQVU7OztBQW1GaEIsVUFBVSxDQUFDLFNBQVMsR0FBRztBQUNuQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsaUJBQWEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzNCLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3ZDLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQ2hDLENBQUM7O0FBRUYsVUFBVSxDQUFDLFlBQVksR0FBRztBQUN0QixXQUFPLEVBQUUsS0FBSztBQUNkLGlCQUFhLEVBQUUsS0FBSztBQUNwQixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxFQUFFO0FBQ2QsYUFBUyxnQkFBTTtBQUNmLGVBQVcsZ0JBQU07Q0FDcEIsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3ZHbkIsZUFBZTtjQUFmLGVBQWU7O2FBQWYsZUFBZTs4QkFBZixlQUFlOztzRUFBZixlQUFlOzs7aUJBQWYsZUFBZTs7MENBQ0M7QUFDZCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJO3VCQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSTthQUFBLENBQUMsQ0FBQztTQUNoRTs7OzBDQUVpQjtBQUNkLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJO2FBQUEsQ0FBQyxDQUFDO1NBQy9EOzs7MENBRWlCO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDdEIsb0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7QUFFeEMsdUJBQ0ksaUVBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztBQUM3Qix1QkFBRyxFQUFDLFlBQVk7QUFDaEIsd0JBQUksRUFBQyxlQUFlO0FBQ3BCLHVCQUFHLEVBQUMsZUFBZTtBQUNuQiwyQkFBTyxFQUFFLFVBQVUsQUFBQztBQUNwQiw2QkFBUyxFQUFFO0FBQ1AscURBQTZCLEVBQUUsSUFBSTt1QkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQzlFLEFBQUM7QUFDSCxpQ0FBYSxFQUFFLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQUFBQztBQUNyRCx5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxBQUFDO0FBQ2pDLDZCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUM7QUFDbkMsK0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQyxJQUFHLENBQ3hEO2FBQ0w7U0FDSjs7OzJDQUVrQjs7O0FBQ2YsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hDLHVCQUNJLGlFQUFnQixJQUFJO0FBQ1IsdUJBQUcsZ0JBQWlCO0FBQ3BCLHVCQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQUFBQztBQUNmLDZCQUFTLEVBQUUsT0FBSyxLQUFLLENBQUMsY0FBYyxBQUFDO0FBQ3JDLCtCQUFXLEVBQUUsT0FBSyxLQUFLLENBQUMsZ0JBQWdCLEFBQUMsSUFBRyxDQUMxRDthQUNMLENBQUMsQ0FBQztTQUNOOzs7eUNBRWdCO0FBQ2IsZ0JBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7QUFFN0MsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUN0RCx3QkFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtBQUNwQyx5QkFBSyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQjtBQUM1QyxvQ0FBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUM3Qyw4QkFBTTs7QUFBQSxBQUVWLHlCQUFLLGVBQWUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCO0FBQzNDLG9DQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLDhCQUFNO0FBQUEsaUJBQ1Q7YUFDSjs7QUFFRCxtQkFBTyxZQUFZLENBQUM7U0FDdkI7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsT0FBTztBQUNYLDZCQUFTLEVBQUU7QUFDUiwyQ0FBbUIsRUFBRSxJQUFJO3VCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQy9DLEFBQUM7Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRTthQUNwQixDQUNSO1NBQ0w7OztXQXhFQyxlQUFlOzs7QUEyRXJCLGVBQWUsQ0FBQyxTQUFTLEdBQUc7QUFDeEIscUJBQWlCLEVBQUUsbUJBQW1CO0FBQ3RDLG9CQUFnQixFQUFFLGtCQUFrQjtDQUN2QyxDQUFDOztBQUVGLGVBQWUsQ0FBQyxTQUFTLEdBQUc7QUFDeEIsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQzFCLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsZUFBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUN4QyxhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsWUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07S0FDaEMsQ0FBQyxDQUNMLENBQUMsVUFBVTtBQUNaLGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLG9CQUFnQixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDdEMscUJBQWlCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNyQyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUMzQyxlQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUM3QyxDQUFDO0NBQ0wsQ0FBQzs7QUFFRixlQUFlLENBQUMsWUFBWSxHQUFHO0FBQzNCLFNBQUssRUFBRSxFQUFFO0FBQ1QsZ0JBQVksZ0JBQU07QUFDbEIsa0JBQWMsZ0JBQU07QUFDcEIsa0JBQWMsZ0JBQU07QUFDcEIsb0JBQWdCLGdCQUFNO0FBQ3RCLGtCQUFjLEVBQUUsRUFBRTtBQUNsQixrQkFBYyxFQUFFLFlBQVk7QUFDNUIscUJBQWlCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUI7Q0FDakUsQ0FBQzs7a0JBRWEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbEh4QixRQUFRO2NBQVIsUUFBUTs7YUFBUixRQUFROzhCQUFSLFFBQVE7O3NFQUFSLFFBQVE7OztpQkFBUixRQUFROzt1Q0FDSztBQUNYLG1CQUFPO0FBQ0gsMEJBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3ZCLHdCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTthQUN4QixDQUFDO1NBQ0w7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUN6RSxvQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUI7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtBQUNoQyxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTdELHNCQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTs7QUFFRCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFL0Msa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDs7OytDQUVzQjtBQUNuQixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFO0FBQ2hDLHNCQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0RTs7QUFFRCxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9EOzs7dUNBRWMsSUFBSSxFQUFFO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQzs7O29DQUVXLFdBQVcsRUFBRTtBQUNyQixnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQzFCLHVCQUFPO2FBQ1Y7OztBQUFBLEFBR0QsZ0JBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxzQkFBc0IsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDOztBQUUvRSxnQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUM3QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdDLDJCQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDN0Isd0JBQVEsQ0FBQyxLQUFLLEVBQUU7QUFBQyxhQUNwQjtTQUNKOzs7c0NBRWEsS0FBSyxFQUFFO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQ3BELG9CQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3hCOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7OzsyQ0FFa0IsV0FBVyxFQUFFO0FBQzVCLGdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDMUMsb0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEI7U0FDSjs7O3FDQUVZO0FBQ1QsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7QUFDakIsdUJBQ0k7O2lDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUN4QiwyQkFBRyxFQUFDLE1BQU07QUFDViwwQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQ3hCLGlDQUFTLEVBQUU7QUFDUiw0Q0FBZ0IsRUFBRSxJQUFJOzJCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDbkUsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7aUJBQ2QsQ0FDUjthQUNMO1NBQ0o7Ozt1Q0FFYztBQUNYLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ25CLHVCQUNJOztpQ0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7QUFDMUIsMkJBQUcsRUFBQyxRQUFRO0FBQ1osaUNBQVMsRUFBRTtBQUNQLDhDQUFrQixFQUFFLElBQUk7MkJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUN4RSxBQUFDO29CQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDYixDQUNYO2FBQ0w7U0FDSjs7O3VDQUVjO0FBQ1gsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkIsdUJBQ0k7O2lDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQiwyQkFBRyxFQUFDLFFBQVE7QUFDWiwwQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO0FBQzFCLGlDQUFTLEVBQUU7QUFDUCw4Q0FBa0IsRUFBRSxJQUFJOzJCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFDeEUsQUFBQztvQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07aUJBQ2IsQ0FDWDthQUNMO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsUUFBUTtBQUNaLDZCQUFTLEVBQUU7QUFDUixtQ0FBVyxFQUFFLElBQUk7dUJBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztBQUNILDZCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDekMsd0JBQUksRUFBQyxRQUFRO0FBQ2IsdUNBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO0FBQ3ZDLHdDQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQztBQUN0Qyw0QkFBUSxFQUFDLEdBQUc7Z0JBQ1osSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLFlBQVksRUFBRTthQUNsQixDQUNSO1NBQ0w7OztXQXJJQyxRQUFROzs7QUF3SWQsUUFBUSxDQUFDLFNBQVMsR0FBRztBQUNqQixRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDMUIsYUFBUyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsdUJBQW1CLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDekMsVUFBTSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxVQUFNLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFdBQU8sRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtDQUNoQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxZQUFZLEdBQUc7QUFDcEIsYUFBUyxFQUFFLEVBQUU7QUFDYixnQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVyxFQUFFLEVBQUU7QUFDZixlQUFXLEVBQUUsRUFBRTtBQUNmLFdBQU8sZ0JBQU07Q0FDaEIsQ0FBQzs7a0JBRWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUp2QixTQUFTLEdBQUcsQ0FBQyxZQUFZLEVBQUU7QUFDdkIsV0FBTyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3JDOztJQUVLLFlBQVk7Y0FBWixZQUFZOzthQUFaLFlBQVk7OEJBQVosWUFBWTs7c0VBQVosWUFBWTs7O2lCQUFaLFlBQVk7OzRDQUNNO0FBQ2hCLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWYsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RDs7OzZDQUVvQjtBQUNqQixnQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCOzs7K0NBRXNCO0FBQ25CLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7OztrQ0FFUztBQUNOLGdCQUFJLElBQUksR0FBRyxtQkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsZ0JBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDaEMsZ0JBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxnQkFBSSxlQUFlLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxnQkFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxnQkFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFM0QsZ0JBQU8sWUFBWSxDQUFDLFNBQVMsS0FBSyxZQUFZLElBQ3ZDLFlBQVksQ0FBQyxTQUFTLEtBQUssYUFBYSxFQUFFOztBQUM3QywrQkFBZSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRiw4QkFBYyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwRjs7QUFFRCxnQkFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUksZUFBZSxDQUFDLENBQUM7QUFDckYsZ0JBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxBQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFJLGNBQWMsQ0FBQyxDQUFDOztBQUVsRixnQkFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN0Rzs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFVLElBQUksQ0FBQyxLQUFLO0FBQ2QsNkJBQVMsRUFBRTtBQUNQLGlDQUFTLEVBQUUsSUFBSTt1QkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ2hELEFBQUM7Z0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2FBQ2pCLENBQ1Q7U0FDTDs7O1dBOUNDLFlBQVk7OztBQWlEbEIsWUFBWSxDQUFDLFlBQVksR0FBRztBQUN4QixlQUFXLEVBQUUsTUFBTSxDQUFDLFNBQVM7Q0FDaEMsQ0FBQzs7QUFFRixZQUFZLENBQUMsU0FBUyxHQUFHO0FBQ3JCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2hDLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7QUFDRixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDdEMsQ0FBQzs7a0JBRWEsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDakVyQixPQUFPO2NBQVAsT0FBTzs7YUFBUCxPQUFPOzhCQUFQLE9BQU87O3NFQUFQLE9BQU87OztpQkFBUCxPQUFPOzt1Q0FDTTtBQUNYLG1CQUFPO0FBQ0gsc0JBQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDakMsQ0FBQztTQUNMOzs7a0RBRXlCLFNBQVMsRUFBRTtBQUNqQyxnQkFBSSxTQUFTLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO0FBQ2xDLG9CQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdEIsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjs7OzZDQUVvQjtBQUNqQixnQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCOzs7K0NBRXNCO0FBQ25CLGdCQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7Ozt5Q0FFZ0I7QUFDYixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGdCQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCOzs7a0NBRVM7OztBQUNOLGdCQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFBRSx1QkFBTzthQUFFOztBQUU1QixnQkFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU1QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7dUJBQU0sT0FBSyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQzthQUFBLENBQUM7QUFDMUUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHO3VCQUFNLE9BQUssUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7YUFBQSxDQUFDOztBQUUxRSxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDcEM7OztzQ0FFYTtBQUNWLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7QUFDckMsdUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLHVCQUFHLEVBQUMsT0FBTztBQUNYLDZCQUFTLEVBQUU7QUFDUCxrQ0FBVSxFQUFFLElBQUk7dUJBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQ3RFLEFBQUM7QUFDSCx5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxBQUFDO0FBQ3RCLHlCQUFLLGVBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztBQUM5Qix1Q0FBZSxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFHO3NCQUMzQyxJQUFHLENBQ1o7YUFDTDs7QUFFRCxtQkFDSSxrREFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsbUJBQUcsRUFBQyxPQUFPO0FBQ1gseUJBQVMsRUFBRTtBQUNSLDhCQUFVLEVBQUUsSUFBSTttQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckUsQUFBQztBQUNILG1CQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEFBQUM7QUFDcEIsbUJBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQUFBQztBQUNwQixzQkFBTSxnQkFBTztBQUNiLHVCQUFPLGdCQUFPLElBQUcsQ0FDeEI7U0FDTDs7O3VDQUVjO0FBQ1gsbUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO0FBQzFCLG1CQUFHLEVBQUMsUUFBUTtBQUNaLHlCQUFTLEVBQUU7QUFDUixxQ0FBaUIsRUFBRSxJQUFJO0FBQ3ZCLHNDQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztBQUNoRSxxQ0FBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07QUFDOUQsb0NBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLO21CQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFDdkUsQUFBQztBQUNILG9CQUFJLEVBQUMsY0FBYyxJQUFHLENBQzdCO1NBQ0w7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUUsSUFBSSxBQUFDO0FBQ1YsdUJBQUcsRUFBRSxJQUFJLEFBQUM7QUFDVix1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsMENBQWtCLEVBQUUsSUFBSTt1QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO2dCQUNILElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUU7YUFDbEIsQ0FDUjtTQUNMOzs7V0F2R0MsT0FBTzs7O0FBMEdiLE9BQU8sQ0FBQyxNQUFNLEdBQUc7QUFDYixXQUFPLEVBQUUsU0FBUztBQUNsQixVQUFNLEVBQUUsUUFBUTtBQUNoQixTQUFLLEVBQUUsT0FBTztDQUNqQixDQUFDOztBQUVGLE9BQU8sQ0FBQyxTQUFTLEdBQUc7QUFDaEIsT0FBRyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzNCLDRCQUF3QixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxPQUFHLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDbkIsY0FBVSxFQUFFLEVBQUU7QUFDZCxlQUFXLEVBQUUsRUFBRTtDQUNsQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlIaEIsTUFBTTtjQUFOLE1BQU07O2FBQU4sTUFBTTs4QkFBTixNQUFNOztzRUFBTixNQUFNOzs7aUJBQU4sTUFBTTs7dUNBQ087QUFDWCxtQkFBTztBQUNILDBCQUFVLEVBQUUsSUFBSTthQUNuQixDQUFDO1NBQ0w7OztpQ0FFUSxLQUFLLEVBQUU7QUFDWixnQkFBSSxDQUFDLElBQUksV0FBUyxLQUFLLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0Qzs7O3lDQUVnQixXQUFXLEVBQUU7QUFDMUIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXJELG1CQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNwRDs7OzZDQUVvQixXQUFXLEVBQUU7QUFDOUIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXpELG1CQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDaEU7OztzQ0FFYSxLQUFLLEVBQUU7OztBQUNqQixnQkFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN0QixnQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDL0IsZ0JBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOztBQUV6QyxnQkFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQVM7QUFDZix1QkFBSyxRQUFRLENBQUMsT0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2pELHFCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDMUIsQ0FBQzs7QUFFRixnQkFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQVM7QUFDZixxQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLHVCQUFLLFFBQVEsQ0FBQyxPQUFLLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDeEQsQ0FBQzs7QUFFRixnQkFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO0FBQ2Ysb0JBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWxELG9CQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksZUFBZSxLQUFLLENBQUMsRUFBRTtBQUN6Qyx3QkFBSSxFQUFFLENBQUM7aUJBQ1YsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxlQUFlLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDaEUsd0JBQUksRUFBRSxDQUFDO2lCQUNWO2FBQ0osTUFBTTtBQUNILHdCQUFRLEdBQUc7QUFDWCx5QkFBSyxTQUFTLENBQUM7QUFDZix5QkFBSyxXQUFXO0FBQ1osNEJBQUksRUFBRSxDQUFDO0FBQ1AsOEJBQU07O0FBQUEsQUFFVix5QkFBSyxXQUFXLENBQUM7QUFDakIseUJBQUssWUFBWTtBQUNiLDRCQUFJLEVBQUUsQ0FBQztBQUNQLDhCQUFNO0FBQUEsaUJBQ1Q7YUFDSjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUM1QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtTQUNKOzs7d0NBRWU7OztBQUNaLGdCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDOztBQUVqRCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFLO0FBQ3pDLHVCQUFPLGdCQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDakMsNkJBQVMsRUFBRSxjQUFjO0FBQ3pCLHVCQUFHLFlBQVUsS0FBSyxBQUFFO0FBQ3BCLHVCQUFHLEVBQUUsS0FBSztBQUNWLDRCQUFRLEVBQUUsQ0FBQztBQUNYLDBCQUFNLEVBQUU7K0JBQU0sT0FBSyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxPQUFLLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztxQkFBQTtBQUNqRiwyQkFBTyxFQUFFOytCQUFNLE9BQUssUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO3FCQUFBO0FBQ2hELDRCQUFRLEVBQUUsSUFBSTtpQkFDakIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBQ047OztpQ0FFUTtBQUNMLGdCQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLG9CQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUN2QixxQkFBSyxRQUFRO0FBQ1QsNEJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRO0FBQ1QsNEJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsMEJBQU07QUFBQSxhQUNUOztBQUVELG1CQUFPLGdCQUFNLGFBQWEsQ0FBQyxRQUFRLGVBQzVCLElBQUksQ0FBQyxLQUFLO0FBQ2IsbUJBQUcsRUFBRSxNQUFNO0FBQ1gseUJBQVMsRUFBRTtBQUNQLDZCQUFTLEVBQUUsSUFBSTtBQUNmLHNDQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7QUFDaEQsc0NBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtBQUNoRCxtQ0FBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO21CQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ2hEO0FBQ0YseUJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEMsd0JBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2VBQ2hDLENBQUM7U0FDTjs7O1dBNUdDLE1BQU07OztBQStHWixNQUFNLENBQUMsU0FBUyxHQUFHO0FBQ2YsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQU0sU0FBUyxDQUFDLElBQUksQ0FBQztBQUNwRCxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNwRCxDQUFDOztBQUVGLE1BQU0sQ0FBQyxZQUFZLEdBQUc7QUFDbEIsU0FBSyxFQUFFLEVBQUU7Q0FDWixDQUFDOztrQkFFYSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2SGYsT0FBTztjQUFQLE9BQU87O2FBQVAsT0FBTzs4QkFBUCxPQUFPOztzRUFBUCxPQUFPOzs7aUJBQVAsT0FBTzs7aUNBQ0E7OztBQUNMLGdCQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQVMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUMvRSxxQkFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU3Qix1QkFBTyxLQUFLLENBQUM7YUFDaEIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsMENBQWtCLEVBQUUsSUFBSTt1QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO2dCQUNKLGtEQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUN4Qix1QkFBRyxFQUFDLE1BQU07QUFDViw2QkFBUyxFQUFFO0FBQ1IsdUNBQWUsRUFBRSxJQUFJO3VCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDbkUsQUFBQyxJQUFHO2dCQUNYLCtEQUFjLG1CQUFtQixFQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsdUJBQUcsRUFBQyxRQUFRO0FBQ1osNkJBQVMsRUFBRTtBQUNULGtDQUFVLEVBQUUsSUFBSTt1QkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDcEUsQUFBQyxJQUFHO2FBQ2QsQ0FDUjtTQUNMOzs7V0E5QkMsT0FBTzs7O0FBaUNiLE9BQU8sQ0FBQyxTQUFTLGdCQUNWLG1CQUFTLFNBQVM7QUFDckIsYUFBUyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtFQUNyQyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLGdCQUNiLG1CQUFTLFlBQVk7QUFDeEIsYUFBUyxFQUFFLEVBQUU7QUFDYixjQUFVLEVBQUUsRUFBRTtFQUNqQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3JDaEIsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOztzRUFBVCxTQUFTOzs7aUJBQVQsU0FBUzs7dUNBQ0k7QUFDWCxtQkFBTztBQUNILDRCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ3JDLDRCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ3JDLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ2pDLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2FBQ3BDLENBQUM7U0FDTDs7OzZDQUVvQjtBQUNqQixvQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFFOzs7QUFBQyxBQUc1RSxnQkFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZixnQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3ZDLGdCQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVuRCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkQ7Ozs2Q0FFb0I7QUFDakIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQixnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCOzs7K0NBRXNCO0FBQ25CLCtCQUFTLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRCxvQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUxQyxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFEOzs7eUNBRWdCLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDN0IsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsZ0JBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0FBRXBDLGdCQUFJLEtBQUssR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTNFLG9CQUFRLEtBQUssQ0FBQyxZQUFZO0FBQzFCLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDaEMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLHlCQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM1QiwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsb0JBQVEsS0FBSyxDQUFDLFVBQVU7QUFDeEIscUJBQUssUUFBUSxDQUFDLE1BQU07QUFDaEIseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNoQywwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVEsQ0FBQyxHQUFHO0FBQ2IseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzVCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7Ozt5Q0FFZ0IsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM3QixnQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN6QixnQkFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUNwQyxnQkFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzdFLGdCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6QyxnQkFBSSxLQUFLLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQzs7QUFFbkMsb0JBQVEsS0FBSyxDQUFDLFlBQVk7QUFDMUIscUJBQUssUUFBUSxDQUFDLEtBQUs7QUFDZix5QkFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQiwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLEdBQUcsT0FBTyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDbkMsMEJBQU07QUFBQSxhQUNUOztBQUVELG9CQUFRLEtBQUssQ0FBQyxVQUFVO0FBQ3hCLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDakMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLHlCQUFLLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztBQUM3QiwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCOzs7NERBRW1DLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzVDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDNUIsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCOztBQUVELGdCQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXZCLGdCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQy9CLGdCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ2pDLGdCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUN2QyxnQkFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFOztBQUNsQiwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNsRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUNuRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs7QUFDZCwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNwRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNyRCxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEVBQUU7O0FBQzFCLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3BELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ25ELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztBQUNkLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2xELDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3JELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2xELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQ3REOztBQUVELG1CQUFPLFdBQVcsQ0FBQztTQUN0Qjs7O3lDQUVnQixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QixxQ0FBbUI7QUFDZixvQkFBSSxDQUFDLEtBQUsscUJBQWUsa0JBQWdCLENBQUMsWUFBTyxDQUFDLFFBQUssQ0FBQzthQUMzRCxNQUFNO0FBQ0gsb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0Isb0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0I7U0FDSjs7O2dDQUVPOzs7QUFDSixnQkFBTSxNQUFNLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFlBQVksV0FBVyxHQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FDakIsbUJBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXpELGdCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxnQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5ELGdCQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFdEYsZ0JBQUksbUJBQW1CLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUNoRSx1QkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFOzJCQUFNLE9BQUssa0JBQWtCLEVBQUU7aUJBQUEsQ0FBQyxDQUFDO2FBQzlFOztBQUVELGdCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7OztrREFFeUIsUUFBUSxFQUFFO0FBQ2hDLGdCQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDOztBQUVwQyxvQkFBUSxRQUFRO0FBQ2hCLHFCQUFLLFFBQVEsQ0FBQyxLQUFLO0FBQ2YsMkJBQU8sT0FBTyxDQUFDOztBQUFBLEFBRW5CLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLDJCQUFPLFFBQVEsQ0FBQzs7QUFBQSxBQUVwQixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLDJCQUFPLEtBQUssQ0FBQztBQUFBLGFBQ2hCO1NBQ0o7Ozt1Q0FFYzs7O0FBQ1gsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsZ0JBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQzs7QUFFL0MsbUJBQU8sbUJBQVMsTUFBTSxDQUNsQiwrREFBYyxJQUFJLENBQUMsS0FBSztBQUNkLDRCQUFZLEVBQUUsS0FBSyxBQUFDO0FBQ3BCLHlCQUFTLEVBQUU7QUFDVCxnQ0FBWSxFQUFFLElBQUk7aUVBQ00sT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBSyxJQUFJLGlEQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFLLElBQUksK0NBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUssSUFBSSwrQ0FDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBSyxJQUFJLHdCQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLFFBQzlDLEFBQUM7QUFDSCxxQkFBSyxlQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztBQUNuQiw0QkFBUSxFQUFFLFVBQVU7QUFDcEIsdUJBQUcsRUFBRSxLQUFLO0FBQ1Ysd0JBQUksRUFBRSxLQUFLO2tCQUNiLElBQUcsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JCOzs7aUNBRVE7QUFDTCxtQkFDSSwwQ0FBTyxDQUNUO1NBQ0w7OztXQXBNQyxTQUFTOzs7QUF1TWYsU0FBUyxDQUFDLFFBQVEsR0FBRztBQUNqQixTQUFLLEVBQUUsT0FBTztBQUNkLFVBQU0sRUFBRSxRQUFRO0FBQ2hCLE9BQUcsRUFBRSxLQUFLO0NBQ2IsQ0FBQzs7QUFFRixTQUFTLENBQUMsU0FBUyxnQkFDWixtQkFBUyxTQUFTO0FBQ3JCLFVBQU0sRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQzlCLGdCQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQ3ZDLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsYUFBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtLQUNoQyxDQUFDLENBQ0wsQ0FBQztBQUFDLGNBQVU7QUFDYixnQkFBWSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3hCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekIsQ0FBQztBQUNGLGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0Ysa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUM5QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0YsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDOUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3hCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekIsQ0FBQztFQUNMLENBQUM7O0FBRUYsU0FBUyxDQUFDLFlBQVksZ0JBQ2YsbUJBQVMsWUFBWTtBQUN4QixnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUN0QyxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRztBQUNwQyxrQkFBYyxFQUFFLElBQUk7QUFDcEIsY0FBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUNwQyxjQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0VBQ3ZDLENBQUM7O2tCQUVhLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlQbEIsVUFBVTtjQUFWLFVBQVU7O2FBQVYsVUFBVTs4QkFBVixVQUFVOztzRUFBVixVQUFVOzs7aUJBQVYsVUFBVTs7c0NBQ0U7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDUiwrQ0FBbUIsRUFBRSxJQUFJOzJCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckUsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7aUJBQ2YsQ0FDUjthQUNMO1NBQ0o7Ozt1Q0FFYztBQUNYLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3JCLHVCQUNJLCtEQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQix1QkFBRyxFQUFDLFFBQVE7QUFDWiw2QkFBUyxFQUFFO0FBQ1AsNENBQW9CLEVBQUUsSUFBSTt1QkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3hFLEFBQUM7QUFDSCwyQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLElBQUcsQ0FDNUM7YUFDTDtTQUNKOzs7eUNBRWdCO0FBQ2IsbUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0FBQzVCLG1CQUFHLEVBQUMsVUFBVTtBQUNkLHlCQUFTLEVBQUU7QUFDUixpQ0FBYSxFQUFFLElBQUk7QUFDbkIsK0NBQTJCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxXQUFXO21CQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFDM0UsQUFBQztBQUNILG9CQUFJLEVBQUMsY0FBYztBQUNuQixxQkFBSyxlQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssc0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNqRCxJQUFHLENBQ1o7U0FDTDs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDZDQUFxQixFQUFFLElBQUk7dUJBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ2xCLENBQ1I7U0FDTDs7O1dBNURDLFVBQVU7OztBQStEaEIsVUFBVSxDQUFDLFlBQVksR0FBRztBQUN0QixlQUFXLEVBQUUsRUFBRTtBQUNmLGNBQVUsRUFBRSxFQUFFO0FBQ2QsaUJBQWEsRUFBRSxFQUFFO0FBQ2pCLGlCQUFhLEVBQUUsT0FBTztDQUN6QixDQUFDOztBQUVGLFVBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2xDLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQ3ZCLENBQUM7QUFDRixpQkFBYSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3JDLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDeEMsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkZKLHVCQUF1QjtjQUF2Qix1QkFBdUI7O2FBQXZCLHVCQUF1Qjs4QkFBdkIsdUJBQXVCOztzRUFBdkIsdUJBQXVCOzs7aUJBQXZCLHVCQUF1Qjs7dUNBQ3pCO0FBQ1gsbUJBQU87QUFDSCx3QkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUNoQyxDQUFDO1NBQ0w7OzsyQ0FFa0I7QUFDZixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUM3RDs7O2tEQUV5QixRQUFRLEVBQUU7OztBQUNoQyxnQkFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzNDLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUMsRUFBRTsyQkFBTSxPQUFLLGdCQUFnQixFQUFFO2lCQUFBLENBQUMsQ0FBQzthQUMvRTtTQUNKOzs7c0NBRWE7OztBQUNWLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsRUFBRTt1QkFBTSxPQUFLLGdCQUFnQixFQUFFO2FBQUEsQ0FBQyxDQUFDOztBQUUvRSxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7OztzQ0FFYSxLQUFLLEVBQUU7OztBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPO0FBQ1IseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLEVBQUU7K0JBQU0sT0FBSyxnQkFBZ0IsRUFBRTtxQkFBQSxDQUFDLENBQUM7QUFBQSxhQUNsRjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDeEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsU0FBUztBQUNiLDZCQUFTLEVBQUU7QUFDUix1Q0FBZSxFQUFFLElBQUk7QUFDckIsZ0RBQXdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO3VCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQy9DLEFBQUM7Z0JBQ0o7O2lDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQiwyQkFBRyxFQUFDLFFBQVE7QUFDWixpQ0FBUyxFQUFFO0FBQ1Isa0RBQXNCLEVBQUUsSUFBSTsyQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3ZFLEFBQUM7QUFDSCwrQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQ3JDLGlDQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDekMsZ0NBQVEsRUFBQyxHQUFHO29CQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDaEI7Z0JBQ047O3NCQUFLLEdBQUcsRUFBQyxTQUFTO0FBQ2IsaUNBQVMsRUFBQyx1QkFBdUI7b0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtpQkFDbEI7YUFDSixDQUNSO1NBQ0w7OztXQWpFZ0IsdUJBQXVCOzs7a0JBQXZCLHVCQUF1Qjs7QUFvRTVDLHVCQUF1QixDQUFDLFNBQVMsR0FBRztBQUNoQyxZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixVQUFNLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsVUFBTSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztBQUVGLHVCQUF1QixDQUFDLFlBQVksR0FBRztBQUNuQyxZQUFRLEVBQUUsS0FBSztBQUNmLFlBQVEsZ0JBQU07QUFDZCxVQUFNLGdCQUFNO0FBQ1osZUFBVyxFQUFFLEVBQUU7Q0FDbEIsQ0FBQzs7a0JBRWEsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNwRmhDLE9BQU87Y0FBUCxPQUFPOzthQUFQLE9BQU87OEJBQVAsT0FBTzs7c0VBQVAsT0FBTzs7O2lCQUFQLE9BQU87O3VDQUNNO0FBQ1gsbUJBQU87QUFDSCxrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQzlDLENBQUM7U0FDTDs7O3FDQUVZLEtBQUssRUFBRTtBQUNoQixnQkFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUN0QixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3Qzs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDdEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7OztzQ0FFYTtBQUNWLG1CQUNJLG9EQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUN6QixtQkFBRyxFQUFDLE9BQU87QUFDWCxvQkFBSSxFQUFDLE9BQU87QUFDWixrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxBQUFDO0FBQ2xCLHlCQUFTLEVBQUU7QUFDUCw4QkFBVSxFQUFFLElBQUk7QUFDaEIsdUNBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO21CQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdEUsQUFBQztBQUNILG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdEIscUJBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN4Qix1QkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzdCLGdDQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxBQUFDO0FBQzFDLHdCQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsSUFBRyxDQUNuRDtTQUNMOzs7c0NBRWE7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDUCw0Q0FBZ0IsRUFBRSxJQUFJOzJCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdEUsQUFBQztBQUNILCtCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztpQkFDYixDQUNWO2FBQ0w7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNQLDBDQUFrQixFQUFFLElBQUk7dUJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsQUFBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBakVDLE9BQU87OztBQW9FYixPQUFPLENBQUMsU0FBUyxHQUFHO0FBQ2hCLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxTQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdkMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixTQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0NBQzNDLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxnQkFBTTtBQUNoQixZQUFRLEVBQUUsS0FBSztDQUNsQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNuRmhCLGtCQUFrQjtjQUFsQixrQkFBa0I7O2FBQWxCLGtCQUFrQjs4QkFBbEIsa0JBQWtCOztzRUFBbEIsa0JBQWtCOzs7aUJBQWxCLGtCQUFrQjs7dUNBQ0w7QUFDWCxnQkFBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixnQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLG9CQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDakIseUJBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDOztBQUVyQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSixDQUFDLENBQUM7O0FBRUgsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCOzs7aUNBRVEsS0FBSyxFQUFFO0FBQ1osMEJBcEJBLFdBQVcsRUFvQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0RDs7OzJDQUVrQixrQkFBa0IsRUFBRTtBQUNuQyxnQkFBSSxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxtQkFBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDdEQ7OzsrQ0FFc0Isa0JBQWtCLEVBQUU7QUFDdkMsZ0JBQUksUUFBUSxHQUFHLGtCQUFrQixHQUFHLENBQUMsQ0FBQzs7QUFFdEMsbUJBQU8sUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUNsRTs7O21DQUVVLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDdEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsS0FBSyxNQUFNLEVBQUU7QUFDNUMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQy9DOztBQUVELGdCQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDckMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixzQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtTQUNKOzs7b0NBRVcsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN2QixnQkFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTFDLGdCQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixzQkFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtTQUNKOzs7b0NBRVcsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN2QixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUM7O0FBRTFFLGdCQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixzQkFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtTQUNKOzs7c0NBRWEsS0FBSyxFQUFFO0FBQ2pCLGdCQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ3RCLGdCQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOztBQUV4RCxnQkFBSSxHQUFHLEtBQUssV0FBVyxFQUFFO0FBQ3JCLG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzVELHFCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxZQUFZLEVBQUU7QUFDN0Isb0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDeEQscUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQixNQUFNLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtBQUN4QixvQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3RELHFCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDMUI7O0FBRUQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDNUMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7U0FDSjs7O3dDQUVlOzs7QUFDWixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFLO0FBQ2pELHVCQUNJOztpQ0FBYyxVQUFVO0FBQ25CLDRCQUFJLEVBQUMsT0FBTztBQUNaLHdDQUFjLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEFBQUM7QUFDMUMsMkJBQUcsRUFBRSxVQUFVLEdBQUcsS0FBSyxBQUFDO0FBQ3hCLDJCQUFHLEVBQUUsVUFBVSxDQUFDLEtBQUssQUFBQztBQUN0QixpQ0FBUyxFQUFFO0FBQ1IseURBQTZCLEVBQUUsSUFBSTtBQUNuQyxrRUFBc0MsRUFBRSxVQUFVLENBQUMsUUFBUTsyQkFDMUQsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDL0MsQUFBQztBQUNILGdDQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEFBQUM7QUFDdkMsOEJBQU0sRUFBRSxPQUFLLFVBQVUsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7QUFDL0MsK0JBQU8sRUFBRSxPQUFLLFdBQVcsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7QUFDakQsK0JBQU8sRUFBRSxPQUFLLFdBQVcsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7b0JBQ3JELFVBQVUsQ0FBQyxPQUFPO2lCQUNSLENBQ2I7YUFDTCxDQUFDLENBQUM7U0FDTjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IscUNBQWMsWUFBWTtBQUMxQiw2QkFBUyxFQUFFO0FBQ1IsOENBQXNCLEVBQUUsSUFBSTt1QkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztnQkFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNwQixDQUNSO1NBQ0w7OztXQXJIQyxrQkFBa0I7OztBQXdIeEIsa0JBQWtCLENBQUMsU0FBUyxHQUFHO0FBQzNCLG9CQUFnQixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFdBQU8sRUFBRSxpQkFBUyxLQUFLLEVBQUU7QUFDckIsWUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDMUIsbUJBQU8sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUMxRDs7QUFFRCxZQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUMvQyxnQkFBSSxFQUFFLFVBQVUsSUFBSSxNQUFNLENBQUEsQUFBQyxFQUFFO0FBQ3pCLHVCQUFPLElBQUksQ0FBQzthQUNmO1NBQ0osQ0FBQyxDQUFDOztBQUVILFlBQUksZUFBZSxFQUFFO0FBQ2pCLG1CQUFPLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDdkU7O0FBRUQsWUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDNUMsZ0JBQUksRUFBRSxPQUFPLElBQUksTUFBTSxDQUFBLEFBQUMsRUFBRTtBQUN0Qix1QkFBTyxJQUFJLENBQUM7YUFDZjtTQUNKLENBQUMsQ0FBQzs7QUFFSCxZQUFJLFlBQVksRUFBRTtBQUNkLG1CQUFPLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDcEU7O0FBRUQsWUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFlBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDaEQsZ0JBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNqQixvQkFBSSxZQUFZLEVBQUU7QUFDZCwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7O0FBRUQsNEJBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7U0FDSixDQUFDLENBQUM7O0FBRUgsWUFBSSxnQkFBZ0IsRUFBRTtBQUNsQixtQkFBTyxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2xHO0tBQ0o7Q0FDSixDQUFDOztBQUVGLGtCQUFrQixDQUFDLFlBQVksR0FBRztBQUM5QixXQUFPLEVBQUUsRUFBRTtBQUNYLG9CQUFnQixnQkFBTTtDQUN6QixDQUFDOztrQkFFYSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2xMM0IsV0FBVztjQUFYLFdBQVc7O0FBQ2IsYUFERSxXQUFXLEdBQ1E7Ozs4QkFEbkIsV0FBVzs7MENBQ0UsSUFBSTtBQUFKLGdCQUFJOzs7b0dBRGpCLFdBQVcsbURBRUEsSUFBSTs7QUFFYixjQUFLLFdBQVcsR0FBRyxNQUFLLFdBQVcsQ0FBQyxJQUFJLE9BQU0sQ0FBQzs7S0FDbEQ7O2lCQUxDLFdBQVc7OzhDQU9TLFNBQVMsRUFBRTtBQUM3QixtQkFBVSxTQUFTLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUN4QyxTQUFTLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUNwQyxTQUFTLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQzlDOzs7b0NBRVcsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDdkIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEU7U0FDSjs7O3dDQUVlO0FBQ1osZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDdEMsdUJBQ0k7O3NCQUFLLFNBQVMsRUFBQyxxQkFBcUI7b0JBQ2hDOzswQkFBTSxTQUFTLEVBQUMsMEJBQTBCO3dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztxQkFBUTtpQkFDcEUsQ0FDUjthQUNMOztBQUVELG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzdCOzs7aUNBRVE7QUFDTCxtQkFDSTs7a0JBQUssU0FBUyxFQUFDLGVBQWU7QUFDekIseUJBQUssRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEFBQUM7QUFDMUUseUJBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFDLEFBQUM7QUFDbEUsMkJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO2dCQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFO2FBQ25CLENBQ1I7U0FDTDs7O1dBekNDLFdBQVc7OztBQTRDakIsV0FBVyxDQUFDLFNBQVMsR0FBRztBQUNwQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxPQUFHLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDOUIsQ0FBQzs7a0JBRWEsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjFCLElBQUksZUFBZSxHQUFHLElBQUk7OztBQUFDLEFBRzNCLElBQU0sU0FBUyxHQUFHLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQ3pELG1CQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRW5DLFdBQU8sZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3pCLFlBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUM1QyxtQkFBTyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDakM7O0FBRUQsdUJBQWUsSUFBSSxDQUFDLENBQUM7S0FDeEI7Q0FDSjs7QUFBQyxJQUVJLE9BQU87Y0FBUCxPQUFPOztBQUNULGFBREUsT0FBTyxHQUNZOzs7OEJBRG5CLE9BQU87OzBDQUNNLElBQUk7QUFBSixnQkFBSTs7O29HQURqQixPQUFPLG1EQUVJLElBQUk7O0FBRWIsY0FBSyxrQkFBa0IsR0FBRyxNQUFLLGtCQUFrQixDQUFDLElBQUksT0FBTSxDQUFDOztBQUU3RCxjQUFLLGNBQWMsR0FBRyxNQUFLLGNBQWMsQ0FBQyxJQUFJLE9BQU0sQ0FBQztBQUNyRCxjQUFLLGFBQWEsR0FBRyxNQUFLLGFBQWEsQ0FBQyxJQUFJLE9BQU0sQ0FBQztBQUNuRCxjQUFLLGNBQWMsR0FBRyxNQUFLLGNBQWMsQ0FBQyxJQUFJLE9BQU0sQ0FBQztBQUNyRCxjQUFLLGFBQWEsR0FBRyxNQUFLLGFBQWEsQ0FBQyxJQUFJLE9BQU0sQ0FBQztBQUNuRCxjQUFLLGdCQUFnQixHQUFHLE1BQUssZ0JBQWdCLENBQUMsSUFBSSxPQUFNLENBQUM7O0FBRXpELGNBQUssd0JBQXdCLEdBQUcsTUFBSyx3QkFBd0IsQ0FBQyxJQUFJLE9BQU0sQ0FBQztBQUN6RSxjQUFLLHdCQUF3QixHQUFHLE1BQUssd0JBQXdCLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDekUsY0FBSyxxQkFBcUIsR0FBRyxNQUFLLHFCQUFxQixDQUFDLElBQUksT0FBTSxDQUFDOztLQUN0RTs7aUJBZkMsT0FBTzs7dUNBaUJNO0FBQ1gsbUJBQU87QUFDSCxnQ0FBZ0IsRUFBRSxFQUFFO0FBQ3BCLDJCQUFXLEVBQUUsSUFBSTtBQUNqQixxQ0FBcUIsRUFBRSxDQUFDLENBQUM7QUFDekIsb0JBQUksRUFBRSxDQUFDO0FBQ0gsd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUIsNEJBQVEsRUFBRSxDQUFDO0FBQ1gscUJBQUMsRUFBRSxDQUFDO2lCQUNQLENBQUM7QUFDRiw4QkFBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25CLHVCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxnQ0FBZ0IsRUFBRSxJQUFJO0FBQ3RCLGdDQUFnQixFQUFFLElBQUk7YUFDekIsQ0FBQztTQUNMOzs7NENBRW1CO0FBQ2hCLGdCQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7QUFFMUIsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BFOzs7b0RBRTJCOzs7QUFDeEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO3VCQUFNLE9BQUssa0JBQWtCLEVBQUU7YUFBQSxDQUFDLENBQUM7U0FDdkU7OztnREFFdUI7O0FBRXBCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7NkNBRW9CO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7QUFDMUQsb0JBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVwRyxvQkFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDL0Isd0JBQUksQ0FBQyw2QkFBNkIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDOzs7QUFBQyxBQUc1Rix3QkFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JGLHdCQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3hGO2FBQ0o7U0FDSjs7OytDQUVzQjtBQUNuQixrQkFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkU7OztvREFFMkI7QUFDeEIsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRTdGLG1CQUFPLElBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQztTQUN0Rjs7O29EQUUyQjtBQUN4QixnQkFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEFBQUMsQ0FBQzs7QUFFdEcsbUJBQU8sSUFBSSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1NBQ3RGOzs7OENBRXFCO0FBQ2xCLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGdCQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUMvRCxnQkFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDOzs7QUFBQyxBQUcvRCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzNCLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixnQkFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7QUFFekIsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7QUFDdkMsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7O0FBRXZDLGdCQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDOztBQUUxQyxnQkFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztBQUN6QyxnQkFBSSxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQztBQUM5QyxnQkFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQztBQUMxQyxnQkFBSSxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQztBQUM5QyxnQkFBSSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQzs7QUFFL0MsZ0JBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJOzs7QUFBQyxBQUduQyxnQkFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDOUI7Ozt1REFFOEI7QUFDM0IsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztBQUM3RixnQkFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2pIOzs7NkNBRW9CO0FBQ2pCLGdCQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzs7QUFFM0IsZ0JBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RixnQkFBSSxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNuSCxnQkFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7Ozs7QUFBQyxBQUt2RCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQzs7QUFFaEYsZ0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQztBQUMvRSxnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztBQUM3RSxnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7O0FBRXZELGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFakYsZ0JBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUMzQyxvQkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUM3Qzs7QUFBQSxBQUVELGdCQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN4QixnQkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOztBQUV2QyxnQkFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7O0FBRXBDLGdCQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixnQkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxBQUFDLENBQUM7O0FBRXBGLGdCQUFJLENBQUMsaUNBQWlDLEdBQUcsRUFBRSxDQUFDO0FBQzVDLGdCQUFJLENBQUMsa0NBQWtDLEdBQUcsRUFBRSxDQUFDOztBQUU3QyxpQkFBSyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7QUFDL0Usb0JBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUM7QUFDeEMsd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ3ZDLDRCQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7QUFDeEIscUJBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTO2lCQUN2QyxDQUFDLENBQUM7O0FBRUgsb0JBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hFOztBQUVELGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsMkJBQVcsRUFBRSxLQUFLO0FBQ2xCLHVCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDbEUsd0NBQ08sTUFBTTtBQUNULDZCQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7dUJBQy9GO2lCQUNMLEVBQUUsSUFBSSxDQUFDO0FBQ1Isb0JBQUksRUFBRSxJQUFJLENBQUMsaUNBQWlDO0FBQzVDLDhCQUFjLEVBQUUsSUFBSSxDQUFDLGtDQUFrQztBQUN2RCxnQ0FBZ0IsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUU7QUFDbEQsZ0NBQWdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO2FBQ3JELENBQUMsQ0FBQztTQUNOOzs7MkNBRWtCO0FBQ2YsZ0JBQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFDMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3JDLHVCQUFPO2FBQ1Y7Ozs7QUFBQSxBQUlELGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDL0QsQ0FBQzs7QUFFRixnQkFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztBQUVuRSxvQkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzthQUNyRTs7QUFFRCxnQkFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtBQUN4QixvQkFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7O0FBRXpDLHdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7QUFFM0Qsd0JBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ3pELHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFekQsd0JBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUN4Qyx3QkFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDOztBQUV0Qyx3QkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUMzQzs7QUFFRCxvQkFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTs7QUFFeEIsd0JBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUM7O0FBRW5DLHlCQUFLLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7QUFDNUUsNEJBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOztBQUV2RCw0QkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBQzlGLDRCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0QsNEJBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDOUMsNEJBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFMUQsNEJBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUNyRTs7QUFFRCx3QkFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzFDLHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRXhDLHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUMzRCx3QkFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O0FBRTNELHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKOzs7eUNBRWdCO0FBQ2IsZ0JBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQy9ELHVCQUFPO2FBQ1Y7Ozs7QUFBQSxBQUlELGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDL0QsQ0FBQzs7QUFFRixnQkFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO0FBQzlDLG9CQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDNUM7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7QUFDeEIsb0JBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFOztBQUV6Qyx3QkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRTNELHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUN6RCx3QkFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O0FBRXpELHdCQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDeEMsd0JBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFdEMsd0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDM0M7O0FBRUQsb0JBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7O0FBRXhCLHdCQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFdEUseUJBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUM1RSw0QkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUU3RCw0QkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBQzlGLDRCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0QsNEJBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDOUMsNEJBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFMUQsNEJBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3FCQUN0RTs7QUFFRCx3QkFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzFDLHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRXhDLHdCQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUMzRCx3QkFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O0FBRTNELHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKOzs7OENBRXFCO0FBQ2xCLGdCQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLHFCQUFlLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFBLEFBQUMsQ0FBQzs7QUFFekcsZ0JBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUsscUJBQWUsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDdkcsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUsscUJBQWUsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztBQUMxRyxnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxxQkFBZSxHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7U0FDN0c7Ozt5Q0FFZ0IsS0FBSyxFQUFFO0FBQ3BCLGlCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXZCLGdCQUFJLEFBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQ3RDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFDOUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ25ELHVCQUFPO2FBQ1Y7OztBQUFBLEFBR0QsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTNFLGdCQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLG9CQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNuQixNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7QUFDaEQsb0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO2FBQzNDOztBQUVELGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDOztBQUUzRSxnQkFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDOUIsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDckMsb0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6Qjs7QUFFRCxnQkFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNqQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDbkIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUN4QyxvQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ25DOztBQUVELGdCQUFJLENBQUMsbUJBQW1CLEdBQUssQUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUEsQUFBQyxJQUNoRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUEsQUFBQyxDQUFDOztBQUVqRixnQkFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQy9FLG9CQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ2pGOztBQUVELGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsQUFBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFaEcsZ0JBQUksSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ2hGLG9CQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDbEY7O0FBRUQsZ0JBQUksQ0FBQyxtQkFBbUIsRUFBRTs7QUFBQyxBQUUzQixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDN0IsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7QUFDM0QsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7U0FDOUQ7OzsyQ0FFa0IsS0FBSyxFQUFFOzs7QUFDdEIsZ0JBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtBQUNiLHVCQUFPO2FBQ1Y7O0FBRUQsZ0JBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixnQkFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDOztBQUV0QixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsVUFBVSxFQUFJO0FBQzVDLG9CQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssT0FBSyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7QUFDN0QsaUNBQWEsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDOztBQUVsQywyQkFBTyxVQUFVLENBQUM7aUJBQ3JCOzs7O0FBQUEsQUFJRCxvQkFBTyxhQUFhLEdBQUcsQ0FBQyxJQUNqQixDQUFDLEtBQUssQ0FBQyxPQUFLLG1CQUFtQixDQUFDLElBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLE9BQUssbUJBQW1CLEVBQUU7QUFDNUQsaUNBQWEsR0FBRyxPQUFLLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7aUJBQ25FLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFLLG1CQUFtQixDQUFDLElBQzdCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLE9BQUssbUJBQW1CLEVBQUU7QUFDdkUsaUNBQWEsR0FBRyxPQUFLLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7aUJBQy9EOztBQUVELDZCQUFhLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7O0FBRWxELG9DQUNPLFVBQVU7QUFDYix5QkFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYTttQkFDekM7YUFDTCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDdkMsb0JBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7YUFDakMsTUFBTTtBQUNILG9CQUFJLENBQUMsb0JBQW9CLElBQUksYUFBYSxDQUFDO2FBQzlDOztBQUVELGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsdUJBQU8sRUFBRSxJQUFJO0FBQ2IsZ0NBQWdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO2FBQ3JELEVBQUUsWUFBTTtBQUNMLHVCQUFLLDRCQUE0QixFQUFFOzs7O0FBQUMsQUFJcEMsb0JBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtBQUNuQiwyQkFBSyxnQkFBZ0IsQ0FBQztBQUNsQiw4QkFBTSxFQUFFLGFBQWE7QUFDckIsOEJBQU0sRUFBRSxDQUFDO0FBQ1Qsc0NBQWMsZ0JBQU07cUJBQ3ZCLENBQUMsQ0FBQztpQkFDTjthQUNKLENBQUMsQ0FBQztTQUNOOzs7OENBRXFCLEtBQUssRUFBRTtBQUN6QixnQkFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixvQkFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDOztBQUVsQyxvQkFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7OztBQUFDLEFBR2xHLHNCQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDOzs7QUFBQyxBQUc3RCxxQkFBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN0QztTQUNKOzs7aURBRXdCLEtBQUssRUFBRTtBQUM1QixnQkFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixvQkFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ2xDLG9CQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSTs7O0FBQUMsQUFHaEMsc0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM7OztBQUFDLEFBRzdELHFCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3RDO1NBQ0o7OztpREFFd0IsS0FBSyxFQUFFO0FBQzVCLGdCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLG9CQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDbEMsb0JBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJOzs7QUFBQyxBQUdoQyxzQkFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQzs7O0FBQUMsQUFHN0QscUJBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdEM7U0FDSjs7O3VDQUVjLEtBQUssRUFBRTtBQUNsQixnQkFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixvQkFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7QUFDOUIsd0JBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFM0Qsd0JBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDckM7O0FBRUQsb0JBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQzFCLHdCQUFJLENBQUMsZ0JBQWdCLENBQUM7QUFDbEIsOEJBQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZO0FBQ3pDLDhCQUFNLEVBQUUsQ0FBQztBQUNULHNDQUFjLGdCQUFNO3FCQUN2QixDQUFDLENBQUM7O0FBRUgsd0JBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDckM7O0FBRUQsb0JBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQzFCLHdCQUFJLENBQUMsZ0JBQWdCLENBQUM7QUFDbEIsOEJBQU0sRUFBRSxDQUFDO0FBQ1QsOEJBQU0sRUFBRSxBQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBLEdBQUksSUFBSSxDQUFDLGdCQUFnQixHQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FDcEIsSUFBSSxDQUFDLFdBQVc7QUFDMUIsc0NBQWMsZ0JBQU07cUJBQ3ZCLENBQUMsQ0FBQzs7QUFFSCx3QkFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNyQzthQUNKO1NBQ0o7Ozt3Q0FFZTs7QUFFWixrQkFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVoRSxnQkFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1NBQzlGOzs7dUNBRWMsS0FBSyxFQUFFLGNBQWMsRUFBRTtBQUNsQyxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUMxQixxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDbkQ7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixxQ0FBcUIsRUFBRSxTQUFTLENBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQzFDLENBQUMsUUFBUTthQUNiLENBQUMsQ0FBQztTQUNOOzs7cUNBRVk7OztBQUNULG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUs7QUFDdkMsdUJBQ0ksK0NBQUssR0FBRyxFQUFFLEtBQUssQUFBQztBQUNYLDBCQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsS0FBSyxPQUFLLEtBQUssQ0FBQyxxQkFBcUIsQUFBQztBQUMxRCwyQkFBTyxFQUFFLE9BQUssS0FBSyxDQUFDLE9BQU8sQUFBQztBQUM1Qix3QkFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEFBQUM7QUFDZix3QkFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQUFBQztBQUM3QixxQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEFBQUM7QUFDVCw4QkFBVSxFQUFFLE9BQUssY0FBYyxBQUFDO0FBQ2hDLGtDQUFjLEVBQUUsT0FBSyxLQUFLLENBQUMsY0FBYyxBQUFDLEdBQUcsQ0FDcEQ7YUFDTCxDQUFDLENBQUM7U0FDTjs7O3FDQUVZO0FBQ1QsbUJBQ0k7O2tCQUFLLEdBQUcsRUFBQyxNQUFNO0FBQ1YsNkJBQVMsRUFBQyxlQUFlO2dCQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFO2FBQ2hCLENBQ1I7U0FDTDs7O2lEQUV3QixNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3BDLGdCQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbEIsdUJBQ0ksdUNBQUssU0FBUyxFQUFDLG9DQUFvQztBQUM5Qyx5Q0FBbUIsS0FBSyxBQUFDO0FBQ3pCLCtCQUFXLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixBQUFDLEdBQUcsQ0FDbEQ7YUFDTDtTQUNKOzs7cUNBRVk7OztBQUNULGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDekIsdUJBQ0k7O3NCQUFLLEdBQUcsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLGlCQUFpQjtvQkFDdkM7OzBCQUFLLFNBQVMsRUFBQyxrQ0FBa0M7d0JBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUs7QUFDdkMsbUNBQ0k7O2tDQUFLLEdBQUcsRUFBRSxLQUFLLEFBQUM7QUFDWCw2Q0FBUyxFQUFDLG9DQUFvQztBQUM5Qyx5Q0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUMsQUFBQztnQ0FDeEU7O3NDQUFLLFNBQVMsRUFBQyxxQkFBcUI7b0NBQ2hDOzswQ0FBTSxTQUFTLEVBQUMsMEJBQTBCO3dDQUFFLE1BQU0sQ0FBQyxLQUFLO3FDQUFRO2lDQUM5RDtnQ0FFTCxPQUFLLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7NkJBQzNDLENBQ1I7eUJBQ0wsQ0FBQztxQkFDQTtpQkFDSixDQUNSO2FBQ0w7U0FDSjs7OzJDQUVrQjtBQUNmLG1CQUNJOzs7Z0JBQ0k7O3NCQUFLLEdBQUcsRUFBQyxXQUFXO0FBQ2YsaUNBQVMsRUFBQyxxQkFBcUI7QUFDL0IsbUNBQVcsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEFBQUM7b0JBQzVDLHVDQUFLLEdBQUcsRUFBQyxjQUFjO0FBQ2xCLGlDQUFTLEVBQUMseUJBQXlCO0FBQ25DLDZCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQyxBQUFDLEdBQUc7aUJBQ2xEO2dCQUNOOztzQkFBSyxTQUFTLEVBQUMscUJBQXFCO0FBQy9CLG1DQUFXLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixBQUFDO29CQUM1Qyx1Q0FBSyxHQUFHLEVBQUMsY0FBYztBQUNsQixpQ0FBUyxFQUFDLHlCQUF5QjtBQUNuQyw2QkFBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsQUFBQyxHQUFHO2lCQUNuRDthQUNKLENBQ1I7U0FDTDs7O3dDQUVlLEtBQUssRUFBRTs7O0FBQ25CLGdCQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQzs7QUFFdkcsZ0JBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUNyQixvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLG9DQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN6RSx5Q0FBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7aUJBQ3RELENBQUMsQ0FBQzs7QUFFSCxvQkFDTyxBQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUMzRCxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVc7QUFBQyxrQkFDL0g7O0FBQ0UsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQixrQ0FBTSxFQUFFLENBQUM7QUFDVCxrQ0FBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSztBQUNoQywwQ0FBYyxnQkFBTTt5QkFDdkIsQ0FBQyxDQUFDO3FCQUNOO2FBQ0osTUFBTSxJQUFPLEFBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUNwRCxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsRUFBRTs7Ozs7QUFLcEYsb0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQiwwQkFBTSxFQUFFLENBQUM7QUFDVCwwQkFBTSxFQUFFLENBQUksQUFBSyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFDM0QsQ0FBSyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQSxHQUM1RCxLQUFLLENBQUEsR0FBSSxJQUFJLENBQUMsV0FBVztBQUNwQyxrQ0FBYyxnQkFBTTtpQkFDdkIsQ0FBQzs7O0FBQUMsQUFHSCxzQkFBTSxDQUFDLHFCQUFxQixDQUFDOzJCQUFNLE9BQUssZUFBZSxDQUFDLEtBQUssQ0FBQztpQkFBQSxDQUFDLENBQUM7YUFDbkU7O0FBRUQsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzlCOzs7Z0RBRXVCOzs7QUFDcEIsZ0JBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFFdkcsZ0JBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO0FBQzdCLG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysb0NBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQy9DLCtCQUFVLE1BQU0sQ0FBQyxLQUFLLFVBQUssT0FBSyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFHO3FCQUNqRixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDaEIsQ0FBQyxDQUFDO2FBQ047U0FDSjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssU0FBUztBQUNWLHdCQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssT0FBTztBQUNSLHdCQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUM3Qix5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUM1QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtTQUNKOzs7NkNBRW9CO0FBQ2pCLG1CQUNJOztrQkFBSyxHQUFHLEVBQUMsTUFBTTtBQUNWLDZCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDckMsaUNBQVUsUUFBUTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7YUFDMUIsQ0FDUjtTQUNMOzs7aUNBRVE7QUFDTCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDO0FBQ3RELDZCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQztBQUM5QiwrQkFBVyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7QUFDakMsMkJBQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDL0IsNEJBQVEsRUFBQyxHQUFHO2dCQUNiOztzQkFBSyxHQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUMsVUFBVTtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRTtpQkFDaEI7Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7YUFDdEIsQ0FDUjtTQUNMOzs7V0F4cUJDLE9BQU87OztBQTJxQmIsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNoQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDNUIsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixlQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDL0IsaUJBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsYUFBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0tBQ2hDLENBQUMsQ0FDTDtBQUNELFVBQU0sRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsaUJBQWEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDNUIsYUFBUyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQ3BDLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixhQUFTLEVBQUUsRUFBRTtBQUNiLFdBQU8sRUFBRSxFQUFFO0FBQ1gsVUFBTSxnQkFBTTtBQUNaLGtCQUFjLEVBQUUsY0FBYztBQUM5QixhQUFTLEVBQUUsQ0FBQztDQUNmLENBQUM7O2tCQUVhLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMzdUJoQixVQUFVO2NBQVYsVUFBVTs7QUFDWixhQURFLFVBQVUsR0FDUzs7OzhCQURuQixVQUFVOzswQ0FDRyxJQUFJO0FBQUosZ0JBQUk7OztvR0FEakIsVUFBVSxtREFFQyxJQUFJOztBQUViLGNBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksT0FBTSxDQUFDO0FBQy9DLGNBQUssV0FBVyw0Q0FBcUIsSUFBSSxDQUFDLENBQUM7O0tBQzlDOztpQkFOQyxVQUFVOzt1Q0FRRztBQUNYLG1CQUFPO0FBQ0gsb0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDeEIsQ0FBQztTQUNMOzs7OENBRXFCLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDeEMsbUJBQVUsU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFDbEMsU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFDbEMsU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFDbEMsU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFDeEMsU0FBUyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxQzs7O2tEQUV5QixTQUFTLEVBQUU7QUFDakMsZ0JBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNwQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzQztTQUNKOzs7b0RBRTJCO0FBQ3hCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sRUFBRTtBQUNwQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsU0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQy9ELHdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUM3Qiw0QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO3FCQUNoQztBQUFBLGlCQUNKLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKOzs7NENBRW1CO0FBQ2hCLGdCQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNwQzs7OzZDQUVvQjtBQUNqQixnQkFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDcEM7OztvQ0FFVyxLQUFLLEVBQUU7QUFDZixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN2QixxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRDtTQUNKOzs7c0NBRWE7OztBQUNWLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sS0FBSyxLQUFLLEVBQUU7QUFDakUsdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVSxFQUFLO0FBQzFDLDJCQUNJLGdEQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsT0FBTyxBQUFDO0FBQ3hCLCtCQUFPLEVBQUUsT0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQUFBQztBQUM3Qyw2QkFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEFBQUM7QUFDeEIsa0NBQVUsRUFBRSxPQUFLLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDdEMsMkJBQUcsRUFBRSxPQUFLLEtBQUssQ0FBQyxJQUFJLEFBQUMsR0FBRyxDQUNoQztpQkFDTCxDQUFDLENBQUM7YUFDTjtTQUNKOzs7aUNBRVE7QUFDTCxtQkFDSTs7a0JBQUssU0FBUyxFQUNKLGNBQWMsSUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQSxBQUFDLElBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sR0FBRyx1QkFBdUIsR0FBRyxFQUFFLENBQUEsQUFBQyxJQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsR0FBRyxFQUFFLENBQUEsQUFBQyxBQUNyRDtBQUNELHlCQUFLLDJDQUFvQixtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUU7QUFDMUUsMkJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBaEZDLFVBQVU7OztBQW1GaEIsVUFBVSxDQUFDLFNBQVMsR0FBRztBQUNuQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUs7QUFDOUIsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFCLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxLQUFDLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDNUIsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZ6QixJQUFNLEtBQUssR0FBRyxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUM1QyxXQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQixDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQzFDLFdBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7QUFFRixJQUFNLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFDLFNBQVMsRUFBbUI7c0NBQWQsWUFBWTtBQUFaLG9CQUFZOzs7QUFDcEUsV0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUM5QyxlQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7SUFFSSxnQkFBZ0I7Y0FBaEIsZ0JBQWdCOzthQUFoQixnQkFBZ0I7OEJBQWhCLGdCQUFnQjs7c0VBQWhCLGdCQUFnQjs7O2lCQUFoQixnQkFBZ0I7O3VDQUNIO0FBQ1gsbUJBQU87QUFDSCw4Q0FBOEIsRUFBRSxFQUFFO0FBQ2xDLHNDQUFzQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQzthQUM5RSxDQUFDO1NBQ0w7OzsyQ0FFa0IsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUNyQyxnQkFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLHNCQUFzQixDQUFDO0FBQ3ZELGdCQUFJLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQztBQUN2RSxnQkFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztBQUN2RCxnQkFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDOztBQUV2RSxnQkFBSSxlQUFlLEtBQUssY0FBYyxFQUFFO0FBQ3BDLG9CQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUM1Qzs7QUFFRCxnQkFBSSx1QkFBdUIsS0FBSyxzQkFBc0IsRUFBRTs7QUFDcEQsb0JBQUksc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNyQywyQkFBTztpQkFDVixNQUFNLElBQU8sc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsSUFDbkMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxDQUFDLGdDQUFBLEVBQWtDO0FBQ3BHLDRCQUFJLENBQUMsSUFBSSxZQUFVLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQzNELE1BQU0sSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxJQUFJLENBQUMsdUJBQXVCLENBQUMsaUNBQUEsRUFBbUM7QUFDeEcsNEJBQUksQ0FBQyxJQUFJLFlBQVUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDOUQ7YUFDSjtTQUNKOzs7Ozs7Ozs7Ozs7OztpQ0FXUSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTs7O0FBQ3BDLGdCQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDbkUsdUJBQU8sT0FBSyxLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2hFLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQzs7QUFFM0Ysc0JBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMvQyxzQkFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsRDs7Ozs7Ozs7Ozs7Ozs7c0NBV3NGO2dCQUEzRSxLQUFLLHlEQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCO2dCQUFFLFVBQVU7Z0JBQUUsVUFBVTs7QUFDakYsZ0JBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXZELGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysc0NBQXNCLEVBQUUsT0FBTyxtQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQiw0QkFBSyxPQUFPLEdBQUM7QUFDOUUsOENBQThCLEVBQUUsT0FBTyxtQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4Qiw0QkFBSyxPQUFPLEdBQUM7YUFDakcsQ0FBQyxDQUFDOztBQUVILHNCQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDL0Msc0JBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEQ7Ozt5Q0FFZ0IsS0FBSyxFQUFFO0FBQ3BCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsOEJBQThCLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzs7QUFFcEQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3JELHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QztTQUNKOzs7NENBRW1CLE1BQU0sRUFBRTtBQUN4QixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztBQUN6RCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7QUFFaEQsZ0JBQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQ3JCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDdkM7QUFBTyxhQUNWOztBQUVELGdCQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztBQUN2QixvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNsRCxDQUFDLENBQUM7YUFDTixNQUFNOztBQUNILG9CQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFbEUsb0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixrREFBOEIsRUFBRSxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7aUJBQzlGLENBQUMsQ0FBQzthQUNOO1NBQ0o7Ozt3Q0FFZSxNQUFNLEVBQUU7QUFDcEIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUM7QUFDekQsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7O0FBRWhELGdCQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3ZCLHVCQUFPO2FBQ1Y7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNsQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLEVBQUU7aUJBQ3JDLENBQUMsQ0FBQzs7QUFFSCxvQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDcEMsTUFBTTtBQUNILG9CQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFN0Qsb0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixrREFBOEIsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztpQkFDcEYsQ0FBQyxDQUFDO2FBQ047U0FDSjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxZQUFZO0FBQ2Isd0JBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLDBCQUFNOztBQUFBLEFBRVYscUJBQUssV0FBVztBQUNaLHdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFFO0FBQ2xELDZCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsNEJBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7QUFFbkIsNEJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUNwQzs7QUFFRCwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDNUMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7U0FDSjs7OzhDQUVxQixLQUFLLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7Ozt5Q0FFZ0IsS0FBSyxFQUFFO0FBQ3BCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO0FBQzNCLHVCQUNJLHVDQUFLLFNBQVMsRUFBQywyQkFBMkI7QUFDckMsMkJBQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQUFBQyxHQUFHLENBQ2hFO2FBQ0w7U0FDSjs7OzBDQUVpQixLQUFLLEVBQUU7QUFDckIsZ0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN6RCxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTjtTQUNKOzs7MkNBRWtCLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDN0Isb0JBQVEsS0FBSyxDQUFDLEdBQUc7QUFDakIscUJBQUssT0FBTyxDQUFDO0FBQ2IscUJBQUssT0FBTztBQUNSLHdCQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFBQSxhQUNqQztTQUNKOzs7dUNBRWM7OztBQUNYLG1CQUNJOztrQkFBSyxTQUFTLEVBQUMsc0JBQXNCO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUM1QywyQkFDSTs7MEJBQUssR0FBRyxhQUFXLEtBQUssQUFBRztBQUN0QiwrQkFBRyxFQUFFLEtBQUssQUFBQztBQUNYLHFDQUFTLEVBQUUsMEJBQUc7QUFDWCxxREFBcUIsRUFBRSxJQUFJO0FBQzNCLDhEQUE4QixFQUFFLE9BQUssS0FBSyxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ2pHLENBQUMsQUFBQztBQUNILG1DQUFPLEVBQUUsT0FBSyxpQkFBaUIsQ0FBQyxJQUFJLFNBQU8sS0FBSyxDQUFDLEFBQUM7QUFDbEQscUNBQVMsRUFBRSxPQUFLLGtCQUFrQixDQUFDLElBQUksU0FBTyxLQUFLLENBQUMsQUFBQztBQUNyRCxvQ0FBUSxFQUFDLEdBQUc7d0JBQ1osT0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7d0JBQy9CLE9BQUssZ0JBQWdCLENBQUMsS0FBSyxDQUFDO3FCQUMzQixDQUNSO2lCQUNMLENBQUM7YUFDQSxDQUNSO1NBQ0w7OztpQ0FFUTs7O0FBQ0wsZ0JBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQWlCLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHLEVBQUs7QUFDL0UscUJBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFN0IsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRVAsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNQLCtDQUF1QixFQUFFLElBQUk7dUJBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsQUFBQztBQUNILDZCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7Z0JBQ3pDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBRXBCLHVFQUFzQixXQUFXO0FBQ2YsdUJBQUcsRUFBQyxXQUFXO0FBQ2YsNkJBQVMsRUFBQyxlQUFlO0FBQ3pCLG9DQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQzNDLDJCQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUMxQyxnREFBNEIsRUFBRSxJQUFJLEFBQUMsSUFBRzthQUN0RCxDQUNSO1NBQ0w7OztXQXRPQyxnQkFBZ0I7OztBQXlPdEIsZ0JBQWdCLENBQUMsU0FBUyxnQkFDbkIsMkJBQWlCLFNBQVM7QUFDN0IsaUNBQTZCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQzlFLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtFQUN2QyxDQUFDOztBQUVGLGdCQUFnQixDQUFDLFlBQVksZ0JBQ3RCLDJCQUFpQixZQUFZO0FBQ2hDLGlDQUE2QixFQUFFLEVBQUU7QUFDakMsaUJBQWEsZ0JBQU07QUFDbkIsa0JBQWMsRUFBRSxJQUFJO0VBQ3ZCLENBQUM7O2tCQUVhLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2UXpCLFNBQVM7Y0FBVCxTQUFTOzthQUFULFNBQVM7OEJBQVQsU0FBUzs7c0VBQVQsU0FBUzs7O2lCQUFULFNBQVM7O2lDQUNGO0FBQ0wsZ0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDOztBQUVyQyxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCw2QkFBUyxFQUFFO0FBQ1Asb0NBQVksRUFBRSxJQUFJO0FBQ2xCLG1EQUEyQixFQUFFLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDbEUsbURBQTJCLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUNsRSxvREFBNEIsRUFBRSxRQUFRLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNO0FBQ3BFLG1EQUEyQixFQUFFLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUs7dUJBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsQUFBQztBQUNILG9DQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxBQUFDO0FBQzlCLGtDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7Z0JBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUNsQixDQUNSO1NBQ0w7OztXQW5CQyxTQUFTOzs7QUFzQmYsU0FBUyxDQUFDLFFBQVEsR0FBRztBQUNqQixTQUFLLEVBQUUsT0FBTztBQUNkLFNBQUssRUFBRSxPQUFPO0FBQ2QsVUFBTSxFQUFFLFFBQVE7QUFDaEIsU0FBSyxFQUFFLE9BQU87Q0FDakIsQ0FBQzs7QUFFRixTQUFTLENBQUMsU0FBUyxHQUFHO0FBQ2xCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hFLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUMvQixDQUFDOztBQUVGLFNBQVMsQ0FBQyxZQUFZLEdBQUc7QUFDckIsWUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztDQUNyQyxDQUFDOztrQkFFYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNyQ2xCLGdCQUFnQjtjQUFoQixnQkFBZ0I7O2FBQWhCLGdCQUFnQjs4QkFBaEIsZ0JBQWdCOztzRUFBaEIsZ0JBQWdCOzs7aUJBQWhCLGdCQUFnQjs7dUNBQ0g7QUFDWCxtQkFBTztBQUNILGtDQUFrQixFQUFFLEVBQUU7QUFDdEIsbUNBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLGtCQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNmLHlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO2FBQ3JDLENBQUM7U0FDTDs7OzZDQUVvQjtBQUNqQixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUN6QixvQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1NBQ0o7OztrREFFeUIsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDNUMsb0JBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7OztnREFFdUI7QUFDcEIsZ0JBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFbkUsbUJBQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3BDOzs7NkNBRW9CO0FBQ2pCLG1CQUNJOztrQkFBSyxHQUFHLEVBQUMsTUFBTTtBQUNWLHNCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDbEIsNkJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQztBQUNyQyxpQ0FBVSxRQUFRO2dCQUNsQixJQUFJLENBQUMscUJBQXFCLEVBQUU7YUFDM0IsQ0FDUjtTQUNMOzs7cUNBRVk7QUFDVCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQixvQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDdEMsb0JBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3pDLG9CQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLG9CQUFPLEdBQUcsSUFDSCxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1RCw2QkFBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNoRTs7QUFFRCx1QkFDSSxvREFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDeEIsdUJBQUcsRUFBQyxNQUFNO0FBQ1Ysd0JBQUksRUFBQyxNQUFNO0FBQ1gsNkJBQVMsRUFBRTtBQUNQLDJDQUFtQixFQUFFLElBQUk7dUJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUNwRSxBQUFDO0FBQ0gseUJBQUssRUFBRSxTQUFTLEFBQUM7QUFDakIsNEJBQVEsRUFBRSxJQUFJLEFBQUM7QUFDZiw0QkFBUSxFQUFDLElBQUksSUFBRyxDQUN6QjthQUNMO1NBQ0o7Ozt5Q0FFZ0IsS0FBSyxFQUFFOzs7QUFDcEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUMsRUFBRTt1QkFBTSxPQUFLLDBCQUEwQixFQUFFO2FBQUEsQ0FBQyxDQUFDO1NBQ3hGOzs7MkNBRWtCLGFBQWEsRUFBRSxTQUFTLEVBQUU7QUFDekMsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDckIsdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hEOztBQUVELGdCQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDMUMsZ0JBQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEUsZ0JBQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDOztBQUUvQyxtQkFBTyxDQUNIOztrQkFBTSxHQUFHLEVBQUMsR0FBRztnQkFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7YUFBUSxFQUN6RDs7a0JBQU0sR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsOEJBQThCO2dCQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzthQUFRLEVBQ3pHOztrQkFBTSxHQUFHLEVBQUMsR0FBRztnQkFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUFRLENBQ3ZELENBQUM7U0FDTDs7O3dDQUVlOzs7QUFDWixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtBQUN0Qyx1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7QUFDaEMsMkJBQUcsRUFBQyxTQUFTO0FBQ2IsaUNBQVMsRUFBRTtBQUNQLHdEQUE0QixFQUFFLElBQUk7MkJBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFDcEYsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN4Qyw0QkFBTSxNQUFNLEdBQUcsT0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUxQywrQkFDSTs7eUNBQVMsTUFBTTtBQUNWLHlDQUFTLEVBQUU7QUFDUCx3REFBb0IsRUFBRSxJQUFJO0FBQzFCLGlFQUE2QixFQUFFLE9BQUssS0FBSyxDQUFDLG1CQUFtQixLQUFLLEtBQUs7bUNBQ3RFLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQ3hDLEFBQUM7QUFDSCxtQ0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEFBQUM7QUFDakIsdUNBQU8sRUFBRSxPQUFLLGdCQUFnQixDQUFDLElBQUksU0FBTyxLQUFLLENBQUMsQUFBQzs0QkFDakQsT0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQUssS0FBSyxDQUFDLFNBQVMsQ0FBQzt5QkFDekQsQ0FDUjtxQkFDTCxDQUFDO2lCQUNBLENBQ1I7YUFDTDtTQUNKOzs7b0NBRVcsS0FBSyxFQUFFO0FBQ2YsZ0JBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7QUFDOUMsZ0JBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDcEMsZ0JBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7QUFFeEUsZ0JBQUksWUFBWSxFQUFFO0FBQ2Qsb0JBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtBQUNmLDZCQUFTLEdBQUcsWUFBWSxHQUFHLENBQUM7QUFBQyxpQkFDaEMsTUFBTSxJQUFJLFNBQVMsSUFBSSxZQUFZLEVBQUU7QUFDbEMsaUNBQVMsR0FBRyxDQUFDO0FBQUMscUJBQ2pCOztBQUVELG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RDtTQUNKOzs7dUNBRWM7QUFDWCxnQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLG1DQUFtQixFQUFFLENBQUMsQ0FBQztBQUN2QixrQ0FBa0IsRUFBRSxFQUFFO2FBQ3pCLENBQUMsQ0FBQztTQUNOOzs7dUNBRWM7QUFDWCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMxQjs7O3FDQUVZO0FBQ1QsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMvQjs7O2lDQUVRLFFBQVEsRUFBRTtBQUNmLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQzs7QUFFckMsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUN2QyxnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7Ozs2Q0FFb0I7QUFDakIsZ0JBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7QUFFakMsbUJBQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDL0Y7OztxREFFNEI7QUFDekIsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUU1RCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFO0FBQ3pDLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3JCLE1BQU07QUFDSCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7OztzQ0FFYSxLQUFLLEVBQUU7QUFDakIsb0JBQVEsS0FBSyxDQUFDLEdBQUc7QUFDakIscUJBQUssV0FBVztBQUNaLHdCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtBQUNqQyw2QkFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO3FCQUMzQjs7QUFFRCwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLEtBQUssQ0FBQztBQUNYLHFCQUFLLFlBQVk7QUFDYix3QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxJQUNyQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDekMsNkJBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkMsNEJBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO3FCQUNyQzs7QUFFRCwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFNBQVM7QUFDVix5QkFBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7QUFBQyxBQUNuQyx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLHdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxXQUFXO0FBQ1oseUJBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO0FBQUMsQUFDbkMsd0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsd0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQiwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVE7QUFDVCx3QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxJQUNyQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6Qyw0QkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3FCQUN2Qjs7QUFFRCwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLE9BQU87QUFDUix3QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxJQUNyQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6Qyw2QkFBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQyw0QkFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7cUJBQ3JDLE1BQU07QUFDSCw0QkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDL0M7O0FBRUQsMEJBQU07QUFBQSxhQUNUOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7Ozs7Ozt3Q0FHZSxZQUFZLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQ3RCLHVCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN2RDs7QUFFRCxnQkFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUU3QyxtQkFBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzdELHVCQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sR0FBSSxNQUFNLENBQUM7YUFDdkcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNWOzs7eUNBRThDO2dCQUFoQyxRQUFRLHlEQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTs7QUFDekMsZ0JBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQzFDLGdCQUFNLE9BQU8sR0FBRyxZQUFZLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFeEYsZ0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixtQ0FBbUIsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckQsa0NBQWtCLEVBQUUsT0FBTzthQUM5QixDQUFDLENBQUM7U0FDTjs7O29DQUVXLEtBQUssRUFBRTs7O0FBQ2YsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsRUFBRTt1QkFBTSxPQUFLLGNBQWMsRUFBRTthQUFBLENBQUMsQ0FBQzs7QUFFNUUsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDcEIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7O0FBRUQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3JELHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QztTQUNKOzs7aUNBRVE7QUFDTCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsOENBQXNCLEVBQUUsSUFBSTt1QkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztnQkFDekMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUVsQixvREFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsdUJBQUcsRUFBQyxPQUFPO0FBQ1gsNkJBQVMsRUFBRTtBQUNQLHNDQUFjLEVBQUUsSUFBSTt1QkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQ3RFLEFBQUM7QUFDSCxnQ0FBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQUFBQztBQUM1RSx3QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQUFBQztBQUNwRCx3QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxNQUFNLEFBQUM7QUFDOUQscUNBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDN0IsMkJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQyxJQUFHO2dCQUU5QyxJQUFJLENBQUMsYUFBYSxFQUFFO2FBQ25CLENBQ1I7U0FDTDs7O1dBcFNDLGdCQUFnQjs7O0FBdVN0QixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUc7QUFDekIsZ0NBQTRCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEQsZ0JBQVksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNwQyxZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDN0IsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixZQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07S0FDL0IsQ0FBQyxDQUNMO0FBQ0QsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFCLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixxQkFBaUIsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN6QyxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDNUIsa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN0QyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLG9CQUFnQixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUMvQixDQUFDOztBQUVGLGdCQUFnQixDQUFDLFlBQVksR0FBRztBQUM1QixnQ0FBNEIsRUFBRSxLQUFLO0FBQ25DLGdCQUFZLEVBQUUsRUFBRTtBQUNoQixZQUFRLEVBQUUsRUFBRTtBQUNaLGFBQVMsRUFBRSxFQUFFO0FBQ2IsY0FBVSxFQUFFLEVBQUU7QUFDZCxxQkFBaUIsRUFBRSxFQUFFO0FBQ3JCLGtCQUFjLEVBQUUsY0FBYztBQUM5QixjQUFVLGdCQUFNO0FBQ2hCLG9CQUFnQixnQkFBTTtDQUN6QixDQUFDOztrQkFFYSxnQkFBZ0I7Ozs7Ozs7O2tCQy9VUCxJQUFJOzs7OztBQUFiLFNBQVMsSUFBSSxHQUFHLEVBQUU7Ozs7Ozs7O2tCQ0lULG9CQUFvQjtBQVI1QyxJQUFNLFlBQVksR0FBRyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUNuRCxXQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNqRCxDQUFDOztBQUVGLElBQU0saUJBQWlCLEdBQUcsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO0FBQ2pFLFdBQU8sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDM0U7O0FBQUMsQUFFYSxTQUFTLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDL0MsUUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBTyxJQUFJLENBQUM7S0FDZjs7QUFFRCxRQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTdCLFFBQVEsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFBQSxRQUN4QixJQUFJLEtBQUssaUJBQWlCLElBQUksSUFBSSxLQUFLLGdCQUFnQixBQUFDLEVBQUU7O0FBQzlELGVBQU8sS0FBSyxDQUFDO0tBQ2hCOztBQUVELFFBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO0FBQzVCLGVBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbkc7O0FBRUQsV0FBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQUUsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUUsQ0FBQyxJQUMxRCxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQUUsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUUsQ0FBQyxDQUFDO0NBQ3hFOzs7Ozs7Ozs7Ozs7Ozs7a0JDbkJjLENBQUMsU0FBUyx1QkFBdUIsR0FBRztBQUMvQyxRQUFJLEtBQUssR0FBRyxDQUNSLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLFlBQVksRUFDWixhQUFhLENBQ2hCLENBQUM7O0FBRUYsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QyxZQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTtBQUM1QyxtQkFBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7S0FDSjs7QUFFRCxXQUFPLEtBQUssQ0FBQztDQUNoQixDQUFBLEVBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1pFLE1BQU07WUFBTixNQUFNOzs7Ozs7QUFJUixXQUpFLE1BQU0sR0FJYTs7OzBCQUpuQixNQUFNOztzQ0FJTyxJQUFJO0FBQUosVUFBSTs7O2dHQUpqQixNQUFNLG1EQUtLLElBQUk7O0FBRWIsVUFBSyxLQUFLLEdBQUcsTUFBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUM7O0dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtlQVJDLE1BQU07OzBDQXVCYyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3hDLGFBQU8sQ0FBQyw0QkFBYSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsNEJBQWEsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2Rjs7Ozs7Ozs7Ozs7OzJCQVNNOztBQUVILGFBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFBLENBQUUsT0FBTyxDQUFDLFFBQVEsRUFBQyxVQUFBLENBQUM7ZUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsRUFBRSxDQUFDO09BQUEsQ0FBQzs7QUFBQyxLQUVuRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXRDQyxNQUFNO0dBQVMsZ0JBQU0sU0FBUzs7a0JBd0RyQixNQUFNOzs7QUNuRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0NBLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVsQixNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2IsWUFBUSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDakUsY0FBVSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDdkUsbUJBQWUsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDdEYsWUFBUSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDakUsZ0JBQVksRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDN0UsV0FBTyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDOUQsVUFBTSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDM0QsV0FBTyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDOUQsYUFBUyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDcEUsY0FBVSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDdkUsMkJBQXVCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDOUcsV0FBTyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDOUQsc0JBQWtCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDL0YsV0FBTyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDOUQsb0JBQWdCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDekYsYUFBUyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDcEUsb0JBQWdCLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEFBQUM7QUFDekYsVUFBTSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEFBQUM7Q0FDOUQsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHRvZ2dsZVN0YXRlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlCdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICAgIG9uQ2xpY2s6IG5vb3AsXG4gICAgb25QcmVzc2VkOiBub29wLFxuICAgIG9uVW5wcmVzc2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlCdXR0b247XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBhcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKCkgeyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5uYW1lKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgbGV0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BjYl9pdGVtLm5hbWVgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGxldCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cyA9IHtcbiAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcbiAgICBvbkFsbENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQWxsVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RBbGxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RBbGxMYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgIF0pLFxufTtcblxuVUlDaGVja2JveEdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG4gICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgc2VsZWN0QWxsUHJvcHM6IHt9LFxuICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94R3JvdXA7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlclVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICAgICAgYm9keVVVSUQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrID0gdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVGb2N1cyA9IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmRpYWxvZy5jb250YWlucyhub2RlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrKG5hdGl2ZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmb290ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hlYWRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgdGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuVUlEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHlQcm9wczoge30sXG4gICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICBoZWFkZXJQcm9wczoge30sXG4gICAgb25DbG9zZTogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRGlhbG9nO1xuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlID0gdGhpcy5yZXNjYWxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIHJlc2NhbGUoKSB7XG4gICAgICAgIGxldCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGxldCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcbiAgICAgICAgbGV0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgICAgICBpZiAoICAgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIGxldCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgICAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gTWF0aC5taW4odGhpcy5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlGaXR0ZWRUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbn07XG5cblVJRml0dGVkVGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlGaXR0ZWRUZXh0O1xuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZyB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBhbHQ9e251bGx9XG4gICAgICAgICAgICAgICAgIHNyYz17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlJbWFnZS5zdGF0dXMgPSB7XG4gICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5VSUltYWdlLnByb3BUeXBlcyA9IHtcbiAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlJbWFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2VQcm9wczoge30sXG4gICAgc3RhdHVzUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlJbWFnZTtcbiIsIi8qKlxuICogQSBnZW5lcmljIGxpc3Qgdmlldywgc3VwcG9ydGluZyB1bnN0eWxlZCwgYnVsbGV0ZWQgYW5kIG51bWJlcmVkIG91dHB1dC5cbiAqIEBjbGFzcyBVSUxpc3RcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzW2BpdGVtXyR7aW5kZXh9YF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0SXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzSXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLml0ZW1zO1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5zdGF0ZS5hY3RpdmVJdGVtO1xuXG4gICAgICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dEl0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHByZXYgPSAoKSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzSXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoa2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gaXRlbXMuaW5kZXhPZihhY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUl0ZW1JbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXYoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUl0ZW1JbmRleCAhPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgcHJldigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZVR5cGUgPSB0aGlzLnByb3BzLnR5cGUgPyAnbGknIDogJ3NwYW4nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgICByZWY6IGBpdGVtXyR7aW5kZXh9YCxcbiAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogKCkgPT4gdGhpcy5zdGF0ZS5hY3RpdmVJdGVtID09PSBpdGVtICYmIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUl0ZW06IG51bGx9KSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiAoKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBpdGVtfSksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGl0ZW0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgbm9kZVR5cGUgPSAnZGl2JztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICBjYXNlICdidWxsZXQnOlxuICAgICAgICAgICAgbm9kZVR5cGUgPSAndWwnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ29sJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICByZWY6ICdsaXN0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICd1aS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1idWxsZXRlZCc6IHRoaXMucHJvcHMudHlwZSA9PT0gJ2J1bGxldCcsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtbnVtYmVyZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LXBsYWluJzogdGhpcy5wcm9wcy50eXBlICE9PSAnYnVsbGV0JyAmJiB0aGlzLnByb3BzLnR5cGUgIT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5yZW5kZXJDb250ZW50KCksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuVUlMaXN0LnByb3BUeXBlcyA9IHtcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm5vZGUpLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2J1bGxldCcsICdudW1iZXInXSksXG59O1xuXG5VSUxpc3QuZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJTGlzdDtcbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlNb2RhbCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkaWFsb2dTcGVjaWZpY1Byb3BzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKS5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSB0aGlzLnByb3BzW2tleV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWFzaydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nIHsuLi5kaWFsb2dTcGVjaWZpY1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJTW9kYWwucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBtYXNrUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICBtYXNrUHJvcHM6IHt9LFxuICAgIG1vZGFsUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlNb2RhbDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG4vKlxuICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgbmV2ZXIgY2hhbmdlcy4gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgYGNvbXBvbmVudERpZFVwZGF0ZWAgYWZ0ZXIgYHNldFN0YXRlYCB0byB0cmlnZ2VyXG4gICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbiA9IHRoaXMuYWxpZ24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgYW5jaG9ySGVpZ2h0ID0gYW5jaG9yLm9mZnNldEhlaWdodDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9IGVsc2UgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgKCkgPT4gdGhpcy5jb21wb25lbnREaWRVcGRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5ub2RlLCB4LCB5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUG9wb3Zlci5wb3NpdGlvbiA9IHtcbiAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICBNSURETEU6ICdNSURETEUnLFxuICAgIEVORDogJ0VORCcsXG59O1xuXG5VSVBvcG92ZXIucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICBhbmNob3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGFuY2hvclhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGFuY2hvcllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxufTtcblxuVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBvcG92ZXI7XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG59O1xuXG5VSVByb2dyZXNzLnByb3BUeXBlcyA9IHtcbiAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgXSksXG4gICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzcztcbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgIG9uRXhwYW5kOiBub29wLFxuICAgIG9uSGlkZTogbm9vcCxcbiAgICB0b2dnbGVQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVJhZGlvIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlSYWRpby5wcm9wVHlwZXMgPSB7XG4gICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5VSVJhZGlvLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBvblNlbGVjdGVkOiBub29wLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUmFkaW87XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjdXJyZW50VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZUJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gb3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gMCA6IC0xfVxuICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L1VJQnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMgPSB7XG4gICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uczogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWlzc2luZ1ZhbHVlID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoISgndmFsdWUnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cblVJU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJU2VnbWVudGVkQ29udHJvbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5cbmNsYXNzIFVJVGFibGVDZWxsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICByZXR1cm4gICAgbmV4dFByb3BzLmNvbnRlbnQgIT09IHRoaXMucHJvcHMuY29udGVudFxuICAgICAgICAgICAgICAgfHwgbmV4dFByb3BzLndpZHRoICE9PSB0aGlzLnByb3BzLndpZHRoXG4gICAgICAgICAgICAgICB8fCBuZXh0UHJvcHMucm93ICE9PSB0aGlzLnByb3BzLnJvdztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMucHJvcHMucm93LCB0aGlzLnByb3BzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57dGhpcy5wcm9wcy5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZW50O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsJ1xuICAgICAgICAgICAgICAgICB0aXRsZT17dHlwZW9mIHRoaXMucHJvcHMuY29udGVudCA9PT0gJ3N0cmluZycgPyB0aGlzLnByb3BzLmNvbnRlbnQgOiBudWxsfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLndpZHRoID8gdGhpcy5wcm9wcy53aWR0aCArICdweCcgOiBudWxsfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlQ2VsbC5wcm9wVHlwZXMgPSB7XG4gICAgY29udGVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcm93OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZUNlbGw7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSb3cgZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuLyoqXG4gKiBGT1IgRlVUVVJFIEVZRVNcbiAqXG4gKiBUaGVyZSBhcmUgYSBsb3Qgb2YgcGxhY2VzIHdoZXJlIHNoYXJlZCB0aGlzLntuYW1lfSB2YXJpYWJsZXMgaGF2ZSBiZWVuXG4gKiB1c2VkIHdoZXJlIHRoZXkgZG9uJ3Qgc2VlbSB0byBiZSBuZWVkZWQuIFRoaXMgaXMgY29tcGxldGVseSBvbiBwdXJwb3NlIHRvXG4gKiByZWR1Y2UgbWVtb3J5IHByZXNzdXJlIGR1cmluZyBzY3JvbGwgb3BlcmF0aW9ucy4gSWYgeW91IGNoYW5nZSB0aGVtIGJhY2sgdG9cbiAqIG5vcm1hbCB2YXJzLCB5b3UnbGwgc2VlIG1vcmUgR0NzIGluIHlvdXIgSlMgcHJvZmlsZXIuLi4gc28gZG9uJ3QgZG8gaXQhXG4gKi9cblxuLyoqXG4gKiBPUkRFUiBPRiBPUEVSQVRJT05TXG4gKlxuICogMS4gaW5pdGlhbCByZW5kZXIgdy8gb25lIHJvdyBvZiBjZWxsc1xuICogMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbiAqIDMuIGFwcGx5IHdpZHRocyB0byBjb2x1bW4gZGVmaW5pdGlvbnNcbiAqIDQuIHJlbmRlciBwYXNzIDIgdy8gY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcbiAqL1xuXG5sZXQgX2ZpbmRXaGVyZUluZGV4ID0gbnVsbDtcblxuLyoqIEBpZ25vcmUgKi9cbmNvbnN0IGZpbmRXaGVyZSA9IGZ1bmN0aW9uIGZpbmRXaGVyZShhcnJheSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgX2ZpbmRXaGVyZUluZGV4ID0gYXJyYXkubGVuZ3RoIC0gMTtcblxuICAgIHdoaWxlIChfZmluZFdoZXJlSW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbX2ZpbmRXaGVyZUluZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbX2ZpbmRXaGVyZUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9maW5kV2hlcmVJbmRleCAtPSAxO1xuICAgIH1cbn07IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLmNhcHR1cmVDb25zdHJhaW50cyA9IHRoaXMuY2FwdHVyZUNvbnN0cmFpbnRzLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVSb3dDbGljayA9IHRoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ01vdmUgPSB0aGlzLmhhbmRsZURyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQgPSB0aGlzLmhhbmRsZU1vdmVJbnRlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVhTY3JvbGxlckRyYWdTdGFydCA9IHRoaXMuaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFyaWFTcG9rZW5PdXRwdXQ6ICcnLFxuICAgICAgICAgICAgY2hva2VSZW5kZXI6IHRydWUsXG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlUm93SW5kZXg6IC0xLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmdldFJvdygwKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICByb3dzT3JkZXJlZEJ5WTogWzBdLFxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLnNsaWNlKDApLFxuICAgICAgICAgICAgeFNjcm9sbGVyTnViU2l6ZTogbnVsbCxcbiAgICAgICAgICAgIHlTY3JvbGxlck51YlNpemU6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY2FwdHVyZUNvbnN0cmFpbnRzKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2FwdHVyZUNvbnN0cmFpbnRzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKCksICgpID0+IHRoaXMuY2FwdHVyZUNvbnN0cmFpbnRzKCkpO1xuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgLyogc28gd2UgY2FuIHJldXNlIHN0YXRlLnJvd3MgdG8gYXZvaWQgZXh0cmEgYXJyYXkgYWxsb2NhdGlvbnMgaW4gdGhlIHNjcm9sbCBoYW5kbGVycyAtIGluIHRoaXMgY2FzZSBhIGZldyBtb3JlIENQVSBjeWNsZXMgYXJlIGZhciBjaGVhcGVyIHRoYW4gcnVubmluZyB1cCBhZ2FpbnN0IHRoZSBHQyAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMuaGVhZCAmJiB0aGlzLl9taW5pbXVtQ29sdW1uV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50RGlkVXBkYXRlX25vZGUgPSB0aGlzLnJlZnMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1aS10YWJsZS1oZWFkZXItY2VsbCcpWzBdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fY29tcG9uZW50RGlkVXBkYXRlX25vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnREaWRVcGRhdGVfbm9kZVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fY29tcG9uZW50RGlkVXBkYXRlX25vZGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBOYU4gaWYgbm90IGEgcGl4ZWwgdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhpbXVtQ29sdW1uV2lkdGggPSBwYXJzZUludCh0aGlzLl9jb21wb25lbnREaWRVcGRhdGVfbm9kZVN0eWxlLm1heFdpZHRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluaW11bUNvbHVtbldpZHRoID0gcGFyc2VJbnQodGhpcy5fY29tcG9uZW50RGlkVXBkYXRlX25vZGVTdHlsZS5taW5XaWR0aCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhcHR1cmVDb25zdHJhaW50cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSA9IHRoaXMuX2NvbnRhaW5lcldpZHRoIC0gTWF0aC5hYnModGhpcy5feE1heGltdW1UcmFuc2xhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUgPCAxMiA/IDEyIDogdGhpcy5fY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplKCkge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplID0gdGhpcy5fY29udGFpbmVySGVpZ2h0ICogKHRoaXMublJvd3NUb1JlbmRlciAvIHRoaXMucHJvcHMudG90YWxSb3dzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlWVNjcm9sbGVyTnViU2l6ZSA8IDEyID8gMTIgOiB0aGlzLl9jYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxDYWNoZXMoKSB7XG4gICAgICAgIHRoaXMuX3hDdXJyZW50ID0gdGhpcy5feUN1cnJlbnQgPSAwO1xuICAgICAgICB0aGlzLl94TmV4dCA9IHRoaXMuX3lOZXh0ID0gMDtcbiAgICAgICAgdGhpcy5feEN1cnJlbnRTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuX3hTY3JvbGxOdWJQb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX3lDdXJyZW50U2Nyb2xsTnViUG9zaXRpb24gPSB0aGlzLl95U2Nyb2xsTnViUG9zaXRpb24gPSAwO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSB2YXJpYWJsZXMgaW4gdmFyaW91cyBjYWxjdWxhdGlvbnNcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVlTY3JvbGxlck51YlNpemUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudERpZFVwZGF0ZV9ub2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RGlkVXBkYXRlX25vZGVTdHlsZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2ZpcnN0Um93ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2ZpcnN0Um93Q2VsbHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2dlbmVyYXRlZFJvd3MgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfcm93c09yZGVyZWRCeVkgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2FyaWFFeHBvc2VGdWxsUm93RGF0YSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhBeGlzQ29uc2lkZXJhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX3Jvd1dpZHRoID0gdGhpcy5yZWZzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktdGFibGUtcm93JylbMF0uY2xpZW50V2lkdGggfHwgNTAwO1xuICAgICAgICB0aGlzLl94TWF4aW11bVRyYW5zbGF0aW9uID0gdGhpcy5fY29udGFpbmVyV2lkdGggPiB0aGlzLl9yb3dXaWR0aCA/IDAgOiB0aGlzLl9jb250YWluZXJXaWR0aCAtIHRoaXMuX3Jvd1dpZHRoO1xuICAgIH1cblxuICAgIGNhcHR1cmVDb25zdHJhaW50cygpIHtcbiAgICAgICAgdGhpcy5yZXNldEludGVybmFsQ2FjaGVzKCk7XG5cbiAgICAgICAgdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2ZpcnN0Um93ID0gdGhpcy5yZWZzLmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktdGFibGUtcm93JylbMF07XG4gICAgICAgIHRoaXMuX2NhcHR1cmVDb25zdHJhaW50c19maXJzdFJvd0NlbGxzID0gdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2ZpcnN0Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VpLXRhYmxlLWNlbGwnKTtcbiAgICAgICAgdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2NvbnRhaW5lciA9IHRoaXMucmVmcy53cmFwcGVyO1xuXG4gICAgICAgIC8qIFRoZSBmYWxsYmFjayBhbW91bnRzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLCB0aGUgYnJvd3NlciB3aWxsIGFsd2F5cyBoYXZlXG4gICAgICAgIGFuIGFjdHVhbCBudW1iZXIuICovXG5cbiAgICAgICAgdGhpcy5fY2VsbEhlaWdodCA9IHRoaXMuX2NhcHR1cmVDb25zdHJhaW50c19maXJzdFJvd0NlbGxzWzBdLmNsaWVudEhlaWdodCB8fCA0MDtcblxuICAgICAgICB0aGlzLl9jb250YWluZXJIZWlnaHQgPSB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfY29udGFpbmVyLmNsaWVudEhlaWdodCB8fCAxNTA7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcldpZHRoID0gdGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2NvbnRhaW5lci5jbGllbnRXaWR0aCB8fCA1MDA7XG4gICAgICAgIHRoaXMuX3hTY3JvbGxlcldpZHRoID0gdGhpcy5yZWZzLnhTY3JvbGxlci5jbGllbnRXaWR0aDtcblxuICAgICAgICB0aGlzLm5Sb3dzVG9SZW5kZXIgPSBNYXRoLmNlaWwoKHRoaXMuX2NvbnRhaW5lckhlaWdodCAqIDEuMykgLyB0aGlzLl9jZWxsSGVpZ2h0KTtcblxuICAgICAgICBpZiAodGhpcy5uUm93c1RvUmVuZGVyID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMublJvd3NUb1JlbmRlciA9IHRoaXMucHJvcHMudG90YWxSb3dzO1xuICAgICAgICB9IC8vIHJlbmRlcmluZyBtb3JlIHJvd3MgdGhhbiB3ZSBoYXZlIGNvbnRlbnQgaXMgbm90IGNvbnN0cnVjdGl2ZS5cblxuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggPSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQXhpc0NvbnNpZGVyYXRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgPSAwO1xuICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCA9IHRoaXMuX2NvbnRhaW5lckhlaWdodCAtICh0aGlzLm5Sb3dzVG9SZW5kZXIgKiB0aGlzLl9jZWxsSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfZ2VuZXJhdGVkUm93cyA9IFtdO1xuICAgICAgICB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfcm93c09yZGVyZWRCeVkgPSBbXTtcblxuICAgICAgICBmb3IgKHRoaXMuX2l0ZXJhdG9yID0gMDsgdGhpcy5faXRlcmF0b3IgPCB0aGlzLm5Sb3dzVG9SZW5kZXI7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVDb25zdHJhaW50c19nZW5lcmF0ZWRSb3dzLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX2l0ZXJhdG9yKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogdGhpcy5faXRlcmF0b3IsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5fY2VsbEhlaWdodCAqIHRoaXMuX2l0ZXJhdG9yLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVDb25zdHJhaW50c19yb3dzT3JkZXJlZEJ5WS5wdXNoKHRoaXMuX2l0ZXJhdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2hva2VSZW5kZXI6IGZhbHNlLFxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5zdGF0ZS5jb2x1bW5zLm1hcChmdW5jdGlvbiBkaXNjb3ZlcldpZHRoKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmNlaWwodGhpcy5fY2FwdHVyZUNvbnN0cmFpbnRzX2ZpcnN0Um93Q2VsbHNbaW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgdGhpcyksXG4gICAgICAgICAgICByb3dzOiB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfZ2VuZXJhdGVkUm93cyxcbiAgICAgICAgICAgIHJvd3NPcmRlcmVkQnlZOiB0aGlzLl9jYXB0dXJlQ29uc3RyYWludHNfcm93c09yZGVyZWRCeVksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgICAgIHlTY3JvbGxlck51YlNpemU6IHRoaXMuY2FsY3VsYXRlWVNjcm9sbGVyTnViU2l6ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxEb3duKCkge1xuICAgICAgICBpZiAoICAgdGhpcy5fcm93RW5kSW5kZXggPT09IHRoaXMucHJvcHMudG90YWxSb3dzXG4gICAgICAgICAgICB8fCB0aGlzLl95TmV4dCA+PSB0aGlzLl95TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgbG93ZXN0IFkgdmFsdWUgdG8gdGhlIHlMb3dlckJvdW5kIGFuZCByZXF1ZXN0IHRoZSBuZXh0IHJvdy4gU2NhbGUgYXBwcm9wcmlhdGVseSBpZiBhIGJpZyBkZWx0YSBhbmQgbWlncmF0ZSBhcyBtYW55IHJvd3MgYXMgYXJlIG5lY2Vzc2FyeS4gKi9cblxuICAgICAgICB0aGlzLl9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl95TmV4dCAtIHRoaXMuX3lMb3dlckJvdW5kKSAvIHRoaXMuX2NlbGxIZWlnaHRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ICsgdGhpcy5fcm93RW5kSW5kZXggKyAxID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5wcm9wcy50b3RhbFJvd3MgLSB0aGlzLl9yb3dFbmRJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IHRoaXMublJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdERlbHRhID0gdGhpcy5fblJvd3NUb1NoaWZ0IC0gdGhpcy5uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5feVVwcGVyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fc2hpZnREZWx0YSAqIHRoaXMuX2NlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ICs9IHRoaXMuX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm93RW5kSW5kZXggKz0gdGhpcy5fc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IHRoaXMublJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuX25Sb3dzVG9TaGlmdDsgdGhpcy5faXRlcmF0b3IrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRJbmRleCA9IHRoaXMuX3Jvd0VuZEluZGV4ICsgdGhpcy5faXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlciA9IHRoaXMuc3RhdGUucm93c1t0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZW3RoaXMuX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleF1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLl90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLl90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci55ID0gdGhpcy5fdGFyZ2V0SW5kZXggKiB0aGlzLl9jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucHVzaCh0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggKz0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4ICs9IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kIC09IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgLT0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4ID09PSAwIHx8IHRoaXMuX3lOZXh0IDw9IHRoaXMuX3lVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgaGlnaGVzdCBZIHZhbHVlIHRvIHRoZSB5VXBwZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgcHJldmlvdXMgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuX25Sb3dzVG9TaGlmdCA9IE1hdGguY2VpbChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMuX3lOZXh0IC0gdGhpcy5feVVwcGVyQm91bmQpIC8gdGhpcy5fY2VsbEhlaWdodFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3dTdGFydEluZGV4IC0gdGhpcy5fblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5fcm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gdGhpcy5uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0RGVsdGEgPSB0aGlzLl9uUm93c1RvU2hpZnQgLSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl95VXBwZXJCb3VuZCArPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLl95TG93ZXJCb3VuZCArPSB0aGlzLl9zaGlmdERlbHRhICogdGhpcy5fY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dFbmRJbmRleCAtPSB0aGlzLl9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fblJvd3NUb1NoaWZ0ID0gdGhpcy5uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5fblJvd3NUb1NoaWZ0OyB0aGlzLl9pdGVyYXRvcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEluZGV4ID0gdGhpcy5fcm93U3RhcnRJbmRleCAtIHRoaXMuX2l0ZXJhdG9yIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyID0gdGhpcy5zdGF0ZS5yb3dzW3RoaXMuc3RhdGUucm93c09yZGVyZWRCeVlbdGhpcy5fb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dQb2ludGVyLnkgPSB0aGlzLl90YXJnZXRJbmRleCAqIHRoaXMuX2NlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS51bnNoaWZ0KHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggLT0gdGhpcy5fblJvd3NUb1NoaWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvd0VuZEluZGV4IC09IHRoaXMuX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3lVcHBlckJvdW5kICs9IHRoaXMuX25Sb3dzVG9TaGlmdCAqIHRoaXMuX2NlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5feUxvd2VyQm91bmQgKz0gdGhpcy5fblJvd3NUb1NoaWZ0ICogdGhpcy5fY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGVyZm9ybVRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgdGhpcy5yZWZzLmhlYWQgJiYgKHRoaXMucmVmcy5oZWFkLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gJ3RyYW5zbGF0ZTNkKCcgKyB0aGlzLl94TmV4dCArICdweCwgMHB4LCAwcHgpJyk7XG5cbiAgICAgICAgdGhpcy5yZWZzLmJvZHkuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSAndHJhbnNsYXRlM2QoJyArIHRoaXMuX3hOZXh0ICsgJ3B4LCAnICsgdGhpcy5feU5leHQgKyAncHgsIDBweCknO1xuICAgICAgICB0aGlzLnJlZnMueFNjcm9sbGVyTnViLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gJ3RyYW5zbGF0ZTNkKCcgKyB0aGlzLl94U2Nyb2xsTnViUG9zaXRpb24gKyAncHgsIDBweCwgMHB4KSc7XG4gICAgICAgIHRoaXMucmVmcy55U2Nyb2xsZXJOdWIuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSAndHJhbnNsYXRlM2QoMHB4LCAnICsgdGhpcy5feVNjcm9sbE51YlBvc2l0aW9uICsgJ3B4LCAwcHgpJztcbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogbG9jayB0aGUgdHJhbnNsYXRpb24gYXhpcyBpZiB0aGUgdXNlciBpcyBtYW5pcHVsYXRpbmcgdGhlIHN5bnRoZXRpYyBzY3JvbGxiYXJzICovXG4gICAgICAgIHRoaXMuX3hOZXh0ID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMuX3hDdXJyZW50IC0gZXZlbnQuZGVsdGFYO1xuXG4gICAgICAgIGlmICh0aGlzLl94TmV4dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3hOZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl94TmV4dCA8IHRoaXMuX3hNYXhpbXVtVHJhbnNsYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3hOZXh0ID0gdGhpcy5feE1heGltdW1UcmFuc2xhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3lOZXh0ID0gdGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYID8gMCA6IHRoaXMuX3lDdXJyZW50IC0gZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIGlmICh0aGlzLl95TmV4dCA8IHRoaXMuX3lDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl95TmV4dCA+IHRoaXMuX3lDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5feU5leHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl95TmV4dCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5feU5leHQgPCB0aGlzLl95TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5feU5leHQgPSB0aGlzLl95TG93ZXJCb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3hTY3JvbGxOdWJQb3NpdGlvbiA9ICAgKE1hdGguYWJzKHRoaXMuX3hOZXh0KSAvICh0aGlzLl9yb3dXaWR0aCAtIHRoaXMuX2NvbnRhaW5lcldpZHRoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICh0aGlzLl94U2Nyb2xsZXJXaWR0aCAtIHRoaXMuc3RhdGUueFNjcm9sbGVyTnViU2l6ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3hTY3JvbGxOdWJQb3NpdGlvbiArIHRoaXMuc3RhdGUueFNjcm9sbGVyTnViU2l6ZSA+IHRoaXMuX3hTY3JvbGxlcldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl94U2Nyb2xsTnViUG9zaXRpb24gPSB0aGlzLl94U2Nyb2xsZXJXaWR0aCAtIHRoaXMuc3RhdGUueFNjcm9sbGVyTnViU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3lTY3JvbGxOdWJQb3NpdGlvbiA9ICh0aGlzLl9yb3dTdGFydEluZGV4IC8gdGhpcy5wcm9wcy50b3RhbFJvd3MpICogdGhpcy5fY29udGFpbmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLl95U2Nyb2xsTnViUG9zaXRpb24gKyB0aGlzLnN0YXRlLnlTY3JvbGxlck51YlNpemUgPiB0aGlzLl9jb250YWluZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3lTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuX2NvbnRhaW5lckhlaWdodCAtIHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpOyAvLyBEbyBhbGwgdHJhbnNmb3JtcyBncm91cGVkIHRvZ2V0aGVyXG5cbiAgICAgICAgdGhpcy5feEN1cnJlbnQgPSB0aGlzLl94TmV4dDtcbiAgICAgICAgdGhpcy5feUN1cnJlbnQgPSB0aGlzLl95TmV4dDtcbiAgICAgICAgdGhpcy5feEN1cnJlbnRTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuX3hTY3JvbGxOdWJQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5feUN1cnJlbnRTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuX3lTY3JvbGxOdWJQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuICAgICAgICBsZXQgbmV3VGFibGVXaWR0aCA9IDA7XG5cbiAgICAgICAgbGV0IGNvcHkgPSB0aGlzLnN0YXRlLmNvbHVtbnMubWFwKGRlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubWFwcGluZyAhPT0gdGhpcy5fbWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFibGVXaWR0aCArPSBkZWZpbml0aW9uLndpZHRoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEJlZm9yZSBhbnkgbWVhc3VyZW1lbnRzIGFyZSBhcHBsaWVkLCBmaXJzdCB3ZSBuZWVkIHRvIGNvbXBhcmUgdGhlIGRlbHRhIHRvIHRoZSBrbm93biBjZWxsIHdpZHRoIHRocmVzaG9sZHMgYW5kIHNjYWxlIGFwcHJvcHJpYXRlbHkuICovXG5cbiAgICAgICAgICAgIGlmICggICBhZGp1c3RlZERlbHRhIDwgMFxuICAgICAgICAgICAgICAgICYmICFpc05hTih0aGlzLl9taW5pbXVtQ29sdW1uV2lkdGgpXG4gICAgICAgICAgICAgICAgJiYgZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPCB0aGlzLl9taW5pbXVtQ29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21pbmltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLl9tYXhpbXVtQ29sdW1uV2lkdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICYmIGRlZmluaXRpb24ud2lkdGggKyBhZGp1c3RlZERlbHRhID4gdGhpcy5fbWF4aW11bUNvbHVtbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMuX21heGltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1RhYmxlV2lkdGggKz0gZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGE7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICB3aWR0aDogZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobmV3VGFibGVXaWR0aCA8PSB0aGlzLl9jb250YWluZXJXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5feE1heGltdW1UcmFuc2xhdGlvbiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl94TWF4aW11bVRyYW5zbGF0aW9uIC09IGFkanVzdGVkRGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvcHksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVYQXhpc0NvbnNpZGVyYXRpb25zKCk7XG5cbiAgICAgICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgICAgIHdlJ2xsIHNlZSB1bndhbnRlZCB3aGl0ZXNwYWNlIG9uIHRoZSByaWdodCBzaWRlLiBJZiB0aGUgdGFibGUgd2lkdGggYmVjb21lcyBzbWFsbGVyIHRoYW4gdGhlIG92ZXJhbGwgY29udGFpbmVyLCB3aGl0ZXNwYWNlIHdpbGwgYXBwZWFyIHJlZ2FyZGxlc3MuICovXG4gICAgICAgICAgICBpZiAoYWRqdXN0ZWREZWx0YSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IGFkanVzdGVkRGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG5cbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSB0aGlzLnN0YXRlLmNvbHVtbnNbZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4taW5kZXgnKV07XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RZU2Nyb2xsID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgICAgIHRoaXMuX21hbnVhbGx5U2Nyb2xsaW5nWSA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBGaXhlcyBkcmFnU3RhcnQgb2NjYXNpb25hbGx5IGhhcHBlbmluZyBhbmQgYnJlYWtpbmcgdGhlIHNpbXVsYXRlZCBkcmFnXG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hbnVhbGx5UmVzaXppbmdDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbHVtblJlc2l6ZShldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFudWFsbHlTY3JvbGxpbmdYKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiBldmVudC5jbGllbnRYIC0gdGhpcy5fbGFzdFhTY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogKChldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdFlTY3JvbGwpIC8gdGhpcy5fY29udGFpbmVySGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRoaXMuX2NlbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1vdXNldXAgaGFwcGVucyBvdXRzaWRlIHRoZSB0YWJsZSwgaXQgd29uJ3QgYmUgZGV0ZWN0ZWQgd2l0aG91dCB0aGlzIGxpc3RlbmVyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1ggPSB0aGlzLl9tYW51YWxseVNjcm9sbGluZ1kgPSB0aGlzLl9tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlUm93Q2xpY2soZXZlbnQsIGNsaWNrZWRSb3dEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdChldmVudCwgY2xpY2tlZFJvd0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlUm93SW5kZXg6IGZpbmRXaGVyZShcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJvd3MsICdkYXRhJywgY2xpY2tlZFJvd0RhdGFcbiAgICAgICAgICAgICkuc2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnJvd3MubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17cm93LnNldEluZGV4ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMuc3RhdGUuY29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Jvdy5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgZXZlbj17cm93LnNldEluZGV4ICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgIHk9e3Jvdy55fVxuICAgICAgICAgICAgICAgICAgICAgb25JbnRlcmFjdD17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2VsbEludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclJvd3MoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbHVtblJlc2l6ZUhhbmRsZShjb2x1bW4sIGluZGV4KSB7XG4gICAgICAgIGlmIChjb2x1bW4ucmVzaXphYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJ1xuICAgICAgICAgICAgICAgICAgICAgZGF0YS1jb2x1bW4taW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jaG9rZVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZCcgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtcm93IHVpLXRhYmxlLWhlYWRlci1yb3cnPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuY29sdW1ucy5tYXAoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsIHVpLXRhYmxlLWhlYWRlci1jZWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInID8gY29sdW1uLndpZHRoIDogbnVsbH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwtaW5uZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57Y29sdW1uLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5SZXNpemVIYW5kbGUoY29sdW1uLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU2Nyb2xsYmFycygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3hTY3JvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZVhTY3JvbGxlckRyYWdTdGFydH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4U2Nyb2xsZXJOdWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbGVyLW51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnN0YXRlLnhTY3JvbGxlck51YlNpemV9fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3lTY3JvbGxlck51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsZXItbnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7aGVpZ2h0OiB0aGlzLnN0YXRlLnlTY3JvbGxlck51YlNpemV9fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlUm93KGRlbHRhKSB7XG4gICAgICAgIHRoaXMuX25leHRBY3RpdmVSb3cgPSBmaW5kV2hlcmUodGhpcy5zdGF0ZS5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5fbmV4dEFjdGl2ZVJvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYXJpYVNwb2tlbk91dHB1dDogdGhpcy5fbmV4dEFjdGl2ZVJvdy5kYXRhW3RoaXMuc3RhdGUuY29sdW1uc1swXS5tYXBwaW5nXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50QWN0aXZlUm93SW5kZXg6IHRoaXMuX25leHRBY3RpdmVSb3cuc2V0SW5kZXgsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgPiB0aGlzLl95Q3VycmVudClcbiAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5fbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLl9jZWxsSGVpZ2h0IDwgdGhpcy5feUN1cnJlbnQgLSB0aGlzLl9jb250YWluZXJIZWlnaHQgKyB0aGlzLl9jZWxsSGVpZ2h0KSAvLyAxIHVuaXQgb2YgY2VsbEhlaWdodCBpcyByZW1vdmVkIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBoZWFkZXIgcm93XG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiB0aGlzLl9jZWxsSGVpZ2h0ICogZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggPiAwKVxuICAgICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCA8IHRoaXMucHJvcHMudG90YWxSb3dzKSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd25cbiAgICAgICAgICAgICAgICBpbiB0aGUgdmlld3BvcnQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgIGRlbHRhWTogKCAgICggICAgdGhpcy5fcm93U3RhcnRJbmRleCA+IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMuX3Jvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLl9yb3dTdGFydEluZGV4IDwgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4IC0gdGhpcy5fcm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuX2NlbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uZXh0QWN0aXZlUm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcmlhRXhwb3NlRnVsbFJvd0RhdGEoKSB7XG4gICAgICAgIHRoaXMuX2FyaWFFeHBvc2VGdWxsUm93RGF0YSA9IGZpbmRXaGVyZSh0aGlzLnN0YXRlLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5fYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiB0aGlzLnN0YXRlLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3RoaXMuX2FyaWFFeHBvc2VGdWxsUm93RGF0YS5kYXRhW2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIHRoaXMuYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuYXJpYVNwb2tlbk91dHB1dH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVEcmFnTW92ZX1cbiAgICAgICAgICAgICAgICAgb25XaGVlbD17dGhpcy5oYW5kbGVNb3ZlSW50ZW50fVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWQoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNjcm9sbGJhcnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvd0ludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cblVJVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgY29sdW1uczogW10sXG4gICAgZ2V0Um93OiBub29wLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICB0b3RhbFJvd3M6IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBDZWxsIGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5cbmNsYXNzIFVJVGFibGVSb3cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jYWNoZV9zdHlsZSA9IHtbdHJhbnNmb3JtUHJvcF06IG51bGx9O1xuICAgIH1cblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICAgIG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgICAgICAgIHx8IG5leHRTdGF0ZS5kYXRhICE9PSB0aGlzLnN0YXRlLmRhdGFcbiAgICAgICAgICAgICAgIHx8IG5leHRQcm9wcy5ldmVuICE9PSB0aGlzLnByb3BzLmV2ZW5cbiAgICAgICAgICAgICAgIHx8IG5leHRQcm9wcy5jb2x1bW5zICE9PSB0aGlzLnByb3BzLmNvbHVtbnNcbiAgICAgICAgICAgICAgIHx8IG5leHRQcm9wcy55ICE9PSB0aGlzLnByb3BzLnk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkYXRhOiBuZXh0UHJvcHMuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDZWxscygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSAmJiB0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29sdW1ucy5tYXAoKGRlZmluaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2RlZmluaXRpb24ubWFwcGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17dGhpcy5zdGF0ZS5kYXRhW2RlZmluaXRpb24ubWFwcGluZ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtkZWZpbml0aW9uLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRhYmxlLXJvdydcbiAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5wcm9wcy5ldmVuID8gJyB1aS10YWJsZS1yb3ctZXZlbicgOiAnIHVpLXRhYmxlLXJvdy1vZGQnKVxuICAgICAgICAgICAgICAgICAgICArICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlID8gJyB1aS10YWJsZS1yb3ctbG9hZGluZycgOiAnJylcbiAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5wcm9wcy5hY3RpdmUgPyAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnIDogJycpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tbdHJhbnNmb3JtUHJvcF06ICd0cmFuc2xhdGUzZCgwcHgsICcgKyB0aGlzLnByb3BzLnkgKyAncHgsIDBweCknfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2VsbHMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZVJvdy5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIGV2ZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlUm93O1xuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGZpcnN0ID0gZnVuY3Rpb24gZ2V0Rmlyc3RBcnJheUl0ZW0oYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbMF07XG59O1xuXG5jb25zdCBsYXN0ID0gZnVuY3Rpb24gZ2V0TGFzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbmNvbnN0IHdpdGhvdXQgPSBmdW5jdGlvbiByZWplY3RTb21lQXJyYXlJdGVtcyhiYXNlQXJyYXksIC4uLnRvQmVFeGNsdWRlZCkge1xuICAgIHJldHVybiBiYXNlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIHJlamVjdFNvbWUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdG9CZUV4Y2x1ZGVkLmluZGV4T2YoaXRlbSkgPT09IC0xO1xuICAgIH0pO1xufTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXM6IFtdLmNvbmNhdCh0aGlzLnByb3BzLmRlZmF1bHRUb2tlbml6ZWRFbnRpdHlJbmRleGVzKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzSW5kZXhlcyA9IHByZXZTdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzO1xuICAgICAgICBsZXQgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2U3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkO1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXM7XG4gICAgICAgIGxldCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzSW5kZXhlcyAhPT0gY3VycmVudEluZGV4ZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Ub2tlbkNoYW5nZShjdXJyZW50SW5kZXhlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpIHsgLy8gbW92ZSBmb2N1c1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgdG9rZW4gYmFzZWQgb24gYW4gZW50aXR5J3MgYXJyYXkgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxBcnJheTxOdW1iZXI+fSAgaW5kZXggICAgICAgICB0aGUgYXJyYXkgaW5kZXggb2YgdGhlIGRlc2lyZWQgZW50aXR5IHRvIGJlIHRva2VuaXplZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgICBbZm9jdXNJbnB1dF0gIGRldGVybWluZXMgaWYgdGhlIGlucHV0IHNob3VsZCBiZSBmb2N1c2VkIGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIGNoYW5nZXMgYXJlIGFwcGxpZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgICAgICAgW2NsZWFySW5wdXRdICBkZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBzaG91bGQgYmUgY2xlYXJlZCBhZnRlciB0aGVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiBjaGFuZ2VzIGFyZSBhcHBsaWVkXG4gICAgICovXG4gICAgYWRkVG9rZW4oaW5kZXgsIGZvY3VzSW5wdXQsIGNsZWFySW5wdXQpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzLmluZGV4T2YoaWR4KSA9PT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Rva2VuaXplZEVudGl0eUluZGV4ZXM6IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlcy5jb25jYXQoaW5kZXhlcyl9KTtcblxuICAgICAgICBmb2N1c0lucHV0ICYmIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICBjbGVhcklucHV0ICYmIHRoaXMucmVmcy50eXBlYWhlYWQuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHRva2VuIGJhc2VkIG9uIGFuIGVudGl0eSdzIGFycmF5IGluZGV4LiBJZiBubyBpbmRleCBpcyBnaXZlbiwgYWxsIHRva2VucyBhcmUgcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfEFycmF5PE51bWJlcj59ICBpbmRleCAgICAgICAgIHRoZSBhcnJheSBpbmRleCBvZiB0aGUgZGVzaXJlZCBlbnRpdHkgdG8gYmUgdG9rZW5pemVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICAgIFtmb2N1c0lucHV0XSAgZGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgc2hvdWxkIGJlIGZvY3VzZWQgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gY2hhbmdlcyBhcmUgYXBwbGllZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgICBbY2xlYXJJbnB1dF0gIGRldGVybWluZXMgaWYgdGhlIGlucHV0IHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIGNoYW5nZXMgYXJlIGFwcGxpZWRcbiAgICAgKi9cbiAgICByZW1vdmVUb2tlbihpbmRleCA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLCBmb2N1c0lucHV0LCBjbGVhcklucHV0KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSBBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXM6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzLCAuLi5pbmRleGVzKSxcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogd2l0aG91dCh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZCwgLi4uaW5kZXhlcyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvY3VzSW5wdXQgJiYgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1c0lucHV0KCk7XG4gICAgICAgIGNsZWFySW5wdXQgJiYgdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSgnJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IFtdfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBpbmRleGVzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogW2xhc3QoaW5kZXhlcyldLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkOiBhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGluZGV4ZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQ6IGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRva2VuKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVUb2tlbihpbmRleCk7XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VG9rZW5DbG9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFNpbmdsZVRva2VuKGluZGV4KSB7XG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSA9PT0gLTFcbiAgICAgICAgICAgIHx8IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kZXhlc1NlbGVjdGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZDogW2luZGV4XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0U2luZ2xlVG9rZW4oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGV4ZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFNpbmdsZVRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLmRlc2NlbmRhbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZFRva2VuLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMsXG4gICAgZGVmYXVsdFRva2VuaXplZEVudGl0eUluZGV4ZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgIG9uVG9rZW5DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dUb2tlbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblVJVG9rZW5pemVkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgIGRlZmF1bHRUb2tlbml6ZWRFbnRpdHlJbmRleGVzOiBbXSxcbiAgICBvblRva2VuQ2hhbmdlOiBub29wLFxuICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb2tlbml6ZWRJbnB1dDtcbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnByb3BzLnBvc2l0aW9uO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlbG93JzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUxPVyxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgdGhpcy5wcm9wcy50ZXh0fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUb29sdGlwLnBvc2l0aW9uID0ge1xuICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgIEJFRk9SRTogJ0JFRk9SRScsXG4gICAgQUZURVI6ICdBRlRFUicsXG59O1xuXG5VSVRvb2x0aXAucHJvcFR5cGVzID0ge1xuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVG9vbHRpcC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9vbHRpcDtcbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgICAgICB1c2VySW5wdXQ6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQoKSB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgKCkgPT4gdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpKTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoZW50aXR5Q29udGVudCwgdXNlcklucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1hcmtGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXJrRnVuYyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlcklucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi5lbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlbnRpdHkudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHkudGV4dCwgdGhpcy5zdGF0ZS51c2VySW5wdXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXNbbmV4dEluZGV4XSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kaWNlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIHNpbXBsZSBcInN0YXJ0cy13aXRoXCIgc2VhcmNoXG4gICAgZ2V0TWF0Y2hJbmRpY2VzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWF0Y2hGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXRjaEZ1bmMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBjdXJyZW50VmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbXB1dGVNYXRjaGVzKGVudGl0aWVzID0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRpY2VzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSwgKCkgPT4gdGhpcy5jb21wdXRlTWF0Y2hlcygpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW50aXRpZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpbnRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1hcmtGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG1hdGNoV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Db21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVR5cGVhaGVhZElucHV0O1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvdHJhbnNmb3JtXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBsZXQgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi9VSVV0aWxzL3NoYWxsb3dFcXVhbCc7XG5cbi8qKlxuICogQW4gYXVnbWVudGVkIHZlcnNpb24gb2YgYFJlYWN0LkNvbXBvbmVudGAgd2l0aCBzb21lIGhlbHBmdWwgYWJzdHJhY3Rpb25zIGFkZGVkIHRvIHNtb290aFxuICogdGhlIGNvbXBvbmVudCBkZXZlbG9wbWVudCBwcm9jZXNzLlxuICpcbiAqIEFsbCBVSUtpdCBjb21wb25lbnRzIGFyZSBiYXNlZCBvbiBVSVZpZXcuXG4gKlxuICogQGF1Z21lbnRzIHtSZWFjdC5Db21wb25lbnR9XG4gKi9cbmNsYXNzIFVJVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzIGRhdGEgcGFzc2VkIG9uIHRvIHRoZSBlbmQgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGUgPyB0aGlzLmluaXRpYWxTdGF0ZSgpIDoge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwcm94aW1hdGVzIHRoZSBAbGlua3tQdXJlUmVuZGVyTWl4aW4gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9wdXJlLXJlbmRlci1taXhpbi5odG1sfSBmcm9tIEVTNSBSZWFjdC4gSW1wbGVtZW50IHNob3VsZENvbXBvbmVudFVwZGF0ZSBpbiB5b3VyIHN1YmNsYXNzIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIHRoZSBpbmNvbWluZyBwcm9wcyBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBwcm9wc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFN0YXRlIHRoZSBpbmNvbWluZyBzdGF0ZSBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBzdGF0ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgIEluZm9ybXMgUmVhY3QgdG8gcmUtcmVuZGVyIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAqICAgICAvLyBzb21lIGxvZ2ljIGhlcmUsIGV2ZW50dWFsbHkgYHJldHVybmAgdHJ1ZSBvciBmYWxzZVxuICAgICAqICAgICAvLyBjdXJyZW50IHByb3BzICYgc3RhdGUgYXJlIGF2YWlsYWJsZSBmb3IgY29tcGFyaXNvbiBhdCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy51dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICAgICAqL1xuICAgIHV1aWQoKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW11bGF0ZXMgdGhlIChub3cgcmVtb3ZlZCkgUmVhY3QgaW50ZXJmYWNlIGBnZXRJbml0aWFsU3RhdGVgLiBJdCdzIGEgY29udmVuaWVuY2UsIGJ1dCBhbGxvd3NcbiAgICAgKiBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5IHRvIHdvcmsgd2l0aG91dCBoYXZpbmcgdG8gcHJvdmlkZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAbmFtZSBVSVZpZXcjaW5pdGlhbFN0YXRlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICAgICBpdGVtczogW11cbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgVUlWaWV3O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5nbG9iYWwuVUlLaXQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVUlCdXR0b246IChnbG9iYWwuVUlLaXQuVUlCdXR0b24gPSByZXF1aXJlKCcuL1VJQnV0dG9uJykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykuZGVmYXVsdCksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykuZGVmYXVsdCksXG4gICAgVUlEaWFsb2c6IChnbG9iYWwuVUlLaXQuVUlEaWFsb2cgPSByZXF1aXJlKCcuL1VJRGlhbG9nJykuZGVmYXVsdCksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykuZGVmYXVsdCksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykuZGVmYXVsdCksXG4gICAgVUlMaXN0OiAoZ2xvYmFsLlVJS2l0LlVJTGlzdCA9IHJlcXVpcmUoJy4vVUlMaXN0JykuZGVmYXVsdCksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykuZGVmYXVsdCksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzczogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzID0gcmVxdWlyZSgnLi9VSVByb2dyZXNzJykuZGVmYXVsdCksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykuZGVmYXVsdCksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykuZGVmYXVsdCksXG4gICAgVUlTZWdtZW50ZWRDb250cm9sOiAoZ2xvYmFsLlVJS2l0LlVJU2VnbWVudGVkQ29udHJvbCA9IHJlcXVpcmUoJy4vVUlTZWdtZW50ZWRDb250cm9sJykuZGVmYXVsdCksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykuZGVmYXVsdCksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlUb29sdGlwOiAoZ2xvYmFsLlVJS2l0LlVJVG9vbHRpcCA9IHJlcXVpcmUoJy4vVUlUb29sdGlwJykuZGVmYXVsdCksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykuZGVmYXVsdCksXG4gICAgVUlWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJVmlldyA9IHJlcXVpcmUoJy4vVUlWaWV3JykuZGVmYXVsdCksXG59O1xuIl19
