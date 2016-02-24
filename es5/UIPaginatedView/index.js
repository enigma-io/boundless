'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _UISegmentedControl = require('../UISegmentedControl');

var _UISegmentedControl2 = _interopRequireDefault(_UISegmentedControl);

var _UIArrowKeyNavigation = require('../UIArrowKeyNavigation');

var _UIArrowKeyNavigation2 = _interopRequireDefault(_UIArrowKeyNavigation);

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
                shownItems: [{ data: this.props.getItem(0) }]
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(oldProps, oldState) {
            if (oldState.currentPage !== this.state.currentPage) {
                (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                shownItems: this.generateItems(this.state.currentPage)
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.identifier !== this.props.identifier) {
                this.setState({
                    currentPage: 1,
                    shownItems: this.generateItems(1, nextProps.getItem)
                });
            }
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
            var getItem = arguments.length <= 1 || arguments[1] === undefined ? this.props.getItem : arguments[1];

            var generatedItems = [];
            var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
            var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

            for (var i = firstItemIndex; i <= lastItemIndex; i++) {
                generatedItems.push({ data: getItem(i) });
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
        key: 'renderItems',
        value: function renderItems() {
            return _react2.default.createElement(
                _UIArrowKeyNavigation2.default,
                _extends({}, this.props.listWrapperProps, {
                    ref: 'itemList',
                    className: (0, _classnames2.default)(_defineProperty({
                        'ui-paginated-view-item-list': true
                    }, this.props.listWrapperProps.className, !!this.props.listWrapperProps.className)) }),
                this.state.shownItems.map(function (item, index) {
                    return _react2.default.createElement(_item2.default, { ref: 'item_' + index,
                        key: index,
                        data: item.data,
                        even: index % 2 === 0 });
                })
            );
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
    identifier: _react2.default.PropTypes.string.isRequired,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGVkVmlldy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNNLGVBQWU7Y0FBZixlQUFlOzthQUFmLGVBQWU7OEJBQWYsZUFBZTs7c0VBQWYsZUFBZTs7O2lCQUFmLGVBQWU7O3VDQUNGO0FBQ1gsbUJBQU87QUFDSCwyQkFBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtBQUNyQyw2QkFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDNUUsK0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDM0MsOEJBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWM7QUFDekMsMEJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDakMsMEJBQVUsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDOUMsQ0FBQztTQUNMOzs7MkNBRWtCLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDbkMsZ0JBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUNqRCw4QkF0QkosV0FBVyxFQXNCSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3pDO1NBQ0o7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksQ0FBQyxRQUFRLENBQUM7QUFDViwwQkFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDekQsQ0FBQyxDQUFDO1NBQ047OztrREFFeUIsU0FBUyxF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QUFDOztBQUVGLGVBQWUsQ0FBQyxZQUFZLEdBQUc7QUFDM0IsV0FBTyxFQUFFLEVBQUU7QUFDWCxXQUFPLGdCQUFNO0FBQ2IsMEJBQXNCLEVBQUUsU0FBUztBQUNqQyx5QkFBcUIsRUFBRSxRQUFRO0FBQy9CLG9CQUFnQixFQUFFLEVBQUU7QUFDcEIsdUJBQW1CLEVBQUUsUUFBUTtBQUM3QixtQkFBZSxFQUFFLEVBQUU7QUFDbkIsa0JBQWMsRUFBRSxDQUFDO0FBQ2pCLGlCQUFhLEVBQUUsQ0FBQztBQUNoQixZQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLO0FBQ3hDLDJCQUF1QixFQUFFLFlBQVk7QUFDckMsbUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGtCQUFjLEVBQUUsSUFBSTtBQUNwQixzQkFBa0IsRUFBRSxFQUFFO0NBQ3pCLENBQUM7O2tCQUVhLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0ZWRWaWV3XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmNsYXNzIFVJUGFnaW5hdGVkVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgaW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMucGFnZXJQb3NpdGlvbixcbiAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgICAgICBudW1JdGVtc1BlclBhZ2U6IHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlLFxuICAgICAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXMsXG4gICAgICAgICAgICB0b3RhbEl0ZW1zOiB0aGlzLnByb3BzLnRvdGFsSXRlbXMsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUpIHtcbiAgICAgICAgaWYgKG9sZFN0YXRlLmN1cnJlbnRQYWdlICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBmaW5kRE9NTm9kZSh0aGlzLnJlZnMuaXRlbV8wKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlkZW50aWZpZXIgIT09IHRoaXMucHJvcHMuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgc2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKDEsIG5leHRQcm9wcy5nZXRJdGVtKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoY3VycmVudFBhZ2UsIGdldEl0ZW0gPSB0aGlzLnByb3BzLmdldEl0ZW0pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5zdGF0ZS50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKHZhbHVlKSB7XG4gICAgICAgIGxldCBwYWdlTnVtYmVyO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVM6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogcGFnZU51bWJlcixcbiAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyhwYWdlTnVtYmVyKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb24gey4uLnRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3duSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW0gcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyQ2FzZSA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnc2VnbWVudGVkQ29udHJvbCcgKyAocG9zaXRpb25Mb3dlckNhc2VbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXJDYXNlLnNsaWNlKDEpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgWyd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy0nICsgcG9zaXRpb25Mb3dlckNhc2VdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJWaWV3KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj0ncGFnaW5hdGVkVmlldydcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3VpLXBhZ2luYXRlZC12aWV3Jz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQUJPVkVcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICggICB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQkVMT1dcbiAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucG9zaXRpb24gPT09IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CT1RIKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyQ29udHJvbHMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XKVxuICAgICAgICAgICAgICAgICAgICA6IG5vb3BcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMgPSB7XG4gICAgRklSU1Q6ICdGSVJTVCcsXG4gICAgUFJFVklPVVM6ICdQUkVWSU9VUycsXG4gICAgTkVYVDogJ05FWFQnLFxuICAgIExBU1Q6ICdMQVNUJyxcbn07XG5cblVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbiA9IHtcbiAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICBCRUxPVzogJ0JFTE9XJyxcbiAgICBCT1RIOiAnQk9USCcsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcucHJvcFR5cGVzID0ge1xuICAgIGdldEl0ZW06IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGlkZW50aWZpZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsaXN0V3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEgfHwgcHJvcHMubnVtSXRlbXNQZXJQYWdlID4gcHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBwcm9wcy50b3RhbEl0ZW1zICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbnVtUGFnZVRvZ2dsZXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcGFnZXJQb3NpdGlvbjogZnVuY3Rpb24gdmFsaWRhdGVQYWdlclBvc2l0aW9uKHByb3BzKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5wYWdlclBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24pKSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93SnVtcFRvRmlyc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNob3dKdW1wVG9MYXN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdG90YWxJdGVtczogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBnZXRJdGVtOiBub29wLFxuICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6ICfCqyBGaXJzdCcsXG4gICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiAnTGFzdCDCuycsXG4gICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgbmV4dFBhZ2VDb250cm9sVGV4dDogJ05leHQg4oC6JyxcbiAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgIHBhZ2VyUG9zaXRpb246IDEsXG4gICAgcG9zaXRpb246IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBhZ2luYXRlZFZpZXc7XG4iXX0=