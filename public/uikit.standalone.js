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

}((this.UIKit = this.UIKit || {}),React,ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIGRlZmF1bHRBY3RpdmVDaGlsZEluZGV4OiAwLFxuICAgICAgICBtb2RlOiBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVtpbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiBpbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS1za2lwJzogcGFyc2VJbnQoY2hpbGQucHJvcHMudGFiSW5kZXgsIDEwKSA9PT0gLTEgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgfTtcblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUJ1dHRvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgIH07XG5cbiAgICB0b2dnbGVTdGF0ZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlCdXR0b24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEFkZGVkIGEgcHJlZml4IHNvIHRoZSBnZW5lcmF0ZWQgSUQgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyBhbiBIVE1MIElELlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIHVpa2l0LTFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuICd1aWtpdC0nICsgKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3gucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25VbmNoZWNrZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgaWQgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLmlucHV0UHJvcHMsICdpbmRldGVybWluYXRlJyl9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3guaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94R3JvdXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBjb25zdCBQT1JUQUxfREFUQV9BVFRSSUJVVEUgPSAnZGF0YS1wb3J0YWwtaWQnO1xuXG4vKipcbiAqIEEgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCBmb3IgdGhlIHJlbmRlcmluZyBvZiBjb21wb25lbnRzIG91dHNpZGUgdGhlIG5vcm1hbCBSZWFjdCB0cmVlLlxuICogT25seSBhY2NlcHRzIGEgc2luZ2xlIHRvcC1sZXZlbCBjaGlsZDsgbmFrZWQgdGV4dCwgZXRjIHdpbGwgYmUgd3JhcHBlZCBpbiBhIDxkaXY+LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLy8gc2luZ2xlIGNoaWxkIG9ubHkgLSBhcnJheXMgbm90IGFsbG93ZWRcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgZGVzdGluYXRpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUG9ydGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5ib2R5LFxuICAgIH1cblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICAvLyB0aGUgPGRpdj4gdGhhdCB0aGUgY2hpbGRyZW4gYXJlIHJlbmRlcmVkIGludG9cbiAgICAkcG9ydGFsID0gbnVsbFxuXG4gICAgLy8gdGhlIHRvcC1sZXZlbCBjaGlsZCByZW5kZXJlZCBpbnRvIHRoZSAkcG9ydGFsXG4gICAgJHBhc3NlbmdlciA9IG51bGw7XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJHBvcnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKHRoaXMuJHBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJQb3J0YWxsZWRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUG9ydGFsbGVkQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiAoPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9ydGFsIElEIGxpbmsgaWYgbmVlZGVkXG4gICAgICAgIHRoaXMuJHBvcnRhbC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZDtcblxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoY2hpbGQsIHRoaXMuJHBvcnRhbCk7XG4gICAgICAgIHRoaXMuJHBhc3NlbmdlciA9IHRoaXMuJHBvcnRhbC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpOyB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcnRhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHsuLi57W1BPUlRBTF9EQVRBX0FUVFJJQlVURV06IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZH19IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHtQT1JUQUxfREFUQV9BVFRSSUJVVEV9IGZyb20gJy4uL1VJUG9ydGFsJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNvbnN0IHRvQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWZ0ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBiZWZvcmU6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgY29uc3Qgcm9vdHMgPSBbdGhpcy4kd3JhcHBlcl0uY29uY2F0KFxuICAgICAgICAgICAgdG9BcnJheS5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuJHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChgWyR7UE9SVEFMX0RBVEFfQVRUUklCVVRFfV1gKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZShQT1JUQUxfREFUQV9BVFRSSUJVVEUpKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlO1xuXG4gICAgICAgIHJldHVybiByb290cy5zb21lKChkb20pID0+IGRvbS5jb250YWlucyhlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucHJvcHMub25DbG9zZSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmhlYWRlclByb3BzLmlkIHx8IHRoaXMudXVpZEhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiR3cmFwcGVyID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlJbWFnZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBwb3J0YWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgICAgIHBvcnRhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiRtb2RhbCA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVUlQb3J0YWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0ludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNJbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNJbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PSB0b0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMy4yKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gIHJldHVybiByZXN1bHQgPT09IHJlc3VsdCA/IChyZW1haW5kZXIgPyByZXN1bHQgLSByZW1haW5kZXIgOiByZXN1bHQpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW50ZWdlcjtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcHJvbWlzZXMgYXMgY2hpbGRyZW4gYW5kIGV2ZW50dWFsbHkgZG9pbmcgc29tZXRoaW5nIHdpdGggdGhlaXIgcmVzb2x2ZWQgcGF5bG9hZC5cbiAqL1xuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbnZlcnRUb0pTWEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcbiAgICBzdGF0ZSA9IHt9XG5cbiAgICBjb252ZXJ0RGF0YVRvSlNYT3JXYWl0KHByb3BzID0gdGhpcy5wcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudDogbnVsbH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUHJvbWlzZSA9IHByb3BzLmRhdGE7XG5cbiAgICAgICAgICAgIHByb3BzLmRhdGEudGhlbigocmVzb2x2ZWRQYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgY3VycmVudFByb3BzKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBjdXJyZW50UHJvcHMuZGF0YSA9PT0gY2xvc3VyZVByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50UHJvcHMuY29udmVydFRvSlNYRnVuYyhyZXNvbHZlZFBheWxvYWQsIGN1cnJlbnRQcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZS5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LCBub29wKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBwcm9wcy5jb252ZXJ0VG9KU1hGdW5jKHByb3BzLmRhdGEsIHByb3BzLmluZGV4KX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpICAgICAgICAgICAgICAgICB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdCgpOyB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSAgICAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gdHJ1ZTsgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdChuZXh0UHJvcHMpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gZmFsc2U7IH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMuc3RhdGUuY29tcG9uZW50ID09PSBudWxsLFxuICAgICAgICB9KSArIChleHRyYUNsYXNzZXMgPyAnICcgKyBleHRyYUNsYXNzZXMgOiAnJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wb25lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyl9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nQ29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMuc3RhdGUuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc2VzKHRoaXMuc3RhdGUuY29tcG9uZW50LnByb3BzICYmIHRoaXMuc3RhdGUuY29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IHRoaXMucHJvcHMuaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIHV0aWxpdHkgY29tcG9uZW50IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zLCBwb3NzaWJseSB2YXJ5aW5nIGluIERPTSBsYXlvdXQvc2l6ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQYWdpbmF0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbnRyb2xzID0ge1xuICAgICAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICAgICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgICAgIE5FWFQ6ICdORVhUJyxcbiAgICAgICAgTEFTVDogJ0xBU1QnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvbnMgPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQk9USDogJ0JPVEgnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGN1c3RvbUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgICAgIGluaXRpYWxQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZUluaXRpYWxQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLmluaXRpYWxQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLmluaXRpYWxQYWdlIDwgMSB8fCBwcm9wcy5pbml0aWFsUGFnZSA+IG51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgaW5pdGlhbFBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXRlbUxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuZXh0UGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcblxuICAgICAgICBudW1JdGVtc1BlclBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlTnVtSXRlbXNQZXJQYWdlKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBudW1QYWdlVG9nZ2xlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucG9zaXRpb25zKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICAgICAgc2hvd0p1bXBUb0ZpcnN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93UGFnaW5hdGlvblN0YXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHRvdGFsSXRlbXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQYWdpbmF0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdldEl0ZW06IG5vb3AsXG4gICAgICAgIGhpZGVQYWdlcklmTm90TmVlZGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1Ub0pTWENvbnZlcnRlckZ1bmM6IChkYXRhKSA9PiBkYXRhLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0aW9uLnBvc2l0aW9ucy5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gKGkpID0+IHtcbiAgICAgICAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBDYW5ub3QgcGFnZSB0byBpbnZhbGlkIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChpKSxcbiAgICAgICAgICAgIHRhcmdldEluZGV4OiBpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UoKTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy50b3RhbFBhZ2VzKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCB0b3RhbFBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpc0Z1bmN0aW9uKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydFRvSlNYRnVuYz17dGhpcy5wcm9wcy5pdGVtVG9KU1hDb252ZXJ0ZXJGdW5jfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DYXBpdGFsaXplZCA9IHBvc2l0aW9uTG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXIuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgc2VnbWVudGVkQ29udHJvbCR7cG9zaXRpb25DYXBpdGFsaXplZH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcGFnaW5hdGlvbi1jb250cm9scy0ke3Bvc2l0aW9uTG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IFVJUG9ydGFsIGZyb20gJy4uL1VJUG9ydGFsJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuXG5mdW5jdGlvbiB3aXRob3V0KGFycjEsIGFycjIpIHsgcmV0dXJuIGFycjEuZmlsdGVyKChpdGVtKSA9PiBhcnIyLmluZGV4T2YoaXRlbSkgPT09IC0xKTsgfVxuZnVuY3Rpb24gdmFsdWVzKG9iaikgICAgICAgICB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiBvYmpba2V5XSk7IH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBTVEFSVDogJ1NUQVJUJyxcbiAgICAgICAgTUlERExFOiAnTUlERExFJyxcbiAgICAgICAgRU5EOiAnRU5EJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9zaXRpb25WYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnBvc2l0aW9uKVxuXG4gICAgc3RhdGljIHByZXNldCA9IHtcbiAgICAgICAgJ0FCT1ZFJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0JFTE9XJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgfSxcbiAgICAgICAgJ0xFRlQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgICAgICAnUklHSFQnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVzZXRWYWx1ZXMgPSB2YWx1ZXMoVUlQb3BvdmVyLnByZXNldClcblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgYW5jaG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgcHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYW5jaG9yWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjYXJldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIHBvcnRhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJyAvPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtZmlsbCcgZmlsbD0nI0ZGRicgcG9pbnRzPSc2Ljk4MjMwNDQ0IDEuNzUgMTIuNzUgMTAgMS4yNSAxMCcgLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIHBvcnRhbFByb3BzOiB7fSxcbiAgICAgICAgcHJlc2V0OiBVSVBvcG92ZXIucHJlc2V0LkJFTE9XLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogcHJvcHMuYW5jaG9yWEFsaWduICB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBwcm9wcy5zZWxmWEFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogcHJvcHMuc2VsZllBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZllBbGlnbixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvclJlY3QgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5hbmNob3JMZWZ0ID0gYW5jaG9yUmVjdC5sZWZ0O1xuICAgICAgICB0aGlzLmFuY2hvclRvcCA9IGFuY2hvclJlY3QudG9wO1xuICAgICAgICB0aGlzLmFuY2hvckhlaWdodCA9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICB0aGlzLmFuY2hvcldpZHRoID0gYW5jaG9yUmVjdC53aWR0aDtcblxuICAgICAgICB0aGlzLmJvZHlMZWZ0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuICAgICAgICB0aGlzLmJvZHlUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBnZXROZXh0Q2FyZXRYUG9zaXRpb24oYW5jaG9yLCBjYXJldCA9IHRoaXMuJGNhcmV0KSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ24sIGFuY2hvcllBbGlnbiwgc2VsZllBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSAwO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBjaGFuZ2UgdGhlIFggcG9zaXRpb24gd2hlbiB3ZSdyZVxuICAgICAgICAvLyBmdWxseSBhYm92ZSBvciBiZWxvdyB0aGUgYW5jaG9yIGFuZCBzZWxmWEFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWEFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCkge1xuICAgICAgICAgICAgICAgIG5leHRYICs9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRZID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBZIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIGFuY2hvciAoc3RhcnQsZW5kIHwgZW5kLHN0YXJ0KVxuICAgICAgICAvLyBzZWxmWUFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWUFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuYW5jaG9ySGVpZ2h0IC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFggPSB0aGlzLmFuY2hvckxlZnQgKyB0aGlzLmJvZHlMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc2VsZlhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRYIC09IGRpYWxvZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLmRpYWxvZy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gdGhpcy5hbmNob3JUb3AgKyB0aGlzLmJvZHlUb3A7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7Li4udGhpcy5zdGF0ZX07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgeE1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGNvbnN0IHlNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcblxuICAgICAgICBpZiAoeCArIHdpZHRoID4geE1heCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSArIGhlaWdodCA+IHlNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgYmVsb3dcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIC8vIGlmIGxlZnQvcmlnaHRcbiAgICAgICAgICAgIGlmICggICAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkQpXG4gICAgICAgICAgICAgICAgfHwgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZWN0aW9ucztcbiAgICB9XG5cbiAgICBhcHBseVRyYW5zbGF0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3ApIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgICAgIG5vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWRBbGlnbm1lbnRDaGFuZ2UobmV4dEFsaWdubWVudCwgY3VycmVudEFsaWdubWVudCA9IHRoaXMuc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICAgIG5leHRBbGlnbm1lbnQuYW5jaG9yWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvclhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5hbmNob3JZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWUFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZlhBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZZQWxpZ247XG4gICAgfVxuXG4gICAgYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICAgdGhpcy5wcm9wcy5hbmNob3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5wcm9wcy5hbmNob3IpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcik7XG5cbiAgICAgICAgY29uc3QgZHggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbihhbmNob3IpKTtcbiAgICAgICAgY29uc3QgZHkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IpKTtcblxuICAgICAgICBjb25zdCBhbGlnbm1lbnRDb3JyZWN0aW9uID0gdGhpcy5nZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyhkeCwgZHkpO1xuXG4gICAgICAgIGlmIChhbGlnbm1lbnRDb3JyZWN0aW9uICYmIHRoaXMuZGlkQWxpZ25tZW50Q2hhbmdlKGFsaWdubWVudENvcnJlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShhbGlnbm1lbnRDb3JyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy5kaWFsb2cuJHdyYXBwZXIsIGR4LCBkeSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHsgdGhpcy5hbGlnbigpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFsaWduLCB0cnVlKTsgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge2dldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ6IGdldEZyYWcsIHByb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gKHRoaXMuZGlhbG9nID0gaW5zdGFuY2UpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3Zlci1jYXJldCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goJ3VpLXBvcG92ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteS0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi14LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgPC9VSVBvcnRhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIHVub3BpbmlvbmF0ZWQgcHJvZ3Jlc3MgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgZm9yIGEgdmFyaWV0eSBvZiBzaGFwZXMgYW5kIGVmZmVjdHMuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcm9ncmVzczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzcy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiB7fSxcbiAgICAgICAgdHdlZW5Qcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5jYW5jZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdjYW5jZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWNhbmNlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdwcm9ncmVzcydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWluZGV0ZXJtaW5hdGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcm9ncmVzcyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLnByb2dyZXNzUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnR3ZWVuUHJvcGVydHldOiB0aGlzLnByb3BzLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3MuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUHJvZ3Jlc3MoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNhbmNlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBIaWRlIGNvbnRlbnQgdW50aWwgaXQncyBuZWVkZWQuXG4gKiBAY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBhY2Nlc3NpYmxlIHJhZGlvIGZvcm0gY29udHJvbC5cbiAqIEBjbGFzcyBVSVJhZGlvXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlSYWRpbyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgbGFiZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBvblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVJhZGlvLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgb25TZWxlY3RlZDogbm9vcCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIHV1aWQgPSB1dWlkKClcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RlZChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgIHR5cGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpbyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1zZWxlY3RlZCc6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17U3RyaW5nKHRoaXMucHJvcHMuc2VsZWN0ZWQpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlSYWRpby5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKHRlc3QpID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgbW91bnRlZCA9IGZhbHNlXG5cbiAgICB1cGRhdGVJbnB1dFN0YXRlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSwgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoZXNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlID0gdGhpcy5yZWZzLm1hdGNoZXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZVlFbmQgPSBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKyBtYXRjaGVzTm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGUgPSB0aGlzLnJlZnNbYG1hdGNoXyQke21hdGNoSW5kZXh9YF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZU3RhcnQgPSBtYXRjaE5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWUVuZCA9IG1hdGNoTm9kZVlTdGFydCArIG1hdGNoTm9kZS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGJyaW5nIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChtYXRjaE5vZGVZRW5kID49IG1hdGNoZXNOb2RlWUVuZCkgeyAvLyBiZWxvd1xuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArPSBtYXRjaE5vZGVZRW5kIC0gbWF0Y2hlc05vZGVZRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaE5vZGVZU3RhcnQgPD0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wKSB7IC8vIGFib3ZlXG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wID0gbWF0Y2hOb2RlWVN0YXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaEluZGV4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkXG5cbiAgICBzZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5pbnB1dC5nZXRWYWx1ZSgpXG5cbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSB1cGNvbWluZyByZW5kZXIgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBieSBgc2V0VmFsdWVgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucmVzZXRNYXRjaGVzLCAwKTtcbiAgICB9XG5cbiAgICBtYXJrRnV6enlNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3QgZnJhZ3MgPSBlbnRpdHlDb250ZW50LnNwbGl0KG5ldyBSZWdFeHAoJygnICsgZXNjYXBlcihpbnB1dCkgKyAnKScsICdpZycpKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJUZXh0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZnJhZ3MubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChmcmFnc1tpXS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVXNlclRleHQpIHtcbiAgICAgICAgICAgICAgICBmcmFnc1tpXSA9IDxtYXJrIGtleT17aX0gY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZnJhZ3NbaV19PC9tYXJrPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFncztcbiAgICB9XG5cbiAgICBtYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpbmRleFN0YXJ0ID0gZW50aXR5Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKTtcbiAgICAgICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgc2Vla1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgPHNwYW4ga2V5PScwJz57ZW50aXR5Q29udGVudC5zbGljZSgwLCBpbmRleFN0YXJ0KX08L3NwYW4+LFxuICAgICAgICAgICAgPG1hcmsga2V5PScxJyBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKX08L21hcms+LFxuICAgICAgICAgICAgPHNwYW4ga2V5PScyJz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleEVuZCl9PC9zcGFuPixcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRNYXJraW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXJrZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hcmtlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hcmtpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBnZXRGdXp6eU1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBmaW5kSW5kZXhlcyhyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcyh1c2VyVGV4dCwgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHRzLCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWF0Y2hlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hdGNoZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBubyBgcHJvcHMuYWxnb3JpdGhtLm1hdGNoZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hdGNoaW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWF0Y2hpbmdGdW5jdGlvbigpKC4uLmFyZ3MpXG5cbiAgICBjb21wdXRlTWF0Y2hlcyhwcm92aWRlZEVudGl0aWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50aXRpZXMgPSBwcm92aWRlZEVudGl0aWVzIHx8IHByb3BzLmVudGl0aWVzO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5pbnB1dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0nYXJpYSdcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVySGludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGludCkge1xuICAgICAgICAgICAgY29uc3QgdXNlclRleHQgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oaW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLWhpbnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJz5cbiAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NlZH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJNYXRjaGVzKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbWF0Y2hlcydcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgZmlyc3QgPSAoYXJyYXkpID0+IGFycmF5WzBdO1xuY29uc3QgbGFzdCA9IChhcnJheSkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBoYW5kbGVOZXdTZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB0b2tlbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVG9rZW5pemVkSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5DbG9zZUNvbXBvbmVudDogKDxkaXY+WDwvZGl2PiksXG4gICAgICAgIHRva2VuQ2xvc2VWaXNpYmxlOiB0cnVlLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyA9IHByZXZQcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkSW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmxlbmd0aCA+IHByZXZQcm9wcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAgIHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzICE9PSBjdXJyZW50U2VsZWN0ZWRJbmRleGVzXG4gICAgICAgICAgICAmJiBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKCAgIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgIHx8IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF0gIT09IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzWzBdIC8qIG11bHRpIHNlbGVjdGlvbiwgbGVmdHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKSAhPT0gbGFzdChwcmV2aW91c1NlbGVjdGVkSW5kZXhlcykgLyogbXVsdGkgc2VsZWN0aW9uLCByaWdodHdhcmQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzW2B0b2tlbl8ke2xhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcyl9YF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZzW2B0b2tlbl8ke2N1cnJlbnRTZWxlY3RlZEluZGV4ZXNbMF19YF0uZm9jdXMoKTtcbiAgICAgICAgfSAvLyBtb3ZlIGZvY3VzXG4gICAgfVxuXG4gICAgLy8gcGFzc3Rocm91Z2hzIHRvIFVJVHlwZWFoZWFkSW5wdXQgaW5zdGFuY2UgbWV0aG9kc1xuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRJbnB1dE5vZGUoKVxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KClcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0VmFsdWUoKVxuICAgIHNlbGVjdCA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KClcbiAgICBzZXRWYWx1ZSA9ICh2YWx1ZSkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcigoaWR4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAzNzogICAgLy8gbGVmdCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c1Rva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzk6ICAgIC8vIHJpZ2h0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6ICAgICAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2NTogICAgLy8gbGV0dGVyIFwiYVwiXG4gICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIGhhY2t5LCBidXQgdGhlIG9ubHkgd2F5IHVubGVzcyB3ZSBtb3ZlIHNlbGVjdGlvbiBtYW5hZ2VtZW50IGludGVybmFsIGFnYWluXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24odGhpcy5wcm9wcy50b2tlbnMpO1xuICAgICAgICAgICAgfSAvLyBcImNtZFwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5DbG9zZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2tlbkNsb3NlQ2xpY2suYmluZCh0aGlzLCBpbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkLmluZGV4T2YoaW5kZXgpICE9PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVUb2tlbktleURvd24uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VuQ2xvc2UoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb2tlbml6ZWRJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRva2VucygpfVxuXG4gICAgICAgICAgICAgICAgPFVJVHlwZWFoZWFkSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHRoaXMucHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0eXBlYWhlYWQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVJbnB1dENsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkVudGl0eVNlbGVjdGVkPXt0aGlzLmFkZH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZGlzcGxheXMgcHJvdmlkZWQgdGV4dCBvbiBob3Zlci5cbiAqIEBjbGFzcyBVSVRvb2x0aXBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgICAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICAgICAgQkVGT1JFOiAnQkVGT1JFJyxcbiAgICAgICAgQUZURVI6ICdBRlRFUicsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVRvb2x0aXAucG9zaXRpb24pKSxcbiAgICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb29sdGlwLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBVSVRvb2x0aXAucG9zaXRpb24uQUJPVkUsXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb259ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9vbHRpcC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWFib3ZlJzogcG9zaXRpb24gPT09IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYmVsb3cnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFTE9XLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWZvcmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkJFRk9SRSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWZ0ZXInOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFGVEVSLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGRhdGEtdG9vbHRpcD17dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCB0aGlzLnByb3BzLnRleHR9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUFycm93S2V5TmF2aWdhdGlvbn0gZnJvbSAnLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlCdXR0b259IGZyb20gJy4vVUlCdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3h9IGZyb20gJy4vVUlDaGVja2JveCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveEdyb3VwfSBmcm9tICcuL1VJQ2hlY2tib3hHcm91cCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlEaWFsb2d9IGZyb20gJy4vVUlEaWFsb2cnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRml0dGVkVGV4dH0gZnJvbSAnLi9VSUZpdHRlZFRleHQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJSW1hZ2V9IGZyb20gJy4vVUlJbWFnZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlNb2RhbH0gZnJvbSAnLi9VSU1vZGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBhZ2luYXRpb259IGZyb20gJy4vVUlQYWdpbmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcG92ZXJ9IGZyb20gJy4vVUlQb3BvdmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcnRhbH0gZnJvbSAnLi9VSVBvcnRhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlQcm9ncmVzc30gZnJvbSAnLi9VSVByb2dyZXNzJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZX0gZnJvbSAnLi9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlSYWRpb30gZnJvbSAnLi9VSVJhZGlvJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVNlZ21lbnRlZENvbnRyb2x9IGZyb20gJy4vVUlTZWdtZW50ZWRDb250cm9sJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVRva2VuaXplZElucHV0fSBmcm9tICcuL1VJVG9rZW5pemVkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVGV4dHVhbElucHV0fSBmcm9tICcuL1VJVGV4dHVhbElucHV0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVR5cGVhaGVhZElucHV0fSBmcm9tICcuL1VJVHlwZWFoZWFkSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9vbHRpcH0gZnJvbSAnLi9VSVRvb2x0aXAnO1xuXG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub3RpZnkgZnJvbSAnLi9VSVV0aWxzL25vdGlmeSc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcGVydHkgZnJvbSAnLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCB1dWlkIGZyb20gJy4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGNvbnN0IFVJVXRpbHMgPSB7ZXh0cmFjdENoaWxkUHJvcHMsIG5vdGlmeSwgdHJhbnNmb3JtUHJvcGVydHksIHV1aWR9O1xuIl0sIm5hbWVzIjpbInRlc3QiLCJvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3QiLCJzb3VyY2UiLCJvbWl0dGVkS2V5cyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJyZWxvY2F0ZUFjY2VwdGVkS2V5cyIsImhhc2giLCJrZXkiLCJpbmRleE9mIiwiVUlBcnJvd0tleU5hdmlnYXRpb24iLCJzdGF0ZSIsInByb3BzIiwiZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgiLCJoYW5kbGVLZXlEb3duIiwiZXZlbnQiLCJtb2RlIiwiVkVSVElDQUwiLCJCT1RIIiwicHJldmVudERlZmF1bHQiLCJtb3ZlRm9jdXMiLCJIT1JJWk9OVEFMIiwiaXNGdW5jdGlvbiIsIm9uS2V5RG93biIsImhhbmRsZUZvY3VzIiwidGFyZ2V0IiwiaGFzQXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNoaWxkIiwiUmVhY3QiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiYWN0aXZlQ2hpbGRJbmRleCIsIm9uRm9jdXMiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzZXRGb2N1cyIsIm5leHRQcm9wcyIsIm51bUNoaWxkcmVuIiwiY291bnQiLCJjaGlsZE5vZGUiLCJyZWZzIiwid3JhcHBlciIsIkhUTUxFbGVtZW50IiwiZmluZERPTU5vZGUiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIk5vZGUiLCJET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkciLCJmb2N1cyIsImRlbHRhIiwibmV4dEluZGV4IiwibWFwIiwiY2xvbmVFbGVtZW50IiwidGFiSW5kZXgiLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwiY29tcG9uZW50Iiwib21pdCIsImludGVybmFsS2V5cyIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJmdW5jIiwibnVtYmVyIiwib25lT2YiLCJkZWZhdWx0UHJvcHMiLCJub29wIiwiVUlCdXR0b24iLCJoYW5kbGVDbGljayIsImRpc2FibGVkIiwidG9nZ2xlU3RhdGUiLCJvbkNsaWNrIiwicHJlc3NlZCIsImN4IiwiY2xhc3NOYW1lIiwibm9kZSIsImJvb2wiLCJ1dWlkIiwicmVwbGFjZSIsImEiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJVSUNoZWNrYm94IiwiaWQiLCJoYW5kbGVDaGFuZ2UiLCJpbnB1dFByb3BzIiwiY2hlY2tlZCIsIm5hbWUiLCJvbkNoYW5nZSIsImlucHV0IiwiaW5kZXRlcm1pbmF0ZSIsInNldEluZGV0ZXJtaW5hdGUiLCJTdHJpbmciLCJnZXRBcmlhU3RhdGUiLCJsYWJlbCIsImxhYmVsUHJvcHMiLCJyZW5kZXJJbnB1dCIsInJlbmRlckxhYmVsIiwic2hhcGUiLCJvYmplY3QiLCJVSUNoZWNrYm94R3JvdXAiLCJpdGVtcyIsImV2ZXJ5IiwiaXRlbSIsInNvbWUiLCJzZWxlY3RBbGwiLCJhbGxDaGVja2VkIiwiYWxsSXRlbXNDaGVja2VkIiwic2VsZWN0QWxsUHJvcHMiLCJhbnlJdGVtc0NoZWNrZWQiLCJvbkFsbENoZWNrZWQiLCJvbkFsbFVuY2hlY2tlZCIsIm9uQ2hpbGRDaGVja2VkIiwib25DaGlsZFVuY2hlY2tlZCIsInRvQmVSZW5kZXJlZCIsInJlbmRlckNoZWNrYm94ZXMiLCJzZWxlY3RBbGxQb3NpdGlvbiIsIkNvbnN0YW50cyIsIlNFTEVDVF9BTExfQkVGT1JFIiwidW5zaGlmdCIsInJlbmRlclNlbGVjdEFsbCIsIlNFTEVDVF9BTExfQUZURVIiLCJwdXNoIiwicmVuZGVyQ2hpbGRyZW4iLCJhcnJheU9mIiwiaXNSZXF1aXJlZCIsIlBPUlRBTF9EQVRBX0FUVFJJQlVURSIsIlVJUG9ydGFsIiwiJHBvcnRhbCIsIiRwYXNzZW5nZXIiLCJkZXN0aW5hdGlvbiIsImFwcGVuZENoaWxkIiwicmVuZGVyUG9ydGFsbGVkQ29udGVudCIsImlzVmFsaWRFbGVtZW50IiwicG9ydGFsSWQiLCJyZW5kZXIiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwicmVtb3ZlQ2hpbGQiLCJDb21wb25lbnQiLCJpbnN0YW5jZU9mIiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJVSURpYWxvZyIsIm1vdW50ZWQiLCJ1dWlkSGVhZGVyIiwidXVpZEJvZHkiLCJuYXRpdmVFdmVudCIsImNhcHR1cmVGb2N1cyIsImNsb3NlT25PdXRzaWRlRm9jdXMiLCJpc1BhcnRPZkRpYWxvZyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJvbkNsb3NlIiwicHJldmlvdXMiLCJleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IiwicmVsYXRlZFRhcmdldCIsImNsb3NlT25Fc2NLZXkiLCJoYW5kbGVPdXRzaWRlQ2xpY2siLCJjbG9zZU9uT3V0c2lkZUNsaWNrIiwiaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsIiwiY2xvc2VPbk91dHNpZGVTY3JvbGwiLCJyb290cyIsIiR3cmFwcGVyIiwiY29uY2F0IiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb20iLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnQiLCJub2RlVHlwZSIsIkVMRU1FTlRfTk9ERSIsInBhcmVudE5vZGUiLCJjb250YWlucyIsImFkZEV2ZW50TGlzdGVuZXIiLCIkZGlhbG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJvZHlQcm9wcyIsImZvb3RlciIsImZvb3RlclByb3BzIiwiaGVhZGVyIiwiaGVhZGVyUHJvcHMiLCJ3cmFwcGVyUHJvcHMiLCJyZW5kZXJGb2N1c0JvdW5kYXJ5IiwiYmVmb3JlIiwicmVuZGVySGVhZGVyIiwicmVuZGVyQm9keSIsInJlbmRlckZvb3RlciIsImFmdGVyIiwiaW5zdGFuY2VzIiwidG9JIiwic3RyaW5nTnVtYmVyIiwicmVzY2FsZSIsImluc3RhbmNlIiwiY29udGFpbmVyQm94IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJ3aWR0aCIsImJveFNpemluZyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJvcHRpbWl6ZUZvckhlaWdodCIsImZsb29yIiwib2Zmc2V0SGVpZ2h0Iiwib3B0aW1pemVGb3JXaWR0aCIsIm9mZnNldFdpZHRoIiwic3R5bGUiLCJtaW4iLCJtYXhGb250U2l6ZSIsImhhbmRsZVdpbmRvd1Jlc2l6ZSIsImZvckVhY2giLCJyZWdpc3Rlckluc3RhbmNlIiwibGVuZ3RoIiwidW5yZWdpc3Rlckluc3RhbmNlIiwic3BsaWNlIiwiVUlGaXR0ZWRUZXh0IiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiVUlJbWFnZSIsInN0YXR1cyIsIkxPQURJTkciLCJzcmMiLCJyZXNldFByZWxvYWRlciIsInByZWxvYWQiLCJsb2FkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwiTE9BREVEIiwiRVJST1IiLCJkaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZVByb3BzIiwiYWx0Iiwic3RhdHVzUHJvcHMiLCJyZW5kZXJJbWFnZSIsInJlbmRlclN0YXR1cyIsImV4dHJhY3RDaGlsZFByb3BzIiwicGFyZW50UHJvcHMiLCJjaGlsZFByb3BUeXBlcyIsImNoaWxkUHJvcHMiLCJVSU1vZGFsIiwicG9ydGFsUHJvcHMiLCIkbW9kYWwiLCJtYXNrUHJvcHMiLCJtb2RhbFByb3BzIiwiVUlTZWdtZW50ZWRDb250cm9sIiwiYWN0aXZlSXRlbUluZGV4IiwiaW5kZXhPZk9wdGlvbkluRm9jdXMiLCJnZXRQcmV2aW91c09wdGlvbkluZGV4IiwiZ2V0TmV4dE9wdGlvbkluZGV4IiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb25zIiwidmFsdWUiLCJvcHRpb24iLCJzZWxlY3RlZCIsImN1cnJlbnRPcHRpb25JbmRleCIsIm5leHQiLCJvbkJsdXIiLCJvbk9wdGlvblNlbGVjdGVkIiwiZGVmaW5pdGlvbiIsImludGVybmFsQ2hpbGRLZXlzIiwiaGFuZGxlT3B0aW9uQmx1ciIsImJpbmQiLCJoYW5kbGVPcHRpb25Gb2N1cyIsImNvbnRlbnQiLCJyZW5kZXJPcHRpb25zIiwidmFsaWRhdGVPcHRpb25zIiwiRXJyb3IiLCJtaXNzaW5nU2VsZWN0ZWQiLCJzZWVuU2VsZWN0ZWQiLCJtdWx0aXBsZVNlbGVjdGVkIiwiSXRlbSIsImRhdGEiLCJQcm9taXNlIiwiY2xvc3VyZVByb21pc2UiLCJ0aGVuIiwicmVzb2x2ZWRQYXlsb2FkIiwiY3VycmVudFByb3BzIiwiY29udmVydFRvSlNYRnVuYyIsImNvbnZlcnREYXRhVG9KU1hPcldhaXQiLCJleHRyYUNsYXNzZXMiLCJldmVuIiwiZ2V0Q2xhc3NlcyIsImxvYWRpbmdDb250ZW50IiwiVUlQYWdpbmF0aW9uIiwiaW5pdGlhbFBhZ2UiLCJudW1JdGVtc1BlclBhZ2UiLCJjdXJyZW50UGFnZSIsImdldFBhZ2VGb3JJbmRleCIsIml0ZW1zUGVyUGFnZSIsImNlaWwiLCJ0b3RhbFBhZ2VzIiwidG90YWxJdGVtcyIsImZpcnN0VmlzaWJsZUl0ZW1JbmRleCIsInBhZ2VUb0luZGV4IiwiaSIsIm5leHRUYXJnZXRJbmRleCIsImNvbnRyb2xzIiwiRklSU1QiLCJQUkVWSU9VUyIsIk5FWFQiLCJMQVNUIiwiaXRlbV8wIiwib2xkUHJvcHMiLCJpZGVudGlmaWVyIiwidGFyZ2V0SW5kZXgiLCJudW1QYWdlVG9nZ2xlcyIsInN0YXJ0UGFnZSIsImVuZFBhZ2UiLCJzaG93UGFnaW5hdGlvblN0YXRlIiwic2hvd0p1bXBUb0ZpcnN0IiwianVtcFRvRmlyc3RDb250cm9sQ29udGVudCIsInByZXZpb3VzUGFnZUNvbnRyb2xDb250ZW50IiwibmV4dFBhZ2VDb250cm9sQ29udGVudCIsInNob3dKdW1wVG9MYXN0IiwianVtcFRvTGFzdENvbnRyb2xDb250ZW50IiwiY3VzdG9tQ29udHJvbENvbnRlbnQiLCJnZW5lcmF0ZWRJdGVtcyIsImZpcnN0SXRlbUluZGV4IiwibGFzdEl0ZW1JbmRleCIsImdldEl0ZW0iLCJsaXN0V3JhcHBlclByb3BzIiwiaW5kZXhPZmZzZXQiLCJnZW5lcmF0ZUl0ZW1zIiwiaXRlbVRvSlNYQ29udmVydGVyRnVuYyIsIml0ZW1Mb2FkaW5nQ29udGVudCIsInBvc2l0aW9uIiwiaGlkZVBhZ2VySWZOb3ROZWVkZWQiLCJ0b2dnbGVXcmFwcGVyUHJvcHMiLCJwb3NpdGlvbkxvd2VyIiwidG9Mb3dlckNhc2UiLCJwb3NpdGlvbkNhcGl0YWxpemVkIiwidG9VcHBlckNhc2UiLCJjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucyIsInBvc2l0aW9ucyIsIkFCT1ZFIiwicmVuZGVyQ29udHJvbHMiLCJyZW5kZXJJdGVtcyIsIkJFTE9XIiwicmVuZGVyVmlldyIsInZhbGlkYXRlSW5pdGlhbFBhZ2UiLCJpc0ludGVnZXIiLCJudW1iZXJPZlBhZ2VzIiwidmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UiLCJkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSIsImxlbiIsImRvY3VtZW50RWxlbWVudCIsIndpdGhvdXQiLCJhcnIxIiwiYXJyMiIsImZpbHRlciIsInZhbHVlcyIsIm9iaiIsIlVJUG9wb3ZlciIsImFsaWduIiwiYW5jaG9yIiwiY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5IiwiZHgiLCJyb3VuZCIsImdldE5leHREaWFsb2dYUG9zaXRpb24iLCJkeSIsImdldE5leHREaWFsb2dZUG9zaXRpb24iLCJhbGlnbm1lbnRDb3JyZWN0aW9uIiwiZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmciLCJkaWRBbGlnbm1lbnRDaGFuZ2UiLCIkY2FyZXQiLCJsZWZ0IiwiZ2V0TmV4dENhcmV0WFBvc2l0aW9uIiwidG9wIiwiZ2V0TmV4dENhcmV0WVBvc2l0aW9uIiwiYXBwbHlUcmFuc2xhdGlvbiIsImRpYWxvZyIsImFuY2hvclhBbGlnbiIsInByZXNldCIsImFuY2hvcllBbGlnbiIsInNlbGZYQWxpZ24iLCJzZWxmWUFsaWduIiwiYW5jaG9yUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFuY2hvckxlZnQiLCJhbmNob3JUb3AiLCJhbmNob3JIZWlnaHQiLCJhbmNob3JXaWR0aCIsImJvZHlMZWZ0Iiwic2Nyb2xsTGVmdCIsImJvZHlUb3AiLCJzY3JvbGxUb3AiLCJjYXJldCIsIm5leHRYIiwiTUlERExFIiwiU1RBUlQiLCJFTkQiLCJjbGllbnRXaWR0aCIsIm5leHRZIiwiY2xpZW50SGVpZ2h0IiwiYW5jaG9yWSIsIngiLCJ5IiwiYXV0b1JlcG9zaXRpb24iLCJjb3JyZWN0aW9ucyIsInhNYXgiLCJzY3JvbGxXaWR0aCIsInlNYXgiLCJzY3JvbGxIZWlnaHQiLCJ0cmFuc2Zvcm1Qcm9wIiwibmV4dEFsaWdubWVudCIsImN1cnJlbnRBbGlnbm1lbnQiLCJjb25zdGFudCIsImdldEZyYWciLCJnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50IiwiY2FyZXRDb21wb25lbnQiLCJwb3NpdGlvblZhbHVlcyIsInByZXNldFZhbHVlcyIsIlVJUHJvZ3Jlc3MiLCJvbkNhbmNlbCIsImNhbmNlbFByb3BzIiwicHJvZ3Jlc3NQcm9wcyIsInByb2dyZXNzIiwidHdlZW5Qcm9wZXJ0eSIsInJlbmRlclByb2dyZXNzIiwicmVuZGVyQ2FuY2VsIiwiVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUiLCJleHBhbmRlZCIsImRpc3BhdGNoQ2FsbGJhY2siLCJ0b2dnbGVQcm9wcyIsIm5ld1Byb3BzIiwidGVhc2VyRXhwYW5kZWQiLCJ0ZWFzZXIiLCJyZW5kZXJDb250ZW50IiwiVUlSYWRpbyIsIm9uU2VsZWN0ZWQiLCJVSVRleHR1YWxJbnB1dCIsImlzU3RyaW5nIiwic2V0SW5wdXRWYWx1ZSIsImdldFZhbHVlIiwiZmllbGQiLCJoYW5kbGVCbHVyIiwiaXNGb2N1c2VkIiwiaXNDb250cm9sbGVkIiwiZGVmYXVsdFZhbHVlIiwibmV4dFZhbHVlIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImlzTm9uRW1wdHkiLCJzaG91bGRTaG93UGxhY2Vob2xkZXIiLCJoaWRlUGxhY2Vob2xkZXJPbkZvY3VzIiwicGxhY2Vob2xkZXIiLCJnZXRQbGFjZWhvbGRlclRleHQiLCJCb29sZWFuIiwicmVuZGVyUGxhY2Vob2xkZXIiLCJVSVR5cGVhaGVhZElucHV0IiwiY29tcHV0ZU1hdGNoZXMiLCJzZWxlY3RlZEVudGl0eUluZGV4Iiwib25FbnRpdHlIaWdobGlnaHRlZCIsImVudGl0aWVzIiwidXBkYXRlSW5wdXRTdGF0ZSIsImVudGl0eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXMiLCJzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSIsInRvdGFsTWF0Y2hlcyIsIm1hdGNoSW5kZXgiLCJtYXRjaGVzTm9kZSIsIm1hdGNoZXNOb2RlWUVuZCIsIm1hdGNoTm9kZSIsIm1hdGNoTm9kZVlTdGFydCIsIm9mZnNldFRvcCIsIm1hdGNoTm9kZVlFbmQiLCJnZXRJbnB1dE5vZGUiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImVudGl0eSIsImVudGl0eUNvbnRlbnQiLCJ0ZXh0IiwiZnJhZ3MiLCJzcGxpdCIsIlJlZ0V4cCIsImVzY2FwZXIiLCJub3JtYWxpemVkVXNlclRleHQiLCJ0aHJlc2hvbGQiLCJzZWVrVmFsdWUiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJhbGdvcml0aG0iLCJTVEFSVFNfV0lUSCIsIm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmciLCJtYXJrRnV6enlNYXRjaFN1YnN0cmluZyIsIm1hcmtlciIsIndhcm5lZE1hcmtlciIsIndhcm4iLCJ1c2VyVGV4dCIsIm5vcm1hbGl6ZWQiLCJmaW5kSW5kZXhlcyIsInJlc3VsdCIsInNlZWtNYXRjaCIsInJlc3VsdHMiLCJnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzIiwiZ2V0RnV6enlNYXRjaEluZGV4ZXMiLCJtYXRjaGVyIiwid2FybmVkTWF0Y2hlciIsInByb3ZpZGVkRW50aXRpZXMiLCJjdXJyZW50VmFsdWUiLCJnZXRNYXRjaEluZGV4ZXMiLCJvZmZzY3JlZW5DbGFzcyIsImdldFNlbGVjdGVkRW50aXR5VGV4dCIsImhpbnQiLCJyYXciLCJwcm9jZXNzZWQiLCJoaW50UHJvcHMiLCJtYXRjaFdyYXBwZXJQcm9wcyIsInJlc3QiLCJoYW5kbGVNYXRjaENsaWNrIiwibWFya01hdGNoU3Vic3RyaW5nIiwicmVuZGVyTm90aWZpY2F0aW9uIiwicmVuZGVySGludCIsInJlbmRlck1hdGNoZXMiLCJGVVpaWSIsInJlc2V0TWF0Y2hlcyIsInNlbGVjdCIsInNldFZhbHVlIiwib25FbnRpdHlTZWxlY3RlZCIsImNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24iLCJnZXRNYXJraW5nRnVuY3Rpb24iLCJnZXRNYXRjaGluZ0Z1bmN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiY3Vyc29yQXRFbmRPZklucHV0Iiwic2hpZnRLZXkiLCJzZWxlY3RNYXRjaCIsIm9uQ29tcGxldGUiLCJmaXJzdCIsImFycmF5IiwibGFzdCIsIlVJVG9rZW5pemVkSW5wdXQiLCJ0eXBlYWhlYWQiLCJhZGQiLCJ0b2tlbnMiLCJoYW5kbGVBZGRUb2tlbiIsImhhbmRsZUlucHV0Q2xpY2siLCJjbGVhclNlbGVjdGlvbiIsImhhbmRsZUlucHV0Rm9jdXMiLCJ3aGljaCIsInNlbGVjdFByZXZpb3VzVG9rZW4iLCJzZWxlY3ROZXh0VG9rZW4iLCJ0b2tlbnNTZWxlY3RlZCIsInJlbW92ZSIsIm1ldGFLZXkiLCJfc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24iLCJoYW5kbGVOZXdTZWxlY3Rpb24iLCJwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyIsImN1cnJlbnRTZWxlY3RlZEluZGV4ZXMiLCJpbmRleGVzIiwiaXNBcnJheSIsImlkeCIsImhhbmRsZVJlbW92ZVRva2VucyIsImFwcGVuZCIsInNlbGVjdFRva2VuIiwicHJldmlvdXNUb2tlbiIsInNlbGVjdFRva2VucyIsIm5leHRUb2tlbiIsInRva2VuQ2xvc2VDb21wb25lbnQiLCJ0b2tlbkNsb3NlVmlzaWJsZSIsImhhbmRsZVRva2VuQ2xvc2VDbGljayIsImhhbmRsZVRva2VuS2V5RG93biIsInJlbmRlclRva2VuQ2xvc2UiLCJyZW5kZXJUb2tlbnMiLCJVSVRvb2x0aXAiLCJCRUZPUkUiLCJBRlRFUiIsImVycm9ycyIsIk5vdGlmaWNhdGlvbkFQSSIsImRldGVjdFN1cHBvcnQiLCJOb3RpZmljYXRpb24iLCJ3ZWJraXROb3RpZmljYXRpb25zIiwibmF2aWdhdG9yIiwibW96Tm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdFJlY2VpdmVyIiwiRElTQUJMRUQiLCJjaGVja1Blcm1pc3Npb24iLCJOT1RfQVZBSUxBQkxFIiwicGVybWlzc2lvbiIsIm5vdGlmeSIsImNvbmZpZyIsIkNPTkZJR19NSVNTSU5HIiwiQ09ORklHX1RZUEUiLCJCT0RZX01JU1NJTkciLCJCT0RZX1RZUEUiLCJIRUFERVJfTUlTU0lORyIsIkhFQURFUl9UWVBFIiwiaWNvbiIsIklDT05fVFlQRSIsIk9OQ0xJQ0tfVFlQRSIsInNwYXduV2ViTm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uIiwiZXJyb3IiLCJVSVV0aWxzIiwidHJhbnNmb3JtUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtCQUFlLFVBQUNBLElBQUQ7U0FBVSxPQUFPQSxJQUFQLEtBQWdCLFVBQTFCO0NBQWY7O0FDQUE7Ozs7QUFJQSxBQUFlLFNBQVNDLHdCQUFULENBQWtDQyxNQUFsQyxFQUE0RDtRQUFsQkMsV0FBa0IsdUVBQUosRUFBSTs7V0FDaEVDLE9BQU9DLElBQVAsQ0FBWUgsTUFBWixFQUFvQkksTUFB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
