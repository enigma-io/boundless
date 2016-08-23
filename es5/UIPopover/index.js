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

/*
    A nuance about this component: since it only renders a simple <div>, the main render() function
    never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
    a full re-render of the child dialog.
 */

var UIPopover = function (_React$PureComponent) {
    _inherits(UIPopover, _React$PureComponent);

    function UIPopover() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPopover);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            anchorXAlign: _this.props.anchorXAlign,
            anchorYAlign: _this.props.anchorYAlign,
            selfXAlign: _this.props.selfXAlign,
            selfYAlign: _this.props.selfYAlign
        }, _this.align = function () {
            var anchor = _this.props.anchor instanceof HTMLElement ? _this.props.anchor : _reactDom2.default.findDOMNode(_this.props.anchor);

            var x = Math.round(_this.getNextXPosition(anchor, _this.$dialog));
            var y = Math.round(_this.getNextYPosition(anchor, _this.$dialog));

            var alignmentCorrection = _this.getAlignmentCorrectionIfOverflowing(_this.$dialog, x, y);

            if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
                return _this.setState(alignmentCorrection, function () {
                    return _this.componentDidUpdate();
                });
            }

            _this.applyTranslation(_this.$dialog, x, y);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPopover.prototype.updateDialogInternalCache = function updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog;
    };

    UIPopover.prototype.componentWillMount = function componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    };

    UIPopover.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderDialog();
        this.align();
    };

    UIPopover.prototype.componentWillUnmount = function componentWillUnmount() {
        _reactDom2.default.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

        window.removeEventListener('resize', this.align, true);
    };

    UIPopover.prototype.getNextXPosition = function getNextXPosition(anchor, dialog) {
        var state = this.state;
        var position = UIPopover.position;

        var nextX = anchor.getBoundingClientRect().left + document.body.scrollLeft;

        switch (state.anchorXAlign) {
            case position.MIDDLE:
                nextX += anchor.offsetWidth / 2;
                break;

            case position.END:
                nextX += anchor.offsetWidth;
                break;
        }

        switch (state.selfXAlign) {
            case position.MIDDLE:
                nextX -= dialog.clientWidth / 2;
                break;

            case position.END:
                nextX -= dialog.clientWidth;
                break;
        }

        return nextX;
    };

    UIPopover.prototype.getNextYPosition = function getNextYPosition(anchor, dialog) {
        var state = this.state;
        var position = UIPopover.position;
        var anchorY = anchor.getBoundingClientRect().top + document.body.scrollTop;
        var anchorHeight = anchor.offsetHeight;

        var nextY = anchorY + anchorHeight;

        switch (state.anchorYAlign) {
            case position.START:
                nextY = anchorY;
                break;

            case position.MIDDLE:
                nextY = anchorY + anchorHeight / 2;
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

    UIPopover.prototype.getAlignmentCorrectionIfOverflowing = function getAlignmentCorrectionIfOverflowing(node, x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        var corrections = {};

        var width = node.clientWidth;
        var height = node.clientHeight;
        var xMax = document.body.scrollWidth;
        var yMax = document.body.scrollHeight;

        if (x + width > xMax) {
            // overflowing off to the right
            corrections.anchorXAlign = UIPopover.position.START;
            corrections.selfXAlign = UIPopover.position.END;
        } else if (x < 0) {
            // overflowing off to the left
            corrections.anchorXAlign = UIPopover.position.END;
            corrections.selfXAlign = UIPopover.position.START;
        } else if (y + height > yMax) {
            // overflowing below
            corrections.anchorYAlign = UIPopover.position.START;
            corrections.selfYAlign = UIPopover.position.END;
        } else if (y < 0) {
            // overflowing above
            corrections.anchorYAlign = UIPopover.position.END;
            corrections.anchorXAlign = UIPopover.position.MIDDLE;
            corrections.selfYAlign = UIPopover.position.START;
            corrections.selfXAlign = UIPopover.position.MIDDLE;
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
        var _cx;

        var state = this.state;
        var getFrag = this.getClassAlignmentFragment;

        this.updateDialogInternalCache(_reactDom2.default.render(_react2.default.createElement(_UIDialog2.default, _extends({}, (0, _lodash2.default)(this.props, UIPopover.internalKeys), {
            className: (0, _classnames2.default)((_cx = {
                'ui-popover': true
            }, _cx['ui-popover-anchor-x-' + getFrag(state.anchorXAlign)] = true, _cx['ui-popover-anchor-y-' + getFrag(state.anchorYAlign)] = true, _cx['ui-popover-self-x-' + getFrag(state.selfXAlign)] = true, _cx['ui-popover-self-y-' + getFrag(state.selfYAlign)] = true, _cx[this.props.className] = !!this.props.className, _cx)),
            style: _extends({}, this.props.style, {
                position: 'absolute',
                top: '0px',
                left: '0px'
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
UIPopover.propTypes = _extends({}, _UIDialog2.default.propTypes, {
    anchor: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(HTMLElement), _react2.default.PropTypes.shape({
        props: _react2.default.PropTypes.object,
        state: _react2.default.PropTypes.object
    })]).isRequired,
    anchorXAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    anchorYAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    autoReposition: _react2.default.PropTypes.bool,
    selfXAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END]),
    selfYAlign: _react2.default.PropTypes.oneOf([UIPopover.position.START, UIPopover.position.MIDDLE, UIPopover.position.END])
});
UIPopover.internalKeys = _lodash4.default.apply(undefined, [Object.keys(UIPopover.propTypes)].concat(Object.keys(_UIDialog2.default.propTypes)));
UIPopover.defaultProps = _extends({}, _UIDialog2.default.defaultProps, {
    captureFocus: false,
    closeOnEscKey: true,
    closeOnOutsideClick: true,
    closeOnOutsideScroll: true,
    anchorXAlign: UIPopover.position.START,
    anchorYAlign: UIPopover.position.END,
    autoReposition: true,
    selfXAlign: UIPopover.position.START,
    selfYAlign: UIPopover.position.START
});
exports.default = UIPopover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUG9wb3Zlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFXQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFsQkE7Ozs7O0FBS0E7Ozs7OztJQWVxQixTOzs7Ozs7Ozs7Ozs7b0tBc0RqQixLLEdBQVE7QUFDSiwwQkFBYyxNQUFLLEtBQUwsQ0FBVyxZQURyQjtBQUVKLDBCQUFjLE1BQUssS0FBTCxDQUFXLFlBRnJCO0FBR0osd0JBQVksTUFBSyxLQUFMLENBQVcsVUFIbkI7QUFJSix3QkFBWSxNQUFLLEtBQUwsQ0FBVztBQUpuQixTLFFBc0lSLEssR0FBUSxZQUFNO0FBQ1YsZ0JBQU0sU0FBVyxNQUFLLEtBQUwsQ0FBVyxNQUFYLFlBQTZCLFdBQTdCLEdBQ0EsTUFBSyxLQUFMLENBQVcsTUFEWCxHQUVBLG1CQUFTLFdBQVQsQ0FBcUIsTUFBSyxLQUFMLENBQVcsTUFBaEMsQ0FGakI7O0FBSUEsZ0JBQU0sSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFLLGdCQUFMLENBQXNCLE1BQXRCLEVBQThCLE1BQUssT0FBbkMsQ0FBWCxDQUFWO0FBQ0EsZ0JBQU0sSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFLLGdCQUFMLENBQXNCLE1BQXRCLEVBQThCLE1BQUssT0FBbkMsQ0FBWCxDQUFWOztBQUVBLGdCQUFNLHNCQUFzQixNQUFLLG1DQUFMLENBQXlDLE1BQUssT0FBOUMsRUFBdUQsQ0FBdkQsRUFBMEQsQ0FBMUQsQ0FBNUI7O0FBRUEsZ0JBQUksdUJBQXVCLE9BQU8sSUFBUCxDQUFZLG1CQUFaLEVBQWlDLE1BQTVELEVBQW9FO0FBQ2hFLHVCQUFPLE1BQUssUUFBTCxDQUFjLG1CQUFkLEVBQW1DO0FBQUEsMkJBQU0sTUFBSyxrQkFBTCxFQUFOO0FBQUEsaUJBQW5DLENBQVA7QUFDSDs7QUFFRCxrQkFBSyxnQkFBTCxDQUFzQixNQUFLLE9BQTNCLEVBQW9DLENBQXBD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Q0FBbUI7O2tCQW5EbEIsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBub24tYmxvY2tpbmcgY29udGFpbmVyIHBvc2l0aW9uZWQgdG8gYSBzcGVjaWZpYyBhbmNob3IgZWxlbWVudC5cbiAqIEBjbGFzcyBVSVBvcG92ZXJcbiAqL1xuXG4vKlxuICAgIEEgbnVhbmNlIGFib3V0IHRoaXMgY29tcG9uZW50OiBzaW5jZSBpdCBvbmx5IHJlbmRlcnMgYSBzaW1wbGUgPGRpdj4sIHRoZSBtYWluIHJlbmRlcigpIGZ1bmN0aW9uXG4gICAgbmV2ZXIgY2hhbmdlcy4gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgYGNvbXBvbmVudERpZFVwZGF0ZWAgYWZ0ZXIgYHNldFN0YXRlYCB0byB0cmlnZ2VyXG4gICAgYSBmdWxsIHJlLXJlbmRlciBvZiB0aGUgY2hpbGQgZGlhbG9nLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCB3aXRob3V0IGZyb20gJ2xvZGFzaC53aXRob3V0JztcblxuaW1wb3J0IFVJRGlhbG9nIGZyb20gJy4uL1VJRGlhbG9nJztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wIGZyb20gJy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSB7XG4gICAgICAgIFNUQVJUOiAnU1RBUlQnLFxuICAgICAgICBNSURETEU6ICdNSURETEUnLFxuICAgICAgICBFTkQ6ICdFTkQnLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLnByb3BUeXBlcyxcbiAgICAgICAgYW5jaG9yOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgICB9KSwgLy8gYSByZWFjdCBlbGVtZW50IG9mIHNvbWUgZmFzaGlvbiwgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQgd2Fzbid0IHdvcmtpbmdcbiAgICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgYW5jaG9yWEFsaWduOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLk1JRERMRSxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIF0pLFxuICAgICAgICBhbmNob3JZQWxpZ246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFLFxuICAgICAgICAgICAgVUlQb3BvdmVyLnBvc2l0aW9uLkVORCxcbiAgICAgICAgXSksXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgc2VsZlhBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICAgICAgc2VsZllBbGlnbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICAgICAgICAgIFVJUG9wb3Zlci5wb3NpdGlvbi5NSURETEUsXG4gICAgICAgICAgICBVSVBvcG92ZXIucG9zaXRpb24uRU5ELFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gd2l0aG91dChPYmplY3Qua2V5cyhVSVBvcG92ZXIucHJvcFR5cGVzKSwgLi4uT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKSlcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIC4uLlVJRGlhbG9nLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IHRydWUsXG4gICAgICAgIGFuY2hvclhBbGlnbjogVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJULFxuICAgICAgICBhbmNob3JZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQsXG4gICAgICAgIGF1dG9SZXBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBzZWxmWEFsaWduOiBVSVBvcG92ZXIucG9zaXRpb24uU1RBUlQsXG4gICAgICAgIHNlbGZZQWxpZ246IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYW5jaG9yWEFsaWduOiB0aGlzLnByb3BzLmFuY2hvclhBbGlnbixcbiAgICAgICAgYW5jaG9yWUFsaWduOiB0aGlzLnByb3BzLmFuY2hvcllBbGlnbixcbiAgICAgICAgc2VsZlhBbGlnbjogdGhpcy5wcm9wcy5zZWxmWEFsaWduLFxuICAgICAgICBzZWxmWUFsaWduOiB0aGlzLnByb3BzLnNlbGZZQWxpZ24sXG4gICAgfVxuXG4gICAgdXBkYXRlRGlhbG9nSW50ZXJuYWxDYWNoZShpbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmRpYWxvZyA9IGluc3RhbmNlO1xuICAgICAgICB0aGlzLiRkaWFsb2cgPSBpbnN0YW5jZS4kZGlhbG9nO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnJlbmRlckRpYWxvZygpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYWxpZ24sIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJEaWFsb2coKTtcbiAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy4kY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hbGlnbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFhQb3NpdGlvbihhbmNob3IsIGRpYWxvZykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gVUlQb3BvdmVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGxldCBuZXh0WCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuYW5jaG9yWEFsaWduKSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uTUlERExFOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFggKz0gYW5jaG9yLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZYQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5FTkQ6XG4gICAgICAgICAgICBuZXh0WCAtPSBkaWFsb2cuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0WDtcbiAgICB9XG5cbiAgICBnZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgZGlhbG9nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBVSVBvcG92ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGFuY2hvclkgPSBhbmNob3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGFuY2hvckhlaWdodCA9IGFuY2hvci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5leHRZID0gYW5jaG9yWSArIGFuY2hvckhlaWdodDtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLmFuY2hvcllBbGlnbikge1xuICAgICAgICBjYXNlIHBvc2l0aW9uLlNUQVJUOlxuICAgICAgICAgICAgbmV4dFkgPSBhbmNob3JZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSA9IGFuY2hvclkgKyBhbmNob3JIZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHN0YXRlLnNlbGZZQWxpZ24pIHtcbiAgICAgICAgY2FzZSBwb3NpdGlvbi5NSURETEU6XG4gICAgICAgICAgICBuZXh0WSAtPSBkaWFsb2cuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcG9zaXRpb24uRU5EOlxuICAgICAgICAgICAgbmV4dFkgLT0gZGlhbG9nLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRZO1xuICAgIH1cblxuICAgIGdldEFsaWdubWVudENvcnJlY3Rpb25JZk92ZXJmbG93aW5nKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmF1dG9SZXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JyZWN0aW9ucyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHhNYXggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB5TWF4ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHggKyB3aWR0aCA+IHhNYXgpIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWEFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgb2ZmIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uRU5EO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZlhBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgfSBlbHNlIGlmICh5ICsgaGVpZ2h0ID4geU1heCkgeyAvLyBvdmVyZmxvd2luZyBiZWxvd1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuYW5jaG9yWUFsaWduID0gVUlQb3BvdmVyLnBvc2l0aW9uLlNUQVJUO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHsgLy8gb3ZlcmZsb3dpbmcgYWJvdmVcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLmFuY2hvcllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5FTkQ7XG4gICAgICAgICAgICBjb3JyZWN0aW9ucy5hbmNob3JYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICAgICAgY29ycmVjdGlvbnMuc2VsZllBbGlnbiA9IFVJUG9wb3Zlci5wb3NpdGlvbi5TVEFSVDtcbiAgICAgICAgICAgIGNvcnJlY3Rpb25zLnNlbGZYQWxpZ24gPSBVSVBvcG92ZXIucG9zaXRpb24uTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlY3Rpb25zO1xuICAgIH1cblxuICAgIGFwcGx5VHJhbnNsYXRpb24obm9kZSwgeCwgeSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmNob3IgPSAgIHRoaXMucHJvcHMuYW5jaG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmFuY2hvclxuICAgICAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucHJvcHMuYW5jaG9yKTtcblxuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCh0aGlzLmdldE5leHRYUG9zaXRpb24oYW5jaG9yLCB0aGlzLiRkaWFsb2cpKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQodGhpcy5nZXROZXh0WVBvc2l0aW9uKGFuY2hvciwgdGhpcy4kZGlhbG9nKSk7XG5cbiAgICAgICAgY29uc3QgYWxpZ25tZW50Q29ycmVjdGlvbiA9IHRoaXMuZ2V0QWxpZ25tZW50Q29ycmVjdGlvbklmT3ZlcmZsb3dpbmcodGhpcy4kZGlhbG9nLCB4LCB5KTtcblxuICAgICAgICBpZiAoYWxpZ25tZW50Q29ycmVjdGlvbiAmJiBPYmplY3Qua2V5cyhhbGlnbm1lbnRDb3JyZWN0aW9uKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKGFsaWdubWVudENvcnJlY3Rpb24sICgpID0+IHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKHRoaXMuJGRpYWxvZywgeCwgeSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NBbGlnbm1lbnRGcmFnbWVudChjb25zdGFudCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFVJUG9wb3Zlci5wb3NpdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgcG9zaXRpb24uU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLk1JRERMRTpcbiAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcblxuICAgICAgICBjYXNlIHBvc2l0aW9uLkVORDpcbiAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckRpYWxvZygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBnZXRGcmFnID0gdGhpcy5nZXRDbGFzc0FsaWdubWVudEZyYWdtZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGlhbG9nSW50ZXJuYWxDYWNoZShcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgICAgICAgICA8VUlEaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQb3BvdmVyLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBvcG92ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci14LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JYQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLWFuY2hvci15LSR7Z2V0RnJhZyhzdGF0ZS5hbmNob3JZQWxpZ24pfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2B1aS1wb3BvdmVyLXNlbGYteC0ke2dldEZyYWcoc3RhdGUuc2VsZlhBbGlnbil9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYHVpLXBvcG92ZXItc2VsZi15LSR7Z2V0RnJhZyhzdGF0ZS5zZWxmWUFsaWduKX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgLCB0aGlzLiRjb250YWluZXIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgLz4pO1xuICAgIH1cbn1cbiJdfQ==