require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],2:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],3:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UICheckbox":2,"../UIUtils/noop":20,"../UIView":23,"classnames":24}],4:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],5:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":23,"classnames":24}],6:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],7:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":23,"classnames":24}],8:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIDialog":4,"../UIView":23,"classnames":24}],9:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIDialog":4,"../UIUtils/transform":22,"../UIView":23,"classnames":24}],10:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIButton":1,"../UIView":23,"classnames":24}],11:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],12:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],13:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],14:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":23}],15:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIUtils/transform":22,"../UIView":23,"./row":16,"classnames":24}],16:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/transform":22,"../UIView":23,"./cell":14}],17:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UITypeaheadInput":19,"../UIUtils/noop":20,"../UIView":23,"classnames":24}],18:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIView":23,"classnames":24}],19:[function(require,module,exports){
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../UIUtils/noop":20,"../UIView":23,"classnames":24}],20:[function(require,module,exports){
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
(function (global){
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

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlCdXR0b24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlMaXN0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJTW9kYWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3BvdmVyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUHJvZ3Jlc3MvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlSYWRpby9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVNlZ21lbnRlZENvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUYWJsZS9jZWxsLmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGFibGUvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUYWJsZS9yb3cuanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUeXBlYWhlYWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL25vb3AvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9zaGFsbG93RXF1YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm0vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlWaWV3L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxNQUFNLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQUUsZ0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FBRTtLQUFFLEFBQUMsT0FBTyxNQUFNLENBQUM7Q0FBRSxDQUFDOztBQUVqUSxJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxhQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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QUFTLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFBRSxRQUFJLE1BQU0sR0FBRyxFQUFFO1FBQUUsUUFBUSxHQUFHLEdBQUc7UUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLEFBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxBQUFDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxBQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQUFBQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFBRSxVQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEFBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQUUsZUFBTyxTQUFTLENBQUM7T0FBRSxNQUFNO0FBQUUsVUFBRSxHQUFHLE1BQU0sQ0FBQyxBQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQUFBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEFBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEFBQUMsU0FBUyxTQUFTLENBQUM7T0FBRTtLQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQUUsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQUUsTUFBTTtBQUFFLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBRSxlQUFPLFNBQVMsQ0FBQztPQUFFLEFBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQUU7R0FBRTtDQUFFLENBQUM7O0FBRWxwQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFD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T0FBTyxDQUFDLGFBQWEsQ0FBQztBQUMzRCxjQUFVLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUM5RCwyQkFBdUIsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztBQUNyRyxXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUNyRCxzQkFBa0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztBQUN0RixXQUFPLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUNyRCxvQkFBZ0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUNoRixhQUFTLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUMzRCxvQkFBZ0IsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUNoRixVQUFNLEVBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztDQUNyRCxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnByb3BzLnByZXNzZWQgPyAnb25VbnByZXNzZWQnIDogJ29uUHJlc3NlZCddKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uIHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzZWQnOiB0aGlzLnByb3BzLnByZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgb25DbGljazogbm9vcCxcbiAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgb25VbnByZXNzZWQ6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUJ1dHRvbjtcbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSBjaGVja2JveCB3aXRoIGluZGV0ZXJtaW5hdGUgc3VwcG9ydC5cbiAqIEBjbGFzcyBVSUNoZWNrYm94XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0QXR0cnMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoKSB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLm5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0QXR0cnN9XG4gICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuYXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbCB7Li4udGhpcy5wcm9wcy5sYWJlbEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5zdGF0ZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSUNoZWNrYm94LnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5kZXRlcm1pbmF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgbGFiZWxBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25DaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5VSUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgY2hlY2tlZDogZmFsc2UsXG4gICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgaW5wdXRBdHRyczoge30sXG4gICAgbGFiZWxBdHRyczoge30sXG4gICAgb25DaGVja2VkOiBub29wLFxuICAgIG9uVW5jaGVja2VkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDaGVja2JveDtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgY2hlY2tib3hlcy5cbiAqIEBjbGFzcyBVSUNoZWNrYm94R3JvdXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFVJQ2hlY2tib3ggZnJvbSAnLi4vVUlDaGVja2JveCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGxldCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveCBhdHRycz17dGhpcy5wcm9wcy5zZWxlY3RBbGxBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbEF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZT17IWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3ggey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgY2JfaXRlbS5uYW1lYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBsZXQgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMgPSB7XG4gICAgU0VMRUNUX0FMTF9CRUZPUkU6ICdTRUxFQ1RfQUxMX0JFRk9SRScsXG4gICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxufTtcblxuVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaXRlbXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uQWxsQ2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BbGxVbmNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkVW5jaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdEFsbEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdEFsbExhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVIsXG4gICAgXSksXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBpdGVtczogW10sXG4gICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgIG9uQWxsVW5jaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgc2VsZWN0QWxsQXR0cnM6IHt9LFxuICAgIHNlbGVjdEFsbExhYmVsOiAnU2VsZWN0IEFsbCcsXG4gICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUNoZWNrYm94R3JvdXA7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgICAgICBib2R5VVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrID0gdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVGb2N1cyA9IHRoaXMuaGFuZGxlRm9jdXMuYmluZCh0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY29udGFpbnMobm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleVxuICAgICAgICAgICAgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sobmF0aXZlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmJvZHlBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keUF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5QXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5ib2R5fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5hdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcm9wfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICBzdHlsZT17ey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9fVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgdGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBib2R5QXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgZm9vdGVyQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBoZWFkZXJBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgYm9keUF0dHJzOiB7fSxcbiAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgZm9vdGVyQXR0cnM6IHt9LFxuICAgIGhlYWRlckF0dHJzOiB7fSxcbiAgICBvbkNsb3NlOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlEaWFsb2c7XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5jbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUgPSB0aGlzLnJlc2NhbGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXNjYWxlKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2NhbGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzY2FsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVzY2FsZSgpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbGV0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuICAgICAgICBsZXQgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgICAgIGlmICggICBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCdcbiAgICAgICAgICAgIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgbGV0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSBNYXRoLm1pbih0aGlzLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgKyAncHgnO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlGaXR0ZWRUZXh0LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG59O1xuXG5VSUZpdHRlZFRleHQucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUZpdHRlZFRleHQ7XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlJbWFnZSBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmltYWdlQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZUF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZUF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlQXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nIHsuLi50aGlzLnByb3BzLmltYWdlQXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZUF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZUF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c0F0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJSW1hZ2Uuc3RhdHVzID0ge1xuICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgIEVSUk9SOiAnRVJST1InLFxufTtcblxuVUlJbWFnZS5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGltYWdlQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3RhdHVzQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUltYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgaW1hZ2VBdHRyczoge30sXG4gICAgc3RhdHVzQXR0cnM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlJbWFnZTtcbiIsIi8qKlxuICogQSBnZW5lcmljIGxpc3Qgdmlldywgc3VwcG9ydGluZyB1bnN0eWxlZCwgYnVsbGV0ZWQgYW5kIG51bWJlcmVkIG91dHB1dC5cbiAqIEBjbGFzcyBVSUxpc3RcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSUxpc3QgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzW2BpdGVtXyR7aW5kZXh9YF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0SXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5wcm9wcy5pdGVtcy5pbmRleE9mKGN1cnJlbnRJdGVtKSArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzSXRlbUluZGV4KGN1cnJlbnRJdGVtKSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMucHJvcHMuaXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSkgLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgaGFzVHlwZSA9ICEhdGhpcy5wcm9wcy50eXBlO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXM7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnN0YXRlLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgaWYgKGhhc1R5cGUpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c0l0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0SXRlbUluZGV4KGFjdGl2ZUl0ZW0pKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW1JbmRleCA9IGl0ZW1zLmluZGV4T2YoYWN0aXZlSXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnXG4gICAgICAgICAgICAgICAgfHwgKGtleSA9PT0gJ1RhYicgJiYgZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlSXRlbUluZGV4ICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c0l0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCdcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgKGtleSA9PT0gJ1RhYicgJiYgIWV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUl0ZW1JbmRleCAhPT0gaXRlbXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dEl0ZW1JbmRleChhY3RpdmVJdGVtKSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGxldCBub2RlVHlwZSA9IHRoaXMucHJvcHMudHlwZSA/ICdsaScgOiAnc3Bhbic7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZVR5cGUsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1saXN0LWl0ZW0nLFxuICAgICAgICAgICAgICAgIHJlZjogYGl0ZW1fJHtpbmRleH1gLFxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5jcmVhdGVIYXNoZWRLZXkoaXRlbSkgKyBpbmRleCwgLy8gaW4gY2FzZSAyIHBpZWNlcyBvZiBjb250ZW50IGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6ICgpID0+IHRoaXMuc3RhdGUuYWN0aXZlSXRlbSA9PT0gaXRlbSAmJiB0aGlzLnNldFN0YXRlKHthY3RpdmVJdGVtOiBudWxsfSksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSXRlbTogaXRlbX0pLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG5vZGVUeXBlID0gJ2Rpdic7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnYnVsbGV0JzpcbiAgICAgICAgICAgIG5vZGVUeXBlID0gJ3VsJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBub2RlVHlwZSA9ICdvbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KG5vZGVUeXBlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmF0dHJzLFxuICAgICAgICAgICAgcmVmOiAnbGlzdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAndWktbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLWxpc3QtYnVsbGV0ZWQnOiB0aGlzLnByb3BzLnR5cGUgPT09ICdidWxsZXQnLFxuICAgICAgICAgICAgICAgICd1aS1saXN0LW51bWJlcmVkJzogdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAndWktbGlzdC1wbGFpbic6IHRoaXMucHJvcHMudHlwZSAhPT0gJ2J1bGxldCcgJiYgdGhpcy5wcm9wcy50eXBlICE9PSAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWQsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc3R5bGU6IHsuLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLnJlbmRlckNvbnRlbnQoKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5VSUxpc3QucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpdGVtczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm5vZGUpLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2J1bGxldCcsICdudW1iZXInXSksXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5VSUxpc3QuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBpdGVtczogW10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSUxpc3Q7XG4iLCIvKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSU1vZGFsXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMubWFza0F0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXNrJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXNrQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hc2tBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2cgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzPXt0aGlzLnByb3BzLm1vZGFsQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLm1vZGFsQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1vZGFsQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlNb2RhbC5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtYXNrQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWxBdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBtYXNrQXR0cnM6IHt9LFxuICAgIG1vZGFsQXR0cnM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlNb2RhbDtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogdGhpcy5wcm9wcy5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHRoaXMucHJvcHMuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogdGhpcy5wcm9wcy5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYmFkLCBkb24ndCBkbyB0aGlzIGFueXdoZXJlIGVsc2UgOi14LlxuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzLmRpYWxvZyA9IHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMubm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kaWFsb2cpO1xuXG4gICAgICAgIHRoaXMuYWxpZ24gPSB0aGlzLmFsaWduLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5jb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGxldCBhbmNob3JIZWlnaHQgPSBhbmNob3Iub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcobm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGxldCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgbGV0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBsZXQgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLkVORDtcbiAgICAgICAgfSBlbHNlIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIGxldCB4ID0gdGhpcy5nZXROZXh0WFBvc2l0aW9uKGFuY2hvciwgdGhpcy5ub2RlKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmdldE5leHRZUG9zaXRpb24oYW5jaG9yLCB0aGlzLm5vZGUpO1xuXG4gICAgICAgIGxldCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh0aGlzLm5vZGUsIHgsIHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIE9iamVjdC5rZXlzKGFsaWdubWVudENvcnJlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLm5vZGUsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEaWFsb2coKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8VUlEaWFsb2cgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQb3BvdmVyLnBvc2l0aW9uID0ge1xuICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgRU5EOiAnRU5EJyxcbn07XG5cblVJUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGFuY2hvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIHByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgYW5jaG9yWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgYW5jaG9yWUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgYXV0b1JlcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxmWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgXSksXG4gICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIF0pLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdHRyczoge30sXG4gICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBvcG92ZXI7XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgVUlWaWV3IHtcbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5sYWJlbEF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvbiBhdHRycz17dGhpcy5wcm9wcy5jYW5jZWxBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsQXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NBdHRyc31cbiAgICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc0F0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc0F0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NBdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQcm9ncmVzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGNhbmNlbEF0dHJzOiB7fSxcbiAgICBsYWJlbEF0dHJzOiB7fSxcbiAgICBwcm9ncmVzc0F0dHJzOiB7fSxcbiAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxufTtcblxuVUlQcm9ncmVzcy5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2FuY2VsQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBsYWJlbEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKSxcbiAgICBwcm9ncmVzc0F0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVByb2dyZXNzO1xuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgKCkgPT4gdGhpcy5kaXNwYXRjaENhbGxiYWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sICgpID0+IHRoaXMuZGlzcGF0Y2hDYWxsYmFjaygpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCAoKSA9PiB0aGlzLmRpc3BhdGNoQ2FsbGJhY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMudG9nZ2xlQXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZUF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIHRvZ2dsZUF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgb25IaWRlOiBub29wLFxuICAgIHRvZ2dsZUF0dHJzOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlO1xuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlucHV0QXR0cnMuaWQgfHwgdGhpcy51dWlkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dEF0dHJzfVxuICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0QXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0QXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWwgey4uLnRoaXMucHJvcHMubGFiZWxBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxBdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlSYWRpby5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0QXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGxhYmVsQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuVUlSYWRpby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGlucHV0QXR0cnM6IHt9LFxuICAgIGxhYmVsQXR0cnM6IHt9LFxuICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlSYWRpbztcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBoYW5kbGVDbGljayhvcHRpb24pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZUJsdXIob3B0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSBvcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKG9wdGlvbikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4uZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/IDAgOiAtMX1cbiAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICBhcmlhLXJlcXVpcmVkPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5hdHRycy5pZH1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3suLi50aGlzLnByb3BzLnN0eWxlLCAuLi50aGlzLnByb3BzLmF0dHJzLnN0eWxlfX0+XG4gICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcyA9IHtcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbmdWYWx1ZSA9IHByb3BzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCEoJ3ZhbHVlJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtaXNzaW5nVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRW5jb3VudGVyZWQgbXVsdGlwbGUgb3B0aW9ucyB3aXRoIGBzZWxlY3RlZDogdHJ1ZWAuIFRoZXJlIGNhbiBiZSBvbmx5IG9uZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblVJU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIG9wdGlvbnM6IFtdLFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJU2VnbWVudGVkQ29udHJvbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5cbmNsYXNzIFVJVGFibGVDZWxsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnRlcmFjdCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMucHJvcHMucm93LCB0aGlzLnByb3BzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57dGhpcy5wcm9wcy5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZW50O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFkZFRpdGxlID0gdHlwZW9mIHRoaXMucHJvcHMuY29udGVudCA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsJ1xuICAgICAgICAgICAgICAgICB0aXRsZT17YWRkVGl0bGUgPyB0aGlzLnByb3BzLmNvbnRlbnQgOiBudWxsfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLndpZHRoID8gdGhpcy5wcm9wcy53aWR0aCArICdweCcgOiBudWxsfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlQ2VsbC5wcm9wVHlwZXMgPSB7XG4gICAgY29udGVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcm93OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZUNlbGw7XG4iLCIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFJvdyBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybSc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG4vKipcbiAqIEZPUiBGVVRVUkUgRVlFU1xuICpcbiAqIFRoZXJlIGFyZSBhIGxvdCBvZiBwbGFjZXMgd2hlcmUgc2hhcmVkIHRoaXMue25hbWV9IHZhcmlhYmxlcyBoYXZlIGJlZW5cbiAqIHVzZWQgd2hlcmUgdGhleSBkb24ndCBzZWVtIHRvIGJlIG5lZWRlZC4gVGhpcyBpcyBjb21wbGV0ZWx5IG9uIHB1cnBvc2UgdG9cbiAqIHJlZHVjZSBtZW1vcnkgcHJlc3N1cmUgZHVyaW5nIHNjcm9sbCBvcGVyYXRpb25zLiBJZiB5b3UgY2hhbmdlIHRoZW0gYmFjayB0b1xuICogbm9ybWFsIHZhcnMsIHlvdSdsbCBzZWUgdGhlIHNhd3Rvb3RoaW5nIGluIHlvdXIgSlMgcHJvZmlsZXIuLi4gc28gZG9uJ3QgZG8gaXQhXG4gKi9cblxuLyoqXG4gKiBPUkRFUiBPRiBPUEVSQVRJT05TXG4gKlxuICogMS4gaW5pdGlhbCByZW5kZXIgdy8gb25lIHJvdyBvZiBjZWxsc1xuICogMi4gY2FwdHVyZSB0YWJsZSAmIGNlbGwgc2l6aW5nIG1ldHJpY3NcbiAqIDMuIGFwcGx5IHdpZHRocyB0byBjb2x1bW4gZGVmaW5pdGlvbnNcbiAqIDQuIHJlbmRlciBwYXNzIDIgdy8gY29sdW1uIGhlYWRzIGFuZCB0aGUgcmVzdCBvZiB0aGUgY2VsbHNcbiAqL1xuXG4vKiogQGlnbm9yZSAqL1xuY29uc3QgZmluZFdoZXJlID0gZnVuY3Rpb24gZmluZFdoZXJlKGFycmF5LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBsZXQgaW5kZXggPSBhcnJheS5sZW5ndGggLSAxO1xuXG4gICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5W2luZGV4XVtwcm9wZXJ0eV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXggLT0gMTtcbiAgICB9XG59OyAvLyBvcHRpbWl6ZWQgc3BlY2lmaWNhbGx5IHRvIG9ubHkgbG9vayBmb3IgYSBzaW5nbGUga2V5OnZhbHVlIG1hdGNoXG5cbmNsYXNzIFVJVGFibGUgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVSb3dDbGljayA9IHRoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ01vdmUgPSB0aGlzLmhhbmRsZURyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQgPSB0aGlzLmhhbmRsZU1vdmVJbnRlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhbmRsZVhTY3JvbGxlckRyYWdTdGFydCA9IHRoaXMuaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0ID0gdGhpcy5oYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2x1bW5EcmFnU3RhcnQgPSB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFyaWFTcG9rZW5PdXRwdXQ6ICcnLFxuICAgICAgICAgICAgY2hva2VSZW5kZXI6IHRydWUsXG4gICAgICAgICAgICBjdXJyZW50QWN0aXZlUm93SW5kZXg6IC0xLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmdldFJvdygwKSxcbiAgICAgICAgICAgICAgICBzZXRJbmRleDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICByb3dzT3JkZXJlZEJ5WTogWzBdLFxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLnNsaWNlKDApLFxuICAgICAgICAgICAgeFNjcm9sbGVyTnViU2l6ZTogbnVsbCxcbiAgICAgICAgICAgIHlTY3JvbGxlck51YlNpemU6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMueEN1cnJlbnQgPSB0aGlzLnlDdXJyZW50ID0gMDtcbiAgICAgICAgdGhpcy54TmV4dCA9IHRoaXMueU5leHQgPSBudWxsO1xuICAgICAgICB0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiA9IDA7XG5cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHZhcmlhYmxlcyBpbiB2YXJpb3VzIGNhbGN1bGF0aW9uc1xuICAgICAgICB0aGlzLmNhY2hlX2l0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlX29yZGVyZWRZQXJyYXlUYXJnZXRJbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfc2hpZnREZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXggPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2FwdHVyZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIC8qIHNvIHdlIGNhbiByZXVzZSBzdGF0ZS5yb3dzIHRvIGF2b2lkIGV4dHJhIGFycmF5IGFsbG9jYXRpb25zIGluIHRoZSBzY3JvbGwgaGFuZGxlcnMgLSBpbiB0aGlzIGNhc2UgYSBmZXcgbW9yZSBDUFUgY3ljbGVzIGFyZSBmYXIgY2hlYXBlciB0aGFuIHJ1bm5pbmcgdXAgYWdhaW5zdCB0aGUgR0MgKi9cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLmhlYWQgJiYgdHlwZW9mIHRoaXMubWluaW11bUNvbHVtbldpZHRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yKCcudWktdGFibGUtaGVhZGVyLWNlbGwnKTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIE5hTiBpZiBub3QgYSBwaXhlbCB2YWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMubWF4aW11bUNvbHVtbldpZHRoID0gcGFyc2VJbnQobm9kZVN0eWxlLm1heFdpZHRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5taW5pbXVtQ29sdW1uV2lkdGggPSBwYXJzZUludChub2RlU3R5bGUubWluV2lkdGgsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUoKSB7XG4gICAgICAgIGxldCBweCA9IHRoaXMuY29udGFpbmVyV2lkdGggLSBNYXRoLmFicyh0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24pO1xuXG4gICAgICAgIHJldHVybiBweCA8IDEyID8gMTIgOiBweDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplKCkge1xuICAgICAgICBsZXQgcHggPSB0aGlzLnJvd0VuZEluZGV4IC8gdGhpcy5wcm9wcy50b3RhbFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHB4IDwgMTIgPyAxMiA6IHB4O1xuICAgIH1cblxuICAgIGNhcHR1cmVEaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgZmlyc3RSb3cgPSB0aGlzLnJlZnMuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1aS10YWJsZS1yb3cnKVswXTtcbiAgICAgICAgbGV0IGZpcnN0Um93Q2VsbHMgPSBmaXJzdFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1aS10YWJsZS1jZWxsJyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgICAgICB0aGlzLmNlbGxIZWlnaHQgPSBmaXJzdFJvd0NlbGxzWzBdLmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHRoaXMublJvd3NUb1JlbmRlciA9IE1hdGguY2VpbCgodGhpcy5jb250YWluZXJIZWlnaHQgKiAxLjMpIC8gdGhpcy5jZWxsSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggPSAwO1xuICAgICAgICB0aGlzLnJvd0VuZEluZGV4ID0gdGhpcy5uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgIGxldCB0YWJsZVdpZHRoID0gZmlyc3RSb3cuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uID0gdGhpcy5jb250YWluZXJXaWR0aCA+IHRhYmxlV2lkdGggPyAwIDogdGhpcy5jb250YWluZXJXaWR0aCAtIHRhYmxlV2lkdGg7XG5cbiAgICAgICAgdGhpcy55VXBwZXJCb3VuZCA9IDA7XG4gICAgICAgIHRoaXMueUxvd2VyQm91bmQgPSB0aGlzLmNvbnRhaW5lckhlaWdodCAtICh0aGlzLm5Sb3dzVG9SZW5kZXIgKiB0aGlzLmNlbGxIZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGFkanVzdGVkQ29sdW1ucyA9IHRoaXMuc3RhdGUuY29sdW1ucy5tYXAoZnVuY3Rpb24gZGlzY292ZXJXaWR0aChjb2x1bW4sIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5jZWlsKGZpcnN0Um93Q2VsbHNbaW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZFJvd3MgPSBbXTtcbiAgICAgICAgY29uc3Qgcm93c09yZGVyZWRCeVkgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMublJvd3NUb1JlbmRlcjsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRSb3dzLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZ2V0Um93KGkpLFxuICAgICAgICAgICAgICAgIHNldEluZGV4OiBpLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbEhlaWdodCAqIGksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm93c09yZGVyZWRCeVkucHVzaChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2hva2VSZW5kZXI6IGZhbHNlLFxuICAgICAgICAgICAgY29sdW1uczogYWRqdXN0ZWRDb2x1bW5zLFxuICAgICAgICAgICAgcm93czogZ2VuZXJhdGVkUm93cyxcbiAgICAgICAgICAgIHJvd3NPcmRlcmVkQnlZOiByb3dzT3JkZXJlZEJ5WSxcbiAgICAgICAgICAgIHhTY3JvbGxlck51YlNpemU6IHRoaXMuY2FsY3VsYXRlWFNjcm9sbGVyTnViU2l6ZSgpLFxuICAgICAgICAgICAgeVNjcm9sbGVyTnViU2l6ZTogdGhpcy5jYWxjdWxhdGVZU2Nyb2xsZXJOdWJTaXplKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVNjcm9sbERvd24oKSB7XG4gICAgICAgIGlmICggICB0aGlzLnJvd0VuZEluZGV4ID09PSB0aGlzLnByb3BzLnRvdGFsUm93c1xuICAgICAgICAgICAgfHwgdGhpcy55TmV4dCA+PSB0aGlzLnlMb3dlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgZG93biwgc28gd2Ugd2FudCB0byBtb3ZlIHRoZSBsb3dlc3QgWSB2YWx1ZSB0byB0aGUgeUxvd2VyQm91bmQgYW5kIHJlcXVlc3QgdGhlIG5leHQgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55TmV4dCAtIHRoaXMueUxvd2VyQm91bmQpIC8gdGhpcy5jZWxsSGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ICsgdGhpcy5yb3dFbmRJbmRleCA+IHRoaXMucHJvcHMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAvKiBtb3JlIHJvd3MgdGhhbiB0aGVyZSBpcyBkYXRhIGF2YWlsYWJsZSwgdHJ1bmNhdGUgKi9cbiAgICAgICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gdGhpcy5wcm9wcy50b3RhbFJvd3MgLSB0aGlzLnJvd0VuZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gdGhpcy5uUm93c1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLyogYSB2ZXJ5IGxhcmdlIHNjcm9sbCBkZWx0YSwgY2FsY3VsYXRlIHdoZXJlIHRoZSBib3VuZGFyaWVzIHNob3VsZCBiZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfc2hpZnREZWx0YSA9IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0IC0gdGhpcy5uUm93c1RvUmVuZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy55VXBwZXJCb3VuZCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGEgKiB0aGlzLmNlbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93RW5kSW5kZXggKz0gdGhpcy5jYWNoZV9zaGlmdERlbHRhO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRoZSBsb3dlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSBib3R0b20gb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLmNhY2hlX2l0ZXJhdG9yID0gMDsgdGhpcy5jYWNoZV9pdGVyYXRvciA8IHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0OyB0aGlzLmNhY2hlX2l0ZXJhdG9yKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV90YXJnZXRJbmRleCA9IHRoaXMucm93RW5kSW5kZXggKyB0aGlzLmNhY2hlX2l0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlciA9IHRoaXMuc3RhdGUucm93c1t0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZW3RoaXMuY2FjaGVfb3JkZXJlZFlBcnJheVRhcmdldEluZGV4XV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci5kYXRhID0gdGhpcy5wcm9wcy5nZXRSb3codGhpcy5jYWNoZV90YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci5zZXRJbmRleCA9IHRoaXMuY2FjaGVfdGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfcm93UG9pbnRlci55ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnB1c2godGhpcy5zdGF0ZS5yb3dzT3JkZXJlZEJ5WS5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggKz0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgLT0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlU2Nyb2xsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvd1N0YXJ0SW5kZXggPT09IDAgfHwgdGhpcy55TmV4dCA8PSB0aGlzLnlVcHBlckJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgaGlnaGVzdCBZIHZhbHVlIHRvIHRoZSB5VXBwZXJCb3VuZCBhbmQgcmVxdWVzdCB0aGUgcHJldmlvdXMgcm93LiBTY2FsZSBhcHByb3ByaWF0ZWx5IGlmIGEgYmlnIGRlbHRhIGFuZCBtaWdyYXRlIGFzIG1hbnkgcm93cyBhcyBhcmUgbmVjZXNzYXJ5LiAqL1xuXG4gICAgICAgIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55TmV4dCAtIHRoaXMueVVwcGVyQm91bmQpIC8gdGhpcy5jZWxsSGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMucm93U3RhcnRJbmRleCAtIHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPSB0aGlzLnJvd1N0YXJ0SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgPiB0aGlzLm5Sb3dzVG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAvKiBhIHZlcnkgbGFyZ2Ugc2Nyb2xsIGRlbHRhLCBjYWxjdWxhdGUgd2hlcmUgdGhlIGJvdW5kYXJpZXMgc2hvdWxkIGJlICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9zaGlmdERlbHRhID0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgLSB0aGlzLm5Sb3dzVG9SZW5kZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnlVcHBlckJvdW5kICs9IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnlMb3dlckJvdW5kICs9IHRoaXMuY2FjaGVfc2hpZnREZWx0YSAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93U3RhcnRJbmRleCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCAtPSB0aGlzLmNhY2hlX3NoaWZ0RGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCA9IHRoaXMublJvd3NUb1JlbmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVfblJvd3NUb1NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXggPSB0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHRoaXMuY2FjaGVfaXRlcmF0b3IgPSAwOyB0aGlzLmNhY2hlX2l0ZXJhdG9yIDwgdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7IHRoaXMuY2FjaGVfaXRlcmF0b3IrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlX3RhcmdldEluZGV4ID0gdGhpcy5yb3dTdGFydEluZGV4IC0gdGhpcy5jYWNoZV9pdGVyYXRvciAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyID0gdGhpcy5zdGF0ZS5yb3dzW3RoaXMuc3RhdGUucm93c09yZGVyZWRCeVlbdGhpcy5jYWNoZV9vcmRlcmVkWUFycmF5VGFyZ2V0SW5kZXhdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLmRhdGEgPSB0aGlzLnByb3BzLmdldFJvdyh0aGlzLmNhY2hlX3RhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnNldEluZGV4ID0gdGhpcy5jYWNoZV90YXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZV9yb3dQb2ludGVyLnkgPSB0aGlzLmNhY2hlX3RhcmdldEluZGV4ICogdGhpcy5jZWxsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucm93c09yZGVyZWRCeVkudW5zaGlmdCh0aGlzLnN0YXRlLnJvd3NPcmRlcmVkQnlZLnBvcCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd1N0YXJ0SW5kZXggLT0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dFbmRJbmRleCAtPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdDtcblxuICAgICAgICAgICAgICAgIHRoaXMueVVwcGVyQm91bmQgKz0gdGhpcy5jYWNoZV9uUm93c1RvU2hpZnQgKiB0aGlzLmNlbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55TG93ZXJCb3VuZCArPSB0aGlzLmNhY2hlX25Sb3dzVG9TaGlmdCAqIHRoaXMuY2VsbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jvd3M6IHRoaXMuc3RhdGUucm93c30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTW92ZUludGVudChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgoZXZlbnQuZGVsdGFYID09PSAwICYmIGV2ZW50LmRlbHRhWSA9PT0gMClcbiAgICAgICAgICAgIHx8IHRoaXMubWFudWFsbHlTY3JvbGxpbmdZICYmIGV2ZW50LmRlbHRhWSA9PT0gMFxuICAgICAgICAgICAgfHwgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggJiYgZXZlbnQuZGVsdGFYID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiBsb2NrIHRoZSB0cmFuc2xhdGlvbiBheGlzIGlmIHRoZSB1c2VyIGlzIG1hbmlwdWxhdGluZyB0aGUgc3ludGhldGljIHNjcm9sbGJhcnMgKi9cbiAgICAgICAgdGhpcy54TmV4dCA9IHRoaXMubWFudWFsbHlTY3JvbGxpbmdZID8gMCA6IHRoaXMueEN1cnJlbnQgLSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgaWYgKHRoaXMueE5leHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnhOZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhOZXh0IDwgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnhOZXh0ID0gdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy55TmV4dCA9IHRoaXMubWFudWFsbHlTY3JvbGxpbmdYID8gMCA6IHRoaXMueUN1cnJlbnQgLSBldmVudC5kZWx0YVk7XG5cbiAgICAgICAgaWYgKHRoaXMueU5leHQgPCB0aGlzLnlDdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbERvd24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnlOZXh0ID4gdGhpcy55Q3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JvbGxVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueU5leHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnlOZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnlOZXh0IDwgdGhpcy55TG93ZXJCb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55TmV4dCA9IHRoaXMueUxvd2VyQm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54TmV4dCAhPT0gdGhpcy54Q3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLmhlYWQuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnhOZXh0fXB4LCAwcHgsIDBweClgO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogTW92ZSB3cmFwcGVyICovXG4gICAgICAgIHRoaXMucmVmcy5ib2R5LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy54TmV4dH1weCwgJHt0aGlzLnlOZXh0fXB4LCAwcHgpYDtcblxuICAgICAgICAvKiBtb3ZlIHNjcm9sbGJhciBudWJzICovXG4gICAgICAgIHRoaXMucmVmcy54U2Nyb2xsZXJOdWIuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoJHtNYXRoLmFicyh0aGlzLnhOZXh0KX1weCwgMHB4LCAwcHgpYDtcblxuICAgICAgICB0aGlzLnlTY3JvbGxOdWJQb3NpdGlvbiA9ICh0aGlzLnJvd1N0YXJ0SW5kZXggLyB0aGlzLnByb3BzLnRvdGFsUm93cykgKiB0aGlzLmNvbnRhaW5lckhlaWdodDtcblxuICAgICAgICBpZiAodGhpcy55U2Nyb2xsTnViUG9zaXRpb24gKyB0aGlzLnN0YXRlLnlTY3JvbGxlck51YlNpemUgPiB0aGlzLmNvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy55U2Nyb2xsTnViUG9zaXRpb24gPSB0aGlzLmNvbnRhaW5lckhlaWdodCAtIHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcy55U2Nyb2xsZXJOdWIuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlM2QoMHB4LCAke3RoaXMueVNjcm9sbE51YlBvc2l0aW9ufXB4LCAwcHgpYDtcblxuICAgICAgICB0aGlzLnhDdXJyZW50ID0gdGhpcy54TmV4dDtcbiAgICAgICAgdGhpcy55Q3VycmVudCA9IHRoaXMueU5leHQ7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uUmVzaXplKGRlbHRhKSB7XG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkanVzdGVkRGVsdGEgPSBkZWx0YTtcbiAgICAgICAgbGV0IG5ld1RhYmxlV2lkdGggPSAwO1xuXG4gICAgICAgIGxldCBjb3B5ID0gdGhpcy5zdGF0ZS5jb2x1bW5zLm1hcChkZWZpbml0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1hcHBpbmcgIT09IHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbi5tYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFibGVXaWR0aCArPSBkZWZpbml0aW9uLndpZHRoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEJlZm9yZSBhbnkgbWVhc3VyZW1lbnRzIGFyZSBhcHBsaWVkLCBmaXJzdCB3ZSBuZWVkIHRvIGNvbXBhcmUgdGhlIGRlbHRhIHRvIHRoZSBrbm93biBjZWxsIHdpZHRoIHRocmVzaG9sZHMgYW5kIHNjYWxlIGFwcHJvcHJpYXRlbHkuICovXG5cbiAgICAgICAgICAgIGlmICggICBhZGp1c3RlZERlbHRhIDwgMFxuICAgICAgICAgICAgICAgICYmICFpc05hTih0aGlzLm1pbmltdW1Db2x1bW5XaWR0aClcbiAgICAgICAgICAgICAgICAmJiBkZWZpbml0aW9uLndpZHRoICsgYWRqdXN0ZWREZWx0YSA8IHRoaXMubWluaW11bUNvbHVtbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLm1pbmltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih0aGlzLm1heGltdW1Db2x1bW5XaWR0aClcbiAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEgPiB0aGlzLm1heGltdW1Db2x1bW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkRGVsdGEgPSB0aGlzLm1heGltdW1Db2x1bW5XaWR0aCAtIGRlZmluaXRpb24ud2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1RhYmxlV2lkdGggKz0gZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGE7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICB3aWR0aDogZGVmaW5pdGlvbi53aWR0aCArIGFkanVzdGVkRGVsdGEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobmV3VGFibGVXaWR0aCA8PSB0aGlzLmNvbnRhaW5lcldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnhNYXhpbXVtVHJhbnNsYXRpb24gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54TWF4aW11bVRyYW5zbGF0aW9uIC09IGFkanVzdGVkRGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvcHksXG4gICAgICAgICAgICB4U2Nyb2xsZXJOdWJTaXplOiB0aGlzLmNhbGN1bGF0ZVhTY3JvbGxlck51YlNpemUoKSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLyogSWYgYSBjb2x1bW4gc2hyaW5rcywgdGhlIHdyYXBwZXIgWCB0cmFuc2xhdGlvbiBuZWVkcyB0byBiZSBhZGp1c3RlZCBhY2NvcmRpbmdseSBvclxuICAgICAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhbiB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgICAgIGlmIChhZGp1c3RlZERlbHRhIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogYWRqdXN0ZWREZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiAwLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gdGhpcy5zdGF0ZS5jb2x1bW5zW2V2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uLWluZGV4JyldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFhTY3JvbGwgPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlWVNjcm9sbGVyRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RDb2x1bW5YKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdENvbHVtblggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYW51YWxseVNjcm9sbGluZ1gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YVg6IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RYU2Nyb2xsLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiBub29wLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WFNjcm9sbCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiAoKGV2ZW50LmNsaWVudFkgLSB0aGlzLmxhc3RZU2Nyb2xsKSAvIHRoaXMuY29udGFpbmVySGVpZ2h0KSAqIHRoaXMucHJvcHMudG90YWxSb3dzICogdGhpcy5jZWxsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFlTY3JvbGwgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFudWFsbHlSZXNpemluZ0NvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVJlc2l6aW5nQ29sdW1uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWCkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1ggPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hbnVhbGx5U2Nyb2xsaW5nWSkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxseVNjcm9sbGluZ1kgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJvd0NsaWNrKGV2ZW50LCBjbGlja2VkUm93RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJvd0ludGVyYWN0KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QoZXZlbnQsIGNsaWNrZWRSb3dEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRBY3RpdmVSb3dJbmRleDogZmluZFdoZXJlKHRoaXMuc3RhdGUucm93cywgJ2RhdGEnLCBjbGlja2VkUm93RGF0YSkuc2V0SW5kZXh9KTtcbiAgICB9XG5cbiAgICByZW5kZXJSb3dzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5yb3dzLm1hcCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Um93IGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICBhY3RpdmU9e3Jvdy5zZXRJbmRleCA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnN0YXRlLmNvbHVtbnN9XG4gICAgICAgICAgICAgICAgICAgICBkYXRhPXtyb3cuZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgIGV2ZW49eyhyb3cuc2V0SW5kZXgpICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgIHk9e3Jvdy55fVxuICAgICAgICAgICAgICAgICAgICAgb25JbnRlcmFjdD17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICAgICAgICAgICAgIG9uQ2VsbEludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5J1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclJvd3MoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhlYWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jaG9rZVJlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZCcgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtcm93IHVpLXRhYmxlLWhlYWRlci1yb3cnPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuY29sdW1ucy5tYXAoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsIHVpLXRhYmxlLWhlYWRlci1jZWxsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6IHR5cGVvZiBjb2x1bW4ud2lkdGggPT09ICdudW1iZXInID8gY29sdW1uLndpZHRoIDogbnVsbH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLWNlbGwtaW5uZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57Y29sdW1uLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtY29sdW1uLWluZGV4PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlQ29sdW1uRHJhZ1N0YXJ0fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclNjcm9sbGJhcnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlWFNjcm9sbGVyRHJhZ1N0YXJ0fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3hTY3JvbGxlck51YidcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsZXItbnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6IHRoaXMuc3RhdGUueFNjcm9sbGVyTnViU2l6ZX19IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVZU2Nyb2xsZXJEcmFnU3RhcnR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neVNjcm9sbGVyTnViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGxlci1udWInXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3toZWlnaHQ6IHRoaXMuc3RhdGUueVNjcm9sbGVyTnViU2l6ZX19IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93ID0gZmluZFdoZXJlKHRoaXMuc3RhdGUucm93cywgJ3NldEluZGV4JywgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYXJpYVNwb2tlbk91dHB1dDogdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93LmRhdGFbdGhpcy5zdGF0ZS5jb2x1bW5zWzBdLm1hcHBpbmddLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVSb3dJbmRleDogdGhpcy5jYWNoZV9uZXh0QWN0aXZlUm93LnNldEluZGV4LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAoZGVsdGEgPT09IC0xICYmIHRoaXMuY2FjaGVfbmV4dEFjdGl2ZVJvdy55ICogLTEgPiB0aGlzLnlDdXJyZW50KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cueSAqIC0xIC0gdGhpcy5jZWxsSGVpZ2h0IDwgdGhpcy55Q3VycmVudCAtIHRoaXMuY29udGFpbmVySGVpZ2h0ICsgdGhpcy5jZWxsSGVpZ2h0KSAvLyAxIHVuaXQgb2YgY2VsbEhlaWdodCBpcyByZW1vdmVkIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBoZWFkZXIgcm93XG4gICAgICAgICAgICApIHsgLy8gRGVzdGluYXRpb24gcm93IGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBzbyBzaW11bGF0ZSBhIHNjcm9sbFxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFZOiB0aGlzLmNlbGxIZWlnaHQgKiBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoICAgKGRlbHRhID09PSAtMSAmJiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleCA+IDApXG4gICAgICAgICAgICAgICAgICAgfHwgKGRlbHRhID09PSAxICYmIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4IDwgdGhpcy5wcm9wcy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFRoZSBkZXN0aW5hdGlvbiByb3cgaXNuJ3QgcmVuZGVyZWQsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlIGVub3VnaCByb3dzIGZvciBpdCB0byBmZWFzaWJseSBiZSBzaG93blxuICAgICAgICAgICAgICAgIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgICAgICAgICAgZGVsdGFZOiAoICAgKCAgICB0aGlzLnJvd1N0YXJ0SW5kZXggPiB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggLSB0aGlzLnJvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCAgICB0aGlzLnJvd1N0YXJ0SW5kZXggPCB0aGlzLnN0YXRlLmN1cnJlbnRBY3RpdmVSb3dJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aXZlUm93SW5kZXggLSB0aGlzLnJvd1N0YXJ0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKyBkZWx0YSkgKiB0aGlzLmNlbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IG5vb3AsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIHByb2Nlc3MgYWdhaW4sIG5vdyB0aGF0IHRoZSByb3cgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuY2hhbmdlQWN0aXZlUm93KGRlbHRhKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhY2hlX25leHRBY3RpdmVSb3cgPSBudWxsO1xuICAgIH1cblxuICAgIGFyaWFFeHBvc2VGdWxsUm93RGF0YSgpIHtcbiAgICAgICAgbGV0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnN0YXRlLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuc3RhdGUuY3VycmVudEFjdGl2ZVJvd0luZGV4KTtcblxuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcmlhU3Bva2VuT3V0cHV0OiB0aGlzLnN0YXRlLmNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb2x1bW4udGl0bGV9OiAke3Jvdy5kYXRhW2NvbHVtbi5tYXBwaW5nXX1gO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIHRoaXMuYXJpYUV4cG9zZUZ1bGxSb3dEYXRhKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVLZXlEb3duKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUtleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmFyaWFTcG9rZW5PdXRwdXR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGFibGUtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlRHJhZ01vdmV9XG4gICAgICAgICAgICAgICAgIG9uTW91c2VVcD17dGhpcy5oYW5kbGVEcmFnRW5kfVxuICAgICAgICAgICAgICAgICBvbldoZWVsPXt0aGlzLmhhbmRsZU1vdmVJbnRlbnR9XG4gICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJ1xuICAgICAgICAgICAgICAgICBzdHlsZT17ey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSd0YWJsZSdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdGFibGUnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTY3JvbGxiYXJzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVGFibGUucHJvcFR5cGVzID0ge1xuICAgIGF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlS2V5RG93bjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93SW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHRvdGFsUm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICAgIGF0dHJzOiB7fSxcbiAgICBjb2x1bW5zOiBbXSxcbiAgICBnZXRSb3c6IG5vb3AsXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgQ2VsbCBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm0nO1xuXG5jbGFzcyBVSVRhYmxlUm93IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZGF0YSAhPT0gdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHdhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xuICAgICAgICBsZXQgY2xhc3NlcyA9ICd1aS10YWJsZS1yb3cnO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV2ZW4pIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gJyB1aS10YWJsZS1yb3ctZXZlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgdWktdGFibGUtcm93LW9kZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1sb2FkaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSAnIHVpLXRhYmxlLXJvdy1hY3RpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2VsbHMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSA/IHt9IDogdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtkYXRhW2RlZmluaXRpb24ubWFwcGluZ119XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtkZWZpbml0aW9uLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkludGVyYWN0PXt0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkludGVyYWN0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7W3RyYW5zZm9ybVByb3BdOiB0aGlzLnByb3BzLnkgPyBgdHJhbnNsYXRlM2QoMHB4LCAke3RoaXMucHJvcHMueX1weCwgMHB4KWAgOiBudWxsfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2VsbHMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUYWJsZVJvdy5wcm9wVHlwZXMgPSB7XG4gICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIGV2ZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DZWxsSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRhYmxlUm93O1xuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGZpcnN0ID0gZnVuY3Rpb24gZ2V0Rmlyc3RBcnJheUl0ZW0oYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbMF07XG59O1xuXG5jb25zdCBsYXN0ID0gZnVuY3Rpb24gZ2V0TGFzdEFycmF5SXRlbShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbmNvbnN0IHdpdGhvdXQgPSBmdW5jdGlvbiByZWplY3RTb21lQXJyYXlJdGVtcyhiYXNlQXJyYXksIC4uLnRvQmVFeGNsdWRlZCkge1xuICAgIHJldHVybiBiYXNlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIHJlamVjdFNvbWUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdG9CZUV4Y2x1ZGVkLmluZGV4T2YoaXRlbSkgPT09IC0xO1xuICAgIH0pO1xufTtcblxuY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXM6IFtdLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBsZXQgcHJldmlvdXNJbmRpY2VzID0gcHJldlN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXM7XG4gICAgICAgIGxldCBwcmV2aW91c1NlbGVjdGVkSW5kaWNlcyA9IHByZXZTdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBjdXJyZW50SW5kaWNlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcztcbiAgICAgICAgbGV0IGN1cnJlbnRTZWxlY3RlZEluZGljZXMgPSB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDtcblxuICAgICAgICBpZiAocHJldmlvdXNJbmRpY2VzICE9PSBjdXJyZW50SW5kaWNlcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblRva2VuQ2hhbmdlKFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZEluZGljZXMubWFwKGluZGV4ID0+IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2aW91c1NlbGVjdGVkSW5kaWNlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kaWNlcykgeyAvLyBtb3ZlIGZvY3VzXG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkSW5kaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGljZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGljZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kaWNlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGljZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRpY2VzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGljZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVFbnRpdHlTZWxlY3RlZChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLmluZGV4T2YoaW5kZXgpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dG9rZW5pemVkRW50aXR5SW5kaWNlczogdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLmNvbmNhdChpbmRleCl9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkO1xuICAgICAgICBsZXQgaW5kaWNlcyA9IHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGljZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtsYXN0KGluZGljZXMpXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgbGV0IHByZXZpb3VzVG9rZW4gPSBpbmRpY2VzW2luZGljZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ7XG4gICAgICAgIGxldCBpbmRpY2VzID0gdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRpY2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXh0VG9rZW4gPSBpbmRpY2VzW2luZGljZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiBhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXM6IHdpdGhvdXQodGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzLCAuLi50aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZDogW10sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzOiB3aXRob3V0KHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcywgaW5kZXgpLFxuICAgICAgICAgICAgdG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkOiB3aXRob3V0KHRoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlc1NlbGVjdGVkLCBpbmRleCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1Rva2VuQ2xvc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RTaW5nbGVUb2tlbihpbmRleCkge1xuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgPT09IC0xXG4gICAgICAgICAgICB8fCB0aGlzLnN0YXRlLnRva2VuaXplZEVudGl0eUluZGljZXNTZWxlY3RlZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQ6IFtpbmRleF0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFNpbmdsZVRva2VuKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUudG9rZW5pemVkRW50aXR5SW5kaWNlcy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS50b2tlbml6ZWRFbnRpdHlJbmRpY2VzU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RTaW5nbGVUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmF0dHJzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXQgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuaGFuZGxlRW50aXR5U2VsZWN0ZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRva2VuaXplZElucHV0LnByb3BUeXBlcyA9IHtcbiAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICBhdHRyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0QXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25Ub2tlbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuVUlUb2tlbml6ZWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBpbnB1dEF0dHJzOiB7fSxcbiAgICBvblRva2VuQ2hhbmdlOiBub29wLFxuICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUb2tlbml6ZWRJbnB1dDtcbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFVJVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuYXR0cnMuaWR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHN0eWxlPXt7Li4udGhpcy5wcm9wcy5zdHlsZSwgLi4udGhpcy5wcm9wcy5hdHRycy5zdHlsZX19XG4gICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRvb2x0aXAucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICBBRlRFUjogJ0FGVEVSJyxcbn07XG5cblVJVG9vbHRpcC5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblVJVG9vbHRpcC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVRvb2x0aXA7XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgaWQ6IHRoaXMudXVpZCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXModGhpcy5zdGF0ZS51c2VySW5wdXQsIG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKSB7XG4gICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS5jb250ZW50IDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGxldCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICAgICAgbGV0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlDb250ZW50KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5oaW50QXR0cnN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludEF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50QXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMScgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgKCkgPT4gdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpKTtcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcoZW50aXR5Q29udGVudCwgdXNlcklucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1hcmtGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXJrRnVuYyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlZWtWYWx1ZSA9IHVzZXJJbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGxldCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubWF0Y2hXcmFwcGVyQXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLm1hdGNoV3JhcHBlckF0dHJzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4uZW50aXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VudGl0eS5jbGFzc05hbWVdOiAhIWVudGl0eS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5jcmVhdGVIYXNoZWRLZXkoZW50aXR5LmNvbnRlbnQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKGVudGl0eS5jb250ZW50LCB0aGlzLnN0YXRlLnVzZXJJbnB1dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzO1xuICAgICAgICBsZXQgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzW25leHRJbmRleF0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnMuaW5wdXQ7XG4gICAgfVxuXG4gICAgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXROb2RlKCkudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcklucHV0OiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSBub2RlLnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlDb250ZW50KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS51c2VySW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGEgc2ltcGxlIFwic3RhcnRzLXdpdGhcIiBzZWFyY2hcbiAgICBnZXRNYXRjaEluZGljZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcykge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tYXRjaEZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1hdGNoRnVuYyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWVrVmFsdWUgPSBjdXJyZW50VmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkuY29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbXB1dGVNYXRjaGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMgPSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgIGxldCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGljZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VySW5wdXQ6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRpY2VzOiBtYXRjaGVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChldmVudCkge1xuICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuYXR0cnN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmF0dHJzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5hdHRycy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmF0dHJzLmlkfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICBzdHlsZT17ey4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLnRoaXMucHJvcHMuYXR0cnMuc3R5bGV9fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRBdHRyc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0QXR0cnMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0QXR0cnMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0QXR0cnMuZGVmYXVsdFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWUgfHwgdGhpcy5wcm9wcy5pbnB1dEF0dHJzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCB0aGlzLnByb3BzLmlucHV0QXR0cnMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgYXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjb250ZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICksXG4gICAgaGludDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaGludEF0dHJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlucHV0QXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbWFya0Z1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG1hdGNoRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWF0Y2hXcmFwcGVyQXR0cnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgYXR0cnM6IHt9LFxuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBoaW50QXR0cnM6IHt9LFxuICAgIGlucHV0QXR0cnM6IHt9LFxuICAgIG1hdGNoV3JhcHBlckF0dHJzOiB7fSxcbiAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUeXBlYWhlYWRJbnB1dDtcbiIsIi8qKlxuICogQSBkdW1teSBmdW5jdGlvbiB3aXRoIG5vIHNpZGUgZWZmZWN0cy4gQ29tbW9ubHkgdXNlZCB3aGVuIG1vY2tpbmcgaW50ZXJmYWNlcy5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvbm9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge31cbiIsImNvbnN0IGdldEV4YWN0VHlwZSA9IGZ1bmN0aW9uIHJldHJpZXZlRGVlcFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xufTtcblxuY29uc3QgY29tcGFyZU9iamVjdEtleXMgPSBmdW5jdGlvbiBjb21wYXJlT2JqZWN0S2V5cyhrZXksIGJhc2VBcnJheSkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpc1trZXldICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlQXJyYXlba2V5XSA9PT0gdGhpc1trZXldO1xufTsgLy8gYHRoaXNgIGlzIHNldCB0byB0aGUgY29tcGFyaXNvbiBhcnJheVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1NoYWxsb3dFcXVhbGl0eShhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IGdldEV4YWN0VHlwZShhKTtcblxuICAgIGlmICggICAgdHlwZSAhPT0gZ2V0RXhhY3RUeXBlKGIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBtaXNtYXRjaGVzIGNhbid0IGJlIGNvbXBhcmVkXG4gICAgICAgIHx8ICh0eXBlICE9PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlICE9PSAnW29iamVjdCBBcnJheV0nKSkgeyAvLyBmdW5jdGlvbnMsIFByb21pc2VzLCBldGMgY2Fubm90IGJlIGRpcmVjdGx5IGNvbXBhcmVkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLmV2ZXJ5KGNvbXBhcmVPYmplY3RLZXlzLCBiKSAmJiBPYmplY3Qua2V5cyhiKS5ldmVyeShjb21wYXJlT2JqZWN0S2V5cywgYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICAgIGEuZXZlcnkoZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gYi5pbmRleE9mKGl0ZW0pICE9PSAtMTsgfSlcbiAgICAgICAgICAgJiYgYi5ldmVyeShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBhLmluZGV4T2YoaXRlbSkgIT09IC0xOyB9KTtcbn07XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy90cmFuc2Zvcm1cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGxldCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL1VJVXRpbHMvc2hhbGxvd0VxdWFsJztcblxuLyoqXG4gKiBBbiBhdWdtZW50ZWQgdmVyc2lvbiBvZiBgUmVhY3QuQ29tcG9uZW50YCB3aXRoIHNvbWUgaGVscGZ1bCBhYnN0cmFjdGlvbnMgYWRkZWQgdG8gc21vb3RoXG4gKiB0aGUgY29tcG9uZW50IGRldmVsb3BtZW50IHByb2Nlc3MuXG4gKlxuICogQWxsIFVJS2l0IGNvbXBvbmVudHMgYXJlIGJhc2VkIG9uIFVJVmlldy5cbiAqXG4gKiBAYXVnbWVudHMge1JlYWN0LkNvbXBvbmVudH1cbiAqL1xuY2xhc3MgVUlWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgZGF0YSBwYXNzZWQgb24gdG8gdGhlIGVuZCBjb21wb25lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZSA/IHRoaXMuaW5pdGlhbFN0YXRlKCkgOiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbiBhbnkgdHlwZSBvZiBsaXN0LCB1bmlxdWUga2V5cyBhcmUgcmVxdWlyZWQgdG8ga2VlcCBSZWFjdCByZS1yZW5kZXJzIGVmZmljaWVudC4gVGhpc1xuICAgICAqIG1ldGhvZCBjb25zdW1lcyBhIGxpc3QgaXRlbSdzIGNvbnRlbnQgYW5kIHJldHVybnMgYW4gYXBwcm9wcmlhdGUga2V5IHRvIGJlIHVzZWQuXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gYnkgZXNtaXJhbGhhIHtAbGluayBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NjE2NDg0LzExNDE2MTEgb24gU3RhY2tPdmVyZmxvd31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy5jcmVhdGVIYXNoZWRLZXkoJ2FiY2QnKTsgLy8gMjk4NzA3NFxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBiYXNlU3RyaW5nIFRoZSBjb250ZW50IHRvIGJlIGhhc2hlZCBpbnRvIGEgY29uc2lzdGVudCBrZXkuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgYnVpbHQsIHVuaXF1ZSBoYXNoLlxuICAgICAqL1xuICAgIGNyZWF0ZUhhc2hlZEtleShiYXNlU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBiYXNlU3RyaW5nLnNwbGl0KCcnKS5yZWR1Y2UoZnVuY3Rpb24gaGFzaGVyKGEsIGIpIHtcbiAgICAgICAgICAgIGxldCBjID0gKChhIDw8IDUpIC0gYSkgKyBiLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjICYgYztcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwcm94aW1hdGVzIHRoZSBAbGlua3tQdXJlUmVuZGVyTWl4aW4gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9wdXJlLXJlbmRlci1taXhpbi5odG1sfSBmcm9tIEVTNSBSZWFjdC4gSW1wbGVtZW50IHNob3VsZENvbXBvbmVudFVwZGF0ZSBpbiB5b3VyIHN1YmNsYXNzIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIHRoZSBpbmNvbWluZyBwcm9wcyBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBwcm9wc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFN0YXRlIHRoZSBpbmNvbWluZyBzdGF0ZSBkZWZpbml0aW9uLCBtYXkgZGlmZmVyIGZyb20gY3VycmVudCBzdGF0ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgIEluZm9ybXMgUmVhY3QgdG8gcmUtcmVuZGVyIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAqICAgICAvLyBzb21lIGxvZ2ljIGhlcmUsIGV2ZW50dWFsbHkgYHJldHVybmAgdHJ1ZSBvciBmYWxzZVxuICAgICAqICAgICAvLyBjdXJyZW50IHByb3BzICYgc3RhdGUgYXJlIGF2YWlsYWJsZSBmb3IgY29tcGFyaXNvbiBhdCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy51dWlkKCk7IC8vIDFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICAgICAqL1xuICAgIHV1aWQoKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW11bGF0ZXMgdGhlIChub3cgcmVtb3ZlZCkgUmVhY3QgaW50ZXJmYWNlIGBnZXRJbml0aWFsU3RhdGVgLiBJdCdzIGEgY29udmVuaWVuY2UsIGJ1dCBhbGxvd3NcbiAgICAgKiBmb3IgdGhpcyBmdW5jdGlvbmFsaXR5IHRvIHdvcmsgd2l0aG91dCBoYXZpbmcgdG8gcHJvdmlkZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAbmFtZSBVSVZpZXcjaW5pdGlhbFN0YXRlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICAgICBpdGVtczogW11cbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgVUlWaWV3O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmdsb2JhbC5VSUtpdCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBVSUJ1dHRvbjogKGdsb2JhbC5VSUtpdC5VSUJ1dHRvbiA9IHJlcXVpcmUoJy4vVUlCdXR0b24nKSksXG4gICAgVUlDaGVja2JveDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94ID0gcmVxdWlyZSgnLi9VSUNoZWNrYm94JykpLFxuICAgIFVJQ2hlY2tib3hHcm91cDogKGdsb2JhbC5VSUtpdC5VSUNoZWNrYm94R3JvdXAgPSByZXF1aXJlKCcuL1VJQ2hlY2tib3hHcm91cCcpKSxcbiAgICBVSURpYWxvZzogKGdsb2JhbC5VSUtpdC5VSURpYWxvZyA9IHJlcXVpcmUoJy4vVUlEaWFsb2cnKSksXG4gICAgVUlGaXR0ZWRUZXh0OiAoZ2xvYmFsLlVJS2l0LlVJRml0dGVkVGV4dCA9IHJlcXVpcmUoJy4vVUlGaXR0ZWRUZXh0JykpLFxuICAgIFVJSW1hZ2U6IChnbG9iYWwuVUlLaXQuVUlJbWFnZSA9IHJlcXVpcmUoJy4vVUlJbWFnZScpKSxcbiAgICBVSUxpc3Q6IChnbG9iYWwuVUlLaXQuVUlMaXN0ID0gcmVxdWlyZSgnLi9VSUxpc3QnKSksXG4gICAgVUlNb2RhbDogKGdsb2JhbC5VSUtpdC5VSU1vZGFsID0gcmVxdWlyZSgnLi9VSU1vZGFsJykpLFxuICAgIFVJUG9wb3ZlcjogKGdsb2JhbC5VSUtpdC5VSVBvcG92ZXIgPSByZXF1aXJlKCcuL1VJUG9wb3ZlcicpKSxcbiAgICBVSVByb2dyZXNzOiAoZ2xvYmFsLlVJS2l0LlVJUHJvZ3Jlc3MgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3MnKSksXG4gICAgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmU6IChnbG9iYWwuVUlLaXQuVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgPSByZXF1aXJlKCcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJykpLFxuICAgIFVJUmFkaW86IChnbG9iYWwuVUlLaXQuVUlSYWRpbyA9IHJlcXVpcmUoJy4vVUlSYWRpbycpKSxcbiAgICBVSVNlZ21lbnRlZENvbnRyb2w6IChnbG9iYWwuVUlLaXQuVUlTZWdtZW50ZWRDb250cm9sID0gcmVxdWlyZSgnLi9VSVNlZ21lbnRlZENvbnRyb2wnKSksXG4gICAgVUlUYWJsZTogKGdsb2JhbC5VSUtpdC5VSVRhYmxlID0gcmVxdWlyZSgnLi9VSVRhYmxlJykpLFxuICAgIFVJVG9rZW5pemVkSW5wdXQ6IChnbG9iYWwuVUlLaXQuVUlUb2tlbml6ZWRJbnB1dCA9IHJlcXVpcmUoJy4vVUlUb2tlbml6ZWRJbnB1dCcpKSxcbiAgICBVSVRvb2x0aXA6IChnbG9iYWwuVUlLaXQuVUlUb29sdGlwID0gcmVxdWlyZSgnLi9VSVRvb2x0aXAnKSksXG4gICAgVUlUeXBlYWhlYWRJbnB1dDogKGdsb2JhbC5VSUtpdC5VSVR5cGVhaGVhZElucHV0ID0gcmVxdWlyZSgnLi9VSVR5cGVhaGVhZElucHV0JykpLFxuICAgIFVJVmlldzogKGdsb2JhbC5VSUtpdC5VSVZpZXcgPSByZXF1aXJlKCcuL1VJVmlldycpKSxcbn07XG4iXX0=
