'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UITextualInput = require('../UITextualInput');

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _extractChildProps = require('../UIUtils/extractChildProps');

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require('../UIUtils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require('../UIUtils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITypeaheadInput = function (_React$PureComponent) {
    _inherits(UITypeaheadInput, _React$PureComponent);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.inputProps.value || this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.updateInputState(nextProps.inputProps.value);
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentDidMount = function componentDidMount() {
        if (this.state.selectedEntityIndex >= 0) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
            this.refs.matches.scrollTop = 0;
        } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop

        if (this.state.selectedEntityIndex >= 0 && this.props.entities[this.state.selectedEntityIndex] !== prevProps.entities[prevState.selectedEntityIndex]) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    };

    UITypeaheadInput.prototype.handleMatchClick = function handleMatchClick(index) {
        this.setState(function (state) {
            return _extends({}, state, { selectedEntityIndex: index });
        }, this.setValueWithSelectedEntity);
    };

    UITypeaheadInput.prototype.selectMatch = function selectMatch(delta) {
        var _this2 = this;

        var matches = this.state.entityMatchIndexes;
        var totalMatches = matches.length;
        var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            (function () {
                if (nextIndex < 0) {
                    nextIndex = totalMatches - 1; // reverse loop
                } else if (nextIndex >= totalMatches) {
                    nextIndex = 0; // loop
                }

                var matchIndex = matches[nextIndex];
                var matchesNode = _this2.refs.matches;
                var matchesNodeYEnd = matchesNode.scrollTop + matchesNode.clientHeight;
                var matchNode = _this2.refs['match_$' + matchIndex];
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

                _this2.setState(function (state) {
                    return _extends({}, state, { selectedEntityIndex: matchIndex });
                });
            })();
        }
    };

    UITypeaheadInput.prototype.cursorAtEndOfInput = function cursorAtEndOfInput() {
        var node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === this.getValue().length;
    };

    UITypeaheadInput.prototype.markFuzzyMatchSubstring = function markFuzzyMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var frags = entityContent.split(new RegExp('(' + (0, _escapeStringRegexp2.default)(input) + ')', 'ig'));
        var normalizedUserText = input.toLowerCase();
        var threshold = frags.length;
        var i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = _react2.default.createElement(
                    'mark',
                    { key: i, className: 'ui-typeahead-match-highlight' },
                    frags[i]
                );
            }
        }

        return frags;
    };

    UITypeaheadInput.prototype.markStartsWithMatchSubstring = function markStartsWithMatchSubstring(input, entity) {
        var entityContent = entity.text;
        var seekValue = input.toLowerCase();
        var indexStart = entityContent.toLowerCase().indexOf(seekValue);
        var indexEnd = indexStart + seekValue.length;

        return [_react2.default.createElement(
            'span',
            { key: '0' },
            entityContent.slice(0, indexStart)
        ), _react2.default.createElement(
            'mark',
            { key: '1', className: 'ui-typeahead-match-highlight' },
            entityContent.slice(indexStart, indexEnd)
        ), _react2.default.createElement(
            'span',
            { key: '2' },
            entityContent.slice(indexEnd)
        )];
    };

    UITypeaheadInput.prototype.getMarkingFunction = function getMarkingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;
        } else if ((0, _isFunction2.default)(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (this.warnedMarker === undefined) {
            this.warnedMarker = true;
            console.warn('UITypeaheadInput: no `props.algorithm.marker` was provided; falling back to the default marking algorithm (FUZZY).');
        }

        return this.markFuzzyMatchSubstring;
    };

    UITypeaheadInput.prototype.getFuzzyMatchIndexes = function getFuzzyMatchIndexes(userText, entities) {
        var normalized = userText.toLowerCase();

        return entities.reduce(function findIndexes(result, entity, index) {
            return entity.text.toLowerCase().indexOf(normalized) !== -1 ? result.push(index) && result : result;
        }, []);
    };

    UITypeaheadInput.prototype.getStartsWithMatchIndexes = function getStartsWithMatchIndexes(userText, entities) {
        var seekValue = userText.toLowerCase();

        return entities.reduce(function seekMatch(results, entity, index) {
            if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                results.push(index);
            }

            return results;
        }, []);
    };

    UITypeaheadInput.prototype.getMatchingFunction = function getMatchingFunction() {
        if ((0, _isString2.default)(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;
        } else if ((0, _isFunction2.default)(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (this.warnedMatcher === undefined) {
            this.warnedMatcher = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches(providedEntities) {
        var _this3 = this;

        this.setState(function (state, props) {
            var entities = providedEntities || props.entities;
            var currentValue = state.input;
            var matches = currentValue === '' ? [] : _this3.getMatchIndexes(currentValue, entities);

            return _extends({}, state, {
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches
            });
        });
    };

    UITypeaheadInput.prototype.renderNotification = function renderNotification() {
        return _react2.default.createElement(
            'div',
            {
                ref: 'aria',
                id: this.state.id,
                className: this.props.offscreenClass,
                'aria-live': 'polite' },
            this.getSelectedEntityText()
        );
    };

    UITypeaheadInput.prototype.renderHint = function renderHint() {
        if (this.props.hint) {
            var _cx;

            var userText = this.state.input;
            var raw = this.getSelectedEntityText();
            var processed = '';

            if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.hintProps, {
                    ref: 'hint',
                    className: (0, _classnames2.default)((_cx = {
                        'ui-textual-input': true,
                        'ui-textual-input-placeholder': true,
                        'ui-typeahead-hint': true
                    }, _cx[this.props.hintProps.className] = !!this.props.hintProps.className, _cx)),
                    tabIndex: '-1' }),
                processed
            );
        }
    };

    UITypeaheadInput.prototype.renderMatches = function renderMatches() {
        var _this4 = this;

        if (this.state.entityMatchIndexes.length) {
            var _cx2;

            var props = this.props.matchWrapperProps;

            return _react2.default.createElement(
                'div',
                _extends({}, props, {
                    ref: 'matches',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-typeahead-match-wrapper': true
                    }, _cx2[props.className] = !!props.className, _cx2)) }),
                this.state.entityMatchIndexes.map(function (index) {
                    var _cx3;

                    var entity = _this4.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this4.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this4.handleMatchClick.bind(_this4, index) }),
                        _this4.markMatchSubstring(_this4.state.input, entity)
                    );
                })
            );
        }
    };

    UITypeaheadInput.prototype.render = function render() {
        var _cx4, _cx5;

        var props = this.props;
        var state = this.state;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(props, UITypeaheadInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[props.className] = !!props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement(_UITextualInput2.default, _extends({}, (0, _extractChildProps2.default)(props, _UITextualInput2.default.propTypes), {
                ref: 'input',
                'aria-controls': state.id,
                inputProps: _extends({}, props.inputProps, {
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-typeahead': true
                    }, _cx5[props.inputProps.className] = !!props.inputProps.className, _cx5)),
                    onChange: this.handleChange
                }) })),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_react2.default.PureComponent);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = _extends({}, _UITextualInput2.default.propTypes, {
    algorithm: _react.PropTypes.oneOfType([_react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react.PropTypes.shape({
        marker: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])]),
        matcher: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY])])
    })]),
    clearPartialInputOnSelection: _react.PropTypes.bool,
    entities: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        text: _react.PropTypes.string
    })),
    hint: _react.PropTypes.bool,
    hintProps: _react.PropTypes.object,
    matchWrapperProps: _react.PropTypes.object,
    offscreenClass: _react.PropTypes.string,
    onComplete: _react.PropTypes.func,
    onEntityHighlighted: _react.PropTypes.func,
    onEntitySelected: _react.PropTypes.func
});
UITypeaheadInput.internalKeys = Object.keys(UITypeaheadInput.propTypes);
UITypeaheadInput.defaultProps = _extends({}, _UITextualInput2.default.defaultProps, {
    algorithm: UITypeaheadInput.mode.FUZZY,
    clearPartialInputOnSelection: false,
    entities: [],
    hintProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntityHighlighted: _noop2.default,
    onEntitySelected: _noop2.default
});

