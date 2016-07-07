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

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _extractChildProps = require('../UIUtils/extractChildProps');

var _extractChildProps2 = _interopRequireDefault(_extractChildProps);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var is_string = function is_string(test) {
    return typeof test === 'string';
};
var is_function = function is_function(test) {
    return typeof test === 'function';
};

var UITypeaheadInput = function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: nextProps.inputProps.value });
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

    UITypeaheadInput.prototype.resetMatches = function resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndexes: []
        });
    };

    UITypeaheadInput.prototype.getInputNode = function getInputNode() {
        return this.refs.input.refs.field;
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
        if (is_string(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;
        } else if (is_function(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (!this.warned_marker) {
            this.warned_marker = true;
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

        return entities.reduce(function seekMatch(result, entity, index) {
            return entity.text.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
        }, []);
    };

    UITypeaheadInput.prototype.getMatchingFunction = function getMatchingFunction() {
        if (is_string(this.props.algorithm)) {
            if (this.props.algorithm === UITypeaheadInput.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;
        } else if (is_function(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (!this.warned_matcher) {
            this.warned_matcher = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches() {
        var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

        var currentValue = this.state.input;
        var matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

        this.setState({
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndexes: matches
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
        var _this2 = this;

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

                    var entity = _this2.props.entities[index];
                    var className = entity.className;
                    var text = entity.text;

                    var rest = _objectWithoutProperties(entity, ['className', 'text']);

                    return _react2.default.createElement(
                        'div',
                        _extends({}, rest, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this2.state.selectedEntityIndex === index
                            }, _cx3[className] = !!className, _cx3)),
                            key: text,
                            onClick: _this2.handleMatchClick.bind(_this2, index) }),
                        _this2.markMatchSubstring(_this2.state.input, entity)
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
            _extends({}, (0, _lodash2.default)(props, UITypeaheadInput.internal_keys), {
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
                    onInput: this.handleInput
                }) })),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_UIView3.default);

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
UITypeaheadInput.internal_keys = Object.keys(UITypeaheadInput.propTypes);
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
    var _this3 = this;

    this.state = {
        entityMatchIndexes: [],
        selectedEntityIndex: -1,
        id: this.uuid(),
        is_controlled: is_string(this.props.inputProps.value),
        input: this.props.inputProps.value || this.props.inputProps.defaultValue || ''
    };

    this.getSelectedEntityText = function () {
        var entity = _this3.props.entities[_this3.state.selectedEntityIndex];

        return entity ? entity.text : '';
    };

    this.select = function () {
        var input = _this3.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = _this3.getValue().length;
    };

    this.focus = function () {
        return _this3.getInputNode().focus();
    };

    this.getValue = function () {
        return _this3.refs.input.getValue();
    };

    this.setValue = function (value) {
        _this3.refs.input.setValue(value);

        _this3.setState({ input: value });
        _this3.resetMatches();
        _this3.focus();
    };

    this.setValueWithSelectedEntity = function () {
        _this3.props.onEntitySelected(_this3.state.selectedEntityIndex);

        if (_this3.props.clearPartialInputOnSelection) {
            _this3.setValue('');
        } else {
            _this3.setValue(_this3.getSelectedEntityText());
        }
    };

    this.markMatchSubstring = function () {
        return _this3.getMarkingFunction().apply(undefined, arguments);
    };

    this.getMatchIndexes = function () {
        return _this3.getMatchingFunction().apply(undefined, arguments);
    };

    this.handleInput = function (event) {
        event.stopPropagation();

        _this3.setState({ input: event.target.value }, function () {
            return _this3.computeMatches();
        });

        if (typeof _this3.props.inputProps.onInput === 'function') {
            event.persist();
            _this3.props.inputProps.onInput(event);
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
                if (_this3.state.selectedEntityIndex !== -1 && _this3.cursorAtEndOfInput() && _this3.getInputNode() === event.target && !event.shiftKey) {
                    event.nativeEvent.preventDefault();
                    _this3.setValueWithSelectedEntity();
                }

                break;

            case 'ArrowUp':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this3.selectMatch(-1);
                _this3.focus();
                break;

            case 'ArrowDown':
                event.nativeEvent.preventDefault(); // block cursor movement
                _this3.selectMatch(1);
                _this3.focus();
                break;

            case 'Escape':
                if (_this3.state.selectedEntityIndex !== -1 && _this3.getInputNode() === event.target) {
                    _this3.resetMatches();
                }

                break;

            case 'Enter':
                if (_this3.state.selectedEntityIndex !== -1 && _this3.getInputNode() === event.target) {
                    event.nativeEvent.preventDefault();
                    _this3.setValueWithSelectedEntity();
                } else {
                    _this3.props.onComplete(_this3.state.input);
                }

                break;
        }

        if (typeof _this3.props.onKeyDown === 'function') {
            event.persist();
            _this3.props.onKeyDown(event);
        }
    };
};

exports.default = UITypeaheadInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFlBQVksU0FBWixTQUFZO0FBQUEsV0FBUSxPQUFPLElBQVAsS0FBZ0IsUUFBeEI7QUFBQSxDQUFsQjtBQUNBLElBQU0sY0FBYyxTQUFkLFdBQWM7QUFBQSxXQUFRLE9BQU8sSUFBUCxLQUFnQixVQUF4QjtBQUFBLENBQXBCOztJQUVxQixnQjs7Ozs7Ozs7Ozs7Ozs7OytCQXNFakIsa0IsaUNBQXFCO0FBQ2pCLFlBQUksS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixZQUExQixFQUF3QztBQUNwQyxpQkFBSyxjQUFMO0FBQ0g7QUFDSixLOzsrQkFFRCx5QixzQ0FBMEIsUyxFQUFXO0FBQ2pDLFlBQUksVUFBVSxRQUFWLEtBQXVCLEtBQUssS0FBTCxDQUFXLFFBQXRDLEVBQWdEO0FBQzVDLGlCQUFLLGNBQUwsQ0FBb0IsVUFBVSxRQUE5QjtBQUNIOztBQUVELFlBQUksVUFBVSxVQUFWLENBQXFCLEtBQXJCLEtBQStCLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBekQsRUFBZ0U7QUFDNUQsaUJBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxVQUFVLFVBQVYsQ0FBcUIsS0FBN0IsRUFBZDtBQUNIO0FBQ0osSzs7K0JBRUQsaUIsZ0NBQW9CO0FBQ2hCLFlBQUksS0FBSyxLQUFMLENBQVcsbUJBQVgsSUFBa0MsQ0FBdEMsRUFBeUM7QUFDckMsaUJBQUssS0FBTCxDQUFXLG1CQUFYLENBQStCLEtBQUssS0FBTCxDQUFXLG1CQUExQztBQUNIO0FBQ0osSzs7K0JBRUQsa0IsK0JBQW1CLFMsRUFBVyxTLEVBQVc7QUFDckMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixNQUE5QixJQUF3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QUNJLHNCQUFNLFdBQU4sQ0FBa0IsY0FBbEIsRztBQUNBLHVCQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDQSx1QkFBSyxLQUFMO0FBQ0E7O0FBRUosaUJBQUssUUFBTDtBQUNJLG9CQUFPLE9BQUssS0FBTCxDQUFXLG1CQUFYLEtBQW1DLENBQUMsQ0FBcEMsSUFDQSxPQUFLLFlBQUwsT0FBd0IsTUFBTSxNQURyQyxFQUM2QztBQUN6QywyQkFBSyxZQUFMO0FBQ0g7O0FBRUQ7O0FBRUosaUJBQUssT0FBTDtBQUNJLG9CQUFPLE9BQUssS0FBTCxDQUFXLG1CQUFYLEtBQW1DLENBQUMsQ0FBcEMsSUFDQSxPQUFLLFlBQUwsT0FBd0IsTUFBTSxNQURyQyxFQUM2QztBQUN6QywwQkFBTSxXQUFOLENBQWtCLGNBQWxCO0FBQ0EsMkJBQUssMEJBQUw7QUFDSCxpQkFKRCxNQUlPO0FBQ0gsMkJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBSyxLQUFMLENBQVcsS0FBakM7QUFDSDs7QUFFRDtBQWpESjs7QUFvREEsWUFBSSxPQUFPLE9BQUssS0FBTCxDQUFXLFNBQWxCLEtBQWdDLFVBQXBDLEVBQWdEO0FBQzVDLGtCQUFNLE9BQU47QUFDQSxtQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQjtBQUNIO0FBQ0osSzs7O2tCQXhXZ0IsZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEludGVsbGlnZW50bHkgcmVjb21tZW5kIGVudGl0aWVzIHZpYSBjdXN0b21pemFibGUsIGZ1enp5IHJlY29nbml0aW9uLlxuICogQGNsYXNzIFVJVHlwZWFoZWFkSW5wdXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBlc2NhcGVyIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IFVJVGV4dHVhbElucHV0IGZyb20gJy4uL1VJVGV4dHVhbElucHV0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBleHRyYWN0Q2hpbGRQcm9wcyBmcm9tICcuLi9VSVV0aWxzL2V4dHJhY3RDaGlsZFByb3BzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNvbnN0IGlzX3N0cmluZyA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuY29uc3QgaXNfZnVuY3Rpb24gPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMsXG4gICAgICAgIGFsZ29yaXRobTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5GVVpaWSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlTZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSVR5cGVhaGVhZElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJVGV4dHVhbElucHV0LmRlZmF1bHRQcm9wcyxcbiAgICAgICAgYWxnb3JpdGhtOiBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlksXG4gICAgICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICBlbnRpdGllczogW10sXG4gICAgICAgIGhpbnRQcm9wczoge30sXG4gICAgICAgIG1hdGNoV3JhcHBlclByb3BzOiB7fSxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBvbkNvbXBsZXRlOiBub29wLFxuICAgICAgICBvbkVudGl0eUhpZ2hsaWdodGVkOiBub29wLFxuICAgICAgICBvbkVudGl0eVNlbGVjdGVkOiBub29wLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IFtdLFxuICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgaWQ6IHRoaXMudXVpZCgpLFxuICAgICAgICBpc19jb250cm9sbGVkOiBpc19zdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaW5wdXQ6ICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZVxuICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgfHwgJycsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5lbnRpdGllcyAhPT0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlTWF0Y2hlcyhuZXh0UHJvcHMuZW50aXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0UHJvcHMuaW5wdXRQcm9wcy52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eUhpZ2hsaWdodGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCAmJiAhcHJldlN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRjaGVzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0gLy8gZml4IGFuIG9kZCBidWcgaW4gRkYgd2hlcmUgaXQgaW5pdGlhbGl6ZXMgdGhlIGVsZW1lbnQgd2l0aCBhbiBpbmNvcnJlY3Qgc2Nyb2xsVG9wXG5cbiAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCA+PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0gIT09IHByZXZQcm9wcy5lbnRpdGllc1twcmV2U3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW3RoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGVudGl0eSA/IGVudGl0eS50ZXh0IDogJyc7XG4gICAgfVxuXG4gICAgaGFuZGxlTWF0Y2hDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEVudGl0eUluZGV4OiBpbmRleH0sIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkpO1xuICAgIH1cblxuICAgIHNlbGVjdE1hdGNoKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcztcbiAgICAgICAgY29uc3QgdG90YWxNYXRjaGVzID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXRjaGVzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KSArIGRlbHRhO1xuXG4gICAgICAgIGlmICh0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdG90YWxNYXRjaGVzIC0gMTsgLy8gcmV2ZXJzZSBsb29wXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRJbmRleCA+PSB0b3RhbE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzTm9kZSA9IHRoaXMucmVmcy5tYXRjaGVzO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGVZRW5kID0gbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICsgbWF0Y2hlc05vZGUuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlID0gdGhpcy5yZWZzW2BtYXRjaF8kJHttYXRjaEluZGV4fWBdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hOb2RlWVN0YXJ0ID0gbWF0Y2hOb2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlFbmQgPSBtYXRjaE5vZGVZU3RhcnQgKyBtYXRjaE5vZGUuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyBicmluZyBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAobWF0Y2hOb2RlWUVuZCA+PSBtYXRjaGVzTm9kZVlFbmQpIHsgLy8gYmVsb3dcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgKz0gbWF0Y2hOb2RlWUVuZCAtIG1hdGNoZXNOb2RlWUVuZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hOb2RlWVN0YXJ0IDw9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCkgeyAvLyBhYm92ZVxuICAgICAgICAgICAgICAgIG1hdGNoZXNOb2RlLnNjcm9sbFRvcCA9IG1hdGNoTm9kZVlTdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hJbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICAgICAgZW50aXR5TWF0Y2hJbmRleGVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SW5wdXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmlucHV0LnJlZnMuZmllbGQ7XG4gICAgfVxuXG4gICAgc2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSAwO1xuICAgICAgICBpbnB1dC5zZWxlY3Rpb25FbmQgPSB0aGlzLmdldFZhbHVlKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzID0gKCkgPT4gdGhpcy5nZXRJbnB1dE5vZGUoKS5mb2N1cygpXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuaW5wdXQuZ2V0VmFsdWUoKVxuXG4gICAgc2V0VmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogdmFsdWV9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuICAgIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gdGhpcy5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0TWFya2luZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNfc3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hcmtlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2FybmVkX21hcmtlcikge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWFya2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrZXJgIHdhcyBwcm92aWRlZDsgZmFsbGluZyBiYWNrIHRvIHRoZSBkZWZhdWx0IG1hcmtpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZztcbiAgICB9XG5cbiAgICBtYXJrTWF0Y2hTdWJzdHJpbmcgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXJraW5nRnVuY3Rpb24oKSguLi5hcmdzKVxuXG4gICAgZ2V0RnV6enlNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gZmluZEluZGV4ZXMocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yobm9ybWFsaXplZCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXModXNlclRleHQsIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnN0IHNlZWtWYWx1ZSA9IHVzZXJUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZShmdW5jdGlvbiBzZWVrTWF0Y2gocmVzdWx0LCBlbnRpdHksIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbnRpdHkudGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMFxuICAgICAgICAgICAgICAgICAgID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaGluZ0Z1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNfc3RyaW5nKHRoaXMucHJvcHMuYWxnb3JpdGhtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYWxnb3JpdGhtID09PSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuYWxnb3JpdGhtLm1hdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWF0Y2hlcikge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfbWF0Y2hlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hlcmAgd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWF0Y2hpbmcgYWxnb3JpdGhtIChGVVpaWSkuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcztcbiAgICB9XG5cbiAgICBnZXRNYXRjaEluZGV4ZXMgPSAoLi4uYXJncykgPT4gdGhpcy5nZXRNYXRjaGluZ0Z1bmN0aW9uKCkoLi4uYXJncylcblxuICAgIGNvbXB1dGVNYXRjaGVzKGVudGl0aWVzID0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gY3VycmVudFZhbHVlID09PSAnJyA/IFtdIDogdGhpcy5nZXRNYXRjaEluZGV4ZXMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiBtYXRjaGVzLmxlbmd0aCA/IG1hdGNoZXNbMF0gOiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogbWF0Y2hlcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0sICgpID0+IHRoaXMuY29tcHV0ZU1hdGNoZXMoKSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLmlucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzc31cbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUuaW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnPlxuICAgICAgICAgICAgICAgICAgICB7cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck1hdGNoZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogISFwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLm1hcChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnByb3BzLmVudGl0aWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHRleHQsIC4uLnJlc3R9ID0gZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc05hbWVdOiAhIWNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNYXRjaENsaWNrLmJpbmQodGhpcywgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMubWFya01hdGNoU3Vic3RyaW5nKHRoaXMuc3RhdGUuaW5wdXQsIGVudGl0eSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHByb3BzLCBVSVR5cGVhaGVhZElucHV0LmludGVybmFsX2tleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgIFtwcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPFVJVGV4dHVhbElucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5leHRyYWN0Q2hpbGRQcm9wcyhwcm9wcywgVUlUZXh0dWFsSW5wdXQucHJvcFR5cGVzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdpbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17c3RhdGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb3BzLmlucHV0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGN4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiAhIXByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0OiB0aGlzLmhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19