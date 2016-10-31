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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9vbWl0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvbm9vcC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUJ1dHRvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3V1aWQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlDaGVja2JveC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94R3JvdXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQb3J0YWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlEaWFsb2cvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlGaXR0ZWRUZXh0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJSW1hZ2UvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSU1vZGFsL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNpbnRlZ2VyL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJU2VnbWVudGVkQ29udHJvbC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBhZ2luYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVBvcG92ZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlQcm9ncmVzcy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzaXZlRGlzY2xvc3VyZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVJhZGlvL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzU3RyaW5nL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG4iLCIvKipcbiAqIFJldHVybnMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgd2l0aG91dCB0aGUgZ2l2ZW4ga2V5cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbWl0S2V5c0Zyb21Tb3VyY2VPYmplY3Qoc291cmNlLCBvbWl0dGVkS2V5cyA9IFtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIHJlbG9jYXRlQWNjZXB0ZWRLZXlzKGhhc2gsIGtleSkge1xuICAgICAgICBpZiAob21pdHRlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgaGFzaFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgIEhPUklaT05UQUw6ICdIT1JJWk9OVEFMJyxcbiAgICAgICAgVkVSVElDQUw6ICdWRVJUSUNBTCcsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcblxuICAgICAgICBkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcblxuICAgICAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5WRVJUSUNBTCxcbiAgICAgICAgICAgIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCxcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQXJyb3dLZXlOYXZpZ2F0aW9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogJ2RpdicsXG4gICAgICAgIGRlZmF1bHRBY3RpdmVDaGlsZEluZGV4OiAwLFxuICAgICAgICBtb2RlOiBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkSW5kZXg6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUNoaWxkSW5kZXgsXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggIT09IHByZXZTdGF0ZS5hY3RpdmVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQobmV4dFByb3BzLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChudW1DaGlsZHJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IDB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1za2lwJykpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HID8gLTEgOiAxXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuVkVSVElDQUxcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLm1vZGUgPT09IFVJQXJyb3dLZXlOYXZpZ2F0aW9uLm1vZGUuQk9USCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kZSA9PT0gVUlBcnJvd0tleU5hdmlnYXRpb24ubW9kZS5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5tb2RlID09PSBVSUFycm93S2V5TmF2aWdhdGlvbi5tb2RlLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVtpbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgJ2RhdGEtaW5kZXgnOiBpbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS1za2lwJzogcGFyc2VJbnQoY2hpbGQucHJvcHMudGFiSW5kZXgsIDEwKSA9PT0gLTEgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBBIGR1bW15IGZ1bmN0aW9uIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBDb21tb25seSB1c2VkIHdoZW4gbW9ja2luZyBpbnRlcmZhY2VzLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy9ub29wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgfTtcblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUJ1dHRvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvblByZXNzZWQ6IG5vb3AsXG4gICAgICAgIG9uVW5wcmVzc2VkOiBub29wLFxuICAgIH07XG5cbiAgICB0b2dnbGVTdGF0ZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMucHJvcHMucHJlc3NlZCA/ICdvblVucHJlc3NlZCcgOiAnb25QcmVzc2VkJ10oZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlCdXR0b24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2J1dHRvbidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NhYmxlJzogdHlwZW9mIHRoaXMucHJvcHMucHJlc3NlZCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tcHJlc3NlZCc6IHRoaXMucHJvcHMucHJlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3RoaXMucHJvcHMucHJlc3NlZH1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBCYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyB0aGlzIGltcGxlbWVudGF0aW9ufS5cbiAqIEFkZGVkIGEgcHJlZml4IHNvIHRoZSBnZW5lcmF0ZWQgSUQgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyBhbiBIVE1MIElELlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gYSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleGFtcGxlXG4gKiB1dWlkKCk7IC8vIHVpa2l0LTFmMmNkMjdmLTA3NTQtNDM0NC05ZDIwLTQzNmEyMDFiMmY4MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgcmV0dXJuICd1aWtpdC0nICsgKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3gucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25VbmNoZWNrZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgaWQgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLmlucHV0UHJvcHMsICdpbmRldGVybWluYXRlJyl9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3guaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBhbnlJdGVtc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaW5wdXRQcm9wcy5jaGVja2VkID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCkge1xuICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHRoaXMuYWxsSXRlbXNDaGVja2VkKCk7XG4gICAgICAgICAgICBjb25zdCB7aW5wdXRQcm9wc30gPSB0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3NlbGVjdF9hbGwnXG4gICAgICAgICAgICAgICAgICAgIGtleT0nY2Jfc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAtc2VsZWN0YWxsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogYWxsQ2hlY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6ICFhbGxDaGVja2VkICYmIHRoaXMuYW55SXRlbXNDaGVja2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzICYmIGlucHV0UHJvcHMubmFtZSA/IGlucHV0UHJvcHMubmFtZSA6ICdjYl9zZWxlY3RfYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMubGFiZWwgfHwgJ1NlbGVjdCBBbGwnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrZWQ9e3RoaXMucHJvcHMub25BbGxDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICBvblVuY2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94R3JvdXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBjb25zdCBQT1JUQUxfREFUQV9BVFRSSUJVVEUgPSAnZGF0YS1wb3J0YWwtaWQnO1xuXG4vKipcbiAqIEEgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCBmb3IgdGhlIHJlbmRlcmluZyBvZiBjb21wb25lbnRzIG91dHNpZGUgdGhlIG5vcm1hbCBSZWFjdCB0cmVlLlxuICogT25seSBhY2NlcHRzIGEgc2luZ2xlIHRvcC1sZXZlbCBjaGlsZDsgbmFrZWQgdGV4dCwgZXRjIHdpbGwgYmUgd3JhcHBlZCBpbiBhIDxkaXY+LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLy8gc2luZ2xlIGNoaWxkIG9ubHkgLSBhcnJheXMgbm90IGFsbG93ZWRcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgZGVzdGluYXRpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUG9ydGFsLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5ib2R5LFxuICAgIH1cblxuICAgIGlkID0gdXVpZCgpXG5cbiAgICAvLyB0aGUgPGRpdj4gdGhhdCB0aGUgY2hpbGRyZW4gYXJlIHJlbmRlcmVkIGludG9cbiAgICAkcG9ydGFsID0gbnVsbFxuXG4gICAgLy8gdGhlIHRvcC1sZXZlbCBjaGlsZCByZW5kZXJlZCBpbnRvIHRoZSAkcG9ydGFsXG4gICAgJHBhc3NlbmdlciA9IG51bGw7XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJHBvcnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKHRoaXMuJHBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJQb3J0YWxsZWRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUG9ydGFsbGVkQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiAoPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9ydGFsIElEIGxpbmsgaWYgbmVlZGVkXG4gICAgICAgIHRoaXMuJHBvcnRhbC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZDtcblxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoY2hpbGQsIHRoaXMuJHBvcnRhbCk7XG4gICAgICAgIHRoaXMuJHBhc3NlbmdlciA9IHRoaXMuJHBvcnRhbC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpOyB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcnRhbC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHsuLi57W1BPUlRBTF9EQVRBX0FUVFJJQlVURV06IHRoaXMucHJvcHMucG9ydGFsSWQgfHwgdGhpcy5pZH19IC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHtQT1JUQUxfREFUQV9BVFRSSUJVVEV9IGZyb20gJy4uL1VJUG9ydGFsJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNvbnN0IHRvQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGlhbG9nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWZ0ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBiZWZvcmU6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBib2R5UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNhcHR1cmVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb290ZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBmb290ZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIC8vIGZhbGxiYWNrcyBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgdXVpZEhlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRCb2R5ID0gdXVpZCgpXG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgY29uc3Qgcm9vdHMgPSBbdGhpcy4kd3JhcHBlcl0uY29uY2F0KFxuICAgICAgICAgICAgdG9BcnJheS5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMuJHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChgWyR7UE9SVEFMX0RBVEFfQVRUUklCVVRFfV1gKVxuICAgICAgICAgICAgKS5tYXAoKGRvbSkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tLmdldEF0dHJpYnV0ZShQT1JUQUxfREFUQV9BVFRSSUJVVEUpKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlO1xuXG4gICAgICAgIHJldHVybiByb290cy5zb21lKChkb20pID0+IGRvbS5jb250YWlucyhlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnByb3BzLm9uQ2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMucHJvcHMub25DbG9zZSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkQm9keX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Zm9vdGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmZvb3RlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZm9vdGVyfVxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGVhZGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmhlYWRlclByb3BzLmlkIHx8IHRoaXMudXVpZEhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiR3cmFwcGVyID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYmVmb3JlfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiBpbWFnZSBibG9jayB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgZm9yIGxvYWRpbmcgYW5kIGZhbGxiYWNrIHNjZW5hcmlvcy5cbiAqIEBjbGFzcyBVSUltYWdlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSW1hZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgc3RhdHVzID0ge1xuICAgICAgICBMT0FESU5HOiAnTE9BRElORycsXG4gICAgICAgIExPQURFRDogJ0xPQURFRCcsXG4gICAgICAgIEVSUk9SOiAnRVJST1InLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGlzcGxheUFzQmFja2dyb3VuZEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW1hZ2VQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0YXR1c1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUltYWdlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGltYWdlUHJvcHM6IHt9LFxuICAgICAgICBzdGF0dXNQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLnNyYyAhPT0gdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuTE9BRElOR30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRQcmVsb2FkZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFByZWxvYWRlcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aGlzLmxvYWRlci5vbmxvYWQgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURFRH0pO1xuICAgICAgICB0aGlzLmxvYWRlci5vbmVycm9yID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5FUlJPUn0pO1xuXG4gICAgICAgIHRoaXMubG9hZGVyLnNyYyA9IHRoaXMucHJvcHMuc3JjO1xuICAgIH1cblxuICAgIHJlbmRlckltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNwbGF5QXNCYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbWFnZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke3RoaXMucHJvcHMuc3JjfSlgLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2ltYWdlJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbWFnZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgb25Mb2FkPXtub29wfVxuICAgICAgICAgICAgICAgIG9uRXJyb3I9e25vb3B9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5zdGF0dXNQcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdzdGF0dXMnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2Utc3RhdHVzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRpbmcnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BRElORyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLWxvYWRlZCc6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5MT0FERUQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1lcnJvcic6IHRoaXMuc3RhdGUuc3RhdHVzID09PSBVSUltYWdlLnN0YXR1cy5FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3RhdHVzUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbicgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlJbWFnZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJbWFnZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXR1cygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBwcm9wcyBsaXN0ZWQgaW4gdGhlIHByb3BUeXBlcyBvZiBhIGNoaWxkIGNvbXBvbmVudFxuICogZS5nLiB1c2VkIGluIFVJVHlwZWFoZWFkSW5wdXQgdG8gaWRlbnRpZnkgd2hpY2ggcHJvcHMgYXJlIG1lYW50IGZvciBVSVRleHR1YWxJbnB1dFxuICogQG1vZHVsZSBVSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJlbnRQcm9wcyAgICAgcHJvcHMgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIEBwYXJhbSAge09iamVjdH0gY2hpbGRQcm9wVHlwZXMgIHByb3BUeXBlcyBvZiB0aGUgY2hpbGQgY29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICBwcm9wcyB0byBiZSBzcHJlYWQgYXBwbGllZCB0byBhIGNoaWxkIGNvbXBvbmVudFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3RDaGlsZFByb3BzKHBhcmVudFByb3BzLCBjaGlsZFByb3BUeXBlcykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGlsZFByb3BUeXBlcykucmVkdWNlKChjaGlsZFByb3BzLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGNoaWxkUHJvcHNba2V5XSA9IHBhcmVudFByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGRQcm9wcztcbiAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBVSVBvcnRhbCBmcm9tICcuLi9VSVBvcnRhbCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG4vKipcbiAqIEEgYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNb2RhbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgbWFza1Byb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtb2RhbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBwb3J0YWxQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgICAgIHBvcnRhbFByb3BzOiB7fSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlQb3J0YWwgey4uLnByb3BzLnBvcnRhbFByb3BzfT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLiRtb2RhbCA9IG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubWFza1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLW1hc2snOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tYXNrUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9IC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJRGlhbG9nLnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMubW9kYWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5tb2RhbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9VSURpYWxvZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVUlQb3J0YWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0ludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNJbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNJbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PSB0b0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMy4yKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gIHJldHVybiByZXN1bHQgPT09IHJlc3VsdCA/IChyZW1haW5kZXIgPyByZXN1bHQgLSByZW1haW5kZXIgOiByZXN1bHQpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW50ZWdlcjtcbiIsIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVNlZ21lbnRlZENvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzLm9wdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGF0IGxlYXN0IHR3byBvcHRpb25zLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nU2VsZWN0ZWQgPSBwcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKCdzZWxlY3RlZCcgaW4gb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1pc3NpbmdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHNlbGVjdGVkYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlZW5TZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTZWxlY3RlZCA9IHByb3BzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYHZhbHVlYCBwcm9wIGZvciBlYWNoIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlTZWdtZW50ZWRDb250cm9sLnByb3BUeXBlcylcbiAgICBzdGF0aWMgaW50ZXJuYWxDaGlsZEtleXMgPSBbXG4gICAgICAgICdjb250ZW50JyxcbiAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICBdXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgb25PcHRpb25TZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGwsXG4gICAgfVxuXG4gICAgY3VycmVudFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbJ29wdGlvbl8kJyArIGluZGV4XSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXROZXh0T3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbmV4dCA8IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggPyBuZXh0IDogMDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c09wdGlvbkluZGV4KGN1cnJlbnRPcHRpb25JbmRleCkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBjdXJyZW50T3B0aW9uSW5kZXggLSAxO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cyA8IDAgPyB0aGlzLnByb3BzLm9wdGlvbnMubGVuZ3RoIC0gMSA6IHByZXZpb3VzO1xuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkJsdXIob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cyA9PT0gdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2Yob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbi5vbkJsdXIpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICBvcHRpb24ub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPcHRpb25Gb2N1cyhvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4T2ZPcHRpb25JbkZvY3VzOiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBvcHRpb24ub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleE9mT3B0aW9uSW5Gb2N1cztcblxuICAgICAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmdldFByZXZpb3VzT3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0TmV4dE9wdGlvbkluZGV4KGFjdGl2ZUl0ZW1JbmRleCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2sodGhpcy5wcm9wcy5vcHRpb25zW2FjdGl2ZUl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAoKGRlZmluaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxVSUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChkZWZpbml0aW9uLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxDaGlsZEtleXMpfVxuICAgICAgICAgICAgICAgICAgICByb2xlPSdyYWRpbydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcoZGVmaW5pdGlvbi5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17J29wdGlvbl8kJyArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2RlZmluaXRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sLW9wdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uLXNlbGVjdGVkJzogZGVmaW5pdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkZWZpbml0aW9uLmNsYXNzTmFtZV06ICEhZGVmaW5pdGlvbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17ZGVmaW5pdGlvbi5zZWxlY3RlZCA/ICcwJyA6ICctMSd9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMsIGRlZmluaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcywgZGVmaW5pdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvVUlCdXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlTZWdtZW50ZWRDb250cm9sLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGFyaWEtcm9sZT0ncmFkaW9ncm91cCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXNlZ21lbnRlZC1jb250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcHJvbWlzZXMgYXMgY2hpbGRyZW4gYW5kIGV2ZW50dWFsbHkgZG9pbmcgc29tZXRoaW5nIHdpdGggdGhlaXIgcmVzb2x2ZWQgcGF5bG9hZC5cbiAqL1xuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbnZlcnRUb0pTWEZ1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBldmVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcbiAgICBzdGF0ZSA9IHt9XG5cbiAgICBjb252ZXJ0RGF0YVRvSlNYT3JXYWl0KHByb3BzID0gdGhpcy5wcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudDogbnVsbH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUHJvbWlzZSA9IHByb3BzLmRhdGE7XG5cbiAgICAgICAgICAgIHByb3BzLmRhdGEudGhlbigocmVzb2x2ZWRQYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgY3VycmVudFByb3BzKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBjdXJyZW50UHJvcHMuZGF0YSA9PT0gY2xvc3VyZVByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50UHJvcHMuY29udmVydFRvSlNYRnVuYyhyZXNvbHZlZFBheWxvYWQsIGN1cnJlbnRQcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZS5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LCBub29wKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBwcm9wcy5jb252ZXJ0VG9KU1hGdW5jKHByb3BzLmRhdGEsIHByb3BzLmluZGV4KX0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpICAgICAgICAgICAgICAgICB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdCgpOyB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSAgICAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gdHJ1ZTsgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7IHRoaXMuY29udmVydERhdGFUb0pTWE9yV2FpdChuZXh0UHJvcHMpOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gZmFsc2U7IH1cblxuICAgIGdldENsYXNzZXMoZXh0cmFDbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjeCh7XG4gICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tZXZlbic6IHRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tb2RkJzogIXRoaXMucHJvcHMuZXZlbixcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0tbG9hZGluZyc6IHRoaXMucHJvcHMuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UsXG4gICAgICAgIH0pICsgKGV4dHJhQ2xhc3NlcyA/ICcgJyArIGV4dHJhQ2xhc3NlcyA6ICcnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5vbWl0KHRoaXMucHJvcHMsIEl0ZW0uaW50ZXJuYWxLZXlzKX0gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzZXMoKX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmdDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5zdGF0ZS5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgSXRlbS5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzZXModGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMgJiYgdGhpcy5zdGF0ZS5jb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgdXRpbGl0eSBjb21wb25lbnQgZm9yIHBhZ2luZyB0aGUgZGlzcGxheSBvZiBtYW55IGRhdGEgaXRlbXMsIHBvc3NpYmx5IHZhcnlpbmcgaW4gRE9NIGxheW91dC9zaXplLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBnZXRJdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgaW5pdGlhbFBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlSW5pdGlhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IGZhbHNlLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogKGRhdGEpID0+IGRhdGEsXG4gICAgICAgIGp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQ6ICfCqyBGaXJzdCcsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogJ0xhc3QgwrsnLFxuICAgICAgICBsaXN0V3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgbmV4dFBhZ2VDb250cm9sQ29udGVudDogJ05leHQg4oC6JyxcbiAgICAgICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IDUsXG4gICAgICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRpb24ucG9zaXRpb25zLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sQ29udGVudDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlLFxuICAgICAgICB0YXJnZXRJbmRleDogKHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlID0gKCkgPT4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuICAgIGdldFBhZ2VGb3JJbmRleCA9IChpbmRleCwgaXRlbXNQZXJQYWdlID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpID0+IE1hdGguY2VpbCgoaW5kZXggKyAxKSAvIGl0ZW1zUGVyUGFnZSlcbiAgICB0b3RhbFBhZ2VzID0gKCkgPT4gTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKVxuXG4gICAgZmlyc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4gKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpICogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2VcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAocHJldlN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKCkpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICBjb25zdCBvbGRQcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgLy8gdXNlIHRyYW5zYWN0aW9uYWwgYHNldFN0YXRlKClgIHN5bnRheCB0byBlbnN1cmUgdGhhdCBwZW5kaW5nIHN0YXRlIHVwZGF0ZXMgYXJlIGhvbm9yZWQsXG4gICAgICAgIC8vIGxpa2UgdGhvc2UgZnJvbSBgcGFnZVRvSW5kZXgoKWBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFOiBgcHJvcHNgIGhlcmUgaXMgdGVjaG5pY2FsbHkgdGhlIGBuZXh0UHJvcHNgIHlvdSdkIHJlY2VpdmUgZnJvbSB0aGUgZmlyc3QgY1dSUCBhcmd1bWVudFxuICAgICAgICAgICAgLy8gc28gdGhhdCdzIHdoeSB3ZSdyZSBjYWNoaW5nIGBvbGRQcm9wc2Agb3V0c2lkZSB0aGUgYHNldFN0YXRlYFxuICAgICAgICAgICAgaWYgKHByb3BzLmlkZW50aWZpZXIgIT09IG9sZFByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoc3RhdGUudGFyZ2V0SW5kZXgsIHByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IHN0YXRlLnRhcmdldEluZGV4LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZVRvSW5kZXggPSAoaSkgPT4ge1xuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLnByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYENhbm5vdCBwYWdlIHRvIGludmFsaWQgaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KGkpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IGksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSgpO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLnRvdGFsUGFnZXMoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSAoKGN1cnJlbnRQYWdlIC0gMSkgJSBudW1QYWdlVG9nZ2xlcyk7XG4gICAgICAgIGNvbnN0IGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBudW1QYWdlVG9nZ2xlcyAtIDEsIHRvdGFsUGFnZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dQYWdpbmF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGlzRnVuY3Rpb24odGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvblN0YXRlKGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7Y3VycmVudFBhZ2V9IG9mICR7dG90YWxQYWdlc31gLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLXN0YXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1wcmV2aW91cycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCcsXG4gICAgICAgICAgICAgICAgJ2RhdGEtcGFnZS1udW1iZXInOiBpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSB0aGlzLmN1cnJlbnRQYWdlKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sQ29udGVudCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmN1cnJlbnRQYWdlKCkgPT09IHRvdGFsUGFnZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHV1aWQoKSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWN1c3RvbScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IE1hdGgubWluKHRoaXMucHJvcHMudG90YWxJdGVtcywgZmlyc3RJdGVtSW5kZXggKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSkgLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEl0ZW1JbmRleDsgaSA8PSBsYXN0SXRlbUluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlZEl0ZW1zLnB1c2goe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBuZXh0VGFyZ2V0SW5kZXg7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5GSVJTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuUFJFVklPVVM6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpIC0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTkVYVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCkgKyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGlvbi5jb250cm9scy5MQVNUOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5wcm9wcy50b3RhbEl0ZW1zIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gcGFyc2VJbnQodmFsdWUsIDEwKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KG5leHRUYXJnZXRJbmRleCksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogbmV4dFRhcmdldEluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IGluZGV4T2Zmc2V0ID0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UgKiAodGhpcy5jdXJyZW50UGFnZSgpIC0gMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSUFycm93S2V5TmF2aWdhdGlvblxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1pdGVtcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2VuZXJhdGVJdGVtcygpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0VG9KU1hGdW5jPXt0aGlzLnByb3BzLml0ZW1Ub0pTWENvbnZlcnRlckZ1bmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXhPZmZzZXQgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQ29udGVudD17dGhpcy5wcm9wcy5pdGVtTG9hZGluZ0NvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1VJQXJyb3dLZXlOYXZpZ2F0aW9uPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICggICB0aGlzLnByb3BzLmhpZGVQYWdlcklmTm90TmVlZGVkXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLnRvdGFsSXRlbXMgPD0gdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHM7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXIgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkNhcGl0YWxpemVkID0gcG9zaXRpb25Mb3dlclswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlci5zbGljZSgxKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e2BzZWdtZW50ZWRDb250cm9sJHtwb3NpdGlvbkNhcGl0YWxpemVkfWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW2B1aS1wYWdpbmF0aW9uLWNvbnRyb2xzLSR7cG9zaXRpb25Mb3dlcn1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUGFnaW5hdGlvbi5wb3NpdGlvbnM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0aW9uJz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgKHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5BQk9WRSB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKHBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQkVMT1cgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUGFnaW5hdGlvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiIsIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgVUlQb3J0YWwgZnJvbSAnLi4vVUlQb3J0YWwnO1xuXG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyMSwgYXJyMikgeyByZXR1cm4gYXJyMS5maWx0ZXIoKGl0ZW0pID0+IGFycjIuaW5kZXhPZihpdGVtKSA9PT0gLTEpOyB9XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSAgICAgICAgIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IG9ialtrZXldKTsgfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvblZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucG9zaXRpb24pXG5cbiAgICBzdGF0aWMgcHJlc2V0ID0ge1xuICAgICAgICAnQUJPVkUnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICB9LFxuICAgICAgICAnQkVMT1cnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICB9LFxuICAgICAgICAnTEVGVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgICAgICdSSUdIVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIHByZXNldFZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucHJlc2V0KVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBQcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhbmNob3JZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgcG9ydGFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHByZXNldDogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wcmVzZXRWYWx1ZXMpLFxuICAgICAgICBzZWxmWEFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgc2VsZllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gd2l0aG91dChPYmplY3Qua2V5cyhVSVBvcG92ZXIucHJvcFR5cGVzKSwgT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKSlcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYXV0b1JlcG9zaXRpb246IHRydWUsXG4gICAgICAgIGNhcHR1cmVGb2N1czogZmFsc2UsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiAoXG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9JzAgMCAxNCA5LjUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+XG4gICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1ib3JkZXInIGZpbGw9JyMwMDAnIHBvaW50cz0nNyAwIDE0IDEwIDAgMTAnIC8+XG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1maWxsJyBmaWxsPScjRkZGJyBwb2ludHM9JzYuOTgyMzA0NDQgMS43NSAxMi43NSAxMCAxLjI1IDEwJyAvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICApLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgcG9ydGFsUHJvcHM6IHt9LFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBwcm9wcy5hbmNob3JYQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JYQWxpZ24sXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IHByb3BzLmFuY2hvcllBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IHByb3BzLnNlbGZYQWxpZ24gICAgfHwgcHJvcHMucHJlc2V0LnNlbGZYQWxpZ24sXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50V2lkdGggLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yLCBjYXJldCA9IHRoaXMuJGNhcmV0KSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ24sIGFuY2hvcllBbGlnbiwgc2VsZllBbGlnbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBsZXQgbmV4dFkgPSAwO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBjaGFuZ2UgdGhlIFkgcG9zaXRpb24gd2hlbiB3ZSdyZVxuICAgICAgICAvLyBmdWxseSB0byB0aGUgbGVmdCBvciByaWdodCBvZiB0aGUgYW5jaG9yIChzdGFydCxlbmQgfCBlbmQsc3RhcnQpXG4gICAgICAgIC8vIHNlbGZZQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZZQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy5hbmNob3JIZWlnaHQgLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuZGlhbG9nLiR3cmFwcGVyLmNsaWVudEhlaWdodCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLmRpYWxvZy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuZGlhbG9nLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSB0aGlzLmFuY2hvclRvcCArIHRoaXMuYm9keVRvcDtcblxuICAgICAgICBsZXQgbmV4dFkgPSBhbmNob3JZICsgdGhpcy5hbmNob3JIZWlnaHQ7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5hbmNob3JZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZICsgdGhpcy5hbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHsuLi50aGlzLnN0YXRlfTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmRpYWxvZy4kd3JhcHBlci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kaWFsb2cuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGNhcmV0IGlzIGluaXRpYWxseSBwb3NpdGlvbmVkIGF0IDAsMCBpbnNpZGUgdGhlIGRpYWxvZ1xuICAgICAgICAvLyB3aGljaCBpcyBhbHJlYWR5IHBvc2l0aW9uZWQgYXQgdGhlIGFuY2hvciwgc28gd2UganVzdCBuZWVkIHRvXG4gICAgICAgIC8vIG1ha2Ugc21hbGwgYWRqdXN0bWVudHMgYXMgbmVjZXNzYXJ5IHRvIGxpbmUgdXAgdGhlIGNhcmV0XG4gICAgICAgIC8vIHdpdGggdGhlIHZpc3VhbCBjZW50ZXIgb2YgdGhlIGFuY2hvclxuXG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuJGNhcmV0LCBjeCwgMCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLmRpYWxvZy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkgeyB0aGlzLmFsaWduKCk7IH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpOyB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7Z2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDogZ2V0RnJhZywgcHJvcHMsIHN0YXRlfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVBvcnRhbCB7Li4ucHJvcHMucG9ydGFsUHJvcHN9PlxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlQb3BvdmVyLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17KGluc3RhbmNlKSA9PiAodGhpcy5kaWFsb2cgPSBpbnN0YW5jZSl9XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZT17XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQocHJvcHMuY2FyZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IChub2RlKSA9PiAodGhpcy4kY2FyZXQgPSBub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KCd1aS1wb3BvdmVyLWNhcmV0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jYXJldENvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMud3JhcHBlclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCgndWktcG9wb3ZlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8L1VJUG9ydGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gdW5vcGluaW9uYXRlZCBwcm9ncmVzcyBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBmb3IgYSB2YXJpZXR5IG9mIHNoYXBlcyBhbmQgZWZmZWN0cy5cbiAqIEBjbGFzcyBVSVByb2dyZXNzXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJQnV0dG9uIGZyb20gJy4uL1VJQnV0dG9uJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjYW5jZWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNhbmNlbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByb2dyZXNzOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9ncmVzc1Byb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICB0d2VlblByb3BlcnR5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IHt9LFxuICAgICAgICB0d2VlblByb3BlcnR5OiAnd2lkdGgnLFxuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxhYmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nbGFiZWwnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxhYmVsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmNhbmNlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2NhbmNlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtY2FuY2VsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jYW5jZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvblByZXNzZWQ9e3RoaXMucHJvcHMub25DYW5jZWx9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3Byb2dyZXNzJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtaW5kZXRlcm1pbmF0ZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByb2dyZXNzID09PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgcm9sZT0ncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucHJvZ3Jlc3NQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudHdlZW5Qcm9wZXJ0eV06IHRoaXMucHJvcHMucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzcy5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXByb2dyZXNzLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQcm9ncmVzcygpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxhYmVsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2FuY2VsKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgIG9uRXhwYW5kOiBub29wLFxuICAgICAgICBvbkhpZGU6IG5vb3AsXG4gICAgICAgIHRvZ2dsZVByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMucHJvcHMuZXhwYW5kZWQsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBpZiAobmV3UHJvcHMuZXhwYW5kZWQgIT09IHRoaXMucHJvcHMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiBuZXdQcm9wcy5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzW3RoaXMuc3RhdGUuZXhwYW5kZWQgPyAnb25FeHBhbmQnIDogJ29uSGlkZSddKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLWRpc2Nsb3N1cmUtY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSd0b2dnbGUnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgPyB0aGlzLnByb3BzLnRlYXNlckV4cGFuZGVkIHx8IHRoaXMucHJvcHMudGVhc2VyIDogdGhpcy5wcm9wcy50ZWFzZXJ9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgcmFkaW8gZm9ybSBjb250cm9sLlxuICogQGNsYXNzIFVJUmFkaW9cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVJhZGlvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUmFkaW8ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIGxhYmVsUHJvcHM6IHt9LFxuICAgICAgICBvblNlbGVjdGVkOiBub29wLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgdXVpZCA9IHV1aWQoKVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgdHlwZT0ncmFkaW8nXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXJhZGlvLXNlbGVjdGVkJzogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtTdHJpbmcodGhpcy5wcm9wcy5zZWxlY3RlZCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlkIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pZCB8fCB0aGlzLnV1aWR9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVJhZGlvLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8td3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiB0cnVlLFxuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbnB1dFZhbHVlID0gKHZhbHVlID0gJycpID0+IHRoaXMuc2V0U3RhdGUoe2lucHV0OiB2YWx1ZX0pXG5cbiAgICBnZXRWYWx1ZSA9ICgpID0+IHRoaXMucmVmcy5maWVsZC52YWx1ZVxuXG4gICAgc2V0VmFsdWUobmV4dFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICB0aGlzLnJlZnMuZmllbGQudmFsdWUgPSBuZXh0VmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBzaW11bGF0ZSBpbnB1dCBjaGFuZ2UgZXZlbnQgZmxvd1xuICAgICAgICAgICAgdGhpcy5yZWZzLmZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICAgICAgdGhpcy5yZWZzLmZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNGb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIGZvciBcImNvbnRyb2xsZWRcIiBzY2VuYXJpb3MsIHVwZGF0ZXMgdG8gdGhlIGNhY2hlZCBpbnB1dCB0ZXh0IHNob3VsZCBjb21lXG4gICAgICAgIC8vIGV4Y2x1c2l2ZWx5IHZpYSBwcm9wcyAoY1dSUCkgc28gaXQgZXhhY3RseSBtaXJyb3JzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uXG4gICAgICAgIC8vIHN0YXRlLCBvdGhlcndpc2UgYSByZS1yZW5kZXIgd2lsbCBvY2N1ciBiZWZvcmUgdGhlIG5ldyB0ZXh0IGhhcyBjb21wbGV0ZWQgaXRzXG4gICAgICAgIC8vIGZlZWRiYWNrIGxvb3AgYW5kIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbG9zdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzTm9uRW1wdHkgPSB0aGlzLnN0YXRlLmlucHV0ICE9PSAnJztcbiAgICAgICAgY29uc3Qgc2hvdWxkU2hvd1BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNGb2N1c2VkID09PSBmYWxzZSAmJiBpc05vbkVtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNOb25FbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZFNob3dQbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciA6ICcnO1xuICAgIH1cblxuICAgIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXIgdWktdGV4dHVhbC1pbnB1dCc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVGV4dHVhbElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZXNjYXBlciBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG5cbmltcG9ydCBVSVRleHR1YWxJbnB1dCBmcm9tICcuLi9VSVRleHR1YWxJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIG1vZGUgPSB7XG4gICAgICAgICdTVEFSVFNfV0lUSCc6ICdTVEFSVFNfV0lUSCcsXG4gICAgICAgICdGVVpaWSc6ICdGVVpaWScsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBhbGdvcml0aG06IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtYXRjaGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgaGludDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGhpbnRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYWxnb3JpdGhtOiBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICBlbnRpdGllczogW10sXG4gICAgICAgIGhpbnRQcm9wczoge30sXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBub29wLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICBpc0NvbnRyb2xsZWQ6IGlzU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSksXG4gICAgICAgIGlucHV0OiB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWVcbiAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWVcbiAgICAgICAgICAgICAgIHx8ICcnLFxuICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICB9XG5cbiAgICBtb3VudGVkID0gZmFsc2VcblxuICAgIHVwZGF0ZUlucHV0U3RhdGUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHZhbHVlfSlcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGRcblxuICAgIHNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cyA9ICgpID0+IHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKClcblxuICAgIHNldFZhbHVlID0gKHZhbHVlID0gJycpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIHVwY29taW5nIHJlbmRlciB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJ5IGBzZXRWYWx1ZWBcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5yZXNldE1hdGNoZXMsIDApO1xuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hcmtlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdHMsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXRjaGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKHByb3ZpZGVkRW50aXRpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRpdGllcyA9IHByb3ZpZGVkRW50aXRpZXMgfHwgcHJvcHMuZW50aXRpZXM7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0LCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzTmFtZV06ICEhY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJVGV4dHVhbElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBEaXN0aWxsIHJpY2ggZW50aXR5IGRhdGEgbWF0Y2hlZCB2aWEgdHlwZWFoZWFkIGlucHV0IGludG8gc2ltcGxlIHZpc3VhbCBhYnN0cmFjdGlvbnMuXG4gKiBAY2xhc3MgVUlUb2tlbml6ZWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5jb25zdCBmaXJzdCA9IChhcnJheSkgPT4gYXJyYXlbMF07XG5jb25zdCBsYXN0ID0gKGFycmF5KSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gKHZhbHVlKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKChpZHgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGlkeCkgIT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGgpIHsgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmVUb2tlbnMoaW5kZXhlcyk7IH1cbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbihpbmRleCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbnMoaW5kZXhlcykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihpbmRleGVzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGxhc3QoaW5kZXhlcykpO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbXSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4LCBldmVudCkge1xuICAgICAgICAvLyBpZiB3ZSBkb24ndCBzdG9wIHByb3BhZ2F0aW9uLCB0aGUgZXZlbnQgYnViYmxlcyBhbmQgcmVzdWx0cyBpbiBhIGZhaWxlZCB0b2tlbiBzZWxlY3Rpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbkNsb3NlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2VuQ2xvc2VWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1jbG9zZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbih0aGlzLnByb3BzLnRva2VuQ2xvc2VDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5LZXlEb3duKGluZGV4LCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG9rZW5zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW5zJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2tlbnMubWFwKChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRva2VuaXplZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRvb2x0aXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb29sdGlwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFRyaWdnZXIgbmF0aXZlIHRvYXN0cyBpbiBzdXBwb3J0aW5nIGJyb3dzZXJzLlxuICogQGNsYXNzIFVJTm90aWZpY2F0aW9uU2VydmljZVxuICovXG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL2lzU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuYm9keSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5oZWFkZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgaXNTdHJpbmcoY29uZmlnLmljb24pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oY29uZmlnLm9uQ2xpY2spID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgICApO1xuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBVc2VkIHRvIGNyZWF0ZSBhbiBFUzUtY29tcGF0aWJsZSBzdGFuZGFsb25lIGJ1aWxkLCBhbmQgc28gaXQncyBwb3NzaWJsZSB0byBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JylgYFxuICogYW5kIGRpcmVjdGx5IHVzZSBhIGNvbXBvbmVudCBsaWtlOiBgcmVxdWlyZSgnZW5pZ21hLXVpa2l0JykuVUlCdXR0b25gXG4gKi9cblxuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQXJyb3dLZXlOYXZpZ2F0aW9ufSBmcm9tICcuL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUJ1dHRvbn0gZnJvbSAnLi9VSUJ1dHRvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveH0gZnJvbSAnLi9VSUNoZWNrYm94JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUNoZWNrYm94R3JvdXB9IGZyb20gJy4vVUlDaGVja2JveEdyb3VwJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSURpYWxvZ30gZnJvbSAnLi9VSURpYWxvZyc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlGaXR0ZWRUZXh0fSBmcm9tICcuL1VJRml0dGVkVGV4dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlJbWFnZX0gZnJvbSAnLi9VSUltYWdlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSU1vZGFsfSBmcm9tICcuL1VJTW9kYWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUGFnaW5hdGlvbn0gZnJvbSAnLi9VSVBhZ2luYXRpb24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUG9wb3Zlcn0gZnJvbSAnLi9VSVBvcG92ZXInO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUG9ydGFsfSBmcm9tICcuL1VJUG9ydGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzfSBmcm9tICcuL1VJUHJvZ3Jlc3MnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlfSBmcm9tICcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVJhZGlvfSBmcm9tICcuL1VJUmFkaW8nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJU2VnbWVudGVkQ29udHJvbH0gZnJvbSAnLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9rZW5pemVkSW5wdXR9IGZyb20gJy4vVUlUb2tlbml6ZWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUZXh0dWFsSW5wdXR9IGZyb20gJy4vVUlUZXh0dWFsSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVHlwZWFoZWFkSW5wdXR9IGZyb20gJy4vVUlUeXBlYWhlYWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUb29sdGlwfSBmcm9tICcuL1VJVG9vbHRpcCc7XG5cbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcuL1VJVXRpbHMvbm90aWZ5JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wZXJ0eSBmcm9tICcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgY29uc3QgVUlVdGlscyA9IHtleHRyYWN0Q2hpbGRQcm9wcywgbm90aWZ5LCB0cmFuc2Zvcm1Qcm9wZXJ0eSwgdXVpZH07XG4iXSwibmFtZXMiOlsidGVzdCIsIm9taXRLZXlzRnJvbVNvdXJjZU9iamVjdCIsInNvdXJjZSIsIm9taXR0ZWRLZXlzIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsInJlbG9jYXRlQWNjZXB0ZWRLZXlzIiwiaGFzaCIsImtleSIsImluZGV4T2YiLCJVSUFycm93S2V5TmF2aWdhdGlvbiIsInN0YXRlIiwicHJvcHMiLCJkZWZhdWx0QWN0aXZlQ2hpbGRJbmRleCIsImhhbmRsZUtleURvd24iLCJldmVudCIsIm1vZGUiLCJWRVJUSUNBTCIsIkJPVEgiLCJwcmV2ZW50RGVmYXVsdCIsIm1vdmVGb2N1cyIsIkhPUklaT05UQUwiLCJpc0Z1bmN0aW9uIiwib25LZXlEb3duIiwiaGFuZGxlRm9jdXMiLCJ0YXJnZXQiLCJoYXNBdHRyaWJ1dGUiLCJpbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiY2hpbGQiLCJSZWFjdCIsIkNoaWxkcmVuIiwidG9BcnJheSIsImNoaWxkcmVuIiwic2V0U3RhdGUiLCJhY3RpdmVDaGlsZEluZGV4Iiwib25Gb2N1cyIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNldEZvY3VzIiwibmV4dFByb3BzIiwibnVtQ2hpbGRyZW4iLCJjb3VudCIsImNoaWxkTm9kZSIsInJlZnMiLCJ3cmFwcGVyIiwiSFRNTEVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiTm9kZSIsIkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORyIsImZvY3VzIiwiZGVsdGEiLCJuZXh0SW5kZXgiLCJtYXAiLCJjbG9uZUVsZW1lbnQiLCJ0YWJJbmRleCIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJjb21wb25lbnQiLCJvbWl0IiwiaW50ZXJuYWxLZXlzIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsImZ1bmMiLCJudW1iZXIiLCJvbmVPZiIsImRlZmF1bHRQcm9wcyIsIm5vb3AiLCJVSUJ1dHRvbiIsImhhbmRsZUNsaWNrIiwiZGlzYWJsZWQiLCJ0b2dnbGVTdGF0ZSIsIm9uQ2xpY2siLCJwcmVzc2VkIiwiY3giLCJjbGFzc05hbWUiLCJub2RlIiwiYm9vbCIsInV1aWQiLCJyZXBsYWNlIiwiYSIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsIlVJQ2hlY2tib3giLCJpZCIsImhhbmRsZUNoYW5nZSIsImlucHV0UHJvcHMiLCJjaGVja2VkIiwibmFtZSIsIm9uQ2hhbmdlIiwiaW5wdXQiLCJpbmRldGVybWluYXRlIiwic2V0SW5kZXRlcm1pbmF0ZSIsIlN0cmluZyIsImdldEFyaWFTdGF0ZSIsImxhYmVsIiwibGFiZWxQcm9wcyIsInJlbmRlcklucHV0IiwicmVuZGVyTGFiZWwiLCJzaGFwZSIsIm9iamVjdCIsIlVJQ2hlY2tib3hHcm91cCIsIml0ZW1zIiwiZXZlcnkiLCJpdGVtIiwic29tZSIsInNlbGVjdEFsbCIsImFsbENoZWNrZWQiLCJhbGxJdGVtc0NoZWNrZWQiLCJzZWxlY3RBbGxQcm9wcyIsImFueUl0ZW1zQ2hlY2tlZCIsIm9uQWxsQ2hlY2tlZCIsIm9uQWxsVW5jaGVja2VkIiwib25DaGlsZENoZWNrZWQiLCJvbkNoaWxkVW5jaGVja2VkIiwidG9CZVJlbmRlcmVkIiwicmVuZGVyQ2hlY2tib3hlcyIsInNlbGVjdEFsbFBvc2l0aW9uIiwiQ29uc3RhbnRzIiwiU0VMRUNUX0FMTF9CRUZPUkUiLCJ1bnNoaWZ0IiwicmVuZGVyU2VsZWN0QWxsIiwiU0VMRUNUX0FMTF9BRlRFUiIsInB1c2giLCJyZW5kZXJDaGlsZHJlbiIsImFycmF5T2YiLCJpc1JlcXVpcmVkIiwiUE9SVEFMX0RBVEFfQVRUUklCVVRFIiwiVUlQb3J0YWwiLCIkcG9ydGFsIiwiJHBhc3NlbmdlciIsImRlc3RpbmF0aW9uIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJQb3J0YWxsZWRDb250ZW50IiwiaXNWYWxpZEVsZW1lbnQiLCJwb3J0YWxJZCIsInJlbmRlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJyZW1vdmVDaGlsZCIsIkNvbXBvbmVudCIsImluc3RhbmNlT2YiLCJib2R5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsIlVJRGlhbG9nIiwibW91bnRlZCIsInV1aWRIZWFkZXIiLCJ1dWlkQm9keSIsIm5hdGl2ZUV2ZW50IiwiY2FwdHVyZUZvY3VzIiwiY2xvc2VPbk91dHNpZGVGb2N1cyIsImlzUGFydE9mRGlhbG9nIiwid2luZG93Iiwic2V0VGltZW91dCIsIm9uQ2xvc2UiLCJwcmV2aW91cyIsImV4cGxpY2l0T3JpZ2luYWxUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY2xvc2VPbkVzY0tleSIsImhhbmRsZU91dHNpZGVDbGljayIsImNsb3NlT25PdXRzaWRlQ2xpY2siLCJoYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwiLCJjbG9zZU9uT3V0c2lkZVNjcm9sbCIsInJvb3RzIiwiJHdyYXBwZXIiLCJjb25jYXQiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImRvbSIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudCIsIm5vZGVUeXBlIiwiRUxFTUVOVF9OT0RFIiwicGFyZW50Tm9kZSIsImNvbnRhaW5zIiwiYWRkRXZlbnRMaXN0ZW5lciIsIiRkaWFsb2ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYm9keVByb3BzIiwiZm9vdGVyIiwiZm9vdGVyUHJvcHMiLCJoZWFkZXIiLCJoZWFkZXJQcm9wcyIsIndyYXBwZXJQcm9wcyIsInJlbmRlckZvY3VzQm91bmRhcnkiLCJiZWZvcmUiLCJyZW5kZXJIZWFkZXIiLCJyZW5kZXJCb2R5IiwicmVuZGVyRm9vdGVyIiwiYWZ0ZXIiLCJpbnN0YW5jZXMiLCJ0b0kiLCJzdHJpbmdOdW1iZXIiLCJyZXNjYWxlIiwiaW5zdGFuY2UiLCJjb250YWluZXJCb3giLCJnZXRDb21wdXRlZFN0eWxlIiwiZm9udFNpemUiLCJjb250YWluZXJIZWlnaHQiLCJoZWlnaHQiLCJjb250YWluZXJXaWR0aCIsIndpZHRoIiwiYm94U2l6aW5nIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsIm9wdGltaXplRm9ySGVpZ2h0IiwiZmxvb3IiLCJvZmZzZXRIZWlnaHQiLCJvcHRpbWl6ZUZvcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzdHlsZSIsIm1pbiIsIm1heEZvbnRTaXplIiwiaGFuZGxlV2luZG93UmVzaXplIiwiZm9yRWFjaCIsInJlZ2lzdGVySW5zdGFuY2UiLCJsZW5ndGgiLCJ1bnJlZ2lzdGVySW5zdGFuY2UiLCJzcGxpY2UiLCJVSUZpdHRlZFRleHQiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJVSUltYWdlIiwic3RhdHVzIiwiTE9BRElORyIsInNyYyIsInJlc2V0UHJlbG9hZGVyIiwicHJlbG9hZCIsImxvYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJMT0FERUQiLCJFUlJPUiIsImRpc3BsYXlBc0JhY2tncm91bmRJbWFnZSIsImltYWdlUHJvcHMiLCJhbHQiLCJzdGF0dXNQcm9wcyIsInJlbmRlckltYWdlIiwicmVuZGVyU3RhdHVzIiwiZXh0cmFjdENoaWxkUHJvcHMiLCJwYXJlbnRQcm9wcyIsImNoaWxkUHJvcFR5cGVzIiwiY2hpbGRQcm9wcyIsIlVJTW9kYWwiLCJwb3J0YWxQcm9wcyIsIiRtb2RhbCIsIm1hc2tQcm9wcyIsIm1vZGFsUHJvcHMiLCJVSVNlZ21lbnRlZENvbnRyb2wiLCJhY3RpdmVJdGVtSW5kZXgiLCJpbmRleE9mT3B0aW9uSW5Gb2N1cyIsImdldFByZXZpb3VzT3B0aW9uSW5kZXgiLCJnZXROZXh0T3B0aW9uSW5kZXgiLCJoYW5kbGVPcHRpb25DbGljayIsIm9wdGlvbnMiLCJ2YWx1ZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY3VycmVudE9wdGlvbkluZGV4IiwibmV4dCIsIm9uQmx1ciIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJkZWZpbml0aW9uIiwiaW50ZXJuYWxDaGlsZEtleXMiLCJoYW5kbGVPcHRpb25CbHVyIiwiYmluZCIsImhhbmRsZU9wdGlvbkZvY3VzIiwiY29udGVudCIsInJlbmRlck9wdGlvbnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJFcnJvciIsIm1pc3NpbmdTZWxlY3RlZCIsInNlZW5TZWxlY3RlZCIsIm11bHRpcGxlU2VsZWN0ZWQiLCJJdGVtIiwiZGF0YSIsIlByb21pc2UiLCJjbG9zdXJlUHJvbWlzZSIsInRoZW4iLCJyZXNvbHZlZFBheWxvYWQiLCJjdXJyZW50UHJvcHMiLCJjb252ZXJ0VG9KU1hGdW5jIiwiY29udmVydERhdGFUb0pTWE9yV2FpdCIsImV4dHJhQ2xhc3NlcyIsImV2ZW4iLCJnZXRDbGFzc2VzIiwibG9hZGluZ0NvbnRlbnQiLCJVSVBhZ2luYXRpb24iLCJpbml0aWFsUGFnZSIsIm51bUl0ZW1zUGVyUGFnZSIsImN1cnJlbnRQYWdlIiwiZ2V0UGFnZUZvckluZGV4IiwiaXRlbXNQZXJQYWdlIiwiY2VpbCIsInRvdGFsUGFnZXMiLCJ0b3RhbEl0ZW1zIiwiZmlyc3RWaXNpYmxlSXRlbUluZGV4IiwicGFnZVRvSW5kZXgiLCJpIiwibmV4dFRhcmdldEluZGV4IiwiY29udHJvbHMiLCJGSVJTVCIsIlBSRVZJT1VTIiwiTkVYVCIsIkxBU1QiLCJpdGVtXzAiLCJvbGRQcm9wcyIsImlkZW50aWZpZXIiLCJ0YXJnZXRJbmRleCIsIm51bVBhZ2VUb2dnbGVzIiwic3RhcnRQYWdlIiwiZW5kUGFnZSIsInNob3dQYWdpbmF0aW9uU3RhdGUiLCJzaG93SnVtcFRvRmlyc3QiLCJqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50IiwicHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQiLCJuZXh0UGFnZUNvbnRyb2xDb250ZW50Iiwic2hvd0p1bXBUb0xhc3QiLCJqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQiLCJjdXN0b21Db250cm9sQ29udGVudCIsImdlbmVyYXRlZEl0ZW1zIiwiZmlyc3RJdGVtSW5kZXgiLCJsYXN0SXRlbUluZGV4IiwiZ2V0SXRlbSIsImxpc3RXcmFwcGVyUHJvcHMiLCJpbmRleE9mZnNldCIsImdlbmVyYXRlSXRlbXMiLCJpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jIiwiaXRlbUxvYWRpbmdDb250ZW50IiwicG9zaXRpb24iLCJoaWRlUGFnZXJJZk5vdE5lZWRlZCIsInRvZ2dsZVdyYXBwZXJQcm9wcyIsInBvc2l0aW9uTG93ZXIiLCJ0b0xvd2VyQ2FzZSIsInBvc2l0aW9uQ2FwaXRhbGl6ZWQiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zIiwicG9zaXRpb25zIiwiQUJPVkUiLCJyZW5kZXJDb250cm9scyIsInJlbmRlckl0ZW1zIiwiQkVMT1ciLCJyZW5kZXJWaWV3IiwidmFsaWRhdGVJbml0aWFsUGFnZSIsImlzSW50ZWdlciIsIm51bWJlck9mUGFnZXMiLCJ2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZSIsImRldGVjdFRyYW5zZm9ybVByb3BlcnR5IiwibGVuIiwiZG9jdW1lbnRFbGVtZW50Iiwid2l0aG91dCIsImFycjEiLCJhcnIyIiwiZmlsdGVyIiwidmFsdWVzIiwib2JqIiwiVUlQb3BvdmVyIiwiYWxpZ24iLCJhbmNob3IiLCJjYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkiLCJkeCIsInJvdW5kIiwiZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbiIsImR5IiwiZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbiIsImFsaWdubWVudENvcnJlY3Rpb24iLCJnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyIsImRpZEFsaWdubWVudENoYW5nZSIsIiRjYXJldCIsImxlZnQiLCJnZXROZXh0Q2FyZXRYUG9zaXRpb24iLCJ0b3AiLCJnZXROZXh0Q2FyZXRZUG9zaXRpb24iLCJhcHBseVRyYW5zbGF0aW9uIiwiZGlhbG9nIiwiYW5jaG9yWEFsaWduIiwicHJlc2V0IiwiYW5jaG9yWUFsaWduIiwic2VsZlhBbGlnbiIsInNlbGZZQWxpZ24iLCJhbmNob3JSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYW5jaG9yTGVmdCIsImFuY2hvclRvcCIsImFuY2hvckhlaWdodCIsImFuY2hvcldpZHRoIiwiYm9keUxlZnQiLCJzY3JvbGxMZWZ0IiwiYm9keVRvcCIsInNjcm9sbFRvcCIsImNhcmV0IiwibmV4dFgiLCJNSURETEUiLCJTVEFSVCIsIkVORCIsImNsaWVudFdpZHRoIiwibmV4dFkiLCJjbGllbnRIZWlnaHQiLCJhbmNob3JZIiwieCIsInkiLCJhdXRvUmVwb3NpdGlvbiIsImNvcnJlY3Rpb25zIiwieE1heCIsInNjcm9sbFdpZHRoIiwieU1heCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybVByb3AiLCJuZXh0QWxpZ25tZW50IiwiY3VycmVudEFsaWdubWVudCIsImNvbnN0YW50IiwiZ2V0RnJhZyIsImdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQiLCJjYXJldENvbXBvbmVudCIsInBvc2l0aW9uVmFsdWVzIiwicHJlc2V0VmFsdWVzIiwiVUlQcm9ncmVzcyIsIm9uQ2FuY2VsIiwiY2FuY2VsUHJvcHMiLCJwcm9ncmVzc1Byb3BzIiwicHJvZ3Jlc3MiLCJ0d2VlblByb3BlcnR5IiwicmVuZGVyUHJvZ3Jlc3MiLCJyZW5kZXJDYW5jZWwiLCJVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSIsImV4cGFuZGVkIiwiZGlzcGF0Y2hDYWxsYmFjayIsInRvZ2dsZVByb3BzIiwibmV3UHJvcHMiLCJ0ZWFzZXJFeHBhbmRlZCIsInRlYXNlciIsInJlbmRlckNvbnRlbnQiLCJVSVJhZGlvIiwib25TZWxlY3RlZCIsIlVJVGV4dHVhbElucHV0IiwiaXNTdHJpbmciLCJzZXRJbnB1dFZhbHVlIiwiZ2V0VmFsdWUiLCJmaWVsZCIsImhhbmRsZUJsdXIiLCJpc0ZvY3VzZWQiLCJpc0NvbnRyb2xsZWQiLCJkZWZhdWx0VmFsdWUiLCJuZXh0VmFsdWUiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJidWJibGVzIiwiaXNOb25FbXB0eSIsInNob3VsZFNob3dQbGFjZWhvbGRlciIsImhpZGVQbGFjZWhvbGRlck9uRm9jdXMiLCJwbGFjZWhvbGRlciIsImdldFBsYWNlaG9sZGVyVGV4dCIsIkJvb2xlYW4iLCJyZW5kZXJQbGFjZWhvbGRlciIsIlVJVHlwZWFoZWFkSW5wdXQiLCJjb21wdXRlTWF0Y2hlcyIsInNlbGVjdGVkRW50aXR5SW5kZXgiLCJvbkVudGl0eUhpZ2hsaWdodGVkIiwiZW50aXRpZXMiLCJ1cGRhdGVJbnB1dFN0YXRlIiwiZW50aXR5TWF0Y2hJbmRleGVzIiwibWF0Y2hlcyIsInNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5IiwidG90YWxNYXRjaGVzIiwibWF0Y2hJbmRleCIsIm1hdGNoZXNOb2RlIiwibWF0Y2hlc05vZGVZRW5kIiwibWF0Y2hOb2RlIiwibWF0Y2hOb2RlWVN0YXJ0Iiwib2Zmc2V0VG9wIiwibWF0Y2hOb2RlWUVuZCIsImdldElucHV0Tm9kZSIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZW50aXR5IiwiZW50aXR5Q29udGVudCIsInRleHQiLCJmcmFncyIsInNwbGl0IiwiUmVnRXhwIiwiZXNjYXBlciIsIm5vcm1hbGl6ZWRVc2VyVGV4dCIsInRocmVzaG9sZCIsInNlZWtWYWx1ZSIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsImFsZ29yaXRobSIsIlNUQVJUU19XSVRIIiwibWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyIsIm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nIiwibWFya2VyIiwid2FybmVkTWFya2VyIiwid2FybiIsInVzZXJUZXh0Iiwibm9ybWFsaXplZCIsImZpbmRJbmRleGVzIiwicmVzdWx0Iiwic2Vla01hdGNoIiwicmVzdWx0cyIsImdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMiLCJnZXRGdXp6eU1hdGNoSW5kZXhlcyIsIm1hdGNoZXIiLCJ3YXJuZWRNYXRjaGVyIiwicHJvdmlkZWRFbnRpdGllcyIsImN1cnJlbnRWYWx1ZSIsImdldE1hdGNoSW5kZXhlcyIsIm9mZnNjcmVlbkNsYXNzIiwiZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0IiwiaGludCIsInJhdyIsInByb2Nlc3NlZCIsImhpbnRQcm9wcyIsIm1hdGNoV3JhcHBlclByb3BzIiwicmVzdCIsImhhbmRsZU1hdGNoQ2xpY2siLCJtYXJrTWF0Y2hTdWJzdHJpbmciLCJyZW5kZXJOb3RpZmljYXRpb24iLCJyZW5kZXJIaW50IiwicmVuZGVyTWF0Y2hlcyIsIkZVWlpZIiwicmVzZXRNYXRjaGVzIiwic2VsZWN0Iiwic2V0VmFsdWUiLCJvbkVudGl0eVNlbGVjdGVkIiwiY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbiIsImdldE1hcmtpbmdGdW5jdGlvbiIsImdldE1hdGNoaW5nRnVuY3Rpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJjdXJzb3JBdEVuZE9mSW5wdXQiLCJzaGlmdEtleSIsInNlbGVjdE1hdGNoIiwib25Db21wbGV0ZSIsImZpcnN0IiwiYXJyYXkiLCJsYXN0IiwiVUlUb2tlbml6ZWRJbnB1dCIsInR5cGVhaGVhZCIsImFkZCIsInRva2VucyIsImhhbmRsZUFkZFRva2VuIiwiaGFuZGxlSW5wdXRDbGljayIsImNsZWFyU2VsZWN0aW9uIiwiaGFuZGxlSW5wdXRGb2N1cyIsIndoaWNoIiwic2VsZWN0UHJldmlvdXNUb2tlbiIsInNlbGVjdE5leHRUb2tlbiIsInRva2Vuc1NlbGVjdGVkIiwicmVtb3ZlIiwibWV0YUtleSIsIl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiIsImhhbmRsZU5ld1NlbGVjdGlvbiIsInByZXZpb3VzU2VsZWN0ZWRJbmRleGVzIiwiY3VycmVudFNlbGVjdGVkSW5kZXhlcyIsImluZGV4ZXMiLCJpc0FycmF5IiwiaWR4IiwiaGFuZGxlUmVtb3ZlVG9rZW5zIiwiYXBwZW5kIiwic2VsZWN0VG9rZW4iLCJwcmV2aW91c1Rva2VuIiwic2VsZWN0VG9rZW5zIiwibmV4dFRva2VuIiwidG9rZW5DbG9zZUNvbXBvbmVudCIsInRva2VuQ2xvc2VWaXNpYmxlIiwiaGFuZGxlVG9rZW5DbG9zZUNsaWNrIiwiaGFuZGxlVG9rZW5LZXlEb3duIiwicmVuZGVyVG9rZW5DbG9zZSIsInJlbmRlclRva2VucyIsIlVJVG9vbHRpcCIsIkJFRk9SRSIsIkFGVEVSIiwiZXJyb3JzIiwiTm90aWZpY2F0aW9uQVBJIiwiZGV0ZWN0U3VwcG9ydCIsIk5vdGlmaWNhdGlvbiIsIndlYmtpdE5vdGlmaWNhdGlvbnMiLCJuYXZpZ2F0b3IiLCJtb3pOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0UmVjZWl2ZXIiLCJESVNBQkxFRCIsImNoZWNrUGVybWlzc2lvbiIsIk5PVF9BVkFJTEFCTEUiLCJwZXJtaXNzaW9uIiwibm90aWZ5IiwiY29uZmlnIiwiQ09ORklHX01JU1NJTkciLCJDT05GSUdfVFlQRSIsIkJPRFlfTUlTU0lORyIsIkJPRFlfVFlQRSIsIkhFQURFUl9NSVNTSU5HIiwiSEVBREVSX1RZUEUiLCJpY29uIiwiSUNPTl9UWVBFIiwiT05DTElDS19UWVBFIiwic3Bhd25XZWJOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJlcnJvciIsIlVJVXRpbHMiLCJ0cmFuc2Zvcm1Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0JBQWUsVUFBQ0EsSUFBRDtTQUFVLE9BQU9BLElBQVAsS0FBZ0IsVUFBMUI7Q0FBZjs7QUNBQTs7OztBQUlBLEFBQWUsU0FBU0Msd0JBQVQsQ0FBa0NDLE1BQWxDLEVBQTREO1FBQWxCQyxXQUFrQix1RUFBSixFQUFJOztXQUNoRUMsT0FBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9C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
