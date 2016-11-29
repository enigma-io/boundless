'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);

var isFunction = (function (test) {
  return typeof test === 'function';
});

/**
 * Returns a modified version of the supplied object without the given keys.
 */

function omitKeysFromSourceObject(source) {
    var omittedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return Object.keys(source).reduce(function relocateAcceptedKeys(hash, key) {
        if (omittedKeys.indexOf(key) === -1) {
            hash[key] = source[key];
        }

        return hash;
    }, {});
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var UIArrowKeyNavigation = function (_React$PureComponent) {
    inherits(UIArrowKeyNavigation, _React$PureComponent);

    function UIArrowKeyNavigation() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIArrowKeyNavigation.__proto__ || Object.getPrototypeOf(UIArrowKeyNavigation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            activeChildIndex: _this.props.defaultActiveChildIndex
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    if (_this.props.mode === UIArrowKeyNavigation.mode.VERTICAL || _this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                        event.preventDefault();
                        _this.moveFocus(-1);
                    }

                    break;

                case 'ArrowLeft':
                    if (_this.props.mode === UIArrowKeyNavigation.mode.HORIZONTAL || _this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                        event.preventDefault();
                        _this.moveFocus(-1);
                    }

                    break;

                case 'ArrowDown':
                    if (_this.props.mode === UIArrowKeyNavigation.mode.VERTICAL || _this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                        event.preventDefault();
                        _this.moveFocus(1);
                    }

                    break;

                case 'ArrowRight':
                    if (_this.props.mode === UIArrowKeyNavigation.mode.HORIZONTAL || _this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                        event.preventDefault();
                        _this.moveFocus(1);
                    }

                    break;
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleFocus = function (event) {
            if (event.target.hasAttribute('data-index')) {
                var index = parseInt(event.target.getAttribute('data-index'), 10);
                var child = React__default.Children.toArray(_this.props.children)[index];

                _this.setState({ activeChildIndex: index });

                if (child.props.onFocus) {
                    child.props.onFocus(event);
                }
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UIArrowKeyNavigation, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                this.setFocus(this.state.activeChildIndex);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.activeChildIndex !== 0) {
                var numChildren = nextProps.children ? React__default.Children.count(nextProps.children) : 0;

                if (numChildren === 0) {
                    this.setState({ activeChildIndex: 0 });
                } else if (this.state.activeChildIndex >= numChildren) {
                    this.setState({ activeChildIndex: numChildren - 1 });
                }
            }
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            var childNode = (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : ReactDOM.findDOMNode(this.refs.wrapper)).children[index];

            if (childNode && childNode.hasAttribute('data-skip')) {
                this.moveFocus(childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
            } else if (childNode && document.activeElement !== childNode) {
                childNode.focus();
            }
        }
    }, {
        key: 'moveFocus',
        value: function moveFocus(delta) {
            var numChildren = this.props.children ? React__default.Children.count(this.props.children) : 0;

            var nextIndex = this.state.activeChildIndex + delta;

            if (nextIndex >= numChildren) {
                nextIndex = 0; // loop
            } else if (nextIndex < 0) {
                nextIndex = numChildren - 1; // reverse loop
            }

            this.setState({ activeChildIndex: nextIndex });
        }
    }, {
        key: 'children',
        value: function children() {
            var _this2 = this;

            return React__default.Children.map(this.props.children, function (child, index) {
                return React__default.cloneElement(child, {
                    'data-index': index,
                    'data-skip': parseInt(child.props.tabIndex, 10) === -1 || undefined,
                    key: child.key || index,
                    tabIndex: _this2.state.activeChildIndex === index ? 0 : -1
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                this.props.component,
                _extends({}, omitKeysFromSourceObject(this.props, UIArrowKeyNavigation.internalKeys), {
                    ref: 'wrapper',
                    onFocus: this.handleFocus,
                    onKeyDown: this.handleKeyDown }),
                this.children()
            );
        }
    }]);
    return UIArrowKeyNavigation;
}(React__default.PureComponent);

UIArrowKeyNavigation.mode = {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
    BOTH: 'BOTH'
};
UIArrowKeyNavigation.propTypes = {
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),

    defaultActiveChildIndex: React.PropTypes.number,

    mode: React.PropTypes.oneOf([UIArrowKeyNavigation.mode.HORIZONTAL, UIArrowKeyNavigation.mode.VERTICAL, UIArrowKeyNavigation.mode.BOTH])
};
UIArrowKeyNavigation.defaultProps = {
    component: 'div',
    defaultActiveChildIndex: 0,
    mode: UIArrowKeyNavigation.mode.BOTH
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.defaultProps);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
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
});

/**
 * A dummy function with no side effects. Commonly used when mocking interfaces.
 * @module UIKit/utils/noop
 */
function noop() {}

var UIButton = function (_React$PureComponent) {
    inherits(UIButton, _React$PureComponent);

    function UIButton() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIButton.__proto__ || Object.getPrototypeOf(UIButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (_this.props.disabled) {
                return;
            }

            _this.toggleState(event);

            if (isFunction(_this.props.onClick)) {
                _this.props.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.disabled) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    _this.toggleState(event);
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UIButton, [{
        key: 'toggleState',
        value: function toggleState(event) {
            this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'button',
                _extends({}, omitKeysFromSourceObject(this.props, UIButton.internalKeys), {
                    ref: 'button',
                    className: index('ui-button', this.props.className, {
                        'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                        'ui-button-pressed': this.props.pressed
                    }),
                    'aria-pressed': this.props.pressed,
                    onKeyDown: this.handleKeyDown,
                    onClick: this.handleClick }),
                this.props.children
            );
        }
    }]);
    return UIButton;
}(React__default.PureComponent);

UIButton.propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    onPressed: React.PropTypes.func,
    onUnpressed: React.PropTypes.func,
    pressed: React.PropTypes.bool
};
UIButton.defaultProps = {
    children: null,
    onClick: noop,
    onPressed: noop,
    onUnpressed: noop,
    pressed: undefined
};
UIButton.internalKeys = Object.keys(UIButton.defaultProps);

/**
 * Generates a unique ID. Based on {@link https://gist.github.com/jed/982883 this implementation}.
 * Added a prefix so the generated ID is suitable for use as an HTML ID.
 *
 * @return {string} a unique identifier
 *
 * @example
 * uuid(); // uikit-1f2cd27f-0754-4344-9d20-436a201b2f80
 */
function uuid() {
  /* eslint-disable */
  return 'uikit-' + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
    return (a ^ Math.random() * 16 >> a / 4).toString(16);
  });
  /* eslint-enable */
}

/**
 * An accessible checkbox with indeterminate support.
 */

var UICheckbox = function (_React$PureComponent) {
    inherits(UICheckbox, _React$PureComponent);

    function UICheckbox() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UICheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UICheckbox.__proto__ || Object.getPrototypeOf(UICheckbox)).call.apply(_ref, [this].concat(args))), _this), _this.id = uuid(), _this.handleChange = function (event) {
            // Send the opposite signal from what was passed to toggle the data
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.props[!_this.props.inputProps.checked ? 'onChecked' : 'onUnchecked'](_this.props.inputProps.name);

            if (isFunction(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _this.handleClick = function (event) {
            if (_this.props.inputProps.disabled) {
                return;
            }

            _this.refs.input.focus();

            if (isFunction(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UICheckbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.inputProps.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.inputProps.indeterminate !== this.props.inputProps.indeterminate) {
                this.setIndeterminate();
            }
        }
    }, {
        key: 'setIndeterminate',
        value: function setIndeterminate() {
            this.refs.input.indeterminate = !!this.props.inputProps.indeterminate;
        }
    }, {
        key: 'getAriaState',
        value: function getAriaState() {
            return this.props.inputProps.indeterminate ? 'mixed' : String(this.props.inputProps.checked);
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            return React__default.createElement('input', _extends({}, omitKeysFromSourceObject(this.props.inputProps, 'indeterminate'), {
                ref: 'input',
                type: 'checkbox',
                className: index('ui-checkbox', this.props.inputProps.className, {
                    'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                    'ui-checkbox-checked': this.props.inputProps.checked,
                    'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked
                }),
                id: this.props.inputProps.id || this.id,
                'aria-checked': this.getAriaState(),
                onChange: this.handleChange,
                onClick: this.handleClick }));
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return React__default.createElement(
                    'label',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: index('ui-checkbox-label', this.props.labelProps.className),
                        htmlFor: this.props.inputProps.id || this.id }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UICheckbox.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-checkbox-wrapper', this.props.className) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);
    return UICheckbox;
}(React__default.PureComponent);

UICheckbox.propTypes = {
    inputProps: React.PropTypes.shape({
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        id: React.PropTypes.string,
        indeterminate: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onClick: React.PropTypes.func,
        name: React.PropTypes.string,
        value: React.PropTypes.string
    }),
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func
};
UICheckbox.defaultProps = {
    inputProps: {
        checked: false,
        indeterminate: false
    },
    label: null,
    labelProps: {},
    onChecked: noop,
    onUnchecked: noop
};
UICheckbox.internalKeys = Object.keys(UICheckbox.defaultProps);

/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 */

var UICheckboxGroup = function (_React$PureComponent) {
    inherits(UICheckboxGroup, _React$PureComponent);

    function UICheckboxGroup() {
        classCallCheck(this, UICheckboxGroup);
        return possibleConstructorReturn(this, (UICheckboxGroup.__proto__ || Object.getPrototypeOf(UICheckboxGroup)).apply(this, arguments));
    }

    createClass(UICheckboxGroup, [{
        key: 'allItemsChecked',
        value: function allItemsChecked() {
            return this.props.items.every(function (item) {
                return item.inputProps.checked === true;
            });
        }
    }, {
        key: 'anyItemsChecked',
        value: function anyItemsChecked() {
            return this.props.items.some(function (item) {
                return item.inputProps.checked === true;
            });
        }
    }, {
        key: 'renderSelectAll',
        value: function renderSelectAll() {
            if (this.props.selectAll) {
                var allChecked = this.allItemsChecked();
                var inputProps = this.props.selectAllProps.inputProps;


                return React__default.createElement(UICheckbox, _extends({}, this.props.selectAllProps, {
                    ref: 'select_all',
                    key: 'cb_select_all',
                    className: index('ui-checkbox-group-selectall', this.props.selectAllProps.className),
                    inputProps: _extends({}, inputProps, {
                        checked: allChecked,
                        indeterminate: !allChecked && this.anyItemsChecked(),
                        name: inputProps && inputProps.name ? inputProps.name : 'cb_select_all'
                    }),
                    label: this.props.selectAllProps.label || 'Select All',
                    onChecked: this.props.onAllChecked,
                    onUnchecked: this.props.onAllUnchecked }));
            }
        }
    }, {
        key: 'renderCheckboxes',
        value: function renderCheckboxes() {
            var _this2 = this;

            return this.props.items.map(function (item) {
                return React__default.createElement(UICheckbox, _extends({}, item, {
                    key: item.inputProps.name,
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
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UICheckboxGroup.internalKeys), {
                    ref: 'group',
                    className: index('ui-checkbox-group', this.props.className) }),
                this.renderChildren()
            );
        }
    }]);
    return UICheckboxGroup;
}(React__default.PureComponent);

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};
UICheckboxGroup.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        inputProps: React.PropTypes.shape({
            checked: React.PropTypes.bool.isRequired,
            label: React.PropTypes.string,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string
        })
    })).isRequired,
    onAllChecked: React.PropTypes.func,
    onAllUnchecked: React.PropTypes.func,
    onChildChecked: React.PropTypes.func,
    onChildUnchecked: React.PropTypes.func,
    selectAll: React.PropTypes.bool,
    selectAllProps: React.PropTypes.object,
    selectAllPosition: React.PropTypes.oneOf([UICheckboxGroup.Constants.SELECT_ALL_BEFORE, UICheckboxGroup.Constants.SELECT_ALL_AFTER])
};
UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: noop,
    onAllUnchecked: noop,
    onChildChecked: noop,
    onChildUnchecked: noop,
    selectAll: false,
    selectAllProps: {},
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};
UICheckboxGroup.internalKeys = Object.keys(UICheckboxGroup.defaultProps);

var PORTAL_DATA_ATTRIBUTE = 'data-portal-id';

/**
 * A higher-order component for the rendering of components outside the normal React tree.
 * Only accepts a single top-level child; naked text, etc will be wrapped in a <div>.
 */

var UIPortal = function (_React$Component) {
    inherits(UIPortal, _React$Component);

    function UIPortal() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIPortal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIPortal.__proto__ || Object.getPrototypeOf(UIPortal)).call.apply(_ref, [this].concat(args))), _this), _this.id = uuid(), _this.$portal = null, _this.$passenger = null, _temp), possibleConstructorReturn(_this, _ret);
    }

    // the <div> that the children are rendered into


    // the top-level child rendered into the $portal


    createClass(UIPortal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.$portal = document.createElement('div');
            this.props.destination.appendChild(this.$portal);

            this.renderPortalledContent();
        }
    }, {
        key: 'renderPortalledContent',
        value: function renderPortalledContent() {
            var child = React__default.isValidElement(this.props.children) ? this.props.children : React__default.createElement(
                'div',
                null,
                this.props.children
            );

            // update the portal ID link if needed
            this.$portal.id = this.props.portalId || this.id;

            ReactDOM__default.render(child, this.$portal);
            this.$passenger = this.$portal.children[0];
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderPortalledContent();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            ReactDOM__default.unmountComponentAtNode(this.$portal);
            this.props.destination.removeChild(this.$portal);
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement('span', _extends({}, omitKeysFromSourceObject(this.props, UIPortal.internalKeys), defineProperty({}, PORTAL_DATA_ATTRIBUTE, this.props.portalId || this.id)));
        }
    }]);
    return UIPortal;
}(React__default.Component);

UIPortal.propTypes = {
    // single child only - arrays not allowed
    children: React__default.PropTypes.node.isRequired,
    destination: React.PropTypes.instanceOf(HTMLElement),
    portalId: React.PropTypes.string
};
UIPortal.defaultProps = {
    children: null,
    destination: document.body,
    portalId: null
};
UIPortal.internalKeys = Object.keys(UIPortal.defaultProps);

var toArray$1 = Array.prototype.slice;

/**
 * A non-blocking, focus-stealing container.
 */

var UIDialog = function (_React$PureComponent) {
    inherits(UIDialog, _React$PureComponent);

    function UIDialog() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIDialog.__proto__ || Object.getPrototypeOf(UIDialog)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.uuidHeader = uuid(), _this.uuidBody = uuid(), _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(_this.props.onClose, 0);
                    }
                }

                return;
            }

            // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
            var previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

            if (_this.isPartOfDialog(previous) && !_this.isPartOfDialog(nativeEvent.target)) {
                nativeEvent.preventDefault();
                previous.focus(); // restore focus
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.closeOnEscKey && event.key === 'Escape') {
                window.setTimeout(_this.props.onClose, 0);
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.props.onClose, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.props.onClose, 0);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    createClass(UIDialog, [{
        key: 'isPartOfDialog',
        value: function isPartOfDialog(node) {
            if (!node || node === window) {
                return false;
            }

            var roots = [this.$wrapper].concat(toArray$1.call(this.$wrapper.querySelectorAll('[' + PORTAL_DATA_ATTRIBUTE + ']')).map(function (dom) {
                return document.getElementById(dom.getAttribute(PORTAL_DATA_ATTRIBUTE));
            }));

            var element = node.nodeType !== Node.ELEMENT_NODE ? node.parentNode : node;

            return roots.some(function (dom) {
                return dom.contains(element);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('click', this.handleOutsideClick, true);
            window.addEventListener('contextmenu', this.handleOutsideClick, true);
            window.addEventListener('focus', this.handleFocus, true);
            window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
            window.addEventListener('wheel', this.handleOutsideScrollWheel, true);

            if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
                this.$dialog.focus();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.handleOutsideClick, true);
            window.removeEventListener('contextmenu', this.handleOutsideClick, true);
            window.removeEventListener('focus', this.handleFocus, true);
            window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
            window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return React__default.createElement(
                'div',
                _extends({}, this.props.bodyProps, {
                    id: this.props.bodyProps.id || this.uuidBody,
                    className: index('ui-dialog-body', this.props.bodyProps.className) }),
                this.props.children
            );
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            if (this.props.footer) {
                return React__default.createElement(
                    'footer',
                    _extends({}, this.props.footerProps, {
                        className: index('ui-dialog-footer', this.props.footerProps.className) }),
                    this.props.footer
                );
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (this.props.header) {
                return React__default.createElement(
                    'header',
                    _extends({}, this.props.headerProps, {
                        id: this.props.headerProps.id || this.uuidHeader,
                        className: index('ui-dialog-header', this.props.headerProps.className) }),
                    this.props.header
                );
            }
        }
    }, {
        key: 'renderFocusBoundary',
        value: function renderFocusBoundary() {
            if (this.props.captureFocus) {
                return React__default.createElement(
                    'div',
                    { className: 'ui-offscreen', tabIndex: '0', 'aria-hidden': 'true' },
                    '\xA0'
                );
            }
        } // used to lock focus into a particular subset of DOM

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React__default.createElement(
                'div',
                _extends({}, this.props.wrapperProps, {
                    ref: function ref(node) {
                        return _this2.$wrapper = node;
                    },
                    className: index('ui-dialog-wrapper', this.props.wrapperProps.className),
                    tabIndex: '0' }),
                this.renderFocusBoundary(),
                this.props.before,
                React__default.createElement(
                    'div',
                    _extends({}, omitKeysFromSourceObject(this.props, UIDialog.internalKeys), {
                        ref: function ref(node) {
                            return _this2.$dialog = node;
                        },
                        className: index('ui-dialog', this.props.className),
                        onKeyDown: this.handleKeyDown,
                        role: 'dialog',
                        'aria-labelledby': this.uuidHeader,
                        'aria-describedby': this.uuidBody,
                        tabIndex: '0' }),
                    this.renderHeader(),
                    this.renderBody(),
                    this.renderFooter()
                ),
                this.props.after,
                this.renderFocusBoundary()
            );
        }
    }]);
    return UIDialog;
}(React__default.PureComponent);

