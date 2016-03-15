'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
        return this.refs.input;
    };

    UITypeaheadInput.prototype.select = function select() {
        this.refs.input.selectionStart = 0;
        this.refs.input.selectionEnd = this.refs.input.value.length;
    };

    UITypeaheadInput.prototype.focus = function focus() {
        this.getInputNode().focus();
    };

    UITypeaheadInput.prototype.focusInput = function focusInput() {
        if (!this.warned_focusInput) {
            this.warned_focusInput = true;
            console.warn('UITypeaheadInput: `focusInput()` is deprecated and will be removed in a future release. Please use UITypeaheadInput.focus() instead.');
        }

        this.focus();
    };

    UITypeaheadInput.prototype.value = function value(newValue) {
        this.getInputNode().value = newValue;

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    };

    UITypeaheadInput.prototype.setValue = function setValue(newValue) {
        if (!this.warned_setValue) {
            this.warned_setValue = true;
            console.warn('UITypeaheadInput: `setValue(text)` is deprecated and will be removed in a future release. Please use UITypeaheadInput.value(text) instead.');
        }

        this.value(newValue);
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

            return _react2.default.createElement('input', _extends({}, this.props.hintProps, {
                ref: 'hint',
                type: this.props.type || this.props.inputProps.type || 'text',
                className: (0, _classnames2.default)((_cx = {
                    'ui-typeahead-hint': true
                }, _cx[this.props.hintProps.className] = !!this.props.hintProps.className, _cx)),
                value: processed,
                disabled: true,
                tabIndex: '-1' }));
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
            _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'input',
                className: (0, _classnames2.default)((_cx5 = {
                    'ui-typeahead': true
                }, _cx5[this.props.inputProps.className] = !!this.props.inputProps.className, _cx5)),
                defaultValue: this.props.defaultValue || this.props.inputProps.defaultValue,
                name: this.props.name || this.props.inputProps.name,
                type: this.props.type || this.props.inputProps.type || 'text',
                'aria-controls': this.state.id,
                onInput: this.handleInput })),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdxQjs7Ozs7Ozs7Ozs7OzBJQW1EakIsUUFBUTtBQUNKLGdDQUFvQixFQUFwQjtBQUNBLGlDQUFxQixDQUFDLENBQUQ7QUFDckIsZ0JBQUksTUFBSyxJQUFMLEVBQUo7QUFDQSx1QkFBVyxNQUFLLEtBQUwsQ0FBVyxZQUFYO2lCQTRIZiw2QkFBNkIsWUFBTTtBQUMvQixrQkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsTUFBSyxLQUFMLENBQVcsbUJBQVgsQ0FBNUIsQ0FEK0I7O0FBRy9CLGdCQUFJLE1BQUssS0FBTCxDQUFXLDRCQUFYLEVBQXlDO0FBQ3pDLHNCQUFLLEtBQUwsQ0FBVyxFQUFYLEVBRHlDO2FBQTdDLE1BRU87QUFDSCxzQkFBSyxLQUFMLENBQVcsTUFBSyxxQkFBTCxFQUFYLEVBREc7YUFGUDtTQUh5QixRQTJHN0IsY0FBYyxVQUFDLEtBQUQsRUFBVztBQUNyQixrQkFBTSxlQUFOLEdBRHFCOztBQUdyQixrQkFBSyxRQUFMLENBQWMsRUFBQyxXQUFXLE1BQU0sTUFBTixDQUFhLEtBQWIsRUFBMUIsRUFBK0M7dUJBQU0sTUFBSyxjQUFMO2FBQU4sQ0FBL0MsQ0FIcUI7O0FBS3JCLGdCQUFJLE1BQUssS0FBTCxDQUFXLE9BQVgsRUFBb0I7QUFDcEIsc0JBQU0sT0FBTixHQURvQjtBQUVwQixzQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFuQixFQUZvQjthQUF4Qjs7QUFLQSxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsS0FBa0MsVUFBekMsRUFBcUQ7QUFDckQsc0JBQU0sT0FBTixHQURxRDtBQUVyRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUF0QixDQUE4QixLQUE5QixFQUZxRDthQUF6RDtTQVZVLFFBZ0JkLGdCQUFn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QU4sQ0FBZ0IsSUFBaEI7QUFDckIsc0JBQWtCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDbEIsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztBQWxDTyxpQkFxQ1YsZUFBZTtBQUNsQixlQUFXLGlCQUFpQixJQUFqQixDQUFzQixXQUF0QjtBQUNYLGtDQUE4QixLQUE5QjtBQUNBLGtCQUFjLEVBQWQ7QUFDQSxjQUFVLEVBQVY7QUFDQSxlQUFXLEVBQVg7QUFDQSxnQkFBWSxFQUFaO0FBQ0EsdUJBQW1CLEVBQW5CO0FBQ0Esb0JBQWdCLGNBQWhCO0FBQ0EsOEJBVGtCO0FBVWxCLHVDQVZrQjtBQVdsQixvQ0FYa0I7O2tCQXJDTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSW50ZWxsaWdlbnRseSByZWNvbW1lbmQgZW50aXRpZXMgdmlhIGN1c3RvbWl6YWJsZSwgZnV6enkgcmVjb2duaXRpb24uXG4gKiBAY2xhc3MgVUlUeXBlYWhlYWRJbnB1dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGVzY2FwZXIgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVR5cGVhaGVhZElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgbW9kZSA9IHtcbiAgICAgICAgJ1NUQVJUU19XSVRIJzogJ1NUQVJUU19XSVRIJyxcbiAgICAgICAgJ0ZVWlpZJzogJ0ZVWlpZJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhbGdvcml0aG06IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgICAgICBVSVR5cGVhaGVhZElucHV0Lm1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICAgICAgVUlUeXBlYWhlYWRJbnB1dC5tb2RlLkZVWlpZLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcmtGdW5jOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgICAgICBtYXRjaEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pLFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBoaW50OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaGludFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBtYXRjaFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uQ29tcGxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FbnRpdHlIaWdobGlnaHRlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGFsZ29yaXRobTogVUlUeXBlYWhlYWRJbnB1dC5tb2RlLlNUQVJUU19XSVRILFxuICAgICAgICBjbGVhclBhcnRpYWxJbnB1dE9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICBoaW50UHJvcHM6IHt9LFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbWF0Y2hXcmFwcGVyUHJvcHM6IHt9LFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5SGlnaGxpZ2h0ZWQ6IG5vb3AsXG4gICAgICAgIG9uRW50aXR5U2VsZWN0ZWQ6IG5vb3AsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIHNlbGVjdGVkRW50aXR5SW5kZXg6IC0xLFxuICAgICAgICBpZDogdGhpcy51dWlkKCksXG4gICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlIaWdobGlnaHRlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVudGl0eU1hdGNoSW5kZXhlcy5sZW5ndGggJiYgIXByZXZTdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMubWF0Y2hlcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9IC8vIGZpeCBhbiBvZGQgYnVnIGluIEZGIHdoZXJlIGl0IGluaXRpYWxpemVzIHRoZSBlbGVtZW50IHdpdGggYW4gaW5jb3JyZWN0IHNjcm9sbFRvcFxuXG4gICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPj0gMFxuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdICE9PSBwcmV2UHJvcHMuZW50aXRpZXNbcHJldlN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW50aXR5SGlnaGxpZ2h0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5VGV4dCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkudGV4dCA6ICcnO1xuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RNYXRjaChkZWx0YSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXM7XG4gICAgICAgIGNvbnN0IHRvdGFsTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWF0Y2hlcy5pbmRleE9mKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCkgKyBkZWx0YTtcblxuICAgICAgICBpZiAodG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRvdGFsTWF0Y2hlcyAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPj0gdG90YWxNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gMDsgLy8gbG9vcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbWF0Y2hlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc05vZGUgPSB0aGlzLnJlZnMubWF0Y2hlcztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNOb2RlWUVuZCA9IG1hdGNoZXNOb2RlLnNjcm9sbFRvcCArIG1hdGNoZXNOb2RlLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IHRoaXMucmVmc1tgbWF0Y2hfJCR7bWF0Y2hJbmRleH1gXTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZVlTdGFydCA9IG1hdGNoTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zdCBtYXRjaE5vZGVZRW5kID0gbWF0Y2hOb2RlWVN0YXJ0ICsgbWF0Y2hOb2RlLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgLy8gYnJpbmcgaW50byB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKG1hdGNoTm9kZVlFbmQgPj0gbWF0Y2hlc05vZGVZRW5kKSB7IC8vIGJlbG93XG4gICAgICAgICAgICAgICAgbWF0Y2hlc05vZGUuc2Nyb2xsVG9wICs9IG1hdGNoTm9kZVlFbmQgLSBtYXRjaGVzTm9kZVlFbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoTm9kZVlTdGFydCA8PSBtYXRjaGVzTm9kZS5zY3JvbGxUb3ApIHsgLy8gYWJvdmVcbiAgICAgICAgICAgICAgICBtYXRjaGVzTm9kZS5zY3JvbGxUb3AgPSBtYXRjaE5vZGVZU3RhcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoSW5kZXh9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kZXhlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBzZWxlY3QoKSB7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIHRoaXMucmVmcy5pbnB1dC5zZWxlY3Rpb25FbmQgPSB0aGlzLnJlZnMuaW5wdXQudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9mb2N1c0lucHV0KSB7XG4gICAgICAgICAgICB0aGlzLndhcm5lZF9mb2N1c0lucHV0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogYGZvY3VzSW5wdXQoKWAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuIFBsZWFzZSB1c2UgVUlUeXBlYWhlYWRJbnB1dC5mb2N1cygpIGluc3RlYWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9zZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy53YXJuZWRfc2V0VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVSVR5cGVhaGVhZElucHV0OiBgc2V0VmFsdWUodGV4dClgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLiBQbGVhc2UgdXNlIFVJVHlwZWFoZWFkSW5wdXQudmFsdWUodGV4dCkgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGN1cnNvckF0RW5kT2ZJbnB1dCgpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0SW5wdXROb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGUuc2VsZWN0aW9uU3RhcnQgPT09IG5vZGUuc2VsZWN0aW9uRW5kICYmIG5vZGUuc2VsZWN0aW9uRW5kID09PSBub2RlLnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZVdpdGhTZWxlY3RlZEVudGl0eSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVudGl0eVNlbGVjdGVkKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlKHRoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlUZXh0KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya0Z1enp5TWF0Y2hTdWJzdHJpbmcoaW5wdXQsIGVudGl0eSkge1xuICAgICAgICBjb25zdCBlbnRpdHlDb250ZW50ID0gZW50aXR5LnRleHQ7XG4gICAgICAgIGNvbnN0IGZyYWdzID0gZW50aXR5Q29udGVudC5zcGxpdChuZXcgUmVnRXhwKCcoJyArIGVzY2FwZXIoaW5wdXQpICsgJyknLCAnaWcnKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VyVGV4dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZyYWdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAtMTtcblxuICAgICAgICB3aGlsZSAoKytpIDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZnJhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFVzZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgZnJhZ3NbaV0gPSA8bWFyayBrZXk9e2l9IGNsYXNzTmFtZT0ndWktdHlwZWFoZWFkLW1hdGNoLWhpZ2hsaWdodCc+e2ZyYWdzW2ldfTwvbWFyaz47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ3M7XG4gICAgfVxuXG4gICAgbWFya1N0YXJ0c1dpdGhNYXRjaFN1YnN0cmluZyhpbnB1dCwgZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUNvbnRlbnQgPSBlbnRpdHkudGV4dDtcbiAgICAgICAgY29uc3Qgc2Vla1ZhbHVlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbWFya01hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmFsZ29yaXRobSkge1xuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtTdGFydHNXaXRoTWF0Y2hTdWJzdHJpbmcoLi4uYXJncyk7XG5cbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlk6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrRnV6enlNYXRjaFN1YnN0cmluZyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hbGdvcml0aG0ubWFya0Z1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsZ29yaXRobS5tYXJrRnVuYyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy53YXJuZWRfbWFya0Z1bmMpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hcmtGdW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVUlUeXBlYWhlYWRJbnB1dDogbm8gYHByb3BzLmFsZ29yaXRobS5tYXJrRnVuY2Agd2FzIHByb3ZpZGVkOyBmYWxsaW5nIGJhY2sgdG8gdGhlIGRlZmF1bHQgbWFya2luZyBhbGdvcml0aG0uJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrU3RhcnRzV2l0aE1hdGNoU3Vic3RyaW5nKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldEZ1enp5TWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdXNlclRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIGZpbmRJbmRleGVzKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihub3JtYWxpemVkKSAhPT0gLTEgPyAocmVzdWx0LnB1c2goaW5kZXgpICYmIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBnZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKHVzZXJUZXh0LCBlbnRpdGllcykge1xuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VyVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoZnVuY3Rpb24gc2Vla01hdGNoKHJlc3VsdCwgZW50aXR5LCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWVrVmFsdWUpID09PSAwID8gKHJlc3VsdC5wdXNoKGluZGV4KSAmJiByZXN1bHQpIDogcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZ2V0TWF0Y2hJbmRleGVzKC4uLmFyZ3MpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmFsZ29yaXRobSkge1xuICAgICAgICBjYXNlIFVJVHlwZWFoZWFkSW5wdXQubW9kZS5TVEFSVFNfV0lUSDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0c1dpdGhNYXRjaEluZGV4ZXMoLi4uYXJncyk7XG5cbiAgICAgICAgY2FzZSBVSVR5cGVhaGVhZElucHV0Lm1vZGUuRlVaWlk6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGdXp6eU1hdGNoSW5kZXhlcyguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLndhcm5lZF9tYXRjaEZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmVkX21hdGNoRnVuYyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VJVHlwZWFoZWFkSW5wdXQ6IG5vIGBwcm9wcy5hbGdvcml0aG0ubWF0Y2hGdW5jYCB3YXMgcHJvdmlkZWQ7IGZhbGxpbmcgYmFjayB0byB0aGUgZGVmYXVsdCBtYXRjaGluZyBhbGdvcml0aG0uJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydHNXaXRoTWF0Y2hJbmRleGVzKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGNvbXB1dGVNYXRjaGVzKGVudGl0aWVzID0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRleGVzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGV4ZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSwgKCkgPT4gdGhpcy5jb21wdXRlTWF0Y2hlcygpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA+IDEpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3Vyc29yQXRFbmRPZklucHV0KClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBibG9jayBjdXJzb3IgbW92ZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goLTEpO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBpZiAoICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ICE9PSAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZ2V0SW5wdXROb2RlKCkgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSh0aGlzLnN0YXRlLnVzZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm90aWZpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnXG4gICAgICAgICAgICAgICAgIGlkPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3N9XG4gICAgICAgICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRTZWxlY3RlZEVudGl0eVRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckhpbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJUZXh0ID0gdGhpcy5zdGF0ZS51c2VySW5wdXQ7XG4gICAgICAgICAgICBjb25zdCByYXcgPSB0aGlzLmdldFNlbGVjdGVkRW50aXR5VGV4dCgpO1xuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoICAgcmF3XG4gICAgICAgICAgICAgICAgJiYgcmF3LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih1c2VyVGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHJhdy5yZXBsYWNlKG5ldyBSZWdFeHAodXNlclRleHQsICdpJyksIHVzZXJUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaGludFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2hpbnQnXG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1oaW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGludFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWR9XG4gICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nLTEnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGV4ZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17YG1hdGNoXyQke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLW1hdGNoLXNlbGVjdGVkJzogdGhpcy5zdGF0ZS5zZWxlY3RlZEVudGl0eUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW50aXR5LmNsYXNzTmFtZV06ICEhZW50aXR5LmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlbnRpdHkudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyh0aGlzLnN0YXRlLnVzZXJJbnB1dCwgZW50aXR5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHR5cGU9e251bGx9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTWF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19