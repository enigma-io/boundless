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
            activeChildIndex: 0
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

    mode: React.PropTypes.oneOf([UIArrowKeyNavigation.mode.HORIZONTAL, UIArrowKeyNavigation.mode.VERTICAL, UIArrowKeyNavigation.mode.BOTH])
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div',
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

            var roots = [this.$wrapper].concat(toArray$1.call(this.$wrapper.querySelectorAll('[data-portal]')).map(function (dom) {
                return document.getElementById(dom.getAttribute('data-portal'));
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
            return React__default.createElement('span', _extends({}, omitKeysFromSourceObject(this.props, UIPortal.internalKeys), { 'data-portal-id': this.props.portalId || this.id }));
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
                null,
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
    modalProps: React.PropTypes.object
});
UIModal.internalKeys = Object.keys(UIModal.propTypes);
UIModal.defaultProps = _extends({}, UIDialog.defaultProps, {
    captureFocus: true,
    maskProps: {},
    modalProps: {}
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
                'ui-pagination-item-loading': this.props.data instanceof Promise
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
                null,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIG1vZGU6IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogMCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICBuZXh0UHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBSZWFjdC5DaGlsZHJlbi5jb3VudChuZXh0UHJvcHMuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogMH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudW1DaGlsZHJlbiAtIDF9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBjaGlsZE5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXNraXAnKSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoXG4gICAgICAgICAgICAgICAgY2hpbGROb2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYgTm9kZS5ET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkcgPyAtMSA6IDFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGROb2RlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgY2hpbGROb2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTFxuICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5CT1RIKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygtMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkhPUklaT05UQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTFxuICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5CT1RIKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkhPUklaT05UQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pW2luZGV4XTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogaW5kZXh9KTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkLnByb3BzLm9uRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICAnZGF0YS1pbmRleCc6IGluZGV4LFxuICAgICAgICAgICAgICAgICdkYXRhLXNraXAnOiBwYXJzZUludChjaGlsZC5wcm9wcy50YWJJbmRleCwgMTApID09PSAtMSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgfHwgaW5kZXgsXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA9PT0gaW5kZXggPyAwIDogLTEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBVSUFycm93S2V5TmF2aWdhdGlvbi5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICogQWRkZWQgYSBwcmVmaXggc28gdGhlIGdlbmVyYXRlZCBJRCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIGFuIEhUTUwgSUQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4YW1wbGVcbiAqIHV1aWQoKTsgLy8gdWlraXQtMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICByZXR1cm4gJ3Vpa2l0LScgKyAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbn1cbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSBjaGVja2JveCB3aXRoIGluZGV0ZXJtaW5hdGUgc3VwcG9ydC5cbiAqIEBjbGFzcyBVSUNoZWNrYm94XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMuaW5wdXRQcm9wcywgJ2luZGV0ZXJtaW5hdGUnKX1cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuZ2V0QXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdEFsbDogZmFsc2UsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgfVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIGFueUl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHtpbnB1dFByb3BzfSA9IHRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBhbGxDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogIWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0UHJvcHMgJiYgaW5wdXRQcm9wcy5uYW1lID8gaW5wdXRQcm9wcy5uYW1lIDogJ2NiX3NlbGVjdF9hbGwnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5sYWJlbCB8fCAnU2VsZWN0IEFsbCd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3hHcm91cC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jb25zdCB0b0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFmdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYmVmb3JlOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgd3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBib2R5UHJvcHM6IHt9LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgICAgICBoZWFkZXJQcm9wczoge30sXG4gICAgICAgIG9uQ2xvc2U6IG5vb3AsXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICAvLyBmYWxsYmFja3MgaWYgb25lIGlzbid0IHBhc3NlZFxuICAgIHV1aWRIZWFkZXIgPSB1dWlkKClcbiAgICB1dWlkQm9keSA9IHV1aWQoKVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIGNvbnN0IHJvb3RzID0gW3RoaXMuJHdyYXBwZXJdLmNvbmNhdChcbiAgICAgICAgICAgIHRvQXJyYXkuY2FsbChcbiAgICAgICAgICAgICAgICB0aGlzLiR3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcnRhbF0nKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3J0YWwnKSkpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZTtcblxuICAgICAgICByZXR1cm4gcm9vdHMuc29tZSgoZG9tKSA9PiBkb20uY29udGFpbnMoZWxlbWVudCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kd3JhcHBlciA9IG5vZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJlZm9yZX1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlEaWFsb2cuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsobm9kZSkgPT4gKHRoaXMuJGRpYWxvZyA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWZ0ZXJ9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IFtdO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5mdW5jdGlvbiByZXNjYWxlKGluc3RhbmNlKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnBhcmVudE5vZGUpO1xuICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICBpZiAoY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4oaW5zdGFuY2UucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICBpbnN0YW5jZXMuZm9yRWFjaCgoaW5zdGFuY2UpID0+IHJlc2NhbGUoaW5zdGFuY2UpKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIHRydWUpO1xuICAgIH1cblxuICAgIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2VzLnNwbGljZShpbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSksIDEpO1xuXG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUZpdHRlZFRleHQucHJvcFR5cGVzKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHJlc2NhbGUodGhpcyk7XG5cbiAgICAgICAgLy8gdGhlcmUgYXJlIGxpa2VseSB0byBiZSBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhpcyBjb21wb25lbnQgb24gYSBwYWdlLCBzbyBpdCBtYWtlcyBzZW5zZSB0byBqdXN0IHVzZVxuICAgICAgICAvLyBhIHNoYXJlZCBnbG9iYWwgcmVzaXplIGxpc3RlbmVyIGluc3RlYWQgb2YgZWFjaCBjb21wb25lbnQgaGF2aW5nIGl0cyBvd25cbiAgICAgICAgcmVnaXN0ZXJJbnN0YW5jZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHJlc2NhbGUodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHVucmVnaXN0ZXJJbnN0YW5jZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUZpdHRlZFRleHQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUltYWdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlJbWFnZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG4vKipcbiAqIEEgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCBmb3IgdGhlIHJlbmRlcmluZyBvZiBjb21wb25lbnRzIG91dHNpZGUgdGhlIG5vcm1hbCBSZWFjdCB0cmVlLlxuICogT25seSBhY2NlcHRzIGEgc2luZ2xlIHRvcC1sZXZlbCBjaGlsZDsgbmFrZWQgdGV4dCwgZXRjIHdpbGwgYmUgd3JhcHBlZCBpbiBhIDxkaXY+LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLy8gc2luZ2xlIGNoaWxkIG9ubHkgLSBhcnJheXMgbm90IGFsbG93ZWRcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgZGVzdGluYXRpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUG9ydGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5ib2R5LFxuICAgIH1cblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICAvLyB0aGUgPGRpdj4gdGhhdCB0aGUgY2hpbGRyZW4gYXJlIHJlbmRlcmVkIGludG9cbiAgICAkcG9ydGFsID0gbnVsbFxuXG4gICAgLy8gdGhlIHRvcC1sZXZlbCBjaGlsZCByZW5kZXJlZCBpbnRvIHRoZSAkcG9ydGFsXG4gICAgJHBhc3NlbmdlciA9IG51bGw7XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJHBvcnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKHRoaXMuJHBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJQb3J0YWxsZWRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUG9ydGFsbGVkQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiAoPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9ydGFsIElEIGxpbmsgaWYgbmVlZGVkXG4gICAgICAgIHRoaXMuJHBvcnRhbC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZDtcblxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoY2hpbGQsIHRoaXMuJHBvcnRhbCk7XG4gICAgICAgIHRoaXMuJHBhc3NlbmdlciA9IHRoaXMuJHBvcnRhbC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpOyB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUG9ydGFsLmludGVybmFsS2V5cyl9IGRhdGEtcG9ydGFsLWlkPXt0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWR9IC8+KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHByb3BzIGxpc3RlZCBpbiB0aGUgcHJvcFR5cGVzIG9mIGEgY2hpbGQgY29tcG9uZW50XG4gKiBlLmcuIHVzZWQgaW4gVUlUeXBlYWhlYWRJbnB1dCB0byBpZGVudGlmeSB3aGljaCBwcm9wcyBhcmUgbWVhbnQgZm9yIFVJVGV4dHVhbElucHV0XG4gKiBAbW9kdWxlIFVJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHNcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHBhcmVudFByb3BzICAgICBwcm9wcyBvZiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICogQHBhcmFtICB7T2JqZWN0fSBjaGlsZFByb3BUeXBlcyAgcHJvcFR5cGVzIG9mIHRoZSBjaGlsZCBjb21wb25lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgIHByb3BzIHRvIGJlIHNwcmVhZCBhcHBsaWVkIHRvIGEgY2hpbGQgY29tcG9uZW50XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdENoaWxkUHJvcHMocGFyZW50UHJvcHMsIGNoaWxkUHJvcFR5cGVzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNoaWxkUHJvcFR5cGVzKS5yZWR1Y2UoKGNoaWxkUHJvcHMsIGtleSkgPT4ge1xuICAgICAgICBpZiAocGFyZW50UHJvcHNba2V5XSkge1xuICAgICAgICAgICAgY2hpbGRQcm9wc1trZXldID0gcGFyZW50UHJvcHNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGlsZFByb3BzO1xuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJUG9ydGFsIGZyb20gJy4uL1VJUG9ydGFsJztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbi8qKlxuICogQSBibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1vZGFsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBtYXNrUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1vZGFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJTW9kYWwucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIG1hc2tQcm9wczoge30sXG4gICAgICAgIG1vZGFsUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVBvcnRhbD5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiRtb2RhbCA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVUlQb3J0YWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0ludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNJbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNJbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PSB0b0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMy4yKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gIHJldHVybiByZXN1bHQgPT09IHJlc3VsdCA/IChyZW1haW5kZXIgPyByZXN1bHQgLSByZW1haW5kZXIgOiByZXN1bHQpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW50ZWdlcjtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcHJvbWlzZXMgYXMgY2hpbGRyZW4gYW5kIGV2ZW50dWFsbHkgZG9pbmcgc29tZXRoaW5nIHdpdGggdGhlaXIgcmVzb2x2ZWQgcGF5bG9hZC5cbiAqL1xuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbnZlcnRUb0pTWEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcbiAgICBzdGF0ZSA9IHt9XG5cbiAgICBjb252ZXJ0RGF0YVRvSlNYT3JXYWl0KHByb3BzID0gdGhpcy5wcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudDogbnVsbH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUHJvbWlzZSA9IHByb3BzLmRhdGE7XG5cbiAgICAgICAgICAgIHByb3BzLmRhdGEudGhlbigocmVzb2x2ZWRQYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgY3VycmVudFByb3BzKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBjdXJyZW50UHJvcHMuZGF0YSA9PT0gY2xvc3VyZVByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50UHJvcHMuY29udmVydFRvSlNYRnVuYyhyZXNvbHZlZFBheWxvYWQsIGN1cnJlbnRQcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZS5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LCBub29wKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBwcm9wcy5jb252ZXJ0VG9KU1hGdW5jKHByb3BzLmRhdGEsIHByb3BzLmluZGV4KX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpICAgICAgICAgICAgICAgICB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdCgpOyB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSAgICAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gdHJ1ZTsgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdChuZXh0UHJvcHMpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gZmFsc2U7IH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMucHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKX0gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5zdGF0ZS5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXModGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMgJiYgdGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgdXRpbGl0eSBjb21wb25lbnQgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMsIHBvc3NpYmx5IHZhcnlpbmcgaW4gRE9NIGxheW91dC9zaXplLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBnZXRJdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgaW5pdGlhbFBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlSW5pdGlhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IGZhbHNlLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogKGRhdGEpID0+IGRhdGEsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlLFxuICAgICAgICB0YXJnZXRJbmRleDogKHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlID0gKCkgPT4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuICAgIGdldFBhZ2VGb3JJbmRleCA9IChpbmRleCwgaXRlbXNQZXJQYWdlID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpID0+IE1hdGguY2VpbCgoaW5kZXggKyAxKSAvIGl0ZW1zUGVyUGFnZSlcbiAgICB0b3RhbFBhZ2VzID0gKCkgPT4gTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKVxuXG4gICAgZmlyc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4gKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2VcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAocHJldlN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKCkpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICBjb25zdCBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgLy8gdXNlIHRyYW5zYWN0aW9uYWwgYHNldFN0YXRlKClgIHN5bnRheCB0byBlbnN1cmUgdGhhdCBwZW5kaW5nIHN0YXRlIHVwZGF0ZXMgYXJlIGhvbm9yZWQsXG4gICAgICAgIC8vIGxpa2UgdGhvc2UgZnJvbSBgcGFnZVRvSW5kZXgoKWBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFOiBgcHJvcHNgIGhlcmUgaXMgdGVjaG5pY2FsbHkgdGhlIGBuZXh0UHJvcHNgIHlvdSdkIHJlY2VpdmUgZnJvbSB0aGUgZmlyc3QgY1dSUCBhcmd1bWVudFxuICAgICAgICAgICAgLy8gc28gdGhhdCdzIHdoeSB3ZSdyZSBjYWNoaW5nIGBvbGRQcm9wc2Agb3V0c2lkZSB0aGUgYHNldFN0YXRlYFxuICAgICAgICAgICAgaWYgKHByb3BzLmlkZW50aWZpZXIgIT09IG9sZFByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoc3RhdGUudGFyZ2V0SW5kZXgsIHByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IHN0YXRlLnRhcmdldEluZGV4LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZVRvSW5kZXggPSAoaSkgPT4ge1xuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLnByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYENhbm5vdCBwYWdlIHRvIGludmFsaWQgaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KGkpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IGksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSgpO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLnRvdGFsUGFnZXMoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIHRvdGFsUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGlzRnVuY3Rpb24odGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7Y3VycmVudFBhZ2V9IG9mICR7dG90YWxQYWdlc31gLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXN0YXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCcsXG4gICAgICAgICAgICAgICAgJ2RhdGEtcGFnZS1udW1iZXInOiBpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLmN1cnJlbnRQYWdlKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHV1aWQoKSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWN1c3RvbScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMucHJvcHMudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBuZXh0VGFyZ2V0SW5kZXg7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVM6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpIC0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gcGFyc2VJbnQodmFsdWUsIDEwKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KG5leHRUYXJnZXRJbmRleCksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogbmV4dFRhcmdldEluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IGluZGV4T2Zmc2V0ID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgKiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSUFycm93S2V5TmF2aWdhdGlvblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2VuZXJhdGVJdGVtcygpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0VG9KU1hGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXhPZmZzZXQgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQ29udGVudD17dGhpcy5wcm9wcy5pdGVtTG9hZGluZ0NvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICggICB0aGlzLnByb3BzLmhpZGVQYWdlcklmTm90TmVlZGVkXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLnRvdGFsSXRlbXMgPD0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXIgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkNhcGl0YWxpemVkID0gcG9zaXRpb25Mb3dlclswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlci5zbGljZSgxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2BzZWdtZW50ZWRDb250cm9sJHtwb3NpdGlvbkNhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25Mb3dlcn1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0aW9uJz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5BQk9WRSB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQkVMT1cgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUGFnaW5hdGlvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlQb3J0YWwgZnJvbSAnLi4vVUlQb3J0YWwnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyMSwgYXJyMikgeyByZXR1cm4gYXJyMS5maWx0ZXIoKGl0ZW0pID0+IGFycjIuaW5kZXhPZihpdGVtKSA9PT0gLTEpOyB9XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSAgICAgICAgIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IG9ialtrZXldKTsgfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvblZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucG9zaXRpb24pXG5cbiAgICBzdGF0aWMgcHJlc2V0ID0ge1xuICAgICAgICAnQUJPVkUnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICB9LFxuICAgICAgICAnQkVMT1cnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICB9LFxuICAgICAgICAnTEVGVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgICAgICdSSUdIVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIHByZXNldFZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucHJlc2V0KVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBQcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhbmNob3JZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgcHJlc2V0OiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnByZXNldFZhbHVlcyksXG4gICAgICAgIHNlbGZYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBzZWxmWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSB3aXRob3V0KE9iamVjdC5rZXlzKFVJUG9wb3Zlci5wcm9wVHlwZXMpLCBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IChcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD0nMCAwIDE0IDkuNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cbiAgICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWJvcmRlcicgZmlsbD0nIzAwMCcgcG9pbnRzPSc3IDAgMTQgMTAgMCAxMCcgLz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWZpbGwnIGZpbGw9JyNGRkYnIHBvaW50cz0nNi45ODIzMDQ0NCAxLjc1IDEyLjc1IDEwIDEuMjUgMTAnIC8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICksXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBwcm9wcy5hbmNob3JYQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHByb3BzLmFuY2hvcllBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IHByb3BzLnNlbGZYQWxpZ24gICAgfHwgcHJvcHMucHJlc2V0LnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50V2lkdGggLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yLCBjYXJldCA9IHRoaXMuJGNhcmV0KSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ24sIGFuY2hvcllBbGlnbiwgc2VsZllBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFkgPSAwO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBjaGFuZ2UgdGhlIFkgcG9zaXRpb24gd2hlbiB3ZSdyZVxuICAgICAgICAvLyBmdWxseSB0byB0aGUgbGVmdCBvciByaWdodCBvZiB0aGUgYW5jaG9yIChzdGFydCxlbmQgfCBlbmQsc3RhcnQpXG4gICAgICAgIC8vIHNlbGZZQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZZQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy5hbmNob3JIZWlnaHQgLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudEhlaWdodCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLmRpYWxvZy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSB0aGlzLmFuY2hvclRvcCArIHRoaXMuYm9keVRvcDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgdGhpcy5hbmNob3JIZWlnaHQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZICsgdGhpcy5hbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHsuLi50aGlzLnN0YXRlfTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGNhcmV0IGlzIGluaXRpYWxseSBwb3NpdGlvbmVkIGF0IDAsMCBpbnNpZGUgdGhlIGRpYWxvZ1xuICAgICAgICAvLyB3aGljaCBpcyBhbHJlYWR5IHBvc2l0aW9uZWQgYXQgdGhlIGFuY2hvciwgc28gd2UganVzdCBuZWVkIHRvXG4gICAgICAgIC8vIG1ha2Ugc21hbGwgYWRqdXN0bWVudHMgYXMgbmVjZXNzYXJ5IHRvIGxpbmUgdXAgdGhlIGNhcmV0XG4gICAgICAgIC8vIHdpdGggdGhlIHZpc3VhbCBjZW50ZXIgb2YgdGhlIGFuY2hvclxuXG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuJGNhcmV0LCBjeCwgMCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLmRpYWxvZy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkgeyB0aGlzLmFsaWduKCk7IH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpOyB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7Z2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDogZ2V0RnJhZywgcHJvcHMsIHN0YXRlfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVBvcnRhbD5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gKHRoaXMuZGlhbG9nID0gaW5zdGFuY2UpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3Zlci1jYXJldCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXBvcG92ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgPC9VSVBvcnRhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSYWRpbyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVJhZGlvLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIHV1aWQgPSB1dWlkKClcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlSYWRpby5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICB1cGRhdGVJbnB1dFN0YXRlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkXG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSB1cGNvbWluZyByZW5kZXIgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBieSBgc2V0VmFsdWVgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucmVzZXRNYXRjaGVzLCAwKTtcbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXJrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHRzLCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWF0Y2hlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhwcm92aWRlZEVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50aXRpZXMgPSBwcm92aWRlZEVudGl0aWVzIHx8IHByb3BzLmVudGl0aWVzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgZmlyc3QgPSAoYXJyYXkpID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IChhcnJheSkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogKDxkaXY+WDwvZGl2PiksXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiB0cnVlLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgLy8gcGFzc3Rocm91Z2hzIHRvIFVJVHlwZWFoZWFkSW5wdXQgaW5zdGFuY2UgbWV0aG9kc1xuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRJbnB1dE5vZGUoKVxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0VmFsdWUoKVxuICAgIHNlbGVjdCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KClcbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcigoaWR4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb2tlbml6ZWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHRoaXMucHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVJbnB1dENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb29sdGlwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9vbHRpcC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUFycm93S2V5TmF2aWdhdGlvbn0gZnJvbSAnLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlCdXR0b259IGZyb20gJy4vVUlCdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3h9IGZyb20gJy4vVUlDaGVja2JveCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveEdyb3VwfSBmcm9tICcuL1VJQ2hlY2tib3hHcm91cCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlEaWFsb2d9IGZyb20gJy4vVUlEaWFsb2cnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRml0dGVkVGV4dH0gZnJvbSAnLi9VSUZpdHRlZFRleHQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJSW1hZ2V9IGZyb20gJy4vVUlJbWFnZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlNb2RhbH0gZnJvbSAnLi9VSU1vZGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBhZ2luYXRpb259IGZyb20gJy4vVUlQYWdpbmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcG92ZXJ9IGZyb20gJy4vVUlQb3BvdmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcnRhbH0gZnJvbSAnLi9VSVBvcnRhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQcm9ncmVzc30gZnJvbSAnLi9VSVByb2dyZXNzJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZX0gZnJvbSAnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlSYWRpb30gZnJvbSAnLi9VSVJhZGlvJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVNlZ21lbnRlZENvbnRyb2x9IGZyb20gJy4vVUlTZWdtZW50ZWRDb250cm9sJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRva2VuaXplZElucHV0fSBmcm9tICcuL1VJVG9rZW5pemVkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVGV4dHVhbElucHV0fSBmcm9tICcuL1VJVGV4dHVhbElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVR5cGVhaGVhZElucHV0fSBmcm9tICcuL1VJVHlwZWFoZWFkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9vbHRpcH0gZnJvbSAnLi9VSVRvb2x0aXAnO1xuXG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnLi9VSVV0aWxzL25vdGlmeSc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcGVydHkgZnJvbSAnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCB1dWlkIGZyb20gJy4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGNvbnN0IFVJVXRpbHMgPSB7ZXh0cmFjdENoaWxkUHJvcHMsIG5vdGlmeSwgdHJhbnNmb3JtUHJvcGVydHksIHV1aWR9O1xuIl0sIm5hbWVzIjpbInRlc3QiLCJvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3QiLCJzb3VyY2UiLCJvbWl0dGVkS2V5cyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJyZWxvY2F0ZUFjY2VwdGVkS2V5cyIsImhhc2giLCJrZXkiLCJpbmRleE9mIiwiVUlBcnJvd0tleU5hdmlnYXRpb24iLCJzdGF0ZSIsImhhbmRsZUtleURvd24iLCJldmVudCIsInByb3BzIiwibW9kZSIsIlZFUlRJQ0FMIiwiQk9USCIsInByZXZlbnREZWZhdWx0IiwibW92ZUZvY3VzIiwiSE9SSVpPTlRBTCIsImlzRnVuY3Rpb24iLCJvbktleURvd24iLCJoYW5kbGVGb2N1cyIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsImluZGV4IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJjaGlsZCIsIlJlYWN0IiwiQ2hpbGRyZW4iLCJ0b0FycmF5IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsImFjdGl2ZUNoaWxkSW5kZXgiLCJvbkZvY3VzIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic2V0Rm9jdXMiLCJuZXh0UHJvcHMiLCJudW1DaGlsZHJlbiIsImNvdW50IiwiY2hpbGROb2RlIiwicmVmcyIsIndyYXBwZXIiLCJIVE1MRWxlbWVudCIsImZpbmRET01Ob2RlIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HIiwiZm9jdXMiLCJkZWx0YSIsIm5leHRJbmRleCIsIm1hcCIsImNsb25lRWxlbWVudCIsInRhYkluZGV4IiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImNvbXBvbmVudCIsIm9taXQiLCJpbnRlcm5hbEtleXMiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZnVuYyIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIiwibm9vcCIsIlVJQnV0dG9uIiwiaGFuZGxlQ2xpY2siLCJkaXNhYmxlZCIsInRvZ2dsZVN0YXRlIiwib25DbGljayIsInByZXNzZWQiLCJjeCIsImNsYXNzTmFtZSIsIm5vZGUiLCJib29sIiwidXVpZCIsInJlcGxhY2UiLCJhIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVUlDaGVja2JveCIsImlkIiwiaGFuZGxlQ2hhbmdlIiwiaW5wdXRQcm9wcyIsImNoZWNrZWQiLCJuYW1lIiwib25DaGFuZ2UiLCJpbnB1dCIsImluZGV0ZXJtaW5hdGUiLCJzZXRJbmRldGVybWluYXRlIiwiU3RyaW5nIiwiZ2V0QXJpYVN0YXRlIiwibGFiZWwiLCJsYWJlbFByb3BzIiwicmVuZGVySW5wdXQiLCJyZW5kZXJMYWJlbCIsInNoYXBlIiwib2JqZWN0IiwiVUlDaGVja2JveEdyb3VwIiwiaXRlbXMiLCJldmVyeSIsIml0ZW0iLCJzb21lIiwic2VsZWN0QWxsIiwiYWxsQ2hlY2tlZCIsImFsbEl0ZW1zQ2hlY2tlZCIsInNlbGVjdEFsbFByb3BzIiwiYW55SXRlbXNDaGVja2VkIiwib25BbGxDaGVja2VkIiwib25BbGxVbmNoZWNrZWQiLCJvbkNoaWxkQ2hlY2tlZCIsIm9uQ2hpbGRVbmNoZWNrZWQiLCJ0b0JlUmVuZGVyZWQiLCJyZW5kZXJDaGVja2JveGVzIiwic2VsZWN0QWxsUG9zaXRpb24iLCJDb25zdGFudHMiLCJTRUxFQ1RfQUxMX0JFRk9SRSIsInVuc2hpZnQiLCJyZW5kZXJTZWxlY3RBbGwiLCJTRUxFQ1RfQUxMX0FGVEVSIiwicHVzaCIsInJlbmRlckNoaWxkcmVuIiwiYXJyYXlPZiIsImlzUmVxdWlyZWQiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiVUlEaWFsb2ciLCJtb3VudGVkIiwidXVpZEhlYWRlciIsInV1aWRCb2R5IiwibmF0aXZlRXZlbnQiLCJjYXB0dXJlRm9jdXMiLCJjbG9zZU9uT3V0c2lkZUZvY3VzIiwiaXNQYXJ0T2ZEaWFsb2ciLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwib25DbG9zZSIsInByZXZpb3VzIiwiZXhwbGljaXRPcmlnaW5hbFRhcmdldCIsInJlbGF0ZWRUYXJnZXQiLCJjbG9zZU9uRXNjS2V5IiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiY2xvc2VPbk91dHNpZGVDbGljayIsImhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCIsImNsb3NlT25PdXRzaWRlU2Nyb2xsIiwicm9vdHMiLCIkd3JhcHBlciIsImNvbmNhdCIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCJlbGVtZW50Iiwibm9kZVR5cGUiLCJFTEVNRU5UX05PREUiLCJwYXJlbnROb2RlIiwiY29udGFpbnMiLCJhZGRFdmVudExpc3RlbmVyIiwiJGRpYWxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJib2R5UHJvcHMiLCJmb290ZXIiLCJmb290ZXJQcm9wcyIsImhlYWRlciIsImhlYWRlclByb3BzIiwid3JhcHBlclByb3BzIiwicmVuZGVyRm9jdXNCb3VuZGFyeSIsImJlZm9yZSIsInJlbmRlckhlYWRlciIsInJlbmRlckJvZHkiLCJyZW5kZXJGb290ZXIiLCJhZnRlciIsImluc3RhbmNlcyIsInRvSSIsInN0cmluZ051bWJlciIsInJlc2NhbGUiLCJpbnN0YW5jZSIsImNvbnRhaW5lckJveCIsImdldENvbXB1dGVkU3R5bGUiLCJmb250U2l6ZSIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJib3hTaXppbmciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwib3B0aW1pemVGb3JIZWlnaHQiLCJmbG9vciIsIm9mZnNldEhlaWdodCIsIm9wdGltaXplRm9yV2lkdGgiLCJvZmZzZXRXaWR0aCIsInN0eWxlIiwibWluIiwibWF4Rm9udFNpemUiLCJoYW5kbGVXaW5kb3dSZXNpemUiLCJmb3JFYWNoIiwicmVnaXN0ZXJJbnN0YW5jZSIsImxlbmd0aCIsInVucmVnaXN0ZXJJbnN0YW5jZSIsInNwbGljZSIsIlVJRml0dGVkVGV4dCIsIk51bWJlciIsIk1BWF9WQUxVRSIsIm51bWJlciIsIlVJSW1hZ2UiLCJzdGF0dXMiLCJMT0FESU5HIiwic3JjIiwicmVzZXRQcmVsb2FkZXIiLCJwcmVsb2FkIiwibG9hZGVyIiwib25sb2FkIiwib25lcnJvciIsIkxPQURFRCIsIkVSUk9SIiwiZGlzcGxheUFzQmFja2dyb3VuZEltYWdlIiwiaW1hZ2VQcm9wcyIsImFsdCIsInN0YXR1c1Byb3BzIiwicmVuZGVySW1hZ2UiLCJyZW5kZXJTdGF0dXMiLCJVSVBvcnRhbCIsIiRwb3J0YWwiLCIkcGFzc2VuZ2VyIiwiZGVzdGluYXRpb24iLCJhcHBlbmRDaGlsZCIsInJlbmRlclBvcnRhbGxlZENvbnRlbnQiLCJpc1ZhbGlkRWxlbWVudCIsInBvcnRhbElkIiwicmVuZGVyIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlbW92ZUNoaWxkIiwiQ29tcG9uZW50IiwiaW5zdGFuY2VPZiIsImJvZHkiLCJleHRyYWN0Q2hpbGRQcm9wcyIsInBhcmVudFByb3BzIiwiY2hpbGRQcm9wVHlwZXMiLCJjaGlsZFByb3BzIiwiVUlNb2RhbCIsIiRtb2RhbCIsIm1hc2tQcm9wcyIsIm1vZGFsUHJvcHMiLCJVSVNlZ21lbnRlZENvbnRyb2wiLCJhY3RpdmVJdGVtSW5kZXgiLCJpbmRleE9mT3B0aW9uSW5Gb2N1cyIsImdldFByZXZpb3VzT3B0aW9uSW5kZXgiLCJnZXROZXh0T3B0aW9uSW5kZXgiLCJoYW5kbGVPcHRpb25DbGljayIsIm9wdGlvbnMiLCJ2YWx1ZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY3VycmVudE9wdGlvbkluZGV4IiwibmV4dCIsIm9uQmx1ciIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJkZWZpbml0aW9uIiwiaW50ZXJuYWxDaGlsZEtleXMiLCJoYW5kbGVPcHRpb25CbHVyIiwiYmluZCIsImhhbmRsZU9wdGlvbkZvY3VzIiwiY29udGVudCIsInJlbmRlck9wdGlvbnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJFcnJvciIsIm1pc3NpbmdTZWxlY3RlZCIsInNlZW5TZWxlY3RlZCIsIm11bHRpcGxlU2VsZWN0ZWQiLCJJdGVtIiwiZGF0YSIsIlByb21pc2UiLCJjbG9zdXJlUHJvbWlzZSIsInRoZW4iLCJyZXNvbHZlZFBheWxvYWQiLCJjdXJyZW50UHJvcHMiLCJjb252ZXJ0VG9KU1hGdW5jIiwiY29udmVydERhdGFUb0pTWE9yV2FpdCIsImV4dHJhQ2xhc3NlcyIsImV2ZW4iLCJnZXRDbGFzc2VzIiwibG9hZGluZ0NvbnRlbnQiLCJVSVBhZ2luYXRpb24iLCJpbml0aWFsUGFnZSIsIm51bUl0ZW1zUGVyUGFnZSIsImN1cnJlbnRQYWdlIiwiZ2V0UGFnZUZvckluZGV4IiwiaXRlbXNQZXJQYWdlIiwiY2VpbCIsInRvdGFsUGFnZXMiLCJ0b3RhbEl0ZW1zIiwiZmlyc3RWaXNpYmxlSXRlbUluZGV4IiwicGFnZVRvSW5kZXgiLCJpIiwibmV4dFRhcmdldEluZGV4IiwiY29udHJvbHMiLCJGSVJTVCIsIlBSRVZJT1VTIiwiTkVYVCIsIkxBU1QiLCJpdGVtXzAiLCJvbGRQcm9wcyIsImlkZW50aWZpZXIiLCJ0YXJnZXRJbmRleCIsIm51bVBhZ2VUb2dnbGVzIiwic3RhcnRQYWdlIiwiZW5kUGFnZSIsInNob3dQYWdpbmF0aW9uU3RhdGUiLCJzaG93SnVtcFRvRmlyc3QiLCJqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50IiwicHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQiLCJuZXh0UGFnZUNvbnRyb2xDb250ZW50Iiwic2hvd0p1bXBUb0xhc3QiLCJqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQiLCJjdXN0b21Db250cm9sQ29udGVudCIsImdlbmVyYXRlZEl0ZW1zIiwiZmlyc3RJdGVtSW5kZXgiLCJsYXN0SXRlbUluZGV4IiwiZ2V0SXRlbSIsImxpc3RXcmFwcGVyUHJvcHMiLCJpbmRleE9mZnNldCIsImdlbmVyYXRlSXRlbXMiLCJpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jIiwiaXRlbUxvYWRpbmdDb250ZW50IiwicG9zaXRpb24iLCJoaWRlUGFnZXJJZk5vdE5lZWRlZCIsInRvZ2dsZVdyYXBwZXJQcm9wcyIsInBvc2l0aW9uTG93ZXIiLCJ0b0xvd2VyQ2FzZSIsInBvc2l0aW9uQ2FwaXRhbGl6ZWQiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zIiwicG9zaXRpb25zIiwiQUJPVkUiLCJyZW5kZXJDb250cm9scyIsInJlbmRlckl0ZW1zIiwiQkVMT1ciLCJyZW5kZXJWaWV3IiwidmFsaWRhdGVJbml0aWFsUGFnZSIsImlzSW50ZWdlciIsIm51bWJlck9mUGFnZXMiLCJ2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZSIsImRldGVjdFRyYW5zZm9ybVByb3BlcnR5IiwibGVuIiwiZG9jdW1lbnRFbGVtZW50Iiwid2l0aG91dCIsImFycjEiLCJhcnIyIiwiZmlsdGVyIiwidmFsdWVzIiwib2JqIiwiVUlQb3BvdmVyIiwiYWxpZ24iLCJhbmNob3IiLCJjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkiLCJkeCIsInJvdW5kIiwiZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbiIsImR5IiwiZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbiIsImFsaWdubWVudENvcnJlY3Rpb24iLCJnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyIsImRpZEFsaWdubWVudENoYW5nZSIsIiRjYXJldCIsImxlZnQiLCJnZXROZXh0Q2FyZXRYUG9zaXRpb24iLCJ0b3AiLCJnZXROZXh0Q2FyZXRZUG9zaXRpb24iLCJhcHBseVRyYW5zbGF0aW9uIiwiZGlhbG9nIiwiYW5jaG9yWEFsaWduIiwicHJlc2V0IiwiYW5jaG9yWUFsaWduIiwic2VsZlhBbGlnbiIsInNlbGZZQWxpZ24iLCJhbmNob3JSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYW5jaG9yTGVmdCIsImFuY2hvclRvcCIsImFuY2hvckhlaWdodCIsImFuY2hvcldpZHRoIiwiYm9keUxlZnQiLCJzY3JvbGxMZWZ0IiwiYm9keVRvcCIsInNjcm9sbFRvcCIsImNhcmV0IiwibmV4dFgiLCJNSURETEUiLCJTVEFSVCIsIkVORCIsImNsaWVudFdpZHRoIiwibmV4dFkiLCJjbGllbnRIZWlnaHQiLCJhbmNob3JZIiwieCIsInkiLCJhdXRvUmVwb3NpdGlvbiIsImNvcnJlY3Rpb25zIiwieE1heCIsInNjcm9sbFdpZHRoIiwieU1heCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybVByb3AiLCJuZXh0QWxpZ25tZW50IiwiY3VycmVudEFsaWdubWVudCIsImNvbnN0YW50IiwiZ2V0RnJhZyIsImdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQiLCJjYXJldENvbXBvbmVudCIsInBvc2l0aW9uVmFsdWVzIiwicHJlc2V0VmFsdWVzIiwiVUlQcm9ncmVzcyIsIm9uQ2FuY2VsIiwiY2FuY2VsUHJvcHMiLCJwcm9ncmVzc1Byb3BzIiwicHJvZ3Jlc3MiLCJ0d2VlblByb3BlcnR5IiwicmVuZGVyUHJvZ3Jlc3MiLCJyZW5kZXJDYW5jZWwiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSIsImV4cGFuZGVkIiwiZGlzcGF0Y2hDYWxsYmFjayIsInRvZ2dsZVByb3BzIiwibmV3UHJvcHMiLCJ0ZWFzZXJFeHBhbmRlZCIsInRlYXNlciIsInJlbmRlckNvbnRlbnQiLCJVSVJhZGlvIiwib25TZWxlY3RlZCIsIlVJVGV4dHVhbElucHV0IiwiaXNTdHJpbmciLCJzZXRJbnB1dFZhbHVlIiwiZ2V0VmFsdWUiLCJmaWVsZCIsImhhbmRsZUJsdXIiLCJpc0ZvY3VzZWQiLCJpc0NvbnRyb2xsZWQiLCJkZWZhdWx0VmFsdWUiLCJuZXh0VmFsdWUiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJidWJibGVzIiwiaXNOb25FbXB0eSIsInNob3VsZFNob3dQbGFjZWhvbGRlciIsImhpZGVQbGFjZWhvbGRlck9uRm9jdXMiLCJwbGFjZWhvbGRlciIsImdldFBsYWNlaG9sZGVyVGV4dCIsIkJvb2xlYW4iLCJyZW5kZXJQbGFjZWhvbGRlciIsIlVJVHlwZWFoZWFkSW5wdXQiLCJjb21wdXRlTWF0Y2hlcyIsInNlbGVjdGVkRW50aXR5SW5kZXgiLCJvbkVudGl0eUhpZ2hsaWdodGVkIiwiZW50aXRpZXMiLCJ1cGRhdGVJbnB1dFN0YXRlIiwiZW50aXR5TWF0Y2hJbmRleGVzIiwibWF0Y2hlcyIsInNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5IiwidG90YWxNYXRjaGVzIiwibWF0Y2hJbmRleCIsIm1hdGNoZXNOb2RlIiwibWF0Y2hlc05vZGVZRW5kIiwibWF0Y2hOb2RlIiwibWF0Y2hOb2RlWVN0YXJ0Iiwib2Zmc2V0VG9wIiwibWF0Y2hOb2RlWUVuZCIsImdldElucHV0Tm9kZSIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZW50aXR5IiwiZW50aXR5Q29udGVudCIsInRleHQiLCJmcmFncyIsInNwbGl0IiwiUmVnRXhwIiwiZXNjYXBlciIsIm5vcm1hbGl6ZWRVc2VyVGV4dCIsInRocmVzaG9sZCIsInNlZWtWYWx1ZSIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsImFsZ29yaXRobSIsIlNUQVJUU19XSVRIIiwibWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyIsIm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nIiwibWFya2VyIiwid2FybmVkTWFya2VyIiwid2FybiIsInVzZXJUZXh0Iiwibm9ybWFsaXplZCIsImZpbmRJbmRleGVzIiwicmVzdWx0Iiwic2Vla01hdGNoIiwicmVzdWx0cyIsImdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMiLCJnZXRGdXp6eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXIiLCJ3YXJuZWRNYXRjaGVyIiwicHJvdmlkZWRFbnRpdGllcyIsImN1cnJlbnRWYWx1ZSIsImdldE1hdGNoSW5kZXhlcyIsIm9mZnNjcmVlbkNsYXNzIiwiZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0IiwiaGludCIsInJhdyIsInByb2Nlc3NlZCIsImhpbnRQcm9wcyIsIm1hdGNoV3JhcHBlclByb3BzIiwicmVzdCIsImhhbmRsZU1hdGNoQ2xpY2siLCJtYXJrTWF0Y2hTdWJzdHJpbmciLCJyZW5kZXJOb3RpZmljYXRpb24iLCJyZW5kZXJIaW50IiwicmVuZGVyTWF0Y2hlcyIsIkZVWlpZIiwicmVzZXRNYXRjaGVzIiwic2VsZWN0Iiwic2V0VmFsdWUiLCJvbkVudGl0eVNlbGVjdGVkIiwiY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbiIsImdldE1hcmtpbmdGdW5jdGlvbiIsImdldE1hdGNoaW5nRnVuY3Rpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJjdXJzb3JBdEVuZE9mSW5wdXQiLCJzaGlmdEtleSIsInNlbGVjdE1hdGNoIiwib25Db21wbGV0ZSIsImZpcnN0IiwiYXJyYXkiLCJsYXN0IiwiVUlUb2tlbml6ZWRJbnB1dCIsInR5cGVhaGVhZCIsImFkZCIsInRva2VucyIsImhhbmRsZUFkZFRva2VuIiwiaGFuZGxlSW5wdXRDbGljayIsImNsZWFyU2VsZWN0aW9uIiwiaGFuZGxlSW5wdXRGb2N1cyIsIndoaWNoIiwic2VsZWN0UHJldmlvdXNUb2tlbiIsInNlbGVjdE5leHRUb2tlbiIsInRva2Vuc1NlbGVjdGVkIiwicmVtb3ZlIiwibWV0YUtleSIsIl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiIsImhhbmRsZU5ld1NlbGVjdGlvbiIsInByZXZpb3VzU2VsZWN0ZWRJbmRleGVzIiwiY3VycmVudFNlbGVjdGVkSW5kZXhlcyIsImluZGV4ZXMiLCJpc0FycmF5IiwiaWR4IiwiaGFuZGxlUmVtb3ZlVG9rZW5zIiwiYXBwZW5kIiwic2VsZWN0VG9rZW4iLCJwcmV2aW91c1Rva2VuIiwic2VsZWN0VG9rZW5zIiwibmV4dFRva2VuIiwidG9rZW5DbG9zZUNvbXBvbmVudCIsInRva2VuQ2xvc2VWaXNpYmxlIiwiaGFuZGxlVG9rZW5DbG9zZUNsaWNrIiwiaGFuZGxlVG9rZW5LZXlEb3duIiwicmVuZGVyVG9rZW5DbG9zZSIsInJlbmRlclRva2VucyIsIlVJVG9vbHRpcCIsIkJFRk9SRSIsIkFGVEVSIiwiZXJyb3JzIiwiTm90aWZpY2F0aW9uQVBJIiwiZGV0ZWN0U3VwcG9ydCIsIk5vdGlmaWNhdGlvbiIsIndlYmtpdE5vdGlmaWNhdGlvbnMiLCJuYXZpZ2F0b3IiLCJtb3pOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0UmVjZWl2ZXIiLCJESVNBQkxFRCIsImNoZWNrUGVybWlzc2lvbiIsIk5PVF9BVkFJTEFCTEUiLCJwZXJtaXNzaW9uIiwibm90aWZ5IiwiY29uZmlnIiwiQ09ORklHX01JU1NJTkciLCJDT05GSUdfVFlQRSIsIkJPRFlfTUlTU0lORyIsIkJPRFlfVFlQRSIsIkhFQURFUl9NSVNTSU5HIiwiSEVBREVSX1RZUEUiLCJpY29uIiwiSUNPTl9UWVBFIiwiT05DTElDS19UWVBFIiwic3Bhd25XZWJOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJlcnJvciIsIlVJVXRpbHMiLCJ0cmFuc2Zvcm1Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxVQUFDQSxJQUFEO1NBQVUsT0FBT0EsSUFBUCxLQUFnQixVQUExQjtDQUFmOztBQ0FBOzs7O0FBSUEsQUFBZSxTQUFTQyx3QkFBVCxDQUFrQ0MsTUFBbEMsRUFBNEQ7UUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7O1dBQ2hFQyxPQUFPQyxJQUFQLENBQVlILE1BQVosRUFBb0JJLE1BQXBCLENBQTJCLFNBQVNDLG9CQUFULENBQThCQyxJQUE5QixFQUFvQ0MsR0FBcEMsRUFBeUM7WUFDbkVOLFlBQVlPLE9BQVosQ0FBb0JELEdBQXBCLE1BQTZCLENBQUMsQ0FBbEMsRUFBcUM7aUJBQzVCQSxHQUFMLElBQVlQLE9BQU9PLEdBQVAsQ0FBWjs7O2VBR0dELElBQVA7S0FMRyxFQU9KLEVBUEksQ0FBUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0NpQkc7Ozs7Ozs7Ozs7Ozs7O3FOQTJCakJDLFFBQVE7OEJBQ2M7aUJBdUR0QkMsZ0JBQWdCLFVBQUNDLEtBQUQsRUFBVztvQkFDZkEsTUFBTUwsR0FBZDtxQkFDSyxTQUFMO3dCQUNR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
