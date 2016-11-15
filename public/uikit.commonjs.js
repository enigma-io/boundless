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





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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
            return React__default.createElement(this.props.component, _extends({}, omitKeysFromSourceObject(this.props, UIArrowKeyNavigation.internalKeys), {
                ref: 'wrapper',
                onFocus: this.handleFocus,
                onKeyDown: this.handleKeyDown
            }), this.children());
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
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div',
    defaultActiveChildIndex: 0,
    mode: UIArrowKeyNavigation.mode.BOTH
};

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
                    className: index(defineProperty({
                        'ui-button': true,
                        'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                        'ui-button-pressed': this.props.pressed
                    }, this.props.className, !!this.props.className)),
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
    children: React__default.PropTypes.node,
    onClick: React__default.PropTypes.func,
    onPressed: React__default.PropTypes.func,
    onUnpressed: React__default.PropTypes.func,
    pressed: React__default.PropTypes.bool
};
UIButton.internalKeys = Object.keys(UIButton.propTypes);
UIButton.defaultProps = {
    onPressed: noop,
    onUnpressed: noop
};

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
 * @class UICheckbox
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
                className: index(defineProperty({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                    'ui-checkbox-checked': this.props.inputProps.checked,
                    'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked
                }, this.props.inputProps.className, !!this.props.inputProps.className)),
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
                        className: index(defineProperty({
                            'ui-checkbox-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)),
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
                    className: index(defineProperty({
                        'ui-checkbox-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
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
UICheckbox.internalKeys = Object.keys(UICheckbox.propTypes);
UICheckbox.defaultProps = {
    inputProps: {
        checked: false,
        indeterminate: false
    },
    labelProps: {},
    onChecked: noop,
    onUnchecked: noop
};

/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 * @class UICheckboxGroup
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
                    className: index(defineProperty({
                        'ui-checkbox-group-selectall': true
                    }, this.props.selectAllProps.className, !!this.props.selectAllProps.className)),
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
                    className: index(defineProperty({
                        'ui-checkbox-group': true
                    }, this.props.className, !!this.props.className)) }),
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
UICheckboxGroup.internalKeys = Object.keys(UICheckboxGroup.propTypes);
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
UIPortal.internalKeys = Object.keys(UIPortal.propTypes);
UIPortal.defaultProps = {
    destination: document.body
};

/**
 * A non-blocking, focus-stealing container.
 * @class UIDialog
 */

var toArray$1 = Array.prototype.slice;

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
                    className: index(defineProperty({
                        'ui-dialog-body': true
                    }, this.props.bodyProps.className, !!this.props.bodyProps.className)) }),
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
                        className: index(defineProperty({
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
                return React__default.createElement(
                    'header',
                    _extends({}, this.props.headerProps, {
                        id: this.props.headerProps.id || this.uuidHeader,
                        className: index(defineProperty({
                            'ui-dialog-header': true
                        }, this.props.headerProps.className, !!this.props.headerProps.className)) }),
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
                    className: index(defineProperty({
                        'ui-dialog-wrapper': true
                    }, this.props.wrapperProps.className, !!this.props.wrapperProps.className)),
                    tabIndex: '0' }),
                this.renderFocusBoundary(),
                this.props.before,
                React__default.createElement(
                    'div',
                    _extends({}, omitKeysFromSourceObject(this.props, UIDialog.internalKeys), {
                        ref: function ref(node) {
                            return _this2.$dialog = node;
                        },
                        className: index(defineProperty({
                            'ui-dialog': true
                        }, this.props.className, !!this.props.className)),
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
    after: React__default.PropTypes.node,
    before: React__default.PropTypes.node,
    bodyProps: React__default.PropTypes.object,
    captureFocus: React__default.PropTypes.bool,
    children: React__default.PropTypes.node,
    closeOnEscKey: React__default.PropTypes.bool,
    closeOnOutsideClick: React__default.PropTypes.bool,
    closeOnOutsideFocus: React__default.PropTypes.bool,
    closeOnOutsideScroll: React__default.PropTypes.bool,
    footer: React__default.PropTypes.node,
    footerProps: React__default.PropTypes.object,
    header: React__default.PropTypes.node,
    headerProps: React__default.PropTypes.object,
    onClose: React__default.PropTypes.func,
    wrapperProps: React__default.PropTypes.object
};
UIDialog.internalKeys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: noop,
    wrapperProps: {}
};

/**
 * Fit given text inside a parent container, obeying implict and explicit constraints.
 * @class UIFittedText
 */

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
                'span',
                _extends({}, omitKeysFromSourceObject(this.props, UIFittedText.internalKeys), {
                    className: index(defineProperty({
                        'ui-text': true
                    }, this.props.className, !!this.props.className)) }),
                this.props.children
            );
        }
    }]);
    return UIFittedText;
}(React__default.PureComponent);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.propTypes = {
    children: React__default.PropTypes.oneOfType([React__default.PropTypes.string, React__default.PropTypes.number]),
    maxFontSize: React__default.PropTypes.number
};
UIFittedText.internalKeys = Object.keys(UIFittedText.propTypes);

