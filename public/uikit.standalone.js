(function (exports,React,ReactDOM) {
'use strict';

var React__default = 'default' in React ? React['default'] : React;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

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
            activeChildIndex: null
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    event.preventDefault();
                    _this.moveFocus(-1);
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    event.preventDefault();
                    _this.moveFocus(1);
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
            if (this.state.activeChildIndex !== null) {
                var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

                if (numChildren === 0) {
                    this.setState({ activeChildIndex: null }); // eslint-disable-line react/no-did-update-set-state
                } else if (this.state.activeChildIndex >= numChildren) {
                    this.setState({ activeChildIndex: numChildren - 1 }); // eslint-disable-line react/no-did-update-set-state
                } else if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                    this.setFocus(this.state.activeChildIndex);
                }
            }
        }
    }, {
        key: 'setFocus',
        value: function setFocus(index) {
            var childNode = (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : ReactDOM.findDOMNode(this.refs.wrapper)).children[index];

            if (childNode && childNode.getAttribute('tabindex') === '-1') {
                this.moveFocus(childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
            } else if (childNode && document.activeElement !== childNode) {
                childNode.focus();
            }
        }
    }, {
        key: 'moveFocus',
        value: function moveFocus(delta) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            var nextIndex = this.state.activeChildIndex + delta;

            if (nextIndex >= numChildren) {
                nextIndex = 0; // loop
            } else if (nextIndex < 0) {
                nextIndex = numChildren - 1; // reverse loop
            }

            this.setState({ activeChildIndex: nextIndex });
        }
    }, {
        key: 'handleChildBlur',
        value: function handleChildBlur(index, child, event) {
            if (this.state.activeChildIndex === index) {
                this.setState({ activeChildIndex: null });
            }

            event.stopPropagation();

            if (!isString(child) && isFunction(child.props.onBlur)) {
                child.props.onBlur(event);
            }
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
                    key: child.key || index,
                    tabIndex: child.props.tabIndex !== undefined ? child.props.tabIndex : 0,
                    onBlur: _this2.handleChildBlur.bind(_this2, index, child),
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

UIArrowKeyNavigation.propTypes = {
    component: React__default.PropTypes.oneOfType([React__default.PropTypes.string, React__default.PropTypes.func])
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
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
 * @return {string} a unique identifier
 *
 * @example
 * uuid(); // 1f2cd27f-0754-4344-9d20-436a201b2f80
 */
function uuid() {
  /* eslint-disable */
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (a) {
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

var UIDialog = function (_React$PureComponent) {
    inherits(UIDialog, _React$PureComponent);

    function UIDialog() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UIDialog.__proto__ || Object.getPrototypeOf(UIDialog)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.uuidHeader = uuid(), _this.uuidBody = uuid(), _this.callOnCloseIfMounted = function () {
            return _this.mounted && _this.props.onClose();
        }, _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(_this.callOnCloseIfMounted, 0);
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
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }

            if (isFunction(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    createClass(UIDialog, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mounted = true;

            if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
                this.$dialog.focus();
            }

            window.addEventListener('click', this.handleOutsideClick, true);
            window.addEventListener('contextmenu', this.handleOutsideClick, true);
            window.addEventListener('focus', this.handleFocus, true);
            window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
            window.addEventListener('wheel', this.handleOutsideScrollWheel, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;

            window.removeEventListener('click', this.handleOutsideClick, true);
            window.removeEventListener('contextmenu', this.handleOutsideClick, true);
            window.removeEventListener('focus', this.handleFocus, true);
            window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
            window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
        }
    }, {
        key: 'isPartOfDialog',
        value: function isPartOfDialog(node) {
            if (!node || node === window) {
                return false;
            }

            return this.$wrapper.contains(node.nodeType === 3 ? node.parentNode : node);
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
                    ' '
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
 * @class UIModal
 */

var UIModal = function (_React$PureComponent) {
    inherits(UIModal, _React$PureComponent);

    function UIModal() {
        classCallCheck(this, UIModal);
        return possibleConstructorReturn(this, (UIModal.__proto__ || Object.getPrototypeOf(UIModal)).apply(this, arguments));
    }

    createClass(UIModal, [{
        key: 'updateInternalModalCache',
        value: function updateInternalModalCache(instance) {
            this.modal = instance;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.$container = document.createElement('div');

            document.body.appendChild(this.$container);

            this.renderModal();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderModal();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            ReactDOM__default.unmountComponentAtNode(this.$container);
            document.body.removeChild(this.$container);
        }
    }, {
        key: 'renderModal',
        value: function renderModal() {
            var props = this.props;


            this.updateInternalModalCache(ReactDOM__default.render(React__default.createElement(
                'div',
                _extends({}, omitKeysFromSourceObject(props, UIModal.internalKeys), {
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
            ), this.$container));
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement('div', null);
        }
    }]);
    return UIModal;
}(React__default.PureComponent);

UIModal.propTypes = _extends({}, UIDialog.propTypes, {
    maskProps: React__default.PropTypes.object,
    modalProps: React__default.PropTypes.object
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

        _this.componentDidUpdate = function () {
            /*
                A nuance about this component: since it only renders a simple <div>, the main render() function
                never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
                a full re-render of the child dialog.
             */
            _this.renderDialog();
            _this.align();
        };

        _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : ReactDOM__default.findDOMNode(_this.props.anchor);

            _this.cacheViewportCartography(anchor);

            var dx = Math.round(_this.getNextDialogXPosition(anchor));
            var dy = Math.round(_this.getNextDialogYPosition(anchor));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(dx, dy);

            if (alignmentCorrection && _this.didAlignmentChange(alignmentCorrection)) {
                return _this.setState(alignmentCorrection, _this.componentDidUpdate);
            }

            // the caret is initially positioned at 0,0 inside the dialog
            // which is already positioned at the anchor, so we just need to
            // make small adjustments as necessary to line up the caret
            // with the visual center of the anchor

            _this.$caret.style.left = Math.round(_this.getNextCaretXPosition(anchor)) + 'px';
            _this.$caret.style.top = Math.round(_this.getNextCaretYPosition(anchor)) + 'px';

            _this.applyTranslation(_this.$caret, index, 0);
            _this.applyTranslation(_this.$wrapper, dx, dy);
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
        key: 'updateDialogInternalCache',
        value: function updateDialogInternalCache(instance) {
            this.dialog = instance;
            this.$dialog = instance.$dialog; // used in testing, not relevant
            this.$wrapper = instance.$wrapper;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.$container = document.createElement('div');
            document.body.appendChild(this.$container);

            this.renderDialog();
            this.align();

            window.addEventListener('resize', this.align, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            ReactDOM__default.unmountComponentAtNode(this.$container);
            document.body.removeChild(this.$container);

            window.removeEventListener('resize', this.align, true);
        }
    }, {
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
            var _state = this.state;
            var anchorXAlign = _state.anchorXAlign;
            var selfXAlign = _state.selfXAlign;
            var anchorYAlign = _state.anchorYAlign;
            var selfYAlign = _state.selfYAlign;

            var position = UIPopover.position;

            var nextX = 0;

            // we only want to change the X position when we're
            // fully above or below the anchor and selfXAlign isn't MIDDLE

            if (selfXAlign !== position.MIDDLE && (anchorYAlign === position.START && selfYAlign === position.END || anchorYAlign === position.END && selfYAlign === position.START)) {

                if (anchorXAlign === position.START) {
                    nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
                } else if (anchorXAlign === position.END) {
                    nextX += this.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
                }
            }

            return nextX;
        }
    }, {
        key: 'getNextCaretYPosition',
        value: function getNextCaretYPosition(anchor) {
            var caret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$caret;
            var _state2 = this.state;
            var anchorXAlign = _state2.anchorXAlign;
            var selfXAlign = _state2.selfXAlign;
            var anchorYAlign = _state2.anchorYAlign;
            var selfYAlign = _state2.selfYAlign;

            var position = UIPopover.position;

            var nextY = 0;

            // we only want to change the Y position when we're
            // fully to the left or right of the anchor (start,end | end,start)
            // selfYAlign isn't MIDDLE

            if (selfYAlign !== position.MIDDLE && (anchorXAlign === position.START && selfXAlign === position.END || anchorXAlign === position.END && selfXAlign === position.START)) {

                if (anchorYAlign === position.START) {
                    nextY += this.anchorHeight / 2 - caret.clientWidth / 2;
                } else if (anchorYAlign === position.END) {
                    nextY += this.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
                }
            }

            return nextY;
        }
    }, {
        key: 'getNextDialogXPosition',
        value: function getNextDialogXPosition(anchor) {
            var dialog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$wrapper;
            var _state3 = this.state;
            var anchorXAlign = _state3.anchorXAlign;
            var selfXAlign = _state3.selfXAlign;

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
            var dialog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$wrapper;

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

            var width = this.$wrapper.clientWidth;
            var height = this.$wrapper.clientHeight;
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
            var _this2 = this,
                _cx2;

            var state = this.state;
            var getFrag = this.getClassAlignmentFragment;

            this.updateDialogInternalCache(ReactDOM__default.render(React__default.createElement(UIDialog, _extends({}, omitKeysFromSourceObject(this.props, UIPopover.internalKeys), {
                before: React__default.cloneElement(this.props.caretComponent, {
                    ref: function ref(node) {
                        return _this2.$caret = node;
                    },
                    className: index(defineProperty({
                        'ui-popover-caret': true
                    }, this.props.caretComponent.props.className, !!this.props.caretComponent.props.className))
                }),
                wrapperProps: _extends({}, this.props.wrapperProps, {
                    className: index((_cx2 = {
                        'ui-popover': true
                    }, defineProperty(_cx2, 'ui-popover-anchor-x-' + getFrag(state.anchorXAlign), true), defineProperty(_cx2, 'ui-popover-anchor-y-' + getFrag(state.anchorYAlign), true), defineProperty(_cx2, 'ui-popover-self-x-' + getFrag(state.selfXAlign), true), defineProperty(_cx2, 'ui-popover-self-y-' + getFrag(state.selfYAlign), true), defineProperty(_cx2, this.props.wrapperProps.className, !!this.props.wrapperProps.className), _cx2))
                }) })), this.$container));
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement('div', null);
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.selectedEntityIndex >= 0) {
                this.props.onEntityHighlighted(this.state.selectedEntityIndex);
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
                        var className = entity.className;
                        var text = entity.text;
                        var rest = objectWithoutProperties(entity, ['className', 'text']);


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
            var props = this.props;
            var state = this.state;


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

    this.updateInputState = function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return _this4.setState({ input: value });
    };

    this.getSelectedEntityText = function () {
        var entity = _this4.props.entities[_this4.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        _this4.setState({
            selectedEntityIndex: -1,
            entityMatchIndexes: []
        });
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
exports.UIProgress = UIProgress;
exports.UIProgressiveDisclosure = UIProgressiveDisclosure;
exports.UIRadio = UIRadio;
exports.UISegmentedControl = UISegmentedControl;
exports.UITokenizedInput = UITokenizedInput;
exports.UITextualInput = UITextualInput;
exports.UITypeaheadInput = UITypeaheadInput;
exports.UITooltip = UITooltip;

}((this.UIKit = this.UIKit || {}),React,ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2lzRnVuY3Rpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9pc1N0cmluZy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL29taXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlBcnJvd0tleU5hdmlnYXRpb24vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub29wL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQnV0dG9uL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVXRpbHMvdXVpZC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUNoZWNrYm94L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJQ2hlY2tib3hHcm91cC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSURpYWxvZy9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSUZpdHRlZFRleHQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlJbWFnZS9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJTW9kYWwvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2ludGVnZXIvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlTZWdtZW50ZWRDb250cm9sL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUGFnaW5hdGlvbi9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUG9wb3Zlci9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVByb2dyZXNzL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJUmFkaW8vaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvbm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVGV4dHVhbElucHV0L2luZGV4LmpzIiwiL1VzZXJzL2Vzai9jb2RlL3Vpa2l0L1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlUb2tlbml6ZWRJbnB1dC9pbmRleC5qcyIsIi9Vc2Vycy9lc2ovY29kZS91aWtpdC9VSVRvb2x0aXAvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvVUlVdGlscy9ub3RpZnkvaW5kZXguanMiLCIvVXNlcnMvZXNqL2NvZGUvdWlraXQvZXhwb3J0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodGVzdCkgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbidcbiIsImV4cG9ydCBkZWZhdWx0ICh0ZXN0KSA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZydcbiIsIi8qKlxuICogUmV0dXJucyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgdGhlIHN1cHBsaWVkIG9iamVjdCB3aXRob3V0IHRoZSBnaXZlbiBrZXlzLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9taXRLZXlzRnJvbVNvdXJjZU9iamVjdChzb3VyY2UsIG9taXR0ZWRLZXlzID0gW10pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gcmVsb2NhdGVBY2NlcHRlZEtleXMoaGFzaCwga2V5KSB7XG4gICAgICAgIGlmIChvbWl0dGVkS2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBoYXNoW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYXNoO1xuXG4gICAgfSwge30pO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUFycm93S2V5TmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIF0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUFycm93S2V5TmF2aWdhdGlvbi5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBwcmV2U3RhdGUuYWN0aXZlQ2hpbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBjaGlsZE5vZGUuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnLTEnKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cyhcbiAgICAgICAgICAgICAgICBjaGlsZE5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORyA/IC0xIDogMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZE5vZGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGb2N1cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKEFycmF5LnByb3RvdHlwZS5jb25jYXQodGhpcy5wcm9wcy5jaGlsZHJlbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IG51bUNoaWxkcmVuIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBuZXh0SW5kZXh9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKC0xKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkQmx1cihpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkKSAmJiBpc0Z1bmN0aW9uKGNoaWxkLnByb3BzLm9uQmx1cikpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEZvY3VzKGluZGV4LCBjaGlsZCwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogaW5kZXh9KTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkKSAmJiBpc0Z1bmN0aW9uKGNoaWxkLnByb3BzLm9uRm9jdXMpKSB7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSB8fCBpbmRleCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXggIT09IHVuZGVmaW5lZCA/IGNoaWxkLnByb3BzLnRhYkluZGV4IDogMCxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQ2hpbGRCbHVyLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUNoaWxkRm9jdXMuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQsIHtcbiAgICAgICAgICAgIC4uLm9taXQodGhpcy5wcm9wcywgVUlBcnJvd0tleU5hdmlnYXRpb24uaW50ZXJuYWxLZXlzKSxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCIvKipcbiAqIEEgZHVtbXkgZnVuY3Rpb24gd2l0aCBubyBzaWRlIGVmZmVjdHMuIENvbW1vbmx5IHVzZWQgd2hlbiBtb2NraW5nIGludGVyZmFjZXMuXG4gKiBAbW9kdWxlIFVJS2l0L3V0aWxzL25vb3BcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIEJhc2VkIG9uIHtAbGluayBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzIHRoaXMgaW1wbGVtZW50YXRpb259LlxuICogQHJldHVybiB7c3RyaW5nfSBhIHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4YW1wbGVcbiAqIHV1aWQoKTsgLy8gMWYyY2QyN2YtMDc1NC00MzQ0LTlkMjAtNDM2YTIwMWIyZjgwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLGE9PihhXk1hdGgucmFuZG9tKCkqMTY+PmEvNCkudG9TdHJpbmcoMTYpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4iLCIvKipcbiAqIEFuIGFjY2Vzc2libGUgY2hlY2tib3ggd2l0aCBpbmRldGVybWluYXRlIHN1cHBvcnQuXG4gKiBAY2xhc3MgVUlDaGVja2JveFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBsYWJlbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVuY2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3gucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25VbmNoZWNrZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgaWQgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlucHV0UHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSAhIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBTZW5kIHRoZSBvcHBvc2l0ZSBzaWduYWwgZnJvbSB3aGF0IHdhcyBwYXNzZWQgdG8gdG9nZ2xlIHRoZSBkYXRhXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcm9wc1shdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQgPyAnb25DaGVja2VkJyA6ICdvblVuY2hlY2tlZCddKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6IFN0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMuY2hlY2tlZCk7XG4gICAgfVxuXG4gICAgcmVuZGVySW5wdXQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLmlucHV0UHJvcHMsICdpbmRldGVybWluYXRlJyl9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNoZWNrYm94LW1peGVkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1jaGVja2VkJzogdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC11bmNoZWNrZWQnOiAhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmluZGV0ZXJtaW5hdGUgJiYgIXRoaXMucHJvcHMuaW5wdXRQcm9wcy5jaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMuaWR9XG4gICAgICAgICAgICAgICAgYXJpYS1jaGVja2VkPXt0aGlzLmdldEFyaWFTdGF0ZSgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQ2hlY2tib3guaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCBjaGVja2JveGVzLlxuICogQGNsYXNzIFVJQ2hlY2tib3hHcm91cFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlDaGVja2JveCBmcm9tICcuLi9VSUNoZWNrYm94JztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNoZWNrYm94R3JvdXAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgQ29uc3RhbnRzID0ge1xuICAgICAgICBTRUxFQ1RfQUxMX0JFRk9SRTogJ1NFTEVDVF9BTExfQkVGT1JFJyxcbiAgICAgICAgU0VMRUNUX0FMTF9BRlRFUjogJ1NFTEVDVF9BTExfQUZURVInLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQWxsVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DaGlsZENoZWNrZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2VsZWN0QWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZWN0QWxsUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRSxcbiAgICAgICAgICAgIFVJQ2hlY2tib3hHcm91cC5Db25zdGFudHMuU0VMRUNUX0FMTF9BRlRFUixcbiAgICAgICAgXSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQ2hlY2tib3hHcm91cC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG9uQWxsQ2hlY2tlZDogbm9vcCxcbiAgICAgICAgb25BbGxVbmNoZWNrZWQ6IG5vb3AsXG4gICAgICAgIG9uQ2hpbGRDaGVja2VkOiBub29wLFxuICAgICAgICBvbkNoaWxkVW5jaGVja2VkOiBub29wLFxuICAgICAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgICAgICBzZWxlY3RBbGxQcm9wczoge30sXG4gICAgICAgIHNlbGVjdEFsbFBvc2l0aW9uOiBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQkVGT1JFLFxuICAgIH1cblxuICAgIGFsbEl0ZW1zQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZXZlcnkoaXRlbSA9PiBpdGVtLmlucHV0UHJvcHMuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgYW55SXRlbXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5pbnB1dFByb3BzLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdGhpcy5hbGxJdGVtc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHtpbnB1dFByb3BzfSA9IHRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHM7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nc2VsZWN0X2FsbCdcbiAgICAgICAgICAgICAgICAgICAga2V5PSdjYl9zZWxlY3RfYWxsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1jaGVja2JveC1ncm91cC1zZWxlY3RhbGwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc2VsZWN0QWxsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnNlbGVjdEFsbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBhbGxDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogIWFsbENoZWNrZWQgJiYgdGhpcy5hbnlJdGVtc0NoZWNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0UHJvcHMgJiYgaW5wdXRQcm9wcy5uYW1lID8gaW5wdXRQcm9wcy5uYW1lIDogJ2NiX3NlbGVjdF9hbGwnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RBbGxQcm9wcy5sYWJlbCB8fCAnU2VsZWN0IEFsbCd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkFsbENoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uVW5jaGVja2VkPXt0aGlzLnByb3BzLm9uQWxsVW5jaGVja2VkfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pbnB1dFByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hlY2tlZD17dGhpcy5wcm9wcy5vbkNoaWxkQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgb25VbmNoZWNrZWQ9e3RoaXMucHJvcHMub25DaGlsZFVuY2hlY2tlZH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICBjb25zdCB0b0JlUmVuZGVyZWQgPSBbdGhpcy5yZW5kZXJDaGVja2JveGVzKCldO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdEFsbCAmJiB0aGlzLnByb3BzLnNlbGVjdEFsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2VsZWN0QWxsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVUlDaGVja2JveEdyb3VwLkNvbnN0YW50cy5TRUxFQ1RfQUxMX0JFRk9SRTpcbiAgICAgICAgICAgICAgICB0b0JlUmVuZGVyZWQudW5zaGlmdCh0aGlzLnJlbmRlclNlbGVjdEFsbCgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVSUNoZWNrYm94R3JvdXAuQ29uc3RhbnRzLlNFTEVDVF9BTExfQUZURVI6XG4gICAgICAgICAgICAgICAgdG9CZVJlbmRlcmVkLnB1c2godGhpcy5yZW5kZXJTZWxlY3RBbGwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9CZVJlbmRlcmVkO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUNoZWNrYm94R3JvdXAuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktY2hlY2tib3gtZ3JvdXAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIG5vbi1ibG9ja2luZywgZm9jdXMtc3RlYWxpbmcgY29udGFpbmVyLlxuICogQGNsYXNzIFVJRGlhbG9nXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhZnRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJlZm9yZTogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogZmFsc2UsXG4gICAgICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgLy8gZmFsbGJhY2tzIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICB1dWlkSGVhZGVyID0gdXVpZCgpXG4gICAgdXVpZEJvZHkgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiR3cmFwcGVyLmNvbnRhaW5zKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlKTtcbiAgICB9XG5cbiAgICBjYWxsT25DbG9zZUlmTW91bnRlZCA9ICgpID0+IHRoaXMubW91bnRlZCAmJiB0aGlzLnByb3BzLm9uQ2xvc2UoKVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5jYWxsT25DbG9zZUlmTW91bnRlZCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e25vZGUgPT4gKHRoaXMuJHdyYXBwZXIgPSBub2RlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5iZWZvcmV9XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRGlhbG9nLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRml0IGdpdmVuIHRleHQgaW5zaWRlIGEgcGFyZW50IGNvbnRhaW5lciwgb2JleWluZyBpbXBsaWN0IGFuZCBleHBsaWNpdCBjb25zdHJhaW50cy5cbiAqIEBjbGFzcyBVSUZpdHRlZFRleHRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHRvSShzdHJpbmdOdW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nTnVtYmVyLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHJlc2NhbGUoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgY29uc3QgZm9udFNpemUgPSB0b0kod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZm9udFNpemUpO1xuXG4gICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IHRvSShjb250YWluZXJCb3guaGVpZ2h0KTtcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0b0koY29udGFpbmVyQm94LndpZHRoKTtcblxuICAgIGlmIChjb250YWluZXJCb3guYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgfHwgY29udGFpbmVyQm94LmJveFNpemluZyA9PT0gJ3BhZGRpbmctYm94JykgeyAvLyBuZWVkIHRvIGFjY291bnQgZm9yIHBhZGRpbmdcbiAgICAgICAgY29udGFpbmVySGVpZ2h0IC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ1RvcCkgKyB0b0koY29udGFpbmVyQm94LnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBjb250YWluZXJXaWR0aCAtPSB0b0koY29udGFpbmVyQm94LnBhZGRpbmdMZWZ0KSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZUZvckhlaWdodCA9IE1hdGguZmxvb3IoKGZvbnRTaXplIC8gbm9kZS5vZmZzZXRIZWlnaHQpICogY29udGFpbmVySGVpZ2h0KTtcbiAgICBjb25zdCBvcHRpbWl6ZUZvcldpZHRoID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldFdpZHRoKSAqIGNvbnRhaW5lcldpZHRoKTtcblxuICAgIC8vIHRoZSB8fCAxIGlzIGEgZmFsbGJhY2sgdG8gcHJldmVudCBmb250U2l6ZSBmcm9tIGJlaW5nIHNldCB0byB6ZXJvLCB3aGljaCBmdWJhcnMgdGhpbmdzXG4gICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9IChNYXRoLm1pbihpbnN0YW5jZS5wcm9wcy5tYXhGb250U2l6ZSwgb3B0aW1pemVGb3JIZWlnaHQsIG9wdGltaXplRm9yV2lkdGgpIHx8IDEpICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGluc3RhbmNlcy5mb3JFYWNoKGluc3RhbmNlID0+IHJlc2NhbGUoaW5zdGFuY2UpKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIHRydWUpO1xuICAgIH1cblxuICAgIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2VzLnNwbGljZShpbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSksIDEpO1xuXG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUZpdHRlZFRleHQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBtYXhGb250U2l6ZTogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIG1heEZvbnRTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSUZpdHRlZFRleHQucHJvcFR5cGVzKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHJlc2NhbGUodGhpcyk7XG5cbiAgICAgICAgLy8gdGhlcmUgYXJlIGxpa2VseSB0byBiZSBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhpcyBjb21wb25lbnQgb24gYSBwYWdlLCBzbyBpdCBtYWtlcyBzZW5zZSB0byBqdXN0IHVzZVxuICAgICAgICAvLyBhIHNoYXJlZCBnbG9iYWwgcmVzaXplIGxpc3RlbmVyIGluc3RlYWQgb2YgZWFjaCBjb21wb25lbnQgaGF2aW5nIGl0cyBvd25cbiAgICAgICAgcmVnaXN0ZXJJbnN0YW5jZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHJlc2NhbGUodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHVucmVnaXN0ZXJJbnN0YW5jZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUZpdHRlZFRleHQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gaW1hZ2UgYmxvY2sgd2l0aCBwbGFjZWhvbGRlciBzdXBwb3J0IGZvciBsb2FkaW5nIGFuZCBmYWxsYmFjayBzY2VuYXJpb3MuXG4gKiBAY2xhc3MgVUlJbWFnZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUltYWdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHN0YXR1cyA9IHtcbiAgICAgICAgTE9BRElORzogJ0xPQURJTkcnLFxuICAgICAgICBMT0FERUQ6ICdMT0FERUQnLFxuICAgICAgICBFUlJPUjogJ0VSUk9SJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGRpc3BsYXlBc0JhY2tncm91bmRJbWFnZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGltYWdlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBzdGF0dXNQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlJbWFnZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbWFnZVByb3BzOiB7fSxcbiAgICAgICAgc3RhdHVzUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcmMgIT09IHRoaXMucHJvcHMuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnJlc2V0UHJlbG9hZGVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmVsb2FkZXIoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIub25sb2FkID0gKCkgPT4gdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBVSUltYWdlLnN0YXR1cy5MT0FERUR9KTtcbiAgICAgICAgdGhpcy5sb2FkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0U3RhdGUoe3N0YXR1czogVUlJbWFnZS5zdGF0dXMuRVJST1J9KTtcblxuICAgICAgICB0aGlzLmxvYWRlci5zcmMgPSB0aGlzLnByb3BzLnNyYztcbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzcGxheUFzQmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW1hZ2VQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy5hbHR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmltYWdlUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aGlzLnByb3BzLnNyY30pYCxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmltYWdlUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbWFnZSdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaW1hZ2VQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgICAgICAgICBhbHQ9e3RoaXMucHJvcHMuYWx0fVxuICAgICAgICAgICAgICAgIG9uTG9hZD17bm9vcH1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXtub29wfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHMuc3RhdHVzUHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nc3RhdHVzJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWltYWdlLXN0YXR1cyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5zdGF0dXMgPT09IFVJSW1hZ2Uuc3RhdHVzLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS1sb2FkZWQnOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuTE9BREVELFxuICAgICAgICAgICAgICAgICAgICAndWktaW1hZ2UtZXJyb3InOiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gVUlJbWFnZS5zdGF0dXMuRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN0YXR1c1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5zdGF0dXNQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJSW1hZ2UuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1pbWFnZS13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGF0dXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgcHJvcHMgbGlzdGVkIGluIHRoZSBwcm9wVHlwZXMgb2YgYSBjaGlsZCBjb21wb25lbnRcbiAqIGUuZy4gdXNlZCBpbiBVSVR5cGVhaGVhZElucHV0IHRvIGlkZW50aWZ5IHdoaWNoIHByb3BzIGFyZSBtZWFudCBmb3IgVUlUZXh0dWFsSW5wdXRcbiAqIEBtb2R1bGUgVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wc1xuICpcbiAqIEBwYXJhbSAge09iamVjdH0gcGFyZW50UHJvcHMgICAgIHByb3BzIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNoaWxkUHJvcFR5cGVzICBwcm9wVHlwZXMgb2YgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgcHJvcHMgdG8gYmUgc3ByZWFkIGFwcGxpZWQgdG8gYSBjaGlsZCBjb21wb25lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0Q2hpbGRQcm9wcyhwYXJlbnRQcm9wcywgY2hpbGRQcm9wVHlwZXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hpbGRQcm9wVHlwZXMpLnJlZHVjZSgoY2hpbGRQcm9wcywga2V5KSA9PiB7XG4gICAgICAgIGlmIChwYXJlbnRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICBjaGlsZFByb3BzW2tleV0gPSBwYXJlbnRQcm9wc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkUHJvcHM7XG4gICAgfSwge30pO1xufVxuIiwiLyoqXG4gKiBBIGJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlNb2RhbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTW9kYWwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIG1hc2tQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbW9kYWxQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlNb2RhbC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgbWFza1Byb3BzOiB7fSxcbiAgICAgICAgbW9kYWxQcm9wczoge30sXG4gICAgfVxuXG4gICAgdXBkYXRlSW50ZXJuYWxNb2RhbENhY2hlKGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlck1vZGFsKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlck1vZGFsKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICB0aGlzLnVwZGF0ZUludGVybmFsTW9kYWxDYWNoZShcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSU1vZGFsLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5tYXNrUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktbW9kYWwtbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLm1hc2tQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLm1hc2tQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0gLz5cblxuICAgICAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlEaWFsb2cucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5tb2RhbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMubW9kYWxQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLm1vZGFsUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L1VJRGlhbG9nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsXG4gICAgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BOdW1iZXIuaXNJbnRlZ2VyYF0oaHR0cHM6Ly9tZG4uaW8vTnVtYmVyL2lzSW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzSW50ZWdlcigzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzSW50ZWdlcignMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPT0gdG9JbnRlZ2VyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gdG9GaW5pdGUodmFsdWUpLFxuICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ludGVnZXI7XG4iLCIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlTZWdtZW50ZWRDb250cm9sXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSUJ1dHRvbiBmcm9tICcuLi9VSUJ1dHRvbic7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vcHRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhdCBsZWFzdCB0d28gb3B0aW9ucy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ1NlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEoJ3NlbGVjdGVkJyBpbiBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWlzc2luZ1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgYSBgc2VsZWN0ZWRgIHByb3AgZm9yIGVhY2ggb3B0aW9uLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNlbGVjdGVkID0gcHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VlblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmNvdW50ZXJlZCBtdWx0aXBsZSBvcHRpb25zIHdpdGggYHNlbGVjdGVkOiB0cnVlYC4gVGhlcmUgY2FuIGJlIG9ubHkgb25lLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnZhbHVlID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhIGB2YWx1ZWAgcHJvcCBmb3IgZWFjaCBvcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJU2VnbWVudGVkQ29udHJvbC5wcm9wVHlwZXMpXG4gICAgc3RhdGljIGludGVybmFsQ2hpbGRLZXlzID0gW1xuICAgICAgICAnY29udGVudCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgXVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGluZGV4T2ZPcHRpb25JbkZvY3VzOiBudWxsLFxuICAgIH1cblxuICAgIGN1cnJlbnRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5zb21lKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb24udmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmc1snb3B0aW9uXyQnICsgaW5kZXhdKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE5leHRPcHRpb25JbmRleChjdXJyZW50T3B0aW9uSW5kZXgpIHtcbiAgICAgICAgbGV0IG5leHQgPSBjdXJyZW50T3B0aW9uSW5kZXggKyAxO1xuXG4gICAgICAgIHJldHVybiBuZXh0IDwgdGhpcy5wcm9wcy5vcHRpb25zLmxlbmd0aCA/IG5leHQgOiAwO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzT3B0aW9uSW5kZXgoY3VycmVudE9wdGlvbkluZGV4KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzIDwgMCA/IHRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggLSAxIDogcHJldmlvdXM7XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQmx1cihvcHRpb24sIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzID09PSB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZihvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmRleE9mT3B0aW9uSW5Gb2N1czogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9uLm9uQmx1cikpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25DbGljaykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9wdGlvbkZvY3VzKG9wdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXhPZk9wdGlvbkluRm9jdXM6IHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKG9wdGlvbil9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb24ub25Gb2N1cykpIHtcbiAgICAgICAgICAgIG9wdGlvbi5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLnN0YXRlLmluZGV4T2ZPcHRpb25JbkZvY3VzO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuZ2V0UHJldmlvdXNPcHRpb25JbmRleChhY3RpdmVJdGVtSW5kZXgpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5nZXROZXh0T3B0aW9uSW5kZXgoYWN0aXZlSXRlbUluZGV4KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayh0aGlzLnByb3BzLm9wdGlvbnNbYWN0aXZlSXRlbUluZGV4XSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgoZGVmaW5pdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFVJQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KGRlZmluaXRpb24sIFVJU2VnbWVudGVkQ29udHJvbC5pbnRlcm5hbENoaWxkS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J3JhZGlvJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyhkZWZpbml0aW9uLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXsnb3B0aW9uXyQnICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGVmaW5pdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wtb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zZWdtZW50ZWQtY29udHJvbC1vcHRpb24tc2VsZWN0ZWQnOiBkZWZpbml0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2RlZmluaXRpb24uY2xhc3NOYW1lXTogISFkZWZpbml0aW9uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtkZWZpbml0aW9uLnNlbGVjdGVkID8gJzAnIDogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZU9wdGlvbkJsdXIuYmluZCh0aGlzLCBkZWZpbml0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgb25QcmVzc2VkPXt0aGlzLmhhbmRsZU9wdGlvbkNsaWNrLmJpbmQodGhpcywgZGVmaW5pdGlvbil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzLCBkZWZpbml0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgIHtkZWZpbml0aW9uLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9VSUJ1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVNlZ21lbnRlZENvbnRyb2wuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgYXJpYS1yb2xlPSdyYWRpb2dyb3VwJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktc2VnbWVudGVkLWNvbnRyb2wnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEEgdXRpbGl0eSB2aWV3IGZvciBwYWdpbmcgdGhlIGRpc3BsYXkgb2YgbWFueSBkYXRhIGl0ZW1zIG9mIHZhcnlpbmcgc2l6ZXMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0aW9uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGlzSW50ZWdlciBmcm9tICdsb2Rhc2guaXNpbnRlZ2VyJztcblxuaW1wb3J0IFVJU2VnbWVudGVkQ29udHJvbCBmcm9tICcuLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuaW1wb3J0IFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGZyb20gJy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGV2ZW46IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBkYXRhVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGxvYWRpbmdDb250ZW50OiBQcm9wVHlwZXMubm9kZSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoSXRlbS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5kYXRhICE9PSB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IG5leHRQcm9wcy5kYXRhfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLnRoZW4oZnVuY3Rpb24gY2F1dGlvdXNseVNldEl0ZW1EYXRhKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91bnRlZCAmJiB0aGlzLnN0YXRlLmRhdGEgPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcmVwbGFjZSBpZiB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIHByb21pc2UsIG90aGVyd2lzZSBkbyBub3RoaW5nXG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5zdGF0ZS5kYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWl0Rm9yQ29udGVudElmTmVjZXNzYXJ5KCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhaXRGb3JDb250ZW50SWZOZWNlc3NhcnkoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NlcyhleHRyYUNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGN4KHtcbiAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1ldmVuJzogdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1vZGQnOiAhdGhpcy5wcm9wcy5ldmVuLFxuICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbS1sb2FkaW5nJzogdGhpcy5zdGF0ZS5kYXRhIGluc3RhbmNlb2YgUHJvbWlzZSxcbiAgICAgICAgfSkgKyAoZXh0cmFDbGFzc2VzID8gJyAnICsgZXh0cmFDbGFzc2VzIDogJycpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyl9IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc2VzKCl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nQ29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBqc3ggPSB0aGlzLnByb3BzLmRhdGFUb0pTWENvbnZlcnRlckZ1bmModGhpcy5zdGF0ZS5kYXRhLCB0aGlzLnByb3BzLmluZGV4KTtcblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGpzeCwge1xuICAgICAgICAgICAgLi4ub21pdCh0aGlzLnByb3BzLCBJdGVtLmludGVybmFsS2V5cyksXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3Nlcyhqc3gucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICdkYXRhLWluZGV4JzogdGhpcy5wcm9wcy5pbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhZ2luYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29udHJvbHMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCT1RIOiAnQk9USCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY3VzdG9tQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBnZXRJdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpZGVudGlmaWVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgaW5pdGlhbFBhZ2U6IGZ1bmN0aW9uIHZhbGlkYXRlSW5pdGlhbFBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMuaW5pdGlhbFBhZ2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgICAgICBpZiAocHJvcHMuaW5pdGlhbFBhZ2UgPCAxIHx8IHByb3BzLmluaXRpYWxQYWdlID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2Bpbml0aWFsUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtTG9hZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBpdGVtVG9KU1hDb252ZXJ0ZXJGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAganVtcFRvRmlyc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGp1bXBUb0xhc3RDb250cm9sQ29udGVudDogUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgbnVtSXRlbXNQZXJQYWdlYCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJUGFnaW5hdGlvbi5wb3NpdGlvbnMpKSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHNob3dQYWdpbmF0aW9uU3RhdGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgXSksXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVBhZ2luYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZ2V0SXRlbTogbm9vcCxcbiAgICAgICAgaGlkZVBhZ2VySWZOb3ROZWVkZWQ6IGZhbHNlLFxuICAgICAgICBpbml0aWFsUGFnZTogMSxcbiAgICAgICAgaXRlbVRvSlNYQ29udmVydGVyRnVuYzogZGF0YSA9PiBkYXRhLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xDb250ZW50OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbENvbnRlbnQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbENvbnRlbnQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0aW9uLnBvc2l0aW9ucy5BQk9WRSxcbiAgICAgICAgcHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQ6ICfigLkgUHJldmlvdXMnLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IHRydWUsXG4gICAgICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgICAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5pbml0aWFsUGFnZSxcbiAgICAgICAgdGFyZ2V0SW5kZXg6ICh0aGlzLnByb3BzLmluaXRpYWxQYWdlIC0gMSkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSxcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSA9ICgpID0+IHRoaXMuc3RhdGUuY3VycmVudFBhZ2VcbiAgICBnZXRQYWdlRm9ySW5kZXggPSAoaW5kZXgsIGl0ZW1zUGVyUGFnZSA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSA9PiBNYXRoLmNlaWwoKGluZGV4ICsgMSkgLyBpdGVtc1BlclBhZ2UpXG4gICAgdG90YWxQYWdlcyA9ICgpID0+IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSlcblxuICAgIGZpcnN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+ICh0aGlzLmN1cnJlbnRQYWdlKCkgLSAxKSAqIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSgpKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIC8vIHVzZSB0cmFuc2FjdGlvbmFsIGBzZXRTdGF0ZSgpYCBzeW50YXggdG8gZW5zdXJlIHRoYXQgcGVuZGluZyBzdGF0ZSB1cGRhdGVzIGFyZSBob25vcmVkLFxuICAgICAgICAvLyBsaWtlIHRob3NlIGZyb20gYHBhZ2VUb0luZGV4KClgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogYHByb3BzYCBoZXJlIGlzIHRlY2huaWNhbGx5IHRoZSBgbmV4dFByb3BzYCB5b3UnZCByZWNlaXZlIGZyb20gdGhlIGZpcnN0IGNXUlAgYXJndW1lbnRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQncyB3aHkgd2UncmUgY2FjaGluZyBgb2xkUHJvcHNgIG91dHNpZGUgdGhlIGBzZXRTdGF0ZWBcbiAgICAgICAgICAgIGlmIChwcm9wcy5pZGVudGlmaWVyICE9PSBvbGRQcm9wcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMuZ2V0UGFnZUZvckluZGV4KHN0YXRlLnRhcmdldEluZGV4LCBwcm9wcy5udW1JdGVtc1BlclBhZ2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4OiBzdGF0ZS50YXJnZXRJbmRleCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VUb0luZGV4ID0gaSA9PiB7XG4gICAgICAgIGlmIChpIDwgMCB8fCBpID49IHRoaXMucHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgQ2Fubm90IHBhZ2UgdG8gaW52YWxpZCBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5nZXRQYWdlRm9ySW5kZXgoaSksXG4gICAgICAgICAgICB0YXJnZXRJbmRleDogaSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGNvbnN0IG51bVBhZ2VUb2dnbGVzID0gdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcztcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMudG90YWxQYWdlcygpO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgdG90YWxQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogICBpc0Z1bmN0aW9uKHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuc2hvd1BhZ2luYXRpb25TdGF0ZShjdXJyZW50UGFnZSwgdG90YWxQYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke2N1cnJlbnRQYWdlfSBvZiAke3RvdGFsUGFnZXN9YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1zdGF0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9GaXJzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9GaXJzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wgdWktcGFnaW5hdGlvbi1jb250cm9sLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY3VycmVudFBhZ2UoKSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0aW9uLWNvbnRyb2wnLFxuICAgICAgICAgICAgICAgICdkYXRhLXBhZ2UtbnVtYmVyJzogaSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5jdXJyZW50UGFnZSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLm5leHRQYWdlQ29udHJvbENvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1uZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0xhc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvTGFzdENvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jdXJyZW50UGFnZSgpID09PSB0b3RhbFBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRpb24tY29udHJvbCB1aS1wYWdpbmF0aW9uLWNvbnRyb2wtbGFzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmN1c3RvbUNvbnRyb2xDb250ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1dWlkKCksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGlvbi1jb250cm9sIHVpLXBhZ2luYXRpb24tY29udHJvbC1jdXN0b20nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IHRoaXMuZmlyc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnByb3BzLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV4dFRhcmdldEluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuRklSU1Q6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLlBSRVZJT1VTOlxuICAgICAgICAgICAgbmV4dFRhcmdldEluZGV4ID0gdGhpcy5maXJzdFZpc2libGVJdGVtSW5kZXgoKSAtIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0aW9uLmNvbnRyb2xzLk5FWFQ6XG4gICAgICAgICAgICBuZXh0VGFyZ2V0SW5kZXggPSB0aGlzLmZpcnN0VmlzaWJsZUl0ZW1JbmRleCgpICsgdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRpb24uY29udHJvbHMuTEFTVDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHRoaXMucHJvcHMudG90YWxJdGVtcyAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIG5leHRUYXJnZXRJbmRleCA9IHBhcnNlSW50KHZhbHVlLCAxMCkgKiB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmdldFBhZ2VGb3JJbmRleChuZXh0VGFyZ2V0SW5kZXgpLFxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg6IG5leHRUYXJnZXRJbmRleCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5saXN0V3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBpbmRleE9mZnNldCA9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRpb24taXRlbXMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdlbmVyYXRlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUb0pTWENvbnZlcnRlckZ1bmM9e3RoaXMucHJvcHMuaXRlbVRvSlNYQ29udmVydGVyRnVuY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVuPXtpbmRleCAlIDIgPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4T2Zmc2V0ICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0NvbnRlbnQ9e3RoaXMucHJvcHMuaXRlbUxvYWRpbmdDb250ZW50fSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBpZiAoICAgdGhpcy5wcm9wcy5oaWRlUGFnZXJJZk5vdE5lZWRlZFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy50b3RhbEl0ZW1zIDw9IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DYXBpdGFsaXplZCA9IHBvc2l0aW9uTG93ZXJbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXIuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXtgc2VnbWVudGVkQ29udHJvbCR7cG9zaXRpb25DYXBpdGFsaXplZH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGlvbi1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtgdWktcGFnaW5hdGlvbi1jb250cm9scy0ke3Bvc2l0aW9uTG93ZXJ9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGlja30gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBhZ2luYXRpb24ucG9zaXRpb25zO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGlvbic+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5wb3NpdGlvbiA9PT0gcG9zaXRpb24uQUJPVkUgfHwgcHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhwb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucG9zaXRpb24gPT09IHBvc2l0aW9uLkJFTE9XIHx8IHByb3BzLnBvc2l0aW9uID09PSBwb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMocG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBhZ2luYXRpb24uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0aW9uLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5XG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcHJvcGVydHkga2V5IChlLmcuIGBXZWJraXRUcmFuc2Zvcm1gLCBgbXNUcmFuc2Zvcm1gKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBkZXRlY3RUcmFuc2Zvcm1Qcm9wZXJ0eSgpIHtcbiAgICBjb25zdCBwcm9wcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICdXZWJraXRUcmFuc2Zvcm0nLFxuICAgICAgICAnTW96VHJhbnNmb3JtJyxcbiAgICAgICAgJ09UcmFuc2Zvcm0nLFxuICAgICAgICAnbXNUcmFuc2Zvcm0nLFxuICAgICAgICAnd2Via2l0LXRyYW5zZm9ybScsIC8vIHVzZWQgaW4gSlNET01cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wc1tpXSBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG4iLCIvKipcbiAqIEEgbm9uLWJsb2NraW5nIGNvbnRhaW5lciBwb3NpdGlvbmVkIHRvIGEgc3BlY2lmaWMgYW5jaG9yIGVsZW1lbnQuXG4gKiBAY2xhc3MgVUlQb3BvdmVyXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcblxuZnVuY3Rpb24gd2l0aG91dChhcnIxLCBhcnIyKSB7IHJldHVybiBhcnIxLmZpbHRlcigoaXRlbSkgPT4gYXJyMi5pbmRleE9mKGl0ZW0pID09PSAtMSk7IH1cbmZ1bmN0aW9uIHZhbHVlcyhvYmopICAgICAgICAgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSkgPT4gb2JqW2tleV0pOyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uVmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wb3NpdGlvbilcblxuICAgIHN0YXRpYyBwcmVzZXQgPSB7XG4gICAgICAgICdBQk9WRSc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIH0sXG4gICAgICAgICdCRUxPVyc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIH0sXG4gICAgICAgICdMRUZUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICAgICAgJ1JJR0hUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlc2V0VmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wcmVzZXQpXG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJyAvPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtZmlsbCcgZmlsbD0nI0ZGRicgcG9pbnRzPSc2Ljk4MjMwNDQ0IDEuNzUgMTIuNzUgMTAgMS4yNSAxMCcgLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIHByZXNldDogVUlQb3BvdmVyLnByZXNldC5CRUxPVyxcbiAgICAgICAgd3JhcHBlclByb3BzOiB7fSxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246ICAgcHJvcHMuYW5jaG9yWEFsaWduICB8fCBwcm9wcy5wcmVzZXQuYW5jaG9yWEFsaWduLFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiAgIHByb3BzLmFuY2hvcllBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvcllBbGlnbixcbiAgICAgICAgICAgIHNlbGZYQWxpZ246ICAgICBwcm9wcy5zZWxmWEFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWEFsaWduLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogICAgIHByb3BzLnNlbGZZQWxpZ24gICAgfHwgcHJvcHMucHJlc2V0LnNlbGZZQWxpZ24sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhbG9nSW50ZXJuYWxDYWNoZShpbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGluc3RhbmNlO1xuICAgICAgICB0aGlzLiRkaWFsb2cgPSBpbnN0YW5jZS4kZGlhbG9nOyAgICAvLyB1c2VkIGluIHRlc3RpbmcsIG5vdCByZWxldmFudFxuICAgICAgICB0aGlzLiR3cmFwcGVyID0gaW5zdGFuY2UuJHdyYXBwZXI7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLiRjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvKlxuICAgICAgICAgICAgQSBudWFuY2UgYWJvdXQgdGhpcyBjb21wb25lbnQ6IHNpbmNlIGl0IG9ubHkgcmVuZGVycyBhIHNpbXBsZSA8ZGl2PiwgdGhlIG1haW4gcmVuZGVyKCkgZnVuY3Rpb25cbiAgICAgICAgICAgIG5ldmVyIGNoYW5nZXMuIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIGBjb21wb25lbnREaWRVcGRhdGVgIGFmdGVyIGBzZXRTdGF0ZWAgdG8gdHJpZ2dlclxuICAgICAgICAgICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY2FjaGVWaWV3cG9ydENhcnRvZ3JhcGh5KGFuY2hvcikge1xuICAgICAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yTGVmdCA9IGFuY2hvclJlY3QubGVmdDtcbiAgICAgICAgdGhpcy5hbmNob3JUb3AgPSBhbmNob3JSZWN0LnRvcDtcbiAgICAgICAgdGhpcy5hbmNob3JIZWlnaHQgPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgdGhpcy5hbmNob3JXaWR0aCA9IGFuY2hvclJlY3Qud2lkdGg7XG5cbiAgICAgICAgdGhpcy5ib2R5TGVmdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5ib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBYIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgYWJvdmUgb3IgYmVsb3cgdGhlIGFuY2hvciBhbmQgc2VsZlhBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZlhBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JZQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WCArPSB0aGlzLiR3cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dENhcmV0WVBvc2l0aW9uKGFuY2hvciwgY2FyZXQgPSB0aGlzLiRjYXJldCkge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWduLCBhbmNob3JZQWxpZ24sIHNlbGZZQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRZID0gMDtcblxuICAgICAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gY2hhbmdlIHRoZSBZIHBvc2l0aW9uIHdoZW4gd2UncmVcbiAgICAgICAgLy8gZnVsbHkgdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIGFuY2hvciAoc3RhcnQsZW5kIHwgZW5kLHN0YXJ0KVxuICAgICAgICAvLyBzZWxmWUFsaWduIGlzbid0IE1JRERMRVxuXG4gICAgICAgIGlmICggICBzZWxmWUFsaWduICE9PSBwb3NpdGlvbi5NSURETEVcbiAgICAgICAgICAgICYmICggICBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORFxuICAgICAgICAgICAgICAgIHx8IGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EICYmIHNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSkge1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkge1xuICAgICAgICAgICAgICAgIG5leHRZICs9IHRoaXMuYW5jaG9ySGVpZ2h0IC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLiR3cmFwcGVyLmNsaWVudEhlaWdodCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yLCBkaWFsb2cgPSB0aGlzLiR3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHthbmNob3JYQWxpZ24sIHNlbGZYQWxpZ259ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgbGV0IG5leHRYID0gdGhpcy5hbmNob3JMZWZ0ICsgdGhpcy5ib2R5TGVmdDtcblxuICAgICAgICBzd2l0Y2ggKGFuY2hvclhBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRYICs9IHRoaXMuYW5jaG9yV2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCBhbmNob3JZID0gdGhpcy5hbmNob3JUb3AgKyB0aGlzLmJvZHlUb3A7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZID0gYW5jaG9yWSArIHRoaXMuYW5jaG9ySGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zZWxmWUFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyh4LCB5KSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hdXRvUmVwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ycmVjdGlvbnMgPSB7Li4udGhpcy5zdGF0ZX07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCAwKSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgKyBoZWlnaHQgPiB5TWF4KSB7IC8vIG92ZXJmbG93aW5nIGJlbG93XG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgPCAwKSB7IC8vIG92ZXJmbG93aW5nIGFib3ZlXG4gICAgICAgICAgICAvLyBpZiBsZWZ0L3JpZ2h0XG4gICAgICAgICAgICBpZiAoICAgKGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKVxuICAgICAgICAgICAgICAgIHx8IChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBjb3JyZWN0aW9ucy5zZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5zZWxmWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVjdGlvbnM7XG4gICAgfVxuXG4gICAgYXBwbHlUcmFuc2xhdGlvbihub2RlLCB4LCB5KSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1Qcm9wKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlW3RyYW5zZm9ybVByb3BdID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBub2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlkQWxpZ25tZW50Q2hhbmdlKG5leHRBbGlnbm1lbnQsIGN1cnJlbnRBbGlnbm1lbnQgPSB0aGlzLnN0YXRlKSB7XG4gICAgICAgIHJldHVybiAgICBuZXh0QWxpZ25tZW50LmFuY2hvclhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuYW5jaG9yWUFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LmFuY2hvcllBbGlnblxuICAgICAgICAgICAgICAgfHwgbmV4dEFsaWdubWVudC5zZWxmWEFsaWduICE9PSBjdXJyZW50QWxpZ25tZW50LnNlbGZYQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWUFsaWduO1xuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICB0aGlzLmNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpO1xuXG4gICAgICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dYUG9zaXRpb24oYW5jaG9yKSk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHREaWFsb2dZUG9zaXRpb24oYW5jaG9yKSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoZHgsIGR5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiB0aGlzLmRpZEFsaWdubWVudENoYW5nZShhbGlnbm1lbnRDb3JyZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoYWxpZ25tZW50Q29ycmVjdGlvbiwgdGhpcy5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGNhcmV0IGlzIGluaXRpYWxseSBwb3NpdGlvbmVkIGF0IDAsMCBpbnNpZGUgdGhlIGRpYWxvZ1xuICAgICAgICAvLyB3aGljaCBpcyBhbHJlYWR5IHBvc2l0aW9uZWQgYXQgdGhlIGFuY2hvciwgc28gd2UganVzdCBuZWVkIHRvXG4gICAgICAgIC8vIG1ha2Ugc21hbGwgYWRqdXN0bWVudHMgYXMgbmVjZXNzYXJ5IHRvIGxpbmUgdXAgdGhlIGNhcmV0XG4gICAgICAgIC8vIHdpdGggdGhlIHZpc3VhbCBjZW50ZXIgb2YgdGhlIGFuY2hvclxuXG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TmV4dENhcmV0WFBvc2l0aW9uKGFuY2hvcikpICsgJ3B4JztcbiAgICAgICAgdGhpcy4kY2FyZXQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuJGNhcmV0LCBjeCwgMCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiR3cmFwcGVyLCBkeCwgZHkpO1xuICAgIH1cblxuICAgIGdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQoY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG5cbiAgICAgICAgc3dpdGNoIChjb25zdGFudCkge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgcmV0dXJuICdzdGFydCc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICByZXR1cm4gJ21pZGRsZSc7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJEaWFsb2coKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgZ2V0RnJhZyA9IHRoaXMuZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgPFVJRGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUG9wb3Zlci5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2FyZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IChub2RlKSA9PiAodGhpcy4kY2FyZXQgPSBub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXItY2FyZXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jYXJldENvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMud3JhcHBlclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1hbmNob3IteC0ke2dldEZyYWcoc3RhdGUuYW5jaG9yWEFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXktJHtnZXRGcmFnKHN0YXRlLmFuY2hvcllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteS0ke2dldEZyYWcoc3RhdGUuc2VsZllBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAsIHRoaXMuJGNvbnRhaW5lcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiAvPik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBbiB1bm9waW5pb25hdGVkIHByb2dyZXNzIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIGZvciBhIHZhcmlldHkgb2Ygc2hhcGVzIGFuZCBlZmZlY3RzLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlCdXR0b24gZnJvbSAnLi4vVUlCdXR0b24nO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQcm9ncmVzcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNhbmNlbFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uQ2FuY2VsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJvZ3Jlc3M6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgXSksXG4gICAgICAgIHByb2dyZXNzUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3MucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2FuY2VsUHJvcHM6IHt9LFxuICAgICAgICBsYWJlbFByb3BzOiB7fSxcbiAgICAgICAgcHJvZ3Jlc3NQcm9wczoge30sXG4gICAgICAgIHR3ZWVuUHJvcGVydHk6ICd3aWR0aCcsXG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMubGFiZWxQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdsYWJlbCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3MtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGFiZWxQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNhbmNlbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VUlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuY2FuY2VsUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nY2FuY2VsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1jYW5jZWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FuY2VsUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhbmNlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3NlZD17dGhpcy5wcm9wcy5vbkNhbmNlbH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQcm9ncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0ncHJvZ3Jlc3MnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICd1aS1wcm9ncmVzcy1pbmRldGVybWluYXRlJzogdHlwZW9mIHRoaXMucHJvcHMucHJvZ3Jlc3MgPT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByb2xlPSdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5wcm9ncmVzc1Byb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50d2VlblByb3BlcnR5XTogdGhpcy5wcm9wcy5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVByb2dyZXNzLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcHJvZ3Jlc3Mtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclByb2dyZXNzKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGFiZWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDYW5jZWwoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGlkZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRlYXNlckV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgICAgIG9uSGlkZTogbm9vcCxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQW4gYWNjZXNzaWJsZSByYWRpbyBmb3JtIGNvbnRyb2wuXG4gKiBAY2xhc3MgVUlSYWRpb1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcbmltcG9ydCB1dWlkIGZyb20gJy4uL1VJVXRpbHMvdXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUmFkaW8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGxhYmVsUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgb25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlSYWRpby5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbGFiZWxQcm9wczoge30sXG4gICAgICAgIG9uU2VsZWN0ZWQ6IG5vb3AsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9XG5cbiAgICB1dWlkID0gdXVpZCgpXG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZCB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuaWQgfHwgdGhpcy51dWlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktcmFkaW8tc2VsZWN0ZWQnOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e1N0cmluZyh0aGlzLnByb3BzLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5sYWJlbFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2xhYmVsJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5sYWJlbFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMuaWQgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmlkIHx8IHRoaXMudXVpZH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUmFkaW8uaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1yYWRpby13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMYWJlbCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZSA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZSwgJ1xcXFwkJicpO1xufTtcbiIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgaW5wdXRQcm9wczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzQ29udHJvbGxlZDogaXNTdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZVxuICAgICAgICAvLyBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgICAvLyBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0c1xuICAgICAgICAvLyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXJUZXh0KCkge1xuICAgICAgICBjb25zdCBpc05vbkVtcHR5ID0gdGhpcy5zdGF0ZS5pbnB1dCAhPT0gJyc7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dQbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzRm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNOb25FbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTm9uRW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRTaG93UGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgOiAnJztcbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyIHVpLXRleHR1YWwtaW5wdXQnPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVRleHR1YWxJbnB1dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMuZ2V0UGxhY2Vob2xkZXJUZXh0KCl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0nZmllbGQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5pbXBvcnQgVUlUZXh0dWFsSW5wdXQgZnJvbSAnLi4vVUlUZXh0dWFsSW5wdXQnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRTdGF0ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGRcblxuICAgIHNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cyA9ICgpID0+IHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKClcblxuICAgIHNldFZhbHVlID0gKHZhbHVlID0gJycpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIHVwY29taW5nIHJlbmRlciB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJ5IGBzZXRWYWx1ZWBcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5yZXNldE1hdGNoZXMsIDApO1xuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hcmtlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdHMsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXRjaGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKHByb3ZpZGVkRW50aXRpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRpdGllcyA9IHByb3ZpZGVkRW50aXRpZXMgfHwgcHJvcHMuZW50aXRpZXM7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0LCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogRGlzdGlsbCByaWNoIGVudGl0eSBkYXRhIG1hdGNoZWQgdmlhIHR5cGVhaGVhZCBpbnB1dCBpbnRvIHNpbXBsZSB2aXN1YWwgYWJzdHJhY3Rpb25zLlxuICogQGNsYXNzIFVJVG9rZW5pemVkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgVUlUeXBlYWhlYWRJbnB1dCBmcm9tICcuLi9VSVR5cGVhaGVhZElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gdmFsdWUgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHdlIGRvbid0IHN0b3AgcHJvcGFnYXRpb24sIHRoZSBldmVudCBidWJibGVzIGFuZCByZXN1bHRzIGluIGEgZmFpbGVkIHRva2VuIHNlbGVjdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZVZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRva2VuaXplZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBkaXNwbGF5cyBwcm92aWRlZCB0ZXh0IG9uIGhvdmVyLlxuICogQGNsYXNzIFVJVG9vbHRpcFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJy4uL1VJVXRpbHMvb21pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgQUJPVkU6ICdBQk9WRScsXG4gICAgICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgICAgICBCRUZPUkU6ICdCRUZPUkUnLFxuICAgICAgICBBRlRFUjogJ0FGVEVSJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKFVJVG9vbHRpcC5wb3NpdGlvbikpLFxuICAgICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRvb2x0aXAucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgcG9zaXRpb246IFVJVG9vbHRpcC5wb3NpdGlvbi5BQk9WRSxcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUb29sdGlwLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXRvb2x0aXAtcG9zaXRpb24tYWJvdmUnOiBwb3NpdGlvbiA9PT0gVUlUb29sdGlwLnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1iZWxvdyc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVMT1csXG4gICAgICAgICAgICAgICAgICAgICd1aS10b29sdGlwLXBvc2l0aW9uLWJlZm9yZSc6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQkVGT1JFLFxuICAgICAgICAgICAgICAgICAgICAndWktdG9vbHRpcC1wb3NpdGlvbi1hZnRlcic6IHBvc2l0aW9uID09PSBVSVRvb2x0aXAucG9zaXRpb24uQUZURVIsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPXt0aGlzLnByb3BzLnRleHR9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wc1snYXJpYS1sYWJlbCddIHx8IHRoaXMucHJvcHMudGV4dH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIFRyaWdnZXIgbmF0aXZlIHRvYXN0cyBpbiBzdXBwb3J0aW5nIGJyb3dzZXJzLlxuICogQGNsYXNzIFVJTm90aWZpY2F0aW9uU2VydmljZVxuICovXG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL2lzU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IGVycm9ycyA9IHtcbiAgICBESVNBQkxFRDogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJ5IHVzZXIgc2V0dGluZ3MuJyxcbiAgICBOT1RfQVZBSUxBQkxFOiAnVUlVdGlscy9ub3RpZnk6IHdlYiBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyxcbiAgICBDT05GSUdfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBwYXNzZWQgYSBub24tb2JqZWN0IGFzIGNvbmZpZ3VyYXRpb24uJyxcbiAgICBDT05GSUdfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBubyBjb25maWd1cmF0aW9uIHdhcyBwYXNzZWQuJyxcbiAgICBCT0RZX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBCT0RZX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogYGJvZHlgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSEVBREVSX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYGhlYWRlcmAgbXVzdCBiZSBhIHN0cmluZy4nLFxuICAgIEhFQURFUl9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIHdhcyBvbWl0dGVkIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LicsXG4gICAgSUNPTl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBpY29uYCBtdXN0IGJlIGEgVVJMIHN0cmluZy4nLFxuICAgIE9OQ0xJQ0tfVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgb25DbGlja2AgbXVzdCBiZSBhIGZ1bmN0aW9uLicsXG59O1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuZnVuY3Rpb24gcmVxdWVzdFBlcm1pc3Npb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgTm90aWZpY2F0aW9uQVBJLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIHJlcXVlc3RSZWNlaXZlcihzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdncmFudGVkJyB8fCBzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcnMuRElTQUJMRUQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5OT1RfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdncmFudGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBjYXNlICdkZW5pZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgnY2hlY2tQZXJtaXNzaW9uJyBpbiBOb3RpZmljYXRpb25BUEkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoTm90aWZpY2F0aW9uQVBJLmNoZWNrUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnkoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNvbmZpZykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5DT05GSUdfVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuYm9keSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5CT0RZX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbmZpZy5oZWFkZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSEVBREVSX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pY29uICE9PSB1bmRlZmluZWQgJiYgaXNTdHJpbmcoY29uZmlnLmljb24pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuSUNPTl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oY29uZmlnLm9uQ2xpY2spID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuT05DTElDS19UWVBFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbigpLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiBzcGF3bldlYk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKGNvbmZpZy5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogY29uZmlnLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLm9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlnLm9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcilcbiAgICAgICAgKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogVXNlZCB0byBjcmVhdGUgYW4gRVM1LWNvbXBhdGlibGUgc3RhbmRhbG9uZSBidWlsZCwgYW5kIHNvIGl0J3MgcG9zc2libGUgdG8gYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpYGBcbiAqIGFuZCBkaXJlY3RseSB1c2UgYSBjb21wb25lbnQgbGlrZTogYHJlcXVpcmUoJ2VuaWdtYS11aWtpdCcpLlVJQnV0dG9uYFxuICovXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSUFycm93S2V5TmF2aWdhdGlvbn0gZnJvbSAnLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlCdXR0b259IGZyb20gJy4vVUlCdXR0b24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJQ2hlY2tib3h9IGZyb20gJy4vVUlDaGVja2JveCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlDaGVja2JveEdyb3VwfSBmcm9tICcuL1VJQ2hlY2tib3hHcm91cCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlEaWFsb2d9IGZyb20gJy4vVUlEaWFsb2cnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJRml0dGVkVGV4dH0gZnJvbSAnLi9VSUZpdHRlZFRleHQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJSW1hZ2V9IGZyb20gJy4vVUlJbWFnZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlNb2RhbH0gZnJvbSAnLi9VSU1vZGFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBhZ2luYXRpb259IGZyb20gJy4vVUlQYWdpbmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVBvcG92ZXJ9IGZyb20gJy4vVUlQb3BvdmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVByb2dyZXNzfSBmcm9tICcuL1VJUHJvZ3Jlc3MnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlfSBmcm9tICcuL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBVSVJhZGlvfSBmcm9tICcuL1VJUmFkaW8nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJU2VnbWVudGVkQ29udHJvbH0gZnJvbSAnLi9VSVNlZ21lbnRlZENvbnRyb2wnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVG9rZW5pemVkSW5wdXR9IGZyb20gJy4vVUlUb2tlbml6ZWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUZXh0dWFsSW5wdXR9IGZyb20gJy4vVUlUZXh0dWFsSW5wdXQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFVJVHlwZWFoZWFkSW5wdXR9IGZyb20gJy4vVUlUeXBlYWhlYWRJbnB1dCc7XG5leHBvcnQge2RlZmF1bHQgYXMgVUlUb29sdGlwfSBmcm9tICcuL1VJVG9vbHRpcCc7XG5cbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuaW1wb3J0IG5vdGlmeSBmcm9tICcuL1VJVXRpbHMvbm90aWZ5JztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wZXJ0eSBmcm9tICcuL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgY29uc3QgVUlVdGlscyA9IHtleHRyYWN0Q2hpbGRQcm9wcywgbm90aWZ5LCB0cmFuc2Zvcm1Qcm9wZXJ0eSwgdXVpZH1cbiJdLCJuYW1lcyI6WyJmaW5kRE9NTm9kZSIsIlJlYWN0Iiwib21pdCIsImN4IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJpbmRleCIsImpzeCIsImlzSW50ZWdlciIsImVzY2FwZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtCQUFlLFVBQUMsSUFBRDtTQUFVLE9BQU8sSUFBUCxLQUFnQixVQUExQjtDQUFmOztBQ0FBLGdCQUFlLFVBQUMsSUFBRDtTQUFVLE9BQU8sSUFBUCxLQUFnQixRQUExQjtDQUFmOztBQ0FBOzs7O0FBSUEsQUFBZSxTQUFTLHdCQUFULENBQWtDLE1BQWxDLEVBQTREO1FBQWxCLFdBQWtCLHVFQUFKLEVBQUk7O1dBQ2hFLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsTUFBcEIsQ0FBMkIsU0FBUyxvQkFBVCxDQUE4QixJQUE5QixFQUFvQyxHQUFwQyxFQUF5QztZQUNuRSxZQUFZLE9BQVosQ0FBb0IsR0FBcEIsTUFBNkIsQ0FBQyxDQUFsQyxFQUFxQztpQkFDNUIsR0FBTCxJQUFZLE9BQU8sR0FBUCxDQUFaOzs7ZUFHRyxJQUFQO0tBTEcsRUFPSixFQVBJLENBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0VpQjs7Ozs7Ozs7Ozs7Ozs7cU5B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
