'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.without');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.values');

var _lodash6 = _interopRequireDefault(_lodash5);

var _UIDialog = require('../UIDialog');

var _UIDialog2 = _interopRequireDefault(_UIDialog);

var _transformProperty = require('../UIUtils/transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking container positioned to a specific anchor element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPopover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _lodash2.default)(this.props, UIPopover.internalKeys), {
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
UIPopover.positionValues = (0, _lodash6.default)(UIPopover.position);
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
UIPopover.presetValues = (0, _lodash6.default)(UIPopover.preset);
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
UIPopover.internalKeys = _lodash4.default.apply(undefined, [Object.keys(UIPopover.propTypes)].concat(Object.keys(_UIDialog2.default.propTypes)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUG9wb3Zlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJVSVBvcG92ZXIiLCJwcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsInJlbmRlckRpYWxvZyIsImFsaWduIiwiYW5jaG9yIiwiSFRNTEVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsImNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeSIsImR4IiwiTWF0aCIsInJvdW5kIiwiZ2V0TmV4dERpYWxvZ1hQb3NpdGlvbiIsImR5IiwiZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbiIsImFsaWdubWVudENvcnJlY3Rpb24iLCJnZXRBbGlnbm1lbnRDb3JyZWN0aW9uSWZPdmVyZmxvd2luZyIsImRpZEFsaWdubWVudENoYW5nZSIsInNldFN0YXRlIiwiJGNhcmV0Iiwic3R5bGUiLCJsZWZ0IiwiZ2V0TmV4dENhcmV0WFBvc2l0aW9uIiwidG9wIiwiZ2V0TmV4dENhcmV0WVBvc2l0aW9uIiwiYXBwbHlUcmFuc2xhdGlvbiIsIiR3cmFwcGVyIiwic3RhdGUiLCJhbmNob3JYQWxpZ24iLCJwcmVzZXQiLCJhbmNob3JZQWxpZ24iLCJzZWxmWEFsaWduIiwic2VsZllBbGlnbiIsInVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUiLCJpbnN0YW5jZSIsImRpYWxvZyIsIiRkaWFsb2ciLCJjb21wb25lbnRXaWxsTW91bnQiLCIkY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlbW92ZUNoaWxkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFuY2hvclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJhbmNob3JMZWZ0IiwiYW5jaG9yVG9wIiwiYW5jaG9ySGVpZ2h0IiwiaGVpZ2h0IiwiYW5jaG9yV2lkdGgiLCJ3aWR0aCIsImJvZHlMZWZ0Iiwic2Nyb2xsTGVmdCIsImJvZHlUb3AiLCJzY3JvbGxUb3AiLCJjYXJldCIsInBvc2l0aW9uIiwibmV4dFgiLCJNSURETEUiLCJTVEFSVCIsIkVORCIsImNsaWVudFdpZHRoIiwibmV4dFkiLCJjbGllbnRIZWlnaHQiLCJhbmNob3JZIiwieCIsInkiLCJhdXRvUmVwb3NpdGlvbiIsImNvcnJlY3Rpb25zIiwieE1heCIsInNjcm9sbFdpZHRoIiwieU1heCIsInNjcm9sbEhlaWdodCIsIm5vZGUiLCJuZXh0QWxpZ25tZW50IiwiY3VycmVudEFsaWdubWVudCIsImdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQiLCJjb25zdGFudCIsImdldEZyYWciLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJjbG9uZUVsZW1lbnQiLCJjYXJldENvbXBvbmVudCIsInJlZiIsImNsYXNzTmFtZSIsIndyYXBwZXJQcm9wcyIsIlB1cmVDb21wb25lbnQiLCJwb3NpdGlvblZhbHVlcyIsInByZXNldFZhbHVlcyIsInByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImluc3RhbmNlT2YiLCJzaGFwZSIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJvbmVPZiIsImJvb2wiLCJlbGVtZW50IiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyIsImNhcHR1cmVGb2N1cyIsImNsb3NlT25Fc2NLZXkiLCJjbG9zZU9uT3V0c2lkZUNsaWNrIiwiY2xvc2VPbk91dHNpZGVTY3JvbGwiLCJCRUxPVyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFiQTs7Ozs7SUFlcUJBLFM7OztBQThFakIsdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZiwrQkFEZTs7QUFBQSxjQTJCbkJDLGtCQTNCbUIsR0EyQkUsWUFBTTtBQUN2Qjs7Ozs7QUFLQSxrQkFBS0MsWUFBTDtBQUNBLGtCQUFLQyxLQUFMO0FBQ0gsU0FuQ2tCOztBQUFBLGNBb09uQkEsS0FwT21CLEdBb09YLFlBQU07QUFDVixnQkFBTUMsU0FBVyxNQUFLSixLQUFMLENBQVdJLE1BQVgsWUFBNkJDLFdBQTdCLEdBQ0EsTUFBS0wsS0FBTCxDQUFXSSxNQURYLEdBRUEsbUJBQVNFLFdBQVQsQ0FBcUIsTUFBS04sS0FBTCxDQUFXSSxNQUFoQyxDQUZqQjs7QUFJQSxrQkFBS0csd0JBQUwsQ0FBOEJILE1BQTlCOztBQUVBLGdCQUFNSSxLQUFLQyxLQUFLQyxLQUFMLENBQVcsTUFBS0Msc0JBQUwsQ0FBNEJQLE1BQTVCLENBQVgsQ0FBWDtBQUNBLGdCQUFNUSxLQUFLSCxLQUFLQyxLQUFMLENBQVcsTUFBS0csc0JBQUwsQ0FBNEJULE1BQTVCLENBQVgsQ0FBWDs7QUFFQSxnQkFBTVUsc0JBQXNCLE1BQUtDLG1DQUFMLENBQXlDUCxFQUF6QyxFQUE2Q0ksRUFBN0MsQ0FBNUI7O0FBRUEsZ0JBQUlFLHVCQUF1QixNQUFLRSxrQkFBTCxDQUF3QkYsbUJBQXhCLENBQTNCLEVBQXlFO0FBQ3JFLHVCQUFPLE1BQUtHLFFBQUwsQ0FBY0gsbUJBQWQsRUFBbUMsTUFBS2Isa0JBQXhDLENBQVA7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBS2lCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQkMsSUFBbEIsR0FBeUJYLEtBQUtDLEtBQUwsQ0FBVyxNQUFLVyxxQkFBTCxDQUEyQmpCLE1BQTNCLENBQVgsSUFBaUQsSUFBMUU7QUFDQSxrQkFBS2MsTUFBTCxDQUFZQyxLQUFaLENBQWtCRyxHQUFsQixHQUF3QmIsS0FBS0MsS0FBTCxDQUFXLE1BQUthLHFCQUFMLENBQTJCbkIsTUFBM0IsQ0FBWCxJQUFpRCxJQUF6RTs7QUFFQSxrQkFBS29CLGdCQUFMLENBQXNCLE1BQUtOLE1BQTNCLHdCQUF1QyxDQUF2QztBQUNBLGtCQUFLTSxnQkFBTCxDQUFzQixNQUFLQyxRQUEzQixFQUFxQ2pCLEVBQXJDLEVBQXlDSSxFQUF6QztBQUNILFNBOVBrQjs7QUFHZixjQUFLYyxLQUFMLEdBQWE7QUFDVEMsMEJBQWdCM0IsTUFBTTJCLFlBQU4sSUFBdUIzQixNQUFNNEIsTUFBTixDQUFhRCxZQUQzQztBQUVURSwwQkFBZ0I3QixNQUFNNkIsWUFBTixJQUF1QjdCLE1BQU00QixNQUFOLENBQWFDLFlBRjNDO0FBR1RDLHdCQUFnQjlCLE1BQU04QixVQUFOLElBQXVCOUIsTUFBTTRCLE1BQU4sQ0FBYUUsVUFIM0M7QUFJVEMsd0JBQWdCL0IsTUFBTStCLFVBQU4sSUFBdUIvQixNQUFNNEIsTUFBTixDQUFhRztBQUozQyxTQUFiO0FBSGU7QUFTbEI7O3dCQUVEQyx5QixzQ0FBMEJDLFEsRUFBVTtBQUNoQyxhQUFLQyxNQUFMLEdBQWNELFFBQWQ7QUFDQSxhQUFLRSxPQUFMLEdBQWVGLFNBQVNFLE9BQXhCLENBRmdDLENBRUk7QUFDcEMsYUFBS1YsUUFBTCxHQUFnQlEsU0FBU1IsUUFBekI7QUFDSCxLOzt3QkFFRFcsa0IsaUNBQXFCO0FBQ2pCLGFBQUtDLFVBQUwsR0FBa0JDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUQsaUJBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLSixVQUEvQjs7QUFFQSxhQUFLbkMsWUFBTDtBQUNBLGFBQUtDLEtBQUw7O0FBRUF1QyxlQUFPQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxLQUFLeEMsS0FBdkMsRUFBOEMsSUFBOUM7QUFDSCxLOzt3QkFZRHlDLG9CLG1DQUF1QjtBQUNuQiwyQkFBU0Msc0JBQVQsQ0FBZ0MsS0FBS1IsVUFBckM7QUFDQUMsaUJBQVNFLElBQVQsQ0FBY00sV0FBZCxDQUEwQixLQUFLVCxVQUEvQjs7QUFFQUssZUFBT0ssbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzVDLEtBQTFDLEVBQWlELElBQWpEO0FBQ0gsSzs7d0JBRURJLHdCLHFDQUF5QkgsTSxFQUFRO0FBQzdCLFlBQU00QyxhQUFhNUMsT0FBTzZDLHFCQUFQLEVBQW5COztBQUVBLGFBQUtDLFVBQUwsR0FBa0JGLFdBQVc1QixJQUE3QjtBQUNBLGFBQUsrQixTQUFMLEdBQWlCSCxXQUFXMUIsR0FBNUI7QUFDQSxhQUFLOEIsWUFBTCxHQUFvQkosV0FBV0ssTUFBL0I7QUFDQSxhQUFLQyxXQUFMLEdBQW1CTixXQUFXTyxLQUE5Qjs7QUFFQSxhQUFLQyxRQUFMLEdBQWdCbEIsU0FBU0UsSUFBVCxDQUFjaUIsVUFBOUI7QUFDQSxhQUFLQyxPQUFMLEdBQWVwQixTQUFTRSxJQUFULENBQWNtQixTQUE3QjtBQUNILEs7O3dCQUVEdEMscUIsa0NBQXNCakIsTSxFQUE2QjtBQUFBLFlBQXJCd0QsS0FBcUIseURBQWIsS0FBSzFDLE1BQVE7QUFBQSxxQkFDYyxLQUFLUSxLQURuQjtBQUFBLFlBQ3hDQyxZQUR3QyxVQUN4Q0EsWUFEd0M7QUFBQSxZQUMxQkcsVUFEMEIsVUFDMUJBLFVBRDBCO0FBQUEsWUFDZEQsWUFEYyxVQUNkQSxZQURjO0FBQUEsWUFDQUUsVUFEQSxVQUNBQSxVQURBOztBQUUvQyxZQUFNOEIsV0FBVzlELFVBQVU4RCxRQUEzQjs7QUFFQSxZQUFJQyxRQUFRLENBQVo7O0FBRUE7QUFDQTs7QUFFQSxZQUFPaEMsZUFBZStCLFNBQVNFLE1BQXhCLEtBQ0lsQyxpQkFBaUJnQyxTQUFTRyxLQUExQixJQUFtQ2pDLGVBQWU4QixTQUFTSSxHQUEzRCxJQUNBcEMsaUJBQWlCZ0MsU0FBU0ksR0FBMUIsSUFBaUNsQyxlQUFlOEIsU0FBU0csS0FGN0QsQ0FBUCxFQUU0RTs7QUFFeEUsZ0JBQUlyQyxpQkFBaUJrQyxTQUFTRyxLQUE5QixFQUFxQztBQUNqQ0YseUJBQVMsS0FBS1IsV0FBTCxHQUFtQixDQUFuQixHQUF1Qk0sTUFBTU0sV0FBTixHQUFvQixDQUFwRDtBQUNILGFBRkQsTUFFTyxJQUFJdkMsaUJBQWlCa0MsU0FBU0ksR0FBOUIsRUFBbUM7QUFDdENILHlCQUFTLEtBQUtyQyxRQUFMLENBQWN5QyxXQUFkLEdBQTRCLEtBQUtaLFdBQUwsR0FBbUIsQ0FBL0MsR0FBbURNLE1BQU1NLFdBQU4sR0FBb0IsQ0FBaEY7QUFDSDtBQUNKOztBQUVELGVBQU9KLEtBQVA7QUFDSCxLOzt3QkFFRHZDLHFCLGtDQUFzQm5CLE0sRUFBNkI7QUFBQSxZQUFyQndELEtBQXFCLHlEQUFiLEtBQUsxQyxNQUFRO0FBQUEsc0JBQ2MsS0FBS1EsS0FEbkI7QUFBQSxZQUN4Q0MsWUFEd0MsV0FDeENBLFlBRHdDO0FBQUEsWUFDMUJHLFVBRDBCLFdBQzFCQSxVQUQwQjtBQUFBLFlBQ2RELFlBRGMsV0FDZEEsWUFEYztBQUFBLFlBQ0FFLFVBREEsV0FDQUEsVUFEQTs7QUFFL0MsWUFBTThCLFdBQVc5RCxVQUFVOEQsUUFBM0I7O0FBRUEsWUFBSU0sUUFBUSxDQUFaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFPcEMsZUFBZThCLFNBQVNFLE1BQXhCLEtBQ0lwQyxpQkFBaUJrQyxTQUFTRyxLQUExQixJQUFtQ2xDLGVBQWUrQixTQUFTSSxHQUEzRCxJQUNBdEMsaUJBQWlCa0MsU0FBU0ksR0FBMUIsSUFBaUNuQyxlQUFlK0IsU0FBU0csS0FGN0QsQ0FBUCxFQUU0RTs7QUFFeEUsZ0JBQUluQyxpQkFBaUJnQyxTQUFTRyxLQUE5QixFQUFxQztBQUNqQ0cseUJBQVMsS0FBS2YsWUFBTCxHQUFvQixDQUFwQixHQUF3QlEsTUFBTU0sV0FBTixHQUFvQixDQUFyRDtBQUNILGFBRkQsTUFFTyxJQUFJckMsaUJBQWlCZ0MsU0FBU0ksR0FBOUIsRUFBbUM7QUFDdENFLHlCQUFTLEtBQUsxQyxRQUFMLENBQWMyQyxZQUFkLEdBQTZCLEtBQUtkLFdBQUwsR0FBbUIsQ0FBaEQsR0FBb0RNLE1BQU1NLFdBQU4sR0FBb0IsQ0FBakY7QUFDSDtBQUNKOztBQUVELGVBQU9DLEtBQVA7QUFDSCxLOzt3QkFFRHhELHNCLG1DQUF1QlAsTSxFQUFnQztBQUFBLFlBQXhCOEIsTUFBd0IseURBQWYsS0FBS1QsUUFBVTtBQUFBLHNCQUNoQixLQUFLQyxLQURXO0FBQUEsWUFDNUNDLFlBRDRDLFdBQzVDQSxZQUQ0QztBQUFBLFlBQzlCRyxVQUQ4QixXQUM5QkEsVUFEOEI7O0FBRW5ELFlBQU0rQixXQUFXOUQsVUFBVThELFFBQTNCOztBQUVBLFlBQUlDLFFBQVEsS0FBS1osVUFBTCxHQUFrQixLQUFLTSxRQUFuQzs7QUFFQSxnQkFBUTdCLFlBQVI7QUFDQSxpQkFBS2tDLFNBQVNFLE1BQWQ7QUFDSUQseUJBQVMsS0FBS1IsV0FBTCxHQUFtQixDQUE1QjtBQUNBOztBQUVKLGlCQUFLTyxTQUFTSSxHQUFkO0FBQ0lILHlCQUFTLEtBQUtSLFdBQWQ7QUFDQTtBQVBKOztBQVVBLGdCQUFReEIsVUFBUjtBQUNBLGlCQUFLK0IsU0FBU0UsTUFBZDtBQUNJRCx5QkFBUzVCLE9BQU9nQyxXQUFQLEdBQXFCLENBQTlCO0FBQ0E7O0FBRUosaUJBQUtMLFNBQVNJLEdBQWQ7QUFDSUgseUJBQVM1QixPQUFPZ0MsV0FBaEI7QUFDQTtBQVBKOztBQVVBLGVBQU9KLEtBQVA7QUFDSCxLOzt3QkFFRGpELHNCLG1DQUF1QlQsTSxFQUFnQztBQUFBLFlBQXhCOEIsTUFBd0IseURBQWYsS0FBS1QsUUFBVTs7QUFDbkQsWUFBTUMsUUFBUSxLQUFLQSxLQUFuQjtBQUNBLFlBQU1tQyxXQUFXOUQsVUFBVThELFFBQTNCO0FBQ0EsWUFBTVEsVUFBVSxLQUFLbEIsU0FBTCxHQUFpQixLQUFLTyxPQUF0Qzs7QUFFQSxZQUFJUyxRQUFRRSxVQUFVLEtBQUtqQixZQUEzQjs7QUFFQSxnQkFBUTFCLE1BQU1HLFlBQWQ7QUFDQSxpQkFBS2dDLFNBQVNHLEtBQWQ7QUFDSUcsd0JBQVFFLE9BQVI7QUFDQTs7QUFFSixpQkFBS1IsU0FBU0UsTUFBZDtBQUNJSSx3QkFBUUUsVUFBVSxLQUFLakIsWUFBTCxHQUFvQixDQUF0QztBQUNBO0FBUEo7O0FBVUEsZ0JBQVExQixNQUFNSyxVQUFkO0FBQ0EsaUJBQUs4QixTQUFTRSxNQUFkO0FBQ0lJLHlCQUFTakMsT0FBT2tDLFlBQVAsR0FBc0IsQ0FBL0I7QUFDQTs7QUFFSixpQkFBS1AsU0FBU0ksR0FBZDtBQUNJRSx5QkFBU2pDLE9BQU9rQyxZQUFoQjtBQUNBO0FBUEo7O0FBVUEsZUFBT0QsS0FBUDtBQUNILEs7O3dCQUVEcEQsbUMsZ0RBQW9DdUQsQyxFQUFHQyxDLEVBQUc7QUFDdEMsWUFBSSxDQUFDLEtBQUt2RSxLQUFMLENBQVd3RSxjQUFoQixFQUFnQztBQUM1QixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBTUMsMkJBQWtCLEtBQUsvQyxLQUF2QixDQUFOO0FBQ0EsWUFBTW1DLFdBQVc5RCxVQUFVOEQsUUFBM0I7O0FBRUEsWUFBTU4sUUFBUSxLQUFLOUIsUUFBTCxDQUFjeUMsV0FBNUI7QUFDQSxZQUFNYixTQUFTLEtBQUs1QixRQUFMLENBQWMyQyxZQUE3QjtBQUNBLFlBQU1NLE9BQU9wQyxTQUFTRSxJQUFULENBQWNtQyxXQUEzQjtBQUNBLFlBQU1DLE9BQU90QyxTQUFTRSxJQUFULENBQWNxQyxZQUEzQjs7QUFFQSxZQUFJUCxJQUFJZixLQUFKLEdBQVltQixJQUFoQixFQUFzQjtBQUFFO0FBQ3BCRCx3QkFBWTlDLFlBQVosR0FBMkJrQyxTQUFTRyxLQUFwQztBQUNBUyx3QkFBWTNDLFVBQVosR0FBeUIrQixTQUFTSSxHQUFsQztBQUNIOztBQUVELFlBQUlLLElBQUksQ0FBUixFQUFXO0FBQUU7QUFDVEcsd0JBQVk5QyxZQUFaLEdBQTJCa0MsU0FBU0ksR0FBcEM7QUFDQVEsd0JBQVkzQyxVQUFaLEdBQXlCK0IsU0FBU0csS0FBbEM7QUFDSDs7QUFFRCxZQUFJTyxJQUFJbEIsTUFBSixHQUFhdUIsSUFBakIsRUFBdUI7QUFBRTtBQUNyQjtBQUNBLGdCQUFRSCxZQUFZOUMsWUFBWixLQUE2QmtDLFNBQVNHLEtBQXRDLElBQStDUyxZQUFZM0MsVUFBWixLQUEyQitCLFNBQVNJLEdBQXBGLElBQ0NRLFlBQVk5QyxZQUFaLEtBQTZCa0MsU0FBU0ksR0FBdEMsSUFBNkNRLFlBQVkzQyxVQUFaLEtBQTJCK0IsU0FBU0csS0FEekYsRUFDaUc7QUFDN0ZTLDRCQUFZNUMsWUFBWixHQUEyQmdDLFNBQVNJLEdBQXBDO0FBQ0gsYUFIRCxNQUdPO0FBQ0hRLDRCQUFZNUMsWUFBWixHQUEyQmdDLFNBQVNHLEtBQXBDO0FBQ0g7O0FBRURTLHdCQUFZMUMsVUFBWixHQUF5QjhCLFNBQVNJLEdBQWxDO0FBQ0g7O0FBRUQsWUFBSU0sSUFBSSxDQUFSLEVBQVc7QUFBRTtBQUNUO0FBQ0EsZ0JBQVFFLFlBQVk5QyxZQUFaLEtBQTZCa0MsU0FBU0csS0FBdEMsSUFBK0NTLFlBQVkzQyxVQUFaLEtBQTJCK0IsU0FBU0ksR0FBcEYsSUFDQ1EsWUFBWTlDLFlBQVosS0FBNkJrQyxTQUFTSSxHQUF0QyxJQUE2Q1EsWUFBWTNDLFVBQVosS0FBMkIrQixTQUFTRyxLQUR6RixFQUNpRztBQUM3RlMsNEJBQVk1QyxZQUFaLEdBQTJCZ0MsU0FBU0csS0FBcEM7QUFDSCxhQUhELE1BR087QUFDSFMsNEJBQVk1QyxZQUFaLEdBQTJCZ0MsU0FBU0ksR0FBcEM7QUFDSDs7QUFFRFEsd0JBQVkxQyxVQUFaLEdBQXlCOEIsU0FBU0csS0FBbEM7QUFDSDs7QUFFRCxlQUFPUyxXQUFQO0FBQ0gsSzs7d0JBRURqRCxnQiw2QkFBaUJzRCxJLEVBQU1SLEMsRUFBR0MsQyxFQUFHO0FBQ3pCLHlDQUFtQjtBQUNmTyxpQkFBSzNELEtBQUwsK0NBQXlDbUQsQ0FBekMsWUFBaURDLENBQWpEO0FBQ0gsU0FGRCxNQUVPO0FBQ0hPLGlCQUFLM0QsS0FBTCxDQUFXQyxJQUFYLEdBQWtCa0QsSUFBSSxJQUF0QjtBQUNBUSxpQkFBSzNELEtBQUwsQ0FBV0csR0FBWCxHQUFpQmlELElBQUksSUFBckI7QUFDSDtBQUNKLEs7O3dCQUVEdkQsa0IsK0JBQW1CK0QsYSxFQUE4QztBQUFBLFlBQS9CQyxnQkFBK0IseURBQVosS0FBS3RELEtBQU87O0FBQzdELGVBQVVxRCxjQUFjcEQsWUFBZCxLQUErQnFELGlCQUFpQnJELFlBQWhELElBQ0FvRCxjQUFjbEQsWUFBZCxLQUErQm1ELGlCQUFpQm5ELFlBRGhELElBRUFrRCxjQUFjakQsVUFBZCxLQUE2QmtELGlCQUFpQmxELFVBRjlDLElBR0FpRCxjQUFjaEQsVUFBZCxLQUE2QmlELGlCQUFpQmpELFVBSHhEO0FBSUgsSzs7d0JBOEJEa0QseUIsc0NBQTBCQyxRLEVBQVU7QUFDaEMsWUFBTXJCLFdBQVc5RCxVQUFVOEQsUUFBM0I7O0FBRUEsZ0JBQVFxQixRQUFSO0FBQ0EsaUJBQUtyQixTQUFTRyxLQUFkO0FBQ0ksdUJBQU8sT0FBUDs7QUFFSixpQkFBS0gsU0FBU0UsTUFBZDtBQUNJLHVCQUFPLFFBQVA7O0FBRUosaUJBQUtGLFNBQVNJLEdBQWQ7QUFDSSx1QkFBTyxLQUFQO0FBUko7QUFVSCxLOzt3QkFFRC9ELFksMkJBQWU7QUFBQTtBQUFBO0FBQUE7O0FBQ1gsWUFBTXdCLFFBQVEsS0FBS0EsS0FBbkI7QUFDQSxZQUFNeUQsVUFBVSxLQUFLRix5QkFBckI7O0FBRUEsYUFBS2pELHlCQUFMLENBQ0ksbUJBQVNvRCxNQUFULENBQ0ksK0RBQ1Esc0JBQUssS0FBS3BGLEtBQVYsRUFBaUJELFVBQVVzRixZQUEzQixDQURSO0FBRUksb0JBQ0ksZ0JBQU1DLFlBQU4sQ0FBbUIsS0FBS3RGLEtBQUwsQ0FBV3VGLGNBQTlCLEVBQThDO0FBQzFDQyxxQkFBSyxhQUFDVixJQUFEO0FBQUEsMkJBQVcsT0FBSzVELE1BQUwsR0FBYzRELElBQXpCO0FBQUEsaUJBRHFDO0FBRTFDVywyQkFBVztBQUNQLHdDQUFvQjtBQURiLHVCQUVOLEtBQUt6RixLQUFMLENBQVd1RixjQUFYLENBQTBCdkYsS0FBMUIsQ0FBZ0N5RixTQUYxQixJQUVzQyxDQUFDLENBQUMsS0FBS3pGLEtBQUwsQ0FBV3VGLGNBQVgsQ0FBMEJ2RixLQUExQixDQUFnQ3lGLFNBRnhFO0FBRitCLGFBQTlDLENBSFI7QUFXSSx1Q0FDTyxLQUFLekYsS0FBTCxDQUFXMEYsWUFEbEI7QUFFSUQsMkJBQVc7QUFDUCxrQ0FBYztBQURQLGlEQUVpQk4sUUFBUXpELE1BQU1DLFlBQWQsQ0FGakIsSUFFaUQsSUFGakQsZ0NBR2lCd0QsUUFBUXpELE1BQU1HLFlBQWQsQ0FIakIsSUFHaUQsSUFIakQsOEJBSWVzRCxRQUFRekQsTUFBTUksVUFBZCxDQUpmLElBSTZDLElBSjdDLDhCQUtlcUQsUUFBUXpELE1BQU1LLFVBQWQsQ0FMZixJQUs2QyxJQUw3QyxPQU1OLEtBQUsvQixLQUFMLENBQVcwRixZQUFYLENBQXdCRCxTQU5sQixJQU04QixDQUFDLENBQUMsS0FBS3pGLEtBQUwsQ0FBVzBGLFlBQVgsQ0FBd0JELFNBTnhEO0FBRmYsY0FYSixJQURKLEVBdUJFLEtBQUtwRCxVQXZCUCxDQURKO0FBMEJILEs7O3dCQUVEK0MsTSxxQkFBUztBQUNMLGVBQVEsMENBQVI7QUFDSCxLOzs7RUEvWGtDLGdCQUFNTyxhOztBQUF4QjVGLFMsQ0FDVjhELFEsR0FBVztBQUNkRyxXQUFPLE9BRE87QUFFZEQsWUFBUSxRQUZNO0FBR2RFLFNBQUs7QUFIUyxDO0FBRERsRSxTLENBT1Y2RixjLEdBQWlCLHNCQUFPN0YsVUFBVThELFFBQWpCLEM7QUFQUDlELFMsQ0FTVjZCLE0sR0FBUztBQUNaLGFBQVM7QUFDTEQsc0JBQWM1QixVQUFVOEQsUUFBVixDQUFtQkUsTUFENUI7QUFFTGxDLHNCQUFjOUIsVUFBVThELFFBQVYsQ0FBbUJHLEtBRjVCO0FBR0xsQyxvQkFBWS9CLFVBQVU4RCxRQUFWLENBQW1CRSxNQUgxQjtBQUlMaEMsb0JBQVloQyxVQUFVOEQsUUFBVixDQUFtQkk7QUFKMUIsS0FERztBQU9aLGFBQVM7QUFDTHRDLHNCQUFjNUIsVUFBVThELFFBQVYsQ0FBbUJFLE1BRDVCO0FBRUxsQyxzQkFBYzlCLFVBQVU4RCxRQUFWLENBQW1CSSxHQUY1QjtBQUdMbkMsb0JBQVkvQixVQUFVOEQsUUFBVixDQUFtQkUsTUFIMUI7QUFJTGhDLG9CQUFZaEMsVUFBVThELFFBQVYsQ0FBbUJHO0FBSjFCLEtBUEc7QUFhWixZQUFRO0FBQ0pyQyxzQkFBYzVCLFVBQVU4RCxRQUFWLENBQW1CRyxLQUQ3QjtBQUVKbkMsc0JBQWM5QixVQUFVOEQsUUFBVixDQUFtQkUsTUFGN0I7QUFHSmpDLG9CQUFZL0IsVUFBVThELFFBQVYsQ0FBbUJJLEdBSDNCO0FBSUpsQyxvQkFBWWhDLFVBQVU4RCxRQUFWLENBQW1CRTtBQUozQixLQWJJO0FBbUJaLGFBQVM7QUFDTHBDLHNCQUFjNUIsVUFBVThELFFBQVYsQ0FBbUJJLEdBRDVCO0FBRUxwQyxzQkFBYzlCLFVBQVU4RCxRQUFWLENBQW1CRSxNQUY1QjtBQUdMakMsb0JBQVkvQixVQUFVOEQsUUFBVixDQUFtQkcsS0FIMUI7QUFJTGpDLG9CQUFZaEMsVUFBVThELFFBQVYsQ0FBbUJFO0FBSjFCO0FBbkJHLEM7QUFUQ2hFLFMsQ0FvQ1Y4RixZLEdBQWUsc0JBQU85RixVQUFVNkIsTUFBakIsQztBQXBDTDdCLFMsQ0FzQ1YrRixTLGdCQUNBLG1CQUFTQSxTO0FBQ1oxRixZQUFRLGlCQUFVMkYsU0FBVixDQUFvQixDQUN4QixpQkFBVUMsVUFBVixDQUFxQjNGLFdBQXJCLENBRHdCLEVBRXhCLGlCQUFVNEYsS0FBVixDQUFnQjtBQUNaakcsZUFBTyxpQkFBVWtHLE1BREw7QUFFWnhFLGVBQU8saUJBQVV3RTtBQUZMLEtBQWhCLENBRndCLENBQXBCLEVBTUxDLFU7QUFDSHhFLGtCQUFjLGlCQUFVeUUsS0FBVixDQUFnQnJHLFVBQVU2RixjQUExQixDO0FBQ2QvRCxrQkFBYyxpQkFBVXVFLEtBQVYsQ0FBZ0JyRyxVQUFVNkYsY0FBMUIsQztBQUNkcEIsb0JBQWdCLGlCQUFVNkIsSTtBQUMxQmQsb0JBQWdCLGlCQUFVZSxPO0FBQzFCMUUsWUFBUSxpQkFBVXdFLEtBQVYsQ0FBZ0JyRyxVQUFVOEYsWUFBMUIsQztBQUNSL0QsZ0JBQVksaUJBQVVzRSxLQUFWLENBQWdCckcsVUFBVTZGLGNBQTFCLEM7QUFDWjdELGdCQUFZLGlCQUFVcUUsS0FBVixDQUFnQnJHLFVBQVU2RixjQUExQixDO0FBQ1pGLGtCQUFjLGlCQUFVUTs7QUF0RFhuRyxTLENBeURWc0YsWSxHQUFlLG1DQUFRa0IsT0FBT0MsSUFBUCxDQUFZekcsVUFBVStGLFNBQXRCLENBQVIsU0FBNkNTLE9BQU9DLElBQVAsQ0FBWSxtQkFBU1YsU0FBckIsQ0FBN0MsRTtBQXpETC9GLFMsQ0EyRFYwRyxZLGdCQUNBLG1CQUFTQSxZO0FBQ1pqQyxvQkFBZ0IsSTtBQUNoQmtDLGtCQUFjLEs7QUFDZG5CLG9CQUNJO0FBQUE7QUFBQSxVQUFLLFNBQVEsWUFBYixFQUEwQixPQUFNLDRCQUFoQztBQUNJO0FBQUE7QUFBQTtBQUNJLHVEQUFTLFdBQVUseUJBQW5CLEVBQTZDLE1BQUssTUFBbEQsRUFBeUQsUUFBTyxnQkFBaEUsR0FESjtBQUVJLHVEQUFTLFdBQVUsdUJBQW5CLEVBQTJDLE1BQUssTUFBaEQsRUFBdUQsUUFBTyxrQ0FBOUQ7QUFGSjtBQURKLEs7QUFPSm9CLG1CQUFlLEk7QUFDZkMseUJBQXFCLEk7QUFDckJDLDBCQUFzQixJO0FBQ3RCakYsWUFBUTdCLFVBQVU2QixNQUFWLENBQWlCa0YsSztBQUN6QnBCLGtCQUFjOztrQkEzRUQzRixTIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIG5vbi1ibG9ja2luZyBjb250YWluZXIgcG9zaXRpb25lZCB0byBhIHNwZWNpZmljIGFuY2hvciBlbGVtZW50LlxuICogQGNsYXNzIFVJUG9wb3ZlclxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgd2l0aG91dCBmcm9tICdsb2Rhc2gud2l0aG91dCc7XG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC52YWx1ZXMnO1xuXG5pbXBvcnQgVUlEaWFsb2cgZnJvbSAnLi4vVUlEaWFsb2cnO1xuaW1wb3J0IHRyYW5zZm9ybVByb3AgZnJvbSAnLi4vVUlVdGlscy90cmFuc2Zvcm1Qcm9wZXJ0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwb3NpdGlvbiA9IHtcbiAgICAgICAgU1RBUlQ6ICdTVEFSVCcsXG4gICAgICAgIE1JRERMRTogJ01JRERMRScsXG4gICAgICAgIEVORDogJ0VORCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uVmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wb3NpdGlvbilcblxuICAgIHN0YXRpYyBwcmVzZXQgPSB7XG4gICAgICAgICdBQk9WRSc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIH0sXG4gICAgICAgICdCRUxPVyc6IHtcbiAgICAgICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgICAgIHNlbGZYQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIH0sXG4gICAgICAgICdMRUZUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICAgICAgJ1JJR0hUJzoge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICAgICAgYW5jaG9yWUFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgc2VsZlhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgc2VsZllBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlc2V0VmFsdWVzID0gdmFsdWVzKFVJUG9wb3Zlci5wcmVzZXQpXG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5wcm9wVHlwZXMsXG4gICAgICAgIGFuY2hvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihIVE1MRWxlbWVudCksXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAgICAgfSksIC8vIGEgcmVhY3QgZWxlbWVudCBvZiBzb21lIGZhc2hpb24sIFByb3BUeXBlcy5lbGVtZW50IHdhc24ndCB3b3JraW5nXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGFuY2hvclhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGFuY2hvcllBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2FyZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBwcmVzZXQ6IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucHJlc2V0VmFsdWVzKSxcbiAgICAgICAgc2VsZlhBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFVJUG9wb3Zlci5wb3NpdGlvblZhbHVlcyksXG4gICAgICAgIHNlbGZZQWxpZ246IFByb3BUeXBlcy5vbmVPZihVSVBvcG92ZXIucG9zaXRpb25WYWx1ZXMpLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IHdpdGhvdXQoT2JqZWN0LmtleXMoVUlQb3BvdmVyLnByb3BUeXBlcyksIC4uLk9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcykpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICAuLi5VSURpYWxvZy5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjYXB0dXJlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYXJldENvbXBvbmVudDogKFxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMTQgOS41JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9J3VpLXBvcG92ZXItY2FyZXQtYm9yZGVyJyBmaWxsPScjMDAwJyBwb2ludHM9JzcgMCAxNCAxMCAwIDEwJz48L3BvbHlnb24+XG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT0ndWktcG9wb3Zlci1jYXJldC1maWxsJyBmaWxsPScjRkZGJyBwb2ludHM9JzYuOTgyMzA0NDQgMS43NSAxMi43NSAxMCAxLjI1IDEwJz48L3BvbHlnb24+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICksXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiB0cnVlLFxuICAgICAgICBwcmVzZXQ6IFVJUG9wb3Zlci5wcmVzZXQuQkVMT1csXG4gICAgICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5jaG9yWEFsaWduOiAgIHByb3BzLmFuY2hvclhBbGlnbiAgfHwgcHJvcHMucHJlc2V0LmFuY2hvclhBbGlnbixcbiAgICAgICAgICAgIGFuY2hvcllBbGlnbjogICBwcm9wcy5hbmNob3JZQWxpZ24gIHx8IHByb3BzLnByZXNldC5hbmNob3JZQWxpZ24sXG4gICAgICAgICAgICBzZWxmWEFsaWduOiAgICAgcHJvcHMuc2VsZlhBbGlnbiAgICB8fCBwcm9wcy5wcmVzZXQuc2VsZlhBbGlnbixcbiAgICAgICAgICAgIHNlbGZZQWxpZ246ICAgICBwcm9wcy5zZWxmWUFsaWduICAgIHx8IHByb3BzLnByZXNldC5zZWxmWUFsaWduLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWxvZ0ludGVybmFsQ2FjaGUoaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBpbnN0YW5jZTtcbiAgICAgICAgdGhpcy4kZGlhbG9nID0gaW5zdGFuY2UuJGRpYWxvZzsgICAgLy8gdXNlZCBpbiB0ZXN0aW5nLCBub3QgcmVsZXZhbnRcbiAgICAgICAgdGhpcy4kd3JhcHBlciA9IGluc3RhbmNlLiR3cmFwcGVyO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgICAgICAgICBuZXZlciBjaGFuZ2VzLiBUaGVyZWZvcmUsIHdlIG5lZWQgdG8gbWFudWFsbHkgY2FsbCBgY29tcG9uZW50RGlkVXBkYXRlYCBhZnRlciBgc2V0U3RhdGVgIHRvIHRyaWdnZXJcbiAgICAgICAgICAgIGEgZnVsbCByZS1yZW5kZXIgb2YgdGhlIGNoaWxkIGRpYWxvZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuJGNvbnRhaW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNhY2hlVmlld3BvcnRDYXJ0b2dyYXBoeShhbmNob3IpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmFuY2hvckxlZnQgPSBhbmNob3JSZWN0LmxlZnQ7XG4gICAgICAgIHRoaXMuYW5jaG9yVG9wID0gYW5jaG9yUmVjdC50b3A7XG4gICAgICAgIHRoaXMuYW5jaG9ySGVpZ2h0ID0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5jaG9yV2lkdGggPSBhbmNob3JSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuYm9keUxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHRoaXMuYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWCBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IGFib3ZlIG9yIGJlbG93IHRoZSBhbmNob3IgYW5kIHNlbGZYQWxpZ24gaXNuJ3QgTUlERExFXG5cbiAgICAgICAgaWYgKCAgIHNlbGZYQWxpZ24gIT09IHBvc2l0aW9uLk1JRERMRVxuICAgICAgICAgICAgJiYgKCAgIGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uRU5EXG4gICAgICAgICAgICAgICAgfHwgYW5jaG9yWUFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgc2VsZllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvclhBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFggKz0gdGhpcy4kd3JhcHBlci5jbGllbnRXaWR0aCAtIHRoaXMuYW5jaG9yV2lkdGggLyAyIC0gY2FyZXQuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRYO1xuICAgIH1cblxuICAgIGdldE5leHRDYXJldFlQb3NpdGlvbihhbmNob3IsIGNhcmV0ID0gdGhpcy4kY2FyZXQpIHtcbiAgICAgICAgY29uc3Qge2FuY2hvclhBbGlnbiwgc2VsZlhBbGlnbiwgYW5jaG9yWUFsaWduLCBzZWxmWUFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IDA7XG5cbiAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIGNoYW5nZSB0aGUgWSBwb3NpdGlvbiB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIGZ1bGx5IHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBhbmNob3IgKHN0YXJ0LGVuZCB8IGVuZCxzdGFydClcbiAgICAgICAgLy8gc2VsZllBbGlnbiBpc24ndCBNSURETEVcblxuICAgICAgICBpZiAoICAgc2VsZllBbGlnbiAhPT0gcG9zaXRpb24uTUlERExFXG4gICAgICAgICAgICAmJiAoICAgYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5FTkRcbiAgICAgICAgICAgICAgICB8fCBhbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLkVORCAmJiBzZWxmWEFsaWduID09PSBwb3NpdGlvbi5TVEFSVCkpIHtcblxuICAgICAgICAgICAgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpIHtcbiAgICAgICAgICAgICAgICBuZXh0WSArPSB0aGlzLmFuY2hvckhlaWdodCAvIDIgLSBjYXJldC5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuY2hvcllBbGlnbiA9PT0gcG9zaXRpb24uRU5EKSB7XG4gICAgICAgICAgICAgICAgbmV4dFkgKz0gdGhpcy4kd3JhcHBlci5jbGllbnRIZWlnaHQgLSB0aGlzLmFuY2hvcldpZHRoIC8gMiAtIGNhcmV0LmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WTtcbiAgICB9XG5cbiAgICBnZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvciwgZGlhbG9nID0gdGhpcy4kd3JhcHBlcikge1xuICAgICAgICBjb25zdCB7YW5jaG9yWEFsaWduLCBzZWxmWEFsaWdufSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IHRoaXMuYW5jaG9yTGVmdCArIHRoaXMuYm9keUxlZnQ7XG5cbiAgICAgICAgc3dpdGNoIChhbmNob3JYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCArPSB0aGlzLmFuY2hvcldpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gdGhpcy5hbmNob3JXaWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChzZWxmWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggLT0gZGlhbG9nLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFg7XG4gICAgfVxuXG4gICAgZ2V0TmV4dERpYWxvZ1lQb3NpdGlvbihhbmNob3IsIGRpYWxvZyA9IHRoaXMuJHdyYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgYW5jaG9yWSA9IHRoaXMuYW5jaG9yVG9wICsgdGhpcy5ib2R5VG9wO1xuXG4gICAgICAgIGxldCBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyB0aGlzLmFuY2hvckhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIG5leHRZIC09IGRpYWxvZy5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFk7XG4gICAgfVxuXG4gICAgZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcoeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYXV0b1JlcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25zID0gey4uLnRoaXMuc3RhdGV9O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuJHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCB4TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgeU1heCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGlmICh4ICsgd2lkdGggPiB4TWF4KSB7IC8vIG92ZXJmbG93aW5nIG9mZiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBvZmYgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvclhBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JZQWxpZ24gPSBwb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgMCkgeyAvLyBvdmVyZmxvd2luZyBhYm92ZVxuICAgICAgICAgICAgLy8gaWYgbGVmdC9yaWdodFxuICAgICAgICAgICAgaWYgKCAgIChjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPT09IHBvc2l0aW9uLlNUQVJUICYmIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPT09IHBvc2l0aW9uLkVORClcbiAgICAgICAgICAgICAgICB8fCAoY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID09PSBwb3NpdGlvbi5FTkQgJiYgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9PT0gcG9zaXRpb24uU1RBUlQpKSB7XG4gICAgICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gcG9zaXRpb24uU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IHBvc2l0aW9uLkVORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IHBvc2l0aW9uLlNUQVJUO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZEFsaWdubWVudENoYW5nZShuZXh0QWxpZ25tZW50LCBjdXJyZW50QWxpZ25tZW50ID0gdGhpcy5zdGF0ZSkge1xuICAgICAgICByZXR1cm4gICAgbmV4dEFsaWdubWVudC5hbmNob3JYQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuYW5jaG9yWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LmFuY2hvcllBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5hbmNob3JZQWxpZ25cbiAgICAgICAgICAgICAgIHx8IG5leHRBbGlnbm1lbnQuc2VsZlhBbGlnbiAhPT0gY3VycmVudEFsaWdubWVudC5zZWxmWEFsaWduXG4gICAgICAgICAgICAgICB8fCBuZXh0QWxpZ25tZW50LnNlbGZZQWxpZ24gIT09IGN1cnJlbnRBbGlnbm1lbnQuc2VsZllBbGlnbjtcbiAgICB9XG5cbiAgICBhbGlnbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gICB0aGlzLnByb3BzLmFuY2hvciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5hbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnByb3BzLmFuY2hvcik7XG5cbiAgICAgICAgdGhpcy5jYWNoZVZpZXdwb3J0Q2FydG9ncmFwaHkoYW5jaG9yKTtcblxuICAgICAgICBjb25zdCBkeCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWFBvc2l0aW9uKGFuY2hvcikpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0RGlhbG9nWVBvc2l0aW9uKGFuY2hvcikpO1xuXG4gICAgICAgIGNvbnN0IGFsaWdubWVudENvcnJlY3Rpb24gPSB0aGlzLmdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKGR4LCBkeSk7XG5cbiAgICAgICAgaWYgKGFsaWdubWVudENvcnJlY3Rpb24gJiYgdGhpcy5kaWRBbGlnbm1lbnRDaGFuZ2UoYWxpZ25tZW50Q29ycmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBjYXJldCBpcyBpbml0aWFsbHkgcG9zaXRpb25lZCBhdCAwLDAgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgICAgLy8gd2hpY2ggaXMgYWxyZWFkeSBwb3NpdGlvbmVkIGF0IHRoZSBhbmNob3IsIHNvIHdlIGp1c3QgbmVlZCB0b1xuICAgICAgICAvLyBtYWtlIHNtYWxsIGFkanVzdG1lbnRzIGFzIG5lY2Vzc2FyeSB0byBsaW5lIHVwIHRoZSBjYXJldFxuICAgICAgICAvLyB3aXRoIHRoZSB2aXN1YWwgY2VudGVyIG9mIHRoZSBhbmNob3JcblxuICAgICAgICB0aGlzLiRjYXJldC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRDYXJldFhQb3NpdGlvbihhbmNob3IpKSArICdweCc7XG4gICAgICAgIHRoaXMuJGNhcmV0LnN0eWxlLnRvcCA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0Q2FyZXRZUG9zaXRpb24oYW5jaG9yKSkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbih0aGlzLiRjYXJldCwgY3gsIDApO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24odGhpcy4kd3JhcHBlciwgZHgsIGR5KTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0FsaWdubWVudEZyYWdtZW50KGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5TVEFSVDpcbiAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgcmV0dXJuICdtaWRkbGUnO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRGlhbG9nKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGdldEZyYWcgPSB0aGlzLmdldENsYXNzQWxpZ25tZW50RnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaWFsb2dJbnRlcm5hbENhY2hlKFxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIDxVSURpYWxvZ1xuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVBvcG92ZXIuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAobm9kZSkgPT4gKHRoaXMuJGNhcmV0ID0gbm9kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyLWNhcmV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2FyZXRDb21wb25lbnQucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNhcmV0Q29tcG9uZW50LnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlclByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1wb3BvdmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItYW5jaG9yLXgtJHtnZXRGcmFnKHN0YXRlLmFuY2hvclhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXgtJHtnZXRGcmFnKHN0YXRlLnNlbGZYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtgdWktcG9wb3Zlci1zZWxmLXktJHtnZXRGcmFnKHN0YXRlLnNlbGZZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLndyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiJdfQ==