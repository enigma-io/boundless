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

            return previous;

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
        value: function componentDidUpdate(prevProps) {
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
            var hasType = !!this.props.type;
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
                    key: _this3.createHashedKey(item) + index, // in case 2 pieces of content are identical
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
            this.refs['option_$' + index].focus();
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
                    'div',
                    _extends({}, definition, {
                        role: 'radio',
                        'aria-checked': String(definition.selected),
                        ref: 'option_$' + index,
                        key: definition.value,
                        className: (0, _classnames2.default)({
                            'ui-segmented-control-option': true,
                            'ui-segmented-control-option-selected': definition.selected
                        }),
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
    options: function options(props, propName, componentName) {
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

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],14:[function(require,module,exports){
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

},{"../UIUtils/noop":20,"../UIUtils/transform":22,"../UIView":23,"./row":16,"classnames":24,"react":"react"}],16:[function(require,module,exports){
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
                    style: _defineProperty({}, _transform2.default, this.props.y ? 'translate3d(0px, ' + this.props.y + 'px, 0px)' : null),
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
                tokenizedEntityIndicesSelected: [],
                tokenizedEntityIndices: []
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            var previousIndices = prevState.tokenizedEntityIndices;
            var previousSelectedIndices = prevState.tokenizedEntityIndicesSelected;
            var currentIndices = this.state.tokenizedEntityIndices;
            var currentSelectedIndices = this.state.tokenizedEntityIndicesSelected;

            if (previousIndices !== currentIndices) {
                this.props.onTokenChange(currentSelectedIndices.map(function (index) {
                    return _this2.props.entities[index];
                }));
            }

            if (previousSelectedIndices !== currentSelectedIndices) {
                // move focus
                if (currentSelectedIndices.length === 0) {
                    return;
                } else if (currentSelectedIndices.length === 1 || currentSelectedIndices[0] !== previousSelectedIndices[0] /* multi selection, leftward */) {
                        this.refs['token_' + currentSelectedIndices[0]].focus();
                    } else if (last(currentSelectedIndices) !== last(previousSelectedIndices) /* multi selection, rightward */) {
                        this.refs['token_' + last(currentSelectedIndices)].focus();
                    }
            }
        }
    }, {
        key: 'handleEntitySelected',
        value: function handleEntitySelected(index) {
            if (this.state.tokenizedEntityIndices.indexOf(index) === -1) {
                this.setState({ tokenizedEntityIndices: this.state.tokenizedEntityIndices.concat(index) });
            }
        }
    }, {
        key: 'handleInputFocus',
        value: function handleInputFocus(event) {
            this.setState({ tokenizedEntityIndicesSelected: [] });

            if (typeof this.props.inputProps.onFocus === 'function') {
                event.persist();
                this.props.inputProps.onFocus(event);
            }
        }
    }, {
        key: 'selectPreviousToken',
        value: function selectPreviousToken(append) {
            var selected = this.state.tokenizedEntityIndicesSelected;
            var indices = this.state.tokenizedEntityIndices;

            if (selected.length === 1 && first(selected) === first(indices)) {
                return; // already at leftmost bound
            }

            if (selected.length === 0) {
                // pick the rightmost
                this.setState({
                    tokenizedEntityIndicesSelected: [last(indices)]
                });
            } else {
                // add the next leftmost to a reconstructed "selected" array
                var previousToken = indices[indices.indexOf(first(selected)) - 1];

                this.setState({
                    tokenizedEntityIndicesSelected: append ? [previousToken].concat(selected) : [previousToken]
                });
            }
        }
    }, {
        key: 'selectNextToken',
        value: function selectNextToken(append) {
            var selected = this.state.tokenizedEntityIndicesSelected;
            var indices = this.state.tokenizedEntityIndices;

            if (selected.length === 0) {
                return;
            }

            if (last(selected) === last(indices)) {
                this.setState({
                    tokenizedEntityIndicesSelected: []
                });

                this.refs.typeahead.focusInput();
            } else {
                var nextToken = indices[indices.indexOf(last(selected)) + 1];

                this.setState({
                    tokenizedEntityIndicesSelected: append ? selected.concat(nextToken) : [nextToken]
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
                    if (this.state.tokenizedEntityIndicesSelected.length) {
                        event.preventDefault();
                        this.setState({
                            tokenizedEntityIndices: without.apply(undefined, [this.state.tokenizedEntityIndices].concat(_toConsumableArray(this.state.tokenizedEntityIndicesSelected))),
                            tokenizedEntityIndicesSelected: []
                        });

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
            this.setState({
                tokenizedEntityIndices: without(this.state.tokenizedEntityIndices, index),
                tokenizedEntityIndicesSelected: without(this.state.tokenizedEntityIndicesSelected, index)
            });
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
            if (this.state.tokenizedEntityIndicesSelected.indexOf(index) === -1 || this.state.tokenizedEntityIndicesSelected.length > 1) {
                this.setState({
                    tokenizedEntityIndicesSelected: [index]
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
                this.state.tokenizedEntityIndices.map(function (index) {
                    return _react2.default.createElement(
                        'div',
                        { ref: 'token_' + index,
                            key: index,
                            className: (0, _classnames2.default)({
                                'ui-tokenfield-token': true,
                                'ui-tokenfield-token-selected': _this3.state.tokenizedEntityIndicesSelected.indexOf(index) !== -1
                            }),
                            onClick: _this3.selectSingleToken.bind(_this3, index),
                            onKeyDown: _this3.handleTokenKeyDown.bind(_this3, index),
                            tabIndex: '0' },
                        _this3.props.entities[index].content,
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
                    onEntitySelected: this.handleEntitySelected.bind(this),
                    onFocus: this.handleInputFocus.bind(this),
                    clearPartialInputOnSelection: true }))
            );
        }
    }]);

    return UITokenizedInput;
})(_UIView3.default);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    onTokenChange: _react2.default.PropTypes.func,
    showTokenClose: _react2.default.PropTypes.bool
});

UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
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

},{"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],19:[function(require,module,exports){
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
                id: this.uuid()
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.defaultValue) {
                this.computeMatches(this.props.defaultValue);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.entities !== this.props.entities) {
                this.computeMatches(this.state.userInput, nextProps.entities);
            }
        }
    }, {
        key: 'getSelectedEntityContent',
        value: function getSelectedEntityContent() {
            var entity = this.props.entities[this.state.selectedEntityIndex];

            return entity ? entity.content : '';
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
                this.getSelectedEntityContent()
            );
        }
    }, {
        key: 'renderHint',
        value: function renderHint() {
            if (this.props.hint) {
                var userText = this.state.userInput;
                var raw = this.getSelectedEntityContent();
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
                                key: _this3.createHashedKey(entity.content),
                                onClick: _this3.handleMatchClick.bind(_this3, index) }),
                            _this3.markMatchSubstring(entity.content, _this3.state.userInput)
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
                this.setValue(this.getSelectedEntityContent());
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
                return entity.content.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
            }, []);
        }
    }, {
        key: 'computeMatches',
        value: function computeMatches(currentValue) {
            var entities = arguments.length <= 1 || arguments[1] === undefined ? this.props.entities : arguments[1];

            var matches = currentValue === '' ? [] : this.getMatchIndices(currentValue, entities);

            this.setState({
                userInput: currentValue,
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndices: matches
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            this.computeMatches(event.target.value);

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
                    defaultValue: undefined,
                    name: undefined,
                    type: undefined,
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
        content: _react2.default.PropTypes.string
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
};

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
   * In any type of list, unique keys are required to keep React re-renders efficient. This
   * method consumes a list item's content and returns an appropriate key to be used.
   *
   * Based on the implementation by esmiralha {@link http://stackoverflow.com/a/7616484/1141611 on StackOverflow}
   *
   * @example
   * this.createHashedKey('abcd'); // 2987074
   *
   * @param  {string} baseString The content to be hashed into a consistent key.
   * @return {string} The built, unique hash.
   */

  _createClass(UIView, [{
    key: 'createHashedKey',
    value: function createHashedKey(baseString) {
      return baseString.split('').reduce(function hasher(a, b) {
        var c = (a << 5) - a + b.charCodeAt(0);

        return c & c;
      }, 0);
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

  }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJVSUJ1dHRvbi9pbmRleC5qcyIsIlVJQ2hlY2tib3gvaW5kZXguanMiLCJVSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCJVSURpYWxvZy9pbmRleC5qcyIsIlVJRml0dGVkVGV4dC9pbmRleC5qcyIsIlVJSW1hZ2UvaW5kZXguanMiLCJVSUxpc3QvaW5kZXguanMiLCJVSU1vZGFsL2luZGV4LmpzIiwiVUlQb3BvdmVyL2luZGV4LmpzIiwiVUlQcm9ncmVzcy9pbmRleC5qcyIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiVUlSYWRpby9pbmRleC5qcyIsIlVJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIlVJVGFibGUvY2VsbC5qcyIsIlVJVGFibGUvaW5kZXguanMiLCJVSVRhYmxlL3Jvdy5qcyIsIlVJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiLCJVSVRvb2x0aXAvaW5kZXguanMiLCJVSVR5cGVhaGVhZElucHV0L2luZGV4LmpzIiwiVUlVdGlscy9ub29wL2luZGV4LmpzIiwiVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCJVSVV0aWxzL3RyYW5zZm9ybS9pbmRleC5qcyIsIlVJVmlldy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0tNLFFBQVE7Y0FBUixRQUFROzthQUFSLFFBQVE7OEJBQVIsUUFBUTs7c0VBQVIsUUFBUTs7O2lCQUFSLFFBQVE7O3NDQUNJO0FBQ1YsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7QUFDM0Msb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDbEU7U0FDSjs7O3NDQUVhO0FBQ1YsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixnQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN4Qjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPLENBQUM7QUFDYixxQkFBSyxPQUFPO0FBQ1IseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUVuQix3QkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUMzQyw0QkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDeEI7QUFBQSxhQUNKOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBWSxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsUUFBUTtBQUNaLDZCQUFTLEVBQUU7QUFDUCxtQ0FBVyxFQUFFLElBQUk7QUFDakIsNkNBQXFCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxXQUFXO0FBQ2hFLDJDQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzt1QkFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNoRCxBQUFDO0FBQ0gsb0NBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUM7QUFDakMsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUN6QywyQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7YUFDZixDQUNYO1NBQ0w7OztXQTlDQyxRQUFROzs7QUFpRGQsUUFBUSxDQUFDLFNBQVMsR0FBRztBQUNqQixZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ2hDLENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRztBQUNwQixXQUFPLGdCQUFNO0FBQ2IsYUFBUyxnQkFBTTtBQUNmLGVBQVcsZ0JBQU07Q0FDcEIsQ0FBQzs7a0JBRWEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDMURqQixVQUFVO2NBQVYsVUFBVTs7YUFBVixVQUFVOzhCQUFWLFVBQVU7O3NFQUFWLFVBQVU7OztpQkFBVixVQUFVOzt1Q0FDRztBQUNYLG1CQUFPO0FBQ0gsa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTthQUM5QyxDQUFDO1NBQ0w7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDMUIsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1NBQ0o7OzsyQ0FFa0IsU0FBUyxFQUFFO0FBQzFCLGdCQUFJLFNBQVMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDdEQsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO1NBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztTQUM5RDs7O29DQUVXO0FBQ1IsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFFOzs7dUNBRWM7O0FBQ1gsZ0JBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUcsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRjs7O3NDQUVhO0FBQ1YsbUJBQ0ksb0RBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLG1CQUFHLEVBQUMsT0FBTztBQUNYLG9CQUFJLEVBQUMsVUFBVTtBQUNmLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDbEIseUJBQVMsRUFBRTtBQUNQLGlDQUFhLEVBQUUsSUFBSTtBQUNuQix1Q0FBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7QUFDN0MseUNBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQ3pDLDJDQUF1QixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87bUJBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUN0RSxBQUFDO0FBQ0gsb0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztBQUN0Qix1QkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDO0FBQzVCLGdDQUFjLElBQUksQ0FBQyxTQUFTLEVBQUUsQUFBQztBQUMvQix3QkFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQ3ZDLHFCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsSUFBRyxDQUNwQztTQUNMOzs7c0NBRWE7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDTiwrQ0FBbUIsRUFBRSxJQUFJOzJCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdkUsQUFBQztBQUNILCtCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztpQkFDYixDQUNWO2FBQ0w7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDZDQUFxQixFQUFFLElBQUk7dUJBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBaEZDLFVBQVU7OztBQW1GaEIsVUFBVSxDQUFDLFNBQVMsR0FBRztBQUNuQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsaUJBQWEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzNCLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3ZDLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQ2hDLENBQUM7O0FBRUYsVUFBVSxDQUFDLFlBQVksR0FBRztBQUN0QixXQUFPLEVBQUUsS0FBSztBQUNkLGlCQUFhLEVBQUUsS0FBSztBQUNwQixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxFQUFFO0FBQ2QsYUFBUyxnQkFBTTtBQUNmLGVBQVcsZ0JBQU07Q0FDcEIsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3ZHbkIsZUFBZTtjQUFmLGVBQWU7O2FBQWYsZUFBZTs4QkFBZixlQUFlOztzRUFBZixlQUFlOzs7aUJBQWYsZUFBZTs7MENBQ0M7QUFDZCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJO3VCQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSTthQUFBLENBQUMsQ0FBQztTQUNoRTs7OzBDQUVpQjtBQUNkLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJO2FBQUEsQ0FBQyxDQUFDO1NBQy9EOzs7MENBRWlCO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDdEIsb0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7QUFFeEMsdUJBQ0ksaUVBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztBQUM3Qix1QkFBRyxFQUFDLFlBQVk7QUFDaEIsd0JBQUksRUFBQyxlQUFlO0FBQ3BCLHVCQUFHLEVBQUMsZUFBZTtBQUNuQiwyQkFBTyxFQUFFLFVBQVUsQUFBQztBQUNwQiw2QkFBUyxFQUFFO0FBQ1AscURBQTZCLEVBQUUsSUFBSTt1QkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQzlFLEFBQUM7QUFDSCxpQ0FBYSxFQUFFLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQUFBQztBQUNyRCx5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxBQUFDO0FBQ2pDLDZCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUM7QUFDbkMsK0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQyxJQUFHLENBQ3hEO2FBQ0w7U0FDSjs7OzJDQUVrQjs7O0FBQ2YsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hDLHVCQUNJLGlFQUFnQixJQUFJO0FBQ1IsdUJBQUcsZ0JBQWlCO0FBQ3BCLHVCQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQUFBQztBQUNmLDZCQUFTLEVBQUUsT0FBSyxLQUFLLENBQUMsY0FBYyxBQUFDO0FBQ3JDLCtCQUFXLEVBQUUsT0FBSyxLQUFLLENBQUMsZ0JBQWdCLEFBQUMsSUFBRyxDQUMxRDthQUNMLENBQUMsQ0FBQztTQUNOOzs7eUNBRWdCO0FBQ2IsZ0JBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7QUFFN0MsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUN0RCx3QkFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtBQUNwQyx5QkFBSyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQjtBQUM1QyxvQ0FBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUM3Qyw4QkFBTTs7QUFBQSxBQUVWLHlCQUFLLGVBQWUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCO0FBQzNDLG9DQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLDhCQUFNO0FBQUEsaUJBQ1Q7YUFDSjs7QUFFRCxtQkFBTyxZQUFZLENBQUM7U0FDdkI7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsT0FBTztBQUNYLDZCQUFTLEVBQUU7QUFDUiwyQ0FBbUIsRUFBRSxJQUFJO3VCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQy9DLEFBQUM7Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRTthQUNwQixDQUNSO1NBQ0w7OztXQXhFQyxlQUFlOzs7QUEyRXJCLGVBQWUsQ0FBQyxTQUFTLEdBQUc7QUFDeEIscUJBQWlCLEVBQUUsbUJBQW1CO0FBQ3RDLG9CQUFnQixFQUFFLGtCQUFrQjtDQUN2QyxDQUFDOztBQUVGLGVBQWUsQ0FBQyxTQUFTLEdBQUc7QUFDeEIsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQzFCLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsZUFBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUN4QyxhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsWUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07S0FDaEMsQ0FBQyxDQUNMLENBQUMsVUFBVTtBQUNaLGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLG9CQUFnQixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLGFBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDdEMscUJBQWlCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNyQyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUMzQyxlQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUM3QyxDQUFDO0NBQ0wsQ0FBQzs7QUFFRixlQUFlLENBQUMsWUFBWSxHQUFHO0FBQzNCLFNBQUssRUFBRSxFQUFFO0FBQ1QsZ0JBQVksZ0JBQU07QUFDbEIsa0JBQWMsZ0JBQU07QUFDcEIsa0JBQWMsZ0JBQU07QUFDcEIsb0JBQWdCLGdCQUFNO0FBQ3RCLGtCQUFjLEVBQUUsRUFBRTtBQUNsQixrQkFBYyxFQUFFLFlBQVk7QUFDNUIscUJBQWlCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUI7Q0FDakUsQ0FBQzs7a0JBRWEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbEh4QixRQUFRO2NBQVIsUUFBUTs7YUFBUixRQUFROzhCQUFSLFFBQVE7O3NFQUFSLFFBQVE7OztpQkFBUixRQUFROzt1Q0FDSztBQUNYLG1CQUFPO0FBQ0gsMEJBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3ZCLHdCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTthQUN4QixDQUFDO1NBQ0w7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUN6RSxvQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUI7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtBQUNoQyxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTdELHNCQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTs7QUFFRCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFL0Msa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDs7OytDQUVzQjtBQUNuQixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFO0FBQ2hDLHNCQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0RTs7QUFFRCxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9EOzs7dUNBRWMsSUFBSSxFQUFFO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQzs7O29DQUVXLFdBQVcsRUFBRTtBQUNyQixnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQzFCLHVCQUFPO2FBQ1Y7OztBQUFBLEFBR0QsZ0JBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxzQkFBc0IsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDOztBQUUvRSxtQkFBTyxRQUFRLENBQUM7O0FBRWhCLGdCQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQzdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDN0MsMkJBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3Qix3QkFBUSxDQUFDLEtBQUssRUFBRTtBQUFDLGFBQ3BCO1NBQ0o7OztzQ0FFYSxLQUFLLEVBQUU7QUFDakIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDcEQsb0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEI7O0FBRUQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDNUMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7U0FDSjs7OzJDQUVrQixXQUFXLEVBQUU7QUFDNUIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUMxQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN4QjtTQUNKOzs7cUNBRVk7QUFDVCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQix1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQ3hCLDJCQUFHLEVBQUMsTUFBTTtBQUNWLDBCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7QUFDeEIsaUNBQVMsRUFBRTtBQUNSLDRDQUFnQixFQUFFLElBQUk7MkJBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUNuRSxBQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtpQkFDZCxDQUNSO2FBQ0w7U0FDSjs7O3VDQUVjO0FBQ1gsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkIsdUJBQ0k7O2lDQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQiwyQkFBRyxFQUFDLFFBQVE7QUFDWixpQ0FBUyxFQUFFO0FBQ1AsOENBQWtCLEVBQUUsSUFBSTsyQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3hFLEFBQUM7b0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUNiLENBQ1g7YUFDTDtTQUNKOzs7dUNBRWM7QUFDWCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNuQix1QkFDSTs7aUNBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO0FBQzFCLDJCQUFHLEVBQUMsUUFBUTtBQUNaLDBCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEFBQUM7QUFDMUIsaUNBQVMsRUFBRTtBQUNQLDhDQUFrQixFQUFFLElBQUk7MkJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUN4RSxBQUFDO29CQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDYixDQUNYO2FBQ0w7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxRQUFRO0FBQ1osNkJBQVMsRUFBRTtBQUNSLG1DQUFXLEVBQUUsSUFBSTt1QkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUN6Qyx3QkFBSSxFQUFDLFFBQVE7QUFDYix1Q0FBaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEFBQUM7QUFDdkMsd0NBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQ3RDLDRCQUFRLEVBQUMsR0FBRztnQkFDWixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ2xCLENBQ1I7U0FDTDs7O1dBdklDLFFBQVE7OztBQTBJZCxRQUFRLENBQUMsU0FBUyxHQUFHO0FBQ2pCLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMxQixhQUFTLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsZ0JBQVksRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNsQyxZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsaUJBQWEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyx1QkFBbUIsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN6QyxVQUFNLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFVBQU0sRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixlQUFXLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbkMsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ2hDLENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRztBQUNwQixhQUFTLEVBQUUsRUFBRTtBQUNiLGdCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFXLEVBQUUsRUFBRTtBQUNmLGVBQVcsRUFBRSxFQUFFO0FBQ2YsV0FBTyxnQkFBTTtDQUNoQixDQUFDOztrQkFFYSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoS3ZCLFNBQVMsR0FBRyxDQUFDLFlBQVksRUFBRTtBQUN2QixXQUFPLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckM7O0lBRUssWUFBWTtjQUFaLFlBQVk7O2FBQVosWUFBWTs4QkFBWixZQUFZOztzRUFBWixZQUFZOzs7aUJBQVosWUFBWTs7NENBQ007QUFDaEIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFZixrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEOzs7NkNBRW9CO0FBQ2pCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7OzsrQ0FFc0I7QUFDbkIsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDs7O2tDQUVTO0FBQ04sZ0JBQUksSUFBSSxHQUFHLG1CQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNoQyxnQkFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RELGdCQUFJLGVBQWUsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLGdCQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLGdCQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUUzRCxnQkFBTyxZQUFZLENBQUMsU0FBUyxLQUFLLFlBQVksSUFDdkMsWUFBWSxDQUFDLFNBQVMsS0FBSyxhQUFhLEVBQUU7O0FBQzdDLCtCQUFlLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xGLDhCQUFjLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BGOztBQUVELGdCQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQUFBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBSSxlQUFlLENBQUMsQ0FBQztBQUNyRixnQkFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUksY0FBYyxDQUFDLENBQUM7O0FBRWxGLGdCQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3RHOzs7aUNBRVE7QUFDTCxtQkFDSTs7NkJBQVUsSUFBSSxDQUFDLEtBQUs7QUFDZCw2QkFBUyxFQUFFO0FBQ1AsaUNBQVMsRUFBRSxJQUFJO3VCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsQUFBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7YUFDakIsQ0FDVDtTQUNMOzs7V0E5Q0MsWUFBWTs7O0FBaURsQixZQUFZLENBQUMsWUFBWSxHQUFHO0FBQ3hCLGVBQVcsRUFBRSxNQUFNLENBQUMsU0FBUztDQUNoQyxDQUFDOztBQUVGLFlBQVksQ0FBQyxTQUFTLEdBQUc7QUFDckIsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDaEMsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sRUFDdEIsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FDekIsQ0FBQztBQUNGLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztrQkFFYSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNqRXJCLE9BQU87Y0FBUCxPQUFPOzthQUFQLE9BQU87OEJBQVAsT0FBTzs7c0VBQVAsT0FBTzs7O2lCQUFQLE9BQU87O3VDQUNNO0FBQ1gsbUJBQU87QUFDSCxzQkFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTzthQUNqQyxDQUFDO1NBQ0w7OztrREFFeUIsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7QUFDbEMsb0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7YUFDbkQ7U0FDSjs7OzRDQUVtQjtBQUNoQixnQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCOzs7MkNBRWtCLFNBQVMsRUFBRTtBQUMxQixnQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCOzs7K0NBRXNCO0FBQ25CLGdCQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7Ozt5Q0FFZ0I7QUFDYixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGdCQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCOzs7a0NBRVM7OztBQUNOLGdCQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFBRSx1QkFBTzthQUFFOztBQUU1QixnQkFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU1QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7dUJBQU0sT0FBSyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQzthQUFBLENBQUM7QUFDMUUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHO3VCQUFNLE9BQUssUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7YUFBQSxDQUFDOztBQUUxRSxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDcEM7OztzQ0FFYTtBQUNWLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7QUFDckMsdUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLHVCQUFHLEVBQUMsT0FBTztBQUNYLDZCQUFTLEVBQUU7QUFDUCxrQ0FBVSxFQUFFLElBQUk7dUJBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQ3RFLEFBQUM7QUFDSCx5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxBQUFDO0FBQ3RCLHlCQUFLLGVBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztBQUM5Qix1Q0FBZSxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFHO3NCQUMzQyxJQUFHLENBQ1o7YUFDTDs7QUFFRCxtQkFDSSxrREFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsbUJBQUcsRUFBQyxPQUFPO0FBQ1gseUJBQVMsRUFBRTtBQUNSLDhCQUFVLEVBQUUsSUFBSTttQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckUsQUFBQztBQUNILG1CQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEFBQUM7QUFDcEIsbUJBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQUFBQztBQUNwQixzQkFBTSxnQkFBTztBQUNiLHVCQUFPLGdCQUFPLElBQUcsQ0FDeEI7U0FDTDs7O3VDQUVjO0FBQ1gsbUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO0FBQzFCLG1CQUFHLEVBQUMsUUFBUTtBQUNaLHlCQUFTLEVBQUU7QUFDUixxQ0FBaUIsRUFBRSxJQUFJO0FBQ3ZCLHNDQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztBQUNoRSxxQ0FBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07QUFDOUQsb0NBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLO21CQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFDdkUsQUFBQztBQUNILG9CQUFJLEVBQUMsY0FBYyxJQUFHLENBQzdCO1NBQ0w7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUUsSUFBSSxBQUFDO0FBQ1YsdUJBQUcsRUFBRSxJQUFJLEFBQUM7QUFDVix1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsMENBQWtCLEVBQUUsSUFBSTt1QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO2dCQUNILElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUU7YUFDbEIsQ0FDUjtTQUNMOzs7V0F2R0MsT0FBTzs7O0FBMEdiLE9BQU8sQ0FBQyxNQUFNLEdBQUc7QUFDYixXQUFPLEVBQUUsU0FBUztBQUNsQixVQUFNLEVBQUUsUUFBUTtBQUNoQixTQUFLLEVBQUUsT0FBTztDQUNqQixDQUFDOztBQUVGLE9BQU8sQ0FBQyxTQUFTLEdBQUc7QUFDaEIsT0FBRyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzNCLDRCQUF3QixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxPQUFHLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDbkIsY0FBVSxFQUFFLEVBQUU7QUFDZCxlQUFXLEVBQUUsRUFBRTtDQUNsQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlIaEIsTUFBTTtjQUFOLE1BQU07O2FBQU4sTUFBTTs4QkFBTixNQUFNOztzRUFBTixNQUFNOzs7aUJBQU4sTUFBTTs7dUNBQ087QUFDWCxtQkFBTztBQUNILDBCQUFVLEVBQUUsSUFBSTthQUNuQixDQUFDO1NBQ0w7OztpQ0FFUSxLQUFLLEVBQUU7QUFDWixnQkFBSSxDQUFDLElBQUksV0FBUyxLQUFLLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0Qzs7O3lDQUVnQixXQUFXLEVBQUU7QUFDMUIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXJELG1CQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNwRDs7OzZDQUVvQixXQUFXLEVBQUU7QUFDOUIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXpELG1CQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDaEU7OztzQ0FFYSxLQUFLLEVBQUU7OztBQUNqQixnQkFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN0QixnQkFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ2xDLGdCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUMvQixnQkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7O0FBRXpDLGdCQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FBUztBQUNmLHVCQUFLLFFBQVEsQ0FBQyxPQUFLLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDakQscUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQixDQUFDOztBQUVGLGdCQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FBUztBQUNmLHFCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsdUJBQUssUUFBUSxDQUFDLE9BQUssb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUN4RCxDQUFDOztBQUVGLGdCQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7QUFDZixvQkFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbEQsb0JBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxlQUFlLEtBQUssQ0FBQyxFQUFFO0FBQ3pDLHdCQUFJLEVBQUUsQ0FBQztpQkFDVixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLGVBQWUsS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNoRSx3QkFBSSxFQUFFLENBQUM7aUJBQ1Y7YUFDSixNQUFNO0FBQ0gsd0JBQVEsR0FBRztBQUNYLHlCQUFLLFNBQVMsQ0FBQztBQUNmLHlCQUFLLFdBQVc7QUFDWiw0QkFBSSxFQUFFLENBQUM7QUFDUCw4QkFBTTs7QUFBQSxBQUVWLHlCQUFLLFdBQVcsQ0FBQztBQUNqQix5QkFBSyxZQUFZO0FBQ2IsNEJBQUksRUFBRSxDQUFDO0FBQ1AsOEJBQU07QUFBQSxpQkFDVDthQUNKOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7Ozt3Q0FFZTs7O0FBQ1osZ0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7O0FBRWpELG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUs7QUFDekMsdUJBQU8sZ0JBQU0sYUFBYSxDQUFDLFFBQVEsRUFBRTtBQUNqQyw2QkFBUyxFQUFFLGNBQWM7QUFDekIsdUJBQUcsWUFBVSxLQUFLLEFBQUU7QUFDcEIsdUJBQUcsRUFBRSxPQUFLLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLO0FBQ3ZDLDRCQUFRLEVBQUUsQ0FBQztBQUNYLDBCQUFNLEVBQUU7K0JBQU0sT0FBSyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxPQUFLLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQztxQkFBQTtBQUNqRiwyQkFBTyxFQUFFOytCQUFNLE9BQUssUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO3FCQUFBO0FBQ2hELDRCQUFRLEVBQUUsSUFBSTtpQkFDakIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBQ047OztpQ0FFUTtBQUNMLGdCQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLG9CQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUN2QixxQkFBSyxRQUFRO0FBQ1QsNEJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRO0FBQ1QsNEJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsMEJBQU07QUFBQSxhQUNUOztBQUVELG1CQUFPLGdCQUFNLGFBQWEsQ0FBQyxRQUFRLGVBQzVCLElBQUksQ0FBQyxLQUFLO0FBQ2IsbUJBQUcsRUFBRSxNQUFNO0FBQ1gseUJBQVMsRUFBRTtBQUNQLDZCQUFTLEVBQUUsSUFBSTtBQUNmLHNDQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7QUFDaEQsc0NBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtBQUNoRCxtQ0FBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO21CQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ2hEO0FBQ0YseUJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEMsd0JBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2VBQ2hDLENBQUM7U0FDTjs7O1dBN0dDLE1BQU07OztBQWdIWixNQUFNLENBQUMsU0FBUyxHQUFHO0FBQ2YsU0FBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQU0sU0FBUyxDQUFDLElBQUksQ0FBQztBQUNwRCxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNwRCxDQUFDOztBQUVGLE1BQU0sQ0FBQyxZQUFZLEdBQUc7QUFDbEIsU0FBSyxFQUFFLEVBQUU7Q0FDWixDQUFDOztrQkFFYSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN4SGYsT0FBTztjQUFQLE9BQU87O2FBQVAsT0FBTzs4QkFBUCxPQUFPOztzRUFBUCxPQUFPOzs7aUJBQVAsT0FBTzs7aUNBQ0E7OztBQUNMLGdCQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQVMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUMvRSxxQkFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU3Qix1QkFBTyxLQUFLLENBQUM7YUFDaEIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsMENBQWtCLEVBQUUsSUFBSTt1QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO2dCQUNKLGtEQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUN4Qix1QkFBRyxFQUFDLE1BQU07QUFDViw2QkFBUyxFQUFFO0FBQ1IsdUNBQWUsRUFBRSxJQUFJO3VCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDbkUsQUFBQyxJQUFHO2dCQUNYLCtEQUFjLG1CQUFtQixFQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDekIsdUJBQUcsRUFBQyxRQUFRO0FBQ1osNkJBQVMsRUFBRTtBQUNULGtDQUFVLEVBQUUsSUFBSTt1QkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDcEUsQUFBQyxJQUFHO2FBQ2QsQ0FDUjtTQUNMOzs7V0E5QkMsT0FBTzs7O0FBaUNiLE9BQU8sQ0FBQyxTQUFTLGdCQUNWLG1CQUFTLFNBQVM7QUFDckIsYUFBUyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtFQUNyQyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLGdCQUNiLG1CQUFTLFlBQVk7QUFDeEIsYUFBUyxFQUFFLEVBQUU7QUFDYixjQUFVLEVBQUUsRUFBRTtFQUNqQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3JDaEIsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOztzRUFBVCxTQUFTOzs7aUJBQVQsU0FBUzs7dUNBQ0k7QUFDWCxtQkFBTztBQUNILDRCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ3JDLDRCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQ3JDLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ2pDLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2FBQ3BDLENBQUM7U0FDTDs7OzZDQUVvQjtBQUNqQixvQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFFOzs7QUFBQyxBQUc1RSxnQkFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZixnQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3ZDLGdCQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVuRCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkQ7Ozs2Q0FFb0I7QUFDakIsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQixnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCOzs7K0NBRXNCO0FBQ25CLCtCQUFTLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRCxvQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUxQyxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFEOzs7eUNBRWdCLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDN0IsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsZ0JBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0FBRXBDLGdCQUFJLEtBQUssR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTNFLG9CQUFRLEtBQUssQ0FBQyxZQUFZO0FBQzFCLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDaEMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLHlCQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM1QiwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsb0JBQVEsS0FBSyxDQUFDLFVBQVU7QUFDeEIscUJBQUssUUFBUSxDQUFDLE1BQU07QUFDaEIseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNoQywwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVEsQ0FBQyxHQUFHO0FBQ2IseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzVCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7Ozt5Q0FFZ0IsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM3QixnQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN6QixnQkFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUNwQyxnQkFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzdFLGdCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6QyxnQkFBSSxLQUFLLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQzs7QUFFbkMsb0JBQVEsS0FBSyxDQUFDLFlBQVk7QUFDMUIscUJBQUssUUFBUSxDQUFDLEtBQUs7QUFDZix5QkFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQiwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLEdBQUcsT0FBTyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDbkMsMEJBQU07QUFBQSxhQUNUOztBQUVELG9CQUFRLEtBQUssQ0FBQyxVQUFVO0FBQ3hCLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDakMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLHlCQUFLLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztBQUM3QiwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCOzs7NERBRW1DLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzVDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDNUIsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCOztBQUVELGdCQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXZCLGdCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQy9CLGdCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ2pDLGdCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUN2QyxnQkFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFOztBQUNsQiwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNsRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUNuRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs7QUFDZCwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNwRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNyRCxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEVBQUU7O0FBQzFCLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3BELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ25ELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztBQUNkLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2xELDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3JELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2xELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQ3REOztBQUVELG1CQUFPLFdBQVcsQ0FBQztTQUN0Qjs7O3lDQUVnQixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QixxQ0FBbUI7QUFDZixvQkFBSSxDQUFDLEtBQUsscUJBQWUsa0JBQWdCLENBQUMsWUFBTyxDQUFDLFFBQUssQ0FBQzthQUMzRCxNQUFNO0FBQ0gsb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0Isb0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0I7U0FDSjs7O2dDQUVPOzs7QUFDSixnQkFBTSxNQUFNLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFlBQVksV0FBVyxHQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FDakIsbUJBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXpELGdCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxnQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5ELGdCQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFdEYsZ0JBQUksbUJBQW1CLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUNoRSx1QkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFOzJCQUFNLE9BQUssa0JBQWtCLEVBQUU7aUJBQUEsQ0FBQyxDQUFDO2FBQzlFOztBQUVELGdCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7OztrREFFeUIsUUFBUSxFQUFFO0FBQ2hDLGdCQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDOztBQUVwQyxvQkFBUSxRQUFRO0FBQ2hCLHFCQUFLLFFBQVEsQ0FBQyxLQUFLO0FBQ2YsMkJBQU8sT0FBTyxDQUFDOztBQUFBLEFBRW5CLHFCQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLDJCQUFPLFFBQVEsQ0FBQzs7QUFBQSxBQUVwQixxQkFBSyxRQUFRLENBQUMsR0FBRztBQUNiLDJCQUFPLEtBQUssQ0FBQztBQUFBLGFBQ2hCO1NBQ0o7Ozt1Q0FFYzs7O0FBQ1gsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsZ0JBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQzs7QUFFL0MsbUJBQU8sbUJBQVMsTUFBTSxDQUNsQiwrREFBYyxJQUFJLENBQUMsS0FBSztBQUNkLDRCQUFZLEVBQUUsS0FBSyxBQUFDO0FBQ3BCLHlCQUFTLEVBQUU7QUFDVCxnQ0FBWSxFQUFFLElBQUk7aUVBQ00sT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBSyxJQUFJLGlEQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFLLElBQUksK0NBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUssSUFBSSwrQ0FDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBSyxJQUFJLHdCQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLFFBQzlDLEFBQUM7QUFDSCxxQkFBSyxlQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztBQUNuQiw0QkFBUSxFQUFFLFVBQVU7QUFDcEIsdUJBQUcsRUFBRSxLQUFLO0FBQ1Ysd0JBQUksRUFBRSxLQUFLO2tCQUNiLElBQUcsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JCOzs7aUNBRVE7QUFDTCxtQkFDSSwwQ0FBTyxDQUNUO1NBQ0w7OztXQXBNQyxTQUFTOzs7QUF1TWYsU0FBUyxDQUFDLFFBQVEsR0FBRztBQUNqQixTQUFLLEVBQUUsT0FBTztBQUNkLFVBQU0sRUFBRSxRQUFRO0FBQ2hCLE9BQUcsRUFBRSxLQUFLO0NBQ2IsQ0FBQzs7QUFFRixTQUFTLENBQUMsU0FBUyxnQkFDWixtQkFBUyxTQUFTO0FBQ3JCLFVBQU0sRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQzlCLGdCQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQ3ZDLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsYUFBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtLQUNoQyxDQUFDLENBQ0wsQ0FBQztBQUFDLGNBQVU7QUFDYixnQkFBWSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3hCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekIsQ0FBQztBQUNGLGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0Ysa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUM5QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0YsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDOUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3hCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekIsQ0FBQztFQUNMLENBQUM7O0FBRUYsU0FBUyxDQUFDLFlBQVksZ0JBQ2YsbUJBQVMsWUFBWTtBQUN4QixnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUN0QyxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRztBQUNwQyxrQkFBYyxFQUFFLElBQUk7QUFDcEIsY0FBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUNwQyxjQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0VBQ3ZDLENBQUM7O2tCQUVhLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzlQbEIsVUFBVTtjQUFWLFVBQVU7O2FBQVYsVUFBVTs4QkFBVixVQUFVOztzRUFBVixVQUFVOzs7aUJBQVYsVUFBVTs7c0NBQ0U7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDUiwrQ0FBbUIsRUFBRSxJQUFJOzJCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckUsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7aUJBQ2YsQ0FDUjthQUNMO1NBQ0o7Ozt1Q0FFYztBQUNYLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3JCLHVCQUNJLCtEQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQix1QkFBRyxFQUFDLFFBQVE7QUFDWiw2QkFBUyxFQUFFO0FBQ1AsNENBQW9CLEVBQUUsSUFBSTt1QkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3hFLEFBQUM7QUFDSCwyQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLElBQUcsQ0FDNUM7YUFDTDtTQUNKOzs7eUNBRWdCO0FBQ2IsbUJBQ0ksa0RBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0FBQzVCLG1CQUFHLEVBQUMsVUFBVTtBQUNkLHlCQUFTLEVBQUU7QUFDUixpQ0FBYSxFQUFFLElBQUk7QUFDbkIsK0NBQTJCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxXQUFXO21CQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFDM0UsQUFBQztBQUNILG9CQUFJLEVBQUMsY0FBYztBQUNuQixxQkFBSyxlQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssc0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNqRCxJQUFHLENBQ1o7U0FDTDs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDZDQUFxQixFQUFFLElBQUk7dUJBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ2xCLENBQ1I7U0FDTDs7O1dBNURDLFVBQVU7OztBQStEaEIsVUFBVSxDQUFDLFlBQVksR0FBRztBQUN0QixlQUFXLEVBQUUsRUFBRTtBQUNmLGNBQVUsRUFBRSxFQUFFO0FBQ2QsaUJBQWEsRUFBRSxFQUFFO0FBQ2pCLGlCQUFhLEVBQUUsT0FBTztDQUN6QixDQUFDOztBQUVGLFVBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsZUFBVyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2xDLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLGdCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQ3ZCLENBQUM7QUFDRixpQkFBYSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3JDLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDeEMsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkZKLHVCQUF1QjtjQUF2Qix1QkFBdUI7O2FBQXZCLHVCQUF1Qjs4QkFBdkIsdUJBQXVCOztzRUFBdkIsdUJBQXVCOzs7aUJBQXZCLHVCQUF1Qjs7dUNBQ3pCO0FBQ1gsbUJBQU87QUFDSCx3QkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUNoQyxDQUFDO1NBQ0w7OzsyQ0FFa0I7QUFDZixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUM3RDs7O2tEQUV5QixRQUFRLEVBQUU7OztBQUNoQyxnQkFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzNDLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUMsRUFBRTsyQkFBTSxPQUFLLGdCQUFnQixFQUFFO2lCQUFBLENBQUMsQ0FBQzthQUMvRTtTQUNKOzs7c0NBRWE7OztBQUNWLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsRUFBRTt1QkFBTSxPQUFLLGdCQUFnQixFQUFFO2FBQUEsQ0FBQyxDQUFDOztBQUUvRSxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7OztzQ0FFYSxLQUFLLEVBQUU7OztBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPO0FBQ1IseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLEVBQUU7K0JBQU0sT0FBSyxnQkFBZ0IsRUFBRTtxQkFBQSxDQUFDLENBQUM7QUFBQSxhQUNsRjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDeEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLHVCQUFHLEVBQUMsU0FBUztBQUNiLDZCQUFTLEVBQUU7QUFDUix1Q0FBZSxFQUFFLElBQUk7QUFDckIsZ0RBQXdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO3VCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQy9DLEFBQUM7Z0JBQ0o7O2lDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUMxQiwyQkFBRyxFQUFDLFFBQVE7QUFDWixpQ0FBUyxFQUFFO0FBQ1Isa0RBQXNCLEVBQUUsSUFBSTsyQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ3ZFLEFBQUM7QUFDSCwrQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQ3JDLGlDQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDekMsZ0NBQVEsRUFBQyxHQUFHO29CQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDaEI7Z0JBQ047O3NCQUFLLEdBQUcsRUFBQyxTQUFTO0FBQ2IsaUNBQVMsRUFBQyx1QkFBdUI7b0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtpQkFDbEI7YUFDSixDQUNSO1NBQ0w7OztXQWpFZ0IsdUJBQXVCOzs7a0JBQXZCLHVCQUF1Qjs7QUFvRTVDLHVCQUF1QixDQUFDLFNBQVMsR0FBRztBQUNoQyxZQUFRLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixVQUFNLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsVUFBTSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLGVBQVcsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztBQUVGLHVCQUF1QixDQUFDLFlBQVksR0FBRztBQUNuQyxZQUFRLEVBQUUsS0FBSztBQUNmLFlBQVEsZ0JBQU07QUFDZCxVQUFNLGdCQUFNO0FBQ1osZUFBVyxFQUFFLEVBQUU7Q0FDbEIsQ0FBQzs7a0JBRWEsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNwRmhDLE9BQU87Y0FBUCxPQUFPOzthQUFQLE9BQU87OEJBQVAsT0FBTzs7c0VBQVAsT0FBTzs7O2lCQUFQLE9BQU87O3VDQUNNO0FBQ1gsbUJBQU87QUFDSCxrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQzlDLENBQUM7U0FDTDs7O3FDQUVZLEtBQUssRUFBRTtBQUNoQixnQkFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUN0QixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3Qzs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDdEQscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7OztzQ0FFYTtBQUNWLG1CQUNJLG9EQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUN6QixtQkFBRyxFQUFDLE9BQU87QUFDWCxvQkFBSSxFQUFDLE9BQU87QUFDWixrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxBQUFDO0FBQ2xCLHlCQUFTLEVBQUU7QUFDUCw4QkFBVSxFQUFFLElBQUk7QUFDaEIsdUNBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO21CQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdEUsQUFBQztBQUNILG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdEIscUJBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN4Qix1QkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzdCLGdDQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxBQUFDO0FBQzFDLHdCQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsSUFBRyxDQUNuRDtTQUNMOzs7c0NBRWE7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSTs7aUNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLDJCQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUU7QUFDUCw0Q0FBZ0IsRUFBRSxJQUFJOzJCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDdEUsQUFBQztBQUNILCtCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztpQkFDYixDQUNWO2FBQ0w7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNQLDBDQUFrQixFQUFFLElBQUk7dUJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsQUFBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBakVDLE9BQU87OztBQW9FYixPQUFPLENBQUMsU0FBUyxHQUFHO0FBQ2hCLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxTQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdkMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixTQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0NBQzNDLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxnQkFBTTtBQUNoQixZQUFRLEVBQUUsS0FBSztDQUNsQixDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNyRmhCLGtCQUFrQjtjQUFsQixrQkFBa0I7O2FBQWxCLGtCQUFrQjs4QkFBbEIsa0JBQWtCOztzRUFBbEIsa0JBQWtCOzs7aUJBQWxCLGtCQUFrQjs7dUNBQ0w7QUFDWCxnQkFBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixnQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLG9CQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDakIseUJBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDOztBQUVyQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSixDQUFDLENBQUM7O0FBRUgsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCOzs7aUNBRVEsS0FBSyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pDOzs7MkNBRWtCLGtCQUFrQixFQUFFO0FBQ25DLGdCQUFJLElBQUksR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7O0FBRWxDLG1CQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUN0RDs7OytDQUVzQixrQkFBa0IsRUFBRTtBQUN2QyxnQkFBSSxRQUFRLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDOztBQUV0QyxtQkFBTyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ2xFOzs7bUNBRVUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN0QixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixLQUFLLE1BQU0sRUFBRTtBQUM1QyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7YUFDOUM7O0FBRUQsZ0JBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUNyQyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLHNCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7OztvQ0FFVyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFMUMsZ0JBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLHNCQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7OztvQ0FFVyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQzs7QUFFMUUsZ0JBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLHNCQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7OztzQ0FFYSxLQUFLLEVBQUU7QUFDakIsZ0JBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDdEIsZ0JBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7O0FBRXhELGdCQUFJLEdBQUcsS0FBSyxXQUFXLEVBQUU7QUFDckIsb0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDNUQscUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQixNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtBQUM3QixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUN4RCxxQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCLE1BQU0sSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO0FBQ3hCLG9CQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFDckQscUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUM1QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtTQUNKOzs7d0NBRWU7OztBQUNaLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUs7QUFDakQsdUJBQ0k7O2lDQUFTLFVBQVU7QUFDZCw0QkFBSSxFQUFDLE9BQU87QUFDWix3Q0FBYyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxBQUFDO0FBQzFDLDJCQUFHLEVBQUUsVUFBVSxHQUFHLEtBQUssQUFBQztBQUN4QiwyQkFBRyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEFBQUM7QUFDdEIsaUNBQVMsRUFBRSwwQkFBRztBQUNYLHlEQUE2QixFQUFFLElBQUk7QUFDbkMsa0VBQXNDLEVBQUUsVUFBVSxDQUFDLFFBQVE7eUJBQzdELENBQUMsQUFBQztBQUNILGdDQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEFBQUM7QUFDdkMsOEJBQU0sRUFBRSxPQUFLLFVBQVUsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7QUFDL0MsK0JBQU8sRUFBRSxPQUFLLFdBQVcsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7QUFDakQsK0JBQU8sRUFBRSxPQUFLLFdBQVcsQ0FBQyxJQUFJLFNBQU8sVUFBVSxDQUFDLEFBQUM7b0JBQ3JELFVBQVUsQ0FBQyxPQUFPO2lCQUNiLENBQ1I7YUFDTCxDQUFDLENBQUM7U0FDTjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsdUJBQUcsRUFBQyxTQUFTO0FBQ2IscUNBQWMsWUFBWTtBQUMxQiw2QkFBUyxFQUFFO0FBQ1IsOENBQXNCLEVBQUUsSUFBSTt1QkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztnQkFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNwQixDQUNSO1NBQ0w7OztXQXBIQyxrQkFBa0I7OztBQXVIeEIsa0JBQWtCLENBQUMsU0FBUyxHQUFHO0FBQzNCLG9CQUFnQixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFdBQU8sRUFBRSxpQkFBUyxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtBQUM5QyxZQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMxQixtQkFBTyxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQzFEOztBQUVELFlBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQy9DLGdCQUFJLEVBQUUsVUFBVSxJQUFJLE1BQU0sQ0FBQSxBQUFDLEVBQUU7QUFDekIsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSixDQUFDLENBQUM7O0FBRUgsWUFBSSxlQUFlLEVBQUU7QUFDakIsbUJBQU8sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUN2RTs7QUFFRCxZQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM1QyxnQkFBSSxFQUFFLE9BQU8sSUFBSSxNQUFNLENBQUEsQUFBQyxFQUFFO0FBQ3RCLHVCQUFPLElBQUksQ0FBQzthQUNmO1NBQ0osQ0FBQyxDQUFDOztBQUVILFlBQUksWUFBWSxFQUFFO0FBQ2QsbUJBQU8sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNwRTs7QUFFRCxZQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDekIsWUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNoRCxnQkFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ2pCLG9CQUFJLFlBQVksRUFBRTtBQUNkLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUFFRCw0QkFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtTQUNKLENBQUMsQ0FBQzs7QUFFSCxZQUFJLGdCQUFnQixFQUFFO0FBQ2xCLG1CQUFPLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUM7U0FDbEc7S0FDSjtDQUNKLENBQUM7O0FBRUYsa0JBQWtCLENBQUMsWUFBWSxHQUFHO0FBQzlCLFdBQU8sRUFBRSxFQUFFO0FBQ1gsb0JBQWdCLGdCQUFNO0NBQ3pCLENBQUM7O2tCQUVhLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDL0szQixXQUFXO2NBQVgsV0FBVzs7QUFDYixhQURFLFdBQVcsR0FDUTs7OzhCQURuQixXQUFXOzswQ0FDRSxJQUFJO0FBQUosZ0JBQUk7OztvR0FEakIsV0FBVyxtREFFQSxJQUFJOztBQUViLGNBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksT0FBTSxDQUFDOztLQUNsRDs7aUJBTEMsV0FBVzs7b0NBT0QsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDdkIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0o7Ozt3Q0FFZTtBQUNaLGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3RDLHVCQUNJOztzQkFBSyxTQUFTLEVBQUMscUJBQXFCO29CQUNoQzs7MEJBQU0sU0FBUyxFQUFDLDBCQUEwQjt3QkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87cUJBQVE7aUJBQ3BFLENBQ1I7YUFDTDs7QUFFRCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM3Qjs7O2lDQUVRO0FBQ0wsZ0JBQUksUUFBUSxHQUFHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDOztBQUV0RCxtQkFDSTs7a0JBQUssU0FBUyxFQUFDLGVBQWU7QUFDekIseUJBQUssRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxBQUFDO0FBQzVDLHlCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBQyxBQUFDO0FBQ2xFLDJCQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQUFBQztnQkFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNuQixDQUNSO1NBQ0w7OztXQXRDQyxXQUFXOzs7QUF5Q2pCLFdBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsT0FBRyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUM7O2tCQUVhLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCMUIsSUFBTSxTQUFTLEdBQUcsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDekQsUUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRTdCLFdBQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2YsWUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQ2xDLG1CQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2Qjs7QUFFRCxhQUFLLElBQUksQ0FBQyxDQUFDO0tBQ2Q7Q0FDSjs7QUFBQyxJQUVJLE9BQU87Y0FBUCxPQUFPOztBQUNULGFBREUsT0FBTyxHQUNZOzs7OEJBRG5CLE9BQU87OzBDQUNNLElBQUk7QUFBSixnQkFBSTs7O29HQURqQixPQUFPLG1EQUVJLElBQUk7O0FBRWIsY0FBSyxjQUFjLEdBQUcsTUFBSyxjQUFjLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDckQsY0FBSyxhQUFhLEdBQUcsTUFBSyxhQUFhLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDbkQsY0FBSyxjQUFjLEdBQUcsTUFBSyxjQUFjLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDckQsY0FBSyxhQUFhLEdBQUcsTUFBSyxhQUFhLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDbkQsY0FBSyxnQkFBZ0IsR0FBRyxNQUFLLGdCQUFnQixDQUFDLElBQUksT0FBTSxDQUFDOztBQUV6RCxjQUFLLHdCQUF3QixHQUFHLE1BQUssd0JBQXdCLENBQUMsSUFBSSxPQUFNLENBQUM7QUFDekUsY0FBSyx3QkFBd0IsR0FBRyxNQUFLLHdCQUF3QixDQUFDLElBQUksT0FBTSxDQUFDO0FBQ3pFLGNBQUsscUJBQXFCLEdBQUcsTUFBSyxxQkFBcUIsQ0FBQyxJQUFJLE9BQU0sQ0FBQzs7S0FDdEU7O2lCQWJDLE9BQU87O3VDQWVNO0FBQ1gsbUJBQU87QUFDSCxnQ0FBZ0IsRUFBRSxFQUFFO0FBQ3BCLDJCQUFXLEVBQUUsSUFBSTtBQUNqQixxQ0FBcUIsRUFBRSxDQUFDLENBQUM7QUFDekIsb0JBQUksRUFBRSxDQUFDO0FBQ0gsd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUIsNEJBQVEsRUFBRSxDQUFDO0FBQ1gscUJBQUMsRUFBRSxDQUFDO2lCQUNQLENBQUM7QUFDRiw4QkFBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25CLHVCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxnQ0FBZ0IsRUFBRSxJQUFJO0FBQ3RCLGdDQUFnQixFQUFFLElBQUk7YUFDekIsQ0FBQztTQUNMOzs7NENBRW1CO0FBQ2hCLGdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQy9CLGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQzs7O0FBQUMsQUFHNUIsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzNCLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLGdCQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO0FBQzNDLGdCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDOztBQUU5QixnQkFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7OztnREFFdUI7O0FBRXBCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7NkNBRW9CO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsRUFBRTtBQUNsRSxvQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFakYsb0JBQUksSUFBSSxFQUFFO0FBQ04sd0JBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7OztBQUFDLEFBR2hELHdCQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0Qsd0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDOUQ7YUFDSjtTQUNKOzs7b0RBRTJCO0FBQ3hCLGdCQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRXBFLG1CQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUM1Qjs7O29EQUUyQjtBQUN4QixnQkFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7QUFFbkQsbUJBQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQzVCOzs7NENBRW1CO0FBQ2hCLGdCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRSxnQkFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZFLGdCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7O0FBQUMsQUFLcEMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUM7QUFDckQsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7O0FBRW5ELGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRS9FLGdCQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOztBQUV0QyxnQkFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7O0FBRS9DLGdCQUFJLENBQUMsbUJBQW1CLEdBQUssSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLEdBQ2hDLENBQUMsR0FDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQzs7QUFFOUQsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxBQUFDLENBQUM7O0FBRWpGLGdCQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNqRixvQ0FDTyxNQUFNO0FBQ1QseUJBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQzttQkFDdEU7YUFDTCxDQUFDLENBQUM7O0FBRUgsZ0JBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixnQkFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUUxQixpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1Qyw2QkFBYSxDQUFDLElBQUksQ0FBQztBQUNmLHdCQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFCLDRCQUFRLEVBQUUsQ0FBQztBQUNYLHFCQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDO2lCQUN6QixDQUFDLENBQUM7O0FBRUgsOEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDViwyQkFBVyxFQUFFLEtBQUs7QUFDbEIsdUJBQU8sRUFBRSxlQUFlO0FBQ3hCLG9CQUFJLEVBQUUsYUFBYTtBQUNuQiw4QkFBYyxFQUFFLGNBQWM7QUFDOUIsZ0NBQWdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO0FBQ2xELGdDQUFnQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRTthQUNyRCxDQUFDLENBQUM7U0FDTjs7OzJDQUVrQjtBQUNmLGdCQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQ3pDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQyx1QkFBTzthQUNWOzs7O0FBQUEsQUFJRCxnQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FDNUQsQ0FBQzs7QUFFRixnQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7QUFFbkUsb0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3JFOztBQUVELGdCQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUU7QUFDN0Isb0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7O0FBRTlDLHdCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRXJFLHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzVELHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUU1RCx3QkFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7QUFDNUMsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDOztBQUUxQyx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQ2hEOztBQUVELG9CQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUU7O0FBRTdCLHdCQUFJLENBQUMsOEJBQThCLEdBQUcsQ0FBQyxDQUFDOztBQUV4Qyx5QkFBSyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDaEcsNEJBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7O0FBRWhFLDRCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztBQUN4Ryw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RSw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDeEQsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRW5FLDRCQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztxQkFDckU7O0FBRUQsd0JBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO0FBQzlDLHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzs7QUFFNUMsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDOUQsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTlELHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKOzs7eUNBRWdCO0FBQ2IsZ0JBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzVELHVCQUFPO2FBQ1Y7Ozs7QUFBQSxBQUlELGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUM1RCxDQUFDOztBQUVGLGdCQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtBQUNsRCxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDaEQ7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtBQUM3QixvQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTs7QUFFOUMsd0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7QUFFckUsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUQsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTVELHdCQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1Qyx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7O0FBRTFDLHdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDaEQ7O0FBRUQsb0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTs7QUFFN0Isd0JBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUUzRSx5QkFBSyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDaEcsNEJBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDOztBQUV0RSw0QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7QUFDeEcsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDdkUsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELDRCQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUVuRSw0QkFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQ3RFOztBQUVELHdCQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztBQUM5Qyx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7O0FBRTVDLHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzlELHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUU5RCx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQzFDO2FBQ0o7U0FDSjs7O3lDQUVnQixLQUFLLEVBQUU7QUFDcEIsaUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFdkIsZ0JBQUksQUFBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFDdEMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUM3QyxJQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDbEQsdUJBQU87YUFDVjs7O0FBQUEsQUFHRCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7QUFFeEUsZ0JBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtBQUM5QyxvQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7YUFDekM7O0FBRUQsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRXhFLGdCQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM1QixvQkFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0IsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNuQyxvQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNsQixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ3RDLG9CQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDakM7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQzlCLG9CQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLHFCQUFlLG9CQUFrQixJQUFJLENBQUMsS0FBSyxrQkFBZSxDQUFDO2FBQ2xGOzs7QUFBQSxBQUdELGdCQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLHFCQUFlLG9CQUFrQixJQUFJLENBQUMsS0FBSyxZQUFPLElBQUksQ0FBQyxLQUFLLGFBQVU7OztBQUFDLEFBRzNGLGdCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLHFCQUFlLG9CQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWUsQ0FBQzs7QUFFakcsZ0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxBQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQzs7QUFFN0YsZ0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUM5RSxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoRjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxxQkFBZSx5QkFBdUIsSUFBSSxDQUFDLGtCQUFrQixhQUFVLENBQUM7O0FBRXBHLGdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM5Qjs7OzJDQUVrQixLQUFLLEVBQUU7OztBQUN0QixnQkFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ2IsdUJBQU87YUFDVjs7QUFFRCxnQkFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLGdCQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7O0FBRXRCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVLEVBQUk7QUFDNUMsb0JBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxPQUFLLHNCQUFzQixDQUFDLE9BQU8sRUFBRTtBQUM1RCxpQ0FBYSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUM7O0FBRWxDLDJCQUFPLFVBQVUsQ0FBQztpQkFDckI7Ozs7QUFBQSxBQUlELG9CQUFPLGFBQWEsR0FBRyxDQUFDLElBQ2pCLENBQUMsS0FBSyxDQUFDLE9BQUssa0JBQWtCLENBQUMsSUFDL0IsVUFBVSxDQUFDLEtBQUssR0FBRyxhQUFhLEdBQUcsT0FBSyxrQkFBa0IsRUFBRTtBQUMzRCxpQ0FBYSxHQUFHLE9BQUssa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDbEUsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQUssa0JBQWtCLENBQUMsSUFDNUIsVUFBVSxDQUFDLEtBQUssR0FBRyxhQUFhLEdBQUcsT0FBSyxrQkFBa0IsRUFBRTtBQUN0RSxpQ0FBYSxHQUFHLE9BQUssa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDOUQ7O0FBRUQsNkJBQWEsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQzs7QUFFbEQsb0NBQ08sVUFBVTtBQUNiLHlCQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxhQUFhO21CQUN6QzthQUNMLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxhQUFhLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUN0QyxvQkFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQzthQUNoQyxNQUFNO0FBQ0gsb0JBQUksQ0FBQyxtQkFBbUIsSUFBSSxhQUFhLENBQUM7YUFDN0M7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVix1QkFBTyxFQUFFLElBQUk7QUFDYixnQ0FBZ0IsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUU7YUFDckQsRUFBRSxZQUFNOzs7QUFHTCxvQkFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO0FBQ25CLDJCQUFLLGdCQUFnQixDQUFDO0FBQ2xCLDhCQUFNLEVBQUUsYUFBYTtBQUNyQiw4QkFBTSxFQUFFLENBQUM7QUFDVCxzQ0FBYyxnQkFBTTtxQkFDdkIsQ0FBQyxDQUFDO2lCQUNOO2FBQ0osQ0FBQyxDQUFDO1NBQ047Ozs4Q0FFcUIsS0FBSyxFQUFFO0FBQ3pCLGdCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLG9CQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDakMsb0JBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7YUFDcEc7U0FDSjs7O2lEQUV3QixLQUFLLEVBQUU7QUFDNUIsZ0JBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDcEIsb0JBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUNqQyxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzthQUNsQztTQUNKOzs7aURBRXdCLEtBQUssRUFBRTtBQUM1QixnQkFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixvQkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ2pDLG9CQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2FBQ2xDO1NBQ0o7Ozt1Q0FFYyxLQUFLLEVBQUU7QUFDbEIsZ0JBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDcEIsb0JBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO0FBQzdCLHdCQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTFELHdCQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3BDOztBQUVELG9CQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUN6Qix3QkFBSSxDQUFDLGdCQUFnQixDQUFDO0FBQ2xCLDhCQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztBQUN4Qyw4QkFBTSxFQUFFLENBQUM7QUFDVCxzQ0FBYyxnQkFBTTtxQkFDdkIsQ0FBQyxDQUFDOztBQUVILHdCQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3BDOztBQUVELG9CQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUN6Qix3QkFBSSxDQUFDLGdCQUFnQixDQUFDO0FBQ2xCLDhCQUFNLEVBQUUsQ0FBQztBQUNULDhCQUFNLEVBQUUsQUFBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQSxHQUFJLElBQUksQ0FBQyxlQUFlLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7QUFDNUcsc0NBQWMsZ0JBQU07cUJBQ3ZCLENBQUMsQ0FBQzs7QUFFSCx3QkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNwQzthQUNKO1NBQ0o7Ozt3Q0FFZTtBQUNaLGdCQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtBQUM3QixvQkFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzthQUN0Qzs7QUFFRCxnQkFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsb0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7YUFDbkM7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQ3pCLG9CQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2FBQ25DO1NBQ0o7Ozt1Q0FFYyxLQUFLLEVBQUUsY0FBYyxFQUFFO0FBQ2xDLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzFCLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuRDs7QUFFRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLHFDQUFxQixFQUFFLFNBQVMsQ0FDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FDMUMsQ0FBQyxRQUFRO2FBQ2IsQ0FBQyxDQUFDO1NBQ047OztxQ0FFWTs7O0FBQ1QsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUssRUFBSztBQUN2Qyx1QkFDSSwrQ0FBSyxHQUFHLEVBQUUsS0FBSyxBQUFDO0FBQ1gsMEJBQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxLQUFLLE9BQUssS0FBSyxDQUFDLHFCQUFxQixBQUFDO0FBQzFELDJCQUFPLEVBQUUsT0FBSyxLQUFLLENBQUMsT0FBTyxBQUFDO0FBQzVCLHdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQUFBQztBQUNmLHdCQUFJLEVBQUUsQUFBQyxHQUFHLENBQUMsUUFBUSxHQUFJLENBQUMsS0FBSyxDQUFDLEFBQUM7QUFDL0IscUJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxBQUFDO0FBQ1QsOEJBQVUsRUFBRSxPQUFLLGNBQWMsQUFBQztBQUNoQyxrQ0FBYyxFQUFFLE9BQUssS0FBSyxDQUFDLGNBQWMsQUFBQyxHQUFHLENBQ3BEO2FBQ0wsQ0FBQyxDQUFDO1NBQ047OztxQ0FFWTtBQUNULG1CQUNJOztrQkFBSyxHQUFHLEVBQUMsTUFBTTtBQUNWLDZCQUFTLEVBQUMsZUFBZTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRTthQUNoQixDQUNSO1NBQ0w7OztxQ0FFWTs7O0FBQ1QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUN6Qix1QkFDSTs7c0JBQUssR0FBRyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsaUJBQWlCO29CQUN2Qzs7MEJBQUssU0FBUyxFQUFDLGtDQUFrQzt3QkFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUssRUFBSztBQUN2QyxtQ0FDSTs7a0NBQUssR0FBRyxFQUFFLEtBQUssQUFBQztBQUNYLDZDQUFTLEVBQUMsb0NBQW9DO0FBQzlDLHlDQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksRUFBQyxBQUFDO2dDQUN4RTs7c0NBQUssU0FBUyxFQUFDLHFCQUFxQjtvQ0FDaEM7OzBDQUFNLFNBQVMsRUFBQywwQkFBMEI7d0NBQUUsTUFBTSxDQUFDLEtBQUs7cUNBQVE7aUNBQzlEO2dDQUNOLHVDQUFLLFNBQVMsRUFBQyxvQ0FBb0M7QUFDOUMseURBQW1CLEtBQUssQUFBQztBQUN6QiwrQ0FBVyxFQUFFLE9BQUsscUJBQXFCLEFBQUMsR0FBRzs2QkFDOUMsQ0FDUjt5QkFDTCxDQUFDO3FCQUNBO2lCQUNKLENBQ1I7YUFDTDtTQUNKOzs7MkNBRWtCO0FBQ2YsbUJBQ0k7OztnQkFDSTs7c0JBQUssU0FBUyxFQUFDLHFCQUFxQjtBQUMvQixtQ0FBVyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQUFBQztvQkFDNUMsdUNBQUssR0FBRyxFQUFDLGNBQWM7QUFDbEIsaUNBQVMsRUFBQyx5QkFBeUI7QUFDbkMsNkJBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFDLEFBQUMsR0FBRztpQkFDbEQ7Z0JBQ047O3NCQUFLLFNBQVMsRUFBQyxxQkFBcUI7QUFDL0IsbUNBQVcsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEFBQUM7b0JBQzVDLHVDQUFLLEdBQUcsRUFBQyxjQUFjO0FBQ2xCLGlDQUFTLEVBQUMseUJBQXlCO0FBQ25DLDZCQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQyxBQUFDLEdBQUc7aUJBQ25EO2FBQ0osQ0FDUjtTQUNMOzs7d0NBRWUsS0FBSyxFQUFFOzs7QUFDbkIsZ0JBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUM7O0FBRTVHLGdCQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtBQUMxQixvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLG9DQUFnQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQzlFLHlDQUFxQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRO2lCQUMzRCxDQUFDLENBQUM7O0FBRUgsb0JBQ08sQUFBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUMvRCxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVU7QUFBQyxrQkFDaEk7O0FBQ0UsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQixrQ0FBTSxFQUFFLENBQUM7QUFDVCxrQ0FBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSztBQUMvQiwwQ0FBYyxnQkFBTTt5QkFDdkIsQ0FBQyxDQUFDO3FCQUNOO2FBQ0osTUFBTSxJQUFPLEFBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUNwRCxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsRUFBRTs7Ozs7QUFLcEYsb0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQiwwQkFBTSxFQUFFLENBQUM7QUFDVCwwQkFBTSxFQUFFLENBQUksQUFBSyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFDMUQsQ0FBSyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQSxHQUMzRCxLQUFLLENBQUEsR0FBSSxJQUFJLENBQUMsVUFBVTtBQUNuQyxrQ0FBYyxnQkFBTTtpQkFDdkIsQ0FBQzs7O0FBQUMsQUFHSCxzQkFBTSxDQUFDLHFCQUFxQixDQUFDOzJCQUFNLE9BQUssZUFBZSxDQUFDLEtBQUssQ0FBQztpQkFBQSxDQUFDLENBQUM7YUFDbkU7O0FBRUQsZ0JBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7OztnREFFdUI7QUFDcEIsZ0JBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztBQUVuRixnQkFBSSxHQUFHLEVBQUU7QUFDTCxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLG9DQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUMvQywrQkFBVSxNQUFNLENBQUMsS0FBSyxVQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFHO3FCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDaEIsQ0FBQyxDQUFDO2FBQ047U0FDSjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssU0FBUztBQUNWLHdCQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIseUJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssT0FBTztBQUNSLHdCQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUM3Qix5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUM1QyxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtTQUNKOzs7NkNBRW9CO0FBQ2pCLG1CQUNJOztrQkFBSyxHQUFHLEVBQUMsTUFBTTtBQUNWLDZCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDckMsaUNBQVUsUUFBUTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7YUFDMUIsQ0FDUjtTQUNMOzs7aUNBRVE7QUFDTCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1IsMENBQWtCLEVBQUUsSUFBSTt1QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMvQyxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDO0FBQzlCLCtCQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQUFBQztBQUNqQyw2QkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7QUFDOUIsMkJBQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDL0IsNEJBQVEsRUFBQyxHQUFHO2dCQUNiOztzQkFBSyxHQUFHLEVBQUMsT0FBTztBQUNYLGlDQUFTLEVBQUMsVUFBVTtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRTtpQkFDaEI7Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7YUFDdEIsQ0FDUjtTQUNMOzs7V0FwbUJDLE9BQU87OztBQXVtQmIsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNoQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDNUIsZ0JBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixlQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDL0IsaUJBQVMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixhQUFLLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsYUFBSyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0tBQ2hDLENBQUMsQ0FDTDtBQUNELFVBQU0sRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsaUJBQWEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxhQUFTLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDcEMsQ0FBQzs7QUFFRixPQUFPLENBQUMsWUFBWSxHQUFHO0FBQ25CLFdBQU8sRUFBRSxFQUFFO0FBQ1gsVUFBTSxnQkFBTTtBQUNaLGtCQUFjLEVBQUUsY0FBYztDQUNqQyxDQUFDOztrQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbnFCaEIsVUFBVTtjQUFWLFVBQVU7O0FBQ1osYUFERSxVQUFVLEdBQ1M7Ozs4QkFEbkIsVUFBVTs7MENBQ0csSUFBSTtBQUFKLGdCQUFJOzs7b0dBRGpCLFVBQVUsbURBRUMsSUFBSTs7QUFFYixjQUFLLFdBQVcsR0FBRyxNQUFLLFdBQVcsQ0FBQyxJQUFJLE9BQU0sQ0FBQzs7S0FDbEQ7O2lCQUxDLFVBQVU7O3VDQU9HO0FBQ1gsbUJBQU87QUFDSCxvQkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QixDQUFDO1NBQ0w7OztrREFFeUIsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7QUFDcEMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDM0M7U0FDSjs7O2dEQUV1QjtBQUNwQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7O29EQUUyQjtBQUN4QixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxPQUFPLEVBQUU7QUFDcEMsb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLFNBQVMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMvRCx3QkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDN0IsNEJBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztxQkFDaEM7QUFBQSxpQkFDSixDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDSjs7OzRDQUVtQjtBQUNoQixnQkFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDcEM7Ozs2Q0FFb0I7QUFDakIsZ0JBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3BDOzs7cUNBRVk7QUFDVCxnQkFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDOztBQUU3QixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQix1QkFBTyxJQUFJLG9CQUFvQixDQUFDO2FBQ25DLE1BQU07QUFDSCx1QkFBTyxJQUFJLG1CQUFtQixDQUFDO2FBQ2xDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sRUFBRTtBQUNwQyx1QkFBTyxJQUFJLHVCQUF1QixDQUFDO2FBQ3RDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ25CLHVCQUFPLElBQUksc0JBQXNCLENBQUM7YUFDckM7O0FBRUQsbUJBQU8sT0FBTyxDQUFDO1NBQ2xCOzs7c0NBRWE7OztBQUNWLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxPQUFPLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOztBQUVyRSxnQkFBSSxJQUFJLEVBQUU7QUFDTix1QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFLO0FBQ2pELDJCQUNJLGdEQUFNLEdBQUcsRUFBRSxLQUFLLEFBQUM7QUFDWCwrQkFBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEFBQUM7QUFDbEMsNkJBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxBQUFDO0FBQ3hCLGtDQUFVLEVBQUUsT0FBSyxLQUFLLENBQUMsY0FBYyxBQUFDO0FBQ3RDLDJCQUFHLEVBQUUsT0FBSyxLQUFLLENBQUMsSUFBSSxBQUFDLEdBQUcsQ0FDaEM7aUJBQ0wsQ0FBQyxDQUFDO2FBQ047U0FDSjs7O29DQUVXLEtBQUssRUFBRTtBQUNmLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3ZCLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pEO1NBQ0o7OztpQ0FFUTtBQUNMLG1CQUNJOztrQkFBSyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxBQUFDO0FBQzdCLHlCQUFLLDJDQUNpQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMseUJBQ1EsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUNoQyxJQUFJLENBQ3hCO0FBQ0YsMkJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2pCLENBQ1I7U0FDTDs7O1dBaEdDLFVBQVU7OztBQW1HaEIsVUFBVSxDQUFDLFNBQVMsR0FBRztBQUNuQixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLEtBQUs7QUFDOUIsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFCLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixrQkFBYyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLGNBQVUsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxLQUFDLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDNUIsQ0FBQzs7a0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEd6QixJQUFNLEtBQUssR0FBRyxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUM1QyxXQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQixDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQzFDLFdBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7QUFFRixJQUFNLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFDLFNBQVMsRUFBbUI7c0NBQWQsWUFBWTtBQUFaLG9CQUFZOzs7QUFDcEUsV0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUM5QyxlQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7SUFFSSxnQkFBZ0I7Y0FBaEIsZ0JBQWdCOzthQUFoQixnQkFBZ0I7OEJBQWhCLGdCQUFnQjs7c0VBQWhCLGdCQUFnQjs7O2lCQUFoQixnQkFBZ0I7O3VDQUNIO0FBQ1gsbUJBQU87QUFDSCw4Q0FBOEIsRUFBRSxFQUFFO0FBQ2xDLHNDQUFzQixFQUFFLEVBQUU7YUFDN0IsQ0FBQztTQUNMOzs7MkNBRWtCLFNBQVMsRUFBRSxTQUFTLEVBQUU7OztBQUNyQyxnQkFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLHNCQUFzQixDQUFDO0FBQ3ZELGdCQUFJLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQztBQUN2RSxnQkFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztBQUN2RCxnQkFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDOztBQUV2RSxnQkFBSSxlQUFlLEtBQUssY0FBYyxFQUFFO0FBQ3BDLG9CQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FDcEIsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzsyQkFBSSxPQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUFBLENBQUMsQ0FDbEUsQ0FBQzthQUNMOztBQUVELGdCQUFJLHVCQUF1QixLQUFLLHNCQUFzQixFQUFFOztBQUNwRCxvQkFBSSxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3JDLDJCQUFPO2lCQUNWLE1BQU0sSUFBTyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUNuQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsZ0NBQUEsRUFBa0M7QUFDcEcsNEJBQUksQ0FBQyxJQUFJLFlBQVUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDM0QsTUFBTSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxpQ0FBQSxFQUFtQztBQUN4Ryw0QkFBSSxDQUFDLElBQUksWUFBVSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUM5RDthQUNKO1NBQ0o7Ozs2Q0FFb0IsS0FBSyxFQUFFO0FBQ3hCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3pELG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzVGO1NBQ0o7Ozt5Q0FFZ0IsS0FBSyxFQUFFO0FBQ3BCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsOEJBQThCLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzs7QUFFcEQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3JELHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QztTQUNKOzs7NENBRW1CLE1BQU0sRUFBRTtBQUN4QixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztBQUN6RCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7QUFFaEQsZ0JBQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQ3JCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDdkM7QUFBTyxhQUNWOztBQUVELGdCQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztBQUN2QixvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNsRCxDQUFDLENBQUM7YUFDTixNQUFNOztBQUNILG9CQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFbEUsb0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixrREFBOEIsRUFBRSxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7aUJBQzlGLENBQUMsQ0FBQzthQUNOO1NBQ0o7Ozt3Q0FFZSxNQUFNLEVBQUU7QUFDcEIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUM7QUFDekQsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7O0FBRWhELGdCQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3ZCLHVCQUFPO2FBQ1Y7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNsQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLEVBQUU7aUJBQ3JDLENBQUMsQ0FBQzs7QUFFSCxvQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDcEMsTUFBTTtBQUNILG9CQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFN0Qsb0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixrREFBOEIsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztpQkFDcEYsQ0FBQyxDQUFDO2FBQ047U0FDSjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsMEJBQU07O0FBQUEsQUFFVixxQkFBSyxZQUFZO0FBQ2Isd0JBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLDBCQUFNOztBQUFBLEFBRVYscUJBQUssV0FBVztBQUNaLHdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFFO0FBQ2xELDZCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsNEJBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixrREFBc0IsRUFBRSxPQUFPLG1CQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLDRCQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLEdBQUM7QUFDaEgsMERBQThCLEVBQUUsRUFBRTt5QkFDckMsQ0FBQyxDQUFDOztBQUVILDRCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDcEM7O0FBRUQsMEJBQU07QUFBQSxhQUNUOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzVDLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7Ozs4Q0FFcUIsS0FBSyxFQUFFO0FBQ3pCLGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysc0NBQXNCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDO0FBQ3pFLDhDQUE4QixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQzthQUM1RixDQUFDLENBQUM7U0FDTjs7O3lDQUVnQixLQUFLLEVBQUU7QUFDcEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDM0IsdUJBQ0ksdUNBQUssU0FBUyxFQUFDLDJCQUEyQjtBQUNyQywyQkFBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxBQUFDLEdBQUcsQ0FDaEU7YUFDTDtTQUNKOzs7MENBRWlCLEtBQUssRUFBRTtBQUNyQixnQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDL0QsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3pELG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysa0RBQThCLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQzFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7OzsyQ0FFa0IsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUM3QixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPLENBQUM7QUFDYixxQkFBSyxPQUFPO0FBQ1Isd0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUFBLGFBQ2pDO1NBQ0o7Ozt1Q0FFYzs7O0FBQ1gsbUJBQ0k7O2tCQUFLLFNBQVMsRUFBQyxzQkFBc0I7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQzVDLDJCQUNJOzswQkFBSyxHQUFHLGFBQVcsS0FBSyxBQUFHO0FBQ3RCLCtCQUFHLEVBQUUsS0FBSyxBQUFDO0FBQ1gscUNBQVMsRUFBRSwwQkFBRztBQUNYLHFEQUFxQixFQUFFLElBQUk7QUFDM0IsOERBQThCLEVBQUUsT0FBSyxLQUFLLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDakcsQ0FBQyxBQUFDO0FBQ0gsbUNBQU8sRUFBRSxPQUFLLGlCQUFpQixDQUFDLElBQUksU0FBTyxLQUFLLENBQUMsQUFBQztBQUNsRCxxQ0FBUyxFQUFFLE9BQUssa0JBQWtCLENBQUMsSUFBSSxTQUFPLEtBQUssQ0FBQyxBQUFDO0FBQ3JELG9DQUFRLEVBQUMsR0FBRzt3QkFDWixPQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzt3QkFDbEMsT0FBSyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7cUJBQzNCLENBQ1I7aUJBQ0wsQ0FBQzthQUNBLENBQ1I7U0FDTDs7O2lDQUVROzs7QUFDTCxnQkFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBaUIsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUMvRSxxQkFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU3Qix1QkFBTyxLQUFLLENBQUM7YUFDaEIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxtQkFDSTs7NkJBQVMsSUFBSSxDQUFDLEtBQUs7QUFDZCx1QkFBRyxFQUFDLFNBQVM7QUFDYiw2QkFBUyxFQUFFO0FBQ1AsK0NBQXVCLEVBQUUsSUFBSTt1QkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNoRCxBQUFDO0FBQ0gsNkJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztnQkFDekMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFFcEIsdUVBQXNCLFdBQVc7QUFDZix1QkFBRyxFQUFDLFdBQVc7QUFDZiw2QkFBUyxFQUFDLGVBQWU7QUFDekIsb0NBQWdCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUN2RCwyQkFBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDMUMsZ0RBQTRCLEVBQUUsSUFBSSxBQUFDLElBQUc7YUFDdEQsQ0FDUjtTQUNMOzs7V0EzTUMsZ0JBQWdCOzs7QUE4TXRCLGdCQUFnQixDQUFDLFNBQVMsZ0JBQ25CLDJCQUFpQixTQUFTO0FBQzdCLGlCQUFhLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsa0JBQWMsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtFQUN2QyxDQUFDOztBQUVGLGdCQUFnQixDQUFDLFlBQVksZ0JBQ3RCLDJCQUFpQixZQUFZO0FBQ2hDLGlCQUFhLGdCQUFNO0FBQ25CLGtCQUFjLEVBQUUsSUFBSTtFQUN2QixDQUFDOztrQkFFYSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3pPekIsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOztzRUFBVCxTQUFTOzs7aUJBQVQsU0FBUzs7aUNBQ0Y7QUFDTCxnQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7O0FBRXJDLG1CQUNJOzs2QkFBUyxJQUFJLENBQUMsS0FBSztBQUNkLDZCQUFTLEVBQUU7QUFDUCxvQ0FBWSxFQUFFLElBQUk7QUFDbEIsbURBQTJCLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUNsRSxtREFBMkIsRUFBRSxRQUFRLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0FBQ2xFLG9EQUE0QixFQUFFLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU07QUFDcEUsbURBQTJCLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSzt1QkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNoRCxBQUFDO0FBQ0gsb0NBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDOUIsa0NBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztnQkFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2FBQ2xCLENBQ1I7U0FDTDs7O1dBbkJDLFNBQVM7OztBQXNCZixTQUFTLENBQUMsUUFBUSxHQUFHO0FBQ2pCLFNBQUssRUFBRSxPQUFPO0FBQ2QsU0FBSyxFQUFFLE9BQU87QUFDZCxVQUFNLEVBQUUsUUFBUTtBQUNoQixTQUFLLEVBQUUsT0FBTztDQUNqQixDQUFDOztBQUVGLFNBQVMsQ0FBQyxTQUFTLEdBQUc7QUFDbEIsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEUsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQy9CLENBQUM7O0FBRUYsU0FBUyxDQUFDLFlBQVksR0FBRztBQUNyQixZQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0NBQ3JDLENBQUM7O2tCQUVhLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3RDbEIsZ0JBQWdCO2NBQWhCLGdCQUFnQjs7YUFBaEIsZ0JBQWdCOzhCQUFoQixnQkFBZ0I7O3NFQUFoQixnQkFBZ0I7OztpQkFBaEIsZ0JBQWdCOzt1Q0FDSDtBQUNYLG1CQUFPO0FBQ0gsa0NBQWtCLEVBQUUsRUFBRTtBQUN0QixtQ0FBbUIsRUFBRSxDQUFDLENBQUM7QUFDdkIsa0JBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQ2xCLENBQUM7U0FDTDs7OzZDQUVvQjtBQUNqQixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUN6QixvQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2hEO1NBQ0o7OztrREFFeUIsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDNUMsb0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7OzttREFFMEI7QUFDdkIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFakUsbUJBQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ3ZDOzs7NkNBRW9CO0FBQ2pCLG1CQUNJOztrQkFBSyxHQUFHLEVBQUMsTUFBTTtBQUNWLHNCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDbEIsNkJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQztBQUNyQyxpQ0FBVSxRQUFRO2dCQUNsQixJQUFJLENBQUMsd0JBQXdCLEVBQUU7YUFDOUIsQ0FDUjtTQUNMOzs7cUNBRVk7QUFDVCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQixvQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDcEMsb0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzFDLG9CQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLG9CQUFPLEdBQUcsSUFDSCxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1RCw2QkFBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNoRTs7QUFFRCx1QkFDSSxvREFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDeEIsdUJBQUcsRUFBQyxNQUFNO0FBQ1Ysd0JBQUksRUFBQyxNQUFNO0FBQ1gsNkJBQVMsRUFBRTtBQUNQLDJDQUFtQixFQUFFLElBQUk7dUJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUNwRSxBQUFDO0FBQ0gseUJBQUssRUFBRSxTQUFTLEFBQUM7QUFDakIsNEJBQVEsRUFBRSxJQUFJLEFBQUM7QUFDZiw0QkFBUSxFQUFDLElBQUksSUFBRyxDQUN6QjthQUNMO1NBQ0o7Ozt5Q0FFZ0IsS0FBSyxFQUFFOzs7QUFDcEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUMsRUFBRTt1QkFBTSxPQUFLLDBCQUEwQixFQUFFO2FBQUEsQ0FBQyxDQUFDO1NBQ3hGOzs7MkNBRWtCLGFBQWEsRUFBRSxTQUFTLEVBQUU7QUFDekMsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDckIsdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hEOztBQUVELGdCQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDeEMsZ0JBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEUsZ0JBQUksUUFBUSxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDOztBQUU3QyxtQkFBTyxDQUNIOztrQkFBTSxHQUFHLEVBQUMsR0FBRztnQkFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7YUFBUSxFQUN6RDs7a0JBQU0sR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsOEJBQThCO2dCQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzthQUFRLEVBQ3pHOztrQkFBTSxHQUFHLEVBQUMsR0FBRztnQkFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUFRLENBQ3ZELENBQUM7U0FDTDs7O3dDQUVlOzs7QUFDWixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtBQUN0Qyx1QkFDSTs7aUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7QUFDaEMsMkJBQUcsRUFBQyxTQUFTO0FBQ2IsaUNBQVMsRUFBRTtBQUNQLHdEQUE0QixFQUFFLElBQUk7MkJBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFDcEYsQUFBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN4Qyw0QkFBSSxNQUFNLEdBQUcsT0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV4QywrQkFDSTs7eUNBQVMsTUFBTTtBQUNWLHlDQUFTLEVBQUU7QUFDUCx3REFBb0IsRUFBRSxJQUFJO0FBQzFCLGlFQUE2QixFQUFFLE9BQUssS0FBSyxDQUFDLG1CQUFtQixLQUFLLEtBQUs7bUNBQ3RFLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQ3hDLEFBQUM7QUFDSCxtQ0FBRyxFQUFFLE9BQUssZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQUFBQztBQUMxQyx1Q0FBTyxFQUFFLE9BQUssZ0JBQWdCLENBQUMsSUFBSSxTQUFPLEtBQUssQ0FBQyxBQUFDOzRCQUNqRCxPQUFLLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDO3lCQUM1RCxDQUNSO3FCQUNMLENBQUM7aUJBQ0EsQ0FDUjthQUNMO1NBQ0o7OztvQ0FFVyxLQUFLLEVBQUU7QUFDZixnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUM1QyxnQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxnQkFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDOztBQUV4RSxnQkFBSSxZQUFZLEVBQUU7QUFDZCxvQkFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO0FBQ2YsNkJBQVMsR0FBRyxZQUFZLEdBQUcsQ0FBQztBQUFDLGlCQUNoQyxNQUFNLElBQUksU0FBUyxJQUFJLFlBQVksRUFBRTtBQUNsQyxpQ0FBUyxHQUFHLENBQUM7QUFBQyxxQkFDakI7O0FBRUQsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1NBQ0o7Ozt1Q0FFYztBQUNYLGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsbUNBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLGtDQUFrQixFQUFFLEVBQUU7YUFDekIsQ0FBQyxDQUFDO1NBQ047Ozt1Q0FFYztBQUNYLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzFCOzs7cUNBRVk7QUFDVCxnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9COzs7aUNBRVEsUUFBUSxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOztBQUVyQyxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjs7OzZDQUVvQjtBQUNqQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUUvQixtQkFBTyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUMvRjs7O3FEQUU0QjtBQUN6QixnQkFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRTVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7QUFDekMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckIsTUFBTTtBQUNILG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7YUFDbEQ7U0FDSjs7O3NDQUVhLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLDZCQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7cUJBQzNCOztBQUVELDBCQUFNOztBQUFBLEFBRVYscUJBQUssS0FBSyxDQUFDO0FBQ1gscUJBQUssWUFBWTtBQUNiLHdCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxDQUFDLElBQ3JDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6Qyw2QkFBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQyw0QkFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7cUJBQ3JDOztBQUVELDBCQUFNOztBQUFBLEFBRVYscUJBQUssU0FBUztBQUNWLHlCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRTtBQUFDLEFBQ25DLHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsd0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQiwwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFdBQVc7QUFDWix5QkFBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7QUFBQyxBQUNuQyx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQix3QkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLDBCQUFNOztBQUFBLEFBRVYscUJBQUssUUFBUTtBQUNULHdCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxDQUFDLElBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDRCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7cUJBQ3ZCOztBQUVELDBCQUFNOztBQUFBLEFBRVYscUJBQUssT0FBTztBQUNSLHdCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxDQUFDLElBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25DLDRCQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztxQkFDckMsTUFBTTtBQUNILDRCQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMvQzs7QUFFRCwwQkFBTTtBQUFBLGFBQ1Q7O0FBRUQsZ0JBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDNUMscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7U0FDSjs7Ozs7O3dDQUdlLFlBQVksRUFBRSxRQUFRLEVBQUU7QUFDcEMsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDdEIsdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZEOztBQUVELGdCQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7O0FBRTNDLG1CQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDN0QsdUJBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxHQUFJLE1BQU0sQ0FBQzthQUMxRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1Y7Ozt1Q0FFYyxZQUFZLEVBQWtDO2dCQUFoQyxRQUFRLHlEQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTs7QUFDdkQsZ0JBQUksT0FBTyxHQUFHLFlBQVksS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUV0RixnQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLHlCQUFTLEVBQUUsWUFBWTtBQUN2QixtQ0FBbUIsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckQsa0NBQWtCLEVBQUUsT0FBTzthQUM5QixDQUFDLENBQUM7U0FDTjs7O29DQUVXLEtBQUssRUFBRTtBQUNmLGdCQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXhDLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3BCLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCOztBQUVELGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUNyRCxxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEM7U0FDSjs7O2lDQUVRO0FBQ0wsbUJBQ0k7OzZCQUFTLElBQUksQ0FBQyxLQUFLO0FBQ2QsZ0NBQVksRUFBRSxTQUFTLEFBQUM7QUFDeEIsd0JBQUksRUFBRSxTQUFTLEFBQUM7QUFDaEIsd0JBQUksRUFBRSxTQUFTLEFBQUM7QUFDaEIsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRTtBQUNSLDhDQUFzQixFQUFFLElBQUk7dUJBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0MsQUFBQztBQUNILDZCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7Z0JBQ3pDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFFbEIsb0RBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ3pCLHVCQUFHLEVBQUMsT0FBTztBQUNYLDZCQUFTLEVBQUU7QUFDUCxzQ0FBYyxFQUFFLElBQUk7dUJBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUN0RSxBQUFDO0FBQ0gsZ0NBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEFBQUM7QUFDNUUsd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEFBQUM7QUFDcEQsd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksTUFBTSxBQUFDO0FBQzlELHFDQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxBQUFDO0FBQzdCLDJCQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsSUFBRztnQkFFOUMsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNuQixDQUNSO1NBQ0w7OztXQXRTQyxnQkFBZ0I7OztBQXlTdEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHO0FBQ3pCLGdDQUE0QixFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xELGdCQUFZLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDcEMsWUFBUSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQzdCLGdCQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsZUFBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0tBQ2xDLENBQUMsQ0FDTDtBQUNELFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMxQixhQUFTLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFlBQVEsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixhQUFTLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IscUJBQWlCLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDekMsUUFBSSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLGtCQUFjLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDdEMsY0FBVSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFdBQU8sRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM3QixvQkFBZ0IsRUFBRSxnQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN0QyxRQUFJLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07Q0FDL0IsQ0FBQzs7QUFFRixnQkFBZ0IsQ0FBQyxZQUFZLEdBQUc7QUFDNUIsZ0NBQTRCLEVBQUUsS0FBSztBQUNuQyxZQUFRLEVBQUUsRUFBRTtBQUNaLGFBQVMsRUFBRSxFQUFFO0FBQ2IsY0FBVSxFQUFFLEVBQUU7QUFDZCxxQkFBaUIsRUFBRSxFQUFFO0FBQ3JCLGtCQUFjLEVBQUUsY0FBYztBQUM5QixjQUFVLGdCQUFNO0FBQ2hCLG9CQUFnQixnQkFBTTtDQUN6QixDQUFDOztrQkFFYSxnQkFBZ0I7Ozs7Ozs7O2tCQ2hWUCxJQUFJOzs7OztBQUFiLFNBQVMsSUFBSSxHQUFHLEVBQUU7Ozs7Ozs7O2tCQ0lULG9CQUFvQjtBQVI1QyxJQUFNLFlBQVksR0FBRyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUNuRCxXQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNqRCxDQUFDOztBQUVGLElBQU0saUJBQWlCLEdBQUcsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO0FBQ2pFLFdBQU8sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDM0U7O0FBQUMsQUFFYSxTQUFTLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDL0MsUUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBTyxJQUFJLENBQUM7S0FDZjs7QUFFRCxRQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTdCLFFBQVEsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFBQSxRQUN4QixJQUFJLEtBQUssaUJBQWlCLElBQUksSUFBSSxLQUFLLGdCQUFnQixBQUFDLEVBQUU7O0FBQzlELGVBQU8sS0FBSyxDQUFDO0tBQ2hCOztBQUVELFFBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO0FBQzVCLGVBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbkc7O0FBRUQsV0FBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQUUsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUUsQ0FBQyxJQUMxRCxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQUUsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUUsQ0FBQyxDQUFDO0NBQ3hFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztrQkNuQmEsQ0FBQyxTQUFTLHVCQUF1QixHQUFHO0FBQy9DLFFBQUksS0FBSyxHQUFHLENBQ1IsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsWUFBWSxFQUNaLGFBQWEsQ0FDaEIsQ0FBQzs7QUFFRixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzlDLFlBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFO0FBQzVDLG1CQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKOztBQUVELFdBQU8sS0FBSyxDQUFDO0NBQ2hCLENBQUEsRUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDWkUsTUFBTTtZQUFOLE1BQU07Ozs7OztBQUlSLFdBSkUsTUFBTSxHQUlhOzs7MEJBSm5CLE1BQU07O3NDQUlPLElBQUk7QUFBSixVQUFJOzs7Z0dBSmpCLE1BQU0sbURBS0ssSUFBSTs7QUFFYixVQUFLLEtBQUssR0FBRyxNQUFLLFlBQVksR0FBRyxNQUFLLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQzs7R0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FBQUE7ZUFSQyxNQUFNOztvQ0FzQlEsVUFBVSxFQUFFO0FBQ3hCLGFBQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNyRCxZQUFJLENBQUMsR0FBRyxBQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxHQUFJLENBQUMsR0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6QyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBZXFCLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDeEMsYUFBTyxDQUFDLDRCQUFhLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyw0QkFBYSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZGOzs7Ozs7Ozs7Ozs7MkJBU007O0FBRUgsYUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBRSxPQUFPLENBQUMsUUFBUSxFQUFDLFVBQUEsQ0FBQztlQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7T0FBQSxDQUFDOztBQUFDLEtBRW5HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMURDLE1BQU07R0FBUyxnQkFBTSxTQUFTOztrQkE0RXJCLE1BQU07OztBQ3ZGckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzQ0EsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWxCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDYixZQUFRLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUNqRSxjQUFVLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUN2RSxtQkFBZSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUN0RixZQUFRLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUNqRSxnQkFBWSxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM3RSxXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM5RCxVQUFNLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUMzRCxXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM5RCxhQUFTLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUNwRSxjQUFVLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUN2RSwyQkFBdUIsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM5RyxXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM5RCxzQkFBa0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUMvRixXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUM5RCxvQkFBZ0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUN6RixhQUFTLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUNwRSxvQkFBZ0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQUFBQztBQUN6RixVQUFNLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQUFBQztDQUM5RCxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnByb3BzLnByZXNzZWQgPyAnb25VbnByZXNzZWQnIDogJ29uUHJlc3NlZCddKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzZWQnOiB0aGlzLnByb3BzLnByZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXt0aGlzLnByb3BzLnByZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5VSUJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb25DbGljazogbm9vcCxcbiAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgb25VbnByZXNzZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUJ1dHRvbjtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSBjaGVja2JveCB3aXRoIGluZGV0ZXJtaW5hdGUgc3VwcG9ydC5cbiAqIEBjbGFzcyBVSUNoZWNrYm94XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoKSB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLm5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94LnByb3BUeXBlcyA9IHtcbiAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbmRldGVybWluYXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJQ2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xuICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICBvblVuY2hlY2tlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3g7XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlDaGVja2JveEdyb3VwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBhbGxJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBsZXQgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2FsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU9eyFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGNiX2l0ZW0ubmFtZWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgbGV0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzID0ge1xuICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgIFNFTEVDVF9BTExfQUZURVI6ICdTRUxFQ1RfQUxMX0FGVEVSJyxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uQWxsQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BbGxVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdEFsbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdEFsbExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgXSksXG59O1xuXG5VSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgc2VsZWN0QWxsTGFiZWw6ICdTZWxlY3QgQWxsJyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3hHcm91cDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgICAgICBib2R5VVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUZvY3VzID0gdGhpcy5oYW5kbGVGb2N1cy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuZGlhbG9nLmNvbnRhaW5zKG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKG5hdGl2ZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrKG5hdGl2ZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5ib2R5VVVJRH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYm9keX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmb290ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hlYWRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgdGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuVUlEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHlQcm9wczoge30sXG4gICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICBoZWFkZXJQcm9wczoge30sXG4gICAgb25DbG9zZTogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRGlhbG9nO1xuIiwiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlID0gdGhpcy5yZXNjYWxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2NhbGUsIHRydWUpO1xuICAgIH1cblxuICAgIHJlc2NhbGUoKSB7XG4gICAgICAgIGxldCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGxldCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcbiAgICAgICAgbGV0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgICAgICBpZiAoICAgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIGxldCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgICAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gTWF0aC5taW4odGhpcy5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpICsgJ3B4JztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlGaXR0ZWRUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbn07XG5cblVJRml0dGVkVGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlGaXR0ZWRUZXh0O1xuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZyB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBhbHQ9e251bGx9XG4gICAgICAgICAgICAgICAgIHNyYz17bnVsbH1cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlJbWFnZS5zdGF0dXMgPSB7XG4gICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5VSUltYWdlLnByb3BUeXBlcyA9IHtcbiAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlJbWFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW1hZ2VQcm9wczoge30sXG4gICAgc3RhdHVzUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlJbWFnZTtcbiIsIi8qKlxuICogQSBnZW5lcmljIGxpc3Qgdmlldywgc3VwcG9ydGluZyB1bnN0eWxlZCwgYnVsbGV0ZWQgYW5kIG51bWJlcmVkIG91dHB1dC5cbiAqIEBjbGFzcyBVSUxpc3RcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzW2BpdGVtXyR7aW5kZXh9YF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0SXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzSXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgaGFzVHlwZSA9ICEhdGhpcy5wcm9wcy50eXBlO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXM7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnN0YXRlLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0SXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcHJldiA9ICgpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNJdGVtSW5kZXgoYWN0aXZlSXRlbSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSBpdGVtcy5pbmRleE9mKGFjdGl2ZUl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJldigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBwcmV2KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBjb25zdCBub2RlVHlwZSA9IHRoaXMucHJvcHMudHlwZSA/ICdsaScgOiAnc3Bhbic7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1saXN0LWl0ZW0nLFxuICAgICAgICAgICAgICAgIHJlZjogYGl0ZW1fJHtpbmRleH1gLFxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5jcmVhdGVIYXNoZWRLZXkoaXRlbSkgKyBpbmRleCwgLy8gaW4gY2FzZSAyIHBpZWNlcyBvZiBjb250ZW50IGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6ICgpID0+IHRoaXMuc3RhdGUuYWN0aXZlSXRlbSA9PT0gaXRlbSAmJiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBudWxsfSksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSXRlbTogaXRlbX0pLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG5vZGVUeXBlID0gJ2Rpdic7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYnVsbGV0JzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ3VsJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBub2RlVHlwZSA9ICdvbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgICAgICAgcmVmOiAnbGlzdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAndWktbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtYnVsbGV0ZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdidWxsZXQnLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LW51bWJlcmVkJzogdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1wbGFpbic6IHRoaXMucHJvcHMudHlwZSAhPT0gJ2J1bGxldCcgJiYgdGhpcy5wcm9wcy50eXBlICE9PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMucmVuZGVyQ29udGVudCgpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblVJTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5ub2RlKSxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydidWxsZXQnLCAnbnVtYmVyJ10pLFxufTtcblxuVUlMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUxpc3Q7XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGlhbG9nU3BlY2lmaWNQcm9wcyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZyB7Li4uZGlhbG9nU3BlY2lmaWNQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSU1vZGFsLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgbWFza1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG1vZGFsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSU1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgbWFza1Byb3BzOiB7fSxcbiAgICBtb2RhbFByb3BzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJTW9kYWw7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuLypcbiAgICBBIG51YW5jZSBhYm91dCB0aGlzIGNvbXBvbmVudDogc2luY2UgaXQgb25seSByZW5kZXJzIGEgc2ltcGxlIDxkaXY+LCB0aGUgbWFpbiByZW5kZXIoKSBmdW5jdGlvblxuICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24gPSB0aGlzLmFsaWduLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduKCkge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy5ub2RlLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2cgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBvcG92ZXIucG9zaXRpb24gPSB7XG4gICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgTUlERExFOiAnTUlERExFJyxcbiAgICBFTkQ6ICdFTkQnLFxufTtcblxuVUlQb3BvdmVyLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBhbmNob3JYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZlhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIHNlbGZZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbn07XG5cblVJUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQb3BvdmVyO1xuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b24gey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICBsYWJlbFByb3BzOiB7fSxcbiAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxufTtcblxuVUlQcm9ncmVzcy5wcm9wVHlwZXMgPSB7XG4gICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3M7XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBvbkV4cGFuZDogbm9vcCxcbiAgICBvbkhpZGU6IG5vb3AsXG4gICAgdG9nZ2xlUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU7XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUmFkaW8ucHJvcFR5cGVzID0ge1xuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuVUlSYWRpby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbGFiZWxQcm9wczoge30sXG4gICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVJhZGlvO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24ub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/IDAgOiAtMX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGFyaWEtcmVxdWlyZWQ9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcyA9IHtcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvcHRpb25zOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWlzc2luZ1ZhbHVlID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoISgndmFsdWUnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuVUlTZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBub29wXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVNlZ21lbnRlZENvbnRyb2w7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuXG5jbGFzcyBVSVRhYmxlQ2VsbCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW50ZXJhY3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkludGVyYWN0KGV2ZW50LCB0aGlzLnByb3BzLnJvdywgdGhpcy5wcm9wcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy53aWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwtaW5uZXInPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwtaW5uZXItdGV4dCc+e3RoaXMucHJvcHMuY29udGVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29udGVudDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhZGRUaXRsZSA9IHR5cGVvZiB0aGlzLnByb3BzLmNvbnRlbnQgPT09ICdzdHJpbmcnO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbCdcbiAgICAgICAgICAgICAgICAgdGl0bGU9e2FkZFRpdGxlID8gdGhpcy5wcm9wcy5jb250ZW50IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdGhpcy5wcm9wcy53aWR0aCA/IHRoaXMucHJvcHMud2lkdGggKyAncHgnIDogbnVsbH19XG4gICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZUNlbGwucHJvcFR5cGVzID0ge1xuICAgIGNvbnRlbnQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHJvdzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGVDZWxsO1xuIiwiLyoqXG4gKiBBIGhpZ2gtcGVyZm9ybWFuY2UsIGluZmluaXRlIHRhYmxlIHZpZXcuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUm93IGZyb20gJy4vcm93JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogVGhlcmUgYXJlIGEgbG90IG9mIHBsYWNlcyB3aGVyZSBzaGFyZWQgdGhpcy57bmFtZX0gdmFyaWFibGVzIGhhdmUgYmVlblxuICogdXNlZCB3aGVyZSB0aGV5IGRvbid0IHNlZW0gdG8gYmUgbmVlZGVkLiBUaGlzIGlzIGNvbXBsZXRlbHkgb24gcHVycG9zZSB0b1xuICogcmVkdWNlIG1lbW9yeSBwcmVzc3VyZSBkdXJpbmcgc2Nyb2xsIG9wZXJhdGlvbnMuIElmIHlvdSBjaGFuZ2UgdGhlbSBiYWNrIHRvXG4gKiBub3JtYWwgdmFycywgeW91J2xsIHNlZSB0aGUgc2F3dG9vdGhpbmcgaW4geW91ciBKUyBwcm9maWxlci4uLiBzbyBkb24ndCBkbyBpdCFcbiAqL1xuXG4vKipcbiAqIE9SREVSIE9GIE9QRVJBVElPTlNcbiAqXG4gKiAxLiBpbml0aWFsIHJlbmRlciB3LyBvbmUgcm93IG9mIGNlbGxzXG4gKiAyLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuICogMy4gYXBwbHkgd2lkdGhzIHRvIGNvbHVtbiBkZWZpbml0aW9uc1xuICogNC4gcmVuZGVyIHBhc3MgMiB3LyBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuICovXG5cbi8qKiBAaWdub3JlICovXG5jb25zdCBmaW5kV2hlcmUgPSBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoaW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbaW5kZXhdW3Byb3BlcnR5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleCAtPSAxO1xuICAgIH1cbn07IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVJvd0NsaWNrID0gdGhpcy5oYW5kbGVSb3dDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnTW92ZSA9IHRoaXMuaGFuZGxlRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCA9IHRoaXMuaGFuZGxlTW92ZUludGVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXJpYVNwb2tlbk91dHB1dDogJycsXG4gICAgICAgICAgICBjaG9rZVJlbmRlcjogdHJ1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVSb3dJbmRleDogLTEsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KDApLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHJvd3NPcmRlcmVkQnlZOiBbMF0sXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMuc2xpY2UoMCksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiBudWxsLFxuICAgICAgICAgICAgeVNjcm9sbGVyTnViU2l6ZTogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy54Q3VycmVudCA9IHRoaXMueUN1cnJlbnQgPSAwO1xuICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy55TmV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMueVNjcm9sbE51YlBvc2l0aW9uID0gMDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuY2FjaGVfaXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jYXB0dXJlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgLyogc28gd2UgY2FuIHJldXNlIHN0YXRlLnJvd3MgdG8gYXZvaWQgZXh0cmEgYXJyYXkgYWxsb2NhdGlvbnMgaW4gdGhlIHNjcm9sbCBoYW5kbGVycyAtIGluIHRoaXMgY2FzZSBhIGZldyBtb3JlIENQVSBjeWNsZXMgYXJlIGZhciBjaGVhcGVyIHRoYW4gcnVubmluZyB1cCBhZ2FpbnN0IHRoZSBHQyAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMuaGVhZCAmJiB0eXBlb2YgdGhpcy5taW5pbXVtQ29sdW1uV2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5yZWZzLndyYXBwZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktdGFibGUtaGVhZGVyLWNlbGwnKVswXTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgTmFOIGlmIG5vdCBhIHBpeGVsIHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhpbXVtQ29sdW1uV2lkdGggPSBwYXJzZUludChub2RlU3R5bGUubWF4V2lkdGgsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbmltdW1Db2x1bW5XaWR0aCA9IHBhcnNlSW50KG5vZGVTdHlsZS5taW5XaWR0aCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgcHggPSB0aGlzLmNvbnRhaW5lcldpZHRoIC0gTWF0aC5hYnModGhpcy54TWF4aW11bVRyYW5zbGF0aW9uKTtcblxuICAgICAgICByZXR1cm4gcHggPCAxMiA/IDEyIDogcHg7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWVNjcm9sbGVyTnViU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgcHggPSB0aGlzLnJvd0VuZEluZGV4IC8gdGhpcy5wcm9wcy50b3RhbFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHB4IDwgMTIgPyAxMiA6IHB4O1xuICAgIH1cblxuICAgIGNhcHR1cmVEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IHRoaXMucmVmcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VpLXRhYmxlLXJvdycpWzBdO1xuICAgICAgICBjb25zdCBmaXJzdFJvd0NlbGxzID0gZmlyc3RSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktdGFibGUtY2VsbCcpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMud3JhcHBlcjtcblxuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuXG4gICAgICAgIHRoaXMuY2VsbEhlaWdodCA9IGZpcnN0Um93Q2VsbHNbMF0uY2xpZW50SGVpZ2h0IHx8IDQwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgfHwgMTUwO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLmNsaWVudFdpZHRoIHx8IDUwMDtcblxuICAgICAgICB0aGlzLm5Sb3dzVG9SZW5kZXIgPSBNYXRoLmNlaWwoKHRoaXMuY29udGFpbmVySGVpZ2h0ICogMS4zKSAvIHRoaXMuY2VsbEhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5yb3dTdGFydEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5yb3dFbmRJbmRleCA9IHRoaXMublJvd3NUb1JlbmRlcjtcblxuICAgICAgICBjb25zdCB0YWJsZVdpZHRoID0gZmlyc3RSb3cuY2xpZW50V2lkdGggfHwgNTAwO1xuXG4gICAgICAgIHRoaXMueE1heGltdW1UcmFuc2xhdGlvbiA9ICAgdGhpcy5jb250YWluZXJXaWR0aCA+IHRhYmxlV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5jb250YWluZXJXaWR0aCAtIHRhYmxlV2lkdGg7XG5cbiAgICAgICAgdGhpcy55VXBwZXJCb3VuZCA9IDA7XG4gICAgICAgIHRoaXMueUxvd2VyQm91bmQgPSB0aGlzLmNvbnRhaW5lckhlaWdodCAtICh0aGlzLm5Sb3dzVG9SZW5kZXIgKiB0aGlzLmNlbGxIZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGFkanVzdGVkQ29sdW1ucyA9IHRoaXMuc3RhdGUuY29sdW1ucy5tYXAoZnVuY3Rpb24gZGlzY292ZXJXaWR0aChjb2x1bW4sIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5jZWlsKGZpcnN0Um93Q2VsbHNbaW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZFJvd3MgPSBbXTtcbiAgICAgICAgY29uc3Qgcm93c09yZGVyZWRCeVkgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMublJvd3NUb1JlbmRlcjsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRSb3dzLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KGkpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiBpLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbEhlaWdodCAqIGksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm93c09yZGVyZWRCeVkucHVzaChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2hva2VSZW5kZXI6IGZhbHNlLFxuICAgICAgICAgICAgY29sdW1uczogYWRqdXN0ZWRDb2x1bW5zLFxuICAgICAgICAgICAgcm93czogZ2VuZXJhdGVkUm93cyxcbiAgICAgICAgICAgIHJvd3NPcmRlcmVkQnlZOiByb3dzT3JkZXJlZEJ5WSxcbiAgICAgICAgICAgIHhTY3JvbGxlck51YlNpemU6IHRoaXMuY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpLFxuICAgICAgICAgICAgeVNjcm9sbGVyTnViU2l6ZTogdGhpcy5jYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbERvd24oKSB7XG4gICAgICAgIGlmICggICB0aGlzLnJvd0VuZEluZGV4ID09PSB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgfHwgdGhpcy55TmV4dCA+PSB0aGlzLnlMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBsb3dlc3QgWSB2YWx1ZSB0byB0aGUgeUxvd2VyQm91bmQgYW5kIHJlcXVlc3QgdGhlIG5leHQgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55TmV4dCAtIHRoaXMueUxvd2VyQm91bmQpIC8gdGhpcy5jZWxsSGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICsgdGhpcy5yb3dFbmRJbmRleCA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gdGhpcy5wcm9wcy50b3RhbFJvd3MgLSB0aGlzLnJvd0VuZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gdGhpcy5uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfc2hpZnREZWx0YSA9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0IC0gdGhpcy5uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgKiB0aGlzLmNlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93RW5kSW5kZXggKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLmNhY2hlX2l0ZXJhdG9yID0gMDsgdGhpcy5jYWNoZV9pdGVyYXRvciA8IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0OyB0aGlzLmNhY2hlX2l0ZXJhdG9yKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV90YXJnZXRJbmRleCA9IHRoaXMucm93RW5kSW5kZXggKyB0aGlzLmNhY2hlX2l0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlciA9IHRoaXMuc3RhdGUucm93c1t0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZW3RoaXMuY2FjaGVfb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci5kYXRhID0gdGhpcy5wcm9wcy5nZXRSb3codGhpcy5jYWNoZV90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci55ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggKz0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgLT0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvd1N0YXJ0SW5kZXggPT09IDAgfHwgdGhpcy55TmV4dCA8PSB0aGlzLnlVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgaGlnaGVzdCBZIHZhbHVlIHRvIHRoZSB5VXBwZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgcHJldmlvdXMgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55TmV4dCAtIHRoaXMueVVwcGVyQm91bmQpIC8gdGhpcy5jZWxsSGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMucm93U3RhcnRJbmRleCAtIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLnJvd1N0YXJ0SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiB0aGlzLm5Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgLSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnlVcHBlckJvdW5kICs9IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kICs9IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMublJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSB0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuY2FjaGVfaXRlcmF0b3IgPSAwOyB0aGlzLmNhY2hlX2l0ZXJhdG9yIDwgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7IHRoaXMuY2FjaGVfaXRlcmF0b3IrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3RhcmdldEluZGV4ID0gdGhpcy5yb3dTdGFydEluZGV4IC0gdGhpcy5jYWNoZV9pdGVyYXRvciAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gdGhpcy5zdGF0ZS5yb3dzW3RoaXMuc3RhdGUucm93c09yZGVyZWRCeVlbdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLmNhY2hlX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnkgPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkudW5zaGlmdCh0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnBvcCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggLT0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgKz0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgoZXZlbnQuZGVsdGFYID09PSAwICYmIGV2ZW50LmRlbHRhWSA9PT0gMClcbiAgICAgICAgICAgIHx8IHRoaXMubWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy54TmV4dCA9IHRoaXMubWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMueEN1cnJlbnQgLSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgaWYgKHRoaXMueE5leHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnhOZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhOZXh0IDwgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy55TmV4dCA9IHRoaXMubWFudWFsbHlTY3JvbGxpbmdYID8gMCA6IHRoaXMueUN1cnJlbnQgLSBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgaWYgKHRoaXMueU5leHQgPCB0aGlzLnlDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnlOZXh0ID4gdGhpcy55Q3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueU5leHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnlOZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnlOZXh0IDwgdGhpcy55TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55TmV4dCA9IHRoaXMueUxvd2VyQm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54TmV4dCAhPT0gdGhpcy54Q3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmhlYWQuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnhOZXh0fXB4LCAwcHgsIDBweClgO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogTW92ZSB3cmFwcGVyICovXG4gICAgICAgIHRoaXMucmVmcy5ib2R5LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy54TmV4dH1weCwgJHt0aGlzLnlOZXh0fXB4LCAwcHgpYDtcblxuICAgICAgICAvKiBtb3ZlIHNjcm9sbGJhciBudWJzICovXG4gICAgICAgIHRoaXMucmVmcy54U2Nyb2xsZXJOdWIuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHtNYXRoLmFicyh0aGlzLnhOZXh0KX1weCwgMHB4LCAwcHgpYDtcblxuICAgICAgICB0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiA9ICh0aGlzLnJvd1N0YXJ0SW5kZXggLyB0aGlzLnByb3BzLnRvdGFsUm93cykgKiB0aGlzLmNvbnRhaW5lckhlaWdodDtcblxuICAgICAgICBpZiAodGhpcy55U2Nyb2xsTnViUG9zaXRpb24gKyB0aGlzLnN0YXRlLnlTY3JvbGxlck51YlNpemUgPiB0aGlzLmNvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy55U2Nyb2xsTnViUG9zaXRpb24gPSB0aGlzLmNvbnRhaW5lckhlaWdodCAtIHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcy55U2Nyb2xsZXJOdWIuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoMHB4LCAke3RoaXMueVNjcm9sbE51YlBvc2l0aW9ufXB4LCAwcHgpYDtcblxuICAgICAgICB0aGlzLnhDdXJyZW50ID0gdGhpcy54TmV4dDtcbiAgICAgICAgdGhpcy55Q3VycmVudCA9IHRoaXMueU5leHQ7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkanVzdGVkRGVsdGEgPSBkZWx0YTtcbiAgICAgICAgbGV0IG5ld1RhYmxlV2lkdGggPSAwO1xuXG4gICAgICAgIGxldCBjb3B5ID0gdGhpcy5zdGF0ZS5jb2x1bW5zLm1hcChkZWZpbml0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1hcHBpbmcgIT09IHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFibGVXaWR0aCArPSBkZWZpbml0aW9uLndpZHRoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEJlZm9yZSBhbnkgbWVhc3VyZW1lbnRzIGFyZSBhcHBsaWVkLCBmaXJzdCB3ZSBuZWVkIHRvIGNvbXBhcmUgdGhlIGRlbHRhIHRvIHRoZSBrbm93biBjZWxsIHdpZHRoIHRocmVzaG9sZHMgYW5kIHNjYWxlIGFwcHJvcHJpYXRlbHkuICovXG5cbiAgICAgICAgICAgIGlmICggICBhZGp1c3RlZERlbHRhIDwgMFxuICAgICAgICAgICAgICAgICYmICFpc05hTih0aGlzLm1pbmltdW1Db2x1bW5XaWR0aClcbiAgICAgICAgICAgICAgICAmJiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA8IHRoaXMubWluaW11bUNvbHVtbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLm1pbmltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLm1heGltdW1Db2x1bW5XaWR0aClcbiAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPiB0aGlzLm1heGltdW1Db2x1bW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLm1heGltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1RhYmxlV2lkdGggKz0gZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGE7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICB3aWR0aDogZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobmV3VGFibGVXaWR0aCA8PSB0aGlzLmNvbnRhaW5lcldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uIC09IGFkanVzdGVkRGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvcHksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhbiB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgICAgIGlmIChhZGp1c3RlZERlbHRhIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogYWRqdXN0ZWREZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiAwLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gdGhpcy5zdGF0ZS5jb2x1bW5zW2V2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uLWluZGV4JyldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RDb2x1bW5YKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYW51YWxseVNjcm9sbGluZ1gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RYU2Nyb2xsLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiAoKGV2ZW50LmNsaWVudFkgLSB0aGlzLmxhc3RZU2Nyb2xsKSAvIHRoaXMuY29udGFpbmVySGVpZ2h0KSAqIHRoaXMucHJvcHMudG90YWxSb3dzICogdGhpcy5jZWxsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJvd0NsaWNrKGV2ZW50LCBjbGlja2VkUm93RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJvd0ludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QoZXZlbnQsIGNsaWNrZWRSb3dEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudEFjdGl2ZVJvd0luZGV4OiBmaW5kV2hlcmUoXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yb3dzLCAnZGF0YScsIGNsaWNrZWRSb3dEYXRhXG4gICAgICAgICAgICApLnNldEluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnJvd3MubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17cm93LnNldEluZGV4ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMuc3RhdGUuY29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Jvdy5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgZXZlbj17KHJvdy5zZXRJbmRleCkgJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgeT17cm93Lnl9XG4gICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgICAgICAgICAgICAgb25DZWxsSW50ZXJhY3Q9e3RoaXMucHJvcHMub25DZWxsSW50ZXJhY3R9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keSc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUm93cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNob2tlUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcic+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1yb3cgdWktdGFibGUtaGVhZGVyLXJvdyc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jb2x1bW5zLm1hcCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwgdWktdGFibGUtaGVhZGVyLWNlbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicgPyBjb2x1bW4ud2lkdGggOiBudWxsfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsLWlubmVyLXRleHQnPntjb2x1bW4udGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1jb2x1bW4taW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU2Nyb2xsYmFycygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neFNjcm9sbGVyTnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGxlci1udWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdGhpcy5zdGF0ZS54U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5U2Nyb2xsZXJOdWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbGVyLW51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS55U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBmaW5kV2hlcmUodGhpcy5zdGF0ZS5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLnN0YXRlLmNvbHVtbnNbMF0ubWFwcGluZ10sXG4gICAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZVJvd0luZGV4OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuc2V0SW5kZXgsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93LnkgKiAtMSA+IHRoaXMueUN1cnJlbnQpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLmNlbGxIZWlnaHQgPCB0aGlzLnlDdXJyZW50IC0gdGhpcy5jb250YWluZXJIZWlnaHQgKyB0aGlzLmNlbGxIZWlnaHQpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IHRoaXMuY2VsbEhlaWdodCAqIGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggPCB0aGlzLnByb3BzLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duXG4gICAgICAgICAgICAgICAgaW4gdGhlIHZpZXdwb3J0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6ICggICAoICAgIHRoaXMucm93U3RhcnRJbmRleCA+IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93U3RhcnRJbmRleCA8IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbEhlaWdodCxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKCkge1xuICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuc3RhdGUucm93cywgJ3NldEluZGV4JywgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXgpO1xuXG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFyaWFTcG9rZW5PdXRwdXQ6IHRoaXMuc3RhdGUuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93LmRhdGFbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgdGhpcy5hcmlhRXhwb3NlRnVsbFJvd0RhdGEoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5hcmlhU3Bva2VuT3V0cHV0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRhYmxlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZURyYWdNb3ZlfVxuICAgICAgICAgICAgICAgICBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlRHJhZ0VuZH1cbiAgICAgICAgICAgICAgICAgb25XaGVlbD17dGhpcy5oYW5kbGVNb3ZlSW50ZW50fVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWQoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNjcm9sbGJhcnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBtYXBwaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBnZXRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2VsbEludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvd0ludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2x1bW5zOiBbXSxcbiAgICBnZXRSb3c6IG5vb3AsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgQ2VsbCBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuXG5jbGFzcyBVSVRhYmxlUm93IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xuICAgICAgICBsZXQgY2xhc3NlcyA9ICd1aS10YWJsZS1yb3cnO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV2ZW4pIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2VsbHMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSA/IHt9IDogdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtkYXRhW2RlZmluaXRpb24ubWFwcGluZ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtkZWZpbml0aW9uLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIFt0cmFuc2Zvcm1Qcm9wXTogICB0aGlzLnByb3BzLnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy5wcm9wcy55fXB4LCAwcHgpYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDZWxscygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgeTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGVSb3c7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBmdW5jdGlvbiBnZXRGaXJzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVswXTtcbn07XG5cbmNvbnN0IGxhc3QgPSBmdW5jdGlvbiBnZXRMYXN0QXJyYXlJdGVtKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufTtcblxuY29uc3Qgd2l0aG91dCA9IGZ1bmN0aW9uIHJlamVjdFNvbWVBcnJheUl0ZW1zKGJhc2VBcnJheSwgLi4udG9CZUV4Y2x1ZGVkKSB7XG4gICAgcmV0dXJuIGJhc2VBcnJheS5maWx0ZXIoZnVuY3Rpb24gcmVqZWN0U29tZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0b0JlRXhjbHVkZWQuaW5kZXhPZihpdGVtKSA9PT0gLTE7XG4gICAgfSk7XG59O1xuXG5jbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlczogW10sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGxldCBwcmV2aW91c0luZGljZXMgPSBwcmV2U3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcztcbiAgICAgICAgbGV0IHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzID0gcHJldlN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRpY2VzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzO1xuICAgICAgICBsZXQgY3VycmVudFNlbGVjdGVkSW5kaWNlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmIChwcmV2aW91c0luZGljZXMgIT09IGN1cnJlbnRJbmRpY2VzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVG9rZW5DaGFuZ2UoXG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkSW5kaWNlcy5tYXAoaW5kZXggPT4gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRpY2VzKSB7IC8vIG1vdmUgZm9jdXNcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWRJbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kaWNlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kaWNlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGljZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRpY2VzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kaWNlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGljZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kaWNlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUVudGl0eVNlbGVjdGVkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0b2tlbml6ZWRFbnRpdHlJbmRpY2VzOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMuY29uY2F0KGluZGV4KX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtdfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBpbmRpY2VzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kaWNlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogW2xhc3QoaW5kaWNlcyldLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNUb2tlbiA9IGluZGljZXNbaW5kaWNlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGluZGljZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGljZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5leHRUb2tlbiA9IGluZGljZXNbaW5kaWNlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlczogd2l0aG91dCh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMsIC4uLnRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXM6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLCBpbmRleCksXG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQsIGluZGV4KSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VG9rZW5DbG9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFNpbmdsZVRva2VuKGluZGV4KSB7XG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSA9PT0gLTFcbiAgICAgICAgICAgIHx8IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogW2luZGV4XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0U2luZ2xlVG9rZW4oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFNpbmdsZVRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLmRlc2NlbmRhbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmhhbmRsZUVudGl0eVNlbGVjdGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMsXG4gICAgb25Ub2tlbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuVUlUb2tlbml6ZWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgb25Ub2tlbkNoYW5nZTogbm9vcCxcbiAgICBzaG93VG9rZW5DbG9zZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9rZW5pemVkSW5wdXQ7XG4iLCIvKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKiBAY2xhc3MgVUlUb29sdGlwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnByb3BzLnBvc2l0aW9uO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlbG93JzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUxPVyxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgdGhpcy5wcm9wcy50ZXh0fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUb29sdGlwLnBvc2l0aW9uID0ge1xuICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgIEJFRk9SRTogJ0JFRk9SRScsXG4gICAgQUZURVI6ICdBRlRFUicsXG59O1xuXG5VSVRvb2x0aXAucHJvcFR5cGVzID0ge1xuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJVG9vbHRpcC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9vbHRpcDtcbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXModGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyh0aGlzLnN0YXRlLnVzZXJJbnB1dCwgbmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpIHtcbiAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LmNvbnRlbnQgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgbGV0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBsZXQgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJyAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWFya0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1hcmtGdW5jKGVudGl0eUNvbnRlbnQsIHVzZXJJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2Vla1ZhbHVlID0gdXNlcklucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgbGV0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi5lbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLmNyZWF0ZUhhc2hlZEtleShlbnRpdHkuY29udGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcoZW50aXR5LmNvbnRlbnQsIHRoaXMuc3RhdGUudXNlcklucHV0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGxldCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXM7XG4gICAgICAgIGxldCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXNbbmV4dEluZGV4XSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kaWNlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBzaW1wbGUgXCJzdGFydHMtd2l0aFwiIHNlYXJjaFxuICAgIGdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1hdGNoRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWF0Y2hGdW5jKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlZWtWYWx1ZSA9IGN1cnJlbnRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS5jb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgbGV0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJJbnB1dDogY3VycmVudFZhbHVlLFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoZXZlbnQudGFyZ2V0LnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgIG5hbWU9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgdHlwZT17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjb250ZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICksXG4gICAgaGludDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaGludFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbWFya0Z1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG1hdGNoRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRQcm9wczoge30sXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVR5cGVhaGVhZElucHV0O1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufTtcbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL3RyYW5zZm9ybVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgbGV0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluIGFueSB0eXBlIG9mIGxpc3QsIHVuaXF1ZSBrZXlzIGFyZSByZXF1aXJlZCB0byBrZWVwIFJlYWN0IHJlLXJlbmRlcnMgZWZmaWNpZW50LiBUaGlzXG4gICAgICogbWV0aG9kIGNvbnN1bWVzIGEgbGlzdCBpdGVtJ3MgY29udGVudCBhbmQgcmV0dXJucyBhbiBhcHByb3ByaWF0ZSBrZXkgdG8gYmUgdXNlZC5cbiAgICAgKlxuICAgICAqIEJhc2VkIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBieSBlc21pcmFsaGEge0BsaW5rIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc2MTY0ODQvMTE0MTYxMSBvbiBTdGFja092ZXJmbG93fVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLmNyZWF0ZUhhc2hlZEtleSgnYWJjZCcpOyAvLyAyOTg3MDc0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2VTdHJpbmcgVGhlIGNvbnRlbnQgdG8gYmUgaGFzaGVkIGludG8gYSBjb25zaXN0ZW50IGtleS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBidWlsdCwgdW5pcXVlIGhhc2guXG4gICAgICovXG4gICAgY3JlYXRlSGFzaGVkS2V5KGJhc2VTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VTdHJpbmcuc3BsaXQoJycpLnJlZHVjZShmdW5jdGlvbiBoYXNoZXIoYSwgYikge1xuICAgICAgICAgICAgbGV0IGMgPSAoKGEgPDwgNSkgLSBhKSArIGIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICAgICAgcmV0dXJuIGMgJiBjO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHByb3hpbWF0ZXMgdGhlIEBsaW5re1B1cmVSZW5kZXJNaXhpbiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWx9IGZyb20gRVM1IFJlYWN0LiBJbXBsZW1lbnQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIGluIHlvdXIgc3ViY2xhc3MgdG8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIGluY29taW5nIHByb3BzIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHByb3BzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgdGhlIGluY29taW5nIHN0YXRlIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgSW5mb3JtcyBSZWFjdCB0byByZS1yZW5kZXIgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICogICAgIC8vIHNvbWUgbG9naWMgaGVyZSwgZXZlbnR1YWxseSBgcmV0dXJuYCB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgIC8vIGN1cnJlbnQgcHJvcHMgJiBzdGF0ZSBhcmUgYXZhaWxhYmxlIGZvciBjb21wYXJpc29uIGF0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgXG4gICAgICogfVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gIXNoYWxsb3dFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8ICFzaGFsbG93RXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLnV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gICAgICovXG4gICAgdXVpZCgpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbXVsYXRlcyB0aGUgKG5vdyByZW1vdmVkKSBSZWFjdCBpbnRlcmZhY2UgYGdldEluaXRpYWxTdGF0ZWAuIEl0J3MgYSBjb252ZW5pZW5jZSwgYnV0IGFsbG93c1xuICAgICAqIGZvciB0aGlzIGZ1bmN0aW9uYWxpdHkgdG8gd29yayB3aXRob3V0IGhhdmluZyB0byBwcm92aWRlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBuYW1lIFVJVmlldyNpbml0aWFsU3RhdGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaW5pdGlhbFN0YXRlKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBVSVZpZXc7XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBVSUJ1dHRvbjogKGdsb2JhbC5VSUtpdC5VSUJ1dHRvbiA9IHJlcXVpcmUoJy4vVUlCdXR0b24nKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94OiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3ggPSByZXF1aXJlKCcuL1VJQ2hlY2tib3gnKS5kZWZhdWx0KSxcbiAgICBVSUNoZWNrYm94R3JvdXA6IChnbG9iYWwuVUlLaXQuVUlDaGVja2JveEdyb3VwID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94R3JvdXAnKS5kZWZhdWx0KSxcbiAgICBVSURpYWxvZzogKGdsb2JhbC5VSUtpdC5VSURpYWxvZyA9IHJlcXVpcmUoJy4vVUlEaWFsb2cnKS5kZWZhdWx0KSxcbiAgICBVSUZpdHRlZFRleHQ6IChnbG9iYWwuVUlLaXQuVUlGaXR0ZWRUZXh0ID0gcmVxdWlyZSgnLi9VSUZpdHRlZFRleHQnKS5kZWZhdWx0KSxcbiAgICBVSUltYWdlOiAoZ2xvYmFsLlVJS2l0LlVJSW1hZ2UgPSByZXF1aXJlKCcuL1VJSW1hZ2UnKS5kZWZhdWx0KSxcbiAgICBVSUxpc3Q6IChnbG9iYWwuVUlLaXQuVUlMaXN0ID0gcmVxdWlyZSgnLi9VSUxpc3QnKS5kZWZhdWx0KSxcbiAgICBVSU1vZGFsOiAoZ2xvYmFsLlVJS2l0LlVJTW9kYWwgPSByZXF1aXJlKCcuL1VJTW9kYWwnKS5kZWZhdWx0KSxcbiAgICBVSVBvcG92ZXI6IChnbG9iYWwuVUlLaXQuVUlQb3BvdmVyID0gcmVxdWlyZSgnLi9VSVBvcG92ZXInKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3MgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3MnKS5kZWZhdWx0KSxcbiAgICBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUnKS5kZWZhdWx0KSxcbiAgICBVSVJhZGlvOiAoZ2xvYmFsLlVJS2l0LlVJUmFkaW8gPSByZXF1aXJlKCcuL1VJUmFkaW8nKS5kZWZhdWx0KSxcbiAgICBVSVNlZ21lbnRlZENvbnRyb2w6IChnbG9iYWwuVUlLaXQuVUlTZWdtZW50ZWRDb250cm9sID0gcmVxdWlyZSgnLi9VSVNlZ21lbnRlZENvbnRyb2wnKS5kZWZhdWx0KSxcbiAgICBVSVRhYmxlOiAoZ2xvYmFsLlVJS2l0LlVJVGFibGUgPSByZXF1aXJlKCcuL1VJVGFibGUnKS5kZWZhdWx0KSxcbiAgICBVSVRva2VuaXplZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVG9rZW5pemVkSW5wdXQgPSByZXF1aXJlKCcuL1VJVG9rZW5pemVkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVRvb2x0aXA6IChnbG9iYWwuVUlLaXQuVUlUb29sdGlwID0gcmVxdWlyZSgnLi9VSVRvb2x0aXAnKS5kZWZhdWx0KSxcbiAgICBVSVR5cGVhaGVhZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVHlwZWFoZWFkSW5wdXQgPSByZXF1aXJlKCcuL1VJVHlwZWFoZWFkSW5wdXQnKS5kZWZhdWx0KSxcbiAgICBVSVZpZXc6IChnbG9iYWwuVUlLaXQuVUlWaWV3ID0gcmVxdWlyZSgnLi9VSVZpZXcnKS5kZWZhdWx0KSxcbn07XG4iXX0=
