'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require('../UISegmentedControl');

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIList = require('../UIList');

var _UIList2 = _interopRequireDefault(_UIList);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPaginatedView
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIPaginatedView = function (_UIView) {
    _inherits(UIPaginatedView, _UIView);

    function UIPaginatedView() {
        _classCallCheck(this, UIPaginatedView);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UIPaginatedView).apply(this, arguments));
    }

    _createClass(UIPaginatedView, [{
        key: 'initialState',
        value: function initialState() {
            return {
                currentPage: this.props.pagerPosition,
                numberOfPages: Math.ceil(this.props.totalItems / this.props.numItemsPerPage),
                numItemsPerPage: this.props.numItemsPerPage,
                numPageToggles: this.props.numPageToggles,
                totalItems: this.props.totalItems,
                items: [{ data: this.props.getItem(0) }],
                shownItems: [{ data: this.props.getItem(0) }]
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(oldProps, oldState) {
            if (oldState.currentPage !== this.state.currentPage) {
                this.refs.itemList.refs.item_0.focus();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ shownItems: this.generateItems(this.state.currentPage) });
        }
    }, {
        key: 'createPageButtonOptions',
        value: function createPageButtonOptions() {
            var options = [];
            var numberOfPages = this.state.numberOfPages;
            var currentPage = this.state.currentPage;
            var numPageToggles = this.props.numPageToggles;
            var startPage = currentPage - (currentPage - 1) % numPageToggles;
            var endPage = Math.min(startPage + numPageToggles - 1, numberOfPages);

            if (this.props.showJumpToFirst) {
                options.push({
                    selected: false,
                    content: this.props.jumpToFirstControlText,
                    value: UIPaginatedView.controlValues.FIRST,
                    disabled: this.state.currentPage === 1,
                    className: 'ui-paginated-view-controls-first'
                });
            }

            options.push({
                selected: false,
                content: this.props.previousPageControlText,
                value: UIPaginatedView.controlValues.PREVIOUS,
                disabled: this.state.currentPage === 1,
                className: 'ui-paginated-view-controls-previous'
            });

            for (var i = startPage; i <= endPage; i++) {
                options.push({
                    selected: i === this.state.currentPage,
                    content: i,
                    value: i
                });
            }

            options.push({
                selected: false,
                content: this.props.nextPageControlText,
                value: UIPaginatedView.controlValues.NEXT,
                disabled: this.state.currentPage === this.state.numberOfPages,
                className: 'ui-paginated-view-controls-next'
            });

            if (this.props.showJumpToLast) {
                options.push({
                    selected: false,
                    content: this.props.jumpToLastControlText,
                    value: UIPaginatedView.controlValues.LAST,
                    disabled: this.state.currentPage === this.state.numberOfPages,
                    className: 'ui-paginated-view-controls-last'
                });
            }

            return options;
        }
    }, {
        key: 'currentPage',
        value: function currentPage() {
            return this.state.currentPage;
        }
    }, {
        key: 'generateItems',
        value: function generateItems(currentPage) {
            var generatedItems = [];
            var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
            var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

            for (var i = firstItemIndex; i <= lastItemIndex; i++) {
                generatedItems.push({ data: this.props.getItem(i) });
            }

            return generatedItems;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(value) {
            var pageNumber = undefined;

            switch (value) {
                case UIPaginatedView.controlValues.FIRST:
                    pageNumber = 1;
                    break;
                case UIPaginatedView.controlValues.PREVIOUS:
                    pageNumber = this.state.currentPage - 1;
                    break;
                case UIPaginatedView.controlValues.NEXT:
                    pageNumber = this.state.currentPage + 1;
                    break;
                case UIPaginatedView.controlValues.LAST:
                    pageNumber = this.state.numberOfPages;
                    break;
                default:
                    pageNumber = parseInt(value, 10);
            }

            this.setState({
                currentPage: pageNumber,
                shownItems: this.generateItems(pageNumber)
            });
        }
    }, {
        key: 'itemsToArray',
        value: function itemsToArray() {
            var items = [];

            this.state.shownItems.map(function (item, index) {
                items.push(_react2.default.createElement(_item2.default, {
                    key: index,
                    data: item.data,
                    even: index % 2 === 0 }));
            });

            return items;
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            return _react2.default.createElement(_UIList2.default, _extends({}, this.props.listWrapperProps, {
                ref: 'itemList',
                className: (0, _classnames2.default)(_defineProperty({
                    'ui-paginated-view-item-list': true
                }, this.props.listWrapperProps.className, !!this.props.listWrapperProps.className)),
                items: this.itemsToArray() }));
        }
    }, {
        key: 'renderControls',
        value: function renderControls(position) {
            var _cx2;

            var positionLowerCase = position.toLowerCase();

            return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, this.props.toggleWrapperProps, {
                ref: 'segmentedControl' + (positionLowerCase[0].toUpperCase() + positionLowerCase.slice(1)),
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-paginated-view-controls': true
                }, _defineProperty(_cx2, 'ui-paginated-view-controls-' + positionLowerCase, true), _defineProperty(_cx2, this.props.toggleWrapperProps.className, !!this.props.toggleWrapperProps.className), _cx2)),
                options: this.createPageButtonOptions(),
                onOptionSelected: this.handleClick.bind(this) }));
        }
    }, {
        key: 'renderView',
        value: function renderView() {
            return _react2.default.createElement(
                'div',
                {
                    ref: 'paginatedView',
                    className: 'ui-paginated-view' },
                this.props.position === UIPaginatedView.position.ABOVE || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.ABOVE) : _noop2.default,
                this.renderItems(),
                this.props.position === UIPaginatedView.position.BELOW || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.BELOW) : _noop2.default
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, {
                    ref: 'wrapper',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-paginated-view-wrapper': true
                    }, this.props.className, !!this.props.className)) }),
                this.renderView()
            );
        }
    }]);

    return UIPaginatedView;
}(_UIView3.default);

