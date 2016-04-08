'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A controller view for managing the aggregate state of multiple, related radio-style buttons.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIPaginatedView
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIPaginatedView = function (_UIView) {
    _inherits(UIPaginatedView, _UIView);

    function UIPaginatedView() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIPaginatedView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            currentPage: _this.props.pagerPosition,
            numberOfPages: Math.ceil(_this.props.totalItems / _this.props.numItemsPerPage),
            numItemsPerPage: _this.props.numItemsPerPage,
            numPageToggles: _this.props.numPageToggles,
            totalItems: _this.props.totalItems,
            shownItems: [{ data: _this.props.getItem(0) }]
        }, _this.handleClick = function (value) {
            var pageNumber = void 0;

            switch (value) {
                case UIPaginatedView.controlValues.FIRST:
                    pageNumber = 1;
                    break;
                case UIPaginatedView.controlValues.PREVIOUS:
                    pageNumber = _this.state.currentPage - 1;
                    break;
                case UIPaginatedView.controlValues.NEXT:
                    pageNumber = _this.state.currentPage + 1;
                    break;
                case UIPaginatedView.controlValues.LAST:
                    pageNumber = _this.state.numberOfPages;
                    break;
                default:
                    pageNumber = parseInt(value, 10);
            }

            _this.setState({
                currentPage: pageNumber,
                shownItems: _this.generateItems(pageNumber)
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIPaginatedView.prototype.componentDidUpdate = function componentDidUpdate(oldProps, oldState) {
        if (oldState.currentPage !== this.state.currentPage) {
            (0, _reactDom.findDOMNode)(this.refs.item_0).focus();
        }
    };

    UIPaginatedView.prototype.componentDidMount = function componentDidMount() {
        this.setState({ shownItems: this.generateItems(this.state.currentPage) });
    };

    UIPaginatedView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.identifier !== this.props.identifier) {
            this.setState({
                currentPage: 1,
                shownItems: this.generateItems(1, nextProps.getItem)
            });
        }
    };

    UIPaginatedView.prototype.createPageButtonOptions = function createPageButtonOptions() {
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
    };

    UIPaginatedView.prototype.currentPage = function currentPage() {
        return this.state.currentPage;
    };

    UIPaginatedView.prototype.generateItems = function generateItems(currentPage) {
        var getItem = arguments.length <= 1 || arguments[1] === undefined ? this.props.getItem : arguments[1];

        var generatedItems = [];
        var firstItemIndex = (currentPage - 1) * this.state.numItemsPerPage;
        var lastItemIndex = Math.min(this.state.totalItems, firstItemIndex + this.state.numItemsPerPage) - 1;

        for (var i = firstItemIndex; i <= lastItemIndex; i++) {
            generatedItems.push({ data: getItem(i) });
        }

        return generatedItems;
    };

    UIPaginatedView.prototype.renderItems = function renderItems() {
        var _cx;

        return _react2.default.createElement(
            _UIArrowKeyNavigation2.default,
            _extends({}, this.props.listWrapperProps, {
                ref: 'itemList',
                className: (0, _classnames2.default)((_cx = {
                    'ui-paginated-view-item-list': true
                }, _cx[this.props.listWrapperProps.className] = !!this.props.listWrapperProps.className, _cx)) }),
            this.state.shownItems.map(function (item, index) {
                return _react2.default.createElement(_item2.default, { ref: 'item_' + index,
                    key: index,
                    data: item.data,
                    even: index % 2 === 0 });
            })
        );
    };

    UIPaginatedView.prototype.renderControls = function renderControls(position) {
        var _cx2;

        var positionLowerCase = position.toLowerCase();

        return _react2.default.createElement(_UISegmentedControl2.default, _extends({}, this.props.toggleWrapperProps, {
            ref: 'segmentedControl' + (positionLowerCase[0].toUpperCase() + positionLowerCase.slice(1)),
            className: (0, _classnames2.default)((_cx2 = {
                'ui-paginated-view-controls': true
            }, _cx2['ui-paginated-view-controls-' + positionLowerCase] = true, _cx2[this.props.toggleWrapperProps.className] = !!this.props.toggleWrapperProps.className, _cx2)),
            options: this.createPageButtonOptions(),
            onOptionSelected: this.handleClick }));
    };

    UIPaginatedView.prototype.renderView = function renderView() {
        return _react2.default.createElement(
            'div',
            {
                ref: 'paginatedView',
                className: 'ui-paginated-view' },
            this.props.position === UIPaginatedView.position.ABOVE || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.ABOVE) : _noop2.default,
            this.renderItems(),
            this.props.position === UIPaginatedView.position.BELOW || this.props.position === UIPaginatedView.position.BOTH ? this.renderControls(UIPaginatedView.position.BELOW) : _noop2.default
        );
    };

    UIPaginatedView.prototype.render = function render() {
        var _cx3;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx3 = {
                    'ui-paginated-view-wrapper': true
                }, _cx3[this.props.className] = !!this.props.className, _cx3)) }),
            this.renderView()
        );
    };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUGFnaW5hdGVkVmlldy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNxQjs7Ozs7Ozs7Ozs7OzBJQW1FakIsUUFBUTtBQUNKLHlCQUFhLE1BQUssS0FBTCxDQUFXLGFBQVg7QUFDYiwyQkFBZSxLQUFLLElBQUwsQ0FBVSxNQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXdCLE1BQUssS0FBTCxDQUFXLGVBQVgsQ0FBakQ7QUFDQSw2QkFBaUIsTUFBSyxLQUFMLENBQVcsZUFBWDtBQUNqQiw0QkFBZ0IsTUFBSyxLQUFMLENBQVcsY0FBWDtBQUNoQix3QkFBWSxNQUFLLEtBQUwsQ0FBVyxVQUFYO0FBQ1osd0JBQVksQ0FBQyxFQUFDLE1BQU0sTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUFOLEVBQUYsQ0FBWjtpQkE2RkosY0FBYyxVQUFDLEtBQUQsRUFBVztBQUNyQixnQkFBSSxtQkFBSixDQURxQjs7QUFHckIsb0JBQVEsS0FBUjtBQUNBLHFCQUFLLGdCQUFnQixhQUFoQixDQUE4QixLQUE5QjtBQUNELGlDQUFhLENBQWIsQ0FESjtBQUVJLDBCQUZKO0FBREEscUJBSUssZ0JBQWdCLGFBQWhCLENBQThCLFFBQTlCO0FBQ0QsaUNBQWEsTUFBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixDQUF6QixDQURqQjtBQUVJLDBCQUZKO0FBSkEscUJBT0ssZ0JBQWdCLGFBQWhCLENBQThCLElBQTlCO0FBQ0QsaUNBQWEsTUFBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixDQUF6QixDQURqQjtBQUVJLDBCQUZKO0FBUEEscUJBVUssZ0JBQWdCLGFBQWhCLENBQThCLElBQTlCO0FBQ0QsaUNBQWEsTUFBSyxLQUFMLENBQVcsYUFBWCxDQURqQjtBQUVJLDBCQUZKO0FBVkE7QUFjSSxpQ0FBYSxTQUFTLEtBQVQsRUFBZ0IsRUFBaEIsQ0FBYixDQURKO0FB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QXpCO0FBQ1YsNkJBQXlCLFlBQXpCO0FBQ0EscUJBQWlCLElBQWpCO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0Esd0JBQW9CLEVBQXBCOztrQkFoRWEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgY29udHJvbGxlciB2aWV3IGZvciBtYW5hZ2luZyB0aGUgYWdncmVnYXRlIHN0YXRlIG9mIG11bHRpcGxlLCByZWxhdGVkIHJhZGlvLXN0eWxlIGJ1dHRvbnMuXG4gKiBAY2xhc3MgVUlQYWdpbmF0ZWRWaWV3XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgVUlTZWdtZW50ZWRDb250cm9sIGZyb20gJy4uL1VJU2VnbWVudGVkQ29udHJvbCc7XG5pbXBvcnQgVUlBcnJvd0tleU5hdmlnYXRpb24gZnJvbSAnLi4vVUlBcnJvd0tleU5hdmlnYXRpb24nO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUGFnaW5hdGVkVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIGNvbnRyb2xWYWx1ZXMgPSB7XG4gICAgICAgIEZJUlNUOiAnRklSU1QnLFxuICAgICAgICBQUkVWSU9VUzogJ1BSRVZJT1VTJyxcbiAgICAgICAgTkVYVDogJ05FWFQnLFxuICAgICAgICBMQVNUOiAnTEFTVCcsXG4gICAgfVxuXG4gICAgc3RhdGljIHBvc2l0aW9uID0ge1xuICAgICAgICBBQk9WRTogJ0FCT1ZFJyxcbiAgICAgICAgQkVMT1c6ICdCRUxPVycsXG4gICAgICAgIEJPVEg6ICdCT1RIJyxcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBnZXRJdGVtOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaWRlbnRpZmllcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGxpc3RXcmFwcGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5leHRQYWdlQ29udHJvbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogZnVuY3Rpb24gdmFsaWRhdGVOdW1JdGVtc1BlclBhZ2UocHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihwcm9wcy5udW1JdGVtc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMubnVtSXRlbXNQZXJQYWdlIDwgMSB8fCBwcm9wcy5udW1JdGVtc1BlclBhZ2UgPiBwcm9wcy50b3RhbEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYG51bUl0ZW1zUGVyUGFnZWAgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kICcgKyBwcm9wcy50b3RhbEl0ZW1zICsgJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbnVtUGFnZVRvZ2dsZXM6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHBhZ2VyUG9zaXRpb246IGZ1bmN0aW9uIHZhbGlkYXRlUGFnZXJQb3NpdGlvbihwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHByb3BzLnBhZ2VyUG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChwcm9wcy50b3RhbEl0ZW1zIC8gcHJvcHMubnVtSXRlbXNQZXJQYWdlKTtcblxuICAgICAgICAgICAgaWYgKHByb3BzLnBhZ2VyUG9zaXRpb24gPCAxIHx8IHByb3BzLnBhZ2VyUG9zaXRpb24gPiBudW1iZXJPZlBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignYHBhZ2VyUG9zaXRpb25gIG11c3QgYmUgYmV0d2VlbiAxIGFuZCAnICsgbnVtYmVyT2ZQYWdlcyArICcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uKSksXG4gICAgICAgIHByZXZpb3VzUGFnZUNvbnRyb2xUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaG93SnVtcFRvRmlyc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBzaG93SnVtcFRvTGFzdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgdG90YWxJdGVtczogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBnZXRJdGVtOiBub29wLFxuICAgICAgICBqdW1wVG9GaXJzdENvbnRyb2xUZXh0OiAnwqsgRmlyc3QnLFxuICAgICAgICBqdW1wVG9MYXN0Q29udHJvbFRleHQ6ICdMYXN0IMK7JyxcbiAgICAgICAgbGlzdFdyYXBwZXJQcm9wczoge30sXG4gICAgICAgIG5leHRQYWdlQ29udHJvbFRleHQ6ICdOZXh0IOKAuicsXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiA1LFxuICAgICAgICBwYWdlclBvc2l0aW9uOiAxLFxuICAgICAgICBwb3NpdGlvbjogVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFLFxuICAgICAgICBwcmV2aW91c1BhZ2VDb250cm9sVGV4dDogJ+KAuSBQcmV2aW91cycsXG4gICAgICAgIHNob3dKdW1wVG9GaXJzdDogdHJ1ZSxcbiAgICAgICAgc2hvd0p1bXBUb0xhc3Q6IHRydWUsXG4gICAgICAgIHRvZ2dsZVdyYXBwZXJQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnByb3BzLnBhZ2VyUG9zaXRpb24sXG4gICAgICAgIG51bWJlck9mUGFnZXM6IE1hdGguY2VpbCh0aGlzLnByb3BzLnRvdGFsSXRlbXMgLyB0aGlzLnByb3BzLm51bUl0ZW1zUGVyUGFnZSksXG4gICAgICAgIG51bUl0ZW1zUGVyUGFnZTogdGhpcy5wcm9wcy5udW1JdGVtc1BlclBhZ2UsXG4gICAgICAgIG51bVBhZ2VUb2dnbGVzOiB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzLFxuICAgICAgICB0b3RhbEl0ZW1zOiB0aGlzLnByb3BzLnRvdGFsSXRlbXMsXG4gICAgICAgIHNob3duSXRlbXM6IFt7ZGF0YTogdGhpcy5wcm9wcy5nZXRJdGVtKDApfV0sXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSkge1xuICAgICAgICBpZiAob2xkU3RhdGUuY3VycmVudFBhZ2UgIT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHRoaXMucmVmcy5pdGVtXzApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd25JdGVtczogdGhpcy5nZW5lcmF0ZUl0ZW1zKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pZGVudGlmaWVyICE9PSB0aGlzLnByb3BzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcygxLCBuZXh0UHJvcHMuZ2V0SXRlbSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBhZ2VCdXR0b25PcHRpb25zKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3QgbnVtUGFnZVRvZ2dsZXMgPSB0aGlzLnByb3BzLm51bVBhZ2VUb2dnbGVzO1xuICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtICgoY3VycmVudFBhZ2UgLSAxKSAlIG51bVBhZ2VUb2dnbGVzKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG51bVBhZ2VUb2dnbGVzIC0gMSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0p1bXBUb0ZpcnN0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLmp1bXBUb0ZpcnN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkZJUlNULFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLWZpcnN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMucHJldmlvdXNQYWdlQ29udHJvbFRleHQsXG4gICAgICAgICAgICB2YWx1ZTogVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVMsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLXByZXZpb3VzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogaSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMubmV4dFBhZ2VDb250cm9sVGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhULFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzLW5leHQnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93SnVtcFRvTGFzdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5qdW1wVG9MYXN0Q29udHJvbFRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFVJUGFnaW5hdGVkVmlldy5jb250cm9sVmFsdWVzLkxBU1QsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT09IHRoaXMuc3RhdGUubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy1sYXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSXRlbXMoY3VycmVudFBhZ2UsIGdldEl0ZW0gPSB0aGlzLnByb3BzLmdldEl0ZW0pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtSW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gTWF0aC5taW4odGhpcy5zdGF0ZS50b3RhbEl0ZW1zLCBmaXJzdEl0ZW1JbmRleCArIHRoaXMuc3RhdGUubnVtSXRlbXNQZXJQYWdlKSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SXRlbUluZGV4OyBpIDw9IGxhc3RJdGVtSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgZ2VuZXJhdGVkSXRlbXMucHVzaCh7ZGF0YTogZ2V0SXRlbShpKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBwYWdlTnVtYmVyO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5GSVJTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuUFJFVklPVVM6XG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVSVBhZ2luYXRlZFZpZXcuY29udHJvbFZhbHVlcy5ORVhUOlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVUlQYWdpbmF0ZWRWaWV3LmNvbnRyb2xWYWx1ZXMuTEFTVDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnN0YXRlLm51bWJlck9mUGFnZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50UGFnZTogcGFnZU51bWJlcixcbiAgICAgICAgICAgIHNob3duSXRlbXM6IHRoaXMuZ2VuZXJhdGVJdGVtcyhwYWdlTnVtYmVyKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVySXRlbXMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VUlBcnJvd0tleU5hdmlnYXRpb24gey4uLnRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J2l0ZW1MaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktcGFnaW5hdGVkLXZpZXctaXRlbS1saXN0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMubGlzdFdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3duSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW0gcmVmPXtgaXRlbV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17aXRlbS5kYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbj17aW5kZXggJSAyID09PSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9VSUFycm93S2V5TmF2aWdhdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9scyhwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd2VyQ2FzZSA9IHBvc2l0aW9uLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxVSVNlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPXsnc2VnbWVudGVkQ29udHJvbCcgKyAocG9zaXRpb25Mb3dlckNhc2VbMF0udG9VcHBlckNhc2UoKSArIHBvc2l0aW9uTG93ZXJDYXNlLnNsaWNlKDEpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LWNvbnRyb2xzJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgWyd1aS1wYWdpbmF0ZWQtdmlldy1jb250cm9scy0nICsgcG9zaXRpb25Mb3dlckNhc2VdOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy50b2dnbGVXcmFwcGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5jcmVhdGVQYWdlQnV0dG9uT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9J3BhZ2luYXRlZFZpZXcnXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1wYWdpbmF0ZWQtdmlldyc+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkFCT1ZFXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5BQk9WRSlcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAoICAgdGhpcy5wcm9wcy5wb3NpdGlvbiA9PT0gVUlQYWdpbmF0ZWRWaWV3LnBvc2l0aW9uLkJFTE9XXG4gICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLnBvc2l0aW9uID09PSBVSVBhZ2luYXRlZFZpZXcucG9zaXRpb24uQk9USClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNvbnRyb2xzKFVJUGFnaW5hdGVkVmlldy5wb3NpdGlvbi5CRUxPVylcbiAgICAgICAgICAgICAgICAgICAgOiBub29wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXBhZ2luYXRlZC12aWV3LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=