UIDialog.propTypes = {
    after: React.PropTypes.node,
    before: React.PropTypes.node,
    bodyProps: React.PropTypes.object,
    captureFocus: React.PropTypes.bool,
    children: React.PropTypes.node,
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    closeOnOutsideFocus: React.PropTypes.bool,
    closeOnOutsideScroll: React.PropTypes.bool,
    footer: React.PropTypes.node,
    footerProps: React.PropTypes.object,
    header: React.PropTypes.node,
    headerProps: React.PropTypes.object,
    onClose: React.PropTypes.func,
    wrapperProps: React.PropTypes.object
};
UIDialog.defaultProps = {
    after: null,
    before: null,
    bodyProps: {},
    captureFocus: true,
    children: null,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footer: null,
    footerProps: {},
    header: null,
    headerProps: {},
    onClose: noop,
    wrapperProps: {}
};
UIDialog.internalKeys = Object.keys(UIDialog.defaultProps);

var instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    var node = ReactDOM.findDOMNode(instance);
    var containerBox = window.getComputedStyle(node.parentNode);
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
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach(function (instance) {
        return rescale(instance);
    });
}

function registerInstance(instance) {
    if (instances.length === 0) {
        window.addEventListener('resize', handleWindowResize, true);
    }

    instances.push(instance);
}

function unregisterInstance(instance) {
    instances.splice(instances.indexOf(instance), 1);

    if (instances.length === 0) {
        window.removeEventListener('resize', handleWindowResize, true);
    }
}

/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 */

var UIFittedText = function (_React$PureComponent) {
    inherits(UIFittedText, _React$PureComponent);

    function UIFittedText() {
        classCallCheck(this, UIFittedText);
        return possibleConstructorReturn(this, (UIFittedText.__proto__ || Object.getPrototypeOf(UIFittedText)).apply(this, arguments));
    }

    createClass(UIFittedText, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            rescale(this);

            // there are likely to be multiple instances of this component on a page, so it makes sense to just use
            // a shared global resize listener instead of each component having its own
            registerInstance(this);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            rescale(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            unregisterInstance(this);
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                this.props.component,
                _extends({}, omitKeysFromSourceObject(this.props, UIFittedText.internalKeys), {
                    className: index('ui-text', this.props.className) }),
                this.props.children
            );
        }
    }]);
    return UIFittedText;
}(React__default.PureComponent);

UIFittedText.propTypes = {
    children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.function]),
    maxFontSize: React.PropTypes.number
};
UIFittedText.defaultProps = {
    children: null,
    component: 'span',
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.internalKeys = Object.keys(UIFittedText.defaultProps);

/**
 * An image block with placeholder support for loading and fallback scenarios.
 */

var UIImage = function (_React$PureComponent) {
    inherits(UIImage, _React$PureComponent);

    function UIImage() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIImage.__proto__ || Object.getPrototypeOf(UIImage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            status: UIImage.status.LOADING
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UIImage, [{
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
                return React__default.createElement('div', _extends({}, this.props.imageProps, {
                    ref: 'image',
                    className: index('ui-image', this.props.imageProps.className),
                    title: this.props.alt,
                    style: _extends({}, this.props.imageProps.style, {
                        backgroundImage: 'url(' + this.props.src + ')'
                    }) }));
            }

            return React__default.createElement('img', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: index('ui-image', this.props.imageProps.className),
                src: this.props.src,
                alt: this.props.alt,
                onLoad: noop,
                onError: noop }));
        }
    }, {
        key: 'renderStatus',
        value: function renderStatus() {
            return React__default.createElement('div', _extends({}, this.props.statusProps, {
                ref: 'status',
                className: index('ui-image-status', this.props.statusProps.className, {
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR
                }),
                role: 'presentation' }));
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIImage.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-image-wrapper', this.props.className) }),
                this.renderImage(),
                this.renderStatus()
            );
        }
    }]);
    return UIImage;
}(React__default.PureComponent);

UIImage.status = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR'
};
UIImage.propTypes = {
    alt: React.PropTypes.string,
    displayAsBackgroundImage: React.PropTypes.bool,
    imageProps: React.PropTypes.object,
    src: React.PropTypes.string.isRequired,
    statusProps: React.PropTypes.object
};
UIImage.defaultProps = {
    alt: null,
    displayAsBackgroundImage: false,
    imageProps: {},
    src: 'about:blank',
    statusProps: {}
};
UIImage.internalKeys = Object.keys(UIImage.defaultProps);

/**
 * Returns an object containing all props listed in the propTypes of a child component
 * e.g. used in UITypeaheadInput to identify which props are meant for UITextualInput
 * @module UIUtils/extractChildProps
 *
 * @param  {Object} parentProps     props of the parent component
 * @param  {Object} childPropTypes  propTypes of the child component
 * @return {Object}                 props to be spread applied to a child component
 */

function extractChildProps(parentProps, childPropTypes) {
    return Object.keys(childPropTypes).reduce(function (childProps, key) {
        if (parentProps[key]) {
            childProps[key] = parentProps[key];
        }

        return childProps;
    }, {});
}

/**
 * A blocking, focus-stealing container.
 */

var UIModal = function (_React$PureComponent) {
    inherits(UIModal, _React$PureComponent);

    function UIModal() {
        classCallCheck(this, UIModal);
        return possibleConstructorReturn(this, (UIModal.__proto__ || Object.getPrototypeOf(UIModal)).apply(this, arguments));
    }

    createClass(UIModal, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = this.props;


            return React__default.createElement(
                UIPortal,
                props.portalProps,
                React__default.createElement(
                    'div',
                    _extends({}, omitKeysFromSourceObject(props, UIModal.internalKeys), {
                        ref: function ref(node) {
                            return _this2.$modal = node;
                        },
                        className: index('ui-modal-wrapper', props.className) }),
                    React__default.createElement('div', _extends({}, props.maskProps, {
                        className: index('ui-modal-mask', props.maskProps.className) })),
                    React__default.createElement(
                        UIDialog,
                        _extends({}, extractChildProps(props, UIDialog.defaultProps), props.modalProps, {
                            className: index('ui-modal', props.modalProps.className) }),
                        props.children
                    )
                )
            );
        }
    }]);
    return UIModal;
}(React__default.PureComponent);

UIModal.propTypes = _extends({}, UIDialog.propTypes, {
    maskProps: React.PropTypes.object,
    modalProps: React.PropTypes.object,
    portalProps: React.PropTypes.object
});
UIModal.defaultProps = _extends({}, UIDialog.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {},
    portalProps: {}
});
UIModal.internalKeys = Object.keys(UIModal.defaultProps);

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var index$1 = isInteger;

/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 */

var UISegmentedControl = function (_React$PureComponent) {
    inherits(UISegmentedControl, _React$PureComponent);

    function UISegmentedControl() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UISegmentedControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UISegmentedControl.__proto__ || Object.getPrototypeOf(UISegmentedControl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            indexOfOptionInFocus: null
        }, _this.handleKeyDown = function (event) {
            var key = event.key;
            var activeItemIndex = _this.state.indexOfOptionInFocus;

            if (key === 'ArrowLeft') {
                _this.setFocus(_this.getPreviousOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'ArrowRight') {
                _this.setFocus(_this.getNextOptionIndex(activeItemIndex));
                event.preventDefault();
            } else if (key === 'Enter') {
                _this.handleOptionClick(_this.props.options[activeItemIndex]);
                event.preventDefault();
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UISegmentedControl, [{
        key: 'currentValue',
        value: function currentValue() {
            var value = void 0;

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
        value: function setFocus(index$$1) {
            ReactDOM.findDOMNode(this.refs['option_$' + index$$1]).focus();
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
        key: 'handleOptionBlur',
        value: function handleOptionBlur(option, event) {
            if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
                this.setState({ indexOfOptionInFocus: null });
            }

            if (isFunction(option.onBlur)) {
                option.onBlur(event);
            }
        }
    }, {
        key: 'handleOptionClick',
        value: function handleOptionClick(option, event) {
            this.props.onOptionSelected(option.value);

            if (isFunction(option.onClick)) {
                option.onClick(event);
            }
        }
    }, {
        key: 'handleOptionFocus',
        value: function handleOptionFocus(option, event) {
            this.setState({ indexOfOptionInFocus: this.props.options.indexOf(option) });

            if (isFunction(option.onFocus)) {
                option.onFocus(event);
            }
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var _this2 = this;

            return this.props.options.map(function (definition, index$$1) {
                return React__default.createElement(
                    UIButton,
                    _extends({}, omitKeysFromSourceObject(definition, UISegmentedControl.internalChildKeys), {
                        role: 'radio',
                        'aria-checked': String(definition.selected),
                        ref: 'option_$' + index$$1,
                        key: definition.value,
                        className: index('ui-segmented-control-option', definition.className, {
                            'ui-segmented-control-option-selected': definition.selected
                        }),
                        tabIndex: definition.selected ? '0' : '-1',
                        onBlur: _this2.handleOptionBlur.bind(_this2, definition),
                        onPressed: _this2.handleOptionClick.bind(_this2, definition),
                        onFocus: _this2.handleOptionFocus.bind(_this2, definition) }),
                    definition.content
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UISegmentedControl.internalKeys), {
                    ref: 'wrapper',
                    role: 'radiogroup',
                    className: index('ui-segmented-control', this.props.className),
                    onKeyDown: this.handleKeyDown }),
                this.renderOptions()
            );
        }
    }]);
    return UISegmentedControl;
}(React__default.PureComponent);

UISegmentedControl.propTypes = {
    onOptionSelected: React.PropTypes.func,
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
    onOptionSelected: noop,
    options: []
};
UISegmentedControl.internalKeys = Object.keys(UISegmentedControl.defaultProps);
UISegmentedControl.internalChildKeys = ['content', 'value', 'selected'];

var identity = function identity(x) {
    return x;
};

/**
 * A utility component for handling promises as children and eventually doing something with their resolved payload.
 */

var Item = function (_React$PureComponent) {
    inherits(Item, _React$PureComponent);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.state = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Item, [{
        key: 'convertDataToJSXOrWait',
        value: function convertDataToJSXOrWait() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            if (props.data instanceof Promise) {
                var _ret2 = function () {
                    _this2.setState({ component: null });

                    var closurePromise = props.data;

                    props.data.then(function (resolvedPayload) {
                        if (_this2.mounted) {
                            _this2.setState(function (state, currentProps) {
                                return {
                                    component: currentProps.data === closurePromise ? currentProps.convertToJSXFunc(resolvedPayload, currentProps.index) : state.component
                                };
                            });
                        } // only replace if we're looking at the same promise, otherwise do nothing
                    }, noop);

                    return {
                        v: void 0
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }

            this.setState({ component: props.convertToJSXFunc(props.data, props.index) });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.convertDataToJSXOrWait();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mounted = true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.convertDataToJSXOrWait(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;
        }
    }, {
        key: 'getClasses',
        value: function getClasses(extraClasses) {
            return index('ui-pagination-item', extraClasses, {
                'ui-pagination-item-even': this.props.even,
                'ui-pagination-item-odd': !this.props.even,
                'ui-pagination-item-loading': this.state.component === null
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.component === null) {
                return React__default.createElement(
                    'div',
                    _extends({}, omitKeysFromSourceObject(this.props, Item.internalKeys), { className: this.getClasses() }),
                    this.props.loadingContent
                );
            }

            return React__default.cloneElement(this.state.component, _extends({}, omitKeysFromSourceObject(this.props, Item.internalKeys), {
                className: this.getClasses(this.state.component.props && this.state.component.props.className),
                'data-index': this.props.index
            }));
        }
    }]);
    return Item;
}(React__default.PureComponent);

/**
 * A utility component for paging the display of many data items, possibly varying in DOM layout/size.
 */


Item.propTypes = {
    convertToJSXFunc: React.PropTypes.func,
    data: React.PropTypes.object,
    even: React.PropTypes.bool,
    index: React.PropTypes.number,
    loadingContent: React.PropTypes.node
};
Item.defaultProps = {
    convertToJSXFunc: noop,
    data: null,
    even: true,
    index: 0,
    loadingContent: null
};
Item.internalKeys = Object.keys(Item.defaultProps);

var UIPagination = function (_React$PureComponent2) {
    inherits(UIPagination, _React$PureComponent2);

    function UIPagination() {
        var _ref2;

        var _temp2, _this3, _ret3;

        classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret3 = (_temp2 = (_this3 = possibleConstructorReturn(this, (_ref2 = UIPagination.__proto__ || Object.getPrototypeOf(UIPagination)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
            currentPage: _this3.props.initialPage,
            targetIndex: (_this3.props.initialPage - 1) * _this3.props.numItemsPerPage
        }, _this3.currentPage = function () {
            return _this3.state.currentPage;
        }, _this3.getPageForIndex = function (index$$1) {
            var itemsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props.numItemsPerPage;
            return Math.ceil((index$$1 + 1) / itemsPerPage);
        }, _this3.totalPages = function () {
            return Math.ceil(_this3.props.totalItems / _this3.props.numItemsPerPage);
        }, _this3.firstVisibleItemIndex = function () {
            return (_this3.currentPage() - 1) * _this3.props.numItemsPerPage;
        }, _this3.pageToIndex = function (i) {
            if (i < 0 || i >= _this3.props.totalItems) {
                return new Error('Cannot page to invalid index ' + i + '.');
            }

            _this3.setState({
                currentPage: _this3.getPageForIndex(i),
                targetIndex: i
            });
        }, _this3.handleClick = function (value) {
            var nextTargetIndex = void 0;

            switch (value) {
                case UIPagination.controls.FIRST:
                    nextTargetIndex = 0;
                    break;
                case UIPagination.controls.PREVIOUS:
                    nextTargetIndex = _this3.firstVisibleItemIndex() - _this3.props.numItemsPerPage;
                    break;
                case UIPagination.controls.NEXT:
                    nextTargetIndex = _this3.firstVisibleItemIndex() + _this3.props.numItemsPerPage;
                    break;
                case UIPagination.controls.LAST:
                    nextTargetIndex = _this3.props.totalItems - 1;
                    break;
                default:
                    nextTargetIndex = parseInt(value, 10) * _this3.props.numItemsPerPage - 1;
            }

            _this3.setState({
                currentPage: _this3.getPageForIndex(nextTargetIndex),
                targetIndex: nextTargetIndex
            });
        }, _temp2), possibleConstructorReturn(_this3, _ret3);
    }

    createClass(UIPagination, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.currentPage !== this.currentPage()) {
                ReactDOM.findDOMNode(this.refs.item_0).focus();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            var _this4 = this;

            var oldProps = this.props;

            // use transactional `setState()` syntax to ensure that pending state updates are honored,
            // like those from `pageToIndex()`
            this.setState(function (state, props) {
                // NOTE: `props` here is technically the `nextProps` you'd receive from the first cWRP argument
                // so that's why we're caching `oldProps` outside the `setState`
                if (props.identifier !== oldProps.identifier) {
                    return {
                        currentPage: 1,
                        targetIndex: 0
                    };
                }

                return {
                    currentPage: _this4.getPageForIndex(state.targetIndex, props.numItemsPerPage),
                    targetIndex: state.targetIndex
                };
            });
        }
    }, {
        key: 'createPageButtonOptions',
        value: function createPageButtonOptions() {
            var options = [];
            var currentPage = this.currentPage();
            var numPageToggles = this.props.numPageToggles;
            var totalPages = this.totalPages();
            var startPage = currentPage - (currentPage - 1) % numPageToggles;
            var endPage = Math.min(startPage + numPageToggles - 1, totalPages);

            if (this.props.showPaginationState) {
                options.push({
                    selected: false,
                    content: isFunction(this.props.showPaginationState) ? this.props.showPaginationState(currentPage, totalPages) : currentPage + ' of ' + totalPages,
                    value: '',
                    disabled: true,
                    className: 'ui-pagination-control ui-pagination-control-state'
                });
            }

            if (this.props.showJumpToFirst) {
                options.push({
                    selected: false,
                    content: this.props.jumpToFirstControlContent,
                    value: UIPagination.controls.FIRST,
                    disabled: this.currentPage() === 1,
                    className: 'ui-pagination-control ui-pagination-control-first'
                });
            }

            options.push({
                selected: false,
                content: this.props.previousPageControlContent,
                value: UIPagination.controls.PREVIOUS,
                disabled: this.currentPage() === 1,
                className: 'ui-pagination-control ui-pagination-control-previous'
            });

            for (var i = startPage; i <= endPage; i++) {
                options.push({
                    className: 'ui-pagination-control',
                    'data-page-number': i,
                    selected: i === this.currentPage(),
                    content: i,
                    value: i
                });
            }

            options.push({
                selected: false,
                content: this.props.nextPageControlContent,
                value: UIPagination.controls.NEXT,
                disabled: this.currentPage() === totalPages,
                className: 'ui-pagination-control ui-pagination-control-next'
            });

            if (this.props.showJumpToLast) {
                options.push({
                    selected: false,
                    content: this.props.jumpToLastControlContent,
                    value: UIPagination.controls.LAST,
                    disabled: this.currentPage() === totalPages,
                    className: 'ui-pagination-control ui-pagination-control-last'
                });
            }

            if (this.props.customControlContent) {
                options.push({
                    selected: false,
                    content: this.props.customControlContent,
                    value: uuid(),
                    disabled: true,
                    className: 'ui-pagination-control ui-pagination-control-custom'
                });
            }

            return options;
        }
    }, {
        key: 'generateItems',
        value: function generateItems() {
            var generatedItems = [];
            var firstItemIndex = this.firstVisibleItemIndex();
            var lastItemIndex = Math.min(this.props.totalItems, firstItemIndex + this.props.numItemsPerPage) - 1;

            for (var i = firstItemIndex; i <= lastItemIndex; i += 1) {
                generatedItems.push({ data: this.props.getItem(i) });
            }

            return generatedItems;
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _this5 = this;

            var props = this.props.listWrapperProps;
            var indexOffset = this.props.numItemsPerPage * (this.currentPage() - 1);

            return React__default.createElement(
                UIArrowKeyNavigation,
                _extends({}, props, {
                    ref: 'itemList',
                    className: index('ui-pagination-items', props.className) }),
                this.generateItems().map(function (item, index$$1) {
                    return React__default.createElement(Item, {
                        ref: 'item_' + index$$1,
                        key: index$$1,
                        convertToJSXFunc: _this5.props.itemToJSXConverterFunc,
                        data: item.data,
                        even: index$$1 % 2 === 0,
                        index: indexOffset + index$$1,
                        loadingContent: _this5.props.itemLoadingContent });
                })
            );
        }
    }, {
        key: 'renderControls',
        value: function renderControls(position) {
            if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
                return;
            }

            var props = this.props.toggleWrapperProps;
            var positionLower = position.toLowerCase();
            var positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

            return React__default.createElement(UISegmentedControl, _extends({}, props, {
                ref: 'segmentedControl' + positionCapitalized,
                className: index('ui-pagination-controls', props.className, defineProperty({}, 'ui-pagination-controls-' + positionLower, true)),
                options: this.createPageButtonOptions(),
                onOptionSelected: this.handleClick }));
        }
    }, {
        key: 'renderView',
        value: function renderView() {
            var props = this.props;

            var position = UIPagination.positions;

            return React__default.createElement(
                'div',
                {
                    ref: 'paginatedView',
                    className: 'ui-pagination' },
                props.position === position.ABOVE || props.position === position.BOTH ? this.renderControls(position.ABOVE) : noop,
                this.renderItems(),
                props.position === position.BELOW || props.position === position.BOTH ? this.renderControls(position.BELOW) : noop
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIPagination.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-pagination-wrapper', this.props.className) }),
                this.renderView()
            );
        }
    }]);
    return UIPagination;
}(React__default.PureComponent);

UIPagination.controls = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};
UIPagination.positions = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};
UIPagination.propTypes = {
    customControlContent: React.PropTypes.node,
    getItem: React.PropTypes.func,
    hidePagerIfNotNeeded: React.PropTypes.bool,
    identifier: React.PropTypes.string.isRequired,

    initialPage: function validateInitialPage(props) {
        if (index$1(props.initialPage) === false) {
            return new Error('`initialPage` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.initialPage < 1 || props.initialPage > numberOfPages) {
            return new Error('`initialPage` must be between 1 and ' + numberOfPages + '.');
        }
    },

    itemLoadingContent: React.PropTypes.node,
    itemToJSXConverterFunc: React.PropTypes.func,
    jumpToFirstControlContent: React.PropTypes.node,
    jumpToLastControlContent: React.PropTypes.node,
    listWrapperProps: React.PropTypes.object,
    nextPageControlContent: React.PropTypes.node,

    numItemsPerPage: function validateNumItemsPerPage(props) {
        if (index$1(props.numItemsPerPage) === false) {
            return new Error('`numItemsPerPage` must be an integer.');
        } else if (props.numItemsPerPage < 1) {
            return new Error('`numItemsPerPage` must be greater than zero.');
        }
    },

    numPageToggles: React.PropTypes.number,
    position: React.PropTypes.oneOf(Object.keys(UIPagination.positions)),
    previousPageControlContent: React.PropTypes.node,
    showJumpToFirst: React.PropTypes.bool,
    showJumpToLast: React.PropTypes.bool,
    showPaginationState: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.func]),
    toggleWrapperProps: React.PropTypes.object,
    totalItems: React.PropTypes.number.isRequired
};
UIPagination.defaultProps = {
    customControlContent: null,
    getItem: noop,
    hidePagerIfNotNeeded: false,
    identifier: uuid(),
    initialPage: 1,
    itemLoadingContent: null,
    itemToJSXConverterFunc: identity,
    jumpToFirstControlContent: '« First',
    jumpToLastControlContent: 'Last »',
    listWrapperProps: {},
    nextPageControlContent: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    position: UIPagination.positions.ABOVE,
    previousPageControlContent: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    showPaginationState: true,
    toggleWrapperProps: {},
    totalItems: null
};
UIPagination.internalKeys = Object.keys(UIPagination.defaultProps);

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIUtils/transformProperty
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */

var transformProp = (function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
})();

function without(arr1, arr2) {
    return arr1.filter(function (item) {
        return arr2.indexOf(item) === -1;
    });
}
function values(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

var DEFAULT_CARET_COMPONENT = React__default.createElement(
    'svg',
    { viewBox: '0 0 14 9.5', xmlns: 'http://www.w3.org/2000/svg' },
    React__default.createElement(
        'g',
        null,
        React__default.createElement('polygon', { className: 'ui-popover-caret-border', fill: '#000', points: '7 0 14 10 0 10' }),
        React__default.createElement('polygon', { className: 'ui-popover-caret-fill', fill: '#FFF', points: '6.98230444 1.75 12.75 10 1.25 10' })
    )
);

/**
 * A non-blocking container positioned to a specific anchor element.
 */

var UIPopover = function (_React$PureComponent) {
    inherits(UIPopover, _React$PureComponent);

    function UIPopover(props) {
        classCallCheck(this, UIPopover);

        var _this = possibleConstructorReturn(this, (UIPopover.__proto__ || Object.getPrototypeOf(UIPopover)).call(this));

        _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : ReactDOM.findDOMNode(_this.props.anchor);

            _this.cacheViewportCartography(anchor);

            var dx = Math.round(_this.getNextDialogXPosition(anchor));
            var dy = Math.round(_this.getNextDialogYPosition(anchor));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(dx, dy);

            if (alignmentCorrection && _this.didAlignmentChange(alignmentCorrection)) {
                return _this.setState(alignmentCorrection);
            }

            // the caret is initially positioned at 0,0 inside the dialog
            // which is already positioned at the anchor, so we just need to
            // make small adjustments as necessary to line up the caret
            // with the visual center of the anchor

            _this.$caret.style.left = Math.round(_this.getNextCaretXPosition(anchor)) + 'px';
            _this.$caret.style.top = Math.round(_this.getNextCaretYPosition(anchor)) + 'px';

            _this.applyTranslation(_this.$caret, index, 0);
            _this.applyTranslation(_this.dialog.$wrapper, dx, dy);
        };

        _this.state = {
            anchorXAlign: props.anchorXAlign || props.preset.anchorXAlign,
            anchorYAlign: props.anchorYAlign || props.preset.anchorYAlign,
            selfXAlign: props.selfXAlign || props.preset.selfXAlign,
            selfYAlign: props.selfYAlign || props.preset.selfYAlign
        };
        return _this;
    }

    createClass(UIPopover, [{
        key: 'cacheViewportCartography',
        value: function cacheViewportCartography(anchor) {
            var anchorRect = anchor.getBoundingClientRect();

            this.anchorLeft = anchorRect.left;
            this.anchorTop = anchorRect.top;
            this.anchorHeight = anchorRect.height;
            this.anchorWidth = anchorRect.width;

            this.bodyLeft = document.body.scrollLeft;
            this.bodyTop = document.body.scrollTop;
        }
    }, {
        key: 'getNextCaretXPosition',
        value: function getNextCaretXPosition(anchor) {
            var caret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$caret;
            var _state = this.state,
                anchorXAlign = _state.anchorXAlign,
                selfXAlign = _state.selfXAlign,
                anchorYAlign = _state.anchorYAlign,
                selfYAlign = _state.selfYAlign;

            var position = UIPopover.position;

            var nextX = 0;

            // we only want to change the X position when we're
            // fully above or below the anchor and selfXAlign isn't MIDDLE

            if (selfXAlign !== position.MIDDLE && (anchorYAlign === position.START && selfYAlign === position.END || anchorYAlign === position.END && selfYAlign === position.START)) {

                if (anchorXAlign === position.START) {
                    nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
                } else if (anchorXAlign === position.END) {
                    nextX += this.dialog.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
                }
            }

            return nextX;
        }
    }, {
        key: 'getNextCaretYPosition',
        value: function getNextCaretYPosition(anchor) {
            var caret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$caret;
            var _state2 = this.state,
                anchorXAlign = _state2.anchorXAlign,
                selfXAlign = _state2.selfXAlign,
                anchorYAlign = _state2.anchorYAlign,
                selfYAlign = _state2.selfYAlign;

            var position = UIPopover.position;

            var nextY = 0;

            // we only want to change the Y position when we're
            // fully to the left or right of the anchor (start,end | end,start)
            // selfYAlign isn't MIDDLE

            if (selfYAlign !== position.MIDDLE && (anchorXAlign === position.START && selfXAlign === position.END || anchorXAlign === position.END && selfXAlign === position.START)) {

                if (anchorYAlign === position.START) {
                    nextY += this.anchorHeight / 2 - caret.clientWidth / 2;
                } else if (anchorYAlign === position.END) {
                    nextY += this.dialog.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
                }
            }

            return nextY;
        }
    }, {
        key: 'getNextDialogXPosition',
        value: function getNextDialogXPosition(anchor) {
            var dialog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dialog.$wrapper;
            var _state3 = this.state,
                anchorXAlign = _state3.anchorXAlign,
                selfXAlign = _state3.selfXAlign;

            var position = UIPopover.position;

            var nextX = this.anchorLeft + this.bodyLeft;

            switch (anchorXAlign) {
                case position.MIDDLE:
                    nextX += this.anchorWidth / 2;
                    break;

                case position.END:
                    nextX += this.anchorWidth;
                    break;
            }

            switch (selfXAlign) {
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
        key: 'getNextDialogYPosition',
        value: function getNextDialogYPosition(anchor) {
            var dialog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dialog.$wrapper;

            var state = this.state;
            var position = UIPopover.position;
            var anchorY = this.anchorTop + this.bodyTop;

            var nextY = anchorY + this.anchorHeight;

            switch (state.anchorYAlign) {
                case position.START:
                    nextY = anchorY;
                    break;

                case position.MIDDLE:
                    nextY = anchorY + this.anchorHeight / 2;
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
        value: function getAlignmentCorrectionIfOverflowing(x, y) {
            if (!this.props.autoReposition) {
                return false;
            }

            var corrections = _extends({}, this.state);
            var position = UIPopover.position;

            var width = this.dialog.$wrapper.clientWidth;
            var height = this.dialog.$wrapper.clientHeight;
            var xMax = document.body.scrollWidth;
            var yMax = document.body.scrollHeight;

            if (x + width > xMax) {
                // overflowing off to the right
                corrections.anchorXAlign = position.START;
                corrections.selfXAlign = position.END;
            }

            if (x < 0) {
                // overflowing off to the left
                corrections.anchorXAlign = position.END;
                corrections.selfXAlign = position.START;
            }

            if (y + height > yMax) {
                // overflowing below
                // if left/right
                if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                    corrections.anchorYAlign = position.END;
                } else {
                    corrections.anchorYAlign = position.START;
                }

                corrections.selfYAlign = position.END;
            }

            if (y < 0) {
                // overflowing above
                // if left/right
                if (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END || corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START) {
                    corrections.anchorYAlign = position.START;
                } else {
                    corrections.anchorYAlign = position.END;
                }

                corrections.selfYAlign = position.START;
            }

            return corrections;
        }
    }, {
        key: 'applyTranslation',
        value: function applyTranslation(node, x, y) {
            if (transformProp) {
                node.style[transformProp] = 'translate(' + x + 'px, ' + y + 'px)';
            } else {
                node.style.left = x + 'px';
                node.style.top = y + 'px';
            }
        }
    }, {
        key: 'didAlignmentChange',
        value: function didAlignmentChange(nextAlignment) {
            var currentAlignment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

            return nextAlignment.anchorXAlign !== currentAlignment.anchorXAlign || nextAlignment.anchorYAlign !== currentAlignment.anchorYAlign || nextAlignment.selfXAlign !== currentAlignment.selfXAlign || nextAlignment.selfYAlign !== currentAlignment.selfYAlign;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.align();
            window.addEventListener('resize', this.align, true);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.align();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.align, true);
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
        key: 'render',
        value: function render() {
            var _this2 = this,
                _cx;

            var getFrag = this.getClassAlignmentFragment,
                props = this.props,
                state = this.state;


            return React__default.createElement(
                UIPortal,
                props.portalProps,
                React__default.createElement(UIDialog, _extends({}, omitKeysFromSourceObject(props, UIPopover.internalKeys), {
                    ref: function ref(instance) {
                        return _this2.dialog = instance;
                    },
                    before: React__default.cloneElement(props.caretComponent, {
                        ref: function ref(node) {
                            return _this2.$caret = node;
                        },
                        className: index('ui-popover-caret', props.caretComponent.props.className)
                    }),
                    wrapperProps: _extends({}, props.wrapperProps, {
                        className: index('ui-popover', props.wrapperProps.className, (_cx = {}, defineProperty(_cx, 'ui-popover-anchor-x-' + getFrag(state.anchorXAlign), true), defineProperty(_cx, 'ui-popover-anchor-y-' + getFrag(state.anchorYAlign), true), defineProperty(_cx, 'ui-popover-self-x-' + getFrag(state.selfXAlign), true), defineProperty(_cx, 'ui-popover-self-y-' + getFrag(state.selfYAlign), true), _cx))
                    }) }))
            );
        }
    }]);
    return UIPopover;
}(React__default.PureComponent);

UIPopover.position = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};
UIPopover.positionValues = values(UIPopover.position);
UIPopover.preset = {
    'ABOVE': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.START,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.END
    },
    'BELOW': {
        anchorXAlign: UIPopover.position.MIDDLE,
        anchorYAlign: UIPopover.position.END,
        selfXAlign: UIPopover.position.MIDDLE,
        selfYAlign: UIPopover.position.START
    },
    'LEFT': {
        anchorXAlign: UIPopover.position.START,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.END,
        selfYAlign: UIPopover.position.MIDDLE
    },
    'RIGHT': {
        anchorXAlign: UIPopover.position.END,
        anchorYAlign: UIPopover.position.MIDDLE,
        selfXAlign: UIPopover.position.START,
        selfYAlign: UIPopover.position.MIDDLE
    }
};
UIPopover.presetValues = values(UIPopover.preset);
UIPopover.propTypes = _extends({}, UIDialog.propTypes, {
    anchor: React.PropTypes.oneOfType([React.PropTypes.instanceOf(HTMLElement), React.PropTypes.shape({
        props: React.PropTypes.object,
        state: React.PropTypes.object
    })]).isRequired,
    anchorXAlign: React.PropTypes.oneOf(UIPopover.positionValues),
    anchorYAlign: React.PropTypes.oneOf(UIPopover.positionValues),
    autoReposition: React.PropTypes.bool,
    caretComponent: React.PropTypes.element,
    portalProps: React.PropTypes.object,
    preset: React.PropTypes.oneOf(UIPopover.presetValues),
    selfXAlign: React.PropTypes.oneOf(UIPopover.positionValues),
    selfYAlign: React.PropTypes.oneOf(UIPopover.positionValues),
    wrapperProps: React.PropTypes.object
});
UIPopover.defaultProps = _extends({}, UIDialog.defaultProps, {
    anchor: document.body,
    anchorXAlign: undefined,
    anchorYAlign: undefined,
    autoReposition: true,
    captureFocus: false,
    caretComponent: DEFAULT_CARET_COMPONENT,
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    portalProps: {},
    preset: UIPopover.preset.BELOW,
    selfXAlign: undefined,
    selfYAlign: undefined,
    wrapperProps: {}
});
UIPopover.internalKeys = without(Object.keys(UIPopover.defaultProps), UIDialog.internalKeys);

/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 */

var UIProgress = function (_React$PureComponent) {
    inherits(UIProgress, _React$PureComponent);

    function UIProgress() {
        classCallCheck(this, UIProgress);
        return possibleConstructorReturn(this, (UIProgress.__proto__ || Object.getPrototypeOf(UIProgress)).apply(this, arguments));
    }

    createClass(UIProgress, [{
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return React__default.createElement(
                    'div',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: index('ui-progress-label', this.props.labelProps.className) }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'renderCancel',
        value: function renderCancel() {
            if (this.props.onCancel) {
                return React__default.createElement(UIButton, _extends({}, this.props.cancelProps, {
                    ref: 'cancel',
                    className: index('ui-progress-cancel', this.props.cancelProps.className),
                    onPressed: this.props.onCancel }));
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            return React__default.createElement('div', _extends({}, this.props.progressProps, {
                ref: 'progress',
                className: index('ui-progress', this.props.progressProps.className, {
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
                }),
                role: 'presentation',
                style: _extends({}, this.props.progressProps.style, defineProperty({}, this.props.tweenProperty, this.props.progress)) }));
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                this.props.component,
                _extends({}, omitKeysFromSourceObject(this.props, UIProgress.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-progress-wrapper', this.props.className) }),
                this.renderProgress(),
                this.renderLabel(),
                this.renderCancel()
            );
        }
    }]);
    return UIProgress;
}(React__default.PureComponent);

UIProgress.propTypes = {
    cancelProps: React.PropTypes.object,
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    progressProps: React.PropTypes.object,
    tweenProperty: React.PropTypes.string
};
UIProgress.defaultProps = {
    cancelProps: {},
    component: 'div',
    label: null,
    labelProps: {},
    onCancel: noop,
    progress: undefined,
    progressProps: {},
    tweenProperty: 'width'
};
UIProgress.internalKeys = Object.keys(UIProgress.defaultProps);

/**
 * Hide content until it's needed.
 */

var UIProgressiveDisclosure = function (_React$PureComponent) {
    inherits(UIProgressiveDisclosure, _React$PureComponent);

    function UIProgressiveDisclosure() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIProgressiveDisclosure.__proto__ || Object.getPrototypeOf(UIProgressiveDisclosure)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if (isFunction(_this.props.toggleProps.onClick)) {
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if (isFunction(_this.props.toggleProps.onKeyDown)) {
                _this.props.toggleProps.onKeyDown(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UIProgressiveDisclosure, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.expanded !== this.props.expanded) {
                this.setState({ expanded: newProps.expanded }, this.dispatchCallback);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            if (this.state.expanded) {
                return React__default.createElement(
                    'div',
                    { ref: 'content',
                        className: 'ui-disclosure-content' },
                    this.props.children
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                this.props.component,
                _extends({}, omitKeysFromSourceObject(this.props, UIProgressiveDisclosure.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-disclosure', this.props.className, {
                        'ui-disclosure-expanded': this.state.expanded
                    }) }),
                React__default.createElement(
                    'div',
                    _extends({}, this.props.toggleProps, {
                        ref: 'toggle',
                        className: index('ui-disclosure-toggle', this.props.toggleProps.className),
                        onClick: this.handleClick,
                        onKeyDown: this.handleKeyDown,
                        tabIndex: '0' }),
                    this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser
                ),
                this.renderContent()
            );
        }
    }]);
    return UIProgressiveDisclosure;
}(React__default.PureComponent);

UIProgressiveDisclosure.propTypes = {
    children: React.PropTypes.node,
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    expanded: React.PropTypes.bool,
    onExpand: React.PropTypes.func,
    onHide: React.PropTypes.func,
    teaser: React.PropTypes.node,
    teaserExpanded: React.PropTypes.node,
    toggleProps: React.PropTypes.object
};
UIProgressiveDisclosure.defaultProps = {
    children: null,
    component: 'div',
    expanded: false,
    onExpand: noop,
    onHide: noop,
    teaser: null,
    teaserExpanded: null,
    toggleProps: {}
};
UIProgressiveDisclosure.internalKeys = Object.keys(UIProgressiveDisclosure.defaultProps);

/**
 * An accessible radio form control.
 */

var UIRadio = function (_React$PureComponent) {
    inherits(UIRadio, _React$PureComponent);

    function UIRadio() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIRadio.__proto__ || Object.getPrototypeOf(UIRadio)).call.apply(_ref, [this].concat(args))), _this), _this.uuid = uuid(), _this.handleChange = function (event) {
            if (event.target.checked) {
                _this.props.onSelected(event.target.value);
            }

            /* istanbul ignore else */
            if (isFunction(_this.props.inputProps.onChange)) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UIRadio, [{
        key: 'renderInput',
        value: function renderInput() {
            return React__default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                type: 'radio',
                id: this.props.id || this.props.inputProps.id || this.uuid,
                className: index('ui-radio', this.props.inputProps.className, {
                    'ui-radio-selected': this.props.selected
                }),
                name: this.props.name,
                value: this.props.value,
                checked: this.props.selected,
                'aria-checked': String(this.props.selected),
                onChange: this.handleChange }));
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            if (this.props.label) {
                return React__default.createElement(
                    'label',
                    _extends({}, this.props.labelProps, {
                        ref: 'label',
                        className: index('ui-radio-label', this.props.labelProps.className),
                        htmlFor: this.props.id || this.props.inputProps.id || this.uuid }),
                    this.props.label
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIRadio.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-radio-wrapper', this.props.className) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);
    return UIRadio;
}(React__default.PureComponent);

UIRadio.propTypes = {
    inputProps: React.PropTypes.object,
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onSelected: React.PropTypes.func,
    selected: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired
};
UIRadio.defaultProps = {
    inputProps: {},
    label: null,
    labelProps: {},
    name: '',
    onSelected: noop,
    selected: false,
    value: ''
};
UIRadio.internalKeys = Object.keys(UIRadio.defaultProps);

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var index$2 = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

var isString = (function (test) {
  return typeof test === 'string';
});

var UITextualInput = function (_React$PureComponent) {
    inherits(UITextualInput, _React$PureComponent);

    function UITextualInput() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UITextualInput.__proto__ || Object.getPrototypeOf(UITextualInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            input: '',
            isControlled: isString(_this.props.inputProps.value),
            isFocused: false
        }, _this.setInputValue = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            return _this.setState({ input: value });
        }, _this.getValue = function () {
            return _this.refs.field.value;
        }, _this.handleBlur = function (event) {
            _this.setState({ isFocused: false });

            if (isFunction(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ isFocused: true });

            if (isFunction(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come
            // exclusively via props (cWRP) so it exactly mirrors the current application
            // state, otherwise a re-render will occur before the new text has completed its
            // feedback loop and the cursor position is lost
            if (_this.state.isControlled === false) {
                _this.setInputValue(event.target.value);
            }

            if (isFunction(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UITextualInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.state.isControlled === true) {
                return this.setInputValue(this.props.inputProps.value);
            }

            this.setInputValue(this.props.inputProps.defaultValue);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.inputProps.value !== this.props.inputProps.value) {
                this.setInputValue(nextProps.inputProps.value);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(nextValue) {
            this.setInputValue(nextValue);
            this.refs.field.value = nextValue;

            if (this.state.isControlled === true) {
                // simulate input change event flow
                this.refs.field.dispatchEvent(new Event('input', { bubbles: true }));
                this.refs.field.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }, {
        key: 'getPlaceholderText',
        value: function getPlaceholderText() {
            var isNonEmpty = this.state.input !== '';
            var shouldShowPlaceholder = this.props.hidePlaceholderOnFocus === true ? this.state.isFocused === false && isNonEmpty === false : isNonEmpty === false;

            return shouldShowPlaceholder ? this.props.inputProps.placeholder : '';
        }
    }, {
        key: 'renderPlaceholder',
        value: function renderPlaceholder() {
            return React__default.createElement(
                'div',
                { ref: 'placeholder', className: 'ui-textual-input-placeholder ui-textual-input' },
                this.getPlaceholderText()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;


            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(props, UITextualInput.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-textual-input-wrapper', props.className),
                    title: this.getPlaceholderText() }),
                this.renderPlaceholder(),
                React__default.createElement('input', _extends({}, props.inputProps, {
                    ref: 'field',
                    className: index('ui-textual-input', props.inputProps.className),
                    placeholder: null,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    onChange: this.handleChange }))
            );
        }
    }]);
    return UITextualInput;
}(React__default.PureComponent);

UITextualInput.propTypes = {
    hidePlaceholderOnFocus: React.PropTypes.bool,
    inputProps: React.PropTypes.shape({
        defaultValue: React.PropTypes.string,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onChange: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        type: React.PropTypes.string,
        value: React.PropTypes.string
    })
};
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
UITextualInput.internalKeys = Object.keys(UITextualInput.defaultProps);

/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 */

var UITypeaheadInput = function (_React$PureComponent) {
    inherits(UITypeaheadInput, _React$PureComponent);

    function UITypeaheadInput() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UITypeaheadInput.__proto__ || Object.getPrototypeOf(UITypeaheadInput)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UITypeaheadInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.inputProps.value || this.props.inputProps.defaultValue) {
                this.computeMatches();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mounted = true;

            if (this.state.selectedEntityIndex >= 0) {
                this.props.onEntityHighlighted(this.state.selectedEntityIndex);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.entities !== this.props.entities) {
                this.computeMatches(nextProps.entities);
            }

            if (nextProps.inputProps.value !== this.props.inputProps.value) {
                this.updateInputState(nextProps.inputProps.value);
                this.computeMatches();
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
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;
        }
    }, {
        key: 'handleMatchClick',
        value: function handleMatchClick(index$$1) {
            this.setState({ selectedEntityIndex: index$$1 }, this.setValueWithSelectedEntity);
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
        key: 'cursorAtEndOfInput',
        value: function cursorAtEndOfInput() {
            var node = this.getInputNode();

            return node.selectionStart === node.selectionEnd && node.selectionEnd === this.getValue().length;
        }
    }, {
        key: 'markFuzzyMatchSubstring',
        value: function markFuzzyMatchSubstring(input, entity) {
            var entityContent = entity.text;
            var frags = entityContent.split(new RegExp('(' + index$2(input) + ')', 'ig'));
            var normalizedUserText = input.toLowerCase();
            var threshold = frags.length;
            var i = -1;

            while (++i < threshold) {
                if (frags[i].toLowerCase() === normalizedUserText) {
                    frags[i] = React__default.createElement(
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

            return [React__default.createElement(
                'span',
                { key: '0' },
                entityContent.slice(0, indexStart)
            ), React__default.createElement(
                'mark',
                { key: '1', className: 'ui-typeahead-match-highlight' },
                entityContent.slice(indexStart, indexEnd)
            ), React__default.createElement(
                'span',
                { key: '2' },
                entityContent.slice(indexEnd)
            )];
        }
    }, {
        key: 'getMarkingFunction',
        value: function getMarkingFunction() {
            if (isString(this.props.algorithm)) {
                if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                    return this.markStartsWithMatchSubstring;
                }

                return this.markFuzzyMatchSubstring;
            } else if (isFunction(this.props.algorithm.marker)) {
                return this.props.algorithm.marker;
            }

            if (this.warnedMarker === undefined) {
                this.warnedMarker = true;
                console.warn('UITypeaheadInput: no `props.algorithm.marker` was provided; falling back to the default marking algorithm (FUZZY).');
            }

            return this.markFuzzyMatchSubstring;
        }
    }, {
        key: 'getFuzzyMatchIndexes',
        value: function getFuzzyMatchIndexes(userText, entities) {
            var normalized = userText.toLowerCase();

            return entities.reduce(function findIndexes(result, entity, index$$1) {
                return entity.text.toLowerCase().indexOf(normalized) !== -1 ? result.push(index$$1) && result : result;
            }, []);
        }
    }, {
        key: 'getStartsWithMatchIndexes',
        value: function getStartsWithMatchIndexes(userText, entities) {
            var seekValue = userText.toLowerCase();

            return entities.reduce(function seekMatch(results, entity, index$$1) {
                if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                    results.push(index$$1);
                }

                return results;
            }, []);
        }
    }, {
        key: 'getMatchingFunction',
        value: function getMatchingFunction() {
            if (isString(this.props.algorithm)) {
                if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                    return this.getStartsWithMatchIndexes;
                }

                return this.getFuzzyMatchIndexes;
            } else if (isFunction(this.props.algorithm.matcher)) {
                return this.props.algorithm.matcher;
            }

            if (this.warnedMatcher === undefined) {
                this.warnedMatcher = true;
                console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
            }

            return this.getFuzzyMatchIndexes;
        }
    }, {
        key: 'computeMatches',
        value: function computeMatches(providedEntities) {
            var _this2 = this;

            this.setState(function (state, props) {
                var entities = providedEntities || props.entities;
                var currentValue = state.input;
                var matches = currentValue === '' ? [] : _this2.getMatchIndexes(currentValue, entities);

                return {
                    selectedEntityIndex: matches.length ? matches[0] : -1,
                    entityMatchIndexes: matches
                };
            });
        }
    }, {
        key: 'renderNotification',
        value: function renderNotification() {
            return React__default.createElement(
                'div',
                {
                    ref: 'aria',
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
                var userText = this.state.input;
                var raw = this.getSelectedEntityText();
                var processed = '';

                if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                    processed = raw.replace(new RegExp(userText, 'i'), userText);
                }

                return React__default.createElement(
                    'div',
                    _extends({}, this.props.hintProps, {
                        ref: 'hint',
                        className: index('ui-textual-input', 'ui-textual-input-placeholder', 'ui-typeahead-hint', this.props.hintProps.className),
                        tabIndex: '-1' }),
                    processed
                );
            }
        }
    }, {
        key: 'renderMatches',
        value: function renderMatches() {
            var _this3 = this;

            if (this.state.entityMatchIndexes.length) {
                var props = this.props.matchWrapperProps;

                return React__default.createElement(
                    'div',
                    _extends({}, props, {
                        ref: 'matches',
                        className: index('ui-typeahead-match-wrapper', props.className) }),
                    this.state.entityMatchIndexes.map(function (index$$1) {
                        var entity = _this3.props.entities[index$$1];
                        var className = entity.className,
                            text = entity.text,
                            rest = objectWithoutProperties(entity, ['className', 'text']);


                        return React__default.createElement(
                            'div',
                            _extends({}, rest, {
                                ref: 'match_$' + index$$1,
                                className: index('ui-typeahead-match', className, {
                                    'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index$$1
                                }),
                                key: text,
                                onClick: _this3.handleMatchClick.bind(_this3, index$$1) }),
                            _this3.markMatchSubstring(_this3.state.input, entity)
                        );
                    })
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props,
                state = this.state;


            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(props, UITypeaheadInput.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-typeahead-wrapper', props.className),
                    onKeyDown: this.handleKeyDown }),
                this.renderNotification(),
                this.renderHint(),
                React__default.createElement(UITextualInput, _extends({}, extractChildProps(props, UITextualInput.defaultProps), {
                    ref: 'input',
                    'aria-controls': state.id,
                    inputProps: _extends({}, props.inputProps, {
                        className: index('ui-typeahead', props.inputProps.className),
                        onChange: this.handleChange
                    }) })),
                this.renderMatches()
            );
        }
    }]);
    return UITypeaheadInput;
}(React__default.PureComponent);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = _extends({}, UITextualInput.propTypes, {
    algorithm: React.PropTypes.oneOfType([React.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), React.PropTypes.shape({
        marker: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])]),
        matcher: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])])
    })]),
    clearPartialInputOnSelection: React.PropTypes.bool,
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string
    })),
    hint: React.PropTypes.bool,
    hintProps: React.PropTypes.object,
    matchWrapperProps: React.PropTypes.object,
    offscreenClass: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    onEntityHighlighted: React.PropTypes.func,
    onEntitySelected: React.PropTypes.func
});
UITypeaheadInput.defaultProps = _extends({}, UITextualInput.defaultProps, {
    algorithm: UITypeaheadInput.mode.FUZZY,
    clearPartialInputOnSelection: false,
    entities: [],
    hint: null,
    hintProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: noop,
    onEntityHighlighted: noop,
    onEntitySelected: noop
});
UITypeaheadInput.internalKeys = Object.keys(UITypeaheadInput.defaultProps);

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        entityMatchIndexes: [],
        id: uuid(),
        isControlled: isString(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };
    this.mounted = false;

    this.updateInputState = function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return _this4.setState({ input: value });
    };

    this.getSelectedEntityText = function () {
        var entity = _this4.props.entities[_this4.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        if (_this4.mounted) {
            _this4.setState({
                selectedEntityIndex: -1,
                entityMatchIndexes: []
            });
        }
    };

    this.getInputNode = function () {
        return _this4.refs.input.refs.field;
    };

    this.select = function () {
        var input = _this4.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this4.getValue().length;
    };

    this.focus = function () {
        return _this4.getInputNode().focus();
    };

    this.getValue = function () {
        return _this4.refs.input.getValue();
    };

    this.setValue = function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _this4.refs.input.setValue(value);

        _this4.updateInputState(value);
        _this4.resetMatches();
        _this4.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this4.props.onEntitySelected(_this4.state.selectedEntityIndex);

        if (_this4.props.clearPartialInputOnSelection) {
            _this4.setValue('');
        } else {
            _this4.setValue(_this4.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(_this4.resetMatches, 0);
    };

    this.markMatchSubstring = function () {
        return _this4.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this4.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleChange = function (event) {
        if (_this4.state.isControlled === false) {
            _this4.updateInputState(event.target.value);
            _this4.computeMatches();
        }

        if (isFunction(_this4.props.inputProps.onChange)) {
            _this4.props.inputProps.onChange(event);
        }
    };

    this.handleKeyDown = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                if (event.target.selectionStart > 1) {
                    event.stopPropagation();
                }

                break;

            case 'Tab':
            case 'ArrowRight':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.cursorAtEndOfInput() && _this4.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this4.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this4.selectMatch(-1);
                _this4.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this4.selectMatch(1);
                _this4.focus();
                break;

            case 'Escape':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.getInputNode() === event.target) {
                    _this4.resetMatches();
                }

                break;

            case 'Enter':
                if (_this4.state.selectedEntityIndex !== -1 && _this4.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this4.setValueWithSelectedEntity();
                } else {
                    _this4.props.onComplete(_this4.state.input, event);
                }

                break;
        }

        if (isFunction(_this4.props.onKeyDown)) {
            _this4.props.onKeyDown(event);
        }
    };
};

var first = function first(array) {
    return array[0];
};
var last = function last(array) {
    return array[array.length - 1];
};

/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 */

var UITokenizedInput = function (_React$PureComponent) {
    inherits(UITokenizedInput, _React$PureComponent);

    function UITokenizedInput() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UITokenizedInput.__proto__ || Object.getPrototypeOf(UITokenizedInput)).call.apply(_ref, [this].concat(args))), _this), _this.focus = function () {
            return _this.refs.typeahead.focus();
        }, _this.getInputNode = function () {
            return _this.refs.typeahead.getInputNode();
        }, _this.getSelectedEntityText = function () {
            return _this.refs.typeahead.getSelectedEntityText();
        }, _this.getValue = function () {
            return _this.refs.typeahead.getValue();
        }, _this.select = function () {
            return _this.refs.typeahead.select();
        }, _this.setValue = function (value) {
            return _this.refs.typeahead.setValue(value);
        }, _this.add = function (index$$1) {
            if (_this.props.tokens.indexOf(index$$1) === -1) {
                _this.props.handleAddToken(index$$1);
            }
        }, _this.handleInputClick = function (event) {
            _this.clearSelection();

            if (isFunction(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if (isFunction(_this.props.inputProps.onFocus)) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.which) {
                case 37:
                    // left arrow
                    _this.selectPreviousToken(event.shiftKey);
                    break;

                case 39:
                    // right arrow
                    _this.selectNextToken(event.shiftKey);
                    break;

                case 8:
                    // backspace
                    if (_this.props.tokensSelected.length) {
                        _this.remove(_this.props.tokensSelected);
                        _this.focus();
                    }

                    break;

                case 65:
                    // letter "a"
                    if (event.metaKey) {
                        event.preventDefault();

                        _this.focus();
                        _this.select();

                        // hacky, but the only way unless we move selection management internal again
                        _this._suppressNextTokenSelection = true;

                        _this.props.handleNewSelection(_this.props.tokens);
                    } // "cmd"
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(UITokenizedInput, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var previousSelectedIndexes = prevProps.tokensSelected;
            var currentSelectedIndexes = this.props.tokensSelected;

            if (this.props.tokens.length > prevProps.tokens.length) {
                this.setValue('');
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

        // passthroughs to UITypeaheadInput instance methods

    }, {
        key: 'remove',
        value: function remove(index$$1) {
            var _this2 = this;

            var indexes = (Array.isArray(index$$1) ? index$$1 : [index$$1]).filter(function (idx) {
                return _this2.props.tokens.indexOf(idx) !== -1;
            });

            if (indexes.length) {
                this.props.handleRemoveTokens(indexes);
            }
        }
    }, {
        key: 'selectToken',
        value: function selectToken(index$$1) {
            this.props.handleNewSelection([index$$1]);
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
                this.focus();
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
        key: 'handleTokenCloseClick',
        value: function handleTokenCloseClick(index$$1, event) {
            // if we don't stop propagation, the event bubbles and results in a failed token selection
            event.stopPropagation();

            this.remove(index$$1);
            this.focus();

            if (this.props.tokenCloseComponent.props.onClick) {
                this.props.tokenCloseComponent.props.onClick(event);
            }
        }
    }, {
        key: 'renderTokenClose',
        value: function renderTokenClose(index$$1) {
            if (this.props.tokenCloseVisible) {
                return React__default.cloneElement(this.props.tokenCloseComponent, {
                    className: index('ui-tokenfield-token-close', this.props.tokenCloseComponent.props.className),
                    onClick: this.handleTokenCloseClick.bind(this, index$$1)
                });
            }
        }
    }, {
        key: 'handleTokenKeyDown',
        value: function handleTokenKeyDown(index$$1, event) {
            switch (event.which) {
                case 13: // enter
                case 32:
                    // space
                    this.selectToken(index$$1);
                    event.preventDefault();
                    break;

                case 8:
                    // backspace
                    this.remove(index$$1);
                    this.focus();
                    event.preventDefault();
                    break;
            }
        }
    }, {
        key: 'renderTokens',
        value: function renderTokens() {
            var _this3 = this;

            return React__default.createElement(
                'div',
                { className: 'ui-tokenfield-tokens' },
                this.props.tokens.map(function (index$$1) {
                    return React__default.createElement(
                        'div',
                        {
                            ref: 'token_' + index$$1,
                            key: index$$1,
                            className: index('ui-tokenfield-token', {
                                'ui-tokenfield-token-selected': _this3.props.tokensSelected.indexOf(index$$1) !== -1
                            }),
                            onClick: _this3.selectToken.bind(_this3, index$$1),
                            onKeyDown: _this3.handleTokenKeyDown.bind(_this3, index$$1),
                            tabIndex: '0' },
                        _this3.props.entities[index$$1].text,
                        _this3.renderTokenClose(index$$1)
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UITokenizedInput.internalKeys), {
                    ref: 'wrapper',
                    className: index('ui-tokenfield-wrapper', this.props.className),
                    onKeyDown: this.handleKeyDown }),
                this.renderTokens(),
                React__default.createElement(UITypeaheadInput, _extends({}, extractChildProps(this.props, UITypeaheadInput.defaultProps), {
                    ref: 'typeahead',
                    className: 'ui-tokenfield',
                    clearPartialInputOnSelection: true,
                    inputProps: _extends({}, this.props.inputProps, {
                        onClick: this.handleInputClick,
                        onFocus: this.handleInputFocus
                    }),
                    onEntitySelected: this.add }))
            );
        }
    }]);
    return UITokenizedInput;
}(React__default.PureComponent);

UITokenizedInput.propTypes = _extends({}, UITypeaheadInput.propTypes, {
    handleAddToken: React.PropTypes.func,
    handleRemoveTokens: React.PropTypes.func,
    handleNewSelection: React.PropTypes.func,
    tokenCloseComponent: React.PropTypes.element,
    tokenCloseVisible: React.PropTypes.bool,
    tokens: React.PropTypes.arrayOf(React.PropTypes.number),
    tokensSelected: React.PropTypes.arrayOf(React.PropTypes.number)
});
UITokenizedInput.defaultProps = _extends({}, UITypeaheadInput.defaultProps, {
    handleAddToken: noop,
    handleRemoveTokens: noop,
    handleNewSelection: noop,
    tokenCloseComponent: React__default.createElement(
        'div',
        null,
        'X'
    ),
    tokenCloseVisible: true,
    tokens: [],
    tokensSelected: []
});
UITokenizedInput.internalKeys = Object.keys(UITokenizedInput.defaultProps);

/**
 * A wrapper that displays provided text on hover.
 */

var UITooltip = function (_React$PureComponent) {
    inherits(UITooltip, _React$PureComponent);

    function UITooltip() {
        classCallCheck(this, UITooltip);
        return possibleConstructorReturn(this, (UITooltip.__proto__ || Object.getPrototypeOf(UITooltip)).apply(this, arguments));
    }

    createClass(UITooltip, [{
        key: 'render',
        value: function render() {
            var position = this.props.position;


            return React__default.createElement(
                this.props.component,
                _extends({}, omitKeysFromSourceObject(this.props, UITooltip.internalKeys), {
                    className: index('ui-tooltip', this.props.className, {
                        'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                        'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                        'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                        'ui-tooltip-position-after': position === UITooltip.position.AFTER
                    }),
                    'data-tooltip': this.props.text,
                    'aria-label': this.props['aria-label'] || this.props.text }),
                this.props.children
            );
        }
    }]);
    return UITooltip;
}(React__default.PureComponent);

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};
UITooltip.propTypes = {
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    position: React.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: React.PropTypes.string
};
UITooltip.defaultProps = {
    component: 'div',
    position: UITooltip.position.ABOVE,
    text: ''
};
UITooltip.internalKeys = Object.keys(UITooltip.defaultProps);

/**
 * Trigger native toasts in supporting browsers.
 * @class UINotificationService
 */

var errors = {
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
        } else if (isString(config.body) === false) {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if (isString(config.header) === false) {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && isString(config.icon) === false) {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && isFunction(config.onClick) === false) {
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

/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

var UIUtils = { extractChildProps: extractChildProps, notify: notify, transformProperty: transformProp, uuid: uuid };

exports.UIUtils = UIUtils;
exports.UIArrowKeyNavigation = UIArrowKeyNavigation;
exports.UIButton = UIButton;
exports.UICheckbox = UICheckbox;
exports.UICheckboxGroup = UICheckboxGroup;
exports.UIDialog = UIDialog;
exports.UIFittedText = UIFittedText;
exports.UIImage = UIImage;
exports.UIModal = UIModal;
exports.UIPagination = UIPagination;
exports.UIPopover = UIPopover;
exports.UIPortal = UIPortal;
exports.UIProgress = UIProgress;
exports.UIProgressiveDisclosure = UIProgressiveDisclosure;
exports.UIRadio = UIRadio;
exports.UISegmentedControl = UISegmentedControl;
exports.UITokenizedInput = UITokenizedInput;
exports.UITextualInput = UITextualInput;
exports.UITypeaheadInput = UITypeaheadInput;
exports.UITooltip = UITooltip;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXg6IDAsXG4gICAgICAgIG1vZGU6IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlBcnJvd0tleU5hdmlnYXRpb24uZGVmYXVsdFByb3BzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVtpbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiBpbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS1za2lwJzogcGFyc2VJbnQoY2hpbGQucHJvcHMudGFiSW5kZXgsIDEwKSA9PT0gLTEgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLmNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICBvbkNsaWNrOiBub29wLFxuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgICAgICBwcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLmRlZmF1bHRQcm9wcylcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWJ1dHRvbicsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEFkZGVkIGEgcHJlZml4IHNvIHRoZSBnZW5lcmF0ZWQgSUQgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyBhbiBIVE1MIElELlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIHVpa2l0LTFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuICd1aWtpdC0nICsgKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IG51bGwsXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5jaGVja2VkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94LmRlZmF1bHRQcm9wcylcblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcy5pbnB1dFByb3BzLCAnaW5kZXRlcm1pbmF0ZScpfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktY2hlY2tib3gnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktY2hlY2tib3gtbGFiZWwnLCB0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWNoZWNrYm94LXdyYXBwZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG4vKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzKVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHtpbnB1dFByb3BzfSA9IHRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnLCB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBhbGxDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogIWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0UHJvcHMgJiYgaW5wdXRQcm9wcy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlucHV0UHJvcHMubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnY2Jfc2VsZWN0X2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmxhYmVsIHx8ICdTZWxlY3QgQWxsJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveEdyb3VwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1jaGVja2JveC1ncm91cCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgY29uc3QgUE9SVEFMX0RBVEFfQVRUUklCVVRFID0gJ2RhdGEtcG9ydGFsLWlkJztcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBjb21wb25lbnQgZm9yIHRoZSByZW5kZXJpbmcgb2YgY29tcG9uZW50cyBvdXRzaWRlIHRoZSBub3JtYWwgUmVhY3QgdHJlZS5cbiAqIE9ubHkgYWNjZXB0cyBhIHNpbmdsZSB0b3AtbGV2ZWwgY2hpbGQ7IG5ha2VkIHRleHQsIGV0YyB3aWxsIGJlIHdyYXBwZWQgaW4gYSA8ZGl2Pi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC8vIHNpbmdsZSBjaGlsZCBvbmx5IC0gYXJyYXlzIG5vdCBhbGxvd2VkXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICBkZXN0aW5hdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgZGVzdGluYXRpb246IGRvY3VtZW50LmJvZHksXG4gICAgICAgIHBvcnRhbElkOiBudWxsLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBvcnRhbC5kZWZhdWx0UHJvcHMpXG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgLy8gdGhlIDxkaXY+IHRoYXQgdGhlIGNoaWxkcmVuIGFyZSByZW5kZXJlZCBpbnRvXG4gICAgJHBvcnRhbCA9IG51bGxcblxuICAgIC8vIHRoZSB0b3AtbGV2ZWwgY2hpbGQgcmVuZGVyZWQgaW50byB0aGUgJHBvcnRhbFxuICAgICRwYXNzZW5nZXIgPSBudWxsO1xuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRwb3J0YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5hcHBlbmRDaGlsZCh0aGlzLiRwb3J0YWwpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpO1xuICAgIH1cblxuICAgIHJlbmRlclBvcnRhbGxlZENvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbikgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogKDxkaXY+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvcnRhbCBJRCBsaW5rIGlmIG5lZWRlZFxuICAgICAgICB0aGlzLiRwb3J0YWwuaWQgPSB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWQ7XG5cbiAgICAgICAgUmVhY3RET00ucmVuZGVyKGNoaWxkLCB0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLiRwYXNzZW5nZXIgPSB0aGlzLiRwb3J0YWwuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkgeyB0aGlzLnJlbmRlclBvcnRhbGxlZENvbnRlbnQoKTsgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kcG9ydGFsKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5yZW1vdmVDaGlsZCh0aGlzLiRwb3J0YWwpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQb3J0YWwuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICB7Li4ue1tQT1JUQUxfREFUQV9BVFRSSUJVVEVdOiB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWR9fSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQge1BPUlRBTF9EQVRBX0FUVFJJQlVURX0gZnJvbSAnLi4vVUlQb3J0YWwnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuY29uc3QgdG9BcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFmdGVyOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYmVmb3JlOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYm9keVByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFmdGVyOiBudWxsLFxuICAgICAgICBiZWZvcmU6IG51bGwsXG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyOiBudWxsLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlcjogbnVsbCxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5kZWZhdWx0UHJvcHMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgY29uc3Qgcm9vdHMgPSBbdGhpcy4kd3JhcHBlcl0uY29uY2F0KFxuICAgICAgICAgICAgdG9BcnJheS5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuJHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChgWyR7UE9SVEFMX0RBVEFfQVRUUklCVVRFfV1gKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZShQT1JUQUxfREFUQV9BVFRSSUJVVEUpKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlO1xuXG4gICAgICAgIHJldHVybiByb290cy5zb21lKChkb20pID0+IGRvbS5jb250YWlucyhlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucHJvcHMub25DbG9zZSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1kaWFsb2ctYm9keScsIHRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktZGlhbG9nLWZvb3RlcicsIHRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZy1oZWFkZXInLCB0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kd3JhcHBlciA9IG5vZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZy13cmFwcGVyJywgdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZyc6IHRydWUsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jdGlvbixcbiAgICAgICAgXSksXG4gICAgICAgIG1heEZvbnRTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICBjb21wb25lbnQ6ICdzcGFuJyxcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5kZWZhdWx0UHJvcHMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRleHQnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC90aGlzLnByb3BzLmNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFsdDogbnVsbCxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBmYWxzZSxcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHNyYzogJ2Fib3V0OmJsYW5rJyxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2UnLCB0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2UnLCB0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWltYWdlLXN0YXR1cycsIHRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2Utd3JhcHBlcicsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgcHJvcHMgbGlzdGVkIGluIHRoZSBwcm9wVHlwZXMgb2YgYSBjaGlsZCBjb21wb25lbnRcbiAqIGUuZy4gdXNlZCBpbiBVSVR5cGVhaGVhZElucHV0IHRvIGlkZW50aWZ5IHdoaWNoIHByb3BzIGFyZSBtZWFudCBmb3IgVUlUZXh0dWFsSW5wdXRcbiAqIEBtb2R1bGUgVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wc1xuICpcbiAqIEBwYXJhbSAge09iamVjdH0gcGFyZW50UHJvcHMgICAgIHByb3BzIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNoaWxkUHJvcFR5cGVzICBwcm9wVHlwZXMgb2YgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgcHJvcHMgdG8gYmUgc3ByZWFkIGFwcGxpZWQgdG8gYSBjaGlsZCBjb21wb25lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0Q2hpbGRQcm9wcyhwYXJlbnRQcm9wcywgY2hpbGRQcm9wVHlwZXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hpbGRQcm9wVHlwZXMpLnJlZHVjZSgoY2hpbGRQcm9wcywga2V5KSA9PiB7XG4gICAgICAgIGlmIChwYXJlbnRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICBjaGlsZFByb3BzW2tleV0gPSBwYXJlbnRQcm9wc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkUHJvcHM7XG4gICAgfSwge30pO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlQb3J0YWwgZnJvbSAnLi4vVUlQb3J0YWwnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIG1hc2tQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbW9kYWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgcG9ydGFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIG1hc2tQcm9wczoge30sXG4gICAgICAgIG1vZGFsUHJvcHM6IHt9LFxuICAgICAgICBwb3J0YWxQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJTW9kYWwuZGVmYXVsdFByb3BzKVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJUG9ydGFsIHsuLi5wcm9wcy5wb3J0YWxQcm9wc30+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlNb2RhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kbW9kYWwgPSBub2RlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktbW9kYWwtd3JhcHBlcicsIHByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktbW9kYWwtbWFzaycsIHByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUpfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSURpYWxvZy5kZWZhdWx0UHJvcHMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1tb2RhbCcsIHByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvVUlEaWFsb2c+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1VJUG9ydGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsXG4gICAgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BOdW1iZXIuaXNJbnRlZ2VyYF0oaHR0cHM6Ly9tZG4uaW8vTnVtYmVyL2lzSW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzSW50ZWdlcigzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcignMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPT0gdG9JbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gdG9GaW5pdGUodmFsdWUpLFxuICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ludGVnZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvbk9wdGlvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLmRlZmF1bHRQcm9wcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbicsIGRlZmluaXRpb24uY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1zZWdtZW50ZWQtY29udHJvbCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNvbnN0IGlkZW50aXR5ID0gKHgpID0+IHg7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcHJvbWlzZXMgYXMgY2hpbGRyZW4gYW5kIGV2ZW50dWFsbHkgZG9pbmcgc29tZXRoaW5nIHdpdGggdGhlaXIgcmVzb2x2ZWQgcGF5bG9hZC5cbiAqL1xuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbnZlcnRUb0pTWEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb252ZXJ0VG9KU1hGdW5jOiBub29wLFxuICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICBldmVuOiB0cnVlLFxuICAgICAgICBpbmRleDogMCxcbiAgICAgICAgbG9hZGluZ0NvbnRlbnQ6IG51bGwsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKEl0ZW0uZGVmYXVsdFByb3BzKVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG4gICAgc3RhdGUgPSB7fVxuXG4gICAgY29udmVydERhdGFUb0pTWE9yV2FpdChwcm9wcyA9IHRoaXMucHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLmRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21wb25lbnQ6IG51bGx9KTtcblxuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVByb21pc2UgPSBwcm9wcy5kYXRhO1xuXG4gICAgICAgICAgICBwcm9wcy5kYXRhLnRoZW4oKHJlc29sdmVkUGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIGN1cnJlbnRQcm9wcykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogY3VycmVudFByb3BzLmRhdGEgPT09IGNsb3N1cmVQcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY3VycmVudFByb3BzLmNvbnZlcnRUb0pTWEZ1bmMocmVzb2x2ZWRQYXlsb2FkLCBjdXJyZW50UHJvcHMuaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RhdGUuY29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSAvLyBvbmx5IHJlcGxhY2UgaWYgd2UncmUgbG9va2luZyBhdCB0aGUgc2FtZSBwcm9taXNlLCBvdGhlcndpc2UgZG8gbm90aGluZ1xuICAgICAgICAgICAgfSwgbm9vcCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudDogcHJvcHMuY29udmVydFRvSlNYRnVuYyhwcm9wcy5kYXRhLCBwcm9wcy5pbmRleCl9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSAgICAgICAgICAgICAgICAgeyB0aGlzLmNvbnZlcnREYXRhVG9KU1hPcldhaXQoKTsgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkgICAgICAgICAgICAgICAgICB7IHRoaXMubW91bnRlZCA9IHRydWU7IH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykgeyB0aGlzLmNvbnZlcnREYXRhVG9KU1hPcldhaXQobmV4dFByb3BzKTsgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkgICAgICAgICAgICAgICB7IHRoaXMubW91bnRlZCA9IGZhbHNlOyB9XG5cbiAgICBnZXRDbGFzc2VzKGV4dHJhQ2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gY3goJ3VpLXBhZ2luYXRpb24taXRlbScsIGV4dHJhQ2xhc3Nlcywge1xuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5jb21wb25lbnQgPT09IG51bGwsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcG9uZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpfSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NlcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ0NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnN0YXRlLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyksXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyh0aGlzLnN0YXRlLmNvbXBvbmVudC5wcm9wcyAmJiB0aGlzLnN0YXRlLmNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiB0aGlzLnByb3BzLmluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgcGFnaW5nIHRoZSBkaXNwbGF5IG9mIG1hbnkgZGF0YSBpdGVtcywgcG9zc2libHkgdmFyeWluZyBpbiBET00gbGF5b3V0L3NpemUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBjb250cm9scyA9IHtcbiAgICAgICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgICAgICBORVhUOiAnTkVYVCcsXG4gICAgICAgIExBU1Q6ICdMQVNUJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25zID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjdXN0b21Db250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGdldEl0ZW06IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgICAgICBpbml0aWFsUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVJbml0aWFsUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKGlzSW50ZWdlcihwcm9wcy5pbml0aWFsUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5pbml0aWFsUGFnZSA8IDEgfHwgcHJvcHMuaW5pdGlhbFBhZ2UgPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYGluaXRpYWxQYWdlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgJyArIG51bWJlck9mUGFnZXMgKyAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGl0ZW1Mb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICAgICAgaWYgKGlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnBvc2l0aW9ucykpLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd1BhZ2luYXRpb25TdGF0ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0b3RhbEl0ZW1zOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IG51bGwsXG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaWRlbnRpZmllcjogdXVpZCgpLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbUxvYWRpbmdDb250ZW50OiBudWxsLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBpZGVudGl0eSxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogJ8KrIEZpcnN0JyxcbiAgICAgICAganVtcFRvTGFzdENvbnRyb2xDb250ZW50OiAnTGFzdCDCuycsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiAnTmV4dCDigLonLFxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgICAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICAgICAgcG9zaXRpb246IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMuQUJPVkUsXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiAn4oC5IFByZXZpb3VzJyxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICAgICAgc2hvd1BhZ2luYXRpb25TdGF0ZTogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlV3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgdG90YWxJdGVtczogbnVsbCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gKGkpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpc0Z1bmN0aW9uKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1wYWdpbmF0aW9uLWl0ZW1zJywgcHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2VuZXJhdGVJdGVtcygpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0VG9KU1hGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXhPZmZzZXQgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQ29udGVudD17dGhpcy5wcm9wcy5pdGVtTG9hZGluZ0NvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICggICB0aGlzLnByb3BzLmhpZGVQYWdlcklmTm90TmVlZGVkXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLnRvdGFsSXRlbXMgPD0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXIgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkNhcGl0YWxpemVkID0gcG9zaXRpb25Mb3dlclswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlci5zbGljZSgxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2BzZWdtZW50ZWRDb250cm9sJHtwb3NpdGlvbkNhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcGFnaW5hdGlvbi1jb250cm9scycsIHByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBbYHVpLXBhZ2luYXRpb24tY29udHJvbHMtJHtwb3NpdGlvbkxvd2VyfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0aW9uJz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5BQk9WRSB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQkVMT1cgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUGFnaW5hdGlvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1wYWdpbmF0aW9uLXdyYXBwZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyMSwgYXJyMikgeyByZXR1cm4gYXJyMS5maWx0ZXIoKGl0ZW0pID0+IGFycjIuaW5kZXhPZihpdGVtKSA9PT0gLTEpOyB9XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSAgICAgICAgIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IG9ialtrZXldKTsgfVxuXG5jb25zdCBERUZBVUxUX0NBUkVUX0NPTVBPTkVOVCA9IChcbiAgICA8c3ZnIHZpZXdCb3g9JzAgMCAxNCA5LjUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+XG4gICAgICAgIDxnPlxuICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWJvcmRlcicgZmlsbD0nIzAwMCcgcG9pbnRzPSc3IDAgMTQgMTAgMCAxMCcgLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1maWxsJyBmaWxsPScjRkZGJyBwb2ludHM9JzYuOTgyMzA0NDQgMS43NSAxMi43NSAxMCAxLjI1IDEwJyAvPlxuICAgICAgICA8L2c+XG4gICAgPC9zdmc+XG4pO1xuXG4vKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uVmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wb3NpdGlvbilcblxuICAgIHN0YXRpYyBwcmVzZXQgPSB7XG4gICAgICAgICdBQk9WRSc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIH0sXG4gICAgICAgICdCRUxPVyc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIH0sXG4gICAgICAgICdMRUZUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICAgICAgJ1JJR0hUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlc2V0VmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wcmVzZXQpXG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBwb3J0YWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgcHJlc2V0OiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnByZXNldFZhbHVlcyksXG4gICAgICAgIHNlbGZYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBzZWxmWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYW5jaG9yOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICBhbmNob3JYQWxpZ246IHVuZGVmaW5lZCxcbiAgICAgICAgYW5jaG9yWUFsaWduOiB1bmRlZmluZWQsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogREVGQVVMVF9DQVJFVF9DT01QT05FTlQsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwb3J0YWxQcm9wczoge30sXG4gICAgICAgIHByZXNldDogVUlQb3BvdmVyLnByZXNldC5CRUxPVyxcbiAgICAgICAgc2VsZlhBbGlnbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWxmWUFsaWduOiB1bmRlZmluZWQsXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLmRlZmF1bHRQcm9wcyksIFVJRGlhbG9nLmludGVybmFsS2V5cylcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogcHJvcHMuYW5jaG9yWEFsaWduIHx8IHByb3BzLnByZXNldC5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHByb3BzLmFuY2hvcllBbGlnbiB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogcHJvcHMuc2VsZlhBbGlnbiAgICAgfHwgcHJvcHMucHJlc2V0LnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBwcm9wcy5zZWxmWUFsaWduICAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZllBbGlnbixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvclJlY3QgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5hbmNob3JMZWZ0ID0gYW5jaG9yUmVjdC5sZWZ0O1xuICAgICAgICB0aGlzLmFuY2hvclRvcCA9IGFuY2hvclJlY3QudG9wO1xuICAgICAgICB0aGlzLmFuY2hvckhlaWdodCA9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICB0aGlzLmFuY2hvcldpZHRoID0gYW5jaG9yUmVjdC53aWR0aDtcblxuICAgICAgICB0aGlzLmJvZHlMZWZ0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuICAgICAgICB0aGlzLmJvZHlUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBnZXROZXh0Q2FyZXRYUG9zaXRpb24oYW5jaG9yLCBjYXJldCA9IHRoaXMuJGNhcmV0KSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ24sIGFuY2hvcllBbGlnbiwgc2VsZllBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSAwO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBjaGFuZ2UgdGhlIFggcG9zaXRpb24gd2hlbiB3ZSdyZVxuICAgICAgICAvLyBmdWxseSBhYm92ZSBvciBiZWxvdyB0aGUgYW5jaG9yIGFuZCBzZWxmWEFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWEFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRZID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBZIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIGFuY2hvciAoc3RhcnQsZW5kIHwgZW5kLHN0YXJ0KVxuICAgICAgICAvLyBzZWxmWUFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWUFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuYW5jaG9ySGVpZ2h0IC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSB0aGlzLmFuY2hvckxlZnQgKyB0aGlzLmJvZHlMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLmRpYWxvZy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gdGhpcy5hbmNob3JUb3AgKyB0aGlzLmJvZHlUb3A7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7Li4udGhpcy5zdGF0ZX07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWRBbGlnbm1lbnRDaGFuZ2UobmV4dEFsaWdubWVudCwgY3VycmVudEFsaWdubWVudCA9IHRoaXMuc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICAgIG5leHRBbGlnbm1lbnQuYW5jaG9yWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvclhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5hbmNob3JZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWUFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZlhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZZQWxpZ247XG4gICAgfVxuXG4gICAgYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcik7XG5cbiAgICAgICAgY29uc3QgZHggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbihhbmNob3IpKTtcbiAgICAgICAgY29uc3QgZHkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IpKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhkeCwgZHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIHRoaXMuZGlkQWxpZ25tZW50Q2hhbmdlKGFsaWdubWVudENvcnJlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5kaWFsb2cuJHdyYXBwZXIsIGR4LCBkeSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHsgdGhpcy5hbGlnbigpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTsgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge2dldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ6IGdldEZyYWcsIHByb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gKHRoaXMuZGlhbG9nID0gaW5zdGFuY2UpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3Zlci1jYXJldCcsIHByb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMud3JhcHBlclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3ZlcicsIHByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8L1VJUG9ydGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJvZ3Jlc3M6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgICBsYWJlbDogbnVsbCxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2FuY2VsOiBub29wLFxuICAgICAgICBwcm9ncmVzczogdW5kZWZpbmVkLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5kZWZhdWx0UHJvcHMpXG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1wcm9ncmVzcy1sYWJlbCcsIHRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1wcm9ncmVzcy1jYW5jZWwnLCB0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcHJvZ3Jlc3MnLCB0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuY29tcG9uZW50XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzcy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1wcm9ncmVzcy13cmFwcGVyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIGV4cGFuZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRlYXNlcjogbnVsbCxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IG51bGwsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuZGVmYXVsdFByb3BzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jb21wb25lbnRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1kaXNjbG9zdXJlJywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJywgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvdGhpcy5wcm9wcy5jb21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25TZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWw6IG51bGwsXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUmFkaW8uZGVmYXVsdFByb3BzKVxuXG4gICAgdXVpZCA9IHV1aWQoKVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1yYWRpbycsIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1yYWRpby1sYWJlbCcsIHRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXJhZGlvLXdyYXBwZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbnB1dFZhbHVlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5maWVsZC52YWx1ZVxuXG4gICAgc2V0VmFsdWUobmV4dFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICB0aGlzLnJlZnMuZmllbGQudmFsdWUgPSBuZXh0VmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBzaW11bGF0ZSBpbnB1dCBjaGFuZ2UgZXZlbnQgZmxvd1xuICAgICAgICAgICAgdGhpcy5yZWZzLmZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICAgICAgdGhpcy5yZWZzLmZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNGb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIGZvciBcImNvbnRyb2xsZWRcIiBzY2VuYXJpb3MsIHVwZGF0ZXMgdG8gdGhlIGNhY2hlZCBpbnB1dCB0ZXh0IHNob3VsZCBjb21lXG4gICAgICAgIC8vIGV4Y2x1c2l2ZWx5IHZpYSBwcm9wcyAoY1dSUCkgc28gaXQgZXhhY3RseSBtaXJyb3JzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uXG4gICAgICAgIC8vIHN0YXRlLCBvdGhlcndpc2UgYSByZS1yZW5kZXIgd2lsbCBvY2N1ciBiZWZvcmUgdGhlIG5ldyB0ZXh0IGhhcyBjb21wbGV0ZWQgaXRzXG4gICAgICAgIC8vIGZlZWRiYWNrIGxvb3AgYW5kIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbG9zdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzTm9uRW1wdHkgPSB0aGlzLnN0YXRlLmlucHV0ICE9PSAnJztcbiAgICAgICAgY29uc3Qgc2hvdWxkU2hvd1BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNGb2N1c2VkID09PSBmYWxzZSAmJiBpc05vbkVtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNOb25FbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZFNob3dQbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciA6ICcnO1xuICAgIH1cblxuICAgIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXIgdWktdGV4dHVhbC1pbnB1dCc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVGV4dHVhbElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcicsIHByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRleHR1YWwtaW5wdXQnLCBwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmltcG9ydCBVSVRleHR1YWxJbnB1dCBmcm9tICcuLi9VSVRleHR1YWxJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG4vKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgICdTVEFSVFNfV0lUSCc6ICdTVEFSVFNfV0lUSCcsXG4gICAgICAgICdGVVpaWSc6ICdGVVpaWScsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBhbGdvcml0aG06IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtYXRjaGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgaGludDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGhpbnRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYWxnb3JpdGhtOiBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICBlbnRpdGllczogW10sXG4gICAgICAgIGhpbnQ6IG51bGwsXG4gICAgICAgIGhpbnRQcm9wczoge30sXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBub29wLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICBpc0NvbnRyb2xsZWQ6IGlzU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSksXG4gICAgICAgIGlucHV0OiB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWVcbiAgICAgICAgICAgICAgIHx8ICcnLFxuICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIHVwZGF0ZUlucHV0U3RhdGUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHZhbHVlfSlcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGRcblxuICAgIHNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cyA9ICgpID0+IHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKClcblxuICAgIHNldFZhbHVlID0gKHZhbHVlID0gJycpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIHVwY29taW5nIHJlbmRlciB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJ5IGBzZXRWYWx1ZWBcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5yZXNldE1hdGNoZXMsIDApO1xuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hcmtlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdHMsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXRjaGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKHByb3ZpZGVkRW50aXRpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRpdGllcyA9IHByb3ZpZGVkRW50aXRpZXMgfHwgcHJvcHMuZW50aXRpZXM7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0LCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInLCBwcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktdHlwZWFoZWFkLW1hdGNoJywgY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXR5cGVhaGVhZC13cmFwcGVyJywgcHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPFVJVGV4dHVhbElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17c3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KCd1aS10eXBlYWhlYWQnLCBwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmNvbnN0IGZpcnN0ID0gKGFycmF5KSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSAoYXJyYXkpID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG4vKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5kZWZhdWx0UHJvcHMpXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gKHZhbHVlKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKChpZHgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGlkeCkgIT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGgpIHsgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmVUb2tlbnMoaW5kZXhlcyk7IH1cbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbihpbmRleCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbnMoaW5kZXhlcykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihpbmRleGVzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGxhc3QoaW5kZXhlcykpO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbXSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4LCBldmVudCkge1xuICAgICAgICAvLyBpZiB3ZSBkb24ndCBzdG9wIHByb3BhZ2F0aW9uLCB0aGUgZXZlbnQgYnViYmxlcyBhbmQgcmVzdWx0cyBpbiBhIGZhaWxlZCB0b2tlbiBzZWxlY3Rpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnLCB0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRva2VuZmllbGQtdG9rZW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb2tlbml6ZWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10b2tlbmZpZWxkLXdyYXBwZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHRoaXMucHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVJbnB1dENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICB0ZXh0OiAnJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb29sdGlwLmRlZmF1bHRQcm9wcylcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9vbHRpcC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRvb2x0aXAnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlbG93JzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUxPVyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgdGhpcy5wcm9wcy50ZXh0fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvdGhpcy5wcm9wcy5jb21wb25lbnQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUFycm93S2V5TmF2aWdhdGlvbn0gZnJvbSAnLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlCdXR0b259IGZyb20gJy4vVUlCdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3h9IGZyb20gJy4vVUlDaGVja2JveCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveEdyb3VwfSBmcm9tICcuL1VJQ2hlY2tib3hHcm91cCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlEaWFsb2d9IGZyb20gJy4vVUlEaWFsb2cnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRml0dGVkVGV4dH0gZnJvbSAnLi9VSUZpdHRlZFRleHQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJSW1hZ2V9IGZyb20gJy4vVUlJbWFnZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlNb2RhbH0gZnJvbSAnLi9VSU1vZGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBhZ2luYXRpb259IGZyb20gJy4vVUlQYWdpbmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcG92ZXJ9IGZyb20gJy4vVUlQb3BvdmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcnRhbH0gZnJvbSAnLi9VSVBvcnRhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQcm9ncmVzc30gZnJvbSAnLi9VSVByb2dyZXNzJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZX0gZnJvbSAnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlSYWRpb30gZnJvbSAnLi9VSVJhZGlvJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVNlZ21lbnRlZENvbnRyb2x9IGZyb20gJy4vVUlTZWdtZW50ZWRDb250cm9sJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRva2VuaXplZElucHV0fSBmcm9tICcuL1VJVG9rZW5pemVkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVGV4dHVhbElucHV0fSBmcm9tICcuL1VJVGV4dHVhbElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVR5cGVhaGVhZElucHV0fSBmcm9tICcuL1VJVHlwZWFoZWFkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9vbHRpcH0gZnJvbSAnLi9VSVRvb2x0aXAnO1xuXG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnLi9VSVV0aWxzL25vdGlmeSc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcGVydHkgZnJvbSAnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCB1dWlkIGZyb20gJy4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGNvbnN0IFVJVXRpbHMgPSB7ZXh0cmFjdENoaWxkUHJvcHMsIG5vdGlmeSwgdHJhbnNmb3JtUHJvcGVydHksIHV1aWR9O1xuIl0sIm5hbWVzIjpbInRlc3QiLCJvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3QiLCJzb3VyY2UiLCJvbWl0dGVkS2V5cyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJyZWxvY2F0ZUFjY2VwdGVkS2V5cyIsImhhc2giLCJrZXkiLCJpbmRleE9mIiwiVUlBcnJvd0tleU5hdmlnYXRpb24iLCJzdGF0ZSIsInByb3BzIiwiZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgiLCJoYW5kbGVLZXlEb3duIiwiZXZlbnQiLCJtb2RlIiwiVkVSVElDQUwiLCJCT1RIIiwicHJldmVudERlZmF1bHQiLCJtb3ZlRm9jdXMiLCJIT1JJWk9OVEFMIiwiaXNGdW5jdGlvbiIsIm9uS2V5RG93biIsImhhbmRsZUZvY3VzIiwidGFyZ2V0IiwiaGFzQXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNoaWxkIiwiUmVhY3QiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiYWN0aXZlQ2hpbGRJbmRleCIsIm9uRm9jdXMiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzZXRGb2N1cyIsIm5leHRQcm9wcyIsIm51bUNoaWxkcmVuIiwiY291bnQiLCJjaGlsZE5vZGUiLCJyZWZzIiwid3JhcHBlciIsIkhUTUxFbGVtZW50IiwiZmluZERPTU5vZGUiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIk5vZGUiLCJET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkciLCJmb2N1cyIsImRlbHRhIiwibmV4dEluZGV4IiwibWFwIiwiY2xvbmVFbGVtZW50IiwidGFiSW5kZXgiLCJ1bmRlZmluZWQiLCJvbWl0IiwiaW50ZXJuYWxLZXlzIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsImZ1bmMiLCJudW1iZXIiLCJvbmVPZiIsImRlZmF1bHRQcm9wcyIsIm5vb3AiLCJVSUJ1dHRvbiIsImhhbmRsZUNsaWNrIiwiZGlzYWJsZWQiLCJ0b2dnbGVTdGF0ZSIsIm9uQ2xpY2siLCJwcmVzc2VkIiwiY3giLCJjbGFzc05hbWUiLCJub2RlIiwiYm9vbCIsInV1aWQiLCJyZXBsYWNlIiwiYSIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlVJQ2hlY2tib3giLCJpZCIsImhhbmRsZUNoYW5nZSIsImlucHV0UHJvcHMiLCJjaGVja2VkIiwibmFtZSIsIm9uQ2hhbmdlIiwiaW5wdXQiLCJpbmRldGVybWluYXRlIiwic2V0SW5kZXRlcm1pbmF0ZSIsIlN0cmluZyIsImdldEFyaWFTdGF0ZSIsImxhYmVsIiwibGFiZWxQcm9wcyIsInJlbmRlcklucHV0IiwicmVuZGVyTGFiZWwiLCJzaGFwZSIsIm9iamVjdCIsIlVJQ2hlY2tib3hHcm91cCIsIml0ZW1zIiwiZXZlcnkiLCJpdGVtIiwic29tZSIsInNlbGVjdEFsbCIsImFsbENoZWNrZWQiLCJhbGxJdGVtc0NoZWNrZWQiLCJzZWxlY3RBbGxQcm9wcyIsImFueUl0ZW1zQ2hlY2tlZCIsIm9uQWxsQ2hlY2tlZCIsIm9uQWxsVW5jaGVja2VkIiwib25DaGlsZENoZWNrZWQiLCJvbkNoaWxkVW5jaGVja2VkIiwidG9CZVJlbmRlcmVkIiwicmVuZGVyQ2hlY2tib3hlcyIsInNlbGVjdEFsbFBvc2l0aW9uIiwiQ29uc3RhbnRzIiwiU0VMRUNUX0FMTF9CRUZPUkUiLCJ1bnNoaWZ0IiwicmVuZGVyU2VsZWN0QWxsIiwiU0VMRUNUX0FMTF9BRlRFUiIsInB1c2giLCJyZW5kZXJDaGlsZHJlbiIsImFycmF5T2YiLCJpc1JlcXVpcmVkIiwiUE9SVEFMX0RBVEFfQVRUUklCVVRFIiwiVUlQb3J0YWwiLCIkcG9ydGFsIiwiJHBhc3NlbmdlciIsImNyZWF0ZUVsZW1lbnQiLCJkZXN0aW5hdGlvbiIsImFwcGVuZENoaWxkIiwicmVuZGVyUG9ydGFsbGVkQ29udGVudCIsImlzVmFsaWRFbGVtZW50IiwicG9ydGFsSWQiLCJyZW5kZXIiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwicmVtb3ZlQ2hpbGQiLCJDb21wb25lbnQiLCJpbnN0YW5jZU9mIiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJVSURpYWxvZyIsIm1vdW50ZWQiLCJ1dWlkSGVhZGVyIiwidXVpZEJvZHkiLCJuYXRpdmVFdmVudCIsImNhcHR1cmVGb2N1cyIsImNsb3NlT25PdXRzaWRlRm9jdXMiLCJpc1BhcnRPZkRpYWxvZyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJvbkNsb3NlIiwicHJldmlvdXMiLCJleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IiwicmVsYXRlZFRhcmdldCIsImNsb3NlT25Fc2NLZXkiLCJoYW5kbGVPdXRzaWRlQ2xpY2siLCJjbG9zZU9uT3V0c2lkZUNsaWNrIiwiaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsIiwiY2xvc2VPbk91dHNpZGVTY3JvbGwiLCJyb290cyIsIiR3cmFwcGVyIiwiY29uY2F0IiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb20iLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnQiLCJub2RlVHlwZSIsIkVMRU1FTlRfTk9ERSIsInBhcmVudE5vZGUiLCJjb250YWlucyIsImFkZEV2ZW50TGlzdGVuZXIiLCIkZGlhbG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJvZHlQcm9wcyIsImZvb3RlciIsImZvb3RlclByb3BzIiwiaGVhZGVyIiwiaGVhZGVyUHJvcHMiLCJ3cmFwcGVyUHJvcHMiLCJyZW5kZXJGb2N1c0JvdW5kYXJ5IiwiYmVmb3JlIiwicmVuZGVySGVhZGVyIiwicmVuZGVyQm9keSIsInJlbmRlckZvb3RlciIsImFmdGVyIiwiaW5zdGFuY2VzIiwidG9JIiwic3RyaW5nTnVtYmVyIiwicmVzY2FsZSIsImluc3RhbmNlIiwiY29udGFpbmVyQm94IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJ3aWR0aCIsImJveFNpemluZyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJvcHRpbWl6ZUZvckhlaWdodCIsImZsb29yIiwib2Zmc2V0SGVpZ2h0Iiwib3B0aW1pemVGb3JXaWR0aCIsIm9mZnNldFdpZHRoIiwic3R5bGUiLCJtaW4iLCJtYXhGb250U2l6ZSIsImhhbmRsZVdpbmRvd1Jlc2l6ZSIsImZvckVhY2giLCJyZWdpc3Rlckluc3RhbmNlIiwibGVuZ3RoIiwidW5yZWdpc3Rlckluc3RhbmNlIiwic3BsaWNlIiwiVUlGaXR0ZWRUZXh0IiwiZnVuY3Rpb24iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJVSUltYWdlIiwic3RhdHVzIiwiTE9BRElORyIsInNyYyIsInJlc2V0UHJlbG9hZGVyIiwicHJlbG9hZCIsImxvYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJMT0FERUQiLCJFUlJPUiIsImRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSIsImltYWdlUHJvcHMiLCJhbHQiLCJzdGF0dXNQcm9wcyIsInJlbmRlckltYWdlIiwicmVuZGVyU3RhdHVzIiwiZXh0cmFjdENoaWxkUHJvcHMiLCJwYXJlbnRQcm9wcyIsImNoaWxkUHJvcFR5cGVzIiwiY2hpbGRQcm9wcyIsIlVJTW9kYWwiLCJwb3J0YWxQcm9wcyIsIiRtb2RhbCIsIm1hc2tQcm9wcyIsIm1vZGFsUHJvcHMiLCJVSVNlZ21lbnRlZENvbnRyb2wiLCJhY3RpdmVJdGVtSW5kZXgiLCJpbmRleE9mT3B0aW9uSW5Gb2N1cyIsImdldFByZXZpb3VzT3B0aW9uSW5kZXgiLCJnZXROZXh0T3B0aW9uSW5kZXgiLCJoYW5kbGVPcHRpb25DbGljayIsIm9wdGlvbnMiLCJ2YWx1ZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY3VycmVudE9wdGlvbkluZGV4IiwibmV4dCIsIm9uQmx1ciIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJkZWZpbml0aW9uIiwiaW50ZXJuYWxDaGlsZEtleXMiLCJoYW5kbGVPcHRpb25CbHVyIiwiYmluZCIsImhhbmRsZU9wdGlvbkZvY3VzIiwiY29udGVudCIsInJlbmRlck9wdGlvbnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJFcnJvciIsIm1pc3NpbmdTZWxlY3RlZCIsInNlZW5TZWxlY3RlZCIsIm11bHRpcGxlU2VsZWN0ZWQiLCJpZGVudGl0eSIsIngiLCJJdGVtIiwiZGF0YSIsIlByb21pc2UiLCJjb21wb25lbnQiLCJjbG9zdXJlUHJvbWlzZSIsInRoZW4iLCJyZXNvbHZlZFBheWxvYWQiLCJjdXJyZW50UHJvcHMiLCJjb252ZXJ0VG9KU1hGdW5jIiwiY29udmVydERhdGFUb0pTWE9yV2FpdCIsImV4dHJhQ2xhc3NlcyIsImV2ZW4iLCJnZXRDbGFzc2VzIiwibG9hZGluZ0NvbnRlbnQiLCJVSVBhZ2luYXRpb24iLCJpbml0aWFsUGFnZSIsIm51bUl0ZW1zUGVyUGFnZSIsImN1cnJlbnRQYWdlIiwiZ2V0UGFnZUZvckluZGV4IiwiaXRlbXNQZXJQYWdlIiwiY2VpbCIsInRvdGFsUGFnZXMiLCJ0b3RhbEl0ZW1zIiwiZmlyc3RWaXNpYmxlSXRlbUluZGV4IiwicGFnZVRvSW5kZXgiLCJpIiwibmV4dFRhcmdldEluZGV4IiwiY29udHJvbHMiLCJGSVJTVCIsIlBSRVZJT1VTIiwiTkVYVCIsIkxBU1QiLCJpdGVtXzAiLCJvbGRQcm9wcyIsImlkZW50aWZpZXIiLCJ0YXJnZXRJbmRleCIsIm51bVBhZ2VUb2dnbGVzIiwic3RhcnRQYWdlIiwiZW5kUGFnZSIsInNob3dQYWdpbmF0aW9uU3RhdGUiLCJzaG93SnVtcFRvRmlyc3QiLCJqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50IiwicHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQiLCJuZXh0UGFnZUNvbnRyb2xDb250ZW50Iiwic2hvd0p1bXBUb0xhc3QiLCJqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQiLCJjdXN0b21Db250cm9sQ29udGVudCIsImdlbmVyYXRlZEl0ZW1zIiwiZmlyc3RJdGVtSW5kZXgiLCJsYXN0SXRlbUluZGV4IiwiZ2V0SXRlbSIsImxpc3RXcmFwcGVyUHJvcHMiLCJpbmRleE9mZnNldCIsImdlbmVyYXRlSXRlbXMiLCJpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jIiwiaXRlbUxvYWRpbmdDb250ZW50IiwicG9zaXRpb24iLCJoaWRlUGFnZXJJZk5vdE5lZWRlZCIsInRvZ2dsZVdyYXBwZXJQcm9wcyIsInBvc2l0aW9uTG93ZXIiLCJ0b0xvd2VyQ2FzZSIsInBvc2l0aW9uQ2FwaXRhbGl6ZWQiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zIiwicG9zaXRpb25zIiwiQUJPVkUiLCJyZW5kZXJDb250cm9scyIsInJlbmRlckl0ZW1zIiwiQkVMT1ciLCJyZW5kZXJWaWV3IiwidmFsaWRhdGVJbml0aWFsUGFnZSIsImlzSW50ZWdlciIsIm51bWJlck9mUGFnZXMiLCJ2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZSIsImRldGVjdFRyYW5zZm9ybVByb3BlcnR5IiwibGVuIiwiZG9jdW1lbnRFbGVtZW50Iiwid2l0aG91dCIsImFycjEiLCJhcnIyIiwiZmlsdGVyIiwidmFsdWVzIiwib2JqIiwiREVGQVVMVF9DQVJFVF9DT01QT05FTlQiLCJVSVBvcG92ZXIiLCJhbGlnbiIsImFuY2hvciIsImNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeSIsImR4Iiwicm91bmQiLCJnZXROZXh0RGlhbG9nWFBvc2l0aW9uIiwiZHkiLCJnZXROZXh0RGlhbG9nWVBvc2l0aW9uIiwiYWxpZ25tZW50Q29ycmVjdGlvbiIsImdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nIiwiZGlkQWxpZ25tZW50Q2hhbmdlIiwiJGNhcmV0IiwibGVmdCIsImdldE5leHRDYXJldFhQb3NpdGlvbiIsInRvcCIsImdldE5leHRDYXJldFlQb3NpdGlvbiIsImFwcGx5VHJhbnNsYXRpb24iLCJkaWFsb2ciLCJhbmNob3JYQWxpZ24iLCJwcmVzZXQiLCJhbmNob3JZQWxpZ24iLCJzZWxmWEFsaWduIiwic2VsZllBbGlnbiIsImFuY2hvclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJhbmNob3JMZWZ0IiwiYW5jaG9yVG9wIiwiYW5jaG9ySGVpZ2h0IiwiYW5jaG9yV2lkdGgiLCJib2R5TGVmdCIsInNjcm9sbExlZnQiLCJib2R5VG9wIiwic2Nyb2xsVG9wIiwiY2FyZXQiLCJuZXh0WCIsIk1JRERMRSIsIlNUQVJUIiwiRU5EIiwiY2xpZW50V2lkdGgiLCJuZXh0WSIsImNsaWVudEhlaWdodCIsImFuY2hvclkiLCJ5IiwiYXV0b1JlcG9zaXRpb24iLCJjb3JyZWN0aW9ucyIsInhNYXgiLCJzY3JvbGxXaWR0aCIsInlNYXgiLCJzY3JvbGxIZWlnaHQiLCJ0cmFuc2Zvcm1Qcm9wIiwibmV4dEFsaWdubWVudCIsImN1cnJlbnRBbGlnbm1lbnQiLCJjb25zdGFudCIsImdldEZyYWciLCJnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50IiwiY2FyZXRDb21wb25lbnQiLCJwb3NpdGlvblZhbHVlcyIsInByZXNldFZhbHVlcyIsIlVJUHJvZ3Jlc3MiLCJvbkNhbmNlbCIsImNhbmNlbFByb3BzIiwicHJvZ3Jlc3NQcm9wcyIsInByb2dyZXNzIiwidHdlZW5Qcm9wZXJ0eSIsInJlbmRlclByb2dyZXNzIiwicmVuZGVyQ2FuY2VsIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUiLCJleHBhbmRlZCIsImRpc3BhdGNoQ2FsbGJhY2siLCJ0b2dnbGVQcm9wcyIsIm5ld1Byb3BzIiwidGVhc2VyRXhwYW5kZWQiLCJ0ZWFzZXIiLCJyZW5kZXJDb250ZW50IiwiVUlSYWRpbyIsIm9uU2VsZWN0ZWQiLCJVSVRleHR1YWxJbnB1dCIsImlzU3RyaW5nIiwic2V0SW5wdXRWYWx1ZSIsImdldFZhbHVlIiwiZmllbGQiLCJoYW5kbGVCbHVyIiwiaXNGb2N1c2VkIiwiaXNDb250cm9sbGVkIiwiZGVmYXVsdFZhbHVlIiwibmV4dFZhbHVlIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImlzTm9uRW1wdHkiLCJzaG91bGRTaG93UGxhY2Vob2xkZXIiLCJoaWRlUGxhY2Vob2xkZXJPbkZvY3VzIiwicGxhY2Vob2xkZXIiLCJnZXRQbGFjZWhvbGRlclRleHQiLCJyZW5kZXJQbGFjZWhvbGRlciIsIlVJVHlwZWFoZWFkSW5wdXQiLCJjb21wdXRlTWF0Y2hlcyIsInNlbGVjdGVkRW50aXR5SW5kZXgiLCJvbkVudGl0eUhpZ2hsaWdodGVkIiwiZW50aXRpZXMiLCJ1cGRhdGVJbnB1dFN0YXRlIiwiZW50aXR5TWF0Y2hJbmRleGVzIiwibWF0Y2hlcyIsInNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5IiwidG90YWxNYXRjaGVzIiwibWF0Y2hJbmRleCIsIm1hdGNoZXNOb2RlIiwibWF0Y2hlc05vZGVZRW5kIiwibWF0Y2hOb2RlIiwibWF0Y2hOb2RlWVN0YXJ0Iiwib2Zmc2V0VG9wIiwibWF0Y2hOb2RlWUVuZCIsImdldElucHV0Tm9kZSIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZW50aXR5IiwiZW50aXR5Q29udGVudCIsInRleHQiLCJmcmFncyIsInNwbGl0IiwiUmVnRXhwIiwiZXNjYXBlciIsIm5vcm1hbGl6ZWRVc2VyVGV4dCIsInRocmVzaG9sZCIsInNlZWtWYWx1ZSIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsImFsZ29yaXRobSIsIlNUQVJUU19XSVRIIiwibWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyIsIm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nIiwibWFya2VyIiwid2FybmVkTWFya2VyIiwid2FybiIsInVzZXJUZXh0Iiwibm9ybWFsaXplZCIsImZpbmRJbmRleGVzIiwicmVzdWx0Iiwic2Vla01hdGNoIiwicmVzdWx0cyIsImdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMiLCJnZXRGdXp6eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXIiLCJ3YXJuZWRNYXRjaGVyIiwicHJvdmlkZWRFbnRpdGllcyIsImN1cnJlbnRWYWx1ZSIsImdldE1hdGNoSW5kZXhlcyIsIm9mZnNjcmVlbkNsYXNzIiwiZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0IiwiaGludCIsInJhdyIsInByb2Nlc3NlZCIsImhpbnRQcm9wcyIsIm1hdGNoV3JhcHBlclByb3BzIiwicmVzdCIsImhhbmRsZU1hdGNoQ2xpY2siLCJtYXJrTWF0Y2hTdWJzdHJpbmciLCJyZW5kZXJOb3RpZmljYXRpb24iLCJyZW5kZXJIaW50IiwicmVuZGVyTWF0Y2hlcyIsIkZVWlpZIiwicmVzZXRNYXRjaGVzIiwic2VsZWN0Iiwic2V0VmFsdWUiLCJvbkVudGl0eVNlbGVjdGVkIiwiY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbiIsImdldE1hcmtpbmdGdW5jdGlvbiIsImdldE1hdGNoaW5nRnVuY3Rpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJjdXJzb3JBdEVuZE9mSW5wdXQiLCJzaGlmdEtleSIsInNlbGVjdE1hdGNoIiwib25Db21wbGV0ZSIsImZpcnN0IiwiYXJyYXkiLCJsYXN0IiwiVUlUb2tlbml6ZWRJbnB1dCIsInR5cGVhaGVhZCIsImFkZCIsInRva2VucyIsImhhbmRsZUFkZFRva2VuIiwiaGFuZGxlSW5wdXRDbGljayIsImNsZWFyU2VsZWN0aW9uIiwiaGFuZGxlSW5wdXRGb2N1cyIsIndoaWNoIiwic2VsZWN0UHJldmlvdXNUb2tlbiIsInNlbGVjdE5leHRUb2tlbiIsInRva2Vuc1NlbGVjdGVkIiwicmVtb3ZlIiwibWV0YUtleSIsIl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiIsImhhbmRsZU5ld1NlbGVjdGlvbiIsInByZXZpb3VzU2VsZWN0ZWRJbmRleGVzIiwiY3VycmVudFNlbGVjdGVkSW5kZXhlcyIsImluZGV4ZXMiLCJpc0FycmF5IiwiaWR4IiwiaGFuZGxlUmVtb3ZlVG9rZW5zIiwiYXBwZW5kIiwic2VsZWN0VG9rZW4iLCJwcmV2aW91c1Rva2VuIiwic2VsZWN0VG9rZW5zIiwibmV4dFRva2VuIiwidG9rZW5DbG9zZUNvbXBvbmVudCIsInRva2VuQ2xvc2VWaXNpYmxlIiwiaGFuZGxlVG9rZW5DbG9zZUNsaWNrIiwiaGFuZGxlVG9rZW5LZXlEb3duIiwicmVuZGVyVG9rZW5DbG9zZSIsInJlbmRlclRva2VucyIsIlVJVG9vbHRpcCIsIkJFRk9SRSIsIkFGVEVSIiwiZXJyb3JzIiwiTm90aWZpY2F0aW9uQVBJIiwiZGV0ZWN0U3VwcG9ydCIsIk5vdGlmaWNhdGlvbiIsIndlYmtpdE5vdGlmaWNhdGlvbnMiLCJuYXZpZ2F0b3IiLCJtb3pOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0UmVjZWl2ZXIiLCJESVNBQkxFRCIsImNoZWNrUGVybWlzc2lvbiIsIk5PVF9BVkFJTEFCTEUiLCJwZXJtaXNzaW9uIiwibm90aWZ5IiwiY29uZmlnIiwiQ09ORklHX01JU1NJTkciLCJDT05GSUdfVFlQRSIsIkJPRFlfTUlTU0lORyIsIkJPRFlfVFlQRSIsIkhFQURFUl9NSVNTSU5HIiwiSEVBREVSX1RZUEUiLCJpY29uIiwiSUNPTl9UWVBFIiwiT05DTElDS19UWVBFIiwic3Bhd25XZWJOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJlcnJvciIsIlVJVXRpbHMiLCJ0cmFuc2Zvcm1Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxVQUFDQSxJQUFEO1NBQVUsT0FBT0EsSUFBUCxLQUFnQixVQUExQjtDQUFmOztBQ0FBOzs7O0FBSUEsQUFBZSxTQUFTQyx3QkFBVCxDQUFrQ0MsTUFBbEMsRUFBNEQ7UUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7O1dBQ2hFQyxPQUFPQyxJQUFQLENBQVlILE1BQVosRUFBb0JJLE1BQXBCLENBQTJCLFNBQVNDLG9CQUFULENBQThCQyxJQUE5QixFQUFvQ0MsR0FBcEMsRUFBeUM7WUFDbkVOLFlBQVlPLE9BQVosQ0FBb0JELEdBQXBCLE1BQTZCLENBQUMsQ0FBbEMsRUFBcUM7aUJBQzVCQSxHQUFMLElBQVlQLE9BQU9PLEdBQVAsQ0FBWjs7O2VBR0dELElBQVA7S0FMRyxFQU9KLEVBUEksQ0FBUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0NpQkc7Ozs7Ozs7Ozs7Ozs7O3FOQThCakJD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
