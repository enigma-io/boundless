'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _enigmaTable = require('enigma-table');

var _enigmaTable2 = _interopRequireDefault(_enigmaTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React wrapper for Table.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UITable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function didColumnsChange(currentColumns, prevColumns, tableInternalColumns) {
    /*
        1. there should be the same number of columns
        2. the columns should exactly match in the proper order
        3. each column property should be exactly the same
     */

    if (currentColumns.length !== prevColumns.length) {
        return true;
    }

    // did the column descriptors change in some way, or did the width change?
    // this will also catch if the order of the columns changed when comparing
    // the mapping property
    return currentColumns.some(function (column, index) {
        return column.mapping !== prevColumns[index].mapping || column.title !== prevColumns[index].title || column.resizable !== prevColumns[index].resizable || column.width !== undefined && column.width !== tableInternalColumns[index].width;
    });
}

var columnChildSpec = _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    attributes: _react.PropTypes.object
});

var UITable = function (_React$PureComponent) {
    _inherits(UITable, _React$PureComponent);

    function UITable() {
        _classCallCheck(this, UITable);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    UITable.prototype.getSubviewConfiguration = function getSubviewConfiguration() {
        return {
            wrapper: this.refs.wrapper,
            header: this.refs.header,
            body: this.refs.body,
            'x-scroll-track': this.refs['x-scroll-track'],
            'x-scroll-handle': this.refs['x-scroll-handle'],
            'y-scroll-track': this.refs['y-scroll-track'],
            'y-scroll-handle': this.refs['y-scroll-handle'],
            aria: this.refs.aria,

            activeRowChangedFunc: this.props.onActiveRowChanged,
            allowScrollPropagation: this.props.allowScrollPropagation,
            columns: this.props.columns,
            columnResizeFunc: this.props.onColumnResize,
            fitColumnsToTable: this.props.fitColumnsToTableWidth,
            headerColumnClickFunc: this.props.onHeaderCellInteract,
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            getRow: this.props.getRow,
            preserveScrollState: this.props.preserveScrollState,
            throttleInterval: this.props.throttleInterval,
            totalRows: this.props.totalRows
        };
    };

    UITable.prototype.componentDidMount = function componentDidMount() {
        this.table = new _enigmaTable2.default(this.getSubviewConfiguration());

        if (this.props.jumpToRowIndex !== undefined) {
            this.table.jumpToRowIndex(this.props.jumpToRowIndex);
        }
    };

    UITable.prototype.componentWillUnmount = function componentWillUnmount() {
        this.table.destroy();
        this.table = null;
    };

    UITable.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var props = this.props;

        var changedProps = [];
        var key = void 0;

        /* bidirectional key change detection */

        for (key in props) {
            if (props[key] !== prevProps[key]) {
                changedProps.push(key);
            }
        }

        for (key in prevProps) {
            if (prevProps[key] !== props[key] && changedProps.indexOf(key) === -1) {
                changedProps.push(key);
            }
        }

        if (changedProps.length) {
            if (changedProps.indexOf('jumpToRowIndex') !== -1) {
                /* jumpToRowIndex already triggers a regeneration, just avoiding running it twice */
                return this.table.jumpToRowIndex(props.jumpToRowIndex);
            }

            if (changedProps.length === 1 && changedProps[0] === 'columns') {
                /* did things materially change, or just updating a column width? */
                if (didColumnsChange(props.columns, prevProps.columns, this.table.columns) === false) {
                    return;
                }
            }

            this.table.regenerate(this.getSubviewConfiguration());
        }
    };

    UITable.prototype.renderXScroll = function renderXScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'x-scroll-track', className: 'ui-table-x-scroll-track' },
            _react2.default.createElement('div', { ref: 'x-scroll-handle', className: 'ui-table-x-scroll-handle' })
        );
    };

    UITable.prototype.renderYScroll = function renderYScroll() {
        return _react2.default.createElement(
            'div',
            { ref: 'y-scroll-track', className: 'ui-table-y-scroll-track' },
            _react2.default.createElement('div', { ref: 'y-scroll-handle', className: 'ui-table-y-scroll-handle' })
        );
    };

    UITable.prototype.renderAria = function renderAria() {
        return _react2.default.createElement('div', { ref: 'aria', className: this.props.offscreenClass || 'ui-offscreen', 'aria-live': 'polite' });
    };

    UITable.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UITable.internalKeys), {
                ref: 'wrapper',
                className: 'ui-table-wrapper ' + this.props.className,
                'data-set-identifier': this.props.identifier,
                tabIndex: '0' }),
            _react2.default.createElement('div', { ref: 'header', className: 'ui-table-header' }),
            _react2.default.createElement('div', { ref: 'body', className: 'ui-table-body' }),
            this.renderXScroll(),
            this.renderYScroll(),
            this.renderAria()
        );
    };

    return UITable;
}(_react2.default.PureComponent);

UITable.propTypes = {
    allowScrollPropagation: _react.PropTypes.bool,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool, columnChildSpec, _react.PropTypes.arrayOf(columnChildSpec)]),
        mapping: _react.PropTypes.string,
        resizable: _react.PropTypes.bool,
        title: _react.PropTypes.string,
        width: _react.PropTypes.number
    })),
    fitColumnsToTableWidth: _react.PropTypes.bool,
    getRow: _react.PropTypes.func,
    identifier: _react.PropTypes.string,
    jumpToRowIndex: _react.PropTypes.number,
    offscreenClass: _react.PropTypes.string,
    onActiveRowChanged: _react.PropTypes.func,
    onCellInteract: _react.PropTypes.func,
    onColumnResize: _react.PropTypes.func,
    onHeaderCellInteract: _react.PropTypes.func,
    onRowInteract: _react.PropTypes.func,
    preserveScrollState: _react.PropTypes.bool,
    throttleInterval: _react.PropTypes.number,
    totalRows: _react.PropTypes.number
};
UITable.internalKeys = Object.keys(UITable.propTypes);
UITable.defaultProps = {
    allowScrollPropagation: false,
    className: '',
    fitColumnsToTableWidth: false,
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOlsiZGlkQ29sdW1uc0NoYW5nZSIsImN1cnJlbnRDb2x1bW5zIiwicHJldkNvbHVtbnMiLCJ0YWJsZUludGVybmFsQ29sdW1ucyIsImxlbmd0aCIsInNvbWUiLCJjb2x1bW4iLCJpbmRleCIsIm1hcHBpbmciLCJ0aXRsZSIsInJlc2l6YWJsZSIsIndpZHRoIiwidW5kZWZpbmVkIiwiY29sdW1uQ2hpbGRTcGVjIiwic2hhcGUiLCJ0YWciLCJzdHJpbmciLCJhdHRyaWJ1dGVzIiwib2JqZWN0IiwiVUlUYWJsZSIsImdldFN1YnZpZXdDb25maWd1cmF0aW9uIiwid3JhcHBlciIsInJlZnMiLCJoZWFkZXIiLCJib2R5IiwiYXJpYSIsImFjdGl2ZVJvd0NoYW5nZWRGdW5jIiwicHJvcHMiLCJvbkFjdGl2ZVJvd0NoYW5nZWQiLCJhbGxvd1Njcm9sbFByb3BhZ2F0aW9uIiwiY29sdW1ucyIsImNvbHVtblJlc2l6ZUZ1bmMiLCJvbkNvbHVtblJlc2l6ZSIsImZpdENvbHVtbnNUb1RhYmxlIiwiZml0Q29sdW1uc1RvVGFibGVXaWR0aCIsImhlYWRlckNvbHVtbkNsaWNrRnVuYyIsIm9uSGVhZGVyQ2VsbEludGVyYWN0Iiwicm93Q2xpY2tGdW5jIiwib25Sb3dJbnRlcmFjdCIsImNlbGxDbGlja0Z1bmMiLCJvbkNlbGxJbnRlcmFjdCIsImdldFJvdyIsInByZXNlcnZlU2Nyb2xsU3RhdGUiLCJ0aHJvdHRsZUludGVydmFsIiwidG90YWxSb3dzIiwiY29tcG9uZW50RGlkTW91bnQiLCJ0YWJsZSIsImp1bXBUb1Jvd0luZGV4IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkZXN0cm95IiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwiY2hhbmdlZFByb3BzIiwia2V5IiwicHVzaCIsImluZGV4T2YiLCJyZWdlbmVyYXRlIiwicmVuZGVyWFNjcm9sbCIsInJlbmRlcllTY3JvbGwiLCJyZW5kZXJBcmlhIiwib2Zmc2NyZWVuQ2xhc3MiLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJjbGFzc05hbWUiLCJpZGVudGlmaWVyIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsImJvb2wiLCJhcnJheU9mIiwiY2hpbGRyZW4iLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJmdW5jIiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVBBOzs7OztBQVNBLFNBQVNBLGdCQUFULENBQTBCQyxjQUExQixFQUEwQ0MsV0FBMUMsRUFBdURDLG9CQUF2RCxFQUE2RTtBQUN6RTs7Ozs7O0FBTUEsUUFBSUYsZUFBZUcsTUFBZixLQUEwQkYsWUFBWUUsTUFBMUMsRUFBa0Q7QUFDOUMsZUFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBT0gsZUFBZUksSUFBZixDQUFvQixVQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDMUMsZUFBVUQsT0FBT0UsT0FBUCxLQUFtQk4sWUFBWUssS0FBWixFQUFtQkMsT0FBdEMsSUFDQUYsT0FBT0csS0FBUCxLQUFpQlAsWUFBWUssS0FBWixFQUFtQkUsS0FEcEMsSUFFQUgsT0FBT0ksU0FBUCxLQUFxQlIsWUFBWUssS0FBWixFQUFtQkcsU0FGeEMsSUFHQ0osT0FBT0ssS0FBUCxLQUFpQkMsU0FBakIsSUFBOEJOLE9BQU9LLEtBQVAsS0FBaUJSLHFCQUFxQkksS0FBckIsRUFBNEJJLEtBSHRGO0FBSUgsS0FMTSxDQUFQO0FBTUg7O0FBRUQsSUFBTUUsa0JBQWtCLGlCQUFVQyxLQUFWLENBQWdCO0FBQ3BDQyxTQUFLLGlCQUFVQyxNQURxQjtBQUVwQ0MsZ0JBQVksaUJBQVVDO0FBRmMsQ0FBaEIsQ0FBeEI7O0lBS3FCQyxPOzs7Ozs7Ozs7c0JBMkNqQkMsdUIsc0NBQTBCO0FBQ3RCLGVBQU87QUFDSEMscUJBQVMsS0FBS0MsSUFBTCxDQUFVRCxPQURoQjtBQUVIRSxvQkFB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ZS5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnZW5pZ21hLXRhYmxlJztcblxuZnVuY3Rpb24gZGlkQ29sdW1uc0NoYW5nZShjdXJyZW50Q29sdW1ucywgcHJldkNvbHVtbnMsIHRhYmxlSW50ZXJuYWxDb2x1bW5zKSB7XG4gICAgLypcbiAgICAgICAgMS4gdGhlcmUgc2hvdWxkIGJlIHRoZSBzYW1lIG51bWJlciBvZiBjb2x1bW5zXG4gICAgICAgIDIuIHRoZSBjb2x1bW5zIHNob3VsZCBleGFjdGx5IG1hdGNoIGluIHRoZSBwcm9wZXIgb3JkZXJcbiAgICAgICAgMy4gZWFjaCBjb2x1bW4gcHJvcGVydHkgc2hvdWxkIGJlIGV4YWN0bHkgdGhlIHNhbWVcbiAgICAgKi9cblxuICAgIGlmIChjdXJyZW50Q29sdW1ucy5sZW5ndGggIT09IHByZXZDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkaWQgdGhlIGNvbHVtbiBkZXNjcmlwdG9ycyBjaGFuZ2UgaW4gc29tZSB3YXksIG9yIGRpZCB0aGUgd2lkdGggY2hhbmdlP1xuICAgIC8vIHRoaXMgd2lsbCBhbHNvIGNhdGNoIGlmIHRoZSBvcmRlciBvZiB0aGUgY29sdW1ucyBjaGFuZ2VkIHdoZW4gY29tcGFyaW5nXG4gICAgLy8gdGhlIG1hcHBpbmcgcHJvcGVydHlcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnMuc29tZSgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gICAgY29sdW1uLm1hcHBpbmcgIT09IHByZXZDb2x1bW5zW2luZGV4XS5tYXBwaW5nXG4gICAgICAgICAgICAgICB8fCBjb2x1bW4udGl0bGUgIT09IHByZXZDb2x1bW5zW2luZGV4XS50aXRsZVxuICAgICAgICAgICAgICAgfHwgY29sdW1uLnJlc2l6YWJsZSAhPT0gcHJldkNvbHVtbnNbaW5kZXhdLnJlc2l6YWJsZVxuICAgICAgICAgICAgICAgfHwgKGNvbHVtbi53aWR0aCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbi53aWR0aCAhPT0gdGFibGVJbnRlcm5hbENvbHVtbnNbaW5kZXhdLndpZHRoKTtcbiAgICB9KTtcbn1cblxuY29uc3QgY29sdW1uQ2hpbGRTcGVjID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXR0cmlidXRlczogUHJvcFR5cGVzLm9iamVjdCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRhYmxlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5DaGlsZFNwZWMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5hcnJheU9mKGNvbHVtbkNoaWxkU3BlYyksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWFwcGluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgZml0Q29sdW1uc1RvVGFibGVXaWR0aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25BY3RpdmVSb3dDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGVhZGVyQ2VsbEludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Sb3dJbnRlcmFjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICB0aHJvdHRsZUludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB0b3RhbFJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGFibGUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIGZpdENvbHVtbnNUb1RhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogJ3VpLW9mZnNjcmVlbicsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRydWUsXG4gICAgfVxuXG4gICAgZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3cmFwcGVyOiB0aGlzLnJlZnMud3JhcHBlcixcbiAgICAgICAgICAgIGhlYWRlcjogdGhpcy5yZWZzLmhlYWRlcixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVmcy5ib2R5LFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd4LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3gtc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneC1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneS1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd5LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgIGFyaWE6IHRoaXMucmVmcy5hcmlhLFxuXG4gICAgICAgICAgICBhY3RpdmVSb3dDaGFuZ2VkRnVuYzogdGhpcy5wcm9wcy5vbkFjdGl2ZVJvd0NoYW5nZWQsXG4gICAgICAgICAgICBhbGxvd1Njcm9sbFByb3BhZ2F0aW9uOiB0aGlzLnByb3BzLmFsbG93U2Nyb2xsUHJvcGFnYXRpb24sXG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVGdW5jOiB0aGlzLnByb3BzLm9uQ29sdW1uUmVzaXplLFxuICAgICAgICAgICAgZml0Q29sdW1uc1RvVGFibGU6IHRoaXMucHJvcHMuZml0Q29sdW1uc1RvVGFibGVXaWR0aCxcbiAgICAgICAgICAgIGhlYWRlckNvbHVtbkNsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkhlYWRlckNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIGdldFJvdzogdGhpcy5wcm9wcy5nZXRSb3csXG4gICAgICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0aGlzLnByb3BzLnByZXNlcnZlU2Nyb2xsU3RhdGUsXG4gICAgICAgICAgICB0aHJvdHRsZUludGVydmFsOiB0aGlzLnByb3BzLnRocm90dGxlSW50ZXJ2YWwsXG4gICAgICAgICAgICB0b3RhbFJvd3M6IHRoaXMucHJvcHMudG90YWxSb3dzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IFRhYmxlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleCh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnRhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICAgICAgY29uc3QgY2hhbmdlZFByb3BzID0gW107XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgLyogYmlkaXJlY3Rpb25hbCBrZXkgY2hhbmdlIGRldGVjdGlvbiAqL1xuXG4gICAgICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSAhPT0gcHJldlByb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJldlByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJldlByb3BzW2tleV0gIT09IHByb3BzW2tleV0gJiYgY2hhbmdlZFByb3BzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcHMuaW5kZXhPZignanVtcFRvUm93SW5kZXgnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvKiBqdW1wVG9Sb3dJbmRleCBhbHJlYWR5IHRyaWdnZXJzIGEgcmVnZW5lcmF0aW9uLCBqdXN0IGF2b2lkaW5nIHJ1bm5pbmcgaXQgdHdpY2UgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZS5qdW1wVG9Sb3dJbmRleChwcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcHMubGVuZ3RoID09PSAxICYmIGNoYW5nZWRQcm9wc1swXSA9PT0gJ2NvbHVtbnMnKSB7XG4gICAgICAgICAgICAgICAgLyogZGlkIHRoaW5ncyBtYXRlcmlhbGx5IGNoYW5nZSwgb3IganVzdCB1cGRhdGluZyBhIGNvbHVtbiB3aWR0aD8gKi9cbiAgICAgICAgICAgICAgICBpZiAoZGlkQ29sdW1uc0NoYW5nZShwcm9wcy5jb2x1bW5zLCBwcmV2UHJvcHMuY29sdW1ucywgdGhpcy50YWJsZS5jb2x1bW5zKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZS5yZWdlbmVyYXRlKHRoaXMuZ2V0U3Vidmlld0NvbmZpZ3VyYXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJYU2Nyb2xsKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXgtc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcllTY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteS1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQXJpYSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdhcmlhJyBjbGFzc05hbWU9e3RoaXMucHJvcHMub2Zmc2NyZWVuQ2xhc3MgfHwgJ3VpLW9mZnNjcmVlbid9IGFyaWEtbGl2ZT0ncG9saXRlJyAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSVRhYmxlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3VpLXRhYmxlLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIGRhdGEtc2V0LWlkZW50aWZpZXI9e3RoaXMucHJvcHMuaWRlbnRpZmllcn1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2hlYWRlcicgY2xhc3NOYW1lPSd1aS10YWJsZS1oZWFkZXInIC8+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J2JvZHknIGNsYXNzTmFtZT0ndWktdGFibGUtYm9keScgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclhTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJZU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJpYSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19