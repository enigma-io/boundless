'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UITextualInput = require('../UITextualInput');

var _UITextualInput2 = _interopRequireDefault(_UITextualInput);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITypeaheadInput = function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITypeaheadInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            entityMatchIndexes: [],
            selectedEntityIndex: -1,
            id: _this.uuid(),
            userInput: _this.props.defaultValue
        }, _this.setValueWithSelectedEntity = function () {
            _this.props.onEntitySelected(_this.state.selectedEntityIndex);

            if (_this.props.clearPartialInputOnSelection) {
                _this.value('');
            } else {
                _this.value(_this.getSelectedEntityText());
            }
        }, _this.handleInput = function (event) {
            event.stopPropagation();

            _this.setState({ userInput: event.target.value }, function () {
                return _this.computeMatches();
            });

            if (_this.props.onInput) {
                event.persist();
                _this.props.onInput(event);
            }

            if (typeof _this.props.inputProps.onInput === 'function') {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    if (event.target.selectionStart > 1) {
                        event.stopPropagation();
                    }

                    break;

                case 'Tab':
                case 'ArrowRight':
                    if (_this.state.selectedEntityIndex !== -1 && _this.cursorAtEndOfInput() && _this.getInputNode() === event.target && !event.shiftKey) {
                        event.nativeEvent.preventDefault();
                        _this.setValueWithSelectedEntity();
                    }

                    break;

                case 'ArrowUp':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    _this.selectMatch(-1);
                    _this.focus();
                    break;

                case 'ArrowDown':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    _this.selectMatch(1);
                    _this.focus();
                    break;

                case 'Escape':
                    if (_this.state.selectedEntityIndex !== -1 && _this.getInputNode() === event.target) {
                        _this.resetMatches();
                    }

                    break;

                case 'Enter':
                    if (_this.state.selectedEntityIndex !== -1 && _this.getInputNode() === event.target) {
                        event.nativeEvent.preventDefault();
                        _this.setValueWithSelectedEntity();
                    } else {
                        _this.props.onComplete(_this.state.userInput);
                    }

                    break;
            }

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITypeaheadInput.prototype.componentWillMount = function componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches();
        }
    };

    UITypeaheadInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
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

    UITypeaheadInput.prototype.getSelectedEntityText = function getSelectedEntityText() {
        var entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.text : '';
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

    UITypeaheadInput.prototype.select = function select() {
        var input = this.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = input.length;
    };

    UITypeaheadInput.prototype.focus = function focus() {
        this.getInputNode().focus();
    };

    UITypeaheadInput.prototype.value = function value(newValue) {
        this.refs.input.value(newValue);

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    };

    UITypeaheadInput.prototype.cursorAtEndOfInput = function cursorAtEndOfInput() {
        var node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
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

    UITypeaheadInput.prototype.markMatchSubstring = function markMatchSubstring() {
        switch (this.props.algorithm) {
            case UITypeaheadInput.mode.STARTS_WITH:
                return this.markStartsWithMatchSubstring.apply(this, arguments);

            case UITypeaheadInput.mode.FUZZY:
                return this.markFuzzyMatchSubstring.apply(this, arguments);
        }

        if (typeof this.props.algorithm.markFunc === 'function') {
            var _props$algorithm;

            return (_props$algorithm = this.props.algorithm).markFunc.apply(_props$algorithm, arguments);
        }

        if (!this.warned_markFunc) {
            this.warned_markFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.markFunc` was provided; falling back to the default marking algorithm.');
        }

        return this.markStartsWithMatchSubstring.apply(this, arguments);
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

    UITypeaheadInput.prototype.getMatchIndexes = function getMatchIndexes() {
        switch (this.props.algorithm) {
            case UITypeaheadInput.mode.STARTS_WITH:
                return this.getStartsWithMatchIndexes.apply(this, arguments);

            case UITypeaheadInput.mode.FUZZY:
                return this.getFuzzyMatchIndexes.apply(this, arguments);
        }

        if (typeof this.props.algorithm.matchFunc === 'function') {
            var _props$algorithm2;

            return (_props$algorithm2 = this.props.algorithm).matchFunc.apply(_props$algorithm2, arguments);
        }

        if (!this.warned_matchFunc) {
            this.warned_matchFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matchFunc` was provided; falling back to the default matching algorithm.');
        }

        return this.getStartsWithMatchIndexes.apply(this, arguments);
    };

    UITypeaheadInput.prototype.computeMatches = function computeMatches() {
        var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

        var currentValue = this.state.userInput;
        var matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

        this.setState({
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndexes: matches
        });
    };

    UITypeaheadInput.prototype.renderNotification = function renderNotification() {
        return _react2.default.createElement(
            'div',
            { ref: 'aria',
                id: this.state.id,
                className: this.props.offscreenClass,
                'aria-live': 'polite' },
            this.getSelectedEntityText()
        );
    };

    UITypeaheadInput.prototype.renderHint = function renderHint() {
        if (this.props.hint) {
            var _cx;

            var userText = this.state.userInput;
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

            return _react2.default.createElement(
                'div',
                _extends({}, this.props.matchWrapperProps, {
                    ref: 'matches',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-typeahead-match-wrapper': true
                    }, _cx2[this.props.matchWrapperProps.className] = !!this.props.matchWrapperProps.className, _cx2)) }),
                this.state.entityMatchIndexes.map(function (index) {
                    var _cx3;

                    var entity = _this2.props.entities[index];

                    return _react2.default.createElement(
                        'div',
                        _extends({}, entity, {
                            ref: 'match_$' + index,
                            className: (0, _classnames2.default)((_cx3 = {
                                'ui-typeahead-match': true,
                                'ui-typeahead-match-selected': _this2.state.selectedEntityIndex === index
                            }, _cx3[entity.className] = !!entity.className, _cx3)),
                            key: entity.text,
                            onClick: _this2.handleMatchClick.bind(_this2, index) }),
                        _this2.markMatchSubstring(_this2.state.userInput, entity)
                    );
                })
            );
        }
    };

    UITypeaheadInput.prototype.render = function render() {
        var _cx4, _cx5;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                type: null,
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-typeahead-wrapper': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                onKeyDown: this.handleKeyDown }),
            this.renderNotification(),
            this.renderHint(),
            _react2.default.createElement(_UITextualInput2.default, { ref: 'input',
                inputProps: _extends({}, this.props.inputProps, {
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-typeahead': true
                    }, _cx5[this.props.inputProps.className] = !!this.props.inputProps.className, _cx5)),
                    defaultValue: this.props.defaultValue || this.props.inputProps.defaultValue,
                    name: this.props.name || this.props.inputProps.name,
                    type: this.props.type || this.props.inputProps.type,
                    onInput: this.handleInput,
                    value: this.props.inputProps.value
                }),
                'aria-controls': this.state.id }),
            this.renderMatches()
        );
    };

    return UITypeaheadInput;
}(_UIView3.default);

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY'
};
UITypeaheadInput.propTypes = {
    algorithm: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf([UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY]), _react2.default.PropTypes.shape({
        markFunc: _react2.default.PropTypes.func,
        matchFunc: _react2.default.PropTypes.func
    })]),
    clearPartialInputOnSelection: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.string,
    entities: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        text: _react2.default.PropTypes.string
    })),
    hint: _react2.default.PropTypes.bool,
    hintProps: _react2.default.PropTypes.object,
    inputProps: _react2.default.PropTypes.object,
    matchWrapperProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onComplete: _react2.default.PropTypes.func,
    onInput: _react2.default.PropTypes.func,
    onEntityHighlighted: _react2.default.PropTypes.func,
    onEntitySelected: _react2.default.PropTypes.func,
    type: _react2.default.PropTypes.string
};
UITypeaheadInput.defaultProps = {
    algorithm: UITypeaheadInput.mode.STARTS_WITH,
    clearPartialInputOnSelection: false,
    defaultValue: '',
    entities: [],
    hintProps: {},
    inputProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntityHighlighted: _noop2.default,
    onEntitySelected: _noop2.default
};
exports.default = UITypeaheadInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzswSUFtRGpCLFFBQVE7QUFDSixnQ0FBb0IsRUFBcEI7QUFDQSxpQ0FBcUIsQ0FBQyxDQUFEO0FBQ3JCLGdCQUFJLE1BQUssSUFBTCxFQUFKO0FBQ0EsdUJBQVcsTUFBSyxLQUFMLENBQVcsWUFBWDtpQkE0R2YsNkJBQTZCLFlBQU07QUFDL0Isa0JBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE1BQUssS0FBTCxDQUFXLG1CQUFYLENBQTVCLENBRCtCOztBQUcvQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyw0QkFBWCxFQUF5QztBQUN6QyxzQkFBSyxLQUFMLENBQVcsRUFBWCxFQUR5QzthQUE3QyxNQUVPO0FBQ0gsc0JBQUssS0FBTCxDQUFXLE1BQUsscUJBQUwsRUFBWCxFQURHO2FBRlA7U0FIeUIsUUEyRzdCLGNBQWMsVUFBQyxLQUFELEVBQVc7QUFDckIsa0JBQU0sZUFBTixHQURxQjs7QUFHckIsa0JBQUssUUFBTCxDQUFjLEVBQUMsV0FBVyxNQUFNLE1BQU4sQ0FBYSxLQUFiLEVBQTFCLEVBQStDO3VCQUFNLE1BQUssY0FBTDthQUFOLENBQS9DLENBSHFCOztBQUtyQixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CO0FBQ3BCLHNCQUFNLE9BQU4sR0FEb0I7QUFFcEIsc0JBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBbkIsRUFGb0I7YUFBeEI7O0FBS0EsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEtBQWtDLFVBQXpDLEVBQXFEO0FBQ3JELHNCQUFNLE9BQU4sR0FEcUQ7QUFFckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUIsRUFGcUQ7YUFBekQ7U0FWVSxRQWdCZCxnQkFBZ0IsVUFBQyxLQUFELEVBQVc7QUFDdkIsb0JBQVEsTUFBTSxHQUFOO0FBQ1IscUJBQUssV0FBTDtBQUNJLHdCQUFJLE1BQU0sTUFBTixDQUFhLGNBQWIsR0FBOEIsQ0FBOUIsRUFBaUM7QUFDakMsOEJBQU0sZUFBTixHQURpQztxQkFBckM7O0FBSUEsMEJBTEo7O0FBREEscUJBUUssS0FBTCxDQVJBO0FBU0EscUJBQUssWUFBTDtBQUNJLHdCQUFPLE1BQUssS0FBTCxDQUFXLG1CQUFYLEtBQW1DLENBQUMsQ0FBRCxJQUNuQyxNQUFLLGtCQUFMLEVBREEsSUFFQSxNQUFLLFlBQUwsT0FBd0IsTUFBTSxNQUFOLElBQ3hCLENBQUMsTUFBTSxRQUFOLEVBQWdCO0FBQ3BCLDhCQUFNLFdBQU4sQ0FBa0IsY0FBbEIsR0FEb0I7QUFFcEIsOEJBQUssMEJBQUwsR0FGb0I7cUJBSHhCOztBQVFBLDBCQVRKOztBQVRBLHFCQW9CSyxTQUFMO0FBQ0ksMEJBQU0sV0FBTixDQUFrQixjQUFsQjtBQURKLHlCQUVJLENBQUssV0FBTCxDQUFpQixDQUFDLENBQUQsQ0FBakIsQ0FGSjtBQUdJLDBCQUFLLEtBQUwsR0FISjtBQUlJLDBCQUpKOztBQXBCQSxxQkEwQkssV0FBTDtBQUNJLDBCQUFNLFdBQU4sQ0FBa0IsY0FBbEI7QUFESix5QkFFSSxDQUFLLFdBQUwsQ0FBaUIsQ0FBakIsRUFGSjtBQUdJLDBCQUFLLEtBQUwsR0FISjtBQUlJLDBCQUpKOztBQTFCQSxxQkFnQ0ssUUFBTDtBQUNJLHdCQUFPLE1BQUssS0FBTCxDQUFXLG1CQUFYLEtBQW1DLENBQUMsQ0FBRCxJQUNuQyxNQUFLLFlBQUwsT0FBd0IsTUFBTSxNQUFOLEVBQWM7QUFDekMsOEJBQUssWUFBTCxHQUR5QztxQkFEN0M7O0FBS0EsMEJBTko7O0FBaENBLHFCQXdDSyxPQUFMO0FBQ0ksd0JBQU8sTUFBSyxLQUFMLENBQVcsbUJBQVgsS0FBbUMsQ0FBQyxDQUFELElBQ25DLE1BQUssWUFBTCxPQUF3QixNQUFNLE1BQU4sRUFBYztBQUN6Qyw4QkFBTSxXQUFOLENBQWtCLGNBQWxCLEdBRHlDO0FBRXpDLDhCQUFLLDBCQUFMLEdBRnlDO3FCQUQ3QyxNQUlPO0FBQ0gsOEJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBSyxLQUFMLENBQVcsU0FBWCxDQUF0QixDQURHO3FCQUpQOztBQVFBLDBCQVRKO0FBeENBLGFBRHVCOztBQXFEdkIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxTQUFYLEtBQXlCLFVBQWhDLEVBQTRDO0FBQzVDLHNCQUFNLE9BQU4sR0FENEM7QUFFNUMsc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckIsRUFGNEM7YUFBaEQ7U0FyRFk7OztBQTlSQywrQkEwRGpCLG1EQUFxQjtBQUNqQixZQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsRUFBeUI7QUFDekIsaUJBQUssY0FBTCxHQUR5QjtTQUE3Qjs7O0FBM0RhLCtCQWdFakIsK0RBQTBCLFdBQVc7QUFDakMsWUFBSSxVQUFVLFFBQVYsS0FBdUIsS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQjtBQUM1QyxpQkFBSyxjQUFMLENBQW9CLFVBQVUsUUFBVixDQUFwQixDQUQ0QztTQUFoRDs7O0FBakVhLCtCQXNFakIsaURBQW9CO0FBQ2hCLFlBQUksS0FBSyxLQUFMLENBQVcsbUJBQVgsSUFBa0MsQ0FBbEMsRUFBcUM7QUFDckMsaUJBQUssS0FBTCxDQUFXLG1CQUFYLENBQStCLEtBQUssS0FBTCxDQUFXLG1CQUFYLENBQS9CLENBRHFDO1NBQXpDOzs7QUF2RWEsK0JBNEVqQixpREFBbUIsV0FBVyxXQUFXO0FBQ3JDLFlBQUksS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsTUFBOUIsSUFBd0MsQ0FBQyxVQUFVLGtCQUFWLENBQTZCLE1BQTdCLEVBQXFDO0FBQzlFLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFNBQWxCLEdBQThCLENBQTlCLENBRDhFO1NBQWxGOztBQURxQyxZQUs5QixLQUFLLEtBQUwsQ0FBVyxtQkFBWCxJQUFrQyxDQUFsQyxJQUNBLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxLQUFMLENBQVcsbUJBQVgsQ0FBcEIsS0FBd0QsVUFBVSxRQUFWLENBQW1CLFVBQVUsbUJBQVYsQ0FBM0UsRUFBMkc7QUFDOUcsaUJBQUssS0FBTCxDQUFXLG1CQUFYLENBQStCLEtBQUssS0FBTCxDQUFXLG1CQUFYLENBQS9CLENBRDhHO1NBRGxIOzs7QUFqRmEsK0JBdUZqQix5REFBd0I7QUFDcEIsWUFBTSxTQUFTLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxLQUFMLENBQVcsbUJBQVgsQ0FBN0IsQ0FEYzs7QUFHcEIsZUFBTyxTQUFTLE9BQU8sSUFBUCxHQUFjLEVBQXZCLENBSGE7OztBQXZGUCwrQkE2RmpCLDZDQUFpQixPQUFPO0FBQ3BCLGFBQUssUUFBTCxDQUFjLEVBQUMscUJBQXFCLEtBQXJCLEVBQWYsRUFBNEMsS0FBSywwQkFBTCxDQUE1QyxDQURvQjs7O0FBN0ZQLCtCQWlHakIsbUNBQVksT0FBTztBQUNmLFlBQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUREO0FBRWYsWUFBTSxlQUFlLFFBQVEsTUFBUixDQUZOO0FBR2YsWUFBSSxZQUFZLFFBQVEsT0FBUixDQUFnQixLQUFLLEtBQUwsQ0FBVyxtQkFBWCxDQUFoQixHQUFrRCxLQUFsRCxDQUhEOztBQUtmLFlBQUksWUFBSixFQUFrQjtBQUNkLGdCQUFJLFlBQVksQ0FBWixFQUFlO0FBQ2YsNEJBQVksZUFBZSxDQUFmO0FBREcsYUFBbkIsTUFFTyxJQUFJLGFBQWEsWUFBYixFQUEyQjtBQUNsQyxnQ0FBWSxDQUFaO0FBRGtDLGlCQUEvQjs7QUFJUCxnQkFBTSxhQUFhLFFBQVEsU0FBUixDQUFiLENBUFE7QUFRZCxnQkFBTSxjQUFjLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FSTjtBQVNkLGdCQUFNLGtCQUFrQixZQUFZLFNBQVosR0FBd0IsWUFBWSxZQUFaLENBVGxDO0FBVWQsZ0JBQU0sWUFBWSxLQUFLLElBQUwsYUFBb0IsVUFBcEIsQ0FBWixDQVZRO0FBV2QsZ0JBQU0sa0JBQWtCLFVBQVUsU0FBVixDQVhWO0FBWWQsZ0JBQU0sZ0JBQWdCLGtCQUFrQixVQUFVLFlBQVY7OztBQVoxQixnQkFlVixpQkFBaUIsZUFBakIsRUFBa0M7O0FBQ2xDLDRCQUFZLFNBQVosSUFBeUIsZ0JBQWdCLGVBQWhCLENBRFM7YUFBdEMsTUFFTyxJQUFJLG1CQUFtQixZQUFZLFNBQVosRUFBdUI7O0FBQ2pELDRCQUFZLFNBQVosR0FBd0IsZUFBeEIsQ0FEaUQ7YUFBOUM7O0FBSVAsaUJBQUssUUFBTCxDQUFjLEVBQUMscUJBQXFCLFVBQXJCLEVBQWYsRUFyQmM7U0FBbEI7OztBQXRHYSwrQkErSGpCLHVDQUFlO0FBQ1gsYUFBSyxRQUFMLENBQWM7QUFDVixpQ0FBcUIsQ0FBQyxDQUFEO0FBQ3JCLGdDQUFvQixFQUFwQjtTQUZKLEVBRFc7OztBQS9IRSwrQkFzSWpCLHVDQUFlO0FBQ1gsZUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLElBQWhCLENBQXFCLEtBQXJCLENBREk7OztBQXRJRSwrQkEwSWpCLDJCQUFTO0FBQ0wsWUFBTSxRQUFRLEtBQUssWUFBTCxFQUFSLENBREQ7O0FBR0wsY0FBTSxjQUFOLEdBQXVCLENBQXZCLENBSEs7QUFJTCxjQUFNLFlBQU4sR0FBcUIsTUFBTSxNQUFOLENBSmhCOzs7QUExSVEsK0JBaUpqQix5QkFBUTtBQUNKLGFBQUssWUFBTCxHQUFvQixLQUFwQixHQURJOzs7QUFqSlMsK0JBcUpqQix1QkFBTSxVQUFVO0FBQ1osYUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixLQUFoQixDQUFzQixRQUF0QixFQURZOztBQUdaLGFBQUssUUFBTCxDQUFjLEVBQUUsV0FBVyxRQUFYLEVBQWhCLEVBSFk7QUFJWixhQUFLLFlBQUwsR0FKWTtBQUtaLGFBQUssS0FBTCxHQUxZOzs7QUFySkMsK0JBNkpqQixtREFBcUI7QUFDakIsWUFBTSxPQUFPLEtBQUssWUFBTCxFQUFQLENBRFc7O0FBR2pCLGVBQU8sS0FBSyxjQUFMLEtBQXdCLEtBQUssWUFBTCxJQUFxQixLQUFLLFlBQUwsS0FBc0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUh6RDs7O0FBN0pKLCtCQTZLakIsMkRBQXdCLE9BQU8sUUFBUTtBQUNuQyxZQUFNLGdCQUFnQixPQUFPLElBQVAsQ0FEYTtBQUVuQyxZQUFNLFFBQVEsY0FBYyxLQUFkLENBQW9CLElBQUksTUFBSixDQUFXLE1BQU0sa0NBQVEsS0FBUixDQUFOLEdBQXVCLEdBQXZCLEVBQTRCLElBQXZDLENBQXBCLENBQVIsQ0FGNkI7QUFHbkMsWUFBTSxxQkFBcUIsTUFBTSxXQUFOLEVBQXJCLENBSDZCO0FBSW5DLFlBQU0sWUFBWSxNQUFNLE1BQU4sQ0FKaUI7QUFLbkMsWUFBSSxJQUFJLENBQUMsQ0FBRCxDQUwyQjs7QUFPbkMsZUFBTyxFQUFFLENBQUYsR0FBTSxTQUFOLEVBQWlCO0FBQ3BCLGdCQUFJLE1BQU0sQ0FBTixFQUFTLFdBQVQsT0FBMkIsa0JBQTNCLEVBQStDO0FBQy9DLHNCQUFNLENBQU4sSUFBVzs7c0JBQU0sS0FBSyxDQUFMLEVBQVEsV0FBVSw4QkFBVixFQUFkO29CQUF3RCxNQUFNLENBQU4sQ0FBeEQ7aUJBQVgsQ0FEK0M7YUFBbkQ7U0FESjs7QUFNQSxlQUFPLEtBQVAsQ0FibUM7OztBQTdLdEIsK0JBNkxqQixxRUFBNkIsT0FBTyxRQUFRO0FBQ3hDLFlBQU0sZ0JBQWdCLE9BQU8sSUFBUCxDQURrQjtBQUV4QyxZQUFNLFlBQVksTUFBTSxXQUFOLEVBQVosQ0FGa0M7QUFHeEMsWUFBTSxhQUFhLGNBQWMsV0FBZCxHQUE0QixPQUE1QixDQUFvQyxTQUFwQyxDQUFiLENBSGtDO0FBSXhDLFlBQU0sV0FBVyxhQUFhLFVBQVUsTUFBVixDQUpVOztBQU14QyxlQUFPLENBQ0g7O2NBQU0sS0FBSSxHQUFKLEVBQU47WUFBZSxjQUFjLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUIsVUFBdkIsQ0FBZjtTQURHLEVBRUg7O2NBQU0sS0FBSSxHQUFKLEVBQVEsV0FBVSw4QkFBVixFQUFkO1lBQXdELGNBQWMsS0FBZCxDQUFvQixVQUFwQixFQUFnQyxRQUFoQyxDQUF4RDtTQUZHLEVBR0g7O2NBQU0sS0FBSSxHQUFKLEVBQU47WUFBZSxjQUFjLEtBQWQsQ0FBb0IsUUFBcEIsQ0FBZjtTQUhHLENBQVAsQ0FOd0M7OztBQTdMM0IsK0JBME1qQixtREFBNEI7QUFDeEIsZ0JBQVEsS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNSLGlCQUFLLGlCQUFpQixJQUFqQixDQUFzQixXQUF0QjtBQUNELHVCQUFPLEtBQUssNEJBQUwsdUJBQVAsQ0FESjs7QUFEQSxpQkFJSyxpQkFBaUIsSUFBakIsQ0FBc0IsS0FBdEI7QUFDRCx1QkFBTyxLQUFLLHVCQUFMLHVCQUFQLENBREo7QUFKQSxTQUR3Qjs7QUFTeEIsWUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsUUFBckIsS0FBa0MsVUFBekMsRUFBcUQ7OztBQUNyRCxtQkFBTyx5QkFBSyxLQUFMLENBQVcsU0FBWCxFQUFxQixRQUFyQixtQ0FBUCxDQURxRDtTQUF6RDs7QUFJQSxZQUFJLENBQUMsS0FBSyxlQUFMLEVBQXNCO0FBQ3ZCLGlCQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FEdUI7QUFFdkIsb0JBQVEsSUFBUixDQUFhLDhHQUFiLEVBRnVCO1NBQTNCOztBQUtBLGVBQU8sS0FBSyw0QkFBTCx1QkFBUCxDQWxCd0I7OztBQTFNWCwrQkErTmpCLHFEQUFxQixVQUFVLFVBQVU7QUFDckMsWUFBTSxhQUFhLFNBQVMsV0FBVCxFQUFiLENBRCtCOztBQUdyQyxlQUFPLFNBQVMsTUFBVCxDQUFnQixTQUFTLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkIsTUFBN0IsRUFBcUMsS0FBckMsRUFBNEM7QUFDL0QsbUJBQU8sT0FBTyxJQUFQLENBQVksV0FBWixHQUEwQixPQUExQixDQUFrQyxVQUFsQyxNQUFrRCxDQUFDLENBQUQsR0FBTSxPQUFPLElBQVAsQ0FBWSxLQUFaLEtBQXNCLE1BQXRCLEdBQWdDLE1BQXhGLENBRHdEO1NBQTVDLEVBRXBCLEVBRkksQ0FBUCxDQUhxQzs7O0FBL054QiwrQkF1T2pCLCtEQUEwQixVQUFVLFVBQVU7QUFDMUMsWUFBTSxZQUFZLFNBQVMsV0FBVCxFQUFaLENBRG9DOztBQUcxQyxlQUFPLFNBQVMsTUFBVCxDQUFnQixTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsS0FBbkMsRUFBMEM7QUFDN0QsbUJBQU8sT0FBTyxJQUFQLENBQVksV0FBWixHQUEwQixPQUExQixDQUFrQyxTQUFsQyxNQUFpRCxDQUFqRCxHQUFzRCxPQUFPLElBQVAsQ0FBWSxLQUFaLEtBQXNCLE1BQXRCLEdBQWdDLE1BQXRGLENBRHNEO1NBQTFDLEVBRXBCLEVBRkksQ0FBUCxDQUgwQzs7O0FBdk83QiwrQkErT2pCLDZDQUF5QjtBQUNyQixnQkFBUSxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1IsaUJBQUssaUJBQWlCLElBQWpCLENBQXNCLFdBQXRCO0FBQ0QsdUJBQU8sS0FBSyx5QkFBTCx1QkFBUCxDQURKOztBQURBLGlCQUlLLGlCQUFpQixJQUFqQixDQUFzQixLQUF0QjtBQUNELHVCQUFPLEtBQUssb0JBQUwsdUJBQVAsQ0FESjtBQUpBLFNBRHFCOztBQVNyQixZQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixTQUFyQixLQUFtQyxVQUExQyxFQUFzRDs7O0FBQ3RELG1CQUFPLDBCQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXFCLFNBQXJCLG9DQUFQLENBRHNEO1NBQTFEOztBQUlBLFlBQUksQ0FBQyxLQUFLLGdCQUFMLEVBQXVCO0FBQ3hCLGlCQUFLLGdCQUFMLEdBQXdCLElBQXhCLENBRHdCO0FBRXhCLG9CQUFRLElBQVIsQ0FBYSxnSEFBYixFQUZ3QjtTQUE1Qjs7QUFLQSxlQUFPLEtBQUsseUJBQUwsdUJBQVAsQ0FsQnFCOzs7QUEvT1IsK0JBb1FqQiwyQ0FBK0M7WUFBaEMsaUVBQVcsS0FBSyxLQUFMLENBQVcsUUFBWCxnQkFBcUI7O0FBQzNDLFlBQU0sZUFBZSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBRHNCO0FBRTNDLFlBQU0sVUFBVSxpQkFBaUIsRUFBakIsR0FBc0IsRUFBdEIsR0FBMkIsS0FBSyxlQUFMLENBQXFCLFlBQXJCLEVBQW1DLFFBQW5DLENBQTNCLENBRjJCOztBQUkzQyxhQUFLLFFBQUwsQ0FBYztBQUNWLGlDQUFxQixRQUFRLE1BQVIsR0FBaUIsUUFBUSxDQUFSLENBQWpCLEdBQThCLENBQUMsQ0FBRDtBQUNuRCxnQ0FBb0IsT0FBcEI7U0FGSixFQUoyQzs7O0FBcFE5QiwrQkF5VmpCLG1EQUFxQjtBQUNqQixlQUNJOztjQUFLLEtBQUksTUFBSjtBQUNBLG9CQUFJLEtBQUssS0FBTCxDQUFXLEVBQVg7QUFDSiwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxjQUFYO0FBQ1gsNkJBQVUsUUFBVixFQUhMO1lBSUssS0FBSyxxQkFBTCxFQUpMO1NBREosQ0FEaUI7OztBQXpWSiwrQkFvV2pCLG1DQUFhO0FBQ1QsWUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCOzs7QUFDakIsZ0JBQU0sV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBREE7QUFFakIsZ0JBQU0sTUFBTSxLQUFLLHFCQUFMLEVBQU4sQ0FGVztBQUdqQixnQkFBSSxZQUFZLEVBQVosQ0FIYTs7QUFLakIsZ0JBQU8sT0FDQSxJQUFJLFdBQUosR0FBa0IsT0FBbEIsQ0FBMEIsU0FBUyxXQUFULEVBQTFCLE1BQXNELENBQXRELEVBQXlEO0FBQzVELDRCQUFZLElBQUksT0FBSixDQUFZLElBQUksTUFBSixDQUFXLFFBQVgsRUFBcUIsR0FBckIsQ0FBWixFQUF1QyxRQUF2QyxDQUFaLENBRDREO2FBRGhFOztBQUtBLG1CQUNJOzs2QkFBUyxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ0oseUJBQUksTUFBSjtBQUNBLCtCQUFXO0FBQ1AsNENBQW9CLElBQXBCO0FBQ0Esd0RBQWdDLElBQWhDO0FBQ0EsNkNBQXFCLElBQXJCOzJCQUNDLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBckIsSUFBaUMsQ0FBQyxDQUFDLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBckIsTUFKN0IsQ0FBWDtBQU1BLDhCQUFTLElBQVQsR0FSTDtnQkFTSyxTQVRMO2FBREosQ0FWaUI7U0FBckI7OztBQXJXYSwrQkErWGpCLHlDQUFnQjs7O0FBQ1osWUFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixNQUE5QixFQUFzQzs7O0FBQ3RDLG1CQUNJOzs2QkFBUyxLQUFLLEtBQUwsQ0FBVyxpQkFBWDtBQUNKLHlCQUFJLFNBQUo7QUFDQSwrQkFBVztBQUNQLHNEQUE4QixJQUE5Qjs0QkFDQyxLQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixTQUE3QixJQUF5QyxDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsaUJBQVgsQ0FBNkIsU0FBN0IsT0FGckMsQ0FBWCxHQUZMO2dCQU1LLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLEdBQTlCLENBQWtDLGlCQUFTOzs7QUFDeEMsd0JBQU0sU0FBUyxPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLENBQVQsQ0FEa0M7O0FBR3hDLDJCQUNJOztxQ0FBUztBQUNKLDZDQUFlLEtBQWY7QUFDQSx1Q0FBVztBQUNQLHNEQUFzQixJQUF0QjtBQUNBLCtEQUErQixPQUFLLEtBQUwsQ0FBVyxtQkFBWCxLQUFtQyxLQUFuQztvQ0FDOUIsT0FBTyxTQUFQLElBQW1CLENBQUMsQ0FBQyxPQUFPLFNBQVAsT0FIZixDQUFYO0FBS0EsaUNBQUssT0FBTyxJQUFQO0FBQ0wscUNBQVMsT0FBSyxnQkFBTCxDQUFzQixJQUF0QixTQUFpQyxLQUFqQyxDQUFULEdBUkw7d0JBU0ssT0FBSyxrQkFBTCxDQUF3QixPQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLE1BQTlDLENBVEw7cUJBREosQ0FId0M7aUJBQVQsQ0FOdkM7YUFESixDQURzQztTQUExQzs7O0FBaFlhLCtCQThaakIsMkJBQVM7OztBQUNMLGVBQ0k7O3lCQUFTLEtBQUssS0FBTDtBQUNKLHNCQUFNLElBQU47QUFDQSxxQkFBSSxTQUFKO0FBQ0EsMkJBQVc7QUFDUiw0Q0FBd0IsSUFBeEI7d0JBQ0MsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF1QixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBWCxPQUZsQixDQUFYO0FBSUEsMkJBQVcsS0FBSyxhQUFMLEdBUGhCO1lBUUssS0FBSyxrQkFBTCxFQVJMO1lBU0ssS0FBSyxVQUFMLEVBVEw7WUFXSSwwREFBZ0IsS0FBSSxPQUFKO0FBQ0EseUNBQ08sS0FBSyxLQUFMLENBQVcsVUFBWDtBQUNILCtCQUFXO0FBQ1Asd0NBQWdCLElBQWhCOzRCQUNDLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsSUFBa0MsQ0FBQyxDQUFDLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsT0FGOUIsQ0FBWDtBQUlBLGtDQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsSUFBMkIsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixZQUF0QjtBQUN6QywwQkFBTSxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEI7QUFDekIsMEJBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCO0FBQ3pCLDZCQUFTLEtBQUssV0FBTDtBQUNULDJCQUFPLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEI7a0JBVlg7QUFZQSxpQ0FBZSxLQUFLLEtBQUwsQ0FBVyxFQUFYLEVBYi9CLENBWEo7WUEwQkssS0FBSyxhQUFMLEVBMUJMO1NBREosQ0FESzs7O1dBOVpROzs7aUJBQ1YsT0FBTztBQUNWLG1CQUFlLGFBQWY7QUFDQSxhQUFTLE9BQVQ7O0FBSGEsaUJBTVYsWUFBWTtBQUNmLGVBQVcsZ0JBQU0sU0FBTixDQUFnQixTQUFoQixDQUEwQixDQUNqQyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLENBQ2xCLGlCQUFpQixJQUFqQixDQUFzQixXQUF0QixFQUNBLGlCQUFpQixJQUFqQixDQUFzQixLQUF0QixDQUZKLENBRGlDLEVBS2pDLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDbEIsa0JBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNWLG1CQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7S0FGZixDQUxpQyxDQUExQixDQUFYO0FBVUEsa0NBQThCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDOUIsa0JBQWMsZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNkLGNBQVUsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUNOLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDbEIsY0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0tBRFYsQ0FETSxDQUFWO0FBS0EsVUFBTSxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ04sZUFBVyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1gsZ0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNaLHVCQUFtQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ25CLFVBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNOLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2hCLGdCQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDWixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDVCx5QkFBcUIsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNyQixzQkFBa0IsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNsQixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O0FBbENPLGlCQXFDVixlQUFlO0FBQ2xCLGVBQVcsaUJBQWlCLElBQWpCLENBQXNCLFdBQXRCO0FBQ1gsa0NBQThCLEtBQTlCO0FBQ0Esa0JBQWMsRUFBZDtBQUNBLGNBQVUsRUFBVjtBQUNBLGVBQVcsRUFBWDtBQUNBLGdCQUFZLEVBQVo7QUFDQSx1QkFBbUIsRUFBbkI7QUFDQSxvQkFBZ0IsY0FBaEI7QUFDQSw4QkFUa0I7QUFVbEIsdUNBVmtCO0FBV2xCLG9DQVhrQjs7a0JBckNMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVRleHR1YWxJbnB1dCBmcm9tICcuLi9VSVRleHR1YWxJbnB1dCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbGdvcml0aG06IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dC5yZWZzLmZpZWxkO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gaW5wdXQubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LnZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcklucHV0OiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSBub2RlLnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmFsZ29yaXRobSkge1xuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG5cbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlk6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWFya0Z1bmMpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hcmtGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrRnVuY2Agd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0uJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTEgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzKC4uLmFyZ3MpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmFsZ29yaXRobSkge1xuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG5cbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlk6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXRjaEZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hdGNoRnVuYyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0uJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNYXRjaGVzKGVudGl0aWVzID0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSwgKCkgPT4gdGhpcy5jb21wdXRlTWF0Y2hlcygpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0naGludCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSc+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlbnRpdHkudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyh0aGlzLnN0YXRlLnVzZXJJbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHR5cGU9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPFVJVGV4dHVhbElucHV0IHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuaW5wdXRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0OiB0aGlzLmhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17dGhpcy5zdGF0ZS5pZH0gLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1hdGNoZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==