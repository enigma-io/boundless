'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Intelligently recommend entities via customizable, fuzzy recognition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITypeaheadInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITypeaheadInput = (function (_UIView) {
    _inherits(UITypeaheadInput, _UIView);

    function UITypeaheadInput() {
        _classCallCheck(this, UITypeaheadInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITypeaheadInput).apply(this, arguments));
    }

    _createClass(UITypeaheadInput, [{
        key: 'initialState',
        value: function initialState() {
            return {
                entityMatchIndices: [],
                selectedEntityIndex: -1,
                id: this.uuid(),
                userInput: this.props.defaultValue
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.defaultValue) {
                this.computeMatches();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.entities !== this.props.entities) {
                this.computeMatches(nextProps.entities);
            }
        }
    }, {
        key: 'getSelectedEntityContent',
        value: function getSelectedEntityContent() {
            var entity = this.props.entities[this.state.selectedEntityIndex];

            return entity ? entity.content : '';
        }
    }, {
        key: 'renderNotification',
        value: function renderNotification() {
            return _react2.default.createElement(
                'div',
                { ref: 'aria',
                    id: this.state.id,
                    className: this.props.offscreenClass,
                    'aria-live': 'polite' },
                this.getSelectedEntityContent()
            );
        }
    }, {
        key: 'renderHint',
        value: function renderHint() {
            if (this.props.hint) {
                var userText = this.state.userInput;
                var raw = this.getSelectedEntityContent();
                var processed = '';

                if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                    processed = raw.replace(new RegExp(userText, 'i'), userText);
                }

                return _react2.default.createElement('input', _extends({}, this.props.hintProps, {
                    ref: 'hint',
                    type: 'text',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead-hint': true
                    }, this.props.hintProps.className, !!this.props.hintProps.className)),
                    value: processed,
                    disabled: true,
                    tabIndex: '-1' }));
            }
        }
    }, {
        key: 'handleMatchClick',
        value: function handleMatchClick(index) {
            var _this2 = this;

            this.setState({ selectedEntityIndex: index }, function () {
                return _this2.setValueWithSelectedEntity();
            });
        }
    }, {
        key: 'markMatchSubstring',
        value: function markMatchSubstring(entityContent, userInput) {
            if (this.props.markFunc) {
                return this.props.markFunc(entityContent, userInput);
            }

            var seekValue = userInput.toLowerCase();
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
        }
    }, {
        key: 'renderMatches',
        value: function renderMatches() {
            var _this3 = this;

            if (this.state.entityMatchIndices.length) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, this.props.matchWrapperProps, {
                        ref: 'matches',
                        className: (0, _classnames2.default)(_defineProperty({
                            'ui-typeahead-match-wrapper': true
                        }, this.props.matchWrapperProps.className, !!this.props.matchWrapperProps.className)) }),
                    this.state.entityMatchIndices.map(function (index) {
                        var entity = _this3.props.entities[index];

                        return _react2.default.createElement(
                            'div',
                            _extends({}, entity, {
                                className: (0, _classnames2.default)(_defineProperty({
                                    'ui-typeahead-match': true,
                                    'ui-typeahead-match-selected': _this3.state.selectedEntityIndex === index
                                }, entity.className, !!entity.className)),
                                key: _this3.createHashedKey(entity.content),
                                onClick: _this3.handleMatchClick.bind(_this3, index) }),
                            _this3.markMatchSubstring(entity.content, _this3.state.userInput)
                        );
                    })
                );
            }
        }
    }, {
        key: 'selectMatch',
        value: function selectMatch(delta) {
            var matches = this.state.entityMatchIndices;
            var totalMatches = matches.length;
            var nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

            if (totalMatches) {
                if (nextIndex < 0) {
                    nextIndex = totalMatches - 1; // reverse loop
                } else if (nextIndex >= totalMatches) {
                        nextIndex = 0; // loop
                    }

                this.setState({ selectedEntityIndex: matches[nextIndex] });
            }
        }
    }, {
        key: 'resetMatches',
        value: function resetMatches() {
            this.setState({
                selectedEntityIndex: -1,
                entityMatchIndices: []
            });
        }
    }, {
        key: 'getInputNode',
        value: function getInputNode() {
            return this.refs.input;
        }
    }, {
        key: 'focusInput',
        value: function focusInput() {
            this.getInputNode().focus();
        }
    }, {
        key: 'setValue',
        value: function setValue(newValue) {
            this.getInputNode().value = newValue;

            this.setState({ userInput: newValue });
            this.resetMatches();
            this.focusInput();
        }
    }, {
        key: 'cursorAtEndOfInput',
        value: function cursorAtEndOfInput() {
            var node = this.getInputNode();

            return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
        }
    }, {
        key: 'setValueWithSelectedEntity',
        value: function setValueWithSelectedEntity() {
            this.props.onEntitySelected(this.state.selectedEntityIndex);

            if (this.props.clearPartialInputOnSelection) {
                this.setValue('');
            } else {
                this.setValue(this.getSelectedEntityContent());
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    if (event.target.selectionStart > 1) {
                        event.stopPropagation();
                    }

                    break;

                case 'Tab':
                case 'ArrowRight':
                    if (this.state.selectedEntityIndex !== -1 && this.cursorAtEndOfInput() && this.getInputNode() === event.target) {
                        event.nativeEvent.preventDefault();
                        this.setValueWithSelectedEntity();
                    }

                    break;

                case 'ArrowUp':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    this.selectMatch(-1);
                    this.focusInput();
                    break;

                case 'ArrowDown':
                    event.nativeEvent.preventDefault(); // block cursor movement
                    this.selectMatch(1);
                    this.focusInput();
                    break;

                case 'Escape':
                    if (this.state.selectedEntityIndex !== -1 && this.getInputNode() === event.target) {
                        this.resetMatches();
                    }

                    break;

                case 'Enter':
                    if (this.state.selectedEntityIndex !== -1 && this.getInputNode() === event.target) {
                        event.nativeEvent.preventDefault();
                        this.setValueWithSelectedEntity();
                    } else {
                        this.props.onComplete(this.state.userInput);
                    }

                    break;
            }

            if (typeof this.props.onKeyDown === 'function') {
                event.persist();
                this.props.onKeyDown(event);
            }
        }

        // The default implementation is a simple "starts-with" search

    }, {
        key: 'getMatchIndices',
        value: function getMatchIndices(currentValue, entities) {
            if (this.props.matchFunc) {
                return this.props.matchFunc(currentValue, entities);
            }

            var seekValue = currentValue.toLowerCase();

            return entities.reduce(function seekMatch(result, entity, index) {
                return entity.content.toLowerCase().indexOf(seekValue) === 0 ? result.push(index) && result : result;
            }, []);
        }
    }, {
        key: 'computeMatches',
        value: function computeMatches() {
            var entities = arguments.length <= 0 || arguments[0] === undefined ? this.props.entities : arguments[0];

            var currentValue = this.state.userInput;
            var matches = currentValue === '' ? [] : this.getMatchIndices(currentValue, entities);

            this.setState({
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndices: matches
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            var _this4 = this;

            this.setState({ userInput: event.target.value }, function () {
                return _this4.computeMatches();
            });

            if (this.props.onInput) {
                event.persist();
                this.props.onInput(event);
            }

            if (typeof this.props.inputProps.onInput === 'function') {
                event.persist();
                this.props.inputProps.onInput(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    defaultValue: undefined,
                    name: undefined,
                    type: undefined,
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead-wrapper': true
                    }, this.props.className, !!this.props.className)),
                    onKeyDown: this.handleKeyDown.bind(this) }),
                this.renderNotification(),
                this.renderHint(),
                _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                    ref: 'input',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-typeahead': true
                    }, this.props.inputProps.className, !!this.props.inputProps.className)),
                    defaultValue: this.props.defaultValue || this.props.inputProps.defaultValue,
                    name: this.props.name || this.props.inputProps.name,
                    type: this.props.type || this.props.inputProps.type || 'text',
                    'aria-controls': this.state.id,
                    onInput: this.handleInput.bind(this) })),
                this.renderMatches()
            );
        }
    }]);

    return UITypeaheadInput;
})(_UIView3.default);

