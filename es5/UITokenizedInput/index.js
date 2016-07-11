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

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _extractChildProps = require('../UIUtils/extractChildProps');

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

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

var UITokenizedInput = function (_UIView) {
    _inherits(UITokenizedInput, _UIView);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.focus = function () {
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
        }, _this.handleInputFocus = function (event) {
            _this.clearSelection();

            if (typeof _this.props.inputProps.onFocus === 'function') {
                event.persist();
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
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
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return _react2.default.createElement('div', {
                className: 'ui-tokenfield-token-close',
                onClick: this.handleTokenCloseClick.bind(this, index) });
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
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITokenizedInput.internal_keys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-wrapper': true
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, (0, _extractChildProps2.default)(this.props, _UITypeaheadInput2.default.propTypes), {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                clearPartialInputOnSelection: true,
                inputProps: _extends({}, this.props.inputProps, {
                    onFocus: this.handleInputFocus
                }),
                onEntitySelected: this.add }))
        );
    };

    return UITokenizedInput;
}(_UIView3.default);

UITokenizedInput.propTypes = _extends({}, _UITypeaheadInput2.default.propTypes, {
    handleAddToken: _react2.default.PropTypes.func,
    handleRemoveTokens: _react2.default.PropTypes.func,
    handleNewSelection: _react2.default.PropTypes.func,
    tokens: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    tokensSelected: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    showTokenClose: _react2.default.PropTypes.bool
});
UITokenizedInput.internal_keys = Object.keys(UITokenizedInput.propTypes);
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokens: [],
    tokensSelected: [],
    showTokenClose: true
});
exports.default = UITokenizedInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQU0sUUFBUSxTQUFSLEtBQVE7QUFBQSxXQUFTLE1BQU0sQ0FBTixDQUFUO0FBQUEsQ0FBZDtBQUNBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxXQUFTLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBVDtBQUFBLENBQWI7O0lBRXFCLGdCOzs7Ozs7Ozs7Ozs7MElBbURqQixLLEdBQVE7QUFBQSxtQkFBTSxNQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLEtBQXBCLEVBQU47QUFBQSxTLFFBQ1IsWSxHQUFlO0FBQUEsbUJBQU0sTUFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixZQUFwQixFQUFOO0FBQUEsUyxRQUNmLHFCLEdBQXdCO0FBQUEsbUJBQU0sTUFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixxQkFBcEIsRUFBTjtBQUFBLFMsUUFDeEIsUSxHQUFXO0FBQUEsbUJBQU0sTUFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixRQUFwQixFQUFOO0FBQUEsUyxRQUNYLE0sR0FBUztBQUFBLG1CQUFNLE1BQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsTUFBcEIsRUFBTjtBQUFBLFMsUUFDVCxRLEdBQVc7QUFBQSxtQkFBUyxNQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLFFBQXBCLENBQTZCLEtBQTdCLENBQVQ7QUFBQSxTLFFBRVgsRyxHQUFNLFVBQUMsS0FBRCxFQUFXO0FBQ2IsZ0JBQUksTUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixPQUFsQixDQUEwQixLQUExQixNQUFxQyxDQUFDLENBQTFDLEVBQTZDO0FBQUUsc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUI7QUFBbUM7QUFDckYsUyxRQTBERCxnQixH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O0FBQ1Isb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsZ0JBQU0sU0FBTixDQUFnQixNQUF4QyxDO0FBQ2hCLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCOztBQVJuQixnQixDQVdWLGEsR0FBZ0IsT0FBTyxJQUFQLENBQVksaUJBQWlCLFNBQTdCLEM7QUFYTixnQixDQWFWLFksZ0JBQ0EsMkJBQWlCLFk7QUFDcEIsa0M7QUFDQSxzQztBQUNBLHNDO0FBQ0EsWUFBUSxFO0FBQ1Isb0JBQWdCLEU7QUFDaEIsb0JBQWdCOztrQkFwQkgsZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFVJVHlwZWFoZWFkSW5wdXQgZnJvbSAnLi4vVUlUeXBlYWhlYWRJbnB1dCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGV4dHJhY3RDaGlsZFByb3BzIGZyb20gJy4uL1VJVXRpbHMvZXh0cmFjdENoaWxkUHJvcHMnO1xuXG5cbmNvbnN0IGZpcnN0ID0gYXJyYXkgPT4gYXJyYXlbMF07XG5jb25zdCBsYXN0ID0gYXJyYXkgPT4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVG9rZW5pemVkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzLFxuICAgICAgICBoYW5kbGVBZGRUb2tlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2VuczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRva2VuczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIHRva2Vuc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICAgICAgc2hvd1Rva2VuQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbF9rZXlzID0gT2JqZWN0LmtleXMoVUlUb2tlbml6ZWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVR5cGVhaGVhZElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaGFuZGxlQWRkVG9rZW46IG5vb3AsXG4gICAgICAgIGhhbmRsZVJlbW92ZVRva2Vuczogbm9vcCxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBub29wLFxuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICB0b2tlbnNTZWxlY3RlZDogW10sXG4gICAgICAgIHNob3dUb2tlbkNsb3NlOiB0cnVlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgPSBwcmV2UHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5sZW5ndGggPiBwcmV2UHJvcHMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3VwcHJlc3NOZXh0VG9rZW5TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICBwcmV2aW91c1NlbGVjdGVkSW5kZXhlcyAhPT0gY3VycmVudFNlbGVjdGVkSW5kZXhlc1xuICAgICAgICAgICAgJiYgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGlmICggICBjdXJyZW50U2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICB8fCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdICE9PSBwcmV2aW91c1NlbGVjdGVkSW5kZXhlc1swXSAvKiBtdWx0aSBzZWxlY3Rpb24sIGxlZnR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QoY3VycmVudFNlbGVjdGVkSW5kZXhlcykgIT09IGxhc3QocHJldmlvdXNTZWxlY3RlZEluZGV4ZXMpIC8qIG11bHRpIHNlbGVjdGlvbiwgcmlnaHR3YXJkICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmc1tgdG9rZW5fJHtsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpfWBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVmc1tgdG9rZW5fJHtjdXJyZW50U2VsZWN0ZWRJbmRleGVzWzBdfWBdLmZvY3VzKCk7XG4gICAgICAgIH0gLy8gbW92ZSBmb2N1c1xuICAgIH1cblxuICAgIC8vIHBhc3N0aHJvdWdocyB0byBVSVR5cGVhaGVhZElucHV0IGluc3RhbmNlIG1ldGhvZHNcbiAgICBmb2N1cyA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKVxuICAgIGdldElucHV0Tm9kZSA9ICgpID0+IHRoaXMucmVmcy50eXBlYWhlYWQuZ2V0SW5wdXROb2RlKClcbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLmdldFZhbHVlKClcbiAgICBzZWxlY3QgPSAoKSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNlbGVjdCgpXG4gICAgc2V0VmFsdWUgPSB2YWx1ZSA9PiB0aGlzLnJlZnMudHlwZWFoZWFkLnNldFZhbHVlKHZhbHVlKVxuXG4gICAgYWRkID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHsgdGhpcy5wcm9wcy5oYW5kbGVBZGRUb2tlbihpbmRleCk7IH1cbiAgICB9XG5cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IChBcnJheS5pc0FycmF5KGluZGV4KSA/IGluZGV4IDogW2luZGV4XSkuZmlsdGVyKGlkeCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50b2tlbnMuaW5kZXhPZihpZHgpICE9PSAtMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoKSB7IHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlVG9rZW5zKGluZGV4ZXMpOyB9XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW4oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW2luZGV4XSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9rZW5zKGluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oaW5kZXhlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKCAgIHNlbGVjdGVkLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgJiYgZmlyc3Qoc2VsZWN0ZWQpID09PSBmaXJzdChpbmRleGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGF0IGxlZnRtb3N0IGJvdW5kXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7IC8vIHBpY2sgdGhlIHJpZ2h0bW9zdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihsYXN0KGluZGV4ZXMpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYWRkIHRoZSBuZXh0IGxlZnRtb3N0IHRvIGEgcmVjb25zdHJ1Y3RlZCBcInNlbGVjdGVkXCIgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihmaXJzdChzZWxlY3RlZCkpIC0gMV07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW5zKGFwcGVuZCA/IFtwcmV2aW91c1Rva2VuXS5jb25jYXQoc2VsZWN0ZWQpIDogW3ByZXZpb3VzVG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUb2tlbihhcHBlbmQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qoc2VsZWN0ZWQpID09PSBsYXN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VG9rZW4gPSBpbmRleGVzW2luZGV4ZXMuaW5kZXhPZihsYXN0KHNlbGVjdGVkKSkgKyAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gc2VsZWN0ZWQuY29uY2F0KG5leHRUb2tlbikgOiBbbmV4dFRva2VuXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVOZXdTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDM3OiAgICAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFByZXZpb3VzVG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOTogICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dFRva2VuKGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogICAgIC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY1OiAgICAvLyBsZXR0ZXIgXCJhXCJcbiAgICAgICAgICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFja3ksIGJ1dCB0aGUgb25seSB3YXkgdW5sZXNzIHdlIG1vdmUgc2VsZWN0aW9uIG1hbmFnZW1lbnQgaW50ZXJuYWwgYWdhaW5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbih0aGlzLnByb3BzLnRva2Vucyk7XG4gICAgICAgICAgICB9IC8vIFwiY21kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc3RvcCBwcm9wYWdhdGlvbiwgdGhlIGV2ZW50IGJ1YmJsZXMgYW5kIHJlc3VsdHMgaW4gYSBmYWlsZWQgdG9rZW4gc2VsZWN0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1Rva2VuQ2xvc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9rZW5DbG9zZUNsaWNrLmJpbmQodGhpcywgaW5kZXgpfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRva2VuS2V5RG93bihpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICBjYXNlIDMyOiAvLyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbihpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAvLyBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRva2VucygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkLXRva2Vucyc+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9rZW5zLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgdG9rZW5fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRva2VuZmllbGQtdG9rZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3RUb2tlbi5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbnRpdGllc1tpbmRleF0udGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbkNsb3NlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVG9rZW5pemVkSW5wdXQuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5zKCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHModGhpcy5wcm9wcywgVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS10b2tlbmZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ9e3RoaXMuYWRkfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19