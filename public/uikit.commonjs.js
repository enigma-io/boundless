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

var isString = (function (test) {
  return typeof test === 'string';
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
        key: 'handleChildFocus',
        value: function handleChildFocus(index, child, event) {
            this.setState({ activeChildIndex: index });

            event.stopPropagation();

            if (!isString(child) && isFunction(child.props.onFocus)) {
                child.props.onFocus(event);
            }
        }
    }, {
        key: 'children',
        value: function children() {
            var _this2 = this;

            return React__default.Children.map(this.props.children, function (child, index) {
                return React__default.cloneElement(child, {
                    'data-skip': parseInt(child.props.tabIndex, 10) === -1 || undefined,
                    key: child.key || index,
                    tabIndex: _this2.state.activeChildIndex === index ? 0 : -1,
                    onFocus: _this2.handleChildFocus.bind(_this2, index, child)
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(this.props.component, _extends({}, omitKeysFromSourceObject(this.props, UIArrowKeyNavigation.internalKeys), {
                ref: 'wrapper',
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
 * A utility view for paging the display of many data items of varying sizes.
 * @class UIPagination
 */

var Item = function (_React$Component) {
    inherits(Item, _React$Component);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            data: _this.props.data
        }, _this.mounted = false, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Item, [{
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
                this.state.data.then(function cautiouslySetItemData(promise, value) {
                    if (this.mounted && this.state.data === promise) {
                        this.setState({ data: value });
                    } // only replace if we're looking at the same promise, otherwise do nothing
                }.bind(this, this.state.data));
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mounted = true;
            this.waitForContentIfNecessary();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.waitForContentIfNecessary();
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
                'ui-pagination-item-loading': this.state.data instanceof Promise
            }) + (extraClasses ? ' ' + extraClasses : '');
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.data instanceof Promise) {
                return React__default.createElement(
                    'div',
                    _extends({}, omitKeysFromSourceObject(this.props, Item.internalKeys), { className: this.getClasses() }),
                    this.props.loadingContent
                );
            }

            var jsx$$1 = this.props.dataToJSXConverterFunc(this.state.data, this.props.index);

            return React__default.cloneElement(jsx$$1, _extends({}, omitKeysFromSourceObject(this.props, Item.internalKeys), {
                className: this.getClasses(jsx$$1.props.className),
                'data-index': this.props.index
            }));
        }
    }]);
    return Item;
}(React__default.Component);

Item.propTypes = {
    even: React.PropTypes.bool,
    data: React.PropTypes.object,
    dataToJSXConverterFunc: React.PropTypes.func,
    index: React.PropTypes.number,
    loadingContent: React.PropTypes.node
};
Item.internalKeys = Object.keys(Item.propTypes);

var UIPagination = function (_React$PureComponent) {
    inherits(UIPagination, _React$PureComponent);

    function UIPagination() {
        var _ref2;

        var _temp2, _this2, _ret2;

        classCallCheck(this, UIPagination);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = possibleConstructorReturn(this, (_ref2 = UIPagination.__proto__ || Object.getPrototypeOf(UIPagination)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
            currentPage: _this2.props.initialPage,
            targetIndex: (_this2.props.initialPage - 1) * _this2.props.numItemsPerPage
        }, _this2.currentPage = function () {
            return _this2.state.currentPage;
        }, _this2.getPageForIndex = function (index$$1) {
            var itemsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.props.numItemsPerPage;
            return Math.ceil((index$$1 + 1) / itemsPerPage);
        }, _this2.totalPages = function () {
            return Math.ceil(_this2.props.totalItems / _this2.props.numItemsPerPage);
        }, _this2.firstVisibleItemIndex = function () {
            return (_this2.currentPage() - 1) * _this2.props.numItemsPerPage;
        }, _this2.pageToIndex = function (i) {
            if (i < 0 || i >= _this2.props.totalItems) {
                return new Error('Cannot page to invalid index ' + i + '.');
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(i),
                targetIndex: i
            });
        }, _this2.handleClick = function (value) {
            var nextTargetIndex = void 0;

            switch (value) {
                case UIPagination.controls.FIRST:
                    nextTargetIndex = 0;
                    break;
                case UIPagination.controls.PREVIOUS:
                    nextTargetIndex = _this2.firstVisibleItemIndex() - _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.NEXT:
                    nextTargetIndex = _this2.firstVisibleItemIndex() + _this2.props.numItemsPerPage;
                    break;
                case UIPagination.controls.LAST:
                    nextTargetIndex = _this2.props.totalItems - 1;
                    break;
                default:
                    nextTargetIndex = parseInt(value, 10) * _this2.props.numItemsPerPage - 1;
            }

            _this2.setState({
                currentPage: _this2.getPageForIndex(nextTargetIndex),
                targetIndex: nextTargetIndex
            });
        }, _temp2), possibleConstructorReturn(_this2, _ret2);
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
            var _this3 = this;

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
                    currentPage: _this3.getPageForIndex(state.targetIndex, props.numItemsPerPage),
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
            var _this4 = this;

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
                        data: item.data,
                        dataToJSXConverterFunc: _this4.props.itemToJSXConverterFunc,
                        even: index$$1 % 2 === 0,
                        index: indexOffset + index$$1,
                        loadingContent: _this4.props.itemLoadingContent });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9pc1N0cmluZy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL29taXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlBcnJvd0tleU5hdmlnYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub29wL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQnV0dG9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvdXVpZC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSURpYWxvZy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUZpdHRlZFRleHQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlJbWFnZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcnRhbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJTW9kYWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2ludGVnZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUGFnaW5hdGlvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUG9wb3Zlci9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUmFkaW8vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuIiwiLyoqXG4gKiBSZXR1cm5zIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0IHdpdGhvdXQgdGhlIGdpdmVuIGtleXMuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb21pdEtleXNGcm9tU291cmNlT2JqZWN0KHNvdXJjZSwgb21pdHRlZEtleXMgPSBbXSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiByZWxvY2F0ZUFjY2VwdGVkS2V5cyhoYXNoLCBrZXkpIHtcbiAgICAgICAgaWYgKG9taXR0ZWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGhhc2hba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhc2g7XG5cbiAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICBIT1JJWk9OVEFMOiAnSE9SSVpPTlRBTCcsXG4gICAgICAgIFZFUlRJQ0FMOiAnVkVSVElDQUwnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG5cbiAgICAgICAgbW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuSE9SSVpPTlRBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUwsXG4gICAgICAgICAgICBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUFycm93S2V5TmF2aWdhdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgICBtb2RlOiBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IDAsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRGb2N1cyhpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCFpc1N0cmluZyhjaGlsZCkgJiYgaXNGdW5jdGlvbihjaGlsZC5wcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtc2tpcCc6IHBhcnNlSW50KGNoaWxkLnByb3BzLnRhYkluZGV4LCAxMCkgPT09IC0xIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCA/IDAgOiAtMSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICogQWRkZWQgYSBwcmVmaXggc28gdGhlIGdlbmVyYXRlZCBJRCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIGFuIEhUTUwgSUQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4YW1wbGVcbiAqIHV1aWQoKTsgLy8gdWlraXQtMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICByZXR1cm4gJ3Vpa2l0LScgKyAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csYT0+KGFeTWF0aC5yYW5kb20oKSoxNj4+YS80KS50b1N0cmluZygxNikpO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbn1cbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSBjaGVja2JveCB3aXRoIGluZGV0ZXJtaW5hdGUgc3VwcG9ydC5cbiAqIEBjbGFzcyBVSUNoZWNrYm94XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25DaGVja2VkOiBub29wLFxuICAgICAgICBvblVuY2hlY2tlZDogbm9vcCxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmRldGVybWluYXRlKCkge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuaW5kZXRlcm1pbmF0ZSA9ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIFNlbmQgdGhlIG9wcG9zaXRlIHNpZ25hbCBmcm9tIHdoYXQgd2FzIHBhc3NlZCB0byB0b2dnbGUgdGhlIGRhdGFcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByb3BzWyF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCA/ICdvbkNoZWNrZWQnIDogJ29uVW5jaGVja2VkJ10odGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXJpYVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMuaW5wdXRQcm9wcywgJ2luZGV0ZXJtaW5hdGUnKX1cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbWl4ZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWNoZWNrZWQnOiB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXVuY2hlY2tlZCc6ICF0aGlzLnByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e3RoaXMuZ2V0QXJpYVN0YXRlKCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlDaGVja2JveC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIGNoZWNrYm94ZXMuXG4gKiBAY2xhc3MgVUlDaGVja2JveEdyb3VwXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUNoZWNrYm94IGZyb20gJy4uL1VJQ2hlY2tib3gnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBDb25zdGFudHMgPSB7XG4gICAgICAgIFNFTEVDVF9BTExfQkVGT1JFOiAnU0VMRUNUX0FMTF9CRUZPUkUnLFxuICAgICAgICBTRUxFQ1RfQUxMX0FGVEVSOiAnU0VMRUNUX0FMTF9BRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICAgICAgb25BbGxDaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0FGVEVSLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlDaGVja2JveEdyb3VwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgb25BbGxDaGVja2VkOiBub29wLFxuICAgICAgICBvbkFsbFVuY2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdEFsbDogZmFsc2UsXG4gICAgICAgIHNlbGVjdEFsbFByb3BzOiB7fSxcbiAgICAgICAgc2VsZWN0QWxsUG9zaXRpb246IFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9CRUZPUkUsXG4gICAgfVxuXG4gICAgYWxsSXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5ldmVyeShpdGVtID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmlucHV0UHJvcHMuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB0aGlzLmFsbEl0ZW1zQ2hlY2tlZCgpO1xuICAgICAgICAgICAgY29uc3Qge2lucHV0UHJvcHN9ID0gdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdzZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBrZXk9J2NiX3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LWdyb3VwLXNlbGVjdGFsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGFsbENoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiAhYWxsQ2hlY2tlZCAmJiB0aGlzLmFueUl0ZW1zQ2hlY2tlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXRQcm9wcyAmJiBpbnB1dFByb3BzLm5hbWUgPyBpbnB1dFByb3BzLm5hbWUgOiAnY2Jfc2VsZWN0X2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmxhYmVsIHx8ICdTZWxlY3QgQWxsJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxVbmNoZWNrZWR9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlDaGVja2JveFxuICAgICAgICAgICAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlucHV0UHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGVja2VkPXt0aGlzLnByb3BzLm9uQ2hpbGRDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IHRvQmVSZW5kZXJlZCA9IFt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKV07XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsICYmIHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zZWxlY3RBbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFOlxuICAgICAgICAgICAgICAgIHRvQmVSZW5kZXJlZC51bnNoaWZ0KHRoaXMucmVuZGVyU2VsZWN0QWxsKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUjpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQucHVzaCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0JlUmVuZGVyZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3hHcm91cC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nZ3JvdXAnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5jb25zdCB0b0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFmdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYmVmb3JlOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgd3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBib2R5UHJvcHM6IHt9LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgICAgICBoZWFkZXJQcm9wczoge30sXG4gICAgICAgIG9uQ2xvc2U6IG5vb3AsXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICAvLyBmYWxsYmFja3MgaWYgb25lIGlzbid0IHBhc3NlZFxuICAgIHV1aWRIZWFkZXIgPSB1dWlkKClcbiAgICB1dWlkQm9keSA9IHV1aWQoKVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIGNvbnN0IHJvb3RzID0gW3RoaXMuJHdyYXBwZXJdLmNvbmNhdChcbiAgICAgICAgICAgIHRvQXJyYXkuY2FsbChcbiAgICAgICAgICAgICAgICB0aGlzLiR3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcnRhbF0nKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3J0YWwnKSkpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZTtcblxuICAgICAgICByZXR1cm4gcm9vdHMuc29tZSgoZG9tKSA9PiBkb20uY29udGFpbnMoZWxlbWVudCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2coZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5wcm9wcy5vbkNsb3NlLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kd3JhcHBlciA9IG5vZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJlZm9yZX1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlEaWFsb2cuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsobm9kZSkgPT4gKHRoaXMuJGRpYWxvZyA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2cnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy51dWlkSGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRCb2R5fVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWZ0ZXJ9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEZpdCBnaXZlbiB0ZXh0IGluc2lkZSBhIHBhcmVudCBjb250YWluZXIsIG9iZXlpbmcgaW1wbGljdCBhbmQgZXhwbGljaXQgY29uc3RyYWludHMuXG4gKiBAY2xhc3MgVUlGaXR0ZWRUZXh0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IFtdO1xuXG5mdW5jdGlvbiB0b0koc3RyaW5nTnVtYmVyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZ051bWJlciwgMTApO1xufVxuXG5mdW5jdGlvbiByZXNjYWxlKGluc3RhbmNlKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJCb3ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnBhcmVudE5vZGUpO1xuICAgIGNvbnN0IGZvbnRTaXplID0gdG9JKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmZvbnRTaXplKTtcblxuICAgIGxldCBjb250YWluZXJIZWlnaHQgPSB0b0koY29udGFpbmVyQm94LmhlaWdodCk7XG4gICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdG9JKGNvbnRhaW5lckJveC53aWR0aCk7XG5cbiAgICBpZiAoY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnIHx8IGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdwYWRkaW5nLWJveCcpIHsgLy8gbmVlZCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnRhaW5lckhlaWdodCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdUb3ApICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgY29udGFpbmVyV2lkdGggLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nTGVmdCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdSaWdodCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVGb3JIZWlnaHQgPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0SGVpZ2h0KSAqIGNvbnRhaW5lckhlaWdodCk7XG4gICAgY29uc3Qgb3B0aW1pemVGb3JXaWR0aCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRXaWR0aCkgKiBjb250YWluZXJXaWR0aCk7XG5cbiAgICAvLyB0aGUgfHwgMSBpcyBhIGZhbGxiYWNrIHRvIHByZXZlbnQgZm9udFNpemUgZnJvbSBiZWluZyBzZXQgdG8gemVybywgd2hpY2ggZnViYXJzIHRoaW5nc1xuICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAoTWF0aC5taW4oaW5zdGFuY2UucHJvcHMubWF4Rm9udFNpemUsIG9wdGltaXplRm9ySGVpZ2h0LCBvcHRpbWl6ZUZvcldpZHRoKSB8fCAxKSArICdweCc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVdpbmRvd1Jlc2l6ZSgpIHtcbiAgICBpbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiByZXNjYWxlKGluc3RhbmNlKSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VzLmluZGV4T2YoaW5zdGFuY2UpLCAxKTtcblxuICAgIGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlGaXR0ZWRUZXh0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgbWF4Rm9udFNpemU6IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBtYXhGb250U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlGaXR0ZWRUZXh0LnByb3BUeXBlcylcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuXG4gICAgICAgIC8vIHRoZXJlIGFyZSBsaWtlbHkgdG8gYmUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoaXMgY29tcG9uZW50IG9uIGEgcGFnZSwgc28gaXQgbWFrZXMgc2Vuc2UgdG8ganVzdCB1c2VcbiAgICAgICAgLy8gYSBzaGFyZWQgZ2xvYmFsIHJlc2l6ZSBsaXN0ZW5lciBpbnN0ZWFkIG9mIGVhY2ggY29tcG9uZW50IGhhdmluZyBpdHMgb3duXG4gICAgICAgIHJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICByZXNjYWxlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB1bnJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gey4uLm9taXQodGhpcy5wcm9wcywgVUlGaXR0ZWRUZXh0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGltYWdlIGJsb2NrIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCBmb3IgbG9hZGluZyBhbmQgZmFsbGJhY2sgc2NlbmFyaW9zLlxuICogQGNsYXNzIFVJSW1hZ2VcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlJbWFnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBzdGF0dXMgPSB7XG4gICAgICAgIExPQURJTkc6ICdMT0FESU5HJyxcbiAgICAgICAgTE9BREVEOiAnTE9BREVEJyxcbiAgICAgICAgRVJST1I6ICdFUlJPUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWx0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbWFnZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc3RhdHVzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJSW1hZ2UucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW1hZ2VQcm9wczoge30sXG4gICAgICAgIHN0YXR1c1Byb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgc3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuc3JjICE9PSB0aGlzLnByb3BzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FESU5HfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZXNldFByZWxvYWRlcigpO1xuICAgIH1cblxuICAgIHJlc2V0UHJlbG9hZGVyKCkge1xuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BREVEfSk7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIuc3JjID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgfVxuXG4gICAgcmVuZGVySW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbWFnZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dGhpcy5wcm9wcy5zcmN9KWAsXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW1hZ2UnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmltYWdlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgICAgICAgICAgYWx0PXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICBvbkxvYWQ9e25vb3B9XG4gICAgICAgICAgICAgICAgb25FcnJvcj17bm9vcH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLnN0YXR1c1Byb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3N0YXR1cydcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1zdGF0dXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGluZyc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtbG9hZGVkJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRCxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWVycm9yJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkVSUk9SLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUltYWdlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckltYWdlKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdHVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBjb21wb25lbnQgZm9yIHRoZSByZW5kZXJpbmcgb2YgY29tcG9uZW50cyBvdXRzaWRlIHRoZSBub3JtYWwgUmVhY3QgdHJlZS5cbiAqIE9ubHkgYWNjZXB0cyBhIHNpbmdsZSB0b3AtbGV2ZWwgY2hpbGQ7IG5ha2VkIHRleHQsIGV0YyB3aWxsIGJlIHdyYXBwZWQgaW4gYSA8ZGl2Pi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC8vIHNpbmdsZSBjaGlsZCBvbmx5IC0gYXJyYXlzIG5vdCBhbGxvd2VkXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGRlc3RpbmF0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBvcnRhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBkZXN0aW5hdGlvbjogZG9jdW1lbnQuYm9keSxcbiAgICB9XG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgLy8gdGhlIDxkaXY+IHRoYXQgdGhlIGNoaWxkcmVuIGFyZSByZW5kZXJlZCBpbnRvXG4gICAgJHBvcnRhbCA9IG51bGxcblxuICAgIC8vIHRoZSB0b3AtbGV2ZWwgY2hpbGQgcmVuZGVyZWQgaW50byB0aGUgJHBvcnRhbFxuICAgICRwYXNzZW5nZXIgPSBudWxsO1xuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRwb3J0YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5hcHBlbmRDaGlsZCh0aGlzLiRwb3J0YWwpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpO1xuICAgIH1cblxuICAgIHJlbmRlclBvcnRhbGxlZENvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbikgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogKDxkaXY+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvcnRhbCBJRCBsaW5rIGlmIG5lZWRlZFxuICAgICAgICB0aGlzLiRwb3J0YWwuaWQgPSB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWQ7XG5cbiAgICAgICAgUmVhY3RET00ucmVuZGVyKGNoaWxkLCB0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLiRwYXNzZW5nZXIgPSB0aGlzLiRwb3J0YWwuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkgeyB0aGlzLnJlbmRlclBvcnRhbGxlZENvbnRlbnQoKTsgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kcG9ydGFsKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5yZW1vdmVDaGlsZCh0aGlzLiRwb3J0YWwpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8c3BhbiB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcnRhbC5pbnRlcm5hbEtleXMpfSBkYXRhLXBvcnRhbC1pZD17dGhpcy5wcm9wcy5wb3J0YWxJZCB8fCB0aGlzLmlkfSAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSU1vZGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBtYXNrUHJvcHM6IHt9LFxuICAgICAgICBtb2RhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWw+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlNb2RhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kbW9kYWwgPSBub2RlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1hc2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC1tYXNrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMubWFza1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSURpYWxvZy5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvVUlEaWFsb2c+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1VJUG9ydGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsXG4gICAgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BOdW1iZXIuaXNJbnRlZ2VyYF0oaHR0cHM6Ly9tZG4uaW8vTnVtYmVyL2lzSW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzSW50ZWdlcigzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcignMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPT0gdG9JbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gdG9GaW5pdGUodmFsdWUpLFxuICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ludGVnZXI7XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMpXG4gICAgc3RhdGljIGludGVybmFsQ2hpbGRLZXlzID0gW1xuICAgICAgICAnY29udGVudCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgXVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQmx1cikpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25DbGljaykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkZvY3VzKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbil9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25Gb2N1cykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KGRlZmluaXRpb24sIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbENoaWxkS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgYXJpYS1yb2xlPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgdXRpbGl0eSB2aWV3IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zIG9mIHZhcnlpbmcgc2l6ZXMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0aW9uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGV2ZW46IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IG5leHRQcm9wcy5kYXRhfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCAmJiB0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyl9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nQ29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBqc3ggPSB0aGlzLnByb3BzLmRhdGFUb0pTWENvbnZlcnRlckZ1bmModGhpcy5zdGF0ZS5kYXRhLCB0aGlzLnByb3BzLmluZGV4KTtcblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGpzeCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyksXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyhqc3gucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBnZXRJdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgaW5pdGlhbFBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlSW5pdGlhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IGZhbHNlLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogZGF0YSA9PiBkYXRhLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0aW9uLnBvc2l0aW9ucy5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gaSA9PiB7XG4gICAgICAgIGlmIChpIDwgMCB8fCBpID49IHRoaXMucHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgQ2Fubm90IHBhZ2UgdG8gaW52YWxpZCBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoaSksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogaSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMudG90YWxQYWdlcygpO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgdG90YWxQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaXNGdW5jdGlvbih0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUoY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtjdXJyZW50UGFnZX0gb2YgJHt0b3RhbFBhZ2VzfWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtc3RhdGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1maXJzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IDEsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sJyxcbiAgICAgICAgICAgICAgICAnZGF0YS1wYWdlLW51bWJlcic6IGksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuY3VycmVudFBhZ2UoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gdG90YWxQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5jdXN0b21Db250cm9sQ29udGVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdXVpZCgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtY3VzdG9tJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5wcm9wcy50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAodmFsdWUpID0+IHtcbiAgICAgICAgbGV0IG5leHRUYXJnZXRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkZJUlNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5QUkVWSU9VUzpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgLSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5ORVhUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSArIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLkxBU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLnByb3BzLnRvdGFsSXRlbXMgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSBwYXJzZUludCh2YWx1ZSwgMTApICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgobmV4dFRhcmdldEluZGV4KSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBuZXh0VGFyZ2V0SW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naXRlbUxpc3QnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW1zJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZW5lcmF0ZUl0ZW1zKCkubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2BpdGVtXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4PXtpbmRleE9mZnNldCArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdDb250ZW50PXt0aGlzLnByb3BzLml0ZW1Mb2FkaW5nQ29udGVudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCAgIHRoaXMucHJvcHMuaGlkZVBhZ2VySWZOb3ROZWVkZWRcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMudG90YWxJdGVtcyA8PSB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcztcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlciA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ2FwaXRhbGl6ZWQgPSBwb3NpdGlvbkxvd2VyWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17YHNlZ21lbnRlZENvbnRyb2wke3Bvc2l0aW9uQ2FwaXRhbGl6ZWR9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24tY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbYHVpLXBhZ2luYXRpb24tY29udHJvbHMtJHtwb3NpdGlvbkxvd2VyfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQYWdpbmF0aW9uLnBvc2l0aW9ucztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRpb24nPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkFCT1ZFIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CRUxPVyB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQYWdpbmF0aW9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgZm9yIHVzZSBpbiBwcm9ncmFtbWF0aWMgdHJhbnNmb3JtIHN0eWxlIG1hbmlwdWxhdGlvbi5cbiAqIEBtb2R1bGUgVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHByb3BlcnR5IGtleSAoZS5nLiBgV2Via2l0VHJhbnNmb3JtYCwgYG1zVHJhbnNmb3JtYClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gZGV0ZWN0VHJhbnNmb3JtUHJvcGVydHkoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAnV2Via2l0VHJhbnNmb3JtJyxcbiAgICAgICAgJ01velRyYW5zZm9ybScsXG4gICAgICAgICdPVHJhbnNmb3JtJyxcbiAgICAgICAgJ21zVHJhbnNmb3JtJyxcbiAgICAgICAgJ3dlYmtpdC10cmFuc2Zvcm0nLCAvLyB1c2VkIGluIEpTRE9NXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJvcHNbaV0gaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcblxuZnVuY3Rpb24gd2l0aG91dChhcnIxLCBhcnIyKSB7IHJldHVybiBhcnIxLmZpbHRlcigoaXRlbSkgPT4gYXJyMi5pbmRleE9mKGl0ZW0pID09PSAtMSk7IH1cbmZ1bmN0aW9uIHZhbHVlcyhvYmopICAgICAgICAgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSkgPT4gb2JqW2tleV0pOyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uVmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wb3NpdGlvbilcblxuICAgIHN0YXRpYyBwcmVzZXQgPSB7XG4gICAgICAgICdBQk9WRSc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIH0sXG4gICAgICAgICdCRUxPVyc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIH0sXG4gICAgICAgICdMRUZUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICAgICAgJ1JJR0hUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlc2V0VmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wcmVzZXQpXG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJyAvPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtZmlsbCcgZmlsbD0nI0ZGRicgcG9pbnRzPSc2Ljk4MjMwNDQ0IDEuNzUgMTIuNzUgMTAgMS4yNSAxMCcgLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIHByZXNldDogVUlQb3BvdmVyLnByZXNldC5CRUxPVyxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IHByb3BzLmFuY2hvclhBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogcHJvcHMuYW5jaG9yWUFsaWduICB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWUFsaWduLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogcHJvcHMuc2VsZlhBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IHByb3BzLnNlbGZZQWxpZ24gICAgfHwgcHJvcHMucHJlc2V0LnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcikge1xuICAgICAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yTGVmdCA9IGFuY2hvclJlY3QubGVmdDtcbiAgICAgICAgdGhpcy5hbmNob3JUb3AgPSBhbmNob3JSZWN0LnRvcDtcbiAgICAgICAgdGhpcy5hbmNob3JIZWlnaHQgPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgdGhpcy5hbmNob3JXaWR0aCA9IGFuY2hvclJlY3Qud2lkdGg7XG5cbiAgICAgICAgdGhpcy5ib2R5TGVmdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5ib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBYIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgYWJvdmUgb3IgYmVsb3cgdGhlIGFuY2hvciBhbmQgc2VsZlhBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZlhBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50SGVpZ2h0IC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gdGhpcy5hbmNob3JMZWZ0ICsgdGhpcy5ib2R5TGVmdDtcblxuICAgICAgICBzd2l0Y2ggKGFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlkQWxpZ25tZW50Q2hhbmdlKG5leHRBbGlnbm1lbnQsIGN1cnJlbnRBbGlnbm1lbnQgPSB0aGlzLnN0YXRlKSB7XG4gICAgICAgIHJldHVybiAgICBuZXh0QWxpZ25tZW50LmFuY2hvclhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuYW5jaG9yWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvcllBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWUFsaWduO1xuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IGZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICB0aGlzLmNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yKSk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yKSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoZHgsIGR5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiB0aGlzLmRpZEFsaWdubWVudENoYW5nZShhbGlnbm1lbnRDb3JyZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgY2FyZXQgaXMgaW5pdGlhbGx5IHBvc2l0aW9uZWQgYXQgMCwwIGluc2lkZSB0aGUgZGlhbG9nXG4gICAgICAgIC8vIHdoaWNoIGlzIGFscmVhZHkgcG9zaXRpb25lZCBhdCB0aGUgYW5jaG9yLCBzbyB3ZSBqdXN0IG5lZWQgdG9cbiAgICAgICAgLy8gbWFrZSBzbWFsbCBhZGp1c3RtZW50cyBhcyBuZWNlc3NhcnkgdG8gbGluZSB1cCB0aGUgY2FyZXRcbiAgICAgICAgLy8gd2l0aCB0aGUgdmlzdWFsIGNlbnRlciBvZiB0aGUgYW5jaG9yXG5cbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRYUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcblxuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kY2FyZXQsIGN4LCAwKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuZGlhbG9nLiR3cmFwcGVyLCBkeCwgZHkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMuYWxpZ24oKTsgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkgeyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7IH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50OiBnZXRGcmFnLCBwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJUG9ydGFsPlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlQb3BvdmVyLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KGluc3RhbmNlKSA9PiAodGhpcy5kaWFsb2cgPSBpbnN0YW5jZSl9XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZT17XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQocHJvcHMuY2FyZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IChub2RlKSA9PiAodGhpcy4kY2FyZXQgPSBub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KCd1aS1wb3BvdmVyLWNhcmV0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jYXJldENvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMud3JhcHBlclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3ZlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8L1VJUG9ydGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgICAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzcy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUmFkaW8ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgdXVpZCA9IHV1aWQoKVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc0NvbnRyb2xsZWQ6IGlzU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSksXG4gICAgICAgIGlzRm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldElucHV0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHZhbHVlfSlcblxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmZpZWxkLnZhbHVlXG5cbiAgICBzZXRWYWx1ZShuZXh0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgIHRoaXMucmVmcy5maWVsZC52YWx1ZSA9IG5leHRWYWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIGlucHV0IGNoYW5nZSBldmVudCBmbG93XG4gICAgICAgICAgICB0aGlzLnJlZnMuZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0Jywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IGZhbHNlfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNGb2N1c2VkOiB0cnVlfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gZm9yIFwiY29udHJvbGxlZFwiIHNjZW5hcmlvcywgdXBkYXRlcyB0byB0aGUgY2FjaGVkIGlucHV0IHRleHQgc2hvdWxkIGNvbWVcbiAgICAgICAgLy8gZXhjbHVzaXZlbHkgdmlhIHByb3BzIChjV1JQKSBzbyBpdCBleGFjdGx5IG1pcnJvcnMgdGhlIGN1cnJlbnQgYXBwbGljYXRpb25cbiAgICAgICAgLy8gc3RhdGUsIG90aGVyd2lzZSBhIHJlLXJlbmRlciB3aWxsIG9jY3VyIGJlZm9yZSB0aGUgbmV3IHRleHQgaGFzIGNvbXBsZXRlZCBpdHNcbiAgICAgICAgLy8gZmVlZGJhY2sgbG9vcCBhbmQgdGhlIGN1cnNvciBwb3NpdGlvbiBpcyBsb3N0XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBsYWNlaG9sZGVyVGV4dCgpIHtcbiAgICAgICAgY29uc3QgaXNOb25FbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRTaG93UGxhY2Vob2xkZXIgPSAgIHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgPT09IGZhbHNlICYmIGlzTm9uRW1wdHkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc05vbkVtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gc2hvdWxkU2hvd1BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBhbGdvcml0aG06IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgaGludFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgfHwgJycsXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgdXBkYXRlSW5wdXRTdGF0ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmVudGl0aWVzICE9PSB0aGlzLnByb3BzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKG5leHRQcm9wcy5lbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tb3VudGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZFxuXG4gICAgc2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgPSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQuZ2V0VmFsdWUoKVxuXG4gICAgc2V0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4ge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiAgICBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZFxuICAgICAgICAgICAgICAgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5lZWRzIHRvIGhhcHBlbiBhZnRlciB0aGUgdXBjb21pbmcgcmVuZGVyIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgYHNldFZhbHVlYFxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnJlc2V0TWF0Y2hlcywgMCk7XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0TWFya2luZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWFya2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWFya2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXJraW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0cywgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoaW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hdGNoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXRjaGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaGVyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hdGNoaW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgY29tcHV0ZU1hdGNoZXMocHJvdmlkZWRFbnRpdGllcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0aWVzID0gcHJvdmlkZWRFbnRpdGllcyB8fCBwcm9wcy5lbnRpdGllcztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUuaW5wdXQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzTmFtZV06ICEhY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJVGV4dHVhbElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5jb25zdCBmaXJzdCA9IGFycmF5ID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IGFycmF5ID0+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRva2VuaXplZElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICAgICAgdG9rZW5zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRva2VuaXplZElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQuZGVmYXVsdFByb3BzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogbm9vcCxcbiAgICAgICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBub29wLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IG5vb3AsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6ICg8ZGl2Plg8L2Rpdj4pLFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgdG9rZW5zOiBbXSxcbiAgICAgICAgdG9rZW5zU2VsZWN0ZWQ6IFtdLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIC8vIHBhc3N0aHJvdWdocyB0byBVSVR5cGVhaGVhZElucHV0IGluc3RhbmNlIG1ldGhvZHNcbiAgICBmb2N1cyA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKVxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0SW5wdXROb2RlKClcbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFZhbHVlKClcbiAgICBzZWxlY3QgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpXG4gICAgc2V0VmFsdWUgPSB2YWx1ZSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9rZW5pemVkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyh0aGlzLnByb3BzLCBVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndHlwZWFoZWFkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlSW5wdXRDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgd3JhcHBlciB0aGF0IGRpc3BsYXlzIHByb3ZpZGVkIHRleHQgb24gaG92ZXIuXG4gKiBAY2xhc3MgVUlUb29sdGlwXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb29sdGlwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJFRk9SRTogJ0JFRk9SRScsXG4gICAgICAgIEFGVEVSOiAnQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlUb29sdGlwLnBvc2l0aW9uKSksXG4gICAgICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBwb3NpdGlvbjogVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRvb2x0aXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hYm92ZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlbG93JzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUxPVyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVmb3JlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5CRUZPUkUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFmdGVyJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BRlRFUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9e3RoaXMucHJvcHMudGV4dH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgdGhpcy5wcm9wcy50ZXh0fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogVHJpZ2dlciBuYXRpdmUgdG9hc3RzIGluIHN1cHBvcnRpbmcgYnJvd3NlcnMuXG4gKiBAY2xhc3MgVUlOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vaXNTdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgZXJyb3JzID0ge1xuICAgIERJU0FCTEVEOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYnkgdXNlciBzZXR0aW5ncy4nLFxuICAgIE5PVF9BVkFJTEFCTEU6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nLFxuICAgIENPTkZJR19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IHBhc3NlZCBhIG5vbi1vYmplY3QgYXMgY29uZmlndXJhdGlvbi4nLFxuICAgIENPTkZJR19NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IG5vIGNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZC4nLFxuICAgIEJPRFlfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEJPRFlfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgYm9keWAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBIRUFERVJfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgSEVBREVSX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgd2FzIG9taXR0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QuJyxcbiAgICBJQ09OX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGljb25gIG11c3QgYmUgYSBVUkwgc3RyaW5nLicsXG4gICAgT05DTElDS19UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBvbkNsaWNrYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyxcbn07XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkFQSSA9IChmdW5jdGlvbiBkZXRlY3RTdXBwb3J0KCkge1xuICAgIGlmICh3aW5kb3cuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuTm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1vek5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2dyYW50ZWQnIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1Blcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk5PVF9BVkFJTEFCTEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdwZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLnBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2RlbmllZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICB9IGVsc2UgaWYgKCdjaGVja1Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeShjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkNPTkZJR19UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5ib2R5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmhlYWRlcikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5IRUFERVJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmljb24gIT09IHVuZGVmaW5lZCAmJiBpc1N0cmluZyhjb25maWcuaWNvbikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5JQ09OX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5vbkNsaWNrICE9PSB1bmRlZmluZWQgJiYgaXNGdW5jdGlvbihjb25maWcub25DbGljaykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5PTkNMSUNLX1RZUEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tQZXJtaXNzaW9uKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwYXduV2ViTm90aWZpY2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25BUEkoY29uZmlnLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBjb25maWcuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogY29uZmlnLmljb24sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcub25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maWcub25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQXJyb3dLZXlOYXZpZ2F0aW9ufSBmcm9tICcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUJ1dHRvbn0gZnJvbSAnLi9VSUJ1dHRvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveH0gZnJvbSAnLi9VSUNoZWNrYm94JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUNoZWNrYm94R3JvdXB9IGZyb20gJy4vVUlDaGVja2JveEdyb3VwJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSURpYWxvZ30gZnJvbSAnLi9VSURpYWxvZyc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlGaXR0ZWRUZXh0fSBmcm9tICcuL1VJRml0dGVkVGV4dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlJbWFnZX0gZnJvbSAnLi9VSUltYWdlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSU1vZGFsfSBmcm9tICcuL1VJTW9kYWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUGFnaW5hdGlvbn0gZnJvbSAnLi9VSVBhZ2luYXRpb24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUG9wb3Zlcn0gZnJvbSAnLi9VSVBvcG92ZXInO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUG9ydGFsfSBmcm9tICcuL1VJUG9ydGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzfSBmcm9tICcuL1VJUHJvZ3Jlc3MnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlfSBmcm9tICcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVJhZGlvfSBmcm9tICcuL1VJUmFkaW8nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJU2VnbWVudGVkQ29udHJvbH0gZnJvbSAnLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9rZW5pemVkSW5wdXR9IGZyb20gJy4vVUlUb2tlbml6ZWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUZXh0dWFsSW5wdXR9IGZyb20gJy4vVUlUZXh0dWFsSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVHlwZWFoZWFkSW5wdXR9IGZyb20gJy4vVUlUeXBlYWhlYWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUb29sdGlwfSBmcm9tICcuL1VJVG9vbHRpcCc7XG5cbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcuL1VJVXRpbHMvbm90aWZ5JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wZXJ0eSBmcm9tICcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgY29uc3QgVUlVdGlscyA9IHtleHRyYWN0Q2hpbGRQcm9wcywgbm90aWZ5LCB0cmFuc2Zvcm1Qcm9wZXJ0eSwgdXVpZH07XG4iXSwibmFtZXMiOlsidGVzdCIsIm9taXRLZXlzRnJvbVNvdXJjZU9iamVjdCIsInNvdXJjZSIsIm9taXR0ZWRLZXlzIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsInJlbG9jYXRlQWNjZXB0ZWRLZXlzIiwiaGFzaCIsImtleSIsImluZGV4T2YiLCJVSUFycm93S2V5TmF2aWdhdGlvbiIsInN0YXRlIiwiaGFuZGxlS2V5RG93biIsImV2ZW50IiwicHJvcHMiLCJtb2RlIiwiVkVSVElDQUwiLCJCT1RIIiwicHJldmVudERlZmF1bHQiLCJtb3ZlRm9jdXMiLCJIT1JJWk9OVEFMIiwiaXNGdW5jdGlvbiIsIm9uS2V5RG93biIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImFjdGl2ZUNoaWxkSW5kZXgiLCJzZXRGb2N1cyIsIm5leHRQcm9wcyIsIm51bUNoaWxkcmVuIiwiY2hpbGRyZW4iLCJSZWFjdCIsIkNoaWxkcmVuIiwiY291bnQiLCJzZXRTdGF0ZSIsImluZGV4IiwiY2hpbGROb2RlIiwicmVmcyIsIndyYXBwZXIiLCJIVE1MRWxlbWVudCIsImZpbmRET01Ob2RlIiwiaGFzQXR0cmlidXRlIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HIiwiZm9jdXMiLCJkZWx0YSIsIm5leHRJbmRleCIsImNoaWxkIiwic3RvcFByb3BhZ2F0aW9uIiwiaXNTdHJpbmciLCJvbkZvY3VzIiwibWFwIiwiY2xvbmVFbGVtZW50IiwicGFyc2VJbnQiLCJ0YWJJbmRleCIsInVuZGVmaW5lZCIsImhhbmRsZUNoaWxkRm9jdXMiLCJiaW5kIiwiY3JlYXRlRWxlbWVudCIsImNvbXBvbmVudCIsIm9taXQiLCJpbnRlcm5hbEtleXMiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZnVuYyIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIiwibm9vcCIsIlVJQnV0dG9uIiwiaGFuZGxlQ2xpY2siLCJkaXNhYmxlZCIsInRvZ2dsZVN0YXRlIiwib25DbGljayIsInByZXNzZWQiLCJjeCIsImNsYXNzTmFtZSIsIm5vZGUiLCJib29sIiwidXVpZCIsInJlcGxhY2UiLCJhIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVUlDaGVja2JveCIsImlkIiwiaGFuZGxlQ2hhbmdlIiwiaW5wdXRQcm9wcyIsImNoZWNrZWQiLCJuYW1lIiwib25DaGFuZ2UiLCJpbnB1dCIsImluZGV0ZXJtaW5hdGUiLCJzZXRJbmRldGVybWluYXRlIiwiU3RyaW5nIiwiZ2V0QXJpYVN0YXRlIiwibGFiZWwiLCJsYWJlbFByb3BzIiwicmVuZGVySW5wdXQiLCJyZW5kZXJMYWJlbCIsInNoYXBlIiwib2JqZWN0IiwiVUlDaGVja2JveEdyb3VwIiwiaXRlbXMiLCJldmVyeSIsIml0ZW0iLCJzb21lIiwic2VsZWN0QWxsIiwiYWxsQ2hlY2tlZCIsImFsbEl0ZW1zQ2hlY2tlZCIsInNlbGVjdEFsbFByb3BzIiwiYW55SXRlbXNDaGVja2VkIiwib25BbGxDaGVja2VkIiwib25BbGxVbmNoZWNrZWQiLCJvbkNoaWxkQ2hlY2tlZCIsIm9uQ2hpbGRVbmNoZWNrZWQiLCJ0b0JlUmVuZGVyZWQiLCJyZW5kZXJDaGVja2JveGVzIiwic2VsZWN0QWxsUG9zaXRpb24iLCJDb25zdGFudHMiLCJTRUxFQ1RfQUxMX0JFRk9SRSIsInVuc2hpZnQiLCJyZW5kZXJTZWxlY3RBbGwiLCJTRUxFQ1RfQUxMX0FGVEVSIiwicHVzaCIsInJlbmRlckNoaWxkcmVuIiwiYXJyYXlPZiIsImlzUmVxdWlyZWQiLCJ0b0FycmF5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsIlVJRGlhbG9nIiwibW91bnRlZCIsInV1aWRIZWFkZXIiLCJ1dWlkQm9keSIsImhhbmRsZUZvY3VzIiwibmF0aXZlRXZlbnQiLCJjYXB0dXJlRm9jdXMiLCJjbG9zZU9uT3V0c2lkZUZvY3VzIiwiaXNQYXJ0T2ZEaWFsb2ciLCJ0YXJnZXQiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwib25DbG9zZSIsInByZXZpb3VzIiwiZXhwbGljaXRPcmlnaW5hbFRhcmdldCIsInJlbGF0ZWRUYXJnZXQiLCJjbG9zZU9uRXNjS2V5IiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiY2xvc2VPbk91dHNpZGVDbGljayIsImhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCIsImNsb3NlT25PdXRzaWRlU2Nyb2xsIiwicm9vdHMiLCIkd3JhcHBlciIsImNvbmNhdCIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRBdHRyaWJ1dGUiLCJlbGVtZW50Iiwibm9kZVR5cGUiLCJFTEVNRU5UX05PREUiLCJwYXJlbnROb2RlIiwiY29udGFpbnMiLCJhZGRFdmVudExpc3RlbmVyIiwiJGRpYWxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJib2R5UHJvcHMiLCJmb290ZXIiLCJmb290ZXJQcm9wcyIsImhlYWRlciIsImhlYWRlclByb3BzIiwid3JhcHBlclByb3BzIiwicmVuZGVyRm9jdXNCb3VuZGFyeSIsImJlZm9yZSIsInJlbmRlckhlYWRlciIsInJlbmRlckJvZHkiLCJyZW5kZXJGb290ZXIiLCJhZnRlciIsImluc3RhbmNlcyIsInRvSSIsInN0cmluZ051bWJlciIsInJlc2NhbGUiLCJpbnN0YW5jZSIsImNvbnRhaW5lckJveCIsImdldENvbXB1dGVkU3R5bGUiLCJmb250U2l6ZSIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJib3hTaXppbmciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwib3B0aW1pemVGb3JIZWlnaHQiLCJmbG9vciIsIm9mZnNldEhlaWdodCIsIm9wdGltaXplRm9yV2lkdGgiLCJvZmZzZXRXaWR0aCIsInN0eWxlIiwibWluIiwibWF4Rm9udFNpemUiLCJoYW5kbGVXaW5kb3dSZXNpemUiLCJmb3JFYWNoIiwicmVnaXN0ZXJJbnN0YW5jZSIsImxlbmd0aCIsInVucmVnaXN0ZXJJbnN0YW5jZSIsInNwbGljZSIsIlVJRml0dGVkVGV4dCIsIk51bWJlciIsIk1BWF9WQUxVRSIsIm51bWJlciIsIlVJSW1hZ2UiLCJzdGF0dXMiLCJMT0FESU5HIiwic3JjIiwicmVzZXRQcmVsb2FkZXIiLCJwcmVsb2FkIiwibG9hZGVyIiwib25sb2FkIiwib25lcnJvciIsIkxPQURFRCIsIkVSUk9SIiwiZGlzcGxheUFzQmFja2dyb3VuZEltYWdlIiwiaW1hZ2VQcm9wcyIsImFsdCIsInN0YXR1c1Byb3BzIiwicmVuZGVySW1hZ2UiLCJyZW5kZXJTdGF0dXMiLCJVSVBvcnRhbCIsIiRwb3J0YWwiLCIkcGFzc2VuZ2VyIiwiZGVzdGluYXRpb24iLCJhcHBlbmRDaGlsZCIsInJlbmRlclBvcnRhbGxlZENvbnRlbnQiLCJpc1ZhbGlkRWxlbWVudCIsInBvcnRhbElkIiwicmVuZGVyIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlbW92ZUNoaWxkIiwiQ29tcG9uZW50IiwiaW5zdGFuY2VPZiIsImJvZHkiLCJleHRyYWN0Q2hpbGRQcm9wcyIsInBhcmVudFByb3BzIiwiY2hpbGRQcm9wVHlwZXMiLCJjaGlsZFByb3BzIiwiVUlNb2RhbCIsIiRtb2RhbCIsIm1hc2tQcm9wcyIsIm1vZGFsUHJvcHMiLCJVSVNlZ21lbnRlZENvbnRyb2wiLCJhY3RpdmVJdGVtSW5kZXgiLCJpbmRleE9mT3B0aW9uSW5Gb2N1cyIsImdldFByZXZpb3VzT3B0aW9uSW5kZXgiLCJnZXROZXh0T3B0aW9uSW5kZXgiLCJoYW5kbGVPcHRpb25DbGljayIsIm9wdGlvbnMiLCJ2YWx1ZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY3VycmVudE9wdGlvbkluZGV4IiwibmV4dCIsIm9uQmx1ciIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJkZWZpbml0aW9uIiwiaW50ZXJuYWxDaGlsZEtleXMiLCJoYW5kbGVPcHRpb25CbHVyIiwiaGFuZGxlT3B0aW9uRm9jdXMiLCJjb250ZW50IiwicmVuZGVyT3B0aW9ucyIsInZhbGlkYXRlT3B0aW9ucyIsIkVycm9yIiwibWlzc2luZ1NlbGVjdGVkIiwic2VlblNlbGVjdGVkIiwibXVsdGlwbGVTZWxlY3RlZCIsIkl0ZW0iLCJkYXRhIiwiUHJvbWlzZSIsInRoZW4iLCJjYXV0aW91c2x5U2V0SXRlbURhdGEiLCJwcm9taXNlIiwid2FpdEZvckNvbnRlbnRJZk5lY2Vzc2FyeSIsImV4dHJhQ2xhc3NlcyIsImV2ZW4iLCJnZXRDbGFzc2VzIiwibG9hZGluZ0NvbnRlbnQiLCJqc3giLCJkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jIiwiVUlQYWdpbmF0aW9uIiwiaW5pdGlhbFBhZ2UiLCJudW1JdGVtc1BlclBhZ2UiLCJjdXJyZW50UGFnZSIsImdldFBhZ2VGb3JJbmRleCIsIml0ZW1zUGVyUGFnZSIsImNlaWwiLCJ0b3RhbFBhZ2VzIiwidG90YWxJdGVtcyIsImZpcnN0VmlzaWJsZUl0ZW1JbmRleCIsInBhZ2VUb0luZGV4IiwiaSIsIm5leHRUYXJnZXRJbmRleCIsImNvbnRyb2xzIiwiRklSU1QiLCJQUkVWSU9VUyIsIk5FWFQiLCJMQVNUIiwiaXRlbV8wIiwib2xkUHJvcHMiLCJpZGVudGlmaWVyIiwidGFyZ2V0SW5kZXgiLCJudW1QYWdlVG9nZ2xlcyIsInN0YXJ0UGFnZSIsImVuZFBhZ2UiLCJzaG93UGFnaW5hdGlvblN0YXRlIiwic2hvd0p1bXBUb0ZpcnN0IiwianVtcFRvRmlyc3RDb250cm9sQ29udGVudCIsInByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50IiwibmV4dFBhZ2VDb250cm9sQ29udGVudCIsInNob3dKdW1wVG9MYXN0IiwianVtcFRvTGFzdENvbnRyb2xDb250ZW50IiwiY3VzdG9tQ29udHJvbENvbnRlbnQiLCJnZW5lcmF0ZWRJdGVtcyIsImZpcnN0SXRlbUluZGV4IiwibGFzdEl0ZW1JbmRleCIsImdldEl0ZW0iLCJsaXN0V3JhcHBlclByb3BzIiwiaW5kZXhPZmZzZXQiLCJnZW5lcmF0ZUl0ZW1zIiwiaXRlbVRvSlNYQ29udmVydGVyRnVuYyIsIml0ZW1Mb2FkaW5nQ29udGVudCIsInBvc2l0aW9uIiwiaGlkZVBhZ2VySWZOb3ROZWVkZWQiLCJ0b2dnbGVXcmFwcGVyUHJvcHMiLCJwb3NpdGlvbkxvd2VyIiwidG9Mb3dlckNhc2UiLCJwb3NpdGlvbkNhcGl0YWxpemVkIiwidG9VcHBlckNhc2UiLCJjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucyIsInBvc2l0aW9ucyIsIkFCT1ZFIiwicmVuZGVyQ29udHJvbHMiLCJyZW5kZXJJdGVtcyIsIkJFTE9XIiwicmVuZGVyVmlldyIsInZhbGlkYXRlSW5pdGlhbFBhZ2UiLCJpc0ludGVnZXIiLCJudW1iZXJPZlBhZ2VzIiwidmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UiLCJkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSIsImxlbiIsImRvY3VtZW50RWxlbWVudCIsIndpdGhvdXQiLCJhcnIxIiwiYXJyMiIsImZpbHRlciIsInZhbHVlcyIsIm9iaiIsIlVJUG9wb3ZlciIsImFsaWduIiwiYW5jaG9yIiwiY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5IiwiZHgiLCJyb3VuZCIsImdldE5leHREaWFsb2dYUG9zaXRpb24iLCJkeSIsImdldE5leHREaWFsb2dZUG9zaXRpb24iLCJhbGlnbm1lbnRDb3JyZWN0aW9uIiwiZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmciLCJkaWRBbGlnbm1lbnRDaGFuZ2UiLCIkY2FyZXQiLCJsZWZ0IiwiZ2V0TmV4dENhcmV0WFBvc2l0aW9uIiwidG9wIiwiZ2V0TmV4dENhcmV0WVBvc2l0aW9uIiwiYXBwbHlUcmFuc2xhdGlvbiIsImRpYWxvZyIsImFuY2hvclhBbGlnbiIsInByZXNldCIsImFuY2hvcllBbGlnbiIsInNlbGZYQWxpZ24iLCJzZWxmWUFsaWduIiwiYW5jaG9yUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFuY2hvckxlZnQiLCJhbmNob3JUb3AiLCJhbmNob3JIZWlnaHQiLCJhbmNob3JXaWR0aCIsImJvZHlMZWZ0Iiwic2Nyb2xsTGVmdCIsImJvZHlUb3AiLCJzY3JvbGxUb3AiLCJjYXJldCIsIm5leHRYIiwiTUlERExFIiwiU1RBUlQiLCJFTkQiLCJjbGllbnRXaWR0aCIsIm5leHRZIiwiY2xpZW50SGVpZ2h0IiwiYW5jaG9yWSIsIngiLCJ5IiwiYXV0b1JlcG9zaXRpb24iLCJjb3JyZWN0aW9ucyIsInhNYXgiLCJzY3JvbGxXaWR0aCIsInlNYXgiLCJzY3JvbGxIZWlnaHQiLCJ0cmFuc2Zvcm1Qcm9wIiwibmV4dEFsaWdubWVudCIsImN1cnJlbnRBbGlnbm1lbnQiLCJjb25zdGFudCIsImdldEZyYWciLCJnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50IiwiY2FyZXRDb21wb25lbnQiLCJwb3NpdGlvblZhbHVlcyIsInByZXNldFZhbHVlcyIsIlVJUHJvZ3Jlc3MiLCJvbkNhbmNlbCIsImNhbmNlbFByb3BzIiwicHJvZ3Jlc3NQcm9wcyIsInByb2dyZXNzIiwidHdlZW5Qcm9wZXJ0eSIsInJlbmRlclByb2dyZXNzIiwicmVuZGVyQ2FuY2VsIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUiLCJleHBhbmRlZCIsImRpc3BhdGNoQ2FsbGJhY2siLCJ0b2dnbGVQcm9wcyIsIm5ld1Byb3BzIiwidGVhc2VyRXhwYW5kZWQiLCJ0ZWFzZXIiLCJyZW5kZXJDb250ZW50IiwiVUlSYWRpbyIsIm9uU2VsZWN0ZWQiLCJVSVRleHR1YWxJbnB1dCIsInNldElucHV0VmFsdWUiLCJnZXRWYWx1ZSIsImZpZWxkIiwiaGFuZGxlQmx1ciIsImlzRm9jdXNlZCIsImlzQ29udHJvbGxlZCIsImRlZmF1bHRWYWx1ZSIsIm5leHRWYWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJpc05vbkVtcHR5Iiwic2hvdWxkU2hvd1BsYWNlaG9sZGVyIiwiaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyIsInBsYWNlaG9sZGVyIiwiZ2V0UGxhY2Vob2xkZXJUZXh0IiwiQm9vbGVhbiIsInJlbmRlclBsYWNlaG9sZGVyIiwiVUlUeXBlYWhlYWRJbnB1dCIsImNvbXB1dGVNYXRjaGVzIiwic2VsZWN0ZWRFbnRpdHlJbmRleCIsIm9uRW50aXR5SGlnaGxpZ2h0ZWQiLCJlbnRpdGllcyIsInVwZGF0ZUlucHV0U3RhdGUiLCJlbnRpdHlNYXRjaEluZGV4ZXMiLCJtYXRjaGVzIiwic2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkiLCJ0b3RhbE1hdGNoZXMiLCJtYXRjaEluZGV4IiwibWF0Y2hlc05vZGUiLCJtYXRjaGVzTm9kZVlFbmQiLCJtYXRjaE5vZGUiLCJtYXRjaE5vZGVZU3RhcnQiLCJvZmZzZXRUb3AiLCJtYXRjaE5vZGVZRW5kIiwiZ2V0SW5wdXROb2RlIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJlbnRpdHkiLCJlbnRpdHlDb250ZW50IiwidGV4dCIsImZyYWdzIiwic3BsaXQiLCJSZWdFeHAiLCJlc2NhcGVyIiwibm9ybWFsaXplZFVzZXJUZXh0IiwidGhyZXNob2xkIiwic2Vla1ZhbHVlIiwiaW5kZXhTdGFydCIsImluZGV4RW5kIiwiYWxnb3JpdGhtIiwiU1RBUlRTX1dJVEgiLCJtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nIiwibWFya0Z1enp5TWF0Y2hTdWJzdHJpbmciLCJtYXJrZXIiLCJ3YXJuZWRNYXJrZXIiLCJ3YXJuIiwidXNlclRleHQiLCJub3JtYWxpemVkIiwiZmluZEluZGV4ZXMiLCJyZXN1bHQiLCJzZWVrTWF0Y2giLCJyZXN1bHRzIiwiZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyIsImdldEZ1enp5TWF0Y2hJbmRleGVzIiwibWF0Y2hlciIsIndhcm5lZE1hdGNoZXIiLCJwcm92aWRlZEVudGl0aWVzIiwiY3VycmVudFZhbHVlIiwiZ2V0TWF0Y2hJbmRleGVzIiwib2Zmc2NyZWVuQ2xhc3MiLCJnZXRTZWxlY3RlZEVudGl0eVRleHQiLCJoaW50IiwicmF3IiwicHJvY2Vzc2VkIiwiaGludFByb3BzIiwibWF0Y2hXcmFwcGVyUHJvcHMiLCJyZXN0IiwiaGFuZGxlTWF0Y2hDbGljayIsIm1hcmtNYXRjaFN1YnN0cmluZyIsInJlbmRlck5vdGlmaWNhdGlvbiIsInJlbmRlckhpbnQiLCJyZW5kZXJNYXRjaGVzIiwiRlVaWlkiLCJyZXNldE1hdGNoZXMiLCJzZWxlY3QiLCJzZXRWYWx1ZSIsIm9uRW50aXR5U2VsZWN0ZWQiLCJjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uIiwiZ2V0TWFya2luZ0Z1bmN0aW9uIiwiZ2V0TWF0Y2hpbmdGdW5jdGlvbiIsImN1cnNvckF0RW5kT2ZJbnB1dCIsInNoaWZ0S2V5Iiwic2VsZWN0TWF0Y2giLCJvbkNvbXBsZXRlIiwiZmlyc3QiLCJhcnJheSIsImxhc3QiLCJVSVRva2VuaXplZElucHV0IiwidHlwZWFoZWFkIiwiYWRkIiwidG9rZW5zIiwiaGFuZGxlQWRkVG9rZW4iLCJoYW5kbGVJbnB1dENsaWNrIiwiY2xlYXJTZWxlY3Rpb24iLCJoYW5kbGVJbnB1dEZvY3VzIiwid2hpY2giLCJzZWxlY3RQcmV2aW91c1Rva2VuIiwic2VsZWN0TmV4dFRva2VuIiwidG9rZW5zU2VsZWN0ZWQiLCJyZW1vdmUiLCJtZXRhS2V5IiwiX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uIiwiaGFuZGxlTmV3U2VsZWN0aW9uIiwicHJldmlvdXNTZWxlY3RlZEluZGV4ZXMiLCJjdXJyZW50U2VsZWN0ZWRJbmRleGVzIiwiaW5kZXhlcyIsImlzQXJyYXkiLCJpZHgiLCJoYW5kbGVSZW1vdmVUb2tlbnMiLCJhcHBlbmQiLCJzZWxlY3RUb2tlbiIsInByZXZpb3VzVG9rZW4iLCJzZWxlY3RUb2tlbnMiLCJuZXh0VG9rZW4iLCJ0b2tlbkNsb3NlQ29tcG9uZW50IiwidG9rZW5DbG9zZVZpc2libGUiLCJoYW5kbGVUb2tlbkNsb3NlQ2xpY2siLCJoYW5kbGVUb2tlbktleURvd24iLCJyZW5kZXJUb2tlbkNsb3NlIiwicmVuZGVyVG9rZW5zIiwiVUlUb29sdGlwIiwiQkVGT1JFIiwiQUZURVIiLCJlcnJvcnMiLCJOb3RpZmljYXRpb25BUEkiLCJkZXRlY3RTdXBwb3J0IiwiTm90aWZpY2F0aW9uIiwid2Via2l0Tm90aWZpY2F0aW9ucyIsIm5hdmlnYXRvciIsIm1vek5vdGlmaWNhdGlvbiIsInJlcXVlc3RQZXJtaXNzaW9uIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3RSZWNlaXZlciIsIkRJU0FCTEVEIiwiY2hlY2tQZXJtaXNzaW9uIiwiTk9UX0FWQUlMQUJMRSIsInBlcm1pc3Npb24iLCJub3RpZnkiLCJjb25maWciLCJDT05GSUdfTUlTU0lORyIsIkNPTkZJR19UWVBFIiwiQk9EWV9NSVNTSU5HIiwiQk9EWV9UWVBFIiwiSEVBREVSX01JU1NJTkciLCJIRUFERVJfVFlQRSIsImljb24iLCJJQ09OX1RZUEUiLCJPTkNMSUNLX1RZUEUiLCJzcGF3bldlYk5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbiIsImVycm9yIiwiVUlVdGlscyIsInRyYW5zZm9ybVByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtCQUFlLFVBQUNBLElBQUQ7U0FBVSxPQUFPQSxJQUFQLEtBQWdCLFVBQTFCO0NBQWY7O0FDQUEsZ0JBQWUsVUFBQ0EsSUFBRDtTQUFVLE9BQU9BLElBQVAsS0FBZ0IsUUFBMUI7Q0FBZjs7QUNBQTs7OztBQUlBLEFBQWUsU0FBU0Msd0JBQVQsQ0FBa0NDLE1BQWxDLEVBQTREO1FBQWxCQyxXQUFrQix1RUFBSixFQUFJOztXQUNoRUMsT0FBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSSxNQUFwQixDQUEyQixTQUFTQyxvQkFBVCxDQUE4QkMsSUFBOUIsRUFBb0NDLEdBQXBDLEVBQXlDO1lBQ25FTixZQUFZTyxPQUFa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