var _initialiseProps = function _initialiseProps() {
    var _this5 = this;

    this.state = {
        entityMatchIndexes: [],
        id: (0, _uuid2.default)(),
        isControlled: (0, _isString2.default)(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };

    this.updateInputState = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return _this5.setState(function (state) {
            return _extends({}, state, { input: value });
        });
    };

    this.getSelectedEntityText = function () {
        var entity = _this5.props.entities[_this5.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.resetMatches = function () {
        _this5.setState(function (state) {
            return _extends({}, state, {
                selectedEntityIndex: -1,
                entityMatchIndexes: []
            });
        });
    };

    this.getInputNode = function () {
        return _this5.refs.input.refs.field;
    };

    this.select = function () {
        var input = _this5.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this5.getValue().length;
    };

    this.focus = function () {
        return _this5.getInputNode().focus();
    };

    this.getValue = function () {
        return _this5.refs.input.getValue();
    };

    this.setValue = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        _this5.refs.input.setValue(value);

        _this5.updateInputState(value);
        _this5.resetMatches();
        _this5.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this5.props.onEntitySelected(_this5.state.selectedEntityIndex);

        if (_this5.props.clearPartialInputOnSelection) {
            _this5.setValue('');
        } else {
            _this5.setValue(_this5.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(_this5.resetMatches, 0);
    };

    this.markMatchSubstring = function () {
        return _this5.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this5.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleChange = function (event) {
        if (_this5.state.isControlled === false) {
            _this5.updateInputState(event.target.value);
            _this5.computeMatches();
        }

        if ((0, _isFunction2.default)(_this5.props.inputProps.onChange)) {
            _this5.props.inputProps.onChange(event);
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
                if (_this5.state.selectedEntityIndex !== -1 && _this5.cursorAtEndOfInput() && _this5.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(-1);
                _this5.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this5.selectMatch(1);
                _this5.focus();
                break;

            case 'Escape':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    _this5.resetMatches();
                }

                break;

            case 'Enter':
                if (_this5.state.selectedEntityIndex !== -1 && _this5.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this5.setValueWithSelectedEntity();
                } else {
                    _this5.props.onComplete(_this5.state.input, event);
                }

                break;
        }

        if ((0, _isFunction2.default)(_this5.props.onKeyDown)) {
            _this5.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOlsiVUlUeXBlYWhlYWRJbnB1dCIsImNvbXBvbmVudFdpbGxNb3VudCIsInByb3BzIiwiaW5wdXRQcm9wcyIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwiY29tcHV0ZU1hdGNoZXMiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiZW50aXRpZXMiLCJ1cGRhdGVJbnB1dFN0YXRlIiwiY29tcG9uZW50RGlkTW91bnQiLCJzdGF0ZSIsInNlbGVjdGVkRW50aXR5SW5kZXgiLCJvbkVudGl0eUhpZ2hsaWdodGVkIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiZW50aXR5TWF0Y2hJbmRleGVzIiwibGVuZ3RoIiwicmVmcyIsIm1hdGNoZXMiLCJzY3JvbGxUb3AiLCJoYW5kbGVNYXRjaENsaWNrIiwiaW5kZXgiLCJzZXRTdGF0ZSIsInNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5Iiwic2VsZWN0TWF0Y2giLCJkZWx0YSIsInRvdGFsTWF0Y2hlcyIsIm5leHRJbmRleCIsImluZGV4T2YiLCJtYXRjaEluZGV4IiwibWF0Y2hlc05vZGUiLCJtYXRjaGVzTm9kZVlFbmQiLCJjbGllbnRIZWlnaHQiLCJtYXRjaE5vZGUiLCJtYXRjaE5vZGVZU3RhcnQiLCJvZmZzZXRUb3AiLCJtYXRjaE5vZGVZRW5kIiwiY3Vyc29yQXRFbmRPZklucHV0Iiwibm9kZSIsImdldElucHV0Tm9kZSIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0VmFsdWUiLCJtYXJrRnV6enlNYXRjaFN1YnN0cmluZyIsImlucHV0IiwiZW50aXR5IiwiZW50aXR5Q29udGVudCIsInRleHQiLCJmcmFncyIsInNwbGl0IiwiUmVnRXhwIiwibm9ybWFsaXplZFVzZXJUZXh0IiwidG9Mb3dlckNhc2UiLCJ0aHJlc2hvbGQiLCJpIiwibWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyIsInNlZWtWYWx1ZSIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsInNsaWNlIiwiZ2V0TWFya2luZ0Z1bmN0aW9uIiwiYWxnb3JpdGhtIiwibW9kZSIsIlNUQVJUU19XSVRIIiwibWFya2VyIiwid2FybmVkTWFya2VyIiwidW5kZWZpbmVkIiwiY29uc29sZSIsIndhcm4iLCJnZXRGdXp6eU1hdGNoSW5kZXhlcyIsInVzZXJUZXh0Iiwibm9ybWFsaXplZCIsInJlZHVjZSIsImZpbmRJbmRleGVzIiwicmVzdWx0IiwicHVzaCIsImdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMiLCJzZWVrTWF0Y2giLCJyZXN1bHRzIiwiZ2V0TWF0Y2hpbmdGdW5jdGlvbiIsIm1hdGNoZXIiLCJ3YXJuZWRNYXRjaGVyIiwicHJvdmlkZWRFbnRpdGllcyIsImN1cnJlbnRWYWx1ZSIsImdldE1hdGNoSW5kZXhlcyIsInJlbmRlck5vdGlmaWNhdGlvbiIsImlkIiwib2Zmc2NyZWVuQ2xhc3MiLCJnZXRTZWxlY3RlZEVudGl0eVRleHQiLCJyZW5kZXJIaW50IiwiaGludCIsInJhdyIsInByb2Nlc3NlZCIsInJlcGxhY2UiLCJoaW50UHJvcHMiLCJjbGFzc05hbWUiLCJyZW5kZXJNYXRjaGVzIiwibWF0Y2hXcmFwcGVyUHJvcHMiLCJtYXAiLCJyZXN0IiwiYmluZCIsIm1hcmtNYXRjaFN1YnN0cmluZyIsInJlbmRlciIsImludGVybmFsS2V5cyIsImhhbmRsZUtleURvd24iLCJwcm9wVHlwZXMiLCJvbkNoYW5nZSIsImhhbmRsZUNoYW5nZSIsIlB1cmVDb21wb25lbnQiLCJvbmVPZlR5cGUiLCJvbmVPZiIsIkZVWlpZIiwic2hhcGUiLCJmdW5jIiwiY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbiIsImJvb2wiLCJhcnJheU9mIiwic3RyaW5nIiwib2JqZWN0Iiwib25Db21wbGV0ZSIsIm9uRW50aXR5U2VsZWN0ZWQiLCJPYmplY3QiLCJrZXlzIiwiZGVmYXVsdFByb3BzIiwiaXNDb250cm9sbGVkIiwicmVzZXRNYXRjaGVzIiwiZmllbGQiLCJzZWxlY3QiLCJmb2N1cyIsInNldFZhbHVlIiwid2luZG93Iiwic2V0VGltZW91dCIsImV2ZW50IiwidGFyZ2V0Iiwia2V5Iiwic3RvcFByb3BhZ2F0aW9uIiwic2hpZnRLZXkiLCJuYXRpdmVFdmVudCIsInByZXZlbnREZWZhdWx0Iiwib25LZXlEb3duIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OytlQWZBOzs7OztJQWlCcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs7K0JBd0VqQkMsa0IsaUNBQXFCO0FBQ2pCLFlBQUksS0FBS0MsS0FBTCxDQUFXQyxVQUFYLENBQXNCQyxLQUF0QixJQUErQixLQUFLRixLQUFMLENBQVdDLFVBQVgsQ0FBc0JFLFlBQXpELEVBQXVFO0FBQ25FLGlCQUFLQyxjQUFMO0FBQ0g7QUFDSixLOzsrQkFFREMseUIsc0NBQTBCQyxTLEVBQVc7QUFDakMsWUFBSUEsVUFBVUMsUUFBVixLQUF1QixLQUFLUCxLQUFMLENBQVdPLFFBQXRDLEVBQWdEO0FBQzVDLGlCQUFLSCxjQUFMLENBQW9CRSxVQUFVQyxRQUE5QjtBQUNIOztBQUVELFlBQUlELFVBQVVMLFVBQVYsQ0FBcUJDLEtBQXJCLEtBQStCLEtBQUtGLEtBQUwsQ0FBV0MsVUFBWCxDQUFzQkMsS0FBekQsRUFBZ0U7QUFDNUQsaUJBQUtNLGdCQUFMLENBQXNCRixVQUFVTCxVQUFWLENBQXFCQyxLQUEzQztBQUNBLGlCQUFLRSxjQUFMO0FBQ0g7QUFDSixLOzsrQkFFREssaUIsZ0NBQW9CO0FBQ2hCLFlBQUksS0FBS0MsS0FBTCxDQUFXQyxtQkFBWCxJQUFrQyxDQUF0QyxFQUF5QztBQUNyQyxpQkFBS1gsS0FBTCxDQUFXWSxtQkFBWCxDQUErQixLQUFLRixLQUFMLENBQVdDLG1CQUExQztBQUNIO0FBQ0osSzs7K0JBRURFLGtCLCtCQUFtQkMsUyxFQUFXQyxTLEVBQVc7QUFDckMsWUFBSSxLQUFLTCxLQUFMLENBQVdNLGtCQUFYLENBQThCQyxNQUE5QixJQUF3QyxDQUFDRixVQUFVQyxrQkFBVixDQUE2QkMsTUFBMUUsRUFBa0Y7QUFDOUUsaUJBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQkMsU0FBbEIsR0FBOEIsQ0FBOUI7QUFDSCxTQUhvQyxDQUduQzs7QUFFRixZQUFPLEtBQUtWLEtBQUwsQ0FBV0MsbUJBQVgsSUFBa0MsQ0FBbEMsSUFDQSxLQUFLWCxLQUFMLENBQVdPLFFBQVgsQ0FBb0IsS0FBS0csS0FBTCxDQUFXQyxtQkFBL0IsTUFBd0RHLFVBQVVQLFFBQVYsQ0FBbUJRLFVBQVVKLG1CQUE3QixDQUQvRCxFQUNrSDtBQUM5RyxpQkFBS1gsS0FBTCxDQUFXWSxtQkFBWCxDQUErQixLQUFLRixLQUFMLENBQVdDLG1CQUExQztBQUNIO0FBQ0osSzs7K0JBUURVLGdCLDZCQUFpQkMsSyxFQUFPO0FBQ3BCLGFBQUtDLFFBQUwsQ0FDSSxVQUFDYixLQUFEO0FBQUEsZ0NBQWdCQSxLQUFoQixJQUF1QkMscUJBQXFCVyxLQUE1QztBQUFBLFNBREosRUFFSSxLQUFLRSwwQkFGVDtBQUlILEs7OytCQUVEQyxXLHdCQUFZQyxLLEVBQU87QUFBQTs7QUFDZixZQUFNUCxVQUFVLEtBQUtULEtBQUwsQ0FBV00sa0JBQTNCO0FBQ0EsWUFBTVcsZUFBZVIsUUFBUUYsTUFBN0I7QUFDQSxZQUFJVyxZQUFZVCxRQUFRVSxPQUFSLENBQWdCLEtBQUtuQixLQUFMLENBQVdDLG1CQUEzQixJQUFrRGUsS0FBbEU7O0FBRUEsWUFBSUMsWUFBSixFQUFrQjtBQUFBO0FBQ2Qsb0JBQUlDLFlBQVksQ0FBaEIsRUFBbUI7QUFDZkEsZ0NBQVlELGVBQWUsQ0FBM0IsQ0FEZSxDQUNlO0FBQ2pDLGlCQUZELE1BRU8sSUFBSUMsYUFBYUQsWUFBakIsRUFBK0I7QUFDbENDLGdDQUFZLENBQVosQ0FEa0MsQ0FDbkI7QUFDbEI7O0FBRUQsb0JBQU1FLGFBQWFYLFFBQVFTLFNBQVIsQ0FBbkI7QUFDQSxvQkFBTUcsY0FBYyxPQUFLYixJQUFMLENBQVVDLE9BQTlCO0FBQ0Esb0JBQU1hLGtCQUFrQkQsWUFBWVgsU0FBWixHQUF3QlcsWUFBWUUsWUFBNUQ7QUFDQSxvQkFBTUMsWUFBWSxPQUFLaEIsSUFBTCxhQUFvQlksVUFBcEIsQ0FBbEI7QUFDQSxvQkFBTUssa0JBQWtCRCxVQUFVRSxTQUFsQztBQUNBLG9CQUFNQyxnQkFBZ0JGLGtCQUFrQkQsVUFBVUQsWUFBbEQ7O0FBRUE7QUFDQSxvQkFBSUksaUJBQWlCTCxlQUFyQixFQUFzQztBQUFFO0FBQ3BDRCxnQ0FBWVgsU0FBWixJQUF5QmlCLGdCQUFnQkwsZUFBekM7QUFDSCxpQkFGRCxNQUVPLElBQUlHLG1CQUFtQkosWUFBWVgsU0FBbkMsRUFBOEM7QUFBRTtBQUNuRFcsZ0NBQVlYLFNBQVosR0FBd0JlLGVBQXhCO0FBQ0g7O0FBRUQsdUJBQUtaLFFBQUwsQ0FBYyxVQUFDYixLQUFEO0FBQUEsd0NBQWdCQSxLQUFoQixJQUF1QkMscUJBQXFCbUIsVUFBNUM7QUFBQSxpQkFBZDtBQXJCYztBQXNCakI7QUFDSixLOzsrQkFnQ0RRLGtCLGlDQUFxQjtBQUNqQixZQUFNQyxPQUFPLEtBQUtDLFlBQUwsRUFBYjs7QUFFQSxlQUFVRCxLQUFLRSxjQUFMLEtBQXdCRixLQUFLRyxZQUE3QixJQUNBSCxLQUFLRyxZQUFMLEtBQXNCLEtBQUtDLFFBQUwsR0FBZ0IxQixNQURoRDtBQUVILEs7OytCQWVEMkIsdUIsb0NBQXdCQyxLLEVBQU9DLE0sRUFBUTtBQUNuQyxZQUFNQyxnQkFBZ0JELE9BQU9FLElBQTdCO0FBQ0EsWUFBTUMsUUFBUUYsY0FBY0csS0FBZCxDQUFvQixJQUFJQyxNQUFKLENBQVcsTUFBTSxrQ0FBUU4sS0FBUixDQUFOLEdBQXVCLEdBQWxDLEVBQXVDLElBQXZDLENBQXBCLENBQWQ7QUFDQSxZQUFNTyxxQkFBcUJQLE1BQU1RLFdBQU4sRUFBM0I7QUFDQSxZQUFNQyxZQUFZTCxNQUFNaEMsTUFBeEI7QUFDQSxZQUFJc0MsSUFBSSxDQUFDLENBQVQ7O0FBRUEsZUFBTyxFQUFFQSxDQUFGLEdBQU1ELFNBQWIsRUFBd0I7QUFDcEIsZ0JBQUlMLE1BQU1NLENBQU4sRUFBU0YsV0FBVCxPQUEyQkQsa0JBQS9CLEVBQW1EO0FBQy9DSCxzQkFBTU0sQ0FBTixJQUFXO0FBQUE7QUFBQSxzQkFBTSxLQUFLQSxDQUFYLEVBQWMsV0FBVSw4QkFBeEI7QUFBd0ROLDBCQUFNTSxDQUFOO0FBQXhELGlCQUFYO0FBQ0g7QUFDSjs7QUFFRCxlQUFPTixLQUFQO0FBQ0gsSzs7K0JBRURPLDRCLHlDQUE2QlgsSyxFQUFPQyxNLEVBQVE7QUFDeEMsWUFBTUMsZ0JBQWdCRCxPQUFPRSxJQUE3QjtBQUNBLFlBQU1TLFlBQVlaLE1BQU1RLFdBQU4sRUFBbEI7QUFDQSxZQUFNSyxhQUFhWCxjQUFjTSxXQUFkLEdBQTRCeEIsT0FBNUIsQ0FBb0M0QixTQUFwQyxDQUFuQjtBQUNBLFlBQU1FLFdBQVdELGFBQWFELFVBQVV4QyxNQUF4Qzs7QUFFQSxlQUFPLENBQ0g7QUFBQTtBQUFBLGNBQU0sS0FBSSxHQUFWO0FBQWU4QiwwQkFBY2EsS0FBZCxDQUFvQixDQUFwQixFQUF1QkYsVUFBdkI7QUFBZixTQURHLEVBRUg7QUFBQTtBQUFBLGNBQU0sS0FBSSxHQUFWLEVBQWMsV0FBVSw4QkFBeEI7QUFBd0RYLDBCQUFjYSxLQUFkLENBQW9CRixVQUFwQixFQUFnQ0MsUUFBaEM7QUFBeEQsU0FGRyxFQUdIO0FBQUE7QUFBQSxjQUFNLEtBQUksR0FBVjtBQUFlWiwwQkFBY2EsS0FBZCxDQUFvQkQsUUFBcEI7QUFBZixTQUhHLENBQVA7QUFLSCxLOzsrQkFFREUsa0IsaUNBQXFCO0FBQ2pCLFlBQUksd0JBQVMsS0FBSzdELEtBQUwsQ0FBVzhELFNBQXBCLENBQUosRUFBb0M7QUFDaEMsZ0JBQUksS0FBSzlELEtBQUwsQ0FBVzhELFNBQVgsS0FBeUJoRSxpQkFBaUJpRSxJQUFqQixDQUFzQkMsV0FBbkQsRUFBZ0U7QUFDNUQsdUJBQU8sS0FBS1IsNEJBQVo7QUFDSDs7QUFFRCxtQkFBTyxLQUFLWix1QkFBWjtBQUVILFNBUEQsTUFPTyxJQUFJLDBCQUFXLEtBQUs1QyxLQUFMLENBQVc4RCxTQUFYLENBQXFCRyxNQUFoQyxDQUFKLEVBQTZDO0FBQ2hELG1CQUFPLEtBQUtqRSxLQUFMLENBQVc4RCxTQUFYLENBQXFCRyxNQUE1QjtBQUNIOztBQUVELFlBQUksS0FBS0MsWUFBTCxLQUFzQkMsU0FBMUIsRUFBcUM7QUFDakMsaUJBQUtELFlBQUwsR0FBb0IsSUFBcEI7QUFDQUUsb0JBQVFDLElBQVIsQ0FBYSxvSEFBYjtBQUNIOztBQUVELGVBQU8sS0FBS3pCLHVCQUFaO0FBQ0gsSzs7K0JBSUQwQixvQixpQ0FBcUJDLFEsRUFBVWhFLFEsRUFBVTtBQUNyQyxZQUFNaUUsYUFBYUQsU0FBU2xCLFdBQVQsRUFBbkI7O0FBRUEsZUFBTzlDLFNBQVNrRSxNQUFULENBQWdCLFNBQVNDLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCN0IsTUFBN0IsRUFBcUN4QixLQUFyQyxFQUE0QztBQUMvRCxtQkFBU3dCLE9BQU9FLElBQVAsQ0FBWUssV0FBWixHQUEwQnhCLE9BQTFCLENBQWtDMkMsVUFBbEMsTUFBa0QsQ0FBQyxDQUFuRCxHQUNDRyxPQUFPQyxJQUFQLENBQVl0RCxLQUFaLEtBQXNCcUQsTUFEdkIsR0FFQUEsTUFGVDtBQUdILFNBSk0sRUFJSixFQUpJLENBQVA7QUFLSCxLOzsrQkFFREUseUIsc0NBQTBCTixRLEVBQVVoRSxRLEVBQVU7QUFDMUMsWUFBTWtELFlBQVljLFNBQVNsQixXQUFULEVBQWxCOztBQUVBLGVBQU85QyxTQUFTa0UsTUFBVCxDQUFnQixTQUFTSyxTQUFULENBQW1CQyxPQUFuQixFQUE0QmpDLE1BQTVCLEVBQW9DeEIsS0FBcEMsRUFBMkM7QUFDOUQsZ0JBQUl3QixPQUFPRSxJQUFQLENBQVlLLFdBQVosR0FBMEJ4QixPQUExQixDQUFrQzRCLFNBQWxDLE1BQWlELENBQXJELEVBQXdEO0FBQ3BEc0Isd0JBQVFILElBQVIsQ0FBYXRELEtBQWI7QUFDSDs7QUFFRCxtQkFBT3lELE9BQVA7QUFFSCxTQVBNLEVBT0osRUFQSSxDQUFQO0FBUUgsSzs7K0JBRURDLG1CLGtDQUFzQjtBQUNsQixZQUFJLHdCQUFTLEtBQUtoRixLQUFMLENBQVc4RCxTQUFwQixDQUFKLEVBQW9DO0FBQ2hDLGdCQUFJLEtBQUs5RCxLQUFMLENBQVc4RCxTQUFYLEtBQXlCaEUsaUJBQWlCaUUsSUFBakIsQ0FBc0JDLFdBQW5ELEVBQWdFO0FBQzVELHVCQUFPLEtBQUthLHlCQUFaO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS1Asb0JBQVo7QUFFSCxTQVBELE1BT08sSUFBSSwwQkFBVyxLQUFLdEUsS0FBTCxDQUFXOEQsU0FBWCxDQUFxQm1CLE9BQWhDLENBQUosRUFBOEM7QUFDakQsbUJBQU8sS0FBS2pGLEtBQUwsQ0FBVzhELFNBQVgsQ0FBcUJtQixPQUE1QjtBQUNIOztBQUVELFlBQUksS0FBS0MsYUFBTCxLQUF1QmYsU0FBM0IsRUFBc0M7QUFDbEMsaUJBQUtlLGFBQUwsR0FBcUIsSUFBckI7QUFDQWQsb0JBQVFDLElBQVIsQ0FBYSxzSEFBYjtBQUNIOztBQUVELGVBQU8sS0FBS0Msb0JBQVo7QUFDSCxLOzsrQkFJRGxFLGMsMkJBQWUrRSxnQixFQUFrQjtBQUFBOztBQUM3QixhQUFLNUQsUUFBTCxDQUFjLFVBQUNiLEtBQUQsRUFBUVYsS0FBUixFQUFrQjtBQUM1QixnQkFBTU8sV0FBVzRFLG9CQUFvQm5GLE1BQU1PLFFBQTNDO0FBQ0EsZ0JBQU02RSxlQUFlMUUsTUFBTW1DLEtBQTNCO0FBQ0EsZ0JBQU0xQixVQUFVaUUsaUJBQWlCLEVBQWpCLEdBQXNCLEVBQXRCLEdBQTJCLE9BQUtDLGVBQUwsQ0FBcUJELFlBQXJCLEVBQW1DN0UsUUFBbkMsQ0FBM0M7O0FBRUEsZ0NBQ09HLEtBRFA7QUFFSUMscUNBQXFCUSxRQUFRRixNQUFSLEdBQWlCRSxRQUFRLENBQVIsQ0FBakIsR0FBOEIsQ0FBQyxDQUZ4RDtBQUdJSCxvQ0FBb0JHO0FBSHhCO0FBS0gsU0FWRDtBQVdILEs7OytCQXVFRG1FLGtCLGlDQUFxQjtBQUNqQixlQUNJO0FBQUE7QUFBQTtBQUNJLHFCQUFJLE1BRFI7QUFFSSxvQkFBSSxLQUFLNUUsS0FBTCxDQUFXNkUsRUFGbkI7QUFHSSwyQkFBVyxLQUFLdkYsS0FBTCxDQUFXd0YsY0FIMUI7QUFJSSw2QkFBVSxRQUpkO0FBS0ssaUJBQUtDLHFCQUFMO0FBTEwsU0FESjtBQVNILEs7OytCQUVEQyxVLHlCQUFhO0FBQ1QsWUFBSSxLQUFLMUYsS0FBTCxDQUFXMkYsSUFBZixFQUFxQjtBQUFBOztBQUNqQixnQkFBTXBCLFdBQVcsS0FBSzdELEtBQUwsQ0FBV21DLEtBQTVCO0FBQ0EsZ0JBQU0rQyxNQUFNLEtBQUtILHFCQUFMLEVBQVo7QUFDQSxnQkFBSUksWUFBWSxFQUFoQjs7QUFFQSxnQkFBT0QsT0FDQUEsSUFBSXZDLFdBQUosR0FBa0J4QixPQUFsQixDQUEwQjBDLFNBQVNsQixXQUFULEVBQTFCLE1BQXNELENBRDdELEVBQ2dFO0FBQzVEd0MsNEJBQVlELElBQUlFLE9BQUosQ0FBWSxJQUFJM0MsTUFBSixDQUFXb0IsUUFBWCxFQUFxQixHQUFyQixDQUFaLEVBQXVDQSxRQUF2QyxDQUFaO0FBQ0g7O0FBRUQsbUJBQ0k7QUFBQTtBQUFBLDZCQUNRLEtBQUt2RSxLQUFMLENBQVcrRixTQURuQjtBQUVJLHlCQUFJLE1BRlI7QUFHSSwrQkFBVztBQUNQLDRDQUFvQixJQURiO0FBRVAsd0RBQWdDLElBRnpCO0FBR1AsNkNBQXFCO0FBSGQsMkJBSU4sS0FBSy9GLEtBQUwsQ0FBVytGLFNBQVgsQ0FBcUJDLFNBSmYsSUFJMkIsQ0FBQyxDQUFDLEtBQUtoRyxLQUFMLENBQVcrRixTQUFYLENBQXFCQyxTQUpsRCxPQUhmO0FBU0ksOEJBQVMsSUFUYjtBQVVLSDtBQVZMLGFBREo7QUFjSDtBQUNKLEs7OytCQUVESSxhLDRCQUFnQjtBQUFBOztBQUNaLFlBQUksS0FBS3ZGLEtBQUwsQ0FBV00sa0JBQVgsQ0FBOEJDLE1BQWxDLEVBQTBDO0FBQUE7O0FBQ3RDLGdCQUFNakIsUUFBUSxLQUFLQSxLQUFMLENBQVdrRyxpQkFBekI7O0FBRUEsbUJBQ0k7QUFBQTtBQUFBLDZCQUNRbEcsS0FEUjtBQUVJLHlCQUFJLFNBRlI7QUFHSSwrQkFBVztBQUNQLHNEQUE4QjtBQUR2Qiw0QkFFTkEsTUFBTWdHLFNBRkEsSUFFWSxDQUFDLENBQUNoRyxNQUFNZ0csU0FGcEIsUUFIZjtBQU9LLHFCQUFLdEYsS0FBTCxDQUFXTSxrQkFBWCxDQUE4Qm1GLEdBQTlCLENBQWtDLGlCQUFTO0FBQUE7O0FBQ3hDLHdCQUFNckQsU0FBUyxPQUFLOUMsS0FBTCxDQUFXTyxRQUFYLENBQW9CZSxLQUFwQixDQUFmO0FBRHdDLHdCQUVqQzBFLFNBRmlDLEdBRUxsRCxNQUZLLENBRWpDa0QsU0FGaUM7QUFBQSx3QkFFdEJoRCxJQUZzQixHQUVMRixNQUZLLENBRXRCRSxJQUZzQjs7QUFBQSx3QkFFYm9ELElBRmEsNEJBRUx0RCxNQUZLOztBQUl4QywyQkFDSTtBQUFBO0FBQUEscUNBQ1FzRCxJQURSO0FBRUksNkNBQWU5RSxLQUZuQjtBQUdJLHVDQUFXO0FBQ1Asc0RBQXNCLElBRGY7QUFFUCwrREFBK0IsT0FBS1osS0FBTCxDQUFXQyxtQkFBWCxLQUFtQ1c7QUFGM0Qsb0NBR04wRSxTQUhNLElBR00sQ0FBQyxDQUFDQSxTQUhSLFFBSGY7QUFRSSxpQ0FBS2hELElBUlQ7QUFTSSxxQ0FBUyxPQUFLM0IsZ0JBQUwsQ0FBc0JnRixJQUF0QixTQUFpQy9FLEtBQWpDLENBVGI7QUFVSywrQkFBS2dGLGtCQUFMLENBQXdCLE9BQUs1RixLQUFMLENBQVdtQyxLQUFuQyxFQUEwQ0MsTUFBMUM7QUFWTCxxQkFESjtBQWNILGlCQWxCQTtBQVBMLGFBREo7QUE2Qkg7QUFDSixLOzsrQkFFRHlELE0scUJBQVM7QUFBQTs7QUFBQSxZQUNFdkcsS0FERixHQUNrQixJQURsQixDQUNFQSxLQURGO0FBQUEsWUFDU1UsS0FEVCxHQUNrQixJQURsQixDQUNTQSxLQURUOzs7QUFHTCxlQUNJO0FBQUE7QUFBQSx5QkFDUSxzQkFBS1YsS0FBTCxFQUFZRixpQkFBaUIwRyxZQUE3QixDQURSO0FBRUkscUJBQUksU0FGUjtBQUdJLDJCQUFXO0FBQ1IsNENBQXdCO0FBRGhCLHdCQUVQeEcsTUFBTWdHLFNBRkMsSUFFVyxDQUFDLENBQUNoRyxNQUFNZ0csU0FGbkIsUUFIZjtBQU9JLDJCQUFXLEtBQUtTLGFBUHBCO0FBUUssaUJBQUtuQixrQkFBTCxFQVJMO0FBU0ssaUJBQUtJLFVBQUwsRUFUTDtBQVdJLGlGQUNRLGlDQUFrQjFGLEtBQWxCLEVBQXlCLHlCQUFlMEcsU0FBeEMsQ0FEUjtBQUVJLHFCQUFJLE9BRlI7QUFHSSxpQ0FBZWhHLE1BQU02RSxFQUh6QjtBQUlJLHlDQUNPdkYsTUFBTUMsVUFEYjtBQUVJK0YsK0JBQVc7QUFDUCx3Q0FBZ0I7QUFEVCw0QkFFTmhHLE1BQU1DLFVBQU4sQ0FBaUIrRixTQUZYLElBRXVCLENBQUMsQ0FBQ2hHLE1BQU1DLFVBQU4sQ0FBaUIrRixTQUYxQyxRQUZmO0FBTUlXLDhCQUFVLEtBQUtDO0FBTm5CLGtCQUpKLElBWEo7QUF3QkssaUJBQUtYLGFBQUw7QUF4QkwsU0FESjtBQTRCSCxLOzs7RUFyZXlDLGdCQUFNWSxhOztBQUEvQi9HLGdCLENBQ1ZpRSxJLEdBQU87QUFDVixtQkFBZSxhQURMO0FBRVYsYUFBUztBQUZDLEM7QUFER2pFLGdCLENBTVY0RyxTLGdCQUNBLHlCQUFlQSxTO0FBQ2xCNUMsZUFBVyxpQkFBVWdELFNBQVYsQ0FBb0IsQ0FDM0IsaUJBQVVDLEtBQVYsQ0FBZ0IsQ0FDWmpILGlCQUFpQmlFLElBQWpCLENBQXNCQyxXQURWLEVBRVpsRSxpQkFBaUJpRSxJQUFqQixDQUFzQmlELEtBRlYsQ0FBaEIsQ0FEMkIsRUFLM0IsaUJBQVVDLEtBQVYsQ0FBZ0I7QUFDWmhELGdCQUFRLGlCQUFVNkMsU0FBVixDQUFvQixDQUN4QixpQkFBVUksSUFEYyxFQUV4QixpQkFBVUgsS0FBVixDQUFnQixDQUNaakgsaUJBQWlCaUUsSUFBakIsQ0FBc0JDLFdBRFYsRUFFWmxFLGlCQUFpQmlFLElBQWpCLENBQXNCaUQsS0FGVixDQUFoQixDQUZ3QixDQUFwQixDQURJO0FBUVovQixpQkFBUyxpQkFBVTZCLFNBQVYsQ0FBb0IsQ0FDekIsaUJBQVVJLElBRGUsRUFFekIsaUJBQVVILEtBQVYsQ0FBZ0IsQ0FDWmpILGlCQUFpQmlFLElBQWpCLENBQXNCQyxXQURWLEVBRVpsRSxpQkFBaUJpRSxJQUFqQixDQUFzQmlELEtBRlYsQ0FBaEIsQ0FGeUIsQ0FBcEI7QUFSRyxLQUFoQixDQUwyQixDQUFwQixDO0FBc0JYRyxrQ0FBOEIsaUJBQVVDLEk7QUFDeEM3RyxjQUFVLGlCQUFVOEcsT0FBVixDQUNOLGlCQUFVSixLQUFWLENBQWdCO0FBQ1pqRSxjQUFNLGlCQUFVc0U7QUFESixLQUFoQixDQURNLEM7QUFLVjNCLFVBQU0saUJBQVV5QixJO0FBQ2hCckIsZUFBVyxpQkFBVXdCLE07QUFDckJyQix1QkFBbUIsaUJBQVVxQixNO0FBQzdCL0Isb0JBQWdCLGlCQUFVOEIsTTtBQUMxQkUsZ0JBQVksaUJBQVVOLEk7QUFDdEJ0Ryx5QkFBcUIsaUJBQVVzRyxJO0FBQy9CTyxzQkFBa0IsaUJBQVVQOztBQTFDZnBILGdCLENBNkNWMEcsWSxHQUFla0IsT0FBT0MsSUFBUCxDQUFZN0gsaUJBQWlCNEcsU0FBN0IsQztBQTdDTDVHLGdCLENBK0NWOEgsWSxnQkFDQSx5QkFBZUEsWTtBQUNsQjlELGVBQVdoRSxpQkFBaUJpRSxJQUFqQixDQUFzQmlELEs7QUFDakNHLGtDQUE4QixLO0FBQzlCNUcsY0FBVSxFO0FBQ1Z3RixlQUFXLEU7QUFDWEcsdUJBQW1CLEU7QUFDbkJWLG9CQUFnQixjO0FBQ2hCZ0MsOEI7QUFDQTVHLHVDO0FBQ0E2Rzs7Ozs7O1NBR0ovRyxLLEdBQVE7QUFDSk0sNEJBQW9CLEVBRGhCO0FBRUp1RSxZQUFJLHFCQUZBO0FBR0pzQyxzQkFBYyx3QkFBUyxLQUFLN0gsS0FBTCxDQUFXQyxVQUFYLENBQXNCQyxLQUEvQixDQUhWO0FBSUoyQyxlQUFVLEtBQUs3QyxLQUFMLENBQVdDLFVBQVgsQ0FBc0JDLEtBQXRCLElBQ0EsS0FBS0YsS0FBTCxDQUFXQyxVQUFYLENBQXNCRSxZQUR0QixJQUVBLEVBTk47QUFPSlEsNkJBQXFCLENBQUM7QUFQbEIsSzs7U0FVUkgsZ0IsR0FBbUI7QUFBQSxZQUFDTixLQUFELHlEQUFTLEVBQVQ7QUFBQSxlQUFnQixPQUFLcUIsUUFBTCxDQUFjLFVBQUNiLEtBQUQ7QUFBQSxnQ0FBZ0JBLEtBQWhCLElBQXVCbUMsT0FBTzNDLEtBQTlCO0FBQUEsU0FBZCxDQUFoQjtBQUFBLEs7O1NBb0NuQnVGLHFCLEdBQXdCLFlBQU07QUFDMUIsWUFBTTNDLFNBQVMsT0FBSzlDLEtBQUwsQ0FBV08sUUFBWCxDQUFvQixPQUFLRyxLQUFMLENBQVdDLG1CQUEvQixDQUFmOztBQUVBLGVBQU9tQyxTQUFTQSxPQUFPRSxJQUFoQixHQUF1QixFQUE5QjtBQUNILEs7O1NBdUNEOEUsWSxHQUFlLFlBQU07QUFDakIsZUFBS3ZHLFFBQUwsQ0FBYyxVQUFDYixLQUFELEVBQVc7QUFDckIsZ0NBQ09BLEtBRFA7QUFFSUMscUNBQXFCLENBQUMsQ0FGMUI7QUFHSUssb0NBQW9CO0FBSHhCO0FBS0gsU0FORDtBQU9ILEs7O1NBRUR3QixZLEdBQWU7QUFBQSxlQUFNLE9BQUt0QixJQUFMLENBQVUyQixLQUFWLENBQWdCM0IsSUFBaEIsQ0FBcUI2RyxLQUEzQjtBQUFBLEs7O1NBRWZDLE0sR0FBUyxZQUFNO0FBQ1gsWUFBTW5GLFFBQVEsT0FBS0wsWUFBTCxFQUFkOztBQUVBSyxjQUFNSixjQUFOLEdBQXVCLENBQXZCO0FBQ0FJLGNBQU1ILFlBQU4sR0FBcUIsT0FBS0MsUUFBTCxHQUFnQjFCLE1BQXJDO0FBQ0gsSzs7U0FFRGdILEssR0FBUTtBQUFBLGVBQU0sT0FBS3pGLFlBQUwsR0FBb0J5RixLQUFwQixFQUFOO0FBQUEsSzs7U0FDUnRGLFEsR0FBVztBQUFBLGVBQU0sT0FBS3pCLElBQUwsQ0FBVTJCLEtBQVYsQ0FBZ0JGLFFBQWhCLEVBQU47QUFBQSxLOztTQUVYdUYsUSxHQUFXLFlBQWdCO0FBQUEsWUFBZmhJLEtBQWUseURBQVAsRUFBTzs7QUFDdkIsZUFBS2dCLElBQUwsQ0FBVTJCLEtBQVYsQ0FBZ0JxRixRQUFoQixDQUF5QmhJLEtBQXpCOztBQUVBLGVBQUtNLGdCQUFMLENBQXNCTixLQUF0QjtBQUNBLGVBQUs0SCxZQUFMO0FBQ0EsZUFBS0csS0FBTDtBQUNILEs7O1NBU0R6RywwQixHQUE2QixZQUFNO0FBQy9CLGVBQUt4QixLQUFMLENBQVd5SCxnQkFBWCxDQUE0QixPQUFLL0csS0FBTCxDQUFXQyxtQkFBdkM7O0FBRUEsWUFBSSxPQUFLWCxLQUFMLENBQVdtSCw0QkFBZixFQUE2QztBQUN6QyxtQkFBS2UsUUFBTCxDQUFjLEVBQWQ7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBS0EsUUFBTCxDQUFjLE9BQUt6QyxxQkFBTCxFQUFkO0FBQ0g7O0FBRUQ7QUFDQTBDLGVBQU9DLFVBQVAsQ0FBa0IsT0FBS04sWUFBdkIsRUFBcUMsQ0FBckM7QUFDSCxLOztTQW1ERHhCLGtCLEdBQXFCO0FBQUEsZUFBYSxPQUFLekMsa0JBQUwsOEJBQWI7QUFBQSxLOztTQTZDckJ3QixlLEdBQWtCO0FBQUEsZUFBYSxPQUFLTCxtQkFBTCw4QkFBYjtBQUFBLEs7O1NBZ0JsQjRCLFksR0FBZSxVQUFDeUIsS0FBRCxFQUFXO0FBQ3RCLFlBQUksT0FBSzNILEtBQUwsQ0FBV21ILFlBQVgsS0FBNEIsS0FBaEMsRUFBdUM7QUFDbkMsbUJBQUtySCxnQkFBTCxDQUFzQjZILE1BQU1DLE1BQU4sQ0FBYXBJLEtBQW5DO0FBQ0EsbUJBQUtFLGNBQUw7QUFDSDs7QUFFRCxZQUFJLDBCQUFXLE9BQUtKLEtBQUwsQ0FBV0MsVUFBWCxDQUFzQjBHLFFBQWpDLENBQUosRUFBZ0Q7QUFDNUMsbUJBQUszRyxLQUFMLENBQVdDLFVBQVgsQ0FBc0IwRyxRQUF0QixDQUErQjBCLEtBQS9CO0FBQ0g7QUFDSixLOztTQUVENUIsYSxHQUFnQixVQUFDNEIsS0FBRCxFQUFXO0FBQ3ZCLGdCQUFRQSxNQUFNRSxHQUFkO0FBQ0EsaUJBQUssV0FBTDtBQUNJLG9CQUFJRixNQUFNQyxNQUFOLENBQWE3RixjQUFiLEdBQThCLENBQWxDLEVBQXFDO0FBQ2pDNEYsMEJBQU1HLGVBQU47QUFDSDs7QUFFRDs7QUFFSixpQkFBSyxLQUFMO0FBQ0EsaUJBQUssWUFBTDtBQUNJLG9CQUFPLE9BQUs5SCxLQUFMLENBQVdDLG1CQUFYLEtBQW1DLENBQUMsQ0FBcEMsSUFDQSxPQUFLMkIsa0JBQUwsRUFEQSxJQUVBLE9BQUtFLFlBQUwsT0FBd0I2RixNQUFNQyxNQUY5QixJQUdBLENBQUNELE1BQU1JLFFBSGQsRUFHd0I7QUFDcEJKLDBCQUFNSyxXQUFOLENBQWtCQyxjQUFsQjtBQUNBLDJCQUFLbkgsMEJBQUw7QUFDSDs7QUFFRDs7QUFFSixpQkFBSyxTQUFMO0FBQ0k2RyxzQkFBTUssV0FBTixDQUFrQkMsY0FBbEIsR0FESixDQUN3QztBQUNwQyx1QkFBS2xILFdBQUwsQ0FBaUIsQ0FBQyxDQUFsQjtBQUNBLHVCQUFLd0csS0FBTDtBQUNBOztBQUVKLGlCQUFLLFdBQUw7QUFDSUksc0JBQU1LLFdBQU4sQ0FBa0JDLGNBQWxCLEdBREosQ0FDd0M7QUFDcEMsdUJBQUtsSCxXQUFMLENBQWlCLENBQWpCO0FBQ0EsdUJBQUt3RyxLQUFMO0FBQ0E7O0FBRUosaUJBQUssUUFBTDtBQUNJLG9CQUFPLE9BQUt2SCxLQUFMLENBQVdDLG1CQUFYLEtBQW1DLENBQUMsQ0FBcEMsSUFDQSxPQUFLNkIsWUFBTCxPQUF3QjZGLE1BQU1DLE1BRHJDLEVBQzZDO0FBQ3pDLDJCQUFLUixZQUFMO0FBQ0g7O0FBRUQ7O0FBRUosaUJBQUssT0FBTDtBQUNJLG9CQUFPLE9BQUtwSCxLQUFMLENBQVdDLG1CQUFYLEtBQW1DLENBQUMsQ0FBcEMsSUFDQSxPQUFLNkIsWUFBTCxPQUF3QjZGLE1BQU1DLE1BRHJDLEVBQzZDO0FBQ3pDRCwwQkFBTUssV0FBTixDQUFrQkMsY0FBbEI7QUFDQSwyQkFBS25ILDBCQUFMO0FBQ0gsaUJBSkQsTUFJTztBQUNILDJCQUFLeEIsS0FBTCxDQUFXd0gsVUFBWCxDQUFzQixPQUFLOUcsS0FBTCxDQUFXbUMsS0FBakMsRUFBd0N3RixLQUF4QztBQUNIOztBQUVEO0FBakRKOztBQW9EQSxZQUFJLDBCQUFXLE9BQUtySSxLQUFMLENBQVc0SSxTQUF0QixDQUFKLEVBQXNDO0FBQ2xDLG1CQUFLNUksS0FBTCxDQUFXNEksU0FBWCxDQUFxQlAsS0FBckI7QUFDSDtBQUNKLEs7OztrQkF4WGdCdkksZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRTdGF0ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHsuLi5zdGF0ZSwgaW5wdXQ6IHZhbHVlfSkpXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZShuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoICYmICFwcmV2U3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGNoZXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSAvLyBmaXggYW4gb2RkIGJ1ZyBpbiBGRiB3aGVyZSBpdCBpbml0aWFsaXplcyB0aGUgZWxlbWVudCB3aXRoIGFuIGluY29ycmVjdCBzY3JvbGxUb3BcblxuICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDBcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSAhPT0gcHJldlByb3BzLmVudGl0aWVzW3ByZXZTdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEVudGl0eVRleHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZW50aXR5ID8gZW50aXR5LnRleHQgOiAnJztcbiAgICB9XG5cbiAgICBoYW5kbGVNYXRjaENsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAoc3RhdGUpID0+ICh7Li4uc3RhdGUsIHNlbGVjdGVkRW50aXR5SW5kZXg6IGluZGV4fSksXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1hdGNoZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnB1dE5vZGUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQucmVmcy5maWVsZFxuXG4gICAgc2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgPSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQuZ2V0VmFsdWUoKVxuXG4gICAgc2V0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4ge1xuICAgICAgICB0aGlzLnJlZnMuaW5wdXQuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRTdGF0ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiAgICBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZFxuICAgICAgICAgICAgICAgJiYgbm9kZS5zZWxlY3Rpb25FbmQgPT09IHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5lZWRzIHRvIGhhcHBlbiBhZnRlciB0aGUgdXBjb21pbmcgcmVuZGVyIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgYHNldFZhbHVlYFxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnJlc2V0TWF0Y2hlcywgMCk7XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0TWFya2luZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmVkTWFya2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWFya2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXJraW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0cywgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldE1hdGNoaW5nRnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0aGlzLnByb3BzLmFsZ29yaXRobSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFsZ29yaXRobSA9PT0gVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRzV2l0aE1hdGNoSW5kZXhlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnV6enlNYXRjaEluZGV4ZXM7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hdGNoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRNYXRjaGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXRjaGVyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0gKEZVWlpZKS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuICAgIH1cblxuICAgIGdldE1hdGNoSW5kZXhlcyA9ICguLi5hcmdzKSA9PiB0aGlzLmdldE1hdGNoaW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgY29tcHV0ZU1hdGNoZXMocHJvdmlkZWRFbnRpdGllcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0aWVzID0gcHJvdmlkZWRFbnRpdGllcyB8fCBwcm9wcy5lbnRpdGllcztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHN0YXRlLmlucHV0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXMubGVuZ3RoID8gbWF0Y2hlc1swXSA6IC0xLFxuICAgICAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID4gMSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJzb3JBdEVuZE9mSW5wdXQoKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgtMSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKDEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUuaW5wdXQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCk7XG4gICAgICAgICAgICBsZXQgcHJvY2Vzc2VkID0gJyc7XG5cbiAgICAgICAgICAgIGlmICggICByYXdcbiAgICAgICAgICAgICAgICAmJiByYXcudG9Mb3dlckNhc2UoKS5pbmRleE9mKHVzZXJUZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gcmF3LnJlcGxhY2UobmV3IFJlZ0V4cCh1c2VyVGV4dCwgJ2knKSwgdXNlclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J21hdGNoZXMnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgdGV4dCwgLi4ucmVzdH0gPSBlbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgbWF0Y2hfJCR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzTmFtZV06ICEhY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU1hdGNoQ2xpY2suYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXJrTWF0Y2hTdWJzdHJpbmcodGhpcy5zdGF0ZS5pbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQocHJvcHMsIFVJVHlwZWFoZWFkSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck5vdGlmaWNhdGlvbigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhpbnQoKX1cblxuICAgICAgICAgICAgICAgIDxVSVRleHR1YWxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4uZXh0cmFjdENoaWxkUHJvcHMocHJvcHMsIFVJVGV4dHVhbElucHV0LnByb3BUeXBlcyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3N0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wcy5pbnB1dFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19