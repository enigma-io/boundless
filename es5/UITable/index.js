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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVBBOzs7OztBQVNBLFNBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsV0FBMUMsRUFBdUQsb0JBQXZELEVBQTZFO0FBQ3pFOzs7Ozs7QUFNQSxRQUFJLGVBQWUsTUFBZixLQUEwQixZQUFZLE1BQTFDLEVBQWtEO0FBQzlDLGVBQU8sSUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQU8sZUFBZSxJQUFmLENBQW9CLFVBQUMsTUFBRCxFQUFTLEtBQVQsRUFBbUI7QUFDMUMsZUFBVSxPQUFPLE9BQVAsS0FBbUIsWUFBWSxLQUFaLEVBQW1CLE9BQXRDLElBQ0EsT0FBTyxLQUFQLEtBQWlCLFlBQVksS0FBWixFQUFtQixLQURwQyxJQUVBLE9BQU8sU0FBUCxLQUFxQixZQUFZLEtBQVosRUFBbUIsU0FGeEMsSUFHQyxPQUFPLEtBQVAsS0FBaUIsU0FBakIsSUFBOEIsT0FBTyxLQUFQLEtBQWlCLHFCQUFxQixLQUFyQixFQUE0QixLQUh0RjtBQUlILEtBTE0sQ0FBUDtBQU1IOztBQUVELElBQU0sa0JBQWtCLGlCQUFVLEtBQVYsQ0FBZ0I7QUFDcEMsU0FBSyxpQkFBVSxNQURxQjtBQUVwQyxnQkFBWSxpQkFBVTtBQUZjLENBQWhCLENBQXhCOztJQUtxQixPOzs7Ozs7Ozs7c0JBd0NqQix1QixzQ0FBMEI7QUFDdEIsZUFBTztBQUNILHFCQUFTLEtBQUssSUFBTCxDQUFVLE9BRGhCO0FBRUgsb0JBQVEsS0FBSyxJQUFMLENBQVUsTUFGZjtBQUdILGtCQUFNLEtBQUssSUFBTCxDQUFVLElBSGI7QUFJSCw4QkFBa0IsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FKZjtBQUtILCtCQUFtQixLQUFLLElBQUwsQ0FBVSxpQkFBVixDQUxoQjtBQU1ILDhCQUFrQixLQUFLLElBQUwsQ0FBVSxnQkFBVixDQU5mO0FB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QWUsaUJBQVUsSUF4QlY7QUF5QmYseUJBQXFCLGlCQUFVLElBekJoQjtBQTBCZixzQkFBa0IsaUJBQVUsTUExQmI7QUEyQmYsZUFBVyxpQkFBVTtBQTNCTixDO0FBREYsTyxDQStCVixZLEdBQWUsT0FBTyxJQUFQLENBQVksUUFBUSxTQUFwQixDO0FBL0JMLE8sQ0FpQ1YsWSxHQUFlO0FBQ2xCLDRCQUF3QixLQUROO0FBRWxCLGVBQVcsRUFGTztBQUdsQixvQkFBZ0IsY0FIRTtBQUlsQix5QkFBcUI7QUFKSCxDO2tCQWpDTCxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZWFjdCB3cmFwcGVyIGZvciBUYWJsZS5cbiAqIEBjbGFzcyBVSVRhYmxlXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnZW5pZ21hLXRhYmxlJztcblxuZnVuY3Rpb24gZGlkQ29sdW1uc0NoYW5nZShjdXJyZW50Q29sdW1ucywgcHJldkNvbHVtbnMsIHRhYmxlSW50ZXJuYWxDb2x1bW5zKSB7XG4gICAgLypcbiAgICAgICAgMS4gdGhlcmUgc2hvdWxkIGJlIHRoZSBzYW1lIG51bWJlciBvZiBjb2x1bW5zXG4gICAgICAgIDIuIHRoZSBjb2x1bW5zIHNob3VsZCBleGFjdGx5IG1hdGNoIGluIHRoZSBwcm9wZXIgb3JkZXJcbiAgICAgICAgMy4gZWFjaCBjb2x1bW4gcHJvcGVydHkgc2hvdWxkIGJlIGV4YWN0bHkgdGhlIHNhbWVcbiAgICAgKi9cblxuICAgIGlmIChjdXJyZW50Q29sdW1ucy5sZW5ndGggIT09IHByZXZDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkaWQgdGhlIGNvbHVtbiBkZXNjcmlwdG9ycyBjaGFuZ2UgaW4gc29tZSB3YXksIG9yIGRpZCB0aGUgd2lkdGggY2hhbmdlP1xuICAgIC8vIHRoaXMgd2lsbCBhbHNvIGNhdGNoIGlmIHRoZSBvcmRlciBvZiB0aGUgY29sdW1ucyBjaGFuZ2VkIHdoZW4gY29tcGFyaW5nXG4gICAgLy8gdGhlIG1hcHBpbmcgcHJvcGVydHlcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnMuc29tZSgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gICAgY29sdW1uLm1hcHBpbmcgIT09IHByZXZDb2x1bW5zW2luZGV4XS5tYXBwaW5nXG4gICAgICAgICAgICAgICB8fCBjb2x1bW4udGl0bGUgIT09IHByZXZDb2x1bW5zW2luZGV4XS50aXRsZVxuICAgICAgICAgICAgICAgfHwgY29sdW1uLnJlc2l6YWJsZSAhPT0gcHJldkNvbHVtbnNbaW5kZXhdLnJlc2l6YWJsZVxuICAgICAgICAgICAgICAgfHwgKGNvbHVtbi53aWR0aCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbi53aWR0aCAhPT0gdGFibGVJbnRlcm5hbENvbHVtbnNbaW5kZXhdLndpZHRoKTtcbiAgICB9KTtcbn1cblxuY29uc3QgY29sdW1uQ2hpbGRTcGVjID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0YWc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXR0cmlidXRlczogUHJvcFR5cGVzLm9iamVjdCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRhYmxlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5DaGlsZFNwZWMsXG4gICAgICAgICAgICAgICAgICAgIFByb3BUeXBlcy5hcnJheU9mKGNvbHVtbkNoaWxkU3BlYyksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbWFwcGluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgICAgICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgZ2V0Um93OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaWRlbnRpZmllcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAganVtcFRvUm93SW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIG9mZnNjcmVlbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvbkNlbGxJbnRlcmFjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uQ29sdW1uUmVzaXplOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IZWFkZXJDZWxsSW50ZXJhY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblJvd0ludGVyYWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRocm90dGxlSW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvdGFsUm93czogUHJvcFR5cGVzLm51bWJlcixcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlUYWJsZS5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBhbGxvd1Njcm9sbFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgb2Zmc2NyZWVuQ2xhc3M6ICd1aS1vZmZzY3JlZW4nLFxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbFN0YXRlOiB0cnVlLFxuICAgIH1cblxuICAgIGdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd3JhcHBlcjogdGhpcy5yZWZzLndyYXBwZXIsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMucmVmcy5oZWFkZXIsXG4gICAgICAgICAgICBib2R5OiB0aGlzLnJlZnMuYm9keSxcbiAgICAgICAgICAgICd4LXNjcm9sbC10cmFjayc6IHRoaXMucmVmc1sneC1zY3JvbGwtdHJhY2snXSxcbiAgICAgICAgICAgICd4LXNjcm9sbC1oYW5kbGUnOiB0aGlzLnJlZnNbJ3gtc2Nyb2xsLWhhbmRsZSddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLXRyYWNrJzogdGhpcy5yZWZzWyd5LXNjcm9sbC10cmFjayddLFxuICAgICAgICAgICAgJ3ktc2Nyb2xsLWhhbmRsZSc6IHRoaXMucmVmc1sneS1zY3JvbGwtaGFuZGxlJ10sXG4gICAgICAgICAgICBhcmlhOiB0aGlzLnJlZnMuYXJpYSxcblxuICAgICAgICAgICAgYWxsb3dTY3JvbGxQcm9wYWdhdGlvbjogdGhpcy5wcm9wcy5hbGxvd1Njcm9sbFByb3BhZ2F0aW9uLFxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgaGVhZGVyQ29sdW1uQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uSGVhZGVyQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgcm93Q2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uUm93SW50ZXJhY3QsXG4gICAgICAgICAgICBjZWxsQ2xpY2tGdW5jOiB0aGlzLnByb3BzLm9uQ2VsbEludGVyYWN0LFxuICAgICAgICAgICAgb25Db2x1bW5SZXNpemU6IHRoaXMucHJvcHMub25Db2x1bW5SZXNpemUsXG4gICAgICAgICAgICBnZXRSb3c6IHRoaXMucHJvcHMuZ2V0Um93LFxuICAgICAgICAgICAgcHJlc2VydmVTY3JvbGxTdGF0ZTogdGhpcy5wcm9wcy5wcmVzZXJ2ZVNjcm9sbFN0YXRlLFxuICAgICAgICAgICAgdGhyb3R0bGVJbnRlcnZhbDogdGhpcy5wcm9wcy50aHJvdHRsZUludGVydmFsLFxuICAgICAgICAgICAgdG90YWxSb3dzOiB0aGlzLnByb3BzLnRvdGFsUm93cyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJsZSh0aGlzLmdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmp1bXBUb1Jvd0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgodGhpcy5wcm9wcy5qdW1wVG9Sb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy50YWJsZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRQcm9wcyA9IFtdO1xuICAgICAgICBsZXQga2V5O1xuXG4gICAgICAgIC8qIGJpZGlyZWN0aW9uYWwga2V5IGNoYW5nZSBkZXRlY3Rpb24gKi9cblxuICAgICAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gIT09IHByZXZQcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZFByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoa2V5IGluIHByZXZQcm9wcykge1xuICAgICAgICAgICAgaWYgKHByZXZQcm9wc1trZXldICE9PSBwcm9wc1trZXldICYmIGNoYW5nZWRQcm9wcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZFByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VkUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmluZGV4T2YoJ2p1bXBUb1Jvd0luZGV4JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLyoganVtcFRvUm93SW5kZXggYWxyZWFkeSB0cmlnZ2VycyBhIHJlZ2VuZXJhdGlvbiwganVzdCBhdm9pZGluZyBydW5uaW5nIGl0IHR3aWNlICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFibGUuanVtcFRvUm93SW5kZXgocHJvcHMuanVtcFRvUm93SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VkUHJvcHNbMF0gPT09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgIC8qIGRpZCB0aGluZ3MgbWF0ZXJpYWxseSBjaGFuZ2UsIG9yIGp1c3QgdXBkYXRpbmcgYSBjb2x1bW4gd2lkdGg/ICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZENvbHVtbnNDaGFuZ2UocHJvcHMuY29sdW1ucywgcHJldlByb3BzLmNvbHVtbnMsIHRoaXMudGFibGUuY29sdW1ucykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGUucmVnZW5lcmF0ZSh0aGlzLmdldFN1YnZpZXdDb25maWd1cmF0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyWFNjcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSd4LXNjcm9sbC10cmFjaycgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC10cmFjayc+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9J3gtc2Nyb2xsLWhhbmRsZScgY2xhc3NOYW1lPSd1aS10YWJsZS14LXNjcm9sbC1oYW5kbGUnIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJZU2Nyb2xsKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3ktc2Nyb2xsLXRyYWNrJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLXRyYWNrJz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0neS1zY3JvbGwtaGFuZGxlJyBjbGFzc05hbWU9J3VpLXRhYmxlLXktc2Nyb2xsLWhhbmRsZScgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckFyaWEoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0nYXJpYScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLm9mZnNjcmVlbkNsYXNzIHx8ICd1aS1vZmZzY3JlZW4nfSBhcmlhLWxpdmU9J3BvbGl0ZScgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlUYWJsZS5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyd1aS10YWJsZS13cmFwcGVyICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBkYXRhLXNldC1pZGVudGlmaWVyPXt0aGlzLnByb3BzLmlkZW50aWZpZXJ9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdoZWFkZXInIGNsYXNzTmFtZT0ndWktdGFibGUtaGVhZGVyJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdib2R5JyBjbGFzc05hbWU9J3VpLXRhYmxlLWJvZHknIC8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJYU2Nyb2xsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyWVNjcm9sbCgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWEoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==