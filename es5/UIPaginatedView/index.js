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
                items: [{ data: this.props.getItem(0) }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGVkVmlldy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNNLGVBQWU7Y0FBZixlQUFlOzthQUFmLGVBQWU7OEJBQWYsZUFBZTs7c0VBQWYsZUFBZTs7O2lCQUFmLGVBQWU7O3VDQUNGO0FBQ1gsbUJBQU87QUFDSCwyQkFBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtBQUNyQyw2QkFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDNUUsK0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDM0MsOEJBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWM7QUFDekMsMEJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDakMscUJBQUssRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7QUFDdEMsMEJBQVUsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDOUMsQ0FBQztTQUNMOzs7MkNBRWtCLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDbkMsZ0JBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUNqRCw4QkF2QkosV0FBVyxFQXVCSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3pDO1NBQ0o7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUs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aUJBQWEsRUFBRSxDQUFDO0FBQ2hCLFlBQVEsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDeEMsMkJBQXVCLEVBQUUsWUFBWTtBQUNyQyxtQkFBZSxFQUFFLElBQUk7QUFDckIsa0JBQWMsRUFBRSxJQUFJO0FBQ3BCLHNCQUFrQixFQUFFLEVBQUU7Q0FDekIsQ0FBQzs7a0JBRWEsZUFBZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBjb250cm9sbGVyIHZpZXcgZm9yIG1hbmFnaW5nIHRoZSBhZ2dyZWdhdGUgc3RhdGUgb2YgbXVsdGlwbGUsIHJlbGF0ZWQgcmFkaW8tc3R5bGUgYnV0dG9ucy5cbiAqIEBjbGFzcyBVSVBhZ2luYXRlZFZpZXdcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBVSVNlZ21lbnRlZENvbnRyb2wgZnJvbSAnLi4vVUlTZWdtZW50ZWRDb250cm9sJztcbmltcG9ydCBVSUFycm93S2V5TmF2aWdhdGlvbiBmcm9tICcuLi9VSUFycm93S2V5TmF2aWdhdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vVUlVdGlscy9ub29wJztcblxuY2xhc3MgVUlQYWdpbmF0ZWRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBpbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5wcm9wcy5wYWdlclBvc2l0aW9uLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogTWF0aC5jZWlsKHRoaXMucHJvcHMudG90YWxJdGVtcyAvIHRoaXMucHJvcHMubnVtSXRlbXNQZXJQYWdlKSxcbiAgICAgICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBudW1QYWdlVG9nZ2xlczogdGhpcy5wcm9wcy5udW1QYWdlVG9nZ2xlcyxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IHRoaXMucHJvcHMudG90YWxJdGVtcyxcbiAgICAgICAgICAgIGl0ZW1zOiBbe2RhdGE6IHRoaXMucHJvcHMuZ2V0SXRlbSgwKX1dLFxuICAgICAgICAgICAgc2hvd25JdGVtczogW3tkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oMCl9XSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKSB7XG4gICAgICAgIGlmIChvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgZmluZERPTU5vZGUodGhpcy5yZWZzLml0ZW1fMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXModGhpcy5zdGF0ZS5jdXJyZW50UGFnZSl9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcztcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBudW1QYWdlVG9nZ2xlcyA9IHRoaXMucHJvcHMubnVtUGFnZVRvZ2dsZXM7XG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gKChjdXJyZW50UGFnZSAtIDEpICUgbnVtUGFnZVRvZ2dsZXMpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbnVtUGFnZVRvZ2dsZXMgLSAxLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvRmlyc3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMuanVtcFRvRmlyc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IDEsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtZmlyc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5wcmV2aW91c1BhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5QUkVWSU9VUyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtcHJldmlvdXMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRQYWdlOyBpIDw9IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5uZXh0UGFnZUNvbnRyb2xUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLk5FWFQsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtbmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dKdW1wVG9MYXN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0xhc3RDb250cm9sVGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWxhc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJdGVtcyhjdXJyZW50UGFnZSkge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1JbmRleCA9IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSBNYXRoLm1pbih0aGlzLnN0YXRlLnRvdGFsSXRlbXMsIGZpcnN0SXRlbUluZGV4ICsgdGhpcy5zdGF0ZS5udW1JdGVtc1BlclBhZ2UpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJdGVtSW5kZXg7IGkgPD0gbGFzdEl0ZW1JbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRJdGVtcy5wdXNoKHtkYXRhOiB0aGlzLnByb3BzLmdldEl0ZW0oaSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayh2YWx1ZSkge1xuICAgICAgICBsZXQgcGFnZU51bWJlcjtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuRklSU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLlBSRVZJT1VTOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTkVYVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1Q6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5udW1iZXJPZlBhZ2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgICAgICBzaG93bkl0ZW1zOiB0aGlzLmdlbmVyYXRlSXRlbXMocGFnZU51bWJlciksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVJQXJyb3dLZXlOYXZpZ2F0aW9uIHsuLi50aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdpdGVtTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWl0ZW0tbGlzdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmxpc3RXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93bkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtIHJlZj17YGl0ZW1fJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW0uZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW49e2luZGV4ICUgMiA9PT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVUlBcnJvd0tleU5hdmlnYXRpb24+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udHJvbHMocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25Mb3dlckNhc2UgPSBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj17J3NlZ21lbnRlZENvbnRyb2wnICsgKHBvc2l0aW9uTG93ZXJDYXNlWzBdLnRvVXBwZXJDYXNlKCkgKyBwb3NpdGlvbkxvd2VyQ2FzZS5zbGljZSgxKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFsndWktcGFnaW5hdGVkLXZpZXctY29udHJvbHMtJyArIHBvc2l0aW9uTG93ZXJDYXNlXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlV3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuY3JlYXRlUGFnZUJ1dHRvbk9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgICBvbk9wdGlvblNlbGVjdGVkPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0ZWQtdmlldyc+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzID0ge1xuICAgIEZJUlNUOiAnRklSU1QnLFxuICAgIFBSRVZJT1VTOiAnUFJFVklPVVMnLFxuICAgIE5FWFQ6ICdORVhUJyxcbiAgICBMQVNUOiAnTEFTVCcsXG59O1xuXG5VSVBhZ2luYXRlZFZpZXcucG9zaXRpb24gPSB7XG4gICAgQUJPVkU6ICdBQk9WRScsXG4gICAgQkVMT1c6ICdCRUxPVycsXG4gICAgQk9USDogJ0JPVEgnLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LnByb3BUeXBlcyA9IHtcbiAgICBnZXRJdGVtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGp1bXBUb0xhc3RDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsaXN0V3JhcHBlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbnVtSXRlbXNQZXJQYWdlOiBmdW5jdGlvbiB2YWxpZGF0ZU51bUl0ZW1zUGVyUGFnZShwcm9wcykge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocHJvcHMubnVtSXRlbXNQZXJQYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm51bUl0ZW1zUGVyUGFnZSA8IDEgfHwgcHJvcHMubnVtSXRlbXNQZXJQYWdlID4gcHJvcHMudG90YWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBwcm9wcy50b3RhbEl0ZW1zICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbnVtUGFnZVRvZ2dsZXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcGFnZXJQb3NpdGlvbjogZnVuY3Rpb24gdmFsaWRhdGVQYWdlclBvc2l0aW9uKHByb3BzKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5wYWdlclBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwocHJvcHMudG90YWxJdGVtcyAvIHByb3BzLm51bUl0ZW1zUGVyUGFnZSk7XG5cbiAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdgcGFnZXJQb3NpdGlvbmAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBudW1iZXJPZlBhZ2VzICsgJy4nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24pKSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93SnVtcFRvRmlyc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNob3dKdW1wVG9MYXN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgdG90YWxJdGVtczogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuVUlQYWdpbmF0ZWRWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBvcHRpb25zOiBbXSxcbiAgICBnZXRJdGVtOiBub29wLFxuICAgIGp1bXBUb0ZpcnN0Q29udHJvbFRleHQ6ICfCqyBGaXJzdCcsXG4gICAganVtcFRvTGFzdENvbnRyb2xUZXh0OiAnTGFzdCDCuycsXG4gICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgbmV4dFBhZ2VDb250cm9sVGV4dDogJ05leHQg4oC6JyxcbiAgICBudW1JdGVtc1BlclBhZ2U6IDEwLFxuICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgIHBhZ2VyUG9zaXRpb246IDEsXG4gICAgcG9zaXRpb246IFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSxcbiAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgc2hvd0p1bXBUb0ZpcnN0OiB0cnVlLFxuICAgIHNob3dKdW1wVG9MYXN0OiB0cnVlLFxuICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSVBhZ2luYXRlZFZpZXc7XG4iXX0=