/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
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
                    className: index(defineProperty({
                        'ui-image': true
                    }, this.props.imageProps.className, !!this.props.imageProps.className)),
                    title: this.props.alt,
                    style: _extends({}, this.props.imageProps.style, {
                        backgroundImage: 'url(' + this.props.src + ')'
                    }) }));
            }

            return React__default.createElement('img', _extends({}, this.props.imageProps, {
                ref: 'image',
                className: index(defineProperty({
                    'ui-image': true
                }, this.props.imageProps.className, !!this.props.imageProps.className)),
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
                className: index(defineProperty({
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
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIImage.internalKeys), {
                    ref: 'wrapper',
                    className: index(defineProperty({
                        'ui-image-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
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
    alt: React__default.PropTypes.string,
    displayAsBackgroundImage: React__default.PropTypes.bool,
    imageProps: React__default.PropTypes.object,
    src: React__default.PropTypes.string.isRequired,
    statusProps: React__default.PropTypes.object
};
UIImage.internalKeys = Object.keys(UIImage.propTypes);
UIImage.defaultProps = {
    imageProps: {},
    statusProps: {}
};

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
                        className: index(defineProperty({
                            'ui-modal-wrapper': true
                        }, props.className, !!props.className)) }),
                    React__default.createElement('div', _extends({}, props.maskProps, {
                        className: index(defineProperty({
                            'ui-modal-mask': true
                        }, props.maskProps.className, !!props.maskProps.className)) })),
                    React__default.createElement(
                        UIDialog,
                        _extends({}, extractChildProps(props, UIDialog.propTypes), props.modalProps, {
                            className: index(defineProperty({
                                'ui-modal': true
                            }, props.modalProps.className, !!props.modalProps.className)) }),
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
UIModal.internalKeys = Object.keys(UIModal.propTypes);
UIModal.defaultProps = _extends({}, UIDialog.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {},
    portalProps: {}
});

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
 * @class UISegmentedControl
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
                        className: index(defineProperty({
                            'ui-segmented-control-option': true,
                            'ui-segmented-control-option-selected': definition.selected
                        }, definition.className, !!definition.className)),
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
                    'aria-role': 'radiogroup',
                    className: index(defineProperty({
                        'ui-segmented-control': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown }),
                this.renderOptions()
            );
        }
    }]);
    return UISegmentedControl;
}(React__default.PureComponent);

UISegmentedControl.propTypes = {
    onOptionSelected: React__default.PropTypes.func,
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
UISegmentedControl.internalKeys = Object.keys(UISegmentedControl.propTypes);
UISegmentedControl.internalChildKeys = ['content', 'value', 'selected'];
UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: noop
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
            return index({
                'ui-pagination-item': true,
                'ui-pagination-item-even': this.props.even,
                'ui-pagination-item-odd': !this.props.even,
                'ui-pagination-item-loading': this.state.component === null
            }) + (extraClasses ? ' ' + extraClasses : '');
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
Item.internalKeys = Object.keys(Item.propTypes);

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
                    className: index(defineProperty({
                        'ui-pagination-items': true
                    }, props.className, !!props.className)) }),
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
            var _cx2;

            if (this.props.hidePagerIfNotNeeded && this.props.totalItems <= this.props.numItemsPerPage) {
                return;
            }

            var props = this.props.toggleWrapperProps;
            var positionLower = position.toLowerCase();
            var positionCapitalized = positionLower[0].toUpperCase() + positionLower.slice(1);

            return React__default.createElement(UISegmentedControl, _extends({}, props, {
                ref: 'segmentedControl' + positionCapitalized,
                className: index((_cx2 = {
                    'ui-pagination-controls': true
                }, defineProperty(_cx2, 'ui-pagination-controls-' + positionLower, true), defineProperty(_cx2, props.className, !!props.className), _cx2)),
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
                    className: index(defineProperty({
                        'ui-pagination-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
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
UIPagination.internalKeys = Object.keys(UIPagination.propTypes);
UIPagination.defaultProps = {
    getItem: noop,
    hidePagerIfNotNeeded: false,
    initialPage: 1,
    itemToJSXConverterFunc: function itemToJSXConverterFunc(data) {
        return data;
    },
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
    toggleWrapperProps: {}
};

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

/**
 * A non-blocking container positioned to a specific anchor element.
 * @class UIPopover
 */

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
                _cx2;

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
                        className: index('ui-popover-caret', defineProperty({}, props.caretComponent.props.className, !!props.caretComponent.props.className))
                    }),
                    wrapperProps: _extends({}, props.wrapperProps, {
                        className: index('ui-popover', (_cx2 = {}, defineProperty(_cx2, 'ui-popover-anchor-x-' + getFrag(state.anchorXAlign), true), defineProperty(_cx2, 'ui-popover-anchor-y-' + getFrag(state.anchorYAlign), true), defineProperty(_cx2, 'ui-popover-self-x-' + getFrag(state.selfXAlign), true), defineProperty(_cx2, 'ui-popover-self-y-' + getFrag(state.selfYAlign), true), defineProperty(_cx2, props.wrapperProps.className, !!props.wrapperProps.className), _cx2))
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
UIPopover.internalKeys = without(Object.keys(UIPopover.propTypes), Object.keys(UIDialog.propTypes));
UIPopover.defaultProps = _extends({}, UIDialog.defaultProps, {
    autoReposition: true,
    captureFocus: false,
    caretComponent: React__default.createElement(
        'svg',
        { viewBox: '0 0 14 9.5', xmlns: 'http://www.w3.org/2000/svg' },
        React__default.createElement(
            'g',
            null,
            React__default.createElement('polygon', { className: 'ui-popover-caret-border', fill: '#000', points: '7 0 14 10 0 10' }),
            React__default.createElement('polygon', { className: 'ui-popover-caret-fill', fill: '#FFF', points: '6.98230444 1.75 12.75 10 1.25 10' })
        )
    ),
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    portalProps: {},
    preset: UIPopover.preset.BELOW,
    wrapperProps: {}
});

/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 * @class UIProgress
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
                        className: index(defineProperty({
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
                return React__default.createElement(UIButton, _extends({}, this.props.cancelProps, {
                    ref: 'cancel',
                    className: index(defineProperty({
                        'ui-progress-cancel': true
                    }, this.props.cancelProps.className, !!this.props.cancelProps.className)),
                    onPressed: this.props.onCancel }));
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            return React__default.createElement('div', _extends({}, this.props.progressProps, {
                ref: 'progress',
                className: index(defineProperty({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined'
                }, this.props.progressProps.className, !!this.props.progressProps.className)),
                role: 'presentation',
                style: _extends({}, this.props.progressProps.style, defineProperty({}, this.props.tweenProperty, this.props.progress)) }));
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIProgress.internalKeys), {
                    ref: 'wrapper',
                    className: index(defineProperty({
                        'ui-progress-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderProgress(),
                this.renderLabel(),
                this.renderCancel()
            );
        }
    }]);
    return UIProgress;
}(React__default.PureComponent);

UIProgress.propTypes = {
    cancelProps: React__default.PropTypes.object,
    label: React__default.PropTypes.node,
    labelProps: React__default.PropTypes.object,
    onCancel: React__default.PropTypes.func,
    progress: React__default.PropTypes.oneOfType([React__default.PropTypes.string, React__default.PropTypes.number]),
    progressProps: React__default.PropTypes.object,
    tweenProperty: React__default.PropTypes.string
};
UIProgress.internalKeys = Object.keys(UIProgress.propTypes);
UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width'
};

/**
 * Hide content until it's needed.
 * @class UIProgressiveDisclosure
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
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UIProgressiveDisclosure.internalKeys), {
                    ref: 'wrapper',
                    className: index(defineProperty({
                        'ui-disclosure': true,
                        'ui-disclosure-expanded': this.state.expanded
                    }, this.props.className, !!this.props.className)) }),
                React__default.createElement(
                    'div',
                    _extends({}, this.props.toggleProps, {
                        ref: 'toggle',
                        className: index(defineProperty({
                            'ui-disclosure-toggle': true
                        }, this.props.toggleProps.className, !!this.props.toggleProps.className)),
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
    children: React__default.PropTypes.node,
    expanded: React__default.PropTypes.bool,
    onExpand: React__default.PropTypes.func,
    onHide: React__default.PropTypes.func,
    teaser: React__default.PropTypes.node,
    teaserExpanded: React__default.PropTypes.node,
    toggleProps: React__default.PropTypes.object
};
UIProgressiveDisclosure.internalKeys = Object.keys(UIProgressiveDisclosure.propTypes);
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: noop,
    onHide: noop,
    toggleProps: {}
};

/**
 * An accessible radio form control.
 * @class UIRadio
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
                className: index(defineProperty({
                    'ui-radio': true,
                    'ui-radio-selected': this.props.selected
                }, this.props.inputProps.className, !!this.props.inputProps.className)),
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
                        className: index(defineProperty({
                            'ui-radio-label': true
                        }, this.props.labelProps.className, !!this.props.labelProps.className)),
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
                    className: index(defineProperty({
                        'ui-radio-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderInput(),
                this.renderLabel()
            );
        }
    }]);
    return UIRadio;
}(React__default.PureComponent);

UIRadio.propTypes = {
    inputProps: React__default.PropTypes.object,
    label: React__default.PropTypes.node,
    labelProps: React__default.PropTypes.object,
    name: React__default.PropTypes.string.isRequired,
    onSelected: React__default.PropTypes.func,
    selected: React__default.PropTypes.bool,
    value: React__default.PropTypes.string.isRequired
};
UIRadio.internalKeys = Object.keys(UIRadio.propTypes);
UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: noop,
    selected: false
};

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
                    className: index(defineProperty({
                        'ui-textual-input-wrapper': true
                    }, props.className, Boolean(props.className))),
                    title: this.getPlaceholderText() }),
                this.renderPlaceholder(),
                React__default.createElement('input', _extends({}, props.inputProps, {
                    ref: 'field',
                    className: index(defineProperty({
                        'ui-textual-input': true
                    }, props.inputProps.className, Boolean(props.inputProps.className))),
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
UITextualInput.internalKeys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};

/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
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
                        className: index(defineProperty({
                            'ui-textual-input': true,
                            'ui-textual-input-placeholder': true,
                            'ui-typeahead-hint': true
                        }, this.props.hintProps.className, !!this.props.hintProps.className)),
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
                        className: index(defineProperty({
                            'ui-typeahead-match-wrapper': true
                        }, props.className, !!props.className)) }),
                    this.state.entityMatchIndexes.map(function (index$$1) {
                        var entity = _this3.props.entities[index$$1];
                        var className = entity.className,
                            text = entity.text,
                            rest = objectWithoutProperties(entity, ['className', 'text']);


                        return React__default.createElement(
                            'div',
                            _extends({}, rest, {
                                ref: 'match_$' + index$$1,
                                className: index(defineProperty({
                                    'ui-typeahead-match': true,
                                    'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index$$1
                                }, className, !!className)),
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
                    className: index(defineProperty({
                        'ui-typeahead-wrapper': true
                    }, props.className, !!props.className)),
                    onKeyDown: this.handleKeyDown }),
                this.renderNotification(),
                this.renderHint(),
                React__default.createElement(UITextualInput, _extends({}, extractChildProps(props, UITextualInput.propTypes), {
                    ref: 'input',
                    'aria-controls': state.id,
                    inputProps: _extends({}, props.inputProps, {
                        className: index(defineProperty({
                            'ui-typeahead': true
                        }, props.inputProps.className, !!props.inputProps.className)),
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
UITypeaheadInput.internalKeys = Object.keys(UITypeaheadInput.propTypes);
UITypeaheadInput.defaultProps = _extends({}, UITextualInput.defaultProps, {
    algorithm: UITypeaheadInput.mode.FUZZY,
    clearPartialInputOnSelection: false,
    entities: [],
    hintProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: noop,
    onEntityHighlighted: noop,
    onEntitySelected: noop
});

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

/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 * @class UITokenizedInput
 */

var first = function first(array) {
    return array[0];
};
var last = function last(array) {
    return array[array.length - 1];
};

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
                    className: index(defineProperty({
                        'ui-tokenfield-token-close': true
                    }, this.props.tokenCloseComponent.props.className, Boolean(this.props.tokenCloseComponent.props.className))),
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
                            className: index({
                                'ui-tokenfield-token': true,
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
                    className: index(defineProperty({
                        'ui-tokenfield-wrapper': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown }),
                this.renderTokens(),
                React__default.createElement(UITypeaheadInput, _extends({}, extractChildProps(this.props, UITypeaheadInput.propTypes), {
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
    handleAddToken: React__default.PropTypes.func,
    handleRemoveTokens: React__default.PropTypes.func,
    handleNewSelection: React__default.PropTypes.func,
    tokenCloseComponent: React__default.PropTypes.element,
    tokenCloseVisible: React__default.PropTypes.bool,
    tokens: React__default.PropTypes.arrayOf(React__default.PropTypes.number),
    tokensSelected: React__default.PropTypes.arrayOf(React__default.PropTypes.number)
});
UITokenizedInput.internalKeys = Object.keys(UITokenizedInput.propTypes);
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

/**
 * A wrapper that displays provided text on hover.
 * @class UITooltip
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
                'div',
                _extends({}, omitKeysFromSourceObject(this.props, UITooltip.internalKeys), {
                    className: index(defineProperty({
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
}(React__default.PureComponent);

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};
UITooltip.propTypes = {
    position: React__default.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: React__default.PropTypes.string
};
UITooltip.internalKeys = Object.keys(UITooltip.propTypes);
UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE
};

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIGRlZmF1bHRBY3RpdmVDaGlsZEluZGV4OiAwLFxuICAgICAgICBtb2RlOiBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVtpbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiBpbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS1za2lwJzogcGFyc2VJbnQoY2hpbGQucHJvcHMudGFiSW5kZXgsIDEwKSA9PT0gLTEgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgfTtcblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUJ1dHRvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgIH07XG5cbiAgICB0b2dnbGVTdGF0ZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlCdXR0b24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEFkZGVkIGEgcHJlZml4IHNvIHRoZSBnZW5lcmF0ZWQgSUQgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyBhbiBIVE1MIElELlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIHVpa2l0LTFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuICd1aWtpdC0nICsgKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3gucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25VbmNoZWNrZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgaWQgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLmlucHV0UHJvcHMsICdpbmRldGVybWluYXRlJyl9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3guaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94R3JvdXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBjb25zdCBQT1JUQUxfREFUQV9BVFRSSUJVVEUgPSAnZGF0YS1wb3J0YWwtaWQnO1xuXG4vKipcbiAqIEEgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCBmb3IgdGhlIHJlbmRlcmluZyBvZiBjb21wb25lbnRzIG91dHNpZGUgdGhlIG5vcm1hbCBSZWFjdCB0cmVlLlxuICogT25seSBhY2NlcHRzIGEgc2luZ2xlIHRvcC1sZXZlbCBjaGlsZDsgbmFrZWQgdGV4dCwgZXRjIHdpbGwgYmUgd3JhcHBlZCBpbiBhIDxkaXY+LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLy8gc2luZ2xlIGNoaWxkIG9ubHkgLSBhcnJheXMgbm90IGFsbG93ZWRcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgZGVzdGluYXRpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUG9ydGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5ib2R5LFxuICAgIH1cblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICAvLyB0aGUgPGRpdj4gdGhhdCB0aGUgY2hpbGRyZW4gYXJlIHJlbmRlcmVkIGludG9cbiAgICAkcG9ydGFsID0gbnVsbFxuXG4gICAgLy8gdGhlIHRvcC1sZXZlbCBjaGlsZCByZW5kZXJlZCBpbnRvIHRoZSAkcG9ydGFsXG4gICAgJHBhc3NlbmdlciA9IG51bGw7XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJHBvcnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKHRoaXMuJHBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJQb3J0YWxsZWRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUG9ydGFsbGVkQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiAoPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9ydGFsIElEIGxpbmsgaWYgbmVlZGVkXG4gICAgICAgIHRoaXMuJHBvcnRhbC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZDtcblxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoY2hpbGQsIHRoaXMuJHBvcnRhbCk7XG4gICAgICAgIHRoaXMuJHBhc3NlbmdlciA9IHRoaXMuJHBvcnRhbC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpOyB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcnRhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHsuLi57W1BPUlRBTF9EQVRBX0FUVFJJQlVURV06IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZH19IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHtQT1JUQUxfREFUQV9BVFRSSUJVVEV9IGZyb20gJy4uL1VJUG9ydGFsJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNvbnN0IHRvQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWZ0ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBiZWZvcmU6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgY29uc3Qgcm9vdHMgPSBbdGhpcy4kd3JhcHBlcl0uY29uY2F0KFxuICAgICAgICAgICAgdG9BcnJheS5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuJHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChgWyR7UE9SVEFMX0RBVEFfQVRUUklCVVRFfV1gKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZShQT1JUQUxfREFUQV9BVFRSSUJVVEUpKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlO1xuXG4gICAgICAgIHJldHVybiByb290cy5zb21lKChkb20pID0+IGRvbS5jb250YWlucyhlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucHJvcHMub25DbG9zZSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmhlYWRlclByb3BzLmlkIHx8IHRoaXMudXVpZEhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiR3cmFwcGVyID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlJbWFnZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBwb3J0YWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgICAgIHBvcnRhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiRtb2RhbCA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVUlQb3J0YWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0ludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNJbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNJbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PSB0b0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMy4yKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gIHJldHVybiByZXN1bHQgPT09IHJlc3VsdCA/IChyZW1haW5kZXIgPyByZXN1bHQgLSByZW1haW5kZXIgOiByZXN1bHQpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW50ZWdlcjtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcHJvbWlzZXMgYXMgY2hpbGRyZW4gYW5kIGV2ZW50dWFsbHkgZG9pbmcgc29tZXRoaW5nIHdpdGggdGhlaXIgcmVzb2x2ZWQgcGF5bG9hZC5cbiAqL1xuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbnZlcnRUb0pTWEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcbiAgICBzdGF0ZSA9IHt9XG5cbiAgICBjb252ZXJ0RGF0YVRvSlNYT3JXYWl0KHByb3BzID0gdGhpcy5wcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudDogbnVsbH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUHJvbWlzZSA9IHByb3BzLmRhdGE7XG5cbiAgICAgICAgICAgIHByb3BzLmRhdGEudGhlbigocmVzb2x2ZWRQYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgY3VycmVudFByb3BzKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBjdXJyZW50UHJvcHMuZGF0YSA9PT0gY2xvc3VyZVByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50UHJvcHMuY29udmVydFRvSlNYRnVuYyhyZXNvbHZlZFBheWxvYWQsIGN1cnJlbnRQcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZS5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LCBub29wKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBwcm9wcy5jb252ZXJ0VG9KU1hGdW5jKHByb3BzLmRhdGEsIHByb3BzLmluZGV4KX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpICAgICAgICAgICAgICAgICB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdCgpOyB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSAgICAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gdHJ1ZTsgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdChuZXh0UHJvcHMpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gZmFsc2U7IH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuY29tcG9uZW50ID09PSBudWxsLFxuICAgICAgICB9KSArIChleHRyYUNsYXNzZXMgPyAnICcgKyBleHRyYUNsYXNzZXMgOiAnJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wb25lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyl9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nQ29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMuc3RhdGUuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKHRoaXMuc3RhdGUuY29tcG9uZW50LnByb3BzICYmIHRoaXMuc3RhdGUuY29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IHRoaXMucHJvcHMuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIHV0aWxpdHkgY29tcG9uZW50IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zLCBwb3NzaWJseSB2YXJ5aW5nIGluIERPTSBsYXlvdXQvc2l6ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLmluaXRpYWxQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLmluaXRpYWxQYWdlIDwgMSB8fCBwcm9wcy5pbml0aWFsUGFnZSA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXRlbUxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcblxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93UGFnaW5hdGlvblN0YXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IChkYXRhKSA9PiBkYXRhLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0aW9uLnBvc2l0aW9ucy5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gKGkpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpc0Z1bmN0aW9uKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydFRvSlNYRnVuYz17dGhpcy5wcm9wcy5pdGVtVG9KU1hDb252ZXJ0ZXJGdW5jfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DYXBpdGFsaXplZCA9IHBvc2l0aW9uTG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXIuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgc2VnbWVudGVkQ29udHJvbCR7cG9zaXRpb25DYXBpdGFsaXplZH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcGFnaW5hdGlvbi1jb250cm9scy0ke3Bvc2l0aW9uTG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJUG9ydGFsIGZyb20gJy4uL1VJUG9ydGFsJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuXG5mdW5jdGlvbiB3aXRob3V0KGFycjEsIGFycjIpIHsgcmV0dXJuIGFycjEuZmlsdGVyKChpdGVtKSA9PiBhcnIyLmluZGV4T2YoaXRlbSkgPT09IC0xKTsgfVxuZnVuY3Rpb24gdmFsdWVzKG9iaikgICAgICAgICB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiBvYmpba2V5XSk7IH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25WYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnBvc2l0aW9uKVxuXG4gICAgc3RhdGljIHByZXNldCA9IHtcbiAgICAgICAgJ0FCT1ZFJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0JFTE9XJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0xFRlQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgICAgICAnUklHSFQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVzZXRWYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnByZXNldClcblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgYW5jaG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgcHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjYXJldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIHBvcnRhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJyAvPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtZmlsbCcgZmlsbD0nI0ZGRicgcG9pbnRzPSc2Ljk4MjMwNDQ0IDEuNzUgMTIuNzUgMTAgMS4yNSAxMCcgLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIHBvcnRhbFByb3BzOiB7fSxcbiAgICAgICAgcHJlc2V0OiBVSVBvcG92ZXIucHJlc2V0LkJFTE9XLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogcHJvcHMuYW5jaG9yWEFsaWduICB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBwcm9wcy5zZWxmWEFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogcHJvcHMuc2VsZllBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZllBbGlnbixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvclJlY3QgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5hbmNob3JMZWZ0ID0gYW5jaG9yUmVjdC5sZWZ0O1xuICAgICAgICB0aGlzLmFuY2hvclRvcCA9IGFuY2hvclJlY3QudG9wO1xuICAgICAgICB0aGlzLmFuY2hvckhlaWdodCA9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICB0aGlzLmFuY2hvcldpZHRoID0gYW5jaG9yUmVjdC53aWR0aDtcblxuICAgICAgICB0aGlzLmJvZHlMZWZ0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuICAgICAgICB0aGlzLmJvZHlUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBnZXROZXh0Q2FyZXRYUG9zaXRpb24oYW5jaG9yLCBjYXJldCA9IHRoaXMuJGNhcmV0KSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ24sIGFuY2hvcllBbGlnbiwgc2VsZllBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSAwO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBjaGFuZ2UgdGhlIFggcG9zaXRpb24gd2hlbiB3ZSdyZVxuICAgICAgICAvLyBmdWxseSBhYm92ZSBvciBiZWxvdyB0aGUgYW5jaG9yIGFuZCBzZWxmWEFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWEFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRZID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBZIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIGFuY2hvciAoc3RhcnQsZW5kIHwgZW5kLHN0YXJ0KVxuICAgICAgICAvLyBzZWxmWUFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWUFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuYW5jaG9ySGVpZ2h0IC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSB0aGlzLmFuY2hvckxlZnQgKyB0aGlzLmJvZHlMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLmRpYWxvZy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gdGhpcy5hbmNob3JUb3AgKyB0aGlzLmJvZHlUb3A7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7Li4udGhpcy5zdGF0ZX07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWRBbGlnbm1lbnRDaGFuZ2UobmV4dEFsaWdubWVudCwgY3VycmVudEFsaWdubWVudCA9IHRoaXMuc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICAgIG5leHRBbGlnbm1lbnQuYW5jaG9yWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvclhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5hbmNob3JZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWUFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZlhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZZQWxpZ247XG4gICAgfVxuXG4gICAgYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcik7XG5cbiAgICAgICAgY29uc3QgZHggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbihhbmNob3IpKTtcbiAgICAgICAgY29uc3QgZHkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IpKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhkeCwgZHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIHRoaXMuZGlkQWxpZ25tZW50Q2hhbmdlKGFsaWdubWVudENvcnJlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5kaWFsb2cuJHdyYXBwZXIsIGR4LCBkeSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHsgdGhpcy5hbGlnbigpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTsgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge2dldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ6IGdldEZyYWcsIHByb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gKHRoaXMuZGlhbG9nID0gaW5zdGFuY2UpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3Zlci1jYXJldCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXBvcG92ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgPC9VSVBvcnRhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSYWRpbyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVJhZGlvLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIHV1aWQgPSB1dWlkKClcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlSYWRpby5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICB1cGRhdGVJbnB1dFN0YXRlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkXG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSB1cGNvbWluZyByZW5kZXIgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBieSBgc2V0VmFsdWVgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucmVzZXRNYXRjaGVzLCAwKTtcbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXJrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHRzLCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWF0Y2hlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhwcm92aWRlZEVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50aXRpZXMgPSBwcm92aWRlZEVudGl0aWVzIHx8IHByb3BzLmVudGl0aWVzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgZmlyc3QgPSAoYXJyYXkpID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IChhcnJheSkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogKDxkaXY+WDwvZGl2PiksXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiB0cnVlLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgLy8gcGFzc3Rocm91Z2hzIHRvIFVJVHlwZWFoZWFkSW5wdXQgaW5zdGFuY2UgbWV0aG9kc1xuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRJbnB1dE5vZGUoKVxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0VmFsdWUoKVxuICAgIHNlbGVjdCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KClcbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcigoaWR4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb2tlbml6ZWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHRoaXMucHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVJbnB1dENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb29sdGlwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9vbHRpcC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUFycm93S2V5TmF2aWdhdGlvbn0gZnJvbSAnLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlCdXR0b259IGZyb20gJy4vVUlCdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3h9IGZyb20gJy4vVUlDaGVja2JveCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveEdyb3VwfSBmcm9tICcuL1VJQ2hlY2tib3hHcm91cCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlEaWFsb2d9IGZyb20gJy4vVUlEaWFsb2cnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRml0dGVkVGV4dH0gZnJvbSAnLi9VSUZpdHRlZFRleHQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJSW1hZ2V9IGZyb20gJy4vVUlJbWFnZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlNb2RhbH0gZnJvbSAnLi9VSU1vZGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBhZ2luYXRpb259IGZyb20gJy4vVUlQYWdpbmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcG92ZXJ9IGZyb20gJy4vVUlQb3BvdmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcnRhbH0gZnJvbSAnLi9VSVBvcnRhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQcm9ncmVzc30gZnJvbSAnLi9VSVByb2dyZXNzJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZX0gZnJvbSAnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlSYWRpb30gZnJvbSAnLi9VSVJhZGlvJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVNlZ21lbnRlZENvbnRyb2x9IGZyb20gJy4vVUlTZWdtZW50ZWRDb250cm9sJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRva2VuaXplZElucHV0fSBmcm9tICcuL1VJVG9rZW5pemVkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVGV4dHVhbElucHV0fSBmcm9tICcuL1VJVGV4dHVhbElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVR5cGVhaGVhZElucHV0fSBmcm9tICcuL1VJVHlwZWFoZWFkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9vbHRpcH0gZnJvbSAnLi9VSVRvb2x0aXAnO1xuXG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnLi9VSVV0aWxzL25vdGlmeSc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcGVydHkgZnJvbSAnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCB1dWlkIGZyb20gJy4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGNvbnN0IFVJVXRpbHMgPSB7ZXh0cmFjdENoaWxkUHJvcHMsIG5vdGlmeSwgdHJhbnNmb3JtUHJvcGVydHksIHV1aWR9O1xuIl0sIm5hbWVzIjpbInRlc3QiLCJvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3QiLCJzb3VyY2UiLCJvbWl0dGVkS2V5cyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJyZWxvY2F0ZUFjY2VwdGVkS2V5cyIsImhhc2giLCJrZXkiLCJpbmRleE9mIiwiVUlBcnJvd0tleU5hdmlnYXRpb24iLCJzdGF0ZSIsInByb3BzIiwiZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgiLCJoYW5kbGVLZXlEb3duIiwiZXZlbnQiLCJtb2RlIiwiVkVSVElDQUwiLCJCT1RIIiwicHJldmVudERlZmF1bHQiLCJtb3ZlRm9jdXMiLCJIT1JJWk9OVEFMIiwiaXNGdW5jdGlvbiIsIm9uS2V5RG93biIsImhhbmRsZUZvY3VzIiwidGFyZ2V0IiwiaGFzQXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNoaWxkIiwiUmVhY3QiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiYWN0aXZlQ2hpbGRJbmRleCIsIm9uRm9jdXMiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzZXRGb2N1cyIsIm5leHRQcm9wcyIsIm51bUNoaWxkcmVuIiwiY291bnQiLCJjaGlsZE5vZGUiLCJyZWZzIiwid3JhcHBlciIsIkhUTUxFbGVtZW50IiwiZmluZERPTU5vZGUiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIk5vZGUiLCJET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkciLCJmb2N1cyIsImRlbHRhIiwibmV4dEluZGV4IiwibWFwIiwiY2xvbmVFbGVtZW50IiwidGFiSW5kZXgiLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwiY29tcG9uZW50Iiwib21pdCIsImludGVybmFsS2V5cyIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJmdW5jIiwibnVtYmVyIiwib25lT2YiLCJkZWZhdWx0UHJvcHMiLCJub29wIiwiVUlCdXR0b24iLCJoYW5kbGVDbGljayIsImRpc2FibGVkIiwidG9nZ2xlU3RhdGUiLCJvbkNsaWNrIiwicHJlc3NlZCIsImN4IiwiY2xhc3NOYW1lIiwibm9kZSIsImJvb2wiLCJ1dWlkIiwicmVwbGFjZSIsImEiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJVSUNoZWNrYm94IiwiaWQiLCJoYW5kbGVDaGFuZ2UiLCJpbnB1dFByb3BzIiwiY2hlY2tlZCIsIm5hbWUiLCJvbkNoYW5nZSIsImlucHV0IiwiaW5kZXRlcm1pbmF0ZSIsInNldEluZGV0ZXJtaW5hdGUiLCJTdHJpbmciLCJnZXRBcmlhU3RhdGUiLCJsYWJlbCIsImxhYmVsUHJvcHMiLCJyZW5kZXJJbnB1dCIsInJlbmRlckxhYmVsIiwic2hhcGUiLCJvYmplY3QiLCJVSUNoZWNrYm94R3JvdXAiLCJpdGVtcyIsImV2ZXJ5IiwiaXRlbSIsInNvbWUiLCJzZWxlY3RBbGwiLCJhbGxDaGVja2VkIiwiYWxsSXRlbXNDaGVja2VkIiwic2VsZWN0QWxsUHJvcHMiLCJhbnlJdGVtc0NoZWNrZWQiLCJvbkFsbENoZWNrZWQiLCJvbkFsbFVuY2hlY2tlZCIsIm9uQ2hpbGRDaGVja2VkIiwib25DaGlsZFVuY2hlY2tlZCIsInRvQmVSZW5kZXJlZCIsInJlbmRlckNoZWNrYm94ZXMiLCJzZWxlY3RBbGxQb3NpdGlvbiIsIkNvbnN0YW50cyIsIlNFTEVDVF9BTExfQkVGT1JFIiwidW5zaGlmdCIsInJlbmRlclNlbGVjdEFsbCIsIlNFTEVDVF9BTExfQUZURVIiLCJwdXNoIiwicmVuZGVyQ2hpbGRyZW4iLCJhcnJheU9mIiwiaXNSZXF1aXJlZCIsIlBPUlRBTF9EQVRBX0FUVFJJQlVURSIsIlVJUG9ydGFsIiwiJHBvcnRhbCIsIiRwYXNzZW5nZXIiLCJkZXN0aW5hdGlvbiIsImFwcGVuZENoaWxkIiwicmVuZGVyUG9ydGFsbGVkQ29udGVudCIsImlzVmFsaWRFbGVtZW50IiwicG9ydGFsSWQiLCJyZW5kZXIiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwicmVtb3ZlQ2hpbGQiLCJDb21wb25lbnQiLCJpbnN0YW5jZU9mIiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJVSURpYWxvZyIsIm1vdW50ZWQiLCJ1dWlkSGVhZGVyIiwidXVpZEJvZHkiLCJuYXRpdmVFdmVudCIsImNhcHR1cmVGb2N1cyIsImNsb3NlT25PdXRzaWRlRm9jdXMiLCJpc1BhcnRPZkRpYWxvZyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJvbkNsb3NlIiwicHJldmlvdXMiLCJleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IiwicmVsYXRlZFRhcmdldCIsImNsb3NlT25Fc2NLZXkiLCJoYW5kbGVPdXRzaWRlQ2xpY2siLCJjbG9zZU9uT3V0c2lkZUNsaWNrIiwiaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsIiwiY2xvc2VPbk91dHNpZGVTY3JvbGwiLCJyb290cyIsIiR3cmFwcGVyIiwiY29uY2F0IiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb20iLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnQiLCJub2RlVHlwZSIsIkVMRU1FTlRfTk9ERSIsInBhcmVudE5vZGUiLCJjb250YWlucyIsImFkZEV2ZW50TGlzdGVuZXIiLCIkZGlhbG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJvZHlQcm9wcyIsImZvb3RlciIsImZvb3RlclByb3BzIiwiaGVhZGVyIiwiaGVhZGVyUHJvcHMiLCJ3cmFwcGVyUHJvcHMiLCJyZW5kZXJGb2N1c0JvdW5kYXJ5IiwiYmVmb3JlIiwicmVuZGVySGVhZGVyIiwicmVuZGVyQm9keSIsInJlbmRlckZvb3RlciIsImFmdGVyIiwiaW5zdGFuY2VzIiwidG9JIiwic3RyaW5nTnVtYmVyIiwicmVzY2FsZSIsImluc3RhbmNlIiwiY29udGFpbmVyQm94IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJ3aWR0aCIsImJveFNpemluZyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJvcHRpbWl6ZUZvckhlaWdodCIsImZsb29yIiwib2Zmc2V0SGVpZ2h0Iiwib3B0aW1pemVGb3JXaWR0aCIsIm9mZnNldFdpZHRoIiwic3R5bGUiLCJtaW4iLCJtYXhGb250U2l6ZSIsImhhbmRsZVdpbmRvd1Jlc2l6ZSIsImZvckVhY2giLCJyZWdpc3Rlckluc3RhbmNlIiwibGVuZ3RoIiwidW5yZWdpc3Rlckluc3RhbmNlIiwic3BsaWNlIiwiVUlGaXR0ZWRUZXh0IiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiVUlJbWFnZSIsInN0YXR1cyIsIkxPQURJTkciLCJzcmMiLCJyZXNldFByZWxvYWRlciIsInByZWxvYWQiLCJsb2FkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwiTE9BREVEIiwiRVJST1IiLCJkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZVByb3BzIiwiYWx0Iiwic3RhdHVzUHJvcHMiLCJyZW5kZXJJbWFnZSIsInJlbmRlclN0YXR1cyIsImV4dHJhY3RDaGlsZFByb3BzIiwicGFyZW50UHJvcHMiLCJjaGlsZFByb3BUeXBlcyIsImNoaWxkUHJvcHMiLCJVSU1vZGFsIiwicG9ydGFsUHJvcHMiLCIkbW9kYWwiLCJtYXNrUHJvcHMiLCJtb2RhbFByb3BzIiwiVUlTZWdtZW50ZWRDb250cm9sIiwiYWN0aXZlSXRlbUluZGV4IiwiaW5kZXhPZk9wdGlvbkluRm9jdXMiLCJnZXRQcmV2aW91c09wdGlvbkluZGV4IiwiZ2V0TmV4dE9wdGlvbkluZGV4IiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb25zIiwidmFsdWUiLCJvcHRpb24iLCJzZWxlY3RlZCIsImN1cnJlbnRPcHRpb25JbmRleCIsIm5leHQiLCJvbkJsdXIiLCJvbk9wdGlvblNlbGVjdGVkIiwiZGVmaW5pdGlvbiIsImludGVybmFsQ2hpbGRLZXlzIiwiaGFuZGxlT3B0aW9uQmx1ciIsImJpbmQiLCJoYW5kbGVPcHRpb25Gb2N1cyIsImNvbnRlbnQiLCJyZW5kZXJPcHRpb25zIiwidmFsaWRhdGVPcHRpb25zIiwiRXJyb3IiLCJtaXNzaW5nU2VsZWN0ZWQiLCJzZWVuU2VsZWN0ZWQiLCJtdWx0aXBsZVNlbGVjdGVkIiwiSXRlbSIsImRhdGEiLCJQcm9taXNlIiwiY2xvc3VyZVByb21pc2UiLCJ0aGVuIiwicmVzb2x2ZWRQYXlsb2FkIiwiY3VycmVudFByb3BzIiwiY29udmVydFRvSlNYRnVuYyIsImNvbnZlcnREYXRhVG9KU1hPcldhaXQiLCJleHRyYUNsYXNzZXMiLCJldmVuIiwiZ2V0Q2xhc3NlcyIsImxvYWRpbmdDb250ZW50IiwiVUlQYWdpbmF0aW9uIiwiaW5pdGlhbFBhZ2UiLCJudW1JdGVtc1BlclBhZ2UiLCJjdXJyZW50UGFnZSIsImdldFBhZ2VGb3JJbmRleCIsIml0ZW1zUGVyUGFnZSIsImNlaWwiLCJ0b3RhbFBhZ2VzIiwidG90YWxJdGVtcyIsImZpcnN0VmlzaWJsZUl0ZW1JbmRleCIsInBhZ2VUb0luZGV4IiwiaSIsIm5leHRUYXJnZXRJbmRleCIsImNvbnRyb2xzIiwiRklSU1QiLCJQUkVWSU9VUyIsIk5FWFQiLCJMQVNUIiwiaXRlbV8wIiwib2xkUHJvcHMiLCJpZGVudGlmaWVyIiwidGFyZ2V0SW5kZXgiLCJudW1QYWdlVG9nZ2xlcyIsInN0YXJ0UGFnZSIsImVuZFBhZ2UiLCJzaG93UGFnaW5hdGlvblN0YXRlIiwic2hvd0p1bXBUb0ZpcnN0IiwianVtcFRvRmlyc3RDb250cm9sQ29udGVudCIsInByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50IiwibmV4dFBhZ2VDb250cm9sQ29udGVudCIsInNob3dKdW1wVG9MYXN0IiwianVtcFRvTGFzdENvbnRyb2xDb250ZW50IiwiY3VzdG9tQ29udHJvbENvbnRlbnQiLCJnZW5lcmF0ZWRJdGVtcyIsImZpcnN0SXRlbUluZGV4IiwibGFzdEl0ZW1JbmRleCIsImdldEl0ZW0iLCJsaXN0V3JhcHBlclByb3BzIiwiaW5kZXhPZmZzZXQiLCJnZW5lcmF0ZUl0ZW1zIiwiaXRlbVRvSlNYQ29udmVydGVyRnVuYyIsIml0ZW1Mb2FkaW5nQ29udGVudCIsInBvc2l0aW9uIiwiaGlkZVBhZ2VySWZOb3ROZWVkZWQiLCJ0b2dnbGVXcmFwcGVyUHJvcHMiLCJwb3NpdGlvbkxvd2VyIiwidG9Mb3dlckNhc2UiLCJwb3NpdGlvbkNhcGl0YWxpemVkIiwidG9VcHBlckNhc2UiLCJjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucyIsInBvc2l0aW9ucyIsIkFCT1ZFIiwicmVuZGVyQ29udHJvbHMiLCJyZW5kZXJJdGVtcyIsIkJFTE9XIiwicmVuZGVyVmlldyIsInZhbGlkYXRlSW5pdGlhbFBhZ2UiLCJpc0ludGVnZXIiLCJudW1iZXJPZlBhZ2VzIiwidmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UiLCJkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSIsImxlbiIsImRvY3VtZW50RWxlbWVudCIsIndpdGhvdXQiLCJhcnIxIiwiYXJyMiIsImZpbHRlciIsInZhbHVlcyIsIm9iaiIsIlVJUG9wb3ZlciIsImFsaWduIiwiYW5jaG9yIiwiY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5IiwiZHgiLCJyb3VuZCIsImdldE5leHREaWFsb2dYUG9zaXRpb24iLCJkeSIsImdldE5leHREaWFsb2dZUG9zaXRpb24iLCJhbGlnbm1lbnRDb3JyZWN0aW9uIiwiZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmciLCJkaWRBbGlnbm1lbnRDaGFuZ2UiLCIkY2FyZXQiLCJsZWZ0IiwiZ2V0TmV4dENhcmV0WFBvc2l0aW9uIiwidG9wIiwiZ2V0TmV4dENhcmV0WVBvc2l0aW9uIiwiYXBwbHlUcmFuc2xhdGlvbiIsImRpYWxvZyIsImFuY2hvclhBbGlnbiIsInByZXNldCIsImFuY2hvcllBbGlnbiIsInNlbGZYQWxpZ24iLCJzZWxmWUFsaWduIiwiYW5jaG9yUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFuY2hvckxlZnQiLCJhbmNob3JUb3AiLCJhbmNob3JIZWlnaHQiLCJhbmNob3JXaWR0aCIsImJvZHlMZWZ0Iiwic2Nyb2xsTGVmdCIsImJvZHlUb3AiLCJzY3JvbGxUb3AiLCJjYXJldCIsIm5leHRYIiwiTUlERExFIiwiU1RBUlQiLCJFTkQiLCJjbGllbnRXaWR0aCIsIm5leHRZIiwiY2xpZW50SGVpZ2h0IiwiYW5jaG9yWSIsIngiLCJ5IiwiYXV0b1JlcG9zaXRpb24iLCJjb3JyZWN0aW9ucyIsInhNYXgiLCJzY3JvbGxXaWR0aCIsInlNYXgiLCJzY3JvbGxIZWlnaHQiLCJ0cmFuc2Zvcm1Qcm9wIiwibmV4dEFsaWdubWVudCIsImN1cnJlbnRBbGlnbm1lbnQiLCJjb25zdGFudCIsImdldEZyYWciLCJnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50IiwiY2FyZXRDb21wb25lbnQiLCJwb3NpdGlvblZhbHVlcyIsInByZXNldFZhbHVlcyIsIlVJUHJvZ3Jlc3MiLCJvbkNhbmNlbCIsImNhbmNlbFByb3BzIiwicHJvZ3Jlc3NQcm9wcyIsInByb2dyZXNzIiwidHdlZW5Qcm9wZXJ0eSIsInJlbmRlclByb2dyZXNzIiwicmVuZGVyQ2FuY2VsIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUiLCJleHBhbmRlZCIsImRpc3BhdGNoQ2FsbGJhY2siLCJ0b2dnbGVQcm9wcyIsIm5ld1Byb3BzIiwidGVhc2VyRXhwYW5kZWQiLCJ0ZWFzZXIiLCJyZW5kZXJDb250ZW50IiwiVUlSYWRpbyIsIm9uU2VsZWN0ZWQiLCJVSVRleHR1YWxJbnB1dCIsImlzU3RyaW5nIiwic2V0SW5wdXRWYWx1ZSIsImdldFZhbHVlIiwiZmllbGQiLCJoYW5kbGVCbHVyIiwiaXNGb2N1c2VkIiwiaXNDb250cm9sbGVkIiwiZGVmYXVsdFZhbHVlIiwibmV4dFZhbHVlIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImlzTm9uRW1wdHkiLCJzaG91bGRTaG93UGxhY2Vob2xkZXIiLCJoaWRlUGxhY2Vob2xkZXJPbkZvY3VzIiwicGxhY2Vob2xkZXIiLCJnZXRQbGFjZWhvbGRlclRleHQiLCJCb29sZWFuIiwicmVuZGVyUGxhY2Vob2xkZXIiLCJVSVR5cGVhaGVhZElucHV0IiwiY29tcHV0ZU1hdGNoZXMiLCJzZWxlY3RlZEVudGl0eUluZGV4Iiwib25FbnRpdHlIaWdobGlnaHRlZCIsImVudGl0aWVzIiwidXBkYXRlSW5wdXRTdGF0ZSIsImVudGl0eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXMiLCJzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSIsInRvdGFsTWF0Y2hlcyIsIm1hdGNoSW5kZXgiLCJtYXRjaGVzTm9kZSIsIm1hdGNoZXNOb2RlWUVuZCIsIm1hdGNoTm9kZSIsIm1hdGNoTm9kZVlTdGFydCIsIm9mZnNldFRvcCIsIm1hdGNoTm9kZVlFbmQiLCJnZXRJbnB1dE5vZGUiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImVudGl0eSIsImVudGl0eUNvbnRlbnQiLCJ0ZXh0IiwiZnJhZ3MiLCJzcGxpdCIsIlJlZ0V4cCIsImVzY2FwZXIiLCJub3JtYWxpemVkVXNlclRleHQiLCJ0aHJlc2hvbGQiLCJzZWVrVmFsdWUiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJhbGdvcml0aG0iLCJTVEFSVFNfV0lUSCIsIm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmciLCJtYXJrRnV6enlNYXRjaFN1YnN0cmluZyIsIm1hcmtlciIsIndhcm5lZE1hcmtlciIsIndhcm4iLCJ1c2VyVGV4dCIsIm5vcm1hbGl6ZWQiLCJmaW5kSW5kZXhlcyIsInJlc3VsdCIsInNlZWtNYXRjaCIsInJlc3VsdHMiLCJnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzIiwiZ2V0RnV6enlNYXRjaEluZGV4ZXMiLCJtYXRjaGVyIiwid2FybmVkTWF0Y2hlciIsInByb3ZpZGVkRW50aXRpZXMiLCJjdXJyZW50VmFsdWUiLCJnZXRNYXRjaEluZGV4ZXMiLCJvZmZzY3JlZW5DbGFzcyIsImdldFNlbGVjdGVkRW50aXR5VGV4dCIsImhpbnQiLCJyYXciLCJwcm9jZXNzZWQiLCJoaW50UHJvcHMiLCJtYXRjaFdyYXBwZXJQcm9wcyIsInJlc3QiLCJoYW5kbGVNYXRjaENsaWNrIiwibWFya01hdGNoU3Vic3RyaW5nIiwicmVuZGVyTm90aWZpY2F0aW9uIiwicmVuZGVySGludCIsInJlbmRlck1hdGNoZXMiLCJGVVpaWSIsInJlc2V0TWF0Y2hlcyIsInNlbGVjdCIsInNldFZhbHVlIiwib25FbnRpdHlTZWxlY3RlZCIsImNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24iLCJnZXRNYXJraW5nRnVuY3Rpb24iLCJnZXRNYXRjaGluZ0Z1bmN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiY3Vyc29yQXRFbmRPZklucHV0Iiwic2hpZnRLZXkiLCJzZWxlY3RNYXRjaCIsIm9uQ29tcGxldGUiLCJmaXJzdCIsImFycmF5IiwibGFzdCIsIlVJVG9rZW5pemVkSW5wdXQiLCJ0eXBlYWhlYWQiLCJhZGQiLCJ0b2tlbnMiLCJoYW5kbGVBZGRUb2tlbiIsImhhbmRsZUlucHV0Q2xpY2siLCJjbGVhclNlbGVjdGlvbiIsImhhbmRsZUlucHV0Rm9jdXMiLCJ3aGljaCIsInNlbGVjdFByZXZpb3VzVG9rZW4iLCJzZWxlY3ROZXh0VG9rZW4iLCJ0b2tlbnNTZWxlY3RlZCIsInJlbW92ZSIsIm1ldGFLZXkiLCJfc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24iLCJoYW5kbGVOZXdTZWxlY3Rpb24iLCJwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyIsImN1cnJlbnRTZWxlY3RlZEluZGV4ZXMiLCJpbmRleGVzIiwiaXNBcnJheSIsImlkeCIsImhhbmRsZVJlbW92ZVRva2VucyIsImFwcGVuZCIsInNlbGVjdFRva2VuIiwicHJldmlvdXNUb2tlbiIsInNlbGVjdFRva2VucyIsIm5leHRUb2tlbiIsInRva2VuQ2xvc2VDb21wb25lbnQiLCJ0b2tlbkNsb3NlVmlzaWJsZSIsImhhbmRsZVRva2VuQ2xvc2VDbGljayIsImhhbmRsZVRva2VuS2V5RG93biIsInJlbmRlclRva2VuQ2xvc2UiLCJyZW5kZXJUb2tlbnMiLCJVSVRvb2x0aXAiLCJCRUZPUkUiLCJBRlRFUiIsImVycm9ycyIsIk5vdGlmaWNhdGlvbkFQSSIsImRldGVjdFN1cHBvcnQiLCJOb3RpZmljYXRpb24iLCJ3ZWJraXROb3RpZmljYXRpb25zIiwibmF2aWdhdG9yIiwibW96Tm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdFJlY2VpdmVyIiwiRElTQUJMRUQiLCJjaGVja1Blcm1pc3Npb24iLCJOT1RfQVZBSUxBQkxFIiwicGVybWlzc2lvbiIsIm5vdGlmeSIsImNvbmZpZyIsIkNPTkZJR19NSVNTSU5HIiwiQ09ORklHX1RZUEUiLCJCT0RZX01JU1NJTkciLCJCT0RZX1RZUEUiLCJIRUFERVJfTUlTU0lORyIsIkhFQURFUl9UWVBFIiwiaWNvbiIsIklDT05fVFlQRSIsIk9OQ0xJQ0tfVFlQRSIsInNwYXduV2ViTm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uIiwiZXJyb3IiLCJVSVV0aWxzIiwidHJhbnNmb3JtUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWUsVUFBQ0EsSUFBRDtTQUFVLE9BQU9BLElBQVAsS0FBZ0IsVUFBMUI7Q0FBZjs7QUNBQTs7OztBQUlBLEFBQWUsU0FBU0Msd0JBQVQsQ0FBa0NDLE1BQWxDLEVBQTREO1FBQWxCQyxXQUFrQix1RUFBSixFQUFJOztXQUNoRUMsT0FBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9C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