UIPaginatedView.controlValues = {
    FIRST: 'FIRST',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    LAST: 'LAST'
};

UIPaginatedView.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BOTH: 'BOTH'
};

UIPaginatedView.propTypes = {
    getItem: _react2.default.PropTypes.func,
    jumpToFirstControlText: _react2.default.PropTypes.string,
    jumpToLastControlText: _react2.default.PropTypes.string,
    listWrapperProps: _react2.default.PropTypes.object,
    nextPageControlText: _react2.default.PropTypes.string,
    numItemsPerPage: function validateNumItemsPerPage(props) {
        if (!Number.isInteger(props.numItemsPerPage)) {
            return new Error('`numItemsPerPage` must be an integer.');
        }

        if (props.numItemsPerPage < 1 || props.numItemsPerPage > props.totalItems) {
            return new Error('`numItemsPerPage` must be between 1 and ' + props.totalItems + '.');
        }
    },
    numPageToggles: _react2.default.PropTypes.number,
    pagerPosition: function validatePagerPosition(props) {
        if (!Number.isInteger(props.pagerPosition)) {
            return new Error('`pagerPosition` must be an integer.');
        }

        var numberOfPages = Math.ceil(props.totalItems / props.numItemsPerPage);

        if (props.pagerPosition < 1 || props.pagerPosition > numberOfPages) {
            return new Error('`pagerPosition` must be between 1 and ' + numberOfPages + '.');
        }
    },
    position: _react2.default.PropTypes.oneOf(Object.keys(UIPaginatedView.position)),
    previousPageControlText: _react2.default.PropTypes.string,
    showJumpToFirst: _react2.default.PropTypes.bool,
    showJumpToLast: _react2.default.PropTypes.bool,
    toggleWrapperProps: _react2.default.PropTypes.object,
    totalItems: _react2.default.PropTypes.number.isRequired
};

UIPaginatedView.defaultProps = {
    options: [],
    getItem: _noop2.default,
    jumpToFirstControlText: '« First',
    jumpToLastControlText: 'Last »',
    listWrapperProps: {},
    nextPageControlText: 'Next ›',
    numItemsPerPage: 10,
    numPageToggles: 5,
    pagerPosition: 1,
    position: UIPaginatedView.position.ABOVE,
    previousPageControlText: '‹ Previous',
    showJumpToFirst: true,
    showJumpToLast: true,
    toggleWrapperProps: {}
};

