'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    UITable.prototype.getTableViewConfiguration = function getTableViewConfiguration() {
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
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _table2.default(this.getTableViewConfiguration());
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate() {
        this.table.regenerate(this.getTableViewConfiguration());
    };

    UITable.prototype.render = function render() {
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
    };

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
    preserveScrollState: _react2.default.PropTypes.bool,
    throttleInterval: _react2.default.PropTypes.number,
    totalRows: _react2.default.PropTypes.number
};
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;
//# sourceMappingURL=data:application/json;base64,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WSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1osb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDaEIsb0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDaEIsbUJBQWUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNmLHlCQUFxQixnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ3JCLHNCQUFrQixnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ2xCLGVBQVcsZ0JBQU0sU0FBTixDQUFnQixNQUFoQjs7QUFqQkUsUUFvQlYsZUFBZTtBQUNsQixlQUFXLEVBQVg7QUFDQSxvQkFBZ0IsY0FBaEI7QUFDQSx5QkFBcUIsSUFBckI7O2tCQXZCYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGVWaWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL3RhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNlbGxJbnRlcmFjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUm93SW50ZXJhY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG90YWxSb3dzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdHJ1ZSxcbiAgICB9XG5cbiAgICBnZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy5yZWZzLndyYXBwZXIsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMucmVmcy5oZWFkZXIsXG4gICAgICAgICAgICBib2R5OiB0aGlzLnJlZnMuYm9keSxcbiAgICAgICAgICAgICd4LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd4LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICBhcmlhOiB0aGlzLnJlZnMuYXJpYSxcblxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgcm93Q2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QsXG4gICAgICAgICAgICBjZWxsQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgZ2V0Um93OiB0aGlzLnByb3BzLmdldFJvdyxcbiAgICAgICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRoaXMucHJvcHMucHJlc2VydmVTY3JvbGxTdGF0ZSxcbiAgICAgICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IHRoaXMucHJvcHMudGhyb3R0bGVJbnRlcnZhbCxcbiAgICAgICAgICAgIHRvdGFsUm93czogdGhpcy5wcm9wcy50b3RhbFJvd3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlVmlldyh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMudGFibGUucmVnZW5lcmF0ZSh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3RhYmxlJyBjbGFzc05hbWU9J3VpLXRhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=