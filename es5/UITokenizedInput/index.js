'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UITypeaheadInput = require('../UITypeaheadInput');

var _UITypeaheadInput2 = _interopRequireDefault(_UITypeaheadInput);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var UITokenizedInput = function (_UIView) {
    _inherits(UITokenizedInput, _UIView);

    function UITokenizedInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITokenizedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.add = function (index) {
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
                        _this.refs.typeahead.focus();
                    }

                    break;

                case 65:
                    // letter "a"
                    if (event.metaKey) {
                        event.preventDefault();

                        _this.refs.typeahead.focus();
                        _this.refs.typeahead.select();

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
            this.refs.typeahead.value('');
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
            this.refs.typeahead.focus();
        } else {
            var nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.selectTokens(append ? selected.concat(nextToken) : [nextToken]);
        }
    };

    UITokenizedInput.prototype.clearSelection = function clearSelection() {
        this.props.handleNewSelection([]);
    };

    UITokenizedInput.prototype.handleTokenCloseClick = function handleTokenCloseClick(index) {
        this.remove(index);
        this.refs.typeahead.focus();
    };

    UITokenizedInput.prototype.renderTokenClose = function renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return _react2.default.createElement('div', { className: 'ui-tokenfield-token-close',
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
                this.handleTokenCloseClick(index);
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
                    { ref: 'token_' + index,
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
        var _this4 = this,
            _cx;

        var descendants = Object.keys(_UITypeaheadInput2.default.propTypes).reduce(function (props, key) {
            props[key] = _this4.props[key];

            return props;
        }, {});

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-tokenfield-wrapper': true
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                onKeyDown: this.handleKeyDown }),
            this.renderTokens(),
            _react2.default.createElement(_UITypeaheadInput2.default, _extends({}, descendants, {
                ref: 'typeahead',
                className: 'ui-tokenfield',
                onEntitySelected: this.add,
                onFocus: this.handleInputFocus,
                clearPartialInputOnSelection: true }))
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
UITokenizedInput.defaultProps = _extends({}, _UITypeaheadInput2.default.defaultProps, {
    handleAddToken: _noop2.default,
    handleRemoveTokens: _noop2.default,
    handleNewSelection: _noop2.default,
    tokens: [],
    tokensSelected: [],
    showTokenClose: true
});
exports.default = UITokenizedInput;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVG9rZW5pemVkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLElBQU0sUUFBUSxTQUFSLEtBQVE7V0FBUyxNQUFNLENBQU47Q0FBVDtBQUNkLElBQU0sT0FBTyxTQUFQLElBQU87V0FBUyxNQUFNLE1BQU0sTUFBTixHQUFlLENBQWY7Q0FBZjs7SUFFUTs7Ozs7Ozs7Ozs7OzBJQWdEakIsTUFBTSxVQUFDLEtBQUQsRUFBVztBQUNiLGdCQUFJLE1BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsT0FBbEIsQ0FBMEIsS0FBMUIsTUFBcUMsQ0FBQyxDQUFELEVBQUk7QUFBRSxzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQixFQUFGO2FBQTdDO1NBREUsUUE0RE4sbUJBQW1CLFVBQUMsS0FBRCxFQUFXO0FBQzFCLGtCQUFLLGNBQUwsR0FEMEI7O0FBRzFCLGdCQUFJLE9BQU8sTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUF0QixLQUFrQyxVQUF6QyxFQUFxRDtBQUNyRCxzQkFBTSxPQUFOLEdBRHFEO0FBRXJELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLENBQThCLEtBQTlCLEVBRnFEO2FBQXpEO1NBSGUsUUFTbkIsZ0JBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3ZCLG9CQUFRLE1BQU0sS0FBTjtBQUNSLHFCQUFLLEVBQUw7O0FBQ0ksMEJBQUssbUJBQUwsQ0FBeUIsTUFBTSxRQUFOLENBQXpCLENBREo7QUFFSSwwQkFGSjs7QUFEQSxxQkFLSyxFQUFMOztBQUNJLDBCQUFLLGVBQUwsQ0FBcUIsTUFBTSxRQUFOLENBQXJCLENBREo7QUFFSSwwQkFGSjs7QUFMQSxxQkFTSyxDQUFMOztBQUNJLHdCQUFJLE1BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsTUFBMUIsRUFBa0M7QUFDbEMsOEJBQUssTUFBTCxDQUFZLE1BQUssS0FBTCxDQUFXLGNBQVgsQ0FBWixDQURrQztBQUVsQyw4QkFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixLQUFwQixHQUZrQztxQkFBdEM7O0FBS0EsMEJBTko7O0FBVEEscUJBaUJLLEVBQUw7O0FBQ0ksd0JBQUksTUFBTSxPQUFOLEVBQWU7QUFDZiw4QkFBTSxjQUFOLEdBRGU7O0FBR2YsOEJBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsS0FBcEIsR0FIZTtBQUlmLDhCQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLE1BQXBCOzs7QUFKZSw2QkFPZixDQUFLLDJCQUFMLEdBQW1DLElBQW5DLENBUGU7O0FBU2YsOEJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE1BQUssS0FBTCxDQUFXLE1BQVgsQ0FBOUIsQ0FUZTtxQkFBbkI7QUFsQkosYUFEdUI7O0FBZ0N2QixnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsVUFBaEMsRUFBNEM7QUFDNUMsc0JBQU0sT0FBTixHQUQ0QztBQUU1QyxzQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQixFQUY0QzthQUFoRDtTQWhDWTs7O0FBckhDLCtCQXFCakIsaURBQW1CLFdBQVc7QUFDMUIsWUFBTSwwQkFBMEIsVUFBVSxjQUFWLENBRE47QUFFMUIsWUFBTSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUZMOztBQUkxQixZQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEIsR0FBMkIsVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCO0FBQ3BELGlCQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLEtBQXBCLENBQTBCLEVBQTFCLEVBRG9EO1NBQXhEOztBQUlBLFlBQUksS0FBSywyQkFBTCxFQUFrQztBQUNsQyxpQkFBSywyQkFBTCxHQUFtQyxLQUFuQyxDQURrQzs7QUFHbEMsbUJBSGtDO1NBQXRDOztBQU1BLFlBQU8sNEJBQTRCLHNCQUE1QixJQUNBLHVCQUF1QixNQUF2QixLQUFrQyxDQUFsQyxFQUFxQztBQUN4QyxnQkFBTyx1QkFBdUIsTUFBdkIsS0FBa0MsQ0FBbEMsSUFDTyx1QkFBdUIsQ0FBdkIsTUFBOEIsd0JBQXdCLENBQXhCLENBQTlCLGdDQURkLEVBQ3dHO0FBQ3BHLDJCQUFPLEtBQUssSUFBTCxZQUFtQix1QkFBdUIsQ0FBdkIsQ0FBbkIsRUFBZ0QsS0FBaEQsRUFBUCxDQURvRztpQkFEeEcsTUFHTyxJQUFJLEtBQUssc0JBQUwsTUFBaUMsS0FBSyx1QkFBTCxDQUFqQyxpQ0FBSixFQUFxRztBQUN4RywyQkFBTyxLQUFLLElBQUwsWUFBbUIsS0FBSyxzQkFBTCxDQUFuQixFQUFtRCxLQUFuRCxFQUFQLENBRHdHO2lCQUFyRzs7QUFJUCxpQkFBSyxJQUFMLFlBQW1CLHVCQUF1QixDQUF2QixDQUFuQixFQUFnRCxLQUFoRCxHQVJ3QztTQUQ1QztBQWQwQjs7QUFyQmIsK0JBb0RqQix5QkFBTyxPQUFPOzs7QUFDVixZQUFNLFVBQVUsQ0FBQyxNQUFNLE9BQU4sQ0FBYyxLQUFkLElBQXVCLEtBQXZCLEdBQStCLENBQUMsS0FBRCxDQUEvQixDQUFELENBQXlDLE1BQXpDLENBQWdELGVBQU87QUFDbkUsbUJBQU8sT0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixPQUFsQixDQUEwQixHQUExQixNQUFtQyxDQUFDLENBQUQsQ0FEeUI7U0FBUCxDQUExRCxDQURJOztBQUtWLFlBQUksUUFBUSxNQUFSLEVBQWdCO0FBQUUsaUJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE9BQTlCLEVBQUY7U0FBcEI7OztBQXpEYSwrQkE0RGpCLG1DQUFZLE9BQU87QUFDZixhQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUFDLEtBQUQsQ0FBOUIsRUFEZTs7O0FBNURGLCtCQWdFakIscUNBQWEsU0FBUztBQUNsQixhQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixPQUE5QixFQURrQjs7O0FBaEVMLCtCQW9FakIsbURBQW9CLFFBQVE7QUFDeEIsWUFBTSxXQUFXLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FETztBQUV4QixZQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZROztBQUl4QixZQUFPLFNBQVMsTUFBVCxLQUFvQixDQUFwQixJQUNBLE1BQU0sUUFBTixNQUFvQixNQUFNLE9BQU4sQ0FBcEIsRUFBb0M7QUFDdkM7QUFEdUMsU0FEM0M7O0FBS0EsWUFBSSxTQUFTLE1BQVQsS0FBb0IsQ0FBcEIsRUFBdUI7O0FBQ3ZCLGlCQUFLLFdBQUwsQ0FBaUIsS0FBSyxPQUFMLENBQWpCLEVBRHVCO1NBQTNCLE1BRU87O0FBQ0gsZ0JBQU0sZ0JBQWdCLFFBQVEsUUFBUSxPQUFSLENBQWdCLE1BQU0sUUFBTixDQUFoQixJQUFtQyxDQUFuQyxDQUF4QixDQURIOztBQUdILGlCQUFLLFlBQUwsQ0FBa0IsU0FBUyxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsQ0FBdUIsUUFBdkIsQ0FBVCxHQUE0QyxDQUFDLGFBQUQsQ0FBNUMsQ0FBbEIsQ0FIRztTQUZQOzs7QUE3RWEsK0JBc0ZqQiwyQ0FBZ0IsUUFBUTtBQUNwQixZQUFNLFdBQVcsS0FBSyxLQUFMLENBQVcsY0FBWCxDQURHO0FBRXBCLFlBQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBRkk7O0FBSXBCLFlBQUksU0FBUyxNQUFULEtBQW9CLENBQXBCLEVBQXVCO0FBQ3ZCLG1CQUR1QjtTQUEzQjs7QUFJQSxZQUFJLEtBQUssUUFBTCxNQUFtQixLQUFLLE9BQUwsQ0FBbkIsRUFBa0M7QUFDbEMsaUJBQUssY0FBTCxHQURrQztBQUVsQyxpQkFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixLQUFwQixHQUZrQztTQUF0QyxNQUdPO0FBQ0gsZ0JBQU0sWUFBWSxRQUFRLFFBQVEsT0FBUixDQUFnQixLQUFLLFFBQUwsQ0FBaEIsSUFBa0MsQ0FBbEMsQ0FBcEIsQ0FESDs7QUFHSCxpQkFBSyxZQUFMLENBQWtCLFNBQVMsU0FBUyxNQUFULENBQWdCLFNBQWhCLENBQVQsR0FBc0MsQ0FBQyxTQUFELENBQXRDLENBQWxCLENBSEc7U0FIUDs7O0FBOUZhLCtCQXdHakIsMkNBQWlCO0FBQ2IsYUFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsRUFBOUIsRUFEYTs7O0FBeEdBLCtCQTJKakIsdURBQXNCLE9BQU87QUFDekIsYUFBSyxNQUFMLENBQVksS0FBWixFQUR5QjtBQUV6QixhQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLEtBQXBCLEdBRnlCOzs7QUEzSlosK0JBZ0tqQiw2Q0FBaUIsT0FBTztBQUNwQixZQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsRUFBMkI7QUFDM0IsbUJBQ0ksdUNBQUssV0FBVSwyQkFBVjtBQUNBLHlCQUFTLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0MsS0FBdEMsQ0FBVCxFQURMLENBREosQ0FEMkI7U0FBL0I7OztBQWpLYSwrQkF5S2pCLGlEQUFtQixPQUFPLE9BQU87QUFDN0IsZ0JBQVEsTUFBTSxLQUFOO0FBQ1IsaUJBQUssRUFBTDtBQURBLGlCQUVLLEVBQUw7O0FBQ0kscUJBQUssV0FBTCxDQUFpQixLQUFqQixFQURKO0FBRUksc0JBQU0sY0FBTixHQUZKO0FBR0ksc0JBSEo7O0FBRkEsaUJBT0ssQ0FBTDs7QUFDSSxxQkFBSyxxQkFBTCxDQUEyQixLQUEzQixFQURKO0FBRUksc0JBQU0sY0FBTixHQUZKO0FBR0ksc0JBSEo7QUFQQSxTQUQ2Qjs7O0FBektoQiwrQkF3TGpCLHVDQUFlOzs7QUFDWCxlQUNJOztjQUFLLFdBQVUsc0JBQVYsRUFBTDtZQUNLLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FBc0IsaUJBQVM7QUFDNUIsdUJBQ0k7O3NCQUFLLGdCQUFjLEtBQWQ7QUFDQSw2QkFBSyxLQUFMO0FBQ0EsbUNBQVcsMEJBQUc7QUFDWCxtREFBdUIsSUFBdkI7QUFDQSw0REFBZ0MsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixPQUExQixDQUFrQyxLQUFsQyxNQUE2QyxDQUFDLENBQUQ7eUJBRnJFLENBQVg7QUFJQSxpQ0FBUyxPQUFLLFdBQUwsQ0FBaUIsSUFBakIsU0FBNEIsS0FBNUIsQ0FBVDtBQUNBLG1DQUFXLE9BQUssa0JBQUwsQ0FBd0IsSUFBeEIsU0FBbUMsS0FBbkMsQ0FBWDtBQUNBLGtDQUFTLEdBQVQsRUFSTDtvQkFTSyxPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCO29CQUNBLE9BQUssZ0JBQUwsQ0FBc0IsS0FBdEIsQ0FWTDtpQkFESixDQUQ0QjthQUFULENBRDNCO1NBREosQ0FEVzs7O0FBeExFLCtCQStNakIsMkJBQVM7Ozs7QUFDTCxZQUFNLGNBQWMsT0FBTyxJQUFQLENBQVksMkJBQWlCLFNBQWpCLENBQVosQ0FBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUMvRSxrQkFBTSxHQUFOLElBQWEsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFiLENBRCtFOztBQUcvRSxtQkFBTyxLQUFQLENBSCtFO1NBQWhCLEVBSWhFLEVBSmlCLENBQWQsQ0FERDs7QUFPTCxlQUNJOzt5QkFBUyxLQUFLLEtBQUw7QUFDSixxQkFBSSxTQUFKO0FBQ0EsMkJBQVc7QUFDUCw2Q0FBeUIsSUFBekI7dUJBQ0MsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF1QixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBWCxNQUZuQixDQUFYO0FBSUEsMkJBQVcsS0FBSyxhQUFMLEdBTmhCO1lBT0ssS0FBSyxZQUFMLEVBUEw7WUFTSSx1RUFBc0I7QUFDSixxQkFBSSxXQUFKO0FBQ0EsMkJBQVUsZUFBVjtBQUNBLGtDQUFrQixLQUFLLEdBQUw7QUFDbEIseUJBQVMsS0FBSyxnQkFBTDtBQUNULDhDQUE4QixJQUE5QixHQUxsQixDQVRKO1NBREosQ0FQSzs7O1dBL01ROzs7aUJBQ1YseUJBQ0EsMkJBQWlCLFNBQWpCO0FBQ0gsb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDaEIsd0JBQW9CLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDcEIsd0JBQW9CLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDcEIsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE9BQWhCLENBQXdCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBaEM7QUFDQSxvQkFBZ0IsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXhDO0FBQ0Esb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBUkgsaUJBV1YsNEJBQ0EsMkJBQWlCLFlBQWpCO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsWUFBUSxFQUFSO0FBQ0Esb0JBQWdCLEVBQWhCO0FBQ0Esb0JBQWdCLElBQWhCOztrQkFsQmEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERpc3RpbGwgcmljaCBlbnRpdHkgZGF0YSBtYXRjaGVkIHZpYSB0eXBlYWhlYWQgaW5wdXQgaW50byBzaW1wbGUgdmlzdWFsIGFic3RyYWN0aW9ucy5cbiAqIEBjbGFzcyBVSVRva2VuaXplZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVR5cGVhaGVhZElucHV0IGZyb20gJy4uL1VJVHlwZWFoZWFkSW5wdXQnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY29uc3QgZmlyc3QgPSBhcnJheSA9PiBhcnJheVswXTtcbmNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUb2tlbml6ZWRJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGFuZGxlUmVtb3ZlVG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaGFuZGxlTmV3U2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdG9rZW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICAgICAgdG9rZW5zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICAgICAgICBzaG93VG9rZW5DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhbmRsZUFkZFRva2VuOiBub29wLFxuICAgICAgICBoYW5kbGVSZW1vdmVUb2tlbnM6IG5vb3AsXG4gICAgICAgIGhhbmRsZU5ld1NlbGVjdGlvbjogbm9vcCxcbiAgICAgICAgdG9rZW5zOiBbXSxcbiAgICAgICAgdG9rZW5zU2VsZWN0ZWQ6IFtdLFxuICAgICAgICBzaG93VG9rZW5DbG9zZTogdHJ1ZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzID0gcHJldlByb3BzLnRva2Vuc1NlbGVjdGVkO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWRJbmRleGVzID0gdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnMubGVuZ3RoID4gcHJldlByb3BzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQudmFsdWUoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBwcmVzc05leHRUb2tlblNlbGVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICAgcHJldmlvdXNTZWxlY3RlZEluZGV4ZXMgIT09IGN1cnJlbnRTZWxlY3RlZEluZGV4ZXNcbiAgICAgICAgICAgICYmIGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoICAgY3VycmVudFNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgfHwgY3VycmVudFNlbGVjdGVkSW5kZXhlc1swXSAhPT0gcHJldmlvdXNTZWxlY3RlZEluZGV4ZXNbMF0gLyogbXVsdGkgc2VsZWN0aW9uLCBsZWZ0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0KGN1cnJlbnRTZWxlY3RlZEluZGV4ZXMpICE9PSBsYXN0KHByZXZpb3VzU2VsZWN0ZWRJbmRleGVzKSAvKiBtdWx0aSBzZWxlY3Rpb24sIHJpZ2h0d2FyZCAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbYHRva2VuXyR7bGFzdChjdXJyZW50U2VsZWN0ZWRJbmRleGVzKX1gXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnNbYHRva2VuXyR7Y3VycmVudFNlbGVjdGVkSW5kZXhlc1swXX1gXS5mb2N1cygpO1xuICAgICAgICB9IC8vIG1vdmUgZm9jdXNcbiAgICB9XG5cbiAgICBhZGQgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG9rZW5zLmluZGV4T2YoaW5kZXgpID09PSAtMSkgeyB0aGlzLnByb3BzLmhhbmRsZUFkZFRva2VuKGluZGV4KTsgfVxuICAgIH1cblxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gKEFycmF5LmlzQXJyYXkoaW5kZXgpID8gaW5kZXggOiBbaW5kZXhdKS5maWx0ZXIoaWR4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRva2Vucy5pbmRleE9mKGlkeCkgIT09IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGgpIHsgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmVUb2tlbnMoaW5kZXhlcyk7IH1cbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbihpbmRleCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUb2tlbnMoaW5kZXhlcykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihpbmRleGVzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1Rva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoICAgc2VsZWN0ZWQubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAmJiBmaXJzdChzZWxlY3RlZCkgPT09IGZpcnN0KGluZGV4ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgYXQgbGVmdG1vc3QgYm91bmRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHsgLy8gcGljayB0aGUgcmlnaHRtb3N0XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VuKGxhc3QoaW5kZXhlcykpO1xuICAgICAgICB9IGVsc2UgeyAvLyBhZGQgdGhlIG5leHQgbGVmdG1vc3QgdG8gYSByZWNvbnN0cnVjdGVkIFwic2VsZWN0ZWRcIiBhcnJheVxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGZpcnN0KHNlbGVjdGVkKSkgLSAxXTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUb2tlbnMoYXBwZW5kID8gW3ByZXZpb3VzVG9rZW5dLmNvbmNhdChzZWxlY3RlZCkgOiBbcHJldmlvdXNUb2tlbl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRva2VuKGFwcGVuZCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMudG9rZW5zU2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLnByb3BzLnRva2VucztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdChzZWxlY3RlZCkgPT09IGxhc3QoaW5kZXhlcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUb2tlbiA9IGluZGV4ZXNbaW5kZXhlcy5pbmRleE9mKGxhc3Qoc2VsZWN0ZWQpKSArIDFdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRva2VucyhhcHBlbmQgPyBzZWxlY3RlZC5jb25jYXQobmV4dFRva2VuKSA6IFtuZXh0VG9rZW5dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZU5ld1NlbGVjdGlvbihbXSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6ICAgIC8vIGxlZnQgYXJyb3dcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNUb2tlbihldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM5OiAgICAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0VG9rZW4oZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OiAgICAgLy8gYmFja3NwYWNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnByb3BzLnRva2Vuc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMudHlwZWFoZWFkLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjU6ICAgIC8vIGxldHRlciBcImFcIlxuICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy50eXBlYWhlYWQuc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBoYWNreSwgYnV0IHRoZSBvbmx5IHdheSB1bmxlc3Mgd2UgbW92ZSBzZWxlY3Rpb24gbWFuYWdlbWVudCBpbnRlcm5hbCBhZ2FpblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cHByZXNzTmV4dFRva2VuU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlTmV3U2VsZWN0aW9uKHRoaXMucHJvcHMudG9rZW5zKTtcbiAgICAgICAgICAgIH0gLy8gXCJjbWRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG9rZW5DbG9zZUNsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgdGhpcy5yZWZzLnR5cGVhaGVhZC5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlbmRlclRva2VuQ2xvc2UoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1Rva2VuQ2xvc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQtdG9rZW4tY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljay5iaW5kKHRoaXMsIGluZGV4KX0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb2tlbktleURvd24oaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VG9rZW4oaW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODogLy8gYmFja3NwYWNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRva2VuQ2xvc2VDbGljayhpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdG9rZW5maWVsZC10b2tlbnMnPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRva2Vucy5tYXAoaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e2B0b2tlbl8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdG9rZW5maWVsZC10b2tlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXRva2VuLXNlbGVjdGVkJzogdGhpcy5wcm9wcy50b2tlbnNTZWxlY3RlZC5pbmRleE9mKGluZGV4KSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdFRva2VuLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlVG9rZW5LZXlEb3duLmJpbmQodGhpcywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVG9rZW5DbG9zZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcykucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdGhpcy5wcm9wc1trZXldO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10b2tlbmZpZWxkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUb2tlbnMoKX1cblxuICAgICAgICAgICAgICAgIDxVSVR5cGVhaGVhZElucHV0IHsuLi5kZXNjZW5kYW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3R5cGVhaGVhZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXRva2VuZmllbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRpdHlTZWxlY3RlZD17dGhpcy5hZGR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb249e3RydWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=