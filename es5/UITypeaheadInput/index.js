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
        this.setState({ selectedEntityIndex: index }, this.setValueWithSelectedEntity);
    };

    UITypeaheadInput.prototype.selectMatch = function selectMatch(delta) {
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
        var _this3 = this;

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

                    var entity = _this3.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this3.handleMatchClick.bind(_this3, index) }),
                        _this3.markMatchSubstring(_this3.state.input, entity)
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
    var _this4 = this;

    this.state = {
        entityMatchIndexes: [],
        id: (0, _uuid2.default)(),
        isControlled: (0, _isString2.default)(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || '',
        selectedEntityIndex: -1
    };

    this.updateInputState = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
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
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

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

        if ((0, _isFunction2.default)(_this4.props.inputProps.onChange)) {
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

        if ((0, _isFunction2.default)(_this4.props.onKeyDown)) {
            _this4.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFmQTs7Ozs7SUFpQnFCLGdCOzs7Ozs7Ozs7Ozs7Ozs7K0JBd0VqQixrQixpQ0FBcUI7QUFDakIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLElBQStCLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsWUFBekQsRUFBdUU7QUFDbkUsaUJBQUssY0FBTDtBQUNIO0FBQ0osSzs7K0JBRUQseUIsc0NBQTBCLFMsRUFBVztBQUNqQyxZQUFJLFVBQVUsUUFBVixLQUF1QixLQUFLLEtBQUwsQ0FBVyxRQUF0QyxFQUFnRDtBQUM1QyxpQkFBSyxjQUFMLENBQW9CLFVBQVUsUUFBOUI7QUFDSDs7QUFFRCxZQUFJLFVBQVUsVUFBVixDQUFxQixLQUFyQixLQUErQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXpELEVBQWdFO0FBQzVELGlCQUFLLGdCQUFMLENBQXNCLFVBQVUsVUFBVixDQUFxQixLQUEzQztBQUNBLGlCQUFLLGNBQUw7QUFDSDtBQUNKLEs7OytCQUVELGlCLGdDQUFvQjtBQUNoQixZQUFJLEtBQUssS0FBTCxDQUFXLG1CQUFYLElBQWtDLENBQXRDLEVBQXlDO0FBQ3JDLGlCQUFLLEtBQUwsQ0FBVyxtQkFBWCxDQUErQixLQUFLLEtBQUwsQ0FBVyxtQkFBMUM7QUFDSDtBQUNKLEs7OytCQUVELGtCLCtCQUFtQixTLEVBQVcsUyxFQUFXO0FBQ3JDLFlBQUksS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsTUFBOUIsSUFBd0MsQ0FBQyxVQUFVLGtCQUFWLENBQTZCLE1BQTFFLEVBQWtGO0FBQzlFLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFNBQWxC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SGQsRUFHd0I7QUFDcEIsMEJBQU0sV0FBTixDQUFrQixjQUFsQjtBQUNBLDJCQUFLLDBCQUFMO0FBQ0g7O0FBRUQ7O0FBRUosaUJBQUssU0FBTDtBQUNJLHNCQUFNLFdBQU4sQ0FBa0IsY0FBbEIsR0FESixDQUN3QztBQUNwQyx1QkFBSyxXQUFMLENBQWlCLENBQUMsQ0FBbEI7QUFDQSx1QkFBSyxLQUFMO0FBQ0E7O0FBRUosaUJBQUssV0FBTDtBQUNJLHNCQUFNLFdBQU4sQ0FBa0IsY0FBbEIsR0FESixDQUN3QztBQUNwQyx1QkFBSyxXQUFMLENBQWlCLENBQWpCO0FBQ0EsdUJBQUssS0FBTDtBQUNBOztBQUVKLGlCQUFLLFFBQUw7QUFDSSxvQkFBTyxPQUFLLEtBQUwsQ0FBVyxtQkFBWCxLQUFtQyxDQUFDLENBQXBDLElBQ0EsT0FBSyxZQUFMLE9BQXdCLE1BQU0sTUFEckMsRUFDNkM7QUFDekMsMkJBQUssWUFBTDtBQUNIOztBQUVEOztBQUVKLGlCQUFLLE9BQUw7QUFDSSxvQkFBTyxPQUFLLEtBQUwsQ0FBVyxtQkFBWCxLQUFtQyxDQUFDLENBQXBDLElBQ0EsT0FBSyxZQUFMLE9BQXdCLE1BQU0sTUFEckMsRUFDNkM7QUFDekMsMEJBQU0sV0FBTixDQUFrQixjQUFsQjtBQUNBLDJCQUFLLDBCQUFMO0FBQ0gsaUJBSkQsTUFJTztBQUNILDJCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQUssS0FBTCxDQUFXLEtBQWpDLEVBQXdDLEtBQXhDO0FBQ0g7O0FBRUQ7QUFqREo7O0FBb0RBLFlBQUksMEJBQVcsT0FBSyxLQUFMLENBQVcsU0FBdEIsQ0FBSixFQUFzQztBQUNsQyxtQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQjtBQUNIO0FBQ0osSzs7O2tCQWpYZ0IsZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUeXBlYWhlYWRJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBtb2RlID0ge1xuICAgICAgICAnU1RBUlRTX1dJVEgnOiAnU1RBUlRTX1dJVEgnLFxuICAgICAgICAnRlVaWlknOiAnRlVaWlknLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LnByb3BUeXBlcyxcbiAgICAgICAgYWxnb3JpdGhtOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICAgICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdKSxcbiAgICAgICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGhpbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBoaW50UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUeXBlYWhlYWRJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgb25Db21wbGV0ZTogbm9vcCxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogbm9vcCxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpbnB1dDogICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICB8fCAnJyxcbiAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogLTEsXG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRTdGF0ZSA9ICh2YWx1ZSA9ICcnKSA9PiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGRcblxuICAgIHNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb2N1cyA9ICgpID0+IHRoaXMuZ2V0SW5wdXROb2RlKCkuZm9jdXMoKVxuICAgIGdldFZhbHVlID0gKCkgPT4gdGhpcy5yZWZzLmlucHV0LmdldFZhbHVlKClcblxuICAgIHNldFZhbHVlID0gKHZhbHVlID0gJycpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U3RhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3Vyc29yQXRFbmRPZklucHV0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRJbnB1dE5vZGUoKTtcblxuICAgICAgICByZXR1cm4gICAgbm9kZS5zZWxlY3Rpb25TdGFydCA9PT0gbm9kZS5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5U2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIHVwY29taW5nIHJlbmRlciB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJ5IGBzZXRWYWx1ZWBcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5yZXNldE1hdGNoZXMsIDApO1xuICAgIH1cblxuICAgIG1hcmtGdXp6eU1hdGNoU3Vic3RyaW5nKGlucHV0LCBlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZW50aXR5Q29udGVudCA9IGVudGl0eS50ZXh0O1xuICAgICAgICBjb25zdCBmcmFncyA9IGVudGl0eUNvbnRlbnQuc3BsaXQobmV3IFJlZ0V4cCgnKCcgKyBlc2NhcGVyKGlucHV0KSArICcpJywgJ2lnJykpO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXNlclRleHQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmcmFncy5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGZyYWdzW2ldLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRVc2VyVGV4dCkge1xuICAgICAgICAgICAgICAgIGZyYWdzW2ldID0gPG1hcmsga2V5PXtpfSBjbGFzc05hbWU9J3VpLXR5cGVhaGVhZC1tYXRjaC1oaWdobGlnaHQnPntmcmFnc1tpXX08L21hcms+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdzO1xuICAgIH1cblxuICAgIG1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4U3RhcnQgPSBlbnRpdHlDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpO1xuICAgICAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyBzZWVrVmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzAnPntlbnRpdHlDb250ZW50LnNsaWNlKDAsIGluZGV4U3RhcnQpfTwvc3Bhbj4sXG4gICAgICAgICAgICA8bWFyayBrZXk9JzEnIGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpfTwvbWFyaz4sXG4gICAgICAgICAgICA8c3BhbiBrZXk9JzInPntlbnRpdHlDb250ZW50LnNsaWNlKGluZGV4RW5kKX08L3NwYW4+LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldE1hcmtpbmdGdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhcm5lZE1hcmtlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZE1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWFya2VyYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXJraW5nIGFsZ29yaXRobSAoRlVaWlkpLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0Z1enp5TWF0Y2hTdWJzdHJpbmc7XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nID0gKC4uLmFyZ3MpID0+IHRoaXMuZ2V0TWFya2luZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAgZW50aXR5LnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5vcm1hbGl6ZWQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdHMsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNTdHJpbmcodGhpcy5wcm9wcy5hbGdvcml0aG0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hbGdvcml0aG0gPT09IFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZ1enp5TWF0Y2hJbmRleGVzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmFsZ29yaXRobS5tYXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53YXJuZWRNYXRjaGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkTWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKHByb3ZpZGVkRW50aXRpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRpdGllcyA9IHByb3ZpZGVkRW50aXRpZXMgfHwgcHJvcHMuZW50aXRpZXM7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS5pbnB1dDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBjdXJyZW50VmFsdWUgPT09ICcnID8gW10gOiB0aGlzLmdldE1hdGNoSW5kZXhlcyhjdXJyZW50VmFsdWUsIGVudGl0aWVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFN0YXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVNYXRjaGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0LCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJOb3RpZmljYXRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaW50KCl9XG5cbiAgICAgICAgICAgICAgICA8VUlUZXh0dWFsSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgey4uLmV4dHJhY3RDaGlsZFByb3BzKHByb3BzLCBVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2lucHV0J1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtzdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgfX0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==