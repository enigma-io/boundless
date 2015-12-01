'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITableCell = (function (_UIView) {
    _inherits(UITableCell, _UIView);

    function UITableCell() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UITableCell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UITableCell)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(UITableCell, [{
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onInteract) {
                event.persist();

                this.props.onInteract(event, this.props.row, this.props.content);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            if (typeof this.props.width === 'number') {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-table-cell-inner' },
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-table-cell-inner-text' },
                        this.props.content
                    )
                );
            }

            return this.props.content;
        }
    }, {
        key: 'render',
        value: function render() {
            var addTitle = typeof this.props.content === 'string';

            return _react2.default.createElement(
                'div',
                { className: 'ui-table-cell',
                    title: addTitle ? this.props.content : null,
                    style: { width: this.props.width ? this.props.width + 'px' : null },
                    onClick: this.handleClick },
                this.renderContent()
            );
        }
    }]);

    return UITableCell;
})(_UIView3.default);

UITableCell.propTypes = {
    content: _react2.default.PropTypes.node,
    width: _react2.default.PropTypes.number,
    onInteract: _react2.default.PropTypes.func,
    row: _react2.default.PropTypes.object
};

exports.default = UITableCell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvY2VsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHTSxXQUFXO2NBQVgsV0FBVzs7QUFDYixhQURFLFdBQVcsR0FDUTs7OzhCQURuQixXQUFXOzswQ0FDRSxJQUFJO0FBQUosZ0JBQUk7OztvR0FEakIsV0FBVyxtREFFQSxJQUFJOztBQUViLGNBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksT0FBTSxDQUFDOztLQUNsRDs7aUJBTEMsV0FBVzs7b0NBT0QsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDdkIscUJBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFaEIsb0JBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0o7Ozt3Q0FFZTtBQUNaLGdCQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3RDLHVCQUNJOztzQkFBSyxTQUFTLEVBQUMscUJBQXFCO29CQUNoQzs7MEJBQU0sU0FBUyxFQUFDLDBCQUEwQjt3QkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87cUJBQVE7aUJBQ3BFLENBQ1I7YUFDTDs7QUFFRCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM3Qjs7O2lDQUVRO0FBQ0wsZ0JBQUksUUFBUSxHQUFHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDOztBQUV0RCxtQkFDSTs7a0JBQUssU0FBUyxFQUFDLGVBQWU7QUFDekIseUJBQUssRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxBQUFDO0FBQzVDLHlCQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBQyxBQUFDO0FBQ2xFLDJCQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQUFBQztnQkFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNuQixDQUNSO1NBQ0w7OztXQXRDQyxXQUFXOzs7QUF5Q2pCLFdBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsV0FBTyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLFNBQUssRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixjQUFVLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsT0FBRyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0NBQzlCLENBQUM7O2tCQUVhLFdBQVciLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5cbmNsYXNzIFVJVGFibGVDZWxsIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnRlcmFjdCkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3QoZXZlbnQsIHRoaXMucHJvcHMucm93LCB0aGlzLnByb3BzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lcic+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndWktdGFibGUtY2VsbC1pbm5lci10ZXh0Jz57dGhpcy5wcm9wcy5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZW50O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFkZFRpdGxlID0gdHlwZW9mIHRoaXMucHJvcHMuY29udGVudCA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS10YWJsZS1jZWxsJ1xuICAgICAgICAgICAgICAgICB0aXRsZT17YWRkVGl0bGUgPyB0aGlzLnByb3BzLmNvbnRlbnQgOiBudWxsfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLndpZHRoID8gdGhpcy5wcm9wcy53aWR0aCArICdweCcgOiBudWxsfX1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlQ2VsbC5wcm9wVHlwZXMgPSB7XG4gICAgY29udGVudDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb25JbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcm93OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlUYWJsZUNlbGw7XG4iXX0=