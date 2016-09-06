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
            headerColumnClickFunc: this.props.onHeaderCellInteract,
            rowClickFunc: this.props.onRowInteract,
            cellClickFunc: this.props.onCellInteract,
            onColumnResize: this.props.onColumnResize,
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
    offscreenClass: 'ui-offscreen',
    preserveScrollState: true
};
exports.default = UITable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVBBOzs7OztBQVNBLFNBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsV0FBMUMsRUFBdUQsb0JBQXZELEVBQTZFO0FBQ3pFOzs7Ozs7QUFNQSxRQUFJLGVBQWUsTUFBZixLQUEwQixZQUFZLE1BQTFDLEVBQWtEO0FBQzlDLGVBQU8sSUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQU8sZUFBZSxJQUFmLENBQW9CLFVBQUMsTUFBRCxFQUFTLEtBQVQsRUFBbUI7QUFDMUMsZUFBVSxPQUFPLE9BQVAsS0FBbUIsWUFBWSxLQUFaLEVBQW1CLE9BQXRDLElBQ0EsT0FBTyxLQUFQLEtBQWlCLFlBQVksS0FBWixFQUFtQixLQURwQyxJQUVBLE9BQU8sU0FBUCxLQUFxQixZQUFZLEtBQVosRUFBbUIsU0FGeEMsSUFHQyxPQUFPLEtBQVAsS0FBaUIsU0FBakIsSUFBOEIsT0FBTyxLQUFQLEtBQWlCLHFCQUFxQixLQUFyQixFQUE0QixLQUh0RjtBQUlILEtBTE0sQ0FBUDtBQU1IOztBQUVELElBQU0sa0JBQWtCLGlCQUFVLEtBQVYsQ0FBZ0I7QUFDcEMsU0FBSyxpQkFBVSxNQURxQjtBQUVwQyxnQkFBWSxpQkFBVTtBQUZjLENBQWhCLENBQXhCOztJQUtxQixPOzs7Ozs7Ozs7c0JBeUNqQix1QixzQ0FBMEI7QUFDdEIsZUFBTztBQUNILHFCQUFTLEtBQUssSUFBTCxDQUFVLE9BRGhCO0FBRUgsb0JBQVEsS0FBSyxJQUFMLENBQVUsTUFGZjtBQUdILGtCQUFNLEtBQUssSUFBTCxDQUFVLElBSGI7QUFJSCw4QkFBa0IsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FKZjtBQUtILCtCQUFtQixLQUFLLElBQUwsQ0FBVSxpQkFBVixDQUxoQjtBQU1ILDhCQUFrQixLQUFLLElBQUwsQ0FBVSxnQkFBVixDQU5mO0FB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O0FBdUJmLG9CQUFnQixpQkFBVSxJQXZCWDtBQXdCZiwwQkFBc0IsaUJBQVUsSUF4QmpCO0FBeUJmLG1CQUFlLGlCQUFVLElBekJWO0FBMEJmLHlCQUFxQixpQkFBVSxJQTFCaEI7QUEyQmYsc0JBQWtCLGlCQUFVLE1BM0JiO0FBNEJmLGVBQVcsaUJBQVU7QUE1Qk4sQztBQURGLE8sQ0FnQ1YsWSxHQUFlLE9BQU8sSUFBUCxDQUFZLFFBQVEsU0FBcEIsQztBQWhDTCxPLENBa0NWLFksR0FBZTtBQUNsQiw0QkFBd0IsS0FETjtBQUVsQixlQUFXLEVBRk87QUFHbEIsb0JBQWdCLGNBSEU7QUFJbEIseUJBQXFCO0FBSkgsQztrQkFsQ0wsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVhY3Qgd3JhcHBlciBmb3IgVGFibGUuXG4gKiBAY2xhc3MgVUlUYWJsZVxuICovXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuaW1wb3J0IFRhYmxlIGZyb20gJ2VuaWdtYS10YWJsZSc7XG5cbmZ1bmN0aW9uIGRpZENvbHVtbnNDaGFuZ2UoY3VycmVudENvbHVtbnMsIHByZXZDb2x1bW5zLCB0YWJsZUludGVybmFsQ29sdW1ucykge1xuICAgIC8qXG4gICAgICAgIDEuIHRoZXJlIHNob3VsZCBiZSB0aGUgc2FtZSBudW1iZXIgb2YgY29sdW1uc1xuICAgICAgICAyLiB0aGUgY29sdW1ucyBzaG91bGQgZXhhY3RseSBtYXRjaCBpbiB0aGUgcHJvcGVyIG9yZGVyXG4gICAgICAgIDMuIGVhY2ggY29sdW1uIHByb3BlcnR5IHNob3VsZCBiZSBleGFjdGx5IHRoZSBzYW1lXG4gICAgICovXG5cbiAgICBpZiAoY3VycmVudENvbHVtbnMubGVuZ3RoICE9PSBwcmV2Q29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZGlkIHRoZSBjb2x1bW4gZGVzY3JpcHRvcnMgY2hhbmdlIGluIHNvbWUgd2F5LCBvciBkaWQgdGhlIHdpZHRoIGNoYW5nZT9cbiAgICAvLyB0aGlzIHdpbGwgYWxzbyBjYXRjaCBpZiB0aGUgb3JkZXIgb2YgdGhlIGNvbHVtbnMgY2hhbmdlZCB3aGVuIGNvbXBhcmluZ1xuICAgIC8vIHRoZSBtYXBwaW5nIHByb3BlcnR5XG4gICAgcmV0dXJuIGN1cnJlbnRDb2x1bW5zLnNvbWUoKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuICAgIGNvbHVtbi5tYXBwaW5nICE9PSBwcmV2Q29sdW1uc1tpbmRleF0ubWFwcGluZ1xuICAgICAgICAgICAgICAgfHwgY29sdW1uLnRpdGxlICE9PSBwcmV2Q29sdW1uc1tpbmRleF0udGl0bGVcbiAgICAgICAgICAgICAgIHx8IGNvbHVtbi5yZXNpemFibGUgIT09IHByZXZDb2x1bW5zW2luZGV4XS5yZXNpemFibGVcbiAgICAgICAgICAgICAgIHx8IChjb2x1bW4ud2lkdGggIT09IHVuZGVmaW5lZCAmJiBjb2x1bW4ud2lkdGggIT09IHRhYmxlSW50ZXJuYWxDb2x1bW5zW2luZGV4XS53aWR0aCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IGNvbHVtbkNoaWxkU3BlYyA9IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGFnOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF0dHJpYnV0ZXM6IFByb3BUeXBlcy5vYmplY3QsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUYWJsZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFsbG93U2Nyb2xsUHJvcGFnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uQ2hpbGRTcGVjLFxuICAgICAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYXJyYXlPZihjb2x1bW5DaGlsZFNwZWMpLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG1hcHBpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGdldFJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlkZW50aWZpZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGp1bXBUb1Jvd0luZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBvZmZzY3JlZW5DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgb25BY3RpdmVSb3dDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25DZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkNvbHVtblJlc2l6ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGVhZGVyQ2VsbEludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25Sb3dJbnRlcmFjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICB0aHJvdHRsZUludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB0b3RhbFJvd3M6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGFibGUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiAndWktb2Zmc2NyZWVuJyxcbiAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdHJ1ZSxcbiAgICB9XG5cbiAgICBnZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMucmVmcy53cmFwcGVyLFxuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLnJlZnMuaGVhZGVyLFxuICAgICAgICAgICAgYm9keTogdGhpcy5yZWZzLmJvZHksXG4gICAgICAgICAgICAneC1zY3JvbGwtdHJhY2snOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLXRyYWNrJ10sXG4gICAgICAgICAgICAneC1zY3JvbGwtaGFuZGxlJzogdGhpcy5yZWZzWyd4LXNjcm9sbC1oYW5kbGUnXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneS1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd5LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3ktc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgYXJpYTogdGhpcy5yZWZzLmFyaWEsXG5cbiAgICAgICAgICAgIGFjdGl2ZVJvd0NoYW5nZWRGdW5jOiB0aGlzLnByb3BzLm9uQWN0aXZlUm93Q2hhbmdlZCxcbiAgICAgICAgICAgIGFsbG93U2Nyb2xsUHJvcGFnYXRpb246IHRoaXMucHJvcHMuYWxsb3dTY3JvbGxQcm9wYWdhdGlvbixcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgICAgIGhlYWRlckNvbHVtbkNsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkhlYWRlckNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIHJvd0NsaWNrRnVuYzogdGhpcy5wcm9wcy5vblJvd0ludGVyYWN0LFxuICAgICAgICAgICAgY2VsbENsaWNrRnVuYzogdGhpcy5wcm9wcy5vbkNlbGxJbnRlcmFjdCxcbiAgICAgICAgICAgIG9uQ29sdW1uUmVzaXplOiB0aGlzLnByb3BzLm9uQ29sdW1uUmVzaXplLFxuICAgICAgICAgICAgZ2V0Um93OiB0aGlzLnByb3BzLmdldFJvdyxcbiAgICAgICAgICAgIHByZXNlcnZlU2Nyb2xsU3RhdGU6IHRoaXMucHJvcHMucHJlc2VydmVTY3JvbGxTdGF0ZSxcbiAgICAgICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IHRoaXMucHJvcHMudGhyb3R0bGVJbnRlcnZhbCxcbiAgICAgICAgICAgIHRvdGFsUm93czogdGhpcy5wcm9wcy50b3RhbFJvd3MsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgVGFibGUodGhpcy5nZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHRoaXMucHJvcHMuanVtcFRvUm93SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudGFibGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgICAgIGNvbnN0IHtwcm9wc30gPSB0aGlzO1xuICAgICAgICBjb25zdCBjaGFuZ2VkUHJvcHMgPSBbXTtcbiAgICAgICAgbGV0IGtleTtcblxuICAgICAgICAvKiBiaWRpcmVjdGlvbmFsIGtleSBjaGFuZ2UgZGV0ZWN0aW9uICovXG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldICE9PSBwcmV2UHJvcHNba2V5XSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGtleSBpbiBwcmV2UHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcmV2UHJvcHNba2V5XSAhPT0gcHJvcHNba2V5XSAmJiBjaGFuZ2VkUHJvcHMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5pbmRleE9mKCdqdW1wVG9Sb3dJbmRleCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8qIGp1bXBUb1Jvd0luZGV4IGFscmVhZHkgdHJpZ2dlcnMgYSByZWdlbmVyYXRpb24sIGp1c3QgYXZvaWRpbmcgcnVubmluZyBpdCB0d2ljZSAqL1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYmxlLmp1bXBUb1Jvd0luZGV4KHByb3BzLmp1bXBUb1Jvd0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlZFByb3BzWzBdID09PSAnY29sdW1ucycpIHtcbiAgICAgICAgICAgICAgICAvKiBkaWQgdGhpbmdzIG1hdGVyaWFsbHkgY2hhbmdlLCBvciBqdXN0IHVwZGF0aW5nIGEgY29sdW1uIHdpZHRoPyAqL1xuICAgICAgICAgICAgICAgIGlmIChkaWRDb2x1bW5zQ2hhbmdlKHByb3BzLmNvbHVtbnMsIHByZXZQcm9wcy5jb2x1bW5zLCB0aGlzLnRhYmxlLmNvbHVtbnMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlLnJlZ2VuZXJhdGUodGhpcy5nZXRTdWJ2aWV3Q29uZmlndXJhdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclhTY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0neC1zY3JvbGwtdHJhY2snIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtdHJhY2snPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC1oYW5kbGUnIGNsYXNzTmFtZT0ndWktdGFibGUteC1zY3JvbGwtaGFuZGxlJyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyWVNjcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSd5LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS15LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJBcmlhKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J2FyaWEnIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5vZmZzY3JlZW5DbGFzcyB8fCAndWktb2Zmc2NyZWVuJ30gYXJpYS1saXZlPSdwb2xpdGUnIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJVGFibGUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsndWktdGFibGUtd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgZGF0YS1zZXQtaWRlbnRpZmllcj17dGhpcy5wcm9wcy5pZGVudGlmaWVyfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0naGVhZGVyJyBjbGFzc05hbWU9J3VpLXRhYmxlLWhlYWRlcicgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nYm9keScgY2xhc3NOYW1lPSd1aS10YWJsZS1ib2R5JyAvPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWFNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcllTY3JvbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=