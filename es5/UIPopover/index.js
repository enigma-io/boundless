'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _omit = require('../UIUtils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _transformProperty = require('../UIUtils/transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
    _inherits(UIPopover, _React$PureComponent);

    function UIPopover(props) {
        _classCallCheck(this, UIPopover);

        var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this));

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
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : _reactDom2.default.findDOMNode(_this.props.anchor);

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

            _this.applyTranslation(_this.$caret, _classnames2.default, 0);
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

    UIPopover.prototype.updateDialogInternalCache = function updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog; // used in testing, not relevant
        this.$wrapper = instance.$wrapper;
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

        window.removeEventListener('resize', this.align, true);
    };

    UIPopover.prototype.cacheViewportCartography = function cacheViewportCartography(anchor) {
        var anchorRect = anchor.getBoundingClientRect();

        this.anchorLeft = anchorRect.left;
        this.anchorTop = anchorRect.top;
        this.anchorHeight = anchorRect.height;
        this.anchorWidth = anchorRect.width;

        this.bodyLeft = document.body.scrollLeft;
        this.bodyTop = document.body.scrollTop;
    };

    UIPopover.prototype.getNextCaretXPosition = function getNextCaretXPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
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
    };

    UIPopover.prototype.getNextCaretYPosition = function getNextCaretYPosition(anchor) {
        var caret = arguments.length <= 1 || arguments[1] === undefined ? this.$caret : arguments[1];
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
    };

    UIPopover.prototype.getNextDialogXPosition = function getNextDialogXPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];
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
    };

    UIPopover.prototype.getNextDialogYPosition = function getNextDialogYPosition(anchor) {
        var dialog = arguments.length <= 1 || arguments[1] === undefined ? this.$wrapper : arguments[1];

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
    };

    UIPopover.prototype.getAlignmentCorrectionIfOverflowing = function getAlignmentCorrectionIfOverflowing(x, y) {
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
    };

    UIPopover.prototype.applyTranslation = function applyTranslation(node, x, y) {
        if (_transformProperty2.default) {
            node.style[_transformProperty2.default] = 'translate(' + x + 'px, ' + y + 'px)';
        } else {
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        }
    };

    UIPopover.prototype.didAlignmentChange = function didAlignmentChange(nextAlignment) {
        var currentAlignment = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];

        return nextAlignment.anchorXAlign !== currentAlignment.anchorXAlign || nextAlignment.anchorYAlign !== currentAlignment.anchorYAlign || nextAlignment.selfXAlign !== currentAlignment.selfXAlign || nextAlignment.selfYAlign !== currentAlignment.selfYAlign;
    };

    UIPopover.prototype.getClassAlignmentFragment = function getClassAlignmentFragment(constant) {
        var position = UIPopover.position;

        switch (constant) {
            case position.START:
                return 'start';

            case position.MIDDLE:
                return 'middle';

            case position.END:
                return 'end';
        }
    };

    UIPopover.prototype.renderDialog = function renderDialog() {
        var _this2 = this,
            _cx,
            _cx2;

        var state = this.state;
        var getFrag = this.getClassAlignmentFragment;

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _omit2.default)(this.props, UIPopover.internalKeys), {
            before: _react2.default.cloneElement(this.props.caretComponent, {
                ref: function ref(node) {
                    return _this2.$caret = node;
                },
                className: (0, _classnames2.default)((_cx = {
                    'ui-popover-caret': true
                }, _cx[this.props.caretComponent.props.className] = !!this.props.caretComponent.props.className, _cx))
            }),
            wrapperProps: _extends({}, this.props.wrapperProps, {
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-popover': true
                }, _cx2['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx2['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx2['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx2['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx2[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx2))
            }) })), this.$container));
    };

    UIPopover.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    return UIPopover;
}(_react2.default.PureComponent);

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
UIPopover.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    anchor: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(HTMLElement), _react.PropTypes.shape({
        props: _react.PropTypes.object,
        state: _react.PropTypes.object
    })]).isRequired,
    anchorXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    anchorYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    autoReposition: _react.PropTypes.bool,
    caretComponent: _react.PropTypes.element,
    preset: _react.PropTypes.oneOf(UIPopover.presetValues),
    selfXAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    selfYAlign: _react.PropTypes.oneOf(UIPopover.positionValues),
    wrapperProps: _react.PropTypes.object
});
UIPopover.internalKeys = without(Object.keys(UIPopover.propTypes), Object.keys(_UIDialog2.default.propTypes));
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    autoReposition: true,
    captureFocus: false,
    caretComponent: _react2.default.createElement(
        'svg',
        { viewBox: '0 0 14 9.5', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-border', fill: '#000', points: '7 0 14 10 0 10' }),
            _react2.default.createElement('polygon', { className: 'ui-popover-caret-fill', fill: '#FFF', points: '6.98230444 1.75 12.75 10 1.25 10' })
        )
    ),
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    preset: UIPopover.preset.BELOW,
    wrapperProps: {}
});
exports.default = UIPopover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUG9wb3Zlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBWEE7Ozs7O0FBYUEsU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCLElBQXZCLEVBQTZCO0FBQUUsV0FBTyxLQUFLLE1BQUwsQ0FBWSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssT0FBTCxDQUFhLElBQWIsTUFBdUIsQ0FBQyxDQUFsQztBQUFBLEtBQVosQ0FBUDtBQUEwRDtBQUN6RixTQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBNkI7QUFBRSxXQUFPLE9BQU8sSUFBUCxDQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBcUIsVUFBQyxHQUFEO0FBQUEsZUFBUyxJQUFJLEdBQUosQ0FBVDtBQUFBLEtBQXJCLENBQVA7QUFBaUQ7O0lBRTNELFM7OztBQThFakIsdUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHFEQUNmLCtCQURlOztBQUFBLGNBMkJuQixrQkEzQm1CLEdBMkJFLFlBQU07QUFDdkI7Ozs7O0FBS0Esa0JBQUssWUFBTDtBQUNBLGtCQUFLLEtBQUw7QUFDSCxTQW5Da0I7O0FBQUEsY0FvT25CLEtBcE9tQixHQW9PWCxZQUFNO0FBQ1YsZ0JBQU0sU0FBVyxNQUFLLEtBQUwsQ0FBVyxNQUFYLFlBQTZCLFdBQTdCLEdBQ0EsTUFBSyxLQUFMLENBQVcsTUFEWCxHQUVBLG1CQUFTLFdBQVQsQ0FBcUIsTUFBSyxLQUFMLENBQVcsTUFBaEMsQ0FGakI7O0FBSUEsa0JBQUssd0JBQUwsQ0FBOEIsTUFBOUI7O0FBRUEsZ0JBQU0sS0FBSyxLQUFLLEtBQUwsQ0FBVyxNQUFLLHNCQUFMLENBQTRCLE1BQTVCLENBQVgsQ0FBWDtBQUNBLGdCQUFNLEtBQUssS0FBSyxLQUFMLENBQVcsTUFBSyxzQkFBTCxDQUE0QixNQUE1QixDQUFYLENBQVg7O0FBRUEsZ0JBQU0s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cG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBVSURpYWxvZyBmcm9tICcuLi9VSURpYWxvZyc7XG5pbXBvcnQgb21pdCBmcm9tICcuLi9VSVV0aWxzL29taXQnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyMSwgYXJyMikgeyByZXR1cm4gYXJyMS5maWx0ZXIoKGl0ZW0pID0+IGFycjIuaW5kZXhPZihpdGVtKSA9PT0gLTEpOyB9XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSAgICAgICAgIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IG9ialtrZXldKTsgfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwb3NpdGlvblZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucG9zaXRpb24pXG5cbiAgICBzdGF0aWMgcHJlc2V0ID0ge1xuICAgICAgICAnQUJPVkUnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICB9LFxuICAgICAgICAnQkVMT1cnOiB7XG4gICAgICAgICAgICBhbmNob3JYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICB9LFxuICAgICAgICAnTEVGVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgICAgICdSSUdIVCc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGljIHByZXNldFZhbHVlcyA9IHZhbHVlcyhVSVBvcG92ZXIucHJlc2V0KVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cucHJvcFR5cGVzLFxuICAgICAgICBhbmNob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBwcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICAgIH0pLCAvLyBhIHJlYWN0IGVsZW1lbnQgb2Ygc29tZSBmYXNoaW9uLCBQcm9wVHlwZXMuZWxlbWVudCB3YXNuJ3Qgd29ya2luZ1xuICAgICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgICBhbmNob3JYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhbmNob3JZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNhcmV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgcHJlc2V0OiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnByZXNldFZhbHVlcyksXG4gICAgICAgIHNlbGZYQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICBzZWxmWUFsaWduOiBQcm9wVHlwZXMub25lT2YoVUlQb3BvdmVyLnBvc2l0aW9uVmFsdWVzKSxcbiAgICAgICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSB3aXRob3V0KE9iamVjdC5rZXlzKFVJUG9wb3Zlci5wcm9wVHlwZXMpLCBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgLi4uVUlEaWFsb2cuZGVmYXVsdFByb3BzLFxuICAgICAgICBhdXRvUmVwb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IChcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD0nMCAwIDE0IDkuNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cbiAgICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWJvcmRlcicgZmlsbD0nIzAwMCcgcG9pbnRzPSc3IDAgMTQgMTAgMCAxMCcgLz5cbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPSd1aS1wb3BvdmVyLWNhcmV0LWZpbGwnIGZpbGw9JyNGRkYnIHBvaW50cz0nNi45ODIzMDQ0NCAxLjc1IDEyLjc1IDEwIDEuMjUgMTAnIC8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICksXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiAgIHByb3BzLmFuY2hvclhBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogICBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiAgICAgcHJvcHMuc2VsZlhBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246ICAgICBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBpbnN0YW5jZTtcbiAgICAgICAgdGhpcy4kZGlhbG9nID0gaW5zdGFuY2UuJGRpYWxvZzsgICAgLy8gdXNlZCBpbiB0ZXN0aW5nLCBub3QgcmVsZXZhbnRcbiAgICAgICAgdGhpcy4kd3JhcHBlciA9IGluc3RhbmNlLiR3cmFwcGVyO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgICAgICAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICAgICAgICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyLWNhcmV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlclByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiJdfQ==