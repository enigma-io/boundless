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
            onColumnResize: this.props.onColumnResize,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows,

            // internal use only, renders the table without any event listeners (minimal computation)
            static_mode: this.props.static
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _table2.default(this.getTableViewConfiguration());

        if (this.props.jumpToRowIndex) {
            this.table.jumpToRowIndex(this.props.jumpToRowIndex);
        }
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.onlyColumnWidthChangedAndMatchesTableInternals = function onlyColumnWidthChangedAndMatchesTableInternals(current_columns, prev_columns, table_internal_columns) {
        /* the columns should exactly match in the proper order, or the widths should be the same as the internal column
        representation, meaning the change is a reaction to being alerted by `props.onColumnResize` */
        return current_columns.every(function (column, index) {
            return column === prev_columns[index] || column.mapping === prev_columns[index].mapping && column.width === table_internal_columns[index].width;
        });
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prev_props) {
        var changed_props = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in this.props) {
            if (this.props[key] !== prev_props[key]) {
                changed_props.push(key);
            }
        }

        for (key in prev_props) {
            if (prev_props[key] !== this.props[key] && changed_props.indexOf(key) === -1) {
                changed_props.push(key);
            }
        }

        if (changed_props.length) {
            if (changed_props.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(this.props.jumpToRowIndex);
            }

            if (changed_props.length === 1 && changed_props[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (this.onlyColumnWidthChangedAndMatchesTableInternals(this.props.columns, prev_props.columns, this.table.columns)) {
                    return;
                }
            }

            this.table.regenerate(this.getTableViewConfiguration());
        }
    };

    UITable.prototype.renderXScroll = function renderXScroll() {
        if (!this.props.static) {
            return _react2.default.createElement(
                'div',
                { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
                _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
            );
        }
    };

    UITable.prototype.renderYScroll = function renderYScroll() {
        if (!this.props.static) {
            return _react2.default.createElement(
                'div',
                { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
                _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
            );
        }
    };

    UITable.prototype.renderAria = function renderAria() {
        if (!this.props.static) {
            return _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' });
        }
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
            this.renderXScroll(),
            this.renderYScroll(),
            this.renderAria()
        );
    };

    return UITable;
}(_UIView3.default);

