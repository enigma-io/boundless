'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UITypeaheadInput = require('../UITypeaheadInput');

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _extractChildProps = require('../UIUtils/extractChildProps');

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
    _inherits(UITokenizedInput, _React$PureComponent);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.focus = function () {
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
        }, _this.add = function (index) {
            if (_this.props.tokens.indexOf(index) === -1) {
                _this.props.handleAddToken(index);
            }
        }, _this.handleInputClick = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onClick)) {
                _this.props.inputProps.onClick(event);
            }
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus)) {
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

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITokenizedInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
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
    };

    // passthroughs to UITypeaheadInput instance methods


    UITokenizedInput.prototype.remove = function remove(index) {
        var _this2 = this;

        var indexes = (Array.isArray(index) ? index : [index]).filter(function (idx) {
            return _this2.props.tokens.indexOf(idx) !== -1;
        });

        if (indexes.length) {
            this.props.handleRemoveTokens(indexes);
        }
    };

    UITokenizedInput.prototype.selectToken = function selectToken(index) {
        this.props.handleNewSelection([index]);
    };

    UITokenizedInput.prototype.selectTokens = function selectTokens(indexes) {
        this.props.handleNewSelection(indexes);
    };

    UITokenizedInput.prototype.selectPreviousToken = function selectPreviousToken(append) {
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
    };

    UITokenizedInput.prototype.selectNextToken = function selectNextToken(append) {
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
    };

    UITokenizedInput.prototype.clearSelection = function clearSelection() {
        this.props.handleNewSelection([]);
    };

    UITokenizedInput.prototype.handleTokenCloseClick = function handleTokenCloseClick(index, event) {
        // if we don't stop propagation, the event bubbles and results in a failed token selection
        event.stopPropagation();

        this.remove(index);
        this.focus();

        if (this.props.tokenCloseComponent.props.onClick) {
            this.props.tokenCloseComponent.props.onClick(event);
        }
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.tokenCloseVisible) {
            var _cx;

            return _react2.default.cloneElement(this.props.tokenCloseComponent, {
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-token-close': true
                }, _cx[this.props.tokenCloseComponent.props.className] = Boolean(this.props.tokenCloseComponent.props.className), _cx)),
                onClick: this.handleTokenCloseClick.bind(this, index)
            });
        }
    };

    UITokenizedInput.prototype.handleTokenKeyDown = function handleTokenKeyDown(index, event) {
        switch (event.which) {
            case 13: // enter
            case 32:
                // space
                this.selectToken(index);
                event.preventDefault();
                break;

            case 8:
                // backspace
                this.remove(index);
                this.focus();
                event.preventDefault();
                break;
        }
    };

    UITokenizedInput.prototype.renderTokens = function renderTokens() {
        var _this3 = this;

        return _react2.default.createElement(
            'div',
            { className: 'ui-tokenfield-tokens' },
            this.props.tokens.map(function (index) {
                return _react2.default.createElement(
                    'div',
                    {
                        ref: 'token_' + index,
                        key: index,
                        className: (0, _classnames2.default)({
                            'ui-tokenfield-token': true,
                            'ui-tokenfield-token-selected': _this3.props.tokensSelected.indexOf(index) !== -1
                        }),
                        onClick: _this3.selectToken.bind(_this3, index),
                        onKeyDown: _this3.handleTokenKeyDown.bind(_this3, index),
                        tabIndex: '0' },
                    _this3.props.entities[index].text,
                    _this3.renderTokenClose(index)
                );
            })
        );
    };

    UITokenizedInput.prototype.render = function render() {
        var _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITokenizedInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-tokenfield-wrapper': true
                }, _cx2[this.props.className] = !!this.props.className, _cx2)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, (0, _extractChildProps2.default)(this.props, _UITypeaheadInput2.default.propTypes), {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                clearPartialInputOnSelection: true,
                inputProps: _extends({}, this.props.inputProps, {
                    onClick: this.handleInputClick,
                    onFocus: this.handleInputFocus
                }),
                onEntitySelected: this.add }))
        );
    };

    return UITokenizedInput;
}(_react2.default.PureComponent);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokenCloseComponent: _react2.default.PropTypes.element,
    tokenCloseVisible: _react2.default.PropTypes.bool,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)
});
UITokenizedInput.internalKeys = Object.keys(UITokenizedInput.propTypes);
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokenCloseComponent: _react2.default.createElement(
        'div',
        null,
        'X'
    ),
    tokenCloseVisible: true,
    tokens: [],
    tokensSelected: []
});
exports.default = UITokenizedInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheSIsImxhc3QiLCJsZW5ndGgiLCJVSVRva2VuaXplZElucHV0IiwiZm9jdXMiLCJyZWZzIiwidHlwZWFoZWFkIiwiZ2V0SW5wdXROb2RlIiwiZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0IiwiZ2V0VmFsdWUiLCJzZWxlY3QiLCJzZXRWYWx1ZSIsInZhbHVlIiwiYWRkIiwiaW5kZXgiLCJwcm9wcyIsInRva2VucyIsImluZGV4T2YiLCJoYW5kbGVBZGRUb2tlbiIsImhhbmRsZUlucHV0Q2xpY2siLCJldmVudCIsImNsZWFyU2VsZWN0aW9uIiwiaW5wdXRQcm9wcyIsIm9uQ2xpY2siLCJoYW5kbGVJbnB1dEZvY3VzIiwib25Gb2N1cyIsImhhbmRsZUtleURvd24iLCJ3aGljaCIsInNlbGVjdFByZXZpb3VzVG9rZW4iLCJzaGlmdEtleSIsInNlbGVjdE5leHRUb2tlbiIsInRva2Vuc1NlbGVjdGVkIiwicmVtb3ZlIiwibWV0YUtleSIsInByZXZlbnREZWZhdWx0IiwiX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uIiwiaGFuZGxlTmV3U2VsZWN0aW9uIiwib25LZXlEb3duIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldmlvdXNTZWxlY3RlZEluZGV4ZXMiLCJjdXJyZW50U2VsZWN0ZWRJbmRleGVzIiwiaW5kZXhlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsImlkeCIsImhhbmRsZVJlbW92ZVRva2VucyIsInNlbGVjdFRva2VuIiwic2VsZWN0VG9rZW5zIiwiYXBwZW5kIiwic2VsZWN0ZWQiLCJwcmV2aW91c1Rva2VuIiwiY29uY2F0IiwibmV4dFRva2VuIiwiaGFuZGxlVG9rZW5DbG9zZUNsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwidG9rZW5DbG9zZUNvbXBvbmVudCIsInJlbmRlclRva2VuQ2xvc2UiLCJ0b2tlbkNsb3NlVmlzaWJsZSIsImNsb25lRWxlbWVudCIsImNsYXNzTmFtZSIsIkJvb2xlYW4iLCJiaW5kIiwiaGFuZGxlVG9rZW5LZXlEb3duIiwicmVuZGVyVG9rZW5zIiwibWFwIiwiZW50aXRpZXMiLCJ0ZXh0IiwicmVuZGVyIiwiaW50ZXJuYWxLZXlzIiwicHJvcFR5cGVzIiwiUHVyZUNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJlbGVtZW50IiwiYm9vbCIsImFycmF5T2YiLCJudW1iZXIiLCJPYmplY3QiLCJrZXlzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFaQTs7Ozs7QUFjQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVE7QUFBQSxXQUFTQyxNQUFNLENBQU4sQ0FBVDtBQUFBLENBQWQ7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU87QUFBQSxXQUFTRCxNQUFNQSxNQUFNRSxNQUFOLEdBQWUsQ0FBckIsQ0FBVDtBQUFBLENBQWI7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O29LQXFEakJDLEssR0FBUTtBQUFBLG1CQUFNLE1BQUtDLElBQUwsQ0FBVUMsU0FBVixDQUFvQkYsS0FBcEIsRUFBTjtBQUFBLFMsUUFDUkcsWSxHQUFlO0FBQUEsbUJBQU0sTUFBS0YsSUFBTCxDQUFVQyxTQUFWLENBQW9CQyxZQUFwQixFQUFOO0FBQUEsUyxRQUNmQyxxQixHQUF3QjtBQUFBLG1CQUFNLE1BQUtILElBQUwsQ0FBVUMsU0FBVixDQUFvQkUscUJBQXBCLEVBQU47QUFBQSxTLFFBQ3hCQyxRLEdBQVc7QUFBQSxtQkFBTSxNQUFLSixJQUFMLENBQVVDLFNBQVYsQ0FBb0JHLFFBQXBCLEVBQU47QUFBQSxTLFFBQ1hDLE0sR0FBUztBQUFBLG1CQUFNLE1BQUtMLElBQUwsQ0FBVUMsU0FBVixDQUFvQkksTUFBcEIsRUFBTjtBQUFBLFMsUUFDVEMsUSxHQUFXO0FBQUEsbUJBQVMsTUFBS04sSUFB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eUNBQ08sS0FBS3hELEtBQUwsQ0FBV08sVUFEbEI7QUFFSUMsNkJBQVMsS0FBS0osZ0JBRmxCO0FBR0lNLDZCQUFTLEtBQUtEO0FBSGxCLGtCQUxKO0FBVUksa0NBQWtCLEtBQUtYLEdBVjNCO0FBVkosU0FESjtBQXdCSCxLOzs7RUF0UXlDLGdCQUFNMkQsYTs7QUFBL0JyRSxnQixDQUNWb0UsUyxnQkFDQSwyQkFBaUJBLFM7QUFDcEJyRCxvQkFBZ0IsZ0JBQU11RCxTQUFOLENBQWdCQyxJO0FBQ2hDM0Isd0JBQW9CLGdCQUFNMEIsU0FBTixDQUFnQkMsSTtBQUNwQ3RDLHdCQUFvQixnQkFBTXFDLFNBQU4sQ0FBZ0JDLEk7QUFDcENqQix5QkFBcUIsZ0JBQU1nQixTQUFOLENBQWdCRSxPO0FBQ3JDaEIsdUJBQW1CLGdCQUFNYyxTQUFOLENBQWdCRyxJO0FBQ25DNUQsWUFBUSxnQkFBTXlELFNBQU4sQ0FBZ0JJLE9BQWhCLENBQXdCLGdCQUFNSixTQUFOLENBQWdCSyxNQUF4QyxDO0FBQ1IvQyxvQkFBZ0IsZ0JBQU0wQyxTQUFOLENBQWdCSSxPQUFoQixDQUF3QixnQkFBTUosU0FBTixDQUFnQkssTUFBeEM7O0FBVEgzRSxnQixDQVlWbUUsWSxHQUFlUyxPQUFPQyxJQUFQLENBQVk3RSxpQkFBaUJvRSxTQUE3QixDO0FBWkxwRSxnQixDQWNWOEUsWSxnQkFDQSwyQkFBaUJBLFk7QUFDcEIvRCxrQztBQUNBNkIsc0M7QUFDQVgsc0M7QUFDQXFCLHlCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLEs7QUFDdEJFLHVCQUFtQixJO0FBQ25CM0MsWUFBUSxFO0FBQ1JlLG9CQUFnQjs7a0JBdEJINUIsZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgZXh0cmFjdENoaWxkUHJvcHMgZnJvbSAnLi4vVUlVdGlscy9leHRyYWN0Q2hpbGRQcm9wcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuQ2xvc2VDb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICB0b2tlbkNsb3NlVmlzaWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbkNsb3NlQ29tcG9uZW50OiAoPGRpdj5YPC9kaXY+KSxcbiAgICAgICAgdG9rZW5DbG9zZVZpc2libGU6IHRydWUsXG4gICAgICAgIHRva2VuczogW10sXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBbXSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICAvLyBwYXNzdGhyb3VnaHMgdG8gVUlUeXBlYWhlYWRJbnB1dCBpbnN0YW5jZSBtZXRob2RzXG4gICAgZm9jdXMgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKClcbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldElucHV0Tm9kZSgpXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRTZWxlY3RlZEVudGl0eVRleHQoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5nZXRWYWx1ZSgpXG4gICAgc2VsZWN0ID0gKCkgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZWxlY3QoKVxuICAgIHNldFZhbHVlID0gdmFsdWUgPT4gdGhpcy5yZWZzLnR5cGVhaGVhZC5zZXRWYWx1ZSh2YWx1ZSlcblxuICAgIGFkZCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7IHRoaXMucHJvcHMuaGFuZGxlQWRkVG9rZW4oaW5kZXgpOyB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSAoQXJyYXkuaXNBcnJheShpbmRleCkgPyBpbmRleCA6IFtpbmRleF0pLmZpbHRlcihpZHggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaWR4KSAhPT0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCkgeyB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZVRva2VucyhpbmRleGVzKTsgfVxuICAgIH1cblxuICAgIHNlbGVjdFRva2VuKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtpbmRleF0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRva2VucyhpbmRleGVzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKGluZGV4ZXMpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmICggICBzZWxlY3RlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGZpcnN0KHNlbGVjdGVkKSA9PT0gZmlyc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBhdCBsZWZ0bW9zdCBib3VuZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgeyAvLyBwaWNrIHRoZSByaWdodG1vc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4obGFzdChpbmRleGVzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGFkZCB0aGUgbmV4dCBsZWZ0bW9zdCB0byBhIHJlY29uc3RydWN0ZWQgXCJzZWxlY3RlZFwiIGFycmF5XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YoZmlyc3Qoc2VsZWN0ZWQpKSAtIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBbcHJldmlvdXNUb2tlbl0uY29uY2F0KHNlbGVjdGVkKSA6IFtwcmV2aW91c1Rva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VG9rZW4oYXBwZW5kKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IHRoaXMucHJvcHMudG9rZW5zO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0KHNlbGVjdGVkKSA9PT0gbGFzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFRva2VuID0gaW5kZXhlc1tpbmRleGVzLmluZGV4T2YobGFzdChzZWxlY3RlZCkpICsgMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IHNlbGVjdGVkLmNvbmNhdChuZXh0VG9rZW4pIDogW25leHRUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKFtdKTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbkNsb3NlQ2xpY2soaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHdlIGRvbid0IHN0b3AgcHJvcGFnYXRpb24sIHRoZSBldmVudCBidWJibGVzIGFuZCByZXN1bHRzIGluIGEgZmFpbGVkIHRva2VuIHNlbGVjdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LnByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5DbG9zZVZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy50b2tlbkNsb3NlQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLWNsb3NlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMudG9rZW5DbG9zZUNvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YHRva2VuXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbi1zZWxlY3RlZCc6IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQuaW5kZXhPZihpbmRleCkgIT09IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0VG9rZW4uYmluZCh0aGlzLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZVRva2VuS2V5RG93bi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRva2VuaXplZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUlucHV0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19