exports.default = UIPaginatedView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGVkVmlldy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhTSxlQUFlO2NBQWYsZUFBZTs7YUFBZixlQUFlOzhCQUFmLGVBQWU7O3NFQUFmLGVBQWU7OztpQkFBZixlQUFlOzt1Q0FDRjtBQUNYLG1CQUFPO0FBQ0gsMkJBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7QUFDckMsNkJBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO0FBQzVFLCtCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO0FBQzNDLDhCQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjO0FBQ3pDLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ2pDLHFCQUFLLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0FBQ3RDLDBCQUFVLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQzlDLENBQUM7U0FDTDs7OzJDQUVrQixRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ25DLGdCQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDakQsb0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDMUM7U0FDSjs7OzRDQUVtQjtBQUNoQixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJ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UTtBQUMvQixvQkFBZ0IsRUFBRSxFQUFFO0FBQ3BCLHVCQUFtQixFQUFFLFFBQVE7QUFDN0IsbUJBQWUsRUFBRSxFQUFFO0FBQ25CLGtCQUFjLEVBQUUsQ0FBQztBQUNqQixpQkFBYSxFQUFFLENBQUM7QUFDaEIsWUFBUSxFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUN4QywyQkFBdUIsRUFBRSxZQUFZO0FBQ3JDLG1CQUFlLEVBQUUsSUFBSTtBQUNyQixrQkFBYyxFQUFFLElBQUk7QUFDcEIsc0JBQWtCLEVBQUUsRUFBRTtDQUN6QixDQUFDOztrQkFFYSxlQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGNvbnRyb2xsZXIgdmlldyBmb3IgbWFuYWdpbmcgdGhlIGFnZ3JlZ2F0ZSBzdGF0ZSBvZiBtdWx0aXBsZSwgcmVsYXRlZCByYWRpby1zdHlsZSBidXR0b25zLlxuICogQGNsYXNzIFVJUGFnaW5hdGVkVmlld1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlMaXN0IGZyb20gJy4uL1VJTGlzdCc7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlQYWdpbmF0ZWRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5wYWdlclBvc2l0aW9uLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBudW1QYWdlVG9nZ2xlczogdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcyxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IHRoaXMucHJvcHMudG90YWxJdGVtcyxcbiAgICAgICAgICAgIGl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgICAgICAgICAgc2hvd25JdGVtczogW3tkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oMCl9XSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKSB7XG4gICAgICAgIGlmIChvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZWZzLml0ZW1MaXN0LnJlZnMuaXRlbV8wLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5zdGF0ZS50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKGkpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sodmFsdWUpIHtcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXI7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUzpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5MQVNUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYWdlTnVtYmVyLFxuICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHBhZ2VOdW1iZXIpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdGVtc1RvQXJyYXkoKSB7XG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuc2hvd25JdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfSAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJTGlzdFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLml0ZW1zVG9BcnJheSgpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRyb2xzKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTG93ZXJDYXNlID0gcG9zaXRpb24udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9eydzZWdtZW50ZWRDb250cm9sJyArIChwb3NpdGlvbkxvd2VyQ2FzZVswXS50b1VwcGVyQ2FzZSgpICsgcG9zaXRpb25Mb3dlckNhc2Uuc2xpY2UoMSkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLScgKyBwb3NpdGlvbkxvd2VyQ2FzZV06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLmNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclZpZXcoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPSdwYWdpbmF0ZWRWaWV3J1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktcGFnaW5hdGVkLXZpZXcnPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRVxuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgKCAgIHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPV1xuICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJPVEgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJDb250cm9scyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1cpXG4gICAgICAgICAgICAgICAgICAgIDogbm9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVmlldygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5VSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcyA9IHtcbiAgICBGSVJTVDogJ0ZJUlNUJyxcbiAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICBORVhUOiAnTkVYVCcsXG4gICAgTEFTVDogJ0xBU1QnLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uID0ge1xuICAgIEFCT1ZFOiAnQUJPVkUnLFxuICAgIEJFTE9XOiAnQkVMT1cnLFxuICAgIEJPVEg6ICdCT1RIJyxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5wcm9wVHlwZXMgPSB7XG4gICAgZ2V0SXRlbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAganVtcFRvRmlyc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGlzdFdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuZXh0UGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLm51bUl0ZW1zUGVyUGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5udW1JdGVtc1BlclBhZ2UgPCAxIHx8IHByb3BzLm51bUl0ZW1zUGVyUGFnZSA+IHByb3BzLnRvdGFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BudW1JdGVtc1BlclBhZ2VgIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgcHJvcHMudG90YWxJdGVtcyArICcuJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG51bVBhZ2VUb2dnbGVzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhZ2VyUG9zaXRpb246IGZ1bmN0aW9uIHZhbGlkYXRlUGFnZXJQb3NpdGlvbihwcm9wcykge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMucGFnZXJQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2BwYWdlclBvc2l0aW9uYCBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHByb3BzLnRvdGFsSXRlbXMgLyBwcm9wcy5udW1JdGVtc1BlclBhZ2UpO1xuXG4gICAgICAgIGlmIChwcm9wcy5wYWdlclBvc2l0aW9uIDwgMSB8fCBwcm9wcy5wYWdlclBvc2l0aW9uID4gbnVtYmVyT2ZQYWdlcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uKSksXG4gICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd0p1bXBUb0ZpcnN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SnVtcFRvTGFzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9nZ2xlV3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHRvdGFsSXRlbXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgZ2V0SXRlbTogbm9vcCxcbiAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiAnwqsgRmlyc3QnLFxuICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogJ0xhc3QgwrsnLFxuICAgIGxpc3RXcmFwcGVyUHJvcHM6IHt9LFxuICAgIG5leHRQYWdlQ29udHJvbFRleHQ6ICdOZXh0IOKAuicsXG4gICAgbnVtSXRlbXNQZXJQYWdlOiAxMCxcbiAgICBudW1QYWdlVG9nZ2xlczogNSxcbiAgICBwYWdlclBvc2l0aW9uOiAxLFxuICAgIHBvc2l0aW9uOiBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkUsXG4gICAgcHJldmlvdXNQYWdlQ29udHJvbFRleHQ6ICfigLkgUHJldmlvdXMnLFxuICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICBzaG93SnVtcFRvTGFzdDogdHJ1ZSxcbiAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlQYWdpbmF0ZWRWaWV3O1xuIl19