UITable.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        mapping: _react.PropTypes.string,
        resizable: _react.PropTypes.bool,
        title: _react.PropTypes.string,
        width: _react.PropTypes.number
    })),
    getRow: _react.PropTypes.func,
    identifier: _react.PropTypes.string,
    jumpToRowIndex: _react.PropTypes.number,
    offscreenClass: _react.PropTypes.string,
    onCellInteract: _react.PropTypes.func,
    onColumnResize: _react.PropTypes.func,
    onRowInteract: _react.PropTypes.func,
    preserveScrollState: _react.PropTypes.bool,
    throttleInterval: _react.PropTypes.number,
    totalRows: _react.PropTypes.number,

    static: _react.PropTypes.bool
};
UITable.defaultProps = {
    className: '',
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsTztjQUFBLE87O2FBQUEsTzs4QkFBQSxPOzs7OztBQUFBLFcsV0E4QmpCLHlCLHdDQUE0QjtBQUN4QixlQUFPO0FBQ0gscUJBQVMsS0FBSyxJQUFMLENBQVUsT0FEaEI7QUFFSCxvQkFBUSxLQUFLLElBQUwsQ0FBVSxNQUZmO0FBR0gsa0JBQU0sS0FBSyxJQUFMLENBQVUsSUFIYjtBQUlILDhCQUFrQixLQUFLLElBQUwsQ0FBVSxnQkFBVixDQUpmO0FBS0gsK0JBQW1CLEtBQUssSUFBTCxDQUFVLGlCQUFWLENBTGhCO0FBTUgsOEJBQWtCLEtBQUssSUFBTCxDQUFVLGdCQUFWLENBTmY7QUFPSCwrQkFBbUIsS0FBSyxJQUFMLENBQVUsaUJBQVYsQ0FQaEI7QUFRSCxrQkFBTSxLQUFLLElBQUwsQ0FBVSxJQVJiOztBQVVILHFCQUFTLEtBQUssS0FBTCxDQUFXLE9BVmpCO0FBV0gsMEJBQWMsS0FBSyxLQUFMLENBQVcsYUFYdEI7QUFZSCwyQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQVp2QjtBQWFILDRCQUFnQixLQUFLLEtBQUwsQ0FBVyxjQWJ4QjtBQWNILG9CQUFRLEtBQUssS0FBTCxDQUFXLE1BZGhCO0FBZUgsaUNBQXFCLEtBQUssS0FBTCxDQUFXLG1CQWY3QjtBQWdCSCw4QkFBa0IsS0FBSyxLQUFMLENBQVcsZ0JBaEIxQjtBQWlCSCx1QkFBVyxLQUFLLEtBQUwsQ0FBVyxTQWpCbkI7OztBQW9CSCx5QkFBYSxLQUFLLEtBQUwsQ0FBVztBQXBCckIsU0FBUDtBQXNCSCxLOztBQXJEZ0IsVyxXQXVEakIsaUIsZ0NBQW9CO0FBQ2hCLGFBQUssS0FBTCxHQUFhLG9CQUFjLEtBQUsseUJBQUwsRUFBZCxDQUFiOztBQUVBLFlBQUksS0FBSyxLQUFMLENBQVcsY0FBZixFQUErQjtBQUMzQixpQkFB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bGVWaWV3LlxuICogQGNsYXNzIFVJVGFibGVcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL3RhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUm93SW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG90YWxSb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gICAgICAgIHN0YXRpYzogUHJvcFR5cGVzLmJvb2wsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0cnVlLFxuICAgIH1cblxuICAgIGdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICByb3dDbGlja0Z1bmM6IHRoaXMucHJvcHMub25Sb3dJbnRlcmFjdCxcbiAgICAgICAgICAgIGNlbGxDbGlja0Z1bmM6IHRoaXMucHJvcHMub25DZWxsSW50ZXJhY3QsXG4gICAgICAgICAgICBvbkNvbHVtblJlc2l6ZTogdGhpcy5wcm9wcy5vbkNvbHVtblJlc2l6ZSxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0aGlzLnByb3BzLnByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuXG4gICAgICAgICAgICAvLyBpbnRlcm5hbCB1c2Ugb25seSwgcmVuZGVycyB0aGUgdGFibGUgd2l0aG91dCBhbnkgZXZlbnQgbGlzdGVuZXJzIChtaW5pbWFsIGNvbXB1dGF0aW9uKVxuICAgICAgICAgICAgc3RhdGljX21vZGU6IHRoaXMucHJvcHMuc3RhdGljLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlVmlldyh0aGlzLmdldFRhYmxlVmlld0NvbmZpZ3VyYXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIG9ubHlDb2x1bW5XaWR0aENoYW5nZWRBbmRNYXRjaGVzVGFibGVJbnRlcm5hbHMoY3VycmVudF9jb2x1bW5zLCBwcmV2X2NvbHVtbnMsIHRhYmxlX2ludGVybmFsX2NvbHVtbnMpIHtcbiAgICAgICAgLyogdGhlIGNvbHVtbnMgc2hvdWxkIGV4YWN0bHkgbWF0Y2ggaW4gdGhlIHByb3BlciBvcmRlciwgb3IgdGhlIHdpZHRocyBzaG91bGQgYmUgdGhlIHNhbWUgYXMgdGhlIGludGVybmFsIGNvbHVtblxuICAgICAgICByZXByZXNlbnRhdGlvbiwgbWVhbmluZyB0aGUgY2hhbmdlIGlzIGEgcmVhY3Rpb24gdG8gYmVpbmcgYWxlcnRlZCBieSBgcHJvcHMub25Db2x1bW5SZXNpemVgICovXG4gICAgICAgIHJldHVybiBjdXJyZW50X2NvbHVtbnMuZXZlcnkoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAgICBjb2x1bW4gPT09IHByZXZfY29sdW1uc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICB8fCAoY29sdW1uLm1hcHBpbmcgPT09IHByZXZfY29sdW1uc1tpbmRleF0ubWFwcGluZyAmJiBjb2x1bW4ud2lkdGggPT09IHRhYmxlX2ludGVybmFsX2NvbHVtbnNbaW5kZXhdLndpZHRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZF9wcm9wcyA9IFtdO1xuICAgICAgICBsZXQga2V5O1xuXG4gICAgICAgIC8qIGJpZGlyZWN0aW9uYWwga2V5IGNoYW5nZSBkZXRlY3Rpb24gKi9cblxuICAgICAgICBmb3IgKGtleSBpbiB0aGlzLnByb3BzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wc1trZXldICE9PSBwcmV2X3Byb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkX3Byb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoa2V5IGluIHByZXZfcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcmV2X3Byb3BzW2tleV0gIT09IHRoaXMucHJvcHNba2V5XSAmJiBjaGFuZ2VkX3Byb3BzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkX3Byb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VkX3Byb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMuaW5kZXhPZignanVtcFRvUm93SW5kZXgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvKiBqdW1wVG9Sb3dJbmRleCBhbHJlYWR5IHRyaWdnZXJzIGEgcmVnZW5lcmF0aW9uLCBqdXN0IGF2b2lkaW5nIHJ1bm5pbmcgaXQgdHdpY2UgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleCh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZWRfcHJvcHMubGVuZ3RoID09PSAxICYmIGNoYW5nZWRfcHJvcHNbMF0gPT09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgIC8qIGRpZCB0aGluZ3MgbWF0ZXJpYWxseSBjaGFuZ2UsIG9yIGp1c3QgdXBkYXRpbmcgYSBjb2x1bW4gd2lkdGg/ICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25seUNvbHVtbldpZHRoQ2hhbmdlZEFuZE1hdGNoZXNUYWJsZUludGVybmFscyh0aGlzLnByb3BzLmNvbHVtbnMsIHByZXZfcHJvcHMuY29sdW1ucywgdGhpcy50YWJsZS5jb2x1bW5zKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRUYWJsZVZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyWFNjcm9sbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnN0YXRpYykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJZU2Nyb2xsKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc3RhdGljKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckFyaWEoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zdGF0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd0YWJsZScgY2xhc3NOYW1lPSd1aS10YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWFNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcllTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=