UITypeaheadInput.propTypes = {
    clearPartialInputOnSelection: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.string,
    entities: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        content: _react2.default.PropTypes.string
    })),
    hint: _react2.default.PropTypes.bool,
    hintProps: _react2.default.PropTypes.object,
    inputProps: _react2.default.PropTypes.object,
    markFunc: _react2.default.PropTypes.func,
    matchFunc: _react2.default.PropTypes.func,
    matchWrapperProps: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onComplete: _react2.default.PropTypes.func,
    onInput: _react2.default.PropTypes.func,
    onEntitySelected: _react2.default.PropTypes.func,
    type: _react2.default.PropTypes.string
};

UITypeaheadInput.defaultProps = {
    clearPartialInputOnSelection: false,
    defaultValue: '',
    entities: [],
    hintProps: {},
    inputProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: _noop2.default,
    onEntitySelected: _noop2.default
};

exports.default = UITypeaheadInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVHlwZWFoZWFkSW5wdXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVU0sZ0JBQWdCO2NBQWhCLGdCQUFnQjs7YUFBaEIsZ0JBQWdCOzhCQUFoQixnQkFBZ0I7O3NFQUFoQixnQkFBZ0I7OztpQkFBaEIsZ0JBQWdCOzt1Q0FDSDtBQUNYLG1CQUFPO0FBQ0gsa0NBQWtCLEVBQUUsRUFBRTtBQUN0QixtQ0FBbUIsRUFBRSxDQUFDLENBQUM7QUFDdkIsa0JBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2YseUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7YUFDckMsQ0FBQztTQUNMOzs7NkNBRW9CO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ3pCLG9CQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7U0FDSjs7O2tEQUV5QixTQUFTLEVBQUU7QUFDakMsZ0JBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUM1QyxvQkFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0M7U0FDSjs7O21EQUUwQjtBQUN2QixnQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUVuRSxtQkFBTyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDdkM7Ozs2Q0FFb0I7QUFDakIsbUJBQ0k7O2tCQUFLLEdBQUcsRUFBQyxNQUFNO0FBQ1Ysc0JBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQUFBQztBQUNsQiw2QkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxBQUFDO0FB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ekIsQ0FBQzs7a0JBRWEsZ0JBQWdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBJbnRlbGxpZ2VudGx5IHJlY29tbWVuZCBlbnRpdGllcyB2aWEgY3VzdG9taXphYmxlLCBmdXp6eSByZWNvZ25pdGlvbi5cbiAqIEBjbGFzcyBVSVR5cGVhaGVhZElucHV0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJVHlwZWFoZWFkSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kaWNlczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnV1aWQoKSxcbiAgICAgICAgICAgIHVzZXJJbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuZW50aXRpZXMgIT09IHRoaXMucHJvcHMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZU1hdGNoZXMobmV4dFByb3BzLmVudGl0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5wcm9wcy5lbnRpdGllc1t0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBlbnRpdHkgPyBlbnRpdHkuY29udGVudCA6ICcnO1xuICAgIH1cblxuICAgIHJlbmRlck5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJ1xuICAgICAgICAgICAgICAgICBpZD17dGhpcy5zdGF0ZS5pZH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzfVxuICAgICAgICAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0U2VsZWN0ZWRFbnRpdHlDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJIaW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaW50KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyVGV4dCA9IHRoaXMuc3RhdGUudXNlcklucHV0O1xuICAgICAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5nZXRTZWxlY3RlZEVudGl0eUNvbnRlbnQoKTtcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSAnJztcblxuICAgICAgICAgICAgaWYgKCAgIHJhd1xuICAgICAgICAgICAgICAgICYmIHJhdy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodXNlclRleHQudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSByYXcucmVwbGFjZShuZXcgUmVnRXhwKHVzZXJUZXh0LCAnaScpLCB1c2VyVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmhpbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdoaW50J1xuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtaGludCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oaW50UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhpbnRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkfVxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJyAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1hdGNoQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbnRpdHlJbmRleDogaW5kZXh9LCAoKSA9PiB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCkpO1xuICAgIH1cblxuICAgIG1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHlDb250ZW50LCB1c2VySW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWFya0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1hcmtGdW5jKGVudGl0eUNvbnRlbnQsIHVzZXJJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSB1c2VySW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXhTdGFydCA9IGVudGl0eUNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlZWtWYWx1ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIHNlZWtWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMCc+e2VudGl0eUNvbnRlbnQuc2xpY2UoMCwgaW5kZXhTdGFydCl9PC9zcGFuPixcbiAgICAgICAgICAgIDxtYXJrIGtleT0nMScgY2xhc3NOYW1lPSd1aS10eXBlYWhlYWQtbWF0Y2gtaGlnaGxpZ2h0Jz57ZW50aXR5Q29udGVudC5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCl9PC9tYXJrPixcbiAgICAgICAgICAgIDxzcGFuIGtleT0nMic+e2VudGl0eUNvbnRlbnQuc2xpY2UoaW5kZXhFbmQpfTwvc3Bhbj4sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0Y2hlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzLm1hdGNoV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPSdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZC1tYXRjaC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5tYXRjaFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubWF0Y2hXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRpdHlNYXRjaEluZGljZXMubWFwKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucHJvcHMuZW50aXRpZXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgey4uLmVudGl0eX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10eXBlYWhlYWQtbWF0Y2gtc2VsZWN0ZWQnOiB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbnRpdHkuY2xhc3NOYW1lXTogISFlbnRpdHkuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RoaXMuY3JlYXRlSGFzaGVkS2V5KGVudGl0eS5jb250ZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTWF0Y2hDbGljay5iaW5kKHRoaXMsIGluZGV4KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtNYXRjaFN1YnN0cmluZyhlbnRpdHkuY29udGVudCwgdGhpcy5zdGF0ZS51c2VySW5wdXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TWF0Y2goZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuc3RhdGUuZW50aXR5TWF0Y2hJbmRpY2VzO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoZXMgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hdGNoZXMuaW5kZXhPZih0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0b3RhbE1hdGNoZXMgLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4ID49IHRvdGFsTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkRW50aXR5SW5kZXg6IG1hdGNoZXNbbmV4dEluZGV4XSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eUluZGV4OiAtMSxcbiAgICAgICAgICAgIGVudGl0eU1hdGNoSW5kaWNlczogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldElucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5pbnB1dDtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLmdldElucHV0Tm9kZSgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRJbnB1dE5vZGUoKS52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5wdXQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG5cbiAgICBjdXJzb3JBdEVuZE9mSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldElucHV0Tm9kZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdGlvblN0YXJ0ID09PSBub2RlLnNlbGVjdGlvbkVuZCAmJiBub2RlLnNlbGVjdGlvbkVuZCA9PT0gbm9kZS52YWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRpdHlTZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldFNlbGVjdGVkRW50aXR5Q29udGVudCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmN1cnNvckF0RW5kT2ZJbnB1dCgpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlV2l0aFNlbGVjdGVkRW50aXR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgZXZlbnQubmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gYmxvY2sgY3Vyc29yIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKC0xKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGV2ZW50Lm5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGJsb2NrIGN1cnNvciBtb3ZlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNYXRjaCgxKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGlmICggICB0aGlzLnN0YXRlLnNlbGVjdGVkRW50aXR5SW5kZXggIT09IC0xXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5nZXRJbnB1dE5vZGUoKSA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgaWYgKCAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRFbnRpdHlJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdldElucHV0Tm9kZSgpID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVXaXRoU2VsZWN0ZWRFbnRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRoaXMuc3RhdGUudXNlcklucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIHNpbXBsZSBcInN0YXJ0cy13aXRoXCIgc2VhcmNoXG4gICAgZ2V0TWF0Y2hJbmRpY2VzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWF0Y2hGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXRjaEZ1bmMoY3VycmVudFZhbHVlLCBlbnRpdGllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWVrVmFsdWUgPSBjdXJyZW50VmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKGZ1bmN0aW9uIHNlZWtNYXRjaChyZXN1bHQsIGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkuY29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2Vla1ZhbHVlKSA9PT0gMCA/IChyZXN1bHQucHVzaChpbmRleCkgJiYgcmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbXB1dGVNYXRjaGVzKGVudGl0aWVzID0gdGhpcy5wcm9wcy5lbnRpdGllcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLnVzZXJJbnB1dDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGN1cnJlbnRWYWx1ZSA9PT0gJycgPyBbXSA6IHRoaXMuZ2V0TWF0Y2hJbmRpY2VzKGN1cnJlbnRWYWx1ZSwgZW50aXRpZXMpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHlJbmRleDogbWF0Y2hlcy5sZW5ndGggPyBtYXRjaGVzWzBdIDogLTEsXG4gICAgICAgICAgICBlbnRpdHlNYXRjaEluZGljZXM6IG1hdGNoZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJJbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSwgKCkgPT4gdGhpcy5jb21wdXRlTWF0Y2hlcygpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0KSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgIG5hbWU9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgdHlwZT17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdHlwZWFoZWFkLXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTm90aWZpY2F0aW9uKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGludCgpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHJlZj0naW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXR5cGVhaGVhZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgJ3RleHQnfVxuICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXt0aGlzLnN0YXRlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyl9IC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJVHlwZWFoZWFkSW5wdXQucHJvcFR5cGVzID0ge1xuICAgIGNsZWFyUGFydGlhbElucHV0T25TZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbnRpdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjb250ZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KVxuICAgICksXG4gICAgaGludDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaGludFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbWFya0Z1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG1hdGNoRnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWF0Y2hXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVudGl0eVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVUlUeXBlYWhlYWRJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xlYXJQYXJ0aWFsSW5wdXRPblNlbGVjdGlvbjogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBlbnRpdGllczogW10sXG4gICAgaGludFByb3BzOiB7fSxcbiAgICBpbnB1dFByb3BzOiB7fSxcbiAgICBtYXRjaFdyYXBwZXJQcm9wczoge30sXG4gICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgIG9uQ29tcGxldGU6IG5vb3AsXG4gICAgb25FbnRpdHlTZWxlY3RlZDogbm9vcCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVHlwZWFoZWFkSW5wdXQ7XG4iXX0=