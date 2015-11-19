require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UIButton = (function (_UIView) {
    _inherits(UIButton, _UIView);

    function UIButton() {
        _classCallCheck(this, UIButton);

        _get(Object.getPrototypeOf(UIButton.prototype), 'constructor', this).apply(this, arguments);
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
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('button', _extends({}, this.props.attrs, {
                ref: 'button',
                id: this.props.id || this.props.attrs.id,
                className: (0, _classnames2['default'])((_cx = {
                    'ui-button': true,
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                'aria-pressed': this.props.pressed,
                onKeyDown: this.handleKeyDown.bind(this),
                onClick: this.handleClick.bind(this),
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.props.children);
        }
    }]);

    return UIButton;
})(_UIView3['default']);

UIButton.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onPressed: _react2['default'].PropTypes.func,
    onUnpressed: _react2['default'].PropTypes.func,
    pressed: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
};

UIButton.defaultProps = {
    attrs: {},
    onClick: _UIUtilsNoop2['default'],
    onPressed: _UIUtilsNoop2['default'],
    onUnpressed: _UIUtilsNoop2['default']
};

exports['default'] = UIButton;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],2:[function(require,module,exports){
/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UICheckbox = (function (_UIView) {
    _inherits(UICheckbox, _UIView);

    function UICheckbox() {
        _classCallCheck(this, UICheckbox);

        _get(Object.getPrototypeOf(UICheckbox.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UICheckbox, [{
        key: 'initialState',
        value: function initialState() {
            return {
                id: this.props.inputAttrs.id || this.uuid()
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
            return _react2['default'].createElement('input', _extends({}, this.props.inputAttrs, {
                ref: 'input',
                type: 'checkbox',
                id: this.state.id,
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.indeterminate,
                    'ui-checkbox-checked': this.props.checked,
                    'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked
                }, this.props.inputAttrs.className, !!this.props.inputAttrs.className)),
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
                return _react2['default'].createElement('label', _extends({}, this.props.labelAttrs, {
                    ref: 'label',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-checkbox-label': true
                    }, this.props.labelAttrs.className, !!this.props.labelAttrs.className)),
                    htmlFor: this.state.id }), this.props.label);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx3;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx3 = {
                    'ui-checkbox-wrapper': true
                }, _defineProperty(_cx3, this.props.className, !!this.props.className), _defineProperty(_cx3, this.props.attrs.className, !!this.props.attrs.className), _cx3)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderInput(), this.renderLabel());
        }
    }]);

    return UICheckbox;
})(_UIView3['default']);

UICheckbox.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    checked: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    indeterminate: _react2['default'].PropTypes.bool,
    inputAttrs: _react2['default'].PropTypes.object,
    label: _react2['default'].PropTypes.node,
    labelAttrs: _react2['default'].PropTypes.object,
    name: _react2['default'].PropTypes.string.isRequired,
    onChecked: _react2['default'].PropTypes.func,
    onUnchecked: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.string
};

UICheckbox.defaultProps = {
    attrs: {},
    checked: false,
    indeterminate: false,
    inputAttrs: {},
    labelAttrs: {},
    onChecked: _UIUtilsNoop2['default'],
    onUnchecked: _UIUtilsNoop2['default']
};

exports['default'] = UICheckbox;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],3:[function(require,module,exports){
/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 * @class UICheckboxGroup
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UICheckbox = require('../UICheckbox');

var _UICheckbox2 = _interopRequireDefault(_UICheckbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UICheckboxGroup = (function (_UIView) {
    _inherits(UICheckboxGroup, _UIView);

    function UICheckboxGroup() {
        _classCallCheck(this, UICheckboxGroup);

        _get(Object.getPrototypeOf(UICheckboxGroup.prototype), 'constructor', this).apply(this, arguments);
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

                return _react2['default'].createElement(_UICheckbox2['default'], { attrs: this.props.selectAllAttrs,
                    ref: 'select_all',
                    name: 'cb_select_all',
                    key: 'cb_select_all',
                    checked: allChecked,
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-checkbox-group-selectall': true
                    }, this.props.selectAllAttrs.className, !!this.props.selectAllAttrs.className)),
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    label: this.props.selectAllLabel,
                    onChecked: this.props.onAllChecked,
                    onUnchecked: this.props.onAllUnchecked });
            }
        }
    }, {
        key: 'renderCheckboxes',
        value: function renderCheckboxes() {
            var _this = this;

            return this.props.items.map(function (item) {
                return _react2['default'].createElement(_UICheckbox2['default'], _extends({}, item, {
                    ref: 'cb_item.name',
                    key: item.name,
                    onChecked: _this.props.onChildChecked,
                    onUnchecked: _this.props.onChildUnchecked }));
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
            var _cx2;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'group',
                className: (0, _classnames2['default'])((_cx2 = {
                    'ui-checkbox-group': true
                }, _defineProperty(_cx2, this.props.className, !!this.props.className), _defineProperty(_cx2, this.props.attrs.className, !!this.props.attrs.className), _cx2)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderChildren());
        }
    }]);

    return UICheckboxGroup;
})(_UIView3['default']);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};

UICheckboxGroup.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    items: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
        checked: _react2['default'].PropTypes.bool.isRequired,
        label: _react2['default'].PropTypes.string,
        name: _react2['default'].PropTypes.string.isRequired,
        value: _react2['default'].PropTypes.string
    })).isRequired,
    onAllChecked: _react2['default'].PropTypes.func,
    onAllUnchecked: _react2['default'].PropTypes.func,
    onChildChecked: _react2['default'].PropTypes.func,
    onChildUnchecked: _react2['default'].PropTypes.func,
    selectAll: _react2['default'].PropTypes.bool,
    selectAllAttrs: _react2['default'].PropTypes.object,
    selectAllLabel: _react2['default'].PropTypes.string,
    selectAllPosition: _react2['default'].PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER]),
    style: _react2['default'].PropTypes.object
};

UICheckboxGroup.defaultProps = {
    attrs: {},
    items: [],
    onAllChecked: _UIUtilsNoop2['default'],
    onAllUnchecked: _UIUtilsNoop2['default'],
    onChildChecked: _UIUtilsNoop2['default'],
    onChildUnchecked: _UIUtilsNoop2['default'],
    selectAllAttrs: {},
    selectAllLabel: 'Select All',
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};

exports['default'] = UICheckboxGroup;
module.exports = exports['default'];

},{"../UICheckbox":2,"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],4:[function(require,module,exports){
/**
 * A non-blocking, focus-stealing container.
 * @class UIDialog
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UIDialog = (function (_UIView) {
    _inherits(UIDialog, _UIView);

    function UIDialog() {
        _classCallCheck(this, UIDialog);

        _get(Object.getPrototypeOf(UIDialog.prototype), 'constructor', this).apply(this, arguments);
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
                _reactDom2['default'].findDOMNode(this).focus();
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
            return _reactDom2['default'].findDOMNode(this).contains(node);
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
        key: 'handleKeydown',
        value: function handleKeydown(event) {
            if (this.props.closeOnEscKey && event.key === 'Escape') {
                this.props.onClose();
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
                return _react2['default'].createElement('div', _extends({}, this.props.bodyAttrs, {
                    ref: 'body',
                    id: this.state.bodyUUID,
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-dialog-body': true
                    }, this.props.bodyAttrs.className, !!this.props.bodyAttrs.className)) }), this.props.body);
            }
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            if (this.props.footer) {
                return _react2['default'].createElement('footer', _extends({}, this.props.footerAttrs, {
                    ref: 'footer',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-dialog-footer': true
                    }, this.props.footerAttrs.className, !!this.props.footerAttrs.className)) }), this.props.footer);
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (this.props.header) {
                return _react2['default'].createElement('header', _extends({}, this.props.headerAttrs, {
                    ref: 'header',
                    id: this.state.headerUUID,
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-dialog-header': true
                    }, this.props.headerAttrs.className, !!this.props.headerAttrs.className)) }), this.props.header);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx4;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'dialog',
                className: (0, _classnames2['default'])((_cx4 = {
                    'ui-dialog': true
                }, _defineProperty(_cx4, this.props.className, !!this.props.className), _defineProperty(_cx4, this.props.attrs.className, !!this.props.attrs.className), _cx4)),
                id: this.props.id || this.props.attrs.id,
                onDragEnd: this.handleDrop,
                onKeyDown: this.handleKeydown.bind(this),
                role: 'dialog',
                'aria-labelledby': this.state.headerUUID,
                'aria-describedby': this.state.bodyUUID,
                style: _extends({}, this.props.style, this.props.attrs.style),
                tabIndex: '0' }), this.renderHeader(), this.props.children || this.renderBody(), this.renderFooter());
        }
    }]);

    return UIDialog;
})(_UIView3['default']);

UIDialog.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    body: _react2['default'].PropTypes.node,
    bodyAttrs: _react2['default'].PropTypes.object,
    captureFocus: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    closeOnEscKey: _react2['default'].PropTypes.bool,
    closeOnOutsideClick: _react2['default'].PropTypes.bool,
    footer: _react2['default'].PropTypes.node,
    footerAttrs: _react2['default'].PropTypes.object,
    header: _react2['default'].PropTypes.node,
    headerAttrs: _react2['default'].PropTypes.object,
    id: _react2['default'].PropTypes.string,
    onClose: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object
};

UIDialog.defaultProps = {
    attrs: {},
    bodyAttrs: {},
    captureFocus: true,
    footerAttrs: {},
    headerAttrs: {},
    onClose: _UIUtilsNoop2['default']
};

exports['default'] = UIDialog;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],5:[function(require,module,exports){
/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

var UIFittedText = (function (_UIView) {
    _inherits(UIFittedText, _UIView);

    function UIFittedText() {
        _classCallCheck(this, UIFittedText);

        _get(Object.getPrototypeOf(UIFittedText.prototype), 'constructor', this).apply(this, arguments);
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
            var node = _reactDom2['default'].findDOMNode(this);
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
            var _cx;

            return _react2['default'].createElement('span', _extends({}, this.props.attrs, {
                className: (0, _classnames2['default'])((_cx = {
                    'ui-text': true
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.props.children);
        }
    }]);

    return UIFittedText;
})(_UIView3['default']);

UIFittedText.defaultProps = {
    attrs: {},
    maxFontSize: Number.MAX_VALUE
};

UIFittedText.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    maxFontSize: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
};

exports['default'] = UIFittedText;
module.exports = exports['default'];

},{"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UIImage = (function (_UIView) {
    _inherits(UIImage, _UIView);

    function UIImage() {
        _classCallCheck(this, UIImage);

        _get(Object.getPrototypeOf(UIImage.prototype), 'constructor', this).apply(this, arguments);
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
            var _this = this;

            if (this.loader) {
                return;
            }

            this.loader = document.createElement('img');

            this.loader.onload = function () {
                return _this.setState({ status: UIImage.status.LOADED });
            };
            this.loader.onerror = function () {
                return _this.setState({ status: UIImage.status.ERROR });
            };

            this.loader.src = this.props.src;
        }
    }, {
        key: 'renderImage',
        value: function renderImage() {
            if (this.props.displayAsBackgroundImage) {
                return _react2['default'].createElement('div', _extends({}, this.props.imageAttrs, {
                    ref: 'image',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-image': true
                    }, this.props.imageAttrs.className, !!this.props.imageAttrs.className)),
                    title: this.props.alt,
                    style: _extends({}, this.props.imageAttrs.style, {
                        backgroundImage: 'url(' + this.props.src + ')'
                    }) }));
            }

            return _react2['default'].createElement('img', _extends({}, this.props.imageAttrs, {
                ref: 'image',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-image': true
                }, this.props.imageAttrs.className, !!this.props.imageAttrs.className)),
                src: this.props.src,
                alt: this.props.alt,
                onLoad: _UIUtilsNoop2['default'],
                onError: _UIUtilsNoop2['default'] }));
        }
    }, {
        key: 'renderStatus',
        value: function renderStatus() {
            return _react2['default'].createElement('div', _extends({}, this.props.statusAttrs, {
                ref: 'status',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR
                }, this.props.statusAttrs.className, !!this.props.statusAttrs.className)),
                role: 'presentation' }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx4;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx4 = {
                    'ui-image-wrapper': true
                }, _defineProperty(_cx4, this.props.className, !!this.props.className), _defineProperty(_cx4, this.props.attrs.className, !!this.props.attrs.className), _cx4)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderImage(), this.renderStatus());
        }
    }]);

    return UIImage;
})(_UIView3['default']);

UIImage.status = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR'
};

UIImage.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    alt: _react2['default'].PropTypes.string,
    className: _react2['default'].PropTypes.string,
    displayAsBackgroundImage: _react2['default'].PropTypes.bool,
    imageAttrs: _react2['default'].PropTypes.object,
    src: _react2['default'].PropTypes.string.isRequired,
    statusAttrs: _react2['default'].PropTypes.object
};

UIImage.defaultProps = {
    attrs: {},
    imageAttrs: {},
    statusAttrs: {}
};

exports['default'] = UIImage;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],7:[function(require,module,exports){
/**
 * A generic list view, supporting unstyled, bulleted and numbered output.
 * @class UIList
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UIList = (function (_UIView) {
    _inherits(UIList, _UIView);

    function UIList() {
        _classCallCheck(this, UIList);

        _get(Object.getPrototypeOf(UIList.prototype), 'constructor', this).apply(this, arguments);
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
            var key = event.key;
            var hasType = !!this.props.type;
            var items = this.props.items;
            var activeItem = this.state.activeItem;

            if (hasType) {
                if (key === 'ArrowUp') {
                    this.setFocus(this.getPreviousItemIndex(activeItem));
                    event.preventDefault();
                } else if (key === 'ArrowDown') {
                    this.setFocus(this.getNextItemIndex(activeItem));
                    event.preventDefault();
                }
            } else {
                var activeItemIndex = items.indexOf(activeItem);

                if (key === 'ArrowLeft' || key === 'Tab' && event.shiftKey && activeItemIndex !== 0) {
                    this.setFocus(this.getPreviousItemIndex(activeItem));
                    event.preventDefault();
                } else if (key === 'ArrowRight' || key === 'Tab' && !event.shiftKey && activeItemIndex !== items.length - 1) {
                    this.setFocus(this.getNextItemIndex(activeItem));
                    event.preventDefault();
                }
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this = this;

            var nodeType = this.props.type ? 'li' : 'span';

            return this.props.items.map(function (item, index) {
                return _react2['default'].createElement(nodeType, {
                    className: 'ui-list-item',
                    ref: 'item_' + index,
                    key: _this.createHashedKey(item) + index, // in case 2 pieces of content are identical
                    tabIndex: 0,
                    onBlur: function onBlur() {
                        return _this.state.activeItem === item && _this.setState({ activeItem: null });
                    },
                    onFocus: function onFocus() {
                        return _this.setState({ activeItem: item });
                    },
                    children: item
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            var nodeType = 'div';

            switch (this.props.type) {
                case 'bullet':
                    nodeType = 'ul';
                    break;

                case 'number':
                    nodeType = 'ol';
                    break;
            }

            return _react2['default'].createElement(nodeType, _extends({}, this.props.attrs, {
                ref: 'list',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-list': true,
                    'ui-list-bulleted': this.props.type === 'bullet',
                    'ui-list-numbered': this.props.type === 'number',
                    'ui-list-plain': this.props.type !== 'bullet' && this.props.type !== 'number'
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                onKeyDown: this.handleKeyDown.bind(this),
                style: _extends({}, this.props.style, this.props.attrs.style),
                children: this.renderContent()
            }));
        }
    }]);

    return UIList;
})(_UIView3['default']);

UIList.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    items: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.node),
    type: _react2['default'].PropTypes.oneOf(['bullet', 'number']),
    style: _react2['default'].PropTypes.object
};

UIList.defaultProps = {
    attrs: {},
    items: []
};

exports['default'] = UIList;
module.exports = exports['default'];

},{"../UIView":23,"classnames":24,"react":"react"}],8:[function(require,module,exports){
/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UIModal = (function (_UIView) {
    _inherits(UIModal, _UIView);

    function UIModal() {
        _classCallCheck(this, UIModal);

        _get(Object.getPrototypeOf(UIModal.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UIModal, [{
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-modal-wrapper': true
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), _react2['default'].createElement('div', _extends({}, this.props.maskAttrs, {
                ref: 'mask',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-modal-mask': true
                }, this.props.maskAttrs.className, !!this.props.maskAttrs.className)) })), _react2['default'].createElement(_UIDialog2['default'], _extends({}, this.props, {
                attrs: this.props.modalAttrs,
                ref: 'dialog',
                id: undefined,
                style: undefined,
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-modal': true
                }, this.props.modalAttrs.className, !!this.props.modalAttrs.className)) })));
        }
    }]);

    return UIModal;
})(_UIView3['default']);

UIModal.propTypes = _extends({}, _UIDialog2['default'].propTypes, {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    maskAttrs: _react2['default'].PropTypes.object,
    modalAttrs: _react2['default'].PropTypes.object,
    style: _react2['default'].PropTypes.object
});

UIModal.defaultProps = {
    attrs: {},
    maskAttrs: {},
    modalAttrs: {}
};

exports['default'] = UIModal;
module.exports = exports['default'];

},{"../UIDialog":4,"../UIView":23,"classnames":24,"react":"react"}],9:[function(require,module,exports){
/**
 * A non-blocking container positioned to a specific anchor element.
 * @class UIPopover
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UIUtilsTransform = require('../UIUtils/transform');

var _UIUtilsTransform2 = _interopRequireDefault(_UIUtilsTransform);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UIPopover = (function (_UIView) {
    _inherits(UIPopover, _UIView);

    function UIPopover() {
        _classCallCheck(this, UIPopover);

        _get(Object.getPrototypeOf(UIPopover.prototype), 'constructor', this).apply(this, arguments);
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
            this.node = _reactDom2['default'].findDOMNode(this.refs.dialog);

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
            _reactDom2['default'].unmountComponentAtNode(this.container);
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
                corrections.selfYAlign = UIPopover.position.START;
            }

            return corrections;
        }
    }, {
        key: 'applyTranslation',
        value: function applyTranslation(node, x, y) {
            if (_UIUtilsTransform2['default']) {
                node.style[_UIUtilsTransform2['default']] = 'translate(' + x + 'px, ' + y + 'px)';
            } else {
                node.style.left = x + 'px';
                node.style.top = y + 'px';
            }
        }
    }, {
        key: 'align',
        value: function align() {
            var anchor = this.props.anchor instanceof HTMLElement ? this.props.anchor : _reactDom2['default'].findDOMNode(this.props.anchor);

            var x = this.getNextXPosition(anchor, this.node);
            var y = this.getNextYPosition(anchor, this.node);

            var alignmentCorrection = this.getAlignmentCorrectionIfOverflowing(this.node, x, y);

            if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
                this.setState(alignmentCorrection);
            } else {
                this.applyTranslation(this.node, x, y);
            }
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

            return _reactDom2['default'].render(_react2['default'].createElement(_UIDialog2['default'], _extends({}, this.props, {
                captureFocus: false,
                className: (0, _classnames2['default'])((_cx = {
                    'ui-popover': true
                }, _defineProperty(_cx, 'ui-popover-anchor-x-' + getFrag(state.anchorXAlign), true), _defineProperty(_cx, 'ui-popover-anchor-y-' + getFrag(state.anchorYAlign), true), _defineProperty(_cx, 'ui-popover-self-x-' + getFrag(state.selfXAlign), true), _defineProperty(_cx, 'ui-popover-self-y-' + getFrag(state.selfYAlign), true), _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                style: _extends({}, this.props.style, this.props.attrs.style, {
                    position: 'absolute',
                    top: '0px',
                    left: '0px'
                }) })), this.container);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('div', null);
        }
    }]);

    return UIPopover;
})(_UIView3['default']);

UIPopover.position = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};

UIPopover.propTypes = _extends({}, _UIDialog2['default'].propTypes, {
    attrs: _react2['default'].PropTypes.object,
    anchor: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.instanceOf(HTMLElement), _react2['default'].PropTypes.shape({
        props: _react2['default'].PropTypes.object,
        state: _react2['default'].PropTypes.object
    })]). // a react element of some fashion, React.PropTypes.element wasn't working
    isRequired,
    anchorXAlign: _react2['default'].PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    anchorYAlign: _react2['default'].PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    autoReposition: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    selfXAlign: _react2['default'].PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    selfYAlign: _react2['default'].PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    style: _react2['default'].PropTypes.object
});

UIPopover.defaultProps = {
    attrs: {},
    anchorXAlign: UIPopover.position.START,
    anchorYAlign: UIPopover.position.END,
    autoReposition: true,
    selfXAlign: UIPopover.position.START,
    selfYAlign: UIPopover.position.START
};

exports['default'] = UIPopover;
module.exports = exports['default'];

},{"../UIDialog":4,"../UIUtils/transform":22,"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],10:[function(require,module,exports){
/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 * @class UIProgress
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIButton = require('../UIButton');

var _UIButton2 = _interopRequireDefault(_UIButton);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UIProgress = (function (_UIView) {
    _inherits(UIProgress, _UIView);

    function UIProgress() {
        _classCallCheck(this, UIProgress);

        _get(Object.getPrototypeOf(UIProgress.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UIProgress, [{
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return _react2['default'].createElement('div', _extends({}, this.props.labelAttrs, {
                    ref: 'label',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-progress-label': true
                    }, this.props.labelAttrs.className, !!this.props.labelAttrs.className)) }), this.props.label);
            }
        }
    }, {
        key: 'renderCancel',
        value: function renderCancel() {
            if (this.props.onCancel) {
                return _react2['default'].createElement(_UIButton2['default'], { attrs: this.props.cancelAttrs,
                    ref: 'cancel',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-progress-cancel': true
                    }, this.props.cancelAttrs.className, !!this.props.cancelAttrs.className)),
                    onClick: this.props.onCancel });
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            return _react2['default'].createElement('div', _extends({}, this.props.progressAttrs, {
                ref: 'progress',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
                }, this.props.progressAttrs.className, !!this.props.progressAttrs.className)),
                role: 'presentation',
                style: _extends({}, this.props.progressAttrs.style, _defineProperty({}, this.props.tweenProperty, this.props.progress)) }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx4;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx4 = {
                    'ui-progress-wrapper': true
                }, _defineProperty(_cx4, this.props.className, !!this.props.className), _defineProperty(_cx4, this.props.attrs.className, !!this.props.attrs.className), _cx4)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderProgress(), this.renderLabel(), this.renderCancel());
        }
    }]);

    return UIProgress;
})(_UIView3['default']);

UIProgress.defaultProps = {
    attrs: {},
    cancelAttrs: {},
    labelAttrs: {},
    progressAttrs: {},
    tweenProperty: 'width'
};

UIProgress.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    cancelAttrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    label: _react2['default'].PropTypes.node,
    labelAttrs: _react2['default'].PropTypes.object,
    onCancel: _react2['default'].PropTypes.func,
    progress: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    progressAttrs: _react2['default'].PropTypes.object,
    tweenProperty: _react2['default'].PropTypes.string,
    style: _react2['default'].PropTypes.object
};

exports['default'] = UIProgress;
module.exports = exports['default'];

},{"../UIButton":1,"../UIView":23,"classnames":24,"react":"react"}],11:[function(require,module,exports){
/**
 * Hide content until it's needed.
 * @class UIProgressiveDisclosure
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UIProgressiveDisclosure = (function (_UIView) {
    _inherits(UIProgressiveDisclosure, _UIView);

    function UIProgressiveDisclosure() {
        _classCallCheck(this, UIProgressiveDisclosure);

        _get(Object.getPrototypeOf(UIProgressiveDisclosure.prototype), 'constructor', this).apply(this, arguments);
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
            var _this = this;

            if (newProps.expanded !== this.props.expanded) {
                this.setState({ expanded: newProps.expanded }, function () {
                    return _this.dispatchCallback();
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var _this2 = this;

            this.setState({ expanded: !this.state.expanded }, function () {
                return _this2.dispatchCallback();
            });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this3 = this;

            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    this.setState({ expanded: !this.state.expanded }, function () {
                        return _this3.dispatchCallback();
                    });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), _react2['default'].createElement('div', _extends({}, this.props.toggleAttrs, {
                ref: 'toggle',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-disclosure-toggle': true
                }, this.props.toggleAttrs.className, !!this.props.toggleAttrs.className)),
                onClick: this.handleClick.bind(this),
                onKeyDown: this.handleKeyDown.bind(this),
                tabIndex: '0' }), this.props.teaser), _react2['default'].createElement('div', { ref: 'content',
                className: 'ui-disclosure-content' }, this.props.children));
        }
    }]);

    return UIProgressiveDisclosure;
})(_UIView3['default']);

exports['default'] = UIProgressiveDisclosure;

UIProgressiveDisclosure.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    expanded: _react2['default'].PropTypes.bool,
    onExpand: _react2['default'].PropTypes.func,
    onHide: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    teaser: _react2['default'].PropTypes.node,
    toggleAttrs: _react2['default'].PropTypes.object
};

UIProgressiveDisclosure.defaultProps = {
    attrs: {},
    expanded: false,
    onExpand: _UIUtilsNoop2['default'],
    onHide: _UIUtilsNoop2['default'],
    toggleAttrs: {}
};

exports['default'] = UIProgressiveDisclosure;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],12:[function(require,module,exports){
/**
 * An accessible radio form control.
 * @class UIRadio
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UIRadio = (function (_UIView) {
    _inherits(UIRadio, _UIView);

    function UIRadio() {
        _classCallCheck(this, UIRadio);

        _get(Object.getPrototypeOf(UIRadio.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UIRadio, [{
        key: 'initialState',
        value: function initialState() {
            return {
                id: this.props.inputAttrs.id || this.uuid()
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            if (event.target.checked) {
                this.props.onSelected(event.target.value);
            }
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            return _react2['default'].createElement('input', _extends({}, this.props.inputAttrs, {
                ref: 'input',
                type: 'radio',
                id: this.state.id,
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-radio': true,
                    'ui-radio-selected': this.props.selected
                }, this.props.inputAttrs.className, !!this.props.inputAttrs.className)),
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
                return _react2['default'].createElement('label', _extends({}, this.props.labelAttrs, {
                    ref: 'label',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-radio-label': true
                    }, this.props.labelAttrs.className, !!this.props.labelAttrs.className)),
                    htmlFor: this.state.id }), this.props.label);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx3;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx3 = {
                    'ui-radio-wrapper': true
                }, _defineProperty(_cx3, this.props.className, !!this.props.className), _defineProperty(_cx3, this.props.attrs.className, !!this.props.attrs.className), _cx3)),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderInput(), this.renderLabel());
        }
    }]);

    return UIRadio;
})(_UIView3['default']);

UIRadio.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    inputAttrs: _react2['default'].PropTypes.object,
    label: _react2['default'].PropTypes.node,
    labelAttrs: _react2['default'].PropTypes.object,
    name: _react2['default'].PropTypes.string.isRequired,
    onSelected: _react2['default'].PropTypes.func,
    selected: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.string.isRequired
};

UIRadio.defaultProps = {
    attrs: {},
    inputAttrs: {},
    labelAttrs: {},
    onSelected: _UIUtilsNoop2['default'],
    selected: false
};

exports['default'] = UIRadio;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],13:[function(require,module,exports){
/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 * @class UISegmentedControl
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UISegmentedControl = (function (_UIView) {
    _inherits(UISegmentedControl, _UIView);

    function UISegmentedControl() {
        _classCallCheck(this, UISegmentedControl);

        _get(Object.getPrototypeOf(UISegmentedControl.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UISegmentedControl, [{
        key: 'handleClick',
        value: function handleClick(option) {
            this.props.onOptionSelected(option.value);
        }
    }, {
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
        value: function handleBlur(option) {
            if (this.state.indexOfOptionInFocus === option) {
                this.setState({ indexOfOptionInFocus: null });
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(option) {
            this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });
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
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var _this = this;

            return this.props.options.map(function (definition, index) {
                return _react2['default'].createElement('div', _extends({}, definition, {
                    role: 'radio',
                    'aria-checked': String(definition.selected),
                    ref: 'option_$' + index,
                    key: definition.value,
                    className: (0, _classnames2['default'])({
                        'ui-segmented-control-option': true,
                        'ui-segmented-control-option-selected': definition.selected
                    }),
                    tabIndex: definition.selected ? 0 : -1,
                    onBlur: _this.handleBlur.bind(_this, definition),
                    onClick: _this.handleClick.bind(_this, definition),
                    onFocus: _this.handleFocus.bind(_this, definition) }), definition.content);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                'aria-required': 'radiogroup',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-segmented-control': true
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                onKeyDown: this.handleKeyDown.bind(this),
                id: this.props.id || this.props.attrs.id,
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderOptions());
        }
    }]);

    return UISegmentedControl;
})(_UIView3['default']);

UISegmentedControl.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    onOptionSelected: _react2['default'].PropTypes.func,
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
    attrs: {},
    options: [],
    onOptionSelected: _UIUtilsNoop2['default']
};

exports['default'] = UISegmentedControl;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var UITableCell = (function (_UIView) {
    _inherits(UITableCell, _UIView);

    function UITableCell() {
        _classCallCheck(this, UITableCell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(UITableCell.prototype), 'constructor', this).apply(this, args);

        this.handleClick = this.handleClick.bind(this);
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
                return _react2['default'].createElement('div', { className: 'ui-table-cell-inner' }, _react2['default'].createElement('span', { className: 'ui-table-cell-inner-text' }, this.props.content));
            }

            return this.props.content;
        }
    }, {
        key: 'render',
        value: function render() {
            var addTitle = typeof this.props.content === 'string';

            return _react2['default'].createElement('div', { className: 'ui-table-cell',
                title: addTitle ? this.props.content : null,
                style: { width: this.props.width ? this.props.width + 'px' : null },
                onClick: this.handleClick }, this.renderContent());
        }
    }]);

    return UITableCell;
})(_UIView3['default']);

UITableCell.propTypes = {
    content: _react2['default'].PropTypes.node,
    width: _react2['default'].PropTypes.number,
    onInteract: _react2['default'].PropTypes.func,
    row: _react2['default'].PropTypes.object
};

exports['default'] = UITableCell;
module.exports = exports['default'];

},{"../UIView":23,"react":"react"}],15:[function(require,module,exports){
/**
 * A high-performance, infinite table view.
 * @class UITable
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _UIUtilsTransform = require('../UIUtils/transform');

var _UIUtilsTransform2 = _interopRequireDefault(_UIUtilsTransform);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
        _classCallCheck(this, UITable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(UITable.prototype), 'constructor', this).apply(this, args);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleMoveIntent = this.handleMoveIntent.bind(this);

        this.handleXScrollerDragStart = this.handleXScrollerDragStart.bind(this);
        this.handleYScrollerDragStart = this.handleYScrollerDragStart.bind(this);
        this.handleColumnDragStart = this.handleColumnDragStart.bind(this);
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
                var node = _reactDom2['default'].findDOMNode(this).querySelector('.ui-table-header-cell');

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
            var container = _reactDom2['default'].findDOMNode(this);

            this.cellHeight = firstRowCells[0].clientHeight;
            this.containerHeight = container.clientHeight;
            this.containerWidth = container.clientWidth;

            this.nRowsToRender = Math.ceil(this.containerHeight * 1.3 / this.cellHeight);

            this.rowStartIndex = 0;
            this.rowEndIndex = this.nRowsToRender;

            var tableWidth = firstRow.clientWidth;

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
                this.refs.head.style[_UIUtilsTransform2['default']] = 'translate3d(' + this.xNext + 'px, 0px, 0px)';
            }

            /* Move wrapper */
            this.refs.body.style[_UIUtilsTransform2['default']] = 'translate3d(' + this.xNext + 'px, ' + this.yNext + 'px, 0px)';

            /* move scrollbar nubs */
            this.refs.xScrollerNub.style[_UIUtilsTransform2['default']] = 'translate3d(' + Math.abs(this.xNext) + 'px, 0px, 0px)';

            this.yScrollNubPosition = this.rowStartIndex / this.props.totalRows * this.containerHeight;

            if (this.yScrollNubPosition + this.state.yScrollerNubSize > this.containerHeight) {
                this.yScrollNubPosition = this.containerHeight - this.state.yScrollerNubSize;
            }

            this.refs.yScrollerNub.style[_UIUtilsTransform2['default']] = 'translate3d(0px, ' + this.yScrollNubPosition + 'px, 0px)';

            this.xCurrent = this.xNext;
            this.yCurrent = this.yNext;
        }
    }, {
        key: 'handleColumnResize',
        value: function handleColumnResize(delta) {
            var _this = this;

            if (delta === 0) {
                return;
            }

            var adjustedDelta = delta;
            var newTableWidth = 0;

            var copy = this.state.columns.map(function (definition) {
                if (definition.mapping !== _this.manuallyResizingColumn.mapping) {
                    newTableWidth += definition.width;

                    return definition;
                }

                /* Before any measurements are applied, first we need to compare the delta to the known cell width thresholds and scale appropriately. */

                if (adjustedDelta < 0 && !isNaN(_this.minimumColumnWidth) && definition.width + adjustedDelta < _this.minimumColumnWidth) {
                    adjustedDelta = _this.minimumColumnWidth - definition.width;
                } else if (!isNaN(_this.maximumColumnWidth) && definition.width + adjustedDelta > _this.maximumColumnWidth) {
                    adjustedDelta = _this.maximumColumnWidth - definition.width;
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
                    _this.handleMoveIntent({
                        deltaX: adjustedDelta,
                        deltaY: 0,
                        preventDefault: _UIUtilsNoop2['default']
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
                        preventDefault: _UIUtilsNoop2['default']
                    });

                    this.lastXScroll = event.clientX;
                }

                if (this.manuallyScrollingY) {
                    this.handleMoveIntent({
                        deltaX: 0,
                        deltaY: (event.clientY - this.lastYScroll) / this.containerHeight * this.props.totalRows * this.cellHeight,
                        preventDefault: _UIUtilsNoop2['default']
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
                this.props.onRowInteract(event, clickedRowData);
            }

            this.setState({ currentActiveRowIndex: findWhere(this.state.rows, 'data', clickedRowData).setIndex });
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this2 = this;

            return this.state.rows.map(function (row, index) {
                return _react2['default'].createElement(_row2['default'], { key: index,
                    active: row.setIndex === _this2.state.currentActiveRowIndex,
                    columns: _this2.state.columns,
                    data: row.data,
                    even: row.setIndex % 2 === 0,
                    y: row.y,
                    onInteract: _this2.handleRowClick,
                    onCellInteract: _this2.props.onCellInteract });
            });
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return _react2['default'].createElement('div', { ref: 'body',
                className: 'ui-table-body' }, this.renderRows());
        }
    }, {
        key: 'renderHead',
        value: function renderHead() {
            var _this3 = this;

            if (!this.state.chokeRender) {
                return _react2['default'].createElement('div', { ref: 'head', className: 'ui-table-header' }, _react2['default'].createElement('div', { className: 'ui-table-row ui-table-header-row' }, this.state.columns.map(function (column, index) {
                    return _react2['default'].createElement('div', { key: index,
                        className: 'ui-table-cell ui-table-header-cell',
                        style: { width: typeof column.width === 'number' ? column.width : null } }, _react2['default'].createElement('div', { className: 'ui-table-cell-inner' }, _react2['default'].createElement('span', { className: 'ui-table-cell-inner-text' }, column.title)), _react2['default'].createElement('div', { className: 'ui-table-header-cell-resize-handle',
                        'data-column-index': index,
                        onMouseDown: _this3.handleColumnDragStart }));
                })));
            }
        }
    }, {
        key: 'renderScrollbars',
        value: function renderScrollbars() {
            return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { className: 'ui-table-x-scroller',
                onMouseDown: this.handleXScrollerDragStart }, _react2['default'].createElement('div', { ref: 'xScrollerNub',
                className: 'ui-table-x-scroller-nub',
                style: { width: this.state.xScrollerNubSize } })), _react2['default'].createElement('div', { className: 'ui-table-y-scroller',
                onMouseDown: this.handleYScrollerDragStart }, _react2['default'].createElement('div', { ref: 'yScrollerNub',
                className: 'ui-table-y-scroller-nub',
                style: { height: this.state.yScrollerNubSize } })));
        }
    }, {
        key: 'changeActiveRow',
        value: function changeActiveRow(delta) {
            var _this4 = this;

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
                            preventDefault: _UIUtilsNoop2['default']
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
                    preventDefault: _UIUtilsNoop2['default']
                });

                // start the process again, now that the row is available
                window.requestAnimationFrame(function () {
                    return _this4.changeActiveRow(delta);
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

            if (this.props.handleKeyDown) {
                event.persist();
                this.props.handleKeyDown(event);
            }
        }
    }, {
        key: 'renderNotification',
        value: function renderNotification() {
            return _react2['default'].createElement('div', { ref: 'aria',
                className: this.props.offscreenClass,
                'aria-live': 'polite' }, this.state.ariaSpokenOutput);
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-table-wrapper': true
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                onKeyDown: this.handleKeyDown,
                onMouseMove: this.handleDragMove,
                onMouseUp: this.handleDragEnd,
                onWheel: this.handleMoveIntent,
                tabIndex: '0',
                style: _extends({}, this.props.style, this.props.attrs.style) }), _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'table',
                className: 'ui-table' }), this.renderHead(), this.renderBody()), this.renderNotification(), this.renderScrollbars());
        }
    }]);

    return UITable;
})(_UIView3['default']);

