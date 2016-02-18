'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for TableView.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UITable = function (_UIView) {
    _inherits(UITable, _UIView);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UITable).apply(this, arguments));
    }

    _createClass(UITable, [{
        key: 'getTableViewConfiguration',
        value: function getTableViewConfiguration() {
            return {
                wrapper: this.refs.wrapper,
                header: this.refs.header,
                body: this.refs.body,
                'x-scroll-track': this.refs['x-scroll-track'],
                'x-scroll-handle': this.refs['x-scroll-handle'],
                'y-scroll-track': this.refs['y-scroll-track'],
                'y-scroll-handle': this.refs['y-scroll-handle'],
                aria: this.refs.aria,

                columns: this.props.columns,
                rowClickFunc: this.props.onRowInteract,
                cellClickFunc: this.props.onCellInteract,
                getRow: this.props.getRow,
                throttleInterval: this.props.throttleInterval,
                totalRows: this.props.totalRows
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.table = new _table2.default(this.getTableViewConfiguration());
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.table.destroy();
            this.table = null;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.table.regenerate(this.getTableViewConfiguration());
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: 'ui-table-wrapper ' + this.props.className,
                    'data-set-identifier': this.props.identifier,
                    tabIndex: '0' }),
                _react2.default.createElement(
                    'div',
                    { ref: 'table', className: 'ui-table' },
                    _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
                    _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' })
                ),
                _react2.default.createElement(
                    'div',
                    { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                    _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
                ),
                _react2.default.createElement(
                    'div',
                    { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                    _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
                ),
                _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' })
            );
        }
    }]);

    return UITable;
}(_UIView3.default);

UITable.propTypes = {
    columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        mapping: _react2.default.PropTypes.string,
        resizable: _react2.default.PropTypes.bool,
        title: _react2.default.PropTypes.string,
        width: _react2.default.PropTypes.number
    })),
    getRow: _react2.default.PropTypes.func,
    identifier: _react2.default.PropTypes.string,
    offscreenClass: _react2.default.PropTypes.string,
    onCellInteract: _react2.default.PropTypes.func,
    onRowInteract: _react2.default.PropTypes.func,
    throttleInterval: _react2.default.PropTypes.number,
    totalRows: _react2.default.PropTypes.number
};

UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen'
};

exports.default = UITable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBU007Ozs7Ozs7Ozs7O29EQUMwQjtBQUN4QixtQkFBTztBQUNILHlCQUFTLEtBQUssSUFBTCxDQUFVLE9BQVY7QUFDVCx3QkFBUSxLQUFLLElBQUwsQ0FBVSxNQUFWO0FBQ1Isc0JBQU0sS0FBSyxJQUFMLENBQVUsSUFBVjtBQUNOLGtDQUFrQixLQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFsQjtBQUNBLG1DQUFtQixLQUFLLElBQUwsQ0FBVSxpQkFBVixDQUFuQjtBQUNBLGtDQUFrQixLQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFsQjtBQUNBLG1DQUFtQixLQUFLLElBQUwsQ0FBVSxpQkFBVixDQUFuQjtBQUNBLHNCQUFNLEtBQUssSUFBTCxDQUFVLElBQVY7O0FBRU4seUJBQVMsS0FBSyxLQUFMLENBQVcsT0FBWDtBQUNULDhCQUFjLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDZCwrQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYO0FBQ2Ysd0JBQVEsS0FBSyxLQUFMLENBQVcsTUFBWDtBQUNSLGtDQUFrQixLQUFLLEtBQUwsQ0FBVyxnQkFBWDtBQUNsQiwyQkFBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYO2FBZmYsQ0FEd0I7Ozs7NENBbUJSO0FBQ2hCLGlCQUFLLEtBQUwsR0FBYSxvQkFBYyxLQUFLLHlCQUFMLEVBQWQsQ0FBYixDQURnQjs7OzsrQ0FJRztBQUNuQixpQkFBSyxLQUFMLENBQVcsT0FBWCxHQURtQjtBQUVuQixpQkFBSyxLQUFMLEdBQWEsSUFBYixDQUZtQjs7Ozs2Q0FLRjtBQUNqQixpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUFLLHlCQUFMLEVBQXRCLEVBRGlCOzs7O2lDQUlaO0FBQ0wsbUJBQ0k7OzZCQUFTLEtBQUssS0FBTDtBQUNKLHlCQUFJLFNBQUo7QUFDQSwrQkFBVyxzQkFBc0IsS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNqQywyQ0FBcUIsS0FBSyxLQUFMLENBQVcsVUFBWDtBQUNyQiw4QkFBUyxHQUFULEdBSkw7Z0JBS0k7O3NCQUFLLEtBQUksT0FBSixFQUFZLFdBQVUsVUFBVixFQUFqQjtvQkFDSSx1Q0FBSyxLQUFJLFFBQUosRUFBYSxXQUFVLGlCQUFWLEVBQWxCLENBREo7b0JBRUksdUNBQUssS0FBSSxNQUFKLEVBQVcsV0FBVSxlQUFWLEVBQWhCLENBRko7aUJBTEo7Z0JBVUk7O3NCQUFLLEtBQUksZ0JBQUosRUFBcUIsV0FBVSx5QkFBVixFQUExQjtvQkFDSSx1Q0FBSyxLQUFJLGlCQUFKLEVBQXNCLFdBQVUsMEJBQVYsRUFBM0IsQ0FESjtpQkFWSjtnQkFjSTs7c0JBQUssS0FBSSxnQkFBSixFQUFxQixXQUFVLHlCQUFWLEVBQTFCO29CQUNJLHVDQUFLLEtBQUksaUJBQUosRUFBc0IsV0FBVSwwQkFBVixFQUEzQixDQURKO2lCQWRKO2dCQWtCSSx1Q0FBSyxLQUFJLE1BQUosRUFBVyxXQUFXLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsY0FBN0IsRUFBNkMsYUFBVSxRQUFWLEVBQXhFLENBbEJKO2FBREosQ0FESzs7OztXQWpDUDs7O0FBMkROLFFBQVEsU0FBUixHQUFvQjtBQUNoQixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FDTCxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ2xCLGlCQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDVCxtQkFBVyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1gsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0tBSlgsQ0FESyxDQUFUO0FBUUEsWUFBUSxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1IsZ0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNaLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2hCLG9CQUFnQixnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ2hCLG1CQUFlLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDZixzQkFBa0IsZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNsQixlQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7Q0FmZjs7QUFrQkEsUUFBUSxZQUFSLEdBQXVCO0FBQ25CLGVBQVcsRUFBWDtBQUNBLG9CQUFnQixjQUFoQjtDQUZKOztrQkFLZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGVWaWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL3RhYmxlJztcblxuY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgZ2V0VGFibGVWaWV3Q29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMucmVmcy53cmFwcGVyLFxuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLnJlZnMuaGVhZGVyLFxuICAgICAgICAgICAgYm9keTogdGhpcy5yZWZzLmJvZHksXG4gICAgICAgICAgICAneC1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneC1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgYXJpYTogdGhpcy5yZWZzLmFyaWEsXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZVZpZXcodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd0YWJsZScgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVRhYmxlLnByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICByZXNpemFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgfSlcbiAgICApLFxuICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvZmZzY3JlZW5DbGFzczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhyb3R0bGVJbnRlcnZhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICB0b3RhbFJvd3M6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5VSVRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJVGFibGU7XG4iXX0=