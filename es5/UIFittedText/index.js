'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Fit given text inside a parent container, obeying implict and explicit constraints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIFittedText
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instances = [];

function toI(stringNumber) {
    return parseInt(stringNumber, 10);
}

function rescale(instance) {
    var node = (0, _reactDom.findDOMNode)(instance);
    var containerBox = window.getComputedStyle(node.parentNode);
    var fontSize = toI(window.getComputedStyle(node).fontSize);

    var containerHeight = toI(containerBox.height);
    var containerWidth = toI(containerBox.width);

    if (containerBox.boxSizing === 'border-box' || containerBox.boxSizing === 'padding-box') {
        // need to account for padding
        containerHeight -= toI(containerBox.paddingTop) + toI(containerBox.paddingBottom);
        containerWidth -= toI(containerBox.paddingLeft) + toI(containerBox.paddingRight);
    }

    var optimizeForHeight = Math.floor(fontSize / node.offsetHeight * containerHeight);
    var optimizeForWidth = Math.floor(fontSize / node.offsetWidth * containerWidth);

    // the || 1 is a fallback to prevent fontSize from being set to zero, which fubars things
    node.style.fontSize = (Math.min(instance.props.maxFontSize, optimizeForHeight, optimizeForWidth) || 1) + 'px';
}

function handleWindowResize() {
    instances.forEach(function (instance) {
        return rescale(instance);
    });
}

function registerInstance(instance) {
    if (instances.length === 0) {
        window.addEventListener('resize', handleWindowResize, true);
    }

    instances.push(instance);
}

function unregisterInstance(instance) {
    instances.splice(instances.indexOf(instance), 1);

    if (instances.length === 0) {
        window.removeEventListener('resize', handleWindowResize, true);
    }
}