UITable.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    columns: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
        mapping: _react2['default'].PropTypes.string,
        resizable: _react2['default'].PropTypes.bool,
        title: _react2['default'].PropTypes.string,
        width: _react2['default'].PropTypes.number
    })),
    getRow: _react2['default'].PropTypes.func,
    handleKeyDown: _react2['default'].PropTypes.func,
    id: _react2['default'].PropTypes.string,
    offscreenClass: _react2['default'].PropTypes.string,
    onCellInteract: _react2['default'].PropTypes.func,
    onRowInteract: _react2['default'].PropTypes.func,
    totalRows: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
};

UITable.defaultProps = {
    attrs: {},
    columns: [],
    getRow: _UIUtilsNoop2['default'],
    offscreenClass: 'ui-offscreen'
};

exports['default'] = UITable;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIUtils/transform":22,"../UIView":23,"./row":16,"classnames":24,"react":"react","react-dom":"react-dom"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _UIUtilsTransform = require('../UIUtils/transform');

var _UIUtilsTransform2 = _interopRequireDefault(_UIUtilsTransform);

var UITableRow = (function (_UIView) {
    _inherits(UITableRow, _UIView);

    function UITableRow() {
        _classCallCheck(this, UITableRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(UITableRow.prototype), 'constructor', this).apply(this, args);

        this.handleClick = this.handleClick.bind(this);
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
            var _this = this;

            var data = this.state.data instanceof Promise ? {} : this.state.data;

            if (data) {
                return this.props.columns.map(function (definition, index) {
                    return _react2['default'].createElement(_cell2['default'], { key: index,
                        content: data[definition.mapping],
                        width: definition.width,
                        onInteract: _this.props.onCellInteract,
                        row: _this.state.data });
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
            return _react2['default'].createElement('div', { className: this.getClasses(),
                style: _defineProperty({}, _UIUtilsTransform2['default'], this.props.y ? 'translate3d(0px, ' + this.props.y + 'px, 0px)' : null),
                onClick: this.handleClick }, this.renderCells());
        }
    }]);

    return UITableRow;
})(_UIView3['default']);

UITableRow.propTypes = {
    columns: _react2['default'].PropTypes.array,
    even: _react2['default'].PropTypes.bool,
    data: _react2['default'].PropTypes.object,
    onCellInteract: _react2['default'].PropTypes.func,
    onInteract: _react2['default'].PropTypes.func,
    y: _react2['default'].PropTypes.number
};

