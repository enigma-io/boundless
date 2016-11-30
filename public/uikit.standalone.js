(function (exports,React,ReactDOM) {
'use strict';

var React__default = 'default' in React ? React['default'] : React;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

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
        if (key in parentProps) {
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

}((this.UIKit = this.UIKit || {}),React,ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXg6IDAsXG4gICAgICAgIG1vZGU6IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlBcnJvd0tleU5hdmlnYXRpb24uZGVmYXVsdFByb3BzKVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVtpbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiBpbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS1za2lwJzogcGFyc2VJbnQoY2hpbGQucHJvcHMudGFiSW5kZXgsIDEwKSA9PT0gLTEgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLmNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICBvbkNsaWNrOiBub29wLFxuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgICAgICBwcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLmRlZmF1bHRQcm9wcylcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWJ1dHRvbicsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEFkZGVkIGEgcHJlZml4IHNvIHRoZSBnZW5lcmF0ZWQgSUQgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyBhbiBIVE1MIElELlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIHVpa2l0LTFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuICd1aWtpdC0nICsgKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIGNoZWNrYm94IHdpdGggaW5kZXRlcm1pbmF0ZSBzdXBwb3J0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IG51bGwsXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvbkNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5jaGVja2VkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94LmRlZmF1bHRQcm9wcylcblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5pbmRldGVybWluYXRlID0gISF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHsgLy8gU2VuZCB0aGUgb3Bwb3NpdGUgc2lnbmFsIGZyb20gd2hhdCB3YXMgcGFzc2VkIHRvIHRvZ2dsZSB0aGUgZGF0YVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucHJvcHNbIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkID8gJ29uQ2hlY2tlZCcgOiAnb25VbmNoZWNrZWQnXSh0aGlzLnByb3BzLmlucHV0UHJvcHMubmFtZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBcmlhU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiBTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcy5pbnB1dFByb3BzLCAnaW5kZXRlcm1pbmF0ZScpfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktY2hlY2tib3gnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1taXhlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtY2hlY2tlZCc6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtdW5jaGVja2VkJzogIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICYmICF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktY2hlY2tib3gtbGFiZWwnLCB0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWNoZWNrYm94LXdyYXBwZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG4vKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUNoZWNrYm94R3JvdXAuZGVmYXVsdFByb3BzKVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHtpbnB1dFByb3BzfSA9IHRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnLCB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBhbGxDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogIWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0UHJvcHMgJiYgaW5wdXRQcm9wcy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlucHV0UHJvcHMubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnY2Jfc2VsZWN0X2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmxhYmVsIHx8ICdTZWxlY3QgQWxsJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgdG9CZVJlbmRlcmVkID0gW3RoaXMucmVuZGVyQ2hlY2tib3hlcygpXTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwgJiYgdGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkU6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnVuc2hpZnQodGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC5wdXNoKHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvQmVSZW5kZXJlZDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveEdyb3VwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1jaGVja2JveC1ncm91cCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgY29uc3QgUE9SVEFMX0RBVEFfQVRUUklCVVRFID0gJ2RhdGEtcG9ydGFsLWlkJztcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBjb21wb25lbnQgZm9yIHRoZSByZW5kZXJpbmcgb2YgY29tcG9uZW50cyBvdXRzaWRlIHRoZSBub3JtYWwgUmVhY3QgdHJlZS5cbiAqIE9ubHkgYWNjZXB0cyBhIHNpbmdsZSB0b3AtbGV2ZWwgY2hpbGQ7IG5ha2VkIHRleHQsIGV0YyB3aWxsIGJlIHdyYXBwZWQgaW4gYSA8ZGl2Pi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC8vIHNpbmdsZSBjaGlsZCBvbmx5IC0gYXJyYXlzIG5vdCBhbGxvd2VkXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICBkZXN0aW5hdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgZGVzdGluYXRpb246IGRvY3VtZW50LmJvZHksXG4gICAgICAgIHBvcnRhbElkOiBudWxsLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBvcnRhbC5kZWZhdWx0UHJvcHMpXG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgLy8gdGhlIDxkaXY+IHRoYXQgdGhlIGNoaWxkcmVuIGFyZSByZW5kZXJlZCBpbnRvXG4gICAgJHBvcnRhbCA9IG51bGxcblxuICAgIC8vIHRoZSB0b3AtbGV2ZWwgY2hpbGQgcmVuZGVyZWQgaW50byB0aGUgJHBvcnRhbFxuICAgICRwYXNzZW5nZXIgPSBudWxsO1xuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRwb3J0YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5hcHBlbmRDaGlsZCh0aGlzLiRwb3J0YWwpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpO1xuICAgIH1cblxuICAgIHJlbmRlclBvcnRhbGxlZENvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbikgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogKDxkaXY+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvcnRhbCBJRCBsaW5rIGlmIG5lZWRlZFxuICAgICAgICB0aGlzLiRwb3J0YWwuaWQgPSB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWQ7XG5cbiAgICAgICAgUmVhY3RET00ucmVuZGVyKGNoaWxkLCB0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLiRwYXNzZW5nZXIgPSB0aGlzLiRwb3J0YWwuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkgeyB0aGlzLnJlbmRlclBvcnRhbGxlZENvbnRlbnQoKTsgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kcG9ydGFsKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5yZW1vdmVDaGlsZCh0aGlzLiRwb3J0YWwpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQb3J0YWwuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICB7Li4ue1tQT1JUQUxfREFUQV9BVFRSSUJVVEVdOiB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWR9fSAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQge1BPUlRBTF9EQVRBX0FUVFJJQlVURX0gZnJvbSAnLi4vVUlQb3J0YWwnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuY29uc3QgdG9BcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFmdGVyOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYmVmb3JlOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYm9keVByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFmdGVyOiBudWxsLFxuICAgICAgICBiZWZvcmU6IG51bGwsXG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyOiBudWxsLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlcjogbnVsbCxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5kZWZhdWx0UHJvcHMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgY29uc3Qgcm9vdHMgPSBbdGhpcy4kd3JhcHBlcl0uY29uY2F0KFxuICAgICAgICAgICAgdG9BcnJheS5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuJHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChgWyR7UE9SVEFMX0RBVEFfQVRUUklCVVRFfV1gKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZShQT1JUQUxfREFUQV9BVFRSSUJVVEUpKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlO1xuXG4gICAgICAgIHJldHVybiByb290cy5zb21lKChkb20pID0+IGRvbS5jb250YWlucyhlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucHJvcHMub25DbG9zZSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1kaWFsb2ctYm9keScsIHRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktZGlhbG9nLWZvb3RlcicsIHRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZy1oZWFkZXInLCB0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kd3JhcHBlciA9IG5vZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZy13cmFwcGVyJywgdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWRpYWxvZyc6IHRydWUsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jdGlvbixcbiAgICAgICAgXSksXG4gICAgICAgIG1heEZvbnRTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICBjb21wb25lbnQ6ICdzcGFuJyxcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5kZWZhdWx0UHJvcHMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXRleHQnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC90aGlzLnByb3BzLmNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFsdDogbnVsbCxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBmYWxzZSxcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHNyYzogJ2Fib3V0OmJsYW5rJyxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2UnLCB0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2UnLCB0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLWltYWdlLXN0YXR1cycsIHRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktaW1hZ2Utd3JhcHBlcicsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgcHJvcHMgbGlzdGVkIGluIHRoZSBwcm9wVHlwZXMgb2YgYSBjaGlsZCBjb21wb25lbnRcbiAqIGUuZy4gdXNlZCBpbiBVSVR5cGVhaGVhZElucHV0IHRvIGlkZW50aWZ5IHdoaWNoIHByb3BzIGFyZSBtZWFudCBmb3IgVUlUZXh0dWFsSW5wdXRcbiAqIEBtb2R1bGUgVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wc1xuICpcbiAqIEBwYXJhbSAge09iamVjdH0gcGFyZW50UHJvcHMgICAgIHByb3BzIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNoaWxkUHJvcFR5cGVzICBwcm9wVHlwZXMgb2YgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgcHJvcHMgdG8gYmUgc3ByZWFkIGFwcGxpZWQgdG8gYSBjaGlsZCBjb21wb25lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0Q2hpbGRQcm9wcyhwYXJlbnRQcm9wcywgY2hpbGRQcm9wVHlwZXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hpbGRQcm9wVHlwZXMpLnJlZHVjZSgoY2hpbGRQcm9wcywga2V5KSA9PiB7XG4gICAgICAgIGlmIChrZXkgaW4gcGFyZW50UHJvcHMpIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJUG9ydGFsIGZyb20gJy4uL1VJUG9ydGFsJztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1vZGFsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBtYXNrUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1vZGFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHBvcnRhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBtYXNrUHJvcHM6IHt9LFxuICAgICAgICBtb2RhbFByb3BzOiB7fSxcbiAgICAgICAgcG9ydGFsUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSU1vZGFsLmRlZmF1bHRQcm9wcylcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVBvcnRhbCB7Li4ucHJvcHMucG9ydGFsUHJvcHN9PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJTW9kYWwuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsobm9kZSkgPT4gKHRoaXMuJG1vZGFsID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLW1vZGFsLXdyYXBwZXInLCBwcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLW1vZGFsLW1hc2snLCBwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lKX0gLz5cblxuICAgICAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlEaWFsb2cuZGVmYXVsdFByb3BzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktbW9kYWwnLCBwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L1VJRGlhbG9nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9VSVBvcnRhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfSU5URUdFUiA9IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LFxuICAgIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb25cbiAqIFtgTnVtYmVyLmlzSW50ZWdlcmBdKGh0dHBzOi8vbWRuLmlvL051bWJlci9pc0ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0ludGVnZXIoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID09IHRvSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgZmluaXRlIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTIuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvRmluaXRlKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvRmluaXRlKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b0Zpbml0ZShJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9GaW5pdGUoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvRmluaXRlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gIH1cbiAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgIHZhciBzaWduID0gKHZhbHVlIDwgMCA/IC0xIDogMSk7XG4gICAgcmV0dXJuIHNpZ24gKiBNQVhfSU5URUdFUjtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gdmFsdWUgOiAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvSW50ZWdlcigzLjIpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gMFxuICpcbiAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0ludGVnZXIoJzMuMicpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgIHJlbWFpbmRlciA9IHJlc3VsdCAlIDE7XG5cbiAgcmV0dXJuIHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlbWFpbmRlciA/IHJlc3VsdCAtIHJlbWFpbmRlciA6IHJlc3VsdCkgOiAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbnRlZ2VyO1xuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISgnc2VsZWN0ZWQnIGluIG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtaXNzaW5nU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGBzZWxlY3RlZGAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWVuU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZW5TZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZWVuU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobXVsdGlwbGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW5jb3VudGVyZWQgbXVsdGlwbGUgb3B0aW9ucyB3aXRoIGBzZWxlY3RlZDogdHJ1ZWAuIFRoZXJlIGNhbiBiZSBvbmx5IG9uZS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJU2VnbWVudGVkQ29udHJvbC5kZWZhdWx0UHJvcHMpXG4gICAgc3RhdGljIGludGVybmFsQ2hpbGRLZXlzID0gW1xuICAgICAgICAnY29udGVudCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgXVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoaW5kZXgpIHtcbiAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzWydvcHRpb25fJCcgKyBpbmRleF0pLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dE9wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgbmV4dCA9IGN1cnJlbnRPcHRpb25JbmRleCArIDE7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoID8gbmV4dCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gY3VycmVudE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXMgPCAwID8gdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCAtIDEgOiBwcmV2aW91cztcbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25CbHVyKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXMgPT09IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25CbHVyKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25DbGljayhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25PcHRpb25TZWxlY3RlZChvcHRpb24udmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkNsaWNrKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uRm9jdXMob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkZvY3VzKSkge1xuICAgICAgICAgICAgb3B0aW9uLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuc3RhdGUuaW5kZXhPZk9wdGlvbkluRm9jdXM7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXRQcmV2aW91c09wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldE5leHRPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKHRoaXMucHJvcHMub3B0aW9uc1thY3RpdmVJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9wdGlvbnMubWFwKChkZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQoZGVmaW5pdGlvbiwgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsQ2hpbGRLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKGRlZmluaXRpb24uc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eydvcHRpb25fJCcgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtkZWZpbml0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24nLCBkZWZpbml0aW9uLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbi1zZWxlY3RlZCc6IGRlZmluaXRpb24uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktc2VnbWVudGVkLWNvbnRyb2wnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBpc0ludGVnZXIgZnJvbSAnbG9kYXNoLmlzaW50ZWdlcic7XG5cbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jb25zdCBpZGVudGl0eSA9ICh4KSA9PiB4O1xuXG4vKipcbiAqIEEgdXRpbGl0eSBjb21wb25lbnQgZm9yIGhhbmRsaW5nIHByb21pc2VzIGFzIGNoaWxkcmVuIGFuZCBldmVudHVhbGx5IGRvaW5nIHNvbWV0aGluZyB3aXRoIHRoZWlyIHJlc29sdmVkIHBheWxvYWQuXG4gKi9cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb252ZXJ0VG9KU1hGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgZXZlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBsb2FkaW5nQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29udmVydFRvSlNYRnVuYzogbm9vcCxcbiAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgZXZlbjogdHJ1ZSxcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBudWxsLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhJdGVtLmRlZmF1bHRQcm9wcylcblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuICAgIHN0YXRlID0ge31cblxuICAgIGNvbnZlcnREYXRhVG9KU1hPcldhaXQocHJvcHMgPSB0aGlzLnByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBudWxsfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVQcm9taXNlID0gcHJvcHMuZGF0YTtcblxuICAgICAgICAgICAgcHJvcHMuZGF0YS50aGVuKChyZXNvbHZlZFBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBjdXJyZW50UHJvcHMpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IGN1cnJlbnRQcm9wcy5kYXRhID09PSBjbG9zdXJlUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnRQcm9wcy5jb252ZXJ0VG9KU1hGdW5jKHJlc29sdmVkUGF5bG9hZCwgY3VycmVudFByb3BzLmluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0YXRlLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0gLy8gb25seSByZXBsYWNlIGlmIHdlJ3JlIGxvb2tpbmcgYXQgdGhlIHNhbWUgcHJvbWlzZSwgb3RoZXJ3aXNlIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0sIG5vb3ApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21wb25lbnQ6IHByb3BzLmNvbnZlcnRUb0pTWEZ1bmMocHJvcHMuZGF0YSwgcHJvcHMuaW5kZXgpfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkgICAgICAgICAgICAgICAgIHsgdGhpcy5jb252ZXJ0RGF0YVRvSlNYT3JXYWl0KCk7IH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpICAgICAgICAgICAgICAgICAgeyB0aGlzLm1vdW50ZWQgPSB0cnVlOyB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHsgdGhpcy5jb252ZXJ0RGF0YVRvSlNYT3JXYWl0KG5leHRQcm9wcyk7IH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpICAgICAgICAgICAgICAgeyB0aGlzLm1vdW50ZWQgPSBmYWxzZTsgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KCd1aS1wYWdpbmF0aW9uLWl0ZW0nLCBleHRyYUNsYXNzZXMsIHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuY29tcG9uZW50ID09PSBudWxsLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKX0gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5zdGF0ZS5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXModGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMgJiYgdGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgdXRpbGl0eSBjb21wb25lbnQgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMsIHBvc3NpYmx5IHZhcnlpbmcgaW4gRE9NIGxheW91dC9zaXplLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBnZXRJdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgaW5pdGlhbFBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlSW5pdGlhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBudWxsLFxuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBoaWRlUGFnZXJJZk5vdE5lZWRlZDogZmFsc2UsXG4gICAgICAgIGlkZW50aWZpZXI6IHV1aWQoKSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Mb2FkaW5nQ29udGVudDogbnVsbCxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogaWRlbnRpdHksXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIHRvdGFsSXRlbXM6IG51bGwsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5kZWZhdWx0UHJvcHMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UsXG4gICAgICAgIHRhcmdldEluZGV4OiAodGhpcy5wcm9wcy5pbml0aWFsUGFnZSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UgPSAoKSA9PiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgZ2V0UGFnZUZvckluZGV4ID0gKGluZGV4LCBpdGVtc1BlclBhZ2UgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT4gTWF0aC5jZWlsKChpbmRleCArIDEpIC8gaXRlbXNQZXJQYWdlKVxuICAgIHRvdGFsUGFnZXMgPSAoKSA9PiBNYXRoLmNlaWwodGhpcy5wcm9wcy50b3RhbEl0ZW1zIC8gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpXG5cbiAgICBmaXJzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UoKSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gdGhpcy5wcm9wcztcblxuICAgICAgICAvLyB1c2UgdHJhbnNhY3Rpb25hbCBgc2V0U3RhdGUoKWAgc3ludGF4IHRvIGVuc3VyZSB0aGF0IHBlbmRpbmcgc3RhdGUgdXBkYXRlcyBhcmUgaG9ub3JlZCxcbiAgICAgICAgLy8gbGlrZSB0aG9zZSBmcm9tIGBwYWdlVG9JbmRleCgpYFxuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIC8vIE5PVEU6IGBwcm9wc2AgaGVyZSBpcyB0ZWNobmljYWxseSB0aGUgYG5leHRQcm9wc2AgeW91J2QgcmVjZWl2ZSBmcm9tIHRoZSBmaXJzdCBjV1JQIGFyZ3VtZW50XG4gICAgICAgICAgICAvLyBzbyB0aGF0J3Mgd2h5IHdlJ3JlIGNhY2hpbmcgYG9sZFByb3BzYCBvdXRzaWRlIHRoZSBgc2V0U3RhdGVgXG4gICAgICAgICAgICBpZiAocHJvcHMuaWRlbnRpZmllciAhPT0gb2xkUHJvcHMuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogMCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChzdGF0ZS50YXJnZXRJbmRleCwgcHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogc3RhdGUudGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYWdlVG9JbmRleCA9IChpKSA9PiB7XG4gICAgICAgIGlmIChpIDwgMCB8fCBpID49IHRoaXMucHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgQ2Fubm90IHBhZ2UgdG8gaW52YWxpZCBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoaSksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogaSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMudG90YWxQYWdlcygpO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgdG90YWxQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaXNGdW5jdGlvbih0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUoY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtjdXJyZW50UGFnZX0gb2YgJHt0b3RhbFBhZ2VzfWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtc3RhdGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sJyxcbiAgICAgICAgICAgICAgICAnZGF0YS1wYWdlLW51bWJlcic6IGksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuY3VycmVudFBhZ2UoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdXVpZCgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtY3VzdG9tJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5wcm9wcy50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IG5leHRUYXJnZXRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUzpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgLSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLnByb3BzLnRvdGFsSXRlbXMgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSBwYXJzZUludCh2YWx1ZSwgMTApICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgobmV4dFRhcmdldEluZGV4KSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBuZXh0VGFyZ2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcGFnaW5hdGlvbi1pdGVtcycsIHByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydFRvSlNYRnVuYz17dGhpcy5wcm9wcy5pdGVtVG9KU1hDb252ZXJ0ZXJGdW5jfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DYXBpdGFsaXplZCA9IHBvc2l0aW9uTG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXIuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgc2VnbWVudGVkQ29udHJvbCR7cG9zaXRpb25DYXBpdGFsaXplZH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXBhZ2luYXRpb24tY29udHJvbHMnLCBwcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25Mb3dlcn1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcGFnaW5hdGlvbi13cmFwcGVyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlQb3J0YWwgZnJvbSAnLi4vVUlQb3J0YWwnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuXG5mdW5jdGlvbiB3aXRob3V0KGFycjEsIGFycjIpIHsgcmV0dXJuIGFycjEuZmlsdGVyKChpdGVtKSA9PiBhcnIyLmluZGV4T2YoaXRlbSkgPT09IC0xKTsgfVxuZnVuY3Rpb24gdmFsdWVzKG9iaikgICAgICAgICB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiBvYmpba2V5XSk7IH1cblxuY29uc3QgREVGQVVMVF9DQVJFVF9DT01QT05FTlQgPSAoXG4gICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICA8Zz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1ib3JkZXInIGZpbGw9JyMwMDAnIHBvaW50cz0nNyAwIDE0IDEwIDAgMTAnIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtZmlsbCcgZmlsbD0nI0ZGRicgcG9pbnRzPSc2Ljk4MjMwNDQ0IDEuNzUgMTIuNzUgMTAgMS4yNSAxMCcgLz5cbiAgICAgICAgPC9nPlxuICAgIDwvc3ZnPlxuKTtcblxuLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvblZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucG9zaXRpb24pXG5cbiAgICBzdGF0aWMgcHJlc2V0ID0ge1xuICAgICAgICAnQUJPVkUnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICB9LFxuICAgICAgICAnQkVMT1cnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICB9LFxuICAgICAgICAnTEVGVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgICAgICdSSUdIVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIHByZXNldFZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucHJlc2V0KVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBQcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhbmNob3JZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgcG9ydGFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHByZXNldDogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wcmVzZXRWYWx1ZXMpLFxuICAgICAgICBzZWxmWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgc2VsZllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFuY2hvcjogZG9jdW1lbnQuYm9keSxcbiAgICAgICAgYW5jaG9yWEFsaWduOiB1bmRlZmluZWQsXG4gICAgICAgIGFuY2hvcllBbGlnbjogdW5kZWZpbmVkLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IERFRkFVTFRfQ0FSRVRfQ09NUE9ORU5ULFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgcG9ydGFsUHJvcHM6IHt9LFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHNlbGZYQWxpZ246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VsZllBbGlnbjogdW5kZWZpbmVkLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSB3aXRob3V0KE9iamVjdC5rZXlzKFVJUG9wb3Zlci5kZWZhdWx0UHJvcHMpLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IHByb3BzLmFuY2hvclhBbGlnbiB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBwcm9wcy5hbmNob3JZQWxpZ24gfHwgcHJvcHMucHJlc2V0LmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IHByb3BzLnNlbGZYQWxpZ24gICAgIHx8IHByb3BzLnByZXNldC5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogcHJvcHMuc2VsZllBbGlnbiAgICAgfHwgcHJvcHMucHJlc2V0LnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcikge1xuICAgICAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yTGVmdCA9IGFuY2hvclJlY3QubGVmdDtcbiAgICAgICAgdGhpcy5hbmNob3JUb3AgPSBhbmNob3JSZWN0LnRvcDtcbiAgICAgICAgdGhpcy5hbmNob3JIZWlnaHQgPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgdGhpcy5hbmNob3JXaWR0aCA9IGFuY2hvclJlY3Qud2lkdGg7XG5cbiAgICAgICAgdGhpcy5ib2R5TGVmdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5ib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBYIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgYWJvdmUgb3IgYmVsb3cgdGhlIGFuY2hvciBhbmQgc2VsZlhBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZlhBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50SGVpZ2h0IC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gdGhpcy5hbmNob3JMZWZ0ICsgdGhpcy5ib2R5TGVmdDtcblxuICAgICAgICBzd2l0Y2ggKGFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlkQWxpZ25tZW50Q2hhbmdlKG5leHRBbGlnbm1lbnQsIGN1cnJlbnRBbGlnbm1lbnQgPSB0aGlzLnN0YXRlKSB7XG4gICAgICAgIHJldHVybiAgICBuZXh0QWxpZ25tZW50LmFuY2hvclhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuYW5jaG9yWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvcllBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWUFsaWduO1xuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IGZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICB0aGlzLmNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yKSk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yKSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoZHgsIGR5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiB0aGlzLmRpZEFsaWdubWVudENoYW5nZShhbGlnbm1lbnRDb3JyZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgY2FyZXQgaXMgaW5pdGlhbGx5IHBvc2l0aW9uZWQgYXQgMCwwIGluc2lkZSB0aGUgZGlhbG9nXG4gICAgICAgIC8vIHdoaWNoIGlzIGFscmVhZHkgcG9zaXRpb25lZCBhdCB0aGUgYW5jaG9yLCBzbyB3ZSBqdXN0IG5lZWQgdG9cbiAgICAgICAgLy8gbWFrZSBzbWFsbCBhZGp1c3RtZW50cyBhcyBuZWNlc3NhcnkgdG8gbGluZSB1cCB0aGUgY2FyZXRcbiAgICAgICAgLy8gd2l0aCB0aGUgdmlzdWFsIGNlbnRlciBvZiB0aGUgYW5jaG9yXG5cbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRYUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kY2FyZXQsIGN4LCAwKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuZGlhbG9nLiR3cmFwcGVyLCBkeCwgZHkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMuYWxpZ24oKTsgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkgeyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7IH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50OiBnZXRGcmFnLCBwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJUG9ydGFsIHsuLi5wcm9wcy5wb3J0YWxQcm9wc30+XG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsoaW5zdGFuY2UpID0+ICh0aGlzLmRpYWxvZyA9IGluc3RhbmNlKX1cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudChwcm9wcy5jYXJldENvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogKG5vZGUpID0+ICh0aGlzLiRjYXJldCA9IG5vZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXBvcG92ZXItY2FyZXQnLCBwcm9wcy5jYXJldENvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXBvcG92ZXInLCBwcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgPC9VSVBvcnRhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgbGFiZWw6IG51bGwsXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvbkNhbmNlbDogbm9vcCxcbiAgICAgICAgcHJvZ3Jlc3M6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3MuZGVmYXVsdFByb3BzKVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcHJvZ3Jlc3MtbGFiZWwnLCB0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcHJvZ3Jlc3MtY2FuY2VsJywgdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXByb2dyZXNzJywgdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcHJvZ3Jlc3Mtd3JhcHBlcicsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC90aGlzLnByb3BzLmNvbXBvbmVudD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICBleHBhbmRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0ZWFzZXI6IG51bGwsXG4gICAgICAgIHRlYXNlckV4cGFuZGVkOiBudWxsLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRoaXMucHJvcHMuY29tcG9uZW50XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktZGlzY2xvc3VyZScsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1kaXNjbG9zdXJlLXRvZ2dsZScsIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG4vKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsOiBudWxsLFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVJhZGlvLmRlZmF1bHRQcm9wcylcblxuICAgIHV1aWQgPSB1dWlkKClcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcmFkaW8nLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktcmFkaW8tbGFiZWwnLCB0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlSYWRpby5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS1yYWRpby13cmFwcGVyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiB0cnVlLFxuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInLCBwcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10ZXh0dWFsLWlucHV0JywgcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50OiBudWxsLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICB1cGRhdGVJbnB1dFN0YXRlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkXG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSB1cGNvbWluZyByZW5kZXIgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBieSBgc2V0VmFsdWVgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucmVzZXRNYXRjaGVzLCAwKTtcbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXJrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHRzLCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWF0Y2hlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhwcm92aWRlZEVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50aXRpZXMgPSBwcm92aWRlZEVudGl0aWVzIHx8IHByb3BzLmVudGl0aWVzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJywgcHJvcHMuY2xhc3NOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ3VpLXR5cGVhaGVhZC1tYXRjaCcsIGNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyh0aGlzLnN0YXRlLmlucHV0LCBlbnRpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHMsIHN0YXRlfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10eXBlYWhlYWQtd3JhcHBlcicsIHByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJVGV4dHVhbElucHV0LmRlZmF1bHRQcm9wcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktdHlwZWFoZWFkJywgcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5jb25zdCBmaXJzdCA9IChhcnJheSkgPT4gYXJyYXlbMF07XG5jb25zdCBsYXN0ID0gKGFycmF5KSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogKDxkaXY+WDwvZGl2PiksXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiB0cnVlLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9rZW5pemVkSW5wdXQuZGVmYXVsdFByb3BzKVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgLy8gcGFzc3Rocm91Z2hzIHRvIFVJVHlwZWFoZWFkSW5wdXQgaW5zdGFuY2UgbWV0aG9kc1xuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRJbnB1dE5vZGUoKVxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0VmFsdWUoKVxuICAgIHNlbGVjdCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KClcbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcigoaWR4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KCd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJywgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10b2tlbmZpZWxkLXRva2VuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9rZW5pemVkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCgndWktdG9rZW5maWVsZC13cmFwcGVyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyh0aGlzLnByb3BzLCBVSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlSW5wdXRDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgdGV4dDogJycsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9vbHRpcC5kZWZhdWx0UHJvcHMpXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jb21wb25lbnRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRvb2x0aXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCd1aS10b29sdGlwJywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3RoaXMucHJvcHMuY29tcG9uZW50PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vaXNTdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5ib2R5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmhlYWRlcikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiBpc1N0cmluZyhjb25maWcuaWNvbikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgaXNGdW5jdGlvbihjb25maWcub25DbGljaykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICAgICk7XG4gICAgfSk7XG59XG4iLCIvKipcbiAqIFVzZWQgdG8gY3JlYXRlIGFuIEVTNS1jb21wYXRpYmxlIHN0YW5kYWxvbmUgYnVpbGQsIGFuZCBzbyBpdCdzIHBvc3NpYmxlIHRvIGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKWBgXG4gKiBhbmQgZGlyZWN0bHkgdXNlIGEgY29tcG9uZW50IGxpa2U6IGByZXF1aXJlKCdlbmlnbWEtdWlraXQnKS5VSUJ1dHRvbmBcbiAqL1xuXG5leHBvcnQge2RlZmF1bHQgYXMgVUlBcnJvd0tleU5hdmlnYXRpb259IGZyb20gJy4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQnV0dG9ufSBmcm9tICcuL1VJQnV0dG9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUNoZWNrYm94fSBmcm9tICcuL1VJQ2hlY2tib3gnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3hHcm91cH0gZnJvbSAnLi9VSUNoZWNrYm94R3JvdXAnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRGlhbG9nfSBmcm9tICcuL1VJRGlhbG9nJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUZpdHRlZFRleHR9IGZyb20gJy4vVUlGaXR0ZWRUZXh0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUltYWdlfSBmcm9tICcuL1VJSW1hZ2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJTW9kYWx9IGZyb20gJy4vVUlNb2RhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQYWdpbmF0aW9ufSBmcm9tICcuL1VJUGFnaW5hdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQb3BvdmVyfSBmcm9tICcuL1VJUG9wb3Zlcic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQb3J0YWx9IGZyb20gJy4vVUlQb3J0YWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUHJvZ3Jlc3N9IGZyb20gJy4vVUlQcm9ncmVzcyc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmV9IGZyb20gJy4vVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUmFkaW99IGZyb20gJy4vVUlSYWRpbyc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlTZWdtZW50ZWRDb250cm9sfSBmcm9tICcuL1VJU2VnbWVudGVkQ29udHJvbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUb2tlbml6ZWRJbnB1dH0gZnJvbSAnLi9VSVRva2VuaXplZElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRleHR1YWxJbnB1dH0gZnJvbSAnLi9VSVRleHR1YWxJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUeXBlYWhlYWRJbnB1dH0gZnJvbSAnLi9VSVR5cGVhaGVhZElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRvb2x0aXB9IGZyb20gJy4vVUlUb29sdGlwJztcblxuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgbm90aWZ5IGZyb20gJy4vVUlVdGlscy9ub3RpZnknO1xuaW1wb3J0IHRyYW5zZm9ybVByb3BlcnR5IGZyb20gJy4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5pbXBvcnQgdXVpZCBmcm9tICcuL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBjb25zdCBVSVV0aWxzID0ge2V4dHJhY3RDaGlsZFByb3BzLCBub3RpZnksIHRyYW5zZm9ybVByb3BlcnR5LCB1dWlkfTtcbiJdLCJuYW1lcyI6WyJ0ZXN0Iiwib21pdEtleXNGcm9tU291cmNlT2JqZWN0Iiwic291cmNlIiwib21pdHRlZEtleXMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwicmVsb2NhdGVBY2NlcHRlZEtleXMiLCJoYXNoIiwia2V5IiwiaW5kZXhPZiIsIlVJQXJyb3dLZXlOYXZpZ2F0aW9uIiwic3RhdGUiLCJwcm9wcyIsImRlZmF1bHRBY3RpdmVDaGlsZEluZGV4IiwiaGFuZGxlS2V5RG93biIsImV2ZW50IiwibW9kZSIsIlZFUlRJQ0FMIiwiQk9USCIsInByZXZlbnREZWZhdWx0IiwibW92ZUZvY3VzIiwiSE9SSVpPTlRBTCIsImlzRnVuY3Rpb24iLCJvbktleURvd24iLCJoYW5kbGVGb2N1cyIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsImluZGV4IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJjaGlsZCIsIlJlYWN0IiwiQ2hpbGRyZW4iLCJ0b0FycmF5IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsImFjdGl2ZUNoaWxkSW5kZXgiLCJvbkZvY3VzIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic2V0Rm9jdXMiLCJuZXh0UHJvcHMiLCJudW1DaGlsZHJlbiIsImNvdW50IiwiY2hpbGROb2RlIiwicmVmcyIsIndyYXBwZXIiLCJIVE1MRWxlbWVudCIsImZpbmRET01Ob2RlIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HIiwiZm9jdXMiLCJkZWx0YSIsIm5leHRJbmRleCIsIm1hcCIsImNsb25lRWxlbWVudCIsInRhYkluZGV4IiwidW5kZWZpbmVkIiwib21pdCIsImludGVybmFsS2V5cyIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJmdW5jIiwibnVtYmVyIiwib25lT2YiLCJkZWZhdWx0UHJvcHMiLCJub29wIiwiVUlCdXR0b24iLCJoYW5kbGVDbGljayIsImRpc2FibGVkIiwidG9nZ2xlU3RhdGUiLCJvbkNsaWNrIiwicHJlc3NlZCIsImN4IiwiY2xhc3NOYW1lIiwibm9kZSIsImJvb2wiLCJ1dWlkIiwicmVwbGFjZSIsImEiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJVSUNoZWNrYm94IiwiaWQiLCJoYW5kbGVDaGFuZ2UiLCJpbnB1dFByb3BzIiwiY2hlY2tlZCIsIm5hbWUiLCJvbkNoYW5nZSIsImlucHV0IiwiaW5kZXRlcm1pbmF0ZSIsInNldEluZGV0ZXJtaW5hdGUiLCJTdHJpbmciLCJnZXRBcmlhU3RhdGUiLCJsYWJlbCIsImxhYmVsUHJvcHMiLCJyZW5kZXJJbnB1dCIsInJlbmRlckxhYmVsIiwic2hhcGUiLCJvYmplY3QiLCJVSUNoZWNrYm94R3JvdXAiLCJpdGVtcyIsImV2ZXJ5IiwiaXRlbSIsInNvbWUiLCJzZWxlY3RBbGwiLCJhbGxDaGVja2VkIiwiYWxsSXRlbXNDaGVja2VkIiwic2VsZWN0QWxsUHJvcHMiLCJhbnlJdGVtc0NoZWNrZWQiLCJvbkFsbENoZWNrZWQiLCJvbkFsbFVuY2hlY2tlZCIsIm9uQ2hpbGRDaGVja2VkIiwib25DaGlsZFVuY2hlY2tlZCIsInRvQmVSZW5kZXJlZCIsInJlbmRlckNoZWNrYm94ZXMiLCJzZWxlY3RBbGxQb3NpdGlvbiIsIkNvbnN0YW50cyIsIlNFTEVDVF9BTExfQkVGT1JFIiwidW5zaGlmdCIsInJlbmRlclNlbGVjdEFsbCIsIlNFTEVDVF9BTExfQUZURVIiLCJwdXNoIiwicmVuZGVyQ2hpbGRyZW4iLCJhcnJheU9mIiwiaXNSZXF1aXJlZCIsIlBPUlRBTF9EQVRBX0FUVFJJQlVURSIsIlVJUG9ydGFsIiwiJHBvcnRhbCIsIiRwYXNzZW5nZXIiLCJjcmVhdGVFbGVtZW50IiwiZGVzdGluYXRpb24iLCJhcHBlbmRDaGlsZCIsInJlbmRlclBvcnRhbGxlZENvbnRlbnQiLCJpc1ZhbGlkRWxlbWVudCIsInBvcnRhbElkIiwicmVuZGVyIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlbW92ZUNoaWxkIiwiQ29tcG9uZW50IiwiaW5zdGFuY2VPZiIsImJvZHkiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiVUlEaWFsb2ciLCJtb3VudGVkIiwidXVpZEhlYWRlciIsInV1aWRCb2R5IiwibmF0aXZlRXZlbnQiLCJjYXB0dXJlRm9jdXMiLCJjbG9zZU9uT3V0c2lkZUZvY3VzIiwiaXNQYXJ0T2ZEaWFsb2ciLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwib25DbG9zZSIsInByZXZpb3VzIiwiZXhwbGljaXRPcmlnaW5hbFRhcmdldCIsInJlbGF0ZWRUYXJnZXQiLCJjbG9zZU9uRXNjS2V5IiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiY2xvc2VPbk91dHNpZGVDbGljayIsImhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCIsImNsb3NlT25PdXRzaWRlU2Nyb2xsIiwicm9vdHMiLCIkd3JhcHBlciIsImNvbmNhdCIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCJlbGVtZW50Iiwibm9kZVR5cGUiLCJFTEVNRU5UX05PREUiLCJwYXJlbnROb2RlIiwiY29udGFpbnMiLCJhZGRFdmVudExpc3RlbmVyIiwiJGRpYWxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJib2R5UHJvcHMiLCJmb290ZXIiLCJmb290ZXJQcm9wcyIsImhlYWRlciIsImhlYWRlclByb3BzIiwid3JhcHBlclByb3BzIiwicmVuZGVyRm9jdXNCb3VuZGFyeSIsImJlZm9yZSIsInJlbmRlckhlYWRlciIsInJlbmRlckJvZHkiLCJyZW5kZXJGb290ZXIiLCJhZnRlciIsImluc3RhbmNlcyIsInRvSSIsInN0cmluZ051bWJlciIsInJlc2NhbGUiLCJpbnN0YW5jZSIsImNvbnRhaW5lckJveCIsImdldENvbXB1dGVkU3R5bGUiLCJmb250U2l6ZSIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJib3hTaXppbmciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwib3B0aW1pemVGb3JIZWlnaHQiLCJmbG9vciIsIm9mZnNldEhlaWdodCIsIm9wdGltaXplRm9yV2lkdGgiLCJvZmZzZXRXaWR0aCIsInN0eWxlIiwibWluIiwibWF4Rm9udFNpemUiLCJoYW5kbGVXaW5kb3dSZXNpemUiLCJmb3JFYWNoIiwicmVnaXN0ZXJJbnN0YW5jZSIsImxlbmd0aCIsInVucmVnaXN0ZXJJbnN0YW5jZSIsInNwbGljZSIsIlVJRml0dGVkVGV4dCIsImZ1bmN0aW9uIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiVUlJbWFnZSIsInN0YXR1cyIsIkxPQURJTkciLCJzcmMiLCJyZXNldFByZWxvYWRlciIsInByZWxvYWQiLCJsb2FkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwiTE9BREVEIiwiRVJST1IiLCJkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZVByb3BzIiwiYWx0Iiwic3RhdHVzUHJvcHMiLCJyZW5kZXJJbWFnZSIsInJlbmRlclN0YXR1cyIsImV4dHJhY3RDaGlsZFByb3BzIiwicGFyZW50UHJvcHMiLCJjaGlsZFByb3BUeXBlcyIsImNoaWxkUHJvcHMiLCJVSU1vZGFsIiwicG9ydGFsUHJvcHMiLCIkbW9kYWwiLCJtYXNrUHJvcHMiLCJtb2RhbFByb3BzIiwiVUlTZWdtZW50ZWRDb250cm9sIiwiYWN0aXZlSXRlbUluZGV4IiwiaW5kZXhPZk9wdGlvbkluRm9jdXMiLCJnZXRQcmV2aW91c09wdGlvbkluZGV4IiwiZ2V0TmV4dE9wdGlvbkluZGV4IiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb25zIiwidmFsdWUiLCJvcHRpb24iLCJzZWxlY3RlZCIsImN1cnJlbnRPcHRpb25JbmRleCIsIm5leHQiLCJvbkJsdXIiLCJvbk9wdGlvblNlbGVjdGVkIiwiZGVmaW5pdGlvbiIsImludGVybmFsQ2hpbGRLZXlzIiwiaGFuZGxlT3B0aW9uQmx1ciIsImJpbmQiLCJoYW5kbGVPcHRpb25Gb2N1cyIsImNvbnRlbnQiLCJyZW5kZXJPcHRpb25zIiwidmFsaWRhdGVPcHRpb25zIiwiRXJyb3IiLCJtaXNzaW5nU2VsZWN0ZWQiLCJzZWVuU2VsZWN0ZWQiLCJtdWx0aXBsZVNlbGVjdGVkIiwiaWRlbnRpdHkiLCJ4IiwiSXRlbSIsImRhdGEiLCJQcm9taXNlIiwiY29tcG9uZW50IiwiY2xvc3VyZVByb21pc2UiLCJ0aGVuIiwicmVzb2x2ZWRQYXlsb2FkIiwiY3VycmVudFByb3BzIiwiY29udmVydFRvSlNYRnVuYyIsImNvbnZlcnREYXRhVG9KU1hPcldhaXQiLCJleHRyYUNsYXNzZXMiLCJldmVuIiwiZ2V0Q2xhc3NlcyIsImxvYWRpbmdDb250ZW50IiwiVUlQYWdpbmF0aW9uIiwiaW5pdGlhbFBhZ2UiLCJudW1JdGVtc1BlclBhZ2UiLCJjdXJyZW50UGFnZSIsImdldFBhZ2VGb3JJbmRleCIsIml0ZW1zUGVyUGFnZSIsImNlaWwiLCJ0b3RhbFBhZ2VzIiwidG90YWxJdGVtcyIsImZpcnN0VmlzaWJsZUl0ZW1JbmRleCIsInBhZ2VUb0luZGV4IiwiaSIsIm5leHRUYXJnZXRJbmRleCIsImNvbnRyb2xzIiwiRklSU1QiLCJQUkVWSU9VUyIsIk5FWFQiLCJMQVNUIiwiaXRlbV8wIiwib2xkUHJvcHMiLCJpZGVudGlmaWVyIiwidGFyZ2V0SW5kZXgiLCJudW1QYWdlVG9nZ2xlcyIsInN0YXJ0UGFnZSIsImVuZFBhZ2UiLCJzaG93UGFnaW5hdGlvblN0YXRlIiwic2hvd0p1bXBUb0ZpcnN0IiwianVtcFRvRmlyc3RDb250cm9sQ29udGVudCIsInByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50IiwibmV4dFBhZ2VDb250cm9sQ29udGVudCIsInNob3dKdW1wVG9MYXN0IiwianVtcFRvTGFzdENvbnRyb2xDb250ZW50IiwiY3VzdG9tQ29udHJvbENvbnRlbnQiLCJnZW5lcmF0ZWRJdGVtcyIsImZpcnN0SXRlbUluZGV4IiwibGFzdEl0ZW1JbmRleCIsImdldEl0ZW0iLCJsaXN0V3JhcHBlclByb3BzIiwiaW5kZXhPZmZzZXQiLCJnZW5lcmF0ZUl0ZW1zIiwiaXRlbVRvSlNYQ29udmVydGVyRnVuYyIsIml0ZW1Mb2FkaW5nQ29udGVudCIsInBvc2l0aW9uIiwiaGlkZVBhZ2VySWZOb3ROZWVkZWQiLCJ0b2dnbGVXcmFwcGVyUHJvcHMiLCJwb3NpdGlvbkxvd2VyIiwidG9Mb3dlckNhc2UiLCJwb3NpdGlvbkNhcGl0YWxpemVkIiwidG9VcHBlckNhc2UiLCJjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucyIsInBvc2l0aW9ucyIsIkFCT1ZFIiwicmVuZGVyQ29udHJvbHMiLCJyZW5kZXJJdGVtcyIsIkJFTE9XIiwicmVuZGVyVmlldyIsInZhbGlkYXRlSW5pdGlhbFBhZ2UiLCJpc0ludGVnZXIiLCJudW1iZXJPZlBhZ2VzIiwidmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UiLCJkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSIsImxlbiIsImRvY3VtZW50RWxlbWVudCIsIndpdGhvdXQiLCJhcnIxIiwiYXJyMiIsImZpbHRlciIsInZhbHVlcyIsIm9iaiIsIkRFRkFVTFRfQ0FSRVRfQ09NUE9ORU5UIiwiVUlQb3BvdmVyIiwiYWxpZ24iLCJhbmNob3IiLCJjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkiLCJkeCIsInJvdW5kIiwiZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbiIsImR5IiwiZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbiIsImFsaWdubWVudENvcnJlY3Rpb24iLCJnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyIsImRpZEFsaWdubWVudENoYW5nZSIsIiRjYXJldCIsImxlZnQiLCJnZXROZXh0Q2FyZXRYUG9zaXRpb24iLCJ0b3AiLCJnZXROZXh0Q2FyZXRZUG9zaXRpb24iLCJhcHBseVRyYW5zbGF0aW9uIiwiZGlhbG9nIiwiYW5jaG9yWEFsaWduIiwicHJlc2V0IiwiYW5jaG9yWUFsaWduIiwic2VsZlhBbGlnbiIsInNlbGZZQWxpZ24iLCJhbmNob3JSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYW5jaG9yTGVmdCIsImFuY2hvclRvcCIsImFuY2hvckhlaWdodCIsImFuY2hvcldpZHRoIiwiYm9keUxlZnQiLCJzY3JvbGxMZWZ0IiwiYm9keVRvcCIsInNjcm9sbFRvcCIsImNhcmV0IiwibmV4dFgiLCJNSURETEUiLCJTVEFSVCIsIkVORCIsImNsaWVudFdpZHRoIiwibmV4dFkiLCJjbGllbnRIZWlnaHQiLCJhbmNob3JZIiwieSIsImF1dG9SZXBvc2l0aW9uIiwiY29ycmVjdGlvbnMiLCJ4TWF4Iiwic2Nyb2xsV2lkdGgiLCJ5TWF4Iiwic2Nyb2xsSGVpZ2h0IiwidHJhbnNmb3JtUHJvcCIsIm5leHRBbGlnbm1lbnQiLCJjdXJyZW50QWxpZ25tZW50IiwiY29uc3RhbnQiLCJnZXRGcmFnIiwiZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudCIsImNhcmV0Q29tcG9uZW50IiwicG9zaXRpb25WYWx1ZXMiLCJwcmVzZXRWYWx1ZXMiLCJVSVByb2dyZXNzIiwib25DYW5jZWwiLCJjYW5jZWxQcm9wcyIsInByb2dyZXNzUHJvcHMiLCJwcm9ncmVzcyIsInR3ZWVuUHJvcGVydHkiLCJyZW5kZXJQcm9ncmVzcyIsInJlbmRlckNhbmNlbCIsIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIiwiZXhwYW5kZWQiLCJkaXNwYXRjaENhbGxiYWNrIiwidG9nZ2xlUHJvcHMiLCJuZXdQcm9wcyIsInRlYXNlckV4cGFuZGVkIiwidGVhc2VyIiwicmVuZGVyQ29udGVudCIsIlVJUmFkaW8iLCJvblNlbGVjdGVkIiwiVUlUZXh0dWFsSW5wdXQiLCJpc1N0cmluZyIsInNldElucHV0VmFsdWUiLCJnZXRWYWx1ZSIsImZpZWxkIiwiaGFuZGxlQmx1ciIsImlzRm9jdXNlZCIsImlzQ29udHJvbGxlZCIsImRlZmF1bHRWYWx1ZSIsIm5leHRWYWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJpc05vbkVtcHR5Iiwic2hvdWxkU2hvd1BsYWNlaG9sZGVyIiwiaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyIsInBsYWNlaG9sZGVyIiwiZ2V0UGxhY2Vob2xkZXJUZXh0IiwicmVuZGVyUGxhY2Vob2xkZXIiLCJVSVR5cGVhaGVhZElucHV0IiwiY29tcHV0ZU1hdGNoZXMiLCJzZWxlY3RlZEVudGl0eUluZGV4Iiwib25FbnRpdHlIaWdobGlnaHRlZCIsImVudGl0aWVzIiwidXBkYXRlSW5wdXRTdGF0ZSIsImVudGl0eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXMiLCJzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSIsInRvdGFsTWF0Y2hlcyIsIm1hdGNoSW5kZXgiLCJtYXRjaGVzTm9kZSIsIm1hdGNoZXNOb2RlWUVuZCIsIm1hdGNoTm9kZSIsIm1hdGNoTm9kZVlTdGFydCIsIm9mZnNldFRvcCIsIm1hdGNoTm9kZVlFbmQiLCJnZXRJbnB1dE5vZGUiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImVudGl0eSIsImVudGl0eUNvbnRlbnQiLCJ0ZXh0IiwiZnJhZ3MiLCJzcGxpdCIsIlJlZ0V4cCIsImVzY2FwZXIiLCJub3JtYWxpemVkVXNlclRleHQiLCJ0aHJlc2hvbGQiLCJzZWVrVmFsdWUiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJhbGdvcml0aG0iLCJTVEFSVFNfV0lUSCIsIm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmciLCJtYXJrRnV6enlNYXRjaFN1YnN0cmluZyIsIm1hcmtlciIsIndhcm5lZE1hcmtlciIsIndhcm4iLCJ1c2VyVGV4dCIsIm5vcm1hbGl6ZWQiLCJmaW5kSW5kZXhlcyIsInJlc3VsdCIsInNlZWtNYXRjaCIsInJlc3VsdHMiLCJnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzIiwiZ2V0RnV6enlNYXRjaEluZGV4ZXMiLCJtYXRjaGVyIiwid2FybmVkTWF0Y2hlciIsInByb3ZpZGVkRW50aXRpZXMiLCJjdXJyZW50VmFsdWUiLCJnZXRNYXRjaEluZGV4ZXMiLCJvZmZzY3JlZW5DbGFzcyIsImdldFNlbGVjdGVkRW50aXR5VGV4dCIsImhpbnQiLCJyYXciLCJwcm9jZXNzZWQiLCJoaW50UHJvcHMiLCJtYXRjaFdyYXBwZXJQcm9wcyIsInJlc3QiLCJoYW5kbGVNYXRjaENsaWNrIiwibWFya01hdGNoU3Vic3RyaW5nIiwicmVuZGVyTm90aWZpY2F0aW9uIiwicmVuZGVySGludCIsInJlbmRlck1hdGNoZXMiLCJGVVpaWSIsInJlc2V0TWF0Y2hlcyIsInNlbGVjdCIsInNldFZhbHVlIiwib25FbnRpdHlTZWxlY3RlZCIsImNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24iLCJnZXRNYXJraW5nRnVuY3Rpb24iLCJnZXRNYXRjaGluZ0Z1bmN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiY3Vyc29yQXRFbmRPZklucHV0Iiwic2hpZnRLZXkiLCJzZWxlY3RNYXRjaCIsIm9uQ29tcGxldGUiLCJmaXJzdCIsImFycmF5IiwibGFzdCIsIlVJVG9rZW5pemVkSW5wdXQiLCJ0eXBlYWhlYWQiLCJhZGQiLCJ0b2tlbnMiLCJoYW5kbGVBZGRUb2tlbiIsImhhbmRsZUlucHV0Q2xpY2siLCJjbGVhclNlbGVjdGlvbiIsImhhbmRsZUlucHV0Rm9jdXMiLCJ3aGljaCIsInNlbGVjdFByZXZpb3VzVG9rZW4iLCJzZWxlY3ROZXh0VG9rZW4iLCJ0b2tlbnNTZWxlY3RlZCIsInJlbW92ZSIsIm1ldGFLZXkiLCJfc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24iLCJoYW5kbGVOZXdTZWxlY3Rpb24iLCJwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyIsImN1cnJlbnRTZWxlY3RlZEluZGV4ZXMiLCJpbmRleGVzIiwiaXNBcnJheSIsImlkeCIsImhhbmRsZVJlbW92ZVRva2VucyIsImFwcGVuZCIsInNlbGVjdFRva2VuIiwicHJldmlvdXNUb2tlbiIsInNlbGVjdFRva2VucyIsIm5leHRUb2tlbiIsInRva2VuQ2xvc2VDb21wb25lbnQiLCJ0b2tlbkNsb3NlVmlzaWJsZSIsImhhbmRsZVRva2VuQ2xvc2VDbGljayIsImhhbmRsZVRva2VuS2V5RG93biIsInJlbmRlclRva2VuQ2xvc2UiLCJyZW5kZXJUb2tlbnMiLCJVSVRvb2x0aXAiLCJCRUZPUkUiLCJBRlRFUiIsImVycm9ycyIsIk5vdGlmaWNhdGlvbkFQSSIsImRldGVjdFN1cHBvcnQiLCJOb3RpZmljYXRpb24iLCJ3ZWJraXROb3RpZmljYXRpb25zIiwibmF2aWdhdG9yIiwibW96Tm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdFJlY2VpdmVyIiwiRElTQUJMRUQiLCJjaGVja1Blcm1pc3Npb24iLCJOT1RfQVZBSUxBQkxFIiwicGVybWlzc2lvbiIsIm5vdGlmeSIsImNvbmZpZyIsIkNPTkZJR19NSVNTSU5HIiwiQ09ORklHX1RZUEUiLCJCT0RZX01JU1NJTkciLCJCT0RZX1RZUEUiLCJIRUFERVJfTUlTU0lORyIsIkhFQURFUl9UWVBFIiwiaWNvbiIsIklDT05fVFlQRSIsIk9OQ0xJQ0tfVFlQRSIsInNwYXduV2ViTm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uIiwiZXJyb3IiLCJVSVV0aWxzIiwidHJhbnNmb3JtUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtCQUFlLFVBQUNBLElBQUQ7U0FBVSxPQUFPQSxJQUFQLEtBQWdCLFVBQTFCO0NBQWY7O0FDQUE7Ozs7QUFJQSxBQUFlLFNBQVNDLHdCQUFULENBQWtDQyxNQUFsQyxFQUE0RDtRQUFsQkMsV0FBa0IsdUVBQUosRUFBSTs7V0FDaEVDLE9BQU9DLElBQVAsQ0FBWUgsTUFBWixFQUFvQkksTUFBcEIsQ0FBMkIsU0FBU0Msb0JBQVQsQ0FBOEJDLElBQTlCLEVBQW9DQyxHQUFwQyxFQUF5QztZQUNuRU4sWUFBWU8sT0FBWixDQUFvQkQsR0FBcEIsTUFBNkIsQ0FBQyxDQUFsQyxFQUFxQztpQkFDNUJBLEdBQUwsSUFBWVAsT0FBT08sR0FBUCxDQUFaOzs7ZUFHR0QsSUFBUDtLQUxHLEVBT0osRUFQSSxDQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDQ2lCRzs7Ozs7Ozs7Ozs7Ozs7cU5BOEJqQkMs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