var UIFittedText = function (_React$PureComponent) {
    _inherits(UIFittedText, _React$PureComponent);

    function UIFittedText() {
        _classCallCheck(this, UIFittedText);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UIFittedText.prototype.componentDidMount = function componentDidMount() {
        rescale(this);

        // there are likely to be multiple instances of this component on a page, so it makes sense to just use
        // a shared global resize listener instead of each component having its own
        registerInstance(this);
    };

    UIFittedText.prototype.componentDidUpdate = function componentDidUpdate() {
        rescale(this);
    };

    UIFittedText.prototype.componentWillUnmount = function componentWillUnmount() {
        unregisterInstance(this);
    };

    UIFittedText.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'span',
            _extends({}, (0, _lodash2.default)(this.props, UIFittedText.internalKeys), {
                className: (0, _classnames2.default)((_cx = {
                    'ui-text': true
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            this.props.children
        );
    };

    return UIFittedText;
}(_react2.default.PureComponent);

UIFittedText.defaultProps = {
    maxFontSize: Number.MAX_VALUE
};
UIFittedText.propTypes = {
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxFontSize: _react2.default.PropTypes.number
};
UIFittedText.internalKeys = Object.keys(UIFittedText.propTypes);
exports.default = UIFittedText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJRml0dGVkVGV4dC9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbnN0YW5jZXMiLCJ0b0kiLCJzdHJpbmdOdW1iZXIiLCJwYXJzZUludCIsInJlc2NhbGUiLCJpbnN0YW5jZSIsIm5vZGUiLCJjb250YWluZXJCb3giLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50Tm9kZSIsImZvbnRTaXplIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJ3aWR0aCIsImJveFNpemluZyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJvcHRpbWl6ZUZvckhlaWdodCIsIk1hdGgiLCJmbG9vciIsIm9mZnNldEhlaWdodCIsIm9wdGltaXplRm9yV2lkdGgiLCJvZmZzZXRXaWR0aCIsInN0eWxlIiwibWluIiwicHJvcHMiLCJtYXhGb250U2l6ZSIsImhhbmRsZVdpbmRvd1Jlc2l6ZSIsImZvckVhY2giLCJyZWdpc3Rlckluc3RhbmNlIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInB1c2giLCJ1bnJlZ2lzdGVySW5zdGFuY2UiLCJzcGxpY2UiLCJpbmRleE9mIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlVJRml0dGVkVGV4dCIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiLCJPYmplY3QiLCJrZXlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBUkE7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QVNILEs7OztFQXpDcUMsZ0JBQU1DLGE7O0FBQTNCUixZLENBQ1ZTLFksR0FBZTtBQUNsQnBCLGlCQUFhcUIsT0FBT0M7QUFERixDO0FBRExYLFksQ0FLVlksUyxHQUFZO0FBQ2ZMLGNBQVUsZ0JBQU1NLFNBQU4sQ0FBZ0JDLFNBQWhCLENBQTBCLENBQ2hDLGdCQUFNRCxTQUFOLENBQWdCRSxNQURnQixFQUVoQyxnQkFBTUYsU0FBTixDQUFnQkcsTUFGZ0IsQ0FBMUIsQ0FESztBQUtmM0IsaUJBQWEsZ0JBQU13QixTQUFOLENBQWdCRztBQUxkLEM7QUFMRmhCLFksQ0FhVkssWSxHQUFlWSxPQUFPQyxJQUFQLENBQVlsQixhQUFhWSxTQUF6QixDO2tCQWJMWixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaXQgZ2l2ZW4gdGV4dCBpbnNpZGUgYSBwYXJlbnQgY29udGFpbmVyLCBvYmV5aW5nIGltcGxpY3QgYW5kIGV4cGxpY2l0IGNvbnN0cmFpbnRzLlxuICogQGNsYXNzIFVJRml0dGVkVGV4dFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gdG9JKHN0cmluZ051bWJlcikge1xuICAgIHJldHVybiBwYXJzZUludChzdHJpbmdOdW1iZXIsIDEwKTtcbn1cblxuZnVuY3Rpb24gcmVzY2FsZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZS5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IHRvSSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5mb250U2l6ZSk7XG5cbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gdG9JKGNvbnRhaW5lckJveC5oZWlnaHQpO1xuICAgIGxldCBjb250YWluZXJXaWR0aCA9IHRvSShjb250YWluZXJCb3gud2lkdGgpO1xuXG4gICAgaWYgKGNvbnRhaW5lckJveC5ib3hTaXppbmcgPT09ICdib3JkZXItYm94JyB8fCBjb250YWluZXJCb3guYm94U2l6aW5nID09PSAncGFkZGluZy1ib3gnKSB7IC8vIG5lZWQgdG8gYWNjb3VudCBmb3IgcGFkZGluZ1xuICAgICAgICBjb250YWluZXJIZWlnaHQgLT0gdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nVG9wKSArIHRvSShjb250YWluZXJCb3gucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoIC09IHRvSShjb250YWluZXJCb3gucGFkZGluZ0xlZnQpICsgdG9JKGNvbnRhaW5lckJveC5wYWRkaW5nUmlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGltaXplRm9ySGVpZ2h0ID0gTWF0aC5mbG9vcigoZm9udFNpemUgLyBub2RlLm9mZnNldEhlaWdodCkgKiBjb250YWluZXJIZWlnaHQpO1xuICAgIGNvbnN0IG9wdGltaXplRm9yV2lkdGggPSBNYXRoLmZsb29yKChmb250U2l6ZSAvIG5vZGUub2Zmc2V0V2lkdGgpICogY29udGFpbmVyV2lkdGgpO1xuXG4gICAgLy8gdGhlIHx8IDEgaXMgYSBmYWxsYmFjayB0byBwcmV2ZW50IGZvbnRTaXplIGZyb20gYmVpbmcgc2V0IHRvIHplcm8sIHdoaWNoIGZ1YmFycyB0aGluZ3NcbiAgICBub2RlLnN0eWxlLmZvbnRTaXplID0gKE1hdGgubWluKGluc3RhbmNlLnByb3BzLm1heEZvbnRTaXplLCBvcHRpbWl6ZUZvckhlaWdodCwgb3B0aW1pemVGb3JXaWR0aCkgfHwgMSkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gcmVzY2FsZShpbnN0YW5jZSkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKSwgMSk7XG5cbiAgICBpZiAoaW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRml0dGVkVGV4dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG1heEZvbnRTaXplOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBdKSxcbiAgICAgICAgbWF4Rm9udFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJRml0dGVkVGV4dC5wcm9wVHlwZXMpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcblxuICAgICAgICAvLyB0aGVyZSBhcmUgbGlrZWx5IHRvIGJlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGNvbXBvbmVudCBvbiBhIHBhZ2UsIHNvIGl0IG1ha2VzIHNlbnNlIHRvIGp1c3QgdXNlXG4gICAgICAgIC8vIGEgc2hhcmVkIGdsb2JhbCByZXNpemUgbGlzdGVuZXIgaW5zdGVhZCBvZiBlYWNoIGNvbXBvbmVudCBoYXZpbmcgaXRzIG93blxuICAgICAgICByZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgcmVzY2FsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdW5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRml0dGVkVGV4dC5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19