exports['default'] = UITableRow;
module.exports = exports['default'];

},{"../UIUtils/transform":22,"../UIView":23,"./cell":14,"react":"react"}],17:[function(require,module,exports){
/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 * @class UITokenizedInput
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
        return Array.from(arr);
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require('../UITypeaheadInput');

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

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

        _get(Object.getPrototypeOf(UITokenizedInput.prototype), 'constructor', this).apply(this, arguments);
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
            var _this = this;

            var previousIndices = prevState.tokenizedEntityIndices;
            var previousSelectedIndices = prevState.tokenizedEntityIndicesSelected;
            var currentIndices = this.state.tokenizedEntityIndices;
            var currentSelectedIndices = this.state.tokenizedEntityIndicesSelected;

            if (previousIndices !== currentIndices) {
                this.props.onTokenChange(currentSelectedIndices.map(function (index) {
                    return _this.props.entities[index];
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
                return _react2['default'].createElement('div', { className: 'ui-tokenfield-token-close',
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
            var _this2 = this;

            return _react2['default'].createElement('div', { className: 'ui-tokenfield-tokens' }, this.state.tokenizedEntityIndices.map(function (index) {
                return _react2['default'].createElement('div', { ref: 'token_' + index,
                    key: index,
                    className: (0, _classnames2['default'])({
                        'ui-tokenfield-token': true,
                        'ui-tokenfield-token-selected': _this2.state.tokenizedEntityIndicesSelected.indexOf(index) !== -1
                    }),
                    onClick: _this2.selectSingleToken.bind(_this2, index),
                    onKeyDown: _this2.handleTokenKeyDown.bind(_this2, index),
                    tabIndex: '0' }, _this2.props.entities[index].content, _this2.renderTokenClose(index));
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx = {
                    'ui-tokenfield-wrapper': true
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                id: this.props.id || this.props.attrs.id,
                onKeyDown: this.handleKeyDown.bind(this),
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderTokens(), _react2['default'].createElement(_UITypeaheadInput2['default'], _extends({}, this.props, {
                attrs: undefined,
                id: undefined,
                style: undefined,
                ref: 'typeahead',
                className: 'ui-tokenfield',
                onEntitySelected: this.handleEntitySelected.bind(this),
                clearPartialInputOnSelection: true })));
        }
    }]);

    return UITokenizedInput;
})(_UIView3['default']);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2['default'].propTypes, {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    defaultValue: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    inputAttrs: _react2['default'].PropTypes.object,
    onTokenChange: _react2['default'].PropTypes.func,
    showTokenClose: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
});

UITokenizedInput.defaultProps = {
    attrs: {},
    entities: [],
    inputAttrs: {},
    onTokenChange: _UIUtilsNoop2['default'],
    showTokenClose: true
};

exports['default'] = UITokenizedInput;
module.exports = exports['default'];

},{"../UITypeaheadInput":19,"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],18:[function(require,module,exports){
/**
 * A wrapper that displays provided text on hover.
 * @class UITooltip
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UITooltip = (function (_UIView) {
    _inherits(UITooltip, _UIView);

    function UITooltip() {
        _classCallCheck(this, UITooltip);

        _get(Object.getPrototypeOf(UITooltip.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UITooltip, [{
        key: 'render',
        value: function render() {
            var _cx;

            var position = this.props.position;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                id: this.props.id || this.props.attrs.id,
                className: (0, _classnames2['default'])((_cx = {
                    'ui-tooltip': true,
                    'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                    'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                    'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                    'ui-tooltip-position-after': position === UITooltip.position.AFTER
                }, _defineProperty(_cx, this.props.className, !!this.props.className), _defineProperty(_cx, this.props.attrs.className, !!this.props.attrs.className), _cx)),
                style: _extends({}, this.props.style, this.props.attrs.style),
                'data-tooltip': this.props.text,
                'aria-label': this.props.text }), this.props.children);
        }
    }]);

    return UITooltip;
})(_UIView3['default']);

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};

UITooltip.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    position: _react2['default'].PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: _react2['default'].PropTypes.string,
    style: _react2['default'].PropTypes.object
};

UITooltip.defaultProps = {
    attrs: {},
    position: UITooltip.position.ABOVE
};

exports['default'] = UITooltip;
module.exports = exports['default'];

},{"../UIView":23,"classnames":24,"react":"react","react-dom":"react-dom"}],19:[function(require,module,exports){
/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x2, _x3, _x4) {
    var _again = true;_function: while (_again) {
        var object = _x2,
            property = _x3,
            receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIUtilsNoop = require('../UIUtils/noop');

var _UIUtilsNoop2 = _interopRequireDefault(_UIUtilsNoop);

var UITypeaheadInput = (function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        _classCallCheck(this, UITypeaheadInput);

        _get(Object.getPrototypeOf(UITypeaheadInput.prototype), 'constructor', this).apply(this, arguments);
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
            return _react2['default'].createElement('div', { ref: 'aria',
                id: this.state.id,
                className: this.props.offscreenClass,
                'aria-live': 'polite' }, this.getSelectedEntityContent());
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

                return _react2['default'].createElement('input', _extends({}, this.props.hintAttrs, {
                    ref: 'hint',
                    type: 'text',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-typeahead-hint': true
                    }, this.props.hintAttrs.className, !!this.props.hintAttrs.className)),
                    value: processed,
                    disabled: true,
                    tabIndex: '-1' }));
            }
        }
    }, {
        key: 'handleMatchClick',
        value: function handleMatchClick(index) {
            var _this = this;

            this.setState({ selectedEntityIndex: index }, function () {
                return _this.setValueWithSelectedEntity();
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

            return [_react2['default'].createElement('span', { key: '0' }, entityContent.slice(0, indexStart)), _react2['default'].createElement('mark', { key: '1', className: 'ui-typeahead-match-highlight' }, entityContent.slice(indexStart, indexEnd)), _react2['default'].createElement('span', { key: '2' }, entityContent.slice(indexEnd))];
        }
    }, {
        key: 'renderMatches',
        value: function renderMatches() {
            var _this2 = this;

            if (this.state.entityMatchIndices.length) {
                return _react2['default'].createElement('div', _extends({}, this.props.matchWrapperAttrs, {
                    ref: 'matches',
                    className: (0, _classnames2['default'])(_defineProperty({
                        'ui-typeahead-match-wrapper': true
                    }, this.props.matchWrapperAttrs.className, !!this.props.matchWrapperAttrs.className)) }), this.state.entityMatchIndices.map(function (index) {
                    var entity = _this2.props.entities[index];

                    return _react2['default'].createElement('div', _extends({}, entity, {
                        className: (0, _classnames2['default'])(_defineProperty({
                            'ui-typeahead-match': true,
                            'ui-typeahead-match-selected': _this2.state.selectedEntityIndex === index
                        }, entity.className, !!entity.className)),
                        key: _this2.createHashedKey(entity.content),
                        onClick: _this2.handleMatchClick.bind(_this2, index) }), _this2.markMatchSubstring(entity.content, _this2.state.userInput));
                }));
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
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx4;

            return _react2['default'].createElement('div', _extends({}, this.props.attrs, {
                ref: 'wrapper',
                className: (0, _classnames2['default'])((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _defineProperty(_cx4, this.props.className, !!this.props.className), _defineProperty(_cx4, this.props.attrs.className, !!this.props.attrs.className), _cx4)),
                id: this.props.id || this.props.attrs.id,
                onKeyDown: this.handleKeyDown.bind(this),
                style: _extends({}, this.props.style, this.props.attrs.style) }), this.renderNotification(), this.renderHint(), _react2['default'].createElement('input', _extends({}, this.props.inputAttrs, {
                ref: 'input',
                className: (0, _classnames2['default'])(_defineProperty({
                    'ui-typeahead': true
                }, this.props.inputAttrs.className, !!this.props.inputAttrs.className)),
                defaultValue: this.props.defaultValue || this.props.inputAttrs.defaultValue,
                name: this.props.name || this.props.inputAttrs.name,
                type: this.props.type || this.props.inputAttrs.type || 'text',
                'aria-controls': this.state.id,
                onInput: this.handleInput.bind(this) })), this.renderMatches());
        }
    }]);

    return UITypeaheadInput;
})(_UIView3['default']);

UITypeaheadInput.propTypes = {
    attrs: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    clearPartialInputOnSelection: _react2['default'].PropTypes.bool,
    defaultValue: _react2['default'].PropTypes.string,
    entities: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
        content: _react2['default'].PropTypes.string
    })),
    hint: _react2['default'].PropTypes.bool,
    hintAttrs: _react2['default'].PropTypes.object,
    id: _react2['default'].PropTypes.string,
    inputAttrs: _react2['default'].PropTypes.object,
    markFunc: _react2['default'].PropTypes.func,
    matchFunc: _react2['default'].PropTypes.func,
    matchWrapperAttrs: _react2['default'].PropTypes.object,
    name: _react2['default'].PropTypes.string,
    offscreenClass: _react2['default'].PropTypes.string,
    onComplete: _react2['default'].PropTypes.func,
    onInput: _react2['default'].PropTypes.func,
    onEntitySelected: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    type: _react2['default'].PropTypes.string
};

UITypeaheadInput.defaultProps = {
    attrs: {},
    clearPartialInputOnSelection: false,
    entities: [],
    hintAttrs: {},
    inputAttrs: {},
    matchWrapperAttrs: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _UIUtilsNoop2['default'],
    onEntitySelected: _UIUtilsNoop2['default']
};

exports['default'] = UITypeaheadInput;
module.exports = exports['default'];

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24,"react":"react"}],20:[function(require,module,exports){
/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = noop;

function noop() {}

module.exports = exports["default"];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = checkShallowEquality;
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

;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIKit/utils/transform
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();

module.exports = exports['default'];

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIUtilsShallowEqual = require('../UIUtils/shallowEqual');

var _UIUtilsShallowEqual2 = _interopRequireDefault(_UIUtilsShallowEqual);

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
    _classCallCheck(this, UIView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(UIView.prototype), 'constructor', this).apply(this, args);

    this.state = this.initialState ? this.initialState() : {};
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
      return !(0, _UIUtilsShallowEqual2['default'])(nextProps, this.props) || !(0, _UIUtilsShallowEqual2['default'])(nextState, this.state);
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
})(_react2['default'].Component);

exports['default'] = UIView;
module.exports = exports['default'];

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
		define('classnames', function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],"enigma-uikit":[function(require,module,exports){
(function (global){
/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

'use strict';

global.UIKit = {};

module.exports = {
    UIButton: global.UIKit.UIButton = require('./UIButton'),
    UICheckbox: global.UIKit.UICheckbox = require('./UICheckbox'),
    UICheckboxGroup: global.UIKit.UICheckboxGroup = require('./UICheckboxGroup'),
    UIDialog: global.UIKit.UIDialog = require('./UIDialog'),
    UIFittedText: global.UIKit.UIFittedText = require('./UIFittedText'),
    UIImage: global.UIKit.UIImage = require('./UIImage'),
    UIList: global.UIKit.UIList = require('./UIList'),
    UIModal: global.UIKit.UIModal = require('./UIModal'),
    UIPopover: global.UIKit.UIPopover = require('./UIPopover'),
    UIProgress: global.UIKit.UIProgress = require('./UIProgress'),
    UIProgressiveDisclosure: global.UIKit.UIProgressiveDisclosure = require('./UIProgressiveDisclosure'),
    UIRadio: global.UIKit.UIRadio = require('./UIRadio'),
    UISegmentedControl: global.UIKit.UISegmentedControl = require('./UISegmentedControl'),
    UITable: global.UIKit.UITable = require('./UITable'),
    UITokenizedInput: global.UIKit.UITokenizedInput = require('./UITokenizedInput'),
    UITooltip: global.UIKit.UITooltip = require('./UITooltip'),
    UITypeaheadInput: global.UIKit.UITypeaheadInput = require('./UITypeaheadInput'),
    UIView: global.UIKit.UIView = require('./UIView')
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./UIButton":1,"./UICheckbox":2,"./UICheckboxGroup":3,"./UIDialog":4,"./UIFittedText":5,"./UIImage":6,"./UIList":7,"./UIModal":8,"./UIPopover":9,"./UIProgress":10,"./UIProgressiveDisclosure":11,"./UIRadio":12,"./UISegmentedControl":13,"./UITable":15,"./UITokenizedInput":17,"./UITooltip":18,"./UITypeaheadInput":19,"./UIView":23}]},{},["enigma-uikit"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlCdXR0b24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlMaXN0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJTW9kYWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3BvdmVyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUHJvZ3Jlc3MvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlSYWRpby9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUYWJsZS9jZWxsLmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGFibGUvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUYWJsZS9yb3cuanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUeXBlYWhlYWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL25vb3AvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm0vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlWaWV3L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxVQUFVLE1BQU0sRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFBRSxnQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQUUsc0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUFFO0tBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQztDQUFFLENBQUM7O0FBRWpRLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENB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QU0sRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFBRSxnQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQUUsc0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUFFO0tBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQztDQUFFLENBQUM7O0FBRWpRLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0tBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxTQUFTLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxFQUFFO1lBQUUsUUFBUSxHQUFHLEdBQUc7WUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLEFBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxnQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLE1BQU07QUFBRSxrQkFBRSxHQUFHLE1BQU0sQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEFBQUMsU0FBUyxTQUFTLENBQUM7YUFBRTtTQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFFLE1BQU07QUFBRSxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQUU7S0FBRTtDQUFFLENBQUM7O0FBRWxwQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQUUsUUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQUUsY0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FBRSxNQUFNO0FBQUUsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUFFLEFBQUMsT0FBTyxHQUFHLENBQUM7Q0FBRTs7QUFFak4sU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFBRSxRQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsR0FBRyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0tBQUUsQUFBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUFFOztBQUU5ZSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBcEJGLE9BQU8sQ0FBQSxDQUFBOztBQXNCekIsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0F2QkYsV0FBVyxDQUFBLENBQUE7O0FBeUJoQyxJQUFJLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbkQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQTFCSCxXQUFXLENBQUEsQ0FBQTs7QUE0QjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBN0JWLFlBQVksQ0FBQSxDQUFBOztBQStCM0IsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBN0J2RCxTQUFTLEdBQUcsQ0FBQyxZQUFZLEVBQUU7QUFDdkIsV0FBTyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3JDOztBQWlDRCxJQS9CTSxZQUFZLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQWdDZCxhQUFTLENBaENQLFlBQVksRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFrQ2QsYUFsQ0UsWUFBWSxHQUFBO0FBbUNWLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsWUFBWSxDQUFBLENBQUE7O0FBcUNWLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDNUIsWUFBWSxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO0tBc0NiOztBQUVELGdCQUFZLENBeENWLFlBQVksRUFBQSxDQUFBO0FBeUNWLFdBQUcsRUFBRSxtQkFBbUI7QUFDeEIsYUFBSyxFQXpDUSxTQUFBLGlCQUFBLEdBQUc7QUFDaEIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFZixrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO0tBMENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUExQ1MsU0FBQSxrQkFBQSxHQUFHO0FBQ2pCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7S0EyQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxzQkFBc0I7QUFDM0IsYUFBSyxFQTNDVyxTQUFBLG9CQUFBLEdBQUc7QUFDbkIsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtLQTRDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFNBQVM7QUFDZCxhQUFLLEVBNUNGLFNBQUEsT0FBQSxHQUFHO0FBQ04sZ0JBQUksSUFBSSxHQUFHLFVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsZ0JBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDaEMsZ0JBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxnQkFBSSxlQUFlLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxnQkFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxnQkFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFM0QsZ0JBQU8sWUFBWSxDQUFDLFNBQVMsS0FBSyxZQUFZLElBQ3ZDLFlBQVksQ0FBQyxTQUFTLEtBQUssYUFBYSxFQUFFOztBQUM3QywrQkFBZSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRiw4QkFBYyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwRjs7QUFFRCxnQkFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFJLGVBQWUsQ0FBQyxDQUFDO0FBQ3JGLGdCQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUksY0FBYyxDQUFDLENBQUM7O0FBRWxGLGdCQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3RHO0tBNkNBLEVBQUU7QUFDQyxXQUFHLEVBQUUsUUFBUTtBQUNiLGFBQUssRUE3Q0gsU0FBQSxNQUFBLEdBQUc7QUE4Q0QsZ0JBQUksR0FBRyxDQUFDOztBQTdDWixtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQStDSSxNQUFNLEVBQ04sUUFBUSxDQUFDLEVBQUUsRUFoREwsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUE7QUFDcEIseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxHQUFBLEdBQUE7QUFDUCw2QkFBUyxFQUFFLElBQUk7aUJBaURoQixFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBaERuQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsR0FBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUM1RDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUEsQ0FBQSxFQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsQ0FDVDtTQUNMO0tBOENBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFdBakdFLFlBQVksQ0FBQTtDQWtHakIsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQTlDeEIsWUFBWSxDQUFDLFlBQVksR0FBRztBQUN4QixTQUFLLEVBQUUsRUFBRTtBQUNULGVBQVcsRUFBRSxNQUFNLENBQUMsU0FBUztDQUNoQyxDQUFDOztBQUVGLFlBQVksQ0FBQyxTQUFTLEdBQUc7QUFDckIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixZQUFRLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDaEMsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTSxDQUN6QixDQUFDO0FBQ0YsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxNQUFFLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzFCLGVBQVcsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDbkMsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUNoQyxDQUFDOztBQStDRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBN0NILFlBQVksQ0FBQTtBQThDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FDNUhwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFFLFFBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFFLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQUUsTUFBTTtBQUFFLFdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FBRSxBQUFDLE9BQU8sR0FBRyxDQUFDO0NBQUU7O0FBRWpOLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsUUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXBCRixPQUFPLENBQUEsQ0FBQTs7QUFzQnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBdkJILFdBQVcsQ0FBQSxDQUFBOztBQXlCOUIsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWhELElBQUksV0FBVyxHQUFHLE9BQU8sQ0ExQlYsWUFBWSxDQUFBLENBQUE7O0FBNEIzQixJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQTdCVCxpQkFBaUIsQ0FBQSxDQUFBOztBQStCbEMsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXpELElBL0JNLE9BQU8sR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBZ0NULGFBQVMsQ0FoQ1AsT0FBTyxFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQWtDVCxhQWxDRSxPQUFPLEdBQUE7QUFtQ0wsdUJBQWUsQ0FBQyxJQUFJLEVBbkN0QixPQUFPLENBQUEsQ0FBQTs7QUFxQ0wsWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBckM1QixPQUFPLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7S0FzQ1I7O0FBRUQsZ0JBQVksQ0F4Q1YsT0FBTyxFQUFBLENBQUE7QUF5Q0wsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQXpDRyxTQUFBLFlBQUEsR0FBRztBQUNYLG1CQUFPO0FBQ0gsc0JBQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDakMsQ0FBQztTQUNMO0tBMENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsMkJBQTJCO0FBQ2hDLGFBQUssRUExQ2dCLFNBQUEseUJBQUEsQ0FBQyxTQUFTLEVBQUU7QUFDakMsZ0JBQUksU0FBUyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUNsQyxvQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQzthQUNuRDtTQUNKO0tBMkNBLEVBQUU7QUFDQyxXQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLGFBQUssRUEzQ1EsU0FBQSxpQkFBQSxHQUFHO0FBQ2hCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7S0E0Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxvQkFBb0I7QUFDekIsYUFBSyxFQTVDUyxTQUFBLGtCQUFBLENBQUMsU0FBUyxFQUFFO0FBQzFCLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7S0E2Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxzQkFBc0I7QUFDM0IsYUFBSyxFQTdDVyxTQUFBLG9CQUFBLEdBQUc7QUFDbkIsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtLQThDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGdCQUFnQjtBQUNyQixhQUFLLEVBOUNLLFNBQUEsY0FBQSxHQUFHO0FBQ2IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUMxQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzNCLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtLQStDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFNBQVM7QUFDZCxhQUFLLEVBL0NGLFNBQUEsT0FBQSxHQUFHO0FBZ0RGLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBL0NyQixnQkFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQUUsdUJBQU87YUFBRTs7QUFFNUIsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFNUMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQUE7QUFvRGIsdUJBcERtQixLQUFBLENBQUssUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQTthQUFBLENBQUM7QUFDMUUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQUE7QUFzRGQsdUJBdERvQixLQUFBLENBQUssUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTthQUFBLENBQUM7O0FBRTFFLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNwQztLQXdEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGFBQWE7QUFDbEIsYUFBSyxFQXhERSxTQUFBLFdBQUEsR0FBRztBQUNWLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7QUFDckMsdUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQTtBQUN6Qix1QkFBRyxFQUFDLE9BQU87QUFDWCw2QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNQLGtDQUFVLEVBQUUsSUFBSTtxQkF3RHBCLEVBdkRLLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFBLENBQ3RFO0FBQ0YseUJBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7QUFDckIseUJBQUssRUFBQSxRQUFBLENBQUEsRUFBQSxFQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQTtBQUM5Qix1Q0FBZSxFQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBQSxHQUFHO3FCQXNEN0MsQ0FyREUsRUFBQSxDQUFBLENBQUcsQ0FDWjthQUNMOztBQUVELG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUE7QUFDekIsbUJBQUcsRUFBQyxPQUFPO0FBQ1gseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDUiw4QkFBVSxFQUFFLElBQUk7aUJBb0RuQixFQW5ESSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQSxDQUNyRTtBQUNGLG1CQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO0FBQ25CLG1CQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO0FBQ25CLHNCQUFNLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTztBQUNiLHVCQUFPLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTyxFQUFBLENBQUEsQ0FBRyxDQUN4QjtTQUNMO0tBa0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsY0FBYztBQUNuQixhQUFLLEVBbERHLFNBQUEsWUFBQSxHQUFHO0FBQ1gsbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQTtBQUMxQixtQkFBRyxFQUFDLFFBQVE7QUFDWix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNSLHFDQUFpQixFQUFFLElBQUk7QUFDdkIsc0NBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO0FBQ2hFLHFDQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtBQUM5RCxvQ0FBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7aUJBa0QvRCxFQWpESSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQSxDQUN2RTtBQUNGLG9CQUFJLEVBQUMsY0FBYyxFQUFBLENBQUEsQ0FBRyxDQUM3QjtTQUNMO0tBZ0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsUUFBUTtBQUNiLGFBQUssRUFoREgsU0FBQSxNQUFBLEdBQUc7QUFpREQsZ0JBQUksSUFBSSxDQUFDOztBQWhEYixtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQWtESSxLQUFLLEVBQ0wsUUFBUSxDQUFDLEVBQUUsRUFuRE4sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUE7QUFDcEIsbUJBQUcsRUFBQyxTQUFTO0FBQ2IseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLEdBQUE7QUFDUixzQ0FBa0IsRUFBRSxJQUFJO2lCQW9EdkIsRUFBRSxlQUFlLENBQUMsSUFBSSxFQW5EdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsZUFBQSxDQUFBLElBQUEsRUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxJQUFBLENBQUEsQ0FDM0Q7QUFDRixrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEMscUJBQUssRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBRSxFQUFBLENBQUEsRUFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQ2xCLENBQ1I7U0FDTDtLQWlEQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQTNKRSxPQUFPLENBQUE7Q0E0SlosQ0FBQSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQWpEeEIsT0FBTyxDQUFDLE1BQU0sR0FBRztBQUNiLFdBQU8sRUFBRSxTQUFTO0FBQ2xCLFVBQU0sRUFBRSxRQUFRO0FBQ2hCLFNBQUssRUFBRSxPQUFPO0NBQ2pCLENBQUM7O0FBRUYsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNoQixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLE9BQUcsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDM0IsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyw0QkFBd0IsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUMsY0FBVSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxPQUFHLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN0QyxlQUFXLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQ3RDLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixTQUFLLEVBQUUsRUFBRTtBQUNULGNBQVUsRUFBRSxFQUFFO0FBQ2QsZUFBVyxFQUFFLEVBQUU7Q0FDbEIsQ0FBQzs7QUFxREYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQW5ESCxPQUFPLENBQUE7QUFvRHRCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7OztBQzFMcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUFFLGdCQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFBRSxzQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQUU7S0FBRSxBQUFDLE9BQU8sTUFBTSxDQUFDO0NBQUUsQ0FBQzs7QUFFalEsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxnQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUFFO0tBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7S0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxRQUFRLEdBQUcsR0FBRztZQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsTUFBTSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQUFBQyxTQUFTLFNBQVMsQ0FBQzthQUFFO1NBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUUsTUFBTTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FBRTtLQUFFO0NBQUUsQ0FBQzs7QUFFbHBCLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFBRSxRQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBRSxjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUFFLE1BQU07QUFBRSxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQUUsQUFBQyxPQUFPLEdBQUcsQ0FBQztDQUFFOztBQUVqTixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FwQkYsT0FBTyxDQUFBLENBQUE7O0FBc0J6QixJQUFJLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQXZCSCxXQUFXLENBQUEsQ0FBQTs7QUF5QjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBMUJWLFlBQVksQ0FBQSxDQUFBOztBQTRCM0IsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELElBNUJNLE1BQU0sR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBNkJSLGFBQVMsQ0E3QlAsTUFBTSxFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQStCUixhQS9CRSxNQUFNLEdBQUE7QUFnQ0osdUJBQWUsQ0FBQyxJQUFJLEVBaEN0QixNQUFNLENBQUEsQ0FBQTs7QUFrQ0osWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBbEM1QixNQUFNLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7S0FtQ1A7O0FBRUQsZ0JBQVksQ0FyQ1YsTUFBTSxFQUFBLENBQUE7QUFzQ0osV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQXRDRyxTQUFBLFlBQUEsR0FBRztBQUNYLG1CQUFPO0FBQ0gsMEJBQVUsRUFBRSxJQUFJO2FBQ25CLENBQUM7U0FDTDtLQXVDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFVBQVU7QUFDZixhQUFLLEVBdkNELFNBQUEsUUFBQSxDQUFDLEtBQUssRUFBRTtBQUNaLGdCQUFJLENBQUMsSUFBSSxDQUFBLE9BQUEsR0FBUyxLQUFLLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QztLQXdDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGtCQUFrQjtBQUN2QixhQUFLLEVBeENPLFNBQUEsZ0JBQUEsQ0FBQyxXQUFXLEVBQUU7QUFDMUIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXJELG1CQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNwRDtLQXlDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHNCQUFzQjtBQUMzQixhQUFLLEVBekNXLFNBQUEsb0JBQUEsQ0FBQyxXQUFXLEVBQUU7QUFDOUIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXpELG1CQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDaEU7S0EwQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxlQUFlO0FBQ3BCLGFBQUssRUExQ0ksU0FBQSxhQUFBLENBQUMsS0FBSyxFQUFFO0FBQ2pCLGdCQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ3RCLGdCQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDbEMsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQy9CLGdCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7QUFFekMsZ0JBQUksT0FBTyxFQUFFO0FBQ1Qsb0JBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtBQUNuQix3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNyRCx5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQixNQUFNLElBQUksR0FBRyxLQUFLLFdBQVcsRUFBRTtBQUM1Qix3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNqRCx5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQjthQUNKLE1BQU07QUFDSCxvQkFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFaEQsb0JBQUksR0FBRyxLQUFLLFdBQVcsSUFDZixHQUFHLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksZUFBZSxLQUFLLENBQUMsRUFBRztBQUMvRCx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNyRCx5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQixNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksSUFDaEIsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksZUFBZSxLQUFLLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFHO0FBQ3RGLHdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2pELHlCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQzFCO2FBQ0o7U0FDSjtLQXlDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGVBQWU7QUFDcEIsYUFBSyxFQXpDSSxTQUFBLGFBQUEsR0FBRztBQTBDUixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQXpDckIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7O0FBRS9DLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUs7QUFDekMsdUJBQU8sT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDakMsNkJBQVMsRUFBRSxjQUFjO0FBQ3pCLHVCQUFHLEVBQUEsT0FBQSxHQUFVLEtBQUs7QUFDbEIsdUJBQUcsRUFBRSxLQUFBLENBQUssZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUs7QUFDdkMsNEJBQVEsRUFBRSxDQUFDO0FBQ1gsMEJBQU0sRUFBRSxTQUFBLE1BQUEsR0FBQTtBQTRDQSwrQkE1Q00sS0FBQSxDQUFLLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLEtBQUEsQ0FBSyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtxQkFBQTtBQUNqRiwyQkFBTyxFQUFFLFNBQUEsT0FBQSxHQUFBO0FBOENELCtCQTlDTyxLQUFBLENBQUssUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7cUJBQUE7QUFDaEQsNEJBQVEsRUFBRSxJQUFJO2lCQUNqQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTjtLQWdEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFFBQVE7QUFDYixhQUFLLEVBaERILFNBQUEsTUFBQSxHQUFHO0FBaURELGdCQUFJLEdBQUcsQ0FBQzs7QUFoRFosZ0JBQUksUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFckIsb0JBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQ3ZCLHFCQUFLLFFBQVE7QUFDVCw0QkFBUSxHQUFHLElBQUksQ0FBQztBQUNoQiwwQkFBTTs7QUFBQSxxQkFFTCxRQUFRO0FBQ1QsNEJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsMEJBQU07QUFBQSxhQUNUOztBQUVELG1CQUFPLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxhQUFhLENBQUMsUUFBUSxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFBO0FBQ25CLG1CQUFHLEVBQUUsTUFBTTtBQUNYLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBO0FBQ1AsNkJBQVMsRUFBRSxJQUFJO0FBQ2Ysc0NBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtBQUNoRCxzQ0FBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO0FBQ2hELG1DQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7aUJBa0Q1RSxFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBakRyQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsR0FBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUM1RDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4Qyx5QkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3ZELHdCQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTthQWdEN0IsQ0FBQyxDQS9DSixDQUFDO1NBQ047S0FnREEsQ0FBQyxDQUFDLENBQUM7O0FBRUosV0FuSkUsTUFBTSxDQUFBO0NBb0pYLENBQUEsQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUFoRHhCLE1BQU0sQ0FBQyxTQUFTLEdBQUc7QUFDZixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDcEQsUUFBSSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07Q0FDaEMsQ0FBQzs7QUFFRixNQUFNLENBQUMsWUFBWSxHQUFHO0FBQ2xCLFNBQUssRUFBRSxFQUFFO0FBQ1QsU0FBSyxFQUFFLEVBQUU7Q0FDWixDQUFDOztBQW9ERixPQUFPLENBQUMsU0FBUyxDQUFDLEdBbERILE1BQU0sQ0FBQTtBQW1EckIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FDektwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFFLFFBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFFLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQUUsTUFBTTtBQUFFLFdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FBRSxBQUFDLE9BQU8sR0FBRyxDQUFDO0NBQUU7O0FBRWpOLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsUUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXBCRixPQUFPLENBQUEsQ0FBQTs7QUFzQnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBdkJGLGFBQWEsQ0FBQSxDQUFBOztBQXlCbEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksUUFBUSxHQUFHLE9BQU8sQ0ExQkgsV0FBVyxDQUFBLENBQUE7O0FBNEI5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQTdCVixZQUFZLENBQUEsQ0FBQTs7QUErQjNCLElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxJQS9CTSxPQUFPLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQWdDVCxhQUFTLENBaENQLE9BQU8sRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFrQ1QsYUFsQ0UsT0FBTyxHQUFBO0FBbUNMLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsT0FBTyxDQUFBLENBQUE7O0FBcUNMLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDNUIsT0FBTyxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO0tBc0NSOztBQUVELGdCQUFZLENBeENWLE9BQU8sRUFBQSxDQUFBO0FBeUNMLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQXpDSCxTQUFBLE1BQUEsR0FBRztBQTBDRCxnQkFBSSxHQUFHLENBQUM7O0FBekNaLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBMkNJLEtBQUssRUFDTCxRQUFRLENBQUMsRUFBRSxFQTVDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUNwQixtQkFBRyxFQUFDLFNBQVM7QUFDYix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQTtBQUNSLHNDQUFrQixFQUFFLElBQUk7aUJBNkN2QixFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBNUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsR0FBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUMzRDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUEsQ0FBQSxFQUN6RCxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFBO0FBQ3hCLG1CQUFHLEVBQUMsTUFBTTtBQUNWLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBO0FBQ1IsbUNBQWUsRUFBRSxJQUFJO2lCQTJDeEIsRUExQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUEsQ0FDbkUsRUFBQSxDQUFBLENBQUksRUFDWCxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFVBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFjLElBQUksQ0FBQyxLQUFLLEVBQUE7QUFDZCxxQkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUM1QixtQkFBRyxFQUFDLFFBQVE7QUFDWixrQkFBRSxFQUFFLFNBQVM7QUFDYixxQkFBSyxFQUFFLFNBQVM7QUFDaEIseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDVCw4QkFBVSxFQUFFLElBQUk7aUJBMEN2QixFQXpDUSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQSxDQUNwRSxFQUFBLENBQUEsQ0FBSSxDQUNkLENBQ1I7U0FDTDtLQXdDQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQXZFRSxPQUFPLENBQUE7Q0F3RVosQ0FBQSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQXhDeEIsT0FBTyxDQUFDLFNBQVMsR0FBQSxRQUFBLENBQUEsRUFBQSxFQUNWLFVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBUyxTQUFTLEVBQUE7QUFDckIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixhQUFTLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLE1BQUUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDMUIsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07Q0EwQ2hDLENBekNBLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQixTQUFLLEVBQUUsRUFBRTtBQUNULGFBQVMsRUFBRSxFQUFFO0FBQ2IsY0FBVSxFQUFFLEVBQUU7Q0FDakIsQ0FBQzs7QUEyQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQXpDSCxPQUFPLENBQUE7QUEwQ3RCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7OztBQy9GcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUFFLGdCQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFBRSxzQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQUU7S0FBRSxBQUFDLE9BQU8sTUFBTSxDQUFDO0NBQUUsQ0FBQzs7QUFFalEsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxnQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUFFO0tBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7S0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxRQUFRLEdBQUcsR0FBRztZQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsTUFBTSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQUFBQyxTQUFTLFNBQVMsQ0FBQzthQUFFO1NBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUUsTUFBTTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FBRTtLQUFFO0NBQUUsQ0FBQzs7QUFFbHBCLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFBRSxRQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBRSxjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUFFLE1BQU07QUFBRSxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQUUsQUFBQyxPQUFPLEdBQUcsQ0FBQztDQUFFOztBQUVqTixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FwQkYsT0FBTyxDQUFBLENBQUE7O0FBc0J6QixJQUFJLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0MsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQXZCRixXQUFXLENBQUEsQ0FBQTs7QUF5QmhDLElBQUksVUFBVSxHQUFHLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVuRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBMUJGLGFBQWEsQ0FBQSxDQUFBOztBQTRCbEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksUUFBUSxHQUFHLE9BQU8sQ0E3QkgsV0FBVyxDQUFBLENBQUE7O0FBK0I5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBaENMLHNCQUFzQixDQUFBLENBQUE7O0FBa0NoRCxJQUFJLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRW5FLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FuQ1YsWUFBWSxDQUFBLENBQUE7O0FBcUMzQixJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsSUFyQ00sU0FBUyxHQUFBLENBQUEsVUFBQSxPQUFBLEVBQUE7QUFzQ1gsYUFBUyxDQXRDUCxTQUFTLEVBQUEsT0FBQSxDQUFBLENBQUE7O0FBd0NYLGFBeENFLFNBQVMsR0FBQTtBQXlDUCx1QkFBZSxDQUFDLElBQUksRUF6Q3RCLFNBQVMsQ0FBQSxDQUFBOztBQTJDUCxZQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0EzQzVCLFNBQVMsQ0FBQSxTQUFBLENBQUEsRUFBQSxhQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQTtLQTRDVjs7QUFFRCxnQkFBWSxDQTlDVixTQUFTLEVBQUEsQ0FBQTtBQStDUCxXQUFHLEVBQUUsY0FBYztBQUNuQixhQUFLLEVBL0NHLFNBQUEsWUFBQSxHQUFHO0FBQ1gsbUJBQU87QUFDSCw0QkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNyQyw0QkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNyQywwQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUNqQywwQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTthQUNwQyxDQUFDO1NBQ0w7S0FnREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxvQkFBb0I7QUFDekIsYUFBSyxFQWhEUyxTQUFBLGtCQUFBLEdBQUc7QUFDakIsb0JBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFDOzs7QUFHNUUsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2YsZ0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN2QyxnQkFBSSxDQUFDLElBQUksR0FBRyxVQUFBLENBQUEsU0FBQSxDQUFBLENBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRW5ELGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRWIsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RDtLQWlEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG9CQUFvQjtBQUN6QixhQUFLLEVBakRTLFNBQUEsa0JBQUEsR0FBRztBQUNqQixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7S0FrREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxzQkFBc0I7QUFDM0IsYUFBSyxFQWxEVyxTQUFBLG9CQUFBLEdBQUc7QUFDbkIsc0JBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBUyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEQsb0JBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFMUMsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxRDtLQW1EQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGtCQUFrQjtBQUN2QixhQUFLLEVBbkRPLFNBQUEsZ0JBQUEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzdCLGdCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3pCLGdCQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDOztBQUVwQyxnQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUUzRSxvQkFBUSxLQUFLLENBQUMsWUFBWTtBQUMxQixxQkFBSyxRQUFRLENBQUMsTUFBTTtBQUNoQix5QkFBSyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLDBCQUFNOztBQUFBLHFCQUVMLFFBQVEsQ0FBQyxHQUFHO0FBQ2IseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzVCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxvQkFBUSxLQUFLLENBQUMsVUFBVTtBQUN4QixxQkFBSyxRQUFRLENBQUMsTUFBTTtBQUNoQix5QkFBSyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLDBCQUFNOztBQUFBLHFCQUVMLFFBQVEsQ0FBQyxHQUFHO0FBQ2IseUJBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzVCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7S0FvREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxrQkFBa0I7QUFDdkIsYUFBSyxFQXBETyxTQUFBLGdCQUFBLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM3QixnQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN6QixnQkFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7QUFFcEMsZ0JBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzRSxnQkFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUN2QyxnQkFBSSxLQUFLLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQzs7QUFFbkMsb0JBQVEsS0FBSyxDQUFDLFlBQVk7QUFDMUIscUJBQUssUUFBUSxDQUFDLEtBQUs7QUFDZix5QkFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQiwwQkFBTTs7QUFBQSxxQkFFTCxRQUFRLENBQUMsTUFBTTtBQUNoQix5QkFBSyxHQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxvQkFBUSxLQUFLLENBQUMsVUFBVTtBQUN4QixxQkFBSyxRQUFRLENBQUMsTUFBTTtBQUNoQix5QkFBSyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLDBCQUFNOztBQUFBLHFCQUVMLFFBQVEsQ0FBQyxHQUFHO0FBQ2IseUJBQUssSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQzdCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7S0FxREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxxQ0FBcUM7QUFDMUMsYUFBSyxFQXJEMEIsU0FBQSxtQ0FBQSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzVDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDNUIsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCOztBQUVELGdCQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXJCLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzdCLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQy9CLGdCQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUNyQyxnQkFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRXRDLGdCQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFOztBQUNsQiwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNsRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUNuRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs7QUFDZCwyQkFBVyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNwRCwyQkFBVyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNyRCxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEVBQUU7O0FBQzFCLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3BELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ25ELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztBQUNkLDJCQUFXLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2xELDJCQUFXLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQ3JEOztBQUVELG1CQUFPLFdBQVcsQ0FBQztTQUN0QjtLQTBEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGtCQUFrQjtBQUN2QixhQUFLLEVBMURPLFNBQUEsZ0JBQUEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QixnQkFBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxFQUFtQjtBQUNmLG9CQUFJLENBQUMsS0FBSyxDQUFBLGtCQUFBLENBQUEsU0FBQSxDQUFBLENBQWUsR0FBQSxZQUFBLEdBQWdCLENBQUMsR0FBQSxNQUFBLEdBQU8sQ0FBQyxHQUFBLEtBQUssQ0FBQzthQUMzRCxNQUFNO0FBQ0gsb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0Isb0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0I7U0FDSjtLQTJEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLE9BQU87QUFDWixhQUFLLEVBM0RKLFNBQUEsS0FBQSxHQUFHO0FBQ0osZ0JBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxZQUFZLFdBQVcsR0FDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQ2pCLFVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBUyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekQsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELGdCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFakQsZ0JBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVwRixnQkFBSSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ2hFLG9CQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDdEMsTUFBTTtBQUNILG9CQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUM7U0FDSjtLQTBEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDJCQUEyQjtBQUNoQyxhQUFLLEVBMURnQixTQUFBLHlCQUFBLENBQUMsUUFBUSxFQUFFO0FBQ2hDLGdCQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDOztBQUVsQyxvQkFBUSxRQUFRO0FBQ2hCLHFCQUFLLFFBQVEsQ0FBQyxLQUFLO0FBQ2YsMkJBQU8sT0FBTyxDQUFDOztBQUFBLHFCQUVkLFFBQVEsQ0FBQyxNQUFNO0FBQ2hCLDJCQUFPLFFBQVEsQ0FBQzs7QUFBQSxxQkFFZixRQUFRLENBQUMsR0FBRztBQUNiLDJCQUFPLEtBQUssQ0FBQztBQUFBLGFBQ2hCO1NBQ0o7S0EyREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUEzREcsU0FBQSxZQUFBLEdBQUc7QUE0RFAsZ0JBQUksR0FBRyxDQUFDOztBQTNEWixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDOztBQUU3QyxtQkFBTyxVQUFBLENBQUEsU0FBQSxDQUFBLENBQVMsTUFBTSxDQUNsQixPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFVBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFjLElBQUksQ0FBQyxLQUFLLEVBQUE7QUFDZCw0QkFBWSxFQUFFLEtBQUs7QUFDbkIseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxHQUFBLEdBQUE7QUFDVCxnQ0FBWSxFQUFFLElBQUk7aUJBNkR6QixFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLEdBNURkLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUssSUFBSSxDQUFBLEVBQUEsZUFBQSxDQUFBLEdBQUEsRUFBQSxzQkFBQSxHQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFLLElBQUksQ0FBQSxFQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQUEsb0JBQUEsR0FDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBSyxJQUFJLENBQUEsRUFBQSxlQUFBLENBQUEsR0FBQSxFQUFBLG9CQUFBLEdBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUssSUFBSSxDQUFBLEVBQUEsZUFBQSxDQUFBLEdBQUEsRUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsZUFBQSxDQUFBLEdBQUEsRUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxHQUFBLENBQUEsQ0FDMUQ7QUFDRixxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUN6Qiw0QkFBUSxFQUFFLFVBQVU7QUFDcEIsdUJBQUcsRUFBRSxLQUFLO0FBQ1Ysd0JBQUksRUFBRSxLQUFLO2lCQXFEcEIsQ0FwRE8sRUFBQSxDQUFBLENBQUcsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JCO0tBb0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsUUFBUTtBQUNiLGFBQUssRUFwREgsU0FBQSxNQUFBLEdBQUc7QUFDTCxtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLENBQU8sQ0FDVDtTQUNMO0tBbURBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFdBelBFLFNBQVMsQ0FBQTtDQTBQZCxDQUFBLENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0FBbkR4QixTQUFTLENBQUMsUUFBUSxHQUFHO0FBQ2pCLFNBQUssRUFBRSxPQUFPO0FBQ2QsVUFBTSxFQUFFLFFBQVE7QUFDaEIsT0FBRyxFQUFFLEtBQUs7Q0FDYixDQUFDOztBQUVGLFNBQVMsQ0FBQyxTQUFTLEdBQUEsUUFBQSxDQUFBLEVBQUEsRUFDWixVQUFBLENBQUEsU0FBQSxDQUFBLENBQVMsU0FBUyxFQUFBO0FBQ3JCLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsVUFBTSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQzlCLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUN2QyxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixhQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07S0FDaEMsQ0FBQyxDQUNMLENBQUM7QUFBQyxjQUFVO0FBQ2IsZ0JBQVksRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0YsZ0JBQVksRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0Ysa0JBQWMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxNQUFFLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzFCLGNBQVUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUM5QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QixDQUFDO0FBQ0YsY0FBVSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUN4QixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFDekIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3pCLENBQUM7QUFDRixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0NBbUNoQyxDQWxDQSxDQUFDOztBQUVGLFNBQVMsQ0FBQyxZQUFZLEdBQUc7QUFDckIsU0FBSyxFQUFFLEVBQUU7QUFDVCxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUN0QyxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRztBQUNwQyxrQkFBYyxFQUFFLElBQUk7QUFDcEIsY0FBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUNwQyxjQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0NBQ3ZDLENBQUM7O0FBb0NGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FsQ0gsU0FBUyxDQUFBO0FBbUN4QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7QUNwU3BDLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxVQUFVLE1BQU0sRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFBRSxnQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQUUsc0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUFFO0tBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQztDQUFFLENBQUM7O0FBRWpRLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0tBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxTQUFTLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxFQUFFO1lBQUUsUUFBUSxHQUFHLEdBQUc7WUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLEFBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxnQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLE1BQU07QUFBRSxrQkFBRSxHQUFHLE1BQU0sQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEFBQUMsU0FBUyxTQUFTLENBQUM7YUFBRTtTQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFFLE1BQU07QUFBRSxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQUU7S0FBRTtDQUFFLENBQUM7O0FBRWxwQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQUUsUUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQUUsY0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FBRSxNQUFNO0FBQUUsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUFFLEFBQUMsT0FBTyxHQUFHLENBQUM7Q0FBRTs7QUFFak4sU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFBRSxRQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsR0FBRyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0tBQUUsQUFBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUFFOztBQUU5ZSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBcEJGLE9BQU8sQ0FBQSxDQUFBOztBQXNCekIsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0F2QkYsYUFBYSxDQUFBLENBQUE7O0FBeUJsQyxJQUFJLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbkQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQTFCSCxXQUFXLENBQUEsQ0FBQTs7QUE0QjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBN0JWLFlBQVksQ0FBQSxDQUFBOztBQStCM0IsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELElBL0JNLFVBQVUsR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBZ0NaLGFBQVMsQ0FoQ1AsVUFBVSxFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQWtDWixhQWxDRSxVQUFVLEdBQUE7QUFtQ1IsdUJBQWUsQ0FBQyxJQUFJLEVBbkN0QixVQUFVLENBQUEsQ0FBQTs7QUFxQ1IsWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBckM1QixVQUFVLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7S0FzQ1g7O0FBRUQsZ0JBQVksQ0F4Q1YsVUFBVSxFQUFBLENBQUE7QUF5Q1IsV0FBRyxFQUFFLGFBQWE7QUFDbEIsYUFBSyxFQXpDRSxTQUFBLFdBQUEsR0FBRztBQUNWLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2xCLHVCQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBeUNJLEtBQUssRUFDTCxRQUFRLENBQUMsRUFBRSxFQTFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQTtBQUN6Qix1QkFBRyxFQUFDLE9BQU87QUFDWCw2QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNSLDJDQUFtQixFQUFFLElBQUk7cUJBMkN4QixFQTFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQSxDQUNyRSxFQUFBLENBQUEsRUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDZixDQUNSO2FBQ0w7U0FDSjtLQXlDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQXpDRyxTQUFBLFlBQUEsR0FBRztBQUNYLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3JCLHVCQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsVUFBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLEVBQVUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUM3Qix1QkFBRyxFQUFDLFFBQVE7QUFDWiw2QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNQLDRDQUFvQixFQUFFLElBQUk7cUJBeUNuQyxFQXhDVSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQSxDQUN4RTtBQUNGLDJCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUEsQ0FBSSxDQUM1QzthQUNMO1NBQ0o7S0F1Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxnQkFBZ0I7QUFDckIsYUFBSyxFQXZDSyxTQUFBLGNBQUEsR0FBRztBQUNiLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUE7QUFDNUIsbUJBQUcsRUFBQyxVQUFVO0FBQ2QseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDUixpQ0FBYSxFQUFFLElBQUk7QUFDbkIsK0NBQTJCLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxXQUFXO2lCQXVDMUUsRUF0Q0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUEsQ0FDM0U7QUFDRixvQkFBSSxFQUFDLGNBQWM7QUFDbkIscUJBQUssRUFBQSxRQUFBLENBQUEsRUFBQSxFQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBQSxlQUFBLENBQUEsRUFBQSxFQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQSxDQUNqRCxFQUFBLENBQUEsQ0FBRyxDQUNaO1NBQ0w7S0FrQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQWxDSCxTQUFBLE1BQUEsR0FBRztBQW1DRCxnQkFBSSxJQUFJLENBQUM7O0FBbENiLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBb0NJLEtBQUssRUFDTCxRQUFRLENBQUMsRUFBRSxFQXJDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUNwQixtQkFBRyxFQUFDLFNBQVM7QUFDYix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQTtBQUNSLHlDQUFxQixFQUFFLElBQUk7aUJBc0MxQixFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBckN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsSUFBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLElBQUEsQ0FBQSxDQUMzRDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUEsQ0FBQSxFQUN4RCxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUNsQixDQUNSO1NBQ0w7S0FtQ0EsQ0FBQyxDQUFDLENBQUM7O0FBRUosV0FwR0UsVUFBVSxDQUFBO0NBcUdmLENBQUEsQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUFuQ3hCLFVBQVUsQ0FBQyxZQUFZLEdBQUc7QUFDdEIsU0FBSyxFQUFFLEVBQUU7QUFDVCxlQUFXLEVBQUUsRUFBRTtBQUNmLGNBQVUsRUFBRSxFQUFFO0FBQ2QsaUJBQWEsRUFBRSxFQUFFO0FBQ2pCLGlCQUFhLEVBQUUsT0FBTztDQUN6QixDQUFDOztBQUVGLFVBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixlQUFXLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzNCLGNBQVUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsWUFBUSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixZQUFRLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDbEMsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTSxDQUN2QixDQUFDO0FBQ0YsaUJBQWEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDckMsaUJBQWEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDckMsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUNoQyxDQUFDOztBQW9DRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBbENILFVBQVUsQ0FBQTtBQW1DekIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FDbklwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFFLFFBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFFLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQUUsTUFBTTtBQUFFLFdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FBRSxBQUFDLE9BQU8sR0FBRyxDQUFDO0NBQUU7O0FBRWpOLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsUUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXBCRixPQUFPLENBQUEsQ0FBQTs7QUFzQnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBdkJILFdBQVcsQ0FBQSxDQUFBOztBQXlCOUIsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWhELElBQUksV0FBVyxHQUFHLE9BQU8sQ0ExQlYsWUFBWSxDQUFBLENBQUE7O0FBNEIzQixJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQTdCVCxpQkFBaUIsQ0FBQSxDQUFBOztBQStCbEMsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXpELElBL0JxQix1QkFBdUIsR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBZ0N4QyxhQUFTLENBaENRLHVCQUF1QixFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQWtDeEMsYUFsQ2lCLHVCQUF1QixHQUFBO0FBbUNwQyx1QkFBZSxDQUFDLElBQUksRUFuQ1AsdUJBQXVCLENBQUEsQ0FBQTs7QUFxQ3BDLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDYix1QkFBdUIsQ0FBQSxTQUFBLENBQUEsRUFBQSxhQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQTtLQXNDdkM7O0FBRUQsZ0JBQVksQ0F4Q0ssdUJBQXVCLEVBQUEsQ0FBQTtBQXlDcEMsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQXpDRyxTQUFBLFlBQUEsR0FBRztBQUNYLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7YUFDaEMsQ0FBQztTQUNMO0tBMENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsa0JBQWtCO0FBQ3ZCLGFBQUssRUExQ08sU0FBQSxnQkFBQSxHQUFHO0FBQ2YsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDN0Q7S0EyQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSwyQkFBMkI7QUFDaEMsYUFBSyxFQTNDZ0IsU0FBQSx5QkFBQSxDQUFDLFFBQVEsRUFBRTtBQTRDNUIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUEzQ3JCLGdCQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDM0Msb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBQyxFQUFFLFlBQUE7QUE4Q3JDLDJCQTlDMkMsS0FBQSxDQUFLLGdCQUFnQixFQUFFLENBQUE7aUJBQUEsQ0FBQyxDQUFDO2FBQy9FO1NBQ0o7S0FnREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxhQUFhO0FBQ2xCLGFBQUssRUFoREUsU0FBQSxXQUFBLEdBQUc7QUFpRE4sZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFoRHRCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsRUFBRSxZQUFBO0FBbUR4Qyx1QkFuRDhDLE1BQUEsQ0FBSyxnQkFBZ0IsRUFBRSxDQUFBO2FBQUEsQ0FBQyxDQUFDO1NBQ2xGO0tBcURBLEVBQUU7QUFDQyxXQUFHLEVBQUUsZUFBZTtBQUNwQixhQUFLLEVBckRJLFNBQUEsYUFBQSxDQUFDLEtBQUssRUFBRTtBQXNEYixnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQXJEdEIsb0JBQVEsS0FBSyxDQUFDLEdBQUc7QUFDakIscUJBQUssT0FBTztBQUNSLHlCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsd0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxFQUFFLFlBQUE7QUF3RHBDLCtCQXhEMEMsTUFBQSxDQUFLLGdCQUFnQixFQUFFLENBQUE7cUJBQUEsQ0FBQyxDQUFDO0FBQUEsYUFDbEY7U0FDSjtLQTBEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFFBQVE7QUFDYixhQUFLLEVBMURILFNBQUEsTUFBQSxHQUFHO0FBMkRELGdCQUFJLEdBQUcsQ0FBQzs7QUExRFosbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0E0REksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBN0ROLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFBO0FBQ3BCLG1CQUFHLEVBQUMsU0FBUztBQUNiLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBO0FBQ1IsbUNBQWUsRUFBRSxJQUFJO0FBQ3JCLDRDQUF3QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtpQkE4RDVDLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUE3RHJCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsR0FBQSxDQUFBLENBQzNEO0FBQ0Ysa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLHFCQUFLLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUMxQixFQUFBLENBQUEsRUFDSCxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQXlESSxLQUFLLEVBQ0wsUUFBUSxDQUFDLEVBQUUsRUExRE4sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUE7QUFDMUIsbUJBQUcsRUFBQyxRQUFRO0FBQ1oseUJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDUiwwQ0FBc0IsRUFBRSxJQUFJO2lCQTJEM0IsRUExREEsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUEsQ0FDdkU7QUFDRix1QkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNwQyx5QkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4Qyx3QkFBUSxFQUFDLEdBQUcsRUFBQSxDQUFBLEVBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2hCLEVBQ04sT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0EwREksS0FBSyxFQUNMLEVBM0RDLEdBQUcsRUFBQyxTQUFTO0FBQ2IseUJBQVMsRUFBQyx1QkFBdUIsRUFBQSxFQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDbEIsQ0FDSixDQUNSO1NBQ0w7S0EyREEsQ0FBQyxDQUFDLENBQUM7O0FBRUosV0ExSGlCLHVCQUF1QixDQUFBO0NBMkgzQyxDQUFBLENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0FBRXhCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0E3SEcsdUJBQXVCLENBQUE7O0FBZ0U1Qyx1QkFBdUIsQ0FBQyxTQUFTLEdBQUc7QUFDaEMsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixZQUFRLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixZQUFRLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsVUFBTSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLFVBQU0sRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsZUFBVyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUN0QyxDQUFDOztBQUVGLHVCQUF1QixDQUFDLFlBQVksR0FBRztBQUNuQyxTQUFLLEVBQUUsRUFBRTtBQUNULFlBQVEsRUFBRSxLQUFLO0FBQ2YsWUFBUSxFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07QUFDZCxVQUFNLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTTtBQUNaLGVBQVcsRUFBRSxFQUFFO0NBQ2xCLENBQUM7O0FBaUVGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0EvREgsdUJBQXVCLENBQUE7QUFnRXRDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7OztBQzFKcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUFFLGdCQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFBRSxzQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQUU7S0FBRSxBQUFDLE9BQU8sTUFBTSxDQUFDO0NBQUUsQ0FBQzs7QUFFalEsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxnQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUFFO0tBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7S0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxRQUFRLEdBQUcsR0FBRztZQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsTUFBTSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQUFBQyxTQUFTLFNBQVMsQ0FBQzthQUFFO1NBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUUsTUFBTTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FBRTtLQUFFO0NBQUUsQ0FBQzs7QUFFbHBCLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFBRSxRQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBRSxjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUFFLE1BQU07QUFBRSxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQUUsQUFBQyxPQUFPLEdBQUcsQ0FBQztDQUFFOztBQUVqTixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FwQkYsT0FBTyxDQUFBLENBQUE7O0FBc0J6QixJQUFJLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQXZCSCxXQUFXLENBQUEsQ0FBQTs7QUF5QjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBMUJWLFlBQVksQ0FBQSxDQUFBOztBQTRCM0IsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLE9BQU8sQ0E3QlQsaUJBQWlCLENBQUEsQ0FBQTs7QUErQmxDLElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUV6RCxJQS9CTSxPQUFPLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQWdDVCxhQUFTLENBaENQLE9BQU8sRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFrQ1QsYUFsQ0UsT0FBTyxHQUFBO0FBbUNMLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsT0FBTyxDQUFBLENBQUE7O0FBcUNMLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDNUIsT0FBTyxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO0tBc0NSOztBQUVELGdCQUFZLENBeENWLE9BQU8sRUFBQSxDQUFBO0FBeUNMLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUF6Q0csU0FBQSxZQUFBLEdBQUc7QUFDWCxtQkFBTztBQUNILGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDOUMsQ0FBQztTQUNMO0tBMENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsY0FBYztBQUNuQixhQUFLLEVBMUNHLFNBQUEsWUFBQSxDQUFDLEtBQUssRUFBRTtBQUNoQixnQkFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUN0QixvQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QztTQUNKO0tBMkNBLEVBQUU7QUFDQyxXQUFHLEVBQUUsYUFBYTtBQUNsQixhQUFLLEVBM0NFLFNBQUEsV0FBQSxHQUFHO0FBQ1YsbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQTtBQUN6QixtQkFBRyxFQUFDLE9BQU87QUFDWCxvQkFBSSxFQUFDLE9BQU87QUFDWixrQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNqQix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNQLDhCQUFVLEVBQUUsSUFBSTtBQUNoQix1Q0FBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7aUJBMkM5QyxFQTFDTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQSxDQUN0RTtBQUNGLG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQ3JCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ3ZCLHVCQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzVCLDhCQUFBLEVBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQ3pDLHdCQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQSxDQUFJLENBQ25EO1NBQ0w7S0F5Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxhQUFhO0FBQ2xCLGFBQUssRUF6Q0UsU0FBQSxXQUFBLEdBQUc7QUFDVixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQix1QkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQXlDSSxPQUFPLEVBQ1AsUUFBUSxDQUFDLEVBQUUsRUExQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUE7QUFDekIsdUJBQUcsRUFBQyxPQUFPO0FBQ1gsNkJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDUCx3Q0FBZ0IsRUFBRSxJQUFJO3FCQTJDeEIsRUExQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUEsQ0FDdEU7QUFDRiwyQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFBLENBQUEsRUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ2IsQ0FDVjthQUNMO1NBQ0o7S0F5Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQXpDSCxTQUFBLE1BQUEsR0FBRztBQTBDRCxnQkFBSSxJQUFJLENBQUM7O0FBekNiLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBMkNJLEtBQUssRUFDTCxRQUFRLENBQUMsRUFBRSxFQTVDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUNwQixtQkFBRyxFQUFDLFNBQVM7QUFDYix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQTtBQUNQLHNDQUFrQixFQUFFLElBQUk7aUJBNkN4QixFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBNUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsSUFBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLElBQUEsQ0FBQSxDQUM1RDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDM0IsRUFBQSxDQUFBLEVBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQ2pCLENBQ1I7U0FDTDtLQXVDQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQTNHRSxPQUFPLENBQUE7Q0E0R1osQ0FBQSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQXZDeEIsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNoQixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsY0FBVSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxRQUFJLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN2QyxjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFlBQVEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtDQUMzQyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDbkIsU0FBSyxFQUFFLEVBQUU7QUFDVCxjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07QUFDaEIsWUFBUSxFQUFFLEtBQUs7Q0FDbEIsQ0FBQzs7QUEyQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQXpDSCxPQUFPLENBQUE7QUEwQ3RCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7OztBQzFJcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQUUsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUFFLGdCQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFBRSxzQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQUU7S0FBRSxBQUFDLE9BQU8sTUFBTSxDQUFDO0NBQUUsQ0FBQzs7QUFFalEsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxnQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUFFO0tBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7S0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxRQUFRLEdBQUcsR0FBRztZQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsTUFBTSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQUFBQyxTQUFTLFNBQVMsQ0FBQzthQUFFO1NBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUUsTUFBTTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FBRTtLQUFFO0NBQUUsQ0FBQzs7QUFFbHBCLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFBRSxRQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBRSxjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUFFLE1BQU07QUFBRSxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQUUsQUFBQyxPQUFPLEdBQUcsQ0FBQztDQUFFOztBQUVqTixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FwQkgsV0FBVyxDQUFBLENBQUE7O0FBc0I5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXZCRixPQUFPLENBQUEsQ0FBQTs7QUF5QnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBMUJWLFlBQVksQ0FBQSxDQUFBOztBQTRCM0IsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLE9BQU8sQ0E3QlQsaUJBQWlCLENBQUEsQ0FBQTs7QUErQmxDLElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUV6RCxJQS9CTSxrQkFBa0IsR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBZ0NwQixhQUFTLENBaENQLGtCQUFrQixFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQWtDcEIsYUFsQ0Usa0JBQWtCLEdBQUE7QUFtQ2hCLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsa0JBQWtCLENBQUEsQ0FBQTs7QUFxQ2hCLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDNUIsa0JBQWtCLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7S0FzQ25COztBQUVELGdCQUFZLENBeENWLGtCQUFrQixFQUFBLENBQUE7QUF5Q2hCLFdBQUcsRUFBRSxhQUFhO0FBQ2xCLGFBQUssRUF6Q0UsU0FBQSxXQUFBLENBQUMsTUFBTSxFQUFFO0FBQ2hCLGdCQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztLQTBDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQTFDRyxTQUFBLFlBQUEsR0FBRztBQUNYLGdCQUFJLEtBQUssR0FBQSxTQUFBLENBQUM7O0FBRVYsZ0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixvQkFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ2pCLHlCQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzs7QUFFckIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0osQ0FBQyxDQUFDOztBQUVILG1CQUFPLEtBQUssQ0FBQztTQUNoQjtLQTJDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFVBQVU7QUFDZixhQUFLLEVBM0NELFNBQUEsUUFBQSxDQUFDLEtBQUssRUFBRTtBQUNaLGdCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QztLQTRDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG9CQUFvQjtBQUN6QixhQUFLLEVBNUNTLFNBQUEsa0JBQUEsQ0FBQyxrQkFBa0IsRUFBRTtBQUNuQyxnQkFBSSxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxtQkFBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDdEQ7S0E2Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSx3QkFBd0I7QUFDN0IsYUFBSyxFQTdDYSxTQUFBLHNCQUFBLENBQUMsa0JBQWtCLEVBQUU7QUFDdkMsZ0JBQUksUUFBUSxHQUFHLGtCQUFrQixHQUFHLENBQUMsQ0FBQzs7QUFFdEMsbUJBQU8sUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUNsRTtLQThDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFlBQVk7QUFDakIsYUFBSyxFQTlDQyxTQUFBLFVBQUEsQ0FBQyxNQUFNLEVBQUU7QUFDZixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixLQUFLLE1BQU0sRUFBRTtBQUM1QyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7YUFDOUM7U0FDSjtLQStDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGFBQWE7QUFDbEIsYUFBSyxFQS9DRSxTQUFBLFdBQUEsQ0FBQyxNQUFNLEVBQUU7QUFDaEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQzdFO0tBZ0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsZUFBZTtBQUNwQixhQUFLLEVBaERJLFNBQUEsYUFBQSxDQUFDLEtBQUssRUFBRTtBQUNqQixnQkFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN0QixnQkFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzs7QUFFeEQsZ0JBQUksR0FBRyxLQUFLLFdBQVcsRUFBRTtBQUNyQixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM1RCxxQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO0FBQzdCLG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3hELHFCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUU7QUFDeEIsb0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtBQUNyRCxxQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCO1NBQ0o7S0FpREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxlQUFlO0FBQ3BCLGFBQUssRUFqREksU0FBQSxhQUFBLEdBQUc7QUFrRFIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFqRHJCLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUs7QUFDakQsdUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FtREksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBcEROLFVBQVUsRUFBQTtBQUNkLHdCQUFJLEVBQUMsT0FBTztBQUNaLGtDQUFBLEVBQWMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDekMsdUJBQUcsRUFBRSxVQUFVLEdBQUcsS0FBSztBQUN2Qix1QkFBRyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0FBQ3JCLDZCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUc7QUFDWCxxREFBNkIsRUFBRSxJQUFJO0FBQ25DLDhEQUFzQyxFQUFFLFVBQVUsQ0FBQyxRQUFRO3FCQUM3RCxDQUFDO0FBQ0YsNEJBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsMEJBQU0sRUFBRSxLQUFBLENBQUssVUFBVSxDQUFDLElBQUksQ0FBQSxLQUFBLEVBQU8sVUFBVSxDQUFDO0FBQzlDLDJCQUFPLEVBQUUsS0FBQSxDQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUEsS0FBQSxFQUFPLFVBQVUsQ0FBQztBQUNoRCwyQkFBTyxFQUFFLEtBQUEsQ0FBSyxXQUFXLENBQUMsSUFBSSxDQUFBLEtBQUEsRUFBTyxVQUFVLENBQUMsRUFBQSxDQUFBLEVBQ3BELFVBQVUsQ0FBQyxPQUFPLENBQ2IsQ0FDUjthQUNMLENBQUMsQ0FBQztTQUNOO0tBb0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsUUFBUTtBQUNiLGFBQUssRUFwREgsU0FBQSxNQUFBLEdBQUc7QUFxREQsZ0JBQUksR0FBRyxDQUFDOztBQXBEWixtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQXNESSxLQUFLLEVBQ0wsUUFBUSxDQUFDLEVBQUUsRUF2RE4sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUE7QUFDcEIsK0JBQUEsRUFBYyxZQUFZO0FBQzFCLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBO0FBQ1IsMENBQXNCLEVBQUUsSUFBSTtpQkF3RDNCLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUF2RHJCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsR0FBQSxDQUFBLENBQzNEO0FBQ0YseUJBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEMsa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLHFCQUFLLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUUsRUFBQSxDQUFBLEVBQ3ZELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FDcEIsQ0FDUjtTQUNMO0tBcURBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFdBekpFLGtCQUFrQixDQUFBO0NBMEp2QixDQUFBLENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0FBckR4QixrQkFBa0IsQ0FBQyxTQUFTLEdBQUc7QUFDM0IsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixhQUFTLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLE1BQUUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDMUIsb0JBQWdCLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFdBQU8sRUFBRSxTQUFBLE9BQUEsQ0FBUyxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtBQUM5QyxZQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMxQixtQkFBTyxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQzFEOztBQUVELFlBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQy9DLGdCQUFJLEVBQUUsVUFBVSxJQUFJLE1BQU0sQ0FBQSxFQUFHO0FBQ3pCLHVCQUFPLElBQUksQ0FBQzthQUNmO1NBQ0osQ0FBQyxDQUFDOztBQUVILFlBQUksZUFBZSxFQUFFO0FBQ2pCLG1CQUFPLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDdkU7O0FBRUQsWUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDNUMsZ0JBQUksRUFBRSxPQUFPLElBQUksTUFBTSxDQUFBLEVBQUc7QUFDdEIsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSixDQUFDLENBQUM7O0FBRUgsWUFBSSxZQUFZLEVBQUU7QUFDZCxtQkFBTyxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ3BFOztBQUVELFlBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixZQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2hELGdCQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDakIsb0JBQUksWUFBWSxFQUFFO0FBQ2QsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQUVELDRCQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0osQ0FBQyxDQUFDOztBQUVILFlBQUksZ0JBQWdCLEVBQUU7QUFDbEIsbUJBQU8sSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztTQUNsRztLQUNKO0NBQ0osQ0FBQzs7QUFFRixrQkFBa0IsQ0FBQyxZQUFZLEdBQUc7QUFDOUIsU0FBSyxFQUFFLEVBQUU7QUFDVCxXQUFPLEVBQUUsRUFBRTtBQUNYLG9CQUFnQixFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07Q0FDekIsQ0FBQzs7QUF5REYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQXZESCxrQkFBa0IsQ0FBQTtBQXdEakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7OztBQzVOcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FoQkYsT0FBTyxDQUFBLENBQUE7O0FBa0J6QixJQUFJLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQW5CSCxXQUFXLENBQUEsQ0FBQTs7QUFxQjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQXJCTSxXQUFXLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQXNCYixhQUFTLENBdEJQLFdBQVcsRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFDRixhQURULFdBQVcsR0FDUTtBQXdCakIsdUJBQWUsQ0FBQyxJQUFJLEVBekJ0QixXQUFXLENBQUEsQ0FBQTs7QUEyQlQsYUFBSyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQTFCckIsSUFBSSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUE7QUFBSixnQkFBSSxDQUFBLElBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtTQTRCZDs7QUEzQkQsWUFBQSxDQUFBLE1BQUEsQ0FBQSxjQUFBLENBRkYsV0FBVyxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUVBLElBQUksQ0FBQSxDQUFFOztBQUVmLFlBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEQ7O0FBK0JELGdCQUFZLENBcENWLFdBQVcsRUFBQSxDQUFBO0FBcUNULFdBQUcsRUFBRSxhQUFhO0FBQ2xCLGFBQUssRUEvQkUsU0FBQSxXQUFBLENBQUMsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDdkIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0o7S0FnQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxlQUFlO0FBQ3BCLGFBQUssRUFoQ0ksU0FBQSxhQUFBLEdBQUc7QUFDWixnQkFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUN0Qyx1QkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQWdDSSxLQUFLLEVBQ0wsRUFqQ0MsU0FBUyxFQUFDLHFCQUFxQixFQUFBLEVBQ2hDLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBa0NJLE1BQU0sRUFDTixFQW5DRSxTQUFTLEVBQUMsMEJBQTBCLEVBQUEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBUSxDQUNwRSxDQUNSO2FBQ0w7O0FBRUQsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDN0I7S0FxQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQXJDSCxTQUFBLE1BQUEsR0FBRztBQUNMLGdCQUFJLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQzs7QUFFdEQsbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FxQ0ksS0FBSyxFQUNMLEVBdENDLFNBQVMsRUFBQyxlQUFlO0FBQ3pCLHFCQUFLLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUk7QUFDM0MscUJBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFDO0FBQ2pFLHVCQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQSxFQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQ25CLENBQ1I7U0FDTDtLQXNDQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQTlFRSxXQUFXLENBQUE7Q0ErRWhCLENBQUEsQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUF0Q3hCLFdBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsV0FBTyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUM3QixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGNBQVUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsT0FBRyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUM5QixDQUFDOztBQTBDRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBeENILFdBQVcsQ0FBQTtBQXlDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FDdkZwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFFLFFBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFFLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQUUsTUFBTTtBQUFFLFdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FBRSxBQUFDLE9BQU8sR0FBRyxDQUFDO0NBQUU7O0FBRWpOLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsUUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXBCRixPQUFPLENBQUEsQ0FBQTs7QUFzQnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBdkJGLFdBQVcsQ0FBQSxDQUFBOztBQXlCaEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksUUFBUSxHQUFHLE9BQU8sQ0ExQkgsV0FBVyxDQUFBLENBQUE7O0FBNEI5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQTdCRixPQUFPLENBQUEsQ0FBQTs7QUErQnZCLElBQUksS0FBSyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV6QyxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FoQ0wsc0JBQXNCLENBQUEsQ0FBQTs7QUFrQ2hELElBQUksa0JBQWtCLEdBQUcsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUFFbkUsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQW5DVCxpQkFBaUIsQ0FBQSxDQUFBOztBQXFDbEMsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXpELElBQUksV0FBVyxHQUFHLE9BQU8sQ0F0Q1YsWUFBWSxDQUFBLENBQUE7O0FBd0MzQixJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbkJ2RCxJQUFNLFNBQVMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUN6RCxRQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFN0IsV0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDZixZQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDbEMsbUJBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCOztBQUVELGFBQUssSUFBSSxDQUFDLENBQUM7S0FDZDtDQUNKLENBQUM7O0FBMENGLElBeENNLE9BQU8sR0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBO0FBeUNULGFBQVMsQ0F6Q1AsT0FBTyxFQUFBLE9BQUEsQ0FBQSxDQUFBOztBQUNFLGFBRFQsT0FBTyxHQUNZO0FBMkNqQix1QkFBZSxDQUFDLElBQUksRUE1Q3RCLE9BQU8sQ0FBQSxDQUFBOztBQThDTCxhQUFLLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBN0NyQixJQUFJLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQTtBQUFKLGdCQUFJLENBQUEsSUFBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1NBK0NkOztBQTlDRCxZQUFBLENBQUEsTUFBQSxDQUFBLGNBQUEsQ0FGRixPQUFPLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBRUksSUFBSSxDQUFBLENBQUU7O0FBRWYsWUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsWUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxZQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFekQsWUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekUsWUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekUsWUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEU7O0FBa0RELGdCQUFZLENBL0RWLE9BQU8sRUFBQSxDQUFBO0FBZ0VMLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUFsREcsU0FBQSxZQUFBLEdBQUc7QUFDWCxtQkFBTztBQUNILGdDQUFnQixFQUFFLEVBQUU7QUFDcEIsMkJBQVcsRUFBRSxJQUFJO0FBQ2pCLHFDQUFxQixFQUFFLENBQUMsQ0FBQztBQUN6QixvQkFBSSxFQUFFLENBQUM7QUFDSCx3QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMxQiw0QkFBUSxFQUFFLENBQUM7QUFDWCxxQkFBQyxFQUFFLENBQUM7aUJBQ1AsQ0FBQztBQUNGLDhCQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkIsdUJBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLGdDQUFnQixFQUFFLElBQUk7QUFDdEIsZ0NBQWdCLEVBQUUsSUFBSTthQUN6QixDQUFDO1NBQ0w7S0FtREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxtQkFBbUI7QUFDeEIsYUFBSyxFQW5EUSxTQUFBLGlCQUFBLEdBQUc7QUFDaEIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDL0IsZ0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7OztBQUc1QixnQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7QUFDaEMsZ0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDL0IsZ0JBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7QUFDM0MsZ0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7O0FBRTlCLGdCQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtLQW9EQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHVCQUF1QjtBQUM1QixhQUFLLEVBcERZLFNBQUEscUJBQUEsR0FBRzs7QUFFcEIsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7S0FxREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxvQkFBb0I7QUFDekIsYUFBSyxFQXJEUyxTQUFBLGtCQUFBLEdBQUc7QUFDakIsZ0JBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsa0JBQWtCLEtBQUssV0FBVyxFQUFFO0FBQ2xFLG9CQUFJLElBQUksR0FBRyxVQUFBLENBQUEsU0FBQSxDQUFBLENBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUU3RSxvQkFBSSxJQUFJLEVBQUU7QUFDTix3QkFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHOUMsd0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMzRCx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RDthQUNKO1NBQ0o7S0FzREEsRUFBRTtBQUNDLFdBQUcsRUFBRSwyQkFBMkI7QUFDaEMsYUFBSyxFQXREZ0IsU0FBQSx5QkFBQSxHQUFHO0FBQ3hCLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRWxFLG1CQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUM1QjtLQXVEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDJCQUEyQjtBQUNoQyxhQUFLLEVBdkRnQixTQUFBLHlCQUFBLEdBQUc7QUFDeEIsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7O0FBRWpELG1CQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUM1QjtLQXdEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG1CQUFtQjtBQUN4QixhQUFLLEVBeERRLFNBQUEsaUJBQUEsR0FBRztBQUNoQixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsZ0JBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyRSxnQkFBSSxTQUFTLEdBQUcsVUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0MsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUNoRCxnQkFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQzlDLGdCQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7O0FBRTVDLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLEdBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUvRSxnQkFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7QUFFdEMsZ0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7O0FBRXRDLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDOztBQUVuRyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUU7O0FBRWpGLGdCQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNqRix1QkFBQSxRQUFBLENBQUEsRUFBQSxFQUNPLE1BQU0sRUFBQTtBQUNULHlCQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBd0RuRSxDQUFDLENBdkRKO2FBQ0wsQ0FBQyxDQUFDOztBQUVILGdCQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsZ0JBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDNUMsNkJBQWEsQ0FBQyxJQUFJLENBQUM7QUFDZix3QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMxQiw0QkFBUSxFQUFFLENBQUM7QUFDWCxxQkFBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQztpQkFDekIsQ0FBQyxDQUFDOztBQUVILDhCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCOztBQUVELGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsMkJBQVcsRUFBRSxLQUFLO0FBQ2xCLHVCQUFPLEVBQUUsZUFBZTtBQUN4QixvQkFBSSxFQUFFLGFBQWE7QUFDbkIsOEJBQWMsRUFBRSxjQUFjO0FBQzlCLGdDQUFnQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtBQUNsRCxnQ0FBZ0IsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUU7YUFDckQsQ0FBQyxDQUFDO1NBQ047S0F3REEsRUFBRTtBQUNDLFdBQUcsRUFBRSxrQkFBa0I7QUFDdkIsYUFBSyxFQXhETyxTQUFBLGdCQUFBLEdBQUc7QUFDZixnQkFBTyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUN6QyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbkMsdUJBQU87YUFDVjs7OztBQUlELGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUM1RCxDQUFDOztBQUVGLGdCQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztBQUVuRSxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDckU7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtBQUM3QixvQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTs7QUFFOUMsd0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7QUFFckUsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUQsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTVELHdCQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1Qyx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7O0FBRTFDLHdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDaEQ7O0FBRUQsb0JBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTs7QUFFN0Isd0JBQUksQ0FBQyw4QkFBOEIsR0FBRyxDQUFDLENBQUM7O0FBRXhDLHlCQUFLLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUNoRyw0QkFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7QUFFaEUsNEJBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO0FBQ3hHLDRCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZFLDRCQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN4RCw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7QUFFbkUsNEJBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUNyRTs7QUFFRCx3QkFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7QUFDOUMsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDOztBQUU1Qyx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM5RCx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7QUFFOUQsd0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1NBQ0o7S0FzREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxnQkFBZ0I7QUFDckIsYUFBSyxFQXRESyxTQUFBLGNBQUEsR0FBRztBQUNiLGdCQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUM1RCx1QkFBTzthQUNWOzs7O0FBSUQsZ0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQzVELENBQUM7O0FBRUYsZ0JBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO0FBQ2xELG9CQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNoRDs7QUFFRCxnQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLG9CQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFOztBQUU5Qyx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOztBQUVyRSx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM1RCx3QkFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7QUFFNUQsd0JBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBQzVDLHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFMUMsd0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUNoRDs7QUFFRCxvQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFOztBQUU3Qix3QkFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRTNFLHlCQUFLLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUNoRyw0QkFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7O0FBRXRFLDRCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztBQUN4Ryw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RSw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDeEQsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRW5FLDRCQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztxQkFDdEU7O0FBRUQsd0JBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO0FBQzlDLHdCQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzs7QUFFNUMsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDOUQsd0JBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTlELHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKO0tBcURBLEVBQUU7QUFDQyxXQUFHLEVBQUUsa0JBQWtCO0FBQ3ZCLGFBQUssRUFyRE8sU0FBQSxnQkFBQSxDQUFDLEtBQUssRUFBRTtBQUNwQixpQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUV2QixnQkFBSSxLQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFDdEMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUM3QyxJQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDbEQsdUJBQU87YUFDVjs7O0FBR0QsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRXhFLGdCQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNsQixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDOUMsb0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQ3pDOztBQUVELGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDOztBQUV4RSxnQkFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDNUIsb0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDbkMsb0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6Qjs7QUFFRCxnQkFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNoQixvQkFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDbEIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUN0QyxvQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ2pDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM5QixvQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBLGtCQUFBLENBQUEsU0FBQSxDQUFBLENBQWUsR0FBQSxjQUFBLEdBQWtCLElBQUksQ0FBQyxLQUFLLEdBQUEsZUFBZSxDQUFDO2FBQ2xGOzs7QUFHRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBLGtCQUFBLENBQUEsU0FBQSxDQUFBLENBQWUsR0FBQSxjQUFBLEdBQWtCLElBQUksQ0FBQyxLQUFLLEdBQUEsTUFBQSxHQUFPLElBQUksQ0FBQyxLQUFLLEdBQUEsVUFBVSxDQUFDOzs7QUFHM0YsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFlLEdBQUEsY0FBQSxHQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQSxlQUFlLENBQUM7O0FBRWpHLGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBSSxJQUFJLENBQUMsZUFBZSxDQUFDOztBQUU3RixnQkFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzlFLG9CQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ2hGOztBQUVELGdCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUEsa0JBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBZSxHQUFBLG1CQUFBLEdBQXVCLElBQUksQ0FBQyxrQkFBa0IsR0FBQSxVQUFVLENBQUM7O0FBRXBHLGdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM5QjtLQW9EQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG9CQUFvQjtBQUN6QixhQUFLLEVBcERTLFNBQUEsa0JBQUEsQ0FBQyxLQUFLLEVBQUU7QUFxRGxCLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBcERyQixnQkFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ2IsdUJBQU87YUFDVjs7QUFFRCxnQkFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLGdCQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7O0FBRXRCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVLEVBQUk7QUFDNUMsb0JBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxLQUFBLENBQUssc0JBQXNCLENBQUMsT0FBTyxFQUFFO0FBQzVELGlDQUFhLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQzs7QUFFbEMsMkJBQU8sVUFBVSxDQUFDO2lCQUNyQjs7OztBQUlELG9CQUFPLGFBQWEsR0FBRyxDQUFDLElBQ2pCLENBQUMsS0FBSyxDQUFDLEtBQUEsQ0FBSyxrQkFBa0IsQ0FBQyxJQUMvQixVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxLQUFBLENBQUssa0JBQWtCLEVBQUU7QUFDM0QsaUNBQWEsR0FBRyxLQUFBLENBQUssa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDbEUsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUEsQ0FBSyxrQkFBa0IsQ0FBQyxJQUM1QixVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxLQUFBLENBQUssa0JBQWtCLEVBQUU7QUFDdEUsaUNBQWEsR0FBRyxLQUFBLENBQUssa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDOUQ7O0FBRUQsNkJBQWEsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQzs7QUFFbEQsdUJBQUEsUUFBQSxDQUFBLEVBQUEsRUFDTyxVQUFVLEVBQUE7QUFDYix5QkFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYTtpQkFtRHRDLENBQUMsQ0FsREo7YUFDTCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDdEMsb0JBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7YUFDaEMsTUFBTTtBQUNILG9CQUFJLENBQUMsbUJBQW1CLElBQUksYUFBYSxDQUFDO2FBQzdDOztBQUVELGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsdUJBQU8sRUFBRSxJQUFJO0FBQ2IsZ0NBQWdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO2FBQ3JELEVBQUUsWUFBTTs7O0FBR0wsb0JBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtBQUNuQix5QkFBQSxDQUFLLGdCQUFnQixDQUFDO0FBQ2xCLDhCQUFNLEVBQUUsYUFBYTtBQUNyQiw4QkFBTSxFQUFFLENBQUM7QUFDVCxzQ0FBYyxFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07cUJBQ3ZCLENBQUMsQ0FBQztpQkFDTjthQUNKLENBQUMsQ0FBQztTQUNOO0tBbURBLEVBQUU7QUFDQyxXQUFHLEVBQUUsdUJBQXVCO0FBQzVCLGFBQUssRUFuRFksU0FBQSxxQkFBQSxDQUFDLEtBQUssRUFBRTtBQUN6QixnQkFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNwQixvQkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ2pDLG9CQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2FBQ3BHO1NBQ0o7S0FvREEsRUFBRTtBQUNDLFdBQUcsRUFBRSwwQkFBMEI7QUFDL0IsYUFBSyxFQXBEZSxTQUFBLHdCQUFBLENBQUMsS0FBSyxFQUFFO0FBQzVCLGdCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLG9CQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDakMsb0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7YUFDbEM7U0FDSjtLQXFEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDBCQUEwQjtBQUMvQixhQUFLLEVBckRlLFNBQUEsd0JBQUEsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsZ0JBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDcEIsb0JBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUNqQyxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzthQUNsQztTQUNKO0tBc0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsZ0JBQWdCO0FBQ3JCLGFBQUssRUF0REssU0FBQSxjQUFBLENBQUMsS0FBSyxFQUFFO0FBQ2xCLGdCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLG9CQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtBQUM3Qix3QkFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUUxRCx3QkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNwQzs7QUFFRCxvQkFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsd0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQiw4QkFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVc7QUFDeEMsOEJBQU0sRUFBRSxDQUFDO0FBQ1Qsc0NBQWMsRUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNO3FCQUN2QixDQUFDLENBQUM7O0FBRUgsd0JBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDcEM7O0FBRUQsb0JBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQ3pCLHdCQUFJLENBQUMsZ0JBQWdCLENBQUM7QUFDbEIsOEJBQU0sRUFBRSxDQUFDO0FBQ1QsOEJBQU0sRUFBRSxDQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQSxHQUFJLElBQUksQ0FBQyxlQUFlLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7QUFDNUcsc0NBQWMsRUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNO3FCQUN2QixDQUFDLENBQUM7O0FBRUgsd0JBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDcEM7YUFDSjtTQUNKO0tBdURBLEVBQUU7QUFDQyxXQUFHLEVBQUUsZUFBZTtBQUNwQixhQUFLLEVBdkRJLFNBQUEsYUFBQSxHQUFHO0FBQ1osZ0JBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO0FBQzdCLG9CQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2FBQ3RDOztBQUVELGdCQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUN6QixvQkFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQzthQUNuQzs7QUFFRCxnQkFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsb0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7YUFDbkM7U0FDSjtLQXdEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGdCQUFnQjtBQUNyQixhQUFLLEVBeERLLFNBQUEsY0FBQSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7QUFDbEMsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDMUIsb0JBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuRDs7QUFFRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUN2RztLQXlEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFlBQVk7QUFDakIsYUFBSyxFQXpEQyxTQUFBLFVBQUEsR0FBRztBQTBETCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQXpEdEIsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUssRUFBSztBQUN2Qyx1QkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxFQUFLLEdBQUcsRUFBRSxLQUFLO0FBQ1YsMEJBQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQUEsQ0FBSyxLQUFLLENBQUMscUJBQXFCO0FBQ3pELDJCQUFPLEVBQUUsTUFBQSxDQUFLLEtBQUssQ0FBQyxPQUFPO0FBQzNCLHdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDZCx3QkFBSSxFQUFFLEdBQUksQ0FBQyxRQUFRLEdBQUksQ0FBQyxLQUFLLENBQUM7QUFDOUIscUJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNSLDhCQUFVLEVBQUUsTUFBQSxDQUFLLGNBQWM7QUFDL0Isa0NBQWMsRUFBRSxNQUFBLENBQUssS0FBSyxDQUFDLGNBQWMsRUFBQSxDQUFJLENBQ3BEO2FBQ0wsQ0FBQyxDQUFDO1NBQ047S0EwREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxZQUFZO0FBQ2pCLGFBQUssRUExREMsU0FBQSxVQUFBLEdBQUc7QUFDVCxtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQTBESSxLQUFLLEVBQ0wsRUEzREMsR0FBRyxFQUFDLE1BQU07QUFDVix5QkFBUyxFQUFDLGVBQWUsRUFBQSxFQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQ2hCLENBQ1I7U0FDTDtLQTJEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFlBQVk7QUFDakIsYUFBSyxFQTNEQyxTQUFBLFVBQUEsR0FBRztBQTRETCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQTNEdEIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUN6Qix1QkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQTZESSxLQUFLLEVBQ0wsRUE5REMsR0FBRyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUEsRUFDdkMsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0ErREksS0FBSyxFQUNMLEVBaEVDLFNBQVMsRUFBQyxrQ0FBa0MsRUFBQSxFQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFLO0FBQ3ZDLDJCQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBZ0VBLEtBQUssRUFDTCxFQWpFSyxHQUFHLEVBQUUsS0FBSztBQUNWLGlDQUFTLEVBQUMsb0NBQW9DO0FBQzlDLDZCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksRUFBQyxFQUFBLEVBQ3ZFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBa0VBLEtBQUssRUFDTCxFQW5FSyxTQUFTLEVBQUMscUJBQXFCLEVBQUEsRUFDaEMsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FvRUEsTUFBTSxFQUNOLEVBckVNLFNBQVMsRUFBQywwQkFBMEIsRUFBQSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQVEsQ0FDOUQsRUFDTixPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLFNBQVMsRUFBQyxvQ0FBb0M7QUFDOUMsMkNBQUEsRUFBbUIsS0FBSztBQUN4QixtQ0FBVyxFQUFFLE1BQUEsQ0FBSyxxQkFBcUIsRUFBQSxDQUFJLENBQzlDLENBQ1I7aUJBQ0wsQ0FBQyxDQUNBLENBQ0osQ0FDUjthQUNMO1NBQ0o7S0FzRUEsRUFBRTtBQUNDLFdBQUcsRUFBRSxrQkFBa0I7QUFDdkIsYUFBSyxFQXRFTyxTQUFBLGdCQUFBLEdBQUc7QUFDZixtQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQXNFSSxLQUFLLEVBQ0wsSUFBSSxFQXRFSixPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQXdFSSxLQUFLLEVBQ0wsRUF6RUMsU0FBUyxFQUFDLHFCQUFxQjtBQUMvQiwyQkFBVyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBQSxFQUMzQyxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLEdBQUcsRUFBQyxjQUFjO0FBQ2xCLHlCQUFTLEVBQUMseUJBQXlCO0FBQ25DLHFCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQyxFQUFBLENBQUksQ0FDbEQsRUFDTixPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQTBFSSxLQUFLLEVBQ0wsRUEzRUMsU0FBUyxFQUFDLHFCQUFxQjtBQUMvQiwyQkFBVyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBQSxFQUMzQyxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLEdBQUcsRUFBQyxjQUFjO0FBQ2xCLHlCQUFTLEVBQUMseUJBQXlCO0FBQ25DLHFCQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBQyxFQUFBLENBQUksQ0FDbkQsQ0FDSixDQUNSO1NBQ0w7S0EyRUEsRUFBRTtBQUNDLFdBQUcsRUFBRSxpQkFBaUI7QUFDdEIsYUFBSyxFQTNFTSxTQUFBLGVBQUEsQ0FBQyxLQUFLLEVBQUU7QUE0RWYsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUEzRXRCLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxDQUFDOztBQUU1RyxnQkFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDMUIsb0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixvQ0FBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUM5RSx5Q0FBcUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUTtpQkFDM0QsQ0FBQyxDQUFDOztBQUVILG9CQUNPLEtBQU0sS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQy9ELEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVTtrQkFDL0g7O0FBQ0UsNEJBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQixrQ0FBTSxFQUFFLENBQUM7QUFDVCxrQ0FBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSztBQUMvQiwwQ0FBYyxFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07eUJBQ3ZCLENBQUMsQ0FBQztxQkFDTjthQUNKLE1BQU0sSUFBTyxLQUFNLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLElBQ3BELEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRzs7Ozs7QUFLcEYsb0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsQiwwQkFBTSxFQUFFLENBQUM7QUFDVCwwQkFBTSxFQUFFLENBQUksSUFBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhLElBQzFELENBQUssSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUEsR0FDM0QsS0FBSyxDQUFBLEdBQUksSUFBSSxDQUFDLFVBQVU7QUFDbkMsa0NBQWMsRUFBQSxhQUFBLENBQUEsU0FBQSxDQUFNO2lCQUN2QixDQUFDLENBQUM7OztBQUdILHNCQUFNLENBQUMscUJBQXFCLENBQUMsWUFBQTtBQXdFckIsMkJBeEUyQixNQUFBLENBQUssZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUFBLENBQUMsQ0FBQzthQUNuRTs7QUFFRCxnQkFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNuQztLQTBFQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHVCQUF1QjtBQUM1QixhQUFLLEVBMUVZLFNBQUEscUJBQUEsR0FBRztBQUNwQixnQkFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRW5GLGdCQUFJLEdBQUcsRUFBRTtBQUNMLG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysb0NBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQy9DLCtCQUFVLE1BQU0sQ0FBQyxLQUFLLEdBQUEsSUFBQSxHQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFHO3FCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDaEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtLQTJFQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGVBQWU7QUFDcEIsYUFBSyxFQTNFSSxTQUFBLGFBQUEsQ0FBQyxLQUFLLEVBQUU7QUFDakIsb0JBQVEsS0FBSyxDQUFDLEdBQUc7QUFDakIscUJBQUssV0FBVztBQUNaLHdCQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLHlCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsMEJBQU07QUFBQSxxQkFDTCxTQUFTO0FBQ1Ysd0JBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6Qix5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLDBCQUFNO0FBQUEscUJBQ0wsT0FBTztBQUNSLHdCQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUM3Qix5QkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLDBCQUFNO0FBQUEsYUFDVDs7QUFFRCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUMxQixxQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLG9CQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQztTQUNKO0tBNEVBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUE1RVMsU0FBQSxrQkFBQSxHQUFHO0FBQ2pCLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBNEVJLEtBQUssRUFDTCxFQTdFQyxHQUFHLEVBQUMsTUFBTTtBQUNWLHlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjO0FBQ3BDLDJCQUFBLEVBQVUsUUFBUSxFQUFBLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQzFCLENBQ1I7U0FDTDtLQTZFQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFFBQVE7QUFDYixhQUFLLEVBN0VILFNBQUEsTUFBQSxHQUFHO0FBOEVELGdCQUFJLEdBQUcsQ0FBQzs7QUE3RVosbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0ErRUksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBaEZOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFBO0FBQ3BCLG1CQUFHLEVBQUMsU0FBUztBQUNiLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBO0FBQ1Isc0NBQWtCLEVBQUUsSUFBSTtpQkFpRnZCLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUFoRnJCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsR0FBQSxDQUFBLENBQzNEO0FBQ0Ysa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLHlCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWE7QUFDN0IsMkJBQVcsRUFBRSxJQUFJLENBQUMsY0FBYztBQUNoQyx5QkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhO0FBQzdCLHVCQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtBQUM5Qix3QkFBUSxFQUFDLEdBQUc7QUFDWixxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUEsQ0FBQSxFQUN6RCxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQStFSSxLQUFLLEVBQ0wsUUFBUSxDQUFDLEVBQUUsRUFoRk4sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUE7QUFDcEIsbUJBQUcsRUFBQyxPQUFPO0FBQ1gseUJBQVMsRUFBQyxVQUFVLEVBQUEsQ0FBQSxFQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLEVBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FDaEIsRUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQ3RCLENBQ1I7U0FDTDtLQWdGQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQWhyQkUsT0FBTyxDQUFBO0NBaXJCWixDQUFBLENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0FBaEZ4QixPQUFPLENBQUMsU0FBUyxHQUFHO0FBQ2hCLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxXQUFPLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxPQUFPLENBQzVCLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ2xCLGVBQU8sRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDL0IsaUJBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsYUFBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixhQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0tBQ2hDLENBQUMsQ0FDTDtBQUNELFVBQU0sRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsaUJBQWEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixrQkFBYyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUN0QyxrQkFBYyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxpQkFBYSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxhQUFTLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07Q0FDaEMsQ0FBQzs7QUFFRixPQUFPLENBQUMsWUFBWSxHQUFHO0FBQ25CLFNBQUssRUFBRSxFQUFFO0FBQ1QsV0FBTyxFQUFFLEVBQUU7QUFDWCxVQUFNLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTTtBQUNaLGtCQUFjLEVBQUUsY0FBYztDQUNqQyxDQUFDOztBQWtGRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBaEZILE9BQU8sQ0FBQTtBQWlGdEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7OztBQzF2QnBDLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFBRSxnQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUFFO0tBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7S0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxRQUFRLEdBQUcsR0FBRztZQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsTUFBTSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQUFBQyxTQUFTLFNBQVMsQ0FBQzthQUFFO1NBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFBRSxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUUsTUFBTTtBQUFFLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQUUsdUJBQU8sU0FBUyxDQUFDO2FBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FBRTtLQUFFO0NBQUUsQ0FBQzs7QUFFbHBCLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFBRSxRQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBRSxjQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUFFLE1BQU07QUFBRSxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQUUsQUFBQyxPQUFPLEdBQUcsQ0FBQztDQUFFOztBQUVqTixTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQUU7Q0FBRTs7QUFFekosU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUFFLFFBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxHQUFHLE9BQU8sVUFBVSxDQUFDLENBQUM7S0FBRSxBQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxJQUFJLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQUU7O0FBRTllLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FsQkYsT0FBTyxDQUFBLENBQUE7O0FBb0J6QixJQUFJLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQXJCSCxXQUFXLENBQUEsQ0FBQTs7QUF1QjlCLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBeEJGLFFBQVEsQ0FBQSxDQUFBOztBQTBCekIsSUFBSSxNQUFNLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTNDLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQTNCTCxzQkFBc0IsQ0FBQSxDQUFBOztBQTZCaEQsSUFBSSxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVuRSxJQTdCTSxVQUFVLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQThCWixhQUFTLENBOUJQLFVBQVUsRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFDRCxhQURULFVBQVUsR0FDUztBQWdDakIsdUJBQWUsQ0FBQyxJQUFJLEVBakN0QixVQUFVLENBQUEsQ0FBQTs7QUFtQ1IsYUFBSyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQWxDckIsSUFBSSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUE7QUFBSixnQkFBSSxDQUFBLElBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtTQW9DZDs7QUFuQ0QsWUFBQSxDQUFBLE1BQUEsQ0FBQSxjQUFBLENBRkYsVUFBVSxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUVDLElBQUksQ0FBQSxDQUFFOztBQUVmLFlBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEQ7O0FBdUNELGdCQUFZLENBNUNWLFVBQVUsRUFBQSxDQUFBO0FBNkNSLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUF2Q0csU0FBQSxZQUFBLEdBQUc7QUFDWCxtQkFBTztBQUNILG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hCLENBQUM7U0FDTDtLQXdDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDJCQUEyQjtBQUNoQyxhQUFLLEVBeENnQixTQUFBLHlCQUFBLENBQUMsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7QUFDcEMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDM0M7U0FDSjtLQXlDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHVCQUF1QjtBQUM1QixhQUFLLEVBekNZLFNBQUEscUJBQUEsR0FBRztBQUNwQixtQkFBTyxJQUFJLENBQUM7U0FDZjtLQTBDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDJCQUEyQjtBQUNoQyxhQUFLLEVBMUNnQixTQUFBLHlCQUFBLEdBQUc7QUFDeEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksT0FBTyxFQUFFO0FBQ3BDLG9CQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxTQUFTLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDL0Qsd0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQzdCLDRCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7cUJBQ2hDO2lCQUNKLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO0tBMkNBLEVBQUU7QUFDQyxXQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLGFBQUssRUEzQ1EsU0FBQSxpQkFBQSxHQUFHO0FBQ2hCLGdCQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNwQztLQTRDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG9CQUFvQjtBQUN6QixhQUFLLEVBNUNTLFNBQUEsa0JBQUEsR0FBRztBQUNqQixnQkFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDcEM7S0E2Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxZQUFZO0FBQ2pCLGFBQUssRUE3Q0MsU0FBQSxVQUFBLEdBQUc7QUFDVCxnQkFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDOztBQUU3QixnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQix1QkFBTyxJQUFJLG9CQUFvQixDQUFDO2FBQ25DLE1BQU07QUFDSCx1QkFBTyxJQUFJLG1CQUFtQixDQUFDO2FBQ2xDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLE9BQU8sRUFBRTtBQUNwQyx1QkFBTyxJQUFJLHVCQUF1QixDQUFDO2FBQ3RDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ25CLHVCQUFPLElBQUksc0JBQXNCLENBQUM7YUFDckM7O0FBRUQsbUJBQU8sT0FBTyxDQUFDO1NBQ2xCO0tBOENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsYUFBYTtBQUNsQixhQUFLLEVBOUNFLFNBQUEsV0FBQSxHQUFHO0FBK0NOLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBOUNyQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7QUFFckUsZ0JBQUksSUFBSSxFQUFFO0FBQ04sdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVSxFQUFFLEtBQUssRUFBSztBQUNqRCwyQkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxFQUFNLEdBQUcsRUFBRSxLQUFLO0FBQ1YsK0JBQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztBQUNqQyw2QkFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0FBQ3ZCLGtDQUFVLEVBQUUsS0FBQSxDQUFLLEtBQUssQ0FBQyxjQUFjO0FBQ3JDLDJCQUFHLEVBQUUsS0FBQSxDQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUEsQ0FBSSxDQUNoQztpQkFDTCxDQUFDLENBQUM7YUFDTjtTQUNKO0tBK0NBLEVBQUU7QUFDQyxXQUFHLEVBQUUsYUFBYTtBQUNsQixhQUFLLEVBL0NFLFNBQUEsV0FBQSxDQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3ZCLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pEO1NBQ0o7S0FnREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQWhESCxTQUFBLE1BQUEsR0FBRztBQUNMLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBZ0RJLEtBQUssRUFDTCxFQWpEQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUM1QixxQkFBSyxFQUFBLGVBQUEsQ0FBQSxFQUFBLEVBQUEsa0JBQUEsQ0FBQSxTQUFBLENBQUEsRUFBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUEsbUJBQUEsR0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUEsVUFBQSxHQUFhLElBQUksQ0FBRTtBQUMzRix1QkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUEsRUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUNqQixDQUNSO1NBQ0w7S0FpREEsQ0FBQyxDQUFDLENBQUM7O0FBRUosV0EvSUUsVUFBVSxDQUFBO0NBZ0pmLENBQUEsQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUFqRHhCLFVBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsV0FBTyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsS0FBSztBQUM5QixRQUFJLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFCLFFBQUksRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDNUIsa0JBQWMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsY0FBVSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxLQUFDLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQzVCLENBQUM7O0FBcURGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FuREgsVUFBVSxDQUFBO0FBb0R6QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7QUM1SnBDLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxVQUFVLE1BQU0sRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFBRSxnQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQUUsc0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUFFO0tBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQztDQUFFLENBQUM7O0FBRWpRLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0tBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxTQUFTLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxFQUFFO1lBQUUsUUFBUSxHQUFHLEdBQUc7WUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLEFBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxnQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLE1BQU07QUFBRSxrQkFBRSxHQUFHLE1BQU0sQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEFBQUMsU0FBUyxTQUFTLENBQUM7YUFBRTtTQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFFLE1BQU07QUFBRSxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQUU7S0FBRTtDQUFFLENBQUM7O0FBRWxwQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFO0FBQUUsUUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQUUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLE9BQU8sSUFBSSxDQUFDO0tBQUUsTUFBTTtBQUFFLGVBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRS9MLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQUUsUUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQUUsY0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FBRSxNQUFNO0FBQUUsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUFFLEFBQUMsT0FBTyxHQUFHLENBQUM7Q0FBRTs7QUFFak4sU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFBRSxRQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsR0FBRyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0tBQUUsQUFBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUFFOztBQUU5ZSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBdEJGLE9BQU8sQ0FBQSxDQUFBOztBQXdCekIsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdDLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQXpCRixxQkFBcUIsQ0FBQSxDQUFBOztBQTJCbEQsSUFBSSxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVuRSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBNUJILFdBQVcsQ0FBQSxDQUFBOztBQThCOUIsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWhELElBQUksV0FBVyxHQUFHLE9BQU8sQ0EvQlYsWUFBWSxDQUFBLENBQUE7O0FBaUMzQixJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFdkQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQWxDVCxpQkFBaUIsQ0FBQSxDQUFBOztBQW9DbEMsSUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBbEN6RCxJQUFNLEtBQUssR0FBRyxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUM1QyxXQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQixDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQzFDLFdBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7QUFFRixJQUFNLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFDLFNBQVMsRUFBbUI7QUFxQ3RFLFNBQUssSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFyQ3dCLFlBQVksR0FBQSxLQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxHQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQTtBQUFaLG9CQUFZLENBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtLQXVDbkU7O0FBdENELFdBQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDOUMsZUFBTyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzVDLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBMENGLElBeENNLGdCQUFnQixHQUFBLENBQUEsVUFBQSxPQUFBLEVBQUE7QUF5Q2xCLGFBQVMsQ0F6Q1AsZ0JBQWdCLEVBQUEsT0FBQSxDQUFBLENBQUE7O0FBMkNsQixhQTNDRSxnQkFBZ0IsR0FBQTtBQTRDZCx1QkFBZSxDQUFDLElBQUksRUE1Q3RCLGdCQUFnQixDQUFBLENBQUE7O0FBOENkLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQTlDNUIsZ0JBQWdCLENBQUEsU0FBQSxDQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7S0ErQ2pCOztBQUVELGdCQUFZLENBakRWLGdCQUFnQixFQUFBLENBQUE7QUFrRGQsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQWxERyxTQUFBLFlBQUEsR0FBRztBQUNYLG1CQUFPO0FBQ0gsOENBQThCLEVBQUUsRUFBRTtBQUNsQyxzQ0FBc0IsRUFBRSxFQUFFO2FBQzdCLENBQUM7U0FDTDtLQW1EQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLG9CQUFvQjtBQUN6QixhQUFLLEVBbkRTLFNBQUEsa0JBQUEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBb0RqQyxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQW5EckIsZ0JBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQztBQUN2RCxnQkFBSSx1QkFBdUIsR0FBRyxTQUFTLENBQUMsOEJBQThCLENBQUM7QUFDdkUsZ0JBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7QUFDdkQsZ0JBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7QUFFdkUsZ0JBQUksZUFBZSxLQUFLLGNBQWMsRUFBRTtBQUNwQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQ3BCLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBQTtBQXFENUIsMkJBckRnQyxLQUFBLENBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFBQSxDQUFDLENBQ2xFLENBQUM7YUFDTDs7QUFFRCxnQkFBSSx1QkFBdUIsS0FBSyxzQkFBc0IsRUFBRTs7QUFDcEQsb0JBQUksc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNyQywyQkFBTztpQkFDVixNQUFNLElBQU8sc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsSUFDbkMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztBQUNwRyw0QkFBSSxDQUFDLElBQUksQ0FBQSxRQUFBLEdBQVUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDM0QsTUFBTSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQ0FBbUM7QUFDeEcsNEJBQUksQ0FBQyxJQUFJLENBQUEsUUFBQSxHQUFVLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQzlEO2FBQ0o7U0FDSjtLQXNEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHNCQUFzQjtBQUMzQixhQUFLLEVBdERXLFNBQUEsb0JBQUEsQ0FBQyxLQUFLLEVBQUU7QUFDeEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDekQsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDNUY7U0FDSjtLQXVEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLHFCQUFxQjtBQUMxQixhQUFLLEVBdkRVLFNBQUEsbUJBQUEsQ0FBQyxNQUFNLEVBQUU7QUFDeEIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUM7QUFDekQsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7O0FBRWhELGdCQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3ZDLHVCQUFPO2FBQ1Y7O0FBRUQsZ0JBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBQ3ZCLG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysa0RBQThCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xELENBQUMsQ0FBQzthQUNOLE1BQU07O0FBQ0gsb0JBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUVsRSxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztpQkFDOUYsQ0FBQyxDQUFDO2FBQ047U0FDSjtLQXlEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGlCQUFpQjtBQUN0QixhQUFLLEVBekRNLFNBQUEsZUFBQSxDQUFDLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztBQUN6RCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7QUFFaEQsZ0JBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdkIsdUJBQU87YUFDVjs7QUFFRCxnQkFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2xDLG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysa0RBQThCLEVBQUUsRUFBRTtpQkFDckMsQ0FBQyxDQUFDOztBQUVILG9CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNwQyxNQUFNO0FBQ0gsb0JBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUU3RCxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUE4QixFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2lCQUNwRixDQUFDLENBQUM7YUFDTjtTQUNKO0tBMERBLEVBQUU7QUFDQyxXQUFHLEVBQUUsZUFBZTtBQUNwQixhQUFLLEVBMURJLFNBQUEsYUFBQSxDQUFDLEtBQUssRUFBRTtBQUNqQixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxXQUFXO0FBQ1osd0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsMEJBQU07O0FBQUEscUJBRUwsWUFBWTtBQUNiLHdCQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQywwQkFBTTs7QUFBQSxxQkFFTCxXQUFXO0FBQ1osd0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLEVBQUU7QUFDbEQsNkJBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2Qiw0QkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLGtEQUFzQixFQUFFLE9BQU8sQ0FBQSxLQUFBLENBQUEsU0FBQSxFQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBQSxDQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUEsQ0FBQSxDQUFDO0FBQ2hILDBEQUE4QixFQUFFLEVBQUU7eUJBQ3JDLENBQUMsQ0FBQzs7QUFFSCw0QkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7cUJBQ3BDOztBQUVELDBCQUFNO0FBQUEsYUFDVDtTQUNKO0tBMkRBLEVBQUU7QUFDQyxXQUFHLEVBQUUsdUJBQXVCO0FBQzVCLGFBQUssRUEzRFksU0FBQSxxQkFBQSxDQUFDLEtBQUssRUFBRTtBQUN6QixnQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLHNDQUFzQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQztBQUN6RSw4Q0FBOEIsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUM7YUFDNUYsQ0FBQyxDQUFDO1NBQ047S0E0REEsRUFBRTtBQUNDLFdBQUcsRUFBRSxrQkFBa0I7QUFDdkIsYUFBSyxFQTVETyxTQUFBLGdCQUFBLENBQUMsS0FBSyxFQUFFO0FBQ3BCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO0FBQzNCLHVCQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLEVBQUssU0FBUyxFQUFDLDJCQUEyQjtBQUNyQywyQkFBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFBLENBQUksQ0FDaEU7YUFDTDtTQUNKO0tBMkRBLEVBQUU7QUFDQyxXQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLGFBQUssRUEzRFEsU0FBQSxpQkFBQSxDQUFDLEtBQUssRUFBRTtBQUNyQixnQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDL0QsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3pELG9CQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysa0RBQThCLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQzFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7S0EyREEsRUFBRTtBQUNDLFdBQUcsRUFBRSxvQkFBb0I7QUFDekIsYUFBSyxFQTNEUyxTQUFBLGtCQUFBLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUM3QixvQkFBUSxLQUFLLENBQUMsR0FBRztBQUNqQixxQkFBSyxPQUFPLENBQUM7QUFDYixxQkFBSyxPQUFPO0FBQ1Isd0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUFBLGFBQ2pDO1NBQ0o7S0E0REEsRUFBRTtBQUNDLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUE1REcsU0FBQSxZQUFBLEdBQUc7QUE2RFAsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUE1RHRCLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBOERJLEtBQUssRUFDTCxFQS9EQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUEsRUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDNUMsdUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0ErREEsS0FBSyxFQUNMLEVBaEVLLEdBQUcsRUFBQSxRQUFBLEdBQVcsS0FBSztBQUNuQix1QkFBRyxFQUFFLEtBQUs7QUFDViw2QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFHO0FBQ1gsNkNBQXFCLEVBQUUsSUFBSTtBQUMzQixzREFBOEIsRUFBRSxNQUFBLENBQUssS0FBSyxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2pHLENBQUM7QUFDRiwyQkFBTyxFQUFFLE1BQUEsQ0FBSyxpQkFBaUIsQ0FBQyxJQUFJLENBQUEsTUFBQSxFQUFPLEtBQUssQ0FBQztBQUNqRCw2QkFBUyxFQUFFLE1BQUEsQ0FBSyxrQkFBa0IsQ0FBQyxJQUFJLENBQUEsTUFBQSxFQUFPLEtBQUssQ0FBQztBQUNwRCw0QkFBUSxFQUFDLEdBQUcsRUFBQSxFQUNaLE1BQUEsQ0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFDbEMsTUFBQSxDQUFLLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUMzQixDQUNSO2FBQ0wsQ0FBQyxDQUNBLENBQ1I7U0FDTDtLQStEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFFBQVE7QUFDYixhQUFLLEVBL0RILFNBQUEsTUFBQSxHQUFHO0FBZ0VELGdCQUFJLEdBQUcsQ0FBQzs7QUEvRFosbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FpRUksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBbEVOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFBO0FBQ3BCLG1CQUFHLEVBQUMsU0FBUztBQUNiLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBO0FBQ1AsMkNBQXVCLEVBQUUsSUFBSTtpQkFtRTdCLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUFsRXBCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsR0FBQSxDQUFBLENBQzVEO0FBQ0Ysa0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLHlCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hDLHFCQUFLLEVBQUEsUUFBQSxDQUFBLEVBQUEsRUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUUsRUFBQSxDQUFBLEVBQ3hELElBQUksQ0FBQyxZQUFZLEVBQUUsRUFFcEIsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQXNCLElBQUksQ0FBQyxLQUFLLEVBQUE7QUFDZCxxQkFBSyxFQUFFLFNBQVM7QUFDaEIsa0JBQUUsRUFBRSxTQUFTO0FBQ2IscUJBQUssRUFBRSxTQUFTO0FBQ2hCLG1CQUFHLEVBQUMsV0FBVztBQUNmLHlCQUFTLEVBQUMsZUFBZTtBQUN6QixnQ0FBZ0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN0RCw0Q0FBNEIsRUFBRSxJQUFJLEVBQUEsQ0FBQSxDQUFJLENBQ3RELENBQ1I7U0FDTDtLQStEQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixXQTdQRSxnQkFBZ0IsQ0FBQTtDQThQckIsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQS9EeEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQ25CLGtCQUFBLENBQUEsU0FBQSxDQUFBLENBQWlCLFNBQVMsRUFBQTtBQUM3QixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsZ0JBQVksRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDcEMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLGlCQUFhLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ25DLGtCQUFjLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07Q0FpRWhDLENBaEVBLENBQUM7O0FBRUYsZ0JBQWdCLENBQUMsWUFBWSxHQUFHO0FBQzVCLFNBQUssRUFBRSxFQUFFO0FBQ1QsWUFBUSxFQUFFLEVBQUU7QUFDWixjQUFVLEVBQUUsRUFBRTtBQUNkLGlCQUFhLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTTtBQUNuQixrQkFBYyxFQUFFLElBQUk7Q0FDdkIsQ0FBQzs7QUFrRUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQWhFSCxnQkFBZ0IsQ0FBQTtBQWlFL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FDeFNwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQUU7S0FBRSxBQUFDLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFlBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQUFBQyxJQUFJLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQUFBQyxPQUFPLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEFBQUMsU0FBUyxFQUFFLE9BQU8sTUFBTSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxBQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQUFBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEFBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQUUsZ0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxNQUFNO0FBQUUsa0JBQUUsR0FBRyxNQUFNLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxBQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxBQUFDLFNBQVMsU0FBUyxDQUFDO2FBQUU7U0FBRSxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUFFLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBRSxNQUFNO0FBQUUsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSx1QkFBTyxTQUFTLENBQUM7YUFBRSxBQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0tBQUU7Q0FBRSxDQUFDOztBQUVscEIsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFBRSxXQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUFFOztBQUVqRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUFFLFFBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFFLGNBQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQUUsTUFBTTtBQUFFLFdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FBRSxBQUFDLE9BQU8sR0FBRyxDQUFDO0NBQUU7O0FBRWpOLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsUUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQXBCRixPQUFPLENBQUEsQ0FBQTs7QUFzQnpCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBdkJGLFdBQVcsQ0FBQSxDQUFBOztBQXlCaEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksUUFBUSxHQUFHLE9BQU8sQ0ExQkgsV0FBVyxDQUFBLENBQUE7O0FBNEI5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQTdCVixZQUFZLENBQUEsQ0FBQTs7QUErQjNCLElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxJQS9CTSxTQUFTLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQWdDWCxhQUFTLENBaENQLFNBQVMsRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFrQ1gsYUFsQ0UsU0FBUyxHQUFBO0FBbUNQLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsU0FBUyxDQUFBLENBQUE7O0FBcUNQLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQXJDNUIsU0FBUyxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO0tBc0NWOztBQUVELGdCQUFZLENBeENWLFNBQVMsRUFBQSxDQUFBO0FBeUNQLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQXpDSCxTQUFBLE1BQUEsR0FBRztBQTBDRCxnQkFBSSxHQUFHLENBQUM7O0FBekNaLGdCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7QUFFckMsbUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0EyQ0ksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBNUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFBO0FBQ3BCLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4Qyx5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQTtBQUNQLGdDQUFZLEVBQUUsSUFBSTtBQUNsQiwrQ0FBMkIsRUFBRSxRQUFRLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0FBQ2xFLCtDQUEyQixFQUFFLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDbEUsZ0RBQTRCLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTTtBQUNwRSwrQ0FBMkIsRUFBRSxRQUFRLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO2lCQTZDbEUsRUFBRSxlQUFlLENBQUMsR0FBRyxFQTVDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEVBQUEsZUFBQSxDQUFBLEdBQUEsRUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxHQUFBLENBQUEsQ0FDNUQ7QUFDRixxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFO0FBQ3hELDhCQUFBLEVBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQzdCLDRCQUFBLEVBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUEsQ0FBQSxFQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDbEIsQ0FDUjtTQUNMO0tBMENBLENBQUMsQ0FBQyxDQUFDOztBQUVKLFdBbEVFLFNBQVMsQ0FBQTtDQW1FZCxDQUFBLENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0FBMUN4QixTQUFTLENBQUMsUUFBUSxHQUFHO0FBQ2pCLFNBQUssRUFBRSxPQUFPO0FBQ2QsU0FBSyxFQUFFLE9BQU87QUFDZCxVQUFNLEVBQUUsUUFBUTtBQUNoQixTQUFLLEVBQUUsT0FBTztDQUNqQixDQUFDOztBQUVGLFNBQVMsQ0FBQyxTQUFTLEdBQUc7QUFDbEIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixhQUFTLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLE1BQUUsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDMUIsWUFBUSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hFLFFBQUksRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDNUIsU0FBSyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUNoQyxDQUFDOztBQUVGLFNBQVMsQ0FBQyxZQUFZLEdBQUc7QUFDckIsU0FBSyxFQUFFLEVBQUU7QUFDVCxZQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLO0NBQ3JDLENBQUM7O0FBOENGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0E1Q0gsU0FBUyxDQUFBO0FBNkN4QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7QUNoR3BDLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxVQUFVLE1BQU0sRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFBRSxnQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQUUsc0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUFFO0tBQUUsQUFBQyxPQUFPLE1BQU0sQ0FBQztDQUFFLENBQUM7O0FBRWpRLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxBQUFDLE9BQU8sV0FBVyxDQUFDO0tBQUUsQ0FBQztDQUFFLENBQUEsRUFBRyxDQUFDOztBQUV0akIsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQUFBQyxTQUFTLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFBRSxZQUFJLE1BQU0sR0FBRyxHQUFHO1lBQUUsUUFBUSxHQUFHLEdBQUc7WUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLEFBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxnQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLE1BQU07QUFBRSxtQkFBRyxHQUFHLE1BQU0sQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEFBQUMsU0FBUyxTQUFTLENBQUM7YUFBRTtTQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFFLE1BQU07QUFBRSxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUFFLHVCQUFPLFNBQVMsQ0FBQzthQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQUU7S0FBRTtDQUFFLENBQUM7O0FBRXJwQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQUUsUUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQUUsY0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FBRSxNQUFNO0FBQUUsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUFFLEFBQUMsT0FBTyxHQUFHLENBQUM7Q0FBRTs7QUFFak4sU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFBRSxRQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQUUsY0FBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsR0FBRyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0tBQUUsQUFBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUFFOztBQUU5ZSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBcEJGLE9BQU8sQ0FBQSxDQUFBOztBQXNCekIsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0F2QkgsV0FBVyxDQUFBLENBQUE7O0FBeUI5QixJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQTFCVixZQUFZLENBQUEsQ0FBQTs7QUE0QjNCLElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV2RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBN0JULGlCQUFpQixDQUFBLENBQUE7O0FBK0JsQyxJQUFJLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFekQsSUEvQk0sZ0JBQWdCLEdBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQWdDbEIsYUFBUyxDQWhDUCxnQkFBZ0IsRUFBQSxPQUFBLENBQUEsQ0FBQTs7QUFrQ2xCLGFBbENFLGdCQUFnQixHQUFBO0FBbUNkLHVCQUFlLENBQUMsSUFBSSxFQW5DdEIsZ0JBQWdCLENBQUEsQ0FBQTs7QUFxQ2QsWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBckM1QixnQkFBZ0IsQ0FBQSxTQUFBLENBQUEsRUFBQSxhQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQTtLQXNDakI7O0FBRUQsZ0JBQVksQ0F4Q1YsZ0JBQWdCLEVBQUEsQ0FBQTtBQXlDZCxXQUFHLEVBQUUsY0FBYztBQUNuQixhQUFLLEVBekNHLFNBQUEsWUFBQSxHQUFHO0FBQ1gsbUJBQU87QUFDSCxrQ0FBa0IsRUFBRSxFQUFFO0FBQ3RCLG1DQUFtQixFQUFFLENBQUMsQ0FBQztBQUN2QixrQkFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDbEIsQ0FBQztTQUNMO0tBMENBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUExQ1MsU0FBQSxrQkFBQSxHQUFHO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ3pCLG9CQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDaEQ7U0FDSjtLQTJDQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLDJCQUEyQjtBQUNoQyxhQUFLLEVBM0NnQixTQUFBLHlCQUFBLENBQUMsU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDNUMsb0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7S0E0Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSwwQkFBMEI7QUFDL0IsYUFBSyxFQTVDZSxTQUFBLHdCQUFBLEdBQUc7QUFDdkIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFakUsbUJBQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ3ZDO0tBNkNBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUE3Q1MsU0FBQSxrQkFBQSxHQUFHO0FBQ2pCLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBNkNJLEtBQUssRUFDTCxFQTlDQyxHQUFHLEVBQUMsTUFBTTtBQUNWLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2pCLHlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjO0FBQ3BDLDJCQUFBLEVBQVUsUUFBUSxFQUFBLEVBQ2xCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUM5QixDQUNSO1NBQ0w7S0E4Q0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxZQUFZO0FBQ2pCLGFBQUssRUE5Q0MsU0FBQSxVQUFBLEdBQUc7QUFDVCxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNqQixvQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDcEMsb0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzFDLG9CQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLG9CQUFPLEdBQUcsSUFDSCxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1RCw2QkFBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNoRTs7QUFFRCx1QkFDSSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFBO0FBQ3hCLHVCQUFHLEVBQUMsTUFBTTtBQUNWLHdCQUFJLEVBQUMsTUFBTTtBQUNYLDZCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBO0FBQ1AsMkNBQW1CLEVBQUUsSUFBSTtxQkE2Qy9CLEVBNUNPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFBLENBQ3BFO0FBQ0YseUJBQUssRUFBRSxTQUFTO0FBQ2hCLDRCQUFRLEVBQUUsSUFBSTtBQUNkLDRCQUFRLEVBQUMsSUFBSSxFQUFBLENBQUEsQ0FBRyxDQUN6QjthQUNMO1NBQ0o7S0EyQ0EsRUFBRTtBQUNDLFdBQUcsRUFBRSxrQkFBa0I7QUFDdkIsYUFBSyxFQTNDTyxTQUFBLGdCQUFBLENBQUMsS0FBSyxFQUFFO0FBNENoQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQTNDckIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUMsRUFBRSxZQUFBO0FBOENwQyx1QkE5QzBDLEtBQUEsQ0FBSywwQkFBMEIsRUFBRSxDQUFBO2FBQUEsQ0FBQyxDQUFDO1NBQ3hGO0tBZ0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUFoRFMsU0FBQSxrQkFBQSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUU7QUFDekMsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDckIsdUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hEOztBQUVELGdCQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDeEMsZ0JBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEUsZ0JBQUksUUFBUSxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDOztBQUU3QyxtQkFBTyxDQUNILE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBZ0RJLE1BQU0sRUFDTixFQWpERSxHQUFHLEVBQUMsR0FBRyxFQUFBLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQVEsRUFDekQsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FtREksTUFBTSxFQUNOLEVBcERFLEdBQUcsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLDhCQUE4QixFQUFBLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQVEsRUFDekcsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FzREksTUFBTSxFQUNOLEVBdkRFLEdBQUcsRUFBQyxHQUFHLEVBQUEsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFRLENBQ3ZELENBQUM7U0FDTDtLQXlEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGVBQWU7QUFDcEIsYUFBSyxFQXpESSxTQUFBLGFBQUEsR0FBRztBQTBEUixnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQXpEdEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7QUFDdEMsdUJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0EyREksS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBNUROLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUE7QUFDaEMsdUJBQUcsRUFBQyxTQUFTO0FBQ2IsNkJBQVMsRUFBRSxDQUFBLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUE7QUFDUCxvREFBNEIsRUFBRSxJQUFJO3FCQTZEbEMsRUE1REMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFBLENBQ3BGLEVBQUEsQ0FBQSxFQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3hDLHdCQUFJLE1BQU0sR0FBRyxNQUFBLENBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFeEMsMkJBQ0ksT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLGFBQUEsQ0EyREEsS0FBSyxFQUNMLFFBQVEsQ0FBQyxFQUFFLEVBNURGLE1BQU0sRUFBQTtBQUNWLGlDQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBO0FBQ1AsZ0RBQW9CLEVBQUUsSUFBSTtBQUMxQix5REFBNkIsRUFBRSxNQUFBLENBQUssS0FBSyxDQUFDLG1CQUFtQixLQUFLLEtBQUs7eUJBNkQzRSxFQTVESyxNQUFNLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFBLENBQ3hDO0FBQ0YsMkJBQUcsRUFBRSxNQUFBLENBQUssZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDekMsK0JBQU8sRUFBRSxNQUFBLENBQUssZ0JBQWdCLENBQUMsSUFBSSxDQUFBLE1BQUEsRUFBTyxLQUFLLENBQUMsRUFBQSxDQUFBLEVBQ2hELE1BQUEsQ0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQUEsQ0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQzVELENBQ1I7aUJBQ0wsQ0FBQyxDQUNBLENBQ1I7YUFDTDtTQUNKO0tBMERBLEVBQUU7QUFDQyxXQUFHLEVBQUUsYUFBYTtBQUNsQixhQUFLLEVBMURFLFNBQUEsV0FBQSxDQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO0FBQzVDLGdCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2xDLGdCQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRXhFLGdCQUFJLFlBQVksRUFBRTtBQUNkLG9CQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7QUFDZiw2QkFBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7aUJBQ2hDLE1BQU0sSUFBSSxTQUFTLElBQUksWUFBWSxFQUFFO0FBQ2xDLGlDQUFTLEdBQUcsQ0FBQyxDQUFDO3FCQUNqQjs7QUFFRCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDOUQ7U0FDSjtLQTJEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGNBQWM7QUFDbkIsYUFBSyxFQTNERyxTQUFBLFlBQUEsR0FBRztBQUNYLGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsbUNBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLGtDQUFrQixFQUFFLEVBQUU7YUFDekIsQ0FBQyxDQUFDO1NBQ047S0E0REEsRUFBRTtBQUNDLFdBQUcsRUFBRSxjQUFjO0FBQ25CLGFBQUssRUE1REcsU0FBQSxZQUFBLEdBQUc7QUFDWCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMxQjtLQTZEQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLFlBQVk7QUFDakIsYUFBSyxFQTdEQyxTQUFBLFVBQUEsR0FBRztBQUNULGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7S0E4REEsRUFBRTtBQUNDLFdBQUcsRUFBRSxVQUFVO0FBQ2YsYUFBSyxFQTlERCxTQUFBLFFBQUEsQ0FBQyxRQUFRLEVBQUU7QUFDZixnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7O0FBRXJDLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0tBK0RBLEVBQUU7QUFDQyxXQUFHLEVBQUUsb0JBQW9CO0FBQ3pCLGFBQUssRUEvRFMsU0FBQSxrQkFBQSxHQUFHO0FBQ2pCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O0FBRS9CLG1CQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQy9GO0tBZ0VBLEVBQUU7QUFDQyxXQUFHLEVBQUUsNEJBQTRCO0FBQ2pDLGFBQUssRUFoRWlCLFNBQUEsMEJBQUEsR0FBRztBQUN6QixnQkFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRTVELGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7QUFDekMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckIsTUFBTTtBQUNILG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7YUFDbEQ7U0FDSjtLQWlFQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGVBQWU7QUFDcEIsYUFBSyxFQWpFSSxTQUFBLGFBQUEsQ0FBQyxLQUFLLEVBQUU7QUFDakIsb0JBQVEsS0FBSyxDQUFDLEdBQUc7QUFDakIscUJBQUssV0FBVztBQUNaLHdCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtBQUNqQyw2QkFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO3FCQUMzQjs7QUFFRCwwQkFBTTs7QUFBQSxxQkFFTCxLQUFLLENBQUM7QUFDWCxxQkFBSyxZQUFZO0FBQ2Isd0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLENBQUMsSUFDckMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25DLDRCQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztxQkFDckM7O0FBRUQsMEJBQU07O0FBQUEscUJBRUwsU0FBUztBQUNWLHlCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25DLHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsd0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQiwwQkFBTTs7QUFBQSxxQkFFTCxXQUFXO0FBQ1oseUJBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkMsd0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsd0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQiwwQkFBTTs7QUFBQSxxQkFFTCxRQUFRO0FBQ1Qsd0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLENBQUMsSUFDckMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDekMsNEJBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztxQkFDdkI7O0FBRUQsMEJBQU07O0FBQUEscUJBRUwsT0FBTztBQUNSLHdCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxDQUFDLElBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25DLDRCQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztxQkFDckMsTUFBTTtBQUNILDRCQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMvQzs7QUFFRCwwQkFBTTtBQUFBLGFBQ1Q7U0FDSjs7O0tBZ0VBLEVBQUU7QUFDQyxXQUFHLEVBQUUsaUJBQWlCO0FBQ3RCLGFBQUssRUEvRE0sU0FBQSxlQUFBLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN0Qix1QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDdkQ7O0FBRUQsZ0JBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7QUFFM0MsbUJBQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM3RCx1QkFBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLEdBQUksTUFBTSxDQUFDO2FBQzFHLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDVjtLQWdFQSxFQUFFO0FBQ0MsV0FBRyxFQUFFLGdCQUFnQjtBQUNyQixhQUFLLEVBaEVLLFNBQUEsY0FBQSxDQUFDLFlBQVksRUFBa0M7QUFpRXJELGdCQWpFcUIsUUFBUSxHQUFBLFNBQUEsQ0FBQSxNQUFBLElBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBOztBQUN2RCxnQkFBSSxPQUFPLEdBQUcsWUFBWSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRXRGLGdCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YseUJBQVMsRUFBRSxZQUFZO0FBQ3ZCLG1DQUFtQixFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRCxrQ0FBa0IsRUFBRSxPQUFPO2FBQzlCLENBQUMsQ0FBQztTQUNOO0tBbUVBLEVBQUU7QUFDQyxXQUFHLEVBQUUsYUFBYTtBQUNsQixhQUFLLEVBbkVFLFNBQUEsV0FBQSxDQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXhDLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3BCLHFCQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7S0FvRUEsRUFBRTtBQUNDLFdBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBSyxFQXBFSCxTQUFBLE1BQUEsR0FBRztBQXFFRCxnQkFBSSxJQUFJLENBQUM7O0FBcEViLG1CQUNJLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxhQUFBLENBc0VJLEtBQUssRUFDTCxRQUFRLENBQUMsRUFBRSxFQXZFTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUNwQixtQkFBRyxFQUFDLFNBQVM7QUFDYix5QkFBUyxFQUFFLENBQUEsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQTtBQUNSLDBDQUFzQixFQUFFLElBQUk7aUJBd0UzQixFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBdkV0QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUEsRUFBQSxlQUFBLENBQUEsSUFBQSxFQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxFQUFBLElBQUEsQ0FBQSxDQUMzRDtBQUNGLGtCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4Qyx5QkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4QyxxQkFBSyxFQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUEsQ0FBQSxFQUN4RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUVsQixPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxFQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFBO0FBQ3pCLG1CQUFHLEVBQUMsT0FBTztBQUNYLHlCQUFTLEVBQUUsQ0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBO0FBQ1Asa0NBQWMsRUFBRSxJQUFJO2lCQXFFMUIsRUFwRU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUEsQ0FDdEU7QUFDRiw0QkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7QUFDM0Usb0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJO0FBQ25ELG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLE1BQU07QUFDN0QsK0JBQUEsRUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDNUIsdUJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFBLENBQUksRUFFOUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUNuQixDQUNSO1NBQ0w7S0FrRUEsQ0FBQyxDQUFDLENBQUM7O0FBRUosV0FoV0UsZ0JBQWdCLENBQUE7Q0FpV3JCLENBQUEsQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7QUFsRXhCLGdCQUFnQixDQUFDLFNBQVMsR0FBRztBQUN6QixTQUFLLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsZ0NBQTRCLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xELGdCQUFZLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3BDLFlBQVEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDN0IsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDbEIsZUFBTyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtLQUNsQyxDQUFDLENBQ0w7QUFDRCxRQUFJLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFCLGFBQVMsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsTUFBRSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUMxQixjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFlBQVEsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsYUFBUyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixxQkFBaUIsRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDekMsUUFBSSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixrQkFBYyxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtBQUN0QyxjQUFVLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFdBQU8sRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0Isb0JBQWdCLEVBQUUsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFNBQUssRUFBRSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsUUFBSSxFQUFFLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBTSxTQUFTLENBQUMsTUFBTTtDQUMvQixDQUFDOztBQUVGLGdCQUFnQixDQUFDLFlBQVksR0FBRztBQUM1QixTQUFLLEVBQUUsRUFBRTtBQUNULGdDQUE0QixFQUFFLEtBQUs7QUFDbkMsWUFBUSxFQUFFLEVBQUU7QUFDWixhQUFTLEVBQUUsRUFBRTtBQUNiLGNBQVUsRUFBRSxFQUFFO0FBQ2QscUJBQWlCLEVBQUUsRUFBRTtBQUNyQixrQkFBYyxFQUFFLGNBQWM7QUFDOUIsY0FBVSxFQUFBLGFBQUEsQ0FBQSxTQUFBLENBQU07QUFDaEIsb0JBQWdCLEVBQUEsYUFBQSxDQUFBLFNBQUEsQ0FBTTtDQUN6QixDQUFDOztBQW9FRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBbEVILGdCQUFnQixDQUFBO0FBbUUvQixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7OztBQzlZcEMsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQztBQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FMTSxJQUFJLENBQUE7O0FBQWIsU0FBUyxJQUFJLEdBQUcsRUFBRTs7QUFTakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7OztBQ2JwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBQ0gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUdNLG9CQUFvQixDQUFBO0FBUjVDLElBQU0sWUFBWSxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ25ELFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2pELENBQUM7O0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDakUsV0FBTyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMzRSxDQUFDOztBQUVhLFNBQVMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMvQyxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxlQUFPLElBQUksQ0FBQztLQUNmOztBQUVELFFBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0IsUUFBUSxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLEtBQUssaUJBQWlCLElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFHOztBQUM5RCxlQUFPLEtBQUssQ0FBQztLQUNoQjs7QUFFRCxRQUFJLElBQUksS0FBSyxpQkFBaUIsRUFBRTtBQUM1QixlQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ25HOztBQUVELFdBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLElBQUksRUFBRTtBQUFFLGVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUFFLENBQUMsSUFDMUQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLElBQUksRUFBRTtBQUFFLGVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUFFLENBQUMsQ0FBQztDQUN4RTs7QUFBQSxDQUFDO0FBYUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNoQ3BDLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDekMsU0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQU5ILENBQUMsU0FBUyx1QkFBdUIsR0FBRztBQUMvQyxRQUFJLEtBQUssR0FBRyxDQUNSLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLFlBQVksRUFDWixhQUFhLENBQ2hCLENBQUM7O0FBRUYsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QyxZQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTtBQUM1QyxtQkFBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7S0FDSjs7QUFFRCxXQUFPLEtBQUssQ0FBQztDQUNoQixDQUFBLEVBQUcsQ0FBQTs7QUFFSixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O0FDekJwQyxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQzNDLE9BQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztBQUVILElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEFBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEFBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUFFO0dBQUUsQUFBQyxPQUFPLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEFBQUMsSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEFBQUMsT0FBTyxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRXRqQixJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUFFLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLFNBQVMsRUFBRSxPQUFPLE1BQU0sRUFBRTtBQUFFLFFBQUksTUFBTSxHQUFHLEVBQUU7UUFBRSxRQUFRLEdBQUcsR0FBRztRQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQUFBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEFBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxBQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUFFLFVBQUksTUFBTSxHQUFHLE1B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Q0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0FBQ2hGLGFBQVMsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQzNELG9CQUFnQixFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0FBQ2hGLFVBQU0sRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0NBQ3JELENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICB0b2dnbGVTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXt0aGlzLnByb3BzLnByZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlCdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBvbkNsaWNrOiBub29wLFxuICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICBvblVucHJlc3NlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQnV0dG9uO1xuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICogQGNsYXNzIFVJQ2hlY2tib3hcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlDaGVja2JveCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRBdHRycy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgYXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSgpIHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMubmFtZSk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRBdHRyc31cbiAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dEF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dEF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17dGhpcy5hcmlhU3RhdGUoKX1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsIHsuLi50aGlzLnByb3BzLmxhYmVsQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICBzdHlsZT17ey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3gucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmRldGVybWluYXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblVJQ2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICBpbnB1dEF0dHJzOiB7fSxcbiAgICBsYWJlbEF0dHJzOiB7fSxcbiAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgb25VbmNoZWNrZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94O1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFVJVmlldyB7XG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgbGV0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94IGF0dHJzPXt0aGlzLnByb3BzLnNlbGVjdEFsbEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbEF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlPXshYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbExhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BjYl9pdGVtLm5hbWVgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGxldCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cyA9IHtcbiAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25BbGxDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkFsbFVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZENoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0QWxsQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0QWxsTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICBdKSxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJQ2hlY2tib3hHcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGl0ZW1zOiBbXSxcbiAgICBvbkFsbENoZWNrZWQ6IG5vb3AsXG4gICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgb25DaGlsZFVuY2hlY2tlZDogbm9vcCxcbiAgICBzZWxlY3RBbGxBdHRyczoge30sXG4gICAgc2VsZWN0QWxsTGFiZWw6ICdTZWxlY3QgQWxsJyxcbiAgICBzZWxlY3RBbGxQb3NpdGlvbjogVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ2hlY2tib3hHcm91cDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXJVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUZvY3VzID0gdGhpcy5oYW5kbGVGb2N1cy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jb250YWlucyhub2RlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5XG4gICAgICAgICAgICAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayhuYXRpdmVFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYm9keUF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5QXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJvZHl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlciB7Li4udGhpcy5wcm9wcy5mb290ZXJBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZm9vdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlckF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyIHsuLi50aGlzLnByb3BzLmhlYWRlckF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoZWFkZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlckF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXt0aGlzLmhhbmRsZURyb3B9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlkb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnN0YXRlLmhlYWRlclVVSUR9XG4gICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbiB8fCB0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlEaWFsb2cucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGJvZHlBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBmb290ZXJBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGhlYWRlckF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlEaWFsb2cuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBib2R5QXR0cnM6IHt9LFxuICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICBmb290ZXJBdHRyczoge30sXG4gICAgaGVhZGVyQXR0cnM6IHt9LFxuICAgIG9uQ2xvc2U6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSURpYWxvZztcbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSA9IHRoaXMucmVzY2FsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVzY2FsZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNjYWxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXNjYWxlKCkge1xuICAgICAgICBsZXQgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG4gICAgICAgIGxldCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICAgICAgaWYgKCAgIGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgICAgICBsZXQgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IE1hdGgubWluKHRoaXMucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSArICdweCc7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUZpdHRlZFRleHQuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbn07XG5cblVJRml0dGVkVGV4dC5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJRml0dGVkVGV4dDtcbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUltYWdlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuaW1hZ2VBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VBdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWcgey4uLnRoaXMucHJvcHMuaW1hZ2VBdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzQXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c0F0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlJbWFnZS5zdGF0dXMgPSB7XG4gICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5VSUltYWdlLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW1hZ2VBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzdGF0dXNBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJSW1hZ2UuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBpbWFnZUF0dHJzOiB7fSxcbiAgICBzdGF0dXNBdHRyczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUltYWdlO1xuIiwiLyoqXG4gKiBBIGdlbmVyaWMgbGlzdCB2aWV3LCBzdXBwb3J0aW5nIHVuc3R5bGVkLCBidWxsZXRlZCBhbmQgbnVtYmVyZWQgb3V0cHV0LlxuICogQGNsYXNzIFVJTGlzdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJTGlzdCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlSXRlbTogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICB0aGlzLnJlZnNbYGl0ZW1fJHtpbmRleH1gXS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRJdGVtSW5kZXgoY3VycmVudEl0ZW0pIHtcbiAgICAgICAgbGV0IG5leHQgPSB0aGlzLnByb3BzLml0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNJdGVtSW5kZXgoY3VycmVudEl0ZW0pIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBoYXNUeXBlID0gISF0aGlzLnByb3BzLnR5cGU7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtcztcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuc3RhdGUuYWN0aXZlSXRlbTtcblxuICAgICAgICBpZiAoaGFzVHlwZSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzSXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRJdGVtSW5kZXgoYWN0aXZlSXRlbSkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYWN0aXZlSXRlbUluZGV4ID0gaXRlbXMuaW5kZXhPZihhY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCdcbiAgICAgICAgICAgICAgICB8fCAoa2V5ID09PSAnVGFiJyAmJiBldmVudC5zaGlmdEtleSAmJiBhY3RpdmVJdGVtSW5kZXggIT09IDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzSXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0J1xuICAgICAgICAgICAgICAgICAgICAgICB8fCAoa2V5ID09PSAnVGFiJyAmJiAhZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSBpdGVtcy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0SXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgbGV0IG5vZGVUeXBlID0gdGhpcy5wcm9wcy50eXBlID8gJ2xpJyA6ICdzcGFuJztcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChub2RlVHlwZSwge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWxpc3QtaXRlbScsXG4gICAgICAgICAgICAgICAgcmVmOiBgaXRlbV8ke2luZGV4fWAsXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmNyZWF0ZUhhc2hlZEtleShpdGVtKSArIGluZGV4LCAvLyBpbiBjYXNlIDIgcGllY2VzIG9mIGNvbnRlbnQgYXJlIGlkZW50aWNhbFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogKCkgPT4gdGhpcy5zdGF0ZS5hY3RpdmVJdGVtID09PSBpdGVtICYmIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUl0ZW06IG51bGx9KSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiAoKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBpdGVtfSksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGl0ZW0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgbm9kZVR5cGUgPSAnZGl2JztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICBjYXNlICdidWxsZXQnOlxuICAgICAgICAgICAgbm9kZVR5cGUgPSAndWwnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ29sJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuYXR0cnMsXG4gICAgICAgICAgICByZWY6ICdsaXN0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICd1aS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1idWxsZXRlZCc6IHRoaXMucHJvcHMudHlwZSA9PT0gJ2J1bGxldCcsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtbnVtYmVyZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LXBsYWluJzogdGhpcy5wcm9wcy50eXBlICE9PSAnYnVsbGV0JyAmJiB0aGlzLnByb3BzLnR5cGUgIT09ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZCxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksXG4gICAgICAgICAgICBzdHlsZTogey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9LFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMucmVuZGVyQ29udGVudCgpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblVJTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGl0ZW1zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubm9kZSksXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnYnVsbGV0JywgJ251bWJlciddKSxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGl0ZW1zOiBbXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJTGlzdDtcbiIsIi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJTW9kYWxcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlNb2RhbCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXNrQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J21hc2snXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1hc2tBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWFza0F0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM9e3RoaXMucHJvcHMubW9kYWxBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubW9kYWxBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubW9kYWxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSU1vZGFsLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1hc2tBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtb2RhbEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIG1hc2tBdHRyczoge30sXG4gICAgbW9kYWxBdHRyczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSU1vZGFsO1xuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiB0aGlzLnByb3BzLnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBiYWQsIGRvbid0IGRvIHRoaXMgYW55d2hlcmUgZWxzZSA6LXguXG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMuZGlhbG9nID0gdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5ub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRpYWxvZyk7XG5cbiAgICAgICAgdGhpcy5hbGlnbiA9IHRoaXMuYWxpZ24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSBhbmNob3Iub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgYW5jaG9yWSA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgbGV0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvcnJlY3Rpb25zID0ge307XG5cbiAgICAgICAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICBsZXQgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGxldCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduKCkge1xuICAgICAgICBjb25zdCBhbmNob3IgPSB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgbGV0IHggPSB0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0TmV4dFlQb3NpdGlvbihhbmNob3IsIHRoaXMubm9kZSk7XG5cbiAgICAgICAgbGV0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKHRoaXMubm9kZSwgeCwgeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgT2JqZWN0LmtleXMoYWxpZ25tZW50Q29ycmVjdGlvbikubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMubm9kZSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgbGV0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgIDxVSURpYWxvZyB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBvcG92ZXIucG9zaXRpb24gPSB7XG4gICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgTUlERExFOiAnTUlERExFJyxcbiAgICBFTkQ6ICdFTkQnLFxufTtcblxuVUlQb3BvdmVyLnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFJlYWN0LlByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBhbmNob3JYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBhdXRvUmVwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGZYQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICBdKSxcbiAgICBzZWxmWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVBvcG92ZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUG9wb3ZlcjtcbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmxhYmVsQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uIGF0dHJzPXt0aGlzLnByb3BzLmNhbmNlbEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbEF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc0F0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc0F0dHJzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVByb2dyZXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgY2FuY2VsQXR0cnM6IHt9LFxuICAgIGxhYmVsQXR0cnM6IHt9LFxuICAgIHByb2dyZXNzQXR0cnM6IHt9LFxuICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG59O1xuXG5VSVByb2dyZXNzLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjYW5jZWxBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLFxuICAgIHByb2dyZXNzQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3M7XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy50b2dnbGVBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZUF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgdG9nZ2xlQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBvbkV4cGFuZDogbm9vcCxcbiAgICBvbkhpZGU6IG5vb3AsXG4gICAgdG9nZ2xlQXR0cnM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU7XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlSYWRpbyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaW5wdXRBdHRycy5pZCB8fCB0aGlzLnV1aWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0QXR0cnN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbEF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbEF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVJhZGlvLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXRBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5VSVJhZGlvLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgaW5wdXRBdHRyczoge30sXG4gICAgbGFiZWxBdHRyczoge30sXG4gICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVJhZGlvO1xuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbFxuICovXG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVNlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGhhbmRsZUNsaWNrKG9wdGlvbikge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICB0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cihvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMob3B0aW9uKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5kZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gMCA6IC0xfVxuICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAge2RlZmluaXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIGFyaWEtcmVxdWlyZWQ9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICBzdHlsZT17ey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9fT5cbiAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVNlZ21lbnRlZENvbnRyb2wucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvcHRpb25zOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWlzc2luZ1ZhbHVlID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoISgndmFsdWUnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuVUlTZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgb3B0aW9uczogW10sXG4gICAgb25PcHRpb25TZWxlY3RlZDogbm9vcFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlTZWdtZW50ZWRDb250cm9sO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuY2xhc3MgVUlUYWJsZUNlbGwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnRlcmFjdChldmVudCwgdGhpcy5wcm9wcy5yb3csIHRoaXMucHJvcHMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMud2lkdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsLWlubmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsLWlubmVyLXRleHQnPnt0aGlzLnByb3BzLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWRkVGl0bGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5jb250ZW50ID09PSAnc3RyaW5nJztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwnXG4gICAgICAgICAgICAgICAgIHRpdGxlPXthZGRUaXRsZSA/IHRoaXMucHJvcHMuY29udGVudCA6IG51bGx9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6IHRoaXMucHJvcHMud2lkdGggPyB0aGlzLnByb3BzLndpZHRoICsgJ3B4JyA6IG51bGx9fVxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVGFibGVDZWxsLnByb3BUeXBlcyA9IHtcbiAgICBjb250ZW50OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkludGVyYWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICByb3c6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlQ2VsbDtcbiIsIi8qKlxuICogQSBoaWdoLXBlcmZvcm1hbmNlLCBpbmZpbml0ZSB0YWJsZSB2aWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUm93IGZyb20gJy4vcm93JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbi8qKlxuICogRk9SIEZVVFVSRSBFWUVTXG4gKlxuICogVGhlcmUgYXJlIGEgbG90IG9mIHBsYWNlcyB3aGVyZSBzaGFyZWQgdGhpcy57bmFtZX0gdmFyaWFibGVzIGhhdmUgYmVlblxuICogdXNlZCB3aGVyZSB0aGV5IGRvbid0IHNlZW0gdG8gYmUgbmVlZGVkLiBUaGlzIGlzIGNvbXBsZXRlbHkgb24gcHVycG9zZSB0b1xuICogcmVkdWNlIG1lbW9yeSBwcmVzc3VyZSBkdXJpbmcgc2Nyb2xsIG9wZXJhdGlvbnMuIElmIHlvdSBjaGFuZ2UgdGhlbSBiYWNrIHRvXG4gKiBub3JtYWwgdmFycywgeW91J2xsIHNlZSB0aGUgc2F3dG9vdGhpbmcgaW4geW91ciBKUyBwcm9maWxlci4uLiBzbyBkb24ndCBkbyBpdCFcbiAqL1xuXG4vKipcbiAqIE9SREVSIE9GIE9QRVJBVElPTlNcbiAqXG4gKiAxLiBpbml0aWFsIHJlbmRlciB3LyBvbmUgcm93IG9mIGNlbGxzXG4gKiAyLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuICogMy4gYXBwbHkgd2lkdGhzIHRvIGNvbHVtbiBkZWZpbml0aW9uc1xuICogNC4gcmVuZGVyIHBhc3MgMiB3LyBjb2x1bW4gaGVhZHMgYW5kIHRoZSByZXN0IG9mIHRoZSBjZWxsc1xuICovXG5cbi8qKiBAaWdub3JlICovXG5jb25zdCBmaW5kV2hlcmUgPSBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoaW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXlbaW5kZXhdW3Byb3BlcnR5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleCAtPSAxO1xuICAgIH1cbn07IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVJvd0NsaWNrID0gdGhpcy5oYW5kbGVSb3dDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnTW92ZSA9IHRoaXMuaGFuZGxlRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCA9IHRoaXMuaGFuZGxlTW92ZUludGVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQgPSB0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IHRoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXJpYVNwb2tlbk91dHB1dDogJycsXG4gICAgICAgICAgICBjaG9rZVJlbmRlcjogdHJ1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVSb3dJbmRleDogLTEsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KDApLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHJvd3NPcmRlcmVkQnlZOiBbMF0sXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMuc2xpY2UoMCksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiBudWxsLFxuICAgICAgICAgICAgeVNjcm9sbGVyTnViU2l6ZTogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy54Q3VycmVudCA9IHRoaXMueUN1cnJlbnQgPSAwO1xuICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy55TmV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMueVNjcm9sbE51YlBvc2l0aW9uID0gMDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuY2FjaGVfaXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfb3JkZXJlZFlBcnJheVRhcmdldEluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV90YXJnZXRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jYXB0dXJlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgLyogc28gd2UgY2FuIHJldXNlIHN0YXRlLnJvd3MgdG8gYXZvaWQgZXh0cmEgYXJyYXkgYWxsb2NhdGlvbnMgaW4gdGhlIHNjcm9sbCBoYW5kbGVycyAtIGluIHRoaXMgY2FzZSBhIGZldyBtb3JlIENQVSBjeWNsZXMgYXJlIGZhciBjaGVhcGVyIHRoYW4gcnVubmluZyB1cCBhZ2FpbnN0IHRoZSBHQyAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMuaGVhZCAmJiB0eXBlb2YgdGhpcy5taW5pbXVtQ29sdW1uV2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnF1ZXJ5U2VsZWN0b3IoJy51aS10YWJsZS1oZWFkZXItY2VsbCcpO1xuXG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCBub2RlU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgTmFOIGlmIG5vdCBhIHBpeGVsIHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhpbXVtQ29sdW1uV2lkdGggPSBwYXJzZUludChub2RlU3R5bGUubWF4V2lkdGgsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbmltdW1Db2x1bW5XaWR0aCA9IHBhcnNlSW50KG5vZGVTdHlsZS5taW5XaWR0aCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpIHtcbiAgICAgICAgbGV0IHB4ID0gdGhpcy5jb250YWluZXJXaWR0aCAtIE1hdGguYWJzKHRoaXMueE1heGltdW1UcmFuc2xhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHB4IDwgMTIgPyAxMiA6IHB4O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlTY3JvbGxlck51YlNpemUoKSB7XG4gICAgICAgIGxldCBweCA9IHRoaXMucm93RW5kSW5kZXggLyB0aGlzLnByb3BzLnRvdGFsUm93cztcblxuICAgICAgICByZXR1cm4gcHggPCAxMiA/IDEyIDogcHg7XG4gICAgfVxuXG4gICAgY2FwdHVyZURpbWVuc2lvbnMoKSB7XG4gICAgICAgIGxldCBmaXJzdFJvdyA9IHRoaXMucmVmcy5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VpLXRhYmxlLXJvdycpWzBdO1xuICAgICAgICBsZXQgZmlyc3RSb3dDZWxscyA9IGZpcnN0Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3VpLXRhYmxlLWNlbGwnKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2VsbEhlaWdodCA9IGZpcnN0Um93Q2VsbHNbMF0uY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSBjb250YWluZXIuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdGhpcy5uUm93c1RvUmVuZGVyID0gTWF0aC5jZWlsKCh0aGlzLmNvbnRhaW5lckhlaWdodCAqIDEuMykgLyB0aGlzLmNlbGxIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMucm93U3RhcnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMucm93RW5kSW5kZXggPSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgbGV0IHRhYmxlV2lkdGggPSBmaXJzdFJvdy5jbGllbnRXaWR0aDtcblxuICAgICAgICB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24gPSB0aGlzLmNvbnRhaW5lcldpZHRoID4gdGFibGVXaWR0aCA/IDAgOiB0aGlzLmNvbnRhaW5lcldpZHRoIC0gdGFibGVXaWR0aDtcblxuICAgICAgICB0aGlzLnlVcHBlckJvdW5kID0gMDtcbiAgICAgICAgdGhpcy55TG93ZXJCb3VuZCA9IHRoaXMuY29udGFpbmVySGVpZ2h0IC0gKHRoaXMublJvd3NUb1JlbmRlciAqIHRoaXMuY2VsbEhlaWdodCk7XG5cbiAgICAgICAgY29uc3QgYWRqdXN0ZWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5jb2x1bW5zLm1hcChmdW5jdGlvbiBkaXNjb3ZlcldpZHRoKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmNlaWwoZmlyc3RSb3dDZWxsc1tpbmRleF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkUm93cyA9IFtdO1xuICAgICAgICBjb25zdCByb3dzT3JkZXJlZEJ5WSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uUm93c1RvUmVuZGVyOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZFJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5nZXRSb3coaSksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IGksXG4gICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsSGVpZ2h0ICogaSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3dzT3JkZXJlZEJ5WS5wdXNoKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjaG9rZVJlbmRlcjogZmFsc2UsXG4gICAgICAgICAgICBjb2x1bW5zOiBhZGp1c3RlZENvbHVtbnMsXG4gICAgICAgICAgICByb3dzOiBnZW5lcmF0ZWRSb3dzLFxuICAgICAgICAgICAgcm93c09yZGVyZWRCeVk6IHJvd3NPcmRlcmVkQnlZLFxuICAgICAgICAgICAgeFNjcm9sbGVyTnViU2l6ZTogdGhpcy5jYWxjdWxhdGVYU2Nyb2xsZXJOdWJTaXplKCksXG4gICAgICAgICAgICB5U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVlTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsRG93bigpIHtcbiAgICAgICAgaWYgKCAgIHRoaXMucm93RW5kSW5kZXggPT09IHRoaXMucHJvcHMudG90YWxSb3dzXG4gICAgICAgICAgICB8fCB0aGlzLnlOZXh0ID49IHRoaXMueUxvd2VyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyBkb3duLCBzbyB3ZSB3YW50IHRvIG1vdmUgdGhlIGxvd2VzdCBZIHZhbHVlIHRvIHRoZSB5TG93ZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgbmV4dCByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlOZXh0IC0gdGhpcy55TG93ZXJCb3VuZCkgLyB0aGlzLmNlbGxIZWlnaHRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKyB0aGlzLnJvd0VuZEluZGV4ID4gdGhpcy5wcm9wcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLnByb3BzLnRvdGFsUm93cyAtIHRoaXMucm93RW5kSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiB0aGlzLm5Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgLSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnlVcHBlckJvdW5kIC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kIC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCArPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCArPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMublJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuY2FjaGVfaXRlcmF0b3IgPSAwOyB0aGlzLmNhY2hlX2l0ZXJhdG9yIDwgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7IHRoaXMuY2FjaGVfaXRlcmF0b3IrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3RhcmdldEluZGV4ID0gdGhpcy5yb3dFbmRJbmRleCArIHRoaXMuY2FjaGVfaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gdGhpcy5zdGF0ZS5yb3dzW3RoaXMuc3RhdGUucm93c09yZGVyZWRCeVlbdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLmNhY2hlX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnkgPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucHVzaCh0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4ICs9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kIC09IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm93czogdGhpcy5zdGF0ZS5yb3dzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVTY3JvbGxVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm93U3RhcnRJbmRleCA9PT0gMCB8fCB0aGlzLnlOZXh0IDw9IHRoaXMueVVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNjcm9sbGluZyB1cCwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBoaWdoZXN0IFkgdmFsdWUgdG8gdGhlIHlVcHBlckJvdW5kIGFuZCByZXF1ZXN0IHRoZSBwcmV2aW91cyByb3cuIFNjYWxlIGFwcHJvcHJpYXRlbHkgaWYgYSBiaWcgZGVsdGEgYW5kIG1pZ3JhdGUgYXMgbWFueSByb3dzIGFzIGFyZSBuZWNlc3NhcnkuICovXG5cbiAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlOZXh0IC0gdGhpcy55VXBwZXJCb3VuZCkgLyB0aGlzLmNlbGxIZWlnaHRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5yb3dTdGFydEluZGV4IC0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMucm93U3RhcnRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IHRoaXMublJvd3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIC8qIGEgdmVyeSBsYXJnZSBzY3JvbGwgZGVsdGEsIGNhbGN1bGF0ZSB3aGVyZSB0aGUgYm91bmRhcmllcyBzaG91bGQgYmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAtIHRoaXMublJvd3NUb1JlbmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhICogdGhpcy5jZWxsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueUxvd2VyQm91bmQgKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dTdGFydEluZGV4IC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4IC09IHRoaXMuY2FjaGVfc2hpZnREZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gdGhpcy5uUm93c1RvUmVuZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLyogbW92ZSB0aGUgaGlnaGVzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIHRvcCBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgIGZvciAodGhpcy5jYWNoZV9pdGVyYXRvciA9IDA7IHRoaXMuY2FjaGVfaXRlcmF0b3IgPCB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDsgdGhpcy5jYWNoZV9pdGVyYXRvcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXggPSB0aGlzLnJvd1N0YXJ0SW5kZXggLSB0aGlzLmNhY2hlX2l0ZXJhdG9yIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIgPSB0aGlzLnN0YXRlLnJvd3NbdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WVt0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleF1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIuZGF0YSA9IHRoaXMucHJvcHMuZ2V0Um93KHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIuc2V0SW5kZXggPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3Jvd1BvaW50ZXIueSA9IHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXggKiB0aGlzLmNlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS51bnNoaWZ0KHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkucG9wKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0VuZEluZGV4IC09IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kICs9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm93czogdGhpcy5zdGF0ZS5yb3dzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKChldmVudC5kZWx0YVggPT09IDAgJiYgZXZlbnQuZGVsdGFZID09PSAwKVxuICAgICAgICAgICAgfHwgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgJiYgZXZlbnQuZGVsdGFZID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCAmJiBldmVudC5kZWx0YVggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPyAwIDogdGhpcy54Q3VycmVudCAtIGV2ZW50LmRlbHRhWDtcblxuICAgICAgICBpZiAodGhpcy54TmV4dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMueE5leHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueE5leHQgPCB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMueE5leHQgPSB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnlOZXh0ID0gdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPyAwIDogdGhpcy55Q3VycmVudCAtIGV2ZW50LmRlbHRhWTtcblxuICAgICAgICBpZiAodGhpcy55TmV4dCA8IHRoaXMueUN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsRG93bigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueU5leHQgPiB0aGlzLnlDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbFVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55TmV4dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMueU5leHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueU5leHQgPCB0aGlzLnlMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnlOZXh0ID0gdGhpcy55TG93ZXJCb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnhOZXh0ICE9PSB0aGlzLnhDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuaGVhZC5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgke3RoaXMueE5leHR9cHgsIDBweCwgMHB4KWA7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBNb3ZlIHdyYXBwZXIgKi9cbiAgICAgICAgdGhpcy5yZWZzLmJvZHkuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnhOZXh0fXB4LCAke3RoaXMueU5leHR9cHgsIDBweClgO1xuXG4gICAgICAgIC8qIG1vdmUgc2Nyb2xsYmFyIG51YnMgKi9cbiAgICAgICAgdGhpcy5yZWZzLnhTY3JvbGxlck51Yi5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgke01hdGguYWJzKHRoaXMueE5leHQpfXB4LCAwcHgsIDBweClgO1xuXG4gICAgICAgIHRoaXMueVNjcm9sbE51YlBvc2l0aW9uID0gKHRoaXMucm93U3RhcnRJbmRleCAvIHRoaXMucHJvcHMudG90YWxSb3dzKSAqIHRoaXMuY29udGFpbmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiArIHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZSA+IHRoaXMuY29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiA9IHRoaXMuY29udGFpbmVySGVpZ2h0IC0gdGhpcy5zdGF0ZS55U2Nyb2xsZXJOdWJTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZzLnlTY3JvbGxlck51Yi5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy55U2Nyb2xsTnViUG9zaXRpb259cHgsIDBweClgO1xuXG4gICAgICAgIHRoaXMueEN1cnJlbnQgPSB0aGlzLnhOZXh0O1xuICAgICAgICB0aGlzLnlDdXJyZW50ID0gdGhpcy55TmV4dDtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5SZXNpemUoZGVsdGEpIHtcbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YSA9IGRlbHRhO1xuICAgICAgICBsZXQgbmV3VGFibGVXaWR0aCA9IDA7XG5cbiAgICAgICAgbGV0IGNvcHkgPSB0aGlzLnN0YXRlLmNvbHVtbnMubWFwKGRlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubWFwcGluZyAhPT0gdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uLm1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICBuZXdUYWJsZVdpZHRoICs9IGRlZmluaXRpb24ud2lkdGg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQmVmb3JlIGFueSBtZWFzdXJlbWVudHMgYXJlIGFwcGxpZWQsIGZpcnN0IHdlIG5lZWQgdG8gY29tcGFyZSB0aGUgZGVsdGEgdG8gdGhlIGtub3duIGNlbGwgd2lkdGggdGhyZXNob2xkcyBhbmQgc2NhbGUgYXBwcm9wcmlhdGVseS4gKi9cblxuICAgICAgICAgICAgaWYgKCAgIGFkanVzdGVkRGVsdGEgPCAwXG4gICAgICAgICAgICAgICAgJiYgIWlzTmFOKHRoaXMubWluaW11bUNvbHVtbldpZHRoKVxuICAgICAgICAgICAgICAgICYmIGRlZmluaXRpb24ud2lkdGggKyBhZGp1c3RlZERlbHRhIDwgdGhpcy5taW5pbXVtQ29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMubWluaW11bUNvbHVtbldpZHRoIC0gZGVmaW5pdGlvbi53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMubWF4aW11bUNvbHVtbldpZHRoKVxuICAgICAgICAgICAgICAgICAgICAgICAmJiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA+IHRoaXMubWF4aW11bUNvbHVtbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWREZWx0YSA9IHRoaXMubWF4aW11bUNvbHVtbldpZHRoIC0gZGVmaW5pdGlvbi53aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3VGFibGVXaWR0aCArPSBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChuZXdUYWJsZVdpZHRoIDw9IHRoaXMuY29udGFpbmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueE1heGltdW1UcmFuc2xhdGlvbiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24gLT0gYWRqdXN0ZWREZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29sdW1uczogY29weSxcbiAgICAgICAgICAgIHhTY3JvbGxlck51YlNpemU6IHRoaXMuY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpLFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvKiBJZiBhIGNvbHVtbiBzaHJpbmtzLCB0aGUgd3JhcHBlciBYIHRyYW5zbGF0aW9uIG5lZWRzIHRvIGJlIGFkanVzdGVkIGFjY29yZGluZ2x5IG9yXG4gICAgICAgICAgICB3ZSdsbCBzZWUgdW53YW50ZWQgd2hpdGVzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZS4gSWYgdGhlIHRhYmxlIHdpZHRoIGJlY29tZXMgc21hbGxlciB0aGFuIHRoZSBvdmVyYWxsIGNvbnRhaW5lciwgd2hpdGVzcGFjZSB3aWxsIGFwcGVhciByZWdhcmRsZXNzLiAqL1xuICAgICAgICAgICAgaWYgKGFkanVzdGVkRGVsdGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiBhZGp1c3RlZERlbHRhLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSB0aGlzLnN0YXRlLmNvbHVtbnNbZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4taW5kZXgnKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTW92ZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5SZXNpemUoZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdENvbHVtblgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Q29sdW1uWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdFhTY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RYU2Nyb2xsID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6ICgoZXZlbnQuY2xpZW50WSAtIHRoaXMubGFzdFlTY3JvbGwpIC8gdGhpcy5jb250YWluZXJIZWlnaHQpICogdGhpcy5wcm9wcy50b3RhbFJvd3MgKiB0aGlzLmNlbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WVNjcm9sbCA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5UmVzaXppbmdDb2x1bW4gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdYKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlTY3JvbGxpbmdZKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUm93Q2xpY2soZXZlbnQsIGNsaWNrZWRSb3dEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdChldmVudCwgY2xpY2tlZFJvd0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudEFjdGl2ZVJvd0luZGV4OiBmaW5kV2hlcmUodGhpcy5zdGF0ZS5yb3dzLCAnZGF0YScsIGNsaWNrZWRSb3dEYXRhKS5zZXRJbmRleH0pO1xuICAgIH1cblxuICAgIHJlbmRlclJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnJvd3MubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxSb3cga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17cm93LnNldEluZGV4ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMuc3RhdGUuY29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3Jvdy5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgZXZlbj17KHJvdy5zZXRJbmRleCkgJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgeT17cm93Lnl9XG4gICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgICAgICAgICAgICAgb25DZWxsSW50ZXJhY3Q9e3RoaXMucHJvcHMub25DZWxsSW50ZXJhY3R9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keSc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUm93cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNob2tlUmVuZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcic+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1yb3cgdWktdGFibGUtaGVhZGVyLXJvdyc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jb2x1bW5zLm1hcCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwgdWktdGFibGUtaGVhZGVyLWNlbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdHlwZW9mIGNvbHVtbi53aWR0aCA9PT0gJ251bWJlcicgPyBjb2x1bW4ud2lkdGggOiBudWxsfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsLWlubmVyLXRleHQnPntjb2x1bW4udGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1jb2x1bW4taW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU2Nyb2xsYmFycygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVYU2Nyb2xsZXJEcmFnU3RhcnR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neFNjcm9sbGVyTnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGxlci1udWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDogdGhpcy5zdGF0ZS54U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZVlTY3JvbGxlckRyYWdTdGFydH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5U2Nyb2xsZXJOdWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbGVyLW51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2hlaWdodDogdGhpcy5zdGF0ZS55U2Nyb2xsZXJOdWJTaXplfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZVJvdyhkZWx0YSkge1xuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBmaW5kV2hlcmUodGhpcy5zdGF0ZS5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCArIGRlbHRhKTtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuZGF0YVt0aGlzLnN0YXRlLmNvbHVtbnNbMF0ubWFwcGluZ10sXG4gICAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZVJvd0luZGV4OiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cuc2V0SW5kZXgsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93LnkgKiAtMSA+IHRoaXMueUN1cnJlbnQpXG4gICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdy55ICogLTEgLSB0aGlzLmNlbGxIZWlnaHQgPCB0aGlzLnlDdXJyZW50IC0gdGhpcy5jb250YWluZXJIZWlnaHQgKyB0aGlzLmNlbGxIZWlnaHQpIC8vIDEgdW5pdCBvZiBjZWxsSGVpZ2h0IGlzIHJlbW92ZWQgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIGhlYWRlciByb3dcbiAgICAgICAgICAgICkgeyAvLyBEZXN0aW5hdGlvbiByb3cgaXMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIHNvIHNpbXVsYXRlIGEgc2Nyb2xsXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAwLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IHRoaXMuY2VsbEhlaWdodCAqIGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggICAoZGVsdGEgPT09IC0xICYmIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPT09IDEgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggPCB0aGlzLnByb3BzLnRvdGFsUm93cykpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHJvdyBpc24ndCByZW5kZXJlZCwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGUgZW5vdWdoIHJvd3MgZm9yIGl0IHRvIGZlYXNpYmx5IGJlIHNob3duXG4gICAgICAgICAgICAgICAgaW4gdGhlIHZpZXdwb3J0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICBkZWx0YVk6ICggICAoICAgIHRoaXMucm93U3RhcnRJbmRleCA+IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93U3RhcnRJbmRleCA8IHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCAtIHRoaXMucm93U3RhcnRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbEhlaWdodCxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKCkge1xuICAgICAgICBsZXQgcm93ID0gZmluZFdoZXJlKHRoaXMuc3RhdGUucm93cywgJ3NldEluZGV4JywgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXgpO1xuXG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFyaWFTcG9rZW5PdXRwdXQ6IHRoaXMuc3RhdGUuY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHVtbi50aXRsZX06ICR7cm93LmRhdGFbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgdGhpcy5hcmlhRXhwb3NlRnVsbFJvd0RhdGEoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZUtleURvd24pIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuYXJpYVNwb2tlbk91dHB1dH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10YWJsZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVEcmFnTW92ZX1cbiAgICAgICAgICAgICAgICAgb25Nb3VzZVVwPXt0aGlzLmhhbmRsZURyYWdFbmR9XG4gICAgICAgICAgICAgICAgIG9uV2hlZWw9e3RoaXMuaGFuZGxlTW92ZUludGVudH1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnXG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J3RhYmxlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWQoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNjcm9sbGJhcnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgbWFwcGluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHJlc2l6YWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB9KVxuICAgICksXG4gICAgZ2V0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVLZXlEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG90YWxSb3dzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGNvbHVtbnM6IFtdLFxuICAgIGdldFJvdzogbm9vcCxcbiAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBDZWxsIGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5cbmNsYXNzIFVJVGFibGVSb3cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkYXRhOiBuZXh0UHJvcHMuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YS50aGVuKGZ1bmN0aW9uIGNhdXRpb3VzbHlTZXRSb3dEYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLnN0YXRlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMud2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cblxuICAgIGdldENsYXNzZXMoKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gJ3VpLXRhYmxlLXJvdyc7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZXZlbikge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1ldmVuJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gJyB1aS10YWJsZS1yb3ctb2RkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LWxvYWRpbmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWN0aXZlKSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LWFjdGl2ZSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG5cbiAgICByZW5kZXJDZWxscygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlID8ge30gOiB0aGlzLnN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNvbHVtbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxDZWxsIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2RhdGFbZGVmaW5pdGlvbi5tYXBwaW5nXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2RlZmluaXRpb24ud2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW50ZXJhY3Q9e3RoaXMucHJvcHMub25DZWxsSW50ZXJhY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvdz17dGhpcy5zdGF0ZS5kYXRhfSAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW50ZXJhY3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25JbnRlcmFjdChldmVudCwgdGhpcy5zdGF0ZS5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tbdHJhbnNmb3JtUHJvcF06IHRoaXMucHJvcHMueSA/IGB0cmFuc2xhdGUzZCgwcHgsICR7dGhpcy5wcm9wcy55fXB4LCAwcHgpYCA6IG51bGx9fVxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDZWxscygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgZXZlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgeTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGVSb3c7XG4iLCIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBmdW5jdGlvbiBnZXRGaXJzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVswXTtcbn07XG5cbmNvbnN0IGxhc3QgPSBmdW5jdGlvbiBnZXRMYXN0QXJyYXlJdGVtKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufTtcblxuY29uc3Qgd2l0aG91dCA9IGZ1bmN0aW9uIHJlamVjdFNvbWVBcnJheUl0ZW1zKGJhc2VBcnJheSwgLi4udG9CZUV4Y2x1ZGVkKSB7XG4gICAgcmV0dXJuIGJhc2VBcnJheS5maWx0ZXIoZnVuY3Rpb24gcmVqZWN0U29tZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0b0JlRXhjbHVkZWQuaW5kZXhPZihpdGVtKSA9PT0gLTE7XG4gICAgfSk7XG59O1xuXG5jbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlczogW10sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGxldCBwcmV2aW91c0luZGljZXMgPSBwcmV2U3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcztcbiAgICAgICAgbGV0IHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzID0gcHJldlN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRpY2VzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzO1xuICAgICAgICBsZXQgY3VycmVudFNlbGVjdGVkSW5kaWNlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmIChwcmV2aW91c0luZGljZXMgIT09IGN1cnJlbnRJbmRpY2VzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVG9rZW5DaGFuZ2UoXG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkSW5kaWNlcy5tYXAoaW5kZXggPT4gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRpY2VzKSB7IC8vIG1vdmUgZm9jdXNcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWRJbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kaWNlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kaWNlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGljZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRpY2VzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kaWNlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGljZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kaWNlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUVudGl0eVNlbGVjdGVkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0b2tlbml6ZWRFbnRpdHlJbmRpY2VzOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMuY29uY2F0KGluZGV4KX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBpbmRpY2VzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kaWNlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogW2xhc3QoaW5kaWNlcyldLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNUb2tlbiA9IGluZGljZXNbaW5kaWNlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDtcbiAgICAgICAgbGV0IGluZGljZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGljZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5leHRUb2tlbiA9IGluZGljZXNbaW5kaWNlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlczogd2l0aG91dCh0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXMsIC4uLnRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXM6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLCBpbmRleCksXG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQsIGluZGV4KSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VG9rZW5DbG9zZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFNpbmdsZVRva2VuKGluZGV4KSB7XG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSA9PT0gLTFcbiAgICAgICAgICAgIHx8IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogW2luZGV4XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0U2luZ2xlVG9rZW4oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFNpbmdsZVRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dCB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRycz17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5oYW5kbGVFbnRpdHlTZWxlY3RlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXRBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvblRva2VuQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93VG9rZW5DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSVRva2VuaXplZElucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGlucHV0QXR0cnM6IHt9LFxuICAgIG9uVG9rZW5DaGFuZ2U6IG5vb3AsXG4gICAgc2hvd1Rva2VuQ2xvc2U6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRva2VuaXplZElucHV0O1xuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX1cbiAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVG9vbHRpcC5wb3NpdGlvbiA9IHtcbiAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgIEFGVEVSOiAnQUZURVInLFxufTtcblxuVUlUb29sdGlwLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlUb29sdGlwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVG9vbHRpcDtcbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXModGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyh0aGlzLnN0YXRlLnVzZXJJbnB1dCwgbmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpIHtcbiAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LmNvbnRlbnQgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgbGV0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBsZXQgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmhpbnRBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50QXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJyAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWFya0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1hcmtGdW5jKGVudGl0eUNvbnRlbnQsIHVzZXJJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2Vla1ZhbHVlID0gdXNlcklucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgbGV0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlckF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi5lbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLmNyZWF0ZUhhc2hlZEtleShlbnRpdHkuY29udGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcoZW50aXR5LmNvbnRlbnQsIHRoaXMuc3RhdGUudXNlcklucHV0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGxldCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXM7XG4gICAgICAgIGxldCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXNbbmV4dEluZGV4XSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kaWNlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmQgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IG5vZGUudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBzaW1wbGUgXCJzdGFydHMtd2l0aFwiIHNlYXJjaFxuICAgIGdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1hdGNoRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWF0Y2hGdW5jKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlZWtWYWx1ZSA9IGN1cnJlbnRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS5jb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZU1hdGNoZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyA9IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgbGV0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kaWNlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJJbnB1dDogY3VycmVudFZhbHVlLFxuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoZXZlbnQudGFyZ2V0LnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRBdHRycy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZSB8fCB0aGlzLnByb3BzLmlucHV0QXR0cnMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8IHRoaXMucHJvcHMuaW5wdXRBdHRycy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpfSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVudGl0aWVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKSxcbiAgICBoaW50OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBoaW50QXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5wdXRBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtYXJrRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWF0Y2hGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBtYXRjaFdyYXBwZXJBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ29tcGxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIGhpbnRBdHRyczoge30sXG4gICAgaW5wdXRBdHRyczoge30sXG4gICAgbWF0Y2hXcmFwcGVyQXR0cnM6IHt9LFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVR5cGVhaGVhZElucHV0O1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiY29uc3QgZ2V0RXhhY3RUeXBlID0gZnVuY3Rpb24gcmV0cmlldmVEZWVwVHlwZShvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG59O1xuXG5jb25zdCBjb21wYXJlT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIGNvbXBhcmVPYmplY3RLZXlzKGtleSwgYmFzZUFycmF5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzW2tleV0gIT09ICd1bmRlZmluZWQnICYmIGJhc2VBcnJheVtrZXldID09PSB0aGlzW2tleV07XG59OyAvLyBgdGhpc2AgaXMgc2V0IHRvIHRoZSBjb21wYXJpc29uIGFycmF5XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhbGxvd0VxdWFsaXR5KGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0RXhhY3RUeXBlKGEpO1xuXG4gICAgaWYgKCAgICB0eXBlICE9PSBnZXRFeGFjdFR5cGUoYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG1pc21hdGNoZXMgY2FuJ3QgYmUgY29tcGFyZWRcbiAgICAgICAgfHwgKHR5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nICYmIHR5cGUgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7IC8vIGZ1bmN0aW9ucywgUHJvbWlzZXMsIGV0YyBjYW5ub3QgYmUgZGlyZWN0bHkgY29tcGFyZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYSkuZXZlcnkoY29tcGFyZU9iamVjdEtleXMsIGIpICYmIE9iamVjdC5rZXlzKGIpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gICAgYS5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBiLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KVxuICAgICAgICAgICAmJiBiLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGEuaW5kZXhPZihpdGVtKSAhPT0gLTE7IH0pO1xufTtcbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL3RyYW5zZm9ybVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgbGV0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vVUlVdGlscy9zaGFsbG93RXF1YWwnO1xuXG4vKipcbiAqIEFuIGF1Z21lbnRlZCB2ZXJzaW9uIG9mIGBSZWFjdC5Db21wb25lbnRgIHdpdGggc29tZSBoZWxwZnVsIGFic3RyYWN0aW9ucyBhZGRlZCB0byBzbW9vdGhcbiAqIHRoZSBjb21wb25lbnQgZGV2ZWxvcG1lbnQgcHJvY2Vzcy5cbiAqXG4gKiBBbGwgVUlLaXQgY29tcG9uZW50cyBhcmUgYmFzZWQgb24gVUlWaWV3LlxuICpcbiAqIEBhdWdtZW50cyB7UmVhY3QuQ29tcG9uZW50fVxuICovXG5jbGFzcyBVSVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBkYXRhIHBhc3NlZCBvbiB0byB0aGUgZW5kIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlID8gdGhpcy5pbml0aWFsU3RhdGUoKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluIGFueSB0eXBlIG9mIGxpc3QsIHVuaXF1ZSBrZXlzIGFyZSByZXF1aXJlZCB0byBrZWVwIFJlYWN0IHJlLXJlbmRlcnMgZWZmaWNpZW50LiBUaGlzXG4gICAgICogbWV0aG9kIGNvbnN1bWVzIGEgbGlzdCBpdGVtJ3MgY29udGVudCBhbmQgcmV0dXJucyBhbiBhcHByb3ByaWF0ZSBrZXkgdG8gYmUgdXNlZC5cbiAgICAgKlxuICAgICAqIEJhc2VkIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBieSBlc21pcmFsaGEge0BsaW5rIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc2MTY0ODQvMTE0MTYxMSBvbiBTdGFja092ZXJmbG93fVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLmNyZWF0ZUhhc2hlZEtleSgnYWJjZCcpOyAvLyAyOTg3MDc0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2VTdHJpbmcgVGhlIGNvbnRlbnQgdG8gYmUgaGFzaGVkIGludG8gYSBjb25zaXN0ZW50IGtleS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBidWlsdCwgdW5pcXVlIGhhc2guXG4gICAgICovXG4gICAgY3JlYXRlSGFzaGVkS2V5KGJhc2VTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VTdHJpbmcuc3BsaXQoJycpLnJlZHVjZShmdW5jdGlvbiBoYXNoZXIoYSwgYikge1xuICAgICAgICAgICAgbGV0IGMgPSAoKGEgPDwgNSkgLSBhKSArIGIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICAgICAgcmV0dXJuIGMgJiBjO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHByb3hpbWF0ZXMgdGhlIEBsaW5re1B1cmVSZW5kZXJNaXhpbiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWx9IGZyb20gRVM1IFJlYWN0LiBJbXBsZW1lbnQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIGluIHlvdXIgc3ViY2xhc3MgdG8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIGluY29taW5nIHByb3BzIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHByb3BzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgdGhlIGluY29taW5nIHN0YXRlIGRlZmluaXRpb24sIG1heSBkaWZmZXIgZnJvbSBjdXJyZW50IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgSW5mb3JtcyBSZWFjdCB0byByZS1yZW5kZXIgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICogICAgIC8vIHNvbWUgbG9naWMgaGVyZSwgZXZlbnR1YWxseSBgcmV0dXJuYCB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgIC8vIGN1cnJlbnQgcHJvcHMgJiBzdGF0ZSBhcmUgYXZhaWxhYmxlIGZvciBjb21wYXJpc29uIGF0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgXG4gICAgICogfVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gIXNoYWxsb3dFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8ICFzaGFsbG93RXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLnV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gICAgICovXG4gICAgdXVpZCgpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZyxhPT4oYV5NYXRoLnJhbmRvbSgpKjE2Pj5hLzQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbXVsYXRlcyB0aGUgKG5vdyByZW1vdmVkKSBSZWFjdCBpbnRlcmZhY2UgYGdldEluaXRpYWxTdGF0ZWAuIEl0J3MgYSBjb252ZW5pZW5jZSwgYnV0IGFsbG93c1xuICAgICAqIGZvciB0aGlzIGZ1bmN0aW9uYWxpdHkgdG8gd29yayB3aXRob3V0IGhhdmluZyB0byBwcm92aWRlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBuYW1lIFVJVmlldyNpbml0aWFsU3RhdGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaW5pdGlhbFN0YXRlKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBVSVZpZXc7XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE1IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGFyZztcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBrZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZ2xvYmFsLlVJS2l0ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVJQnV0dG9uOiAoZ2xvYmFsLlVJS2l0LlVJQnV0dG9uID0gcmVxdWlyZSgnLi9VSUJ1dHRvbicpKSxcbiAgICBVSUNoZWNrYm94OiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3ggPSByZXF1aXJlKCcuL1VJQ2hlY2tib3gnKSksXG4gICAgVUlDaGVja2JveEdyb3VwOiAoZ2xvYmFsLlVJS2l0LlVJQ2hlY2tib3hHcm91cCA9IHJlcXVpcmUoJy4vVUlDaGVja2JveEdyb3VwJykpLFxuICAgIFVJRGlhbG9nOiAoZ2xvYmFsLlVJS2l0LlVJRGlhbG9nID0gcmVxdWlyZSgnLi9VSURpYWxvZycpKSxcbiAgICBVSUZpdHRlZFRleHQ6IChnbG9iYWwuVUlLaXQuVUlGaXR0ZWRUZXh0ID0gcmVxdWlyZSgnLi9VSUZpdHRlZFRleHQnKSksXG4gICAgVUlJbWFnZTogKGdsb2JhbC5VSUtpdC5VSUltYWdlID0gcmVxdWlyZSgnLi9VSUltYWdlJykpLFxuICAgIFVJTGlzdDogKGdsb2JhbC5VSUtpdC5VSUxpc3QgPSByZXF1aXJlKCcuL1VJTGlzdCcpKSxcbiAgICBVSU1vZGFsOiAoZ2xvYmFsLlVJS2l0LlVJTW9kYWwgPSByZXF1aXJlKCcuL1VJTW9kYWwnKSksXG4gICAgVUlQb3BvdmVyOiAoZ2xvYmFsLlVJS2l0LlVJUG9wb3ZlciA9IHJlcXVpcmUoJy4vVUlQb3BvdmVyJykpLFxuICAgIFVJUHJvZ3Jlc3M6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzcyA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzcycpKSxcbiAgICBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZTogKGdsb2JhbC5VSUtpdC5VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSA9IHJlcXVpcmUoJy4vVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUnKSksXG4gICAgVUlSYWRpbzogKGdsb2JhbC5VSUtpdC5VSVJhZGlvID0gcmVxdWlyZSgnLi9VSVJhZGlvJykpLFxuICAgIFVJU2VnbWVudGVkQ29udHJvbDogKGdsb2JhbC5VSUtpdC5VSVNlZ21lbnRlZENvbnRyb2wgPSByZXF1aXJlKCcuL1VJU2VnbWVudGVkQ29udHJvbCcpKSxcbiAgICBVSVRhYmxlOiAoZ2xvYmFsLlVJS2l0LlVJVGFibGUgPSByZXF1aXJlKCcuL1VJVGFibGUnKSksXG4gICAgVUlUb2tlbml6ZWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVRva2VuaXplZElucHV0ID0gcmVxdWlyZSgnLi9VSVRva2VuaXplZElucHV0JykpLFxuICAgIFVJVG9vbHRpcDogKGdsb2JhbC5VSUtpdC5VSVRvb2x0aXAgPSByZXF1aXJlKCcuL1VJVG9vbHRpcCcpKSxcbiAgICBVSVR5cGVhaGVhZElucHV0OiAoZ2xvYmFsLlVJS2l0LlVJVHlwZWFoZWFkSW5wdXQgPSByZXF1aXJlKCcuL1VJVHlwZWFoZWFkSW5wdXQnKSksXG4gICAgVUlWaWV3OiAoZ2xvYmFsLlVJS2l0LlVJVmlldyA9IHJlcXVpcmUoJy4vVUlWaWV3JykpLFxufTtcbiJdfQ==
